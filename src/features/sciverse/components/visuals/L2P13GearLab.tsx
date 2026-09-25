import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const INPUT_TURNS = 60;
const INPUT_TORQUE = 5;
const DRIVER = '#4f46e5';
const DRIVEN = '#047857';

const driverOf = (dial: number): number => Math.max(10, Math.min(40, Math.round(dial)));
const drivenOf = (dial: number): number => Math.max(10, Math.min(60, Math.round(dial)));

const drawGear = (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, teeth: number, angle: number, colour: string) => {
    const toothH = radius * 0.2;
    const toothW = ((2 * Math.PI) / teeth) * 0.45;
    ctx.fillStyle = colour;
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
        const a = angle + (i / teeth) * Math.PI * 2;
        ctx.lineTo(cx + Math.cos(a - toothW / 2) * radius, cy + Math.sin(a - toothW / 2) * radius);
        ctx.lineTo(cx + Math.cos(a - toothW / 4) * (radius + toothH), cy + Math.sin(a - toothW / 4) * (radius + toothH));
        ctx.lineTo(cx + Math.cos(a + toothW / 4) * (radius + toothH), cy + Math.sin(a + toothW / 4) * (radius + toothH));
        ctx.lineTo(cx + Math.cos(a + toothW / 2) * radius, cy + Math.sin(a + toothW / 2) * radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius * 0.75, cy + Math.sin(angle) * radius * 0.75);
    ctx.stroke();
};

export const L2P13GearLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const driverTeeth = driverOf(raw);
        const drivenTeeth = drivenOf(raw2);
        const ratio = drivenTeeth / driverTeeth;
        const turnsOut = INPUT_TURNS / ratio;
        const torqueOut = INPUT_TORQUE * ratio;

        // Both gears drawn with the same tooth size, so the bigger count really is bigger
        const perTooth = Math.min(2.1, (stageBottom - 80 - stageTop) / (drivenTeeth + driverTeeth));
        const r1 = Math.max(18, driverTeeth * perTooth);
        const r2 = Math.max(18, drivenTeeth * perTooth);
        const cy = stageTop + (stageBottom - 76 - stageTop) * 0.5;
        const cx1 = safeRight * 0.33 - r1;
        const cx2 = cx1 + r1 + r2 + 4;
        drawGear(ctx, cx1, cy, r1, driverTeeth, t * 1.2, DRIVER);
        drawGear(ctx, cx2, cy, r2, drivenTeeth, -t * 1.2 / ratio + Math.PI / drivenTeeth, DRIVEN);
        outlineText(ctx, `driver ${driverTeeth} teeth`, cx1, cy + r1 + 20, 'bold 11px monospace', DRIVER, 'center', r1 * 2 + 40);
        outlineText(ctx, `driven ${drivenTeeth} teeth`, cx2, cy + r2 + 20, 'bold 11px monospace', DRIVEN, 'center', r2 * 2 + 40);

        const px = safeRight * 0.66;
        const pw = safeRight - 16 - px;
        outlineText(ctx, `gear ratio ${drivenTeeth} / ${driverTeeth} = ${ratio.toFixed(2)}`, px, stageTop + 18, 'bold 12px monospace', '#0f172a', 'left', pw);
        outlineText(ctx, `driver: ${INPUT_TURNS} turns a minute`, px, stageTop + 44, '12px monospace', DRIVER, 'left', pw);
        outlineText(ctx, `torque ${INPUT_TORQUE} N m`, px, stageTop + 62, '12px monospace', DRIVER, 'left', pw);
        outlineText(ctx, `driven: ${turnsOut.toFixed(1)} turns a minute`, px, stageTop + 88, 'bold 12px monospace', DRIVEN, 'left', pw);
        outlineText(ctx, `torque ${torqueOut.toFixed(1)} N m`, px, stageTop + 106, 'bold 12px monospace', DRIVEN, 'left', pw);

        outlineText(ctx, `turns ${INPUT_TURNS} / ${ratio.toFixed(2)} = ${turnsOut.toFixed(1)}, torque ${INPUT_TORQUE} x ${ratio.toFixed(2)} = ${torqueOut.toFixed(1)} N m`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `torque x turns: ${INPUT_TORQUE} x ${INPUT_TURNS} = ${INPUT_TORQUE * INPUT_TURNS}, and ${torqueOut.toFixed(1)} x ${turnsOut.toFixed(1)} = ${(torqueOut * turnsOut).toFixed(0)}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#b45309', 'center', safeRight - 30);

        fitText(ctx, `${turnsOut.toFixed(1)} turns a minute, ${torqueOut.toFixed(1)} N m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Torque times turns stays the same', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, ratio / 6)),
                caption: 'Gear Ratio',
                low: '0',
                high: '6',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `${driverTeeth} teeth driving ${drivenTeeth} is a gear ratio of ${ratio.toFixed(2)}: ${turnsOut.toFixed(1)} turns a minute at ${torqueOut.toFixed(1)} N m, and torque x turns stays at ${(torqueOut * turnsOut).toFixed(0)}.`,
        };
    };

    return (
        <LabCanvas
            title="Gears and Pulleys: The Same Bargain"
            readout={({ raw }) => `A driver with ${driverOf(raw)} teeth`}
            controlLabel="Driver Teeth"
            controlKey="driverTeeth"
            controlMin={10}
            controlMax={40}
            controlInitial={20}
            controlDisplay={raw => `${driverOf(raw)} teeth`}
            control2={{
                label: 'Driven Teeth',
                key: 'drivenTeeth',
                min: 10,
                max: 60,
                initial: 60,
                display: raw => `${drivenOf(raw)} teeth`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Gears and Pulleys: The Same Bargain"
            completeNote="Torque x turns never moves!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
