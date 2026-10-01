import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Both dials move in powers of ten: the Sun is 27 million Moon masses, Jupiter sits
// 1,600 Moon distances away. The bars share one axis spanning ten powers of ten, so
// the pull bar and the tide bar can be read against each other at every setting.
const DECADES_LOW = -7;
const DECADES_HIGH = 3;
const PULL_COLOUR = '#64748b';
const TIDE_COLOUR = '#4338ca';

// mass 1 .. 27,000,000 Moon masses, distance 0.5 .. 1,600 Moon distances
const massOf = (dial: number): number => {
    const e = (dial / 1000) * 7.4314;
    const m = Math.pow(10, e);
    return m < 10 ? Math.round(m * 10) / 10 : Math.round(m / Math.pow(10, Math.floor(Math.log10(m)) - 2))
        * Math.pow(10, Math.floor(Math.log10(m)) - 2);
};
const distOf = (dial: number): number => {
    const e = -0.301 + (dial / 1000) * 3.505;
    const d = Math.pow(10, e);
    return d < 10 ? Math.round(d * 100) / 100 : Math.round(d);
};

const nameOf = (mass: number, dist: number): string => {
    const near = (a: number, b: number) => Math.abs(a - b) / b < 0.08;
    if (near(mass, 1) && near(dist, 1)) return 'the Moon itself';
    if (mass > 5000000 && near(dist, 389)) return 'about the Sun';
    if (near(mass, 25900) && dist > 1200) return 'about Jupiter at its closest';
    if (near(mass, 1) && near(dist, 2)) return 'a Moon twice as far';
    if (near(mass, 1) && near(dist, 0.5)) return 'a Moon at half the distance';
    return '';
};

const show = (x: number): string => {
    if (x >= 1000) return Math.round(x).toLocaleString();
    if (x >= 10) return x.toFixed(0);
    if (x >= 1) return x.toFixed(2);
    if (x >= 0.001) return x.toFixed(4);
    return x.toExponential(1);
};

export const L3P21TideForceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const mass = massOf(raw);
        const dist = distOf(raw2);
        const pull = mass / (dist * dist);
        const tide = mass / (dist * dist * dist);
        const label = nameOf(mass, dist);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;

        // three bands as shares of the stage: caption, the two bars, the axis line
        const capBand = Math.max(14, Math.min(24, usable * 0.14));
        const axisBand = Math.max(16, Math.min(26, usable * 0.15));
        const barsBand = Math.max(48, usable - capBand - axisBand);
        const blockH = capBand + barsBand + axisBand;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const left = Math.max(56, safeRight * 0.17);
        const axisW = Math.max(80, safeRight - left - 20);
        const barH = Math.max(12, Math.min(30, barsBand * 0.3));
        const gap = Math.max(10, Math.min(30, barsBand * 0.18));
        const pullY = top + capBand + (barsBand - 2 * barH - gap) / 2;
        const tideY = pullY + barH + gap;

        const frac = (x: number): number => Math.max(0.004, Math.min(1,
            (Math.log(Math.max(x, 1e-9)) / Math.LN10 - DECADES_LOW) / (DECADES_HIGH - DECADES_LOW)));

        // the shared axis, one tick per power of ten
        const axisY = tideY + barH + Math.max(8, axisBand * 0.45);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        for (let d = DECADES_LOW; d <= DECADES_HIGH; d++) {
            const x = left + ((d - DECADES_LOW) / (DECADES_HIGH - DECADES_LOW)) * axisW;
            ctx.beginPath();
            ctx.moveTo(x, pullY - 4);
            ctx.lineTo(x, axisY);
            ctx.stroke();
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left, axisY);
        ctx.lineTo(left + axisW, axisY);
        ctx.stroke();

        // the two bars, drawn from the same origin so the gap between them is the cube
        ctx.fillStyle = PULL_COLOUR;
        ctx.fillRect(left, pullY, frac(pull) * axisW, barH);
        ctx.strokeRect(left, pullY, frac(pull) * axisW, barH);
        ctx.fillStyle = TIDE_COLOUR;
        ctx.fillRect(left, tideY, frac(tide) * axisW, barH);
        ctx.strokeRect(left, tideY, frac(tide) * axisW, barH);

        // a marker showing where the Moon's own value sits on both bars
        const moonX = left + frac(1) * axisW;
        ctx.strokeStyle = '#be123c';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(moonX, pullY - 6);
        ctx.lineTo(moonX, axisY);
        ctx.stroke();
        ctx.setLineDash([]);

        // a travelling dot on the tide bar, slower the weaker the tide
        const dotX = left + ((t * (12 + frac(tide) * 40)) % Math.max(12, frac(tide) * axisW));
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(left + Math.min(dotX - left, frac(tide) * axisW - 3), tideY + barH / 2, 2.4, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'both bars against the Moon, in powers of ten',
            safeRight / 2, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'pull ' + show(pull), left - 6, pullY + barH / 2 + 4,
            'bold 11px monospace', PULL_COLOUR, 'right', left - 10);
        outlineText(ctx, 'tide ' + show(tide), left - 6, tideY + barH / 2 + 4,
            'bold 11px monospace', TIDE_COLOUR, 'right', left - 10);
        outlineText(ctx, "the Moon = 1", moonX, Math.min(axisY + 13, artBottom),
            'bold 10px monospace', '#be123c', 'center', safeRight - 30);

        outlineText(ctx, 'mass ' + show(mass) + ' / distance ' + show(dist)
            + '³ = tide ' + show(tide),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, label !== ''
            ? label + ': the pull bar and the tide bar disagree by ' + show(dist)
            : 'taking the difference costs one power of distance',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', TIDE_COLOUR, 'center', safeRight - 30);

        fitText(ctx, 'tide ' + show(tide) + ' x the Moon’s', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The tide is a difference, not a pull', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: frac(tide),
                caption: 'Tide Compared With the Moon’s',
                low: 'ten millionths',
                high: 'a thousand times',
                stops: ['#eef2ff', '#a5b4fc', TIDE_COLOUR] as [string, string, string],
            },
            note: 'A body of ' + show(mass) + ' Moon masses at ' + show(dist)
                + ' Moon distances pulls the Earth ' + show(pull)
                + ' times as hard as the Moon does, and raises ' + show(tide)
                + ' times the tide. The two differ by exactly the distance.',
        };
    };

    return (
        <LabCanvas
            title="Why the Sun Raises a Smaller Tide"
            readout={({ raw }) => 'A body of ' + show(massOf(raw)) + ' Moon masses'}
            controlLabel="Mass of the Body"
            controlKey="bodyMass"
            controlMin={0}
            controlMax={1000}
            controlInitial={0}
            controlDisplay={raw => show(massOf(raw)) + ' Moon masses'}
            control2={{
                label: 'Distance Away',
                key: 'bodyDistance',
                min: 0,
                max: 1000,
                initial: 86,
                display: raw => show(distOf(raw)) + ' Moon distances',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Cycles Keep Systems Alive?"
            completeNote="A difference in a pull loses one power of distance!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
