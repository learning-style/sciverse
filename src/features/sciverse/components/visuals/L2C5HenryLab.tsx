import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** k for CO2 in water, g/L per atm -- the lesson's table, joined by straight lines. */
const K_TABLE: [number, number][] = [[0, 3.4], [10, 2.3], [20, 1.7], [30, 1.3], [40, 1.0]];
const MAX_GL = 17;

const kAt = (celsius: number): number => {
    for (let i = 0; i < K_TABLE.length - 1; i++) {
        const [c1, k1] = K_TABLE[i];
        const [c2, k2] = K_TABLE[i + 1];
        if (celsius <= c2) return k1 + ((k2 - k1) * (celsius - c1)) / (c2 - c1);
    }
    return K_TABLE[K_TABLE.length - 1][1];
};

const pressureOf = (dial: number): number => Math.max(0, Math.round(dial)) / 10;
const celsiusOf = (dial: number): number => Math.max(0, Math.round(dial));

/** Fixed scatter positions, so the dots stay put from frame to frame. */
const DOTS: [number, number][] = Array.from({ length: 140 }, (_, i) =>
    [(i * 0.6180339887) % 1, (i * 0.7548776662 + 0.31) % 1] as [number, number]);

export const L2C5HenryLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const pressure = pressureOf(raw);
        const celsius = celsiusOf(raw2);
        const k = kAt(celsius);
        const dissolved = k * pressure;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));
        const top = stageTop + 24;
        const height = 90 * sy;
        const bottom = top + height;

        // The bottle: CO2 gas above, the drink below
        const bx = 36;
        const bw = Math.max(60, safeRight * 0.2);
        const gasH = height * 0.28;
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(bx, top, bw, gasH);
        ctx.fillStyle = '#d1fae5';
        ctx.fillRect(bx, top + gasH, bw, height - gasH);
        ctx.fillStyle = '#64748b';
        DOTS.slice(0, Math.round(pressure * 6)).forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(bx + 4 + dx * (bw - 8), top + 3 + dy * (gasH - 6), 1.8, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.fillStyle = '#047857';
        DOTS.slice(0, Math.round((dissolved / MAX_GL) * DOTS.length)).forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(bx + 4 + dx * (bw - 8), top + gasH + 3 + dy * (height - gasH - 6), 1.8, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, top, bw, height);
        outlineText(ctx, 'CO₂ gas', bx + bw / 2, top - 8, 'bold 11px monospace', '#334155', 'center', bw + 20);
        outlineText(ctx, 'drink', bx + bw / 2, bottom + 16, 'bold 11px monospace', '#065f46', 'center', bw + 20);

        // The straight line for this temperature, and where the bottle sits on it
        const gx = bx + bw + 46;
        const gw = safeRight - 30 - gx;
        const xOf = (atm: number): number => gx + (atm / 5) * gw;
        const yOf = (grams: number): number => bottom - (grams / MAX_GL) * height;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, top);
        ctx.lineTo(gx, bottom);
        ctx.lineTo(gx + gw, bottom);
        ctx.stroke();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(xOf(0), yOf(0));
        ctx.lineTo(xOf(5), yOf(k * 5));
        ctx.stroke();
        ctx.fillStyle = '#047857';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xOf(pressure), yOf(dissolved), 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        outlineText(ctx, `dissolved CO₂, 0 to ${MAX_GL} g/L`, gx, top - 8, 'bold 11px monospace', '#334155', 'left', gw);
        if (gw >= 150) {
            outlineText(ctx, '0', gx, bottom + 16, '11px monospace', '#475569', 'left', 20);
            outlineText(ctx, '5', gx + gw, bottom + 16, '11px monospace', '#475569', 'right', 20);
        }
        outlineText(ctx, 'gas pressure (atm)', gx + gw / 2, bottom + 16, 'bold 11px monospace', '#334155', 'center',
            gw >= 150 ? gw - 60 : gw);

        outlineText(ctx, `dissolved gas = k x pressure = ${k.toFixed(2)} x ${pressure.toFixed(1)} = ${dissolved.toFixed(2)} g/L`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `a 0.5 L bottle holds ${(dissolved * 0.5).toFixed(1)} g of CO₂`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${dissolved.toFixed(2)} g/L dissolved at ${celsius} °C`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Double the pressure, double the gas', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, dissolved / MAX_GL)),
                caption: 'Dissolved CO₂',
                low: '0 g/L',
                high: `${MAX_GL} g/L`,
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `At ${celsius} °C, k is ${k.toFixed(2)} g/L per atm, so ${pressure.toFixed(1)} atm of CO₂ holds ${dissolved.toFixed(2)} g/L.`,
        };
    };

    return (
        <LabCanvas
            title="How Much Gas a Drink Can Hold"
            readout={({ raw }) => `CO₂ pressure ${pressureOf(raw).toFixed(1)} atm`}
            controlLabel="Gas Pressure"
            controlKey="gasPressure"
            controlMin={0}
            controlMax={50}
            controlInitial={35}
            controlDisplay={raw => `${pressureOf(raw).toFixed(1)} atm`}
            control2={{
                label: 'Temperature',
                key: 'drinkTemperature',
                min: 0,
                max: 40,
                initial: 20,
                display: raw => `${celsiusOf(raw)} °C`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Much Gas a Drink Can Hold"
            completeNote="Dissolved gas = k x pressure!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
