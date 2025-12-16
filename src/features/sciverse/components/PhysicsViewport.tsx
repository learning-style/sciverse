import { useEffect, useRef } from 'react';
import { useMatter } from '../hooks/useMatter';
import { Vector2D } from '../types';

interface PhysicsViewportProps {
    onInit?: (engine: any) => void;
    simStateRef?: React.MutableRefObject<any>;
}

export const PhysicsViewport = ({ onInit, simStateRef }: PhysicsViewportProps) => {
    const { containerRef, engine, simState } = useMatter();

    // Bubble up the engine instance to parent if needed
    useEffect(() => {
        if (engine && onInit) {
            onInit(engine);
        }
    }, [engine, onInit]);

    // Update parent's ref if provided (for Graphing component to read without re-renders)
    useEffect(() => {
        if (simStateRef && simState) {
            simStateRef.current = simState;
        }
    }, [simState, simStateRef]);

    // --- Overlay Rendering Helpers ---
    // Scale: 1 meter = 1 unit? 
    // Visualization factor for vectors
    const VEC_SCALE = 5; 

    return (
        <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Matter.js Canvas Container */}
            <div ref={containerRef} className="absolute inset-0" />

            {/* Vector Overlay Layer (SVG) */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full">
                {simState?.primaryObject && (
                    <>
                        {/* Velocity Vector (Green) */}
                        <VectorArrow 
                            origin={simState.primaryObject.position}
                            vector={simState.primaryObject.velocity}
                            color="#10b981" // emerald-500
                            scale={VEC_SCALE}
                            label="v"
                        />
                        {/* Net Force / Accel Vector (Yellow) - If we had force data */}
                    </>
                )}
            </svg>

            {/* UI Overlay: Metrics */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <MetricBadge label="v_x" value={simState?.primaryObject.velocity.x.toFixed(2) ?? '0.00'} unit="m/s" />
                <MetricBadge label="v_y" value={simState?.primaryObject.velocity.y.toFixed(2) ?? '0.00'} unit="m/s" />
            </div>
        </div>
    );
};

// --- Sub-components ---

const VectorArrow = ({ origin, vector, color, scale, label }: { origin: Vector2D, vector: Vector2D, color: string, scale: number, label: string }) => {
    // Don't draw tiny vectors
    if (Math.abs(vector.x) < 0.1 && Math.abs(vector.y) < 0.1) return null;

    const endX = origin.x + vector.x * scale;
    const endY = origin.y + vector.y * scale;

    return (
        <g>
            <line x1={origin.x} y1={origin.y} x2={endX} y2={endY} stroke={color} strokeWidth="3" markerEnd={`url(#arrowhead-${label})`} />
            <defs>
                <marker id={`arrowhead-${label}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={color} />
                </marker>
            </defs>
            <text x={endX + 10} y={endY} fill={color} fontSize="12" fontWeight="bold">{label}</text>
        </g>
    );
};

const MetricBadge = ({ label, value, unit }: { label: string, value: string, unit: string }) => (
    <div className="px-2 py-1 bg-slate-900/90 rounded border border-slate-700 text-xs text-slate-300 font-mono shadow-sm backdrop-blur-sm">
        <span className="text-slate-500 mr-2">{label}:</span>
        <span className="text-white font-bold">{value}</span>
        <span className="text-slate-500 ml-1">{unit}</span>
    </div>
);