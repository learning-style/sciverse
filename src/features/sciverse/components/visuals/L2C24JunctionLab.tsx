import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the two routes DIVIDE one stream, where L2P24's two pipes ADDED. So the
// carbon arrives as a single grey bar and leaves as the same bar in two colours --
// the two parts sum to the inlet exactly, because they are drawn at one scale from
// one total. Make the flame bigger and the whole bar fattens with the boundary in
// the same place, which is the result the lesson is built on.
const SPAN = 130;              // the largest total the two dials can reach, g/min
const EMERALD = '#047857';     // the full burn
const DANGER = '#b45309';      // carbon monoxide
const INLET = '#475569';

const co2Of = (dial: number): number => Math.max(10, Math.min(90, Math.round(dial / 5) * 5));
const coOf = (dial: number): number => Math.max(2, Math.min(40, Math.round(dial / 2) * 2));

export const L2C24JunctionLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const co2 = co2Of(raw);
        const co = coOf(raw2);
        const total = co2 + co;
        const share = co2 / total;
        const coShare = 1 - share;

        // Rows are fixed slots, derived from the height available and dropped from the
        // bottom up, so nothing can land on the artwork or on the footer lines.
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const fit = Math.max(0, Math.min(4, Math.floor((usable - 24) / ROW)));
        const above = fit >= 1 ? ROW : 0;
        const below = (fit >= 2 ? ROW : 0) + (fit >= 3 ? ROW : 0) + (fit >= 4 ? ROW : 0);
        const room = Math.max(10, usable - above - below);
        const top = artTop + Math.max(0, (usable - (above + room + below)) / 2);
        const inRow = top + 11;
        const bandTop = top + above;
        const co2Row = bandTop + room + 11;
        const coRow = co2Row + ROW;
        const verdictRow = coRow + ROW;

        const barBand = Math.min(Math.max(10, room * 0.6), room, 86);
        const scale = barBand / SPAN;
        const cy = bandTop + room / 2;
        const inW = Math.max(4, total * scale);
        const co2W = Math.max(2, co2 * scale);
        const coW = Math.max(2, co * scale);

        const left = 28;
        const right = Math.max(left + 90, safeRight - 28);
        const junction = left + (right - left) * 0.38;
        const boxW = 18;

        // the flame, feeding one stream of carbon
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(left, cy - inW / 2 - 3, boxW, inW + 6);

        // carbon arriving: one stream, one colour
        ctx.fillStyle = INLET;
        ctx.fillRect(left + boxW, cy - inW / 2, junction - left - boxW, inW);

        // leaving: the same stream, divided. The two parts are drawn at one scale from
        // the same total, so they add up to the inlet by construction.
        const splitTop = cy - inW / 2;
        ctx.fillStyle = EMERALD;
        ctx.fillRect(junction, splitTop, right - junction, co2W);
        ctx.fillStyle = DANGER;
        ctx.fillRect(junction, splitTop + co2W, right - junction, coW);
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(junction, splitTop + co2W);
        ctx.lineTo(right, splitTop + co2W);
        ctx.stroke();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.4;
        ctx.strokeRect(junction, splitTop, right - junction, inW);

        // carbon moving away from the flame
        ctx.fillStyle = '#f8fafc';
        const march = (t * 34) % 24;
        for (let i = 0; i < 5; i++) {
            const dx = left + boxW + 5 + ((i * 24 + march) % Math.max(1, junction - left - boxW - 6));
            if (inW > 7) {
                ctx.beginPath();
                ctx.arc(dx, cy, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        if (fit >= 1) {
            outlineText(ctx, 'carbon in ' + total + ' g/min', (left + junction) / 2, inRow,
                'bold 12px monospace', '#334155', 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, 'CO2 ' + co2 + ' g/min', safeRight / 2, co2Row,
                'bold 12px monospace', EMERALD, 'center', safeRight - 24);
        }
        if (fit >= 3) {
            outlineText(ctx, 'CO ' + co + ' g/min', safeRight / 2, coRow,
                'bold 12px monospace', DANGER, 'center', safeRight - 24);
        }
        if (fit >= 4) {
            outlineText(ctx, coShare < 0.02 ? 'very little CO: good'
                : coShare < 0.1 ? 'some CO: ventilation needed'
                    : 'much CO: dangerous',
                safeRight / 2, verdictRow,
                'bold 12px monospace', coShare < 0.02 ? EMERALD : DANGER, 'center', safeRight - 24);
        }

        outlineText(ctx, 'share as CO2 = ' + co2 + '/' + total + ' = ' + (share * 100).toFixed(0) + '%',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'CO into the room ' + co + ' g/min',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', DANGER, 'center', safeRight - 30);

        fitText(ctx, (share * 100).toFixed(0) + '% leaves as CO2', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'One carbon, two routes', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, share)),
                caption: 'The Full Burn',
                low: 'much CO: dangerous',
                high: 'little CO: safer',
                stops: ['#b45309', '#fcd34d', EMERALD] as [string, string, string],
            },
            note: 'Of ' + total + ' g/min of carbon, ' + co2 + ' leaves as CO2 and ' + co
                + ' as CO, so the share is ' + (share * 100).toFixed(1)
                + '%. Double both routes and that share does not move.',
        };
    };

    return (
        <LabCanvas
            title="Why a Bigger Flame Is Not a Safer Flame"
            readout={({ raw }) => 'Route to CO2 ' + co2Of(raw) + ' g/min'}
            controlLabel="Route to CO2"
            controlKey="routeCO2"
            controlMin={10}
            controlMax={90}
            controlInitial={60}
            controlDisplay={raw => co2Of(raw) + ' g/min'}
            control2={{
                label: 'Route to CO',
                key: 'routeCO',
                min: 2,
                max: 40,
                initial: 6,
                display: raw => coOf(raw) + ' g/min',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Networks Deliver What Matters?"
            completeNote="The ratio sets the share, the size sets the amount!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
