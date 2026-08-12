import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Fruit set rises with pollinator numbers, then levels off once every flower is visited. */
export const B34FarmTeamLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const groundY = H - 150;

        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, safeRight, H - groundY);

        // Fruit set saturates: extra bees beyond full coverage add little.
        const pollinated = 1 - Math.exp(-3.2 * v);

        // Four trees; each shows flowers or fruit depending on pollination.
        const trees = 4;
        for (let i = 0; i < trees; i++) {
            const x = 55 + i * ((safeRight - 110) / (trees - 1));
            ctx.fillStyle = '#78350f';
            ctx.fillRect(x - 5, groundY - 46, 10, 46);
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.arc(x, groundY - 68, 34, 0, Math.PI * 2);
            ctx.fill();

            // Six blossoms per tree; the pollinated share becomes apples.
            for (let j = 0; j < 6; j++) {
                const a = (j / 6) * Math.PI * 2;
                const fx = x + Math.cos(a) * 20;
                const fy = groundY - 68 + Math.sin(a) * 20;
                const isFruit = (j + 1) / 6 <= pollinated;
                ctx.fillStyle = isFruit ? '#dc2626' : '#fbcfe8';
                ctx.beginPath();
                ctx.arc(fx, fy, isFruit ? 6 : 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#1e293b';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // Bees flying between trees.
        const bees = Math.round(v * 12);
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        for (let i = 0; i < bees; i++) {
            const seed = i * 61.3;
            const x = 50 + ((Math.sin(t * 0.7 + seed) * 0.5 + 0.5) * (safeRight - 100));
            const y = groundY - 110 + Math.sin(t * 2 + seed) * 26;
            ctx.fillText('🐝', x, y);
        }

        outlineText(ctx, `${bees} pollinators working   |   ${Math.round(pollinated * 100)}% of flowers became fruit`,
            safeRight / 2, 82, 'bold 12px monospace');

        // Legend for the blossom colours.
        ctx.fillStyle = '#fbcfe8';
        ctx.beginPath(); ctx.arc(40, 106, 5, 0, Math.PI * 2); ctx.fill();
        outlineText(ctx, 'unpollinated flower', 130, 110, 'bold 10px monospace');
        ctx.fillStyle = '#dc2626';
        ctx.beginPath(); ctx.arc(safeRight - 170, 106, 6, 0, Math.PI * 2); ctx.fill();
        outlineText(ctx, 'apple!', safeRight - 130, 110, 'bold 10px monospace');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, pollinated,
            'Harvest Size', 'Almost none', 'Full crop'
        );

        const msg = v < 0.15
            ? 'Hardly any bees -- the trees look healthy but make almost no fruit.'
            : v < 0.5
                ? 'Some bees. Many flowers still never get visited.'
                : v < 0.85
                    ? 'Good pollinator numbers -- most flowers become fruit!'
                    : 'Plenty of bees. Every flower gets visited; extra bees add little more.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="The Farm Team"
            readout={({ raw }) => `Pollinator count: ${raw}%`}
            controlLabel="Pollinator Count"
            controlKey="pollinatorCount"
            controlInitial={45}
            accent="rose"
            sky={['#dbeafe', '#fef9c3']}
            completeTitle="B34 Complete!"
            completeSubtitle="How Do Farms Feed a Growing World?"
            completeNote="No bees, no apples -- a farm is a living community!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
