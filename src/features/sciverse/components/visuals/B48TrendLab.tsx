import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Twenty summers of butterfly counts from one park.
 *  Chosen so the early years genuinely mislead: years 1-2 look like a crash,
 *  year 3 looks like a full recovery, and only a decade of counting shows the
 *  slow fall that is actually happening. */
const COUNTS = [100, 62, 108, 71, 95, 66, 88, 60, 84, 55, 79, 52, 74, 48, 70, 44, 65, 40, 61, 36];
const MAX_COUNT = 120;

export const B48TrendLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const years = Math.round(raw);
        const shown = COUNTS.slice(0, years);

        const plotX = 62;
        const plotTop = stageTop + 40;
        const plotBottom = stageBottom - 46;
        const plotW = safeRight - plotX - 34;
        const plotH = Math.max(120, plotBottom - plotTop);

        const xOf = (yearIndex: number): number =>
            plotX + (plotW * (yearIndex + 0.5)) / COUNTS.length;
        const yOf = (count: number): number => plotBottom - (count / MAX_COUNT) * plotH;

        // Grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let g = 0; g <= 4; g++) {
            const gy = plotBottom - (plotH * g) / 4;
            ctx.beginPath();
            ctx.moveTo(plotX, gy);
            ctx.lineTo(plotX + plotW, gy);
            ctx.stroke();
            ctx.fillStyle = '#94a3b8';
            ctx.font = '11px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(String((MAX_COUNT / 4) * g), plotX - 8, gy + 4);
        }

        // Axes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plotX, plotTop);
        ctx.lineTo(plotX, plotBottom);
        ctx.lineTo(plotX + plotW, plotBottom);
        ctx.stroke();

        // The trend, drawn only once there are enough years to mean anything.
        // Before that a line here would be exactly the mistake the lesson warns about.
        if (years >= 6) {
            const head = shown.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
            const tail = shown.slice(-3).reduce((a, b) => a + b, 0) / 3;
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 3;
            ctx.setLineDash([7, 6]);
            ctx.beginPath();
            ctx.moveTo(xOf(1), yOf(head));
            ctx.lineTo(xOf(years - 2), yOf(tail));
            ctx.stroke();
            ctx.setLineDash([]);
            const midX = (xOf(1) + xOf(years - 2)) / 2;
            const midY = (yOf(head) + yOf(tail)) / 2;
            outlineText(ctx, 'trend', midX, midY - 16, 'bold 14px monospace', '#475569');
        }

        // The counts themselves
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2;
        ctx.beginPath();
        shown.forEach((c, i) => {
            const px = xOf(i);
            const py = yOf(c);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        shown.forEach((c, i) => {
            ctx.fillStyle = '#7c3aed';
            ctx.beginPath();
            ctx.arc(xOf(i), yOf(c), 4.5, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = '#475569';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('year 1', xOf(0), plotBottom + 18);
        if (years > 1) ctx.fillText(`year ${years}`, xOf(years - 1), plotBottom + 18);
        outlineText(ctx, 'each dot is one summer of counting',
            plotX + plotW / 2, stageBottom - 16, 'bold 13px monospace');

        fitText(ctx, `${years} summer${years === 1 ? '' : 's'} of counting butterflies`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The park is the same every year -- only the counting adds up',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = years <= 2
            ? 'Two dots do not make a line. This could be a wobble.'
            : years <= 5
                ? 'Still jumping up and down. A real fall cannot be told from wobble yet.'
                : years <= 9
                    ? 'A fall is starting to show through the wobble.'
                    : 'Many summers of counting, and the real fall is now clear.';
        return {
            meter: {
                fraction: Math.min(1, years / 14),
                caption: 'How Much You Can Trust the Trend',
                low: 'Not at all',
                high: 'A great deal',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Counting What You Cannot See"
            readout={({ raw }) => `${Math.round(raw)} year${Math.round(raw) === 1 ? '' : 's'} of counting the same way`}
            controlLabel="Years of Watching"
            controlKey="yearsWatching"
            controlMin={1}
            controlMax={20}
            controlInitial={2}
            controlDisplay={raw => `${Math.round(raw)} years`}
            accent="rose"
            sky={['#faf5ff', '#f8fafc']}
            completeTitle="B48 Complete!"
            completeSubtitle="How Do We Keep Track of Wildlife?"
            completeNote="Many years, counted the same way, reveal the truth!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
