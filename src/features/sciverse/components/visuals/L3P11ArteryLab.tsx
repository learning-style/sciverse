import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Resistance of the model artery when fully open, mmHg for each L/min. */
const OPEN_RESISTANCE = 20;
const NEEDED_FLOW = 0.5;
const MAX_FLOW = 5;
const WALL = '#fca5a5';
const PLAQUE = '#d6a756';

const radiusOf = (dial: number): number => Math.max(30, Math.min(100, Math.round(dial)));
const dropOf = (dial: number): number => Math.max(5, Math.min(100, Math.round(dial)));

export const L3P11ArteryLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const pct = radiusOf(raw);
        const drop = dropOf(raw2);
        const ratio = pct / 100;
        const squared = ratio * ratio;
        const fourth = squared * squared;
        const resistance = OPEN_RESISTANCE / fourth;
        const flow = drop / resistance;

        // The artery, open at both ends and narrowed by plaque in the middle
        const x0 = 30;
        const x1 = safeRight * 0.56;
        const midY = stageTop + (stageBottom - 64 - stageTop) * 0.45;
        const openR = Math.max(18, Math.min(40, (stageBottom - 64 - stageTop) * 0.3));
        const narrowR = openR * ratio;
        const n0 = x0 + (x1 - x0) * 0.35;
        const n1 = x0 + (x1 - x0) * 0.65;
        ctx.fillStyle = WALL;
        ctx.fillRect(x0, midY - openR - 8, x1 - x0, 8);
        ctx.fillRect(x0, midY + openR, x1 - x0, 8);
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(x0, midY - openR, x1 - x0, 2 * openR);
        if (pct < 100) {
            ctx.fillStyle = PLAQUE;
            ctx.fillRect(n0, midY - openR, n1 - n0, openR - narrowR);
            ctx.fillRect(n0, midY + narrowR, n1 - n0, openR - narrowR);
        }
        // Red cells moving through, at a speed that follows the flow
        const speed = (flow / MAX_FLOW) * 220 + 6;
        ctx.fillStyle = '#dc2626';
        for (let i = 0; i < 14; i++) {
            const along = (t * speed + i * ((x1 - x0) / 14)) % (x1 - x0);
            const x = x0 + along;
            const inNarrow = x > n0 && x < n1;
            const r = inNarrow ? narrowR : openR;
            const y = midY + Math.sin(i * 2.1) * r * 0.55;
            ctx.beginPath();
            ctx.ellipse(x, y, 5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, `radius ${pct}% of normal`, (n0 + n1) / 2, midY + openR + 26, 'bold 12px monospace', '#92400e', 'center', x1 - x0);

        const px = safeRight * 0.62;
        const pw = safeRight - 16 - px;
        outlineText(ctx, `${ratio.toFixed(2)}² = ${squared.toFixed(2)}`, px, stageTop + 18, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `squared again = ${fourth.toFixed(2)}`, px, stageTop + 40, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `resistance = 20 / ${fourth.toFixed(2)}`, px, stageTop + 66, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `= ${resistance.toFixed(1)} mmHg for each L/min`, px, stageTop + 86, 'bold 12px monospace', '#4f46e5', 'left', pw);
        outlineText(ctx, `flow ${flow.toFixed(2)} L/min`, px, stageTop + 114, 'bold 14px monospace', '#b91c1c', 'left', pw);

        outlineText(ctx, `flow = pressure drop / resistance = ${drop} / ${resistance.toFixed(1)} = ${flow.toFixed(2)} L/min`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `to push 0.5 L/min through: ${(NEEDED_FLOW * resistance).toFixed(1)} mmHg needed`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#4f46e5', 'center', safeRight - 30);

        fitText(ctx, `${flow.toFixed(2)} L/min through an artery at ${pct}% radius`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Flow goes with radius to the fourth', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, flow / MAX_FLOW)),
                caption: 'Flow',
                low: '0 L/min',
                high: '5 L/min',
                stops: ['#fee2e2', '#f87171', '#b91c1c'] as [string, string, string],
            },
            note: `At ${pct}% of its radius the artery's resistance is ${resistance.toFixed(1)} mmHg for each L/min, so with a ${drop} mmHg drop the flow is ${flow.toFixed(2)} L/min.`,
        };
    };

    return (
        <LabCanvas
            title="Why Narrow Arteries Matter So Much"
            readout={({ raw }) => `An artery at ${radiusOf(raw)}% of its normal radius`}
            controlLabel="Radius"
            controlKey="radius"
            controlMin={30}
            controlMax={100}
            controlInitial={100}
            controlDisplay={raw => `${radiusOf(raw)}%`}
            control2={{
                label: 'Pressure Drop',
                key: 'pressureDrop',
                min: 5,
                max: 100,
                initial: 10,
                display: raw => `${dropOf(raw)} mmHg`,
            }}
            accent="indigo"
            sky={['#fef2f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Narrow Arteries Matter So Much"
            completeNote="Square, then square again!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
