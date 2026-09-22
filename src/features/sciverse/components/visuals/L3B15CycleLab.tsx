import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MEET = 0.03;
const CONV = 0.02;
const ROSE = '#be123c';
const LYNX = '#475569';

const growthOf = (dial: number): number => Math.max(0.2, Math.min(1.2, Math.round(dial * 20) / 20));
const deathOf = (dial: number): number => Math.max(0.2, Math.min(1.2, Math.round(dial * 20) / 20));

export const L3B15CycleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const r = growthOf(raw);
        const m = deathOf(raw2);
        const lynxStar = r / MEET;
        const hareStar = m / (CONV * MEET);
        const omega = Math.sqrt(r * m);
        const period = (2 * Math.PI) / omega;

        // A loop a quarter of the way out, with the two swings in the ratio the
        // equations give: a hare swing of A needs a lynx swing of A x omega / (a N*)
        const hareSwing = hareStar * 0.25;
        const lynxSwing = (hareSwing * omega) / (MEET * hareStar);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);
        const boxH = Math.min(200, avail - 58);
        const boxY = artTop + Math.max(0, (avail - boxH - 58) / 2);
        const boxX = 74;
        const boxW = safeRight - boxX - 40;

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        outlineText(ctx, 'hares', boxX + boxW / 2, boxY + boxH + 15, '11px monospace', ROSE, 'center', boxW);
        ctx.save();
        ctx.translate(boxX - 14, boxY + boxH / 2);
        ctx.rotate(-Math.PI / 2);
        outlineText(ctx, 'lynx', 0, 0, '11px monospace', LYNX, 'center', boxH);
        ctx.restore();

        const hx = (h: number): number => boxX + (h / (hareStar * 1.6)) * boxW;
        const py = (p: number): number => boxY + boxH - (p / (lynxStar * 1.9)) * boxH;

        // The balance point, and the loop the wood travels round it
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 90; i++) {
            const ang = (i / 90) * Math.PI * 2;
            const px = hx(hareStar + hareSwing * Math.cos(ang));
            const pyy = py(lynxStar + lynxSwing * Math.sin(ang));
            if (i === 0) ctx.moveTo(px, pyy);
            else ctx.lineTo(px, pyy);
        }
        ctx.stroke();

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(hx(hareStar), boxY + 4);
        ctx.lineTo(hx(hareStar), boxY + boxH - 4);
        ctx.moveTo(boxX + 4, py(lynxStar));
        ctx.lineTo(boxX + boxW - 4, py(lynxStar));
        ctx.stroke();

        // One wood travelling the loop, a lap every period
        const ang = (2 * Math.PI * t) / 6;
        ctx.fillStyle = LYNX;
        ctx.beginPath();
        ctx.arc(hx(hareStar + hareSwing * Math.cos(ang)), py(lynxStar + lynxSwing * Math.sin(ang)), 5, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, `balance point ${hareStar.toFixed(0)} hares and ${lynxStar.toFixed(0)} lynx`,
            hx(hareStar) + 8, py(lynxStar) - 8, '10px monospace', '#0f172a', 'left', boxW / 2);

        outlineText(ctx, `lap = 2π / √(${r.toFixed(2)} x ${m.toFixed(2)}) = ${period.toFixed(2)} years`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `P* = r / a = ${lynxStar.toFixed(0)} lynx, N* = m / (c a) = ${hareStar.toFixed(0)} hares`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, `lap ${period.toFixed(1)} years`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Each population set by the other', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (period - 5) / 16)),
                caption: 'Lap Length',
                low: '5 years',
                high: '21 years',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: `With a hare growth rate of ${r.toFixed(2)} and a lynx death rate of ${m.toFixed(2)} a year, the balance point is ${hareStar.toFixed(0)} hares and ${lynxStar.toFixed(0)} lynx, and one lap takes ${period.toFixed(2)} years, giving a lag between peaks of ${(period / 4).toFixed(2)} years.`,
        };
    };

    return (
        <LabCanvas
            title="Why Ten Years?"
            readout={({ raw }) => `A wood whose hares grow at ${growthOf(raw).toFixed(2)} a year`}
            controlLabel="Hare Growth Rate"
            controlKey="hareGrowth"
            controlMin={0.2}
            controlMax={1.2}
            controlInitial={0.6}
            controlDisplay={raw => `${growthOf(raw).toFixed(2)} a year`}
            control2={{
                label: 'Lynx Death Rate',
                key: 'lynxDeath',
                min: 0.2,
                max: 1.2,
                initial: 0.6,
                display: raw => `${deathOf(raw).toFixed(2)} a year`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Ten Years?"
            completeNote="2π / √(r m)!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
