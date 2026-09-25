import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const HARES = 1000;
const GROWTH = 0.6;
const BIRTHS = HARES * GROWTH;
const ROSE = '#be123c';
const FALL = '#475569';

const lynxOf = (dial: number): number => Math.max(0, Math.min(40, Math.round(dial)));
const catchOf = (dial: number): number => Math.max(10, Math.min(50, Math.round(dial)));

export const L2B15BalanceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const lynx = lynxOf(raw);
        const perLynx = catchOf(raw2);
        const losses = lynx * perLynx;
        const change = BIRTHS - losses;
        const steady = Math.abs(change) < 1;
        const rising = change > 0;
        const colour = steady ? '#0f172a' : rising ? ROSE : FALL;
        const word = steady ? 'steady' : rising ? 'hares rise' : 'hares fall';
        const balanceLynx = perLynx > 0 ? BIRTHS / perLynx : 0;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);

        // Two opposing flows, drawn to the same scale so they can be compared
        const widest = Math.max(BIRTHS, losses, 600);
        const bx = 96;
        const bw = safeRight - bx - 40;
        const barH = Math.max(16, Math.min(54, avail * 0.16));
        const gap = Math.max(12, Math.min(40, avail * 0.1));
        const blockH = barH * 3 + gap * 2;
        const by = artTop + Math.max(0, (avail - blockH - 26) / 2);

        const flow = (y: number, value: number, fill: string, label: string, text: string) => {
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(bx, y, bw, barH);
            ctx.fillStyle = fill;
            ctx.fillRect(bx, y, bw * Math.max(0, Math.min(1, value / widest)), barH);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, y, bw, barH);
            outlineText(ctx, label, bx - 8, y + barH / 2 + 4, '11px monospace', '#475569', 'right', 88);
            outlineText(ctx, text, bx + 8, y + barH / 2 + 4, 'bold 11px monospace', '#0f172a', 'left', bw - 16);
        };

        flow(by, BIRTHS, ROSE, 'births', `+${BIRTHS.toFixed(0)} hares a year`);
        flow(by + barH + gap, losses, FALL, 'losses', `-${losses.toFixed(0)} hares a year`);
        flow(by + (barH + gap) * 2, Math.abs(change), colour, 'change',
            `${change >= 0 ? '+' : '-'}${Math.abs(change).toFixed(0)} hares a year: ${word}`);

        // The balance point: how many lynx would make the flows match
        outlineText(ctx, `balance at ${balanceLynx.toFixed(1)} lynx, at ${perLynx} hares caught a year`,
            safeRight / 2, Math.min(by + blockH + 20, artBottom), '11px monospace', '#475569', 'center', safeRight - 40);

        outlineText(ctx, `${BIRTHS.toFixed(0)} - ${perLynx} x ${lynx} = ${change >= 0 ? '+' : '-'}${Math.abs(change).toFixed(0)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, steady ? 'births match losses: the numbers hold steady' : `${word}, so this is not the balance point`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', colour, 'center', safeRight - 30);

        fitText(ctx, `change ${change >= 0 ? '+' : '-'}${Math.abs(change).toFixed(0)} hares a year`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Numbers grow only while births are more than losses', safeRight / 2, 118, safeRight - 24, 13);

        const tail = steady
            ? 'so births match losses and the numbers hold steady.'
            : rising
                ? 'so the hares rise.'
                : 'so the hares fall.';

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, losses / (BIRTHS * 2))),
                caption: 'Losses Against Births',
                low: 'no losses',
                high: 'twice the births',
                stops: ['#fff1f2', '#fda4af', FALL] as [string, string, string],
            },
            note: `${lynx} lynx take ${losses.toFixed(0)} hares a year at ${perLynx} hares caught by each, against ${BIRTHS.toFixed(0)} born, ${tail} Balance needs ${balanceLynx.toFixed(1)} lynx.`,
        };
    };

    return (
        <LabCanvas
            title="When Do the Numbers Hold Steady?"
            readout={({ raw }) => `A wood with ${lynxOf(raw)} lynx`}
            controlLabel="Number of Lynx"
            controlKey="lynxCount"
            controlMin={0}
            controlMax={40}
            controlInitial={20}
            controlDisplay={raw => `${lynxOf(raw)} lynx`}
            control2={{
                label: 'Hares Caught by Each Lynx',
                key: 'catchPerLynx',
                min: 10,
                max: 50,
                initial: 30,
                display: raw => `${catchOf(raw)} a year`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="When Do the Numbers Hold Steady?"
            completeNote="births minus losses!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
