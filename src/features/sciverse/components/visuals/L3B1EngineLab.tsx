import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const G = 9.8;
const EFFICIENCY = 0.25;
const L_VAP = 2260;

export const L3B1EngineLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const kg = Math.round(raw);
        const metres = Math.max(1, Math.round(raw2));

        const work = kg * G * metres;
        const total = work / EFFICIENCY;
        const heat = total - work;
        const sweat = heat / L_VAP;

        // One bar for the whole chemical energy, split into what became work
        // and what became heat.
        const barX = 54;
        const barW = safeRight - 110;
        const barY = stageTop + 74;
        const barH = 62;
        const workW = barW * EFFICIENCY;

        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(barX, barY, workW, barH);
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(barX + workW, barY, barW - workW, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barW, barH);
        ctx.beginPath();
        ctx.moveTo(barX + workW, barY);
        ctx.lineTo(barX + workW, barY + barH);
        ctx.stroke();

        outlineText(ctx, 'useful work', barX + workW / 2, barY + barH / 2 - 3,
            'bold 12px monospace', '#ffffff', 'center', workW - 6);
        outlineText(ctx, `${Math.round(work).toLocaleString()} J`, barX + workW / 2, barY + barH / 2 + 14,
            'bold 12px monospace', '#ffffff', 'center', workW - 6);
        outlineText(ctx, 'heat', barX + workW + (barW - workW) / 2, barY + barH / 2 - 3,
            'bold 12px monospace', '#ffffff', 'center', barW - workW - 6);
        outlineText(ctx, `${Math.round(heat).toLocaleString()} J`, barX + workW + (barW - workW) / 2, barY + barH / 2 + 14,
            'bold 12px monospace', '#ffffff', 'center', barW - workW - 6);
        outlineText(ctx, `total energy in = ${Math.round(total).toLocaleString()} J`,
            safeRight / 2, barY - 12, 'bold 12px monospace', '#0f172a', 'center', barW);

        // The sweat that has to evaporate to carry the heat away
        const dropY = barY + barH + 54;
        const drops = Math.max(1, Math.min(24, Math.round(sweat / 2)));
        for (let i = 0; i < drops; i++) {
            const dx = barX + 14 + (i % 12) * ((barW - 28) / 12);
            const dy = dropY + Math.floor(i / 12) * 26;
            ctx.fillStyle = '#0ea5e9';
            ctx.beginPath();
            ctx.moveTo(dx, dy - 9);
            ctx.quadraticCurveTo(dx + 7, dy + 1, dx, dy + 7);
            ctx.quadraticCurveTo(dx - 7, dy + 1, dx, dy - 9);
            ctx.fill();
        }
        outlineText(ctx, `${sweat.toFixed(1)} g of sweat must evaporate at 2,260 J per gram`,
            safeRight / 2, dropY + 52, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `W = mgh = ${kg} x 9.8 x ${metres} = ${Math.round(work).toLocaleString()} J`,
            safeRight / 2, stageBottom - 16, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `Climbing ${metres} m costs ${Math.round(total).toLocaleString()} J and sheds ${Math.round(heat).toLocaleString()} J as heat`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Muscle is about 25% efficient, so three joules of heat per joule of work',
            safeRight / 2, 118, safeRight - 24, 13);

        const trapped = heat / (kg * 1000 * 4.2);
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, trapped / 5)),
                caption: 'Temperature Rise If None Escaped',
                low: 'Almost none',
                high: 'Life-threatening',
            },
            note: `Trapped, that heat would raise the body by ${trapped.toFixed(2)} °C. A rise of 5 °C is life-threatening, which is why the sweat has to evaporate.`,
        };
    };

    return (
        <LabCanvas
            title="The Body as an Engine"
            readout={({ raw }) => `A ${Math.round(raw)} kg climber`}
            controlLabel="Body Mass"
            controlKey="bodyMass"
            controlMin={40}
            controlMax={120}
            controlInitial={70}
            controlDisplay={raw => `${Math.round(raw)} kg`}
            control2={{
                label: 'Height Climbed',
                key: 'heightClimbed',
                min: 1,
                max: 300,
                initial: 10,
                display: raw => `${Math.max(1, Math.round(raw))} m`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Body as an Engine"
            completeNote="Levers trade force for distance; evaporation does the cooling!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
