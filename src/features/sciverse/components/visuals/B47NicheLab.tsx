import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Two bird species in one tree: as their feeding zones overlap, one is pushed out. */
export const B47NicheLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const overlap = v;
        const bothSurvive = overlap < 0.6;

        const cx = safeRight / 2;
        const groundY = stageBottom - 46;
        const treeTop = stageTop + 40;
        const treeH = groundY - treeTop;

        // Trunk and canopy
        ctx.fillStyle = '#78350f';
        ctx.fillRect(cx - 14, treeTop + treeH * 0.35, 28, treeH * 0.65);
        ctx.fillStyle = '#bbf7d0';
        ctx.beginPath();
        ctx.ellipse(cx, treeTop + treeH * 0.3, Math.min(safeRight * 0.3, 190), treeH * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Two feeding zones, sliding together as overlap rises.
        const spread = (1 - overlap) * Math.min(safeRight * 0.2, 130);
        const zoneR = Math.min(safeRight * 0.16, 100);
        ctx.globalAlpha = 0.32;
        ctx.fillStyle = '#2563eb';
        ctx.beginPath(); ctx.arc(cx - spread, treeTop + treeH * 0.3, zoneR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#dc2626';
        ctx.beginPath(); ctx.arc(cx + spread, treeTop + treeH * 0.3, zoneR, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;

        // The birds themselves
        ctx.font = '26px serif';
        ctx.textAlign = 'center';
        const bob = Math.sin(t * 2) * 5;
        ctx.fillText('🐦', cx - spread, treeTop + treeH * 0.3 + bob);
        if (bothSurvive) {
            ctx.fillText('🐤', cx + spread, treeTop + treeH * 0.3 - bob);
        } else {
            outlineText(ctx, 'pushed out', cx + spread, treeTop + treeH * 0.3, 'bold 15px monospace', '#b91c1c');
        }
        outlineText(ctx, 'blue bird feeding zone', cx - spread, treeTop + treeH * 0.3 + zoneR + 22, 'bold 13px monospace', '#1d4ed8');
        outlineText(ctx, 'red bird feeding zone', cx + spread, treeTop + treeH * 0.3 - zoneR - 14, 'bold 13px monospace', '#b91c1c');

        fitText(ctx, bothSurvive
            ? 'Different enough niches -- both species can stay in the tree'
            : 'Almost the same niche -- one species is pushed out',
            safeRight / 2, 94, safeRight - 24, 15);
        fitText(ctx, 'The circles show where in the tree each bird looks for insects',
            safeRight / 2, 118, safeRight - 24, 13);

        const msg = overlap < 0.25
            ? 'Very different niches. The two birds hardly ever meet.'
            : overlap < 0.6
                ? 'Some sharing, but each still has food of its own.'
                : 'They are chasing the same insects in the same place, so one must go.';
        return { meter: { fraction: 1 - overlap, caption: 'How Well They Can Share the Tree', low: 'One must leave', high: 'Both live happily' }, note: msg };
    };

    return (
        <LabCanvas
            title="Sharing Without Fighting"
            readout={({ v }) => `They share ${Math.round(v * 100)} out of every 100 feeding spots`}
            controlLabel="How Much They Overlap"
            controlKey="nicheOverlap"
            controlInitial={20}
            controlDisplay={(_raw, v) => `${Math.round(v * 100)} in 100`}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="B47 Complete!"
            completeSubtitle="How Do Species Share Habitats?"
            completeNote="Share the place, not the job!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
