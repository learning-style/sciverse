import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The lesson's table: the most water vapour that can stay as vapour at each temperature, g/m3. */
const LIMITS: [number, number][] = [[0, 4.8], [10, 9.4], [15, 12.8], [20, 17.3], [25, 23.0], [30, 30.4]];
const Y_MAX = 35;

const tempOf = (dial: number): number => Math.max(0, Math.min(30, Math.round(dial)));
const vapourOf = (dial: number): number => Math.max(10, Math.min(350, Math.round(dial))) / 10;

const limitAt = (celsius: number): number => {
    for (let i = 0; i < LIMITS.length - 1; i++) {
        const [t1, v1] = LIMITS[i];
        const [t2, v2] = LIMITS[i + 1];
        if (celsius <= t2) return v1 + ((v2 - v1) * (celsius - t1)) / (t2 - t1);
    }
    return LIMITS[LIMITS.length - 1][1];
};

/** The temperature whose limit equals this vapour density, or null outside the table. */
const dewPointOf = (vapour: number): number | null => {
    if (vapour < LIMITS[0][1] || vapour > LIMITS[LIMITS.length - 1][1]) return null;
    for (let i = 0; i < LIMITS.length - 1; i++) {
        const [t1, v1] = LIMITS[i];
        const [t2, v2] = LIMITS[i + 1];
        if (vapour <= v2) return t1 + ((t2 - t1) * (vapour - v1)) / (v2 - v1);
    }
    return null;
};

export const L2C8DewPointLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const celsius = tempOf(raw);
        const vapour = vapourOf(raw2);
        const limit = limitAt(celsius);
        const humidity = (vapour / limit) * 100;
        const dew = dewPointOf(vapour);
        const dewText = dew === null ? (vapour < LIMITS[0][1] ? 'below 0' : 'above 30') : dew.toFixed(1);
        const condensing = humidity > 100;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // The limit curve, with the air's point marked
        const gx = 58;
        const gw = safeRight * 0.56 - gx;
        const gTop = stageTop + 14;
        const gBottom = stageTop + 108 * sy;
        const xOf = (c: number): number => gx + (c / 30) * gw;
        const yOf = (g: number): number => gBottom - (Math.max(0, Math.min(Y_MAX, g)) / Y_MAX) * (gBottom - gTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, gTop);
        ctx.lineTo(gx, gBottom);
        ctx.lineTo(gx + gw, gBottom);
        ctx.stroke();
        outlineText(ctx, '35 g/m³', gx - 6, gTop + 4, '11px monospace', '#475569', 'right', 54);
        outlineText(ctx, '0', gx - 6, gBottom + 4, '11px monospace', '#475569', 'right', 20);
        outlineText(ctx, '0 °C', gx, gBottom + 16, '11px monospace', '#475569', 'left', 40);
        outlineText(ctx, '30 °C', gx + gw, gBottom + 16, '11px monospace', '#475569', 'right', 44);

        ctx.fillStyle = 'rgba(14, 165, 233, 0.12)';
        ctx.beginPath();
        ctx.moveTo(xOf(0), yOf(0));
        for (let c = 0; c <= 30; c++) ctx.lineTo(xOf(c), yOf(limitAt(c)));
        ctx.lineTo(xOf(30), yOf(0));
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let c = 0; c <= 30; c++) {
            if (c === 0) ctx.moveTo(xOf(c), yOf(limitAt(c)));
            else ctx.lineTo(xOf(c), yOf(limitAt(c)));
        }
        ctx.stroke();

        const px0 = xOf(celsius);
        const py0 = yOf(vapour);
        if (dew !== null && !condensing) {
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px0, py0);
            ctx.lineTo(xOf(dew), py0);
            ctx.lineTo(xOf(dew), gBottom);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        ctx.fillStyle = condensing ? '#0369a1' : '#059669';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px0, py0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (condensing) {
            ctx.fillStyle = '#0ea5e9';
            for (let i = 0; i < 5; i++) {
                const dx = px0 - 16 + i * 8;
                const dy = py0 + 12 + (i % 2) * 5;
                ctx.beginPath();
                ctx.moveTo(dx, dy - 5);
                ctx.quadraticCurveTo(dx + 4, dy + 1, dx, dy + 4);
                ctx.quadraticCurveTo(dx - 4, dy + 1, dx, dy - 5);
                ctx.fill();
            }
        }

        const px = safeRight * 0.62;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `most at ${celsius} °C: ${limit.toFixed(1)} g/m³`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `actual: ${vapour.toFixed(1)} g/m³`, px, stageTop + 46, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `relative humidity ${humidity.toFixed(0)}%`, px, stageTop + 74, 'bold 13px monospace', '#065f46', 'left', pw);
        outlineText(ctx, `dew point ${dewText} °C`, px, stageTop + 100 * sy, '12px monospace', '#334155', 'left', pw);

        outlineText(ctx, `relative humidity = ${vapour.toFixed(1)} / ${limit.toFixed(1)} x 100% = ${humidity.toFixed(0)}%`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, condensing
            ? `above the limit: ${(vapour - limit).toFixed(1)} g/m³ condenses`
            : `cool anything below ${dewText} °C and water condenses on it`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', condensing ? '#0369a1' : '#475569', 'center', safeRight - 30);

        fitText(ctx, `Relative humidity ${humidity.toFixed(0)}%`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Below the dew point, water condenses', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, humidity / 100)),
                caption: 'Relative Humidity',
                low: '0%',
                high: '100%',
                stops: ['#f0f9ff', '#7dd3fc', '#0369a1'] as [string, string, string],
            },
            note: `At ${celsius} °C with ${vapour.toFixed(1)} g/m³ of water vapour, the relative humidity is ${humidity.toFixed(0)}% and the dew point is ${dewText} °C.`,
        };
    };

    return (
        <LabCanvas
            title="Why Cold Things Get Wet"
            readout={({ raw }) => `Air at ${tempOf(raw)} °C`}
            controlLabel="Air Temperature"
            controlKey="airTemperature"
            controlMin={0}
            controlMax={30}
            controlInitial={30}
            controlDisplay={raw => `${tempOf(raw)} °C`}
            control2={{
                label: 'Water Vapour',
                key: 'waterVapour',
                min: 10,
                max: 350,
                initial: 128,
                display: raw => `${vapourOf(raw).toFixed(1)} g/m³`,
            }}
            accent="emerald"
            sky={['#f0f9ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Why Cold Things Get Wet"
            completeNote="Below the dew point, water condenses!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
