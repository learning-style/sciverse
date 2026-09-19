import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The lesson's model: blood c, paws at 0 C, body at 37 C, 15 W resting heat. */
const BLOOD_C = 3.6;
const BODY_C = 37;
const PAW_C = 0;
const RESTING_W = 15;
const MAX_LOSS = 67;

const flowOf = (dial: number): number => Math.max(1, Math.min(10, Math.round(dial))) / 10;
const arrivalOf = (dial: number): number => Math.max(0, Math.min(37, Math.round(dial)));

/** Blue at 0 C to red at 37 C. */
const colourAt = (celsius: number): string => {
    const f = Math.max(0, Math.min(1, celsius / BODY_C));
    return `rgb(${Math.round(59 + 161 * f)}, ${Math.round(130 - 92 * f)}, ${Math.round(246 - 208 * f)})`;
};

export const L3B8PawLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const flow = flowOf(raw);
        const arrival = arrivalOf(raw2);
        const lost = flow * BLOOD_C * (arrival - PAW_C);
        const handedBack = BODY_C - PAW_C > 0 ? (BODY_C - arrival) / (BODY_C - PAW_C) : 0;
        const veinTop = PAW_C + (BODY_C - arrival);
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // The leg: artery going down, vein coming back up, side by side
        const legX = safeRight * 0.18;
        const gapX = 26;
        const top = stageTop + 24;
        const bottom = stageTop + 104 * sy;
        const steps = 24;
        for (let i = 0; i < steps; i++) {
            const f1 = i / steps;
            const f2 = (i + 1) / steps;
            const y1 = top + f1 * (bottom - top);
            const y2 = top + f2 * (bottom - top);
            ctx.fillStyle = colourAt(BODY_C - (BODY_C - arrival) * f1);
            ctx.fillRect(legX - 8, y1, 12, y2 - y1 + 0.5);
            ctx.fillStyle = colourAt(veinTop - (veinTop - PAW_C) * f1);
            ctx.fillRect(legX + gapX - 4, y1, 12, y2 - y1 + 0.5);
        }
        const drift = (t * 0.5) % 1;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        for (let i = 0; i < 3; i++) {
            const f = (drift + i / 3) % 1;
            ctx.beginPath();
            ctx.arc(legX - 2, top + f * (bottom - top), 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(legX + gapX + 2, bottom - f * (bottom - top), 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
        if (arrival < BODY_C) {
            ctx.strokeStyle = '#ea580c';
            ctx.lineWidth = 1.5;
            for (let i = 1; i <= 3; i++) {
                const hy = top + (i / 4) * (bottom - top);
                ctx.beginPath();
                ctx.moveTo(legX + 5, hy);
                ctx.lineTo(legX + gapX - 6, hy);
                ctx.stroke();
            }
        }
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(legX - 30, bottom + 6, gapX + 60, 10);
        ctx.fillStyle = colourAt(PAW_C);
        ctx.beginPath();
        ctx.ellipse(legX + gapX / 2, bottom + 3, gapX / 2 + 16, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'artery', legX - 2, top - 8, 'bold 11px monospace', '#991b1b', 'right', 60);
        outlineText(ctx, 'vein', legX + gapX + 2, top - 8, 'bold 11px monospace', '#1e40af', 'left', 60);
        outlineText(ctx, `body ${BODY_C} °C`, legX - 14, top + 10, '11px monospace', '#334155', 'right', 90);
        outlineText(ctx, `arrives ${arrival} °C`, legX - 14, bottom - 2, 'bold 11px monospace', '#334155', 'right', 90);
        outlineText(ctx, `back up ${veinTop} °C`, legX + gapX + 14, top + 10, '11px monospace', '#334155', 'left', 90);
        outlineText(ctx, `paw ${PAW_C} °C`, legX + gapX + 14, bottom - 2, 'bold 11px monospace', '#334155', 'left', 70);

        // Heat lost through the paws against the fox's resting heat
        const px = safeRight * 0.5;
        const pw = safeRight - 20 - px;
        const scale = Math.max(lost, RESTING_W, 20);
        const rows: [string, number, string][] = [
            [`resting heat ${RESTING_W} W`, RESTING_W, '#fb7185'],
            [`lost through the paws ${lost.toFixed(1)} W`, lost, '#2563eb'],
        ];
        rows.forEach(([label, watts, colour], i) => {
            const ly = stageTop + 20 + i * 38;
            outlineText(ctx, label, px, ly, '12px monospace', '#334155', 'left', pw);
            ctx.fillStyle = colour;
            ctx.fillRect(px, ly + 5, pw * (watts / scale), 12);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, ly + 5, pw, 12);
        });
        outlineText(ctx, `handed back ${(handedBack * 100).toFixed(0)}%`, px, stageTop + 108 * sy, 'bold 13px monospace', '#9f1239', 'left', pw);

        outlineText(ctx, `heat lost = ${flow.toFixed(1)} x 3.6 x (${arrival} − 0) = ${lost.toFixed(1)} W`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, lost > RESTING_W ? "more than the fox's resting 15 W" : `handed back to the body: ${(handedBack * 100).toFixed(0)}%`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', lost > RESTING_W ? '#1d4ed8' : '#475569', 'center', safeRight - 30);

        fitText(ctx, `Lost through the paws ${lost.toFixed(1)} W`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Artery and vein flow in opposite directions', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, lost / MAX_LOSS)),
                caption: 'Heat Lost Through the Paws',
                low: '0 W',
                high: '67 W',
                stops: ['#e0f2fe', '#93c5fd', '#1d4ed8'] as [string, string, string],
            },
            note: `With ${flow.toFixed(1)} g of blood each second arriving at ${arrival} °C, the paws lose ${lost.toFixed(1)} W and ${(handedBack * 100).toFixed(0)}% of the heat is handed back to the body.`,
        };
    };

    return (
        <LabCanvas
            title="How a Fox Keeps Its Feet Cold"
            readout={({ raw }) => `Blood flow ${flowOf(raw).toFixed(1)} g each second`}
            controlLabel="Blood Flow"
            controlKey="pawBloodFlow"
            controlMin={1}
            controlMax={10}
            controlInitial={5}
            controlDisplay={raw => `${flowOf(raw).toFixed(1)} g/s`}
            control2={{
                label: 'Arrival Temperature',
                key: 'arrivalTemperature',
                min: 0,
                max: 37,
                initial: 4,
                display: raw => `${arrivalOf(raw)} °C`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How a Fox Keeps Its Feet Cold"
            completeNote="Countercurrent exchange!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
