import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Panel thickness versus echo: thin panels catch high sounds, low sounds need much thicker ones. */
export const C45AbsorberLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const cm = Math.round(1 + v * 19);
        // High sounds are caught easily; low sounds need a much thicker panel.
        const highAbsorbed = Math.min(1, cm / 5);
        const lowAbsorbed = Math.min(1, cm / 20);
        const echo = 1 - (highAbsorbed * 0.5 + lowAbsorbed * 0.5);

        const wallX = safeRight - 130;
        const midY = (stageTop + stageBottom) / 2;
        const panelPx = 8 + v * 62;

        // Hard wall, with the soft panel mounted on it.
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(wallX, stageTop + 30, 40, stageBottom - stageTop - 90);
        outlineText(ctx, 'hard wall', wallX + 20, stageTop + 18, 'bold 13px monospace');
        ctx.fillStyle = '#6ee7b7';
        ctx.fillRect(wallX - panelPx, stageTop + 30, panelPx, stageBottom - stageTop - 90);
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 2;
        ctx.strokeRect(wallX - panelPx, stageTop + 30, panelPx, stageBottom - stageTop - 90);
        outlineText(ctx, 'soft panel', wallX - panelPx - 12, midY - 60, 'bold 14px monospace', '#047857', 'right');

        // Air pockets inside the panel.
        for (let i = 0; i < Math.round(v * 26); i++) {
            const seed = i * 53.1;
            const x = wallX - panelPx + 5 + ((seed * 3.7) % Math.max(4, panelPx - 10));
            const y = stageTop + 40 + ((seed * 9.3) % (stageBottom - stageTop - 110));
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Incoming sound, and the echo that bounces back.
        const inX = 70 + ((t * 70) % (wallX - panelPx - 110));
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(inX, midY, 16, -0.9, 0.9);
        ctx.stroke();
        outlineText(ctx, 'sound', 70, midY - 42, 'bold 14px monospace', '#4f46e5', 'left');

        if (echo > 0.12) {
            const backX = wallX - panelPx - 30 - ((t * 55) % 150);
            ctx.strokeStyle = `rgba(220,38,38,${echo})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(backX, midY, 16, Math.PI - 0.9, Math.PI + 0.9);
            ctx.stroke();
            outlineText(ctx, 'echo', backX, midY + 44, 'bold 14px monospace', '#b91c1c');
        }

        outlineText(ctx, `High sounds absorbed: ${Math.round(highAbsorbed * 100)}%   Low sounds absorbed: ${Math.round(lowAbsorbed * 100)}%`,
            safeRight / 2, 96, 'bold 14px monospace');
        outlineText(ctx, 'Thin panels catch high sounds; low sounds need thick ones',
            safeRight / 2, 118, 'bold 13px monospace');

        const msg = cm < 4
            ? 'A thin panel. High voices are softened, but low sounds bounce straight back.'
            : cm < 13
                ? 'Good for speech. Deeper, lower sounds still echo around.'
                : 'A thick panel absorbs low sounds too -- the room is genuinely calm.';
        return { meter: { fraction: 1 - echo, caption: 'How Much Sound Is Absorbed', low: 'All echo', high: 'All absorbed' }, note: msg };
    };

    return (
        <LabCanvas
            title="Sound-Soaking Materials"
            readout={({ v }) => `Panel thickness: ${Math.round(1 + v * 19)} centimetres`}
            controlLabel="Panel Thickness"
            controlKey="panelThickness"
            controlInitial={15}
            controlDisplay={(_raw, v) => `${Math.round(1 + v * 19)} cm`}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="C45 Complete!"
            completeSubtitle="How Do We Manage Noise and Protect Hearing?"
            completeNote="Soft absorbs, heavy blocks!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
