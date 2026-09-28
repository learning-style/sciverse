import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const BASE_C = 150;        // mg/L at ordinary flow
const BASE_Q = 9.6;        // m3/s, L2P18's stream
const MAX_LOAD = 40;       // load factor at the top of the meter
const FLAT = '#047857';
const DILUTE = '#0369a1';

const floodOf = (dial: number): number => Math.max(1, Math.min(100, Math.round(dial)));
const bOf = (dial: number): number => Math.max(-100, Math.min(40, Math.round(dial / 5) * 5)) / 100;

export const L3C18ExponentLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const flood = floodOf(raw);
        const b = bOf(raw2);
        const concFactor = Math.pow(flood, b);
        const loadFactor = Math.pow(flood, 1 + b);
        const conc = BASE_C * concFactor;
        const flow = BASE_Q * flood;
        const tonnes = (conc * flow * 86.4) / 1000;
        const chemostatic = b > -0.25;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const plotH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + plotH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const plotTop = top + capBand;
        const baseY = plotTop + plotH;

        const plotW = Math.max(120, Math.min(safeRight - 120, safeRight * 0.62));
        const cx = safeRight / 2;
        const left = cx - plotW / 2;

        // Concentration against flow, drawn as the curve C = a Q^b on log-ish axes,
        // with pure dilution shown behind it for comparison.
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, baseY);
        ctx.lineTo(left + plotW, baseY);
        ctx.stroke();

        const yFor = (factor: number) => baseY - Math.max(0, Math.min(1, factor)) * plotH;
        const xFor = (mult: number) => left + (Math.log10(mult) / 2) * plotW;

        // pure dilution, b = -1, for reference
        ctx.strokeStyle = DILUTE;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let m = 1; m <= 100; m *= 1.25) {
            const x = xFor(m);
            const y = yFor(Math.pow(m, -1));
            if (m === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // this river's own exponent
        ctx.strokeStyle = chemostatic ? FLAT : DILUTE;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let m = 1; m <= 100; m *= 1.25) {
            const x = xFor(m);
            const y = yFor(Math.pow(m, b));
            if (m === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // where the flood dial has put us
        const px = xFor(flood);
        const py = yFor(concFactor);
        ctx.fillStyle = chemostatic ? FLAT : DILUTE;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'concentration against flow, both on a stretched scale',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'pure dilution, b = -1', left + 4, Math.max(yFor(0.1) - 6, artTop + 24),
            'bold 10px monospace', DILUTE, 'left', Math.max(60, plotW - 8));
        outlineText(ctx, 'this river, b = ' + b.toFixed(2),
            Math.min(px + 8, left + plotW - 4), Math.max(py - 8, artTop + 38),
            'bold 11px monospace', chemostatic ? FLAT : DILUTE, 'left',
            Math.max(60, left + plotW - px - 6));
        outlineText(ctx, 'flood factor x' + flood, cx, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, chemostatic ? 'chemostatic: concentration nearly flat'
            : 'diluted: concentration falling with flow',
            cx, Math.min(baseY + labelTail + 10, artBottom),
            'bold 11px monospace', chemostatic ? FLAT : DILUTE, 'center', safeRight - 30);

        outlineText(ctx, 'C = a Q^b: concentration x' + concFactor.toFixed(2)
            + ' = ' + conc.toFixed(0) + ' mg/L, load x' + loadFactor.toFixed(1),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'dissolved load ' + tonnes.toFixed(0) + ' tonnes a day at '
            + flow.toFixed(0) + ' m³/s',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', FLAT, 'center', safeRight - 30);

        fitText(ctx, 'load x' + loadFactor.toFixed(1) + ', concentration x' + concFactor.toFixed(2),
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'More surface against less time, with a ceiling',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, loadFactor / MAX_LOAD)),
                caption: 'Dissolved Load Against Ordinary Flow',
                low: 'x1',
                high: 'x' + MAX_LOAD,
                stops: ['#ecfdf5', '#6ee7b7', FLAT] as [string, string, string],
            },
            note: 'With b = ' + b.toFixed(2) + ', a flood ' + flood
                + ' times the ordinary flow leaves the water at ' + concFactor.toFixed(2)
                + ' of its usual concentration -- ' + conc.toFixed(0) + ' mg/L instead of '
                + BASE_C + ' -- while the load rises ' + loadFactor.toFixed(1)
                + '-fold, to ' + tonnes.toFixed(0) + ' tonnes a day. Pure dilution would be '
                + 'b = -1, and weathering solutes measure near -0.1, because a rising river '
                + 'wets ground that was dry and so gains contact area as it loses contact time. '
                + 'A positive b means the opposite: a store the low river never reaches, '
                + 'flushed in by high water, which is how nitrate behaves. The exponent is '
                + 'fitted to measurements, not derived.',
        };
    };

    return (
        <LabCanvas
            title="Why Flood Water Is Not Diluted"
            readout={({ raw }) => 'A flood ' + floodOf(raw) + ' times ordinary flow'}
            controlLabel="Flood Factor"
            controlKey="floodFactor"
            controlMin={1}
            controlMax={100}
            controlInitial={10}
            controlDisplay={raw => 'x' + floodOf(raw)}
            control2={{
                label: 'Exponent b',
                key: 'exponentB',
                min: -100,
                max: 40,
                initial: -10,
                display: raw => bOf(raw).toFixed(2),
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Rivers Shape the Land?"
            completeNote="Two big effects, nearly cancelling!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
