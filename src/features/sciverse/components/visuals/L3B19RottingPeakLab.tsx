import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const PEAK_AT = 60;        // percent of pores holding water, where the product peaks
const FALL = 4;            // t/ha/yr of leaf fall, from L2B19
const PEAK_SHARE = 0.40;   // share rotting each year at the peak
const WATERC = '#1d4ed8';
const AIRC = '#be123c';
const BEST = '#7f1d1d';

const fullOf = (dial: number): number => Math.max(5, Math.min(98, Math.round(dial)));
const poreOf = (dial: number): number => Math.max(35, Math.min(60, Math.round(dial)));

const waterFactor = (full: number): number => Math.min(1, full / PEAK_AT);
const airFactor = (full: number): number => Math.min(1, (100 - full) / (100 - PEAK_AT));

export const L3B19RottingPeakLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const full = fullOf(raw);
        const pore = poreOf(raw2);
        const water = waterFactor(full);
        const air = airFactor(full);
        const rate = water * air;
        const store = FALL / Math.max(0.01, PEAK_SHARE * rate);
        const atPeak = Math.abs(full - PEAK_AT) <= 3;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const plotH = Math.max(46, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + plotH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const plotTop = top + capBand;
        const baseY = plotTop + plotH;

        const plotW = Math.max(130, Math.min(safeRight - 110, safeRight * 0.64));
        const cx = safeRight / 2;
        const left = cx - plotW / 2;
        const xFor = (pct: number) => left + (pct / 100) * plotW;
        const yFor = (f: number) => baseY - Math.max(0, Math.min(1, f)) * plotH;

        // the two competing factors, drawn as the straight lines they are
        ctx.strokeStyle = WATERC;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xFor(0), yFor(0));
        ctx.lineTo(xFor(PEAK_AT), yFor(1));
        ctx.lineTo(xFor(100), yFor(1));
        ctx.stroke();

        ctx.strokeStyle = AIRC;
        ctx.beginPath();
        ctx.moveTo(xFor(0), yFor(1));
        ctx.lineTo(xFor(PEAK_AT), yFor(1));
        ctx.lineTo(xFor(100), yFor(0));
        ctx.stroke();

        // their product, which is the rotting rate
        ctx.strokeStyle = BEST;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let p = 0; p <= 100; p += 2) {
            const y = yFor(waterFactor(p) * airFactor(p));
            if (p === 0) ctx.moveTo(xFor(p), y); else ctx.lineTo(xFor(p), y);
        }
        ctx.stroke();

        // where the dial has put us
        ctx.fillStyle = BEST;
        ctx.beginPath();
        ctx.arc(xFor(full), yFor(rate), 5, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'water rising, air falling, and how fast it rots',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'water factor', xFor(12), Math.max(yFor(0.24) - 6, artTop + 24),
            'bold 10px monospace', WATERC, 'left', Math.max(50, plotW / 2));
        outlineText(ctx, 'air factor', xFor(86), Math.max(yFor(0.24) - 6, artTop + 38),
            'bold 10px monospace', AIRC, 'right', Math.max(50, plotW / 2));
        outlineText(ctx, 'pores ' + full + '% full of water, ' + pore + '% of the soil is pore',
            cx, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, atPeak ? 'at the peak: nothing is short'
            : (full < PEAK_AT ? 'too dry: water is short' : 'too wet: air is short'),
            cx, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', atPeak ? BEST : (full < PEAK_AT ? WATERC : AIRC),
            'center', safeRight - 30);

        outlineText(ctx, 'water ' + water.toFixed(2) + ' x air ' + air.toFixed(2)
            + ' = ' + rate.toFixed(2) + ' of the best rate',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'so the store settles at ' + store.toFixed(0) + ' t/ha',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', BEST, 'center', safeRight - 30);

        fitText(ctx, 'rots at ' + rate.toFixed(2) + ' of the best rate',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A product, so either one can veto', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, rate)),
                caption: 'How Fast Dead Material Rots',
                low: 'stopped',
                high: 'the best rate',
                stops: ['#fff1f2', '#fdba74', BEST] as [string, string, string],
            },
            note: 'At ' + full + '% full the water factor is ' + water.toFixed(2)
                + ', the air factor ' + air.toFixed(2) + ', so rotting runs at '
                + rate.toFixed(2) + ' of its best. '
                + (atPeak ? 'This is the peak.'
                    : (full < PEAK_AT ? 'Water is short here.' : 'Air is short here.')),
        };
    };

    return (
        <LabCanvas
            title="Water and Air Share the Spaces"
            readout={({ raw }) => 'Pores ' + fullOf(raw) + '% full of water'}
            controlLabel="How Full of Water the Pores Are"
            controlKey="poresFull"
            controlMin={5}
            controlMax={98}
            controlInitial={60}
            controlDisplay={raw => fullOf(raw) + '% full'}
            control2={{
                label: 'Total Pore Space',
                key: 'totalPoreSpace',
                min: 35,
                max: 60,
                initial: 50,
                display: raw => poreOf(raw) + '% of the soil',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Does Soil Support Life?"
            completeNote="One pore space, three things fighting over it!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
