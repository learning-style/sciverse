import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// The dials reach 400 g over 30 kg a day, which is 19 minutes, so the meter spans
// 20 minutes and nothing pegs at the extremes.
const MAX_MIN = 20;
const EASY = '#be123c';
const TIGHT = '#7f1d1d';

const poolOf = (dial: number): number => Math.max(100, Math.min(400, Math.round(dial / 10) * 10));
const rateOf = (dial: number): number => Math.max(30, Math.min(1300, Math.round(dial / 10) * 10));

export const L2B21ATPLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const poolG = poolOf(raw);
        const rateKg = rateOf(raw2);
        const minutes = (poolG / (rateKg * 1000)) * 24 * 60;
        const rebuilds = (rateKg * 1000) / poolG;
        const tight = minutes < 1;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const boxTop = top + capBand;
        const boxBottom = boxTop + boxH;

        // the pool as a small tank, with spending pouring out fast
        const tankW = Math.max(46, Math.min(safeRight * 0.22, 96));
        const cx = safeRight / 2;
        const left = cx - tankW / 2;
        const fill = Math.max(5, Math.min(boxH - 6, (poolG / 400) * (boxH - 6)));

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, boxTop, tankW, boxH);
        ctx.fillStyle = tight ? '#fecaca' : '#fda4af';
        ctx.fillRect(left, boxBottom - fill, tankW, fill);
        ctx.strokeRect(left, boxBottom - fill, tankW, fill);

        // spending out one side, rebuilding in from the other, both fast
        const streams = Math.max(2, Math.min(9, Math.round(rateKg / 120) + 2));
        for (let i = 0; i < streams; i++) {
            const span = Math.max(14, (safeRight / 2) - left - 8);
            const speed = 20 + rateKg / 14;
            ctx.fillStyle = tight ? TIGHT : EASY;
            const ox = left + tankW + ((t * speed + i * 19) % span);
            ctx.beginPath();
            ctx.arc(ox, boxBottom - fill / 2 - 6, 2.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0f172a';
            const ix = left - ((t * speed + i * 17) % span);
            ctx.beginPath();
            ctx.arc(ix, boxBottom - fill / 2 + 6, 2.6, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'the pool your cells spend from, and the traffic through it',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'pool ' + poolG + ' g of ATP',
            cx, Math.max(boxBottom - fill - 10, artTop + 26),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'spending ' + rateKg + ' kg a day',
            cx, Math.min(boxBottom + 14, artBottom - 12),
            'bold 12px monospace', tight ? TIGHT : EASY, 'center', safeRight - 30);
        outlineText(ctx, 'rebuilt ' + rebuilds.toFixed(0) + ' times a day',
            cx, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'pool ' + poolG + ' g / spending ' + (rateKg * 1000).toLocaleString()
            + ' g a day = ' + (minutes >= 1
                ? minutes.toFixed(1) + ' minutes'
                : (minutes * 60).toFixed(0) + ' seconds'),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, tight
            ? 'under a minute in hand: this cannot pause for even a breath'
            : 'that is the whole reserve of spendable energy',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', tight ? TIGHT : EASY,
            'center', safeRight - 30);

        fitText(ctx, minutes >= 1
            ? 'reserve ' + minutes.toFixed(1) + ' minutes'
            : 'reserve ' + (minutes * 60).toFixed(0) + ' seconds',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A full warehouse and nothing in the till',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, minutes / MAX_MIN)),
                caption: 'Reserve of Spendable Energy',
                low: '0',
                high: MAX_MIN + ' minutes',
                stops: ['#fff1f2', '#fda4af', EASY] as [string, string, string],
            },
            note: 'A pool of ' + poolG + ' g spent at ' + rateKg
                + ' kg a day is ' + (rateKg * 1000).toLocaleString()
                + ' g a day, so the whole pool is rebuilt ' + rebuilds.toFixed(0)
                + ' times a day and lasts '
                + (minutes >= 1 ? minutes.toFixed(1) + ' minutes' : (minutes * 60).toFixed(0) + ' seconds')
                + ' if production stopped. That is what reserve means here: not a tank of ATP but '
                + 'a turnover time. At rest a body holds about 250 g and spends about 65 kg a day, '
                + 'which is 5.5 minutes -- and working hard it spends ten times faster, leaving '
                + 'about 33 seconds. Which matches what a held breath tells you, since '
                + 'consciousness goes in roughly ten seconds when the blood supply stops. The pool '
                + 'cannot be made larger: a day of ATP would weigh 65 kg, and ATP is a big, '
                + 'heavily charged molecule that a cell cannot hoard without wrecking its water '
                + 'and salt balance. So the body stores fuel instead and rebuilds the cash '
                + 'continuously.',
        };
    };

    return (
        <LabCanvas
            title="How Much Head Start?"
            readout={({ raw }) => 'A pool of ' + poolOf(raw) + ' g of ATP'}
            controlLabel="ATP Pool"
            controlKey="atpPool"
            controlMin={100}
            controlMax={400}
            controlInitial={250}
            controlDisplay={raw => poolOf(raw) + ' g'}
            control2={{
                label: 'ATP Used Each Day',
                key: 'atpPerDay',
                min: 30,
                max: 1300,
                initial: 60,
                display: raw => rateOf(raw) + ' kg a day',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Cycles Keep Systems Alive?"
            completeNote="Cycles are for what you cannot store!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
