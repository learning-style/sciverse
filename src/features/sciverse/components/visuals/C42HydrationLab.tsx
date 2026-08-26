import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Body balance versus drink saltiness: too little dilutes, too much overloads, the middle band is healthy. */
export const C42HydrationLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const gPerL = v * 4;
        // Sweat removes about 1 g/L, so replacing near that keeps the balance.
        const ideal = 1.0;
        const balance = Math.max(0, 1 - Math.abs(gPerL - ideal) / 2.2);

        // Glass of drink, tinted by how salty it is.
        const glassW = 92;
        const glassH = Math.max(96, (stageBottom - stageTop) * 0.38);
        const glassX = safeRight * 0.24 - glassW / 2;
        const glassY = stageTop + 54;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(glassX, glassY, glassW, glassH);
        ctx.fillStyle = `rgba(56,189,248,${0.35 + v * 0.5})`;
        ctx.fillRect(glassX, glassY + 14, glassW, glassH - 14);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(glassX, glassY, glassW, glassH);
        outlineText(ctx, 'your drink', glassX + glassW / 2, glassY - 12, 'bold 14px monospace');

        // Salt grains, more of them as saltiness rises.
        for (let i = 0; i < Math.round(v * 22); i++) {
            const seed = i * 47.9;
            const x = glassX + 12 + ((seed * 7.3) % (glassW - 24));
            const y = glassY + 28 + ((seed * 5.1 + t * 12) % (glassH - 44));
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#0369a1';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        // Body balance bar with a green healthy band in the middle.
        const bx = safeRight * 0.52, bw = safeRight * 0.4;
        const by = glassY + glassH / 2 - 16;
        ctx.fillStyle = '#fecaca';
        ctx.fillRect(bx, by, bw, 32);
        ctx.fillStyle = '#bbf7d0';
        ctx.fillRect(bx + bw * 0.34, by, bw * 0.32, 32);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, 32);
        outlineText(ctx, 'body balance bar', bx + bw / 2, by - 12, 'bold 14px monospace');
        outlineText(ctx, 'watered down', bx + 4, by + 52, 'bold 13px monospace', '#b91c1c', 'left');
        outlineText(ctx, 'too salty', bx + bw - 4, by + 52, 'bold 13px monospace', '#b91c1c', 'right');

        // Marker showing where this drink puts the body.
        const mx = bx + Math.min(1, gPerL / 4) * bw;
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(mx, by - 4);
        ctx.lineTo(mx - 9, by - 20);
        ctx.lineTo(mx + 9, by - 20);
        ctx.closePath();
        ctx.fill();

        outlineText(ctx, `${gPerL.toFixed(1)} grams of salt in every litre`, safeRight / 2, 96, 'bold 15px monospace');
        outlineText(ctx, 'green band = the healthy zone', safeRight / 2, 118, 'bold 13px monospace');

        const msg = gPerL < 0.4
            ? 'Almost plain water -- your salts get watered down even further.'
            : gPerL <= 1.8
                ? 'Good balance. This replaces both the water and the salts you sweated out.'
                : 'Too salty -- this will make you thirsty and can upset your stomach.';
        return { meter: { fraction: balance, caption: 'How Balanced Your Body Is', low: 'Out of balance', high: 'Just right' }, note: msg };
    };

    return (
        <LabCanvas
            title="Sweat and Salt"
            readout={({ v }) => `Drink saltiness: ${(v * 4).toFixed(1)} grams per litre`}
            controlLabel="Drink Saltiness"
            controlKey="drinkSaltiness"
            controlInitial={15}
            controlDisplay={(_raw, v) => `${(v * 4).toFixed(1)} g per litre`}
            accent="emerald"
            sky={['#ecfeff', '#f8fafc']}
            completeTitle="C42 Complete!"
            completeSubtitle="How Does Sports Science Improve Performance?"
            completeNote="Balance matters more than how much you drink!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
