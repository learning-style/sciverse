import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FLIGHT_KM = 1000;
const SCALE = 40;
const ROSE = '#be123c';
const EQUAL = '#475569';
const CUE = '#fda4af';

const sharpOf = (dial: number): number => Math.max(2, Math.min(15, Math.round(dial)));
const vagueOf = (dial: number): number => Math.max(10, Math.min(40, Math.round(dial)));

export const L3B16WeightLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const sharp = sharpOf(raw);
        const vague = Math.max(vagueOf(raw2), sharpOf(raw));
        const weightSharp = 1 / (sharp * sharp);
        const weightVague = 1 / (vague * vague);
        const weighted = 1 / Math.sqrt(weightSharp + weightVague);
        const equally = Math.sqrt((sharp * sharp + vague * vague) / 4);
        const votes = weightSharp / weightVague;
        const missWeighted = FLIGHT_KM * Math.tan((weighted * Math.PI) / 180);
        const missEqual = FLIGHT_KM * Math.tan((equally * Math.PI) / 180);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const barH = Math.max(11, Math.min(30, usable * 0.14));
        const gap = Math.max(5, Math.min(16, usable * 0.06));
        const blockH = barH * 4 + gap * 3 + 22;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const labelW = Math.min(96, safeRight * 0.3);
        const barX = 24 + labelW;
        const barW = safeRight - barX - 34;
        const size = Math.max(9, Math.min(11, Math.round(barH * 0.52)));
        const rowFont = `${size}px monospace`;
        const rowBold = `bold ${size}px monospace`;

        const row = (i: number, label: string, degrees: number, fill: string, labelFont: string) => {
            const y = top + (barH + gap) * i;
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(barX, y, barW, barH);
            ctx.fillStyle = fill;
            ctx.fillRect(barX, y, barW * Math.max(0, Math.min(1, degrees / SCALE)), barH);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, y, barW, barH);
            outlineText(ctx, label, barX - 8, y + barH * 0.72, labelFont, '#475569', 'right', labelW - 4);
            outlineText(ctx, `±${degrees.toFixed(2)}°`, barX + 6, y + barH * 0.72,
                rowBold, '#0f172a', 'left', barW - 12);
        };
        row(0, 'sharp cue', sharp, CUE, rowFont);
        row(1, 'vague cue', vague, CUE, rowFont);
        row(2, 'weighted', weighted, ROSE, rowBold);
        row(3, 'equal', equally, EQUAL, rowBold);

        outlineText(ctx, `the sharp cue holds ${votes.toFixed(1)} times the vote`,
            safeRight / 2, Math.min(top + blockH - 4, artBottom),
            'bold 11px monospace', ROSE, 'center', safeRight - 40);

        outlineText(ctx, `weights ${weightSharp.toFixed(4)} and ${weightVague.toFixed(4)}: combined ±${weighted.toFixed(2)}°`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `over 1,000 km: ${missWeighted.toFixed(0)} km weighted, ${missEqual.toFixed(0)} km equal`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, `weighted ±${weighted.toFixed(2)}° against equal ±${equally.toFixed(2)}°`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Sharper cues get more vote', safeRight / 2, 118, safeRight - 24, 13);

        const ending = weighted < sharp
            ? `so weighting beats even the sharp cue alone at ±${sharp.toFixed(2)}°.`
            : `so the two cues are matched, and weighting gives what equal weighting gives.`;

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, weighted / 15)),
                caption: 'Combined Error',
                low: '0°',
                high: '15°',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: `Cues of ±${sharp}° and ±${vague}° give weights of ${weightSharp.toFixed(4)} and ${weightVague.toFixed(4)}, so the sharp cue holds ${votes.toFixed(1)} times the vote. Weighted properly the combined error is ±${weighted.toFixed(2)}°, against ±${equally.toFixed(2)}° for equal weighting, ${ending}`,
        };
    };

    return (
        <LabCanvas
            title="Trusting the Sharper Cue"
            readout={({ raw }) => `A sharp cue good to ±${sharpOf(raw)}°`}
            controlLabel="Sharp Cue Error"
            controlKey="sharpCue"
            controlMin={2}
            controlMax={15}
            controlInitial={5}
            controlDisplay={raw => `±${sharpOf(raw)}°`}
            control2={{
                label: 'Vague Cue Error',
                key: 'vagueCue',
                min: 10,
                max: 40,
                initial: 20,
                display: raw => `±${vagueOf(raw)}°`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Trusting the Sharper Cue"
            completeNote="weight = 1 / error²!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
