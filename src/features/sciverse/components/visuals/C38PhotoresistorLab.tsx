import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A photoresistor: light frees electrons, resistance falls, signal rises -- until it saturates. */
export const C38PhotoresistorLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const sensorX = safeRight / 2;
        const sensorY = H * 0.44;

        // Lamp shining down on the sensor.
        ctx.fillStyle = `rgba(250,204,21,${0.25 + v * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(sensorX, 108);
        ctx.lineTo(sensorX - 70, sensorY - 20);
        ctx.lineTo(sensorX + 70, sensorY - 20);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(sensorX, 104, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 2;
        ctx.stroke();

        // The sensor chip.
        ctx.fillStyle = '#334155';
        ctx.fillRect(sensorX - 46, sensorY - 18, 92, 36);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(sensorX - 46, sensorY - 18, 92, 36);
        outlineText(ctx, 'PHOTORESISTOR', sensorX, sensorY + 4, 'bold 10px monospace', '#fbbf24');

        // Freed electrons inside the material.
        const freed = Math.round(v * 14);
        for (let i = 0; i < freed; i++) {
            const seed = i * 43.7;
            const x = sensorX - 40 + ((seed * 7.9 + t * 26) % 80);
            const y = sensorY - 12 + ((seed * 3.1) % 24);
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, `${freed} free electrons`, sensorX, sensorY + 36, 'bold 10px monospace');

        // Resistance falls as light rises; signal is the inverse.
        const resistance = Math.max(0.04, 1 - v);
        // Above 88% light the sensor saturates -- it cannot report any more difference.
        const saturated = v > 0.88;
        const signal = saturated ? 1 : v / 0.88;

        outlineText(ctx, `Resistance: ${resistance > 0.6 ? 'HIGH' : resistance > 0.25 ? 'MEDIUM' : 'LOW'}   |   Signal out: ${Math.round(signal * 100)}%`,
            safeRight / 2, 84, 'bold 12px monospace');

        if (saturated) {
            outlineText(ctx, 'SATURATED -- everything looks equally bright!', safeRight / 2, H - 118, 'bold 13px monospace', '#b91c1c');
        }

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, signal,
            'Electrical Signal to the Computer', 'Dark', 'Maxed out'
        );

        const msg = v < 0.15
            ? 'Dark. Electrons stay locked in place, so the material blocks current.'
            : v < 0.6
                ? 'Light frees electrons -- resistance drops and the signal climbs.'
                : saturated
                    ? 'Too bright! The sensor is maxed out and can no longer tell shades apart.'
                    : 'Bright light, strong signal -- still inside the sensor\'s useful range.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Sensors Made of Chemistry"
            readout={({ raw }) => `Light level: ${raw}%`}
            controlLabel="Light Level"
            controlKey="lightLevel"
            controlInitial={40}
            accent="emerald"
            sky={['#e0e7ff', '#f8fafc']}
            completeTitle="C38 Complete!"
            completeSubtitle="How Do Robots Sense and Act?"
            completeNote="Sensors turn the world into electricity -- within a limited range!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
