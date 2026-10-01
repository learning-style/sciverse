import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MAX_T = 1100;        // tonnes a day at the top of the meter
const LORRY = 20;          // tonnes in one lorry load
const ROCK = '#047857';
const HEAVY = '#065f46';

const concOf = (dial: number): number => Math.max(20, Math.min(260, Math.round(dial / 10) * 10));
const flowOf = (dial: number): number => Math.max(2, Math.min(50, Math.round(dial / 2) * 2));
const kgPerSec = (mgL: number, q: number): number => (mgL * q) / 1000;

export const L2C18LoadLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const mgL = concOf(raw);
        const flow = flowOf(raw2);
        const perSec = kgPerSec(mgL, flow);
        const perDay = (perSec * 86400) / 1000;      // tonnes a day
        const lorries = perDay / LORRY;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(16, Math.min(26, usable * 0.15));
        const glassH = Math.max(40, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + glassH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const glassTop = top + capBand;

        // A glass of river water: clear to look at, and crowded with dissolved rock.
        const glassW = Math.max(46, Math.min(safeRight - 150, 96));
        const cx = safeRight / 2;
        const left = cx - glassW / 2;

        ctx.fillStyle = '#ecfdf5';
        ctx.fillRect(left, glassTop, glassW, glassH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, glassTop, glassW, glassH);

        // One dot for each 20 mg/L, drifting, so the count is readable rather than a haze.
        const dots = Math.max(1, Math.round(mgL / 20));
        ctx.fillStyle = mgL >= 150 ? HEAVY : ROCK;
        for (let i = 0; i < dots; i++) {
            const phase2 = i * 1.7;
            const dx = left + 8 + ((i * 29) % Math.max(10, glassW - 16));
            const dy = glassTop + 8 + ((i * 23 + t * 14) % Math.max(10, glassH - 16));
            const r = 2.6 + 0.6 * Math.sin(t * 2 + phase2);
            ctx.beginPath();
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'clear water, dissolved rock', cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'concentration ' + mgL + ' mg/L', cx,
            Math.min(glassTop + glassH + 14, artBottom - 10),
            'bold 12px monospace', mgL >= 150 ? HEAVY : ROCK, 'center', safeRight - 30);
        outlineText(ctx, 'discharge ' + flow + ' m³/s', cx,
            Math.min(glassTop + glassH + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, mgL + ' g/m³ x ' + flow + ' m³/s = ' + perSec.toFixed(2) + ' kg/s',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'dissolved load ' + perDay.toFixed(0) + ' tonnes a day, about '
            + lorries.toFixed(0) + ' lorry loads',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROCK, 'center', safeRight - 30);

        fitText(ctx, 'dissolved load ' + perSec.toFixed(2) + ' kg/s', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A concentration is only half a measurement',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, perDay / MAX_T)),
                caption: 'Rock Leaving the Valley',
                low: '0 tonnes a day',
                high: MAX_T + ' tonnes a day',
                stops: ['#ecfdf5', '#6ee7b7', HEAVY] as [string, string, string],
            },
            note: 'Water holding ' + mgL + ' mg/L of dissolved rock is ' + mgL
                + ' g/m\u00b3 -- the same thing. At a discharge of ' + flow + ' m\u00b3/s that is '
                + perSec.toFixed(2) + ' kg every second, or ' + perDay.toFixed(0)
                + ' tonnes a day, roughly ' + lorries.toFixed(0) + ' lorry loads.',
        };
    };

    return (
        <LabCanvas
            title="How Much Rock Leaves?"
            readout={({ raw }) => 'Water holding ' + concOf(raw) + ' mg/L'}
            controlLabel="Concentration"
            controlKey="dissolvedConc"
            controlMin={20}
            controlMax={260}
            controlInitial={150}
            controlDisplay={raw => concOf(raw) + ' mg/L'}
            control2={{
                label: 'Discharge',
                key: 'riverDischarge',
                min: 2,
                max: 50,
                initial: 10,
                display: raw => flowOf(raw) + ' m³/s',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Rivers Shape the Land?"
            completeNote="The invisible half is the bigger half!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
