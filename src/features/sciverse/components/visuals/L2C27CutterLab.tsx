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
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        // one row per string, dropped from the bottom up -- the coil label and the chain
        // label used to share a row and overlapped by 31px at the narrow panel
        const fit = Math.max(0, Math.min(3, Math.floor((band - 30) / LBL)));
        const rowsH = fit * LBL;
        const artH = Math.max(6, band - rowsH - 4);
        const showLens = artH >= 24;
        const artMid = artTop + 2 + artH / 2;

        // ---- the organ, so it is clear where any of this is happening: a coil of small
        // intestine out of the stomach, with the patch the close-up comes from marked.
        const coilW = fullW * 0.33;
        const coilX = left + 2;
        const coilRows = Math.max(1, Math.min(Math.floor(artH / 11), 6));
        const coilGap = Math.min(artH / coilRows, 16);
        const coilTube = Math.max(1.5, Math.min(coilGap * 0.42, 7));
        const coilRun = Math.max(12, coilW - coilGap - coilTube);
        const cx0 = coilX + coilGap / 2 + coilTube / 2;
        const coilTop = artMid - (coilRows - 1) * coilGap / 2;
        ctx.strokeStyle = '#fda4af';
        ctx.lineWidth = coilTube + 1.5;
        ctx.lineCap = 'round';
        for (let i = 0; i < coilRows; i++) {
            const y = coilTop + i * coilGap;
            ctx.beginPath();
            ctx.moveTo(cx0, y);
            ctx.lineTo(cx0 + coilRun, y);
            ctx.stroke();
            if (i < coilRows - 1) {
                const even = i % 2 === 0;
                ctx.beginPath();
                ctx.arc(even ? cx0 + coilRun : cx0, y + coilGap / 2, coilGap / 2,
                    even ? -Math.PI / 2 : Math.PI / 2, even ? Math.PI / 2 : Math.PI * 1.5);
                ctx.stroke();
            }
        }
        ctx.lineCap = 'butt';
        // the stomach at the inlet
        const sr = Math.max(3, Math.min(coilTube * 1.6, 11, coilTop - artTop - 3));
        ctx.fillStyle = '#fb7185';
        ctx.beginPath();
        ctx.ellipse(cx0, coilTop - sr * 0.1, sr * 1.15, sr * 0.8, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 1.1;
        ctx.stroke();
        // the patch the close-up is taken from
        const patchRow = Math.min(coilRows - 1, Math.floor(coilRows / 2));
        const patchX = cx0 + coilRun * 0.6;
        const patchY = coilTop + patchRow * coilGap;
        const patchR = Math.max(3, coilTube * 0.9);
        ctx.strokeStyle = CUT;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(patchX, patchY, patchR, 0, Math.PI * 2);
        ctx.stroke();

        // ---- the close-up: the starch chain inside that patch, with the cutters
        const zoneX = left + fullW * 0.38;
        const zoneW = fullW * 0.62;
        const zoneCx = zoneX + zoneW / 2;
        const zoneR = Math.max(3, Math.min(zoneW / 2 - 2, artH / 2 - 1));
        // leader lines from the patch to the close-up
        if (showLens) {
        ctx.strokeStyle = CUT;
        ctx.lineWidth = 0.9;
        [-1, 1].forEach(side => {
            ctx.beginPath();
            ctx.moveTo(patchX + patchR * 0.7, patchY + side * patchR * 0.7);
            ctx.lineTo(zoneCx - zoneR * 0.95, artMid + side * zoneR * 0.5);
            ctx.stroke();
        });
        ctx.fillStyle = 'rgba(255,255,255,0.72)';
        ctx.beginPath();
        ctx.arc(zoneCx, artMid, zoneR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = CUT;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // the chain: 21 glucose beads with 20 joins, the cut ones pulled apart, so the
        // count is read off the picture rather than off a caption
        const chainW = zoneR * 1.6;
        const beadR = Math.max(1.4, Math.min(chainW / (JOINS + 1) / 2.4, zoneR * 0.11, 6));
        const chainY = artMid - zoneR * 0.3;
        const spanW = chainW - beadR * 2;
        const xOf = (i: number) => zoneCx - chainW / 2 + beadR + spanW * (i / JOINS);
        const pull = Math.min(beadR * 0.5, spanW / JOINS * 0.3);
        const beadX = (i: number) => xOf(i) - (i < done ? pull : 0);
        for (let j = done; j < JOINS; j++) {
            ctx.strokeStyle = JOINED;
            ctx.lineWidth = Math.max(0.8, beadR * 0.4);
            ctx.beginPath();
            ctx.moveTo(beadX(j), chainY);
            ctx.lineTo(beadX(j + 1), chainY);
            ctx.stroke();
        }
        for (let i = 0; i <= JOINS; i++) {
            ctx.fillStyle = i < done ? CUT : JOINED;
            ctx.beginPath();
            ctx.arc(beadX(i), chainY, beadR, 0, Math.PI * 2);
            ctx.fill();
        }
        if (done > 0 && done < JOINS && beadR >= 2.4) {
            const flash = 0.45 + 0.55 * Math.abs(Math.sin(t * 2.2));
            ctx.strokeStyle = CUT;
            ctx.globalAlpha = flash;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(beadX(done) - pull - 1, chainY - beadR - 2.5);
            ctx.lineTo(beadX(done) - pull - 1, chainY + beadR + 2.5);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // the cutters, one drawn per 0.25 mg, afloat in the fluid below the chain
        const cutR = Math.max(0.8, Math.min(zoneR * 0.075, 4.5));
        const perRow = Math.max(1, Math.ceil(cutters / 2));
        const cutStep = Math.min(cutR * 2.8, (zoneR * 1.5) / Math.max(1, perRow - 1 || 1));
        for (let k = 0; k < cutters; k++) {
            const row = k < perRow ? 0 : 1;
            const idx = k < perRow ? k : k - perRow;
            const n = row === 0 ? Math.min(perRow, cutters) : cutters - perRow;
            const wobble = Math.sin(t * 1.7 + k) * cutR * 0.35;
            const cxk = zoneCx - cutStep * (n - 1) / 2 + cutStep * idx;
            const cyk = artMid + zoneR * (0.34 + row * 0.26) + wobble;
            ctx.fillStyle = CUTTER;
            ctx.beginPath();
            ctx.arc(cxk, cyk, cutR, 0, Math.PI * 2);
            ctx.fill();
        }
        }

        const rowY = (i: number) => artTop + 2 + artH + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, 'cut ' + done + ', still joined ' + (JOINS - done),
                safeRight / 2, rowY(0),
                'bold 11px monospace', done > 0 ? CUT : JOINED, 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, cutters + ' cutters, 0.25 mg each',
                safeRight / 2, rowY(1), 'bold 11px monospace', CUTTER, 'center', safeRight - 24);
        }
        if (fit >= 3) {
            outlineText(ctx, 'small intestine, close up',
                safeRight / 2, rowY(2), 'bold 10px monospace', '#9f1239', 'center', safeRight - 24);
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
            note: 'Inside the small intestine, ' + cutters + ' cutters is '
                + mg.toFixed(2).replace(/\.?0+$/, '')
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
