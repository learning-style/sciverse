import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the load crowds past the notch, so the peak beside it is K times the
// average. The notch is drawn at its real a/b, so sharpening the dial visibly
// stretches it across the pull -- the shape IS the answer.
const AREA = 500;              // a 50 x 10 mm plate
const YIELD = 250;             // N/mm2, where structural steel starts to yield
const MAX_SHOWN = 3400;        // K = 21 at 80 kN, so the gauge is stretched to fit
const INDIGO = '#4338ca';
const BREAK = '#7f1d1d';

// b is held at 1.0 mm along the pull, so the dial's reading IS a in mm and the
// footer's a/b is a division of two numbers labelled on the drawing.
const B_MM = 1.0;
const loadOf = (dial: number): number => Math.max(10, Math.min(80, Math.round(dial / 5) * 5));
const aOf = (dial: number): number => Math.round(Math.max(5, Math.min(100, dial))) / 10;
const kOf = (ab: number): number => 1 + 2 * ab;

export const L2P23NotchLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const kN = loadOf(raw);
        const aMm = aOf(raw2);
        const ab = aMm / B_MM;
        const K = kOf(ab);
        const plain = (kN * 1000) / AREA;
        const peak = K * plain;
        const breaks = peak > YIELD;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const plateH = Math.max(34, Math.min(104, usable - CAP - TAIL));
        const blockH = CAP + plateH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const plateTop = top + CAP;
        const midY = plateTop + plateH / 2;

        const left = 30;
        const plateW = Math.max(100, safeRight - 60);
        const cx = left + plateW / 2;

        ctx.fillStyle = '#eef2ff';
        ctx.fillRect(left, plateTop, plateW, plateH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, plateTop, plateW, plateH);

        // the notch, drawn at its real shape: a across the pull, b along it
        // The notch must leave room for the load lines beside it, or the picture loses
        // the one thing it is for. On the shortest canvas the plate is only 34px tall.
        const across = Math.min(plateH * 0.28, 8 + ab * 3.2);
        const along = across / ab;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(cx, midY, along, across, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = breaks ? BREAK : INDIGO;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // a and b measured on the notch itself, to scale, so the words "across" and
        // "along" below the plate have something to point at. At a sharp setting b
        // really is a sliver, and the drawing says so rather than flattering it.
        const tick = (x1: number, y1: number, x2: number, y2: number) => {
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            const vertical = x1 === x2;
            for (const [px, py] of [[x1, y1], [x2, y2]] as [number, number][]) {
                ctx.beginPath();
                if (vertical) { ctx.moveTo(px - 3, py); ctx.lineTo(px + 3, py); }
                else { ctx.moveTo(px, py - 3); ctx.lineTo(px, py + 3); }
                ctx.stroke();
            }
        };
        // a, across the pull
        tick(cx - along - 8, midY - across, cx - along - 8, midY + across);
        // b, along the pull
        tick(cx - along, midY + across + 4, cx + along, midY + across + 4);

        // The load crowding past the notch. The lines are the paths the load takes;
        // they bunch against the notch and spread out further away, and the bigger K
        // is the harder they bunch -- so the drawing shows what the number means.
        const LINES = 7;
        const reach = Math.max(3, plateH / 2 - 4 - across);
        for (let i = 0; i < LINES; i++) {
            const even = (i + 1) / LINES;
            const bunched = Math.pow(even, Math.max(1, K / 2));
            const off = across + reach * bunched;
            ctx.strokeStyle = i === 0 ? (breaks ? BREAK : INDIGO) : '#a5b4fc';
            ctx.lineWidth = i === 0 ? 2.2 : 1;
            for (const y of [midY - off, midY + off]) {
                ctx.beginPath();
                ctx.moveTo(left + 2, y);
                ctx.lineTo(left + plateW - 2, y);
                ctx.stroke();
            }
        }

        // the pull, both ends, pulsing with the load
        const pull = 6 + (kN / 80) * 10 + Math.sin(t * 3) * 1.2;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        for (const [x0, dir] of [[left, -1], [left + plateW, 1]] as [number, number][]) {
            ctx.beginPath();
            ctx.moveTo(x0, midY);
            ctx.lineTo(x0 + dir * pull, midY);
            ctx.stroke();
        }

        outlineText(ctx, 'K = how many times the notch beats the average',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'plain ' + plain.toFixed(0) + ' N/mm²',
            left + plateW * 0.17, Math.max(midY - across - 7, plateTop + 11),
            'bold 11px monospace', INDIGO, 'center', plateW / 2);
        // Both lengths the footer divides, in one line so they fit the 240px panel,
        // each with the arrow for its own direction and matching the ticks above.
        outlineText(ctx, '↕ a ' + aMm.toFixed(1) + ' across, ↔ b '
            + B_MM.toFixed(1) + ' along',
            safeRight / 2, Math.min(plateTop + plateH + 14, artBottom - 16),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 24);
        outlineText(ctx, breaks ? 'breaks: steel yields at ' + YIELD + ' N/mm²'
            : 'holds: under ' + YIELD + ' N/mm²',
            safeRight / 2, Math.min(plateTop + plateH + 30, artBottom),
            'bold 12px monospace', breaks ? BREAK : INDIGO, 'center', safeRight - 24);

        outlineText(ctx, 'K = 1 + 2 x ' + aMm.toFixed(1) + '/' + B_MM.toFixed(1)
            + ' = ' + K.toFixed(1),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, K.toFixed(1) + ' x ' + plain.toFixed(0) + ' N/mm² = '
            + peak.toFixed(0) + ' N/mm²',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            breaks ? BREAK : INDIGO, 'center', safeRight - 30);

        fitText(ctx, 'at the notch ' + peak.toFixed(0) + ' N/mm²',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The shape of the flaw, not its size',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.sqrt(peak / MAX_SHOWN))),
                caption: 'Stress at the Notch (stretched)',
                low: 'no load at all',
                high: 'far past the limit',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: 'A ' + kN + ' kN pull on 500 mm² is ' + plain.toFixed(0)
                + ' N/mm² on average, and a notch ' + ab.toFixed(1)
                + ' times wider across the pull than along it multiplies that by '
                + K.toFixed(1) + ', giving ' + peak.toFixed(0) + ' N/mm².',
        };
    };

    return (
        <LabCanvas
            title="Will the Notch Break It?"
            readout={({ raw }) => 'A pull of ' + loadOf(raw) + ' kN'}
            controlLabel="Load"
            controlKey="notchLoad"
            controlMin={10}
            controlMax={80}
            controlInitial={50}
            controlDisplay={raw => loadOf(raw) + ' kN'}
            control2={{
                label: 'Notch Sharpness',
                key: 'notchShape',
                min: 5,
                max: 100,
                initial: 10,
                display: raw => 'a ' + aOf(raw).toFixed(1) + ' mm across, b '
                    + B_MM.toFixed(1) + ' mm along',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="One plus two a over b!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
