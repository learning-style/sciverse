import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: doubling looks like nothing until it looks like everything. So the
// picture is a staircase of one bar per doubling on a LINEAR scale against the 1 °C
// line -- which makes the early bars genuinely invisible and the last two enormous.
// That is not a flaw in the encoding, it is the phenomenon: the learner watches a
// flat floor cross the line in two steps. Bars past the line are drawn in the dead
// colour and clipped at the top, because beyond 1 °C the error has nothing left to
// be wrong about.
const DEAD = 1.0;              // °C: as big as the weather, so the forecast is over
const PER_DOUBLING = 1.5;      // days
const MAX_N = 20;
const INDIGO = '#4338ca';
const ALIVE = '#a5b4fc';
const GONE = '#b45309';

const startOf = (dial: number): number => Math.pow(10, -Math.max(2, Math.min(6, Math.round(dial))));
const daysOf = (dial: number): number => Math.max(0, Math.min(30, Math.round(dial / PER_DOUBLING) * PER_DOUBLING));

export const L2P25DoublingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = startOf(raw);
        const days = daysOf(raw2);
        const steps = Math.round(days / PER_DOUBLING);
        const error = start * Math.pow(2, steps);
        const dead = error >= DEAD;
        // the first doubling that finishes the forecast
        let crossN = MAX_N;
        for (let i = 0; i <= MAX_N; i++) {
            if (start * Math.pow(2, i) >= DEAD) { crossN = i; break; }
        }
        const crossDay = crossN * PER_DOUBLING;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 24) / ROW)));
        const showDay = fit >= 1;
        const showLine = fit >= 2;
        const lineH = showLine ? ROW : 0;
        const dayH = showDay ? ROW : 0;
        const plotH = Math.max(8, usable - lineH - dayH);
        const top = artTop + Math.max(0, (usable - (lineH + plotH + dayH)) / 2);
        const lineRow = top + 11;
        const plotTop = top + lineH;
        const plotBottom = plotTop + plotH;
        const dayRow = plotBottom + 11;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const slot = fullW / (MAX_N + 1);
        const barW = Math.max(2, slot * 0.72);

        // the line where the forecast dies, at the top of the plot
        ctx.strokeStyle = GONE;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(left, plotTop);
        ctx.lineTo(left + fullW, plotTop);
        ctx.stroke();
        ctx.setLineDash([]);

        // one bar per doubling so far, each twice the last
        for (let i = 0; i <= steps; i++) {
            const err = start * Math.pow(2, i);
            const frac = Math.min(1, err / DEAD);
            const h = plotH * frac;
            const x = left + slot * i + (slot - barW) / 2;
            ctx.fillStyle = err >= DEAD ? GONE : ALIVE;
            ctx.fillRect(x, plotBottom - h, barW, Math.max(1, h));
        }
        // a baseline, so the invisible early bars still sit on something visible
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + fullW, plotBottom);
        ctx.stroke();

        if (showLine) {
            outlineText(ctx, '1 °C: forecast useless', left + fullW, lineRow,
                'bold 11px monospace', GONE, 'right', fullW);
        }
        if (showDay) {
            const markX = left + slot * crossN + slot / 2;
            outlineText(ctx, 'day ' + crossDay.toFixed(1),
                Math.max(left + 24, Math.min(markX, left + fullW - 24)), dayRow,
                'bold 11px monospace', GONE, 'center', 80);
        }

        outlineText(ctx, start.toFixed(6) + ' x 2^' + steps + ' = ' + error.toFixed(2) + ' °C',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'useless after ' + crossDay.toFixed(1) + ' days',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', INDIGO, 'center', safeRight - 30);

        fitText(ctx, dead ? 'error reaches 1 °C' : 'error ' + error.toFixed(3) + ' °C',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Doubling every 1.5 days', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, error / DEAD)),
                caption: 'How Wrong the Forecast Is',
                low: 'still useful',
                high: 'as wrong as the weather',
                stops: ['#eef2ff', '#fcd34d', GONE] as [string, string, string],
            },
            note: 'A starting error of ' + start.toFixed(6) + ' °C doubles ' + steps
                + ' times in ' + days.toFixed(1) + ' days, reaching ' + error.toFixed(3)
                + ' °C. It passes 1 °C on day ' + crossDay.toFixed(1) + ', whatever you do next.',
        };
    };

    return (
        <LabCanvas
            title="How Far Ahead Can Anyone Predict?"
            readout={({ raw }) => 'Starting error ' + startOf(raw).toFixed(6) + ' °C'}
            controlLabel="Starting Error"
            controlKey="startingError"
            controlMin={2}
            controlMax={6}
            controlInitial={3}
            controlDisplay={raw => startOf(raw).toFixed(6) + ' °C'}
            control2={{
                label: 'Days Ahead',
                key: 'daysAhead',
                min: 0,
                max: 30,
                initial: 15,
                display: raw => daysOf(raw).toFixed(1) + ' days',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Can Tiny Changes Cause Big Effects?"
            completeNote="A thousand times better buys fifteen days!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
