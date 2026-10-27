import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// This replaces a lab that charted an arithmetic argument. A reader said the Level 3
// biology lessons would lose biology students, so this one draws the structure the
// lesson is about and lets the dials take it apart.
//
// What is drawn: one lining cell's membrane along the bottom, the microvilli rising from
// it, and on each one an enzyme -- a stalk through the membrane and a head with a notch,
// which is the active site -- with a transporter channel beside it. Above, the short
// joined pieces amylase leaves behind. A press drives them onto the surface; where one
// meets an active site the join breaks and the two sugars go down through the channel.
//
// Turning the microvilli dial to zero is the coeliac picture: the enzymes go with the
// carpet, and pieces drift past a smooth wall with nothing to meet.
const MAX_VILLI = 24;
const MEMBRANE = '#9f1239';
const VILLUS = '#fb7185';
const ENZYME = '#047857';
const CHANNEL = '#1d4ed8';
const PIECE = '#b45309';
const SUGAR = '#f59e0b';

const villiOf = (dial: number): number => Math.max(0, Math.min(MAX_VILLI, Math.round(dial)));
const pressOf = (dial: number): number => Math.max(2, Math.min(20, Math.round(dial)));

export const L3B27BrushBorderLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const villi = villiOf(raw);
        const press = pressOf(raw2);
        // how much of the last 3% gets finished, as a share of a healthy border
        const share = Math.max(0, Math.min(1, (villi / 18) * (press / 10)));
        const pct = Math.round(share * 100);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const fit = Math.max(0, Math.min(2, Math.floor((band - 26) / LBL)));
        const artH = Math.max(4, band - fit * LBL - 4);
        const artBase = artTop + 2 + artH;

        // ---- the cell and its membrane along the bottom
        const memT = Math.max(1, Math.min(artH * 0.08, 9));
        const memY = artBase - memT * 2.4;
        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(left, memY + memT, fullW, artBase - memY - memT);
        ctx.strokeStyle = MEMBRANE;
        ctx.lineWidth = memT;
        ctx.beginPath();
        ctx.moveTo(left, memY + memT / 2);
        ctx.lineTo(left + fullW, memY + memT / 2);
        ctx.stroke();

        // ---- the microvilli, and the enzymes studding them
        const slot = fullW / MAX_VILLI;
        const vW = Math.max(1.5, Math.min(slot * 0.42, 11));
        // capped by the room above the membrane, or a tall villus leaves the stage
        const vH = Math.max(2, Math.min(artH * 0.46, 72, memY - artTop - 6));
        const headR = Math.max(1.2, Math.min(vW * 0.44, 5));
        for (let i = 0; i < villi; i++) {
            const vx = left + slot * (i + 0.5);
            const sway = Math.sin(t * 1.1 + i * 0.8) * vW * 0.18;
            ctx.strokeStyle = VILLUS;
            ctx.lineWidth = vW;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(vx, memY);
            ctx.lineTo(vx + sway, memY - vH);
            ctx.stroke();
            ctx.lineCap = 'butt';
            // an enzyme on its side: a stalk and a head with a notch for the active site
            if (vW >= 4 && vH >= 16) {
                const ey = memY - vH * 0.62;
                let side = i % 2 === 0 ? 1 : -1;
                // flipped where the head would otherwise reach past an edge
                if (vx + side * headR * 2.3 - headR < left + 1) side = 1;
                if (vx + side * headR * 2.3 + headR > left + fullW - 1) side = -1;
                ctx.strokeStyle = ENZYME;
                ctx.lineWidth = Math.max(1, vW * 0.17);
                ctx.beginPath();
                ctx.moveTo(vx + sway * 0.6, ey);
                ctx.lineTo(vx + sway * 0.6 + side * headR * 1.5, ey);
                ctx.stroke();
                ctx.fillStyle = ENZYME;
                ctx.beginPath();
                ctx.arc(vx + sway * 0.6 + side * headR * 2.3, ey, headR, 0, Math.PI * 2);
                ctx.fill();
                // the notch: a bite out of the head, facing the gut
                ctx.fillStyle = '#ecfdf5';
                ctx.beginPath();
                ctx.arc(vx + sway * 0.6 + side * headR * 2.3, ey - headR * 0.62,
                    headR * 0.52, 0, Math.PI * 2);
                ctx.fill();
            }
            // a transporter channel through the membrane beside it
            if (vW >= 3.4) {
                ctx.fillStyle = CHANNEL;
                ctx.fillRect(vx - vW * 0.62 - Math.max(1, vW * 0.22), memY - 1,
                    Math.max(1.2, vW * 0.26), memT + 2);
            }
        }

        // ---- the gut contents above: short joined pieces, pressed down and cut
        const lumenTop = artTop + 2;
        const lumenH = Math.max(4, memY - vH - lumenTop);
        const beat = (t * press / 60 * 10) % 1;
        const pushed = Math.pow(Math.max(0, 1 - Math.abs(beat - 0.5) * 2), 1.4);
        const pR = Math.max(1.1, Math.min(vW * 0.34, 4.5));
        const nPieces = 7;
        // no room above the villi means no contents to draw
        for (let k = 0; lumenH >= 10 && k < nPieces; k++) {
            const px = left + fullW * (0.08 + 0.84 * (k / (nPieces - 1)));
            const rest = lumenTop + lumenH * 0.3 + Math.sin(t * 0.9 + k) * lumenH * 0.12;
            const py = rest + (memY - vH - pR - rest) * pushed;
            const landed = villi > 0 && pushed > 0.82 && share > 0.05;
            if (landed) {
                // cut: two single sugars, heading for the channel
                ctx.fillStyle = SUGAR;
                [-1, 1].forEach(sd => {
                    ctx.beginPath();
                    ctx.arc(px + sd * pR * 1.1, py, pR * 0.82, 0, Math.PI * 2);
                    ctx.fill();
                });
            } else {
                // still joined: two rings sharing a link
                ctx.strokeStyle = PIECE;
                ctx.lineWidth = Math.max(0.9, pR * 0.4);
                ctx.beginPath();
                ctx.moveTo(px - pR * 0.9, py);
                ctx.lineTo(px + pR * 0.9, py);
                ctx.stroke();
                ctx.fillStyle = PIECE;
                [-1, 1].forEach(sd => {
                    ctx.beginPath();
                    ctx.arc(px + sd * pR * 1.5, py, pR * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
        }

        const rowY = (i: number) => artBase + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, villi === 0 ? 'the microvilli are gone'
                : 'microvilli, each with an active site',
                safeRight / 2, rowY(0), 'bold 10px monospace',
                villi === 0 ? MEMBRANE : ENZYME, 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, 'the channels take the glucose in',
                safeRight / 2, rowY(1), 'bold 10px monospace', CHANNEL, 'center', safeRight - 24);
        }

        outlineText(ctx, 'microvilli ' + villi + ', presses ' + press,
            safeRight / 2, stageBottom - 34, 'bold 11px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, villi === 0 ? 'no surface, so no position'
            : press < 4 ? 'too few presses to reach it'
                : 'cut and taken in together',
            safeRight / 2, stageBottom - 14, 'bold 11px monospace',
            share > 0.6 ? ENZYME : MEMBRANE, 'center', safeRight - 30);

        fitText(ctx, pct >= 99 ? 'the last 3% finished'
            : pct < 5 ? 'almost none finished' : pct + '% of it finished',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The brush border, close up', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: share,
                caption: 'The Last 3% Finished',
                low: 'the pieces travel on',
                high: 'all of it cut and taken in',
                stops: [MEMBRANE, '#fcd34d', ENZYME] as [string, string, string],
            },
            note: villi === 0
                ? 'With the microvilli flattened there is nowhere for an anchored enzyme to sit, so the joined pieces drift past a smooth wall. The molecules may be perfect; the positions are gone.'
                : villi + ' microvilli carry the enzymes, and the contents are pressed onto them '
                  + press + ' times a minute. Each join that breaks releases its sugar beside a channel that takes it straight in.',
        };
    };

    return (
        <LabCanvas
            title="The Enzyme That Cannot Leave"
            readout={({ raw }) => villiOf(raw) + ' microvilli'}
            controlLabel="Microvilli"
            controlKey="brushVilli"
            controlMin={0}
            controlMax={MAX_VILLI}
            controlInitial={18}
            controlDisplay={raw => villiOf(raw) + ' microvilli'}
            control2={{
                label: 'Presses Per Minute',
                key: 'brushPress',
                min: 2,
                max: 20,
                initial: 10,
                display: raw => pressOf(raw) + ' a minute',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Big Idea 27 Level 3 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="An anchored enzyme's use is its position!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
