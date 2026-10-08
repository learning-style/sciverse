import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: below 1 the bars shrink away, above 1 they climb, and at exactly 1.00
// every bar is the same height. That flat line IS the threshold, and it is the only
// setting where the picture is flat -- so a visual-only learner can find the
// dividing line by moving the dial until the picture stops sloping. The plot
// autoscales to whatever it is showing, because the shape is the message and the
// numbers in the footers carry the size.
const EMERALD = '#047857';
const RUNAWAY = '#b45309';

const bOf = (dial: number): number => Math.max(0.9, Math.min(1.1, Math.round(dial * 100) / 100));
const gensOf = (dial: number): number => Math.max(5, Math.min(40, Math.round(dial)));

export const L3C25BranchLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const branch = bOf(raw);
        const gens = gensOf(raw2);
        const fades = branch < 1;
        const atLine = Math.abs(branch - 1) < 1e-9;
        const total = fades ? 1 / (1 - branch) : 0;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const showRow = usable >= ROW + 30;
        const rowH = showRow ? ROW : 0;
        const plotH = Math.max(8, usable - rowH);
        const top = artTop + Math.max(0, (usable - (rowH + plotH)) / 2);
        const plotTop = top;
        const plotBottom = plotTop + plotH;
        const labelRow = plotBottom + 11;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const slot = fullW / (gens + 1);
        const barW = Math.max(1.5, slot * 0.7);

        // the tallest generation on show, so both a dying and a climbing chain fill the plot
        const peak = branch <= 1 ? 1 : Math.pow(branch, gens);

        for (let n = 0; n <= gens; n++) {
            const carriers = Math.pow(branch, n);
            const h = Math.max(1, plotH * (carriers / peak));
            const x = left + slot * n + (slot - barW) / 2;
            ctx.fillStyle = atLine ? '#64748b' : fades ? EMERALD : RUNAWAY;
            ctx.fillRect(x, plotBottom - h, barW, h);
        }
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + fullW, plotBottom);
        ctx.stroke();

        if (showRow) {
            outlineText(ctx, 'carriers x ' + branch.toFixed(2) + ' each cycle', safeRight / 2, labelRow,
                'bold 11px monospace', atLine ? '#334155' : fades ? EMERALD : RUNAWAY, 'center', safeRight - 24);
        }

        outlineText(ctx, fades
            ? '1 / (1 - ' + branch.toFixed(2) + ') = ' + total.toFixed(0) + ' cycles'
            : 'no finite total at all',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, atLine ? 'exactly 1: the threshold'
            : fades ? 'below 1: the chain fades' : 'above 1: it never stops',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            atLine ? '#334155' : fades ? EMERALD : RUNAWAY, 'center', safeRight - 30);

        fitText(ctx, fades ? 'total ' + total.toFixed(0) + ' cycles' : atLine ? 'every one the same' : 'runs away',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Carriers each generation', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (branch - 0.9) / 0.2)),
                caption: 'Carriers Handed Back',
                low: 'fades out',
                high: 'runs away: explosion',
                stops: [EMERALD, '#fcd34d', RUNAWAY] as [string, string, string],
            },
            note: fades
                ? 'At b = ' + branch.toFixed(2) + ' the chain is ' + (1 - branch).toFixed(2)
                  + ' below the threshold, so it manages 1/(1-b) = ' + total.toFixed(0)
                  + ' cycles and dies. Only the distance to 1 matters.'
                : atLine
                    ? 'At exactly b = 1.00 every generation replaces itself, so the bars are all the same height for ever and there is no total.'
                    : 'At b = ' + branch.toFixed(2) + ' each generation is bigger than the last, so after '
                      + gens + ' generations one carrier has become ' + Math.pow(branch, gens).toFixed(1)
                      + ' and there is no finite total.',
        };
    };

    return (
        <LabCanvas
            title="When a Chain Hands Back Two"
            readout={({ raw }) => 'Carriers handed back b = ' + bOf(raw).toFixed(2)}
            controlLabel="Carriers Handed Back b"
            controlKey="branchRatio"
            controlMin={0.9}
            controlMax={1.1}
            controlInitial={0.95}
            controlDisplay={raw => 'b = ' + bOf(raw).toFixed(2)}
            control2={{
                label: 'Generations',
                key: 'branchGens',
                min: 5,
                max: 40,
                initial: 30,
                display: raw => gensOf(raw) + ' cycles',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Can Tiny Changes Cause Big Effects?"
            completeNote="Above or below 1 is the only question!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
