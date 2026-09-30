import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FOCAL_MM = 100;      // focal length held fixed, so the dials are radius and index
const MAX_BULGE = 12;      // mm at the top of the meter: r = 35 mm in 1.52 glass gives 11.8
const GLASS = '#4338ca';
const PATH = '#b45309';

const radiusOf = (dial: number): number => Math.max(5, Math.min(35, Math.round(dial)));
const indexOf = (dial: number): number => Math.max(152, Math.min(180, Math.round(dial))) / 100;

export const L3P20BulgeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const r = radiusOf(raw);
        const n = indexOf(raw2);
        const extraPath = (r * r) / (2 * FOCAL_MM);
        const bulge = extraPath / (n - 1);

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
        const lensX = left + plotW * 0.34;
        const focusX = left + plotW * 0.92;

        // the lens, drawn with its half-height set by the radius dial and its
        // half-thickness by the bulge, both to their own scales
        const halfH = Math.max(10, Math.min(boxH * 0.4, (r / 35) * boxH * 0.4));
        const halfT = Math.max(2.5, Math.min(plotW * 0.08, (bulge / MAX_BULGE) * plotW * 0.08));

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, axisY);
        ctx.lineTo(left + plotW, axisY);
        ctx.stroke();

        ctx.fillStyle = 'rgba(67,56,202,0.16)';
        ctx.strokeStyle = GLASS;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lensX, axisY - halfH);
        ctx.quadraticCurveTo(lensX + halfT, axisY, lensX, axisY + halfH);
        ctx.quadraticCurveTo(lensX - halfT, axisY, lensX, axisY - halfH);
        ctx.fill();
        ctx.stroke();

        // the two paths whose travel times must match: through the middle, and
        // round the edge
        ctx.strokeStyle = PATH;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left, axisY);
        ctx.lineTo(focusX, axisY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(left, axisY - halfH);
        ctx.lineTo(lensX, axisY - halfH);
        ctx.lineTo(focusX, axisY);
        ctx.stroke();

        ctx.fillStyle = PATH;
        ctx.beginPath();
        ctx.arc(focusX, axisY, 4, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'two paths to the same point, which must take the same time',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'the edge path is ' + extraPath.toFixed(2) + ' mm longer',
            safeRight / 2, Math.max(axisY - halfH - 10, artTop + 26),
            'bold 11px monospace', PATH, 'center', safeRight - 30);
        outlineText(ctx, 'so the middle needs ' + bulge.toFixed(2) + ' mm of extra glass',
            safeRight / 2, Math.min(boxBottom + 14, artBottom - 12),
            'bold 12px monospace', GLASS, 'center', safeRight - 30);
        outlineText(ctx, 'radius ' + r + ' mm, focal length ' + FOCAL_MM + ' mm, index '
            + n.toFixed(2),
            safeRight / 2, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'radius ' + r + ' squared / (2 x focal ' + FOCAL_MM + ' x (index '
            + n.toFixed(2) + ' - 1)) = ' + bulge.toFixed(2) + ' mm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'check: ' + bulge.toFixed(2) + ' mm of glass delays light as much as '
            + extraPath.toFixed(2) + ' mm of air',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', PATH, 'center', safeRight - 30);

        fitText(ctx, 'extra glass in the middle ' + bulge.toFixed(2) + ' mm',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A lens is a delay, cut in glass', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, bulge / MAX_BULGE)),
                caption: 'Extra Glass Needed in the Middle',
                low: '0 mm',
                high: MAX_BULGE + ' mm',
                stops: ['#eef2ff', '#a5b4fc', GLASS] as [string, string, string],
            },
            note: 'A ray through the edge of this lens, ' + r
                + ' mm out from the middle, travels ' + extraPath.toFixed(2)
                + ' mm further through air than a ray through the centre, because the edge path '
                + 'is the hypotenuse of a triangle with sides ' + FOCAL_MM + ' and ' + r
                + ' mm. For both to arrive in step, the middle ray must be delayed by exactly as '
                + 'much -- and glass of index ' + n.toFixed(2) + ' delays light by (index - 1) = '
                + (n - 1).toFixed(2) + ' times its thickness, because it replaces air that was '
                + 'already there. So the middle needs ' + bulge.toFixed(2)
                + ' mm of extra glass. Double the radius and the bulge quadruples, because the '
                + 'edge path grows as the radius squared -- which is why wide camera lenses are '
                + 'heavy and strong magnifiers are small.',
        };
    };

    return (
        <LabCanvas
            title="Why a Lens Is Fat in the Middle"
            readout={({ raw }) => 'A lens ' + radiusOf(raw) * 2 + ' mm across'}
            controlLabel="Lens Radius"
            controlKey="lensRadius"
            controlMin={5}
            controlMax={35}
            controlInitial={20}
            controlDisplay={raw => radiusOf(raw) + ' mm'}
            control2={{
                label: 'Refractive Index',
                key: 'bulgeIndex',
                min: 152,
                max: 180,
                initial: 152,
                display: raw => 'n = ' + indexOf(raw).toFixed(2),
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="A lens is a delay, cut in glass!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
