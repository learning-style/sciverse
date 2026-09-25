import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const TOTAL = 20;
const PRODUCT = '#047857';
const REACTANT = '#1d4ed8';
const REVERSE = '#b45309';

const kOf = (dial: number): number => Math.max(0.25, Math.min(4, Math.round(dial * 4) / 4));
const productOf = (dial: number): number => Math.max(1, Math.min(TOTAL - 1, Math.round(dial)));

export const L2C15ShiftLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const k = kOf(raw);
        const product = productOf(raw2);
        const reactant = TOTAL - product;
        const q = product / reactant;
        const restingProduct = (TOTAL * k) / (1 + k);
        const balanced = Math.abs(q - k) < 0.05;
        const forward = q < k;
        const colour = balanced ? '#475569' : forward ? PRODUCT : REVERSE;
        const way = balanced ? 'balanced' : forward ? 'forward' : 'reverse';

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);

        // The flask: reactant particles on the left, product on the right
        const fx = 34;
        const fw = safeRight - 68;
        const fh = Math.min(220, avail - 58);
        const fy = artTop + Math.max(0, (avail - fh - 58) / 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(fx, fy, fw, fh);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(fx, fy, fw, fh);
        ctx.beginPath();
        ctx.moveTo(fx + fw / 2, fy);
        ctx.lineTo(fx + fw / 2, fy + fh);
        ctx.strokeStyle = '#cbd5e1';
        ctx.stroke();

        // Nineteen particles need five rows of four. The spacing is derived from
        // the flask height so the grid cannot overflow it on a short canvas.
        const rowStep = (fh - 24) / 4;
        const dotR = Math.max(3, Math.min(6, rowStep * 0.3));
        const dot = (n: number, x0: number, w: number, fill: string) => {
            for (let i = 0; i < n; i++) {
                const col = i % 4;
                const row = Math.floor(i / 4);
                ctx.fillStyle = fill;
                ctx.beginPath();
                ctx.arc(x0 + 22 + col * (w - 44) / 3, fy + 12 + row * rowStep, dotR, 0, Math.PI * 2);
                ctx.fill();
            }
        };
        dot(reactant, fx, fw / 2, REACTANT);
        dot(product, fx + fw / 2, fw / 2, PRODUCT);
        outlineText(ctx, `${reactant} reactant`, fx + fw / 4, fy + fh + 16, '11px monospace', REACTANT, 'center', fw / 2 - 10);
        outlineText(ctx, `${product} product`, fx + fw * 0.75, fy + fh + 16, '11px monospace', PRODUCT, 'center', fw / 2 - 10);

        // Where this reaction rests, marked on the same row of particles
        const restX = fx + fw / 2 + (fw / 2) * (restingProduct / TOTAL);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(restX, fy - 6);
        ctx.lineTo(restX, fy + 6);
        ctx.stroke();
        outlineText(ctx, `rests at ${restingProduct.toFixed(2)} product`, restX, fy - 12,
            '10px monospace', '#0f172a', 'center', fw / 2);

        outlineText(ctx, `Q = ${product} / ${reactant} = ${q.toFixed(2)}, K = ${k.toFixed(2)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, balanced ? 'Q = K: balanced, both directions still running' : forward ? 'Q below K: runs forward' : 'Q above K: runs reverse',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', colour, 'center', safeRight - 30);

        fitText(ctx, `Q ${q.toFixed(2)} against K ${k.toFixed(2)}: ${way}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Compare the two ratios', safeRight / 2, 118, safeRight - 24, 13);

        const tail = balanced
            ? 'so it is balanced, and both directions are still running.'
            : forward
                ? `so it runs forward until product reaches ${restingProduct.toFixed(2)}.`
                : `so it runs reverse until product falls to ${restingProduct.toFixed(2)}.`;

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, product / TOTAL)),
                caption: 'Product Particles',
                low: '0',
                high: '20',
                stops: ['#eff6ff', '#6ee7b7', PRODUCT] as [string, string, string],
            },
            note: `Right now Q = ${product} / ${reactant} = ${q.toFixed(2)} and this reaction rests at K = ${k.toFixed(2)}, ${tail}`,
        };
    };

    return (
        <LabCanvas
            title="Which Way Will It Shift?"
            readout={({ raw }) => `A reaction that rests at K = ${kOf(raw).toFixed(2)}`}
            controlLabel="Equilibrium Constant K"
            controlKey="equilibriumK"
            controlMin={0.25}
            controlMax={4}
            controlInitial={3}
            controlDisplay={raw => `K = ${kOf(raw).toFixed(2)}`}
            control2={{
                label: 'Product Particles',
                key: 'productNow',
                min: 1,
                max: TOTAL - 1,
                initial: 15,
                display: raw => `${productOf(raw)} of ${TOTAL}`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Which Way Will It Shift?"
            completeNote="Q against K!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
