import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Molecules colliding: only bumps above the energy bar react, and temperature sets how many clear it. */
export const C41CollisionLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const tempC = Math.round(-20 + v * 220);
        // Share of collisions energetic enough to react, rising steeply with heat.
        const successRate = Math.max(0.005, Math.min(0.95, Math.pow(v, 2.2)));

        const boxX = 46;
        const boxY = stageTop + 20;
        const boxW = safeRight - 92;
        const boxH = Math.max(120, stageBottom - boxY - 60);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Molecules; speed rises with temperature so warmth is visible.
        const n = 16;
        const speed = 18 + v * 90;
        let shownSuccess = 0;
        for (let i = 0; i < n; i++) {
            const seed = i * 57.3;
            const x = boxX + 18 + ((seed * 9.7 + t * speed) % (boxW - 36));
            const y = boxY + 18 + ((seed * 5.3 + t * speed * 0.6) % (boxH - 36));
            // A fixed share of molecules is marked as reacting.
            const lucky = (i + 0.5) / n <= successRate;
            if (lucky) shownSuccess++;
            ctx.fillStyle = lucky ? '#dc2626' : '#64748b';
            ctx.beginPath();
            ctx.arc(x, y, lucky ? 11 : 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        fitText(ctx, `${shownSuccess} of ${n} collisions have enough energy to react`, safeRight / 2, 96, safeRight - 24, 15);
        outlineText(ctx, 'grey = bounced off unchanged     red = reacted',
            safeRight / 2, stageBottom - 24, 'bold 13px monospace');

        const msg = tempC < 20
            ? 'Cold: almost every bump is wasted, so the reaction crawls.'
            : tempC < 110
                ? 'Warmer: more bumps clear the energy bar and the reaction speeds up.'
                : 'Hot: a large share of collisions now react, so it runs fast.';
        return { meter: { fraction: successRate, caption: 'Share of Collisions That React', low: 'Almost none', high: 'Most of them' }, note: msg };
    };

    return (
        <LabCanvas
            title="Lucky Collisions"
            readout={({ v }) => `Temperature: ${Math.round(-20 + v * 220)}\u00B0C`}
            controlLabel="Temperature"
            controlKey="temperature"
            controlInitial={25}
            controlDisplay={(_raw, v) => `${Math.round(-20 + v * 220)}\u00B0C`}
            accent="emerald"
            sky={['#fef2f2', '#f8fafc']}
            completeTitle="C41 Complete!"
            completeSubtitle="How Do Patterns and Probability Guide Decisions?"
            completeNote="Temperature changes the odds, not the rules!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
