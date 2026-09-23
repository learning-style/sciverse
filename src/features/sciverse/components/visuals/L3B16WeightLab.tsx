import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const VAGUE = 20;
const FLIGHT_KM = 1000;
const Y_MAX = 14;
const ROSE = '#be123c';
const BEST = '#047857';
const GRID = '#e2e8f0';

const sharpOf = (dial: number): number => Math.max(2, Math.min(15, Math.round(dial)));
const shareOf = (dial: number): number => Math.max(50, Math.min(100, Math.round(dial)));

// Errors add through their squares, so a blend of two cues carries
// sqrt((share1 x error1)^2 + (share2 x error2)^2).
const blend = (share: number, sharp: number): number => {
    const a = share * sharp;
    const b = (1 - share) * VAGUE;
    return Math.sqrt(a * a + b * b);
};
const bestShareFor = (sharp: number): number => (VAGUE * VAGUE) / (sharp * sharp + VAGUE * VAGUE);

export const L3B16WeightLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const sharp = sharpOf(raw);
        const pct = shareOf(raw2);
        const share = pct / 100;
        const err = blend(share, sharp);
        const best = bestShareFor(sharp);
        const bestErr = blend(best, sharp);
        const ratio = best / (1 - best);
        const missNow = FLIGHT_KM * Math.tan((err * Math.PI) / 180);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const plotH = Math.max(46, Math.min(150, usable * 0.6, usable - 40));
        const blockH = plotH + 34;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const plotW = Math.min(safeRight - 110, plotH * 2.4);
        const plotX = (safeRight - plotW) / 2;

        const xAt = (s: number) => plotX + ((s - 0.5) / 0.5) * plotW;
        const yAt = (e: number) => top + plotH - Math.max(0, Math.min(1, e / Y_MAX)) * plotH;

        ctx.strokeStyle = GRID;
        ctx.lineWidth = 1;
        ctx.strokeRect(plotX, top, plotW, plotH);

        // the curve of combined error against the share of the vote
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
            const s = 0.5 + (i / 60) * 0.5;
            const px = xAt(s);
            const py = yAt(blend(s, sharp));
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // the lowest point, and where the dial currently sits
        ctx.fillStyle = BEST;
        ctx.beginPath();
        ctx.arc(xAt(best), yAt(bestErr), 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(xAt(share), yAt(err), 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xAt(share), yAt(err));
        ctx.lineTo(xAt(share), top + plotH);
        ctx.stroke();

        const small = '10px monospace';
        outlineText(ctx, 'combined error', plotX + 6, top + 12, small, '#475569', 'left', plotW - 12);
        outlineText(ctx, 'lowest point', xAt(best), Math.max(top + 24, yAt(bestErr) - 8),
            'bold 10px monospace', BEST, 'center', plotW * 0.6);
        outlineText(ctx, 'share of the vote', safeRight / 2,
            Math.min(top + plotH + 16, artBottom), small, '#475569', 'center', plotW);
        outlineText(ctx, `vague cue fixed at ±${VAGUE}°`, safeRight / 2,
            Math.min(top + plotH + 30, artBottom), small, '#475569', 'center', safeRight - 40);

        outlineText(ctx, `share ${pct}% of the vote gives ±${err.toFixed(2)}°`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `best share ${(best * 100).toFixed(0)}%, giving ±${bestErr.toFixed(2)}° -- a split of ${ratio.toFixed(1)} to 1`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', BEST, 'center', safeRight - 30);

        fitText(ctx, `combined error ±${err.toFixed(2)}°`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The lowest point is never at 100%', safeRight / 2, 118, safeRight - 24, 13);

        const ending = pct >= Math.round(best * 100) - 1 && pct <= Math.round(best * 100) + 1
            ? `That is the lowest point: ±${bestErr.toFixed(2)}°, a miss of ${missNow.toFixed(0)} km over 1,000 km.`
            : `The lowest point sits at ${(best * 100).toFixed(0)}%, giving ±${bestErr.toFixed(2)}°.`;

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, err / Y_MAX)),
                caption: 'Combined Error',
                low: '0°',
                high: `${Y_MAX}°`,
                stops: ['#ecfdf5', '#fda4af', ROSE] as [string, string, string],
            },
            note: `A sharp cue of ±${sharp}° in a blend with the vague cue at ±${VAGUE}°. Give the sharp cue ${pct}% of the vote and the combined error is ±${err.toFixed(2)}°. ${ending} The best share works out as ${VAGUE}² / (${sharp}² + ${VAGUE}²), which is 1 / error² written as a fraction.`,
        };
    };

    return (
        <LabCanvas
            title="Trusting the Sharper Cue"
            readout={({ raw }) => `A sharp cue good to ±${sharpOf(raw)}°`}
            controlLabel="Sharp Cue Error"
            controlKey="sharpCueError"
            controlMin={2}
            controlMax={15}
            controlInitial={5}
            controlDisplay={raw => `±${sharpOf(raw)}°`}
            control2={{
                label: 'Sharp Cue Share',
                key: 'sharpCueShare',
                min: 50,
                max: 100,
                initial: 50,
                display: raw => `${shareOf(raw)}%`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Trusting the Sharper Cue"
            completeNote="The search found 1 / error²!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
