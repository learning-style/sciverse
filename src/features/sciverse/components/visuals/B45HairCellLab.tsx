import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Hair cells under different loudness: gentle bending is fine, loud sound snaps them for good. */
export const B45HairCellLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageBottom }: LabScene) => {
        const dB = Math.round(40 + v * 90);
        // Below 85 dB nothing snaps; above it the share lost climbs fast.
        const lost = dB <= 85 ? 0 : Math.min(0.85, (dB - 85) / 45);
        const n = 18;
        const snapped = Math.round(n * lost);

        const baseY = stageBottom - 56;
        const startX = 60;
        const gap = (safeRight - 120) / (n - 1);
        const sway = Math.min(1, v * 1.6);

        // Cochlea floor the cells sit on.
        ctx.fillStyle = '#fbcfe8';
        ctx.fillRect(0, baseY, safeRight, stageBottom - baseY);
        outlineText(ctx, 'inside the cochlea', safeRight / 2, baseY + 34, 'bold 14px monospace');

        for (let i = 0; i < n; i++) {
            const x = startX + i * gap;
            const isSnapped = i < snapped;
            const h = isSnapped ? 12 : 46;
            const bend = isSnapped ? 0 : Math.sin(t * 3 + i * 0.6) * 16 * sway;
            ctx.strokeStyle = isSnapped ? '#9ca3af' : '#e11d48';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x, baseY);
            ctx.lineTo(x + bend, baseY - h);
            ctx.stroke();
            if (isSnapped) {
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x - 7, baseY - 20);
                ctx.lineTo(x + 7, baseY - 30);
                ctx.stroke();
            }
        }
        ctx.lineCap = 'butt';
        outlineText(ctx, 'hair cells', startX, baseY - 70, 'bold 14px monospace', '#be123c', 'left');

        fitText(ctx, `${dB} decibels`, safeRight / 2, 92, safeRight - 24, 16);
        fitText(ctx, dB <= 85
            ? 'Safe level -- the hair cells bend and recover'
            : `${snapped} of ${n} hair cells snapped, and they never grow back`, safeRight / 2, 116, safeRight - 24, 14, dB <= 85 ? '#15803d' : '#b91c1c');

        const msg = dB <= 70
            ? 'Gentle sound. The hair cells bend a little and are completely fine.'
            : dB <= 85
                ? 'Getting loud, but still under the 85 dB line. Nothing is lost yet.'
                : dB < 110
                    ? 'Above 85 dB -- hair cells are snapping, and they will not come back.'
                    : 'Concert loud. Damage happens within minutes at this level.';
        return { meter: { fraction: 1 - lost, caption: 'Hair Cells Still Working', low: 'Many lost', high: 'All healthy' }, note: msg };
    };

    return (
        <LabCanvas
            title="Inside Your Ear"
            readout={({ v }) => `Loudness: ${Math.round(40 + v * 90)} decibels`}
            controlLabel="Loudness"
            controlKey="loudness"
            controlInitial={25}
            controlDisplay={(_raw, v) => `${Math.round(40 + v * 90)} dB`}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="B45 Complete!"
            completeSubtitle="How Do We Manage Noise and Protect Hearing?"
            completeNote="Hair cells never grow back - prevention is the only cure!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
