import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

interface Oxide {
    formula: string;
    element: string;
    symbol: string;
    atoms: number;
    atomMass: number;
    oxygens: number;
    share: number;
    colour: string;
}

/** Shares rounded as the lesson rounds them, so the printed working multiplies out. */
const OXIDES: Oxide[] = [
    { formula: 'P₂O₅', element: 'phosphorus', symbol: 'P', atoms: 2, atomMass: 31, oxygens: 5, share: 0.437, colour: '#047857' },
    { formula: 'K₂O', element: 'potassium', symbol: 'K', atoms: 2, atomMass: 39, oxygens: 1, share: 0.830, colour: '#7c3aed' },
];
const OXYGEN = '#dc2626';
const BIGGEST = 142;

const numberOf = (dial: number): number => Math.max(0, Math.min(60, Math.round(dial)));
const bagOf = (dial: number): number => Math.max(1, Math.min(50, Math.round(dial)));

export const L3C9OxideLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const label = numberOf(raw);
        const bag = bagOf(raw2);
        const rowGap = Math.max(46, (stageBottom - 58 - stageTop - 16) / 2);
        const barX = 150;
        const barEnd = safeRight * 0.62;
        const px = safeRight * 0.66;
        const pw = safeRight - 16 - px;
        const kgs: number[] = [];

        OXIDES.forEach((ox, row) => {
            const y = stageTop + 16 + row * rowGap;
            const elementMass = ox.atoms * ox.atomMass;
            const formulaMass = elementMass + ox.oxygens * 16;
            outlineText(ctx, `${ox.formula}: ${ox.element} ${ox.atoms} x ${ox.atomMass} = ${elementMass} of ${formulaMass}`,
                30, y, 'bold 12px monospace', ox.colour, 'left', barEnd - 30);

            // The formula, atom by atom
            const cy = y + 22;
            for (let i = 0; i < ox.atoms + ox.oxygens; i++) {
                const isElement = i < ox.atoms;
                const cx = 38 + i * 16;
                ctx.fillStyle = isElement ? ox.colour : OXYGEN;
                ctx.beginPath();
                ctx.arc(cx, cy, isElement ? 7.5 : 6, 0, Math.PI * 2);
                ctx.fill();
                outlineText(ctx, isElement ? ox.symbol : 'O', cx, cy + 4, 'bold 9px monospace', '#ffffff', 'center', 12);
            }

            // The formula mass as a bar, split into the element and the oxygen
            const scale = (barEnd - barX) / BIGGEST;
            const wEl = elementMass * scale;
            const wO = ox.oxygens * 16 * scale;
            ctx.fillStyle = ox.colour;
            ctx.fillRect(barX, cy - 8, wEl, 16);
            ctx.fillStyle = OXYGEN;
            ctx.fillRect(barX + wEl, cy - 8, wO, 16);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, cy - 8, wEl + wO, 16);
            outlineText(ctx, `${ox.symbol} ${elementMass}`, barX + wEl / 2, cy + 4, 'bold 10px monospace', '#ffffff', 'center', wEl - 4);
            if (wO > 30) {
                outlineText(ctx, `O ${ox.oxygens * 16}`, barX + wEl + wO / 2, cy + 4, 'bold 10px monospace', '#ffffff', 'center', wO - 4);
            }

            const pct = label * ox.share;
            const kg = (bag * pct) / 100;
            kgs.push(kg);
            outlineText(ctx, `${label} x ${ox.share.toFixed(3)} = ${pct.toFixed(2)}%`, px, y, '12px monospace', '#334155', 'left', pw);
            outlineText(ctx, `${kg.toFixed(2)} kg of ${ox.element}`, px, y + 22, 'bold 13px monospace', ox.colour, 'left', pw);
        });

        const [kgP, kgK] = kgs;
        outlineText(ctx, `as a P number: ${bag} kg x ${(label * 0.437).toFixed(2)} / 100 = ${kgP.toFixed(2)} kg of phosphorus`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', OXIDES[0].colour, 'center', safeRight - 30);
        outlineText(ctx, `as a K number: ${bag} kg x ${(label * 0.83).toFixed(2)} / 100 = ${kgK.toFixed(2)} kg of potassium`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', OXIDES[1].colour, 'center', safeRight - 30);

        fitText(ctx, `${label} on a ${bag} kg bag: ${kgP.toFixed(2)} kg of P or ${kgK.toFixed(2)} kg of K`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, "Oxide number x the element's share", safeRight / 2, 118, safeRight - 24, 13);

        const most = (bag * 60 * 0.437) / 100;
        return {
            meter: {
                fraction: most > 0 ? Math.max(0, Math.min(1, kgP / most)) : 0,
                caption: 'Phosphorus in the Bag',
                low: '0 kg',
                high: `${most.toFixed(1)} kg`,
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `Read as a P number, ${label} on a ${bag} kg bag is ${kgP.toFixed(2)} kg of phosphorus. Read as a K number, it is ${kgK.toFixed(2)} kg of potassium.`,
        };
    };

    return (
        <LabCanvas
            title="What the P and K Numbers Really Mean"
            readout={({ raw }) => `Label number ${numberOf(raw)}`}
            controlLabel="Label Number"
            controlKey="labelNumber"
            controlMin={0}
            controlMax={60}
            controlInitial={5}
            controlDisplay={raw => `${numberOf(raw)}`}
            control2={{
                label: 'Bag Mass',
                key: 'bagMass',
                min: 1,
                max: 50,
                initial: 20,
                display: raw => `${bagOf(raw)} kg`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="What the P and K Numbers Really Mean"
            completeNote="Oxide number times the share!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
