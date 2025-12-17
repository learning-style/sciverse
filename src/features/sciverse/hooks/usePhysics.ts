import { useEffect, useState } from 'react';
import { PhysicsEngine } from '../core/PhysicsEngine';
import { SimSnapshot } from '../types';

export const usePhysics = () => {
    // We use useState instead of useRef for DOM elements to support "Callback Refs".
    // This ensures we know exactly when the DOM elements are mounted/unmounted 
    // when this hook is used in a Context Provider higher up the tree.
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    
    const [engine, setEngine] = useState<PhysicsEngine | null>(null);
    const [snapshot, setSnapshot] = useState<SimSnapshot | null>(null);

    useEffect(() => {
        if (!container || !canvas) return;

        // 1. Sync Canvas Size to Container
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        // 2. Initialize Physics Engine
        const newEngine = new PhysicsEngine(canvas);
        newEngine.start();
        setEngine(newEngine);

        // 3. Subscribe to State Updates (Throttled for React Performance)
        let lastUpdate = 0;
        const cleanupSub = newEngine.subscribe((newSnapshot) => {
            const now = Date.now();
            // Cap updates to ~20 FPS for UI to prevent main thread blocking
            if (now - lastUpdate > 50) { 
                setSnapshot(newSnapshot);
                lastUpdate = now;
            }
        });

        // 4. Cleanup
        return () => {
            cleanupSub();
            newEngine.stop();
            setEngine(null);
        };
    }, [container, canvas]); // Re-run if DOM nodes change

    return {
        // Return setter functions to be used as ref callbacks: ref={containerRef}
        containerRef: setContainer, 
        canvasRef: setCanvas,       
        engine,
        snapshot
    };
};