import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the carrier is handed back, so it goes round and round, and only rarely
// leaves. No length can show 100,000 of anything, so the drawing's job is to make
// the LOOP obvious -- a ring with a rare exit branch -- and the numbers carry the
// size. A learner who only looks sees a thing going round with almost no way out,
// which is exactly why one atom wrecks a hundred thousand molecules.
const EMERALD = '#047857';
const CARRIER = '#b45309';
const OZONE = '#0369a1';

const stopOf = (dial: number): number => Math.pow(10, Math.max(2, Math.min(6, Math.round(dial))));
const atomsOf = (dial: number): number => {
    const steps = [1, 10, 100, 500, 1000];
    return steps[Math.max(0, Math.min(steps.length - 1, Math.round(dial)))];
};

// Readable at every size the dials can reach, from 100 to a thousand million.
const big = (value: number): string => {
    if (value < 1000) return String(Math.round(value));
    if (value < 1000000) return Math.round(value).toLocaleString('en-GB');
    if (value < 1000000000) return (value / 1000000).toFixed(value < 10000000 ? 1 : 0).replace('.0', '') + ' million';
    return (value / 1000000000).toFixed(value < 10000000000 ? 1 : 0).replace('.0', '') + ' billion';
};

export const L2C25ChainLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const stopOne = stopOf(raw);
        const atoms = atomsOf(raw2);
        const chain = stopOne;
        const destroyed = atoms * chain;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 30) / ROW)));
        const showCycle = fit >= 1;
        const showStop = fit >= 2;
        const aboveH = showCycle ? ROW : 0;
        const belowH = showStop ? ROW : 0;
        const ringH = Math.max(16, usable - aboveH - belowH);
        const top = artTop + Math.max(0, (usable - (aboveH + ringH + belowH)) / 2);
        const cycleRow = top + 11;
        const ringTop = top + aboveH;
        const cy = ringTop + ringH / 2;
        const stopRow = ringTop + ringH + 11;

        const radius = Math.max(8, Math.min(ringH / 2 - 3, 46));
        const cx = safeRight / 2;

        // the cycle itself, left open at the bottom right where the rare exit leaves
        ctx.strokeStyle = EMERALD;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, -Math.PI * 0.12, Math.PI * 1.78);
        ctx.stroke();

        // the rare way out, drawn small because it almost never happens
        const exitAng = -Math.PI * 0.06;
        const ex = cx + radius * Math.cos(exitAng);
        const ey = cy + radius * Math.sin(exitAng);
        const exitLen = Math.max(6, radius * 0.42);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 2]);
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex + exitLen, ey + exitLen * 0.5);
        ctx.stroke();
        ctx.setLineDash([]);

        // one ozone molecule at the top of the ring: three oxygens, wrecked each pass
        const spin = (t * 0.9) % 1;
        const ozAng = -Math.PI / 2;
        const ox = cx + radius * Math.cos(ozAng);
        const oy = cy + radius * Math.sin(ozAng);
        const hit = spin > 0.72 && spin < 0.86;
        const dotR = Math.max(1.8, radius * 0.1);
        ctx.fillStyle = OZONE;
        [-1, 0, 1].forEach(k => {
            const spread = hit ? dotR * 4.4 : dotR * 2.2;
            ctx.globalAlpha = hit && k !== 0 ? 0.35 : 1;
            ctx.beginPath();
            ctx.arc(ox + k * spread, oy - (hit && k !== 0 ? dotR * 2 : 0), dotR, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // the carrier, going round. It is the same colour every time it comes back.
        const ang = -Math.PI / 2 + spin * Math.PI * 2;
        ctx.fillStyle = CARRIER;
        ctx.beginPath();
        ctx.arc(cx + radius * Math.cos(ang), cy + radius * Math.sin(ang), Math.max(2.6, radius * 0.14), 0, Math.PI * 2);
        ctx.fill();

        if (showCycle) {
            outlineText(ctx, '1 cycle = 1 ozone wrecked', cx, cycleRow,
                'bold 12px monospace', OZONE, 'center', safeRight - 24);
        }
        if (showStop) {
            outlineText(ctx, 'stopped 1 cycle in ' + big(stopOne), cx, stopRow,
                'bold 12px monospace', '#334155', 'center', safeRight - 24);
        }

        outlineText(ctx, 'chain length = ' + big(chain), cx, stageBottom - 34,
            'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, big(atoms) + ' atoms wreck ' + big(destroyed), cx, stageBottom - 14,
            'bold 12px monospace', CARRIER, 'center', safeRight - 30);

        fitText(ctx, big(chain) + ' per atom', cx, 94, safeRight - 24, 16);
        fitText(ctx, 'The carrier comes back', cx, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.log10(chain) / 6)),
                caption: 'Cycles Before It Stops',
                low: 'a hundred cycles',
                high: 'a million: more damage',
                stops: ['#ecfdf5', '#fcd34d', CARRIER] as [string, string, string],
            },
            note: 'Stopped on 1 cycle in ' + big(stopOne) + ', a carrier gets ' + big(chain)
                + ' cycles, so ' + big(atoms) + ' of them wreck about ' + big(destroyed)
                + ' ozone molecules. Halve the stopping chance and that doubles.',
        };
    };

    return (
        <LabCanvas
            title="One Atom, a Hundred Thousand Molecules"
            readout={({ raw }) => 'Stopped 1 cycle in ' + big(stopOf(raw))}
            controlLabel="Chance of Being Stopped"
            controlKey="stopChance"
            controlMin={2}
            controlMax={6}
            controlInitial={5}
            controlDisplay={raw => '1 in ' + big(stopOf(raw))}
            control2={{
                label: 'Chlorine Atoms',
                key: 'chlorineAtoms',
                min: 0,
                max: 4,
                initial: 0,
                display: raw => big(atomsOf(raw)) + ' atoms',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Can Tiny Changes Cause Big Effects?"
            completeNote="How many repeats, not how big the cause!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
