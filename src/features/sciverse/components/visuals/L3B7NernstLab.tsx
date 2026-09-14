import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const NERNST_MV = 61.5;
const SODIUM_MV = 61;
const REST_MV = -70;
const SCALE_MIN = -120;
const SCALE_MAX = 80;

const outsideOf = (dial: number): number => Math.max(10, Math.round(dial)) / 10;
const insideOf = (dial: number): number => Math.max(50, Math.round(dial));
const mvText = (mv: number): string => `${mv < 0 ? '−' : '+'}${Math.abs(mv).toFixed(1)}`;

/** Fixed scatter positions, so the dots stay put between frames. */
const DOTS: [number, number][] = Array.from({ length: 60 }, (_, i) =>
    [(i * 0.6180339887 + 0.13) % 1, (i * 0.7548776662 + 0.41) % 1] as [number, number]);

export const L3B7NernstLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const outside = outsideOf(raw);
        const inside = insideOf(raw2);
        const ratio = outside / inside;
        const logRatio = Math.log10(ratio);
        const potential = NERNST_MV * logRatio;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // Outside and inside the membrane, drawn with the same dot density for the same concentration
        const boxX = 36;
        const boxW = safeRight * 0.36 - boxX;
        const boxTop = stageTop + 28;
        const boxBottom = stageTop + 122 * sy;
        const half = boxW / 2;
        ctx.fillStyle = '#eff6ff';
        ctx.fillRect(boxX, boxTop, half, boxBottom - boxTop);
        ctx.fillStyle = '#fff1f2';
        ctx.fillRect(boxX + half, boxTop, half, boxBottom - boxTop);
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(boxX + half, boxTop);
        ctx.lineTo(boxX + half, boxBottom);
        ctx.stroke();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(boxX, boxTop, boxW, boxBottom - boxTop);
        outlineText(ctx, 'outside', boxX + half / 2, boxTop - 8, 'bold 11px monospace', '#1e3a8a', 'center', half);
        outlineText(ctx, 'inside', boxX + half * 1.5, boxTop - 8, 'bold 11px monospace', '#9f1239', 'center', half);
        const dotsFor = (conc: number): number => Math.min(DOTS.length, Math.round(conc * 0.3));
        ctx.fillStyle = '#7c3aed';
        const drawDots = (count: number, left: number) => {
            DOTS.slice(0, count).forEach(([dx, dy]) => {
                ctx.beginPath();
                ctx.arc(left + 5 + dx * (half - 10), boxTop + 5 + dy * (boxBottom - boxTop - 10), 2.2, 0, Math.PI * 2);
                ctx.fill();
            });
        };
        drawDots(dotsFor(outside), boxX);
        drawDots(dotsFor(inside), boxX + half);

        // A voltage scale, inside compared with outside: fixed marks on the left, potassium on the right
        const axisX = safeRight * 0.6;
        const scaleTop = stageTop + 14;
        const scaleBottom = stageTop + 126 * sy;
        const yOf = (mv: number): number => scaleTop + ((SCALE_MAX - Math.max(SCALE_MIN, Math.min(SCALE_MAX, mv))) / (SCALE_MAX - SCALE_MIN)) * (scaleBottom - scaleTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(axisX, scaleTop);
        ctx.lineTo(axisX, scaleBottom);
        ctx.stroke();
        const leftRoom = axisX - safeRight * 0.38 - 10;
        const marks: [number, string][] = [[SODIUM_MV, 'sodium +61 mV'], [0, '0 mV'], [REST_MV, 'usual rest −70 mV']];
        marks.forEach(([mv, label]) => {
            const my = yOf(mv);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(axisX - 6, my);
            ctx.lineTo(axisX + 6, my);
            ctx.stroke();
            outlineText(ctx, label, axisX - 10, my + 4, '11px monospace', '#475569', 'right', leftRoom);
        });
        const ky = yOf(potential);
        ctx.fillStyle = '#9f1239';
        ctx.beginPath();
        ctx.moveTo(axisX + 3, ky);
        ctx.lineTo(axisX + 14, ky - 7);
        ctx.lineTo(axisX + 14, ky + 7);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `potassium ${mvText(potential)} mV`, axisX + 18, ky + 4, 'bold 12px monospace', '#9f1239', 'left', safeRight - axisX - 26);

        outlineText(ctx, `E = 61.5 x log (${outside.toFixed(1)} / ${inside}) = 61.5 x ${logRatio.toFixed(3)} = ${mvText(potential)} mV`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `inside is ${inside / outside >= 10 ? Math.round(inside / outside) : (inside / outside).toFixed(1)} times as concentrated as outside`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Potassium's balancing voltage ${mvText(potential)} mV`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The inside compared with the outside', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (potential - SCALE_MIN) / (SCALE_MAX - SCALE_MIN))),
                caption: 'Balancing Voltage, Inside Compared With Outside',
                low: '−120 mV',
                high: '+80 mV',
                stops: ['#e0e7ff', '#e2e8f0', '#ffe4e6'] as [string, string, string],
            },
            note: `With ${outside.toFixed(1)} mM outside and ${inside} mM inside, potassium's balancing voltage is ${mvText(potential)} mV, the inside compared with the outside.`,
        };
    };

    return (
        <LabCanvas
            title="The Battery in Every Nerve Cell"
            readout={({ raw }) => `Potassium outside ${outsideOf(raw).toFixed(1)} mM`}
            controlLabel="Potassium Outside"
            controlKey="potassiumOutside"
            controlMin={10}
            controlMax={200}
            controlInitial={50}
            controlDisplay={raw => `${outsideOf(raw).toFixed(1)} mM`}
            control2={{
                label: 'Potassium Inside',
                key: 'potassiumInside',
                min: 50,
                max: 200,
                initial: 140,
                display: raw => `${insideOf(raw)} mM`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Battery in Every Nerve Cell"
            completeNote="Every nerve cell is a battery!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
