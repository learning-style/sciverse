import { useRef, useEffect } from 'react';

interface B4SensesLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface Signal {
    x: number; y: number; t: number; speed: number; path: 'ear' | 'eye';
}

export const B4SensesLab = ({ state, onStateChange }: B4SensesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const signalsRef = useRef<Signal[]>([]);
    const timeRef = useRef(0);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const nerveBlocked = (state.nerveBlocked as boolean) ?? false;
    const activeSense = (state.activeSense as string) || '';
    const phase = (state.phase as string) || 'intro';

    // Mutable refs for stable animation loop
    const nerveBlockedRef = useRef(nerveBlocked);
    const activeSenseRef = useRef(activeSense);
    const phaseRef = useRef(phase);
    nerveBlockedRef.current = nerveBlocked;
    activeSenseRef.current = activeSense;
    phaseRef.current = phase;

    // Play / stop a tone when ear sense is activated
    const hearingActive = activeSense === 'ear' && !nerveBlocked;
    useEffect(() => {
        if (hearingActive) {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioContext();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 440;
            g.gain.value = 0.18;
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
    }, [hearingActive]);

    // Cleanup AudioContext on unmount
    useEffect(() => {
        return () => { audioCtxRef.current?.close(); };
    }, []);

    // Single stable animation loop
    useEffect(() => {
        const animate = () => {
            const canvas = canvasRef.current;
            if (!canvas) { animRef.current = requestAnimationFrame(animate); return; }
            const ctx = canvas.getContext('2d');
            if (!ctx) { animRef.current = requestAnimationFrame(animate); return; }
            const W = canvas.width, H = canvas.height;
            timeRef.current += 0.016;

            const curNerveBlocked = nerveBlockedRef.current;
            const curActiveSense = activeSenseRef.current;

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 21px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Senses & Nerves', W / 2, 28);

            const earPathY = H * 0.3;
            const eyePathY = H * 0.65;
            const sensorX = W * 0.12;
            const nerveX = W * 0.5;
            const brainX = W * 0.85;

            const drawPathway = (y: number, emoji: string, label: string, path: 'ear' | 'eye', color: string) => {
                ctx.font = '32px serif';
                ctx.textAlign = 'center';
                ctx.fillText(emoji, sensorX, y + 12);
                ctx.fillStyle = '#334155';
                ctx.font = 'bold 18px monospace';
                ctx.fillText(label, sensorX, y + 38);

                ctx.strokeStyle = curNerveBlocked ? '#ef4444' : color;
                ctx.lineWidth = 4;
                ctx.setLineDash(curNerveBlocked ? [6, 6] : []);
                ctx.beginPath();
                ctx.moveTo(sensorX + 30, y);
                ctx.lineTo(brainX - 30, y);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = curNerveBlocked ? '#ef4444' : '#64748b';
                ctx.font = '17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(curNerveBlocked ? '❌ NERVE BLOCKED' : '⚡ Nerve fiber', nerveX, y - 15);

                if (curNerveBlocked) {
                    ctx.strokeStyle = '#ef4444';
                    ctx.lineWidth = 4;
                    const bx = nerveX;
                    ctx.beginPath();
                    ctx.moveTo(bx - 12, y - 12);
                    ctx.lineTo(bx + 12, y + 12);
                    ctx.moveTo(bx + 12, y - 12);
                    ctx.lineTo(bx - 12, y + 12);
                    ctx.stroke();
                }

                ctx.font = '32px serif';
                ctx.textAlign = 'center';
                ctx.fillText('🧠', brainX, y + 12);

                const brainActive = curActiveSense === path && !curNerveBlocked;
                if (brainActive) {
                    ctx.strokeStyle = `rgba(124,58,237,${Math.sin(timeRef.current * 4) * 0.3 + 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(brainX, y, 25, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fillStyle = '#7c3aed';
                    ctx.font = 'bold 17px monospace';
                    ctx.fillText('Signal received!', brainX, y + 40);
                } else if (curActiveSense === path && curNerveBlocked) {
                    ctx.fillStyle = '#ef4444';
                    ctx.font = 'bold 17px monospace';
                    ctx.fillText('No signal!', brainX, y + 40);
                }
            };

            drawPathway(earPathY, '👂', 'Ear', 'ear', '#3b82f6');
            drawPathway(eyePathY, '👁️', 'Eye', 'eye', '#22c55e');

            if (curActiveSense) {
                if (Math.random() < 0.08) {
                    signalsRef.current.push({
                        x: sensorX + 30, y: curActiveSense === 'ear' ? earPathY : eyePathY,
                        t: 0, speed: 4, path: curActiveSense as 'ear' | 'eye'
                    });
                }
            }

            signalsRef.current = signalsRef.current.filter(s => s.x < brainX);
            for (const s of signalsRef.current) {
                if (curNerveBlocked && s.x > nerveX - 15) {
                    ctx.fillStyle = '#ef4444';
                    ctx.beginPath();
                    ctx.arc(nerveX - 15, s.y, 5, 0, Math.PI * 2);
                    ctx.fill();
                    s.x = nerveX - 14;
                    continue;
                }
                s.x += s.speed;
                ctx.fillStyle = s.path === 'ear' ? '#3b82f6' : '#22c55e';
                ctx.beginPath();
                ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = s.path === 'ear' ? 'rgba(59,130,246,0.2)' : 'rgba(34,197,94,0.2)';
                ctx.beginPath();
                ctx.arc(s.x - 8, s.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Big Idea 4 Complete banner
            if (phaseRef.current === 'complete') {
                ctx.fillStyle = 'rgba(0,0,0,0.55)';
                ctx.fillRect(W * 0.1, H * 0.5, W * 0.8, H * 0.4);
                ctx.strokeStyle = 'rgba(34,197,94,0.5)';
                ctx.lineWidth = 2;
                ctx.strokeRect(W * 0.1, H * 0.5, W * 0.8, H * 0.4);
                ctx.fillStyle = '#22c55e';
                ctx.font = 'bold 20px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('✅ Big Idea 4 Complete!', W / 2, H * 0.5 + 25);
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.font = '17px monospace';
                ctx.fillText('P4: Sound Waves (vibrations)', W / 2, H * 0.5 + 50);
                ctx.fillText('C4: Light & Color (wavelengths)', W / 2, H * 0.5 + 68);
                ctx.fillText('B4: Eyes, Ears & Nerves (sensors)', W / 2, H * 0.5 + 86);
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.fillText('Waves carry information to your brain! 🧠', W / 2, H * 0.5 + 112);
            }

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

    useEffect(() => {
        signalsRef.current = [];
    }, [activeSense, nerveBlocked]);

    const showControls = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-3 flex-wrap justify-center">
                    <button onClick={() => onStateChange?.('activeSense', activeSense === 'ear' ? '' : 'ear')} className={`px-3 py-1.5 rounded-lg text-sm font-bold ${activeSense === 'ear' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}>
                        👂 Hear
                    </button>
                    <button onClick={() => onStateChange?.('activeSense', activeSense === 'eye' ? '' : 'eye')} className={`px-3 py-1.5 rounded-lg text-sm font-bold ${activeSense === 'eye' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}>
                        👁️ See
                    </button>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={nerveBlocked} onChange={e => onStateChange?.('nerveBlocked', e.target.checked)} className="accent-red-500" />
                        <span className="text-xs font-bold text-red-600">Block Nerve</span>
                    </label>
                </div>
            )}
        </div>
    );
};


