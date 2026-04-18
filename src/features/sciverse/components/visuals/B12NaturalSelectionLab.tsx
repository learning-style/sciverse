import { useRef, useEffect, useCallback, useState } from 'react';

interface B12NaturalSelectionLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B12NaturalSelectionLab = ({ state, onStateChange }: B12NaturalSelectionLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    const [environment, setEnvironment] = useState<'light' | 'dark'>('light');
    const [lightMoths, setLightMoths] = useState(80);
    const [darkMoths, setDarkMoths] = useState(20);
    const [generation, setGeneration] = useState(0);

    const envFromState = (state.environment as string) || environment;
    const phase = (state.phase as string) || 'intro';

    // Moths as array of {x,y,type}
    const mothsRef = useRef<Array<{ x: number; y: number; type: 'light' | 'dark'; opacity: number }>>([]);

    useEffect(() => {
        const total = 30;
        mothsRef.current = [];
        const lightCount = Math.round((lightMoths / (lightMoths + darkMoths)) * total);
        for (let i = 0; i < total; i++) {
            mothsRef.current.push({
                x: 0.05 + Math.random() * 0.9,
                y: 0.1 + Math.random() * 0.85,
                type: i < lightCount ? 'light' : 'dark',
                opacity: 1
            });
        }
    }, [lightMoths, darkMoths]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        const env = envFromState === 'dark' ? 'dark' : environment;

        // bark background
        const bgColor = env === 'dark' ? '#1c1410' : '#c8a882';
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, W, H * 0.77);

        // Tree bark texture lines
        ctx.strokeStyle = env === 'dark' ? '#0f0b08' : '#a8845e';
        ctx.lineWidth = 1;
        for (let i = 0; i < 12; i++) {
            const lx = (i / 12) * W;
            ctx.beginPath();
            ctx.moveTo(lx, 0);
            ctx.bezierCurveTo(lx + 8, H * 0.2, lx - 6, H * 0.5, lx + 4, H * 0.77);
            ctx.stroke();
        }

        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Natural Selection Lab', W / 2, 22);

        ctx.fillStyle = env === 'dark' ? '#d1d5db' : '#1e293b';
        ctx.font = '12px monospace';
        ctx.fillText(`Environment: ${env === 'dark' ? '🏭 Industrial (dark bark)' : '🌲 Forest (light bark)'}`, W / 2, 38);

        // Draw moths
        for (const moth of mothsRef.current) {
            const mx = moth.x * W;
            const my = moth.y * H * 0.72;
            const mothColor = moth.type === 'light' ? '#e2cba6' : '#2d1f0e';
            const borderColor = moth.type === 'light' ? '#b8945a' : '#1a100a';

            ctx.globalAlpha = moth.opacity;
            // Wing shape (two ovals)
            ctx.fillStyle = mothColor;
            ctx.beginPath();
            ctx.ellipse(mx - 8, my, 11, 6, -0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(mx + 8, my, 11, 6, 0.4, 0, Math.PI * 2);
            ctx.fill();
            // Body
            ctx.fillStyle = borderColor;
            ctx.beginPath();
            ctx.ellipse(mx, my, 3, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        // Stats bar (below field)
        const statsY = H * 0.78;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, statsY, W, H - statsY);

        const totalMoths = mothsRef.current.length;
        const lightCount = mothsRef.current.filter(m => m.type === 'light').length;
        const lightPct = totalMoths > 0 ? Math.round((lightCount / totalMoths) * 100) : 0;
        const darkPct = 100 - lightPct;

        // Bar graph
        const bx = 16, by2 = statsY + 10, bw = W - 32, bh = 16;
        ctx.fillStyle = '#e2cba6';
        ctx.fillRect(bx, by2, bw * (lightPct / 100), bh);
        ctx.fillStyle = '#2d1f0e';
        ctx.fillRect(bx + bw * (lightPct / 100), by2, bw * (darkPct / 100), bh);
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(bx, by2, bw, bh);

        ctx.fillStyle = env === 'dark' ? '#f1f5f9' : '#1e293b';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Light: ${lightPct}%`, bx, by2 + bh + 14);
        ctx.textAlign = 'right';
        ctx.fillText(`Dark: ${darkPct}%`, bx + bw, by2 + bh + 14);
        ctx.textAlign = 'center';
        ctx.fillText(`Generation ${generation}`, W / 2, by2 + bh + 28);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 12 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Hidden Rules Shape Big Patterns?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P12 Gravity & Orbits', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C12 Periodic Table Patterns', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B12 Natural Selection', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Hidden rules → emergent patterns everywhere!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [environment, envFromState, lightMoths, darkMoths, generation, phase]);

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

    const runGeneration = () => {
        const env = (envFromState === 'dark' ? 'dark' : environment) as 'light' | 'dark';
        // Predation: remove moths that contrast with background
        const survivalRate = (type: 'light' | 'dark') => {
            if (env === 'light') return type === 'light' ? 0.9 : 0.4;
            return type === 'dark' ? 0.9 : 0.4;
        };

        const lightSurvivors = Math.max(1, Math.round(lightMoths * survivalRate('light')));
        const darkSurvivors = Math.max(1, Math.round(darkMoths * survivalRate('dark')));
        // Reproduce back to ~100 total
        const total = 100;
        const lightNew = Math.round((lightSurvivors / (lightSurvivors + darkSurvivors)) * total);
        const darkNew = total - lightNew;
        setLightMoths(lightNew);
        setDarkMoths(darkNew);
        setGeneration(g => g + 1);
    };

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[180px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>

                <div className="flex gap-1">
                    <button onClick={() => { setEnvironment('light'); onStateChange('environment', 'light'); }}
                        className={`flex-1 text-xs rounded py-1 ${environment === 'light' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        🌲 Light
                    </button>
                    <button onClick={() => { setEnvironment('dark'); onStateChange('environment', 'dark'); }}
                        className={`flex-1 text-xs rounded py-1 ${environment === 'dark' ? 'bg-stone-700 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        🏭 Dark
                    </button>
                </div>

                <button onClick={runGeneration}
                    className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white rounded px-2 py-1">
                    ⏭ Next Generation
                </button>

                <button onClick={() => { setLightMoths(80); setDarkMoths(20); setGeneration(0); }}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded px-2 py-1">
                    Reset
                </button>
            </div>
        </div>
    );
};
