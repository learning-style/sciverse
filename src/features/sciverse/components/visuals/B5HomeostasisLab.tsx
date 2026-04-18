import { useRef, useEffect, useCallback } from 'react';

interface B5HomeostasisLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const B5HomeostasisLab = ({ state, onStateChange }: B5HomeostasisLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const bodyTempRef = useRef(37);
    const timeRef = useRef(0);

    const envTemp = (state.envTemp as number) ?? 22;
    const phase = (state.phase as string) || 'intro';

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        timeRef.current += 0.016;

        // Body temperature regulation
        const target = 37;
        const bt = bodyTempRef.current;
        const envPush = (envTemp - bt) * 0.001;
        const regulation = (target - bt) * 0.008;
        bodyTempRef.current += envPush + regulation;
        bodyTempRef.current = Math.max(34, Math.min(40, bodyTempRef.current));
        const bodyTemp = bodyTempRef.current;

        const sweating = bodyTemp > 37.3;
        const shivering = bodyTemp < 36.7;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Homeostasis', W / 2, 28);

        // Body figure (centered)
        const bx = W * 0.35, by = H * 0.2;
        const bodyColor = sweating ? '#fca5a5' : shivering ? '#93c5fd' : '#fde68a';

        // Head
        ctx.beginPath();
        ctx.arc(bx, by + 20, 22, 0, Math.PI * 2);
        ctx.fillStyle = bodyColor;
        ctx.fill();
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Face
        ctx.fillStyle = '#1e293b';
        ctx.font = sweating ? '17px serif' : shivering ? '17px serif' : '17px serif';
        ctx.textAlign = 'center';
        ctx.fillText(sweating ? '😓' : shivering ? '🥶' : '😊', bx, by + 26);

        // Body
        ctx.fillStyle = bodyColor;
        ctx.fillRect(bx - 18, by + 42, 36, 55);
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx - 18, by + 42, 36, 55);

        // Arms
        const shakeX = shivering ? Math.sin(timeRef.current * 30) * 3 : 0;
        ctx.strokeStyle = bodyColor;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(bx - 18, by + 50);
        ctx.lineTo(bx - 40 + shakeX, by + 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx + 18, by + 50);
        ctx.lineTo(bx + 40 + shakeX, by + 80);
        ctx.stroke();

        // Legs
        ctx.strokeStyle = bodyColor;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(bx - 10, by + 97);
        ctx.lineTo(bx - 15 + shakeX, by + 130);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx + 10, by + 97);
        ctx.lineTo(bx + 15 + shakeX, by + 130);
        ctx.stroke();

        // Sweat drops
        if (sweating) {
            for (let i = 0; i < 5; i++) {
                const sx = bx - 30 + i * 15 + Math.sin(timeRef.current * 3 + i) * 5;
                const sy = by + 10 + (timeRef.current * 40 + i * 20) % 50;
                ctx.fillStyle = 'rgba(59,130,246,0.5)';
                ctx.beginPath();
                ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Body temperature gauge (right side)
        const gx = W * 0.7, gy = H * 0.15;
        const gw = 40, gh = H * 0.5;

        // Gauge background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(gx, gy, gw, gh);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(gx, gy, gw, gh);

        // Color zones
        const zones = [
            { min: 40, max: 40, color: '#ef4444' },
            { min: 37.3, max: 40, color: 'rgba(239,68,68,0.2)' },
            { min: 36.7, max: 37.3, color: 'rgba(34,197,94,0.2)' },
            { min: 34, max: 36.7, color: 'rgba(59,130,246,0.2)' },
        ];
        for (const z of zones) {
            const top = gy + ((40 - z.max) / 6) * gh;
            const bottom = gy + ((40 - z.min) / 6) * gh;
            ctx.fillStyle = z.color;
            ctx.fillRect(gx + 2, top, gw - 4, bottom - top);
        }

        // Normal zone label
        const normalTop = gy + ((40 - 37.3) / 6) * gh;
        const normalBottom = gy + ((40 - 36.7) / 6) * gh;
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(gx, normalTop, gw, normalBottom - normalTop);
        ctx.setLineDash([]);
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Normal', gx + gw + 8, (normalTop + normalBottom) / 2 + 3);

        // Mercury indicator
        const mercY = gy + ((40 - bodyTemp) / 6) * gh;
        ctx.fillStyle = bodyTemp > 37.3 ? '#ef4444' : bodyTemp < 36.7 ? '#3b82f6' : '#22c55e';
        ctx.beginPath();
        ctx.moveTo(gx - 5, mercY);
        ctx.lineTo(gx - 15, mercY - 6);
        ctx.lineTo(gx - 15, mercY + 6);
        ctx.closePath();
        ctx.fill();

        // Temp labels
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 17px monospace';
        ctx.textAlign = 'right';
        for (let t = 35; t <= 40; t++) {
            const ty = gy + ((40 - t) / 6) * gh;
            ctx.fillText(`${t}°`, gx - 5, ty + 4);
        }

        // Current temp
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${bodyTemp.toFixed(1)}°C`, gx + gw / 2, gy + gh + 30);

        // Status text
        ctx.font = 'bold 18px monospace';
        if (sweating) {
            ctx.fillStyle = '#ef4444';
            ctx.fillText('💦 SWEATING to cool down!', W / 2, H * 0.85);
        } else if (shivering) {
            ctx.fillStyle = '#3b82f6';
            ctx.fillText('🥶 SHIVERING to warm up!', W / 2, H * 0.85);
        } else {
            ctx.fillStyle = '#22c55e';
            ctx.fillText('✅ Body temp stable at 37°C', W / 2, H * 0.85);
        }

        // Environment indicator
        ctx.fillStyle = '#64748b';
        ctx.font = '18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Environment: ${envTemp}°C ${envTemp > 35 ? '🔥' : envTemp < 10 ? '❄️' : '🌤️'}`, W / 2, H * 0.93);

        // Feedback diagram (vertical list, left-anchored to avoid overlap)
        const fdy = H * 0.63;
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#475569';
        ctx.fillText('Feedback Loop:', 12, fdy);
        const steps = ['1. Temp changes', '2. Brain detects', '3. Body responds', '4. Back to 37°C'];
        for (let i = 0; i < steps.length; i++) {
            ctx.fillText(steps[i], 18, fdy + 14 * (i + 1));
        }

        // Big Idea 5 Complete banner
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(W * 0.1, H * 0.5, W * 0.8, H * 0.4);
            ctx.strokeStyle = 'rgba(34,197,94,0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(W * 0.1, H * 0.5, W * 0.8, H * 0.4);
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 5 Complete!', W / 2, H * 0.5 + 25);
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '17px monospace';
            ctx.fillText('P5: Levers & Balance (seesaws)', W / 2, H * 0.5 + 50);
            ctx.fillText('C5: Dissolving & Saturation (soda)', W / 2, H * 0.5 + 68);
            ctx.fillText('B5: Homeostasis (body thermostat)', W / 2, H * 0.5 + 86);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillText('Balance keeps everything working! ⚖️', W / 2, H * 0.5 + 112);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [envTemp, phase]);

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

    const showControls = true;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-4">
                    <button onClick={() => onStateChange?.('envTemp', 5)} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-blue-100 text-blue-700 hover:bg-blue-200">
                        ❄️ Cold (5°C)
                    </button>
                    <button onClick={() => onStateChange?.('envTemp', 22)} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-green-100 text-green-700 hover:bg-green-200">
                        🌤️ Normal (22°C)
                    </button>
                    <button onClick={() => onStateChange?.('envTemp', 42)} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-red-100 text-red-700 hover:bg-red-200">
                        🔥 Hot (42°C)
                    </button>
                </div>
            )}
        </div>
    );
};


