import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: each layer multiplies, so each row is more crowded than the one above.
// No row can draw 160,000 dots, so a row that overflows is drawn FULL and its real
// count printed beside it -- the row filling up from the left is the message, and
// the number carries the size. Row 0 is a single dot, which is a worker gene, and
// seeing one dot above a packed row is the whole lesson.
const MAX_DOTS = 30;
const ROSE = '#be123c';
const SPREAD = '#fda4af';

const breadthOf = (dial: number): number => Math.max(2, Math.min(30, Math.round(dial)));
const depthOf = (dial: number): number => Math.max(0, Math.min(4, Math.round(dial)));

const comma = (value: number): string => Math.round(value).toLocaleString('en-GB');

export const L2B25CascadeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const breadth = breadthOf(raw);
        const depth = depthOf(raw2);
        const affected = Math.pow(breadth, depth);
        const rows = depth + 1;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const rowH = Math.min(usable / rows, 30);
        const blockH = rowH * rows;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const showCounts = rowH >= 14;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const countW = 58;
        const dotsW = Math.max(30, fullW - countW - 6);

        for (let i = 0; i < rows; i++) {
            const count = Math.pow(breadth, i);
            const shown = Math.min(count, MAX_DOTS);
            const cyRow = top + rowH * (i + 0.5);
            // 30px of the dots area is reserved for the ellipsis, which otherwise ran
            // into the count column at the narrow end.
            const pitch = shown > 1 ? Math.min((dotsW - 30) / shown, 9) : 9;
            const dotR = Math.max(1.4, Math.min(2.8, Math.min(rowH * 0.2, pitch * 0.42)));
            ctx.fillStyle = i === 0 ? ROSE : SPREAD;
            for (let j = 0; j < shown; j++) {
                ctx.beginPath();
                ctx.arc(left + 4 + j * pitch + dotR, cyRow, dotR, 0, Math.PI * 2);
                ctx.fill();
            }
            // a row that ran out of room says so, rather than pretending
            if (count > MAX_DOTS) {
                outlineText(ctx, '...', left + 4 + shown * pitch + 4, cyRow + 4,
                    'bold 11px monospace', SPREAD, 'left', 20);
            }
            if (showCounts) {
                outlineText(ctx, comma(count), left + fullW, cyRow + 4,
                    'bold 11px monospace', i === 0 ? ROSE : '#334155', 'right', countW);
            }
        }

        outlineText(ctx, breadth + ' ^ ' + depth + ' = ' + comma(affected) + ' genes',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, depth === 0 ? 'a worker gene: 1 job'
            : affected <= 20 ? 'a noticeable defect'
                : affected <= 400 ? 'a whole tissue'
                    : affected <= 8000 ? 'an organ, or a body part'
                        : 'more genes than a human has',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, comma(affected) + ' genes affected', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Each layer multiplies', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.log10(Math.max(1, affected)) / 6)),
                caption: 'How Far the Damage Reaches',
                low: 'one job broken',
                high: 'ends a pregnancy',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: depth === 0
                ? 'A worker gene has no layers below it, so breaking it affects 1 thing -- whatever the breadth of switches you did not break.'
                : 'A switch ' + depth + ' layers up, each controlling ' + breadth + ' genes, reaches '
                  + comma(affected) + ' of them. One more layer would reach ' + comma(affected * breadth) + '.',
        };
    };

    return (
        <LabCanvas
            title="Where the Mutation Lands"
            readout={({ raw }) => 'Each switch turns on ' + breadthOf(raw) + ' genes'}
            controlLabel="Genes Each Switch Turns On"
            controlKey="switchBreadth"
            controlMin={2}
            controlMax={30}
            controlInitial={20}
            controlDisplay={raw => breadthOf(raw) + ' genes'}
            control2={{
                label: 'Layers Below',
                key: 'cascadeDepth',
                min: 0,
                max: 4,
                initial: 3,
                display: raw => depthOf(raw) + ' layers',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Can Tiny Changes Cause Big Effects?"
            completeNote="Multiplied, never added!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
