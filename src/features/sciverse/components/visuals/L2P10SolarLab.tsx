import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUN_W_PER_M2 = 1000;
const EFFICIENCY = 0.2;
const PANEL_M2 = 1.7;
const HOME_KWH = 10;
const SCALE_KWH = 50;
const GAIN = '#15803d';
const LOSS = '#b91c1c';

const areaOf = (dial: number): number => Math.max(1, Math.min(30, Math.round(dial * 10) / 10));
const hoursOf = (dial: number): number => Math.max(1, Math.min(8, Math.round(dial * 2) / 2));

export const L2P10SolarLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const area = areaOf(raw);
        const hours = hoursOf(raw2);
        const watts = SUN_W_PER_M2 * area * EFFICIENCY;
        const kw = watts / 1000;
        const kwh = kw * hours;
        const gap = kwh - HOME_KWH;

        // The Sun, with rays falling on the roof
        const sunX = 52;
        const sunY = stageTop + 30;
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
        ctx.fill();
        const roofX = 96;
        const roofW = safeRight * 0.5 - roofX;
        const roofY = stageTop + 58;
        ctx.strokeStyle = 'rgba(234,179,8,0.55)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            const shift = ((t * 30 + i * 25) % 100) / 100;
            const x0 = sunX + 18;
            const x1 = roofX + roofW * (0.2 + i * 0.22);
            ctx.beginPath();
            ctx.moveTo(x0 + (x1 - x0) * shift * 0.6, sunY + (roofY - sunY) * shift * 0.6);
            ctx.lineTo(x0 + (x1 - x0) * Math.min(1, shift * 0.6 + 0.25), sunY + (roofY - sunY) * Math.min(1, shift * 0.6 + 0.25));
            ctx.stroke();
        }

        // The roof, with one rectangle for each 1.7 m² panel; the last one only partly filled
        const cols = 6;
        const cellW = roofW / cols;
        const cellH = Math.max(12, Math.min(22, (stageBottom - 96 - roofY) / 3));
        const panels = area / PANEL_M2;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(roofX - 6, roofY - 6, roofW + 12, cellH * 3 + 12);
        for (let i = 0; i < 18; i++) {
            const fill = Math.max(0, Math.min(1, panels - i));
            if (fill <= 0) break;
            const x = roofX + (i % cols) * cellW;
            const y = roofY + Math.floor(i / cols) * cellH;
            ctx.fillStyle = '#1e3a8a';
            ctx.fillRect(x + 2, y + 2, (cellW - 4) * fill, cellH - 4);
            ctx.strokeStyle = '#93c5fd';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 2, y + 2, cellW - 4, cellH - 4);
        }
        outlineText(ctx, `${area} m² = ${panels.toFixed(1)} panels`, roofX + roofW / 2, roofY + cellH * 3 + 22,
            'bold 12px monospace', '#1e3a8a', 'center', roofW);

        // A day's energy against the model home's 10 kWh
        const px = safeRight * 0.58;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `power = 1,000 x ${area} x 0.20 = ${Math.round(watts).toLocaleString()} W`, px, stageTop + 18, '12px monospace', '#334155', 'left', pw);
        const barY = stageTop + 34;
        const barH = 18;
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(px, barY, pw, barH);
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(px, barY, pw * Math.min(1, kwh / SCALE_KWH), barH);
        const homeX = px + pw * (HOME_KWH / SCALE_KWH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(homeX, barY - 4);
        ctx.lineTo(homeX, barY + barH + 4);
        ctx.stroke();
        outlineText(ctx, 'model home 10 kWh', homeX, barY + barH + 16, '11px monospace', '#0f172a', 'left', pw - (homeX - px));
        outlineText(ctx, `energy in a day ${kwh.toFixed(2)} kWh`, px, barY + barH + 38, 'bold 13px monospace', '#4f46e5', 'left', pw);

        outlineText(ctx, `energy = ${kw.toFixed(2)} kW x ${hours} hours = ${kwh.toFixed(2)} kWh a day`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, gap >= 0 ? `enough for the model home's 10 kWh, with ${gap.toFixed(1)} kWh extra` : `short of the model home's 10 kWh by ${(-gap).toFixed(1)} kWh`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', gap >= 0 ? GAIN : LOSS, 'center', safeRight - 30);

        fitText(ctx, `${kwh.toFixed(1)} kWh a day from ${area} m² of panels`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Sunlight x area x efficiency x hours', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, kwh / (2 * HOME_KWH))),
                caption: 'Energy in a Day',
                low: '0 kWh',
                high: '20 kWh',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `${area} m² of panels at 20% give ${Math.round(watts).toLocaleString()} W in full sun, and ${kwh.toFixed(2)} kWh in ${hours} full-sun hours.`,
        };
    };

    return (
        <LabCanvas
            title="How Many Solar Panels Power a Home?"
            readout={({ raw }) => `${areaOf(raw)} m² of panels at 20% efficiency`}
            controlLabel="Panel Area"
            controlKey="panelArea"
            controlMin={1}
            controlMax={30}
            controlInitial={13.6}
            controlDisplay={raw => `${areaOf(raw)} m²`}
            control2={{
                label: 'Full-Sun Hours',
                key: 'fullSunHours',
                min: 1,
                max: 8,
                initial: 4,
                display: raw => `${hoursOf(raw)} hours`,
            }}
            accent="indigo"
            sky={['#fefce8', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Many Solar Panels Power a Home?"
            completeNote="Power x time!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
