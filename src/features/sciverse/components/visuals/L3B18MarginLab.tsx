import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FULL = 95;           // how full the water is, held fixed so the dials are the two sides
const REF = 10;            // the reference temperature the spare is measured against
const SAFE = '#be123c';
const TIGHT = '#7f1d1d';

/** The most oxygen water can hold, in mg/L, from L2B18's table. */
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

const tempOf = (dial: number): number => Math.max(10, Math.min(30, Math.round(dial)));
const factorOf = (dial: number): number => Math.max(20, Math.min(30, Math.round(dial / 5) * 5)) / 10;

export const L3B18MarginLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const degC = tempOf(raw);
        const perTen = factorOf(raw2);
        const inWater = (mostItCanHold(degC) * FULL) / 100;
        const needs = Math.pow(perTen, (degC - REF) / 10);
        const spare = inWater / needs;
        const refSpare = (mostItCanHold(REF) * FULL) / 100;
        const share = spare / refSpare;
        const comfortable = share >= 0.5;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const barH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + barH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + capBand;
        const baseY = barTop + barH;

        // Two bars side by side: what the water has in it, and how many times more
        // the trout now needs. Both are measured against the 10 C figures, so the
        // closing gap is the thing you watch.
        const barW = Math.max(26, Math.min(56, safeRight * 0.13));
        const gap = Math.max(26, Math.min(70, safeRight * 0.14));
        const cx = safeRight / 2;
        const leftBar = cx - gap / 2 - barW;
        const rightBar = cx + gap / 2;

        const waterFrac = Math.max(0, Math.min(1, inWater / refSpare));
        const needFrac = Math.max(0, Math.min(1, needs / 4));

        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(leftBar, baseY - waterFrac * barH, barW, waterFrac * barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(leftBar, baseY - waterFrac * barH, barW, waterFrac * barH);

        ctx.fillStyle = comfortable ? '#fda4af' : '#fca5a5';
        ctx.fillRect(rightBar, baseY - needFrac * barH, barW, needFrac * barH);
        ctx.strokeStyle = '#0f172a';
        ctx.strokeRect(rightBar, baseY - needFrac * barH, barW, needFrac * barH);

        outlineText(ctx, 'what is in the water, and how much more the trout needs',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'in the water ' + inWater.toFixed(1) + ' mg/L',
            leftBar + barW / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 11px monospace', '#0f172a', 'center', Math.max(60, barW + gap / 2));
        outlineText(ctx, 'needs x' + needs.toFixed(2) + ' more',
            rightBar + barW / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 11px monospace', comfortable ? SAFE : TIGHT, 'center',
            Math.max(60, barW + gap / 2));
        outlineText(ctx, 'spare oxygen ' + (share * 100).toFixed(0) + '% of the '
            + REF + ' °C spare',
            cx, Math.min(baseY + labelTail + 10, artBottom),
            'bold 11px monospace', comfortable ? SAFE : TIGHT, 'center', safeRight - 30);

        outlineText(ctx, 'spare oxygen = ' + inWater.toFixed(1) + ' / ' + needs.toFixed(2)
            + ' = ' + spare.toFixed(1) + ' at ' + degC + ' °C',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the trout needs x' + perTen.toFixed(1)
            + ' more oxygen for every 10 °C warmer',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'spare oxygen ' + (share * 100).toFixed(0) + '% of what it was at '
            + REF + ' °C', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The oxygen falls gently, and the spare collapses',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, share)),
                caption: 'Spare Oxygen Left to the Trout',
                low: '0%',
                high: '100% of the ' + REF + ' °C spare',
                stops: ['#fff1f2', '#fda4af', SAFE] as [string, string, string],
            },
            note: 'At ' + degC + ' \u00b0C the water holds ' + inWater.toFixed(1)
                + ' mg/L and the trout needs ' + needs.toFixed(2) + ' times as much oxygen as at ' + REF
                + ' \u00b0C, which leaves ' + (share * 100).toFixed(0) + '% of the spare it had at ' + REF + ' \u00b0C.',
        };
    };

    return (
        <LabCanvas
            title="Both Ends of the Squeeze"
            readout={({ raw }) => 'Water at ' + tempOf(raw) + ' °C'}
            controlLabel="Water Temperature"
            controlKey="marginTemp"
            controlMin={10}
            controlMax={30}
            controlInitial={10}
            controlDisplay={raw => tempOf(raw) + ' °C'}
            control2={{
                label: 'Extra Need per 10 °C',
                key: 'extraNeedPerTen',
                min: 20,
                max: 30,
                initial: 20,
                display: raw => 'x' + factorOf(raw).toFixed(1),
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Rivers Shape the Land?"
            completeNote="The smaller quarter is the story everyone tells!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
