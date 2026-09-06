import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MATERIALS: { name: string; density: number; colour: string }[] = [
    { name: 'oak', density: 0.75, colour: '#b45309' },
    { name: 'ice', density: 0.92, colour: '#bae6fd' },
    { name: 'water', density: 1.00, colour: '#38bdf8' },
    { name: 'aluminium', density: 2.70, colour: '#cbd5e1' },
    { name: 'iron', density: 7.87, colour: '#78716c' },
    { name: 'lead', density: 11.34, colour: '#64748b' },
    { name: 'gold', density: 19.30, colour: '#eab308' },
];

export const L2P2DensityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grams = Math.max(1, Math.round(raw));
        const cm3 = Math.max(1, Math.round(raw2));
        const density = grams / cm3;

        // Closest listed material, but only claimed as a match within 4%.
        let best = MATERIALS[0];
        MATERIALS.forEach(m => {
            if (Math.abs(m.density - density) < Math.abs(best.density - density)) best = m;
        });
        const matched = Math.abs(best.density - density) / best.density < 0.04;

        // The block, drawn with its side proportional to the cube root of volume
        const side = Math.max(30, Math.min(150, Math.cbrt(cm3) * 26));
        const blockX = safeRight * 0.28 - side / 2;
        const blockY = (stageTop + stageBottom) / 2 - side / 2 - 10;
        ctx.fillStyle = matched ? best.colour : '#e2e8f0';
        ctx.fillRect(blockX, blockY, side, side);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(blockX, blockY, side, side);
        outlineText(ctx, `${cm3} cm³`, blockX + side / 2, blockY + side + 20,
            'bold 13px monospace', '#0f172a', 'center', side + 60);
        outlineText(ctx, `${grams} g`, blockX + side / 2, blockY - 10,
            'bold 13px monospace', '#0f172a', 'center', side + 60);

        // The list, with the matched entry marked
        const listX = safeRight * 0.58;
        const rowH = Math.min(26, (stageBottom - stageTop - 90) / MATERIALS.length);
        const listTop = stageTop + 56;
        ctx.textAlign = 'left';
        MATERIALS.forEach((m, i) => {
            const ry = listTop + i * rowH;
            const isMatch = matched && m.name === best.name;
            if (isMatch) {
                ctx.fillStyle = 'rgba(79,70,229,0.15)';
                ctx.fillRect(listX - 8, ry - 12, safeRight - listX - 14, rowH - 2);
            }
            ctx.font = isMatch ? 'bold 13px monospace' : '13px monospace';
            ctx.fillStyle = isMatch ? '#3730a3' : '#475569';
            ctx.fillText(m.name, listX, ry);
            ctx.fillText(m.density.toFixed(2), listX + 116, ry);
        });
        ctx.textAlign = 'center';

        outlineText(ctx, `${grams} g / ${cm3} cm³ = ${density.toFixed(2)} g/cm³`,
            safeRight / 2, stageBottom - 32, 'bold 14px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, matched ? `matches ${best.name}` : 'no match in the table',
            safeRight / 2, stageBottom - 12, 'bold 13px monospace',
            matched ? '#3730a3' : '#b91c1c', 'center', safeRight - 30);

        fitText(ctx, `Density ${density.toFixed(2)} g/cm³`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Different lumps of one material all give the same answer',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, density / 20)),
                caption: 'How Tightly Packed',
                low: 'Barely any mass',
                high: 'As dense as gold',
            },
            note: matched
                ? `A density of ${density.toFixed(2)} g/cm³ identifies this as ${best.name}.`
                : `Nothing in the table sits at ${density.toFixed(2)} g/cm³. It may be a mixture, or a material not shown.`,
        };
    };

    return (
        <LabCanvas
            title="What Is It Made Of?"
            readout={({ raw }) => `The balance reads ${Math.max(1, Math.round(raw))} g`}
            controlLabel="Mass"
            controlKey="blockMass"
            controlMin={1}
            controlMax={1000}
            controlInitial={216}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} g`}
            control2={{
                label: 'Volume',
                key: 'blockVolume',
                min: 1,
                max: 200,
                initial: 80,
                display: raw => `${Math.max(1, Math.round(raw))} cm³`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="What Is It Made Of?"
            completeNote="ρ = m/V, and the size cancels!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
