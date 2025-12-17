import { DialogNode } from '../types';

/**
 * Script: Kinematics Module 1 - Position & Velocity
 * A Socratic dialogue to introduce the concepts before the interactive lab.
 */
export const kinematicsScript: Record<string, DialogNode> = {
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome, Cadet. Before we handle the launch codes, we need to understand *Motion* itself. \n\nIf you close your eyes, how do you know where you are?",
        options: [
            { id: 'opt1', label: "I can feel it.", nextNodeId: 'feel_it' },
            { id: 'opt2', label: "I don't.", nextNodeId: 'reference_point' }
        ]
    },
    'feel_it': {
        id: 'feel_it',
        speaker: 'AI',
        content: "You might feel acceleration, but you can't feel *position*. To know where you are, you need a **Reference Point**.",
        nextNodeId: 'reference_point'
    },
    'reference_point': {
        id: 'reference_point',
        speaker: 'AI',
        content: "In Physics, we call this the **Origin (0,0)**. Look at the lab bench. I've marked the Origin with a white beacon.",
        // Automatically spawn the Origin marker when this text appears
        onEnterAction: { 
            type: 'SPAWN_OBJECT', 
            payload: { 
                label: 'Origin', 
                position: { x: 6, y: 4 }, 
                velocity: { x: 0, y: 0 },
                isStatic: true,
                color: '#ffffff'
            } 
        },
        options: [
            { id: 'spawn_origin', label: "I see it.", nextNodeId: 'define_position' }
        ]
    },
    'define_position': {
        id: 'define_position',
        speaker: 'AI',
        content: "That dot represents **Position**. It tells us *where* an object is relative to zero. \n\nNow, what happens if we change position over time?",
        options: [
            { id: 'movement', label: "We move.", nextNodeId: 'define_velocity' },
            { id: 'teleport', label: "We teleport?", nextNodeId: 'define_velocity' }
        ]
    },
    'define_velocity': {
        id: 'define_velocity',
        speaker: 'AI',
        content: "Exactly. The rate at which position changes is called **Velocity**. \n\nLet's spawn a probe with a velocity of **5 m/s** to the right.",
        options: [
            { 
                id: 'spawn_probe', 
                label: "Launch Probe", 
                nextNodeId: 'observe_velocity',
                simAction: {
                    type: 'SPAWN_OBJECT',
                    payload: { label: 'Probe', position: { x: 1, y: 4 }, velocity: { x: 5, y: 0 } }
                }
            }
        ]
    },
    'observe_velocity': {
        id: 'observe_velocity',
        speaker: 'AI',
        content: "Observe the green arrow. That vector represents Velocity. \n\nNotice that because there is no gravity or friction here, the velocity remains **constant**.",
        options: [
            { id: 'why_constant', label: "Why constant?", nextNodeId: 'inertia_hint' },
            { id: 'next', label: "Got it.", nextNodeId: 'intro_gravity' }
        ]
    },
    'inertia_hint': {
        id: 'inertia_hint',
        speaker: 'AI',
        content: "Newton's First Law: An object in motion stays in motion unless acted upon by a force. Here, no forces are acting on the probe.",
        nextNodeId: 'intro_gravity'
    },
    'intro_gravity': {
        id: 'intro_gravity',
        speaker: 'AI',
        content: "Now, let's turn on **Gravity**. How will this affect our probe's motion?",
        options: [
            { id: 'slow_down', label: "It will slow down.", nextNodeId: 'gravity_correction' },
            { id: 'fall', label: "It will fall.", nextNodeId: 'demo_gravity' }
        ]
    },
    'gravity_correction': {
        id: 'gravity_correction',
        speaker: 'AI',
        content: "Not quite. Gravity pulls *down*, perpendicular to the motion. It won't slow the horizontal speed, but it will change the vertical speed.",
        nextNodeId: 'demo_gravity'
    },
    'demo_gravity': {
        id: 'demo_gravity',
        speaker: 'AI',
        content: "Let's enable Gravity and fire again. Watch the Green Arrow (Velocity) change direction.",
        options: [
            { 
                id: 'fire_gravity', 
                label: "Fire with Gravity", 
                nextNodeId: 'end_lesson',
                simAction: {
                    type: 'RESET_AND_GRAVITY', 
                    payload: { force: { x: 0, y: 1 } }
                } 
            }
        ]
    },
    'end_lesson': {
        id: 'end_lesson',
        speaker: 'AI',
        // Auto-spawn the projectile again after reset, using onEnter to ensure sequence
        onEnterAction: {
            type: 'SPAWN_OBJECT',
            payload: { label: 'Projectile', position: { x: 1, y: 4 }, velocity: { x: 10, y: 0 } }
        },
        content: "Excellent. You've seen Position (Static) and Velocity (Dynamic). You are ready for the Lab.",
        options: []
    }
};