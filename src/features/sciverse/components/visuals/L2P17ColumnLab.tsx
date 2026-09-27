import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const LIMIT = 30;          // concrete crushes near 30 N/mm2
const SAFE = '#4338ca';
const CRUSH = '#b91c1c';

const loadOf = (dial: number): number => Math.max(100, Math.min(1500, Math.round(dial / 50) * 50));
const widthOf = (dial: number): number => Math.max(100, Math.min(400, Math.round(dial / 10) * 10));
const stressOf = (kN: number, mm: number): number => (kN * 1000) / (mm * mm);

export const L2P17ColumnLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const kN = loadOf(raw);
        const mm = widthOf(raw2);
        const area = mm * mm;
        const stress = stressOf(kN, mm);
        const holds = stress <= LIMIT;
        const crushAt = (LIMIT * area) / 1000;

        // Bands are shares of the real stage height, so the column and its labels
        // cannot reach the writing above or the footer below.
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const arrowBand = Math.max(16, Math.min(30, usable * 0.16));
        const labelTail = Math.max(16, Math.min(24, usable * 0.12));
        const colH = Math.max(34, Math.min(150, usable - arrowBand - labelTail));
        const blockH = arrowBand + colH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const colW = Math.max(14, Math.min(safeRight - 90, (mm / 400) * (safeRight - 110)));
        const cx = safeRight / 2;
        const colTop = top + arrowBand;

        // the load, drawn as arrows pressing down on the column
        const shade = Math.max(0, Math.min(1, stress / LIMIT));
        ctx.strokeStyle = holds ? SAFE : CRUSH;
        ctx.lineWidth = 2;
        const arrows = Math.max(2, Math.min(7, Math.round(colW / 26)));
        for (let i = 0; i < arrows; i++) {
            const ax = cx - colW / 2 + (colW / arrows) * (i + 0.5);
            ctx.beginPath();
            ctx.moveTo(ax, top);
            ctx.lineTo(ax, colTop - 4);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ax, colTop - 1);
            ctx.lineTo(ax - 4, colTop - 8);
            ctx.lineTo(ax + 4, colTop - 8);
            ctx.closePath();
            ctx.fillStyle = holds ? SAFE : CRUSH;
            ctx.fill();
        }

        // the column itself, shaded by how close the concrete is to crushing
        ctx.fillStyle = holds
            ? 'rgb(' + Math.round(199 + 40 * shade) + ',' + Math.round(210 - 60 * shade) + ',254)'
            : '#fecaca';
        ctx.fillRect(cx - colW / 2, colTop, colW, colH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - colW / 2, colTop, colW, colH);
        outlineText(ctx, 'load', cx, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', holds ? SAFE : CRUSH, 'center', safeRight - 40);
        outlineText(ctx, 'column', cx, colTop + colH / 2 + 4,
            'bold 11px monospace', '#0f172a', 'center', colW - 6);
        outlineText(ctx, mm + ' mm square, area ' + area.toLocaleString() + ' mm²',
            cx, Math.min(colTop + colH + labelTail, artBottom),
            'bold 11px monospace', '#334155', 'center', safeRight - 30);

        outlineText(ctx, kN.toLocaleString() + ' kN over ' + area.toLocaleString()
            + ' mm² = ' + stress.toFixed(1) + ' N/mm²',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, holds
            ? 'concrete holds: the limit is ' + LIMIT + ' N/mm², and it crushes at '
              + crushAt.toFixed(0) + ' kN'
            : 'concrete crushes: above the limit of ' + LIMIT + ' N/mm² at '
              + crushAt.toFixed(0) + ' kN',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', holds ? SAFE : CRUSH,
            'center', safeRight - 30);

        fitText(ctx, stress.toFixed(1) + ' N/mm² in the concrete', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Spread the force, or lose the column', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, stress / LIMIT)),
                caption: 'How Close to Crushing',
                low: '0 N/mm²',
                high: LIMIT + ' N/mm²',
                stops: ['#eef2ff', '#a5b4fc', CRUSH] as [string, string, string],
            },
            note: 'A load of ' + kN.toLocaleString() + ' kN on a ' + mm
                + ' mm square column spreads over ' + area.toLocaleString()
                + ' mm², so the stress is ' + stress.toFixed(1) + ' N/mm². '
                + (holds
                    ? 'That holds, and this column would crush at about ' + crushAt.toFixed(0) + ' kN.'
                    : 'That crushes, because the limit of ' + LIMIT + ' N/mm² arrives at about '
                      + crushAt.toFixed(0) + ' kN.')
                + ' Area goes as the width squared, so widening the column pays four times over.',
        };
    };

    return (
        <LabCanvas
            title="How Much Can It Carry?"
            readout={({ raw }) => 'A load of ' + loadOf(raw).toLocaleString() + ' kN'}
            controlLabel="Load"
            controlKey="columnLoad"
            controlMin={100}
            controlMax={1500}
            controlInitial={400}
            controlDisplay={raw => loadOf(raw).toLocaleString() + ' kN'}
            control2={{
                label: 'Column Width',
                key: 'columnWidth',
                min: 100,
                max: 400,
                initial: 200,
                display: raw => widthOf(raw) + ' mm',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Much Can It Carry?"
            completeNote="Force per area, not force alone!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
