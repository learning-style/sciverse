import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Same force on a glass bar and a plastic bar: the hard one shatters, the tough one bends. */
export const P44MaterialTestLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, v, stageTop, stageBottom }: LabScene) => {
        const newtons = Math.round(v * 100);
        const glassBroken = newtons > 55;      // brittle: no warning, then gone
        const plasticBend = Math.min(1, newtons / 100);

        const barW = safeRight * 0.30;
        const barH = 26;
        const midY = (stageTop + stageBottom) / 2;

        // ── glass bar: straight, then shattered ──
        const gx = safeRight * 0.09;
        outlineText(ctx, 'glass bar', gx + barW / 2, midY - 74, 'bold 15px monospace', '#000000', 'center', px0 - gx - 8);
        if (!glassBroken) {
            ctx.fillStyle = '#bae6fd';
            ctx.fillRect(gx, midY - barH / 2, barW, barH);
            ctx.strokeStyle = '#0369a1';
            ctx.lineWidth = 3;
            ctx.strokeRect(gx, midY - barH / 2, barW, barH);
            outlineText(ctx, 'still straight', gx + barW / 2, midY + 52, 'bold 14px monospace');
        } else {
            for (let i = 0; i < 7; i++) {
                const seed = i * 61.7;
                const px = gx + ((seed * 5.3) % barW);
                const py = midY - 26 + ((seed * 7.1) % 52);
                ctx.fillStyle = '#bae6fd';
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(px + 16, py + 7);
                ctx.lineTo(px + 5, py + 19);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#0369a1';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            outlineText(ctx, 'SHATTERED', gx + barW / 2, midY + 52, 'bold 16px monospace', '#b91c1c');
        }

        // ── plastic bar: bends further and further, never shatters ──
        const px0 = safeRight * 0.56;
        outlineText(ctx, 'plastic bar', px0 + barW / 2, midY - 74, 'bold 15px monospace', '#000000', 'center', px0 - gx - 8);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = barH;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(px0, midY);
        ctx.quadraticCurveTo(px0 + barW / 2, midY + plasticBend * 58, px0 + barW, midY);
        ctx.stroke();
        ctx.lineCap = 'butt';
        outlineText(ctx, plasticBend > 0.55 ? 'bent, not broken' : 'bending', px0 + barW / 2, midY + 78, 'bold 14px monospace');

        fitText(ctx, `Force: ${newtons} newtons on both bars`, safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, 'Glass is hard but brittle. Plastic is soft but tough.', safeRight / 2, 118, safeRight - 24, 13);

        const msg = newtons < 30
            ? 'Light push. Both bars are coping easily.'
            : !glassBroken
                ? 'The plastic is bending. The glass shows no warning at all yet.'
                : 'The glass shattered with no warning. The plastic just kept bending.';
        return { meter: { fraction: glassBroken ? 0.15 : 1 - plasticBend * 0.3,
                 caption: 'How Well the Glass Can Survive', low: 'Shattered', high: 'Intact' }, note: msg };
    };

    return (
        <LabCanvas
            title="Bend, Scratch, Break"
            readout={({ v }) => `Force: ${Math.round(v * 100)} newtons`}
            controlLabel="Force"
            controlKey="appliedForce"
            controlInitial={20}
            controlDisplay={(_raw, v) => `${Math.round(v * 100)} newtons`}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="P44 Complete!"
            completeSubtitle="How Do Everyday Materials Get Their Properties?"
            completeNote="Hard is not the same as tough!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
