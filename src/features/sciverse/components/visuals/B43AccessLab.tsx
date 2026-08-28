import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Ramp slope versus how many people can use it: steeper is cheaper but excludes more. */
export const B43AccessLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, v, stageTop, stageBottom }: LabScene) => {
        // v = 0 is the gentlest ramp (1 in 20), v = 1 the steepest (1 in 4).
        const ratio = Math.round(4 + (1 - v) * 16);
        // Guidelines ask for about 1 in 12; gentler serves more people.
        const served = Math.max(0.05, Math.min(1, (ratio - 3) / 11));

        const groundY = stageBottom - 54;
        const runW = safeRight * 0.52;
        const riseH = Math.min(runW / ratio * 4, (stageBottom - stageTop) * 0.42);
        const x0 = safeRight * 0.22;

        // Ramp
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.moveTo(x0, groundY);
        ctx.lineTo(x0 + runW, groundY);
        ctx.lineTo(x0 + runW, groundY - riseH);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.stroke();
        outlineText(ctx, `ramp slope 1 in ${ratio}`, x0 + runW / 2, groundY + 28, 'bold 15px monospace');

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, groundY, safeRight, stageBottom - groundY);

        // Wheelchair user partway up, positioned along the slope.
        const p = 0.55;
        const px = x0 + runW * p;
        const py = groundY - riseH * p;
        ctx.font = '30px serif';
        ctx.textAlign = 'center';
        ctx.fillText('♿', px, py - 8);

        // People served bar, named in the lesson.
        const bx = 60, bw = safeRight - 120, by = stageTop + 24;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, by, bw, 20);
        ctx.fillStyle = served > 0.7 ? '#16a34a' : served > 0.4 ? '#f59e0b' : '#dc2626';
        ctx.fillRect(bx, by, bw * served, 20);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, 20);
        outlineText(ctx, 'people served bar', safeRight / 2, by + 42, 'bold 14px monospace');

        outlineText(ctx, ratio >= 12
            ? 'Gentle enough to meet the usual guideline of 1 in 12'
            : 'Steeper than the usual guideline of 1 in 12',
            safeRight / 2, 96, 'bold 15px monospace');
        outlineText(ctx, `About ${Math.round(served * 100)} out of every 100 people could use this alone`,
            safeRight / 2, 118, 'bold 13px monospace');

        const msg = ratio < 8
            ? 'Very steep. Cheap and short, but many people cannot get up it alone.'
            : ratio < 12
                ? 'Still steeper than the guideline -- some people are left out.'
                : 'Gentle enough for almost everyone, though it needs more space.';
        return { meter: { fraction: served, caption: 'How Many People This Ramp Can Serve', low: 'Very few', high: 'Almost everyone' }, note: msg };
    };

    return (
        <LabCanvas
            title="Designed for Everyone"
            readout={({ v }) => `Ramp slope: 1 metre up for every ${Math.round(4 + (1 - v) * 16)} along`}
            controlLabel="Ramp Slope"
            controlKey="rampSlope"
            controlInitial={35}
            controlDisplay={(_raw, v) => `1 in ${Math.round(4 + (1 - v) * 16)}`}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="B43 Complete!"
            completeSubtitle="How Do We Design for Safety and Accessibility?"
            completeNote="Design for the range, not the average!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
