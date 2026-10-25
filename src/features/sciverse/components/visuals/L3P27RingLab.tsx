import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: a ring of muscle seals behind the mouthful and travels, so the food is
// enclosed and direction stops mattering -- all gravity can still do is add weight.
//
// So the second dial TILTS THE BODY. The oesophagus is a fixed 25 cm, and the dial sets
// how much of that is vertical rise: 0 cm is lying flat, 25 cm is standing on your head.
// The head stays put and the stomach swings up through the arc. The ring then travels the
// tube pushing the bolus ahead of it, or -- when the wave is too weak for the weight --
// the bolus slides back and the arrow turns round.
//
// Pressure is in centimetres of water on purpose, so the comparison the lesson makes is
// cm against cm and the picture needs no second scale to show it.
const TUBE_CM = 25;            // the oesophagus
const WALL = '#be123c';
const BOLUS = '#0369a1';
const RING = '#7f1d1d';
const WIN = '#047857';
const LOSE = '#b45309';

const strengthOf = (dial: number): number => Math.max(10, Math.min(150, Math.round(dial / 5) * 5));
const liftOf = (dial: number): number => Math.max(0, Math.min(TUBE_CM, Math.round(dial)));

export const L3P27RingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const strength = strengthOf(raw);
        const lift = liftOf(raw2);
        const flat = lift === 0;
        const margin = flat ? 99 : strength / lift;
        const carries = flat || strength > lift;
        const num = (x: number) => (Math.abs(x - Math.round(x)) < 0.05 ? x.toFixed(0) : x.toFixed(2));

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);

        // Everything is derived from the band, smallest first, so no floor can exceed the
        // space it is being fitted into -- a 7px floor on the tube and a 14px floor on
        // the reach put the whole body off an 18px stage.
        const band = Math.max(8, artBottom - artTop);
        const tubeW = Math.max(2, Math.min(band * 0.16, fullW * 0.1, 20));
        const headR = Math.max(2, Math.min(tubeW * 1.15, 16));
        const headX = left + fullW * 0.2;
        // the head is drawn BEHIND the mouth along the tube, so when the body is vertical
        // it hangs 1.9 head-radii below this point
        const headY = artBottom - headR * 1.9 - 2;
        const bulge = tubeW * 0.45;     // how far past the tube end the stomach sits
        const reach = Math.max(4, Math.min(fullW * 0.62,
            headY - artTop - tubeW * 1.45 - 2));
        const theta = Math.asin(Math.min(1, lift / TUBE_CM));
        const dx = Math.cos(theta);
        const dy = -Math.sin(theta);
        const at = (s: number) => ({ x: headX + dx * reach * s, y: headY + dy * reach * s });
        const endPt = at(1);

        // the tube wall
        ctx.strokeStyle = WALL;
        ctx.lineWidth = tubeW;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(endPt.x, endPt.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'butt';

        // the stomach at the far end
        ctx.fillStyle = '#fca5a5';
        ctx.beginPath();
        ctx.ellipse(endPt.x + dx * bulge, endPt.y + dy * bulge, tubeW * 0.95, tubeW * 0.68,
            theta, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = WALL;
        ctx.stroke();

        // the head, so the picture is unmistakably a body
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(headX - dx * headR * 0.9, headY - dy * headR * 0.9, headR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#9a3412';
        ctx.stroke();

        // where the bolus has got to: it climbs when the wave is strong enough, and
        // slides back towards the mouth when it is not
        const cycle = (t * 0.3) % 1;
        const s = carries ? 0.12 + 0.76 * cycle : 0.12 + 0.3 * (1 - cycle);
        const bolus = at(s);
        const ringAt = at(Math.max(0.03, s - 0.17));

        // the ring, pinching the tube shut behind the mouthful
        const px = -dy;
        const py = dx;
        ctx.strokeStyle = RING;
        ctx.lineWidth = 3;
        [-1, 1].forEach(side => {
            ctx.beginPath();
            ctx.moveTo(ringAt.x + px * side * tubeW * 0.72, ringAt.y + py * side * tubeW * 0.72);
            ctx.lineTo(ringAt.x + px * side * tubeW * 0.12, ringAt.y + py * side * tubeW * 0.12);
            ctx.stroke();
        });

        // the mouthful
        ctx.fillStyle = BOLUS;
        ctx.beginPath();
        ctx.ellipse(bolus.x, bolus.y, tubeW * 0.62, tubeW * 0.44, theta, 0, Math.PI * 2);
        ctx.fill();

        // and which way it is going, with the margin setting how hard
        const sign = carries ? 1 : -1;
        // the arrow runs along the tube, so its room is measured along that direction --
        // pointing straight up out of a short stage was reaching past the top
        const ux = dx * sign;
        const uy = dy * sign;
        const roomX = ux > 0 ? (left + fullW - 4 - bolus.x) / ux
            : ux < 0 ? (bolus.x - left - 4) / -ux : 9999;
        const roomY = uy > 0 ? (artBottom - 4 - bolus.y) / uy
            : uy < 0 ? (bolus.y - artTop - 4) / -uy : 9999;
        const arm = Math.min(Math.min(tubeW * 1.5, 22) * (carries ? Math.min(1, margin / 3) : 1),
            Math.max(0, Math.min(roomX, roomY) - tubeW * 0.7));
        if (arm > 5) {
            const tipX = bolus.x + dx * sign * (tubeW * 0.7 + arm);
            const tipY = bolus.y + dy * sign * (tubeW * 0.7 + arm);
            ctx.strokeStyle = carries ? WIN : LOSE;
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(bolus.x + dx * sign * tubeW * 0.7, bolus.y + dy * sign * tubeW * 0.7);
            ctx.lineTo(tipX, tipY);
            ctx.stroke();
            const back = 6;
            ctx.beginPath();
            ctx.moveTo(tipX - dx * sign * back + px * back * 0.6,
                tipY - dy * sign * back + py * back * 0.6);
            ctx.lineTo(tipX, tipY);
            ctx.lineTo(tipX - dx * sign * back - px * back * 0.6,
                tipY - dy * sign * back - py * back * 0.6);
            ctx.stroke();
        }

        if (reach >= 60) {
            outlineText(ctx, 'the ring seals here',
                Math.max(left + 2, Math.min(left + fullW - 2, ringAt.x - px * tubeW - 6)),
                Math.max(artTop + 9, Math.min(artBottom - 2, ringAt.y - py * tubeW - 5)),
                'bold 10px monospace', RING, 'center', fullW);
            outlineText(ctx, 'stomach',
                Math.max(left + 2, Math.min(left + fullW - 2, endPt.x + dx * bulge)),
                Math.max(artTop + 9, Math.min(artBottom - 2, endPt.y + dy * bulge - tubeW - 5)),
                'bold 10px monospace', WALL, 'center', fullW);
        }

        outlineText(ctx, flat ? 'lying flat: nothing to lift'
            : num(strength) + ' cm of water vs ' + lift + ' cm lift',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, flat ? 'any wave at all will do'
            : num(strength) + ' / ' + lift + ' = margin ' + num(margin),
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            carries ? WIN : LOSE, 'center', safeRight - 30);

        fitText(ctx, flat ? 'flat: it just goes'
            : carries ? 'margin ' + num(margin) + ': it goes up'
                : 'margin ' + num(margin) + ': it slides back',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A ring that seals behind it', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, flat ? 1 : margin / 4)),
                caption: 'Strength Against the Lift',
                low: 'too weak to lift it',
                high: 'three times over',
                stops: [LOSE, '#fcd34d', WIN] as [string, string, string],
            },
            note: flat
                ? 'Lying flat the mouthful is lifted nowhere, so the ring has only the food to move and any wave strength at all carries it. Tilt the body and the wave starts paying for the height.'
                : 'The mouthful must be raised ' + lift + ' cm, which costs ' + lift
                  + ' cm of water. The wave makes ' + num(strength) + ', a margin of '
                  + num(margin) + ', so it '
                  + (carries ? 'carries it to the stomach.' : 'cannot hold it and the food slides back.'),
        };
    };

    return (
        <LabCanvas
            title="Why You Can Drink Upside Down"
            readout={({ raw }) => strengthOf(raw) + ' cm of water'}
            controlLabel="Wave Strength"
            controlKey="ringStrength"
            controlMin={10}
            controlMax={150}
            controlInitial={80}
            controlDisplay={raw => strengthOf(raw) + ' cm of water'}
            control2={{
                label: 'Height Lifted',
                key: 'ringLift',
                min: 0,
                max: TUBE_CM,
                initial: 25,
                display: raw => liftOf(raw) + ' cm',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="One tool, two jobs!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
