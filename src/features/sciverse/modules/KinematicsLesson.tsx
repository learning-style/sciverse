import { useRef, useEffect } from 'react';
import { PhysicsViewport } from '../components/PhysicsViewport';
import { SocraticChat } from '../components/SocraticChat';
import { useDialogEngine } from '../hooks/useDialogEngine';
import { useSciverse } from '../context/SciverseContext';
import { SimAction } from '../types';

export const KinematicsLesson = () => {
    const { engine } = useSciverse();
    
    // Setup Engine state when mounting this lesson
    useEffect(() => {
        if (engine) {
            engine.reset();
            // Default to 0 gravity for the first part of the lesson
            engine.setGravity(0, 0); 
        }
    }, [engine]);

    const handleSimAction = (action: SimAction) => {
        if (!engine) return;

        switch (action.type) {
            case 'SPAWN_OBJECT':
                if (action.payload.position && action.payload.velocity) {
                    engine.spawnProjectile(
                        action.payload.position.x, 
                        action.payload.position.y, 
                        action.payload.velocity,
                        action.payload.label || 'Object'
                    );
                }
                break;
            case 'RESET':
                engine.reset();
                engine.setGravity(0, 0);
                break;
            // Handling the special case from the hook where we passed a complex payload via multiple calls
            // or we can handle the 'RESET_AND_GRAVITY' logic if we added it to types.
            // For now, the hook handles the sequence of reset -> enable gravity -> spawn.
            // We just need to handle the specific atomic actions.
            case 'APPLY_FORCE':
                // Used here as a signal to enable gravity
                if (action.payload.id === 'GRAVITY_ON') {
                    engine.setGravity(0, 1); // Enable normal gravity
                }
                break;
        }
    };

    const { currentNode, history, handleOptionSelect } = useDialogEngine({
        onSimAction: handleSimAction
    });

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
            {/* Top Bar */}
            <div className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center px-6 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Lesson 01: Kinematics</span>
                <div className="mx-4 h-4 w-px bg-slate-800"></div>
                <span className="text-sm text-slate-400">Concept: Position & Velocity</span>
            </div>

            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Simulation (Visualizer) */}
                <div className="flex-grow relative min-h-[400px] lg:h-full bg-slate-900/50">
                    <PhysicsViewport />
                    
                    {/* Overlay Tip */}
                    <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                        <span className="px-3 py-1 bg-slate-950/80 rounded-full text-xs text-slate-500 border border-slate-800">
                            Visualization Mode: Interactive
                        </span>
                    </div>
                </div>

                {/* Right: Socratic Chat */}
                <div className="w-full lg:w-[400px] h-[50vh] lg:h-full flex-shrink-0 z-10 shadow-xl">
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