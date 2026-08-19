import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Pumped hydro: stored energy scales with height, and the round trip always loses ~20%. */
export const P37PumpedHydroLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageBottom }: LabScene) => {
        const groundY = stageBottom - 46;
        const maxLift = stageBottom * 0.42;
        const lift = 20 + v * maxLift;
        const upperY = groundY - lift;

        // The mountain the upper lake sits on.
        ctx.fillStyle = '#a8a29e';
        ctx.beginPath();
        ctx.moveTo(40, groundY);
        ctx.lineTo(safeRight * 0.34, upperY - 12);
        ctx.lineTo(safeRight * 0.56, upperY - 12);
        ctx.lineTo(safeRight * 0.72, groundY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#57534e';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Upper lake.
        ctx.fillStyle = '#0ea5e9';
        ctx.fillRect(safeRight * 0.35, upperY - 12, safeRight * 0.2, 16);
        outlineText(ctx, 'upper lake', safeRight * 0.45, upperY - 22, 'bold 11px monospace');

        // Lower lake.
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(20, groundY, safeRight - 40, stageBottom - groundY);
        outlineText(ctx, 'lower lake', safeRight * 0.85, groundY + 28, 'bold 12px monospace', '#ffffff');

        // Pipe joining the two lakes.
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(safeRight * 0.55, upperY - 4);
        ctx.lineTo(safeRight * 0.68, groundY);
        ctx.stroke();

        // Water flowing down the pipe.
        for (let i = 0; i < 6; i++) {
            const p = ((t * 0.4 + i / 6) % 1);
            const x = safeRight * 0.55 + p * (safeRight * 0.13);
            const y = upperY - 4 + p * (groundY - upperY + 4);
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Height marker.
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(safeRight * 0.78, groundY);
        ctx.lineTo(safeRight * 0.78, upperY);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, `${Math.round(v * 200)} m`, safeRight * 0.78, (groundY + upperY) / 2, 'bold 12px monospace', '#b91c1c');

        // Stored energy is proportional to height; 80% comes back out.
        const stored = v;
        const returned = stored * 0.8;

        outlineText(ctx, `Energy stored: ${Math.round(stored * 100)} units`, safeRight / 2, 84, 'bold 13px monospace');
        outlineText(ctx, `Energy you get back: ${Math.round(returned * 100)} units (20% lost as heat)`,
            safeRight / 2, 106, 'bold 12px monospace');


        const msg = v < 0.25
            ? 'Barely lifted. Very little energy is stored at this height.'
            : v < 0.6
                ? 'Higher lake, more stored energy -- double the height, double the energy.'
                : 'High up! Huge energy stored -- this is why these are built in mountains.';
        return { meter: { fraction: stored, caption: 'Stored Energy (weight x height)', low: 'Almost none', high: 'Full' }, note: msg };
    };

    return (
        <LabCanvas
            title="Save It for Later"
            readout={({ v }) => `Lifting water ${Math.round(v * 200)} metres uphill`}
            controlLabel="Lift Height"
            controlKey="liftHeight"
            controlMin={5}
            controlInitial={40}
            controlDisplay={(_raw, v) => `${Math.round(v * 200)} metres`}
            accent="indigo"
            sky={['#dbeafe', '#f8fafc']}
            completeTitle="P37 Complete!"
            completeSubtitle="How Do We Store Energy for Later?"
            completeNote="Stored energy = weight x height!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
