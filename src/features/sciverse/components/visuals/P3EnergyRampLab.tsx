import { useRef, useEffect, useCallback } from 'react';

interface P3EnergyRampLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const P3EnergyRampLab = ({ state, onStateChange }: P3EnergyRampLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const ballPosRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, rolling: false, rotation: 0 });
    const timeRef = useRef(0);
    
    // Track state in refs to avoid callback recreation
    const stateRef = useRef({
        rampHeight: 80,
        friction: false,
        phase: 'intro',
        released: false,
    });

    const rampHeight = (state.rampHeight as number) ?? 80;
    const friction = (state.friction as boolean) ?? false;
    const phase = (state.phase as string) || 'intro';
    const released = (state.released as boolean) ?? false;
    const ballPosition = (state.ballPosition as string) || 'top';
    const autoReleaseFromScript = phase === 'rolling' || phase === 'friction_result' || ballPosition === 'rolling' || ballPosition === 'other_side_lower';
    const effectiveReleased = released || autoReleaseFromScript;
    
    // Update state ref whenever props change
    useEffect(() => {
        stateRef.current = { rampHeight, friction, phase, released: effectiveReleased };
    }, [rampHeight, friction, phase, effectiveReleased]);

    const animate = useCallback(() => {
        const { rampHeight, friction, released } = stateRef.current;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        timeRef.current += 0.016;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        // Ground
        const groundY = H * 0.75;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(0, groundY, W, H - groundY);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(W, groundY);
        ctx.stroke();

        // Ramp
        const rampTopX = W * 0.15;
        const rampBottomX = W * 0.5;
        const rampTopYRelative = (rampHeight / 100) * H * 0.4;
        const rampTopY = groundY - rampTopYRelative;

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(rampTopX, rampTopY);
        ctx.lineTo(rampBottomX, groundY);
        ctx.lineTo(rampTopX, groundY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Height label
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${rampHeight}% height`, rampTopX - 30, (rampTopY + groundY) / 2);

        // Friction surface indicator
        if (friction) {
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 1;
            for (let x = rampBottomX; x < W * 0.9; x += 8) {
                ctx.beginPath();
                ctx.moveTo(x, groundY);
                ctx.lineTo(x - 3, groundY + 5);
                ctx.stroke();
            }
            ctx.fillStyle = '#6b7280';
            ctx.font = '17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('Rough surface', rampBottomX + 10, groundY + 18);
        }

        // Ball physics
        const ballR = 14;
        const ball = ballPosRef.current;

        if (!released) {
            // Ball at top of ramp
            ball.x = rampTopX + 20;
            ball.y = rampTopY - ballR - 2;
            ball.vx = 0;
            ball.vy = 0;
            ball.rolling = false;
            ball.rotation = 0;
        } else {
            if (!ball.rolling) {
                ball.x = rampTopX + 20;
                ball.y = rampTopY - ballR - 2;
                ball.rolling = true;
                ball.vx = 0;
                ball.vy = 0;
                ball.rotation = 0;
            }

            // Ramp slope
            const dx = rampBottomX - rampTopX;
            const dy = groundY - rampTopY;
            const angle = Math.atan2(dy, dx);

            if (ball.x < rampBottomX - ballR) {
                // On ramp: accelerate along slope
                // Physics simulation: a = g * sin(angle) for rolling without friction
                const g = 500;
                const ax = g * Math.sin(angle) * Math.cos(angle);
                ball.vx += ax * 0.016;
                ball.x += ball.vx * 0.016;
                // Rotation tied to rolling motion (angular velocity = v / r)
                ball.rotation += (ball.vx / ballR) * 0.016;
                // Stay on ramp surface
                const t = (ball.x - rampTopX) / dx;
                ball.y = rampTopY + t * dy - ballR - 2;
            } else {
                // On flat ground
                ball.y = groundY - ballR;
                const frictionDecel = friction ? 120 : 5;
                if (ball.vx > 0) {
                    ball.vx -= frictionDecel * 0.016;
                    if (ball.vx < 0) ball.vx = 0;
                }
                // Rotation continues as ball slides
                ball.rotation += (ball.vx / ballR) * 0.016;
                ball.x += ball.vx * 0.016;
                if (ball.x > W - ballR) {
                    ball.x = W - ballR;
                    ball.vx = 0;
                }
            }
        }

        // Draw ball with rotation stripes for visual rolling effect
        ctx.save();
        ctx.translate(ball.x, ball.y);
        
        // Ball body
        const grad = ctx.createRadialGradient(-3, -3, 2, 0, 0, ballR);
        grad.addColorStop(0, '#60a5fa');
        grad.addColorStop(1, '#2563eb');
        ctx.beginPath();
        ctx.arc(0, 0, ballR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Rotation stripes to show rolling
        ctx.rotate(ball.rotation);
        ctx.strokeStyle = '#0ea5e9';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(-ballR, 0);
        ctx.lineTo(ballR, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -ballR);
        ctx.lineTo(0, ballR);
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        ctx.restore();

        // Energy bars
        const barX = W * 0.7;
        const barW = 30;
        const barMaxH = 120;
        const barBase = groundY - 10;

        // Calculate energies
        const currentHeight = Math.max(0, groundY - ball.y - ballR) / (groundY - rampTopY + ballR);
        const maxSpeed = Math.sqrt(2 * 400 * rampTopYRelative);
        const speedRatio = Math.min(ball.vx / (maxSpeed || 1), 1);
        const speed = Math.max(0, ball.vx / 40);

        const peH = currentHeight * barMaxH;
        const keH = speedRatio * speedRatio * barMaxH * (rampHeight / 100);
        const heatH = friction && released ? Math.max(0, barMaxH * (rampHeight / 100) - peH - keH) : 0;

        // PE bar
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(barX, barBase - peH, barW, peH);
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barBase - barMaxH, barW, barMaxH);
        ctx.fillStyle = '#1e40af';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PE', barX + barW / 2, barBase + 14);

        // KE bar
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(barX + 50, barBase - keH, barW, keH);
        ctx.strokeStyle = '#991b1b';
        ctx.strokeRect(barX + 50, barBase - barMaxH, barW, barMaxH);
        ctx.fillStyle = '#991b1b';
        ctx.fillText('KE', barX + 50 + barW / 2, barBase + 14);

        // Heat bar
        if (friction) {
            ctx.fillStyle = '#f97316';
            ctx.fillRect(barX + 100, barBase - heatH, barW, heatH);
            ctx.strokeStyle = '#9a3412';
            ctx.strokeRect(barX + 100, barBase - barMaxH, barW, barMaxH);
            ctx.fillStyle = '#9a3412';
            ctx.fillText('Heat', barX + 100 + barW / 2, barBase + 14);
        }

        // Heat glow on ground
        if (friction && released && ball.vx > 0 && ball.x >= rampBottomX) {
            const glowIntensity = Math.min(ball.vx / 200, 0.4);
            ctx.fillStyle = `rgba(249,115,22,${glowIntensity})`;
            ctx.fillRect(rampBottomX, groundY - 3, ball.x - rampBottomX, 6);
        }

        // Live speed readout
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Speed: ${speed.toFixed(2)} m/s`, barX - 8, barBase - barMaxH - 14);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Energy Ramp', W / 2, 28);

        animRef.current = requestAnimationFrame(animate);
    }, []);

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

    // Reset ball position when rampHeight changes or released toggles
    useEffect(() => {
        ballPosRef.current.rolling = false;
    }, [rampHeight, effectiveReleased]);

    const showControls = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            <div data-lab-controls="true" className="absolute top-4 right-4 bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">Ramp Height</span>
                <input
                    type="range"
                    min={10}
                    max={100}
                    value={rampHeight}
                    onChange={e => onStateChange?.('rampHeight', Number(e.target.value))}
                    className="w-28 h-2 accent-blue-500 cursor-pointer"
                />
                <span className="text-sm font-bold text-blue-600 min-w-12">{rampHeight}%</span>
            </div>
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-6 py-3 flex items-center gap-5 flex-wrap justify-center">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Height</span>
                        <input type="range" min={10} max={100} value={rampHeight} onChange={e => onStateChange?.('rampHeight', Number(e.target.value))} className="w-32 h-2 accent-blue-500 cursor-pointer" />
                        <span className="text-sm font-bold text-blue-600 min-w-12">{rampHeight}%</span>
                    </div>
                    <button onClick={() => { ballPosRef.current.rolling = false; onStateChange?.('released', !released); }} className={`px-5 py-2 rounded-lg text-sm font-bold text-white transition-all ${released ? 'bg-orange-500 hover:bg-orange-600 active:scale-95' : 'bg-green-500 hover:bg-green-600 active:scale-95 shadow-md'}`}>
                        {released ? '↻ Reset' : '▶ Release'}
                    </button>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-3 py-1 rounded transition-colors">
                        <input type="checkbox" checked={friction} onChange={e => { ballPosRef.current.rolling = false; onStateChange?.('released', false); onStateChange?.('friction', e.target.checked); }} className="accent-orange-500 cursor-pointer" />
                        <span className="text-xs font-bold text-slate-600">🔥 Friction</span>
                    </label>
                </div>
            )}
        </div>
    );
};

