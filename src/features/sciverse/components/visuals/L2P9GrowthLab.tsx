import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const GAIN = '#15803d';
const LOSS = '#b91c1c';
const MAX_CM = 70;

const cmOf = (dial: number, most: number): number => Math.max(1, Math.min(most, Math.round(dial)));
const signed = (value: number, digits: number): string => `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(digits)}`;

export const L2P9GrowthLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = cmOf(raw, 60);
        const end = cmOf(raw2, MAX_CM);
        const change = end - start;
        const pct = (change / start) * 100;
        const colour = change > 0 ? GAIN : change < 0 ? LOSS : '#475569';
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // Two stems drawn to the same scale: start of the week and end of the week
        const ground = stageTop + 118 * sy;
        const topLimit = stageTop + 16;
        const hOf = (cm: number): number => (cm / MAX_CM) * (ground - topLimit);
        const x1 = safeRight * 0.14;
        const x2 = safeRight * 0.34;
        ctx.fillStyle = '#a16207';
        ctx.fillRect(30, ground, safeRight * 0.44, 4);
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(x1 - 5, ground - hOf(start), 10, hOf(start));
        ctx.fillRect(x2 - 5, ground - hOf(Math.min(start, end)), 10, hOf(Math.min(start, end)));
        if (change !== 0) {
            ctx.fillStyle = change > 0 ? 'rgba(21,128,61,0.35)' : 'rgba(185,28,28,0.35)';
            ctx.strokeStyle = colour;
            ctx.lineWidth = 2;
            const yTop = ground - hOf(Math.max(start, end));
            const hPart = hOf(Math.abs(change));
            ctx.fillRect(x2 - 5, yTop, 10, hPart);
            ctx.strokeRect(x2 - 5, yTop, 10, hPart);
        }
        outlineText(ctx, `start ${start} cm`, x1, ground + 18, 'bold 11px monospace', '#334155', 'center', safeRight * 0.19);
        outlineText(ctx, `end ${end} cm`, x2, ground + 18, 'bold 11px monospace', '#334155', 'center', safeRight * 0.19);

        // The two measures side by side
        const px = safeRight * 0.52;
        const pw = safeRight - 24 - px;
        const bar = (label: string, fraction: number, y: number) => {
            outlineText(ctx, label, px, y, 'bold 12px monospace', colour, 'left', pw);
            const mid = px + pw / 3;
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, y + 6, pw, 12);
            ctx.beginPath();
            ctx.moveTo(mid, y + 3);
            ctx.lineTo(mid, y + 21);
            ctx.stroke();
            const shown = Math.max(-1 / 3, Math.min(2 / 3, fraction));
            const len = shown * pw;
            ctx.fillStyle = colour;
            ctx.fillRect(len >= 0 ? mid : mid + len, y + 6, Math.abs(len), 12);
            if (shown !== fraction) {
                // Off the end of its scale: an arrowhead says the bar keeps going
                const tip = mid + len + (len > 0 ? 9 : -9);
                ctx.beginPath();
                ctx.moveTo(tip, y + 12);
                ctx.lineTo(mid + len, y + 4);
                ctx.lineTo(mid + len, y + 20);
                ctx.closePath();
                ctx.fill();
            }
        };
        bar(`change ${signed(change, 0)} cm`, change / 104, stageTop + 24);
        bar(`percentage change ${signed(pct, 0)}%${Math.abs(pct - 100) < 0.5 ? ', it doubled' : ''}`, pct / 300, stageTop + 70);

        outlineText(ctx, `change = ${end} − ${start} = ${signed(change, 0)} cm`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `percentage change = ${signed(change, 0)} / ${start} x 100% = ${signed(pct, 1)}%`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', colour, 'center', safeRight - 30);

        fitText(ctx, `${signed(change, 0)} cm, ${signed(pct, 0)}%`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Divide the change by the starting value', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                // Grey sits at 0%: shrinking fills the red half, growing the green half
                fraction: pct < 0 ? 0.5 * (1 + pct / 100) : 0.5 + 0.5 * Math.min(1, pct / 300),
                caption: 'Percentage Change',
                low: '−100%',
                high: '+300%',
                stops: ['#fca5a5', '#e2e8f0', '#86efac'] as [string, string, string],
            },
            note: `From ${start} cm to ${end} cm: a change of ${signed(change, 0)} cm, which is ${signed(pct, 1)}% of the starting height.`,
        };
    };

    return (
        <LabCanvas
            title="Two Ways to Measure Growth"
            readout={({ raw }) => `Start of the week ${cmOf(raw, 60)} cm`}
            controlLabel="Starting Height"
            controlKey="startingHeight"
            controlMin={1}
            controlMax={60}
            controlInitial={5}
            controlDisplay={raw => `${cmOf(raw, 60)} cm`}
            control2={{
                label: 'Ending Height',
                key: 'endingHeight',
                min: 1,
                max: MAX_CM,
                initial: 12,
                display: raw => `${cmOf(raw, MAX_CM)} cm`,
            }}
            accent="indigo"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Two Ways to Measure Growth"
            completeNote="Change over start, times 100%!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
