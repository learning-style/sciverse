import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Saturation vapour pressure at 35 °C, in kPa -- wet skin and the air share this temperature. */
const SKIN_KPA = 5.6;
/** Watts of cooling per kPa of difference, for an adult in a light breeze. */
const W_PER_KPA = 240;
/** Joules to warm a 70 kg body by 1 °C, from L2B5. */
const BODY_MC = 245000;
const WARM = '#ea580c';
const COOL = '#2563eb';

const humidityOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial)));
const wattsOf = (dial: number): number => Math.max(100, Math.min(1000, Math.round(dial)));

export const L3B5HumidityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const humidity = humidityOf(raw);
        const heatMade = wattsOf(raw2);
        const airKpa = (humidity / 100) * SKIN_KPA;
        const gapKpa = SKIN_KPA - airKpa;
        const cooling = W_PER_KPA * gapKpa;
        const short = heatMade - cooling;
        const warmingPerHour = short > 0 ? (short * 3600) / BODY_MC : 0;
        const verdictColour = short > 0 ? WARM : COOL;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // Vapour pressure at the skin and in the air, on one scale
        const colTop = stageTop + 24;
        const colH = 80 * sy;
        const colBottom = colTop + colH;
        const colW = 30;
        const columns: [string, number, number, string][] = [
            ['skin', SKIN_KPA, 44, '#64748b'],
            ['air', airKpa, 108, COOL],
        ];
        columns.forEach(([label, kpa, x, colour]) => {
            const h = (kpa / SKIN_KPA) * colH;
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(x, colTop, colW, colH);
            ctx.fillStyle = colour;
            ctx.fillRect(x, colBottom - h, colW, h);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x, colTop, colW, colH);
            outlineText(ctx, `${kpa.toFixed(1)} kPa`, x + colW / 2, colTop - 6, 'bold 11px monospace', '#0f172a', 'center', 58);
            outlineText(ctx, label, x + colW / 2, colBottom + 16, 'bold 11px monospace', '#334155', 'center', 58);
        });

        // Heat made against the most sweat can carry away
        const barX = Math.max(180, safeRight * 0.38);
        const barW = safeRight - 30 - barX;
        const scale = Math.max(heatMade, cooling, 1);
        const rows: [string, number, string][] = [
            [`heat made: ${heatMade} W`, heatMade, WARM],
            [`most sweat can carry away: ${Math.round(cooling)} W`, cooling, COOL],
        ];
        rows.forEach(([label, watts, colour], i) => {
            const ly = stageTop + 30 + i * 46 * sy;
            outlineText(ctx, label, barX, ly, 'bold 12px monospace', '#0f172a', 'left', barW);
            ctx.fillStyle = colour;
            ctx.fillRect(barX, ly + 6, barW * (watts / scale), 14);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(barX, ly + 6, barW, 14);
        });
        outlineText(ctx, `difference: ${gapKpa.toFixed(2)} kPa`, barX, stageTop + 30 + 92 * sy,
            'bold 12px monospace', '#334155', 'left', barW);

        outlineText(ctx, short > 0
            ? `${Math.round(short)} W short: the body warms ${warmingPerHour.toFixed(1)} °C every hour`
            : `sweat keeps up: ${Math.round(cooling)} W against ${heatMade} W`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', verdictColour, 'center', safeRight - 30);
        outlineText(ctx, `most cooling = 240 x (5.6 − ${airKpa.toFixed(2)}) = ${Math.round(cooling)} W`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `At ${humidity}% humidity, sweat can carry away ${Math.round(cooling)} W`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, "Skin 5.6 kPa minus the air's vapour pressure", safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, cooling / (W_PER_KPA * SKIN_KPA))),
                caption: 'Most Cooling by Sweat',
                low: '0 W',
                high: '1,344 W',
                stops: ['#dbeafe', '#93c5fd', '#2563eb'] as [string, string, string],
            },
            note: `${humidity}% humidity: air ${airKpa.toFixed(2)} kPa, skin 5.6 kPa, so sweat can carry away up to ${Math.round(cooling)} W against ${heatMade} W made.`,
        };
    };

    return (
        <LabCanvas
            title="The Limit of Sweat"
            readout={({ raw }) => `Humidity ${humidityOf(raw)}%`}
            controlLabel="Humidity"
            controlKey="relativeHumidity"
            controlMin={0}
            controlMax={100}
            controlInitial={50}
            controlDisplay={raw => `${humidityOf(raw)}%`}
            control2={{
                label: 'Heat Made',
                key: 'heatMadeL3',
                min: 100,
                max: 1000,
                initial: 600,
                display: raw => `${wattsOf(raw)} W`,
            }}
            accent="rose"
            sky={['#fff7ed', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Limit of Sweat"
            completeNote="240 W for every kPa of difference!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
