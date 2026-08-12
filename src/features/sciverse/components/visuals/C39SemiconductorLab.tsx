import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Pure silicon barely conducts; a whisper of dopant atoms turns it into a switch. */
export const C39SemiconductorLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const gridX = 50;
        const gridY = 120;
        const cols = 9;
        const rows = 5;
        const cellW = (safeRight - 100) / cols;
        const cellH = 26;

        // Silicon lattice. A few atoms are swapped for dopant atoms.
        const dopantCount = Math.round(v * 8);
        let placed = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = gridX + c * cellW + cellW / 2;
                const y = gridY + r * cellH + cellH / 2;
                // Spread dopants evenly through the lattice.
                const isDopant = placed < dopantCount && (r * cols + c) % Math.max(1, Math.floor((rows * cols) / Math.max(1, dopantCount))) === 0;
                if (isDopant) placed++;

                ctx.fillStyle = isDopant ? '#f97316' : '#94a3b8';
                ctx.beginPath();
                ctx.arc(x, y, isDopant ? 8 : 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#1e293b';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        outlineText(ctx, 'silicon atom', gridX + 60, gridY + rows * cellH + 24, 'bold 10px monospace');
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath(); ctx.arc(gridX + 8, gridY + rows * cellH + 20, 6, 0, Math.PI * 2); ctx.fill();
        outlineText(ctx, 'added atom (dopant)', safeRight - 120, gridY + rows * cellH + 24, 'bold 10px monospace');
        ctx.fillStyle = '#f97316';
        ctx.beginPath(); ctx.arc(safeRight - 210, gridY + rows * cellH + 20, 6, 0, Math.PI * 2); ctx.fill();

        // Free electrons only appear once dopants are present.
        const conduction = v;
        for (let i = 0; i < Math.round(conduction * 12); i++) {
            const seed = i * 59.3;
            const x = gridX + ((seed * 9.1 + t * 70) % (safeRight - 100));
            const y = gridY + 10 + ((seed * 7.3) % (rows * cellH - 20));
            ctx.fillStyle = '#0ea5e9';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        const label = v < 0.12 ? 'PURE SILICON -- blocks current (like an insulator)'
            : v < 0.5 ? 'LIGHTLY DOPED -- starts to conduct'
                : 'DOPED SILICON -- conducts well (switch is ON)';
        outlineText(ctx, label, safeRight / 2, 90, 'bold 12px monospace');
        outlineText(ctx, `${dopantCount} added atoms in ${rows * cols} -- real chips use about 1 in a million`,
            safeRight / 2, H - 116, 'bold 11px monospace');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, conduction,
            'How Well It Carries Electricity', 'Blocks', 'Conducts'
        );

        const msg = v < 0.12
            ? 'No dopant atoms: electrons are stuck and nothing flows.'
            : v < 0.5
                ? 'A few added atoms free some electrons -- current begins to flow.'
                : 'Plenty of free electrons. The silicon now conducts and the switch is on.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="The Magic Middle"
            readout={({ raw }) => `Doping amount: ${raw}%`}
            controlLabel="Doping Amount"
            controlKey="dopingAmount"
            controlInitial={0}
            accent="emerald"
            sky={['#f1f5f9', '#f8fafc']}
            completeTitle="C39 Complete!"
            completeSubtitle="How Do Computers Use Logic to Solve Problems?"
            completeNote="One atom in a million turns silicon into a switch!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
