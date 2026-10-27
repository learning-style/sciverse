import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces L3B11RaceLab, which plotted two exponential curves against hours and asked
// the reader to compare where they crossed. Nothing in that picture was a cell.
//
// This one is clonal selection, drawn. A germ sits on the left with a bump on its coat --
// its ANTIGEN -- and a field of 24 lymphocytes sits on the right, each drawn with the one
// RECEPTOR notch it happens to carry. Most of the notches have nothing to do with this
// germ and stay grey however the dials move, which is the point the lesson opens with.
//
// The arithmetic is in the geometry rather than in a caption. A notch's WIDTH is its
// shape, the germ's bump has a width too, and a cell binds only where the two widths
// agree -- so a reader can see which cells fit without being told. A cell that has
// switched on is drawn as two overlapping lobes, caught mid-division, so a clone is
// visibly one cell becoming two and needs no label. Turning Receptor Fit down narrows the
// germ's bump away from the stored width, the lit cells go out, and the field is full of
// primed cells recognising nothing: antigenic drift.
const COLS = 6;
const ROWS = 4;
const TOTAL = COLS * ROWS;
const LBL = 15;
const GOOD = 70;            // fit at or above this binds properly
const WEAK = 45;            // at or above this it binds weakly; below it, not at all
const MW = 1;               // the stored receptor's half-width, in notch units
const LIT = '#be123c';
const DIM = '#b45309';
const GREY = '#94a3b8';
const MUTED = '#475569';   // the same grey, dark enough to survive a halo as text
const INK = '#0f172a';

// the scattered order in which cells turn out to carry the fitting shape, so raising the
// dial lights more of the field rather than filling a corner of it
const ORDER = [9, 2, 16, 21, 5, 12, 23, 7];
// every other cell carries one of four shapes that are not this germ's
const OTHER = [0.45, 1.75, 0.7, 2.2];

const fitOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial / 5) * 5));
const cellsOf = (dial: number): number => Math.max(0, Math.min(8, Math.round(dial)));

