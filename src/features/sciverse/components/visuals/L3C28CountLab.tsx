import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One liver cell, and the whole lesson is in one geometric fact: the sugar is drawn as
// squares whose TOTAL AREA is the mass, cut into as many pieces as there are dissolved
// particles. Move the chain dial and the coloured area does not budge while the number
// of pieces collapses -- which is exactly what the water outside is responding to. The
// arrows in are counted off the pieces, not off the area, so a reader who only looks has
// been told that osmotic pull counts particles and ignores mass.
const SUGAR = '#047857';
const WATER = '#0284c7';
const WALL = '#334155';
const DANGER = '#be123c';
const INK = '#0f172a';
const MUTED = '#475569';

const LIVER = 1.5;        // L
const NORMAL = 0.30;      // osmol/L already inside a cell
const MR = 180;           // g/mol for glucose
const R = 0.0821;
const TK = 310;
const SHOWN = 40;         // the most pieces the picture draws

const CHAINS: [number, string][] = [
    [1, 'free glucose'], [2, 'joined in pairs'], [5, 'joined in fives'],
    [10, 'joined in tens'], [50, 'joined in fifties'], [500, 'chains of 500'],
    [50000, 'glycogen'],
];

const gramsOf = (dial: number): number => Math.max(10, Math.min(200, Math.round(dial / 10) * 10));
const chainOf = (dial: number): [number, string] =>
    CHAINS[Math.max(0, Math.min(CHAINS.length - 1, Math.round(dial)))];

