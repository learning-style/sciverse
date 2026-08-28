import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A poster in sunlight: UV breaks pigment molecules, and fragile reds go before tough blues. */
export const C46FadingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const days = raw;
        // Fragile reds and yellows go first; blues are far tougher.
        const fadeRed = Math.min(0.92, days / 200);
        const fadeBlue = Math.min(0.55, days / 620);
        const colourLeft = 1 - (fadeRed * 0.6 + fadeBlue * 0.4);

        const pw = Math.min(safeRight * 0.42, 250);
        const ph = Math.min((stageBottom - stageTop) * 0.52, 210);
        const px = safeRight / 2 - pw / 2;
        const py = stageTop + 46;

        // Poster background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px, py, pw, ph);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(px, py, pw, ph);

        // Red band fades fast, blue band slowly.
        const mix = (a: number, b: number, f: number) => Math.round(a + (b - a) * f);
        ctx.fillStyle = `rgb(${mix(220,246,fadeRed)},${mix(38,232,fadeRed)},${mix(38,232,fadeRed)})`;
        ctx.fillRect(px + 16, py + 20, pw - 32, ph * 0.3);
        ctx.fillStyle = `rgb(${mix(37,226,fadeBlue)},${mix(99,232,fadeBlue)},${mix(235,240,fadeBlue)})`;
        ctx.fillRect(px + 16, py + 30 + ph * 0.36, pw - 32, ph * 0.3);
        outlineText(ctx, 'red ink', px + pw / 2, py + 20 + ph * 0.18, 'bold 14px monospace');
        outlineText(ctx, 'blue ink', px + pw / 2, py + 30 + ph * 0.54, 'bold 14px monospace');

        // Sun and UV arrows
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(px - 46, py + 10, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, 'UV', px - 46, py + 46, 'bold 14px monospace', '#a16207');

        // Fading bar, named in the lesson
        const bx = 60, bw = safeRight - 120, by = stageBottom - 44;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, by, bw, 18);
        ctx.fillStyle = colourLeft > 0.6 ? '#16a34a' : colourLeft > 0.3 ? '#f59e0b' : '#dc2626';
        ctx.fillRect(bx, by, bw * colourLeft, 18);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, 18);
        outlineText(ctx, 'fading bar', safeRight / 2, by - 8, 'bold 14px monospace');

        fitText(ctx, `${Math.round(fadeRed * 100)}% of the red is gone, ${Math.round(fadeBlue * 100)}% of the blue`,
            safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, 'Fragile reds break first; tougher blues last much longer',
            safeRight / 2, 118, safeRight - 24, 13);

        const msg = days < 30
            ? 'Fresh from the printer. The molecules are all intact.'
            : days < 150
                ? 'The red is going first -- its molecules are the most fragile.'
                : 'Badly faded, and none of it can be undone. Only the blue is holding on.';
        return { meter: { fraction: colourLeft, caption: 'How Much Colour Is Left', low: 'Faded away', high: 'Like new' }, note: msg };
    };

    return (
        <LabCanvas
            title="Why Colours Fade"
            readout={({ raw }) => `${raw} day${raw === 1 ? '' : 's'} in sunlight`}
            controlLabel="Days in Sunlight"
            controlKey="sunDays"
            controlMin={0}
            controlMax={365}
            controlInitial={0}
            controlDisplay={raw => `${raw} days`}
            accent="emerald"
            sky={['#fef9c3', '#f8fafc']}
            completeTitle="C46 Complete!"
            completeSubtitle="How Do Color and Perception Work in Design?"
            completeNote="Fading can only be slowed, never undone!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
