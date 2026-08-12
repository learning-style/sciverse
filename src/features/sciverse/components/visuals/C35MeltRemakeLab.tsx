import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Side by side: heat rearranges metal atoms but snaps plastic polymer chains. */
export const C35MeltRemakeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const midX = safeRight / 2;
        const topY = 120;
        const panelH = H - topY - 130;

        // Divider between the two materials.
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(midX, topY - 12);
        ctx.lineTo(midX, topY + panelH);
        ctx.stroke();

        outlineText(ctx, 'ALUMINIUM (atoms)', midX / 2, topY - 20, 'bold 12px monospace');
        outlineText(ctx, 'PLASTIC (long chains)', midX + midX / 2, topY - 20, 'bold 12px monospace');

        // Left: metal atoms jiggle more with heat but stay whole.
        const jiggle = v * 6;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 7; col++) {
                const x = 40 + col * ((midX - 80) / 6) + Math.sin(t * 4 + row + col) * jiggle;
                const y = topY + 20 + row * 26 + Math.cos(t * 3.4 + col) * jiggle;
                ctx.fillStyle = '#64748b';
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#1e293b';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        // Right: polymer chains break into shorter pieces as heat rises.
        const breaks = Math.floor(v * 4);          // how many cuts per chain
        const segLen = 8;
        for (let chain = 0; chain < 4; chain++) {
            const y = topY + 30 + chain * 30;
            for (let s = 0; s < segLen; s++) {
                const x = midX + 30 + s * ((midX - 70) / segLen);
                ctx.fillStyle = '#0ea5e9';
                ctx.beginPath();
                ctx.arc(x, y + Math.sin(t * 2 + s * 0.6 + chain) * 3, 6, 0, Math.PI * 2);
                ctx.fill();

                // Draw the link to the next bead unless this is a break point.
                const isBreak = breaks > 0 && s > 0 && s % Math.max(2, Math.floor(segLen / (breaks + 1))) === 0;
                if (s < segLen - 1 && !isBreak) {
                    ctx.strokeStyle = '#0369a1';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(x + 6, y);
                    ctx.lineTo(x + ((midX - 70) / segLen) - 6, y);
                    ctx.stroke();
                } else if (isBreak) {
                    outlineText(ctx, '✂', x + 12, y + 5, 'bold 14px monospace', '#dc2626');
                }
            }
        }

        const metalQuality = 1;
        const plasticQuality = Math.max(0.1, 1 - v * 0.85);

        outlineText(ctx, `Metal quality after melting: ${Math.round(metalQuality * 100)}%`,
            midX / 2, topY + panelH + 24, 'bold 11px monospace', '#15803d');
        outlineText(ctx, `Plastic quality after melting: ${Math.round(plasticQuality * 100)}%`,
            midX + midX / 2, topY + panelH + 24, 'bold 11px monospace', plasticQuality > 0.6 ? '#15803d' : '#b91c1c');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, plasticQuality,
            'How Good the Recycled Plastic Is', 'Ruined', 'Like new'
        );

        const msg = v < 0.25
            ? 'Gentle heat. Both materials survive fine.'
            : v < 0.6
                ? 'Metal is unchanged, but plastic chains are starting to snap.'
                : 'Hot! Metal atoms re-stack perfectly -- plastic chains are badly broken.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Melt and Remake"
            readout={({ raw }) => `Melting temperature: ${raw}%`}
            controlLabel="Melting Temperature"
            controlKey="meltTemperature"
            controlInitial={30}
            accent="emerald"
            sky={['#fee2e2', '#f8fafc']}
            completeTitle="C35 Complete!"
            completeSubtitle="How Can We Turn Waste Into Resources?"
            completeNote="Atoms survive melting -- polymer chains do not!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
