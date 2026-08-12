import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Chlorine dose has a safe window: too little leaves germs, too much tastes awful. */
export const C36ChlorineLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const tankX = 40;
        const tankY = 110;
        const tankW = safeRight - 80;
        const tankH = H - tankY - 150;

        // Germ kill rises quickly with dose; taste gets worse past the safe window.
        const killed = 1 - Math.exp(-5.5 * v);
        const tasteBad = Math.max(0, (v - 0.62) / 0.38);
        const safe = killed > 0.97 && tasteBad < 0.35;

        // Water tank, tinted greener as chlorine rises.
        ctx.fillStyle = `rgb(${Math.round(186 - v * 60)},${Math.round(230 - v * 20)},${Math.round(253 - v * 60)})`;
        ctx.fillRect(tankX, tankY, tankW, tankH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.strokeRect(tankX, tankY, tankW, tankH);

        // Germs: survivors wriggle, killed ones show as faded crosses.
        const total = 14;
        for (let i = 0; i < total; i++) {
            const seed = i * 83.7;
            const x = tankX + 24 + ((seed * 6.1) % (tankW - 48));
            const y = tankY + 24 + ((seed * 9.7) % (tankH - 48)) + Math.sin(t * 1.6 + i) * 5;
            const isDead = (i + 1) / total <= killed;
            if (isDead) {
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x - 5, y - 5); ctx.lineTo(x + 5, y + 5);
                ctx.moveTo(x + 5, y - 5); ctx.lineTo(x - 5, y + 5);
                ctx.stroke();
            } else {
                ctx.fillStyle = '#dc2626';
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        // Chlorine molecules drifting through the tank.
        for (let i = 0; i < Math.round(v * 18); i++) {
            const seed = i * 37.9;
            const x = tankX + 16 + ((seed * 11.3 + t * 18) % (tankW - 32));
            const y = tankY + 16 + ((seed * 5.9) % (tankH - 32));
            ctx.fillStyle = 'rgba(132,204,22,0.85)';
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, `Germs destroyed: ${Math.round(killed * 100)}%`, safeRight / 2, 84, 'bold 13px monospace');

        // Verdict banner.
        const verdict = killed < 0.97 ? 'UNSAFE -- germs still alive' : tasteBad > 0.35 ? 'Safe, but tastes like a pool' : 'SAFE TO DRINK';
        outlineText(ctx, verdict, safeRight / 2, tankY + tankH + 26, 'bold 14px monospace',
            safe ? '#15803d' : killed < 0.97 ? '#b91c1c' : '#a16207');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7,
            safe ? 1 : killed < 0.97 ? killed * 0.6 : 0.62,
            'Water Safety Score', 'Dangerous', 'Perfect'
        );

        const msg = v < 0.2
            ? 'Too little chlorine -- many germs survive the treatment.'
            : v < 0.45
                ? 'Getting there, but some germs are still alive.'
                : v <= 0.7
                    ? 'Great dose! Germs destroyed and the water still tastes fine.'
                    : 'Too much. It is safe, but it smells and tastes like a swimming pool.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Chlorine Patrol"
            readout={({ raw }) => `Chlorine amount: ${raw}%`}
            controlLabel="Chlorine Amount"
            controlKey="chlorineAmount"
            controlInitial={25}
            accent="emerald"
            sky={['#ecfeff', '#f8fafc']}
            completeTitle="C36 Complete!"
            completeSubtitle="How Do We Make Water Safe to Drink?"
            completeNote="Chlorine destroys the germs filters cannot catch!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
