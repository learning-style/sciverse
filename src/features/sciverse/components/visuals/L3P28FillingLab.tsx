import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Three blocks, and the arithmetic is in the geometry of the first one.
//
// The top bar is ONE SECOND of the heart's life drawn to scale, with the beats laid end
// to end inside it: one at 60, three at 180, five at 300. Each beat is a solid squeeze
// of a FIXED 0.20 s and a pale filling of whatever is left, so raising the rate visibly
// packs in more beats while draining the pale part out of every one of them. At 300 the
// bar is five solid blocks with no pale anywhere, which is the lesson's zero.
//
// Below it the ventricle shows how full that filling time managed to get it, and below
// that the output stands against the best the heart could do -- so a reader who only
// looks sees the rate rise, the beats multiply, the filling vanish and the output fall.
const SQUEEZE = '#4338ca';
const FILLING = '#c7d2fe';
const BLOOD = '#be123c';
const GOOD = '#15803d';
const INK = '#0f172a';
const MUTED = '#475569';
const FULL_FILL = 0.15;      // s of filling a complete 110 mL needs
const SV_MAX = 110;          // mL

const rateOf = (dial: number): number => Math.max(60, Math.min(300, Math.round(dial / 5) * 5));
const squeezeOf = (dial: number): number =>
    Math.max(0.15, Math.min(0.30, Math.round(dial * 100) / 100));

export const L3P28FillingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const squeeze = squeezeOf(raw2);
        const cycle = 60 / rate;
        const fill = Math.max(0, cycle - squeeze);
        const frac = Math.min(1, fill / FULL_FILL);
        const sv = SV_MAX * frac;
        const out = rate * sv / 1000;
        const bestRate = 60 / (squeeze + FULL_FILL);
        const bestOut = bestRate * SV_MAX / 1000;
        const deadRate = 60 / squeeze;
        // exhaustive: every rate lands in exactly one of the three
        const dead = fill <= 0;
        const topped = !dead && frac >= 1;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = Math.max(6, artBottom - artTop);
        const left = 24;
        const fullW = Math.max(90, safeRight - 48);
        // three blocks out of the height that exists; no floor, so the layout can never
        // claim more room than it was given
        const unit = usable / 3;
        const showLbl = unit >= 26;
        const barTop = showLbl ? 12 : 1;
        const barH = Math.max(2, Math.min(18, unit - barTop - 4));
        const blockY = (i: number) => artTop + i * unit;

        const tag = (s: string, x: number, y: number, align: 'left' | 'right' | 'center', c: string) =>
            outlineText(ctx, s, x, y, 'bold 10px monospace', c, align, fullW - 6);

        // ---- block 0: one second, with the beats laid end to end inside it
        const y0 = blockY(0);
        const beatW = fullW * cycle;              // one second spans the whole width
        const sqW = fullW * squeeze;
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, y0 + barTop, fullW, barH);
        ctx.clip();
        for (let k = 0; k * beatW < fullW + beatW; k++) {
            const bx = left + k * beatW;
            ctx.fillStyle = FILLING;
            ctx.fillRect(bx, y0 + barTop, beatW, barH);
            ctx.fillStyle = SQUEEZE;
            ctx.fillRect(bx, y0 + barTop, Math.min(sqW, beatW), barH);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(bx, y0 + barTop);
            ctx.lineTo(bx, y0 + barTop + barH);
            ctx.stroke();
        }
        ctx.restore();
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(left, y0 + barTop, fullW, barH);
        if (showLbl) {
            tag('squeeze ' + squeeze.toFixed(2) + ' s', left, y0 + 10, 'left', SQUEEZE);
            tag('filling ' + fill.toFixed(2) + ' s', left + fullW, y0 + 10, 'right', MUTED);
        }

        // ---- block 1: how full one beat managed to get
        const y1 = blockY(1);
        ctx.strokeStyle = 'rgba(15,23,42,0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(left, y1 + barTop, fullW, barH);
        ctx.fillStyle = BLOOD;
        ctx.fillRect(left, y1 + barTop, Math.max(0, fullW * frac), barH);
        if (showLbl) {
            tag(Math.round(sv) + ' of ' + SV_MAX + ' mL a beat', left + fullW / 2, y1 + 10, 'center', BLOOD);
        }

        // ---- block 2: the output against the best this heart could do
        const y2 = blockY(2);
        ctx.strokeStyle = 'rgba(15,23,42,0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(left, y2 + barTop, fullW, barH);
        ctx.fillStyle = topped ? GOOD : MUTED;
        ctx.fillRect(left, y2 + barTop, Math.max(0, fullW * Math.min(1, out / bestOut)), barH);
        // the best, marked, so the fall past it is visible rather than asserted
        ctx.strokeStyle = GOOD;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left + fullW, y2 + barTop);
        ctx.lineTo(left + fullW, y2 + barTop + barH);
        ctx.stroke();
        if (showLbl) {
            tag(out.toFixed(1) + ' of ' + bestOut.toFixed(1) + ' L/min',
                left + fullW / 2, y2 + 10, 'center', topped ? GOOD : MUTED);
        }

        outlineText(ctx, 'one second: ' + (rate / 60).toFixed(1) + ' beats',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', INK, 'center', safeRight - 30);
        outlineText(ctx, 'best at ' + Math.round(bestRate) + ', zero at ' + Math.round(deadRate),
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', MUTED, 'center', safeRight - 30);

        fitText(ctx, out.toFixed(1) + ' L a minute', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, dead ? 'No time to fill'
            : topped ? 'Every beat is full' : 'Past the best rate',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, out / bestOut)),
                caption: 'Output Against the Best',
                low: 'too fast to fill',
                high: 'every beat a full one',
                stops: [MUTED, '#a5b4fc', GOOD] as [string, string, string],
            },
            note: dead
                ? 'At ' + rate + ' a minute one cycle is ' + cycle.toFixed(2) + ' s and the squeeze takes all of it,'
                  + ' so nothing flows in and nothing comes out. The heart is beating and moving no blood.'
                : topped
                    ? 'There is ' + fill.toFixed(2) + ' s to fill, more than the ' + FULL_FILL
                      + ' s a full 110 mL needs, so every beat is complete and beating faster is pure gain'
                      + ' up to ' + Math.round(bestRate) + '.'
                    : 'Only ' + fill.toFixed(2) + ' s is left to fill, against the ' + FULL_FILL
                      + ' s a full beat needs, so each beat carries ' + Math.round(sv) + ' mL. The rate is'
                      + ' still climbing and the output is falling.',
        };
    };

    return (
        <LabCanvas
            title="The Beat That Cannot Fill"
            readout={({ raw }) => rateOf(raw) + ' beats a minute'}
            controlLabel="Heart Rate"
            controlKey="beatRate"
            controlMin={60}
            controlMax={300}
            controlInitial={100}
            controlDisplay={raw => rateOf(raw) + ' a minute'}
            control2={{
                label: 'Squeeze Time',
                key: 'squeezeTime',
                min: 0.15,
                max: 0.3,
                initial: 0.2,
                display: raw => squeezeOf(raw).toFixed(2) + ' s',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="The rate sets the volume!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
