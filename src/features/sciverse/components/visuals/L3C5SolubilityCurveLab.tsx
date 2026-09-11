import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const K_20C = 1.7;
const R_GAS = 8.314;
const K_MAX = 6;
const T_MAX = 60;
/** Measured CO2 from L2C5's table: [°C, g/L per atm]. */
const MEASURED: [number, number][] = [[0, 3.4], [10, 2.3], [20, 1.7], [30, 1.3], [40, 1.0]];

const celsiusOf = (dial: number): number => Math.max(0, Math.min(T_MAX, Math.round(dial)));
const heatOf = (dial: number): number => Math.max(5, Math.min(40, Math.round(dial)));
const slopeOf = (kjPerMol: number): number => (kjPerMol * 1000) / (2.303 * R_GAS);
const kAt = (celsius: number, slope: number): number =>
    K_20C * Math.pow(10, slope * (1 / (celsius + 273) - 1 / 293));

export const L3C5SolubilityCurveLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const celsius = celsiusOf(raw);
        const heat = heatOf(raw2);
        const slope = slopeOf(heat);
        const k = kAt(celsius, slope);
        const kelvin = celsius + 273;
        const logRatio = slope * (1 / kelvin - 1 / 293);
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        const gx = 60;
        const gw = safeRight - 30 - gx;
        const top = stageTop + 24;
        const height = 96 * sy;
        const bottom = top + height;
        const xOf = (c: number): number => gx + (c / T_MAX) * gw;
        const yOf = (kValue: number): number => bottom - (Math.min(kValue, K_MAX) / K_MAX) * height;

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, top);
        ctx.lineTo(gx, bottom);
        ctx.lineTo(gx + gw, bottom);
        ctx.stroke();

        // van 't Hoff's curve for this heat of dissolving
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let c = 0; c <= T_MAX; c++) {
            const px = xOf(c);
            const py = yOf(kAt(c, slope));
            if (c === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Measured CO2
        MEASURED.forEach(([c, kValue]) => {
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(xOf(c), yOf(kValue), 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Your temperature
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(xOf(celsius), top);
        ctx.lineTo(xOf(celsius), bottom);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#047857';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xOf(celsius), yOf(k), 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        outlineText(ctx, `k in g/L per atm, 0 to ${K_MAX}`, gx, top - 8, 'bold 11px monospace', '#334155', 'left',
            gw >= 320 ? gw / 2 - 10 : gw);
        if (gw >= 320) {
            outlineText(ctx, 'dots: measured CO₂', gx + gw, top - 8, 'bold 11px monospace', '#0f172a', 'right', gw / 2 - 10);
        }
        outlineText(ctx, '0 °C', gx, bottom + 16, '11px monospace', '#475569', 'left', 44);
        outlineText(ctx, `${T_MAX} °C`, gx + gw, bottom + 16, '11px monospace', '#475569', 'right', 50);
        outlineText(ctx, 'temperature', gx + gw / 2, bottom + 16, 'bold 11px monospace', '#334155', 'center', Math.max(40, gw - 120));

        outlineText(ctx, `log (k / 1.7) = ${slope.toFixed(0)} x (1/${kelvin} − 1/293) = ${logRatio >= 0 ? '+' : '−'}${Math.abs(logRatio).toFixed(3)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `k = ${k.toFixed(2)} g/L per atm at ${celsius} °C`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#065f46', 'center', safeRight - 30);

        fitText(ctx, `B = ${slope.toFixed(0)} K for ΔH = −${heat} kJ/mol`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'More heat released, steeper curve', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, k / K_MAX)),
                caption: 'k at This Temperature',
                low: '0',
                high: `${K_MAX} g/L per atm`,
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `With ΔH = −${heat} kJ/mol, B = ${slope.toFixed(0)} K, and k at ${celsius} °C is ${k.toFixed(2)} g/L per atm.`,
        };
    };

    return (
        <LabCanvas
            title="Why Warm Drinks Lose Their Fizz"
            readout={({ raw }) => `Temperature ${celsiusOf(raw)} °C`}
            controlLabel="Temperature"
            controlKey="waterTemperature"
            controlMin={0}
            controlMax={60}
            controlInitial={20}
            controlDisplay={raw => `${celsiusOf(raw)} °C`}
            control2={{
                label: 'Heat of Dissolving',
                key: 'heatOfDissolving',
                min: 5,
                max: 40,
                initial: 20,
                display: raw => `−${heatOf(raw)} kJ/mol`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Warm Drinks Lose Their Fizz"
            completeNote="The heat of dissolving sets the slope!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
