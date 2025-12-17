import { useSciverse } from '../context/SciverseContext';
import { toPixels } from '../config/physicsConfig';

export const PhysicsViewport = () => {
    // Viewport now acts as a "View" component.
    // It consumes the engine state and attaches the refs from the Context.
    const { containerRef, canvasRef, snapshot } = useSciverse();

    const primaryEntity = snapshot?.entities.find(e => e.label === 'Projectile');

    return (
        <div 
            ref={containerRef} 
            className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner"
        >
            {/* Matter.js Canvas (Attached via Context Ref) */}
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            {/* Vector Overlay Layer (SVG) */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible">
                <defs>
                    <marker id="arrow-v" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                    <marker id="arrow-a" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                    </marker>
                </defs>

                {primaryEntity && (
                    <>
                        {/* Velocity Vector (Green) */}
                        <VectorArrow 
                            origin={primaryEntity.position}
                            vector={primaryEntity.velocity}
                            color="#10b981"
                            scale={20} // Visual scale factor
                            marker="arrow-v"
                        />
                        {/* We could add Acceleration Vector here in future */}
                    </>
                )}
            </svg>

            {/* Live Metrics HUD */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {primaryEntity ? (
                    <>
                        <MetricRow label="Vx" value={primaryEntity.velocity.x.toFixed(2)} unit="m/s" color="text-emerald-400" />
                        <MetricRow label="Vy" value={(-primaryEntity.velocity.y).toFixed(2)} unit="m/s" color="text-emerald-400" />
                        {/* Display Height (assuming floor is at y=8m approx) */}
                        <MetricRow label="Py" value={((8 - primaryEntity.position.y)).toFixed(2)} unit="m" color="text-slate-300" />
                    </>
                ) : (
                    <span className="text-slate-500 text-xs uppercase tracking-wider">Ready to Fire</span>
                )}
            </div>
        </div>
    );
};

const VectorArrow = ({ origin, vector, color, scale, marker }: { origin: {x:number, y:number}, vector: {x:number, y:number}, color: string, scale: number, marker: string }) => {
    // Only draw if magnitude is significant
    if (Math.abs(vector.x) < 0.1 && Math.abs(vector.y) < 0.1) return null;

    const startX = toPixels(origin.x);
    const startY = toPixels(origin.y);
    const endX = startX + vector.x * scale;
    const endY = startY + vector.y * scale;

    return (
        <line 
            x1={startX} y1={startY} 
            x2={endX} y2={endY} 
            stroke={color} 
            strokeWidth="2" 
            markerEnd={`url(#${marker})`} 
        />
    );
};

const MetricRow = ({ label, value, unit, color }: { label: string, value: string, unit: string, color: string }) => (
    <div className="bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded border border-slate-700/50 flex items-center gap-3 shadow-sm">
        <span className="text-slate-500 font-mono text-xs font-bold w-4">{label}</span>
        <span className={`font-mono text-sm ${color}`}>{value}</span>
        <span className="text-slate-600 text-xs">{unit}</span>
    </div>
);