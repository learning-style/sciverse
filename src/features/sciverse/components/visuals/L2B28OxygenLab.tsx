import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the second factor has a hard ceiling, and a ceiling has to be DRAWN or it is
// just a sentence. So a litre of blood is drawn as 20 oxygen units, one per 10 mL. The
// muscle takes the number you dial and the rest carries on out through the vein -- and at
// 200 mL/L every unit is taken and the vein is empty, because there is no twenty-first
// unit. The artery, the muscle and the vein are drawn as themselves, so it is clear where
// the oxygen goes.
const PER_UNIT = 10;           // mL of oxygen per drawn unit
const UNITS = 20;              // a litre of blood carries about 200 mL
const ARTERY = '#be123c';
const VEIN = '#4338ca';
const MUSCLE = '#9f1239';
const O2 = '#0ea5e9';
const TAKEN = '#047857';

const flowOf = (dial: number): number => Math.max(3, Math.min(30, Math.round(dial)));
const takeOf = (dial: number): number => Math.max(20, Math.min(200, Math.round(dial / 10) * 10));

export const L2B28OxygenLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const flow = flowOf(raw);
        const take = takeOf(raw2);
        const used = flow * take;
        const taken = Math.round(take / PER_UNIT);
        const left = UNITS - taken;
        const group = (n: number) => n >= 1000
            ? Math.floor(n / 1000) + ',' + String(n % 1000).padStart(3, '0')
            : String(n);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const x0 = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const fit = Math.max(0, Math.min(2, Math.floor((band - 24) / LBL)));
        const artH = Math.max(4, band - fit * LBL - 4);
        const midY = artTop + 2 + artH / 2;

        // ---- the muscle in the middle, with the artery in and the vein out
        const mr = Math.max(2, Math.min(artH * 0.4, fullW * 0.14, 40));
        const mx = x0 + fullW * 0.5;
        ctx.fillStyle = MUSCLE;
        ctx.beginPath();
        ctx.ellipse(mx, midY, mr * 0.78, mr, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 1.3;
        ctx.stroke();
        // fibres, so it reads as muscle
        if (mr >= 12) {
            ctx.strokeStyle = 'rgba(255,255,255,0.45)';
            ctx.lineWidth = 1;
            for (let k = -2; k <= 2; k++) {
                ctx.beginPath();
                ctx.moveTo(mx + k * mr * 0.26, midY - mr * 0.82);
                ctx.lineTo(mx + k * mr * 0.26, midY + mr * 0.82);
                ctx.stroke();
            }
        }

        const pipeW = Math.max(3, Math.min(mr * 0.42, 16));
        const inEnd = mx - mr * 0.78;
        const outStart = mx + mr * 0.78;
        ctx.lineCap = 'round';
        ctx.strokeStyle = ARTERY;
        ctx.lineWidth = pipeW;
        ctx.beginPath();
        ctx.moveTo(x0 + 2, midY);
        ctx.lineTo(inEnd, midY);
        ctx.stroke();
        ctx.strokeStyle = VEIN;
        ctx.beginPath();
        ctx.moveTo(outStart, midY);
        ctx.lineTo(x0 + fullW - 2, midY);
        ctx.stroke();
        ctx.lineCap = 'butt';

        // ---- the oxygen: 20 units in, the dialled number taken, the rest out
        const uR = Math.max(1, Math.min(pipeW * 0.3, 4));
        const inSpan = Math.max(10, inEnd - (x0 + 4) - uR * 2);
        const outSpan = Math.max(10, (x0 + fullW - 4) - outStart - uR * 2);
        const drift = (t * 0.25) % 1;
        for (let k = 0; k < UNITS; k++) {
            const f = (k / UNITS + drift) % 1;
            ctx.fillStyle = O2;
            ctx.beginPath();
            ctx.arc(x0 + 4 + uR + inSpan * f, midY, uR, 0, Math.PI * 2);
            ctx.fill();
        }
        for (let k = 0; k < left; k++) {
            const f = (k / Math.max(1, left) + drift) % 1;
            ctx.fillStyle = O2;
            ctx.beginPath();
            ctx.arc(outStart + uR + outSpan * f, midY, uR, 0, Math.PI * 2);
            ctx.fill();
        }
        // and the ones the muscle has taken, counted inside it
        // the grid has to fit INSIDE the ellipse, so it is sized from the semi-axes:
        // at 0.68 of each, the worst corner is 2 x 0.68^2 = 0.93 of the boundary
        const cols = Math.max(1, Math.ceil(Math.sqrt(taken * 1.4)));
        const nRows = Math.ceil(taken / cols);
        const cellR = Math.max(0.3, Math.min(
            mr * 0.78 * 0.68 / ((cols - 1) * 1.3 + 1),
            mr * 0.68 / ((nRows - 1) * 1.3 + 1), uR));
        // below this the muscle is a dot and nothing inside it would be legible
        for (let k = 0; mr >= 8 && k < taken; k++) {
            const col = k % cols;
            const row = Math.floor(k / cols);
            const nThis = Math.min(cols, taken - row * cols);
            const gx = mx - cellR * 2.6 * (nThis - 1) / 2 + cellR * 2.6 * col;
            const gy = midY - cellR * 2.6 * (nRows - 1) / 2 + cellR * 2.6 * row;
            ctx.fillStyle = TAKEN;
            ctx.beginPath();
            ctx.arc(gx, gy, cellR, 0, Math.PI * 2);
            ctx.fill();
        }

        const rowY = (i: number) => artTop + 2 + artH + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, UNITS + ' units in, muscle takes ' + taken,
                safeRight / 2, rowY(0), 'bold 11px monospace', TAKEN, 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, left === 0 ? 'none left in the vein' : left + ' left in the vein',
                safeRight / 2, rowY(1), 'bold 11px monospace',
                left === 0 ? ARTERY : VEIN, 'center', safeRight - 24);
        }

        outlineText(ctx, flow + ' L/min x ' + take + ' mL/L',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, '= ' + group(used) + ' mL a minute',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', TAKEN, 'center', safeRight - 30);

        fitText(ctx, group(used) + ' mL of oxygen a minute', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'What each litre gives up', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, take / 200)),
                caption: 'Taken From Each Litre',
                low: 'a resting muscle',
                high: 'all of it: the ceiling',
                stops: ['#bfdbfe', TAKEN, ARTERY] as [string, string, string],
            },
            note: 'Each litre arrives with ' + UNITS + ' units of oxygen, 10 mL each. The muscle takes '
                + taken + ' and ' + left + ' carry on in the vein. At ' + flow
                + ' L a minute that is ' + group(used) + ' mL a minute. '
                + (take >= 200 ? 'There is no twenty-first unit, so only flow can rise now.'
                    : 'At most 20 can be taken.'),
        };
    };

    return (
        <LabCanvas
            title="The Factor With No Room"
            readout={({ raw }) => flowOf(raw) + ' L a minute'}
            controlLabel="Blood Flow"
            controlKey="oxyFlow"
            controlMin={3}
            controlMax={30}
            controlInitial={5}
            controlDisplay={raw => flowOf(raw) + ' L/min'}
            control2={{
                label: 'Oxygen Taken Per Litre',
                key: 'oxyTake',
                min: 20,
                max: 200,
                initial: 50,
                display: raw => takeOf(raw) + ' mL/L',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Big Idea 28 Level 2 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="It routes around the limit!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
