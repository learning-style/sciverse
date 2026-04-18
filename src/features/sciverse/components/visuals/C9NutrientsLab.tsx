import { useRef, useEffect, useCallback } from 'react';

interface C9NutrientsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const C9NutrientsLab = ({ state }: C9NutrientsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const correct = (state.correct as boolean) ?? false;

    // ── Nutrient dot particles ──────────────────────────────────

    const dotsRef = useRef<{ x: number; y: number; vy: number; color: string; absorbed: boolean }[]>([]);

    const ensureDots = (W: number, H: number) => {
        if (dotsRef.current.length === 0) {
            const colors = ['#3b82f6', '#ef4444', '#8b5cf6']; // N=blue, P=red, K=purple
            for (let i = 0; i < 30; i++) {
                dotsRef.current.push({
                    x: 40 + Math.random() * (W - 80),
                    y: H * 0.6 + Math.random() * (H * 0.35),
                    vy: -0.2 - Math.random() * 0.4,
                    color: colors[i % 3],
                    absorbed: false
                });
            }
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

    const drawSky = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
        grad.addColorStop(0, '#bfdbfe');
        grad.addColorStop(1, '#dbeafe');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H * 0.55);
        // sun
        ctx.beginPath();
        ctx.arc(W * 0.85, H * 0.12, 28, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
    };

    const drawSoilLayer = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const soilY = H * 0.55;
        // topsoil
        const grad = ctx.createLinearGradient(0, soilY, 0, H);
        grad.addColorStop(0, '#92400e');
        grad.addColorStop(0.3, '#78350f');
        grad.addColorStop(1, '#451a03');
        ctx.fillStyle = grad;
        ctx.fillRect(0, soilY, W, H - soilY);
        // grass line
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(0, soilY - 3, W, 6);
        // soil texture dots
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        for (let i = 0; i < 50; i++) {
            const sx = Math.random() * W;
            const sy = soilY + 10 + Math.random() * (H - soilY - 20);
            ctx.beginPath();
            ctx.arc(sx, sy, 1 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const drawRoots = (ctx: CanvasRenderingContext2D, baseX: number, soilY: number, depth: number, spread: number, color = '#92400e') => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        // main root
        ctx.beginPath();
        ctx.moveTo(baseX, soilY);
        ctx.bezierCurveTo(baseX, soilY + depth * 0.4, baseX - 5, soilY + depth * 0.7, baseX, soilY + depth);
        ctx.stroke();
        // side roots
        const branches = [
            [-spread * 0.6, depth * 0.3], [spread * 0.5, depth * 0.25],
            [-spread * 0.9, depth * 0.55], [spread * 0.8, depth * 0.5],
            [-spread * 0.4, depth * 0.75], [spread * 0.6, depth * 0.7]
        ];
        ctx.lineWidth = 1.5;
        for (const [bx, by] of branches) {
            ctx.beginPath();
            ctx.moveTo(baseX, soilY + by * 0.8);
            ctx.quadraticCurveTo(baseX + bx * 0.5, soilY + by, baseX + bx, soilY + by + 8);
            ctx.stroke();
        }
    };

    const drawPlant = (ctx: CanvasRenderingContext2D, x: number, soilY: number, height: number, leafSize: number, stemWidth: number, greenIntensity: number, hasFlower: boolean) => {
        // stem
        ctx.strokeStyle = `rgb(${80 - greenIntensity * 40}, ${140 + greenIntensity * 80}, ${60})`;
        ctx.lineWidth = stemWidth;
        ctx.beginPath();
        ctx.moveTo(x, soilY);
        ctx.lineTo(x, soilY - height);
        ctx.stroke();
        // leaves
        const leafColor = `rgb(${70 - greenIntensity * 40}, ${160 + greenIntensity * 60}, ${70})`;
        ctx.fillStyle = leafColor;
        const leafPairs = Math.floor(height / 30);
        for (let i = 1; i <= leafPairs; i++) {
            const ly = soilY - (height * i) / (leafPairs + 1);
            // left leaf
            ctx.beginPath();
            ctx.ellipse(x - leafSize * 0.7, ly, leafSize, leafSize * 0.35, -0.4, 0, Math.PI * 2);
            ctx.fill();
            // right leaf
            ctx.beginPath();
            ctx.ellipse(x + leafSize * 0.7, ly, leafSize, leafSize * 0.35, 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
        // flower
        if (hasFlower) {
            const fy = soilY - height - 8;
            const petalColors = ['#f472b6', '#fb923c', '#fbbf24', '#a78bfa', '#f472b6'];
            for (let i = 0; i < 5; i++) {
                const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
                ctx.beginPath();
                ctx.ellipse(x + Math.cos(a) * 9, fy + Math.sin(a) * 9, 7, 4, a, 0, Math.PI * 2);
                ctx.fillStyle = petalColors[i];
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(x, fy, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
        }
    };

    const drawNutrientDots = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ensureDots(W, H);
        const soilY = H * 0.55;
        for (const d of dotsRef.current) {
            if (d.absorbed) continue;
            d.y += Math.sin(t * 2 + d.x * 0.05) * 0.3;
            // keep in soil
            if (d.y < soilY + 8) d.y = soilY + 8;
            if (d.y > H - 8) d.y = H - 8;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = d.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    };

    const drawFertilizerBag = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
        // bag body
        ctx.fillStyle = '#f5f5f4';
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x - 30 * s, y - 40 * s, 60 * s, 55 * s, 6);
        ctx.fill();
        ctx.stroke();
        // NPK numbers
        ctx.fillStyle = '#1e293b';
        ctx.font = `bold ${17 * s}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('10 - 5 - 8', x, y - 14 * s);
        // color-coded labels
        ctx.font = `bold ${13 * s}px monospace`;
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('N', x - 18 * s, y + 2 * s);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('P', x, y + 2 * s);
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText('K', x + 18 * s, y + 2 * s);
        // label
        ctx.fillStyle = '#78716c';
        ctx.font = `${12 * s}px monospace`;
        ctx.fillText('PLANT FOOD', x, y + 12 * s);
    };

    const drawAtomCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, label: string, color: string) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.25;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = `bold ${r * 1.1}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
    };

    const drawRecyclingArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, t: number) => {
        // animated dashes
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 6]);
        ctx.lineDashOffset = -t * 30;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 20, x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
        // arrowhead
        const angle = Math.atan2(y2 - (Math.min(y1, y2) - 20), x2 - (x1 + x2) / 2);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 10 * Math.cos(angle - 0.4), y2 - 10 * Math.sin(angle - 0.4));
        ctx.lineTo(x2 - 10 * Math.cos(angle + 0.4), y2 - 10 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fill();
    };

    const drawHumanFigure = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
        // head
        ctx.beginPath();
        ctx.arc(x, y - 30 * s, 10 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // body
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5 * s;
        ctx.beginPath();
        ctx.moveTo(x, y - 20 * s);
        ctx.lineTo(x, y + 10 * s);
        ctx.stroke();
        // arms
        ctx.beginPath();
        ctx.moveTo(x - 14 * s, y - 10 * s);
        ctx.lineTo(x, y - 16 * s);
        ctx.lineTo(x + 14 * s, y - 10 * s);
        ctx.stroke();
        // legs
        ctx.beginPath();
        ctx.moveTo(x, y + 10 * s);
        ctx.lineTo(x - 10 * s, y + 28 * s);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + 10 * s);
        ctx.lineTo(x + 10 * s, y + 28 * s);
        ctx.stroke();
    };

    // ── Phase drawing functions ─────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // weak plant in center
        drawPlant(ctx, W * 0.5, soilY, 50, 8, 2, 0.2, false);
        drawRoots(ctx, W * 0.5, soilY, 40, 20);
        // question marks
        const bob = Math.sin(t * 2) * 4;
        drawLabel(ctx, '?', W * 0.35, soilY - 70 + bob, '#ef4444', 22);
        drawLabel(ctx, '?', W * 0.65, soilY - 60 + bob, '#ef4444', 18);
        drawLabel(ctx, '💧 + ☀️  =  enough?', W * 0.5, 30, '#1e293b', 14);
    };

    const drawSoilPhase = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        drawNutrientDots(ctx, W, H, t);
        const soilY = H * 0.55;
        drawPlant(ctx, W * 0.5, soilY, 60, 10, 3, 0.5, false);
        drawRoots(ctx, W * 0.5, soilY, 60, 30, '#78350f');
        // legend
        drawAtomCircle(ctx, W * 0.12, H * 0.72, 12, 'N', '#3b82f6');
        drawAtomCircle(ctx, W * 0.12, H * 0.82, 12, 'P', '#ef4444');
        drawAtomCircle(ctx, W * 0.12, H * 0.92, 12, 'K', '#8b5cf6');
        drawLabel(ctx, 'Soil Nutrients', W * 0.5, 24, '#1e293b', 14);
    };

    const drawNitrogen = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // +N plant (tall, dark green)
        drawPlant(ctx, W * 0.25, soilY, 110, 16, 4, 1.0, false);
        drawRoots(ctx, W * 0.25, soilY, 50, 25);
        drawLabel(ctx, '+N 🍃', W * 0.25, soilY - 125, '#3b82f6', 13);
        // normal plant for comparison
        drawPlant(ctx, W * 0.65, soilY, 50, 8, 2, 0.2, false);
        drawRoots(ctx, W * 0.65, soilY, 30, 15);
        drawLabel(ctx, 'No N 🍂', W * 0.65, soilY - 65, '#a16207', 12);
        // floating N dots near +N plant
        for (let i = 0; i < 6; i++) {
            const ny = soilY + 15 + i * 18 + Math.sin(t * 2 + i) * 3;
            const nx = W * 0.25 - 10 + Math.sin(t + i * 1.5) * 15;
            ctx.beginPath();
            ctx.arc(nx, ny, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        drawLabel(ctx, 'Nitrogen = Leaf Growth', W * 0.5, 24, '#3b82f6', 14);
    };

    const drawPhosphorus = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // +P plant (big flower, big roots)
        drawPlant(ctx, W * 0.5, soilY, 80, 12, 3, 0.7, true);
        drawRoots(ctx, W * 0.5, soilY, 80, 45, '#78350f');
        drawLabel(ctx, '+P 🌸', W * 0.5, soilY - 105, '#ef4444', 13);
        // P dots near roots
        for (let i = 0; i < 8; i++) {
            const ry = soilY + 20 + i * 12 + Math.sin(t * 1.8 + i) * 3;
            const rx = W * 0.5 + Math.sin(t + i * 2) * 30;
            ctx.beginPath();
            ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        drawLabel(ctx, 'Phosphorus = Roots & Flowers', W * 0.5, 24, '#ef4444', 14);
    };

    const drawPotassium = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // three plants side by side
        drawPlant(ctx, W * 0.2, soilY, 100, 15, 4, 0.9, false);
        drawRoots(ctx, W * 0.2, soilY, 45, 22);
        drawLabel(ctx, '+N', W * 0.2, soilY - 115, '#3b82f6', 11);

        drawPlant(ctx, W * 0.5, soilY, 75, 12, 3, 0.7, true);
        drawRoots(ctx, W * 0.5, soilY, 70, 40);
        drawLabel(ctx, '+P', W * 0.5, soilY - 100, '#ef4444', 11);

        drawPlant(ctx, W * 0.8, soilY, 85, 13, 5, 0.8, false);
        drawRoots(ctx, W * 0.8, soilY, 55, 30);
        drawLabel(ctx, '+K 💪', W * 0.8, soilY - 100, '#8b5cf6', 11);

        // K dots near +K plant
        for (let i = 0; i < 5; i++) {
            const ky = soilY + 15 + i * 14 + Math.sin(t * 1.6 + i) * 3;
            const kx = W * 0.8 + Math.sin(t + i * 2.5) * 18;
            ctx.beginPath();
            ctx.arc(kx, ky, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#8b5cf6';
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        // fertilizer bag
        drawFertilizerBag(ctx, W * 0.88, soilY - 20, 0.8);
        drawLabel(ctx, 'NPK — The Big Three', W * 0.5, 24, '#1e293b', 14);
    };

    const drawHumanCompare = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // light background
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#ede9fe');
        grad.addColorStop(1, '#f5f3ff');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // plant side
        drawLabel(ctx, '🌿 Plant', W * 0.25, 30, '#16a34a', 15);
        const atoms = [
            { label: 'C', color: '#1e293b', y: 0.25 },
            { label: 'H', color: '#0ea5e9', y: 0.4 },
            { label: 'O', color: '#ef4444', y: 0.55 },
            { label: 'N', color: '#3b82f6', y: 0.7 }
        ];
        for (const a of atoms) {
            const bob = Math.sin(t * 1.5 + a.y * 10) * 3;
            drawAtomCircle(ctx, W * 0.25, H * a.y + bob, 18, a.label, a.color);
        }

        // equals sign
        drawLabel(ctx, '= same atoms! =', W * 0.5, H * 0.48, '#7c3aed', 13);
        // connecting lines
        ctx.strokeStyle = 'rgba(124,58,237,0.2)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        for (const a of atoms) {
            ctx.beginPath();
            ctx.moveTo(W * 0.33, H * a.y);
            ctx.lineTo(W * 0.67, H * a.y);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // human side
        drawLabel(ctx, '🧑 Human', W * 0.75, 30, '#7c3aed', 15);
        drawHumanFigure(ctx, W * 0.75, H * 0.45, 1.3);
        for (const a of atoms) {
            const bob = Math.sin(t * 1.5 + a.y * 10 + 1) * 3;
            drawAtomCircle(ctx, W * 0.75 + 35, H * a.y + bob, 14, a.label, a.color);
        }
    };

    const drawRecycling = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        // earthy background
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#dcfce7');
        grad.addColorStop(1, '#fef3c7');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        drawLabel(ctx, '♻️ Nature\'s Recycling', W * 0.5, 22, '#166534', 15);

        const cx = W * 0.5;
        const cy = H * 0.5;
        const rx = W * 0.28;
        const ry = H * 0.25;

        // cycle nodes
        const nodes = [
            { angle: -Math.PI / 2, label: '🌱 Plant', color: '#16a34a' },
            { angle: 0, label: '🐄 Animal', color: '#92400e' },
            { angle: Math.PI / 2, label: '🐦  Decompose', color: '#78716c' },
            { angle: Math.PI, label: '🪨 Soil', color: '#a16207' }
        ];
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const nx = cx + Math.cos(n.angle) * rx;
            const ny = cy + Math.sin(n.angle) * ry;
            // node circle bg
            ctx.beginPath();
            ctx.arc(nx, ny, 26, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = n.color;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            drawLabel(ctx, n.label, nx, ny, n.color, 11);
            // arrow to next node
            const next = nodes[(i + 1) % nodes.length];
            const nnx = cx + Math.cos(next.angle) * rx;
            const nny = cy + Math.sin(next.angle) * ry;
            drawRecyclingArrow(ctx, nx, ny, nnx, nny, n.color, t);
        }

        // animated nutrient atoms orbiting
        for (let i = 0; i < 6; i++) {
            const angle = t * 0.6 + (Math.PI * 2 / 6) * i;
            const ax = cx + Math.cos(angle) * (rx * 0.6);
            const ay = cy + Math.sin(angle) * (ry * 0.6);
            const cols = ['#3b82f6', '#ef4444', '#1e293b', '#0ea5e9', '#8b5cf6', '#3b82f6'];
            const labels = ['N', 'P', 'C', 'H', 'K', 'O'];
            ctx.beginPath();
            ctx.arc(ax, ay, 8, 0, Math.PI * 2);
            ctx.fillStyle = cols[i];
            ctx.globalAlpha = 0.5;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 15px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(labels[i], ax, ay);
        }
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // sick plant with yellow leaves
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W * 0.5, soilY);
        ctx.lineTo(W * 0.5, soilY - 45);
        ctx.stroke();
        // yellow leaves
        ctx.fillStyle = '#fbbf24';
        const leafY = [soilY - 20, soilY - 35];
        for (const ly of leafY) {
            ctx.beginPath();
            ctx.ellipse(W * 0.5 - 12, ly, 10, 4, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(W * 0.5 + 12, ly, 10, 4, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        drawRoots(ctx, W * 0.5, soilY, 30, 15);

        // drooping animation
        const droop = Math.sin(t * 1.2) * 2;
        drawLabel(ctx, '🍂 Yellow leaves, slow growth...', W * 0.5, 30 + droop, '#92400e', 13);
        drawLabel(ctx, 'Which nutrient is missing?', W * 0.5, 50, '#1e293b', 12);

        // answer options
        drawAtomCircle(ctx, W * 0.2, H * 0.85, 16, 'N', '#3b82f6');
        drawAtomCircle(ctx, W * 0.5, H * 0.85, 16, 'P', '#ef4444');
        drawAtomCircle(ctx, W * 0.8, H * 0.85, 16, 'K', '#8b5cf6');

        if (correct) {
            // highlight N as correct
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(W * 0.2, H * 0.85, 22, 0, Math.PI * 2);
            ctx.stroke();
            drawLabel(ctx, '✅', W * 0.2, H * 0.85 - 28, '#22c55e', 16);
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // three healthy plants
        drawPlant(ctx, W * 0.2, soilY, 95, 14, 4, 0.9, false);
        drawPlant(ctx, W * 0.5, soilY, 80, 12, 3, 0.8, true);
        drawPlant(ctx, W * 0.8, soilY, 88, 13, 5, 0.85, false);
        drawRoots(ctx, W * 0.2, soilY, 50, 25);
        drawRoots(ctx, W * 0.5, soilY, 65, 40);
        drawRoots(ctx, W * 0.8, soilY, 55, 30);
        drawNutrientDots(ctx, W, H, t);
        // NPK banner
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.roundRect(W * 0.15, 10, W * 0.7, 36, 8);
        ctx.fill();
        drawLabel(ctx, 'N', W * 0.33, 28, '#3b82f6', 16);
        drawLabel(ctx, '+', W * 0.41, 28, '#64748b', 14);
        drawLabel(ctx, 'P', W * 0.49, 28, '#ef4444', 16);
        drawLabel(ctx, '+', W * 0.57, 28, '#64748b', 14);
        drawLabel(ctx, 'K', W * 0.65, 28, '#8b5cf6', 16);
        drawLabel(ctx, '= 🌱', W * 0.75, 28, '#16a34a', 14);
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H);
        drawSoilLayer(ctx, W, H);
        const soilY = H * 0.55;
        // lush garden
        for (let i = 0; i < 5; i++) {
            const px = W * 0.12 + i * (W * 0.19);
            const h = 70 + Math.sin(i * 1.5) * 20;
            drawPlant(ctx, px, soilY, h, 11 + i, 3, 0.85, i % 2 === 1);
            drawRoots(ctx, px, soilY, 40 + i * 5, 20 + i * 3);
        }
        drawNutrientDots(ctx, W, H, t);
        // complete banner
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.roundRect(W * 0.1, 10, W * 0.8, 36, 8);
        ctx.fill();
        drawLabel(ctx, '✅ C9 Complete — Nutrients & Elements!', W * 0.5, 28, '#16a34a', 13);
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
            case 'soil':
                drawSoilPhase(ctx, W, H, t);
                break;
            case 'nitrogen':
                drawNitrogen(ctx, W, H, t);
                break;
            case 'phosphorus':
                drawPhosphorus(ctx, W, H, t);
                break;
            case 'potassium':
                drawPotassium(ctx, W, H, t);
                break;
            case 'human_compare':
                drawHumanCompare(ctx, W, H, t);
                break;
            case 'recycling':
                drawRecycling(ctx, W, H, t);
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

