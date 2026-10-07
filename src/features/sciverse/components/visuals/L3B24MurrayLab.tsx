import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: two costs pulling opposite ways, so the total has a lowest point -- and
// the bottom is flat. Everything is drawn in units of the lowest total cost, which
// is the quantity the lesson actually talks about and keeps the plot readable
// despite the fourth power. The two component curves are drawn as well, so the
// friction-is-half-the-upkeep rule is visible as one curve sitting at half the
// height of the other, rather than being something to take on trust.
const R_MIN = 10;
const R_MAX = 200;
const Y_TOP = 6;               // times the lowest total cost
const ROSE = '#be123c';
const FRICTION = '#b45309';
const UPKEEP = '#0369a1';

const radiusOf = (dial: number): number => Math.max(R_MIN, Math.min(R_MAX, Math.round(dial / 5) * 5));
const flowOf = (dial: number): number => Math.max(1, Math.min(16, Math.round(dial)));

const frictionAt = (r: number, flow: number): number => 1250 * Math.pow(flow / 2, 2) * Math.pow(50 / r, 4);
const upkeepAt = (r: number): number => 2500 * Math.pow(r / 50, 2);
const bestRadius = (flow: number): number => 50 * Math.pow(flow / 2, 1 / 3);

export const L3B24MurrayLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const radius = radiusOf(raw);
        const flow = flowOf(raw2);
        const best = bestRadius(flow);
        const lowest = frictionAt(best, flow) + upkeepAt(best);
        const friction = frictionAt(radius, flow);
        const upkeep = upkeepAt(radius);
        const total = friction + upkeep;
        const above = total / lowest - 1;
        const halfRule = friction / upkeep;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        // The bottom row carries the two numbers, so it is kept first.
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 24) / ROW)));
        const showNums = fit >= 1;
        const showKeys = fit >= 2;
        const keyH = showKeys ? ROW : 0;
        const numH = showNums ? ROW : 0;
        // Floored low enough that it can never exceed what is left: with no rows the
        // plot takes the whole band, and a 20px floor overran a phone-height stage.
        const plotH = Math.max(8, usable - keyH - numH);
        const top = artTop + Math.max(0, (usable - (keyH + plotH + numH)) / 2);
        const keyRow = top + 11;
        const plotTop = top + keyH;
        const plotBottom = plotTop + plotH;
        const numRow = plotBottom + 11;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const xOf = (r: number) => left + fullW * (r - R_MIN) / (R_MAX - R_MIN);
        const yOf = (times: number) =>
            plotBottom - plotH * Math.max(0, Math.min(Y_TOP, times)) / Y_TOP;

        // the level of the lowest total cost, so "how far above" can be read off
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(left, yOf(1));
        ctx.lineTo(left + fullW, yOf(1));
        ctx.stroke();
        ctx.setLineDash([]);

        const curve = (f: (r: number) => number, colour: string, width: number) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            let started = false;
            for (let px = 0; px <= fullW; px += 2) {
                const r = R_MIN + (R_MAX - R_MIN) * (px / fullW);
                const times = f(r) / lowest;
                if (times > Y_TOP) { started = false; continue; }
                const py = yOf(times);
                if (started) ctx.lineTo(left + px, py);
                else { ctx.moveTo(left + px, py); started = true; }
            }
            ctx.stroke();
        };
        curve(r => frictionAt(r, flow), FRICTION, 1.6);
        curve(r => upkeepAt(r), UPKEEP, 1.6);
        curve(r => frictionAt(r, flow) + upkeepAt(r), ROSE, 2.6);

        // where the lowest point sits
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(xOf(best), plotBottom);
        ctx.lineTo(xOf(best), plotBottom - 7);
        ctx.stroke();

        // and where you are
        const dotX = xOf(radius);
        const dotY = yOf(total / lowest);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(dotX, plotBottom);
        ctx.lineTo(dotX, dotY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3.6, 0, Math.PI * 2);
        ctx.fill();

        if (showKeys) {
            outlineText(ctx, 'friction', left, keyRow, 'bold 11px monospace',
                FRICTION, 'left', fullW / 2 - 6);
            outlineText(ctx, 'upkeep', left + fullW, keyRow, 'bold 11px monospace',
                UPKEEP, 'right', fullW / 2 - 6);
        }
        if (showNums) {
            outlineText(ctx, 'best ' + best.toFixed(0) + ' µm', left, numRow,
                'bold 11px monospace', ROSE, 'left', fullW / 2 - 6);
            outlineText(ctx, 'you ' + radius + ' µm', left + fullW, numRow,
                'bold 11px monospace', '#0f172a', 'right', fullW / 2 - 6);
        }

        outlineText(ctx, 'friction / upkeep = ' + halfRule.toFixed(2),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, halfRule > 0.56 ? 'too narrow: widening pays'
            : halfRule < 0.45 ? 'too wide: over-paying'
                : 'half the upkeep: the best',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, (above * 100).toFixed(0) + '% above the lowest', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Total cost against radius', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, lowest / total)),
                caption: 'How Near the Lowest Cost',
                low: 'paying far too much',
                high: 'the lowest cost',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: 'At ' + flow + ' nL/s the best radius is ' + best.toFixed(0) + ' µm, where friction is half the upkeep. '
                + radius + ' µm costs ' + (above * 100).toFixed(0)
                + '% more than the lowest, and the cube of the best radius tracks the flow.',
        };
    };

    return (
        <LabCanvas
            title="What Shape Is Worth Building"
            readout={({ raw }) => 'Vessel radius ' + radiusOf(raw) + ' micrometres'}
            controlLabel="Vessel Radius"
            controlKey="vesselRadius"
            controlMin={R_MIN}
            controlMax={R_MAX}
            controlInitial={100}
            controlDisplay={raw => radiusOf(raw) + ' µm'}
            control2={{
                label: 'Flow Carried',
                key: 'flowCarried',
                min: 1,
                max: 16,
                initial: 4,
                display: raw => flowOf(raw) + ' nL/s',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Networks Deliver What Matters?"
            completeNote="The slow far end is the whole design!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
