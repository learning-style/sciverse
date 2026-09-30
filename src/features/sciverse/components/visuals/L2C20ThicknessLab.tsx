import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const ORDINARY = 1.52;     // ordinary spectacle glass
const RADIUS_M = 0.025;    // a lens 50 mm across
const MAX_THINNER = 40;    // percent at the top of the meter: n = 1.80 gives 35
const PLAIN = '#64748b';
const BETTER = '#047857';

// The dial starts at ordinary glass, so the comparison is never negative: at the
// left-hand end the two lenses are identical and the saving is zero.
const indexOf = (dial: number): number => Math.max(152, Math.min(180, Math.round(dial))) / 100;
const powerOf = (dial: number): number => Math.max(1, Math.min(10, Math.round(dial / 2) / 2));

/** Thickness of the bulge in mm, for a lens of this power in this material. */
const thicknessMm = (power: number, n: number): number =>
    ((RADIUS_M * RADIUS_M * power) / 2 / (n - 1)) * 1000;

export const L2C20ThicknessLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const n = indexOf(raw);
        const power = powerOf(raw2);
        const plainMm = thicknessMm(power, ORDINARY);
        const betterMm = thicknessMm(power, n);
        const relative = (ORDINARY - 1) / (n - 1);
        const thinner = (1 - relative) * 100;
        const savedMm = plainMm - betterMm;
        const worthIt = savedMm >= 1;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const midY = top + capBand + boxH / 2;
        const boxBottom = top + capBand + boxH;

        // two lens cross-sections side by side, drawn to the same scale so the
        // thickness difference is the thing you see
        const lensH = Math.max(26, Math.min(boxH * 0.7, boxH * 0.7));
        const scale = Math.min(6.5, (safeRight * 0.13) / Math.max(1.2, plainMm));
        const gap = Math.max(52, Math.min(130, safeRight * 0.26));
        const cx = safeRight / 2;
        const leftX = cx - gap / 2;
        const rightX = cx + gap / 2;

        const drawLens = (x: number, halfThick: number, colour: string) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, midY - lensH / 2);
            ctx.quadraticCurveTo(x + halfThick, midY, x, midY + lensH / 2);
            ctx.quadraticCurveTo(x - halfThick, midY, x, midY - lensH / 2);
            ctx.stroke();
        };
        drawLens(leftX, Math.max(2, (plainMm * scale) / 2), PLAIN);
        drawLens(rightX, Math.max(2, (betterMm * scale) / 2), BETTER);

        outlineText(ctx, 'the same prescription in two materials, to scale',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'ordinary glass n 1.52', leftX,
            Math.max(midY - lensH / 2 - 10, artTop + 26),
            'bold 10px monospace', PLAIN, 'center', Math.max(60, gap));
        outlineText(ctx, 'this glass n ' + n.toFixed(2), rightX,
            Math.max(midY - lensH / 2 - 10, artTop + 26),
            'bold 10px monospace', BETTER, 'center', Math.max(60, gap));
        outlineText(ctx, plainMm.toFixed(1) + ' mm thick', leftX,
            Math.min(midY + lensH / 2 + 14, artBottom - 12),
            'bold 11px monospace', PLAIN, 'center', Math.max(60, gap));
        outlineText(ctx, betterMm.toFixed(1) + ' mm thick', rightX,
            Math.min(midY + lensH / 2 + 14, artBottom - 12),
            'bold 11px monospace', BETTER, 'center', Math.max(60, gap));
        outlineText(ctx, 'a ' + power.toFixed(1) + ' D lens, 50 mm across',
            cx, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'ordinary 0.52 divided by this glass ' + (n - 1).toFixed(2)
            + ' = ' + relative.toFixed(2) + ' as thick, so ' + thinner.toFixed(0) + '% thinner',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'which saves ' + savedMm.toFixed(1) + ' mm here, '
            + (worthIt ? 'enough to notice' : 'too little to notice'),
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', worthIt ? BETTER : PLAIN,
            'center', safeRight - 30);

        fitText(ctx, thinner.toFixed(0) + '% thinner, saving ' + savedMm.toFixed(1) + ' mm',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A percentage tells you nothing about a size',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, thinner / MAX_THINNER)),
                caption: 'How Much Thinner Than Ordinary Glass',
                low: '0%',
                high: MAX_THINNER + '%',
                stops: ['#ecfdf5', '#6ee7b7', BETTER] as [string, string, string],
            },
            note: 'What bends light is how far the index sits above 1, so compare '
                + (ORDINARY - 1).toFixed(2) + ' for ordinary glass with ' + (n - 1).toFixed(2)
                + ' for this one. Dividing gives ' + relative.toFixed(2)
                + ' as thick -- ' + thinner.toFixed(0)
                + '% thinner -- and because it is a ratio, that percentage holds for every '
                + 'prescription. What changes is the millimetres: this ' + power.toFixed(1)
                + ' D lens goes from ' + plainMm.toFixed(1) + ' mm to ' + betterMm.toFixed(1)
                + ' mm, a saving of ' + savedMm.toFixed(1) + ' mm. '
                + (worthIt
                    ? 'That is enough to change how the spectacles look, so it is worth paying for.'
                    : 'That is too little for anyone to notice, so it is not worth paying for.')
                + ' Which is why a shop quoting only the percentage is not telling you enough to '
                + 'decide: the percentage belongs to the glass, and the millimetres belong to your eyes.',
        };
    };

    return (
        <LabCanvas
            title="Why Strong Glasses Need Special Glass"
            readout={({ raw }) => 'Glass with an index of ' + indexOf(raw).toFixed(2)}
            controlLabel="Refractive Index"
            controlKey="glassIndex"
            controlMin={152}
            controlMax={180}
            controlInitial={174}
            controlDisplay={raw => 'n = ' + indexOf(raw).toFixed(2)}
            control2={{
                label: 'Lens Power',
                key: 'lensPower',
                min: 2,
                max: 20,
                initial: 16,
                display: raw => powerOf(raw).toFixed(1) + ' D',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="Subtract 1 first -- that is where the bending lives!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
