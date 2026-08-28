import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const THRESHOLD = 0.5;

/** Three materials side by side: copper always conducts, rubber never, silicon on demand. */
export const C39SemiconductorLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const siliconOn = v >= THRESHOLD;
        const rows = [
            { name: 'COPPER', kind: 'conductor', fill: '#b45309', flows: true },
            { name: 'RUBBER', kind: 'insulator', fill: '#334155', flows: false },
            { name: 'SILICON', kind: 'semiconductor', fill: siliconOn ? '#0ea5e9' : '#94a3b8', flows: siliconOn },
        ];

        const stageH = stageBottom - stageTop;
        const rowH = stageH / rows.length;
        const barX = safeRight * 0.28;
        const barW = safeRight * 0.42;
        const barH = Math.max(26, Math.min(52, rowH * 0.34));

        rows.forEach((row, i) => {
            const cy = stageTop + rowH * (i + 0.5);

            // Material name and family.
            outlineText(ctx, row.name, barX - 16, cy + 2, 'bold 16px monospace', '#0f172a', 'right');
            outlineText(ctx, row.kind, barX - 16, cy + 20, 'bold 15px monospace', '#475569', 'right');

            // The material itself.
            ctx.fillStyle = row.fill;
            ctx.fillRect(barX, cy - barH / 2, barW, barH);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 3;
            ctx.strokeRect(barX, cy - barH / 2, barW, barH);

            // Electrons moving through, or a blocked sign.
            if (row.flows) {
                for (let e = 0; e < 7; e++) {
                    const p = ((t * 0.5 + e / 7) % 1);
                    ctx.fillStyle = '#fef08a';
                    ctx.beginPath();
                    ctx.arc(barX + p * barW, cy, Math.max(5, barH * 0.16), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#a16207';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            } else {
                outlineText(ctx, 'BLOCKED', barX + barW / 2, cy + 5, 'bold 15px monospace', '#ffffff');
            }

            // Bulb showing the result.
            const bulbX = barX + barW + 46;
            const bulbR = Math.max(16, Math.min(26, barH * 0.55));
            ctx.fillStyle = row.flows ? '#fbbf24' : '#e2e8f0';
            ctx.beginPath();
            ctx.arc(bulbX, cy, bulbR, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 3;
            ctx.stroke();
            outlineText(ctx, row.flows ? 'ON' : 'OFF', bulbX, cy + bulbR + 20, 'bold 15px monospace',
                row.flows ? '#a16207' : '#64748b');
        });

        fitText(ctx, siliconOn ? 'Signal is strong enough -- silicon lets electricity through!'
                : 'Signal too weak -- silicon is blocking, like rubber.', safeRight / 2, 96, safeRight - 24, 15);

        const msg = !siliconOn
            ? 'Copper is stuck ON and rubber is stuck OFF. Only silicon can change.'
            : 'Silicon switched ON. Turn the signal down and it blocks again -- that is a switch!';
        return {
            meter: { fraction: v, caption: 'Control Signal Sent to the Silicon', low: 'Off', high: 'On' },
            note: msg,
        };
    };

    return (
        <LabCanvas
            title="The Magic Middle"
            readout={({ v }) => `Silicon switch is ${v >= THRESHOLD ? 'ON' : 'OFF'}`}
            controlLabel="Control Signal"
            controlKey="controlSignal"
            controlInitial={20}
            accent="emerald"
            sky={['#f1f5f9', '#f8fafc']}
            completeTitle="C39 Complete!"
            completeSubtitle="How Do Computers Use Logic to Solve Problems?"
            completeNote="Silicon can say yes AND no -- that is what makes it a switch!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
