import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A photoresistor: light frees electrons, resistance falls, signal rises -- until it saturates. */
export const C38PhotoresistorLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const cx = safeRight / 2;
        const stageH = stageBottom - stageTop;

        // Stack the elements downward from the lamp and upward from the caption,
        // so nothing collides on a short canvas while a tall one still fills out.
        const lampR = Math.max(14, Math.min(34, stageH * 0.08));
        const lampY = stageTop + lampR + 12;
        const lampLabelY = lampY + lampR + 18;
        // On a short canvas the LAMP caption is dropped to buy back room.
        const showLampLabel = stageH > 200;
        const bottomLabelY = stageBottom - 14;
        const availTop = showLampLabel ? lampLabelY + 26 : lampY + lampR + 10;
        const availBottom = bottomLabelY - 26;
        const avail = Math.max(40, availBottom - availTop);
        const chipW = Math.min(safeRight * 0.62, 360);
        // Chip takes a share of the free space and sits centred in it, so the
        // beam stays a sensible length instead of stretching on tall canvases.
        const chipH = Math.max(30, Math.min(240, avail * 0.6));
        const chipY = availTop + (avail - chipH) / 2;

        // Beam widening from the lamp down onto the chip.
        ctx.fillStyle = `rgba(250,204,21,${0.18 + v * 0.62})`;
        ctx.beginPath();
        ctx.moveTo(cx - lampR * 0.7, lampY + lampR * 0.5);
        ctx.lineTo(cx - chipW / 2, chipY);
        ctx.lineTo(cx + chipW / 2, chipY);
        ctx.lineTo(cx + lampR * 0.7, lampY + lampR * 0.5);
        ctx.closePath();
        ctx.fill();

        // Lamp.
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(cx, lampY, lampR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 3;
        ctx.stroke();
        if (showLampLabel) outlineText(ctx, 'LAMP', cx, lampLabelY, 'bold 14px monospace');

        // The sensor chip.
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - chipW / 2, chipY, chipW, chipH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(cx - chipW / 2, chipY, chipW, chipH);
        outlineText(ctx, 'LIGHT SENSOR', cx, chipY - 12, 'bold 16px monospace');

        // Freed electrons drifting inside the material.
        const freed = Math.round(v * 18);
        for (let i = 0; i < freed; i++) {
            const seed = i * 43.7;
            const x = cx - chipW / 2 + 16 + ((seed * 7.9 + t * 30) % (chipW - 32));
            const y = chipY + 16 + ((seed * 3.1) % Math.max(10, chipH - 32));
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        outlineText(ctx, `${freed} free electrons carrying current`,
            cx, bottomLabelY, 'bold 15px monospace');

        const resistance = Math.max(0.04, 1 - v);
        const saturated = v > 0.88;
        const signal = saturated ? 1 : v / 0.88;

        outlineText(ctx,
            `Resistance: ${resistance > 0.6 ? 'HIGH' : resistance > 0.25 ? 'MEDIUM' : 'LOW'}   |   Signal out: ${Math.round(signal * 100)}%`,
            cx, 92, 'bold 14px monospace');

        if (saturated) {
            outlineText(ctx, 'SATURATED -- everything looks equally bright!',
                cx, stageBottom - 12, 'bold 14px monospace', '#b91c1c');
        }

        const msg = v < 0.15
            ? 'Dark. Electrons stay locked in place, so the material blocks current.'
            : v < 0.6
                ? 'Light frees electrons -- resistance drops and the signal climbs.'
                : saturated
                    ? 'Too bright! The sensor is maxed out and can no longer tell shades apart.'
                    : 'Bright light, strong signal -- still inside the sensor\'s useful range.';
        return { meter: { fraction: signal, caption: 'Electrical Signal to the Computer', low: 'Dark', high: 'Maxed out' }, note: msg };
    };

    return (
        <LabCanvas
            title="Materials That Sense"
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
