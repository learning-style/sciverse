import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const GLUCOSE_KJ = 2870;

export const L3B3AtpLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const count = Math.max(1, Math.round(raw));
        const perAtp = Math.max(250, Math.round(raw2)) / 10;
        const caught = Math.min(GLUCOSE_KJ, count * perAtp);
        const heat = GLUCOSE_KJ - caught;
        const pct = (caught / GLUCOSE_KJ) * 100;

        // One mole of glucose, split into what is caught and what is heat.
        // The bands are shares of the real stage height, and the coins' vertical
        // pitch shrinks as they wrap, so more rows never push past the footer.
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;

        const barX = 60;
        const barW = safeRight - barX - 40;
        const above = Math.max(12, Math.min(16, usable * 0.06));
        const barH = Math.max(16, Math.min(44, usable * 0.17));
        const captionGap = Math.max(10, Math.min(20, usable * 0.07));
        const coinsGap = Math.max(8, Math.min(26, usable * 0.09));
        const labelTail = Math.max(16, Math.min(30, usable * 0.1));
        const perRow = Math.max(8, Math.floor((safeRight - 120) / 24));
        const rows = Math.ceil(count / perRow);
        const fixed = above + barH + captionGap + coinsGap + labelTail;
        // On a short canvas the coins are the first thing to go: the bar and the
        // label still say how many ATP there are and what each is worth.
        const showCoins = usable - fixed >= (rows - 1) * 12;
        const pitch = rows > 1
            ? Math.max(12, Math.min(24, (usable - fixed) / (rows - 1)))
            : 24;
        const coinBand = showCoins ? (rows - 1) * pitch : 0;
        const blockH = fixed + coinBand;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barY = top + above;
        const caughtW = barW * (caught / GLUCOSE_KJ);
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(barX, barY, caughtW, barH);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(barX + caughtW, barY, barW - caughtW, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barW, barH);

        outlineText(ctx, `${Math.round(caught)} kJ caught as ATP`, barX, barY - 10,
            'bold 12px monospace', '#9f1239', 'left', barW / 2 - 8);
        outlineText(ctx, `${Math.round(heat)} kJ released as heat`, barX + barW, barY - 10,
            'bold 12px monospace', '#92400e', 'right', barW / 2 - 8);
        const pctSize = Math.max(9, Math.min(14, Math.round(barH * 0.32)));
        const pctFont = `bold ${pctSize}px monospace`;
        if (caughtW > 56) {
            outlineText(ctx, `${pct.toFixed(0)}%`, barX + caughtW / 2, barY + barH / 2 + pctSize * 0.36,
                pctFont, '#ffffff', 'center', caughtW - 8);
        }
        if (barW - caughtW > 56) {
            outlineText(ctx, `${(100 - pct).toFixed(0)}%`, barX + caughtW + (barW - caughtW) / 2, barY + barH / 2 + pctSize * 0.36,
                pctFont, '#0f172a', 'center', barW - caughtW - 8);
        }
        outlineText(ctx, 'one mole of glucose: 2,870 kJ', safeRight / 2, barY + barH + captionGap,
            'bold 12px monospace', '#334155', 'center', barW);

        // The coins themselves
        const firstRow = Math.min(count, perRow);
        const coinsTop = barY + barH + captionGap + coinsGap;
        const coinR = Math.max(4, Math.min(9, pitch * 0.375));
        if (showCoins) {
            for (let i = 0; i < count; i++) {
                const col = i % perRow;
                const row = Math.floor(i / perRow);
                const coinX = safeRight / 2 - (firstRow * 24) / 2 + 12 + col * 24;
                const coinY = coinsTop + row * pitch;
                ctx.fillStyle = '#fb7185';
                ctx.beginPath();
                ctx.arc(coinX, coinY, coinR, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#9f1239';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
        outlineText(ctx, `${count} ATP, each worth ${perAtp.toFixed(1)} kJ/mol`, safeRight / 2,
            Math.min(coinsTop + coinBand + labelTail, artBottom),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, `${count} x ${perAtp.toFixed(1)} = ${Math.round(caught)} kJ, which is ${pct.toFixed(0)}% of 2,870 kJ`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, pct >= 45 ? 'about what a real cell catches' : 'standard conditions -- a real cell catches more',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${pct.toFixed(0)}% of glucose's energy caught as ATP`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Whatever is not caught is not lost -- it warms you', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, pct / 100)),
                caption: 'Share Caught as ATP',
                low: 'Almost all heat',
                high: 'Most of it caught',
            },
            note: `${Math.round(caught)} kJ of glucose's 2,870 kJ is caught in ${count} ATP. The other ${Math.round(heat)} kJ is released as heat along the way.`,
        };
    };

    return (
        <LabCanvas
            title="Why Life Pays in Small Change"
            readout={({ raw }) => `${Math.max(1, Math.round(raw))} ATP made from one mole of glucose`}
            controlLabel="ATP per Glucose"
            controlKey="atpPerGlucose"
            controlMin={10}
            controlMax={38}
            controlInitial={30}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} ATP`}
            control2={{
                label: 'Energy per ATP',
                key: 'energyPerAtp',
                min: 250,
                max: 550,
                initial: 305,
                display: raw => `${(Math.max(250, Math.round(raw)) / 10).toFixed(1)} kJ/mol`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Life Pays in Small Change"
            completeNote="Catch the energy in ATP-sized pieces!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
