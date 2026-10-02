import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// The Earth in cross-section with one ray on it. The ray is an arc because deep
// rock is faster, and how far round it emerges is what the dials control. Beyond
// 103 degrees the ray must enter the core, where no shear wave can follow.
const R_EARTH = 6371;
const R_CORE = 3480;
const S_SHADOW = 103;
const P_SHADOW_END = 142;
const INDIGO = '#4338ca';
const GONE = '#7f1d1d';

const angleOf = (dial: number): number => Math.max(10, Math.min(180, Math.round(dial)));
const gradOf = (dial: number): number => Math.round(Math.max(0, Math.min(60, dial)));

// How deep a ray bottoms out. With no speed gradient a ray is a straight chord
// between the two points, which is shallow: 97 km at 20 degrees. Real Earth's rays
// dive far deeper for the same arc -- about 600 km at 20 degrees -- because a
// curving ray must leave steeply to come back up only that far round. The dial
// interpolates between the two, with 40% per 1,000 km being real Earth. Beyond the
// shadow the ray is at the core boundary, so there is nothing deeper to show.
const CMB_KM = R_EARTH - R_CORE;
const chordKm = (deg: number): number =>
    R_EARTH * (1 - Math.cos((deg / 2) * Math.PI / 180));
const realKm = (deg: number): number =>
    CMB_KM * Math.pow(Math.min(deg, S_SHADOW) / S_SHADOW, 0.95);
const bottomKm = (deg: number, grad: number): number => {
    if (deg >= S_SHADOW) return CMB_KM;
    const c = chordKm(deg);
    return Math.max(80, Math.min(CMB_KM, c + (realKm(deg) - c) * (grad / 40)));
};

export const L3P22ShadowLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const deg = angleOf(raw);
        const grad = gradOf(raw2);
        const deep = bottomKm(deg, grad);
        const intoCore = deg > S_SHADOW;
        const pBack = deg > P_SHADOW_END;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const room = Math.max(40, usable - CAP - TAIL);
        const rad = Math.max(20, Math.min(room / 2, (safeRight - 48) / 2));
        const blockH = CAP + 2 * rad + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const cx = safeRight / 2;
        const cy = top + CAP + rad;
        const km2px = rad / R_EARTH;

        // the Earth, and the core inside it
        ctx.fillStyle = '#eef2ff';
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = intoCore ? '#fecaca' : '#e2e8f0';
        ctx.beginPath(); ctx.arc(cx, cy, R_CORE * km2px, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#9f1239'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, R_CORE * km2px, 0, Math.PI * 2); ctx.stroke();

        // quake at the top, station round at the chosen angle
        const posOf = (d: number) => {
            const a = -Math.PI / 2 + (d * Math.PI / 180);
            return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
        };
        const [qx, qy] = posOf(0);
        const [sx, sy] = posOf(deg);

        // the ray: an arc bottoming out at `deep`, drawn through its midpoint
        const midA = -Math.PI / 2 + (deg / 2) * Math.PI / 180;
        const midR = (R_EARTH - deep) * km2px;
        const mx = cx + midR * Math.cos(midA);
        const my = cy + midR * Math.sin(midA);
        ctx.strokeStyle = intoCore ? GONE : INDIGO;
        ctx.lineWidth = 2.2;
        ctx.setLineDash(intoCore ? [4, 3] : []);
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.quadraticCurveTo(2 * mx - (qx + sx) / 2, 2 * my - (qy + sy) / 2, sx, sy);
        ctx.stroke();
        ctx.setLineDash([]);

        // the two ends
        ctx.fillStyle = '#0f172a';
        ctx.beginPath(); ctx.arc(qx, qy, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = intoCore ? GONE : INDIGO;
        ctx.beginPath(); ctx.arc(sx, sy, 4 + Math.sin(t * 4) * 0.8, 0, Math.PI * 2); ctx.fill();

        outlineText(ctx, 'one ray, curved by rock that speeds up with depth',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'station ' + deg + '°',
            Math.max(44, Math.min(sx, safeRight - 44)),
            Math.max(Math.min(sy + (sy > cy ? 15 : -8), artBottom - 16), artTop + 22),
            'bold 11px monospace', intoCore ? GONE : INDIGO, 'center', safeRight - 24);
        outlineText(ctx, 'bottoms at ' + deep.toFixed(0) + ' km',
            safeRight / 2, Math.min(top + CAP + 2 * rad + 14, artBottom - 16),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 24);
        outlineText(ctx, intoCore
            ? (pBack ? 'P returns, S never: the core is liquid' : 'both in shadow: the ray is in the core')
            : 'P and S both arrive: the ray stayed in the mantle',
            safeRight / 2, Math.min(top + CAP + 2 * rad + 30, artBottom),
            'bold 12px monospace', intoCore ? GONE : INDIGO, 'center', safeRight - 24);

        outlineText(ctx, 'straight lines put the core at 3,966 km, not 3,480',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'a liquid has no shear strength, so no S-wave crosses',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', GONE, 'center', safeRight - 30);

        fitText(ctx, intoCore ? 'at ' + deg + '°: S-wave shadow' : 'at ' + deg + '°: both arrive',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The absence was the evidence', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, deep / 2900)),
                caption: 'How Deep the Ray Reached',
                low: 'just below the surface',
                high: 'at the core boundary',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: 'A ray recorded ' + deg + '° round bottoms out about ' + deep.toFixed(0)
                + ' km down. ' + (intoCore
                    ? 'Past 103° it must enter the core, and no S-wave is ever recorded there.'
                    : 'It stayed in the mantle, so P and S both arrive.'),
        };
    };

    return (
        <LabCanvas
            title="What the Missing Waves Proved"
            readout={({ raw }) => 'A station ' + angleOf(raw) + ' degrees round'}
            controlLabel="Angle From the Quake"
            controlKey="arcDeg"
            controlMin={10}
            controlMax={180}
            controlInitial={110}
            controlDisplay={raw => angleOf(raw) + '°'}
            control2={{
                label: 'How Fast Speed Rises With Depth',
                key: 'speedGrad',
                min: 0,
                max: 60,
                initial: 40,
                display: raw => gradOf(raw) + '% per 1,000 km',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Waves Help Us See the Invisible?"
            completeNote="An imprecise measurement scatters; a wrong model leans!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
