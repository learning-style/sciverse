import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A meadow divided into territories: bigger territories mean fewer animals fit. */
export const P47TerritoryLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const metres = raw;
        const fieldX = 50;
        const fieldY = stageTop + 40;
        const fieldW = safeRight - 100;
        const fieldH = Math.max(120, stageBottom - fieldY - 66);

        // The meadow
        ctx.fillStyle = '#bbf7d0';
        ctx.fillRect(fieldX, fieldY, fieldW, fieldH);
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 3;
        ctx.strokeRect(fieldX, fieldY, fieldW, fieldH);

        // Territory circles packed across the meadow.
        const px = Math.max(14, metres * 3.4);
        const cols = Math.max(1, Math.floor(fieldW / px));
        const rows = Math.max(1, Math.floor(fieldH / px));
        const count = cols * rows;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cx = fieldX + px * (c + 0.5);
                const cy = fieldY + px * (r + 0.5);
                ctx.fillStyle = 'rgba(79,70,229,0.18)';
                ctx.beginPath();
                ctx.arc(cx, cy, px * 0.44, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#4f46e5';
                ctx.lineWidth = 2;
                ctx.stroke();
                if (px > 26) {
                    ctx.font = `${Math.min(20, px * 0.4)}px serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText('🐦', cx, cy + px * 0.13);
                }
            }
        }
        outlineText(ctx, 'each circle is one territory', safeRight / 2, stageBottom - 28, 'bold 14px monospace');

        fitText(ctx, `${count} animal${count === 1 ? '' : 's'} fit in this meadow`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The meadow never changes size -- only the territory does',
            safeRight / 2, 118, safeRight - 24, 13);

        const msg = metres <= 6
            ? 'Tiny territories, like woodlice. Hundreds fit in one meadow.'
            : metres <= 18
                ? 'Medium territories, like robins. Only a handful fit.'
                : 'Huge territories, like foxes. The whole meadow holds almost none.';
        return { meter: { fraction: Math.min(1, count / 60), caption: 'How Many Animals Fit', low: 'Almost none', high: 'Very many' }, note: msg };
    };

    return (
        <LabCanvas
            title="Room to Live"
            readout={({ raw }) => `Each territory is about ${raw} metres across`}
            controlLabel="Territory Size"
            controlKey="territorySize"
            controlMin={2}
            controlMax={40}
            controlInitial={8}
            controlDisplay={raw => `${raw} metres across`}
            accent="indigo"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="P47 Complete!"
            completeSubtitle="How Do Species Share Habitats?"
            completeNote="Small territory, many animals. Big territory, very few!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
