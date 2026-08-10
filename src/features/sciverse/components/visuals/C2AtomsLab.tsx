import { useRef, useEffect, useCallback, useState } from 'react';

interface C2AtomsLabProps {
    state: Record<string, unknown>;
    onStateChange?: (key: string, value: unknown) => void;
}

interface AtomDef { symbol: string; color: string; r: number; name: string; }
const ATOM_DEFS: Record<string, AtomDef> = {
    H: { symbol: 'H', color: '#e2e8f0', r: 20, name: 'Hydrogen' },
    O: { symbol: 'O', color: '#ef4444', r: 26, name: 'Oxygen' },
    C: { symbol: 'C', color: '#1e293b', r: 26, name: 'Carbon' },
    N: { symbol: 'N', color: '#3b82f6', r: 26, name: 'Nitrogen' },
};

interface FloatingAtom {
    id: number; x: number; y: number; vx: number; vy: number;
    type: string; selected: boolean; consumed: boolean;
}

/** Recipes: sorted atom keys → molecule info */
const RECIPES: { key: string; atoms: string[]; name: string; formula: string; info: string; emoji: string }[] = [
    { key: 'H,H,O', atoms: ['H', 'O', 'H'], name: 'Water', formula: 'H₂O', info: 'Essential for all life!', emoji: '💧' },
    { key: 'O,O', atoms: ['O', 'O'], name: 'Oxygen Gas', formula: 'O₂', info: 'What you breathe IN.', emoji: '🌬️' },
    { key: 'O,O,O', atoms: ['O', 'O', 'O'], name: 'Ozone', formula: 'O₃', info: 'A three-oxygen molecule found in the atmosphere.', emoji: '🛡️' },
    { key: 'N,N', atoms: ['N', 'N'], name: 'Nitrogen Gas', formula: 'N₂', info: 'Most of Earth\'s air is nitrogen gas.', emoji: '🌌' },
    { key: 'C,O,O', atoms: ['C', 'O', 'O'], name: 'Carbon Dioxide', formula: 'CO₂', info: 'What you breathe OUT.', emoji: '💨' },
    { key: 'C,O', atoms: ['C', 'O'], name: 'Carbon Monoxide', formula: 'CO', info: 'A dangerous gas that has no color or smell.', emoji: '⚠️' },
    { key: 'N,O', atoms: ['N', 'O'], name: 'Nitric Oxide', formula: 'NO', info: 'A reactive signaling molecule and pollutant precursor.', emoji: '🧪' },
    { key: 'H,H', atoms: ['H', 'H'], name: 'Hydrogen Gas', formula: 'H₂', info: 'Lightest molecule in the universe!', emoji: '🎈' },
    { key: 'H,H,H,N', atoms: ['H', 'N', 'H', 'H'], name: 'Ammonia', formula: 'NH₃', info: 'Found in cleaning products. Pungent smell!', emoji: '🧹' },
    { key: 'N,O,O', atoms: ['O', 'N', 'O'], name: 'Nitrogen Dioxide', formula: 'NO₂', info: 'A reactive air pollutant gas.', emoji: '🏭' },
    { key: 'C,H,H,H,H', atoms: ['H', 'C', 'H', 'H', 'H'], name: 'Methane', formula: 'CH₄', info: 'Natural gas. Cows burp it out!', emoji: '🐄' },
];

function sortedKey(types: string[]): string {
    return [...types].sort().join(',');
}

