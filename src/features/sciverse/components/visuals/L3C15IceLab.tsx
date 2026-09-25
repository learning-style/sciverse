import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const PRODUCT = '#047857';
const REACTANT = '#1d4ed8';

const startOf = (dial: number): number => Math.max(0.2, Math.min(2, Math.round(dial * 20) / 20));
const kcOf = (dial: number): number => Math.max(10, Math.min(100, Math.round(dial)));

export const L3C15IceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = startOf(raw);
        const kc = kcOf(raw2);
        const root = Math.sqrt(kc);
        // Both sides are perfect squares, so the root solves it without a quadratic
        const x = (start * root) / (2 + root);
        const hi = 2 * x;
        const left = start - x;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        // The real space, not a floor: inventing height ran the bars under the
        // footer text on a short canvas.
        const usable = artBottom - artTop;

        // The ICE table itself, filled in from the dials, with the equilibrium
        // row drawn to scale underneath so the numbers can also be compared.
        // On a short stage the bars are dropped rather than squeezed, because
        // the table is the point.
        const rowH = Math.max(14, Math.min(40, usable * 0.19));
        const tableH = rowH * 4;
        const showBars = usable - tableH - 10 >= 20;
        const barH = showBars ? Math.max(20, Math.min(70, usable - tableH - 14)) : 0;
        const blockH = tableH + (showBars ? 10 + barH : 0);
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const labelW = Math.min(96, safeRight * 0.28);
        const tableX = 22;
        const tableW = safeRight - 44;
        const colW = (tableW - labelW) / 3;
        const colX = (i: number): number => tableX + labelW + i * colW;

        // Whole font strings: a 'bold ' fragment inside an outlineText argument is
        // read by the checker as a word the canvas prints
        const cellPx = Math.max(9, Math.min(12, Math.round(rowH * 0.42)));
        const cellFont = `${cellPx}px monospace`;
        const cellBold = `bold ${cellPx}px monospace`;

        // Header: the three species
        ctx.fillStyle = '#eef2ff';
        ctx.fillRect(tableX, top, tableW, rowH);
        const species: [string, string][] = [['H₂', REACTANT], ['I₂', REACTANT], ['HI', PRODUCT]];
        species.forEach(([name, colour], i) => {
            outlineText(ctx, name, colX(i) + colW / 2, top + rowH * 0.68,
                cellBold, colour, 'center', colW - 6);
        });
        outlineText(ctx, 'ICE table', tableX + labelW / 2, top + rowH * 0.68,
            cellBold, '#475569', 'center', labelW - 6);

        const row = (i: number, label: string, cells: string[], bold: boolean) => {
            const y = top + rowH * (i + 1);
            if (bold) {
                ctx.fillStyle = '#ecfdf5';
                ctx.fillRect(tableX, y, tableW, rowH);
            }
            outlineText(ctx, label, tableX + labelW - 8, y + rowH * 0.68,
                bold ? cellBold : cellFont, '#475569', 'right', labelW - 10);
            cells.forEach((c, j) => {
                outlineText(ctx, c, colX(j) + colW / 2, y + rowH * 0.68,
                    bold ? cellBold : cellFont, '#0f172a', 'center', colW - 6);
            });
        };
        row(0, 'Initial', [start.toFixed(2), start.toFixed(2), '0'], false);
        row(1, 'Change', [`−${x.toFixed(4)}`, `−${x.toFixed(4)}`, `+${hi.toFixed(4)}`], false);
        row(2, 'Equilibrium', [left.toFixed(4), left.toFixed(4), hi.toFixed(4)], true);

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(tableX, top, tableW, tableH);
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(tableX, top + rowH * i);
            ctx.lineTo(tableX + tableW, top + rowH * i);
            ctx.stroke();
        }
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(colX(i), top);
            ctx.lineTo(colX(i), top + tableH);
            ctx.stroke();
        }

        // The equilibrium row, to scale: mol/L per column
        if (showBars) {
            const barY = top + tableH + 10;
            const tallest = Math.max(hi, start);
            [left, left, hi].forEach((value, i) => {
                const w = (colW - 14) * (value / tallest);
                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(colX(i) + 7, barY, colW - 14, barH);
                ctx.fillStyle = i === 2 ? PRODUCT : REACTANT;
                ctx.fillRect(colX(i) + 7, barY, w, barH);
                ctx.strokeStyle = '#0f172a';
                ctx.strokeRect(colX(i) + 7, barY, colW - 14, barH);
            });
            outlineText(ctx, 'mol/L', tableX + labelW - 8, barY + barH / 2 + 4,
                cellFont, '#475569', 'right', labelW - 10);
        }

        outlineText(ctx, `2x / (${start.toFixed(2)} − x) = √${kc} = ${root.toFixed(3)}, so x = ${x.toFixed(4)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `check: ${hi.toFixed(4)}² / (${left.toFixed(4)} x ${left.toFixed(4)}) = ${(hi * hi / (left * left)).toFixed(1)}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', PRODUCT, 'center', safeRight - 30);

        fitText(ctx, `x = ${x.toFixed(4)} mol/L reacted`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'ICE table, then square root', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, x / start)),
                caption: 'Reacted',
                low: '0',
                high: '1',
                stops: ['#eff6ff', '#6ee7b7', PRODUCT] as [string, string, string],
            },
            note: `Starting with ${start.toFixed(2)} mol/L of each and Kc = ${kc}: the change is −${x.toFixed(4)} for H₂ and I₂ and +${hi.toFixed(4)} for HI, leaving ${left.toFixed(4)}, ${left.toFixed(4)} and ${hi.toFixed(4)} mol/L at equilibrium. Check: ${(hi * hi / (left * left)).toFixed(1)}.`,
        };
    };

    return (
        <LabCanvas
            title="Powers, Not Just Ratios"
            readout={({ raw }) => `Starting with ${startOf(raw).toFixed(2)} mol/L of each`}
            controlLabel="Starting Concentration"
            controlKey="startConc"
            controlMin={0.2}
            controlMax={2}
            controlInitial={1}
            controlDisplay={raw => `${startOf(raw).toFixed(2)} mol/L`}
            control2={{
                label: 'Equilibrium Constant Kc',
                key: 'kcValue',
                min: 10,
                max: 100,
                initial: 54,
                display: raw => `Kc = ${kcOf(raw)}`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Powers, Not Just Ratios"
            completeNote="Kc = [HI]² / ([H₂][I₂])!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
