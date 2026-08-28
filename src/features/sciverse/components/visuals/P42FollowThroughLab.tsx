import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Ball speed from impulse: the same force applied for longer sends the ball faster. */
export const P42FollowThroughLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const ms = 1 + v * 14;
        const speed = ms / 15;              // same force, so speed tracks contact time
        const groundY = stageBottom - 40;

        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, safeRight, stageBottom - groundY);

        // Bat swinging through the ball; the swing arc grows with contact time.
        const batX = 96;
        const swing = Math.sin(t * 2) * (10 + v * 26);
        const batY = groundY - 62 + swing * 0.3;
        ctx.save();
        ctx.translate(batX, batY);
        ctx.rotate(-0.5 + swing * 0.012);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(-8, -6, 64, 15);            // barrel
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-38, -3, 32, 9);            // handle
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 2;
        ctx.strokeRect(-8, -6, 64, 15);
        ctx.restore();
        outlineText(ctx, 'bat', batX, batY - 22, 'bold 14px monospace');

        // Ball travelling away, faster with a longer contact time.
        const travel = ((t * (40 + speed * 260)) % (safeRight - 210));
        const ballX = batX + 62 + travel;
        const ballY = groundY - 22 - Math.abs(Math.sin(travel / 90)) * (18 + speed * 44);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Contact-time bar so the millisecond value is visible as a length.
        const barX = 60, barW = safeRight - 120;
        const barY = stageTop + 26;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(barX, barY, barW, 20);
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(barX, barY, barW * v, 20);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barW, 20);
        outlineText(ctx, `contact time: ${ms.toFixed(1)} milliseconds`, safeRight / 2, barY + 42, 'bold 14px monospace');

        fitText(ctx, `Ball leaves at ${Math.round(speed * 100)} out of 100 speed`, safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, 'Same force every time -- only the contact time is different', safeRight / 2, 118, safeRight - 24, 13);

        const msg = ms < 4
            ? 'Stabbed at the ball -- the push is cut short and the ball is slow.'
            : ms < 10
                ? 'A better swing. The bat stays on the ball for longer.'
                : 'Full follow through -- the longest push and the fastest ball.';
        return { meter: { fraction: speed, caption: 'Ball Speed', low: 'Slow', high: 'Fast' }, note: msg };
    };

    return (
        <LabCanvas
            title="Follow Through"
            readout={({ v }) => `Contact time: ${(1 + v * 14).toFixed(1)} milliseconds`}
            controlLabel="Contact Time"
            controlKey="contactTime"
            controlInitial={20}
            controlDisplay={(_raw, v) => `${(1 + v * 14).toFixed(1)} ms`}
            accent="indigo"
            sky={['#eef2ff', '#ecfdf5']}
            completeTitle="P42 Complete!"
            completeSubtitle="How Does Sports Science Improve Performance?"
            completeNote="Push = force x contact time!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
