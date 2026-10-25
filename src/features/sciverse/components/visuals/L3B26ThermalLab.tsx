import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// A reader said the previous version was "too dry with just some line and lot of words"
// and asked to see a corn plant and what a tassel is. They were right: it was an
// accumulation chart, which draws the arithmetic and not the thing.
//
// So this draws the plant. A stalk grows out of the ground as the season runs, leaves
// unfold, and at the end it pushes out a labelled TASSEL -- the plume the lesson is
// about. Beside it a column fills with the warmth banked so far, with the 700 the plant
// needs marked across it and the doubt in that total shaded around the mark. The two
// dials then separate visibly: the average moves the date, and the swing only widens the
// shaded band.
const BASE = 10;               // °C, corn does not grow below this
const NEED = 700;              // degree-days to tasselling
const COL_TOP = 790;           // the column's scale, leaving headroom above the mark
const STALK = '#15803d';
const LEAF = '#16a34a';
const PLUME = '#a16207';
const WARM = '#b45309';
const DOUBT = '#047857';
const DEAD = '#94a3b8';

const meanOf = (dial: number): number => Math.max(10, Math.min(30, Math.round(dial * 2) / 2));
const swingOf = (dial: number): number => Math.max(1, Math.min(6, Math.round(dial * 2) / 2));

