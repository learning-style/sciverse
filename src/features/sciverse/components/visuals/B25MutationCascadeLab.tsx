import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B25MutationCascadeLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B25MutationCascadeLab = ({ state, onStateChange }: B25MutationCascadeLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [mutationImpact, setMutationImpact] = useState(35);
    const [selectionPressure, setSelectionPressure] = useState(65);
    const phase = (state.phase as string) || 'intro';

    const populationShift = useMemo(() => Math.max(0, Math.min(100, Math.round(mutationImpact * 0.45 + selectionPressure * 0.55))), [mutationImpact, selectionPressure]);

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

        const mutFrac = mutationImpact / 100;
        const selFrac = selectionPressure / 100;
        const shiftFrac = populationShift / 100;

        // DNA strand on left
        const dnaX = W * 0.12;
        const dnaTop = H * 0.12;
        const dnaH = H * 0.7;
        const rungs = 12;
        for (let i = 0; i < rungs; i++) {
            const ry = dnaTop + (dnaH / rungs) * i;
            const offset = Math.sin(i * 0.8 + t * 0.5) * 8;
            const isMutated = (i / rungs) < mutFrac && i > 2;

            // Backbone
            ctx.strokeStyle = isMutated ? '#ef4444' : '#6366f1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(dnaX - 10 + offset, ry);
            ctx.lineTo(dnaX + 10 + offset, ry);
            ctx.stroke();

            // Nodes
            ctx.fillStyle = isMutated ? '#ef4444' : '#3b82f6';
            ctx.beginPath();
            ctx.arc(dnaX - 10 + offset, ry, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = isMutated ? '#f97316' : '#22c55e';
            ctx.beginPath();
            ctx.arc(dnaX + 10 + offset, ry, 3, 0, Math.PI * 2);
            ctx.fill();
            // Label DNA
            if (i === 0) {
                ctx.font = 'bold 12px monospace';
                ctx.fillStyle = '#6366f1';
                ctx.textAlign = 'left';
                ctx.fillText('DNA', dnaX + 18, dnaTop + 8);
            }
        }

        // Population grid
        const gridLeft = W * 0.3;
        const gridTop = H * 0.12;
        const cols = 8;
        const rows = 6;
        const cellW = (W * 0.6) / cols;
        const cellH = (H * 0.65) / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                const total = rows * cols;
                const mutatedThreshold = total * shiftFrac;
                const isMut = idx < mutatedThreshold;
                const px = gridLeft + c * cellW + cellW / 2;
                const py = gridTop + r * cellH + cellH / 2;

                // Organism dot
                const baseR = 4;
                ctx.fillStyle = isMut
                    ? `rgba(239,68,68,${0.4 + shiftFrac * 0.4})`
                    : `rgba(59,130,246,${0.3 + (1 - shiftFrac) * 0.4})`;
                ctx.beginPath();
                ctx.arc(px, py, baseR + (isMut ? mutFrac * 2 : 0), 0, Math.PI * 2);
                ctx.fill();

                // Selection pressure highlight on border organisms
                if (isMut && selFrac > 0.5 && (c === 0 || r === 0 || c === cols - 1 || r === rows - 1)) {
                    ctx.strokeStyle = `rgba(245,158,11,${selFrac * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(px, py, baseR + 5, 0, Math.PI * 2);
                    ctx.stroke();
                }
                // Label population grid
                if (r === 0 && c === 0) {
                    ctx.font = 'bold 12px monospace';
                    ctx.fillStyle = '#ef4444';
                    ctx.textAlign = 'left';
                    ctx.fillText('Population', px + 18, py - 8);
                }
            }
        }

        // Arrow from DNA to population
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(dnaX + 18, H * 0.45);
        ctx.lineTo(gridLeft - 8, H * 0.45);
        ctx.stroke();
        ctx.setLineDash([]);

        // Shift bar at bottom
        const barY = H * 0.85;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(gridLeft, barY, W * 0.6, 8);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(gridLeft, barY, W * 0.6 * shiftFrac, 8);
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center';
        ctx.fillText('Population Shift →', gridLeft + W * 0.3, barY + 18);

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Population Shift ${populationShift}%`, 14, 22);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 25 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Can Tiny Changes Cause Big Effects?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P25 Chaos in Motion', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C25 Chain Reactions', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B25 Mutation Cascades', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Small mutations → massive evolutionary shifts!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [mutationImpact, selectionPressure, populationShift, phase]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[210px] shadow-md z-10">
                <label className="text-[13px] font-extrabold text-[#ef4444] drop-shadow">Mutation Impact: <span className="font-extrabold">{mutationImpact}</span></label>
                <input className="w-full accent-pink-500 mb-0.5" type="range" min={0} max={100} value={mutationImpact}
                    onChange={e => { const v = Number(e.target.value); setMutationImpact(v); onStateChange('mutationImpact', v); }} />
                <label className="text-[13px] font-extrabold text-[#22c55e] drop-shadow">Selection Pressure: <span className="font-extrabold">{selectionPressure}</span></label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={selectionPressure}
                    onChange={e => { const v = Number(e.target.value); setSelectionPressure(v); onStateChange('selectionPressure', v); }} />
            </div>
        </div>
    );
};
