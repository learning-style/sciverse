import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: two ponds a millionth apart, one rule, and whether they stay together
// is decided by one number. So the picture is the two runs drawn on the same axes.
// Below r = 3 they are indistinguishable -- the learner sees ONE line, which is the
// result. Past it they split into levels, and past 3.57 they come apart entirely.
// The headline names the pattern in words, because a visual-only learner should not
// have to count levels to find out that there is no pattern left.
const GAP = 0.000001;          // a millionth of the pond's capacity
const POND_A = '#4338ca';
const POND_B = '#b45309';

const rateOf = (dial: number): number => Math.max(2, Math.min(4, Math.round(dial * 20) / 20));
const gensOf = (dial: number): number => Math.max(5, Math.min(40, Math.round(dial)));

const step = (x: number, r: number): number => r * x * (1 - x);

// How long a cycle the population settles into, or none at all.
const patternOf = (r: number): string => {
    // At r = 3 the slope is exactly -1, so the approach is far too slow to detect by
    // iterating -- and this is the one dial position the lesson cares most about, so
    // it is named rather than mistaken for chaos.
    if (Math.abs(Math.abs(2 - r) - 1) < 1e-9) return 'the threshold exactly';
    let x = 0.3;
    for (let i = 0; i < 600; i++) x = step(x, r);
    const orbit: number[] = [];
    for (let i = 0; i < 32; i++) { x = step(x, r); orbit.push(x); }
    for (const p of [1, 2, 4, 8]) {
        let same = true;
        for (let i = 0; i + p < orbit.length; i++) {
            if (Math.abs(orbit[i] - orbit[i + p]) > 1e-5) { same = false; break; }
        }
        if (same) return p === 1 ? 'settles' : p + '-year cycle';
    }
    return 'no pattern at all';
};

export const L3P25MapLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const gens = gensOf(raw2);
        const slope = 2 - rate;
        const size = Math.abs(slope);
        const pattern = patternOf(rate);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const showAxis = usable >= ROW + 30;
        const axisH = showAxis ? ROW : 0;
        const plotH = Math.max(8, usable - axisH);
        const top = artTop + Math.max(0, (usable - (axisH + plotH)) / 2);
        const plotTop = top;
        const plotBottom = plotTop + plotH;
        const axisRow = plotBottom + 11;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const xOf = (gen: number) => left + fullW * (gen / gens);
        const yOf = (value: number) => plotBottom - plotH * Math.max(0, Math.min(1, value));

        // the pond's limits, so the plot means something without axis numbers
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotTop);
        ctx.lineTo(left + fullW, plotTop);
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + fullW, plotBottom);
        ctx.stroke();

        // two ponds, one rule, a millionth apart
        const run = (start: number, colour: string, width: number) => {
            let value = start;
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(xOf(0), yOf(value));
            for (let gen = 1; gen <= gens; gen++) {
                value = step(value, rate);
                ctx.lineTo(xOf(gen), yOf(value));
            }
            ctx.stroke();
        };
        run(0.4, POND_A, 2.6);
        run(0.4 + GAP, POND_B, 1.3);

        if (showAxis) {
            outlineText(ctx, 'share of the pond, 0 to 1', safeRight / 2, axisRow,
                'bold 11px monospace', '#334155', 'center', safeRight - 24);
        }

        outlineText(ctx, 'slope = 2 - ' + rate.toFixed(2) + ' = ' + slope.toFixed(2),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'size ' + size.toFixed(2) + (size > 1 ? ': gaps grow' : ': gaps fade'),
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            size > 1 ? POND_B : POND_A, 'center', safeRight - 30);

        fitText(ctx, pattern, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Two ponds, one rule', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, size / 2)),
                caption: 'Size of the Slope',
                low: 'fade: forecastable',
                high: 'doubles: chaos',
                stops: ['#eef2ff', '#fcd34d', POND_B] as [string, string, string],
            },
            note: 'At r = ' + rate.toFixed(2) + ' the slope at the settling point is ' + slope.toFixed(2)
                + ', so each year multiplies a gap by ' + size.toFixed(2) + '. The population '
                + (pattern === 'settles' ? 'settles to one level.' : pattern === 'no pattern at all'
                    ? 'never repeats.' : 'runs on a ' + pattern + '.'),
        };
    };

    return (
        <LabCanvas
            title="Where the Doubling Comes From"
            readout={({ raw }) => 'Breeding rate r = ' + rateOf(raw).toFixed(2)}
            controlLabel="Breeding Rate r"
            controlKey="breedingRate"
            controlMin={2}
            controlMax={4}
            controlInitial={2.5}
            controlDisplay={raw => 'r = ' + rateOf(raw).toFixed(2)}
            control2={{
                label: 'Generations',
                key: 'generations',
                min: 5,
                max: 40,
                initial: 30,
                display: raw => gensOf(raw) + ' years',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Can Tiny Changes Cause Big Effects?"
            completeNote="Is the slope above or below 1?"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
