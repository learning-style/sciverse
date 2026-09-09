import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const G = 9.8;

export const L2P3RampLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, t, stageTop, stageBottom }: LabScene) => {
        const kg = Math.max(1, Math.round(raw)) / 2;
        const height = Math.max(5, Math.round(raw2)) / 10;

        const pe = kg * G * height;
        // Named `speed`, not `v` -- `v` is a LabScene field and shadowing it
        // has produced real bugs before.
        const speed = Math.sqrt(2 * G * height);

        const floorY = stageBottom - 74;
        const rampTop = Math.max(stageTop + 40, floorY - height * 46);
        const x0 = 54;
        const x1 = Math.min(safeRight * 0.52, x0 + 250);

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x0, rampTop);
        ctx.lineTo(x1, floorY);
        ctx.lineTo(x0, floorY);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = '#e2e8f0';
        ctx.fill();

        // The ball, rolling down and resetting, so the two bars have something
        // to be about.
        const along = (t * 0.42) % 1;
        const bx = x0 + (x1 - x0) * along;
        const by = rampTop + (floorY - rampTop) * along;
        const radius = 8 + Math.min(9, kg * 1.4);
        ctx.fillStyle = '#4f46e5';
        ctx.beginPath();
        ctx.arc(bx, by - radius, radius, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, `${height.toFixed(1)} m`, x0 - 22, (rampTop + floorY) / 2,
            'bold 12px monospace', '#0f172a', 'center', 60);

        // Two bars: stored, and moving. They trade places as the ball descends.
        const barX = safeRight * 0.62;
        const barW = Math.min(58, (safeRight - barX) / 2 - 14);
        const barBase = floorY;
        const barMax = barBase - (stageTop + 54);
        const peNow = pe * (1 - along);
        const keNow = pe * along;
        const scale = barMax / Math.max(pe, 0.001);

        ctx.fillStyle = '#2563eb';
        ctx.fillRect(barX, barBase - peNow * scale, barW, peNow * scale);
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(barX + barW + 18, barBase - keNow * scale, barW, keNow * scale);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(barX, barBase - barMax, barW, barMax);
        ctx.strokeRect(barX + barW + 18, barBase - barMax, barW, barMax);
        outlineText(ctx, 'PE', barX + barW / 2, barBase + 18, 'bold 12px monospace', '#1d4ed8', 'center', barW + 20);
        outlineText(ctx, 'KE', barX + barW + 18 + barW / 2, barBase + 18, 'bold 12px monospace', '#c2410c', 'center', barW + 20);
        outlineText(ctx, 'the total never changes', barX + barW + 9, barBase + 36,
            'bold 11px monospace', '#334155', 'center', barW * 2 + 40);

        outlineText(ctx, `PE = ${kg.toFixed(1)} x 9.8 x ${height.toFixed(1)} = ${pe.toFixed(2)} J`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `v = √(2 x 9.8 x ${height.toFixed(1)}) = ${speed.toFixed(2)} m/s`,
            safeRight / 2, stageBottom - 14, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `${pe.toFixed(2)} J stored, arriving at ${speed.toFixed(2)} m/s`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Change the mass and both energies climb, but the speed does not',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, speed / 10)),
                caption: 'Speed at the Bottom',
                low: 'Almost still',
                high: 'Very fast',
            },
            note: `A ${kg.toFixed(1)} kg ball dropped ${height.toFixed(1)} m stores ${pe.toFixed(2)} J and arrives at ${speed.toFixed(2)} m/s. The mass cancels in v = √(2gh), so a heavier ball arrives at exactly the same speed.`,
        };
    };

    return (
        <LabCanvas
            title="Balancing the Energy Books"
            readout={({ raw }) => `A ${(Math.max(1, Math.round(raw)) / 2).toFixed(1)} kg ball on the ramp`}
            controlLabel="Mass"
            controlKey="ballMass"
            controlMin={1}
            controlMax={20}
            controlInitial={4}
            controlDisplay={raw => `${(Math.max(1, Math.round(raw)) / 2).toFixed(1)} kg`}
            control2={{
                label: 'Drop Height',
                key: 'dropHeight',
                min: 5,
                max: 50,
                initial: 18,
                display: raw => `${(Math.max(5, Math.round(raw)) / 10).toFixed(1)} m`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Balancing the Energy Books"
            completeNote="v = √(2gh), and the mass cancels!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
