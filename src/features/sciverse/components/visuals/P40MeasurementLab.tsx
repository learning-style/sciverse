import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const TRUE_VALUE = 82.0;

/** Repeated measurements scatter around the true value; averaging shrinks the uncertainty. */
export const P40MeasurementLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, raw }: LabScene) => {
        const n = raw;
        const axisY = H * 0.52;
        const axisX = 60;
        const axisW = safeRight - 120;

        // Number line from 81.0 to 83.0 cm.
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(axisX, axisY);
        ctx.lineTo(axisX + axisW, axisY);
        ctx.stroke();
        for (let i = 0; i <= 4; i++) {
            const x = axisX + (i / 4) * axisW;
            ctx.beginPath();
            ctx.moveTo(x, axisY - 7);
            ctx.lineTo(x, axisY + 7);
            ctx.stroke();
            outlineText(ctx, (81 + i * 0.5).toFixed(1), x, axisY + 26, 'bold 13px monospace');
        }
        outlineText(ctx, 'measured length (cm)', safeRight / 2, axisY + 48, 'bold 13px monospace');

        // The true value, marked for reference.
        const trueX = axisX + ((TRUE_VALUE - 81) / 2) * axisW;
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(trueX, axisY - 130);
        ctx.lineTo(trueX, axisY + 10);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, 'true length', trueX, axisY - 140, 'bold 13px monospace', '#15803d');

        // Deterministic pseudo-random readings so the picture is stable while sliding.
        let sum = 0;
        for (let i = 0; i < n; i++) {
            const seed = Math.sin(i * 12.9898) * 43758.5453;
            const jitter = ((seed - Math.floor(seed)) - 0.5) * 0.7;   // +/- 0.35 cm random error
            const reading = TRUE_VALUE + jitter;
            sum += reading;
            const x = axisX + ((reading - 81) / 2) * axisW;
            const y = axisY - 16 - (i % 12) * 9;
            ctx.fillStyle = 'rgba(79,70,229,0.75)';
            ctx.beginPath();
            ctx.arc(x, y, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }

        const mean = sum / n;
        const uncertainty = 0.35 / Math.sqrt(n);   // random error shrinks as 1/sqrt(n)

        // Average marker.
        const meanX = axisX + ((mean - 81) / 2) * axisW;
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(meanX, axisY - 8);
        ctx.lineTo(meanX - 8, axisY - 24);
        ctx.lineTo(meanX + 8, axisY - 24);
        ctx.closePath();
        ctx.fill();

        outlineText(ctx, `${n} measurement${n === 1 ? '' : 's'}`, safeRight / 2, 84, 'bold 15px monospace');
        outlineText(ctx, `Average: ${mean.toFixed(2)} cm  ±  ${uncertainty.toFixed(2)} cm`,
            safeRight / 2, 106, 'bold 15px monospace', '#b91c1c');


        const msg = n <= 2
            ? 'One or two readings tell you very little -- the wobble could be anywhere.'
            : n < 15
                ? 'The average is settling down as the high and low readings cancel out.'
                : 'Many readings! The random wobble has mostly cancelled and the range is tight.';
        return { meter: { fraction: 1 - uncertainty / 0.35, caption: 'Confidence in the Answer', low: 'Very unsure', high: 'Confident' }, note: msg };
    };

    return (
        <LabCanvas
            title="Measure It Again"
            readout={({ raw }) => `Taking ${raw} measurement${raw === 1 ? '' : 's'}`}
            controlLabel="Number of Measurements"
            controlKey="measurementCount"
            controlMin={1}
            controlMax={40}
            controlInitial={1}
            controlDisplay={raw => `${raw}`}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="P40 Complete!"
            completeSubtitle="How Do We Use Data to Know What Is True?"
            completeNote="Repeating fixes random error -- but never bias!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
