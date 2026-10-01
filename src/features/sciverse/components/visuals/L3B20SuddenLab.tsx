import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const START_D = 14;        // dioptres of accommodation at age 10
const START_AGE = 10;
const READ_CM = 25;        // a book at a comfortable distance
const READ_D = 100 / READ_CM;
const FLOOR_D = 0.5;       // accommodation cannot fall below zero, so the line flattens
const MAX_CM = 200;        // top of the near-point scale
const CURVE = '#be123c';
const LINE = '#7f1d1d';

const ageOf = (dial: number): number => Math.max(10, Math.min(60, Math.round(dial)));
const rateOf = (dial: number): number => Math.max(25, Math.min(40, Math.round(dial / 5) * 5)) / 100;

const accomAt = (age: number, rate: number): number =>
    Math.max(FLOOR_D, START_D - rate * (age - START_AGE));

export const L3B20SuddenLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const age = ageOf(raw);
        const rate = rateOf(raw2);
        const accom = accomAt(age, rate);
        const nearCm = 100 / accom;
        const crossAge = START_AGE + (START_D - READ_D) / rate;
        const needsGlasses = accom < READ_D;
        const shortfall = Math.max(0, READ_D - accom);

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

        const plotW = Math.max(140, Math.min(safeRight - 90, safeRight * 0.7));
        const left = safeRight / 2 - plotW / 2;
        const xFor = (a: number) => left + ((a - 10) / 50) * plotW;
        const yFor = (cm: number) => baseY - (Math.min(MAX_CM, cm) / MAX_CM) * plotH;

        // the reading distance, which never moves
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(left, yFor(READ_CM));
        ctx.lineTo(left + plotW, yFor(READ_CM));
        ctx.stroke();
        ctx.setLineDash([]);

        // the near point against age: the reciprocal of a straight line
        ctx.strokeStyle = CURVE;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let a = 10; a <= 60; a += 1) {
            const y = yFor(100 / accomAt(a, rate));
            if (a === 10) ctx.moveTo(xFor(a), y); else ctx.lineTo(xFor(a), y);
        }
        ctx.stroke();

        // where the curve crosses the reading distance
        if (crossAge >= 10 && crossAge <= 60) {
            ctx.strokeStyle = LINE;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(xFor(crossAge), yFor(READ_CM) - 10);
            ctx.lineTo(xFor(crossAge), yFor(READ_CM) + 10);
            ctx.stroke();
        }

        // where the age dial has put us
        ctx.fillStyle = needsGlasses ? LINE : CURVE;
        ctx.beginPath();
        ctx.arc(xFor(age), yFor(nearCm), 5, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'nearest focus against age, with the book fixed at ' + READ_CM + ' cm',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'the book at ' + READ_CM + ' cm', left + 4,
            Math.max(yFor(READ_CM) - 7, artTop + 24),
            'bold 10px monospace', '#334155', 'left', Math.max(60, plotW - 8));
        outlineText(ctx, 'glasses needed from age ' + crossAge.toFixed(0),
            Math.min(xFor(crossAge) + 6, left + plotW - 4),
            Math.min(yFor(READ_CM) + 20, artBottom - 14),
            'bold 10px monospace', LINE, 'left', Math.max(60, plotW / 2));
        outlineText(ctx, 'at age ' + age + ' the nearest focus is ' + nearCm.toFixed(0) + ' cm',
            safeRight / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', needsGlasses ? LINE : CURVE, 'center', safeRight - 30);
        outlineText(ctx, 'accommodation left ' + accom.toFixed(1) + ' D, losing '
            + rate.toFixed(2) + ' D a year',
            safeRight / 2, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'nearest focus = 1 / accommodation ' + accom.toFixed(1)
            + ' D = ' + nearCm.toFixed(0) + ' cm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, needsGlasses
            ? 'short of the book by ' + shortfall.toFixed(1) + ' D, so glasses of +'
              + shortfall.toFixed(1) + ' D'
            : 'still closer than the book, so no glasses needed yet',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', needsGlasses ? LINE : CURVE,
            'center', safeRight - 30);

        fitText(ctx, 'nearest focus ' + nearCm.toFixed(0) + ' cm at age ' + age,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A steady decline, through a reciprocal',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, nearCm / MAX_CM)),
                caption: 'Nearest This Eye Can Focus',
                low: '0 cm',
                high: MAX_CM + ' cm',
                stops: ['#fff1f2', '#fda4af', CURVE] as [string, string, string],
            },
            note: 'At age ' + age + ' this eye has ' + accom.toFixed(1)
                + ' D left, so its nearest focus is ' + nearCm.toFixed(0)
                + ' cm. The book at ' + READ_CM + ' cm needs ' + READ_D.toFixed(1) + ' D, '
                + (needsGlasses ? 'so it is short by ' + shortfall.toFixed(1) + ' D.'
                    : 'which it still has.'),
        };
    };

    return (
        <LabCanvas
            title="Why It Feels Sudden"
            readout={({ raw }) => 'An eye aged ' + ageOf(raw)}
            controlLabel="Age"
            controlKey="eyeAge"
            controlMin={10}
            controlMax={60}
            controlInitial={30}
            controlDisplay={raw => ageOf(raw) + ' years'}
            control2={{
                label: 'Loss Each Year',
                key: 'lossPerYear',
                min: 25,
                max: 40,
                initial: 30,
                display: raw => rateOf(raw).toFixed(2) + ' D a year',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="The shape is where the surprise lives!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
