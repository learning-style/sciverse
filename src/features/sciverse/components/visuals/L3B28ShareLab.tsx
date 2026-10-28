import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One bar: the whole circulation. Its LENGTH is the heart's output and its SEGMENTS are
// the organs' shares, so the muscle's own segment is the litres actually reaching it and
// both factors are visible at once. A tick marks where the muscle would end if its share
// had not moved, so the part bought by redistribution is the gap between the tick and
// the segment's end -- drawn, not asserted.
//
// The brain's segment is a FLOOR of 0.75 L/min rather than a share. Push the muscle's
// share up while the output is low and there is no longer enough left above it: the
// brain's slice goes red, which is the lesson's failure state and a reachable corner of
// the dials rather than a sentence.
const MUSCLE = '#be123c';
const GUT = '#b45309';
const KIDNEY = '#7c3aed';
const BRAIN = '#0369a1';
const SKIN = '#f59e0b';
const HEART = '#15803d';
const DANGER = '#dc2626';
const INK = '#0f172a';
const MUTED = '#475569';

const BRAIN_FLOOR = 0.75;     // L/min, at rest and at maximum alike
const REST_OUT = 5.0;
const REST_SHARE = 20;
const MAX_OUT = 24;

const outOf = (dial: number): number => Math.max(4, Math.min(MAX_OUT, Math.round(dial * 2) / 2));
const shareOf = (dial: number): number => Math.max(20, Math.min(90, Math.round(dial)));

export const L3B28ShareLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const out = outOf(raw);
        const share = shareOf(raw2);
        const muscle = out * share / 100;
        const others = out - muscle;
        const brain = Math.min(BRAIN_FLOOR, others);
        const heartBed = Math.min(0.05 * out, others - brain);
        const spare = Math.max(0, others - brain - heartBed);
        const gut = spare * 1.4 / 3.0;
        const kidney = spare * 1.1 / 3.0;
        const skin = spare * 0.5 / 3.0;
        const starved = others < BRAIN_FLOOR - 1e-9;
        const restMuscle = REST_OUT * REST_SHARE / 100;
        const held = out * REST_SHARE / 100;      // the muscle, had its share not moved

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = Math.max(6, artBottom - artTop);
        const left = 24;
        const fullW = Math.max(90, safeRight - 48);
        const ROW = 14;
        const rows = Math.max(0, Math.min(2, Math.floor((usable - 30) / ROW)));
        const barH = Math.max(6, Math.min(52, usable - rows * ROW - 10));
        const top = artTop + Math.max(0, (usable - (barH + rows * ROW)) / 2);

        // the bar's length IS the output, so raising it visibly grows the whole thing
        const barW = fullW * (out / MAX_OUT);
        const beds: [number, string][] = [
            [muscle, MUSCLE], [gut, GUT], [kidney, KIDNEY],
            [brain, starved ? DANGER : BRAIN], [heartBed, HEART], [skin, SKIN],
        ];
        let x = left;
        for (const [litres, colour] of beds) {
            const w = barW * (litres / out);
            ctx.fillStyle = colour;
            ctx.fillRect(x, top, w, barH);
            x += w;
        }
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(left, top, barW, barH);
        // the faint remainder of the scale, so the bar is seen to be growing
        ctx.strokeStyle = 'rgba(71,85,105,0.3)';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.strokeRect(left, top, fullW, barH);
        ctx.setLineDash([]);
        // where the muscle would have ended with its share unmoved
        const tickX = left + barW * (held / out);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tickX, top - 4);
        ctx.lineTo(tickX, top + barH + 4);
        ctx.stroke();
        if (starved && barH >= 14) {
            ctx.strokeStyle = DANGER;
            ctx.lineWidth = 2 + Math.abs(Math.sin(t * 3));
            ctx.strokeRect(left, top, barW, barH);
        }

        const rowY = (i: number) => top + barH + 12 + i * ROW;
        if (rows >= 1) {
            outlineText(ctx, 'muscle ' + muscle.toFixed(1) + ' of ' + out.toFixed(1) + ' L/min',
                left + fullW / 2, rowY(0), 'bold 11px monospace', MUSCLE, 'center', fullW);
        }
        if (rows >= 2) {
            // left- and right-aligned on one row, so the bound is the whole width and
            // the pair only has to clear each other: 26 characters of the 28 that fit
            outlineText(ctx, 'brain ' + brain.toFixed(2), left, rowY(1),
                'bold 11px monospace', starved ? DANGER : BRAIN, 'left', fullW);
            outlineText(ctx, 'share held: ' + held.toFixed(1), left + fullW, rowY(1),
                'bold 11px monospace', MUTED, 'right', fullW);
        }

        outlineText(ctx, out.toFixed(1) + ' x ' + share + '% = ' + muscle.toFixed(1) + ' L/min',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, 'rest was ' + REST_OUT.toFixed(1) + ' x ' + REST_SHARE + '% = '
            + restMuscle.toFixed(1), safeRight / 2, stageBottom - 14,
            'bold 12px monospace', MUTED, 'center', safeRight - 30);

        fitText(ctx, (muscle / restMuscle).toFixed(1) + 'x the resting flow',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, starved ? 'The brain is starved' : 'The brain never pays',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, muscle / (MAX_OUT * 0.9))),
                caption: 'Blood Reaching the Muscle',
                low: 'resting: 1 litre',
                high: 'all the heart moves',
                stops: ['#fecdd3', '#fda4af', MUSCLE] as [string, string, string],
            },
            note: starved
                ? 'The muscle is taking ' + share + '% of ' + out.toFixed(1) + ' L/min, leaving only '
                  + others.toFixed(2) + ' for everything else -- less than the 0.75 the brain must have. '
                  + 'This is the body that ends up on the floor.'
                : 'The heart sends ' + out.toFixed(1) + ' L/min and the muscle takes ' + share + '% of it, so '
                  + muscle.toFixed(1) + ' reaches it against ' + restMuscle.toFixed(1)
                  + ' at rest. With its share unmoved it would have had ' + held.toFixed(1) + '.',
        };
    };

    return (
        <LabCanvas
            title="The Litres Come From Somewhere"
            readout={({ raw }) => outOf(raw).toFixed(1) + ' L/min from the heart'}
            controlLabel="Heart Output"
            controlKey="heartOut"
            controlMin={4}
            controlMax={MAX_OUT}
            controlInitial={5}
            controlDisplay={raw => outOf(raw).toFixed(1) + ' L/min'}
            control2={{
                label: "The Muscle's Share",
                key: 'muscleShare',
                min: 20,
                max: 90,
                initial: 20,
                display: raw => shareOf(raw) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="Nothing was created. It was taken!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
