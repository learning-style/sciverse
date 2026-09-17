import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const EMERALD = '#047857';
const SUM = '#b45309';

const angleOf = (dial: number): number => Math.max(60, Math.min(180, Math.round(dial * 2) / 2));
const muOf = (dial: number): number => Math.max(0.2, Math.min(2, Math.round(dial * 100) / 100));

export const L3C14DipoleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const angle = angleOf(raw);
        const mu = muOf(raw2);
        const half = angle / 2;
        const cosHalf = Math.cos((half * Math.PI) / 180);
        const total = 2 * mu * cosHalf;
        const cancels = total < 0.05;

        // The molecule: a central atom with two bonds opening at the angle,
        // drawn pointing down the page so the sum runs up the line of symmetry
        const cx = safeRight / 2;
        const cy = Math.min(stageTop + 52, stageBottom - 96);
        const len = 58;
        const arrow = (from: [number, number], to: [number, number], colour: string, width: number) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(from[0], from[1]);
            ctx.lineTo(to[0], to[1]);
            ctx.stroke();
            const a = Math.atan2(to[1] - from[1], to[0] - from[0]);
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.moveTo(to[0], to[1]);
            ctx.lineTo(to[0] - Math.cos(a - 0.4) * 9, to[1] - Math.sin(a - 0.4) * 9);
            ctx.lineTo(to[0] - Math.cos(a + 0.4) * 9, to[1] - Math.sin(a + 0.4) * 9);
            ctx.closePath();
            ctx.fill();
        };

        // Each bond arrow points away from the centre, towards the stronger puller
        const tilt = (90 - half) * (Math.PI / 180);
        const ends: [number, number][] = [
            [cx - Math.cos(tilt) * len, cy + Math.sin(tilt) * len],
            [cx + Math.cos(tilt) * len, cy + Math.sin(tilt) * len],
        ];
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 40);
        ctx.lineTo(cx, cy + len + 14);
        ctx.stroke();
        outlineText(ctx, 'line of symmetry', cx + 6, cy - 30, '10px monospace', '#94a3b8', 'left', 140);

        for (const end of ends) {
            arrow([cx, cy], end, EMERALD, 2.5);
            ctx.beginPath();
            ctx.arc(end[0], end[1], 12, 0, Math.PI * 2);
            ctx.fillStyle = '#d1fae5';
            ctx.fill();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#f1f5f9';
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        outlineText(ctx, `${angle.toFixed(1)}°`, cx, cy + 34, 'bold 12px monospace', '#475569', 'center', 80);

        // The vector sum, down the line of symmetry
        if (!cancels) {
            const sumLen = (total / (2 * 2)) * 84;
            arrow([cx, cy], [cx, cy - Math.max(10, sumLen)], SUM, 3.5);
            outlineText(ctx, 'vector sum', cx - 8, cy - Math.max(10, sumLen) - 8, '11px monospace', SUM, 'right', 120);
        } else {
            outlineText(ctx, 'the arrows cancel', cx, cy - 16, 'bold 12px monospace', SUM, 'center', safeRight - 60);
        }

        outlineText(ctx, `2 x ${mu.toFixed(2)} x cos(${half.toFixed(2)}°) = ${total.toFixed(2)} D`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, cancels ? 'the arrows cancel: nonpolar' : 'the arrows add: polar',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', cancels ? EMERALD : SUM, 'center', safeRight - 30);

        fitText(ctx, `${total.toFixed(2)} D: ${cancels ? 'nonpolar' : 'polar'}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Add the arrows, not the bonds', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, total / (2 * mu))),
                caption: 'Molecule Dipole',
                low: '0',
                high: 'twice the bond dipole',
                stops: ['#ecfdf5', '#6ee7b7', SUM] as [string, string, string],
            },
            note: `Two bond dipoles of ${mu.toFixed(2)} D at ${angle.toFixed(1)}° give 2 x ${mu.toFixed(2)} x cos(${half.toFixed(2)}°) = ${total.toFixed(2)} D. ${cancels ? 'The arrows cancel, so the molecule is nonpolar however polar its bonds are.' : 'The arrows add, so the molecule is polar.'}`,
        };
    };

    return (
        <LabCanvas
            title="Polar Bonds, Nonpolar Molecule"
            readout={({ raw }) => `Two bonds at ${angleOf(raw).toFixed(1)}°`}
            controlLabel="Bond Angle"
            controlKey="bondAngle"
            controlMin={60}
            controlMax={180}
            controlInitial={104.5}
            controlDisplay={raw => `${angleOf(raw).toFixed(1)}°`}
            control2={{
                label: 'Bond Dipole',
                key: 'bondDipole',
                min: 0.2,
                max: 2,
                initial: 1.5,
                display: raw => `${muOf(raw).toFixed(2)} D`,
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Polar Bonds, Nonpolar Molecule"
            completeNote="2 x bond dipole x cos(A/2)!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
