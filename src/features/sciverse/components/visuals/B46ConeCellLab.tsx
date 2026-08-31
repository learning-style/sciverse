import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Cones and rods across light levels: colour drains as cones stop firing and rods take over. */
export const B46ConeCellLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        // Cones need a fair amount of light before they start working.
        const cone = Math.max(0, Math.min(1, (v - 0.2) / 0.55));
        const rod = 1 - cone * 0.7;

        const cy = stageTop + 96;
        const cellR = 20;
        const names = ['red', 'green', 'blue'];
        const cols = ['#dc2626', '#16a34a', '#2563eb'];

        // Three cone types, brightening as light rises.
        for (let i = 0; i < 3; i++) {
            const x = safeRight * (0.24 + i * 0.13);
            const pulse = 1 + Math.sin(t * 3 + i) * 0.08 * cone;
            ctx.globalAlpha = 0.25 + cone * 0.75;
            ctx.fillStyle = cols[i];
            ctx.beginPath();
            ctx.arc(x, cy, cellR * pulse, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.stroke();
            outlineText(ctx, names[i], x, cy + cellR + 20, 'bold 14px monospace', '#000000', 'center', Math.max(48, safeRight * 0.35 - 8));
        }
        outlineText(ctx, 'cone cells', safeRight * 0.37, cy - cellR - 16, 'bold 15px monospace', '#000000', 'center', Math.max(48, safeRight * 0.35 - 8));

        // Rods, brightest when light is low.
        const rx = safeRight * 0.72;
        ctx.globalAlpha = 0.25 + rod * 0.75;
        ctx.fillStyle = '#94a3b8';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.ellipse(rx + (i - 2) * 17, cy, 7, 17, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        outlineText(ctx, 'rod cells', rx, cy - cellR - 16, 'bold 15px monospace', '#000000', 'center', Math.max(48, safeRight * 0.35 - 8));
        outlineText(ctx, 'brightness only', rx, cy + cellR + 20, 'bold 13px monospace', '#000000', 'center', Math.max(48, safeRight * 0.35 - 8));

        // What you actually see: a colour patch that desaturates as cones fade.
        const sw = Math.min(safeRight * 0.5, 300);
        const sy = stageBottom - 108;
        const patches = [[220,38,38],[37,99,235],[22,163,74],[234,179,8]];
        patches.forEach((p, i) => {
            const grey = (p[0] + p[1] + p[2]) / 3;
            const r = Math.round(grey + (p[0] - grey) * cone);
            const g = Math.round(grey + (p[1] - grey) * cone);
            const b = Math.round(grey + (p[2] - grey) * cone);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(safeRight / 2 - sw / 2 + i * (sw / 4), sy, sw / 4 - 6, 44);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(safeRight / 2 - sw / 2 + i * (sw / 4), sy, sw / 4 - 6, 44);
        });
        outlineText(ctx, 'what you see', safeRight / 2, sy - 10, 'bold 14px monospace');

        fitText(ctx, v < 0.25 ? 'Too dark for cones -- rods take over and everything looks grey'
            : v < 0.6 ? 'Cones are waking up, so a little colour comes back'
                : 'Plenty of light -- all three cone types are working and colour is full',
            safeRight / 2, 96, safeRight - 24, 15);

        const msg = v < 0.25
            ? 'Rods only. You can see shapes clearly but not colours.'
            : v < 0.6
                ? 'Dim. Cones are waking up and colour is creeping back.'
                : 'Bright enough for full colour from all three cone types.';
        return { meter: { fraction: cone, caption: 'How Much Colour You Can See', low: 'All grey', high: 'Full colour' }, note: msg };
    };

    return (
        <LabCanvas
            title="How Your Eyes See Colour"
            readout={({ v }) => `Light: ${v < 0.25 ? 'moonlight' : v < 0.5 ? 'dusk' : v < 0.75 ? 'indoor lamp' : 'bright daylight'}`}
            controlLabel="Light Level"
            controlKey="lightLevel"
            controlInitial={70}
            controlDisplay={(_raw, v) => v < 0.25 ? 'moonlight' : v < 0.5 ? 'dusk' : v < 0.75 ? 'indoor lamp' : 'bright daylight'}
            accent="rose"
            sky={['#fdf4ff', '#f8fafc']}
            completeTitle="B46 Complete!"
            completeSubtitle="How Do Color and Perception Work in Design?"
            completeNote="Three cone types is why screens use three colours!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
