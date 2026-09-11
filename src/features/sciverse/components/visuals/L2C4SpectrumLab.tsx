import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const C_LIGHT = 3e8;
const MIN_NM = 250;
const MAX_NM = 1000;

const SUPERSCRIPT: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
};

/** A number in scientific notation, e.g. "4.3 x 10¹⁴". */
const sci = (value: number): string => {
    const power = Math.floor(Math.log10(value));
    const lead = value / Math.pow(10, power);
    const sup = String(power).split('').map(ch => SUPERSCRIPT[ch] ?? ch).join('');
    return `${lead.toFixed(1)} x 10${sup}`;
};

/** Approximate on-screen colour for a wavelength; grey outside what humans see. */
const colourOf = (nm: number): string => {
    if (nm < 400 || nm > 700) return '#cbd5e1';
    const stops: [number, number, number, number][] = [
        [400, 138, 43, 226], [450, 59, 76, 245], [490, 6, 182, 212], [530, 34, 197, 94],
        [580, 234, 179, 8], [620, 249, 115, 22], [700, 220, 38, 38],
    ];
    for (let i = 0; i < stops.length - 1; i++) {
        const a = stops[i];
        const b = stops[i + 1];
        if (nm >= a[0] && nm <= b[0]) {
            const frac = (nm - a[0]) / (b[0] - a[0]);
            const mix = (k: number): number => Math.round(a[k] + (b[k] - a[k]) * frac);
            return `rgb(${mix(1)}, ${mix(2)}, ${mix(3)})`;
        }
    }
    return '#dc2626';
};

export const L2C4SpectrumLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const shortNm = Math.max(MIN_NM, Math.round(raw));
        const longNm = Math.max(shortNm + 10, Math.round(raw2));
        const fHigh = C_LIGHT / (shortNm * 1e-9);
        const fLow = C_LIGHT / (longNm * 1e-9);
        const ratio = longNm / shortNm;
        const doublings = Math.log2(ratio);

        // Laid out for a 150 px stage and squeezed on shorter ones
        const sy = Math.max(0.6, Math.min(1, (stageBottom - 56 - stageTop) / 150));

        const axisX = 50;
        const axisW = safeRight - 100;
        const axisY = stageTop + 22;
        const bandH = 30 * sy;
        const xOfNm = (nm: number): number => axisX + ((nm - MIN_NM) / (MAX_NM - MIN_NM)) * axisW;

        // The spectrum, visible part in colour
        const stepW = axisW / ((MAX_NM - MIN_NM) / 5);
        for (let nm = MIN_NM; nm < MAX_NM; nm += 5) {
            ctx.fillStyle = colourOf(nm);
            ctx.fillRect(xOfNm(nm), axisY, stepW + 0.8, bandH);
        }
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(axisX, axisY, axisW, bandH);

        const ticks: [number, CanvasTextAlign][] = [[400, 'center'], [700, 'center'], [1000, 'right']];
        ticks.forEach(([nm, align]) => {
            outlineText(ctx, `${nm.toLocaleString()} nm`, xOfNm(nm), axisY - 7, '11px monospace', '#475569', align, 70);
        });
        const regions: [number, number, string][] = [[MIN_NM, 400, 'ultraviolet'], [400, 700, 'visible'], [700, MAX_NM, 'infrared']];
        regions.forEach(([from, to, label]) => {
            outlineText(ctx, label, (xOfNm(from) + xOfNm(to)) / 2, axisY + bandH + 15,
                'bold 11px monospace', '#334155', 'center', xOfNm(to) - xOfNm(from) - 6);
        });

        // The sensor's range, as a bracket under the spectrum
        const bx1 = xOfNm(shortNm);
        const bx2 = xOfNm(Math.min(MAX_NM, longNm));
        const by = axisY + bandH + 22 + 10 * sy;
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx1, by - 6);
        ctx.lineTo(bx1, by);
        ctx.lineTo(bx2, by);
        ctx.lineTo(bx2, by - 6);
        ctx.stroke();
        outlineText(ctx, `sensor: ${shortNm} to ${longNm} nm`, (bx1 + bx2) / 2, by + 17,
            'bold 12px monospace', '#065f46', 'center', Math.max(120, bx2 - bx1));

        // The two conversions
        const lineY = by + 17 + 24 * sy;
        outlineText(ctx, `short end ${shortNm} nm: ${sci(fHigh)} Hz`, axisX, lineY,
            'bold 13px monospace', '#0f172a', 'left', axisW);
        outlineText(ctx, `long end ${longNm} nm: ${sci(fLow)} Hz`, axisX, lineY + 20,
            'bold 13px monospace', '#0f172a', 'left', axisW);

        outlineText(ctx, `ratio ${longNm} / ${shortNm} = ${ratio.toFixed(2)}, so ${doublings.toFixed(2)} doublings`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, doublings < 1 ? 'less than one octave -- a narrow slice' : 'more than one octave',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${sci(fLow)} to ${sci(fHigh)} Hz`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'f = c / λ -- equal steps in wavelength, not in frequency', safeRight / 2, 118, safeRight - 24, 13);

        const spanWords = doublings < 1 ? 'less than one doubling' : doublings.toFixed(2) + ' doublings';

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, doublings / 2)),
                caption: 'How Many Octaves',
                low: 'Almost none',
                high: 'Two octaves',
            },
            note: `This sensor spans ${sci(fLow)} to ${sci(fHigh)} Hz, a ratio of ${ratio.toFixed(2)} -- ${spanWords}.`,
        };
    };

    return (
        <LabCanvas
            title="The Numbers Behind the Rainbow"
            readout={({ raw }) => `Shortest wavelength ${Math.max(MIN_NM, Math.round(raw))} nm`}
            controlLabel="Shortest Wavelength"
            controlKey="shortNm"
            controlMin={250}
            controlMax={690}
            controlInitial={400}
            controlDisplay={raw => `${Math.max(MIN_NM, Math.round(raw))} nm`}
            control2={{
                label: 'Longest Wavelength',
                key: 'longNm',
                min: 400,
                max: 1000,
                initial: 700,
                display: raw => `${Math.round(raw)} nm`,
            }}
            accent="emerald"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Numbers Behind the Rainbow"
            completeNote="f = c / λ, in less than one octave!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
