import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const G = 9.81;
const WIDTH_M = 30;        // channel width, held fixed so the dials are speed and radius
const MAX_TILT = 0.25;     // metres, the top of the meter
const CALM = '#4338ca';
const STRONG = '#1d4ed8';

const speedOf = (dial: number): number => Math.max(0.4, Math.min(2.4, Math.round(dial / 5) * 0.2));
const radiusOf = (dial: number): number => Math.max(40, Math.min(240, Math.round(dial / 10) * 10));
const tiltOf = (v: number, r: number): number => (v * v * WIDTH_M) / (G * r);

export const L3P18TiltLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const speed = speedOf(raw);
        const radius = radiusOf(raw2);
        const tilt = tiltOf(speed, radius);
        const cm = tilt * 100;
        const strong = cm >= 8;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const boxTop = top + capBand;
        const bedY = boxTop + boxH;

        const boxW = Math.max(120, Math.min(safeRight - 110, safeRight * 0.62));
        const cx = safeRight / 2;
        const left = cx - boxW / 2;
        const right = left + boxW;

        // The tilt is a few centimetres on a 30 m river, so it is drawn exaggerated
        // and the caption says so rather than pretending the picture is to scale.
        const lean = Math.max(3, Math.min(boxH * 0.3, (cm / 12) * boxH * 0.22));
        const surfInner = boxTop + lean;      // inner bank: water stands lower
        const surfOuter = boxTop;             // outer bank: water stands higher

        ctx.fillStyle = '#dbeafe';
        ctx.beginPath();
        ctx.moveTo(left, surfInner);
        ctx.lineTo(right, surfOuter);
        ctx.lineTo(right, bedY);
        ctx.lineTo(left, bedY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // the tilted surface, picked out
        ctx.strokeStyle = strong ? STRONG : CALM;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(left, surfInner);
        ctx.lineTo(right, surfOuter);
        ctx.stroke();

        // the corkscrew: outward along the surface, down the outer bank, inward
        // along the bed. One rotating arrow head so the direction is readable.
        const midY = (boxTop + bedY) / 2;
        const ringR = Math.min(boxH * 0.28, boxW * 0.12);
        const spin = (t * (0.5 + speed)) % (Math.PI * 2);
        ctx.strokeStyle = strong ? STRONG : CALM;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, midY, ringR, 0, Math.PI * 2);
        ctx.stroke();
        const hx = cx + ringR * Math.cos(spin);
        const hy = midY + ringR * Math.sin(spin);
        ctx.fillStyle = strong ? STRONG : CALM;
        ctx.beginPath();
        ctx.arc(hx, hy, 4, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'the channel end-on, tilt drawn larger than life',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'inner bank', left + 4, Math.min(bedY + 14, artBottom - 12),
            'bold 11px monospace', '#0f172a', 'left', Math.max(50, boxW / 2 - 8));
        outlineText(ctx, 'outer bank', right - 4, Math.min(bedY + 14, artBottom - 12),
            'bold 11px monospace', strong ? STRONG : CALM, 'right', Math.max(50, boxW / 2 - 8));
        outlineText(ctx, 'corkscrew: out on top, in along the bed',
            cx, Math.min(bedY + labelTail + 10, artBottom),
            'bold 11px monospace', strong ? STRONG : CALM, 'center', safeRight - 30);

        outlineText(ctx, 'tilt = v² w / (g R) = ' + speed.toFixed(1) + '² x ' + WIDTH_M
            + ' / (9.81 x ' + radius + ') = ' + cm.toFixed(1) + ' cm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'bed water is pushed inward, and bedload rolls with it',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'surface tilt ' + cm.toFixed(1) + ' cm', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Four centimetres of lean builds the inside of every bend',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, tilt / MAX_TILT)),
                caption: 'Tilt Across the Channel',
                low: '0 cm',
                high: (MAX_TILT * 100).toFixed(0) + ' cm',
                stops: ['#eef2ff', '#93c5fd', STRONG] as [string, string, string],
            },
            note: 'Water at ' + speed.toFixed(1) + ' m/s round a bend of radius ' + radius
                + ' m must accelerate inward at ' + ((speed * speed) / radius).toFixed(4)
                + ' m/s², and the only way an open channel supplies that is by tilting its '
                + 'surface: higher against the outer bank, lower against the inner one. Across '
                + WIDTH_M + ' m that tilt is ' + cm.toFixed(1)
                + ' cm. Because the tilt is set by the average speed while surface water runs '
                + 'faster than bed water, it is too little on top and too much below -- so the '
                + 'flow corkscrews, and the sand and gravel rolling along the bed travel inward '
                + 'to build the point bar. Tilt goes as v², so doubling the speed quadruples it.',
        };
    };

    return (
        <LabCanvas
            title="Why the Outside of the Bend?"
            readout={({ raw }) => 'Water at ' + speedOf(raw).toFixed(1) + ' m/s'}
            controlLabel="Flow Speed"
            controlKey="bendSpeed"
            controlMin={10}
            controlMax={60}
            controlInitial={30}
            controlDisplay={raw => speedOf(raw).toFixed(1) + ' m/s'}
            control2={{
                label: 'Bend Radius',
                key: 'bendRadius',
                min: 40,
                max: 240,
                initial: 100,
                display: raw => radiusOf(raw) + ' m',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Rivers Shape the Land?"
            completeNote="Four centimetres of tilt, moving a valley!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
