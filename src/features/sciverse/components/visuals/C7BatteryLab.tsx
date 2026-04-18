import { useRef, useEffect, useCallback } from 'react';

interface C7BatteryLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const C7BatteryLab = ({ state }: C7BatteryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const ledOn = (state.ledOn as boolean) ?? false;

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
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('The Lemon Battery', W / 2, 28);

        const cx = W / 2;
        const cy = H / 2;

        if (phase === 'intro') {
            drawIntro(ctx, W, H, cx, cy, t);
        } else if (phase === 'lemon_setup') {
            drawLemonSetup(ctx, W, H, cx, cy);
        } else if (phase === 'reaction') {
            drawReaction(ctx, W, H, cx, cy, t);
        } else if (phase === 'electron_flow') {
            drawElectronFlow(ctx, W, H, cx, cy, t, ledOn);
        } else if (phase === 'real_battery') {
            drawRealBattery(ctx, W, H, cx, cy, t);
        } else if (phase === 'charging') {
            drawCharging(ctx, W, H, cx, cy, t);
        } else if (phase === 'checkpoint') {
            drawCheckpoint(ctx, W, H, cx, cy, t);
        } else if (phase === 'discovery') {
            drawDiscovery(ctx, W, H, cx, cy, t);
        } else if (phase === 'complete') {
            drawDiscovery(ctx, W, H, cx, cy, t);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, ledOn]);

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

function drawLemon(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Peel bumps
    ctx.fillStyle = '#facc15';
    for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(x + Math.cos(a) * w * 0.7, y + Math.sin(a) * h * 0.6, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawZincNail(ctx: CanvasRenderingContext2D, x: number, y: number, len: number) {
    ctx.save();
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    // Nail shaft
    ctx.fillRect(x - 3, y, 6, len);
    ctx.strokeRect(x - 3, y, 6, len);
    // Nail head
    ctx.fillRect(x - 8, y - 4, 16, 6);
    ctx.strokeRect(x - 8, y - 4, 16, 6);
    // Label
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Zn (−)', x, y - 12);
    ctx.restore();
}

function drawCopperPenny(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.fillStyle = '#f97316';
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Inner ring
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    // Label
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Cu (+)', x, y - r - 8);
    ctx.restore();
}

function drawWire(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, arcHeight: number) {
    ctx.save();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1 + x2) / 2, y1 - arcHeight, x2, y2);
    ctx.stroke();
    ctx.restore();
}

function drawElectron(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('e⁻', x, y);
    ctx.restore();
}

function drawLED(ctx: CanvasRenderingContext2D, x: number, y: number, on: boolean) {
    ctx.save();
    // Bulb body
    ctx.fillStyle = on ? '#fbbf24' : '#e5e7eb';
    ctx.strokeStyle = on ? '#f59e0b' : '#9ca3af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Glow
    if (on) {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
        // Rays
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a) * 15, y + Math.sin(a) * 15);
            ctx.lineTo(x + Math.cos(a) * 24, y + Math.sin(a) * 24);
            ctx.stroke();
        }
    }
    // Label
    ctx.fillStyle = on ? '#92400e' : '#6b7280';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(on ? '💡 LED ON' : 'LED', x, y + 26);
    ctx.restore();
}

function drawIon(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, color: string) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    ctx.restore();
}

// --- Phase renderers ---

function drawIntro(ctx: CanvasRenderingContext2D, _W: number, H: number, cx: number, cy: number, t: number) {
    // Question mark / mystery scene
    drawLemon(ctx, cx, cy, 60, 42);

    // Floating question marks
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('?', cx - 90 + Math.sin(t) * 5, cy - 20);
    ctx.fillText('?', cx + 90 + Math.sin(t + 1) * 5, cy + 10);

    // Items around lemon
    drawZincNail(ctx, cx - 100, cy + 40, 50);
    drawCopperPenny(ctx, cx + 100, cy + 50, 14);

    ctx.fillStyle = '#475569';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Can these make electricity?', cx, H - 50);

    // Arrow pointing to lemon
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx - 70, cy + 50);
    ctx.lineTo(cx - 30, cy + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 70, cy + 50);
    ctx.lineTo(cx + 30, cy + 10);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawLemonSetup(ctx: CanvasRenderingContext2D, _W: number, H: number, cx: number, cy: number) {
    // Lemon with metals inserted
    drawLemon(ctx, cx, cy + 10, 70, 48);

    // Zinc nail stuck in left side
    const znX = cx - 40;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(znX - 3, cy - 35, 6, 55);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(znX - 3, cy - 35, 6, 55);
    ctx.fillRect(znX - 8, cy - 39, 16, 6);
    ctx.strokeRect(znX - 8, cy - 39, 16, 6);
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Zinc (−)', znX, cy - 50);

    // Copper penny stuck in right side
    const cuX = cx + 40;
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.ellipse(cuX, cy - 10, 4, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Copper (+)', cuX, cy - 50);

    // Lemon juice label
    ctx.fillStyle = '#65a30d';
    ctx.font = '17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Lemon juice = electrolyte (acid)', cx, cy + 75);

    // Diagram labels
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('3 Ingredients:', cx, 56);

    const labelY = H - 60;
    ctx.font = '18px monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText('1. Anode (−) = zinc', 30, labelY);
    ctx.fillText('2. Cathode (+) = copper', 30, labelY + 18);
    ctx.fillText('3. Electrolyte = lemon juice', 30, labelY + 36);
}

