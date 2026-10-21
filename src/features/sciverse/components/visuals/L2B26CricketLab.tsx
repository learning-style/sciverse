import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: it is the same cricket either way, so the two strips are drawn with the
// SAME tick spacing and their lengths come out proportional to the two windows. The
// learner sees one comb of chirps cut to two lengths, which is exactly what
// standardising is -- and the strip for 25 seconds is the one the rule wants. The
// spacing is derived from whichever count is larger, so the longer strip always fits
// and the two can never be drawn at different densities.
const STANDARD_S = 25;
const COLD_LIMIT = 13;         // °C: below this a snowy tree cricket is silent
const WARM_LIMIT = 35;         // °C: above this Dolbear never measured
const ROSE = '#be123c';
const STANDARDISED = '#047857';

const chirpsOf = (dial: number): number => Math.max(5, Math.min(60, Math.round(dial)));
const secondsOf = (dial: number): number => Math.max(15, Math.min(50, Math.round(dial / 5) * 5));

export const L2B26CricketLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const counted = chirpsOf(raw);
        const seconds = secondsOf(raw2);
        const standard = counted * STANDARD_S / seconds;
        const temp = standard / 3 + 4.4;
        const tooCold = temp < COLD_LIMIT;
        const tooWarm = temp > WARM_LIMIT;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 24) / ROW)));
        const showYours = fit >= 1;
        const showStandard = fit >= 2;
        const labels = (showYours ? ROW : 0) + (showStandard ? ROW : 0);
        const GAP = 6;
        const stripH = Math.max(4, Math.min((usable - labels - GAP) / 2, 20));
        const blockH = labels + 2 * stripH + GAP;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const left = 26;
        const availW = Math.max(60, safeRight - 52);
        // one spacing for both strips, set by whichever count is larger, so the longer
        // strip always fits and the two can never be drawn at different densities
        const spacing = Math.max(1.5, Math.min(8, availW / Math.max(counted, standard)));

        let y = top;
        const yoursRow = showYours ? y + 11 : 0;
        if (showYours) y += ROW;
        const yoursTop = y;
        y += stripH + GAP;
        const standardRow = showStandard ? y + 11 : 0;
        if (showStandard) y += ROW;
        const standardTop = y;

        const comb = (yTop: number, count: number, colour: string) => {
            const len = count * spacing;
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(left, yTop, Math.max(2, len), stripH);
            ctx.strokeStyle = colour;
            ctx.lineWidth = Math.min(1.4, Math.max(0.8, spacing * 0.4));
            for (let i = 0; i < Math.round(count); i++) {
                const x = left + i * spacing + spacing / 2;
                ctx.beginPath();
                ctx.moveTo(x, yTop + 1);
                ctx.lineTo(x, yTop + stripH - 1);
                ctx.stroke();
            }
            ctx.strokeStyle = colour;
            ctx.lineWidth = 1.4;
            ctx.strokeRect(left, yTop, Math.max(2, len), stripH);
        };
        comb(yoursTop, counted, ROSE);
        comb(standardTop, standard, STANDARDISED);

        if (showYours) {
            outlineText(ctx, counted + ' chirps in ' + seconds + ' s', left, yoursRow,
                'bold 11px monospace', ROSE, 'left', availW);
        }
        if (showStandard) {
            outlineText(ctx, 'the rule wants ' + standard.toFixed(standard < 10 ? 1 : 0) + ' in 25 s',
                left, standardRow, 'bold 11px monospace', STANDARDISED, 'left', availW);
        }

        outlineText(ctx, counted + ' x 25/' + seconds + ' = '
            + standard.toFixed(standard < 10 ? 1 : 0) + ' chirps',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, tooCold ? 'below 13 °C: it would be silent'
            : tooWarm ? 'over 35 °C: outside the rule'
                : 'divide by 3, add 4.4',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            tooCold || tooWarm ? ROSE : STANDARDISED, 'center', safeRight - 30);

        fitText(ctx, tooCold ? 'outside the rule' : tooWarm ? 'outside the rule' : temp.toFixed(1) + ' °C',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Count for 25 seconds', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (temp - 5) / 30)),
                caption: 'What the Cricket Says',
                low: 'too cold to chirp',
                high: 'outside the range',
                stops: ['#eef2ff', '#6ee7b7', ROSE] as [string, string, string],
            },
            note: counted + ' chirps in ' + seconds + ' s is ' + standard.toFixed(standard < 10 ? 1 : 0)
                + ' in 25 s, giving ' + temp.toFixed(1) + ' °C. '
                + (tooCold ? 'But below 13 °C the cricket is silent, so the rule cannot reach here.'
                    : tooWarm ? 'But Dolbear never measured above 35 °C, so this is outside the fit.'
                        : 'Both strips have the same chirp spacing: it is one cricket, two windows.'),
        };
    };

    return (
        <LabCanvas
            title="The Cricket Thermometer"
            readout={({ raw }) => 'You counted ' + chirpsOf(raw) + ' chirps'}
            controlLabel="Chirps Counted"
            controlKey="chirpsCounted"
            controlMin={5}
            controlMax={60}
            controlInitial={40}
            controlDisplay={raw => chirpsOf(raw) + ' chirps'}
            control2={{
                label: 'Seconds Counted',
                key: 'secondsCounted',
                min: 15,
                max: 50,
                initial: 25,
                display: raw => secondsOf(raw) + ' s',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Measure a proxy, know the rule!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
