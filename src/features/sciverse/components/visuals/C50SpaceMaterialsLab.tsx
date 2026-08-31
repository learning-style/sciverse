import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C50SpaceMaterialsLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, t, stageTop, stageBottom }: LabScene) => {
        const years = Math.round(raw);
        // Panels lose a little over one part in seventy every year.
        const power = Math.max(0, 100 - years * 1.45);
        const wear = years / 20;

        const cx = safeRight / 2;
        const cy = (stageTop + stageBottom) / 2 + 6;

        // Sunlight on one side, the Earth's shadow on the other
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, stageTop, safeRight, stageBottom - stageTop);
        ctx.fillStyle = 'rgba(253,224,71,0.13)';
        ctx.fillRect(0, stageTop, safeRight / 2, stageBottom - stageTop);
        ctx.font = '26px serif';
        ctx.textAlign = 'center';
        ctx.fillText('☀️', 44, stageTop + 44);
        outlineText(ctx, '120 °C in sunlight', safeRight * 0.25, stageBottom - 24, 'bold 13px monospace', '#fde68a', 'center', safeRight * 0.5 - 8);
        outlineText(ctx, '-100 °C in shadow', safeRight * 0.75, stageBottom - 24, 'bold 13px monospace', '#bfdbfe', 'center', safeRight * 0.5 - 8);

        // The body in its heat blanket. It looks golden because the plastic
        // film is faintly orange, not because there is any gold in it.
        const blanket = `rgb(${Math.round(212 - wear * 60)}, ${Math.round(175 - wear * 60)}, ${Math.round(55 + wear * 30)})`;
        ctx.fillStyle = blanket;
        ctx.fillRect(cx - 30, cy - 26, 60, 52);
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 30, cy - 26, 60, 52);

        // The solar panels, darkening as they fade
        const panel = `rgb(${Math.round(37 + wear * 40)}, ${Math.round(78 + wear * 30)}, ${Math.round(200 - wear * 90)})`;
        ctx.fillStyle = panel;
        ctx.fillRect(cx - 108, cy - 13, 74, 26);
        ctx.fillRect(cx + 34, cy - 13, 74, 26);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 108, cy - 13, 74, 26);
        ctx.strokeRect(cx + 34, cy - 13, 74, 26);

        // Pits from flying specks, building up year by year
        const pits = years * 5;
        for (let i = 0; i < pits; i++) {
            const px = cx - 108 + ((i * 61) % 216);
            const py = cy - 26 + ((i * 37) % 52);
            ctx.fillStyle = 'rgba(226,232,240,0.55)';
            ctx.beginPath();
            ctx.arc(px, py, 1.1, 0, Math.PI * 2);
            ctx.fill();
        }

        // A speck arriving
        const sx = ((t * 90) % (safeRight + 60)) - 30;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(sx, cy - 64, 3, 2);

        outlineText(ctx, 'heat blanket over the metal box', cx, cy - 38, 'bold 12px monospace', '#fde68a', 'center', safeRight - 40);
        outlineText(ctx, 'solar panels under special glass', cx, cy + 46, 'bold 12px monospace', '#bfdbfe', 'center', safeRight - 40);

        fitText(ctx, `${years} year${years === 1 ? '' : 's'} in space: panels make ${Math.round(power)}% of what they made when new`,
            cx, 94, safeRight - 24, 16, '#f8fafc');
        fitText(ctx, 'Roasted and frozen 16 times a day, every day, for years',
            cx, 118, safeRight - 24, 13, '#cbd5e1');

        const note = years === 0
            ? 'Brand new. Full power, bright blanket, not a single pit.'
            : years < 8
                ? 'The blanket is dulling and the first pits are showing.'
                : years < 15
                    ? 'Panels fading. This is why spare ones were fitted at launch.'
                    : 'Twenty years of roasting and freezing. Only the spare panels keep it alive.';
        return {
            meter: {
                fraction: power / 100,
                caption: 'Power the Panels Make',
                low: 'Not enough',
                high: 'As good as new',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Built for Space"
            readout={({ raw }) => `${Math.round(raw)} year${Math.round(raw) === 1 ? '' : 's'} of sunlight, heat and cold`}
            controlLabel="Years in Space"
            controlKey="yearsInSpace"
            controlMin={0}
            controlMax={20}
            controlInitial={0}
            controlDisplay={raw => `${Math.round(raw)} years`}
            accent="emerald"
            sky={['#0f172a', '#0f172a']}
            completeTitle="C50 Complete!"
            completeSubtitle="How Do Satellites Help Life on Earth?"
            completeNote="Space is harsh, so materials are chosen to last!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
