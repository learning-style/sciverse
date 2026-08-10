import { useCallback, useEffect, useRef, useState } from 'react';

interface B32AirQualityBiologyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B32AirQualityBiologyLab = ({ state, onStateChange }: B32AirQualityBiologyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [pollution, setPollution] = useState(50);
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
        const pol = pollution / 100; // 0..1

        // Background
        ctx.fillStyle = '#fef2f2';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.textAlign = 'center';
        ctx.font = 'bold 28px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.strokeText('Breathing Under Siege', safeRight / 2, 38);
        ctx.fillStyle = '#18181b';
        ctx.fillText('Breathing Under Siege', safeRight / 2, 38);

        // Draw lung cross-section
        const lungCX = safeRight * 0.5;
        const lungCY = H * 0.48;
        const lungW = safeRight * 0.35;
        const lungH = H * 0.45;

        // Trachea (top tube)
        const tracheaW = 20;
        ctx.fillStyle = '#fca5a5';
        ctx.fillRect(lungCX - tracheaW / 2, lungCY - lungH / 2 - 30, tracheaW, 40);
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.strokeRect(lungCX - tracheaW / 2, lungCY - lungH / 2 - 30, tracheaW, 40);

        // "AIR IN" label
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#18181b';
        ctx.fillText('AIR IN', lungCX, lungCY - lungH / 2 - 46);

        // Bronchi splitting
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 3;
        // Left branch
        ctx.beginPath();
        ctx.moveTo(lungCX, lungCY - lungH / 2 + 10);
        ctx.quadraticCurveTo(lungCX - lungW * 0.3, lungCY - lungH * 0.2, lungCX - lungW * 0.35, lungCY);
        ctx.stroke();
        // Right branch
        ctx.beginPath();
        ctx.moveTo(lungCX, lungCY - lungH / 2 + 10);
        ctx.quadraticCurveTo(lungCX + lungW * 0.3, lungCY - lungH * 0.2, lungCX + lungW * 0.35, lungCY);
        ctx.stroke();

        // Left lung outline
        ctx.fillStyle = pol > 0.5 ? `rgba(254,202,202,${0.6 + pol * 0.3})` : 'rgba(254,226,226,0.7)';
        ctx.beginPath();
        ctx.ellipse(lungCX - lungW * 0.28, lungCY + lungH * 0.08, lungW * 0.32, lungH * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = pol > 0.5 ? '#dc2626' : '#f87171';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Right lung outline
        ctx.fillStyle = pol > 0.5 ? `rgba(254,202,202,${0.6 + pol * 0.3})` : 'rgba(254,226,226,0.7)';
        ctx.beginPath();
        ctx.ellipse(lungCX + lungW * 0.28, lungCY + lungH * 0.08, lungW * 0.32, lungH * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = pol > 0.5 ? '#dc2626' : '#f87171';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Alveoli clusters in each lung
        const drawAlveoli = (cx: number, cy: number) => {
            const numAlv = 7;
            for (let a = 0; a < numAlv; a++) {
                const angle = (a / numAlv) * Math.PI * 2;
                const dist = 18 + Math.sin(a * 3) * 8;
                const ax = cx + Math.cos(angle) * dist;
                const ay = cy + Math.sin(angle) * dist;
                const alvR = 10 + Math.sin(t * 2 + a) * (1 - pol) * 3; // Breathe less with more pollution

                // Alveolus color: pink (healthy) to red (inflamed)
                const alvR_col = Math.round(255 - (1 - pol) * 40);
                const alvG_col = Math.round(180 - pol * 130);
                const alvB_col = Math.round(180 - pol * 130);
                ctx.fillStyle = `rgb(${alvR_col},${alvG_col},${alvB_col})`;
                ctx.beginPath();
                ctx.arc(ax, ay, alvR, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = pol > 0.5 ? '#b91c1c' : '#f87171';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Pollution particles stuck in alveoli
                const stuckParticles = Math.round(pol * 3);
                for (let sp = 0; sp < stuckParticles; sp++) {
                    const spAngle = (sp / Math.max(stuckParticles, 1)) * Math.PI * 2 + a;
                    const spx = ax + Math.cos(spAngle) * (alvR * 0.5);
                    const spy = ay + Math.sin(spAngle) * (alvR * 0.5);
                    ctx.fillStyle = '#1f2937';
                    ctx.beginPath();
                    ctx.arc(spx, spy, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        // Left lung alveoli
        drawAlveoli(lungCX - lungW * 0.28, lungCY + lungH * 0.08);
        // Right lung alveoli
        drawAlveoli(lungCX + lungW * 0.28, lungCY + lungH * 0.08);

        // Mucus in airways (more with pollution)
        if (pol > 0.3) {
            ctx.save();
            ctx.globalAlpha = (pol - 0.3) * 0.8;
            ctx.fillStyle = '#fbbf24';
            // Left airway mucus
            ctx.beginPath();
            ctx.ellipse(lungCX - lungW * 0.15, lungCY - lungH * 0.12, 6 + pol * 8, 3 + pol * 4, -0.5, 0, Math.PI * 2);
            ctx.fill();
            // Right airway mucus
            ctx.beginPath();
            ctx.ellipse(lungCX + lungW * 0.15, lungCY - lungH * 0.12, 6 + pol * 8, 3 + pol * 4, 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Mucus label
            ctx.font = 'bold 10px monospace';
            ctx.fillStyle = '#92400e';
            ctx.textAlign = 'center';
            ctx.fillText('MUCUS', lungCX, lungCY - lungH * 0.18);
        }

        // Inflammation markers (red dots around airways at high pollution)
        if (pol > 0.5) {
            const inflCount = Math.round((pol - 0.5) * 16);
            ctx.fillStyle = '#dc2626';
            for (let inf = 0; inf < inflCount; inf++) {
                const angle = (inf / inflCount) * Math.PI * 2 + t * 0.3;
                const side = inf % 2 === 0 ? -1 : 1;
                const ix = lungCX + side * lungW * 0.28 + Math.cos(angle + t * 0.5) * 30;
                const iy = lungCY + lungH * 0.08 + Math.sin(angle + t * 0.5) * 25;
                ctx.beginPath();
                ctx.arc(ix, iy, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Incoming air particles (floating into trachea)
        const airParticles = Math.round(pol * 10);
        for (let ap = 0; ap < airParticles; ap++) {
            const apx = lungCX + Math.sin(t + ap * 1.4) * 30;
            const apy = (lungCY - lungH / 2 - 50 + (t * 40 + ap * 25) % 60);
            ctx.fillStyle = '#4b5563';
            ctx.beginPath();
            ctx.arc(apx, apy, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Breathing capacity meter
        const breathCap = Math.round((1 - pol * 0.7) * 100);
        const bcBarX = safeRight * 0.1;
        const bcBarW = safeRight * 0.8;
        const bcBarY = H - 60;
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(bcBarX, bcBarY, bcBarW, 16);
        const bcColor = breathCap > 70 ? '#22c55e' : breathCap > 40 ? '#eab308' : '#dc2626';
        ctx.fillStyle = bcColor;
        ctx.fillRect(bcBarX, bcBarY, bcBarW * (breathCap / 100), 16);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(bcBarX, bcBarY, bcBarW, 16);

        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = '#18181b';
        ctx.fillText('Breathing Capacity: ' + breathCap + '%', safeRight / 2, bcBarY - 18);

        // Status labels
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'left';
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#18181b';
        ctx.fillText(breathCap > 70 ? 'Healthy' : breathCap > 40 ? 'Strained' : 'Dangerous', bcBarX, bcBarY + 38);
        ctx.textAlign = 'right';
        ctx.fillText(breathCap > 70 ? 'Lungs clear' : breathCap > 40 ? 'Inflammation rising' : 'Severe inflammation', bcBarX + bcBarW, bcBarY + 38);

        // Legend
        ctx.textAlign = 'left';
        ctx.font = 'bold 16px monospace';
        const lgX = 14;
        const lgY = H * 0.45;
        // Healthy alveolus
        ctx.fillStyle = '#fda4af';
        ctx.beginPath(); ctx.arc(lgX, lgY, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#f87171'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.fillText('Alveolus', lgX + 10, lgY + 4);
        // Pollution particle
        ctx.fillStyle = '#1f2937';
        ctx.beginPath(); ctx.arc(lgX, lgY + 20, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.fillText('Particle', lgX + 10, lgY + 24);
        // Inflammation
        ctx.fillStyle = '#dc2626';
        ctx.beginPath(); ctx.arc(lgX, lgY + 40, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.fillText('Inflammation', lgX + 10, lgY + 44);

        // Bottom insight
        ctx.font = 'bold 14px monospace';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        const msg = pol > 0.7 ? 'Severe pollution -- lungs inflamed, airways blocked with mucus!'
            : pol > 0.3 ? 'Moderate pollution -- alveoli irritated, some inflammation.'
            : 'Clean air -- lungs healthy, oxygen flows freely!';
        ctx.strokeText(msg, safeRight / 2, H - 100);
        ctx.fillStyle = '#18181b';
        ctx.fillText(msg, safeRight / 2, H - 100);

        // Complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 26px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Big Idea 32 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 17px monospace';
            ctx.fillText('How Does Air Quality Affect Us?', W / 2, H * 0.38);
            ctx.font = '13px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P32 Air Quality Physics', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C32 Air Quality Chemistry', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B32 Breathing Under Siege', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Air quality affects every breath—protect your lungs!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [pollution, phase]);

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
            <div data-lab-controls="true" className="absolute right-4 top-4 bg-white border border-slate-300 rounded-lg p-4 w-[260px] shadow-md z-10 flex flex-col items-center">
                <label className="text-[18px] font-bold text-rose-700 mb-2" style={{color:'#18181b'}}>Pollution Level: <span className="font-extrabold">{pollution}%</span></label>
                <input className="w-full accent-rose-500 h-3" type="range" min={5} max={100} value={pollution}
                    onChange={e => { const v = Number(e.target.value); setPollution(v); onStateChange('pollutionLevel', v); }} />
            </div>
        </div>
    );
};
