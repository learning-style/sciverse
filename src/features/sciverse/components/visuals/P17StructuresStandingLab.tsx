import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P17StructuresStandingLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P17StructuresStandingLab = ({ onStateChange }: P17StructuresStandingLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [baseWidth, setBaseWidth] = useState(50);
    const [load, setLoad] = useState(45);
    const [bracing, setBracing] = useState(60);

    const stability = useMemo(() => {
        const raw = baseWidth * 0.45 + bracing * 0.45 - load * 0.55 + 35;
        return Math.max(0, Math.min(100, Math.round(raw)));
    }, [baseWidth, bracing, load]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Ground
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(0, H * 0.82, W, H * 0.18);

        const cx = W * 0.5;
        const groundY = H * 0.82;
        const halfBase = (baseWidth / 100) * W * 0.32;
        const topY = groundY - H * 0.52;
        const midY = (groundY + topY) / 2;

        // Wobble from instability
        const wobble = Math.sin(t * 3) * (100 - stability) * 0.04;

        // Vertical pillars
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - halfBase + wobble, groundY);
        ctx.lineTo(cx - halfBase * 0.4 + wobble, topY);
        ctx.moveTo(cx + halfBase + wobble, groundY);
        ctx.lineTo(cx + halfBase * 0.4 + wobble, topY);
        ctx.stroke();

        // Top beam
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - halfBase * 0.4 + wobble, topY);
        ctx.lineTo(cx + halfBase * 0.4 + wobble, topY);
        ctx.stroke();

        // Base beam
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - halfBase + wobble, groundY);
        ctx.lineTo(cx + halfBase + wobble, groundY);
        ctx.stroke();

        // Bracing diagonals – more members appear as bracing increases
        const braceFrac = bracing / 100;
        const braceColor = '#6366f1';
        const braceWidth = 2.5;

        // Level 1 (bracing >= 15): single horizontal mid-beam
        if (braceFrac >= 0.15) {
            ctx.strokeStyle = braceColor;
            ctx.lineWidth = braceWidth;
            ctx.setLineDash([]);
            ctx.beginPath();
            const mLeft = cx - halfBase * 0.7 + wobble;
            const mRight = cx + halfBase * 0.7 + wobble;
            ctx.moveTo(mLeft, midY);
            ctx.lineTo(mRight, midY);
            ctx.stroke();
        }

        // Level 2 (bracing >= 30): bottom X-brace (ground to mid)
        if (braceFrac >= 0.30) {
            ctx.strokeStyle = braceColor;
            ctx.lineWidth = braceWidth;
            ctx.beginPath();
            ctx.moveTo(cx - halfBase + wobble, groundY);
            ctx.lineTo(cx + halfBase * 0.4 + wobble, midY);
            ctx.moveTo(cx + halfBase + wobble, groundY);
            ctx.lineTo(cx - halfBase * 0.4 + wobble, midY);
            ctx.stroke();
        }

        // Level 3 (bracing >= 55): top X-brace (mid to top)
        if (braceFrac >= 0.55) {
            ctx.strokeStyle = braceColor;
            ctx.lineWidth = braceWidth;
            ctx.beginPath();
            ctx.moveTo(cx - halfBase * 0.7 + wobble, midY);
            ctx.lineTo(cx + halfBase * 0.4 + wobble, topY);
            ctx.moveTo(cx + halfBase * 0.7 + wobble, midY);
            ctx.lineTo(cx - halfBase * 0.4 + wobble, topY);
            ctx.stroke();
        }

        // Level 4 (bracing >= 75): extra lateral member at quarter-height
        if (braceFrac >= 0.75) {
            const qY = midY + (groundY - midY) * 0.5;
            ctx.strokeStyle = braceColor;
            ctx.lineWidth = braceWidth;
            ctx.beginPath();
            const qLeft = cx - halfBase * 0.85 + wobble;
            const qRight = cx + halfBase * 0.85 + wobble;
            ctx.moveTo(qLeft, qY);
            ctx.lineTo(qRight, qY);
            ctx.stroke();
        }

        // Faint mid beam if no bracing high enough to show it
        if (braceFrac < 0.15) {
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            const mLeft = cx - halfBase * 0.7 + wobble;
            const mRight = cx + halfBase * 0.7 + wobble;
            ctx.moveTo(mLeft, midY);
            ctx.lineTo(mRight, midY);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Load arrows
        const loadFrac = load / 100;
        const arrowCount = Math.max(1, Math.round(loadFrac * 5));
        for (let i = 0; i < arrowCount; i++) {
            const ax = cx - halfBase * 0.3 + (halfBase * 0.6 / Math.max(1, arrowCount - 1)) * i + wobble;
            const ay = topY - 16 - Math.sin(t * 4 + i) * 3;
            const aLen = 10 + loadFrac * 18;
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax, ay + aLen);
            ctx.lineTo(ax - 4, ay + aLen - 6);
            ctx.moveTo(ax, ay + aLen);
            ctx.lineTo(ax + 4, ay + aLen - 6);
            ctx.stroke();
        }

        // Stress visualization at joints
        if (stability < 60) {
            const stressAlpha = (60 - stability) / 60;
            ctx.fillStyle = `rgba(239,68,68,${stressAlpha * 0.4 + Math.sin(t * 5) * 0.1})`;
            [{ x: cx - halfBase * 0.4 + wobble, y: topY }, { x: cx + halfBase * 0.4 + wobble, y: topY }].forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 6 + stressAlpha * 8, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Stability ${stability}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = stability >= 60 ? '#15803d' : '#dc2626';
        ctx.fillText(stability >= 60 ? 'structure: stable' : 'structure: at risk', 14, 38);

        animRef.current = requestAnimationFrame(draw);
    }, [baseWidth, load, bracing, stability]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[180px] shadow-md">
                <label className="text-[10px] text-slate-600">Base Width: {baseWidth}</label>
                <input className="w-full accent-indigo-500" type="range" min={10} max={100} value={baseWidth}
                    onChange={e => { const v = Number(e.target.value); setBaseWidth(v); onStateChange('baseWidth', v); }} />
                <label className="text-[10px] text-slate-600">Load: {load}</label>
                <input className="w-full accent-rose-500" type="range" min={10} max={100} value={load}
                    onChange={e => { const v = Number(e.target.value); setLoad(v); onStateChange('load', v); }} />
                <label className="text-[10px] text-slate-600">Bracing Members: {bracing}%</label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={bracing}
                    onChange={e => { const v = Number(e.target.value); setBracing(v); onStateChange('bracing', v); }} />
            </div>
        </div>
    );
};