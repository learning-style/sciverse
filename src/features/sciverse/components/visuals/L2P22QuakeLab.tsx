import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One trace, two arrivals. The bracket between them is the whole measurement, so
// the picture is a time axis with two spikes and the gap marked -- nothing else.
// A 90 s gap at Vp = 6.0 reaches 1,620 km, so the meter spans 1,800 km.
const MAX_KM = 1800;
const VS = 4.5;
const P_COLOUR = '#4338ca';
const S_COLOUR = '#0f172a';

const gapOf = (dial: number): number => Math.max(5, Math.min(90, Math.round(dial)));
const vpOf = (dial: number): number => Math.round(Math.max(60, Math.min(100, dial))) / 10;
const kmPerSec = (vp: number): number => (vp * VS) / (vp - VS);

export const L2P22QuakeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const gap = gapOf(raw);
        const vp = vpOf(raw2);
        const perSec = kmPerSec(vp);
        const km = gap * perSec;
        const pAt = km / vp;                      // seconds after the quake
        const sAt = km / VS;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 20;
        const traceH = Math.max(26, Math.min(70, usable - CAP - TAIL - 26));
        const blockH = CAP + traceH + 26 + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const left = 18;
        const axisW = Math.max(90, safeRight - 36);
        const axisY = top + CAP + traceH;
        const span = sAt * 1.25;                  // seconds across the axis
        const xOf = (sec: number) => left + (sec / span) * axisW;
        const pX = xOf(pAt);
        const sX = xOf(sAt);

        // the quiet trace, then the two arrivals
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(left, axisY);
        ctx.lineTo(left + axisW, axisY);
        ctx.stroke();

        const spike = (x: number, colour: string, h: number, wobble: boolean) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i <= 26; i++) {
                const p = i / 26;
                const amp = h * Math.sin(p * Math.PI) * (wobble ? 0.8 + 0.2 * Math.sin(t * 6 + i) : 1);
                const yy = axisY - amp * (i % 2 === 0 ? 1 : -1);
                if (i === 0) ctx.moveTo(x + p * 20, axisY); else ctx.lineTo(x + p * 20, yy);
            }
            ctx.stroke();
        };
        spike(pX, P_COLOUR, traceH * 0.42, true);
        spike(sX, S_COLOUR, traceH * 0.8, true);

        // the bracket: the measurement itself
        const bY = axisY + 12;
        ctx.strokeStyle = '#be123c';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(pX, bY - 5); ctx.lineTo(pX, bY);
        ctx.lineTo(sX, bY); ctx.lineTo(sX, bY - 5);
        ctx.stroke();

        outlineText(ctx, 'one trace, two arrivals, and the gap between them',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'P first, ' + pAt.toFixed(0) + ' s',
            Math.min(pX + 10, safeRight - 50), Math.max(axisY - traceH * 0.42 - 6, artTop + 22),
            'bold 11px monospace', P_COLOUR, 'center', safeRight / 2);
        outlineText(ctx, 'S later, ' + sAt.toFixed(0) + ' s',
            Math.min(sX + 10, safeRight - 46), Math.max(axisY - traceH * 0.8 - 6, artTop + 22),
            'bold 11px monospace', S_COLOUR, 'center', safeRight / 2);
        outlineText(ctx, 'gap ' + gap + ' s', (pX + sX) / 2, Math.min(bY + 14, artBottom),
            'bold 12px monospace', '#be123c', 'center', safeRight - 24);

        outlineText(ctx, 'distance = gap ' + gap + ' s x ' + perSec.toFixed(1)
            + ' km/s = ' + km.toFixed(0) + ' km',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'one station gives a circle, not a point',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', P_COLOUR, 'center', safeRight - 30);

        fitText(ctx, 'about ' + km.toFixed(0) + ' km away', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The start time cancels when you subtract',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, km / MAX_KM)),
                caption: 'Distance to the Earthquake',
                low: '0',
                high: MAX_KM.toLocaleString() + ' km',
                stops: ['#eef2ff', '#a5b4fc', P_COLOUR] as [string, string, string],
            },
            note: 'A gap of ' + gap + ' s where Vp is ' + vp.toFixed(1) + ' and Vs is '
                + VS.toFixed(1) + ' km/s means ' + perSec.toFixed(1)
                + ' km per second of gap, so the quake was about ' + km.toFixed(0) + ' km away.',
        };
    };

    return (
        <LabCanvas
            title="How Far Away Was the Quake?"
            readout={({ raw }) => 'A gap of ' + gapOf(raw) + ' seconds'}
            controlLabel="Gap Between Arrivals"
            controlKey="spGap"
            controlMin={5}
            controlMax={90}
            controlInitial={60}
            controlDisplay={raw => gapOf(raw) + ' s'}
            control2={{
                label: 'P-Wave Speed',
                key: 'pSpeed',
                min: 60,
                max: 100,
                initial: 80,
                display: raw => vpOf(raw).toFixed(1) + ' km/s',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Waves Help Us See the Invisible?"
            completeNote="Subtract, then multiply by ten!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
