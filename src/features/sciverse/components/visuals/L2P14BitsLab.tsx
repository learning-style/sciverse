import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SYMBOLS = 1000;
const ON = '#4338ca';
const OFF = '#cbd5e1';

const bitsOf = (dial: number): number => Math.max(1, Math.min(8, Math.round(dial)));
const rateOf = (dial: number): number => Math.max(100, Math.min(2000, Math.round(dial / 100) * 100));
const fmt = (x: number): string => x.toLocaleString('en-US');

const enoughFor = (bits: number): string => {
    if (bits >= 8) return 'enough for all of those, plus accents';
    if (bits >= 7) return 'enough for letters, digits and punctuation';
    if (bits >= 5) return 'enough for the 26 letters';
    if (bits >= 3) return 'enough for the notes of a scale';
    return 'enough for on or off';
};

export const L2P14BitsLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const bits = bitsOf(raw);
        const rate = rateOf(raw2);
        const patterns = Math.pow(2, bits);
        const totalBits = SYMBOLS * bits;
        const seconds = totalBits / rate;

        // One symbol, drawn as its switches. The count walks through every
        // pattern the bits can make, so a wider code visibly takes longer to
        // come back round.
        const counter = Math.floor(t * 2) % patterns;
        const boxW = Math.min(34, (safeRight - 60) / 8);
        const rowW = bits * (boxW + 6) - 6;
        const bx = (safeRight - rowW) / 2;
        const by = stageTop + 16;
        ctx.font = `bold ${Math.round(boxW * 0.5)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < bits; i++) {
            const bit = (counter >> (bits - 1 - i)) & 1;
            const x = bx + i * (boxW + 6);
            ctx.fillStyle = bit === 1 ? ON : OFF;
            ctx.fillRect(x, by, boxW, boxW);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, by, boxW, boxW);
            ctx.fillStyle = bit === 1 ? '#ffffff' : '#475569';
            ctx.fillText(bit === 1 ? '1' : '0', x + boxW / 2, by + boxW / 2 + 1);
        }
        ctx.textBaseline = 'alphabetic';

        outlineText(ctx, `${bits} bits for each symbol`, safeRight / 2, by + boxW + 18,
            '12px monospace', '#475569', 'center', safeRight - 30);
        outlineText(ctx, `2 to the power ${bits} = ${fmt(patterns)} patterns`, safeRight / 2, by + boxW + 38,
            'bold 13px monospace', ON, 'center', safeRight - 30);
        outlineText(ctx, enoughFor(bits), safeRight / 2, by + boxW + 56,
            '11px monospace', '#475569', 'center', safeRight - 30);

        // The message: how much of the widest code's 8,000 bits this one costs
        const gx = 30;
        const gw = safeRight - 60;
        const gy = Math.min(by + boxW + 76, stageBottom - 60);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(gx, gy, gw, 14);
        ctx.fillStyle = ON;
        ctx.fillRect(gx, gy, gw * (bits / 8), 14);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(gx, gy, gw, 14);

        outlineText(ctx, `${fmt(SYMBOLS)} symbols = ${fmt(totalBits)} bits`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${fmt(totalBits)} bits at ${fmt(rate)} bits per second = ${seconds.toFixed(1)} s`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ON, 'center', safeRight - 30);

        fitText(ctx, `${bits} bits make ${fmt(patterns)} patterns`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Each bit doubles the patterns', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: bits / 8,
                caption: 'Bits for Each Symbol',
                low: '1',
                high: '8',
                stops: ['#eef2ff', '#a5b4fc', ON] as [string, string, string],
            },
            note: `${bits} bits make ${fmt(patterns)} patterns -- ${enoughFor(bits)}. A message of ${fmt(SYMBOLS)} symbols is ${fmt(totalBits)} bits, which takes ${seconds.toFixed(1)} s at ${fmt(rate)} bits per second.`,
        };
    };

    return (
        <LabCanvas
            title="How Many Bits?"
            readout={({ raw }) => `A code with ${bitsOf(raw)} bits for each symbol`}
            controlLabel="Bits for Each Symbol"
            controlKey="bitsEach"
            controlMin={1}
            controlMax={8}
            controlInitial={8}
            controlDisplay={raw => `${bitsOf(raw)} bits`}
            control2={{
                label: 'Bit Rate',
                key: 'bitRate',
                min: 100,
                max: 2000,
                initial: 1000,
                display: raw => `${fmt(rateOf(raw))} bits per second`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Many Bits?"
            completeNote="patterns = 2 to the power n!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
