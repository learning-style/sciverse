import { useRef, useEffect, useCallback } from 'react';

interface C8WaterCycleLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const C8WaterCycleLab = ({ state }: C8WaterCycleLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 1 / 60;
        const t = tRef.current;

        ctx.clearRect(0, 0, W, H);

        // Sky gradient background
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, '#bfdbfe');
        skyGrad.addColorStop(0.6, '#e0f2fe');
        skyGrad.addColorStop(1, '#dcfce7');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Journey of a Water Drop', W / 2, 28);

        if (phase === 'intro') {
            drawIntro(ctx, W, H, t);
        } else if (phase === 'puddle') {
            drawPuddle(ctx, W, H, t);
        } else if (phase === 'evaporation') {
            drawEvaporation(ctx, W, H, t);
        } else if (phase === 'rising') {
            drawRising(ctx, W, H, t);
        } else if (phase === 'condensation') {
            drawCondensation(ctx, W, H, t);
        } else if (phase === 'cloud') {
            drawCloud(ctx, W, H, t);
        } else if (phase === 'precipitation') {
            drawPrecipitation(ctx, W, H, t);
        } else if (phase === 'checkpoint') {
            drawCheckpoint(ctx, W, H, t);
        } else if (phase === 'discovery' || phase === 'complete') {
            drawFullCycle(ctx, W, H, t);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />
            {phase === 'complete' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-100 border border-emerald-300 rounded-full px-4 py-1.5 text-emerald-700 text-xs font-bold tracking-wider uppercase">
                    ✅ Lesson Complete
                </div>
            )}
        </div>
    );
};

// --- Drawing helpers ---

function drawSun(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) {
    // Glow
    ctx.save();
    ctx.fillStyle = 'rgba(250, 204, 21, 0.2)';
    ctx.beginPath();
    ctx.arc(x, y, r * 2, 0, Math.PI * 2);
    ctx.fill();
    // Body
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Rays
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + t * 0.3;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4));
        ctx.lineTo(x + Math.cos(a) * (r + 14 + Math.sin(t * 2 + i) * 3), y + Math.sin(a) * (r + 14 + Math.sin(t * 2 + i) * 3));
        ctx.stroke();
    }
    ctx.restore();
}

