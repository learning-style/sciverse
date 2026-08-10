import { useRef, useEffect, useCallback } from 'react';

interface B6FishLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B6FishLab = ({ state }: B6FishLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const correct = (state.correct as boolean) ?? false;

    // ── Drawing helpers ──────────────────────────────────────────

    const drawBubble = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) => {
        const wobble = Math.sin(t * 3 + x) * 1.5;
        ctx.beginPath();
        ctx.arc(x + wobble, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    };

    const drawO2 = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,0.75)';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.max(10, r)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('O₂', x, y);
    };

    const drawCO2 = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251,146,60,0.7)';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.max(10, r)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CO₂', x, y);
    };

    const drawFish = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, t: number, showGillFlap: boolean) => {
        const swim = Math.sin(t * 2) * 4;
        const fx = cx + swim;

        // Tail
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(fx + size * 0.5, cy);
        ctx.lineTo(fx + size * 0.85, cy - size * 0.3 + Math.sin(t * 4) * 4);
        ctx.lineTo(fx + size * 0.85, cy + size * 0.3 + Math.sin(t * 4) * 4);
        ctx.closePath();
        ctx.fill();

        // Body (ellipse)
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.ellipse(fx, cy, size * 0.5, size * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dorsal fin
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(fx - size * 0.1, cy - size * 0.28);
        ctx.lineTo(fx + size * 0.05, cy - size * 0.48);
        ctx.lineTo(fx + size * 0.2, cy - size * 0.28);
        ctx.closePath();
        ctx.fill();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(fx - size * 0.28, cy - size * 0.06, size * 0.07, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(fx - size * 0.28, cy - size * 0.06, size * 0.035, 0, Math.PI * 2);
        ctx.fill();

        // Mouth — opens and closes
        const mouthOpen = Math.abs(Math.sin(t * 2.5)) * size * 0.05;
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fx - size * 0.5, cy + size * 0.02);
        ctx.lineTo(fx - size * 0.5 - size * 0.04, cy + size * 0.02 + mouthOpen);
        ctx.stroke();

        // Gill flap
        if (showGillFlap) {
            const gillFlap = Math.sin(t * 2.5) * 3;
            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(fx - size * 0.15, cy, size * 0.18, -0.6, 0.6);
            ctx.stroke();
            // Gill opening animation
            ctx.strokeStyle = 'rgba(220,38,38,0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(fx - size * 0.15 + gillFlap, cy, size * 0.15, -0.4, 0.4);
            ctx.stroke();
        }
    };

    const drawWaterBackground = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Gradient background — deep blue water
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#0ea5e9');
        grad.addColorStop(0.3, '#0284c7');
        grad.addColorStop(1, '#0c4a6e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Light rays from surface
        ctx.save();
        ctx.globalAlpha = 0.06;
        for (let i = 0; i < 5; i++) {
            const rx = W * 0.1 + i * W * 0.2 + Math.sin(t * 0.3 + i) * 20;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.moveTo(rx - 15, 0);
            ctx.lineTo(rx + 15, 0);
            ctx.lineTo(rx + 40 + Math.sin(t * 0.5 + i) * 10, H);
            ctx.lineTo(rx - 40 + Math.sin(t * 0.5 + i) * 10, H);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // Sea floor
        ctx.fillStyle = '#1e3a5f';
        ctx.beginPath();
        ctx.moveTo(0, H - 25);
        for (let x = 0; x <= W; x += 30) {
            ctx.lineTo(x, H - 25 + Math.sin(x * 0.05 + t * 0.3) * 5);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();

        // Seaweed
        for (let i = 0; i < 4; i++) {
            const sx = W * 0.15 + i * W * 0.22;
            ctx.strokeStyle = 'rgba(34,197,94,0.45)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(sx, H - 25);
            for (let j = 0; j < 5; j++) {
                const sy = H - 25 - j * 15;
                const sxo = Math.sin(t + i + j * 0.5) * 8;
                ctx.lineTo(sx + sxo, sy);
            }
            ctx.stroke();
        }
    };

    const drawO2Particles = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number, count: number) => {
        for (let i = 0; i < count; i++) {
            const ox = (i * 97 + t * 15) % W;
            const oy = 40 + (i * 73) % (H - 100) + Math.sin(t + i) * 8;
            drawO2(ctx, ox, oy, 8);
        }
    };

    // ── Phase renderers ──────────────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWaterBackground(ctx, W, H, t);
        drawFish(ctx, W * 0.5, H * 0.4, 70, t, true);
        drawFish(ctx, W * 0.25, H * 0.6, 45, t + 1, true);
        drawFish(ctx, W * 0.72, H * 0.55, 55, t + 2, true);

        // Bubbles
        for (let i = 0; i < 8; i++) {
            const bx = (i * 67 + t * 20) % W;
            const by = H - 40 - ((t * 30 + i * 80) % (H - 60));
            drawBubble(ctx, bx, by, 3 + (i % 3), t);
        }

        // Title
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🐟 The Underwater Mystery', W / 2, 28);
        ctx.font = '18px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('How do fish breathe without air?', W / 2, 46);
    };

    const drawFishSwimming = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWaterBackground(ctx, W, H, t);

        // Show the fish with water flow arrows
        drawFish(ctx, W * 0.45, H * 0.4, 80, t, true);

        // Water flow arrows — mouth to gills
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        for (let i = 0; i < 3; i++) {
            const ax = W * 0.45 - 80 - 30 - i * 25 + Math.sin(t * 2 + i) * 5;
            const ay = H * 0.4 + (i - 1) * 12;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax + 20, ay);
            ctx.stroke();
            // arrowhead
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.moveTo(ax + 20, ay);
            ctx.lineTo(ax + 16, ay - 3);
            ctx.lineTo(ax + 16, ay + 3);
            ctx.closePath();
            ctx.fill();
        }
        ctx.setLineDash([]);

        // O₂ dots scattered in water
        drawO2Particles(ctx, W, H, t, 12);

        // Labels
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Dissolved Oxygen in Water', W / 2, 28);
        ctx.font = '17px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillText('Blue dots = O₂ molecules dissolved between water molecules', W / 2, 44);

        // Source labels
        if (state.showO2Sources) {
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('↓ O₂ from atmosphere', 10, 70);
            ctx.fillText('🌿 O₂ from plants', 10, 86);
        }
    };

    const drawGillsCloseup = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // Zoomed-in view of gill structure
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔬 Gill Close-Up', W / 2, 24);

        const cx = W / 2;
        const baseY = 50;
        const filamentCount = 6;
        const filamentH = (H - 100) / filamentCount;

        for (let i = 0; i < filamentCount; i++) {
            const fy = baseY + i * filamentH + filamentH / 2;

            // Filament — thin pink membrane
            ctx.fillStyle = 'rgba(251,113,133,0.4)';
            ctx.fillRect(cx - 60, fy - 8, 120, 16);
            ctx.strokeStyle = '#fb7185';
            ctx.lineWidth = 1;
            ctx.strokeRect(cx - 60, fy - 8, 120, 16);

            // Blood vessels inside filament (red lines)
            ctx.strokeStyle = 'rgba(239,68,68,0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx - 55, fy - 2);
            ctx.lineTo(cx + 55, fy - 2);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(220,38,38,0.4)';
            ctx.beginPath();
            ctx.moveTo(cx - 55, fy + 3);
            ctx.lineTo(cx + 55, fy + 3);
            ctx.stroke();

            // Water flow arrows on left (incoming)
            const arrowPhase = (t * 40 + i * 30) % 60;
            ctx.fillStyle = 'rgba(96,165,250,0.6)';
            ctx.beginPath();
            const ax = cx - 60 - 40 + arrowPhase;
            ctx.moveTo(ax, fy);
            ctx.lineTo(ax - 6, fy - 4);
            ctx.lineTo(ax - 6, fy + 4);
            ctx.closePath();
            ctx.fill();

            // O₂ dots moving toward filament
            const o2x = cx - 60 - 15 + Math.sin(t * 1.5 + i) * 10;
            drawO2(ctx, o2x, fy + Math.sin(t + i) * 5, 7);

            // O₂ crossing membrane (inside filament, moving right)
            const crossX = cx - 30 + ((t * 20 + i * 40) % 60);
            if (crossX < cx + 50) {
                drawO2(ctx, crossX, fy - 1, 5);
            }
        }

        // Labels
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('← Water flows in', 10, H - 40);
        ctx.textAlign = 'right';
        ctx.fillText('Water flows out →', W - 10, H - 40);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fb7185';
        ctx.font = 'bold 17px monospace';
        ctx.fillText('Pink = gill filaments (thin walls + blood vessels)', W / 2, H - 20);
    };

    const drawOxygenExchange = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔄 Gas Exchange', W / 2, 24);

        const midY = H / 2;
        const membraneX = W / 2;

        // Water side label
        ctx.fillStyle = 'rgba(96,165,250,0.3)';
        ctx.fillRect(0, 60, membraneX - 5, H - 120);
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('WATER', membraneX / 2, 80);

        // Blood side label
        ctx.fillStyle = 'rgba(239,68,68,0.15)';
        ctx.fillRect(membraneX + 5, 60, W - membraneX - 5, H - 120);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('BLOOD', membraneX + (W - membraneX) / 2, 80);

        // Thin membrane in the middle
        ctx.fillStyle = 'rgba(251,113,133,0.4)';
        ctx.fillRect(membraneX - 5, 60, 10, H - 120);
        ctx.fillStyle = '#fb7185';
        ctx.font = '16px monospace';
        ctx.save();
        ctx.translate(membraneX, midY);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('THIN MEMBRANE', 0, 3);
        ctx.restore();

        // O₂ moving water → blood (left to right)
        for (let i = 0; i < 4; i++) {
            const progress = ((t * 0.4 + i * 0.25) % 1);
            const ox = 30 + progress * (W - 60);
            const oy = 100 + i * 50 + Math.sin(t + i) * 5;
            if (progress < 0.48 || progress > 0.52) {
                drawO2(ctx, ox, oy, 9);
            }
        }

        // CO₂ moving blood → water (right to left)
        for (let i = 0; i < 3; i++) {
            const progress = ((t * 0.35 + i * 0.33) % 1);
            const cox = W - 30 - progress * (W - 60);
            const coy = midY + 30 + i * 45 + Math.sin(t + i + 1) * 5;
            if (progress < 0.48 || progress > 0.52) {
                drawCO2(ctx, cox, coy, 9);
            }
        }

        // Arrows
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(40, midY - 30);
        ctx.lineTo(W - 40, midY - 30);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#60a5fa';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('→ O₂ diffuses into blood →', W / 2, midY - 38);

        ctx.strokeStyle = '#fb923c';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(W - 40, midY + 20);
        ctx.lineTo(40, midY + 20);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#fb923c';
        ctx.font = '17px monospace';
        ctx.fillText('← CO₂ diffuses into water ←', W / 2, midY + 14);

        // Bottom note
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '17px monospace';
        ctx.fillText('Both gases move by DIFFUSION — high → low concentration', W / 2, H - 18);
    };

    const drawWarmVsCold = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        const halfW = W / 2;

        // Cold water side
        const coldGrad = ctx.createLinearGradient(0, 0, 0, H);
        coldGrad.addColorStop(0, '#0284c7');
        coldGrad.addColorStop(1, '#0c4a6e');
        ctx.fillStyle = coldGrad;
        ctx.fillRect(0, 0, halfW - 2, H);

        // Warm water side
        const warmGrad = ctx.createLinearGradient(halfW + 2, 0, halfW + 2, H);
        warmGrad.addColorStop(0, '#f97316');
        warmGrad.addColorStop(0.5, '#ea580c');
        warmGrad.addColorStop(1, '#9a3412');
        ctx.fillStyle = warmGrad;
        ctx.fillRect(halfW + 2, 0, halfW - 2, H);

        // Divider
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(halfW - 2, 0, 4, H);

        // Labels
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('❄️ Cold Water', halfW / 2, 28);
        ctx.fillText('🔥 Warm Water', halfW + halfW / 2, 28);

        // Temperature
        ctx.font = '18px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('10°C', halfW / 2, 46);
        ctx.fillText('30°C', halfW + halfW / 2, 46);

        // LOTS of O₂ in cold water
        for (let i = 0; i < 18; i++) {
            const ox = 15 + (i * 43) % (halfW - 40);
            const oy = 60 + (i * 37) % (H - 110) + Math.sin(t + i) * 5;
            drawO2(ctx, ox, oy, 8);
        }

        // Fish in cold water — happy
        drawFish(ctx, halfW * 0.45, H * 0.5, 50, t, true);

        // FEW O₂ in warm water
        for (let i = 0; i < 5; i++) {
            const ox = halfW + 15 + (i * 53) % (halfW - 40);
            const oy = 60 + (i * 67) % (H - 110) + Math.sin(t + i + 3) * 5;
            drawO2(ctx, ox, oy, 8);
        }

        // Fish in warm water — gasping at top
        drawFish(ctx, halfW + halfW * 0.45, 80, 50, t + 1, true);

        // Escaping O₂ arrows in warm water (upward)
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const ex = halfW + 30 + i * 50;
            const ey = 60 - ((t * 15 + i * 20) % 40);
            ctx.beginPath();
            ctx.moveTo(ex, ey + 20);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath();
            ctx.moveTo(ex, ey);
            ctx.lineTo(ex - 3, ey + 5);
            ctx.lineTo(ex + 3, ey + 5);
            ctx.closePath();
            ctx.fill();
        }

        // Bottom comparison
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('More O₂ = happy fish 🐟', halfW / 2, H - 20);
        ctx.fillText('Less O₂ = fish gasping! 😰', halfW + halfW / 2, H - 20);
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWaterBackground(ctx, W, H, t);

        // Warm water overlay
        ctx.fillStyle = 'rgba(249,115,22,0.15)';
        ctx.fillRect(0, 0, W, H);

        // Fish gasping at surface
        drawFish(ctx, W * 0.35, 60, 50, t, true);
        drawFish(ctx, W * 0.6, 70, 45, t + 0.5, true);
        drawFish(ctx, W * 0.5, 55, 40, t + 1, true);

        // Very few O₂ dots
        for (let i = 0; i < 3; i++) {
            const ox = (i * 120 + t * 10) % W;
            const oy = H * 0.5 + Math.sin(t + i) * 20;
            drawO2(ctx, ox, oy, 7);
        }

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⏸️ Hot Summer Pond', W / 2, H * 0.45);
        ctx.font = '18px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('Warm, still water... fish gasping at surface', W / 2, H * 0.45 + 20);
        ctx.fillText('WHY are they struggling?', W / 2, H * 0.45 + 38);

        if (correct) {
            ctx.fillStyle = 'rgba(34,197,94,0.8)';
            ctx.font = 'bold 19px monospace';
            ctx.fillText('✅ Warm water = less dissolved O₂!', W / 2, H - 30);
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWaterBackground(ctx, W, H, t);
        drawFish(ctx, W * 0.5, H * 0.3, 60, t, true);

        // O₂ particles
        drawO2Particles(ctx, W, H, t, 8);

        // Summary card background
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        const cardY = H * 0.5;
        const cardH = H * 0.45;
        ctx.fillRect(15, cardY, W - 30, cardH);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(15, cardY, W - 30, cardH);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 How Fish Breathe', W / 2, cardY + 22);

        const facts = [
            '1. O₂ dissolves in water',
            '2. Fish gulp water → push past gills',
            '3. Thin filaments: O₂ → blood',
            '4. CO₂ exits blood → water',
            '5. Cold water = more O₂',
        ];
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        facts.forEach((f, i) => {
            ctx.fillText(f, 30, cardY + 44 + i * 17);
        });
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawWaterBackground(ctx, W, H, t);

        // Celebratory fish
        for (let i = 0; i < 4; i++) {
            const fx = W * 0.2 + i * W * 0.2;
            const fy = H * 0.35 + Math.sin(t + i * 1.5) * 20;
            drawFish(ctx, fx, fy, 40 + i * 5, t + i, true);
        }

        drawO2Particles(ctx, W, H, t, 10);

        // Completion card
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(W * 0.1, H * 0.55, W * 0.8, H * 0.35);
        ctx.strokeStyle = 'rgba(34,197,94,0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(W * 0.1, H * 0.55, W * 0.8, H * 0.35);

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✅ Big Idea 6 Complete!', W / 2, H * 0.55 + 25);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '17px monospace';
        ctx.fillText('P6: Density & Buoyancy', W / 2, H * 0.55 + 48);
        ctx.fillText('C6: Mixtures & Separation', W / 2, H * 0.55 + 65);
        ctx.fillText('B6: How Fish Breathe', W / 2, H * 0.55 + 82);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText('Density connects floating, mixing & breathing! 🌊', W / 2, H * 0.55 + 105);
    };

    // ── Main animation loop ──────────────────────────────────────

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

        switch (phase) {
            case 'fish_swimming':
                drawFishSwimming(ctx, W, H, t);
                break;
            case 'gills_closeup':
                drawGillsCloseup(ctx, W, H, t);
                break;
            case 'oxygen_exchange':
                drawOxygenExchange(ctx, W, H, t);
                break;
            case 'warm_vs_cold':
                drawWarmVsCold(ctx, W, H, t);
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
    }, [phase, correct, state.showO2Sources]);

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

