import { useSciverse } from '../context/SciverseContext';
import { toPixels, PHYSICS_CONFIG } from '../config/physicsConfig';
import { PhysicsEntity } from '../types';

export const PhysicsViewport = () => {
    const { containerRef, canvasRef, snapshot } = useSciverse();

    const primaryEntity = snapshot?.entities.find(e => !e.isStatic);
    const floorY = toPixels(8); 

    return (
        <div 
            ref={containerRef} 
            className="relative w-full h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner group"
        >
            {/* 1. Grid Layer */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" 
                style={{ 
                    backgroundImage: `linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)`, 
                    backgroundSize: `${PHYSICS_CONFIG.METER_TO_PIXEL}px ${PHYSICS_CONFIG.METER_TO_PIXEL}px`
                }}
            />

            {/* 2. Visual Floor */}
            <div 
                className="absolute w-full border-t-2 border-indigo-500/50 bg-indigo-500/10 pointer-events-none"
                style={{ top: floorY, bottom: 0 }}
            >
                <div className="absolute top-2 right-2 text-xs text-indigo-400 font-mono">LAB FLOOR (y=8m)</div>
            </div>

            {/* 3. Matter.js Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            {/* 4. SVG Overlay Layer */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible">
                <defs>
                    <marker id="arrow-v" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                </defs>

                {snapshot?.entities.map(entity => (
                    <EntityOverlay key={entity.id} entity={entity} />
                ))}
            </svg>

            {/* 5. Live Metrics HUD */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none transition-opacity duration-500">
                {primaryEntity ? (
                    <>
                        <MetricRow label="Vx" value={primaryEntity.velocity.x.toFixed(2)} unit="m/s" color="text-emerald-400" />
                        <MetricRow label="Vy" value={(-primaryEntity.velocity.y).toFixed(2)} unit="m/s" color="text-emerald-400" />
                    </>
                ) : (
                    <span className="text-slate-500 text-xs uppercase tracking-wider font-mono">System Idle</span>
                )}
            </div>
        </div>
    );
};

const EntityOverlay = ({ entity }: { entity: PhysicsEntity }) => {
    const px = toPixels(entity.position.x);
    const py = toPixels(entity.position.y);

    return (
        <g transform={`translate(${px}, ${py})`}>
            {/* Velocity Vector */}
            {!entity.isStatic && (
                <VectorArrow vector={entity.velocity} color="#10b981" scale={15} marker="arrow-v" />
            )}

            {/* Visual Guide Arrow (Bounce Animation) */}
            {entity.highlight && (
                <g className="animate-bounce">
                    <path d="M 0 -60 L 0 -40 L -5 -45 M 0 -40 L 5 -45" stroke="#f59e0b" strokeWidth="3" fill="none" />
                    <text y="-70" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">HERE</text>
                </g>
            )}

            {/* Text Label */}
            <text 
                y={-25} 
                textAnchor="middle" 
                fill={entity.color || '#cbd5e1'} 
                fontSize="12" 
                fontFamily="monospace" 
                fontWeight="bold"
                className="drop-shadow-md"
                style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}
            >
                {entity.label.toUpperCase()}
            </text>
            
            {/* Position Marker */}
            <circle r="4" fill={entity.color || '#cbd5e1'} stroke="#0f172a" strokeWidth="2" />
        </g>
    );
};

const VectorArrow = ({ vector, color, scale, marker }: { vector: {x:number, y:number}, color: string, scale: number, marker: string }) => {
    if (Math.abs(vector.x) < 0.1 && Math.abs(vector.y) < 0.1) return null;

    const endX = vector.x * scale;
    const endY = vector.y * scale;

    return (
        <line 
            x1={0} y1={0} 
            x2={endX} y2={endY} 
            stroke={color} 
            strokeWidth="2" 
            markerEnd={`url(#${marker})`} 
        />
    );
};

const MetricRow = ({ label, value, unit, color }: { label: string, value: string, unit: string, color: string }) => (
    <div className="bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded border border-slate-700/50 flex items-center gap-3 shadow-lg">
        <span className="text-slate-500 font-mono text-xs font-bold w-4">{label}</span>
        <span className={`font-mono text-sm ${color}`}>{value}</span>
        <span className="text-slate-600 text-xs">{unit}</span>
    </div>
);