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
    /** Second slider, normalized to 0..1. Zero when the lab declares only one. */
    v2: number;
    /** Second slider's raw value. Zero when the lab declares only one. */
    raw2: number;
    /** Top of the drawing stage. Everything above is reserved for headings. */
    stageTop: number;
    /** Bottom of the drawing stage. Everything below is the footer band -- art
     *  drawn past this point will be painted over. */
    stageBottom: number;
}

/**
 * What a scene hands back for the footer. LabCanvas paints this after the art,
 * on a reserved band, so a meter or caption can never be buried by the drawing.
 */
export interface LabFooter {
    meter?: { fraction: number; caption: string; low: string; high: string };
    note?: string;
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
    /** Formats the value shown next to the slider label. Defaults to "N%".
     *  Receives the raw slider value and the same 0..1 `v` the scene gets, so a
     *  control can show its real unit (°C, metres, seconds) instead of a percentage. */
    controlDisplay?: (raw: number, v: number) => string;
    accent?: Accent;
    /** Optional second slider. Level 2 labs use this to let a learner vary two
     *  quantities at once and see which one actually dominates the result. */
    control2?: {
        label: string;
        key: string;
        min: number;
        max: number;
        initial: number;
        display?: (raw: number, v: number) => string;
    };
    /** Overlay text shown when the lesson reaches its complete phase. */
    completeTitle: string;
    completeSubtitle: string;
    completeNote: string;
    /** Background gradient stops, top to bottom. */
    sky?: [string, string];
    phase: string;
    onStateChange: (key: string, value: unknown) => void;
    /** Draws the lesson-specific scene. Called every animation frame.
     *  May return footer content for LabCanvas to render in the reserved band. */
    drawScene: (scene: LabScene) => LabFooter | void;
}

/** Reserved band at the top holding the title and readout. */
const HEADER_H = 70;

/** Height of the reserved footer band: meter, its labels, and one caption line. */
const FOOTER_H = 128;

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
    align: CanvasTextAlign = 'center',
    maxWidth?: number
) => {
    ctx.font = font;
    // Shrink to fit when a bound is given. Two centred labels on one baseline
    // will run into each other otherwise, which is what happened in C49.
    if (maxWidth && maxWidth > 0) {
        const m = /(\d+(?:\.\d+)?)px/.exec(font);
        let size = Number(m?.[1] ?? 13);
        while (size > 8 && ctx.measureText(text).width > maxWidth) {
            size -= 1;
            ctx.font = font.replace(/\d+(?:\.\d+)?px/, `${size}px`);
        }
    }
    ctx.textAlign = align;
    ctx.strokeStyle = isPale(color) ? '#0f172a' : '#ffffff';
    // Scale the halo to the type size: a fixed width swallows small glyphs.
    const size = Number(/(\d+(?:\.\d+)?)px/.exec(ctx.font)?.[1] ?? 14);
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

    outlineText(ctx, caption, x + w / 2, y + 30, 'bold 14px monospace');
    ctx.font = 'bold 13px monospace';
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
    ctx.font = 'bold 13px monospace';
    const w = ctx.measureText(text).width + 16;
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


/**
 * Draws a centred caption that always fits `maxWidth`: shrinks the type first,
 * then wraps onto a second line. Without this, a long line silently runs off
 * the edge of the canvas.
 */
export const fitText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    cx: number,
    baseline: number,
    maxWidth: number,
    startSize = 13,
    color = '#000000'
) => {
    let size = startSize;
    ctx.font = `bold ${size}px monospace`;
    while (size > 10 && ctx.measureText(text).width > maxWidth) {
        size -= 1;
        ctx.font = `bold ${size}px monospace`;
    }
    if (ctx.measureText(text).width <= maxWidth) {
        outlineText(ctx, text, cx, baseline, `bold ${size}px monospace`, color);
        return;
    }
    // Still too wide: split at the space nearest the middle.
    const words = text.split(' ');
    let best = Math.floor(words.length / 2);
    for (let i = 1; i < words.length; i++) {
        if (Math.abs(i - words.length / 2) < Math.abs(best - words.length / 2)) best = i;
    }
    const l1 = words.slice(0, best).join(' ');
    const l2 = words.slice(best).join(' ');
    outlineText(ctx, l1, cx, baseline - 15, `bold ${size}px monospace`, color);
    outlineText(ctx, l2, cx, baseline, `bold ${size}px monospace`, color);
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
    control2,
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
    const [raw2, setRaw2] = useState(control2?.initial ?? 0);

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
        const v2 = control2 ? (raw2 - control2.min) / (control2.max - control2.min || 1) : 0;

        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, sky[0]);
        grad.addColorStop(1, sky[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Reserved bands: headings above, meter and caption below. The stage in
        // between is clipped so a scene cannot spill into either one.
        const stageTop = 124;
        const stageBottom = H - FOOTER_H;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, stageBottom);
        ctx.clip();
        const footer = drawScene({ ctx, W, H, safeRight, t, v, raw, v2, raw2, stageTop, stageBottom }) || {};
        ctx.restore();

        // Heading band, painted over the scene for the same reason as the footer:
        // a scene that draws high can no longer obscure the title or readout.
        ctx.fillStyle = 'rgba(255,255,255,0.90)';
        ctx.fillRect(0, 0, W, HEADER_H);
        fitText(ctx, title, safeRight / 2, 30, safeRight - 24, 22);
        fitText(ctx, readout({ v, raw }), safeRight / 2, 56, safeRight - 24, 16);

        // Footer band, painted over whatever the scene drew.
        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.fillRect(0, stageBottom, W, H - stageBottom);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, stageBottom + 0.5);
        ctx.lineTo(safeRight, stageBottom + 0.5);
        ctx.stroke();

        // The control sits in the top-right corner only, so the footer is free
        // to use the whole canvas width and centre on it rather than on the art.
        const footCx = W / 2;
        const footW = Math.min(W - 48, 620);
        if (footer.meter) {
            const m = footer.meter;
            meterBar(ctx, footCx - footW / 2, stageBottom + 18, footW,
                m.fraction, m.caption, m.low, m.high);
        }
        if (footer.note) {
            fitText(ctx, footer.note, footCx, H - 12, W - 32);
        }

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
            ctx.font = '13px monospace';
            ctx.fillText(completeNote, W / 2, H * 0.44);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [
        raw, raw2, control2, phase, title, readout, drawScene, completeTitle,
        completeSubtitle, completeNote, controlMin, controlMax, sky,
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

    const controlV = (raw - controlMin) / (controlMax - controlMin || 1);
    const display = controlDisplay ? controlDisplay(raw, controlV) : `${raw}%`;

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
                {control2 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                        <label className={`block mb-1 text-[13px] font-bold leading-snug ${ACCENT_TEXT[accent]}`}>
                            {control2.label}:{' '}
                            {control2.display
                                ? control2.display(raw2, (raw2 - control2.min) / (control2.max - control2.min || 1))
                                : `${raw2}`}
                        </label>
                        <input
                            className={`w-full ${ACCENT_RANGE[accent]}`}
                            type="range"
                            min={control2.min}
                            max={control2.max}
                            value={raw2}
                            onChange={e => {
                                const next = Number(e.target.value);
                                setRaw2(next);
                                onStateChange(control2.key, next);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
