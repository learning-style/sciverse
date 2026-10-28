import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces L3B15CycleLab, which plotted two Lotka-Volterra populations against time.
//
// Three bars, and the arithmetic is in all three rather than in a caption. The top one
// is what one hare costs a lynx: the pale part is SEARCHING, which the wood controls and
// which halves whenever the hares double, and the solid part is HANDLING, which the
// lynx's own body sets and which never moves. Raise the hares and the pale part visibly
// drains away until the bar is almost all handling -- that is the ceiling, drawn.
//
// The two bars below are the whole wood for a year, BORN against TAKEN, on one shared
// scale so the eye compares them directly with no number needed. They cross at about
// 1,083 hares: below it the taken bar is longer and the wood falls, above it the born
// bar runs away. The balance point is a ridge, and a reader who only looks has seen it.
const SEARCH = '#bae6fd';
const SEARCH_INK = '#0369a1';
const HANDLE = '#be123c';
const BORN = '#15803d';
const TAKEN = '#b45309';
const INK = '#0f172a';
const MUTED = '#475569';

const SEARCH_DAYS = 10000;   // hare-days: 10 days to find one when there are 1,000
const LYNX = 20;
const GROWTH = 0.6;          // L2B15's 60% a year
const YEAR = 365;

const haresOf = (dial: number): number => Math.max(400, Math.min(10000, Math.round(dial / 100) * 100));
const handleOf = (dial: number): number => Math.max(1, Math.min(6, Math.round(dial)));

export const L3B15TimeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const hares = haresOf(raw);
        const handle = handleOf(raw2);
        const search = SEARCH_DAYS / hares;
        const perHare = search + handle;
        const catchYear = YEAR / perHare;
        const born = GROWTH * hares;
        const taken = LYNX * catchYear;
        const ceiling = YEAR / handle;
        // exhaustive by construction: every ratio lands in exactly one of the three
        const off = born / taken - 1;
        const level = Math.abs(off) <= 0.02;
        const rising = !level && off > 0;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = Math.max(6, artBottom - artTop);
        const left = 24;
        const fullW = Math.max(90, safeRight - 48);

        // three equal blocks taken from the height that exists -- no floor, so the
        // layout can never claim more room than it was given
        const unit = usable / 3;
        const showLbl = unit >= 26;
        const barTop = showLbl ? 12 : 1;
        const barH = Math.max(2, Math.min(16, unit - barTop - 4));
        const blockY = (i: number) => artTop + i * unit;

        const tag = (s: string, x: number, y: number, align: 'left' | 'right', c: string) =>
            outlineText(ctx, s, x, y, 'bold 10px monospace', c, align, fullW - 6);
        const show = (n: number) => n >= 100 ? String(Math.round(n)) : n.toFixed(1);

        // ---- bar 1: what one hare costs, split to scale
        const y0 = blockY(0);
        const splitW = fullW * (search / perHare);
        ctx.fillStyle = SEARCH;
        ctx.fillRect(left, y0 + barTop, splitW, barH);
        ctx.fillStyle = HANDLE;
        ctx.fillRect(left + splitW, y0 + barTop, fullW - splitW, barH);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1;
        ctx.strokeRect(left, y0 + barTop, fullW, barH);
        // a marker running the bar once per hare, so the repeat is visible
        if (barH >= 6) {
            const run = (t * 0.35) % 1;
            ctx.fillStyle = INK;
            ctx.beginPath();
            ctx.arc(left + fullW * run, y0 + barTop + barH / 2, Math.max(1.5, barH * 0.2), 0, Math.PI * 2);
            ctx.fill();
        }
        if (showLbl) {
            tag('searching ' + search.toFixed(1) + ' d', left, y0 + 10, 'left', SEARCH_INK);
            tag('handling ' + handle + ' d', left + fullW, y0 + 10, 'right', HANDLE);
        }

        // ---- bars 2 and 3: the whole wood for a year, on one shared scale
        const top = Math.max(born, taken);
        const pair: [string, number, string][] = [
            ['born this year ' + Math.round(born), born, BORN],
            ['taken by lynx ' + Math.round(taken), taken, TAKEN],
        ];
        for (let i = 0; i < 2; i++) {
            const [label, value, colour] = pair[i];
            const y = blockY(i + 1);
            ctx.fillStyle = colour;
            ctx.fillRect(left, y + barTop, Math.max(1, fullW * (value / top)), barH);
            ctx.strokeStyle = 'rgba(15,23,42,0.35)';
            ctx.lineWidth = 1;
            ctx.strokeRect(left, y + barTop, fullW, barH);
            if (showLbl) tag(label, left, y + 10, 'left', colour);
        }

        outlineText(ctx, show(perHare) + ' days each, so ' + Math.round(catchYear) + ' a year',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, YEAR + ' d / ' + handle + ' d = ' + Math.round(ceiling) + ' hares',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', MUTED, 'center', safeRight - 30);

        fitText(ctx, level ? 'level, for now' : rising ? 'the hares run away' : 'the hares collapse',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, level ? 'A ridge, not a valley'
            : rising ? 'Births have no ceiling' : 'More taken than born',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, catchYear / ceiling)),
                caption: 'The Catch Against Its Ceiling',
                low: 'searching most days',
                high: 'handling every day',
                stops: [SEARCH_INK, '#fbbf24', HANDLE] as [string, string, string],
            },
            note: level
                ? 'At ' + hares + ' hares the two bars are within a fiftieth of each other, which is L2B15'
                  + "'s balance point. Nudge it either way and look again: it leaves in whichever direction you push."
                : rising
                    ? 'Searching has fallen to ' + search.toFixed(1) + ' days, so each lynx takes '
                      + Math.round(catchYear) + ' a year against a ceiling of ' + Math.round(ceiling)
                      + '. The births have no ceiling at all, so they pull further ahead every year.'
                    : 'Hares are thin on the ground, so searching takes ' + search.toFixed(1)
                      + ' days and the lynx still take ' + Math.round(taken) + ' against '
                      + Math.round(born) + ' born. The wood goes on emptying.',
        };
    };

    return (
        <LabCanvas
            title="The Ceiling a Body Sets"
            readout={({ raw }) => haresOf(raw) + ' hares'}
            controlLabel="Hares in the Wood"
            controlKey="woodHares"
            controlMin={400}
            controlMax={10000}
            controlInitial={1000}
            controlDisplay={raw => String(haresOf(raw))}
            control2={{
                label: 'Days to Handle One Hare',
                key: 'handleDays',
                min: 1,
                max: 6,
                initial: 2,
                display: raw => handleOf(raw) + ' days',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Systems Find Balance?"
            completeNote="A lynx cannot eat faster than its gut!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
