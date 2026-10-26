import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// A reader said the old picture was a line and that you could not tell where any of
// this was happening. It was a plain capsule divided into segments -- the arithmetic
// with no anatomy -- so this draws the organ instead.
//
// The small intestine is drawn COILED, as a serpentine of loops out of the stomach, and
// the length dial adds and removes loops because the drawn path length is proportional
// to the real centimetres. The first stretch along that path -- the length one slice of
// bread actually needs -- is marked in one colour and everything past it is spare, so
// the margin is read by following the tube rather than off a bar. When the enzyme is low
// the needed stretch runs past the end of the coil and the overrun is the share of the
// meal that leaves uncut.
const BONDS = 5.6e22;
const PER_MG = 1.075e16;
const CUTS = 1000;             // cuts per second per molecule, held at L2C27's figure
const SPEED = 0.04;            // cm/s, how fast food advances (L2P27)
const MAX_CM = 700;
const WORKING = '#b45309';
const SPARE = '#047857';
const LOST = '#be123c';
const WALL = '#9f1239';
const STOMACH = '#fda4af';

const lengthOf = (dial: number): number => Math.max(50, Math.min(MAX_CM, Math.round(dial / 10) * 10));
const mgOf = (dial: number): number => Math.max(0.5, Math.min(6, Math.round(dial * 4) / 4));

