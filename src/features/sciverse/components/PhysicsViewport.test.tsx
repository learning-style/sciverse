import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PhysicsViewport } from './PhysicsViewport';
import { SciverseContext } from '../context/SciverseContext';
import { PhysicsEntity } from '../types';

// Mock Physics Config
vi.mock('../config/physicsConfig', () => ({
    PHYSICS_CONFIG: { METER_TO_PIXEL: 100 },
    toPixels: (val: number) => val * 100
}));

describe('PhysicsViewport', () => {
    it('renders the overlay layer', () => {
        const mockContextValue: any = {
            containerRef: vi.fn(),
            canvasRef: vi.fn(),
            snapshot: {
                entities: [],
                system: { isPaused: false, timeElapsed: 0, gravity: {x:0, y:0} }
            }
        };

        render(
            <SciverseContext.Provider value={mockContextValue}>
                <PhysicsViewport />
            </SciverseContext.Provider>
        );

        expect(screen.getByTestId('overlay-layer')).toBeInTheDocument();
    });

    it('renders an entity marker with correct label and position', () => {
        const mockEntity: PhysicsEntity = {
            id: 'test-1',
            label: 'Origin',
            mass: 10,
            position: { x: 2, y: 3 }, // Should map to 200px, 300px
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            color: '#ff0000',
            highlight: true,
            isStatic: true
        };

        const mockContextValue: any = {
            containerRef: vi.fn(),
            canvasRef: vi.fn(),
            snapshot: {
                entities: [mockEntity],
                system: { isPaused: false, timeElapsed: 0, gravity: {x:0, y:0} }
            }
        };

        render(
            <SciverseContext.Provider value={mockContextValue}>
                <PhysicsViewport />
            </SciverseContext.Provider>
        );

        const entityGroup = screen.getByTestId('entity-Origin');
        expect(entityGroup).toBeInTheDocument();
        expect(entityGroup).toHaveAttribute('transform', 'translate(200, 300)');
        
        // Check for Label
        expect(screen.getByText('ORIGIN')).toBeInTheDocument();
    });
});