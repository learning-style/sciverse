import { useState } from 'react';
import { Play, RotateCcw, Crosshair } from 'lucide-react';
import { PhysicsViewport } from '../components/PhysicsViewport';
import { GraphMonitor } from '../components/GraphMonitor';
import { useSciverse } from '../context/SciverseContext';

export const KinematicsLab = () => {
    // Consume the shared Physics Engine from context
    const { engine, snapshot } = useSciverse();

    // Lab Parameters (UI State)
    const [velocity, setVelocity] = useState(15);
    const [angle, setAngle] = useState(60);

    const handleFire = () => {
        if (engine) {
            engine.reset(); // Clear previous shots
            
            // Convert angle to radians
            const rad = (angle * Math.PI) / 180;
            // Calculate components
            const vx = velocity * Math.cos(rad);
            const vy = -velocity * Math.sin(rad); // Negative because Y is down in Canvas
            
            // Spawn at bottom-left (1m, 7m)
            engine.spawnProjectile(1, 7, { x: vx, y: vy });
        }
    };

    const handleReset = () => {
        if (engine) {
            engine.reset();
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-100">
            {/* Top Toolbar */}
            <div className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6 backdrop-blur-sm z-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Crosshair size={18} />
                        </div>
                        <span className="font-bold tracking-tight text-sm text-slate-200">PROJECTILE LAUNCHER</span>
                    </div>
                    
                    <div className="h-8 w-px bg-slate-800"></div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs text-slate-400 font-mono uppercase">
                                <span>Velocity</span>
                                <span className="text-indigo-400">{velocity} m/s</span>
                            </div>
                            <input 
                                type="range" min="5" max="30" step="1"
                                value={velocity} 
                                onChange={(e) => setVelocity(Number(e.target.value))}
                                className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs text-slate-400 font-mono uppercase">
                                <span>Angle</span>
                                <span className="text-emerald-400">{angle}°</span>
                            </div>
                            <input 
                                type="range" min="0" max="90" step="1"
                                value={angle} 
                                onChange={(e) => setAngle(Number(e.target.value))}
                                className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleReset}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                        title="Reset Simulation"
                    >
                        <RotateCcw size={20} />
                    </button>
                    <button 
                        onClick={handleFire}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-full transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                    >
                        <Play size={16} fill="currentColor" />
                        FIRE
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden p-4 gap-4">
                
                {/* Visualizer (Left/Center) */}
                <div className="flex-grow relative h-full min-h-[400px]">
                    {/* Viewport no longer needs props; it connects to Context automatically */}
                    <PhysicsViewport />
                </div>

                {/* Data Panel (Right) */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                    {/* Graph */}
                    <GraphMonitor latestSnapshot={snapshot} />
                    
                    {/* Mission Context */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex-grow overflow-y-auto">
                        <h4 className="font-bold text-slate-200 mb-3 text-sm uppercase tracking-wide border-b border-slate-800 pb-2">Lab Objectives</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>Observe how the <strong className="text-emerald-400">Vertical Velocity (Vy)</strong> changes over time due to gravity.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>Notice that the <strong>Horizontal Velocity (Vx)</strong> remains constant (ignoring air resistance).</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>Try to hit the far wall by adjusting Angle vs Velocity.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};
