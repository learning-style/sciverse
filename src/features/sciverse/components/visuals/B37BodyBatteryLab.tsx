import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Two tanks: glycogen fills first (small and fast), then the overflow becomes fat. */
export const B37BodyBatteryLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        // Labels sit above (topY-32) and below (topY+tankH+24) each tank, so the
        // tank must leave room for both inside the stage.
        const topY = stageTop + 40;
        const tankH = Math.max(80, stageBottom - topY - 40);
        const tankW = safeRight * 0.24;
        const glyX = safeRight * 0.2 - tankW / 2;
        const fatX = safeRight * 0.68 - tankW / 2;

        // Glycogen fills over the first 40% of intake; the rest overflows into fat.
        const glycogen = Math.min(1, v / 0.4);
        const fat = Math.max(0, (v - 0.4) / 0.6);

        const drawTank = (x: number, fill: number, color: string, label: string, capacity: string) => {
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(x, topY, tankW, tankH);
            ctx.fillStyle = color;
            ctx.fillRect(x, topY + tankH * (1 - fill), tankW, tankH * fill);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, topY, tankW, tankH);
            outlineText(ctx, label, x + tankW / 2, topY - 32, 'bold 15px monospace');
            outlineText(ctx, capacity, x + tankW / 2, topY - 12, 'bold 13px monospace');
            outlineText(ctx, `${Math.round(fill * 100)}% full`, x + tankW / 2, topY + tankH + 24, 'bold 14px monospace');
        };

        drawTank(glyX, glycogen, '#f59e0b', 'GLYCOGEN', 'fast - about 2,000 calories');
        drawTank(fatX, fat, '#eab308', 'FAT', 'slow - over 100,000 calories');

        // Overflow arrow appears once glycogen is full.
        if (v > 0.4) {
            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 3;
            const y = topY + 20;
            ctx.beginPath();
            ctx.moveTo(glyX + tankW + 6, y);
            ctx.lineTo(fatX - 8, y);
            ctx.stroke();
            outlineText(ctx, 'overflow', (glyX + tankW + fatX) / 2, y - 10, 'bold 13px monospace', '#b91c1c');
        }

        // Glucose arriving from a meal.
        for (let i = 0; i < Math.round(v * 8) + 1; i++) {
            const p = ((t * 0.5 + i / 9) % 1);
            const x = 20 + p * (glyX - 20);
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.arc(x, topY + 30, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'glucose', 40, topY + 56, 'bold 13px monospace');

        outlineText(ctx, glycogen < 1
            ? 'Filling the fast store first'
            : 'Fast store full -- extra energy is being packed away as fat',
            safeRight / 2, 88, 'bold 14px monospace');


        const msg = v < 0.2
            ? 'Light meal. Glycogen is topping up for quick energy.'
            : v < 0.42
                ? 'Glycogen nearly full -- ready for fast, hard exercise.'
                : v < 0.75
                    ? 'Glycogen is full, so the extra is now being stored as fat.'
                    : 'Big surplus. Most of this meal goes into long-term fat storage.';
        return { meter: { fraction: (glycogen * 0.2 + fat * 0.8), caption: 'Total Energy Stored', low: 'Empty', high: 'Loaded' }, note: msg };
    };

    return (
        <LabCanvas
            title="Your Body's Battery"
            readout={({ raw }) => `Food energy coming in: ${raw}%`}
            controlLabel="Food Energy In"
            controlKey="foodEnergyIn"
            controlInitial={30}
            accent="rose"
            sky={['#fef3c7', '#f8fafc']}
            completeTitle="B37 Complete!"
            completeSubtitle="How Do We Store Energy for Later?"
            completeNote="A fast small store and a slow huge store -- just like engineers use!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
