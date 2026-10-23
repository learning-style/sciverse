import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the SPACING of the isobars is the wind. An earlier version drew two flat
// horizontal lines with a gap, which is the measurement without the thing being
// measured -- a reader cannot picture it. This draws what a forecaster actually looks
// at: a low on a globe with isobars ringing it, clipped at the limb the way a chart
// is. The distance dial spreads the rings apart and the wind arrow shortens with
// them, so "packed isobars mean wind" is something you watch rather than read.
const PER_GRADIENT = 26;       // km/h for each 1 hPa per 100 km, mid-latitudes
const SQUASH = 0.55;           // rings foreshortened, so they sit ON the sphere
const OCEAN = '#dbeafe';
const ISOBAR = '#4338ca';
const FAINT = '#93c5fd';
const WIND = '#b45309';

const diffOf = (dial: number): number => Math.max(2, Math.min(20, Math.round(dial / 2) * 2));
const distOf = (dial: number): number => Math.max(100, Math.min(1000, Math.round(dial / 100) * 100));

export const L2P26IsobarLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const diff = diffOf(raw);
        const dist = distOf(raw2);
        const gradient = diff / dist * 100;
        const wind = gradient * PER_GRADIENT;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // floored below any stage height that renders, and capped by half the band
        const radius = Math.max(6, Math.min(usable / 2 - 2, (safeRight - 56) / 2, 68));
        const showLabels = radius >= 28;
        const cx = safeRight / 2;
        const cy = artTop + usable / 2;

        // the globe
        ctx.fillStyle = OCEAN;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // the isobars, clipped at the limb the way a real chart is cut off
        const inner = radius * 0.3;
        const gap = Math.max(3, (dist / 1000) * radius * 0.45);
        const outer = inner + gap;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
        ctx.clip();
        const ring = (r: number, colour: string, width: number) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.ellipse(cx, cy, r, Math.max(1, r * SQUASH), 0, 0, Math.PI * 2);
            ctx.stroke();
        };
        ring(outer + gap, FAINT, 1);
        ring(outer + 2 * gap, FAINT, 1);
        ring(inner, ISOBAR, 2.2);
        ring(outer, ISOBAR, 2.2);
        ctx.restore();

        // the low everything rings around
        ctx.fillStyle = ISOBAR;
        ctx.beginPath();
        ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
        ctx.fill();

        // what the ruler measures: straight across the two bold rings
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - inner, cy);
        ctx.lineTo(cx - outer, cy);
        ctx.stroke();
        [[-inner, 1], [-outer, -1]].forEach(([dx, dir]) => {
            ctx.beginPath();
            ctx.moveTo(cx + (dx as number) + 4 * (dir as number), cy - 3);
            ctx.lineTo(cx + (dx as number), cy);
            ctx.lineTo(cx + (dx as number) + 4 * (dir as number), cy + 3);
            ctx.stroke();
        });

        // the wind, running ALONG the isobars rather than across them
        const windLen = Math.max(6, Math.min(1, wind / 120) * radius * 0.78);
        const wy = cy - inner * SQUASH;
        ctx.strokeStyle = WIND;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, wy);
        ctx.lineTo(cx + windLen, wy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + windLen - 6, wy - 4);
        ctx.lineTo(cx + windLen, wy);
        ctx.lineTo(cx + windLen - 6, wy + 4);
        ctx.stroke();
        const march = (t * 24) % Math.max(8, windLen);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + march, wy, 1.7, 0, Math.PI * 2);
        ctx.fill();

        if (showLabels) {
            // 'low' sits BELOW the centre line so it cannot meet the wind label, and the
            // ruler carries only the distance -- footer 1 does the rest of the arithmetic
            outlineText(ctx, 'low', cx + 6, cy + 14, 'bold 11px monospace', ISOBAR, 'left', 30);
            outlineText(ctx, dist + ' km', cx - outer - 4, cy - 6,
                'bold 11px monospace', '#334155', 'right', 48);
            outlineText(ctx, 'wind', cx + windLen + 5, wy + 4,
                'bold 11px monospace', WIND, 'left', 34);
        }

        outlineText(ctx, diff + ' hPa over ' + dist + ' km = ' + gradient.toFixed(1),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, wind < 15 ? 'not enough to move a flag'
            : wind < 40 ? 'a brisk ordinary day'
                : wind < 70 ? 'a gale'
                    : wind < 120 ? 'a severe storm' : 'stronger than any storm',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', WIND, 'center', safeRight - 30);

        fitText(ctx, 'wind ' + wind.toFixed(0) + ' km/h', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'How close are the lines?', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, wind / 120)),
                caption: 'Wind off the Chart',
                low: 'calm',
                high: 'a severe storm',
                stops: ['#eef2ff', '#fcd34d', WIND] as [string, string, string],
            },
            note: diff + ' hPa spread over ' + dist + ' km is a gradient of ' + gradient.toFixed(1)
                + ' hPa per 100 km, so about ' + wind.toFixed(0)
                + ' km/h. Spread the rings apart and the wind falls with the numbers unchanged.',
        };
    };

    return (
        <LabCanvas
            title="How Close Are the Lines?"
            readout={({ raw }) => 'Pressure difference ' + diffOf(raw) + ' hPa'}
            controlLabel="Pressure Difference"
            controlKey="pressureDiff"
            controlMin={2}
            controlMax={20}
            controlInitial={4}
            controlDisplay={raw => diffOf(raw) + ' hPa'}
            control2={{
                label: 'Distance Between',
                key: 'isobarDistance',
                min: 100,
                max: 1000,
                initial: 400,
                display: raw => distOf(raw) + ' km',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Read the spacing, not the numbers!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
