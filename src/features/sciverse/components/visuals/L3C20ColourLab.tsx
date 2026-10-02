import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const NOTICE = 0.25;       // dioptres of spread people start to notice
const MAX_SPREAD = 0.45;   // 10 D at Abbe 25 gives 0.40
const BLUE = '#1d4ed8';
const RED = '#b91c1c';
const OK = '#047857';

const powerOf = (dial: number): number => Math.max(1, Math.min(10, Math.round(dial / 2) / 2));
const abbeOf = (dial: number): number => Math.max(25, Math.min(60, Math.round(dial)));

export const L3C20ColourLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const power = powerOf(raw);
        const abbe = abbeOf(raw2);
        const spread = power / abbe;
        const visible = spread >= NOTICE;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const axisY = top + capBand + boxH * 0.5;
        const boxBottom = top + capBand + boxH;

        const plotW = Math.max(150, Math.min(safeRight - 80, safeRight * 0.76));
        const left = safeRight / 2 - plotW / 2;
        const lensX = left + plotW * 0.24;
        const spanX = plotW * 0.62;

        // Blue focuses closer than red. The gap drawn is the spread as a share of
        // the meter's range, so the two dots separate as the dials get worse.
        const gap = Math.max(4, Math.min(spanX * 0.5, (spread / MAX_SPREAD) * spanX * 0.5));
        const midX = lensX + spanX * 0.6;
        const blueX = midX - gap / 2;
        const redX = midX + gap / 2;
        const halfH = Math.max(12, Math.min(boxH * 0.34, boxH * 0.34));

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, axisY);
        ctx.lineTo(left + plotW, axisY);
        ctx.stroke();

        // the lens
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lensX, axisY - halfH);
        ctx.quadraticCurveTo(lensX + 8, axisY, lensX, axisY + halfH);
        ctx.quadraticCurveTo(lensX - 8, axisY, lensX, axisY - halfH);
        ctx.stroke();

        // blue bends more, so it meets the axis sooner
        for (const [x, colour] of [[blueX, BLUE], [redX, RED]] as Array<[number, string]>) {
            ctx.strokeStyle = colour;
            ctx.lineWidth = 2;
            for (const sign of [-1, 1]) {
                ctx.beginPath();
                ctx.moveTo(left, axisY + sign * (halfH - 3));
                ctx.lineTo(lensX, axisY + sign * (halfH - 3));
                ctx.lineTo(x, axisY);
                ctx.stroke();
            }
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.arc(x, axisY, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        const recipe = abbe >= 50 ? 'silica: electrons held tightly'
            : abbe >= 38 ? 'some titanium and barium oxide'
            : abbe >= 30 ? 'lanthanum oxide, or sulfur in a plastic'
            : 'lead oxide: 82 electrons an atom';
        outlineText(ctx, 'blue bends more than red, so they focus apart',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'blue', blueX, Math.max(axisY - halfH - 10, artTop + 26),
            'bold 10px monospace', BLUE, 'right', Math.max(40, plotW / 2));
        outlineText(ctx, 'red', redX, Math.max(axisY - halfH - 10, artTop + 26),
            'bold 10px monospace', RED, 'left', Math.max(40, plotW / 2));
        outlineText(ctx, 'spread ' + spread.toFixed(3) + ' D between red and blue',
            safeRight / 2, Math.min(boxBottom + 14, artBottom - 12),
            'bold 12px monospace', visible ? RED : OK, 'center', safeRight - 30);
        outlineText(ctx, recipe, safeRight / 2,
            Math.min(boxBottom + labelTail - 4, artBottom - 2),
            'bold 10px monospace', '#334155', 'center', safeRight - 30);
        outlineText(ctx, visible
            ? 'at or over the ' + NOTICE + ' D people notice'
            : 'under the ' + NOTICE + ' D people notice',
            safeRight / 2, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', visible ? RED : OK, 'center', safeRight - 30);

        outlineText(ctx, 'lens power ' + power.toFixed(1) + ' D / Abbe number ' + abbe
            + ' = ' + spread.toFixed(3) + ' D of spread',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'a bigger Abbe number means better behaved colours',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'spread ' + spread.toFixed(3) + ' D', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Thin, strong, colour-free: pick two',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, spread / MAX_SPREAD)),
                caption: 'Colour Spread vs Noticing',
                low: 'no fringes',
                high: 'fringes you can see',
                stops: ['#ecfdf5', '#fcd34d', RED] as [string, string, string],
            },
            note: 'A ' + power.toFixed(1) + ' D lens of Abbe number ' + abbe
                + ' splits blue from red by ' + spread.toFixed(3) + ' dioptres. '
                + (visible
                    ? 'That is over the ' + NOTICE + ' D at which fringes show, worst at the edge.'
                    : 'That is under the ' + NOTICE + ' D at which fringes show.'),
        };
    };

    return (
        <LabCanvas
            title="The Price of Thin"
            readout={({ raw }) => 'A lens of ' + powerOf(raw).toFixed(1) + ' D'}
            controlLabel="Lens Power"
            controlKey="colourPower"
            controlMin={2}
            controlMax={20}
            controlInitial={8}
            controlDisplay={raw => powerOf(raw).toFixed(1) + ' D'}
            control2={{
                label: 'How Little It Spreads Colours',
                key: 'abbeNumber',
                min: 25,
                max: 60,
                initial: 32,
                display: raw => 'Abbe ' + abbeOf(raw),
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="Thin, strong, colour-free: pick two!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
