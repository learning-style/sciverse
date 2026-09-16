import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const GLUCOSE_PER_M2 = 14;
const CO2_PER_GLUCOSE = 264 / 180;
const MAX_LITRES = 250;
const WATER = '#0284c7';
const SUGAR = '#15803d';

const areaOf = (dial: number): number => Math.max(0.5, Math.min(20, Math.round(dial * 2) / 2));
const costOf = (dial: number): number => Math.max(100, Math.min(600, Math.round(dial / 25) * 25));

export const L2B13LeafLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const area = areaOf(raw);
        const cost = costOf(raw2);
        const glucose = GLUCOSE_PER_M2 * area;
        const co2 = glucose * CO2_PER_GLUCOSE;
        const waterGrams = co2 * cost;
        const litres = waterGrams / 1000;

        // A leaf with its stomata, CO2 drifting in and water vapour streaming out
        const cx = safeRight * 0.26;
        const cy = stageTop + (stageBottom - 76 - stageTop) * 0.45;
        const lw = Math.min(safeRight * 0.2, 96);
        const lh = lw * 0.62;
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.moveTo(cx - lw, cy);
        ctx.quadraticCurveTo(cx, cy - lh, cx + lw, cy);
        ctx.quadraticCurveTo(cx, cy + lh, cx - lw, cy);
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - lw, cy);
        ctx.lineTo(cx + lw, cy);
        ctx.stroke();
        for (let i = 0; i < 5; i++) {
            const sx = cx - lw * 0.6 + i * lw * 0.3;
            ctx.fillStyle = '#166534';
            ctx.beginPath();
            ctx.ellipse(sx, cy + lh * 0.42, 4, 2.2, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'stomata', cx, cy + lh + 22, 'bold 11px monospace', '#166534', 'center', lw * 2);
        for (let i = 0; i < 4; i++) {
            const drift = (t * 26 + i * 22) % 88;
            ctx.fillStyle = 'rgba(100,116,139,0.85)';
            ctx.beginPath();
            ctx.arc(cx - lw - 34 + drift, cy + lh * 0.7 + Math.sin(i + t) * 5, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'CO₂ in', cx - lw - 18, cy + lh * 0.7 - 12, '11px monospace', '#475569', 'center', 80);
        for (let i = 0; i < 9; i++) {
            const rise = (t * 34 + i * 12) % 96;
            ctx.fillStyle = `rgba(2,132,199,${0.75 - rise / 150})`;
            ctx.beginPath();
            ctx.arc(cx + lw * 0.2 + Math.sin(i * 2 + t) * 14, cy + lh * 0.55 - rise, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'water out', cx + lw * 0.25, cy - lh - 6, '11px monospace', WATER, 'center', 100);

        // The two masses side by side, on one scale
        const bx = safeRight * 0.52;
        const bw = safeRight - 20 - bx;
        const scale = Math.max(waterGrams, 1);
        const bar = (label: string, grams: number, y: number, colour: string) => {
            outlineText(ctx, label, bx, y, 'bold 12px monospace', colour, 'left', bw);
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(bx, y + 6, bw, 14);
            ctx.fillStyle = colour;
            ctx.fillRect(bx, y + 6, bw * Math.min(1, grams / scale), 14);
        };
        bar(`sugar made ${glucose.toFixed(0)} g`, glucose, stageTop + 18, SUGAR);
        bar(`CO₂ taken in ${co2.toFixed(0)} g`, co2, stageTop + 58, '#475569');
        bar(`water lost ${waterGrams.toFixed(0)} g`, waterGrams, stageTop + 98, WATER);

        outlineText(ctx, `CO₂ = ${glucose.toFixed(0)} x 1.47 = ${co2.toFixed(0)} g, water = ${co2.toFixed(0)} x ${cost} = ${waterGrams.toFixed(0)} g`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${litres.toFixed(1)} litres of water for ${glucose.toFixed(0)} g of sugar`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', WATER, 'center', safeRight - 30);

        fitText(ctx, `${litres.toFixed(1)} litres of water in a day`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'It cannot eat without drinking', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, litres / MAX_LITRES)),
                caption: 'Water Lost in a Day',
                low: '0 litres',
                high: '250 litres',
                stops: ['#e0f2fe', '#38bdf8', '#075985'] as [string, string, string],
            },
            note: `${area} m² of leaf makes ${glucose.toFixed(0)} g of sugar, takes in ${co2.toFixed(0)} g of CO₂, and loses ${litres.toFixed(1)} litres of water at ${cost} g for each gram of CO₂.`,
        };
    };

    return (
        <LabCanvas
            title="The Leaf's Bargain"
            readout={({ raw }) => `${areaOf(raw)} m² of leaf`}
            controlLabel="Leaf Area"
            controlKey="leafArea"
            controlMin={0.5}
            controlMax={20}
            controlInitial={1}
            controlDisplay={raw => `${areaOf(raw)} m²`}
            control2={{
                label: 'Water Cost',
                key: 'waterCost',
                min: 100,
                max: 600,
                initial: 300,
                display: raw => `${costOf(raw)} g per g`,
            }}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Leaf's Bargain"
            completeNote="One hole, two jobs!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
