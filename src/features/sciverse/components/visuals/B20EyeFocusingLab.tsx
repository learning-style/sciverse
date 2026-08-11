import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B20EyeFocusingLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B20EyeFocusingLab = ({ state, onStateChange }: B20EyeFocusingLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [targetDistance, setTargetDistance] = useState(50);
    const [lensMuscle, setLensMuscle] = useState(55);
    const phase = (state.phase as string) || 'intro';

    const idealMuscle = useMemo(() => Math.max(10, Math.min(90, Math.round(100 - targetDistance * 0.9))), [targetDistance]);
    const clarity = Math.max(0, Math.round(100 - Math.abs(idealMuscle - lensMuscle) * 2));

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

        const eyeX = W * 0.62;
        const eyeY = H * 0.5;
        const eyeR = Math.min(W, H) * 0.23;

        ctx.strokeStyle = '#fda4af';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, eyeR, eyeR * 0.75, 0, 0, Math.PI * 2);
        ctx.stroke();

        const lensCurve = 0.2 + (lensMuscle / 100) * 0.55;
        const lensX = eyeX - eyeR * 0.62;
        const lensH = eyeR * 0.8;
        ctx.strokeStyle = '#fbcfe8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lensX, eyeY - lensH / 2);
        ctx.quadraticCurveTo(lensX + eyeR * lensCurve, eyeY, lensX, eyeY + lensH / 2);
        ctx.stroke();

        const retinaX = eyeX + eyeR * 0.78;
        ctx.strokeStyle = '#fb7185';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(retinaX, eyeY - eyeR * 0.55);
        ctx.lineTo(retinaX, eyeY + eyeR * 0.55);
        ctx.stroke();

        const objectX = W * 0.12;
        const objectY = eyeY - 20;
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(objectX, objectY, 7, 0, Math.PI * 2);
        ctx.fill();

        const focusX = retinaX + (idealMuscle - lensMuscle) * 1.2;
        const rayTargets = [-24, 0, 24];
        for (const offset of rayTargets) {
            const entryY = eyeY + offset;
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(objectX, objectY);
            ctx.lineTo(lensX, entryY);
            ctx.lineTo(focusX, eyeY + offset * 0.2);
            ctx.stroke();
        }

        const blurRadius = Math.max(1, (100 - clarity) * 0.12 + 2 + Math.sin(t * 7) * 0.3);
        ctx.fillStyle = 'rgba(253, 164, 175, 0.45)';
        ctx.beginPath();
        ctx.arc(retinaX, eyeY, blurRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fecdd3';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Target ${targetDistance} cm`, 12, 18);
        ctx.fillText(`Ideal muscle ${idealMuscle}`, 12, 34);
        ctx.fillText(`Actual muscle ${lensMuscle}`, 12, 50);
        ctx.textAlign = 'right';
        ctx.fillText(`Clarity ${clarity}%`, W - 12, 18);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 20 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Lenses Change What We See?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P20 Lens Ray Physics', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C20 Optical Materials', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B20 Eye Focusing System', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Lenses bend light → we see the world!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [clarity, idealMuscle, lensMuscle, targetDistance, phase]);

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
                <label className="text-[10px] text-slate-600">Target Distance: {targetDistance} cm</label>
                <input className="w-full accent-cyan-500" type="range" min={10} max={100} value={targetDistance}
                    onChange={e => { const v = Number(e.target.value); setTargetDistance(v); onStateChange('targetDistance', v); }} />
                <label className="text-[10px] text-slate-600">Lens Muscle Tension: {lensMuscle}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={lensMuscle}
                    onChange={e => { const v = Number(e.target.value); setLensMuscle(v); onStateChange('lensMuscle', v); }} />
            </div>
        </div>
    );
};