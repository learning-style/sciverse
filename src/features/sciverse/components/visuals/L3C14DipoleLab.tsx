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
        // drawn pointing down the page so the sum runs up the line of symmetry.
        //
        // The stage runs from stageTop (124) to stageBottom, and this scene's own
        // two text lines sit above stageTop at y 94 and 118. So the artwork starts
        // clear of that band and is scaled to the height actually available,
        // rather than pinned near the top at a fixed size with the stage left
        // empty below it.
        const cx = safeRight / 2;
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const avail = Math.max(110, artBottom - artTop);
        // Room above the centre atom for the resultant arrow and its label
        const sumRoom = Math.max(44, Math.min(130, avail * 0.4));
        const tilt = (90 - half) * (Math.PI / 180);
        // The bonds must fit the space below the centre atom at the widest opening
        // (0.87 is sin 60°, the steepest this dial reaches) and must not run wider
        // than the stage when the molecule goes linear
        const len = Math.max(30, Math.min(120, (avail - sumRoom - 38) / 0.87, safeRight * 0.5 - 48));
        // Centre the whole composition in the stage rather than hanging it from the
        // top and leaving the slack below. Measured at the widest opening so the
        // molecule holds its place instead of drifting as the dial moves.
        const blockH = sumRoom + 0.87 * len + 38;
        const cy = artTop + Math.max(0, (avail - blockH) / 2) + sumRoom;
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
        const ends: [number, number][] = [
            [cx - Math.cos(tilt) * len, cy + Math.sin(tilt) * len],
            [cx + Math.cos(tilt) * len, cy + Math.sin(tilt) * len],
        ];
        const lowest = cy + Math.sin(tilt) * len + 16;

        // The line of symmetry, which is where halving the angle comes from
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - sumRoom + 6);
        ctx.lineTo(cx, lowest + 6);
        ctx.stroke();
        ctx.restore();
        outlineText(ctx, 'line of symmetry', cx + 8, cy - sumRoom + 16, '10px monospace', '#94a3b8', 'left', 130);

        for (const end of ends) {
            arrow([cx, cy], end, EMERALD, 3);
            ctx.beginPath();
            ctx.arc(end[0], end[1], 14, 0, Math.PI * 2);
            ctx.fillStyle = '#d1fae5';
            ctx.fill();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, 17, 0, Math.PI * 2);
        ctx.fillStyle = '#f1f5f9';
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        // Sits under the molecule it describes, never below the art area
        outlineText(ctx, `bond angle ${angle.toFixed(1)}°`, cx, Math.min(lowest + 22, artBottom),
            'bold 12px monospace', '#475569', 'center', safeRight - 60);

        // The vector sum, up the line of symmetry
        if (!cancels) {
            const sumLen = Math.max(14, (total / 4) * (sumRoom - 26));
            arrow([cx, cy], [cx, cy - sumLen], SUM, 4);
            outlineText(ctx, 'vector sum', cx - 12, cy - sumLen - 10, '11px monospace', SUM, 'right', 120);
        } else {
            outlineText(ctx, 'the arrows cancel', cx, cy - sumRoom * 0.5, 'bold 12px monospace', SUM, 'center', safeRight - 60);
        }

        outlineText(ctx, `2 x ${mu.toFixed(2)} x cos(${half.toFixed(2)}°) = ${total.toFixed(2)} D`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, cancels ? 'the arrows cancel: nonpolar' : 'the arrows add: polar',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', cancels ? EMERALD : SUM, 'center', safeRight - 30);

        fitText(ctx, `molecule dipole ${total.toFixed(2)} D: ${cancels ? 'nonpolar' : 'polar'}`, safeRight / 2, 94, safeRight - 24, 16);
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
