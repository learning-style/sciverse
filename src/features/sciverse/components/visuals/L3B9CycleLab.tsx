import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const COUNTED = 200;
const COLS = 20;
const ROWS = 10;
const DARK = '#be123c';

const mitosisOf = (dial: number): number => Math.max(0, Math.min(60, Math.round(dial)));
const hoursOf = (dial: number): number => Math.max(10, Math.min(40, Math.round(dial)));
/** 73 shares no factor with 200, so this visits every cell once, scattered. */
const scatter = (i: number): number => (i * 73 + 29) % COUNTED;

export const L3B9CycleLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const dividing = mitosisOf(raw);
        const hours = hoursOf(raw2);
        const index = dividing / COUNTED;
        const inMitosis = index * hours;
        const inInterphase = hours - inMitosis;

        // The field of view: 200 cells, the dividing ones scattered through it
        const gx = 30;
        const cellW = (safeRight * 0.55 - gx) / COLS;
        const cellH = Math.max(6, Math.min(cellW * 0.7, (stageBottom - stageTop - 124) / ROWS));
        const gy = stageTop + 12;
        const marked = new Set<number>();
        for (let i = 0; i < dividing; i++) marked.add(scatter(i));
        for (let c = 0; c < COUNTED; c++) {
            const x = gx + (c % COLS) * cellW;
            const y = gy + Math.floor(c / COLS) * cellH;
            const isDividing = marked.has(c);
            ctx.fillStyle = isDividing ? '#fecdd3' : '#fff1f2';
            ctx.fillRect(x, y, cellW, cellH);
            ctx.strokeStyle = '#fda4af';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellW, cellH);
            if (isDividing) {
                // Chromosomes packed tight enough to see, lined up across the cell
                ctx.fillStyle = DARK;
                ctx.fillRect(x + cellW * 0.42, y + cellH * 0.15, cellW * 0.16, cellH * 0.7);
            } else {
                ctx.fillStyle = '#fb7185';
                ctx.beginPath();
                ctx.arc(x + cellW / 2, y + cellH / 2, Math.min(cellW, cellH) * 0.18, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const gridBottom = gy + ROWS * cellH;

        const px = safeRight * 0.6;
        const pw = safeRight - 16 - px;
        outlineText(ctx, `mitotic index = ${dividing} / ${COUNTED} = ${index.toFixed(2)}`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `mitosis: ${index.toFixed(2)} x ${hours} = ${inMitosis.toFixed(1)} hours`, px, stageTop + 46, 'bold 13px monospace', DARK, 'left', pw);
        outlineText(ctx, `interphase: ${inInterphase.toFixed(1)} hours`, px, stageTop + 70, '12px monospace', '#334155', 'left', pw);

        // One cycle as a bar, split into interphase and mitosis
        const bx = gx;
        const bw = safeRight - 24 - bx;
        const by = gridBottom + 14;
        const wM = bw * index;
        ctx.fillStyle = '#ffe4e6';
        ctx.fillRect(bx, by, bw - wM, 16);
        ctx.fillStyle = DARK;
        ctx.fillRect(bx + bw - wM, by, wM, 16);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, 16);
        outlineText(ctx, `interphase ${inInterphase.toFixed(1)} hours`, bx, by + 30, '11px monospace', '#475569', 'left', bw * 0.6);
        outlineText(ctx, `mitosis ${inMitosis.toFixed(1)} hours`, bx + bw, by + 30, '11px monospace', DARK, 'right', bw * 0.38);

        outlineText(ctx, `time in mitosis = ${dividing} / ${COUNTED} x ${hours} hours = ${inMitosis.toFixed(1)} hours`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, dividing === 0 ? 'no cells in mitosis: are they cycling at all?' : `interphase ${inInterphase.toFixed(1)} hours + mitosis ${inMitosis.toFixed(1)} hours = ${hours} hours`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${inMitosis.toFixed(1)} hours dividing, ${inInterphase.toFixed(1)} hours getting ready`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Share of cells caught dividing = share of the cycle', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, index / 0.3)),
                caption: 'Mitotic Index',
                low: '0',
                high: '0.30',
                stops: ['#fff1f2', '#fb7185', '#9f1239'] as [string, string, string],
            },
            note: `${dividing} of ${COUNTED} cells are in mitosis, so a ${hours}-hour cycle spends ${inMitosis.toFixed(1)} hours dividing and ${inInterphase.toFixed(1)} hours in interphase.`,
        };
    };

    return (
        <LabCanvas
            title="Timing the Cell Cycle"
            readout={({ raw }) => `${mitosisOf(raw)} of ${COUNTED} cells in mitosis`}
            controlLabel="Cells in Mitosis"
            controlKey="cellsInMitosis"
            controlMin={0}
            controlMax={60}
            controlInitial={20}
            controlDisplay={raw => `${mitosisOf(raw)} of ${COUNTED}`}
            control2={{
                label: 'Cycle Time',
                key: 'cycleTime',
                min: 10,
                max: 40,
                initial: 20,
                display: raw => `${hoursOf(raw)} hours`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Timing the Cell Cycle"
            completeNote="Share of cells, share of time!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
