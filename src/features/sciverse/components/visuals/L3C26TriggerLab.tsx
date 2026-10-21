import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the bubble's line has a KINK at the cloud base, and the kink is what
// lets it come back. Steep below, shallow above, against the surroundings' straight
// line -- so the learner watches the bubble fall behind, bend, and converge, and the
// point where the lines meet is where it stops needing help. Both scales are fixed,
// 0 to 6 km up and 0 to 72 degrees across, so the slopes never change as the dials
// move.
const DRY = 10;
const SAT = 5.5;
const MAX_KM = 6;
const MAX_COOL = 72;           // °C across: 12 °C/km x 6 km
const BUBBLE = '#047857';
const AROUND = '#4338ca';
const FREE = '#b45309';

const rateOf = (dial: number): number => Math.max(4, Math.min(12, Math.round(dial * 2) / 2));
const baseOf = (dial: number): number => Math.max(0.5, Math.min(2.5, Math.round(dial * 4) / 4));

export const L3C26TriggerLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const base = baseOf(raw2);
        // <= and not <, or a rate of exactly 5.5 falls through both branches and the
        // footer calls toFixed on a null crossing. At 5.5 the saturated bubble is
        // exactly level for ever, so it never breaks even: stable is the right answer.
        const stable = rate <= SAT;
        const outright = rate > DRY;
        const level = Math.abs(rate - DRY) < 1e-9;
        const crossing = rate > SAT ? (DRY - SAT) * base / (rate - SAT) : null;
        const reaches = crossing !== null && crossing <= MAX_KM;

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

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + fullW, plotBottom);
        ctx.stroke();

        // the surrounding air: one straight line all the way up
        ctx.strokeStyle = AROUND;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(groundX, plotBottom);
        ctx.lineTo(xOf(rate * MAX_KM), yOf(MAX_KM));
        ctx.stroke();

        // the bubble: steep to the cloud base, then shallow, and the kink is the point
        const kinkCool = DRY * base;
        ctx.strokeStyle = BUBBLE;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(groundX, plotBottom);
        ctx.lineTo(xOf(kinkCool), yOf(base));
        ctx.lineTo(xOf(kinkCool + SAT * (MAX_KM - base)), yOf(MAX_KM));
        ctx.stroke();

        // the cloud base itself, where the arithmetic changes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(left, yOf(base));
        ctx.lineTo(left + fullW, yOf(base));
        ctx.stroke();
        ctx.setLineDash([]);

        // where it stops needing help
        if (reaches && crossing !== null) {
            ctx.fillStyle = FREE;
            ctx.beginPath();
            ctx.arc(xOf(rate * crossing), yOf(crossing), 3.6, 0, Math.PI * 2);
            ctx.fill();
        }

        if (showAbove) {
            outlineText(ctx, 'bubble: 10 then 5.5 °C/km', safeRight / 2, aboveRow,
                'bold 11px monospace', BUBBLE, 'center', safeRight - 24);
        }
        if (showBelow) {
            outlineText(ctx, 'the air cools ' + rate.toFixed(1) + ' °C/km', safeRight / 2, belowRow,
                'bold 11px monospace', AROUND, 'center', safeRight - 24);
        }

        outlineText(ctx, stable || outright
            ? 'cloud base ' + base.toFixed(2).replace(/\.?0+$/, '') + ' km'
            : '4.5 x ' + base.toFixed(2).replace(/\.?0+$/, '') + ' / '
              + (rate - SAT).toFixed(1) + ' = ' + (crossing as number).toFixed(1) + ' km',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, stable ? 'stable: nothing will do it'
            : outright ? 'unstable from the ground' : 'conditionally unstable',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            stable ? AROUND : outright ? FREE : BUBBLE, 'center', safeRight - 30);

        fitText(ctx, stable ? 'never breaks even'
            : outright ? 'ahead from the start'
                : level ? 'level, then ahead'
                    : reaches ? 'breaks even at ' + (crossing as number).toFixed(1) + ' km'
                        : 'breaks even above 6 km',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The kink at the cloud base', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (rate - 4) / 8)),
                caption: 'The Air Cooling Rate',
                low: 'under 5.5: stable',
                high: 'over 10: by itself',
                stops: [AROUND, '#6ee7b7', FREE] as [string, string, string],
            },
            note: stable
                ? 'At ' + rate.toFixed(1) + ' °C/km the air cools at 5.5 or slower, so the bubble never gains even above its cloud base. Nothing will make this day storm.'
                : outright
                    ? 'At ' + rate.toFixed(1) + ' °C/km the bubble is warmer from the first metre, so it needs no trigger at all. This day storms by itself.'
                    : 'Loaded but not firing: the bubble is ' + ((DRY - rate) * base).toFixed(1)
                      + ' °C behind at its cloud base and breaks even at '
                      + (crossing as number).toFixed(1) + ' km, so something must lift it that far.',
        };
    };

    return (
        <LabCanvas
            title="The Day That Is Both"
            readout={({ raw }) => 'The air cools ' + rateOf(raw).toFixed(1) + ' °C/km'}
            controlLabel="The Surroundings' Cooling Rate"
            controlKey="triggerRate"
            controlMin={4}
            controlMax={12}
            controlInitial={7}
            controlDisplay={raw => rateOf(raw).toFixed(1) + ' °C/km'}
            control2={{
                label: 'Cloud Base',
                key: 'cloudBase',
                min: 0.5,
                max: 2.5,
                initial: 1,
                display: raw => baseOf(raw) + ' km',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="A stated condition is the boundary of the answer!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
