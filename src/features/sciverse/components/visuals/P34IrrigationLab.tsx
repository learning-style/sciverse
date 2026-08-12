import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Slow flow soaks in; fast flow runs off. Spray always loses some to evaporation. */
export const P34IrrigationLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const soilY = H - 150;

        // Soil and root zone.
        ctx.fillStyle = '#a16207';
        ctx.fillRect(0, soilY, safeRight, H - soilY);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(0, soilY + 46, safeRight, H - soilY - 46);
        outlineText(ctx, 'root zone', 60, soilY + 40, 'bold 11px monospace', '#ffffff');

        // Plant.
        const px = safeRight / 2;
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(px, soilY);
        ctx.lineTo(px, soilY - 52);
        ctx.stroke();
        ctx.fillStyle = '#22c55e';
        [-1, 1].forEach(dir => {
            ctx.beginPath();
            ctx.ellipse(px + dir * 18, soilY - 46, 18, 9, dir * 0.4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Water losses. Faster flow means more runoff; spray height means evaporation.
        const runoff = Math.pow(v, 2) * 0.6;
        const evaporation = 0.05 + v * 0.25;
        const absorbed = Math.max(0.05, 1 - runoff - evaporation);

        // Falling droplets.
        const drops = 6 + Math.round(v * 14);
        for (let i = 0; i < drops; i++) {
            const seed = i * 53.7;
            const x = px - 60 + ((seed * 7.3) % 120);
            const fall = ((t * (60 + v * 220) + seed * 9) % (soilY - 90));
            ctx.fillStyle = '#0ea5e9';
            ctx.beginPath();
            ctx.ellipse(x, 96 + fall, 3.5, 6, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Evaporating vapour rising away.
        for (let i = 0; i < Math.round(evaporation * 20); i++) {
            const seed = i * 31.1;
            const x = px - 70 + ((seed * 11.7) % 140);
            const rise = ((t * 40 + seed * 5) % 90);
            ctx.fillStyle = `rgba(148,163,184,${0.65 - rise / 140})`;
            ctx.beginPath();
            ctx.arc(x, 150 - rise, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Runoff sliding off to the side.
        if (runoff > 0.12) {
            ctx.fillStyle = '#38bdf8';
            const w = runoff * safeRight * 0.45;
            ctx.fillRect(safeRight - w - 10, soilY - 8, w, 8);
            outlineText(ctx, 'runoff!', safeRight - w / 2 - 10, soilY - 16, 'bold 11px monospace', '#b91c1c');
        }

        outlineText(ctx, `Soaked into roots: ${Math.round(absorbed * 100)}%`, safeRight / 2, 82, 'bold 13px monospace');
        outlineText(
            ctx,
            `Lost to evaporation: ${Math.round(evaporation * 100)}%   Lost to runoff: ${Math.round(runoff * 100)}%`,
            safeRight / 2, 104, 'bold 12px monospace'
        );

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, absorbed,
            'Watering Efficiency', 'Wasteful', 'Efficient'
        );

        const msg = v < 0.3
            ? 'Slow and steady -- like drip irrigation. Almost nothing is wasted!'
            : v < 0.65
                ? 'Medium flow. Some water soaks in, some slides away.'
                : 'Too fast! The soil cannot drink it and most of it runs off.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Water on the Move"
            readout={({ raw }) => `Water flow rate: ${raw}%`}
            controlLabel="Water Flow Rate"
            controlKey="waterFlowRate"
            controlMin={5}
            controlInitial={50}
            accent="indigo"
            sky={['#e0f2fe', '#fef9c3']}
            completeTitle="P34 Complete!"
            completeSubtitle="How Do Farms Feed a Growing World?"
            completeNote="Slow, cool, and close to the roots wastes the least!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
