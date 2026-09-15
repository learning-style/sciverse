import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const TOWN = 1000;
const UNVACCINATED_RISK = 0.2;
const COLS = 50;
const ROWS = 20;
const VACCINATED = '#93c5fd';
const UNVACCINATED = '#cbd5e1';
const ILL = '#e11d48';

const percentOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial / 5) * 5));

export const L2B11TownLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const share = percentOf(raw);
        const effective = percentOf(raw2);
        const vaccinated = Math.round((TOWN * share) / 100);
        const unvaccinated = TOWN - vaccinated;
        const vaccinatedRisk = UNVACCINATED_RISK * (1 - effective / 100);
        const illUnvaccinated = Math.round(unvaccinated * UNVACCINATED_RISK);
        const illVaccinated = Math.round(vaccinated * vaccinatedRisk);
        const ill = illUnvaccinated + illVaccinated;
        const illShare = ill > 0 ? (illVaccinated / ill) * 100 : 0;

        // The town: one dot per person, vaccinated first; the ill spread evenly through each group
        const gx = 30;
        const cell = Math.max(4, Math.min((safeRight * 0.5 - gx) / COLS, (stageBottom - stageTop - 76) / ROWS));
        const gy = stageTop + 12;
        const illAt = new Set<number>();
        for (let j = 0; j < illVaccinated; j++) illAt.add(Math.floor(((j + 0.5) * vaccinated) / illVaccinated));
        for (let j = 0; j < illUnvaccinated; j++) illAt.add(vaccinated + Math.floor(((j + 0.5) * unvaccinated) / illUnvaccinated));
        for (let i = 0; i < TOWN; i++) {
            const x = gx + (i % COLS) * cell + cell / 2;
            const y = gy + Math.floor(i / COLS) * cell + cell / 2;
            ctx.fillStyle = illAt.has(i) ? ILL : i < vaccinated ? VACCINATED : UNVACCINATED;
            ctx.beginPath();
            ctx.arc(x, y, cell * 0.36, 0, Math.PI * 2);
            ctx.fill();
        }

        const px = safeRight * 0.56;
        const pw = safeRight - 16 - px;
        const swatch = (fill: string, y: number) => {
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(px + 5, y - 4, 5, 0, Math.PI * 2);
            ctx.fill();
        };
        swatch(UNVACCINATED, stageTop + 18);
        outlineText(ctx, `unvaccinated ${unvaccinated}: 20% ill = ${illUnvaccinated}`, px + 16, stageTop + 18, '12px monospace', '#334155', 'left', pw - 16);
        swatch(VACCINATED, stageTop + 42);
        outlineText(ctx, `vaccinated ${vaccinated}: ${(vaccinatedRisk * 100).toFixed(1)}% ill = ${illVaccinated}`, px + 16, stageTop + 42, '12px monospace', '#334155', 'left', pw - 16);
        swatch(ILL, stageTop + 66);
        outlineText(ctx, `ill people ${ill}`, px + 16, stageTop + 66, 'bold 13px monospace', ILL, 'left', pw - 16);
        outlineText(ctx, `share of ill who were vaccinated ${illShare.toFixed(0)}%`, px, stageTop + 92, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, 'without the vaccine: 200 ill', px, stageTop + 114, '12px monospace', '#475569', 'left', pw);

        outlineText(ctx, `risk if vaccinated = 20% x (1 − ${effective}%) = ${(vaccinatedRisk * 100).toFixed(1)}%`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${illVaccinated} of ${ill} ill people were vaccinated`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${ill} of 1,000 people fall ill`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Compare risks, not counts', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, ill / (TOWN * UNVACCINATED_RISK))),
                caption: 'People Ill',
                low: '0',
                high: '200',
                stops: ['#fff1f2', '#fb7185', '#9f1239'] as [string, string, string],
            },
            note: `With ${share}% vaccinated and a ${effective}% effective vaccine, ${ill} people fall ill, and ${illVaccinated} of them were vaccinated.`,
        };
    };

    return (
        <LabCanvas
            title="How Well Does a Vaccine Work?"
            readout={({ raw }) => `A town of 1,000 people, ${percentOf(raw)}% vaccinated`}
            controlLabel="Vaccinated Share"
            controlKey="vaccinatedShare"
            controlMin={0}
            controlMax={100}
            controlInitial={90}
            controlDisplay={raw => `${percentOf(raw)}%`}
            control2={{
                label: 'Effectiveness',
                key: 'effectiveness',
                min: 0,
                max: 100,
                initial: 90,
                display: raw => `${percentOf(raw)}%`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Well Does a Vaccine Work?"
            completeNote="Compare risks, not counts!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
