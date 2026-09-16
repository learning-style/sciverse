import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const EARTH_RADIUS_M = 6.4e6;
const SURFACE_G = 9.8;
const MAX_SPEED = 8000;
const EARTH = '#2563eb';
const ORBIT = '#4f46e5';

const heightOf = (dial: number): number => Math.max(200, Math.min(40000, Math.round(dial / 100) * 100));
const massOf = (dial: number): number => Math.max(100, Math.min(10000, Math.round(dial / 100) * 100));
const lapText = (seconds: number): string =>
    seconds < 7200 ? `${(seconds / 60).toFixed(0)} minutes` : `${(seconds / 3600).toFixed(1)} hours`;

export const L3P12OrbitLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const height = heightOf(raw);
        const mass = massOf(raw2);
        const r = EARTH_RADIUS_M + height * 1000;
        const gravity = SURFACE_G * Math.pow(EARTH_RADIUS_M / r, 2);
        const speed = Math.sqrt(gravity * r);
        const lap = (2 * Math.PI * r) / speed;

        // Earth and the orbit, drawn to a scale that always fits
        const cx = safeRight * 0.27;
        const cy = stageTop + (stageBottom - 64 - stageTop) * 0.5;
        const room = Math.min(safeRight * 0.22, (stageBottom - 64 - stageTop) * 0.45);
        const mPerPixel = r / room;
        const earthR = EARTH_RADIUS_M / mPerPixel;
        const orbitR = room;
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
        // The satellite goes round once per lap, sped up so a lap takes six seconds
        const angle = (t / 6) * 2 * Math.PI;
        const sx = cx + Math.cos(angle) * orbitR;
        const sy = cy + Math.sin(angle) * orbitR;
        ctx.fillStyle = ORBIT;
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (cx - sx) * 0.25, sy + (cy - sy) * 0.25);
        ctx.stroke();
        outlineText(ctx, `${height.toLocaleString()} km up`, cx, cy + earthR + 20, 'bold 11px monospace', '#0f172a', 'center', safeRight * 0.5);

        const px = safeRight * 0.55;
        const pw = safeRight - 16 - px;
        outlineText(ctx, `gravity ${gravity.toFixed(2)} N/kg`, px, stageTop + 18, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `v = √(${gravity.toFixed(2)} x ${(r / 1e6).toFixed(2)} x 10⁶)`, px, stageTop + 40, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `v = ${Math.round(speed).toLocaleString()} m/s = ${(speed / 1000).toFixed(1)} km/s`, px, stageTop + 62, 'bold 13px monospace', ORBIT, 'left', pw);
        outlineText(ctx, `one lap ${lapText(lap)}`, px, stageTop + 88, 'bold 13px monospace', '#0f172a', 'left', pw);
        outlineText(ctx, `satellite ${mass.toLocaleString()} kg`, px, stageTop + 114, '12px monospace', '#475569', 'left', pw);

        outlineText(ctx, `v = √(gravity x r) = ${Math.round(speed).toLocaleString()} m/s, T = 2 x π x r / v = ${lapText(lap)}`,
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the mass cancels out: speed and time do not move',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${(speed / 1000).toFixed(1)} km/s, one lap in ${lapText(lap)}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'One height, one speed', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, speed / MAX_SPEED)),
                caption: 'Orbit Speed',
                low: '0 km/s',
                high: '8 km/s',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `At ${height.toLocaleString()} km up, gravity is ${gravity.toFixed(2)} N/kg, so a circular orbit needs ${(speed / 1000).toFixed(1)} km/s and one lap takes ${lapText(lap)} -- whatever the satellite's mass.`,
        };
    };

    return (
        <LabCanvas
            title="How Fast Must It Orbit?"
            readout={({ raw }) => `An orbit ${heightOf(raw).toLocaleString()} km above the surface`}
            controlLabel="Orbit Height"
            controlKey="orbitHeight"
            controlMin={200}
            controlMax={40000}
            controlInitial={400}
            controlDisplay={raw => `${heightOf(raw).toLocaleString()} km`}
            control2={{
                label: 'Satellite Mass',
                key: 'satelliteMass',
                min: 100,
                max: 10000,
                initial: 400,
                display: raw => `${massOf(raw).toLocaleString()} kg`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Fast Must It Orbit?"
            completeNote="v = √(g x r)!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
