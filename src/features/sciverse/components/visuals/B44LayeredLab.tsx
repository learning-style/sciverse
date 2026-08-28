import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A crack travelling into a layered shell: each soft layer stops it, so more layers means tougher. */
export const B44LayeredLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, stageTop, stageBottom }: LabScene) => {
        const layers = raw;
        // Each soft glue line absorbs some crack energy.
        const toughness = Math.min(1, layers / 12);
        // The crack gets through only the layers its energy can pay for.
        const reached = Math.max(1, Math.round(layers * (1 - toughness) + 1));

        const blockX = safeRight * 0.2;
        const blockW = safeRight * 0.6;
        const top = stageTop + 44;
        const blockH = Math.min(230, stageBottom - top - 70);
        const layerH = blockH / layers;

        for (let i = 0; i < layers; i++) {
            const y = top + i * layerH;
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(blockX, y, blockW, layerH - 3);
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(blockX, y, blockW, layerH - 3);
            // Soft glue line between layers.
            if (i < layers - 1) {
                ctx.fillStyle = '#f472b6';
                ctx.fillRect(blockX, y + layerH - 3, blockW, 3);
            }
        }
        outlineText(ctx, 'hard mineral layers', blockX - 12, top + 16, 'bold 14px monospace', '#92400e', 'right');
        outlineText(ctx, 'soft glue between', blockX + blockW + 12, top + 40, 'bold 14px monospace', '#be185d', 'left');

        // The crack, stopped after the layers it could get through.
        const crackX = blockX + blockW * 0.5;
        const crackEnd = top + Math.min(layers, reached) * layerH;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(crackX, top);
        let yy = top;
        let xx = crackX;
        while (yy < crackEnd) {
            yy += layerH / 2;
            xx += (Math.sin(yy * 0.3 + t) * 9);
            ctx.lineTo(xx, Math.min(yy, crackEnd));
        }
        ctx.stroke();
        outlineText(ctx, 'crack', crackX + 30, top - 12, 'bold 14px monospace', '#0f172a', 'left');

        fitText(ctx, `The crack got through ${Math.min(layers, reached)} of ${layers} layers`, safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, 'Each soft glue line absorbs energy and stops the crack', safeRight / 2, 118, safeRight - 24, 13);

        const msg = layers <= 2
            ? 'Almost solid mineral -- the crack runs straight through, like plain chalk.'
            : layers < 8
                ? 'Layers are slowing the crack down. It cannot reach the bottom easily.'
                : 'Many thin layers -- the crack is stopped again and again. This is shell.';
        return { meter: { fraction: toughness, caption: 'How Tough the Material Is', low: 'Shatters easily', high: 'Very tough' }, note: msg };
    };

    return (
        <LabCanvas
            title="Nature's Layered Armour"
            readout={({ raw }) => `${raw} layer${raw === 1 ? '' : 's'} of hard mineral`}
            controlLabel="Number of Layers"
            controlKey="layerCount"
            controlMin={1}
            controlMax={14}
            controlInitial={3}
            controlDisplay={raw => `${raw} layer${raw === 1 ? '' : 's'}`}
            accent="rose"
            sky={['#fff7ed', '#f8fafc']}
            completeTitle="B44 Complete!"
            completeSubtitle="How Do Everyday Materials Get Their Properties?"
            completeNote="Layers stop cracks - structure beats ingredients!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
