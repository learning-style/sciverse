import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const TROUT = 6;           // mg/L a trout needs
const TOP = 15;            // top of the scale, just above the most water can hold at 0 C
const OK = '#be123c';
const SHORT = '#7f1d1d';

/** The most oxygen water can hold, in mg/L, from the lesson's table. */
const mostItCanHold = (degC: number): number => {
    const table: Array<[number, number]> = [
        [0, 14.6], [5, 12.8], [10, 11.3], [15, 10.1], [20, 9.1], [25, 8.3], [30, 7.6],
    ];
    if (degC <= 0) return 14.6;
    if (degC >= 30) return 7.6;
    for (let i = 1; i < table.length; i++) {
        const [t1, s1] = table[i];
        if (degC <= t1) {
            const [t0, s0] = table[i - 1];
            return s0 + ((s1 - s0) * (degC - t0)) / (t1 - t0);
        }
    }
    return 7.6;
};

const tempOf = (dial: number): number => Math.max(5, Math.min(30, Math.round(dial)));
const fullOf = (dial: number): number => Math.max(55, Math.min(100, Math.round(dial / 5) * 5));

export const L2B18OxygenLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const degC = tempOf(raw);
        const percentFull = fullOf(raw2);
        const room = mostItCanHold(degC);
        const actual = (room * percentFull) / 100;
        const enough = actual >= TROUT;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(16, Math.min(26, usable * 0.15));
        const barH = Math.max(46, Math.min(150, usable - capBand - labelTail));
        const blockH = capBand + barH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + capBand;
        const barBottom = barTop + barH;

        const barW = Math.max(34, Math.min(72, safeRight * 0.16));
        const cx = safeRight / 2;
        const left = cx - barW / 2;
        const yOf = (mgL: number) => barBottom - (Math.max(0, Math.min(TOP, mgL)) / TOP) * barH;

        // The glass: how much room this water has for oxygen at this temperature.
        ctx.fillStyle = '#fff1f2';
        ctx.fillRect(left, yOf(room), barW, barBottom - yOf(room));
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, yOf(room), barW, barBottom - yOf(room));

        // How much of that room is actually taken up by oxygen.
        ctx.fillStyle = enough ? '#fda4af' : '#fecaca';
        ctx.fillRect(left, yOf(actual), barW, barBottom - yOf(actual));
        ctx.strokeStyle = '#0f172a';
        ctx.strokeRect(left, yOf(actual), barW, barBottom - yOf(actual));

        // the line a trout needs
        ctx.strokeStyle = enough ? OK : SHORT;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(left - 22, yOf(TROUT));
        ctx.lineTo(left + barW + 22, yOf(TROUT));
        ctx.stroke();
        ctx.setLineDash([]);

        outlineText(ctx, 'oxygen in the water', cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'the most it can hold ' + room.toFixed(1) + ' mg/L',
            left + barW + 26, Math.max(yOf(room) + 4, artTop + 24),
            'bold 11px monospace', '#334155', 'left', Math.max(60, safeRight - left - barW - 30));
        outlineText(ctx, 'trout need ' + TROUT + ' mg/L', left - 26, yOf(TROUT) - 6,
            'bold 11px monospace', enough ? OK : SHORT, 'right', Math.max(60, left - 30));
        outlineText(ctx, 'in the water ' + actual.toFixed(1) + ' mg/L',
            cx, Math.min(barBottom + 14, artBottom - 10),
            'bold 12px monospace', enough ? OK : SHORT, 'center', safeRight - 30);
        outlineText(ctx, 'at ' + degC + ' °C and ' + percentFull + '% full',
            cx, Math.min(barBottom + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'the most it can hold ' + room.toFixed(1) + ' mg/L x '
            + percentFull + '% full = ' + actual.toFixed(1) + ' mg/L',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, enough
            ? 'above the trout line, with ' + (actual - TROUT).toFixed(1) + ' mg/L to spare'
            : 'below the trout line by ' + (TROUT - actual).toFixed(1) + ' mg/L',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', enough ? OK : SHORT,
            'center', safeRight - 30);

        fitText(ctx, 'oxygen in the water ' + actual.toFixed(1) + ' mg/L',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Warm and slow together is the combination to watch',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, actual / TOP)),
                caption: 'Oxygen Against the Trout Line',
                low: '0 mg/L',
                high: TOP + ' mg/L',
                stops: ['#fff1f2', '#fda4af', OK] as [string, string, string],
            },
            note: 'At ' + degC + ' \u00b0C this water can hold ' + room.toFixed(1) + ' mg/L and is '
                + percentFull + '% full, so it holds ' + actual.toFixed(1) + ' mg/L. '
                + (enough
                    ? 'That clears the ' + TROUT + ' mg/L a trout needs by '
                      + (actual - TROUT).toFixed(1) + ' mg/L.'
                    : 'That is ' + (TROUT - actual).toFixed(1) + ' mg/L short of the ' + TROUT
                      + ' mg/L a trout needs.'),
        };
    };

    return (
        <LabCanvas
            title="Enough Oxygen to Breathe?"
            readout={({ raw }) => 'Water at ' + tempOf(raw) + ' °C'}
            controlLabel="Water Temperature"
            controlKey="waterTemp"
            controlMin={5}
            controlMax={30}
            controlInitial={10}
            controlDisplay={raw => tempOf(raw) + ' °C'}
            control2={{
                label: 'How Full the Water Is',
                key: 'howFull',
                min: 55,
                max: 100,
                initial: 95,
                display: raw => fullOf(raw) + '% full',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Rivers Shape the Land?"
            completeNote="The fish is where the physics and the chemistry meet!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
