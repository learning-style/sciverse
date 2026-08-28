import { LabCanvas, outlineText, fitText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Punnett outcomes across many children: the 1-in-4 recessive ratio only emerges with numbers. */
export const B41InheritanceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const kids = raw;
        // Each child independently draws one copy from each carrier parent.
        let blue = 0;
        for (let i = 0; i < kids; i++) {
            const a = Math.sin(i * 7.13 + 1.7) * 43758.5453;
            const b = Math.sin(i * 3.71 + 9.2) * 24634.6345;
            if ((a - Math.floor(a)) < 0.5 && (b - Math.floor(b)) < 0.5) blue++;
        }
        const brown = kids - blue;
        const share = kids > 0 ? blue / kids : 0;

        const perRow = 20;
        const shown = Math.min(kids, 100);
        const gridTop = stageTop + 52;
        const rowH = Math.min(26, Math.max(14, (stageBottom - gridTop - 56) / Math.max(1, Math.ceil(shown / perRow))));
        for (let i = 0; i < shown; i++) {
            const cx = 52 + (i % perRow) * ((safeRight - 104) / perRow);
            const cy = gridTop + Math.floor(i / perRow) * rowH;
            const isBlue = i < blue;
            ctx.fillStyle = isBlue ? '#2563eb' : '#92400e';
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(5, rowH * 0.28), 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        if (kids > shown) {
            outlineText(ctx, `showing the first ${shown} of ${kids}`,
                safeRight / 2, stageBottom - 20, 'bold 13px monospace');
        }

        fitText(ctx, `${brown} brown-eyed   |   ${blue} blue-eyed`, safeRight / 2, 92, safeRight - 24, 16);
        fitText(ctx, `That is ${Math.round(share * 100)}% blue -- the expected share is 25%`, safeRight / 2, 116, safeRight - 24, 14);

        const closeness = Math.max(0, 1 - Math.abs(share - 0.25) / 0.25);
        const msg = kids < 8
            ? 'Only a few children -- the ratio can be anything at all.'
            : kids < 50
                ? 'The share is drifting toward one in four, but still wobbles.'
                : 'With many children the 1-in-4 pattern is clear.';
        return { meter: { fraction: closeness, caption: 'How Close to the Expected 1 in 4', low: 'Far off', high: 'Right on it' }, note: msg };
    };

    return (
        <LabCanvas
            title="Chance and Inheritance"
            readout={({ raw }) => `Following ${raw} child${raw === 1 ? '' : 'ren'}`}
            controlLabel="Number of Children"
            controlKey="childCount"
            controlMin={1}
            controlMax={200}
            controlInitial={4}
            controlDisplay={raw => `${raw} child${raw === 1 ? '' : 'ren'}`}
            accent="rose"
            sky={['#fdf2f8', '#f8fafc']}
            completeTitle="B41 Complete!"
            completeSubtitle="How Do Patterns and Probability Guide Decisions?"
            completeNote="Each child is an independent roll of the dice!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
