import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: where you are standing changes the answer, so the picture is a globe and
// the learner watches the marker walk from the equator towards the pole. An earlier
// version drew two flat isobar lines and left latitude as a number on a dial, which
// is the one thing in this lesson a reader cannot picture.
//
// The wind is drawn as an ARC ALONG the latitude circle, because that is where it
// goes, and the arc's length is the speed the balance settles to. Near the equator it
// runs away round the globe and saturates, which is what "no balance" looks like. The
// push is drawn poleward across the circle with the deflection equal and opposite, so
// the balance stays visible at every setting.
const RHO = 1.225;
const OMEGA = 7.292e-5;
const WIND_CAP = 150;          // km/h: past this the balance is never reached
const TILT = 22 * Math.PI / 180;
const MAX_ARC = 110 * Math.PI / 180;
const OCEAN = '#dbeafe';
const GRID = '#93c5fd';
const HERE = '#4338ca';
const PUSH = '#b45309';
const DEFLECT = '#0369a1';

const gradOf = (dial: number): number => Math.max(0.5, Math.min(5, Math.round(dial * 2) / 2));
const latOf = (dial: number): number => Math.max(5, Math.min(75, Math.round(dial / 5) * 5));

const windKmh = (grad: number, lat: number): number => {
    const f = 2 * OMEGA * Math.sin(lat * Math.PI / 180);
    return (grad * 100 / 1e5) / (RHO * f) * 3.6;
};

