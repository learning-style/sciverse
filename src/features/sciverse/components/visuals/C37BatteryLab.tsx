import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Inside a cell: ions cross the electrolyte while electrons take the long way through the device. */
export const C37BatteryLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        // The outer circuit sits above the cell, so anchor the wire to the top of
        // the stage and hang the cell beneath it.
        const wireY = stageTop + 40;
        const cellY = wireY + 46;
        const cellH = Math.max(120, stageBottom - cellY - 34);
        const anodeX = 60;
        const cathodeX = safeRight - 110;

        // Electrodes.
        ctx.fillStyle = '#64748b';
        ctx.fillRect(anodeX, cellY, 40, cellH);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(cathodeX, cellY, 40, cellH);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(anodeX, cellY, 40, cellH);
        ctx.strokeRect(cathodeX, cellY, 40, cellH);
        outlineText(ctx, '- ANODE', anodeX + 20, cellY + cellH + 22, 'bold 11px monospace');
        outlineText(ctx, '+ CATHODE', cathodeX + 20, cellY + cellH + 22, 'bold 11px monospace');

        // Electrolyte between them.
        ctx.fillStyle = 'rgba(56,189,248,0.28)';
        ctx.fillRect(anodeX + 40, cellY, cathodeX - anodeX - 40, cellH);
        outlineText(ctx, 'ELECTROLYTE (ions cross here)', (anodeX + cathodeX) / 2 + 20, cellY + cellH - 12, 'bold 10px monospace');

        // Ions drifting across the electrolyte.
        for (let i = 0; i < 7; i++) {
            const p = ((t * 0.35 + i / 7) % 1);
            const x = anodeX + 44 + p * (cathodeX - anodeX - 48);
            const y = cellY + 24 + (i * (cellH - 48)) / 7;
            ctx.fillStyle = '#7c3aed';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            outlineText(ctx, '+', x, y + 4, 'bold 10px monospace', '#ffffff');
        }

        // Outer circuit: the long way round, through the bulb.
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(anodeX + 20, cellY);
        ctx.lineTo(anodeX + 20, wireY);
        ctx.lineTo(cathodeX + 20, wireY);
        ctx.lineTo(cathodeX + 20, cellY);
        ctx.stroke();

        // Bulb brightness follows the charge left.
        const bulbX = (anodeX + cathodeX) / 2 + 20;
        ctx.fillStyle = v > 0.05 ? `rgba(250,204,21,${0.35 + v * 0.65})` : '#e5e7eb';
        ctx.beginPath();
        ctx.arc(bulbX, wireY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, 'device', bulbX, wireY - 28, 'bold 11px monospace');

        // Electrons travelling the outer wire.
        for (let i = 0; i < Math.max(1, Math.round(v * 8)); i++) {
            const p = ((t * 0.45 + i / 8) % 1);
            const x = anodeX + 20 + p * (cathodeX - anodeX);
            ctx.fillStyle = '#0ea5e9';
            ctx.beginPath();
            ctx.arc(x, wireY, 5, 0, Math.PI * 2);
            ctx.fill();
            outlineText(ctx, '-', x, wireY + 4, 'bold 10px monospace', '#ffffff');
        }

        outlineText(ctx, 'Electrons must go the long way -- that is what powers the device',
            safeRight / 2, 90, 'bold 12px monospace');


        const msg = v < 0.15
            ? 'Nearly flat. Few electrons left to push -- the light is dim.'
            : v < 0.6
                ? 'Half charged. The reaction is still running steadily.'
                : 'Fully charged! Plenty of stored chemical reaction ready to go.';
        return { meter: { fraction: v, caption: 'Charge Remaining', low: 'Empty', high: 'Full' }, note: msg };
    };

    return (
        <LabCanvas
            title="Inside a Battery"
            readout={({ raw }) => `Battery charge: ${raw}%`}
            controlLabel="Battery Charge"
            controlKey="batteryCharge"
            controlInitial={70}
            accent="emerald"
            sky={['#f1f5f9', '#f8fafc']}
            completeTitle="C37 Complete!"
            completeSubtitle="How Do We Store Energy for Later?"
            completeNote="A battery stores a reaction, not electricity!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