export const L3B11ReceptorLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const count = cellsOf(raw);
        const pct = fitOf(raw2);
        // exhaustive and boundary-safe: 45 and 70 are both reachable on a step of 5, and
        // each falls in exactly one band
        const good = pct >= GOOD;
        const weak = !good && pct >= WEAK;
        const binds = good || weak;
        const on = binds ? count : 0;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const left = 20;
        const fullW = Math.max(90, safeRight - 40);

        // label rows come out of the height that exists; the drawing is floored below any
        // stage that renders and then capped by whatever is left
        const rows = Math.max(0, Math.min(2, Math.floor((usable - 20) / LBL)));
        const artH = Math.max(6, usable - rows * LBL);

        const germW = fullW * 0.3;
        const fieldX = left + germW + 8;
        const fieldW = fullW - germW - 8;
        const pitchX = fieldW / COLS;
        const pitchY = artH / ROWS;
        const cr = Math.max(1.2, Math.min(pitchX * 0.36, pitchY * 0.36, 9));
        const gr = Math.max(2, Math.min(germW * 0.33, artH * 0.34, 26));
        const germX = left + germW / 2;
        const midY = artTop + artH / 2;

        // the germ's bump: at full fit it is exactly the stored width, and drift narrows it
        const bump = MW * (0.42 + 0.58 * (pct / 100));
        const notchH = cr * 0.55;

        // one notch, drawn on the side of a circle facing the germ. Its half-width in
        // pixels is the shape; nothing else about it varies.
        const notch = (cx: number, cy: number, half: number, colour: string) => {
            const w = Math.max(1, half * cr * 0.5);
            ctx.strokeStyle = colour;
            ctx.lineWidth = Math.max(1, cr * 0.17);
            ctx.beginPath();
            ctx.moveTo(cx - cr - notchH, cy - w);
            ctx.lineTo(cx - cr + 1, cy);
            ctx.lineTo(cx - cr - notchH, cy + w);
            ctx.stroke();
        };

        // the germ, with its antigen as a bump on the coat
        ctx.fillStyle = binds ? '#64748b' : '#475569';
        ctx.beginPath();
        ctx.arc(germX, midY, gr, 0, Math.PI * 2);
        ctx.fill();
        const bw = Math.max(1.4, bump * cr * 0.5);
        ctx.fillStyle = binds ? LIT : GREY;
        ctx.beginPath();
        ctx.moveTo(germX + gr - 1, midY - bw);
        ctx.lineTo(germX + gr + Math.max(2, cr * 0.55), midY);
        ctx.lineTo(germX + gr - 1, midY + bw);
        ctx.closePath();
        ctx.fill();

        // the field. A cell that has switched on is two overlapping lobes: one cell
        // becoming two, so the clone is in the drawing and not in a caption.
        const split = cr * 0.45 * (0.55 + 0.45 * Math.sin(t * 2.2));
        const lit = new Set(ORDER.slice(0, count));
        for (let i = 0; i < TOTAL; i++) {
            const cx = fieldX + pitchX * ((i % COLS) + 0.5);
            const cy = artTop + pitchY * (Math.floor(i / COLS) + 0.5);
            const mine = lit.has(i);
            const alight = mine && binds;
            const colour = alight ? (good ? LIT : DIM) : GREY;
            ctx.fillStyle = alight ? (good ? 'rgba(190,18,60,0.3)' : 'rgba(180,83,9,0.28)')
                : 'rgba(148,163,184,0.22)';
            ctx.strokeStyle = colour;
            ctx.lineWidth = Math.max(1, cr * 0.2);
            if (alight) {
                const lobe = cr * 0.72;
                ctx.beginPath();
                ctx.arc(cx - split, cy, lobe, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(cx + split, cy, lobe, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
            notch(cx, cy, mine ? MW : OTHER[i % OTHER.length], mine ? colour : GREY);
        }

        // Fixed, separated slots below the drawing -- never anchored to the artwork, so
        // two labels cannot converge as the grid grows.
        const slot = artTop + artH;
        if (rows >= 1 && fullW >= 190) {
            outlineText(ctx, 'antigen', germX, slot + 11, 'bold 11px monospace', LIT, 'center', germW + 10);
            outlineText(ctx, 'receptors', fieldX + fieldW / 2, slot + 11,
                'bold 11px monospace', INK, 'center', fieldW);
        }
        if (rows >= 2) {
            outlineText(ctx, on > 0 ? 'the ones that fit divide' : 'no receptor fits this bump',
                left + fullW / 2, slot + 26, 'bold 11px monospace',
                on > 0 ? (good ? LIT : DIM) : MUTED, 'center', fullW);
        }

        outlineText(ctx, count + ' of ' + TOTAL + ' carry the shape', safeRight / 2,
            stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, binds ? on + ' switch on and divide' : 'drifted: none switch on',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            binds ? (good ? LIT : DIM) : MUTED, 'center', safeRight - 30);

        fitText(ctx, !binds ? 'The shape drifted'
            : count === 0 ? 'No cell here fits'
                : count === 1 ? '1 clone starts' : count + ' clones start at once',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, !binds ? 'Antigenic drift'
            : weak ? 'It binds weakly' : 'Clonal selection',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, count / 8)),
                caption: 'Cells That Fit This Germ',
                low: 'a handful: five days',
                high: 'thousands: two days',
                stops: [GREY, DIM, LIT] as [string, string, string],
            },
            note: !binds
                ? 'At ' + pct + '% the germ\'s bump is no longer the shape these receptors were made for, so nothing'
                  + ' binds and no clone starts. The ' + count + ' primed cells are still there, recognising nothing.'
                : count === 0
                    ? 'No cell in this field carries a receptor that fits this germ, so nothing here can switch on.'
                      + ' Somewhere in your library one does, and that is the cell this germ would have selected.'
                    : 'The germ finds the ' + count + ' cells whose receptor fits its antigen, and each divides into a'
                      + ' clone carrying the same shape. A vaccine changes this dial, and nothing else.',
        };
    };

    return (
        <LabCanvas
            title="The Shape You Already Had"
            readout={({ raw }) => cellsOf(raw) + ' of 24 cells fit'}
            controlLabel="Matching Cells"
            controlKey="matchingCells"
            controlMin={0}
            controlMax={8}
            controlInitial={1}
            controlDisplay={raw => cellsOf(raw) + ' of 24'}
            control2={{
                label: 'Receptor Fit',
                key: 'antigenFit',
                min: 0,
                max: 100,
                initial: 100,
                display: raw => fitOf(raw) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Stay Healthy?"
            completeNote="The germ does not teach. It selects!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
