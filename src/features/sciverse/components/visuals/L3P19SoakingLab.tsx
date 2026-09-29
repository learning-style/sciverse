import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const RAIN = 20;           // mm/h, the storm L2P19 used
const MAX_RATE = 90;       // mm/h at the top of the meter
const FAST = '#1d4ed8';
const SETTLED = '#4338ca';

const speedOf = (dial: number): number => Math.max(1, Math.min(20, Math.round(dial)));
const pullOf = (dial: number): number => Math.max(20, Math.min(300, Math.round(dial / 10) * 10));

/** Water soaked in so far, in mm, advancing with the animation clock. */
const soakedOf = (t: number): number => 5 + ((t * 18) % 395);

export const L3P19SoakingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const own = speedOf(raw);
        const pull = pullOf(raw2);
        const soaked = soakedOf(t);
        const rate = own * (1 + pull / soaked);
        const bracket = 1 + pull / soaked;
        const ahead = rate > RAIN;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const plotH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + plotH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const plotTop = top + capBand;
        const baseY = plotTop + plotH;

        const plotW = Math.max(130, Math.min(safeRight - 110, safeRight * 0.64));
        const cx = safeRight / 2;
        const left = cx - plotW / 2;

        const yFor = (mmh: number) => baseY - Math.max(0, Math.min(1, mmh / MAX_RATE)) * plotH;
        const xFor = (mm: number) => left + (Math.log10(Math.max(5, mm) / 5) / Math.log10(80)) * plotW;

        // the rain line, so you can see where the soil crosses it
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(left, yFor(RAIN));
        ctx.lineTo(left + plotW, yFor(RAIN));
        ctx.stroke();
        ctx.setLineDash([]);

        // the soaking-rate curve as more and more water goes in
        ctx.strokeStyle = FAST;
        ctx.lineWidth = 3;
        ctx.beginPath();
        let started = false;
        for (let mm = 5; mm <= 400; mm *= 1.12) {
            const x = xFor(mm);
            const y = yFor(own * (1 + pull / mm));
            if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
        }
        ctx.stroke();

        // the soil's own speed, the floor the curve settles onto
        ctx.strokeStyle = SETTLED;
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(left, yFor(own));
        ctx.lineTo(left + plotW, yFor(own));
        ctx.stroke();
        ctx.setLineDash([]);

        // where we are now
        const px = xFor(soaked);
        const py = yFor(rate);
        ctx.fillStyle = ahead ? FAST : '#b91c1c';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'soaking rate as more water goes in', cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'rain ' + RAIN + ' mm/h', left + 4, Math.max(yFor(RAIN) - 6, artTop + 24),
            'bold 10px monospace', '#334155', 'left', Math.max(60, plotW - 8));
        outlineText(ctx, 'the soil’s own speed ' + own + ' mm/h',
            left + 4, Math.min(Math.max(yFor(own) + 12, artTop + 38), artBottom - 14),
            'bold 10px monospace', SETTLED, 'left', Math.max(60, plotW - 8));
        outlineText(ctx, 'water soaked in so far ' + soaked.toFixed(0) + ' mm',
            cx, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, ahead ? 'ahead of the rain, so nothing runs off'
            : 'the rain has overtaken it, so water runs off',
            cx, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', ahead ? FAST : '#b91c1c', 'center', safeRight - 30);

        outlineText(ctx, own + ' mm/h x (1 + ' + pull + '/' + soaked.toFixed(0) + ') = '
            + own + ' x ' + bracket.toFixed(2) + ' = ' + rate.toFixed(0) + ' mm/h',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the bracket falls towards 1, and the 1 is gravity',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'soaking rate ' + rate.toFixed(0) + ' mm/h', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Dryness buys time, and gravity sets the floor',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, rate / MAX_RATE)),
                caption: 'How Fast the Soil Is Taking Water',
                low: '0 mm/h',
                high: MAX_RATE + ' mm/h',
                stops: ['#eef2ff', '#93c5fd', FAST] as [string, string, string],
            },
            note: 'This soil moves water at ' + own
                + ' mm/h under gravity alone, and dry soil below pulls with a strength worth '
                + pull + ' mm. With ' + soaked.toFixed(0)
                + ' mm of water soaked in so far, the bracket is ' + bracket.toFixed(2)
                + ' and the soaking rate is ' + rate.toFixed(0) + ' mm/h. '
                + (ahead
                    ? 'That is still ahead of ' + RAIN + ' mm/h of rain, so nothing runs off yet.'
                    : 'That has fallen below ' + RAIN + ' mm/h of rain, so the surplus now runs off.')
                + ' The pull decides the opening minutes and the soil’s own speed decides the '
                + 'rest of the storm, because the pull has to reach across everything already wet '
                + 'while gravity never fades. That is why dry ground looks bottomless at first, and '
                + 'why the second day of rain floods when the first did not.',
        };
    };

    return (
        <LabCanvas
            title="Why the Ground Stops Drinking"
            readout={({ raw }) => 'Soil moving water at ' + speedOf(raw) + ' mm/h'}
            controlLabel="The Soil's Own Speed"
            controlKey="soilOwnSpeed"
            controlMin={1}
            controlMax={20}
            controlInitial={8}
            controlDisplay={raw => speedOf(raw) + ' mm/h'}
            control2={{
                label: 'Pull of Dry Soil',
                key: 'dryPull',
                min: 20,
                max: 300,
                initial: 100,
                display: raw => pullOf(raw) + ' mm',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Does Soil Support Life?"
            completeNote="Dry ground is bottomless, until it is not!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
