import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const EMF = 1.5;

/** Fifty dial steps for each power of ten, from 0.01 ohm to about 20 ohms. */
const loadOf = (dial: number): number => Math.pow(10, -2 + Math.max(0, Math.round(dial)) / 50);
const internalOf = (dial: number): number => Math.max(5, Math.round(dial)) / 100;
const ohmText = (ohms: number): string => (ohms < 1 ? ohms.toFixed(3) : ohms < 10 ? ohms.toFixed(2) : ohms.toFixed(1));
const wattText = (watts: number): string => (watts < 0.1 ? watts.toFixed(3) : watts.toFixed(2));

export const L3P7InternalLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const load = loadOf(raw);
        const inner = internalOf(raw2);
        const current = EMF / (load + inner);
        const lost = current * inner;
        const terminal = EMF - lost;
        const loadWatts = terminal * current;
        const wasteWatts = current * current * inner;
        const matched = Math.abs(load - inner) / inner < 0.08;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // One loop: the battery's inside on the left, the load on the right
        const loopX = 40;
        const loopW = safeRight * 0.52 - loopX;
        const topY = stageTop + 22;
        const bottomY = stageTop + 96 * sy;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(loopX, topY, loopW, bottomY - topY);

        const boxW = loopW * 0.42;
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(loopX - 14, topY + 10, boxW, bottomY - topY - 20);
        ctx.setLineDash([]);
        outlineText(ctx, 'inside the battery', loopX - 10, topY - 6, 'bold 11px monospace', '#3730a3', 'left', loopW);

        const midY = (topY + bottomY) / 2;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(loopX - 8, midY - 14, 16, 28);
        ctx.strokeStyle = '#312e81';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(loopX - 8, midY - 5);
        ctx.lineTo(loopX + 8, midY - 5);
        ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(loopX - 5, midY + 5);
        ctx.lineTo(loopX + 5, midY + 5);
        ctx.stroke();
        outlineText(ctx, 'ε 1.50 V', loopX + 14, midY + 4, '11px monospace', '#312e81', 'left', boxW - 30);

        const zigzag = (x1: number, x2: number, y: number, colour: string) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = 2;
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(x1, y - 7, x2 - x1, 14);
            ctx.beginPath();
            ctx.moveTo(x1, y);
            for (let i = 1; i < 8; i++) ctx.lineTo(x1 + ((x2 - x1) * i) / 8, y + (i % 2 === 0 ? -6 : 6));
            ctx.lineTo(x2, y);
            ctx.stroke();
        };
        zigzag(loopX + boxW * 0.2, loopX + boxW * 0.7, bottomY, '#ea580c');
        outlineText(ctx, `r ${ohmText(inner)} Ω`, loopX + boxW * 0.45, bottomY + 20, 'bold 11px monospace', '#9a3412', 'center', boxW);
        zigzag(loopX + loopW * 0.62, loopX + loopW * 0.92, topY, '#0f172a');
        outlineText(ctx, `R ${ohmText(load)} Ω`, loopX + loopW * 0.77, topY + 22, 'bold 11px monospace', '#0f172a', 'center', loopW * 0.4);

        // The emf, split into what reaches the terminals and what is lost inside
        const barY = bottomY + 34 * sy;
        const barH = 16;
        const termW = loopW * (terminal / EMF);
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(loopX, barY, termW, barH);
        ctx.fillStyle = '#fb923c';
        ctx.fillRect(loopX + termW, barY, loopW - termW, barH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(loopX, barY, loopW, barH);

        const px = safeRight * 0.58;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `current ${current.toFixed(3)} A`, px, stageTop + 20, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `lost inside ${lost.toFixed(3)} V`, px, stageTop + 42, '12px monospace', '#9a3412', 'left', pw);
        outlineText(ctx, `terminal voltage ${terminal.toFixed(3)} V`, px, stageTop + 64, 'bold 12px monospace', '#3730a3', 'left', pw);
        outlineText(ctx, `to the load ${wattText(loadWatts)} W`, px, stageTop + 90 * sy, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `wasted inside ${wattText(wasteWatts)} W`, px, stageTop + 112 * sy, '12px monospace', '#9a3412', 'left', pw);

        outlineText(ctx, `I = 1.50 / (${ohmText(load)} + ${ohmText(inner)}) = ${current.toFixed(3)} A`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `V = 1.50 − ${current.toFixed(3)} x ${ohmText(inner)} = ${terminal.toFixed(3)} V`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Terminal voltage ${terminal.toFixed(2)} V`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, matched ? 'R = r: the load gets the most energy each second' : 'The emf minus the volts lost inside',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, terminal / EMF)),
                caption: 'Terminal Voltage',
                low: '0 V',
                high: '1.50 V',
                stops: ['#fed7aa', '#a5b4fc', '#4338ca'] as [string, string, string],
            },
            note: `With ${ohmText(load)} Ω outside and ${ohmText(inner)} Ω inside, ${current.toFixed(3)} A flows: ${lost.toFixed(3)} V is lost inside and ${terminal.toFixed(3)} V is left at the terminals.`,
        };
    };

    return (
        <LabCanvas
            title="Why a Battery Sags Under Load"
            readout={({ raw }) => `Load ${ohmText(loadOf(raw))} Ω`}
            controlLabel="Load Resistance"
            controlKey="loadResistance"
            controlMin={0}
            controlMax={165}
            controlInitial={89}
            controlDisplay={raw => `${ohmText(loadOf(raw))} Ω`}
            control2={{
                label: 'Internal Resistance',
                key: 'internalResistance',
                min: 5,
                max: 200,
                initial: 15,
                display: raw => `${ohmText(internalOf(raw))} Ω`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why a Battery Sags Under Load"
            completeNote="V = ε − I x r!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
