import { useRef, useEffect, useCallback } from 'react';

interface P2StatesLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface Particle { x: number; y: number; vx: number; vy: number; color: string; }

const COUNT = 50;
const R = 6;
const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export const P2StatesLab = ({ state, onStateChange }: P2StatesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const matterState = (state.state as string) || 'solid';
    const showPiston = (state.showPiston as boolean) || false;
    const pistonPos = (state.pistonPosition as number) || 100;
    const phase = (state.phase as string) || 'solid';

    useEffect(() => {
        const ps: Particle[] = [];
        for (let i = 0; i < COUNT; i++) {
            ps.push({ x: 100 + Math.random() * 200, y: 100 + Math.random() * 200, vx: 0, vy: 0, color: COLORS[i % COLORS.length] });
        }
        particlesRef.current = ps;
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;

        const boxL = 60, boxT = 80, boxR = W - 60, boxB = H - 100;
        const topLimit = showPiston ? boxT + (1 - pistonPos / 100) * (boxB - boxT) * 0.6 : boxT;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('States of Matter', W / 2, 28);

        // State label badge
        const stateLabel = matterState.charAt(0).toUpperCase() + matterState.slice(1);
        const stateColors: Record<string, string> = { solid: '#3b82f6', liquid: '#06b6d4', gas: '#f59e0b' };
        ctx.fillStyle = stateColors[matterState] || '#64748b';
        ctx.font = 'bold 19px monospace';
        ctx.fillText(`State: ${stateLabel}`, W / 2, 52);

        // Container
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.strokeRect(boxL, boxT, boxR - boxL, boxB - boxT);

        // Piston
        if (showPiston) {
            ctx.fillStyle = '#64748b';
            ctx.fillRect(boxL + 2, topLimit - 8, boxR - boxL - 4, 10);
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(W / 2 - 6, topLimit - 40, 12, 35);
            ctx.fillStyle = '#475569';
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('▼ Piston', W / 2, topLimit - 44);
        }

        // Physics params per state
        let speed = 0.3, gridMode = false;
        if (matterState === 'solid') { speed = 0.3; gridMode = true; }
        else if (matterState === 'liquid') { speed = 1.5; }
        else { speed = 3.5; }

        const ps = particlesRef.current;
        for (let i = 0; i < ps.length; i++) {
            const p = ps[i];
            if (gridMode) {
                const cols = 8;
                const gx = boxL + 30 + (i % cols) * 22;
                const gy = boxB - 30 - Math.floor(i / cols) * 22;
                p.x += (gx - p.x) * 0.05;
                p.y += (gy - p.y) * 0.05;
                p.vx = (Math.random() - 0.5) * speed;
                p.vy = (Math.random() - 0.5) * speed;
                p.x += p.vx;
                p.y += p.vy;
            } else {
                const cs = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (cs > 0.01) {
                    p.vx += (p.vx / cs * speed - p.vx) * 0.04;
                    p.vy += (p.vy / cs * speed - p.vy) * 0.04;
                } else {
                    p.vx = (Math.random() - 0.5) * speed;
                    p.vy = (Math.random() - 0.5) * speed;
                }
                p.vx += (Math.random() - 0.5) * 0.2;
                p.vy += (Math.random() - 0.5) * 0.2;
                if (matterState === 'liquid') p.vy += 0.05; // gravity for liquid
                p.x += p.vx;
                p.y += p.vy;
            }
            if (p.x - R < boxL) { p.x = boxL + R; p.vx *= -1; }
            if (p.x + R > boxR) { p.x = boxR - R; p.vx *= -1; }
            if (p.y + R > boxB) { p.y = boxB - R; p.vy *= -1; }
            if (p.y - R < topLimit) { p.y = topLimit + R; p.vy *= -1; }

            ctx.beginPath();
            ctx.arc(p.x, p.y, R, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }

        // Pressure arrows when compressed
        if (showPiston && pistonPos < 60) {
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('⚡ High pressure!', W / 2, boxB + 22);
        }

        // Spacing bar chart
        const gx = W - 180, gy = H - 80, gw = 160;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(gx, gy, gw, 50);
        ctx.strokeStyle = '#e2e8f0';
        ctx.strokeRect(gx, gy, gw, 50);
        ctx.fillStyle = '#64748b';
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Particle Spacing', gx + 4, gy + 14);
        const spacingW = matterState === 'solid' ? 0.2 : matterState === 'liquid' ? 0.5 : 0.9;
        ctx.fillStyle = stateColors[matterState] || '#64748b';
        ctx.fillRect(gx + 4, gy + 22, spacingW * (gw - 8), 16);

        animRef.current = requestAnimationFrame(animate);
    }, [matterState, showPiston, pistonPos, phase]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

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

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showPiston && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">Piston</span>
                    <input type="range" min={20} max={100} value={pistonPos} onChange={e => onStateChange?.('pistonPosition', Number(e.target.value))} className="w-32 h-2 accent-amber-500 cursor-pointer" />
                    <span className="text-sm font-bold text-amber-600">{pistonPos}%</span>
                </div>
            )}
        </div>
    );
};


