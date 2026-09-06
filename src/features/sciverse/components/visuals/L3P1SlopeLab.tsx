import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const G = 9.8;

export const L3P1SlopeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const deg = Math.round(raw);
        const mu = Math.max(0, Math.round(raw2)) / 100;
        const th = (deg * Math.PI) / 180;

        const drive = G * Math.sin(th);
        const resist = mu * G * Math.cos(th);
        const accel = drive - resist;
        const repose = (Math.atan(mu) * 180) / Math.PI;

        // The ramp: a right-angled triangle with the tilt at the left corner.
        const baseY = stageBottom - 96;
        const x0 = 56;
        const runLen = Math.min(safeRight - 150, 330);
        const rise = runLen * Math.tan(th);
        const apexY = baseY - Math.min(rise, baseY - stageTop - 70);
        const runUsed = (baseY - apexY) / Math.max(0.0001, Math.tan(th));
        const x1 = x0 + Math.min(runLen, runUsed);

        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(x0, baseY);
        ctx.lineTo(x1, baseY);
        ctx.lineTo(x1, apexY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.stroke();

        // The box, sitting on the slope face
        const along = 0.55;
        const bx = x0 + (x1 - x0) * along;
        const by = baseY - (baseY - apexY) * along;
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(-th);
        ctx.fillStyle = '#c7d2fe';
        ctx.fillRect(-19, -30, 38, 30);
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 2;
        ctx.strokeRect(-19, -30, 38, 30);
        ctx.restore();

        // Weight, and the two components it resolves into
        const arrow = (fx: number, fy: number, tx: number, ty: number, colour: string) => {
            ctx.strokeStyle = colour;
            ctx.fillStyle = colour;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(fx, fy);
            ctx.lineTo(tx, ty);
            ctx.stroke();
            const a = Math.atan2(ty - fy, tx - fx);
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(tx - 9 * Math.cos(a - 0.4), ty - 9 * Math.sin(a - 0.4));
            ctx.lineTo(tx - 9 * Math.cos(a + 0.4), ty - 9 * Math.sin(a + 0.4));
            ctx.closePath();
            ctx.fill();
        };
        const cx = bx;
        const cy = by - 15;
        const S = 54;
        arrow(cx, cy, cx, cy + S, '#0f172a');
        arrow(cx, cy, cx + S * Math.sin(th) * Math.cos(th), cy + S * Math.sin(th) * Math.sin(th), '#b91c1c');
        arrow(cx, cy, cx - S * Math.cos(th) * Math.sin(th), cy + S * Math.cos(th) * Math.cos(th), '#1d4ed8');

        outlineText(ctx, 'mg', cx + 16, cy + S + 4, 'bold 12px monospace', '#0f172a', 'center', 60);
        outlineText(ctx, 'mg sin θ', safeRight * 0.5, baseY + 22, 'bold 12px monospace', '#b91c1c', 'center', safeRight * 0.4);
        outlineText(ctx, 'mg cos θ', safeRight * 0.5, baseY + 40, 'bold 12px monospace', '#1d4ed8', 'center', safeRight * 0.4);
        outlineText(ctx, `θ = ${deg}°`, x0 + 46, baseY - 8, 'bold 13px monospace', '#0f172a', 'center', 90);

        const moving = accel > 0.001;
        outlineText(ctx,
            `a = 9.8 x (sin ${deg}° − ${mu.toFixed(2)} x cos ${deg}°) = ${Math.max(0, accel).toFixed(2)} m/s²`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, moving ? 'it slides' : 'it does not move',
            safeRight / 2, stageBottom - 14, 'bold 13px monospace', moving ? '#b91c1c' : '#166534', 'center', safeRight - 30);

        fitText(ctx, `Angle of repose for μ = ${mu.toFixed(2)}: ${repose.toFixed(1)}°`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The mass cancels, so a marble and a lorry accelerate the same',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = !moving
            ? `Below the angle of repose. Tilt past ${repose.toFixed(1)}° and it will let go.`
            : deg > repose + 12
                ? 'Well past the angle of repose. Steeper adds drive and removes grip at once.'
                : 'Just past the angle of repose, where a = 0 and μ = tan θ.';
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, accel / G)),
                caption: 'Acceleration Down the Slope',
                low: 'None',
                high: 'Full g',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Forces on a Slope"
            readout={({ raw }) => `Ramp tilted at ${Math.round(raw)}° to the horizontal`}
            controlLabel="Slope Angle"
            controlKey="slopeAngle"
            controlMin={0}
            controlMax={45}
            controlInitial={30}
            controlDisplay={raw => `${Math.round(raw)}°`}
            control2={{
                label: 'Friction Coefficient',
                key: 'frictionMu',
                min: 0,
                max: 100,
                initial: 20,
                display: raw => `μ = ${(Math.round(raw) / 100).toFixed(2)}`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Forces on a Slope"
            completeNote="a = g(sin θ − μ cos θ), and the mass cancels!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
