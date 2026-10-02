import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// 700 GtC of excess against a Revelle factor of 20 is 280 years, so the meter spans
// 300 and nothing pegs at the extremes.
const MAX_YEARS = 300;
const SEA = '#047857';
const SLOW = '#064e3b';

const excessOf = (dial: number): number => Math.round(dial / 10) * 10;
const revelleOf = (dial: number): number => Math.round(dial * 10) / 10;

// the sea takes up 50 GtC a year divided by how reluctant it has become
const uptakeOf = (revelle: number): number => 50 / revelle;

export const L3C21RevelleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const excess = excessOf(raw);
        const revelle = revelleOf(raw2);
        const uptake = uptakeOf(revelle);
        const years = excess / uptake;
        const slow = years > 120;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(30, usable * 0.18));
        const boxH = Math.max(46, Math.min(150, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const boxTop = top + capBand;
        const boxBottom = boxTop + boxH;

        // the surface layer of the sea, with the carbonate still within reach as dots
        const boxW = Math.max(120, Math.min(safeRight - 48, 300));
        const left = (safeRight - boxW) / 2;

        ctx.fillStyle = '#ecfdf5';
        ctx.fillRect(left, boxTop, boxW, boxH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, boxTop, boxW, boxH);

        // a reluctant sea has spent most of its carbonate: 20 dots at Revelle 5, 5 at 20
        const dots = Math.max(4, Math.round(100 / revelle));
        const cols = Math.max(4, Math.min(10, Math.ceil(Math.sqrt(dots * 1.8))));
        const rows = Math.ceil(dots / cols);
        const dx = boxW / (cols + 1);
        const dy = Math.max(9, Math.min(20, (boxH - 18) / (rows + 1)));
        const gridTop = boxTop + (boxH - (rows - 1) * dy) / 2;
        for (let i = 0; i < dots; i++) {
            const cxDot = left + dx * ((i % cols) + 1);
            const cyDot = gridTop + dy * Math.floor(i / cols)
                + Math.sin(t * 1.6 + i) * 1.6;
            ctx.fillStyle = SEA;
            ctx.beginPath();
            ctx.arc(cxDot, Math.max(boxTop + 6, Math.min(boxBottom - 6, cyDot)), 3.4, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'carbonate still within reach in the surface layer',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻',
            safeRight / 2, Math.min(boxBottom + 14, artBottom - 14),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'each CO₂ absorbed spends one carbonate ion',
            safeRight / 2, Math.min(boxBottom + labelTail + 10, artBottom),
            'bold 11px monospace', slow ? SLOW : SEA, 'center', safeRight - 30);

        outlineText(ctx, 'excess ' + excess + ' GtC / net uptake ' + uptake.toFixed(1)
            + ' GtC a year = ' + years.toFixed(0) + ' years',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'Revelle factor ' + revelle.toFixed(1)
            + ', so the sea takes up 1 part in ' + revelle.toFixed(0)
            + ' of what its size suggests',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', slow ? SLOW : SEA,
            'center', safeRight - 30);

        fitText(ctx, years.toFixed(0) + ' years to drain the easy part',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A sink that is consumed by its own work',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, years / MAX_YEARS)),
                caption: 'Years to Drain the Easy Part',
                low: 'drains quickly',
                high: 'centuries of it',
                stops: ['#ecfdf5', '#6ee7b7', SEA] as [string, string, string],
            },
            note: 'An excess of ' + excess + ' GtC at a net uptake of ' + uptake.toFixed(1)
                + ' GtC a year takes about ' + years.toFixed(0)
                + ' years. A Revelle factor of ' + revelle.toFixed(1)
                + ' means the sea takes up 1 part in ' + revelle.toFixed(0)
                + ' of what its size suggests.',
        };
    };

    return (
        <LabCanvas
            title="Why the Excess Outlasts the Atom"
            readout={({ raw }) => 'An excess of ' + excessOf(raw) + ' GtC in the air'}
            controlLabel="Excess Carbon"
            controlKey="excessCarbon"
            controlMin={100}
            controlMax={700}
            controlInitial={300}
            controlDisplay={raw => excessOf(raw) + ' GtC'}
            control2={{
                label: 'How Reluctant the Sea Is',
                key: 'revelleFactor',
                min: 50,
                max: 200,
                initial: 100,
                display: raw => 'Revelle factor ' + revelleOf(raw).toFixed(1),
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Cycles Keep Systems Alive?"
            completeNote="The sink is consumed by its own work!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
