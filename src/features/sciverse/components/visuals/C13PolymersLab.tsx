import { useState } from 'react';

interface C13PolymersLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

interface Monomer {
    id: number;
    x: number;
    y: number;
    branchFrom?: number;
}

export const C13PolymersLab = ({ state, onStateChange }: C13PolymersLabProps) => {
    void state;
    const [chain, setChain] = useState<Monomer[]>([{ id: 1, x: 50, y: 50 }]);
    const [crossLinks, setCrossLinks] = useState<Array<[number, number]>>([]);
    const [mode, setMode] = useState<'linear' | 'branched' | 'cross-linked'>('linear');

    const addMonomer = () => {
        setChain(prev => {
            const last = prev[prev.length - 1];
            const next: Monomer = {
                id: last.id + 1,
                x: Math.min(92, last.x + 10),
                y: last.y
            };
            const result = [...prev, next];
            onStateChange('chainLength', result.length);
            return result;
        });
    };

    const branchMonomer = () => {
        setMode('branched');
        setChain(prev => {
            if (prev.length < 2) return prev;
            const base = prev[Math.floor(prev.length / 2)];
            const next: Monomer = {
                id: prev.length + 1,
                x: base.x + 6,
                y: base.y - 18,
                branchFrom: base.id
            };
            const result = [...prev, next];
            onStateChange('chainLength', result.length);
            return result;
        });
    };

    const addCrossLink = () => {
        setMode('cross-linked');
        if (chain.length < 4) return;
        const a = Math.floor(chain.length * 0.3);
        const b = Math.floor(chain.length * 0.7);
        setCrossLinks(prev => [...prev, [chain[a].id, chain[b].id]]);
    };

    const reset = () => {
        setChain([{ id: 1, x: 50, y: 50 }]);
        setCrossLinks([]);
        setMode('linear');
        onStateChange('chainLength', 1);
    };

    const density = mode === 'linear' ? 'High Density (HDPE-like)' : mode === 'branched' ? 'Low Density (LDPE-like)' : 'Network Polymer';
    const flexibility = mode === 'linear' ? 'Rigid/Strong' : mode === 'branched' ? 'Flexible/Soft' : 'Very Tough';

    return (
        <div className="relative w-full h-full bg-white p-3 flex flex-col overflow-hidden">
            <div className="text-center text-slate-100 font-bold text-base mb-2">Polymer Builder Lab 🧵</div>

            <div className="flex-1 bg-white rounded-lg border border-slate-200 relative overflow-hidden">
                {/* Render polymer chain in SVG */}
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
                    {/* Backbone bonds */}
                    {chain.map((m, i) => {
                        if (i === 0) return null;
                        const prev = chain[i - 1];
                        if (m.branchFrom) return null;
                        return (
                            <line
                                key={`bond-${m.id}`}
                                x1={prev.x}
                                y1={prev.y}
                                x2={m.x}
                                y2={m.y}
                                stroke="#94a3b8"
                                strokeWidth="1.8"
                            />
                        );
                    })}

                    {/* Branch bonds */}
                    {chain.filter(m => m.branchFrom).map(m => {
                        const parent = chain.find(c => c.id === m.branchFrom);
                        if (!parent) return null;
                        return (
                            <line key={`branch-${m.id}`}
                                x1={parent.x} y1={parent.y} x2={m.x} y2={m.y}
                                stroke="#f59e0b" strokeWidth="1.5" />
                        );
                    })}

                    {/* Cross links */}
                    {crossLinks.map((cl, i) => {
                        const a = chain.find(c => c.id === cl[0]);
                        const b = chain.find(c => c.id === cl[1]);
                        if (!a || !b) return null;
                        return (
                            <line key={`cross-${i}`}
                                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                                stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
                        );
                    })}

                    {/* Monomers */}
                    {chain.map(m => (
                        <g key={m.id}>
                            <circle cx={m.x} cy={m.y} r="2.6" fill={m.branchFrom ? '#f59e0b' : '#34d399'} stroke="#0f172a" strokeWidth="0.6" />
                            <text x={m.x} y={m.y + 0.8} textAnchor="middle" fontSize="1.5" fill="#0f172a" fontWeight="bold">M</text>
                        </g>
                    ))}
                </svg>

                <div className="absolute top-2 left-2 text-[10px] text-slate-300 bg-slate-800/80 rounded px-2 py-1">
                    Monomers: <span className="text-emerald-300 font-bold">{chain.length}</span>
                </div>
                <div className="absolute top-2 right-2 text-[10px] text-cyan-300 bg-slate-800/80 rounded px-2 py-1">
                    Cross-links: <span className="font-bold">{crossLinks.length}</span>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800 border border-slate-200 rounded p-2">
                    <div className="text-slate-400">Structure</div>
                    <div className="text-yellow-300 font-bold">{mode}</div>
                    <div className="text-slate-400 mt-1">Density</div>
                    <div className="text-emerald-300 font-bold">{density}</div>
                </div>
                <div className="bg-slate-800 border border-slate-200 rounded p-2">
                    <div className="text-slate-400">Property</div>
                    <div className="text-blue-300 font-bold">{flexibility}</div>
                    <div className="text-slate-400 mt-1">Example</div>
                    <div className="text-rose-300 font-bold">
                        {mode === 'linear' ? 'Milk Jug' : mode === 'branched' ? 'Plastic Bag' : 'Vulcanized Rubber'}
                    </div>
                </div>
            </div>

            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-wrap gap-1.5 bg-slate-800/90 border border-slate-600 rounded-xl p-2 max-w-[75%]">
                <button onClick={addMonomer} className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white rounded px-2 py-1">+ Monomer</button>
                <button onClick={branchMonomer} className="text-xs bg-amber-700 hover:bg-amber-600 text-white rounded px-2 py-1">+ Branch</button>
                <button onClick={addCrossLink} className="text-xs bg-cyan-700 hover:bg-cyan-600 text-white rounded px-2 py-1">+ Cross-link</button>
                <button onClick={reset} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded px-2 py-1">Reset</button>
            </div>
        </div>
    );
};
