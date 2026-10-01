import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One question on the stage: is that boundary inside what this probe can reach?
// A depth scale with the boundary on it, and the probe's reach shaded behind it.
// 300 us is 23.1 cm, so the scale runs to 25 cm and nothing falls off it.
const MAX_CM = 25;
const MM_PER_US = 0.77;        // 1.54 mm/us there and back, so the 2 is already in
const ROSE = '#e11d48';
const OUT = '#7f1d1d';

const timeOf = (dial: number): number => Math.max(10, Math.min(300, Math.round(dial)));
const freqOf = (dial: number): number => Math.round(Math.max(20, Math.min(200, dial))) / 10;

export const L2B22EchoLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const us = timeOf(raw);
        const mhz = freqOf(raw2);
        const depthCm = (MM_PER_US * us) / 10;
        const reachCm = 60 / mhz;
        const detailMm = 1540 / (mhz * 1e6) * 1000;
        const seen = depthCm <= reachCm;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const scaleH = Math.max(40, usable - CAP - TAIL);
        const blockH = CAP + scaleH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const scaleTop = top + CAP;
        const yOf = (cm: number) => scaleTop + (cm / MAX_CM) * scaleH;

        const left = 20;
        const bodyW = Math.max(90, safeRight - 40);

        // the tissue the probe is looking into
        ctx.fillStyle = '#fff1f2';
        ctx.fillRect(left, scaleTop, bodyW, scaleH);
        // how far this frequency gets
        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(left, scaleTop, bodyW, Math.min(scaleH, yOf(reachCm) - scaleTop));
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, scaleTop, bodyW, scaleH);

        // the probe on the skin, and the pulse travelling down
        ctx.fillStyle = ROSE;
        ctx.fillRect(left + bodyW / 2 - 16, scaleTop - 7, 32, 7);
        const trip = (t * 0.6) % 1;
        const pulseY = scaleTop + trip * Math.min(yOf(depthCm) - scaleTop, scaleH);
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(left + bodyW / 2, scaleTop);
        ctx.lineTo(left + bodyW / 2, pulseY);
        ctx.stroke();

        // the reach line, then the boundary
        const ry = yOf(Math.min(reachCm, MAX_CM));
        if (reachCm < MAX_CM) {
            ctx.strokeStyle = '#9f1239';
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(left, ry); ctx.lineTo(left + bodyW, ry); ctx.stroke();
            ctx.setLineDash([]);
        }
        const by = yOf(Math.min(depthCm, MAX_CM));
        ctx.strokeStyle = seen ? '#0f172a' : '#94a3b8';
        ctx.lineWidth = seen ? 3 : 1.5;
        if (!seen) ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(left, by); ctx.lineTo(left + bodyW, by); ctx.stroke();
        ctx.setLineDash([]);

        outlineText(ctx, 'the probe sends and listens, so halve the journey',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'boundary ' + depthCm.toFixed(1) + ' cm',
            safeRight / 2, Math.max(Math.min(by - 6, artBottom - 4), scaleTop + 12),
            'bold 12px monospace', seen ? '#0f172a' : OUT, 'center', safeRight - 24);
        if (reachCm < MAX_CM) {
            outlineText(ctx, mhz.toFixed(1) + ' MHz reaches ' + reachCm.toFixed(0) + ' cm',
                safeRight / 2, Math.max(Math.min(ry + 13, artBottom), scaleTop + 26),
                'bold 11px monospace', '#9f1239', 'center', safeRight - 24);
        }
        outlineText(ctx, seen ? 'within reach: the echo comes back'
            : 'too deep for this probe: no echo',
            safeRight / 2, Math.min(scaleTop + scaleH + 16, artBottom),
            'bold 12px monospace', seen ? ROSE : OUT, 'center', safeRight - 24);

        outlineText(ctx, 'depth = 0.77 mm x ' + us + ' µs = '
            + (MM_PER_US * us).toFixed(0) + ' mm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'finest detail ' + detailMm.toFixed(2) + ' mm, about one wavelength',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, 'boundary at ' + depthCm.toFixed(1) + ' cm', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Fine detail and depth share one dial',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, depthCm / MAX_CM)),
                caption: 'Depth of the Boundary',
                low: '0',
                high: MAX_CM + ' cm',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: 'An echo at ' + us + ' µs puts the boundary ' + depthCm.toFixed(1)
                + ' cm down. At ' + mhz.toFixed(1) + ' MHz the finest detail is '
                + detailMm.toFixed(2) + ' mm and the sound reaches about ' + reachCm.toFixed(0)
                + ' cm, so this boundary ' + (seen ? 'is in range.' : 'is out of range.'),
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
