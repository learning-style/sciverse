import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MOTH_M = 0.02;
const PERSON_M = 1.7;

/** Each step of the dial doubles the frequency every ten steps: 100 Hz to about 100,000 Hz. */
const freqFromDial = (dial: number): number => 100 * Math.pow(2, Math.round(dial) / 10);
const hzText = (hz: number): string => `${Math.round(hz).toLocaleString()} Hz`;
const lengthText = (metres: number): string =>
    metres >= 1 ? `${metres.toFixed(2)} m` : metres >= 0.01 ? `${(metres * 100).toFixed(1)} cm` : `${(metres * 1000).toFixed(1)} mm`;

export const L2P4WaveLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, t, stageTop, stageBottom }: LabScene) => {
        const freq = freqFromDial(raw);
        const speed = Math.max(300, Math.round(raw2));
        const lambda = speed / freq;
        const echoes = lambda <= MOTH_M;

        // Everything below is laid out for a 180 px stage and squeezed on shorter ones
        const sy = Math.max(0.6, Math.min(1, (stageBottom - 56 - stageTop) / 180));

        // Two metres of the wave, drawn to scale
        const waveX = 40;
        const waveW = safeRight - 80;
        const amp = 22 * sy;
        const waveY = stageTop + 12 + amp;
        const cycles = 2 / lambda;

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(waveX, waveY);
        ctx.lineTo(waveX + waveW, waveY);
        ctx.stroke();

        if (cycles <= 80) {
            ctx.strokeStyle = '#4f46e5';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            const steps = Math.max(200, Math.ceil(cycles * 24));
            for (let i = 0; i <= steps; i++) {
                const frac = i / steps;
                const px = waveX + frac * waveW;
                const py = waveY + Math.sin(frac * cycles * Math.PI * 2 - t * 2) * amp;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
        } else {
            ctx.fillStyle = 'rgba(79,70,229,0.22)';
            ctx.fillRect(waveX, waveY - amp, waveW, amp * 2);
            outlineText(ctx, 'too many waves to show', safeRight / 2, waveY + 5,
                'bold 12px monospace', '#3730a3', 'center', waveW - 20);
        }
        outlineText(ctx, 'two metres of the wave, to scale', safeRight / 2, waveY + amp + 18,
            'bold 11px monospace', '#475569', 'center', waveW);

        // A ruler from 1 mm to 20 m, spaced by powers of ten
        const rulerY = waveY + amp + 18 + 44 * sy;
        const minLog = Math.log10(0.001);
        const maxLog = Math.log10(20);
        const xOfLength = (metres: number): number =>
            waveX + ((Math.log10(Math.max(0.001, Math.min(20, metres))) - minLog) / (maxLog - minLog)) * waveW;

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(waveX, rulerY);
        ctx.lineTo(waveX + waveW, rulerY);
        ctx.stroke();
        const ticks: [number, string][] = [[0.001, '1 mm'], [0.01, '1 cm'], [0.1, '10 cm'], [1, '1 m'], [10, '10 m']];
        ticks.forEach(([metres, label]) => {
            const tx = xOfLength(metres);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(tx, rulerY - 5);
            ctx.lineTo(tx, rulerY + 5);
            ctx.stroke();
            outlineText(ctx, label, tx, rulerY + 17, '11px monospace', '#475569', 'center', 48);
        });

        const markers: [number, string][] = [[MOTH_M, 'moth'], [PERSON_M, 'person']];
        markers.forEach(([metres, label]) => {
            const mx = xOfLength(metres);
            ctx.fillStyle = '#64748b';
            ctx.beginPath();
            ctx.moveTo(mx, rulerY - 4);
            ctx.lineTo(mx - 6, rulerY - 13);
            ctx.lineTo(mx + 6, rulerY - 13);
            ctx.closePath();
            ctx.fill();
            outlineText(ctx, label, mx, rulerY - 18, 'bold 11px monospace', '#334155', 'center', 60);
        });

        // The current wavelength, marked under the ruler
        const lx = xOfLength(lambda);
        const arrowTop = rulerY + 25;
        ctx.fillStyle = echoes ? '#15803d' : '#b91c1c';
        ctx.beginPath();
        ctx.moveTo(lx, arrowTop);
        ctx.lineTo(lx - 7, arrowTop + 11);
        ctx.lineTo(lx + 7, arrowTop + 11);
        ctx.closePath();
        ctx.fill();
        outlineText(ctx, `λ ${lengthText(lambda)}`, Math.max(waveX + 40, Math.min(waveX + waveW - 40, lx)), arrowTop + 26,
            'bold 12px monospace', echoes ? '#166534' : '#991b1b', 'center', 110);

        outlineText(ctx, `λ = v / f = ${speed} / ${Math.round(freq).toLocaleString()} = ${lengthText(lambda)}`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, echoes ? 'short enough to echo off a moth' : 'too long to echo off a moth',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', echoes ? '#166534' : '#b91c1c', 'center', safeRight - 30);

        fitText(ctx, `Wavelength ${lengthText(lambda)}`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Higher f, shorter λ -- faster v, longer λ', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, 1 - (Math.log10(lambda) - minLog) / (maxLog - minLog))),
                caption: 'How Small a Thing It Can Find',
                low: 'Only big things',
                high: 'As small as a moth',
            },
            note: echoes
                ? `At ${hzText(freq)} each wave is ${lengthText(lambda)} long -- small enough to get an echo from a moth.`
                : `At ${hzText(freq)} each wave is ${lengthText(lambda)} long -- far longer than a moth, so almost nothing echoes back.`,
        };
    };

    return (
        <LabCanvas
            title="Why Bats Squeak So High"
            readout={({ raw }) => `Frequency ${hzText(freqFromDial(raw))}`}
            controlLabel="Frequency"
            controlKey="waveFrequency"
            controlMin={0}
            controlMax={100}
            controlInitial={11}
            controlDisplay={raw => hzText(freqFromDial(raw))}
            control2={{
                label: 'Wave Speed',
                key: 'waveSpeed',
                min: 300,
                max: 1600,
                initial: 343,
                display: raw => `${Math.max(300, Math.round(raw))} m/s`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="Why Bats Squeak So High"
            completeNote="v = f x λ -- short waves find small things!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
