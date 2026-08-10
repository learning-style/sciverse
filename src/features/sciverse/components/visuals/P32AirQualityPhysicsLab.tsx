import { useCallback, useEffect, useRef, useState } from 'react';

interface P32AirQualityPhysicsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P32AirQualityPhysicsLab = ({ state, onStateChange }: P32AirQualityPhysicsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [particleSize, setParticleSize] = useState(50);
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
        const sz = particleSize / 100; // 0..1, 0=tiny PM2.5, 1=large dust

        // Background -- sky gradient
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#bfdbfe');
        grad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Ground
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, H - 40, safeRight, 40);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(0, H - 40, safeRight, 3);

        // Title
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('Particle Drift', safeRight / 2, 28);
        ctx.fillStyle = '#000000';
        ctx.fillText('Particle Drift', safeRight / 2, 28);

        // Emission source (smokestack)
        const stackX = 60;
        const stackTopY = H - 120;
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(stackX - 12, stackTopY, 24, 80);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(stackX - 16, stackTopY - 4, 32, 8);

        // Factory building
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(stackX - 30, H - 60, 60, 20);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SOURCE', stackX, H - 48);

        // Particles of different sizes
        const particleRadius = 2 + sz * 12; // 2 (PM2.5) to 14 (large dust)
        const fallSpeed = sz * 1.8; // large fall fast, tiny barely fall
        const driftAmount = (1 - sz) * 40; // tiny drift more

        // Draw particles
        const numParticles = 25;
        for (let i = 0; i < numParticles; i++) {
            const seed = i * 137.5;
            const baseX = stackX + 20 + (seed * 3.7) % (safeRight - stackX - 60);
            const baseY = stackTopY - 30 + (seed * 2.3) % (H - 80);

            // Large particles fall, tiny float
            const yOffset = fallSpeed * ((t * 30 + seed) % (H - 60));
            const xDrift = Math.sin(t * 0.5 + seed * 0.1) * driftAmount;

            let px = baseX + xDrift;
            let py = (baseY + yOffset) % (H - 50);
            if (py < 20) py += 60;
            if (px < 20) px = 20;
            if (px > safeRight - 20) px = safeRight - 20;

            // Color by size: tiny=red/dangerous, large=brown/less dangerous
            const r = Math.round(200 - sz * 80);
            const g = Math.round(80 + sz * 100);
            const b = Math.round(60 + sz * 40);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.beginPath();
            ctx.arc(px, py, particleRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Size label
        const sizeLabel = sz < 0.3 ? 'Fine (PM2.5, Particulate Matter)' : sz < 0.6 ? 'Coarse (PM10, Particulate Matter)' : 'Very Large (>PM10, Particulate Matter)';
        ctx.textAlign = 'center';
        ctx.font = 'bold 16px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('Particle: ' + sizeLabel, safeRight / 2, 56);
        ctx.fillStyle = '#000000';
        ctx.fillText('Particle: ' + sizeLabel, safeRight / 2, 56);

        // Settle time indicator
        const settleTime = sz < 0.3 ? 'Days' : sz < 0.6 ? 'Hours' : 'Seconds';
        ctx.font = 'bold 14px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('Settle Time: ' + settleTime, safeRight / 2, 78);
        ctx.fillStyle = '#000000';
        ctx.fillText('Settle Time: ' + settleTime, safeRight / 2, 78);

        // --- Bottom section: well above control box (which is ~80px from bottom) ---

        // Danger level bar
        const dangerPct = 1 - sz;
        const barX = safeRight * 0.15;
        const barW = safeRight * 0.7;
        const barY = H * 0.52;
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(barX, barY, barW, 14);
        const dangerGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
        dangerGrad.addColorStop(0, '#22c55e');
        dangerGrad.addColorStop(0.5, '#eab308');
        dangerGrad.addColorStop(1, '#dc2626');
        ctx.fillStyle = dangerGrad;
        ctx.fillRect(barX, barY, barW * dangerPct, 14);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barW, 14);

        // Danger bar title (below bar)
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText('Lung Penetration Danger', safeRight / 2, barY + 28);
        ctx.fillText('Lung Penetration Danger', safeRight / 2, barY + 28);

        // Bar endpoint labels
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.fillText('Safe', barX, barY + 42);
        ctx.textAlign = 'right';
        ctx.fillText('Dangerous', barX + barW, barY + 42);

        // Insight text (below bar section)
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        const msg = sz < 0.3 ? 'Tiny PM2.5 -- floats for days, reaches deep into lungs!'
            : sz < 0.6 ? 'Fine PM10 (Particulate Matter) -- floats for hours, gets past your nose.'
            : 'Large dust (>PM10, Particulate Matter) -- falls fast, mostly caught by nose hairs.';
        ctx.strokeText(msg, safeRight / 2, barY + 60);
        ctx.fillStyle = '#000000';
        ctx.fillText(msg, safeRight / 2, barY + 60);

        // Legend (bottom-right, above ground)
        ctx.textAlign = 'left';
        ctx.font = 'bold 12px monospace';
        const lgX = safeRight - 170;
        // Fine (PM2.5)
        ctx.fillStyle = 'rgb(200,80,60)';
        ctx.beginPath(); ctx.arc(lgX, H - 56, 5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.fillText('Fine (PM2.5, Particulate Matter)', lgX + 10, H - 52);
        // Coarse (PM10)
        ctx.fillStyle = 'rgb(120,180,100)';
        ctx.beginPath(); ctx.arc(lgX, H - 72, 7, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff'; ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.fillText('Coarse (PM10, Particulate Matter)', lgX + 12, H - 68);

        // Complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.24);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('P32 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Does Air Quality Affect Breathing?', W / 2, H * 0.38);
            ctx.font = '11px monospace';
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText('Every breath matters -- particle size determines danger!', W / 2, H * 0.44);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [particleSize, phase]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[210px] shadow-md z-10">
                <label className="text-[13px] font-bold text-indigo-600">Particle Size: {particleSize}%</label>
                <input className="w-full accent-indigo-500" type="range" min={5} max={100} value={particleSize}
                    onChange={e => { const v = Number(e.target.value); setParticleSize(v); onStateChange('particleSize', v); }} />
            </div>
        </div>
    );
};
