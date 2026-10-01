import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// The ladder itself, drawn to scale. Rungs at -13.6/n^2 crowd towards zero, which
// is the whole reason the spectral lines crowd, so the picture has to be a ladder
// with unequal rungs and an arrow down it -- nothing else.
const RY = 13.6;                 // eV to free the electron from n = 1
const HC = 1240;                 // eV nm
const EMERALD = '#047857';
const UNSEEN = '#64748b';

const upOf = (dial: number): number => Math.max(2, Math.min(8, Math.round(dial)));
const downOf = (dial: number): number => Math.max(1, Math.min(4, Math.round(dial)));
const levelOf = (n: number): number => -RY / (n * n);

const bandOf = (nm: number): string =>
    nm < 380 ? 'ultraviolet' : nm > 750 ? 'infrared' : 'visible';
const seriesOf = (n1: number): string =>
    n1 === 1 ? 'Lyman' : n1 === 2 ? 'Balmer' : n1 === 3 ? 'Paschen' : 'Brackett';

export const L3C22LadderLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const nUp = upOf(raw);
        const nDown = downOf(raw2);
        const valid = nUp > nDown;
        const gap = valid ? levelOf(nUp) - levelOf(nDown) : 0;
        const nm = valid ? HC / gap : 0;
        const band = valid ? bandOf(nm) : '';
        const visible = band === 'visible';

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const ladderH = Math.max(44, usable - CAP - TAIL);
        const blockH = CAP + ladderH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const ladderTop = top + CAP;

        // the ladder: 0 eV at the top, -13.6 at the bottom, so rungs crowd upward
        const left = 36;
        const rungW = Math.max(70, safeRight - 120);
        const yOf = (eV: number) => ladderTop + ((0 - eV) / RY) * ladderH;

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, ladderTop); ctx.lineTo(left, ladderTop + ladderH);
        ctx.stroke();
        for (let n = 1; n <= 8; n++) {
            const y = yOf(levelOf(n));
            const on = n === nUp || n === nDown;
            ctx.strokeStyle = on ? EMERALD : '#94a3b8';
            ctx.lineWidth = on ? 2.4 : 1;
            ctx.beginPath();
            ctx.moveTo(left, y); ctx.lineTo(left + rungW * (on ? 1 : 0.72), y);
            ctx.stroke();
            if (n <= 4 || on) {
                outlineText(ctx, 'n=' + n, left - 16, y + 4,
                    'bold 10px monospace', on ? EMERALD : UNSEEN, 'center', 34);
            }
        }
        // zero: the electron has escaped
        ctx.strokeStyle = '#0f172a';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(left, ladderTop); ctx.lineTo(left + rungW, ladderTop); ctx.stroke();
        ctx.setLineDash([]);

        // the drop
        if (valid) {
            const x = left + rungW * 0.62;
            const y1 = yOf(levelOf(nUp));
            const y2 = yOf(levelOf(nDown));
            const bob = Math.sin(t * 3) * 1.5;
            ctx.strokeStyle = visible ? EMERALD : UNSEEN;
            ctx.lineWidth = 2.2;
            ctx.beginPath(); ctx.moveTo(x, y1 + bob); ctx.lineTo(x, y2 - 5); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y2); ctx.lineTo(x - 4, y2 - 6); ctx.lineTo(x + 4, y2 - 6);
            ctx.closePath();
            ctx.fillStyle = visible ? EMERALD : UNSEEN;
            ctx.fill();
        }

        outlineText(ctx, 'the rungs crowd as 1 over n squared',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, valid ? 'gap ' + gap.toFixed(3) + ' eV' : 'pick an upper level above the lower one',
            Math.min(left + rungW * 0.62 + 52, safeRight - 44),
            valid ? (yOf(levelOf(nUp)) + yOf(levelOf(nDown))) / 2 + 4 : ladderTop + 20,
            'bold 11px monospace', visible ? EMERALD : UNSEEN, 'center', safeRight / 2);
        outlineText(ctx, valid
            ? seriesOf(nDown) + ' series, ' + band + ', ' + nm.toFixed(1) + ' nm'
            : 'no jump: the electron would have to climb',
            safeRight / 2, Math.min(ladderTop + ladderH + 16, artBottom),
            'bold 12px monospace', visible ? EMERALD : UNSEEN, 'center', safeRight - 24);

        outlineText(ctx, valid
            ? '13.6 x (1/' + nDown + '² - 1/' + nUp + '²) = ' + gap.toFixed(3)
              + ' eV, so 1240/' + gap.toFixed(3) + ' = ' + nm.toFixed(1) + ' nm'
            : 'the upper level must be above the lower one',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'only the series ending at n = 2 lands in visible light',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', EMERALD, 'center', safeRight - 30);

        fitText(ctx, valid ? nm.toFixed(1) + ' nm, ' + band : 'choose two levels',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Calculated, not looked up', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, gap / RY)),
                caption: 'Energy of the Jump',
                low: '0',
                high: '13.6 eV',
                stops: ['#ecfdf5', '#6ee7b7', EMERALD] as [string, string, string],
            },
            note: valid
                ? 'Falling from n=' + nUp + ' to n=' + nDown + ' releases ' + gap.toFixed(3)
                  + ' eV, which is a line at ' + nm.toFixed(1) + ' nm -- ' + band + '.'
                : 'The upper level must sit above the lower one, or there is no drop to make a line.',
        };
    };

    return (
        <LabCanvas
            title="Where the Lines Come From"
            readout={({ raw }) => 'An electron falling from n = ' + upOf(raw)}
            controlLabel="Upper Level"
            controlKey="upperN"
            controlMin={2}
            controlMax={8}
            controlInitial={3}
            controlDisplay={raw => 'n = ' + upOf(raw)}
            control2={{
                label: 'Lower Level',
                key: 'lowerN',
                min: 1,
                max: 4,
                initial: 2,
                display: raw => 'n = ' + downOf(raw),
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Waves Help Us See the Invisible?"
            completeNote="Thirteen point six over n squared!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
