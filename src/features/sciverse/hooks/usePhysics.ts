import { useEffect, useRef, useState } from 'react';
import { PhysicsEngine } from '../core/PhysicsEngine';
import { SimSnapshot } from '../types';

export const usePhysics = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<PhysicsEngine | null>(null);
    const [snapshot, setSnapshot] = useState<SimSnapshot | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        // Initialize Engine
        // Resize canvas to container
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;

        const engine = new PhysicsEngine(canvasRef.current);
        engine.start();
        engineRef.current = engine;

        // Subscription for React State (Throttled for UI updates)
        let lastUpdate = 0;
        const cleanup = engine.subscribe((newSnapshot) => {
            const now = Date.now();
            if (now - lastUpdate > 50) { // 20fps cap for React state
                setSnapshot(newSnapshot);
                lastUpdate = now;
            }
        });

        return () => {
            cleanup();
            engine.stop();
            engineRef.current = null;
        };
    }, []);

    return {
        containerRef,
        canvasRef,
        engine: engineRef.current,
        snapshot
    };
};