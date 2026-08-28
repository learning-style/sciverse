import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Impact force falls as crumple distance grows: the same landing spread over a longer stop. */
export const P43ImpactLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const cm = 0.2 + v * 49.8;
        // Same landing energy spread over a longer stop means a smaller force.
        const force = Math.max(0.04, Math.min(1, 0.6 / cm));

        const groundY = stageBottom - 46;
        const padH = Math.max(8, Math.min(70, cm * 1.6));

        // The crumple pad, squashing as the falling block lands on it.
        const padX = safeRight / 2 - 90;
        const squash = 0.55 + Math.abs(Math.sin(t * 1.1)) * 0.45;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(padX, groundY - padH * squash, 180, padH * squash);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(padX, groundY - padH * squash, 180, padH * squash);
        outlineText(ctx, 'crumple distance', safeRight / 2, groundY + 26, 'bold 14px monospace');

        // Ground
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, groundY, safeRight, stageBottom - groundY);

        // Falling block, resting on top of the squashed pad.
        const blockY = groundY - padH * squash - 46;
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(safeRight / 2 - 34, blockY, 68, 46);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(safeRight / 2 - 34, blockY, 68, 46);

        // Force bar - the thing the learner is trying to make small.
        const fbX = 60, fbW = safeRight - 120, fbY = stageTop + 24;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(fbX, fbY, fbW, 22);
        ctx.fillStyle = force > 0.6 ? '#dc2626' : force > 0.3 ? '#f59e0b' : '#16a34a';
        ctx.fillRect(fbX, fbY, fbW * force, 22);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(fbX, fbY, fbW, 22);
        outlineText(ctx, 'force bar: how hard the landing hits', safeRight / 2, fbY + 44, 'bold 14px monospace');

        fitText(ctx, `Crumple distance ${cm.toFixed(1)} cm`, safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, 'Same landing speed every time -- only the stopping distance changes', safeRight / 2, 118, safeRight - 24, 13);

        const msg = cm < 3
            ? 'Almost no crumple -- like landing on concrete. The force is huge.'
            : cm < 18
                ? 'Some crumple. The stop takes longer and the force drops.'
                : 'A deep crumple zone -- the stop is slow and the landing is gentle.';
        return { meter: { fraction: 1 - force, caption: 'How Gentle the Landing Is', low: 'Brutal', high: 'Gentle' }, note: msg };
    };

    return (
        <LabCanvas
            title="Softening the Blow"
            readout={({ v }) => `Crumple distance: ${(0.2 + v * 49.8).toFixed(1)} centimetres`}
            controlLabel="Crumple Distance"
            controlKey="crumpleDistance"
            controlInitial={6}
            controlDisplay={(_raw, v) => `${(0.2 + v * 49.8).toFixed(1)} cm`}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="P43 Complete!"
            completeSubtitle="How Do We Design for Safety and Accessibility?"
            completeNote="Add stopping distance, not stiffness!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
