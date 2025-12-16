/**
 * Sciverse Type Definitions
 * Defines the core data structures for the Socratic Dialog Engine and Physics Modules.
 */

// --- Physics Engine Types ---

export interface Vector2D {
    x: number;
    y: number;
}

export interface PhysicsEntity {
    id: string;
    label: string; // "Projectile", "Target", etc.
    mass: number; // kg
    position: Vector2D; // meters (normalized)
    velocity: Vector2D; // m/s
    acceleration: Vector2D; // m/s^2
    force: Vector2D; // N
    radius?: number; // meters (if circle)
    width?: number; // meters (if rectangle)
    height?: number; // meters (if rectangle)
}

export interface SimSnapshot {
    timestamp: number;
    entities: PhysicsEntity[];
    system: {
        isPaused: boolean;
        timeElapsed: number;
        gravity: Vector2D;
    };
}

// --- Dialog Engine Types ---

export type SpeakerType = 'AI' | 'USER' | 'SYSTEM';

export interface DialogOption {
    id: string;
    label: string;
    nextNodeId: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    simAction?: SimAction;
}

export interface DialogNode {
    id: string;
    speaker: SpeakerType;
    content: string;
    options?: DialogOption[];
    trigger?: SimTrigger;
    nextNodeId?: string;
}

// --- Integration Types ---

export type SimAction = 
    | { type: 'SPAWN_OBJECT'; payload: Partial<PhysicsEntity> }
    | { type: 'APPLY_FORCE'; payload: { id: string; force: Vector2D } }
    | { type: 'SET_FRICTION'; payload: { id: string; value: number } }
    | { type: 'PAUSE' }
    | { type: 'RESUME' }
    | { type: 'RESET' };

export type SimTrigger = {
    condition: 'VELOCITY_ZERO' | 'TARGET_HIT' | 'TIME_ELAPSED';
    targetId?: string;
    value?: number;
};