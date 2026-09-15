import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** H⁺ in each litre of pure water, on the scale where pH 7 = 10⁻⁷. */
const WATER_H = 1e-7;

const startOf = (dial: number): number => Math.max(0, Math.min(6, Math.round(dial * 2) / 2));
const dilutionsOf = (dial: number): number => Math.max(0, Math.min(10, Math.round(dial)));

const volumeText = (ml: number): string => (ml < 1000 ? `${ml} mL` : `${(ml / 1000).toLocaleString()} L`);
const timesText = (x: number): string => (x < 1e7 ? Math.round(x).toLocaleString() : `${(x / 1e6).toFixed(0)} million`);

/** Uniform indicator-style colour along the scale, 0 red to 14 purple. */
const scaleColour = (ph: number): string => `hsl(${Math.max(0, Math.min(14, ph)) * (270 / 14)}, 80%, 48%)`;

export const L2C11DilutionLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const start = startOf(raw);
        const n = dilutionsOf(raw2);
        // The acid's own H⁺ spread through 10ⁿ times the volume, plus the water's own share
        const acidH = Math.pow(10, -start) - WATER_H;
        const h = acidH / Math.pow(10, n) + WATER_H;
        const ph = -Math.log10(h);
        const ruleSays = start + n;
        const fewer = Math.pow(10, -start) / h;

        // The pH scale, with the start and the result marked
        const x0 = 40;
        const x1 = safeRight - 40;
        const barY = stageTop + 34;
        const xAt = (p: number): number => x0 + (p / 14) * (x1 - x0);
        for (let i = 0; i < 70; i++) {
            ctx.fillStyle = scaleColour((i / 70) * 14);
            ctx.fillRect(xAt((i / 70) * 14), barY, (x1 - x0) / 70 + 1, 20);
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x0, barY, x1 - x0, 20);
        for (let p = 0; p <= 14; p += 7) {
            outlineText(ctx, `pH ${p}`, xAt(p), barY + 36, '11px monospace', '#475569', 'center', 60);
        }
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xAt(start), barY + 10, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(xAt(ph), barY - 2);
        ctx.lineTo(xAt(ph) - 7, barY - 14);
        ctx.lineTo(xAt(ph) + 7, barY - 14);
        ctx.closePath();
        ctx.fill();
        if (Math.abs(xAt(ph) - xAt(start)) > 16) {
            ctx.beginPath();
            ctx.moveTo(xAt(start) + 9, barY + 26);
            ctx.lineTo(xAt(ph) - 4, barY + 26);
            ctx.stroke();
        }

        const lines: [string, string][] = [
            [`start pH ${start.toFixed(1)}`, '#334155'],
            [`after ${n} tenfold dilutions: pH ${ph.toFixed(2)}`, '#0f172a'],
            [`volume from 1 mL: ${volumeText(Math.pow(10, n))}`, '#334155'],
            [fewer < 1.5 ? 'H⁺ in each litre: the same as the start' : `H⁺ in each litre: ${timesText(fewer)} times fewer`, '#334155'],
        ];
        const ly = barY + 64;
        const step = Math.max(18, Math.min(24, (stageBottom - 60 - ly) / 4));
        lines.forEach(([text, fill], i) => {
            outlineText(ctx, text, x0, ly + i * step, i === 1 ? 'bold 13px monospace' : '12px monospace', fill, 'left', x1 - x0);
        });

        outlineText(ctx, `rule: pH ${start.toFixed(1)} + ${n} = pH ${ruleSays.toFixed(1)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, ruleSays > 6.5 ? `near pH 7, water's own H⁺ count: pH ${ph.toFixed(2)}` : `the rule holds: pH ${ph.toFixed(2)}`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', ruleSays > 6.5 ? '#b45309' : '#047857', 'center', safeRight - 30);

        fitText(ctx, `pH ${start.toFixed(1)} to pH ${ph.toFixed(2)} after ${n} tenfold dilutions`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Ten times for every step', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, ph / 14)),
                caption: 'pH',
                low: '0',
                high: '14',
                stops: ['#dc2626', '#22c55e', '#7c3aed'] as [string, string, string],
            },
            note: `An acid at pH ${start.toFixed(1)}, diluted tenfold ${n} times, ends at pH ${ph.toFixed(2)}, with ${timesText(fewer)} times fewer H⁺ in each litre.`,
        };
    };

    return (
        <LabCanvas
            title="Ten Times for Every Step"
            readout={({ raw }) => `An acid starting at pH ${startOf(raw).toFixed(1)}`}
            controlLabel="Starting pH"
            controlKey="startingPh"
            controlMin={0}
            controlMax={6}
            controlInitial={1}
            controlDisplay={raw => `pH ${startOf(raw).toFixed(1)}`}
            control2={{
                label: 'Dilutions',
                key: 'dilutions',
                min: 0,
                max: 10,
                initial: 3,
                display: raw => `${dilutionsOf(raw)}`,
            }}
            accent="emerald"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Ten Times for Every Step"
            completeNote="Ten times a step!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
