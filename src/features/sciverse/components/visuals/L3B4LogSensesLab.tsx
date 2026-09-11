import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUPERSCRIPT: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
};

const powerOfTen = (power: number): string =>
    `10${String(power).split('').map(ch => SUPERSCRIPT[ch] ?? ch).join('')}`;

const weberOf = (dial: number): number => Math.max(2, Math.round(dial)) / 100;

export const L3B4LogSensesLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const k = weberOf(raw);
        const range = Math.max(1, Math.round(raw2));
        const logStep = Math.log10(1 + k);
        const steps = range / logStep;
        const perTen = 1 / logStep;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        const axisX = 50;
        const axisW = safeRight - 100;
        const stairTop = stageTop + 26 * sy;
        const stairH = 64 * sy;
        const base = stairTop + stairH;
        const decadeW = axisW / range;

        // The last ten-fold increase, shaded
        ctx.fillStyle = 'rgba(225,29,72,0.10)';
        ctx.fillRect(axisX + axisW - decadeW, stairTop, decadeW, stairH);

        // One just noticeable step at a time, on a scale where every ten-fold increase takes the same space
        if (steps <= 160) {
            const whole = Math.floor(steps);
            const stepW = axisW / steps;
            ctx.strokeStyle = '#e11d48';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(axisX, base);
            for (let i = 1; i <= whole; i++) {
                const sx = axisX + i * stepW;
                ctx.lineTo(sx, base - ((i - 1) / steps) * stairH);
                ctx.lineTo(sx, base - (i / steps) * stairH);
            }
            ctx.lineTo(axisX + axisW, base - (whole / steps) * stairH);
            ctx.stroke();
        } else {
            ctx.fillStyle = 'rgba(225,29,72,0.35)';
            ctx.beginPath();
            ctx.moveTo(axisX, base);
            ctx.lineTo(axisX + axisW, base);
            ctx.lineTo(axisX + axisW, stairTop);
            ctx.closePath();
            ctx.fill();
            outlineText(ctx, 'too close together to draw, so shaded', axisX, stairTop + 22,
                '11px monospace', '#9f1239', 'left', axisW * 0.5);
        }

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(axisX, base);
        ctx.lineTo(axisX + axisW, base);
        ctx.stroke();
        ctx.lineWidth = 1.5;
        for (let p = 0; p <= range; p++) {
            const tx = axisX + p * decadeW;
            ctx.beginPath();
            ctx.moveTo(tx, base - 4);
            ctx.lineTo(tx, base + 4);
            ctx.stroke();
        }

        outlineText(ctx, `${Math.round(steps).toLocaleString()} steps`, axisX, stairTop + 4,
            'bold 13px monospace', '#9f1239', 'left', axisW * 0.5);
        outlineText(ctx, 'faintest', axisX, base + 17, 'bold 11px monospace', '#334155', 'left', axisW * 0.4);
        outlineText(ctx, 'strongest', axisX + axisW, base + 17, 'bold 11px monospace', '#334155', 'right', axisW * 0.4);
        outlineText(ctx, 'shaded: the last ten-fold increase', safeRight / 2, base + 17 + 20 * sy,
            'bold 11px monospace', '#475569', 'center', safeRight - 40);

        outlineText(ctx, `n = log ${powerOfTen(range)} / log ${(1 + k).toFixed(2)} = ${range} / ${logStep.toFixed(4)} = ${Math.round(steps).toLocaleString()}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `every ten-fold increase adds the same ${Math.round(perTen)} steps`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${Math.round(steps).toLocaleString()} noticeable steps across a range of ${powerOfTen(range)}`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Equal ratios make equal steps', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.min(1, steps / 600),
                caption: 'Noticeable Steps',
                low: 'Few',
                high: 'Many',
                stops: ['#ffe4e6', '#fb7185', '#9f1239'] as [string, string, string],
            },
            note: `With k = ${k.toFixed(2)}, a range of ${powerOfTen(range)} holds about ${Math.round(steps).toLocaleString()} just noticeable steps -- ${Math.round(perTen)} in every ten-fold increase.`,
        };
    };

    return (
        <LabCanvas
            title="Senses That Count in Powers of Ten"
            readout={({ raw }) => `Weber fraction k = ${weberOf(raw).toFixed(2)}`}
            controlLabel="Weber Fraction"
            controlKey="weberFraction"
            controlMin={2}
            controlMax={30}
            controlInitial={10}
            controlDisplay={raw => `k = ${weberOf(raw).toFixed(2)}`}
            control2={{
                label: 'Intensity Range',
                key: 'intensityRange',
                min: 1,
                max: 14,
                initial: 12,
                display: raw => `${powerOfTen(Math.max(1, Math.round(raw)))} times`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Senses That Count in Powers of Ten"
            completeNote="Equal ratios, equal steps!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
