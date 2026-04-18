import { useState } from 'react';

interface C14BondingLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

type BondMode = 'ionic' | 'nonpolar' | 'polar';

export const C14BondingLab = ({ state, onStateChange }: C14BondingLabProps) => {
    void state;
    const [mode, setMode] = useState<BondMode>('ionic');
    const [distance, setDistance] = useState(70);

    const renderAtoms = () => {
        if (mode === 'ionic') {
            return {
                left: { label: 'Na', charge: '+', electrons: 1, color: '#f97316' },
                right: { label: 'Cl', charge: '-', electrons: 7, color: '#22c55e' },
                description: 'Ionic: full electron transfer from Na to Cl'
            };
        }
        if (mode === 'nonpolar') {
            return {
                left: { label: 'H', charge: '', electrons: 1, color: '#60a5fa' },
                right: { label: 'H', charge: '', electrons: 1, color: '#60a5fa' },
                description: 'Nonpolar Covalent: equal electron sharing'
            };
        }
        return {
            left: { label: 'H', charge: 'δ+', electrons: 1, color: '#93c5fd' },
            right: { label: 'O', charge: 'δ-', electrons: 6, color: '#ef4444' },
            description: 'Polar Covalent: unequal sharing (electrons pulled toward O)'
        };
    };

    const atoms = renderAtoms();

    const energy = Math.max(0, 100 - distance);

    return (
        <div className="relative w-full h-full bg-white p-3 flex flex-col overflow-hidden">
            <div className="text-center text-slate-100 font-bold text-base mb-2">Chemical Bonding Lab ⚛️</div>

            <div className="flex-1 bg-white border border-slate-200 rounded-lg relative overflow-hidden">
                {/* Bond scene */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    {/* Energy well background */}
                    <defs>
                        <linearGradient id="well" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#020617" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="100" height="100" fill="url(#well)" />

                    {/* Potential well curve */}
                    <path d="M 10 80 Q 50 25 90 80" fill="none" stroke="#334155" strokeWidth="0.7" />

                    {/* Atoms */}
                    <g>
                        <circle cx={50 - distance / 2} cy="45" r="10" fill={atoms.left.color} stroke="#0f172a" strokeWidth="1" />
                        <text x={50 - distance / 2} y="47" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">{atoms.left.label}</text>
                        {atoms.left.charge && <text x={50 - distance / 2 + 9} y="35" textAnchor="middle" fill="#f8fafc" fontSize="4.5">{atoms.left.charge}</text>}
                    </g>
                    <g>
                        <circle cx={50 + distance / 2} cy="45" r="10" fill={atoms.right.color} stroke="#0f172a" strokeWidth="1" />
                        <text x={50 + distance / 2} y="47" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">{atoms.right.label}</text>
                        {atoms.right.charge && <text x={50 + distance / 2 + 9} y="35" textAnchor="middle" fill="#f8fafc" fontSize="4.5">{atoms.right.charge}</text>}
                    </g>

                    {/* Bond visual */}
                    {distance < 58 && (
                        <>
                            <line
                                x1={50 - distance / 2 + 10}
                                y1="45"
                                x2={50 + distance / 2 - 10}
                                y2="45"
                                stroke={mode === 'ionic' ? '#facc15' : '#67e8f9'}
                                strokeWidth={mode === 'ionic' ? 1.5 : 2.2}
                                strokeDasharray={mode === 'ionic' ? '2 1' : 'none'}
                            />
                            {mode !== 'ionic' && (
                                <ellipse
                                    cx="50"
                                    cy="45"
                                    rx={mode === 'polar' ? 8 : 6}
                                    ry="3"
                                    fill={mode === 'polar' ? 'rgba(239,68,68,0.35)' : 'rgba(103,232,249,0.35)'}
                                />
                            )}
                        </>
                    )}

                    {/* Electron transfer arrow for ionic */}
                    {mode === 'ionic' && distance < 70 && (
                        <>
                            <line x1={50 - distance / 2 + 6} y1="32" x2={50 + distance / 2 - 6} y2="32" stroke="#facc15" strokeWidth="1" />
                            <polygon points={`${50 + distance / 2 - 6},32 ${50 + distance / 2 - 10},30 ${50 + distance / 2 - 10},34`} fill="#facc15" />
                            <text x="50" y="29" textAnchor="middle" fill="#fde68a" fontSize="3.7">e⁻ transfer</text>
                        </>
                    )}

                    {/* Energy indicator */}
                    <text x="50" y="72" textAnchor="middle" fill="#94a3b8" fontSize="4">Bond Energy Stability</text>
                    <rect x="20" y="75" width="60" height="4" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
                    <rect x="20" y="75" width={Math.max(3, energy * 0.6)} height="4" fill="#22c55e" />

                    <text x="50" y="86" textAnchor="middle" fill="#e2e8f0" fontSize="4.2">{atoms.description}</text>
                </svg>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <button onClick={() => { setMode('ionic'); onStateChange('bondType', 'ionic'); }}
                    className={`rounded py-1 border ${mode === 'ionic' ? 'bg-amber-700 text-white border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-600'}`}>
                    Ionic (NaCl)
                </button>
                <button onClick={() => { setMode('nonpolar'); onStateChange('bondType', 'nonpolar-covalent'); }}
                    className={`rounded py-1 border ${mode === 'nonpolar' ? 'bg-cyan-700 text-white border-cyan-500' : 'bg-slate-800 text-slate-300 border-slate-600'}`}>
                    Nonpolar Covalent (H2)
                </button>
                <button onClick={() => { setMode('polar'); onStateChange('bondType', 'polar'); }}
                    className={`rounded py-1 border ${mode === 'polar' ? 'bg-rose-700 text-white border-rose-500' : 'bg-slate-800 text-slate-300 border-slate-600'}`}>
                    Polar Covalent (H2O)
                </button>
            </div>

            <div className="mt-2 bg-slate-800 border border-slate-200 rounded p-2 text-xs text-slate-300">
                <div className="font-bold text-slate-200 mb-1">Distance Between Atoms: {distance}%</div>
                <input type="range" min={30} max={90} value={distance}
                    onChange={e => { setDistance(Number(e.target.value)); onStateChange('distance', Number(e.target.value)); }}
                    className="w-full accent-emerald-500" />
                <div className="mt-1 text-slate-400">
                    Closer atoms usually mean lower potential energy (more stable bond), until repulsion becomes too strong.
                </div>
            </div>

            <div data-lab-controls="true" className="absolute right-3 bottom-3 bg-slate-800/90 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300">
                Bond Type: <span className="text-emerald-300 font-bold">{mode}</span>
            </div>
        </div>
    );
};
