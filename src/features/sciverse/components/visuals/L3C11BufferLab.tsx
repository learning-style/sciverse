import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const PH_LOW = 6.8;
const PH_HIGH = 8.0;
const BAND_LOW = 7.35;
const BAND_HIGH = 7.45;
const RATIO_SCALE = 40;
const ACID_SIDE = '#b91c1c';
const BASE_SIDE = '#1d4ed8';
const IN_BAND = '#15803d';

const bicarbonateOf = (dial: number): number => Math.max(6, Math.min(36, Math.round(dial)));
const pressureOf = (dial: number): number => Math.max(15, Math.min(90, Math.round(dial)));

export const L3C11BufferLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const bicarbonate = bicarbonateOf(raw);
        const pressure = pressureOf(raw2);
        const dissolved = 0.03 * pressure;
        const ratio = bicarbonate / dissolved;
        const ph = 6.1 + Math.log10(ratio);
        const status = ph < BAND_LOW ? 'more acidic than the healthy band'
            : ph > BAND_HIGH ? 'less acidic than the healthy band'
            : 'in the healthy band';
        const colour = ph < BAND_LOW ? ACID_SIDE : ph > BAND_HIGH ? BASE_SIDE : IN_BAND;

        const x0 = 40;
        const x1 = safeRight - 40;
        const w = x1 - x0;

        // The ratio of base to acid, against the ratio 20 that gives pH 7.40
        const y1 = stageTop + 18;
        outlineText(ctx, `ratio = ${bicarbonate} / (0.03 x ${pressure}) = ${bicarbonate} / ${dissolved.toFixed(2)} = ${ratio.toFixed(1)}`,
            x0, y1, 'bold 12px monospace', '#0f172a', 'left', w);
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(x0, y1 + 6, w, 16);
        ctx.fillStyle = colour;
        ctx.fillRect(x0, y1 + 6, w * Math.min(1, ratio / RATIO_SCALE), 16);
        const twenty = x0 + w * (20 / RATIO_SCALE);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(twenty, y1 + 2);
        ctx.lineTo(twenty, y1 + 26);
        ctx.stroke();
        outlineText(ctx, 'ratio 20: pH 7.40', twenty, y1 + 40, '11px monospace', '#475569', 'center', w * 0.4);

        // The pH, on a short stretch of the scale with the healthy band shaded
        const y2 = y1 + 64;
        const xPh = (p: number): number => x0 + ((Math.max(PH_LOW, Math.min(PH_HIGH, p)) - PH_LOW) / (PH_HIGH - PH_LOW)) * w;
        outlineText(ctx, 'pH, healthy band 7.35 to 7.45', x0, y2, 'bold 12px monospace', '#0f172a', 'left', w);
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(x0, y2 + 8, xPh(BAND_LOW) - x0, 16);
        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(xPh(BAND_HIGH), y2 + 8, x1 - xPh(BAND_HIGH), 16);
        ctx.fillStyle = '#86efac';
        ctx.fillRect(xPh(BAND_LOW), y2 + 8, xPh(BAND_HIGH) - xPh(BAND_LOW), 16);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x0, y2 + 8, w, 16);
        [7.0, 7.4, 7.8].forEach(p => {
            outlineText(ctx, p.toFixed(1), xPh(p), y2 + 40, '11px monospace', '#475569', 'center', 40);
        });
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.moveTo(xPh(ph), y2 + 26);
        ctx.lineTo(xPh(ph) - 7, y2 + 36);
        ctx.lineTo(xPh(ph) + 7, y2 + 36);
        ctx.closePath();
        ctx.fill();

        outlineText(ctx, `pH = 6.1 + log ${ratio.toFixed(1)} = ${ph.toFixed(2)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, status, safeRight / 2, stageBottom - 14, 'bold 12px monospace', colour, 'center', safeRight - 30);

        fitText(ctx, `pH ${ph.toFixed(2)} with bicarbonate ${bicarbonate} mmol/L and CO₂ pressure ${pressure} mmHg`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Only the ratio matters', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (ph - PH_LOW) / (PH_HIGH - PH_LOW))),
                caption: 'pH',
                low: '6.8',
                high: '8.0',
                stops: [ACID_SIDE, IN_BAND, BASE_SIDE] as [string, string, string],
            },
            note: `Bicarbonate ${bicarbonate} mmol/L over ${dissolved.toFixed(2)} mmol/L of dissolved CO₂ is a ratio of ${ratio.toFixed(1)}, so the pH is ${ph.toFixed(2)}: ${status}.`,
        };
    };

    return (
        <LabCanvas
            title="How Blood Holds Its pH"
            readout={({ raw }) => `Bicarbonate ${bicarbonateOf(raw)} mmol/L`}
            controlLabel="Bicarbonate"
            controlKey="bicarbonate"
            controlMin={6}
            controlMax={36}
            controlInitial={24}
            controlDisplay={raw => `${bicarbonateOf(raw)} mmol/L`}
            control2={{
                label: 'CO₂ Pressure',
                key: 'co2Pressure',
                min: 15,
                max: 90,
                initial: 40,
                display: raw => `${pressureOf(raw)} mmHg`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Blood Holds Its pH"
            completeNote="Base over acid!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
