import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The lesson's model, for seawater near 20 C and 35 g/kg. */
const densityAt = (celsius: number, salinity: number): number => 1025 - 0.2 * (celsius - 20) + 0.8 * (salinity - 35);
const DEEP = densityAt(4, 35);
const SCALE_TOP = 1018;
const SCALE_BOTTOM = 1032;
const MATCH_BAND = 0.05;

const tempOf = (dial: number): number => Math.round(dial) / 10;
const salinityOf = (dial: number): number => Math.round(dial) / 10;
const signed = (value: number): string => `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(1)}`;

export const L3C6SeawaterLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const celsius = tempOf(raw);
        const salinity = salinityOf(raw2);
        const tempTerm = -0.2 * (celsius - 20);
        const saltTerm = 0.8 * (salinity - 35);
        const density = 1025 + tempTerm + saltTerm;
        const gap = density - DEEP;
        const verdict = Math.abs(gap) <= MATCH_BAND ? 'matches the deep ocean water'
            : gap > 0 ? 'sinks below the deep ocean water' : 'floats above the deep ocean water';
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // A tank where each water settles at the depth its density puts it
        const tankX = 40;
        const tankW = safeRight * 0.46 - tankX;
        const tankTop = stageTop + 10;
        const tankBottom = stageTop + 130 * sy;
        const yOf = (d: number): number =>
            tankTop + ((Math.max(SCALE_TOP, Math.min(SCALE_BOTTOM, d)) - SCALE_TOP) / (SCALE_BOTTOM - SCALE_TOP)) * (tankBottom - tankTop);
        const grad = ctx.createLinearGradient(0, tankTop, 0, tankBottom);
        grad.addColorStop(0, '#e0f2fe');
        grad.addColorStop(1, '#1e3a8a');
        ctx.fillStyle = grad;
        ctx.fillRect(tankX, tankTop, tankW, tankBottom - tankTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(tankX, tankTop, tankW, tankBottom - tankTop);

        const deepY = yOf(DEEP);
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(tankX, deepY);
        ctx.lineTo(tankX + tankW, deepY);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, `deep ocean water ${DEEP.toFixed(1)}`, tankX + 6, deepY - 6, 'bold 11px monospace', '#0f172a', 'left', tankW * 0.62);

        const sampleX = tankX + tankW * 0.82;
        const sampleY = yOf(density);
        ctx.fillStyle = '#10b981';
        ctx.strokeStyle = '#064e3b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sampleX, sampleY, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        outlineText(ctx, `sample ${density.toFixed(1)}`, tankX + tankW + 8, sampleY + 4, 'bold 11px monospace', '#065f46', 'left', safeRight * 0.5 - tankW - 14);

        // The formula, term by term
        const px = safeRight * 0.56;
        const pw = safeRight - 20 - px;
        outlineText(ctx, 'start: 1,025.0', px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `temperature: −0.2 x (${celsius.toFixed(1)} − 20) = ${signed(tempTerm)}`, px, stageTop + 46, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `salt: +0.8 x (${salinity.toFixed(1)} − 35) = ${signed(saltTerm)}`, px, stageTop + 70, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `density: ${density.toFixed(1)} kg/m³`, px, stageTop + 100 * sy, 'bold 13px monospace', '#0f172a', 'left', pw);

        outlineText(ctx, `density = 1,025 ${signed(tempTerm)} ${signed(saltTerm)} = ${density.toFixed(1)} kg/m³`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `the sample ${verdict} (${DEEP.toFixed(1)} kg/m³)`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Density ${density.toFixed(1)} kg/m³`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, '1 g/kg of salt is worth about 4 °C', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (density - SCALE_TOP) / (SCALE_BOTTOM - SCALE_TOP))),
                caption: 'Seawater Density',
                low: '1,018 kg/m³',
                high: '1,032 kg/m³',
                stops: ['#e0f2fe', '#60a5fa', '#1e3a8a'] as [string, string, string],
            },
            note: `At ${celsius.toFixed(1)} °C and ${salinity.toFixed(1)} g/kg, the formula gives ${density.toFixed(1)} kg/m³, so the sample ${verdict}.`,
        };
    };

    return (
        <LabCanvas
            title="Why Cold, Salty Water Sinks"
            readout={({ raw }) => `Water at ${tempOf(raw).toFixed(1)} °C`}
            controlLabel="Temperature"
            controlKey="seaTemperature"
            controlMin={-20}
            controlMax={300}
            controlInitial={200}
            controlDisplay={raw => `${tempOf(raw).toFixed(1)} °C`}
            control2={{
                label: 'Salinity',
                key: 'salinity',
                min: 300,
                max: 400,
                initial: 350,
                display: raw => `${salinityOf(raw).toFixed(1)} g/kg`,
            }}
            accent="emerald"
            sky={['#f0f9ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Cold, Salty Water Sinks"
            completeNote="1 g/kg of salt is worth about 4 °C!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
