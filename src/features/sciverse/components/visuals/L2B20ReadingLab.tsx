import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MAX_NEEDED = 5;      // dioptres at the top of the meter: 20 cm needs 5 D
const FINE = '#be123c';
const SHORT = '#7f1d1d';

const accomOf = (dial: number): number => Math.max(0.5, Math.min(14, Math.round(dial / 5) / 2));
const distanceOf = (dial: number): number => Math.max(20, Math.min(60, Math.round(dial / 5) * 5));

export const L2B20ReadingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const accom = accomOf(raw);
        const readCm = distanceOf(raw2);
        const needed = 100 / readCm;
        const nearPointCm = 100 / accom;
        const shortfall = Math.max(0, needed - accom);
        const canFocus = shortfall <= 0.001;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const lineY = top + capBand + boxH * 0.55;
        const boxBottom = top + capBand + boxH;

        // a ruler from the eye outwards, so the near point and the page can be
        // compared directly. 0 to 120 cm covers every dial setting.
        const SPAN = 120;
        const plotW = Math.max(150, Math.min(safeRight - 70, safeRight * 0.78));
        const left = safeRight / 2 - plotW / 2;
        const xFor = (cm: number) => left + (Math.min(SPAN, cm) / SPAN) * plotW;

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left, lineY);
        ctx.lineTo(left + plotW, lineY);
        ctx.stroke();
        for (const cm of [25, 50, 75, 100]) {
            ctx.beginPath();
            ctx.moveTo(xFor(cm), lineY - 4);
            ctx.lineTo(xFor(cm), lineY + 4);
            ctx.stroke();
        }

        // the eye at zero
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(left, lineY, 5, 0, Math.PI * 2);
        ctx.fill();

        // the blurred zone: everything closer than the near point
        ctx.fillStyle = 'rgba(127,29,29,0.18)';
        ctx.fillRect(left, lineY - 14, Math.max(0, xFor(nearPointCm) - left), 28);
        ctx.strokeStyle = SHORT;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xFor(nearPointCm), lineY - 16);
        ctx.lineTo(xFor(nearPointCm), lineY + 16);
        ctx.stroke();

        // the page
        ctx.fillStyle = canFocus ? FINE : SHORT;
        ctx.fillRect(xFor(readCm) - 4, lineY - 11, 8, 22);

        outlineText(ctx, 'how far away things are, measured from the eye',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        // The ruler stops at 120 cm, and a very stiff lens puts the nearest focus
        // beyond that. Say so rather than letting a clamped line imply otherwise.
        outlineText(ctx, 'nearest focus ' + nearPointCm.toFixed(0) + ' cm'
            + (nearPointCm > SPAN ? ', off this scale' : ''),
            Math.min(xFor(nearPointCm), left + plotW - 4), Math.max(lineY - 22, artTop + 26),
            'bold 11px monospace', SHORT, 'center', Math.max(70, plotW));
        outlineText(ctx, 'the page at ' + readCm + ' cm',
            xFor(readCm), Math.min(lineY + 26, artBottom - 14),
            'bold 11px monospace', canFocus ? FINE : SHORT, 'center', Math.max(70, plotW));
        outlineText(ctx, 'blurred closer than the line, clear beyond it',
            safeRight / 2, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'page at ' + readCm + ' cm needs ' + needed.toFixed(1)
            + ' D, accommodation left ' + accom.toFixed(1) + ' D',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, canFocus
            ? 'enough to spare, so no reading glasses needed'
            : 'short by ' + shortfall.toFixed(1) + ' D, so reading glasses of +'
              + shortfall.toFixed(1) + ' D',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', canFocus ? FINE : SHORT,
            'center', safeRight - 30);

        fitText(ctx, canFocus ? 'no reading glasses needed'
            : 'reading glasses +' + shortfall.toFixed(1) + ' D',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A fixed requirement, against a supply that falls',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, shortfall / MAX_NEEDED)),
                caption: 'Reading Glasses Needed',
                low: '0 D',
                high: '+' + MAX_NEEDED + ' D',
                stops: ['#fff1f2', '#fda4af', FINE] as [string, string, string],
            },
            note: 'Focusing on a page ' + readCm + ' cm away takes 1 / '
                + (readCm / 100).toFixed(2) + ' = ' + needed.toFixed(1)
                + ' dioptres of extra bending, and that figure is the same for everybody '
                + 'because it is set by the distance alone. This eye has '
                + accom.toFixed(1) + ' D of accommodation left, which puts its nearest focus at '
                + nearPointCm.toFixed(0) + ' cm. '
                + (canFocus
                    ? 'That is enough, with some to spare, so no reading glasses are needed.'
                    : 'It is short by ' + shortfall.toFixed(1) + ' D, so reading glasses of +'
                      + shortfall.toFixed(1) + ' D close the gap.')
                + ' Move the page further away and the requirement falls, which is why a music '
                + 'score at 50 cm needs weaker glasses than a book at 25 cm. Accommodation runs '
                + 'from about 14 D at age ten to about 2 D at fifty, and the requirement never '
                + 'moves -- so all the change over a lifetime is on the supply side.',
        };
    };

    return (
        <LabCanvas
            title="When Will You Need Reading Glasses?"
            readout={({ raw }) => accomOf(raw).toFixed(1) + ' D of accommodation left'}
            controlLabel="Accommodation Left"
            controlKey="accommodationLeft"
            controlMin={5}
            controlMax={140}
            controlInitial={35}
            controlDisplay={raw => accomOf(raw).toFixed(1) + ' D'}
            control2={{
                label: 'Reading Distance',
                key: 'readingDistance',
                min: 20,
                max: 60,
                initial: 25,
                display: raw => distanceOf(raw) + ' cm',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Lenses Change What We See?"
            completeNote="A fixed requirement, against a falling supply!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
