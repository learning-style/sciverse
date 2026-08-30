import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Buckets of rock in, one fixed amount of copper out, and the waste pile that
 *  is left over. Thirty spoonfuls per bucket needs one bucket; two spoonfuls
 *  needs fifteen -- the same fifteen-fold jump the checkpoint asks about. */
const WANTED = 30;

export const C49SmeltLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const spoonfuls = Math.max(1, Math.round(raw));
        const buckets = Math.ceil(WANTED / spoonfuls);

        const baseY = stageBottom - 46;
        const colW = safeRight / 3;

        // Left: the buckets of rock that have to be dug and crushed
        const perRow = 6;
        const shown = Math.min(buckets, 30);
        const bw = 17;
        const bh = 14;
        for (let i = 0; i < shown; i++) {
            const bx = 30 + (i % perRow) * (bw + 5);
            const by = baseY - 30 - Math.floor(i / perRow) * (bh + 5);
            ctx.fillStyle = '#a8a29e';
            ctx.fillRect(bx, by, bw, bh);
            ctx.strokeStyle = '#57534e';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bx, by, bw, bh);
        }
        outlineText(ctx, `${buckets} buckets of rock`, 30 + (perRow * (bw + 5)) / 2, baseY - 6,
            'bold 13px monospace');

        // Middle: the smelter, with charcoal burning underneath
        const sx = colW + colW / 2 - 34;
        const sy = baseY - 96;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(sx, sy, 68, 74);
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 3;
        ctx.strokeRect(sx, sy, 68, 74);
        ctx.fillStyle = '#f97316';
        ctx.fillRect(sx + 10, sy + 44, 48, 22);
        ctx.font = '20px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔥', sx + 34, sy + 62);
        outlineText(ctx, 'smelter', sx + 34, sy - 10, 'bold 13px monospace');
        outlineText(ctx, 'charcoal grabs the oxygen', sx + 34, baseY - 6, 'bold 12px monospace');

        // Right: the copper that comes out, always the same amount
        const mx = colW * 2 + colW / 2;
        ctx.fillStyle = '#c2410c';
        ctx.beginPath();
        ctx.ellipse(mx, baseY - 34, 30, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#7c2d12';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, 'the same copper', mx, baseY - 6, 'bold 13px monospace');

        // The waste pile, growing with every extra bucket handled
        const wasteH = Math.min(stageBottom - stageTop - 70, 8 + buckets * 4.4);
        ctx.fillStyle = '#d6d3d1';
        ctx.beginPath();
        ctx.moveTo(mx + 46, baseY + 22);
        ctx.lineTo(mx + 46 + wasteH * 0.7, baseY + 22);
        ctx.lineTo(mx + 46 + wasteH * 0.35, baseY + 22 - wasteH);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 2;
        ctx.stroke();
        outlineText(ctx, 'waste', mx + 46 + wasteH * 0.35, baseY + 38, 'bold 12px monospace');

        fitText(ctx, `${buckets} bucket${buckets === 1 ? '' : 's'} of rock for the same spoonfuls of copper`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The copper you get never changes -- only how much rock you go through',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = spoonfuls >= 20
            ? 'Rich rock. One or two buckets, and hardly any waste.'
            : spoonfuls >= 6
                ? 'Poorer rock. More buckets dug, crushed and heated for the same copper.'
                : 'Very poor rock. Enormous amounts handled, and a huge pile left behind.';
        return {
            meter: { fraction: spoonfuls / 40, caption: 'How Rich the Rock Is', low: 'Very poor', high: 'Very rich' },
            note,
        };
    };

    return (
        <LabCanvas
            title="From Rock to Metal"
            readout={({ raw }) => `About ${Math.max(1, Math.round(raw))} spoonfuls of copper in every bucket of rock`}
            controlLabel="Metal in the Rock"
            controlKey="metalInRock"
            controlMin={1}
            controlMax={40}
            controlInitial={30}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} spoonfuls per bucket`}
            accent="emerald"
            sky={['#fffbeb', '#f8fafc']}
            completeTitle="C49 Complete!"
            completeSubtitle="How Do We Use Earth's Resources Responsibly?"
            completeNote="Charcoal grabs the oxygen and the metal comes free!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
