import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FISH_G = 1000;
const BODY_CM3 = FISH_G / 1.07;
const SEAWATER = 1025;
/** Gas that gives exactly seawater's density: about 41 cm3, as in L2B6. */
const HOVER_GAS_CM3 = FISH_G / (SEAWATER / 1000) - BODY_CM3;
const WEIGHT_N = (FISH_G / 1000) * 9.8;
const MAX_DEPTH_M = 50;
const UP = '#15803d';
const DOWN = '#b91c1c';

const depthOf = (dial: number): number => Math.max(0, Math.min(MAX_DEPTH_M, Math.round(dial)));
/** The lesson's rule: every 10 m of seawater adds about 1 atm. */
const atmAt = (depth: number): number => 1 + depth / 10;

export const L3B6DepthLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const hoverDepth = depthOf(raw);
        const depth = depthOf(raw2);
        const pHover = atmAt(hoverDepth);
        const pNow = atmAt(depth);
        const gas = (HOVER_GAS_CM3 * pHover) / pNow;
        const total = BODY_CM3 + gas;
        const average = FISH_G / total;
        const buoyant = SEAWATER * 9.8 * total * 1e-6;
        const net = buoyant - WEIGHT_N;
        const still = Math.abs(net) < 0.005;
        const netColour = still ? '#475569' : net > 0 ? UP : DOWN;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // The sea from 0 m to 50 m, with the hover depth dashed
        const gaugeX = 52;
        const seaTop = stageTop + 12;
        const seaBottom = stageTop + 128 * sy;
        const seaRight = safeRight * 0.5;
        const yOf = (m: number): number => seaTop + (m / MAX_DEPTH_M) * (seaBottom - seaTop);
        const grad = ctx.createLinearGradient(0, seaTop, 0, seaBottom);
        grad.addColorStop(0, '#dbeafe');
        grad.addColorStop(1, '#93c5fd');
        ctx.fillStyle = grad;
        ctx.fillRect(gaugeX, seaTop, seaRight - gaugeX, seaBottom - seaTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gaugeX, seaTop);
        ctx.lineTo(gaugeX, seaBottom);
        ctx.stroke();
        outlineText(ctx, '0 m', gaugeX - 6, seaTop + 4, '11px monospace', '#475569', 'right', 40);
        outlineText(ctx, '50 m', gaugeX - 6, seaBottom + 4, '11px monospace', '#475569', 'right', 40);

        const hoverY = yOf(hoverDepth);
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(gaugeX, hoverY);
        ctx.lineTo(seaRight, hoverY);
        ctx.stroke();
        ctx.setLineDash([]);
        const fishX = gaugeX + (seaRight - gaugeX) * 0.68;
        outlineText(ctx, 'hover depth', gaugeX + 6, hoverY - 5, 'bold 11px monospace', '#1e3a8a', 'left', Math.max(40, fishX - gaugeX - 46));

        // The fish, its swim bladder drawn to its current size
        const fishY = yOf(depth) + (still ? Math.sin(t * 1.8) * 1.5 : 0);
        const bodyW = 50;
        const bodyH = 20;
        ctx.fillStyle = '#fb7185';
        ctx.beginPath();
        ctx.ellipse(fishX, fishY, bodyW / 2, bodyH / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(fishX + bodyW / 2 - 3, fishY);
        ctx.lineTo(fishX + bodyW / 2 + 12, fishY - bodyH / 2);
        ctx.lineTo(fishX + bodyW / 2 + 12, fishY + bodyH / 2);
        ctx.closePath();
        ctx.fill();
        const gasScale = Math.min(1.6, Math.sqrt(gas / HOVER_GAS_CM3));
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(fishX - 2, fishY - 1, 9 * gasScale, 4.5 * gasScale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (!still) {
            const len = 10 + 30 * sy * Math.min(1, Math.abs(net) / 0.5);
            const startY = net > 0 ? fishY - bodyH / 2 - 3 : fishY + bodyH / 2 + 3;
            const tipY = net > 0 ? startY - len : startY + len;
            const dir = net > 0 ? -1 : 1;
            const ax = fishX - bodyW / 2 - 14;
            ctx.strokeStyle = netColour;
            ctx.fillStyle = netColour;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(ax, startY);
            ctx.lineTo(ax, tipY - dir * 7);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ax, tipY);
            ctx.lineTo(ax - 6, tipY - dir * 9);
            ctx.lineTo(ax + 6, tipY - dir * 9);
            ctx.closePath();
            ctx.fill();
        }

        // Boyle's law and the balance, step by step
        const px = safeRight * 0.56;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `pressure here: ${pNow.toFixed(1)} atm`, px, stageTop + 20, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `gas: 41 x ${pHover.toFixed(1)} / ${pNow.toFixed(1)} = ${gas.toFixed(1)} cm³`, px, stageTop + 44, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `average density: ${average.toFixed(3)} g/cm³`, px, stageTop + 68, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `net force: ${net >= 0 ? '+' : '−'}${Math.abs(net).toFixed(3)} N`, px, stageTop + 100 * sy, 'bold 13px monospace', netColour, 'left', pw);

        outlineText(ctx, `buoyant force ${buoyant.toFixed(3)} N − weight 9.800 N = ${net >= 0 ? '+' : '−'}${Math.abs(net).toFixed(3)} N`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        const verdict = still ? 'hovers -- but any nudge runs away'
            : net > 0 ? 'rises, and the gas swells further' : 'sinks, and the gas squeezes further';
        outlineText(ctx, verdict, safeRight / 2, stageBottom - 14, 'bold 12px monospace', netColour, 'center', safeRight - 30);

        fitText(ctx, `Gas ${gas.toFixed(1)} cm³ at ${depth} m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Deeper, denser, deeper', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 0.5 + net / 1)),
                caption: 'Net Force on the Fish',
                low: 'Down',
                high: 'Up',
                stops: ['#fca5a5', '#e2e8f0', '#86efac'] as [string, string, string],
            },
            note: `At ${depth} m the gas takes up ${gas.toFixed(1)} cm³ and the fish's average density is ${average.toFixed(3)} g/cm³, so the net force is ${net >= 0 ? '+' : '−'}${Math.abs(net).toFixed(3)} N.`,
        };
    };

    return (
        <LabCanvas
            title="The Swim Bladder's Unstable Balance"
            readout={({ raw }) => `Hovers at ${depthOf(raw)} m`}
            controlLabel="Hover Depth"
            controlKey="hoverDepth"
            controlMin={0}
            controlMax={MAX_DEPTH_M}
            controlInitial={20}
            controlDisplay={raw => `${depthOf(raw)} m`}
            control2={{
                label: 'Depth',
                key: 'fishDepth',
                min: 0,
                max: MAX_DEPTH_M,
                initial: 20,
                display: raw => `${depthOf(raw)} m`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Swim Bladder's Unstable Balance"
            completeNote="Deeper, denser, deeper!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
