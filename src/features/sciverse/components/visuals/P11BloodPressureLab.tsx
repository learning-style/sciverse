import { useCallback, useEffect, useRef, useState } from 'react';

interface P11BloodPressureLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P11BloodPressureLab = ({ state, onStateChange }: P11BloodPressureLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [heartRate, setHeartRate] = useState(70);
    const phase = (state.phase as string) || 'intro';
    const showArteryControl = (state.showArteryControl as boolean) || phase === 'show_plaque' || phase === 'artery_demo';
    const [arteryWidth, setArteryWidth] = useState(100);

    // Derived blood pressure
    const systolic = Math.round(80 + (heartRate / 70) * 40 * (100 / arteryWidth));
    const diastolic = Math.round(40 + (heartRate / 70) * 20 * (100 / arteryWidth));
    const bpCategory = systolic < 120 ? 'Normal' : systolic < 130 ? 'Elevated' : systolic < 140 ? 'High' : 'Danger';
    const bpColor = systolic < 120 ? '#22c55e' : systolic < 130 ? '#eab308' : systolic < 140 ? '#f97316' : '#ef4444';

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        // Background
        ctx.fillStyle = '#eff6ff';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;
        const hrNorm = (heartRate - 40) / 120; // 40-160 range normalized

        // ---- Title ----
        ctx.textAlign = 'center';
        ctx.font = 'bold 16px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('The Pumping Heart', safeRight / 2, 24);
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText('The Pumping Heart', safeRight / 2, 24);

        // ---- BP readout ----
        ctx.font = 'bold 14px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText(systolic + '/' + diastolic + ' mmHg  |  ' + heartRate + ' BPM  |  ' + bpCategory, safeRight / 2, 46);
        ctx.fillStyle = bpColor;
        ctx.fillText(systolic + '/' + diastolic + ' mmHg  |  ' + heartRate + ' BPM  |  ' + bpCategory, safeRight / 2, 46);

        // ---- Beating heart (left) ----
        const heartX = safeRight * 0.18;
        const heartY = H * 0.38;
        const beatFreq = 1 + hrNorm * 7;
        const beatPhase = Math.sin(t * beatFreq);
        const heartScale = 0.85 + beatPhase * 0.15;

        ctx.save();
        ctx.translate(heartX, heartY);
        ctx.scale(heartScale, heartScale);
        ctx.beginPath();
        ctx.moveTo(0, 12);
        ctx.bezierCurveTo(-28, -12, -40, -35, -20, -40);
        ctx.bezierCurveTo(-8, -45, 0, -32, 0, -24);
        ctx.bezierCurveTo(0, -32, 8, -45, 20, -40);
        ctx.bezierCurveTo(40, -35, 28, -12, 0, 12);
        ctx.closePath();
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();

        ctx.textAlign = 'center';
        ctx.font = 'bold 15px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('HEART', heartX, heartY + 50);
        ctx.fillStyle = '#991b1b';
        ctx.fillText('HEART', heartX, heartY + 50);
        ctx.font = 'bold 13px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText(heartRate + ' BPM', heartX, heartY + 66);
        ctx.fillStyle = '#b91c1c';
        ctx.fillText(heartRate + ' BPM', heartX, heartY + 66);

        // ---- Blood vessel / artery (center) ----
        const tubeX = safeRight * 0.48;
        const tubeY = heartY;
        const tubeLen = Math.min(140, safeRight * 0.28);
        const fullH = 28;
        const aw = arteryWidth / 100;
        const openH = fullH * aw;

        // Outer artery wall
        ctx.fillStyle = '#fecaca';
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(tubeX - tubeLen / 2, tubeY - fullH / 2, tubeLen, fullH, 10);
        ctx.fill();
        ctx.stroke();

        // Plaque buildup (if narrowed)
        if (arteryWidth < 95) {
            const plaqueH = (fullH - openH) / 2;
            ctx.fillStyle = '#92400e';
            // Top plaque
            ctx.beginPath();
            ctx.roundRect(tubeX - tubeLen / 2 + 2, tubeY - fullH / 2 + 2, tubeLen - 4, plaqueH, 4);
            ctx.fill();
            // Bottom plaque
            ctx.beginPath();
            ctx.roundRect(tubeX - tubeLen / 2 + 2, tubeY + fullH / 2 - plaqueH - 2, tubeLen - 4, plaqueH, 4);
            ctx.fill();
        }

        // Inner blood flow
        ctx.fillStyle = '#fca5a5';
        ctx.beginPath();
        ctx.roundRect(tubeX - tubeLen / 2 + 4, tubeY - openH / 2, tubeLen - 8, openH, 6);
        ctx.fill();

        // Flowing RBCs
        const cellCount = 8;
        const cellSpeed = 0.1 + hrNorm * 0.55;
        ctx.save();
        for (let i = 0; i < cellCount; i++) {
            const progress = ((t * cellSpeed + i / cellCount) % 1);
            const cx = tubeX - tubeLen / 2 + 8 + progress * (tubeLen - 16);
            const cy = tubeY + Math.sin(i * 2.3 + t) * (openH * 0.2);
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.ellipse(cx, cy, 5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Direction arrow
        ctx.fillStyle = '#2563eb';
        const arrowX = tubeX + tubeLen / 2 + 6;
        ctx.beginPath();
        ctx.moveTo(arrowX, tubeY - 7);
        ctx.lineTo(arrowX + 14, tubeY);
        ctx.lineTo(arrowX, tubeY + 7);
        ctx.fill();

        // Vessel label
        ctx.textAlign = 'center';
        ctx.font = 'bold 15px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('ARTERY', tubeX, tubeY + fullH / 2 + 20);
        ctx.fillStyle = '#991b1b';
        ctx.fillText('ARTERY', tubeX, tubeY + fullH / 2 + 20);

        if (arteryWidth < 80) {
            ctx.font = 'bold 12px monospace';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('Plaque buildup!', tubeX, tubeY + fullH / 2 + 36);
            ctx.fillStyle = '#9a3412';
            ctx.fillText('Plaque buildup!', tubeX, tubeY + fullH / 2 + 36);
        }

        // ---- Pressure gauge (right) ----
        const gaugeX = safeRight * 0.82;
        const gaugeY = heartY;
        const gaugeR = 34;
        const pressNorm = Math.min(1, (systolic - 60) / 140);

        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI * 2);
        ctx.fillStyle = '#f3e8ff';
        ctx.fill();
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Color arc
        const startAngle = Math.PI * 0.75;
        const endAngle = startAngle + pressNorm * Math.PI * 1.5;
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeR - 5, startAngle, endAngle);
        ctx.strokeStyle = bpColor;
        ctx.lineWidth = 6;
        ctx.stroke();

        // Needle with beat bounce
        const needleBounce = beatPhase > 0 ? beatPhase * 0.05 : 0;
        const needleAngle = startAngle + (pressNorm + needleBounce) * Math.PI * 1.5;
        ctx.beginPath();
        ctx.moveTo(gaugeX, gaugeY);
        ctx.lineTo(gaugeX + Math.cos(needleAngle) * (gaugeR - 10), gaugeY + Math.sin(needleAngle) * (gaugeR - 10));
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();

        // Gauge labels
        ctx.textAlign = 'center';
        ctx.font = 'bold 15px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('PRESSURE', gaugeX, gaugeY + gaugeR + 20);
        ctx.fillStyle = '#581c87';
        ctx.fillText('PRESSURE', gaugeX, gaugeY + gaugeR + 20);
        ctx.font = 'bold 13px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText(systolic + '/' + diastolic, gaugeX, gaugeY + gaugeR + 36);
        ctx.fillStyle = bpColor;
        ctx.fillText(systolic + '/' + diastolic, gaugeX, gaugeY + gaugeR + 36);

        // ---- Connecting arrow heart -> artery ----
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(heartX + 32, heartY);
        ctx.lineTo(tubeX - tubeLen / 2 - 8, tubeY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(tubeX - tubeLen / 2 - 8, tubeY - 5);
        ctx.lineTo(tubeX - tubeLen / 2, tubeY);
        ctx.lineTo(tubeX - tubeLen / 2 - 8, tubeY + 5);
        ctx.fill();

        // ---- Bottom explanation ----
        const explainY = H * 0.70;
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        const explainText = systolic >= 140
            ? 'Danger! Very high blood pressure!'
            : systolic >= 130
            ? 'High blood pressure -- heart working too hard.'
            : systolic >= 120
            ? 'Slightly elevated -- keep an eye on it.'
            : 'Nice and healthy blood pressure!';
        ctx.strokeText(explainText, safeRight / 2, explainY);
        ctx.fillStyle = bpColor;
        ctx.fillText(explainText, safeRight / 2, explainY);

        ctx.font = 'bold 12px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText('Blood pressure = force on artery walls', safeRight / 2, explainY + 22);
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText('Blood pressure = force on artery walls', safeRight / 2, explainY + 22);

        // ---- Complete overlay ----
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.56);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.fillText('Big Idea 11 -- P11 Complete!', W / 2, H * 0.28);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do We Stay Healthy?', W / 2, H * 0.36);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P11 The Pumping Heart', W / 2, H * 0.44);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C11 Acids & Bases in the Body', W / 2, H * 0.50);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B11 The Immune System', W / 2, H * 0.56);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Pump, balance, defend -- keeping you healthy!', W / 2, H * 0.64);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [heartRate, arteryWidth, systolic, diastolic, bpColor, bpCategory, phase]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[210px] shadow-md z-10">
                <label className="text-[13px] font-bold text-red-600">Heart Rate: {heartRate} BPM</label>
                <input className="w-full accent-red-500 mb-1" type="range" min={40} max={160} value={heartRate}
                    onChange={e => { const v = Number(e.target.value); setHeartRate(v); onStateChange('heartRate', v); }} />
                {showArteryControl && (
                    <>
                        <label className="text-[13px] font-bold text-orange-600">Artery Width: {arteryWidth}%</label>
                        <input className="w-full accent-orange-500" type="range" min={40} max={100} value={arteryWidth}
                            onChange={e => { const v = Number(e.target.value); setArteryWidth(v); onStateChange('arteryWidth', v); }} />
                    </>
                )}
            </div>
        </div>
    );
};
