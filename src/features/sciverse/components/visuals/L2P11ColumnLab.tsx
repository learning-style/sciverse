import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const BLOOD_DENSITY = 1060;
const G = 9.8;
const PA_PER_MMHG = 133;
const TOP_M = 2.5;
const BOTTOM_M = -1.5;
const SCALE_MMHG = 400;
const ADDED = '#0369a1';
const TAKEN = '#b91c1c';

const heightOf = (dial: number): number => Math.max(BOTTOM_M, Math.min(TOP_M, Math.round(dial * 10) / 10));
const heartOf = (dial: number): number => Math.max(60, Math.min(250, Math.round(dial)));
const placeText = (h: number): string => (h === 0 ? 'heart level' : `${Math.abs(h).toFixed(1)} m ${h > 0 ? 'above' : 'below'} the heart`);

export const L2P11ColumnLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const h = heightOf(raw);
        const heart = heartOf(raw2);
        const pascals = BLOOD_DENSITY * G * Math.abs(h);
        const change = pascals / PA_PER_MMHG;
        const there = heart - Math.sign(h) * change;
        const colour = h > 0 ? TAKEN : h < 0 ? ADDED : '#475569';

        // Left: a ruler in metres from the heart, with a person drawn to the same scale
        const yTop = stageTop + 14;
        const yBottom = stageBottom - 60;
        const yAt = (m: number): number => yTop + ((TOP_M - m) / (TOP_M - BOTTOM_M)) * (yBottom - yTop);
        const rulerX = 64;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rulerX, yAt(TOP_M));
        ctx.lineTo(rulerX, yAt(BOTTOM_M));
        ctx.stroke();
        for (let m = -1; m <= 2; m++) {
            ctx.beginPath();
            ctx.moveTo(rulerX - 5, yAt(m));
            ctx.lineTo(rulerX + 5, yAt(m));
            ctx.stroke();
            outlineText(ctx, m === 0 ? 'heart 0 m' : `${m} m`, rulerX - 8, yAt(m) + 4, '11px monospace', '#475569', 'right', 56);
        }
        const personX = safeRight * 0.22;
        const unit = (yAt(0) - yAt(1));
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(personX, yAt(0.45), unit * 0.1, 0, Math.PI * 2);
        ctx.moveTo(personX, yAt(0.33));
        ctx.lineTo(personX, yAt(-0.5));
        ctx.moveTo(personX, yAt(-0.5));
        ctx.lineTo(personX - unit * 0.12, yAt(-1.3));
        ctx.moveTo(personX, yAt(-0.5));
        ctx.lineTo(personX + unit * 0.12, yAt(-1.3));
        ctx.moveTo(personX - unit * 0.2, yAt(0.15));
        ctx.lineTo(personX + unit * 0.2, yAt(0.15));
        ctx.stroke();
        ctx.lineCap = 'butt';
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(personX, yAt(0), 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = colour;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(rulerX, yAt(h));
        ctx.lineTo(safeRight * 0.36, yAt(h));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(safeRight * 0.36, yAt(h), 5, 0, Math.PI * 2);
        ctx.fill();

        // Right: the pressure at heart level and at the chosen height, on one scale
        const px = safeRight * 0.44;
        const pw = safeRight - 20 - px;
        const bar = (label: string, mmhg: number, y: number, fill: string) => {
            outlineText(ctx, label, px, y, 'bold 12px monospace', fill, 'left', pw);
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(px, y + 6, pw, 16);
            ctx.fillStyle = fill;
            ctx.fillRect(px, y + 6, pw * Math.max(0, Math.min(1, mmhg / SCALE_MMHG)), 16);
        };
        bar(`heart level ${heart} mmHg`, heart, stageTop + 18, '#475569');
        bar(`at ${placeText(h)} ${Math.round(there)} mmHg`, there, stageTop + 62, colour);
        if (there < 0) {
            outlineText(ctx, 'above the tallest column of blood this heart could hold up', px, stageTop + 106, 'bold 12px monospace', TAKEN, 'left', pw);
        }

        outlineText(ctx, `ρ x g x h = 1,060 x 9.8 x ${Math.abs(h).toFixed(1)} = ${Math.round(pascals).toLocaleString()} Pa = ${change.toFixed(0)} mmHg`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `pressure at ${placeText(h)} = ${heart} ${h > 0 ? '−' : '+'} ${change.toFixed(0)} = ${Math.round(there)} mmHg`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', colour, 'center', safeRight - 30);

        fitText(ctx, `${Math.round(there)} mmHg at ${placeText(h)}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Down adds pressure, up takes it away', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, there / SCALE_MMHG)),
                caption: 'Pressure There',
                low: '0 mmHg',
                high: '400 mmHg',
                stops: ['#e0f2fe', '#7dd3fc', '#0369a1'] as [string, string, string],
            },
            note: `With ${heart} mmHg at the heart, the pressure at ${placeText(h)} is about ${Math.round(there)} mmHg.`,
        };
    };

    return (
        <LabCanvas
            title="What the Blood Pressure Numbers Mean"
            readout={({ raw }) => `A point ${placeText(heightOf(raw))}`}
            controlLabel="Height Above Heart"
            controlKey="heightAboveHeart"
            controlMin={BOTTOM_M}
            controlMax={TOP_M}
            controlInitial={0}
            controlDisplay={raw => `${heightOf(raw).toFixed(1)} m`}
            control2={{
                label: 'Heart-Level Pressure',
                key: 'heartLevelPressure',
                min: 60,
                max: 250,
                initial: 115,
                display: raw => `${heartOf(raw)} mmHg`,
            }}
            accent="indigo"
            sky={['#eff6ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="What the Blood Pressure Numbers Mean"
            completeNote="ρ x g x h!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
