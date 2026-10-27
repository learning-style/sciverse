import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the last enzymes are bolted to the wall, so the food has to be pressed
// against it -- and that is bought by squeezes, not by time. The picture is a stretch of
// gut from the side with the fixed enzymes drawn as teeth on the lining, food in the
// middle, and rings of muscle that tighten and release IN PLACE, pushing the contents
// out to the wall each time. They deliberately do not travel: that is the visual
// contrast with L3P27's ring, and it is what a segmenting contraction is.
const SPEED = 0.04;            // cm/s, food advance (L2P27)
const NEED = 1736;             // s, the amylase job (L2C27)
const SITES = 3;
const WALL = '#be123c';
const TEETH = '#7f1d1d';
const FOOD = '#b45309';
const HIT = '#047857';

const lengthOf = (dial: number): number => Math.max(50, Math.min(700, Math.round(dial / 10) * 10));
const rateOf = (dial: number): number => Math.max(2, Math.min(20, Math.round(dial)));

export const L3B27ContactLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const cm = lengthOf(raw);
        const rate = rateOf(raw2);
        const secs = cm / SPEED;
        const margin = secs / NEED;
        const presses = secs * rate / 60;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);

        // the gut in section: lumen between two linings, all sized from the band
        const LBL = 15;
        const showLabel = band >= 76;
        const tubeH = Math.max(4, Math.min(band - (showLabel ? LBL : 0) - 6, 120));
        const midY = artTop + (band - (showLabel ? LBL : 0)) / 2;
        const half = tubeH / 2;
        const wallT = Math.max(2, Math.min(tubeH * 0.1, 7));

        // squeezes tighten and release in place; sped up so the rhythm is visible
        const beat = (t * rate / 60 * 12) % 1;
        const tight = (1 - Math.cos(beat * Math.PI * 2)) / 2;

        const lumen = (x: number) => {
            // how far the lining bulges inward at x, summed over the squeeze sites
            let pinch = 0;
            for (let k = 0; k < SITES; k++) {
                const sx = left + fullW * (0.2 + 0.3 * k);
                const d = (x - sx) / (fullW * 0.1);
                pinch = Math.max(pinch, Math.exp(-d * d) * tight);
            }
            return half * (1 - 0.72 * pinch);
        };

        // the two linings
        [-1, 1].forEach(side => {
            ctx.strokeStyle = WALL;
            ctx.lineWidth = wallT;
            ctx.beginPath();
            for (let x = left; x <= left + fullW; x += 3) {
                const y = midY + side * lumen(x);
                if (x === left) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            // the fixed enzymes, as teeth facing into the lumen
            if (tubeH >= 26) {
                ctx.strokeStyle = TEETH;
                ctx.lineWidth = 1.3;
                for (let x = left + 4; x <= left + fullW - 4; x += 7) {
                    const y = midY + side * lumen(x);
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y - side * Math.min(5, tubeH * 0.1));
                    ctx.stroke();
                }
            }
        });

        // the food: pushed out to the lining as each squeeze tightens
        const dotR = Math.max(1.6, Math.min(tubeH * 0.07, 5));
        for (let i = 0; i < 14; i++) {
            const fx = left + fullW * (0.06 + 0.88 * (i / 13));
            const room = Math.max(dotR, lumen(fx) - wallT / 2 - dotR);
            const side = i % 2 === 0 ? -1 : 1;
            const touching = tight > 0.72;
            const fy = midY + side * room * (0.25 + 0.75 * tight);
            ctx.fillStyle = touching ? HIT : FOOD;
            ctx.beginPath();
            ctx.arc(fx, fy, dotR, 0, Math.PI * 2);
            ctx.fill();
        }

        if (showLabel) {
            outlineText(ctx, 'enzymes fixed here', left + 2,
                Math.min(artBottom - 4, midY + half + wallT + 13),
                'bold 10px monospace', TEETH, 'left', fullW);
        }

        outlineText(ctx, secs.toFixed(0) + ' s at ' + rate + '/min = '
            + presses.toFixed(0),
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', HIT, 'center', safeRight - 30);
        outlineText(ctx, 'margin ' + margin.toFixed(1) + ', unchanged',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, presses.toFixed(0) + ' presses on the wall',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Fixed enzymes need contact', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, presses / 5000)),
                caption: 'Presses Against the Wall',
                low: 'barely touches it',
                high: 'twice the healthy count',
                stops: [FOOD, '#fcd34d', HIT] as [string, string, string],
            },
            note: cm + ' cm at ' + SPEED + ' cm/s keeps food in for ' + secs.toFixed(0)
                + ' s, and ' + rate + ' squeezes a minute press it against the wall '
                + presses.toFixed(0) + ' times. The amylase margin is '
                + margin.toFixed(1) + ', and the rate dial cannot change it.',
        };
    };

    return (
        <LabCanvas
            title="The Job the Length Cannot Do"
            readout={({ raw }) => lengthOf(raw) + ' cm of tube'}
            controlLabel="Tube Length"
            controlKey="contactLength"
            controlMin={50}
            controlMax={700}
            controlInitial={600}
            controlDisplay={raw => lengthOf(raw) + ' cm'}
            control2={{
                label: 'Contraction Rate',
                key: 'contactRate',
                min: 2,
                max: 20,
                initial: 10,
                display: raw => rateOf(raw) + ' a minute',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Big Idea 27 Level 3 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="Two jobs with one muscle!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
