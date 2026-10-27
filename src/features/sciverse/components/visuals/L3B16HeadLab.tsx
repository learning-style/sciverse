import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces L3B16WeightLab, which plotted a combined error against the share of the vote
// and asked the reader to find its lowest point. Nothing in that picture was an animal.
//
// This is the bird's head with both candidate structures in it: magnetite crystals at the
// front of the beak, drawn in the same colour as their label, and cryptochrome in the
// retina, drawn in its own. Earth's field runs through the sky behind at the angle the
// first dial sets.
//
// Two things are encoded in the geometry rather than asserted. The field arrow is drawn
// with a head at BOTH ends and a marker running out along each -- so a reader can see that
// reversing it would change nothing, which is why neither structure can report north. And
// at an angle of zero the arrow is level, so the tilt that names poleward is visibly
// absent rather than merely said to be: the failure at the magnetic equator is the picture
// losing its slope.
const MAG = '#be123c';
const CRY = '#0369a1';
const FIELD = '#475569';
const DEAD = '#94a3b8';
const INK = '#0f172a';
const LBL = 15;
const MAX_INC = 80;
const DIM = 20;             // below this the retina has too little light to start it

const incOf = (dial: number): number => Math.max(0, Math.min(MAX_INC, Math.round(dial / 5) * 5));
const lightOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial / 10) * 10));

