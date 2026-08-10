import { useRef, useEffect, useCallback } from 'react';

interface B8AdaptationsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B8AdaptationsLab = ({ state }: B8AdaptationsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const correct = (state.correct as boolean) ?? false;

    // ── Drawing helpers ──────────────────────────────────────────

    const drawLabel = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = '#1e293b', size = 12) => {
        ctx.fillStyle = color;
        ctx.font = `bold ${size + 4}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    };

    const drawSnowflake = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(t * 0.3);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            ctx.stroke();
            // small branch
            const bx = Math.cos(a) * r * 0.6;
            const by = Math.sin(a) * r * 0.6;
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + Math.cos(a + 0.8) * r * 0.3, by + Math.sin(a + 0.8) * r * 0.3);
            ctx.stroke();
        }
        ctx.restore();
    };

    const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number, h: number, bare: boolean) => {
        // trunk
        ctx.fillStyle = '#78350f';
        ctx.fillRect(x - h * 0.06, y - h * 0.6, h * 0.12, h * 0.6);
        if (bare) {
            // bare branches
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 2;
            const branches = [[-0.6, -0.8], [0.5, -0.75], [-0.3, -0.5], [0.4, -0.55]];
            for (const [bx, by] of branches) {
                ctx.beginPath();
                ctx.moveTo(x, y - h * 0.5);
                ctx.lineTo(x + bx * h * 0.3, y + by * h);
                ctx.stroke();
            }
        } else {
            // leafy canopy
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(x, y - h * 0.7, h * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const drawSnowGround = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, H * 0.78);
        for (let i = 0; i <= W; i += 30) {
            ctx.lineTo(i, H * 0.78 + Math.sin(i * 0.03) * 8);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
    };

    const drawWinterSky = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#1e3a5f');
        grad.addColorStop(0.5, '#4a6fa5');
        grad.addColorStop(1, '#94a3b8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
    };

    // ── Falling snowflakes (persistent positions) ───────────────

    const snowRef = useRef<{ x: number; y: number; r: number; speed: number; rot: number }[]>([]);
    const ensureSnow = (W: number, H: number) => {
        if (snowRef.current.length === 0) {
            for (let i = 0; i < 40; i++) {
                snowRef.current.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: 2 + Math.random() * 4,
                    speed: 0.3 + Math.random() * 0.8,
                    rot: Math.random() * Math.PI * 2
                });
            }
        }
    };
    const drawFallingSnow = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ensureSnow(W, H);
        for (const s of snowRef.current) {
            s.y += s.speed;
            s.x += Math.sin(t + s.rot) * 0.3;
            if (s.y > H) { s.y = -5; s.x = Math.random() * W; }
            drawSnowflake(ctx, s.x, s.y, s.r, t + s.rot);
        }
    };

    // ── Geese V-formation ───────────────────────────────────────

    const drawGeese = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, t: number) => {
        const count = 7;
        const positions: [number, number][] = [[0, 0]];
        for (let i = 1; i <= Math.floor(count / 2); i++) {
            positions.push([-i * 22 * scale, i * 14 * scale]);
            positions.push([i * 22 * scale, i * 14 * scale]);
        }
        for (const [ox, oy] of positions) {
            const wingFlap = Math.sin(t * 4 + ox * 0.1) * 8 * scale;
            const bx = cx + ox;
            const by = cy + oy;
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2.5 * scale;
            // left wing
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.quadraticCurveTo(bx - 8 * scale, by - wingFlap, bx - 15 * scale, by + 2 * scale);
            ctx.stroke();
            // right wing
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.quadraticCurveTo(bx + 8 * scale, by - wingFlap, bx + 15 * scale, by + 2 * scale);
            ctx.stroke();
            // body dot
            ctx.beginPath();
            ctx.arc(bx, by, 2 * scale, 0, Math.PI * 2);
            ctx.fillStyle = '#1e293b';
            ctx.fill();
        }
    };

    // ── Bear in cave ────────────────────────────────────────────

    const drawBearInCave = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
        // Cave opening
        ctx.fillStyle = '#44403c';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 10 * s, 55 * s, 45 * s, 0, Math.PI, 0);
        ctx.fill();
        // Cave interior dark
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 10 * s, 48 * s, 38 * s, 0, Math.PI, 0);
        ctx.fill();

        // Bear body (sleeping curled)
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.ellipse(cx, cy - 2 * s, 28 * s, 18 * s, 0, 0, Math.PI * 2);
        ctx.fill();
        // Bear head
        ctx.beginPath();
        ctx.arc(cx - 20 * s, cy - 10 * s, 12 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#78350f';
        ctx.fill();
        // Ears
        ctx.beginPath();
        ctx.arc(cx - 28 * s, cy - 18 * s, 4 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx - 14 * s, cy - 18 * s, 4 * s, 0, Math.PI * 2);
        ctx.fill();
        // Nose
        ctx.beginPath();
        ctx.arc(cx - 28 * s, cy - 8 * s, 3 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#1c1917';
        ctx.fill();

        // Zzz animation
        const zOff = Math.sin(t * 1.5) * 3;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = `bold ${17 * s}px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText('Z', cx - 8 * s, cy - 28 * s + zOff);
        ctx.font = `bold ${15 * s}px monospace`;
        ctx.fillText('z', cx + 2 * s, cy - 36 * s - zOff);
        ctx.font = `bold ${13 * s}px monospace`;
        ctx.fillText('z', cx + 10 * s, cy - 42 * s + zOff * 0.5);
    };

    const drawHeartRate = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, bpm: number, t: number) => {
        // Border
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, w, h);

        // Label
        ctx.fillStyle = '#ef4444';
        ctx.font = `bold 14px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(`❤️ ${bpm} bpm`, x + 4, y + 14);

        // Pulse line
        const midY = y + h * 0.6;
        const pulse = Math.sin(t * bpm * 0.05);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < w - 8; i++) {
            const px = x + 4 + i;
            const phase = (i / (w - 8)) * Math.PI * 4 + t * bpm * 0.1;
            const spike = Math.abs(Math.sin(phase)) > 0.95 ? -h * 0.25 : 0;
            ctx.lineTo(px, midY + spike + Math.sin(phase) * 2 * pulse);
        }
        ctx.stroke();
    };

    const drawTempMeter = (ctx: CanvasRenderingContext2D, x: number, y: number, h: number, temp: number, label: string) => {
        const s = h / 80;
        // Thermometer
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x - 6 * s, y, 12 * s, 60 * s, 4);
        ctx.stroke();
        // Bulb
        ctx.beginPath();
        ctx.arc(x, y + 65 * s, 8 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        // Fill level (map 30-40 range to bar)
        const frac = Math.max(0, Math.min(1, (temp - 30) / 10));
        const barH = frac * 55 * s;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x - 4 * s, y + 60 * s - barH, 8 * s, barH);
        // Label
        ctx.fillStyle = '#1e293b';
        ctx.font = `bold ${13 * s}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(`${temp.toFixed(0)}°C`, x, y - 6 * s);
        ctx.fillText(label, x, y + 80 * s);
    };

    // ── Arctic fox with fur insulation ──────────────────────────

    const drawArcticFox = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number, showHeat: boolean) => {
        // Body
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 30 * s, 18 * s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Thick fur layer (outer glow)
        ctx.strokeStyle = 'rgba(241,245,249,0.5)';
        ctx.lineWidth = 8 * s;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 34 * s, 22 * s, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Fur texture lines
        ctx.strokeStyle = 'rgba(203,213,225,0.4)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < 20; i++) {
            const a = (Math.PI * 2 / 20) * i + Math.sin(t * 0.5 + i) * 0.05;
            const r1 = 30 * s;
            const r2 = 36 * s + Math.sin(t + i * 2) * 2;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * 0.6);
            ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2 * 0.6);
            ctx.stroke();
        }

        // Head
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.arc(cx - 28 * s, cy - 8 * s, 14 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Small round ears (adaptation!)
        ctx.beginPath();
        ctx.arc(cx - 36 * s, cy - 18 * s, 5 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#f1f5f9';
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 22 * s, cy - 18 * s, 5 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.beginPath();
        ctx.arc(cx - 32 * s, cy - 10 * s, 2 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();

        // Nose
        ctx.beginPath();
        ctx.arc(cx - 40 * s, cy - 6 * s, 2.5 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();

        // Tail
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        const tailWag = Math.sin(t * 2) * 5 * s;
        ctx.ellipse(cx + 35 * s, cy - 5 * s + tailWag, 16 * s, 8 * s, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = '#e2e8f0';
        for (const lx of [-14, -4, 10, 20]) {
            ctx.fillRect(cx + lx * s - 3 * s, cy + 14 * s, 6 * s, 12 * s);
        }

        // Heat arrows being blocked
        if (showHeat) {
            ctx.strokeStyle = 'rgba(239,68,68,0.5)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 6; i++) {
                const a = -0.8 + (i / 5) * 1.6;
                const fromR = 42 * s;
                const toR = 36 * s;
                const ax = cx + Math.cos(a) * fromR;
                const ay = cy + Math.sin(a) * fromR * 0.6 - 4 * s;
                const bx = cx + Math.cos(a) * toR;
                const by = cy + Math.sin(a) * toR * 0.6 - 4 * s;
                // Arrow towards body
                ctx.beginPath();
                ctx.moveTo(ax + 12, ay);
                ctx.lineTo(ax, ay);
                ctx.stroke();
                // arrowhead
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(ax + 5, ay - 3);
                ctx.lineTo(ax + 5, ay + 3);
                ctx.closePath();
                ctx.fillStyle = 'rgba(239,68,68,0.5)';
                ctx.fill();

                // Blocked X at fur boundary
                const blink = Math.sin(t * 3 + i) > 0;
                if (blink) {
                    ctx.strokeStyle = '#ef4444';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(bx - 3, by - 3);
                    ctx.lineTo(bx + 3, by + 3);
                    ctx.moveTo(bx + 3, by - 3);
                    ctx.lineTo(bx - 3, by + 3);
                    ctx.stroke();
                }
            }
            drawLabel(ctx, 'Fur blocks heat loss!', cx, cy + 38 * s, '#ef4444', 10);
        }
    };

    // ── Desert scene ────────────────────────────────────────────

    const drawDesertDay = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Hot sky
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#fbbf24');
        grad.addColorStop(0.4, '#f59e0b');
        grad.addColorStop(1, '#d97706');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W / 2, H);

        // Sun
        const sunPulse = 1 + Math.sin(t * 2) * 0.05;
        ctx.beginPath();
        ctx.arc(W * 0.25, H * 0.15, 30 * sunPulse, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        // Sun rays
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const a = (Math.PI / 4) * i + t * 0.2;
            ctx.beginPath();
            ctx.moveTo(W * 0.25 + Math.cos(a) * 35, H * 0.15 + Math.sin(a) * 35);
            ctx.lineTo(W * 0.25 + Math.cos(a) * 48, H * 0.15 + Math.sin(a) * 48);
            ctx.stroke();
        }

        // Sand
        ctx.fillStyle = '#e8c872';
        ctx.beginPath();
        ctx.moveTo(0, H * 0.7);
        for (let i = 0; i <= W / 2; i += 20) {
            ctx.lineTo(i, H * 0.7 + Math.sin(i * 0.04) * 6);
        }
        ctx.lineTo(W / 2, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();

        // Cactus
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(W * 0.15 - 4, H * 0.5, 8, H * 0.22);
        ctx.beginPath();
        ctx.arc(W * 0.15, H * 0.5, 6, 0, Math.PI * 2);
        ctx.fill();
        // Arms
        ctx.fillRect(W * 0.15 + 4, H * 0.56, 14, 5);
        ctx.fillRect(W * 0.15 + 14, H * 0.5, 5, 11);
        ctx.fillRect(W * 0.15 - 18, H * 0.6, 14, 5);
        ctx.fillRect(W * 0.15 - 18, H * 0.54, 5, 11);

        // Lizard hiding (under rock)
        ctx.fillStyle = '#78716c';
        ctx.beginPath();
        ctx.ellipse(W * 0.35, H * 0.72, 20, 10, 0, Math.PI, 0);
        ctx.fill();
        drawLabel(ctx, '🦎 hiding!', W * 0.35, H * 0.68, '#78350f', 9);

        drawLabel(ctx, 'DAY — 50°C', W * 0.25, H * 0.33, '#78350f', 13);
        drawLabel(ctx, '☀️', W * 0.25, H * 0.39, '#fff', 18);
    };

    const drawDesertNight = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        const x0 = W / 2;
        // Night sky
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.5, '#1e293b');
        grad.addColorStop(1, '#334155');
        ctx.fillStyle = grad;
        ctx.fillRect(x0, 0, W / 2, H);

        // Stars
        ctx.fillStyle = '#fff';
        const starSeed = [0.1, 0.3, 0.5, 0.7, 0.85, 0.2, 0.65, 0.4, 0.9, 0.15];
        const starY = [0.08, 0.12, 0.05, 0.2, 0.15, 0.25, 0.1, 0.3, 0.18, 0.22];
        for (let i = 0; i < starSeed.length; i++) {
            const blink = 0.5 + Math.sin(t * 2 + i * 3) * 0.5;
            ctx.globalAlpha = blink;
            ctx.beginPath();
            ctx.arc(x0 + starSeed[i] * W * 0.5, starY[i] * H, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Moon
        ctx.beginPath();
        ctx.arc(x0 + W * 0.35, H * 0.12, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#fde68a';
        ctx.fill();
        // Crescent shadow
        ctx.beginPath();
        ctx.arc(x0 + W * 0.35 + 7, H * 0.12 - 2, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        // Sand (night)
        ctx.fillStyle = '#92816b';
        ctx.beginPath();
        ctx.moveTo(x0, H * 0.7);
        for (let i = 0; i <= W / 2; i += 20) {
            ctx.lineTo(x0 + i, H * 0.7 + Math.sin(i * 0.04 + 1) * 6);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(x0, H);
        ctx.closePath();
        ctx.fill();

        // Active lizard
        const lx = x0 + W * 0.2 + Math.sin(t * 1.5) * 20;
        const ly = H * 0.68;
        ctx.fillStyle = '#65a30d';
        ctx.beginPath();
        ctx.ellipse(lx, ly, 12, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.arc(lx + 12, ly - 2, 4, 0, Math.PI * 2);
        ctx.fill();
        // Tail
        ctx.strokeStyle = '#65a30d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lx - 12, ly);
        ctx.quadraticCurveTo(lx - 22, ly - 6, lx - 28, ly + 2);
        ctx.stroke();
        // Legs
        ctx.lineWidth = 1.5;
        for (const [ox, oy, dx, dy] of [[-6, 4, -10, 8], [2, 4, -2, 8], [6, 4, 10, 8], [-2, 4, 3, 8]] as [number, number, number, number][]) {
            ctx.beginPath();
            ctx.moveTo(lx + ox, ly + oy);
            ctx.lineTo(lx + dx, ly + dy);
            ctx.stroke();
        }
        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(lx + 14, ly - 3, 1, 0, Math.PI * 2);
        ctx.fill();

        drawLabel(ctx, 'NIGHT — 15°C', x0 + W * 0.25, H * 0.33, '#94a3b8', 13);
        drawLabel(ctx, '🦎 active!', lx, ly + 16, '#86efac', 9);
        drawLabel(ctx, '🌙', x0 + W * 0.25, H * 0.39, '#fde68a', 18);
    };

    // ── Route arrow ─────────────────────────────────────────────

    const drawRouteArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, label: string, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
        // Arrowhead
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 10 * Math.cos(a - 0.4), y2 - 10 * Math.sin(a - 0.4));
        ctx.lineTo(x2 - 10 * Math.cos(a + 0.4), y2 - 10 * Math.sin(a + 0.4));
        ctx.closePath();
        ctx.fill();
        // Label
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        drawLabel(ctx, label, mx, my - 10, color, 9);
    };

    // ── Phase renderers ─────────────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWinterSky(ctx, W, H);
        drawSnowGround(ctx, W, H);
        drawFallingSnow(ctx, W, H, t);

        drawLabel(ctx, '🦊 Survival in the Wild ❄️', W / 2, H * 0.12, '#fff', 18);
        drawLabel(ctx, 'How do animals survive extreme weather?', W / 2, H * 0.2, 'rgba(255,255,255,0.8)', 12);

        // Three silhouettes
        drawGeese(ctx, W * 0.2, H * 0.35, 0.8, t);
        drawLabel(ctx, 'Migration?', W * 0.2, H * 0.5, '#93c5fd', 11);

        drawBearInCave(ctx, W * 0.5, H * 0.65, 0.7, t);
        drawLabel(ctx, 'Hibernation?', W * 0.5, H * 0.52, '#fde68a', 11);

        drawArcticFox(ctx, W * 0.8, H * 0.65, 0.6, t, false);
        drawLabel(ctx, 'Insulation?', W * 0.8, H * 0.52, '#e2e8f0', 11);
    };

    const drawWinterScene = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWinterSky(ctx, W, H);
        drawSnowGround(ctx, W, H);
        drawFallingSnow(ctx, W, H, t);

        drawTree(ctx, W * 0.1, H * 0.78, H * 0.25, true);
        drawTree(ctx, W * 0.45, H * 0.78, H * 0.2, true);
        drawTree(ctx, W * 0.85, H * 0.78, H * 0.3, true);

        // Geese overhead
        drawGeese(ctx, W * 0.3, H * 0.22, 0.9, t);
        drawLabel(ctx, '🪿 Geese flying south', W * 0.3, H * 0.1, '#93c5fd', 10);

        // Bear near cave
        drawBearInCave(ctx, W * 0.55, H * 0.7, 0.65, t);

        // Fox on hill
        drawArcticFox(ctx, W * 0.82, H * 0.68, 0.55, t, false);

        drawLabel(ctx, '-15°C  ❄️  Winter', W / 2, H * 0.04 + 12, '#fff', 14);
    };

    const drawMigration = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Blue sky gradient
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#3b82f6');
        grad.addColorStop(0.6, '#93c5fd');
        grad.addColorStop(1, '#bbf7d0');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Green ground
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, H * 0.82, W, H * 0.18);

        // Animated geese position
        const geeseX = W * 0.5 + Math.sin(t * 0.5) * W * 0.05;
        const geeseY = H * 0.3 + Math.cos(t * 0.3) * 10;
        drawGeese(ctx, geeseX, geeseY, 1.2, t);

        // Route arrow
        drawRouteArrow(ctx, W * 0.75, H * 0.15, W * 0.25, H * 0.65, 'SOUTH → warm', '#1e40af');

        drawLabel(ctx, 'Migration — V-Formation', W / 2, H * 0.06, '#1e3a5f', 14);
        drawLabel(ctx, '5,000 km journey!', W / 2, H * 0.92, '#166534', 11);
        drawLabel(ctx, 'V-shape saves 20% energy', geeseX, geeseY + 50, '#1e40af', 10);
    };

    const drawHibernation = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWinterSky(ctx, W, H);
        drawSnowGround(ctx, W, H);
        drawFallingSnow(ctx, W, H, t);

        // Large cave view
        drawBearInCave(ctx, W * 0.4, H * 0.62, 1.1, t);

        // Heart rate monitor
        drawHeartRate(ctx, W * 0.65, H * 0.18, W * 0.3, H * 0.15, 8, t);

        // Temperature meter
        drawTempMeter(ctx, W * 0.78, H * 0.42, H * 0.25, 33, 'Body');
        drawTempMeter(ctx, W * 0.88, H * 0.42, H * 0.25, 37, 'Normal');

        drawLabel(ctx, 'Hibernation', W * 0.4, H * 0.1, '#fff', 16);
        drawLabel(ctx, 'Metabolism slows 75%', W * 0.4, H * 0.17, '#fde68a', 10);
        drawLabel(ctx, '5-7 months without food!', W * 0.4, H * 0.23, 'rgba(255,255,255,0.7)', 10);
    };

    const drawInsulation = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWinterSky(ctx, W, H);
        drawSnowGround(ctx, W, H);
        drawFallingSnow(ctx, W, H, t);

        // Large fox with heat arrows
        drawArcticFox(ctx, W * 0.4, H * 0.55, 1.3, t, true);

        drawLabel(ctx, 'Insulation — Arctic Fox', W / 2, H * 0.08, '#fff', 15);

        // Adaptation callouts
        const callouts = [
            { text: '🧥 Densest fur of any mammal', y: 0.2 },
            { text: '👂 Small ears = less heat loss', y: 0.27 },
            { text: '🦶 Furry paw pads = snow boots', y: 0.34 },
            { text: '📐 Compact body holds warmth', y: 0.41 },
        ];
        for (const c of callouts) {
            drawLabel(ctx, c.text, W * 0.72, H * c.y, '#e2e8f0', 9);
        }

        drawLabel(ctx, 'P8: Fur blocks conduction!', W * 0.72, H * 0.5, '#fbbf24', 9);
        drawLabel(ctx, 'P8: Small ears reduce radiation!', W * 0.72, H * 0.56, '#fbbf24', 9);
    };

    const drawDesert = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Divider line down the middle
        drawDesertDay(ctx, W, H, t);
        drawDesertNight(ctx, W, H, t);

        // Divider
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.moveTo(W / 2, 0);
        ctx.lineTo(W / 2, H);
        ctx.stroke();
        ctx.setLineDash([]);

        drawLabel(ctx, 'Desert Survival', W / 2, H * 0.06, '#fff', 14);
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Desert background blend
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.3, '#d97706');
        grad.addColorStop(1, '#92400e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Sand
        ctx.fillStyle = '#e8c872';
        ctx.fillRect(0, H * 0.7, W, H * 0.3);

        drawLabel(ctx, '⏸️ CHECKPOINT', W / 2, H * 0.12, '#fff', 18);
        drawLabel(ctx, 'Why are desert animals active at night?', W / 2, H * 0.22, '#fef3c7', 12);

        // Day side
        const sunP = 1 + Math.sin(t * 2) * 0.05;
        ctx.beginPath();
        ctx.arc(W * 0.25, H * 0.45, 25 * sunP, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        drawLabel(ctx, '50°C ☀️', W * 0.25, H * 0.55, '#78350f', 12);
        drawLabel(ctx, '🦎💀 TOO HOT!', W * 0.25, H * 0.63, '#dc2626', 11);

        // Night side
        ctx.beginPath();
        ctx.arc(W * 0.75, H * 0.42, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#fde68a';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(W * 0.75 + 6, H * 0.42 - 2, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#d97706';
        ctx.fill();
        drawLabel(ctx, '15°C 🌙', W * 0.75, H * 0.55, '#fef3c7', 12);

        if (correct) {
            drawLabel(ctx, '✅ Correct!', W / 2, H * 0.8, '#22c55e', 16);
            drawLabel(ctx, '🦎 Active & safe!', W * 0.75, H * 0.63, '#86efac', 11);
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Colourful gradient
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#1e3a5f');
        grad.addColorStop(0.33, '#065f46');
        grad.addColorStop(0.66, '#78350f');
        grad.addColorStop(1, '#1e293b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        drawLabel(ctx, '🎉 Big Discovery!', W / 2, H * 0.1, '#fbbf24', 18);

        // Four quadrants with icons
        const items = [
            { emoji: '🪿', label: 'Migration', desc: 'Fly south for warmth', x: 0.25, y: 0.3 },
            { emoji: '🐻', label: 'Hibernation', desc: 'Sleep at 8 bpm', x: 0.75, y: 0.3 },
            { emoji: '🦊', label: 'Insulation', desc: 'Thick fur blocks heat loss', x: 0.25, y: 0.6 },
            { emoji: '🦎', label: 'Nocturnal', desc: 'Active only at night', x: 0.75, y: 0.6 },
        ];
        for (const item of items) {
            const ix = W * item.x;
            const iy = H * item.y;
            // Card background
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath();
            ctx.roundRect(ix - 60, iy - 30, 120, 65, 8);
            ctx.fill();
            drawLabel(ctx, item.emoji, ix, iy - 14, '#fff', 22);
            drawLabel(ctx, item.label, ix, iy + 8, '#fbbf24', 12);
            drawLabel(ctx, item.desc, ix, iy + 24, 'rgba(255,255,255,0.7)', 8);
        }

        const pulse = 0.8 + Math.sin(t * 2) * 0.2;
        ctx.globalAlpha = pulse;
        drawLabel(ctx, 'Misconception Busted! 💡', W / 2, H * 0.85, '#86efac', 13);
        ctx.globalAlpha = 1;
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#065f46');
        grad.addColorStop(1, '#1e3a5f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        drawLabel(ctx, '✅ Big Idea 8 Complete!', W / 2, H * 0.12, '#86efac', 18);
        drawLabel(ctx, 'Why Does Weather Change?', W / 2, H * 0.22, '#fbbf24', 14);

        const links = [
            { emoji: '🔥', label: 'P8: Heat Transfer', desc: 'Fur & caves block conduction/convection', y: 0.38 },
            { emoji: '💧', label: 'C8: Water Cycle', desc: 'Drought forces migration', y: 0.52 },
            { emoji: '🦊', label: 'B8: Animal Adaptations', desc: 'Migration, hibernation, insulation!', y: 0.66 },
        ];
        for (const l of links) {
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.beginPath();
            ctx.roundRect(W * 0.1, H * l.y - 18, W * 0.8, 36, 6);
            ctx.fill();
            drawLabel(ctx, `${l.emoji} ${l.label}`, W * 0.35, H * l.y, '#fbbf24', 12);
            drawLabel(ctx, l.desc, W * 0.7, H * l.y, 'rgba(255,255,255,0.7)', 9);
        }

        const scale = 1 + Math.sin(t * 3) * 0.05;
        ctx.save();
        ctx.translate(W / 2, H * 0.85);
        ctx.scale(scale, scale);
        drawLabel(ctx, '🌦️ Weather · Heat · Water · Life 🦊', 0, 0, '#86efac', 11);
        ctx.restore();
    };

    // ── Animation loop ──────────────────────────────────────────

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.clearRect(0, 0, W, H);

        switch (phase) {
            case 'winter_scene':
                drawWinterScene(ctx, W, H, t);
                break;
            case 'migration':
                drawMigration(ctx, W, H, t);
                break;
            case 'hibernation':
                drawHibernation(ctx, W, H, t);
                break;
            case 'insulation':
                drawInsulation(ctx, W, H, t);
                break;
            case 'desert':
                drawDesert(ctx, W, H, t);
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
        </div>
    );
};

