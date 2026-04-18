import { useCallback, useEffect, useRef, useState } from 'react';

interface P26WeatherLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P26WeatherLab = ({ state, onStateChange }: P26WeatherLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [sunHeat, setSunHeat] = useState(30);
    const phase = (state.phase as string) || 'intro';

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        const safeRight = W - 285;
        const midX = safeRight / 2;
        const heatIntensity = sunHeat / 100;

        // ---- Sky gradient: warm on left, cool on right ----
        const skyGrad = ctx.createLinearGradient(0, 0, safeRight, 0);
        const warmR = Math.round(135 + heatIntensity * 120);
        const warmG = Math.round(206 - heatIntensity * 100);
        const warmB = Math.round(235 - heatIntensity * 180);
        skyGrad.addColorStop(0, `rgb(${warmR},${warmG},${warmB})`);
        skyGrad.addColorStop(0.5, '#e0f2fe');
        skyGrad.addColorStop(1, '#bfdbfe');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        const groundY = H * 0.7;

        // ---- Ground: warm sand left, green grass right ----
        const groundGrad = ctx.createLinearGradient(0, groundY, safeRight, groundY);
        groundGrad.addColorStop(0, '#d4a056');
        groundGrad.addColorStop(0.45, '#c2956b');
        groundGrad.addColorStop(0.55, '#4ade80');
        groundGrad.addColorStop(1, '#22c55e');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, groundY, safeRight, H - groundY);

        // ---- Sun ----
        const sunSize = 30 + heatIntensity * 20;
        const sunGlow = 10 + heatIntensity * 25;
        ctx.save();
        ctx.beginPath();
        ctx.arc(midX * 0.45, H * 0.15, sunSize, 0, Math.PI * 2);
        ctx.fillStyle = '#fde047';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = sunGlow;
        ctx.fill();
        ctx.restore();

        // Sun rays
        ctx.save();
        ctx.strokeStyle = '#fcd34d';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5 + heatIntensity * 0.4;
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + t * 0.3;
            const inner = sunSize + 5;
            const outer = sunSize + 12 + heatIntensity * 12;
            ctx.beginPath();
            ctx.moveTo(midX * 0.45 + Math.cos(angle) * inner, H * 0.15 + Math.sin(angle) * inner);
            ctx.lineTo(midX * 0.45 + Math.cos(angle) * outer, H * 0.15 + Math.sin(angle) * outer);
            ctx.stroke();
        }
        ctx.restore();

        // ---- WARM AIR PARTICLES rising (bold black dots) ----
        const warmParticleCount = Math.floor(4 + heatIntensity * 12);
        const riseZoneLeft = 20;
        const riseZoneRight = midX * 0.85;
        ctx.save();
        for (let i = 0; i < warmParticleCount; i++) {
            const baseX = riseZoneLeft + ((i * 37 + 11) % (riseZoneRight - riseZoneLeft));
            const speed = 0.3 + heatIntensity * 0.7;
            const riseHeight = groundY - H * 0.12;
            const progress = ((t * speed + i * 0.12) % 1);
            const py = groundY - 15 - progress * riseHeight;
            const px = baseX + Math.sin(t * 1.5 + i * 2.3) * (8 + heatIntensity * 6);
            const size = 4 + heatIntensity * 4;

            // Bold black circle with red outline
            ctx.globalAlpha = 0.7 + heatIntensity * 0.3;
            ctx.fillStyle = '#000000';
            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Upward arrow tail on each particle
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py + size + 1);
            ctx.lineTo(px, py + size + 8);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Rising warm air ARROW (left side) ----
        const arrowScale = 0.3 + heatIntensity * 0.7;
        const arrowX = midX * 0.45;
        const arrowBaseY = groundY - 30;
        const arrowLen = 50 * arrowScale + 30;
        const arrowBob = Math.sin(t * 2) * 5 * arrowScale;

        ctx.save();
        ctx.globalAlpha = 0.5 + heatIntensity * 0.5;
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 3 + arrowScale * 4;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowBaseY + arrowBob);
        ctx.lineTo(arrowX, arrowBaseY - arrowLen + arrowBob);
        ctx.stroke();
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowBaseY - arrowLen - 10 + arrowBob);
        ctx.lineTo(arrowX - 8 - arrowScale * 4, arrowBaseY - arrowLen + 6 + arrowBob);
        ctx.lineTo(arrowX + 8 + arrowScale * 4, arrowBaseY - arrowLen + 6 + arrowBob);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Label: warm air (bold italic, high-contrast dark brown + white outline)
        ctx.save();
        ctx.font = 'bold italic 17px sans-serif';
        ctx.textAlign = 'center';
        ctx.globalAlpha = 0.7 + heatIntensity * 0.3;
        const warmLabelX = arrowX;
        const warmLabelY = arrowBaseY - arrowLen - 20 + arrowBob;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.strokeText('Warm air rises', warmLabelX, warmLabelY);
        ctx.fillStyle = '#7c2d12';
        ctx.fillText('Warm air rises', warmLabelX, warmLabelY);
        ctx.restore();

        // ---- COOL AIR PARTICLES flowing horizontally (right to left, near ground) ----
        const coolParticleCount = Math.floor(3 + heatIntensity * 10);
        const coolStartX = safeRight * 0.85;
        const coolEndX = midX * 0.5;
        const coolLaneTop = groundY - 40;
        const coolLaneBot = groundY - 8;
        ctx.save();
        for (let i = 0; i < coolParticleCount; i++) {
            const speed = 0.2 + heatIntensity * 0.6;
            const progress = ((t * speed + i * (1 / coolParticleCount)) % 1);
            const px = coolStartX - progress * (coolStartX - coolEndX);
            const laneY = coolLaneTop + ((i * 17) % (coolLaneBot - coolLaneTop));
            const py = laneY + Math.sin(t * 2 + i * 1.7) * 4;
            const size = 4 + heatIntensity * 3;

            // Bold black circle with blue outline
            ctx.globalAlpha = 0.6 + heatIntensity * 0.4;
            ctx.fillStyle = '#000000';
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Leftward arrow tail
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px + size + 1, py);
            ctx.lineTo(px + size + 8, py);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Wind ARROW (cool side to warm side, near ground) ----
        const windArrowY = groundY - 22;
        const windStartX = safeRight * 0.78;
        const windLen = (windStartX - midX * 0.6) * arrowScale;
        const windActualEnd = windStartX - windLen;

        ctx.save();
        ctx.globalAlpha = 0.4 + heatIntensity * 0.6;
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 3 + arrowScale * 5;
        ctx.beginPath();
        ctx.moveTo(windStartX, windArrowY);
        ctx.lineTo(windActualEnd, windArrowY);
        ctx.stroke();
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.moveTo(windActualEnd - 10, windArrowY);
        ctx.lineTo(windActualEnd + 8, windArrowY - 7 - arrowScale * 4);
        ctx.lineTo(windActualEnd + 8, windArrowY + 7 + arrowScale * 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Label: cool air (bold italic, right-aligned, high-contrast dark navy + white outline)
        ctx.save();
        ctx.font = 'bold italic 17px sans-serif';
        ctx.textAlign = 'right';
        ctx.globalAlpha = 0.6 + heatIntensity * 0.4;
        const coolLabelX = safeRight - 12;
        const coolLabelY = windArrowY - 20;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.strokeText('Cool air rushes in', coolLabelX, coolLabelY);
        ctx.fillStyle = '#1e3a5f';
        ctx.fillText('Cool air rushes in', coolLabelX, coolLabelY);
        ctx.restore();

        // ---- Ground labels (positioned safely above ground edge with outlines) ----
        ctx.save();
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        // HOT SIDE label
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText('HOT SIDE', midX * 0.45, groundY + 20);
        ctx.fillStyle = '#7c2d12';
        ctx.fillText('HOT SIDE', midX * 0.45, groundY + 20);
        // COOL SIDE label
        ctx.strokeStyle = '#ffffff';
        ctx.strokeText('COOL SIDE', safeRight * 0.75, groundY + 20);
        ctx.fillStyle = '#14532d';
        ctx.fillText('COOL SIDE', safeRight * 0.75, groundY + 20);
        ctx.restore();

        // ---- Grass tufts on cool side ----
        ctx.save();
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
            const gx = midX + 40 + i * 35;
            if (gx > safeRight - 10) break;
            ctx.beginPath();
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx - 3, groundY - 10);
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx + 3, groundY - 12);
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx, groundY - 14);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Small tree on cool side ----
        const treeX = safeRight * 0.7;
        ctx.save();
        ctx.fillStyle = '#78350f';
        ctx.fillRect(treeX - 4, groundY - 45, 8, 45);
        ctx.beginPath();
        ctx.arc(treeX, groundY - 55, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#16a34a';
        ctx.fill();
        ctx.restore();

        // ---- Complete overlay ----
        if (phase === 'complete') {
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText('Big Idea 26 -- P26 Complete!', W / 2, H / 2 - 14);
            ctx.font = '16px sans-serif';
            ctx.fillText('Hot Side, Cold Side', W / 2, H / 2 + 16);
            ctx.restore();
        }

        animRef.current = requestAnimationFrame(draw);
    }, [sunHeat, phase]);

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
        const canvas = canvasRef.current;
        if (canvas) { canvas.width = node.clientWidth; canvas.height = node.clientHeight; }
        animRef.current = requestAnimationFrame(draw);
        return () => { obs.disconnect(); cancelAnimationFrame(animRef.current); };
    }, [draw]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <canvas ref={canvasRef} className="block w-full h-full" />
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[240px] shadow-md z-10">
                <label className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                    Sun Heat
                    <span className="text-orange-600 font-mono">{sunHeat}</span>
                </label>
                <input type="range" min={0} max={100} value={sunHeat}
                    onChange={e => { setSunHeat(+e.target.value); onStateChange('sunHeat', +e.target.value); }}
                    className="w-full accent-orange-500" />
            </div>
        </div>
    );
};
