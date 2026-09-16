import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const AMORPHOUS = 0.85;
const CRYSTAL = 1.00;
const CRYSTAL_COLOUR = '#047857';
const TANGLE = '#94a3b8';

const densityOf = (dial: number): number => Math.max(0.85, Math.min(1, Math.round(dial * 200) / 200));
const branchesOf = (dial: number): number => Math.max(0, Math.min(40, Math.round(dial)));

export const L3C13DensityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const density = densityOf(raw);
        const branches = branchesOf(raw2);
        const fraction = (density - AMORPHOUS) / (CRYSTAL - AMORPHOUS);
        const predicted = CRYSTAL - 0.00375 * branches;
        const grade = fraction > 0.65 ? 'a stiff grade' : fraction > 0.4 ? 'a bag or film grade' : 'a soft, stretchy grade';

        // The sample: neatly stacked chains on the left, tangled ones on the right
        const bx = 30;
        const bw = safeRight * 0.44;
        const by = stageTop + 18;
        const bh = Math.min(120, stageBottom - 78 - by);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(bx, by, bw, bh);
        const split = bx + bw * Math.max(0, Math.min(1, fraction));
        ctx.strokeStyle = CRYSTAL_COLOUR;
        ctx.lineWidth = 2;
        for (let i = 0; i < 9; i++) {
            const y = by + 8 + i * ((bh - 16) / 8);
            ctx.beginPath();
            ctx.moveTo(bx + 6, y);
            ctx.lineTo(Math.max(bx + 6, split - 4), y);
            ctx.stroke();
        }
        ctx.strokeStyle = TANGLE;
        ctx.lineWidth = 1.8;
        for (let i = 0; i < 7; i++) {
            ctx.beginPath();
            for (let x = split + 4; x < bx + bw - 6; x += 6) {
                const y = by + 12 + i * ((bh - 20) / 6) + Math.sin(x * 0.35 + i) * 5;
                if (x === split + 4) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);
        outlineText(ctx, 'crystalline', bx + 6, by + bh + 16, '11px monospace', CRYSTAL_COLOUR, 'left', bw * 0.5);
        outlineText(ctx, 'amorphous', bx + bw - 6, by + bh + 16, '11px monospace', '#475569', 'right', bw * 0.5);

        // The density scale, which only runs from 0.85 to 1.00
        const sx0 = safeRight * 0.54;
        const sx1 = safeRight - 24;
        const sy = stageTop + 40;
        const xAt = (d: number): number => sx0 + ((d - AMORPHOUS) / (CRYSTAL - AMORPHOUS)) * (sx1 - sx0);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(sx0, sy, sx1 - sx0, 16);
        ctx.fillStyle = CRYSTAL_COLOUR;
        ctx.fillRect(sx0, sy, xAt(density) - sx0, 16);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx0, sy, sx1 - sx0, 16);
        outlineText(ctx, '0.85', sx0, sy + 32, '11px monospace', '#475569', 'left', 60);
        outlineText(ctx, '1.00', sx1, sy + 32, '11px monospace', '#475569', 'right', 60);
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xAt(predicted), sy - 6);
        ctx.lineTo(xAt(predicted), sy + 22);
        ctx.stroke();
        outlineText(ctx, `branches: about ${predicted.toFixed(2)} g/cm³`, (sx0 + sx1) / 2, sy + 52, '11px monospace', '#b45309', 'center', sx1 - sx0);
        outlineText(ctx, `${branches} branches per 1,000 carbon atoms`, (sx0 + sx1) / 2, sy + 70, '11px monospace', '#475569', 'center', sx1 - sx0);

        outlineText(ctx, `f = (${density.toFixed(2)} − 0.85) / 0.15 = ${fraction.toFixed(2)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${(fraction * 100).toFixed(0)}% crystalline: ${grade}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', CRYSTAL_COLOUR, 'center', safeRight - 30);

        fitText(ctx, `${(fraction * 100).toFixed(0)}% crystalline at ${density.toFixed(2)} g/cm³`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Weigh it, and the packing falls out', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, fraction)),
                caption: 'Crystalline Fraction',
                low: '0',
                high: '1',
                stops: ['#f1f5f9', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `A density of ${density.toFixed(2)} g/cm³ sits ${(fraction * 100).toFixed(0)}% of the way from 0.85 to 1.00, so the sample is ${(fraction * 100).toFixed(0)}% crystalline: ${grade}.`,
        };
    };

    return (
        <LabCanvas
            title="How Tightly Do the Chains Pack?"
            readout={({ raw }) => `A sample measured at ${densityOf(raw).toFixed(2)} g/cm³`}
            controlLabel="Measured Density"
            controlKey="measuredDensity"
            controlMin={0.85}
            controlMax={1}
            controlInitial={0.96}
            controlDisplay={raw => `${densityOf(raw).toFixed(2)} g/cm³`}
            control2={{
                label: 'Branches',
                key: 'branches',
                min: 0,
                max: 40,
                initial: 10,
                display: raw => `${branchesOf(raw)} per 1,000`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Tightly Do the Chains Pack?"
            completeNote="f = (density − 0.85) / 0.15!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
