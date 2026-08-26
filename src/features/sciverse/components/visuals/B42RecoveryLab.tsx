import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Strength across a training cycle: too few rest days stack damage, too many let gains fade. */
export const B42RecoveryLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const rest = raw;
        // Repair needs about 2 days; beyond ~10 days the gains start fading.
        const repaired = Math.min(1, rest / 2);
        const faded = Math.max(0, (rest - 10) / 8);
        const gainPerCycle = repaired - faded - (rest < 2 ? (2 - rest) * 0.35 : 0);

        const baseY = stageBottom - 46;
        const topY = stageTop + 40;
        const plotH = baseY - topY;
        const plotW = safeRight - 110;

        // Strength line across 6 training cycles.
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 4;
        ctx.beginPath();
        let strength = 0.45;
        for (let c = 0; c <= 6; c++) {
            strength = Math.max(0.05, Math.min(1, strength + gainPerCycle * 0.09));
            const x = 60 + (c / 6) * plotW;
            const y = baseY - strength * plotH;
            if (c === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        outlineText(ctx, 'strength line', 60, topY - 12, 'bold 14px monospace', '#be123c', 'left');

        // Axis
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, baseY);
        ctx.lineTo(60 + plotW, baseY);
        ctx.stroke();
        outlineText(ctx, 'six training sessions', 60 + plotW / 2, baseY + 26, 'bold 13px monospace');

        // Repair bar
        const rbX = 60, rbW = plotW * 0.5, rbY = baseY + 44;
        if (rbY + 16 < stageBottom) {
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(rbX, rbY, rbW, 14);
            ctx.fillStyle = repaired >= 1 ? '#16a34a' : '#f59e0b';
            ctx.fillRect(rbX, rbY, rbW * repaired, 14);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(rbX, rbY, rbW, 14);
            outlineText(ctx, 'repair bar', rbX + rbW + 12, rbY + 12, 'bold 13px monospace', '#0f172a', 'left');
        }

        outlineText(ctx, repaired >= 1
            ? 'Muscle fully repaired before the next session'
            : 'Next session starts before the repair has finished',
            safeRight / 2, 96, 'bold 15px monospace');
        outlineText(ctx, `Strength after six sessions: ${Math.round(strength * 100)} out of 100`,
            safeRight / 2, 118, 'bold 13px monospace');

        const msg = rest < 2
            ? 'Too little rest -- damage stacks up and strength falls. This is overtraining.'
            : rest <= 10
                ? 'Good gap. Each session starts on a repaired, slightly stronger muscle.'
                : 'Too much rest -- the extra strength starts to fade between sessions.';
        return { meter: { fraction: Math.max(0, strength), caption: 'Strength Built Over the Month', low: 'Weaker', high: 'Much stronger' }, note: msg };
    };

    return (
        <LabCanvas
            title="Rest and Rebuild"
            readout={({ raw }) => `${raw} rest day${raw === 1 ? '' : 's'} between sessions`}
            controlLabel="Rest Days"
            controlKey="restDays"
            controlMin={0}
            controlMax={14}
            controlInitial={1}
            controlDisplay={raw => `${raw} day${raw === 1 ? '' : 's'}`}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="B42 Complete!"
            completeSubtitle="How Does Sports Science Improve Performance?"
            completeNote="Muscles are built on the days off!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
