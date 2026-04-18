import { useRef, useEffect, useCallback, useState } from 'react';

interface B14DNALabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const BASE_PAIRS: Array<[string, string]> = [
    ['A', 'T'], ['G', 'C'], ['C', 'G'], ['T', 'A'], ['A', 'T'], ['C', 'G'], ['G', 'C'], ['T', 'A']
];

const BASE_COLORS: Record<string, string> = {
    A: '#f59e0b',
    T: '#06b6d4',
    G: '#8b5cf6',
    C: '#22c55e'
};

export const B14DNALab = ({ state, onStateChange }: B14DNALabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const angleRef = useRef(0);

    const [unzipped, setUnzipped] = useState(false);
    const [sequence, setSequence] = useState('ATG-GCT-TAA');

    const phase = (state.phase as string) || 'intro';

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        angleRef.current += 0.03;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DNA & Genetics Lab', W / 2, 26);

        const cx = W * 0.35;
        const topY = H * 0.14;
        const helixH = H * 0.58;

        // Draw DNA ladder/helix
        for (let i = 0; i < BASE_PAIRS.length; i++) {
            const t = i / (BASE_PAIRS.length - 1);
            const y = topY + t * helixH;
            const a = angleRef.current + t * Math.PI * 2;
            const spread = unzipped ? 60 : 22;
            const x1 = cx - Math.cos(a) * spread;
            const x2 = cx + Math.cos(a) * spread;

            // Backbone strands
            if (i < BASE_PAIRS.length - 1) {
                const t2 = (i + 1) / (BASE_PAIRS.length - 1);
                const y2 = topY + t2 * helixH;
                const a2 = angleRef.current + t2 * Math.PI * 2;
                const nx1 = cx - Math.cos(a2) * spread;
                const nx2 = cx + Math.cos(a2) * spread;
                ctx.strokeStyle = '#64748b';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(nx1, y2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x2, y);
                ctx.lineTo(nx2, y2);
                ctx.stroke();
            }

            // Base pair rung
            const [l, r] = BASE_PAIRS[i];
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();

            // Left base
            ctx.fillStyle = BASE_COLORS[l];
            ctx.beginPath();
            ctx.arc(x1, y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(l, x1, y + 3);

            // Right base
            ctx.fillStyle = BASE_COLORS[r];
            ctx.beginPath();
            ctx.arc(x2, y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0f172a';
            ctx.fillText(r, x2, y + 3);

            // Hydrogen bonds (dashed)
            ctx.strokeStyle = 'rgba(148,163,184,0.6)';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);
            const bonds = (l === 'A' || l === 'T') ? 2 : 3;
            for (let b = 0; b < bonds; b++) {
                const by = y - 2 + b * 2;
                ctx.beginPath();
                ctx.moveTo(x1 + 7, by);
                ctx.lineTo(x2 - 7, by);
                ctx.stroke();
            }
            ctx.setLineDash([]);
        }

        // Legend
        const lx = W * 0.07;
        const ly = H * 0.74;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(lx, ly, W * 0.52, H * 0.2);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(lx, ly, W * 0.52, H * 0.2);

        const legend = [
            ['A', 'Adenine'],
            ['T', 'Thymine'],
            ['G', 'Guanine'],
            ['C', 'Cytosine']
        ] as const;
        legend.forEach(([base, name], i) => {
            const x = lx + 10 + (i % 2) * 120;
            const y = ly + 16 + Math.floor(i / 2) * 24;
            ctx.fillStyle = BASE_COLORS[base];
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.font = '10px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`${base} = ${name}`, x + 10, y + 3);
        });

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText('Pairing rules: A↔T, G↔C', lx + 8, ly + 62);

        // Sequence decode panel
        const dx = W * 0.62;
        const dy = H * 0.22;
        const dw = W * 0.33;
        const dh = H * 0.56;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(dx, dy, dw, dh);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(dx, dy, dw, dh);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Protein Decoder', dx + dw / 2, dy + 16);

        ctx.font = '11px monospace';
        ctx.fillStyle = '#93c5fd';
        ctx.fillText(sequence, dx + dw / 2, dy + 32);

        const codons = sequence.split('-').filter(Boolean);
        const codonMeaning = codons.map(c => {
            if (c === 'ATG') return 'START';
            if (c === 'TAA' || c === 'TAG' || c === 'TGA') return 'STOP';
            if (c === 'GCT') return 'Alanine';
            return 'Amino Acid';
        });

        codonMeaning.forEach((m, i) => {
            ctx.fillStyle = m === 'START' ? '#22c55e' : m === 'STOP' ? '#ef4444' : '#fbbf24';
            ctx.font = '10px monospace';
            ctx.fillText(`${codons[i]} → ${m}`, dx + dw / 2, dy + 50 + i * 14);
        });

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText(unzipped ? 'Replication: strands separated' : 'Double helix: compact code', dx + dw / 2, dy + dh - 12);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 14 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Is Information Coded and Transmitted?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P14 Waves & Signals', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C14 Chemical Bonding', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B14 DNA & Genetics', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Information coded → transmitted → decoded!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [unzipped, sequence, phase]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        });
        obs.observe(container);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    const complement = (seq: string) => seq.replace(/[ATGC]/g, c => ({ A: 'T', T: 'A', G: 'C', C: 'G' }[c] || c));

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />

            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[220px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>

                <button onClick={() => setUnzipped(v => !v)}
                    className={`text-xs rounded px-2 py-1 ${unzipped ? 'bg-violet-700 text-white' : 'bg-slate-700 text-slate-200'}`}>
                    {unzipped ? 'Zip Helix' : 'Unzip Helix'}
                </button>

                <label className="text-slate-300 text-xs">DNA Sequence (codons)</label>
                <input
                    type="text"
                    value={sequence}
                    onChange={e => {
                        const s = e.target.value.toUpperCase().replace(/[^ATGC-]/g, '');
                        setSequence(s);
                        onStateChange('sequence', s);
                    }}
                    className="w-full bg-slate-700 text-slate-100 text-xs px-2 py-1 rounded border border-slate-600"
                />
                <div className="text-xs text-slate-400">Complement: <span className="text-emerald-300">{complement(sequence.replace(/-/g, '')).replace(/(.{3})/g, '$1-').replace(/-$/, '')}</span></div>
            </div>
        </div>
    );
};
