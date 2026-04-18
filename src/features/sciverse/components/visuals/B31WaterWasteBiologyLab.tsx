import { useCallback, useEffect, useRef, useState } from 'react';

interface B31WaterWasteBiologyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

interface Person {
    x: number;
    y: number;
    vx: number;
    vy: number;
    sick: boolean;
    sickTimer: number;
}

export const B31WaterWasteBiologyLab = ({ state, onStateChange }: B31WaterWasteBiologyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);
    const peopleRef = useRef<Person[]>([]);
    const initRef = useRef(false);

    const [sanitation, setSanitation] = useState(50);
    const phase = (state.phase as string) || 'intro';

    const initPeople = useCallback((W: number, H: number) => {
        const safeRight = W - 285;
        const people: Person[] = [];
        for (let i = 0; i < 20; i++) {
            people.push({
                x: 30 + Math.random() * (safeRight - 60),
                y: 40 + Math.random() * (H - 100),
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                sick: i < 3,
                sickTimer: i < 3 ? 300 : 0,
            });
        }
        peopleRef.current = people;
        initRef.current = true;
    }, []);

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
        const san = sanitation / 100;

        if (!initRef.current || peopleRef.current.length === 0) {
            initPeople(W, H);
        }

        // Background
        ctx.fillStyle = '#fef9f0';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeText('Invisible Enemies', safeRight / 2, 26);
        ctx.fillStyle = '#881337';
        ctx.fillText('Invisible Enemies', safeRight / 2, 26);

        // Central water source
        const wellX = safeRight * 0.5;
        const wellY = H * 0.5;
        const wellR = 50;

        // Water source glow
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = san > 0.5 ? '#3b82f6' : '#dc2626';
        ctx.beginPath();
        ctx.arc(wellX, wellY, wellR + 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Well body
        ctx.fillStyle = san > 0.5 ? '#60a5fa' : '#fca5a5';
        ctx.beginPath();
        ctx.arc(wellX, wellY, wellR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = san > 0.5 ? '#2563eb' : '#dc2626';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Well label (below the circle so germs don't cover it)
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.textAlign = 'center';
        ctx.strokeText('WATER SOURCE', wellX, wellY + wellR + 16);
        ctx.fillText('WATER SOURCE', wellX, wellY + wellR + 16);

        // Sewage pipe (visible at low sanitation, hidden at high)
        if (san < 0.7) {
            ctx.save();
            ctx.globalAlpha = 0.3 + (1 - san) * 0.5;
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 4]);
            ctx.beginPath();
            ctx.moveTo(wellX + wellR + 5, wellY + 10);
            ctx.lineTo(wellX + wellR + 40, wellY + 30);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.font = 'bold 13px monospace';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.strokeText('SEWAGE LEAK', wellX + wellR + 30, wellY + 34);
            ctx.fillStyle = '#000000';
            ctx.fillText('SEWAGE LEAK', wellX + wellR + 30, wellY + 34);
            ctx.restore();
        }

        // At high sanitation show pipe separating sewage
        if (san >= 0.7) {
            ctx.save();
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 3;
            ctx.setLineDash([6, 3]);
            ctx.beginPath();
            ctx.arc(wellX, wellY, wellR + 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = '#14532d';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('PROTECTED', wellX, wellY + wellR + 32);
            ctx.fillText('PROTECTED', wellX, wellY + wellR + 32);
            ctx.restore();
        }

        // Germs in water (fewer with higher sanitation)
        const germCount = Math.round((1 - san) * 15);
        ctx.fillStyle = '#dc2626';
        for (let g = 0; g < germCount; g++) {
            const angle = t * 0.3 + g * (Math.PI * 2 / germCount);
            const dist = wellR * 0.4 + Math.sin(t + g) * 5;
            const gx = wellX + Math.cos(angle) * dist;
            const gy = wellY + Math.sin(angle) * dist;
            ctx.beginPath();
            ctx.arc(gx, gy, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        // Update and draw people
        const people = peopleRef.current;
        const infectionChance = (1 - san) * 0.005;

        for (const p of people) {
            // Movement
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 20) { p.x = 20; p.vx *= -1; }
            if (p.x > safeRight - 20) { p.x = safeRight - 20; p.vx *= -1; }
            if (p.y < 40) { p.y = 40; p.vy *= -1; }
            if (p.y > H - 40) { p.y = H - 40; p.vy *= -1; }

            // Infection from water source
            const dist = Math.sqrt((p.x - wellX) ** 2 + (p.y - wellY) ** 2);
            if (!p.sick && dist < wellR + 30 && Math.random() < infectionChance) {
                p.sick = true;
                p.sickTimer = 200 + Math.random() * 200;
            }

            // Recovery
            if (p.sick) {
                p.sickTimer -= 1;
                if (p.sickTimer <= 0) {
                    p.sick = false;
                }
            }

            // Re-infect cycle (keep simulation alive)
            if (!p.sick && Math.random() < infectionChance * 0.3) {
                p.sick = true;
                p.sickTimer = 200 + Math.random() * 200;
            }

            // Draw person
            const color = p.sick ? '#ef4444' : '#22c55e';
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Sick face
            if (p.sick) {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(p.x - 3, p.y - 2, 1.5, 0, Math.PI * 2);
                ctx.arc(p.x + 3, p.y - 2, 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y + 3.5, 3, Math.PI, 0);
                ctx.stroke();
            }
        }

        // Health meter
        const sickCount = people.filter(p => p.sick).length;
        const healthPct = Math.round(((people.length - sickCount) / people.length) * 100);

        ctx.textAlign = 'center';
        ctx.font = 'bold 15px monospace';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        const healthLabel = 'Community Health: ' + healthPct + '%';
        ctx.strokeText(healthLabel, safeRight / 2, H * 0.09);
        ctx.fillStyle = healthPct > 70 ? '#14532d' : healthPct > 40 ? '#dc2626' : '#7f1d1d';
        ctx.fillText(healthLabel, safeRight / 2, H * 0.09);

        // Legend
        ctx.textAlign = 'left';
        ctx.font = 'bold 12px monospace';
        // Green = healthy
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(safeRight - 110, H - 34, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.fillText('Healthy', safeRight - 98, H - 30);
        // Red = sick
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(safeRight - 110, H - 16, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.fillText('Sick', safeRight - 98, H - 12);

        // Bottom insight
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        const msg = san > 0.6 ? 'Good sanitation -- water is safe, people stay healthy!'
            : san > 0.3 ? 'Some protection -- but germs still sneak through.'
            : 'No sanitation -- invisible enemies spread fast!';
        ctx.strokeText(msg, safeRight / 2, H - 50);
        ctx.fillStyle = '#000000';
        ctx.fillText(msg, safeRight / 2, H - 50);

        // Complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Big Idea 31 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Cities Move Water and Waste?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P31 Downhill Flow', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C31 Clean Water', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B31 Invisible Enemies', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Clean water keeps communities safe and healthy!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [sanitation, phase, initPeople]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = node.clientWidth;
            canvas.height = node.clientHeight;
            initRef.current = false;
        });
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[210px] shadow-md z-10">
                <label className="text-[13px] font-bold text-rose-600">Sanitation Level: {sanitation}%</label>
                <input className="w-full accent-rose-500" type="range" min={5} max={100} value={sanitation}
                    onChange={e => { const v = Number(e.target.value); setSanitation(v); onStateChange('sanitationLevel', v); }} />
            </div>
        </div>
    );
};
