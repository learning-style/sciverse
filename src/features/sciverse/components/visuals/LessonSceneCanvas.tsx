import { useEffect, useRef, useState } from 'react';

type SceneId =
    | 'c16-domains'
    | 'b16-migration'
    | 'p17-truss'
    | 'c17-material-bars'
    | 'b17-bone'
    | 'p18-river-cut'
    | 'c18-ion-beaker'
    | 'b18-river-foodweb'
    | 'p19-soil-layers'
    | 'c19-ph-flask'
    | 'b19-soil-web'
    | 'p20-lens-bench';

interface LessonSceneCanvasProps {
    scene: SceneId;
    title: string;
    a: number;
    b: number;
    c?: number;
    d?: number;
    variant?: string;
    probeMetricLabel?: string;
    probeMetricUnit?: string;
}

export const LessonSceneCanvas = ({ scene, title, a, b, c = 0, d = 0, variant, probeMetricLabel, probeMetricUnit = '%' }: LessonSceneCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const timeRef = useRef(0);
    const [probe, setProbe] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const host = containerRef.current;
        if (!host) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = host.clientWidth;
            canvas.height = host.clientHeight;
        });
        obs.observe(host);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const W = canvas.width;
            const H = canvas.height;
            const t = timeRef.current;
            timeRef.current += 0.016;

            const drawArrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
                const dx = x2 - x1;
                const dy = y2 - y1;
                const len = Math.hypot(dx, dy) || 1;
                const ux = dx / len;
                const uy = dy / len;
                const hx = x2 - ux * 8;
                const hy = y2 - uy * 8;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x2, y2);
                ctx.lineTo(hx - uy * 4, hy + ux * 4);
                ctx.lineTo(hx + uy * 4, hy - ux * 4);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            };

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(title, W / 2, 18);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px monospace';
            ctx.fillText('click anywhere to place a probe', W / 2, 32);

            switch (scene) {
                case 'c16-domains': {
                    const rows = 7;
                    const cols = 10;
                    const align = a / 100;
                    const thermalNoise = Math.max(0, Math.min(1, c / 120));
                    for (let r = 0; r < rows; r++) {
                        for (let k = 0; k < cols; k++) {
                            const x = 28 + (k / (cols - 1)) * (W - 56);
                            const y = 42 + (r / (rows - 1)) * (H - 88);
                            const jitter = (1 - align + thermalNoise * 0.55) * (Math.sin(t * 7 + r * 3 + k) * 0.8);
                            const len = 10;
                            const dir = align * 0.9 + jitter;
                            ctx.strokeStyle = '#34d399';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x - len * 0.5, y + len * dir * 0.2);
                            ctx.lineTo(x + len * 0.5, y - len * dir * 0.2);
                            ctx.stroke();
                        }
                    }
                    ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
                    ctx.lineWidth = 1;
                    for (let i = 0; i < 6; i++) {
                        const yy = 36 + i * ((H - 72) / 5);
                        ctx.beginPath();
                        ctx.moveTo(14, yy + Math.sin(t * 2 + i) * 4);
                        ctx.quadraticCurveTo(W * 0.5, yy - 8, W - 14, yy + Math.cos(t * 2 + i) * 4);
                        ctx.stroke();
                    }
                    ctx.fillStyle = '#a7f3d0';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`alignment ${Math.round(align * 100)}%`, 12, H - 28);
                    ctx.fillText(`thermal noise ${Math.round(thermalNoise * 100)}%`, 12, H - 14);
                    break;
                }
                case 'b16-migration': {
                    const deviation = (100 - a) * 0.35;
                    const baseY = H * 0.5;
                    ctx.strokeStyle = '#334155';
                    ctx.beginPath();
                    ctx.moveTo(20, baseY);
                    ctx.lineTo(W - 20, baseY);
                    ctx.stroke();
                    ctx.strokeStyle = '#fb7185';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let x = 24; x < W - 20; x += 6) {
                        const y = baseY + Math.sin((x / W) * 10 + t * 2) * deviation;
                        if (x === 24) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.fillStyle = '#fcd34d';
                    ctx.beginPath();
                    ctx.arc(32, baseY, 6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#86efac';
                    ctx.beginPath();
                    ctx.arc(W - 28, baseY, 7, 0, Math.PI * 2);
                    ctx.fill();
                    const storm = Math.max(0, Math.min(1, b / 100));
                    const coneX = W * 0.56;
                    const coneW = 80 + storm * 70;
                    ctx.fillStyle = 'rgba(244, 63, 94, 0.16)';
                    ctx.fillRect(coneX - coneW * 0.5, baseY - 90, coneW, 180);
                    ctx.fillStyle = '#fda4af';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`geomagnetic noise ${Math.round(storm * 100)}%`, 12, H - 14);
                    break;
                }
                case 'p17-truss': {
                    const bw = 60 + a * 1.4;
                    const topY = H * 0.32;
                    const botY = H * 0.78;
                    const left = W * 0.5 - bw / 2;
                    const right = W * 0.5 + bw / 2;
                    const loadRatio = Math.max(0, Math.min(1, c / 100));
                    const braceRatio = Math.max(0, Math.min(1, b / 100));
                    const risk = Math.max(0, loadRatio * 0.75 - braceRatio * 0.45 + 0.2);
                    ctx.strokeStyle = risk > 0.55 ? '#ef4444' : '#818cf8';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(left, botY);
                    ctx.lineTo((left + right) / 2, topY);
                    ctx.lineTo(right, botY);
                    ctx.closePath();
                    ctx.stroke();
                    const braceCount = Math.max(1, Math.round(b / 18));
                    ctx.strokeStyle = '#22d3ee';
                    ctx.lineWidth = 2;
                    for (let i = 1; i <= braceCount; i++) {
                        const x = left + (i / (braceCount + 1)) * (right - left);
                        ctx.beginPath();
                        ctx.moveTo(x, botY);
                        ctx.lineTo((left + right) / 2, topY);
                        ctx.stroke();
                    }
                    const topX = (left + right) / 2;
                    const arrows = 2 + Math.round(loadRatio * 4);
                    for (let i = 0; i < arrows; i++) {
                        const ax = topX - 24 + i * 12;
                        drawArrow(ax, topY - 34, ax, topY - 4, '#f59e0b');
                    }
                    drawArrow(left + 10, botY + 22, left + 10, botY + 2, '#22c55e');
                    drawArrow(right - 10, botY + 22, right - 10, botY + 2, '#22c55e');
                    ctx.fillStyle = '#64748b';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`Load ${Math.round(loadRatio * 100)}%`, 12, H - 32);
                    ctx.fillText(`Bracing ${Math.round(braceRatio * 100)}%`, 12, H - 18);
                    ctx.textAlign = 'right';
                    ctx.fillStyle = risk > 0.55 ? '#fca5a5' : '#86efac';
                    ctx.fillText(risk > 0.55 ? 'Buckling Risk: HIGH' : 'Buckling Risk: CONTROLLED', W - 12, H - 18);
                    break;
                }
                case 'c17-material-bars': {
                    const vals = [a, b, c];
                    const labels = ['strength', 'moisture', 'heat'];
                    const colors = ['#34d399', '#22d3ee', '#fb923c'];
                    for (let i = 0; i < 3; i++) {
                        const x = 34 + i * ((W - 68) / 3);
                        const h = (vals[i] / 100) * (H - 120);
                        const y = H - 50 - h;
                        ctx.fillStyle = '#1e293b';
                        ctx.fillRect(x, 40, 44, H - 90);
                        ctx.fillStyle = colors[i];
                        ctx.fillRect(x, y, 44, h);
                        if (i === 0 && vals[0] < 45) {
                            ctx.strokeStyle = '#f87171';
                            ctx.lineWidth = 1.5;
                            for (let k = 0; k < 4; k++) {
                                ctx.beginPath();
                                ctx.moveTo(x + 4 + k * 10, y + 6);
                                ctx.lineTo(x + 1 + k * 10, y + 16);
                                ctx.stroke();
                            }
                        }
                        ctx.fillStyle = '#64748b';
                        ctx.font = '10px monospace';
                        ctx.fillText(labels[i], x + 22, H - 32);
                    }
                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText('durability balance', 12, H - 14);
                    break;
                }
                case 'b17-bone': {
                    const thickness = 8 + (a / 100) * 14;
                    ctx.strokeStyle = '#fda4af';
                    ctx.lineWidth = thickness;
                    ctx.beginPath();
                    ctx.moveTo(W * 0.3, H * 0.25);
                    ctx.quadraticCurveTo(W * 0.5, H * 0.5, W * 0.7, H * 0.75);
                    ctx.stroke();
                    ctx.strokeStyle = '#64748b';
                    ctx.lineWidth = 2;
                    for (let i = 0; i < 9; i++) {
                        const px = W * 0.32 + i * ((W * 0.36) / 8);
                        const py = H * 0.3 + Math.sin(i + t * 2) * 9;
                        ctx.beginPath();
                        ctx.moveTo(px - 8, py - 8);
                        ctx.lineTo(px + 8, py + 8);
                        ctx.stroke();
                    }
                    const ageFactor = Math.max(0, Math.min(1, c / 100));
                    const crackCount = Math.round(ageFactor * 6);
                    ctx.strokeStyle = 'rgba(248, 113, 113, 0.65)';
                    ctx.lineWidth = 1.3;
                    for (let i = 0; i < crackCount; i++) {
                        const x = W * (0.4 + i * 0.045);
                        const y = H * (0.44 + (i % 2) * 0.06);
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + 8, y + 5);
                        ctx.lineTo(x + 4, y + 10);
                        ctx.stroke();
                    }
                    ctx.fillStyle = '#fecdd3';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`microfracture risk ${Math.round(ageFactor * 100)}%`, 12, H - 14);
                    break;
                }
                case 'p18-river-cut': {
                    const curve = (b / 100) * 0.8;
                    const depth = 20 + (a / 100) * 60;
                    const sediment = Math.max(0, Math.min(100, c));
                    const erosionIndex = Math.max(0, Math.min(100, a * 0.55 + b * 0.35 - sediment * 0.2));
                    ctx.fillStyle = '#14532d';
                    ctx.fillRect(0, 40, W, H - 40);
                    ctx.strokeStyle = '#22d3ee';
                    ctx.lineWidth = 7;
                    const pathPoints: Array<{ x: number; y: number }> = [];
                    ctx.beginPath();
                    for (let x = 0; x <= W; x += 6) {
                        const y = H * 0.5 + Math.sin((x / W) * 8 + t * 1.5) * (12 + curve * 22);
                        pathPoints.push({ x, y });
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    for (let i = 1; i < pathPoints.length - 1; i += 8) {
                        const prev = pathPoints[i - 1];
                        const curr = pathPoints[i];
                        const next = pathPoints[i + 1];
                        const bend = (next.y - curr.y) - (curr.y - prev.y);
                        if (Math.abs(bend) < 0.18) continue;
                        const outerX = curr.x;
                        const outerY = curr.y + (bend > 0 ? 12 : -12);
                        const innerY = curr.y - (bend > 0 ? 12 : -12);
                        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
                        ctx.beginPath();
                        ctx.arc(outerX, outerY, 4 + erosionIndex * 0.04, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.fillStyle = 'rgba(250, 204, 21, 0.4)';
                        ctx.beginPath();
                        ctx.arc(outerX, innerY, 3 + sediment * 0.03, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.fillStyle = '#fde68a';
                    ctx.fillRect(W * 0.5 - 14, H * 0.5 - depth * 0.5, 28, depth);
                    ctx.fillStyle = '#fca5a5';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`erosion zone (outer bend)`, 12, H - 30);
                    ctx.fillStyle = '#fde68a';
                    ctx.fillText(`deposition zone (inner bend)`, 12, H - 16);

                    if (variant === 'p21-tides') {
                        // P21 teaching overlay: show step labels directly beside arrows.
                        const centerX = W * 0.5;
                        const centerY = H * 0.5;

                        drawArrow(88, 74, centerX - 18, centerY - 22, '#22d3ee');
                        ctx.fillStyle = '#22d3ee';
                        ctx.font = 'bold 10px monospace';
                        ctx.textAlign = 'left';
                        ctx.fillText('Step 1: Moon alignment', 92, 66);

                        drawArrow(86, H - 70, centerX - 18, centerY + 20, '#818cf8');
                        ctx.fillStyle = '#818cf8';
                        ctx.fillText('Step 2: Earth rotation timing', 92, H - 74);

                        drawArrow(centerX + 20, centerY, W - 112, centerY, '#fbbf24');
                        ctx.fillStyle = '#fbbf24';
                        ctx.textAlign = 'right';
                        ctx.fillText('Step 3: Tidal range output', W - 116, centerY - 8);

                        ctx.fillStyle = '#fef08a';
                        ctx.font = 'bold 10px monospace';
                        ctx.textAlign = 'center';
                        ctx.fillText('Step 4: Read yellow tide-range gauge', centerX, 46);
                    }
                    break;
                }
                case 'c18-ion-beaker': {
                    const ions = 8 + Math.round((a / 100) * 26);
                    ctx.strokeStyle = '#94a3b8';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(W * 0.2, H * 0.2, W * 0.6, H * 0.62);
                    const ph = Math.max(0, Math.min(14, c / 10));
                    const tintR = Math.round(70 + Math.max(0, 7 - ph) * 16);
                    const tintB = Math.round(70 + Math.max(0, ph - 7) * 16);
                    ctx.fillStyle = `rgba(${tintR}, 120, ${tintB}, 0.18)`;
                    ctx.fillRect(W * 0.2, H * 0.2, W * 0.6, H * 0.62);
                    for (let i = 0; i < ions; i++) {
                        const x = W * 0.22 + ((i * 29 + t * 70) % (W * 0.56));
                        const y = H * 0.24 + ((i * 53 + t * 40) % (H * 0.54));
                        ctx.fillStyle = i % 2 === 0 ? '#34d399' : '#22d3ee';
                        ctx.beginPath();
                        ctx.arc(x, y, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.strokeStyle = '#cbd5e1';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(W * 0.27, H * 0.24);
                    ctx.lineTo(W * 0.27, H * 0.68);
                    ctx.moveTo(W * 0.73, H * 0.24);
                    ctx.lineTo(W * 0.73, H * 0.68);
                    ctx.stroke();
                    ctx.fillStyle = '#a5f3fc';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`pH ${ph.toFixed(1)} | ions ${ions}`, 12, H - 14);
                    break;
                }
                case 'b18-river-foodweb': {
                    const health = a / 100;
                    const flowStress = Math.max(0, Math.min(1, 1 - b / 100));
                    const nodes = [
                        [W * 0.28, H * 0.7],
                        [W * 0.48, H * 0.58],
                        [W * 0.68, H * 0.46],
                        [W * 0.44, H * 0.35],
                    ];
                    ctx.strokeStyle = '#475569';
                    ctx.lineWidth = 2;
                    for (let i = 0; i < nodes.length - 1; i++) {
                        ctx.strokeStyle = flowStress > 0.45 && i > 1 ? '#fb7185' : '#475569';
                        ctx.beginPath();
                        ctx.moveTo(nodes[i][0], nodes[i][1]);
                        ctx.lineTo(nodes[i + 1][0], nodes[i + 1][1]);
                        ctx.stroke();
                        drawArrow(nodes[i][0], nodes[i][1], nodes[i + 1][0], nodes[i + 1][1], 'rgba(148,163,184,0.75)');
                    }
                    nodes.forEach(([x, y], i) => {
                        ctx.fillStyle = `rgba(251,113,133,${0.35 + health * 0.6 - i * 0.08})`;
                        ctx.beginPath();
                        ctx.arc(x, y, 9 + i * 2, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    ctx.fillStyle = flowStress > 0.45 ? '#fca5a5' : '#86efac';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(flowStress > 0.45 ? 'network stress: high' : 'network stress: low', 12, H - 14);
                    break;
                }
                case 'p19-soil-layers': {
                    const rootSupport = Math.max(0, Math.min(100, a));
                    const moisture = Math.max(0, Math.min(100, b));
                    const compaction = Math.max(0, Math.min(100, c));
                    const organicMatter = Math.max(0, Math.min(100, d));
                    const compRatio = compaction / 100;
                    const moistRatio = moisture / 100;
                    const supportRatio = rootSupport / 100;
                    const organicRatio = organicMatter / 100;

                    const soilTop = 54;
                    const soilBottom = H - 24;
                    const soilLeft = 20;
                    const soilRight = W - 20;
                    const soilW = soilRight - soilLeft;
                    const soilH = soilBottom - soilTop;

                    // Soil body
                    ctx.fillStyle = '#3b2415';
                    ctx.fillRect(soilLeft, soilTop, soilW, soilH);
                    ctx.fillStyle = `rgba(34, 211, 238, ${0.1 + moistRatio * 0.36})`;
                    ctx.fillRect(soilLeft, soilTop + soilH * (1 - moistRatio * 0.8), soilW, soilH * (moistRatio * 0.8));

                    // Organic matter aggregates (amber) become denser and more visible as organic slider rises.
                    const aggregateCount = 18 + Math.round(organicRatio * 42);
                    for (let i = 0; i < aggregateCount; i++) {
                        const x = soilLeft + 10 + ((i * 37 + (t * 20)) % Math.max(1, soilW - 20));
                        const y = soilTop + 12 + ((i * 29 + (t * 10)) % Math.max(1, soilH - 24));
                        const r = 1 + ((i % 3) + organicRatio * 2.8);
                        ctx.fillStyle = `rgba(251, 191, 36, ${0.24 + organicRatio * 0.46})`;
                        ctx.beginPath();
                        ctx.arc(x, y, r, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Exaggerated pore tunnels: large and obvious when compaction is low
                    const tunnelCount = 7;
                    const tunnelRadius = 4 + (1 - compRatio) * 16;
                    for (let i = 0; i < tunnelCount; i++) {
                        const tx = soilLeft + ((i + 1) / (tunnelCount + 1)) * soilW;
                        ctx.strokeStyle = 'rgba(125, 211, 252, 0.8)';
                        ctx.lineWidth = 1.6;
                        ctx.beginPath();
                        for (let y = soilTop + 8; y < soilBottom - 6; y += 10) {
                            const phase = i * 0.7 + y * 0.025 + t * 1.6;
                            const x = tx + Math.sin(phase) * (4 + (1 - compRatio) * 12);
                            if (y === soilTop + 8) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.stroke();

                        // Tunnel openings / pores
                        for (let y = soilTop + 16; y < soilBottom - 10; y += 24) {
                            const px = tx + Math.sin(i + y * 0.05 + t) * 6;
                            ctx.fillStyle = `rgba(191, 219, 254, ${0.25 + (1 - compRatio) * 0.45})`;
                            ctx.beginPath();
                            ctx.arc(px, y, tunnelRadius * (0.55 + ((y % 48) / 96)), 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    // Root growth exaggerated by support score
                    const rootDepth = soilTop + 18 + supportRatio * (soilH - 30);
                    const rootThickness = 1.4 + supportRatio * 3.2;
                    const rootBranches = 4 + Math.round(supportRatio * 8);
                    const crownY = soilTop + 8;
                    ctx.strokeStyle = '#86efac';
                    ctx.lineWidth = rootThickness;
                    for (let i = 0; i < rootBranches; i++) {
                        const rx = soilLeft + 28 + (i / Math.max(1, rootBranches - 1)) * (soilW - 56);
                        const sway = Math.sin(t * 2.6 + i) * (3 + supportRatio * 5);
                        ctx.beginPath();
                        ctx.moveTo(rx, crownY);
                        ctx.bezierCurveTo(
                            rx - 10 + sway,
                            soilTop + soilH * 0.33,
                            rx + 8 - sway,
                            soilTop + soilH * 0.66,
                            rx + Math.sin(i * 1.4 + t) * 8,
                            rootDepth
                        );
                        ctx.stroke();
                    }

                    // Compaction cap layer (red) made more obvious
                    ctx.fillStyle = `rgba(244, 63, 94, ${0.16 + compRatio * 0.5})`;
                    ctx.fillRect(soilLeft, soilTop, soilW, 10 + compRatio * 14);

                    // Strong readouts inside the scene
                    ctx.fillStyle = '#1e293b';
                    ctx.font = 'bold 14px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`ROOT SUPPORT: ${Math.round(rootSupport)}%`, 24, 48);
                    ctx.font = '10px monospace';
                    ctx.fillStyle = '#22d3ee';
                    ctx.fillText(`pore tunnel width ${Math.round((1 - compRatio) * 100)}%`, 24, H - 28);
                    ctx.fillStyle = '#86efac';
                    ctx.fillText(`root growth depth ${Math.round(((rootDepth - soilTop) / soilH) * 100)}%`, 24, H - 15);
                    ctx.fillStyle = '#fbbf24';
                    ctx.fillText(`organic aggregates ${Math.round(organicMatter)}%`, W - 220, H - 15);
                    break;
                }
                case 'c19-ph-flask': {
                    const support = Math.max(0, Math.min(1, a / 100));
                    const sal = Math.max(0, Math.min(1, b / 100));
                    const nitrogen = Math.max(0, Math.min(1, c / 100));
                    const phNorm = Math.max(0, Math.min(1, (d - 4.5) / 4));
                    const phDistance = Math.abs(phNorm - 0.575);
                    const stress = Math.max(0, Math.min(1, sal * 0.75 + (1 - support) * 0.45));

                    const colorR = Math.round(70 + stress * 170 + (1 - nitrogen) * 35 + phDistance * 100);
                    const colorG = Math.round(60 + support * 185 - sal * 70 - phDistance * 70);
                    const colorB = Math.round(120 + nitrogen * 90 - stress * 40 + (1 - phDistance) * 35);
                    ctx.strokeStyle = '#cbd5e1';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(W * 0.38, H * 0.2);
                    ctx.lineTo(W * 0.62, H * 0.2);
                    ctx.lineTo(W * 0.68, H * 0.75);
                    ctx.lineTo(W * 0.32, H * 0.75);
                    ctx.closePath();
                    ctx.stroke();
                    const fluidTop = H * (0.74 - support * 0.56);
                    ctx.fillStyle = `rgba(${colorR},${colorG},${colorB},0.95)`;
                    ctx.fillRect(W * 0.34, fluidTop, W * 0.32, H * (0.75 - (0.74 - support * 0.56)));

                    const waveAmp = 3 + stress * 10 + phDistance * 8;
                    ctx.strokeStyle = `rgba(186, 230, 253, ${0.45 + support * 0.3})`;
                    ctx.lineWidth = 2;
                    for (let wv = 0; wv < 3; wv++) {
                        const waveY = fluidTop + 12 + wv * 10;
                        ctx.beginPath();
                        for (let x = W * 0.34; x <= W * 0.66; x += 6) {
                            const y = waveY + Math.sin((x * 0.04) + t * 3 + wv) * waveAmp;
                            if (x === W * 0.34) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                    }

                    // Exaggerated chemistry pulses and stress bubbles
                    const pulseCount = 12 + Math.round(nitrogen * 12);
                    for (let i = 0; i < pulseCount; i++) {
                        const px = W * 0.35 + ((i * 27 + t * 95) % (W * 0.29));
                        const py = fluidTop + ((i * 41 + t * 60) % Math.max(20, H * 0.74 - fluidTop));
                        const r = 3 + support * 5 + (i % 3);
                        ctx.fillStyle = `rgba(52, 211, 153, ${0.35 + support * 0.55})`;
                        ctx.beginPath();
                        ctx.arc(px, py, r, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    const stressClouds = 3 + Math.round(stress * 10 + phDistance * 4);
                    for (let i = 0; i < stressClouds; i++) {
                        const sx = W * 0.36 + (i / Math.max(1, stressClouds - 1)) * (W * 0.28);
                        const sy = fluidTop + 14 + Math.sin(t * 2 + i) * 6;
                        ctx.fillStyle = `rgba(248, 113, 113, ${0.22 + stress * 0.42 + phDistance * 0.2})`;
                        ctx.beginPath();
                        ctx.arc(sx, sy, 8 + stress * 8 + phDistance * 4, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    const scaleX = W * 0.74;
                    const scaleTop = H * 0.26;
                    const scaleH = H * 0.46;
                    const grad = ctx.createLinearGradient(0, scaleTop, 0, scaleTop + scaleH);
                    grad.addColorStop(0, '#ef4444');
                    grad.addColorStop(0.5, '#22c55e');
                    grad.addColorStop(1, '#3b82f6');
                    ctx.fillStyle = grad;
                    ctx.fillRect(scaleX, scaleTop, 10, scaleH);
                    const markerY = scaleTop + (1 - phNorm) * scaleH;
                    ctx.strokeStyle = '#e2e8f0';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(scaleX - 6, markerY);
                    ctx.lineTo(scaleX + 16, markerY);
                    ctx.stroke();
                    ctx.fillStyle = '#64748b';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText('acid', scaleX + 16, scaleTop + 8);
                    ctx.fillText('base', scaleX + 16, scaleTop + scaleH);
                    ctx.fillStyle = '#67e8f9';
                    ctx.fillText(`pH ${d.toFixed(1)}`, scaleX - 10, markerY - 6);

                    // Large top-line readout for visibility
                    ctx.fillStyle = '#1e293b';
                    ctx.font = 'bold 14px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`NUTRIENT SUPPORT: ${Math.round(support * 100)}%`, 12, 48);
                    ctx.font = '10px monospace';
                    ctx.fillStyle = '#fca5a5';
                    ctx.fillText(`chemistry stress ${Math.round(stress * 100)}%`, 12, H - 16);
                    break;
                }
                case 'b19-soil-web': {
                    const web = Math.max(0, Math.min(1, a / 100));
                    const toxic = Math.max(0, Math.min(1, b / 100));
                    const organic = Math.max(0, Math.min(1, c / 100));
                    const moisture = Math.max(0, Math.min(1, d / 100));
                    const cx = W * 0.5;
                    const cy = H * 0.54;
                    const ringCount = 4 + Math.round(web * 4);
                    for (let r = 1; r <= ringCount; r++) {
                        ctx.strokeStyle = `rgba(250,204,21,${0.18 + web * 0.58 - toxic * 0.32 + moisture * 0.12})`;
                        ctx.lineWidth = 1 + moisture * 1.2;
                        ctx.beginPath();
                        ctx.arc(cx, cy, r * (15 + web * 9), 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    const spokes = 8 + Math.round(organic * 6);
                    for (let k = 0; k < spokes; k++) {
                        const ang = (k / spokes) * Math.PI * 2;
                        ctx.strokeStyle = `rgba(245,158,11,${0.32 + organic * 0.5 - toxic * 0.2 + moisture * 0.1})`;
                        ctx.lineWidth = 1.5 + web * 1.4;
                        ctx.beginPath();
                        ctx.moveTo(cx, cy);
                        ctx.lineTo(cx + Math.cos(ang) * (85 + web * 34), cy + Math.sin(ang) * (85 + web * 34));
                        ctx.stroke();
                        const nx = cx + Math.cos(ang) * (85 + web * 34);
                        const ny = cy + Math.sin(ang) * (85 + web * 34);
                        ctx.fillStyle = `rgba(253, 224, 71, ${0.28 + organic * 0.5 - toxic * 0.28})`;
                        ctx.beginPath();
                        ctx.arc(nx, ny, 3 + web * 3, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Exaggerated organism nodes (more with organic input, fewer with toxic stress)
                    const organisms = 10 + Math.round(organic * 10 - toxic * 5);
                    for (let i = 0; i < Math.max(2, organisms); i++) {
                        const ang = (i / Math.max(2, organisms)) * Math.PI * 2 + t * 0.5;
                        const rad = 28 + (i % 4) * 18 + web * 20;
                        const ox = cx + Math.cos(ang) * rad;
                        const oy = cy + Math.sin(ang) * rad;
                        ctx.fillStyle = `rgba(254,240,138,${0.24 + organic * 0.46 - toxic * 0.24})`;
                        ctx.beginPath();
                        ctx.arc(ox, oy, 2 + organic * 4, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Moisture glow pulse: strongest near balanced moisture around 55%.
                    const moistureBalance = 1 - Math.min(1, Math.abs(moisture - 0.55) / 0.55);
                    const pulseAlpha = 0.12 + moistureBalance * 0.35;
                    const pulseRadius = 90 + moistureBalance * 60 + Math.sin(t * 2.4) * 8;
                    ctx.fillStyle = `rgba(168, 85, 247, ${pulseAlpha})`;
                    ctx.beginPath();
                    ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
                    ctx.fill();

                    if (toxic > 0.45) {
                        ctx.fillStyle = `rgba(244, 63, 94, ${0.22 + toxic * 0.32})`;
                        ctx.fillRect(cx - 110, cy - 110, 220, 220);
                    }

                    const stability = Math.max(0, Math.min(100, Math.round(a - b * 0.3 + c * 0.2)));
                    ctx.fillStyle = '#1e293b';
                    ctx.font = 'bold 14px monospace';
                    ctx.textAlign = 'left';
                    ctx.fillText(`WEB STABILITY: ${stability}%`, 12, 48);
                    ctx.font = '10px monospace';
                    ctx.fillStyle = toxic > 0.45 ? '#fca5a5' : '#86efac';
                    ctx.fillText(toxic > 0.45 ? 'toxic pressure: high' : 'toxic pressure: manageable', 12, H - 14);
                    ctx.fillStyle = '#c4b5fd';
                    ctx.fillText(`moisture balance ${Math.round(moistureBalance * 100)}%`, 12, H - 28);
                    break;
                }
                case 'p20-lens-bench': {
                    const focal = Math.max(8, a);
                    const obj = Math.max(10, b);
                    const opticType = variant ?? 'convex-lens';
                    const signedFocal = opticType === 'concave-lens' ? -focal : focal;
                    const denom = (1 / signedFocal) - (1 / obj);
                    const rawImage = Math.abs(denom) < 0.0001 ? 999 : 1 / denom;
                    const isMirror = opticType === 'concave-mirror';
                    const imageIsReal = opticType === 'concave-lens' ? false : rawImage > 0;
                    const magnification = -rawImage / obj;
                    const isUpright = opticType === 'concave-lens' ? true : magnification >= 0;
                    const baseY = H * 0.62;
                    const opticX = W * 0.5;
                    const objX = opticX - Math.min(180, obj * 2);
                    const imageOffset = Math.min(180, Math.abs(rawImage) * 1.5);
                    const imgX = isMirror
                        ? opticX - imageOffset
                        : imageIsReal
                            ? opticX + imageOffset
                            : opticX - imageOffset * 0.5;
                    const objectHeight = 68;
                    const imageHeight = Math.max(20, Math.min(100, Math.abs(magnification) * objectHeight));
                    const imageTop = isUpright ? baseY - imageHeight : baseY + imageHeight;

                    ctx.strokeStyle = '#94a3b8';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(20, baseY);
                    ctx.lineTo(W - 20, baseY);
                    ctx.stroke();

                    if (isMirror) {
                        ctx.strokeStyle = '#f59e0b';
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(opticX + 24, baseY - 110);
                        ctx.quadraticCurveTo(opticX - 42, baseY, opticX + 24, baseY + 110);
                        ctx.stroke();
                    } else {
                        ctx.strokeStyle = '#818cf8';
                        ctx.lineWidth = 4;
                        ctx.beginPath();
                        if (opticType === 'convex-lens') {
                            ctx.moveTo(opticX, baseY - 110);
                            ctx.quadraticCurveTo(opticX - 24, baseY, opticX, baseY + 110);
                            ctx.moveTo(opticX, baseY - 110);
                            ctx.quadraticCurveTo(opticX + 24, baseY, opticX, baseY + 110);
                        } else {
                            ctx.moveTo(opticX - 14, baseY - 110);
                            ctx.quadraticCurveTo(opticX + 18, baseY, opticX - 14, baseY + 110);
                            ctx.moveTo(opticX + 14, baseY - 110);
                            ctx.quadraticCurveTo(opticX - 18, baseY, opticX + 14, baseY + 110);
                        }
                        ctx.stroke();
                    }

                    const scale = 2;
                    const fMark = Math.min(90, focal * scale);
                    ctx.strokeStyle = '#64748b';
                    ctx.setLineDash([4, 3]);
                    ctx.beginPath();
                    ctx.moveTo(opticX - fMark, baseY - 22);
                    ctx.lineTo(opticX - fMark, baseY + 22);
                    ctx.moveTo(opticX + fMark, baseY - 22);
                    ctx.lineTo(opticX + fMark, baseY + 22);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.strokeStyle = '#22d3ee';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(objX, baseY);
                    ctx.lineTo(objX, baseY - objectHeight);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(objX, baseY - objectHeight);
                    ctx.lineTo(objX - 9, baseY - objectHeight + 14);
                    ctx.lineTo(objX + 9, baseY - objectHeight + 14);
                    ctx.closePath();
                    ctx.fillStyle = '#22d3ee';
                    ctx.fill();

                    ctx.strokeStyle = imageIsReal ? '#fbbf24' : '#f472b6';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(imgX, baseY);
                    ctx.lineTo(imgX, imageTop);
                    ctx.stroke();
                    ctx.beginPath();
                    if (isUpright) {
                        ctx.moveTo(imgX, imageTop);
                        ctx.lineTo(imgX - 9, imageTop + 14);
                        ctx.lineTo(imgX + 9, imageTop + 14);
                    } else {
                        ctx.moveTo(imgX, imageTop);
                        ctx.lineTo(imgX - 9, imageTop - 14);
                        ctx.lineTo(imgX + 9, imageTop - 14);
                    }
                    ctx.closePath();
                    ctx.fillStyle = imageIsReal ? '#fbbf24' : '#f472b6';
                    ctx.fill();

                    if (isMirror) {
                        ctx.strokeStyle = '#22d3ee';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(objX, baseY - objectHeight);
                        ctx.lineTo(opticX + 2, baseY - objectHeight);
                        ctx.lineTo(imgX, imageTop);
                        ctx.stroke();
                        ctx.strokeStyle = '#f59e0b';
                        ctx.beginPath();
                        ctx.moveTo(objX, baseY - objectHeight);
                        ctx.lineTo(opticX - 6, baseY);
                        ctx.lineTo(imgX, imageTop);
                        ctx.stroke();
                    } else if (opticType === 'convex-lens') {
                        ctx.strokeStyle = '#22d3ee';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(objX, baseY - objectHeight);
                        ctx.lineTo(opticX, baseY - objectHeight);
                        if (imageIsReal) {
                            ctx.lineTo(imgX, imageTop);
                        } else {
                            ctx.lineTo(opticX + 76, baseY - objectHeight);
                        }
                        ctx.stroke();
                        ctx.strokeStyle = '#f59e0b';
                        ctx.beginPath();
                        ctx.moveTo(objX, baseY - objectHeight);
                        ctx.lineTo(opticX, baseY);
                        if (imageIsReal) {
                            ctx.lineTo(imgX, imageTop);
                        } else {
                            ctx.lineTo(opticX + 82, baseY + 24);
                            ctx.stroke();
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = '#f472b6';
                            ctx.beginPath();
                            ctx.moveTo(opticX, baseY);
                            ctx.lineTo(imgX, imageTop);
                        }
                        ctx.stroke();
                        ctx.setLineDash([]);
                    } else {
                        ctx.strokeStyle = '#22d3ee';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(objX, baseY - objectHeight);
                        ctx.lineTo(opticX, baseY - objectHeight + 6);
                        ctx.lineTo(opticX + 72, baseY - objectHeight - 22);
                        ctx.stroke();
                        ctx.setLineDash([4, 4]);
                        ctx.strokeStyle = '#f472b6';
                        ctx.beginPath();
                        ctx.moveTo(opticX, baseY - objectHeight + 6);
                        ctx.lineTo(imgX, imageTop);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.strokeStyle = '#f59e0b';
                        ctx.beginPath();
                        ctx.moveTo(objX, baseY - objectHeight);
                        ctx.lineTo(opticX, baseY);
                        ctx.lineTo(opticX + 82, baseY + 24);
                        ctx.stroke();
                    }

                    ctx.strokeStyle = '#22d3ee';
                    ctx.fillStyle = '#475569';
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText('F', opticX - fMark, baseY + 28);
                    ctx.fillText('F', opticX + fMark, baseY + 28);
                    ctx.fillStyle = '#94a3b8';
                    ctx.fillText('object', objX, baseY - objectHeight - 18);
                    ctx.fillStyle = imageIsReal ? '#fbbf24' : '#f472b6';
                    ctx.fillText(imageIsReal ? 'real image' : 'virtual image', imgX, isUpright ? baseY - imageHeight - 12 : baseY + imageHeight + 20);
                    ctx.textAlign = 'left';
                    ctx.fillStyle = '#1e293b';
                    ctx.font = 'bold 13px monospace';
                    ctx.fillText(`${opticType.replace('-', ' ')} | ${isUpright ? 'upright' : 'inverted'}`, 12, 48);
                    ctx.font = '10px monospace';
                    ctx.fillStyle = '#64748b';
                    ctx.fillText(`focal ${focal} cm`, 12, H - 28);
                    ctx.fillText(`object ${obj} cm | image ${Math.abs(rawImage) > 900 ? 'far' : `${Math.abs(rawImage).toFixed(1)} cm`}`, 12, H - 14);
                    break;
                }
                default:
                    break;
            }

            if (probe) {
                const localSignal = Math.max(0, Math.min(100,
                    Math.round(a * 0.55 + b * 0.25 + c * 0.1 + (probe.x / W) * 8 - (probe.y / H) * 8)
                ));
                const domainMetric = Math.max(0, Math.min(100,
                    Math.round(c * 0.7 + (probe.x / W) * 20 - (probe.y / H) * 14)
                ));
                ctx.strokeStyle = '#f8fafc';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(probe.x - 8, probe.y);
                ctx.lineTo(probe.x + 8, probe.y);
                ctx.moveTo(probe.x, probe.y - 8);
                ctx.lineTo(probe.x, probe.y + 8);
                ctx.stroke();
                ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
                ctx.fillRect(probe.x + 10, probe.y - 28, 152, 40);
                ctx.strokeStyle = '#475569';
                ctx.strokeRect(probe.x + 10, probe.y - 28, 152, 40);
                ctx.fillStyle = '#475569';
                ctx.font = '10px monospace';
                ctx.textAlign = 'left';
                ctx.fillText(`x:${Math.round((probe.x / W) * 100)} y:${Math.round((probe.y / H) * 100)}`, probe.x + 14, probe.y - 16);
                ctx.fillText(`local signal:${localSignal}%`, probe.x + 14, probe.y - 3);
                ctx.fillText(
                    `${probeMetricLabel ?? 'local metric'}:${domainMetric}${probeMetricUnit}`,
                    probe.x + 14,
                    probe.y + 10
                );
            }

            frameRef.current = requestAnimationFrame(render);
        };

        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameRef.current);
    }, [scene, title, a, b, c, d, variant, probeMetricLabel, probeMetricUnit]);

    return (
        <div ref={containerRef} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProbe({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
            />
        </div>
    );
};
