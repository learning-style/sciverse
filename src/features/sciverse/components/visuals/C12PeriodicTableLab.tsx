import { useState, useRef, useEffect, useCallback } from 'react';

interface C12PeriodicTableLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const ELEMENTS = [
    { sym: 'H',  name: 'Hydrogen',   Z: 1,  group: 1,  period: 1, valence: 1,  type: 'nonmetal', color: '#60a5fa' },
    { sym: 'He', name: 'Helium',     Z: 2,  group: 18, period: 1, valence: 0,  type: 'noble',    color: '#a78bfa' },
    { sym: 'Li', name: 'Lithium',    Z: 3,  group: 1,  period: 2, valence: 1,  type: 'alkali',   color: '#f87171' },
    { sym: 'Be', name: 'Beryllium',  Z: 4,  group: 2,  period: 2, valence: 2,  type: 'alkali-e', color: '#fb923c' },
    { sym: 'B',  name: 'Boron',      Z: 5,  group: 13, period: 2, valence: 3,  type: 'metalloid',color: '#a3e635' },
    { sym: 'C',  name: 'Carbon',     Z: 6,  group: 14, period: 2, valence: 4,  type: 'nonmetal', color: '#60a5fa' },
    { sym: 'N',  name: 'Nitrogen',   Z: 7,  group: 15, period: 2, valence: 5,  type: 'nonmetal', color: '#60a5fa' },
    { sym: 'O',  name: 'Oxygen',     Z: 8,  group: 16, period: 2, valence: 6,  type: 'nonmetal', color: '#60a5fa' },
    { sym: 'F',  name: 'Fluorine',   Z: 9,  group: 17, period: 2, valence: 7,  type: 'halogen',  color: '#34d399' },
    { sym: 'Ne', name: 'Neon',       Z: 10, group: 18, period: 2, valence: 0,  type: 'noble',    color: '#a78bfa' },
    { sym: 'Na', name: 'Sodium',     Z: 11, group: 1,  period: 3, valence: 1,  type: 'alkali',   color: '#f87171' },
    { sym: 'Mg', name: 'Magnesium',  Z: 12, group: 2,  period: 3, valence: 2,  type: 'alkali-e', color: '#fb923c' },
    { sym: 'Al', name: 'Aluminum',   Z: 13, group: 13, period: 3, valence: 3,  type: 'metal',    color: '#94a3b8' },
    { sym: 'Si', name: 'Silicon',    Z: 14, group: 14, period: 3, valence: 4,  type: 'metalloid',color: '#a3e635' },
    { sym: 'P',  name: 'Phosphorus', Z: 15, group: 15, period: 3, valence: 5,  type: 'nonmetal', color: '#60a5fa' },
    { sym: 'S',  name: 'Sulfur',     Z: 16, group: 16, period: 3, valence: 6,  type: 'nonmetal', color: '#60a5fa' },
    { sym: 'Cl', name: 'Chlorine',   Z: 17, group: 17, period: 3, valence: 7,  type: 'halogen',  color: '#34d399' },
    { sym: 'Ar', name: 'Argon',      Z: 18, group: 18, period: 3, valence: 0,  type: 'noble',    color: '#a78bfa' },
    { sym: 'K',  name: 'Potassium',  Z: 19, group: 1,  period: 4, valence: 1,  type: 'alkali',   color: '#f87171' },
    { sym: 'Ca', name: 'Calcium',    Z: 20, group: 2,  period: 4, valence: 2,  type: 'alkali-e', color: '#fb923c' },
];

