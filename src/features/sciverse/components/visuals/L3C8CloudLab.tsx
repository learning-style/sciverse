import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const DRY_PER_KM = 9.8;
const DEW_PER_KM = 1.8;
const CLOUD_PER_KM = 6;
const TOP_KM = 4;
const T_MIN = -20;
const T_MAX = 40;

const groundTempOf = (dial: number): number => Math.max(10, Math.min(40, Math.round(dial)));
const dewOf = (dial: number, groundTemp: number): number => Math.max(0, Math.min(groundTemp, Math.round(dial)));

export const L3C8CloudLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const groundTemp = groundTempOf(raw);
        const groundDew = dewOf(raw2, groundTemp);
        const gap = groundTemp - groundDew;
        const baseKm = gap / (DRY_PER_KM - DEW_PER_KM);
        const baseM = Math.round(baseKm * 1000);
        const tempAtBase = groundTemp - DRY_PER_KM * baseKm;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // Height up the side, temperature along the bottom
        const gx = 58;
        const gw = safeRight * 0.58 - gx;
        const gTop = stageTop + 12;
        const gBottom = stageTop + 118 * sy;
        const xOf = (c: number): number => gx + ((Math.max(T_MIN, Math.min(T_MAX, c)) - T_MIN) / (T_MAX - T_MIN)) * gw;
        const yOf = (km: number): number => gBottom - (km / TOP_KM) * (gBottom - gTop);
        ctx.fillStyle = '#f0f9ff';
        ctx.fillRect(gx, gTop, gw, gBottom - gTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gx, gTop, gw, gBottom - gTop);
        outlineText(ctx, '4 km', gx - 6, gTop + 4, '11px monospace', '#475569', 'right', 48);
        outlineText(ctx, '0', gx - 6, gBottom + 4, '11px monospace', '#475569', 'right', 20);
        outlineText(ctx, '−20 °C', gx, gBottom + 16, '11px monospace', '#475569', 'left', 56);
        outlineText(ctx, '40 °C', gx + gw, gBottom + 16, '11px monospace', '#475569', 'right', 56);

        const clearTop = Math.min(TOP_KM, baseKm);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#ea580c';
        ctx.beginPath();
        ctx.moveTo(xOf(groundTemp), yOf(0));
        ctx.lineTo(xOf(groundTemp - DRY_PER_KM * clearTop), yOf(clearTop));
        ctx.stroke();
        ctx.strokeStyle = '#2563eb';
        ctx.beginPath();
        ctx.moveTo(xOf(groundDew), yOf(0));
        ctx.lineTo(xOf(groundDew - DEW_PER_KM * clearTop), yOf(clearTop));
        ctx.stroke();

        if (baseKm < TOP_KM) {
            ctx.setLineDash([5, 4]);
            ctx.strokeStyle = '#ea580c';
            ctx.beginPath();
            ctx.moveTo(xOf(tempAtBase), yOf(baseKm));
            ctx.lineTo(xOf(tempAtBase - CLOUD_PER_KM * (TOP_KM - baseKm)), yOf(TOP_KM));
            ctx.stroke();
            ctx.setLineDash([]);
            // A cloud with a flat bottom at the base
            const by = yOf(baseKm);
            const cx = gx + gw * 0.72;
            const puff = 9 + Math.sin(t) * 0.8;
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx - 34, by);
            ctx.lineTo(cx + 34, by);
            ctx.arc(cx + 22, by - puff, puff + 3, 0, -Math.PI, true);
            ctx.arc(cx, by - puff - 6, puff + 7, 0, -Math.PI, true);
            ctx.arc(cx - 22, by - puff, puff + 3, 0, -Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.fillStyle = '#ea580c';
        ctx.fillRect(gx + 6, gTop + 8, 14, 3);
        outlineText(ctx, 'temperature', gx + 24, gTop + 13, '11px monospace', '#9a3412', 'left', gw * 0.5);
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(gx + 6, gTop + 24, 14, 3);
        outlineText(ctx, 'dew point', gx + 24, gTop + 29, '11px monospace', '#1e40af', 'left', gw * 0.5);

        const px = safeRight * 0.63;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `gap ${gap} °C`, px, stageTop + 22, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `125 m x ${gap} = ${baseM.toLocaleString()} m`, px, stageTop + 46, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `at the base ${tempAtBase.toFixed(1)} °C`, px, stageTop + 70, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `cloud base ${baseM.toLocaleString()} m`, px, stageTop + 100 * sy, 'bold 13px monospace', '#065f46', 'left', pw);

        outlineText(ctx, `cloud base = 125 m x (${groundTemp} − ${groundDew}) = ${baseM.toLocaleString()} m`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, gap === 0 ? 'fog: a cloud touching the ground'
            : baseKm >= TOP_KM ? 'base above 4,000 m'
            : 'above the base, cloud air cools about 6 °C per km',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Cloud base ${baseM.toLocaleString()} m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Rising air cools 9.8 °C per km', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, baseKm / TOP_KM)),
                caption: 'Cloud Base Height',
                low: '0 m',
                high: '4,000 m',
                stops: ['#f1f5f9', '#bae6fd', '#0369a1'] as [string, string, string],
            },
            note: `Ground air at ${groundTemp} °C with a ${groundDew} °C dew point has a ${gap} °C gap, so clouds begin at about ${baseM.toLocaleString()} m.`,
        };
    };

    return (
        <LabCanvas
            title="Why Clouds Have Flat Bottoms"
            readout={({ raw }) => `Ground air ${groundTempOf(raw)} °C`}
            controlLabel="Ground Temperature"
            controlKey="groundTemperature"
            controlMin={10}
            controlMax={40}
            controlInitial={30}
            controlDisplay={raw => `${groundTempOf(raw)} °C`}
            control2={{
                label: 'Ground Dew Point',
                key: 'groundDewPoint',
                min: 0,
                max: 30,
                initial: 14,
                display: raw => `${Math.max(0, Math.min(30, Math.round(raw)))} °C`,
            }}
            accent="emerald"
            sky={['#f0f9ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Why Clouds Have Flat Bottoms"
            completeNote="125 m for each degree of gap!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