function drawRadiationArrows(ctx: CanvasRenderingContext2D, sunX: number, sunY: number, targetX: number, targetY: number, t: number, count: number) {
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    const dx = targetX - sunX;
    const dy = targetY - sunY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    for (let i = 0; i < count; i++) {
        const progress = ((t * 0.2 + i / count) % 1);
        const px = sunX + dx * progress;
        const py = sunY + dy * progress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.setLineDash([]);
    // Static dashed line
    ctx.globalAlpha = 0.25;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(sunX + (dx / dist) * 30, sunY + (dy / dist) * 30);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawGround(ctx: CanvasRenderingContext2D, W: number, H: number) {
    const groundY = H * 0.78;
    const grad = ctx.createLinearGradient(0, groundY, 0, H);
    grad.addColorStop(0, '#86efac');
    grad.addColorStop(1, '#166534');
    ctx.fillStyle = grad;
    ctx.fillRect(0, groundY, W, H - groundY);

    // Grass tufts
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 20; i++) {
        const gx = (i / 20) * W + 10;
        ctx.beginPath();
        ctx.moveTo(gx, groundY);
        ctx.lineTo(gx - 3, groundY - 8);
        ctx.moveTo(gx, groundY);
        ctx.lineTo(gx + 3, groundY - 6);
        ctx.stroke();
    }
}

function drawPuddleWater(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, t: number) {
    ctx.save();
    // Water body
    ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    ctx.fill();
    // Surface ripple
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.3, w * 0.7 + Math.sin(t * 2) * 3, h * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function drawTrackedDrop(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    // Highlighted "Droplet" — the tracked water molecule
    ctx.save();
    ctx.fillStyle = '#f43f5e';
    ctx.strokeStyle = '#be123c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Label
    ctx.fillStyle = '#be123c';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Droplet', x, y + r + 12);
    ctx.restore();
}

function drawWaterDot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawCloudShape(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, h, 0, Math.PI * 2);
    ctx.arc(x - w * 0.35, y + h * 0.2, h * 0.7, 0, Math.PI * 2);
    ctx.arc(x + w * 0.35, y + h * 0.15, h * 0.75, 0, Math.PI * 2);
    ctx.arc(x - w * 0.15, y - h * 0.3, h * 0.6, 0, Math.PI * 2);
    ctx.arc(x + w * 0.15, y - h * 0.25, h * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawRaindrop(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.save();
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.quadraticCurveTo(x + size * 0.6, y, x, y + size * 0.5);
    ctx.quadraticCurveTo(x - size * 0.6, y, x, y - size);
    ctx.fill();
    ctx.restore();
}

function drawCycleArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, curveDir: number) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    const mx = (x1 + x2) / 2 + curveDir * 30;
    const my = (y1 + y2) / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(mx, my, x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
    // Arrowhead
    const angle = Math.atan2(y2 - my, x2 - mx);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 8 * Math.cos(angle - 0.4), y2 - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(x2 - 8 * Math.cos(angle + 0.4), y2 - 8 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// ---- Phase renderers ----

function drawIntro(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const groundY = H * 0.78;
    const cx = W / 2;

    // Sun
    drawSun(ctx, W * 0.8, H * 0.15, 28, t);

    // Puddle
    drawPuddleWater(ctx, cx, groundY - 5, 70, 15, t);

    // Tracked drop sitting in puddle
    const dropX = cx + Math.sin(t * 2) * 3;
    const dropY = groundY - 8 + Math.cos(t * 1.8) * 1.5;
    drawTrackedDrop(ctx, dropX, dropY, 5);

    // Question marks
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('?', cx - 60 + Math.sin(t) * 5, groundY - 50);
    ctx.fillText('?', cx + 60 + Math.sin(t + 1) * 5, groundY - 40);

    // Dashed arrow going up with question mark
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, groundY - 25);
    ctx.lineTo(cx, groundY - 90);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('?', cx, groundY - 100);

    // Bottom caption
    ctx.fillStyle = '#475569';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Where does the puddle water go?', cx, H - 30);
}

function drawPuddle(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const groundY = H * 0.78;
    const cx = W / 2;
    const sunX = W * 0.8;
    const sunY = H * 0.13;

    drawSun(ctx, sunX, sunY, 30, t);

    // Radiation arrows from sun to puddle
    drawRadiationArrows(ctx, sunX, sunY, cx, groundY - 10, t, 5);

    // Puddle
    drawPuddleWater(ctx, cx, groundY - 5, 80, 18, t);

    // Jiggling molecules in puddle
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const jiggle = Math.sin(t * 4 + i) * 3;
        const mx = cx + Math.cos(angle) * 40 + jiggle;
        const my = groundY - 5 + Math.sin(angle) * 8 + Math.cos(t * 3 + i) * 2;
        drawWaterDot(ctx, mx, my, 3);
    }

    // Tracked drop in puddle
    const dropX = cx + Math.sin(t * 3) * 4;
    const dropY = groundY - 8 + Math.cos(t * 2.5) * 2;
    drawTrackedDrop(ctx, dropX, dropY, 5);

    // Label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('☀️ Sun heats the puddle', cx, 55);
    ctx.font = '17px monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Heat energy (radiation) → water molecules jiggle faster', cx, H - 30);
}

function drawEvaporation(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const groundY = H * 0.78;
    const cx = W / 2;

    drawSun(ctx, W * 0.8, H * 0.13, 28, t);

    // Shrinking puddle
    drawPuddleWater(ctx, cx, groundY - 5, 60, 12, t);

    // Blue dots rising (evaporating water molecules)
    for (let i = 0; i < 6; i++) {
        const progress = ((t * 0.25 + i * 0.16) % 1);
        const ex = cx - 30 + i * 12 + Math.sin(t + i) * 5;
        const ey = groundY - 15 - progress * (groundY * 0.4);
        const size = 3 - progress * 1.5;
        if (size > 0.5) drawWaterDot(ctx, ex, ey, size);
    }

    // Tracked drop rising
    const dropProgress = ((t * 0.15) % 1);
    const dropX = cx + Math.sin(t * 0.8) * 8;
    const dropY = groundY - 20 - dropProgress * (groundY * 0.35);
    drawTrackedDrop(ctx, dropX, dropY, 5 - dropProgress * 2);

    // State change label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporation: Liquid → Gas', cx, 55);

    ctx.fillStyle = '#3b82f6';
    ctx.font = '17px monospace';
    ctx.fillText('Water molecules escape the surface as invisible vapor', cx, H - 30);

    // Upward arrows
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        const ax = cx - 20 + i * 20;
        const ay = groundY - 40 - Math.sin(t + i) * 8;
        ctx.beginPath();
        ctx.moveTo(ax, ay + 15);
        ctx.lineTo(ax, ay);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax - 4, ay + 6);
        ctx.lineTo(ax, ay);
        ctx.lineTo(ax + 4, ay + 6);
        ctx.stroke();
    }
}

