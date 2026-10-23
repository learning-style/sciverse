import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: does the cloud keep going up? An earlier version drew two lines on a
// temperature-against-height plot, which is the arithmetic without the weather -- and
// "how much it is rising" is exactly what a reader cannot picture from two lines.
//
// This draws the sky instead. The ground is a curved horizon so it reads as the
// Earth; the sky behind darkens towards the top at a rate the dial sets, so a steep
// lapse rate LOOKS like a sky that turns cold fast; and the bubble is warm-coloured
// when it is warmer than the air it is in. Above it a cumulus towers when it keeps
// rising and shrinks to a puff when it sinks back. The arithmetic is still in the
// footers, where it can be followed.
const BUBBLE_RATE = 10;        // °C per km, the same for every bubble
const MAX_KM = 3;
const WARM = '#b45309';
const COLD = '#0369a1';
const GROUND = '#3f3f46';

const rateOf = (dial: number): number => Math.max(4, Math.min(12, Math.round(dial * 2) / 2));
const heightOf = (dial: number): number => Math.max(0, Math.min(MAX_KM, Math.round(dial * 4) / 4));

export const L2C26StabilityLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const height = heightOf(raw2);
        const diff = (rate - BUBBLE_RATE) * height;
        const warmer = diff > 0.0001;
        const same = Math.abs(rate - BUBBLE_RATE) < 1e-9;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const GROUND_H = 8;
        // the ground strip and its label row are both reserved IN the layout, so the
        // drawing can never reach past artBottom
        const showGround = usable >= ROW + GROUND_H + 30;
        const labelH = showGround ? ROW : 0;
        const skyH = Math.max(10, usable - GROUND_H - labelH);
        const top = artTop + Math.max(0, (usable - (skyH + GROUND_H + labelH)) / 2);
        const skyBottom = top + skyH;

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const yOf = (km: number) => skyBottom - skyH * (km / MAX_KM);

        // the sky, darkening towards the top at the rate the dial sets
        const chill = (rate - 4) / 8;
        const sky = ctx.createLinearGradient(0, top, 0, skyBottom);
        sky.addColorStop(0, 'rgb(' + Math.round(150 - 80 * chill) + ','
            + Math.round(190 - 60 * chill) + ',' + Math.round(235 - 10 * chill) + ')');
        sky.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = sky;
        ctx.fillRect(left, top, fullW, skyH);

        // the ground, curved, so the picture is standing on the Earth
        ctx.fillStyle = GROUND;
        ctx.beginPath();
        ctx.moveTo(left, skyBottom + 6);
        ctx.quadraticCurveTo(left + fullW / 2, skyBottom - 4, left + fullW, skyBottom + 6);
        ctx.lineTo(left + fullW, skyBottom + GROUND_H);
        ctx.lineTo(left, skyBottom + GROUND_H);
        ctx.closePath();
        ctx.fill();

        const bx = left + fullW * 0.34;
        const bubbleR = Math.max(3, Math.min(skyH * 0.08, 11));
        // clamped so the whole circle stays inside the sky at both extremes
        const by = Math.max(top + bubbleR, Math.min(skyBottom - bubbleR, yOf(height)));

        // the cumulus the bubble is building: tall while it keeps rising
        const towerKm = warmer ? Math.min(MAX_KM, height + 0.9 + 0.5 * diff) : height + 0.25;
        const topY = Math.max(top + 2, yOf(Math.min(MAX_KM, towerKm)));
        const puffs = warmer ? 5 : 2;
        ctx.fillStyle = warmer ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.65)';
        for (let i = 0; i < puffs; i++) {
            const f = puffs === 1 ? 0 : i / (puffs - 1);
            const py = by - (by - topY) * f;
            const pr = bubbleR * (warmer ? 1.5 - 0.5 * f : 1.1 - 0.3 * f);
            ctx.beginPath();
            ctx.arc(bx + (i % 2 === 0 ? -1 : 1) * pr * 0.35, py, pr, 0, Math.PI * 2);
            ctx.fill();
        }

        // the bubble, coloured by whether it is warmer than the air it is in
        ctx.fillStyle = same ? '#64748b' : warmer ? WARM : COLD;
        ctx.beginPath();
        ctx.arc(bx, by, bubbleR, 0, Math.PI * 2);
        ctx.fill();

        // and which way it is going
        const room = warmer ? by - bubbleR - top : skyBottom - by - bubbleR;
        if (!same && height > 0 && room > 7) {
            const dir = warmer ? -1 : 1;
            const tipY = by + dir * (bubbleR + Math.min(10, room - 2));
            ctx.strokeStyle = warmer ? WARM : COLD;
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(bx, by + dir * bubbleR);
            ctx.lineTo(bx, tipY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(bx - 4, tipY - dir * 5);
            ctx.lineTo(bx, tipY);
            ctx.lineTo(bx + 4, tipY - dir * 5);
            ctx.stroke();
            const bob = Math.sin(t * 2) * 1.2;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(bx, by + dir * (bubbleR + 4) + bob, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, height === 0 ? 'on the ground'
            : same ? 'same as the air'
                : Math.abs(diff).toFixed(1) + ' °C ' + (warmer ? 'warmer' : 'colder'),
            bx + bubbleR + 6, by + 4, 'bold 11px monospace',
            same ? '#334155' : warmer ? WARM : COLD, 'left', fullW - fullW * 0.34 - 10);

        if (showGround) {
            outlineText(ctx, 'the air cools ' + rate.toFixed(1) + ' °C/km',
                safeRight / 2, skyBottom + GROUND_H + 12,
                'bold 11px monospace', '#334155', 'center', safeRight - 24);
        }

        outlineText(ctx, '(' + rate.toFixed(1) + ' - 10) x ' + height.toFixed(2).replace(/\.?0+$/, '')
            + ' = ' + (diff >= 0 ? '+' : '') + diff.toFixed(1) + ' °C',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, same ? 'the same: it just sits there'
            : warmer ? 'warmer: it keeps rising' : 'colder: it sinks back',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            same ? '#334155' : warmer ? WARM : COLD, 'center', safeRight - 30);

        fitText(ctx, height === 0 ? 'still on the ground'
            : same ? 'no difference'
                : Math.abs(diff).toFixed(1) + ' °C ' + (warmer ? 'warmer' : 'colder'),
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Bubble against the air', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (rate - 4) / 8)),
                caption: 'The Air Cooling Rate',
                low: 'under 10: quiet',
                high: 'over 10: storms',
                stops: [COLD, '#fcd34d', WARM] as [string, string, string],
            },
            note: height === 0
                ? 'The bubble has not risen yet. A rate of ' + rate.toFixed(1)
                  + ' °C/km is ' + (rate > BUBBLE_RATE ? 'above' : rate < BUBBLE_RATE ? 'below' : 'exactly')
                  + ' the 10 a bubble cools at, so the forecast is already decided.'
                : 'After ' + height + ' km the bubble is ' + Math.abs(diff).toFixed(1) + ' °C '
                  + (warmer ? 'warmer than the air around it, so it keeps rising and the cloud towers.'
                      : same ? 'different from the air around it, so it just sits there.'
                          : 'colder than the air around it, so it sinks back and the cloud fades.'),
        };
    };

    return (
        <LabCanvas
            title="Will It Storm Today?"
            readout={({ raw }) => 'The air cools ' + rateOf(raw).toFixed(1) + ' °C/km'}
            controlLabel="The Surroundings' Cooling Rate"
            controlKey="lapseRate"
            controlMin={4}
            controlMax={12}
            controlInitial={6}
            controlDisplay={raw => rateOf(raw).toFixed(1) + ' °C/km'}
            control2={{
                label: 'Height Risen',
                key: 'heightRisen',
                min: 0,
                max: MAX_KM,
                initial: 2,
                display: raw => heightOf(raw) + ' km',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Weather is made by gradients, not amounts!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
