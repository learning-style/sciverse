import { useRef, useEffect, useCallback } from 'react';

interface B1MuscleLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B1MuscleLab = ({ state, onStateChange }: B1MuscleLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasHostRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const flexAngleRef = useRef(0); // 0 = straight, 1 = fully flexed

    const armFlexed = (state.armFlexed as boolean) || false;
    const backpackWeight = (state.backpackWeight as number) || 2;
    const showPullArrow = (state.showPullArrow as boolean) || false;
    const showLeverLabel = (state.showLeverLabel as boolean) || false;
    const showForceGraph = (state.showForceGraph as boolean) || false;
    const phase = (state.phase as string) || 'intro';

    const targetAngle = armFlexed ? 1 : 0;

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        // Smooth animate flex
        flexAngleRef.current += (targetAngle - flexAngleRef.current) * 0.08;
        const flex = flexAngleRef.current;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Your Arm: A Living Machine', W / 2, 28);

        const cx = W / 2 - 30;
        const shoulderY = 160;
        const upperArmLen = 120;
        const forearmLen = 110;

        // Elbow position (fixed angle for upper arm going down)
        const elbowX = cx;
        const elbowY = shoulderY + upperArmLen;

        // Forearm angle based on flex (0 = hanging down, 1 = fully bent up)
        const forearmAngle = -Math.PI / 2 + (1 - flex) * Math.PI / 2;
        const handX = elbowX + Math.cos(forearmAngle) * forearmLen;
        const handY = elbowY + Math.sin(forearmAngle) * forearmLen;

        // Draw upper arm bone
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, shoulderY);
        ctx.lineTo(elbowX, elbowY);
        ctx.stroke();

        // Draw forearm bone
        ctx.beginPath();
        ctx.moveTo(elbowX, elbowY);
        ctx.lineTo(handX, handY);
        ctx.stroke();

        // Bone labels
        ctx.fillStyle = '#64748b';
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Upper arm', cx + 16, shoulderY + 60);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('Forearm', elbowX + 16, elbowY + (handY - elbowY) / 2);

        // Bicep muscle (red elastic band)
        const bicepTopX = cx + 8;
        const bicepTopY = shoulderY + 20;
        const bicepBottomX = elbowX + Math.cos(forearmAngle) * 30;
        const bicepBottomY = elbowY + Math.sin(forearmAngle) * 30;
        const bicepLen = Math.sqrt((bicepBottomX - bicepTopX) ** 2 + (bicepBottomY - bicepTopY) ** 2);
        const bulge = Math.max(6, 20 - bicepLen / 15);

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = bulge;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(bicepTopX, bicepTopY);
        // Curved muscle
        const midX = (bicepTopX + bicepBottomX) / 2 - bulge * 1.5;
        const midY = (bicepTopY + bicepBottomY) / 2;
        ctx.quadraticCurveTo(midX, midY, bicepBottomX, bicepBottomY);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('Bicep 💪', midX - 12, midY);

        // Elbow joint circle
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(elbowX, elbowY, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (showLeverLabel) {
            ctx.fillStyle = '#3b82f6';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('⚙️ Fulcrum (Elbow)', elbowX, elbowY + 28);
        }

        // Shoulder joint
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(cx, shoulderY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Hand circle
        ctx.fillStyle = '#fcd34d';
        ctx.beginPath();
        ctx.arc(handX, handY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Backpack hanging from hand
        const bpW = 35;
        const bpH = 30 + backpackWeight * 2;
        const bpX = handX - bpW / 2;
        const bpY = handY + 10;

        ctx.fillStyle = '#6366f1';
        ctx.fillRect(bpX, bpY, bpW, bpH);
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        ctx.strokeRect(bpX, bpY, bpW, bpH);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${backpackWeight}kg`, handX, bpY + bpH / 2 + 4);

        // Strap line
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(handX, handY + 8);
        ctx.lineTo(handX, bpY);
        ctx.stroke();

        // Pull arrow on muscle
        if (showPullArrow) {
            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 3;
            const arrowStartX = bicepBottomX - 5;
            const arrowStartY = bicepBottomY;
            const arrowEndX = bicepTopX - 5;
            const arrowEndY = bicepTopY + 15;
            ctx.beginPath();
            ctx.moveTo(arrowStartX, arrowStartY);
            ctx.lineTo(arrowEndX, arrowEndY);
            ctx.stroke();
            // Head
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.moveTo(arrowEndX, arrowEndY);
            ctx.lineTo(arrowEndX - 5, arrowEndY + 8);
            ctx.lineTo(arrowEndX + 5, arrowEndY + 8);
            ctx.closePath();
            ctx.fill();
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('PULL ↑', arrowStartX - 50, (arrowStartY + arrowEndY) / 2);
        }

        // Force graph with clear axis labels and units
        if (showForceGraph) {
            const gx = W - 290;
            const gy = 48;
            const gw = 250;
            const gh = 150;
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(gx, gy, gw, gh);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.strokeRect(gx, gy, gw, gh);
            ctx.fillStyle = '#64748b';
            ctx.font = '13px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('Muscle force required vs backpack weight', gx + 8, gy + 16);

            const chartX = gx + 38;
            const chartY = gy + 30;
            const chartW = gw - 58;
            const chartH = gh - 58;

            // Axes
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(chartX, chartY);
            ctx.lineTo(chartX, chartY + chartH);
            ctx.lineTo(chartX + chartW, chartY + chartH);
            ctx.stroke();

            // Axis labels
            ctx.fillStyle = '#475569';
            ctx.font = '11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Backpack weight (kg)', chartX + chartW / 2, chartY + chartH + 22);
            ctx.save();
            ctx.translate(chartX - 24, chartY + chartH / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('Muscle force needed (N)', 0, 0);
            ctx.restore();

            const maxWeight = 10;
            const maxForce = 180;

            // Ticks and light grid
            ctx.strokeStyle = 'rgba(148,163,184,0.35)';
            ctx.lineWidth = 1;
            ctx.fillStyle = '#64748b';
            ctx.font = '10px monospace';
            for (let kg = 2; kg <= 10; kg += 2) {
                const x = chartX + (kg / maxWeight) * chartW;
                ctx.beginPath();
                ctx.moveTo(x, chartY);
                ctx.lineTo(x, chartY + chartH);
                ctx.stroke();
                ctx.textAlign = 'center';
                ctx.fillText(`${kg}`, x, chartY + chartH + 12);
            }
            for (let force = 60; force <= 180; force += 60) {
                const y = chartY + chartH - (force / maxForce) * chartH;
                ctx.beginPath();
                ctx.moveTo(chartX, y);
                ctx.lineTo(chartX + chartW, y);
                ctx.stroke();
                ctx.textAlign = 'right';
                ctx.fillText(`${force}`, chartX - 6, y + 3);
            }

            // Model line: force scales with weight for fixed lever geometry
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let kg = 1; kg <= 10; kg += 1) {
                const muscleForceN = kg * 16;
                const x = chartX + (kg / maxWeight) * chartW;
                const y = chartY + chartH - (muscleForceN / maxForce) * chartH;
                if (kg === 1) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Current selected point
            const currentForce = backpackWeight * 16;
            const px = chartX + (backpackWeight / maxWeight) * chartW;
            const py = chartY + chartH - (currentForce / maxForce) * chartH;
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(px, py, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.font = '11px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`${backpackWeight.toFixed(1)}kg -> ${Math.round(currentForce)}N`, px + 8, py - 6);
        }

        // Info box
        if (phase === 'discovery' || phase === 'complete') {
            const bx = 20;
            const by = H - 140;
            ctx.fillStyle = 'rgba(239,68,68,0.08)';
            ctx.fillRect(bx, by, 260, 55);
            ctx.strokeStyle = '#fca5a5';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, 260, 55);
            ctx.fillStyle = '#991b1b';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('Key Insight:', bx + 10, by + 18);
            ctx.font = '17px monospace';
            ctx.fillText('Muscles can only PULL (contract).', bx + 10, by + 34);
            ctx.fillText('Your elbow is a LEVER fulcrum!', bx + 10, by + 48);
        }

        // Big Idea 1 Complete banner
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(W * 0.1, H * 0.5, W * 0.8, H * 0.4);
            ctx.strokeStyle = 'rgba(34,197,94,0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(W * 0.1, H * 0.5, W * 0.8, H * 0.4);
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 1 Complete!', W / 2, H * 0.5 + 25);
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '17px monospace';
            ctx.fillText('P1: Push, Pull & Slide (forces)', W / 2, H * 0.5 + 50);
            ctx.fillText('C1: Particles on the Move (heat)', W / 2, H * 0.5 + 68);
            ctx.fillText('B1: Muscles, Bones & Levers (body)', W / 2, H * 0.5 + 86);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillText('Forces make everything move! 💪', W / 2, H * 0.5 + 112);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [armFlexed, backpackWeight, showPullArrow, showLeverLabel, showForceGraph, phase, targetAngle]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            const container = canvasHostRef.current;
            if (!canvas || !container) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const weightSliderUnlocked = (state.weightSliderUnlocked as boolean) || phase === 'predict_weight' || phase === 'heavy_flex' || phase === 'discovery' || phase === 'complete';

    return (
        <div className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <div ref={canvasHostRef} className="relative flex-grow overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block', width: '100%', height: '100%' }} />
                {phase === 'complete' && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-rose-100 border border-rose-300 rounded-full px-4 py-1.5 text-rose-700 text-xs font-bold tracking-wider uppercase">
                        ✅ Lesson Complete
                    </div>
                )}
            </div>

            <div data-lab-controls="true" className="mt-2 mb-3 flex items-center justify-center gap-3 px-4 flex-wrap">
                {weightSliderUnlocked && (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-2 flex items-center gap-3">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Backpack Weight</label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            step={0.5}
                            value={backpackWeight}
                            onChange={(e) => onStateChange?.('backpackWeight', Number(e.target.value))}
                            className="w-40 accent-rose-500"
                        />
                        <span className="text-sm font-bold text-rose-700 min-w-[52px] text-right">{backpackWeight.toFixed(1)} kg</span>
                    </div>
                )}

                <button
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${armFlexed ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}`}
                    onClick={() => onStateChange?.('armFlexed', !armFlexed)}
                >
                    {armFlexed ? 'Relax Arm' : 'Flex Arm'}
                </button>
            </div>
        </div>
    );
};

