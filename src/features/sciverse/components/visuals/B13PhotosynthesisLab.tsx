import { useRef, useEffect, useCallback, useState } from 'react';

interface B13PhotosynthesisLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B13PhotosynthesisLab = ({ state, onStateChange }: B13PhotosynthesisLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    const [lightLevel, setLightLevel] = useState(50);
    const [co2Level, setCO2Level] = useState(50);

    const phase = (state.phase as string) || 'intro';

    const output = Math.round((lightLevel / 100) * (co2Level / 100) * 100);
    const oxygen = Math.round(output * 0.9);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        // Sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#bfdbfe');
        sky.addColorStop(0.45, '#a7f3d0');
        sky.addColorStop(1, '#86efac');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Photosynthesis Lab', W / 2, 26);

        // Sun
        const sunX = W * 0.14;
        const sunY = H * 0.18;
        const sunR = 24 + lightLevel * 0.08;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR);
        sunGrad.addColorStop(0, '#fca5a5');
        sunGrad.addColorStop(1, '#dc2626');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
        ctx.fill();

        // Sun rays
        ctx.strokeStyle = `rgba(220,38,38,${0.3 + lightLevel / 200})`;
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(sunX + Math.cos(a) * (sunR + 4), sunY + Math.sin(a) * (sunR + 4));
            ctx.lineTo(sunX + Math.cos(a) * (sunR + 22), sunY + Math.sin(a) * (sunR + 22));
            ctx.stroke();
        }

        // Leaf shape
        const lx = W * 0.55;
        const ly = H * 0.5;
        const lw = W * 0.46;
        const lh = H * 0.5;
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(-0.16);
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.moveTo(-lw * 0.4, 0);
        ctx.quadraticCurveTo(0, -lh * 0.45, lw * 0.44, 0);
        ctx.quadraticCurveTo(0, lh * 0.45, -lw * 0.4, 0);
        ctx.fill();
        // Midrib
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-lw * 0.36, 0);
        ctx.lineTo(lw * 0.38, 0);
        ctx.stroke();
        // Veins
        ctx.lineWidth = 1;
        for (let i = 1; i <= 6; i++) {
            const t = i / 7;
            const vx = -lw * 0.2 + t * lw * 0.45;
            ctx.beginPath();
            ctx.moveTo(vx, 0);
            ctx.lineTo(vx + 20, -15 + i * 4);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(vx, 0);
            ctx.lineTo(vx + 20, 15 - i * 4);
            ctx.stroke();
        }
        ctx.restore();

        // Chloroplast indicators inside leaf
        const chloroplastCount = Math.round(8 + output * 0.15);
        for (let i = 0; i < chloroplastCount; i++) {
            const cx = W * 0.43 + (i % 6) * 24 + Math.sin(i) * 4;
            const cy = H * 0.39 + Math.floor(i / 6) * 18 + Math.cos(i * 1.4) * 3;
            ctx.fillStyle = `rgba(220,38,38,${0.45 + lightLevel / 250})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, 7, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Incoming CO2 particles
        const particles = Math.round(6 + co2Level * 0.08);
        for (let i = 0; i < particles; i++) {
            const t = ((Date.now() / 900) + i / particles) % 1;
            const px = W * 0.1 + t * W * 0.28;
            const py = H * 0.62 + Math.sin(t * Math.PI * 2 + i) * 14;
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('CO2', px, py + 2);
        }

        // Oxygen bubbles leaving
        const o2Count = Math.round(4 + oxygen * 0.06);
        for (let i = 0; i < o2Count; i++) {
            const t = ((Date.now() / 1100) + i / o2Count) % 1;
            const ox = W * 0.7 + Math.sin(t * 6 + i) * 16;
            const oy = H * 0.62 - t * H * 0.46;
            ctx.fillStyle = `rgba(125,211,252,${0.35 + oxygen / 200})`;
            ctx.beginPath();
            ctx.arc(ox, oy, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#0ea5e9';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Process equation
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('6CO2 + 6H2O + LIGHT → C6H12O6 + 6O2', W / 2, H * 0.78);

        // Output bars
        const bx = 18, by = H * 0.82, bw = W - 36;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(bx, by, bw, 44);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(bx, by, bw, 44);

        ctx.fillStyle = '#22c55e';
        ctx.fillRect(bx + 8, by + 8, (bw - 16) * (output / 100), 10);
        ctx.fillStyle = '#7dd3fc';
        ctx.fillRect(bx + 8, by + 24, (bw - 16) * (oxygen / 100), 10);
        ctx.fillStyle = '#f1f5f9';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Glucose Output: ${output}%`, bx + 10, by + 16);
        ctx.fillText(`Oxygen Release: ${oxygen}%`, bx + 10, by + 32);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 13 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Does Structure Shape Function?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P13 Gears & Pulleys', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C13 Polymers & Materials', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B13 Photosynthesis Engine', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Structure determines function at every scale!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [lightLevel, co2Level, output, oxygen, phase]);

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
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[190px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <label className="text-slate-300 text-xs">
                    Light Intensity: <span className="text-red-400">{lightLevel}%</span>
                </label>
                <input type="range" min={0} max={100} value={lightLevel}
                    onChange={e => { setLightLevel(Number(e.target.value)); onStateChange('lightLevel', Number(e.target.value)); }}
                    className="w-full accent-yellow-500" />
                <label className="text-slate-300 text-xs mt-1">
                    CO2 Level: <span className="text-slate-300">{co2Level}%</span>
                </label>
                <input type="range" min={0} max={100} value={co2Level}
                    onChange={e => { setCO2Level(Number(e.target.value)); onStateChange('co2Level', Number(e.target.value)); }}
                    className="w-full accent-emerald-500" />
            </div>
        </div>
    );
};
