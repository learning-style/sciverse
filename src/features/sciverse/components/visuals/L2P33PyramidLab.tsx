import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The five trophic levels, bottom first. */
const LEVELS: { name: string; who: string }[] = [
    { name: 'Producers', who: 'grass' },
    { name: 'Primary consumers', who: 'grasshoppers' },
    { name: 'Secondary consumers', who: 'small birds' },
    { name: 'Tertiary consumers', who: 'hawks' },
    { name: 'Top predators', who: 'eagles' },
];

/** Energy one hawk-sized predator needs for a year, in kilojoules. */
const HAWK_NEEDS = 150000;
/** A tennis court is 261 square metres -- a size a learner can picture. */
const TENNIS_COURT = 261;

/** Round the way a scientist would: keep three useful figures, no more. */
const show = (kj: number): string => {
    if (kj >= 1000) return Math.round(kj).toLocaleString();
    if (kj >= 10) return kj.toFixed(0);
    if (kj >= 1) return kj.toFixed(1);
    return kj.toFixed(2);
};

export const L2P33PyramidLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const producerEnergy = Math.round(raw);
        const efficiency = Math.max(1, Math.round(raw2)) / 100;

        // E(n) = E(0) x efficiency^n
        const energy = LEVELS.map((_, i) => producerEnergy * Math.pow(efficiency, i));

        const top = stageTop + 30;
        const bottom = stageBottom - 54;
        const bandH = Math.max(20, (bottom - top) / LEVELS.length - 6);
        const maxW = safeRight - 150;

        LEVELS.forEach((lv, i) => {
            // Drawn as a even-stepped pyramid. A width truly proportional to the
            // energy would make the top two levels invisible, so the shape is
            // schematic and the printed numbers carry the real values.
            const w = maxW * Math.pow(0.74, i);
            const y = bottom - (i + 1) * (bandH + 6);
            const x = safeRight / 2 - w / 2;
            const shade = ['#166534', '#4d7c0f', '#ca8a04', '#c2410c', '#991b1b'][i];
            ctx.fillStyle = shade;
            ctx.fillRect(x, y, w, bandH);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x, y, w, bandH);

            outlineText(ctx, `${lv.name} (${lv.who})`, safeRight / 2, y + bandH / 2 - 1,
                'bold 12px monospace', '#ffffff', 'center', w - 8);
            outlineText(ctx, `${show(energy[i])} kJ`, safeRight / 2, y + bandH / 2 + 12,
                'bold 12px monospace', '#ffffff', 'center', w - 8);
        });

        outlineText(ctx, 'bar widths are drawn to fit -- the numbers are the real ones',
            safeRight / 2, stageBottom - 16, 'bold 11px monospace');

        // How much meadow it takes to feed one hawk for a year
        const perSquareMetre = energy[3];
        const area = perSquareMetre > 0 ? HAWK_NEEDS / perSquareMetre : Infinity;
        const courts = area / TENNIS_COURT;

        fitText(ctx, `${producerEnergy.toLocaleString()} kJ x ${Math.round(efficiency * 100)}% four times = ${show(energy[4])} kJ`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Each level keeps only the efficiency share of the one below it',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = `One hawk needs ${Math.round(area).toLocaleString()} square metres of this meadow -- about ${courts < 10 ? courts.toFixed(1) : Math.round(courts).toLocaleString()} tennis courts`;
        return {
            meter: {
                fraction: Math.min(1, Math.pow(efficiency / 0.2, 0.5)),
                caption: 'How Far the Energy Reaches',
                low: 'Almost none reaches',
                high: 'Reaches the top',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Energy Pyramid, In Numbers"
            readout={({ raw }) => `The grass captures ${Math.round(raw).toLocaleString()} kJ per square metre each year`}
            controlLabel="Producer Energy"
            controlKey="producerEnergy"
            controlMin={2000}
            controlMax={40000}
            controlInitial={20000}
            controlDisplay={raw => `${Math.round(raw).toLocaleString()} kJ/m² per year`}
            control2={{
                label: 'Transfer Efficiency',
                key: 'transferEfficiency',
                min: 2,
                max: 20,
                initial: 10,
                display: raw => `${Math.round(raw)}% per level`,
            }}
            accent="indigo"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Energy Pyramid, In Numbers"
            completeNote="Efficiency beats abundance -- every single time!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
