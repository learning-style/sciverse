import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Two reservoirs and the two fluxes between them. The sliders carry tenths of
 *  a kilogram, so the raw values run 2-20 and are divided by ten for display. */
export const L2C33BudgetLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const photo = Math.round(raw) / 10;
        const decomp = Math.round(raw2) / 10;
        const net = photo - decomp;
        const stored = net * 50;

        const boxW = Math.min(300, safeRight - 80);
        const boxX = safeRight / 2 - boxW / 2;
        const airY = stageTop + 26;
        const groundY = stageBottom - 96;
        const boxH = 46;

        // The air reservoir
        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(boxX, airY, boxW, boxH);
        ctx.strokeStyle = '#0369a1';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, airY, boxW, boxH);
        outlineText(ctx, 'the air', safeRight / 2, airY + 28, 'bold 15px monospace', '#0c4a6e', 'center', boxW - 12);

        // The plants-and-soil reservoir
        ctx.fillStyle = '#bbf7d0';
        ctx.fillRect(boxX, groundY, boxW, boxH);
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, groundY, boxW, boxH);
        outlineText(ctx, 'plants and soil', safeRight / 2, groundY + 28, 'bold 15px monospace', '#14532d', 'center', boxW - 12);

        // The two fluxes, drawn as arrows whose width is the size of the flux
        const arrowTop = airY + boxH;
        const arrowBottom = groundY;
        const downX = safeRight / 2 - boxW * 0.24;
        const upX = safeRight / 2 + boxW * 0.24;

        const drawFlux = (x: number, kg: number, up: boolean, colour: string) => {
            const w = Math.max(6, kg * 16);
            ctx.fillStyle = colour;
            ctx.fillRect(x - w / 2, arrowTop + 14, w, arrowBottom - arrowTop - 28);
            ctx.beginPath();
            const tipY = up ? arrowTop + 2 : arrowBottom - 2;
            const baseY = up ? arrowTop + 20 : arrowBottom - 20;
            ctx.moveTo(x, tipY);
            ctx.lineTo(x - w / 2 - 7, baseY);
            ctx.lineTo(x + w / 2 + 7, baseY);
            ctx.closePath();
            ctx.fill();
        };
        drawFlux(downX, photo, false, '#16a34a');
        drawFlux(upX, decomp, true, '#b45309');

        const midY = (arrowTop + arrowBottom) / 2;
        outlineText(ctx, `photosynthesis ${photo.toFixed(1)}`, downX, midY - 6,
            'bold 12px monospace', '#14532d', 'center', boxW * 0.44);
        outlineText(ctx, `decomposition ${decomp.toFixed(1)}`, upX, midY - 6,
            'bold 12px monospace', '#7c2d12', 'center', boxW * 0.44);
        outlineText(ctx, 'flux in', downX, midY + 10, 'bold 11px monospace', '#14532d', 'center', boxW * 0.44);
        outlineText(ctx, 'flux out', upX, midY + 10, 'bold 11px monospace', '#7c2d12', 'center', boxW * 0.44);

        const status = net > 0.05 ? 'carbon sink' : net < -0.05 ? 'carbon source' : 'steady state';
        outlineText(ctx, `net change = ${photo.toFixed(1)} - ${decomp.toFixed(1)} = ${net > 0 ? '+' : ''}${net.toFixed(1)} kg -- ${status}`,
            safeRight / 2, stageBottom - 22, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `After 50 years: ${stored > 0 ? '+' : ''}${stored.toFixed(0)} kg of carbon per square metre`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'net change = flux in - flux out, and the total just adds up',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = net > 0.05
            ? 'Flux in is bigger, so carbon piles up. This land is a carbon sink.'
            : net < -0.05
                ? 'Flux out is bigger, so stored carbon is leaving. This land is a carbon source.'
                : 'In equals out. Nothing accumulates -- this is steady state.';
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (net + 1.8) / 3.6)),
                caption: 'Carbon Source or Carbon Sink',
                low: 'Source',
                high: 'Sink',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Carbon Budget"
            readout={({ raw }) => `Photosynthesis captures ${(Math.round(raw) / 10).toFixed(1)} kg of carbon per square metre each year`}
            controlLabel="Photosynthesis"
            controlKey="photosynthesis"
            controlMin={2}
            controlMax={20}
            controlInitial={12}
            controlDisplay={raw => `${(Math.round(raw) / 10).toFixed(1)} kg/m² per year in`}
            control2={{
                label: 'Decomposition',
                key: 'decomposition',
                min: 2,
                max: 20,
                initial: 12,
                display: raw => `${(Math.round(raw) / 10).toFixed(1)} kg/m² per year out`,
            }}
            accent="emerald"
            sky={['#f0f9ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="The Carbon Budget"
            completeNote="Energy compounds. Matter balances."
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
