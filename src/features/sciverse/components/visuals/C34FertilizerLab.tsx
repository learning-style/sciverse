import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Crop growth peaks at the right dose; anything past it runs off into the river. */
export const C34FertilizerLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const soilY = H - 150;
        const riverX = safeRight - 90;

        ctx.fillStyle = '#a16207';
        ctx.fillRect(0, soilY, riverX, H - soilY);

        // Crop grows until the plant's limit, then stops (and burns if overdosed).
        const uptake = Math.min(v, 0.5) / 0.5;          // plant can only use up to half dose
        const excess = Math.max(0, v - 0.5) / 0.5;      // everything beyond that is waste
        const burn = Math.max(0, v - 0.82) / 0.18;      // very high dose damages the crop
        const health = Math.max(0.08, uptake - burn * 0.8);

        for (let i = 0; i < 4; i++) {
            const x = 60 + i * ((riverX - 120) / 3);
            const h = 20 + health * 62;
            ctx.strokeStyle = burn > 0.4 ? '#a16207' : '#15803d';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(x, soilY);
            ctx.lineTo(x, soilY - h);
            ctx.stroke();
            ctx.fillStyle = burn > 0.4 ? '#ca8a04' : '#22c55e';
            [-1, 1].forEach(dir => {
                ctx.beginPath();
                ctx.ellipse(x + dir * 15, soilY - h + 8, 15, 8, dir * 0.4, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Fertilizer granules sprinkled on the soil.
        for (let i = 0; i < Math.round(v * 24); i++) {
            const seed = i * 47.3;
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.arc(30 + ((seed * 5.1) % (riverX - 60)), soilY + 8 + ((seed * 3.3) % 26), 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // The river, greening with algae as excess runs off.
        const algae = excess;
        ctx.fillStyle = `rgb(${Math.round(56 + algae * 40)},${Math.round(160 + algae * 70)},${Math.round(220 - algae * 150)})`;
        ctx.fillRect(riverX, soilY - 30, safeRight - riverX, H - soilY + 30);
        outlineText(ctx, 'RIVER', riverX + (safeRight - riverX) / 2, soilY - 40, 'bold 11px monospace');

        // Runoff arrow carrying the excess.
        if (excess > 0.08) {
            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(riverX - 70, soilY - 6);
            ctx.lineTo(riverX - 6, soilY - 6);
            ctx.stroke();
            outlineText(ctx, 'runoff', riverX - 38, soilY - 14, 'bold 11px monospace', '#b91c1c');
        }

        // Fish struggle as algae take the oxygen.
        const fishAlive = Math.max(0, 1 - algae);
        ctx.font = '18px serif';
        ctx.textAlign = 'center';
        for (let i = 0; i < 3; i++) {
            const y = soilY + 8 + i * 26;
            const drift = Math.sin(t * 1.2 + i) * 5;
            ctx.fillText(i / 3 < fishAlive ? '🐟' : '💀', riverX + (safeRight - riverX) / 2 + drift, y);
        }

        outlineText(ctx, `Crop health: ${Math.round(health * 100)}%   River health: ${Math.round(fishAlive * 100)}%`,
            safeRight / 2, 82, 'bold 13px monospace');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, Math.min(health, fishAlive),
            'Overall Farm Score (crop AND river)', 'Poor', 'Great'
        );

        const msg = v < 0.2
            ? 'Not enough plant food -- the crop grows small and pale.'
            : v <= 0.55
                ? 'Good dose! Plants use nearly all of it and the river stays clean.'
                : v < 0.85
                    ? 'Too much. The extra washes into the river and feeds algae.'
                    : 'Way too much! The crop is burning and the river is choking.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Plant Food Chemistry"
            readout={({ raw }) => `Fertilizer amount: ${raw}%`}
            controlLabel="Fertilizer Amount"
            controlKey="fertilizerAmount"
            controlInitial={40}
            accent="emerald"
            sky={['#fef9c3', '#f0fdf4']}
            completeTitle="C34 Complete!"
            completeSubtitle="How Do Farms Feed a Growing World?"
            completeNote="More fertilizer is not better fertilizer!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
