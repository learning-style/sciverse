import { useRef, useEffect, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

interface C1ParticleLabProps {
    state: Record<string, unknown>;
    onSliderChange?: (temp: number) => void;
}

const PARTICLE_COUNT = 40;
const CONTAINER_PADDING = 40;
const PARTICLE_RADIUS = 8;
const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#6366f1'];

function speedFromTemp(temp: number): number {
    // Map 0-100°C to a pixel speed range (0.3 - 5.0 px/frame)
    return 0.3 + (temp / 100) * 4.7;
}

export const C1ParticleLab = ({ state, onSliderChange }: C1ParticleLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const temperature = (state.temperature as number) ?? 10;
    const phase = (state.phase as string) || 'intro';
    const particlesEscaping = (state.particlesEscaping as boolean) || false;
    const tempSliderUnlocked = true;

    // Initialize particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const w = canvas.width;
        const h = canvas.height;
        const containerTop = CONTAINER_PADDING + 60;
        const containerBottom = h - CONTAINER_PADDING;
        const containerLeft = CONTAINER_PADDING;
        const containerRight = w - CONTAINER_PADDING;

        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: containerLeft + Math.random() * (containerRight - containerLeft),
                y: containerTop + Math.random() * (containerBottom - containerTop),
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: PARTICLE_RADIUS,
                color: COLORS[i % COLORS.length],
            });
        }
        particlesRef.current = particles;
    }, []);

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const containerTop = CONTAINER_PADDING + 60;
        const containerBottom = h - CONTAINER_PADDING;
        const containerLeft = CONTAINER_PADDING;
        const containerRight = w - CONTAINER_PADDING;

        const speed = speedFromTemp(temperature);
        const particles = particlesRef.current;

        // Clear
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);

        // Draw container (beaker shape)
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(containerLeft, containerTop - 10);
        ctx.lineTo(containerLeft, containerBottom);
        ctx.lineTo(containerRight, containerBottom);
        ctx.lineTo(containerRight, containerTop - 10);
        ctx.stroke();

        // Liquid fill
        const liquidAlpha = Math.max(0.05, 0.15 - (temperature / 100) * 0.1);
        ctx.fillStyle = `rgba(59, 130, 246, ${liquidAlpha})`;
        ctx.fillRect(containerLeft + 2, containerTop, containerRight - containerLeft - 4, containerBottom - containerTop - 2);

        // Thermometer on the right
        const thermoX = w - 25;
        const thermoTop = containerTop;
        const thermoBottom = containerBottom;
        const thermoHeight = thermoBottom - thermoTop;
        const fillHeight = (temperature / 100) * thermoHeight;

        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(thermoX - 6, thermoTop, 12, thermoHeight);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(thermoX - 6, thermoTop, 12, thermoHeight);

        // Mercury fill
        const mercuryColor = temperature < 50 ? '#3b82f6' : temperature < 80 ? '#f59e0b' : '#ef4444';
        ctx.fillStyle = mercuryColor;
        ctx.fillRect(thermoX - 4, thermoBottom - fillHeight, 8, fillHeight);

        // Temp label
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${temperature}°C`, thermoX, thermoTop - 8);

        // Title
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Water Molecule Container', w / 2, 28);

        // Speed label
        ctx.fillStyle = '#64748b';
        ctx.font = '18px monospace';
        ctx.fillText(`Speed: ${speed.toFixed(1)} · Particles: ${particles.length}`, w / 2, 48);

        // Update & draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            // Normalize velocity to target speed
            const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (currentSpeed > 0.01) {
                const scale = speed / currentSpeed;
                // Blend toward target speed (not instant, for natural feel)
                p.vx += (p.vx * scale - p.vx) * 0.05;
                p.vy += (p.vy * scale - p.vy) * 0.05;
            } else {
                p.vx = (Math.random() - 0.5) * speed;
                p.vy = (Math.random() - 0.5) * speed;
            }

            // Add slight randomness for jitter
            p.vx += (Math.random() - 0.5) * 0.3;
            p.vy += (Math.random() - 0.5) * 0.3;

            p.x += p.vx;
            p.y += p.vy;

            // Escape at boiling
            if (particlesEscaping && p.y < containerTop + 5 && p.vy < 0) {
                // Some particles escape upward
                if (Math.random() < 0.02) {
                    p.y -= 2;
                    // Draw steam trail
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = '#93c5fd';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;

                    // Remove if too far above 
                    if (p.y < containerTop - 40) {
                        particles.splice(i, 1);
                        continue;
                    }
                }
            }

            // Bounce off walls
            if (p.x - p.radius < containerLeft) { p.x = containerLeft + p.radius; p.vx *= -1; }
            if (p.x + p.radius > containerRight) { p.x = containerRight - p.radius; p.vx *= -1; }
            if (p.y + p.radius > containerBottom) { p.y = containerBottom - p.radius; p.vy *= -1; }
            if (p.y - p.radius < containerTop && !particlesEscaping) { p.y = containerTop + p.radius; p.vy *= -1; }

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Steam wisps above container when boiling
        if (particlesEscaping) {
            ctx.fillStyle = '#334155';
            ctx.font = 'bold 19px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('💨 Steam escaping!', w / 2, containerTop - 20);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [temperature, particlesEscaping]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    // Resize canvas to container
    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas
                ref={canvasRef}
                className="flex-grow"
                style={{ display: 'block', width: '100%', height: '100%' }}
            />

            {/* Temperature Slider */}
            {tempSliderUnlocked && (
                <div data-lab-controls="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-6 py-3 flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Temperature</span>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={temperature}
                        onChange={(e) => onSliderChange?.(Number(e.target.value))}
                        className="w-48 h-2 accent-blue-500 cursor-pointer"
                    />
                    <span className={`text-sm font-bold min-w-[50px] text-right ${temperature < 50 ? 'text-blue-500' : temperature < 80 ? 'text-amber-500' : 'text-red-500'}`}>
                        {temperature}°C
                    </span>
                </div>
            )}

            {/* Phase indicator */}
            {phase === 'complete' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-100 border border-emerald-300 rounded-full px-4 py-1.5 text-emerald-700 text-xs font-bold tracking-wider uppercase">
                    ✅ Lesson Complete
                </div>
            )}
        </div>
    );
};


