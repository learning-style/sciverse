import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const CELL_V = 0.15;
const MAX_CELLS = 6000;

const cellsOf = (dial: number): number => Math.max(10, Math.min(MAX_CELLS, Math.round(dial / 10) * 10));
const ohmsOf = (dial: number): number => Math.max(5, Math.round(dial));
const ampText = (amps: number): string => (amps < 0.1 ? amps.toFixed(3) : amps < 10 ? amps.toFixed(2) : amps.toFixed(1));

export const L2B7EelLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const cells = cellsOf(raw);
        const ohms = ohmsOf(raw2);
        const volts = cells * CELL_V;
        const amps = volts / ohms;
        const watts = volts * amps;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // The stack of electrocytes, its length in proportion to the number of cells
        const barX = 40;
        const barMaxW = safeRight - 80;
        const barW = Math.max(8, barMaxW * (cells / MAX_CELLS));
        const barY = stageTop + 28;
        const barH = 20;
        outlineText(ctx, `${cells.toLocaleString()} cells x 0.15 V = ${volts.toFixed(0)} V`, barX, stageTop + 18, 'bold 12px monospace', '#9f1239', 'left', barMaxW);
        ctx.fillStyle = '#ffe4e6';
        ctx.fillRect(barX, barY, barMaxW, barH);
        ctx.fillStyle = '#fb7185';
        ctx.fillRect(barX, barY, barW, barH);
        const stripes = Math.round(60 * (cells / MAX_CELLS));
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 1;
        for (let i = 1; i < stripes; i++) {
            const sx = barX + (barW * i) / stripes;
            ctx.beginPath();
            ctx.moveTo(sx, barY + 2);
            ctx.lineTo(sx, barY + barH - 2);
            ctx.stroke();
        }
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(barX, barY, barMaxW, barH);

        // The water path as a resistor, with the current flowing through it
        const pathY = stageTop + 84 * sy;
        const pathX1 = barX;
        const pathX2 = safeRight * 0.5;
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(pathX1, pathY);
        const zigs = 10;
        for (let i = 1; i < zigs * 2; i++) {
            ctx.lineTo(pathX1 + ((pathX2 - pathX1) * i) / (zigs * 2), pathY + (i % 2 === 0 ? -6 : 6));
        }
        ctx.lineTo(pathX2, pathY);
        ctx.stroke();
        const flow = Math.max(0.15, Math.min(1, (Math.log10(amps) + 2) / 4));
        const dotX = pathX1 + ((t * (0.2 + flow)) % 1) * (pathX2 - pathX1);
        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.arc(dotX, pathY, 3 + 4 * flow, 0, Math.PI * 2);
        ctx.fill();
        const hint = ohms >= 300 ? ' -- like a river' : ohms <= 20 ? ' -- like seawater' : '';
        outlineText(ctx, `water ${ohms} Ω${hint}`, (pathX1 + pathX2) / 2, pathY + 24, 'bold 11px monospace', '#1e3a8a', 'center', pathX2 - pathX1 + 20);

        const px = safeRight * 0.56;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `current = ${volts.toFixed(0)} / ${ohms} = ${ampText(amps)} A`, px, pathY - 8, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `energy each second = ${watts >= 100 ? watts.toFixed(0) : watts.toFixed(1)} W`, px, pathY + 16, '12px monospace', '#334155', 'left', pw);

        outlineText(ctx, `total voltage = ${cells.toLocaleString()} x 0.15 V = ${volts.toFixed(0)} V`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `I = V / R = ${volts.toFixed(0)} / ${ohms} = ${ampText(amps)} A`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${volts.toFixed(0)} V drives ${ampText(amps)} A`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Cells in series add their voltages', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (Math.log10(amps) + 2) / 4)),
                caption: 'Current Through the Water',
                low: '0.01 A',
                high: '100 A',
                stops: ['#ffe4e6', '#fb7185', '#9f1239'] as [string, string, string],
            },
            note: `${cells.toLocaleString()} electrocytes in series give ${volts.toFixed(0)} V; through ${ohms} Ω of water that drives ${ampText(amps)} A.`,
        };
    };

    return (
        <LabCanvas
            title="How an Electric Eel Makes 600 Volts"
            readout={({ raw }) => `${cellsOf(raw).toLocaleString()} cells in series`}
            controlLabel="Cells in Series"
            controlKey="cellsInSeries"
            controlMin={10}
            controlMax={MAX_CELLS}
            controlInitial={1000}
            controlDisplay={raw => `${cellsOf(raw).toLocaleString()}`}
            control2={{
                label: 'Water Resistance',
                key: 'waterResistance',
                min: 5,
                max: 1000,
                initial: 600,
                display: raw => `${ohmsOf(raw)} Ω`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How an Electric Eel Makes 600 Volts"
            completeNote="Thousands of tiny pushes in series!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
