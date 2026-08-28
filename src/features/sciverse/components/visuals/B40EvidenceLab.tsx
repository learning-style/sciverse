import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A real but small effect only becomes visible once the sample is big enough. */
export const B40EvidenceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        // Sample size sweeps 1 -> 1000 on a log scale.
        const n = Math.max(1, Math.round(Math.pow(10, (raw / 100) * 3)));
        const plotY = stageTop + 6;
        const plotH = Math.max(80, stageBottom - plotY - 36);
        const midX = safeRight / 2;

        // Two groups of dots: treated (right) and untreated (left).
        const shown = Math.min(n, 120);
        const drawGroup = (cx: number, label: string, color: string, offset: number) => {
            for (let i = 0; i < shown; i++) {
                const seed = Math.sin(i * 7.13 + offset) * 43758.5453;
                const rnd = seed - Math.floor(seed);
                const seed2 = Math.sin(i * 3.71 + offset + 5) * 24634.6345;
                const rnd2 = seed2 - Math.floor(seed2);
                const x = cx - 70 + rnd * 140;
                const y = plotY + 12 + rnd2 * (plotH - 24);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, 3.2, 0, Math.PI * 2);
                ctx.fill();
            }
            outlineText(ctx, label, cx, plotY + plotH + 22, 'bold 14px monospace');
        };

        drawGroup(midX - 110, 'no treatment', 'rgba(100,116,139,0.7)', 0);
        drawGroup(midX + 110, 'treated', 'rgba(220,38,38,0.7)', 100);

        // The measured difference wobbles wildly at small n and settles at large n.
        const trueEffect = 6;                       // the real effect, in percent
        const noiseSeed = Math.sin(n * 1.37) * 1000;
        const noise = ((noiseSeed - Math.floor(noiseSeed)) - 0.5) * (60 / Math.sqrt(n));
        const measured = trueEffect + noise;
        const margin = 30 / Math.sqrt(n);           // uncertainty shrinks with sample size
        const conclusive = margin < trueEffect;     // effect is bigger than the wobble

        fitText(ctx, `Sample size: ${n} per group`, safeRight / 2, 84, safeRight - 24, 15);
        fitText(ctx, `Measured difference: ${measured.toFixed(1)}%  ±  ${margin.toFixed(1)}%`, safeRight / 2, 106, safeRight - 24, 15, conclusive ? '#15803d' : '#b91c1c');

        outlineText(
            ctx,
            conclusive ? 'The effect is bigger than the wobble -- this is real evidence.'
                : 'The wobble is bigger than the effect -- this could easily be luck.',
            safeRight / 2, stageBottom - 12, 'bold 14px monospace',
            conclusive ? '#15803d' : '#b91c1c'
        );


        const msg = n < 5
            ? 'This is anecdotal -- a handful of cases proves nothing at all.'
            : n < 50
                ? 'A hint of a pattern, but random luck could easily explain it.'
                : n < 300
                    ? 'The pattern is holding up as the sample grows.'
                    : 'Large sample! The real effect now stands clearly above the noise.';
        return { meter: { fraction: conclusive ? Math.min(1, 1 - margin / trueEffect) : 0.05, caption: 'Strength of the Evidence', low: 'Just a story', high: 'Convincing' }, note: msg };
    };

    return (
        <LabCanvas
            title="Follow the Evidence"
            readout={({ raw }) => `Studying ${Math.max(1, Math.round(Math.pow(10, (raw / 100) * 3)))} per group`}
            controlLabel="Sample Size"
            controlKey="sampleSize"
            controlInitial={0}
            controlDisplay={raw => `${Math.max(1, Math.round(Math.pow(10, (raw / 100) * 3)))}`}
            accent="rose"
            sky={['#fdf2f8', '#f8fafc']}
            completeTitle="B40 Complete!"
            completeSubtitle="How Do We Use Data to Know What Is True?"
            completeNote="Sample size decides what you are allowed to claim!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
