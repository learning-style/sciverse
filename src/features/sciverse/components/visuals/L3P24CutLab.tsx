import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the bottleneck is a BOUNDARY, not a part. So the drawing shades the two
// sides of the winning cut and picks out the pipes that cross it -- and the footer
// adds up exactly those pipes. A visual-only learner sees a line through the network
// and the sum of what it severs. The four cut capacities go in the note, which keeps
// the stage at nine strings.
const SL = 15;                 // reservoir to the lower junction, fixed
const UL = 10;                 // the link between the junctions, fixed
const UT = 20;                 // upper junction to the houses, fixed
const INDIGO = '#4338ca';
const SLACK = '#a5b4fc';
const CUT = '#b45309';

const suOf = (dial: number): number => Math.max(5, Math.min(50, Math.round(dial / 5) * 5));
const ltOf = (dial: number): number => Math.max(5, Math.min(50, Math.round(dial / 5) * 5));

type Side = 'res' | 'houses';
interface Cut { upper: Side; lower: Side; pipes: string[]; cap: number }

export const L3P24CutLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const su = suOf(raw);
        const lt = ltOf(raw2);
        const capOf: Record<string, number> = { su, sl: SL, ul: UL, ut: UT, lt };

        // Two junctions, each on either side: four cuts. Only the pipes crossing
        // FORWARD are counted, which is why the link appears in just one of them.
        const all: Cut[] = ([
            { upper: 'houses', lower: 'houses', pipes: ['su', 'sl'] },
            { upper: 'res', lower: 'res', pipes: ['ut', 'lt'] },
            { upper: 'res', lower: 'houses', pipes: ['sl', 'ul', 'ut'] },
            { upper: 'houses', lower: 'res', pipes: ['su', 'lt'] },
        ] as Array<{ upper: Side; lower: Side; pipes: string[] }>).map(c => ({
            ...c, cap: c.pipes.reduce((sum, k) => sum + capOf[k], 0),
        }));
        const winner = all.reduce((best, c) => (c.cap < best.cap ? c : best), all[0]);
        const delivery = winner.cap;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const room = Math.max(12, usable);
        const top = artTop + Math.max(0, (usable - room) / 2);
        const cy = top + room / 2;
        const showNums = room >= 54;

        const left = 26;
        const right = Math.max(left + 100, safeRight - 26);
        const boxW = 18;
        const midX = left + (right - left) * 0.5;
        const spread = Math.min(room * 0.3, 44);
        const upperY = cy - spread;
        const lowerY = cy + spread;
        const dotR = Math.max(3, Math.min(5, room * 0.045));

        const inCut = (k: string) => winner.pipes.indexOf(k) >= 0;
        const link = (x0: number, y0: number, x1: number, y1: number, k: string) => {
            const on = inCut(k);
            ctx.strokeStyle = on ? CUT : SLACK;
            ctx.lineWidth = on ? 4 : 2.2;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
        };

        link(left + boxW, cy, midX, upperY, 'su');
        link(left + boxW, cy, midX, lowerY, 'sl');
        link(midX, upperY, midX, lowerY, 'ul');
        link(midX, upperY, right - boxW, cy, 'ut');
        link(midX, lowerY, right - boxW, cy, 'lt');

        // the two sides of the cut: filled is the reservoir's side, hollow the houses'
        const dot = (x: number, y: number, side: Side) => {
            ctx.beginPath();
            ctx.arc(x, y, dotR, 0, Math.PI * 2);
            ctx.fillStyle = side === 'res' ? INDIGO : '#f8fafc';
            ctx.fill();
            ctx.strokeStyle = INDIGO;
            ctx.lineWidth = 2;
            ctx.stroke();
        };
        dot(midX, upperY, winner.upper);
        dot(midX, lowerY, winner.lower);

        ctx.fillStyle = '#1e293b';
        // Capped by the band rather than floored: a 10px floor pushed the boxes past
        // artBottom on a phone-height stage.
        const halfBox = Math.min(spread + dotR, room / 2);
        ctx.fillRect(left, cy - halfBox, boxW, halfBox * 2);
        ctx.fillRect(right - boxW, cy - halfBox, boxW, halfBox * 2);

        // water on the move, from the reservoir towards the houses
        ctx.fillStyle = '#ffffff';
        const march = (t * 30) % 1;
        [[upperY], [lowerY]].forEach(([jy], i) => {
            const frac = (march + i * 0.5) % 1;
            ctx.beginPath();
            ctx.arc(left + boxW + (midX - left - boxW) * frac, cy + (jy - cy) * frac, 1.7, 0, Math.PI * 2);
            ctx.fill();
        });

        if (showNums) {
            const leftMid = left + boxW + (midX - left - boxW) * 0.5;
            const rightMid = midX + (right - boxW - midX) * 0.5;
            const num = (s: number, x: number, y: number, k: string) =>
                outlineText(ctx, String(s), x, y, 'bold 11px monospace',
                    inCut(k) ? CUT : '#334155', 'center', 34);
            num(su, leftMid, cy - spread * 0.5 - 5, 'su');
            num(SL, leftMid, cy + spread * 0.5 + 11, 'sl');
            num(UL, midX + 17, cy + 4, 'ul');
            num(UT, rightMid, cy - spread * 0.5 - 5, 'ut');
            num(lt, rightMid, cy + spread * 0.5 + 11, 'lt');
        }

        ctx.save();
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        [[left + boxW / 2, 'reservoir'], [right - boxW / 2, 'houses']].forEach(([x, word]) => {
            ctx.save();
            ctx.translate(x as number, cy);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(word as string, 0, 3.5);
            ctx.restore();
        });
        ctx.restore();

        outlineText(ctx, 'cut = ' + winner.pipes.map(k => capOf[k]).join(' + ') + ' = ' + delivery,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'delivery = ' + delivery + ' L/min',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', CUT, 'center', safeRight - 30);

        fitText(ctx, 'smallest cut: ' + delivery, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Four cuts, one is smallest', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, delivery / 70)),
                caption: 'Delivery = Smallest Cut',
                low: 'a low ceiling',
                high: 'every pipe full',
                stops: ['#eef2ff', '#818cf8', INDIGO] as [string, string, string],
            },
            note: 'The four cuts are ' + all.map(c => c.cap).join(', ')
                + ' L/min, so the smallest is ' + delivery
                + '. The thick pipes are the ones crossing it, and no route can beat their total.',
        };
    };

    return (
        <LabCanvas
            title="Why the Smallest Line Is Always Reachable"
            readout={({ raw }) => 'Pipe to the upper junction ' + suOf(raw) + ' L/min'}
            controlLabel="Pipe to the Upper Junction"
            controlKey="pipeUpper"
            controlMin={5}
            controlMax={50}
            controlInitial={10}
            controlDisplay={raw => suOf(raw) + ' L/min'}
            control2={{
                label: 'Pipe from the Lower Junction',
                key: 'pipeLower',
                min: 5,
                max: 50,
                initial: 10,
                display: raw => ltOf(raw) + ' L/min',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Networks Deliver What Matters?"
            completeNote="Being stuck is itself a cut!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
