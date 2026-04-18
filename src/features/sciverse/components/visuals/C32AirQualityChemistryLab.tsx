import { useCallback, useEffect, useRef, useState } from 'react';

interface C32AirQualityChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C32AirQualityChemistryLab = ({ state, onStateChange }: C32AirQualityChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [sunlight, setSunlight] = useState(50);
    const phase = (state.phase as string) || 'intro';

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;
        const safeRight = W - 285;
        const sun = sunlight / 100; // 0..1

        // Background -- sky color depends on smog
        const smogLevel = sun; // more sun = more smog reactions
        const skyR = Math.round(191 + smogLevel * 50);
        const skyG = Math.round(219 - smogLevel * 80);
        const skyB = Math.round(254 - smogLevel * 140);
        ctx.fillStyle = `rgb(${skyR},${skyG},${skyB})`;
        ctx.fillRect(0, 0, W, H);

        // Smog haze overlay
        if (smogLevel > 0.3) {
            ctx.save();
            ctx.globalAlpha = (smogLevel - 0.3) * 0.5;
            ctx.fillStyle = '#92400e';
            ctx.fillRect(0, H * 0.3, safeRight, H * 0.5);
            ctx.restore();
        }

        // Sun
        const sunSize = 20 + sun * 25;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(safeRight * 0.75, 50, sunSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.stroke();
        // Sun rays
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        for (let r = 0; r < 8; r++) {
            const a = (r / 8) * Math.PI * 2 + t * 0.2;
            ctx.beginPath();
            ctx.moveTo(safeRight * 0.75 + Math.cos(a) * (sunSize + 4), 50 + Math.sin(a) * (sunSize + 4));
            ctx.lineTo(safeRight * 0.75 + Math.cos(a) * (sunSize + 12 + sun * 8), 50 + Math.sin(a) * (sunSize + 12 + sun * 8));
            ctx.stroke();
        }

        // UV arrows from sun (more with higher sunlight)
        const uvCount = Math.round(sun * 10);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        for (let u = 0; u < uvCount; u++) {
            const ux = safeRight * 0.3 + (u * safeRight * 0.5 / uvCount);
            const uy1 = 80 + Math.sin(t * 1.2 + u) * 10;
            const uy2 = uy1 + 30;
            ctx.beginPath();
            ctx.moveTo(ux, uy1);
            ctx.lineTo(ux, uy2);
            ctx.stroke();
            // Arrow head
            ctx.beginPath();
            ctx.moveTo(ux - 4, uy2 - 6);
            ctx.lineTo(ux, uy2);
            ctx.lineTo(ux + 4, uy2 - 6);
            ctx.stroke();
        }
        if (uvCount > 0) {
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#7c3aed';
            ctx.fillText('UV RAYS', safeRight * 0.55, 78);
        }

        // Ground / road
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(0, H - 50, safeRight, 50);
        ctx.fillStyle = '#fbbf24';
        ctx.setLineDash([20, 15]);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, H - 25);
        ctx.lineTo(safeRight, H - 25);
        ctx.stroke();
        ctx.setLineDash([]);

        // Title
        ctx.textAlign = 'center';
        ctx.font = 'bold 28px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.strokeText('Smog Reactions', safeRight / 2, 38);
        ctx.fillStyle = '#18181b';
        ctx.fillText('Smog Reactions', safeRight / 2, 38);

        // Cars on road
        const carY = H - 48;
        for (let c = 0; c < 3; c++) {
            const cx = 40 + c * (safeRight / 4) + Math.sin(t * 0.3 + c * 2) * 15;
            // Car body
            ctx.fillStyle = c === 0 ? '#3b82f6' : c === 1 ? '#ef4444' : '#10b981';
            ctx.fillRect(cx - 18, carY, 36, 16);
            ctx.fillRect(cx - 12, carY - 10, 24, 12);
            // Wheels
            ctx.fillStyle = '#1f2937';
            ctx.beginPath(); ctx.arc(cx - 10, carY + 16, 5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(cx + 10, carY + 16, 5, 0, Math.PI * 2); ctx.fill();
            // Exhaust
            ctx.fillStyle = '#9ca3af';
            for (let e = 0; e < 3; e++) {
                const ex = cx - 22 - e * 8 - Math.sin(t * 2 + c + e) * 3;
                const ey = carY + 8 + Math.cos(t + c + e) * 3;
                ctx.globalAlpha = 0.4 - e * 0.1;
                ctx.beginPath(); ctx.arc(ex, ey, 4 + e * 2, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        // NOx molecules (small blue dots rising from cars)
        const noxCount = 8;
        ctx.fillStyle = '#2563eb';
        for (let n = 0; n < noxCount; n++) {
            const nx = 40 + (n * safeRight * 0.7 / noxCount) + Math.sin(t * 0.4 + n * 1.5) * 20;
            const ny = H - 60 - (t * 20 + n * 30) % (H * 0.4);
            ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
        }

        // VOC molecules (small green triangles)
        const vocCount = 6;
        for (let v = 0; v < vocCount; v++) {
            const vx = 80 + (v * safeRight * 0.6 / vocCount) + Math.cos(t * 0.3 + v * 2) * 15;
            const vy = H - 80 - (t * 15 + v * 35) % (H * 0.35);
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.moveTo(vx, vy - 5);
            ctx.lineTo(vx - 4, vy + 4);
            ctx.lineTo(vx + 4, vy + 4);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
        }

        // Ozone (O3) molecules -- created by sunlight (more with higher sun)
        const ozoneCount = Math.round(sun * 12);
        ctx.fillStyle = '#dc2626';
        for (let o = 0; o < ozoneCount; o++) {
            const ox = 30 + (o * safeRight * 0.8 / Math.max(ozoneCount, 1)) + Math.sin(t * 0.6 + o * 1.8) * 25;
            const oy = H * 0.25 + (o * 20 + Math.cos(t * 0.5 + o) * 15) % (H * 0.35);
            ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
            // "O3" label
            ctx.font = 'bold 8px monospace';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('O3', ox, oy + 3);
            ctx.fillStyle = '#dc2626';
        }

        // Reaction arrow (NOx + UV -> O3)
        if (sun > 0.2) {
            const arrowY = H * 0.38;
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#7c3aed';
            ctx.fillText('UV RAYS', safeRight * 0.55, 110);
            const rxn = 'NOx + UV Light -> Ozone (O3)';
            ctx.strokeText(rxn, safeRight / 2, arrowY);
            ctx.fillStyle = '#000000';
            ctx.fillText(rxn, safeRight / 2, arrowY);
        }

        // Air Quality meter
        const aqPct = Math.round((1 - sun) * 100);
        const aqBarX = safeRight * 0.15;
        const aqBarW = safeRight * 0.7;
        const aqBarY = H - 90;
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(aqBarX, aqBarY, aqBarW, 14);
        const aqGrad = ctx.createLinearGradient(aqBarX, 0, aqBarX + aqBarW, 0);
        aqGrad.addColorStop(0, '#dc2626');
        aqGrad.addColorStop(0.5, '#eab308');
        aqGrad.addColorStop(1, '#22c55e');
        ctx.fillStyle = aqGrad;
        ctx.fillRect(aqBarX, aqBarY, aqBarW * (aqPct / 100), 14);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(aqBarX, aqBarY, aqBarW, 14);

        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#18181b';
        ctx.fillText('Air Quality: ' + (aqPct > 70 ? 'GOOD' : aqPct > 40 ? 'MODERATE' : 'UNHEALTHY'), safeRight / 2, aqBarY - 16);

        // Legend
        ctx.textAlign = 'left';
        ctx.font = 'bold 16px monospace';
        const lgY = H - 160;
        // NOx
        ctx.fillStyle = '#2563eb';
        ctx.beginPath(); ctx.arc(16, lgY, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.fillText('NOx', 26, lgY + 4);
        // VOC
        ctx.fillStyle = '#16a34a';
        ctx.beginPath(); ctx.arc(70, lgY, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#18181b';
        ctx.fillText('VOC', 85, lgY + 6);
        // O3
        ctx.fillStyle = '#dc2626';
        ctx.beginPath(); ctx.arc(130, lgY, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#18181b';
        ctx.fillText('Ozone', 150, lgY + 6);

        // Bottom insight
        ctx.font = 'bold 14px monospace';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        const msg = sun > 0.7 ? 'Intense sun -- rapid smog reactions, unhealthy air!'
            : sun > 0.3 ? 'Moderate sun -- some ozone forming, haze building.'
            : 'Low sun -- few reactions, air stays cleaner.';
        ctx.strokeText(msg, safeRight / 2, aqBarY - 38);
        ctx.fillStyle = '#18181b';
        ctx.fillText(msg, safeRight / 2, aqBarY - 38);

        // Complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.22);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 28px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('C32 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 18px monospace';
            ctx.fillText('How Chemistry Creates Smog', W / 2, H * 0.38);
            ctx.font = '14px monospace';
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText('Sunlight and pollution drive dangerous reactions!', W / 2, H * 0.44);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [sunlight, phase]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = node.clientWidth;
            canvas.height = node.clientHeight;
        });
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute right-2 bottom-2 bg-white border border-slate-300 rounded-lg p-4 w-[260px] shadow-md z-10 flex flex-col items-center">
                <label className="text-[18px] font-bold text-emerald-700 mb-2" style={{color:'#18181b'}}>Sunlight Intensity: <span className="font-extrabold">{sunlight}%</span></label>
                <input className="w-full accent-emerald-500 h-3" type="range" min={5} max={100} value={sunlight}
                    onChange={e => { const v = Number(e.target.value); setSunlight(v); onStateChange('sunlightIntensity', v); }} />
            </div>
        </div>
    );
};
