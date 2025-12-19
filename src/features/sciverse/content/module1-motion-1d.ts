import { DialogNode } from '../types';
import { toMeters } from '../config/physicsConfig';

/**
 * Script: Motion in One Dimension
 * Source: OpenStax Physics Chapter 2
 */
export const generateKinematicsScript = (widthPx: number, heightPx: number): Record<string, DialogNode> => {
    
    // Use explicit relative coordinates for the Origin to ensure it stays centered
    const relativeOrigin = { x: 0.5, y: 0.8 }; 
    
    const centerX_Meters = toMeters(widthPx * 0.5);
    const centerY_Meters = toMeters(heightPx * 0.8);
    
    const step1X = centerX_Meters + 5; 
    const step2X = step1X - 2;

    return {
        'root': {
            id: 'root',
            speaker: 'AI',
            content: "Welcome to **Unit 1: Kinematics**. \n\nTo describe motion—whether it's a person walking or a rocket launching—we first need to agree on *where* things are. In Physics, we define a **Reference Frame** to keep our measurements consistent.",
            options: [
                { id: 'opt1', label: "Like a starting line?", nextNodeId: 'reference_point' },
                { id: 'opt2', label: "Why does it matter?", nextNodeId: 'reference_importance' }
            ]
        },
        'reference_importance': {
            id: 'reference_importance',
            speaker: 'AI',
            content: "Imagine you are on a train walking forward. To you, you might be moving at 1 m/s. But to someone standing outside the train, you are moving at 100 m/s! \n\nWithout a fixed **Origin (0,0)** to measure from, the numbers don't tell the whole story.",
            nextNodeId: 'reference_point'
        },
        'reference_point': {
            id: 'reference_point',
            speaker: 'AI',
            content: "I have placed a **Red Beacon** on the **Lab Bench** (look at the bottom center of the white screen). \n\nThis is our **Origin (x=0)**. \n\nEverything to the right is positive (+x). Everything to the left is negative (-x).",
            onEnterAction: { 
                type: 'SPAWN_OBJECT', 
                payload: { 
                    label: 'Origin', 
                    // C14 Fix: Use Relative Positioning so it stays centered
                    isRelative: true,
                    position: relativeOrigin, 
                    velocity: { x: 0, y: 0 },
                    isStatic: true,
                    color: '#ef4444', // Red-500
                    highlight: true // Arrow pointing to it
                } 
            },
            options: [
                { id: 'spawn_origin', label: "I see the Origin.", nextNodeId: 'distance_vs_displacement' }
            ]
        },
        'distance_vs_displacement': {
            id: 'distance_vs_displacement',
            speaker: 'AI',
            content: "Now, let's look at the difference between **Distance** and **Displacement**.",
            // C16 Update: Added placeholder image for Displacement concept
            image: {
                url: "https://placehold.co/600x300/1e293b/ffffff?text=Distance+vs+Displacement+Diagram",
                alt: "Diagram showing a curved path (Distance) versus a straight line (Displacement) between two points.",
                caption: "Figure 2.4: Distance vs Displacement (Placeholder)"
            },
            options: [
                { 
                    id: 'move_5m', 
                    label: "Move the Runner 5m right.", 
                    nextNodeId: 'move_back',
                    simAction: {
                        type: 'SPAWN_OBJECT',
                        payload: {
                            label: 'Runner',
                            // Use absolute meters for motion calculations
                            position: { x: step1X, y: centerY_Meters }, 
                            velocity: { x: 0, y: 0 },
                            color: '#10b981' // Emerald
                        }
                    }
                }
            ]
        },
        'move_back': {
            id: 'move_back',
            speaker: 'AI',
            content: "Our runner is now standing at the 5-meter mark. \n\nNow, they turn around and walk **2 meters back** toward the left.",
            options: [
                { 
                    id: 'move_2m_left', 
                    label: "They walked 2m back.", 
                    nextNodeId: 'quiz_displacement',
                    simAction: {
                        type: 'SPAWN_OBJECT',
                        payload: {
                            label: 'Runner',
                            position: { x: step2X, y: centerY_Meters }, // 5 - 2 = 3
                            velocity: { x: 0, y: 0 },
                            color: '#10b981'
                        }
                    }
                }
            ]
        },
        'quiz_displacement': {
            id: 'quiz_displacement',
            speaker: 'AI',
            content: "Time for a quick check. \n\nThe runner walked 5m Right, then 2m Left.\n\nWhat is the **Total Distance** they covered, and what is their final **Displacement** from the Origin?",
            options: [
                { id: 'wrong1', label: "Distance: 3m, Displacement: 3m", nextNodeId: 'correction_distance' },
                { id: 'correct', label: "Distance: 7m, Displacement: 3m", nextNodeId: 'correct_displacement' }
            ]
        },
        'correction_distance': {
            id: 'correction_distance',
            speaker: 'AI',
            content: "Not quite. \n\n**Distance** is the total length of the path traveled—like an odometer in a car (5 + 2 = 7). \n\n**Displacement** is simply the change in position: where you are now compared to where you started (Final - Initial). Try that one again!",
            nextNodeId: 'quiz_displacement'
        },
        'correct_displacement': {
            id: 'correct_displacement',
            speaker: 'AI',
            content: "Correct! \n\n**Distance** (7m) is a *Scalar*—it only has magnitude. \n**Displacement** (+3m) is a *Vector*—it has magnitude AND direction. It tells us the runner ended up 3 meters to the right of the start.",
            nextNodeId: 'critical_thinking'
        },
        'critical_thinking': {
            id: 'critical_thinking',
            speaker: 'AI',
            content: "Here is a Critical Thinking puzzle:\n\nA student claims: \"Displacement is always equal to the magnitude of Distance.\" \n\nBased on our runner's trip, is that student correct?",
            options: [
                { id: 'raoul_yes', label: "Yes, they are the same.", nextNodeId: 'raoul_correction' },
                { id: 'raoul_no', label: "No, they can be different.", nextNodeId: 'raoul_confirm' }
            ]
        },
        'raoul_correction': {
            id: 'raoul_correction',
            speaker: 'AI',
            content: "Think back to the numbers: The distance was 7m, but the displacement was only 3m. \n\nThey only match if you move in a perfectly straight line and never turn back!",
            nextNodeId: 'raoul_confirm'
        },
        'raoul_confirm': {
            id: 'raoul_confirm',
            speaker: 'AI',
            content: "Precisely. Displacement is the 'as the crow flies' measurement. \n\nNow that we can describe *where* things are, let's talk about how fast they change: **Speed vs Velocity**.",
            options: [] // End of current module segment
        }
    };
};