export const L3C28CountLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grams = gramsOf(raw);
        const [chain] = chainOf(raw2);
        const mol = grams / MR / chain;
        const conc = mol / LIVER;
        const share = conc / NORMAL;              // as a share of what the cell already holds
        const atm = conc * R * TK;
        // exhaustive, and both boundaries are reachable
        const bursts = share >= 0.2;
        const swells = !bursts && share >= 0.02;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = Math.max(6, artBottom - artTop);
        const left = 26;
        const fullW = Math.max(90, safeRight - 52);
        const ROW = 14;
        const rows = Math.max(0, Math.min(2, Math.floor((usable - 34) / ROW)));
        const cellH = Math.max(6, Math.min(150, usable - rows * ROW));
        const top = artTop + Math.max(0, (usable - (cellH + rows * ROW)) / 2);

        const cellW = fullW * 0.68;
        const cellX = left + (fullW - cellW) / 2;

        // ---- the cell
        ctx.fillStyle = '#fefce8';
        ctx.strokeStyle = bursts ? DANGER : WALL;
        ctx.lineWidth = bursts ? 3 : 2;
        ctx.beginPath();
        const rr = Math.min(12, cellH / 4, cellW / 4);
        ctx.moveTo(cellX + rr, top);
        ctx.lineTo(cellX + cellW - rr, top);
        ctx.quadraticCurveTo(cellX + cellW, top, cellX + cellW, top + rr);
        ctx.lineTo(cellX + cellW, top + cellH - rr);
        ctx.quadraticCurveTo(cellX + cellW, top + cellH, cellX + cellW - rr, top + cellH);
        ctx.lineTo(cellX + rr, top + cellH);
        ctx.quadraticCurveTo(cellX, top + cellH, cellX, top + cellH - rr);
        ctx.lineTo(cellX, top + rr);
        ctx.quadraticCurveTo(cellX, top, cellX + rr, top);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // ---- the sugar: total area is the MASS, cut into as many pieces as there are
        // particles, so the chain dial changes the count and never the area
        const pieces = Math.max(1, Math.min(SHOWN, Math.round(grams / 5 / chain)));
        const area = (grams / 200) * (cellW * cellH * 0.30);
        // Each piece has the CELL'S aspect, so a square grid of them scales with the
        // cell however short and wide it gets. Square pieces overflowed a phone-height
        // cell vertically, because a square grid of squares cannot match a flat box.
        const aspect = cellW / Math.max(1, cellH);
        const pw = Math.sqrt(aspect * area / pieces);
        const ph = pw / aspect;
        const cols = Math.max(1, Math.ceil(Math.sqrt(pieces)));
        const lines = Math.ceil(pieces / cols);
        const stepX = pw * 1.25;
        const stepY = ph * 1.25;
        const originX = cellX + (cellW - Math.min(cols, pieces) * stepX) / 2;
        const originY = top + (cellH - lines * stepY) / 2;
        ctx.fillStyle = SUGAR;
        for (let k = 0; k < pieces; k++) {
            const c = k % cols;
            const r0 = Math.floor(k / cols);
            ctx.fillRect(originX + c * stepX, originY + r0 * stepY, pw, ph);
        }

        // ---- water coming in, counted off the PIECES rather than the area
        const arrows = Math.max(0, Math.min(5, Math.round(share * 4)));
        if (arrows > 0 && cellH >= 30) {
            ctx.strokeStyle = WATER;
            ctx.lineWidth = 2;
            const march = (t * 18) % 14;
            for (let k = 0; k < arrows; k++) {
                const y = top + cellH * (k + 1) / (arrows + 1);
                for (const side2 of [-1, 1]) {
                    const edge = side2 < 0 ? cellX : cellX + cellW;
                    const tip = edge + side2 * 4;
                    const tail = edge + side2 * (16 + march);
                    ctx.beginPath();
                    ctx.moveTo(tail, y);
                    ctx.lineTo(tip, y);
                    ctx.moveTo(tip + side2 * 5, y - 3);
                    ctx.lineTo(tip, y);
                    ctx.lineTo(tip + side2 * 5, y + 3);
                    ctx.stroke();
                }
            }
        }

        const rowY = (i: number) => top + cellH + 11 + i * ROW;
        if (rows >= 1) {
            outlineText(ctx, grams + ' g in ' + pieces + (pieces === 1 ? ' piece' : ' pieces'),
                left + fullW / 2, rowY(0), 'bold 11px monospace', SUGAR, 'center', fullW);
        }
        if (rows >= 2) {
            outlineText(ctx, arrows > 0 ? 'water follows the pieces' : 'no water follows',
                left + fullW / 2, rowY(1), 'bold 11px monospace',
                arrows > 0 ? WATER : MUTED, 'center', fullW);
        }

        outlineText(ctx, (conc < 0.001 ? conc.toExponential(1) : conc.toFixed(3)) + ' mol/L dissolved',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, (share < 0.001 ? '<0.1' : (share * 100).toFixed(share < 1 ? 1 : 0))
            + '% of the cell\'s normal',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            bursts ? DANGER : swells ? WATER : MUTED, 'center', safeRight - 30);

        fitText(ctx, (atm < 0.01 ? atm.toExponential(0) : atm.toFixed(1)) + ' atm pulling in',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, bursts ? 'The cell bursts'
            : swells ? 'The cell takes water in' : 'No water follows',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.log10(Math.max(share, 1e-5)) / 5 + 1)),
                caption: 'Pull, Against the Cell',
                low: 'nothing follows it',
                high: 'the cell bursts',
                stops: [MUTED, WATER, DANGER] as [string, string, string],
            },
            note: bursts
                ? grams + ' g in chains of ' + chain + ' is ' + conc.toFixed(3) + ' mol/L of particles, '
                  + (share * 100).toFixed(0) + '% of everything else the cell holds. Water pours in and the cell splits.'
                : swells
                    ? 'The same ' + grams + ' g, now in chains of ' + chain + ', is down to '
                      + (share * 100).toFixed(1) + '% of the cell\'s normal load. The mass has not changed at all.'
                    : 'In chains of ' + chain + ' the same ' + grams + ' g is '
                      + (share * 100).toExponential(1) + '% of normal. Same sugar, same energy, '
                      + 'and the water outside cannot tell it is there.',
        };
    };

    return (
        <LabCanvas
            title="The Store That Takes No Water"
            readout={({ raw }) => gramsOf(raw) + ' g stored'}
            controlLabel="Sugar Stored"
            controlKey="sugarStored"
            controlMin={10}
            controlMax={200}
            controlInitial={100}
            controlDisplay={raw => gramsOf(raw) + ' g'}
            control2={{
                label: 'Units Joined in a Chain',
                key: 'chainUnits',
                min: 0,
                max: 6,
                initial: 0,
                display: raw => chainOf(raw)[0].toLocaleString() + ' (' + chainOf(raw)[1] + ')',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="The water counts, it does not weigh!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
