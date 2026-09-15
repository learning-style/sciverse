import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const RHO = 1.2;
const MAX_SPEED = 15;
const CAPTURE = 0.59;
const LINE = '#4f46e5';

const speedOf = (dial: number): number => Math.max(0, Math.min(MAX_SPEED, Math.round(dial * 2) / 2));
const bladeOf = (dial: number): number => Math.max(1, Math.min(50, Math.round(dial * 10) / 10));
const windPower = (area: number, speed: number): number => 0.5 * RHO * area * speed * speed * speed;
const powerText = (watts: number): string => {
    if (watts < 1000) return `${Math.round(watts)} W`;
    if (watts < 1e6) return `${(watts / 1000).toFixed(1)} kW`;
    return `${(watts / 1e6).toFixed(2)} million W`;
};

export const L3P10WindLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const speed = speedOf(raw);
        const blade = bladeOf(raw2);
        const area = Math.PI * blade * blade;
        const power = windPower(area, speed);
        const most = windPower(area, MAX_SPEED);

        const gTop = stageTop + 20;
        const gBottom = stageBottom - 64;

        // Left: the turbine, its swept circle, and wind streaks moving at the wind speed
        const hubX = safeRight * 0.24;
        const hubY = stageTop + (gBottom - stageTop) * 0.45;
        const maxR = Math.max(20, Math.min(hubY - stageTop - 6, safeRight * 0.2));
        const radius = maxR * (0.3 + 0.7 * (blade / 50));
        ctx.strokeStyle = 'rgba(56,189,248,0.6)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            const y = hubY - radius + ((i + 0.5) / 5) * 2 * radius;
            const x = 20 + ((t * speed * 14 + i * 37) % Math.max(1, safeRight * 0.4));
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 18, y);
            ctx.stroke();
        }
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(hubX, hubY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(hubX - 3, hubY, 6, gBottom - hubY);
        const turn = t * speed * 0.6;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        for (let b = 0; b < 3; b++) {
            const angle = turn + (b * 2 * Math.PI) / 3;
            ctx.beginPath();
            ctx.moveTo(hubX, hubY);
            ctx.lineTo(hubX + radius * Math.cos(angle), hubY + radius * Math.sin(angle));
            ctx.stroke();
        }
        ctx.lineCap = 'butt';
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(hubX, hubY, 5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, `A = π x ${blade}² = ${Math.round(area).toLocaleString()} m²`, hubX, stageBottom - 50,
            'bold 12px monospace', '#334155', 'center', safeRight * 0.44);

        // Right: power in the wind against wind speed, for this blade length
        const x0 = safeRight * 0.52;
        const x1 = safeRight - 24;
        const xs = (s: number): number => x0 + (s / MAX_SPEED) * (x1 - x0);
        const yp = (watts: number): number => gBottom - (watts / most) * (gBottom - gTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x0, gTop);
        ctx.lineTo(x0, gBottom);
        ctx.lineTo(x1, gBottom);
        ctx.stroke();
        ctx.strokeStyle = '#a5b4fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
            const s = (MAX_SPEED * i) / 60;
            if (i === 0) ctx.moveTo(xs(s), yp(windPower(area, s)));
            else ctx.lineTo(xs(s), yp(windPower(area, s)));
        }
        ctx.stroke();
        ctx.fillStyle = LINE;
        ctx.beginPath();
        ctx.arc(xs(speed), yp(power), 5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'power in the wind', x0, stageTop + 10, '11px monospace', '#475569', 'left', x1 - x0);
        outlineText(ctx, `wind speed, 0 to ${MAX_SPEED} m/s`, (x0 + x1) / 2, gBottom + 14, '11px monospace', '#475569', 'center', x1 - x0);

        outlineText(ctx, `power in the wind = ½ x 1.2 x ${Math.round(area).toLocaleString()} m² x ${speed}³ = ${powerText(power)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `the most a turbine could capture, 59%: ${powerText(power * CAPTURE)}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', LINE, 'center', safeRight - 30);

        fitText(ctx, `${powerText(power)} in the wind at ${speed} m/s`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Double the wind speed, eight times the power', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, power / most)),
                caption: 'Power in the Wind',
                low: '0 W',
                high: powerText(most),
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `Blades ${blade} m long sweep ${Math.round(area).toLocaleString()} m². At ${speed} m/s the wind carries ${powerText(power)}, and a turbine could capture at most ${powerText(power * CAPTURE)}.`,
        };
    };

    return (
        <LabCanvas
            title="Why Wind Speed Matters So Much"
            readout={({ raw }) => `Wind at ${speedOf(raw)} m/s, relative to the ground`}
            controlLabel="Wind Speed"
            controlKey="windSpeed"
            controlMin={0}
            controlMax={MAX_SPEED}
            controlInitial={4}
            controlDisplay={raw => `${speedOf(raw)} m/s`}
            control2={{
                label: 'Blade Length',
                key: 'bladeLength',
                min: 1,
                max: 50,
                initial: 1.8,
                display: raw => `${bladeOf(raw)} m`,
            }}
            accent="indigo"
            sky={['#e0f2fe', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Wind Speed Matters So Much"
            completeNote="Average the power, not the speed!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
