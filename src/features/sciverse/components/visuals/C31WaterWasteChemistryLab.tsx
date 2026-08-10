import { useCallback, useEffect, useRef, useState } from 'react';

interface C31WaterWasteChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C31WaterWasteChemistryLab = ({ state, onStateChange }: C31WaterWasteChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [chlorine, setChlorine] = useState(50);
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
        const cl = chlorine / 100;

        // Background
        ctx.fillStyle = '#f0fdf4';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('Clean Water', safeRight / 2, 24);
        ctx.fillStyle = '#000000';
        ctx.fillText('Clean Water', safeRight / 2, 24);

        // 5 treatment stages left to right
        const stages = ['SCREEN', 'CLUMP', 'SETTLE', 'FILTER', 'DISINFECT'];
        const stageW = (safeRight - 40) / 5;
        const tankTop = H * 0.26;
        const tankBot = H * 0.62;
        const tankH = tankBot - tankTop;

        for (let i = 0; i < 5; i++) {
            const sx = 20 + i * stageW;
            const cx = sx + stageW / 2;

            // Tank outline
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.roundRect(sx + 4, tankTop, stageW - 8, tankH, 6);
            ctx.fill();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(sx + 4, tankTop, stageW - 8, tankH, 6);
            ctx.stroke();

            // Water color -- gets cleaner as stages progress
            const dirtiness = Math.max(0, 1 - (i + cl * 0.6) / 5);
            const r = Math.round(139 + dirtiness * 80);
            const g = Math.round(200 - dirtiness * 100);
            const b = Math.round(255 - dirtiness * 60);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(sx + 6, tankTop + 14, stageW - 12, tankH - 18);

            // Stage label
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText(stages[i], cx, tankTop - 8);
            ctx.fillStyle = '#000000';
            ctx.fillText(stages[i], cx, tankTop - 8);

            // Arrow between stages
            if (i < 4) {
                ctx.fillStyle = '#64748b';
                const ax = sx + stageW - 2;
                const ay = tankTop + tankH / 2;
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(ax - 6, ay - 5);
                ctx.lineTo(ax - 6, ay + 5);
                ctx.closePath();
                ctx.fill();
            }

            // Stage-specific visuals
            if (i === 0) {
                // Screen stage: brown particles filtered by bars
                ctx.strokeStyle = '#6b7280';
                ctx.lineWidth = 1.5;
                for (let b = 0; b < 4; b++) {
                    const bx = sx + 8 + b * ((stageW - 16) / 3);
                    ctx.beginPath();
                    ctx.moveTo(bx, tankTop + 16);
                    ctx.lineTo(bx, tankBot - 6);
                    ctx.stroke();
                }
                // Floating debris
                for (let d = 0; d < 8; d++) {
                    const dx = sx + 10 + (d * 7 + Math.sin(t + d) * 3) % (stageW - 20);
                    const dy = tankTop + 20 + (d * 11 + Math.cos(t * 0.5 + d) * 4) % (tankH - 30);
                    ctx.fillStyle = '#92400e';
                    ctx.beginPath();
                    ctx.arc(dx, dy, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
                }
            } else if (i === 1) {
                // Clumping stage: particles grouping
                const clumpCount = 3;
                for (let c = 0; c < clumpCount; c++) {
                    const ccx = cx - 10 + c * 10 + Math.sin(t * 0.3 + c) * 3;
                    const cy = tankTop + tankH * 0.4 + Math.sin(t * 0.4 + c * 2) * 5;
                    ctx.fillStyle = '#b45309';
                    ctx.beginPath();
                    ctx.arc(ccx, cy, 8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
                    // Smaller particles being attracted
                    for (let p = 0; p < 4; p++) {
                        const angle = (t * 0.5 + p * 1.6 + c);
                        const dist = 14 + Math.sin(t + p) * 4;
                        ctx.fillStyle = '#d97706';
                        ctx.beginPath();
                        ctx.arc(ccx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, 4, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
                    }
                }
            } else if (i === 2) {
                // Settle stage: particles sinking to bottom
                const settledCount = 8;
                for (let s = 0; s < settledCount; s++) {
                    const px = sx + 10 + s * ((stageW - 20) / settledCount);
                    ctx.fillStyle = '#a16207';
                    ctx.beginPath();
                    ctx.arc(px, tankBot - 12 - Math.abs(Math.sin(s)) * 4, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
                }
                // Sludge layer at bottom
                ctx.fillStyle = 'rgba(146,64,14,0.45)';
                ctx.fillRect(sx + 6, tankBot - 20, stageW - 12, 16);
            } else if (i === 3) {
                // Filter stage: sand/gravel layers
                const layerH = tankH / 4;
                ctx.fillStyle = '#fde68a';
                ctx.fillRect(sx + 6, tankTop + 14, stageW - 12, layerH);
                ctx.fillStyle = '#d1d5db';
                ctx.fillRect(sx + 6, tankTop + 14 + layerH, stageW - 12, layerH);
                ctx.fillStyle = '#9ca3af';
                ctx.fillRect(sx + 6, tankTop + 14 + layerH * 2, stageW - 12, layerH);

                ctx.font = 'bold 10px monospace';
                ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
                ctx.textAlign = 'center';
                ctx.strokeText('SAND', cx, tankTop + 14 + layerH * 0.6);
                ctx.fillStyle = '#000000';
                ctx.fillText('SAND', cx, tankTop + 14 + layerH * 0.6);
                ctx.strokeText('GRAVEL', cx, tankTop + 14 + layerH * 1.6);
                ctx.fillStyle = '#000000';
                ctx.fillText('GRAVEL', cx, tankTop + 14 + layerH * 1.6);
                ctx.strokeText('ROCKS', cx, tankTop + 14 + layerH * 2.6);
                ctx.fillStyle = '#000000';
                ctx.fillText('ROCKS', cx, tankTop + 14 + layerH * 2.6);
            } else if (i === 4) {
                // Disinfect stage

                // Live germs (more when chlorine is LOW)
                const germsAlive = Math.round((1 - cl) * 8);
                for (let g = 0; g < germsAlive; g++) {
                    const gx = sx + 12 + (g * 19 + Math.sin(t * 0.6 + g * 1.7) * 6) % (stageW - 24);
                    const gy = tankTop + 24 + (g * 23 + Math.cos(t * 0.4 + g * 2.3) * 5) % (tankH - 34);
                    // Germ body
                    ctx.fillStyle = '#a855f7';
                    ctx.beginPath(); ctx.arc(gx, gy, 5, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke();
                    // Germ flagella
                    ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 1.5;
                    for (let f = 0; f < 4; f++) {
                        const fa = (f / 4) * Math.PI * 2 + t * 0.8;
                        ctx.beginPath();
                        ctx.moveTo(gx + Math.cos(fa) * 5, gy + Math.sin(fa) * 5);
                        ctx.lineTo(gx + Math.cos(fa) * 10, gy + Math.sin(fa + 0.4) * 10);
                        ctx.stroke();
                    }
                }

                // Chlorine drops
                ctx.fillStyle = '#22c55e';
                const dropCountCl = Math.round(3 + cl * 8);
                for (let d = 0; d < dropCountCl; d++) {
                    const dx = sx + 10 + Math.sin(t * 0.7 + d * 1.3) * (stageW / 2 - 14) + (stageW / 2 - 10);
                    const dy = tankTop + 20 + (d * 13 + t * 15) % (tankH - 30);
                    ctx.beginPath();
                    ctx.arc(dx, dy, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Dead germ X marks (more at higher chlorine)
                const germsDead = Math.round(cl * 6);
                ctx.strokeStyle = '#dc2626';
                ctx.lineWidth = 2.5;
                for (let g = 0; g < germsDead; g++) {
                    const gx = sx + 12 + (g * 17) % (stageW - 24);
                    const gy = tankTop + 30 + (g * 19) % (tankH - 40);
                    ctx.beginPath();
                    ctx.moveTo(gx - 5, gy - 5);
                    ctx.lineTo(gx + 5, gy + 5);
                    ctx.moveTo(gx + 5, gy - 5);
                    ctx.lineTo(gx - 5, gy + 5);
                    ctx.stroke();
                }
            }
        }

        // Purity bar
        const purity = Math.round(10 + cl * 90);
        const barX = 20;
        const barY = tankBot + 20;
        const barW = safeRight - 40;

        ctx.fillStyle = '#e5e7eb';
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, 16, 4);
        ctx.fill();

        const purityColor = purity > 70 ? '#22c55e' : purity > 40 ? '#eab308' : '#ef4444';
        ctx.fillStyle = purityColor;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW * (purity / 100), 16, 4);
        ctx.fill();

        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText('Purity: ' + purity + '%', barX + barW / 2, barY + 12);
        ctx.fillStyle = '#000000';
        ctx.fillText('Purity: ' + purity + '%', barX + barW / 2, barY + 12);

        // Legend row
        const legendY = barY + 28;
        const legendItems: [string, string, string][] = [
            ['#92400e', 'Dirt/Debris', 'circle'],
            ['#b45309', 'Clumps', 'circle'],
            ['#a16207', 'Sludge', 'circle'],
            ['#a855f7', 'Live Germ', 'circle'],
            ['#22c55e', 'Chlorine', 'circle'],
            ['#dc2626', 'Dead Germ', 'x'],
        ];
        const lgSpacing = (safeRight - 40) / legendItems.length;
        const lgStartX = 20 + lgSpacing / 2;
        ctx.font = 'bold 10px monospace';
        for (let li = 0; li < legendItems.length; li++) {
            const [color, name, shape] = legendItems[li];
            const lx = lgStartX + li * lgSpacing;
            if (shape === 'circle') {
                ctx.fillStyle = color;
                ctx.beginPath(); ctx.arc(lx - 22, legendY, 5, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
            } else {
                ctx.strokeStyle = color; ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(lx - 27, legendY - 5); ctx.lineTo(lx - 17, legendY + 5);
                ctx.moveTo(lx - 17, legendY - 5); ctx.lineTo(lx - 27, legendY + 5);
                ctx.stroke();
            }
            ctx.textAlign = 'left';
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
            ctx.strokeText(name, lx - 12, legendY + 4);
            ctx.fillStyle = '#000000';
            ctx.fillText(name, lx - 12, legendY + 4);
        }

        // Bottom insight
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        const msg = cl > 0.6 ? 'Strong disinfection -- germs wiped out!'
            : cl > 0.3 ? 'Some chlorine -- a few germs survive.'
            : 'Almost no chlorine -- clear does NOT mean clean!';
        ctx.strokeText(msg, safeRight / 2, H - 14);
        ctx.fillStyle = '#000000';
        ctx.fillText(msg, safeRight / 2, H - 14);

        // Complete overlay
        if (phase === 'complete') {
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText('C31 Complete -- Clean Water!', W / 2, H / 2 - 14);
            ctx.font = '16px sans-serif';
            ctx.fillText('How Do Cities Move Water and Waste?', W / 2, H / 2 + 16);
            ctx.restore();
        }

        animRef.current = requestAnimationFrame(draw);
    }, [chlorine, phase]);

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
                <label className="text-[13px] font-bold text-emerald-600">Chlorine Level: {chlorine}%</label>
                <input className="w-full accent-emerald-500" type="range" min={5} max={100} value={chlorine}
                    onChange={e => { const v = Number(e.target.value); setChlorine(v); onStateChange('chlorineLevel', v); }} />
            </div>
        </div>
    );
};
