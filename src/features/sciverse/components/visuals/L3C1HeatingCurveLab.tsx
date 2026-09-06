import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const C_ICE = 2.1;
const C_WATER = 4.2;
const C_STEAM = 2.0;
const L_FUSION = 334;
const L_VAP = 2260;

export const L3C1HeatingCurveLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grams = Math.max(1, Math.round(raw));
        const joules = Math.max(0, Math.round(raw2)) * 100;

        // Stage boundaries in cumulative joules, for this mass.
        const b1 = grams * C_ICE * 20;
        const b2 = b1 + grams * L_FUSION;
        const b3 = b2 + grams * C_WATER * 100;
        const b4 = b3 + grams * L_VAP;
        const b5 = b4 + grams * C_STEAM * 20;

        const tempAt = (e: number): number => {
            if (e <= b1) return -20 + e / (grams * C_ICE);
            if (e <= b2) return 0;
            if (e <= b3) return (e - b2) / (grams * C_WATER);
            if (e <= b4) return 100;
            if (e <= b5) return 100 + (e - b4) / (grams * C_STEAM);
            return 120;
        };
        const stageOf = (e: number): string => {
            if (e <= b1) return 'warming the ice';
            if (e <= b2) return 'melting -- a plateau';
            if (e <= b3) return 'warming the water';
            if (e <= b4) return 'boiling -- a plateau';
            if (e <= b5) return 'warming the steam';
            return 'all steam, past 120 °C';
        };

        const plotX = 62;
        const plotTop = stageTop + 44;
        const plotBottom = stageBottom - 52;
        const plotH = Math.max(90, plotBottom - plotTop);
        const plotW = safeRight - plotX - 30;
        const eMax = b5;
        const ex = (e: number): number => plotX + (Math.min(e, eMax) / eMax) * plotW;
        const ty = (degC: number): number => plotBottom - ((degC + 20) / 140) * plotH;

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        [-20, 0, 50, 100, 120].forEach(tick => {
            ctx.beginPath();
            ctx.moveTo(plotX, ty(tick));
            ctx.lineTo(plotX + plotW, ty(tick));
            ctx.stroke();
            ctx.fillStyle = '#94a3b8';
            ctx.font = '11px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`${tick}`, plotX - 6, ty(tick) + 4);
        });
        ctx.textAlign = 'center';

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plotX, plotTop);
        ctx.lineTo(plotX, plotBottom);
        ctx.lineTo(plotX + plotW, plotBottom);
        ctx.stroke();

        // The heating curve: two sloped runs, two flat plateaus, one more run.
        const pts: [number, number][] = [
            [0, -20], [b1, 0], [b2, 0], [b3, 100], [b4, 100], [b5, 120],
        ];
        ctx.strokeStyle = '#0891b2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        pts.forEach(([energy, degC], i) => {
            if (i === 0) ctx.moveTo(ex(energy), ty(degC)); else ctx.lineTo(ex(energy), ty(degC));
        });
        ctx.stroke();

        // Shade the two plateaus, since they are the point of the whole picture
        ctx.fillStyle = 'rgba(8,145,178,0.14)';
        ctx.fillRect(ex(b1), plotTop, ex(b2) - ex(b1), plotBottom - plotTop);
        ctx.fillRect(ex(b3), plotTop, ex(b4) - ex(b3), plotBottom - plotTop);
        outlineText(ctx, 'melting', (ex(b1) + ex(b2)) / 2, plotTop + 14, 'bold 11px monospace', '#0f172a', 'center', Math.max(30, ex(b2) - ex(b1)));
        outlineText(ctx, 'boiling', (ex(b3) + ex(b4)) / 2, plotTop + 14, 'bold 11px monospace', '#0f172a', 'center', Math.max(30, ex(b4) - ex(b3)));

        // Where the energy dial has got to
        const temp = tempAt(joules);
        ctx.fillStyle = '#be123c';
        ctx.beginPath();
        ctx.arc(ex(joules), ty(temp), 6, 0, Math.PI * 2);
        ctx.fill();

        outlineText(ctx, 'energy added', plotX + plotW / 2, plotBottom + 20, 'bold 11px monospace', '#0f172a', 'center', plotW);
        outlineText(ctx, `${stageOf(joules)} -- now at ${temp.toFixed(0)} °C`,
            safeRight / 2, stageBottom - 14, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);

        fitText(ctx, `${(joules / 1000).toFixed(1)} kJ into ${grams} g -- temperature ${temp.toFixed(0)} °C`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, `Boiling alone is ${((grams * L_VAP) / b5 * 100).toFixed(0)}% of the whole journey`,
            safeRight / 2, 118, safeRight - 24, 13);

        const onPlateau = (joules > b1 && joules <= b2) || (joules > b3 && joules <= b4);
        return {
            meter: {
                fraction: Math.max(0, Math.min(1, joules / b5)),
                caption: 'How Far Along the Journey',
                low: 'Frozen',
                high: 'All steam',
            },
            note: onPlateau
                ? 'On a plateau. Energy is pouring in and the temperature is not moving at all.'
                : 'On a slope. Here the energy is making particles jiggle faster, so the thermometer climbs.',
        };
    };

    return (
        <LabCanvas
            title="The Energy a Thermometer Cannot See"
            readout={({ raw }) => `Heating ${Math.max(1, Math.round(raw))} g of water from ice at -20 °C`}
            controlLabel="Mass"
            controlKey="curveMass"
            controlMin={1}
            controlMax={6}
            controlInitial={1}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} g`}
            control2={{
                label: 'Energy Added',
                key: 'energyAdded',
                min: 0,
                max: 200,
                initial: 40,
                display: raw => `${(Math.max(0, Math.round(raw)) * 100 / 1000).toFixed(1)} kJ`,
            }}
            accent="emerald"
            sky={['#ecfeff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="The Energy a Thermometer Cannot See"
            completeNote="Q = mL, and latent means hidden from the thermometer!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
