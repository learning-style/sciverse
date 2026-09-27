import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const A_CONCRETE = 10e-6;
const A_STEEL = 12e-6;
const A_ALUMINIUM = 23e-6;
const EMERALD = '#047857';
const ALU = '#b45309';

const lengthOf = (dial: number): number => Math.max(2, Math.min(30, Math.round(dial)));
const swingOf = (dial: number): number => Math.max(10, Math.min(80, Math.round(dial / 5) * 5));
const slipOf = (alpha: number, dT: number, metres: number): number =>
    (alpha - A_CONCRETE) * dT * metres * 1000;

export const L3C17ExpansionLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const metres = lengthOf(raw);
        const dT = swingOf(raw2);
        const steel = slipOf(A_STEEL, dT, metres);
        const alu = slipOf(A_ALUMINIUM, dT, metres);
        const worse = alu / steel;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const barH = Math.max(12, Math.min(26, usable * 0.16));
        const gap = Math.max(8, Math.min(22, usable * 0.1));
        const blockH = barH * 2 + gap + 34;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const labelW = Math.min(104, safeRight * 0.3);
        const barX = 20 + labelW;
        const barW = safeRight - barX - 34;
        const most = 32;   // mm, the widest slip the dials can reach

        const row = (i: number, name: string, slip: number, fill: string) => {
            const y = top + (barH + gap) * i;
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(barX, y, barW, barH);
            ctx.fillStyle = fill;
            ctx.fillRect(barX, y, barW * Math.max(0, Math.min(1, slip / most)), barH);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, y, barW, barH);
            outlineText(ctx, name, barX - 8, y + barH * 0.72, 'bold 11px monospace',
                '#475569', 'right', labelW - 4);
            outlineText(ctx, slip.toFixed(1) + ' mm', barX + 6, y + barH * 0.72,
                'bold 11px monospace', '#0f172a', 'left', barW - 12);
        };
        row(0, 'steel', steel, EMERALD);
        row(1, 'aluminium', alu, ALU);
        outlineText(ctx, 'how far each bar slips against the concrete', safeRight / 2,
            Math.min(top + barH * 2 + gap + 22, artBottom),
            '10px monospace', '#475569', 'center', safeRight - 30);

        outlineText(ctx, '(12 - 10) x 10⁻⁶ x ' + dT + ' x ' + (metres * 1000).toLocaleString()
            + ' = ' + steel.toFixed(1) + ' mm',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'aluminium slips ' + alu.toFixed(1) + ' mm, '
            + worse.toFixed(1) + ' times worse',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ALU, 'center', safeRight - 30);

        fitText(ctx, 'steel slips ' + steel.toFixed(1) + ' mm', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Three coincidences in one metal', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, alu / most)),
                caption: 'Slip Against the Concrete',
                low: '0 mm',
                high: most + ' mm',
                stops: ['#ecfdf5', '#fcd34d', ALU] as [string, string, string],
            },
            note: 'Over ' + metres + ' m and a swing of ' + dT
                + ' °C, steel slides ' + steel.toFixed(1)
                + ' mm against the concrete and aluminium slips ' + alu.toFixed(1)
                + ' mm. The bond feels only the difference between the two rates, and '
                + 'aluminium is always ' + worse.toFixed(1)
                + ' times worse -- a ratio fixed by the materials, not by the beam.',
        };
    };

    return (
        <LabCanvas
            title="Why Steel, of All Metals"
            readout={({ raw }) => 'A beam ' + lengthOf(raw) + ' m long'}
            controlLabel="Beam Length"
            controlKey="beamLength"
            controlMin={2}
            controlMax={30}
            controlInitial={10}
            controlDisplay={raw => lengthOf(raw) + ' m'}
            control2={{
                label: 'Temperature Swing',
                key: 'tempSwing',
                min: 10,
                max: 80,
                initial: 50,
                display: raw => swingOf(raw) + ' °C',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Steel, of All Metals"
            completeNote="Steel matches concrete, and concrete protects steel!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
