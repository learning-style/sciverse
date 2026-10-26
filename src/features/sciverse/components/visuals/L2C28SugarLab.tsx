import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: all the sugar in your blood is less than a teaspoon, and one slice of bread
// delivers three times the room you have. Both halves of that have to be COUNTABLE or
// the comparison is just two numbers, so one dot is half a gram: a normal 4.5 g is nine
// dots inside the vessel, the danger line is twenty, and the slice waiting outside is
// thirty. The vessel is drawn as a vessel, with the bread beside it, so it is clear
// where the sugar is and where it is coming from.
const PER_DOT = 0.5;           // grams, so the count is readable
const LOW = 0.7;               // g/L
const HIGH = 2.0;              // g/L, the danger line
const WALL = '#be123c';
const PLASMA = '#fee2e2';
const SUGAR = '#0f766e';
const OVER = '#b45309';
const CRUST = '#b45309';
const CRUMB = '#fde68a';

const concOf = (dial: number): number => Math.max(0.5, Math.min(3, Math.round(dial * 10) / 10));
const volOf = (dial: number): number => Math.max(2, Math.min(7, Math.round(dial * 2) / 2));

export const L2C28SugarLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const conc = concOf(raw);
        const vol = volOf(raw2);
        const grams = conc * vol;
        const dots = Math.max(1, Math.round(grams / PER_DOT));
        const danger = conc > HIGH;
        const low = conc < LOW;
        const gap = (HIGH - conc) * vol;
        const trim = (x: number) => x.toFixed(1).replace(/\.0$/, '');

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const fit = Math.max(0, Math.min(3, Math.floor((band - 24) / LBL)));
        const artH = Math.max(4, band - fit * LBL - 4);
        const midY = artTop + 2 + artH / 2;

        // ---- the slice of bread waiting outside, with its 15 grams
        const sliceSide = Math.max(6, Math.min(fullW * 0.17, artH * 0.5, 44));
        const sx = left + sliceSide * 0.6 + 2;
        const rr = Math.max(1.5, sliceSide * 0.22);
        ctx.fillStyle = CRUMB;
        ctx.strokeStyle = CRUST;
        ctx.lineWidth = Math.max(1.2, sliceSide * 0.09);
        ctx.beginPath();
        ctx.moveTo(sx - sliceSide / 2 + rr, midY - sliceSide / 2);
        ctx.lineTo(sx + sliceSide / 2 - rr, midY - sliceSide / 2);
        ctx.quadraticCurveTo(sx + sliceSide / 2, midY - sliceSide / 2, sx + sliceSide / 2, midY - sliceSide / 2 + rr);
        ctx.lineTo(sx + sliceSide / 2, midY + sliceSide / 2);
        ctx.lineTo(sx - sliceSide / 2, midY + sliceSide / 2);
        ctx.lineTo(sx - sliceSide / 2, midY - sliceSide / 2 + rr);
        ctx.quadraticCurveTo(sx - sliceSide / 2, midY - sliceSide / 2, sx - sliceSide / 2 + rr, midY - sliceSide / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // ---- the vessel, with the blood in it
        const vx = left + fullW * 0.32;
        const vw = Math.max(20, left + fullW - vx - 2);
        const vh = Math.max(6, Math.min(artH * 0.82, 110));
        const vTop = midY - vh / 2;
        const wallT = Math.max(1.5, Math.min(vh * 0.09, 6));
        ctx.fillStyle = PLASMA;
        ctx.fillRect(vx, vTop, vw, vh);
        ctx.strokeStyle = WALL;
        ctx.lineWidth = wallT;
        ctx.beginPath();
        ctx.moveTo(vx, vTop + wallT / 2);
        ctx.lineTo(vx + vw, vTop + wallT / 2);
        ctx.moveTo(vx, vTop + vh - wallT / 2);
        ctx.lineTo(vx + vw, vTop + vh - wallT / 2);
        ctx.stroke();

        // the arrow carrying sugar in from the slice
        const ay = midY;
        ctx.strokeStyle = OVER;
        ctx.lineWidth = 2;
        const aFrom = sx + sliceSide / 2 + 2;
        const aTo = Math.max(aFrom + 4, vx - 2);
        ctx.beginPath();
        ctx.moveTo(aFrom, ay);
        ctx.lineTo(aTo, ay);
        ctx.moveTo(aTo - 4, ay - 3.5);
        ctx.lineTo(aTo, ay);
        ctx.lineTo(aTo - 4, ay + 3.5);
        ctx.stroke();

        // ---- the sugar, counted out: one dot is half a gram
        const inner = vh - wallT * 2 - 4;
        const rows = Math.max(1, Math.min(4, Math.ceil(dots / Math.max(1, Math.floor(vw / 9)))));
        const perRow = Math.ceil(dots / rows);
        const dotR = Math.max(1.1, Math.min(inner / rows / 3.2, vw / perRow / 3.2, 5));
        const stepX = Math.min(dotR * 2.9, (vw - 8) / Math.max(1, perRow));
        for (let k = 0; k < dots; k++) {
            const row = Math.floor(k / perRow);
            const idx = k - row * perRow;
            const n = Math.min(perRow, dots - row * perRow);
            const wob = Math.sin(t * 1.4 + k * 0.7) * dotR * 0.3;
            const dx = vx + vw / 2 - stepX * (n - 1) / 2 + stepX * idx;
            const dy = vTop + vh / 2 - (rows - 1) * (inner / rows) / 2 + row * (inner / rows) + wob;
            ctx.fillStyle = danger ? OVER : SUGAR;
            ctx.beginPath();
            ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
            ctx.fill();
        }

        const rowY = (i: number) => artTop + 2 + artH + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, 'one dot is half a gram', safeRight / 2, rowY(0),
                'bold 11px monospace', SUGAR, 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, 'a slice delivers 15 g', safeRight / 2, rowY(1),
                'bold 11px monospace', CRUST, 'center', safeRight - 24);
        }
        if (fit >= 3) {
            outlineText(ctx, danger ? trim(conc) + ' g/L: over the line'
                : low ? trim(conc) + ' g/L: below range'
                    : trim(conc) + ' g/L: in range',
                safeRight / 2, rowY(2), 'bold 10px monospace',
                danger ? OVER : low ? '#64748b' : SUGAR, 'center', safeRight - 24);
        }

        outlineText(ctx, trim(conc) + ' g/L x ' + trim(vol) + ' L = ' + trim(grams) + ' g',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, danger ? 'over the line by ' + trim(-gap) + ' g'
            : 'the gap above is ' + trim(gap) + ' g',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            danger ? OVER : SUGAR, 'center', safeRight - 30);

        fitText(ctx, trim(grams) + ' g in the blood', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'All the sugar in your blood', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, conc / 3)),
                caption: 'Sugar in Each Litre',
                low: 'below range',
                high: 'over the line',
                stops: ['#bfdbfe', SUGAR, OVER] as [string, string, string],
            },
            note: 'At ' + trim(conc) + ' g/L across ' + trim(vol) + ' L there are '
                + trim(grams) + ' g of sugar in the whole bloodstream -- ' + dots
                + ' dots at half a gram each. ' + (danger
                    ? 'That is past the 2.0 g/L line.'
                    : 'The gap up to the 2.0 g/L line is ' + trim(gap)
                      + ' g, and one slice delivers 15 g.'),
        };
    };

    return (
        <LabCanvas
            title="No Room in the Blood"
            readout={({ raw }) => concOf(raw).toFixed(1) + ' g/L'}
            controlLabel="Glucose Concentration"
            controlKey="glucoseConc"
            controlMin={0.5}
            controlMax={3}
            controlInitial={0.9}
            controlDisplay={raw => concOf(raw).toFixed(1) + ' g/L'}
            control2={{
                label: 'Blood Volume',
                key: 'bloodVolume',
                min: 2,
                max: 7,
                initial: 5,
                display: raw => volOf(raw).toFixed(1).replace(/\.0$/, '') + ' L',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="No buffer means no waiting!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
