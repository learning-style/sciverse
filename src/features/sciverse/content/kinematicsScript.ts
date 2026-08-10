import { DialogNode } from '../types';
import { toMeters } from '../config/physicsConfig';

/**
 * Generates the Socratic Script for "Motion in One Dimension".
 * 
 * @param widthPx - Current width of the viewport in pixels
 * @param heightPx - Current height of the viewport in pixels
 */
export const generateKinematicsScript = (widthPx: number, heightPx: number): Record<string, DialogNode> => {
    
    // Calculate responsive coordinates (in meters)
    // We want the Origin to be roughly 20% from the left and vertically centered relative to the floor.
    // Assuming floor is at bottom, we place objects slightly above it.
    const centerX = toMeters(widthPx * 0.2); 
    const centerY = toMeters(heightPx * 0.6); 
    
    const step1X = centerX + 5; // Move 5 meters right
    const step2X = step1X - 2;  // Move 2 meters back left (Total displacement +3)

    return {
        'root': {
            id: 'root',
            speaker: 'AI',
            content: "Welcome to **Unit 1: Kinematics**. \n\nTo describe motion—whether it's a person walking or a rocket launching—we first need to agree on *where* we are measuring from. We call this a **Reference Frame**.",
            options: [
                { id: 'opt1', label: "Like a starting line?", nextNodeId: 'reference_point' },
                { id: 'opt2', label: "Why does it matter?", nextNodeId: 'reference_importance' }
            ]
        },
        'reference_importance': {
            id: 'reference_importance',
            speaker: 'AI',
            content: "Imagine you are on a train walking forward. To you, you are moving at 1 m/s. To someone outside, you might be moving at 100 m/s! \n\nPhysics requires a defined **Origin (0,0)** to make sense of these numbers.",
            nextNodeId: 'reference_point'
        },
        'reference_point': {
            id: 'reference_point',
            speaker: 'AI',
            content: "I have placed a **White Beacon** on the lab bench. This is our **Origin (x=0)**. \n\nEverything to the right is positive (+x). Everything to the left is negative (-x).",
            onEnterAction: { 
                type: 'SPAWN_OBJECT', 
                payload: { 
                    label: 'Origin', 
                    position: { x: centerX, y: centerY }, 
                    velocity: { x: 0, y: 0 },
                    isStatic: true,
                    color: '#ffffff',
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
            content: "Now, let's explore **Distance** vs. **Displacement**. \n\nI'm going to spawn a Runner. Watch them move 5 meters to the right.",
            options: [
                { 
                    id: 'move_5m', 
                    label: "Move the Runner", 
                    nextNodeId: 'move_back',
                    simAction: {
                        type: 'SPAWN_OBJECT',
                        payload: {
                            label: 'Runner',
                            position: { x: step1X, y: centerY }, // Teleport for MVP, or animate in future
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
            content: "The Runner is now at **x = 5m**. \n\nNow, imagine they walk **2 meters back** to the left.",
            options: [
                { 
                    id: 'move_2m_left', 
                    label: "Walk back 2m", 
                    nextNodeId: 'quiz_displacement',
                    simAction: {
                        type: 'SPAWN_OBJECT',
                        payload: {
                            label: 'Runner',
                            position: { x: step2X, y: centerY }, // 5 - 2 = 3
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
            content: "Okay, Analysis time. \n\nThe Runner walked 5m Right, then 2m Left.\n\nWhat is their **Total Distance** traveled, and what is their **Displacement** from the Origin?",
            options: [
                { id: 'wrong1', label: "Distance: 3m, Displacement: 3m", nextNodeId: 'correction_distance' },
                { id: 'correct', label: "Distance: 7m, Displacement: 3m", nextNodeId: 'correct_displacement' }
            ]
        },
        'correction_distance': {
            id: 'correction_distance',
            speaker: 'AI',
            content: "Not quite. **Distance** is the total path length (5 + 2 = 7). It doesn't care about direction. \n\n**Displacement** is the change in position (Final - Initial). Try again.",
            nextNodeId: 'quiz_displacement'
        },
        'correct_displacement': {
            id: 'correct_displacement',
            speaker: 'AI',
            content: "Correct! \n\n**Distance** (7m) is a Scalar—it has no direction. \n**Displacement** (+3m) is a Vector—it cares that we ended up to the *right* of where we started.",
            nextNodeId: 'critical_thinking'
        },
        'critical_thinking': {
            id: 'critical_thinking',
            speaker: 'AI',
            content: "Here is a Critical Thinking question:\n\nRaoul claims: \"Displacement is always equal to the magnitude of Distance.\" \n\nBased on our experiment, is he right?",
            options: [
                { id: 'raoul_yes', label: "Yes, he's right.", nextNodeId: 'raoul_correction' },
                { id: 'raoul_no', label: "No, he's wrong.", nextNodeId: 'raoul_confirm' }
            ]
        },
        'raoul_correction': {
            id: 'raoul_correction',
            speaker: 'AI',
            content: "Look at the Runner again. The Distance was 7m, but the Displacement was only 3m. They are not equal because the direction changed.",
            nextNodeId: 'raoul_confirm'
        },
        'raoul_confirm': {
            id: 'raoul_confirm',
            speaker: 'AI',
            content: "Exactly. Displacement is only equal to Distance if you move in a straight line without ever turning back. \n\nNext, we will look at how fast things move: **Speed vs Velocity**.",
            options: [] // End of module for now
        }
    };
};
