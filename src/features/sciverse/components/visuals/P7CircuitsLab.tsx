import { useRef, useEffect, useCallback } from 'react';

interface P7CircuitsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface Electron {
    pos: number; // 0-1 along the path
    speed: number;
    branch?: number; // for parallel: 0 = top branch, 1 = bottom branch
}

export const P7CircuitsLab = ({ state }: P7CircuitsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);
    const electronsRef = useRef<Electron[]>([]);
    const initRef = useRef(false);

    const phase = (state.phase as string) || 'intro';
    const circuitComplete = (state.circuitComplete as boolean) || false;
    const bulb1On = (state.bulb1On as boolean) || false;
    const bulb2On = (state.bulb2On as boolean) || false;
    const bulb1Broken = (state.bulb1Broken as boolean) || false;
    const bulb2Broken = (state.bulb2Broken as boolean) || false;
    const circuitType = (state.circuitType as string) || 'series';
    const thirdBulb = (state.thirdBulb as boolean) || false;

    // Initialize electrons
    useEffect(() => {
        if (!initRef.current) {
            const els: Electron[] = [];
            for (let i = 0; i < 12; i++) {
                els.push({ pos: i / 12, speed: 0.004 + Math.random() * 0.001 });
            }
            electronsRef.current = els;
            initRef.current = true;
        }
    }, []);

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
        ctx.fillText('The Blackout Lab', W / 2, 28);

        // Phase label
        ctx.fillStyle = '#64748b';
        ctx.font = '18px monospace';
        const phaseLabels: Record<string, string> = {
            'intro': '🔦 Power is out — build a circuit!',
            'simple_circuit': '🔌 Connect the components...',
            'current_flow': '⚡ Current flows in a loop!',
            'series': '🔗 Series circuit — one path',
            'parallel': '🔀 Parallel circuit — multiple paths',
            'series_break': '💥 Series break — all stop!',
            'parallel_break': '💥 Parallel break — others survive!',
            'checkpoint': '⏸️ Prediction challenge',
            'discovery': '🎉 Circuit rules discovered!',
            'complete': '✅ Lesson complete!',
        };
        ctx.fillText(phaseLabels[phase] || '', W / 2, 48);

        const cx = W / 2;
        const cy = H / 2 + 10;

        if (phase === 'intro') {
            drawIntro(ctx, W, H, t);
        } else if (phase === 'simple_circuit' || phase === 'current_flow') {
            drawSimpleCircuit(ctx, cx, cy, W, H, t, circuitComplete, bulb1On, phase === 'current_flow');
        } else if (phase === 'series' || phase === 'series_break' || (phase === 'checkpoint' && circuitType === 'series')) {
            drawSeriesCircuit(ctx, cx, cy, W, H, t, bulb1On, bulb2On, bulb1Broken, thirdBulb);
        } else if (phase === 'parallel' || phase === 'parallel_break') {
            drawParallelCircuit(ctx, cx, cy, W, H, t, bulb1On, bulb2On, bulb1Broken);
        } else if (phase === 'discovery' || phase === 'complete') {
            drawDiscovery(ctx, cx, cy, W, H, t);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, circuitComplete, bulb1On, bulb2On, bulb1Broken, bulb2Broken, circuitType, thirdBulb]);

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

    function drawBattery(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        // Body
        ctx.fillStyle = '#475569';
        ctx.fillRect(x - w / 2, y - h / 2, w, h);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);
        // Terminal bump
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(x + w / 2, y - 4, 6, 8);
        // + and - labels
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('+', x + w / 2 + 10, y + 5);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('−', x - w / 2 - 10, y + 5);
        // Label
        ctx.fillStyle = '#64748b';
        ctx.font = '17px monospace';
        ctx.fillText('Battery', x, y + h / 2 + 14);
    }

    function drawBulb(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, isOn: boolean, isBroken: boolean, label: string) {
        // Glow effect
        if (isOn && !isBroken) {
            const grad = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 2.5);
            grad.addColorStop(0, 'rgba(250, 204, 21, 0.5)');
            grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
        // Bulb body
        ctx.fillStyle = isBroken ? '#cbd5e1' : isOn ? '#fde047' : '#e2e8f0';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isBroken ? '#ef4444' : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Filament
        if (!isBroken) {
            ctx.strokeStyle = isOn ? '#f59e0b' : '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x - r * 0.3, y + r * 0.4);
            ctx.lineTo(x, y - r * 0.3);
            ctx.lineTo(x + r * 0.3, y + r * 0.4);
            ctx.stroke();
        } else {
            // Broken X
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - r * 0.4, y - r * 0.4);
            ctx.lineTo(x + r * 0.4, y + r * 0.4);
            ctx.moveTo(x + r * 0.4, y - r * 0.4);
            ctx.lineTo(x - r * 0.4, y + r * 0.4);
            ctx.stroke();
        }
        // Base
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(x - r * 0.35, y + r, r * 0.7, r * 0.4);
        // Label
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + r + r * 0.4 + 14);
    }

    function drawWire(ctx: CanvasRenderingContext2D, points: [number, number][]) {
        if (points.length < 2) return;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
    }

    function drawElectronsOnPath(ctx: CanvasRenderingContext2D, points: [number, number][], count: number, t: number, flowing: boolean, speed: number = 1) {
        if (!flowing || points.length < 2) return;
        // Compute total path length
        const segs: number[] = [];
        let totalLen = 0;
        for (let i = 1; i < points.length; i++) {
            const dx = points[i][0] - points[i - 1][0];
            const dy = points[i][1] - points[i - 1][1];
            const len = Math.sqrt(dx * dx + dy * dy);
            segs.push(len);
            totalLen += len;
        }
        // Draw each electron dot
        for (let e = 0; e < count; e++) {
            const frac = ((e / count) + t * 0.12 * speed) % 1;
            const targetDist = frac * totalLen;
            let accum = 0;
            for (let i = 0; i < segs.length; i++) {
                if (accum + segs[i] >= targetDist) {
                    const segFrac = (targetDist - accum) / segs[i];
                    const px = points[i][0] + (points[i + 1][0] - points[i][0]) * segFrac;
                    const py = points[i][1] + (points[i + 1][1] - points[i][1]) * segFrac;
                    ctx.fillStyle = '#3b82f6';
                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#93c5fd';
                    ctx.beginPath();
                    ctx.arc(px - 1, py - 1, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                }
                accum += segs[i];
            }
        }
    }

    // --- Phase renderers ---

    function drawIntro(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
        // Darkened background
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(30, 70, W - 60, H - 110);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 70, W - 60, H - 110);

        // Components scattered on bench
        const bx = W * 0.25, by = H * 0.45;
        drawBattery(ctx, bx, by, 50, 28);

        // Unconnected wire coil
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
            const angle = i * 0.7;
            const r = 12 + i * 0.8;
            ctx.lineTo(W * 0.5 + Math.cos(angle) * r, by - 20 + Math.sin(angle) * r);
        }
        ctx.stroke();
        ctx.fillStyle = '#94a3b8';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Wires', W * 0.5, by + 24);

        // Dark bulb
        drawBulb(ctx, W * 0.75, by, 18, false, false, 'Bulb');

        // Flashlight beam flicker
        const flickerAlpha = 0.15 + Math.sin(t * 3) * 0.05;
        const grad = ctx.createRadialGradient(W / 2, H - 40, 5, W / 2, H * 0.4, W * 0.4);
        grad.addColorStop(0, `rgba(250, 204, 21, ${flickerAlpha})`);
        grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 20, H - 30);
        ctx.lineTo(W / 2 - W * 0.3, 80);
        ctx.lineTo(W / 2 + W * 0.3, 80);
        ctx.lineTo(W / 2 + 20, H - 30);
        ctx.closePath();
        ctx.fill();
    }

    function drawSimpleCircuit(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number, complete: boolean, on: boolean, showFlow: boolean) {
        const batX = cx - W * 0.2;
        const bulbX = cx + W * 0.2;
        const topY = cy - 50;
        const botY = cy + 50;

        drawBattery(ctx, batX, cy, 50, 28);
        drawBulb(ctx, bulbX, cy, 18, on, false, 'Bulb');

        // Top wire: battery + → bulb
        const topPath: [number, number][] = [[batX + 31, cy - 4], [batX + 31, topY], [bulbX, topY], [bulbX, cy - 18]];
        drawWire(ctx, topPath);

        if (complete) {
            // Bottom wire: bulb → battery -
            const botPath: [number, number][] = [[bulbX, cy + 25], [bulbX, botY], [batX - 25, botY], [batX - 25, cy]];
            drawWire(ctx, botPath);

            if (showFlow && on) {
                const fullPath: [number, number][] = [...topPath, [bulbX, cy + 25], ...botPath.slice(1), [batX - 25, cy - 4]];
                drawElectronsOnPath(ctx, fullPath, 8, t, true);
            }
        } else {
            // Incomplete bottom wire with gap
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(bulbX, cy + 25);
            ctx.lineTo(bulbX, botY);
            ctx.lineTo(batX - 25, botY);
            ctx.lineTo(batX - 25, cy);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#ef4444';
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('⚠ Circuit incomplete', cx, botY + 24);
        }

        // Arrow showing direction
        if (showFlow && on) {
            ctx.fillStyle = '#3b82f6';
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('electrons →', cx, topY - 10);
            ctx.fillText('← electrons', cx, botY + 16);
        }
    }

    function drawSeriesCircuit(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number, b1On: boolean, b2On: boolean, b1Broken: boolean, hasThird: boolean) {
        const batX = cx - W * 0.28;
        const topY = cy - 60;
        const botY = cy + 60;

        drawBattery(ctx, batX, cy, 50, 28);

        // Series label
        ctx.fillStyle = '#6366f1';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SERIES — One Path', cx, topY - 24);

        if (hasThird) {
            // Three bulbs in series
            const spacing = W * 0.14;
            const b1x = cx - spacing;
            const b2x = cx;
            const b3x = cx + spacing;

            // Dimmer for 3 bulbs
            const dim = !b1Broken;
            drawBulb(ctx, b1x, topY, 14, dim && b1On, b1Broken, 'Bulb 1');
            drawBulb(ctx, b2x, topY, 14, dim && b2On, false, 'Bulb 2');
            drawBulb(ctx, b3x, topY, 14, dim && b2On, false, 'Bulb 3');

            const path: [number, number][] = [
                [batX + 31, cy - 4], [batX + 31, topY], [b1x - 14, topY],
                [b1x + 14, topY], [b2x - 14, topY],
                [b2x + 14, topY], [b3x - 14, topY],
                [b3x + 14, topY], [cx + W * 0.25, topY],
                [cx + W * 0.25, botY], [batX - 25, botY], [batX - 25, cy]
            ];
            drawWire(ctx, path);

            const flowing = !b1Broken && b1On;
            drawElectronsOnPath(ctx, path, 10, t, flowing, 0.7);

            // Dim indicator
            ctx.fillStyle = '#f59e0b';
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🔅 Each bulb gets ⅓ of the energy', cx, botY + 22);
        } else {
            // Two bulbs in series
            const b1x = cx - W * 0.04;
            const b2x = cx + W * 0.14;

            drawBulb(ctx, b1x, topY, 16, b1On, b1Broken, 'Bulb 1');
            drawBulb(ctx, b2x, topY, 16, b2On, false, 'Bulb 2');

            const path: [number, number][] = [
                [batX + 31, cy - 4], [batX + 31, topY], [b1x - 16, topY],
                [b1x + 16, topY], [b2x - 16, topY],
                [b2x + 16, topY], [cx + W * 0.25, topY],
                [cx + W * 0.25, botY], [batX - 25, botY], [batX - 25, cy]
            ];
            drawWire(ctx, path);

            const flowing = !b1Broken && b1On;
            drawElectronsOnPath(ctx, path, 8, t, flowing);

            if (b1Broken) {
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 18px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('✗ Break in series → ALL stop!', cx, botY + 22);
            } else {
                ctx.fillStyle = '#f59e0b';
                ctx.font = '17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('🔅 Each bulb gets ½ of the energy', cx, botY + 22);
            }
        }
    }

    function drawParallelCircuit(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, _H: number, t: number, b1On: boolean, b2On: boolean, b1Broken: boolean) {
        const batX = cx - W * 0.28;
        const junctionLeft = cx - W * 0.06;
        const junctionRight = cx + W * 0.18;
        const topY = cy - 55;
        const botY = cy + 55;
        const branch1Y = cy - 30;
        const branch2Y = cy + 30;

        drawBattery(ctx, batX, cy, 50, 28);

        // Parallel label
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PARALLEL — Multiple Paths', cx, topY - 24);

        // Bulbs on each branch
        const bulbMidX = (junctionLeft + junctionRight) / 2;
        drawBulb(ctx, bulbMidX, branch1Y, 16, b1On, b1Broken, 'Bulb 1');
        drawBulb(ctx, bulbMidX, branch2Y, 16, b2On, false, 'Bulb 2');

        // Main wire to junction
        const mainIn: [number, number][] = [
            [batX + 31, cy - 4], [batX + 31, topY], [junctionLeft, topY], [junctionLeft, branch1Y]
        ];
        drawWire(ctx, mainIn);
        // Junction down
        drawWire(ctx, [[junctionLeft, branch1Y], [junctionLeft, branch2Y]]);

        // Branch 1 (top)
        const br1: [number, number][] = [[junctionLeft, branch1Y], [bulbMidX - 16, branch1Y]];
        const br1b: [number, number][] = [[bulbMidX + 16, branch1Y], [junctionRight, branch1Y]];
        drawWire(ctx, br1);
        drawWire(ctx, br1b);

        // Branch 2 (bottom)
        const br2: [number, number][] = [[junctionLeft, branch2Y], [bulbMidX - 16, branch2Y]];
        const br2b: [number, number][] = [[bulbMidX + 16, branch2Y], [junctionRight, branch2Y]];
        drawWire(ctx, br2);
        drawWire(ctx, br2b);

        // Junction right and return wire
        drawWire(ctx, [[junctionRight, branch1Y], [junctionRight, branch2Y]]);
        const mainOut: [number, number][] = [
            [junctionRight, branch1Y], [junctionRight, topY], [cx + W * 0.26, topY],
            [cx + W * 0.26, botY], [batX - 25, botY], [batX - 25, cy]
        ];
        drawWire(ctx, mainOut);

        // Junction dots
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.arc(junctionLeft, branch1Y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(junctionRight, branch1Y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Electrons on top branch
        if (b1On && !b1Broken) {
            const path1: [number, number][] = [
                [batX + 31, cy - 4], [batX + 31, topY], [junctionLeft, topY],
                [junctionLeft, branch1Y], [bulbMidX - 16, branch1Y],
                [bulbMidX + 16, branch1Y], [junctionRight, branch1Y],
                [junctionRight, topY], [cx + W * 0.26, topY],
                [cx + W * 0.26, botY], [batX - 25, botY], [batX - 25, cy]
            ];
            drawElectronsOnPath(ctx, path1, 6, t, true);
        }
        // Electrons on bottom branch
        if (b2On) {
            const path2: [number, number][] = [
                [batX + 31, cy - 4], [batX + 31, topY], [junctionLeft, topY],
                [junctionLeft, branch2Y], [bulbMidX - 16, branch2Y],
                [bulbMidX + 16, branch2Y], [junctionRight, branch2Y],
                [junctionRight, topY], [cx + W * 0.26, topY],
                [cx + W * 0.26, botY], [batX - 25, botY], [batX - 25, cy]
            ];
            drawElectronsOnPath(ctx, path2, 6, t + 0.5, true);
        }

        // Status text
        if (b1Broken) {
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Branch 1 broken → Branch 2 still works! ✓', cx, botY + 22);
        } else {
            ctx.fillStyle = '#64748b';
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('💡 Each bulb gets full voltage!', cx, botY + 22);
        }
    }

    function drawDiscovery(ctx: CanvasRenderingContext2D, cx: number, cy: number, W: number, H: number, t: number) {
        // Side by side mini circuits
        const leftX = cx - W * 0.22;
        const rightX = cx + W * 0.22;

        // Series mini
        ctx.fillStyle = '#6366f1';
        ctx.font = 'bold 19px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Series', leftX, 76);

        const sY = cy - 20;
        // Mini battery
        ctx.fillStyle = '#475569';
        ctx.fillRect(leftX - 50, sY - 8, 24, 16);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.strokeRect(leftX - 50, sY - 8, 24, 16);

        // Mini series path with 2 small bulbs
        const sPath: [number, number][] = [
            [leftX - 26, sY - 8], [leftX - 26, sY - 36], [leftX - 8, sY - 36],
            [leftX + 8, sY - 36], [leftX + 26, sY - 36],
            [leftX + 26, sY + 24], [leftX - 50, sY + 24], [leftX - 50, sY + 8]
        ];
        drawWire(ctx, sPath);
        drawBulb(ctx, leftX - 8, sY - 36, 8, true, false, '');
        drawBulb(ctx, leftX + 26, sY - 36, 8, true, false, '');
        drawElectronsOnPath(ctx, sPath, 5, t, true, 0.8);

        ctx.fillStyle = '#475569';
        ctx.font = '17px monospace';
        ctx.fillText('One path', leftX, sY + 42);
        ctx.fillText('Shared energy', leftX, sY + 56);

        // Parallel mini
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 19px monospace';
        ctx.fillText('Parallel', rightX, 76);

        // Mini battery
        ctx.fillStyle = '#475569';
        ctx.fillRect(rightX - 50, sY - 8, 24, 16);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.strokeRect(rightX - 50, sY - 8, 24, 16);

        // Two branches
        const topBr = sY - 28;
        const botBr = sY + 14;
        const pIn: [number, number][] = [[rightX - 26, sY - 8], [rightX - 26, sY - 40], [rightX - 14, sY - 40], [rightX - 14, topBr]];
        drawWire(ctx, pIn);
        drawWire(ctx, [[rightX - 14, topBr], [rightX - 14, botBr]]);
        // Top branch
        drawWire(ctx, [[rightX - 14, topBr], [rightX + 14, topBr]]);
        drawBulb(ctx, rightX, topBr, 8, true, false, '');
        drawWire(ctx, [[rightX + 14, topBr], [rightX + 30, topBr]]);
        // Bottom branch
        drawWire(ctx, [[rightX - 14, botBr], [rightX + 14, botBr]]);
        drawBulb(ctx, rightX, botBr, 8, true, false, '');
        drawWire(ctx, [[rightX + 14, botBr], [rightX + 30, botBr]]);
        // Join and return
        drawWire(ctx, [[rightX + 30, topBr], [rightX + 30, botBr]]);
        drawWire(ctx, [[rightX + 30, topBr], [rightX + 30, sY - 40], [rightX + 42, sY - 40], [rightX + 42, sY + 30], [rightX - 50, sY + 30], [rightX - 50, sY + 8]]);

        drawElectronsOnPath(ctx, [[rightX - 14, topBr], [rightX + 14, topBr], [rightX + 30, topBr]], 2, t, true);
        drawElectronsOnPath(ctx, [[rightX - 14, botBr], [rightX + 14, botBr], [rightX + 30, botBr]], 2, t + 0.3, true);

        ctx.fillStyle = '#475569';
        ctx.font = '17px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Multiple paths', rightX, sY + 48);
        ctx.fillText('Full energy each', rightX, sY + 62);

        // Summary box
        const boxY = H - 80;
        ctx.fillStyle = 'rgba(59,130,246,0.06)';
        ctx.fillRect(30, boxY, W - 60, 54);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, boxY, W - 60, 54);
        ctx.fillStyle = '#1e40af';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ Electrons flow in a LOOP — not used up by bulbs!', cx, boxY + 18);
        ctx.font = '17px monospace';
        ctx.fillStyle = '#475569';
        ctx.fillText('Series: 1 path, shared energy, 1 break = all stop', cx, boxY + 34);
        ctx.fillText('Parallel: N paths, full energy, 1 break = others survive', cx, boxY + 48);
    }

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
};

