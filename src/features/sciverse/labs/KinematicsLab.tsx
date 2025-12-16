import { useRef, useState } from 'react';
import { PhysicsViewport } from '../components/PhysicsViewport';
import { GraphMonitor } from '../components/GraphMonitor';
import { Play, RotateCcw } from 'lucide-react';

export const KinematicsLab = () => {
    const simStateRef = useRef<any>(null);
    const engineCoreRef = useRef<any>(null);

    // Lab Parameters
    const [velocity, setVelocity] = useState(10);
    const [angle, setAngle] = useState(45);

    const handleFire = () => {
        if (engineCoreRef.current) {
            // Convert angle/mag to vector
            const rad = angle * (Math.PI / 180);
            const vx = velocity * Math.cos(rad);
            const vy = -velocity * Math.sin(rad); // Negative is UP in Matter.js canvas
            
            // Spawn at bottom-left ish
            engineCoreRef.current.spawnProjectile(100, 300, { x: vx, y: vy });
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs text-slate-500 uppercase font-bold">Velocity ({velocity} m/s)</label>
                        <input 
                            type="range" min="1" max="25" value={velocity} 
                            onChange={(e) => setVelocity(Number(e.target.value))}
                            className="accent-indigo-500 w-32"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-slate-500 uppercase font-bold">Angle ({angle}°)</label>
                        <input 
                            type="range" min="0" max="90" value={angle} 
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="accent-indigo-500 w-32"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleFire}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                >
                    <Play size={16} fill="currentColor" /> FIRE
                </button>
            </div>

            {/* Main Area */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden p-4 gap-4">
                
                {/* Canvas Container */}
                <div className="flex-grow relative h-full">
                    <PhysicsViewport 
                        onInit={(core) => engineCoreRef.current = core} 
                        simStateRef={simStateRef} 
                    />
                </div>

                {/* Sidebar / Graph */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                    <GraphMonitor simStateRef={simStateRef} />
                    
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-sm text-slate-400">
                        <h4 className="font-bold text-slate-200 mb-2">Mission Log</h4>
                        <p>Adjust the velocity and angle to observe the projectile path.</p>
                        <p className="mt-2 text-xs italic">
                            Observe how the vertical velocity (green arrow) changes while horizontal velocity remains constant (until impact).
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};