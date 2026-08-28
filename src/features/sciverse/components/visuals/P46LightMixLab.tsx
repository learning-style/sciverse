import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Three coloured lights on a white wall: overlaps add to yellow, magenta, cyan and white. */
export const P46LightMixLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const on = raw;
        const cx = safeRight / 2;
        const cy = (stageTop + stageBottom) / 2 + 10;
        const r = Math.min(safeRight * 0.19, (stageBottom - stageTop) * 0.30);

        // White wall the lights fall on.
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(cx - r * 2.3, cy - r * 2.0, r * 4.6, r * 3.9);

        // Additive blending: overlapping light sums up.
        ctx.globalCompositeOperation = 'lighter';
        const lights = [
            { c: 'rgb(220,40,40)',  dx: 0,           dy: -r * 0.62, name: 'red' },
            { c: 'rgb(40,200,60)',  dx: -r * 0.58,   dy: r * 0.42,  name: 'green' },
            { c: 'rgb(50,80,230)',  dx: r * 0.58,    dy: r * 0.42,  name: 'blue' },
        ];
        for (let i = 0; i < on; i++) {
            ctx.fillStyle = lights[i].c;
            ctx.beginPath();
            ctx.arc(cx + lights[i].dx, cy + lights[i].dy, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';

        // Label each lamp that is on.
        for (let i = 0; i < on; i++) {
            outlineText(ctx, lights[i].name, cx + lights[i].dx * 1.85, cy + lights[i].dy * 1.85 + 4,
                'bold 15px monospace');
        }

        const result = on === 1 ? 'Just red light on the wall.'
            : on === 2 ? 'Red and green overlap -- the overlap is yellow.'
                : 'All three overlap -- the middle is white.';
        fitText(ctx, result, safeRight / 2, 96, safeRight - 24, 15);
        fitText(ctx, 'Where the lights overlap, the light adds together',
            safeRight / 2, 118, safeRight - 24, 13);

        const msg = on === 1
            ? 'One light. Switch on a second and watch the overlap.'
            : on === 2
                ? 'Red plus green makes yellow -- paint would have made brown.'
                : 'Red plus green plus blue makes white. Every screen works this way.';
        return { meter: { fraction: on / 3, caption: 'Colours Your Screen Can Make', low: 'Only red', high: 'All of them' }, note: msg };
    };

    return (
        <LabCanvas
            title="Mixing Light"
            readout={({ raw }) => `${raw} light${raw === 1 ? '' : 's'} switched on`}
            controlLabel="Lights Switched On"
            controlKey="lightsOn"
            controlMin={1}
            controlMax={3}
            controlInitial={1}
            controlDisplay={raw => `${raw} of 3`}
            accent="indigo"
            sky={['#f8fafc', '#f1f5f9']}
            completeTitle="P46 Complete!"
            completeSubtitle="How Do Color and Perception Work in Design?"
            completeNote="Light adds, paint takes away!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
