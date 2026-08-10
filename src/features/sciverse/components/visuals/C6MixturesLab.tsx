import { useRef, useEffect, useCallback } from 'react';

interface C6MixturesLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

export const C6MixturesLab = ({ state }: C6MixturesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const showOil = (state.showOil as boolean) ?? true;
    const showSand = (state.showSand as boolean) ?? true;
    const showSalt = (state.showSalt as boolean) ?? true;
    const separated = (state.separated as number) || 0;

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
        ctx.fillText('The Dirty Water Challenge', W / 2, 28);

        const glassLeft = W / 2 - 60;
        const glassRight = W / 2 + 60;
        const glassTop = 80;
        const glassBottom = H - 80;
        const glassH = glassBottom - glassTop;

        // Glass outline
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(glassLeft, glassTop);
        ctx.lineTo(glassLeft - 5, glassBottom);
        ctx.lineTo(glassRight + 5, glassBottom);
        ctx.lineTo(glassRight, glassTop);
        ctx.stroke();

        // Water fill
        const waterColor = showSand ? 'rgba(139, 90, 43, 0.25)' : (showSalt ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)');
        ctx.fillStyle = waterColor;
        ctx.fillRect(glassLeft, glassTop + 10, glassRight - glassLeft, glassH - 15);

        // Oil layer on top
        if (showOil) {
            ctx.fillStyle = 'rgba(250, 204, 21, 0.6)';
            ctx.fillRect(glassLeft + 2, glassTop + 10, glassRight - glassLeft - 4, 30);
            ctx.fillStyle = '#ca8a04';
            ctx.font = '17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('🟡 Oil (0.9 g/cm³)', glassRight + 15, glassTop + 30);
        }

        // Sand at bottom
        if (showSand) {
            ctx.fillStyle = '#d4a574';
            for (let i = 0; i < 30; i++) {
                const sx = glassLeft + 10 + (i * 3.5) % (glassRight - glassLeft - 20);
                const sy = glassBottom - 5 - Math.random() * 20;
                ctx.beginPath();
                ctx.arc(sx, sy, 2 + Math.random() * 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#92400e';
            ctx.font = '17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('🟤 Sand (large grains)', glassRight + 15, glassBottom - 10);
        }

        // Salt dissolved (tiny sparkles)
        if (showSalt && !showSand) {
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            for (let i = 0; i < 20; i++) {
                const sx = glassLeft + 15 + Math.sin(t * 0.5 + i) * 40 + 25;
                const sy = glassTop + 40 + (i / 20) * (glassH - 60);
                ctx.beginPath();
                ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#64748b';
            ctx.font = '17px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('✨ Salt (dissolved)', glassRight + 15, glassTop + 80);
        }

        // Progress indicator
        const steps = ['Oil skimmed', 'Sand filtered', 'Water evaporated'];
        const stepX = 20;
        ctx.font = '18px monospace';
        for (let i = 0; i < 3; i++) {
            const done = separated > i;
            ctx.fillStyle = done ? '#16a34a' : '#cbd5e1';
            ctx.fillText(done ? '✅' : '⬜', stepX, glassTop + 20 + i * 24);
            ctx.fillStyle = done ? '#16a34a' : '#94a3b8';
            ctx.font = `${done ? 'bold ' : ''}15px monospace`;
            ctx.textAlign = 'left';
            ctx.fillText(steps[i], stepX + 20, glassTop + 20 + i * 24);
            ctx.font = '18px monospace';
        }

        // Phase-specific animations
        if (phase === 'skimming') {
            // Spoon animation
            const spoonX = W / 2 + Math.sin(t * 3) * 30;
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.ellipse(spoonX, glassTop + 20, 20, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#64748b';
            ctx.fillRect(spoonX + 15, glassTop + 10, 40, 4);
        }

        if (phase === 'filtering') {
            // Filter funnel icon
            ctx.fillStyle = '#e5e7eb';
            ctx.beginPath();
            ctx.moveTo(W / 2 - 30, glassTop - 10);
            ctx.lineTo(W / 2 + 30, glassTop - 10);
            ctx.lineTo(W / 2 + 5, glassTop + 20);
            ctx.lineTo(W / 2 - 5, glassTop + 20);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = '#475569';
            ctx.font = '16px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Filter Paper', W / 2, glassTop - 16);
        }

        if (phase === 'evaporating') {
            // Steam wisps
            for (let i = 0; i < 5; i++) {
                const sx = glassLeft + 20 + i * 20;
                const sy = glassTop - 10 - Math.sin(t * 2 + i) * 15;
                ctx.fillStyle = `rgba(148,163,184,${0.3 + Math.sin(t + i) * 0.2})`;
                ctx.beginPath();
                ctx.arc(sx, sy, 5, 0, Math.PI * 2);
                ctx.fill();
            }
            // Salt crystals left
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            for (let i = 0; i < 8; i++) {
                const cx = glassLeft + 15 + i * 12;
                ctx.fillRect(cx, glassBottom - 10, 6, 6);
                ctx.strokeRect(cx, glassBottom - 10, 6, 6);
            }
        }

        // Summary table
        if (phase === 'discovery') {
            const tY = H - 70;
            ctx.fillStyle = 'rgba(16,185,129,0.08)';
            ctx.fillRect(20, tY, W - 40, 50);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 1;
            ctx.strokeRect(20, tY, W - 40, 50);
            ctx.fillStyle = '#065f46';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Skim (density) → Filter (size) → Evaporate (boiling point)', W / 2, tY + 20);
            ctx.font = '17px monospace';
            ctx.fillText('Mixtures keep their properties → always separable!', W / 2, tY + 38);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [phase, showOil, showSand, showSalt, separated]);

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

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas ref={canvasRef} className="flex-grow" style={{ display: 'block', width: '100%', height: '100%' }} />
            {phase === 'complete' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-100 border border-emerald-300 rounded-full px-4 py-1.5 text-emerald-700 text-xs font-bold tracking-wider uppercase">
                    ✅ Lesson Complete
                </div>
            )}
        </div>
    );
};

