import { useRef, useEffect } from 'react';

interface P5LeversLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const P5LeversLab = ({ state, onStateChange }: P5LeversLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);

    const pivotPos = (state.pivotPos as number) ?? 50;
    const leftWeight = (state.leftWeight as number) ?? 20;
    const rightWeight = (state.rightWeight as number) ?? 20;

    // Mutable refs for stable animation loop
    const pivotRef = useRef(pivotPos);
    const leftWRef = useRef(leftWeight);
    const rightWRef = useRef(rightWeight);
    pivotRef.current = pivotPos;
    leftWRef.current = leftWeight;
    rightWRef.current = rightWeight;

    // Smoothly animated tilt angle
    const currentAngleRef = useRef(0);

    // Single stable animation loop
    useEffect(() => {
        const animate = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) { animRef.current = requestAnimationFrame(animate); return; }

            // Ensure canvas dimensions match container
            if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) { animRef.current = requestAnimationFrame(animate); return; }
            const W = canvas.width, H = canvas.height;

            const piv = pivotRef.current;
            const lw = leftWRef.current;
            const rw = rightWRef.current;

            // Compute target tilt
            const pivotFraction = piv / 100;
            const leftArm = pivotFraction;
            const rightArm = 1 - pivotFraction;
            const leftTorque = lw * leftArm;
            const rightTorque = rw * rightArm;
            const diff = rightTorque - leftTorque;
            const maxTilt = 15;
            const targetAngle = Math.max(-maxTilt, Math.min(maxTilt, diff * 2));

            // Smooth lerp toward target
            currentAngleRef.current += (targetAngle - currentAngleRef.current) * 0.12;
            const tiltAngle = currentAngleRef.current;

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 21px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Levers & Balance', W / 2, 28);

            const groundY = H * 0.45;
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(0, groundY, W, H - groundY);

            // Pivot point — always centered horizontally, pivot slider controls where on the BEAM the fulcrum sits
            const pivotX = W * 0.5;
            const pivotY = groundY;

            // Pivot triangle
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(pivotX, pivotY - 20);
            ctx.lineTo(pivotX - 18, pivotY);
            ctx.lineTo(pivotX + 18, pivotY);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Beam (tilted around pivot)
            const pad = 30; // pixels of padding on each side
            const maxBeam = W - 2 * pad; // max beam length that fits the canvas
            // Scale beam so both arms fit: left arm = pivotFraction * beam, right = (1-pf) * beam
            // The longer arm must not exceed half the available width
            const longerArm = Math.max(pivotFraction, 1 - pivotFraction);
            const beamLength = Math.min(maxBeam, (W / 2 - pad) / longerArm);
            const angleRad = (tiltAngle * Math.PI) / 180;
            const beamY = pivotY - 22;

            // The pivot slider moves where the fulcrum sits along the beam
            // pivotFraction=0 → fulcrum at left end, =1 → right end, =0.5 → center
            const beamOffsetX = (0.5 - pivotFraction) * beamLength;

            ctx.save();
            ctx.translate(pivotX, beamY);
            ctx.rotate(angleRad);

            // Beam bar — shifted so the fulcrum point is at the pivot
            const halfLen = beamLength / 2;
            ctx.fillStyle = '#78716c';
            ctx.fillRect(-halfLen + beamOffsetX, -6, beamLength, 12);
            ctx.strokeStyle = '#57534e';
            ctx.lineWidth = 2;
            ctx.strokeRect(-halfLen + beamOffsetX, -6, beamLength, 12);

            // Distance marks
            ctx.strokeStyle = '#a8a29e';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 10; i++) {
                const mx = -halfLen + beamOffsetX + (i / 10) * beamLength;
                ctx.beginPath();
                ctx.moveTo(mx, -8);
                ctx.lineTo(mx, 8);
                ctx.stroke();
            }

            // Pivot marker on beam
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();

            // Left weight (at left end of beam)
            const leftX = -halfLen + beamOffsetX + 15;
            const wSize = 18 + lw * 0.4;
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(leftX - wSize / 2, -6 - wSize, wSize, wSize);
            ctx.strokeStyle = '#1e40af';
            ctx.lineWidth = 2;
            ctx.strokeRect(leftX - wSize / 2, -6 - wSize, wSize, wSize);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${lw}`, leftX, -6 - wSize / 2 + 4);

            // Right weight (at right end of beam)
            const rightX = halfLen + beamOffsetX - 15;
            const rSize = 18 + rw * 0.4;
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(rightX - rSize / 2, -6 - rSize, rSize, rSize);
            ctx.strokeStyle = '#991b1b';
            ctx.lineWidth = 2;
            ctx.strokeRect(rightX - rSize / 2, -6 - rSize, rSize, rSize);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${rw}`, rightX, -6 - rSize / 2 + 4);

            // Distance labels on the beam (left arm / right arm in tick-mark units)
            const leftArmLen = pivotFraction * 10;
            const rightArmLen = (1 - pivotFraction) * 10;
            if (leftArmLen > 0.5) {
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(leftX, 18);
                ctx.lineTo(0, 18);
                ctx.stroke();
                ctx.fillStyle = '#3b82f6';
                ctx.beginPath(); ctx.moveTo(leftX, 18); ctx.lineTo(leftX + 5, 14); ctx.lineTo(leftX + 5, 22); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(0, 18); ctx.lineTo(-5, 14); ctx.lineTo(-5, 22); ctx.closePath(); ctx.fill();
                ctx.font = 'bold 17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`${leftArmLen.toFixed(1)}m`, (leftX + 0) / 2, 32);
            }
            if (rightArmLen > 0.5) {
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, 18);
                ctx.lineTo(rightX, 18);
                ctx.stroke();
                ctx.fillStyle = '#ef4444';
                ctx.beginPath(); ctx.moveTo(0, 18); ctx.lineTo(5, 14); ctx.lineTo(5, 22); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(rightX, 18); ctx.lineTo(rightX - 5, 14); ctx.lineTo(rightX - 5, 22); ctx.closePath(); ctx.fill();
                ctx.font = 'bold 17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`${rightArmLen.toFixed(1)}m`, (0 + rightX) / 2, 32);
            }

            ctx.restore();

            // Torque info — use beam tick marks (0–10) as distance in meters
            const leftDist = pivotFraction * 10;
            const rightDist = (1 - pivotFraction) * 10;
            const lt = lw * leftDist;
            const rt = rw * rightDist;

            const infoY = groundY + 140;
            ctx.fillStyle = '#3b82f6';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`Left: ${lw} kg × ${leftDist.toFixed(1)} m = ${lt.toFixed(0)}`, W * 0.25, infoY);
            ctx.fillStyle = '#ef4444';
            ctx.fillText(`Right: ${rw} kg × ${rightDist.toFixed(1)} m = ${rt.toFixed(0)}`, W * 0.75, infoY);

            // Balance indicator
            const balanced = Math.abs(lt - rt) < 2;
            ctx.fillStyle = balanced ? '#22c55e' : '#f59e0b';
            ctx.font = 'bold 19px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(balanced ? '✅ BALANCED!' : '⚖️ Unbalanced...', W / 2, infoY + 25);

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

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

    const showControls = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-4 flex-wrap justify-center">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-600">Pivot</span>
                        <input type="range" min={15} max={85} value={pivotPos} onChange={e => onStateChange?.('pivotPos', Number(e.target.value))} className="w-24 h-2 accent-amber-500 cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-600">Left</span>
                        <input type="range" min={5} max={50} value={leftWeight} onChange={e => onStateChange?.('leftWeight', Number(e.target.value))} className="w-20 h-2 accent-blue-500 cursor-pointer" />
                        <span className="text-sm font-bold text-blue-600">{leftWeight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-600">Right</span>
                        <input type="range" min={5} max={50} value={rightWeight} onChange={e => onStateChange?.('rightWeight', Number(e.target.value))} className="w-20 h-2 accent-red-500 cursor-pointer" />
                        <span className="text-sm font-bold text-red-600">{rightWeight}</span>
                    </div>
                </div>
            )}
        </div>
    );
};


