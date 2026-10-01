import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// A spectrum strip with the line on it, and its partner 0.6 nm away -- sodium's
// doublet, the case that decides whether the instrument may be believed. The two
// are drawn as separate lines only when the sharpness dial can split 0.6 nm.
const LO_NM = 380;
const HI_NM = 750;
const PAIR_NM = 0.6;
const HC = 1240;                      // Planck constant x c, in eV nm
const EMERALD = '#047857';
const MERGED = '#7f1d1d';

const nmOf = (dial: number): number => Math.round(Math.max(3800, Math.min(7500, dial))) / 10;
const sharpOf = (dial: number): number => Math.round(Math.max(1, Math.min(50, dial))) / 10;

// visible-spectrum colour for a wavelength, good enough to read positions by
const hueOf = (nm: number): string => {
    const stops: [number, string][] = [[380, '#6d28d9'], [450, '#2563eb'], [490, '#059669'],
        [540, '#65a30d'], [580, '#eab308'], [620, '#ea580c'], [700, '#b91c1c'], [750, '#7f1d1d']];
    for (let i = 1; i < stops.length; i++) {
        if (nm <= stops[i][0]) return stops[i - 1][1];
    }
    return stops[stops.length - 1][1];
};

export const L2C22SpectrumLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const nm = nmOf(raw);
        const sharp = sharpOf(raw2);
        const eV = HC / nm;
        const split = sharp <= PAIR_NM;
        const needed = Math.round(nm / PAIR_NM);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 38;
        const stripH = Math.max(26, Math.min(76, usable - CAP - TAIL));
        const blockH = CAP + stripH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const stripTop = top + CAP;

        const left = 18;
        const stripW = Math.max(100, safeRight - 36);
        const xOf = (w: number) => left + ((w - LO_NM) / (HI_NM - LO_NM)) * stripW;

        // the spectrum itself
        const grad = ctx.createLinearGradient(left, 0, left + stripW, 0);
        for (let i = 0; i <= 10; i++) {
            grad.addColorStop(i / 10, hueOf(LO_NM + (i / 10) * (HI_NM - LO_NM)));
        }
        ctx.fillStyle = grad;
        ctx.fillRect(left, stripTop, stripW, stripH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, stripTop, stripW, stripH);

        // the line, and its partner 0.6 nm away -- one mark if they cannot be split
        const lineW = Math.max(2, (sharp / (HI_NM - LO_NM)) * stripW * 6);
        // a line at either end of the strip must still be drawn inside it, and the
        // split pair needs room for both marks plus their 3px separation
        const inset = lineW / 2 + 4;
        const x1 = Math.max(left + inset, Math.min(left + stripW - inset, xOf(nm)));
        const glow = 0.75 + 0.25 * Math.sin(t * 3);
        ctx.fillStyle = '#f8fafc';
        if (split) {
            ctx.globalAlpha = glow;
            ctx.fillRect(x1 - lineW / 2 - 3, stripTop + 2, lineW, stripH - 4);
            ctx.fillRect(x1 + lineW / 2 + 3, stripTop + 2, lineW, stripH - 4);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(x1 - lineW / 2 - 3, stripTop + 2, lineW, stripH - 4);
            ctx.strokeRect(x1 + lineW / 2 + 3, stripTop + 2, lineW, stripH - 4);
        } else {
            ctx.globalAlpha = glow;
            ctx.fillRect(x1 - lineW / 2, stripTop + 2, lineW, stripH - 4);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(x1 - lineW / 2, stripTop + 2, lineW, stripH - 4);
        }

        outlineText(ctx, 'the line sits where its energy puts it',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, nm.toFixed(1) + ' nm',
            Math.max(40, Math.min(x1, safeRight - 40)), Math.min(stripTop + stripH + 14, artBottom - 18),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 24);
        outlineText(ctx, split
            ? 'sharp to ' + sharp.toFixed(1) + ' nm: two lines, split'
            : 'sharp to ' + sharp.toFixed(1) + ' nm: one line, merged',
            safeRight / 2, Math.min(stripTop + stripH + 32, artBottom),
            'bold 12px monospace', split ? EMERALD : MERGED, 'center', safeRight - 24);

        outlineText(ctx, 'energy = 1240 / ' + nm.toFixed(1) + ' nm = ' + eV.toFixed(3) + ' eV',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'to split a ' + PAIR_NM.toFixed(1)
            + ' nm pair here needs resolving power ' + needed,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            split ? EMERALD : MERGED, 'center', safeRight - 30);

        fitText(ctx, 'energy ' + eV.toFixed(3) + ' eV', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Position is the atom, brightness is the conditions',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (eV - 1.6) / (3.4 - 1.6))),
                caption: 'Energy of the Electron Jump',
                low: '1.6 eV',
                high: '3.4 eV',
                stops: ['#ecfdf5', '#6ee7b7', EMERALD] as [string, string, string],
            },
            note: 'A line at ' + nm.toFixed(1) + ' nm is an electron jump of '
                + eV.toFixed(3) + ' eV. '
                + (split
                    ? 'This instrument can split a ' + PAIR_NM.toFixed(1) + ' nm pair, so two lines here are real.'
                    : 'It cannot split a ' + PAIR_NM.toFixed(1) + ' nm pair, so one line here proves nothing.'),
        };
    };

    return (
        <LabCanvas
            title="Which Element Is It?"
            readout={({ raw }) => 'A line at ' + nmOf(raw).toFixed(1) + ' nm'}
            controlLabel="Wavelength of the Line"
            controlKey="lineNm"
            controlMin={3800}
            controlMax={7500}
            controlInitial={5890}
            controlDisplay={raw => nmOf(raw).toFixed(1) + ' nm'}
            control2={{
                label: 'How Sharp the Spectrometer Is',
                key: 'sharpNm',
                min: 1,
                max: 50,
                initial: 5,
                display: raw => sharpOf(raw).toFixed(1) + ' nm',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Waves Help Us See the Invisible?"
            completeNote="1240 over the wavelength!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
