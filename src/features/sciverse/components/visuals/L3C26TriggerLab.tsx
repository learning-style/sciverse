import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// This was a temperature-against-height plot with two sloped lines and no axis labels
// at all, drawn sideways so that colder was to the LEFT. A reader had to know which
// colour was the bubble, read a slope off an unlabelled axis, and then compare the two
// lines HORIZONTALLY to see which was warmer -- three inferences before the point.
// CLAUDE.md already records that exact failure for L2C26, which was rebuilt as a sky;
// its Level 3 sibling was left as the graph.
//
// So this is the sky. The one idea is that the climb has two parts: below the level
// where it breaks even the bubble is colder than the air around it and sinks back, so
// something has to lift it, and above that line it rises on its own. Those are drawn
// as two tinted bands with the dividing line labelled, which is the forecast. The
// bubble rises through them on a loop, coloured by whether it is colder or not, with
// an arrow for the way it would go and a cloud that appears at its cloud base -- the
// height where condensing starts and the cooling slows from 10 to 5.5.
const DRY = 10;
const SAT = 5.5;
const MAX_KM = 6;
const GROUND_H = 8;
const COLD = '#0369a1';        // the bubble while it is colder than the air: it sinks
const WARM = '#b45309';        // once it is not: it rises
const LIFT = '#be123c';
const FREE = '#047857';

const rateOf = (dial: number): number => Math.max(4, Math.min(12, Math.round(dial * 2) / 2));
const baseOf = (dial: number): number => Math.max(0.5, Math.min(2.5, Math.round(dial * 4) / 4));

