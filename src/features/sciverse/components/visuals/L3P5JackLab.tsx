import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const LOAD_N = 5000;
/** One turn of a 0.25 m handle. */
const HAND_M = 2 * Math.PI * 0.25;
const HOLDS = '#3730a3';
const SLIPS = '#b45309';

const efficiencyOf = (dial: number): number => Math.max(10, Math.min(90, Math.round(dial))) / 100;
const pitchOf = (dial: number): number => Math.max(1, Math.round(dial));

export const L3P5JackLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const eta = efficiencyOf(raw);
        const pitchMm = pitchOf(raw2);
        const workOut = LOAD_N * (pitchMm / 1000);
        const workIn = workOut / eta;
        const lost = workIn - workOut;
        const push = workIn / HAND_M;
        const holds = lost >= workOut;
        const verdictColour = holds ? HOLDS : SLIPS;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // The jack: car on top, screw column, turning handle, base
        const cx = Math.max(56, safeRight * 0.17);
        const carTop = stageTop + 12;
        const carH = 18 * sy;
        const screwTop = carTop + carH;
        const baseY = stageTop + 104 * sy;
        ctx.fillStyle = '#64748b';
        ctx.fillRect(cx - 34, carTop, 68, carH);
        outlineText(ctx, 'car', cx, carTop + carH - 5, 'bold 11px monospace', '#ffffff', 'center', 60);

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(cx - 8, screwTop, 16, baseY - screwTop);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        const threadGap = 2 + pitchMm * 1.6;
        for (let y = screwTop + threadGap; y < baseY; y += threadGap) {
            ctx.beginPath();
            ctx.moveTo(cx - 8, y);
            ctx.lineTo(cx + 8, y - threadGap * 0.5);
            ctx.stroke();
        }
        const handleY = screwTop + (baseY - screwTop) * 0.45;
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx, handleY);
        ctx.lineTo(cx + 42 * Math.cos(t * 1.2), handleY);
        ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 30, baseY, 60, 12 * sy);

        // One turn's books
        const barX = Math.max(cx + 60, safeRight * 0.36);
        const barW = safeRight - 30 - barX;
        const scale = Math.max(workIn, 1);
        const rows: [string, number, string][] = [
            [`work in ${workIn.toFixed(1)} J`, workIn, '#6366f1'],
            [`work out ${workOut.toFixed(1)} J`, workOut, '#a5b4fc'],
            [`lost to friction ${lost.toFixed(1)} J`, lost, '#94a3b8'],
        ];
        rows.forEach(([label, joules, colour], i) => {
            const ly = stageTop + 18 + i * 40 * sy;
            outlineText(ctx, label, barX, ly, 'bold 12px monospace', '#0f172a', 'left', barW);
            ctx.fillStyle = colour;
            ctx.fillRect(barX, ly + 6, barW * (joules / scale), 12);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(barX, ly + 6, barW, 12);
        });

        outlineText(ctx, `let go: the load gives back ${workOut.toFixed(1)} J, friction takes ${lost.toFixed(1)} J`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, holds ? 'self-locking: the car stays up' : 'the load wins: the car comes down',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', verdictColour, 'center', safeRight - 30);

        fitText(ctx, `Push ${push.toFixed(0)} N lifts ${LOAD_N.toLocaleString()} N`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, `η = ${Math.round(eta * 100)}% -- self-locking at 50% or less`, safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: eta,
                caption: 'Efficiency',
                low: '0%',
                high: '100%',
                stops: ['#e0e7ff', '#a5b4fc', '#4338ca'] as [string, string, string],
            },
            note: `One turn: ${workIn.toFixed(1)} J in, ${workOut.toFixed(1)} J out, ${lost.toFixed(1)} J lost to friction. ${holds ? 'Friction takes more than the load gives back, so the car stays up.' : 'The load gives back more than friction takes, so the car comes down.'}`,
        };
    };

    return (
        <LabCanvas
            title="Why a Jack Holds Its Load"
            readout={({ raw }) => `Efficiency ${Math.round(efficiencyOf(raw) * 100)}%`}
            controlLabel="Efficiency"
            controlKey="jackEfficiency"
            controlMin={10}
            controlMax={90}
            controlInitial={30}
            controlDisplay={raw => `${Math.round(efficiencyOf(raw) * 100)}%`}
            control2={{
                label: 'Screw Pitch',
                key: 'screwPitch',
                min: 1,
                max: 10,
                initial: 5,
                display: raw => `${pitchOf(raw)} mm`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why a Jack Holds Its Load"
            completeNote="Self-locking at 50% or less!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
