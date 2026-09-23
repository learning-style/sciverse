import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const STAGE_RATIO = 4;
const MOTOR_TORQUE = 3;
const MOTOR_TURNS = 1500;
const POWER_IN = 2 * Math.PI * MOTOR_TORQUE * (MOTOR_TURNS / 60);
const KEPT = '#4f46e5';
const HEAT = '#b45309';

const stagesOf = (dial: number): number => Math.max(1, Math.min(8, Math.round(dial)));
const efficiencyOf = (dial: number): number => Math.max(70, Math.min(99, Math.round(dial)));

export const L3P13TrainLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const stages = stagesOf(raw);
        const stageEfficiency = efficiencyOf(raw2) / 100;
        const ratio = Math.pow(STAGE_RATIO, stages);
        const efficiency = Math.pow(stageEfficiency, stages);
        const turnsOut = MOTOR_TURNS / ratio;
        const torqueOut = MOTOR_TORQUE * ratio * efficiency;
        const powerOut = POWER_IN * efficiency;
        const lost = POWER_IN - powerOut;

        // The train: one small gear for each stage, with the power bar shrinking
        // along it. The gear radius and every gap below are shares of the real
        // stage height, so the row cannot walk into the footer.
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;

        const gx0 = 40;
        const gx1 = safeRight - 24;
        const step = (gx1 - gx0) / stages;
        const gearLabel = 14;
        const barGap = Math.max(10, Math.min(32, usable * 0.12));
        const barH = Math.max(12, Math.min(18, usable * 0.08));
        const tail = Math.max(14, Math.min(16, usable * 0.07));
        const r = Math.max(8, Math.min(22, step * 0.34, usable * 0.18));
        const blockH = r * 2 + gearLabel + barGap + barH + tail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const y = top + r;
        for (let i = 0; i < stages; i++) {
            const cx = gx0 + step * (i + 0.5);
            ctx.strokeStyle = KEPT;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, y, r, 0, Math.PI * 2);
            ctx.stroke();
            const spin = t * (i % 2 === 0 ? 1.4 : -1.4) / (i + 1);
            ctx.beginPath();
            ctx.moveTo(cx, y);
            ctx.lineTo(cx + Math.cos(spin) * r * 0.8, y + Math.sin(spin) * r * 0.8);
            ctx.stroke();
            outlineText(ctx, `stage ${i + 1}`, cx, Math.min(y + r + gearLabel, artBottom),
                '11px monospace', '#475569', 'center', step);
        }

        // Power surviving after each stage
        const barY = y + r + gearLabel + barGap;
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(gx0, barY, gx1 - gx0, barH);
        for (let i = 0; i < stages; i++) {
            const left = Math.pow(stageEfficiency, i + 1);
            ctx.fillStyle = KEPT;
            ctx.fillRect(gx0 + step * i, barY, step * left, barH);
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(gx0, barY, gx1 - gx0, barH);
        outlineText(ctx, `power surviving ${(efficiency * 100).toFixed(0)}%`, gx0,
            Math.min(barY + barH + tail, artBottom),
            'bold 12px monospace', KEPT, 'left', gx1 - gx0);
        outlineText(ctx, `lost as heat ${lost.toFixed(0)} W`, gx1,
            Math.min(barY + barH + tail, artBottom),
            'bold 12px monospace', HEAT, 'right', (gx1 - gx0) * 0.5);

        outlineText(ctx, `ratio = 4^${stages} = ${ratio.toLocaleString()}, so ${turnsOut.toFixed(1)} turns a minute at ${torqueOut.toFixed(0)} N m`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `efficiency = ${(stageEfficiency * 100).toFixed(0)}%^${stages} = ${(efficiency * 100).toFixed(1)}%, so ${powerOut.toFixed(0)} W of ${POWER_IN.toFixed(0)} W`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', KEPT, 'center', safeRight - 30);

        fitText(ctx, `${turnsOut.toFixed(1)} turns a minute, ${torqueOut.toFixed(0)} N m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Ratios multiply, losses multiply', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, efficiency)),
                caption: 'Power Surviving',
                low: '0%',
                high: '100%',
                stops: ['#fee2e2', '#fcd34d', '#4f46e5'] as [string, string, string],
            },
            note: `${stages} stages of 4 at ${(stageEfficiency * 100).toFixed(0)}% give a ratio of ${ratio.toLocaleString()} and ${(efficiency * 100).toFixed(1)}% efficiency: ${powerOut.toFixed(0)} W of the motor's ${POWER_IN.toFixed(0)} W, with ${lost.toFixed(0)} W lost as heat.`,
        };
    };

    return (
        <LabCanvas
            title="Gear Trains: Ratios Multiply, and So Do the Losses"
            readout={({ raw }) => `A train of ${stagesOf(raw)} stages`}
            controlLabel="Stages"
            controlKey="stages"
            controlMin={1}
            controlMax={8}
            controlInitial={3}
            controlDisplay={raw => `${stagesOf(raw)}`}
            control2={{
                label: 'Stage Efficiency',
                key: 'stageEfficiency',
                min: 70,
                max: 99,
                initial: 97,
                display: raw => `${efficiencyOf(raw)}%`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Gear Trains: Ratios Multiply, and So Do the Losses"
            completeNote="Multiply the ratios, multiply the losses!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
