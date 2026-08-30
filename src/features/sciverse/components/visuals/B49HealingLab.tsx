import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** The five steps life takes back to bare mine waste, in the order the lesson
 *  gives them. Each stage starts at the year the one before it has built
 *  enough soil for. */
const STAGES: { from: number; name: string; icon: string; per: number }[] = [
    { from: 0, name: 'bare waste rock', icon: '', per: 0 },
    { from: 3, name: 'moss and lichen', icon: '🟢', per: 14 },
    { from: 9, name: 'grasses', icon: '🌱', per: 11 },
    { from: 19, name: 'shrubs', icon: '🌿', per: 8 },
    { from: 33, name: 'young trees', icon: '🌳', per: 6 },
    { from: 49, name: 'woodland', icon: '🌲', per: 7 },
];

export const B49HealingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageBottom }: LabScene) => {
        const years = Math.round(raw);
        let stage = STAGES[0];
        STAGES.forEach(s => { if (years >= s.from) stage = s; });

        const groundY = stageBottom - 92;
        const floor = stageBottom - 30;

        // The crushed waste rock the mine left behind
        ctx.fillStyle = '#a8a29e';
        ctx.fillRect(0, groundY, safeRight, floor - groundY);

        // Soil built on top of it. Fast at first, then slower, because each
        // step has to grow before it can add its own remains.
        const soilH = Math.min(30, Math.sqrt(years) * 4.4);
        if (soilH > 0.5) {
            ctx.fillStyle = '#4a3728';
            ctx.fillRect(0, groundY - soilH, safeRight, soilH);
        }
        ctx.strokeStyle = '#57534e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(safeRight, groundY);
        ctx.stroke();

        // Whatever is growing at this point
        const top = groundY - soilH;
        if (stage.per > 0) {
            const size = stage.name === 'woodland' ? 40 : stage.name === 'young trees' ? 30 : 20;
            for (let i = 0; i < stage.per; i++) {
                const px = (safeRight * (i + 0.5)) / stage.per;
                ctx.font = `${size}px serif`;
                ctx.textAlign = 'center';
                ctx.fillText(stage.icon, px, top - 2);
            }
        }

        outlineText(ctx, `soil: ${soilH < 1 ? 'none at all' : soilH < 12 ? 'a thin skin' : soilH < 24 ? 'deep enough for shrubs' : 'deep enough for trees'}`,
            safeRight / 2, floor + 18, 'bold 13px monospace');
        outlineText(ctx, 'crushed waste rock', safeRight / 2, floor - 8, 'bold 12px monospace', '#3f3f46');

        fitText(ctx, `${years} year${years === 1 ? '' : 's'} since the machines left: ${stage.name}`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Each step builds the soil that the next step needs',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = years < 3
            ? 'Bare rock. Nothing can root here, and a planted tree would die.'
            : years < 9
                ? 'Moss and lichen cling to the rock and leave the first dark skin.'
                : years < 19
                    ? 'Grasses now. Their roots crack the rock finer every year.'
                    : years < 33
                        ? 'Enough soil to hold water through a dry week, so shrubs can live.'
                        : years < 49
                            ? 'Deep enough at last for young trees and their deep roots.'
                            : 'Woodland, decades after the machines left.';
        return {
            meter: { fraction: Math.min(1, soilH / 30), caption: 'How Deep the Soil Is', low: 'None at all', high: 'Deep enough for trees' },
            note,
        };
    };

    return (
        <LabCanvas
            title="Healing the Land"
            readout={({ raw }) => `${Math.round(raw)} year${Math.round(raw) === 1 ? '' : 's'} since the mine was left`}
            controlLabel="Years of Healing"
            controlKey="yearsHealing"
            controlMin={0}
            controlMax={60}
            controlInitial={0}
            controlDisplay={raw => `${Math.round(raw)} years`}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="B49 Complete!"
            completeSubtitle="How Do We Use Earth's Resources Responsibly?"
            completeNote="Moss first, woodland decades later!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
