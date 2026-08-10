import { useCallback, useEffect, useRef, useState } from 'react';

interface C26WeatherLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C26WeatherLab = ({ state, onStateChange }: C26WeatherLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [moisture, setMoisture] = useState(20);
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
        const mFrac = moisture / 100;

        // ---- Sky ----
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
        const blueShift = Math.round(220 - mFrac * 70);
        skyGrad.addColorStop(0, `rgb(${135 - mFrac * 40}, ${blueShift}, 250)`);
        skyGrad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        const groundY = H * 0.72;

        // ---- Ground (green grass) ----
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(0, groundY, W, H - groundY);
        // Darker edge at grass top
        const grassEdge = ctx.createLinearGradient(0, groundY, 0, groundY + 12);
        grassEdge.addColorStop(0, '#16a34a');
        grassEdge.addColorStop(1, 'transparent');
        ctx.fillStyle = grassEdge;
        ctx.fillRect(0, groundY, safeRight, 12);

        // ---- Pond ----
        const pondCX = safeRight * 0.42;
        const pondRX = safeRight * 0.26;
        const pondRY = 32;
        const pondY = groundY + 22;
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(pondCX, pondY, pondRX, pondRY, 0, 0, Math.PI * 2);
        const pondGrad = ctx.createRadialGradient(pondCX, pondY, 0, pondCX, pondY, pondRX);
        pondGrad.addColorStop(0, '#60a5fa');
        pondGrad.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = pondGrad;
        ctx.fill();
        // Bold pond outline
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // Pond shimmer
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 2.5;
        for (let i = 0; i < 4; i++) {
            const sx = pondCX - pondRX * 0.5 + i * pondRX * 0.35;
            const sy = pondY - 5 + Math.sin(t * 2 + i) * 4;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + 24, sy);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Sun ----
        const sunX = safeRight * 0.15;
        const sunY = H * 0.12;
        const sunR = 38 + mFrac * 10;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
        ctx.fillStyle = '#fde047';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 28;
        ctx.fill();
        ctx.restore();
        // Rays
        ctx.save();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.7;
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2 + t * 0.3;
            ctx.beginPath();
            ctx.moveTo(sunX + Math.cos(angle) * (sunR + 5), sunY + Math.sin(angle) * (sunR + 5));
            ctx.lineTo(sunX + Math.cos(angle) * (sunR + 22), sunY + Math.sin(angle) * (sunR + 22));
            ctx.stroke();
        }
        ctx.restore();

        // ---- Vapor particles rising from pond (bold black + blue outline) ----
        const vaporCount = Math.floor(4 + mFrac * 16);
        const cloudZoneTop = H * 0.15;
        const cloudZoneBot = H * 0.32;
        ctx.save();
        for (let i = 0; i < vaporCount; i++) {
            const speed = 0.15 + mFrac * 0.5;
            const progress = ((t * speed + i * 0.08) % 1);
            const startY = pondY - 12;
            const endY = cloudZoneTop;
            const py = startY - progress * (startY - endY);
            const px = pondCX + (i - vaporCount / 2) * 14 + Math.sin(t + i * 1.8) * 10;

            if (px > safeRight - 10) continue;

            const size = 5 + mFrac * 3;
            ctx.globalAlpha = 0.5 + mFrac * 0.4 * (1 - progress * 0.5);
            ctx.fillStyle = '#000000';
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Upward tail
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px, py + size + 1);
            ctx.lineTo(px, py + size + 7);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Upward arrow from pond to clouds ----
        if (mFrac > 0.1) {
            const arrowX = pondCX;
            const arrowBot = pondY - 20;
            const arrowTop = cloudZoneBot + 10;
            const arrowAlpha = Math.min(1, mFrac * 1.5);
            ctx.save();
            ctx.globalAlpha = arrowAlpha * 0.7;
            ctx.strokeStyle = '#1d4ed8';
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 5]);
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowBot);
            ctx.lineTo(arrowX, arrowTop);
            ctx.stroke();
            ctx.setLineDash([]);
            // Arrowhead
            ctx.fillStyle = '#1d4ed8';
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowTop - 8);
            ctx.lineTo(arrowX - 7, arrowTop + 3);
            ctx.lineTo(arrowX + 7, arrowTop + 3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Label -- simple bold red, no stroke overlay
            ctx.save();
            ctx.globalAlpha = arrowAlpha;
            ctx.font = '900 italic 18px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#dc2626';
            ctx.fillText('Water vapor rises', arrowX, groundY - 20);
            ctx.restore();
        }

        // ---- Clouds forming at top ----
        const cloudAlpha = Math.max(0, (mFrac - 0.15) / 0.85);
        if (cloudAlpha > 0) {
            const cloudCenters = [
                { x: safeRight * 0.25, y: cloudZoneTop + 20, r: 40 },
                { x: safeRight * 0.45, y: cloudZoneTop + 12, r: 48 },
                { x: safeRight * 0.62, y: cloudZoneTop + 22, r: 38 },
            ];
            ctx.save();
            for (const c of cloudCenters) {
                const grow = 0.5 + cloudAlpha * 0.5;
                const r = c.r * grow;
                // Darker when moisture is high
                const gray = Math.round(240 - mFrac * 120);
                ctx.globalAlpha = cloudAlpha * 0.9;
                ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
                // Main body
                ctx.beginPath();
                ctx.ellipse(c.x, c.y, r * 1.5, r * 0.85, 0, 0, Math.PI * 2);
                ctx.fill();
                // Bold outline
                ctx.strokeStyle = `rgba(80,80,80,${cloudAlpha * 0.5})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                // Fluffy bumps
                ctx.beginPath();
                ctx.arc(c.x - r * 0.55, c.y - r * 0.35, r * 0.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(c.x + r * 0.55, c.y - r * 0.25, r * 0.55, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(c.x, c.y - r * 0.5, r * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // CLOUDS label (bold, white outline)
            ctx.save();
            ctx.globalAlpha = cloudAlpha;
            ctx.font = 'bold 18px sans-serif';
            ctx.textAlign = 'center';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.strokeText('CLOUDS', safeRight * 0.45, cloudZoneTop - 6);
            ctx.fillStyle = '#1e293b';
            ctx.fillText('CLOUDS', safeRight * 0.45, cloudZoneTop - 6);
            ctx.restore();
        }

        // ---- Rain drops when moisture > 70% ----
        const rainThreshold = 0.7;
        if (mFrac > rainThreshold) {
            const rainIntensity = (mFrac - rainThreshold) / (1 - rainThreshold);
            const dropCount = Math.floor(8 + rainIntensity * 25);
            ctx.save();
            ctx.fillStyle = '#2563eb';
            for (let i = 0; i < dropCount; i++) {
                const speed = 0.6 + rainIntensity * 0.8;
                const progress = ((t * speed + i * 0.05) % 1);
                const dx = 30 + ((i * 47 + 13) % (safeRight - 60));
                const dy = cloudZoneBot + progress * (groundY - cloudZoneBot);
                const dropSize = 3.5 + rainIntensity * 3;

                ctx.globalAlpha = 0.6 + rainIntensity * 0.4;
                ctx.beginPath();
                // Fat raindrop (teardrop)
                ctx.moveTo(dx, dy - dropSize * 2.2);
                ctx.bezierCurveTo(dx - dropSize * 1.2, dy, dx - dropSize * 0.6, dy + dropSize, dx, dy + dropSize);
                ctx.bezierCurveTo(dx + dropSize * 0.6, dy + dropSize, dx + dropSize * 1.2, dy, dx, dy - dropSize * 2.2);
                ctx.fill();
            }
            ctx.restore();

            // Rain label (bold, white outline)
            ctx.save();
            ctx.globalAlpha = 0.7 + rainIntensity * 0.3;
            ctx.font = 'bold 18px sans-serif';
            ctx.textAlign = 'center';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.strokeText('RAIN', safeRight * 0.65, groundY - 18);
            ctx.fillStyle = '#1e3a8a';
            ctx.fillText('RAIN', safeRight * 0.65, groundY - 18);
            ctx.restore();

            // Splash rings on pond (bigger)
            ctx.save();
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2;
            for (let i = 0; i < 4; i++) {
                const ringProgress = ((t * 1.5 + i * 0.3) % 1);
                const ringR = 3 + ringProgress * 20;
                const rx = pondCX - 30 + i * 20;
                ctx.globalAlpha = (1 - ringProgress) * rainIntensity * 0.6;
                ctx.beginPath();
                ctx.arc(rx, pondY - 6, ringR, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
        }

        // ---- Pond label (bold, white outline) ----
        ctx.save();
        ctx.font = 'bold 17px sans-serif';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('POND', pondCX, pondY + pondRY + 18);
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText('POND', pondCX, pondY + pondRY + 18);
        ctx.restore();

        // ---- Grass tufts around pond (bigger) ----
        ctx.save();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 3;
        const tufts = [
            pondCX - pondRX - 20, pondCX - pondRX - 55,
            pondCX + pondRX + 20, pondCX + pondRX + 55,
            safeRight * 0.85
        ];
        for (const gx of tufts) {
            if (gx > safeRight - 10 || gx < 5) continue;
            ctx.beginPath();
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx - 4, groundY - 14);
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx + 4, groundY - 16);
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx, groundY - 19);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Tree on right side (bigger) ----
        const treeX = safeRight * 0.82;
        if (treeX < safeRight - 20) {
            ctx.save();
            ctx.fillStyle = '#78350f';
            ctx.fillRect(treeX - 5, groundY - 55, 10, 55);
            ctx.beginPath();
            ctx.arc(treeX, groundY - 64, 28, 0, Math.PI * 2);
            ctx.fillStyle = '#15803d';
            ctx.fill();
            ctx.strokeStyle = '#14532d';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }

        // ---- Legend (on the green grass area) ----
        ctx.save();
        const legX = safeRight - 160;
        const legY = groundY + 6;
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(legX, legY, 148, 48, 6);
        ctx.fill();
        ctx.stroke();

        // Vapor dot
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(legX + 14, legY + 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Water vapor', legX + 26, legY + 19);

        // Rain drop
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.moveTo(legX + 14, legY + 30);
        ctx.bezierCurveTo(legX + 10, legY + 37, legX + 11, legY + 40, legX + 14, legY + 40);
        ctx.bezierCurveTo(legX + 17, legY + 40, legX + 18, legY + 37, legX + 14, legY + 30);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.fillText('Rain', legX + 26, legY + 40);
        ctx.restore();

        // ---- Complete overlay ----
        if (phase === 'complete') {
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText('C26 Complete -- Cloud Factory!', W / 2, H / 2 - 14);
            ctx.font = '16px sans-serif';
            ctx.fillText('How Do We Predict Weather?', W / 2, H / 2 + 16);
            ctx.restore();
        }

        animRef.current = requestAnimationFrame(draw);
    }, [moisture, phase]);

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
                    Moisture
                    <span className="text-blue-600 font-mono">{moisture}</span>
                </label>
                <input type="range" min={0} max={100} value={moisture}
                    onChange={e => { setMoisture(+e.target.value); onStateChange('moisture', +e.target.value); }}
                    className="w-full accent-blue-500" />
            </div>
        </div>
    );
};
