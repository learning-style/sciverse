import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const EARTH_RADIUS_KM = 6400;
const SURFACE_G = 9.8;
const MAX_HEIGHT_KM = 50000;
const EARTH = '#2563eb';
const PULL = '#4f46e5';

const heightOf = (dial: number): number => Math.max(0, Math.min(MAX_HEIGHT_KM, Math.round(dial / 100) * 100));
const massOf = (dial: number): number => Math.max(20, Math.min(120, Math.round(dial)));

export const L2P12ScaleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const height = heightOf(raw);
        const mass = massOf(raw2);
        const r = EARTH_RADIUS_KM + height;
        const fraction = EARTH_RADIUS_KM / r;
        const squared = fraction * fraction;
        const gravity = SURFACE_G * squared;
        const weight = mass * gravity;
        const groundWeight = mass * SURFACE_G;

        // Earth and the chosen height, drawn to one scale that always fits
        const cx = safeRight * 0.27;
        const cy = stageTop + (stageBottom - 64 - stageTop) * 0.5;
        const room = Math.min(safeRight * 0.22, (stageBottom - 64 - stageTop) * 0.45);
        const kmPerPixel = (EARTH_RADIUS_KM + Math.max(height, 2000)) / room;
        const earthR = EARTH_RADIUS_KM / kmPerPixel;
        const orbitR = r / kmPerPixel;
        ctx.fillStyle = EARTH;
        ctx.beginPath();
        ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
        ctx.fill();
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        // The distance measured from the centre, which is what the rule needs
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy - orbitR);
        ctx.stroke();
        ctx.fillStyle = PULL;
        ctx.beginPath();
        ctx.arc(cx, cy - orbitR, 6, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, `r = ${r.toLocaleString()} km from the centre`, cx, cy + earthR + 20, 'bold 11px monospace', '#0f172a', 'center', safeRight * 0.5);

        const px = safeRight * 0.55;
        const pw = safeRight - 16 - px;
        outlineText(ctx, `R / r = 6,400 / ${r.toLocaleString()} = ${fraction.toFixed(3)}`, px, stageTop + 18, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `squared = ${squared.toFixed(3)}`, px, stageTop + 40, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `gravity = 9.8 x ${squared.toFixed(3)} = ${gravity.toFixed(2)} N/kg`, px, stageTop + 66, 'bold 12px monospace', PULL, 'left', pw);
        outlineText(ctx, `your weight ${Math.round(weight)} N`, px, stageTop + 94, 'bold 14px monospace', '#0f172a', 'left', pw);
        outlineText(ctx, `on the ground ${Math.round(groundWeight)} N`, px, stageTop + 116, '12px monospace', '#475569', 'left', pw);

        outlineText(ctx, `gravity = 9.8 x (6,400 / ${r.toLocaleString()})² = ${gravity.toFixed(2)} N/kg`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${Math.round(squared * 100)}% of surface gravity, ${height.toLocaleString()} km up`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', PULL, 'center', safeRight - 30);

        fitText(ctx, `${gravity.toFixed(2)} N/kg at ${height.toLocaleString()} km up`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Twice as far, a quarter as strong', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, squared)),
                caption: 'Gravity at This Height',
                low: '0',
                high: '1',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `At ${height.toLocaleString()} km up, r is ${r.toLocaleString()} km, so gravity is 9.8 x ${squared.toFixed(3)} = ${gravity.toFixed(2)} N/kg, and a ${mass} kg astronaut is pulled with ${Math.round(weight)} N.`,
        };
    };

    return (
        <LabCanvas
            title="Gravity by Distance"
            readout={({ raw }) => `${heightOf(raw).toLocaleString()} km above the surface`}
            controlLabel="Height Above Surface"
            controlKey="heightAboveSurface"
            controlMin={0}
            controlMax={MAX_HEIGHT_KM}
            controlInitial={400}
            controlDisplay={raw => `${heightOf(raw).toLocaleString()} km`}
            control2={{
                label: 'Your Mass',
                key: 'yourMass',
                min: 20,
                max: 120,
                initial: 60,
                display: raw => `${massOf(raw)} kg`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Gravity by Distance"
            completeNote="Distance from the centre, squared!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
