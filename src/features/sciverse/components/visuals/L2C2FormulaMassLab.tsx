import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const M_CARBON = 12;
const M_HYDROGEN = 1;

export const L2C2FormulaMassLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const nC = Math.max(1, Math.round(raw));
        const nH = Math.max(0, Math.round(raw2));

        const massC = nC * M_CARBON;
        const massH = nH * M_HYDROGEN;
        const formulaMass = massC + massH;
        const pctC = (massC / formulaMass) * 100;

        const formula = `C${nC > 1 ? nC : ''}${nH > 0 ? 'H' + (nH > 1 ? nH : '') : ''}`;
        const named = nC === 1 && nH === 4 ? 'methane' : nC === 2 && nH === 6 ? 'ethane'
            : nC === 3 && nH === 8 ? 'propane' : nC === 8 && nH === 18 ? 'octane' : '';

        // Atoms: carbons large and dark, hydrogens small and pale
        const midY = stageTop + 130;
        const cR = 17;
        const hR = 8;
        const cSpan = Math.min(safeRight - 90, nC * (cR * 2 + 12));
        const cStart = safeRight / 2 - cSpan / 2 + cR;
        for (let i = 0; i < nC; i++) {
            const cx = cStart + i * (cSpan / Math.max(1, nC));
            ctx.fillStyle = '#334155';
            ctx.beginPath();
            ctx.arc(cx, midY, cR, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('C', cx, midY + 5);
        }
        for (let i = 0; i < Math.min(nH, 24); i++) {
            const perRow = 12;
            const hx = safeRight / 2 - (Math.min(nH, perRow) * 22) / 2 + (i % perRow) * 22 + 11;
            const hy = midY + 52 + Math.floor(i / perRow) * 24;
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.arc(hx, hy, hR, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = '#475569';
            ctx.font = 'bold 9px monospace';
            ctx.fillText('H', hx, hy + 3);
        }

        outlineText(ctx, named ? `${formula}  --  ${named}` : formula,
            safeRight / 2, stageTop + 62, 'bold 20px monospace', '#0f172a', 'center', safeRight - 40);

        // The sum, written out
        const sumY = stageBottom - 62;
        outlineText(ctx, `${nC} x 12 + ${nH} x 1 = ${massC} + ${massH} = ${formulaMass}`,
            safeRight / 2, sumY, 'bold 14px monospace', '#0f172a', 'center', safeRight - 30);

        // Share of the mass that is carbon
        const barW = Math.min(300, safeRight - 120);
        const barX = safeRight / 2 - barW / 2;
        const barY = sumY + 14;
        ctx.fillStyle = '#334155';
        ctx.fillRect(barX, barY, barW * (pctC / 100), 16);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(barX + barW * (pctC / 100), barY, barW * (1 - pctC / 100), 16);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(barX, barY, barW, 16);
        outlineText(ctx, `carbon is ${pctC.toFixed(0)}% of the mass`, safeRight / 2, barY + 30,
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `Formula mass ${formulaMass}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Count the atoms, add the masses -- no balance needed',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, pctC / 100)),
                caption: 'Share of the Mass That Is Carbon',
                low: 'Mostly hydrogen',
                high: 'Almost all carbon',
            },
            note: `Each carbon adds 12 and each hydrogen adds 1, so carbon takes ${pctC.toFixed(0)}% of the mass from just ${nC} of the ${nC + nH} atoms.`,
        };
    };

    return (
        <LabCanvas
            title="What Does an Atom Weigh?"
            readout={({ raw }) => `${Math.max(1, Math.round(raw))} carbon atom${Math.round(raw) === 1 ? '' : 's'} in the molecule`}
            controlLabel="Carbon Atoms"
            controlKey="carbonAtoms"
            controlMin={1}
            controlMax={8}
            controlInitial={1}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} carbon`}
            control2={{
                label: 'Hydrogen Atoms',
                key: 'hydrogenAtoms',
                min: 0,
                max: 18,
                initial: 4,
                display: raw => `${Math.max(0, Math.round(raw))} hydrogen`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="What Does an Atom Weigh?"
            completeNote="Count the atoms, add the masses!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
