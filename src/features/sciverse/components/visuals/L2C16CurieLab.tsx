import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MAX_C = 1200;
const ALIGNED = '#047857';
const RANDOM = '#94a3b8';

const MATERIALS: { name: string; tc: number }[] = [
    { name: 'nickel', tc: 354 },
    { name: 'magnetite', tc: 585 },
    { name: 'iron', tc: 770 },
    { name: 'cobalt', tc: 1115 },
];

const tempOf = (dial: number): number => Math.max(20, Math.min(MAX_C, Math.round(dial / 10) * 10));
const materialOf = (dial: number): number => Math.max(0, Math.min(3, Math.round(dial) - 1));

export const L2C16CurieLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const temp = tempOf(raw);
        const pick = MATERIALS[materialOf(raw2)];
        const ferro = temp < pick.tc;
        const margin = Math.abs(pick.tc - temp);

        // Bands are shares of the real available height
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // The Curie label under the scale is dropped on a short stage, where the
        // footer line already carries the same number
        const scaleH = 14;
        const showTcLabel = usable >= 170;
        const tail = showTcLabel ? 66 : 46;
        const gridH = Math.max(26, Math.min(150, usable * 0.44, usable - tail));
        const blockH = gridH + 26 + scaleH + (showTcLabel ? 26 : 0);
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        // The domains: lined up below the Curie temperature, every which way above
        const gx = 34;
        const gw = safeRight - 68;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(gx, top, gw, gridH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(gx, top, gw, gridH);

        const cols = Math.max(5, Math.floor(gw / 34));
        const rows = Math.max(2, Math.floor(gridH / 30));
        const stepX = gw / cols;
        const stepY = gridH / rows;
        const arrow = Math.min(stepX, stepY) * 0.34;
        for (let r = 0; r < rows; r++) {
            for (let cI = 0; cI < cols; cI++) {
                const i = r * cols + cI;
                const px = gx + stepX * (cI + 0.5);
                const py = top + stepY * (r + 0.5);
                // Stable per cell, so the grid does not reshuffle every frame
                const scatter = Math.sin(i * 12.9898) * Math.PI;
                const wobble = Math.sin(i * 4.1) * (temp / pick.tc) * 0.25;
                const angle = ferro ? -Math.PI / 2 + wobble : scatter;
                ctx.strokeStyle = ferro ? ALIGNED : RANDOM;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(px - Math.cos(angle) * arrow, py - Math.sin(angle) * arrow);
                ctx.lineTo(px + Math.cos(angle) * arrow, py + Math.sin(angle) * arrow);
                ctx.stroke();
                ctx.fillStyle = ferro ? ALIGNED : RANDOM;
                ctx.beginPath();
                ctx.arc(px + Math.cos(angle) * arrow, py + Math.sin(angle) * arrow, 2.4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        outlineText(ctx, ferro ? 'domains aligned' : 'domains every which way',
            gx + gw / 2, Math.min(top + gridH + 16, artBottom - 18), 'bold 11px monospace', ferro ? ALIGNED : RANDOM, 'center', gw - 10);

        // The temperature scale, with this material's Curie temperature marked
        const sy = Math.min(top + gridH + 26, artBottom - scaleH);
        const xAt = (value: number): number => gx + (value / MAX_C) * gw;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(gx, sy, gw, scaleH);
        ctx.fillStyle = ferro ? ALIGNED : '#b45309';
        ctx.fillRect(gx, sy, xAt(temp) - gx, scaleH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(gx, sy, gw, scaleH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xAt(pick.tc), sy - 6);
        ctx.lineTo(xAt(pick.tc), sy + scaleH + 6);
        ctx.stroke();
        if (showTcLabel) {
            outlineText(ctx, `${pick.name} ${pick.tc} °C`, xAt(pick.tc), Math.min(sy + scaleH + 20, artBottom),
                '10px monospace', '#0f172a', 'center', gw * 0.6);
        }
        outlineText(ctx, `${temp} °C`, Math.min(xAt(temp), gx + gw - 26), sy - 8,
            'bold 10px monospace', ferro ? ALIGNED : '#b45309', 'center', 80);

        outlineText(ctx, `${pick.name}: Curie temperature ${pick.tc} °C`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${margin} °C ${ferro ? 'below' : 'above'} the Curie temperature`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ferro ? ALIGNED : '#b45309', 'center', safeRight - 30);

        fitText(ctx, `${pick.name} at ${temp} °C: ${ferro ? 'ferromagnetic' : 'paramagnetic'}`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Every material has its own cliff', safeRight / 2, 118, safeRight - 24, 13);

        const ending = ferro
            ? `so the domains are aligned and it is ferromagnetic, with ${margin} °C of margin in hand.`
            : `so the domains cannot line up and it is paramagnetic, ${margin} °C above its Curie temperature.`;

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, temp / MAX_C)),
                caption: 'Temperature',
                low: '20 °C',
                high: '1,200 °C',
                stops: ['#ecfdf5', '#fcd34d', '#b45309'] as [string, string, string],
            },
            note: `${pick.name} has a Curie temperature of ${pick.tc} °C and this sample is at ${temp} °C, ${ending}`,
        };
    };

    return (
        <LabCanvas
            title="How Hot Before It Stops?"
            readout={({ raw }) => `A sample at ${tempOf(raw)} °C`}
            controlLabel="Temperature"
            controlKey="sampleTemp"
            controlMin={20}
            controlMax={MAX_C}
            controlInitial={20}
            controlDisplay={raw => `${tempOf(raw)} °C`}
            control2={{
                label: 'Material',
                key: 'material',
                min: 1,
                max: 4,
                initial: 3,
                display: raw => MATERIALS[materialOf(raw)].name,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Hot Before It Stops?"
            completeNote="Every material has its own Curie temperature!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
