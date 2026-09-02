import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Where the bicep attaches to the forearm, in centimetres from the elbow.
 *  Fixed, because you cannot rearrange your own skeleton. */
const MUSCLE_CM = 4;

export const L2B1LeverLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const load = Math.round(raw);
        const handCm = Math.max(5, Math.round(raw2));
        const muscleForce = (load * handCm) / MUSCLE_CM;

        const elbowX = 74;
        const armY = (stageTop + stageBottom) / 2 + 10;
        const pxPerCm = (safeRight - elbowX - 70) / 40;

        // Upper arm, then the forearm running out to the hand
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(elbowX, armY);
        ctx.lineTo(elbowX, armY - 92);
        ctx.stroke();
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(elbowX, armY);
        ctx.lineTo(elbowX + handCm * pxPerCm, armY);
        ctx.stroke();

        // The elbow is the pivot everything turns about
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(elbowX, armY, 9, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'elbow (pivot)', elbowX, armY + 30, 'bold 12px monospace', '#0f172a', 'center', 150);

        // The bicep pulls up, very close in
        const mx = elbowX + MUSCLE_CM * pxPerCm;
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(mx, armY - 8);
        ctx.lineTo(mx, armY - 74);
        ctx.stroke();
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.moveTo(mx, armY - 84);
        ctx.lineTo(mx - 9, armY - 68);
        ctx.lineTo(mx + 9, armY - 68);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `bicep ${Math.round(muscleForce)} N`, mx + 6, armY - 92,
            'bold 13px monospace', '#5b21b6', 'left', safeRight - mx - 16);
        outlineText(ctx, `${MUSCLE_CM} cm`, mx, armY + 18, 'bold 11px monospace', '#5b21b6', 'center', 60);

        // The load pulls down, far out
        const hx = elbowX + handCm * pxPerCm;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(hx, armY + 8);
        ctx.lineTo(hx, armY + 62);
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(hx, armY + 72);
        ctx.lineTo(hx - 9, armY + 56);
        ctx.lineTo(hx + 9, armY + 56);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `load ${load} N`, hx, armY + 88, 'bold 13px monospace', '#0f172a', 'center', 150);
        outlineText(ctx, `${handCm} cm from the elbow`, hx, armY - 22, 'bold 11px monospace', '#0f172a', 'center', 190);

        outlineText(ctx, `${load} x ${handCm} / ${MUSCLE_CM} = ${Math.round(muscleForce)} N`,
            safeRight / 2, stageBottom - 18, 'bold 15px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `Your bicep pulls with ${(muscleForce / Math.max(1, load)).toFixed(1)} times the load`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The moments must match: force x distance on each side of the pivot',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = handCm <= 12
            ? 'Held close to the elbow, so the load has a short lever and the bicep has an easy job.'
            : handCm >= 30
                ? 'Held right out. The load acts a long way from the pivot, so the muscle force is enormous.'
                : 'Move the hand further out and watch the muscle force climb, though the load never changes.';
        return {
            meter: {
                fraction: Math.min(1, muscleForce / 1000),
                caption: 'How Hard the Bicep Pulls',
                low: 'Not very hard',
                high: 'Very hard',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Lever in Your Arm"
            readout={({ raw }) => `Holding a load of ${Math.round(raw)} newtons`}
            controlLabel="Load"
            controlKey="armLoad"
            controlMin={10}
            controlMax={100}
            controlInitial={50}
            controlDisplay={raw => `${Math.round(raw)} N in the hand`}
            control2={{
                label: 'Hand Distance',
                key: 'handDistance',
                min: 5,
                max: 40,
                initial: 32,
                display: raw => `${Math.max(5, Math.round(raw))} cm from the elbow`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Lever in Your Arm"
            completeNote="Moments match, not forces!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
