import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const HEAT_IN = 1000;

export const L3P3HeatEngineLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const hot = Math.max(250, Math.round(raw));
        const cold = Math.max(150, Math.round(raw2));
        const ceiling = hot > cold ? 1 - cold / hot : 0;
        const work = HEAT_IN * ceiling;
        const dumped = HEAT_IN - work;

        const cx = safeRight / 2;
        const boxW = Math.min(280, safeRight - 80);
        const boxH = 40;
        const hotY = stageTop + 30;
        const coldY = stageBottom - 92;
        const engineR = 34;
        const engineY = (hotY + boxH + coldY) / 2;

        const scaleW = (joules: number): number => Math.max(3, (joules / HEAT_IN) * 30);
        const arrow = (x1: number, y1: number, x2: number, y2: number, width: number, colour: string): void => {
            const ang = Math.atan2(y2 - y1, x2 - x1);
            const head = Math.max(10, width * 0.9);
            const baseX = x2 - Math.cos(ang) * head;
            const baseY = y2 - Math.sin(ang) * head;
            const spread = width / 2 + 6;
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(baseX, baseY);
            ctx.stroke();
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(baseX + Math.cos(ang + Math.PI / 2) * spread, baseY + Math.sin(ang + Math.PI / 2) * spread);
            ctx.lineTo(baseX + Math.cos(ang - Math.PI / 2) * spread, baseY + Math.sin(ang - Math.PI / 2) * spread);
            ctx.closePath();
            ctx.fill();
        };

        // The two reservoirs
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(cx - boxW / 2, hotY, boxW, boxH);
        ctx.strokeStyle = '#c2410c';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - boxW / 2, hotY, boxW, boxH);
        outlineText(ctx, `hot side ${hot} K`, cx, hotY + 26, 'bold 14px monospace', '#7c2d12', 'center', boxW - 12);

        ctx.fillStyle = '#bfdbfe';
        ctx.fillRect(cx - boxW / 2, coldY, boxW, boxH);
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - boxW / 2, coldY, boxW, boxH);
        outlineText(ctx, `cold side ${cold} K`, cx, coldY + 26, 'bold 14px monospace', '#1e3a8a', 'center', boxW - 12);

        // Heat in from the top, heat dumped to the bottom, work out to the side
        arrow(cx, hotY + boxH, cx, engineY - engineR, scaleW(HEAT_IN), '#ea580c');
        if (dumped >= 1) arrow(cx, engineY + engineR, cx, coldY, scaleW(dumped), '#64748b');
        const workLen = Math.max(40, Math.min(130, safeRight / 2 - engineR - 100));
        if (work >= 1) arrow(cx + engineR, engineY, cx + engineR + workLen, engineY, scaleW(work), '#4f46e5');

        ctx.fillStyle = '#e0e7ff';
        ctx.beginPath();
        ctx.arc(cx, engineY, engineR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        outlineText(ctx, 'engine', cx, engineY + 5, 'bold 13px monospace', '#312e81', 'center', engineR * 2 - 6);

        const inMid = (hotY + boxH + engineY - engineR) / 2;
        const outMid = (engineY + engineR + coldY) / 2;
        outlineText(ctx, `${HEAT_IN.toLocaleString()} J of heat in`, cx - 22, inMid + 4,
            'bold 12px monospace', '#9a3412', 'right', Math.max(40, cx - 40));
        outlineText(ctx, `${Math.round(dumped)} J dumped`, cx - 22, outMid + 4,
            'bold 12px monospace', '#334155', 'right', Math.max(40, cx - 40));
        const workX = cx + engineR + workLen + 10;
        outlineText(ctx, `${Math.round(work)} J of work`, workX, engineY + 5,
            'bold 12px monospace', '#3730a3', 'left', Math.max(40, safeRight - workX - 6));

        outlineText(ctx, `ceiling = 1 − ${cold}/${hot} = ${(ceiling * 100).toFixed(1)}%`,
            cx, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, hot > cold ? 'no engineering can beat this' : 'no temperature difference, so no work at all',
            cx, stageBottom - 14, 'bold 12px monospace', hot > cold ? '#475569' : '#b91c1c', 'center', safeRight - 30);

        fitText(ctx, `At most ${(ceiling * 100).toFixed(1)}% of the heat can become work`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Both temperatures in kelvin, or the formula is meaningless',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, ceiling)),
                caption: 'Ceiling on Efficiency',
                low: 'No work at all',
                high: 'All of it',
            },
            note: `From 1,000 J of heat at ${hot} K, at most ${Math.round(work)} J can become work; the other ${Math.round(dumped)} J must be dumped to the cold side.`,
        };
    };

    return (
        <LabCanvas
            title="The Ceiling on Every Heat Engine"
            readout={({ raw }) => `The hot side is at ${Math.max(250, Math.round(raw))} K`}
            controlLabel="Hot Side"
            controlKey="hotSide"
            controlMin={300}
            controlMax={1500}
            controlInitial={840}
            controlDisplay={raw => `${Math.max(250, Math.round(raw))} K`}
            control2={{
                label: 'Cold Side',
                key: 'coldSide',
                min: 200,
                max: 600,
                initial: 300,
                display: raw => `${Math.max(150, Math.round(raw))} K`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Ceiling on Every Heat Engine"
            completeNote="1 − Tc/Th, and always in kelvin!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
