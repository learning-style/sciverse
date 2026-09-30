import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MOON_SHARE = 2.2;    // metres, held fixed so the dials are the phase and the Sun
const LUNAR_MONTH = 29.5;
const MAX_RANGE = 4.5;     // 2.2 + 2.0 plus headroom, so the meter never pegs
const SPRING = '#1d4ed8';
const NEAP = '#4338ca';

const daysOf = (dial: number): number => Math.max(0, Math.min(29, Math.round(dial)));
const sunOf = (dial: number): number => Math.max(2, Math.min(20, Math.round(dial))) / 10;

/** How much of the Sun's pull adds to the Moon's: +1 lined up, -1 at right angles. */
const alignmentOf = (days: number): number =>
    Math.cos((4 * Math.PI * days) / LUNAR_MONTH);

export const L2P21TideLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const days = daysOf(raw);
        const sun = sunOf(raw2);
        const align = alignmentOf(days);
        const range = MOON_SHARE + sun * align;
        const springing = align > 0.5;
        const neaping = align < -0.5;

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

        const plotW = Math.max(140, Math.min(safeRight - 80, safeRight * 0.74));
        const left = safeRight / 2 - plotW / 2;
        const xFor = (d: number) => left + (d / 29) * plotW;
        const yFor = (m: number) => baseY - (Math.max(0, Math.min(MAX_RANGE, m)) / MAX_RANGE) * plotH;

        // the Moon's share on its own, for comparison
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(left, yFor(MOON_SHARE));
        ctx.lineTo(left + plotW, yFor(MOON_SHARE));
        ctx.stroke();
        ctx.setLineDash([]);

        // the range through the month: two full swings, because a line works either side
        ctx.strokeStyle = SPRING;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let d = 0; d <= 29; d += 0.5) {
            const y = yFor(MOON_SHARE + sun * alignmentOf(d));
            if (d === 0) ctx.moveTo(xFor(d), y); else ctx.lineTo(xFor(d), y);
        }
        ctx.stroke();

        ctx.fillStyle = springing ? SPRING : (neaping ? NEAP : '#64748b');
        ctx.beginPath();
        ctx.arc(xFor(days), yFor(range), 5, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'tidal range through one lunar month',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'the Moon alone ' + MOON_SHARE.toFixed(1) + ' m', left + 4,
            Math.max(yFor(MOON_SHARE) - 7, artTop + 24),
            'bold 10px monospace', '#334155', 'left', Math.max(60, plotW - 8));
        outlineText(ctx, 'day ' + days + ': range ' + range.toFixed(1) + ' m',
            safeRight / 2, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', springing ? SPRING : (neaping ? NEAP : '#0f172a'),
            'center', safeRight - 30);
        outlineText(ctx, springing ? 'lined up, so the pulls add -- a spring tide'
            : neaping ? 'at right angles, so they cancel -- a neap tide'
            : 'partly lined up, so somewhere in between',
            safeRight / 2, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'Moon ' + MOON_SHARE.toFixed(1) + ' m and Sun ' + sun.toFixed(1)
            + ' m: spring ' + (MOON_SHARE + sun).toFixed(1) + ' m, neap '
            + (MOON_SHARE - sun).toFixed(1) + ' m',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'high tides come every 12 h 25 min, each 50 min later than yesterday',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'tidal range ' + range.toFixed(1) + ' m on day ' + days,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Two pulls, adding or cancelling',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, range / MAX_RANGE)),
                caption: 'Tidal Range Today',
                low: '0 m',
                high: MAX_RANGE.toFixed(1) + ' m',
                stops: ['#eef2ff', '#93c5fd', SPRING] as [string, string, string],
            },
            note: 'On day ' + days + ' of the lunar month the Sun and Moon are '
                + (springing ? 'nearly lined up, so their pulls add'
                    : neaping ? 'nearly at right angles, so the Sun works against the Moon'
                    : 'partly lined up')
                + ', giving a range of ' + range.toFixed(1) + ' m. With the Moon worth '
                + MOON_SHARE.toFixed(1) + ' m and the Sun ' + sun.toFixed(1)
                + ' m, the biggest tides of the month are ' + (MOON_SHARE + sun).toFixed(1)
                + ' m and the smallest ' + (MOON_SHARE - sun).toFixed(1) + ' m, a ratio of '
                + ((MOON_SHARE + sun) / Math.max(0.1, MOON_SHARE - sun)).toFixed(1)
                + '. Spring tides come at new moon AND full moon, because a line through Earth, '
                + 'Moon and Sun works whichever side the Moon is on -- so they arrive every 14.8 '
                + 'days, not once a month. And the timing is set by the Moon, not our clock: high '
                + 'tides every 12 h 25 min, each about 50 minutes later than yesterday, which is '
                + 'why a week later the tide is nearly six hours out.',
        };
    };

    return (
        <LabCanvas
            title="When Is the Next High Tide?"
            readout={({ raw }) => 'Day ' + daysOf(raw) + ' of the lunar month'}
            controlLabel="Days Since New Moon"
            controlKey="daysSinceNewMoon"
            controlMin={0}
            controlMax={29}
            controlInitial={0}
            controlDisplay={raw => 'day ' + daysOf(raw)}
            control2={{
                label: "The Sun's Share",
                key: 'sunShare',
                min: 2,
                max: 20,
                initial: 10,
                display: raw => sunOf(raw).toFixed(1) + ' m',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Cycles Keep Systems Alive?"
            completeNote="Twelve hours twenty-five, every time!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
