import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Counting, not lengths. One dot is 0.05 mM, so ATP is 100 dots and a 1% fall is
// exactly one dot. That makes the mechanism countable: the same one dot is 1 out of
// 100 on the left and 1 out of 10 on the right. A shared-height bar cannot show 1%
// at all -- it is a hairline -- which is why this draws a dot grid instead.
const MAX_RISE = 250;
const PER_DOT = 0.05;
const ATP_DOTS = 100;
const COLS = 25;
const ATP_ROWS = 4;
const CURRENCY = '#9f1239';
const SIGNAL = '#e11d48';
const MOVED = '#0f172a';

// four stops, the four rows of the lesson's own table
const RATIOS = [5, 10, 20, 50];
const ratioOf = (dial: number): number => RATIOS[Math.max(0, Math.min(3, Math.round(dial)))];
const fallOf = (dial: number): number => Math.max(1, Math.min(5, Math.round(dial)));

export const L3B21SignalLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const ratio = ratioOf(raw);
        const fall = fallOf(raw2);
        const adpDots = ATP_DOTS / ratio;          // 20, 10, 5 or 2
        const moved = fall;                        // one dot is 1% of the ATP
        const rise = ratio * fall;
        const atpMM = ATP_DOTS * PER_DOT;
        const adpMM = adpDots * PER_DOT;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;

        // three text rows get their own bands so no label can land on a dot: the
        // caption and the ATP line above the block, the ADP line below the row.
        const HEAD = 26;
        const TAIL = 18;
        const SPAN = ATP_ROWS - 1 + 1.6;           // row 0 to the ADP row, in pitches
        const margin = 14;
        // SPAN + 0.72 because the block also spends a dot radius at each end (r = 0.36 pitch)
        const pitch = Math.max(4, Math.min((safeRight - 2 * margin) / COLS,
            (usable - HEAD - TAIL - 8) / (SPAN + 0.72)));
        const r = Math.max(1.6, pitch * 0.36);
        const gridW = COLS * pitch;
        const left = (safeRight - gridW) / 2 + pitch / 2;

        const blockH = HEAD + 2 * r + SPAN * pitch + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const atpTop = top + HEAD + r + 2;
        const adpTop = atpTop + SPAN * pitch;

        const dot = (cx: number, cy: number, fill: string, hollow: boolean) => {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            if (hollow) {
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.strokeStyle = MOVED;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            } else {
                ctx.fillStyle = fill;
                ctx.fill();
            }
        };

        // ATP: 100 dots, and the ones that left are empty rings
        let gapX = left;
        let gapY = atpTop;
        for (let i = 0; i < ATP_DOTS; i++) {
            const cx = left + (i % COLS) * pitch;
            const cy = atpTop + Math.floor(i / COLS) * pitch;
            const gone = i >= ATP_DOTS - moved;
            dot(cx, cy, CURRENCY, gone);
            if (i === ATP_DOTS - moved) { gapX = cx; gapY = cy; }
        }

        // ADP: its own dots, then the very same ones that arrived
        for (let i = 0; i < adpDots + moved; i++) {
            const cx = left + i * pitch;
            dot(cx, adpTop, i < adpDots ? SIGNAL : MOVED, false);
        }
        const arrivedX = left + (adpDots + moved - 0.5) * pitch;

        // one arrow, from the rings to the dots that arrived
        const swing = (Math.sin(t * 2) + 1) / 2;
        ctx.strokeStyle = MOVED;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(gapX, gapY + r + 2);
        ctx.bezierCurveTo(gapX, gapY + pitch * 1.4, arrivedX, adpTop - pitch * 1.4,
            arrivedX, adpTop - r - 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(arrivedX, adpTop - r - 2);
        ctx.lineTo(arrivedX - 3.2, adpTop - r - 7);
        ctx.lineTo(arrivedX + 3.2, adpTop - r - 7);
        ctx.closePath();
        ctx.fillStyle = MOVED;
        ctx.fill();
        // a dot travelling the arrow, so it is clear which way it goes
        ctx.beginPath();
        ctx.arc(gapX + (arrivedX - gapX) * swing,
            gapY + r + 2 + (adpTop - r - 3 - gapY - r - 2) * swing, r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = MOVED;
        ctx.fill();

        outlineText(ctx, 'each dot is ' + PER_DOT.toFixed(2) + ' mM, and '
            + moved + (moved === 1 ? ' dot moved down' : ' dots moved down'),
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 30);
        outlineText(ctx, 'ATP lost ' + moved + ' of ' + ATP_DOTS + ' dots = ' + fall + '%',
            safeRight / 2, Math.max(top + 24, artTop + 24),
            'bold 12px monospace', CURRENCY, 'center', safeRight - 30);
        outlineText(ctx, 'ADP gained ' + moved + ' of ' + adpDots + ' dots = ' + rise + '%',
            safeRight / 2, Math.max(adpTop + r + 11, Math.min(adpTop + r + 14, artBottom)),
            'bold 12px monospace', SIGNAL, 'center', safeRight - 30);

        outlineText(ctx, 'amplification = ATP ' + atpMM.toFixed(1) + ' mM / ADP '
            + adpMM.toFixed(2) + ' mM = ' + ratio + ' times',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the same dots are ' + ratio + ' times more of the smaller pool',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', SIGNAL, 'center', safeRight - 30);

        fitText(ctx, 'ADP up ' + rise + '%, ATP down ' + fall + '%',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The same amount, out of two different pools',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, rise / MAX_RISE)),
                caption: 'Rise in ADP, the Signal the Cell Reads',
                low: '0',
                high: MAX_RISE + '%',
                stops: ['#fff1f2', '#fda4af', SIGNAL] as [string, string, string],
            },
            note: 'Each dot is ' + PER_DOT.toFixed(2) + ' mM, so ATP is ' + ATP_DOTS
                + ' dots and ' + adpMM.toFixed(2) + ' mM of ADP is ' + adpDots
                + ' dots. Spending ' + fall + '% of the ATP moves exactly ' + moved
                + (moved === 1 ? ' dot' : ' dots')
                + ' from the top row to the bottom one -- the empty rings are where they were. '
                + 'Count them and the mechanism is plain: ' + moved + ' out of ' + ATP_DOTS
                + ' is ' + fall + '%, and the same ' + moved + ' out of ' + adpDots + ' is '
                + rise + '%. So the amplification is ' + ratio
                + ' times, which is exactly the resting ratio of the two pools, because the same '
                + 'number of dots is a bigger share of the smaller pile. That is why the cell does '
                + 'not measure ATP but ADP: the scarce pool carries the larger signal. Turn the '
                + 'ratio dial up and the bottom row gets shorter and the sensor sharper, which is '
                + 'why some nerve cells hold 50 to 1 -- and why they have the thinnest margin when '
                + 'supply fails. Hold plenty of the currency and very little of the signal.',
        };
    };

    return (
        <LabCanvas
            title="A Small Store Is a Fast Sensor"
            readout={({ raw }) => 'A cell resting at ' + ratioOf(raw) + ' to 1'}
            controlLabel="Resting ATP to ADP Ratio"
            controlKey="restingRatio"
            controlMin={0}
            controlMax={3}
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
