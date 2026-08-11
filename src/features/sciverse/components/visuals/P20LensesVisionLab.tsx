import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P20LensesVisionLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P20LensesVisionLab = ({ onStateChange }: P20LensesVisionLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [opticType, setOpticType] = useState<'convex-lens' | 'concave-lens' | 'concave-mirror'>('convex-lens');
    const [focalLengthCm, setFocalLengthCm] = useState(20);
    const [objectDistanceCm, setObjectDistanceCm] = useState(45);

    const imageDistance = useMemo(() => {
        const f = opticType === 'concave-lens' ? -focalLengthCm : focalLengthCm;
        const d = Math.max(0.1, objectDistanceCm);
        const denom = (1 / f) - (1 / d);
        if (Math.abs(denom) < 0.0001) return 999;
        return 1 / denom;
    }, [opticType, focalLengthCm, objectDistanceCm]);

    const magnification = useMemo(() => Number((-imageDistance / Math.max(0.1, objectDistanceCm)).toFixed(2)), [imageDistance, objectDistanceCm]);
    const imageType = useMemo(() => {
        if (opticType === 'concave-lens') return 'virtual';
        return imageDistance > 0 ? 'real' : 'virtual';
    }, [opticType, imageDistance]);
    const orientation = useMemo(() => {
        if (opticType === 'concave-lens') return 'upright';
        return magnification >= 0 ? 'upright' : 'inverted';
    }, [opticType, magnification]);
    const focusQuality = imageType === 'real'
        ? Math.max(0, 100 - Math.abs(Math.abs(imageDistance) - 60))
        : Math.max(45, 88 - Math.abs(Math.abs(imageDistance) - 30));
    const opticLabel = opticType === 'convex-lens' ? 'Convex Lens' : opticType === 'concave-lens' ? 'Concave Lens' : 'Concave Mirror';

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const cy = H * 0.5;
        const lensX = W * 0.48;
        const scale = W / 300;

        // Dynamic px-per-cm so max object distance (120 cm) always fits on canvas
        const maxObjCm = 120;
        const leftPad = 20;                          // px margin from left edge
        const pxPerCm = (lensX - leftPad) / maxObjCm;

        // Principal axis
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(W, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Lens/mirror
        const lensH = H * 0.55;
        if (opticType === 'concave-mirror') {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(lensX + 40 * scale, cy, lensH * 0.7, Math.PI * 0.62, Math.PI * 1.38);
            ctx.stroke();
        } else if (opticType === 'convex-lens') {
            // Convex lens: fat middle, thin edges (football shape)
            ctx.strokeStyle = '#6366f1';
            ctx.fillStyle = 'rgba(147,197,253,0.25)';
            ctx.lineWidth = 3;
            const curve = 18 * scale;
            ctx.beginPath();
            ctx.moveTo(lensX, cy - lensH / 2);
            ctx.quadraticCurveTo(lensX + curve, cy, lensX, cy + lensH / 2);
            ctx.quadraticCurveTo(lensX - curve, cy, lensX, cy - lensH / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // Concave lens: thin middle, thick edges (hourglass shape)
            const edgeW = 12 * scale;   // half-thickness at top/bottom edges
            const cave = 14 * scale;    // how far surfaces curve inward
            ctx.strokeStyle = '#f472b6';
            ctx.fillStyle = 'rgba(244,114,182,0.18)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            // top-left → left surface curves inward (right) → bottom-left
            ctx.moveTo(lensX - edgeW, cy - lensH / 2);
            ctx.quadraticCurveTo(lensX - edgeW + cave, cy, lensX - edgeW, cy + lensH / 2);
            // bottom edge
            ctx.lineTo(lensX + edgeW, cy + lensH / 2);
            // bottom-right → right surface curves inward (left) → top-right
            ctx.quadraticCurveTo(lensX + edgeW - cave, cy, lensX + edgeW, cy - lensH / 2);
            // top edge
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // Focal point markers
        const fPx = focalLengthCm * pxPerCm;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(lensX - fPx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lensX + fPx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#b45309';
        ctx.fillText('F', lensX - fPx, cy + 20);
        ctx.fillText('F', lensX + fPx, cy + 20);
        ctx.textAlign = 'left';

        // Object arrow
        const objX = lensX - objectDistanceCm * pxPerCm;
        const objH = 40 * scale;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(objX, cy);
        ctx.lineTo(objX, cy - objH);
        ctx.lineTo(objX + 6, cy - objH + 8);
        ctx.moveTo(objX, cy - objH);
        ctx.lineTo(objX - 6, cy - objH + 8);
        ctx.stroke();

        // Image arrow
        const imgDist = Math.abs(imageDistance) > 900 ? 120 : Math.abs(imageDistance);
        const imgX = lensX + imgDist * pxPerCm * (imageDistance > 0 ? 1 : -1);
        const imgH = objH * Math.abs(magnification);
        const imgDir = orientation === 'inverted' ? 1 : -1;
        const clampedImgX = Math.max(20, Math.min(W - 20, imgX));
        ctx.strokeStyle = imageType === 'real' ? '#22c55e' : '#f97316';
        ctx.lineWidth = 3.5;
        if (imageType === 'virtual') ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(clampedImgX, cy);
        ctx.lineTo(clampedImgX, cy + imgDir * Math.min(imgH, H * 0.35));
        ctx.stroke();
        ctx.setLineDash([]);

        // Ray traces (simplified)
        ctx.strokeStyle = 'rgba(56,189,248,0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(objX, cy - objH);
        ctx.lineTo(lensX, cy - objH);
        ctx.lineTo(clampedImgX, cy + imgDir * Math.min(imgH, H * 0.35));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(objX, cy - objH);
        ctx.lineTo(lensX, cy);
        ctx.lineTo(clampedImgX, cy + imgDir * Math.min(imgH, H * 0.35));
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${opticLabel} | ${orientation} ${imageType}`, 14, 22);
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`Focus Quality ${Math.round(focusQuality)}%`, 14, 40);

        animRef.current = requestAnimationFrame(draw);
    }, [opticType, focalLengthCm, objectDistanceCm, imageDistance, magnification, imageType, orientation, opticLabel, focusQuality]);

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
                <label className="text-[10px] text-slate-600">Optic Type</label>
                <select className="w-full bg-slate-100 border border-slate-300 rounded p-1 text-[10px] text-slate-700 mb-1"
                    value={opticType}
                    onChange={e => { const v = e.target.value as 'convex-lens' | 'concave-lens' | 'concave-mirror'; setOpticType(v); onStateChange('opticType', v); }}>
                    <option value="convex-lens">Convex Lens</option>
                    <option value="concave-lens">Concave Lens</option>
                    <option value="concave-mirror">Concave Mirror</option>
                </select>
                <label className="text-[10px] text-slate-600">Focal Length: {focalLengthCm} cm</label>
                <input className="w-full accent-indigo-500" type="range" min={8} max={40} value={focalLengthCm}
                    onChange={e => { const v = Number(e.target.value); setFocalLengthCm(v); onStateChange('focalLengthCm', v); }} />
                <label className="text-[10px] text-slate-600">Object Distance: {objectDistanceCm} cm</label>
                <input className="w-full accent-cyan-500" type="range" min={12} max={120} value={objectDistanceCm}
                    onChange={e => { const v = Number(e.target.value); setObjectDistanceCm(v); onStateChange('objectDistanceCm', v); }} />
            </div>
        </div>
    );
};