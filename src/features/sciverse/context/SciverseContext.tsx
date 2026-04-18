import { createContext, useContext, ReactNode } from 'react';
import { usePhysics } from '../hooks/usePhysics';
import { PhysicsEngine } from '../core/PhysicsEngine';
import { SimSnapshot } from '../types';

interface SciverseContextType {
    engine: PhysicsEngine | null;
    snapshot: SimSnapshot | null;
    // We pass the ref setters so the Viewport component can attach them
    containerRef: (node: HTMLDivElement | null) => void;
    canvasRef: (node: HTMLCanvasElement | null) => void;
}

export const SciverseContext = createContext<SciverseContextType | null>(null);

export const SciverseProvider = ({ children }: { children: ReactNode }) => {
    // The Provider owns the Physics Engine Lifecycle via the hook
    const physics = usePhysics();

    return (
        <SciverseContext.Provider value={physics}>
            {children}
        </SciverseContext.Provider>
    );
};

export const useSciverse = () => {
    const context = useContext(SciverseContext);
    if (!context) {
        throw new Error('useSciverse must be used within a SciverseProvider');
    }
    return context;
};