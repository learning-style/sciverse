import { useLayoutEffect, useRef } from 'react';
import { useSciverse } from '../context/SciverseContext';
import { toPixels, PHYSICS_CONFIG } from '../config/physicsConfig';
import { PhysicsEntity } from '../types';

interface PhysicsViewportProps {
    onResize?: (width: number, height: number) => void;
    theme?: 'light' | 'dark';
}

export const PhysicsViewport = ({ onResize, theme = 'light' }: PhysicsViewportProps) => {
    const { containerRef, canvasRef, snapshot } = useSciverse();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!wrapperRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (onResize) {
                    onResize(entry.contentRect.width, entry.contentRect.height);
                }
            }
        });
        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, [onResize]);

    const handleRef = (el: HTMLDivElement | null) => {
        wrapperRef.current = el;
        containerRef(el);
    };

    const primaryEntity = snapshot?.entities.find(e => !e.isStatic);
    
    // Theme configurations
    const isLight = theme === 'light';
    const bgColor = isLight ? 'bg-slate-50' : 'bg-slate-950';
    const borderColor = isLight ? 'border-slate-200' : 'border-slate-800';
    const gridColor = isLight ? '#cbd5e1' : '#475569';
    const floorColor = isLight ? 'border-slate-300 bg-slate-200/50' : 'border-slate-700 bg-slate-800/50';
    const textColor = isLight ? 'text-slate-600' : 'text-slate-400';

    return (
        <div 
            ref={handleRef} 
            className={`relative w-full h-full ${bgColor} rounded-xl overflow-hidden border ${borderColor} shadow-inner group transition-colors duration-300`}
        >
            {/* 1. Grid Layer */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" 
                style={{ 
                    backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
                    backgroundSize: `${PHYSICS_CONFIG.METER_TO_PIXEL}px ${PHYSICS_CONFIG.METER_TO_PIXEL}px`
                }}
            />

            {/* 2. Visual Floor */}
            <div 
                className={`absolute w-full border-t-4 ${floorColor} pointer-events-none backdrop-blur-sm flex items-center justify-center`}
                style={{ bottom: 0, height: '40px' }}
            >
                {/* C14 Update: Explicit "LAB BENCH" Label for user clarity */}
                <div className={`text-sm font-bold tracking-[0.2em] opacity-40 ${textColor}`}>
                    LAB BENCH
                </div>
            </div>

            {/* 3. Matter.js Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            {/* 4. SVG Overlay Layer */}
            <svg 
                className="absolute inset-0 pointer-events-none w-full h-full overflow-visible"
                data-testid="overlay-layer"
            >
                <defs>
                    <marker id="arrow-v" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                </defs>

                {snapshot?.entities.map(entity => (
                    <EntityOverlay key={entity.id} entity={entity} theme={theme} />
                ))}
            </svg>

            {/* 5. Live Metrics HUD */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none transition-opacity duration-500">
                {primaryEntity ? (
                    <>
                        <MetricRow label="Vx" value={primaryEntity.velocity.x.toFixed(2)} unit="m/s" color="text-emerald-500" theme={theme} />
                        <MetricRow label="Pos" value={primaryEntity.position.x.toFixed(2)} unit="m" color={isLight ? 'text-slate-600' : 'text-slate-300'} theme={theme} />
                    </>
                ) : (
                    <span className={`text-xs uppercase tracking-wider font-mono ${textColor}`}>System Idle</span>
                )}
            </div>
        </div>
    );
};

const EntityOverlay = ({ entity, theme }: { entity: PhysicsEntity, theme: string }) => {
    const px = toPixels(entity.position.x);
    const py = toPixels(entity.position.y);
    const isLight = theme === 'light';
    
    const labelColor = entity.color || (isLight ? '#334155' : '#cbd5e1');

    return (
        <g transform={`translate(${px}, ${py})`} data-testid={`entity-${entity.label}`}>
            {/* Visual Guide Arrow - C14 Update: Ensure visibility */}
            {entity.highlight && (
                <g className="animate-bounce">
                    <path d="M 0 -50 L 0 -30" stroke="#f59e0b" strokeWidth="3" />
                    <path d="M -5 -35 L 0 -30 L 5 -35" stroke="#f59e0b" strokeWidth="3" fill="none" />
                    <text y="-60" textAnchor="middle" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        {entity.label.toUpperCase()}
                    </text>
                </g>
            )}

            {/* Velocity Vector */}
            {!entity.isStatic && (
                <VectorArrow vector={entity.velocity} color="#10b981" scale={15} marker="arrow-v" />
            )}

            {/* Text Label (Only show if not highlighted, to avoid clutter) */}
            {!entity.highlight && (
                 <text 
                    y={-25} 
                    textAnchor="middle" 
                    fill={labelColor} 
                    fontSize="12" 
                    fontFamily="monospace" 
                    fontWeight="bold"
                    className="drop-shadow-sm"
                >
                    {entity.label.toUpperCase()}
                </text>
            )}
            
            {/* Position Marker */}
            <circle r="6" fill={entity.color || '#cbd5e1'} stroke={isLight ? '#64748b' : '#0f172a'} strokeWidth="2" />
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

const MetricRow = ({ label, value, unit, color, theme }: { label: string, value: string, unit: string, color: string, theme: string }) => {
    const bg = theme === 'light' ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-700/50';
    return (
        <div className={`${bg} backdrop-blur px-3 py-1.5 rounded border flex items-center gap-3 shadow-lg`}>
            <span className="text-slate-500 font-mono text-xs font-bold w-4">{label}</span>
            <span className={`font-mono text-sm ${color}`}>{value}</span>
            <span className="text-slate-500 text-xs">{unit}</span>
        </div>
    );
};