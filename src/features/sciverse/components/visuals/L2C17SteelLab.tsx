import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const STEEL = 400;         // N/mm2 a reinforcing bar carries in stretching
const EMERALD = '#047857';
const BAR = '#b45309';

const tensionOf = (dial: number): number => Math.max(40, Math.min(300, Math.round(dial / 10) * 10));
const barOf = (dial: number): number => Math.max(8, Math.min(20, Math.round(dial / 2) * 2));
const areaOfBar = (d: number): number => Math.PI * (d / 2) * (d / 2);

export const L2C17SteelLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const kN = tensionOf(raw);
        const dia = barOf(raw2);
        const needed = (kN * 1000) / STEEL;
        const one = areaOfBar(dia);
        const bars = Math.max(1, Math.ceil(needed / one));
        const supplied = bars * one;
        const spare = supplied - needed;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const labelTail = Math.max(16, Math.min(26, usable * 0.13));
        const beamH = Math.max(40, Math.min(140, usable - labelTail - 14));
        const blockH = beamH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const beamW = Math.min(safeRight - 80, beamH * 1.5);
        const beamX = (safeRight - beamW) / 2;

        // the beam, squeezed along the top and stretched along the bottom
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(beamX, top, beamW, beamH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(beamX, top, beamW, beamH);
        outlineText(ctx, 'squeezed', beamX + beamW / 2, top + 14,
            '10px monospace', EMERALD, 'center', beamW - 8);
        outlineText(ctx, 'stretched', beamX + beamW / 2, top + beamH - 20,
            '10px monospace', BAR, 'center', beamW - 8);

        // the steel bars, laid along the bottom where the stretching is
        const barR = Math.max(3, Math.min(9, (beamW - 24) / (bars * 2.6)));
        const gap = (beamW - 20) / bars;
        const barY = top + beamH - barR - 5;
        for (let i = 0; i < bars; i++) {
            const bx = beamX + 10 + gap * (i + 0.5);
            ctx.fillStyle = BAR;
            ctx.beginPath();
            ctx.arc(bx, barY, barR, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        outlineText(ctx, bars + ' steel bars of ' + dia + ' mm',
            safeRight / 2, Math.min(top + beamH + labelTail, artBottom),
            'bold 11px monospace', BAR, 'center', safeRight - 30);

        outlineText(ctx, kN + ' kN / ' + STEEL + ' = ' + needed.toFixed(0)
            + ' mm² of steel needed',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, bars + ' bars give ' + supplied.toFixed(0) + ' mm², which is '
            + spare.toFixed(0) + ' mm² spare',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', EMERALD, 'center', safeRight - 30);

        fitText(ctx, needed.toFixed(0) + ' mm² of steel needed', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Steel where it stretches, concrete where it squeezes', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, spare / needed / 0.4)),
                caption: 'Spare Steel in the Beam',
                low: 'almost none',
                high: 'a third more',
                stops: ['#ecfdf5', '#fcd34d', BAR] as [string, string, string],
            },
            note: 'A pull of ' + kN + ' kN needs ' + needed.toFixed(0)
                + ' mm² of steel, because steel carries ' + STEEL
                + ' N/mm². One ' + dia + ' mm bar is ' + one.toFixed(1)
                + ' mm², so it takes ' + bars + ' bars, giving ' + supplied.toFixed(0)
                + ' mm². Bars come in whole numbers, so you always round up, and the '
                + spare.toFixed(0) + ' mm² spare is the price of that.',
        };
    };

    return (
        <LabCanvas
            title="How Much Steel Does It Need?"
            readout={({ raw }) => 'A pull of ' + tensionOf(raw) + ' kN'}
            controlLabel="Tension Force"
            controlKey="beamTension"
            controlMin={40}
            controlMax={300}
            controlInitial={120}
            controlDisplay={raw => tensionOf(raw) + ' kN'}
            control2={{
                label: 'Bar Diameter',
                key: 'barDiameter',
                min: 8,
                max: 20,
                initial: 10,
                display: raw => barOf(raw) + ' mm',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Much Steel Does It Need?"
            completeNote="A little steel replaces a lot of concrete!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
