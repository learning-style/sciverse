import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const objectOf = (dial: number): number => Math.max(5, Math.round(dial)) / 100;
const liquidOf = (dial: number): number => Math.max(140, Math.round(dial)) / 200;

/** The liquids named in the lesson, for a label when the dial lands on one. */
const LIQUIDS: [string, number][] = [['oil', 0.92], ['water', 1.0], ['seawater', 1.025], ['Dead Sea', 1.24]];

export const L2P6FloatLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const objectDensity = objectOf(raw);
        const liquidDensity = liquidOf(raw2);
        const ratio = objectDensity / liquidDensity;
        const floats = ratio < 1;
        const fraction = Math.min(1, ratio);
        const underPct = Math.round(fraction * 100);
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 140));

        // The tank, with the block floating or resting on the bottom
        const tankX = 40;
        const tankW = safeRight * 0.6 - tankX;
        const surfaceY = stageTop + 64 * sy;
        const bottomY = stageTop + 136 * sy;
        const size = 56 * sy;
        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(tankX, surfaceY, tankW, bottomY - surfaceY);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tankX, stageTop + 4);
        ctx.lineTo(tankX, bottomY);
        ctx.lineTo(tankX + tankW, bottomY);
        ctx.lineTo(tankX + tankW, stageTop + 4);
        ctx.stroke();

        const bob = floats ? Math.sin(t * 1.6) * 1.5 : 0;
        const blockX = tankX + tankW * 0.3 - size / 2;
        const blockTop = floats ? surfaceY - (1 - fraction) * size + bob : bottomY - size;
        ctx.fillStyle = '#a16207';
        ctx.fillRect(blockX, blockTop, size, size);
        ctx.strokeStyle = '#422006';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(blockX, blockTop, size, size);

        // The water line, drawn over the block
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tankX, surfaceY);
        ctx.lineTo(tankX + tankW, surfaceY);
        ctx.stroke();

        const labelX = blockX + size + 12;
        const labelW = tankX + tankW - labelX - 6;
        if (floats) {
            outlineText(ctx, `${100 - underPct}% above water`, labelX, surfaceY - 8, 'bold 12px monospace', '#0f172a', 'left', labelW);
            outlineText(ctx, `${underPct}% under water`, labelX, surfaceY + 18, 'bold 12px monospace', '#1e3a8a', 'left', labelW);
        } else {
            outlineText(ctx, 'sinks to the bottom', labelX, bottomY - size / 2, 'bold 12px monospace', '#991b1b', 'left', labelW);
        }

        // The two forces, drawn to the same scale
        const panelX = safeRight * 0.66;
        const panelW = safeRight - 24 - panelX;
        const midY = stageTop + 72 * sy;
        const scale = (48 * sy) / 1.5;
        const weightLen = objectDensity * scale;
        const buoyantLen = Math.min(objectDensity, liquidDensity) * scale;
        const arrow = (x: number, fromY: number, toY: number, colour: string) => {
            const dir = toY > fromY ? 1 : -1;
            ctx.strokeStyle = colour;
            ctx.fillStyle = colour;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x, fromY);
            ctx.lineTo(x, toY - dir * 8);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, toY);
            ctx.lineTo(x - 7, toY - dir * 10);
            ctx.lineTo(x + 7, toY - dir * 10);
            ctx.closePath();
            ctx.fill();
        };
        const upX = panelX + panelW * 0.28;
        const downX = panelX + panelW * 0.72;
        arrow(upX, midY, midY - Math.max(12, buoyantLen), '#4f46e5');
        arrow(downX, midY, midY + Math.max(12, weightLen), '#334155');
        outlineText(ctx, 'buoyant force', upX, midY + 16, 'bold 11px monospace', '#3730a3', 'center', panelW * 0.5);
        outlineText(ctx, 'weight', downX, midY - 10, 'bold 11px monospace', '#334155', 'center', panelW * 0.44);

        const near = LIQUIDS.find(([, d]) => Math.abs(d - liquidDensity) < 0.006);
        outlineText(ctx, near ? `liquid: ${near[0]}` : 'liquid', tankX + tankW / 2, bottomY + 16, 'bold 11px monospace', '#1e3a8a', 'center', tankW);

        outlineText(ctx, floats
            ? `fraction under water = ${objectDensity.toFixed(2)} / ${liquidDensity.toFixed(3)} = ${fraction.toFixed(2)}`
            : `${objectDensity.toFixed(2)} / ${liquidDensity.toFixed(3)} = ${ratio.toFixed(2)} -- more than 1, so it sinks`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, floats ? 'buoyant force (up) = weight (down)' : 'buoyant force (up) is less than weight (down)',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, floats ? `${underPct}% under water` : 'It sinks', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Object density over liquid density', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction,
                caption: 'Fraction Under Water',
                low: '0',
                high: '1',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: floats
                ? `A ${objectDensity.toFixed(2)} g/cm³ block in ${liquidDensity.toFixed(3)} g/cm³ liquid floats with ${underPct}% under water.`
                : `A ${objectDensity.toFixed(2)} g/cm³ block is denser than ${liquidDensity.toFixed(3)} g/cm³ liquid, so it sinks.`,
        };
    };

    return (
        <LabCanvas
            title="How Much of an Iceberg Is Hidden?"
            readout={({ raw }) => `Object density ${objectOf(raw).toFixed(2)} g/cm³`}
            controlLabel="Object Density"
            controlKey="objectDensity"
            controlMin={5}
            controlMax={150}
            controlInitial={60}
            controlDisplay={raw => `${objectOf(raw).toFixed(2)} g/cm³`}
            control2={{
                label: 'Liquid Density',
                key: 'liquidDensity',
                min: 140,
                max: 260,
                initial: 200,
                display: raw => `${liquidOf(raw).toFixed(3)} g/cm³`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Much of an Iceberg Is Hidden?"
            completeNote="Object density over liquid density!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