export const L3B26ThermalLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const mean = meanOf(raw);
        const swing = swingOf(raw2);
        const perDay = Math.max(0, mean - BASE);
        const stalled = perDay <= 0;
        const days = stalled ? 0 : NEED / perDay;
        const doubt = stalled ? 0 : swing * Math.sqrt(days);
        const windowDays = stalled ? 0 : doubt / perDay;
        const num = (x: number) => (Math.abs(x - Math.round(x)) < 0.05 ? x.toFixed(0) : x.toFixed(1));

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const GROUND_H = 7;
        const groundY = artBottom - GROUND_H;
        const skyH = Math.max(10, groundY - artTop);

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);

        // the season runs on a loop, so the plant is seen growing and tasselling
        const season = stalled ? 0.12 : 0.12 + 0.88 * ((t * 0.17) % 1);
        const done = !stalled && season > 0.97;

        // the ground
        ctx.fillStyle = '#78350f';
        ctx.fillRect(left, groundY, fullW, GROUND_H);

        // ---- the corn plant
        const px = left + fullW * 0.34;
        // the plume rises up to ~16px above the apex, so that room is taken out of the
        // plant's height here; otherwise a short stage pushes the tassel off the top
        const topH = Math.max(6, Math.min(skyH * 0.86 - 16, skyH - 6));
        const plantH = Math.max(5, topH * season);
        const apexY = groundY - plantH;

        ctx.strokeStyle = STALK;
        ctx.lineWidth = Math.max(1.6, Math.min(plantH * 0.035, 4));
        ctx.beginPath();
        ctx.moveTo(px, groundY);
        ctx.lineTo(px, apexY);
        ctx.stroke();

        // leaves, unfolding up the stalk as it grows
        const leaves = Math.max(1, Math.min(5, Math.floor(plantH / 16)));
        ctx.strokeStyle = LEAF;
        ctx.lineWidth = Math.max(1.4, Math.min(plantH * 0.022, 3));
        for (let i = 0; i < leaves; i++) {
            const up = plantH * (0.18 + 0.68 * (i / Math.max(1, leaves - 1 || 1)));
            const side = i % 2 === 0 ? -1 : 1;
            const span = Math.min(plantH * 0.42, fullW * 0.17);
            const y0 = groundY - up;
            ctx.beginPath();
            ctx.moveTo(px, y0);
            ctx.quadraticCurveTo(px + side * span * 0.7, y0 - span * 0.34,
                px + side * span, y0 + span * 0.16);
            ctx.stroke();
        }

        // the tassel: the plume at the very top, which is what the lesson is about
        if (done && plantH >= 18) {
            const spread = Math.min(plantH * 0.2, 13);
            ctx.strokeStyle = PLUME;
            ctx.lineWidth = 1.7;
            for (let k = -3; k <= 3; k++) {
                const lean = k / 3;
                ctx.beginPath();
                ctx.moveTo(px, apexY);
                ctx.quadraticCurveTo(px + lean * spread * 0.7, apexY - spread * 0.75,
                    px + lean * spread, apexY - spread * (1.15 - 0.3 * Math.abs(lean)));
                ctx.stroke();
            }
            // and the ear it is shedding pollen onto, with its silks
            if (plantH >= 52) {
                const ey = groundY - plantH * 0.42;
                ctx.fillStyle = '#ca8a04';
                ctx.beginPath();
                ctx.ellipse(px + 4, ey, 3.4, 8, -0.25, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(px + 5, ey - 8);
                ctx.quadraticCurveTo(px + 11, ey - 13, px + 14, ey - 9);
                ctx.stroke();
            }
        }

        // ---- the warmth banked so far
        const colW = Math.max(9, Math.min(fullW * 0.12, 26));
        const cx = left + fullW * 0.79;
        const colTopY = artTop + 4;
        const colH = Math.max(6, groundY - colTopY);
        const yOfDD = (dd: number) => groundY - colH * Math.max(0, Math.min(1, dd / COL_TOP));

        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(cx - colW / 2, colTopY, colW, colH);
        const banked = stalled ? 0 : NEED * season;
        ctx.fillStyle = stalled ? DEAD : WARM;
        ctx.fillRect(cx - colW / 2, yOfDD(banked), colW, groundY - yOfDD(banked));
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.3;
        ctx.strokeRect(cx - colW / 2, colTopY, colW, colH);

        // the doubt in the total, shaded around the mark it has to reach
        if (!stalled && doubt > 0) {
            const yHi = yOfDD(Math.min(COL_TOP, NEED + doubt));
            const yLo = yOfDD(Math.max(0, NEED - doubt));
            ctx.fillStyle = 'rgba(4,120,87,0.26)';
            ctx.fillRect(cx - colW / 2 - 4, yHi, colW + 8, Math.max(2, yLo - yHi));
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(cx - colW / 2 - 5, yOfDD(NEED));
        ctx.lineTo(cx + colW / 2 + 5, yOfDD(NEED));
        ctx.stroke();

        // ---- words, kept few and attached to what they name
        if (skyH >= 56) {
            if (done && plantH >= 18) {
                outlineText(ctx, 'tassel', px - 8, apexY - 4,
                    'bold 11px monospace', PLUME, 'right', fullW * 0.3);
            }
            const inBand = (y: number) => Math.max(artTop + 9, Math.min(groundY - 2, y));
            outlineText(ctx, '700 degree-days', cx - colW / 2 - 8, inBand(yOfDD(NEED) - 4),
                'bold 10px monospace', '#0f172a', 'right', fullW * 0.5);
            if (!stalled) {
                outlineText(ctx, '± ' + num(windowDays) + ' days', cx + colW / 2 + 7,
                    inBand(yOfDD(NEED) + 11), 'bold 10px monospace', DOUBT, 'left', fullW * 0.2);
            }
        }

        outlineText(ctx, stalled ? 'at 10 °C it banks nothing'
            : 'banks ' + num(perDay) + ' degree-days a day',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, stalled ? 'so it never tassels'
            : num(doubt) + ' / ' + num(perDay) + ' = ± ' + num(windowDays) + ' days',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            stalled ? DEAD : DOUBT, 'center', safeRight - 30);

        fitText(ctx, stalled ? 'it never tassels'
            : days > 365 ? 'over a year to tassel'
                : 'tassels on day ' + days.toFixed(0) + ', ± ' + num(windowDays),
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Corn banks the warmth', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, stalled ? 0 : 1 - windowDays / 20)),
                caption: 'How Sure of the Date',
                low: 'weeks either side',
                high: 'inside a day',
                stops: [DEAD, '#fcd34d', DOUBT] as [string, string, string],
            },
            note: stalled
                ? 'At 10 °C corn is exactly at its base temperature, so it banks nothing at all and never reaches 700 degree-days. There is no date to predict.'
                : 'Banking ' + num(perDay) + ' degree-days a day, corn reaches 700 on day '
                  + days.toFixed(0) + '. A ' + num(swing)
                  + ' °C daily swing leaves ' + num(doubt)
                  + ' degree-days of doubt in that total, which is ± ' + num(windowDays) + ' days.',
        };
    };

    return (
        <LabCanvas
            title="The Forecast a Plant Can Make"
            readout={({ raw }) => meanOf(raw).toFixed(1) + ' °C on average'}
            controlLabel="Mean Daily Temperature"
            controlKey="thermalMean"
            controlMin={10}
            controlMax={30}
            controlInitial={20}
            controlDisplay={raw => meanOf(raw).toFixed(1) + ' °C'}
            control2={{
                label: 'Day-to-Day Swing',
                key: 'thermalSwing',
                min: 1,
                max: 6,
                initial: 3,
                display: raw => swingOf(raw).toFixed(1) + ' °C',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Predict the thing that adds it up!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
