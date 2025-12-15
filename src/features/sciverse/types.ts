/**
 * Sciverse Type Definitions
 * Defines the core data structures for the Socratic Dialog Engine and Physics Modules.
 * Updated C4: To support SSAL (SimState Abstraction Layer)
 */

// --- Dialog Engine Types ---

export type SpeakerType = 'AI' | 'USER' | 'SYSTEM';

export interface DialogOption {
    id: string;
    label: string;
    nextNodeId: string; // The ID of the node this option leads to
    sentiment?: 'positive' | 'neutral' | 'negative'; // For UI styling
    // New: Action to perform on the Simulation when this option is selected
    simAction?: {
        type: 'SET_FRICTION' | 'APPLY_FORCE' | 'RESET_SCENE' | 'UNLOCK_CONTROL';
        payload?: any;
    };
}

export interface DialogNode {
    id: string;
    speaker: SpeakerType;
    content: string; // Markdown supported text
    options?: DialogOption[];
    
    // Conditions to auto-advance the dialog based on SimState
    // e.g., "Wait until velocity > 0"
    completionCondition?: {
        variable: keyof OutputVariables;
        operator: '>' | '<' | '==' | '!=';
        value: number;
    };
    
    nextNodeId?: string;
}

// --- Physics Engine Types (SSAL) ---

export interface Vector2D {
    x: number;
    y: number;
}

// 1. Input Variables (User Controlled)
export interface InputVariables {
    appliedForceVector: Vector2D; // Force applied by user
    mass: number; // Mass of the primary object
    frictionCoeff: {
        static: number;
        kinetic: number;
    };
    gravity: Vector2D; // Usually {x:0, y:9.8}
    elasticity: number; // 0 to 1
}

// 2. State Variables (Internal Engine State)
export interface StateVariables {
    position: Vector2D;
    velocity: Vector2D;
    angularVelocity: number;
    isSleeping: boolean; // Optimization flag from Matter.js
}

// 3. Output Variables (Calculated/Observed for Analysis)
export interface OutputVariables {
    time: number; // Simulation time elapsed
    netForceVector: Vector2D;
    accelerationVector: Vector2D;
    kineticEnergy: number;
    momentumVector: Vector2D;
}

// The Unified Snapshot passed to the Dialog Engine
export interface SimStateSnapshot {
    timestamp: number;
    inputs: InputVariables;
    outputs: OutputVariables;
    // For MVP, we assume a single primary object for analysis
    primaryObject: StateVariables; 
}