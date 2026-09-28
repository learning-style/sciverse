import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const PERCENT = 95;        // saturation held at 95%, so the dials are temperature and Q10
const REF = 10;            // the reference temperature the margin is measured against
const SAFE = '#be123c';
const TIGHT = '#7f1d1d';

/** Saturation in mg/L, from the lesson's table, straight-lined between points. */
const saturationAt = (degC: number): number => {
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
const q10Of = (dial: number): number => Math.max(20, Math.min(30, Math.round(dial / 5) * 5)) / 10;

export const L3B18MarginLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const degC = tempOf(raw);
        const q10 = q10Of(raw2);
        const supply = (saturationAt(degC) * PERCENT) / 100;
        const demand = Math.pow(q10, (degC - REF) / 10);
        const margin = supply / demand;
        const refMargin = (saturationAt(REF) * PERCENT) / 100;
        const share = margin / refMargin;
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

        // Two bars: what the water offers, and what the fish now wants. Both are
        // drawn against the same 10 C reference so the closing gap is visible.
        const barW = Math.max(26, Math.min(56, safeRight * 0.13));
        const gap = Math.max(26, Math.min(70, safeRight * 0.14));
        const cx = safeRight / 2;
        const leftBar = cx - gap / 2 - barW;
        const rightBar = cx + gap / 2;

        const supplyFrac = Math.max(0, Math.min(1, supply / refMargin));
        const demandFrac = Math.max(0, Math.min(1, demand / 4));

        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(leftBar, baseY - supplyFrac * barH, barW, supplyFrac * barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(leftBar, baseY - supplyFrac * barH, barW, supplyFrac * barH);

        ctx.fillStyle = comfortable ? '#fda4af' : '#fca5a5';
        ctx.fillRect(rightBar, baseY - demandFrac * barH, barW, demandFrac * barH);
        ctx.strokeStyle = '#0f172a';
        ctx.strokeRect(rightBar, baseY - demandFrac * barH, barW, demandFrac * barH);

        outlineText(ctx, 'what the water offers, and what the fish now wants',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'supply ' + supply.toFixed(1) + ' mg/L',
            leftBar + barW / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 11px monospace', '#0f172a', 'center', Math.max(60, barW + gap / 2));
        outlineText(ctx, 'demand x' + demand.toFixed(2),
            rightBar + barW / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 11px monospace', comfortable ? SAFE : TIGHT, 'center',
            Math.max(60, barW + gap / 2));
        outlineText(ctx, 'margin ' + (share * 100).toFixed(0) + '% of the ' + REF + ' °C margin',
            cx, Math.min(baseY + labelTail + 10, artBottom),
            'bold 11px monospace', comfortable ? SAFE : TIGHT, 'center', safeRight - 30);

        outlineText(ctx, 'margin = ' + supply.toFixed(1) + ' / ' + demand.toFixed(2)
            + ' = ' + margin.toFixed(2) + ' at ' + degC + ' °C',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'demand factor = Q10^(ΔT/10), with Q10 = ' + q10.toFixed(1)
            + ' -- an empirical rule of thumb',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'margin ' + (share * 100).toFixed(0) + '% of what it was at ' + REF + ' °C',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Supply falls gently, and the margin collapses',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, share)),
                caption: 'Margin Left to the Trout',
                low: '0%',
                high: '100% of the ' + REF + ' °C margin',
                stops: ['#fff1f2', '#fda4af', SAFE] as [string, string, string],
            },
            note: 'At ' + degC + ' °C and ' + PERCENT + '% of saturation the water offers '
                + supply.toFixed(1) + ' mg/L, down from ' + refMargin.toFixed(1) + ' at '
                + REF + ' °C. Meanwhile the trout\'s own demand has risen '
                + demand.toFixed(2) + '-fold, because a fish has no thermostat and its whole '
                + 'chemistry runs at river temperature. Dividing one by the other leaves '
                + (share * 100).toFixed(0) + '% of the margin it had at ' + REF
                + ' °C. Notice which side moves further: across 10 to 30 °C the supply falls '
                + 'by about a third while the margin falls to a sixth, so roughly a quarter of '
                + 'the squeeze is the water holding less and three quarters is the fish needing '
                + 'more. Q10 is a rule of thumb, and raising it from 2 to 3 changes the answer '
                + 'considerably -- which is why survival can sit inside its uncertainty.',
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
                label: 'Q10',
                key: 'q10Value',
                min: 20,
                max: 30,
                initial: 20,
                display: raw => q10Of(raw).toFixed(1),
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
