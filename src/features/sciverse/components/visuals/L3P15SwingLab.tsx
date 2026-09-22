import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const INDIGO = '#4338ca';
const TRUTH = '#b45309';
const BOB = '#f59e0b';

const angleOf = (dial: number): number => Math.max(2, Math.min(90, Math.round(dial)));
const lengthOf = (dial: number): number => Math.max(10, Math.min(200, Math.round(dial)));

/** Complete elliptic integral by the arithmetic-geometric mean, for the exact period. */
const ellipK = (k: number): number => {
    let a = 1;
    let b = Math.sqrt(1 - k * k);
    for (let i = 0; i < 40; i++) {
        const na = (a + b) / 2;
        b = Math.sqrt(a * b);
        a = na;
    }
    return Math.PI / (2 * a);
};

export const L3P15SwingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const deg = angleOf(raw);
        const cm = lengthOf(raw2);
        const theta = (deg * Math.PI) / 180;
        const base = 2 * Math.PI * Math.sqrt(cm / 100 / 9.81);
        const factor = 1 + (theta * theta) / 16;
        const period = base * factor;
        const exactFactor = (2 / Math.PI) * ellipK(Math.sin(theta / 2));
        const dayLoss = (factor - 1) * 86400;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);
        const pivotX = safeRight / 2;
        const pivotY = artTop + 12;
        // Bounded by the width too: at 90° the bob sits a full length out to the side
        const room = Math.min(avail - 62, safeRight / 2 - 34);
        const pixLen = Math.max(30, Math.min(room, (cm / 200) * room));

        // Swings at its true width, so a wide swing looks like one
        const now = theta * Math.cos((2 * Math.PI * t) / period);

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(pivotX - 70, pivotY);
        ctx.lineTo(pivotX + 70, pivotY);
        ctx.stroke();

        // The arc the bob travels, and the balance point it swings through
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(pivotX, pivotY + pixLen + 18);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, pixLen, Math.PI / 2 - theta, Math.PI / 2 + theta);
        ctx.stroke();
        ctx.restore();

        for (const side of [-1, 1]) {
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(pivotX, pivotY);
            ctx.lineTo(pivotX + Math.sin(theta) * pixLen * side, pivotY + Math.cos(theta) * pixLen);
            ctx.stroke();
        }

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(pivotX + Math.sin(now) * pixLen, pivotY + Math.cos(now) * pixLen);
        ctx.stroke();
        ctx.fillStyle = BOB;
        ctx.beginPath();
        ctx.arc(pivotX + Math.sin(now) * pixLen, pivotY + Math.cos(now) * pixLen, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        outlineText(ctx, `starting angle ${deg}°`, pivotX, pivotY + pixLen + 34,
            '11px monospace', INDIGO, 'center', safeRight - 40);
        outlineText(ctx, `${theta.toFixed(4)} radians`, pivotX, Math.min(pivotY + pixLen + 50, artBottom),
            '10px monospace', '#475569', 'center', safeRight - 40);
        outlineText(ctx, `correction +${((factor - 1) * 100).toFixed(2)}%`, 34, artTop + 14,
            'bold 11px monospace', INDIGO, 'left', 170);
        outlineText(ctx, `the truth is +${((exactFactor - 1) * 100).toFixed(2)}%`, 34, artTop + 30,
            '11px monospace', TRUTH, 'left', 170);

        outlineText(ctx, `T = ${base.toFixed(3)} x (1 + ${theta.toFixed(4)}² / 16) = ${period.toFixed(3)} s`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${dayLoss.toFixed(0)} s a day slow, against the small-swing period`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', INDIGO, 'center', safeRight - 30);

        fitText(ctx, `period ${period.toFixed(3)} s at ${deg}°`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Radians, squared, over sixteen', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (factor - 1) / 0.18)),
                caption: 'Correction',
                low: '0%',
                high: '18%',
                stops: ['#eef2ff', '#a5b4fc', TRUTH] as [string, string, string],
            },
            note: `At ${deg}° the period is ${((factor - 1) * 100).toFixed(2)}% longer than the small-swing period of ${base.toFixed(3)} s, so ${period.toFixed(3)} s, and it loses ${dayLoss.toFixed(0)} s a day. The truth is +${((exactFactor - 1) * 100).toFixed(2)}%, because this correction is only the first term.`,
        };
    };

    return (
        <LabCanvas
            title="How Big Is the Swing?"
            readout={({ raw }) => `A pendulum released from ${angleOf(raw)}°`}
            controlLabel="Starting Angle"
            controlKey="startAngle"
            controlMin={2}
            controlMax={90}
            controlInitial={10}
            controlDisplay={raw => `${angleOf(raw)}°`}
            control2={{
                label: 'Pendulum Length',
                key: 'swingLength',
                min: 10,
                max: 200,
                initial: 99,
                display: raw => `${lengthOf(raw)} cm`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Big Is the Swing?"
            completeNote="T = T₀ (1 + θ²/16)!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
