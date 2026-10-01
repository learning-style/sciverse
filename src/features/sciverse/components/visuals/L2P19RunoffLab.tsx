import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const HOURS = 2;           // the storm lasts two hours, so a rate becomes a depth
const MAX_RUNOFF = 50;     // mm/h at the top of the meter
const SOAK = '#4338ca';
const RUNOFF = '#b91c1c';

const rainOf = (dial: number): number => Math.max(2, Math.min(50, Math.round(dial)));
const soilOf = (dial: number): number => Math.max(2, Math.min(50, Math.round(dial)));

export const L2P19RunoffLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rain = rainOf(raw);
        const soil = soilOf(raw2);
        const runs = Math.max(0, rain - soil);
        const soaks = Math.min(rain, soil);
        const floods = runs > 0;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const groundY = top + capBand + boxH * 0.42;
        const soilBottom = top + capBand + boxH;

        const boxW = Math.max(140, Math.min(safeRight - 90, safeRight * 0.7));
        const cx = safeRight / 2;
        const left = cx - boxW / 2;

        // the soil block
        ctx.fillStyle = '#e7e5e4';
        ctx.fillRect(left, groundY, boxW, soilBottom - groundY);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, groundY, boxW, soilBottom - groundY);

        // falling rain: more streaks when the rate is higher
        const streaks = Math.max(3, Math.min(14, Math.round(rain / 3)));
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        for (let i = 0; i < streaks; i++) {
            const sx = left + 8 + ((i * 37) % Math.max(12, boxW - 16));
            const fall = ((t * 60 + i * 23) % Math.max(14, groundY - top - capBand));
            const sy = top + capBand + fall;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx, Math.min(sy + 9, groundY - 1));
            ctx.stroke();
        }

        // arrows into the soil, in proportion to what soaks in
        const inArrows = Math.max(1, Math.min(7, Math.round(soaks / 6) + 1));
        ctx.strokeStyle = SOAK;
        ctx.fillStyle = SOAK;
        ctx.lineWidth = 2;
        for (let i = 0; i < inArrows; i++) {
            const ax = left + (boxW / inArrows) * (i + 0.5);
            const len = Math.max(8, (soilBottom - groundY) * 0.55);
            ctx.beginPath();
            ctx.moveTo(ax, groundY + 3);
            ctx.lineTo(ax, groundY + len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ax, groundY + len + 5);
            ctx.lineTo(ax - 4, groundY + len - 2);
            ctx.lineTo(ax + 4, groundY + len - 2);
            ctx.closePath();
            ctx.fill();
        }

        // water running off across the surface, when there is any
        if (floods) {
            const depth = Math.max(3, Math.min(14, runs / 3));
            ctx.fillStyle = 'rgba(185,28,28,0.35)';
            ctx.fillRect(left, groundY - depth, boxW, depth);
            ctx.strokeStyle = RUNOFF;
            ctx.lineWidth = 2;
            const ax = left + boxW - 14;
            ctx.beginPath();
            ctx.moveTo(ax - 26, groundY - depth / 2);
            ctx.lineTo(ax, groundY - depth / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ax + 5, groundY - depth / 2);
            ctx.lineTo(ax - 2, groundY - depth / 2 - 4);
            ctx.lineTo(ax - 2, groundY - depth / 2 + 4);
            ctx.closePath();
            ctx.fillStyle = RUNOFF;
            ctx.fill();
        }

        outlineText(ctx, 'rain arriving, and where it goes', cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'rainfall rate ' + rain + ' mm/h', cx, Math.max(groundY - 20, artTop + 24),
            'bold 11px monospace', '#1d4ed8', 'center', safeRight - 30);
        outlineText(ctx, 'soaks in ' + soaks + ' mm/h', cx,
            Math.min(soilBottom + 14, artBottom - 12),
            'bold 12px monospace', SOAK, 'center', safeRight - 30);
        outlineText(ctx, floods ? 'runs off ' + runs + ' mm/h' : 'nothing runs off',
            cx, Math.min(soilBottom + labelTail + 12, artBottom),
            'bold 11px monospace', floods ? RUNOFF : SOAK, 'center', safeRight - 30);

        outlineText(ctx, 'rainfall rate ' + rain + ' mm/h - soil takes ' + soil
            + ' mm/h = ' + runs + ' mm/h runs off',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, floods
            ? 'over ' + HOURS + ' hours that is ' + runs * HOURS + ' mm leaving the field'
            : 'the ground is keeping up, so all of it soaks in',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', floods ? RUNOFF : SOAK,
            'center', safeRight - 30);

        fitText(ctx, floods ? 'runs off ' + runs + ' mm/h' : 'nothing runs off',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Rates, not totals, decide whether a field floods',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, runs / MAX_RUNOFF)),
                caption: 'Water Running Off the Field',
                low: '0 mm/h',
                high: MAX_RUNOFF + ' mm/h',
                stops: ['#eef2ff', '#93c5fd', RUNOFF] as [string, string, string],
            },
            note: 'Rain arrives at ' + rain + ' mm/h and this soil takes water in at ' + soil
                + ' mm/h, so ' + soaks + ' mm/h soaks in and ' + runs + ' mm/h runs off. '
                + (floods
                    ? 'Over ' + HOURS + ' hours that is ' + runs * HOURS
                      + ' mm leaving the field.'
                    : 'Nothing runs off: the ground takes the rain as fast as it arrives.'),
        };
    };

    return (
        <LabCanvas
            title="Will the Rain Soak In?"
            readout={({ raw }) => 'Rain at ' + rainOf(raw) + ' mm/h'}
            controlLabel="Rainfall Rate"
            controlKey="rainfallRate"
            controlMin={2}
            controlMax={50}
            controlInitial={20}
            controlDisplay={raw => rainOf(raw) + ' mm/h'}
            control2={{
                label: 'How Fast the Soil Takes Water',
                key: 'soilIntakeRate',
                min: 2,
                max: 50,
                initial: 8,
                display: raw => soilOf(raw) + ' mm/h',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Does Soil Support Life?"
            completeNote="Rates, not totals!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
