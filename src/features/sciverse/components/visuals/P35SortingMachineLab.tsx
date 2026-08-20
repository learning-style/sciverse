import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Conveyor sorting: too slow is unproductive, too fast and items stack up and get missed. */
export const P35SortingMachineLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const beltY = H * 0.52;

        // Belt.
        ctx.fillStyle = '#475569';
        ctx.fillRect(20, beltY, safeRight - 40, 14);
        ctx.fillStyle = '#94a3b8';
        for (let i = 0; i < 30; i++) {
            const x = 20 + ((i * 26 + t * (30 + v * 260)) % (safeRight - 40));
            ctx.fillRect(x, beltY, 10, 14);
        }

        // The magnet station above the belt.
        const magX = safeRight * 0.62;
        ctx.fillStyle = '#334155';
        ctx.fillRect(magX - 34, beltY - 84, 68, 22);
        outlineText(ctx, 'MAGNET', magX, beltY - 68, 'bold 13px monospace', '#fbbf24');

        // Accuracy falls off once the belt outruns the magnet.
        const accuracy = v < 0.45 ? 0.97 : Math.max(0.12, 0.97 - (v - 0.45) * 1.5);
        const throughput = v;
        const sorted = accuracy * throughput;

        // Items riding the belt. Steel cans get lifted if the magnet catches them.
        const items = 10;
        for (let i = 0; i < items; i++) {
            const seed = i * 97.1;
            const x = 20 + ((seed * 7.7 + t * (30 + v * 260)) % (safeRight - 40));
            const isSteel = i % 3 === 0;
            const caught = isSteel && ((seed * 13.3) % 1) < accuracy;
            // Lift steel upward as it passes under the magnet.
            const near = Math.max(0, 1 - Math.abs(x - magX) / 60);
            const lift = caught ? near * 56 : 0;

            ctx.fillStyle = isSteel ? '#94a3b8' : i % 3 === 1 ? '#0ea5e9' : '#f59e0b';
            ctx.fillRect(x - 8, beltY - 18 - lift, 16, 18);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x - 8, beltY - 18 - lift, 16, 18);
        }

        // Legend.
        const lg = (label: string, color: string, x: number) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, 96, 12, 12);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, 96, 12, 12);
            outlineText(ctx, label, x + 48, 106, 'bold 13px monospace');
        };
        lg('steel', '#94a3b8', 30);
        lg('plastic', '#0ea5e9', safeRight * 0.38);
        lg('paper', '#f59e0b', safeRight * 0.72);

        outlineText(ctx, `Magnet catches ${Math.round(accuracy * 100)}% of the steel`, safeRight / 2, 82, 'bold 15px monospace');


        const msg = v < 0.2
            ? 'Very slow. Sorting is accurate but the plant barely processes anything.'
            : v < 0.5
                ? 'Good speed! Items are spread out and the magnet catches nearly all the steel.'
                : v < 0.78
                    ? 'Getting too fast -- items are stacking up and some steel slips past.'
                    : 'Far too fast! Items pile on each other and most steel is missed.';
        return { meter: { fraction: sorted, caption: 'Material Sorted Per Hour', low: 'Very little', high: 'Lots' }, note: msg };
    };

    return (
        <LabCanvas
            title="The Sorting Machine"
            readout={({ raw }) => `Conveyor speed: ${raw}%`}
            controlLabel="Conveyor Speed"
            controlKey="conveyorSpeed"
            controlMin={5}
            controlInitial={35}
            accent="indigo"
            sky={['#e2e8f0', '#f8fafc']}
            completeTitle="P35 Complete!"
            completeSubtitle="How Can We Turn Waste Into Resources?"
            completeNote="Magnets, air, and density sort trash -- if it is clean!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
