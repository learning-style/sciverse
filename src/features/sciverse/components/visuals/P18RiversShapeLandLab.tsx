import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P18RiversShapeLandLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P18RiversShapeLandLab = ({ onStateChange }: P18RiversShapeLandLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [flow, setFlow] = useState(55);
    const [slope, setSlope] = useState(40);
    const [sediment, setSediment] = useState(45);

    const erosion = useMemo(() => Math.max(0, Math.min(100, Math.round(flow * 0.45 + slope * 0.45 - sediment * 0.18))), [flow, slope, sediment]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const slopeFrac = slope / 100;
        const flowFrac = flow / 100;
        const sedFrac = sediment / 100;

        // ── Sky gradient ──
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.25);
        skyGrad.addColorStop(0, '#bae6fd');
        skyGrad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H * 0.35);

        // Sun
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(W * 0.85, H * 0.08, 18, 0, Math.PI * 2);
        ctx.fill();

        // Clouds
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        for (const cx of [W * 0.15, W * 0.55]) {
            ctx.beginPath();
            ctx.arc(cx, H * 0.06, 14, 0, Math.PI * 2);
            ctx.arc(cx + 16, H * 0.05, 12, 0, Math.PI * 2);
            ctx.arc(cx + 8, H * 0.03, 10, 0, Math.PI * 2);
            ctx.fill();
        }

        // ── Terrain: the terrain itself tilts with slope ──
        // Left side is higher when slope > 0, right side lower — river runs downhill left→right
        const terrainBaseY = H * 0.30;
        const leftElev = terrainBaseY - slopeFrac * H * 0.18;
        const rightElev = terrainBaseY + slopeFrac * H * 0.12;

        // Grass surface on banks
        const bankLeft = W * 0.28;
        const bankRight = W * 0.72;

        // Left hillside with layered terrain
        const leftGrad = ctx.createLinearGradient(0, leftElev, 0, H);
        leftGrad.addColorStop(0, '#65a30d');
        leftGrad.addColorStop(0.05, '#4d7c0f');
        leftGrad.addColorStop(0.12, '#92400e');
        leftGrad.addColorStop(0.3, '#78350f');
        leftGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = leftGrad;
        ctx.beginPath();
        ctx.moveTo(0, leftElev - H * 0.02);
        ctx.quadraticCurveTo(bankLeft * 0.5, leftElev, bankLeft, leftElev + H * 0.10);
        ctx.lineTo(bankLeft, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();

        // Right hillside
        const rightGrad = ctx.createLinearGradient(0, rightElev, 0, H);
        rightGrad.addColorStop(0, '#65a30d');
        rightGrad.addColorStop(0.05, '#4d7c0f');
        rightGrad.addColorStop(0.12, '#78350f');
        rightGrad.addColorStop(0.3, '#451a03');
        rightGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = rightGrad;
        ctx.beginPath();
        ctx.moveTo(bankRight, rightElev + H * 0.10);
        ctx.quadraticCurveTo(bankRight + (W - bankRight) * 0.5, rightElev, W, rightElev - H * 0.02);
        ctx.lineTo(W, H);
        ctx.lineTo(bankRight, H);
        ctx.closePath();
        ctx.fill();

        // Trees on left bank
        for (let i = 0; i < 4; i++) {
            const tx = 12 + i * (bankLeft * 0.22);
            const treeBaseY = leftElev - H * 0.02 + (tx / bankLeft) * H * 0.10;
            // Trunk
            ctx.fillStyle = '#78350f';
            ctx.fillRect(tx - 2, treeBaseY - 18, 4, 18);
            // Canopy
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.arc(tx, treeBaseY - 22, 8, 0, Math.PI * 2);
            ctx.fill();
        }

        // Trees on right bank
        for (let i = 0; i < 3; i++) {
            const tx = bankRight + 20 + i * ((W - bankRight) * 0.28);
            const treeBaseY = rightElev - H * 0.02 + ((tx - bankRight) / (W - bankRight)) * H * 0.10;
            ctx.fillStyle = '#78350f';
            ctx.fillRect(tx - 2, treeBaseY - 16, 4, 16);
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.arc(tx, treeBaseY - 20, 7, 0, Math.PI * 2);
            ctx.fill();
        }

        // Rock layers in bank cross-section
        for (let i = 0; i < 3; i++) {
            const layerY = leftElev + H * 0.14 + i * H * 0.12;
            ctx.strokeStyle = `rgba(120,53,15,${0.2 + i * 0.1})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(0, layerY);
            ctx.lineTo(bankLeft, layerY + H * 0.03);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(bankRight, layerY + H * 0.03);
            ctx.lineTo(W, layerY);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // ── River channel ──
        const leftBankY = leftElev + H * 0.10;
        const rightBankY = rightElev + H * 0.10;
        const cutDepth = (erosion / 100) * H * 0.28;
        const riverSurfL = leftBankY + 4;
        const riverSurfR = rightBankY + 4;
        const riverBedL = riverSurfL + cutDepth;
        const riverBedR = riverSurfR + cutDepth;

        // River water body
        const waterGrad = ctx.createLinearGradient(0, riverSurfL, 0, riverBedL);
        waterGrad.addColorStop(0, '#3b82f6');
        waterGrad.addColorStop(0.5, '#1e40af');
        waterGrad.addColorStop(1, '#1e3a5f');
        ctx.fillStyle = waterGrad;
        ctx.beginPath();
        ctx.moveTo(bankLeft, riverSurfL);
        ctx.lineTo(bankRight, riverSurfR);
        ctx.lineTo(bankRight, riverBedR);
        ctx.quadraticCurveTo(W * 0.5, Math.max(riverBedL, riverBedR) + 12, bankLeft, riverBedL);
        ctx.closePath();
        ctx.fill();

        // Water surface highlight
        ctx.strokeStyle = 'rgba(147,197,253,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bankLeft, riverSurfL);
        ctx.lineTo(bankRight, riverSurfR);
        ctx.stroke();

        // Slope indicator arrow on water surface
        if (slopeFrac > 0.05) {
            const arrowY = (riverSurfL + riverSurfR) / 2 - 18;
            const arrowXL = bankLeft + 20;
            const arrowXR = bankRight - 20;
            ctx.strokeStyle = '#0369a1';
            ctx.fillStyle = '#0369a1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(arrowXL, arrowY - slopeFrac * 12);
            ctx.lineTo(arrowXR, arrowY + slopeFrac * 8);
            ctx.stroke();
            // Arrowhead
            ctx.beginPath();
            ctx.moveTo(arrowXR, arrowY + slopeFrac * 8);
            ctx.lineTo(arrowXR - 8, arrowY + slopeFrac * 8 - 5);
            ctx.lineTo(arrowXR - 8, arrowY + slopeFrac * 8 + 5);
            ctx.closePath();
            ctx.fill();
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('downhill →', (arrowXL + arrowXR) / 2, arrowY - slopeFrac * 6 - 4);
        }

        // Flow current arrows (animated)
        const numLines = 4 + Math.round(flowFrac * 6);
        for (let i = 0; i < numLines; i++) {
            const frac = i / numLines;
            const ly = riverSurfL + 6 + frac * (cutDepth - 12);
            const lyR = riverSurfR + 6 + frac * (cutDepth - 12);
            const speed = 0.3 + flowFrac * 0.7;
            const offset = ((t * speed * 80 + i * 40) % (bankRight - bankLeft));
            const sx = bankLeft + offset;
            const lineLen = 16 + flowFrac * 30;
            const lineY = ly + (lyR - ly) * (offset / (bankRight - bankLeft));
            ctx.strokeStyle = `rgba(147,197,253,${0.5 + flowFrac * 0.4})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(sx, lineY);
            ctx.lineTo(Math.min(sx + lineLen, bankRight - 4), lineY + Math.sin(t * 3 + i) * 2);
            ctx.stroke();
            // Small arrowhead
            if (sx + lineLen < bankRight) {
                ctx.beginPath();
                ctx.moveTo(sx + lineLen, lineY);
                ctx.lineTo(sx + lineLen - 4, lineY - 2);
                ctx.moveTo(sx + lineLen, lineY);
                ctx.lineTo(sx + lineLen - 4, lineY + 2);
                ctx.stroke();
            }
        }

        // Sediment particles at river bed
        const numSed = Math.round(sedFrac * 25);
        for (let i = 0; i < numSed; i++) {
            const sFrac = ((i * 37 + t * 25 * flowFrac) % (bankRight - bankLeft - 20)) / (bankRight - bankLeft - 20);
            const sx = bankLeft + 10 + sFrac * (bankRight - bankLeft - 20);
            const bedY = riverBedL + (riverBedR - riverBedL) * sFrac;
            const sy = bedY - 3 - (i % 4) * 4;
            const r = 2 + sedFrac * 2 + (i % 3);
            ctx.fillStyle = `rgba(180,83,9,${0.5 + sedFrac * 0.4})`;
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Erosion zones on banks – highlighted and labelled
        if (erosion > 15) {
            const eFrac = Math.min(1, erosion / 100);
            const scarH = cutDepth * 0.85;

            // Left bank eroded face (yellow-orange on brown)
            ctx.fillStyle = `rgba(251,191,36,${0.25 + eFrac * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(bankLeft, riverSurfL + 2);
            ctx.lineTo(bankLeft - 4 - eFrac * 10, riverSurfL + scarH * 0.5);
            ctx.lineTo(bankLeft, riverSurfL + scarH);
            ctx.closePath();
            ctx.fill();

            // Right bank eroded face
            ctx.beginPath();
            ctx.moveTo(bankRight, riverSurfR + 2);
            ctx.lineTo(bankRight + 4 + eFrac * 10, riverSurfR + scarH * 0.5);
            ctx.lineTo(bankRight, riverSurfR + scarH);
            ctx.closePath();
            ctx.fill();

            // Crumbling chunks falling from banks
            ctx.fillStyle = `rgba(180,83,9,${0.5 + eFrac * 0.4})`;
            const chunkCount = Math.round(eFrac * 8);
            for (let i = 0; i < chunkCount; i++) {
                const side = i % 2 === 0 ? -1 : 1;
                const baseX = side < 0 ? bankLeft : bankRight;
                const baseY = side < 0 ? riverSurfL : riverSurfR;
                const cx2 = baseX + side * (3 + (i * 7 % 10));
                const cy2 = baseY + 6 + ((i * 13) % Math.max(1, Math.round(scarH - 8)));
                ctx.beginPath();
                ctx.arc(cx2, cy2, 2 + (i % 3), 0, Math.PI * 2);
                ctx.fill();
            }

            // Erosion crack lines (yellow on brown bank)
            ctx.strokeStyle = `rgba(250,204,21,${0.5 + eFrac * 0.4})`;
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 4; i++) {
                const sy = riverSurfL + 6 + (scarH * 0.8 / 4) * i;
                ctx.beginPath();
                ctx.moveTo(bankLeft - 1, sy);
                ctx.lineTo(bankLeft + 5 + eFrac * 6, sy + 4);
                ctx.lineTo(bankLeft + 2, sy + 8);
                ctx.stroke();
                const syR = riverSurfR + 6 + (scarH * 0.8 / 4) * i;
                ctx.beginPath();
                ctx.moveTo(bankRight + 1, syR);
                ctx.lineTo(bankRight - 5 - eFrac * 6, syR + 4);
                ctx.lineTo(bankRight - 2, syR + 8);
                ctx.stroke();
            }

            // "ERODED" labels – spaced monospace for clarity
            const erodedText = 'E R O D E D';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            // Left label
            ctx.save();
            ctx.translate(bankLeft - 16 - eFrac * 6, riverSurfL + scarH * 0.45);
            ctx.rotate(-Math.PI / 2);
            ctx.strokeStyle = '#451a03';
            ctx.lineWidth = 3;
            ctx.strokeText(erodedText, 0, 0);
            ctx.fillStyle = '#fef08a';
            ctx.fillText(erodedText, 0, 0);
            ctx.restore();
            // Right label
            ctx.save();
            ctx.translate(bankRight + 16 + eFrac * 6, riverSurfR + scarH * 0.45);
            ctx.rotate(Math.PI / 2);
            ctx.strokeStyle = '#451a03';
            ctx.lineWidth = 3;
            ctx.strokeText(erodedText, 0, 0);
            ctx.fillStyle = '#fef08a';
            ctx.fillText(erodedText, 0, 0);
            ctx.restore();
        }

        // ── Metrics (top-right, away from control box) ──
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`Erosion ${erosion}%`, W - 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = erosion >= 60 ? '#dc2626' : '#15803d';
        ctx.fillText(erosion >= 60 ? 'erosion: high cutting' : 'erosion: moderate', W - 14, 38);

        // ── Summary table (top-right) ──
        const tblX = W - 168;
        const tblY = H * 0.08 + 26;   // below sun circle (center H*0.08, r=18)
        const tblW = 156;
        const rowH = 14;
        const rows = [
            { label: 'Flow Rate', value: `${flow}%`, color: '#0891b2' },
            { label: 'Terrain Slope', value: `${slope}%`, color: '#16a34a' },
            { label: 'Sediment Load', value: `${sediment}%`, color: '#d97706' },
            { label: 'Erosion', value: `${erosion}%`, color: erosion >= 60 ? '#dc2626' : '#15803d' },
        ];
        const tblH = rowH * rows.length + 18;
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.fillRect(tblX, tblY, tblW, tblH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(tblX, tblY, tblW, tblH);
        // Header
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('RIVER SUMMARY', tblX + 6, tblY + 12);
        // Rows
        ctx.font = '9px monospace';
        for (let i = 0; i < rows.length; i++) {
            const ry = tblY + 18 + i * rowH;
            if (i % 2 === 0) {
                ctx.fillStyle = 'rgba(241,245,249,0.6)';
                ctx.fillRect(tblX + 1, ry, tblW - 2, rowH);
            }
            ctx.fillStyle = '#475569';
            ctx.textAlign = 'left';
            ctx.fillText(rows[i].label, tblX + 6, ry + 10);
            ctx.fillStyle = rows[i].color;
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(rows[i].value, tblX + tblW - 6, ry + 10);
            ctx.font = '9px monospace';
        }

        // Slope label on terrain
        if (slopeFrac > 0.05) {
            ctx.save();
            const angle = Math.atan2(rightElev - leftElev, W * 0.6);
            ctx.translate(W * 0.5, (leftElev + rightElev) / 2 - 6);
            ctx.rotate(angle);
            ctx.fillStyle = '#92400e';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`terrain slope ${slope}%`, 0, 0);
            ctx.restore();
        }

        animRef.current = requestAnimationFrame(draw);
    }, [flow, slope, sediment, erosion]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[180px] shadow-md">
                <label className="text-[10px] text-slate-600">Flow Rate: {flow}</label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={flow}
                    onChange={e => { const v = Number(e.target.value); setFlow(v); onStateChange('flow', v); }} />
                <label className="text-[10px] text-slate-600">Terrain Slope: {slope}%</label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={slope}
                    onChange={e => { const v = Number(e.target.value); setSlope(v); onStateChange('slope', v); }} />
                <label className="text-[10px] text-slate-600">Sediment Load: {sediment}</label>
                <input className="w-full accent-amber-500" type="range" min={0} max={100} value={sediment}
                    onChange={e => { const v = Number(e.target.value); setSediment(v); onStateChange('sediment', v); }} />
            </div>
        </div>
    );
};