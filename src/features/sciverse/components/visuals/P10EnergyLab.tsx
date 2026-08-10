import { useRef, useEffect, useCallback } from 'react';

interface P10EnergyLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const P10EnergyLab = ({ state, onStateChange }: P10EnergyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const setStateValue = (key: string, value: unknown) => {
        onStateChange?.(key, value);
    };

    const phase = (state.phase as string) || 'intro';
    const showPollution = (state.showPollution as boolean) || false;
    const showNight = (state.showNight as boolean) || false;
    const showCalm = (state.showCalm as boolean) || false;
    const reveal = (state.reveal as string) || '';

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

        // Sky
        if (phase === 'checkpoint' || showNight) {
            const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
            skyGrad.addColorStop(0, '#0f172a');
            skyGrad.addColorStop(1, '#1e3a5f');
            ctx.fillStyle = skyGrad;
        } else {
            const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
            skyGrad.addColorStop(0, '#87ceeb');
            skyGrad.addColorStop(1, '#e0f7fa');
            ctx.fillStyle = skyGrad;
        }
        ctx.fillRect(0, 0, W, H * 0.55);

        // Ground
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, H * 0.55, W, H * 0.45);

        // Phase label
        ctx.fillStyle = phase === 'checkpoint' || showNight ? '#94a3b8' : '#1e293b';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        const phaseLabels: Record<string, string> = {
            'intro': '⚡ Power the Town — Choose Your Energy!',
            'fossil': '🏭 Fossil Fuels — Burning Coal & Oil',
            'solar': '☀️ Solar Energy — Capturing Sunlight',
            'wind': '💨 Wind Energy — Spinning Turbines',
            'hydro': '🌊 Hydroelectric — Falling Water Power',
            'compare': '📊 Energy Source Comparison',
            'checkpoint': '🌙 Midnight Challenge — No Sun, No Wind!',
            'discovery': '🎉 Renewables Power the Future!',
            'complete': '✅ Lesson P10 Complete!',
        };
        ctx.fillText(phaseLabels[phase] || '', W / 2, 24);

        if (phase === 'intro') drawIntro(ctx, W, H, t);
        else if (phase === 'fossil') drawFossil(ctx, W, H, t, showPollution);
        else if (phase === 'solar') drawSolar(ctx, W, H, t, showNight);
        else if (phase === 'wind') drawWind(ctx, W, H, t, showCalm);
        else if (phase === 'hydro') drawHydro(ctx, W, H, t);
        else if (phase === 'compare') drawCompare(ctx, W, H, t);
        else if (phase === 'checkpoint') drawCheckpoint(ctx, W, H, t, reveal);
        else if (phase === 'discovery' || phase === 'complete') drawDiscovery(ctx, W, H, t, phase === 'complete');

        animRef.current = requestAnimationFrame(animate);
    }, [phase, showPollution, showNight, showCalm, reveal]);

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

    // ---- Town skyline ----

    function drawTown(ctx: CanvasRenderingContext2D, W: number, H: number, litFraction: number, xOffset: number) {
        const baseY = H * 0.55;
        const buildings = [
            { x: 0.08, w: 0.06, h: 0.18 },
            { x: 0.16, w: 0.07, h: 0.24 },
            { x: 0.24, w: 0.05, h: 0.15 },
            { x: 0.31, w: 0.08, h: 0.28 },
            { x: 0.41, w: 0.06, h: 0.2 },
        ];

        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            const bx = (b.x + xOffset) * W;
            const bw = b.w * W;
            const bh = b.h * H;
            const by = baseY - bh;

            // Building
            ctx.fillStyle = '#475569';
            ctx.fillRect(bx, by, bw, bh);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, bw, bh);

            // Windows
            const cols = Math.max(2, Math.floor(bw / 12));
            const rows = Math.max(2, Math.floor(bh / 16));
            const winW = 6;
            const winH = 8;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const wx = bx + 4 + c * ((bw - 8) / cols);
                    const wy = by + 6 + r * ((bh - 10) / rows);
                    const isLit = (i + r + c) / (buildings.length + rows + cols) < litFraction;
                    ctx.fillStyle = isLit ? '#fbbf24' : '#1e293b';
                    ctx.fillRect(wx, wy, winW, winH);
                }
            }
        }
    }

    // ---- Sun with rays ----

    function drawSun(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, size: number) {
        const pulse = 1 + Math.sin(t * 2) * 0.05;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2 + t * 0.4;
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a) * (size + 4), y + Math.sin(a) * (size + 4));
            ctx.lineTo(x + Math.cos(a) * (size + 14), y + Math.sin(a) * (size + 14));
            ctx.stroke();
        }
    }

    // ---- Moon & stars ----

    function drawNightSky(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        // Moon
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(W * 0.85, H * 0.12, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(W * 0.85 + 6, H * 0.12 - 3, 15, 0, Math.PI * 2);
        ctx.fill();

        // Stars
        ctx.fillStyle = '#fef3c7';
        const stars = [0.1, 0.25, 0.4, 0.55, 0.7, 0.15, 0.65, 0.35, 0.8, 0.5];
        for (let i = 0; i < stars.length; i++) {
            const sx = stars[i] * W;
            const sy = 35 + (i * 17) % (H * 0.3);
            const twinkle = 1 + Math.sin(t * 3 + i * 1.7) * 0.5;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.5 * twinkle, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ---- Smoke / CO₂ puffs ----

    function drawSmoke(ctx: CanvasRenderingContext2D, x: number, baseY: number, t: number, count: number) {
        for (let i = 0; i < count; i++) {
            const age = (t * 0.5 + i * 0.3) % 2;
            const py = baseY - age * 80;
            const px = x + Math.sin(t + i * 1.5) * (10 + age * 15);
            const size = 8 + age * 18;
            const alpha = Math.max(0, 0.5 - age * 0.25);
            ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ---- Phase: Intro ----

    function drawIntro(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        drawSun(ctx, W * 0.85, H * 0.12, t, 22);
        drawTown(ctx, W, H, 0, 0.2);

        // "No Power" sign
        const signX = W / 2;
        const signY = H * 0.7;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(signX - 80, signY - 16, 160, 32);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(signX - 80, signY - 16, 160, 32);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚠️ NO POWER — dark town!', signX, signY + 4);

        // Question marks over buildings
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 24px monospace';
        const qPositions = [0.31, 0.39, 0.47];
        for (let i = 0; i < qPositions.length; i++) {
            const qx = qPositions[i] * W + Math.sin(t * 1.2 + i) * 4;
            const qy = H * 0.3 + Math.sin(t * 0.8 + i * 2) * 5;
            ctx.fillText('?', qx, qy);
        }

        // Energy source icons along the bottom
        ctx.font = '18px monospace';
        ctx.fillStyle = '#475569';
        const icons = [
            { emoji: '🏭', label: 'Fossil Fuels', x: W * 0.15 },
            { emoji: '☀️', label: 'Solar', x: W * 0.38 },
            { emoji: '💨', label: 'Wind', x: W * 0.6 },
            { emoji: '🌊', label: 'Hydro', x: W * 0.82 },
        ];
        for (const ic of icons) {
            ctx.font = '24px monospace';
            ctx.fillText(ic.emoji, ic.x, H - 40);
            ctx.font = '17px monospace';
            ctx.fillStyle = '#334155';
            ctx.fillText(ic.label, ic.x, H - 18);
        }
    }

    // ---- Phase: Fossil ----

    function drawFossil(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, pollution: boolean) {
        drawSun(ctx, W * 0.85, H * 0.12, t, 18);
        drawTown(ctx, W, H, 0.9, 0.45);

        const baseY = H * 0.55;
        const factX = W * 0.15;

        // Factory building
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(factX - 35, baseY - 80, 70, 80);
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 2;
        ctx.strokeRect(factX - 35, baseY - 80, 70, 80);

        // Door
        ctx.fillStyle = '#374151';
        ctx.fillRect(factX - 8, baseY - 25, 16, 25);

        // Smokestack
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(factX + 10, baseY - 130, 18, 50);

        // Flames in furnace window
        const flicker = Math.sin(t * 8) * 3;
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(factX - 18, baseY - 55 + flicker, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(factX - 18, baseY - 58 + flicker, 5, 0, Math.PI * 2);
        ctx.fill();

        // Smoke / CO₂
        if (pollution) {
            drawSmoke(ctx, factX + 19, baseY - 130, t, 8);

            // CO₂ labels
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            for (let i = 0; i < 3; i++) {
                const age = (t * 0.4 + i * 0.6) % 2;
                const ly = baseY - 140 - age * 60;
                const lx = factX + 19 + Math.sin(t + i * 2) * 20;
                const alpha = Math.max(0, 0.8 - age * 0.4);
                ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
                ctx.fillText('CO₂', lx, ly);
            }

            // Warning box
            ctx.fillStyle = 'rgba(254, 226, 226, 0.9)';
            ctx.fillRect(W * 0.55, H * 0.65, W * 0.38, 50);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(W * 0.55, H * 0.65, W * 0.38, 50);
            ctx.fillStyle = '#991b1b';
            ctx.font = 'bold 17px monospace';
            ctx.fillText('⚠️ Pollution detected!', W * 0.74, H * 0.65 + 18);
            ctx.font = '16px monospace';
            ctx.fillText('CO₂ → Greenhouse effect → Warming', W * 0.74, H * 0.65 + 34);
        } else {
            drawSmoke(ctx, factX + 19, baseY - 130, t, 4);
        }

        // Power line from factory to town
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(factX + 35, baseY - 60);
        ctx.lineTo(W * 0.45, baseY - 60);
        ctx.stroke();
        // Pylons
        for (const px of [factX + 35, W * 0.3, W * 0.45]) {
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(px, baseY);
            ctx.lineTo(px, baseY - 65);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px - 6, baseY - 60);
            ctx.lineTo(px + 6, baseY - 60);
            ctx.stroke();
        }

        // Label
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Coal → Heat → Steam → Turbine → Electricity', W / 2, H - 16);
    }

    // ---- Phase: Solar ----

    function drawSolar(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, night: boolean) {
        if (night) {
            drawNightSky(ctx, W, H, t);
        } else {
            drawSun(ctx, W * 0.82, H * 0.1, t, 24);
        }
        drawTown(ctx, W, H, night ? 0.1 : 0.85, 0.5);

        const baseY = H * 0.55;
        const panelCX = W * 0.2;

        // Solar panels
        const panelCount = 4;
        for (let i = 0; i < panelCount; i++) {
            const px = panelCX - 50 + i * 28;
            const py = baseY - 30;
            // Stand
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px + 10, py + 20);
            ctx.lineTo(px + 10, baseY);
            ctx.stroke();
            // Panel (tilted rect)
            ctx.fillStyle = '#1e3a5f';
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + 24, py - 8);
            ctx.lineTo(px + 24, py + 12);
            ctx.lineTo(px, py + 20);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            // Grid lines on panel
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px + 12, py - 4);
            ctx.lineTo(px + 12, py + 16);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py + 10);
            ctx.lineTo(px + 24, py + 2);
            ctx.stroke();
        }

        // Sun rays hitting panels (animated)
        if (!night) {
            const sunX = W * 0.82;
            const sunY = H * 0.1;
            for (let i = 0; i < panelCount; i++) {
                const px = panelCX - 40 + i * 28;
                const py = baseY - 22;
                const progress = ((t * 0.8 + i * 0.2) % 1);
                const rx = sunX + (px - sunX) * progress;
                const ry = sunY + (py - sunY) * progress;
                ctx.fillStyle = `rgba(251, 191, 36, ${1 - progress})`;
                ctx.beginPath();
                ctx.arc(rx, ry, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Electron flow in wire
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(panelCX + 40, baseY - 10);
            ctx.lineTo(W * 0.5, baseY - 10);
            ctx.stroke();

            for (let i = 0; i < 5; i++) {
                const ep = ((t * 0.6 + i * 0.2) % 1);
                const ex = panelCX + 40 + (W * 0.5 - panelCX - 40) * ep;
                ctx.fillStyle = '#3b82f6';
                ctx.beginPath();
                ctx.arc(ex, baseY - 10, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#dbeafe';
                ctx.font = '15px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('e⁻', ex, baseY - 17);
            }
        }

        if (night) {
            // "No light" indicator
            ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
            ctx.fillRect(panelCX - 60, baseY - 60, 130, 24);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🌙 No sunlight — panels off', panelCX + 5, baseY - 44);
        }

        // Label
        ctx.fillStyle = night ? '#94a3b8' : '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Photons → Knock Electrons → Electricity', W / 2, H - 16);
    }

    // ---- Phase: Wind ----

    function drawWind(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, calm: boolean) {
        drawSun(ctx, W * 0.85, H * 0.12, t, 18);
        drawTown(ctx, W, H, calm ? 0.15 : 0.85, 0.52);

        const baseY = H * 0.55;
        const turbineCount = 3;

        for (let i = 0; i < turbineCount; i++) {
            const tx = W * 0.12 + i * W * 0.12;
            const towerH = 100 + i * 15;
            const hubY = baseY - towerH;

            // Tower
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(tx, baseY);
            ctx.lineTo(tx, hubY);
            ctx.stroke();

            // Hub
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.arc(tx, hubY, 5, 0, Math.PI * 2);
            ctx.fill();

            // Blades (spinning)
            const speed = calm ? 0 : 3 + i * 0.5;
            const bladeAngle = t * speed + i * 1.2;
            const bladeLen = 35 + i * 5;
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 3;
            for (let b = 0; b < 3; b++) {
                const a = bladeAngle + (b / 3) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(tx, hubY);
                ctx.lineTo(tx + Math.cos(a) * bladeLen, hubY + Math.sin(a) * bladeLen);
                ctx.stroke();
            }
        }

        // Wind arrows
        if (!calm) {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 6; i++) {
                const ax = ((t * 40 + i * 70) % (W * 0.5));
                const ay = H * 0.2 + i * 20;
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(ax + 25, ay);
                ctx.stroke();
                // Arrowhead
                ctx.beginPath();
                ctx.moveTo(ax + 25, ay);
                ctx.lineTo(ax + 20, ay - 4);
                ctx.moveTo(ax + 25, ay);
                ctx.lineTo(ax + 20, ay + 4);
                ctx.stroke();
            }
        } else {
            // Calm indicator
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(W * 0.06, H * 0.3, 140, 24);
            ctx.fillStyle = '#475569';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('😐 No wind — blades stopped', W * 0.06 + 70, H * 0.3 + 16);
        }

        // Power line
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(W * 0.42, baseY - 50);
        ctx.lineTo(W * 0.52, baseY - 50);
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Wind → Spin Blades → Generator → Electricity', W / 2, H - 16);
    }

    // ---- Phase: Hydro ----

    function drawHydro(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        drawSun(ctx, W * 0.85, H * 0.12, t, 18);
        drawTown(ctx, W, H, 0.9, 0.58);

        const baseY = H * 0.55;
        const damX = W * 0.25;
        const damTop = baseY - 110;
        const damW = 25;

        // Reservoir (water behind dam)
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(0, damTop + 10, damX, baseY - damTop - 10);
        // Slight wave
        ctx.fillStyle = '#93c5fd';
        for (let i = 0; i < 10; i++) {
            const wx = i * (damX / 10);
            const wy = damTop + 10 + Math.sin(t * 2 + i * 0.8) * 3;
            ctx.beginPath();
            ctx.arc(wx + damX / 20, wy, damX / 18, 0, Math.PI);
            ctx.fill();
        }

        // Dam wall
        ctx.fillStyle = '#9ca3af';
        ctx.beginPath();
        ctx.moveTo(damX, damTop);
        ctx.lineTo(damX + damW, damTop + 15);
        ctx.lineTo(damX + damW, baseY);
        ctx.lineTo(damX, baseY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Horizontal lines on dam
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 0.5;
        for (let i = 1; i < 6; i++) {
            const ly = damTop + i * ((baseY - damTop) / 6);
            ctx.beginPath();
            ctx.moveTo(damX, ly);
            ctx.lineTo(damX + damW, ly);
            ctx.stroke();
        }

        // Water flowing out
        const outY = baseY - 30;
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(damX + damW, outY, 50, 12);
        // Animated water particles
        for (let i = 0; i < 8; i++) {
            const wp = ((t * 1.5 + i * 0.12) % 1);
            const wx = damX + damW + wp * 50;
            ctx.fillStyle = 'rgba(147, 197, 253, 0.8)';
            ctx.beginPath();
            ctx.arc(wx, outY + 6 + Math.sin(t * 4 + i) * 3, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Turbine (simple circle with blades)
        const turbX = damX + damW + 55;
        const turbY = outY + 6;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(turbX, turbY, 12, 0, Math.PI * 2);
        ctx.stroke();
        for (let b = 0; b < 4; b++) {
            const a = t * 4 + (b / 4) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(turbX, turbY);
            ctx.lineTo(turbX + Math.cos(a) * 10, turbY + Math.sin(a) * 10);
            ctx.stroke();
        }

        // Generator box
        const genX = turbX + 20;
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(genX, turbY - 10, 20, 20);
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 1;
        ctx.strokeRect(genX, turbY - 10, 20, 20);
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('G', genX + 10, turbY + 4);

        // Power line to town
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(genX + 20, turbY);
        ctx.lineTo(W * 0.58, turbY);
        ctx.lineTo(W * 0.58, baseY - 50);
        ctx.stroke();

        // Water falling animation below dam
        ctx.fillStyle = '#93c5fd';
        for (let i = 0; i < 5; i++) {
            const fy = outY + 14 + ((t * 60 + i * 12) % 40);
            const fx = damX + damW + 10 + Math.sin(t * 2 + i) * 6;
            const alpha = Math.max(0, 1 - (fy - outY - 14) / 40);
            ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.beginPath();
            ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Labels
        ctx.fillStyle = '#1e40af';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Reservoir', damX / 2, damTop + 30);
        ctx.fillText('(PE)', damX / 2, damTop + 42);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Gravity PE → Kinetic → Turbine → Electricity', W / 2, H - 16);
    }

    // ---- Phase: Compare ----

    function drawCompare(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        const cols = 4;
        const colW = (W - 60) / cols;
        const startX = 30;
        const topY = 42;
        const barAreaTop = topY + 40;
        const barAreaBottom = H * 0.55;
        const barH = barAreaBottom - barAreaTop;

        const sources = [
            { label: '🏭 Coal/Oil', power: 0.9, pollution: 0.9, color: '#6b7280', pollColor: '#ef4444' },
            { label: '☀️ Solar', power: 0.65, pollution: 0, color: '#f59e0b', pollColor: '#22c55e' },
            { label: '💨 Wind', power: 0.6, pollution: 0, color: '#60a5fa', pollColor: '#22c55e' },
            { label: '🌊 Hydro', power: 0.85, pollution: 0, color: '#3b82f6', pollColor: '#22c55e' },
        ];

        // Column headers
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        for (let i = 0; i < cols; i++) {
            const cx = startX + i * colW + colW / 2;
            ctx.fillStyle = '#1e293b';
            ctx.fillText(sources[i].label, cx, topY + 14);
        }

        // Bar charts
        const subBarW = 18;
        const animFill = Math.min(1, t * 0.4);

        for (let i = 0; i < cols; i++) {
            const cx = startX + i * colW + colW / 2;
            const s = sources[i];

            // Power bar
            const ph = s.power * barH * animFill;
            ctx.fillStyle = s.color;
            ctx.fillRect(cx - subBarW - 4, barAreaBottom - ph, subBarW, ph);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(cx - subBarW - 4, barAreaBottom - ph, subBarW, ph);

            // Pollution bar
            const pollH = Math.max(2, s.pollution * barH * animFill);
            ctx.fillStyle = s.pollColor;
            ctx.fillRect(cx + 4, barAreaBottom - pollH, subBarW, pollH);
            ctx.strokeStyle = '#334155';
            ctx.strokeRect(cx + 4, barAreaBottom - pollH, subBarW, pollH);
        }

        // Legend
        const legY = barAreaBottom + 14;
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(startX, legY, 10, 10);
        ctx.fillStyle = '#334155';
        ctx.fillText('Power', startX + 14, legY + 9);

        ctx.fillStyle = '#22c55e';
        ctx.fillRect(startX + 70, legY, 10, 10);
        ctx.fillStyle = '#334155';
        ctx.fillText('Clean', startX + 84, legY + 9);

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(startX + 130, legY, 10, 10);
        ctx.fillStyle = '#334155';
        ctx.fillText('Pollution', startX + 144, legY + 9);

        // Summary table below
        const tableY = legY + 30;
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#475569';
        const rows = [
            ['', 'Night?', 'Cost'],
            ['🏭', '✅ Yes', '💰💰'],
            ['☀️', '❌ No', '💰'],
            ['💨', '⚠️ Wind?', '💰'],
            ['🌊', '✅ Yes', '💰💰'],
        ];
        for (let r = 0; r < rows.length; r++) {
            for (let c = 0; c < rows[r].length; c++) {
                const rx = startX + 40 + c * 80;
                const ry = tableY + r * 16;
                ctx.fillStyle = r === 0 ? '#1e293b' : '#475569';
                ctx.font = r === 0 ? 'bold 13px monospace' : '13px monospace';
                ctx.fillText(rows[r][c], rx, ry);
            }
        }

        // Animated arrow pointing: "combine them!"
        const arrowY = H - 36;
        ctx.fillStyle = '#16a34a';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        const bounce = Math.sin(t * 3) * 4;
        ctx.fillText('☀️ + 💨 + 🌊 = Full Coverage!', W / 2 + bounce, arrowY);
    }

    // ---- Phase: Checkpoint ----

    function drawCheckpoint(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, revealSource: string) {
        drawNightSky(ctx, W, H, t);
        drawTown(ctx, W, H, revealSource === 'hydro' ? 0.8 : 0.05, 0.3);

        const baseY = H * 0.55;

        // Crossed-out solar
        const solarX = W * 0.12;
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(solarX - 12, baseY - 25, 24, 18);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(solarX - 16, baseY - 30);
        ctx.lineTo(solarX + 16, baseY - 5);
        ctx.moveTo(solarX + 16, baseY - 30);
        ctx.lineTo(solarX - 16, baseY - 5);
        ctx.stroke();
        ctx.fillStyle = '#94a3b8';
        ctx.font = '15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('No sun', solarX, baseY + 8);

        // Stopped wind turbine
        const windX = W * 0.3;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(windX, baseY);
        ctx.lineTo(windX, baseY - 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(windX, baseY - 80, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#94a3b8';
        ctx.fill();
        // Static blades
        for (let b = 0; b < 3; b++) {
            const a = (b / 3) * Math.PI * 2 - 0.3;
            ctx.beginPath();
            ctx.moveTo(windX, baseY - 80);
            ctx.lineTo(windX + Math.cos(a) * 28, baseY - 80 + Math.sin(a) * 28);
            ctx.stroke();
        }
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(windX - 16, baseY - 100);
        ctx.lineTo(windX + 16, baseY - 60);
        ctx.moveTo(windX + 16, baseY - 100);
        ctx.lineTo(windX - 16, baseY - 60);
        ctx.stroke();
        ctx.fillStyle = '#94a3b8';
        ctx.font = '15px monospace';
        ctx.fillText('No wind', windX, baseY + 8);

        // Hydro dam (highlighted if revealed)
        const damX = W * 0.55;
        const isRevealed = revealSource === 'hydro';
        const glow = isRevealed ? 0.5 + Math.sin(t * 4) * 0.3 : 0;

        if (isRevealed) {
            ctx.fillStyle = `rgba(34, 197, 94, ${glow})`;
            ctx.fillRect(damX - 50, baseY - 120, 130, 130);
        }

        // Reservoir
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(damX - 50, baseY - 70, 40, 70);

        // Dam
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(damX - 10, baseY - 90, 16, 90);
        ctx.strokeStyle = isRevealed ? '#22c55e' : '#6b7280';
        ctx.lineWidth = isRevealed ? 3 : 1;
        ctx.strokeRect(damX - 10, baseY - 90, 16, 90);

        // Water flow
        if (isRevealed) {
            ctx.fillStyle = '#60a5fa';
            for (let i = 0; i < 6; i++) {
                const wp = ((t * 1.2 + i * 0.16) % 1);
                const wx = damX + 6 + wp * 40;
                ctx.beginPath();
                ctx.arc(wx, baseY - 30 + Math.sin(t * 3 + i) * 3, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Gravity works 24/7!', damX + 20, baseY + 14);
        } else {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '15px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Hydro?', damX + 5, baseY + 8);
        }

        // Question bar
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(20, H - 50, W - 40, 30);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(20, H - 50, W - 40, 30);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🌙 Midnight + no wind: which source still works?', W / 2, H - 30);
    }

    // ---- Phase: Discovery / Complete ----

    function drawDiscovery(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, isComplete: boolean) {
        drawSun(ctx, W * 0.85, H * 0.1, t, 22);
        drawTown(ctx, W, H, 1.0, 0.35);

        const baseY = H * 0.55;

        // Solar panels
        for (let i = 0; i < 3; i++) {
            const px = W * 0.06 + i * 24;
            const py = baseY - 28;
            ctx.fillStyle = '#1e3a5f';
            ctx.fillRect(px, py, 18, 14);
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(px, py, 18, 14);
        }

        // Wind turbine
        const tx = W * 0.2;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tx, baseY);
        ctx.lineTo(tx, baseY - 80);
        ctx.stroke();
        for (let b = 0; b < 3; b++) {
            const a = t * 3 + (b / 3) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(tx, baseY - 80);
            ctx.lineTo(tx + Math.cos(a) * 25, baseY - 80 + Math.sin(a) * 25);
            ctx.stroke();
        }

        // Mini dam
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(W * 0.28, baseY - 40, 20, 40);
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(W * 0.28 + 20, baseY - 50, 10, 50);

        // Sparkles
        const sparkles = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85];
        for (let i = 0; i < sparkles.length; i++) {
            const sx = sparkles[i] * W;
            const sy = H * 0.35 + Math.sin(t * 2 + i * 1.3) * 12;
            const alpha = 0.4 + Math.sin(t * 3 + i * 2) * 0.3;
            ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
            ctx.font = '19px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✨', sx, sy);
        }

        // Summary box
        const boxW = Math.min(W - 40, 360);
        const boxX = W / 2 - boxW / 2;
        const boxY = H * 0.6;
        ctx.fillStyle = isComplete ? 'rgba(220, 252, 231, 0.95)' : 'rgba(254, 249, 195, 0.95)';
        ctx.fillRect(boxX, boxY, boxW, 100);
        ctx.strokeStyle = isComplete ? '#16a34a' : '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, 100);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        const cx = W / 2;

        if (isComplete) {
            ctx.fillText('✅ Big Idea 10: How Do We Protect Our Planet?', cx, boxY + 18);
            ctx.font = '17px monospace';
            ctx.fillStyle = '#334155';
            ctx.fillText('⚡ P10: Renewables convert energy → clean electricity', cx, boxY + 38);
            ctx.fillText('🧪 C10: Fossil fuels create CO₂, acid rain, smog', cx, boxY + 54);
            ctx.fillText('🧬 B10: Pollution threatens ecosystems & biodiversity', cx, boxY + 70);
            ctx.fillText('☀️💨🌊 Together = a protected planet! 🌍💚', cx, boxY + 90);
        } else {
            ctx.fillText('🎉 Renewables CAN Replace Fossil Fuels!', cx, boxY + 18);
            ctx.font = '17px monospace';
            ctx.fillStyle = '#334155';
            ctx.fillText('☀️ Solar: Light → Electricity (daytime)', cx, boxY + 38);
            ctx.fillText('💨 Wind: Kinetic → Electricity (breezy)', cx, boxY + 54);
            ctx.fillText('🌊 Hydro: Gravity PE → Electricity (24/7)', cx, boxY + 70);
            ctx.fillText('🔋 Batteries + Combining = Full coverage!', cx, boxY + 90);
        }
    }

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />

            <div data-lab-controls="true" className="absolute left-3 bottom-3 z-10 bg-white backdrop-blur border border-slate-300 rounded-lg p-3 w-[300px] max-w-[calc(100%-24px)] shadow-md text-slate-900">
                <p className="text-xs font-bold text-slate-900 mb-1">Interactive Lab Controls</p>
                <p className="text-[11px] leading-4 text-slate-700 mb-2">Follow the scenarios in order, then use the toggles to stress-test each energy source.</p>

                <label className="block text-[11px] font-semibold text-slate-800 mb-1">Scenario</label>
                <select
                    value={phase}
                    onChange={(e) => setStateValue('phase', e.target.value)}
                    className="w-full mb-2 text-xs text-slate-900 border border-slate-300 rounded px-2 py-1 bg-white shadow-sm"
                >
                    <option value="intro">Intro</option>
                    <option value="fossil">Fossil Fuels</option>
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                    <option value="hydro">Hydro</option>
                    <option value="compare">Compare</option>
                    <option value="checkpoint">Checkpoint</option>
                    <option value="discovery">Discovery</option>
                    <option value="complete">Complete</option>
                </select>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-800">
                    <label className="flex items-center gap-1.5 text-slate-800">
                        <input className="accent-slate-800" type="checkbox" checked={showPollution} onChange={(e) => setStateValue('showPollution', e.target.checked)} />
                        Pollution
                    </label>
                    <label className="flex items-center gap-1.5 text-slate-800">
                        <input className="accent-slate-800" type="checkbox" checked={showNight} onChange={(e) => setStateValue('showNight', e.target.checked)} />
                        Night
                    </label>
                    <label className="flex items-center gap-1.5 text-slate-800">
                        <input className="accent-slate-800" type="checkbox" checked={showCalm} onChange={(e) => setStateValue('showCalm', e.target.checked)} />
                        Calm Wind
                    </label>
                    <label className="flex items-center gap-1.5 text-slate-800">
                        <input className="accent-slate-800" type="checkbox" checked={reveal === 'hydro'} onChange={(e) => setStateValue('reveal', e.target.checked ? 'hydro' : '')} />
                        Reveal Hydro
                    </label>
                </div>
            </div>
        </div>
    );
};


