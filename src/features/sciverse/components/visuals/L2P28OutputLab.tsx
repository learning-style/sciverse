import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: blood per minute is a product, so the picture has to show both factors
// doing their separate jobs. The heart beats at the dialled RATE and squeezes out a
// pulse whose size is the dialled VOLUME, and the jug beside it fills to what those
// add up to over a minute on a fixed 0-25 litre scale -- so two very different-looking
// hearts that reach the same level really are moving the same blood.
//
// Everything is sized from the band with low floors, because a floor that exceeds the
// space it is fitted into is the mistake this project has made most often.
const MAX_LPM = 25;
const MUSCLE = '#be123c';
const BLOOD = '#9f1239';
const JUG = '#4338ca';
const FILL = '#e11d48';

const rateOf = (dial: number): number => Math.max(40, Math.min(200, Math.round(dial / 5) * 5));
const strokeOf = (dial: number): number => Math.max(50, Math.min(120, Math.round(dial / 2) * 2));

export const L2P28OutputLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const perBeat = strokeOf(raw2);
        const mlPerMin = rate * perBeat;
        const lpm = mlPerMin / 1000;
        // written out rather than left to a locale, so the canvas reads the same anywhere
        const group = (n: number) => n >= 1000
            ? Math.floor(n / 1000) + ',' + String(n % 1000).padStart(3, '0')
            : String(n);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const fit = Math.max(0, Math.min(2, Math.floor((band - 26) / LBL)));
        const artH = Math.max(4, band - fit * LBL - 4);
        const midY = artTop + 2 + artH / 2;

        // ---- the heart, contracting at the dialled rate
        const beat = (t * rate / 60 * 2.2) % 1;
        const squeeze = Math.pow(Math.max(0, 1 - beat * 3), 2);   // a quick squeeze, then rest
        const hx = left + fullW * 0.2;
        const hr = Math.max(2, Math.min(artH * 0.34, (fullW * 0.2 - 2) / 1.5, 36));
        const hs = hr * (1 - 0.16 * squeeze);
        ctx.fillStyle = MUSCLE;
        ctx.beginPath();
        // a two-lobed heart: two arcs over a V
        ctx.moveTo(hx, midY + hs * 0.92);
        ctx.bezierCurveTo(hx - hs * 1.5, midY + hs * 0.1, hx - hs * 0.78, midY - hs * 0.95, hx, midY - hs * 0.26);
        ctx.bezierCurveTo(hx + hs * 0.78, midY - hs * 0.95, hx + hs * 1.5, midY + hs * 0.1, hx, midY + hs * 0.92);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // ---- the vessel out of it, and the pulse of blood leaving on each beat
        const jx = left + fullW * 0.78;
        const vesselY = midY - hr * 0.2;
        const vesselW = Math.max(2.5, Math.min(hr * 0.3, 13));
        ctx.strokeStyle = '#fda4af';
        ctx.lineWidth = vesselW + 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(hx + hs * 0.6, vesselY);
        ctx.lineTo(jx, vesselY);
        ctx.stroke();
        ctx.lineCap = 'butt';
        // the pulse: its size is the volume per beat
        const along = Math.min(1, beat * 1.9);
        if (along < 1) {
            const px = hx + hs * 0.6 + (jx - (hx + hs * 0.6)) * along;
            const pr = Math.max(1.4, vesselW * 0.5 * (perBeat / 85));
            ctx.fillStyle = BLOOD;
            ctx.beginPath();
            ctx.ellipse(px, vesselY, pr * 1.5, Math.min(pr, vesselW * 0.55), 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // ---- the jug: what it adds up to in a minute, on a fixed scale
        const jw = Math.max(10, Math.min(fullW * 0.2, 46));
        const jh = Math.max(4, Math.min(artH * 0.82, 130));
        const jTop = midY - jh / 2;
        const jBot = jTop + jh;
        const level = jBot - jh * Math.max(0, Math.min(1, lpm / MAX_LPM));
        ctx.fillStyle = '#eef2ff';
        ctx.fillRect(jx - jw / 2, jTop, jw, jh);
        ctx.fillStyle = FILL;
        ctx.fillRect(jx - jw / 2, level, jw, jBot - level);
        ctx.strokeStyle = JUG;
        ctx.lineWidth = 1.6;
        ctx.strokeRect(jx - jw / 2, jTop, jw, jh);
        // ticks every 5 litres, so the level can be read
        if (jh >= 40) {
            ctx.strokeStyle = JUG;
            ctx.lineWidth = 0.9;
            for (let L = 5; L < MAX_LPM; L += 5) {
                const ty = jBot - jh * (L / MAX_LPM);
                ctx.beginPath();
                ctx.moveTo(jx - jw / 2, ty);
                ctx.lineTo(jx - jw / 2 + jw * 0.3, ty);
                ctx.stroke();
            }
        }

        const rowY = (i: number) => artTop + 2 + artH + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, perBeat + ' mL a beat', hx, rowY(0),
                'bold 11px monospace', MUSCLE, 'center', fullW * 0.46);
        }
        if (fit >= 2) {
            outlineText(ctx, 'in one minute', jx, rowY(1),
                'bold 11px monospace', JUG, 'center', fullW * 0.46);
        }

        outlineText(ctx, rate + ' beats x ' + perBeat + ' mL/beat',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, '= ' + group(mlPerMin) + ' mL = ' + lpm.toFixed(1) + ' L/min',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', FILL, 'center', safeRight - 30);

        fitText(ctx, lpm.toFixed(1) + ' litres a minute', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Beats times volume per beat', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, lpm / MAX_LPM)),
                caption: 'Blood Moved in a Minute',
                low: 'under a resting body',
                high: 'sprinting',
                stops: ['#bfdbfe', '#fcd34d', FILL] as [string, string, string],
            },
            note: 'At ' + rate + ' beats a minute, each pushing ' + perBeat + ' mL, the heart moves '
                + group(mlPerMin) + ' mL a minute -- about ' + lpm.toFixed(1)
                + ' litres. An adult holds roughly 5 litres in total, so that is the whole supply round '
                + (lpm / 5).toFixed(1) + ' times a minute.',
        };
    };

    return (
        <LabCanvas
            title="Two Ways to Pump More"
            readout={({ raw }) => rateOf(raw) + ' beats a minute'}
            controlLabel="Heart Rate"
            controlKey="heartRate"
            controlMin={40}
            controlMax={200}
            controlInitial={70}
            controlDisplay={raw => rateOf(raw) + ' beats/min'}
            control2={{
                label: 'Volume Per Beat',
                key: 'strokeVolume',
                min: 50,
                max: 120,
                initial: 70,
                display: raw => strokeOf(raw) + ' mL',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Body Systems Work Together?"
            completeNote="Ask which factor has room left!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
