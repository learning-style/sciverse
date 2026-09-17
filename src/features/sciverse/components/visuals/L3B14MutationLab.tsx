import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const CODONS = 150;
const UNTOUCHED_CODONS = 20;
const SILENT = '#be123c';
const GARBLED = '#475569';

// Counted from the standard genetic code: of the 192 possible changes at each
// position, how many leave the amino acid alone
const SILENT_AT: Record<number, number> = { 1: 8, 2: 2, 3: 128 };
const CHANGES_AT: Record<number, number> = { 1: 166, 2: 176, 3: 50 };
const STOP_AT: Record<number, number> = { 1: 18, 2: 14, 3: 14 };
const PER_POSITION = 192;

const positionOf = (dial: number): number => Math.max(1, Math.min(3, Math.round(dial)));
const insertedOf = (dial: number): number => Math.max(0, Math.min(3, Math.round(dial)));

export const L3B14MutationLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const position = positionOf(raw);
        const inserted = insertedOf(raw2);
        const silent = SILENT_AT[position] as number;
        const changes = CHANGES_AT[position] as number;
        const stop = STOP_AT[position] as number;
        const share = Math.round((silent / PER_POSITION) * 100);
        const inFrame = inserted % 3 === 0;
        const untouched = inFrame ? CODONS : UNTOUCHED_CODONS;
        const garbled = CODONS - untouched;

        // Top: how the 192 substitutions at this position turn out
        const bx = 30;
        const bw = safeRight - 60;
        const by = stageTop + 22;
        const bh = 20;
        let x = bx;
        for (const [count, colour] of [[silent, SILENT], [changes, '#94a3b8'], [stop, '#0f172a']] as [number, string][]) {
            const w = (count / PER_POSITION) * bw;
            ctx.fillStyle = colour;
            ctx.fillRect(x, by, w, bh);
            x += w;
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);
        outlineText(ctx, `position ${position}: ${silent} of 192 silent`, bx, by + bh + 16,
            '11px monospace', SILENT, 'left', bw * 0.6);
        outlineText(ctx, `${changes} change the amino acid, ${stop} involve a stop`, bx + bw, by + bh + 16,
            '11px monospace', GARBLED, 'right', bw * 0.6);

        // Below: the gene, and how much of it still reads correctly
        const gy = by + bh + 34;
        const gh = Math.min(26, stageBottom - 60 - gy);
        const cellW = bw / CODONS;
        for (let i = 0; i < CODONS; i++) {
            ctx.fillStyle = i < untouched ? SILENT : GARBLED;
            ctx.fillRect(bx + i * cellW, gy, Math.max(1, cellW - 0.4), gh);
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, gy, bw, gh);
        if (!inFrame) {
            const mx = bx + UNTOUCHED_CODONS * cellW;
            ctx.strokeStyle = '#b45309';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(mx, gy - 6);
            ctx.lineTo(mx, gy + gh + 6);
            ctx.stroke();
        }
        outlineText(ctx, inFrame ? 'the reading frame survives' : 'the reading frame shifts',
            bx, gy + gh + 16, '11px monospace', inFrame ? SILENT : '#b45309', 'left', bw);

        outlineText(ctx, `${inserted} bases inserted: ${untouched} untouched, ${garbled} garbled of ${CODONS}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, inFrame ? `a multiple of 3, so ${untouched} codons still read correctly` : `a frameshift: ${Math.round((garbled / CODONS) * 100)}% of the protein garbled`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', inFrame ? SILENT : GARBLED, 'center', safeRight - 30);

        fitText(ctx, `position ${position}: ${share}% silent`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Third position, and keep the frame', safeRight / 2, 118, safeRight - 24, 13);

        // Built outside the note: a ternary nested inside a template literal
        // defeats the checker's scan of what the canvas prints
        const tail = inFrame
            ? `the reading frame survives, so all ${untouched} codons still read correctly.`
            : `the reading frame shifts: ${untouched} codons are untouched and ${garbled} are garbled.`;

        return {
            meter: {
                fraction: silent / PER_POSITION,
                caption: 'Silent Substitutions',
                low: '0',
                high: '192',
                stops: ['#fff1f2', '#fda4af', SILENT] as [string, string, string],
            },
            note: `At position ${position} of a codon, ${silent} of the 192 possible changes are silent (${share}%), ${changes} change the amino acid and ${stop} involve a stop. With ${inserted} bases inserted, ${tail}`,
        };
    };

    return (
        <LabCanvas
            title="Which Mistakes Matter?"
            readout={({ raw }) => `A substitution at position ${positionOf(raw)} of a codon`}
            controlLabel="Position in the Codon"
            controlKey="codonPosition"
            controlMin={1}
            controlMax={3}
            controlInitial={3}
            controlDisplay={raw => `position ${positionOf(raw)}`}
            control2={{
                label: 'Bases Inserted',
                key: 'basesInserted',
                min: 0,
                max: 3,
                initial: 1,
                display: raw => `${insertedOf(raw)} bases`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Which Mistakes Matter?"
            completeNote="128 of 192 at the third position!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
