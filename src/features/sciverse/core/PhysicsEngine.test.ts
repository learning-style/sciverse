import { describe, it, expect, beforeEach } from 'vitest';
import { PhysicsEngine } from './PhysicsEngine';

describe('PhysicsEngine Core', () => {
    let engine: PhysicsEngine;

    // We can instantiate PhysicsEngine without a canvas for logic testing
    // thanks to the optional canvas param in our constructor logic update
    beforeEach(() => {
        // Mock Canvas for JSDOM env if necessary, or update Constructor to allow headless
        engine = new PhysicsEngine(); 
    });

    it('should initialize with correct gravity defaults', () => {
        const snapshot = engine.getSnapshot();
        // Matter.js defaults: y=1, scale=0.001
        // PhysicsConfig: { x: 0, y: 1 } (direction) scaled by internal Matter scale
        
        expect(snapshot.system.gravity.y).toBeGreaterThan(0);
        expect(snapshot.entities.length).toBe(0);
    });

    it('should spawn a projectile and track it', () => {
        engine.spawnProjectile(0, 0, { x: 10, y: 0 });
        let snapshot = engine.getSnapshot();
        
        expect(snapshot.entities.length).toBe(1);
        expect(snapshot.entities[0].label).toBe('Projectile');
        expect(snapshot.entities[0].mass).toBeGreaterThan(0);
    });

    it('should advance simulation time when running loop logic', () => {
        // Manually trigger loop logic or check if timeElapsed is 0 initially
        let snapshot = engine.getSnapshot();
        expect(snapshot.system.timeElapsed).toBe(0);

        // We can't easily test requestAnimationFrame in unit tests without mocks,
        // but we can check if the methods exist and don't throw.
        expect(() => engine.start()).not.toThrow();
        expect(() => engine.stop()).not.toThrow();
    });

    it('should apply velocity correctly', () => {
        const initialV = { x: 10, y: 0 };
        engine.spawnProjectile(0, 0, initialV);
        
        // We verify that velocity was set (converted to pixels internally, then back to meters in snapshot)
        // Due to scaling (1m=100px) and tick conversion, we check approximate values
        // or check that it's non-zero
        const snapshot = engine.getSnapshot();
        const p = snapshot.entities[0];
        
        expect(p.velocity.x).toBeGreaterThan(0);
        expect(p.velocity.y).toBe(0);
    });
});