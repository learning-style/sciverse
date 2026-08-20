import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Particle sizes in micrometres, largest first.
const PARTICLES = [
    { label: 'sand', size: 100, color: '#a16207', r: 9 },
    { label: 'grit', size: 20, color: '#78716c', r: 7 },
    { label: 'bacteria', size: 1, color: '#dc2626', r: 5 },
    { label: 'virus', size: 0.1, color: '#7c3aed', r: 3 },
];

/** Filter hole size decides what is trapped; smaller holes also mean slower flow. */
export const P36FilterLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        // Hole size sweeps 200 down to 0.05 micrometres on a log scale.
        const holeUm = Math.pow(10, 2.3 - v * 3.6);
        const filterY = H * 0.5;

        // The filter itself. Fewer, wider gaps when holes are large.
        ctx.fillStyle = '#475569';
        ctx.fillRect(30, filterY, safeRight - 60, 16);
        const gapCount = 6;
        const gapW = Math.max(2, 16 - v * 14);
        ctx.fillStyle = '#f8fafc';
        for (let i = 0; i < gapCount; i++) {
            const x = 30 + (i + 0.5) * ((safeRight - 60) / gapCount) - gapW / 2;
            ctx.fillRect(x, filterY, gapW, 16);
        }
        outlineText(ctx, `FILTER: holes ${holeUm >= 1 ? holeUm.toFixed(0) : holeUm.toFixed(2)} micrometres`,
            safeRight / 2, filterY - 24, 'bold 14px monospace');

        // Particles fall; those bigger than a hole stop on top of the filter.
        let blocked = 0;
        PARTICLES.forEach((p, i) => {
            const passes = p.size < holeUm;
            if (!passes) blocked++;
            const laneX = 70 + i * ((safeRight - 140) / (PARTICLES.length - 1));
            const cycle = (t * 45 + i * 40) % 220;

            let y: number;
            if (passes) {
                y = 110 + cycle;                      // falls all the way through
            } else {
                y = Math.min(110 + cycle, filterY - p.r - 2); // stops at the filter
            }

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(laneX, y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            outlineText(ctx, p.label, laneX, 100, 'bold 13px monospace');
            outlineText(ctx, passes ? 'passes' : 'BLOCKED', laneX, filterY + 40,
                'bold 13px monospace', passes ? '#b91c1c' : '#15803d');
        });

        // Flow rate drops as holes shrink.
        const flow = Math.max(0.05, 1 - v * 0.92);
        outlineText(ctx, `Blocked ${blocked} of 4 particle types   |   Flow speed ${Math.round(flow * 100)}%`,
            safeRight / 2, 84, 'bold 14px monospace');


        const msg = holeUm > 50
            ? 'Big holes: only sand is caught. Water looks dirty and IS dirty.'
            : holeUm > 5
                ? 'Grit is caught now -- but bacteria and viruses stroll straight through.'
                : holeUm > 0.5
                    ? 'Bacteria are blocked! Water looks clean, but viruses still pass.'
                    : 'Tiny holes catch almost everything -- but the flow slows to a trickle.';
        return { meter: { fraction: blocked / PARTICLES.length, caption: 'Cleaning Power', low: 'Catches nothing', high: 'Catches everything' }, note: msg };
    };

    return (
        <LabCanvas
            title="Trapped by the Filter"
            readout={({ v }) => {
                const um = Math.pow(10, 2.3 - v * 3.6);
                return `Hole size: ${um >= 1 ? um.toFixed(0) : um.toFixed(2)} micrometres`;
            }}
            controlLabel="Filter Hole Size"
            controlKey="filterHoleSize"
            controlDisplay={(_raw, v) => {
                const um = Math.pow(10, 2.3 - v * 3.6);
                return `${um >= 1 ? um.toFixed(0) : um.toFixed(2)} micrometres`;
            }}
            controlInitial={30}
            accent="indigo"
            sky={['#e0f2fe', '#f8fafc']}
            completeTitle="P36 Complete!"
            completeSubtitle="How Do We Make Water Safe to Drink?"
            completeNote="Clear water is not the same as clean water!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
