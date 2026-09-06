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
        // Tracking the air: in = respiration and decay, out = photosynthesis.
        const net = decomp - photo;
        const overFifty = net * 50;

        const boxW = Math.min(300, safeRight - 80);
        const boxX = safeRight / 2 - boxW / 2;
        const airY = stageTop + 26;
        const groundY = stageBottom - 104;
        const boxH = 46;

        // The air reservoir
        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(boxX, airY, boxW, boxH);
        ctx.strokeStyle = '#0369a1';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, airY, boxW, boxH);
        outlineText(ctx, 'the air', safeRight / 2, airY + 20, 'bold 15px monospace', '#0c4a6e', 'center', boxW - 12);
        outlineText(ctx, 'the reservoir we are tracking', safeRight / 2, airY + 36, 'bold 11px monospace', '#0c4a6e', 'center', boxW - 12);

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
        // Green adds to the air, red takes away from it, so colour always agrees
        // with the sign of the net change printed below.
        drawFlux(downX, photo, false, '#dc2626');
        drawFlux(upX, decomp, true, '#16a34a');

        const midY = (arrowTop + arrowBottom) / 2;
        // Each flux is labelled with what it is, how big it is, and which way it
        // goes. A bare number here reads as an amount of carbon rather than a
        // flow, which is exactly the confusion the lesson is trying to remove.
        const labelW = boxW * 0.46;
        outlineText(ctx, 'photosynthesis', downX, midY - 22, 'bold 12px monospace', '#b91c1c', 'center', labelW);
        outlineText(ctx, `${photo.toFixed(1)} kg carbon per m² per year`, downX, midY - 6, 'bold 12px monospace', '#b91c1c', 'center', labelW);
        outlineText(ctx, 'OUT OF the air', downX, midY + 10, 'bold 11px monospace', '#b91c1c', 'center', labelW);
        outlineText(ctx, 'respiration + decay', upX, midY - 22, 'bold 12px monospace', '#166534', 'center', labelW);
        outlineText(ctx, `${decomp.toFixed(1)} kg carbon per m² per year`, upX, midY - 6, 'bold 12px monospace', '#166534', 'center', labelW);
        outlineText(ctx, 'INTO the air', upX, midY + 10, 'bold 11px monospace', '#166534', 'center', labelW);

        const statusLine = net < -0.05
            ? 'carbon sink -- the air is losing carbon'
            : net > 0.05
                ? 'carbon source -- the air is gaining carbon'
                : 'steady state -- the air is neither losing nor gaining';
        outlineText(ctx, 'a flux is a flow per year, not an amount stored',
            safeRight / 2, stageBottom - 46, 'bold 11px monospace', '#334155', 'center', safeRight - 30);
        outlineText(ctx, `net change in the air = ${decomp.toFixed(1)} - ${photo.toFixed(1)} = ${net > 0 ? '+' : ''}${net.toFixed(1)} kg carbon per year`,
            safeRight / 2, stageBottom - 28, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        // The status is always shown with what it means for the AIR, because
        // "sink" reads backwards when you are watching the land fill up.
        outlineText(ctx, statusLine, safeRight / 2, stageBottom - 10,
            'bold 12px monospace', net > 0.05 ? '#166534' : net < -0.05 ? '#b91c1c' : '#334155',
            'center', safeRight - 30);

        fitText(ctx, `After 50 years: the air ${net < -0.005 ? 'loses' : net > 0.005 ? 'gains' : 'neither loses nor gains'} ${Math.abs(overFifty) < 0.5 ? '' : Math.abs(overFifty).toFixed(0) + ' kg'} of carbon per square metre`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'green adds carbon to the air, red takes it away -- colour agrees with the sign',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = net < -0.05
            ? 'Photosynthesis pulls out more than decay puts back, so the air is losing carbon. This land is a carbon sink.'
            : net > 0.05
                ? 'Decay puts back more than photosynthesis pulls out, so the air is gaining carbon. This land is a carbon source.'
                : 'In equals out. The air neither loses nor gains -- this is steady state.';
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, (net + 1.8) / 3.6)),
                caption: 'Carbon Source or Carbon Sink',
                low: 'Sink: air losing',
                high: 'Source: air gaining',
                // Asserted as a tuple: drawScene is a standalone const, so the
                // contextual type from LabFooter never reaches this literal and it
                // would otherwise infer as string[].
                stops: ['#dc2626', '#e2e8f0', '#16a34a'] as [string, string, string],
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="The Carbon Budget"
            readout={({ raw }) => `Photosynthesis pulls ${(Math.round(raw) / 10).toFixed(1)} kg of carbon out of the air, per square metre each year`}
            controlLabel="Photosynthesis"
            controlKey="photosynthesis"
            controlMin={2}
            controlMax={20}
            controlInitial={12}
            controlDisplay={raw => `${(Math.round(raw) / 10).toFixed(1)} kg of carbon OUT OF the air, per m² per year`}
            control2={{
                label: 'Decomposition',
                key: 'decomposition',
                min: 2,
                max: 20,
                initial: 12,
                display: raw => `${(Math.round(raw) / 10).toFixed(1)} kg of carbon INTO the air, per m² per year`,
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
