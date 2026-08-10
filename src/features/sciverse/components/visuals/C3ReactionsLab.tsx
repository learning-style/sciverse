import { useRef, useEffect, useCallback, useState } from 'react';

interface C3ReactionsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface Particle {
    x: number; y: number; vx: number; vy: number;
    color: string; r: number; type: string;
}

export const C3ReactionsLab = ({ state, onStateChange }: C3ReactionsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<{ left: Particle[]; right: Particle[] }>({ left: [], right: [] });
    const bubblesRef = useRef<{ x: number; y: number; r: number; vy: number }[]>([]);
    const timeRef = useRef(0);
    const displayTempRef = useRef({ left: 20, right: 20 });
    const [leftOverrideMixed, setLeftOverrideMixed] = useState<boolean | null>(null);
    const [rightOverrideMixed, setRightOverrideMixed] = useState<boolean | null>(null);
    const [leftTrials, setLeftTrials] = useState(0);
    const [rightTrials, setRightTrials] = useState(0);

    const leftMixed = (state.leftMixed as boolean) ?? false;
    const rightMixed = (state.rightMixed as boolean) ?? false;
    const chamberA = (state.chamberA as string) || '';
    const chamberB = (state.chamberB as string) || '';
    const tempA = typeof state.tempA === 'number' ? (state.tempA as number) : undefined;
    const tempB = typeof state.tempB === 'number' ? (state.tempB as number) : undefined;
    const leftTemp = typeof state.leftTemp === 'number' ? (state.leftTemp as number) : tempA ?? 20;
    const rightTemp = typeof state.rightTemp === 'number' ? (state.rightTemp as number) : tempB ?? 20;
    const phase = (state.phase as string) || 'intro';
    const leftMixedByScript = chamberA === 'reacting' || chamberA === 'reacted' || ['mixing_a', 'observed_a', 'checkpoint_endo', 'endo_correct', 'chamber_b_ready', 'mixing_b', 'observed_b', 'discovery', 'complete'].includes(phase);
    const rightMixedByScript = chamberB === 'reacting' || chamberB === 'reacted' || ['mixing_b', 'observed_b', 'discovery', 'complete'].includes(phase);
    const effectiveLeftMixed = leftOverrideMixed ?? (leftMixed || leftMixedByScript);
    const effectiveRightMixed = rightOverrideMixed ?? (rightMixed || rightMixedByScript);
    const leftTargetTemp = effectiveLeftMixed ? leftTemp : 20;
    const rightTargetTemp = effectiveRightMixed ? rightTemp : 20;

    const handleMixA = () => {
        setLeftOverrideMixed(true);
        setLeftTrials((n) => n + 1);
        onStateChange?.('leftMixed', true);
        onStateChange?.('chamberA', 'reacting');
        onStateChange?.('leftTemp', 17);
        onStateChange?.('tempA', 17);
    };

    const handleMixB = () => {
        setRightOverrideMixed(true);
        setRightTrials((n) => n + 1);
        onStateChange?.('rightMixed', true);
        onStateChange?.('chamberB', 'reacting');
        onStateChange?.('rightTemp', 45);
        onStateChange?.('tempB', 45);
    };

    const handleReset = () => {
        setLeftOverrideMixed(false);
        setRightOverrideMixed(false);
        displayTempRef.current.left = 20;
        displayTempRef.current.right = 20;
        particlesRef.current.left = [];
        particlesRef.current.right = [];
        bubblesRef.current = [];
        onStateChange?.('leftMixed', false);
        onStateChange?.('rightMixed', false);
        onStateChange?.('leftTemp', 20);
        onStateChange?.('rightTemp', 20);
        onStateChange?.('tempA', 20);
        onStateChange?.('tempB', 20);
        onStateChange?.('chamberA', 'ready');
        onStateChange?.('chamberB', 'ready');
    };

    // Initialize particles when mixed
    useEffect(() => {
        if (effectiveLeftMixed && particlesRef.current.left.length === 0) {
            const ps: Particle[] = [];
            for (let i = 0; i < 30; i++) {
                ps.push({
                    x: 30 + Math.random() * 150, y: 80 + Math.random() * 180,
                    vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
                    color: i < 15 ? '#ef4444' : '#3b82f6', r: 4, type: i < 15 ? 'acid' : 'base'
                });
            }
            particlesRef.current.left = ps;
        }
    }, [effectiveLeftMixed]);

    useEffect(() => {
        if (effectiveRightMixed && particlesRef.current.right.length === 0) {
            const ps: Particle[] = [];
            for (let i = 0; i < 30; i++) {
                ps.push({
                    x: 30 + Math.random() * 150, y: 80 + Math.random() * 180,
                    vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1,
                    color: i < 15 ? '#22c55e' : '#a855f7', r: 4, type: i < 15 ? 'metal' : 'solution'
                });
            }
            particlesRef.current.right = ps;
        }
    }, [effectiveRightMixed]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        timeRef.current += 0.016;
        displayTempRef.current.left += (leftTargetTemp - displayTempRef.current.left) * 0.06;
        displayTempRef.current.right += (rightTargetTemp - displayTempRef.current.right) * 0.06;
        const leftDisplayTemp = displayTempRef.current.left;
        const rightDisplayTemp = displayTempRef.current.right;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Chemical Reactions', W / 2, 28);

        const chamberW = W * 0.38;
        const chamberH = H * 0.55;
        const gap = W * 0.08;
        const lx = (W - 2 * chamberW - gap) / 2;
        const rx = lx + chamberW + gap;
        const cy = 50;

        // Draw chambers
        const drawChamber = (x: number, _y: number, label: string, temp: number, mixed: boolean, particles: Particle[], hot: boolean) => {
            // Beaker
            ctx.fillStyle = mixed ? (hot ? 'rgba(254,202,202,0.3)' : 'rgba(191,219,254,0.3)') : 'rgba(226,232,240,0.2)';
            ctx.fillRect(x, cy, chamberW, chamberH);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, cy, chamberW, chamberH);

            // Label
            ctx.fillStyle = '#334155';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(label, x + chamberW / 2, cy + chamberH + 20);

            // Thermometer
            const tx = x + chamberW - 20;
            const tBase = cy + chamberH - 10;
            const tTop = cy + 10;
            const tH = tBase - tTop;

            // Mercury
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(tx - 3, tTop, 6, tH);
            const mercH = ((temp - 0) / 50) * tH;
            ctx.fillStyle = temp > 20 ? '#ef4444' : '#3b82f6';
            ctx.fillRect(tx - 3, tBase - mercH, 6, mercH);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            ctx.strokeRect(tx - 3, tTop, 6, tH);
            // Bulb
            ctx.beginPath();
            ctx.arc(tx, tBase + 5, 6, 0, Math.PI * 2);
            ctx.fillStyle = temp > 20 ? '#ef4444' : '#3b82f6';
            ctx.fill();
            // Temp text
            ctx.fillStyle = '#334155';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${temp.toFixed(1)}°C`, tx, tTop - 6);

            // Particles
            if (mixed) {
                for (const p of particles) {
                    const speed = hot ? 3 : 1.5;
                    p.x += p.vx * speed * 0.5;
                    p.y += p.vy * speed * 0.5;
                    if (p.x < 5 || p.x > chamberW - 5) p.vx *= -1;
                    if (p.y < 5 || p.y > chamberH - 5) p.vy *= -1;
                    p.x = Math.max(5, Math.min(chamberW - 5, p.x));
                    p.y = Math.max(5, Math.min(chamberH - 5, p.y));

                    ctx.beginPath();
                    ctx.arc(x + p.x, cy + p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                }

                // Bubbles: CO₂ fizz for endothermic (left), heat shimmer for exothermic (right)
                if (!hot && Math.random() < 0.2) {
                    bubblesRef.current.push({
                        x: x + 20 + Math.random() * (chamberW - 40),
                        y: cy + chamberH - 10,
                        r: 2 + Math.random() * 3,
                        vy: -1 - Math.random() * 2
                    });
                }
            } else {
                // Unmixed: show two separate liquids
                ctx.fillStyle = hot ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)';
                ctx.fillRect(x + 5, cy + chamberH * 0.5, chamberW * 0.4, chamberH * 0.4);
                ctx.fillStyle = hot ? 'rgba(59,130,246,0.15)' : 'rgba(168,85,247,0.15)';
                ctx.fillRect(x + chamberW * 0.5, cy + chamberH * 0.5, chamberW * 0.4, chamberH * 0.4);
            }
        };

        drawChamber(lx, cy, '❄️ A: Baking Soda + Vinegar', leftDisplayTemp, effectiveLeftMixed, particlesRef.current.left, false);
        drawChamber(rx, cy, '🔥 B: Iron + Oxygen', rightDisplayTemp, effectiveRightMixed, particlesRef.current.right, true);

        // Delta-T labels relative to room temperature baseline (20 C)
        const baselineTemp = 20;
        const leftDelta = leftDisplayTemp - baselineTemp;
        const rightDelta = rightDisplayTemp - baselineTemp;
        const leftDeltaColor = leftDelta > 0.1 ? '#dc2626' : leftDelta < -0.1 ? '#2563eb' : '#64748b';
        const rightDeltaColor = rightDelta > 0.1 ? '#dc2626' : rightDelta < -0.1 ? '#2563eb' : '#64748b';

        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = leftDeltaColor;
        ctx.fillText(`ΔT: ${leftDelta >= 0 ? '+' : ''}${leftDelta.toFixed(1)}°C`, lx + chamberW / 2, cy + chamberH + 40);
        ctx.fillStyle = rightDeltaColor;
        ctx.fillText(`ΔT: ${rightDelta >= 0 ? '+' : ''}${rightDelta.toFixed(1)}°C`, rx + chamberW / 2, cy + chamberH + 40);

        // Bubbles
        bubblesRef.current = bubblesRef.current.filter(b => b.y > cy);
        for (const b of bubblesRef.current) {
            b.y += b.vy;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(239,68,68,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Glow effect for exothermic (right) chamber
        if (effectiveRightMixed) {
            const glow = Math.sin(timeRef.current * 3) * 0.1 + 0.15;
            ctx.fillStyle = `rgba(239,68,68,${glow})`;
            ctx.fillRect(rx, cy, chamberW, chamberH);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [effectiveLeftMixed, effectiveRightMixed, leftTargetTemp, rightTargetTemp]);

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
            <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3 flex-wrap">
                <button onClick={handleMixA} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-blue-500 hover:bg-blue-600">
                    {leftTrials > 0 ? '🧪 Mix A Again' : '🧪 Mix A'}
                </button>
                <button onClick={handleMixB} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-red-500 hover:bg-red-600">
                    {rightTrials > 0 ? '🧪 Mix B Again' : '🧪 Mix B'}
                </button>
                <button onClick={handleReset} className="px-4 py-1.5 rounded-lg text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300">
                    Reset
                </button>
                <div className="text-xs font-semibold text-slate-600">
                    Trials: A {leftTrials} | B {rightTrials}
                </div>
            </div>
        </div>
    );
};

