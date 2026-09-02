import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const L2P1ForceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageBottom }: LabScene) => {
        const force = Math.round(raw);
        const mass = Math.max(1, Math.round(raw2));
        const accel = force / mass;

        const groundY = stageBottom - 74;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(safeRight, groundY);
        ctx.stroke();

        // The crate: wider and taller as the mass grows
        const side = 40 + (mass / 50) * 70;
        const cx = safeRight * 0.58;
        ctx.fillStyle = '#c8a27a';
        ctx.fillRect(cx - side / 2, groundY - side, side, side);
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(cx - side / 2, groundY - side, side, side);
        outlineText(ctx, `${mass} kg`, cx, groundY - side / 2 + 5, 'bold 14px monospace', '#ffffff', 'center', side - 6);

        // The net force arrow, drawn to scale against the slider's own maximum
        const arrowLen = 20 + (force / 100) * (cx - side / 2 - 46);
        const ay = groundY - side / 2;
        const tail = cx - side / 2 - arrowLen;
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(tail, ay);
        ctx.lineTo(cx - side / 2 - 10, ay);
        ctx.stroke();
        ctx.fillStyle = '#4f46e5';
        ctx.beginPath();
        ctx.moveTo(cx - side / 2, ay);
        ctx.lineTo(cx - side / 2 - 16, ay - 11);
        ctx.lineTo(cx - side / 2 - 16, ay + 11);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `net force ${force} N`, (tail + cx - side / 2) / 2, ay - 20,
            'bold 13px monospace', '#312e81', 'center', arrowLen + 40);

        outlineText(ctx, `a = F / m = ${force} / ${mass} = ${accel.toFixed(2)} m/s²`,
            safeRight / 2, stageBottom - 40, 'bold 15px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `after 3 seconds it would be moving at ${(accel * 3).toFixed(1)} m/s`,
            safeRight / 2, stageBottom - 18, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, `Acceleration: ${accel.toFixed(2)} metres per second per second`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Force is on top, so it is direct. Mass is underneath, so it is inverse.',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = force === 0
            ? 'Zero net force means zero acceleration, whatever the mass.'
            : mass >= 40
                ? 'Heavy. Mass is underneath the line, so it drags the acceleration down.'
                : accel >= 8
                    ? 'Large net force on a small mass -- it speeds up very quickly.'
                    : 'Double the net force to double this. Double the mass to halve it.';
        return {
            meter: {
                fraction: Math.min(1, accel / 20),
                caption: 'How Quickly It Speeds Up',
                low: 'Barely at all',
                high: 'Very quickly',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Force, Mass and Acceleration"
            readout={({ raw }) => `A net force of ${Math.round(raw)} newtons is acting`}
            controlLabel="Net Force"
            controlKey="netForce"
            controlMin={0}
            controlMax={100}
            controlInitial={40}
            controlDisplay={raw => `${Math.round(raw)} N left over after friction`}
            control2={{
                label: 'Mass',
                key: 'crateMass',
                min: 1,
                max: 50,
                initial: 20,
                display: raw => `${Math.max(1, Math.round(raw))} kg being pushed`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Force, Mass and Acceleration"
            completeNote="Net force on top, mass underneath!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
