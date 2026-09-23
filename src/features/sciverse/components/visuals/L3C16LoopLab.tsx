import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SOFT = 80;
const HARDEST = 900000;
const EMERALD = '#047857';
const HEAT = '#b45309';

const coercivityOf = (dial: number): number => {
    // The dial runs in decades, because the range spans 80 to 900,000 A/m
    const decades = Math.max(0, Math.min(4, Math.round(dial * 10) / 10));
    return Math.round(SOFT * Math.pow(10, decades));
};
const hertzOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial)));

const nameFor = (coercivity: number): string => {
    if (coercivity < 500) return 'soft iron';
    if (coercivity < 20000) return 'a middling alloy';
    if (coercivity < 300000) return 'alnico';
    return 'neodymium';
};

export const L3C16LoopLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const coercivity = coercivityOf(raw);
        const hertz = hertzOf(raw2);
        // Loop width grows with coercivity, so its area does too: the area is the
        // energy turned to heat each cycle
        const width = Math.log10(coercivity / SOFT) / 4;
        const lapsPerHour = hertz * 3600;
        const relativeArea = 0.08 + width * 0.92;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const plotH = Math.max(40, Math.min(150, usable * 0.6, usable - 34));
        const blockH = plotH + 30;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const plotW = Math.min(safeRight - 96, plotH * 2.1);
        const cx = safeRight / 2;
        const cy = top + plotH / 2;

        // Axes: applied field across, magnetisation up
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - plotW / 2, cy);
        ctx.lineTo(cx + plotW / 2, cy);
        ctx.moveTo(cx, cy - plotH / 2);
        ctx.lineTo(cx, cy + plotH / 2);
        ctx.stroke();

        // The loop itself, wider for a harder material
        const halfW = (plotW / 2) * (0.12 + width * 0.82);
        const halfH = plotH * 0.42;
        const branch = (sign: number) => {
            ctx.beginPath();
            for (let i = 0; i <= 60; i++) {
                const u = -1 + (2 * i) / 60;
                const px = cx + u * (plotW / 2);
                const py = cy - sign * halfH * Math.tanh((u * (plotW / 2) + sign * halfW) / (plotW * 0.12));
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        };
        ctx.strokeStyle = coercivity < 500 ? EMERALD : HEAT;
        ctx.lineWidth = 2.5;
        branch(1);
        branch(-1);

        // Remanence, and the coercivity that wipes it
        const remY = cy - halfH * Math.tanh(halfW / (plotW * 0.12));
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(cx, remY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'remanence', cx + 8, remY - 6, '10px monospace', '#0f172a', 'left', plotW / 2);
        ctx.beginPath();
        ctx.arc(cx - halfW, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'coercivity', cx - halfW - 8, cy + 14, '10px monospace', '#0f172a', 'right', plotW / 2);
        outlineText(ctx, 'applied field', cx + plotW / 2, cy - 6, '10px monospace', '#475569', 'right', plotW / 2);

        outlineText(ctx, `${nameFor(coercivity)}: ${coercivity.toLocaleString()} A/m`,
            cx, Math.min(top + plotH + 18, artBottom), 'bold 11px monospace',
            coercivity < 500 ? EMERALD : HEAT, 'center', safeRight - 40);

        outlineText(ctx, `${hertz} laps a second, so ${lapsPerHour.toLocaleString()} laps an hour`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, hertz === 0
            ? 'no laps, so no heat: a permanent magnet just sits there'
            : `heat per second is the loop area times ${hertz} laps`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', hertz === 0 ? EMERALD : HEAT, 'center', safeRight - 30);

        fitText(ctx, `coercivity ${coercivity.toLocaleString()} A/m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Thin loop or fat loop', safeRight / 2, 118, safeRight - 24, 13);

        const ending = hertz === 0
            ? 'It runs no laps at all, so a fat loop costs it nothing -- which is what a permanent magnet wants.'
            : `Driven ${hertz} times a second it goes round ${lapsPerHour.toLocaleString()} times an hour, paying the loop area every lap.`;

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, relativeArea)),
                caption: 'Loop Area',
                low: 'thin',
                high: 'fat',
                stops: ['#ecfdf5', '#fcd34d', HEAT] as [string, string, string],
            },
            note: `${nameFor(coercivity)} has a coercivity near ${coercivity.toLocaleString()} A/m. ${ending}`,
        };
    };

    return (
        <LabCanvas
            title="Why Some Magnets Stay"
            readout={({ raw }) => `${nameFor(coercivityOf(raw))}, at ${coercivityOf(raw).toLocaleString()} A/m`}
            controlLabel="Coercivity"
            controlKey="coercivity"
            controlMin={0}
            controlMax={4}
            controlInitial={0}
            controlDisplay={raw => `${coercivityOf(raw).toLocaleString()} A/m`}
            control2={{
                label: 'Cycles per Second',
                key: 'cyclesPerSecond',
                min: 0,
                max: 100,
                initial: 50,
                display: raw => `${hertzOf(raw)} Hz`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Some Magnets Stay"
            completeNote="Loop area is the heat per lap!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
