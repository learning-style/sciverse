import { useRef, useEffect } from 'react';

interface P4SoundWavesLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const P4SoundWavesLab = ({ state, onStateChange }: P4SoundWavesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const rawFreq = state.frequency;
    const rawAmp = state.amplitude;
    const frequency = (typeof rawFreq === 'number' && isFinite(rawFreq)) ? rawFreq : 3;
    const amplitude = (typeof rawAmp === 'number' && isFinite(rawAmp)) ? rawAmp : 50;
    const playing = (state.playing as boolean) ?? false;

    // Mutable refs so the single animation loop always reads fresh values
    const freqRef = useRef(frequency);
    const ampRef = useRef(amplitude);
    const playingRef = useRef(playing);
    freqRef.current = frequency;
    ampRef.current = amplitude;
    playingRef.current = playing;

    // Map slider values to audible range
    const audibleFreq = 100 + (frequency - 1) * 80;   // 100–660 Hz
    const gain = (amplitude / 100) * 0.25;              // 0–0.25

    // Start / stop oscillator when playing toggles
    useEffect(() => {
        if (playing) {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioContext();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = audibleFreq;
            g.gain.value = gain;
            osc.connect(g).connect(ctx.destination);
            osc.start();
            oscRef.current = osc;
            gainRef.current = g;
        } else {
            oscRef.current?.stop();
            oscRef.current = null;
            gainRef.current = null;
        }
        return () => {
            oscRef.current?.stop();
            oscRef.current = null;
            gainRef.current = null;
        };
    }, [playing]);  // eslint-disable-line react-hooks/exhaustive-deps

    // Live-update frequency & gain while playing
    useEffect(() => {
        if (oscRef.current) oscRef.current.frequency.value = audibleFreq;
        if (gainRef.current) gainRef.current.gain.value = gain;
    }, [audibleFreq, gain]);

    // Cleanup AudioContext on unmount
    useEffect(() => {
        return () => { audioCtxRef.current?.close(); };
    }, []);

    // Single stable animation loop — reads from refs, never re-created
    useEffect(() => {
        const animate = () => {
            const canvas = canvasRef.current;
            if (!canvas) { animRef.current = requestAnimationFrame(animate); return; }
            const ctx = canvas.getContext('2d');
            if (!ctx) { animRef.current = requestAnimationFrame(animate); return; }

            const W = canvas.width, H = canvas.height;
            const isPlaying = playingRef.current;
            const freq = freqRef.current;
            const amp = ampRef.current;

            if (isPlaying) timeRef.current += 0.03;

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 21px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Sound Waves', W / 2, 28);

            const cy = H * 0.45;
            const startX = W * 0.08;
            const endX = W * 0.88;
            const numDots = 40;
            const spacing = (endX - startX) / numDots;

            // Speaker
            const spkX = startX - 15;
            ctx.fillStyle = isPlaying ? '#3b82f6' : '#94a3b8';
            ctx.fillRect(spkX - 20, cy - 25, 20, 50);
            ctx.beginPath();
            ctx.moveTo(spkX, cy - 25);
            ctx.lineTo(spkX + 15, cy - 40);
            ctx.lineTo(spkX + 15, cy + 40);
            ctx.lineTo(spkX, cy + 25);
            ctx.closePath();
            ctx.fill();

            // Sound rings from speaker
            if (isPlaying) {
                for (let r = 1; r <= 3; r++) {
                    const ringR = 20 + r * 15 + Math.sin(timeRef.current * 5 - r) * 5;
                    ctx.strokeStyle = `rgba(59,130,246,${0.3 - r * 0.08})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(spkX + 15, cy, ringR, -Math.PI / 3, Math.PI / 3);
                    ctx.stroke();
                }
            }

            // Ear
            const earX = endX + 20;
            ctx.fillStyle = '#fbbf24';
            ctx.font = '28px serif';
            ctx.textAlign = 'center';
            ctx.fillText('👂', earX, cy + 10);

            // Particle dots
            const ampScale = amp / 100;
            for (let i = 0; i < numDots; i++) {
                const baseX = startX + i * spacing;
                let dx = 0;
                if (isPlaying) {
                    dx = Math.sin(timeRef.current * freq * 3 - i * 0.5) * spacing * 0.4 * ampScale;
                }
                const x = baseX + dx;

                const nextDx = isPlaying ? Math.sin(timeRef.current * freq * 3 - (i + 1) * 0.5) * spacing * 0.4 * ampScale : 0;
                const compression = dx - nextDx;
                const dotR = Math.max(3, 5 - compression * 0.5);

                ctx.beginPath();
                ctx.arc(x, cy, dotR, 0, Math.PI * 2);
                ctx.fillStyle = isPlaying ? (compression > 0 ? '#ef4444' : '#3b82f6') : '#94a3b8';
                ctx.fill();
            }

            // Labels
            if (isPlaying) {
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('Compressed', W * 0.35, cy + 50);
                ctx.fillStyle = '#3b82f6';
                ctx.fillText('Stretched', W * 0.55, cy + 50);
            }

            // Waveform visualization below
            const waveY = H * 0.73;
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(startX, waveY);
            ctx.lineTo(endX, waveY);
            ctx.stroke();

            if (isPlaying) {
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let x = startX; x <= endX; x += 2) {
                    const t = (x - startX) / (endX - startX);
                    const y = waveY + Math.sin(timeRef.current * freq * 3 - t * numDots * 0.5) * 25 * ampScale;
                    if (x === startX) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();

                ctx.fillStyle = '#7c3aed';
                ctx.font = '17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('Waveform view', W / 2, waveY + 40);
            }

            // Freq / Amp labels
            ctx.fillStyle = '#64748b';
            ctx.font = '18px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`Frequency: ${freq} Hz`, 20, H - 50);
            ctx.fillText(`Amplitude: ${amp}%`, 20, H - 35);

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    useEffect(() => {
        const resize = () => {
            const c = canvasRef.current, ct = containerRef.current;
            if (!c || !ct) return;
            c.width = ct.clientWidth;
            c.height = ct.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const showControls = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-4 flex-wrap justify-center">
                    <button onClick={() => onStateChange?.('playing', !playing)} className={`px-4 py-1.5 rounded-lg text-sm font-bold text-white ${playing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                        {playing ? '🔇 Stop' : '🔊 Play'}
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Freq</span>
                        <input type="range" min={1} max={8} step={0.5} value={frequency} onChange={e => onStateChange?.('frequency', Number(e.target.value))} className="w-20 h-2 accent-purple-500 cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Amp</span>
                        <input type="range" min={10} max={100} value={amplitude} onChange={e => onStateChange?.('amplitude', Number(e.target.value))} className="w-20 h-2 accent-purple-500 cursor-pointer" />
                    </div>
                </div>
            )}
        </div>
    );
};


