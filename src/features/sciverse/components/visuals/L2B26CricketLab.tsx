import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the cricket IS a thermometer, so the picture shows both and the chirps
// drive the reading. A globe would be decoration here -- latitude has nothing to do
// with this rule -- so the concrete object is the instrument.
//
// Standardising stays structural: ONE row of chirps on one timeline with two
// brackets marking the two lengths of listening, so "one cricket" is what the picture
// is rather than something a caption claims. The thermometer beside it carries the
// working range as a band, with everything below 13 °C left empty because down there
// the cricket makes no sound at all.
const STANDARD_S = 25;
const COLD_LIMIT = 13;         // °C: below this a snowy tree cricket is silent
const WARM_LIMIT = 35;         // °C: above this Dolbear never measured
const T_LOW = 5;
const T_HIGH = 40;
const CHIRP = '#334155';
const YOURS = '#be123c';
const RULE = '#047857';

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
        const show = (value: number) => value.toFixed(value < 10 ? 1 : 0);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 17;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 14) / ROW)));
        const showYours = fit >= 1;
        const showRule = fit >= 2;
        const brackets = (showYours ? ROW : 0) + (showRule ? ROW : 0);
        const tickH = Math.max(8, Math.min(usable - brackets, 36));
        const blockH = tickH + brackets;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const chirpW = fullW * 0.64;
        // one timeline, long enough to hold whichever length of listening is longer
        const axisS = Math.max(seconds, STANDARD_S);
        const xOf = (sec: number) => left + chirpW * (sec / axisS);
        const perSecond = counted / seconds;

        const tickTop = top;
        const tickBottom = top + tickH;

        // the chirps: one cricket at one steady rate, right across the timeline
        ctx.strokeStyle = CHIRP;
        ctx.lineWidth = 1.2;
        for (let i = 0; ; i++) {
            const at = (i + 0.5) / perSecond;
            if (at >= axisS) break;
            ctx.beginPath();
            ctx.moveTo(xOf(at), tickTop + 1);
            ctx.lineTo(xOf(at), tickBottom - 1);
            ctx.stroke();
        }
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, tickBottom);
        ctx.lineTo(left + chirpW, tickBottom);
        ctx.stroke();

        // the thermometer the chirps are driving
        const tubeW = Math.max(6, Math.min(tickH * 0.26, 11));
        const tx = left + fullW - tubeW / 2 - 6;
        const tubeTop = tickTop + 2;
        const bulbR = tubeW * 0.78;
        // the bulb's lowest point is tubeBottom + 1.6 bulbR, so the tube stops far enough
        // up that the whole bulb sits inside the band
        const tubeBottom = tickBottom - bulbR * 1.6 - 1;
        const tubeH = Math.max(6, tubeBottom - tubeTop);
        const yOfT = (c: number) =>
            tubeBottom - tubeH * Math.max(0, Math.min(1, (c - T_LOW) / (T_HIGH - T_LOW)));
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(tx - tubeW / 2, tubeTop, tubeW, tubeH);
        // the band Dolbear's rule actually covers
        ctx.fillStyle = '#d1fae5';
        ctx.fillRect(tx - tubeW / 2, yOfT(WARM_LIMIT), tubeW, yOfT(COLD_LIMIT) - yOfT(WARM_LIMIT));
        if (!tooCold) {
            ctx.fillStyle = tooWarm ? YOURS : RULE;
            ctx.fillRect(tx - tubeW / 2, yOfT(temp), tubeW, tubeBottom - yOfT(temp));
        }
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(tx - tubeW / 2, tubeTop, tubeW, tubeH);
        ctx.fillStyle = tooCold ? '#e2e8f0' : tooWarm ? YOURS : RULE;
        ctx.beginPath();
        ctx.arc(tx, tubeBottom + bulbR * 0.6, bulbR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.stroke();

        // the two lengths of listening, as brackets under the same row of chirps
        const bracket = (yTop: number, sec: number, colour: string) => {
            const x1 = xOf(sec);
            ctx.strokeStyle = colour;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(left, yTop + 5);
            ctx.lineTo(left, yTop);
            ctx.lineTo(x1, yTop);
            ctx.lineTo(x1, yTop + 5);
            ctx.stroke();
        };
        let y = tickBottom;
        const yoursRow = showYours ? y + 15 : 0;
        if (showYours) { bracket(y + 3, seconds, YOURS); y += ROW; }
        const ruleRow = showRule ? y + 15 : 0;
        if (showRule) { bracket(y + 3, STANDARD_S, RULE); }

        if (showYours) {
            outlineText(ctx, 'you heard ' + counted + ' in ' + seconds + ' s', left, yoursRow,
                'bold 11px monospace', YOURS, 'left', fullW);
        }
        if (showRule) {
            outlineText(ctx, 'the rule wants ' + show(standard) + ' in 25 s', left, ruleRow,
                'bold 11px monospace', RULE, 'left', fullW);
        }

        outlineText(ctx, counted + ' x 25/' + seconds + ' = ' + show(standard) + ' chirps',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, tooCold ? 'below 13 °C: it would be silent'
            : tooWarm ? 'over 35 °C: outside the rule'
                : 'divide by 3, add 4.4',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            tooCold || tooWarm ? YOURS : RULE, 'center', safeRight - 30);

        fitText(ctx, tooCold || tooWarm ? 'outside the rule' : temp.toFixed(1) + ' °C',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Count for 25 seconds', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (temp - T_LOW) / (T_HIGH - T_LOW))),
                caption: 'What the Cricket Says',
                low: 'too cold to chirp',
                high: 'outside the range',
                stops: ['#eef2ff', '#6ee7b7', YOURS] as [string, string, string],
            },
            note: 'The ticks are one cricket chirping at one steady rate. You heard '
                + counted + ' of them in ' + seconds + ' s, and the same cricket gives '
                + show(standard) + ' in 25 s -- the count the thermometer is built on.',
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
