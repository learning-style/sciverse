import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Oxygen in water, in square micrometres per second. */
const D_UM2_PER_S = 2000;

export const L3B2DiffusionLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const size = Math.max(5, Math.round(raw));
        const demand = Math.max(1, Math.round(raw2));

        const arrive = (len: number): number => (len * len) / (2 * D_UM2_PER_S);
        const arriveNow = arrive(size);
        const survive = 10 / demand;
        const maxSize = Math.sqrt(2 * D_UM2_PER_S * survive);
        const starving = arriveNow > survive;

        // Curve: arrival time against size, with the survival line across it
        const plotX = 66;
        const plotTop = stageTop + 44;
        const plotBottom = stageBottom - 80;
        const plotH = Math.max(90, plotBottom - plotTop);
        const plotW = safeRight - plotX - 30;
        const maxLen = 1000;
        const maxT = arrive(maxLen);

        const px = (len: number): number => plotX + (len / maxLen) * plotW;
        const py = (secs: number): number =>
            plotBottom - Math.min(1, Math.sqrt(secs / maxT)) * plotH;

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plotX, plotTop);
        ctx.lineTo(plotX, plotBottom);
        ctx.lineTo(plotX + plotW, plotBottom);
        ctx.stroke();

        ctx.strokeStyle = '#be123c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let len = 5; len <= maxLen; len += 10) {
            const cx = px(len);
            const cy = py(arrive(len));
            if (len === 5) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        ctx.strokeStyle = '#0f766e';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(plotX, py(survive));
        ctx.lineTo(plotX + plotW, py(survive));
        ctx.stroke();
        ctx.setLineDash([]);
        outlineText(ctx, 'how long the cell can wait', plotX + plotW * 0.55, py(survive) - 8,
            'bold 11px monospace', '#0f766e', 'center', plotW * 0.7);

        ctx.fillStyle = starving ? '#b91c1c' : '#166534';
        ctx.beginPath();
        ctx.arc(px(size), py(arriveNow), 6, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'cell size across the bottom', plotX + plotW / 2, plotBottom + 18,
            'bold 11px monospace', '#0f172a', 'center', plotW);
        outlineText(ctx, `oxygen arrives at the middle in ${arriveNow < 1 ? arriveNow.toFixed(3) + ' s' : arriveNow < 120 ? arriveNow.toFixed(1) + ' s' : (arriveNow / 60).toFixed(0) + ' minutes'}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, starving ? 'oxygen cannot arrive in time' : 'oxygen arrives in time to supply everything inside',
            safeRight / 2, stageBottom - 12, 'bold 13px monospace',
            starving ? '#b91c1c' : '#166534', 'center', safeRight - 30);

        fitText(ctx, `${size} µm across -- t = L² / 2D`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Double the distance and the wait goes up four times',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 1 - arriveNow / (survive * 3))),
                caption: 'Can Oxygen Arrive in Time?',
                low: 'Arrives too late',
                high: 'Arrives in good time',
            },
            note: starving
                ? `At ${size} µm oxygen needs ${arriveNow.toFixed(2)} s to wander to the middle, longer than the ${survive.toFixed(1)} s the cell can wait. Above about ${maxSize.toFixed(0)} µm no amount of folding helps.`
                : `At ${size} µm oxygen arrives in ${arriveNow.toFixed(3)} s, well inside the ${survive.toFixed(1)} s the cell can wait.`,
        };
    };

    return (
        <LabCanvas
            title="Why 6/L Was Not the Whole Story"
            readout={({ raw }) => `Oxygen must wander ${Math.max(5, Math.round(raw))} µm to the centre`}
            controlLabel="Cell Size"
            controlKey="diffusionSize"
            controlMin={5}
            controlMax={1000}
            controlInitial={10}
            controlDisplay={raw => `${Math.max(5, Math.round(raw))} µm`}
            control2={{
                label: 'Oxygen Demand',
                key: 'oxygenDemand',
                min: 1,
                max: 10,
                initial: 1,
                display: raw => `${Math.max(1, Math.round(raw))}x`,
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why 6/L Was Not the Whole Story"
            completeNote="t goes as L², and folding cannot help!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
