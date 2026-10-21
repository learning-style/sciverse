import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: two lines leave the same point on the ground and fan apart, and which
// side the bubble ends up on is the whole forecast. Both scales are fixed -- 0 to 3
// km up, 0 to 36 degrees of cooling across -- so the slopes never change as the
// dials move and the height dial visibly extends the lines up the plot. At a rate of
// exactly 10 the two lines lie on top of each other, which is the pivot the lesson
// is about, so the labels are kept in fixed rows and coloured rather than attached.
const BUBBLE_RATE = 10;        // °C per km, the same for every bubble
const MAX_KM = 3;
const MAX_COOL = 36;           // °C across the plot, so 12 °C/km x 3 km fits
const BUBBLE = '#047857';
const AROUND = '#4338ca';
const STORM = '#b45309';

const rateOf = (dial: number): number => Math.max(4, Math.min(12, Math.round(dial * 2) / 2));
const heightOf = (dial: number): number => Math.max(0, Math.min(MAX_KM, Math.round(dial * 4) / 4));

export const L2C26StabilityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const height = heightOf(raw2);
        const diff = (rate - BUBBLE_RATE) * height;
        const warmer = diff > 0.0001;
        const same = Math.abs(rate - BUBBLE_RATE) < 1e-9;

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
        const groundX = left + fullW - 8;
        const yOf = (km: number) => plotBottom - plotH * (km / MAX_KM);
        const xOf = (cooled: number) => groundX - (fullW - 16) * (cooled / MAX_COOL);

        // the ground, where both lines start together
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + fullW, plotBottom);
        ctx.stroke();

        const line = (perKm: number, colour: string, width: number) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(groundX, plotBottom);
            ctx.lineTo(xOf(perKm * height), yOf(height));
            ctx.stroke();
        };
        line(rate, AROUND, 2.2);
        line(BUBBLE_RATE, BUBBLE, 2.6);

        // the gap at the top, shaded so the side the bubble is on reads at a glance
        if (height > 0 && !same) {
            const yTop = yOf(height);
            ctx.strokeStyle = warmer ? STORM : '#64748b';
            ctx.lineWidth = 1.4;
            ctx.setLineDash([3, 2]);
            ctx.beginPath();
            ctx.moveTo(xOf(rate * height), yTop);
            ctx.lineTo(xOf(BUBBLE_RATE * height), yTop);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        if (showAbove) {
            outlineText(ctx, 'bubble cools 10 °C/km', safeRight / 2, aboveRow,
                'bold 11px monospace', BUBBLE, 'center', safeRight - 24);
        }
        if (showBelow) {
            outlineText(ctx, 'the air cools ' + rate.toFixed(1) + ' °C/km', safeRight / 2, belowRow,
                'bold 11px monospace', AROUND, 'center', safeRight - 24);
        }

        outlineText(ctx, '(' + rate.toFixed(1) + ' - 10) x ' + height.toFixed(2).replace(/\.?0+$/, '')
            + ' = ' + (diff >= 0 ? '+' : '') + diff.toFixed(1) + ' °C',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, same ? 'the same: it just sits there'
            : warmer ? 'warmer: it keeps rising' : 'colder: it sinks back',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            same ? '#334155' : warmer ? STORM : AROUND, 'center', safeRight - 30);

        fitText(ctx, height === 0 ? 'still on the ground'
            : same ? 'no difference'
                : Math.abs(diff).toFixed(1) + ' °C ' + (warmer ? 'warmer' : 'colder'),
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Bubble against the air', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (rate - 4) / 8)),
                caption: 'The Air Cooling Rate',
                low: 'under 10: quiet',
                high: 'over 10: storms',
                stops: [AROUND, '#fcd34d', STORM] as [string, string, string],
            },
            note: height === 0
                ? 'The bubble has not risen yet. A rate of ' + rate.toFixed(1)
                  + ' °C/km is ' + (rate > BUBBLE_RATE ? 'above' : rate < BUBBLE_RATE ? 'below' : 'exactly')
                  + ' the 10 a bubble cools at, so the forecast is already decided.'
                : 'After ' + height + ' km the bubble is ' + Math.abs(diff).toFixed(1) + ' °C '
                  + (warmer ? 'warmer than the air around it, so it keeps rising.'
                      : same ? 'different from the air around it, so it just sits there.'
                          : 'colder than the air around it, so it sinks back.'),
        };
    };

    return (
        <LabCanvas
            title="Will It Storm Today?"
            readout={({ raw }) => 'The air cools ' + rateOf(raw).toFixed(1) + ' °C/km'}
            controlLabel="The Surroundings' Cooling Rate"
            controlKey="lapseRate"
            controlMin={4}
            controlMax={12}
            controlInitial={6}
            controlDisplay={raw => rateOf(raw).toFixed(1) + ' °C/km'}
            control2={{
                label: 'Height Risen',
                key: 'heightRisen',
                min: 0,
                max: MAX_KM,
                initial: 2,
                display: raw => heightOf(raw) + ' km',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Weather is made by gradients, not amounts!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
