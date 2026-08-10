import { useCallback, useEffect, useRef, useState } from 'react';

interface B26WeatherLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B26WeatherLab = ({ state, onStateChange }: B26WeatherLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [stormCloseness, setStormCloseness] = useState(10);
    const phase = (state.phase as string) || 'intro';

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        const safeRight = W - 285;
        const sFrac = stormCloseness / 100;

        // ---- Sky: blue fading to dark gray as storm approaches ----
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
        const skyR = Math.round(135 - sFrac * 90);
        const skyG = Math.round(206 - sFrac * 140);
        const skyB = Math.round(250 - sFrac * 130);
        skyGrad.addColorStop(0, `rgb(${skyR},${skyG},${skyB})`);
        skyGrad.addColorStop(1, `rgb(${skyR + 40},${skyG + 20},${skyB - 10})`);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        const groundY = H * 0.68;

        // ---- Ground (meadow) ----
        const grassR = Math.round(34 - sFrac * 12);
        const grassG = Math.round(197 - sFrac * 60);
        const grassB = Math.round(94 - sFrac * 30);
        ctx.fillStyle = `rgb(${grassR},${grassG},${grassB})`;
        ctx.fillRect(0, groundY, W, H - groundY);

        // ---- Grass tufts ----
        ctx.save();
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
            const gx = 20 + i * (safeRight / 10);
            if (gx > safeRight - 10) break;
            const sway = Math.sin(t * 2.5 + i) * (2 + sFrac * 6);
            ctx.beginPath();
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx - 3 + sway, groundY - 10);
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx + 3 + sway, groundY - 12);
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx + sway, groundY - 15);
            ctx.stroke();
        }
        ctx.restore();

        // ---- Small tree on right ----
        const treeX = safeRight * 0.82;
        if (treeX < safeRight - 20) {
            const treeSway = Math.sin(t * 1.8) * sFrac * 6;
            ctx.save();
            ctx.fillStyle = '#78350f';
            ctx.fillRect(treeX - 4, groundY - 50, 8, 50);
            ctx.beginPath();
            ctx.arc(treeX + treeSway, groundY - 58, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#16a34a';
            ctx.fill();
            ctx.restore();
        }

        // ---- Storm clouds in distance (top-right) ----
        if (sFrac > 0.15) {
            const cloudAlpha = Math.min(1, (sFrac - 0.15) * 1.5);
            const cloudShift = (1 - sFrac) * safeRight * 0.3;
            ctx.save();
            ctx.globalAlpha = cloudAlpha * 0.7;
            const gray = Math.round(100 - sFrac * 60);
            ctx.fillStyle = `rgb(${gray},${gray},${gray + 10})`;
            const cx = safeRight * 0.7 + cloudShift;
            ctx.beginPath();
            ctx.ellipse(cx, H * 0.12, 60 + sFrac * 30, 22, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx - 30, H * 0.09, 20 + sFrac * 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx + 25, H * 0.1, 18 + sFrac * 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // ---- Lightning flash at high storm closeness ----
        if (sFrac > 0.85) {
            const flashChance = Math.sin(t * 15) > 0.92;
            if (flashChance) {
                ctx.save();
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(0, 0, safeRight, H * 0.5);
                ctx.restore();
            }
        }

        // ===== ANIMALS =====

        const animalBaseY = groundY - 8;

        // ---- 1. BIRD (drops lower as storm approaches) ----
        const birdX = safeRight * 0.2;
        const birdHighY = H * 0.2;
        const birdLowY = groundY - 40;
        const birdReact = Math.min(1, Math.max(0, (sFrac - 0.15) / 0.5));
        const birdY = birdHighY + birdReact * (birdLowY - birdHighY);
        const wingFlap = Math.sin(t * 6) * 8;

        ctx.save();
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
        // Body
        ctx.beginPath();
        ctx.ellipse(birdX, birdY, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Left wing
        ctx.beginPath();
        ctx.moveTo(birdX - 4, birdY - 2);
        ctx.quadraticCurveTo(birdX - 16, birdY - 12 + wingFlap, birdX - 22, birdY - 4 + wingFlap);
        ctx.stroke();
        // Right wing
        ctx.beginPath();
        ctx.moveTo(birdX + 4, birdY - 2);
        ctx.quadraticCurveTo(birdX + 16, birdY - 12 + wingFlap, birdX + 22, birdY - 4 + wingFlap);
        ctx.stroke();
        // Beak
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(birdX + 10, birdY - 1);
        ctx.lineTo(birdX + 16, birdY + 1);
        ctx.lineTo(birdX + 10, birdY + 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        // Bird label
        ctx.save();
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('BIRD', birdX, birdY + 20);
        ctx.fillStyle = '#1e293b';
        ctx.fillText('BIRD', birdX, birdY + 20);
        if (birdReact > 0.3) {
            ctx.font = 'bold 12px sans-serif';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('Flying lower!', birdX, birdY + 34);
            ctx.fillStyle = '#dc2626';
            ctx.fillText('Flying lower!', birdX, birdY + 34);
        }
        ctx.restore();

        // ---- 2. ANTS (march in a line when storm near) ----
        const antsX = safeRight * 0.38;
        const antReact = Math.min(1, Math.max(0, (sFrac - 0.25) / 0.45));
        ctx.save();
        ctx.fillStyle = '#451a03';
        if (antReact < 0.2) {
            // Ants scattered randomly
            for (let i = 0; i < 5; i++) {
                const ax = antsX - 15 + ((i * 13 + 7) % 35);
                const ay = animalBaseY - 2 + ((i * 7 + 3) % 10) - 5;
                ctx.beginPath();
                ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ax + 4, ay, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Ants marching in a line toward right (to nest)
            for (let i = 0; i < 6; i++) {
                const marchOffset = (t * 25 + i * 12) % 70;
                const ax = antsX - 10 + marchOffset;
                const ay = animalBaseY - 3;
                ctx.beginPath();
                ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ax + 4, ay, 2, 0, Math.PI * 2);
                ctx.fill();
                // Legs
                ctx.strokeStyle = '#451a03';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(ax - 1, ay + 2); ctx.lineTo(ax - 3, ay + 5);
                ctx.moveTo(ax + 1, ay + 2); ctx.lineTo(ax + 3, ay + 5);
                ctx.moveTo(ax + 5, ay + 1); ctx.lineTo(ax + 7, ay + 4);
                ctx.stroke();
            }
        }
        ctx.restore();
        // Ant label
        ctx.save();
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('ANTS', antsX + 8, animalBaseY + 18);
        ctx.fillStyle = '#3b1506';
        ctx.fillText('ANTS', antsX + 8, animalBaseY + 18);
        if (antReact > 0.3) {
            ctx.font = 'bold 12px sans-serif';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('Marching to nest!', antsX + 8, animalBaseY + 32);
            ctx.fillStyle = '#dc2626';
            ctx.fillText('Marching to nest!', antsX + 8, animalBaseY + 32);
        }
        ctx.restore();

        // ---- 3. FROG (croaks -- ripple rings when storm near) ----
        const frogX = safeRight * 0.56;
        const frogY = animalBaseY - 8;
        const frogReact = Math.min(1, Math.max(0, (sFrac - 0.3) / 0.4));

        ctx.save();
        // Frog body -- bright lime with black outline to pop against grass
        ctx.fillStyle = '#84cc16';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(frogX, frogY, 16, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Back legs (visible)
        ctx.fillStyle = '#84cc16';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(frogX - 14, frogY + 6, 8, 5, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(frogX + 14, frogY + 6, 8, 5, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Eyes (big, prominent)
        ctx.fillStyle = '#fef08a';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(frogX - 8, frogY - 9, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(frogX + 8, frogY - 9, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Pupils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(frogX - 8, frogY - 9, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(frogX + 8, frogY - 9, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Mouth line
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(frogX, frogY + 2, 8, 0.1, Math.PI - 0.1);
        ctx.stroke();
        ctx.restore();

        // Croak ripple rings
        if (frogReact > 0.1) {
            ctx.save();
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 3; i++) {
                const ringProgress = ((t * 1.8 + i * 0.35) % 1);
                const ringR = 4 + ringProgress * (12 + frogReact * 15);
                ctx.globalAlpha = (1 - ringProgress) * frogReact * 0.6;
                ctx.beginPath();
                ctx.arc(frogX, frogY - 14, ringR, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
        }

        // Frog label
        ctx.save();
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('FROG', frogX, frogY + 26);
        ctx.fillStyle = '#365314';
        ctx.fillText('FROG', frogX, frogY + 26);
        if (frogReact > 0.3) {
            ctx.font = 'bold 12px sans-serif';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('Croaking loudly!', frogX, frogY + 40);
            ctx.fillStyle = '#dc2626';
            ctx.fillText('Croaking loudly!', frogX, frogY + 40);
        }
        ctx.restore();

        // ---- 4. COW (lies down when storm near) ----
        const cowX = safeRight * 0.74;
        const cowReact = Math.min(1, Math.max(0, (sFrac - 0.4) / 0.35));
        const cowStandY = animalBaseY - 20;
        const cowLieY = animalBaseY - 8;
        const cowY = cowStandY + cowReact * (cowLieY - cowStandY);

        ctx.save();
        if (cowReact < 0.5) {
            // Standing cow
            ctx.fillStyle = '#f5f5f4';
            // Body
            ctx.beginPath();
            ctx.ellipse(cowX, cowY, 20, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 1;
            ctx.stroke();
            // Spots
            ctx.fillStyle = '#451a03';
            ctx.beginPath();
            ctx.ellipse(cowX - 5, cowY - 3, 5, 4, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cowX + 8, cowY + 2, 4, 3, -0.2, 0, Math.PI * 2);
            ctx.fill();
            // Head
            ctx.fillStyle = '#f5f5f4';
            ctx.beginPath();
            ctx.arc(cowX + 22, cowY - 4, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#78716c';
            ctx.stroke();
            // Eye
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(cowX + 25, cowY - 6, 1.5, 0, Math.PI * 2);
            ctx.fill();
            // Legs
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cowX - 12, cowY + 10);
            ctx.lineTo(cowX - 12, cowY + 24);
            ctx.moveTo(cowX - 4, cowY + 10);
            ctx.lineTo(cowX - 4, cowY + 24);
            ctx.moveTo(cowX + 8, cowY + 10);
            ctx.lineTo(cowX + 8, cowY + 24);
            ctx.moveTo(cowX + 15, cowY + 10);
            ctx.lineTo(cowX + 15, cowY + 24);
            ctx.stroke();
        } else {
            // Lying down cow
            const lyY = cowLieY;
            ctx.fillStyle = '#f5f5f4';
            ctx.beginPath();
            ctx.ellipse(cowX, lyY + 2, 22, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 1;
            ctx.stroke();
            // Spots
            ctx.fillStyle = '#451a03';
            ctx.beginPath();
            ctx.ellipse(cowX - 5, lyY, 5, 3, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cowX + 8, lyY + 3, 4, 2, -0.2, 0, Math.PI * 2);
            ctx.fill();
            // Head (resting)
            ctx.fillStyle = '#f5f5f4';
            ctx.beginPath();
            ctx.arc(cowX + 24, lyY - 2, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#78716c';
            ctx.stroke();
            // Eye closed (line)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cowX + 22, lyY - 3);
            ctx.lineTo(cowX + 27, lyY - 3);
            ctx.stroke();
            // Tucked legs
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(cowX - 12, lyY + 7);
            ctx.lineTo(cowX - 8, lyY + 12);
            ctx.moveTo(cowX + 10, lyY + 7);
            ctx.lineTo(cowX + 14, lyY + 12);
            ctx.stroke();
        }
        ctx.restore();

        // Cow label
        ctx.save();
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        const cowLabelY = cowReact < 0.5 ? cowStandY + 42 : cowLieY + 26;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('COW', cowX, cowLabelY);
        ctx.fillStyle = '#44403c';
        ctx.fillText('COW', cowX, cowLabelY);
        if (cowReact > 0.3) {
            ctx.font = 'bold 12px sans-serif';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('Lying down!', cowX, cowLabelY + 14);
            ctx.fillStyle = '#dc2626';
            ctx.fillText('Lying down!', cowX, cowLabelY + 14);
        }
        ctx.restore();

        // ---- Rain at high storm ----
        if (sFrac > 0.75) {
            const rainInt = (sFrac - 0.75) / 0.25;
            const drops = Math.floor(8 + rainInt * 18);
            ctx.save();
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < drops; i++) {
                const rx = 10 + ((i * 53 + 17) % (safeRight - 20));
                const speed = 0.8 + rainInt * 0.5;
                const progress = ((t * speed + i * 0.04) % 1);
                const ry = H * 0.05 + progress * (groundY - H * 0.05);
                ctx.globalAlpha = 0.3 + rainInt * 0.5;
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx - 1, ry + 6);
                ctx.stroke();
            }
            ctx.restore();
        }

        // ---- Complete overlay ----
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.56);
            ctx.textAlign = 'center';
            // Title
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.fillText('Big Idea 26 Complete!', W / 2, H * 0.28);
            // Subtitle
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do We Predict Weather?', W / 2, H * 0.36);
            // Lesson titles (color-coded)
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P26 Hot Side, Cold Side', W / 2, H * 0.44);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C26 Cloud Factory', W / 2, H * 0.50);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B26 Animal Weather Reporters', W / 2, H * 0.56);
            // Thematic one-liner
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Wind, clouds, and animals -- three ways to read the sky!', W / 2, H * 0.64);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [stormCloseness, phase]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = node.clientWidth;
            canvas.height = node.clientHeight;
        });
        obs.observe(node);
        const canvas = canvasRef.current;
        if (canvas) { canvas.width = node.clientWidth; canvas.height = node.clientHeight; }
        animRef.current = requestAnimationFrame(draw);
        return () => { obs.disconnect(); cancelAnimationFrame(animRef.current); };
    }, [draw]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <canvas ref={canvasRef} className="block w-full h-full" />
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[240px] shadow-md z-10">
                <label className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                    Storm Closeness
                    <span className="text-slate-600 font-mono">{stormCloseness}</span>
                </label>
                <input type="range" min={0} max={100} value={stormCloseness}
                    onChange={e => { setStormCloseness(+e.target.value); onStateChange('stormCloseness', +e.target.value); }}
                    className="w-full accent-slate-500" />
            </div>
        </div>
    );
};
