import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const PRODUCT = '#047857';
const REACTANT = '#1d4ed8';

const startOf = (dial: number): number => Math.max(0.2, Math.min(2, Math.round(dial * 20) / 20));
const kcOf = (dial: number): number => Math.max(10, Math.min(100, Math.round(dial)));

export const L3C15IceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = startOf(raw);
        const kc = kcOf(raw2);
        const root = Math.sqrt(kc);
        // Both sides are perfect squares, so the root solves it without a quadratic
        const x = (start * root) / (2 + root);
        const hi = 2 * x;
        const left = start - x;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);

        // Three columns of concentration, to the same scale
        const tallest = Math.max(hi, start);
        const colH = Math.min(190, avail - 62);
        const baseY = artTop + Math.max(0, (avail - colH - 62) / 2) + colH;
        const colW = Math.min(70, (safeRight - 120) / 3);
        const gap = colW * 0.6;
        const startX = safeRight / 2 - (colW * 3 + gap * 2) / 2;

        const column = (i: number, value: number, fill: string, label: string) => {
            const x0 = startX + i * (colW + gap);
            const h = (value / tallest) * colH;
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(x0, baseY - colH, colW, colH);
            ctx.fillStyle = fill;
            ctx.fillRect(x0, baseY - h, colW, h);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(x0, baseY - colH, colW, colH);
            outlineText(ctx, label, x0 + colW / 2, baseY + 15, 'bold 11px monospace', fill, 'center', colW + gap - 4);
            outlineText(ctx, `${value.toFixed(3)} mol/L`, x0 + colW / 2, baseY - h - 6,
                '10px monospace', '#0f172a', 'center', colW + gap - 4);
        };
        column(0, left, REACTANT, 'H₂');
        column(1, left, REACTANT, 'I₂');
        column(2, hi, PRODUCT, 'HI');

        outlineText(ctx, `starting with ${start.toFixed(2)} mol/L of H₂ and I₂`, safeRight / 2,
            Math.min(baseY + 32, artBottom), '11px monospace', '#475569', 'center', safeRight - 40);

        outlineText(ctx, `2x / (${start.toFixed(2)} − x) = √${kc} = ${root.toFixed(3)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `[HI] = ${hi.toFixed(3)} and [H₂] = [I₂] = ${left.toFixed(3)} mol/L`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', PRODUCT, 'center', safeRight - 30);

        fitText(ctx, `x = ${x.toFixed(3)} mol/L reacted`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'ICE table, then square root', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, x / start)),
                caption: 'Reacted',
                low: '0',
                high: '1',
                stops: ['#eff6ff', '#6ee7b7', PRODUCT] as [string, string, string],
            },
            note: `From ${start.toFixed(2)} mol/L of each with Kc = ${kc}, x = ${x.toFixed(3)} mol/L reacted, giving [HI] = ${hi.toFixed(3)} and [H₂] = [I₂] = ${left.toFixed(3)} mol/L. Check: ${hi.toFixed(3)}² / (${left.toFixed(3)} x ${left.toFixed(3)}) = ${(hi * hi / (left * left)).toFixed(1)}.`,
        };
    };

    return (
        <LabCanvas
            title="Powers, Not Just Ratios"
            readout={({ raw }) => `Starting with ${startOf(raw).toFixed(2)} mol/L of each`}
            controlLabel="Starting Concentration"
            controlKey="startConc"
            controlMin={0.2}
            controlMax={2}
            controlInitial={1}
            controlDisplay={raw => `${startOf(raw).toFixed(2)} mol/L`}
            control2={{
                label: 'Equilibrium Constant Kc',
                key: 'kcValue',
                min: 10,
                max: 100,
                initial: 54,
                display: raw => `${kcOf(raw)}`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Powers, Not Just Ratios"
            completeNote="Kc = [HI]² / ([H₂][I₂])!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
