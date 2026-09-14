import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The lesson's table of thermal conductivities, in W/m/C. */
const MATERIALS: [string, number][] = [
    ['copper', 400], ['steel', 50], ['glass', 1.0], ['brick', 0.7], ['wood', 0.15], ['wool', 0.04], ['still air', 0.025],
];
const AREA = 1;
const DELTA_T = 20;
const BRICK_20CM = (0.7 * AREA * DELTA_T) / 0.2;
const LOG_MIN = Math.log10(0.5);
const LOG_MAX = Math.log10(800000);

const materialOf = (dial: number): [string, number] => MATERIALS[Math.max(0, Math.min(MATERIALS.length - 1, Math.round(dial)))];
const cmOf = (dial: number): number => Math.max(1, Math.min(100, Math.round(dial)));
const wattText = (w: number): string => (w < 10 ? w.toFixed(2) : w < 1000 ? w.toFixed(0) : Math.round(w).toLocaleString());

export const L2P8ConductionLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const [name, k] = materialOf(raw);
        const cm = cmOf(raw2);
        const metres = cm / 100;
        const flow = (k * AREA * DELTA_T) / metres;
        const strength = Math.max(0, Math.min(1, (Math.log10(flow) - LOG_MIN) / (LOG_MAX - LOG_MIN)));
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // Warmer face on the left, cooler face on the right, the slab between them
        const zoneX = 40;
        const zoneW = safeRight * 0.56 - zoneX;
        const top = stageTop + 20;
        const bottom = stageTop + 112 * sy;
        const slabW = 14 + (zoneW - 120) * (cm / 100);
        const slabX = zoneX + (zoneW - slabW) / 2;
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(zoneX, top, slabX - zoneX, bottom - top);
        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(slabX + slabW, top, zoneX + zoneW - slabX - slabW, bottom - top);
        ctx.fillStyle = name === 'copper' ? '#d97706' : name === 'steel' ? '#94a3b8' : name === 'glass' ? '#e0f2fe' : name === 'brick' ? '#c2410c' : name === 'wood' ? '#a16207' : '#f5f5f4';
        ctx.fillRect(slabX, top, slabW, bottom - top);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(slabX, top, slabW, bottom - top);
        outlineText(ctx, 'warmer face', slabX - 6, top - 6, 'bold 11px monospace', '#991b1b', 'right', slabX - zoneX + 30);
        outlineText(ctx, 'cooler face', slabX + slabW + 6, top - 6, 'bold 11px monospace', '#1e40af', 'left', zoneX + zoneW - slabX - slabW + 30);

        // Heat flowing through: more and brighter dots for a bigger flow
        const dots = 3 + Math.round(9 * strength);
        const pace = 0.15 + 0.85 * strength;
        for (let i = 0; i < dots; i++) {
            const lane = top + ((i + 0.5) / dots) * (bottom - top);
            const along = (t * pace + i * 0.37) % 1;
            const dx = zoneX + 10 + along * (zoneW - 20);
            ctx.fillStyle = `rgba(234, 88, 12, ${0.35 + 0.6 * strength})`;
            ctx.beginPath();
            ctx.arc(dx, lane, 3 + 2 * strength, 0, Math.PI * 2);
            ctx.fill();
        }

        const px = safeRight * 0.6;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `k = ${k} W/m/°C (${name})`, px, stageTop + 20, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, 'A = 1 m²', px, stageTop + 42, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `ΔT = ${DELTA_T} °C`, px, stageTop + 64, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `d = ${cm} cm = ${metres.toFixed(2)} m`, px, stageTop + 86, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `heat flow ${wattText(flow)} W`, px, stageTop + 112 * sy, 'bold 13px monospace', '#9a3412', 'left', pw);

        const ratio = flow / BRICK_20CM;
        outlineText(ctx, `heat flow = ${k} x 1 x ${DELTA_T} / ${metres.toFixed(2)} = ${wattText(flow)} W`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${ratio >= 10 ? Math.round(ratio).toLocaleString() : ratio.toFixed(2)} times the heat through 20 cm of brick`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${wattText(flow)} W through ${cm} cm of ${name}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Heat flows from the warmer face to the cooler face', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: strength,
                caption: 'Heat Flow Each Second',
                low: '0.5 W',
                high: '800,000 W',
                stops: ['#e0e7ff', '#fdba74', '#c2410c'] as [string, string, string],
            },
            note: `${cm} cm of ${name}, 1 m² with a 20 °C difference between its faces, lets ${wattText(flow)} W of heat through each second.`,
        };
    };

    return (
        <LabCanvas
            title="How Fast Heat Leaks"
            readout={({ raw }) => `Material: ${materialOf(raw)[0]}`}
            controlLabel="Material"
            controlKey="conductionMaterial"
            controlMin={0}
            controlMax={MATERIALS.length - 1}
            controlInitial={3}
            controlDisplay={raw => `${materialOf(raw)[0]} (k = ${materialOf(raw)[1]})`}
            control2={{
                label: 'Thickness',
                key: 'layerThickness',
                min: 1,
                max: 100,
                initial: 20,
                display: raw => `${cmOf(raw)} cm`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Fast Heat Leaks"
            completeNote="k x A x ΔT / d!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
