import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const CRUSH_PER_TONNE = 30;
const SMELT_PER_KG = 15;

export const L2P49MetalCostLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const depth = Math.round(raw);
        const grade = Math.max(1, Math.round(raw2));

        const liftPerTonne = depth * 0.01;
        const liftPerKg = liftPerTonne / grade;
        const crushPerKg = CRUSH_PER_TONNE / grade;
        const total = liftPerKg + crushPerKg + SMELT_PER_KG;

        // A stacked bar: where every megajoule of the total actually goes
        const barY = stageTop + 70;
        const barH = 54;
        const barX = 50;
        const barW = safeRight - 100;
        const scale = barW / 80;

        const parts: { label: string; value: number; colour: string }[] = [
            { label: 'lifting', value: liftPerKg, colour: '#4f46e5' },
            { label: 'crushing', value: crushPerKg, colour: '#0891b2' },
            { label: 'smelting', value: SMELT_PER_KG, colour: '#c2410c' },
        ];
        let x = barX;
        parts.forEach(part => {
            const w = Math.min(barW - (x - barX), part.value * scale);
            if (w > 0.5) {
                ctx.fillStyle = part.colour;
                ctx.fillRect(x, barY, w, barH);
                ctx.strokeStyle = '#0f172a';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(x, barY, w, barH);
                if (w > 54) {
                    outlineText(ctx, part.label, x + w / 2, barY + barH / 2 - 2,
                        'bold 12px monospace', '#ffffff', 'center', w - 8);
                    outlineText(ctx, `${part.value.toFixed(1)}`, x + w / 2, barY + barH / 2 + 14,
                        'bold 12px monospace', '#ffffff', 'center', w - 8);
                }
            }
            x += w;
        });
        outlineText(ctx, 'megajoules per kilogram of metal', safeRight / 2, barY + barH + 22,
            'bold 12px monospace', '#0f172a', 'center', barW);

        // The sum, written out the way the lesson writes it
        const sumY = barY + barH + 56;
        outlineText(ctx, `(${liftPerTonne.toFixed(1)} + ${CRUSH_PER_TONNE}) / ${grade} + ${SMELT_PER_KG} = ${total.toFixed(1)}`,
            safeRight / 2, sumY, 'bold 15px monospace', '#0f172a', 'center', safeRight - 40);
        outlineText(ctx, 'lifting and crushing are per tonne of rock; smelting is per kilogram of metal',
            safeRight / 2, sumY + 22, 'bold 11px monospace', '#334155', 'center', safeRight - 30);
        outlineText(ctx, `ore grade ${grade} kg per tonne, ore depth ${depth} metres`,
            safeRight / 2, stageBottom - 18, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `${total.toFixed(1)} MJ for every kilogram of metal`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Depth sits inside the smallest term; grade divides the whole rock cost',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = grade >= 14
            ? 'Rich ore. Even a very deep mine stays cheap per kilogram.'
            : grade >= 6
                ? 'Drag the depth from end to end -- the total barely stirs. Now drop the grade.'
                : 'Poor ore. The rock cost is divided by a small number, so it dominates everything.';
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 1 - (total - 15) / 45)),
                caption: 'Energy Cost Per Kilogram',
                low: 'Very high',
                high: 'Very low',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Energy Cost of Metal"
            readout={({ raw }) => `The ore lies ${Math.round(raw)} metres down`}
            controlLabel="Ore Depth"
            controlKey="oreDepthL2"
            controlMin={0}
            controlMax={1000}
            controlInitial={400}
            controlDisplay={raw => `${Math.round(raw)} metres down`}
            control2={{
                label: 'Ore Grade',
                key: 'oreGrade',
                min: 1,
                max: 20,
                initial: 10,
                display: raw => `${Math.max(1, Math.round(raw))} kg per tonne`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Energy Cost of Metal"
            completeNote="Grade divides everything -- depth only adds!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
