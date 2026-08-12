import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Line-following robot. Low gain drifts, high gain oscillates, mid gain tracks smoothly. */
export const P38FeedbackLoopLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const lineY = H * 0.5;

        // The target line the robot should follow.
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 4;
        ctx.setLineDash([12, 8]);
        ctx.beginPath();
        ctx.moveTo(30, lineY);
        ctx.lineTo(safeRight - 30, lineY);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, 'target line', safeRight - 90, lineY - 14, 'bold 11px monospace');

        // Gain maps to three behaviours: drift, stable, oscillation.
        const gain = v;
        const drift = Math.max(0, 0.35 - gain) * 170;          // steady offset when gain is low
        const wobbleAmp = Math.max(0, gain - 0.62) * 190;      // growing swing when gain is high
        const wobbleFreq = 3 + gain * 5;

        // Robot path across the screen.
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
            const x = 30 + (i / 60) * (safeRight - 60);
            const phaseShift = t * 2 - (i / 60) * 4;
            const y = lineY + drift + Math.sin(phaseShift * wobbleFreq * 0.4) * wobbleAmp;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // The robot itself.
        const rx = 30 + ((t * 60) % (safeRight - 60));
        const ry = lineY + drift + Math.sin((t * 2 - ((rx - 30) / (safeRight - 60)) * 4) * wobbleFreq * 0.4) * wobbleAmp;
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(rx - 14, ry - 10, 28, 20);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(rx - 14, ry - 10, 28, 20);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(rx - 16, ry - 14, 6, 8);
        ctx.fillRect(rx + 10, ry - 14, 6, 8);

        // Error line from robot to target.
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx, lineY);
        ctx.stroke();

        const error = Math.abs(ry - lineY);
        const tracking = Math.max(0, 1 - error / 90);

        outlineText(ctx, `Distance off the line: ${Math.round(error)} px`, safeRight / 2, 86, 'bold 13px monospace');

        const state_ = gain < 0.3 ? 'DRIFTING' : gain > 0.68 ? 'OSCILLATING' : 'STABLE';
        outlineText(ctx, state_, safeRight / 2, 108, 'bold 14px monospace',
            state_ === 'STABLE' ? '#15803d' : '#b91c1c');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, tracking,
            'Tracking Quality', 'Lost the line', 'Perfect'
        );

        const msg = gain < 0.3
            ? 'Gain too low -- the robot corrects too gently and drifts away from the line.'
            : gain <= 0.62
                ? 'Just right! The robot corrects just enough and stays smoothly on the line.'
                : 'Gain too high -- it overshoots each way and the wobble keeps growing.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="The Feedback Loop"
            readout={({ raw }) => `Correction strength (gain): ${raw}%`}
            controlLabel="Correction Strength"
            controlKey="correctionStrength"
            controlInitial={20}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="P38 Complete!"
            completeSubtitle="How Do Robots Sense and Act?"
            completeNote="Correct just enough -- stronger is not better!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
