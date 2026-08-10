import { useRef, useEffect, useCallback, useState } from 'react';

interface C15EquilibriumLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

interface Molecule {
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: 'reactant' | 'product';
}

export const C15EquilibriumLab = ({ state, onStateChange }: C15EquilibriumLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const moleculesRef = useRef<Molecule[]>([]);

    const [reactants, setReactants] = useState(18);
    const [products, setProducts] = useState(2);
    const [running, setRunning] = useState(true);
    const [temperature, setTemperature] = useState(50);

    const phase = (state.phase as string) || 'intro';

    useEffect(() => {
        const list: Molecule[] = [];
        for (let i = 0; i < reactants; i++) {
            list.push({ x: Math.random() * 0.45 + 0.03, y: Math.random() * 0.8 + 0.07, vx: (Math.random() - 0.5) * 0.005, vy: (Math.random() - 0.5) * 0.005, type: 'reactant' });
        }
        for (let i = 0; i < products; i++) {
            list.push({ x: Math.random() * 0.45 + 0.52, y: Math.random() * 0.8 + 0.07, vx: (Math.random() - 0.5) * 0.005, vy: (Math.random() - 0.5) * 0.005, type: 'product' });
        }
        moleculesRef.current = list;
    }, []);

    const historyRef = useRef<Array<{ r: number; p: number }>>([]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Chemical Equilibrium Lab', W / 2, 24);

        const rx = 16, ry = 40, rw = W * 0.46, rh = H * 0.58;
        const px = W * 0.52, py = 40, pw = W * 0.46, ph = H * 0.58;

        // Chambers
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(rx, ry, rw, rh);
        ctx.fillRect(px, py, pw, ph);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, ry, rw, rh);
        ctx.strokeRect(px, py, pw, ph);

        // Reaction arrows center
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('⇌', W / 2, ry + rh * 0.5);

        // Dynamic conversion rates
        const forwardRate = 0.003 + temperature / 50000;
        const reverseRate = 0.0025 + (100 - temperature) / 60000;

        if (running) {
            for (const m of moleculesRef.current) {
                m.x += m.vx;
                m.y += m.vy;
                if (m.type === 'reactant') {
                    if (m.x < 0.03 || m.x > 0.49) m.vx *= -1;
                } else {
                    if (m.x < 0.52 || m.x > 0.98) m.vx *= -1;
                }
                if (m.y < 0.07 || m.y > 0.9) m.vy *= -1;

                // random conversion
                const chance = Math.random();
                if (m.type === 'reactant' && chance < forwardRate) {
                    m.type = 'product';
                    m.x = 0.52 + Math.random() * 0.46;
                } else if (m.type === 'product' && chance < reverseRate) {
                    m.type = 'reactant';
                    m.x = 0.03 + Math.random() * 0.46;
                }
            }
        }

        const rCount = moleculesRef.current.filter(m => m.type === 'reactant').length;
        const pCount = moleculesRef.current.length - rCount;
        setReactants(rCount);
        setProducts(pCount);

        historyRef.current.push({ r: rCount, p: pCount });
        if (historyRef.current.length > 120) historyRef.current.shift();

        // Draw molecules
        for (const m of moleculesRef.current) {
            const x = m.x * W;
            const y = m.y * H;
            if (m.type === 'reactant') {
                ctx.fillStyle = '#60a5fa';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = '#f87171';
                ctx.beginPath();
                ctx.rect(x - 4, y - 4, 8, 8);
                ctx.fill();
            }
        }

        ctx.fillStyle = '#93c5fd';
        ctx.font = '12px monospace';
        ctx.fillText(`Reactants: ${rCount}`, rx + rw / 2, ry + rh + 16);
        ctx.fillStyle = '#fca5a5';
        ctx.fillText(`Products: ${pCount}`, px + pw / 2, py + ph + 16);

        // Graph panel
        const gx = 16, gy = H * 0.72, gw = W - 32, gh = H * 0.22;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(gx, gy, gw, gh);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(gx, gy, gw, gh);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Population vs Time (approaching dynamic equilibrium)', gx + 6, gy + 12);

        if (historyRef.current.length > 2) {
            const maxCount = Math.max(1, ...historyRef.current.map(h => Math.max(h.r, h.p)));
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            historyRef.current.forEach((h, i) => {
                const x = gx + (i / (historyRef.current.length - 1)) * gw;
                const y = gy + gh - 8 - (h.r / maxCount) * (gh - 18);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();

            ctx.strokeStyle = '#f87171';
            ctx.beginPath();
            historyRef.current.forEach((h, i) => {
                const x = gx + (i / (historyRef.current.length - 1)) * gw;
                const y = gy + gh - 8 - (h.p / maxCount) * (gh - 18);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();
        }

        const ratio = rCount > 0 ? (pCount / rCount) : 0;
        ctx.fillStyle = '#fbbf24';
        ctx.font = '11px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`K≈[P]/[R] = ${ratio.toFixed(2)}`, gx + gw - 8, gy + 12);

        animRef.current = requestAnimationFrame(animate);
    }, [running, temperature, phase]);

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

    const addReactants = () => {
        for (let i = 0; i < 8; i++) {
            moleculesRef.current.push({
                x: 0.03 + Math.random() * 0.46,
                y: 0.07 + Math.random() * 0.8,
                vx: (Math.random() - 0.5) * 0.005,
                vy: (Math.random() - 0.5) * 0.005,
                type: 'reactant'
            });
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />

            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[220px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <div className="flex gap-1">
                    <button onClick={() => setRunning(v => !v)}
                        className={`flex-1 text-xs rounded py-1 ${running ? 'bg-emerald-700 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {running ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={addReactants} className="flex-1 text-xs rounded py-1 bg-cyan-700 text-white hover:bg-cyan-600">+ Reactants</button>
                </div>
                <label className="text-slate-300 text-xs">Temperature: <span className="text-orange-300">{temperature}°</span></label>
                <input type="range" min={0} max={100} value={temperature}
                    onChange={e => { setTemperature(Number(e.target.value)); onStateChange('temperature', Number(e.target.value)); }}
                    className="w-full accent-orange-500" />
                <div className="text-xs text-slate-400">Forward and reverse reactions continue at equilibrium.</div>
            </div>
        </div>
    );
};
