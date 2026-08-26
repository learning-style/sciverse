import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Helmet foam: thicker foam crushes over a longer distance, cutting the force reaching the head. */
export const C43FoamLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const mm = Math.round(2 + v * 48);
        const headForce = Math.max(0.05, Math.min(1, 12 / mm));
        // Bulk and weight rise with thickness - the trade-off the lesson names.
        const wearability = Math.max(0.05, 1 - v * 0.85);

        const cx = safeRight / 2;
        const headR = Math.max(34, Math.min(58, (stageBottom - stageTop) * 0.14));
        const cy = stageTop + 40 + headR + mm * 1.1;

        // Foam layer, crushing rhythmically under impact.
        const crush = 0.6 + Math.abs(Math.sin(t * 1.2)) * 0.4;
        const foamPx = mm * 1.1 * crush;
        ctx.fillStyle = '#a7f3d0';
        ctx.beginPath();
        ctx.arc(cx, cy, headR + foamPx, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Hard shell over the foam.
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(cx, cy, headR + foamPx + 5, Math.PI, 0);
        ctx.stroke();
        outlineText(ctx, 'shell', cx + headR + foamPx + 34, cy - 6, 'bold 14px monospace', '#0f172a', 'left');
        outlineText(ctx, 'foam', cx - headR - foamPx - 34, cy - 6, 'bold 14px monospace', '#047857', 'right');

        // Head
        ctx.fillStyle = '#fcd34d';
        ctx.beginPath();
        ctx.arc(cx, cy, headR, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 3;
        ctx.stroke();
        outlineText(ctx, 'head', cx, cy - headR / 2, 'bold 15px monospace');

        // Crush bar and head-force readout, both named in the lesson.
        const bx = 60, bw = safeRight - 120, by = stageTop + 22;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, by, bw, 18);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(bx, by, bw * v, 18);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, 18);
        outlineText(ctx, 'crush bar: how much foam there is to use up', cx, by + 38, 'bold 13px monospace');

        outlineText(ctx, `Head force: ${Math.round(headForce * 100)} out of 100`, cx, 96, 'bold 15px monospace');
        outlineText(ctx, 'Thicker foam protects more, but the helmet gets bulkier', cx, 118, 'bold 13px monospace');

        const msg = mm < 10
            ? 'Barely any foam -- almost the whole force reaches the head.'
            : mm < 32
                ? 'A sensible thickness. Good protection and still wearable.'
                : 'Very thick foam protects best, but this helmet is heavy and bulky.';
        return { meter: { fraction: wearability, caption: 'How Wearable the Helmet Is', low: 'Huge and heavy', high: 'Light and comfy' }, note: msg };
    };

    return (
        <LabCanvas
            title="Materials That Protect"
            readout={({ v }) => `Foam thickness: ${Math.round(2 + v * 48)} millimetres`}
            controlLabel="Foam Thickness"
            controlKey="foamThickness"
            controlInitial={25}
            controlDisplay={(_raw, v) => `${Math.round(2 + v * 48)} mm`}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="C43 Complete!"
            completeSubtitle="How Do We Design for Safety and Accessibility?"
            completeNote="The foam is the part that saves you!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