export const L3B16HeadLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const inc = incOf(raw);
        const light = lightOf(raw2);
        // 0 is reachable on a step of 5, and 20 on a step of 10, so each boundary belongs
        // to exactly one band
        const level = inc <= 0;
        const lit = light >= DIM;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const left = 20;
        const fullW = Math.max(90, safeRight - 40);

        // the label rows come out of the height that exists, and the drawing is floored
        // below any stage that renders and then capped by what is left over
        const rows = Math.max(0, Math.min(2, Math.floor((usable - 24) / LBL)));
        const artH = Math.max(6, usable - rows * LBL);
        const ground = Math.max(3, artH * 0.1);
        const skyH = artH - ground;
        const skyTop = artTop;
        const skyBottom = artTop + skyH;

        const hr = Math.max(3, Math.min(skyH * 0.33, fullW * 0.13, 34));
        const hx = left + fullW * 0.2;
        const hy = skyTop + skyH * 0.45;
        const rad = (inc * Math.PI) / 180;

        // Everything in the sky is clipped to the sky, so no field line, marker or arrow
        // head can leave the stage however the dials are set.
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, skyTop, fullW, skyH);
        ctx.clip();

        const sky = ctx.createLinearGradient(0, skyTop, 0, skyBottom);
        sky.addColorStop(0, '#e0e7ff');
        sky.addColorStop(1, '#f1f5f9');
        ctx.fillStyle = sky;
        ctx.fillRect(left, skyTop, fullW, skyH);

        // the field, as a family of parallel lines running down into the ground
        const span = fullW + skyH * 2 + 240;
        const dx = Math.cos(rad) * span;
        const dy = Math.sin(rad) * span;
        ctx.strokeStyle = 'rgba(71,85,105,0.3)';
        ctx.lineWidth = 1;
        const gap = Math.max(10, skyH / 5);
        for (let k = -6; k <= 6; k++) {
            const oy = skyTop + skyH / 2 + k * gap;
            ctx.beginPath();
            ctx.moveTo(left + fullW / 2 - dx / 2, oy - dy / 2);
            ctx.lineTo(left + fullW / 2 + dx / 2, oy + dy / 2);
            ctx.stroke();
        }

        // one bold line with a head at BOTH ends: reverse the field and nothing here moves
        const cx = left + fullW * 0.72;
        const cy = skyTop + skyH * 0.45;
        const arm = Math.min(fullW * 0.19, skyH * 0.42);
        const ax = Math.cos(rad) * arm;
        const ay = Math.sin(rad) * arm;
        ctx.strokeStyle = level ? DEAD : FIELD;
        ctx.lineWidth = Math.max(1.6, hr * 0.1);
        ctx.beginPath();
        ctx.moveTo(cx - ax, cy - ay);
        ctx.lineTo(cx + ax, cy + ay);
        ctx.stroke();
        const head = Math.max(3, arm * 0.17);
        for (const sgn of [1, -1]) {
            const tipX = cx + sgn * ax;
            const tipY = cy + sgn * ay;
            ctx.beginPath();
            ctx.moveTo(tipX, tipY);
            ctx.lineTo(tipX - sgn * (Math.cos(rad) * head + Math.sin(rad) * head * 0.6),
                tipY - sgn * (Math.sin(rad) * head - Math.cos(rad) * head * 0.6));
            ctx.moveTo(tipX, tipY);
            ctx.lineTo(tipX - sgn * (Math.cos(rad) * head - Math.sin(rad) * head * 0.6),
                tipY - sgn * (Math.sin(rad) * head + Math.cos(rad) * head * 0.6));
            ctx.stroke();
        }
        // a marker running out along each end at once, so neither end is the special one
        const trip = ((t * 0.5) % 1);
        ctx.fillStyle = level ? DEAD : FIELD;
        for (const sgn of [1, -1]) {
            ctx.beginPath();
            ctx.arc(cx + sgn * ax * trip, cy + sgn * ay * trip, Math.max(1.4, head * 0.3), 0, Math.PI * 2);
            ctx.fill();
        }

        // the head, in profile, facing right
        ctx.fillStyle = '#fecdd3';
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = Math.max(1, hr * 0.07);
        ctx.beginPath();
        ctx.arc(hx, hy, hr, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(hx + hr * 0.75, hy - hr * 0.12);
        ctx.lineTo(hx + hr * 1.85, hy + hr * 0.18);
        ctx.lineTo(hx + hr * 0.75, hy + hr * 0.42);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // the eye, with the retina as the arc at its back: lit when there is light to
        // start the reaction, grey when there is not
        const ex = hx + hr * 0.32;
        const ey = hy - hr * 0.26;
        const er = hr * 0.3;
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(ex, ey, er, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = Math.max(0.8, hr * 0.05);
        ctx.stroke();
        ctx.strokeStyle = lit ? CRY : DEAD;
        ctx.lineWidth = Math.max(1.4, er * 0.42);
        ctx.beginPath();
        ctx.arc(ex, ey, er * 0.78, Math.PI * 0.55, Math.PI * 1.45);
        ctx.stroke();
        if (lit && er >= 4) {
            ctx.fillStyle = 'rgba(3,105,161,' + (0.35 + 0.3 * Math.abs(Math.sin(t * 1.6))).toFixed(2) + ')';
            ctx.beginPath();
            ctx.arc(ex, ey, er * 0.45, 0, Math.PI * 2);
            ctx.fill();
        }

        // the magnetite crystals, in the front of the beak, each pulled a little toward
        // the line of the field
        const mr = Math.max(0.8, hr * 0.09);
        for (let k = 0; k < 3; k++) {
            const mx = hx + hr * (0.95 + k * 0.24);
            const my = hy + hr * (0.14 + k * 0.055);
            ctx.save();
            ctx.translate(mx, my);
            ctx.rotate(rad * (level ? 0 : 0.85 + 0.15 * Math.sin(t * 2.4 + k)));
            ctx.fillStyle = level ? DEAD : MAG;
            ctx.fillRect(-mr * 1.7, -mr * 0.6, mr * 3.4, mr * 1.2);
            ctx.restore();
        }

        // the ground, so the dip is a dip into something
        ctx.fillStyle = '#3f3f46';
        ctx.fillRect(left, skyBottom, fullW, ground);
        ctx.restore();

        // tucked into the bottom-left of the sky, clear of the head above it and of the
        // arrow away to the right
        if (skyH >= 70) {
            outlineText(ctx, 'the field', left + 3, skyBottom - 3,
                'bold 11px monospace', FIELD, 'left', fullW * 0.4);
        }

        // Fixed, separated rows below the drawing, each coloured to match the structure
        // it names, so nothing needs a leader line to be identified.
        const slot = artTop + artH;
        if (rows >= 1) {
            outlineText(ctx, 'magnetite feels a torque', left + fullW / 2, slot + 11,
                'bold 11px monospace', level ? DEAD : MAG, 'center', fullW);
        }
        if (rows >= 2) {
            outlineText(ctx, lit ? 'cryptochrome reads the angle' : 'cryptochrome is dark',
                left + fullW / 2, slot + 26, 'bold 11px monospace', lit ? CRY : DEAD, 'center', fullW);
        }

        outlineText(ctx, level ? 'the field is level' : 'dips ' + inc + '° into the ground',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, level ? 'no tilt: neither can read it'
            : lit ? 'torque and yield: 2 readings' : 'torque only: 1 reading',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            level ? DEAD : lit ? CRY : MAG, 'center', safeRight - 30);

        fitText(ctx, level ? 'No poleward here' : 'Poleward from the tilt',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, level ? 'Nothing to tell apart'
            : lit ? 'Two structures, one line' : 'One structure, same line',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, inc / MAX_INC)),
                caption: 'The Tilt There Is To Read',
                low: 'level: no poleward',
                high: 'steep: a firm heading',
                stops: [DEAD, '#fda4af', MAG] as [string, string, string],
            },
            note: level
                ? 'At the magnetic equator the field is level, so there is no tilt to read and nothing tells'
                  + ' poleward from equatorward. Neither structure is broken: a level field has no steepness in it.'
                : lit
                    ? 'The field dips ' + inc + '°, and both structures report that line: the crystals by the torque'
                      + ' pulling on their anchor, the retina by how much product the reaction makes. Reverse the'
                      + ' field and nothing changes.'
                    : 'With ' + light + '% light the retina cannot start the reaction, so only the torque on the'
                      + ' crystals is left. It still gives the line and its ' + inc + '° tilt, and still has no'
                      + ' way along it.',
        };
    };

    return (
        <LabCanvas
            title="The Compass That Cannot Say North"
            readout={({ raw }) => 'the field dips ' + incOf(raw) + '°'}
            controlLabel="Field Angle Into the Ground"
            controlKey="fieldDip"
            controlMin={0}
            controlMax={MAX_INC}
            controlInitial={60}
            controlDisplay={raw => incOf(raw) + '°'}
            control2={{
                label: 'Light on the Eye',
                key: 'eyeLight',
                min: 0,
                max: 100,
                initial: 70,
                display: raw => lightOf(raw) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Magnets Help Us Navigate and Build Machines?"
            completeNote="A torque cannot tell a line from its opposite!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
