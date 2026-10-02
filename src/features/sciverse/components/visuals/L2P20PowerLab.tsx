import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MIN_D = -3;          // the weakest combination the dials can reach
const MAX_D = 30;          // f = 5 cm gives 20 D, plus a 10 D second lens
const CONVERGE = '#4338ca';
const SPREAD = '#b45309';

const focalOf = (dial: number): number => Math.max(5, Math.min(200, Math.round(dial / 5) * 5));
const secondOf = (dial: number): number => Math.max(-3, Math.min(10, Math.round(dial / 2) / 2));

export const L2P20PowerLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const focalCm = focalOf(raw);
        const firstD = 100 / focalCm;
        const secondD = secondOf(raw2);
        const totalD = firstD + secondD;
        const converges = totalD > 0;
        const combinedCm = converges ? 100 / totalD : 0;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const axisY = top + capBand + boxH / 2;
        const boxBottom = top + capBand + boxH;

        const plotW = Math.max(150, Math.min(safeRight - 80, safeRight * 0.76));
        const left = safeRight / 2 - plotW / 2;
        const lensX = left + plotW * 0.3;

        // the optical axis
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, axisY);
        ctx.lineTo(left + plotW, axisY);
        ctx.stroke();

        // the lens: fatter in the middle when the pair is stronger
        const lensH = Math.max(24, Math.min(boxH * 0.72, boxH * 0.72));
        const bulge = Math.max(3, Math.min(14, Math.abs(totalD) * 1.1 + 3));
        ctx.strokeStyle = converges ? CONVERGE : SPREAD;
        ctx.lineWidth = 3;
        ctx.beginPath();
        if (converges) {
            ctx.moveTo(lensX, axisY - lensH / 2);
            ctx.quadraticCurveTo(lensX + bulge, axisY, lensX, axisY + lensH / 2);
            ctx.quadraticCurveTo(lensX - bulge, axisY, lensX, axisY - lensH / 2);
        } else {
            ctx.moveTo(lensX - bulge, axisY - lensH / 2);
            ctx.quadraticCurveTo(lensX + bulge * 0.3, axisY, lensX - bulge, axisY + lensH / 2);
            ctx.lineTo(lensX + bulge, axisY + lensH / 2);
            ctx.quadraticCurveTo(lensX - bulge * 0.3, axisY, lensX + bulge, axisY - lensH / 2);
            ctx.closePath();
        }
        ctx.stroke();

        // parallel light arriving, then bending by the combined power
        const rays = 3;
        const reach = plotW - (lensX - left);
        // the focal point is drawn nearer the lens when the pair is stronger, with
        // 20 D pinned close and 0.5 D running off the right-hand edge
        const focusX = converges
            ? lensX + Math.max(18, Math.min(reach - 14, (reach - 14) * (2.5 / Math.max(2.5, totalD))))
            : lensX + reach;
        for (let i = 0; i < rays; i++) {
            const offset = ((i - (rays - 1) / 2) / ((rays - 1) / 2)) * (lensH / 2 - 4);
            ctx.strokeStyle = converges ? CONVERGE : SPREAD;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(left, axisY + offset);
            ctx.lineTo(lensX, axisY + offset);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(lensX, axisY + offset);
            if (converges) {
                ctx.lineTo(focusX, axisY);
            } else {
                ctx.lineTo(lensX + reach, axisY + offset * 2.1);
            }
            ctx.stroke();
        }

        if (converges) {
            ctx.fillStyle = CONVERGE;
            ctx.beginPath();
            ctx.arc(focusX, axisY, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'light arriving straight, and where the pair sends it',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, converges ? 'they meet here' : 'they spread apart',
            Math.min(focusX, left + plotW - 6), Math.max(axisY - lensH / 2 - 10, artTop + 26),
            'bold 11px monospace', converges ? CONVERGE : SPREAD, 'center',
            Math.max(60, safeRight - 30));
        outlineText(ctx, 'focal length ' + focalCm + ' cm is a power of '
            + firstD.toFixed(1) + ' D',
            safeRight / 2, Math.min(boxBottom + 14, artBottom - 12),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'second lens ' + (secondD >= 0 ? '+' : '') + secondD.toFixed(1) + ' D',
            safeRight / 2, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', secondD < 0 ? SPREAD : CONVERGE, 'center', safeRight - 30);

        outlineText(ctx, 'first lens ' + firstD.toFixed(1) + ' D + second lens '
            + secondD.toFixed(1) + ' D = ' + totalD.toFixed(1) + ' D together',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, converges
            ? 'check: 1 / ' + totalD.toFixed(1) + ' D = a focal length of '
              + combinedCm.toFixed(0) + ' cm'
            : 'a total of zero or less spreads light apart instead of focusing it',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', converges ? CONVERGE : SPREAD,
            'center', safeRight - 30);

        fitText(ctx, 'together ' + totalD.toFixed(1) + ' dioptres', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Powers add, so a prescription is a subtraction',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (totalD - MIN_D) / (MAX_D - MIN_D))),
                caption: 'Power of the Pair Together',
                low: 'spreads light apart',
                high: 'bends light most',
                stops: ['#eef2ff', '#a5b4fc', CONVERGE] as [string, string, string],
            },
            note: 'A focal length of ' + focalCm + ' cm is ' + (focalCm / 100).toFixed(2)
                + ' m, a power of ' + firstD.toFixed(1) + ' dioptres. A ' + secondD.toFixed(1)
                + ' D lens against it gives ' + totalD.toFixed(1) + ' D, because powers add. '
                + (converges ? 'That is ' + combinedCm.toFixed(0) + ' cm.'
                    : 'Zero or below spreads light apart.'),
        };
    };

    return (
        <LabCanvas
            title="How Strong Is That Lens?"
            readout={({ raw }) => 'A lens with a focal length of ' + focalOf(raw) + ' cm'}
            controlLabel="Focal Length"
            controlKey="lensFocalLength"
            controlMin={5}
            controlMax={200}
            controlInitial={25}
            controlDisplay={raw => focalOf(raw) + ' cm'}
            control2={{
                label: 'Second Lens Power',
                key: 'secondLensPower',
                min: -6,
                max: 20,
                initial: 6,
                display: raw => (secondOf(raw) >= 0 ? '+' : '') + secondOf(raw).toFixed(1) + ' D',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="A prescription is a subtraction!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
