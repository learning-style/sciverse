import { useEffect, useRef, useState } from 'react';
import { EngineCore } from '../lib/engine-core';

export const useMatter = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<EngineCore | null>(null);
    const [simState, setSimState] = useState<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Engine
        const core = new EngineCore();
        core.mount(containerRef.current);
        engineRef.current = core;

        // Subscribe to SSAL updates
        // Note: In high-performance scenarios, we might avoid useState 
        // and update a Ref instead to prevent full React re-renders.
        // For Phase 1 MVP, we'll throttle or accept the re-render overhead for overlays.
        core.subscribeToUpdates((snapshot) => {
            setSimState(snapshot);
        });

        return () => {
            core.unmount();
            engineRef.current = null;
        };
    }, []);

    return {
        containerRef,
        engine: engineRef.current,
        simState
    };
};