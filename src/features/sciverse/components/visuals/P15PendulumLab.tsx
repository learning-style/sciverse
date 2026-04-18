import { useRef, useEffect, useCallback, useState } from 'react';

interface P15PendulumLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P15PendulumLab = ({ state, onStateChange }: P15PendulumLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    const [lengthCm, setLengthCm] = useState(25);
    const [massKg, setMassKg] = useState(1);
    const [damping, setDamping] = useState(0.01);
    const [pushFreq, setPushFreq] = useState(1);
    const [resonanceMode, setResonanceMode] = useState(false);

    const thetaRef = useRef(0.3); // radians
    const omegaRef = useRef(0);
    const timeRef = useRef(0);

    const phase = (state.phase as string) || 'intro';

    const g = 9.81;
    const L = lengthCm / 100;
    const naturalFreq = Math.sqrt(g / L) / (2 * Math.PI);
    const period = 2 * Math.PI * Math.sqrt(L / g);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        const dt = 1 / 60;
        timeRef.current += dt;

        let theta = thetaRef.current;
        let omega = omegaRef.current;

        // Driven damped pendulum equation: theta'' + b theta' + (g/L) sin(theta) = A sin(wt)
        const driveAmp = resonanceMode ? 0.9 : 0;
        const driveOmega = pushFreq * 2 * Math.PI;
        const alpha = -(g / L) * Math.sin(theta) - damping * omega + driveAmp * Math.sin(driveOmega * timeRef.current);
        omega += alpha * dt;
        theta += omega * dt;

        thetaRef.current = theta;
        omegaRef.current = omega;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Pendulum & Resonance Lab', W / 2, 26);

        const pivotX = W * 0.5;
        const pivotY = H * 0.2;
        const pixLen = Math.min(H * 0.45, L * 420);
        const bobX = pivotX + Math.sin(theta) * pixLen;
        const bobY = pivotY + Math.cos(theta) * pixLen;

        // Frame bar
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(pivotX - 120, pivotY);
        ctx.lineTo(pivotX + 120, pivotY);
        ctx.stroke();

        // String
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();

        // Bob
        const bobR = 10 + massKg * 2; // visual only, doesn't affect period physics
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(bobX, bobY, bobR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${massKg}kg`, bobX, bobY + 3);

        // Pivot
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Arc guide
        ctx.strokeStyle = 'rgba(148,163,184,0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, pixLen, Math.PI / 2 - 0.45, Math.PI / 2 + 0.45);
        ctx.stroke();
        ctx.setLineDash([]);

        // Resonance prompt
        if (resonanceMode) {
            ctx.fillStyle = '#22d3ee';
            ctx.font = 'bold 11px monospace';
            ctx.fillText(`Driving @ ${pushFreq.toFixed(2)} Hz | Natural ${naturalFreq.toFixed(2)} Hz`, W / 2, H * 0.78);
            if (Math.abs(pushFreq - naturalFreq) < 0.15) {
                ctx.fillStyle = '#22c55e';
                ctx.fillText('✅ Near resonance: amplitude grows!', W / 2, H * 0.82);
            } else {
                ctx.fillStyle = '#f97316';
                ctx.fillText('Off resonance: weak response', W / 2, H * 0.82);
            }
        }

        // Data panel
        const py = H * 0.84;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12, py, W - 24, H - py - 8);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(12, py, W - 24, H - py - 8);
        ctx.fillStyle = '#475569';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Length: ${lengthCm} cm`, 18, py + 13);
        ctx.fillText(`Mass: ${massKg} kg (visual only for period)`, 18, py + 25);
        ctx.fillText(`Period T = ${period.toFixed(2)} s`, W * 0.45, py + 13);
        ctx.fillText(`Natural f = ${naturalFreq.toFixed(2)} Hz`, W * 0.45, py + 25);

        animRef.current = requestAnimationFrame(animate);
    }, [lengthCm, massKg, damping, pushFreq, resonanceMode, naturalFreq, period, phase]);

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

    const reset = () => {
        thetaRef.current = 0.3;
        omegaRef.current = 0;
        timeRef.current = 0;
    };

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[220px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <label className="text-slate-300 text-xs">Length: <span className="text-cyan-300">{lengthCm} cm</span></label>
                <input type="range" min={10} max={80} value={lengthCm}
                    onChange={e => { setLengthCm(Number(e.target.value)); onStateChange('length', Number(e.target.value)); }}
                    className="w-full accent-cyan-500" />
                <label className="text-slate-300 text-xs">Mass: <span className="text-amber-300">{massKg} kg</span></label>
                <input type="range" min={1} max={8} value={massKg}
                    onChange={e => setMassKg(Number(e.target.value))}
                    className="w-full accent-amber-500" />
                <label className="text-slate-300 text-xs">Damping: <span className="text-rose-300">{damping.toFixed(2)}</span></label>
                <input type="range" min={0} max={0.08} step={0.005} value={damping}
                    onChange={e => setDamping(Number(e.target.value))}
                    className="w-full accent-rose-500" />
                <div className="flex gap-1 mt-1">
                    <button onClick={() => setResonanceMode(v => !v)} className={`flex-1 text-xs rounded py-1 ${resonanceMode ? 'bg-cyan-700 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {resonanceMode ? 'Resonance ON' : 'Resonance OFF'}
                    </button>
                    <button onClick={reset} className="flex-1 text-xs rounded py-1 bg-slate-700 text-slate-300">Reset</button>
                </div>
                {resonanceMode && (
                    <>
                        <label className="text-slate-300 text-xs">Drive Frequency: <span className="text-cyan-300">{pushFreq.toFixed(2)} Hz</span></label>
                        <input type="range" min={0.2} max={2.5} step={0.05} value={pushFreq}
                            onChange={e => setPushFreq(Number(e.target.value))}
                            className="w-full accent-cyan-500" />
                    </>
                )}
            </div>
        </div>
    );
};
