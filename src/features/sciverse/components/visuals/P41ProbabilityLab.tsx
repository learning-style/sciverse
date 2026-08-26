import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Dice tallies: more rolls pull every bar toward its fair one-in-six share. */
export const P41ProbabilityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const rolls = raw;
        // Deterministic pseudo-random tallies so the picture is stable while sliding.
        const counts = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < rolls; i++) {
            const s = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
            counts[Math.floor((s - Math.floor(s)) * 6)] += 1;
        }
        const expected = rolls / 6;
        const maxCount = Math.max(...counts, 1);

        const baseY = stageBottom - 44;
        const chartTop = stageTop + 56;
        const chartH = baseY - chartTop;
        const slotW = (safeRight - 90) / 6;

        const expY = baseY - (expected / maxCount) * chartH;
        const barX = (f: number) => 45 + f * slotW + slotW * 0.15;
        const barW = slotW * 0.7;

        // 1. Bars first, so the reference line can sit on top of them.
        for (let f = 0; f < 6; f++) {
            const h = (counts[f] / maxCount) * chartH;
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(barX(f), baseY - h, barW, h);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.strokeRect(barX(f), baseY - h, barW, h);
        }

        // 2. Fair-share line over the bars, semi-transparent so both stay readable.
        ctx.strokeStyle = 'rgba(220,38,38,0.75)';
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 5]);
        ctx.beginPath();
        ctx.moveTo(45, expY);
        ctx.lineTo(safeRight - 45, expY);
        ctx.stroke();
        ctx.setLineDash([]);

        // 3. Numbers last, so nothing is drawn over them.
        for (let f = 0; f < 6; f++) {
            const h = (counts[f] / maxCount) * chartH;
            outlineText(ctx, String(f + 1), barX(f) + barW / 2, baseY + 24, 'bold 16px monospace');
            outlineText(ctx, String(counts[f]), barX(f) + barW / 2, baseY - h - 8, 'bold 14px monospace');
        }

        // 4. Legend sits in the headroom above the tallest bar, clear of the chart.
        const legY = stageTop + 24;
        ctx.strokeStyle = 'rgba(220,38,38,0.85)';
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 5]);
        ctx.beginPath();
        ctx.moveTo(45, legY);
        ctx.lineTo(85, legY);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, `equal share: about ${Math.round(expected)} each`, 93, legY + 5, 'bold 14px monospace', '#b91c1c', 'left');

        // Distance of the worst face from its equal share.
        const worst = Math.max(...counts.map(c => Math.abs(c - expected)));
        const evenness = expected > 0 ? Math.max(0, 1 - worst / expected) : 0;

        outlineText(ctx, rolls < 20
            ? 'Very few rolls -- the bars are all over the place.'
            : rolls < 120
                ? 'The bars are starting to even out.'
                : 'Lots of rolls -- every face is close to an equal share.',
            safeRight / 2, 94, 'bold 15px monospace');
        outlineText(ctx, `${rolls} roll${rolls === 1 ? '' : 's'} shared between 6 numbers = about ${Math.round(expected)} each`,
            safeRight / 2, 116, 'bold 13px monospace');

        const msg = rolls < 20
            ? 'With so few rolls, luck decides everything you see.'
            : rolls < 120
                ? 'A pattern is appearing, but it is still wobbly.'
                : 'The pattern has settled -- this is the law of large numbers.';
        return { meter: { fraction: evenness, caption: 'How Even the Six Faces Are', low: 'Very uneven', high: 'Almost equal' }, note: msg };
    };

    return (
        <LabCanvas
            title="Rolling the Dice"
            readout={({ raw }) => `Rolling the dice ${raw} time${raw === 1 ? '' : 's'}`}
            controlLabel="Number of Rolls"
            controlKey="rollCount"
            controlMin={1}
            controlMax={600}
            controlInitial={6}
            controlDisplay={raw => `${raw} rolls`}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="P41 Complete!"
            completeSubtitle="How Do Patterns and Probability Guide Decisions?"
            completeNote="Small samples wobble; large samples settle!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
