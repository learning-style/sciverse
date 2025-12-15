/**
 * Sciverse Type Definitions
 * Defines the core data structures for the Socratic Dialog Engine and Physics Modules.
 */

// --- Dialog Engine Types ---

export type SpeakerType = 'AI' | 'USER' | 'SYSTEM';

export interface DialogOption {
    id: string;
    label: string;
    nextNodeId: string; // The ID of the node this option leads to
    sentiment?: 'positive' | 'neutral' | 'negative'; // For UI styling
}

export interface DialogNode {
    id: string;
    speaker: SpeakerType;
    content: string; // Markdown supported text
    
    // If present, the user must choose an option to proceed
    options?: DialogOption[];
    
    // If present, the system waits for a specific simulation state before proceeding
    // e.g., "WAIT_FOR_SIM_COMPLETE"
    requiredTrigger?: string;
    
    // Actions to execute when this node is entered
    // e.g., "ENABLE_SIMULATION_CONTROLS", "SET_GRAVITY_ZERO"
    onEnterAction?: string; 
    
    // The next node if no options are present (linear flow)
    nextNodeId?: string;
}

export interface DialogScript {
    id: string;
    title: string;
    initialNodeId: string;
    nodes: Record<string, DialogNode>; // Normalized state for O(1) lookup
}

// --- Physics Engine Types ---

export interface Vector2D {
    x: number;
    y: number;
}

export interface PhysicsObject {
    id: string;
    position: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    mass: number;
    color: string;
    type: 'particle' | 'box' | 'static';
}

export interface SimulationState {
    isPlaying: boolean;
    time: number;
    objects: PhysicsObject[];
    globalConfig: {
        gravity: Vector2D;
        friction: number;
    };
}