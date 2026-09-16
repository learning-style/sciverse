import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const WATER_AT_FULL = 6;
const SUGAR_CEILING = 17.5;
const HALF_POINT = 0.25;
const WATER = '#0284c7';
const SUGAR = '#15803d';

const openingOf = (dial: number): number => Math.max(0.05, Math.min(1, Math.round(dial * 20) / 20));
const availableOf = (dial: number): number => Math.max(0.5, Math.min(8, Math.round(dial * 2) / 2));

const waterAt = (g: number): number => WATER_AT_FULL * g;
const sugarAt = (g: number): number => (SUGAR_CEILING * g) / (g + HALF_POINT);

export const L3B13StomataLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const opening = openingOf(raw);
        const available = availableOf(raw2);
        const water = waterAt(opening);
        const sugar = sugarAt(opening);
        const perLitre = sugar / water;
        const dayShare = Math.min(1, available / water);
        const sugarToday = sugar * dayShare;

        // Both curves against the opening: water a straight line, sugar bending over
        const gx0 = 46;
        const gx1 = safeRight - 24;
        const gTop = stageTop + 20;
        const gBottom = stageBottom - 76;
        const gh = gBottom - gTop;
        const xAt = (g: number): number => gx0 + g * (gx1 - gx0);
        const yWater = (litres: number): number => gBottom - (litres / WATER_AT_FULL) * gh;
        const ySugar = (grams: number): number => gBottom - (grams / SUGAR_CEILING) * gh;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx0, gTop);
        ctx.lineTo(gx0, gBottom);
        ctx.lineTo(gx1, gBottom);
        ctx.stroke();
        ctx.strokeStyle = WATER;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(xAt(0), yWater(0));
        ctx.lineTo(xAt(1), yWater(WATER_AT_FULL));
        ctx.stroke();
        ctx.strokeStyle = SUGAR;
        ctx.beginPath();
        for (let i = 0; i <= 50; i++) {
            const g = i / 50;
            if (i === 0) ctx.moveTo(xAt(g), ySugar(sugarAt(g)));
            else ctx.lineTo(xAt(g), ySugar(sugarAt(g)));
        }
        ctx.stroke();
        ctx.fillStyle = WATER;
        ctx.beginPath();
        ctx.arc(xAt(opening), yWater(water), 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = SUGAR;
        ctx.beginPath();
        ctx.arc(xAt(opening), ySugar(sugar), 5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'water, litres', gx0 + 6, gTop + 12, '11px monospace', WATER, 'left', 120);
        outlineText(ctx, 'sugar, g', gx0 + 6, gTop + 28, '11px monospace', SUGAR, 'left', 120);
        outlineText(ctx, 'opening g, 0 to 1', (gx0 + gx1) / 2, gBottom + 16, '11px monospace', '#475569', 'center', gx1 - gx0);

        outlineText(ctx, `W = 6 x ${opening.toFixed(2)} = ${water.toFixed(1)} litres, A = 17.5 x ${opening.toFixed(2)} / ${(opening + HALF_POINT).toFixed(2)} = ${sugar.toFixed(1)} g`,
            safeRight / 2, stageBottom - 36, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, dayShare < 1
            ? `water lasts ${(dayShare * 100).toFixed(0)}% of the day: ${sugarToday.toFixed(1)} g of sugar`
            : `water lasts all day: ${sugar.toFixed(1)} g of sugar, at ${perLitre.toFixed(1)} g for each litre`,
            safeRight / 2, stageBottom - 16, 'bold 12px monospace', dayShare < 1 ? WATER : SUGAR, 'center', safeRight - 30);

        fitText(ctx, `${sugar.toFixed(1)} g of sugar for ${water.toFixed(1)} litres`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The last sliver is the dearest', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, perLitre / 6)),
                caption: 'Sugar for Each Litre',
                low: '0 g',
                high: '6 g',
                stops: ['#e0f2fe', '#86efac', '#15803d'] as [string, string, string],
            },
            note: `At an opening of ${opening.toFixed(2)}, the leaf loses ${water.toFixed(1)} litres and makes ${sugar.toFixed(1)} g of sugar: ${perLitre.toFixed(1)} g for each litre. With ${available} litres available it ends the day with ${sugarToday.toFixed(1)} g.`,
        };
    };

    return (
        <LabCanvas
            title="Why Stomata Sit Half Open"
            readout={({ raw }) => `Stomata ${(openingOf(raw) * 100).toFixed(0)}% open`}
            controlLabel="Stomatal Opening"
            controlKey="stomatalOpening"
            controlMin={0.05}
            controlMax={1}
            controlInitial={0.5}
            controlDisplay={raw => `g = ${openingOf(raw).toFixed(2)}`}
            control2={{
                label: 'Water Available',
                key: 'waterAvailable',
                min: 0.5,
                max: 8,
                initial: 6,
                display: raw => `${availableOf(raw)} litres`,
            }}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Stomata Sit Half Open"
            completeNote="Straight line against a bending curve!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
