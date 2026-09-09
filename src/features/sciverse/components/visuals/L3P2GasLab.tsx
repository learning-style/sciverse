import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const V0 = 100;
const T0 = 300;
const P0 = 100;
const GAS_MASS = 0.12;

export const L3P2GasLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, t, stageTop, stageBottom }: LabScene) => {
        const cm3 = Math.max(20, Math.round(raw));
        const degC = Math.round(raw2);
        const kelvin = degC + 273;

        const pressure = P0 * (V0 / cm3) * (kelvin / T0);
        const density = GAS_MASS / cm3;
        const invariant = (pressure * cm3) / kelvin;

        // The cylinder, with the piston where the volume dial puts it
        const cylX = 56;
        const cylW = Math.min(230, safeRight * 0.42);
        const cylTop = stageTop + 54;
        const cylH = Math.max(120, stageBottom - cylTop - 96);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.strokeRect(cylX, cylTop, cylW, cylH);

        const fill = cm3 / 200;
        const gasTop = cylTop + cylH * (1 - fill);
        ctx.fillStyle = 'rgba(56,189,248,0.16)';
        ctx.fillRect(cylX + 2, gasTop, cylW - 4, cylTop + cylH - gasTop);
        ctx.fillStyle = '#475569';
        ctx.fillRect(cylX + 2, gasTop - 10, cylW - 4, 10);

        // Always the same particle count -- only the room they have changes
        const speed = 0.4 + (kelvin / 600) * 1.6;
        for (let i = 0; i < 34; i++) {
            const px = cylX + 12 + ((i * 79 + t * 40 * speed) % (cylW - 24));
            const band = cylTop + cylH - gasTop - 16;
            const py = gasTop + 10 + ((i * 53 + t * 33 * speed) % Math.max(12, band));
            ctx.fillStyle = '#0369a1';
            ctx.beginPath();
            ctx.arc(px, py, 3.2, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, `${cm3} cm³`, cylX + cylW / 2, cylTop + cylH + 20,
            'bold 13px monospace', '#0f172a', 'center', cylW);
        outlineText(ctx, 'same particles throughout', cylX + cylW / 2, cylTop + cylH + 38,
            'bold 11px monospace', '#475569', 'center', cylW + 40);

        // Readouts
        const tx = cylX + cylW + 34;
        const rows: [string, string][] = [
            ['pressure', `${pressure.toFixed(0)} kPa`],
            ['temperature', `${degC} °C = ${kelvin} K`],
            ['density', `${density.toFixed(4)} g/cm³`],
            ['pV / T', `${invariant.toFixed(1)}`],
        ];
        ctx.textAlign = 'left';
        rows.forEach((r, i) => {
            const ry = cylTop + 22 + i * 30;
            ctx.font = i === 3 ? 'bold 14px monospace' : '13px monospace';
            ctx.fillStyle = i === 3 ? '#4338ca' : '#334155';
            ctx.fillText(r[0], tx, ry);
            ctx.fillText(r[1], tx + 108, ry);
        });
        ctx.textAlign = 'center';
        outlineText(ctx, 'this combination does not move', tx + 60, cylTop + 22 + 3 * 30 + 18,
            'bold 11px monospace', '#4338ca', 'center', safeRight - tx - 10);
        outlineText(ctx, 'exactly true for an ideal gas', tx + 60, cylTop + 22 + 3 * 30 + 36,
            'bold 11px monospace', '#475569', 'center', safeRight - tx - 10);

        fitText(ctx, `${density.toFixed(4)} g/cm³ -- the density of this gas right now`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Same gas throughout, so density is set by the conditions',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, pressure / 400)),
                caption: 'Pressure',
                low: 'Barely pushing',
                high: 'Very squeezed',
            },
            note: `Squeeze the gas or heat it and the pressure moves, but pV/T holds at ${invariant.toFixed(1)}. The density is ${density.toFixed(4)} g/cm³ -- in a different container the same gas would show a different one.`,
        };
    };

    return (
        <LabCanvas
            title="When Density Stops Working"
            readout={({ raw }) => `A fixed amount of gas in ${Math.max(20, Math.round(raw))} cm³`}
            controlLabel="Volume"
            controlKey="gasVolume"
            controlMin={20}
            controlMax={200}
            controlInitial={100}
            controlDisplay={raw => `${Math.max(20, Math.round(raw))} cm³`}
            control2={{
                label: 'Temperature',
                key: 'gasTemp',
                min: -50,
                max: 250,
                initial: 27,
                display: raw => `${Math.round(raw)} °C = ${Math.round(raw) + 273} K`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="When Density Stops Working"
            completeNote="pV/T = constant -- in kelvin!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
