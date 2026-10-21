import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the line touches the curve at 20 °C and falls away BOTH sides, so the
// error is biased rather than scattered. Drawing the two together makes that
// visible, and the shaded band is where the line is within 8% -- a window the
// learner can watch narrow as the curvature dial rises. The line is clipped at zero,
// because at a high Q10 it predicts a negative chirp rate inside the plot, which is
// the clearest possible statement that a fit has left its range.
const T_MIN = 5;
const T_MAX = 40;
const FIT_AT = 20;
const SILENT = 13;             // °C: below this a snowy tree cricket makes no sound
const TOL = 0.08;
const CURVE = '#be123c';
const LINE = '#0369a1';
const BAND = '#d1fae5';

const tempOf = (dial: number): number => Math.max(T_MIN, Math.min(T_MAX, Math.round(dial)));
const q10Of = (dial: number): number => Math.max(1.5, Math.min(3, Math.round(dial * 10) / 10));

export const L3B26FitLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const temp = tempOf(raw);
        const q10 = q10Of(raw2);
        const curveAt = (T: number) => 100 * Math.pow(q10, (T - FIT_AT) / 10);
        const slope = 100 * Math.log(q10) / 10;
        const lineAt = (T: number) => 100 + slope * (T - FIT_AT);

        const errPct = (lineAt(temp) / curveAt(temp) - 1) * 100;
        // where the line stays inside the tolerance, found by scanning
        let lo = FIT_AT;
        let hi = FIT_AT;
        for (let T = FIT_AT; T >= T_MIN; T -= 0.1) {
            if (Math.abs(lineAt(T) / curveAt(T) - 1) < TOL) lo = T; else break;
        }
        for (let T = FIT_AT; T <= T_MAX; T += 0.1) {
            if (Math.abs(lineAt(T) / curveAt(T) - 1) < TOL) hi = T; else break;
        }

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 26) / ROW)));
        const showAbove = fit >= 1;
        const showBelow = fit >= 2;
        const aboveH = showAbove ? ROW : 0;
        const belowH = showBelow ? ROW : 0;
        const plotH = Math.max(10, usable - aboveH - belowH);
        const top = artTop + Math.max(0, (usable - (aboveH + plotH + belowH)) / 2);
        const aboveRow = top + 11;
        const plotTop = top + aboveH;
        const plotBottom = plotTop + plotH;
        const belowRow = plotBottom + 11;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const peak = curveAt(T_MAX);
        const xOf = (T: number) => left + fullW * (T - T_MIN) / (T_MAX - T_MIN);
        const yOf = (r: number) => plotBottom - plotH * Math.max(0, Math.min(1, r / peak));

        // the band where the line is good enough
        ctx.fillStyle = BAND;
        ctx.fillRect(xOf(lo), plotTop, Math.max(1, xOf(hi) - xOf(lo)), plotH);

        // below this the cricket is silent, whatever either curve says
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(xOf(SILENT), plotTop);
        ctx.lineTo(xOf(SILENT), plotBottom);
        ctx.stroke();
        ctx.setLineDash([]);

        const plot = (f: (T: number) => number, colour: string, width: number) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            let started = false;
            for (let px = 0; px <= fullW; px += 2) {
                const T = T_MIN + (T_MAX - T_MIN) * (px / fullW);
                const r = f(T);
                if (r < 0) { started = false; continue; }
                const py = yOf(r);
                if (started) ctx.lineTo(left + px, py);
                else { ctx.moveTo(left + px, py); started = true; }
            }
            ctx.stroke();
        };
        plot(lineAt, LINE, 1.8);
        plot(curveAt, CURVE, 2.6);

        // where you are, on both
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(xOf(temp), yOf(curveAt(temp)));
        ctx.lineTo(xOf(temp), yOf(Math.max(0, lineAt(temp))));
        ctx.stroke();
        ctx.setLineDash([]);
        [[curveAt(temp), CURVE], [Math.max(0, lineAt(temp)), LINE]].forEach(([r, col]) => {
            ctx.fillStyle = col as string;
            ctx.beginPath();
            ctx.arc(xOf(temp), yOf(r as number), 3.4, 0, Math.PI * 2);
            ctx.fill();
        });

        if (showAbove) {
            outlineText(ctx, 'real rate: x' + q10.toFixed(1) + ' per 10 °C', safeRight / 2, aboveRow,
                'bold 11px monospace', CURVE, 'center', safeRight - 24);
        }
        if (showBelow) {
            outlineText(ctx, 'the line fitted at 20 °C', safeRight / 2, belowRow,
                'bold 11px monospace', LINE, 'center', safeRight - 24);
        }

        outlineText(ctx, Math.abs(errPct) < 0.05
            ? 'exact where it was fitted'
            : 'line is ' + Math.abs(errPct).toFixed(0) + '% low at ' + temp + ' °C',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'within 8% from ' + lo.toFixed(0) + ' to ' + hi.toFixed(0) + ' °C',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', LINE, 'center', safeRight - 30);

        fitText(ctx, temp < SILENT ? 'the cricket stops'
            : Math.abs(errPct) < 0.05 ? 'exact at 20 °C' : Math.abs(errPct).toFixed(0) + '% low',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A line through a curve', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.abs(errPct) / 40)),
                caption: 'How Far the Line Is Out',
                low: 'inside the window',
                high: 'far outside it',
                stops: ['#d1fae5', '#fcd34d', CURVE] as [string, string, string],
            },
            note: temp < SILENT
                ? 'At ' + temp + ' °C the curve still gives a rate and a real cricket gives silence. That is the mechanism stopping, not the line leaving the curve.'
                : 'With a Q10 of ' + q10.toFixed(1) + ' the line fitted at 20 °C is '
                  + Math.abs(errPct).toFixed(0) + '% low at ' + temp
                  + ' °C, and stays within 8% only from ' + lo.toFixed(0) + ' to ' + hi.toFixed(0)
                  + ' °C. It is low on both sides.',
        };
    };

    return (
        <LabCanvas
            title="Why a Straight Line Ever Worked"
            readout={({ raw }) => 'Temperature ' + tempOf(raw) + ' °C'}
            controlLabel="Temperature"
            controlKey="fitTemp"
            controlMin={T_MIN}
            controlMax={T_MAX}
            controlInitial={30}
            controlDisplay={raw => tempOf(raw) + ' °C'}
            control2={{
                label: 'Q10',
                key: 'fitQ10',
                min: 1.5,
                max: 3,
                initial: 2,
                display: raw => 'x' + q10Of(raw).toFixed(1) + ' per 10 °C',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="A constant is a variable in disguise!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
