import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the damage is invisible and it adds up. So the picture is a bar of
// life being used, with the wire above it bending through its real angle -- and
// below the fatigue limit the bar simply never fills, which is the point.
const ANCHOR_N = 4;            // a paperclip bent right over goes in about 4 bends
const LIMIT_DEG = 12;          // below this a steel wire survives any number
const INDIGO = '#4338ca';
const GONE = '#7f1d1d';

const angleOf = (dial: number): number => Math.max(5, Math.min(90, Math.round(dial / 5) * 5));
const bendsOf = (dial: number): number => Math.max(0, Math.min(300, Math.round(dial)));
const lifeOf = (deg: number): number => ANCHOR_N * Math.pow(90 / deg, 3);

export const L2P23FatigueLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const deg = angleOf(raw);
        const bends = bendsOf(raw2);
        const safeForEver = deg < LIMIT_DEG;
        const life = lifeOf(deg);
        const used = safeForEver ? 0 : Math.min(1, bends / life);
        const snapped = !safeForEver && bends >= life;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const room = Math.max(40, usable - CAP - TAIL);
        const blockH = CAP + room + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const bandTop = top + CAP;

        const left = 24;
        const fullW = Math.max(100, safeRight - 48);
        const wireH = Math.max(22, Math.min(64, room * 0.52));
        const barH = Math.max(12, Math.min(22, room * 0.2));
        const wireY = bandTop + wireH / 2;
        const barTop = bandTop + wireH + Math.max(8, room * 0.12);

        // the wire, bending through its real angle, hinged at the middle
        // The arm sweeps up through the full bend angle, so its length is limited by
        // the band's height, not the stage's width -- at 90 degrees it is vertical.
        const armLen = Math.max(8, wireH / 2 - 3);
        const swing = (Math.sin(t * 2) + 1) / 2;
        const theta = (deg * Math.PI / 180) * swing;
        const hx = left + fullW / 2;
        ctx.strokeStyle = snapped ? GONE : INDIGO;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(hx - armLen, wireY);
        ctx.lineTo(hx, wireY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hx, wireY);
        if (snapped) {
            // broken: the free arm has fallen away from the hinge
            ctx.moveTo(hx + 6, wireY + 4);
            ctx.lineTo(hx + 6 + armLen * Math.cos(0.5), wireY + 4 + armLen * Math.sin(0.5));
        } else {
            ctx.lineTo(hx + armLen * Math.cos(theta), wireY - armLen * Math.sin(theta));
        }
        ctx.stroke();
        // the hinge, where the damage collects
        ctx.fillStyle = snapped ? GONE : '#0f172a';
        ctx.beginPath();
        ctx.arc(hx, wireY, 3.4, 0, Math.PI * 2);
        ctx.fill();

        // the life being used up -- invisible in the wire, visible here
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(left, barTop, fullW, barH);
        ctx.fillStyle = snapped ? GONE : (used > 0.75 ? '#f59e0b' : INDIGO);
        ctx.fillRect(left, barTop, fullW * used, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, barTop, fullW, barH);

        outlineText(ctx, 'the wire looks the same all the way to the last bend',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'bending it ' + deg + '° each time',
            safeRight / 2, Math.max(wireY - armLen - 6, bandTop + 11),
            'bold 11px monospace', snapped ? GONE : INDIGO, 'center', safeRight - 24);
        const rowOne = Math.min(barTop + barH + 15, artBottom - 14);
        const rowTwo = Math.min(barTop + barH + 29, artBottom);
        outlineText(ctx, safeForEver ? 'life used: none, ever'
            : 'life used ' + (used * 100).toFixed(0) + '%',
            safeRight / 2, rowOne,
            'bold 12px monospace', snapped ? GONE : INDIGO, 'center', safeRight - 24);
        outlineText(ctx, safeForEver
            ? 'below the ' + LIMIT_DEG + '° fatigue limit: the bends are free'
            : snapped ? 'snapped after ' + bends + ' bends'
                : bends + ' bends done, about ' + Math.max(0, Math.ceil(life - bends)) + ' left',
            safeRight / 2, rowTwo,
            'bold 11px monospace', snapped ? GONE : '#334155', 'center', safeRight - 24);

        outlineText(ctx, safeForEver
            ? deg + '° is under the ' + LIMIT_DEG + '° limit, so it never breaks'
            : 'life = 4 x (90/' + deg + ')³ = ' + life.toFixed(0) + ' bends',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'halve the bend and the life goes up eight times',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', INDIGO, 'center', safeRight - 30);

        fitText(ctx, safeForEver ? 'it never breaks'
            : snapped ? 'snapped' : (used * 100).toFixed(0) + '% of its life used',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The small load, repeated', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, used)),
                caption: 'Life Used Up',
                low: 'as good as new',
                high: 'about to snap',
                stops: ['#eef2ff', '#fcd34d', GONE] as [string, string, string],
            },
            note: safeForEver
                ? 'Bending it ' + deg + '° is under the ' + LIMIT_DEG
                  + '° fatigue limit, so the wire survives any number of bends at all.'
                : 'A ' + deg + '° bend gives 4 x (90/' + deg + ')³ = ' + life.toFixed(0)
                  + ' bends, and ' + bends + ' of them uses ' + (used * 100).toFixed(0) + '%.',
        };
    };

    return (
        <LabCanvas
            title="How Many Bends Before It Snaps?"
            readout={({ raw }) => 'Bending it ' + angleOf(raw) + ' degrees'}
            controlLabel="Bend Angle"
            controlKey="bendAngle"
            controlMin={5}
            controlMax={90}
            controlInitial={45}
            controlDisplay={raw => angleOf(raw) + '°'}
            control2={{
                label: 'Bends So Far',
                key: 'bendCount',
                min: 0,
                max: 300,
                initial: 16,
                display: raw => bendsOf(raw) + ' bends',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="Halve the bend, eight times the life!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
