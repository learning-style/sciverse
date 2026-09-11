import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUPERSCRIPT: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
};

/** A number in scientific notation, e.g. "1.4 x 10⁵". */
const sci = (value: number): string => {
    let power = Math.floor(Math.log10(value));
    let lead = (value / Math.pow(10, power)).toFixed(1);
    if (lead === '10.0') {
        power += 1;
        lead = '1.0';
    }
    const sup = String(power).split('').map(ch => SUPERSCRIPT[ch] ?? ch).join('');
    return `${lead} x 10${sup}`;
};

/** Forty dial steps per power of ten, so every material in the lesson can be reached. */
const stiffnessOf = (dial: number): number => Math.pow(10, 5 + Math.round(dial) / 40);
const densityOf = (dial: number): number => Math.pow(10, -1 + Math.round(dial) / 40);
const densityText = (rho: number): string => (rho < 10 ? rho.toFixed(2) : Math.round(rho).toLocaleString());
const speedText = (speed: number): string => (speed < 10 ? speed.toFixed(1) : Math.round(speed).toLocaleString());

const AIR_SPEED = 344;

/** Reference speeds from the lesson. true = label above the track, false = below. */
const MATERIALS: [string, number, boolean][] = [
    ['air', 344, true], ['helium', 1009, false], ['water', 1483, true], ['steel', 5050, false],
];

export const L3P4SoundSpeedLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const stiffness = stiffnessOf(raw);
        const rho = densityOf(raw2);
        const speed = Math.sqrt(stiffness / rho);
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 130));

        // Carts joined by springs, with a squeeze running down the line
        const carts = 9;
        const chainX = 50;
        const gap = (safeRight - 100) / (carts - 1);
        const chainY = stageTop + 24 * sy;
        const heaviness = Math.max(0, Math.min(1, (Math.log10(rho) + 1) / 5.25));
        const springiness = Math.max(0, Math.min(1, (Math.log10(stiffness) - 5) / 6.5));
        const cartSize = Math.min(gap * 0.45, 8 + 12 * heaviness);
        const pace = 0.2 + 1.3 * Math.max(0, Math.min(1, (Math.log10(Math.max(speed, 1)) - 1) / 4));
        const front = (((t * pace) % 1.5) / 1.5) * (carts + 3) - 2;
        const xs = Array.from({ length: carts }, (_, i) =>
            chainX + i * gap + 0.25 * gap * Math.exp(-Math.pow(i - front, 2) / 1.5));

        const coils = 3 + Math.round(5 * springiness);
        for (let i = 0; i < carts - 1; i++) {
            const x1 = xs[i] + cartSize / 2;
            const x2 = xs[i + 1] - cartSize / 2;
            const zig = coils * 2;
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x1, chainY);
            for (let j = 1; j < zig; j++) {
                ctx.lineTo(x1 + ((x2 - x1) * j) / zig, chainY + (j % 2 === 0 ? -4 : 4));
            }
            ctx.lineTo(x2, chainY);
            ctx.stroke();
        }
        xs.forEach(cx => {
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(cx - cartSize / 2, chainY - cartSize / 2, cartSize, cartSize);
            ctx.strokeStyle = '#312e81';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(cx - cartSize / 2, chainY - cartSize / 2, cartSize, cartSize);
        });
        const captionY = chainY + 30 * sy;
        outlineText(ctx, 'heavier carts respond slower -- stiffer springs push sooner', safeRight / 2, captionY,
            'bold 11px monospace', '#475569', 'center', safeRight - 30);

        // The speed on a track from 100 m/s to 10,000 m/s, spaced by powers of ten
        const trackX = 50;
        const trackW = safeRight - 100;
        const trackH = 12;
        const trackY = captionY + 44 * sy;
        const xOfSpeed = (speedValue: number): number =>
            trackX + Math.max(0, Math.min(1, (Math.log10(speedValue) - 2) / 2)) * trackW;
        ctx.fillStyle = '#e0e7ff';
        ctx.fillRect(trackX, trackY, trackW, trackH);
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(trackX, trackY, xOfSpeed(speed) - trackX, trackH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(trackX, trackY, trackW, trackH);
        MATERIALS.forEach(([name, ref, above]) => {
            const mx = xOfSpeed(ref);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(mx, trackY - 4);
            ctx.lineTo(mx, trackY + trackH + 4);
            ctx.stroke();
            outlineText(ctx, name, mx, above ? trackY - 9 : trackY + trackH + 17,
                'bold 11px monospace', '#334155', 'center', trackW * 0.28);
        });

        const times = speed / AIR_SPEED;
        outlineText(ctx, `v = √(${sci(stiffness)} Pa / ${densityText(rho)} kg/m³) = ${speedText(speed)} m/s`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `${times < 10 ? times.toFixed(2) : Math.round(times).toLocaleString()} times as fast as sound in air`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Speed of sound ${speedText(speed)} m/s`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'v = √(B / ρ) -- stiffness compared with density', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (Math.log10(speed) - 2) / 2)),
                caption: 'Speed of Sound',
                low: '100 m/s',
                high: '10,000 m/s',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `Stiffness ${sci(stiffness)} Pa and density ${densityText(rho)} kg/m³ give ${speedText(speed)} m/s.`,
        };
    };

    return (
        <LabCanvas
            title="Why Sound Races Through Steel"
            readout={({ raw }) => `Stiffness ${sci(stiffnessOf(raw))} Pa`}
            controlLabel="Stiffness"
            controlKey="stiffness"
            controlMin={0}
            controlMax={260}
            controlInitial={6}
            controlDisplay={raw => `${sci(stiffnessOf(raw))} Pa`}
            control2={{
                label: 'Density',
                key: 'density',
                min: 0,
                max: 210,
                initial: 43,
                display: raw => `${densityText(densityOf(raw))} kg/m³`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Sound Races Through Steel"
            completeNote="v = √(B / ρ) -- stiffness compared with density!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
