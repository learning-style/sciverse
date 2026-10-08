import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: g is countable. One broken switch at the top, the genes it controls in a
// row below, and each gene marked by whether it has a spare switch -- the red ones
// are the ones that actually break, so their number IS the gain. At the threshold
// exactly one is red, which is the clearest possible picture of a dividing line at
// one: each broken gene replaces itself and no more.
const BROKEN = '#be123c';
const SAFE = '#047857';

const breadthOf = (dial: number): number => Math.max(2, Math.min(30, Math.round(dial)));
const shareOf = (dial: number): number => Math.max(0, Math.min(20, Math.round(dial))) / 100;

export const L3B25BufferLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const breadth = breadthOf(raw);
        const share = shareOf(raw2);
        const gain = breadth * share;
        const dies = gain < 1;
        const atLine = Math.abs(gain - 1) < 1e-9;
        const total = dies ? 1 / (1 - gain) : 0;
        const redCount = Math.round(gain);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const showLabel = usable >= ROW + 34;
        const labelH = showLabel ? ROW : 0;
        // Floored low enough that it cannot exceed what is left: a 24px floor overran
        // a phone-height stage.
        const artH = Math.max(12, usable - labelH);
        const top = artTop + Math.max(0, (usable - (artH + labelH)) / 2);
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const pitch = fullW / breadth;
        // The radius is settled FIRST, capped by a fifth of the band, and the inset is
        // then at least a radius clear of the edges. Doing it the other way round made
        // the two circular: a small inset let the dots overflow the band, and a large
        // one let the two rows touch.
        const geneR = Math.max(1.2, Math.min(pitch * 0.32, 4.2, artH / 5 - 0.5));
        const inset = Math.max(geneR + 1, Math.min(artH * 0.14, 22));
        const switchY = top + inset;
        const geneY = top + artH - inset;
        const labelRow = top + artH + 11;
        const xOf = (i: number) => left + pitch * (i + 0.5);

        // the fan from the one broken switch down to everything it turns on
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        for (let i = 0; i < breadth; i++) {
            ctx.beginPath();
            ctx.moveTo(safeRight / 2, switchY + geneR);
            ctx.lineTo(xOf(i), geneY - geneR);
            ctx.stroke();
        }

        // the genes. Red ones have no spare switch, so they are the ones that break.
        for (let i = 0; i < breadth; i++) {
            const isRed = i < redCount;
            if (!isRed) {
                // the spare switch, drawn as a stub coming in from the side
                ctx.strokeStyle = SAFE;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(xOf(i), geneY - geneR);
                // clamped, or the last gene's stub ran a fraction past the stage edge
                const stubX = Math.min(left + fullW, xOf(i) + Math.max(3, geneR * 1.6));
                ctx.lineTo(stubX, geneY - geneR - Math.max(4, geneR * 2));
                ctx.stroke();
            }
            ctx.fillStyle = isRed ? BROKEN : SAFE;
            ctx.beginPath();
            ctx.arc(xOf(i), geneY, geneR, 0, Math.PI * 2);
            ctx.fill();
        }

        // the switch that mutated
        ctx.fillStyle = BROKEN;
        ctx.beginPath();
        ctx.arc(safeRight / 2, switchY, Math.max(2.6, geneR * 1.3), 0, Math.PI * 2);
        ctx.fill();

        if (showLabel) {
            outlineText(ctx, gain.toFixed(2) + ' genes break on average', safeRight / 2, labelRow,
                'bold 11px monospace', dies ? SAFE : BROKEN, 'center', safeRight - 24);
        }

        outlineText(ctx, 'g = ' + breadth + ' x ' + (share * 100).toFixed(0) + '% = ' + gain.toFixed(2),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, atLine ? 'exactly 1: the threshold'
            : dies ? 'below 1: the cascade dies' : 'above 1: catastrophe',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            atLine ? '#334155' : dies ? SAFE : BROKEN, 'center', safeRight - 30);

        fitText(ctx, dies ? total.toFixed(2) + ' genes in total' : 'no end to it',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'One broken switch', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, gain / 2)),
                caption: 'Genes Broken Per Gene',
                low: 'dies out: safe',
                high: 'runs away: catastrophe',
                stops: [SAFE, '#fcd34d', BROKEN] as [string, string, string],
            },
            note: dies
                ? 'A switch on ' + breadth + ' genes with ' + (share * 100).toFixed(0)
                  + '% lacking a spare gives g = ' + gain.toFixed(2) + ', so the cascade dies after '
                  + total.toFixed(2) + ' genes in total. The threshold share is 1/' + breadth + '.'
                : 'g = ' + gain.toFixed(2) + ' is at or past the threshold, so the cascade never dies out. '
                  + 'A switch this wide needs the share below 1/' + breadth + '.',
        };
    };

    return (
        <LabCanvas
            title="Why Most Mutations Do Nothing"
            readout={({ raw }) => 'Each switch turns on ' + breadthOf(raw) + ' genes'}
            controlLabel="Genes Each Switch Turns On"
            controlKey="bufferBreadth"
            controlMin={2}
            controlMax={30}
            controlInitial={20}
            controlDisplay={raw => breadthOf(raw) + ' genes'}
            control2={{
                label: 'Share With No Spare Switch',
                key: 'noSpareShare',
                min: 0,
                max: 20,
                initial: 2,
                display: raw => (shareOf(raw) * 100).toFixed(0) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Can Tiny Changes Cause Big Effects?"
            completeNote="Above or below one is the only question!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
