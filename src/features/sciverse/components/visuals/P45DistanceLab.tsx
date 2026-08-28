import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Sound level at the ear as distance grows: every doubling cuts it to about a quarter. */
export const P45DistanceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const metres = 0.5 + v * 15.5;
        // Source is 85 dB at 1 m; every doubling of distance drops about 6 dB.
        const dB = Math.max(30, 85 - 20 * Math.log10(metres / 1));
        const danger = dB >= 85;

        const midY = (stageTop + stageBottom) / 2;
        const spkX = 70;
        const earX = spkX + 40 + v * (safeRight - spkX - 150);

        // Speaker
        ctx.fillStyle = '#334155';
        ctx.fillRect(spkX - 22, midY - 38, 44, 76);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(spkX, midY, 17, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'speaker', spkX, midY + 60, 'bold 14px monospace');
        outlineText(ctx, '85 dB', spkX, midY - 52, 'bold 14px monospace');

        // Sound spreading out as widening arcs, fainter with distance.
        for (let i = 0; i < 6; i++) {
            const r = 26 + ((t * 42 + i * 40) % (safeRight - spkX - 70));
            ctx.strokeStyle = `rgba(79,70,229,${Math.max(0.05, 0.5 - r / 460)})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(spkX, midY, r, -0.9, 0.9);
            ctx.stroke();
        }

        // Listener
        ctx.font = '30px serif';
        ctx.textAlign = 'center';
        ctx.fillText('👂', earX, midY + 10);
        outlineText(ctx, `${metres.toFixed(1)} m away`, earX, midY + 46, 'bold 14px monospace');

        // Level meter at the ear
        const bx = 60, bw = safeRight - 120, by = stageTop + 24;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, by, bw, 20);
        ctx.fillStyle = danger ? '#dc2626' : dB > 70 ? '#f59e0b' : '#16a34a';
        ctx.fillRect(bx, by, bw * ((dB - 30) / 60), 20);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, 20);
        outlineText(ctx, 'sound level reaching the ear', safeRight / 2, by + 42, 'bold 14px monospace');

        outlineText(ctx, `${Math.round(dB)} decibels at your ear`, safeRight / 2, 96, 'bold 16px monospace');
        outlineText(ctx, danger ? 'Above 85 dB -- this is where damage starts' : 'Below the 85 dB danger line',
            safeRight / 2, 118, 'bold 13px monospace', danger ? '#b91c1c' : '#15803d');

        const msg = metres < 1.5
            ? 'Right beside the speaker -- above the danger line already.'
            : metres < 5
                ? 'A few steps back has already cut the sound a long way.'
                : 'Far away and much quieter. Later steps back help less than the first ones.';
        return { meter: { fraction: 1 - (dB - 30) / 60, caption: 'How Safe This Is for Your Ears', low: 'Dangerous', high: 'Safe' }, note: msg };
    };

    return (
        <LabCanvas
            title="Turning Down the Volume"
            readout={({ v }) => `Distance: ${(0.5 + v * 15.5).toFixed(1)} metres from the speaker`}
            controlLabel="Distance"
            controlKey="listenerDistance"
            controlInitial={6}
            controlDisplay={(_raw, v) => `${(0.5 + v * 15.5).toFixed(1)} m`}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="P45 Complete!"
            completeSubtitle="How Do We Manage Noise and Protect Hearing?"
            completeNote="Double the distance, quarter the sound!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
