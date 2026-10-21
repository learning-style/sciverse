import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the wind runs along the isobars because that is the only direction in
// which the push and the deflection cancel. So the two of them are drawn equal and
// opposite at every setting -- the picture cannot show an unbalanced wind, because
// an unbalanced wind is still turning. Their shared length tracks the gradient, and
// the wind arrow at right angles to them tracks the speed that balance produces.
const RHO = 1.225;
const OMEGA = 7.292e-5;
const WIND_CAP = 150;          // km/h: past this the balance is never reached
const PUSH = '#b45309';
const DEFLECT = '#0369a1';
const INDIGO = '#4338ca';

const gradOf = (dial: number): number => Math.max(0.5, Math.min(5, Math.round(dial * 2) / 2));
const latOf = (dial: number): number => Math.max(5, Math.min(75, Math.round(dial / 5) * 5));

const windKmh = (grad: number, lat: number): number => {
    const f = 2 * OMEGA * Math.sin(lat * Math.PI / 180);
    return (grad * 100 / 1e5) / (RHO * f) * 3.6;
};

export const L3P26GeostrophicLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grad = gradOf(raw);
        const lat = latOf(raw2);
        const wind = windKmh(grad, lat);
        const runaway = wind > WIND_CAP;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // Floored low enough that it cannot exceed what is left -- the rule CLAUDE.md
        // records about floors, which a 26 here broke again on a phone-height stage.
        const band = Math.max(12, usable);
        const top = artTop + Math.max(0, (usable - band) / 2);
        const cy = top + band / 2;
        const showArrowLabels = band >= 76;

        const left = 26;
        const fullW = Math.max(90, safeRight - 52);
        const parcelX = left + 40;

        // the two isobars, high on top
        ctx.strokeStyle = INDIGO;
        ctx.lineWidth = 2;
        [top, top + band].forEach(y => {
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(left + fullW, y);
            ctx.stroke();
        });

        // the push and the deflection: equal, opposite, and as long as the gradient
        const room = band / 2 - (showArrowLabels ? 22 : 6);
        const armLen = Math.max(5, (grad / 5) * room);
        const arrow = (dir: number, colour: string) => {
            const tipY = cy + dir * armLen;
            ctx.strokeStyle = colour;
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(parcelX, cy);
            ctx.lineTo(parcelX, tipY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(parcelX - 4, tipY - dir * 5);
            ctx.lineTo(parcelX, tipY);
            ctx.lineTo(parcelX + 4, tipY - dir * 5);
            ctx.stroke();
        };
        arrow(1, PUSH);          // high to low: downward
        arrow(-1, DEFLECT);      // the spinning ground pushes back

        // the wind the balance leaves, at right angles to both
        const windRoom = Math.max(20, left + fullW - parcelX - 46);
        const windLen = Math.max(6, Math.min(1, wind / WIND_CAP) * windRoom);
        ctx.strokeStyle = runaway ? PUSH : '#0f172a';
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(parcelX, cy);
        ctx.lineTo(parcelX + windLen, cy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(parcelX + windLen - 6, cy - 4.5);
        ctx.lineTo(parcelX + windLen, cy);
        ctx.lineTo(parcelX + windLen - 6, cy + 4.5);
        ctx.stroke();
        const march = (t * 24) % Math.max(8, windLen);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(parcelX + march, cy, 1.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(parcelX, cy, 3.4, 0, Math.PI * 2);
        ctx.fill();

        if (showArrowLabels) {
            outlineText(ctx, 'deflection', parcelX, cy - armLen - 6,
                'bold 11px monospace', DEFLECT, 'center', 76);
            outlineText(ctx, 'push', parcelX, cy + armLen + 14,
                'bold 11px monospace', PUSH, 'center', 76);
        }
        outlineText(ctx, 'wind', parcelX + windLen + 6, cy + 4,
            'bold 11px monospace', runaway ? PUSH : '#0f172a', 'left', 34);

        outlineText(ctx, 'gradient ' + grad.toFixed(1) + ', latitude ' + lat + '°',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, runaway ? 'too near the equator'
            : 'balance gives ' + wind.toFixed(0) + ' km/h',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            runaway ? PUSH : DEFLECT, 'center', safeRight - 30);

        fitText(ctx, runaway ? 'no balance' : wind.toFixed(0) + ' km/h',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Push cancels deflection', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, wind / WIND_CAP)),
                caption: 'The Wind It Settles To',
                low: 'a steady balance',
                high: 'never settles at all',
                stops: ['#eef2ff', '#fcd34d', PUSH] as [string, string, string],
            },
            note: runaway
                ? 'At ' + lat + '° the deflection is so weak that the air would need ' + wind.toFixed(0)
                  + ' km/h to balance this push. It never gets there, so there is no geostrophic wind here at all.'
                : 'A gradient of ' + grad.toFixed(1) + ' hPa/100 km at ' + lat
                  + '° balances at ' + wind.toFixed(0)
                  + ' km/h. The two arrows are always equal and opposite: that is the condition, not a result.',
        };
    };

    return (
        <LabCanvas
            title="Why the Wind Blows Along the Lines"
            readout={({ raw }) => 'Pressure gradient ' + gradOf(raw).toFixed(1) + ' hPa/100km'}
            controlLabel="Pressure Gradient"
            controlKey="geoGradient"
            controlMin={0.5}
            controlMax={5}
            controlInitial={1}
            controlDisplay={raw => gradOf(raw).toFixed(1) + ' hPa/100km'}
            control2={{
                label: 'Latitude',
                key: 'geoLatitude',
                min: 5,
                max: 75,
                initial: 50,
                display: raw => latOf(raw) + '°',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="A derived constant tells you its own limits!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
