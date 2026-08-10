import { useRef, useEffect, useCallback } from 'react';

interface B7NerveLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B7NerveLab = ({ state }: B7NerveLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const correct = (state.correct as boolean) ?? false;

    // ── Drawing helpers ──────────────────────────────────────────

    const drawLabel = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = 'rgba(255,255,255,0.85)', size = 10) => {
        ctx.fillStyle = color;
        ctx.font = `bold ${size + 4}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    };

    const drawBodyBackground = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#1e1b4b');
        grad.addColorStop(0.5, '#312e81');
        grad.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
    };

    const drawIon = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, label: string, color: string) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.max(10, r)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
    };

    const drawNeurotransmitter = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#f472b6';
        ctx.fill();
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    };

    // ── Neuron drawing (reusable) ────────────────────────────────

    const drawNeuron = (
        ctx: CanvasRenderingContext2D,
        startX: number, cy: number, length: number, scale: number,
        t: number, showLabels: boolean, pulseProgress?: number, showMyelin?: boolean
    ) => {
        const bodyR = 18 * scale;
        const axonLen = length - bodyR * 2 - 30 * scale;

        // Dendrites (left side)
        const dendCount = 5;
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2 * scale;
        for (let i = 0; i < dendCount; i++) {
            const angle = -0.6 + (i / (dendCount - 1)) * 1.2;
            const dLen = (25 + Math.sin(t * 0.5 + i) * 3) * scale;
            const dx = startX - Math.cos(angle) * dLen;
            const dy = cy - Math.sin(angle) * dLen;
            ctx.beginPath();
            ctx.moveTo(startX, cy);
            ctx.lineTo(dx, dy);
            ctx.stroke();
            // Branch tips
            const bLen = 10 * scale;
            ctx.beginPath();
            ctx.moveTo(dx, dy);
            ctx.lineTo(dx - Math.cos(angle + 0.4) * bLen, dy - Math.sin(angle + 0.4) * bLen);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(dx, dy);
            ctx.lineTo(dx - Math.cos(angle - 0.3) * bLen, dy - Math.sin(angle - 0.3) * bLen);
            ctx.stroke();
        }

        // Cell body
        ctx.beginPath();
        ctx.arc(startX + bodyR, cy, bodyR, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2 * scale;
        ctx.stroke();

        // Nucleus
        ctx.beginPath();
        ctx.arc(startX + bodyR, cy, bodyR * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#c4b5fd';
        ctx.fill();

        // Axon line
        const axonStartX = startX + bodyR * 2;
        const axonEndX = axonStartX + axonLen;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4 * scale;
        ctx.beginPath();
        ctx.moveTo(axonStartX, cy);
        ctx.lineTo(axonEndX, cy);
        ctx.stroke();

        // Myelin sheath (sausage segments)
        if (showMyelin !== false) {
            const segCount = 5;
            const segLen = axonLen / (segCount * 2 - 1);
            for (let i = 0; i < segCount; i++) {
                const sx = axonStartX + i * segLen * 2;
                const segW = segLen * 0.9;
                ctx.fillStyle = 'rgba(250,204,21,0.35)';
                ctx.beginPath();
                ctx.ellipse(sx + segW / 2, cy, segW / 2, 10 * scale, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(250,204,21,0.6)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        // Action potential pulse
        if (pulseProgress !== undefined && pulseProgress >= 0 && pulseProgress <= 1) {
            const pulseX = axonStartX + pulseProgress * axonLen;
            const pulseR = 10 * scale;

            ctx.save();
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.arc(pulseX, cy, pulseR, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(250,204,21,0.9)';
            ctx.fill();
            ctx.restore();

            // Glow ring
            ctx.beginPath();
            ctx.arc(pulseX, cy, pulseR + 5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(250,204,21,0.3)';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        // Axon terminal (end bulb)
        const termX = axonEndX + 8 * scale;
        ctx.beginPath();
        ctx.arc(termX, cy, 8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Labels
        if (showLabels) {
            drawLabel(ctx, 'Dendrites', startX - 20 * scale, cy - 32 * scale, '#c4b5fd', 9 * scale);
            drawLabel(ctx, 'Cell Body', startX + bodyR, cy + bodyR + 14 * scale, '#c4b5fd', 9 * scale);
            drawLabel(ctx, 'Axon', axonStartX + axonLen / 2, cy - 18 * scale, '#818cf8', 9 * scale);
            if (showMyelin !== false) {
                drawLabel(ctx, 'Myelin Sheath', axonStartX + axonLen / 2, cy + 22 * scale, '#fde047', 8 * scale);
            }
            drawLabel(ctx, 'Terminal', termX, cy + 18 * scale, '#fca5a5', 8 * scale);
        }
    };

    // ── Hand & arm drawing ───────────────────────────────────────

    const drawHand = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, hot: boolean, t: number) => {
        // Arm
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x - size * 0.15, y, size * 0.3, size * 0.7);

        // Palm
        ctx.beginPath();
        ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#d4a574';
        ctx.fill();

        // Fingers
        for (let i = 0; i < 4; i++) {
            const angle = -0.5 + i * 0.33;
            const fx = x + Math.sin(angle) * size * 0.25;
            const fy = y - size * 0.3 - (i === 1 || i === 2 ? size * 0.25 : size * 0.18);
            ctx.fillStyle = '#d4a574';
            ctx.beginPath();
            ctx.ellipse(fx, fy, size * 0.06, size * 0.14, angle, 0, Math.PI * 2);
            ctx.fill();
        }

        // Pain indicator
        if (hot) {
            ctx.save();
            ctx.globalAlpha = 0.5 + Math.sin(t * 8) * 0.3;
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y - size * 0.3, size * 0.45, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // "OUCH!" text
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold ${size * 0.3}px monospace`;
            ctx.textAlign = 'center';
            ctx.fillText('OUCH!', x + size * 0.5, y - size * 0.4 + Math.sin(t * 6) * 3);
        }
    };

    const drawPan = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, t: number) => {
        // Pan body
        ctx.fillStyle = '#374151';
        ctx.beginPath();
        ctx.ellipse(x, y, size * 0.5, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Handle
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(x + size * 0.45, y - 5, size * 0.4, 10);

        // Heat waves
        ctx.strokeStyle = 'rgba(239,68,68,0.4)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 4; i++) {
            const wx = x - size * 0.3 + i * size * 0.2;
            ctx.beginPath();
            for (let j = 0; j < 3; j++) {
                const wy = y - size * 0.2 - j * 12 - ((t * 25 + i * 15) % 40);
                const wOff = Math.sin(t * 3 + i + j) * 5;
                if (j === 0) ctx.moveTo(wx + wOff, wy);
                else ctx.lineTo(wx + wOff, wy);
            }
            ctx.stroke();
        }
    };

    // ── Phase renderers ──────────────────────────────────────────

    const drawIntro = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        // Animated spark particles
        for (let i = 0; i < 12; i++) {
            const sx = (i * 73 + t * 30) % W;
            const sy = (i * 57 + Math.sin(t + i) * 40) % H;
            ctx.save();
            ctx.globalAlpha = 0.3 + Math.sin(t * 2 + i) * 0.2;
            ctx.fillStyle = '#fde047';
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Hand and pan
        drawPan(ctx, W * 0.5, H * 0.55, 80, t);
        drawHand(ctx, W * 0.38, H * 0.4, 60, false, t);

        // Brain icon (simple)
        ctx.fillStyle = '#f472b6';
        ctx.font = '32px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧠', W * 0.5, H * 0.2);

        // Dotted line finger → brain
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = 'rgba(250,204,21,0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W * 0.38, H * 0.35);
        ctx.quadraticCurveTo(W * 0.3, H * 0.25, W * 0.5, H * 0.23);
        ctx.stroke();
        ctx.setLineDash([]);

        // Title
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ The Lightning Reflex', W / 2, 26);
        ctx.font = '18px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillText('How does your brain know you touched something hot?', W / 2, 44);
    };

    const drawTouchHot = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        drawPan(ctx, W * 0.55, H * 0.65, 70, t);
        drawHand(ctx, W * 0.42, H * 0.52, 55, true, t);

        // Brain
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧠', W * 0.5, H * 0.12);

        // Animated signal path: finger → brain
        const signalProgress = (t * 0.6) % 2; // 0-1 up, 1-2 back

        // Nerve path points (finger → arm → brain)
        const pathUp = [
            { x: W * 0.42, y: H * 0.45 },
            { x: W * 0.35, y: H * 0.35 },
            { x: W * 0.32, y: H * 0.25 },
            { x: W * 0.4, y: H * 0.15 },
            { x: W * 0.5, y: H * 0.12 },
        ];

        // Draw nerve pathway
        ctx.strokeStyle = 'rgba(139,92,246,0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        pathUp.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();

        // Animated pulse on the path
        const prog = signalProgress <= 1 ? signalProgress : 2 - signalProgress;
        const segIdx = Math.min(Math.floor(prog * (pathUp.length - 1)), pathUp.length - 2);
        const segProg = (prog * (pathUp.length - 1)) - segIdx;
        const px = pathUp[segIdx].x + (pathUp[segIdx + 1].x - pathUp[segIdx].x) * segProg;
        const py = pathUp[segIdx].y + (pathUp[segIdx + 1].y - pathUp[segIdx].y) * segProg;

        ctx.save();
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 15;
        ctx.fillStyle = signalProgress <= 1 ? '#facc15' : '#34d399';
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Direction label
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        if (signalProgress <= 1) {
            ctx.fillText('⬆ Pain signal → Brain', W * 0.5, H * 0.08);
        } else {
            ctx.fillText('⬇ "PULL AWAY!" → Muscles', W * 0.5, H * 0.08);
        }

        // Speed comparison (if showing)
        if (state.showSpeed) {
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(W * 0.05, H * 0.78, W * 0.9, H * 0.18);
            ctx.fillStyle = '#facc15';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('⚡ Copper wire:  ~300,000,000 m/s', W * 0.1, H * 0.85);
            ctx.fillStyle = '#a78bfa';
            ctx.fillText('🧠 Nerve signal: ~100 m/s', W * 0.1, H * 0.93);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '16px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('3 million × slower!', W * 0.9, H * 0.89);
        }

        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔥 Ouch! Signal Racing to Brain', W / 2, 26);
    };

    const drawNeuronAnatomy = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔬 Neuron Anatomy', W / 2, 24);

        // Draw a large centered neuron
        const scale = Math.min(W / 350, H / 200, 1.4);
        const neuronStartX = W * 0.12;
        const neuronLen = W * 0.78;
        drawNeuron(ctx, neuronStartX, H * 0.45, neuronLen, scale, t, true, undefined, true);

        // Synapse gap hint
        const termX = neuronStartX + neuronLen + 8 * scale;
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(239,68,68,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(termX + 10 * scale, H * 0.45 - 15 * scale);
        ctx.lineTo(termX + 10 * scale, H * 0.45 + 15 * scale);
        ctx.stroke();
        ctx.setLineDash([]);
        drawLabel(ctx, 'Synapse gap →', termX + 10 * scale, H * 0.45 + 26 * scale, '#fca5a5', 8 * scale);

        // Bottom explanation
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Signal flows: Dendrites → Cell Body → Axon → Terminal → Synapse → Next Neuron', W / 2, H - 16);
    };

    const drawActionPotential = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ Action Potential', W / 2, 24);

        // Draw neuron with traveling pulse
        const scale = Math.min(W / 350, H / 180, 1.3);
        const neuronStartX = W * 0.1;
        const neuronLen = W * 0.75;
        const pulseP = (t * 0.35) % 1;
        drawNeuron(ctx, neuronStartX, H * 0.38, neuronLen, scale, t, false, pulseP, true);

        // Ion channel detail below the axon
        const detailY = H * 0.62;
        const axonStartX = neuronStartX + 36 * scale;
        const axonLen = neuronLen - 36 * scale * 2;
        const channelX = axonStartX + pulseP * axonLen;

        // Zoom window showing ion channels
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fillRect(W * 0.08, detailY - 10, W * 0.84, H - detailY);
        ctx.strokeStyle = 'rgba(250,204,21,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(W * 0.08, detailY - 10, W * 0.84, H - detailY);

        // Connector line from pulse to detail
        ctx.strokeStyle = 'rgba(250,204,21,0.3)';
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(channelX, H * 0.38 + 14 * scale);
        ctx.lineTo(W / 2, detailY - 10);
        ctx.stroke();
        ctx.setLineDash([]);

        // Membrane line
        const memY = detailY + (H - detailY) * 0.45;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(W * 0.12, memY);
        ctx.lineTo(W * 0.88, memY);
        ctx.stroke();

        drawLabel(ctx, 'Outside cell', W / 2, detailY + 8, 'rgba(255,255,255,0.5)', 9);
        drawLabel(ctx, 'Axon membrane', W / 2, memY - 10, '#818cf8', 9);
        drawLabel(ctx, 'Inside cell', W / 2, memY + 20, 'rgba(255,255,255,0.5)', 9);

        // Ion channels (gate shapes)
        const gateCount = 5;
        const gateSpacing = (W * 0.72) / gateCount;
        for (let i = 0; i < gateCount; i++) {
            const gx = W * 0.15 + i * gateSpacing;
            const isOpen = Math.abs(gx - W / 2) < gateSpacing * 0.8;

            // Gate
            ctx.fillStyle = isOpen ? 'rgba(34,197,94,0.6)' : 'rgba(100,100,100,0.4)';
            ctx.fillRect(gx - 4, memY - 8, 8, 16);

            if (isOpen) {
                // Na+ flowing in (top → bottom)
                for (let j = 0; j < 2; j++) {
                    const iy = memY - 25 - j * 18 + Math.sin(t * 3 + i + j) * 4;
                    drawIon(ctx, gx + (j - 0.5) * 10, iy, 7, 'Na⁺', 'rgba(34,197,94,0.8)');
                }
                // Arrow down
                ctx.fillStyle = '#22c55e';
                ctx.beginPath();
                ctx.moveTo(gx, memY - 12);
                ctx.lineTo(gx - 4, memY - 18);
                ctx.lineTo(gx + 4, memY - 18);
                ctx.closePath();
                ctx.fill();

                // K+ flowing out (bottom → top) slightly offset
                if (i > 1) {
                    const ky = memY + 20 + Math.sin(t * 2.5 + i) * 4;
                    drawIon(ctx, gx + 14, ky, 7, 'K⁺', 'rgba(239,68,68,0.8)');
                    // Arrow up
                    ctx.fillStyle = '#ef4444';
                    ctx.beginPath();
                    ctx.moveTo(gx + 14, memY + 12);
                    ctx.lineTo(gx + 10, memY + 18);
                    ctx.lineTo(gx + 18, memY + 18);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }

        // Legend
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.font = '16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('🟢 Na⁺ rushes IN → creates pulse', W * 0.12, H - 22);
        ctx.fillText('🔴 K⁺ rushes OUT → resets cell', W * 0.12, H - 10);
        ctx.textAlign = 'right';
        ctx.fillText('Like dominos of ion gates opening!', W * 0.88, H - 16);
    };

    const drawSignalSpeed = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🏎️ Myelin = Speed Boost!', W / 2, 24);

        const halfH = H / 2;

        // Top: WITHOUT myelin (slow)
        ctx.fillStyle = 'rgba(239,68,68,0.1)';
        ctx.fillRect(0, 44, W, halfH - 54);

        drawLabel(ctx, '❌ Without Myelin — Slow', W / 2, 56, '#fca5a5', 10);

        // Bare axon
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(W * 0.08, halfH * 0.55);
        ctx.lineTo(W * 0.92, halfH * 0.55);
        ctx.stroke();

        // Many ion gates (all active, slow crawl)
        const gateCount = 12;
        for (let i = 0; i < gateCount; i++) {
            const gx = W * 0.08 + i * (W * 0.84 / gateCount);
            ctx.fillStyle = 'rgba(100,100,100,0.5)';
            ctx.fillRect(gx - 2, halfH * 0.55 - 5, 4, 10);
        }

        // Slow pulse
        const slowP = (t * 0.15) % 1;
        const slowX = W * 0.08 + slowP * W * 0.84;
        ctx.save();
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(slowX, halfH * 0.55, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        drawLabel(ctx, '~10 m/s', W * 0.5, halfH * 0.55 + 18, 'rgba(255,255,255,0.5)', 9);

        //  Divider
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W * 0.05, halfH);
        ctx.lineTo(W * 0.95, halfH);
        ctx.stroke();

        // Bottom: WITH myelin (fast, jumping)
        ctx.fillStyle = 'rgba(34,197,94,0.08)';
        ctx.fillRect(0, halfH + 4, W, halfH - 14);

        drawLabel(ctx, '✅ With Myelin — Fast (Jumping!)', W / 2, halfH + 18, '#86efac', 10);

        // Axon with myelin segments
        const myelinY = halfH + halfH * 0.45;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(W * 0.08, myelinY);
        ctx.lineTo(W * 0.92, myelinY);
        ctx.stroke();

        const segCount = 5;
        const totalLen = W * 0.84;
        const segLen = totalLen / (segCount * 2 - 1);
        for (let i = 0; i < segCount; i++) {
            const sx = W * 0.08 + i * segLen * 2;
            ctx.fillStyle = 'rgba(250,204,21,0.3)';
            ctx.beginPath();
            ctx.ellipse(sx + segLen * 0.45, myelinY, segLen * 0.45, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(250,204,21,0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Node of Ranvier (gap) label
            if (i < segCount - 1) {
                const nodeX = sx + segLen;
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fillRect(nodeX - 1, myelinY - 6, 2, 12);
            }
        }

        // Fast pulse — jumps between nodes
        const fastP = (t * 0.4) % 1;
        const nodePositions: number[] = [];
        for (let i = 0; i < segCount; i++) {
            nodePositions.push(W * 0.08 + i * segLen * 2 + segLen);
        }
        nodePositions.push(W * 0.92);

        const nodeIdx = Math.min(Math.floor(fastP * nodePositions.length), nodePositions.length - 1);
        const fastX = nodePositions[nodeIdx];

        ctx.save();
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(fastX, myelinY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        drawLabel(ctx, '~100 m/s (10× faster!)', W * 0.5, myelinY + 22, 'rgba(255,255,255,0.5)', 9);
        drawLabel(ctx, 'Signal JUMPS between gaps (Nodes of Ranvier)', W / 2, H - 14, 'rgba(255,255,255,0.45)', 9);
    };

    const drawSynapse = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🔴 The Synapse', W / 2, 24);

        const cy = H * 0.48;
        const gapX = W * 0.5;
        const gapW = 50;

        // ── Pre-synaptic neuron (left side) ──
        // Axon end
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(W * 0.05, cy);
        ctx.lineTo(gapX - gapW / 2, cy);
        ctx.stroke();

        // Terminal bulb
        const bulbR = 20;
        ctx.beginPath();
        ctx.arc(gapX - gapW / 2, cy, bulbR, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Vesicles (neurotransmitter bubbles) inside bulb
        for (let i = 0; i < 5; i++) {
            const vx = gapX - gapW / 2 - 8 + (i % 3) * 8;
            const vy = cy - 6 + Math.floor(i / 3) * 10;
            drawNeurotransmitter(ctx, vx, vy, 4);
        }

        drawLabel(ctx, 'Axon Terminal', gapX - gapW / 2, cy - bulbR - 10, '#c4b5fd', 9);

        // ── Synapse gap ──
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(gapX - gapW / 2 + bulbR, cy - 35, gapW - bulbR, 70);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gapX - gapW / 2 + bulbR, cy - 35);
        ctx.lineTo(gapX - gapW / 2 + bulbR, cy + 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gapX + gapW / 2 - bulbR, cy - 35);
        ctx.lineTo(gapX + gapW / 2 - bulbR, cy + 35);
        ctx.stroke();
        ctx.setLineDash([]);

        drawLabel(ctx, 'Synaptic Gap', gapX, cy - 42, 'rgba(255,255,255,0.6)', 9);

        // Neurotransmitters crossing gap (animated)
        const ntCount = 4;
        for (let i = 0; i < ntCount; i++) {
            const prog = ((t * 0.5 + i * 0.25) % 1);
            const ntx = (gapX - gapW / 2 + bulbR + 4) + prog * (gapW - bulbR * 2 - 8);
            const nty = cy - 10 + i * 7 + Math.sin(t * 2 + i) * 4;
            drawNeurotransmitter(ctx, ntx, nty, 4);
        }

        // Arrow showing direction
        ctx.fillStyle = 'rgba(244,114,182,0.6)';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('→ neurotransmitters →', gapX, cy + 30);

        // ── Post-synaptic neuron (right side) ──
        // Dendrite start
        ctx.beginPath();
        ctx.arc(gapX + gapW / 2, cy, bulbR * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Receptor dots on dendrite
        for (let i = 0; i < 4; i++) {
            const angle = -0.8 + i * 0.5;
            const rx = gapX + gapW / 2 - Math.cos(angle) * bulbR * 0.8;
            const ry = cy - Math.sin(angle) * bulbR * 0.8;
            ctx.fillStyle = '#f472b6';
            ctx.beginPath();
            ctx.arc(rx, ry, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        drawLabel(ctx, 'Dendrite (next neuron)', gapX + gapW / 2, cy - bulbR - 8, '#c4b5fd', 9);

        // Axon continues right
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(gapX + gapW / 2 + bulbR * 0.8, cy);
        ctx.lineTo(W * 0.95, cy);
        ctx.stroke();

        // New signal sparked in next neuron
        const sparkP = ((t * 0.5) % 1);
        if (sparkP > 0.5) {
            const sparkX = gapX + gapW / 2 + bulbR + (sparkP - 0.5) * 2 * (W * 0.95 - gapX - gapW / 2 - bulbR);
            ctx.save();
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 12;
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.arc(sparkX, cy, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // C7 link callout
        if (state.showC7Link) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(W * 0.05, H * 0.78, W * 0.9, H * 0.18);
            ctx.fillStyle = '#fde047';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🔋 C7 Connection: Batteries & Neurons', W / 2, H * 0.84);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.font = '16px monospace';
            ctx.fillText('Both convert chemical energy (ions) → electrical signals!', W / 2, H * 0.92);
        }

        // Bottom label
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Electrical signal → chemical messengers → electrical signal', W / 2, H - 12);
    };

    const drawCheckpoint = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⏸️ Checkpoint: Myelin Damage', W / 2, 24);

        // Show a neuron with damaged / missing myelin
        const cy = H * 0.4;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(W * 0.08, cy);
        ctx.lineTo(W * 0.92, cy);
        ctx.stroke();

        // Broken myelin fragments
        const segCount = 5;
        const totalLen = W * 0.84;
        const segLen = totalLen / (segCount * 2 - 1);
        for (let i = 0; i < segCount; i++) {
            const sx = W * 0.08 + i * segLen * 2;
            const damaged = i === 1 || i === 3;
            if (damaged) {
                // Broken / missing segment
                ctx.setLineDash([3, 5]);
                ctx.strokeStyle = 'rgba(239,68,68,0.5)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.ellipse(sx + segLen * 0.45, cy, segLen * 0.45, 10, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
                drawLabel(ctx, '✗', sx + segLen * 0.45, cy, '#ef4444', 14);
            } else {
                ctx.fillStyle = 'rgba(250,204,21,0.3)';
                ctx.beginPath();
                ctx.ellipse(sx + segLen * 0.45, cy, segLen * 0.45, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(250,204,21,0.5)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // Slow, stuttering pulse
        const pulseP = (t * 0.12) % 1;
        const pulseX = W * 0.08 + pulseP * totalLen;
        ctx.save();
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(250,204,21,0.6)';
        ctx.beginPath();
        ctx.arc(pulseX, cy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Question
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.font = '18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Myelin is damaged → signals are slow & weak', W / 2, cy + 30);
        ctx.fillText('WHY does losing myelin make signals slower?', W / 2, cy + 48);

        if (correct) {
            ctx.fillStyle = 'rgba(34,197,94,0.85)';
            ctx.font = 'bold 18px monospace';
            ctx.fillText('✅ Without myelin, signals can\'t jump — they crawl!', W / 2, H - 30);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '17px monospace';
            ctx.fillText('Express train → local train 🚄→🚂', W / 2, H - 14);
        }
    };

    const drawDiscovery = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        // Pulsing brain with sparks
        ctx.font = '36px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧠', W / 2, H * 0.15);

        // Spark particles around brain
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + t;
            const dist = 30 + Math.sin(t * 2 + i) * 8;
            const sx = W / 2 + Math.cos(angle) * dist;
            const sy = H * 0.13 + Math.sin(angle) * dist;
            ctx.save();
            ctx.globalAlpha = 0.5 + Math.sin(t * 3 + i) * 0.3;
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Summary card
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        const cardY = H * 0.28;
        const cardH = H * 0.62;
        ctx.fillRect(15, cardY, W - 30, cardH);
        ctx.strokeStyle = 'rgba(250,204,21,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(15, cardY, W - 30, cardH);

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 How Nerve Signals Work', W / 2, cardY + 22);

        const facts = [
            '1. Neurons are biological "wires" using IONS',
            '2. Na⁺ in, K⁺ out → action potential pulse',
            '3. Myelin insulation → signal jumps fast',
            '4. Synapse: neurotransmitters cross the gap',
            '5. Finger → Brain in ~0.02 seconds!',
            '',
            '🔗 P7: Neurons are like circuits (pathway)',
            '🔗 C7: Ions power the signal (like batteries)',
        ];
        ctx.font = '17px monospace';
        ctx.textAlign = 'left';
        facts.forEach((f, i) => {
            ctx.fillStyle = f.startsWith('🔗') ? 'rgba(167,139,250,0.85)' : 'rgba(255,255,255,0.8)';
            ctx.fillText(f, 30, cardY + 44 + i * 17);
        });
    };

    const drawComplete = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
        drawBodyBackground(ctx, W, H);

        // Mini neuron chain across the top
        const chainY = H * 0.18;
        const neuronW = W * 0.22;
        for (let i = 0; i < 3; i++) {
            const nx = W * 0.08 + i * (neuronW + 15);
            const pulseP = ((t * 0.4 + i * 0.33) % 1);
            drawNeuron(ctx, nx, chainY, neuronW, 0.5, t, false, pulseP, true);
        }

        // Completion card
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(W * 0.08, H * 0.38, W * 0.84, H * 0.52);
        ctx.strokeStyle = 'rgba(34,197,94,0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(W * 0.08, H * 0.38, W * 0.84, H * 0.52);

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✅ Big Idea 7 Complete!', W / 2, H * 0.38 + 28);

        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '17px monospace';
        ctx.fillText('P7: Circuits & Current (electrons in wires)', W / 2, H * 0.38 + 54);
        ctx.fillText('C7: Batteries & Chemical Energy (ions)', W / 2, H * 0.38 + 72);
        ctx.fillText('B7: Nerve Signals (bioelectricity in neurons)', W / 2, H * 0.38 + 90);

        ctx.fillStyle = 'rgba(250,204,21,0.7)';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('Moving charged particles = electricity! ⚡', W / 2, H * 0.38 + 118);

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '16px monospace';
        ctx.fillText('Electrons, ions, Na⁺, K⁺ — all electricity!', W / 2, H * 0.38 + 140);
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
            case 'touch_hot':
                drawTouchHot(ctx, W, H, t);
                break;
            case 'neuron_anatomy':
                drawNeuronAnatomy(ctx, W, H, t);
                break;
            case 'action_potential':
                drawActionPotential(ctx, W, H, t);
                break;
            case 'signal_speed':
                drawSignalSpeed(ctx, W, H, t);
                break;
            case 'synapse':
                drawSynapse(ctx, W, H, t);
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
    }, [phase, correct, state.showSpeed, state.showC7Link]);

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