export const L3P26GeostrophicLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grad = gradOf(raw);
        const lat = latOf(raw2);
        const wind = windKmh(grad, lat);
        const runaway = wind > WIND_CAP;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // floored below any stage height that renders, and capped by half the band, so
        // the globe can never be drawn larger than the space it is being fitted into
        const radius = Math.max(6, Math.min(usable / 2 - 2, (safeRight - 56) / 2, 68));
        const showArrows = radius >= 30;
        const showGlobeLabels = radius >= 24;
        const cx = safeRight / 2;
        const cy = artTop + usable / 2;

        // the globe
        ctx.fillStyle = OCEAN;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // a latitude circle, foreshortened: the pole is tilted towards the viewer
        const circleOf = (deg: number) => {
            const p = deg * Math.PI / 180;
            return {
                dy: -radius * Math.sin(p) * Math.cos(TILT),
                a: radius * Math.cos(p),
                b: radius * Math.cos(p) * Math.sin(TILT),
            };
        };
        const drawCircle = (deg: number, colour: string, width: number) => {
            const ring = circleOf(deg);
            if (ring.a < 1) return;
            ctx.strokeStyle = colour;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.ellipse(cx, cy + ring.dy, ring.a, Math.max(0.5, ring.b), 0, 0, Math.PI * 2);
            ctx.stroke();
        };
        [15, 30, 45, 60, 75].forEach(d => drawCircle(d, GRID, 0.8));
        drawCircle(0, '#1e3a8a', 1.6);
        drawCircle(lat, HERE, 2.2);

        // where you are standing: the front of that circle
        const here = circleOf(lat);
        const my = cy + here.dy + here.b;
        ctx.fillStyle = HERE;
        ctx.beginPath();
        ctx.arc(cx, my, 3.6, 0, Math.PI * 2);
        ctx.fill();

        // the wind, as an arc along the very circle it runs on
        const span = Math.min(1, wind / WIND_CAP) * MAX_ARC;
        const onArc = (lam: number) => ({
            x: cx + here.a * Math.sin(lam),
            y: cy + here.dy + here.b * Math.cos(lam),
        });
        if (span > 0.02 && here.a > 2) {
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            for (let k = 0; k <= 24; k++) {
                const p = onArc(span * (k / 24));
                if (k === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            const tip = onArc(span);
            const just = onArc(Math.max(0, span - 0.12));
            const ang = Math.atan2(tip.y - just.y, tip.x - just.x);
            ctx.beginPath();
            ctx.moveTo(tip.x - 7 * Math.cos(ang - 0.5), tip.y - 7 * Math.sin(ang - 0.5));
            ctx.lineTo(tip.x, tip.y);
            ctx.lineTo(tip.x - 7 * Math.cos(ang + 0.5), tip.y - 7 * Math.sin(ang + 0.5));
            ctx.stroke();
            // something travelling along it, so it reads as moving air
            const run = onArc(span * ((t * 0.35) % 1));
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(run.x, run.y, 1.7, 0, Math.PI * 2);
            ctx.fill();
        }

        // the push across the circle, and the deflection equal and opposite
        if (showArrows) {
            const armLen = Math.max(6, (grad / 5) * radius * 0.34);
            const arm = (dir: number, colour: string) => {
                const tipY = my + dir * armLen;
                ctx.strokeStyle = colour;
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.moveTo(cx, my);
                ctx.lineTo(cx, tipY);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx - 4, tipY - dir * 5);
                ctx.lineTo(cx, tipY);
                ctx.lineTo(cx + 4, tipY - dir * 5);
                ctx.stroke();
            };
            arm(-1, PUSH);        // poleward, which is up the screen at the front
            arm(1, DEFLECT);      // the spinning ground pushing back
            // kept on the RIGHT of the marker; the globe's own labels sit on the left,
            // so an arrow label and a globe label can never meet
            outlineText(ctx, 'push', cx + 8, my - armLen + 2,
                'bold 11px monospace', PUSH, 'left', 44);
            outlineText(ctx, 'wind', cx + 8, my + 15,
                'bold 11px monospace', '#0f172a', 'left', 44);
        }

        if (showGlobeLabels) {
            const equatorRow = cy + radius * Math.sin(TILT) + 11;
            // 'here' is dropped when it would sit on top of 'equator', which is exactly
            // when the marker is ON the equator and that label already says where you are
            if (my + 17 <= equatorRow) {
                outlineText(ctx, 'here', cx - 8, my + 4,
                    'bold 11px monospace', HERE, 'right', 44);
            }
            outlineText(ctx, 'equator', cx - 8, equatorRow,
                'bold 11px monospace', '#1e3a8a', 'right', 60);
        }

        outlineText(ctx, 'gradient ' + grad.toFixed(1) + ', latitude ' + lat + '°',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, runaway ? 'too near the equator'
            : 'balance gives ' + wind.toFixed(0) + ' km/h',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            runaway ? PUSH : DEFLECT, 'center', safeRight - 30);

        fitText(ctx, runaway ? 'no balance' : wind.toFixed(0) + ' km/h',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Push cancels deflection', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, wind / WIND_CAP)),
                caption: 'The Wind It Settles To',
                low: 'a steady balance',
                high: 'never settles at all',
                stops: ['#eef2ff', '#fcd34d', PUSH] as [string, string, string],
            },
            note: runaway
                ? 'At ' + lat + '° north the deflection is so weak that the air would need '
                  + wind.toFixed(0) + ' km/h to balance this push, so the arc runs away round the globe and no steady wind is reached.'
                : 'At ' + lat + '° north a gradient of ' + grad.toFixed(1)
                  + ' hPa/100 km balances at ' + wind.toFixed(0)
                  + ' km/h. Move the marker towards the equator and the same push needs a faster wind.',
        };
    };

    return (
        <LabCanvas
            title="Why the Wind Blows Along the Lines"
            readout={({ raw }) => 'Pressure gradient ' + gradOf(raw).toFixed(1) + ' hPa/100km'}
            controlLabel="Pressure Gradient"
            controlKey="geoGradient"
            controlMin={0.5}
            controlMax={5}
            controlInitial={1}
            controlDisplay={raw => gradOf(raw).toFixed(1) + ' hPa/100km'}
            control2={{
                label: 'Latitude',
                key: 'geoLatitude',
                min: 5,
                max: 75,
                initial: 50,
                display: raw => latOf(raw) + '° north',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="A derived constant tells you its own limits!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
