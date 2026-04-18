import { useRef, useEffect, useCallback } from 'react';

interface P8HeatLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    temp: number; // 0 = cold, 1 = hot
}

export const P8HeatLab = ({ state }: P8HeatLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);
    const particlesRef = useRef<Particle[]>([]);
    const initRef = useRef(false);

    const phase = (state.phase as string) || 'intro';
    const showConduction = (state.showConduction as boolean) || false;
    const showConvection = (state.showConvection as boolean) || false;
    const showRadiation = (state.showRadiation as boolean) || false;

    // Initialize rod particles for conduction visualization
    useEffect(() => {
        if (!initRef.current) {
            const pts: Particle[] = [];
            for (let i = 0; i < 14; i++) {
                pts.push({ x: i, y: 0, vx: 0, vy: 0, temp: 0 });
            }
            particlesRef.current = pts;
            initRef.current = true;
        }
    }, []);

    // Update conduction particles over time
    useEffect(() => {
        if (phase === 'conduction' || showConduction) {
            const pts = particlesRef.current;
            // Heat the first particle (fire end)
            if (pts.length > 0) pts[0].temp = 1;
        }
    }, [phase, showConduction]);

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
        ctx.fillText('The Campfire Puzzle', W / 2, 28);

        // Phase label
        ctx.fillStyle = '#64748b';
        ctx.font = '18px monospace';
        const phaseLabels: Record<string, string> = {
            'intro': '🔥 How does heat from a campfire reach you?',
            'campfire': '🔥 Three ways heat can travel…',
            'conduction': '🐟  Conduction — heat through touch',
            'convection': '🔵 Convection — hot fluid rises',
            'radiation': '🔴 Radiation — invisible infrared rays',
            'all_three': '🔥 All three at once!',
            'checkpoint': '☕ Which type warms your hands on a mug?',
            'discovery': '🎉 Three ways heat travels!',
            'complete': '✅ Lesson complete!',
        };
        ctx.fillText(phaseLabels[phase] || '', W / 2, 48);

        const cx = W / 2;
        const cy = H / 2 + 10;

        // Update conduction particle temps
        const pts = particlesRef.current;
        if ((phase === 'conduction' || phase === 'all_three' || showConduction) && pts.length > 0) {
            pts[0].temp = 1;
            for (let i = 1; i < pts.length; i++) {
                const diff = pts[i - 1].temp - pts[i].temp;
                pts[i].temp += diff * 0.008;
            }
        }

        if (phase === 'intro') {
            drawIntro(ctx, cx, cy, W, H, t);
        } else if (phase === 'campfire') {
            drawCampfire(ctx, cx, cy, W, H, t);
        } else if (phase === 'conduction') {
            drawCampfire(ctx, cx, cy, W, H, t);
            drawConduction(ctx, cx, cy, W, H, t);
        } else if (phase === 'convection') {
            drawCampfire(ctx, cx, cy, W, H, t);
            drawConvection(ctx, cx, cy, W, H, t);
        } else if (phase === 'radiation') {
            drawCampfire(ctx, cx, cy, W, H, t);
            drawRadiation(ctx, cx, cy, W, H, t);
        } else if (phase === 'all_three') {
            drawCampfire(ctx, cx, cy, W, H, t);
            drawConduction(ctx, cx, cy, W, H, t);
            drawConvection(ctx, cx, cy, W, H, t);
            drawRadiation(ctx, cx, cy, W, H, t);
            drawAllThreeLabels(ctx, cx, cy, W, H);
        } else if (phase === 'checkpoint') {
            drawCheckpoint(ctx, cx, cy, W, H, t);
        } else if (phase === 'discovery' || phase === 'complete') {
            drawDiscovery(ctx, cx, cy, W, H, t);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, showConduction, showConvection, showRadiation]);

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

    // --- Drawing helpers ---

    function tempToColor(temp: number): string {
        // 0 = blue/cool, 1 = red/hot
        const r = Math.floor(60 + temp * 195);
        const g = Math.floor(100 + (1 - temp) * 100 - temp * 60);
        const b = Math.floor(220 - temp * 180);
        return `rgb(${r},${g},${b})`;
    }

    function drawFire(ctx: CanvasRenderingContext2D, fx: number, fy: number, size: number, t: number) {
        // Glowing base
        const glow = ctx.createRadialGradient(fx, fy, size * 0.2, fx, fy, size * 2);
        glow.addColorStop(0, 'rgba(255, 160, 20, 0.25)');
        glow.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(fx, fy, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Logs
        ctx.fillStyle = '#5C3317';
        ctx.save();
        ctx.translate(fx, fy + size * 0.5);
        ctx.rotate(-0.2);
        ctx.fillRect(-size * 0.7, -4, size * 1.4, 8);
        ctx.restore();
        ctx.save();
        ctx.translate(fx, fy + size * 0.6);
        ctx.rotate(0.15);
        ctx.fillRect(-size * 0.6, -4, size * 1.2, 8);
        ctx.restore();

        // Flame triangles (flickering)
        const flames = [
            { ox: -size * 0.3, h: size * 1.1, w: size * 0.4, phase: 0 },
            { ox: 0, h: size * 1.4, w: size * 0.5, phase: 1.2 },
            { ox: size * 0.25, h: size * 1.0, w: size * 0.35, phase: 2.5 },
            { ox: -size * 0.15, h: size * 0.9, w: size * 0.3, phase: 3.7 },
            { ox: size * 0.1, h: size * 1.2, w: size * 0.45, phase: 0.8 },
        ];

        for (const f of flames) {
            const flicker = Math.sin(t * 6 + f.phase) * size * 0.1;
            const sway = Math.sin(t * 3 + f.phase * 0.7) * size * 0.06;
            const grad = ctx.createLinearGradient(fx + f.ox, fy + size * 0.3, fx + f.ox + sway, fy - f.h + flicker);
            grad.addColorStop(0, '#ff4500');
            grad.addColorStop(0.4, '#ff8c00');
            grad.addColorStop(0.7, '#ffd700');
            grad.addColorStop(1, 'rgba(255, 255, 200, 0.3)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(fx + f.ox - f.w / 2, fy + size * 0.3);
            ctx.quadraticCurveTo(
                fx + f.ox + sway, fy - f.h * 0.5 + flicker,
                fx + f.ox + sway * 0.5, fy - f.h + flicker
            );
            ctx.quadraticCurveTo(
                fx + f.ox + sway, fy - f.h * 0.5 + flicker,
                fx + f.ox + f.w / 2, fy + size * 0.3
            );
            ctx.closePath();
            ctx.fill();
        }

        // Inner bright core
        const coreGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, size * 0.4);
        coreGrad.addColorStop(0, 'rgba(255,255,220,0.6)');
        coreGrad.addColorStop(1, 'rgba(255,200,50,0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(fx, fy, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawIntro(ctx: CanvasRenderingContext2D, cx: number, _cy: number, W: number, H: number, t: number) {
        // Night sky background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(30, 64, W - 60, H - 100);

        // Stars
        const starSeed = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.15, 0.65, 0.35, 0.9];
        for (let i = 0; i < starSeed.length; i++) {
            const sx = 40 + starSeed[i] * (W - 80);
            const sy = 74 + (starSeed[(i + 3) % starSeed.length]) * (H * 0.3);
            const twinkle = 0.4 + Math.sin(t * 2 + i * 1.3) * 0.3;
            ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Ground
        ctx.fillStyle = '#2d4a2d';
        ctx.fillRect(30, H * 0.7, W - 60, H * 0.3 - 36);

        // Campfire
        const fireX = cx;
        const fireY = H * 0.65;
        drawFire(ctx, fireX, fireY, 30, t);

        // Person silhouette
        const px = cx + W * 0.22;
        const py = H * 0.62;
        ctx.fillStyle = '#1e293b';
        // Head
        ctx.beginPath();
        ctx.arc(px, py - 30, 10, 0, Math.PI * 2);
        ctx.fill();
        // Body
        ctx.fillRect(px - 6, py - 20, 12, 28);
        // Legs
        ctx.fillRect(px - 6, py + 8, 5, 16);
        ctx.fillRect(px + 1, py + 8, 5, 16);

        // Question mark
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('?', px, py - 46);

        // Heat question waves
        for (let i = 0; i < 3; i++) {
            const wave = (t * 0.5 + i * 0.33) % 1;
            const alpha = 1 - wave;
            ctx.strokeStyle = `rgba(255,100,50,${alpha * 0.4})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(fireX, fireY - 10, 40 + wave * 80, -0.6, 0.6);
            ctx.stroke();
        }
    }

    function drawCampfire(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number) {
        // Ground area
        const groundY = cy + 50;
        ctx.fillStyle = '#e8e0d4';
        ctx.fillRect(30, groundY, W - 60, 80);
        ctx.strokeStyle = '#d1c8b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, groundY, W - 60, 80);

        // Stone circle
        ctx.fillStyle = '#9ca3af';
        const stoneCount = 8;
        for (let i = 0; i < stoneCount; i++) {
            const angle = (i / stoneCount) * Math.PI * 2;
            const sr = 40;
            const sx = cx + Math.cos(angle) * sr;
            const sy = cy + 10 + Math.sin(angle) * sr * 0.5;
            ctx.beginPath();
            ctx.ellipse(sx, sy, 8, 6, angle, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        drawFire(ctx, cx, cy - 10, 28, t);
    }

    function drawConduction(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number) {
        const pts = particlesRef.current;
        const rodStartX = cx + 10;
        const rodEndX = Math.min(cx + W * 0.35, W - 50);
        const rodY = cy + 10;
        const rodLen = rodEndX - rodStartX;

        // Rod background
        ctx.lineWidth = 10;
        const rodGrad = ctx.createLinearGradient(rodStartX, rodY, rodEndX, rodY);
        rodGrad.addColorStop(0, '#ef4444');
        rodGrad.addColorStop(0.5, '#f59e0b');
        rodGrad.addColorStop(1, '#3b82f6');
        ctx.strokeStyle = rodGrad;
        ctx.beginPath();
        ctx.moveTo(rodStartX, rodY);
        ctx.lineTo(rodEndX, rodY);
        ctx.stroke();

        // Rod outline
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(rodStartX, rodY - 5, rodLen, 10);

        // Particles vibrating along the rod
        for (let i = 0; i < pts.length; i++) {
            const frac = i / (pts.length - 1);
            const px = rodStartX + frac * rodLen;
            const vibration = pts[i].temp * 4 * Math.sin(t * 12 + i * 2.1);
            const py = rodY + vibration;
            ctx.fillStyle = tempToColor(pts[i].temp);
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // "Bump" arrows between particles
        const arrowCount = Math.min(Math.floor(t * 0.8), pts.length - 1);
        for (let i = 0; i < Math.min(arrowCount, pts.length - 1); i++) {
            const frac1 = i / (pts.length - 1);
            const frac2 = (i + 1) / (pts.length - 1);
            const ax = rodStartX + (frac1 + frac2) / 2 * rodLen;
            const ay = rodY + 18;
            ctx.fillStyle = `rgba(239,68,68,${Math.max(0, 1 - i * 0.12)})`;
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('→', ax, ay);
        }

        // Label
        ctx.fillStyle = '#ea580c';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🐟  CONDUCTION: particle → particle', cx + W * 0.18, cy + 44);

        // Hand icon at cold end
        ctx.font = '24px serif';
        ctx.fillText('🤚', rodEndX + 10, rodY + 7);
    }

    function drawConvection(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number) {
        // Convection arrows — rising hot air
        const arrowLoopCx = cx;
        const arrowTop = cy - 90;
        const arrowBot = cy - 20;
        const loopW = W * 0.14;

        // Rising hot arrows (center/up)
        for (let i = 0; i < 5; i++) {
            const progress = ((t * 0.3 + i * 0.2) % 1);
            const ay = arrowBot - progress * (arrowBot - arrowTop);
            const alpha = Math.sin(progress * Math.PI);
            const wobble = Math.sin(t * 2 + i) * 3;
            ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.7})`;
            ctx.beginPath();
            // Upward triangle arrow
            ctx.moveTo(arrowLoopCx + wobble, ay - 6);
            ctx.lineTo(arrowLoopCx - 5 + wobble, ay + 4);
            ctx.lineTo(arrowLoopCx + 5 + wobble, ay + 4);
            ctx.closePath();
            ctx.fill();
        }

        // "HOT" label rising
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('HOT ↑', arrowLoopCx, arrowTop - 6);

        // Cool air sinking arrows (sides)
        for (let side = -1; side <= 1; side += 2) {
            const sideX = arrowLoopCx + side * loopW;
            for (let i = 0; i < 4; i++) {
                const progress = ((t * 0.25 + i * 0.25) % 1);
                const ay = arrowTop + progress * (arrowBot - arrowTop);
                const alpha = Math.sin(progress * Math.PI);
                ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.6})`;
                ctx.beginPath();
                // Downward triangle arrow
                ctx.moveTo(sideX, ay + 6);
                ctx.lineTo(sideX - 4, ay - 3);
                ctx.lineTo(sideX + 4, ay - 3);
                ctx.closePath();
                ctx.fill();
            }
        }

        // "COOL" labels
        ctx.fillStyle = '#3b82f6';
        ctx.font = 'bold 17px monospace';
        ctx.fillText('↓ COOL', arrowLoopCx - loopW, arrowBot + 14);
        ctx.fillText('↓ COOL', arrowLoopCx + loopW, arrowBot + 14);

        // Loop outline
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.ellipse(arrowLoopCx, (arrowTop + arrowBot) / 2, loopW, (arrowBot - arrowTop) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔵 CONVECTION: hot air rises, cool air sinks', cx, arrowTop - 22);
    }

    function drawRadiation(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number) {
        // Wavy infrared lines emanating from fire in all directions
        const fireX = cx;
        const fireY = cy - 10;
        const rayCount = 10;
        const maxDist = Math.min(W * 0.32, 160);

        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2;
            // Skip the bottom rays (into ground)
            if (angle > Math.PI * 0.7 && angle < Math.PI * 1.3) continue;

            const waveOffset = (t * 1.5 + i * 0.5) % 1;
            const dist = 30 + waveOffset * (maxDist - 30);
            const alpha = 1 - waveOffset;

            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * 0.6})`;
            ctx.lineWidth = 2;
            ctx.beginPath();

            const segments = 12;
            for (let s = 0; s <= segments; s++) {
                const frac = s / segments;
                const d = 30 + frac * (dist - 30);
                const perpAngle = angle + Math.PI / 2;
                const wave = Math.sin(frac * Math.PI * 4 + t * 4 + i) * 4;
                const wx = fireX + Math.cos(angle) * d + Math.cos(perpAngle) * wave;
                const wy = fireY + Math.sin(angle) * d + Math.sin(perpAngle) * wave;
                if (s === 0) ctx.moveTo(wx, wy);
                else ctx.lineTo(wx, wy);
            }
            ctx.stroke();
        }

        // Label
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔴 RADIATION: infrared rays (no contact needed!)', cx, cy + 70);
    }

    function drawAllThreeLabels(ctx: CanvasRenderingContext2D, cx: number, _cy: number, W: number, H: number) {
        // Summary box at bottom
        const boxY = H - 68;
        ctx.fillStyle = 'rgba(251, 191, 36, 0.08)';
        ctx.fillRect(30, boxY, W - 60, 44);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, boxY, W - 60, 44);
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🐟  Conduction (rod)   🔵 Convection (air)   🔴 Radiation (rays)', cx, boxY + 18);
        ctx.font = '17px monospace';
        ctx.fillStyle = '#78350f';
        ctx.fillText('All three happen simultaneously around any hot object!', cx, boxY + 34);
    }

    function drawCheckpoint(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number) {
        // Mug
        const mugX = cx;
        const mugY = cy - 10;
        const mugW = 40;
        const mugH = 50;

        // Steam from mug
        for (let i = 0; i < 3; i++) {
            const progress = ((t * 0.3 + i * 0.33) % 1);
            const sy = mugY - mugH / 2 - 10 - progress * 40;
            const alpha = 1 - progress;
            const sway = Math.sin(t * 2 + i * 2) * 8;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(mugX - 8 + i * 8 + sway, sy + 10);
            ctx.quadraticCurveTo(mugX - 8 + i * 8 + sway + 5, sy + 5, mugX - 8 + i * 8 + sway, sy);
            ctx.stroke();
        }

        // Mug body
        const mugGrad = ctx.createLinearGradient(mugX - mugW / 2, mugY, mugX + mugW / 2, mugY);
        mugGrad.addColorStop(0, '#d97706');
        mugGrad.addColorStop(0.5, '#f59e0b');
        mugGrad.addColorStop(1, '#d97706');
        ctx.fillStyle = mugGrad;
        ctx.beginPath();
        ctx.roundRect(mugX - mugW / 2, mugY - mugH / 2, mugW, mugH, 4);
        ctx.fill();
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cocoa
        ctx.fillStyle = '#5C3317';
        ctx.fillRect(mugX - mugW / 2 + 3, mugY - mugH / 2 + 5, mugW - 6, mugH * 0.4);

        // Handle
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(mugX + mugW / 2 + 8, mugY, 12, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        // Hands wrapping
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🤲', mugX - 2, mugY + mugH / 2 + 30);

        // Conduction arrows from mug to hands
        for (let i = 0; i < 4; i++) {
            const wave = (t * 0.6 + i * 0.25) % 1;
            const alpha = Math.sin(wave * Math.PI);
            const y = mugY - mugH / 2 + 10 + i * 12;
            // Left arrows
            ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.5})`;
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('←', mugX - mugW / 2 - 12, y);
            ctx.fillText('→', mugX + mugW / 2 + 12, y);
        }

        // Label
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Hot mug + hands touching = ?', cx, cy + mugH / 2 + 60);

        // Hint options drawn as boxes
        const opts = ['🐟  Conduction', '🔵 Convection', '🔴 Radiation'];
        const optW = W * 0.22;
        for (let i = 0; i < opts.length; i++) {
            const ox = cx - (opts.length - 1) * optW / 2 + i * optW;
            const oy = cy + mugH / 2 + 76;
            ctx.fillStyle = i === 0 ? 'rgba(234,88,12,0.08)' : 'rgba(100,116,139,0.05)';
            ctx.fillRect(ox - optW / 2 + 4, oy - 10, optW - 8, 22);
            ctx.strokeStyle = i === 0 ? '#ea580c' : '#cbd5e1';
            ctx.lineWidth = 1;
            ctx.strokeRect(ox - optW / 2 + 4, oy - 10, optW - 8, 22);
            ctx.fillStyle = '#475569';
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(opts[i], ox, oy + 4);
        }
    }

    function drawDiscovery(ctx: CanvasRenderingContext2D, cx: number, _cy: number, W: number, H: number, t: number) {
        const cardW = Math.min(W * 0.26, 130);
        const cardH = H * 0.42;
        const gap = 16;
        const totalW = cardW * 3 + gap * 2;
        const startX = cx - totalW / 2;
        const cardY = 68;

        const cards = [
            {
                title: 'Conduction',
                emoji: '🐟 ',
                color: '#ea580c',
                bgColor: 'rgba(234,88,12,0.06)',
                desc: ['Through direct', 'CONTACT', '', 'Particle bumps', 'particle like', 'dominoes'],
                icon: '🤝'
            },
            {
                title: 'Convection',
                emoji: '🔵',
                color: '#2563eb',
                bgColor: 'rgba(37,99,235,0.06)',
                desc: ['Through moving', 'FLUID', '', 'Hot rises, cool', 'sinks in a', 'loop pattern'],
                icon: '🌀'
            },
            {
                title: 'Radiation',
                emoji: '🔴',
                color: '#dc2626',
                bgColor: 'rgba(220,38,38,0.06)',
                desc: ['Through invisible', 'INFRARED RAYS', '', 'No material', 'needed — works', 'through space!'],
                icon: '☀️'
            }
        ];

        for (let i = 0; i < cards.length; i++) {
            const c = cards[i];
            const x = startX + i * (cardW + gap);

            // Card background
            ctx.fillStyle = c.bgColor;
            ctx.beginPath();
            ctx.roundRect(x, cardY, cardW, cardH, 6);
            ctx.fill();
            ctx.strokeStyle = c.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Icon
            ctx.font = '24px serif';
            ctx.textAlign = 'center';
            ctx.fillText(c.icon, x + cardW / 2, cardY + 32);

            // Title
            ctx.fillStyle = c.color;
            ctx.font = 'bold 18px monospace';
            ctx.fillText(`${c.emoji} ${c.title}`, x + cardW / 2, cardY + 52);

            // Description lines
            ctx.fillStyle = '#475569';
            ctx.font = '17px monospace';
            for (let line = 0; line < c.desc.length; line++) {
                const bold = c.desc[line] === c.desc[line].toUpperCase() && c.desc[line].length > 0;
                if (bold) {
                    ctx.font = 'bold 17px monospace';
                    ctx.fillStyle = c.color;
                } else {
                    ctx.font = '17px monospace';
                    ctx.fillStyle = '#475569';
                }
                ctx.fillText(c.desc[line], x + cardW / 2, cardY + 70 + line * 14);
            }

            // Mini animation in each card
            const miniY = cardY + cardH - 36;
            if (i === 0) {
                // Conduction: moving dots
                for (let d = 0; d < 5; d++) {
                    const frac = d / 4;
                    const px = x + 16 + frac * (cardW - 32);
                    const vib = Math.sin(t * 8 + d * 1.5) * (2 + frac * 2);
                    ctx.fillStyle = tempToColor(1 - frac);
                    ctx.beginPath();
                    ctx.arc(px, miniY + vib, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (i === 1) {
                // Convection: circling arrow
                const loopR = 12;
                const angle = t * 2;
                const dotX = x + cardW / 2 + Math.cos(angle) * loopR;
                const dotY = miniY + Math.sin(angle) * loopR * 0.6;
                ctx.strokeStyle = 'rgba(37,99,235,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.ellipse(x + cardW / 2, miniY, loopR, loopR * 0.6, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#3b82f6';
                ctx.beginPath();
                ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Radiation: expanding wave
                const wave = (t * 0.5) % 1;
                ctx.strokeStyle = `rgba(220,38,38,${1 - wave})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(x + cardW / 2, miniY, 5 + wave * 20, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Bottom summary
        const boxY = cardY + cardH + 14;
        ctx.fillStyle = 'rgba(251,191,36,0.08)';
        const boxH = 44;
        ctx.fillRect(30, boxY, W - 60, boxH);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, boxY, W - 60, boxH);
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔥 Heat transfer drives weather, animal adaptations & more!', cx, boxY + 16);
        ctx.font = '17px monospace';
        ctx.fillStyle = '#78350f';
        ctx.fillText('C8: Sun → evaporation → weather  |  B8: Fur, ears & skin manage heat', cx, boxY + 32);
    }

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
};

