import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const START_DARK = 0.2;
const GENERATIONS = 12;
const DARK = '#1f2937';
const LIGHT = '#d6bd93';

const rateOf = (dial: number): number => Math.max(10, Math.min(90, Math.round(dial / 5) * 5));

/** The dark share after each generation, from the two survival rates. */
const darkShares = (lightRate: number, darkRate: number): number[] => {
    const shares = [START_DARK];
    for (let g = 0; g < GENERATIONS; g++) {
        const dark = shares[g];
        const darkSurvivors = dark * darkRate;
        const lightSurvivors = (1 - dark) * lightRate;
        shares.push(darkSurvivors / (darkSurvivors + lightSurvivors));
    }
    return shares;
};

export const L2B12SpreadLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const lightRate = rateOf(raw);
        const darkRate = rateOf(raw2);
        const shares = darkShares(lightRate / 100, darkRate / 100);
        const first = shares[1];
        const last = shares[GENERATIONS];

        // The dark share, generation by generation
        const gx0 = 44;
        const gx1 = safeRight - 24;
        const gTop = stageTop + 20;
        const gBottom = stageBottom - 66;
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
            ctx.strokeStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.moveTo(gx0, yAt(share));
            ctx.lineTo(gx1, yAt(share));
            ctx.stroke();
            ctx.restore();
            outlineText(ctx, `${share * 100}%`, gx0 - 6, yAt(share) + 4, '11px monospace', '#475569', 'right', 40);
        });
        const barW = (gx1 - gx0) / (GENERATIONS + 1) - 3;
        shares.forEach((share, g) => {
            const x = xAt(g) - barW / 2;
            ctx.fillStyle = LIGHT;
            ctx.fillRect(x, yAt(1), barW, gh);
            ctx.fillStyle = DARK;
            ctx.fillRect(x, yAt(share), barW, share * gh);
        });
        outlineText(ctx, 'dark share', gx0 + 4, gTop + 12, '11px monospace', DARK, 'left', 90);
        outlineText(ctx, `generation 0 to ${GENERATIONS}`, (gx0 + gx1) / 2, gBottom + 16, '11px monospace', '#475569', 'center', gx1 - gx0);

        outlineText(ctx, `survivors: dark 20 x ${(darkRate / 100).toFixed(2)} = ${(20 * darkRate / 100).toFixed(1)}, light 80 x ${(lightRate / 100).toFixed(2)} = ${(80 * lightRate / 100).toFixed(1)}`,
            safeRight / 2, stageBottom - 36, 'bold 12px monospace', '#334155', 'center', safeRight - 30);
        outlineText(ctx, `dark share: 20% → ${(first * 100).toFixed(1)}% after one generation → ${(last * 100).toFixed(1)}% after ${GENERATIONS}`,
            safeRight / 2, stageBottom - 16, 'bold 12px monospace', DARK, 'center', safeRight - 30);

        fitText(ctx, `Dark moths: 20% at the start, ${(last * 100).toFixed(1)}% after ${GENERATIONS} generations`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Out of the survivors, every generation', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, last)),
                caption: 'Dark Share at the End',
                low: '0%',
                high: '100%',
                stops: ['#f5f5f4', '#a8a29e', '#1f2937'] as [string, string, string],
            },
            note: `With light moth survival ${lightRate}% and dark moth survival ${darkRate}%, the dark share goes from 20% to ${(last * 100).toFixed(1)}% in ${GENERATIONS} generations.`,
        };
    };

    return (
        <LabCanvas
            title="How Fast Can a Trait Spread?"
            readout={({ raw }) => `${rateOf(raw)}% of light moths survive each generation`}
            controlLabel="Light Moth Survival"
            controlKey="lightSurvival"
            controlMin={10}
            controlMax={90}
            controlInitial={90}
            controlDisplay={raw => `${rateOf(raw)}%`}
            control2={{
                label: 'Dark Moth Survival',
                key: 'darkSurvival',
                min: 10,
                max: 90,
                initial: 40,
                display: raw => `${rateOf(raw)}%`,
            }}
            accent="rose"
            sky={['#f8fafc', '#f5f5f4']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Fast Can a Trait Spread?"
            completeNote="Out of the survivors!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
