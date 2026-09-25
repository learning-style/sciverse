import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const BULB_OHMS = 6;
const MAX_WATTS = 13.5;

const voltsOf = (dial: number): number => Math.max(15, Math.round(dial)) / 10;
const bulbsOf = (dial: number): number => Math.max(1, Math.min(5, Math.round(dial)));
const wattText = (w: number): string => (w < 1 ? w.toFixed(3) : w.toFixed(2));

export const L2P7SeriesLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const volts = voltsOf(raw);
        const bulbs = bulbsOf(raw2);
        const resistance = BULB_OHMS * bulbs;
        const current = volts / resistance;
        const bulbVolts = current * BULB_OHMS;
        const watts = bulbVolts * current;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // The loop: battery on the left side, bulbs along the top
        const loopX = 40;
        const loopW = safeRight * 0.6 - loopX;
        const topY = stageTop + 30 * sy;
        const bottomY = stageTop + 112 * sy;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.strokeRect(loopX, topY, loopW, bottomY - topY);

        const midY = (topY + bottomY) / 2;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(loopX - 12, midY - 22, 24, 44);
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(loopX - 10, midY - 20, 20, 40);
        ctx.fillStyle = '#312e81';
        ctx.fillRect(loopX - 5, midY - 25, 10, 5);
        outlineText(ctx, '+', loopX, midY - 30, 'bold 13px monospace', '#0f172a', 'center', 16);
        outlineText(ctx, '−', loopX, midY + 38, 'bold 13px monospace', '#0f172a', 'center', 16);
        outlineText(ctx, `${volts.toFixed(1)} V`, loopX + 18, midY + 4, 'bold 12px monospace', '#312e81', 'left', loopW * 0.26);

        const firstX = loopX + loopW * 0.36;
        const span = loopX + loopW - 26 - firstX;
        const gap = bulbs > 1 ? span / (bulbs - 1) : 0;
        const glow = Math.min(1, Math.sqrt(watts / MAX_WATTS));
        for (let i = 0; i < bulbs; i++) {
            const bx = bulbs > 1 ? firstX + i * gap : firstX + span / 2;
            ctx.fillStyle = `rgba(250, 204, 21, ${0.15 + 0.6 * glow})`;
            ctx.beginPath();
            ctx.arc(bx, topY, 10 + 12 * glow, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fef9c3';
            ctx.strokeStyle = '#854d0e';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(bx, topY, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            outlineText(ctx, `${bulbVolts.toFixed(2)} V`, bx, topY + 40, '11px monospace', '#334155', 'center', Math.max(30, (bulbs > 1 ? gap : span) - 6));
        }

        // Current counted from + round to −: along the top to the right, back along the bottom to the left
        const arrowY = bottomY;
        const ax = loopX + loopW * 0.55;
        ctx.fillStyle = '#4f46e5';
        ctx.beginPath();
        ctx.moveTo(ax - 9, arrowY);
        ctx.lineTo(ax + 5, arrowY - 7);
        ctx.lineTo(ax + 5, arrowY + 7);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `current ${current.toFixed(2)} A`, ax, arrowY + 20, 'bold 11px monospace', '#3730a3', 'center', loopW * 0.6);

        const px = safeRight * 0.65;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `total resistance ${resistance} Ω`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `current ${current.toFixed(2)} A`, px, stageTop + 46, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `each bulb ${bulbVolts.toFixed(2)} V`, px, stageTop + 70, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `each bulb ${wattText(watts)} W`, px, stageTop + 100 * sy, 'bold 13px monospace', '#0f172a', 'left', pw);

        outlineText(ctx, `I = V / R = ${volts.toFixed(1)} / ${resistance} = ${current.toFixed(2)} A`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `each bulb: ${bulbVolts.toFixed(2)} V x ${current.toFixed(2)} A = ${wattText(watts)} W`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${bulbs} ${bulbs === 1 ? 'bulb' : 'bulbs'} in series: ${wattText(watts)} W each`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Half the push gives half the flow', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: glow,
                caption: 'Energy Each Second in Each Bulb',
                low: '0 W',
                high: `${MAX_WATTS} W`,
                stops: ['#1e1b4b', '#a5b4fc', '#fde68a'] as [string, string, string],
            },
            note: `${bulbs} ${bulbs === 1 ? 'bulb' : 'bulbs'} of 6 Ω in series on ${volts.toFixed(1)} V: ${current.toFixed(2)} A through each, ${bulbVolts.toFixed(2)} V across each, ${wattText(watts)} W in each.`,
        };
    };

    return (
        <LabCanvas
            title="Why Series Bulbs Glow at a Quarter"
            readout={({ raw }) => `Battery ${voltsOf(raw).toFixed(1)} V`}
            controlLabel="Battery Voltage"
            controlKey="batteryVoltage"
            controlMin={15}
            controlMax={90}
            controlInitial={30}
            controlDisplay={raw => `${voltsOf(raw).toFixed(1)} V`}
            control2={{
                label: 'Bulbs in Series',
                key: 'bulbsInSeries',
                min: 1,
                max: 5,
                initial: 1,
                display: raw => `${bulbsOf(raw)} bulbs`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Why Series Bulbs Glow at a Quarter"
            completeNote="I = V / R -- half the push, half the flow!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
