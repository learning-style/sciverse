import { useRef, useEffect, useCallback } from 'react';

interface B3FoodChainLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B3FoodChainLab = ({ state, onStateChange }: B3FoodChainLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const pulseRef = useRef(0);

    const tracing = (state.tracing as boolean) ?? false;
    const tracingStep = (state.tracingStep as number) ?? 0;
    const phase = (state.phase as string) || 'intro';

    // Auto-advance tracing animation
    useEffect(() => {
        if (!tracing) return;
        if (tracingStep >= 4) return;
        const timer = setTimeout(() => {
            onStateChange?.('tracingStep', tracingStep + 1);
        }, 1200);
        return () => clearTimeout(timer);
    }, [tracing, tracingStep, onStateChange]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        pulseRef.current += 0.04;
        const pulse = Math.sin(pulseRef.current) * 0.5 + 0.5;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Food Chain Energy Flow', W / 2, 28);

        // Chain positions
        const nodes = [
            { x: W * 0.1, label: '☀️ Sun', energy: 100, color: '#fbbf24', bgColor: '#fef3c7' },
            { x: W * 0.33, label: '🌱 Grass', energy: 10, color: '#22c55e', bgColor: '#dcfce7' },
            { x: W * 0.56, label: '🐰 Rabbit', energy: 1, color: '#a16207', bgColor: '#fef9c3' },
            { x: W * 0.79, label: '🦊 Fox', energy: 0.1, color: '#ea580c', bgColor: '#fff7ed' },
        ];

        const nodeY = H * 0.35;
        const nodeR = Math.min(40, W * 0.06);

        // Draw arrows between nodes
        for (let i = 0; i < nodes.length - 1; i++) {
            const from = nodes[i];
            const to = nodes[i + 1];
            const active = tracing && tracingStep > i;

            ctx.strokeStyle = active ? '#f59e0b' : '#cbd5e1';
            ctx.lineWidth = active ? 4 : 2;
            ctx.beginPath();
            ctx.moveTo(from.x + nodeR + 5, nodeY);
            ctx.lineTo(to.x - nodeR - 15, nodeY);
            ctx.stroke();

            // Arrow head
            const ax = to.x - nodeR - 15;
            ctx.fillStyle = active ? '#f59e0b' : '#cbd5e1';
            ctx.beginPath();
            ctx.moveTo(ax + 10, nodeY);
            ctx.lineTo(ax, nodeY - 6);
            ctx.lineTo(ax, nodeY + 6);
            ctx.closePath();
            ctx.fill();

            // "10% passes" label
            if (active) {
                ctx.fillStyle = '#d97706';
                ctx.font = 'bold 18px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('only 10%→', (from.x + to.x) / 2, nodeY - 20);
            }

            // Energy lost as heat arrows
            if (active) {
                const heatX = (from.x + to.x) / 2;
                ctx.strokeStyle = `rgba(239,68,68,${0.3 + pulse * 0.3})`;
                ctx.lineWidth = 2;
                for (let j = -1; j <= 1; j += 2) {
                    ctx.beginPath();
                    ctx.moveTo(heatX + j * 10, nodeY + 10);
                    ctx.lineTo(heatX + j * 15, nodeY + 35);
                    ctx.stroke();
                }
                ctx.fillStyle = '#ef4444';
                ctx.font = '16px monospace';
                ctx.fillText('90% heat', heatX, nodeY + 50);
            }
        }

        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const active = !tracing || tracingStep >= i;

            // Circle bg
            ctx.beginPath();
            ctx.arc(n.x, nodeY, nodeR, 0, Math.PI * 2);
            ctx.fillStyle = active ? n.bgColor : '#f1f5f9';
            ctx.fill();
            ctx.strokeStyle = active ? n.color : '#cbd5e1';
            ctx.lineWidth = active ? 3 : 1.5;
            ctx.stroke();

            // Pulse ring for active tracing step
            if (tracing && tracingStep === i) {
                ctx.beginPath();
                ctx.arc(n.x, nodeY, nodeR + 5 + pulse * 5, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(251,191,36,${0.5 + pulse * 0.3})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Label
            ctx.fillStyle = active ? '#1e293b' : '#94a3b8';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, nodeY + nodeR + 22);
        }

        // Energy bars at bottom
        const barY = H * 0.68;
        const barMaxW = W * 0.18;
        const barH = 24;

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Energy stored at each step:', W / 2, barY - 10);

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const active = !tracing || tracingStep >= i;
            const bw = (n.energy / 100) * barMaxW;
            const bx = n.x - barMaxW / 2;
            const by = barY + 10;

            ctx.fillStyle = active ? n.color : '#e2e8f0';
            ctx.fillRect(bx, by, Math.max(bw, 3), barH);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, barMaxW, barH);

            ctx.fillStyle = active ? '#1e293b' : '#94a3b8';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${n.energy}%`, n.x, by + barH + 14);
        }

        // Big Idea 3 Complete banner
        if (phase === 'complete') {
            const bannerY = H * 0.78;
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(W * 0.05, bannerY, W * 0.9, H * 0.2);
            ctx.strokeStyle = 'rgba(34,197,94,0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(W * 0.05, bannerY, W * 0.9, H * 0.2);
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 3 Complete!', W / 2, bannerY + 22);
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '15px monospace';
            ctx.fillText('P3: Energy Transformations · C3: Chemical Reactions · B3: Food Chains', W / 2, bannerY + 44);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillText('Energy transforms but never disappears! ☀️', W / 2, bannerY + 64);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [tracing, tracingStep, phase]);

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

    const showControls = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-4">
                    <button onClick={() => { onStateChange?.('tracing', true); onStateChange?.('tracingStep', 0); }} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-amber-500 hover:bg-amber-600">
                        🔍 Trace Energy
                    </button>
                    {tracing && (
                        <button onClick={() => { onStateChange?.('tracing', false); onStateChange?.('tracingStep', 0); }} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-slate-500 hover:bg-slate-600">
                            🔄 Reset
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};


