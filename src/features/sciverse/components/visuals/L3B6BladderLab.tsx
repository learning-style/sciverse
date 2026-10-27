import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces a chart of p1 V1 = p2 V2. This draws the fish: the swim bladder above the
// gut, the gas gland with its rete at one end, the oval window with its flap at the
// other, and the water column alongside.
//
// The dial mapping carries the lesson by itself. The sac's size is gas / pressure, and
// 'neutral' is one fixed size -- so holding the fish level needs about 4 gas units at the
// surface and about 84 at 200 m. The dial is therefore hypersensitive in the shallows and
// sluggish deep down, which is exactly the instability the lesson is about, felt rather
// than asserted.
const NEUTRAL = 4;             // the sac size at which the fish neither rises nor sinks
const BODY = '#64748b';
const SAC = '#e0f2fe';
const SACLINE = '#0369a1';
const GLAND = '#b91c1c';
const WINDOW = '#047857';
const WATER = '#bae6fd';
const UP = '#047857';
const DOWN = '#b45309';

const depthOf = (dial: number): number => Math.max(0, Math.min(200, Math.round(dial / 5) * 5));
const gasOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial)));

export const L3B6BladderLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const depth = depthOf(raw);
        const gas = gasOf(raw2);
        const atm = 1 + depth / 10;
        const sac = gas / atm;                    // squeezed by the water outside
        const off = sac - NEUTRAL;
        const rising = off > 0.25;
        const sinking = off < -0.25;
        const trim = (x: number) => x.toFixed(1).replace(/\.0$/, '');

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const fit = Math.max(0, Math.min(2, Math.floor((band - 24) / LBL)));
        const artH = Math.max(4, band - fit * LBL - 4);
        const artBase = artTop + 2 + artH;
        const showParts = artH >= 34;

        // ---- the water column, with the fish's depth marked on it
        const colW = Math.max(5, Math.min(fullW * 0.1, 26));
        const colX = left + 1;
        ctx.fillStyle = WATER;
        ctx.fillRect(colX, artTop + 2, colW, artH);
        ctx.strokeStyle = SACLINE;
        ctx.lineWidth = 1;
        ctx.strokeRect(colX, artTop + 2, colW, artH);
        const markY = artTop + 2 + artH * (depth / 200);
        ctx.strokeStyle = GLAND;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(colX, markY);
        ctx.lineTo(colX + colW, markY);
        ctx.stroke();

        // ---- the fish, drifting a little with whichever way it is going
        const fx = left + fullW * 0.56;
        const fL = Math.max(16, Math.min(fullW * 0.62, artH * 1.5, 230));
        const fH = Math.max(6, Math.min(fL * 0.38, artH * 0.56));
        const drift = (rising ? -1 : sinking ? 1 : 0) * Math.sin(t * 1.3) * Math.min(5, artH * 0.03);
        const fy = artTop + 2 + artH / 2 + drift;
        ctx.fillStyle = BODY;
        ctx.beginPath();
        ctx.ellipse(fx, fy, fL * 0.42, fH * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // tail
        ctx.beginPath();
        ctx.moveTo(fx - fL * 0.4, fy);
        ctx.lineTo(fx - fL * 0.5, fy - fH * 0.42);
        ctx.lineTo(fx - fL * 0.5, fy + fH * 0.42);
        ctx.closePath();
        ctx.fill();

        // ---- the swim bladder inside it, squeezed to gas / pressure
        const sacW = Math.max(2, Math.min(fL * 0.3 * Math.min(1.8, sac / NEUTRAL), fL * 0.3));
        const sacH = Math.max(1.4, Math.min(fH * 0.3 * Math.min(1.8, sac / NEUTRAL), fH * 0.3));
        const sy = fy - fH * 0.16;
        ctx.fillStyle = SAC;
        ctx.beginPath();
        ctx.ellipse(fx, sy, sacW, sacH, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = SACLINE;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        // the gut below it, so the sac's position in the body is clear
        ctx.strokeStyle = '#3f3f46';
        ctx.lineWidth = Math.max(0.9, fH * 0.06);
        ctx.beginPath();
        ctx.moveTo(fx - fL * 0.3, fy + fH * 0.26);
        ctx.lineTo(fx + fL * 0.3, fy + fH * 0.26);
        ctx.stroke();

        if (showParts) {
            // the gas gland and its rete at the front of the sac
            const gX = fx + sacW * 0.9;
            ctx.strokeStyle = GLAND;
            ctx.lineWidth = 1;
            for (let k = -2; k <= 2; k++) {
                ctx.beginPath();
                ctx.moveTo(gX, sy + k * Math.max(1, sacH * 0.3));
                ctx.lineTo(gX + Math.max(4, fL * 0.07), sy + k * Math.max(1, sacH * 0.3));
                ctx.stroke();
            }
            ctx.fillStyle = GLAND;
            ctx.beginPath();
            ctx.arc(gX, sy, Math.max(1.3, sacH * 0.3), 0, Math.PI * 2);
            ctx.fill();
            // the oval window and its flap at the back
            ctx.fillStyle = WINDOW;
            ctx.fillRect(fx - sacW - Math.max(2, fL * 0.03), sy - Math.max(1.2, sacH * 0.35),
                Math.max(1.6, fL * 0.02), Math.max(2.4, sacH * 0.7));
        }

        // which way the fish is going
        const arm = Math.min(Math.abs(off) * 4, Math.max(0, artH * 0.5 - fH * 0.6 - 6), 20);
        if (arm > 4 && (rising || sinking)) {
            const dir = rising ? -1 : 1;
            const tipY = fy + dir * (fH * 0.6 + arm);
            ctx.strokeStyle = rising ? UP : DOWN;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(fx, fy + dir * fH * 0.6);
            ctx.lineTo(fx, tipY);
            ctx.moveTo(fx - 4, tipY - dir * 5);
            ctx.lineTo(fx, tipY);
            ctx.lineTo(fx + 4, tipY - dir * 5);
            ctx.stroke();
        }

        const rowY = (i: number) => artBase + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, 'the swim bladder, above the gut', safeRight / 2, rowY(0),
                'bold 10px monospace', SACLINE, 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, 'gas gland and oval window',
                safeRight / 2, rowY(1), 'bold 10px monospace', GLAND, 'center', safeRight - 24);
        }

        outlineText(ctx, depth + ' m: ' + trim(atm) + ' atmospheres',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, rising ? 'the sac is too big: rising'
            : sinking ? 'the sac is squeezed: sinking' : 'level',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            rising ? UP : sinking ? DOWN : SACLINE, 'center', safeRight - 30);

        fitText(ctx, rising ? 'rising' : sinking ? 'sinking' : 'level at ' + depth + ' m',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The sac the water squeezes', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, sac / (NEUTRAL * 2))),
                caption: 'How Big the Sac Is',
                low: 'squeezed: it sinks',
                high: 'too big: it rises',
                stops: [DOWN, SACLINE, UP] as [string, string, string],
            },
            note: 'At ' + depth + ' m the water presses with ' + trim(atm)
                + ' atmospheres, so ' + gas + ' units of gas are squeezed to a sac of '
                + trim(sac) + '. Level needs ' + trim(NEUTRAL * atm)
                + ' units here -- which is why the dial is so touchy near the surface and so slow deep down.',
        };
    };

    return (
        <LabCanvas
            title="The Sac That Cannot Hold Still"
            readout={({ raw }) => depthOf(raw) + ' m down'}
            controlLabel="Depth"
            controlKey="bladderDepth"
            controlMin={0}
            controlMax={200}
            controlInitial={0}
            controlDisplay={raw => depthOf(raw) + ' m'}
            control2={{
                label: 'Gas Added',
                key: 'bladderGas',
                min: 0,
                max: 100,
                initial: 4,
                display: raw => gasOf(raw) + ' units',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Do Things Float or Sink?"
            completeNote="Two materials, two prices!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
