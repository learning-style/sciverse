import { useEffect, useState, useMemo } from 'react';
import { PhysicsViewport } from '../components/PhysicsViewport';
import { SocraticChat } from '../components/SocraticChat';
import { useDialogEngine } from '../hooks/useDialogEngine';
import { useSciverse } from '../context/SciverseContext';
import { SimAction } from '../types';
import { generateKinematicsScript } from '../content/module1-motion-1d';

export const KinematicsLesson = () => {
    const { engine, setEngine } = useSciverse();
    const [viewportSize, setViewportSize] = useState({ width: 800, height: 600 });
    
    // Handle viewport resize to regenerate script coordinates
    const handleViewportResize = (width: number, height: number) => {
        setViewportSize({ width, height });
    };

    const script = useMemo(() => {
        return generateKinematicsScript(viewportSize.width, viewportSize.height);
    }, [viewportSize.width, viewportSize.height]);

    // Integrate Dialog Engine, ensuring actions only fire when engine is ready
    const { currentNode, history, handleOptionSelect } = useDialogEngine({
        script, 
        onSimAction: (action) => handleSimAction(action),
        isReady: !!engine // C13: Pass engine readiness to prevent race conditions
    });

    useEffect(() => {
        if (engine) {
            engine.reset();
            engine.setGravity(0, 0); 
        }
    }, [engine, script]);

    const handleSimAction = (action: SimAction) => {
        if (!engine) return;

        switch (action.type) {
            case 'SPAWN_OBJECT':
                if (action.payload.position) {
                    engine.spawnObject({
                        x: action.payload.position.x, 
                        y: action.payload.position.y, 
                        velocity: action.payload.velocity,
                        label: action.payload.label || 'Object',
                        color: action.payload.color,
                        isStatic: action.payload.isStatic,
                        highlight: action.payload.highlight
                    });
                }
                break;
            case 'RESET':
                engine.reset();
                engine.setGravity(0, 0);
                break;
            case 'APPLY_FORCE':
                if (action.payload.id === 'GRAVITY_ON') {
                    engine.setGravity(0, 1);
                }
                break;
            case 'RESET_AND_GRAVITY':
                engine.reset();
                engine.setGravity(0, 1);
                break;
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
            {/* Top Bar */}
            <div className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center px-6 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Lesson 01: Motion in 1D</span>
                <div className="mx-4 h-4 w-px bg-slate-800"></div>
                <span className="text-sm text-slate-400">Reference Frames & Displacement</span>
            </div>

            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Simulation (Visualizer) - Using Light Theme for Cycle 13 */}
                <div className="flex-grow relative min-h-[400px] lg:h-full bg-slate-50">
                    <PhysicsViewport 
                        onInit={setEngine} 
                        onResize={handleViewportResize}
                        theme="light" // Explicitly setting Light Mode
                    />
                    
                    {/* Overlay Tip */}
                    <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                        <span className="px-3 py-1 bg-white/80 rounded-full text-xs text-slate-500 border border-slate-200 shadow-sm">
                            Visualization Mode: Interactive
                        </span>
                    </div>
                </div>

                {/* Right: Socratic Chat - Keeps Dark theme for contrast/UI consistency */}
                <div className="w-full lg:w-[400px] h-[50vh] lg:h-full flex-shrink-0 z-10 shadow-xl border-l border-slate-800">
                    <SocraticChat 
                        currentNode={currentNode}
                        history={history}
                        onOptionSelect={handleOptionSelect}
                    />
                </div>
            </div>
        </div>
    );
};