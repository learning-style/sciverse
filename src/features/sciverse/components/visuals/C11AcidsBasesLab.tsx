import { useRef, useEffect, useCallback, useState } from 'react';

interface C11AcidsBasesLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const SUBSTANCES = [
    { name: 'Battery Acid',  pH: 0.5,  color: '#ef4444' },
    { name: 'Stomach Acid',  pH: 2.0,  color: '#f97316' },
    { name: 'Lemon Juice',   pH: 2.5,  color: '#eab308' },
    { name: 'Vinegar',       pH: 3.0,  color: '#ca8a04' },
    { name: 'Coffee',        pH: 5.0,  color: '#92400e' },
    { name: 'Rain Water',    pH: 5.6,  color: '#60a5fa' },
    { name: 'Pure Water',    pH: 7.0,  color: '#3b82f6' },
    { name: 'Blood',         pH: 7.4,  color: '#a855f7' },
    { name: 'Baking Soda',   pH: 9.0,  color: '#22d3ee' },
    { name: 'Milk of Mag',   pH: 10.5, color: '#34d399' },
    { name: 'Bleach',        pH: 12.5, color: '#86efac' },
    { name: 'Drain Cleaner', pH: 14.0, color: '#f0fdf4' },
];

function pHtoColor(pH: number): string {
    // Universal indicator: red(0) → orange → yellow → green(7) → blue → violet(14)
    if (pH < 1) return '#dc2626';
    if (pH < 3) return `hsl(${pH * 12},100%,50%)`;      // red→orange
    if (pH < 5) return `hsl(${36 + (pH-3)*12},100%,50%)`;  // orange→yellow
    if (pH < 7) return `hsl(${60 + (pH-5)*30},100%,40%)`; // yellow→green
    if (pH < 9) return `hsl(${120 + (pH-7)*30},80%,40%)`; // green→cyan-blue
    if (pH < 12) return `hsl(${180 + (pH-9)*20},80%,45%)`; // blue→indigo
    return `hsl(${240+(pH-12)*8},70%,50%)`;               // indigo→violet
}

export const C11AcidsBasesLab = ({ state, onStateChange }: C11AcidsBasesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const [currentPH, setCurrentPH] = useState(7.0);
    const [selectedSubstance, setSelectedSubstance] = useState<string>('Pure Water');

    const phase = (state.phase as string) || 'intro';
    const showSubstances = (state.showSubstances as boolean) || false;
    const showIndicator = (state.showIndicator as boolean) || false;
    const showBloodPH = (state.showBloodPH as boolean) || false;

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('pH Scale Lab', W / 2, 26);

        // ─── pH Scale Bar ───
        const barX = 20, barY = 44, barW = W - 40, barH = 28;
        const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
        grad.addColorStop(0, '#dc2626');
        grad.addColorStop(0.2, '#f97316');
        grad.addColorStop(0.35, '#eab308');
        grad.addColorStop(0.5, '#22c55e');
        grad.addColorStop(0.65, '#06b6d4');
        grad.addColorStop(0.8, '#3b82f6');
        grad.addColorStop(1, '#a855f7');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, barH, 8);
        ctx.fill();

        // pH number ticks
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 14; i++) {
            const x = barX + (i / 14) * barW;
            ctx.fillText(String(i), x, barY + barH + 12);
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.fillRect(x - 0.5, barY + barH - 4, 1, 4);
            ctx.fillStyle = '#1e293b';
        }

        // Acid / Base labels
        ctx.fillStyle = '#fca5a5';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('◄ ACID', barX, barY - 4);
        ctx.fillStyle = '#a5b4fc';
        ctx.textAlign = 'right';
        ctx.fillText('BASE ►', barX + barW, barY - 4);
        ctx.fillStyle = '#86efac';
        ctx.textAlign = 'center';
        ctx.fillText('NEUTRAL', barX + barW / 2, barY - 4);

        // Current pH indicator needle
        const phX = barX + (currentPH / 14) * barW;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(phX, barY - 2);
        ctx.lineTo(phX - 7, barY - 16);
        ctx.lineTo(phX + 7, barY - 16);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(currentPH.toFixed(1), phX, barY - 18);

        // ─── Indicator Beaker ───
        const bx = W * 0.5, by = H * 0.56, bw = 70, bh = 80;
        const indicatorColor = pHtoColor(currentPH);

        // Beaker outline
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx - bw / 2, by - bh / 2);
        ctx.lineTo(bx - bw / 2, by + bh / 2);
        ctx.lineTo(bx + bw / 2, by + bh / 2);
        ctx.lineTo(bx + bw / 2, by - bh / 2);
        ctx.stroke();

        // Liquid fill
        ctx.fillStyle = indicatorColor;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(bx - bw / 2 + 2, by, bw - 4, bh / 2 - 2);
        ctx.globalAlpha = 1;

        // Liquid label
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`pH ${currentPH.toFixed(1)}`, bx, by + bh / 2 + 16);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(selectedSubstance, bx, by + bh / 2 + 28);

        // ─── Substance list (when enabled) ───
        if (showSubstances) {
            const cols = 2;
            const itemH = 14;
            const startX = 10;
            const startY = H * 0.73;
            ctx.font = '9px monospace';
            SUBSTANCES.forEach((s, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const sx = startX + col * (W / cols);
                const sy = startY + row * itemH;
                ctx.fillStyle = s.name === selectedSubstance ? '#f1f5f9' : '#64748b';
                ctx.textAlign = 'left';
                ctx.fillText(`${s.name} (pH ${s.pH})`, sx, sy);
            });
        }

        // ─── Blood pH Safety zone ───
        if (showBloodPH) {
            const safeX1 = barX + (7.35 / 14) * barW;
            const safeX2 = barX + (7.45 / 14) * barW;
            ctx.fillStyle = 'rgba(168,85,247,0.3)';
            ctx.fillRect(safeX1, barY, safeX2 - safeX1, barH);
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(safeX1, barY, safeX2 - safeX1, barH);
            ctx.fillStyle = '#c084fc';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Blood', (safeX1 + safeX2) / 2, barY - 6);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [currentPH, selectedSubstance, phase, showSubstances, showIndicator, showBloodPH]);

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

            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[200px] max-h-[55%] overflow-y-auto">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>

                <label className="text-slate-300 text-xs font-semibold">
                    pH Level: <span className="text-emerald-400">{currentPH.toFixed(1)}</span>
                </label>
                <input type="range" min={0} max={14} step={0.1} value={currentPH}
                    onChange={e => { setCurrentPH(Number(e.target.value)); onStateChange('pH', Number(e.target.value)); }}
                    className="w-full accent-emerald-500" />

                <div className="text-slate-400 text-xs font-semibold mt-1">Substances:</div>
                <div className="grid grid-cols-1 gap-0.5 max-h-36 overflow-y-auto">
                    {SUBSTANCES.map(s => (
                        <button key={s.name}
                            className={`text-left text-xs px-2 py-0.5 rounded transition-colors ${selectedSubstance === s.name ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                            onClick={() => { setSelectedSubstance(s.name); setCurrentPH(s.pH); onStateChange('selectedSubstance', s.name); }}>
                            {s.name} (pH {s.pH})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
