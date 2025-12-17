import { useEffect, useState } from 'react';
import { PhysicsEngine } from '../core/PhysicsEngine';
import { SimSnapshot } from '../types';

export const usePhysics = () => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    
    const [engine, setEngine] = useState<PhysicsEngine | null>(null);
    const [snapshot, setSnapshot] = useState<SimSnapshot | null>(null);

    // Initialization Effect
    useEffect(() => {
        if (!container || !canvas) return;

        // 1. Initial Size
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        // 2. Initialize Engine
        const newEngine = new PhysicsEngine(canvas);
        newEngine.start();
        setEngine(newEngine);

        // 3. Subscribe
        let lastUpdate = 0;
        const cleanupSub = newEngine.subscribe((newSnapshot) => {
            const now = Date.now();
            if (now - lastUpdate > 50) { 
                setSnapshot(newSnapshot);
                lastUpdate = now;
            }
        });

        // 4. Handle Resize
        const handleResize = () => {
            if (container && newEngine) {
                // Delay slightly to let layout settle
                requestAnimationFrame(() => {
                    newEngine.resize(container.clientWidth, container.clientHeight);
                });
            }
        };
        
        // ResizeObserver is better than window.resize for container-based changes
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            cleanupSub();
            newEngine.stop();
            setEngine(null);
        };
    }, [container, canvas]);

    return {
        containerRef: setContainer, 
        canvasRef: setCanvas,       
        engine,
        snapshot
    };
};