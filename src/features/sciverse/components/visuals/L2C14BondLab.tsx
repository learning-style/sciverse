import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const WIDEST = 3.2;
const IONIC = '#b45309';
const POLAR = '#047857';
const EVEN = '#0f766e';

const enOf = (dial: number): number => Math.max(0.8, Math.min(4, Math.round(dial * 10) / 10));

const bandOf = (diff: number): { name: string; line: string; colour: string } => {
    if (diff > 1.7) return { name: 'ionic', line: 'above 1.7: ionic -- handed over', colour: IONIC };
    if (diff >= 0.4) return { name: 'polar covalent', line: '0.4 to 1.7: polar covalent -- pulled to one side', colour: POLAR };
    return { name: 'nonpolar covalent', line: 'below 0.4: nonpolar covalent -- shared evenly', colour: EVEN };
};

export const L2C14BondLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const first = enOf(raw);
        const second = enOf(raw2);
        const higher = Math.max(first, second);
        const lower = Math.min(first, second);
        const diff = Math.round((higher - lower) * 10) / 10;
        const band = bandOf(diff);

        // Two atoms, and the shared electrons sitting where the difference puts
        // them: dead centre at 0, hard against the stronger puller when ionic.
        const cy = Math.min(stageTop + 66, stageBottom - 90);
        const r = 30;
        const ax = safeRight * 0.3;
        const bxx = safeRight * 0.7;
        const pull = Math.max(0, Math.min(1, diff / WIDEST));
        const toSecond = second >= first;
        const shift = (bxx - ax) / 2 * pull * (toSecond ? 1 : -1);
        const mid = (ax + bxx) / 2 + shift;

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ax + r, cy);
        ctx.lineTo(bxx - r, cy);
        ctx.stroke();

        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const atom = (x: number, value: number, label: string) => {
            ctx.beginPath();
            ctx.arc(x, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = value === higher ? '#d1fae5' : '#f1f5f9';
            ctx.fill();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = '#0f172a';
            ctx.fillText(value.toFixed(1), x, cy + 1);
            outlineText(ctx, label, x, cy + r + 18, '11px monospace', '#475569', 'center', 120);
        };
        atom(ax, first, 'First Atom');
        atom(bxx, second, 'Second Atom');

        // The shared pair
        ctx.fillStyle = band.colour;
        for (let i = -1; i <= 1; i += 2) {
            ctx.beginPath();
            ctx.arc(mid + i * 6, cy, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'electrons', mid, cy - 16, '11px monospace', band.colour, 'center', 120);
        ctx.textBaseline = 'alphabetic';

        // Charges, once the electrons have been handed over rather than shared
        if (diff > 1.7) {
            outlineText(ctx, toSecond ? '+' : '−', ax, cy - r - 8, 'bold 16px monospace', IONIC, 'center', 40);
            outlineText(ctx, toSecond ? '−' : '+', bxx, cy - r - 8, 'bold 16px monospace', IONIC, 'center', 40);
        }

        // Where this bond sits on the one scale that runs from 0 to 3.2
        const sx0 = 34;
        const sx1 = safeRight - 34;
        const sy = Math.min(cy + r + 34, stageBottom - 58);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(sx0, sy, sx1 - sx0, 12);
        ctx.fillStyle = band.colour;
        ctx.fillRect(sx0, sy, (sx1 - sx0) * pull, 12);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx0, sy, sx1 - sx0, 12);
        for (const edge of [0.4, 1.7]) {
            const x = sx0 + (sx1 - sx0) * (edge / WIDEST);
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, sy - 5);
            ctx.lineTo(x, sy + 17);
            ctx.stroke();
            outlineText(ctx, edge.toFixed(1), x, sy + 30, '10px monospace', '#475569', 'center', 40);
        }

        outlineText(ctx, `difference = ${higher.toFixed(1)} − ${lower.toFixed(1)} = ${diff.toFixed(1)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, band.line,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', band.colour, 'center', safeRight - 30);

        fitText(ctx, `${diff.toFixed(1)}: ${band.name}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The gap, not either value', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: pull,
                caption: 'Difference',
                low: 'shared',
                high: 'handed over',
                stops: ['#ecfdf5', '#6ee7b7', IONIC] as [string, string, string],
            },
            note: `${higher.toFixed(1)} − ${lower.toFixed(1)} = ${diff.toFixed(1)}, so this bond is ${band.name}. ${diff > 1.7 ? 'The electrons are handed over.' : diff >= 0.4 ? 'The electrons are shared, but pulled to one side.' : 'The electrons are shared evenly, so they sit dead centre.'}`,
        };
    };

    return (
        <LabCanvas
            title="Which Bond Will It Be?"
            readout={({ raw, raw2 }) => `A bond between ${enOf(raw).toFixed(1)} and ${enOf(raw2).toFixed(1)}`}
            controlLabel="First Atom"
            controlKey="firstAtom"
            controlMin={0.8}
            controlMax={4}
            controlInitial={0.9}
            controlDisplay={raw => `${enOf(raw).toFixed(1)}`}
            control2={{
                label: 'Second Atom',
                key: 'secondAtom',
                min: 0.8,
                max: 4,
                initial: 3,
                display: raw => `${enOf(raw).toFixed(1)}`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Which Bond Will It Be?"
            completeNote="higher − lower!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
