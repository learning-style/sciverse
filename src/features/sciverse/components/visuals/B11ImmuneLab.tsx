import { useRef, useEffect, useCallback, useState } from 'react';

interface B11ImmuneLabProps {
    state: Record<string, unknown>;
}

interface Particle {
    x: number; y: number; vx: number; vy: number;
    type: 'bacteria' | 'wbc' | 'antibody';
    health: number;
    angle: number;
}

export const B11ImmuneLab = ({ state }: B11ImmuneLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const [exposure, setExposure] = useState<'first' | 'second'>('first');

    const phase = (state.phase as string) || 'intro';
    const immuneActive = (state.immuneActive as boolean) || false;
    const showNeutrophils = (state.showNeutrophils as boolean) || false;
    const showMemoryCells = (state.showMemoryCells as boolean) || false;

    useEffect(() => {
        // Init particles
        particlesRef.current = [];
        for (let i = 0; i < 8; i++) {
            particlesRef.current.push({
                x: Math.random(), y: Math.random(),
                vx: (Math.random() - 0.5) * 0.002,
                vy: (Math.random() - 0.5) * 0.002,
                type: 'bacteria', health: 1, angle: Math.random() * Math.PI * 2
            });
        }
    }, []);

    useEffect(() => {
        if (immuneActive) {
            const wbcCount = exposure === 'second' ? 18 : 6;
            const existingWBC = particlesRef.current.filter(p => p.type === 'wbc').length;
            for (let i = existingWBC; i < wbcCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * 0.2,
                    y: Math.random(),
                    vx: Math.random() * 0.003,
                    vy: (Math.random() - 0.5) * 0.002,
                    type: 'wbc', health: 1, angle: 0
                });
            }
        }
    }, [immuneActive, exposure]);

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
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText("The Body's Immune Response", W / 2, 26);

        const viewH = H * 0.72;

        // Background vessels
        ctx.strokeStyle = 'rgba(239,68,68,0.15)';
        ctx.lineWidth = 30;
        ctx.beginPath();
        ctx.moveTo(0, viewH * 0.5);
        ctx.bezierCurveTo(W * 0.3, viewH * 0.3, W * 0.7, viewH * 0.7, W, viewH * 0.5);
        ctx.stroke();

        // Cycle particles
        for (const p of particlesRef.current) {
            p.x += p.vx;
            p.y += p.vy;
            p.angle += 0.03;
            if (p.x < 0) p.x = 1;
            if (p.x > 1) p.x = 0;
            if (p.y < 0) p.y += 1;
            if (p.y > 1) p.y -= 1;
        }

        // WBCs chase nearest bacteria
        if (immuneActive) {
            for (const wbc of particlesRef.current.filter(p => p.type === 'wbc')) {
                const bacteria = particlesRef.current.filter(p => p.type === 'bacteria');
                if (bacteria.length === 0) continue;
                let nearest = bacteria[0];
                let nearDist = Infinity;
                for (const b of bacteria) {
                    const d = Math.hypot(b.x - wbc.x, b.y - wbc.y);
                    if (d < nearDist) { nearDist = d; nearest = b; }
                }
                const speed = exposure === 'second' ? 0.004 : 0.002;
                wbc.vx += (nearest.x - wbc.x) * 0.008;
                wbc.vy += (nearest.y - wbc.y) * 0.008;
                const mag = Math.hypot(wbc.vx, wbc.vy);
                if (mag > speed) { wbc.vx /= mag / speed; wbc.vy /= mag / speed; }

                // Kill bacteria if close
                if (nearDist < 0.04) {
                    nearest.health -= 0.02;
                    if (nearest.health <= 0) {
                        const idx = particlesRef.current.indexOf(nearest);
                        if (idx > -1) particlesRef.current.splice(idx, 1);
                    }
                }
            }
        }

        // Draw bacteria
        for (const p of particlesRef.current.filter(b => b.type === 'bacteria')) {
            const px = p.x * W, py = p.y * viewH;
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(p.angle);
            ctx.fillStyle = `rgba(239,68,68,${p.health})`;
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            // Spikes
            ctx.strokeStyle = `rgba(252,165,165,${p.health})`;
            ctx.lineWidth = 1.5;
            for (let s = 0; s < 8; s++) {
                const a = (s / 8) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 8, Math.sin(a) * 8);
                ctx.lineTo(Math.cos(a) * 14, Math.sin(a) * 14);
                ctx.stroke();
            }
            ctx.restore();
        }

        // Draw WBCs
        for (const p of particlesRef.current.filter(b => b.type === 'wbc')) {
            const px = p.x * W, py = p.y * viewH;
            ctx.save();
            ctx.translate(px, py);
            ctx.fillStyle = '#dbeafe';
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#1e40af';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('WBC', 0, 3);
            ctx.restore();
        }

        // Legend
        const ly = viewH + 14;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(20, ly, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Bacteria (${particlesRef.current.filter(p => p.type === 'bacteria').length})`, 32, ly + 4);

        ctx.fillStyle = '#dbeafe';
        ctx.beginPath();
        ctx.arc(W / 2 - 30, ly, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.fillText(`White Blood Cells (${particlesRef.current.filter(p => p.type === 'wbc').length})`, W / 2 - 18, ly + 4);

        // Status
        const bacteriaLeft = particlesRef.current.filter(p => p.type === 'bacteria').length;
        if (showMemoryCells) {
            ctx.fillStyle = '#a78bfa';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🧠 Memory B-Cells Active — 2nd Exposure 10× Faster!', W / 2, ly + 22);
        } else if (immuneActive && bacteriaLeft === 0) {
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Infection cleared!', W / 2, ly + 22);
        } else if (!immuneActive) {
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('⚠ Bacteria multiplying — no immune response!', W / 2, ly + 22);
        }

        // Big Idea 11 Complete banner
        if (phase === 'complete') {
            const bannerY = H * 0.52;
            const bannerH = H * 0.46;
            ctx.fillStyle = 'rgba(240, 253, 244, 0.95)';
            ctx.beginPath();
            ctx.roundRect(W * 0.05, bannerY, W * 0.9, bannerH, 10);
            ctx.fill();
            ctx.strokeStyle = '#bbf7d0';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#14532d';
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🔗 Big Idea 11 Complete — How Do We Stay Healthy?', W / 2, bannerY + 22);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#1e40af';
            ctx.fillText('P11: The Pumping Heart — blood pressure & flow dynamics', W / 2, bannerY + 46);
            ctx.fillStyle = '#065f46';
            ctx.fillText('C11: Acids, Bases & pH — chemical balance in the body', W / 2, bannerY + 64);
            ctx.fillStyle = '#9f1239';
            ctx.fillText('B11: Immune Defense — layered defenses destroy invaders', W / 2, bannerY + 82);
            ctx.fillStyle = '#1e293b';
            ctx.fillText('Health = balanced pressure + balanced chemistry + vigilant immunity! 🫀🧪🛡️', W / 2, bannerY + 106);
            ctx.fillStyle = '#14532d';
            ctx.font = 'bold 13px monospace';
            ctx.fillText('✅ Lesson B11 Complete!', W / 2, bannerY + bannerH - 14);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [immuneActive, exposure, phase, showNeutrophils, showMemoryCells]);

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
        <div ref={containerRef} className="relative w-full h-full" style={{ background: '#ffffff' }}>
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[180px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <button
                    onClick={() => {
                        setExposure('second');
                        particlesRef.current = particlesRef.current.filter(p => p.type !== 'wbc');
                        for (let i = 0; i < 10; i++) {
                            particlesRef.current.push({
                                x: Math.random(), y: Math.random(),
                                vx: (Math.random() - 0.5) * 0.002,
                                vy: (Math.random() - 0.5) * 0.002,
                                type: 'bacteria', health: 1, angle: Math.random() * Math.PI * 2
                            });
                        }
                    }}
                    className="text-xs bg-violet-700 hover:bg-violet-600 text-white rounded px-2 py-1 text-center">
                    Second Exposure (Memory)
                </button>
                <button
                    onClick={() => {
                        setExposure('first');
                        particlesRef.current = [];
                        for (let i = 0; i < 8; i++) {
                            particlesRef.current.push({
                                x: Math.random(), y: Math.random(),
                                vx: (Math.random() - 0.5) * 0.002,
                                vy: (Math.random() - 0.5) * 0.002,
                                type: 'bacteria', health: 1, angle: Math.random() * Math.PI * 2
                            });
                        }
                    }}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded px-2 py-1 text-center">
                    Reset
                </button>
                <div className="text-xs text-slate-400 mt-1">Mode: <span className="text-violet-300">{exposure === 'second' ? 'Memory Active' : 'First Exposure'}</span></div>
            </div>
        </div>
    );
};
