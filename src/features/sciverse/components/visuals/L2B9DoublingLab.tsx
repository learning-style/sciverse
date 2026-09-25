import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUPERSCRIPT: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
};
const sup = (n: number): string => String(n).split('').map(ch => SUPERSCRIPT[ch] ?? ch).join('');

const LOG_MAX = 18;
/** Landmarks on the ladder. true = label above the line, false = below. */
const LANDMARKS: [number, string, boolean][] = [
    [1e3, 'a thousand', true], [1e6, 'a million', false], [1e9, 'a billion', true], [1e12, 'a trillion', false], [3e13, 'a body, 30 trillion', true],
];

const startOf = (dial: number): number => Math.max(1, Math.min(1000, Math.round(dial)));
const doublingsOf = (dial: number): number => Math.max(0, Math.min(50, Math.round(dial)));
const countText = (n: number): string => {
    if (n < 1e6) return Math.round(n).toLocaleString();
    const power = Math.floor(Math.log10(n));
    return `${(n / Math.pow(10, power)).toFixed(2)} x 10${sup(power)}`;
};

export const L2B9DoublingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = startOf(raw);
        const n = doublingsOf(raw2);
        const cells = start * Math.pow(2, n);
        const lastAdded = n > 0 ? cells / 2 : 0;

        // The first few doublings as dots, to show the pattern. One dot in the
        // top row stands for all the starting cells.
        const dotRows = Math.min(n, 4);
        const dotTop = stageTop + 10;
        for (let r = 0; r <= dotRows; r++) {
            const count = Math.pow(2, r);
            const y = dotTop + r * 11;
            for (let i = 0; i < count; i++) {
                ctx.fillStyle = r === dotRows ? '#e11d48' : '#fda4af';
                ctx.beginPath();
                ctx.arc(46 + i * 10, y, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            outlineText(ctx, `${(start * count).toLocaleString()} cells`, 46 + 16 * 10, y + 4, '10px monospace', '#475569', 'left', safeRight * 0.58 - 220);
        }

        // A ladder of powers of ten, from 1 to 10^17
        const lx = 40;
        const lw = safeRight - 80;
        const ly = Math.max(stageTop + 84, stageBottom - 74);
        const xOf = (value: number): number => lx + (Math.max(0, Math.min(LOG_MAX, Math.log10(Math.max(1, value)))) / LOG_MAX) * lw;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx + lw, ly);
        ctx.stroke();
        LANDMARKS.forEach(([mark, label, above]) => {
            const mx = xOf(mark);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(mx, ly - 5);
            ctx.lineTo(mx, ly + 5);
            ctx.stroke();
            outlineText(ctx, label, mx, above ? ly - 10 : ly + 18, '11px monospace', '#475569', 'center', lw * 0.2);
        });
        const cx = xOf(cells);
        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.arc(cx, ly, 6, 0, Math.PI * 2);
        ctx.fill();

        const px = safeRight * 0.58;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `2${sup(n)} = ${countText(Math.pow(2, n))}`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `cells = ${start} x 2${sup(n)}`, px, stageTop + 46, 'bold 13px monospace', '#9f1239', 'left', pw);

        outlineText(ctx, `cells = ${start.toLocaleString()} x 2${sup(n)} = ${countText(cells)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, n > 0 ? `the last doubling adds ${countText(lastAdded)} cells` : 'no doublings yet',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${countText(cells)} cells`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Every 10 doublings multiplies by about a thousand', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.log10(cells) / LOG_MAX)),
                caption: 'Number of Cells',
                low: '1',
                high: `10${sup(LOG_MAX)}`,
                stops: ['#ffe4e6', '#fb7185', '#9f1239'] as [string, string, string],
            },
            note: `${start.toLocaleString()} ${start === 1 ? 'cell' : 'cells'} doubling ${n} times makes ${countText(cells)} cells.`,
        };
    };

    return (
        <LabCanvas
            title="How Many Doublings Make a Body?"
            readout={({ raw }) => `Starting with ${startOf(raw).toLocaleString()} ${startOf(raw) === 1 ? 'cell' : 'cells'}`}
            controlLabel="Starting Cells"
            controlKey="startingCells"
            controlMin={1}
            controlMax={1000}
            controlInitial={1}
            controlDisplay={raw => `${startOf(raw).toLocaleString()} cells`}
            control2={{
                label: 'Doublings',
                key: 'doublings',
                min: 0,
                max: 50,
                initial: 10,
                display: raw => `${doublingsOf(raw)} doublings`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Many Doublings Make a Body?"
            completeNote="Start x 2ⁿ!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
