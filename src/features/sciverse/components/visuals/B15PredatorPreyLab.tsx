import { useRef, useEffect, useCallback, useState } from 'react';

interface B15PredatorPreyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B15PredatorPreyLab = ({ state, onStateChange }: B15PredatorPreyLabProps) => {
    void onStateChange;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    const [deer, setDeer] = useState(60);
    const [wolves, setWolves] = useState(14);
    const [running, setRunning] = useState(true);
    const [growthRate, setGrowthRate] = useState(0.6); // prey growth

    const historyRef = useRef<Array<{ d: number; w: number }>>([]);

    const phase = (state.phase as string) || 'intro';

    const step = useCallback(() => {
        // Simplified Lotka-Volterra
        const a = growthRate; // prey growth
        const b = 0.02;       // predation
        const c = 0.6;        // predator death
        const d = 0.01;       // predator growth from food

        setDeer(prevD => {
            const D = Math.max(2, prevD);
            const W = Math.max(1, wolves);
            const dD = (a * D - b * D * W) * 0.03;
            return Math.max(0, D + dD);
        });

        setWolves(prevW => {
            const D = Math.max(2, deer);
            const W = Math.max(1, prevW);
            const dW = (-c * W + d * D * W) * 0.03;
            return Math.max(0, W + dW);
        });
    }, [deer, wolves, growthRate]);

    useEffect(() => {
        if (!running) return;
        const id = setInterval(step, 90);
        return () => clearInterval(id);
    }, [running, step]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // field
        const fieldH = H * 0.56;
        ctx.fillStyle = '#14532d';
        ctx.fillRect(0, 0, W, fieldH);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Predator-Prey Dynamics Lab', W / 2, 24);

        // Draw deer icons
        const deerN = Math.min(28, Math.max(0, Math.round(deer / 4)));
        for (let i = 0; i < deerN; i++) {
            const x = 30 + (i % 14) * ((W - 60) / 14);
            const y = 58 + Math.floor(i / 14) * 34;
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.ellipse(x, y, 9, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(x + 6, y - 7, 4, 3); // head
        }

        // Draw wolf icons
        const wolfN = Math.min(20, Math.max(0, Math.round(wolves / 2)));
        for (let i = 0; i < wolfN; i++) {
            const x = 40 + (i % 10) * ((W - 80) / 10);
            const y = fieldH - 60 + Math.floor(i / 10) * 28;
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.ellipse(x, y, 10, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(x + 6, y - 7, 5, 4);
        }

        // Update history
        historyRef.current.push({ d: deer, w: wolves });
        if (historyRef.current.length > 180) historyRef.current.shift();

        // Graph panel
        const gx = 12, gy = H * 0.6, gw = W - 24, gh = H * 0.34;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(gx, gy, gw, gh);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(gx, gy, gw, gh);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Population Oscillation (Lotka-Volterra)', gx + 6, gy + 12);

        const maxV = Math.max(1, ...historyRef.current.map(h => Math.max(h.d, h.w)));

        if (historyRef.current.length > 2) {
            // deer line
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            historyRef.current.forEach((h, i) => {
                const x = gx + (i / (historyRef.current.length - 1)) * gw;
                const y = gy + gh - 8 - (h.d / maxV) * (gh - 18);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // wolf line
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            historyRef.current.forEach((h, i) => {
                const x = gx + (i / (historyRef.current.length - 1)) * gw;
                const y = gy + gh - 8 - (h.w / maxV) * (gh - 18);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();
        }

        // Labels
        ctx.fillStyle = '#fbbf24';
        ctx.font = '11px monospace';
        ctx.fillText(`Deer: ${Math.round(deer)}`, gx + 8, gy + gh - 10);
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'right';
        ctx.fillText(`Wolves: ${Math.round(wolves)}`, gx + gw - 8, gy + gh - 10);

        // Key insight
        ctx.fillStyle = '#86efac';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        if (wolves < 2) {
            ctx.fillText('⚠ Predators near zero: prey boom and future crash risk!', W / 2, gy - 6);
        } else {
            ctx.fillText('Predator lag creates oscillation and ecosystem stability', W / 2, gy - 6);
        }

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 15 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Systems Find Balance?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P15 Pendulum & Resonance', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C15 Chemical Equilibrium', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B15 Predator-Prey Balance', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Feedback loops → dynamic balance everywhere!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [deer, wolves, phase]);

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

    const removeWolves = () => setWolves(0);
    const reintroduceWolves = () => setWolves(prev => Math.max(prev, 14));

    const reset = () => {
        setDeer(60);
        setWolves(14);
        historyRef.current = [];
    };

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />

            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[220px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <div className="flex gap-1">
                    <button onClick={() => setRunning(v => !v)} className={`flex-1 text-xs rounded py-1 ${running ? 'bg-emerald-700 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {running ? 'Pause' : 'Run'}
                    </button>
                    <button onClick={reset} className="flex-1 text-xs rounded py-1 bg-slate-700 text-slate-300">Reset</button>
                </div>

                <label className="text-slate-300 text-xs">Prey Growth: <span className="text-yellow-300">{growthRate.toFixed(2)}</span></label>
                <input type="range" min={0.2} max={1.2} step={0.05} value={growthRate}
                    onChange={e => setGrowthRate(Number(e.target.value))}
                    className="w-full accent-yellow-500" />

                <div className="grid grid-cols-2 gap-1">
                    <button onClick={removeWolves} className="text-xs bg-rose-700 hover:bg-rose-600 text-white rounded px-2 py-1">Remove Wolves</button>
                    <button onClick={reintroduceWolves} className="text-xs bg-indigo-700 hover:bg-indigo-600 text-white rounded px-2 py-1">Reintroduce</button>
                </div>
                <div className="text-xs text-slate-400">Demonstrates Kaibab/Yellowstone predator-prey dynamics.</div>
            </div>
        </div>
    );
};
