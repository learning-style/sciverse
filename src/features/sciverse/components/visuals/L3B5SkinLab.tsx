import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces a chart of most cooling = 240 W x (5.6 kPa - vapour pressure). This draws the
// skin instead: the dermis with a blood vessel and the gland's coil, the duct spiralling
// up through the epidermis to its pore, the film on the surface, and the air above.
//
// The lesson's point is that the body's half of evaporation ends at the pore, so the
// drawing has to show BOTH halves separately -- molecules leaving the film, and molecules
// coming back out of the air. Raise the humidity and the returns match the departures:
// the film thickens and runs, the heat arrows stop, and nothing about the gland changes.
const EPI = '#fde68a';
const DERM = '#fda4af';
const VESSEL = '#be123c';
const GLAND = '#2563eb';
const FILM = '#7dd3fc';
const VAPOUR = '#0ea5e9';
const HEAT = '#b45309';

const humidOf = (dial: number): number => Math.max(0, Math.min(100, Math.round(dial / 5) * 5));
const sweatOf = (dial: number): number => Math.max(1, Math.min(10, Math.round(dial)));

export const L3B5SkinLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const humid = humidOf(raw);
        const sweat = sweatOf(raw2);
        const room = 1 - humid / 100;              // how much the air will still take
        const leaving = Math.max(0, Math.min(1, room));
        const drying = leaving > 0.25;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const LBL = 15;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);
        const fit = Math.max(0, Math.min(2, Math.floor((band - 24) / LBL)));
        const artH = Math.max(4, band - fit * LBL - 4);
        const artBase = artTop + 2 + artH;

        // three layers as plain fractions, so they always sum to less than the band --
        // a floor on any of them overruns the dermis on a short stage
        const airH = artH * 0.3;
        const epiH = artH * 0.18;
        const skinY = artTop + 2 + airH;           // the surface
        // below this the dermis has no room for a gland and nothing inside is legible
        const showSkin = artH >= 30;
        const epiBot = skinY + epiH;
        const dermBot = artBase;

        ctx.fillStyle = DERM;
        ctx.fillRect(left, epiBot, fullW, dermBot - epiBot);
        ctx.fillStyle = EPI;
        ctx.fillRect(left, skinY, fullW, epiH);

        // ---- the dermis: a blood vessel bringing heat up
        if (showSkin) {
        const vY = epiBot + (dermBot - epiBot) * 0.62;
        const vW = Math.max(2, Math.min((dermBot - epiBot) * 0.2, 10));
        ctx.strokeStyle = VESSEL;
        ctx.lineWidth = vW;
        ctx.beginPath();
        ctx.moveTo(left + 2, vY);
        ctx.lineTo(left + fullW - 2, vY);
        ctx.stroke();

        // ---- the gland: a coil in the dermis and a duct spiralling up to a pore
        const gx = left + fullW * 0.34;
        const coilR = Math.max(2, Math.min((dermBot - epiBot) * 0.17, 11));
        const coilY = Math.min(dermBot - coilR - 1, epiBot + (dermBot - epiBot) * 0.3);
        ctx.strokeStyle = GLAND;
        ctx.lineWidth = Math.max(1.2, coilR * 0.3);
        ctx.beginPath();
        for (let a = 0; a <= 26; a++) {
            const th = a / 26 * Math.PI * 4.5;
            const rr = coilR * (0.3 + 0.7 * a / 26);
            const px = gx + Math.cos(th) * rr;
            const py = coilY + Math.sin(th) * rr * 0.72;
            if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        // the duct, spiralling up through the epidermis to the pore
        const ductW = Math.max(1, coilR * 0.26);
        ctx.lineWidth = ductW;
        ctx.beginPath();
        const steps = 22;
        for (let k = 0; k <= steps; k++) {
            const f = k / steps;
            const py = coilY - coilR * 0.3 - (coilY - coilR * 0.3 - skinY) * f;
            const px = gx + Math.sin(f * Math.PI * 3.2) * coilR * 0.5;
            if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        // salt drawn back out through the duct walls
        if (coilR >= 6) {
            ctx.fillStyle = VESSEL;
            for (let k = 1; k <= 3; k++) {
                const f = k / 4;
                const py = coilY - coilR * 0.3 - (coilY - coilR * 0.3 - skinY) * f;
                const px = gx + Math.sin(f * Math.PI * 3.2) * coilR * 0.5;
                const side = k % 2 === 0 ? 1 : -1;
                ctx.beginPath();
                ctx.arc(px + side * ductW * 2.4, py, Math.max(0.7, ductW * 0.5), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        }

        // ---- the film on the surface: thick when it cannot evaporate
        const filmH = Math.max(1, Math.min(airH * 0.3, 2 + sweat * 0.5 * (1.4 - leaving)));
        ctx.fillStyle = FILM;
        ctx.fillRect(left, skinY - filmH, fullW, filmH);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(left, skinY - filmH);
        ctx.lineTo(left + fullW, skinY - filmH);
        ctx.stroke();
        // and running off, when it cannot leave as vapour
        if (!drying && filmH >= 3) {
            ctx.fillStyle = FILM;
            for (let k = 0; k < 3; k++) {
                const dx = left + fullW * (0.2 + 0.3 * k);
                const dy = skinY - filmH + ((t * 26 + k * 17) % Math.max(6, airH * 0.5));
                ctx.beginPath();
                ctx.arc(dx, dy, Math.max(1, filmH * 0.5), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ---- the air: how full of water it already is, and the two-way traffic
        const dots = showSkin ? Math.round(4 + humid / 100 * 16) : 0;
        const dotR = Math.max(0.9, airH * 0.035);
        for (let k = 0; k < dots; k++) {
            const px = left + fullW * ((k * 0.137 + 0.05) % 0.92);
            const py = artTop + 3 + dotR
                + ((k * 0.21 + t * 0.05) % 1) * Math.max(1, airH - filmH - 6 - dotR * 2);
            ctx.fillStyle = VAPOUR;
            ctx.beginPath();
            ctx.arc(px, py, dotR, 0, Math.PI * 2);
            ctx.fill();
        }
        // departures, and returns -- as many returns as departures once the air is full
        const flights = showSkin ? 5 : 0;
        const flR = Math.max(0.9, airH * 0.04);
        const span = Math.max(1, airH - filmH - 6 - flR * 2);
        for (let k = 0; k < flights; k++) {
            const px = left + fullW * (0.12 + 0.17 * k);
            const up = (t * 0.6 + k * 0.2) % 1;
            if (k / flights < leaving) {
                const py = skinY - filmH - flR - up * span;
                ctx.fillStyle = VAPOUR;
                ctx.beginPath();
                ctx.arc(px, py, flR, 0, Math.PI * 2);
                ctx.fill();
            } else {
                const py = artTop + 3 + flR + (1 - up) * span;
                ctx.strokeStyle = VAPOUR;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(px, py, flR, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        // heat leaving, only as fast as the film can evaporate
        if (leaving > 0.12 && airH >= 14) {
            const n = Math.max(1, Math.round(leaving * 4));
            ctx.strokeStyle = HEAT;
            ctx.lineWidth = 1.6;
            for (let k = 0; k < n; k++) {
                const px = left + fullW * (0.62 + 0.09 * k);
                const top = skinY - filmH - Math.min(14, airH * 0.5);
                ctx.beginPath();
                ctx.moveTo(px, skinY - filmH - 2);
                ctx.lineTo(px, top);
                ctx.moveTo(px - 2.5, top + 3.5);
                ctx.lineTo(px, top);
                ctx.lineTo(px + 2.5, top + 3.5);
                ctx.stroke();
            }
        }

        const rowY = (i: number) => artBase + 12 + i * LBL;
        if (fit >= 1) {
            outlineText(ctx, 'coil, duct and pore',
                safeRight / 2, rowY(0), 'bold 10px monospace', GLAND, 'center', safeRight - 24);
        }
        if (fit >= 2) {
            outlineText(ctx, 'air, epidermis, dermis',
                safeRight / 2, rowY(1), 'bold 10px monospace', '#7c2d12', 'center', safeRight - 24);
        }

        outlineText(ctx, 'air ' + humid + '% full of water',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', VAPOUR, 'center', safeRight - 30);
        outlineText(ctx, drying ? 'molecules leave, taking heat'
            : 'as many return as leave',
            safeRight / 2, stageBottom - 14, 'bold 11px monospace',
            drying ? HEAT : '#64748b', 'center', safeRight - 30);

        fitText(ctx, drying ? 'the film is drying' : 'the film is running',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Where the cooling happens', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: leaving,
                caption: 'Room Left in the Air',
                low: 'none: the film just sits',
                high: 'dry: every molecule leaves',
                stops: ['#64748b', '#7dd3fc', HEAT] as [string, string, string],
            },
            note: drying
                ? 'The air is ' + humid + '% full, so molecules leave the film faster than they return. The film thins, and each one that leaves takes heat from the skin with it.'
                : 'The air is ' + humid + '% full, so as many molecules return to the film as leave it. The gland is working just as hard, the film thickens and runs, and the heat stays in.',
        };
    };

    return (
        <LabCanvas
            title="The Gland and the Air"
            readout={({ raw }) => humidOf(raw) + '% humidity'}
            controlLabel="Humidity"
            controlKey="skinHumidity"
            controlMin={0}
            controlMax={100}
            controlInitial={40}
            controlDisplay={raw => humidOf(raw) + '%'}
            control2={{
                label: 'Sweat Rate',
                key: 'skinSweat',
                min: 1,
                max: 10,
                initial: 5,
                display: raw => sweatOf(raw) + ' of 10',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Can a Small Force Do a Big Job?"
            completeNote="The skin delivers; the air decides!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
