import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** 70,000 g x 3.5 J/g/°C: joules to warm a 70 kg body by 1 °C. */
const BODY_MC = 245000;
const J_PER_GRAM = 2400;
const WARM = '#ea580c';
const COOL = '#2563eb';

const signed = (value: number, digits: number): string =>
    `${value < 0 ? '−' : ''}${digits === 0 ? Math.abs(Math.round(value)).toLocaleString() : Math.abs(value).toFixed(digits)}`;

export const L2B5SweatLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const watts = Math.max(100, Math.round(raw));
        const grams = Math.max(0, Math.round(raw2));
        const heatIn = watts * 3600;
        const heatOut = grams * J_PER_GRAM;
        const kept = heatIn - heatOut;
        const change = kept / BODY_MC;
        const finalTemp = 37 + change;
        const steady = Math.abs(change) < 0.05;
        const signColour = steady ? '#475569' : change > 0 ? WARM : COOL;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // The body's books for one hour: heat in, heat out
        const barX = 40;
        const barW = safeRight * 0.62 - barX;
        const scale = Math.max(heatIn, heatOut, 1);
        const rows: [string, number, string][] = [
            [`heat made (in): ${heatIn.toLocaleString()} J`, heatIn, WARM],
            [`carried out by sweat: ${heatOut.toLocaleString()} J`, heatOut, COOL],
        ];
        rows.forEach(([label, joules, colour], i) => {
            const ly = stageTop + 18 + i * 46 * sy;
            outlineText(ctx, label, barX, ly, 'bold 12px monospace', '#0f172a', 'left', barW);
            ctx.fillStyle = colour;
            ctx.fillRect(barX, ly + 6, barW * (joules / scale), 16);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(barX, ly + 6, barW, 16);
        });
        outlineText(ctx, `left in the body: ${signed(kept, 0)} J`, barX, stageTop + 18 + 92 * sy,
            'bold 13px monospace', signColour, 'left', barW);

        // A thermometer from 30 °C to 50 °C, with a dashed mark at 40 °C
        const tubeX = safeRight * 0.8;
        const tubeTop = stageTop + 10;
        const tubeBottom = tubeTop + 84 * sy;
        const bulbR = 12;
        const yOfTemp = (celsius: number): number =>
            tubeBottom - Math.max(0, Math.min(1, (celsius - 30) / 20)) * (tubeBottom - tubeTop);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(tubeX - 6, tubeTop, 12, tubeBottom - tubeTop);
        ctx.fillStyle = signColour;
        ctx.fillRect(tubeX - 6, yOfTemp(finalTemp), 12, tubeBottom - yOfTemp(finalTemp));
        ctx.beginPath();
        ctx.arc(tubeX, tubeBottom + bulbR - 2, bulbR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(tubeX - 6, tubeTop, 12, tubeBottom - tubeTop);
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(tubeX + 8, yOfTemp(40));
        ctx.lineTo(tubeX + 20, yOfTemp(40));
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, `${finalTemp.toFixed(1)} °C`, tubeX, tubeBottom + 2 * bulbR + 16,
            'bold 13px monospace', signColour, 'center', safeRight * 0.34);

        outlineText(ctx, `dT = ${signed(kept, 0)} / 245,000 = ${signed(change, 1)} °C in one hour`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', signColour, 'center', safeRight - 30);
        const verdict = steady ? 'the temperature holds steady'
            : finalTemp > 40 ? 'above 40 °C: heatstroke'
            : change > 0 ? 'the body gets hotter' : 'the body cools';
        outlineText(ctx, verdict, safeRight / 2, stageBottom - 14, 'bold 12px monospace', signColour, 'center', safeRight - 30);

        fitText(ctx, `After one hour: ${finalTemp.toFixed(1)} °C`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Only evaporated sweat carries heat out', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (finalTemp - 30) / 20)),
                caption: 'Body Temperature After One Hour',
                low: '30 °C',
                high: '50 °C',
                stops: ['#93c5fd', '#e2e8f0', '#fdba74'] as [string, string, string],
            },
            note: `${watts} W for one hour makes ${heatIn.toLocaleString()} J; ${grams} g of evaporated sweat carries out ${heatOut.toLocaleString()} J. The body ends at ${finalTemp.toFixed(1)} °C.`,
        };
    };

    return (
        <LabCanvas
            title="Why Sweat Works"
            readout={({ raw }) => `Heat made ${Math.max(100, Math.round(raw))} W`}
            controlLabel="Heat Made"
            controlKey="heatMade"
            controlMin={100}
            controlMax={1000}
            controlInitial={600}
            controlDisplay={raw => `${Math.max(100, Math.round(raw))} W`}
            control2={{
                label: 'Sweat Evaporated',
                key: 'sweatEvaporated',
                min: 0,
                max: 1500,
                initial: 900,
                display: raw => `${Math.max(0, Math.round(raw))} g per hour`,
            }}
            accent="rose"
            sky={['#fff7ed', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Why Sweat Works"
            completeNote="2,400 joules in every gram of sweat!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
