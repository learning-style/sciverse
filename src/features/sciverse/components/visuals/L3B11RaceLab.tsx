import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const IMMUNE_TARGET = 100000;
const IMMUNE_DOUBLING_H = 12;
const GERM_START = 100;
const GERM_ILL = 1e9;
const HOURS = 150;
const LOG2 = Math.log10(2);
const MEMORY = '#e11d48';
const GERM = '#d97706';

const memoryOf = (dial: number): number => Math.max(100, Math.min(20000, Math.round(dial / 100) * 100));
const germDoublingOf = (dial: number): number => Math.max(1, Math.min(6, Math.round(dial * 2) / 2));

export const L3B11RaceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const memory = memoryOf(raw);
        const germDoubling = germDoublingOf(raw2);
        const memoryHours = (Math.log10(IMMUNE_TARGET / memory) / LOG2) * IMMUNE_DOUBLING_H;
        const germHours = (Math.log10(GERM_ILL / GERM_START) / LOG2) * germDoubling;
        const margin = germHours - memoryHours;
        const memoryWins = margin > 0;

        // A graph where each gridline is ten times the one below
        const gx0 = 76;
        const gx1 = safeRight - 20;
        const gTop = stageTop + 24;
        const gBottom = stageBottom - 64;
        const gh = gBottom - gTop;
        const xAt = (hours: number): number => gx0 + (Math.min(HOURS, hours) / HOURS) * (gx1 - gx0);
        const yAt = (count: number): number => gBottom - ((Math.log10(count) - 2) / 7) * gh;
        for (let p = 2; p <= 9; p++) {
            ctx.strokeStyle = p === 5 || p === 9 ? '#94a3b8' : '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.setLineDash(p === 5 || p === 9 ? [5, 4] : []);
            ctx.beginPath();
            ctx.moveTo(gx0, yAt(Math.pow(10, p)));
            ctx.lineTo(gx1, yAt(Math.pow(10, p)));
            ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx0, gTop);
        ctx.lineTo(gx0, gBottom);
        ctx.lineTo(gx1, gBottom);
        ctx.stroke();
        outlineText(ctx, '100', gx0 - 6, yAt(100) + 4, '11px monospace', '#475569', 'right', 66);
        outlineText(ctx, '100,000', gx0 - 6, yAt(IMMUNE_TARGET) + 4, '11px monospace', '#475569', 'right', 66);
        outlineText(ctx, '1 billion', gx0 - 6, yAt(GERM_ILL) + 4, '11px monospace', '#475569', 'right', 66);
        outlineText(ctx, 'immune target 100,000', gx0 + 6, yAt(IMMUNE_TARGET) - 5, '11px monospace', MEMORY, 'left', (gx1 - gx0) * 0.5);
        outlineText(ctx, 'ill at 1 billion', gx0 + 6, yAt(GERM_ILL) - 5, '11px monospace', GERM, 'left', (gx1 - gx0) * 0.5);
        outlineText(ctx, `hours from when the germ arrives, 0 to ${HOURS}`, (gx0 + gx1) / 2, gBottom + 14, '11px monospace', '#475569', 'center', gx1 - gx0);

        // The two climbs: straight lines on this scale, because each doubling is one equal step up
        const climb = (from: number, to: number, hours: number, colour: string) => {
            ctx.strokeStyle = colour;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(xAt(0), yAt(from));
            if (hours <= HOURS) {
                ctx.lineTo(xAt(hours), yAt(to));
            } else {
                ctx.lineTo(xAt(HOURS), yAt(Math.pow(10, Math.log10(from) + (Math.log10(to / from) * HOURS) / hours)));
            }
            ctx.stroke();
            if (hours <= HOURS) {
                ctx.fillStyle = colour;
                ctx.beginPath();
                ctx.arc(xAt(hours), yAt(to), 6, 0, Math.PI * 2);
                ctx.fill();
            }
        };
        climb(memory, IMMUNE_TARGET, memoryHours, MEMORY);
        climb(GERM_START, GERM_ILL, germHours, GERM);

        outlineText(ctx, `memory: log (100,000 / ${memory.toLocaleString()}) / 0.301 x 12 = ${memoryHours.toFixed(0)} hours`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', MEMORY, 'center', safeRight - 30);
        outlineText(ctx, `germ: 7 / 0.301 x ${germDoubling} = ${germHours.toFixed(0)} hours`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', GERM, 'center', safeRight - 30);

        fitText(ctx, memoryWins ? `Memory wins by ${margin.toFixed(0)} hours` : `The germ wins by ${(-margin).toFixed(0)} hours`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A head start of doublings', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 0.5 + margin / 200)),
                caption: 'Who Wins the Race',
                low: 'the germ wins',
                high: 'memory wins',
                stops: [GERM, '#e2e8f0', MEMORY] as [string, string, string],
            },
            note: `${memory.toLocaleString()} memory cells reach 100,000 in ${memoryHours.toFixed(0)} hours; a germ doubling every ${germDoubling} hours reaches a billion in ${germHours.toFixed(0)} hours.`,
        };
    };

    return (
        <LabCanvas
            title="Racing the Germ"
            readout={({ raw }) => `${memoryOf(raw).toLocaleString()} matching memory cells`}
            controlLabel="Memory Cells"
            controlKey="memoryCells"
            controlMin={100}
            controlMax={20000}
            controlInitial={5000}
            controlDisplay={raw => `${memoryOf(raw).toLocaleString()}`}
            control2={{
                label: 'Germ Doubling Time',
                key: 'germDoublingTime',
                min: 1,
                max: 6,
                initial: 3,
                display: raw => `${germDoublingOf(raw)} hours`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Racing the Germ"
            completeNote="A head start of doublings!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
