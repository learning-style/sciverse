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
    label: string; // "Projectile", "Target", "Origin", etc.
    mass: number; // kg
    position: Vector2D; // meters (normalized)
    velocity: Vector2D; // m/s
    acceleration: Vector2D; // m/s^2
    force: Vector2D; // N
    isStatic?: boolean; // If true, unaffected by forces
    color?: string; // Hex code for rendering
    highlight?: boolean; // If true, render a guide arrow
    radius?: number; // meters (if circle)
    width?: number; // meters (if rectangle)
    height?: number; // meters (if rectangle)
    isRelative?: boolean; // If true, position is 0-1 relative to viewport
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

export interface DialogImage {
    url: string;
    alt: string;
    caption?: string;
}

export interface DialogNode {
    id: string;
    speaker: SpeakerType;
    content: string;
    image?: DialogImage; // Use object for structured image data
    options?: DialogOption[];
    trigger?: SimTrigger;
    nextNodeId?: string;
    // Trigger an action immediately when this node is displayed
    onEnterAction?: SimAction;
}

// --- Integration Types ---

export type SimAction = 
    | { type: 'SPAWN_OBJECT'; payload: Partial<PhysicsEntity> & { isStatic?: boolean; color?: string; highlight?: boolean; isRelative?: boolean } }
    | { type: 'APPLY_FORCE'; payload: { id: string; force: Vector2D } }
    | { type: 'SET_FRICTION'; payload: { id: string; value: number } }
    | { type: 'PAUSE' }
    | { type: 'RESUME' }
    | { type: 'RESET' }
    | { type: 'RESET_AND_GRAVITY'; payload: { force: Vector2D } }
    | { type: 'SET_VISUAL'; payload: Record<string, unknown> }; 

// --- Lesson Metadata Types ---

export type Discipline = 'physics' | 'chemistry' | 'biology';

export interface LessonMeta {
    id: string;
    title: string;
    subtitle: string;
    discipline: Discipline;
    bigIdea: number;
    bigIdeaTitle: string;
    icon: string;
    accentColor: string;
    crossLinks: string[];
    /** Grade band. Absent or 1 = grades 3-5. 2 = grades 6-8. */
    level?: 1 | 2;
}

export type SimTrigger = {
    condition: 'VELOCITY_ZERO' | 'TARGET_HIT' | 'TIME_ELAPSED';
    targetId?: string;
    value?: number;
};

// --- Assessment Types ---

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AssessmentQuestion {
    id: number;
    difficulty: Difficulty;
    discipline: Discipline | 'cross';
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
    explanation: string;
    optionExplanations?: string[];
}

export interface AssessmentData {
    bigIdea: number;
    title: string;
    subtitle: string;
    icon: string;
    questions: AssessmentQuestion[];
}