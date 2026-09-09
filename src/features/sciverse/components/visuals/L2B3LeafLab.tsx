import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUN_WATTS = 1000;
const EFFICIENCY = 0.01;
const GLUCOSE_KJ_PER_G = 15.6;

export const L2B3LeafLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const area = Math.max(1, Math.round(raw));
        const hours = Math.max(1, Math.round(raw2));

        const arriving = SUN_WATTS * area * hours * 3600;
        const kept = arriving * EFFICIENCY;
        const glucose = kept / 1000 / GLUCOSE_KJ_PER_G;

        // Two bars, one dwarfing the other -- that gap is the whole lesson.
        const barX = 62;
        const barW = safeRight - barX - 40;
        const topY = stageTop + 66;
        const barH = 34;
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(barX, topY, barW, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, topY, barW, barH);
        outlineText(ctx, `${(arriving / 1e6).toFixed(1)} MJ arriving`, barX + barW / 2, topY + 22,
            'bold 13px monospace', '#0f172a', 'center', barW - 10);

        const keptY = topY + barH + 26;
        const keptW = Math.max(3, barW * EFFICIENCY);
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(barX, keptY, keptW, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.strokeRect(barX, keptY, barW, barH);
        outlineText(ctx, `${(kept / 1000).toFixed(0)} kJ kept -- one per cent`, barX + barW / 2, keptY + 22,
            'bold 13px monospace', '#0f172a', 'center', barW - 10);

        // The leaf, sized by area, drawn green because that is the point
        const leafY = keptY + barH + 58;
        const leafR = Math.max(20, Math.min(52, 14 + area * 4));
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.ellipse(safeRight * 0.3, leafY, leafR, leafR * 0.62, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, `${area} m² of leaf, ${hours} h of sun`, safeRight * 0.3, leafY + leafR + 22,
            'bold 12px monospace', '#0f172a', 'center', 260);

        // What that makes
        const gx = safeRight * 0.68;
        ctx.textAlign = 'left';
        ctx.font = '13px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(`${(kept / 1000).toFixed(0)} kJ ÷ 15.6 kJ/g`, gx - 40, leafY - 10);
        ctx.font = 'bold 17px monospace';
        ctx.fillStyle = '#15803d';
        ctx.fillText(`${glucose.toFixed(1)} g of glucose`, gx - 40, leafY + 16);
        ctx.textAlign = 'center';

        outlineText(ctx, 'green light bounces off -- that is the colour of energy thrown away',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${glucose.toFixed(1)} g of glucose made`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'energy = power x area x time, with time in seconds',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, glucose / 60)),
                caption: 'Glucose Made',
                low: 'Almost none',
                high: 'A good day',
            },
            note: `${area} m² for ${hours} h receives ${(arriving / 1e6).toFixed(1)} MJ. One per cent of that is ${(kept / 1000).toFixed(0)} kJ, which makes ${glucose.toFixed(1)} g of glucose. The other 99% warmed the leaf or was reflected.`,
        };
    };

    return (
        <LabCanvas
            title="How Much Sunlight a Leaf Keeps"
            readout={({ raw }) => `${Math.max(1, Math.round(raw))} m² of leaf under a 1,000 W/m² sun`}
            controlLabel="Leaf Area"
            controlKey="leafArea"
            controlMin={1}
            controlMax={10}
            controlInitial={1}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} m²`}
            control2={{
                label: 'Hours of Sun',
                key: 'sunHours',
                min: 1,
                max: 12,
                initial: 6,
                display: raw => `${Math.max(1, Math.round(raw))} h`,
            }}
            accent="rose"
            sky={['#fefce8', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Much Sunlight a Leaf Keeps"
            completeNote="Power x area x time, then one per cent!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
