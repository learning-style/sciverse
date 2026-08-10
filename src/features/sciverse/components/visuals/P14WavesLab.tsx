import { useRef, useEffect, useCallback, useState } from 'react';

interface P14WavesLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P14WavesLab = ({ state, onStateChange }: P14WavesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    const [frequency, setFrequency] = useState(2);   // Hz-ish visual
    const [amplitude, setAmplitude] = useState(40);
    const [digitalMode, setDigitalMode] = useState(false);
    const [textInput, setTextInput] = useState('A');

    const phase = (state.phase as string) || 'intro';

    const ascii = textInput.length ? textInput.charCodeAt(0) : 65;
    const bits = ascii.toString(2).padStart(8, '0');

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        timeRef.current += 0.03;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Scope frame
        const sx = 16, sy = 40, sw = W - 32, sh = H * 0.56;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(sx, sy, sw, sh);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(sx, sy, sw, sh);

        // Grid
        ctx.strokeStyle = 'rgba(148,163,184,0.2)';
        ctx.lineWidth = 1;
        for (let i = 1; i < 10; i++) {
            const gx = sx + (i / 10) * sw;
            ctx.beginPath();
            ctx.moveTo(gx, sy);
            ctx.lineTo(gx, sy + sh);
            ctx.stroke();
        }
        for (let i = 1; i < 6; i++) {
            const gy = sy + (i / 6) * sh;
            ctx.beginPath();
            ctx.moveTo(sx, gy);
            ctx.lineTo(sx + sw, gy);
            ctx.stroke();
        }

        // Centerline
        const midY = sy + sh / 2;
        ctx.strokeStyle = 'rgba(56,189,248,0.4)';
        ctx.beginPath();
        ctx.moveTo(sx, midY);
        ctx.lineTo(sx + sw, midY);
        ctx.stroke();

        // Wave
        ctx.strokeStyle = digitalMode ? '#22d3ee' : '#38bdf8';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let x = 0; x <= sw; x++) {
            const t = x / sw;
            let yVal = 0;
            if (!digitalMode) {
                yVal = Math.sin((t * frequency * Math.PI * 2) + timeRef.current * frequency);
            } else {
                // Use encoded bits to generate square wave blocks
                const idx = Math.floor(((t + timeRef.current * 0.04) % 1) * 8);
                yVal = bits[idx] === '1' ? 1 : -1;
            }
            const y = midY - yVal * amplitude;
            if (x === 0) ctx.moveTo(sx + x, y);
            else ctx.lineTo(sx + x, y);
        }
        ctx.stroke();

        // Title and labels
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Wave & Signal Lab', W / 2, 24);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px monospace';
        ctx.fillText(digitalMode ? 'Digital Square Wave (Binary Encoding)' : 'Analog Sine Wave', W / 2, sy + sh + 16);

        // Stats
        const statsY = sy + sh + 30;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(sx, statsY, sw, H - statsY - 10);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(sx, statsY, sw, H - statsY - 10);

        ctx.fillStyle = '#475569';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Frequency: ${frequency.toFixed(1)} Hz`, sx + 8, statsY + 16);
        ctx.fillText(`Amplitude: ${amplitude}px`, sx + 8, statsY + 30);
        ctx.fillText(`Mode: ${digitalMode ? 'Digital' : 'Analog'}`, sx + 8, statsY + 44);

        if (digitalMode) {
            ctx.fillStyle = '#67e8f9';
            ctx.textAlign = 'right';
            ctx.fillText(`'${textInput || 'A'}' ASCII ${ascii} = ${bits}`, sx + sw - 8, statsY + 16);
            ctx.fillText('High = 1, Low = 0', sx + sw - 8, statsY + 30);
        } else {
            const wavelength = (100 / frequency).toFixed(1);
            const speed = (frequency * Number(wavelength)).toFixed(1);
            ctx.fillStyle = '#93c5fd';
            ctx.textAlign = 'right';
            ctx.fillText(`Wavelength (relative): ${wavelength}`, sx + sw - 8, statsY + 16);
            ctx.fillText(`Speed = f × λ ≈ ${speed}`, sx + sw - 8, statsY + 30);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [frequency, amplitude, digitalMode, textInput, bits, ascii, phase]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        });
        obs.observe(container);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />

            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[210px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>

                <div className="flex gap-1">
                    <button onClick={() => setDigitalMode(false)} className={`flex-1 text-xs rounded py-1 ${!digitalMode ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Analog</button>
                    <button onClick={() => setDigitalMode(true)} className={`flex-1 text-xs rounded py-1 ${digitalMode ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Digital</button>
                </div>

                <label className="text-slate-300 text-xs">Frequency: <span className="text-sky-400">{frequency.toFixed(1)} Hz</span></label>
                <input type="range" min={0.5} max={8} step={0.1} value={frequency}
                    onChange={e => { setFrequency(Number(e.target.value)); onStateChange('frequency', Number(e.target.value)); }}
                    className="w-full accent-sky-500" />

                <label className="text-slate-300 text-xs">Amplitude: <span className="text-cyan-300">{amplitude}px</span></label>
                <input type="range" min={10} max={70} step={1} value={amplitude}
                    onChange={e => { setAmplitude(Number(e.target.value)); onStateChange('amplitude', Number(e.target.value)); }}
                    className="w-full accent-cyan-500" />

                {digitalMode && (
                    <>
                        <label className="text-slate-300 text-xs">Encode Character</label>
                        <input
                            type="text"
                            value={textInput}
                            maxLength={1}
                            onChange={e => setTextInput(e.target.value.toUpperCase() || 'A')}
                            className="w-full bg-slate-700 text-slate-100 text-xs px-2 py-1 rounded border border-slate-600"
                        />
                    </>
                )}
            </div>
        </div>
    );
};
