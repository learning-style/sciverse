import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const WAVE_HZ = 5;
const INDIGO = '#4338ca';
const STORED = '#b45309';

const rateOf = (dial: number): number => Math.max(4, Math.min(100, Math.round(dial)));
const depthOf = (dial: number): number => Math.max(2, Math.min(16, Math.round(dial)));

export const L3P14SampleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const bits = depthOf(raw2);
        const levels = Math.pow(2, bits);
        const bitRate = rate * bits;
        const nyquist = rate / 2;
        const captured = nyquist >= WAVE_HZ;
        // Below two samples a cycle the stored wave is a slower impostor
        const stored = captured ? WAVE_HZ : Math.abs(rate - WAVE_HZ);

        const px = 30;
        const pw = safeRight - 60;
        const py = stageTop + 20;
        const ph = Math.min(120, stageBottom - 76 - py);
        const mid = py + ph / 2;
        const amp = ph / 2 - 8;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(px, py, pw, ph);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, mid);
        ctx.lineTo(px + pw, mid);
        ctx.stroke();

        // The real wave: one second of it, left to right
        ctx.strokeStyle = INDIGO;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= pw; i++) {
            const y = mid - Math.sin((i / pw) * WAVE_HZ * 2 * Math.PI) * amp;
            if (i === 0) ctx.moveTo(px + i, y);
            else ctx.lineTo(px + i, y);
        }
        ctx.stroke();

        // The samples, each rounded to the nearest level, and the staircase they store
        const step = pw / rate;
        const quantise = (value: number): number => {
            const slot = Math.round(((value + 1) / 2) * (levels - 1));
            return (slot / (levels - 1)) * 2 - 1;
        };
        ctx.strokeStyle = STORED;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let s = 0; s <= rate; s++) {
            const x = px + s * step;
            const held = quantise(Math.sin((s / rate) * stored * 2 * Math.PI));
            const y = mid - held * amp;
            if (s === 0) ctx.moveTo(x, y);
            else {
                ctx.lineTo(x, y);
            }
            ctx.lineTo(Math.min(px + pw, x + step), y);
        }
        ctx.stroke();
        ctx.fillStyle = STORED;
        for (let s = 0; s <= rate; s++) {
            const x = px + s * step;
            if (x > px + pw) break;
            const held = quantise(Math.sin((s / rate) * stored * 2 * Math.PI));
            ctx.beginPath();
            ctx.arc(x, mid - held * amp, 2.6, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, pw, ph);
        outlineText(ctx, `the wave: ${WAVE_HZ} Hz`, px + 6, py + ph + 15, '11px monospace', INDIGO, 'left', pw * 0.5);
        outlineText(ctx, `the staircase: ${levels} levels`, px + pw - 6, py + ph + 15, '11px monospace', STORED, 'right', pw * 0.5);

        outlineText(ctx, `bit rate = ${rate} x ${bits} x 1 = ${bitRate.toLocaleString('en-US')} bits each second`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx,
            captured
                ? `Nyquist frequency ${nyquist} Hz: the wave is captured`
                : `Nyquist frequency ${nyquist} Hz: aliasing, stored as ${stored} Hz`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', captured ? INDIGO : STORED, 'center', safeRight - 30);

        fitText(ctx, `${rate} samples each second at ${bits} bits`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Rate for frequency, bits for height', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, rate / WAVE_HZ / 4)),
                caption: 'Samples Each Cycle',
                low: '0',
                high: '4',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: captured
                ? `${rate} samples each second gives a Nyquist frequency of ${nyquist} Hz, so a ${WAVE_HZ} Hz wave is captured. Each sample is rounded to one of ${levels} levels, and the bit rate is ${bitRate.toLocaleString('en-US')} bits each second.`
                : `${rate} samples each second gives a Nyquist frequency of only ${nyquist} Hz, so the ${WAVE_HZ} Hz wave is stored as a ${stored} Hz wave that was never played: aliasing.`,
        };
    };

    return (
        <LabCanvas
            title="Turning a Wave into Numbers"
            readout={({ raw }) => `A wave measured ${rateOf(raw)} times each second`}
            controlLabel="Samples Each Second"
            controlKey="sampleRate"
            controlMin={4}
            controlMax={100}
            controlInitial={40}
            controlDisplay={raw => `${rateOf(raw)} samples each second`}
            control2={{
                label: 'Bits in a Sample',
                key: 'bitDepth',
                min: 2,
                max: 16,
                initial: 8,
                display: raw => `${depthOf(raw)} bits`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Turning a Wave into Numbers"
            completeNote="twice the highest frequency!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
