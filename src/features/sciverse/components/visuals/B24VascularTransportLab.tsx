import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B24VascularTransportLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B24VascularTransportLab = ({ state, onStateChange }: B24VascularTransportLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [transpiration, setTranspiration] = useState(60);
    const [stomata, setStomata] = useState(65);
    const phase = (state.phase as string) || 'intro';

    const transportEfficiency = useMemo(() => Math.max(0, Math.min(100, Math.round(transpiration * 0.5 + stomata * 0.45))), [transpiration, stomata]);

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

        const cx = W * 0.5;
        const transFrac = transpiration / 100;
        const stomFrac = stomata / 100;
        const effFrac = transportEfficiency / 100;

        // Plant stem (vertical tube)
        const stemW = W * 0.08;
        const stemTop = H * 0.12;
        const stemBottom = H * 0.82;

        ctx.fillStyle = '#86efac';
        ctx.fillRect(cx - stemW / 2, stemTop, stemW, stemBottom - stemTop);
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - stemW / 2, stemTop, stemW, stemBottom - stemTop);
        // Label stem (after variables are defined)
        ctx.save();
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = '#166534';
        ctx.textAlign = 'left';
        ctx.fillText('Stem', cx - stemW / 2 - 38, (stemTop + stemBottom) / 2);
        ctx.restore();

        // Xylem tubes inside stem
        const tubeCount = 3;
        for (let i = 0; i < tubeCount; i++) {
            const tx = cx - stemW * 0.3 + (stemW * 0.6 / (tubeCount - 1)) * i;
            ctx.strokeStyle = 'rgba(59,130,246,0.7)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(tx, stemTop + 4);
            ctx.lineTo(tx, stemBottom - 4);
            ctx.stroke();
            // Label xylem (leftmost tube only)
            if (i === 0) {
                ctx.save();
                ctx.font = 'bold 12px monospace';
                ctx.fillStyle = '#2563eb';
                ctx.textAlign = 'right';
                ctx.fillText('Xylem', tx - 8, stemTop + 30);
                ctx.restore();
            }
            // Flow particles going UP
            const speed = 0.2 + transFrac * 0.8;
            for (let d = 0; d < Math.round(effFrac * 3) + 1; d++) {
                const p = ((t * speed + d * 0.3 + i * 0.12) % 1);
                const py = stemBottom - 4 - (stemBottom - stemTop - 8) * p;
                ctx.fillStyle = `rgba(59,130,246,0.7)`;
                ctx.beginPath();
                ctx.arc(tx, py, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Leaves at top
        [-1, 0, 1].forEach((dir) => {
            const lx = cx + dir * W * 0.12;
            const ly = stemTop - 5;
            ctx.fillStyle = `rgba(34,197,94,${0.4 + effFrac * 0.4})`;
            ctx.beginPath();
            ctx.ellipse(lx, ly, 18 + effFrac * 8, 8, dir * 0.4, 0, Math.PI * 2);
            ctx.fill();
            // Label each leaf
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = '#166534';
            ctx.textAlign = 'center';
            ctx.fillText('Leaf', lx, ly - 12);
        });

        // Transpiration arrows from leaves
        for (let i = 0; i < Math.round(transFrac * 4); i++) {
            const ax = cx - 20 + i * 14;
            const ay = stemTop - 20 - ((t * 20 + i * 10) % 20);
            ctx.strokeStyle = `rgba(56,189,248,${0.2 + transFrac * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay + 6);
            ctx.lineTo(ax, ay);
            ctx.lineTo(ax - 2, ay + 3);
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax + 2, ay + 3);
            ctx.stroke();
        }

        // Stomata openings on right side
        const stomY = stemTop + (stemBottom - stemTop) * 0.3;
        const opening = stomFrac * 6;
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx + stemW / 2 + 8, stomY, 4, opening, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx + stemW / 2 + 8, stomY + 20, 4, opening, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Exchange arrows near stomata
            // Label stomata
            ctx.save();
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = '#f59e0b';
            ctx.textAlign = 'left';
            ctx.fillText('Stomata', cx + stemW / 2 + 38, stomY + 10);
            ctx.restore();
        if (stomFrac > 0.1) {
            ctx.save();
            ctx.strokeStyle = 'rgba(245,158,11,1)';
            ctx.lineWidth = 5;
            for (let i = 0; i < 2; i++) {
                const ey = stomY + i * 20;
                ctx.beginPath();
                ctx.moveTo(cx + stemW / 2 + 14, ey);
                ctx.lineTo(cx + stemW / 2 + 34, ey);
                ctx.stroke();
            }
            ctx.restore();
        }

        // Roots at bottom
            // Label roots
            ctx.save();
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = '#92400e';
            ctx.textAlign = 'center';
            ctx.fillText('Roots', cx, stemBottom + 38);
            ctx.restore();
        for (let i = 0; i < 4; i++) {
            const rx = cx - 20 + i * 13;
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(rx, stemBottom);
            ctx.quadraticCurveTo(rx + Math.sin(i * 1.5) * 10, stemBottom + 15, rx + Math.sin(i * 2) * 8, stemBottom + 25);
            ctx.stroke();
        }

        // Water uptake arrows from roots
        for (let i = 0; i < Math.round(transFrac * 3); i++) {
            const ux = cx - 10 + i * 10;
            const uy = stemBottom + 30 + Math.sin(t * 2 + i) * 3;
            ctx.strokeStyle = 'rgba(59,130,246,0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ux, uy);
            ctx.lineTo(ux, uy - 6);
            ctx.stroke();
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Transport Efficiency ${transportEfficiency}%`, 14, 22);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 24 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Networks Deliver?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P24 Flow Networks', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C24 Reaction Networks', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B24 Vascular Transport', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Networks deliver resources everywhere!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [transpiration, stomata, transportEfficiency, phase]);

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
                <label className="text-[10px] text-slate-600">Transpiration Pull: {transpiration}</label>
                <input className="w-full accent-cyan-500 mb-0.5" type="range" min={0} max={100} value={transpiration}
                    onChange={e => { const v = Number(e.target.value); setTranspiration(v); onStateChange('transpiration', v); }} />
                <label className="text-[10px] text-slate-600">Stomata Opening: {stomata}</label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={stomata}
                    onChange={e => { const v = Number(e.target.value); setStomata(v); onStateChange('stomata', v); }} />
            </div>
        </div>
    );
};
