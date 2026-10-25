import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: Dolbear's straight line is a CHORD through two points of a doubling curve,
// so it is right at those two points, high between them and low outside. Here the shape
// genuinely is the subject, so a chart is the right picture -- but the old one plotted a
// Q10 curve against a TANGENT and labelled neither axis, which is three unexplained
// things at once. This labels both curves where they separate, marks the two anchors the
// line was pinned at, and draws the gap at the dialled temperature as a bar.
//
// Every count printed is a whole number of chirps and the average is computed FROM the
// printed ends, so the arithmetic on screen is the arithmetic of the numbers on screen.
const MAX_T = 40;
const MAX_C = 192;             // chirps in 25 s at 40 C, by doubling from 48 at 20 C
const C20 = 48;
const CENTRE = 20;
const SILENT = 13;             // C: below this a snowy tree cricket makes no sound
const TRUTH = '#be123c';
const LINE = '#334155';
const PIN = '#047857';
const HIGH = '#b45309';

const tempOf = (dial: number): number => Math.max(0, Math.min(MAX_T, Math.round(dial)));
const spanOf = (dial: number): number => Math.max(4, Math.min(30, Math.round(dial)));

const truthAt = (temp: number): number => C20 * Math.pow(2, (temp - CENTRE) / 10);

export const L3B26FitLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const temp = tempOf(raw);
        const span = spanOf(raw2);
        const t1 = CENTRE - span / 2;
        const t2 = CENTRE + span / 2;
        // Every printed number is derived from the printed number before it, so the
        // footer's average really is the average of the two counts beside it and the
        // percentage really is that average against 48. Rounding the ends to whole
        // chirps instead made a 5 °C span read 1.0% where it is 1.5%, which would break
        // the lesson's point that halving the span quarters the error: 25, 6.0, 1.5.
        const cnt = (n: number) => n >= 100 || Math.abs(n - Math.round(n)) < 0.05
            ? n.toFixed(0) : n.toFixed(1);
        const sA = cnt(truthAt(t1));
        const sB = cnt(truthAt(t2));
        const endA = Number(sA);
        const endB = Number(sB);
        const sAvg = cnt((endA + endB) / 2);
        const avg = Number(sAvg);
        const slope = (endB - endA) / span;
        const lineAt = (c: number) => endA + slope * (c - t1);
        const midErr = avg / C20 - 1;

        const silent = temp < SILENT;
        const myLine = lineAt(temp);
        const myTruth = truthAt(temp);
        const negative = myLine <= 0;
        const atPin = Math.abs(temp - t1) < 0.5 || Math.abs(temp - t2) < 0.5;
        const myErr = myLine / myTruth - 1;
        const pct = (f: number) => Math.abs(f * 100) < 10
            ? Math.abs(f * 100).toFixed(1) : Math.abs(Math.round(f * 100)).toFixed(0);
        const show = (deg: number) => (Math.abs(deg - Math.round(deg)) < 0.05
            ? deg.toFixed(0) : deg.toFixed(1));

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const LBL = 15;
        // floored below any stage height that renders and capped by what the one label
        // row below the plot leaves, so the plot cannot outgrow its band
        const showPins = usable >= 46;
        const plotH = Math.max(12, usable - (showPins ? LBL : 0) - 4);
        const plotTop = artTop + Math.max(0, (usable - (plotH + (showPins ? LBL : 0) + 4)) / 2);
        const plotBottom = plotTop + plotH;
        const pinRow = plotBottom + 16;

        const left = 30;
        const plotW = Math.max(70, safeRight - 56);
        const xOf = (c: number) => left + plotW * (c / MAX_T);
        const yOf = (n: number) => plotBottom - plotH * Math.max(0, Math.min(1, n / MAX_C));

        // the stretch where the cricket makes no sound, so no rule of any kind applies
        ctx.fillStyle = 'rgba(100,116,139,0.14)';
        ctx.fillRect(left, plotTop, xOf(SILENT) - left, plotH);

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + plotW, plotBottom);
        ctx.moveTo(left, plotTop);
        ctx.lineTo(left, plotBottom);
        ctx.stroke();

        // Dolbear's straight line, stopped where it would claim a negative count
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 2;
        ctx.beginPath();
        let started = false;
        for (let c = 0; c <= MAX_T; c += 0.5) {
            const n = lineAt(c);
            if (n < 0) { started = false; continue; }
            if (!started) { ctx.moveTo(xOf(c), yOf(n)); started = true; } else ctx.lineTo(xOf(c), yOf(n));
        }
        ctx.stroke();

        // the truth: a doubling curve
        ctx.strokeStyle = TRUTH;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        for (let c = 0; c <= MAX_T; c += 0.5) {
            const p = { x: xOf(c), y: yOf(truthAt(c)) };
            if (c === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // the two points the line was pinned at, where it is exactly right
        ctx.fillStyle = PIN;
        ctx.beginPath();
        ctx.arc(xOf(t1), yOf(endA), 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(xOf(t2), yOf(endB), 3.4, 0, Math.PI * 2);
        ctx.fill();

        // the gap at the dialled temperature
        if (!silent && !negative) {
            const yA = yOf(myLine);
            const yB = yOf(myTruth);
            if (Math.abs(yA - yB) >= 2) {
                ctx.strokeStyle = myErr > 0 ? HIGH : TRUTH;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(xOf(temp), yA);
                ctx.lineTo(xOf(temp), yB);
                ctx.stroke();
            }
            ctx.fillStyle = LINE;
            ctx.beginPath();
            ctx.arc(xOf(temp), yA, 2.6, 0, Math.PI * 2);
            ctx.fill();
        }

        // Both curve labels hang off the RIGHT edge, where the two are furthest apart:
        // the curve finishes at the top of the plot and the line well below it, so they
        // cannot converge however the dials move.
        if (plotH >= 70) {
            outlineText(ctx, 'truth: doubles every 10 °C', left + plotW - 2, plotTop + 11,
                'bold 10px monospace', TRUTH, 'right', plotW - 6);
            outlineText(ctx, "Dolbear's line", left + plotW - 2, yOf(lineAt(MAX_T)) + 13,
                'bold 10px monospace', LINE, 'right', plotW - 6);
        }
        if (showPins) {
            outlineText(ctx, 'fitted at ' + show(t1) + ' and ' + show(t2) + ' °C',
                safeRight / 2, pinRow, 'bold 11px monospace', PIN, 'center', safeRight - 24);
        }

        outlineText(ctx, 'ends ' + sA + ', ' + sB + ', average ' + sAvg,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'middle truth 48: ' + pct(midErr) + '% high',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', HIGH, 'center', safeRight - 30);

        fitText(ctx, silent ? 'silent below 13 °C'
            : negative ? 'the line goes negative'
                : atPin ? 'the line is right here'
                    : pct(myErr) + '% ' + (myErr > 0 ? 'high' : 'low') + ' at ' + temp + ' °C',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Chirps in 25 s, 0 to 40 °C', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, midErr / 0.6)),
                caption: 'How Far Out in the Middle',
                low: 'a line will do',
                high: 'far too wide a span',
                stops: [PIN, '#fcd34d', HIGH] as [string, string, string],
            },
            note: 'Fitted at ' + show(t1) + ' and ' + show(t2) + ' °C, the line passes through the average of '
                + sA + ' and ' + sB + ', which is ' + sAvg
                + '. The cricket really gives 48 at 20 °C, so the line reads '
                + pct(midErr) + '% high in the middle of its own range.',
        };
    };

    return (
        <LabCanvas
            title="Why a Straight Line Ever Worked"
            readout={({ raw }) => tempOf(raw) + ' °C'}
            controlLabel="Temperature"
            controlKey="fitTemp"
            controlMin={0}
            controlMax={MAX_T}
            controlInitial={20}
            controlDisplay={raw => tempOf(raw) + ' °C'}
            control2={{
                label: 'Span',
                key: 'fitSpan',
                min: 4,
                max: 30,
                initial: 20,
                display: raw => spanOf(raw) + ' °C apart',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="A constant hid a dependence!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
