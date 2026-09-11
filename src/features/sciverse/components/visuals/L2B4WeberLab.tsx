import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const K_WEIGHT = 0.03;

export const L2B4WeberLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = Math.max(50, Math.round(raw));
        const added = Math.max(1, Math.round(raw2));
        const threshold = K_WEIGHT * start;
        const noticed = added >= threshold;
        const share = (added / start) * 100;

        // What you are holding, drawn bigger for heavier loads
        const bagCx = safeRight * 0.24;
        const bagTop = stageTop + 30;
        const bagW = 40 + 22 * Math.log10(start / 50);
        const bagH = bagW * 1.1;
        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(bagCx - bagW / 2, bagTop + 14, bagW, bagH);
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 2;
        ctx.strokeRect(bagCx - bagW / 2, bagTop + 14, bagW, bagH);
        ctx.beginPath();
        ctx.arc(bagCx, bagTop + 14, bagW * 0.25, Math.PI, 0);
        ctx.stroke();
        outlineText(ctx, `${start.toLocaleString()} g in your hand`, bagCx, bagTop + bagH + 32,
            'bold 12px monospace', '#0f172a', 'center', safeRight * 0.4);

        const coinX = bagCx + bagW / 2 + 30;
        const coinY = bagTop + 30;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(coinX, coinY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, `+${added} g`, coinX, coinY + 30, 'bold 12px monospace', '#92400e', 'center', 70);

        // The extra weight measured against the threshold
        const gx = safeRight * 0.5;
        const gw = safeRight * 0.44;
        const gy = stageTop + 70;
        const gh = 26;
        const scaleMax = Math.max(threshold, added) * 1.6;
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(gx, gy, gw, gh);
        ctx.fillStyle = noticed ? '#e11d48' : '#fda4af';
        ctx.fillRect(gx, gy, gw * (added / scaleMax), gh);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gx, gy, gw, gh);

        const tx = gx + gw * (threshold / scaleMax);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(tx, gy - 5);
        ctx.lineTo(tx, gy + gh + 5);
        ctx.stroke();
        ctx.setLineDash([]);

        outlineText(ctx, 'extra weight', gx, gy - 14, 'bold 12px monospace', '#9f1239', 'left', gw / 2);
        outlineText(ctx, `just noticeable: ${threshold.toFixed(1)} g`, gx + gw / 2, gy + gh + 24,
            'bold 12px monospace', '#0f172a', 'center', gw);

        outlineText(ctx, `just noticeable difference = 0.03 x ${start.toLocaleString()} = ${threshold.toFixed(1)} g`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, noticed ? 'you notice the extra weight' : 'too small a share to notice',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', noticed ? '#9f1239' : '#475569', 'center', safeRight - 30);

        fitText(ctx, `The extra ${added} g is ${share.toFixed(share < 1 ? 2 : 1)}% of what you hold`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The brain notices the share, not the amount', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, added / (threshold * 2))),
                caption: 'Extra Weight Compared With the Threshold',
                low: 'Not noticed',
                high: 'Clearly felt',
            },
            note: noticed
                ? `${added} g is more than the ${threshold.toFixed(1)} g threshold for ${start.toLocaleString()} g, so you feel it.`
                : `${added} g is less than the ${threshold.toFixed(1)} g threshold for ${start.toLocaleString()} g, so you do not notice it.`,
        };
    };

    return (
        <LabCanvas
            title="We Notice Ratios, Not Amounts"
            readout={({ raw }) => `Holding ${Math.max(50, Math.round(raw)).toLocaleString()} g`}
            controlLabel="Starting Weight"
            controlKey="startWeight"
            controlMin={50}
            controlMax={5000}
            controlInitial={100}
            controlDisplay={raw => `${Math.max(50, Math.round(raw)).toLocaleString()} g`}
            control2={{
                label: 'Added Weight',
                key: 'addedWeight',
                min: 1,
                max: 300,
                initial: 5,
                display: raw => `${Math.max(1, Math.round(raw))} g`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="We Notice Ratios, Not Amounts"
            completeNote="k x starting amount -- the share, not the amount!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
