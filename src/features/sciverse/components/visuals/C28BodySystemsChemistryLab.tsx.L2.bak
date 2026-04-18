import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C28BodySystemsChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C28BodySystemsChemistryLab = ({ state, onStateChange }: C28BodySystemsChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [signalConcentration, setSignalConcentration] = useState(50);
    const [receptorSensitivity, setReceptorSensitivity] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Response strength derived from concentration × sensitivity
    const responseStrength = useMemo(() => {
        return Math.round((signalConcentration / 100) * (receptorSensitivity / 100) * 100);
    }, [signalConcentration, receptorSensitivity]);

    const summary = useMemo(() => {
        if (responseStrength > 80) return 'Strong cellular response!';
        if (responseStrength > 50) return 'Moderate signaling activity.';
        if (responseStrength > 20) return 'Weak signal — partial response.';
        return 'Minimal response — signal too weak.';
    }, [responseStrength]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#f0fdf4';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Variable readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#ea580c';
        ctx.fillText('SIGNAL', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#9a3412';
        ctx.fillText(signalConcentration + '%', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#16a34a';
        ctx.fillText('RECEPTORS', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#166534';
        ctx.fillText(receptorSensitivity + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#9333ea';
        ctx.fillText('RESPONSE', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#581c87';
        ctx.fillText(responseStrength + '%', col3, H * 0.14);

        // Response bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Cellular Response: ' + responseStrength + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = responseStrength > 70 ? '#22c55e' : responseStrength > 35 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * responseStrength / 100, 14);

        // === Hormone molecules (left) — floating signal molecules ===
        const molX = safeRight * 0.18;
        const molY = H * 0.42;
        const sigNorm = signalConcentration / 100;
        const molCount = Math.round(3 + sigNorm * 10);

        ctx.save();
        ctx.globalAlpha = 0.4 + sigNorm * 0.5;
        for (let i = 0; i < molCount; i++) {
            const mx = molX + Math.sin(t * 0.8 + i * 1.7) * 30;
            const my = molY + Math.cos(t * 0.6 + i * 2.3) * 20;
            // Molecule: circle with a triangle key region
            ctx.beginPath();
            ctx.arc(mx, my, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#f97316';
            ctx.fill();
            ctx.strokeStyle = '#9a3412';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // Key protrusion
            ctx.beginPath();
            ctx.moveTo(mx + 6, my - 3);
            ctx.lineTo(mx + 12, my);
            ctx.lineTo(mx + 6, my + 3);
            ctx.closePath();
            ctx.fillStyle = '#fb923c';
            ctx.fill();
        }
        ctx.restore();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Hormones', molX, molY + 40);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText(signalConcentration + '% conc.', molX, molY + 54);

        // === Receptor cell (center) — lock-and-key binding ===
        const cellX = safeRight * 0.5;
        const cellY = H * 0.42;
        const recNorm = receptorSensitivity / 100;
        const receptorCount = Math.round(2 + recNorm * 6);

        ctx.save();
        ctx.globalAlpha = 0.5 + recNorm * 0.4;
        // Cell body
        ctx.beginPath();
        ctx.arc(cellX, cellY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#dcfce7';
        ctx.fill();
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // Receptors on cell surface
        for (let i = 0; i < receptorCount; i++) {
            const angle = (i / receptorCount) * Math.PI * 2 - Math.PI / 2;
            const rx = cellX + Math.cos(angle) * 30;
            const ry = cellY + Math.sin(angle) * 30;
            // Receptor lock shape
            ctx.beginPath();
            ctx.arc(rx + Math.cos(angle) * 8, ry + Math.sin(angle) * 8, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
            ctx.strokeStyle = '#166534';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // Notch in receptor (keyhole)
            ctx.beginPath();
            ctx.moveTo(rx + Math.cos(angle) * 8 - 3, ry + Math.sin(angle) * 8);
            ctx.lineTo(rx + Math.cos(angle) * 8 + 3, ry + Math.sin(angle) * 8);
            ctx.strokeStyle = '#166534';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        // Binding event animation
        if (responseStrength > 30) {
            const bindCount = Math.round(responseStrength / 25);
            for (let i = 0; i < bindCount; i++) {
                const angle = (i / bindCount) * Math.PI * 2;
                const bx = cellX + Math.cos(angle) * 42;
                const by = cellY + Math.sin(angle) * 42;
                const flash = 0.5 + Math.sin(t * 3 + i * 1.5) * 0.5;
                ctx.globalAlpha = flash * 0.8;
                ctx.beginPath();
                ctx.arc(bx, by, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#fbbf24';
                ctx.fill();
            }
        }
        ctx.restore();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Target Cell', cellX, cellY + 48);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText(receptorCount + ' receptors', cellX, cellY + 62);

        // === Response indicator (right) — glowing activation ring ===
        const respX = safeRight * 0.82;
        const respY = H * 0.42;
        const respNorm = responseStrength / 100;

        ctx.save();
        ctx.globalAlpha = 0.3 + respNorm * 0.6;
        // Outer glow
        const glowR = 20 + respNorm * 15;
        const gradient = ctx.createRadialGradient(respX, respY, 0, respX, respY, glowR);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
        gradient.addColorStop(0.6, 'rgba(168, 85, 247, 0.2)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(respX, respY, glowR, 0, Math.PI * 2);
        ctx.fill();
        // Inner activation circle
        ctx.beginPath();
        ctx.arc(respX, respY, 18, 0, Math.PI * 2);
        ctx.fillStyle = respNorm > 0.6 ? '#a855f7' : respNorm > 0.3 ? '#c084fc' : '#e9d5ff';
        ctx.fill();
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // Activation sparks
        if (respNorm > 0.4) {
            const sparkCount = Math.round(respNorm * 6);
            for (let i = 0; i < sparkCount; i++) {
                const angle = t * 2 + i * Math.PI * 2 / sparkCount;
                const sr = 22 + Math.sin(t * 4 + i) * 5;
                const sx = respX + Math.cos(angle) * sr;
                const sy = respY + Math.sin(angle) * sr;
                ctx.beginPath();
                ctx.arc(sx, sy, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#fbbf24';
                ctx.fill();
            }
        }
        // Text inside
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(responseStrength + '%', respX, respY + 4);
        ctx.restore();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Response', respX, respY + 40);

        // Arrow: molecules → cell
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(molX + 40, molY);
        ctx.lineTo(cellX - 35, cellY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(cellX - 35, cellY - 5);
        ctx.lineTo(cellX - 27, cellY);
        ctx.lineTo(cellX - 35, cellY + 5);
        ctx.fill();
        ctx.restore();

        // Arrow: cell → response
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(cellX + 35, cellY);
        ctx.lineTo(respX - 25, respY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(respX - 25, respY - 5);
        ctx.lineTo(respX - 17, respY);
        ctx.lineTo(respX - 25, respY + 5);
        ctx.fill();
        ctx.restore();

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
        ctx.fillText('Step 1: ↓ Gland releases hormone', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Receptors bind signal →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Feedback inhibits gland', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Cell response triggers effect', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = responseStrength / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#f97316' : '#22c55e';
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
        ctx.fillText('Signal–Response Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 28 — C28 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Body Systems Work Together?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [signalConcentration, receptorSensitivity, responseStrength, summary, phase]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[240px] shadow-md z-10">
                <label className="text-[13px] font-bold text-orange-600">Signal Concentration: {signalConcentration}%</label>
                <input className="w-full accent-orange-500 mb-1" type="range" min={0} max={100} value={signalConcentration}
                    onChange={e => { const v = Number(e.target.value); setSignalConcentration(v); onStateChange('signalConcentration', v); }} />
                <label className="text-[13px] font-bold text-green-600">Receptor Sensitivity: {receptorSensitivity}%</label>
                <input className="w-full accent-green-500 mb-1" type="range" min={0} max={100} value={receptorSensitivity}
                    onChange={e => { const v = Number(e.target.value); setReceptorSensitivity(v); onStateChange('receptorSensitivity', v); }} />
                <p className="text-[11px] text-purple-500 mt-1 font-semibold">Response Strength (derived): {responseStrength}%</p>
            </div>
        </div>
    );
};
