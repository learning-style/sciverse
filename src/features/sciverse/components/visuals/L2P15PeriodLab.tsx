import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const INDIGO = '#4338ca';
const BOB = '#f59e0b';
// Kept small on purpose: the formula only holds for small swings
const SWING = 0.15;

const lengthOf = (dial: number): number => Math.max(10, Math.min(200, Math.round(dial)));
const gravityOf = (dial: number): number => Math.max(1.6, Math.min(25, Math.round(dial * 10) / 10));
const periodOf = (cm: number, grav: number): number => 2 * Math.PI * Math.sqrt(cm / 100 / grav);

const placeOf = (grav: number): string => {
    if (Math.abs(grav - 1.6) < 0.15) return 'the Moon';
    if (Math.abs(grav - 9.8) < 0.15) return 'Earth';
    if (Math.abs(grav - 24.8) < 0.3) return 'Jupiter';
    return '';
};

export const L2P15PeriodLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const cm = lengthOf(raw);
        const grav = gravityOf(raw2);
        const period = periodOf(cm, grav);
        const perMinute = 60 / period;
        const place = placeOf(grav);

        // Artwork sits below the text band and is scaled to the stage height
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);
        const pivotX = safeRight / 2;
        const pivotY = artTop + 10;
        const pixLen = Math.max(28, Math.min(avail - 58, (cm / 200) * (avail - 58)));

        // Swings at the period the formula gives, so a longer pendulum visibly slows
        const theta = SWING * Math.cos((2 * Math.PI * t) / period);
        const bobX = pivotX + Math.sin(theta) * pixLen;
        const bobY = pivotY + Math.cos(theta) * pixLen;

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(pivotX - 70, pivotY);
        ctx.lineTo(pivotX + 70, pivotY);
        ctx.stroke();

        // Straight down, the balance point the bob swings through
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(pivotX, pivotY + pixLen + 22);
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();

        ctx.fillStyle = BOB;
        ctx.beginPath();
        ctx.arc(bobX, bobY, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 4, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'pivot', pivotX + 10, pivotY - 8, '10px monospace', '#475569', 'left', 70);
        outlineText(ctx, 'bob', bobX + 18, bobY + 4, '10px monospace', '#475569', 'left', 60);

        // The length being measured, pivot to the centre of the bob
        const mx = pivotX - pixLen * 0.5 - 34;
        ctx.strokeStyle = INDIGO;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mx, pivotY);
        ctx.lineTo(mx, pivotY + pixLen);
        ctx.stroke();
        outlineText(ctx, `length ${cm} cm`, mx - 6, pivotY + pixLen / 2, '11px monospace', INDIGO, 'right', 110);

        const gravLine = place ? `gravity ${grav.toFixed(1)} m/s² on ${place}` : `gravity ${grav.toFixed(1)} m/s²`;
        outlineText(ctx, gravLine, safeRight / 2, Math.min(pivotY + pixLen + 40, artBottom),
            '11px monospace', '#475569', 'center', safeRight - 40);

        outlineText(ctx, `T = 2π √(${(cm / 100).toFixed(2)} / ${grav.toFixed(1)}) = ${period.toFixed(2)} s`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `swings in a minute: ${perMinute.toFixed(1)}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', INDIGO, 'center', safeRight - 30);

        fitText(ctx, `period ${period.toFixed(2)} s at ${cm} cm`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Four times the length, twice the time', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, period / 4)),
                caption: 'Period',
                low: '0 s',
                high: '4 s',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: `A pendulum ${cm} cm long where gravity is ${grav.toFixed(1)} m/s² has a period of ${period.toFixed(2)} s, so it makes ${perMinute.toFixed(1)} swings in a minute. Four times the length gives twice the period.`,
        };
    };

    return (
        <LabCanvas
            title="How Long Is the Swing?"
            readout={({ raw }) => `A pendulum ${lengthOf(raw)} cm long`}
            controlLabel="Pendulum Length"
            controlKey="pendulumLength"
            controlMin={10}
            controlMax={200}
            controlInitial={25}
            controlDisplay={raw => `${lengthOf(raw)} cm`}
            control2={{
                label: 'Gravity',
                key: 'gravity',
                min: 1.6,
                max: 25,
                initial: 9.8,
                display: raw => `${gravityOf(raw).toFixed(1)} m/s²`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Long Is the Swing?"
            completeNote="T = 2π √(L/g)!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
