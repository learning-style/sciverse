import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A scent mark fading over days, and what a visiting fox decides when it sniffs. */
export const C47ScentLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, stageBottom }: LabScene) => {
        const days = raw;
        const strength = Math.max(0, 1 - days / 12);
        const turnsAway = strength > 0.35;

        const groundY = stageBottom - 60;
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, safeRight, stageBottom - groundY);

        // The marked post
        const postX = safeRight * 0.42;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(postX - 8, groundY - 90, 16, 90);
        outlineText(ctx, 'marked post', postX, groundY + 26, 'bold 14px monospace');

        // Smell drifting off the post, fainter as days pass.
        for (let i = 0; i < 9; i++) {
            const seed = i * 41.3;
            const rise = ((t * 22 + seed * 7) % 74);
            ctx.fillStyle = `rgba(16,185,129,${Math.max(0, strength * (0.75 - rise / 100))})`;
            ctx.beginPath();
            ctx.arc(postX + Math.sin(rise * 0.12 + i) * 20, groundY - 80 - rise, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, strength > 0.6 ? 'strong smell' : strength > 0.25 ? 'faint smell' : 'almost no smell',
            postX, groundY - 182, 'bold 15px monospace', '#047857');

        // The visiting fox, turning away or walking in.
        const foxX = turnsAway ? safeRight * 0.2 : safeRight * 0.66;
        ctx.font = '34px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🦊', foxX, groundY - 8);
        outlineText(ctx, turnsAway ? 'visitor turns away' : 'visitor moves in',
            foxX, groundY - 60, 'bold 15px monospace', turnsAway ? '#b91c1c' : '#15803d');

        fitText(ctx, days === 0 ? 'Marked today -- the message is at its strongest'
            : days < 5 ? 'A few days old, and already fading'
                : 'Old and faint -- this patch reads as empty',
            safeRight / 2, 94, safeRight - 24, 15);
        fitText(ctx, 'Strong smell means the owner was here recently',
            safeRight / 2, 118, safeRight - 24, 13);

        const msg = days === 0
            ? 'A fresh mark. Any visitor knows the owner is nearby.'
            : days < 5
                ? 'Still strong enough to turn a visitor away.'
                : 'Too faint to work. A new fox will claim this patch.';
        return { meter: { fraction: strength, caption: 'How Strong the Smell Is', low: 'Faded away', high: 'Fresh mark' }, note: msg };
    };

    return (
        <LabCanvas
            title="Smell Messages"
            readout={({ raw }) => `The mark is ${raw} day${raw === 1 ? '' : 's'} old`}
            controlLabel="Days Since Marking"
            controlKey="scentAge"
            controlMin={0}
            controlMax={14}
            controlInitial={1}
            controlDisplay={raw => `${raw} day${raw === 1 ? '' : 's'} old`}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="C47 Complete!"
            completeSubtitle="How Do Species Share Habitats?"
            completeNote="The fading is what makes the message useful!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