function drawRising(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const groundY = H * 0.78;
    const cx = W / 2;

    drawSun(ctx, W * 0.85, H * 0.12, 24, t);

    // Small puddle (most has evaporated)
    drawPuddleWater(ctx, cx, groundY - 5, 40, 8, t);

    // Vapor dots rising and getting smaller
    for (let i = 0; i < 8; i++) {
        const progress = ((t * 0.18 + i * 0.125) % 1);
        const ex = cx - 25 + (i % 4) * 16 + Math.sin(t * 0.7 + i) * 12;
        const ey = groundY - 30 - progress * (groundY * 0.65);
        const size = 3.5 - progress * 2.5;
        if (size > 0.3) drawWaterDot(ctx, ex, ey, size);
    }

    // Tracked drop high up
    const dropProgress = ((t * 0.12) % 1);
    const dropY = groundY - 50 - dropProgress * (groundY * 0.55);
    const dropX = cx + Math.sin(t * 0.5) * 15;
    drawTrackedDrop(ctx, dropX, dropY, Math.max(3, 5 - dropProgress * 3));

    // Temperature gradient indicator on right edge
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('Warm ↓', W - 20, groundY - 30);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('Cold ↑', W - 20, H * 0.15);

    // Gradient bar
    const barGrad = ctx.createLinearGradient(0, H * 0.15, 0, groundY - 30);
    barGrad.addColorStop(0, '#93c5fd');
    barGrad.addColorStop(1, '#fca5a5');
    ctx.fillStyle = barGrad;
    ctx.fillRect(W - 14, H * 0.18, 6, groundY - H * 0.18 - 35);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(W - 14, H * 0.18, 6, groundY - H * 0.18 - 35);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Rising: vapor cools as it climbs', cx, 55);

    ctx.fillStyle = '#475569';
    ctx.font = '17px monospace';
    ctx.fillText('Higher altitude = colder air = molecules slow down', cx, H - 30);
}

function drawCondensation(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const cx = W / 2;
    const cloudY = H * 0.3;

    drawSun(ctx, W * 0.85, H * 0.1, 22, t);

    // Dots clustering together at cloud level
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const clusterR = 25 + Math.sin(t * 0.8) * 5;
        const dx = cx + Math.cos(angle + t * 0.2) * clusterR + Math.sin(t + i) * 4;
        const dy = cloudY + Math.sin(angle + t * 0.2) * clusterR * 0.5 + Math.cos(t * 0.5 + i) * 3;
        drawWaterDot(ctx, dx, dy, 3);
    }

    // Tracked drop joining the cluster
    const dropAngle = t * 0.4;
    const dropDist = 20 + Math.sin(t * 0.6) * 8;
    drawTrackedDrop(ctx, cx + Math.cos(dropAngle) * dropDist, cloudY + Math.sin(dropAngle) * dropDist * 0.5, 5);

    // Dust particle label
    ctx.fillStyle = '#78716c';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('tiny dust particles', cx, cloudY + 50);

    // Small dust specks
    ctx.fillStyle = 'rgba(120, 113, 108, 0.4)';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(cx - 30 + i * 15, cloudY + 38, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Arrows pointing inward (vapor converging)
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const outerR = 60;
        const innerR = 35;
        const ox = cx + Math.cos(a) * outerR;
        const oy = cloudY + Math.sin(a) * outerR * 0.5;
        const ix = cx + Math.cos(a) * innerR;
        const iy = cloudY + Math.sin(a) * innerR * 0.5;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ix, iy);
        ctx.stroke();
        // Arrowhead
        const ang = Math.atan2(iy - oy, ix - ox);
        ctx.beginPath();
        ctx.moveTo(ix, iy);
        ctx.lineTo(ix - 6 * Math.cos(ang - 0.5), iy - 6 * Math.sin(ang - 0.5));
        ctx.lineTo(ix - 6 * Math.cos(ang + 0.5), iy - 6 * Math.sin(ang + 0.5));
        ctx.closePath();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.fill();
    }

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Condensation: Gas → Liquid', cx, 55);

    ctx.fillStyle = '#475569';
    ctx.font = '17px monospace';
    ctx.fillText('Cooled vapor clings to dust — tiny liquid droplets form', cx, H - 30);
}