export const L2B27MarginLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const cm = lengthOf(raw);
        const mg = mgOf(raw2);
        const exact = BONDS / (mg * PER_MG * CUTS) * SPEED;
        const need = exact < 100 ? Math.round(exact * 10) / 10 : Math.round(exact);
        const margin = cm / need;
        const enough = margin >= 1;
        const share = Math.min(1, margin);
        const showNeed = need < 100 ? need.toFixed(1) : need.toFixed(0);
        const showMargin = margin < 10 ? margin.toFixed(margin < 1 ? 2 : 1) : margin.toFixed(1);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const showLabels = band >= 84;
        const coilH = Math.max(4, band - (showLabels ? LBL : 0) - 4);
        const coilTop = artTop + 2;

        // the coil: loops appear only where there is room for them, and on a band too
        // short for any it degrades to a single run rather than overflowing
        const rows = Math.max(1, Math.min(Math.floor(coilH / 12), 9));
        const gap = coilH / rows;
        const bend = gap / 2;
        // the stroke reaches tubeW/2 past the path, so the run has to reserve it or the
        // outward bulge of a loop clears the right edge
        const tubeW = Math.max(1.5, Math.min(gap * 0.5, 13));
        const runW = Math.max(16, fullW - gap - 6 - tubeW);
        const x0 = left + bend + 3 + tubeW / 2;
        const bendLen = Math.PI * bend;
        const rowTop = (i: number) => coilTop + bend + i * gap;
        // the whole coil holds MAX_CM, so the drawn length really is the real length
        const capacity = rows * runW + (rows - 1) * bendLen;
        const pxPerCm = capacity / MAX_CM;

        // where along the coil a given arc length lands
        const posAt = (sPx: number) => {
            let s = Math.max(0, Math.min(capacity, sPx));
            for (let i = 0; i < rows; i++) {
                const even = i % 2 === 0;
                if (s <= runW) {
                    return { x: even ? x0 + s : x0 + runW - s, y: rowTop(i) };
                }
                s -= runW;
                if (i === rows - 1) return { x: even ? x0 + runW : x0, y: rowTop(i) };
                if (s <= bendLen) {
                    const phi = -Math.PI / 2 + (s / bendLen) * Math.PI;
                    const cxb = even ? x0 + runW : x0;
                    return {
                        x: cxb + (even ? 1 : -1) * bend * Math.cos(phi),
                        y: rowTop(i) + bend + bend * Math.sin(phi),
                    };
                }
                s -= bendLen;
            }
            return { x: x0 + runW, y: rowTop(rows - 1) };
        };

        const stroke = (fromPx: number, toPx: number, colour: string, width: number) => {
            if (toPx <= fromPx) return;
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.beginPath();
            const steps = Math.max(2, Math.ceil((toPx - fromPx) / 4));
            for (let k = 0; k <= steps; k++) {
                const p = posAt(fromPx + (toPx - fromPx) * (k / steps));
                if (k === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            ctx.lineCap = 'butt';
        };

        const endPx = cm * pxPerCm;
        const needPx = Math.min(endPx, need * pxPerCm);

        // the whole organ faintly, then the two stretches over it
        stroke(0, endPx, '#fecdd3', tubeW + 2);
        stroke(0, needPx, WORKING, tubeW);
        if (enough) stroke(needPx, endPx, SPARE, tubeW);

        // what the tube is too short to finish, drawn running on past its end
        if (!enough) {
            const wantPx = Math.min(capacity, need * pxPerCm);
            ctx.save();
            ctx.setLineDash([4, 4]);
            stroke(endPx, wantPx, LOST, tubeW * 0.8);
            ctx.restore();
            ctx.setLineDash([]);
        }

        // the stomach, so it is clear which end the food comes in at
        // capped by the room above the first loop, or the stomach pokes out of the stage
        const sr = Math.max(3, Math.min(tubeW * 1.5, 13, rowTop(0) - artTop - 2));
        ctx.fillStyle = STOMACH;
        ctx.beginPath();
        ctx.ellipse(x0, rowTop(0) - sr * 0.1, sr * 1.15, sr * 0.85, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = WALL;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // food travelling down the coil, so the drawing reads as a journey
        if (tubeW >= 5) {
            const at = posAt(endPx * ((t * 0.12) % 1));
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(at.x, at.y, Math.max(1.4, tubeW * 0.26), 0, Math.PI * 2);
            ctx.fill();
        }

        if (showLabels) {
            const midNeed = posAt(needPx * 0.5);
            outlineText(ctx, 'one needs ' + showNeed + ' cm',
                Math.max(left + 2, Math.min(left + fullW - 2, midNeed.x)),
                Math.max(artTop + 9, midNeed.y - tubeW - 5),
                'bold 10px monospace', WORKING, 'center', fullW);
            if (enough && endPx - needPx > capacity * 0.08) {
                const midSpare = posAt((needPx + endPx) / 2);
                outlineText(ctx, 'spare',
                    Math.max(left + 2, Math.min(left + fullW - 2, midSpare.x)),
                    Math.min(artBottom - 4, midSpare.y + tubeW + 11),
                    'bold 10px monospace', SPARE, 'center', fullW);
            }
            outlineText(ctx, cm + ' cm of small intestine', safeRight / 2,
                Math.min(artBottom - 3, coilTop + coilH + 12),
                'bold 11px monospace', WALL, 'center', safeRight - 24);
        }

        outlineText(ctx, cm + ' cm / ' + showNeed + ' cm = ' + showMargin,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, enough ? 'finishes ' + showMargin + ' times over'
            : 'too short: ' + Math.round((1 - share) * 100) + '% leaves uncut',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            enough ? SPARE : LOST, 'center', safeRight - 30);

        fitText(ctx, enough ? showMargin + ' lengths fit' : 'only ' + showMargin + ' of one fits',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Lengths one slice needs', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: share,
                caption: 'How Much of the Meal Is Cut',
                low: 'part of it leaves uncut',
                high: 'all of it cut',
                stops: [LOST, '#fcd34d', SPARE] as [string, string, string],
            },
            note: 'From the stomach, food travels ' + cm
                + ' cm of coiled small intestine. ' + mg.toFixed(2).replace(/\.?0+$/, '')
                + ' mg of amylase needs ' + showNeed + ' cm of it to finish a slice of bread, so it '
                + (enough ? 'finishes ' + showMargin + ' times over and the rest is spare.'
                    : 'never finishes and ' + Math.round((1 - share) * 100)
                      + '% leaves uncut.'),
        };
    };

    return (
        <LabCanvas
            title="Why the Tube Is So Long"
            readout={({ raw }) => lengthOf(raw) + ' cm of small intestine'}
            controlLabel="Tube Length"
            controlKey="tubeLength"
            controlMin={50}
            controlMax={MAX_CM}
            controlInitial={600}
            controlDisplay={raw => lengthOf(raw) + ' cm'}
            control2={{
                label: 'Amylase',
                key: 'marginAmylase',
                min: 0.5,
                max: 6,
                initial: 3,
                display: raw => mgOf(raw).toFixed(2).replace(/\.?0+$/, '') + ' mg',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Big Idea 27 Level 2 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="The length buys time, not area!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
