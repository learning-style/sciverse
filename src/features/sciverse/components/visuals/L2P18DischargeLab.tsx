import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const DEPTH = 1.5;         // metres, held fixed so the two dials are width and speed
const MAX_Q = 60;          // 20 m x 1.5 m x 2.0 m/s, the top of the meter
const WATER = '#4338ca';
const FAST = '#1d4ed8';

const widthOf = (dial: number): number => Math.max(4, Math.min(20, Math.round(dial / 2) * 2));
const speedOf = (dial: number): number => Math.max(0.2, Math.min(2, Math.round(dial / 10) * 0.2));
const dischargeOf = (w: number, v: number): number => w * DEPTH * v;

export const L2P18DischargeLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const metres = widthOf(raw);
        const speed = speedOf(raw2);
        const area = metres * DEPTH;
        const flow = dischargeOf(metres, speed);

        // Bands as shares of the stage, so nothing reaches the text above or below.
        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(16, Math.min(26, usable * 0.15));
        const boxH = Math.max(40, Math.min(150, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const boxTop = top + capBand;

        // The channel, seen end-on: its width across and its depth down.
        const boxW = Math.max(30, Math.min(safeRight - 96, (metres / 20) * (safeRight - 120)));
        const cx = safeRight / 2;
        const left = cx - boxW / 2;

        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(left, boxTop, boxW, boxH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, boxTop, boxW, boxH);

        // Arrows crossing the opening: longer and paler-to-darker as the water speeds up.
        const lanes = Math.max(2, Math.min(6, Math.round(boxH / 24)));
        ctx.strokeStyle = speed >= 1.2 ? FAST : WATER;
        ctx.fillStyle = speed >= 1.2 ? FAST : WATER;
        ctx.lineWidth = 2;
        for (let i = 0; i < lanes; i++) {
            const ly = boxTop + (boxH / lanes) * (i + 0.5);
            const span = Math.max(10, Math.min(boxW - 12, (speed / 2) * (boxW - 16)));
            const drift = ((t * speed * 26) + i * 17) % Math.max(12, boxW);
            const ax = left + 6 + ((drift) % Math.max(6, boxW - span - 10));
            ctx.beginPath();
            ctx.moveTo(ax, ly);
            ctx.lineTo(ax + span, ly);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ax + span, ly);
            ctx.lineTo(ax + span - 6, ly - 4);
            ctx.lineTo(ax + span - 6, ly + 4);
            ctx.closePath();
            ctx.fill();
        }

        outlineText(ctx, 'the opening the water crosses', cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'width ' + metres + ' m', cx, Math.min(boxTop + boxH + 14, artBottom - 10),
            'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'depth ' + DEPTH.toFixed(1) + ' m', left - 6, boxTop + boxH / 2 + 4,
            'bold 11px monospace', '#0f172a', 'right', Math.max(40, left - 10));
        outlineText(ctx, 'flow speed ' + speed.toFixed(1) + ' m/s',
            cx, Math.min(boxTop + boxH + labelTail + 12, artBottom),
            'bold 11px monospace', speed >= 1.2 ? FAST : WATER, 'center', safeRight - 30);

        outlineText(ctx, 'width ' + metres + ' m x depth ' + DEPTH.toFixed(1)
            + ' m x speed ' + speed.toFixed(1) + ' m/s = ' + flow.toFixed(1) + ' m³/s',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'cross-section ' + area.toFixed(1) + ' m², so about '
            + flow.toFixed(1) + ' tonnes of water every second',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'discharge ' + flow.toFixed(1) + ' m³/s', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'All three multiplied, and one cubic metre weighs a tonne',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, flow / MAX_Q)),
                caption: 'Discharge Past the Gauge',
                low: '0 m³/s',
                high: MAX_Q + ' m³/s',
                stops: ['#eef2ff', '#93c5fd', FAST] as [string, string, string],
            },
            note: 'A channel ' + metres + ' m wide and ' + DEPTH.toFixed(1)
                + ' m deep gives a cross-section of ' + area.toFixed(1)
                + ' m², and water crossing it at ' + speed.toFixed(1) + ' m/s makes the discharge '
                + flow.toFixed(1) + ' m³/s -- about ' + flow.toFixed(1)
                + ' tonnes of water every second.',
        };
    };

    return (
        <LabCanvas
            title="How Much Water Goes Past?"
            readout={({ raw }) => 'A channel ' + widthOf(raw) + ' m wide'}
            controlLabel="Channel Width"
            controlKey="channelWidth"
            controlMin={4}
            controlMax={20}
            controlInitial={8}
            controlDisplay={raw => widthOf(raw) + ' m'}
            control2={{
                label: 'Flow Speed',
                key: 'flowSpeed',
                min: 2,
                max: 20,
                initial: 8,
                display: raw => speedOf(raw).toFixed(1) + ' m/s',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Rivers Shape the Land?"
            completeNote="Ten tonnes a second, from a stream you could wade!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
