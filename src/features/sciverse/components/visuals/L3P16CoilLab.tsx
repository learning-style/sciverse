import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MU0 = 1.2566e-6;
const EARTH_UT = 50;
const INDIGO = '#4338ca';
const WIRE = '#b45309';

const turnsOf = (dial: number): number => Math.max(500, Math.min(5000, Math.round(dial / 100) * 100));
const ampsOf = (dial: number): number => Math.max(0.1, Math.min(3, Math.round(dial * 10) / 10));

export const L3P16CoilLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const perMetre = turnsOf(raw);
        const amps = ampsOf(raw2);
        const field = MU0 * perMetre * amps;
        const milli = field * 1000;
        const earths = (field * 1e6) / EARTH_UT;

        // Real available height, bands as shares of it, labels clamped
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const coilH = Math.max(34, Math.min(110, usable * 0.42, usable - 44));
        const blockH = coilH + 40;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const coilX = 46;
        const coilW = safeRight - 92;
        const midY = top + coilH / 2;

        // The solenoid: more turns per metre means more loops in the same length
        const loops = Math.max(4, Math.min(26, Math.round(perMetre / 190)));
        const spacing = coilW / loops;
        ctx.strokeStyle = WIRE;
        ctx.lineWidth = Math.max(1.5, Math.min(3, spacing * 0.22));
        for (let i = 0; i < loops; i++) {
            const lx = coilX + spacing * (i + 0.5);
            ctx.beginPath();
            ctx.ellipse(lx, midY, Math.max(3, spacing * 0.3), coilH / 2, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // The field along the axis, thickening with the current
        ctx.strokeStyle = INDIGO;
        ctx.lineWidth = Math.max(1.5, Math.min(7, amps * 2.2));
        ctx.beginPath();
        ctx.moveTo(coilX - 14, midY);
        ctx.lineTo(coilX + coilW + 10, midY);
        ctx.stroke();
        const headX = coilX + coilW + 10;
        ctx.fillStyle = INDIGO;
        ctx.beginPath();
        ctx.moveTo(headX + 9, midY);
        ctx.lineTo(headX - 3, midY - 6);
        ctx.lineTo(headX - 3, midY + 6);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, 'north', headX + 12, midY + 4, '10px monospace', INDIGO, 'left', 60);

        outlineText(ctx, `${perMetre.toLocaleString()} turns per metre at ${amps.toFixed(1)} A`,
            safeRight / 2, Math.min(top + coilH + 22, artBottom),
            'bold 11px monospace', WIRE, 'center', safeRight - 40);

        outlineText(ctx, `B = μ₀ x ${perMetre.toLocaleString()} x ${amps.toFixed(1)} = ${milli.toFixed(2)} mT`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${earths.toFixed(0)} times Earth's ${EARTH_UT} µT`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', INDIGO, 'center', safeRight - 30);

        fitText(ctx, `${milli.toFixed(2)} mT inside the coil`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Turns per metre times amps', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, milli / 19)),
                caption: 'Field Inside the Coil',
                low: '0 mT',
                high: '19 mT',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: `A coil of ${perMetre.toLocaleString()} turns per metre carrying ${amps.toFixed(1)} A holds ${milli.toFixed(2)} mT along its axis, about ${earths.toFixed(0)} times Earth's ${EARTH_UT} µT. B is a straight line in both dials, and the coil's diameter does not appear in the formula at all.`,
        };
    };

    return (
        <LabCanvas
            title="Making a Field"
            readout={({ raw }) => `A coil of ${turnsOf(raw).toLocaleString()} turns per metre`}
            controlLabel="Turns per Metre"
            controlKey="turnsPerMetre"
            controlMin={500}
            controlMax={5000}
            controlInitial={2000}
            controlDisplay={raw => `${turnsOf(raw).toLocaleString()} per metre`}
            control2={{
                label: 'Current',
                key: 'coilCurrent',
                min: 0.1,
                max: 3,
                initial: 2,
                display: raw => `${ampsOf(raw).toFixed(1)} A`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Making a Field"
            completeNote="B = μ₀ n I!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
