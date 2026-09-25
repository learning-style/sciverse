import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The lesson's model fox. */
const BODY_C = 37;
const RESTING_W = 15;
const FUR_K = 0.04;
const FUR_AREA = 0.3;
const TOO_WARM_W = 5;

const furCmOf = (dial: number): number => Math.max(10, Math.min(100, Math.round(dial))) / 10;
const airOf = (dial: number): number => Math.max(-50, Math.min(35, Math.round(dial)));

export const L2B8FoxLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const furCm = furCmOf(raw);
        const air = airOf(raw2);
        const perDegree = (FUR_K * FUR_AREA) / (furCm / 100);
        const deltaT = BODY_C - air;
        const heatOut = perDegree * deltaT;
        const extra = heatOut - RESTING_W;
        const critical = BODY_C - RESTING_W / perDegree;
        const verdict = extra > 0.5 ? `must make ${extra.toFixed(1)} W extra: shiver or move`
            : heatOut < TOO_WARM_W ? 'too warm: must get rid of heat'
            : 'resting heat is enough';
        const verdictColour = extra > 0.5 ? '#1d4ed8' : heatOut < TOO_WARM_W ? '#c2410c' : '#475569';
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // The fox, its fur layer drawn in proportion, with heat escaping outwards
        const cx = safeRight * 0.25;
        const cy = stageTop + 64 * sy;
        const bodyR = 26 * sy;
        const furPx = 2 + 1.6 * furCm;
        ctx.fillStyle = air < 0 ? '#e0f2fe' : air > 25 ? '#ffedd5' : '#f1f5f9';
        ctx.fillRect(30, stageTop + 8, safeRight * 0.46, stageTop + 124 * sy - stageTop - 8);
        ctx.fillStyle = '#f5f5f4';
        ctx.beginPath();
        ctx.ellipse(cx, cy, bodyR + furPx, (bodyR + furPx) * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a8a29e';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#fb7185';
        ctx.beginPath();
        ctx.ellipse(cx, cy, bodyR, bodyR * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        const arrows = Math.max(0, Math.min(10, Math.round(heatOut / 4)));
        for (let i = 0; i < arrows; i++) {
            const angle = (i / Math.max(1, arrows)) * Math.PI * 2 + t * 0.3;
            const r1 = bodyR + furPx + 4;
            const r2 = r1 + 10 + 6 * Math.sin(t * 2 + i);
            ctx.strokeStyle = '#ea580c';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1 * 0.8);
            ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2 * 0.8);
            ctx.stroke();
        }
        outlineText(ctx, `fur ${furCm.toFixed(1)} cm`, cx, stageTop + 124 * sy - 6, 'bold 11px monospace', '#57534e', 'center', safeRight * 0.4);

        // Heat made at rest against heat leaking out
        const px = safeRight * 0.54;
        const pw = safeRight - 20 - px;
        const scale = Math.max(heatOut, RESTING_W, 20);
        const barH = 12;
        const rows: [string, number, string][] = [
            [`resting heat ${RESTING_W} W`, RESTING_W, '#fb7185'],
            [`heat leaking out ${heatOut.toFixed(1)} W`, Math.max(0, heatOut), '#ea580c'],
        ];
        rows.forEach(([label, watts, colour], i) => {
            const ly = stageTop + 18 + i * 38;
            outlineText(ctx, label, px, ly, '12px monospace', '#334155', 'left', pw);
            ctx.fillStyle = colour;
            ctx.fillRect(px, ly + 5, pw * (watts / scale), barH);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, ly + 5, pw, barH);
        });
        outlineText(ctx, `k x A / d = ${perDegree.toFixed(2)} W for each °C`, px, stageTop + 96, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `lower critical temperature ${critical.toFixed(0)} °C`, px, stageTop + 120 * sy, 'bold 12px monospace', '#9f1239', 'left', pw);

        outlineText(ctx, `heat out = ${perDegree.toFixed(2)} x (37 − (${air})) = ${perDegree.toFixed(2)} x ${deltaT} = ${heatOut.toFixed(1)} W`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, verdict, safeRight / 2, stageBottom - 14, 'bold 12px monospace', verdictColour, 'center', safeRight - 30);

        fitText(ctx, `Heat leaking out ${heatOut.toFixed(1)} W`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Heat made must equal heat lost', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, heatOut / 45)),
                caption: 'Heat Leaking Out Through the Fur',
                low: '0 W',
                high: '45 W',
                stops: ['#fed7aa', '#e2e8f0', '#bfdbfe'] as [string, string, string],
            },
            note: `In ${furCm.toFixed(1)} cm of fur at ${air} °C, ${heatOut.toFixed(1)} W leaks out against 15 W made at rest; the lower critical temperature is ${critical.toFixed(0)} °C.`,
        };
    };

    return (
        <LabCanvas
            title="How Cold Can a Fox Get?"
            readout={({ raw }) => `Fur ${furCmOf(raw).toFixed(1)} cm`}
            controlLabel="Fur Thickness"
            controlKey="furThickness"
            controlMin={10}
            controlMax={100}
            controlInitial={60}
            controlDisplay={raw => `${furCmOf(raw).toFixed(1)} cm`}
            control2={{
                label: 'Air Temperature',
                key: 'foxAirTemperature',
                min: -50,
                max: 35,
                initial: -20,
                display: raw => `${airOf(raw)} °C`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Cold Can a Fox Get?"
            completeNote="Heat made = heat lost!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