export const C2AtomsLab = ({ state, onStateChange }: C2AtomsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const pulseRef = useRef(0);

    const phase = (state.phase as string) || 'intro';
    const builtMolecule = (state.builtMolecule as string) || '';
    const showMoleculeCard = (state.showMoleculeCard as boolean) || false;

    // Floating atoms
    const atomsRef = useRef<FloatingAtom[]>([]);
    const [initialized, setInitialized] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [formedMolecule, setFormedMolecule] = useState<typeof RECIPES[0] | null>(null);
    const [formedAtoms, setFormedAtoms] = useState<string[]>([]);
    const [builtHistory, setBuiltHistory] = useState<{ name: string; formula: string; emoji: string }[]>([]);
    const [shakeWrong, setShakeWrong] = useState(false);
    const formAnimRef = useRef(0); // 0→1 for molecule formation animation

    // Bounding box refs for workspace area
    const workAreaRef = useRef({ x: 30, y: 110, w: 400, h: 300 });

    const initAtoms = useCallback(() => {
        const types = ['H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'C', 'C', 'N', 'N'];
        const canvas = canvasRef.current;
        const W = canvas?.width || 500;
        const H = canvas?.height || 500;
        const workY = 110;
        const workH = H - workY - 90;
        const atoms: FloatingAtom[] = types.map((t, i) => ({
            id: i, x: 60 + Math.random() * (W - 120), y: workY + 30 + Math.random() * (workH - 60),
            vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
            type: t, selected: false, consumed: false,
        }));
        atomsRef.current = atoms;
        setInitialized(true);
        setSelected([]);
        setFormedMolecule(null);
        setFormedAtoms([]);
        formAnimRef.current = 0;
    }, []);

    useEffect(() => {
        if (!initialized) initAtoms();
    }, [initialized, initAtoms]);

    const getRecipeForSelected = useCallback(() => {
        if (selected.length < 2) return null;
        const selTypes = selected.map(id => atomsRef.current.find(a => a.id === id)!.type);
        const key = sortedKey(selTypes);
        return RECIPES.find(r => r.key === key) ?? null;
    }, [selected]);

    const buildSelected = useCallback(() => {
        const recipe = getRecipeForSelected();
        if (!recipe) return;

        // SUCCESS — form the molecule
        formAnimRef.current = 0;
        setFormedMolecule(recipe);
        setFormedAtoms(recipe.atoms);
        for (const id of selected) {
            const a = atomsRef.current.find(a2 => a2.id === id);
            if (a) a.consumed = true;
        }
        setSelected([]);
        setBuiltHistory(prev => [...prev, { name: recipe.name, formula: recipe.formula, emoji: recipe.emoji }]);
        onStateChange?.('builtMolecule', recipe.formula);
        onStateChange?.('showMoleculeCard', true);
    }, [getRecipeForSelected, onStateChange, selected]);

    // Handle canvas click
    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (formedMolecule) return; // busy showing molecule
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
        const my = (e.clientY - rect.top) * (canvas.height / rect.height);

        // Check if clicked on any atom
        for (const a of atomsRef.current) {
            if (a.consumed) continue;
            const def = ATOM_DEFS[a.type];
            const dx = a.x - mx, dy = a.y - my;
            if (dx * dx + dy * dy <= (def.r + 6) * (def.r + 6)) {
                if (a.selected) {
                    // Deselect
                    a.selected = false;
                    setSelected(prev => prev.filter(id => id !== a.id));
                } else {
                    // Select
                    a.selected = true;
                    setSelected(prev => {
                        const next = [...prev, a.id];
                        // Check if we have too many for any recipe — shake feedback
                        const selTypes = next.map(id => atomsRef.current.find(a2 => a2.id === id)!.type);
                        const key = sortedKey(selTypes);
                        const anyMatch = RECIPES.some(r => r.key === key);
                        // Simple prefix check: could this selection still lead to a recipe?
                        const sortedSel = [...selTypes].sort();
                        const couldMatch = RECIPES.some(r => {
                            const recAtoms = [...r.key.split(',')].sort();
                            if (sortedSel.length > recAtoms.length) return false;
                            // Every selected atom must be accountable in the recipe
                            const remaining = [...recAtoms];
                            for (const s of sortedSel) {
                                const idx = remaining.indexOf(s);
                                if (idx === -1) return false;
                                remaining.splice(idx, 1);
                            }
                            return true;
                        });
                        if (!anyMatch && !couldMatch && next.length >= 2) {
                            // No recipe possible — shake and deselect all
                            setShakeWrong(true);
                            setTimeout(() => setShakeWrong(false), 400);
                            for (const id of next) {
                                const at = atomsRef.current.find(a2 => a2.id === id);
                                if (at) at.selected = false;
                            }
                            return [];
                        }
                        return next;
                    });
                }
                return;
            }
        }
    }, [formedMolecule]);

    const handleReset = useCallback(() => {
        setFormedMolecule(null);
        setFormedAtoms([]);
        formAnimRef.current = 0;
        // Re-spawn consumed atoms
        const canvas = canvasRef.current;
        const W = canvas?.width || 500;
        const H = canvas?.height || 500;
        const workY = 110;
        const workH = H - workY - 90;
        for (const a of atomsRef.current) {
            if (a.consumed) {
                a.consumed = false;
                a.x = 60 + Math.random() * (W - 120);
                a.y = workY + 30 + Math.random() * (workH - 60);
                a.vx = (Math.random() - 0.5) * 0.6;
                a.vy = (Math.random() - 0.5) * 0.6;
            }
            a.selected = false;
        }
        setSelected([]);
    }, []);

    const handleFullReset = useCallback(() => {
        setBuiltHistory([]);
        setFormedMolecule(null);
        setFormedAtoms([]);
        formAnimRef.current = 0;
        initAtoms();
    }, [initAtoms]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        pulseRef.current += 0.04;
        const pulse = Math.sin(pulseRef.current) * 0.5 + 0.5;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🧪 Build-a-Molecule Workshop', W / 2, 26);

        // Subtitle / instruction
        ctx.fillStyle = '#64748b';
        ctx.font = '18px monospace';
        if (formedMolecule) {
            ctx.fillText(`✅ You built ${formedMolecule.formula}! Click "Next" to build another.`, W / 2, 44);
        } else if (selected.length > 0) {
            ctx.fillText(`Selected ${selected.length} atom${selected.length > 1 ? 's' : ''}... click more to complete a molecule!`, W / 2, 44);
        } else {
            ctx.fillText('Click atoms to select them — they\'ll snap into a molecule!', W / 2, 44);
        }

        // Atom legend (top row)
        const legendY = 56;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(20, legendY, W - 40, 40);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(20, legendY, W - 40, 40);

        let lx = 40;
        for (const [, def] of Object.entries(ATOM_DEFS)) {
            ctx.beginPath();
            ctx.arc(lx + 10, legendY + 20, 10, 0, Math.PI * 2);
            ctx.fillStyle = def.color;
            ctx.fill();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = def.color === '#1e293b' ? '#fff' : '#1e293b';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(def.symbol, lx + 10, legendY + 24);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '16px monospace';
            ctx.fillText(def.name, lx + 50, legendY + 24);
            lx += W > 500 ? 110 : 95;
        }

        // Workspace area
        const workY = legendY + 50;
        const workH = H - workY - 80;
        workAreaRef.current = { x: 20, y: workY, w: W - 40, h: workH };

        // Workspace bg
        ctx.fillStyle = '#fafbfc';
        ctx.fillRect(20, workY, W - 40, workH);
        ctx.strokeStyle = shakeWrong ? '#ef4444' : '#e2e8f0';
        ctx.lineWidth = shakeWrong ? 3 : 1;
        ctx.strokeRect(20, workY, W - 40, workH);

        // Animate floating atoms
        const atoms = atomsRef.current;
        for (const a of atoms) {
            if (a.consumed) continue;

            if (!a.selected) {
                // Gentle floating
                a.x += a.vx;
                a.y += a.vy;
                a.vx += (Math.random() - 0.5) * 0.03;
                a.vy += (Math.random() - 0.5) * 0.03;
                const spd = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
                if (spd > 0.8) { a.vx *= 0.95; a.vy *= 0.95; }
            } else {
                // Selected atoms slow down and bob
                a.vx *= 0.9;
                a.vy *= 0.9;
                a.x += a.vx;
                a.y += a.vy;
            }

            // Boundary bounce
            const def = ATOM_DEFS[a.type];
            const margin = def.r + 5;
            if (a.x < 20 + margin) { a.x = 20 + margin; a.vx = Math.abs(a.vx) * 0.5; }
            if (a.x > W - 20 - margin) { a.x = W - 20 - margin; a.vx = -Math.abs(a.vx) * 0.5; }
            if (a.y < workY + margin) { a.y = workY + margin; a.vy = Math.abs(a.vy) * 0.5; }
            if (a.y > workY + workH - margin) { a.y = workY + workH - margin; a.vy = -Math.abs(a.vy) * 0.5; }

            // Draw atom
            const r = def.r;

            // Selection glow
            if (a.selected) {
                ctx.beginPath();
                ctx.arc(a.x, a.y, r + 6 + pulse * 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(16, 185, 129, ${0.15 + pulse * 0.1})`;
                ctx.fill();
                ctx.strokeStyle = '#10b981';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Atom sphere (gradient for 3D look)
            const grad = ctx.createRadialGradient(a.x - r * 0.25, a.y - r * 0.25, r * 0.15, a.x, a.y, r);
            if (def.color === '#e2e8f0') {
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(1, '#cbd5e1');
            } else if (def.color === '#1e293b') {
                grad.addColorStop(0, '#475569');
                grad.addColorStop(1, '#0f172a');
            } else {
                grad.addColorStop(0, def.color + 'cc');
                grad.addColorStop(1, def.color);
            }
            ctx.beginPath();
            ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = a.selected ? '#10b981' : 'rgba(0,0,0,0.2)';
            ctx.lineWidth = a.selected ? 3 : 1.5;
            ctx.stroke();

            // Symbol
            ctx.fillStyle = (def.color === '#1e293b' || def.color === '#ef4444') ? '#fff' : '#1e293b';
            ctx.font = `bold ${r > 22 ? 19 : 17}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(def.symbol, a.x, a.y);
        }

        // Formed molecule display (animated snap-together)
        if (formedMolecule) {
            if (formAnimRef.current < 1) formAnimRef.current = Math.min(1, formAnimRef.current + 0.03);
            const t = formAnimRef.current;
            const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in-out

            const molCx = W / 2;
            const molCy = workY + workH / 2;
            const molAtoms = formedMolecule.atoms;
            const spacing = 40;
            const startX = molCx - ((molAtoms.length - 1) * spacing) / 2;

            // Background glow
            ctx.beginPath();
            ctx.arc(molCx, molCy, 50 + molAtoms.length * 15, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(16,185,129,${0.06 * easeT})`;
            ctx.fill();

            for (let i = 0; i < molAtoms.length; i++) {
                const targetX = startX + i * spacing;
                const targetY = molCy;
                // Animate from spread to together
                const spreadX = molCx + (i - (molAtoms.length - 1) / 2) * 100;
                const spreadY = molCy + Math.sin(i * 2) * 40;
                const ax = spreadX + (targetX - spreadX) * easeT;
                const ay = spreadY + (targetY - spreadY) * easeT;

                const def = ATOM_DEFS[molAtoms[i]];

                // Bond line (only when close enough)
                if (i > 0 && easeT > 0.3) {
                    const prevX = spreadX - 100 * (1 / molAtoms.length) + (startX + (i - 1) * spacing - (spreadX - 100 * (1 / molAtoms.length))) * easeT;
                    ctx.strokeStyle = `rgba(16,185,129,${Math.min(1, (easeT - 0.3) * 3)})`;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.moveTo(prevX + def.r * 0.5, targetY);
                    ctx.lineTo(ax - def.r * 0.5, ay);
                    ctx.stroke();
                }

                // Atom
                const grad = ctx.createRadialGradient(ax - def.r * 0.25, ay - def.r * 0.25, def.r * 0.15, ax, ay, def.r * 1.1);
                if (def.color === '#e2e8f0') {
                    grad.addColorStop(0, '#ffffff');
                    grad.addColorStop(1, '#cbd5e1');
                } else if (def.color === '#1e293b') {
                    grad.addColorStop(0, '#475569');
                    grad.addColorStop(1, '#0f172a');
                } else {
                    grad.addColorStop(0, def.color + 'cc');
                    grad.addColorStop(1, def.color);
                }
                ctx.beginPath();
                ctx.arc(ax, ay, def.r * 1.1, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.strokeStyle = '#10b981';
                ctx.lineWidth = 2.5;
                ctx.stroke();
                ctx.fillStyle = (def.color === '#1e293b' || def.color === '#ef4444') ? '#fff' : '#1e293b';
                ctx.font = 'bold 21px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(def.symbol, ax, ay);
            }

            // Molecule name and formula
            if (easeT > 0.7) {
                const alpha = Math.min(1, (easeT - 0.7) * 3.3);
                ctx.globalAlpha = alpha;
                ctx.fillStyle = '#166534';
                ctx.font = 'bold 22px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'alphabetic';
                ctx.fillText(`${formedMolecule.emoji} ${formedMolecule.name}`, molCx, molCy - 50);
                ctx.fillStyle = '#10b981';
                ctx.font = 'bold 19px monospace';
                ctx.fillText(formedMolecule.formula, molCx, molCy + 50);
                ctx.fillStyle = '#64748b';
                ctx.font = '18px monospace';
                ctx.fillText(formedMolecule.info, molCx, molCy + 70);
                ctx.globalAlpha = 1;
            }
        }

        // Built history tray (bottom)
        if (builtHistory.length > 0) {
            const trayY = H - 70;
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(20, trayY, W - 40, 55);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.strokeRect(20, trayY, W - 40, 55);
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 17px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText('MOLECULES BUILT:', 30, trayY + 15);

            let tx = 30;
            for (const m of builtHistory) {
                ctx.fillStyle = '#10b981';
                ctx.font = '18px monospace';
                ctx.textAlign = 'left';
                ctx.fillText(`${m.emoji} ${m.formula}`, tx, trayY + 38);
                tx += ctx.measureText(`${m.emoji} ${m.formula}`).width + 18;
            }
        }

        // "no match" shake tint
        if (shakeWrong) {
            ctx.fillStyle = 'rgba(239,68,68,0.06)';
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText("❌ Those atoms don't form a known molecule — try different ones!", W / 2, workY + workH + 18);
        }

        // Reset textBaseline for consistency
        ctx.textBaseline = 'alphabetic';

        animRef.current = requestAnimationFrame(animate);
    }, [phase, builtMolecule, showMoleculeCard, selected, formedMolecule, formedAtoms, builtHistory, shakeWrong]);

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

    return (
        <div ref={containerRef} className="flex-grow flex flex-col bg-white relative overflow-hidden">
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
            />
            {/* Controls overlay */}
            <div data-lab-controls="true" className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {!formedMolecule && getRecipeForSelected() && (
                    <button onClick={buildSelected} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow">
                        ⚗️ Build {getRecipeForSelected()!.formula}
                    </button>
                )}
                {formedMolecule && (
                    <button onClick={handleReset} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow">
                        🔨 Build Another
                    </button>
                )}
                {builtHistory.length > 0 && (
                    <button onClick={handleFullReset} className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-sm">
                        🔄 Reset All
                    </button>
                )}
            </div>
        </div>
    );
};

