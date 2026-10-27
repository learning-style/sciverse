import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Replaces a chart of most cooling = 240 W x (5.6 kPa - vapour pressure). This draws the
// skin instead: the inner skin with a blood vessel and the gland's coil, the duct
// spiralling up through the outer skin to its pore, the sweat on the surface, and the air.
//
// The lesson's point is that the body's half of evaporation ends at the pore, so the
// drawing has to show BOTH halves separately -- water leaving the sweat, and water coming
// back out of the air. Raise the humidity and the returns match the departures: the sweat
// thickens and runs, the heat arrows stop, and nothing about the gland changes.
//
// A reader said the canvas printed the word 'film', which the lab had invented, and asked
// what the coloured layers were. Both were the same defect: the words were a detached list
// under the drawing (`coil, duct and pore` / `air, epidermis, dermis`), so a reader looking
// only at the picture had six terms and no way to map them onto anything. Every label now
// sits INSIDE the thing it names, in a plain word -- air, sweat, outer skin, inner skin,
// warm blood, sweat gland, heat leaves -- and the bands cannot collide because they do not
// overlap. 'film' is gone from the lesson too; it is a layer of sweat.
const EPI = '#fde68a';
const DERM = '#fda4af';
const VESSEL = '#be123c';
const GLAND = '#2563eb';
const SWEAT = '#7dd3fc';
const VAPOUR = '#0ea5e9';
const HEAT = '#b45309';
const SKIN_INK = '#7c2d12';

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
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        // every label is inside the drawing now, so no rows are reserved beneath it
        const band = Math.max(8, artBottom - artTop);
        const artH = Math.max(4, band - 4);
        const artBase = artTop + 2 + artH;

        // three layers as plain fractions, so they always sum to less than the band --
        // a floor on any of them overruns the inner skin on a short stage
        const airH = artH * 0.3;
        const epiH = artH * 0.18;
        const skinY = artTop + 2 + airH;           // the surface
        // below this the inner skin has no room for a gland and nothing inside is legible
        const showSkin = artH >= 30;
        const epiBot = skinY + epiH;
        const dermBot = artBase;
        const dermH = dermBot - epiBot;

        ctx.fillStyle = DERM;
        ctx.fillRect(left, epiBot, fullW, dermH);
        ctx.fillStyle = EPI;
        ctx.fillRect(left, skinY, fullW, epiH);

        const vY = epiBot + dermH * 0.62;
        const gx = left + fullW * 0.34;
        const coilR = Math.max(2, Math.min(dermH * 0.17, 11));
        const coilY = Math.min(dermBot - coilR - 1, epiBot + dermH * 0.3);

        // ---- the inner skin: a blood vessel bringing heat up, and the gland
        if (showSkin) {
            const vW = Math.max(2, Math.min(dermH * 0.2, 10));
            ctx.strokeStyle = VESSEL;
            ctx.lineWidth = vW;
            ctx.beginPath();
            ctx.moveTo(left + 2, vY);
            ctx.lineTo(left + fullW - 2, vY);
            ctx.stroke();

            // the gland: a coil in the inner skin and a duct spiralling up to a pore
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

        // ---- the sweat on the surface: thick when it cannot evaporate
        const wetH = Math.max(1, Math.min(airH * 0.3, 2 + sweat * 0.5 * (1.4 - leaving)));
        ctx.fillStyle = SWEAT;
        ctx.fillRect(left, skinY - wetH, fullW, wetH);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(left, skinY - wetH);
        ctx.lineTo(left + fullW, skinY - wetH);
        ctx.stroke();
        // and running off, when it cannot leave as vapour
        if (!drying && wetH >= 3) {
            ctx.fillStyle = SWEAT;
            for (let k = 0; k < 3; k++) {
                const dx = left + fullW * (0.2 + 0.3 * k);
                const dy = skinY - wetH + ((t * 26 + k * 17) % Math.max(6, airH * 0.5));
                ctx.beginPath();
                ctx.arc(dx, dy, Math.max(1, wetH * 0.5), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ---- the air: how full of water it already is, and the two-way traffic
        const dots = showSkin ? Math.round(4 + humid / 100 * 16) : 0;
        const dotR = Math.max(0.9, airH * 0.035);
        for (let k = 0; k < dots; k++) {
            const px = left + fullW * ((k * 0.137 + 0.05) % 0.92);
            const py = artTop + 3 + dotR
                + ((k * 0.21 + t * 0.05) % 1) * Math.max(1, airH - wetH - 6 - dotR * 2);
            ctx.fillStyle = VAPOUR;
            ctx.beginPath();
            ctx.arc(px, py, dotR, 0, Math.PI * 2);
            ctx.fill();
        }
        // departures, and returns -- as many returns as departures once the air is full
        const flights = showSkin ? 5 : 0;
        const flR = Math.max(0.9, airH * 0.04);
        const span = Math.max(1, airH - wetH - 6 - flR * 2);
        for (let k = 0; k < flights; k++) {
            const px = left + fullW * (0.12 + 0.17 * k);
            const up = (t * 0.6 + k * 0.2) % 1;
            if (k / flights < leaving) {
                const py = skinY - wetH - flR - up * span;
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

        // ---- heat leaving, only as fast as the sweat can evaporate. Drawn up to a fixed
        // top so that the label sitting on the top label row is right at the arrow tips.
        const yTop = artTop + 2 + 11;
        const arrowTop = artTop + 2 + 18;
        const arrowBot = skinY - wetH - 2;
        const showHeat = leaving > 0.12 && arrowBot - arrowTop >= 10;
        if (showHeat) {
            const n = Math.max(1, Math.round(leaving * 4));
            ctx.strokeStyle = HEAT;
            ctx.lineWidth = 1.6;
            for (let k = 0; k < n; k++) {
                const px = left + fullW * (0.62 + 0.09 * k);
                ctx.beginPath();
                ctx.moveTo(px, arrowBot);
                ctx.lineTo(px, arrowTop);
                ctx.moveTo(px - 2.5, arrowTop + 3.5);
                ctx.lineTo(px, arrowTop);
                ctx.lineTo(px + 2.5, arrowTop + 3.5);
                ctx.stroke();
            }
        }

        // ---- the labels. Each one sits inside the thing it names, in a plain word, and
        // the three bands cannot collide with one another because they do not overlap.
        const tag = (s: string, x: number, y: number, align: 'left' | 'right', c: string) =>
            outlineText(ctx, s, x, y, 'bold 10px monospace', c, align, fullW - 8);
        const leftX = left + 4;
        const rightX = left + fullW - 4;
        if (airH >= 16) {
            tag('air', leftX, yTop, 'left', VAPOUR);
            if (showHeat) tag('heat leaves', rightX, yTop, 'right', HEAT);
        }
        const yWet = skinY - wetH - 3;
        if (yWet - yTop >= 13) tag('sweat', leftX, yWet, 'left', '#0369a1');
        if (epiH >= 13) tag('outer skin', leftX, epiBot - 3, 'left', SKIN_INK);
        if (dermH >= 14) tag('inner skin', leftX, dermBot - 4, 'left', SKIN_INK);
        if (showSkin && dermH >= 37) tag('warm blood', leftX, vY - 3, 'left', VESSEL);
        if (showSkin && dermH >= 30 && coilY + 3 <= dermBot - 2) {
            tag('sweat gland', rightX, coilY + 3, 'right', GLAND);
        }

        outlineText(ctx, 'air ' + humid + '% full of water',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', VAPOUR, 'center', safeRight - 30);

        fitText(ctx, drying ? 'water leaves with heat' : 'as many come back',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, drying ? 'The sweat thins' : 'The sweat runs off instead',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: leaving,
                caption: 'Room Left in the Air',
                low: 'none: the sweat stays',
                high: 'dry: the water leaves',
                stops: ['#64748b', SWEAT, HEAT] as [string, string, string],
            },
            note: drying
                ? 'The air is ' + humid + '% full, so water leaves the sweat faster than it comes back. The layer thins, and every molecule that leaves takes heat from the skin with it.'
                : 'The air is ' + humid + '% full, so as much water comes back to the sweat as leaves it. The gland is working just as hard, the layer thickens and runs off, and the heat stays in.',
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
