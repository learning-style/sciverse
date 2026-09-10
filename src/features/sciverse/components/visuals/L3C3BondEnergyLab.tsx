import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const L3C3BondEnergyLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const broken = Math.max(100, Math.round(raw));
        const formed = Math.max(100, Math.round(raw2));
        const dH = broken - formed;

        // Energy profile, measured from the chemicals' point of view:
        // start at 0, climb by the breaking cost, fall by the making release.
        const plotX = 60;
        const w = safeRight - plotX - 40;
        const top = stageTop + 44;
        const bottom = stageBottom - 70;
        const h = Math.max(120, bottom - top);
        const maxE = Math.max(broken, 0);
        const minE = Math.min(0, dH);
        const range = Math.max(1, maxE - minE);
        const yOf = (energy: number): number => top + ((maxE - energy) / range) * h;

        const level = (fromFrac: number, toFrac: number, energy: number): void => {
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(plotX + w * fromFrac, yOf(energy));
            ctx.lineTo(plotX + w * toFrac, yOf(energy));
            ctx.stroke();
        };
        const vArrow = (x: number, yFrom: number, yTo: number, colour: string): void => {
            ctx.strokeStyle = colour;
            ctx.fillStyle = colour;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x, yFrom);
            ctx.lineTo(x, yTo);
            ctx.stroke();
            if (Math.abs(yTo - yFrom) > 12) {
                const dir = yTo > yFrom ? 1 : -1;
                ctx.beginPath();
                ctx.moveTo(x, yTo);
                ctx.lineTo(x - 8, yTo - dir * 12);
                ctx.lineTo(x + 8, yTo - dir * 12);
                ctx.closePath();
                ctx.fill();
            }
        };

        // Where the chemicals began, carried across for comparison
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(plotX, yOf(0));
        ctx.lineTo(plotX + w, yOf(0));
        ctx.stroke();
        ctx.setLineDash([]);

        level(0, 0.22, 0);
        level(0.39, 0.61, broken);
        level(0.72, 0.92, dH);

        // Colour follows the chemicals' energy: green gaining, red losing
        vArrow(plotX + w * 0.305, yOf(0), yOf(broken), '#16a34a');
        vArrow(plotX + w * 0.665, yOf(broken), yOf(dH), '#dc2626');
        if (dH !== 0) {
            vArrow(plotX + w * 0.97, yOf(0), yOf(dH), dH < 0 ? '#dc2626' : '#16a34a');
        }

        outlineText(ctx, 'start', plotX + w * 0.11, yOf(0) + 18, 'bold 12px monospace', '#0f172a', 'center', w * 0.22);
        outlineText(ctx, 'loose atoms', plotX + w * 0.5, yOf(broken) - 10, 'bold 12px monospace', '#0f172a', 'center', w * 0.22);
        outlineText(ctx, 'products', plotX + w * 0.82, yOf(dH) + 18, 'bold 12px monospace', '#0f172a', 'center', w * 0.2);

        const sign = dH > 0 ? '+' : '';
        outlineText(ctx, `ΔH = ${broken} − ${formed} = ${sign}${dH} kJ`,
            safeRight / 2, stageBottom - 34, 'bold 14px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, dH < 0 ? 'exothermic -- energy leaves the chemicals as heat'
            : dH > 0 ? 'endothermic -- the chemicals take energy from the surroundings'
                : 'the reaction neither warms nor cools its surroundings',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `ΔH = ${sign}${dH} kJ, ${dH < 0 ? 'exothermic' : dH > 0 ? 'endothermic' : 'neither'}`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Break first, then make: breaking always costs, making always releases',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = dH < 0
            ? `Making the new bonds releases ${formed} kJ, more than the ${broken} kJ breaking cost, so the chemicals end with ${-dH} kJ less and that energy leaves as heat.`
            : dH > 0
                ? `Breaking costs ${broken} kJ but making releases only ${formed} kJ, so the chemicals end ${dH} kJ higher, taken from the surroundings.`
                : 'Breaking and making are equal, so the reaction neither warms nor cools its surroundings.';
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (-dH + 2000) / 4000)),
                caption: 'Exothermic or Endothermic',
                low: 'Endothermic',
                high: 'Exothermic',
                // Asserted as a tuple: drawScene is a standalone const, so the
                // contextual type never reaches this literal. Colours match the
                // arrows -- green where the chemicals gain, red where they lose.
                stops: ['#16a34a', '#e2e8f0', '#dc2626'] as [string, string, string],
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Where a Fuel's Energy Really Is"
            readout={({ raw }) => `Breaking bonds costs ${Math.max(100, Math.round(raw))} kJ`}
            controlLabel="Bonds Broken"
            controlKey="bondsBroken"
            controlMin={100}
            controlMax={3000}
            controlInitial={1370}
            controlDisplay={raw => `${Math.max(100, Math.round(raw))} kJ to break`}
            control2={{
                label: 'Bonds Formed',
                key: 'bondsFormed',
                min: 100,
                max: 3500,
                initial: 1856,
                display: raw => `${Math.max(100, Math.round(raw))} kJ released`,
            }}
            accent="emerald"
            sky={['#f0fdfa', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Where a Fuel's Energy Really Is"
            completeNote="Break first, then make!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
