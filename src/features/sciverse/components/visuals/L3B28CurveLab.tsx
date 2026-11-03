import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces L3B28ShareLab, which drew a bar of organ blood shares -- undergraduate
// physiology. This draws the oxygen dissociation curve, which is the thing an AP or
// A-level biology student is actually asked to read.
//
// Everything is on one plot: the curve itself, a marker at the dialled pressure, and
// the LUNG point fixed at the top. The vertical gap between the two is what a litre
// gives up, so the quantity the lesson is about is a distance on the screen rather
// than a number in a caption. Raising the effort dial slides the whole curve right --
// the Bohr shift -- and the gap visibly opens without the marker moving.
const CURVE = '#be123c';
const SHIFT = '#f59e0b';
const GIVEN = '#15803d';
const INK = '#0f172a';
const MUTED = '#475569';
const GRID = '#e2e8f0';

const N = 2.8;              // the curve's measured steepness; the lesson reads, not derives
const P50_REST = 3.5;       // kPa at half saturation, normal blood
const P50_WORK = 4.3;       // with the acid a working muscle makes
const LUNG = 13.3;          // kPa in the lungs
const CAP = 200;            // mL of oxygen in a fully saturated litre
const MAXP = 14;

const sat = (p: number, p50: number): number =>
    100 * Math.pow(p, N) / (Math.pow(p50, N) + Math.pow(p, N));

const pressOf = (dial: number): number => Math.max(0.5, Math.min(MAXP, Math.round(dial * 10) / 10));
const effortOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial / 5) * 5));

export const L3B28CurveLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const press = pressOf(raw);
        const effort = effortOf(raw2);
        const p50 = P50_REST + (P50_WORK - P50_REST) * effort / 100;
        const here = sat(press, p50);
        // the lungs are not acidic, so blood always leaves them on the resting curve
        const lung = sat(LUNG, P50_REST);
        const given = Math.max(0, (lung - here) / 100 * CAP);
        // exhaustive: every reading lands in exactly one band
        const loading = press >= 10;
        const resting = !loading && press >= 4;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = Math.max(6, artBottom - artTop);
        const left = 44;
        const fullW = Math.max(90, safeRight - left - 14);
        const ROW = 14;
        const rows = Math.max(0, Math.min(2, Math.floor((usable - 40) / ROW)));
        const plotH = Math.max(6, Math.min(170, usable - rows * ROW));
        const top = artTop + Math.max(0, (usable - (plotH + rows * ROW)) / 2);
        const bot = top + plotH;
        const xOf = (p: number) => left + fullW * (p / MAXP);
        const yOf = (s: number) => bot - plotH * (s / 100);

        // axes
        ctx.strokeStyle = GRID;
        ctx.lineWidth = 1;
        for (let s = 0; s <= 100; s += 25) {
            ctx.beginPath();
            ctx.moveTo(left, yOf(s));
            ctx.lineTo(left + fullW, yOf(s));
            ctx.stroke();
        }
        ctx.strokeStyle = MUTED;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, bot);
        ctx.lineTo(left + fullW, bot);
        ctx.stroke();

        // the resting curve stays drawn faintly, so the shift is a comparison
        const plot = (p50v: number, colour: string, width: number) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            for (let i = 0; i <= 120; i++) {
                const p = MAXP * i / 120;
                const x = xOf(p);
                const y = yOf(sat(p, p50v));
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
        };
        if (effort > 0) plot(P50_REST, 'rgba(190,18,60,0.25)', 1.5);
        plot(p50, effort > 0 ? SHIFT : CURVE, 2.4);

        // the lung point, fixed, and the marker: the gap between them is the delivery
        const mx = xOf(press);
        const my = yOf(here);
        const ly = yOf(lung);
        if (plotH >= 40) {
            ctx.strokeStyle = GIVEN;
            ctx.lineWidth = Math.max(3, Math.min(10, fullW * 0.03));
            ctx.beginPath();
            ctx.moveTo(mx, ly);
            ctx.lineTo(mx, my);
            ctx.stroke();
        }
        ctx.fillStyle = INK;
        ctx.beginPath();
        ctx.arc(xOf(LUNG), ly, Math.max(2, plotH * 0.025), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = effort > 0 ? SHIFT : CURVE;
        ctx.beginPath();
        ctx.arc(mx, my, Math.max(2.5, plotH * 0.032), 0, Math.PI * 2);
        ctx.fill();

        // axis ends only, so the plot carries two strings rather than a scale
        if (plotH >= 34) {
            outlineText(ctx, '100%', left - 4, yOf(100) + 4, 'bold 11px monospace', MUTED, 'right', 40);
            outlineText(ctx, '0', left - 4, bot + 4, 'bold 11px monospace', MUTED, 'right', 40);
        }

        const rowY = (i: number) => bot + 12 + i * ROW;
        if (rows >= 1) {
            outlineText(ctx, 'oxygen pressure in kPa', left + fullW / 2, rowY(0),
                'bold 11px monospace', MUTED, 'center', fullW);
        }
        if (rows >= 2) {
            outlineText(ctx, 'the bar: what a litre gives', left + fullW / 2, rowY(1),
                'bold 11px monospace', GIVEN, 'center', fullW);
        }

        outlineText(ctx, press.toFixed(1) + ' kPa: ' + Math.round(here) + '% saturated',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, Math.round(lung) + '% - ' + Math.round(here) + '% of 200 mL',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', GIVEN, 'center', safeRight - 30);

        fitText(ctx, Math.round(given) + ' mL from a litre',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, loading ? 'Up here blood is loading'
            : resting ? 'A resting muscle' : 'A working muscle unloads',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, given / CAP)),
                caption: 'Oxygen Given to the Tissue',
                low: 'blood passes by full',
                high: 'nearly all its load',
                stops: ['#fff1f2', '#fda4af', GIVEN] as [string, string, string],
            },
            note: 'The curve is how tightly haemoglobin holds oxygen at each pressure, and the bar under is the'
                + ' drop from the lungs to where the blood is now. ' + (effort > 0
                    ? 'A working muscle makes acid, which slides the whole curve right, so '
                      + Math.round(given) + ' mL comes out at the same pressure.'
                    : 'At ' + press.toFixed(1) + ' kPa haemoglobin is still ' + Math.round(here)
                      + '% full, so only ' + Math.round(given) + ' mL of the 200 is handed over.'),
        };
    };

    return (
        <LabCanvas
            title="What a Litre Lets Go"
            readout={({ raw }) => 'blood at ' + pressOf(raw).toFixed(1) + ' kPa of oxygen'}
            controlLabel="Oxygen Pressure"
            controlKey="oxygenPressure"
            controlMin={0.5}
            controlMax={MAXP}
            controlInitial={5.3}
            controlDisplay={raw => pressOf(raw).toFixed(1) + ' kPa'}
            control2={{
                label: 'How Hard the Muscle Is Working',
                key: 'muscleEffort',
                min: 0,
                max: 100,
                initial: 0,
                display: raw => effortOf(raw) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="The waste is the signal!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
