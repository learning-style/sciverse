import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the plant keeps a running total, and the DATE that total is reached can be
// predicted months ahead even though no single day can be. So the picture is the total
// climbing day by day towards its target, with the prediction window drawn on a day
// axis that is FIXED at one year -- which makes the window's drawn width the relative
// precision, and makes "it does not finish in one season" something you see rather than
// read. The window is the point of the lesson, so it is the only thing that moves.
const BASE = 10;               // °C, maize base temperature
const SIGMA = 3;               // °C, day-to-day scatter of the daily mean
const SEASON = 365;            // days on the axis
const TOTAL = '#be123c';
const TARGET = '#334155';
const WINDOW = '#047857';
const DEAD = '#64748b';

const meanOf = (dial: number): number => Math.max(10, Math.min(30, Math.round(dial * 2) / 2));
const needOf = (dial: number): number => Math.max(175, Math.min(2800, Math.round(dial / 25) * 25));

export const L3B26ThermalLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const mean = meanOf(raw);
        const need = needOf(raw2);
        const perDay = Math.max(0, mean - BASE);
        const stalled = perDay <= 0;
        // days to the event, and the window from spreads adding through their squares
        const days = stalled ? SEASON * 9 : need / perDay;
        const wobble = stalled ? 0 : SIGMA * Math.sqrt(days) / perDay;
        const inSeason = !stalled && days <= SEASON;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const LBL = 15;
        // floored below any stage height that renders, and capped by what the one label
        // row under the axis leaves
        const showWindowRow = usable >= 44;
        const plotH = Math.max(12, usable - (showWindowRow ? LBL : 0) - 4);
        const plotTop = artTop + Math.max(0, (usable - (plotH + (showWindowRow ? LBL : 0) + 4)) / 2);
        const plotBottom = plotTop + plotH;
        const windowRow = plotBottom + 13;
        const showInPlot = plotH >= 34;

        const left = 32;
        const plotW = Math.max(70, safeRight - 58);
        const xOf = (day: number) => left + plotW * Math.max(0, Math.min(1, day / SEASON));
        const yOf = (dd: number) => plotBottom - plotH * Math.max(0, Math.min(1, dd / need));

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, plotBottom);
        ctx.lineTo(left + plotW, plotBottom);
        ctx.moveTo(left, plotTop);
        ctx.lineTo(left, plotBottom);
        ctx.stroke();

        // the target: the total the species needs
        ctx.strokeStyle = TARGET;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(left, yOf(need));
        ctx.lineTo(left + plotW, yOf(need));
        ctx.stroke();
        ctx.setLineDash([]);

        // the window: where the date could land
        if (inSeason && wobble > 0) {
            const x1 = xOf(Math.max(0, days - wobble));
            const x2 = xOf(Math.min(SEASON, days + wobble));
            ctx.fillStyle = 'rgba(4,120,87,0.20)';
            ctx.fillRect(x1, plotTop, Math.max(1.5, x2 - x1), plotH);
            ctx.strokeStyle = WINDOW;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, plotTop); ctx.lineTo(x1, plotBottom);
            ctx.moveTo(x2, plotTop); ctx.lineTo(x2, plotBottom);
            ctx.stroke();
        }

        // the running total, climbing at perDay a day
        ctx.strokeStyle = stalled ? DEAD : TOTAL;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(xOf(0), yOf(0));
        if (stalled) {
            ctx.lineTo(xOf(SEASON), yOf(0));
        } else {
            const endDay = Math.min(SEASON, days);
            ctx.lineTo(xOf(endDay), yOf(perDay * endDay));
        }
        ctx.stroke();

        // something accumulating, so the line reads as a total being added to
        if (!stalled) {
            const along = (t * 0.22) % 1;
            const d0 = Math.min(SEASON, days) * along;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(xOf(d0), yOf(perDay * d0), 2.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // the event itself, where the total meets the target
        if (inSeason) {
            const ex = xOf(days);
            const ey = yOf(need);
            ctx.fillStyle = TOTAL;
            ctx.beginPath();
            ctx.arc(ex, ey, 3.6, 0, Math.PI * 2);
            ctx.fill();
            if (showInPlot) {
                ctx.strokeStyle = WINDOW;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(ex, ey + 14);
                ctx.lineTo(ex, ey + 5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(ex - 4, ey + 10);
                ctx.lineTo(ex, ey + 5);
                ctx.lineTo(ex + 4, ey + 10);
                ctx.stroke();
            }
        }

        if (showInPlot) {
            outlineText(ctx, 'needs ' + need + ' degree-days', left + 4, yOf(need) + 12,
                'bold 10px monospace', TARGET, 'left', plotW - 8);
            // the temperature is already on the dial and in the readout, so the space
            // is better spent naming what is being gained ten OF
            outlineText(ctx, perDay.toFixed(1) + ' degree-days a day',
                left + 4, plotBottom - 6, 'bold 10px monospace',
                stalled ? DEAD : TOTAL, 'left', plotW - 8);
        }
        if (showWindowRow) {
            outlineText(ctx, stalled ? 'never reaches ' + need
                : inSeason ? '± ' + wobble.toFixed(1) + ' days'
                    : 'not in one season',
                inSeason ? Math.max(left + 26, Math.min(left + plotW - 26, xOf(days))) : safeRight / 2,
                windowRow, 'bold 11px monospace', inSeason ? WINDOW : DEAD, 'center', plotW);
        }

        outlineText(ctx, stalled ? 'at the base: nothing adds'
            : '3 x √' + days.toFixed(0) + ' = ' + (SIGMA * Math.sqrt(days)).toFixed(0)
              + ' degree-days',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, stalled ? 'no date at all'
            : (SIGMA * Math.sqrt(days)).toFixed(0) + ' / ' + perDay.toFixed(1)
              + ' = ± ' + wobble.toFixed(1) + ' days',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            stalled ? DEAD : WINDOW, 'center', safeRight - 30);

        fitText(ctx, stalled ? 'it never tassels'
            : inSeason ? 'day ' + days.toFixed(0) + ', ± ' + wobble.toFixed(1)
                : 'day ' + days.toFixed(0) + ': too slow',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Degree-days from sowing', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, stalled ? 0 : 1 - wobble / 30)),
                caption: 'Precisely When It Tassels',
                low: 'nearly a month',
                high: 'under a day',
                stops: [DEAD, '#fcd34d', WINDOW] as [string, string, string],
            },
            note: stalled
                ? 'At 10 °C the plant is exactly at its base temperature, so no degree-days accumulate at all and the total never reaches '
                  + need + '. There is no date to predict.'
                : 'At ' + mean.toFixed(1) + ' °C the plant gains ' + perDay.toFixed(1)
                  + ' degree-days a day, reaching ' + need + ' on day ' + days.toFixed(0)
                  + '. The daily scatter of 3 °C adds through its squares to '
                  + (SIGMA * Math.sqrt(days)).toFixed(0) + ' degree-days, which is ± '
                  + wobble.toFixed(1) + ' days.',
        };
    };

    return (
        <LabCanvas
            title="The Forecast a Plant Can Make"
            readout={({ raw }) => meanOf(raw).toFixed(1) + ' °C mean'}
            controlLabel="Mean Daily Temperature"
            controlKey="thermalMean"
            controlMin={10}
            controlMax={30}
            controlInitial={20}
            controlDisplay={raw => meanOf(raw).toFixed(1) + ' °C'}
            control2={{
                label: 'Degree-Days Needed',
                key: 'thermalNeed',
                min: 175,
                max: 2800,
                initial: 700,
                display: raw => needOf(raw) + ' degree-days',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Predict the thing that adds it up!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
