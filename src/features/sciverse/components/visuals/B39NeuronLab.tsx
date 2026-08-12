import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A neuron sums its inputs and fires all-or-nothing once it crosses the threshold. */
export const B39NeuronLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';
    const THRESHOLD = 0.6;

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const bodyX = safeRight * 0.42;
        const bodyY = H * 0.44;
        const fires = v >= THRESHOLD;

        // Dendrites collecting incoming signals.
        const inputs = 5;
        for (let i = 0; i < inputs; i++) {
            const a = -0.9 + (i / (inputs - 1)) * 1.8;
            const sx = bodyX - 130;
            const sy = bodyY + a * 70;
            const active = (i + 1) / inputs <= v + 0.2;

            ctx.strokeStyle = active ? '#22c55e' : '#cbd5e1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(bodyX - 34, bodyY + a * 22);
            ctx.stroke();

            ctx.fillStyle = active ? '#16a34a' : '#94a3b8';
            ctx.beginPath();
            ctx.arc(sx, sy, 9, 0, Math.PI * 2);
            ctx.fill();

            // Signal dots travelling inward.
            if (active) {
                const p = ((t * 0.9 + i * 0.2) % 1);
                ctx.fillStyle = '#15803d';
                ctx.beginPath();
                ctx.arc(sx + p * (bodyX - 34 - sx), sy + p * ((bodyY + a * 22) - sy), 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        outlineText(ctx, 'dendrites', bodyX - 130, bodyY + 100, 'bold 11px monospace');

        // Cell body, glowing when it fires.
        ctx.fillStyle = fires ? '#fbbf24' : '#e2e8f0';
        ctx.beginPath();
        ctx.arc(bodyX, bodyY, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.stroke();
        outlineText(ctx, 'cell body', bodyX, bodyY + 56, 'bold 11px monospace');

        // Axon carrying the output away.
        ctx.strokeStyle = fires ? '#f59e0b' : '#cbd5e1';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(bodyX + 34, bodyY);
        ctx.lineTo(safeRight - 50, bodyY);
        ctx.stroke();
        outlineText(ctx, 'axon', (bodyX + safeRight - 50) / 2, bodyY - 18, 'bold 11px monospace');

        if (fires) {
            const p = (t * 1.6) % 1;
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(bodyX + 34 + p * (safeRight - 84 - bodyX), bodyY, 7, 0, Math.PI * 2);
            ctx.fill();
        }

        // Threshold gauge.
        const gaugeX = safeRight * 0.15;
        const gaugeW = safeRight * 0.7;
        const gaugeY = H - 130;
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(gaugeX, gaugeY, gaugeW, 16);
        ctx.fillStyle = fires ? '#22c55e' : '#0ea5e9';
        ctx.fillRect(gaugeX, gaugeY, gaugeW * v, 16);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(gaugeX, gaugeY, gaugeW, 16);
        // Threshold marker.
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(gaugeX + gaugeW * THRESHOLD, gaugeY - 8);
        ctx.lineTo(gaugeX + gaugeW * THRESHOLD, gaugeY + 24);
        ctx.stroke();
        outlineText(ctx, 'THRESHOLD', gaugeX + gaugeW * THRESHOLD, gaugeY - 14, 'bold 10px monospace', '#b91c1c');

        outlineText(ctx, fires ? 'FIRING! Full strength signal sent.' : 'Silent -- total has not reached the threshold.',
            safeRight / 2, 88, 'bold 14px monospace', fires ? '#15803d' : '#64748b');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, fires ? 1 : 0,
            'Neuron Output (all or nothing)', 'Silent', 'Full signal'
        );

        const msg = v < THRESHOLD - 0.15
            ? 'Not enough incoming votes. The neuron stays completely quiet.'
            : v < THRESHOLD
                ? 'So close! Just below the threshold -- still nothing happens.'
                : 'Threshold crossed! The neuron fires at full strength -- never halfway.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Brain Circuits"
            readout={({ raw }) => `Total incoming signal: ${raw}%`}
            controlLabel="Signal Strength"
            controlKey="signalStrength"
            controlInitial={30}
            accent="rose"
            sky={['#fae8ff', '#f8fafc']}
            completeTitle="B39 Complete!"
            completeSubtitle="How Do Computers Use Logic to Solve Problems?"
            completeNote="Neurons fire all-or-nothing -- binary, but they learn!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
