import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// A bare strip with zinc either side, and the protection reaching in from both
// edges. Whether the middle rusts is the whole question, so the picture draws the
// two protected bands and whatever is left between them.
const WETS: [string, number][] = [
    ['a film of rain', 2], ['damp air', 5], ['fresh water', 10], ['seawater', 50],
];
const EMERALD = '#047857';
const RUST = '#7f1d1d';

const widthOf = (dial: number): number => Math.max(1, Math.min(200, Math.round(dial)));
const wetOf = (dial: number): [string, number] =>
    WETS[Math.max(0, Math.min(WETS.length - 1, Math.round(dial)))];

export const L3C23ReachLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const bareMm = widthOf(raw);
        const [wetName, reachMm] = wetOf(raw2);
        const coveredMm = Math.min(bareMm, 2 * reachMm);
        const rustMm = bareMm - coveredMm;
        const safe = rustMm <= 0;
        const pctSafe = (coveredMm / bareMm) * 100;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const barH = Math.max(26, Math.min(74, usable - CAP - TAIL));
        const blockH = CAP + barH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + CAP;

        const left = 20;
        const fullW = Math.max(100, safeRight - 40);
        // one scale: the bare strip plus a margin of zinc on each side
        const totalMm = bareMm + Math.max(bareMm * 0.5, 8);
        const mm2px = fullW / totalMm;
        const bareW = bareMm * mm2px;
        const bareLeft = left + (fullW - bareW) / 2;

        // zinc either side
        ctx.fillStyle = '#6ee7b7';
        ctx.fillRect(left, barTop, bareLeft - left, barH);
        ctx.fillRect(bareLeft + bareW, barTop, left + fullW - bareLeft - bareW, barH);
        // bare steel between
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(bareLeft, barTop, bareW, barH);
        // what the circuit reaches in from each edge
        const reachPx = Math.min(reachMm * mm2px, bareW / 2);
        ctx.fillStyle = '#a7f3d0';
        ctx.fillRect(bareLeft, barTop, reachPx, barH);
        ctx.fillRect(bareLeft + bareW - reachPx, barTop, reachPx, barH);
        // and whatever is left in the middle
        if (!safe) {
            ctx.fillStyle = '#d97757';
            ctx.fillRect(bareLeft + reachPx, barTop, bareW - 2 * reachPx, barH);
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, barTop, fullW, barH);
        ctx.strokeStyle = EMERALD;
        ctx.lineWidth = 1.4;
        for (const x of [bareLeft, bareLeft + bareW]) {
            ctx.beginPath();
            ctx.moveTo(x, barTop); ctx.lineTo(x, barTop + barH);
            ctx.stroke();
        }

        // electrons leaving the zinc and arriving at the steel
        for (let i = 0; i < 4; i++) {
            const p = ((t * 0.5 + i * 0.25) % 1);
            ctx.fillStyle = EMERALD;
            for (const dir of [1, -1]) {
                const x0 = dir > 0 ? bareLeft : bareLeft + bareW;
                ctx.beginPath();
                ctx.arc(x0 + dir * p * reachPx, barTop + barH * 0.3, 2.4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        outlineText(ctx, 'the circuit reaches in from the zinc on each side',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'bare ' + bareMm + ' mm',
            safeRight / 2, Math.max(Math.min(barTop + barH * 0.7, artBottom - 30), barTop + 12),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 24);
        outlineText(ctx, safe ? 'protected all the way across'
            : rustMm.toFixed(0) + ' mm in the middle rusts',
            safeRight / 2, Math.min(barTop + barH + 16, artBottom),
            'bold 12px monospace', safe ? EMERALD : RUST, 'center', safeRight - 24);

        outlineText(ctx, wetName + ' reaches ' + reachMm + ' mm, so it reaches '
            + coveredMm.toFixed(0) + ' mm of ' + bareMm + ' mm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the steel is the wrong electrode, not a covered one',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', EMERALD, 'center', safeRight - 30);

        fitText(ctx, safe ? 'all ' + bareMm + ' mm protected'
            : pctSafe.toFixed(0) + '% protected', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Protected by being the wrong electrode',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, pctSafe / 100)),
                caption: 'How Much Bare Steel Is Protected',
                low: 'the middle rusts',
                high: 'all of it protected',
                stops: ['#fef2f2', '#6ee7b7', EMERALD] as [string, string, string],
            },
            note: 'A ' + bareMm + ' mm bare strip wet with ' + wetName + ', which carries the circuit about '
                + reachMm + ' mm in from each side, is '
                + (safe ? 'protected all the way across.' : 'protected for ' + pctSafe.toFixed(0)
                    + '%, and the middle rusts.'),
        };
    };

    return (
        <LabCanvas
            title="Why a Scratch in the Zinc Does Not Matter"
            readout={({ raw }) => 'A bare strip ' + widthOf(raw) + ' mm wide'}
            controlLabel="Scratch Width"
            controlKey="bareWidth"
            controlMin={1}
            controlMax={200}
            controlInitial={4}
            controlDisplay={raw => widthOf(raw) + ' mm'}
            control2={{
                label: 'What the Surface Is Wet With',
                key: 'wetWith',
                min: 0,
                max: 3,
                initial: 0,
                display: raw => wetOf(raw)[0] + ', about ' + wetOf(raw)[1] + ' mm',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="One circuit, with a winner and a loser!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
