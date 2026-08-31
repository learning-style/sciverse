import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const LEVELS = ['Grass', 'Rabbits', 'Foxes', 'Hawks', 'Eagles'];
const COLORS = ['#4d7c0f', '#a16207', '#c2410c', '#9f1239', '#5b21b6'];

/** Energy pyramid: each trophic level keeps only ~10% of the level below. */
export const P33EnergyLadderLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const steps = raw;
        const cx = safeRight / 2;

        // Bands share the stage, leaving a strip at the bottom for the Sun
        // caption. Everything stays inside stageTop..stageBottom.
        const pyramidBottom = stageBottom - 44;
        const pyramidTop = stageTop + 4;
        const slot = Math.max(26, (pyramidBottom - pyramidTop) / steps);
        const bandH = Math.min(36, slot * 0.72);
        const maxW = safeRight * 0.5;

        for (let i = 0; i < steps; i++) {
            const w = Math.max(46, maxW * Math.pow(0.58, i));
            const y = pyramidBottom - i * slot - bandH;
            const x = cx - w / 2;

            ctx.fillStyle = COLORS[i];
            ctx.fillRect(x, y, w, bandH);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, w, bandH);

            // Name sits inside the band, white on a dark fill.
            ctx.font = 'bold 15px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(LEVELS[i], cx, y + bandH / 2 + 5);

            // Energy remaining, clamped so it never runs into the gutter.
            const energyPct = Math.pow(0.1, i) * 100;
            const label = energyPct >= 1 ? `${energyPct.toFixed(0)}%`
                : energyPct >= 0.01 ? `${energyPct.toFixed(2)}%`
                : `${energyPct.toExponential(0)}%`;
            const lx = Math.min(x + w + 12, safeRight - 96);
            outlineText(ctx, `${label} left`, lx, y + bandH / 2 + 5, 'bold 15px monospace', '#0f172a', 'left', Math.max(40, safeRight - lx - 6));

            // Heat escaping, on the opposite side so the two never collide.
            if (i < steps - 1) {
                const hx = Math.max(x - 12, 84);
                outlineText(ctx, '90% lost as heat', hx, y + bandH / 2 + 5, 'bold 14px monospace', '#c2410c', 'right', Math.max(40, hx - 6));
            }
        }

        // Sun caption anchored to the bottom edge.
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(cx - 132, stageBottom - 16, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, 'SUN — 100% of the energy enters here', cx + 12, stageBottom - 11, 'bold 15px monospace');

        // Headline readouts.
        const topEnergy = Math.pow(0.1, steps - 1) * 100;
        const topLabel = topEnergy >= 0.01 ? topEnergy.toFixed(2) : topEnergy.toExponential(0);
        outlineText(ctx, `Top animal receives ${topLabel}% of the Sun's energy`, cx, 88, 'bold 15px monospace');
        const msg = steps <= 2
            ? 'Short chain — most of the energy is still here.'
            : steps === 3
                ? 'Three steps — only about 1% is left.'
                : 'Long chain — nearly all the energy is gone.';
        return { note: msg };
    };

    return (
        <LabCanvas
            title="The Energy Ladder"
            readout={({ raw }) => `Food chain steps: ${raw}`}
            controlLabel="Food Chain Steps"
            controlKey="foodChainSteps"
            controlMin={1}
            controlMax={5}
            controlInitial={3}
            controlDisplay={v => `${v}`}
            accent="indigo"
            sky={['#dbeafe', '#f0fdf4']}
            completeTitle="P33 Complete!"
            completeSubtitle="How Do Ecosystems Support Human Life?"
            completeNote="Only 10% of energy survives each step up the chain!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
