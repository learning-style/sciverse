import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MAX_SURPLUS = 250;   // kg/ha at the top of the meter
const CROP = '#047857';
const LOST = '#b45309';

const demandOf = (dial: number): number => Math.max(60, Math.min(180, Math.round(dial / 10) * 10));
const catchOf = (dial: number): number => Math.max(30, Math.min(95, Math.round(dial / 5) * 5));

export const L2C19FertiliserLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const demand = demandOf(raw);
        const share = catchOf(raw2);
        const applied = demand / (share / 100);
        const surplus = applied - demand;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const barH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + barH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + capBand;
        const baseY = barTop + barH;

        // One bar for the whole bag, split into the part the crop catches and the
        // part left loose in the soil. The bar's height is the bag, so a worse
        // catch makes the whole thing taller as well as more orange.
        const barW = Math.max(40, Math.min(96, safeRight * 0.2));
        const cx = safeRight / 2;
        const left = cx - barW / 2;
        const bagFrac = Math.max(0.1, Math.min(1, applied / 400));
        const bagTop = baseY - bagFrac * barH;
        const cropH = (demand / applied) * (baseY - bagTop);

        ctx.fillStyle = '#fde68a';
        ctx.fillRect(left, bagTop, barW, baseY - bagTop);
        ctx.fillStyle = '#a7f3d0';
        ctx.fillRect(left, baseY - cropH, barW, cropH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, bagTop, barW, baseY - bagTop);
        ctx.beginPath();
        ctx.moveTo(left, baseY - cropH);
        ctx.lineTo(left + barW, baseY - cropH);
        ctx.stroke();

        outlineText(ctx, 'one bag of fertiliser, and where it ends up',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'surplus ' + surplus.toFixed(0) + ' kg/ha',
            left + barW + 10, Math.max(bagTop + 12, artTop + 26),
            'bold 11px monospace', LOST, 'left', Math.max(60, safeRight - left - barW - 16));
        outlineText(ctx, 'the crop takes ' + demand + ' kg/ha',
            left - 10, Math.max(baseY - cropH / 2, artTop + 40),
            'bold 11px monospace', CROP, 'right', Math.max(60, left - 14));
        outlineText(ctx, 'apply ' + applied.toFixed(0) + ' kg/ha',
            cx, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'plants catch ' + share + '% of what is spread',
            cx, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', CROP, 'center', safeRight - 30);

        outlineText(ctx, demand + ' kg/ha / ' + share + '% caught = apply '
            + applied.toFixed(0) + ' kg/ha',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'surplus ' + surplus.toFixed(0)
            + ' kg/ha left loose in the soil, heading for the river',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', LOST, 'center', safeRight - 30);

        fitText(ctx, 'surplus ' + surplus.toFixed(0) + ' kg/ha', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A poor catch costs twice: a bigger bag, and more left behind',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, surplus / MAX_SURPLUS)),
                caption: 'Surplus Heading for the River',
                low: '0 kg/ha',
                high: MAX_SURPLUS + ' kg/ha',
                stops: ['#ecfdf5', '#fcd34d', LOST] as [string, string, string],
            },
            note: 'A crop that takes away ' + demand
                + ' kg/ha of nitrogen, on a field where the plants catch only ' + share
                + '% of what is spread, needs ' + applied.toFixed(0)
                + ' kg/ha applied -- and that leaves ' + surplus.toFixed(0)
                + ' kg/ha loose in the soil. The surplus is not carelessness, it is arithmetic: '
                + 'if the plants catch less than everything, you must spread more than they need. '
                + 'Improving the catch pays twice over, because a better catch means a smaller bag '
                + 'and a smaller share of that bag left behind. Cutting the amount instead shares '
                + 'the loss between the harvest and the river.',
        };
    };

    return (
        <LabCanvas
            title="How Much Fertiliser Is Wasted?"
            readout={({ raw }) => 'A crop taking ' + demandOf(raw) + ' kg/ha'}
            controlLabel="Crop Demand"
            controlKey="cropDemand"
            controlMin={60}
            controlMax={180}
            controlInitial={120}
            controlDisplay={raw => demandOf(raw) + ' kg/ha'}
            control2={{
                label: 'Share the Plants Catch',
                key: 'shareCaught',
                min: 30,
                max: 95,
                initial: 50,
                display: raw => catchOf(raw) + '%',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Does Soil Support Life?"
            completeNote="The catch decides everything!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
