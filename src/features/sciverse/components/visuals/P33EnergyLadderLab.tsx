import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const LEVELS = ['Grass', 'Rabbits', 'Foxes', 'Hawks', 'Eagles'];
const COLORS = ['#65a30d', '#ca8a04', '#c2410c', '#9f1239', '#581c87'];

/** Energy pyramid: each trophic level keeps only ~10% of the level below. */
export const P33EnergyLadderLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, raw }: LabScene) => {
        const steps = raw;
        const baseY = H - 110;
        const bandH = 30;
        const maxW = safeRight * 0.62;

        for (let i = 0; i < steps; i++) {
            // Each level keeps 10% of the one below it.
            const energy = Math.pow(0.1, i);
            // Width uses a gentler scale so the top bands stay visible.
            const w = Math.max(18, maxW * Math.pow(0.45, i));
            const y = baseY - i * (bandH + 12);
            const x = safeRight / 2 - w / 2;

            ctx.fillStyle = COLORS[i];
            ctx.fillRect(x, y, w, bandH);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, w, bandH);

            outlineText(ctx, LEVELS[i], safeRight / 2, y + 20, 'bold 13px monospace', '#ffffff');

            const pct = energy * 100;
            const label = pct >= 1 ? `${pct.toFixed(0)}%` : pct >= 0.01 ? `${pct.toFixed(2)}%` : `${pct.toExponential(0)}%`;
            outlineText(ctx, label, x + w + 46, y + 20, 'bold 12px monospace');

            // Heat escaping from this level.
            if (i < steps - 1) {
                ctx.fillStyle = '#f97316';
                ctx.font = '13px monospace';
                ctx.textAlign = 'left';
                ctx.fillText('heat lost', x + w + 90, y + 20);
            }
        }

        // Sun feeding the base.
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(safeRight / 2, baseY + 52, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, 'SUN: 100% energy in', safeRight / 2, baseY + 92, 'bold 12px monospace');

        const topEnergy = Math.pow(0.1, steps - 1) * 100;
        const msg = steps <= 2
            ? 'Short chain! Most of the Sun\'s energy is still here.'
            : steps === 3
                ? 'Three steps: only 1% of the Sun\'s energy is left.'
                : 'Long chain! Almost all the energy is gone as heat.';
        outlineText(ctx, msg, safeRight / 2, 82, 'bold 13px monospace');
        outlineText(
            ctx,
            `Top level keeps ${topEnergy >= 0.01 ? topEnergy.toFixed(2) : topEnergy.toExponential(0)}% of the sunlight`,
            safeRight / 2, 104, 'bold 12px monospace'
        );
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
