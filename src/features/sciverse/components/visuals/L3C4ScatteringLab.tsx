import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Share of 700 nm red light that clean air scatters out of the beam in one overhead thickness. */
const RED_LOSS = 0.036;

const lossOf = (nm: number): number => Math.min(0.95, RED_LOSS * Math.pow(700 / nm, 4));

const pctText = (fraction: number): string => {
    const p = fraction * 100;
    if (p >= 10) return `${p.toFixed(0)}%`;
    if (p >= 0.1) return `${p.toFixed(1)}%`;
    if (p >= 0.001) return `${p.toFixed(3)}%`;
    return 'under 0.001%';
};

/** Approximate on-screen colour for a visible wavelength. */
const colourOf = (wavelength: number): string => {
    const nm = Math.max(400, Math.min(700, wavelength));
    const stops: [number, number, number, number][] = [
        [400, 138, 43, 226], [450, 59, 76, 245], [490, 6, 182, 212], [530, 34, 197, 94],
        [580, 234, 179, 8], [620, 249, 115, 22], [700, 220, 38, 38],
    ];
    for (let i = 0; i < stops.length - 1; i++) {
        const a = stops[i];
        const b = stops[i + 1];
        if (nm >= a[0] && nm <= b[0]) {
            const frac = (nm - a[0]) / (b[0] - a[0]);
            const mix = (k: number): number => Math.round(a[k] + (b[k] - a[k]) * frac);
            return `rgb(${mix(1)}, ${mix(2)}, ${mix(3)})`;
        }
    }
    return '#dc2626';
};

export const L3C4ScatteringLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const nm = Math.max(380, Math.round(raw));
        const path = Math.max(1, Math.round(raw2));
        const loss = lossOf(nm);
        const keep = 1 - loss;
        const through = Math.pow(keep, path);
        const ratio = Math.pow(700 / nm, 4);
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 122));

        // The Sun, shown with the red, green and blue light that gets through
        const sunR = 22 * sy;
        const sunX = 44;
        const sunY = stageTop + 12 + sunR;
        const red = Math.pow(1 - lossOf(700), path);
        const green = Math.pow(1 - lossOf(546), path);
        const blue = Math.pow(1 - lossOf(435), path);
        const brightest = Math.max(red, green, blue);
        const channel = (share: number): number => Math.round((255 * share) / brightest);
        ctx.fillStyle = `rgb(${channel(red)}, ${channel(green)}, ${channel(blue)})`;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // The beam, fading as it crosses each overhead thickness
        const beamX = sunX + 36;
        const beamW = safeRight - 40 - beamX;
        const beamH = 16 * sy;
        const band = beamW / path;
        for (let i = 0; i < path; i++) {
            const bx = beamX + i * band;
            ctx.fillStyle = i % 2 === 0 ? '#e2e8f0' : '#f1f5f9';
            ctx.fillRect(bx, sunY - beamH / 2 - 6, band + 0.5, beamH + 12);
            ctx.globalAlpha = Math.max(0.04, Math.pow(keep, i + 1));
            ctx.fillStyle = colourOf(nm);
            ctx.fillRect(bx, sunY - beamH / 2, band + 0.5, beamH);
            ctx.globalAlpha = 1;
        }
        const captionY = sunY + sunR + 16;
        outlineText(ctx, 'the beam crosses each overhead thickness in turn', beamX + beamW / 2, captionY,
            'bold 11px monospace', '#475569', 'center', beamW);

        const lineY = captionY + 26 * sy;
        outlineText(ctx, `scattered per thickness: 3.6% x (700 / ${nm})⁴ = ${(loss * 100).toFixed(1)}%`, 40, lineY,
            'bold 13px monospace', '#0f172a', 'left', safeRight - 80);
        outlineText(ctx, `surviving: ${keep.toFixed(3)} to the power ${path} = ${pctText(through)}`, 40, lineY + 20,
            'bold 13px monospace', '#0f172a', 'left', safeRight - 80);

        outlineText(ctx, `(700 / ${nm})⁴ = ${ratio.toFixed(2)} times the scattering of red`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the Sun shows the red, green and blue light that gets through',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `${pctText(through)} of the ${nm} nm light gets through`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Scattering grows as 1 / λ⁴', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: through,
                caption: 'Share That Gets Through',
                low: 'None',
                high: 'All',
                stops: ['#e2e8f0', '#6ee7b7', '#047857'] as [string, string, string],
            },
            note: `${nm} nm light: ${(loss * 100).toFixed(1)}% scattered in each overhead thickness, ${pctText(through)} left after ${path}.`,
        };
    };

    return (
        <LabCanvas
            title="The Fourth Power That Colours the Sky"
            readout={({ raw }) => `Wavelength ${Math.max(380, Math.round(raw))} nm`}
            controlLabel="Wavelength"
            controlKey="wavelength"
            controlMin={380}
            controlMax={750}
            controlInitial={450}
            controlDisplay={raw => `${Math.max(380, Math.round(raw))} nm`}
            control2={{
                label: 'Air Path',
                key: 'airPath',
                min: 1,
                max: 40,
                initial: 1,
                display: raw => `${Math.max(1, Math.round(raw))} x overhead`,
            }}
            accent="emerald"
            sky={['#f0f9ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Fourth Power That Colours the Sky"
            completeNote="1 / λ⁴ -- blue fills the sky, red is left in the beam!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
