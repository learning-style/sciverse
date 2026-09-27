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
// the same material as a solid rod of radius r, rolled into a tube of this wall
const outerOf = (rod: number, wall: number): number => (rod * rod) / (2 * wall) + wall / 2;

export const L2B17HollowLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const wall = wallOf(raw);
        const rod = rodOf(raw2);
        const outer = outerOf(rod, wall);
        const reach = outer / rod;
        const material = Math.PI * rod * rod;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const labelTail = Math.max(16, Math.min(26, usable * 0.13));
        const band = usable - labelTail;
        // both shapes are drawn to one scale, set by the wider of the two
        const half = Math.min(band / 2 - 4, (safeRight / 2 - 40) / 2);
        const scale = Math.max(0.4, half / Math.max(outer, rod));
        const cy = artTop + Math.max(0, (usable - (band + labelTail)) / 2) + band / 2;
        const leftX = safeRight * 0.28;
        const rightX = safeRight * 0.72;

        // the solid rod
        ctx.fillStyle = SOLID;
        ctx.beginPath();
        ctx.arc(leftX, cy, Math.max(3, rod * scale), 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, 'solid rod', leftX, Math.min(cy + half + 16, artBottom),
            'bold 11px monospace', SOLID, 'center', safeRight * 0.4);

        // the tube: same material, pushed outwards into a ring
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

        outlineText(ctx, 'R = ' + rod + '² / (2 x ' + wall + ') + ' + wall
            + '/2 = ' + outer.toFixed(1) + ' mm',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, reach.toFixed(2) + ' times the solid rod, on the same '
            + material.toFixed(0) + ' mm² of material',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, 'the tube reaches ' + outer.toFixed(1) + ' mm', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Move the material out, and it works harder', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (reach - 1) / 4)),
                caption: 'How Far the Material Reaches',
                low: 'same as the rod',
                high: '5 times',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: 'A solid rod of radius ' + rod + ' mm holds ' + material.toFixed(0)
                + ' mm² of material. Rolled into a tube with a ' + wall
                + ' mm wall, that same material reaches out to ' + outer.toFixed(1)
                + ' mm, which is ' + reach.toFixed(2)
                + ' times as far. Nothing was added: a thinner wall simply stands further out.',
        };
    };

    return (
        <LabCanvas
            title="Why Bones Are Hollow"
            readout={({ raw }) => 'A wall of ' + wallOf(raw) + ' mm'}
            controlLabel="Wall Thickness"
            controlKey="boneWall"
            controlMin={1}
            controlMax={6}
            controlInitial={2}
            controlDisplay={raw => wallOf(raw) + ' mm'}
            control2={{
                label: 'Material Amount',
                key: 'boneMaterial',
                min: 5,
                max: 15,
                initial: 10,
                display: raw => rodOf(raw) + ' mm',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Why Bones Are Hollow"
            completeNote="Where the material sits, not how much!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
