import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const UNIT = '#047857';
const MAX_SHOWN = 44;

const chainOf = (dial: number): number => Math.max(500, Math.min(2000000, Math.round(dial / 500) * 500));
const monomerOf = (dial: number): number => {
    const options = [28, 42, 104];
    return options.reduce((best, m) => (Math.abs(m - dial) < Math.abs(best - dial) ? m : best), options[0]);
};
const monomerName = (mass: number): string => (mass === 28 ? 'ethylene' : mass === 42 ? 'propylene' : 'styrene');
const materialFor = (units: number): string =>
    units < 60 ? 'a soft wax' : units < 1000 ? 'a bendy film' : units < 10000 ? 'a plastic bag' : 'rope fibre';

export const L2C13ChainLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const chainMass = chainOf(raw);
        const monomerMass = monomerOf(raw2);
        const units = chainMass / monomerMass;
        const material = materialFor(units);

        // As much of the chain as fits, with a note when there is far more of it
        const shown = Math.max(1, Math.min(MAX_SHOWN, Math.round(units)));
        const gx = 34;
        const gw = safeRight - 60 - gx;
        const perRow = 11;
        const rows = Math.ceil(shown / perRow);
        const step = Math.min(gw / perRow, 30);
        const gy = stageTop + 24;
        for (let i = 0; i < shown; i++) {
            const x = gx + (i % perRow) * step + step / 2;
            const y = gy + Math.floor(i / perRow) * 30;
            if (i % perRow !== 0) {
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x - step, y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            ctx.fillStyle = UNIT;
            ctx.beginPath();
            ctx.arc(x, y, Math.min(9, step * 0.32), 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, units > MAX_SHOWN ? `first ${MAX_SHOWN} of ${Math.round(units).toLocaleString()} units` : `${Math.round(units).toLocaleString()} units`,
            gx, gy + rows * 30 + 6, '11px monospace', '#475569', 'left', gw);

        const py = gy + rows * 30 + 30;
        outlineText(ctx, `${monomerName(monomerMass)} unit: mass ${monomerMass}`, gx, py, '12px monospace', '#334155', 'left', gw);
        outlineText(ctx, `chain mass ${chainMass.toLocaleString()}`, gx, py + 22, '12px monospace', '#334155', 'left', gw);
        outlineText(ctx, `this makes ${material}`, gx, py + 46, 'bold 13px monospace', UNIT, 'left', gw);

        outlineText(ctx, `n = ${chainMass.toLocaleString()} / ${monomerMass} = ${Math.round(units).toLocaleString()} units`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `about ${Math.round(units).toLocaleString()} units: ${material}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', UNIT, 'center', safeRight - 30);

        fitText(ctx, `${Math.round(units).toLocaleString()} units long`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Chain mass over unit mass', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.log10(Math.max(1, units)) / 5)),
                caption: 'Units in the Chain',
                low: '1',
                high: '100,000',
                stops: ['#ecfdf5', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `A chain of mass ${chainMass.toLocaleString()} built from ${monomerName(monomerMass)} units of mass ${monomerMass} is ${Math.round(units).toLocaleString()} units long: ${material}.`,
        };
    };

    return (
        <LabCanvas
            title="How Long Is a Polymer Chain?"
            readout={({ raw }) => `A chain of mass ${chainOf(raw).toLocaleString()}`}
            controlLabel="Chain Mass"
            controlKey="chainMass"
            controlMin={500}
            controlMax={2000000}
            controlInitial={100000}
            controlDisplay={raw => `mass ${chainOf(raw).toLocaleString()}`}
            control2={{
                label: 'Monomer Mass',
                key: 'monomerMass',
                min: 28,
                max: 104,
                initial: 28,
                display: raw => `${monomerOf(raw)} (${monomerName(monomerOf(raw))})`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Long Is a Polymer Chain?"
            completeNote="Chain mass over unit mass!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
