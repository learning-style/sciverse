import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: digestion is done by an astronomical NUMBER of ordinary cutters, not by
// fast ones. The number is 3 x 10^16, which cannot be drawn -- so the canvas never
// tries. It draws a chain of 20 joins and a countable row of cutters, each cutter
// standing for 0.25 mg, and the learner reads the multiplication off the screen:
// count the cutters, multiply by what one of them gets through, and that is how much
// of the chain is cut.
//
// That keeps every number on the canvas small and every step followable, which is the
// same decision L2C22 made about the 1240 constant: the astronomical figures belong in
// the lesson, where they can be explained. The arithmetic printed here is computed
// FROM the rounded per-cutter figure, so the product shown is exactly the product of
// the numbers shown.
const BONDS = 5.6e22;          // joins in one slice of bread's starch
const PER_MG = 1.075e16;       // amylase molecules in a milligram
const WINDOW = 1800;           // s: the half hour the picture covers
const JOINS = 20;              // joins drawn, each standing for a twentieth of the slice
const STEP_MG = 0.25;          // one drawn cutter
const JOINED = '#475569';
const CUT = '#047857';
const CUTTER = '#b45309';

const mgOf = (dial: number): number =>
    Math.max(STEP_MG, Math.min(6, Math.round(dial / STEP_MG) * STEP_MG));
const cutsOf = (dial: number): number =>
    Math.max(100, Math.min(3000, Math.round(dial / 100) * 100));

