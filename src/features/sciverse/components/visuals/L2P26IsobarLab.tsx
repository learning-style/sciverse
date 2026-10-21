import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the SPACING of the isobars is the wind. So the gap between the two lines
// is drawn to scale from the distance dial, and the wind arrow's length is drawn from
// the gradient -- move the lines apart and the arrow visibly shrinks while the two
// pressure numbers never change. The arrow runs ALONG the lines rather than across
// them, because that is what the wind does and the lesson says so; the measuring
// arrow across the gap is kept on the left, well clear of it.
const PER_GRADIENT = 26;       // km/h for each 1 hPa per 100 km, mid-latitudes
const BASE_HPA = 1000;
const INDIGO = '#4338ca';
const WIND = '#b45309';

const diffOf = (dial: number): number => Math.max(2, Math.min(20, Math.round(dial / 2) * 2));
const distOf = (dial: number): number => Math.max(100, Math.min(1000, Math.round(dial / 100) * 100));

export const L2P26IsobarLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const diff = diffOf(raw);
        const dist = distOf(raw2);
        const gradient = diff / dist * 100;
        const wind = gradient * PER_GRADIENT;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 15;
        const showLabels = usable >= 2 * ROW + 24;
        const labelH = showLabels ? ROW : 0;
        const band = Math.max(14, usable - 2 * labelH);
        const top = artTop + Math.max(0, (usable - (band + 2 * labelH)) / 2);
        const cy = top + labelH + band / 2;
        const gap = Math.max(12, Math.min(band, (dist / 1000) * band));
        const topY = cy - gap / 2;
        const botY = cy + gap / 2;

        const left = 26;
        const fullW = Math.max(90, safeRight - 52);
        const measureX = left + 26;
        // clear of the widest distance label ('1000 km' reaches left + 77)
        const windX0 = left + 84;
        // 34px held back at the right for the word 'wind', which rides on the arrow's
        // own baseline so it can never meet an isobar or the distance label
        const windRoom = Math.max(20, left + fullW - windX0 - 6 - 34);

        // the two isobars
        ctx.strokeStyle = INDIGO;
        ctx.lineWidth = 2.2;
        [topY, botY].forEach(y => {
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(left + fullW, y);
            ctx.stroke();
        });

        // measured across the lines, by the shortest route
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(measureX, topY + 1);
        ctx.lineTo(measureX, botY - 1);
        ctx.stroke();
        [[topY + 1, 1], [botY - 1, -1]].forEach(([y, dir]) => {
            ctx.beginPath();
            ctx.moveTo(measureX - 3, (y as number) + 4 * (dir as number));
            ctx.lineTo(measureX, y as number);
            ctx.lineTo(measureX + 3, (y as number) + 4 * (dir as number));
            ctx.stroke();
        });

        // the wind, blowing ALONG the isobars, its length set by the gradient
        const arrowLen = Math.max(6, Math.min(1, wind / 120) * windRoom);
        const drift = (t * 26) % Math.max(10, windRoom);
        ctx.strokeStyle = WIND;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(windX0, cy);
        ctx.lineTo(windX0 + arrowLen, cy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(windX0 + arrowLen - 6, cy - 4);
        ctx.lineTo(windX0 + arrowLen, cy);
        ctx.lineTo(windX0 + arrowLen - 6, cy + 4);
        ctx.stroke();
        outlineText(ctx, 'wind', windX0 + arrowLen + 6, cy + 4,
            'bold 11px monospace', WIND, 'left', 30);

        // a travelling mark, so the arrow reads as movement rather than a bar
        if (gap > 16) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(windX0 + (drift % Math.max(8, arrowLen)), cy, 1.7, 0, Math.PI * 2);
            ctx.fill();
        }

        if (showLabels) {
            outlineText(ctx, (BASE_HPA + diff) + ' hPa', left, topY - 5,
                'bold 11px monospace', INDIGO, 'left', fullW / 2);
            outlineText(ctx, BASE_HPA + ' hPa', left, botY + 12,
                'bold 11px monospace', INDIGO, 'left', fullW / 2);
            outlineText(ctx, dist + ' km', measureX + 5, cy + 4,
                'bold 11px monospace', '#334155', 'left', 40);
        }

        outlineText(ctx, 'gradient ' + gradient.toFixed(1) + ' hPa/100km',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, wind < 15 ? 'not enough to move a flag'
            : wind < 40 ? 'a brisk ordinary day'
                : wind < 70 ? 'a gale'
                    : wind < 120 ? 'a severe storm' : 'stronger than any storm',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', WIND, 'center', safeRight - 30);

        fitText(ctx, 'wind ' + wind.toFixed(0) + ' km/h', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'How close are the lines?', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, wind / 120)),
                caption: 'Wind off the Chart',
                low: 'calm',
                high: 'a severe storm',
                stops: ['#eef2ff', '#fcd34d', WIND] as [string, string, string],
            },
            note: diff + ' hPa spread over ' + dist + ' km is a gradient of ' + gradient.toFixed(1)
                + ' hPa per 100 km, so about ' + wind.toFixed(0)
                + ' km/h. Move the lines apart and the wind falls with the numbers unchanged.',
        };
    };

    return (
        <LabCanvas
            title="How Close Are the Lines?"
            readout={({ raw }) => 'Pressure difference ' + diffOf(raw) + ' hPa'}
            controlLabel="Pressure Difference"
            controlKey="pressureDiff"
            controlMin={2}
            controlMax={20}
            controlInitial={4}
            controlDisplay={raw => diffOf(raw) + ' hPa'}
            control2={{
                label: 'Distance Between',
                key: 'isobarDistance',
                min: 100,
                max: 1000,
                initial: 400,
                display: raw => distOf(raw) + ' km',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do We Predict Weather?"
            completeNote="Read the spacing, not the numbers!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
