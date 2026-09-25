import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const FLIGHT_KM = 1000;
const ROSE = '#be123c';
const SINGLE = '#fda4af';

const cuesOf = (dial: number): number => Math.max(1, Math.min(6, Math.round(dial)));
const errorOf = (dial: number): number => Math.max(5, Math.min(30, Math.round(dial)));

export const L2B16CuesLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const cues = cuesOf(raw);
        const each = errorOf(raw2);
        const combined = each / Math.sqrt(cues);
        const miss = FLIGHT_KM * Math.tan((combined * Math.PI) / 180);

        // Bands are shares of the real available height
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        // The 'averaged' caption sits below the origin, so bound the fan too
        const fan = Math.max(40, Math.min(190, usable * 0.62, usable - 10));
        const blockH = fan + 34;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const cx = safeRight / 2;
        const originY = top + fan;

        const rad = (deg: number): number => (deg * Math.PI) / 180;
        const up = -Math.PI / 2;

        // The scatter one cue allows, then the narrower scatter of the average
        const wedge = (halfAngle: number, fill: string) => {
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.moveTo(cx, originY);
            ctx.arc(cx, originY, fan, up - rad(halfAngle), up + rad(halfAngle));
            ctx.closePath();
            ctx.fill();
        };
        wedge(each, 'rgba(253, 164, 175, 0.35)');
        wedge(combined, 'rgba(190, 18, 60, 0.22)');

        // North: the bearing the bird is actually trying to hold
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, originY);
        ctx.lineTo(cx, originY - fan);
        ctx.stroke();
        ctx.restore();
        outlineText(ctx, 'north', cx, originY - fan - 8, '10px monospace', '#0f172a', 'center', 90);

        // One arrow per cue, scattered but stable, plus the average of them
        let sum = 0;
        for (let i = 0; i < cues; i++) {
            const offset = Math.sin((i + 1) * 7.37) * each;
            sum += offset;
            const a = up + rad(offset);
            ctx.strokeStyle = SINGLE;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, originY);
            ctx.lineTo(cx + Math.cos(a) * fan * 0.92, originY + Math.sin(a) * fan * 0.92);
            ctx.stroke();
        }
        const averaged = up + rad(sum / cues);
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(cx, originY);
        ctx.lineTo(cx + Math.cos(averaged) * fan, originY + Math.sin(averaged) * fan);
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(cx, originY, 4, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, `${cues} cue${cues === 1 ? '' : 's'}, averaged`, cx, Math.min(originY + 20, artBottom),
            'bold 11px monospace', ROSE, 'center', safeRight - 30);

        outlineText(ctx, `${each} / √${cues} = ${combined.toFixed(1)}°`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `1,000 km x tan(${combined.toFixed(1)}°) = ${miss.toFixed(0)} km off`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ROSE, 'center', safeRight - 30);

        fitText(ctx, `${cues} cues at ±${each}° give ±${combined.toFixed(1)}°`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Divide by the root of the count', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, combined / 30)),
                caption: 'Combined Error',
                low: '0°',
                high: '30°',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: `${cues} independent cue${cues === 1 ? '' : 's'} of ±${each}° give a combined error of ±${combined.toFixed(1)}°, so a 1,000 km flight finishes about ${miss.toFixed(0)} km off. Averaging shrinks the scatter by the root of the count, and does nothing at all to a bias.`,
        };
    };

    return (
        <LabCanvas
            title="Two Cues Beat One"
            readout={({ raw }) => `A bird averaging ${cuesOf(raw)} cue${cuesOf(raw) === 1 ? '' : 's'}`}
            controlLabel="Number of Cues"
            controlKey="cueCount"
            controlMin={1}
            controlMax={6}
            controlInitial={2}
            controlDisplay={raw => `${cuesOf(raw)} cues`}
            control2={{
                label: 'Error of Each Cue',
                key: 'cueError',
                min: 5,
                max: 30,
                initial: 12,
                display: raw => `±${errorOf(raw)}°`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Two Cues Beat One"
            completeNote="error / √n!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
