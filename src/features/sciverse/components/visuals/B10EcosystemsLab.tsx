import { useRef, useEffect, useCallback } from 'react';

interface B10EcosystemsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B10EcosystemsLab = ({ state, onStateChange }: B10EcosystemsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const setStateValue = (key: string, value: unknown) => {
        onStateChange?.(key, value);
    };

    const phase = (state.phase as string) || 'intro';
    const correct = (state.correct as boolean) ?? false;

    // ── Drawing helpers ─────────────────────────────────────────

    const drawLabel = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = '#1e293b', size = 12) => {
        ctx.fillStyle = color;
        ctx.font = `bold ${size + 4}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    };

    const drawSky = (ctx: CanvasRenderingContext2D, W: number, H: number, healthy: boolean) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
        if (healthy) {
            grad.addColorStop(0, '#38bdf8');
            grad.addColorStop(1, '#bae6fd');
        } else {
            grad.addColorStop(0, '#94a3b8');
            grad.addColorStop(1, '#cbd5e1');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H * 0.55);
    };

    const drawGround = (ctx: CanvasRenderingContext2D, W: number, H: number, healthy: boolean) => {
        const groundY = H * 0.55;
        const gGrad = ctx.createLinearGradient(0, groundY, 0, H);
        if (healthy) {
            gGrad.addColorStop(0, '#22c55e');
            gGrad.addColorStop(0.05, '#16a34a');
            gGrad.addColorStop(0.3, '#92400e');
            gGrad.addColorStop(1, '#451a03');
        } else {
            gGrad.addColorStop(0, '#a16207');
            gGrad.addColorStop(0.05, '#92400e');
            gGrad.addColorStop(0.3, '#78716c');
            gGrad.addColorStop(1, '#57534e');
        }
        ctx.fillStyle = gGrad;
        ctx.fillRect(0, groundY, W, H - groundY);
    };

    const drawSun = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) => {
        const R = r * 1.8;
        const glow = ctx.createRadialGradient(x, y, R * 0.5, x, y, R * 2.5);
        glow.addColorStop(0, 'rgba(251,191,36,0.6)');
        glow.addColorStop(1, 'rgba(251,191,36,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - R * 3, y - R * 3, R * 6, R * 6);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            const a = (Math.PI * 2 / 8) * i + t * 0.3;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a) * (R + 6), y + Math.sin(a) * (R + 6));
            ctx.lineTo(x + Math.cos(a) * (R + 22), y + Math.sin(a) * (R + 22));
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, R, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
    };

    const drawTree = (ctx: CanvasRenderingContext2D, x: number, groundY: number, healthy: boolean, t: number, scale = 1) => {
        const s = scale * 1.8;
        const sway = Math.sin(t * 1.5 + x * 0.01) * 3 * s;
        ctx.fillStyle = healthy ? '#92400e' : '#78716c';
        ctx.fillRect(x - 6 * s, groundY - 50 * s, 12 * s, 50 * s);
        if (healthy) {
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(x + sway, groundY - 64 * s, 32 * s, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.arc(x - 14 * s + sway, groundY - 54 * s, 20 * s, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 14 * s + sway, groundY - 54 * s, 20 * s, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // bare branches
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 3;
            for (let i = 0; i < 3; i++) {
                const a = -Math.PI / 2 + (i - 1) * 0.6;
                ctx.beginPath();
                ctx.moveTo(x, groundY - 46 * s);
                ctx.lineTo(x + Math.cos(a) * 28 * s, groundY - 46 * s + Math.sin(a) * 28 * s);
                ctx.stroke();
            }
        }
    };

    const drawGrass = (ctx: CanvasRenderingContext2D, x: number, groundY: number, t: number, count: number) => {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        for (let i = 0; i < count; i++) {
            const gx = x + i * 12;
            const sway = Math.sin(t * 2 + gx * 0.05) * 5;
            ctx.beginPath();
            ctx.moveTo(gx, groundY);
            ctx.quadraticCurveTo(gx + sway, groundY - 18, gx + sway * 1.2, groundY - 30);
            ctx.stroke();
        }
    };

    const drawRiver = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number, eroded: boolean) => {
        const groundY = H * 0.55;
        const riverX = W * 0.5;
        const width = eroded ? 70 : 46;
        ctx.fillStyle = eroded ? '#93c5fd' : '#3b82f6';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(riverX - width / 2, groundY);
        // wavy river
        for (let y = groundY; y < H; y += 4) {
            const wave = Math.sin(t * 2 + y * 0.05) * (eroded ? 8 : 4);
            ctx.lineTo(riverX - width / 2 + wave, y);
        }
        ctx.lineTo(riverX + width / 2, H);
        for (let y = H; y >= groundY; y -= 4) {
            const wave = Math.sin(t * 2 + y * 0.05 + 1) * (eroded ? 8 : 4);
            ctx.lineTo(riverX + width / 2 + wave, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        if (eroded) {
            // muddy erosion marks
            ctx.fillStyle = '#92400e';
            ctx.globalAlpha = 0.3;
            ctx.fillRect(riverX - width / 2 - 15, groundY, 15, H * 0.15);
            ctx.fillRect(riverX + width / 2, groundY, 15, H * 0.15);
            ctx.globalAlpha = 1;
        }
    };

    const drawWolf = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number, removed = false) => {
        const bob = Math.sin(t * 3 + x) * 3;
        // body
        ctx.fillStyle = removed ? '#94a3b8' : '#6b7280';
        ctx.globalAlpha = removed ? 0.3 : 1;
        ctx.beginPath();
        ctx.ellipse(x, y + bob, 26, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        // head
        ctx.beginPath();
        ctx.arc(x + 22, y - 8 + bob, 11, 0, Math.PI * 2);
        ctx.fill();
        // ears
        ctx.beginPath();
        ctx.moveTo(x + 18, y - 17 + bob);
        ctx.lineTo(x + 23, y - 30 + bob);
        ctx.lineTo(x + 28, y - 17 + bob);
        ctx.fill();
        // legs
        ctx.fillRect(x - 14, y + 12 + bob, 5, 18);
        ctx.fillRect(x + 8, y + 12 + bob, 5, 18);
        // eye
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(x + 25, y - 10 + bob, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (removed) {
            // X mark
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x - 28, y - 28); ctx.lineTo(x + 36, y + 28);
            ctx.moveTo(x + 36, y - 28); ctx.lineTo(x - 28, y + 28);
            ctx.stroke();
        }
    };

    const drawDeer = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number, eating = false) => {
        const bob = Math.sin(t * 2.5 + x * 0.1) * 2.5;
        // body
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.ellipse(x, y + bob, 22, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        // head
        const headX = x + 18;
        const headY = y - 4 + bob + (eating ? 14 : 0);
        ctx.beginPath();
        ctx.arc(headX, headY, 9, 0, Math.PI * 2);
        ctx.fill();
        // antlers
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(headX, headY - 9);
        ctx.lineTo(headX - 6, headY - 26 + (eating ? 10 : 0));
        ctx.lineTo(headX - 12, headY - 30 + (eating ? 10 : 0));
        ctx.moveTo(headX, headY - 9);
        ctx.lineTo(headX + 6, headY - 26 + (eating ? 10 : 0));
        ctx.lineTo(headX + 12, headY - 30 + (eating ? 10 : 0));
        ctx.stroke();
        // legs
        ctx.fillStyle = '#b45309';
        ctx.fillRect(x - 10, y + 10 + bob, 4, 18);
        ctx.fillRect(x + 8, y + 10 + bob, 4, 18);
    };

    const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number, flying = false) => {
        const flapY = Math.sin(t * 6 + x) * 7;
        const dx = flying ? Math.sin(t * 0.8 + x * 0.1) * 30 : 0;
        const dy = flying ? -t * 5 % (y + 50) : 0;
        const bx = x + dx;
        const by = y + flapY + dy;
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(bx - 16, by);
        ctx.quadraticCurveTo(bx - 8, by - 12 + flapY, bx, by);
        ctx.quadraticCurveTo(bx + 8, by - 12 + flapY, bx + 16, by);
        ctx.stroke();
    };

    const drawInsect = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number) => {
        const bx = x + Math.sin(t * 4 + x) * 10;
        const by = y + Math.cos(t * 3 + x) * 7;
        // body
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.ellipse(bx, by, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        // stripes
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(bx - 3, by - 5, 2, 10);
        ctx.fillRect(bx + 1, by - 5, 2, 10);
        // wings
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.ellipse(bx - 5, by - 7, 8, 4, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(bx + 5, by - 7, 8, 4, 0.3, 0, Math.PI * 2);
        ctx.fill();
    };

    // ── Food web diagram ────────────────────────────────────────

    const drawFoodWeb = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        drawLabel(ctx, '🕸️ Food Web — Who Eats Who?', W * 0.5, 22, '#1e293b', 14);

        const nodes = [
            { x: W * 0.5, y: H * 0.10, label: '☀️ Sun', color: '#fbbf24', bg: '#fef3c7' },
            { x: W * 0.2, y: H * 0.28, label: '🌱 Grass', color: '#22c55e', bg: '#dcfce7' },
            { x: W * 0.5, y: H * 0.28, label: '🌳 Trees', color: '#16a34a', bg: '#d1fae5' },
            { x: W * 0.8, y: H * 0.28, label: '🌸 Flowers', color: '#f472b6', bg: '#fce7f3' },
            { x: W * 0.15, y: H * 0.46, label: '🦌 Deer', color: '#d97706', bg: '#fef3c7' },
            { x: W * 0.4, y: H * 0.46, label: '🐇 Rabbit', color: '#a16207', bg: '#fef9c3' },
            { x: W * 0.65, y: H * 0.46, label: '🐛 Insects', color: '#65a30d', bg: '#ecfccb' },
            { x: W * 0.85, y: H * 0.46, label: '🐦 Birds', color: '#3b82f6', bg: '#dbeafe' },
            { x: W * 0.3, y: H * 0.64, label: '🐺 Wolves', color: '#6b7280', bg: '#f1f5f9' },
            { x: W * 0.65, y: H * 0.64, label: '🦊 Fox', color: '#ea580c', bg: '#fff7ed' },
            { x: W * 0.5, y: H * 0.80, label: '🍄 Decomposers', color: '#92400e', bg: '#fef3c7' },
        ];

        // Arrows: [from, to]
        const arrows: [number, number][] = [
            [0, 1], [0, 2], [0, 3],    // sun → producers
            [1, 4], [1, 5], [2, 4],     // plants → herbivores
            [3, 6], [2, 7], [1, 6],     // plants → insects/birds
            [4, 8], [5, 9], [6, 9],     // herbivores → predators
            [6, 7],                       // insects → birds
            [8, 10], [9, 10], [4, 10], [5, 10] // everything → decomposers
        ];

        // Draw arrows
        const pulse = Math.sin(t * 2) * 0.3 + 0.7;
        for (const [fi, ti] of arrows) {
            const from = nodes[fi];
            const to = nodes[ti];
            ctx.strokeStyle = from.color;
            ctx.globalAlpha = 0.3 + pulse * 0.2;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y + 12);
            ctx.lineTo(to.x, to.y - 12);
            ctx.stroke();
            // arrowhead
            const angle = Math.atan2(to.y - 12 - from.y - 12, to.x - from.x);
            const ax = to.x - Math.cos(angle) * 4;
            const ay = to.y - 12 - Math.sin(angle) * 4;
            ctx.beginPath();
            ctx.moveTo(to.x, to.y - 12);
            ctx.lineTo(ax - Math.cos(angle - 0.5) * 6, ay - Math.sin(angle - 0.5) * 6);
            ctx.moveTo(to.x, to.y - 12);
            ctx.lineTo(ax - Math.cos(angle + 0.5) * 6, ay - Math.sin(angle + 0.5) * 6);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Draw nodes
        const nodeR = Math.min(28, W * 0.05);
        for (const node of nodes) {
            ctx.fillStyle = node.bg;
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeR, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            drawLabel(ctx, node.label, node.x, node.y + nodeR + 10, node.color, 9);
        }

        drawLabel(ctx, 'Energy flows from Sun → Producers → Consumers → Decomposers', W * 0.5, H * 0.95, '#64748b', 9);
    };

    // ── Biodiversity net analogy ────────────────────────────────

    const drawBiodiversityNet = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        drawLabel(ctx, '🌈 Biodiversity: The Rope Net', W * 0.5, 22, '#1e293b', 14);

        // Left side: high biodiversity (many ropes)
        drawLabel(ctx, '✅ High Biodiversity', W * 0.25, 44, '#22c55e', 11);
        drawLabel(ctx, '(many species = strong)', W * 0.25, 58, '#64748b', 9);
        const leftCx = W * 0.25;
        const netY = H * 0.3;
        const netH = H * 0.4;
        const netW2 = W * 0.18;
        const rows = 6;
        const cols = 6;
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
                const nx = leftCx - netW2 + (c / cols) * netW2 * 2;
                const ny = netY + (r / rows) * netH;
                const sag = Math.sin((c / cols) * Math.PI) * 8 * (r / rows);
                const wave = Math.sin(t * 1.5 + c + r) * 1.5;
                // horizontal
                if (c < cols) {
                    const nx2 = leftCx - netW2 + ((c + 1) / cols) * netW2 * 2;
                    const sag2 = Math.sin(((c + 1) / cols) * Math.PI) * 8 * (r / rows);
                    ctx.beginPath();
                    ctx.moveTo(nx, ny + sag + wave);
                    ctx.lineTo(nx2, ny + sag2 + wave);
                    ctx.stroke();
                }
                // vertical
                if (r < rows) {
                    const ny2 = netY + ((r + 1) / rows) * netH;
                    const sag3 = Math.sin((c / cols) * Math.PI) * 8 * ((r + 1) / rows);
                    const wave2 = Math.sin(t * 1.5 + c + r + 1) * 1.5;
                    ctx.beginPath();
                    ctx.moveTo(nx, ny + sag + wave);
                    ctx.lineTo(nx, ny2 + sag3 + wave2);
                    ctx.stroke();
                }
                // node dot
                ctx.fillStyle = '#22c55e';
                ctx.beginPath();
                ctx.arc(nx, ny + sag + wave, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        // weight held
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(leftCx, netY + netH + 20, 10, 0, Math.PI * 2);
        ctx.fill();
        drawLabel(ctx, '⬇️ Pressure', leftCx, netY + netH + 38, '#64748b', 9);
        drawLabel(ctx, '💪 Net holds!', leftCx, netY + netH + 52, '#22c55e', 10);

        // Divider
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(W * 0.5, 40);
        ctx.lineTo(W * 0.5, H - 10);
        ctx.stroke();
        ctx.setLineDash([]);

        // Right side: low biodiversity (few ropes, holes)
        drawLabel(ctx, '❌ Low Biodiversity', W * 0.75, 44, '#ef4444', 11);
        drawLabel(ctx, '(few species = weak)', W * 0.75, 58, '#64748b', 9);
        const rightCx = W * 0.75;
        const sparseRows = 3;
        const sparseCols = 3;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        for (let r = 0; r <= sparseRows; r++) {
            for (let c = 0; c <= sparseCols; c++) {
                const nx = rightCx - netW2 + (c / sparseCols) * netW2 * 2;
                const ny = netY + (r / sparseRows) * netH;
                const sag = Math.sin((c / sparseCols) * Math.PI) * 12 * (r / sparseRows);
                const wave = Math.sin(t * 1.5 + c + r) * 2;
                // skip some connections to show holes
                const skip = (r === 1 && c === 1) || (r === 2 && c === 2);
                if (c < sparseCols && !skip) {
                    const nx2 = rightCx - netW2 + ((c + 1) / sparseCols) * netW2 * 2;
                    const sag2 = Math.sin(((c + 1) / sparseCols) * Math.PI) * 12 * (r / sparseRows);
                    ctx.beginPath();
                    ctx.moveTo(nx, ny + sag + wave);
                    ctx.lineTo(nx2, ny + sag2 + wave);
                    ctx.stroke();
                }
                if (r < sparseRows && !skip) {
                    const ny2 = netY + ((r + 1) / sparseRows) * netH;
                    const sag3 = Math.sin((c / sparseCols) * Math.PI) * 12 * ((r + 1) / sparseRows);
                    const wave2 = Math.sin(t * 1.5 + c + r + 1) * 2;
                    ctx.beginPath();
                    ctx.moveTo(nx, ny + sag + wave);
                    ctx.lineTo(nx, ny2 + sag3 + wave2);
                    ctx.stroke();
                }
                if (!skip) {
                    ctx.fillStyle = '#ef4444';
                    ctx.beginPath();
                    ctx.arc(nx, ny + sag + wave, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        // holes label
        drawLabel(ctx, '🕳️ HOLES', rightCx, netY + netH * 0.5, '#ef4444', 10);
        // weight falling through
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        const fallY = netY + netH + 20 + Math.abs(Math.sin(t * 2)) * 15;
        ctx.arc(rightCx, fallY, 10, 0, Math.PI * 2);
        ctx.fill();
        drawLabel(ctx, '⬇️ Pressure', rightCx, netY + netH + 52, '#64748b', 9);
        drawLabel(ctx, '💔 Net breaks!', rightCx, netY + netH + 66, '#ef4444', 10);

        drawLabel(ctx, 'More species = More connections = Stronger ecosystem!', W * 0.5, H - 12, '#1e293b', 10);
    };

    // ── Phase drawing functions ─────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H, true);
        drawGround(ctx, W, H, true);
        drawSun(ctx, W * 0.85, H * 0.06, 18, t);
        drawRiver(ctx, W, H, t, false);

        const groundY = H * 0.55;
        // lush trees
        drawTree(ctx, W * 0.1, groundY, true, t);
        drawTree(ctx, W * 0.28, groundY, true, t);
        drawTree(ctx, W * 0.7, groundY, true, t);
        drawTree(ctx, W * 0.88, groundY, true, t);
        // grass
        drawGrass(ctx, W * 0.35, groundY, t, 8);
        drawGrass(ctx, W * 0.6, groundY, t, 6);

        // animals
        drawWolf(ctx, W * 0.2, groundY - 12, t);
        drawDeer(ctx, W * 0.6, groundY - 10, t);
        drawBird(ctx, W * 0.4, H * 0.2, t);
        drawBird(ctx, W * 0.55, H * 0.15, t);
        drawInsect(ctx, W * 0.75, H * 0.35, t);
        drawInsect(ctx, W * 0.82, H * 0.38, t);

        const bob = Math.sin(t * 2) * 3;
        drawLabel(ctx, '🐺 The Missing Wolves', W * 0.5, H * 0.46 + bob, '#1e293b', 14);
        drawLabel(ctx, 'What happens when a species disappears?', W * 0.5, H * 0.46 + 16 + bob, '#64748b', 10);
    };

    const drawHealthyEcosystem = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H, true);
        drawGround(ctx, W, H, true);
        drawSun(ctx, W * 0.88, H * 0.06, 16, t);
        drawRiver(ctx, W, H, t, false);

        const groundY = H * 0.55;
        // trees
        drawTree(ctx, W * 0.08, groundY, true, t);
        drawTree(ctx, W * 0.24, groundY, true, t);
        drawTree(ctx, W * 0.42, groundY, true, t, 0.8);
        drawTree(ctx, W * 0.68, groundY, true, t);
        drawTree(ctx, W * 0.86, groundY, true, t);
        // grass patches
        drawGrass(ctx, W * 0.14, groundY, t, 6);
        drawGrass(ctx, W * 0.55, groundY, t, 5);
        drawGrass(ctx, W * 0.76, groundY, t, 4);

        // balanced animals
        drawWolf(ctx, W * 0.15, groundY - 12, t);
        drawWolf(ctx, W * 0.78, groundY - 14, t);
        drawDeer(ctx, W * 0.35, groundY - 10, t);
        drawDeer(ctx, W * 0.6, groundY - 10, t);
        drawBird(ctx, W * 0.3, H * 0.18, t);
        drawBird(ctx, W * 0.55, H * 0.22, t);
        drawBird(ctx, W * 0.75, H * 0.16, t);
        drawInsect(ctx, W * 0.45, H * 0.32, t);
        drawInsect(ctx, W * 0.62, H * 0.36, t);
        drawInsect(ctx, W * 0.82, H * 0.34, t);

        // balance indicator
        ctx.fillStyle = '#f0fdf4';
        ctx.beginPath();
        ctx.roundRect(W * 0.05, H * 0.78, W * 0.9, 36, 8);
        ctx.fill();
        ctx.strokeStyle = '#bbf7d0';
        ctx.lineWidth = 1;
        ctx.stroke();
        drawLabel(ctx, '⚖️ BALANCED — Wolves keep deer in check, plants thrive!', W * 0.5, H * 0.78 + 18, '#14532d', 10);
    };

    const drawWolvesRemoved = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H, true);
        drawGround(ctx, W, H, true);
        drawSun(ctx, W * 0.88, H * 0.06, 16, t);
        drawRiver(ctx, W, H, t, false);

        const groundY = H * 0.55;
        // trees being eaten — some bare
        drawTree(ctx, W * 0.08, groundY, true, t);
        drawTree(ctx, W * 0.24, groundY, false, t);
        drawTree(ctx, W * 0.68, groundY, false, t);
        drawTree(ctx, W * 0.86, groundY, true, t);

        // removed wolves
        drawWolf(ctx, W * 0.15, groundY - 12, t, true);

        // TOO MANY deer, some eating
        drawDeer(ctx, W * 0.2, groundY - 10, t, true);
        drawDeer(ctx, W * 0.32, groundY - 8, t, true);
        drawDeer(ctx, W * 0.44, groundY - 10, t);
        drawDeer(ctx, W * 0.56, groundY - 9, t, true);
        drawDeer(ctx, W * 0.68, groundY - 10, t);
        drawDeer(ctx, W * 0.78, groundY - 11, t, true);
        drawDeer(ctx, W * 0.88, groundY - 9, t);

        // birds still present but fewer
        drawBird(ctx, W * 0.4, H * 0.2, t);

        // population bars
        ctx.fillStyle = '#fef2f2';
        ctx.beginPath();
        ctx.roundRect(W * 0.05, H * 0.75, W * 0.9, 50, 8);
        ctx.fill();
        ctx.strokeStyle = '#fecaca';
        ctx.lineWidth = 1;
        ctx.stroke();
        drawLabel(ctx, '🐺 ✕ Wolves removed! → 🦌🦌🦌🦌 Deer EXPLODE', W * 0.5, H * 0.75 + 18, '#7f1d1d', 10);
        drawLabel(ctx, '🌱 Plants being eaten bare!', W * 0.5, H * 0.75 + 36, '#78350f', 10);
    };

    const drawCascade = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H, false);
        drawGround(ctx, W, H, false);
        drawSun(ctx, W * 0.88, H * 0.08, 14, t);
        drawRiver(ctx, W, H, t, true);

        const groundY = H * 0.55;
        // all trees bare
        drawTree(ctx, W * 0.1, groundY, false, t);
        drawTree(ctx, W * 0.3, groundY, false, t);
        drawTree(ctx, W * 0.7, groundY, false, t);
        drawTree(ctx, W * 0.88, groundY, false, t);

        // many deer still eating
        drawDeer(ctx, W * 0.2, groundY - 10, t, true);
        drawDeer(ctx, W * 0.4, groundY - 9, t, true);
        drawDeer(ctx, W * 0.65, groundY - 10, t, true);
        drawDeer(ctx, W * 0.8, groundY - 8, t);

        // birds flying away
        drawBird(ctx, W * 0.2, H * 0.12, t, true);
        drawBird(ctx, W * 0.35, H * 0.08, t, true);
        drawBird(ctx, W * 0.5, H * 0.1, t, true);

        // cascade labels
        ctx.fillStyle = '#fefce8';
        ctx.beginPath();
        ctx.roundRect(W * 0.03, H * 0.72, W * 0.94, 68, 8);
        ctx.fill();
        ctx.strokeStyle = '#fde68a';
        ctx.lineWidth = 1;
        ctx.stroke();
        drawLabel(ctx, '🌊 TROPHIC CASCADE', W * 0.5, H * 0.72 + 16, '#7f1d1d', 12);
        drawLabel(ctx, '🌳❌ Trees bare → 🏔️ Rivers erode → 🐦 Birds leave', W * 0.5, H * 0.72 + 36, '#1e293b', 9);
        drawLabel(ctx, 'One missing species wrecked EVERYTHING!', W * 0.5, H * 0.72 + 55, '#78350f', 10);
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H, true);
        drawGround(ctx, W, H, true);
        drawSun(ctx, W * 0.88, H * 0.06, 16, t);

        const groundY = H * 0.55;
        // meadow with flowers
        drawGrass(ctx, W * 0.15, groundY, t, 10);
        drawGrass(ctx, W * 0.55, groundY, t, 8);
        // flowers
        const flowerColors = ['#f472b6', '#a78bfa', '#fbbf24', '#fb923c', '#f87171'];
        for (let i = 0; i < 8; i++) {
            const fx = W * 0.1 + (i / 7) * W * 0.8;
            const fy = groundY - 8 + Math.sin(i * 1.3) * 4;
            // petals
            const petalColor = flowerColors[i % flowerColors.length];
            ctx.fillStyle = petalColor;
            for (let p = 0; p < 5; p++) {
                const pa = (Math.PI * 2 / 5) * p;
                ctx.beginPath();
                ctx.arc(fx + Math.cos(pa) * 6, fy + Math.sin(pa) * 6, 5, 0, Math.PI * 2);
                ctx.fill();
            }
            // center
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(fx, fy, 4, 0, Math.PI * 2);
            ctx.fill();
            // stem
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(fx, fy + 6);
            ctx.lineTo(fx, fy + 22);
            ctx.stroke();
        }

        // bees
        for (let i = 0; i < 5; i++) {
            drawInsect(ctx, W * 0.15 + i * W * 0.17, H * 0.38 + Math.sin(t + i) * 8, t);
        }

        // question
        drawLabel(ctx, '🐝 If ALL bees disappeared...', W * 0.5, H * 0.85, '#1e293b', 13);
        drawLabel(ctx, 'What would happen to flowering plants?', W * 0.5, H * 0.92, '#64748b', 11);

        if (correct) {
            ctx.fillStyle = 'rgba(34,197,94,0.15)';
            ctx.fillRect(0, 0, W, H);
            drawLabel(ctx, '✅ No bees → No pollination → Plants can\'t reproduce!', W * 0.5, H * 0.78, '#22c55e', 12);
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        drawLabel(ctx, '🎉 Discovery: Ecosystems & Biodiversity', W * 0.5, 22, '#1e293b', 13);

        // Five concept cards
        const concepts = [
            { icon: '🕸️', title: 'Ecosystem', desc: 'All life + environment', color: '#22c55e', bg: '#dcfce7' },
            { icon: '🔗', title: 'Food Web', desc: 'Who eats who', color: '#3b82f6', bg: '#dbeafe' },
            { icon: '🌊', title: 'Cascade', desc: 'Chain reaction', color: '#ef4444', bg: '#fee2e2' },
            { icon: '🌈', title: 'Biodiversity', desc: 'Species variety', color: '#8b5cf6', bg: '#ede9fe' },
            { icon: '🐺', title: 'Keystone', desc: 'Key species', color: '#d97706', bg: '#fef3c7' },
        ];

        const cardW = W * 0.16;
        const cardH = H * 0.3;
        const startX = W * 0.05;
        const cardY = H * 0.15;

        for (let i = 0; i < concepts.length; i++) {
            const c = concepts[i];
            const cx = startX + i * (cardW + W * 0.02);
            const pulse = Math.sin(t * 2 + i * 0.8) * 2;

            ctx.fillStyle = c.bg;
            ctx.beginPath();
            ctx.roundRect(cx, cardY + pulse, cardW, cardH, 8);
            ctx.fill();
            ctx.strokeStyle = c.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            drawLabel(ctx, c.icon, cx + cardW / 2, cardY + pulse + cardH * 0.25, c.color, 22);
            drawLabel(ctx, c.title, cx + cardW / 2, cardY + pulse + cardH * 0.55, c.color, 10);
            drawLabel(ctx, c.desc, cx + cardW / 2, cardY + pulse + cardH * 0.72, '#64748b', 8);
        }

        // ecosystem illustration at bottom
        const groundY = H * 0.7;
        drawSky(ctx, W, H * 0.5, true);

        // mini scene
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(0, groundY, W, H - groundY);
        drawTree(ctx, W * 0.15, groundY, true, t, 0.6);
        drawTree(ctx, W * 0.85, groundY, true, t, 0.6);
        drawWolf(ctx, W * 0.3, groundY - 6, t);
        drawDeer(ctx, W * 0.55, groundY - 5, t);
        drawInsect(ctx, W * 0.7, groundY - 14, t);
        drawBird(ctx, W * 0.45, H * 0.58, t);

        drawLabel(ctx, 'Every species matters — each one is a thread in the web of life! 🌍', W * 0.5, H - 12, '#1e293b', 10);
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawSky(ctx, W, H, true);
        drawGround(ctx, W, H, true);
        drawSun(ctx, W * 0.85, H * 0.06, 18, t);
        drawRiver(ctx, W, H, t, false);

        const groundY = H * 0.55;
        // restored ecosystem — wolves are back!
        drawTree(ctx, W * 0.08, groundY, true, t);
        drawTree(ctx, W * 0.22, groundY, true, t);
        drawTree(ctx, W * 0.42, groundY, true, t, 0.8);
        drawTree(ctx, W * 0.68, groundY, true, t);
        drawTree(ctx, W * 0.88, groundY, true, t);
        drawGrass(ctx, W * 0.14, groundY, t, 5);
        drawGrass(ctx, W * 0.55, groundY, t, 6);
        drawGrass(ctx, W * 0.76, groundY, t, 4);

        // balanced animals — wolves returned
        drawWolf(ctx, W * 0.15, groundY - 12, t);
        drawWolf(ctx, W * 0.8, groundY - 14, t);
        drawDeer(ctx, W * 0.4, groundY - 10, t);
        drawDeer(ctx, W * 0.6, groundY - 10, t);
        drawBird(ctx, W * 0.3, H * 0.18, t);
        drawBird(ctx, W * 0.55, H * 0.2, t);
        drawBird(ctx, W * 0.72, H * 0.16, t);
        drawInsect(ctx, W * 0.48, H * 0.34, t);
        drawInsect(ctx, W * 0.65, H * 0.32, t);

        // solar panel + wind turbine (link to P10)
        ctx.fillStyle = '#1e3a5f';
        const spX = W * 0.92;
        ctx.beginPath();
        ctx.moveTo(spX - 10, groundY - 8);
        ctx.lineTo(spX + 10, groundY - 8);
        ctx.lineTo(spX + 7, groundY - 18);
        ctx.lineTo(spX - 7, groundY - 18);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#64748b';
        ctx.fillRect(spX - 1.5, groundY - 8, 3, 8);

        // complete banner with Big Idea summary
        const bannerY = H * 0.52;
        const bannerH = H * 0.46;
        ctx.fillStyle = 'rgba(240, 253, 244, 0.95)';
        ctx.beginPath();
        ctx.roundRect(W * 0.05, bannerY, W * 0.9, bannerH, 10);
        ctx.fill();
        ctx.strokeStyle = '#bbf7d0';
        ctx.lineWidth = 2;
        ctx.stroke();
        drawLabel(ctx, '🔗 Big Idea 10 Complete — How Do We Protect Our Planet?', W * 0.5, bannerY + 22, '#14532d', 13);
        drawLabel(ctx, 'P10: Renewable Energy — solar, wind, hydro replace fossil fuels', W * 0.5, bannerY + 46, '#1e40af', 10);
        drawLabel(ctx, 'C10: Air Pollution — CO₂ and acid rain damage habitats', W * 0.5, bannerY + 64, '#065f46', 10);
        drawLabel(ctx, 'B10: Ecosystems & Biodiversity — food webs connect every species', W * 0.5, bannerY + 82, '#9f1239', 10);
        drawLabel(ctx, 'Protecting our planet means protecting energy, air, and the web of life! 🌍🐺🐝', W * 0.5, bannerY + 106, '#1e293b', 10);
        drawLabel(ctx, '✅ Lesson B10 Complete!', W * 0.5, bannerY + bannerH - 14, '#14532d', 12);
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
            case 'healthy_ecosystem':
                drawHealthyEcosystem(ctx, W, H, t);
                break;
            case 'wolves_removed':
                drawWolvesRemoved(ctx, W, H, t);
                break;
            case 'cascade':
                drawCascade(ctx, W, H, t);
                break;
            case 'food_web':
                drawFoodWeb(ctx, W, H, t);
                break;
            case 'biodiversity':
                drawBiodiversityNet(ctx, W, H, t);
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

                <label className="block text-[11px] font-semibold text-slate-800 mb-1">Ecosystem Scenario</label>
                <select
                    value={phase}
                    onChange={(e) => setStateValue('phase', e.target.value)}
                    className="w-full mb-2 text-xs text-slate-900 border border-slate-300 rounded px-2 py-1 bg-white shadow-sm"
                >
                    <option value="intro">Intro</option>
                    <option value="healthy_ecosystem">Healthy Ecosystem</option>
                    <option value="wolves_removed">Wolves Removed</option>
                    <option value="cascade">Trophic Cascade</option>
                    <option value="food_web">Food Web</option>
                    <option value="biodiversity">Biodiversity Net</option>
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


