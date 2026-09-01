import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MAX_SPECIES = 12;

export const L2B33BackupLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const n = Math.max(1, Math.round(raw));
        const p = Math.max(1, Math.round(raw2)) / 100;
        const survives = 1 - Math.pow(1 - p, n);

        // The species that can do this one job
        const iconTop = stageTop + 34;
        const perRow = 6;
        const cell = Math.min(46, (safeRight - 60) / perRow);
        for (let i = 0; i < MAX_SPECIES; i++) {
            const cx = safeRight / 2 - (perRow * cell) / 2 + (i % perRow) * cell + cell / 2;
            const cy = iconTop + Math.floor(i / perRow) * (cell + 4) + cell / 2;
            const present = i < n;
            ctx.globalAlpha = present ? 1 : 0.16;
            ctx.fillStyle = present ? `rgba(190,24,93,${0.25 + p * 0.7})` : '#cbd5e1';
            ctx.beginPath();
            ctx.arc(cx, cy, cell * 0.32, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#9d174d';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        outlineText(ctx, `${n} species can do this job, each with a ${Math.round(p * 100)}% chance`,
            safeRight / 2, iconTop + 2 * (cell + 4) + 26, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);

        // How the answer grows as species are added
        const gTop = iconTop + 2 * (cell + 4) + 44;
        const gBottom = stageBottom - 30;
        const gH = Math.max(60, gBottom - gTop);
        const gW = safeRight - 110;
        const gX = 62;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gX, gTop);
        ctx.lineTo(gX, gBottom);
        ctx.lineTo(gX + gW, gBottom);
        ctx.stroke();
        ctx.strokeStyle = '#be185d';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 1; i <= MAX_SPECIES; i++) {
            const px = gX + (gW * (i - 1)) / (MAX_SPECIES - 1);
            const py = gBottom - (1 - Math.pow(1 - p, i)) * gH;
            if (i === 1) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        const dotX = gX + (gW * (n - 1)) / (MAX_SPECIES - 1);
        const dotY = gBottom - survives * gH;
        ctx.fillStyle = '#be185d';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#475569';
        ctx.font = '11px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('100%', gX - 6, gTop + 10);
        ctx.fillText('0%', gX - 6, gBottom);
        ctx.textAlign = 'center';
        outlineText(ctx, 'more species to the right', gX + gW / 2, gBottom + 18,
            'bold 11px monospace', '#0f172a', 'center', gW);

        fitText(ctx, `Chance the job still gets done: ${(survives * 100).toFixed(1)}%`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, `1 - (1 - ${p.toFixed(2)}) to the power of ${n} = ${survives.toFixed(3)}`,
            safeRight / 2, 118, safeRight - 24, 13);

        const note = n === 1
            ? 'One species doing the job means the job is exactly as fragile as that species.'
            : survives > 0.95
                ? 'Very safe now. Each extra species barely moves it -- diminishing returns.'
                : 'Each extra species multiplies the remaining failure down again.';
        return {
            meter: {
                fraction: survives,
                caption: 'Chance the Job Still Gets Done',
                low: 'Very fragile',
                high: 'Nearly certain',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Maths of a Backup Plan"
            readout={({ raw }) => `${Math.max(1, Math.round(raw))} species can carry out this one job`}
            controlLabel="Species Doing the Job"
            controlKey="speciesCount"
            controlMin={1}
            controlMax={MAX_SPECIES}
            controlInitial={1}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} species`}
            control2={{
                label: "Each Species' Chance",
                key: 'survivalChance',
                min: 10,
                max: 90,
                initial: 30,
                display: raw => `${Math.round(raw)}% chance each`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Maths of a Backup Plan"
            completeNote="Independent defences, not names!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
