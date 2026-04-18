import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P29DiseaseSpreadPhysicsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P29DiseaseSpreadPhysicsLab = ({ state, onStateChange }: P29DiseaseSpreadPhysicsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [contactRate, setContactRate] = useState(50);
    const [popDensity, setPopDensity] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // R0 derived from contact rate and density
    const r0 = useMemo(() => {
        const cr = contactRate / 100;
        const pd = popDensity / 100;
        return Math.round((0.5 + cr * 3.5 + pd * 2) * 10) / 10;
    }, [contactRate, popDensity]);

    const spreadPct = useMemo(() => Math.min(100, Math.round(r0 * 20)), [r0]);

    const summary = useMemo(() => {
        if (r0 > 4) return 'Rapid epidemic — exponential growth!';
        if (r0 > 2) return 'Epidemic growing — R₀ well above 1.';
        if (r0 > 1) return 'Slow spread — R₀ just above 1.';
        return 'Epidemic declining — R₀ below 1.';
    }, [r0]);

    // Stable node positions - computed once per canvas size
    const nodesRef = useRef<{ x: number; y: number; infected: boolean; recovered: boolean }[]>([]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Variable readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#ea580c';
        ctx.fillText('CONTACTS', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#9a3412';
        ctx.fillText(contactRate + '/day', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#2563eb';
        ctx.fillText('POPULATION DENSITY', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText(popDensity + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = r0 > 1 ? '#dc2626' : '#16a34a';
        ctx.fillText('R₀ (Reproduction #)', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = r0 > 1 ? '#991b1b' : '#166534';
        ctx.fillText(r0.toFixed(1), col3, H * 0.14);

        // Spread bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Spread Intensity: ' + spreadPct + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = spreadPct > 70 ? '#ef4444' : spreadPct > 40 ? '#f59e0b' : '#22c55e';
        ctx.fillRect(barX, H * 0.23, barW * spreadPct / 100, 14);

        // === Network visualization ===
        const netCX = safeRight * 0.45;
        const netCY = H * 0.42;
        const netR = Math.min(safeRight * 0.3, H * 0.16);
        const nodeCount = Math.round(10 + popDensity / 100 * 15);
        const connectionsPerNode = Math.round(1 + (contactRate / 100) * 4);

        // Generate stable node positions if count changed
        if (nodesRef.current.length !== nodeCount) {
            nodesRef.current = [];
            for (let i = 0; i < nodeCount; i++) {
                const angle = (i / nodeCount) * Math.PI * 2;
                const layerR = i % 3 === 0 ? netR * 0.4 : i % 3 === 1 ? netR * 0.7 : netR;
                nodesRef.current.push({
                    x: netCX + Math.cos(angle) * layerR,
                    y: netCY + Math.sin(angle) * layerR,
                    infected: false,
                    recovered: false
                });
            }
        }

        const nodes = nodesRef.current;
        // Determine infection state based on time and R0
        const infectionWave = (t * 0.3 * (r0 / 3)) % 1;
        for (let i = 0; i < nodes.length; i++) {
            const threshold = i / nodes.length;
            nodes[i].infected = threshold < infectionWave && threshold > infectionWave - 0.3;
            nodes[i].recovered = threshold < infectionWave - 0.3;
        }

        // Draw edges (connections)
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 1; j <= connectionsPerNode; j++) {
                const target = (i + j) % nodes.length;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[target].x, nodes[target].y);
                ctx.stroke();
            }
        }
        ctx.restore();

        // Draw infection spread edges (red, pulsing)
        ctx.save();
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].infected) continue;
            for (let j = 1; j <= connectionsPerNode; j++) {
                const target = (i + j) % nodes.length;
                if (nodes[target].recovered) continue;
                ctx.globalAlpha = 0.3 + Math.sin(t * 4) * 0.2;
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[target].x, nodes[target].y);
                ctx.stroke();
            }
        }
        ctx.restore();

        // Draw nodes
        for (const node of nodes) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            if (node.infected) {
                ctx.fillStyle = '#ef4444';
                // Pulse effect
                ctx.save();
                ctx.globalAlpha = 0.3 + Math.sin(t * 5) * 0.2;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = '#fca5a5';
                ctx.fill();
                ctx.restore();
                ctx.beginPath();
                ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#ef4444';
            } else if (node.recovered) {
                ctx.fillStyle = '#3b82f6';
            } else {
                ctx.fillStyle = '#22c55e';
            }
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        // Legend
        const legendY = H * 0.54;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        // Green = healthy
        ctx.beginPath(); ctx.arc(safeRight * 0.15, legendY, 5, 0, Math.PI * 2); ctx.fillStyle = '#22c55e'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Healthy', safeRight * 0.15 + 10, legendY + 4);
        // Red = infected
        ctx.beginPath(); ctx.arc(safeRight * 0.38, legendY, 5, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Infected', safeRight * 0.38 + 10, legendY + 4);
        // Blue = recovered
        ctx.beginPath(); ctx.arc(safeRight * 0.62, legendY, 5, 0, Math.PI * 2); ctx.fillStyle = '#3b82f6'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Recovered', safeRight * 0.62 + 10, legendY + 4);

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.60);

        // === Animated feedback cycle (right-bottom) ===
        const cycleX = safeRight * 0.7;
        const cycleY = H * 0.78;
        const rX = Math.min(130, safeRight * 0.2);
        const rY = Math.min(60, H * 0.1);

        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cycleX, cycleY, rX, rY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        ctx.save();
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 1: ↓ Infected person contacts others', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Pathogen transmits →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Fewer susceptible remain', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ New infected repeat cycle', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = spreadPct / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#ef4444' : '#22c55e';
            ctx.beginPath();
            ctx.arc(px, py, sz, 0, Math.PI * 2);
            ctx.fill();
            const na = angle + 0.15;
            const dx = -rX * Math.sin(na);
            const dy = rY * Math.cos(na);
            const mag = Math.sqrt(dx * dx + dy * dy) || 1;
            ctx.beginPath();
            ctx.moveTo(px + (dx / mag) * 6, py + (dy / mag) * 6);
            ctx.lineTo(px - (dy / mag) * 2.5, py + (dx / mag) * 2.5);
            ctx.lineTo(px + (dy / mag) * 2.5, py - (dx / mag) * 2.5);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('Transmission Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 29 — P29 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Diseases Spread and Stop?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [contactRate, popDensity, r0, spreadPct, summary, phase]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = node.clientWidth;
            canvas.height = node.clientHeight;
            nodesRef.current = []; // reset positions on resize
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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[240px] shadow-md z-10">
                <label className="text-[13px] font-bold text-orange-600">Contact Rate: {contactRate}/day</label>
                <input className="w-full accent-orange-500 mb-1" type="range" min={0} max={100} value={contactRate}
                    onChange={e => { const v = Number(e.target.value); setContactRate(v); onStateChange('contactRate', v); }} />
                <label className="text-[13px] font-bold text-blue-600">Population Density: {popDensity}%</label>
                <input className="w-full accent-blue-500 mb-1" type="range" min={0} max={100} value={popDensity}
                    onChange={e => { const v = Number(e.target.value); setPopDensity(v); onStateChange('popDensity', v); }} />
                <p className="text-[11px] mt-1 font-semibold" style={{ color: r0 > 1 ? '#dc2626' : '#16a34a' }}>R₀ (derived): {r0.toFixed(1)} {r0 > 1 ? '⚠️ epidemic' : '✓ declining'}</p>
            </div>
        </div>
    );
};
