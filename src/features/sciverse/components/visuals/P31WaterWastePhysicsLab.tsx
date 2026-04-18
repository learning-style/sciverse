import { useCallback, useEffect, useRef, useState } from 'react';

interface P31WaterWastePhysicsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P31WaterWastePhysicsLab = ({ state, onStateChange }: P31WaterWastePhysicsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [sliderVal, setSliderVal] = useState(50);
    const [view, setView] = useState<'supply' | 'sewer'>('supply');
    const phase = (state.phase as string) || 'intro';

    /* ---- shared helpers ---- */
    const drawHouse = (ctx: CanvasRenderingContext2D, hx: number, gy: number) => {
        ctx.fillStyle = '#fef3c7';
        ctx.fillRect(hx - 14, gy - 22, 28, 22);
        ctx.strokeStyle = '#d97706'; ctx.lineWidth = 1.5;
        ctx.strokeRect(hx - 14, gy - 22, 28, 22);
        ctx.beginPath();
        ctx.moveTo(hx - 18, gy - 22); ctx.lineTo(hx, gy - 36); ctx.lineTo(hx + 18, gy - 22);
        ctx.closePath();
        ctx.fillStyle = '#f87171'; ctx.fill();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#92400e'; ctx.fillRect(hx - 4, gy - 14, 8, 14);
    };

    const txt = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, font: string, align: CanvasTextAlign = 'center') => {
        ctx.textAlign = align; ctx.font = font;
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = color; ctx.fillText(text, x, y);
    };

    const drawGauge = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, frac: number, lbl: string, valText: string, fillColor: string) => {
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath(); ctx.roundRect(x, y, w, 12, 4); ctx.fill();
        ctx.fillStyle = fillColor;
        ctx.beginPath(); ctx.roundRect(x, y, w * frac, 12, 4); ctx.fill();
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x, y, w, 12, 4); ctx.stroke();
        txt(ctx, lbl, x - 6, y + 10, '#334155', 'bold 11px monospace', 'right');
        txt(ctx, valText, x + w * frac / 2, y + 10, '#1e293b', 'bold 10px monospace');
    };

    /* ============ WATER SUPPLY VIEW ============ */
    const drawSupply = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        const sR = W - 285;
        const th = sliderVal / 100;

        ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, W, H);

        const groundY = H * 0.78;
        ctx.fillStyle = '#86efac'; ctx.fillRect(0, groundY, W, H - groundY);

        txt(ctx, 'Water Supply', sR / 2, 22, '#1e3a8a', 'bold 16px monospace');

        // Tower
        const tx = sR * 0.13;
        const tTop = groundY - 50 - th * (groundY - 100);
        const tW = 36, tH = 24;

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(tx - 12, tTop + tH, 6, groundY - tTop - tH);
        ctx.fillRect(tx + 6, tTop + tH, 6, groundY - tTop - tH);

        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
        const bc = Math.max(1, Math.floor((groundY - tTop) / 45));
        for (let i = 1; i <= bc; i++) {
            const by = tTop + tH + i * ((groundY - tTop - tH) / (bc + 1));
            ctx.beginPath(); ctx.moveTo(tx - 12, by); ctx.lineTo(tx + 12, by); ctx.stroke();
        }

        ctx.fillStyle = '#60a5fa';
        ctx.beginPath(); ctx.roundRect(tx - tW / 2, tTop, tW, tH, 4); ctx.fill();
        ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(tx - tW / 2, tTop, tW, tH, 4); ctx.stroke();

        txt(ctx, 'WATER TOWER', tx, tTop - 10, '#1e40af', 'bold 10px monospace');

        // Houses
        const hx = [sR * 0.45, sR * 0.60, sR * 0.75];
        for (const x of hx) {
            drawHouse(ctx, x, groundY);
            if (th > 0.1) {
                ctx.save(); ctx.globalAlpha = 0.5 + th * 0.4;
                ctx.fillStyle = '#60a5fa';
                ctx.fillRect(x + 16, groundY - 18, 1 + th * 3, 4 + th * 10);
                ctx.restore();
            }
        }

        // Pipe
        const pY = groundY + 14;
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(tx, groundY); ctx.lineTo(tx, pY); ctx.lineTo(hx[2], pY); ctx.stroke();
        for (const x of hx) { ctx.beginPath(); ctx.moveTo(x, pY); ctx.lineTo(x, groundY - 2); ctx.stroke(); }

        // Animated blue drops
        const sp = 0.5 + th * 2, cnt = Math.round(3 + th * 8);
        ctx.fillStyle = '#3b82f6';
        for (let i = 0; i < cnt; i++) {
            const p = ((t * sp * 0.1 + i * 0.12) % 1);
            ctx.globalAlpha = 0.6;
            ctx.beginPath(); ctx.arc(tx + p * (hx[2] - tx), pY, 2.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Gravity arrow
        const ax = tx + 28, aTop = tTop + tH + 6, aBot = groundY - 5;
        ctx.save();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(ax, aTop); ctx.lineTo(ax, aBot); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#dc2626';
        ctx.beginPath(); ctx.moveTo(ax, aBot + 4); ctx.lineTo(ax - 5, aBot - 4); ctx.lineTo(ax + 5, aBot - 4); ctx.closePath(); ctx.fill();
        ctx.restore();
        txt(ctx, 'GRAVITY', ax + 6, (aTop + aBot) / 2, '#dc2626', 'bold 9px monospace', 'left');

        // Gauge
        const gX = sR * 0.45, gW = sR * 0.45;
        const pushLbl = th > 0.6 ? 'Strong' : th > 0.3 ? 'Medium' : 'Weak';
        const pushClr = th > 0.6 ? '#2563eb' : th > 0.3 ? '#60a5fa' : '#bfdbfe';
        drawGauge(ctx, gX, 40, gW, th, 'Water Push:', pushLbl, pushClr);

        const msg = th > 0.6 ? 'Tall tower -- strong push reaches every house!'
            : th > 0.3 ? 'Medium height -- decent flow to nearby houses.'
            : 'Short tower -- barely a trickle at the faucets.';
        txt(ctx, msg, sR / 2, 68, '#334155', 'bold 12px monospace');
    };

    /* ============ SEWER VIEW ============ */
    const drawSewer = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        const sR = W - 285;
        const th = sliderVal / 100;

        ctx.fillStyle = '#fef9f0'; ctx.fillRect(0, 0, W, H);
        txt(ctx, 'Sewer System', sR / 2, 22, '#78350f', 'bold 16px monospace');

        // Sloped terrain: houses sit high-left, plant sits low-right
        const hillY = H * 0.45;
        const valleyY = H * 0.72 + th * (H * 0.08);

        ctx.fillStyle = '#86efac';
        ctx.beginPath();
        ctx.moveTo(0, hillY); ctx.lineTo(sR, valleyY); ctx.lineTo(sR, H); ctx.lineTo(0, H);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, hillY); ctx.lineTo(sR, valleyY); ctx.stroke();

        const yAt = (x: number) => hillY + (x / sR) * (valleyY - hillY);

        // Houses on the hill
        const hx = [sR * 0.10, sR * 0.25, sR * 0.40];
        for (const x of hx) drawHouse(ctx, x, yAt(x));

        // Treatment plant on right (low ground)
        const px = sR * 0.78;
        const pGnd = yAt(px);
        const pW = 60, pH = 36;

        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(px - pW / 2, pGnd - pH, pW, pH);
        ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 2;
        ctx.strokeRect(px - pW / 2, pGnd - pH, pW, pH);
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(px + 10, pGnd - pH - 18, 8, 18);

        // Clarifier circle
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath(); ctx.arc(px, pGnd - pH / 2, 12, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.5; ctx.stroke();

        txt(ctx, 'TREATMENT', px, pGnd - pH - 22, '#374151', 'bold 9px monospace');
        txt(ctx, 'PLANT', px, pGnd - pH - 12, '#374151', 'bold 9px monospace');

        // Sewer pipe underground, slopes from first house to plant
        const pipeD = 14;
        const psX = hx[0], peX = px;
        const psY = yAt(psX) + pipeD, peY = yAt(peX) + pipeD;

        ctx.strokeStyle = '#78350f'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(psX, psY); ctx.lineTo(peX, peY); ctx.stroke();

        // House drains
        for (const x of hx) {
            ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(x, yAt(x)); ctx.lineTo(x, yAt(x) + pipeD); ctx.stroke();
        }

        txt(ctx, 'SEWER PIPE (slopes downhill)', (hx[1] + hx[2]) / 2, psY + (peY - psY) * 0.35 + 20, '#78350f', 'bold 9px monospace');

        // Animated brown drops
        const sp = 0.3 + th * 1.5, cnt = Math.round(4 + th * 6);
        for (let i = 0; i < cnt; i++) {
            const p = ((t * sp * 0.08 + i * 0.1) % 1);
            ctx.fillStyle = '#a16207'; ctx.globalAlpha = 0.6;
            ctx.beginPath(); ctx.arc(psX + p * (peX - psX), psY + p * (peY - psY), 2.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Gravity arrow along slope
        const asx = sR * 0.48, aex = sR * 0.66;
        const asy = yAt(asx) - 22, aey = yAt(aex) - 22;
        ctx.save();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(asx, asy); ctx.lineTo(aex, aey); ctx.stroke();
        ctx.setLineDash([]);
        const ang = Math.atan2(aey - asy, aex - asx);
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(aex + Math.cos(ang) * 6, aey + Math.sin(ang) * 6);
        ctx.lineTo(aex + Math.cos(ang + 2.5) * 8, aey + Math.sin(ang + 2.5) * 8);
        ctx.lineTo(aex + Math.cos(ang - 2.5) * 8, aey + Math.sin(ang - 2.5) * 8);
        ctx.closePath(); ctx.fill();
        ctx.restore();
        txt(ctx, 'GRAVITY', (asx + aex) / 2, asy - 10, '#dc2626', 'bold 10px monospace');

        // Gauge
        const gX = sR * 0.35, gW = sR * 0.45;
        const slopeLbl = th > 0.6 ? 'Steep' : th > 0.3 ? 'Medium' : 'Gentle';
        const slopeClr = th > 0.6 ? '#a16207' : th > 0.3 ? '#d97706' : '#fde68a';
        drawGauge(ctx, gX, 40, gW, th, 'Pipe Slope:', slopeLbl, slopeClr);

        const msg = th > 0.6 ? 'Steep slope -- waste flows fast to the plant!'
            : th > 0.3 ? 'Medium slope -- steady flow downhill.'
            : 'Gentle slope -- waste barely trickles. Risk of blockage!';
        txt(ctx, msg, sR / 2, 68, '#334155', 'bold 12px monospace');
    };

    /* ============ MAIN DRAW LOOP ============ */
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        tRef.current += 0.016;

        if (view === 'supply') drawSupply(ctx, canvas.width, canvas.height, tRef.current);
        else drawSewer(ctx, canvas.width, canvas.height, tRef.current);

        if (phase === 'complete') {
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText('P31 Complete -- Downhill Flow!', canvas.width / 2, canvas.height / 2 - 14);
            ctx.font = '16px sans-serif';
            ctx.fillText('How Do Cities Move Water and Waste?', canvas.width / 2, canvas.height / 2 + 16);
            ctx.restore();
        }

        animRef.current = requestAnimationFrame(draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliderVal, phase, view]);

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

    const sliderLabel = view === 'supply' ? 'Tower Height' : 'Pipe Slope';

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />

            {/* View toggle */}
            <div className="absolute right-[290px] top-2 flex rounded-lg overflow-hidden border border-slate-300 shadow-sm z-20">
                <button
                    className={`px-3 py-1 text-[12px] font-bold ${view === 'supply' ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    onClick={() => setView('supply')}
                >Water Supply</button>
                <button
                    className={`px-3 py-1 text-[12px] font-bold ${view === 'sewer' ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    onClick={() => setView('sewer')}
                >Sewer</button>
            </div>

            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[210px] shadow-md z-10">
                <label className="text-[13px] font-bold text-indigo-600">{sliderLabel}: {sliderVal}%</label>
                <input className="w-full accent-indigo-500" type="range" min={5} max={100} value={sliderVal}
                    onChange={e => { const v = Number(e.target.value); setSliderVal(v); onStateChange('towerHeight', v); }} />
            </div>
        </div>
    );
};
