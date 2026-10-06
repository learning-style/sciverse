import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: three steps in a queue, and the shortest decides. Three horizontal bars
// on one scale, with a line dropped at the shortest -- that line IS the delivery, so
// the arithmetic is the picture. Each bar gets its own row, which is what makes the
// labels safe: there is never more than one label on a line.
const XYLEM = 300;             // L/day, fixed: this tree's plumbing
const SPAN = 520;              // the largest a dial can reach, with room at the tip
const ROSE = '#be123c';
const SPARE = '#fda4af';       // a step with capacity to spare
const LIMIT = '#b45309';       // the limiting step

const rootsOf = (dial: number): number => Math.max(50, Math.min(500, Math.round(dial / 10) * 10));
const demandOf = (dial: number): number => Math.max(50, Math.min(500, Math.round(dial / 10) * 10));

export const L2B24QueueLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const roots = rootsOf(raw);
        const demand = demandOf(raw2);
        const delivery = Math.min(roots, XYLEM, demand);
        const steps: Array<[string, number]> = [['roots', roots], ['xylem', XYLEM], ['leaves', demand]];
        // The first of the three to equal the delivery is the one named, so a tie
        // reads from the top of the queue rather than flickering between them.
        const limitName = steps.find(s => s[1] === delivery)?.[0] ?? 'roots';

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // room never exceeds usable, so the third bar cannot reach the footer lines.
        const room = Math.max(12, usable);
        const top = artTop + Math.max(0, (usable - room) / 2);
        const rowH = room / 3;
        const barH = Math.max(5, Math.min(rowH * 0.54, 20));
        // A phone-height canvas gives rows too thin for 11px text. The bars and the
        // dropped line still carry the comparison, and both footers say it in words.
        const showBarText = rowH >= 14;

        const left = 24;
        const nameW = 50;
        const barX0 = left + nameW;
        const barMax = Math.max(40, safeRight - 26 - barX0 - 30);
        const scale = barMax / SPAN;

        steps.forEach(([name, cap], i) => {
            const cyRow = top + rowH * (i + 0.5);
            const len = Math.max(3, cap * scale);
            const limiting = cap === delivery && name === limitName;
            ctx.fillStyle = limiting ? LIMIT : SPARE;
            ctx.fillRect(barX0, cyRow - barH / 2, len, barH);
            ctx.strokeStyle = limiting ? LIMIT : ROSE;
            ctx.lineWidth = 1.4;
            ctx.strokeRect(barX0, cyRow - barH / 2, len, barH);
            if (showBarText) {
                outlineText(ctx, name, left, cyRow + 4, 'bold 11px monospace',
                    limiting ? LIMIT : '#334155', 'left', nameW - 4);
                outlineText(ctx, String(cap), barX0 + len + 4, cyRow + 4, 'bold 11px monospace',
                    limiting ? LIMIT : '#334155', 'left', 28);
            }
        });

        // the delivery: a line dropped at the shortest bar, straight through the queue
        const cut = barX0 + Math.max(3, delivery * scale);
        ctx.strokeStyle = LIMIT;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(cut, top + 2);
        ctx.lineTo(cut, top + room - 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // water crossing the tree, at the rate the queue allows
        ctx.fillStyle = ROSE;
        const march = (t * 26) % 22;
        for (let i = 0; i < 4; i++) {
            const dx = barX0 + 5 + ((i * 22 + march) % Math.max(1, cut - barX0 - 6));
            ctx.beginPath();
            ctx.arc(dx, top + rowH * 1.5, 1.7, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'smallest of ' + roots + ', ' + XYLEM + ', ' + demand,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, limitName === 'leaves' ? 'the leaves ask for less'
            : limitName === 'xylem' ? 'the xylem is the limit'
                : 'the roots are the limit',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', LIMIT, 'center', safeRight - 30);

        fitText(ctx, 'crosses: ' + delivery + ' L/day', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Three steps in a queue', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, delivery / 500)),
                caption: 'What Crosses the Tree',
                low: 'the tree wilts',
                high: 'all it asks for',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: 'Roots ' + roots + ', xylem ' + XYLEM + ', leaves asking ' + demand
                + ' L/day: the smallest is ' + delivery + ', so that is what crosses the tree and the '
                + limitName + ' set it. Raising any other step changes nothing.',
        };
    };

    return (
        <LabCanvas
            title="Where the Tree Gets Stuck"
            readout={({ raw }) => 'Root uptake ' + rootsOf(raw) + ' L/day'}
            controlLabel="Root Uptake"
            controlKey="rootUptake"
            controlMin={50}
            controlMax={500}
            controlInitial={250}
            controlDisplay={raw => rootsOf(raw) + ' L/day'}
            control2={{
                label: 'Leaf Demand',
                key: 'leafDemand',
                min: 50,
                max: 500,
                initial: 400,
                display: raw => demandOf(raw) + ' L/day',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Networks Deliver What Matters?"
            completeNote="Chains take the smallest, junctions divide!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
