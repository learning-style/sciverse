import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const ROOM_C = 20;
const NIGHT_C = 0;
const R_INSIDE = 0.13;
const R_GLASS = 0.004;
const R_GAP = 0.17;

const panesOf = (dial: number): number => Math.max(1, Math.min(3, Math.round(dial)));
const windOf = (dial: number): number => Math.max(0, Math.min(15, Math.round(dial)));
/** Outside film: thinner in wind, from a common rule of thumb h = 5.7 + 3.8 x wind speed. */
const outsideFilmOf = (wind: number): number => 1 / (5.7 + 3.8 * wind);

export const L3P8GlazingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const panes = panesOf(raw);
        const wind = windOf(raw2);
        const rOut = outsideFilmOf(wind);
        const layers: [string, number][] = [['film', R_INSIDE]];
        for (let i = 0; i < panes; i++) {
            if (i > 0) layers.push(['gap', R_GAP]);
            layers.push(['glass', R_GLASS]);
        }
        layers.push(['film', rOut]);
        const rTotal = layers.reduce((sum, [, r]) => sum + r, 0);
        const uValue = 1 / rTotal;
        const flow = uValue * (ROOM_C - NIGHT_C);
        const insideSurface = ROOM_C - flow * R_INSIDE;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // Temperature through every layer, room on the left, night on the right
        const gx = 56;
        const gw = safeRight * 0.58 - gx;
        const gTop = stageTop + 22;
        const gBottom = stageTop + 112 * sy;
        const yOf = (c: number): number => gBottom - ((c - NIGHT_C) / (ROOM_C - NIGHT_C)) * (gBottom - gTop);
        const glassPx = 8;
        const wideCount = layers.filter(([name]) => name !== 'glass').length;
        const widePx = (gw - glassPx * panes) / wideCount;
        let x = gx;
        let temp = ROOM_C;
        const points: [number, number][] = [[x, yOf(temp)]];
        layers.forEach(([name, r]) => {
            const w = name === 'glass' ? glassPx : widePx;
            ctx.fillStyle = name === 'glass' ? '#cbd5e1' : '#e0f2fe';
            ctx.fillRect(x, gTop, w, gBottom - gTop);
            if (name !== 'glass') {
                outlineText(ctx, name, x + w / 2, gTop - 6, '11px monospace', '#475569', 'center', w - 2);
            }
            temp -= flow * r;
            x += w;
            points.push([x, yOf(temp)]);
        });
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gx, gTop, gw, gBottom - gTop);
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        points.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)));
        ctx.stroke();
        outlineText(ctx, '20 °C', gx - 6, gTop + 4, '11px monospace', '#475569', 'right', 48);
        outlineText(ctx, '0 °C', gx - 6, gBottom + 4, '11px monospace', '#475569', 'right', 48);
        outlineText(ctx, 'room', gx, gBottom + 16, 'bold 11px monospace', '#991b1b', 'left', widePx);
        outlineText(ctx, 'night', gx + gw, gBottom + 16, 'bold 11px monospace', '#1e40af', 'right', widePx);

        const px = safeRight * 0.63;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `R total ${rTotal.toFixed(3)}`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `U ${uValue.toFixed(2)} W/m²/°C`, px, stageTop + 46, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `heat flow ${flow.toFixed(0)} W per m²`, px, stageTop + 70, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `inside surface ${insideSurface.toFixed(1)} °C`, px, stageTop + 100 * sy, 'bold 13px monospace', '#3730a3', 'left', pw);

        const terms = layers.map(([, r]) => r.toFixed(3)).join(' + ');
        outlineText(ctx, `R total = ${terms} = ${rTotal.toFixed(3)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `U = 1 / ${rTotal.toFixed(3)} = ${uValue.toFixed(2)} W/m²/°C, heat flow ${flow.toFixed(0)} W`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Inside surface ${insideSurface.toFixed(1)} °C`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Layers in series add their resistances', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, flow / 150)),
                caption: 'Heat Flow Through 1 m²',
                low: '0 W',
                high: '150 W',
                stops: ['#e0e7ff', '#fdba74', '#c2410c'] as [string, string, string],
            },
            note: `${panes} ${panes === 1 ? 'pane' : 'panes'} of glass with a ${wind} m/s wind: U = ${uValue.toFixed(2)} W/m²/°C, ${flow.toFixed(0)} W through each m², inside surface at ${insideSurface.toFixed(1)} °C.`,
        };
    };

    return (
        <LabCanvas
            title="Why Double Glazing Works"
            readout={({ raw }) => `${panesOf(raw)} ${panesOf(raw) === 1 ? 'pane' : 'panes'} of glass`}
            controlLabel="Panes of Glass"
            controlKey="panesOfGlass"
            controlMin={1}
            controlMax={3}
            controlInitial={1}
            controlDisplay={raw => `${panesOf(raw)} panes`}
            control2={{
                label: 'Outside Wind',
                key: 'outsideWind',
                min: 0,
                max: 15,
                initial: 5,
                display: raw => `${windOf(raw)} m/s`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Double Glazing Works"
            completeNote="U = 1 / R total!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