function drawReaction(ctx: CanvasRenderingContext2D, _W: number, H: number, cx: number, cy: number, t: number) {
    drawLemon(ctx, cx, cy + 10, 70, 48);

    // Zinc nail
    const znX = cx - 40;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(znX - 3, cy - 30, 6, 50);
    ctx.fillRect(znX - 8, cy - 34, 16, 6);
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Zn (−)', znX, cy - 44);

    // Copper
    const cuX = cx + 40;
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.ellipse(cuX, cy - 5, 4, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 17px monospace';
    ctx.fillText('Cu (+)', cuX, cy - 44);

    // Zinc ions dissolving off the nail
    for (let i = 0; i < 4; i++) {
        const progress = ((t * 0.4 + i * 0.25) % 1);
        const ix = znX + progress * 25;
        const iy = cy - 10 + Math.sin(t * 2 + i) * 12;
        drawIon(ctx, ix, iy, 'Zn²⁺', '#6366f1');
    }

    // Electrons left behind on zinc
    for (let i = 0; i < 3; i++) {
        const ey = cy - 20 + i * 12;
        const ex = znX - 10 - Math.sin(t * 3 + i) * 3;
        drawElectron(ctx, ex, ey);
    }

    // Explanatory labels
    ctx.fillStyle = '#6366f1';
    ctx.font = '17px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Zn atoms dissolve →', znX + 20, cy + 50);
    ctx.fillText('leaving e⁻ behind!', znX + 20, cy + 64);

    // Reaction equation
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Zn → Zn²⁺ + 2e⁻', cx, H - 40);
}

function drawElectronFlow(ctx: CanvasRenderingContext2D, _W: number, _H: number, cx: number, cy: number, t: number, ledOn: boolean) {
    const lemonY = cy + 30;
    drawLemon(ctx, cx, lemonY, 60, 40);

    const znX = cx - 35;
    const cuX = cx + 35;

    // Metals in lemon (simplified)
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(znX - 2, lemonY - 25, 4, 35);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(cuX - 2, lemonY - 25, 4, 35);

    // Wire arc from zinc to copper via LED at top
    const wireTop = lemonY - 80;
    const ledY = wireTop;

    drawWire(ctx, znX, lemonY - 25, cx, wireTop + 2, 20);
    drawWire(ctx, cx, wireTop + 2, cuX, lemonY - 25, 20);

    // LED at top of wire
    drawLED(ctx, cx, ledY, ledOn);

    // Electrons flowing along wire (zinc → LED → copper)
    if (ledOn) {
        for (let i = 0; i < 5; i++) {
            const progress = ((t * 0.3 + i * 0.2) % 1);
            let ex: number, ey: number;
            if (progress < 0.5) {
                // zinc to LED
                const p = progress * 2;
                ex = znX + (cx - znX) * p;
                ey = lemonY - 25 - Math.sin(p * Math.PI) * 50;
            } else {
                // LED to copper
                const p = (progress - 0.5) * 2;
                ex = cx + (cuX - cx) * p;
                ey = lemonY - 25 - Math.sin((1 - p) * Math.PI) * 50;
            }
            drawElectron(ctx, ex, ey);
        }

        // Ion flow inside lemon
        for (let i = 0; i < 3; i++) {
            const progress = ((t * 0.25 + i * 0.33) % 1);
            const ix = cuX - (cuX - znX) * progress;
            const iy = lemonY + Math.sin(t + i) * 8;
            drawIon(ctx, ix, iy, 'H⁺', '#22c55e');
        }
    }

    // Labels
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Zn (−)', znX, lemonY + 55);
    ctx.fillText('Cu (+)', cuX, lemonY + 55);

    // Flow arrows
    ctx.fillStyle = '#3b82f6';
    ctx.font = '16px monospace';
    ctx.fillText('e⁻ flow →', cx, wireTop - 25);

    ctx.fillStyle = '#22c55e';
    ctx.fillText('← ions inside', cx, lemonY + 70);
}

