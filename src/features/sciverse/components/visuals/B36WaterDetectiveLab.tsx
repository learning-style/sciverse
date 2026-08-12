import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A culture dish: invisible germs grow into countable colonies overnight. */
export const B36WaterDetectiveLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const cx = safeRight / 2;
        const cy = H * 0.46;
        const r = Math.min(safeRight * 0.24, H * 0.22);

        // The petri dish.
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Colonies. Each spot grew from one original bacterium.
        const colonies = Math.round(v * 40);
        // Colonies pulse gently to suggest growth.
        const grow = 0.85 + Math.sin(t * 1.2) * 0.12;
        for (let i = 0; i < colonies; i++) {
            const seed = i * 127.3;
            const a = (seed % 360) * (Math.PI / 180);
            const d = Math.sqrt((seed * 13.7) % 1) * (r - 16);
            const x = cx + Math.cos(a) * d;
            const y = cy + Math.sin(a) * d;
            ctx.fillStyle = '#b45309';
            ctx.beginPath();
            ctx.arc(x, y, 5 * grow, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        outlineText(ctx, 'Culture dish after 24 hours', cx, cy + r + 26, 'bold 12px monospace');
        outlineText(ctx, `${colonies} colonies counted in a 100 mL sample`, cx, 84, 'bold 13px monospace');

        // Verdict against the drinking-water limit of zero E. coli per 100 mL.
        const verdict = colonies === 0 ? 'SAFE -- zero E. coli found'
            : colonies < 10 ? 'UNSAFE -- E. coli detected'
                : 'DANGEROUS -- heavy contamination';
        outlineText(ctx, verdict, cx, 106, 'bold 13px monospace',
            colonies === 0 ? '#15803d' : colonies < 10 ? '#b45309' : '#b91c1c');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, 1 - v,
            'Water Safety Verdict', 'Contaminated', 'Safe to drink'
        );

        const msg = colonies === 0
            ? 'No colonies grew. This sample passes -- but test again next month!'
            : colonies < 10
                ? 'Even a few colonies mean sewage reached this water. Do not drink.'
                : 'The dish is covered. This water is badly contaminated.';
        outlineText(ctx, msg, cx, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Water Detectives"
            readout={({ raw }) => `Germ level in the sample: ${raw}%`}
            controlLabel="Germ Level"
            controlKey="germLevel"
            controlInitial={30}
            accent="rose"
            sky={['#fef9c3', '#f8fafc']}
            completeTitle="B36 Complete!"
            completeSubtitle="How Do We Make Water Safe to Drink?"
            completeNote="Grow the invisible until you can count it!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
