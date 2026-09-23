import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const TOTAL = 50;
const WALK_KM = 10;
const INDIGO = '#4338ca';
const NEEDLE = '#dc2626';

const dipOf = (dial: number): number => Math.max(0, Math.min(85, Math.round(dial)));
const decOf = (dial: number): number => Math.max(-25, Math.min(25, Math.round(dial)));

export const L2P16CompassLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const dip = dipOf(raw);
        const dec = decOf(raw2);
        const horizontal = TOTAL * Math.cos((dip * Math.PI) / 180);
        const off = WALK_KM * Math.tan((Math.abs(dec) * Math.PI) / 180);
        const side = dec >= 0 ? 'east' : 'west';

        // Real available height; bands are shares of it, so nothing can overflow
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // 2r + the label beneath must fit, so bound the radius by the stage
        const r = Math.max(18, Math.min(100, usable * 0.28, (usable - 8) / 2));
        const dipBand = Math.max(0, Math.min(72, usable - (2 * r + 34)));
        const showDip = dipBand >= 44;
        const blockH = 2 * r + 34 + (showDip ? dipBand : 0);
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const cx = safeRight / 2;
        const cy = top + r;

        // The compass rose
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        for (let i = 0; i < 24; i++) {
            const a = (i / 24) * Math.PI * 2;
            const inner = i % 6 === 0 ? r - 10 : r - 5;
            ctx.beginPath();
            ctx.moveTo(cx + Math.sin(a) * inner, cy - Math.cos(a) * inner);
            ctx.lineTo(cx + Math.sin(a) * r, cy - Math.cos(a) * r);
            ctx.stroke();
        }

        // True north: straight up, the direction the map is drawn around
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy - r);
        ctx.stroke();
        outlineText(ctx, 'true north', cx, cy - r - 8, '10px monospace', '#0f172a', 'center', safeRight * 0.4);

        // Magnetic north, and the needle that points along it
        const a = (dec * Math.PI) / 180;
        const nx = cx + Math.sin(a) * r;
        const ny = cy - Math.cos(a) * r;
        ctx.save();
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = NEEDLE;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - Math.sin(a) * (r * 0.4), cy + Math.cos(a) * (r * 0.4));
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        outlineText(ctx, `magnetic north ${Math.abs(dec)}° ${side}`, cx, Math.min(cy + r + 18, artBottom),
            'bold 11px monospace', NEEDLE, 'center', safeRight - 30);

        // The field arrow tipped into the ground, and the part left to turn the needle
        if (showDip) {
            const gy = top + 2 * r + 34 + dipBand * 0.55;
            const gx = 44;
            const gw = safeRight - 88;
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(gx, gy);
            ctx.lineTo(gx + gw, gy);
            ctx.stroke();
            const len = Math.min(gw * 0.42, dipBand * 0.9);
            const ex = gx + 40 + Math.cos((dip * Math.PI) / 180) * len;
            const ey = gy + Math.sin((dip * Math.PI) / 180) * len * 0.5;
            ctx.strokeStyle = INDIGO;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(gx + 40, gy);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.save();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = INDIGO;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(gx + 40, gy);
            ctx.lineTo(gx + 40 + Math.cos((dip * Math.PI) / 180) * len, gy);
            ctx.stroke();
            ctx.restore();
            outlineText(ctx, `dip ${dip}°`, gx + 40, gy - 8, '10px monospace', INDIGO, 'left', 90);
            outlineText(ctx, 'horizontal field', gx + 40 + Math.cos((dip * Math.PI) / 180) * len + 6,
                gy + 4, '10px monospace', INDIGO, 'left', 130);
        }

        outlineText(ctx, `${TOTAL} x cos(${dip}°) = ${horizontal.toFixed(1)} µT turning the needle`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${WALK_KM} km x tan(${Math.abs(dec)}°) = ${off.toFixed(2)} km off`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', NEEDLE, 'center', safeRight - 30);

        fitText(ctx, `horizontal field ${horizontal.toFixed(1)} µT of ${TOTAL} µT`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Cosine for strength, tangent for distance', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, horizontal / TOTAL)),
                caption: 'Field Turning the Needle',
                low: '0 µT',
                high: '50 µT',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: `At a dip of ${dip}°, only ${horizontal.toFixed(1)} µT of the ${TOTAL} µT field is left to turn the needle. With magnetic north ${Math.abs(dec)}° ${side} of true north, a ${WALK_KM} km walk on an uncorrected bearing ends ${off.toFixed(2)} km off.`,
        };
    };

    return (
        <LabCanvas
            title="How Far Off Is North?"
            readout={({ raw }) => `A field dipping ${dipOf(raw)}° into the ground`}
            controlLabel="Dip Angle"
            controlKey="dipAngle"
            controlMin={0}
            controlMax={85}
            controlInitial={66}
            controlDisplay={raw => `${dipOf(raw)}°`}
            control2={{
                label: 'Declination',
                key: 'declination',
                min: -25,
                max: 25,
                initial: 10,
                display: raw => `${Math.abs(decOf(raw))}° ${decOf(raw) >= 0 ? 'east' : 'west'}`,
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Far Off Is North?"
            completeNote="total field x cos(dip)!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
