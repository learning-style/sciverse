import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// The whole lesson is one picture: the largest circle that fits inside the wound.
// Draw the wound, draw that circle in it, and its radius is the answer -- so the
// shape dial visibly squeezes the circle down as the wound is drawn out into a line.
const AREA = 100;              // mm2, held fixed so only the shape is changing
const MAX_DAYS = 21;
const ROSE = '#e11d48';
const STUCK = '#7f1d1d';

const ratioOf = (dial: number): number => Math.max(1, Math.min(50, Math.round(dial)));
const speedOf = (dial: number): number => Math.max(0.25, Math.min(1, Math.round(dial) / 100));

export const L3B23InradiusLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const ratio = ratioOf(raw);
        const speed = speedOf(raw2);
        const shortMm = Math.sqrt(AREA / ratio);
        const longMm = shortMm * ratio;
        const inradiusMm = shortMm / 2;
        const days = inradiusMm / speed;
        const slow = days > 14;

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

        const avail = Math.max(80, safeRight - 48);
        const mm2px = Math.min(avail / Math.max(longMm, 1), room / Math.max(shortMm, 1));
        const wPx = longMm * mm2px;
        const hPx = shortMm * mm2px;
        const left = (safeRight - wPx) / 2;

        ctx.fillStyle = '#fff1f2';
        ctx.fillRect(left, midY - hPx / 2, wPx, hPx);
        ctx.strokeStyle = slow ? STUCK : ROSE;
        ctx.lineWidth = 2;
        ctx.strokeRect(left, midY - hPx / 2, wPx, hPx);

        // the largest circle that fits: its radius IS the answer
        const rPx = hPx / 2;
        ctx.strokeStyle = '#0f172a';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(left + wPx / 2, midY, Math.max(1.5, rPx), 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // its radius, drawn as the distance the edge must cross
        const grow = 0.5 + 0.5 * Math.sin(t * 2);
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left + wPx / 2, midY);
        ctx.lineTo(left + wPx / 2, midY - rPx * grow);
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(left + wPx / 2, midY, 2.6, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'the largest circle that fits, and its radius',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'inradius ' + inradiusMm.toFixed(2) + ' mm',
            safeRight / 2, Math.max(Math.min(midY + hPx / 2 + 14, artBottom - 16), bandTop + 12),
            'bold 12px monospace', slow ? STUCK : ROSE, 'center', safeRight - 24);
        outlineText(ctx, longMm.toFixed(0) + ' mm long, which is not in the answer',
            safeRight / 2, Math.min(bandTop + room + 16, artBottom),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);

        outlineText(ctx, 'inradius ' + inradiusMm.toFixed(2) + ' mm / ' + speed.toFixed(2)
            + ' mm a day = ' + days.toFixed(1) + ' days',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'area, perimeter and length are all absent',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            slow ? STUCK : ROSE, 'center', safeRight - 30);

        fitText(ctx, 'closes in ' + days.toFixed(1) + ' days',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The biggest circle that fits', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, days / MAX_DAYS)),
                caption: 'Days to Close',
                low: 'closed in a day',
                high: 'three weeks of it',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: AREA + ' mm² at ' + ratio + ' times longer than wide is '
                + longMm.toFixed(0) + ' by ' + shortMm.toFixed(1)
                + ' mm, so the largest circle inside it has a radius of '
                + inradiusMm.toFixed(2) + ' mm and it closes in ' + days.toFixed(1) + ' days.',
        };
    };

    return (
        <LabCanvas
            title="Why the Edge Does the Work"
            readout={({ raw }) => 'A wound ' + ratioOf(raw) + ' times longer than wide'}
            controlLabel="Wound Shape"
            controlKey="inradiusRatio"
            controlMin={1}
            controlMax={50}
            controlInitial={1}
            controlDisplay={raw => ratioOf(raw) + ' times longer than wide'}
            control2={{
                label: 'How Fast the Edge Advances',
                key: 'edgeSpeed',
                min: 25,
                max: 100,
                initial: 50,
                display: raw => speedOf(raw).toFixed(2) + ' mm a day',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="Every one is about shortening a distance to a boundary!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
