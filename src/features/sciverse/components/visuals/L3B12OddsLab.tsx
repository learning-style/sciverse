import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const GENERATIONS = 60;
const DARK = '#1f2937';
const HALF = '#b45309';

const ratioOf = (dial: number): number => Math.max(0.5, Math.min(2, Math.round(dial * 20) / 20));
const startOf = (dial: number): number => Math.max(1, Math.min(99, Math.round(dial)));

export const L3B12OddsLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const ratio = ratioOf(raw);
        const startShare = startOf(raw2) / 100;
        const startOdds = startShare / (1 - startShare);
        const shareAt = (g: number): number => {
            const odds = startOdds * Math.pow(ratio, g);
            return odds / (1 + odds);
        };
        const endShare = shareAt(GENERATIONS);
        // Where the odds pass 1, which is where half the moths are dark
        const crossing = ratio === 1 ? null : -Math.log10(startOdds) / Math.log10(ratio);
        const crossesInRange = crossing !== null && crossing > 0 && crossing <= GENERATIONS;

        const gx0 = 46;
        const gx1 = safeRight - 22;
        const gTop = stageTop + 22;
        const gBottom = stageBottom - 70;
        const gh = gBottom - gTop;
        const xAt = (g: number): number => gx0 + (g / GENERATIONS) * (gx1 - gx0);
        const yAt = (share: number): number => gBottom - share * gh;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx0, gTop);
        ctx.lineTo(gx0, gBottom);
        ctx.lineTo(gx1, gBottom);
        ctx.stroke();
        [0, 0.5, 1].forEach(share => {
            ctx.save();
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = share === 0.5 ? '#fcd34d' : '#e2e8f0';
            ctx.beginPath();
            ctx.moveTo(gx0, yAt(share));
            ctx.lineTo(gx1, yAt(share));
            ctx.stroke();
            ctx.restore();
            outlineText(ctx, `${share * 100}%`, gx0 - 6, yAt(share) + 4, '11px monospace', '#475569', 'right', 40);
        });
        ctx.strokeStyle = DARK;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let g = 0; g <= GENERATIONS; g++) {
            const x = xAt(g);
            const y = yAt(shareAt(g));
            if (g === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        if (crossesInRange && crossing !== null) {
            ctx.fillStyle = HALF;
            ctx.beginPath();
            ctx.arc(xAt(crossing), yAt(0.5), 6, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'dark share', gx0 + 6, gTop + 12, '11px monospace', DARK, 'left', 90);
        outlineText(ctx, `generation 0 to ${GENERATIONS}`, (gx0 + gx1) / 2, gBottom + 16, '11px monospace', '#475569', 'center', gx1 - gx0);

        outlineText(ctx, `odds after n = ${startOdds.toFixed(4)} x ${ratio.toFixed(2)}ⁿ`,
            safeRight / 2, stageBottom - 36, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, ratio === 1
            ? 'with a ratio of 1.00, nothing changes'
            : crossesInRange && crossing !== null
                ? `half the moths are dark at generation ${crossing.toFixed(0)}`
                : 'the dark share does not reach half in 60 generations',
            safeRight / 2, stageBottom - 16, 'bold 12px monospace', HALF, 'center', safeRight - 30);

        fitText(ctx, `${(endShare * 100).toFixed(0)}% dark after ${GENERATIONS} generations`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Odds multiply, every generation', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, endShare)),
                caption: 'Dark Share at Generation 60',
                low: '0%',
                high: '100%',
                stops: ['#f5f5f4', '#a8a29e', '#1f2937'] as [string, string, string],
            },
            note: `Starting at ${(startShare * 100).toFixed(0)}% dark, odds of ${startOdds.toFixed(4)}, multiplied by ${ratio.toFixed(2)} each generation: ${(endShare * 100).toFixed(0)}% dark after ${GENERATIONS} generations.`,
        };
    };

    return (
        <LabCanvas
            title="How Long Does a Trait Take?"
            readout={({ raw }) => `Dark moths survive ${ratioOf(raw).toFixed(2)} times as well`}
            controlLabel="Survival Ratio"
            controlKey="survivalRatio"
            controlMin={0.5}
            controlMax={2}
            controlInitial={1.2}
            controlDisplay={raw => `${ratioOf(raw).toFixed(2)}`}
            control2={{
                label: 'Starting Dark Share',
                key: 'startingDarkShare',
                min: 1,
                max: 99,
                initial: 1,
                display: raw => `${startOf(raw)}%`,
            }}
            accent="rose"
            sky={['#f8fafc', '#f5f5f4']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Long Does a Trait Take?"
            completeNote="Odds multiply; logs run it backwards!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
