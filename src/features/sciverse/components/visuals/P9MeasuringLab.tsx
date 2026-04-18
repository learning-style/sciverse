import { useRef, useEffect, useCallback } from 'react';

interface P9MeasuringLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

// Sunflower heights (cm) over 10 weeks — S-curve
const PLANT_DATA = [2, 3, 5, 12, 25, 42, 55, 60, 62, 63];
// Puppy shoulder heights (cm) over 10 weeks — decelerating
const PUPPY_DATA = [22, 28, 33, 37, 40, 42, 44, 45, 45.5, 46];

export const P9MeasuringLab = ({ state }: P9MeasuringLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const week = (state.week as number) || 10;
    const showAnnotation = (state.showAnnotation as boolean) || false;
    const slopeTarget = (state.slopeTarget as string) || 'plant';
    const weekStart = (state.weekStart as number) || 4;
    const weekEnd = (state.weekEnd as number) || 6;
    const highlight = (state.highlight as number) || 0;

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
        ctx.fillText('The Growth Tracker', W / 2, 28);

        // Phase label
        ctx.fillStyle = '#64748b';
        ctx.font = '18px monospace';
        const phaseLabels: Record<string, string> = {
            'intro': '🌱🐶 Two living things, one big question…',
            'measuring': '📏 Time to measure! Each week we record the height.',
            'plant_graph': '🌻 Sunflower Growth — watch the S-curve form!',
            'puppy_graph': '🐕 Puppy Growth — fast start, then slowing…',
            'rate_compare': '📊 Comparing growth patterns side by side',
            'slope': '📐 Slope = Rate — how steep is the line?',
            'checkpoint': '⏸️ Which week had the fastest growth?',
            'discovery': '🎉 Graphs reveal hidden growth patterns!',
            'complete': '✅ Lesson complete!',
        };
        ctx.fillText(phaseLabels[phase] || '', W / 2, 48);

        if (phase === 'intro') {
            drawIntro(ctx, W, H, t);
        } else if (phase === 'measuring') {
            drawMeasuring(ctx, W, H, t);
        } else if (phase === 'plant_graph') {
            drawLineGraph(ctx, W, H, t, 'plant', week, showAnnotation);
        } else if (phase === 'puppy_graph') {
            drawLineGraph(ctx, W, H, t, 'puppy', week, false);
        } else if (phase === 'rate_compare') {
            drawCompareGraphs(ctx, W, H, t);
        } else if (phase === 'slope') {
            drawSlopeVis(ctx, W, H, t, slopeTarget, weekStart, weekEnd);
        } else if (phase === 'checkpoint') {
            drawCheckpoint(ctx, W, H, t, highlight);
        } else if (phase === 'discovery' || phase === 'complete') {
            drawDiscovery(ctx, W, H, t, phase === 'complete');
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, week, showAnnotation, slopeTarget, weekStart, weekEnd, highlight]);

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

    // ---- Graph coordinate helpers ----

    function graphArea(W: number, H: number) {
        const left = 70;
        const right = W - 40;
        const top = 70;
        const bottom = H - 55;
        return { left, right, top, bottom, w: right - left, h: bottom - top };
    }

    function toGraphX(week: number, g: ReturnType<typeof graphArea>) {
        return g.left + ((week - 1) / 9) * g.w;
    }

    function toGraphY(val: number, maxVal: number, g: ReturnType<typeof graphArea>) {
        return g.bottom - (val / maxVal) * g.h;
    }

    // ---- Drawing: Graph paper background & axes ----

    function drawAxes(ctx: CanvasRenderingContext2D, W: number, H: number, maxY: number, yLabel: string) {
        const g = graphArea(W, H);

        // Graph paper grid
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1;
        // Vertical grid lines — one per week
        for (let w = 1; w <= 10; w++) {
            const x = toGraphX(w, g);
            ctx.beginPath();
            ctx.moveTo(x, g.top);
            ctx.lineTo(x, g.bottom);
            ctx.stroke();
        }
        // Horizontal grid lines
        const ySteps = 5;
        for (let i = 0; i <= ySteps; i++) {
            const y = g.top + (i / ySteps) * g.h;
            ctx.beginPath();
            ctx.moveTo(g.left, y);
            ctx.lineTo(g.right, y);
            ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(g.left, g.top - 10);
        ctx.lineTo(g.left, g.bottom);
        ctx.lineTo(g.right + 10, g.bottom);
        ctx.stroke();

        // X-axis labels
        ctx.fillStyle = '#475569';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        for (let w = 1; w <= 10; w++) {
            ctx.fillText(`${w}`, toGraphX(w, g), g.bottom + 16);
        }
        ctx.font = 'bold 18px monospace';
        ctx.fillText('Week', g.left + g.w / 2, g.bottom + 36);

        // Y-axis labels
        ctx.textAlign = 'right';
        ctx.font = '17px monospace';
        for (let i = 0; i <= ySteps; i++) {
            const val = Math.round((1 - i / ySteps) * maxY);
            const y = g.top + (i / ySteps) * g.h;
            ctx.fillText(`${val}`, g.left - 8, y + 4);
        }
        ctx.save();
        ctx.translate(18, g.top + g.h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(yLabel, 0, 0);
        ctx.restore();
    }

    // ---- Drawing: Plot a data series with animated reveal ----

    function plotSeries(
        ctx: CanvasRenderingContext2D,
        W: number, H: number,
        data: number[],
        maxY: number,
        color: string,
        revealWeeks: number,
        t: number,
        dotSize: number
    ) {
        const g = graphArea(W, H);
        // Smoothly reveal points based on time
        const shown = Math.min(Math.floor(t * 2.5) + 1, revealWeeks, data.length);

        // Line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < shown; i++) {
            const x = toGraphX(i + 1, g);
            const y = toGraphY(data[i], maxY, g);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Dots
        for (let i = 0; i < shown; i++) {
            const x = toGraphX(i + 1, g);
            const y = toGraphY(data[i], maxY, g);
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, dotSize + 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    // ---- Phase: Intro ----

    function drawIntro(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        const cx = W / 2;
        const cy = H / 2 + 20;

        // Ground
        ctx.fillStyle = '#d4edda';
        ctx.fillRect(30, cy + 50, W - 60, H - cy - 80);

        // Sky gradient
        const skyGrad = ctx.createLinearGradient(0, 60, 0, cy + 50);
        skyGrad.addColorStop(0, '#87ceeb');
        skyGrad.addColorStop(1, '#e0f7fa');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(30, 60, W - 60, cy - 10);

        // Sun
        const sunPulse = 1 + Math.sin(t * 2) * 0.05;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(W - 80, 100, 24 * sunPulse, 0, Math.PI * 2);
        ctx.fill();
        // Rays
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 + t * 0.5;
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(W - 80 + Math.cos(a) * 30, 100 + Math.sin(a) * 30);
            ctx.lineTo(W - 80 + Math.cos(a) * 40, 100 + Math.sin(a) * 40);
            ctx.stroke();
        }

        // Seedling on left
        const plantX = cx - W * 0.2;
        const plantY = cy + 48;
        const sway = Math.sin(t * 1.5) * 3;
        // Pot
        ctx.fillStyle = '#a0522d';
        ctx.beginPath();
        ctx.moveTo(plantX - 20, plantY);
        ctx.lineTo(plantX - 16, plantY + 25);
        ctx.lineTo(plantX + 16, plantY + 25);
        ctx.lineTo(plantX + 20, plantY);
        ctx.closePath();
        ctx.fill();
        // Stem
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(plantX, plantY);
        ctx.quadraticCurveTo(plantX + sway, plantY - 25, plantX + sway * 0.5, plantY - 45);
        ctx.stroke();
        // Leaves
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.ellipse(plantX + sway * 0.5 - 8, plantY - 35, 12, 5, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(plantX + sway * 0.5 + 8, plantY - 30, 10, 4, 0.4, 0, Math.PI * 2);
        ctx.fill();
        // Label
        ctx.fillStyle = '#15803d';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🌱 Sunflower', plantX, plantY + 42);

        // Puppy on right
        const puppyX = cx + W * 0.2;
        const puppyY = cy + 30;
        const wag = Math.sin(t * 6) * 8;
        // Body
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.ellipse(puppyX, puppyY, 28, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.arc(puppyX + 24, puppyY - 8, 14, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(puppyX + 28, puppyY - 12, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Nose
        ctx.beginPath();
        ctx.arc(puppyX + 36, puppyY - 8, 3, 0, Math.PI * 2);
        ctx.fill();
        // Ear
        ctx.fillStyle = '#b8845a';
        ctx.beginPath();
        ctx.ellipse(puppyX + 18, puppyY - 20, 7, 12, -0.3, 0, Math.PI * 2);
        ctx.fill();
        // Tail
        ctx.strokeStyle = '#d4a574';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(puppyX - 28, puppyY - 4);
        ctx.quadraticCurveTo(puppyX - 38, puppyY - 20 + wag, puppyX - 32, puppyY - 28 + wag);
        ctx.stroke();
        // Legs
        ctx.strokeStyle = '#d4a574';
        ctx.lineWidth = 5;
        const legXs = [-14, -6, 10, 18];
        for (const lx of legXs) {
            ctx.beginPath();
            ctx.moveTo(puppyX + lx, puppyY + 14);
            ctx.lineTo(puppyX + lx, puppyY + 30);
            ctx.stroke();
        }
        // Label
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🐶 Puppy', puppyX, puppyY + 52);

        // Question
        ctx.fillStyle = '#475569';
        ctx.font = '19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Will they grow at the same rate?', cx, H - 50);

        // Question marks floating
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 22px monospace';
        const qx1 = cx + Math.sin(t * 1.2) * 6;
        const qy1 = cy - 70 + Math.sin(t * 0.8) * 5;
        ctx.fillText('?', qx1, qy1);
    }

    // ---- Phase: Measuring ----

    function drawMeasuring(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        const cx = W / 2;
        const baseY = H * 0.75;

        // Ground
        ctx.fillStyle = '#d4edda';
        ctx.fillRect(30, baseY, W - 60, H - baseY - 30);

        // Ruler
        const rulerX = cx - 50;
        const rulerH = H * 0.45;
        const rulerTop = baseY - rulerH;
        ctx.fillStyle = '#fef3c7';
        ctx.fillRect(rulerX, rulerTop, 20, rulerH);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1;
        ctx.strokeRect(rulerX, rulerTop, 20, rulerH);

        // Tick marks on ruler
        ctx.fillStyle = '#92400e';
        ctx.font = '15px monospace';
        ctx.textAlign = 'right';
        const maxCm = 70;
        for (let cm = 0; cm <= maxCm; cm += 10) {
            const y = baseY - (cm / maxCm) * rulerH;
            ctx.beginPath();
            ctx.moveTo(rulerX, y);
            ctx.lineTo(rulerX + (cm % 10 === 0 ? 15 : 8), y);
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 1;
            ctx.stroke();
            if (cm % 10 === 0) {
                ctx.fillText(`${cm}`, rulerX - 4, y + 3);
            }
        }

        // Animated plant growing by ruler
        const growthPhase = (Math.sin(t * 0.5) + 1) / 2; // 0→1 oscillation
        const plantHeight = 5 + growthPhase * 58; // cm
        const plantPx = (plantHeight / maxCm) * rulerH;
        const plantX = cx;

        // Stem
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(plantX, baseY);
        ctx.lineTo(plantX, baseY - plantPx);
        ctx.stroke();

        // Leaves at intervals
        const leafPositions = [0.3, 0.5, 0.7, 0.9];
        for (const lp of leafPositions) {
            if (plantPx > rulerH * lp * 0.5) {
                const ly = baseY - plantPx * lp;
                const leafSize = 6 + growthPhase * 6;
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.ellipse(plantX - leafSize, ly, leafSize, 3, -0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(plantX + leafSize, ly, leafSize, 3, 0.3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Flower at top if tall enough
        if (growthPhase > 0.7) {
            const flowerY = baseY - plantPx;
            ctx.fillStyle = '#fbbf24';
            for (let p = 0; p < 6; p++) {
                const a = (p / 6) * Math.PI * 2 + t * 0.3;
                ctx.beginPath();
                ctx.ellipse(
                    plantX + Math.cos(a) * 8,
                    flowerY + Math.sin(a) * 8,
                    6, 4, a, 0, Math.PI * 2
                );
                ctx.fill();
            }
            ctx.fillStyle = '#92400e';
            ctx.beginPath();
            ctx.arc(plantX, flowerY, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Measurement arrow
        const arrowX = plantX + 30;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(arrowX, baseY);
        ctx.lineTo(arrowX, baseY - plantPx);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow heads
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(arrowX, baseY - plantPx);
        ctx.lineTo(arrowX - 4, baseY - plantPx + 8);
        ctx.lineTo(arrowX + 4, baseY - plantPx + 8);
        ctx.closePath();
        ctx.fill();

        // Height label
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${plantHeight.toFixed(0)} cm`, arrowX + 8, baseY - plantPx / 2);

        // Clipboard / data table on the right
        const clipX = W * 0.68;
        const clipY = 80;
        ctx.fillStyle = '#fffde7';
        ctx.fillRect(clipX, clipY, W * 0.25, 180);
        ctx.strokeStyle = '#d4a574';
        ctx.lineWidth = 2;
        ctx.strokeRect(clipX, clipY, W * 0.25, 180);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('📋 Data Table', clipX + W * 0.125, clipY + 16);

        ctx.font = '16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Week  Height(cm)', clipX + 10, clipY + 34);
        ctx.strokeStyle = '#d4a574';
        ctx.beginPath();
        ctx.moveTo(clipX + 8, clipY + 38);
        ctx.lineTo(clipX + W * 0.25 - 8, clipY + 38);
        ctx.stroke();

        const showWeeks = Math.min(Math.floor(t * 1.5) + 1, 10);
        for (let i = 0; i < showWeeks; i++) {
            ctx.fillStyle = '#334155';
            ctx.fillText(`  ${i + 1}      ${PLANT_DATA[i]}`, clipX + 10, clipY + 52 + i * 14);
        }
    }

    // ---- Phase: Line graph (plant or puppy) ----

    function drawLineGraph(
        ctx: CanvasRenderingContext2D,
        W: number, H: number,
        t: number,
        target: 'plant' | 'puppy',
        revealWeeks: number,
        annotate: boolean
    ) {
        const data = target === 'plant' ? PLANT_DATA : PUPPY_DATA;
        const maxY = target === 'plant' ? 70 : 50;
        const color = target === 'plant' ? '#16a34a' : '#2563eb';
        const label = target === 'plant' ? 'Height (cm) — Sunflower 🌻' : 'Height (cm) — Puppy 🐕';

        drawAxes(ctx, W, H, maxY, label);
        plotSeries(ctx, W, H, data, maxY, color, revealWeeks, t, 5);

        // Legend
        ctx.fillStyle = color;
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        const legendLabel = target === 'plant' ? '🟢 Sunflower' : '🔵 Puppy';
        ctx.fillText(legendLabel, graphArea(W, H).left + 10, graphArea(W, H).top - 10);

        // Annotations for the S-curve phases
        if (annotate && target === 'plant') {
            const g = graphArea(W, H);
            ctx.font = '16px monospace';
            ctx.textAlign = 'center';

            // Slow phase
            ctx.fillStyle = '#94a3b8';
            const x1 = (toGraphX(1, g) + toGraphX(3, g)) / 2;
            ctx.fillText('Slow start', x1, g.top + 16);
            ctx.fillText('(building roots)', x1, g.top + 28);

            // Rapid phase
            ctx.fillStyle = '#16a34a';
            const x2 = (toGraphX(4, g) + toGraphX(6, g)) / 2;
            ctx.fillText('🚀 RAPID', x2, g.top + 16);
            ctx.fillText('growth!', x2, g.top + 28);

            // Leveling off
            ctx.fillStyle = '#94a3b8';
            const x3 = (toGraphX(7, g) + toGraphX(10, g)) / 2;
            ctx.fillText('Leveling off', x3, g.top + 16);
            ctx.fillText('(max height)', x3, g.top + 28);
        }
    }

    // ---- Phase: Compare both curves ----

    function drawCompareGraphs(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        const maxY = 70;
        drawAxes(ctx, W, H, maxY, 'Height (cm)');
        plotSeries(ctx, W, H, PLANT_DATA, maxY, '#16a34a', 10, t, 5);
        plotSeries(ctx, W, H, PUPPY_DATA, maxY, '#2563eb', 10, t, 4);

        // Legend
        const g = graphArea(W, H);
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        // Green plant
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(g.right - 140, g.top - 18, 12, 12);
        ctx.fillText('Sunflower', g.right - 124, g.top - 8);
        // Blue puppy
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(g.right - 140, g.top - 2, 12, 12);
        ctx.fillText('Puppy', g.right - 124, g.top + 8);

        // Rate bar chart at bottom right
        const barAreaX = g.right - 130;
        const barAreaY = g.bottom - 90;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(barAreaX - 10, barAreaY - 10, 140, 80);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(barAreaX - 10, barAreaY - 10, 140, 80);

        ctx.fillStyle = '#475569';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Growth Rate (cm/wk)', barAreaX + 60, barAreaY);

        // Plant rate bar (week 5 = 13 cm/wk)
        const maxRate = 15;
        const plantRate = 13;
        const puppyRate = 6;
        const barW = 24;
        const barMaxH = 45;

        const ph = (plantRate / maxRate) * barMaxH;
        const ppy = (puppyRate / maxRate) * barMaxH;
        const barBase = barAreaY + 60;

        ctx.fillStyle = '#16a34a';
        ctx.fillRect(barAreaX + 20, barBase - ph, barW, ph);
        ctx.fillStyle = '#15803d';
        ctx.font = '16px monospace';
        ctx.fillText(`${plantRate}`, barAreaX + 20 + barW / 2, barBase - ph - 4);
        ctx.fillText('🌻', barAreaX + 20 + barW / 2, barBase + 12);

        ctx.fillStyle = '#2563eb';
        ctx.fillRect(barAreaX + 70, barBase - ppy, barW, ppy);
        ctx.fillStyle = '#1d4ed8';
        ctx.fillText(`${puppyRate}`, barAreaX + 70 + barW / 2, barBase - ppy - 4);
        ctx.fillText('🐕', barAreaX + 70 + barW / 2, barBase + 12);
    }

    // ---- Phase: Slope visualization ----

    function drawSlopeVis(
        ctx: CanvasRenderingContext2D,
        W: number, H: number,
        t: number,
        target: string,
        wStart: number,
        wEnd: number
    ) {
        const maxY = 70;
        drawAxes(ctx, W, H, maxY, 'Height (cm)');

        // Plot both curves in lighter shade
        plotSeries(ctx, W, H, PLANT_DATA, maxY, 'rgba(22,163,74,0.3)', 10, 999, 3);
        plotSeries(ctx, W, H, PUPPY_DATA, maxY, 'rgba(37,99,235,0.3)', 10, 999, 3);

        const data = target === 'plant' ? PLANT_DATA : PUPPY_DATA;
        const color = target === 'plant' ? '#16a34a' : '#2563eb';
        const g = graphArea(W, H);

        // Highlight the segment
        const x1 = toGraphX(wStart, g);
        const y1 = toGraphY(data[wStart - 1], maxY, g);
        const x2 = toGraphX(wEnd, g);
        const y2 = toGraphY(data[wEnd - 1], maxY, g);

        // Thick highlighted segment
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Highlighted dots
        for (const [x, y] of [[x1, y1], [x2, y2]]) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // Rise/Run triangle with animation
        const triAlpha = Math.min(1, t * 0.5);

        // Run (horizontal)
        ctx.strokeStyle = `rgba(239, 68, 68, ${triAlpha})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y1);
        ctx.stroke();
        ctx.setLineDash([]);

        // Rise (vertical)
        ctx.strokeStyle = `rgba(59, 130, 246, ${triAlpha})`;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x2, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Run label
        ctx.fillStyle = `rgba(239, 68, 68, ${triAlpha})`;
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        const run = wEnd - wStart;
        ctx.fillText(`Run = ${run} wk`, (x1 + x2) / 2, y1 + 18);

        // Rise label
        ctx.fillStyle = `rgba(59, 130, 246, ${triAlpha})`;
        ctx.textAlign = 'left';
        const rise = data[wEnd - 1] - data[wStart - 1];
        ctx.fillText(`Rise = ${rise} cm`, x2 + 10, (y1 + y2) / 2);

        // Slope calculation box
        const boxX = g.left + 10;
        const boxY = g.top + 10;
        ctx.fillStyle = `rgba(255, 255, 255, ${triAlpha * 0.95})`;
        ctx.fillRect(boxX, boxY, 200, 50);
        ctx.strokeStyle = `rgba(100, 116, 139, ${triAlpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, 200, 50);

        ctx.fillStyle = `rgba(30, 41, 59, ${triAlpha})`;
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('📐 Slope = Rise ÷ Run', boxX + 8, boxY + 18);
        ctx.font = '18px monospace';
        const slope = (rise / run).toFixed(1);
        ctx.fillText(`= ${rise} ÷ ${run} = ${slope} cm/week`, boxX + 8, boxY + 38);
    }

    // ---- Phase: Checkpoint ----

    function drawCheckpoint(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, highlightWeek: number) {
        const maxY = 70;
        drawAxes(ctx, W, H, maxY, 'Height (cm) — Sunflower 🌻');
        plotSeries(ctx, W, H, PLANT_DATA, maxY, '#16a34a', 10, 999, 5);

        const g = graphArea(W, H);

        // Highlight the fastest week if answer revealed
        if (highlightWeek > 0) {
            const x1 = toGraphX(highlightWeek - 1, g);
            const y1 = toGraphY(PLANT_DATA[highlightWeek - 2], maxY, g);
            const x2 = toGraphX(highlightWeek, g);
            const y2 = toGraphY(PLANT_DATA[highlightWeek - 1], maxY, g);

            // Pulsing highlight
            const pulse = 0.3 + Math.sin(t * 4) * 0.15;
            ctx.fillStyle = `rgba(251, 191, 36, ${pulse})`;
            ctx.fillRect(
                Math.min(x1, x2) - 10,
                Math.min(y1, y2) - 10,
                Math.abs(x2 - x1) + 20,
                Math.abs(y2 - y1) + 20
            );

            // Thick segment
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Label
            ctx.fillStyle = '#92400e';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            const growth = PLANT_DATA[highlightWeek - 1] - PLANT_DATA[highlightWeek - 2];
            ctx.fillText(`Week ${highlightWeek}: +${growth} cm!`, (x1 + x2) / 2, Math.min(y1, y2) - 18);
            ctx.fillText('⬆️ STEEPEST', (x1 + x2) / 2, Math.min(y1, y2) - 34);
        }

        // Question overlay at top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(30, 8, W - 60, 30);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 8, W - 60, 30);
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Which week had the fastest growth? (steepest slope)', W / 2, 28);
    }

    // ---- Phase: Discovery / Complete ----

    function drawDiscovery(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, isComplete: boolean) {
        const cx = W / 2;
        const g = graphArea(W, H);

        // Mini versions of both curves
        drawAxes(ctx, W, H, 70, 'Height (cm)');
        plotSeries(ctx, W, H, PLANT_DATA, 70, '#16a34a', 10, 999, 4);
        plotSeries(ctx, W, H, PUPPY_DATA, 70, '#2563eb', 10, 999, 3);

        // Animated sparkles
        const sparkles = [0.15, 0.35, 0.55, 0.75, 0.9];
        for (let i = 0; i < sparkles.length; i++) {
            const sx = g.left + sparkles[i] * g.w;
            const sy = g.top + 20 + Math.sin(t * 2 + i * 1.5) * 10;
            const alpha = 0.4 + Math.sin(t * 3 + i * 2) * 0.3;
            ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
            ctx.font = '19px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✨', sx, sy);
        }

        // Summary box
        const boxW = Math.min(W - 60, 360);
        const boxX = cx - boxW / 2;
        const boxY = g.bottom - 100;
        ctx.fillStyle = isComplete ? 'rgba(220, 252, 231, 0.95)' : 'rgba(254, 249, 195, 0.95)';
        ctx.fillRect(boxX, boxY, boxW, 90);
        ctx.strokeStyle = isComplete ? '#16a34a' : '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, 90);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';

        if (isComplete) {
            ctx.fillText('✅ Big Idea 9: How Do Things Grow?', cx, boxY + 18);
            ctx.font = '17px monospace';
            ctx.fillStyle = '#334155';
            ctx.fillText('📈 P9: Graphs reveal rates of change', cx, boxY + 36);
            ctx.fillText('🧪 C9: Nutrients fuel growth', cx, boxY + 52);
            ctx.fillText('🧬 B9: Cell division makes growth happen', cx, boxY + 68);
            ctx.fillText('📊 Rate • Slope • S-curve • Deceleration', cx, boxY + 84);
        } else {
            ctx.fillText('🎉 Graphs = X-Ray Vision for Change!', cx, boxY + 18);
            ctx.font = '17px monospace';
            ctx.fillStyle = '#334155';
            ctx.fillText('Rate = change per unit time', cx, boxY + 36);
            ctx.fillText('Slope = rate on a graph (steep = fast)', cx, boxY + 52);
            ctx.fillText('🟢 S-curve: slow → fast → slow', cx, boxY + 68);
            ctx.fillText('🔵 Deceleration: fast → slower → stop', cx, boxY + 84);
        }

        // Legend
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(g.left + 5, g.top - 16, 10, 10);
        ctx.fillText('Sunflower', g.left + 20, g.top - 8);
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(g.left + 5, g.top - 2, 10, 10);
        ctx.fillText('Puppy', g.left + 20, g.top + 6);
    }

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
};