function drawRealBattery(ctx: CanvasRenderingContext2D, W: number, H: number, cx: number, cy: number, t: number) {
    const batW = 80;
    const batH = 140;
    const batX = cx - batW / 2;
    const batY = cy - batH / 2;

    // Battery casing
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.fillRect(batX, batY, batW, batH);
    ctx.strokeRect(batX, batY, batW, batH);

    // Terminal nub on top
    ctx.fillStyle = '#475569';
    ctx.fillRect(cx - 10, batY - 10, 20, 12);

    // Anode zone (bottom) — zinc
    ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.fillRect(batX + 3, batY + batH * 0.6, batW - 6, batH * 0.37);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Zinc Anode (−)', cx, batY + batH * 0.85);

    // Cathode zone (top) — carbon
    ctx.fillStyle = 'rgba(30, 41, 59, 0.3)';
    ctx.fillRect(batX + 3, batY + 3, batW - 6, batH * 0.35);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 17px monospace';
    ctx.fillText('Carbon Cathode (+)', cx, batY + batH * 0.2);

    // Electrolyte zone (middle)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
    ctx.fillRect(batX + 3, batY + batH * 0.35, batW - 6, batH * 0.25);
    ctx.fillStyle = '#7c3aed';
    ctx.font = '17px monospace';
    ctx.fillText('Electrolyte', cx, batY + batH * 0.5);

    // Animated ions in electrolyte
    for (let i = 0; i < 4; i++) {
        const ix = batX + 15 + ((t * 20 + i * 18) % (batW - 30));
        const iy = batY + batH * 0.4 + Math.sin(t * 2 + i) * 8;
        drawIon(ctx, ix, iy, '+', '#7c3aed');
    }

    // Side labels
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 19px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('+', cx, batY - 18);
    ctx.fillText('−', cx, batY + batH + 18);

    // Comparison at bottom
    ctx.fillStyle = 'rgba(59, 130, 246, 0.06)';
    ctx.fillRect(20, H - 65, W - 40, 50);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, H - 65, W - 40, 50);
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Same as lemon battery — just better materials!', cx, H - 45);
    ctx.font = '16px monospace';
    ctx.fillText('Anode gives e⁻ → flow through circuit → Cathode accepts e⁻', cx, H - 28);
}

function drawCharging(ctx: CanvasRenderingContext2D, W: number, H: number, cx: number, cy: number, t: number) {
    const batW = 60;
    const batH = 100;
    const batX = cx - batW / 2;
    const batY = cy - batH / 2;

    // Battery outline
    ctx.fillStyle = '#f0fdf4';
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 2;
    ctx.fillRect(batX, batY, batW, batH);
    ctx.strokeRect(batX, batY, batW, batH);
    ctx.fillRect(cx - 8, batY - 8, 16, 10);
    ctx.strokeRect(cx - 8, batY - 8, 16, 10);

    // Charging plug symbol on left
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🔌', batX - 40, cy + 6);

    // Arrows going INTO battery (reversed direction)
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        const progress = ((t * 0.4 + i * 0.33) % 1);
        const ax = batX - 30 + progress * 30;
        const ay = cy - 15 + i * 15;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + 12, ay);
        ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(ax + 12, ay - 3);
        ctx.lineTo(ax + 16, ay);
        ctx.lineTo(ax + 12, ay + 3);
        ctx.fill();
    }

    // Electrons moving backwards (into battery)
    for (let i = 0; i < 3; i++) {
        const progress = ((t * 0.3 + i * 0.33) % 1);
        const ex = batX + batW + 30 - progress * 30;
        const ey = cy - 12 + i * 12;
        drawElectron(ctx, ex, ey);
    }

    // Fill level rising
    const fillLevel = ((t * 0.15) % 1);
    ctx.fillStyle = 'rgba(22, 163, 74, 0.2)';
    ctx.fillRect(batX + 3, batY + batH - fillLevel * (batH - 6) - 3, batW - 6, fillLevel * (batH - 6));

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Charging = Reverse Reaction', cx, 56);

    ctx.fillStyle = '#16a34a';
    ctx.font = '17px monospace';
    ctx.fillText('⬅ Electrons pushed BACK in', cx, batY + batH + 30);
    ctx.fillText('Chemicals rebuilt!', cx, batY + batH + 46);

    // Disposable vs rechargeable
    ctx.fillStyle = 'rgba(234, 88, 12, 0.06)';
    ctx.fillRect(20, H - 58, W / 2 - 30, 42);
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, H - 58, W / 2 - 30, 42);
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Disposable: one-way', 20 + (W / 2 - 30) / 2, H - 42);
    ctx.font = '16px monospace';
    ctx.fillText('chemicals used up → dead', 20 + (W / 2 - 30) / 2, H - 28);

    ctx.fillStyle = 'rgba(22, 163, 74, 0.06)';
    ctx.fillRect(W / 2 + 10, H - 58, W / 2 - 30, 42);
    ctx.strokeStyle = '#16a34a';
    ctx.strokeRect(W / 2 + 10, H - 58, W / 2 - 30, 42);
    ctx.fillStyle = '#166534';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('Rechargeable: reversible', W / 2 + 10 + (W / 2 - 30) / 2, H - 42);
    ctx.font = '16px monospace';
    ctx.fillText('push e⁻ back → rebuild!', W / 2 + 10 + (W / 2 - 30) / 2, H - 28);
}