function drawCloud(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const cx = W / 2;
    const cloudY = H * 0.28;

    drawSun(ctx, W * 0.85, H * 0.1, 22, t);

    // Cloud shape
    drawCloudShape(ctx, cx, cloudY, 90, 32);

    // Water droplets inside cloud
    for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + t * 0.15;
        const dr = 20 + Math.sin(i * 2.7) * 8;
        const dx = cx + Math.cos(angle) * dr;
        const dy = cloudY + Math.sin(angle) * dr * 0.5;
        drawWaterDot(ctx, dx, dy, 2.5);
    }

    // Tracked drop inside cloud, growing
    const growPulse = 4 + Math.sin(t * 2) * 1.5;
    drawTrackedDrop(ctx, cx + Math.sin(t * 0.7) * 10, cloudY + Math.cos(t * 0.5) * 6, growPulse);

    // Merging arrows (small drops combining)
    ctx.fillStyle = '#475569';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Droplets merge and grow heavier', cx, cloudY + 55);

    // Weight indicator — downward pull hint
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, cloudY + 40);
    ctx.lineTo(cx, cloudY + 70);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.font = '17px monospace';
    ctx.fillText('↓ gravity pulling', cx, cloudY + 82);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Cloud: billions of tiny water droplets', cx, 55);

    ctx.fillStyle = '#475569';
    ctx.font = '17px monospace';
    ctx.fillText('Droplets grow until too heavy for the air to hold', cx, H - 30);
}

