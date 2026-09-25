import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const PLANTS = 100;
const COLOURS = ['#e11d48', '#f59e0b', '#8b5cf6', '#0ea5e9', '#16a34a', '#f472b6', '#a16207', '#14b8a6', '#6366f1', '#84cc16'];

const speciesOf = (dial: number): number => Math.max(1, Math.min(10, Math.round(dial)));
/** 37 shares no factor with 100, so this places every plant once, scattered. */
const spot = (i: number): number => (i * 37 + 11) % PLANTS;

/** Plants of each kind: the commonest first, the rest shared as evenly as whole plants allow. */
const countsFor = (species: number, dial: number): number[] => {
    if (species === 1) return [PLANTS];
    const least = Math.ceil(PLANTS / species);
    const commonest = Math.max(least, Math.min(PLANTS - (species - 1), Math.round(dial)));
    const rest = PLANTS - commonest;
    const base = Math.floor(rest / (species - 1));
    const extra = rest - base * (species - 1);
    const counts = [commonest];
    for (let i = 0; i < species - 1; i++) counts.push(base + (i < extra ? 1 : 0));
    return counts;
};

export const L2B10DiversityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const species = speciesOf(raw);
        const counts = countsFor(species, raw2);
        const match = counts.reduce((sum, n) => sum + (n / PLANTS) * (n / PLANTS), 0);
        const diversity = 1 - match;

        // The meadow: 100 plants, one colour for each kind, scattered
        const gx = 30;
        const cell = Math.max(8, Math.min((safeRight * 0.5 - gx) / 10, (stageBottom - stageTop - 70) / 10));
        const gy = stageTop + 12;
        const kindAt: number[] = new Array(PLANTS).fill(0);
        let next = 0;
        counts.forEach((n, kind) => {
            for (let j = 0; j < n; j++) kindAt[spot(next++)] = kind;
        });
        for (let c = 0; c < PLANTS; c++) {
            const x = gx + (c % 10) * cell + cell / 2;
            const y = gy + Math.floor(c / 10) * cell + cell / 2;
            ctx.strokeStyle = '#86efac';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y + cell * 0.45);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.fillStyle = COLOURS[kindAt[c]];
            ctx.beginPath();
            ctx.arc(x, y, cell * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }

        const px = safeRight * 0.56;
        const pw = safeRight - 16 - px;
        const others = counts.slice(1);
        const otherText = others.length === 0
            ? 'none'
            : Math.min(...others) === Math.max(...others)
                ? `${others[0]} plants`
                : `${Math.min(...others)} or ${Math.max(...others)} plants`;
        outlineText(ctx, `species ${species}`, px, stageTop + 18, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `commonest kind ${counts[0]} plants, share ${(counts[0] / PLANTS).toFixed(2)}`, px, stageTop + 40, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `each other kind ${otherText}`, px, stageTop + 62, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `chance of a match ${match.toFixed(4)}`, px, stageTop + 88, 'bold 12px monospace', '#475569', 'left', pw);
        outlineText(ctx, `D = 1 − ${match.toFixed(4)} = ${diversity.toFixed(2)}`, px, stageTop + 112, 'bold 14px monospace', '#be123c', 'left', pw);

        outlineText(ctx, `D = 1 − sum of (n / N)² = ${diversity.toFixed(2)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `pick two plants: ${Math.round(diversity * 100)} times out of 100 they are different species`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${species} species, commonest kind ${counts[0]} of 100: D = ${diversity.toFixed(2)}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Richness and evenness together', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, diversity)),
                caption: 'Diversity Index D',
                low: '0',
                high: '1',
                stops: ['#fff1f2', '#fb7185', '#9f1239'] as [string, string, string],
            },
            note: `${species} species, with the commonest kind at ${counts[0]} of 100 plants: the chance of a match is ${match.toFixed(4)}, so D = ${diversity.toFixed(2)}.`,
        };
    };

    return (
        <LabCanvas
            title="Which Meadow Is More Diverse?"
            readout={({ raw }) => `${speciesOf(raw)} kinds of wildflower, 100 plants`}
            controlLabel="Species"
            controlKey="species"
            controlMin={1}
            controlMax={10}
            controlInitial={4}
            controlDisplay={raw => `${speciesOf(raw)} species`}
            control2={{
                label: 'Commonest Kind',
                key: 'commonestKind',
                min: 10,
                max: 100,
                initial: 25,
                display: raw => `${Math.round(raw)} plants`,
            }}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Which Meadow Is More Diverse?"
            completeNote="Square, add, take from 1!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
