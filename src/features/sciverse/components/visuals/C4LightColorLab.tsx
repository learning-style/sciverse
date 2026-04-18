import { useRef, useEffect } from 'react';

interface C4LightColorLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

/**
 * Determines what color the apple appears given a light color.
 * A red apple only reflects red wavelengths.
 */
const appleAppearance = (light: string): { fill: string; label: string } => {
    switch (light) {
        case 'white': return { fill: '#ef4444', label: 'RED — reflects red from white light' };
        case '#ef4444': return { fill: '#ef4444', label: 'RED — reflects the red light back' };
        case '#22c55e': return { fill: '#1a1a1a', label: 'BLACK — absorbs green, nothing to reflect' };
        case '#3b82f6': return { fill: '#1a1a1a', label: 'BLACK — absorbs blue, nothing to reflect' };
        default: return { fill: '#ef4444', label: '' };
    }
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        const candidate = currentLine ? `${currentLine} ${word}` : word;
        if (currentLine && ctx.measureText(candidate).width > maxWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = candidate;
        }
    }

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
};

export const C4LightColorLab = ({ state, onStateChange }: C4LightColorLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const pulseRef = useRef(0);

    const showPrism = (state.showPrism as boolean) ?? true;
    const filterColor = (state.filterColor as string) || 'none';
    const showApple = (state.showApple as boolean) ?? false;
    const lightColor = (state.lightColor as string) || 'white';

    // Mutable refs for stable animation loop
    const showPrismRef = useRef(showPrism);
    const filterColorRef = useRef(filterColor);
    const showAppleRef = useRef(showApple);
    const lightColorRef = useRef(lightColor);
    showPrismRef.current = showPrism;
    filterColorRef.current = filterColor;
    showAppleRef.current = showApple;
    lightColorRef.current = lightColor;

    // Single stable animation loop
    useEffect(() => {
        const animate = () => {
            const canvas = canvasRef.current;
            if (!canvas) { animRef.current = requestAnimationFrame(animate); return; }
            const ctx = canvas.getContext('2d');
            if (!ctx) { animRef.current = requestAnimationFrame(animate); return; }
            const W = canvas.width, H = canvas.height;
            pulseRef.current += 0.02;

            const curShowPrism = showPrismRef.current;
            const curFilter = filterColorRef.current;
            const curShowApple = showAppleRef.current;
            const curLightColor = lightColorRef.current;
            const controlsVisible = true;
            const controlClearance = controlsVisible ? 110 : 32;

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 21px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Light & Color', W / 2, 28);

            const contentBottom = H - controlClearance;
            const compactWidthRatio = Math.min(1, Math.max(0, (W - 640) / 260));
            const appleScale = 0.82 + compactWidthRatio * 0.18;
            const cy = Math.min(H * 0.45, contentBottom * 0.48);

            // ─── Light source ───
            const srcX = W * 0.05;
            const glow = Math.sin(pulseRef.current * 2) * 0.15 + 0.85;
            ctx.fillStyle = `rgba(255,255,200,${glow})`;
            ctx.beginPath();
            ctx.arc(srcX, cy, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(srcX, cy, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#92400e';
            ctx.font = '17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Light', srcX, cy + 35);

            // ─── Prism + rainbow section ───
            const prismX = W * 0.3;
            if (curShowPrism) {
                ctx.strokeStyle = curFilter !== 'none' ? curFilter : 'rgba(255,255,255,0.9)';
                ctx.lineWidth = 6;
                ctx.shadowColor = curFilter !== 'none' ? curFilter : '#fef08a';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.moveTo(srcX + 20, cy);
                ctx.lineTo(prismX, cy);
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Filter overlay
                if (curFilter !== 'none') {
                    ctx.fillStyle = curFilter + '33';
                    ctx.fillRect(srcX + 30, cy - 25, prismX - srcX - 40, 50);
                    ctx.strokeStyle = curFilter;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(srcX + 30, cy - 25, 30, 50);
                    ctx.fillStyle = curFilter;
                    ctx.font = '16px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText('Filter', srcX + 45, cy - 28);
                }

                // Prism triangle
                const prismH = 70;
                ctx.beginPath();
                ctx.moveTo(prismX, cy - prismH / 2);
                ctx.lineTo(prismX + 50, cy + prismH / 2);
                ctx.lineTo(prismX - 10, cy + prismH / 2);
                ctx.closePath();
                const prismGrad = ctx.createLinearGradient(prismX - 10, cy, prismX + 50, cy);
                prismGrad.addColorStop(0, 'rgba(200,220,255,0.5)');
                prismGrad.addColorStop(1, 'rgba(180,200,255,0.3)');
                ctx.fillStyle = prismGrad;
                ctx.fill();
                ctx.strokeStyle = '#64748b';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = '#475569';
                ctx.font = '17px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('Prism', prismX + 15, cy + prismH / 2 + 16);

                // Rainbow beams
                const rainbowColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#a855f7'];
                const beamStartX = prismX + 50;
                const beamEndX = W * (0.58 + compactWidthRatio * 0.12);
                const spreadAngle = 0.35;

                for (let i = 0; i < rainbowColors.length; i++) {
                    const angle = -spreadAngle + (i / (rainbowColors.length - 1)) * spreadAngle * 2;
                    const endY = cy + Math.sin(angle) * 100;
                    const shouldShow = curFilter === 'none' ||
                        (curFilter === '#ef4444' && i <= 1) ||
                        (curFilter === '#22c55e' && i >= 2 && i <= 4) ||
                        (curFilter === '#3b82f6' && i >= 4);
                    if (!shouldShow) continue;
                    ctx.strokeStyle = rainbowColors[i];
                    ctx.lineWidth = 4;
                    ctx.globalAlpha = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(beamStartX, cy);
                    ctx.lineTo(beamEndX, endY);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Rainbow band
                const bandX = Math.min(beamEndX + 10, W * 0.74);
                const bandH = 120 * appleScale;
                for (let i = 0; i < rainbowColors.length; i++) {
                    const shouldShow = curFilter === 'none' ||
                        (curFilter === '#ef4444' && i <= 1) ||
                        (curFilter === '#22c55e' && i >= 2 && i <= 4) ||
                        (curFilter === '#3b82f6' && i >= 4);
                    ctx.fillStyle = shouldShow ? rainbowColors[i] : '#e2e8f0';
                    ctx.fillRect(bandX, cy - bandH / 2 + (i * bandH / 7), 20, bandH / 7);
                }
            }

            // ─── Interactive Apple experiment ───
            if (curShowApple) {
                const appleX = W * (0.68 + compactWidthRatio * 0.07);
                const appleY = Math.min(H * (0.72 + compactWidthRatio * 0.04), contentBottom - (72 + appleScale * 16));
                const appleRadius = 28 * appleScale;
                const appearance = appleAppearance(curLightColor);
                const isDark = appearance.fill === '#1a1a1a';

                // Room tint (colored light fills the background slightly)
                if (curLightColor !== 'white') {
                    ctx.fillStyle = curLightColor + '12';
                    ctx.fillRect(appleX - 80 * appleScale, appleY - 75 * appleScale, 160 * appleScale, 140 * appleScale);
                }

                // Light beam color
                const beamColor = curLightColor === 'white' ? 'rgba(251,191,36,0.35)' : curLightColor;

                // Animated light rays hitting apple
                const rayPulse = Math.sin(pulseRef.current * 3) * 4;
                ctx.strokeStyle = beamColor;
                ctx.lineWidth = curLightColor === 'white' ? 1 : 2.5;
                ctx.globalAlpha = 0.6;
                for (let i = -2; i <= 2; i++) {
                    ctx.beginPath();
                    ctx.moveTo(appleX + i * 12 * appleScale, appleY - 70 * appleScale + rayPulse);
                    ctx.lineTo(appleX + i * 5 * appleScale, appleY - 25 * appleScale);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;

                // Down-arrow icon for incoming light
                ctx.fillStyle = beamColor;
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.moveTo(appleX, appleY - 68 * appleScale + rayPulse);
                ctx.lineTo(appleX - 6 * appleScale, appleY - 76 * appleScale + rayPulse);
                ctx.lineTo(appleX + 6 * appleScale, appleY - 76 * appleScale + rayPulse);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;

                // Apple body — color based on physics
                ctx.fillStyle = appearance.fill;
                ctx.beginPath();
                ctx.arc(appleX, appleY, appleRadius, 0, Math.PI * 2);
                ctx.fill();
                // Subtle highlight
                if (!isDark) {
                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                    ctx.beginPath();
                    ctx.arc(appleX - 8 * appleScale, appleY - 10 * appleScale, 10 * appleScale, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Stem
                ctx.strokeStyle = isDark ? '#444' : '#92400e';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(appleX, appleY - appleRadius);
                ctx.lineTo(appleX + 3 * appleScale, appleY - 36 * appleScale);
                ctx.stroke();
                // Leaf
                ctx.fillStyle = isDark ? '#333' : '#22c55e';
                ctx.beginPath();
                ctx.ellipse(appleX + 8 * appleScale, appleY - 33 * appleScale, 8 * appleScale, 4 * appleScale, 0.5, 0, Math.PI * 2);
                ctx.fill();

                // Reflected ray — only when light matches
                if (!isDark) {
                    const bounceOff = Math.sin(pulseRef.current * 4) * 3;
                    ctx.strokeStyle = '#ef4444';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(appleX, appleY - appleRadius);
                    ctx.lineTo(appleX, appleY - 58 * appleScale + bounceOff);
                    ctx.stroke();
                    // Arrow
                    ctx.fillStyle = '#ef4444';
                    ctx.beginPath();
                    ctx.moveTo(appleX, appleY - 64 * appleScale + bounceOff);
                    ctx.lineTo(appleX - 5 * appleScale, appleY - 56 * appleScale + bounceOff);
                    ctx.lineTo(appleX + 5 * appleScale, appleY - 56 * appleScale + bounceOff);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // "Absorbed" X markers
                    ctx.strokeStyle = '#ef444488';
                    ctx.lineWidth = 2;
                    const ax = appleX, ay = appleY - 50 * appleScale;
                    ctx.beginPath(); ctx.moveTo(ax - 6 * appleScale, ay - 6 * appleScale); ctx.lineTo(ax + 6 * appleScale, ay + 6 * appleScale); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(ax + 6 * appleScale, ay - 6 * appleScale); ctx.lineTo(ax - 6 * appleScale, ay + 6 * appleScale); ctx.stroke();
                }

                // Label
                ctx.fillStyle = isDark ? '#ef4444' : '#16a34a';
                const labelFontSize = Math.max(13, Math.round(17 * appleScale));
                ctx.font = `bold ${labelFontSize}px monospace`;
                ctx.textAlign = 'center';
                const wrappedLabel = wrapText(ctx, appearance.label, Math.max(140, 210 * appleScale));
                const lineHeight = labelFontSize + 3;
                wrappedLabel.forEach((line, index) => {
                    const offset = appleY + 44 * appleScale + index * lineHeight;
                    ctx.fillText(line, appleX, offset);
                });

                // Light source label
                const lightLabel = curLightColor === 'white' ? '☀️ White' :
                    curLightColor === '#ef4444' ? '🔴 Red' :
                    curLightColor === '#22c55e' ? '🟢 Green' : '🔵 Blue';
                ctx.fillStyle = '#475569';
                ctx.font = `${Math.max(13, Math.round(18 * appleScale))}px monospace`;
                ctx.fillText(`Light: ${lightLabel}`, appleX, appleY - 82 * appleScale);
            }

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
    // Show light-color picker when apple is visible
    const showLightPicker = showApple;

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {showControls && (
                <div data-lab-controls="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white backdrop-blur rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-3 flex-wrap justify-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Filter:</span>
                    {['none', '#ef4444', '#22c55e', '#3b82f6'].map(c => (
                        <button key={c} data-color-swatch onClick={() => onStateChange?.('filterColor', c)}
                            className={`w-7 h-7 rounded-full border-2 ${filterColor === c ? 'border-slate-800 ring-2 ring-offset-1 ring-slate-400' : 'border-slate-300'}`}
                            style={{ background: c === 'none' ? 'linear-gradient(135deg, #fff 40%, #eee 60%)' : c }}
                            title={c === 'none' ? 'No filter' : c}
                        />
                    ))}
                    <div className="h-5 w-px bg-slate-300 mx-1" />
                    <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={showApple} onChange={e => onStateChange?.('showApple', e.target.checked)} className="accent-red-500" />
                        <span className="text-xs font-bold text-slate-600">🍎 Apple</span>
                    </label>
                    {showLightPicker && (
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-px bg-slate-300" />
                            <span className="text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Light:</span>
                            {[
                                { value: 'white', bg: 'linear-gradient(135deg, #fffbeb, #fef9c3)', label: '☀️' },
                                { value: '#ef4444', bg: '#ef4444', label: '🔴' },
                                { value: '#22c55e', bg: '#22c55e', label: '🟢' },
                                { value: '#3b82f6', bg: '#3b82f6', label: '🔵' },
                            ].map(opt => (
                                <button key={opt.value} data-color-swatch onClick={() => onStateChange?.('lightColor', opt.value)}
                                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs ${lightColor === opt.value ? 'border-slate-800 ring-2 ring-offset-1 ring-slate-400' : 'border-slate-300'}`}
                                    style={{ background: opt.bg }}
                                    title={`${opt.label} light`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


