import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const CARBON = '#334155';
const REST = '#cbd5e1';
const OXYGEN = '#38bdf8';
const SCALE_KG = 170;

const massOf = (dial: number): number => Math.max(1, Math.min(50, Math.round(dial)));
const shareOf = (dial: number): number => Math.max(50, Math.min(90, Math.round(dial)));

export const L2C10CarbonLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const fuel = massOf(raw);
        const share = shareOf(raw2);
        const carbon = (fuel * share) / 100;
        const oxygen = (carbon * 32) / 12;
        const co2 = (carbon * 44) / 12;

        const x0 = 30;
        const barW = safeRight - 30 - x0;
        const kgW = barW / SCALE_KG;
        const rowStep = Math.max(34, Math.min(46, (stageBottom - 56 - stageTop - 16) / 3));
        const barH = 16;

        const row = (label: string, y: number, parts: [number, string][]) => {
            outlineText(ctx, label, x0, y, 'bold 12px monospace', '#0f172a', 'left', barW);
            let x = x0;
            parts.forEach(([kg, colour]) => {
                ctx.fillStyle = colour;
                ctx.fillRect(x, y + 6, kg * kgW, barH);
                x += kg * kgW;
            });
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(x0, y + 6, x - x0, barH);
        };

        const y1 = stageTop + 16;
        row(`fuel ${fuel} kg: carbon ${carbon.toFixed(1)} kg + rest of the fuel ${(fuel - carbon).toFixed(1)} kg`, y1,
            [[carbon, CARBON], [fuel - carbon, REST]]);
        row(`oxygen from the air ${oxygen.toFixed(1)} kg`, y1 + rowStep, [[oxygen, OXYGEN]]);
        row(`CO₂ ${co2.toFixed(1)} kg = carbon + oxygen`, y1 + rowStep * 2, [[carbon, CARBON], [oxygen, OXYGEN]]);

        outlineText(ctx, `CO₂ = ${carbon.toFixed(1)} kg x 44 / 12 = ${co2.toFixed(1)} kg`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `carbon ${carbon.toFixed(1)} kg + oxygen ${oxygen.toFixed(1)} kg = CO₂ ${co2.toFixed(1)} kg`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#0369a1', 'center', safeRight - 30);

        fitText(ctx, `${fuel} kg of fuel makes ${co2.toFixed(1)} kg of CO₂`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Carbon x 44 / 12', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, co2 / fuel / (44 / 12))),
                caption: 'CO₂ for Each kg of Fuel',
                low: '0 kg',
                high: '3.67 kg',
                stops: ['#f1f5f9', '#94a3b8', '#334155'] as [string, string, string],
            },
            note: `${fuel} kg of fuel at ${share}% carbon is ${carbon.toFixed(1)} kg of carbon, which joins ${oxygen.toFixed(1)} kg of oxygen from the air to make ${co2.toFixed(1)} kg of CO₂.`,
        };
    };

    return (
        <LabCanvas
            title="More Carbon Dioxide Than Fuel"
            readout={({ raw }) => `Burning ${massOf(raw)} kg of fuel`}
            controlLabel="Fuel Mass"
            controlKey="fuelMass"
            controlMin={1}
            controlMax={50}
            controlInitial={10}
            controlDisplay={raw => `${massOf(raw)} kg`}
            control2={{
                label: 'Carbon Share',
                key: 'carbonShare',
                min: 50,
                max: 90,
                initial: 86,
                display: raw => `${shareOf(raw)}%`,
            }}
            accent="emerald"
            sky={['#f1f5f9', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="More Carbon Dioxide Than Fuel"
            completeNote="Carbon x 44 / 12!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
