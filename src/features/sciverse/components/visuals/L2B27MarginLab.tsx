import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the small intestine is nearly nine times longer than the job requires, and
// that surplus is what survives a bad day. So the tube is drawn and DIVIDED into the
// length one slice of bread needs -- the first division does the whole job, every
// division after it is spare, and the learner counts them. The margin is a count on
// screen rather than a quotient in a caption.
//
// Both regimes come out of one scale. Whichever is longer -- the tube or the length
// needed -- fills the width, so when the enzyme is low the needed length overruns the
// tube's end and the overrun is the share of the meal that leaves uncut. Nothing
// switches drawing style between the two cases.
const BONDS = 5.6e22;
const PER_MG = 1.075e16;
const CUTS = 1000;             // cuts per second per molecule, held at L2C27's figure
const SPEED = 0.04;            // cm/s, how fast food advances (L2P27)
const WORKING = '#b45309';
const SPARE = '#047857';
const LOST = '#be123c';
const WALL = '#475569';

const lengthOf = (dial: number): number => Math.max(50, Math.min(700, Math.round(dial / 10) * 10));
const mgOf = (dial: number): number => Math.max(0.5, Math.min(6, Math.round(dial * 4) / 4));

export const L2B27MarginLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const cm = lengthOf(raw);
        const mg = mgOf(raw2);
        // the length of tube one slice of bread's starch needs, at the precision the
        // canvas prints -- so the division shown below is the division of the numbers shown
        const exact = BONDS / (mg * PER_MG * CUTS) * SPEED;
        const need = exact < 100 ? Math.round(exact * 10) / 10 : Math.round(exact);
        const margin = cm / need;
        const enough = margin >= 1;
        const share = Math.min(1, margin);
        const showNeed = need < 100 ? need.toFixed(1) : need.toFixed(0);
        const showMargin = margin < 10 ? margin.toFixed(margin < 1 ? 2 : 1) : margin.toFixed(1);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const LBL = 15;
        const MINART = 14;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - MINART) / LBL)));
        const showTubeLabel = fit >= 1;
        const showNeedLabel = fit >= 2;
        const labels = (showTubeLabel ? LBL : 0) + (showNeedLabel ? LBL : 0);

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        // floored below any stage height that renders and capped by what the label rows
        // leave, so the tube can never be taller than the band it is drawn in
        const tubeH = Math.max(8, Math.min(usable - labels, 46));
        const blockH = tubeH + labels;
        let y = artTop + Math.max(0, (usable - blockH) / 2);

        const needLabelY = showNeedLabel ? y + 11 : 0;
        if (showNeedLabel) y += LBL;
        const tubeTop = y;
        const tubeMid = tubeTop + tubeH / 2;
        y += tubeH;
        const tubeLabelY = showTubeLabel ? y + 12 : 0;

        // one scale for both: the longer of the two fills the width
        const scale = Math.max(cm, need);
        const tubeW = fullW * (cm / scale);
        const needW = fullW * (need / scale);
        const r = Math.min(tubeH / 2, 10);

        // the tube wall
        const capsule = (x: number, w: number) => {
            ctx.beginPath();
            const rr = Math.min(r, w / 2);
            ctx.moveTo(x + rr, tubeTop);
            ctx.lineTo(x + w - rr, tubeTop);
            ctx.quadraticCurveTo(x + w, tubeTop, x + w, tubeTop + rr);
            ctx.lineTo(x + w, tubeTop + tubeH - rr);
            ctx.quadraticCurveTo(x + w, tubeTop + tubeH, x + w - rr, tubeTop + tubeH);
            ctx.lineTo(x + rr, tubeTop + tubeH);
            ctx.quadraticCurveTo(x, tubeTop + tubeH, x, tubeTop + tubeH - rr);
            ctx.lineTo(x, tubeTop + rr);
            ctx.quadraticCurveTo(x, tubeTop, x + rr, tubeTop);
            ctx.closePath();
        };
        ctx.fillStyle = '#f1f5f9';
        capsule(left, tubeW);
        ctx.fill();

        // the first division does the whole job; every division after it is spare
        ctx.save();
        capsule(left, tubeW);
        ctx.clip();
        ctx.fillStyle = WORKING;
        ctx.fillRect(left, tubeTop, Math.min(needW, tubeW), tubeH);
        if (enough) {
            ctx.fillStyle = SPARE;
            ctx.fillRect(left + needW, tubeTop, tubeW - needW, tubeH);
            // the divisions, so the margin can be counted off the tube
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.4;
            for (let k = 1; k * needW < tubeW - 0.5; k++) {
                ctx.beginPath();
                ctx.moveTo(left + k * needW, tubeTop);
                ctx.lineTo(left + k * needW, tubeTop + tubeH);
                ctx.stroke();
            }
        }
        ctx.restore();
        ctx.strokeStyle = WALL;
        ctx.lineWidth = 1.6;
        capsule(left, tubeW);
        ctx.stroke();

        // what the tube is too short to reach, drawn past its end
        if (!enough) {
            const lostX = left + tubeW;
            const lostW = needW - tubeW;
            ctx.strokeStyle = LOST;
            ctx.lineWidth = 1.4;
            ctx.setLineDash([4, 3]);
            ctx.strokeRect(lostX, tubeTop + 2, lostW, tubeH - 4);
            ctx.setLineDash([]);
            ctx.fillStyle = 'rgba(190,18,60,0.16)';
            ctx.fillRect(lostX, tubeTop + 2, lostW, tubeH - 4);
        }

        // the food advancing, so the tube reads as something being travelled along
        if (tubeH >= 14) {
            const at = (t * 0.18) % 1;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(left + tubeW * at, tubeTop + tubeH * 0.27,
                Math.max(1.6, tubeH * 0.1), 0, Math.PI * 2);
            ctx.fill();
        }

        // The two regions carried their meaning in colour alone, which a reader who
        // only looks at the picture has no way to decode: the tube past the first
        // division is spare, and the part drawn beyond the tube's end is the share of
        // the meal that leaves uncut. Each is named inside itself, and only when the
        // region is wide enough and the tube deep enough to hold the word.
        if (tubeH >= 20) {
            const spareW = tubeW - needW;
            const overW = needW - tubeW;
            if (enough && spareW >= 40) {
                outlineText(ctx, 'spare', left + needW + spareW / 2, tubeMid + 4,
                    'bold 10px monospace', '#ffffff', 'center', spareW - 6);
            } else if (!enough && overW >= 58) {
                outlineText(ctx, 'never cut', left + tubeW + overW / 2, tubeMid + 4,
                    'bold 10px monospace', LOST, 'center', overW - 6);
            }
        }

        if (showNeedLabel) {
            outlineText(ctx, 'one needs ' + showNeed + ' cm', left, needLabelY,
                'bold 11px monospace', WORKING, 'left', fullW);
        }
        if (showTubeLabel) {
            outlineText(ctx, cm + ' cm of small intestine', safeRight / 2, tubeLabelY,
                'bold 11px monospace', WALL, 'center', fullW);
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
            note: mg.toFixed(2).replace(/\.?0+$/, '') + ' mg of amylase needs ' + showNeed
                + ' cm of tube to finish a slice of bread, and there is ' + cm + ' cm. '
                + (enough ? 'So it finishes ' + showMargin + ' times over, and all but the first length is spare.'
                    : 'So it never finishes, and ' + Math.round((1 - share) * 100)
                      + '% of the starch leaves uncut.'),
        };
    };

    return (
        <LabCanvas
            title="Why the Tube Is So Long"
            readout={({ raw }) => lengthOf(raw) + ' cm of small intestine'}
            controlLabel="Tube Length"
            controlKey="tubeLength"
            controlMin={50}
            controlMax={700}
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
