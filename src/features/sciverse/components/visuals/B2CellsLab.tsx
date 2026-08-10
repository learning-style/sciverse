import { useRef, useEffect, useCallback } from 'react';

interface B2CellsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B2CellsLab = ({ state, onStateChange }: B2CellsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    const zoomLevel = (state.zoomLevel as number) || 1;
    const showLabels = (state.showLabels as boolean) || false;
    const highlightOrganelle = (state.highlightOrganelle as string) || '';
    const phase = (state.phase as string) || 'intro';
    const pulseRef = useRef(0);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        pulseRef.current += 0.03;
        const pulse = Math.sin(pulseRef.current) * 0.5 + 0.5;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Zooming Into Your Skin', W / 2, 28);

        const cx = W / 2, cy = H / 2;

        if (zoomLevel < 500) {
            // Skin surface view
            ctx.fillStyle = '#fde68a';
            ctx.fillRect(cx - 150, cy - 100, 300, 200);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.strokeRect(cx - 150, cy - 100, 300, 200);
            // Skin texture lines
            ctx.strokeStyle = 'rgba(245,158,11,0.3)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.moveTo(cx - 140 + i * 40, cy - 90);
                ctx.quadraticCurveTo(cx - 120 + i * 40, cy, cx - 140 + i * 40, cy + 90);
                ctx.stroke();
            }
            ctx.fillStyle = '#92400e';
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Skin surface (1x zoom)', cx, cy + 130);

            // Zoom hint circle
            if (zoomLevel > 1) {
                const zf = Math.min(zoomLevel / 500, 1);
                ctx.strokeStyle = `rgba(59,130,246,${0.5 + pulse * 0.5})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx, cy, 40 + zf * 30, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#3b82f6';
                ctx.font = '17px monospace';
                ctx.fillText('🔬 Zooming...', cx, cy - 50 - zf * 20);
            }
        } else if (zoomLevel < 5000) {
            // Cell grid view
            const cols = 5, rows = 4, cellW = 55, cellH = 45;
            const startX = cx - (cols * cellW) / 2;
            const startY = cy - (rows * cellH) / 2;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = startX + c * cellW;
                    const y = startY + r * cellH;
                    ctx.fillStyle = `rgba(254,215,170,${0.6 + Math.random() * 0.2})`;
                    ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
                    ctx.strokeStyle = '#f97316';
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2);
                    // Nucleus dot
                    ctx.fillStyle = '#7c3aed';
                    ctx.beginPath();
                    ctx.arc(x + cellW / 2, y + cellH / 2, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.fillStyle = '#92400e';
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Cell grid (1000x zoom) – Each box is ONE cell!', cx, startY + rows * cellH + 25);
        } else {
            // Single cell interior
            const cellR = Math.min(W, H) * 0.32;

            // Cell membrane
            ctx.beginPath();
            ctx.arc(cx, cy, cellR, 0, Math.PI * 2);
            ctx.fillStyle = '#fff7ed';
            ctx.fill();
            ctx.strokeStyle = highlightOrganelle === 'membrane' ? '#f97316' : '#fdba74';
            ctx.lineWidth = highlightOrganelle === 'membrane' ? 5 : 3;
            ctx.stroke();
            // Membrane bumps
            for (let a = 0; a < Math.PI * 2; a += 0.4) {
                ctx.beginPath();
                ctx.arc(cx + Math.cos(a) * cellR, cy + Math.sin(a) * cellR, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#fb923c';
                ctx.fill();
            }

            // Nucleus
            const nR = cellR * 0.3;
            ctx.beginPath();
            ctx.arc(cx - 10, cy - 10, nR, 0, Math.PI * 2);
            ctx.fillStyle = highlightOrganelle === 'nucleus' ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.15)';
            ctx.fill();
            ctx.strokeStyle = highlightOrganelle === 'nucleus' ? '#7c3aed' : '#a78bfa';
            ctx.lineWidth = highlightOrganelle === 'nucleus' ? 4 : 2;
            ctx.stroke();
            // DNA squiggles inside
            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 1;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(cx - 10 + (i - 1) * 12, cy - 10, nR * 0.4, 0, Math.PI);
                ctx.stroke();
            }

            // Mitochondria
            const mitoPositions = [{ x: cx + cellR * 0.4, y: cy + cellR * 0.3 }, { x: cx + cellR * 0.2, y: cy - cellR * 0.4 }, { x: cx - cellR * 0.45, y: cy + cellR * 0.35 }];
            for (const mp of mitoPositions) {
                ctx.beginPath();
                ctx.ellipse(mp.x, mp.y, 22, 10, Math.random() * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = highlightOrganelle === 'mitochondria' ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.15)';
                ctx.fill();
                ctx.strokeStyle = highlightOrganelle === 'mitochondria' ? '#ef4444' : '#fca5a5';
                ctx.lineWidth = highlightOrganelle === 'mitochondria' ? 3 : 1.5;
                ctx.stroke();
                // Inner membrane fold
                ctx.strokeStyle = '#fca5a5';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(mp.x - 15, mp.y);
                ctx.quadraticCurveTo(mp.x, mp.y - 6, mp.x + 15, mp.y);
                ctx.stroke();
            }

            // Labels
            if (showLabels) {
                const labels: [number, number, string, string][] = [
                    [cx - 10, cy - 10 - nR - 10, '🧬 Nucleus', '"The Brain"'],
                    [mitoPositions[0].x, mitoPositions[0].y - 18, '⚡ Mitochondria', '"Power Plant"'],
                    [cx + cellR + 10, cy, '🛡️ Membrane', '"Security Gate"'],
                ];
                for (const [lx, ly, name, role] of labels) {
                    ctx.fillStyle = '#1e293b';
                    ctx.font = 'bold 18px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText(name, lx, ly);
                    ctx.fillStyle = '#64748b';
                    ctx.font = '17px monospace';
                    ctx.fillText(role, lx, ly + 14);
                }
            }

            ctx.fillStyle = '#92400e';
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Inside ONE cell (10,000x zoom)', cx, cy + cellR + 30);
        }

        // Zoom indicator
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`🔬 Zoom: ${zoomLevel.toLocaleString()}x`, 20, H - 20);

        // Big Idea 2 Complete banner
        if (phase === 'complete') {
            const bannerY = H * 0.62;
            const bannerH = H * 0.36;
            ctx.fillStyle = 'rgba(0,0,0,0.65)';
            ctx.fillRect(W * 0.1, bannerY, W * 0.8, bannerH);
            ctx.strokeStyle = 'rgba(34,197,94,0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(W * 0.1, bannerY, W * 0.8, bannerH);
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 2 Complete!', W / 2, bannerY + 25);
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.font = '15px monospace';
            ctx.fillText('P2: States of Matter (solid/liquid/gas)', W / 2, bannerY + 50);
            ctx.fillText('C2: Atoms & Molecules (nature\'s LEGO)', W / 2, bannerY + 68);
            ctx.fillText('B2: Cells — The Tiny Factories', W / 2, bannerY + 86);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.fillText('Everything is made of tiny building blocks! 🧬', W / 2, bannerY + 112);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [zoomLevel, showLabels, highlightOrganelle, phase]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    useEffect(() => {
        const resize = () => {
            const c = canvasRef.current, ct = containerRef.current;
            if (!c || !ct) return;
            c.width = ct.clientWidth;
            c.height = ct.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Zoom slider visible when allowed
    const showZoom = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showZoom && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">Zoom</span>
                    <input type="range" min={1} max={10000} value={zoomLevel} onChange={e => onStateChange?.('zoomLevel', Number(e.target.value))} className="w-48 h-2 accent-orange-500 cursor-pointer" />
                    <span className="text-sm font-bold text-orange-600 min-w-[70px] text-right">{zoomLevel.toLocaleString()}x</span>
                </div>
            )}
        </div>
    );
};

