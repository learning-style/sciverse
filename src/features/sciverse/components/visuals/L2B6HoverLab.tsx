import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FISH_G = 1000;
const BODY_DENSITY = 1.07;
const BODY_CM3 = FISH_G / BODY_DENSITY;
const HOVER_BAND = 0.002;
const SCALE_MIN = 0.95;
const SCALE_MAX = 1.1;

const bladderOf = (dial: number): number => Math.max(0, Math.round(dial));
const waterOf = (dial: number): number => Math.max(1000, Math.round(dial)) / 1000;

export const L2B6HoverLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const bladder = bladderOf(raw);
        const water = waterOf(raw2);
        const average = FISH_G / (BODY_CM3 + bladder);
        const diff = average - water;
        const hovers = Math.abs(diff) <= HOVER_BAND;
        const sinks = diff > HOVER_BAND;
        const needed = FISH_G / water - BODY_CM3 - bladder;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 140));

        // The tank, with the fish drifting to where its density sends it
        const tankX = 40;
        const tankW = safeRight * 0.56 - tankX;
        const tankTop = stageTop + 8;
        const tankBottom = stageTop + 118 * sy;
        ctx.fillStyle = water > 1.012 ? '#bfdbfe' : '#dbeafe';
        ctx.fillRect(tankX, tankTop, tankW, tankBottom - tankTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(tankX, tankTop, tankW, tankBottom - tankTop);

        const bodyW = Math.min(90, tankW * 0.5);
        const bodyH = bodyW * 0.38;
        const cx = tankX + tankW / 2;
        const bob = Math.sin(t * 1.8) * 2;
        const cy = hovers ? (tankTop + tankBottom) / 2 + bob
            : sinks ? tankBottom - bodyH / 2 - 4
            : tankTop + bodyH / 2 + 4;
        ctx.fillStyle = '#fb7185';
        ctx.beginPath();
        ctx.ellipse(cx, cy, bodyW / 2, bodyH / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx + bodyW / 2 - 4, cy);
        ctx.lineTo(cx + bodyW / 2 + 16, cy - bodyH / 2);
        ctx.lineTo(cx + bodyW / 2 + 16, cy + bodyH / 2);
        ctx.closePath();
        ctx.fill();
        const gasW = (bodyW * 0.55) * Math.sqrt(bladder / 120);
        if (gasW > 1) {
            ctx.fillStyle = '#f8fafc';
            ctx.strokeStyle = '#9f1239';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(cx, cy - bodyH * 0.08, gasW / 2, Math.max(2, bodyH * 0.32 * Math.sqrt(bladder / 120)), 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        outlineText(ctx, 'swim bladder: a bag of gas', tankX + tankW / 2, tankBottom + 16,
            'bold 11px monospace', '#9f1239', 'center', tankW + 20);

        // The fish's average density against the water's, on one scale
        const gx = safeRight * 0.62;
        const gw = safeRight - 28 - gx;
        const xOf = (d: number): number => gx + ((Math.max(SCALE_MIN, Math.min(SCALE_MAX, d)) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * gw;
        outlineText(ctx, `body ${Math.round(BODY_CM3)} cm³ + gas ${bladder} cm³`, gx, stageTop + 18, 'bold 12px monospace', '#0f172a', 'left', gw);
        outlineText(ctx, `average = 1,000 / ${Math.round(BODY_CM3 + bladder).toLocaleString()}`, gx, stageTop + 40, 'bold 12px monospace', '#0f172a', 'left', gw);
        const axisY = stageTop + 88 * sy;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, axisY);
        ctx.lineTo(gx + gw, axisY);
        ctx.stroke();
        const fishX = xOf(average);
        const waterX = xOf(water);
        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.moveTo(fishX, axisY - 3);
        ctx.lineTo(fishX - 6, axisY - 13);
        ctx.lineTo(fishX + 6, axisY - 13);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.moveTo(waterX, axisY + 3);
        ctx.lineTo(waterX - 6, axisY + 13);
        ctx.lineTo(waterX + 6, axisY + 13);
        ctx.closePath();
        ctx.fill();
        const clampX = (x: number): number => Math.max(gx + 20, Math.min(gx + gw - 20, x));
        outlineText(ctx, 'fish', clampX(fishX), axisY - 19, 'bold 11px monospace', '#9f1239', 'center', 60);
        outlineText(ctx, 'water', clampX(waterX), axisY + 27, 'bold 11px monospace', '#1e3a8a', 'center', 60);

        outlineText(ctx, `fish ${average.toFixed(3)} g/cm³ -- water ${water.toFixed(3)} g/cm³`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        const verdict = hovers ? 'hovers: neutral buoyancy'
            : sinks ? `sinks -- it needs about ${Math.round(needed)} cm³ more gas`
            : `rises -- it needs about ${Math.round(-needed)} cm³ less gas`;
        outlineText(ctx, verdict, safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Average density ${average.toFixed(3)} g/cm³`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Gas adds volume without adding mass', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 0.5 + diff / 0.1)),
                caption: 'Fish Compared With Water',
                low: 'Rises',
                high: 'Sinks',
                stops: ['#93c5fd', '#e2e8f0', '#fda4af'] as [string, string, string],
            },
            note: `With ${bladder} cm³ of gas, the 1,000 g fish has an average density of ${average.toFixed(3)} g/cm³ in water of ${water.toFixed(3)} g/cm³, so it ${hovers ? 'hovers' : sinks ? 'sinks' : 'rises'}.`,
        };
    };

    return (
        <LabCanvas
            title="How a Fish Hovers"
            readout={({ raw }) => `Swim bladder ${bladderOf(raw)} cm³`}
            controlLabel="Bladder Volume"
            controlKey="bladderVolume"
            controlMin={0}
            controlMax={120}
            controlInitial={30}
            controlDisplay={raw => `${bladderOf(raw)} cm³`}
            control2={{
                label: 'Water Density',
                key: 'waterDensity',
                min: 1000,
                max: 1030,
                initial: 1000,
                display: raw => `${waterOf(raw).toFixed(3)} g/cm³`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How a Fish Hovers"
            completeNote="Gas for volume, no mass!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
