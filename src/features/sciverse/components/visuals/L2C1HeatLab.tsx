import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUBSTANCES: { name: string; c: number; colour: string }[] = [
    { name: 'water', c: 4.2, colour: '#0284c7' },
    { name: 'iron', c: 0.45, colour: '#78716c' },
];

export const L2C1HeatLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grams = Math.round(raw);
        const rise = Math.round(raw2);

        const energies = SUBSTANCES.map(s => grams * s.c * rise);
        const biggest = Math.max(...energies, 1);

        // Fixed bands, so nothing can collide. The value label sits above its
        // bar, and barTop is set low enough that even a full-height bar leaves
        // clear air under the formula line.
        const formulaY = stageTop + 20;
        const barTop = stageTop + 56;
        const baseY = stageBottom - 82;
        const maxH = Math.max(60, baseY - barTop);
        const barW = Math.min(96, (safeRight - 120) / 2);

        outlineText(ctx, `Q = ${grams} g x c x ${rise} °C`, safeRight / 2, formulaY,
            'bold 14px monospace', '#0f172a', 'center', safeRight - 40);

        SUBSTANCES.forEach((s, i) => {
            const q = energies[i];
            const h = (q / biggest) * maxH;
            const bx = safeRight / 2 + (i === 0 ? -barW - 26 : 26);
            ctx.fillStyle = s.colour;
            ctx.fillRect(bx, baseY - h, barW, h);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(bx, baseY - h, barW, h);
            outlineText(ctx, `${Math.round(q).toLocaleString()} J`, bx + barW / 2, baseY - h - 10,
                'bold 13px monospace', '#0f172a', 'center', barW + 20);
            outlineText(ctx, s.name, bx + barW / 2, baseY + 18,
                'bold 14px monospace', '#0f172a', 'center', barW + 20);
            outlineText(ctx, `c = ${s.c} J/g/°C`, bx + barW / 2, baseY + 36,
                'bold 11px monospace', '#334155', 'center', barW + 22);
        });

        outlineText(ctx, 'same mass, same temperature rise -- only c differs',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        const ratio = energies[0] / Math.max(1, energies[1]);
        fitText(ctx, `Water needs ${ratio.toFixed(1)} times the energy iron does`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Q = m x c x dT -- all three multiplied, so all three behave the same way',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.min(1, energies[0] / 170000),
                caption: 'Energy the Water Needs',
                low: 'A little',
                high: 'A great deal',
            },
            note: `Heating ${grams} g of water by ${rise} °C takes ${Math.round(energies[0]).toLocaleString()} J. The same job on iron takes ${Math.round(energies[1]).toLocaleString()} J.`,
        };
    };

    return (
        <LabCanvas
            title="How Much Heat?"
            readout={({ raw }) => `Heating ${Math.round(raw)} g of water and ${Math.round(raw)} g of iron`}
            controlLabel="Mass"
            controlKey="heatMass"
            controlMin={50}
            controlMax={500}
            controlInitial={200}
            controlDisplay={raw => `${Math.round(raw)} grams`}
            control2={{
                label: 'Temperature Rise',
                key: 'tempRise',
                min: 5,
                max: 80,
                initial: 30,
                display: raw => `${Math.round(raw)} °C hotter`,
            }}
            accent="emerald"
            sky={['#f0fdfa', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Much Heat?"
            completeNote="Q = m x c x dT -- within one state!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
