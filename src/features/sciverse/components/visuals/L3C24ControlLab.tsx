import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: there are two answers, and the dials move only one of them. So the
// picture is two bars of the same length on the same scale -- what the race gives
// you, held fixed, and what settling gives you, which both dials move. The distance
// between the two boundaries IS the distance between the two regimes, and it is
// visible before a number is read. The bar is deliberately the same shape as
// L2C24's, because that lesson is the top bar.
const RACE_FASTER = 0.71;      // measured at -80 C: 71% the 1,2-adduct
const R = 8.314;               // J per mol per K
const FASTER = '#d97706';
const STEADIER = '#047857';

const gapOf = (dial: number): number => Math.max(0, Math.min(12, Math.round(dial * 5) / 5));
const tempOf = (dial: number): number => Math.max(-80, Math.min(200, Math.round(dial / 5) * 5));

export const L3C24ControlLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const gap = gapOf(raw);
        const tempC = tempOf(raw2);
        const kelvin = tempC + 273;
        const expo = (gap * 1000) / (R * kelvin);
        const ratio = Math.exp(expo);
        const eqSteadier = ratio / (1 + ratio);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        // The two bar labels matter more than the key row, so they are kept first.
        const fit = Math.max(0, Math.min(3, Math.floor((usable - 16) / ROW)));
        const showLab1 = fit >= 1;
        const showLab2 = fit >= 2;
        const showKey = fit >= 3;
        const labH = fit * ROW;
        const barH = Math.max(6, Math.min((usable - labH) / 2, 26));
        const blockH = labH + 2 * barH;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        let y = top;
        const keyRow = showKey ? y + 11 : 0;
        if (showKey) y += ROW;
        const lab1Row = showLab1 ? y + 11 : 0;
        if (showLab1) y += ROW;
        const bar1Top = y;
        y += barH;
        const lab2Row = showLab2 ? y + 11 : 0;
        if (showLab2) y += ROW;
        const bar2Top = y;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);

        // Two bars, one scale, faster product always on the left.
        const bar = (yTop: number, fasterShare: number) => {
            const split = fullW * Math.max(0, Math.min(1, fasterShare));
            ctx.fillStyle = FASTER;
            ctx.fillRect(left, yTop, split, barH);
            ctx.fillStyle = STEADIER;
            ctx.fillRect(left + split, yTop, fullW - split, barH);
            ctx.strokeStyle = '#f8fafc';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(left + split, yTop);
            ctx.lineTo(left + split, yTop + barH);
            ctx.stroke();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.4;
            ctx.strokeRect(left, yTop, fullW, barH);
        };
        bar(bar1Top, RACE_FASTER);
        bar(bar2Top, 1 - eqSteadier);

        if (showKey) {
            outlineText(ctx, 'faster', left, keyRow, 'bold 11px monospace', FASTER, 'left', fullW / 2 - 4);
            outlineText(ctx, 'steadier', left + fullW, keyRow, 'bold 11px monospace', STEADIER, 'right', fullW / 2 - 4);
        }
        if (showLab1) {
            outlineText(ctx, 'the race: ' + (RACE_FASTER * 100).toFixed(0) + '% faster',
                safeRight / 2, lab1Row, 'bold 12px monospace', FASTER, 'center', safeRight - 24);
        }
        if (showLab2) {
            outlineText(ctx, 'settling: ' + (eqSteadier * 100).toFixed(0) + '% steadier',
                safeRight / 2, lab2Row, 'bold 12px monospace', STEADIER, 'center', safeRight - 24);
        }

        outlineText(ctx, (gap * 1000).toFixed(0) + '/(8.314 x ' + kelvin + ') = ' + expo.toFixed(2),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'e to the ' + expo.toFixed(2) + ' = ' + ratio.toFixed(1)
            + ', so ' + (eqSteadier * 100).toFixed(0) + '%',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', STEADIER, 'center', safeRight - 30);

        fitText(ctx, 'settles at ' + (eqSteadier * 100).toFixed(0) + '%', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Two answers, one flask', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, eqSteadier)),
                caption: 'Settles on the Steadier',
                low: 'an even mixture',
                high: 'almost all steadier',
                stops: ['#fef3c7', '#6ee7b7', STEADIER] as [string, string, string],
            },
            note: 'A gap of ' + gap.toFixed(1) + ' kJ/mol at ' + tempC + ' C settles at '
                + (eqSteadier * 100).toFixed(1) + '% steadier, against the race'
                + ' giving ' + (RACE_FASTER * 100).toFixed(0) + '% faster. Warming always evens the mixture out.',
        };
    };

    return (
        <LabCanvas
            title="The Product That Forms First"
            readout={({ raw }) => 'Energy gap ' + gapOf(raw).toFixed(1) + ' kJ/mol'}
            controlLabel="Energy Gap"
            controlKey="energyGap"
            controlMin={0}
            controlMax={12}
            controlInitial={4.6}
            controlDisplay={raw => gapOf(raw).toFixed(1) + ' kJ/mol'}
            control2={{
                label: 'Temperature',
                key: 'temperature',
                min: -80,
                max: 200,
                initial: 45,
                display: raw => tempOf(raw) + ' °C',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Networks Deliver What Matters?"
            completeNote="Speed decides where you arrive, the gap where you stay!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
