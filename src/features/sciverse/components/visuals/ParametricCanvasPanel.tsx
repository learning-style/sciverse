import { useEffect, useRef } from 'react';

interface ParametricCanvasPanelProps {
    title: string;
    primary: number;
    secondary: number;
    theme: 'indigo' | 'emerald' | 'rose' | 'cyan' | 'amber';
}

const THEME = {
    indigo: { bg: '#0f172a', dot: '#818cf8', wave: '#6366f1', text: '#c7d2fe' },
    emerald: { bg: '#052e16', dot: '#34d399', wave: '#10b981', text: '#bbf7d0' },
    rose: { bg: '#3f0d1d', dot: '#fb7185', wave: '#f43f5e', text: '#fecdd3' },
    cyan: { bg: '#083344', dot: '#22d3ee', wave: '#06b6d4', text: '#a5f3fc' },
    amber: { bg: '#451a03', dot: '#fbbf24', wave: '#f59e0b', text: '#fde68a' },
} as const;

export const ParametricCanvasPanel = ({ title, primary, secondary, theme }: ParametricCanvasPanelProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const tRef = useRef(0);

    useEffect(() => {
        const node = wrapRef.current;
        if (!node) return;
        const observer = new ResizeObserver(() => {
            const c = canvasRef.current;
            if (!c) return;
            c.width = node.clientWidth;
            c.height = node.clientHeight;
        });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const palette = THEME[theme];

        const draw = () => {
            const c = canvasRef.current;
            if (!c) return;
            const ctx = c.getContext('2d');
            if (!ctx) return;

            const W = c.width;
            const H = c.height;
            tRef.current += 0.017;
            const t = tRef.current;

            ctx.fillStyle = palette.bg;
            ctx.fillRect(0, 0, W, H);

            const amp = 12 + (secondary / 100) * 28;
            const yMid = H * 0.58;

            ctx.strokeStyle = palette.wave;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x < W; x++) {
                const y = yMid + Math.sin((x / W) * 10 + t * 2.2) * amp;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            const particleCount = 12 + Math.round((primary / 100) * 18);
            for (let i = 0; i < particleCount; i++) {
                const px = ((i * 57 + t * 120 + secondary * 3) % (W + 40)) - 20;
                const py = 40 + ((i * 31 + t * 35 + primary) % (H - 80));
                const r = 1.8 + ((i + primary) % 4) * 0.6;
                ctx.fillStyle = palette.dot;
                ctx.globalAlpha = 0.25 + ((i + Math.floor(t * 10)) % 6) * 0.1;
                ctx.beginPath();
                ctx.arc(px, py, r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            const gaugeW = W * 0.68;
            const gx = (W - gaugeW) / 2;
            const gy = H * 0.14;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
            ctx.fillRect(gx, gy, gaugeW, 16);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
            ctx.strokeRect(gx, gy, gaugeW, 16);
            ctx.fillStyle = palette.dot;
            ctx.fillRect(gx + 1, gy + 1, (gaugeW - 2) * (primary / 100), 14);

            ctx.fillStyle = palette.text;
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(title, W / 2, 20);

            rafRef.current = requestAnimationFrame(draw);
        };

        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafRef.current);
    }, [title, primary, secondary, theme]);

    return (
        <div ref={wrapRef} className="h-full rounded-xl border border-slate-200 overflow-hidden bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
