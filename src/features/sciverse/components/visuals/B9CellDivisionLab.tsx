import { useRef, useEffect, useCallback } from 'react';

interface B9CellDivisionLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B9CellDivisionLab = ({ state }: B9CellDivisionLabProps) => {
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

    const drawBg = (ctx: CanvasRenderingContext2D, W: number, H: number, colorTop: string, colorBot: string) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, colorTop);
        grad.addColorStop(1, colorBot);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
    };

    // ── DNA squiggly lines ───────────────────────────────────────

    const drawDNA = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number, doubled: boolean) => {
        const strands = doubled ? 2 : 1;
        for (let s = 0; s < strands; s++) {
            const offX = doubled ? (s === 0 ? -r * 0.2 : r * 0.2) : 0;
            const offY = doubled ? (s === 0 ? -r * 0.15 : r * 0.15) : 0;
            ctx.strokeStyle = s === 0 ? '#7c3aed' : '#2563eb';
            ctx.lineWidth = 1.8;
            // helix strand 1
            ctx.beginPath();
            for (let i = 0; i <= 20; i++) {
                const frac = i / 20;
                const angle = frac * Math.PI * 3 + t * 1.5;
                const x = cx + offX + Math.sin(angle) * r * 0.35;
                const y = cy + offY + (frac - 0.5) * r * 1.4;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            // helix strand 2
            ctx.beginPath();
            for (let i = 0; i <= 20; i++) {
                const frac = i / 20;
                const angle = frac * Math.PI * 3 + t * 1.5 + Math.PI;
                const x = cx + offX + Math.sin(angle) * r * 0.35;
                const y = cy + offY + (frac - 0.5) * r * 1.4;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            // rungs
            ctx.strokeStyle = 'rgba(124,58,237,0.3)';
            ctx.lineWidth = 1;
            for (let i = 2; i <= 18; i += 2) {
                const frac = i / 20;
                const angle = frac * Math.PI * 3 + t * 1.5;
                const x1 = cx + offX + Math.sin(angle) * r * 0.35;
                const y1 = cy + offY + (frac - 0.5) * r * 1.4;
                const x2 = cx + offX + Math.sin(angle + Math.PI) * r * 0.35;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y1);
                ctx.stroke();
            }
        }
    };

    // ── Single cell drawing ──────────────────────────────────────

    const drawCell = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number, opts?: { dnaCopy?: boolean; pinch?: number; highlight?: boolean; label?: string }) => {
        const dnaCopy = opts?.dnaCopy ?? false;
        const pinch = opts?.pinch ?? 0; // 0 = no pinch, 1 = fully split
        const highlight = opts?.highlight ?? false;

        // glow
        if (highlight) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(74,222,128,0.15)';
            ctx.fill();
        }

        if (pinch > 0 && pinch < 1) {
            // pinching cell — draw as two overlapping ellipses
            const sep = pinch * r * 0.8;
            const squeeze = 1 - pinch * 0.35;
            for (let side = -1; side <= 1; side += 2) {
                ctx.beginPath();
                ctx.ellipse(cx + side * sep, cy, r * squeeze, r, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(187,247,208,0.7)';
                ctx.fill();
                ctx.strokeStyle = '#16a34a';
                ctx.lineWidth = 2;
                ctx.stroke();
                // nucleus
                const nr = r * 0.3 * squeeze;
                ctx.beginPath();
                ctx.arc(cx + side * sep, cy, nr, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(22,163,74,0.25)';
                ctx.fill();
                ctx.strokeStyle = '#15803d';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                drawDNA(ctx, cx + side * sep, cy, nr, t, false);
            }
        } else if (pinch >= 1) {
            // fully split — two separate cells
            const gap = r * 1.6;
            for (let side = -1; side <= 1; side += 2) {
                drawCell(ctx, cx + side * gap, cy, r * 0.75, t, { highlight: true });
            }
        } else {
            // normal single cell
            // membrane
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(187,247,208,0.7)';
            ctx.fill();
            ctx.strokeStyle = '#16a34a';
            ctx.lineWidth = 2.5;
            ctx.stroke();
            // wobble membrane
            ctx.strokeStyle = 'rgba(22,163,74,0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let a = 0; a <= Math.PI * 2; a += 0.1) {
                const wobble = r + Math.sin(a * 6 + t * 2) * 2;
                const x = cx + Math.cos(a) * wobble;
                const y = cy + Math.sin(a) * wobble;
                if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();

            // nucleus
            const nr = r * 0.35;
            ctx.beginPath();
            ctx.arc(cx, cy, nr, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(22,163,74,0.2)';
            ctx.fill();
            ctx.strokeStyle = '#15803d';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // DNA
            drawDNA(ctx, cx, cy, nr, t, dnaCopy);
        }

        if (opts?.label) {
            drawLabel(ctx, opts.label, cx, cy + r + 16, '#15803d', 11);
        }
    };

    // ── Skin layer cross-section ─────────────────────────────────

    const drawSkinLayer = (ctx: CanvasRenderingContext2D, W: number, H: number, gapStart: number, gapEnd: number, fillFrac: number) => {
        const baseY = H * 0.55;
        const cellR = 14;
        const rows = 3;
        // draw cells as a grid
        for (let row = 0; row < rows; row++) {
            const y = baseY + row * cellR * 2.2;
            for (let x = cellR; x < W - cellR; x += cellR * 2.2) {
                const inGap = x > gapStart && x < gapEnd;
                const filled = inGap && (x - gapStart) / (gapEnd - gapStart) < fillFrac;
                if (!inGap || filled) {
                    ctx.beginPath();
                    ctx.arc(x, y, cellR - 1, 0, Math.PI * 2);
                    ctx.fillStyle = filled ? 'rgba(134,239,172,0.8)' : 'rgba(253,186,116,0.7)';
                    ctx.fill();
                    ctx.strokeStyle = filled ? '#16a34a' : '#c2410c';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    // tiny nucleus
                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = filled ? '#15803d' : '#9a3412';
                    ctx.fill();
                }
            }
        }
        // wound markers
        if (fillFrac < 1) {
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('⚡ wound gap', (gapStart + gapEnd) / 2, baseY - 20);
        }
    };

    // ── Growth comparison (baby → child → adult) ─────────────────

    const drawGrowthComparison = (ctx: CanvasRenderingContext2D, W: number, H: number, _t: number) => {
        const stages = [
            { label: 'Baby', cells: 3, h: 50, x: W * 0.18 },
            { label: 'Child', cells: 6, h: 80, x: W * 0.5 },
            { label: 'Adult', cells: 10, h: 120, x: W * 0.82 }
        ];
        for (const s of stages) {
            // body silhouette
            const topY = H * 0.72 - s.h;
            ctx.fillStyle = 'rgba(191,219,254,0.5)';
            ctx.beginPath();
            ctx.ellipse(s.x, topY + s.h * 0.5, s.h * 0.25, s.h * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // head
            ctx.beginPath();
            ctx.arc(s.x, topY - s.h * 0.08, s.h * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // tiny cells inside
            const cellR = 5;
            let drawn = 0;
            for (let row = 0; row < 5 && drawn < s.cells; row++) {
                for (let col = 0; col < 4 && drawn < s.cells; col++) {
                    const cx = s.x - 12 + col * 9;
                    const cy = topY + s.h * 0.2 + row * 9;
                    ctx.beginPath();
                    ctx.arc(cx, cy, cellR, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(134,239,172,0.8)';
                    ctx.fill();
                    ctx.strokeStyle = '#16a34a';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    drawn++;
                }
            }

            drawLabel(ctx, s.label, s.x, H * 0.78, '#1e40af', 12);
            drawLabel(ctx, s.cells === 3 ? '~26 billion' : s.cells === 6 ? '~30 trillion' : '~37 trillion', s.x, H * 0.84, '#64748b', 9);
        }
        // arrows
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < stages.length - 1; i++) {
            const x1 = stages[i].x + 30;
            const x2 = stages[i + 1].x - 30;
            const y = H * 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
            // arrowhead
            ctx.beginPath();
            ctx.moveTo(x2, y);
            ctx.lineTo(x2 - 8, y - 5);
            ctx.lineTo(x2 - 8, y + 5);
            ctx.closePath();
            ctx.fillStyle = '#94a3b8';
            ctx.fill();
        }
        drawLabel(ctx, 'Same cell size — MORE cells!', W * 0.5, H * 0.92, '#7c3aed', 12);
    };

    // ── Microscope frame overlay ─────────────────────────────────

    const drawMicroscopeFrame = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        // vignette
        const grad = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.min(W, H) * 0.55);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.5)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
        // corner label
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('🔬 400x', 8, 16);
    };

    // ── Phase renderers ──────────────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#fef3c7', '#fde68a');

        // bike path scene
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(0, H * 0.72, W, H * 0.08); // path
        ctx.fillStyle = '#65a30d';
        ctx.fillRect(0, H * 0.8, W, H * 0.2); // grass

        // knee with a scrape
        const kx = W * 0.5, ky = H * 0.52;
        // leg
        ctx.fillStyle = '#fdba74';
        ctx.fillRect(kx - 22, ky - 50, 44, 100);
        // scrape
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(kx, ky, 18 + Math.sin(t * 2) * 2, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // sting lines
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI * 2 / 6) * i + t * 0.5;
            ctx.beginPath();
            ctx.moveTo(kx + Math.cos(a) * 22, ky + Math.sin(a) * 14);
            ctx.lineTo(kx + Math.cos(a) * 30, ky + Math.sin(a) * 20);
            ctx.stroke();
        }

        drawLabel(ctx, '🚲 Ouch! A scraped knee!', W * 0.5, H * 0.18, '#92400e', 15);
        drawLabel(ctx, 'How does your body heal this?', W * 0.5, H * 0.28, '#78350f', 12);
    };

    const drawScrape = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#fce7f3', '#fdf2f8');

        drawLabel(ctx, '🔬 Zooming into the wound...', W * 0.5, H * 0.08, '#9d174d', 13);

        // skin layer with gap
        drawSkinLayer(ctx, W, H, W * 0.35, W * 0.65, 0);

        // blood drops in gap
        for (let i = 0; i < 5; i++) {
            const bx = W * 0.38 + i * (W * 0.06);
            const by = H * 0.58 + Math.sin(t * 3 + i) * 5;
            ctx.beginPath();
            ctx.arc(bx, by, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239,68,68,0.6)';
            ctx.fill();
        }

        drawLabel(ctx, 'Healthy skin cells', W * 0.18, H * 0.48, '#c2410c', 10);
        drawLabel(ctx, 'Healthy skin cells', W * 0.82, H * 0.48, '#c2410c', 10);
        drawLabel(ctx, '← Gap where cells are missing →', W * 0.5, H * 0.88, '#be123c', 11);

        drawMicroscopeFrame(ctx, W, H);
    };

    const drawCellGrow = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#ecfdf5', '#d1fae5');

        drawLabel(ctx, 'Step 1: Cell Grows Bigger', W * 0.5, H * 0.08, '#065f46', 14);

        // animated growing cell
        const growPulse = 1 + Math.sin(t * 0.8) * 0.15;
        const baseR = Math.min(W, H) * 0.15;
        drawCell(ctx, W * 0.5, H * 0.45, baseR * growPulse, t, { highlight: true, label: 'Growing cell' });

        // nutrient particles flowing in
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i + t * 0.6;
            const dist = baseR * 2 + Math.sin(t * 2 + i) * 20;
            const nx = W * 0.5 + Math.cos(angle) * dist;
            const ny = H * 0.45 + Math.sin(angle) * dist;
            ctx.beginPath();
            ctx.arc(nx, ny, 4, 0, Math.PI * 2);
            ctx.fillStyle = i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#ec4899' : '#3b82f6';
            ctx.fill();
        }
        drawLabel(ctx, '🧪 Nutrients flowing in (C9 link!)', W * 0.5, H * 0.82, '#7c2d12', 11);
        drawLabel(ctx, 'Proteins · Sugars · Fats', W * 0.5, H * 0.88, '#64748b', 10);

        drawMicroscopeFrame(ctx, W, H);
    };

    const drawDnaCopy = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#ede9fe', '#ddd6fe');

        drawLabel(ctx, 'Step 2: DNA Copies Itself', W * 0.5, H * 0.08, '#5b21b6', 14);

        const baseR = Math.min(W, H) * 0.16;
        drawCell(ctx, W * 0.5, H * 0.45, baseR, t, { dnaCopy: true, highlight: true });

        // label the double DNA
        drawLabel(ctx, '🧬 Two complete DNA sets!', W * 0.5, H * 0.78, '#5b21b6', 12);
        drawLabel(ctx, 'Each new cell needs the full instruction manual', W * 0.5, H * 0.85, '#64748b', 10);

        // pulsing glow on nucleus
        const glowR = baseR * 0.35 + Math.sin(t * 3) * 4;
        ctx.beginPath();
        ctx.arc(W * 0.5, H * 0.45, glowR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124,58,237,${0.3 + Math.sin(t * 3) * 0.15})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        drawMicroscopeFrame(ctx, W, H);
    };

    const drawCellSplit = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#f0fdf4', '#dcfce7');

        drawLabel(ctx, 'Step 3: Cell Splits in Two!', W * 0.5, H * 0.08, '#166534', 14);

        // animated pinch cycle
        const cycle = (t * 0.3) % 3; // 0-1 grow, 1-2 pinch, 2-3 separate
        const baseR = Math.min(W, H) * 0.14;
        if (cycle < 1) {
            // single cell
            drawCell(ctx, W * 0.5, H * 0.45, baseR, t, { dnaCopy: true, highlight: true });
            drawLabel(ctx, 'Preparing to divide...', W * 0.5, H * 0.78, '#166534', 11);
        } else if (cycle < 2) {
            // pinching
            const pinchAmt = cycle - 1;
            drawCell(ctx, W * 0.5, H * 0.45, baseR, t, { pinch: pinchAmt });
            drawLabel(ctx, '✂️ Pinching in the middle!', W * 0.5, H * 0.78, '#166534', 11);
        } else {
            // separated
            const sep = (cycle - 2) * baseR * 1.5;
            drawCell(ctx, W * 0.5 - baseR - sep, H * 0.45, baseR * 0.78, t, { highlight: true });
            drawCell(ctx, W * 0.5 + baseR + sep, H * 0.45, baseR * 0.78, t, { highlight: true });
            drawLabel(ctx, '🟢🟢 Two identical cells!', W * 0.5, H * 0.78, '#166534', 11);
        }

        // timeline at bottom
        const stages = ['Grow', 'Copy DNA', 'Split!'];
        const activeIdx = cycle < 1 ? 0 : cycle < 2 ? 1 : 2;
        for (let i = 0; i < 3; i++) {
            const sx = W * 0.25 + i * W * 0.25;
            ctx.beginPath();
            ctx.arc(sx, H * 0.9, 8, 0, Math.PI * 2);
            ctx.fillStyle = i <= activeIdx ? '#16a34a' : '#d1d5db';
            ctx.fill();
            drawLabel(ctx, stages[i], sx, H * 0.95, i <= activeIdx ? '#166534' : '#9ca3af', 9);
        }
        // progress line
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W * 0.25, H * 0.9);
        ctx.lineTo(W * 0.25 + activeIdx * W * 0.25, H * 0.9);
        ctx.stroke();

        drawMicroscopeFrame(ctx, W, H);
    };

    const drawHealing = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#fef9c3', '#fef3c7');

        drawLabel(ctx, '🩹 Healing Timeline', W * 0.5, H * 0.06, '#92400e', 14);

        // animated fill fraction
        const fillFrac = Math.min(1, ((t * 0.15) % 1.4));
        drawSkinLayer(ctx, W, H, W * 0.3, W * 0.7, fillFrac);

        // day counter
        const day = Math.floor(fillFrac * 7) + 1;
        drawLabel(ctx, `Day ${day}`, W * 0.5, H * 0.38, '#92400e', 16);

        // cell count
        const cellCount = Math.floor(Math.pow(2, day));
        drawLabel(ctx, `~${cellCount >= 100 ? cellCount.toLocaleString() : cellCount} new cells dividing`, W * 0.5, H * 0.43, '#64748b', 10);

        // dividing animation on the right side
        const smallR = 10;
        const divisions = Math.min(4, day);
        const startX = W * 0.75;
        const startY = H * 0.2;
        for (let i = 0; i < divisions; i++) {
            const cx = startX + (i % 2) * 25 - 12;
            const cy = startY + Math.floor(i / 2) * 25;
            ctx.beginPath();
            ctx.arc(cx, cy, smallR, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(134,239,172,0.8)';
            ctx.fill();
            ctx.strokeStyle = '#16a34a';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        drawLabel(ctx, '📏 P9 link: Measuring healing rate!', W * 0.5, H * 0.92, '#7c2d12', 10);
    };

    const drawGrowthVsRepair = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#eff6ff', '#dbeafe');

        drawLabel(ctx, 'Growth = More Cells, Not Bigger Cells!', W * 0.5, H * 0.06, '#1e3a8a', 13);

        drawGrowthComparison(ctx, W, H, t);
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#fef9c3', '#fde68a');

        if (correct) {
            drawLabel(ctx, '✅ Correct!', W * 0.5, H * 0.12, '#166534', 18);

            // happy dividing cells
            const baseR = Math.min(W, H) * 0.08;
            for (let i = 0; i < 4; i++) {
                const cx = W * 0.2 + i * W * 0.2;
                const cy = H * 0.45;
                drawCell(ctx, cx, cy, baseR, t + i);
            }
            drawLabel(ctx, 'Young cells divide FASTER → quicker healing!', W * 0.5, H * 0.75, '#166534', 12);

            // speed comparison
            drawLabel(ctx, 'Child: ~20 hrs/division', W * 0.3, H * 0.84, '#2563eb', 10);
            drawLabel(ctx, 'Elder: ~30+ hrs/division', W * 0.7, H * 0.84, '#dc2626', 10);
        } else {
            drawLabel(ctx, '🤔 Checkpoint', W * 0.5, H * 0.12, '#92400e', 16);

            // kid vs adult figure
            const kidX = W * 0.3, adultX = W * 0.7;
            const figY = H * 0.5;
            // kid
            ctx.fillStyle = '#bfdbfe';
            ctx.beginPath();
            ctx.ellipse(kidX, figY, 18, 30, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(kidX, figY - 35, 12, 0, Math.PI * 2);
            ctx.fill();
            // bandage
            ctx.fillStyle = '#fca5a5';
            ctx.fillRect(kidX - 5, figY + 5, 10, 6);
            drawLabel(ctx, 'Kid — heals fast! 🏃', kidX, figY + 50, '#1e3a8a', 10);

            // adult
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.ellipse(adultX, figY - 5, 22, 40, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(adultX, figY - 50, 14, 0, Math.PI * 2);
            ctx.fill();
            // bandage
            ctx.fillStyle = '#fca5a5';
            ctx.fillRect(adultX - 5, figY, 10, 6);
            drawLabel(ctx, 'Elder — heals slow 🐢', adultX, figY + 50, '#64748b', 10);

            drawLabel(ctx, 'Why do younger people heal faster?', W * 0.5, H * 0.85, '#78350f', 12);

            // question mark
            const qScale = 1 + Math.sin(t * 2) * 0.1;
            ctx.save();
            ctx.translate(W * 0.5, H * 0.22);
            ctx.scale(qScale, qScale);
            drawLabel(ctx, '❓', 0, 0, '#92400e', 28);
            ctx.restore();
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#f0fdf4', '#dcfce7');

        drawLabel(ctx, '🎉 Big Discovery!', W * 0.5, H * 0.08, '#166534', 16);

        // mitosis steps recap
        const steps = ['Grow', 'Copy DNA', 'Split', 'Two cells!'];
        const icons = ['📈', '🧬', '✂️', '🟢🟢'];
        for (let i = 0; i < steps.length; i++) {
            const sx = W * 0.15 + i * W * 0.23;
            const sy = H * 0.28;
            // circle
            ctx.beginPath();
            ctx.arc(sx, sy, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#bbf7d0';
            ctx.fill();
            ctx.strokeStyle = '#16a34a';
            ctx.lineWidth = 2;
            ctx.stroke();
            drawLabel(ctx, icons[i], sx, sy - 2, '#166534', 14);
            drawLabel(ctx, steps[i], sx, sy + 30, '#166534', 9);
            // connector
            if (i < steps.length - 1) {
                ctx.strokeStyle = '#86efac';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sx + 24, sy);
                ctx.lineTo(sx + W * 0.23 - 24, sy);
                ctx.stroke();
                // arrowhead
                const ax = sx + W * 0.23 - 24;
                ctx.beginPath();
                ctx.moveTo(ax, sy);
                ctx.lineTo(ax - 6, sy - 4);
                ctx.lineTo(ax - 6, sy + 4);
                ctx.closePath();
                ctx.fillStyle = '#86efac';
                ctx.fill();
            }
        }

        // key facts
        const facts = [
            '🩹 Healing = cell division filling gaps',
            '📏 Growth = more cells, not bigger cells',
            '🧪 Each cell needs nutrients (C9)',
            '📐 Measure healing rate (P9)'
        ];
        for (let i = 0; i < facts.length; i++) {
            drawLabel(ctx, facts[i], W * 0.5, H * 0.52 + i * 22, '#1e293b', 10);
        }

        // floating emoji celebration
        for (let i = 0; i < 6; i++) {
            const ex = W * 0.15 + i * W * 0.14;
            const ey = H * 0.85 + Math.sin(t * 2 + i) * 8;
            drawLabel(ctx, '🧬', ex, ey, '#166534', 16);
        }
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBg(ctx, W, H, '#ecfdf5', '#a7f3d0');

        drawLabel(ctx, '✅ Big Idea 9 Complete!', W * 0.5, H * 0.1, '#065f46', 16);

        // three pillars
        const pillars = [
            { label: 'P9 — Measuring', icon: '📏', color: '#3b82f6', bg: '#dbeafe' },
            { label: 'C9 — Nutrients', icon: '🧪', color: '#f59e0b', bg: '#fef3c7' },
            { label: 'B9 — Cell Division', icon: '🧬', color: '#16a34a', bg: '#dcfce7' }
        ];
        for (let i = 0; i < 3; i++) {
            const px = W * 0.2 + i * W * 0.3;
            const py = H * 0.38;
            const pw = W * 0.22;
            const ph = H * 0.3;
            // box
            ctx.fillStyle = pillars[i].bg;
            ctx.beginPath();
            ctx.roundRect(px - pw / 2, py, pw, ph, 8);
            ctx.fill();
            ctx.strokeStyle = pillars[i].color;
            ctx.lineWidth = 2;
            ctx.stroke();
            drawLabel(ctx, pillars[i].icon, px, py + 24, pillars[i].color, 20);
            drawLabel(ctx, pillars[i].label, px, py + 50, pillars[i].color, 10);
        }

        // connecting line
        ctx.strokeStyle = '#065f46';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(W * 0.2, H * 0.52);
        ctx.lineTo(W * 0.8, H * 0.52);
        ctx.stroke();
        ctx.setLineDash([]);

        drawLabel(ctx, 'Growth needs materials, measured over time,', W * 0.5, H * 0.78, '#065f46', 11);
        drawLabel(ctx, 'built one cell division at a time 🧬🌱', W * 0.5, H * 0.84, '#065f46', 11);

        // pulsing DNA
        const pulse = 1 + Math.sin(t * 2) * 0.05;
        ctx.save();
        ctx.translate(W * 0.5, H * 0.92);
        ctx.scale(pulse, pulse);
        drawLabel(ctx, '🧬 · 🌱 · 📏', 0, 0, '#065f46', 14);
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
            case 'scrape':
                drawScrape(ctx, W, H, t);
                break;
            case 'cell_grow':
                drawCellGrow(ctx, W, H, t);
                break;
            case 'dna_copy':
                drawDnaCopy(ctx, W, H, t);
                break;
            case 'cell_split':
                drawCellSplit(ctx, W, H, t);
                break;
            case 'healing':
                drawHealing(ctx, W, H, t);
                break;
            case 'growth_vs_repair':
                drawGrowthVsRepair(ctx, W, H, t);
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

