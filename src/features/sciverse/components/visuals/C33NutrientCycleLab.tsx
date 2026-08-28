import { LabCanvas, chip, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const STOPS = [
    { label: 'AIR', color: '#0ea5e9' },
    { label: 'PLANTS', color: '#16a34a' },
    { label: 'ANIMALS', color: '#e11d48' },
    { label: 'SOIL', color: '#92400e' },
];

/** Carbon atoms travelling a closed loop; decomposer activity sets the speed. */
export const C33NutrientCycleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const cx = safeRight / 2;
        const cy = H * 0.46;
        const r = Math.min(safeRight * 0.26, H * 0.24);

        // The loop track.
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // The four stops on the cycle.
        STOPS.forEach((stop, i) => {
            const a = (i / STOPS.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            ctx.fillStyle = stop.color;
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();
            chip(ctx, stop.label, x, y + 42, stop.color);
        });

        // Carbon atoms moving round the loop. Speed follows decomposer activity.
        const speed = 0.15 + v * 0.9;
        const atoms = 8;
        for (let i = 0; i < atoms; i++) {
            const a = (i / atoms) * Math.PI * 2 + t * speed - Math.PI / 2;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        outlineText(ctx, 'Carbon atoms never leave -- they just move house', cx, 82, 'bold 15px monospace');

        // Pile of undecomposed leaf litter when the crew is slow.
        const litter = Math.round((1 - v) * 12);
        for (let i = 0; i < litter; i++) {
            ctx.fillStyle = '#a16207';
            ctx.beginPath();
            ctx.ellipse(40 + (i % 6) * 16, H - 118 - Math.floor(i / 6) * 10, 9, 5, i * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
        if (litter > 6) {
            outlineText(ctx, 'Dead leaves piling up!', 88, H - 148, 'bold 13px monospace', '#b91c1c');
        }


        const msg = v < 0.25
            ? 'Slow crew: nutrients stay trapped in dead material.'
            : v < 0.7
                ? 'The loop is turning -- soil is being restocked.'
                : 'Fast crew! Atoms race back to the soil for new plants.';
        return { meter: { fraction: v, caption: 'Nutrients Returned to the Soil', low: 'Locked up', high: 'Recycled' }, note: msg };
    };

    return (
        <LabCanvas
            title="Nature's Recycling Loop"
            readout={({ raw }) => `Decomposer activity: ${raw}%`}
            controlLabel="Decomposer Activity"
            controlKey="decomposerActivity"
            controlInitial={40}
            accent="emerald"
            sky={['#ecfccb', '#f8fafc']}
            completeTitle="C33 Complete!"
            completeSubtitle="How Do Ecosystems Support Human Life?"
            completeNote="Energy flows through, but matter cycles forever!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
