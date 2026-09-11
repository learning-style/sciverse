import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const ROCK_N = 600;
const LIFT_M = 0.1;

const armOf = (dial: number, least: number): number => Math.max(least, Math.round(dial)) / 100;
const forceText = (newtons: number): string => (newtons < 100 ? newtons.toFixed(1) : newtons.toFixed(0));

export const L2P5LeverLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const effortArm = armOf(raw, 20);
        const loadArm = armOf(raw2, 10);
        const advantage = effortArm / loadArm;
        const push = ROCK_N / advantage;
        const handsMove = LIFT_M * advantage;
        const workIn = push * handsMove;
        const workOut = ROCK_N * LIFT_M;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // The bar, drawn to scale, tipping as the rock rises
        const leftX = 60;
        const rightX = safeRight - 60;
        const perMetre = (rightX - leftX) / (effortArm + loadArm);
        const pivotX = leftX + loadArm * perMetre;
        const beamY = stageTop + 58 * sy;
        const loadPx = loadArm * perMetre;
        const effortPx = effortArm * perMetre;
        const swing = 0.5 - 0.5 * Math.cos(t * 1.5);
        const tilt = Math.min(10 / loadPx, 20 / effortPx) * swing;
        const loadEndX = pivotX - loadPx * Math.cos(tilt);
        const loadEndY = beamY - loadPx * Math.sin(tilt);
        const effortEndX = pivotX + effortPx * Math.cos(tilt);
        const effortEndY = beamY + effortPx * Math.sin(tilt);

        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.moveTo(pivotX, beamY + 4);
        ctx.lineTo(pivotX - 14, beamY + 26);
        ctx.lineTo(pivotX + 14, beamY + 26);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(loadEndX, loadEndY);
        ctx.lineTo(effortEndX, effortEndY);
        ctx.stroke();
        ctx.lineCap = 'butt';

        const rockW = 34;
        const rockH = 20;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(loadEndX - 4, loadEndY - 4 - rockH, rockW, rockH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(loadEndX - 4, loadEndY - 4 - rockH, rockW, rockH);

        // The push, thicker for a bigger force
        const arrowTop = stageTop + 22;
        const arrowTip = effortEndY - 8;
        ctx.strokeStyle = '#4f46e5';
        ctx.fillStyle = '#4f46e5';
        ctx.lineWidth = 2 + 4 * Math.min(1, push / ROCK_N);
        ctx.beginPath();
        ctx.moveTo(effortEndX, arrowTop);
        ctx.lineTo(effortEndX, arrowTip - 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(effortEndX, arrowTip);
        ctx.lineTo(effortEndX - 7, arrowTip - 10);
        ctx.lineTo(effortEndX + 7, arrowTip - 10);
        ctx.closePath();
        ctx.fill();

        outlineText(ctx, `rock ${ROCK_N} N`, leftX - 4, stageTop + 14, 'bold 12px monospace', '#334155', 'left', safeRight * 0.42);
        outlineText(ctx, `push ${forceText(push)} N`, rightX + 7, stageTop + 14, 'bold 12px monospace', '#3730a3', 'right', safeRight * 0.42);

        // Work in and work out, side by side on the same 100 J scale
        const barLabelY = beamY + 44 * sy;
        const gapX = 20;
        const barW = (rightX - leftX - gapX) / 2;
        const bars: [string, number, number][] = [['work in', workIn, leftX], ['work out', workOut, leftX + barW + gapX]];
        bars.forEach(([label, joules, bx]) => {
            outlineText(ctx, `${label} ${joules.toFixed(0)} J`, bx, barLabelY, 'bold 12px monospace', '#0f172a', 'left', barW);
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(bx, barLabelY + 6, barW * Math.min(1, joules / 100), 14);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bx, barLabelY + 6, barW, 14);
        });

        outlineText(ctx, `work in: ${forceText(push)} N x ${handsMove.toFixed(2)} m = ${workIn.toFixed(0)} J`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `work out: ${ROCK_N} N x ${LIFT_M.toFixed(2)} m = ${workOut.toFixed(0)} J`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Push ${forceText(push)} N -- your hands move ${handsMove.toFixed(2)} m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, `mechanical advantage = ${effortArm.toFixed(2)} / ${loadArm.toFixed(2)} = ${advantage.toFixed(1)}`,
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (Math.log10(advantage) - Math.log10(0.2)) / 2)),
                caption: 'Mechanical Advantage',
                low: '0.2',
                high: '20',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `Mechanical advantage ${advantage.toFixed(1)}: push ${forceText(push)} N through ${handsMove.toFixed(2)} m to lift the ${ROCK_N} N rock by ${LIFT_M.toFixed(2)} m. Work in ${workIn.toFixed(0)} J, work out ${workOut.toFixed(0)} J.`,
        };
    };

    return (
        <LabCanvas
            title="The Lever's Bargain"
            readout={({ raw }) => `Effort arm ${armOf(raw, 20).toFixed(2)} m`}
            controlLabel="Effort Arm"
            controlKey="effortArm"
            controlMin={20}
            controlMax={200}
            controlInitial={150}
            controlDisplay={raw => `${armOf(raw, 20).toFixed(2)} m`}
            control2={{
                label: 'Load Arm',
                key: 'loadArm',
                min: 10,
                max: 100,
                initial: 30,
                display: raw => `${armOf(raw, 10).toFixed(2)} m`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Lever's Bargain"
            completeNote="Less force, more distance -- work in = work out!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
