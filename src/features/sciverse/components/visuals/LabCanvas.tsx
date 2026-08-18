import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared canvas scaffold for Level 1 lesson labs (Big Idea 33+).
 *
 * Every Level 1 lab is the same shape: one canvas, one slider, a headline readout,
 * and a "complete" overlay. This component owns that scaffold so each lesson file
 * only has to describe its own scene.
 */

export interface LabScene {
    ctx: CanvasRenderingContext2D;
    /** Full canvas size. */
    W: number;
    H: number;
    /** Right edge of the safe drawing area -- keeps art clear of the chat panel. */
    safeRight: number;
    /** Seconds since mount, for animation. */
    t: number;
    /** Slider value normalized to 0..1. */
    v: number;
    /** Raw slider value (min..max). */
    raw: number;
}

export type Accent = 'indigo' | 'emerald' | 'rose';

interface LabCanvasProps {
    /** Big headline drawn at the top of the canvas. */
    title: string;
    /** Second line under the title -- usually the current setting in plain words. */
    readout: (scene: Pick<LabScene, 'v' | 'raw'>) => string;
    /** Slider label, e.g. "Food Chain Steps". */
    controlLabel: string;
    /** Key reported back through onStateChange. */
    controlKey: string;
    controlMin?: number;
    controlMax?: number;
    controlInitial?: number;
    /** Formats the value shown next to the slider label. Defaults to "N%". */
    controlDisplay?: (raw: number) => string;
    accent?: Accent;
    /** Overlay text shown when the lesson reaches its complete phase. */
    completeTitle: string;
    completeSubtitle: string;
    completeNote: string;
    /** Background gradient stops, top to bottom. */
    sky?: [string, string];
    phase: string;
    onStateChange: (key: string, value: unknown) => void;
    /** Draws the lesson-specific scene. Called every animation frame. */
    drawScene: (scene: LabScene) => void;
}

const ACCENT_TEXT: Record<Accent, string> = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
};

const ACCENT_RANGE: Record<Accent, string> = {
    indigo: 'accent-indigo-500',
    emerald: 'accent-emerald-500',
    rose: 'accent-rose-500',
};

/** True for pale fills, which need a dark halo rather than a white one. */
const isPale = (color: string): boolean => {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
    if (!m) return false;
    let h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    // Perceived brightness; 0.6 sits comfortably between slate-400 and white.
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
};

/**
 * Draws text with a contrasting halo so it stays readable over any artwork.
 * The halo flips to dark for pale text -- a white halo behind white glyphs
 * swallows the letterforms entirely.
 */
export const outlineText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    font: string,
    color = '#000000',
    align: CanvasTextAlign = 'center'
) => {
    ctx.font = font;
    ctx.textAlign = align;
    ctx.strokeStyle = isPale(color) ? '#0f172a' : '#ffffff';
    // Scale the halo to the type size: a fixed width swallows small glyphs.
    const size = Number(/(\d+(?:\.\d+)?)px/.exec(font)?.[1] ?? 14);
    ctx.lineWidth = Math.max(2, Math.min(4, size * 0.25));
    // Round joins stop thin strokes throwing spikes off sharp corners.
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};

/** Horizontal meter with a caption underneath. Used for "how much / how good" readouts. */
export const meterBar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    fraction: number,
    caption: string,
    lowLabel: string,
    highLabel: string,
    stops: [string, string, string] = ['#dc2626', '#eab308', '#22c55e']
) => {
    const h = 14;
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(x, y, w, h);
    const grad = ctx.createLinearGradient(x, 0, x + w, 0);
    grad.addColorStop(0, stops[0]);
    grad.addColorStop(0.5, stops[1]);
    grad.addColorStop(1, stops[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w * Math.max(0, Math.min(1, fraction)), h);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    outlineText(ctx, caption, x + w / 2, y + 30, 'bold 12px monospace');
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.fillText(lowLabel, x, y + 46);
    ctx.textAlign = 'right';
    ctx.fillText(highLabel, x + w, y + 46);
};

/** Rounded label chip -- handy for tagging parts of a diagram. */
export const chip = (
    ctx: CanvasRenderingContext2D,
    text: string,
    cx: number,
    cy: number,
    fill: string,
    textColor = '#ffffff'
) => {
    ctx.font = 'bold 11px monospace';
    const w = ctx.measureText(text).width + 14;
    const h = 20;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.roundRect(cx - w / 2, cy - h / 2, w, h, 6);
    ctx.fill();
    ctx.strokeStyle = '#00000033';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(text, cx, cy + 4);
};

export const LabCanvas = ({
    title,
    readout,
    controlLabel,
    controlKey,
    controlMin = 0,
    controlMax = 100,
    controlInitial = 50,
    controlDisplay,
    accent = 'indigo',
    completeTitle,
    completeSubtitle,
    completeNote,
    sky = ['#e0f2fe', '#f8fafc'],
    phase,
    onStateChange,
    drawScene,
}: LabCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [raw, setRaw] = useState(controlInitial);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // The backing store is sized in device pixels so text stays sharp on
        // high-DPI screens; the transform below lets every scene keep drawing
        // in plain CSS pixels.
        const dpr = window.devicePixelRatio || 1;
        const W = canvas.width / dpr;
        const H = canvas.height / dpr;
        if (W === 0 || H === 0) {
            animRef.current = requestAnimationFrame(draw);
            return;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        tRef.current += 0.016;
        const t = tRef.current;
        const safeRight = Math.max(240, W - 285);
        const v = (raw - controlMin) / (controlMax - controlMin || 1);

        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, sky[0]);
        grad.addColorStop(1, sky[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        outlineText(ctx, title, safeRight / 2, 30, 'bold 22px monospace');
        outlineText(ctx, readout({ v, raw }), safeRight / 2, 56, 'bold 16px monospace');

        drawScene({ ctx, W, H, safeRight, t, v, raw });

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.24);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.fillText(completeTitle, W / 2, H * 0.3);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText(completeSubtitle, W / 2, H * 0.38);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText(completeNote, W / 2, H * 0.44);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [
        raw, phase, title, readout, drawScene, completeTitle, completeSubtitle,
        completeNote, controlMin, controlMax, sky,
    ]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(node.clientWidth * dpr);
            canvas.height = Math.round(node.clientHeight * dpr);
        };
        resize();
        const obs = new ResizeObserver(resize);
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    const display = controlDisplay ? controlDisplay(raw) : `${raw}%`;

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div
                data-lab-controls="true"
                className="absolute right-2 top-2 bg-white/95 backdrop-blur-sm border border-slate-300 rounded-lg p-3 w-[240px] max-w-[46%] shadow-md z-10"
            >
                <label className={`block mb-1 text-[13px] font-bold leading-snug ${ACCENT_TEXT[accent]}`}>
                    {controlLabel}: {display}
                </label>
                <input
                    className={`w-full ${ACCENT_RANGE[accent]}`}
                    type="range"
                    min={controlMin}
                    max={controlMax}
                    value={raw}
                    onChange={e => {
                        const next = Number(e.target.value);
                        setRaw(next);
                        onStateChange(controlKey, next);
                    }}
                />
            </div>
        </div>
    );
};
