import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const N_PER_M2 = 5;
const BAG_G = 20000;

const pctOf = (dial: number): number => Math.max(1, Math.min(46, Math.round(dial)));
const areaOf = (dial: number): number => Math.max(10, Math.min(500, Math.round(dial / 10) * 10));

export const L2C9FertiliserLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const pct = pctOf(raw);
        const area = areaOf(raw2);
        const nitrogen = area * N_PER_M2;
        const fertiliser = (nitrogen * 100) / pct;
        const bagShare = fertiliser / BAG_G;
        const bagArea = (BAG_G * pct) / 100 / N_PER_M2;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // The bag, filled to the share of it the lawn needs
        const bx = 40;
        const bw = Math.max(70, safeRight * 0.16);
        const bTop = stageTop + 14;
        const bBottom = stageTop + 118 * sy;
        const bh = bBottom - bTop;
        ctx.fillStyle = '#f5f5f4';
        ctx.fillRect(bx, bTop, bw, bh);
        ctx.fillStyle = '#86efac';
        const fillH = bh * Math.min(1, bagShare);
        ctx.fillRect(bx, bBottom - fillH, bw, fillH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, bTop, bw, bh);
        outlineText(ctx, `nitrogen ${pct}%`, bx + bw / 2, bTop + 22, 'bold 14px monospace', '#065f46', 'center', bw - 6);
        outlineText(ctx, '20 kg bag', bx + bw / 2, bBottom + 16, '11px monospace', '#475569', 'center', bw + 30);

        // The lawn, drawn with an area in proportion
        const lawnBox = safeRight * 0.28;
        const lawnMax = Math.min(lawnBox, bh);
        const side = lawnMax * Math.sqrt(area / 500);
        const lx = bx + bw + 30 + (lawnBox - side) / 2;
        const ly = bTop + (bh - side) / 2;
        ctx.fillStyle = '#bbf7d0';
        ctx.fillRect(lx, ly, side, side);
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(lx, ly, side, side);
        outlineText(ctx, `lawn ${area} m²`, bx + bw + 30 + lawnBox / 2, bBottom + 16, '11px monospace', '#166534', 'center', lawnBox + 20);

        const px = safeRight * 0.64;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `nitrogen ${area} x 5 = ${nitrogen.toLocaleString()} g`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `fertiliser = ${nitrogen.toLocaleString()} x 100 / ${pct}`, px, stageTop + 46, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `= ${Math.round(fertiliser).toLocaleString()} g`, px, stageTop + 68, 'bold 13px monospace', '#065f46', 'left', pw);
        outlineText(ctx, bagShare > 1 ? `${bagShare.toFixed(1)} bags` : `share of a 20 kg bag ${(bagShare * 100).toFixed(0)}%`,
            px, stageTop + 100 * sy, '12px monospace', '#334155', 'left', pw);

        outlineText(ctx, `mass of fertiliser = ${nitrogen.toLocaleString()} x 100 / ${pct} = ${(fertiliser / 1000).toFixed(1)} kg`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `one 20 kg bag of ${pct}% could feed ${Math.round(bagArea).toLocaleString()} m²`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${(fertiliser / 1000).toFixed(1)} kg of fertiliser for ${area} m²`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Less nutrient in the bag means more bags', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, bagShare)),
                caption: 'Share of a 20 kg Bag',
                low: '0 kg',
                high: '20 kg',
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `${area} m² needs ${nitrogen.toLocaleString()} g of nitrogen, which is ${(fertiliser / 1000).toFixed(1)} kg of a ${pct}% fertiliser.`,
        };
    };

    return (
        <LabCanvas
            title="Reading a Bag of Plant Food"
            readout={({ raw }) => `Nitrogen number ${pctOf(raw)}%`}
            controlLabel="Nitrogen Number"
            controlKey="nitrogenNumber"
            controlMin={1}
            controlMax={46}
            controlInitial={10}
            controlDisplay={raw => `${pctOf(raw)}%`}
            control2={{
                label: 'Lawn Area',
                key: 'lawnArea',
                min: 10,
                max: 500,
                initial: 200,
                display: raw => `${areaOf(raw)} m²`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Reading a Bag of Plant Food"
            completeNote="Nutrient x 100 / percentage!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
