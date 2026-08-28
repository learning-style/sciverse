import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Compost microbes need damp -- not dry, not waterlogged. Pile temperature shows their activity. */
export const B35CompostCrewLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const binY = H - 260;
        const binH = 130;
        const binX = safeRight / 2 - 110;
        const binW = 220;

        // Activity peaks around 55% moisture and falls off either side.
        const activity = Math.max(0.05, 1 - Math.pow((v - 0.55) / 0.42, 2));
        const tempC = Math.round(15 + activity * 50);
        const soggy = v > 0.82;

        // The bin.
        ctx.fillStyle = soggy ? '#3f3f46' : '#78350f';
        ctx.fillRect(binX, binY, binW, binH);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.strokeRect(binX, binY, binW, binH);

        // Scraps inside.
        ctx.font = '15px serif';
        ctx.textAlign = 'center';
        const scraps = ['🍎', '🍌', '🍂', '🥬', '🍞', '🍁'];
        for (let i = 0; i < 12; i++) {
            const seed = i * 71.3;
            const x = binX + 20 + ((seed * 5.3) % (binW - 40));
            const y = binY + 24 + ((seed * 7.1) % (binH - 44));
            ctx.fillText(scraps[i % scraps.length], x, y);
        }

        // Heat waves rising when the crew is working hard.
        for (let i = 0; i < Math.round(activity * 10); i++) {
            const x = binX + 30 + i * ((binW - 60) / 10);
            const rise = (t * 34 + i * 17) % 56;
            ctx.strokeStyle = `rgba(249,115,22,${0.85 - rise / 70})`;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x, binY - rise);
            ctx.lineTo(x + Math.sin(rise * 0.2) * 6, binY - rise - 12);
            ctx.stroke();
        }

        // Stink lines when it goes anaerobic.
        if (soggy) {
            outlineText(ctx, '~ ~ ~ PHEW! ~ ~ ~', safeRight / 2, binY - 62, 'bold 15px monospace', '#65a30d');
        }

        // Thermometer.
        const thX = binX + binW + 40;
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(thX, binY, 18, binH);
        ctx.fillStyle = tempC > 45 ? '#dc2626' : tempC > 30 ? '#f59e0b' : '#0ea5e9';
        const fill = ((tempC - 15) / 50) * binH;
        ctx.fillRect(thX, binY + binH - fill, 18, fill);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(thX, binY, 18, binH);
        outlineText(ctx, `${tempC}°C`, thX + 9, binY - 10, 'bold 14px monospace');

        fitText(ctx, soggy ? 'Waterlogged -- no air for the fast crew!' : `Microbes working at ${Math.round(activity * 100)}%`, safeRight / 2, 84, safeRight - 24, 15);
        fitText(ctx, tempC > 45 ? 'Hot enough to kill weed seeds and germs!' : 'Pile is cool -- breakdown is slow.', safeRight / 2, 106, safeRight - 24, 14);


        const msg = v < 0.28
            ? 'Too dry! Microbes need water to live and cannot work.'
            : v < 0.45
                ? 'A bit dry. Add water or wet scraps to speed things up.'
                : v <= 0.72
                    ? 'Just right -- damp like a wrung-out sponge. The pile is heating up!'
                    : 'Too wet and packed. Air is squeezed out and it turns smelly.';
        return { meter: { fraction: activity, caption: 'Composting Speed', low: 'Stalled', high: 'Fast' }, note: msg };
    };

    return (
        <LabCanvas
            title="The Compost Crew"
            readout={({ raw }) => `Moisture level: ${raw}%`}
            controlLabel="Moisture Level"
            controlKey="moistureLevel"
            controlInitial={55}
            accent="rose"
            sky={['#ecfccb', '#f8fafc']}
            completeTitle="B35 Complete!"
            completeSubtitle="How Can We Turn Waste Into Resources?"
            completeNote="Microbes turn scraps into soil -- and make their own heat!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