export const L3C26TriggerLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const rate = rateOf(raw);
        const base = baseOf(raw2);
        // <= and not <, or a rate of exactly 5.5 falls through both branches: there the
        // saturated bubble is level for ever, so it never breaks even and stable is right
        const stable = rate <= SAT;
        const outright = rate > DRY;
        const crossing = !stable && !outright ? (DRY - SAT) * base / (rate - SAT) : 0;
        const reaches = !stable && !outright && crossing <= MAX_KM;
        const show = (km: number) => km.toFixed(2).replace(/\.?0+$/, '');

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);

        // floored below any stage height that renders, and the ground strip reserved in
        // the layout, so the sky can never be drawn past artBottom
        const skyH = Math.max(10, usable - GROUND_H);
        const skyTop = artTop + Math.max(0, (usable - (skyH + GROUND_H)) / 2);
        const skyBottom = skyTop + skyH;
        const yOf = (km: number) => skyBottom - skyH * (km / MAX_KM);

        // how far up the bubble still has to be helped
        const liftTo = outright ? 0 : reaches ? crossing : MAX_KM;
        const liftY = yOf(liftTo);

        // the sky, and the two bands that are the whole forecast
        const sky = ctx.createLinearGradient(0, skyTop, 0, skyBottom);
        sky.addColorStop(0, '#bfdbfe');
        sky.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = sky;
        ctx.fillRect(left, skyTop, fullW, skyH);
        if (liftY < skyBottom) {
            ctx.fillStyle = 'rgba(190,18,60,0.13)';
            ctx.fillRect(left, liftY, fullW, skyBottom - liftY);
        }
        if (liftY > skyTop && !stable) {
            ctx.fillStyle = 'rgba(4,120,87,0.14)';
            ctx.fillRect(left, skyTop, fullW, liftY - skyTop);
        }

        // the ground, curved, so the picture is standing on the Earth
        ctx.fillStyle = '#3f3f46';
        ctx.beginPath();
        ctx.moveTo(left, skyBottom + 6);
        ctx.quadraticCurveTo(left + fullW / 2, skyBottom - 4, left + fullW, skyBottom + 6);
        ctx.lineTo(left + fullW, skyBottom + GROUND_H);
        ctx.lineTo(left, skyBottom + GROUND_H);
        ctx.closePath();
        ctx.fill();

        // the line it has to be lifted past
        if (!outright && !stable && reaches) {
            ctx.strokeStyle = FREE;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(left, liftY);
            ctx.lineTo(left + fullW, liftY);
            ctx.stroke();
        }

        // the cloud base: where condensing starts and the cooling slows to 5.5
        const baseY = yOf(base);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(left, baseY);
        ctx.lineTo(left + fullW, baseY);
        ctx.stroke();
        ctx.setLineDash([]);

        // the bubble, climbing on a loop
        const km = (t * 0.6) % MAX_KM;
        const diff = km <= base ? (rate - DRY) * km
            : (rate - DRY) * base + (rate - SAT) * (km - base);
        const sinking = diff < -0.001;
        const bx = left + fullW * 0.3;
        const r = Math.max(3, Math.min(skyH * 0.055, fullW * 0.035, 10));
        // clamped, or the circle hangs below the ground at 0 km and past the top at 6
        const by = Math.max(skyTop + r, Math.min(skyBottom - r, yOf(km)));

        if (km >= base && r >= 4 && by - r * 2.05 >= skyTop) {
            const puff = (dx: number, dy: number, rr: number) => {
                ctx.beginPath();
                ctx.arc(bx + dx, by + dy, rr, 0, Math.PI * 2);
                ctx.fill();
            };
            ctx.fillStyle = 'rgba(255,255,255,0.92)';
            puff(-r * 0.8, -r * 0.9, r * 0.62);
            puff(0, -r * 1.25, r * 0.8);
            puff(r * 0.85, -r * 0.9, r * 0.6);
        }
        ctx.fillStyle = sinking ? COLD : WARM;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fill();

        // which way it would go, and how strongly
        const room = sinking ? skyBottom - by - r : by - skyTop - r;
        const arm = Math.min(Math.abs(diff) * 3.4, 16, Math.max(0, room - 3));
        if (arm > 4) {
            const dir = sinking ? 1 : -1;
            const tip = by + dir * (r + arm);
            ctx.strokeStyle = sinking ? COLD : WARM;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(bx, by + dir * r);
            ctx.lineTo(bx, tip);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(bx - 4, tip - dir * 5);
            ctx.lineTo(bx, tip);
            ctx.lineTo(bx + 4, tip - dir * 5);
            ctx.stroke();
        }

        // In-sky labels. The two line labels are left- and right-aligned so they can
        // never meet each other, and each band word sits in a FIXED slot near its end
        // of the sky, dropped when a line label has drifted within 13px of it.
        const inSky = (y: number) => Math.max(skyTop + 9, Math.min(skyBottom - 2, y));
        const baseLabelY = inSky(baseY - 4);
        const liftLabelY = inSky(liftY - 4);
        const lines: number[] = [baseLabelY];
        if (!outright && !stable && reaches) lines.push(liftLabelY);
        const clearOf = (y: number) => lines.every(l => Math.abs(l - y) >= 13);

        if (skyH >= 42) {
            outlineText(ctx, 'cloud base ' + show(base) + ' km', left + 4, baseLabelY,
                'bold 10px monospace', '#334155', 'left', fullW - 8);
        }
        if (skyH >= 62 && !outright && !stable && reaches) {
            outlineText(ctx, 'breaks even ' + crossing.toFixed(1) + ' km',
                left + fullW - 4, liftLabelY, 'bold 10px monospace', FREE, 'right', fullW - 8);
        }
        if (skyH >= 92) {
            const lowY = skyBottom - 7;
            const highY = skyTop + 11;
            if (liftY < skyBottom - 18 && clearOf(lowY)) {
                outlineText(ctx, stable ? 'colder all the way up' : 'needs a lift',
                    left + fullW / 2, lowY, 'bold 10px monospace', LIFT, 'center', fullW - 8);
            }
            if (liftY > skyTop + 18 && !stable && clearOf(highY)) {
                outlineText(ctx, 'rises on its own', left + fullW / 2, highY,
                    'bold 10px monospace', FREE, 'center', fullW - 8);
            }
        }

        outlineText(ctx, stable ? 'rate ' + show(rate) + ': never gaining'
            : outright ? show(rate) + ' beats 10 from the ground'
                : 'gaining ' + show(rate) + ' - 5.5 = ' + (rate - SAT).toFixed(1) + ' °C/km',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, stable ? 'no lift will start it'
            : outright ? 'no lift needed at all'
                : '4.5 x ' + show(base) + ' / ' + (rate - SAT).toFixed(1) + ' = '
                  + crossing.toFixed(1) + ' km',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            stable ? COLD : outright ? WARM : FREE, 'center', safeRight - 30);

        fitText(ctx, stable ? 'colder all the way up'
            : outright ? 'rises from the ground'
                : reaches ? 'lift it to ' + crossing.toFixed(1) + ' km'
                    : 'over 6 km of lift',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, stable ? 'Genuinely stable'
            : outright ? 'Unstable outright' : 'Conditionally unstable',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (rate - 4) / 8)),
                caption: 'The Air Cooling Rate',
                low: 'under 5.5: stable',
                high: 'over 10: by itself',
                stops: [COLD, '#6ee7b7', WARM] as [string, string, string],
            },
            note: stable
                ? 'The air cools ' + show(rate) + ' °C/km, slower than the 5.5 a clouded bubble'
                  + ' cools at, so the bubble is colder than the air at every height. No lift will make this day storm.'
                : outright
                    ? 'The air cools ' + show(rate) + ' °C/km, faster than the 10 a dry bubble'
                      + ' cools at, so the bubble is already the warmer one at the first metre and needs no lift at all.'
                    : 'Below the cloud base the bubble falls ' + (DRY - rate).toFixed(1)
                      + ' °C/km behind; above it, once its cloud has formed, it is gaining '
                      + (rate - SAT).toFixed(1) + ' °C/km and breaks even at '
                      + crossing.toFixed(1) + ' km. Something must lift it that far.',
        };
    };

    return (
        <LabCanvas
            title="The Day That Is Both"
            readout={({ raw }) => 'The air cools ' + rateOf(raw).toFixed(1) + ' °C/km'}
            controlLabel="The Surroundings' Cooling Rate"
            controlKey="triggerRate"
            controlMin={4}
            controlMax={12}
            controlInitial={7}
            controlDisplay={raw => rateOf(raw).toFixed(1) + ' °C/km'}
            control2={{
                label: 'Cloud Base',
                key: 'cloudBase',
                min: 0.5,
                max: 2.5,
                initial: 1,
                display: raw => baseOf(raw) + ' km',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="A stated condition is the boundary of the answer!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
