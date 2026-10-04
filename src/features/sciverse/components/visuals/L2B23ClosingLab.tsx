import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// The wound drawn at its real shape, with the two long edges closing in on each
// other. What the picture has to make obvious is that the SHORT side sets the
// clock -- the length is almost irrelevant -- so the rectangle is drawn to scale
// and the short side is the dimension that is marked.
const RATE = 0.5;              // mm a day, the advancing edge
const MAX_DAYS = 21;           // 400 mm2 as a square is 20 days, so nothing pegs
const ROSE = '#e11d48';
const SLOW = '#7f1d1d';

const areaOf = (dial: number): number => Math.max(25, Math.min(400, Math.round(dial / 25) * 25));
const ratioOf = (dial: number): number => Math.max(1, Math.min(50, Math.round(dial)));

export const L2B23ClosingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const area = areaOf(raw);
        const ratio = ratioOf(raw2);
        const shortMm = Math.sqrt(area / ratio);
        const longMm = shortMm * ratio;
        const days = (shortMm / 2) / RATE;
        const slow = days > 7;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const room = Math.max(36, usable - CAP - TAIL);
        const blockH = CAP + room + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const bandTop = top + CAP;
        const midY = bandTop + room / 2;

        // one scale for both sides, so the shape on screen is the real shape
        const avail = Math.max(80, safeRight - 56);
        const mm2px = Math.min(avail / Math.max(longMm, 1), room / Math.max(shortMm, 1));
        const wPx = longMm * mm2px;
        const hPx = shortMm * mm2px;
        const left = (safeRight - wPx) / 2;

        ctx.fillStyle = '#fff1f2';
        ctx.fillRect(left, midY - hPx / 2, wPx, hPx);
        ctx.strokeStyle = slow ? SLOW : ROSE;
        ctx.lineWidth = 2;
        ctx.strokeRect(left, midY - hPx / 2, wPx, hPx);

        // the two long edges advancing inward: the whole mechanism, drawn
        const crept = ((t * 0.35) % 1) * (hPx / 2) * 0.8;
        ctx.fillStyle = '#fda4af';
        ctx.fillRect(left, midY - hPx / 2, wPx, crept);
        ctx.fillRect(left, midY + hPx / 2 - crept, wPx, crept);
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 1.6;
        for (const dir of [-1, 1]) {
            const y = midY + dir * (hPx / 2 - crept);
            ctx.beginPath();
            ctx.moveTo(left + 4, y); ctx.lineTo(left + wPx - 4, y);
            ctx.stroke();
            const ax = left + wPx / 2;
            ctx.beginPath();
            ctx.moveTo(ax, y);
            ctx.lineTo(ax - 4, y - dir * 6);
            ctx.lineTo(ax + 4, y - dir * 6);
            ctx.closePath();
            ctx.fillStyle = ROSE;
            ctx.fill();
        }

        outlineText(ctx, 'each long edge creeps inward, so each goes half way',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        // Two fixed slots below the artwork. Placing one label from the rectangle
        // and the other from the band let them land on each other -- 2 px apart in
        // the worst case, which is what a reader saw.
        const rowOne = Math.min(bandTop + room + 14, artBottom - 14);
        const rowTwo = Math.min(bandTop + room + 28, artBottom);
        outlineText(ctx, 'short side ' + shortMm.toFixed(1) + ' mm',
            safeRight / 2, rowOne,
            'bold 12px monospace', slow ? SLOW : ROSE, 'center', safeRight - 24);
        outlineText(ctx, 'long side ' + longMm.toFixed(0) + ' mm, which barely matters',
            safeRight / 2, rowTwo,
            'bold 11px monospace', '#334155', 'center', safeRight - 24);

        outlineText(ctx, 'short side = √(' + area + ' / ' + ratio + ') = '
            + shortMm.toFixed(1) + ' mm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'half of that is ' + (shortMm / 2).toFixed(1) + ' mm, at '
            + RATE.toFixed(1) + ' mm a day = ' + days.toFixed(1) + ' days',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            slow ? SLOW : ROSE, 'center', safeRight - 30);

        fitText(ctx, 'closes in ' + days.toFixed(1) + ' days',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Across the short side, not along the long one',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, days / MAX_DAYS)),
                caption: 'Days to Close',
                low: 'closed in hours',
                high: 'three weeks of it',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: area + ' mm² at ' + ratio + ' times longer than wide is '
                + longMm.toFixed(0) + ' by ' + shortMm.toFixed(1)
                + ' mm, so each edge travels ' + (shortMm / 2).toFixed(1) + ' mm and it closes in '
                + days.toFixed(1) + ' days.',
        };
    };

    return (
        <LabCanvas
            title="Round or a Line?"
            readout={({ raw }) => 'A wound of ' + areaOf(raw) + ' square millimetres'}
            controlLabel="Wound Area"
            controlKey="woundArea"
            controlMin={25}
            controlMax={400}
            controlInitial={100}
            controlDisplay={raw => areaOf(raw) + ' mm²'}
            control2={{
                label: 'Wound Shape',
                key: 'woundRatio',
                min: 1,
                max: 50,
                initial: 1,
                display: raw => ratioOf(raw) + ' times longer than wide',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="Breaking and recovering are both boundary events!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
