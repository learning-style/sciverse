import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SYMBOLS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
/** Measured first ionisation energies, kJ/mol. */
const IONISATION = [1312, 2372, 520, 899, 801, 1086, 1402, 1314, 1681, 2081, 496, 738, 578, 786, 1012, 1000, 1251, 1521, 419, 590];
/** Places filled in order for the first twenty elements: 1s, then 2s2p, then 3s3p, then 4s. */
const FILL_ORDER = [2, 8, 8, 2];
/** Elements in each row of the table. */
const ROW_LENGTHS = [2, 8, 8, 18, 18, 32];
const MAX_IE = 2400;
const SHELL = '#047857';
const MARK = '#b45309';

const atomicOf = (dial: number): number => Math.max(1, Math.min(20, Math.round(dial)));
const shellOf = (dial: number): number => Math.max(1, Math.min(6, Math.round(dial)));

/** Electrons in each shell, filling 2, 8, 8, 2 in order. */
const arrangement = (z: number): number[] => {
    const shells: number[] = [];
    let left = z;
    for (const cap of FILL_ORDER) {
        if (left <= 0) break;
        shells.push(Math.min(left, cap));
        left -= Math.min(left, cap);
    }
    return shells;
};

export const L3C12ShellLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const z = atomicOf(raw);
        const n = shellOf(raw2);
        const shells = arrangement(z);
        const outer = shells[shells.length - 1];
        const row = shells.length;
        const group = row === 1 ? (z === 1 ? 1 : 18) : outer <= 2 ? outer : outer + 10;
        const capacity = 2 * n * n;
        const rowLength = ROW_LENGTHS[n - 1];

        // The atom: one ring for each shell, labelled with the electrons in it
        const cx = safeRight * 0.22;
        const cy = stageTop + (stageBottom - 70 - stageTop) * 0.5;
        const maxR = Math.min(safeRight * 0.18, (stageBottom - 70 - stageTop) * 0.42);
        ctx.fillStyle = MARK;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, `${z}`, cx, cy + 4, 'bold 11px monospace', '#ffffff', 'center', 20);
        shells.forEach((count, i) => {
            const rr = ((i + 1) / shells.length) * maxR;
            ctx.strokeStyle = i === shells.length - 1 ? SHELL : '#cbd5e1';
            ctx.lineWidth = i === shells.length - 1 ? 2 : 1;
            ctx.beginPath();
            ctx.arc(cx, cy, rr, 0, Math.PI * 2);
            ctx.stroke();
            outlineText(ctx, `${count}`, cx, cy - rr + 4, 'bold 11px monospace', i === shells.length - 1 ? SHELL : '#64748b', 'center', 30);
        });
        outlineText(ctx, `${SYMBOLS[z - 1]}: ${shells.join(', ')}`, cx, cy + maxR + 20, 'bold 12px monospace', '#0f172a', 'center', safeRight * 0.4);

        // The measured first ionisation energies, with this element marked
        const bx0 = safeRight * 0.44;
        const bx1 = safeRight - 20;
        const bTop = stageTop + 16;
        const bBottom = stageBottom - 76;
        const barW = (bx1 - bx0) / 20 - 2;
        IONISATION.forEach((ie, i) => {
            const x = bx0 + (i / 20) * (bx1 - bx0);
            const h = (ie / MAX_IE) * (bBottom - bTop);
            ctx.fillStyle = i + 1 === z ? MARK : '#a7f3d0';
            ctx.fillRect(x, bBottom - h, barW, h);
        });
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bx0, bBottom);
        ctx.lineTo(bx1, bBottom);
        ctx.stroke();
        outlineText(ctx, 'first ionisation energy, kJ/mol', (bx0 + bx1) / 2, bTop - 4, '11px monospace', '#475569', 'center', bx1 - bx0);
        outlineText(ctx, 'atomic number 1 to 20', (bx0 + bx1) / 2, bBottom + 14, '11px monospace', '#475569', 'center', bx1 - bx0);
        outlineText(ctx, `${SYMBOLS[z - 1]} ${IONISATION[z - 1].toLocaleString()}`, bx0 + (z - 1) / 20 * (bx1 - bx0) + barW / 2, bBottom + 30, 'bold 11px monospace', MARK, 'center', 90);

        outlineText(ctx, `${SYMBOLS[z - 1]}: shells ${shells.join(', ')}, ${outer} outer electrons, group ${group}, row ${row}`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `2n² for n = ${n}: ${capacity} places, but row ${n} holds ${rowLength} elements`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', SHELL, 'center', safeRight - 30);

        fitText(ctx, `${SYMBOLS[z - 1]} (${z}): ${outer} outer electrons`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Count the places, in energy order', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, IONISATION[z - 1] / MAX_IE)),
                caption: 'First Ionisation Energy',
                low: '0 kJ/mol',
                high: '2,400 kJ/mol',
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `${SYMBOLS[z - 1]} has ${z} electrons arranged ${shells.join(', ')}, so ${outer} sit in the outer shell. Shell ${n} has ${capacity} places, while row ${n} of the table holds ${rowLength} elements.`,
        };
    };

    return (
        <LabCanvas
            title="Why the Rows Are 2, 8, 8, 18"
            readout={({ raw }) => `${SYMBOLS[atomicOf(raw) - 1]}, atomic number ${atomicOf(raw)}`}
            controlLabel="Atomic Number"
            controlKey="atomicNumber"
            controlMin={1}
            controlMax={20}
            controlInitial={11}
            controlDisplay={raw => `${atomicOf(raw)} (${SYMBOLS[atomicOf(raw) - 1]})`}
            control2={{
                label: 'Shell Number n',
                key: 'shellNumber',
                min: 1,
                max: 6,
                initial: 3,
                display: raw => `n = ${shellOf(raw)}`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why the Rows Are 2, 8, 8, 18"
            completeNote="2n², filled in energy order!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