export const L2C27CutterLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const mg = mgOf(raw);
        const cuts = cutsOf(raw2);
        const cutters = Math.round(mg / STEP_MG);

        // what one drawn cutter gets through in the half hour, in joins out of 20
        const exact = WINDOW * STEP_MG * PER_MG * cuts / BONDS * JOINS;
        const per = exact < 1 ? Math.round(exact * 100) / 100 : Math.round(exact * 10) / 10;
        const total = cutters * per;
        const finished = total >= JOINS;
        // floor, and never all 20 unless it really finished: a picture showing every
        // join cut while the footer says 19.6 of 20 would contradict itself
        const done = finished ? JOINS : Math.min(JOINS - 1, Math.floor(total));
        const showPer = per < 1 ? per.toFixed(2) : per.toFixed(1);
        const showTotal = total < 10 ? total.toFixed(2).replace(/0$/, '') : total.toFixed(1);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const LBL = 15;
        const MINART = 16;
        const GAPS = 14;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - MINART - GAPS) / LBL)));
        const showChainLabel = fit >= 1;
        const showCutterLabel = fit >= 2;
        const labels = (showChainLabel ? LBL : 0) + (showCutterLabel ? LBL : 0);

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        // floored below any stage height that renders, and capped by what is left after
        // the label rows are reserved, so the drawing can never outgrow the band
        const artRoom = Math.max(6, usable - labels - GAPS);
        const beadR = Math.max(2, Math.min(fullW / (JOINS + 1) / 2.6, artRoom * 0.28, 9));
        const cutR = Math.max(1.5, Math.min(fullW / 24 / 2.8, artRoom * 0.2, 6));

        const blockH = beadR * 2 + 4 + (showChainLabel ? LBL : 0) + 6
            + cutR * 2 + 4 + (showCutterLabel ? LBL : 0);
        let y = artTop + Math.max(0, (usable - blockH) / 2);

        // the chain: 21 glucose beads with 20 joins between them, the cut ones pulled
        // apart so the count is read off the picture rather than off a caption
        const chainCy = y + beadR;
        const spanW = fullW - beadR * 2;
        const xOf = (i: number) => left + beadR + spanW * (i / JOINS);
        const pull = Math.min(beadR * 0.5, spanW / JOINS * 0.3);
        const beadX = (i: number) => xOf(i) - (i < done ? pull : 0);

        for (let j = 0; j < JOINS; j++) {
            if (j < done) continue;
            ctx.strokeStyle = JOINED;
            ctx.lineWidth = Math.max(1, beadR * 0.4);
            ctx.beginPath();
            ctx.moveTo(beadX(j), chainCy);
            ctx.lineTo(beadX(j + 1), chainCy);
            ctx.stroke();
        }
        for (let i = 0; i <= JOINS; i++) {
            ctx.fillStyle = i < done ? CUT : JOINED;
            ctx.beginPath();
            ctx.arc(beadX(i), chainCy, beadR, 0, Math.PI * 2);
            ctx.fill();
        }
        // where the cutting has reached, pulsing so it reads as work in progress
        if (done > 0 && done < JOINS && beadR >= 3) {
            const flash = 0.45 + 0.55 * Math.abs(Math.sin(t * 2.2));
            ctx.strokeStyle = CUT;
            ctx.globalAlpha = flash;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(beadX(done) - pull - 1, chainCy - beadR - 3);
            ctx.lineTo(beadX(done) - pull - 1, chainCy + beadR + 3);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        y += beadR * 2 + 4;

        const chainLabelY = showChainLabel ? y + 11 : 0;
        if (showChainLabel) y += LBL;
        y += 6;

        // the cutters, one per 0.25 mg, so the amount on the dial is a count on screen
        const cutterCy = y + cutR;
        const cutterStep = Math.min(cutR * 2.8, fullW / 24);
        const cutterW = cutterStep * (cutters - 1);
        const cutterLeft = left + Math.max(0, (fullW - cutterW) / 2);
        for (let k = 0; k < cutters; k++) {
            const cxk = cutters === 1 ? left + fullW / 2 : cutterLeft + cutterStep * k;
            ctx.fillStyle = CUTTER;
            ctx.beginPath();
            ctx.arc(cxk, cutterCy, cutR, 0, Math.PI * 2);
            ctx.fill();
        }
        y += cutR * 2 + 4;
        const cutterLabelY = showCutterLabel ? y + 11 : 0;

        if (showChainLabel) {
            outlineText(ctx, 'cut ' + done + ', still joined ' + (JOINS - done),
                safeRight / 2, chainLabelY, 'bold 11px monospace', done > 0 ? CUT : JOINED,
                'center', fullW);
        }
        if (showCutterLabel) {
            outlineText(ctx, cutters + ' cutters, 0.25 mg each',
                safeRight / 2, cutterLabelY, 'bold 11px monospace', CUTTER, 'center', fullW);
        }

        outlineText(ctx, 'one cutter: ' + showPer + ' of 20 joins',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', CUTTER, 'center', safeRight - 30);
        outlineText(ctx, cutters + ' x ' + showPer + ' = ' + showTotal
            + (finished ? ', all 20 cut' : ' of 20'),
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            finished ? CUT : JOINED, 'center', safeRight - 30);

        fitText(ctx, finished ? 'all 20 joins cut' : done + ' of 20 joins cut',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Half an hour of cutting', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, total / JOINS)),
                caption: 'Joins Cut in Half an Hour',
                low: 'nothing cut',
                high: 'all cut: finished',
                stops: ['#fef3c7', '#6ee7b7', CUT] as [string, string, string],
            },
            note: cutters + ' cutters is ' + mg.toFixed(2).replace(/\.?0+$/, '')
                + ' mg of amylase, and at ' + cuts + ' cuts a second each one gets through '
                + showPer + ' of the 20 joins in half an hour. '
                + (finished ? 'Together they finish the slice.' : 'Together they fall short.'),
        };
    };

    return (
        <LabCanvas
            title="How Many Cutters?"
            readout={({ raw }) => mgOf(raw).toFixed(2).replace(/\.?0+$/, '') + ' mg of amylase'}
            controlLabel="Amylase"
            controlKey="amylaseMg"
            controlMin={STEP_MG}
            controlMax={6}
            controlInitial={3}
            controlDisplay={raw => mgOf(raw).toFixed(2).replace(/\.?0+$/, '') + ' mg'}
            control2={{
                label: 'Cuts Per Second',
                key: 'cutsPerSecond',
                min: 100,
                max: 3000,
                initial: 1000,
                display: raw => cutsOf(raw) + ' cuts/s',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="Numbers, not speed!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
