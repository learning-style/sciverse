import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: two lines cap the delivery, and the smaller one wins. The whole
// comparison is drawn rather than written -- each pipe's WIDTH is its capacity,
// and the two streets are stacked at the junction so that their combined width
// sits directly against the trunk's. A visual-only learner can see which side is
// fatter without reading a number, and the fatter side is the one with room to
// spare. The bottleneck is coloured, so the verdict is a colour and a word.
const STREET_B = 20;           // L/min, fixed, so there is something to reason against
const SPAN = 110;              // L/min mapped to the full pipe band
const INDIGO = '#4338ca';
const SLACK = '#a5b4fc';       // a pipe with room to spare
const TIGHT = '#b45309';       // the bottleneck

const trunkOf = (dial: number): number => Math.max(20, Math.min(100, Math.round(dial / 5) * 5));
const streetAOf = (dial: number): number => Math.max(5, Math.min(60, Math.round(dial / 5) * 5));

export const L2P24NetworkLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const trunk = trunkOf(raw);
        const streetA = streetAOf(raw2);
        const streets = streetA + STREET_B;
        const delivery = Math.min(trunk, streets);
        const trunkTight = trunk < streets;
        const streetsTight = streets < trunk;
        const stopsAt = Math.max(0, trunk - STREET_B);

        // Fixed slots: nothing here follows the artwork, so no two labels can converge.
        // The rows are clamped to artBottom so that a short canvas crowds the drawing
        // rather than printing over the footer lines.
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // A phone-height canvas leaves a stage too short for a drawing and three label
        // rows at once, so the number of rows is derived from the height available
        // rather than assumed: the drawing keeps 24px and each row that still fits
        // takes 15. They are dropped from the bottom up, so the least useful goes
        // first -- the verdict, which the amber pipe and the meter note both carry.
        const ROW = 15;
        const fit = Math.max(0, Math.min(3, Math.floor((usable - 24) / ROW)));
        const above = fit >= 1 ? ROW : 0;
        const below = (fit >= 2 ? ROW : 0) + (fit >= 3 ? ROW : 0);
        const room = Math.max(10, usable - above - below);
        const top = artTop + Math.max(0, (usable - (above + room + below)) / 2);
        const trunkRow = top + 11;
        const bandTop = top + above;
        const streetsRow = bandTop + room + 11;
        const verdictRow = streetsRow + ROW;

        // 0.62 of the band, so that the widest trunk still clears the label above it.
        const pipeBand = Math.min(Math.max(10, room * 0.62), room, 88);
        // Net of the gap, so that the two streets STACKED still fit the band -- at the
        // 10px floor the stack was 0.5px taller than the band without this.
        const scale = (pipeBand - 4) / SPAN;
        const cy = bandTop + room / 2;
        const trunkW = Math.max(3, trunk * scale);
        const aW = Math.max(3, streetA * scale);
        const bW = Math.max(3, STREET_B * scale);
        const gap = 4;
        // The reservoir and houses are sized to what is actually drawn, not to the
        // whole band -- a full-height box reached up into the trunk's label.
        const half = Math.min(Math.max(trunkW, aW + bW + gap) / 2 + 3, room / 2);

        // reservoir on the left, junction in the middle, houses on the right
        const left = 30;
        const right = Math.max(left + 90, safeRight - 30);
        const junction = left + (right - left) * 0.42;
        const boxW = 20;

        const pipe = (x0: number, x1: number, yc: number, wide: number, tight: boolean) => {
            ctx.fillStyle = tight ? TIGHT : SLACK;
            ctx.fillRect(x0, yc - wide / 2, x1 - x0, wide);
            ctx.strokeStyle = tight ? TIGHT : INDIGO;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x0, yc - wide / 2, x1 - x0, wide);
        };

        // the trunk: everything crosses it
        pipe(left + boxW, junction, cy, trunkW, trunkTight);
        // the two streets, stacked at the junction so their widths add against the trunk
        const aCy = cy - gap / 2 - aW / 2;
        const bCy = cy + gap / 2 + bW / 2;
        pipe(junction, right - boxW, aCy, aW, streetsTight);
        pipe(junction, right - boxW, bCy, bW, streetsTight);

        // reservoir and houses, so the direction of flow is never in doubt
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(left, cy - half, boxW, half * 2);
        ctx.fillRect(right - boxW, cy - half, boxW, half * 2);

        // water moving from the reservoir towards the houses
        ctx.fillStyle = '#ffffff';
        const march = (t * 42) % 26;
        for (let i = 0; i < 6; i++) {
            const dx = left + boxW + 6 + ((i * 26 + march) % Math.max(1, junction - left - boxW - 8));
            if (trunkW > 6) {
                ctx.beginPath();
                ctx.arc(dx, cy, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        if (fit >= 1) {
            outlineText(ctx, 'trunk ' + trunk + ' L/min', (left + junction) / 2, trunkRow,
                'bold 12px monospace', trunkTight ? TIGHT : '#334155', 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, 'streets ' + streetA + ' + ' + STREET_B + ' = ' + streets + ' L/min',
                safeRight / 2, streetsRow,
                'bold 12px monospace', streetsTight ? TIGHT : '#334155', 'center', safeRight - 24);
        }
        if (fit >= 3) {
            outlineText(ctx, trunkTight ? 'the trunk is the bottleneck'
                : streetsTight ? 'the streets are the bottleneck'
                    : 'both equal: all pipes flat out',
                safeRight / 2, verdictRow,
                'bold 12px monospace', TIGHT, 'center', safeRight - 24);
        }

        ctx.save();
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(left + boxW / 2, cy);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('reservoir', 0, 3.5);
        ctx.restore();
        ctx.save();
        ctx.translate(right - boxW / 2, cy);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('houses', 0, 3.5);
        ctx.restore();
        ctx.restore();

        outlineText(ctx, 'delivery = ' + delivery + ' L/min',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'street A: no help above ' + stopsAt,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', INDIGO, 'center', safeRight - 30);

        fitText(ctx, 'delivers ' + delivery + ' L/min', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The trunk, or the two streets', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, delivery / 80)),
                caption: 'Water Delivered',
                low: 'almost nothing arrives',
                high: 'every pipe flat out',
                stops: ['#eef2ff', '#818cf8', INDIGO] as [string, string, string],
            },
            note: trunkTight
                ? 'The streets together can take ' + streets + ' L/min but the trunk only feeds '
                  + trunk + ', so widening street A past ' + stopsAt + ' delivers nothing.'
                : streetsTight
                    ? 'The trunk could feed ' + trunk + ' L/min but the streets only take '
                      + streets + ', so a wider street pipe is worth buying.'
                    : 'Both lines are ' + trunk + ' L/min, so every pipe is working flat out and no single replacement helps.',
        };
    };

    return (
        <LabCanvas
            title="Which Pipe Should the City Replace?"
            readout={({ raw }) => 'Trunk pipe ' + trunkOf(raw) + ' L/min'}
            controlLabel="Trunk Pipe"
            controlKey="trunkPipe"
            controlMin={20}
            controlMax={100}
            controlInitial={60}
            controlDisplay={raw => trunkOf(raw) + ' L/min'}
            control2={{
                label: 'Street A Pipe',
                key: 'streetAPipe',
                min: 5,
                max: 60,
                initial: 25,
                display: raw => streetAOf(raw) + ' L/min',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Networks Deliver What Matters?"
            completeNote="Find the bottleneck before you spend!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
