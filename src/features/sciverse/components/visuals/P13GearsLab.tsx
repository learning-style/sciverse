import { useRef, useEffect, useCallback, useState } from 'react';

interface P13GearsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P13GearsLab = ({ state, onStateChange }: P13GearsLabProps) => {
    void onStateChange;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const rotationRef = useRef(0);

    const [inputTeeth, setInputTeeth] = useState(10);
    const [outputTeeth, setOutputTeeth] = useState(20);
    const [mode, setMode] = useState<'gears' | 'pulley'>('gears');

    // Pulley interactivity state
    const [pulleyType, setPulleyType] = useState<1 | 2 | 4>(1);
    const [blockMass, setBlockMass] = useState(100);
    const pullRef = useRef(0); // 0..1 how far rope has been pulled
    const draggingRef = useRef(false);
    const dragStartYRef = useRef(0);
    const pullStartRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const showSpeedLabels = (state.showSpeedLabels as boolean) || false;

    const ratio = outputTeeth / inputTeeth;
    const mechAdvantage = ratio;

    const drawGear = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, teeth: number, angle: number, color: string) => {
        const toothH = r * 0.22;
        const toothW = (2 * Math.PI / teeth) * 0.45;
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
            const a = angle + (i / teeth) * Math.PI * 2;
            const a1 = a - toothW / 2;
            const a2 = a - toothW / 4;
            const a3 = a + toothW / 4;
            const a4 = a + toothW / 2;
            ctx.lineTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r);
            ctx.lineTo(cx + Math.cos(a2) * (r + toothH), cy + Math.sin(a2) * (r + toothH));
            ctx.lineTo(cx + Math.cos(a3) * (r + toothH), cy + Math.sin(a3) * (r + toothH));
            ctx.lineTo(cx + Math.cos(a4) * r, cy + Math.sin(a4) * r);
        }
        ctx.closePath();
        ctx.fill();

        // Hub
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Spoke marker
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * r * 0.8, cy + Math.sin(angle) * r * 0.8);
        ctx.stroke();
    };

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        // Drive gear rotates at fixed speed; driven gear opposite and slower/faster
        const driveSpeed = 0.04;
        rotationRef.current += driveSpeed;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Mechanical Advantage Lab — ${mode === 'gears' ? 'Gears' : 'Pulleys'}`, W / 2, 24);

        if (mode === 'gears') {
            const r1 = 28 + inputTeeth * 1.2;
            const r2 = 28 + outputTeeth * 1.2;
            const separation = r1 + r2 + 2;
            const cx1 = W / 2 - separation / 2;
            const cx2 = W / 2 + separation / 2;
            const cy = H * 0.45;

            const angle1 = rotationRef.current;
            // Output gear rotates opposite and at ratio speed
            const angle2 = -rotationRef.current * (inputTeeth / outputTeeth);

            drawGear(ctx, cx1, cy, r1, inputTeeth, angle1, '#6366f1');
            drawGear(ctx, cx2, cy, r2, outputTeeth, angle2, '#10b981');

            // Labels
            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = '#3730a3';
            ctx.textAlign = 'center';
            ctx.fillText(`Input: ${inputTeeth} teeth`, cx1, cy + r1 + 22);
            ctx.fillText(`Speed: 1×`, cx1, cy + r1 + 36);
            ctx.fillStyle = '#065f46';
            ctx.fillText(`Output: ${outputTeeth} teeth`, cx2, cy + r2 + 22);
            ctx.fillText(`Speed: ${(inputTeeth / outputTeeth).toFixed(2)}×`, cx2, cy + r2 + 36);

            // Arrows between gears
            ctx.fillStyle = '#f97316';
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('⚙', W / 2, cy + 5);

            // Mechanical advantage
            ctx.fillStyle = '#92400e';
            ctx.font = 'bold 14px monospace';
            ctx.fillText(`Gear Ratio: ${ratio.toFixed(2)}:1`, W / 2, cy - Math.max(r1, r2) - 16);

            if (ratio > 1) {
                ctx.fillStyle = '#166534';
                ctx.font = '11px monospace';
                ctx.fillText('↑ More torque, less speed (good for lifting!)', W / 2, cy - Math.max(r1, r2) - 4);
            } else if (ratio < 1) {
                ctx.fillStyle = '#1e3a8a';
                ctx.font = '11px monospace';
                ctx.fillText('↑ More speed, less torque (good for wheels!)', W / 2, cy - Math.max(r1, r2) - 4);
            }

            // Energy conservation note
            ctx.fillStyle = '#334155';
            ctx.font = '10px monospace';
            ctx.fillText('Work = Force × Distance — energy is always conserved!', W / 2, H * 0.84);
        } else {
            // ─── Interactive Pulley Mode ───
            const pull = pullRef.current; // 0..1
            const ropeSegs = pulleyType;
            const forcePull = blockMass / ropeSegs;
            const liftDist = pull; // block rises by pull / ropeSegs
            const pullDist = pull * ropeSegs; // you pull ropeSegs× farther

            const anchorY = H * 0.12; // ceiling mount
            const floorY = H * 0.82;
            const blockH = 50;
            const blockW = 70;
            const cx = W / 2;

            // Block Y position: starts at bottom, rises as pull increases
            const blockRestY = floorY - blockH;
            const blockLiftRange = floorY - anchorY - blockH - 50;
            const blockY = blockRestY - liftDist * blockLiftRange;

            // ── Draw ceiling ──
            ctx.fillStyle = '#475569';
            ctx.fillRect(0, anchorY - 8, W, 10);
            // Hatch marks
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1;
            for (let i = 0; i < W; i += 14) {
                ctx.beginPath();
                ctx.moveTo(i, anchorY - 8);
                ctx.lineTo(i + 8, anchorY + 2);
                ctx.stroke();
            }

            const pulleyR = 18;

            if (pulleyType === 1) {
                // ── Single Fixed Pulley ──
                // Fixed pulley at ceiling
                const fpx = cx;
                const fpy = anchorY + pulleyR + 4;
                // Rope: from block top → up to pulley left → over pulley → down right to pull end
                const ropeEndY = anchorY + 30 + pullDist * blockLiftRange;

                // Rope left (attached to block)
                ctx.strokeStyle = '#a16207';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx - 8, blockY);
                ctx.lineTo(cx - 8, fpy);
                ctx.stroke();
                // Rope right (pull end)
                ctx.beginPath();
                ctx.moveTo(cx + 8, fpy);
                ctx.lineTo(cx + 8, Math.min(ropeEndY, floorY));
                ctx.stroke();
                // Rope over pulley arc
                ctx.strokeStyle = '#a16207';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(fpx, fpy, 8, Math.PI, 0);
                ctx.stroke();

                // Pulley wheel
                ctx.fillStyle = '#64748b';
                ctx.beginPath();
                ctx.arc(fpx, fpy, pulleyR, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#94a3b8';
                ctx.beginPath();
                ctx.arc(fpx, fpy, pulleyR - 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.arc(fpx, fpy, 4, 0, Math.PI * 2);
                ctx.fill();
                // Mounting bracket
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(fpx, anchorY + 2);
                ctx.lineTo(fpx, fpy - pulleyR);
                ctx.stroke();

                // Pull handle
                const handleY = Math.min(ropeEndY, floorY);
                ctx.fillStyle = '#dc2626';
                ctx.beginPath();
                ctx.arc(cx + 8, handleY, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('↓', cx + 8, handleY + 3);
            } else if (pulleyType === 2) {
                // ── Single Movable Pulley (compound) ──
                // Fixed anchor at ceiling, movable pulley on block
                const mpx = cx;
                const mpy = blockY - 10; // movable pulley rides on block

                // Rope segment 1: from ceiling anchor left → down to movable pulley left
                ctx.strokeStyle = '#a16207';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx - 20, anchorY + 2);
                ctx.lineTo(cx - 20, mpy);
                ctx.stroke();
                // Rope under movable pulley
                ctx.beginPath();
                ctx.arc(mpx, mpy, 10, Math.PI, 0);
                ctx.stroke();
                // Rope segment 2: from movable pulley right → up to ceiling → down to pull end
                ctx.beginPath();
                ctx.moveTo(cx + 20, mpy);
                ctx.lineTo(cx + 20, anchorY + 2);
                ctx.stroke();
                // Pull rope going down from ceiling right
                const ropeEndY = anchorY + 30 + pullDist * blockLiftRange * 0.5;
                ctx.beginPath();
                ctx.moveTo(cx + 50, anchorY + 2);
                ctx.lineTo(cx + 50, Math.min(ropeEndY, floorY));
                ctx.stroke();
                // Redirect at ceiling
                ctx.beginPath();
                ctx.moveTo(cx + 20, anchorY + 2);
                ctx.lineTo(cx + 50, anchorY + 2);
                ctx.stroke();

                // Movable pulley wheel
                ctx.fillStyle = '#475569';
                ctx.beginPath();
                ctx.arc(mpx, mpy, pulleyR - 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#94a3b8';
                ctx.beginPath();
                ctx.arc(mpx, mpy, pulleyR - 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.arc(mpx, mpy, 3, 0, Math.PI * 2);
                ctx.fill();
                // Link from pulley to block
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(mpx, mpy + pulleyR - 2);
                ctx.lineTo(mpx, blockY);
                ctx.stroke();

                // Anchor points at ceiling
                ctx.fillStyle = '#334155';
                ctx.fillRect(cx - 24, anchorY - 2, 8, 8);
                ctx.fillRect(cx + 16, anchorY - 2, 8, 8);

                // Pull handle
                const handleY = Math.min(ropeEndY, floorY);
                ctx.fillStyle = '#dc2626';
                ctx.beginPath();
                ctx.arc(cx + 50, handleY, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('↓', cx + 50, handleY + 3);
            } else {
                // ── Block and Tackle (4 segments) ──
                const topBlockY = anchorY + 10;
                const botBlockY = blockY - 16;

                // 4 rope segments between top block and bottom block
                const offsets = [-24, -8, 8, 24];
                ctx.strokeStyle = '#a16207';
                ctx.lineWidth = 2.5;
                for (let i = 0; i < 4; i++) {
                    const startY = i % 2 === 0 ? topBlockY + pulleyR : botBlockY - pulleyR + 4;
                    const endY = i % 2 === 0 ? botBlockY - pulleyR + 4 : topBlockY + pulleyR;
                    ctx.beginPath();
                    ctx.moveTo(cx + offsets[i], startY);
                    ctx.lineTo(cx + offsets[i], endY);
                    ctx.stroke();
                }
                // Pull rope from top right going down
                const ropeEndY = anchorY + 30 + pullDist * blockLiftRange * 0.25;
                ctx.beginPath();
                ctx.moveTo(cx + 36, topBlockY + pulleyR);
                ctx.lineTo(cx + 36, anchorY + 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx + 36, anchorY + 2);
                ctx.lineTo(cx + 70, anchorY + 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx + 70, anchorY + 2);
                ctx.lineTo(cx + 70, Math.min(ropeEndY, floorY));
                ctx.stroke();

                // Top block (fixed) - 2 pulleys
                ctx.fillStyle = '#475569';
                ctx.fillRect(cx - 30, topBlockY - 4, 60, pulleyR * 2 + 8);
                ctx.fillStyle = '#94a3b8';
                ctx.beginPath();
                ctx.arc(cx - 16, topBlockY + pulleyR, 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(cx + 16, topBlockY + pulleyR, 12, 0, Math.PI * 2);
                ctx.fill();
                // Mounting
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx, anchorY + 2);
                ctx.lineTo(cx, topBlockY - 4);
                ctx.stroke();

                // Bottom block (movable) - 2 pulleys
                ctx.fillStyle = '#64748b';
                ctx.fillRect(cx - 30, botBlockY - pulleyR - 4, 60, pulleyR * 2 + 8);
                ctx.fillStyle = '#94a3b8';
                ctx.beginPath();
                ctx.arc(cx - 16, botBlockY, 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(cx + 16, botBlockY, 12, 0, Math.PI * 2);
                ctx.fill();
                // Link to load
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx, botBlockY + pulleyR + 4);
                ctx.lineTo(cx, blockY);
                ctx.stroke();

                // Pull handle
                const handleY = Math.min(ropeEndY, floorY);
                ctx.fillStyle = '#dc2626';
                ctx.beginPath();
                ctx.arc(cx + 70, handleY, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('↓', cx + 70, handleY + 3);
            }

            // ── Draw the block (load) ──
            ctx.fillStyle = '#7c2d12';
            ctx.fillRect(cx - blockW / 2, blockY, blockW, blockH);
            // Block highlight
            ctx.fillStyle = '#9a3412';
            ctx.fillRect(cx - blockW / 2 + 3, blockY + 3, blockW - 6, blockH - 6);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 15px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${blockMass} kg`, cx, blockY + blockH / 2 + 5);

            // ── Info panel at bottom ──
            const infoY = H * 0.84;
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(0, infoY - 4, W, H - infoY + 4);
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, infoY - 4);
            ctx.lineTo(W, infoY - 4);
            ctx.stroke();

            const typeName = pulleyType === 1 ? 'Single Fixed' : pulleyType === 2 ? 'Single Movable' : 'Block & Tackle (4-rope)';
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${typeName}  •  ${ropeSegs} rope segment${ropeSegs > 1 ? 's' : ''}`, W / 2, infoY + 12);

            ctx.fillStyle = '#b91c1c';
            ctx.font = 'bold 14px monospace';
            ctx.fillText(`Force needed: ${forcePull.toFixed(0)} kg  (${blockMass}÷${ropeSegs})`, W / 2, infoY + 30);

            ctx.fillStyle = '#334155';
            ctx.font = '11px monospace';
            const tradeoff = ropeSegs > 1 ? `Trade-off: pull ${ropeSegs}× farther to lift — energy is conserved!` : 'Fixed pulley changes direction only — no force reduction';
            ctx.fillText(tradeoff, W / 2, infoY + 46);

            // Drag hint
            if (pull < 0.05) {
                ctx.fillStyle = '#dc2626';
                ctx.font = 'bold 12px monospace';
                ctx.fillText('⬇ Drag the red handle down to pull!', W / 2, H * 0.5);
            }
        }

        animRef.current = requestAnimationFrame(animate);
    }, [inputTeeth, outputTeeth, mode, ratio, phase, showSpeedLabels, pulleyType, blockMass]);

    // Pulley drag interaction
    useEffect(() => {
        if (mode !== 'pulley') return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onPointerDown = (e: PointerEvent) => {
            draggingRef.current = true;
            dragStartYRef.current = e.clientY;
            pullStartRef.current = pullRef.current;
            canvas.setPointerCapture(e.pointerId);
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!draggingRef.current) return;
            const dy = e.clientY - dragStartYRef.current;
            const sensitivity = 0.003;
            pullRef.current = Math.max(0, Math.min(1, pullStartRef.current + dy * sensitivity));
        };
        const onPointerUp = () => {
            draggingRef.current = false;
        };

        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);
        return () => {
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointercancel', onPointerUp);
        };
    }, [mode]);

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
            <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: 'none' }} />
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[190px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <div className="flex gap-1">
                    <button onClick={() => setMode('gears')} className={`flex-1 text-xs rounded py-1 ${mode === 'gears' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>⚙️ Gears</button>
                    <button onClick={() => setMode('pulley')} className={`flex-1 text-xs rounded py-1 ${mode === 'pulley' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>🔩 Pulley</button>
                </div>
                {mode === 'gears' && (
                    <>
                        <label className="text-slate-300 text-xs">Input Teeth: <span className="text-indigo-400">{inputTeeth}</span></label>
                        <input type="range" min={5} max={30} value={inputTeeth} onChange={e => setInputTeeth(Number(e.target.value))} className="w-full accent-indigo-500" />
                        <label className="text-slate-300 text-xs">Output Teeth: <span className="text-emerald-400">{outputTeeth}</span></label>
                        <input type="range" min={5} max={40} value={outputTeeth} onChange={e => setOutputTeeth(Number(e.target.value))} className="w-full accent-emerald-500" />
                        <div className="text-yellow-300 text-xs text-center font-bold">Ratio: {mechAdvantage.toFixed(2)}:1</div>
                    </>
                )}
                {mode === 'pulley' && (
                    <>
                        <div className="text-slate-400 text-[10px] uppercase tracking-wider">Pulley Type</div>
                        <div className="flex gap-1">
                            <button onClick={() => { setPulleyType(1); pullRef.current = 0; }} className={`flex-1 text-[10px] rounded py-1 ${pulleyType === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Fixed</button>
                            <button onClick={() => { setPulleyType(2); pullRef.current = 0; }} className={`flex-1 text-[10px] rounded py-1 ${pulleyType === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Movable</button>
                            <button onClick={() => { setPulleyType(4); pullRef.current = 0; }} className={`flex-1 text-[10px] rounded py-1 ${pulleyType === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Block&Tackle</button>
                        </div>
                        <label className="text-slate-300 text-xs">Mass: <span className="text-amber-400">{blockMass} kg</span></label>
                        <input type="range" min={20} max={500} step={10} value={blockMass} onChange={e => setBlockMass(Number(e.target.value))} className="w-full accent-amber-500" />
                        <div className="text-red-400 text-xs text-center font-bold">Force: {(blockMass / pulleyType).toFixed(0)} kg</div>
                        <button onClick={() => { pullRef.current = 0; }} className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-300 rounded py-1">↺ Reset</button>
                    </>
                )}
            </div>
        </div>
    );
};
