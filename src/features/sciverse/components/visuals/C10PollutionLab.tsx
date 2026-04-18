import { useRef, useEffect, useCallback } from 'react';

interface C10PollutionLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const C10PollutionLab = ({ state, onStateChange }: C10PollutionLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const setStateValue = (key: string, value: unknown) => {
        onStateChange?.(key, value);
    };

    const phase = (state.phase as string) || 'intro';
    const correct = (state.correct as boolean) ?? false;

    // ── CO₂ dot particles ───────────────────────────────────────

    const co2Ref = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

    const ensureCO2 = (W: number, H: number, count: number) => {
        if (co2Ref.current.length < count) {
            const atmoTop = H * 0.15;
            const atmoBot = H * 0.4;
            while (co2Ref.current.length < count) {
                co2Ref.current.push({
                    x: Math.random() * W,
                    y: atmoTop + Math.random() * (atmoBot - atmoTop),
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.2
                });
            }
        }
    };

    const moveCO2 = (W: number, H: number) => {
        const atmoTop = H * 0.12;
        const atmoBot = H * 0.42;
        for (const p of co2Ref.current) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < atmoTop) { p.y = atmoTop; p.vy *= -1; }
            if (p.y > atmoBot) { p.y = atmoBot; p.vy *= -1; }
        }
    };

    // ── Drawing helpers ─────────────────────────────────────────

    const drawLabel = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = '#1e293b', size = 12) => {
        ctx.fillStyle = color;
        ctx.font = `bold ${size + 4}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    };

    const drawSpace = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H * 0.15);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e3a5f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H * 0.15);
        // stars
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 20; i++) {
            const sx = ((i * 73 + 17) % 100) / 100 * W;
            const sy = ((i * 41 + 7) % 100) / 100 * (H * 0.13);
            ctx.beginPath();
            ctx.arc(sx, sy, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const drawAtmosphere = (ctx: CanvasRenderingContext2D, W: number, H: number, thickness: number) => {
        const grad = ctx.createLinearGradient(0, H * 0.12, 0, H * 0.45);
        grad.addColorStop(0, `rgba(135,206,250,${0.15 + thickness * 0.25})`);
        grad.addColorStop(1, `rgba(173,216,230,${0.08 + thickness * 0.15})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, H * 0.12, W, H * 0.33);
    };

    const drawEarth = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const groundY = H * 0.55;
        // sky
        const skyGrad = ctx.createLinearGradient(0, H * 0.4, 0, groundY);
        skyGrad.addColorStop(0, '#87ceeb');
        skyGrad.addColorStop(1, '#b0e0e6');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, H * 0.4, W, groundY - H * 0.4);
        // ground
        const gGrad = ctx.createLinearGradient(0, groundY, 0, H);
        gGrad.addColorStop(0, '#22c55e');
        gGrad.addColorStop(0.05, '#16a34a');
        gGrad.addColorStop(0.15, '#92400e');
        gGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = gGrad;
        ctx.fillRect(0, groundY, W, H - groundY);
    };

    const drawSun = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) => {
        // glow
        const glow = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 2.5);
        glow.addColorStop(0, 'rgba(251,191,36,0.6)');
        glow.addColorStop(1, 'rgba(251,191,36,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
        // rays
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const a = (Math.PI * 2 / 8) * i + t * 0.3;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4));
            ctx.lineTo(x + Math.cos(a) * (r + 14), y + Math.sin(a) * (r + 14));
            ctx.stroke();
        }
        // body
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
    };

    const drawFactory = (ctx: CanvasRenderingContext2D, x: number, groundY: number, h: number, smoking: boolean, t: number) => {
        // building
        ctx.fillStyle = '#64748b';
        ctx.fillRect(x - 20, groundY - h, 40, h);
        ctx.fillStyle = '#475569';
        ctx.fillRect(x - 22, groundY - h, 44, 6);
        // windows
        ctx.fillStyle = '#fbbf24';
        for (let r = 0; r < 2; r++) {
            for (let c = 0; c < 2; c++) {
                ctx.fillRect(x - 12 + c * 18, groundY - h + 14 + r * 20, 8, 8);
            }
        }
        // smokestack
        ctx.fillStyle = '#374151';
        ctx.fillRect(x - 5, groundY - h - 30, 10, 32);
        // smoke
        if (smoking) {
            ctx.globalAlpha = 0.4;
            for (let i = 0; i < 5; i++) {
                const sy = groundY - h - 35 - i * 14 - Math.sin(t * 2 + i) * 4;
                const sx = x + Math.sin(t * 1.5 + i * 1.2) * (6 + i * 3);
                const sr = 6 + i * 4;
                ctx.beginPath();
                ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                ctx.fillStyle = '#9ca3af';
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }
    };

    const drawCO2Dots = (ctx: CanvasRenderingContext2D, count: number, W: number, H: number, t: number) => {
        ensureCO2(W, H, count);
        moveCO2(W, H);
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < Math.min(count, co2Ref.current.length); i++) {
            const p = co2Ref.current[i];
            const pulse = 2.5 + Math.sin(t * 3 + i) * 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    };

    const drawSunRays = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number, trapped: boolean) => {
        const sunX = W * 0.85;
        const sunY = H * 0.05;
        // incoming rays (yellow)
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.lineDashOffset = -t * 40;
        const rayTargets = [W * 0.25, W * 0.45, W * 0.65];
        for (const rx of rayTargets) {
            ctx.beginPath();
            ctx.moveTo(sunX, sunY);
            ctx.lineTo(rx, H * 0.55);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // outgoing heat (red, going up)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = t * 30;
        for (const rx of rayTargets) {
            ctx.beginPath();
            ctx.moveTo(rx, H * 0.55);
            if (trapped) {
                // bounces back down from CO₂ layer
                const bounceY = H * 0.28;
                ctx.lineTo(rx + 10, bounceY);
                ctx.stroke();
                // reflected ray back down
                ctx.strokeStyle = '#f97316';
                ctx.beginPath();
                ctx.moveTo(rx + 10, bounceY);
                ctx.lineTo(rx + 20, H * 0.55);
                ctx.stroke();
                ctx.strokeStyle = '#ef4444';
            } else {
                // escapes to space
                ctx.lineTo(rx - 10, H * 0.02);
                ctx.stroke();
            }
        }
        ctx.setLineDash([]);
    };

    const drawThermometer = (ctx: CanvasRenderingContext2D, x: number, y: number, temp: number, h: number) => {
        // tube
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x - 6, y, 12, h, 6);
        ctx.fill();
        ctx.stroke();
        // bulb
        ctx.beginPath();
        ctx.arc(x, y + h + 6, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.stroke();
        // mercury
        const mercuryH = (temp / 100) * h * 0.85;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x - 3, y + h - mercuryH, 6, mercuryH);
        // temp label
        const display = Math.round(14 + temp * 0.04);
        drawLabel(ctx, `${display}°C`, x, y - 10, '#ef4444', 10);
    };

    const drawTree = (ctx: CanvasRenderingContext2D, x: number, groundY: number, healthy: boolean, t: number) => {
        // trunk
        ctx.fillStyle = healthy ? '#92400e' : '#78716c';
        ctx.fillRect(x - 4, groundY - 35, 8, 35);
        // canopy
        if (healthy) {
            ctx.fillStyle = '#22c55e';
        } else {
            ctx.fillStyle = '#a16207';
        }
        ctx.beginPath();
        ctx.arc(x, groundY - 45, 20, 0, Math.PI * 2);
        ctx.fill();
        if (healthy) {
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.arc(x - 8, groundY - 38, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 8, groundY - 38, 12, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // dead leaves falling
            ctx.fillStyle = '#92400e';
            for (let i = 0; i < 3; i++) {
                const lx = x - 10 + i * 10 + Math.sin(t * 2 + i) * 5;
                const ly = groundY - 20 + i * 8 + Math.abs(Math.sin(t + i * 2)) * 6;
                ctx.beginPath();
                ctx.ellipse(lx, ly, 3, 2, t + i, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    const drawAcidRainDrops = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ctx.fillStyle = '#a3e635';
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < 25; i++) {
            const rx = (i * 47 + 13) % 100 / 100 * W;
            const speed = 1.5 + (i % 3) * 0.5;
            const ry = ((t * speed * 60 + i * 37) % (H * 0.5)) + H * 0.35;
            ctx.beginPath();
            ctx.ellipse(rx, ry, 1.5, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    };

    const drawSO2Cloud = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#a3e635';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x - r * 0.6, y + r * 0.2, r * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + r * 0.7, y + r * 0.15, r * 0.65, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        drawLabel(ctx, 'SO₂', x, y - r - 6, '#65a30d', 9);
    };

    const drawOzoneLayer = (ctx: CanvasRenderingContext2D, W: number, H: number, hasHole: boolean, t: number) => {
        const y = H * 0.18;
        const thickness = 12;
        // ozone band
        ctx.fillStyle = 'rgba(96,165,250,0.4)';
        ctx.fillRect(0, y - thickness / 2, W, thickness);
        drawLabel(ctx, 'OZONE LAYER', W * 0.5, y - thickness / 2 - 8, '#3b82f6', 9);
        if (hasHole) {
            // hole in middle
            ctx.clearRect(W * 0.4, y - thickness / 2, W * 0.2, thickness);
            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            ctx.fillRect(W * 0.4, y - thickness / 2, W * 0.2, thickness);
            drawLabel(ctx, 'HOLE', W * 0.5, y, '#ef4444', 8);
            // UV rays through hole
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2;
            ctx.setLineDash([3, 3]);
            ctx.lineDashOffset = -t * 30;
            for (let i = 0; i < 3; i++) {
                const ux = W * 0.42 + i * (W * 0.08);
                ctx.beginPath();
                ctx.moveTo(ux, y - 20);
                ctx.lineTo(ux + 5, H * 0.55);
                ctx.stroke();
            }
            ctx.setLineDash([]);
            drawLabel(ctx, 'UV ☀️', W * 0.5, y + thickness + 10, '#c084fc', 9);
        } else {
            // UV blocked
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 4]);
            ctx.lineDashOffset = -t * 20;
            for (let i = 0; i < 3; i++) {
                const ux = W * 0.35 + i * (W * 0.15);
                ctx.beginPath();
                ctx.moveTo(ux, y - 30);
                ctx.lineTo(ux, y - thickness / 2 - 2);
                ctx.stroke();
                // X mark for blocked
                drawLabel(ctx, '✕', ux, y - thickness / 2 - 2, '#ef4444', 10);
            }
            ctx.setLineDash([]);
            drawLabel(ctx, 'UV BLOCKED ✓', W * 0.5, y + thickness + 10, '#22c55e', 9);
        }
    };

    // ── Phase drawing functions ─────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        drawAtmosphere(ctx, W, H, 0.3);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.85, H * 0.06, 18, t);

        // thin blanket metaphor — gentle glow around Earth
        ctx.strokeStyle = 'rgba(251,191,36,0.3)';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 8]);
        ctx.lineDashOffset = -t * 15;
        ctx.beginPath();
        ctx.moveTo(0, H * 0.28);
        ctx.lineTo(W, H * 0.28);
        ctx.stroke();
        ctx.setLineDash([]);

        // gentle trees
        drawTree(ctx, W * 0.15, H * 0.55, true, t);
        drawTree(ctx, W * 0.4, H * 0.55, true, t);
        drawTree(ctx, W * 0.65, H * 0.55, true, t);

        const bob = Math.sin(t * 2) * 3;
        drawLabel(ctx, '🌍 Earth\'s Invisible Blanket', W * 0.5, H * 0.48 + bob, '#1e293b', 14);
        drawLabel(ctx, 'What happens when it gets too thick?', W * 0.5, H * 0.48 + 18 + bob, '#64748b', 11);
    };

    const drawCO2Sources = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        drawAtmosphere(ctx, W, H, 0.3);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.88, H * 0.06, 14, t);
        const groundY = H * 0.55;

        // factories
        drawFactory(ctx, W * 0.2, groundY, 55, true, t);
        drawFactory(ctx, W * 0.55, groundY, 45, true, t);

        // car
        ctx.fillStyle = '#475569';
        const carX = W * 0.78 + Math.sin(t * 0.5) * 10;
        ctx.beginPath();
        ctx.roundRect(carX - 18, groundY - 14, 36, 14, 3);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(carX - 10, groundY - 22, 20, 10, 2);
        ctx.fill();
        // wheels
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.arc(carX - 10, groundY, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(carX + 10, groundY, 4, 0, Math.PI * 2); ctx.fill();
        // car exhaust
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(carX - 22 - i * 8, groundY - 6 - i * 4, 4 + i * 2, 0, Math.PI * 2);
            ctx.fillStyle = '#9ca3af';
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // CO₂ rising from sources
        drawCO2Dots(ctx, 25, W, H, t);

        // labels
        drawLabel(ctx, '🏭 Factory', W * 0.2, groundY + 16, '#e2e8f0', 9);
        drawLabel(ctx, '🏭 Power Plant', W * 0.55, groundY + 16, '#e2e8f0', 9);
        drawLabel(ctx, '🚗', carX, groundY + 14, '#e2e8f0', 9);
        drawLabel(ctx, 'CO₂ Sources', W * 0.5, H * 0.9, '#ffffff', 14);
    };

    const drawGreenhouse = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        drawAtmosphere(ctx, W, H, 0.3);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.88, H * 0.06, 16, t);

        // thin CO₂ layer
        drawCO2Dots(ctx, 15, W, H, t);

        // sun rays coming in and heat escaping (normal greenhouse)
        drawSunRays(ctx, W, H, t, false);

        drawThermometer(ctx, W * 0.93, H * 0.3, 30, 80);
        drawLabel(ctx, 'Normal CO₂ — heat escapes', W * 0.5, H * 0.92, '#ffffff', 12);
        drawLabel(ctx, '☀️ → 🌍 → Heat escapes ↑', W * 0.5, H * 0.85, '#e2e8f0', 11);
    };

    const drawWarming = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        drawAtmosphere(ctx, W, H, 0.7);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.88, H * 0.06, 16, t);

        // thick CO₂ layer
        drawCO2Dots(ctx, 60, W, H, t);

        // sun rays trapped
        drawSunRays(ctx, W, H, t, true);

        // hot thermometer
        const tempRise = 60 + Math.sin(t * 0.5) * 5;
        drawThermometer(ctx, W * 0.93, H * 0.3, tempRise, 80);

        // melting ice
        ctx.fillStyle = '#bfdbfe';
        const melt = Math.sin(t * 0.8) * 3;
        ctx.beginPath();
        ctx.moveTo(W * 0.7, H * 0.52);
        ctx.lineTo(W * 0.78, H * 0.55);
        ctx.lineTo(W * 0.68, H * 0.55);
        ctx.closePath();
        ctx.fill();
        // water drops from ice
        ctx.fillStyle = '#60a5fa';
        for (let i = 0; i < 2; i++) {
            const dy = ((t * 40 + i * 20) % 20);
            ctx.beginPath();
            ctx.ellipse(W * 0.72 + i * 4, H * 0.55 + dy + melt, 1.5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        drawFactory(ctx, W * 0.35, H * 0.55, 40, true, t);

        drawLabel(ctx, 'TOO MUCH CO₂ — Heat trapped! 🔥', W * 0.5, H * 0.92, '#fca5a5', 12);
        drawLabel(ctx, '🧊 Ice melting → 🌊 Sea level rises', W * 0.5, H * 0.85, '#93c5fd', 10);
    };

    const drawAcidRain = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // darker sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.5);
        skyGrad.addColorStop(0, '#475569');
        skyGrad.addColorStop(1, '#94a3b8');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H * 0.55);
        // ground
        const gGrad = ctx.createLinearGradient(0, H * 0.55, 0, H);
        gGrad.addColorStop(0, '#16a34a');
        gGrad.addColorStop(0.04, '#92400e');
        gGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = gGrad;
        ctx.fillRect(0, H * 0.55, W, H * 0.45);

        // factory
        drawFactory(ctx, W * 0.15, H * 0.55, 50, true, t);

        // SO₂ clouds
        drawSO2Cloud(ctx, W * 0.35, H * 0.22, 25);
        drawSO2Cloud(ctx, W * 0.6, H * 0.18, 30);

        // acid rain drops
        drawAcidRainDrops(ctx, W, H, t);

        // trees: healthy on left, damaged on right
        drawTree(ctx, W * 0.45, H * 0.55, true, t);
        drawTree(ctx, W * 0.6, H * 0.55, false, t);
        drawTree(ctx, W * 0.75, H * 0.55, false, t);
        drawTree(ctx, W * 0.88, H * 0.55, false, t);

        // dead fish in water
        ctx.fillStyle = '#60a5fa';
        ctx.globalAlpha = 0.4;
        ctx.fillRect(W * 0.65, H * 0.75, W * 0.3, H * 0.12);
        ctx.globalAlpha = 1;
        drawLabel(ctx, '🐟 ✕', W * 0.8, H * 0.81, '#ef4444', 13);
        drawLabel(ctx, 'Lake poisoned', W * 0.8, H * 0.88, '#ef4444', 9);

        drawLabel(ctx, 'SO₂ → Acid Rain ☁️🌧️', W * 0.5, H * 0.93, '#d9f99d', 13);
        drawLabel(ctx, 'Kills forests & poisons lakes', W * 0.5, H * 0.97, '#e2e8f0', 10);
    };

    const drawOzone = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        // lighter sky
        const skyGrad = ctx.createLinearGradient(0, H * 0.15, 0, H * 0.55);
        skyGrad.addColorStop(0, '#bfdbfe');
        skyGrad.addColorStop(1, '#7dd3fc');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, H * 0.15, W, H * 0.4);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.5, H * 0.04, 14, t);

        // left side: good ozone (UV blocked)
        drawLabel(ctx, '✅ Good Ozone', W * 0.25, H * 0.1, '#22c55e', 11);
        // draw ozone layer left half — solid
        ctx.fillStyle = 'rgba(96,165,250,0.45)';
        ctx.fillRect(0, H * 0.18 - 6, W * 0.48, 12);
        // UV blocked arrows
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.lineDashOffset = -t * 20;
        ctx.beginPath();
        ctx.moveTo(W * 0.2, H * 0.04); ctx.lineTo(W * 0.2, H * 0.16);
        ctx.stroke();
        ctx.setLineDash([]);
        drawLabel(ctx, '✕ UV blocked', W * 0.2, H * 0.15, '#22c55e', 8);

        drawTree(ctx, W * 0.15, H * 0.55, true, t);
        drawTree(ctx, W * 0.3, H * 0.55, true, t);

        // divider
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(W * 0.5, 0);
        ctx.lineTo(W * 0.5, H);
        ctx.stroke();
        ctx.setLineDash([]);

        // right side: ozone hole (UV gets through)
        drawLabel(ctx, '❌ Ozone Hole', W * 0.75, H * 0.1, '#ef4444', 11);
        ctx.fillStyle = 'rgba(96,165,250,0.45)';
        ctx.fillRect(W * 0.52, H * 0.18 - 6, W * 0.15, 12);
        ctx.fillRect(W * 0.82, H * 0.18 - 6, W * 0.18, 12);
        // hole
        ctx.fillStyle = 'rgba(239,68,68,0.15)';
        ctx.fillRect(W * 0.67, H * 0.18 - 6, W * 0.15, 12);
        drawLabel(ctx, 'HOLE', W * 0.745, H * 0.18, '#ef4444', 8);
        // UV getting through
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.lineDashOffset = -t * 30;
        ctx.beginPath();
        ctx.moveTo(W * 0.74, H * 0.04); ctx.lineTo(W * 0.74, H * 0.55);
        ctx.stroke();
        ctx.setLineDash([]);
        drawLabel(ctx, 'UV ☀️↓', W * 0.74, H * 0.35, '#c084fc', 9);

        // damaged right side
        drawTree(ctx, W * 0.65, H * 0.55, false, t);
        drawTree(ctx, W * 0.85, H * 0.55, false, t);

        // smog at ground level (right)
        ctx.fillStyle = 'rgba(163,230,53,0.2)';
        ctx.fillRect(W * 0.52, H * 0.47, W * 0.48, H * 0.08);
        drawLabel(ctx, '🌫️ Smog (bad ozone)', W * 0.75, H * 0.51, '#65a30d', 9);
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        drawAtmosphere(ctx, W, H, 0.5);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.88, H * 0.06, 16, t);

        // medium CO₂
        drawCO2Dots(ctx, 35, W, H, t);

        // question visualization — heat arrows going up, some bouncing
        drawSunRays(ctx, W, H, t, true);

        drawThermometer(ctx, W * 0.93, H * 0.3, 45, 80);

        drawLabel(ctx, 'Why does MORE CO₂ = warmer Earth?', W * 0.5, H * 0.85, '#ffffff', 13);
        drawLabel(ctx, 'What is CO₂ doing to the heat?', W * 0.5, H * 0.92, '#e2e8f0', 11);

        if (correct) {
            ctx.fillStyle = 'rgba(34,197,94,0.15)';
            ctx.fillRect(0, 0, W, H);
            drawLabel(ctx, '✅ CO₂ traps heat like a blanket!', W * 0.5, H * 0.78, '#22c55e', 14);
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // split into three zones
        const zoneW = W / 3;

        // Zone 1: Greenhouse (CO₂)
        const grad1 = ctx.createLinearGradient(0, 0, 0, H);
        grad1.addColorStop(0, '#fef3c7');
        grad1.addColorStop(1, '#fde68a');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, zoneW, H);
        drawLabel(ctx, '🌡️ CO₂', zoneW * 0.5, 20, '#ef4444', 13);
        drawLabel(ctx, 'Greenhouse', zoneW * 0.5, 36, '#92400e', 10);
        drawLabel(ctx, 'Effect', zoneW * 0.5, 50, '#92400e', 10);
        // mini earth with thick atmosphere
        ctx.beginPath();
        ctx.arc(zoneW * 0.5, H * 0.4, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#22c55e';
        ctx.fill();
        ctx.strokeStyle = 'rgba(239,68,68,0.4)';
        ctx.lineWidth = 8;
        ctx.stroke();
        drawLabel(ctx, '🔥', zoneW * 0.5, H * 0.4, '#fff', 18);
        drawThermometer(ctx, zoneW * 0.8, H * 0.6, 50 + Math.sin(t) * 5, 50);

        // Zone 2: Acid Rain (SO₂)
        const grad2 = ctx.createLinearGradient(zoneW, 0, zoneW, H);
        grad2.addColorStop(0, '#ecfccb');
        grad2.addColorStop(1, '#d9f99d');
        ctx.fillStyle = grad2;
        ctx.fillRect(zoneW, 0, zoneW, H);
        drawLabel(ctx, '🌧️ SO₂/NOₓ', zoneW * 1.5, 20, '#65a30d', 13);
        drawLabel(ctx, 'Acid Rain', zoneW * 1.5, 36, '#4d7c0f', 10);
        // mini cloud
        drawSO2Cloud(ctx, zoneW * 1.5, H * 0.32, 20);
        // acid drops
        ctx.fillStyle = '#a3e635';
        for (let i = 0; i < 6; i++) {
            const dy = ((t * 50 + i * 30) % 60);
            ctx.beginPath();
            ctx.ellipse(zoneW * 1.3 + i * 12, H * 0.45 + dy, 1.5, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        // dead tree
        drawTree(ctx, zoneW * 1.5, H * 0.8, false, t);

        // Zone 3: Ozone (CFCs)
        const grad3 = ctx.createLinearGradient(zoneW * 2, 0, zoneW * 2, H);
        grad3.addColorStop(0, '#ede9fe');
        grad3.addColorStop(1, '#ddd6fe');
        ctx.fillStyle = grad3;
        ctx.fillRect(zoneW * 2, 0, zoneW, H);
        drawLabel(ctx, '☀️ CFCs', zoneW * 2.5, 20, '#7c3aed', 13);
        drawLabel(ctx, 'Ozone Hole', zoneW * 2.5, 36, '#6d28d9', 10);
        // ozone band with hole
        ctx.fillStyle = 'rgba(96,165,250,0.4)';
        ctx.fillRect(zoneW * 2, H * 0.28, zoneW * 0.35, 8);
        ctx.fillRect(zoneW * 2.65, H * 0.28, zoneW * 0.35, 8);
        ctx.fillStyle = 'rgba(239,68,68,0.2)';
        ctx.fillRect(zoneW * 2.35, H * 0.28, zoneW * 0.3, 8);
        // UV arrow through hole
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.lineDashOffset = -t * 25;
        ctx.beginPath();
        ctx.moveTo(zoneW * 2.5, H * 0.2);
        ctx.lineTo(zoneW * 2.5, H * 0.65);
        ctx.stroke();
        ctx.setLineDash([]);
        drawLabel(ctx, 'UV ↓', zoneW * 2.5, H * 0.55, '#c084fc', 10);

        // dividers
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(zoneW, 0); ctx.lineTo(zoneW, H);
        ctx.moveTo(zoneW * 2, 0); ctx.lineTo(zoneW * 2, H);
        ctx.stroke();

        // banner
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.roundRect(W * 0.1, H * 0.88, W * 0.8, 28, 8);
        ctx.fill();
        drawLabel(ctx, '3 Faces of Air Pollution — All Connected!', W * 0.5, H * 0.88 + 14, '#1e293b', 11);
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSpace(ctx, W, H);
        // clean atmosphere
        drawAtmosphere(ctx, W, H, 0.2);
        drawEarth(ctx, W, H);
        drawSun(ctx, W * 0.85, H * 0.06, 18, t);
        drawOzoneLayer(ctx, W, H, false, t);

        const groundY = H * 0.55;
        // healthy trees
        drawTree(ctx, W * 0.15, groundY, true, t);
        drawTree(ctx, W * 0.3, groundY, true, t);
        drawTree(ctx, W * 0.5, groundY, true, t);
        drawTree(ctx, W * 0.7, groundY, true, t);
        drawTree(ctx, W * 0.85, groundY, true, t);

        // solar panel
        ctx.fillStyle = '#1e3a5f';
        ctx.beginPath();
        const spX = W * 0.4;
        ctx.moveTo(spX - 16, groundY - 12);
        ctx.lineTo(spX + 16, groundY - 12);
        ctx.lineTo(spX + 12, groundY - 24);
        ctx.lineTo(spX - 12, groundY - 24);
        ctx.closePath();
        ctx.fill();
        // panel pole
        ctx.fillStyle = '#64748b';
        ctx.fillRect(spX - 2, groundY - 12, 4, 12);
        // grid lines
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(spX, groundY - 24); ctx.lineTo(spX, groundY - 12);
        ctx.moveTo(spX - 14, groundY - 18); ctx.lineTo(spX + 14, groundY - 18);
        ctx.stroke();

        // wind turbine
        const wtX = W * 0.6;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(wtX - 2, groundY - 50, 4, 50);
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.arc(wtX, groundY - 50, 3, 0, Math.PI * 2);
        ctx.fill();
        // blades
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const ba = (Math.PI * 2 / 3) * i + t * 2;
            ctx.beginPath();
            ctx.moveTo(wtX, groundY - 50);
            ctx.lineTo(wtX + Math.cos(ba) * 20, groundY - 50 + Math.sin(ba) * 20);
            ctx.stroke();
        }

        // clean thermometer
        drawThermometer(ctx, W * 0.93, H * 0.3, 25, 80);

        // few CO₂ dots (improving)
        drawCO2Dots(ctx, 8, W, H, t);

        // complete banner
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.roundRect(W * 0.05, H * 0.82, W * 0.9, 40, 8);
        ctx.fill();
        drawLabel(ctx, '✅ C10 Complete — Air Pollution!', W * 0.5, H * 0.82 + 14, '#16a34a', 13);
        drawLabel(ctx, 'Renewables + Protection = Cleaner Air 🌱', W * 0.5, H * 0.82 + 30, '#64748b', 10);
    };

    // ── Animation loop ──────────────────────────────────────────

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.clearRect(0, 0, W, H);

        switch (phase) {
            case 'co2_sources':
                drawCO2Sources(ctx, W, H, t);
                break;
            case 'greenhouse':
                drawGreenhouse(ctx, W, H, t);
                break;
            case 'warming':
                drawWarming(ctx, W, H, t);
                break;
            case 'acid_rain':
                drawAcidRain(ctx, W, H, t);
                break;
            case 'ozone':
                drawOzone(ctx, W, H, t);
                break;
            case 'checkpoint':
                drawCheckpoint(ctx, W, H, t);
                break;
            case 'discovery':
                drawDiscovery(ctx, W, H, t);
                break;
            case 'complete':
                drawComplete(ctx, W, H, t);
                break;
            default:
                drawIntro(ctx, W, H, t);
                break;
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, correct]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

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

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

            <div data-lab-controls="true" className="absolute left-3 bottom-3 z-10 bg-white backdrop-blur border border-slate-300 rounded-lg p-3 w-[300px] max-w-[calc(100%-24px)] shadow-md text-slate-900">
                <p className="text-xs font-bold text-slate-900 mb-2">Interactive Lab Controls</p>

                <label className="block text-[11px] font-semibold text-slate-800 mb-1">Pollution Scenario</label>
                <select
                    value={phase}
                    onChange={(e) => setStateValue('phase', e.target.value)}
                    className="w-full mb-2 text-xs text-slate-900 border border-slate-300 rounded px-2 py-1 bg-white shadow-sm"
                >
                    <option value="intro">Intro</option>
                    <option value="co2_sources">CO2 Sources</option>
                    <option value="greenhouse">Greenhouse Effect</option>
                    <option value="warming">Global Warming</option>
                    <option value="acid_rain">Acid Rain</option>
                    <option value="ozone">Ozone Layer</option>
                    <option value="checkpoint">Checkpoint</option>
                    <option value="discovery">Discovery</option>
                    <option value="complete">Complete</option>
                </select>

                <label className="flex items-center gap-1.5 text-[11px] text-slate-800">
                    <input
                        className="accent-slate-800"
                        type="checkbox"
                        checked={correct}
                        onChange={(e) => setStateValue('correct', e.target.checked)}
                    />
                    Show checkpoint correct state
                </label>
            </div>
        </div>
    );
};


