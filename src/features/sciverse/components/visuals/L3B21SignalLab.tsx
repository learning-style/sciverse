import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Two bars of the SAME length, each one whole pool, divided into its own units:
// ATP into 100 fine ones, ADP into 5, 10 or 20 coarse ones. So one unit is a
// hairline of the top bar and a visible chunk of the bottom one, and the eye reads
// the two fractions straight off. The ratio stops keep 100/ratio whole and the rise
// at or under 100%, so the highlight never runs past the end of its bar.
const SPLITS = [5, 10, 20];
const ATP_UNITS = 100;
const CURRENCY = '#9f1239';
const SIGNAL = '#e11d48';
const MOVED = '#0f172a';

const ratioOf = (dial: number): number => SPLITS[Math.max(0, Math.min(2, Math.round(dial)))];
const fallOf = (dial: number): number => Math.max(1, Math.min(5, Math.round(dial)));

export const L3B21SignalLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const ratio = ratioOf(raw);
        const fall = fallOf(raw2);
        const adpUnits = ATP_UNITS / ratio;        // 20, 10 or 5
        const moved = fall;                        // one unit is 1% of the ATP
        const rise = ratio * fall;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;

        const CAP = 14;
        const LABEL = 20;
        const GAP = 10;
        const barH = Math.max(10, Math.min(28, (usable - CAP - 2 * LABEL - GAP) / 2));
        const blockH = CAP + barH + LABEL + GAP + barH + LABEL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const left = 16;
        const barW = Math.max(80, safeRight - 32);
        const atpTop = top + CAP;
        const atpLabelY = atpTop + barH + 15;
        const adpTop = atpLabelY + GAP;
        const adpLabelY = adpTop + barH + 15;

        // one bar: the whole pool, divided into its own units, last few highlighted
        const drawPool = (y: number, units: number, fill: string) => {
            const seg = barW / units;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(left, y, barW, barH);
            ctx.fillStyle = fill;
            ctx.fillRect(left, y, barW - moved * seg, barH);
            ctx.fillStyle = MOVED;
            ctx.fillRect(left + barW - moved * seg, y, moved * seg, barH);
            ctx.strokeStyle = units > 30 ? 'rgba(255,255,255,0.45)' : '#ffffff';
            ctx.lineWidth = 1;
            for (let i = 1; i < units; i++) {
                ctx.beginPath();
                ctx.moveTo(left + i * seg, y);
                ctx.lineTo(left + i * seg, y + barH);
                ctx.stroke();
            }
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(left, y, barW, barH);
            return left + barW - (moved * seg) / 2;
        };

        const atpMidX = drawPool(atpTop, ATP_UNITS, CURRENCY);
        drawPool(adpTop, adpUnits, SIGNAL);

        // one arrow: that unit left the top pool and joined the bottom one
        const aTop = atpTop + barH + 2;
        const aBot = adpTop - 3;
        const bob = Math.sin(t * 2) * 1.5;
        ctx.strokeStyle = MOVED;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(atpMidX, aTop);
        ctx.lineTo(atpMidX, aBot + bob);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(atpMidX, aBot + 1 + bob);
        ctx.lineTo(atpMidX - 3.5, aBot - 4 + bob);
        ctx.lineTo(atpMidX + 3.5, aBot - 4 + bob);
        ctx.closePath();
        ctx.fillStyle = MOVED;
        ctx.fill();

        outlineText(ctx, 'each bar is one whole pool, split into its own units',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'ATP: ' + moved + ' of ' + ATP_UNITS + ' units = down ' + fall + '%',
            safeRight / 2, Math.min(atpLabelY, artBottom - LABEL),
            'bold 15px monospace', CURRENCY, 'center', safeRight - 24);
        outlineText(ctx, 'ADP: ' + moved + ' of ' + adpUnits + ' units = up ' + rise + '%',
            safeRight / 2, Math.min(adpLabelY, artBottom),
            'bold 15px monospace', SIGNAL, 'center', safeRight - 24);

        outlineText(ctx, 'amplification = ' + ATP_UNITS + ' units / ' + adpUnits
            + ' units = ' + ratio + ' times',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the same unit is ' + ratio + ' times more of the smaller pool',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', SIGNAL, 'center', safeRight - 30);

        fitText(ctx, 'ATP down ' + fall + '%, ADP up ' + rise + '%',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Watch the scarce pool, not the big one',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, rise / 100)),
                caption: 'Rise in ADP, the Signal the Cell Reads',
                low: '0',
                high: '100%',
                stops: ['#fff1f2', '#fda4af', SIGNAL] as [string, string, string],
            },
            note: 'The same ' + moved + ' unit' + (moved === 1 ? '' : 's')
                + ' is ' + fall + '% of the ATP pool and ' + rise + '% of the ADP pool, '
                + 'because ADP is ' + ratio + ' times scarcer. So the cell watches ADP.',
        };
    };

    return (
        <LabCanvas
            title="A Small Store Is a Fast Sensor"
            readout={({ raw }) => 'A cell resting at ' + ratioOf(raw) + ' to 1'}
            controlLabel="Resting ATP to ADP Ratio"
            controlKey="restingRatio"
            controlMin={0}
            controlMax={2}
            controlInitial={1}
            controlDisplay={raw => ratioOf(raw) + ' to 1'}
            control2={{
                label: 'Fall in ATP',
                key: 'atpFall',
                min: 1,
                max: 5,
                initial: 1,
                display: raw => fallOf(raw) + '%',
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