function drawPrecipitation(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const groundY = H * 0.78;
    const cx = W / 2;
    const cloudY = H * 0.2;

    // Darker cloud (rain cloud)
    ctx.save();
    ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cloudY, 30, 0, Math.PI * 2);
    ctx.arc(cx - 32, cloudY + 6, 22, 0, Math.PI * 2);
    ctx.arc(cx + 32, cloudY + 4, 24, 0, Math.PI * 2);
    ctx.arc(cx - 12, cloudY - 10, 20, 0, Math.PI * 2);
    ctx.arc(cx + 14, cloudY - 8, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Rain drops falling
    for (let i = 0; i < 10; i++) {
        const rx = cx - 40 + (i % 5) * 20 + Math.sin(i * 1.7) * 5;
        const progress = ((t * 0.4 + i * 0.1) % 1);
        const ry = cloudY + 35 + progress * (groundY - cloudY - 40);
        drawRaindrop(ctx, rx, ry, 5);
    }

    // Tracked drop falling prominently
    const dropProgress = ((t * 0.3) % 1);
    const dropY = cloudY + 38 + dropProgress * (groundY - cloudY - 45);
    drawTrackedDrop(ctx, cx, dropY, 6);

    // Puddle forming at bottom
    const puddleSize = 50 + Math.sin(t) * 3;
    drawPuddleWater(ctx, cx, groundY - 5, puddleSize, 12, t);

    // Splash effect
    for (let i = 0; i < 3; i++) {
        const sp = ((t * 0.6 + i * 0.33) % 1);
        if (sp < 0.3) {
            const sx = cx - 15 + i * 15;
            const sy = groundY - 10 - sp * 30;
            ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Precipitation: rain falls back to Earth', cx, 55);

    ctx.fillStyle = '#475569';
    ctx.font = '17px monospace';
    ctx.fillText('Droplet returns to the ground — the cycle continues!', cx, H - 30);
}

function drawCheckpoint(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const cx = W / 2;
    const cloudY = H * 0.3;

    drawSun(ctx, W * 0.85, H * 0.1, 22, t);

    // Cloud with question mark
    drawCloudShape(ctx, cx, cloudY, 70, 26);

    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('?', cx, cloudY + 10);

    // Rising vapor arrows below
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
        const ax = cx - 20 + i * 20;
        const baseY = H * 0.55;
        ctx.beginPath();
        ctx.moveTo(ax, baseY + 20);
        ctx.lineTo(ax, baseY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax - 4, baseY + 6);
        ctx.lineTo(ax, baseY);
        ctx.lineTo(ax + 4, baseY + 6);
        ctx.stroke();
    }

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 19px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Checkpoint', cx, 55);

    ctx.fillStyle = '#475569';
    ctx.font = '18px monospace';
    ctx.fillText('What causes clouds to form?', cx, 75);

    // Hint labels
    ctx.fillStyle = '#64748b';
    ctx.font = '17px monospace';
    ctx.fillText('vapor rises...', cx, H * 0.55 + 40);
    ctx.fillText('temperature drops...', cx, H * 0.55 + 55);
    ctx.fillText('then what?', cx, H * 0.55 + 70);
}

function drawFullCycle(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
    drawGround(ctx, W, H);
    const groundY = H * 0.78;
    const cx = W / 2;
    const sunX = W * 0.82;
    const sunY = H * 0.1;
    const cloudX = W * 0.35;
    const cloudY = H * 0.18;

    // Sun
    drawSun(ctx, sunX, sunY, 26, t);

    // Radiation arrows to puddle
    drawRadiationArrows(ctx, sunX, sunY, cx + 30, groundY - 15, t, 3);

    // Puddle / lake
    drawPuddleWater(ctx, cx + 30, groundY - 5, 60, 14, t);

    // Cloud
    drawCloudShape(ctx, cloudX, cloudY, 65, 24);

    // --- Cycle arrows ---
    // Evaporation arrow (puddle → up)
    drawCycleArrow(ctx, cx + 30, groundY - 25, cx, groundY * 0.45, '#f59e0b', 15);
    // Rising arrow (mid → cloud)
    drawCycleArrow(ctx, cx, groundY * 0.42, cloudX + 20, cloudY + 30, '#60a5fa', -10);
    // Precipitation arrow (cloud → ground)
    drawCycleArrow(ctx, cloudX - 10, cloudY + 28, W * 0.2, groundY - 10, '#6366f1', -15);
    // Collection arrow (ground back to puddle)
    drawCycleArrow(ctx, W * 0.2, groundY - 5, cx - 25, groundY - 5, '#22c55e', 8);

    // Labels on arrows
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Evaporation', cx + 55, groundY * 0.55);
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('Rising &', cx - 35, groundY * 0.35);
    ctx.fillText('Condensation', cx - 35, groundY * 0.35 + 12);
    ctx.fillStyle = '#6366f1';
    ctx.fillText('Precipitation', W * 0.13, groundY * 0.55);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('Collection', W * 0.3, groundY + 14);

    // Rain drops from cloud
    for (let i = 0; i < 4; i++) {
        const progress = ((t * 0.35 + i * 0.25) % 1);
        const rx = cloudX - 15 + i * 8;
        const ry = cloudY + 30 + progress * (groundY - cloudY - 45);
        drawRaindrop(ctx, rx, ry, 4);
    }

    // Evaporation dots from puddle
    for (let i = 0; i < 4; i++) {
        const progress = ((t * 0.2 + i * 0.25) % 1);
        const ex = cx + 15 + i * 8;
        const ey = groundY - 20 - progress * 60;
        const size = 2.5 - progress * 1.5;
        if (size > 0.3) drawWaterDot(ctx, ex, ey, size);
    }

    // Tracked molecule circling through the whole cycle
    const cycleProgress = ((t * 0.06) % 1);
    let dropX: number, dropY: number;
    if (cycleProgress < 0.25) {
        // Evaporating (puddle → up)
        const p = cycleProgress / 0.25;
        dropX = cx + 30 + (cx - cx - 30) * p * 0.5;
        dropY = groundY - 20 - p * (groundY * 0.35);
    } else if (cycleProgress < 0.5) {
        // Rising to cloud
        const p = (cycleProgress - 0.25) / 0.25;
        dropX = cx + (cloudX - cx) * p;
        dropY = groundY * 0.45 - p * (groundY * 0.45 - cloudY - 5);
    } else if (cycleProgress < 0.75) {
        // Falling as rain
        const p = (cycleProgress - 0.5) / 0.25;
        dropX = cloudX - 5 + (W * 0.2 - cloudX + 5) * p;
        dropY = cloudY + 28 + p * (groundY - cloudY - 35);
    } else {
        // Flowing back to puddle
        const p = (cycleProgress - 0.75) / 0.25;
        dropX = W * 0.2 + (cx + 30 - W * 0.2) * p;
        dropY = groundY - 8;
    }
    drawTrackedDrop(ctx, dropX, dropY, 5);

    // Title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('The Complete Water Cycle ♻️', cx, H - 25);
}

