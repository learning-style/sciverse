import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Billion tonnes of CO₂ in 1 ppm of the whole atmosphere. */
const TONNES_PER_PPM = 7.8;
const AXIS_LOW = -45;
const AXIS_HIGH = 60;
const GAIN = '#0369a1';
const LOSS = '#b91c1c';

const releasedOf = (dial: number): number => Math.max(10, Math.min(60, Math.round(dial)));
const riseOf = (dial: number): number => Math.max(0, Math.min(7, Math.round(dial * 10) / 10));

export const L3C10SinkLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const released = releasedOf(raw);
        const rise = riseOf(raw2);
        const stayed = rise * TONNES_PER_PPM;
        const sinks = released - stayed;
        const fraction = stayed / released;

        // One axis for all three bars, with room left of zero for a negative uptake
        const x0 = 30;
        const barW = safeRight - 30 - x0;
        const xAt = (bt: number): number => x0 + ((bt - AXIS_LOW) / (AXIS_HIGH - AXIS_LOW)) * barW;
        const zero = xAt(0);
        const rowStep = Math.max(36, Math.min(48, (stageBottom - 60 - stageTop - 16) / 3));
        const barH = 16;

        const bar = (label: string, colour: string, value: number, y: number) => {
            outlineText(ctx, label, x0, y, 'bold 12px monospace', colour, 'left', barW);
            const end = xAt(Math.max(AXIS_LOW, Math.min(AXIS_HIGH, value)));
            ctx.fillStyle = colour;
            ctx.fillRect(Math.min(zero, end), y + 6, Math.abs(end - zero), barH);
            // Zero drawn through the bar only, so it never crosses the label above
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(zero, y + 3);
            ctx.lineTo(zero, y + 9 + barH);
            ctx.stroke();
        };

        const y1 = stageTop + 16;
        bar(`released ${released} billion tonnes`, '#475569', released, y1);
        bar(`stayed in the air ${rise} ppm x 7.8 = ${stayed.toFixed(1)} billion tonnes`, '#d97706', stayed, y1 + rowStep);
        bar(sinks >= 0
            ? `taken up by oceans and land ${sinks.toFixed(1)} billion tonnes`
            : `giving out CO₂ ${(-sinks).toFixed(1)} billion tonnes`,
            sinks >= 0 ? GAIN : LOSS, sinks, y1 + rowStep * 2);


        outlineText(ctx, `airborne fraction = ${stayed.toFixed(1)} / ${released} = ${fraction.toFixed(2)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, sinks >= 0
            ? `the sinks took up ${sinks.toFixed(1)} billion tonnes`
            : 'more stayed than was released: the sinks would be giving out CO₂',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', sinks >= 0 ? GAIN : LOSS, 'center', safeRight - 30);

        fitText(ctx, `Airborne fraction ${fraction.toFixed(2)}: ${stayed.toFixed(1)} of ${released} billion tonnes stayed`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Turn ppm into tonnes: 1 ppm = 7.8 billion tonnes', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, fraction)),
                caption: 'Airborne Fraction',
                low: '0',
                high: '1',
                stops: ['#e0f2fe', '#fbbf24', '#b45309'] as [string, string, string],
            },
            note: `Of ${released} billion tonnes released, ${stayed.toFixed(1)} billion tonnes stayed in the air, an airborne fraction of ${fraction.toFixed(2)}.`,
        };
    };

    return (
        <LabCanvas
            title="Where Does the CO₂ Go?"
            readout={({ raw }) => `${releasedOf(raw)} billion tonnes of CO₂ released in a year`}
            controlLabel="CO₂ Released"
            controlKey="co2Released"
            controlMin={10}
            controlMax={60}
            controlInitial={40}
            controlDisplay={raw => `${releasedOf(raw)} billion tonnes`}
            control2={{
                label: 'Rise in the Air',
                key: 'riseInTheAir',
                min: 0,
                max: 7,
                initial: 2.5,
                display: raw => `${riseOf(raw)} ppm`,
            }}
            accent="emerald"
            sky={['#ecfeff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Where Does the CO₂ Go?"
            completeNote="Turn ppm into tonnes!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
