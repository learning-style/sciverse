import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea on the stage: the pulse goes down and comes back, so the depth is half
// the journey. The two legs are drawn as two arrows of EQUAL length side by side,
// which is the whole argument for the factor of 2 -- the earlier version asserted
// it in a caption and then printed "0.77 mm x 245 us = 189 mm", which multiplies
// millimetres by microseconds and quietly hid the halving it was explaining.
//
// The arithmetic is now two honest steps whose units cancel:
//   1.54 mm per us x 245 us = 377 mm  (there and back)
//   half of 377 mm          = 189 mm  (the depth)
//
// The frequency dial acts on this picture in exactly one way -- whether the echo
// comes back at all. The detail-against-depth figure lives in the note, not on the
// stage, because it is a second idea and this picture can only carry one.
const MAX_CM = 25;
const MM_PER_US = 1.54;        // speed of sound in soft tissue, 1540 m/s
const ROSE = '#e11d48';
const OUT = '#7f1d1d';

const timeOf = (dial: number): number => Math.max(10, Math.min(300, Math.round(dial)));
const freqOf = (dial: number): number => Math.round(Math.max(20, Math.min(200, dial))) / 10;

export const L2B22EchoLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const us = timeOf(raw);
        const mhz = freqOf(raw2);
        const roundTripMm = MM_PER_US * us;
        const depthMm = roundTripMm / 2;
        const depthCm = depthMm / 10;
        const reachCm = 60 / mhz;
        const detailMm = 1540 / (mhz * 1e6) * 1000;
        const seen = depthCm <= reachCm;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 20;
        const scaleH = Math.max(40, usable - CAP - TAIL);
        const blockH = CAP + scaleH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const scaleTop = top + CAP;
        const yOf = (cm: number) => scaleTop + (Math.min(cm, MAX_CM) / MAX_CM) * scaleH;

        const left = 20;
        const bodyW = Math.max(90, safeRight - 40);
        const cx = left + bodyW / 2;

        // the tissue, and how far this frequency gets into it
        ctx.fillStyle = '#fff1f2';
        ctx.fillRect(left, scaleTop, bodyW, scaleH);
        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(left, scaleTop, bodyW, Math.min(scaleH, yOf(reachCm) - scaleTop));
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, scaleTop, bodyW, scaleH);

        // the probe on the skin: it sends AND listens, which is why there are two legs
        ctx.fillStyle = ROSE;
        ctx.fillRect(cx - 18, scaleTop - 7, 36, 7);

        const by = yOf(depthCm);

        // two arrows of equal length, side by side -- the factor of 2, drawn
        const legColour = seen ? ROSE : OUT;
        const arrow = (x: number, y1: number, y2: number, headAtEnd: boolean) => {
            ctx.strokeStyle = legColour;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
            const hy = headAtEnd ? y2 : y1;
            const dir = headAtEnd ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(x, hy);
            ctx.lineTo(x - 4, hy - dir * 7);
            ctx.lineTo(x + 4, hy - dir * 7);
            ctx.closePath();
            ctx.fillStyle = legColour;
            ctx.fill();
        };
        arrow(cx - 16, scaleTop, by, true);     // down to the boundary
        arrow(cx + 16, by, scaleTop, false);    // and back up to the probe

        // the pulse itself, down then up, so the two legs read as one journey
        const cycle = (t * 0.5) % 2;
        const along = cycle < 1 ? cycle : 2 - cycle;
        ctx.fillStyle = legColour;
        ctx.beginPath();
        ctx.arc(cx + (cycle < 1 ? -16 : 16), scaleTop + along * (by - scaleTop), 3.4, 0, Math.PI * 2);
        ctx.fill();

        // the boundary, and the limit of this probe's reach
        if (reachCm < MAX_CM) {
            const ry = yOf(reachCm);
            ctx.strokeStyle = '#9f1239';
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(left, ry); ctx.lineTo(left + bodyW, ry); ctx.stroke();
            ctx.setLineDash([]);
        }
        ctx.strokeStyle = seen ? '#0f172a' : '#94a3b8';
        ctx.lineWidth = seen ? 3 : 1.5;
        if (!seen) ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(left, by); ctx.lineTo(left + bodyW, by); ctx.stroke();
        ctx.setLineDash([]);

        outlineText(ctx, 'down to the boundary and back up again',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        // one short word beside each arrow, clear of both so the two equal lengths
        // stay the thing you see. A single centred label would be drawn across them.
        const legY = Math.max(Math.min((scaleTop + by) / 2 + 4, artBottom - 4), scaleTop + 14);
        outlineText(ctx, 'down', cx - 38, legY, 'bold 11px monospace', legColour, 'center', 40);
        outlineText(ctx, 'back', cx + 38, legY, 'bold 11px monospace', legColour, 'center', 40);
        if (reachCm < MAX_CM) {
            outlineText(ctx, 'this probe reaches ' + reachCm.toFixed(0) + ' cm',
                safeRight / 2, Math.max(Math.min(yOf(reachCm) + 13, artBottom), scaleTop + 28),
                'bold 11px monospace', '#9f1239', 'center', safeRight - 24);
        }
        outlineText(ctx, seen ? 'the echo comes back' : 'too deep for ' + mhz.toFixed(1) + ' MHz: no echo',
            safeRight / 2, Math.min(scaleTop + scaleH + 15, artBottom),
            'bold 12px monospace', seen ? ROSE : OUT, 'center', safeRight - 24);

        outlineText(ctx, MM_PER_US.toFixed(2) + ' mm per µs x ' + us + ' µs = '
            + roundTripMm.toFixed(0) + ' mm there and back',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'half of ' + roundTripMm.toFixed(0) + ' mm = ' + depthMm.toFixed(0)
            + ' mm, so ' + depthCm.toFixed(1) + ' cm down',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, 'boundary at ' + depthCm.toFixed(1) + ' cm', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Down and back, so halve it', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, depthCm / MAX_CM)),
                caption: 'Depth of the Boundary',
                low: '0',
                high: MAX_CM + ' cm',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: 'An echo at ' + us + ' µs is ' + roundTripMm.toFixed(0)
                + ' mm there and back, so the boundary is ' + depthCm.toFixed(1)
                + ' cm down. At ' + mhz.toFixed(1) + ' MHz the finest detail is '
                + detailMm.toFixed(2) + ' mm and the sound reaches about ' + reachCm.toFixed(0)
                + ' cm.',
        };
    };

    return (
        <LabCanvas
            title="How Deep and How Fine?"
            readout={({ raw }) => 'An echo at ' + timeOf(raw) + ' microseconds'}
            controlLabel="Echo Time"
            controlKey="echoUs"
            controlMin={10}
            controlMax={300}
            controlInitial={130}
            controlDisplay={raw => timeOf(raw) + ' µs'}
            control2={{
                label: 'Probe Frequency',
                key: 'probeMhz',
                min: 20,
                max: 200,
                initial: 50,
                display: raw => freqOf(raw).toFixed(1) + ' MHz',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Waves Help Us See the Invisible?"
            completeNote="Down and back, so halve it!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
