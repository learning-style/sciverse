import { useRef, useEffect, useCallback, useState } from 'react';

interface P6DensityLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface FloatingObj {
    label: string;
    density: number;
    color: string;
    emoji: string;
    size: number;
    y: number;
    targetY: number;
    dropped: boolean;
}

export const P6DensityLab = ({ state, onStateChange }: P6DensityLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const objectsRef = useRef<FloatingObj[]>([
        { label: 'Steel', density: 7.8, color: '#64748b', emoji: '⚫', size: 20, y: 60, targetY: 60, dropped: false },
        { label: 'Wood', density: 0.6, color: '#c2956b', emoji: '🟫', size: 35, y: 60, targetY: 60, dropped: false },
        { label: 'Beach Ball', density: 0.05, color: '#fbbf24', emoji: '🏖️', size: 40, y: 60, targetY: 60, dropped: false },
    ]);

    const phase = (state.phase as string) || 'intro';
    const steelDropped = (state.steelDropped as boolean) || false;
    const woodDropped = (state.woodDropped as boolean) || false;
    const ballDropped = (state.ballDropped as boolean) || false;
    const showMysteryObject = (state.showMysteryObject as boolean) || false;
    const showPrinciple = (state.showPrinciple as boolean) || false;
    const densitySliderUnlocked = true;

    const [liquidDensity, setLiquidDensity] = useState(1.0);

    // Update dropped state
    useEffect(() => {
        const objs = objectsRef.current;
        objs[0].dropped = steelDropped;
        objs[1].dropped = woodDropped;
        objs[2].dropped = ballDropped;
    }, [steelDropped, woodDropped, ballDropped]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        const waterTop = H * 0.45;
        const tankBottom = H - 40;
        const tankLeft = 60;
        const tankRight = W - 60;

        // Update object positions
        objectsRef.current.forEach(obj => {
            if (!obj.dropped) {
                obj.targetY = 60;
            } else if (obj.density > liquidDensity) {
                // Sinks to bottom
                obj.targetY = tankBottom - obj.size;
            } else {
                // Floats: fraction submerged = objDensity / liquidDensity
                const fraction = obj.density / liquidDensity;
                obj.targetY = waterTop - obj.size * (1 - fraction);
            }
            obj.y += (obj.targetY - obj.y) * 0.05;
        });

        // Draw
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('The Mystery Tank', W / 2, 28);

        // Tank walls
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tankLeft, waterTop - 40);
        ctx.lineTo(tankLeft, tankBottom);
        ctx.lineTo(tankRight, tankBottom);
        ctx.lineTo(tankRight, waterTop - 40);
        ctx.stroke();

        // Water fill
        const waterColor = liquidDensity > 1.02 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(59, 130, 246, 0.25)';
        ctx.fillStyle = waterColor;
        ctx.fillRect(tankLeft + 2, waterTop, tankRight - tankLeft - 4, tankBottom - waterTop - 2);

        // Water surface line
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(tankLeft, waterTop);
        ctx.lineTo(tankRight, waterTop);
        ctx.stroke();
        ctx.setLineDash([]);

        // Water label — inside tank, left side
        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`💧 ${liquidDensity.toFixed(2)} g/cm³`, tankLeft + 10, waterTop + 22);

        // Objects
        const xPositions = [tankLeft + 80, (tankLeft + tankRight) / 2, tankRight - 80];
        objectsRef.current.forEach((obj, i) => {
            const cx = xPositions[i];
            const cy = obj.y + obj.size / 2;

            // Shadow in water
            if (obj.dropped && cy > waterTop) {
                ctx.fillStyle = 'rgba(0,0,0,0.06)';
                ctx.beginPath();
                ctx.ellipse(cx, cy + obj.size / 2 + 4, obj.size * 0.6, 4, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // Object body
            ctx.fillStyle = obj.color;
            ctx.beginPath();
            if (obj.label === 'Beach Ball') {
                ctx.arc(cx, cy, obj.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2;
                ctx.stroke();
                // Stripes
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(cx - obj.size / 2, cy);
                ctx.lineTo(cx + obj.size / 2, cy);
                ctx.stroke();
            } else if (obj.label === 'Steel') {
                ctx.arc(cx, cy, obj.size / 2, 0, Math.PI * 2);
                ctx.fill();
                // Metallic shine
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.beginPath();
                ctx.arc(cx - 3, cy - 3, obj.size / 4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Wood block
                ctx.fillRect(cx - obj.size / 2, cy - obj.size / 2, obj.size, obj.size);
                ctx.strokeStyle = '#a67c52';
                ctx.lineWidth = 2;
                ctx.strokeRect(cx - obj.size / 2, cy - obj.size / 2, obj.size, obj.size);
                // Wood grain
                ctx.strokeStyle = 'rgba(139,90,43,0.3)';
                ctx.lineWidth = 1;
                for (let dy = -obj.size / 2 + 8; dy < obj.size / 2; dy += 8) {
                    ctx.beginPath();
                    ctx.moveTo(cx - obj.size / 2 + 3, cy + dy);
                    ctx.lineTo(cx + obj.size / 2 - 3, cy + dy);
                    ctx.stroke();
                }
            }

            // Label
            ctx.textAlign = 'center';
            if (!obj.dropped) {
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 18px monospace';
                ctx.fillText(obj.label, cx, cy - obj.size / 2 - 18);
                ctx.fillStyle = '#1e293b';
                ctx.font = '17px monospace';
                ctx.fillText(`${obj.density} g/cm³`, cx, cy - obj.size / 2 - 4);
            } else {
                const labelY = obj.density > liquidDensity ? tankBottom + 18 : cy - obj.size / 2 - 12;
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 18px monospace';
                ctx.fillText(`${obj.label} (${obj.density})`, cx, labelY);
            }
        });

        // Mystery object
        if (showMysteryObject) {
            const mx = (tankLeft + tankRight) / 2 + 80;
            const mDensity = 0.83;
            let my: number;
            if (phase === 'checkpoint') {
                my = waterTop - 50;
            } else {
                const frac = mDensity / liquidDensity;
                my = waterTop - 30 * (1 - frac);
            }
            ctx.fillStyle = '#8b5cf6';
            ctx.fillRect(mx - 18, my, 36, 36);
            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 2;
            ctx.strokeRect(mx - 18, my, 36, 36);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('?', mx, my + 22);
        }

        // Principle banner
        if (showPrinciple) {
            const bY = 38;
            ctx.fillStyle = 'rgba(59,130,246,0.08)';
            ctx.fillRect(tankLeft, bY, tankRight - tankLeft, 44);
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.strokeRect(tankLeft, bY, tankRight - tankLeft, 44);
            ctx.fillStyle = '#1e40af';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText("Archimedes' Principle:", W / 2, bY + 16);
            ctx.font = '17px monospace';
            ctx.fillText("Buoyant force = weight of displaced liquid", W / 2, bY + 32);
        }

        // Density comparison sidebar
        if (true) {
            const sX = W - 55;
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(sX - 5, waterTop, 55, tankBottom - waterTop);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.strokeRect(sX - 5, waterTop, 55, tankBottom - waterTop);
            ctx.fillStyle = '#64748b';
            ctx.font = '11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Density', sX + 20, waterTop + 14);
            ctx.fillText('Scale', sX + 20, waterTop + 26);

            // Markers
            const scaleH = tankBottom - waterTop - 20;
            const maxD = 8;
            [1.0, 0.6, 7.8, 0.05].forEach(d => {
                const yPos = waterTop + 10 + scaleH * (1 - d / maxD);
                ctx.fillStyle = d === 1.0 ? '#3b82f6' : '#94a3b8';
                ctx.font = d === 1.0 ? 'bold 13px monospace' : '13px monospace';
                ctx.fillText(d.toString(), sX + 20, yPos);
            });
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, steelDropped, woodDropped, ballDropped, showMysteryObject, showPrinciple, liquidDensity]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

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
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />

            {densitySliderUnlocked && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Liquid</span>
                    <input
                        type="range"
                        min={0.8}
                        max={1.25}
                        step={0.01}
                        value={liquidDensity}
                        onChange={e => {
                            const v = Number(e.target.value);
                            setLiquidDensity(v);
                            onStateChange?.('liquidDensity', v);
                        }}
                        className="w-32 h-2 accent-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-bold text-blue-600 min-w-[70px] text-right">{liquidDensity.toFixed(2)} g/cm³</span>
                    <span className="text-xs text-slate-400">{liquidDensity > 1.02 ? '🧂 Salt water' : '💧 Fresh water'}</span>
                </div>
            )}

            {phase === 'complete' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-100 border border-indigo-300 rounded-full px-4 py-1.5 text-indigo-700 text-xs font-bold tracking-wider uppercase">
                    ✅ Lesson Complete
                </div>
            )}
        </div>
    );
};


