import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Growth rate, per week. Held fixed so the lab isolates the full height. */
const RATE = 1;
const START_CM = 2;
const WEEKS = 12;
const LINE = '#4f46e5';

const fullOf = (dial: number): number => Math.max(20, Math.min(100, Math.round(dial)));
const weekOf = (dial: number): number => Math.max(2, Math.min(WEEKS, Math.round(dial)));

/** Heights at the end of weeks 1..12, stepping the logistic model a week at a time. */
const heights = (full: number): number[] => {
    const out = [START_CM];
    for (let i = 1; i < WEEKS; i++) {
        const n = out[i - 1];
        out.push(n + RATE * n * (1 - n / full));
    }
    return out;
};

const dashed = (ctx: CanvasRenderingContext2D, x0: number, x1: number, y: number) => {
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
    ctx.restore();
};

export const L3P9SCurveLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const full = fullOf(raw);
        const week = weekOf(raw2);
        const hs = heights(full);
        const start = hs[week - 2];
        const end = hs[week - 1];
        const growth = end - start;
        const peak = (RATE * full) / 4;

        const gTop = stageTop + 20;
        const gBottom = stageBottom - 64;
        const gh = gBottom - gTop;

        // Left: the S-curve of height against week
        const x0 = 44;
        const x1 = safeRight * 0.48;
        const yMax = full * 1.2;
        const xw = (w: number): number => x0 + ((w - 1) / (WEEKS - 1)) * (x1 - x0);
        const yh = (cm: number): number => gBottom - (cm / yMax) * gh;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x0, gTop);
        ctx.lineTo(x0, gBottom);
        ctx.lineTo(x1, gBottom);
        ctx.stroke();
        dashed(ctx, x0, x1, yh(full));
        dashed(ctx, x0, x1, yh(full / 2));
        // Labels at the right end: the curve rises towards K from below there, and is
        // already well above K/2, so neither label can sit on the curve
        outlineText(ctx, `K = ${full} cm`, x1, yh(full) - 4, '11px monospace', '#475569', 'right', x1 - x0);
        outlineText(ctx, `K/2 = ${full / 2} cm`, x1, yh(full / 2) + 12, '11px monospace', '#475569', 'right', x1 - x0);
        ctx.strokeStyle = '#a5b4fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        hs.forEach((cm, i) => (i === 0 ? ctx.moveTo(xw(1), yh(cm)) : ctx.lineTo(xw(i + 1), yh(cm))));
        ctx.stroke();
        hs.forEach((cm, i) => {
            ctx.fillStyle = i === week - 1 ? LINE : '#a5b4fc';
            ctx.beginPath();
            ctx.arc(xw(i + 1), yh(cm), i === week - 1 ? 4.5 : 3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(xw(week), yh(start));
        ctx.lineTo(xw(week), yh(end));
        ctx.stroke();
        outlineText(ctx, 'height, cm', x0, stageTop + 10, '11px monospace', '#475569', 'left', x1 - x0);
        outlineText(ctx, 'week 1', x0, gBottom + 14, '11px monospace', '#475569', 'left', (x1 - x0) / 2);
        outlineText(ctx, `week ${WEEKS}`, x1, gBottom + 14, '11px monospace', '#475569', 'right', (x1 - x0) / 2);

        // Right: the hump of growth per week against the height at the start of the week
        const x2 = safeRight * 0.56;
        const x3 = safeRight - 24;
        const gMax = peak * 1.25;
        const xn = (cm: number): number => x2 + (cm / full) * (x3 - x2);
        const yg = (cm: number): number => gBottom - (cm / gMax) * gh;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x2, gTop);
        ctx.lineTo(x2, gBottom);
        ctx.lineTo(x3, gBottom);
        ctx.stroke();
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xn(full / 2), yg(peak));
        ctx.lineTo(xn(full / 2), gBottom);
        ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = '#a5b4fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
            const n = (full * i) / 40;
            const y = yg(RATE * n * (1 - n / full));
            if (i === 0) ctx.moveTo(xn(n), y);
            else ctx.lineTo(xn(n), y);
        }
        ctx.stroke();
        ctx.fillStyle = LINE;
        ctx.beginPath();
        ctx.arc(xn(start), yg(growth), 5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'growth per week, cm', x2, stageTop + 10, '11px monospace', '#475569', 'left', x3 - x2);
        outlineText(ctx, `height at the start of the week, 0 to ${full} cm`, (x2 + x3) / 2, gBottom + 14,
            '11px monospace', '#475569', 'center', x3 - x2);

        outlineText(ctx, `week ${week}: growth = 1 x ${start.toFixed(1)} x (1 − ${start.toFixed(1)}/${full}) = ${growth.toFixed(1)} cm`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `the most any week can add: r x K / 4 = ${peak.toFixed(1)} cm, at K/2 = ${full / 2} cm`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', LINE, 'center', safeRight - 30);

        fitText(ctx, `Week ${week}: ${start.toFixed(1)} cm to ${end.toFixed(1)} cm, growing ${growth.toFixed(1)} cm`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Growth is fastest at half the full height', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, growth / peak)),
                caption: 'Growth This Week',
                low: '0 cm',
                high: `${peak.toFixed(1)} cm`,
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `In week ${week} the plant grows from ${start.toFixed(1)} cm to ${end.toFixed(1)} cm. No week can add more than ${peak.toFixed(1)} cm, the growth at ${full / 2} cm.`,
        };
    };

    return (
        <LabCanvas
            title="Why Growth Slows Down"
            readout={({ raw }) => `Full height K = ${fullOf(raw)} cm, r = 1 per week`}
            controlLabel="Full Height"
            controlKey="fullHeight"
            controlMin={20}
            controlMax={100}
            controlInitial={64}
            controlDisplay={raw => `${fullOf(raw)} cm`}
            control2={{
                label: 'Week',
                key: 'week',
                min: 2,
                max: WEEKS,
                initial: 4,
                display: raw => `week ${weekOf(raw)}`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Growth Slows Down"
            completeNote="Fastest at half the full height!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
