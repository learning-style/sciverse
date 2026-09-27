import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const ROSE = '#be123c';
const SOLID = '#9f1239';

const wallOf = (dial: number): number => Math.max(1, Math.min(6, Math.round(dial)));
const rodOf = (dial: number): number => Math.max(5, Math.min(15, Math.round(dial)));
const outerOf = (rod: number, wall: number): number => (rod * rod) / (2 * wall) + wall / 2;
const iOfRod = (rod: number): number => (Math.PI * Math.pow(rod, 4)) / 4;
const iOfTube = (outer: number, wall: number): number =>
    (Math.PI * (Math.pow(outer, 4) - Math.pow(outer - wall, 4))) / 4;

export const L3B17StiffnessLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const wall = wallOf(raw);
        const rod = rodOf(raw2);
        const outer = outerOf(rod, wall);
        const reach = outer / rod;
        const iRod = iOfRod(rod);
        const iTube = iOfTube(outer, wall);
        const gain = iTube / iRod;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const labelTail = Math.max(16, Math.min(26, usable * 0.13));
        const band = usable - labelTail;
        const half = Math.min(band / 2 - 4, (safeRight / 2 - 40) / 2);
        const scale = Math.max(0.3, half / Math.max(outer, rod));
        const cy = artTop + band / 2;
        const leftX = safeRight * 0.28;
        const rightX = safeRight * 0.72;

        ctx.fillStyle = SOLID;
        ctx.beginPath();
        ctx.arc(leftX, cy, Math.max(3, rod * scale), 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'solid rod', leftX, Math.min(cy + half + 16, artBottom),
            'bold 11px monospace', SOLID, 'center', safeRight * 0.4);

        const oR = Math.max(4, outer * scale);
        const iR = Math.max(1, (outer - wall) * scale);
        ctx.fillStyle = ROSE;
        ctx.beginPath();
        ctx.arc(rightX, cy, oR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff1f2';
        ctx.beginPath();
        ctx.arc(rightX, cy, iR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#881337';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rightX, cy, oR, 0, Math.PI * 2);
        ctx.stroke();
        outlineText(ctx, 'tube', rightX, Math.min(cy + half + 16, artBottom),
            'bold 11px monospace', ROSE, 'center', safeRight * 0.4);

        outlineText(ctx, 'I = π (' + outer.toFixed(1) + '⁴ - '
            + (outer - wall).toFixed(1) + '⁴) / 4 = ' + iTube.toFixed(0) + ' mm⁴',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the solid rod is ' + iRod.toFixed(0) + ' mm⁴, and the reach is only '
            + reach.toFixed(2) + ' times',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, gain.toFixed(1) + ' times stiffer', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Distance to the fourth power', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (gain - 1) / 49)),
                caption: 'Stiffness Gain',
                low: 'same as the rod',
                high: '50 times',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: 'The same material as a solid rod of radius ' + rod
                + ' mm, rolled into a ' + wall + ' mm wall, reaches '
                + reach.toFixed(2) + ' times as far -- and is ' + gain.toFixed(1)
                + ' times stiffer, because distance counts to the fourth power. The rod is '
                + iRod.toFixed(0) + ' mm⁴ and the tube is ' + iTube.toFixed(0)
                + ' mm⁴. For a thin wall the gain is close to 2 times the reach squared.',
        };
    };

    return (
        <LabCanvas
            title="The Fourth Power"
            readout={({ raw }) => 'A wall of ' + wallOf(raw) + ' mm'}
            controlLabel="Wall Thickness"
            controlKey="stiffWall"
            controlMin={1}
            controlMax={6}
            controlInitial={2}
            controlDisplay={raw => wallOf(raw) + ' mm'}
            control2={{
                label: 'Material Amount',
                key: 'stiffMaterial',
                min: 5,
                max: 15,
                initial: 10,
                display: raw => rodOf(raw) + ' mm',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Fourth Power"
            completeNote="Distance to the fourth power!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