function drawCheckpoint(ctx: CanvasRenderingContext2D, _W: number, H: number, cx: number, cy: number, t: number) {
    // Dimming flashlight + dying battery
    const batX = cx - 30;
    const batY = cy - 30;
    const batW = 60;
    const batH = 60;

    ctx.fillStyle = '#fef9c3';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.fillRect(batX, batY, batW, batH);
    ctx.strokeRect(batX, batY, batW, batH);

    // Partial fill (draining)
    const drain = ((t * 0.08) % 1);
    const remain = Math.max(0.1, 1 - drain);
    ctx.fillStyle = 'rgba(250, 204, 21, 0.4)';
    ctx.fillRect(batX + 3, batY + batH - remain * (batH - 6), batW - 6, remain * (batH - 6) - 3);

    // Zinc dissolving away visually
    ctx.fillStyle = '#94a3b8';
    ctx.globalAlpha = remain;
    ctx.fillRect(batX + 8, batY + batH - 15, batW - 16, 10);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('zinc left: ' + Math.round(remain * 100) + '%', cx, batY + batH + 16);

    // Flashlight
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cx + 60, cy - 10, 50, 20);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(cx + 110, cy - 15);
    ctx.lineTo(cx + 130, cy - 20);
    ctx.lineTo(cx + 130, cy + 20);
    ctx.lineTo(cx + 110, cy + 15);
    ctx.closePath();
    ctx.fill();

    // Dim light beam
    const brightness = remain * 0.5;
    ctx.fillStyle = `rgba(251, 191, 36, ${brightness})`;
    ctx.beginPath();
    ctx.moveTo(cx + 130, cy - 18);
    ctx.lineTo(cx + 180, cy - 35);
    ctx.lineTo(cx + 180, cy + 35);
    ctx.lineTo(cx + 130, cy + 18);
    ctx.closePath();
    ctx.fill();

    // Question
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 19px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Why is the flashlight getting dimmer?', cx, 56);

    ctx.fillStyle = '#64748b';
    ctx.font = '18px monospace';
    ctx.fillText("What's happening inside the battery?", cx, H - 40);
}

function drawDiscovery(ctx: CanvasRenderingContext2D, W: number, H: number, cx: number, cy: number, t: number) {
    // Summary diagram: lemon → real battery → circuit
    const yCenter = cy - 10;

    // 1. Lemon battery
    const s1x = W * 0.18;
    drawLemon(ctx, s1x, yCenter, 35, 24);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(s1x - 20, yCenter - 20, 3, 25);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(s1x + 18, yCenter - 20, 3, 25);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Lemon Battery', s1x, yCenter + 42);

    // Arrow
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('→', (s1x + cx) / 2, yCenter + 5);

    // 2. Real battery
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.fillRect(cx - 20, yCenter - 30, 40, 60);
    ctx.strokeRect(cx - 20, yCenter - 30, 40, 60);
    ctx.fillRect(cx - 6, yCenter - 36, 12, 8);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 17px monospace';
    ctx.fillText('+', cx, yCenter - 18);
    ctx.fillText('−', cx, yCenter + 25);
    ctx.fillText('AA Battery', cx, yCenter + 42);

    // Arrow
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 22px monospace';
    const s3x = W * 0.82;
    ctx.fillText('→', (cx + s3x) / 2, yCenter + 5);

    // 3. Powers circuits (P7 link)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(s3x, yCenter, 28, 0, Math.PI * 2);
    ctx.stroke();

    // Small bulb in center
    const bulbGlow = 0.5 + Math.sin(t * 3) * 0.3;
    ctx.fillStyle = `rgba(251, 191, 36, ${bulbGlow})`;
    ctx.beginPath();
    ctx.arc(s3x, yCenter, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Circuit (P7)', s3x, yCenter + 42);

    // Summary box
    const boxY = H - 80;
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.fillRect(20, boxY, W - 40, 60);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, boxY, W - 40, 60);
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Chemical Energy → Electrical Energy', cx, boxY + 18);
    ctx.font = '17px monospace';
    ctx.fillText('Anode (−) gives e⁻ → wire → Cathode (+) accepts e⁻', cx, boxY + 34);
    ctx.fillText('Electrolyte lets ions flow inside to complete the circuit', cx, boxY + 48);
}

