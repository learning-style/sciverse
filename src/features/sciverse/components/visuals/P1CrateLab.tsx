import { useRef, useEffect, useCallback, useState } from 'react';

interface P1CrateLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

// Physics constants
const CRATE_W = 70;
const CRATE_H = 60;
const FLOOR_Y_OFFSET = 100; // from bottom
const GRAVITY_ARROW_LEN = 40;
const NORMAL_ARROW_LEN = 40;

// Colors
const WOOD_COLOR = '#c2956b';
const WOOD_DARK = '#a67c52';
const FLOOR_ROUGH = '#9ca3af';
const FLOOR_ICE = '#bfdbfe';
const ARROW_PUSH = '#3b82f6';
const ARROW_FRICTION = '#ef4444';
const ARROW_GRAVITY = '#64748b';
const ARROW_NORMAL = '#64748b';

interface SpeedPoint {
    t: number;
    v: number;
}

export const P1CrateLab = ({ state, onStateChange }: P1CrateLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasHostRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    // Simulation state refs (mutable for animation loop)
    const crateXRef = useRef(120);
    const crateVelRef = useRef(0);
    const appliedForceRef = useRef(0);
    const isPushingRef = useRef(false);
    const speedHistoryRef = useRef<SpeedPoint[]>([]);
    const simTimeRef = useRef(0);

    // Read dialog-driven state
    const phase = (state.phase as string) || 'intro';
    const friction = (state.friction as string) || 'high';
    const forceUnlocked = true;
    const frictionUnlocked = true;
    const showFriction = (state.showFriction as boolean) || false;
    const showNewtonLaw = (state.showNewtonLaw as boolean) || false;

    // Local interactive state
    const [forceSlider, setForceSlider] = useState(0);
    const [isPushing, setIsPushing] = useState(false);
    const [floorType, setFloorType] = useState<'rough' | 'ice'>('rough');

    // Sync floor type from dialog
    useEffect(() => {
        if (friction === 'none') setFloorType('ice');
        else setFloorType('rough');
    }, [friction]);

    // Reset crate position on phase changes
    useEffect(() => {
        if (phase === 'intro' || phase === 'phase2_ready' || phase === 'phase3_ready' || phase === 'ice') {
            crateXRef.current = 120;
            crateVelRef.current = 0;
            speedHistoryRef.current = [];
            simTimeRef.current = 0;
        }
    }, [phase]);

    // Push/release handlers
    const handlePushStart = useCallback(() => {
        setIsPushing(true);
        isPushingRef.current = true;
        appliedForceRef.current = forceSlider;
    }, [forceSlider]);

    const handlePushRelease = useCallback(() => {
        setIsPushing(false);
        isPushingRef.current = false;
        appliedForceRef.current = 0;
    }, []);

    // Keep force ref in sync
    useEffect(() => {
        if (isPushingRef.current) {
            appliedForceRef.current = forceSlider;
        }
    }, [forceSlider]);

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const floorY = H - FLOOR_Y_OFFSET;

        // Physics step
        const dt = 1 / 60;
        const mass = 10; // kg
        const frictionCoeff = floorType === 'ice' ? 0.01 : 0.4;
        const appliedF = appliedForceRef.current;

        let netForce = appliedF;
        // Friction opposes motion (or applied force if stationary)
        if (crateVelRef.current > 0.1) {
            netForce -= frictionCoeff * mass * 9.8;
        } else if (crateVelRef.current < -0.1) {
            netForce += frictionCoeff * mass * 9.8;
        } else if (appliedF > 0) {
            // Static friction threshold
            const staticFriction = frictionCoeff * mass * 9.8 * 1.2;
            if (appliedF < staticFriction) {
                netForce = 0;
            } else {
                netForce = appliedF - frictionCoeff * mass * 9.8;
            }
        } else {
            crateVelRef.current = 0;
        }

        const accel = netForce / mass;
        crateVelRef.current += accel * dt;
        if (crateVelRef.current < 0) crateVelRef.current = 0; // no backwards

        crateXRef.current += crateVelRef.current * 2; // scale for visual

        // Wrap around
        if (crateXRef.current > W + CRATE_W) {
            crateXRef.current = -CRATE_W;
        }

        // Record speed history
        simTimeRef.current += dt;
        speedHistoryRef.current.push({ t: simTimeRef.current, v: crateVelRef.current });
        if (speedHistoryRef.current.length > 200) speedHistoryRef.current.shift();

        // --- DRAW ---
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('The Stubborn Crate', W / 2, 28);

        // Floor
        const isIce = floorType === 'ice';
        ctx.fillStyle = isIce ? FLOOR_ICE : '#e5e7eb';
        ctx.fillRect(0, floorY, W, H - floorY);
        ctx.strokeStyle = isIce ? '#93c5fd' : '#d1d5db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, floorY);
        ctx.lineTo(W, floorY);
        ctx.stroke();

        // Floor label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isIce ? '🧊 Ice Floor (almost no friction)' : '▓▓ Rough Floor (high friction)', W / 2, floorY + 20);

        // Floor texture (rough)
        if (!isIce) {
            ctx.fillStyle = FLOOR_ROUGH;
            for (let x = 0; x < W; x += 12) {
                ctx.fillRect(x, floorY + 1, 2, 2);
            }
        } else {
            // Ice shine lines
            ctx.strokeStyle = '#dbeafe';
            ctx.lineWidth = 1;
            for (let x = 20; x < W; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, floorY + 5);
                ctx.lineTo(x + 20, floorY + 5);
                ctx.stroke();
            }
        }

        // Crate
        const crateX = crateXRef.current;
        const crateY = floorY - CRATE_H;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(crateX + 4, floorY - 3, CRATE_W, 6);

        // Crate body
        ctx.fillStyle = WOOD_COLOR;
        ctx.fillRect(crateX, crateY, CRATE_W, CRATE_H);
        ctx.strokeStyle = WOOD_DARK;
        ctx.lineWidth = 2;
        ctx.strokeRect(crateX, crateY, CRATE_W, CRATE_H);

        // Wood grain lines
        ctx.strokeStyle = 'rgba(139, 90, 43, 0.3)';
        ctx.lineWidth = 1;
        for (let dy = 12; dy < CRATE_H; dy += 15) {
            ctx.beginPath();
            ctx.moveTo(crateX + 4, crateY + dy);
            ctx.lineTo(crateX + CRATE_W - 4, crateY + dy);
            ctx.stroke();
        }

        // Cross braces
        ctx.strokeStyle = WOOD_DARK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(crateX, crateY);
        ctx.lineTo(crateX + CRATE_W, crateY + CRATE_H);
        ctx.moveTo(crateX + CRATE_W, crateY);
        ctx.lineTo(crateX, crateY + CRATE_H);
        ctx.stroke();

        // 10 kg label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('10kg', crateX + CRATE_W / 2, crateY + CRATE_H / 2);
        ctx.textBaseline = 'alphabetic';

        // Force arrows
        const crateCx = crateX + CRATE_W / 2;
        const crateCy = crateY + CRATE_H / 2;

        // Gravity arrow (down)
        drawArrow(ctx, crateCx, crateY + CRATE_H, crateCx, crateY + CRATE_H + GRAVITY_ARROW_LEN, ARROW_GRAVITY, 'Gravity');

        // Normal force arrow (up)
        drawArrow(ctx, crateCx, crateY, crateCx, crateY - NORMAL_ARROW_LEN, ARROW_NORMAL, 'Normal');

        // Applied force arrow (right)
        if (appliedForceRef.current > 0) {
            const arrowLen = Math.min(appliedForceRef.current * 1.2, 120);
            drawArrow(ctx, crateX - 10, crateCy, crateX - 10 - arrowLen, crateCy, ARROW_PUSH, `${appliedForceRef.current.toFixed(0)}N Push`);
            // Actually draw pointing right (push direction)
            // Re-draw correctly: push from left side going right
            ctx.clearRect(crateX - 140, crateCy - 20, 135, 40); // clear wrong arrow
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(crateX - 140, crateCy - 20, 135, 40);
        }
        if (appliedForceRef.current > 0) {
            const arrowLen = Math.min(appliedForceRef.current * 1.2, 120);
            drawArrow(ctx, crateX - 5, crateCy, crateX - 5 - arrowLen, crateCy, ARROW_PUSH, '');
            // Label
            ctx.fillStyle = ARROW_PUSH;
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${appliedForceRef.current.toFixed(0)}N →`, crateX - 5 - arrowLen / 2, crateCy - 12);
        }

        // Friction arrow (left, opposing motion)
        if ((showFriction || crateVelRef.current > 0.5) && !isIce) {
            const fricForce = frictionCoeff * mass * 9.8;
            const fricArrowLen = Math.min(fricForce * 1.2, 80);
            drawArrow(ctx, crateX + CRATE_W + 5, crateCy, crateX + CRATE_W + 5 + fricArrowLen, crateCy, ARROW_FRICTION, '');
            ctx.fillStyle = ARROW_FRICTION;
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`← Friction`, crateX + CRATE_W + 5 + fricArrowLen / 2, crateCy - 12);
        }

        // Speed graph (mini) in top-right
        const graphX = W - 220;
        const graphY = 45;
        const graphW = 200;
        const graphH = 80;

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(graphX, graphY, graphW, graphH);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(graphX, graphY, graphW, graphH);

        ctx.fillStyle = '#64748b';
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Speed vs Time', graphX + 4, graphY + 12);

        // Plot speed
        const history = speedHistoryRef.current;
        if (history.length > 1) {
            const maxV = Math.max(8, ...history.map(p => p.v));
            ctx.beginPath();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            for (let i = 0; i < history.length; i++) {
                const px = graphX + (i / (history.length - 1)) * graphW;
                const py = graphY + graphH - (history[i].v / maxV) * (graphH - 20);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        // Current speed readout
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Speed: ${crateVelRef.current.toFixed(1)} m/s`, graphX + 4, graphY + graphH + 16);

        // Newton's Law banner
        if (showNewtonLaw) {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
            const bannerY = graphY + graphH + 30;
            ctx.fillRect(graphX - 60, bannerY, graphW + 60, 36);
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.strokeRect(graphX - 60, bannerY, graphW + 60, 36);
            ctx.fillStyle = '#1e40af';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText("Newton's 1st Law:", graphX - 60 + (graphW + 60) / 2, bannerY + 14);
            ctx.font = '17px monospace';
            ctx.fillText("Objects stay moving unless a force stops them", graphX - 60 + (graphW + 60) / 2, bannerY + 28);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [floorType, showFriction, showNewtonLaw]);

    // Start/stop animation
    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    // Canvas resize
    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            const container = canvasHostRef.current;
            if (!canvas || !container) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <div ref={canvasHostRef} className="relative flex-grow overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                />

                {/* Phase completion badge */}
                {phase === 'complete' && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-100 border border-indigo-300 rounded-full px-4 py-1.5 text-indigo-700 text-xs font-bold tracking-wider uppercase">
                        ✅ Lesson Complete
                    </div>
                )}
            </div>

            {/* Controls docked below canvas to avoid covering in-scene labels */}
            <div data-lab-controls="true" className="mt-2 mb-3 flex items-center justify-center gap-4 px-4 flex-wrap">
                {/* Force slider */}
                {(forceUnlocked || phase === 'pushing' || phase === 'ice' || phase === 'stopped' || phase === 'phase3_ready' || phase === 'discovery') && (
                    <div className="bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Force</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={forceSlider}
                            onChange={(e) => setForceSlider(Number(e.target.value))}
                            className="w-32 h-2 accent-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-bold text-blue-600 min-w-[45px] text-right">{forceSlider}N</span>

                        {/* Push button */}
                        <button
                            onMouseDown={handlePushStart}
                            onMouseUp={handlePushRelease}
                            onMouseLeave={handlePushRelease}
                            onTouchStart={handlePushStart}
                            onTouchEnd={handlePushRelease}
                            disabled={forceSlider === 0}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                isPushing
                                    ? 'bg-blue-600 text-white scale-95 shadow-inner'
                                    : forceSlider === 0
                                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md active:scale-95'
                            }`}
                        >
                            {isPushing ? '🔥 PUSHING!' : '👆 Hold to Push'}
                        </button>
                    </div>
                )}

                {/* Friction toggle */}
                {(frictionUnlocked || phase === 'ice' || phase === 'discovery') && (
                    <div className="bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Floor</span>
                        <button
                            onClick={() => {
                                const next = floorType === 'rough' ? 'ice' : 'rough';
                                setFloorType(next);
                                onStateChange?.('friction', next === 'ice' ? 'none' : 'high');
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                floorType === 'ice'
                                    ? 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                                    : 'bg-slate-200 text-slate-600 border border-slate-300'
                            }`}
                        >
                            {floorType === 'ice' ? '🧊 Ice' : '▓ Rough'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper: draw an arrow
function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string, _label: string) {
    const headLen = 8;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
}


