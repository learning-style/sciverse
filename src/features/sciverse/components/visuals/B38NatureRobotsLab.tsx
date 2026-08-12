import { LabCanvas, outlineText, meterBar, chip } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Reflex arc vs brain loop: a shorter signal path means a much faster response. */
export const B38NatureRobotsLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const handX = 60;
        const cordX = safeRight * 0.5;
        const brainX = safeRight - 90;
        const pathY = H * 0.44;

        // Reaction time: 0.05 s (reflex) up to 0.30 s (via brain).
        const reactionS = 0.05 + v * 0.25;
        const viaBrain = v > 0.5;

        // The signal path.
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(handX, pathY);
        ctx.lineTo(viaBrain ? brainX : cordX, pathY);
        ctx.stroke();

        // Stations along the path.
        const station = (x: number, label: string, color: string, emoji: string) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, pathY, 24, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.font = '18px serif';
            ctx.textAlign = 'center';
            ctx.fillText(emoji, x, pathY + 6);
            chip(ctx, label, x, pathY + 48, color);
        };

        station(handX, 'HAND', '#f97316', '✋');
        station(cordX, 'SPINE', '#0ea5e9', '⚡');
        if (viaBrain) station(brainX, 'BRAIN', '#7c3aed', '🧠');

        // Signal pulse travelling out and back along the active path.
        const endX = viaBrain ? brainX : cordX;
        const cycle = (t * (1 / reactionS) * 0.35) % 2;
        const p = cycle < 1 ? cycle : 2 - cycle;   // out then back
        const sx = handX + p * (endX - handX);
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(sx, pathY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        outlineText(ctx, viaBrain ? 'Signal travels all the way to the brain' : 'Reflex arc -- signal turns around at the spine',
            safeRight / 2, 84, 'bold 12px monospace');
        outlineText(ctx, `Reaction time: ${reactionS.toFixed(2)} seconds`, safeRight / 2, 106, 'bold 13px monospace');

        // Burn damage grows with how long your hand stays on the hot surface.
        const damage = Math.min(1, (reactionS - 0.05) / 0.25);
        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, 1 - damage,
            'How Well You Avoid the Burn', 'Bad burn', 'Barely a mark'
        );

        const msg = v < 0.3
            ? 'Fast reflex! The spine handles it and your hand is away in a flash.'
            : v < 0.55
                ? 'Getting slower -- more of the signal path is being used.'
                : 'Slow loop through the brain. Your hand stays on the heat much longer.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Nature's Robots"
            readout={({ v }) => `Signal path length: ${v < 0.5 ? 'short (reflex)' : 'long (via brain)'}`}
            controlLabel="Reaction Time"
            controlKey="reactionTime"
            controlInitial={25}
            accent="rose"
            sky={['#ffe4e6', '#f8fafc']}
            completeTitle="B38 Complete!"
            completeSubtitle="How Do Robots Sense and Act?"
            completeNote="Short loops are fast, long loops are smart -- use both!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
