import { useRef, useEffect } from 'react';

interface C5DissolvingLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface Bubble {
    x: number; y: number; r: number; vy: number; wobble: number;
}

export const C5DissolvingLab = ({ state, onStateChange }: C5DissolvingLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const bubblesRef = useRef<Bubble[]>([]);
    const timeRef = useRef(0);

    const pressure = typeof state.pressure === 'number' ? state.pressure : 2;
    const temperature = typeof state.temperature === 'number' ? state.temperature : 20;
    const co2Level = typeof state.co2Level === 'number' ? state.co2Level : 0;
    const phase = (state.phase as string) || 'intro';

    // Saturation limit: higher pressure & lower temp = water holds more CO₂
    const saturationLimit = Math.min(100, pressure * 20 - temperature * 0.5);
    // Excess CO₂ escapes as bubbles
    const excess = Math.max(0, co2Level - saturationLimit);
    const escapeRate = excess / 100;

    // Mutable refs for stable animation loop
    const pressureRef = useRef(pressure);
    const temperatureRef = useRef(temperature);
    const co2Ref = useRef(co2Level);
    const satLimitRef = useRef(saturationLimit);
    const escapeRef = useRef(escapeRate);
    const phaseRef = useRef(phase);
    pressureRef.current = pressure;
    temperatureRef.current = temperature;
    co2Ref.current = co2Level;
    satLimitRef.current = saturationLimit;
    escapeRef.current = escapeRate;
    phaseRef.current = phase;

    // Separate bubble arrays for the two-bottle view
    const coldBubblesRef = useRef<Bubble[]>([]);
    const warmBubblesRef = useRef<Bubble[]>([]);

    // Single stable animation loop
    useEffect(() => {
        const animate = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) { animRef.current = requestAnimationFrame(animate); return; }

            if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) { animRef.current = requestAnimationFrame(animate); return; }
            const W = canvas.width, H = canvas.height;
            timeRef.current += 0.016;
            const t = timeRef.current;

            const pres = pressureRef.current;
            const temp = temperatureRef.current;
            const co2 = co2Ref.current;
            const satLim = satLimitRef.current;
            const esc = escapeRef.current;

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 21px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Dissolving & Saturation', W / 2, 28);

            const curPhase = phaseRef.current;
            const isTempScene = curPhase.startsWith('temp');

            if (isTempScene) {
                // ── Two-bottle comparison scene ──
                const reveal = curPhase === 'temp_reveal';
                const bottleW = W * 0.22;
                const bottleH = H * 0.52;
                const gap = W * 0.08;
                const coldX = W / 2 - gap / 2 - bottleW;
                const warmX = W / 2 + gap / 2;
                const bottleY = 50;

                const drawBottle = (bx: number, by: number, bw: number, bh: number, label: string, tempC: number, isRevealed: boolean, bubbleArr: Bubble[]) => {
                    const isCold = tempC < 20;
                    const capColor = isCold ? '#3b82f6' : '#ef4444';
                    const bgTint = isCold ? 'rgba(219,234,254,0.5)' : 'rgba(254,226,226,0.5)';

                    // Bottle body
                    ctx.fillStyle = bgTint;
                    ctx.fillRect(bx, by, bw, bh);
                    ctx.strokeStyle = '#64748b';
                    ctx.lineWidth = 2.5;
                    ctx.strokeRect(bx, by, bw, bh);

                    // Neck
                    const neckW = bw * 0.35;
                    const neckH = 18;
                    const neckX = bx + (bw - neckW) / 2;
                    ctx.fillStyle = bgTint;
                    ctx.fillRect(neckX, by - neckH, neckW, neckH);
                    ctx.strokeStyle = '#64748b';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(neckX, by - neckH, neckW, neckH);

                    // Cap (sealed before reveal, open after)
                    if (!isRevealed) {
                        ctx.fillStyle = capColor;
                        ctx.fillRect(neckX - 2, by - neckH - 6, neckW + 4, 8);
                    } else {
                        // Cap off — tilted
                        ctx.save();
                        ctx.translate(neckX + neckW + 5, by - neckH - 10);
                        ctx.rotate(0.5);
                        ctx.fillStyle = capColor;
                        ctx.fillRect(-4, -3, neckW + 4, 6);
                        ctx.restore();
                    }

                    // Water inside
                    const waterY = by + bh * 0.15;
                    const waterH = bh * 0.82;
                    const waterAlpha = isCold ? 0.35 : 0.25;
                    ctx.fillStyle = `rgba(59,130,246,${waterAlpha})`;
                    ctx.fillRect(bx + 2, waterY, bw - 4, waterH);

                    // CO₂ molecules inside water
                    const molCount = isCold ? 18 : 10;
                    for (let i = 0; i < molCount; i++) {
                        const mx = bx + 8 + ((i * 31 + i * i * 5) % Math.max(1, bw - 16));
                        const my = waterY + 8 + ((i * 47 + i * i * 3) % Math.max(1, waterH - 20));
                        const mr = 2.5;
                        const yOff = Math.sin(t * 1.5 + i * 0.8) * 3;
                        ctx.fillStyle = 'rgba(239,68,68,0.55)';
                        ctx.beginPath();
                        ctx.arc(mx, my + yOff, mr, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.fillStyle = 'rgba(59,130,246,0.45)';
                        ctx.beginPath(); ctx.arc(mx - 3, my + yOff, mr * 0.6, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(mx + 3, my + yOff, mr * 0.6, 0, Math.PI * 2); ctx.fill();
                    }

                    // Escaping bubbles (only when revealed)
                    if (isRevealed) {
                        // Warm bottle: lots of bubbles. Cold: very few.
                        const spawnChance = isCold ? 0.03 : 0.35;
                        if (Math.random() < spawnChance) {
                            bubbleArr.push({
                                x: bx + 10 + Math.random() * (bw - 20),
                                y: waterY + waterH - 5,
                                r: 2 + Math.random() * 4,
                                vy: -1.5 - Math.random() * (isCold ? 1 : 3),
                                wobble: Math.random() * Math.PI * 2
                            });
                        }
                    }

                    // Draw bubbles
                    for (let i = bubbleArr.length - 1; i >= 0; i--) {
                        const b = bubbleArr[i];
                        b.y += b.vy;
                        b.wobble += 0.1;
                        if (b.y < by - neckH - 30) { bubbleArr.splice(i, 1); continue; }
                        const wx = b.x + Math.sin(b.wobble) * 2;
                        ctx.beginPath();
                        ctx.arc(wx, b.y, b.r, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(59,130,246,0.5)';
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(wx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(255,255,255,0.7)';
                        ctx.fill();
                    }

                    // Icon & labels
                    const iconY = by + bh + 20;
                    ctx.font = '24px serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(isCold ? '❄️' : '☀️', bx + bw / 2, iconY);

                    ctx.font = 'bold 19px monospace';
                    ctx.fillStyle = capColor;
                    ctx.fillText(label, bx + bw / 2, iconY + 22);
                    ctx.font = '18px monospace';
                    ctx.fillStyle = '#64748b';
                    ctx.fillText(`${tempC}°C`, bx + bw / 2, iconY + 38);

                    if (isRevealed) {
                        ctx.font = 'bold 18px monospace';
                        ctx.fillStyle = isCold ? '#22c55e' : '#ef4444';
                        const fizzText = isCold ? 'Gentle fizz' : 'FIZZZZ!! 🫧';
                        ctx.fillText(fizzText, bx + bw / 2, iconY + 56);
                    }
                };

                drawBottle(coldX, bottleY, bottleW, bottleH, 'Bottle A (Cold)', 5, reveal, coldBubblesRef.current);
                drawBottle(warmX, bottleY, bottleW, bottleH, 'Bottle B (Warm)', 40, reveal, warmBubblesRef.current);

                // Title for the scene
                ctx.fillStyle = '#475569';
                ctx.font = reveal ? 'bold 16px monospace' : '15px monospace';
                ctx.textAlign = 'center';
                const sceneMsg = reveal
                    ? 'Warm soda fizzes MORE — warm water holds LESS CO₂!'
                    : 'Both sealed with same CO₂. Which fizzes more when opened?';
                ctx.fillText(sceneMsg, W / 2, H - 16);

            } else {
            // ── Normal single-tank scene ──
            const tx = W * 0.15, ty = 50;
            const tw = W * 0.5, th = H * 0.55;
            const waterTop = ty + th * 0.2;
            const waterBottom = ty + th;

            // Tank outline
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 3;
            ctx.strokeRect(tx, ty, tw, th);

            // Water — color shifts from light blue to vivid blue as CO₂ increases
            const coFrac = Math.min(co2 / 100, 1.5);
            const waterAlpha = 0.15 + coFrac * 0.35;
            const waterG = Math.round(200 - coFrac * 80);
            const waterB = Math.round(253 - coFrac * 30);
            ctx.fillStyle = `rgba(59,${waterG},${waterB},${waterAlpha})`;
            ctx.fillRect(tx + 2, waterTop, tw - 4, waterBottom - waterTop - 2);

            // Dissolved CO₂ molecules (visible dots in water)
            const numMols = Math.floor(co2 * 0.5);
            for (let i = 0; i < numMols; i++) {
                const mx = tx + 12 + ((i * 37 + i * i * 7) % Math.max(1, tw - 24));
                const my = waterTop + 12 + ((i * 53 + i * i * 3) % Math.max(1, waterBottom - waterTop - 34));
                const mr = 3 + (i % 3);
                const yOff = Math.sin(t * 1.5 + i * 0.7) * 4;

                // CO₂ molecule: O=C=O as three connected circles
                ctx.fillStyle = `rgba(239,68,68,${0.5 + coFrac * 0.3})`;
                ctx.beginPath();
                ctx.arc(mx, my + yOff, mr, 0, Math.PI * 2);
                ctx.fill();
                // Two O atoms
                ctx.fillStyle = `rgba(59,130,246,${0.5 + coFrac * 0.2})`;
                ctx.beginPath();
                ctx.arc(mx - mr * 1.3, my + yOff, mr * 0.7, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(mx + mr * 1.3, my + yOff, mr * 0.7, 0, Math.PI * 2);
                ctx.fill();
            }

            // "CO₂" label inside the tank if any dissolved
            if (co2 > 0) {
                ctx.fillStyle = `rgba(30,41,59,${Math.min(0.7, co2 / 80)})`;
                ctx.font = 'bold 19px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`CO₂: ${Math.round(co2)}%`, tx + tw / 2, waterTop + 18);
            }

            // Escaping bubbles — spawn when CO₂ exceeds saturation limit
            if (esc > 0.05 && Math.random() < esc * 0.4) {
                bubblesRef.current.push({
                    x: tx + 20 + Math.random() * (tw - 40),
                    y: waterBottom - 10,
                    r: 3 + Math.random() * 5,
                    vy: -1 - Math.random() * 2 - esc * 3,
                    wobble: Math.random() * Math.PI * 2
                });
            }

            bubblesRef.current = bubblesRef.current.filter(b => b.y > ty - 40);
            for (const b of bubblesRef.current) {
                b.y += b.vy;
                b.wobble += 0.1;
                const wx = b.x + Math.sin(b.wobble) * 3;

                // Bubble circle
                ctx.beginPath();
                ctx.arc(wx, b.y, b.r, 0, Math.PI * 2);
                ctx.strokeStyle = b.y < waterTop ? 'rgba(148,163,184,0.5)' : 'rgba(59,130,246,0.5)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                // Highlight
                ctx.beginPath();
                ctx.arc(wx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fill();
            }

            // Pressure cap
            ctx.fillStyle = '#475569';
            ctx.fillRect(tx, ty - 8, tw, 10);
            // Pressure arrows
            const arrowCount = Math.round(pres);
            for (let i = 0; i < arrowCount; i++) {
                const ax = tx + tw * 0.2 + i * (tw * 0.6 / Math.max(1, arrowCount - 1));
                ctx.fillStyle = '#64748b';
                ctx.beginPath();
                ctx.moveTo(ax, ty - 18);
                ctx.lineTo(ax - 5, ty - 28);
                ctx.lineTo(ax + 5, ty - 28);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#64748b';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(ax, ty - 28);
                ctx.lineTo(ax, ty - 38);
                ctx.stroke();
            }
            ctx.fillStyle = '#475569';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`Pressure: ${pres} atm`, tx + tw / 2, ty - 42);

            // Saturation meter (right side)
            const mx2 = W * 0.75, my2 = 60;
            const mw = 35, mh = H * 0.45;

            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(mx2, my2, mw, mh);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2;
            ctx.strokeRect(mx2, my2, mw, mh);

            // Fill based on co2Level (clamped to 150% for visual)
            const fillFrac = Math.min(co2 / 100, 1.5);
            const fillH = fillFrac * (mh / 1.5);
            const satColor = co2 > satLim ? '#ef4444' : co2 > satLim * 0.6 ? '#f59e0b' : '#22c55e';
            ctx.fillStyle = satColor;
            ctx.fillRect(mx2 + 2, my2 + mh - fillH, mw - 4, fillH);

            // Saturation limit line
            const limY = my2 + mh - (satLim / 100) * (mh / 1.5);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(mx2, limY);
            ctx.lineTo(mx2 + mw, limY);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('CO₂', mx2 + mw / 2, my2 - 10);
            ctx.fillText(`${Math.round(co2)}%`, mx2 + mw / 2, my2 + mh + 18);
            ctx.fillStyle = '#64748b';
            ctx.font = '17px monospace';
            ctx.fillText('Dissolved', mx2 + mw / 2, my2 + mh + 32);
            // Limit label
            ctx.fillStyle = '#ef4444';
            ctx.font = '16px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`limit ${Math.round(satLim)}%`, mx2 + mw + 4, limY + 3);

            // Temperature label
            ctx.fillStyle = temp > 30 ? '#ef4444' : '#3b82f6';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`🌡️ ${temp}°C`, tx + tw / 2, waterBottom + 22);

            // Info text
            ctx.fillStyle = '#64748b';
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            const infoY = H * 0.88;
            if (co2 > satLim && co2 > 10) {
                ctx.fillText('CO₂ above saturation limit — bubbles escaping! 🫧', W / 2, infoY);
            } else if (co2 >= 95) {
                ctx.fillText('Nearing saturation — water is nearly full!', W / 2, infoY);
            } else if (co2 > 0) {
                ctx.fillText('CO₂ dissolving into the water...', W / 2, infoY);
            } else {
                ctx.fillText('Pump CO₂ into the water to begin!', W / 2, infoY);
            }

            } // end normal tank scene

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

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
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-4 flex-wrap justify-center">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-green-600">CO₂</span>
                        <input type="range" min={0} max={150} value={co2Level} onChange={e => onStateChange?.('co2Level', Number(e.target.value))} className="w-28 h-2 accent-green-500 cursor-pointer" />
                        <span className="text-sm font-bold text-green-700">{Math.round(co2Level)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Pressure</span>
                        <input type="range" min={1} max={5} step={0.5} value={pressure} onChange={e => onStateChange?.('pressure', Number(e.target.value))} className="w-24 h-2 accent-slate-500 cursor-pointer" />
                        <span className="text-sm font-bold text-slate-600">{pressure} atm</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-500">Temp</span>
                        <input type="range" min={5} max={50} value={temperature} onChange={e => onStateChange?.('temperature', Number(e.target.value))} className="w-24 h-2 accent-red-500 cursor-pointer" />
                        <span className="text-sm font-bold text-red-500">{temperature}°C</span>
                    </div>
                </div>
            )}
        </div>
    );
};


