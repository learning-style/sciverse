import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Standard electrode potentials from the lesson, compared with hydrogen at 0.00 V. true = label above the line. */
const METALS: [string, number, boolean][] = [
    ['magnesium', -2.37, true], ['zinc', -0.76, false], ['iron', -0.44, true],
    ['lead', -0.13, false], ['copper', 0.34, true], ['silver', 0.8, false],
];
const LINE_MIN = -2.6;
const LINE_MAX = 1.0;
const TARGET_V = 3.0;
const MAX_CELL = 0.8 - -2.37;

const metalOf = (dial: number): [string, number, boolean] => METALS[Math.max(0, Math.min(METALS.length - 1, Math.round(dial)))];
const signedV = (volts: number): string => `${volts < 0 ? '−' : '+'}${Math.abs(volts).toFixed(2)}`;

export const L2C7MetalsLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const [nameA, eA] = metalOf(raw);
        const [nameB, eB] = metalOf(raw2);
        const same = nameA === nameB;
        const minus: [string, number] = eA <= eB ? [nameA, eA] : [nameB, eB];
        const plus: [string, number] = eA <= eB ? [nameB, eB] : [nameA, eA];
        const cell = plus[1] - minus[1];
        const cellsNeeded = cell > 0 ? Math.ceil(TARGET_V / cell - 1e-9) : 0;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        outlineText(ctx, same ? `both electrodes: ${nameA} (${signedV(eA)} V)` : `− end: ${minus[0]} (${signedV(minus[1])} V)`,
            40, stageTop + 18, 'bold 12px monospace', '#334155', 'left', safeRight - 60);
        outlineText(ctx, same ? 'no − end and no + end' : `+ end: ${plus[0]} (${signedV(plus[1])} V)`,
            40, stageTop + 38, 'bold 12px monospace', '#334155', 'left', safeRight - 60);

        // The number line of electrode potentials
        const lineX = 50;
        const lineW = safeRight - 100;
        const axisY = stageTop + 84 * sy;
        const xOf = (potential: number): number => lineX + ((potential - LINE_MIN) / (LINE_MAX - LINE_MIN)) * lineW;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lineX, axisY);
        ctx.lineTo(lineX + lineW, axisY);
        ctx.stroke();

        const hx = xOf(0);
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(hx, axisY - 22);
        ctx.lineTo(hx, axisY + 6);
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, 'hydrogen 0.00', hx, axisY - 28, '11px monospace', '#475569', 'center', 96);

        const labelRoom = Math.max(28, lineW * 0.09);
        METALS.forEach(([name, e, above]) => {
            const mx = xOf(e);
            const chosen = name === nameA || name === nameB;
            ctx.fillStyle = chosen ? '#047857' : '#94a3b8';
            ctx.beginPath();
            ctx.arc(mx, axisY, chosen ? 6 : 4, 0, Math.PI * 2);
            ctx.fill();
            outlineText(ctx, name, mx, above ? axisY - 10 : axisY + 18, chosen ? 'bold 11px monospace' : '11px monospace',
                chosen ? '#065f46' : '#475569', 'center', labelRoom);
        });

        // The cell voltage, as the distance between the two metals
        const bracketY = axisY + 32;
        const x1 = xOf(minus[1]);
        const x2 = xOf(plus[1]);
        if (!same) {
            ctx.strokeStyle = '#047857';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x1, bracketY - 6);
            ctx.lineTo(x1, bracketY);
            ctx.lineTo(x2, bracketY);
            ctx.lineTo(x2, bracketY - 6);
            ctx.stroke();
        }
        const mid = Math.max(lineX + 40, Math.min(lineX + lineW - 40, (x1 + x2) / 2));
        outlineText(ctx, same ? '0.00 V' : `${cell.toFixed(2)} V`, mid, bracketY + 17, 'bold 13px monospace', '#065f46', 'center', 90);

        outlineText(ctx, same
            ? `cell voltage = ${signedV(eA)} − (${signedV(eA)}) = 0.00 V`
            : `cell voltage = ${signedV(plus[1])} − (${signedV(minus[1])}) = ${cell.toFixed(2)} V`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, same
            ? 'same metal: no difference, so no push'
            : `${cellsNeeded} ${cellsNeeded === 1 ? 'cell' : 'cells'} in series reach ${TARGET_V.toFixed(1)} V (${(cellsNeeded * cell).toFixed(2)} V)`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Cell voltage ${same ? '0.00' : cell.toFixed(2)} V`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The + metal minus the − metal', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, cell / MAX_CELL)),
                caption: 'Cell Voltage',
                low: '0 V',
                high: `${MAX_CELL.toFixed(2)} V`,
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: same
                ? `Two ${nameA} electrodes have the same potential, so the cell gives 0.00 V.`
                : `${minus[0]} is the − end and ${plus[0]} is the + end: ${cell.toFixed(2)} V under standard conditions.`,
        };
    };

    return (
        <LabCanvas
            title="Choosing Metals for a Battery"
            readout={({ raw }) => `First metal: ${metalOf(raw)[0]}`}
            controlLabel="First Metal"
            controlKey="firstMetal"
            controlMin={0}
            controlMax={METALS.length - 1}
            controlInitial={1}
            controlDisplay={raw => `${metalOf(raw)[0]} (${signedV(metalOf(raw)[1])} V)`}
            control2={{
                label: 'Second Metal',
                key: 'secondMetal',
                min: 0,
                max: METALS.length - 1,
                initial: 4,
                display: raw => `${metalOf(raw)[0]} (${signedV(metalOf(raw)[1])} V)`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Choosing Metals for a Battery"
            completeNote="The + metal minus the − metal!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
