import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Crown glass is the reference: everything is compared with it.
const REF_N = 1.517;
const REF_RHO = 2.51;
// The heaviest the dials can reach: n = 1.48 at 5.0 g/cm3 gives 2.15, so the meter
// and the bars are scaled to 2.2 and nothing clips at the extremes.
const MAX_WEIGHT = 2.2;
const LIGHTER = '#047857';
const HEAVIER = '#b45309';

const indexOf = (dial: number): number => Math.max(148, Math.min(190, Math.round(dial))) / 100;
const densityOf = (dial: number): number => Math.max(10, Math.min(50, Math.round(dial / 5) * 5)) / 10;

export const L2C20ThicknessLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const n = indexOf(raw);
        const rho = densityOf(raw2);
        const thickRatio = (REF_N - 1) / (n - 1);
        const densRatio = rho / REF_RHO;
        const weight = thickRatio * densRatio;
        const lighter = weight < 1;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const baseY = top + capBand + boxH;

        // Two bars: how much material there is, and what it weighs. Drawn against
        // the crown-glass reference at 1.0, so both sides of the trade are visible.
        const barW = Math.max(26, Math.min(58, safeRight * 0.13));
        const gap = Math.max(30, Math.min(80, safeRight * 0.16));
        const cx = safeRight / 2;
        const leftBar = cx - gap / 2 - barW;
        const rightBar = cx + gap / 2;
        const scale = boxH / MAX_WEIGHT;

        // the crown-glass reference line at 1.0
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(leftBar - 12, baseY - scale);
        ctx.lineTo(rightBar + barW + 12, baseY - scale);
        ctx.stroke();
        ctx.setLineDash([]);

        const drawBar = (x: number, value: number, colour: string) => {
            const h = Math.max(2, Math.min(boxH, value * scale));
            ctx.fillStyle = colour;
            ctx.fillRect(x, baseY - h, barW, h);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, baseY - h, barW, h);
        };
        drawBar(leftBar, thickRatio, '#a5b4fc');
        drawBar(rightBar, weight, lighter ? '#a7f3d0' : '#fed7aa');

        outlineText(ctx, 'how much material, and what it weighs',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'crown glass', rightBar + barW + 16, Math.max(baseY - scale + 4, artTop + 26),
            'bold 10px monospace', '#334155', 'left',
            Math.max(46, safeRight - rightBar - barW - 20));
        outlineText(ctx, 'thickness ' + thickRatio.toFixed(2),
            leftBar + barW / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 11px monospace', '#4338ca', 'center', Math.max(60, barW + gap / 2));
        outlineText(ctx, 'weight ' + weight.toFixed(2),
            rightBar + barW / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 11px monospace', lighter ? LIGHTER : HEAVIER, 'center',
            Math.max(60, barW + gap / 2));
        outlineText(ctx, 'n = ' + n.toFixed(3) + ', density ' + rho.toFixed(1) + ' g/cm³',
            cx, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'thickness ' + thickRatio.toFixed(2) + ' x density '
            + densRatio.toFixed(2) + ' = weight ' + weight.toFixed(2) + ' of crown glass',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, lighter
            ? (100 * (1 - thickRatio)).toFixed(0) + '% thinner and '
              + (100 * (1 - weight)).toFixed(0) + '% lighter'
            : (100 * (1 - thickRatio)).toFixed(0) + '% thinner and '
              + (100 * (weight - 1)).toFixed(0) + '% HEAVIER',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', lighter ? LIGHTER : HEAVIER,
            'center', safeRight - 30);

        fitText(ctx, 'weight ' + weight.toFixed(2) + ' of a crown glass lens',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Electrons come with nuclei attached',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, weight / MAX_WEIGHT)),
                caption: 'Lens Weight Against Crown Glass',
                low: '0',
                high: MAX_WEIGHT.toFixed(1) + ' x crown glass',
                stops: ['#ecfdf5', '#fcd34d', HEAVIER] as [string, string, string],
            },
            note: 'A material with n = ' + n.toFixed(3)
                + ' needs less of itself for the same bending power, so the lens is '
                + thickRatio.toFixed(2) + ' as thick as one in crown glass. But at '
                + rho.toFixed(1) + ' g/cm³ against crown glass’s ' + REF_RHO
                + ', each cubic centimetre weighs ' + densRatio.toFixed(2)
                + ' times as much. Multiply the two and the lens weighs '
                + weight.toFixed(2) + ' of the original -- '
                + (lighter
                    ? (100 * (1 - weight)).toFixed(0) + '% lighter.'
                    : (100 * (weight - 1)).toFixed(0)
                      + '% HEAVIER, despite having less material in it.')
                + ' Index comes from electrons being pushed about by the light, and electrons '
                + 'arrive attached to nuclei, so packing in heavy atoms like lead or lanthanum '
                + 'buys index by the gram. Sulfur-rich plastics reach a high index without the '
                + 'mass, because their electrons are loosely held -- index per electron rather '
                + 'than index per gram.',
        };
    };

    return (
        <LabCanvas
            title="Thinner, But Heavier?"
            readout={({ raw }) => 'A material with n = ' + indexOf(raw).toFixed(3)}
            controlLabel="Refractive Index"
            controlKey="materialIndex"
            controlMin={148}
            controlMax={190}
            controlInitial={185}
            controlDisplay={raw => 'n = ' + indexOf(raw).toFixed(3)}
            control2={{
                label: 'Density',
                key: 'materialDensity',
                min: 10,
                max: 50,
                initial: 44,
                display: raw => densityOf(raw).toFixed(1) + ' g/cm³',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="Electrons come with nuclei attached!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
