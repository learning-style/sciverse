import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** A mine in cross-section: the deeper the ore, the further every load is lifted. */
export const P49DiggingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, t, stageTop, stageBottom }: LabScene) => {
        const metres = Math.round(raw);
        const groundY = stageTop + 52;
        const floor = stageBottom - 40;
        const usable = floor - groundY;
        // 500 m maps to the full depth of the drawing, so the shaft visibly grows.
        const oreY = groundY + Math.max(26, (metres / 500) * usable);

        // Sky above, rock below
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(0, stageTop, safeRight, groundY - stageTop);
        ctx.fillStyle = '#c8a27a';
        ctx.fillRect(0, groundY, safeRight, floor - groundY);

        // The waste rock lying on top of the ore
        ctx.fillStyle = 'rgba(120,90,60,0.35)';
        ctx.fillRect(0, groundY, safeRight, oreY - groundY);

        // The ore layer itself
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(0, oreY, safeRight, Math.min(26, floor - oreY));
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, oreY, safeRight, Math.min(26, floor - oreY));

        // The shaft
        const shaftX = safeRight * 0.5 - 15;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(shaftX, groundY, 30, oreY - groundY);

        // The winch at the surface, and the load climbing it
        ctx.fillStyle = '#334155';
        ctx.fillRect(shaftX - 14, groundY - 26, 58, 8);
        const climb = (t * 0.22) % 1;
        const loadY = oreY - climb * (oreY - groundY);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(shaftX + 6, loadY - 9, 18, 14);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shaftX + 15, groundY - 22);
        ctx.lineTo(shaftX + 15, loadY - 9);
        ctx.stroke();

        outlineText(ctx, 'waste rock', safeRight * 0.18, groundY + (oreY - groundY) / 2 + 4,
            'bold 13px monospace', '#3f2d1c');
        if (floor - oreY > 14) {
            outlineText(ctx, 'ore', safeRight * 0.18, oreY + 17, 'bold 13px monospace', '#7c2d12');
        }
        outlineText(ctx, 'every load is lifted all the way up the shaft',
            safeRight / 2, stageBottom - 16, 'bold 13px monospace');

        // Energy per load rises straight with the height it is lifted.
        const energy = metres / 500;
        fitText(ctx, `Lifting every load ${metres} metres`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The amount of metal never changes -- only how far it must come up',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = metres <= 60
            ? 'Shallow ore. A short lift, so each load is cheap.'
            : metres <= 250
                ? 'Deeper now. Every load costs more, and the water must be pumped out.'
                : 'Very deep. Huge energy per load, and fresh air has to be pumped down.';
        return {
            meter: { fraction: energy, caption: 'Energy Needed Per Load', low: 'A little', high: 'A great deal' },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Cost of Digging"
            readout={({ raw }) => `The ore lies ${Math.round(raw)} metres below the surface`}
            controlLabel="Ore Depth"
            controlKey="oreDepth"
            controlMin={10}
            controlMax={500}
            controlInitial={40}
            controlDisplay={raw => `${Math.round(raw)} metres down`}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="P49 Complete!"
            completeSubtitle="How Do We Use Earth's Resources Responsibly?"
            completeNote="Deeper ore means more energy for every load!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
