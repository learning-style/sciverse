import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The lesson's measured volumes: salt dissolved in 1,000 g of water at 20 C. */
const VOLUMES: [number, number][] = [[0, 1000], [50, 1017], [100, 1034], [200, 1070], [300, 1108], [360, 1133]];
const SATURATED_G = 360;
const SCALE_MIN = 0.85;
const SCALE_MAX = 1.45;

/** Plastics from the lesson. true = label above the scale, false = below. */
const PLASTICS: [string, number, boolean][] = [['PP', 0.9, true], ['PS', 1.05, false], ['PET', 1.38, false], ['PVC', 1.4, true]];

const saltOf = (dial: number): number => Math.max(0, Math.min(SATURATED_G, Math.round(dial)));
const flakeOf = (dial: number): number => Math.max(85, Math.round(dial)) / 100;

const volumeOf = (salt: number): number => {
    for (let i = 0; i < VOLUMES.length - 1; i++) {
        const [s1, v1] = VOLUMES[i];
        const [s2, v2] = VOLUMES[i + 1];
        if (salt <= s2) return v1 + ((v2 - v1) * (salt - s1)) / (s2 - s1);
    }
    return VOLUMES[VOLUMES.length - 1][1];
};

export const L2C6SortingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const salt = saltOf(raw);
        const flake = flakeOf(raw2);
        const volume = Math.round(volumeOf(salt));
        const density = (1000 + salt) / volume;
        const gap = flake - density;
        const verdict = Math.abs(gap) < 0.005 ? 'hangs in the middle' : gap < 0 ? 'floats' : 'sinks';
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // The tank of salt water, with one flake
        const bx = 36;
        const bw = Math.max(70, safeRight * 0.22);
        const top = stageTop + 14;
        const bottom = top + 108 * sy;
        const shade = Math.round(235 - 60 * Math.min(1, salt / SATURATED_G));
        ctx.fillStyle = `rgb(${shade}, ${Math.min(255, shade + 12)}, 255)`;
        ctx.fillRect(bx, top + 10, bw, bottom - top - 10);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx, top);
        ctx.lineTo(bx, bottom);
        ctx.lineTo(bx + bw, bottom);
        ctx.lineTo(bx + bw, top);
        ctx.stroke();
        const flakeW = 22;
        const flakeH = 7;
        const flakeY = verdict === 'floats' ? top + 10 - flakeH / 2
            : verdict === 'sinks' ? bottom - flakeH - 2
            : (top + bottom) / 2;
        ctx.fillStyle = '#047857';
        ctx.fillRect(bx + bw / 2 - flakeW / 2, flakeY, flakeW, flakeH);

        // A density scale with the plastics, the liquid and the flake marked
        const gx = bx + bw + 40;
        const gw = safeRight - 30 - gx;
        const axisY = stageTop + 66 * sy;
        const xOf = (d: number): number => gx + ((Math.max(SCALE_MIN, Math.min(SCALE_MAX, d)) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * gw;
        const clampX = (x: number): number => Math.max(gx + 24, Math.min(gx + gw - 24, x));
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, axisY);
        ctx.lineTo(gx + gw, axisY);
        ctx.stroke();
        PLASTICS.forEach(([name, d, above]) => {
            const px = xOf(d);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px, axisY - 5);
            ctx.lineTo(px, axisY + 5);
            ctx.stroke();
            outlineText(ctx, name, px, above ? axisY - 10 : axisY + 18, 'bold 11px monospace', '#334155', 'center', 34);
        });

        const fx = xOf(flake);
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(fx, axisY - 22);
        ctx.lineTo(fx, axisY);
        ctx.stroke();
        outlineText(ctx, `flake ${flake.toFixed(2)}`, clampX(fx), axisY - 30, 'bold 11px monospace', '#065f46', 'center', 96);

        const lx = xOf(density);
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.moveTo(lx, axisY + 26);
        ctx.lineTo(lx - 7, axisY + 37);
        ctx.lineTo(lx + 7, axisY + 37);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `liquid ${density.toFixed(3)}`, clampX(lx), axisY + 52, 'bold 11px monospace', '#1e3a8a', 'center', 110);

        outlineText(ctx, `density = (1,000 + ${salt}) / ${volume.toLocaleString()} = ${density.toFixed(3)} g/cm³`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `a ${flake.toFixed(2)} g/cm³ flake ${verdict}${salt >= SATURATED_G ? ' -- the salt water is saturated' : ''}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Salt water ${density.toFixed(2)} g/cm³`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Total mass over measured volume', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (density - 1) / 0.2)),
                caption: 'Density of the Solution',
                low: '1.00 g/cm³',
                high: '1.20 g/cm³',
                stops: ['#eff6ff', '#93c5fd', '#1d4ed8'] as [string, string, string],
            },
            note: `${salt} g of salt in 1,000 g of water makes ${volume.toLocaleString()} cm³ of solution, at ${density.toFixed(3)} g/cm³.`,
        };
    };

    return (
        <LabCanvas
            title="Sorting Plastic by Floating It"
            readout={({ raw }) => `${saltOf(raw)} g of salt in 1,000 g of water`}
            controlLabel="Salt Added"
            controlKey="saltAdded"
            controlMin={0}
            controlMax={360}
            controlInitial={0}
            controlDisplay={raw => `${saltOf(raw)} g`}
            control2={{
                label: 'Flake Density',
                key: 'flakeDensity',
                min: 85,
                max: 145,
                initial: 105,
                display: raw => `${flakeOf(raw).toFixed(2)} g/cm³`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Sorting Plastic by Floating It"
            completeNote="Total mass over measured volume!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
