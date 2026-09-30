import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// A ratio of 50 to 1 with a 5% fall is a 250% rise in ADP, so the meter spans 250 and
// nothing pegs at the extremes. Both pools are drawn on one scale, which is the whole
// point: the slice moved is the same height on both bars.
const MAX_RISE = 250;
const SCALE_MM = 5.6;
const ATP_MM = 5.0;
const CURRENCY = '#9f1239';
const SIGNAL = '#e11d48';
const MOVED = '#0f172a';

const ratioOf = (dial: number): number => Math.round(dial);
const fallOf = (dial: number): number => Math.round(dial) / 10;

export const L3B21SignalLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const ratio = ratioOf(raw);
        const fall = fallOf(raw2);
        const adpMM = ATP_MM / ratio;
        const movedMM = ATP_MM * (fall / 100);
        const rise = ratio * fall;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(20, Math.min(32, usable * 0.19));
        const barsH = Math.max(50, Math.min(160, usable - capBand - labelTail));
        const blockH = capBand + barsH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barsTop = top + capBand;
        const barsBottom = barsTop + barsH;

        const perMM = barsH / SCALE_MM;
        const barW = Math.max(30, Math.min(safeRight * 0.17, 72));
        const gap = Math.max(36, Math.min(safeRight * 0.16, 90));
        const atpX = safeRight / 2 - gap / 2 - barW;
        const adpX = safeRight / 2 + gap / 2;

        const drawBar = (x: number, mm: number, colour: string, movedOnTop: boolean) => {
            const h = Math.max(2, mm * perMM);
            const movedH = Math.max(2, movedMM * perMM);
            ctx.fillStyle = colour;
            ctx.fillRect(x, barsBottom - h, barW, h);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, barsBottom - h, barW, h);
            // the slice that moved, drawn the same height on both bars
            ctx.fillStyle = MOVED;
            if (movedOnTop) {
                ctx.fillRect(x, barsBottom - h - movedH, barW, movedH);
                ctx.strokeRect(x, barsBottom - h - movedH, barW, movedH);
            } else {
                ctx.fillRect(x, barsBottom - h, barW, Math.min(movedH, h));
                ctx.strokeRect(x, barsBottom - h, barW, Math.min(movedH, h));
            }
            return h;
        };

        const atpH = drawBar(atpX, ATP_MM, CURRENCY, false);
        const adpH = drawBar(adpX, adpMM, SIGNAL, true);

        // the slice travelling from one pool to the other, one molecule at a time
        const midY = barsBottom - Math.max(atpH, 14) - 10;
        for (let i = 0; i < 4; i++) {
            const p = ((t * 0.5 + i * 0.25) % 1);
            ctx.fillStyle = MOVED;
            ctx.beginPath();
            ctx.arc(atpX + barW + p * (adpX - atpX - barW),
                midY - Math.sin(p * Math.PI) * 12, 2.6, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'both pools on one scale, and the same slice moved',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'ATP ' + ATP_MM.toFixed(1) + ' mM',
            atpX + barW / 2, Math.max(barsBottom - atpH - 8, artTop + 24),
            'bold 11px monospace', CURRENCY, 'center', safeRight / 2 - 8);
        outlineText(ctx, 'ADP ' + adpMM.toFixed(2) + ' mM',
            adpX + barW / 2, Math.max(barsBottom - adpH - 16, artTop + 24),
            'bold 11px monospace', SIGNAL, 'center', safeRight / 2 - 8);
        outlineText(ctx, 'down ' + fall.toFixed(1) + '%', atpX + barW / 2,
            Math.min(barsBottom + 14, artBottom - 12),
            'bold 12px monospace', CURRENCY, 'center', safeRight / 2 - 8);
        outlineText(ctx, 'up ' + rise.toFixed(0) + '%', adpX + barW / 2,
            Math.min(barsBottom + 14, artBottom - 12),
            'bold 12px monospace', SIGNAL, 'center', safeRight / 2 - 8);
        outlineText(ctx, 'the slice moved is ' + movedMM.toFixed(3) + ' mM either way',
            safeRight / 2, Math.min(barsBottom + labelTail + 10, artBottom),
            'bold 11px monospace', MOVED, 'center', safeRight - 30);

        outlineText(ctx, 'amplification = ATP ' + ATP_MM.toFixed(1) + ' / ADP '
            + adpMM.toFixed(2) + ' = ' + ratio + ' times',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'a fall of ' + fall.toFixed(1) + '% in ATP is a rise of '
            + rise.toFixed(0) + '% in ADP',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', SIGNAL, 'center', safeRight - 30);

        fitText(ctx, 'ADP up ' + rise.toFixed(0) + '%, amplified ' + ratio + ' times',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A small store is a fast sensor', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, rise / MAX_RISE)),
                caption: 'Rise in ADP, the Signal the Cell Reads',
                low: '0',
                high: MAX_RISE + '%',
                stops: ['#fff1f2', '#fda4af', SIGNAL] as [string, string, string],
            },
            note: 'A cell resting at ' + ratio + ' to 1 holds ATP at ' + ATP_MM.toFixed(1)
                + ' mM and ADP at ' + adpMM.toFixed(2) + ' mM. Spend ' + fall.toFixed(1)
                + '% of the ATP and that is ' + movedMM.toFixed(3)
                + ' mM, which leaves the ATP pool and joins the ADP pool -- the same slice, drawn '
                + 'the same height on both bars. As a fraction it is ' + fall.toFixed(1)
                + '% of the ATP and ' + rise.toFixed(0)
                + '% of the ADP, so the amplification is ' + ratio
                + ' times, which is exactly the resting ratio. That is the mechanism: the cell does '
                + 'not measure ATP, it measures ADP, because the scarce pool carries the larger '
                + 'signal. Turn the ratio dial up and the sensor sharpens, which is why some nerve '
                + 'cells hold 50 to 1 -- and why they have the thinnest margin when supply fails. '
                + 'Keeping ten times more ADP would take the amplification to about 1 and leave '
                + 'the cell nearly blind. Hold plenty of the currency and very little of the signal.',
        };
    };

    return (
        <LabCanvas
            title="A Small Store Is a Fast Sensor"
            readout={({ raw }) => 'A cell resting at ' + ratioOf(raw) + ' to 1'}
            controlLabel="Resting ATP to ADP Ratio"
            controlKey="restingRatio"
            controlMin={5}
            controlMax={50}
            controlInitial={10}
            controlDisplay={raw => ratioOf(raw) + ' to 1'}
            control2={{
                label: 'Fall in ATP',
                key: 'atpFall',
                min: 5,
                max: 50,
                initial: 10,
                display: raw => fallOf(raw).toFixed(1) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Cycles Keep Systems Alive?"
            completeNote="Hold plenty of the currency and little of the signal!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
