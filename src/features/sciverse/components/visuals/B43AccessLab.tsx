import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Ramp slope versus how many people can use it: steeper is cheaper but excludes more. */
export const B43AccessLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        // v = 0 is the gentlest ramp (1 in 20), v = 1 the steepest (1 in 4).
        const ratio = Math.round(4 + (1 - v) * 16);
        // Guidelines ask for about 1 in 12; gentler serves more people.
        const served = Math.max(0.05, Math.min(1, (ratio - 3) / 11));
        // Steeper slope means more force per push, so the heart works harder.
        const pushForce = Math.max(0.08, Math.min(1, 12 / ratio));
        const heartRate = Math.round(70 + pushForce * 90);

        const groundY = stageBottom - 92;
        const runW = safeRight * 0.44;
        const riseH = Math.min(runW / ratio * 4, (stageBottom - stageTop) * 0.30);
        const x0 = safeRight * 0.06;

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
        outlineText(ctx, `ramp slope 1 in ${ratio}`, x0 + runW / 2, groundY + 26, 'bold 15px monospace');

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, groundY, safeRight, stageBottom - groundY);

        // Wheelchair user partway up
        const p = 0.55;
        ctx.font = '30px serif';
        ctx.textAlign = 'center';
        ctx.fillText('♿', x0 + runW * p, groundY - riseH * p - 8);

        // ── the body panel: what this slope costs ──
        const px = safeRight * 0.58;
        const pw = safeRight * 0.36;
        const py = stageTop + 30;

        // Muscle effort (push force)
        outlineText(ctx, 'push force from muscles', px, py, 'bold 14px monospace', '#0f172a', 'left');
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(px, py + 10, pw, 18);
        ctx.fillStyle = pushForce > 0.7 ? '#dc2626' : pushForce > 0.45 ? '#f59e0b' : '#16a34a';
        ctx.fillRect(px, py + 10, pw * pushForce, 18);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py + 10, pw, 18);

        // Heart, beating faster on steeper slopes
        const beat = 1 + Math.abs(Math.sin(t * (heartRate / 60) * Math.PI)) * 0.22;
        ctx.font = `${Math.round(30 * beat)}px serif`;
        ctx.fillText('❤️', px + 22, py + 82);
        outlineText(ctx, `heart rate ${heartRate} beats per minute`, px + 46, py + 78, 'bold 14px monospace', '#0f172a', 'left');

        // Breathing rate follows the same demand
        const breaths = Math.round(14 + pushForce * 22);
        outlineText(ctx, `breathing ${breaths} breaths per minute`, px, py + 112, 'bold 14px monospace', '#0f172a', 'left');

        // Fatigue warning once the effort is high
        if (pushForce > 0.7) {
            outlineText(ctx, 'muscles will fatigue quickly', px, py + 142, 'bold 14px monospace', '#b91c1c', 'left');
        }

        // People served bar, named in the lesson
        const bx = 60, bw = safeRight - 120, by = stageBottom - 46;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, by, bw, 18);
        ctx.fillStyle = served > 0.7 ? '#16a34a' : served > 0.4 ? '#f59e0b' : '#dc2626';
        ctx.fillRect(bx, by, bw * served, 18);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, 18);
        outlineText(ctx, 'people served bar', safeRight / 2, by - 8, 'bold 14px monospace');

        fitText(ctx, ratio >= 12
            ? 'Gentle enough to meet the usual guideline of 1 in 12'
            : 'Steeper than the usual guideline of 1 in 12', safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, `About ${Math.round(served * 100)} out of every 100 people could use this alone`, safeRight / 2, 118, safeRight - 24, 13);

        const msg = ratio < 8
            ? 'Very steep. Each push needs a lot of force, and the heart and lungs work hard.'
            : ratio < 12
                ? 'Still steeper than the guideline -- tiring, and some people are left out.'
                : 'Gentle enough for almost everyone, and the effort stays comfortable.';
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
