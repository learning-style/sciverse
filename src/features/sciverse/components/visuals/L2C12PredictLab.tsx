import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

interface Gap {
    period: number;
    hidden: string;
    real: number;
    above: [string, number];
    below: [string, number];
    left: [string, number];
    right: [string, number];
}

/** The column that holds carbon, silicon, germanium, tin and lead. */
const GAPS: Gap[] = [
    { period: 3, hidden: 'Si', real: 28.1, above: ['C', 12.0], below: ['Ge', 72.6], left: ['Al', 27.0], right: ['P', 31.0] },
    { period: 4, hidden: 'Ge', real: 72.6, above: ['Si', 28.1], below: ['Sn', 118.7], left: ['Ga', 69.7], right: ['As', 74.9] },
    { period: 5, hidden: 'Sn', real: 118.7, above: ['Ge', 72.6], below: ['Pb', 207.2], left: ['In', 114.8], right: ['Sb', 121.8] },
];
const GOOD = '#15803d';
const POOR = '#b91c1c';

const periodOf = (dial: number): number => Math.max(3, Math.min(5, Math.round(dial)));
const neighboursOf = (dial: number): number => (Math.round(dial) <= 2 ? 2 : 4);

export const L2C12PredictLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const period = periodOf(raw);
        const used = neighboursOf(raw2);
        const gap = GAPS[period - 3];
        const values = used === 2
            ? [gap.above[1], gap.below[1]]
            : [gap.above[1], gap.below[1], gap.left[1], gap.right[1]];
        const total = values.reduce((sum, val) => sum + val, 0);
        const estimate = total / used;
        const errorPct = Math.abs((estimate - gap.real) / gap.real) * 100;
        const colour = errorPct < 5 ? GOOD : POOR;

        // The gap and its neighbours, laid out as they sit in the table
        const cx = safeRight * 0.3;
        const cy = stageTop + (stageBottom - 64 - stageTop) * 0.46;
        const cellW = Math.min(76, safeRight * 0.17);
        const cellH = Math.min(46, (stageBottom - 64 - stageTop) * 0.26);
        const box = (label: string, value: number | null, x: number, y: number, dim: boolean) => {
            ctx.fillStyle = value === null ? '#fef3c7' : dim ? '#f1f5f9' : '#dbeafe';
            ctx.fillRect(x - cellW / 2, y - cellH / 2, cellW, cellH);
            ctx.strokeStyle = value === null ? '#b45309' : '#94a3b8';
            ctx.lineWidth = value === null ? 2 : 1;
            ctx.strokeRect(x - cellW / 2, y - cellH / 2, cellW, cellH);
            outlineText(ctx, label, x, y - 2, 'bold 13px monospace', value === null ? '#b45309' : '#0f172a', 'center', cellW - 6);
            outlineText(ctx, value === null ? '?' : value.toFixed(1), x, y + 14, '11px monospace', '#475569', 'center', cellW - 6);
        };
        box(gap.above[0], gap.above[1], cx, cy - cellH - 6, false);
        box(gap.below[0], gap.below[1], cx, cy + cellH + 6, false);
        box(gap.left[0], gap.left[1], cx - cellW - 6, cy, used === 2);
        box(gap.right[0], gap.right[1], cx + cellW + 6, cy, used === 2);
        box(gap.hidden, null, cx, cy, false);

        const px = safeRight * 0.58;
        const pw = safeRight - 16 - px;
        outlineText(ctx, `period ${period}, ${used} neighbours`, px, stageTop + 18, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `total ${total.toFixed(1)}`, px, stageTop + 42, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `estimate ${total.toFixed(1)} / ${used} = ${estimate.toFixed(1)}`, px, stageTop + 66, 'bold 13px monospace', colour, 'left', pw);
        outlineText(ctx, `really ${gap.real.toFixed(1)}`, px, stageTop + 92, '12px monospace', '#0f172a', 'left', pw);
        outlineText(ctx, `out by ${errorPct.toFixed(1)}%`, px, stageTop + 114, 'bold 12px monospace', colour, 'left', pw);

        outlineText(ctx, `estimate = ${values.map(val => val.toFixed(1)).join(' + ')} = ${total.toFixed(1)}, / ${used} = ${estimate.toFixed(1)}`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, errorPct < 5
            ? `close: ${gap.hidden} really is ${gap.real.toFixed(1)}`
            : `far out: ${gap.hidden} really is ${gap.real.toFixed(1)}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', colour, 'center', safeRight - 30);

        fitText(ctx, `${gap.hidden} hidden: the neighbours say ${estimate.toFixed(1)}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Add the neighbours, divide by how many', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 1 - errorPct / 30)),
                caption: 'How Close the Estimate Is',
                low: 'out by 30%',
                high: 'exactly right',
                stops: ['#fee2e2', '#fde68a', '#86efac'] as [string, string, string],
            },
            note: `With ${gap.hidden} hidden, averaging ${used} neighbours gives ${estimate.toFixed(1)}, against its real value of ${gap.real.toFixed(1)}: out by ${errorPct.toFixed(1)}%.`,
        };
    };

    return (
        <LabCanvas
            title="Predicting a Missing Element"
            readout={({ raw }) => `Hiding the element in period ${periodOf(raw)}`}
            controlLabel="Hidden Element's Period"
            controlKey="hiddenPeriod"
            controlMin={3}
            controlMax={5}
            controlInitial={4}
            controlDisplay={raw => `period ${periodOf(raw)}`}
            control2={{
                label: 'Neighbours Used',
                key: 'neighboursUsed',
                min: 2,
                max: 4,
                initial: 4,
                display: raw => `${neighboursOf(raw)}`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Predicting a Missing Element"
            completeNote="Add four, divide by four!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
