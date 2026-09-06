import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const AVOGADRO = 6.022e23;

const KNOWN: { m: number; name: string }[] = [
    { m: 2, name: 'hydrogen gas H₂' },
    { m: 18, name: 'water H₂O' },
    { m: 32, name: 'oxygen gas O₂' },
    { m: 44, name: 'carbon dioxide CO₂' },
    { m: 180, name: 'glucose' },
];

export const L3C2MoleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grams = Math.max(1, Math.round(raw));
        const molar = Math.max(1, Math.round(raw2));
        const moles = grams / molar;
        const particles = moles * AVOGADRO;

        const match = KNOWN.find(k => k.m === molar);

        // A balance pan holding the sample
        const panX = safeRight * 0.28;
        const panY = stageTop + 118;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(panX - 70, panY);
        ctx.lineTo(panX + 70, panY);
        ctx.moveTo(panX, panY);
        ctx.lineTo(panX, panY + 62);
        ctx.stroke();
        const heap = Math.max(16, Math.min(70, Math.sqrt(grams) * 6));
        ctx.fillStyle = '#0d9488';
        ctx.beginPath();
        ctx.moveTo(panX - heap, panY);
        ctx.quadraticCurveTo(panX, panY - heap * 0.95, panX + heap, panY);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `${grams} g on the balance`, panX, panY + 84,
            'bold 13px monospace', '#0f172a', 'center', 220);
        if (match) {
            outlineText(ctx, match.name, panX, panY + 102, 'bold 12px monospace', '#0f766e', 'center', 230);
        }

        // The division, then the count
        const tx = safeRight * 0.6;
        ctx.textAlign = 'left';
        ctx.font = '13px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(`n = m / M`, tx, stageTop + 66);
        ctx.fillText(`  = ${grams} g / ${molar} g/mol`, tx, stageTop + 92);
        ctx.font = 'bold 15px monospace';
        ctx.fillStyle = '#0f766e';
        ctx.fillText(`  = ${moles.toFixed(3)} mol`, tx, stageTop + 120);
        ctx.font = '13px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(`x 6.022 x 10²³`, tx, stageTop + 152);
        ctx.textAlign = 'center';

        const exponent = Math.floor(Math.log10(particles));
        const mantissa = particles / Math.pow(10, exponent);
        outlineText(ctx, `${mantissa.toFixed(2)} x 10^${exponent} particles`,
            safeRight / 2, stageBottom - 34, 'bold 15px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the grams cancel, and mol is the unit left',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${moles.toFixed(3)} mol`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Same mass, different substance, very different particle count',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, moles / 10)),
                caption: 'How Many Moles',
                low: 'Almost none',
                high: 'Ten moles',
            },
            note: `${grams} g of a substance with molar mass ${molar} g/mol is ${moles.toFixed(3)} mol. Heavier molecules mean fewer of them per gram.`,
        };
    };

    return (
        <LabCanvas
            title="Counting the Uncountable"
            readout={({ raw }) => `${Math.max(1, Math.round(raw))} g weighed out`}
            controlLabel="Mass"
            controlKey="moleMass"
            controlMin={1}
            controlMax={200}
            controlInitial={36}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} g`}
            control2={{
                label: 'Molar Mass',
                key: 'molarMass',
                min: 2,
                max: 200,
                initial: 18,
                display: raw => `${Math.max(1, Math.round(raw))} g/mol`,
            }}
            accent="emerald"
            sky={['#f0fdfa', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Counting the Uncountable"
            completeNote="n = m / M, and the grams cancel!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
