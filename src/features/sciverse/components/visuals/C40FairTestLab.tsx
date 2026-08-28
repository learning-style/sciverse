import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const VARIABLES = ['Additive', 'Temperature', 'Stirring', 'Fresh batch'];

/** Change one variable and you can name the cause; change several and the result is confounded. */
export const C40FairTestLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw }: LabScene) => {
        const changed = raw;
        const topY = 110;

        // One row per possible variable, marked changed or held fixed.
        VARIABLES.forEach((name, i) => {
            const y = topY + i * 34;
            const isChanged = i < changed;
            ctx.fillStyle = isChanged ? '#fca5a5' : '#bbf7d0';
            ctx.beginPath();
            ctx.roundRect(50, y, safeRight - 100, 28, 6);
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            outlineText(ctx, name, 120, y + 19, 'bold 14px monospace');
            outlineText(ctx, isChanged ? 'CHANGED' : 'held fixed', safeRight - 130, y + 19, 'bold 13px monospace',
                isChanged ? '#b91c1c' : '#15803d');
        });

        // Two beakers: control vs test. Both react faster, but for how many reasons?
        const beakerY = topY + VARIABLES.length * 34 + 26;
        const drawBeaker = (x: number, label: string, bubbles: number, color: string) => {
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(x, beakerY, 58, 62);
            ctx.fillStyle = color;
            ctx.fillRect(x, beakerY + 24, 58, 38);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, beakerY, 58, 62);
            for (let i = 0; i < bubbles; i++) {
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.beginPath();
                ctx.arc(x + 10 + (i * 13) % 44, beakerY + 32 + (i * 9) % 24, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            outlineText(ctx, label, x + 29, beakerY + 80, 'bold 13px monospace');
        };

        drawBeaker(safeRight * 0.3 - 29, 'CONTROL', 2, '#93c5fd');
        drawBeaker(safeRight * 0.66 - 29, 'TEST', 2 + changed * 3, '#86efac');

        // Confidence collapses as soon as more than one variable moves.
        const confidence = changed === 0 ? 0 : changed === 1 ? 1 : 1 / (changed * changed);

        const verdict = changed === 0
            ? 'Nothing changed -- there is no experiment yet.'
            : changed === 1
                ? 'FAIR TEST -- any difference must be caused by the additive.'
                : `CONFOUNDED -- ${changed} things changed, so the cause is unknown.`;
        fitText(ctx, verdict, safeRight / 2, 88, safeRight - 24, 15, changed === 1 ? '#15803d' : changed === 0 ? '#64748b' : '#b91c1c');


        const msg = changed === 0
            ? 'Change exactly one thing to start a fair test.'
            : changed === 1
                ? 'Perfect. One variable changed, everything else held fixed.'
                : 'The reaction sped up -- but was it the additive, or one of the others?';
        return { meter: { fraction: confidence, caption: 'Can You Name the Cause?', low: 'No idea', high: 'Certain' }, note: msg };
    };

    return (
        <LabCanvas
            title="The Fair Test"
            readout={({ raw }) => `${raw} variable${raw === 1 ? '' : 's'} changed at once`}
            controlLabel="Variables Changed"
            controlKey="variablesChanged"
            controlMin={0}
            controlMax={4}
            controlInitial={1}
            controlDisplay={raw => `${raw}`}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="C40 Complete!"
            completeSubtitle="How Do We Use Data to Know What Is True?"
            completeNote="Change one thing, keep everything else the same!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
