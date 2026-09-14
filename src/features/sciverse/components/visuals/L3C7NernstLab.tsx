import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const E_STANDARD = 1.1;
const SLOPE = 0.0296;
const PLOT_MIN = 0.9;
const PLOT_MAX = 1.2;

/** Twenty-five dial steps for each extra 9 in the percentage: 0%, 90%, 99%, 99.9%, 99.99%. */
const usedOf = (dial: number): number => 1 - Math.pow(10, -Math.max(0, Math.min(100, dial)) / 25);
const zincStartOf = (dial: number): number => Math.pow(10, -2 + Math.max(0, Math.min(40, Math.round(dial))) / 20);
const pctText = (fraction: number): string => {
    const p = fraction * 100;
    return p < 90 ? `${p.toFixed(0)}%` : p < 99 ? `${p.toFixed(1)}%` : `${p.toFixed(2)}%`;
};
const concText = (c: number): string => (c >= 0.01 ? c.toFixed(3) : c.toPrecision(2));
const qText = (q: number): string => (q < 1 ? q.toFixed(3) : q < 100 ? q.toFixed(1) : Math.round(q).toLocaleString());
const voltageAt = (used: number, zincStart: number): number => {
    const q = (zincStart + used) / Math.max(1e-6, 1 - used);
    return E_STANDARD - SLOPE * Math.log10(q);
};

export const L3C7NernstLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const dial = Math.max(0, Math.min(100, Math.round(raw)));
        const used = usedOf(dial);
        const zincStart = zincStartOf(raw2);
        const zinc = zincStart + used;
        const copper = Math.max(1e-6, 1 - used);
        const q = zinc / copper;
        const logQ = Math.log10(q);
        const volts = E_STANDARD - SLOPE * logQ;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // Voltage against how far the cell has run
        const gx = 62;
        const gw = safeRight * 0.56 - gx;
        const gTop = stageTop + 14;
        const gBottom = stageTop + 108 * sy;
        const xOf = (d: number): number => gx + (d / 100) * gw;
        const yOf = (e: number): number => gBottom - ((Math.max(PLOT_MIN, Math.min(PLOT_MAX, e)) - PLOT_MIN) / (PLOT_MAX - PLOT_MIN)) * (gBottom - gTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, gTop);
        ctx.lineTo(gx, gBottom);
        ctx.lineTo(gx + gw, gBottom);
        ctx.stroke();
        outlineText(ctx, '1.20 V', gx - 6, gTop + 4, '11px monospace', '#475569', 'right', 50);
        outlineText(ctx, '0.90 V', gx - 6, gBottom + 4, '11px monospace', '#475569', 'right', 50);

        const stdY = yOf(E_STANDARD);
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(gx, stdY);
        ctx.lineTo(gx + gw, stdY);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, 'E° 1.10 V', gx + gw - 4, stdY - 5, '11px monospace', '#475569', 'right', gw * 0.4);

        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let d = 0; d <= 100; d++) {
            const px = xOf(d);
            const py = yOf(voltageAt(usedOf(d), zincStart));
            if (d === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = '#047857';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xOf(dial), yOf(volts), 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const ticks: [number, string][] = [[0, '0%'], [25, '90%'], [50, '99%'], [75, '99.9%'], [100, '99.99%']];
        const tickRoom = gw / 4 - 4;
        ticks.forEach(([d, label], i) => {
            outlineText(ctx, label, xOf(d), gBottom + 16, '11px monospace', '#475569', i === 0 ? 'left' : i === ticks.length - 1 ? 'right' : 'center', tickRoom);
        });

        // The Nernst equation, step by step
        const px = safeRight * 0.62;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `[Zn²⁺] = ${concText(zinc)} mol/L`, px, stageTop + 20, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `[Cu²⁺] = ${concText(copper)} mol/L`, px, stageTop + 42, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `Q = ${qText(q)}`, px, stageTop + 64, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `log Q = ${logQ.toFixed(2)}`, px, stageTop + 86, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `E = ${volts.toFixed(3)} V`, px, stageTop + 112 * sy, 'bold 13px monospace', '#065f46', 'left', pw);

        outlineText(ctx, `E = 1.10 − 0.0296 x ${logQ.toFixed(2)} = ${volts.toFixed(3)} V`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${pctText(used)} of the copper ions used`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Cell voltage ${volts.toFixed(3)} V`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Flat for most of its life, then a cliff', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (volts - PLOT_MIN) / (PLOT_MAX - PLOT_MIN))),
                caption: 'Cell Voltage',
                low: '0.90 V',
                high: '1.20 V',
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `With [Zn²⁺] = ${concText(zinc)} mol/L and [Cu²⁺] = ${concText(copper)} mol/L, Q = ${qText(q)} and E = ${volts.toFixed(3)} V.`,
        };
    };

    return (
        <LabCanvas
            title="Why a Battery's Voltage Fades"
            readout={({ raw }) => `${pctText(usedOf(Math.round(raw)))} of the copper ions used`}
            controlLabel="Copper Ions Used"
            controlKey="copperIonsUsed"
            controlMin={0}
            controlMax={100}
            controlInitial={0}
            controlDisplay={raw => pctText(usedOf(Math.round(raw)))}
            control2={{
                label: 'Starting Zinc Ions',
                key: 'startingZincIons',
                min: 0,
                max: 40,
                initial: 40,
                display: raw => `${zincStartOf(raw).toFixed(2)} mol/L`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why a Battery's Voltage Fades"
            completeNote="E = E° − (0.0592 / n) x log Q!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
