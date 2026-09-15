import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FULL_KM2 = 10000;
const FULL_SPECIES = 400;
const GREEN = '#15803d';

const areaOf = (dial: number): number => Math.max(100, Math.min(FULL_KM2, Math.round(dial / 100) * 100));
const zOf = (dial: number): number => Math.max(0.15, Math.min(0.35, Math.round(dial * 100) / 100));
const speciesAt = (area: number, z: number): number => FULL_SPECIES * Math.pow(area / FULL_KM2, z);

export const L3B10HabitatLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const area = areaOf(raw);
        const z = zOf(raw2);
        const species = speciesAt(area, z);
        const leftPct = (area / FULL_KM2) * 100;
        const lostPct = (1 - species / FULL_SPECIES) * 100;

        const gTop = stageTop + 20;
        const gBottom = stageBottom - 64;
        const gh = gBottom - gTop;

        // Left: the original forest's outline, and the forest left, drawn to the same scale
        const side = Math.max(40, Math.min(gh, safeRight * 0.36));
        const sx = safeRight * 0.25 - side / 2;
        const sy = gTop;
        const leftSide = side * Math.sqrt(area / FULL_KM2);
        ctx.fillStyle = '#f5f5f4';
        ctx.fillRect(sx, sy, side, side);
        ctx.strokeStyle = '#a8a29e';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(sx, sy, side, side);
        ctx.fillStyle = '#86efac';
        ctx.fillRect(sx, sy + side - leftSide, leftSide, leftSide);
        ctx.fillStyle = GREEN;
        const step = Math.max(6, side / 14);
        for (let yy = sy + side - leftSide + step / 2; yy < sy + side; yy += step) {
            for (let xx = sx + step / 2; xx < sx + leftSide; xx += step) {
                ctx.beginPath();
                ctx.arc(xx, yy, step * 0.22, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        outlineText(ctx, `forest left ${area.toLocaleString()} km² of 10,000 km²`, safeRight * 0.25, gBottom + 14,
            'bold 11px monospace', GREEN, 'center', safeRight * 0.46);

        // Right: species against area, beside a straight line for species falling in step with area
        const x0 = safeRight * 0.54;
        const x1 = safeRight - 24;
        const xa = (km2: number): number => x0 + (km2 / FULL_KM2) * (x1 - x0);
        const ys = (n: number): number => gBottom - (n / FULL_SPECIES) * gh;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x0, gTop);
        ctx.lineTo(x0, gBottom);
        ctx.lineTo(x1, gBottom);
        ctx.stroke();
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xa(0), ys(0));
        ctx.lineTo(xa(FULL_KM2), ys(FULL_SPECIES));
        ctx.stroke();
        ctx.restore();
        outlineText(ctx, 'in step with area', xa(FULL_KM2 * 0.62), ys(FULL_SPECIES * 0.62) + 16, '11px monospace', '#64748b', 'left', (x1 - x0) * 0.4);
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 1; i <= 60; i++) {
            const km2 = (FULL_KM2 * i) / 60;
            if (i === 1) ctx.moveTo(xa(km2), ys(speciesAt(km2, z)));
            else ctx.lineTo(xa(km2), ys(speciesAt(km2, z)));
        }
        ctx.stroke();
        ctx.fillStyle = GREEN;
        ctx.beginPath();
        ctx.arc(xa(area), ys(species), 5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'species', x0, stageTop + 10, '11px monospace', '#475569', 'left', x1 - x0);
        outlineText(ctx, 'area, 0 to 10,000 km²', (x0 + x1) / 2, gBottom + 14, '11px monospace', '#475569', 'center', x1 - x0);

        outlineText(ctx, `species left = 400 x (${area.toLocaleString()} / 10,000)^${z.toFixed(2)} = ${Math.round(species)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${lostPct.toFixed(0)}% of species lost, with ${(100 - leftPct).toFixed(0)}% of the forest cleared`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#b91c1c', 'center', safeRight - 30);

        fitText(ctx, `${Math.round(species)} of 400 species with ${leftPct.toFixed(0)}% of the forest left`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Species fall slowly at first, then fast', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, species / FULL_SPECIES)),
                caption: 'Species Left',
                low: '0',
                high: '400',
                stops: ['#fef2f2', '#86efac', '#15803d'] as [string, string, string],
            },
            note: `With ${area.toLocaleString()} km² of the 10,000 km² forest left and z = ${z.toFixed(2)}, about ${Math.round(species)} of the 400 species remain.`,
        };
    };

    return (
        <LabCanvas
            title="How Much Habitat, How Many Species?"
            readout={({ raw }) => `${areaOf(raw).toLocaleString()} km² of forest left`}
            controlLabel="Forest Area"
            controlKey="forestArea"
            controlMin={100}
            controlMax={FULL_KM2}
            controlInitial={FULL_KM2}
            controlDisplay={raw => `${areaOf(raw).toLocaleString()} km²`}
            control2={{
                label: 'Power z',
                key: 'powerZ',
                min: 0.15,
                max: 0.35,
                initial: 0.25,
                display: raw => zOf(raw).toFixed(2),
            }}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Much Habitat, How Many Species?"
            completeNote="The last pieces matter most!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
