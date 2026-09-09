import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const C_WATER = 4.2;
const FUEL_BURNT = 0.5;

export const L2C3CalorimeterLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, t, stageTop, stageBottom }: LabScene) => {
        const grams = Math.max(50, Math.round(raw));
        const rise = Math.max(1, Math.round(raw2));

        const joules = grams * C_WATER * rise;
        const perGram = joules / FUEL_BURNT;

        const cx = safeRight * 0.3;
        const canW = 116;
        const canTop = stageTop + 58;
        const canH = 104;

        // The can of water
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.strokeRect(cx - canW / 2, canTop, canW, canH);
        const fill = Math.min(1, grams / 500);
        const waterTop = canTop + canH * (1 - fill);
        ctx.fillStyle = 'rgba(56,189,248,0.35)';
        ctx.fillRect(cx - canW / 2 + 3, waterTop, canW - 6, canTop + canH - waterTop);
        outlineText(ctx, `${grams} g of water`, cx, canTop - 12,
            'bold 12px monospace', '#0f172a', 'center', canW + 90);

        // Thermometer against the can
        const thX = cx + canW / 2 + 18;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(thX, canTop + 6, 12, canH - 12);
        const level = Math.min(1, rise / 40);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(thX + 2, canTop + 6 + (canH - 16) * (1 - level), 8, (canH - 16) * level + 2);
        outlineText(ctx, `+${rise} °C`, thX + 6, canTop + canH + 18,
            'bold 12px monospace', '#b91c1c', 'center', 90);

        // The burner
        const flameY = canTop + canH + 34;
        const flicker = 4 + Math.sin(t * 7) * 2;
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(cx, flameY - 16 - flicker);
        ctx.quadraticCurveTo(cx + 11, flameY, cx, flameY + 6);
        ctx.quadraticCurveTo(cx - 11, flameY, cx, flameY - 16 - flicker);
        ctx.fill();
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 22, flameY + 6, 44, 14);
        outlineText(ctx, `${FUEL_BURNT.toFixed(2)} g of fuel burnt`, cx, flameY + 38,
            'bold 12px monospace', '#0f172a', 'center', 230);

        // The two-step calculation
        const tx = safeRight * 0.62;
        ctx.textAlign = 'left';
        ctx.font = '13px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText('Q = m x c x dT', tx, stageTop + 70);
        ctx.fillText(`  = ${grams} x 4.2 x ${rise}`, tx, stageTop + 96);
        ctx.font = 'bold 15px monospace';
        ctx.fillStyle = '#0f766e';
        ctx.fillText(`  = ${Math.round(joules).toLocaleString()} J`, tx, stageTop + 124);
        ctx.font = '13px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(`÷ ${FUEL_BURNT.toFixed(2)} g of fuel`, tx, stageTop + 156);
        ctx.font = 'bold 15px monospace';
        ctx.fillStyle = '#0f766e';
        ctx.fillText(`= ${(perGram / 1000).toFixed(1)} kJ/g`, tx, stageTop + 184);
        ctx.textAlign = 'center';

        outlineText(ctx, 'the formula describes the water, not the fuel',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${(perGram / 1000).toFixed(1)} kJ per gram of fuel`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Wood 16, ethanol 30, petrol 46, hydrogen 142 kJ/g',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, perGram / 150000)),
                caption: 'Energy Per Gram of Fuel',
                low: 'Almost none',
                high: 'As much as hydrogen',
            },
            note: `${grams} g of water rising ${rise} °C gained ${Math.round(joules).toLocaleString()} J. Dividing by the 0.50 g burnt, that is ${(perGram / 1000).toFixed(1)} kJ/g -- and the true value is a little higher, because heat escaped to the room.`,
        };
    };

    return (
        <LabCanvas
            title="Measuring a Reaction's Energy"
            readout={({ raw }) => `${Math.max(50, Math.round(raw))} g of water in the can`}
            controlLabel="Water Mass"
            controlKey="calWaterMass"
            controlMin={50}
            controlMax={500}
            controlInitial={200}
            controlDisplay={raw => `${Math.max(50, Math.round(raw))} g`}
            control2={{
                label: 'Temperature Rise',
                key: 'calTempRise',
                min: 1,
                max: 40,
                initial: 15,
                display: raw => `+${Math.max(1, Math.round(raw))} °C`,
            }}
            accent="emerald"
            sky={['#f0fdfa', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Measuring a Reaction's Energy"
            completeNote="Measure the water, divide by the fuel!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
