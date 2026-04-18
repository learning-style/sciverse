import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B17BoneStructureStrengthLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B17BoneStructureStrengthLab = ({ state, onStateChange }: B17BoneStructureStrengthLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [calcium, setCalcium] = useState(65);
    const [exercise, setExercise] = useState(50);
    const [age, setAge] = useState(35);
    const phase = (state.phase as string) || 'intro';

    const boneStrength = useMemo(() => {
        const raw = calcium * 0.5 + exercise * 0.35 - age * 0.3 + 30;
        return Math.max(0, Math.min(100, Math.round(raw)));
    }, [calcium, exercise, age]);

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
        const boneTop = H * 0.12;
        const boneBottom = H * 0.82;
        const boneW = W * 0.18 + (boneStrength / 100) * W * 0.06;

        // Cortical bone (outer shell)
        const corticalThickness = 4 + (calcium / 100) * 10;
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.roundRect(cx - boneW / 2, boneTop, boneW, boneBottom - boneTop, 12);
        ctx.fill();
        ctx.strokeStyle = '#fecdd3';
        ctx.lineWidth = corticalThickness;
        ctx.beginPath();
        ctx.roundRect(cx - boneW / 2, boneTop, boneW, boneBottom - boneTop, 12);
        ctx.stroke();

        // Trabecular structure inside (deterministic pattern – no random)
        const trabDensity = (boneStrength / 100);
        const innerLeft = cx - boneW / 2 + corticalThickness + 4;
        const innerRight = cx + boneW / 2 - corticalThickness - 4;
        const innerTop = boneTop + corticalThickness + 4;
        const innerBottom = boneBottom - corticalThickness - 4;
        const iW = innerRight - innerLeft;
        const iH = innerBottom - innerTop;

        const gridX = 5;
        const gridY = 10;
        for (let gx = 0; gx < gridX; gx++) {
            for (let gy = 0; gy < gridY; gy++) {
                // Deterministic hash to decide if strut is visible
                const hash = ((gx * 7 + gy * 13 + 37) % 100) / 100;
                if (hash > trabDensity * 0.8 + 0.15) continue;
                const tx = innerLeft + (iW / gridX) * gx + iW / gridX / 2;
                const ty = innerTop + (iH / gridY) * gy + iH / gridY / 2;
                ctx.strokeStyle = `rgba(251,113,133,${0.2 + trabDensity * 0.4})`;
                ctx.lineWidth = 1 + trabDensity * 1.5;
                // Cross-strut
                ctx.beginPath();
                ctx.moveTo(tx - 6, ty - 4);
                ctx.lineTo(tx + 6, ty + 4);
                ctx.moveTo(tx + 6, ty - 4);
                ctx.lineTo(tx - 6, ty + 4);
                ctx.stroke();
            }
        }

        // Exercise stress lines (adaptive)
        const exFrac = exercise / 100;
        if (exFrac > 0.3) {
            for (let i = 0; i < Math.round(exFrac * 6); i++) {
                const sy = boneTop + 20 + ((boneBottom - boneTop - 40) / 6) * i;
                ctx.strokeStyle = `rgba(34,197,94,${(exFrac - 0.3) * 0.5})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(cx - boneW / 2 - 8, sy);
                ctx.lineTo(cx - boneW / 2 + 4, sy);
                ctx.moveTo(cx + boneW / 2 + 8, sy);
                ctx.lineTo(cx + boneW / 2 - 4, sy);
                ctx.stroke();
            }
        }

        // Age thinning indicator
        const ageFrac = age / 90;
        if (ageFrac > 0.4) {
            ctx.fillStyle = `rgba(148,163,184,${(ageFrac - 0.4) * 0.3})`;
            ctx.fillRect(cx - boneW / 2 + 2, boneTop + 2, boneW - 4, (boneBottom - boneTop) * 0.1);
        }

        // Metrics – centered above the bone
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Bone Strength ${boneStrength}%`, cx, boneTop - 8);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 17 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Structures Stay Standing?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P17 Structures & Loads', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C17 Construction Materials', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B17 Bone Strength Design', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Structure determines strength at every scale!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [calcium, exercise, age, boneStrength, phase]);

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
                <label className="text-[10px] text-slate-600">Calcium Intake: {calcium}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={calcium}
                    onChange={e => { const v = Number(e.target.value); setCalcium(v); onStateChange('calcium', v); }} />
                <label className="text-[10px] text-slate-600">Activity Level: {exercise}</label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={exercise}
                    onChange={e => { const v = Number(e.target.value); setExercise(v); onStateChange('exercise', v); }} />
                <label className="text-[10px] text-slate-600">Age Factor: {age}</label>
                <input className="w-full accent-slate-400" type="range" min={10} max={90} value={age}
                    onChange={e => { const v = Number(e.target.value); setAge(v); onStateChange('age', v); }} />
            </div>
        </div>
    );
};