export const C12PeriodicTableLab = ({ state, onStateChange }: C12PeriodicTableLabProps) => {
    void state;
    const [selected, setSelected] = useState<typeof ELEMENTS[0] | null>(null);

    const highlightedGroup = (state.highlightedGroup as number | null) || null;

    // ── Bohr model canvas ───────────────────────────────────
    const atomCanvasRef = useRef<HTMLCanvasElement>(null);
    const atomContainerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const getShells = (Z: number) => {
        const shells: number[] = [];
        let remaining = Z;
        const caps = [2, 8, 8, 18, 18, 32, 32];
        for (const cap of caps) {
            if (remaining <= 0) break;
            const n = Math.min(remaining, cap);
            shells.push(n);
            remaining -= n;
        }
        return shells;
    };

    const drawAtom = useCallback(() => {
        const canvas = atomCanvasRef.current;
        if (!canvas || !selected) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.018;
        const t = tRef.current;

        ctx.clearRect(0, 0, W, H);

        const cx = W / 2;
        const cy = H / 2;
        const shells = getShells(selected.Z);
        const maxR = Math.min(W, H) * 0.42;
        const shellSpacing = maxR / (shells.length + 0.5);

        // Nucleus glow
        const nucleusR = 14 + shells.length * 1.5;
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucleusR * 2);
        glow.addColorStop(0, 'rgba(251,191,36,0.4)');
        glow.addColorStop(1, 'rgba(251,191,36,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, nucleusR * 2, 0, Math.PI * 2);
        ctx.fill();

        // Nucleus
        const nucGrad = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, nucleusR);
        nucGrad.addColorStop(0, '#fef9c3');
        nucGrad.addColorStop(0.5, '#fbbf24');
        nucGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = nucGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, nucleusR, 0, Math.PI * 2);
        ctx.fill();

        // Nucleus label
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${selected.Z}p`, cx, cy - 2);
        ctx.font = '9px monospace';
        ctx.fillText(`${selected.Z}n`, cx, cy + 11);

        // Shell orbits & electrons
        const shellColors = ['#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#fb923c', '#22d3ee'];
        shells.forEach((electronCount, shellIdx) => {
            const r = shellSpacing * (shellIdx + 1) + nucleusR + 6;

            // Orbit ring
            ctx.strokeStyle = `${shellColors[shellIdx % shellColors.length]}44`;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Shell label
            ctx.fillStyle = '#64748b';
            ctx.font = '10px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(`n=${shellIdx + 1}`, cx + r + 6, cy - 4);

            // Electrons orbiting
            const speed = (0.6 - shellIdx * 0.08) * (shellIdx % 2 === 0 ? 1 : -1);
            const eColor = shellColors[shellIdx % shellColors.length];
            for (let e = 0; e < electronCount; e++) {
                const angle = (Math.PI * 2 / electronCount) * e + t * speed;
                const ex = cx + Math.cos(angle) * r;
                const ey = cy + Math.sin(angle) * r;

                // Electron glow
                ctx.fillStyle = `${eColor}33`;
                ctx.beginPath();
                ctx.arc(ex, ey, 8, 0, Math.PI * 2);
                ctx.fill();

                // Electron dot
                ctx.fillStyle = eColor;
                ctx.beginPath();
                ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
                ctx.fill();

                // Electron highlight
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(ex - 1.5, ey - 1.5, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`${selected.name} — Bohr Model`, cx, 8);
        ctx.font = '11px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`${selected.Z} protons · ${selected.Z} electrons · ${shells.length} shell${shells.length > 1 ? 's' : ''}`, cx, 24);

        animRef.current = requestAnimationFrame(drawAtom);
    }, [selected]);

    useEffect(() => {
        const container = atomContainerRef.current;
        if (!container) return;
        const obs = new ResizeObserver(() => {
            const canvas = atomCanvasRef.current;
            if (!canvas) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        });
        obs.observe(container);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        if (selected) {
            tRef.current = 0;
            animRef.current = requestAnimationFrame(drawAtom);
        }
        return () => cancelAnimationFrame(animRef.current);
    }, [drawAtom, selected]);

    return (
        <div className="relative w-full h-full bg-white flex flex-col p-3 overflow-hidden">
            <div className="text-slate-100 font-bold text-base monospace text-center mb-2">Periodic Table Explorer ⚛️</div>

            {/* Periodic Table Grid */}
            <div className="flex flex-col gap-0.5 flex-shrink-0">
                {[1, 2, 3, 4].map(period => (
                    <div key={period} className="flex gap-0.5">
                        {ELEMENTS.filter(e => e.period === period).map(el => {
                            const isHighlighted = highlightedGroup === el.group || (highlightedGroup !== null && el.group === highlightedGroup);
                            const isSelected = selected?.sym === el.sym;
                            return (
                                <button key={el.sym}
                                    onClick={() => { setSelected(el); onStateChange('selectedElement', el.sym); }}
                                    className={`rounded text-center transition-all ${isSelected ? 'border-[3px] border-white scale-110 z-10 ring-2 ring-yellow-400' : isHighlighted ? 'border-[3px] border-black ring-2 ring-black scale-105 z-10 brightness-125' : 'border-2 border-transparent'}`}
                                    style={{ width: 38, height: 38, backgroundColor: isSelected ? el.color : el.color, flexShrink: 0, boxShadow: isHighlighted && !isSelected ? '0 0 8px 2px rgba(0, 0, 0, 0.5)' : undefined }}>
                                    <div className="text-[8px] font-bold text-white drop-shadow-sm">{el.Z}</div>
                                    <div className="font-bold text-white drop-shadow-sm" style={{ fontSize: 13 }}>{el.sym}</div>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-2 flex-shrink-0">
                {[
                    { type: 'alkali', label: 'Alkali Metal', color: '#f87171' },
                    { type: 'nonmetal', label: 'Nonmetal', color: '#60a5fa' },
                    { type: 'noble', label: 'Noble Gas', color: '#a78bfa' },
                    { type: 'halogen', label: 'Halogen', color: '#34d399' },
                ].map(l => (
                    <div key={l.type} className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                        <span className="text-xs text-slate-400">{l.label}</span>
                    </div>
                ))}
            </div>

            {/* Selected element detail + Bohr model */}
            {selected && (
                <div className="mt-2 flex-1 flex gap-2 min-h-0 overflow-hidden">
                    {/* Info panel */}
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 overflow-y-auto flex-shrink-0" style={{ width: '45%' }}>
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg p-3 text-center w-16 flex-shrink-0" style={{ backgroundColor: `${selected.color}33`, border: `2px solid ${selected.color}` }}>
                            <div className="text-slate-400 text-xs">{selected.Z}</div>
                            <div className="font-bold text-2xl" style={{ color: selected.color }}>{selected.sym}</div>
                        </div>
                        <div>
                            <div className="text-slate-100 font-bold">{selected.name}</div>
                            <div className="text-slate-400 text-xs mt-1">Period {selected.period} · Group {selected.group}</div>
                            <div className="text-slate-400 text-xs">Valence electrons: <span className="text-yellow-300 font-bold">{selected.valence}</span></div>
                            <div className="text-slate-400 text-xs">Needs to bond: <span className="text-emerald-300 font-bold">{selected.valence <= 4 ? 8 - selected.valence : 0} more electrons</span></div>
                            <div className="text-slate-300 text-xs mt-1">
                                {selected.type === 'noble'
                                    ? '✨ Full outer shell — very unreactive!'
                                    : selected.type === 'alkali'
                                    ? '⚡ 1 outer electron — very reactive! Reacts violently with water.'
                                    : selected.type === 'halogen'
                                    ? '🧪 7 outer electrons — needs 1 more, very eager to bond!'
                                    : selected.sym === 'C'
                                    ? '🌿 4 bonds possible — backbone of all organic chemistry!'
                                    : selected.sym === 'O'
                                    ? '💧 2 bonds — forms water (H₂O) by sharing with 2 hydrogens!'
                                    : `Type: ${selected.type}`
                                }
                            </div>
                        </div>
                    </div>

                    {/* Electron shell diagram */}
                    <div className="mt-2">
                        <div className="text-slate-400 text-xs mb-1">Electron shells:</div>
                        <div className="flex gap-1 items-center">
                            {(() => {
                                const shells = [];
                                let remaining = selected.Z;
                                const caps = [2, 8, 8, 18];
                                for (const cap of caps) {
                                    if (remaining <= 0) break;
                                    const n = Math.min(remaining, cap);
                                    shells.push(n);
                                    remaining -= n;
                                }
                                return shells.map((n, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="rounded-full border border-slate-500 flex items-center justify-center text-xs text-white font-bold"
                                            style={{ width: 28, height: 28, backgroundColor: i === shells.length - 1 ? `${selected.color}66` : 'transparent' }}>
                                            {n}
                                        </div>
                                        <div className="text-slate-500 text-xs">e</div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                    </div>

                    {/* Bohr model animation */}
                    <div ref={atomContainerRef} className="flex-1 bg-slate-50 border border-slate-300 rounded-lg overflow-hidden min-h-[200px]">
                        <canvas ref={atomCanvasRef} className="w-full h-full" />
                    </div>
                </div>
            )}

            {!selected && (
                <div className="mt-3 text-slate-500 text-sm text-center">
                    Click any element to explore its electron configuration!
                </div>
            )}

            <div data-lab-controls="true" className="absolute right-3 bottom-3 flex flex-col gap-1 bg-slate-800/90 border border-slate-600 rounded-xl p-2">
                <div className="text-slate-400 text-xs font-bold mb-1">Highlight Group</div>
                {[1, 17, 18].map(g => (
                    <button key={g}
                        onClick={() => onStateChange('highlightedGroup', highlightedGroup === g ? null : g)}
                        className={`text-xs rounded px-2 py-0.5 ${highlightedGroup === g ? 'bg-yellow-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        Group {g} {g === 1 ? '(Alkali)' : g === 17 ? '(Halogen)' : '(Noble)'}
                    </button>
                ))}
            </div>
        </div>
    );
};
