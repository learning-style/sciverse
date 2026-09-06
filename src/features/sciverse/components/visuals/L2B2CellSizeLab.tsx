import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const L2B2CellSizeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const side = Math.max(1, Math.round(raw));
        const folds = Math.max(1, Math.round(raw2));

        const area = 6 * side * side;
        const volume = side * side * side;
        const plainRatio = area / volume;
        const foldedRatio = plainRatio * folds;

        // The cell, drawn with its side proportional to the real side length
        const px = Math.max(34, Math.min(190, side * 5.2));
        const cx = safeRight * 0.3;
        const cy = (stageTop + stageBottom) / 2 - 6;
        ctx.fillStyle = 'rgba(225,29,72,0.10)';
        ctx.fillRect(cx - px / 2, cy - px / 2, px, px);

        // Folding drawn as a wrinkled edge, since that is what it physically is
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 2.5;
        if (folds <= 1) {
            ctx.strokeRect(cx - px / 2, cy - px / 2, px, px);
        } else {
            const teeth = Math.min(28, folds * 3);
            const step = px / teeth;
            const amp = Math.min(9, 2 + folds * 0.6);
            ctx.beginPath();
            for (let edge = 0; edge < 4; edge++) {
                for (let i = 0; i <= teeth; i++) {
                    const along = -px / 2 + i * step;
                    const off = (i % 2 === 0 ? -1 : 1) * amp;
                    let ax = 0;
                    let ay = 0;
                    if (edge === 0) { ax = cx + along; ay = cy - px / 2 + off; }
                    if (edge === 1) { ax = cx + px / 2 + off; ay = cy + along; }
                    if (edge === 2) { ax = cx - along; ay = cy + px / 2 + off; }
                    if (edge === 3) { ax = cx - px / 2 + off; ay = cy - along; }
                    if (edge === 0 && i === 0) ctx.moveTo(ax, ay); else ctx.lineTo(ax, ay);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }
        outlineText(ctx, `${side} µm across`, cx, cy + px / 2 + 26,
            'bold 13px monospace', '#0f172a', 'center', px + 90);
        outlineText(ctx, folds > 1 ? `membrane folded ${folds}x` : 'membrane not folded at all',
            cx, cy + px / 2 + 44, 'bold 12px monospace', '#9f1239', 'center', px + 110);

        // The three numbers, laid out as a small table
        const tx = safeRight * 0.63;
        const ty0 = stageTop + 66;
        ctx.textAlign = 'left';
        const rows: [string, string][] = [
            ['surface  6L²', `${area.toLocaleString()} µm²`],
            ['volume  L³', `${volume.toLocaleString()} µm³`],
            ['SA/V  6/L', `${plainRatio.toFixed(2)} per µm`],
            ['with folds', `${foldedRatio.toFixed(2)} per µm`],
        ];
        rows.forEach((r, i) => {
            ctx.font = i === 3 ? 'bold 13px monospace' : '13px monospace';
            ctx.fillStyle = i === 3 ? '#9f1239' : '#334155';
            ctx.fillText(r[0], tx, ty0 + i * 26);
            ctx.fillText(r[1], tx + 118, ty0 + i * 26);
        });
        ctx.textAlign = 'center';

        const starving = foldedRatio < 0.75;
        outlineText(ctx, starving ? 'too little surface -- the middle starves' : 'enough surface to supply the volume',
            safeRight / 2, stageBottom - 14, 'bold 13px monospace',
            starving ? '#b91c1c' : '#166534', 'center', safeRight - 30);

        fitText(ctx, `SA/V = 6 / ${side} = ${plainRatio.toFixed(2)} per µm`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Double the size and the ratio halves -- so life folds the surface',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, foldedRatio / 6)),
                caption: 'Surface For Each Unit of Volume',
                low: 'The middle starves',
                high: 'Plenty of surface',
            },
            note: starving
                ? `At ${side} µm the volume demands more than the surface can supply. Stay small, or fold the membrane.`
                : `At ${side} µm with ${folds}x folding there is surface enough. Microvilli and alveoli do exactly this.`,
        };
    };

    return (
        <LabCanvas
            title="Why Cells Are Small"
            readout={({ raw }) => `A cube-shaped cell ${Math.max(1, Math.round(raw))} µm across`}
            controlLabel="Cell Size"
            controlKey="cellSide"
            controlMin={1}
            controlMax={40}
            controlInitial={4}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} µm`}
            control2={{
                label: 'Membrane Folds',
                key: 'membraneFolds',
                min: 1,
                max: 12,
                initial: 1,
                display: raw => `${Math.max(1, Math.round(raw))}x folded`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Why Cells Are Small"
            completeNote="SA/V = 6/L, and that is why cells are small!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
