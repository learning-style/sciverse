import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const LIMIT = 11.3;        // mg/L as nitrogen, the drinking-water limit
const TOP = 50;            // mg/L at the top of the scale
const OVER = '#b45309';
const UNDER = '#047857';

const surplusOf = (dial: number): number => Math.max(10, Math.min(200, Math.round(dial / 5) * 5));
const drainOf = (dial: number): number => Math.max(100, Math.min(800, Math.round(dial / 50) * 50));

export const L3C19NitrateLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const surplus = surplusOf(raw);
        const drain = drainOf(raw2);
        const cubic = drain * 10;                       // m3 per hectare
        const mgL = (surplus * 1e6) / (cubic * 1000);
        const over = mgL > LIMIT;
        const times = mgL / LIMIT;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const barH = Math.max(46, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + barH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + capBand;
        const baseY = barTop + barH;

        const barW = Math.max(34, Math.min(70, safeRight * 0.15));
        const cx = safeRight / 2;
        const left = cx - barW / 2;
        const yOf = (mg: number) => baseY - (Math.max(0, Math.min(TOP, mg)) / TOP) * barH;

        // the concentration in the drainage water
        ctx.fillStyle = over ? '#fed7aa' : '#a7f3d0';
        ctx.fillRect(left, yOf(mgL), barW, baseY - yOf(mgL));
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, yOf(mgL), barW, baseY - yOf(mgL));

        // the drinking-water limit
        ctx.strokeStyle = over ? OVER : UNDER;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(left - 24, yOf(LIMIT));
        ctx.lineTo(left + barW + 24, yOf(LIMIT));
        ctx.stroke();
        ctx.setLineDash([]);

        // negative soil surfaces gripping positive ions, and nitrate drifting past
        const sx = Math.max(16, left - 54);
        if (sx > 20) {
            ctx.fillStyle = '#64748b';
            ctx.fillRect(sx, barTop + 8, 7, barH - 16);
            for (let i = 0; i < 4; i++) {
                const iy = barTop + 20 + i * ((barH - 36) / 3);
                ctx.fillStyle = '#047857';
                ctx.beginPath();
                ctx.arc(sx + 13, iy, 3.4, 0, Math.PI * 2);
                ctx.fill();
            }
            for (let i = 0; i < 3; i++) {
                const dy = barTop + 26 + ((t * 26 + i * 31) % Math.max(14, barH - 40));
                ctx.fillStyle = OVER;
                ctx.beginPath();
                ctx.arc(sx + 30, dy, 3.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        outlineText(ctx, 'held on the soil, or travelling with the water',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'limit ' + LIMIT + ' mg/L', left + barW + 28,
            Math.max(yOf(LIMIT) - 6, artTop + 26),
            'bold 11px monospace', over ? OVER : UNDER, 'left',
            Math.max(50, safeRight - left - barW - 32));
        outlineText(ctx, 'in the drainage ' + mgL.toFixed(1) + ' mg/L',
            cx, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', over ? OVER : UNDER, 'center', safeRight - 30);
        outlineText(ctx, surplus + ' kg/ha surplus in ' + drain + ' mm of drainage',
            cx, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, surplus + ' kg / ' + cubic.toLocaleString() + ' m³ = '
            + mgL.toFixed(1) + ' mg/L as nitrogen',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, over
            ? times.toFixed(1) + ' times the drinking-water limit'
            : 'under the drinking-water limit',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', over ? OVER : UNDER,
            'center', safeRight - 30);

        fitText(ctx, 'in the drainage ' + mgL.toFixed(1) + ' mg/L', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Soil grips potassium and cannot grip nitrate at all',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, mgL / TOP)),
                caption: 'Nitrogen Leaving in the Drainage',
                low: '0 mg/L',
                high: TOP + ' mg/L',
                stops: ['#ecfdf5', '#fcd34d', OVER] as [string, string, string],
            },
            note: 'A surplus of ' + surplus + ' kg/ha meeting ' + drain
                + ' mm of drainage -- which is ' + cubic.toLocaleString()
                + ' m³ per hectare, since 1 mm over 1 hectare is 10 m³ -- gives '
                + mgL.toFixed(1) + ' mg/L as nitrogen. '
                + (over
                    ? 'That is ' + times.toFixed(1) + ' times the drinking-water limit of '
                      + LIMIT + ' mg/L.'
                    : 'That is under the drinking-water limit of ' + LIMIT + ' mg/L.')
                + ' Nitrate carries a negative charge and so do the clay and humus surfaces that '
                + 'hold nutrients, so nitrate is repelled and travels with whatever water is '
                + 'moving. Potassium is positive, is held, and mostly stays. Notice that a wetter '
                + 'year dilutes without reducing: the same nitrogen leaves, in more water.',
        };
    };

    return (
        <LabCanvas
            title="Why Nitrate Is the One That Leaves"
            readout={({ raw }) => 'A surplus of ' + surplusOf(raw) + ' kg/ha'}
            controlLabel="Surplus Nitrogen"
            controlKey="surplusNitrogen"
            controlMin={10}
            controlMax={200}
            controlInitial={120}
            controlDisplay={raw => surplusOf(raw) + ' kg/ha'}
            control2={{
                label: 'Water That Drains',
                key: 'waterDrained',
                min: 100,
                max: 800,
                initial: 300,
                display: raw => drainOf(raw) + ' mm',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Does Soil Support Life?"
            completeNote="The whole story is one minus sign!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
