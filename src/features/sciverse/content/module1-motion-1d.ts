import { DialogNode } from '../types';

/**
 * Script: Motion in One Dimension
 * Source: OpenStax Physics Chapter 2
 * 
 * Flow:
 * 1. Reference Frames (Maglev Train)
 * 2. Coordinate Systems (Origin)
 * 3. Distance vs Displacement (Path vs Vector)
 * 
 * Note: All interactive "Beacons" and "SimActions" have been removed to prevent 
 * visual synchronization bugs. This is a text+image led lesson.
 */
export const generateKinematicsScript = (_widthPx: number, _heightPx: number): Record<string, DialogNode> => {
    
    return {
        'root': {
            id: 'root',
            speaker: 'AI',
            content: "Welcome to **Unit 1: Kinematics**. \n\nPhysics is about describing the universe. To describe *motion*—whether it's a person walking or a rocket launching—we first need to agree on *where* we are measuring from.",
            options: [
                { id: 'opt1', label: "Like a starting line?", nextNodeId: 'reference_point' },
                { id: 'opt2', label: "Can't we just measure speed?", nextNodeId: 'reference_importance' }
            ]
        },
        'reference_importance': {
            id: 'reference_importance',
            speaker: 'AI',
            content: "Speed is relative! \n\nImagine you are walking forward on a train. To you, you move at 1 m/s. To someone standing outside, you might be moving at 100 m/s!",
            image: {
                url: "https://placehold.co/600x350/0f172a/a5f3fc?text=Figure+2.1:+Relative+Motion",
                alt: "A Maglev train showing motion relative to different observers",
                caption: "Figure 2.1: Motion depends on your Reference Frame."
            },
            nextNodeId: 'reference_point'
        },
        'reference_point': {
            id: 'reference_point',
            speaker: 'AI',
            content: "In Physics, we define a **Coordinate System**. \n\nThink of a number line stretching out in front of you. The spot you are standing on is 0. We call this the **Origin**.",
            image: {
                url: "https://placehold.co/600x300/0f172a/10b981?text=Figure+2.2:+Coordinate+System",
                alt: "A coordinate system showing Origin (0) with positive values to the right and negative to the left",
                caption: "Figure 2.2: The Origin is our reference point (x=0)."
            },
            options: [
                { id: 'spawn_origin', label: "Got it. 0 is the center.", nextNodeId: 'distance_vs_displacement' }
            ]
        },
        'distance_vs_displacement': {
            id: 'distance_vs_displacement',
            speaker: 'AI',
            content: "Now, let's distinguish between **Distance** and **Displacement**. \n\nImagine a professor pacing in front of a whiteboard. She starts at the Origin (0) and walks **2.0 meters to the Right**.",
            options: [
                { 
                    id: 'move_2m', 
                    label: "She is at x = 2.0m.", 
                    nextNodeId: 'move_back'
                }
            ]
        },
        'move_back': {
            id: 'move_back',
            speaker: 'AI',
            content: "Correct. Now, imagine she turns around and walks **4.0 meters to the Left**.",
            image: {
                url: "https://placehold.co/600x300/0f172a/f472b6?text=Figure+2.3:+Displacement+Vectors",
                alt: "Diagram showing a person walking 2m right, then 4m left, ending at -2m.",
                caption: "Figure 2.3: Total Distance vs Net Displacement."
            },
            options: [
                { 
                    id: 'move_4m_left', 
                    label: "She walked past the Origin.", 
                    nextNodeId: 'quiz_displacement'
                }
            ]
        },
        'quiz_displacement': {
            id: 'quiz_displacement',
            speaker: 'AI',
            content: "Let's analyze her trip:\n1. 2.0m Right (+2.0)\n2. 4.0m Left (-4.0)\n\nWhat is the **Total Distance** she walked (steps taken)?\nAnd what is her **Displacement** (Final Position - Initial Position)?",
            options: [
                { id: 'wrong1', label: "Distance: 2.0m, Displacement: -2.0m", nextNodeId: 'correction_distance' },
                { id: 'correct', label: "Distance: 6.0m, Displacement: -2.0m", nextNodeId: 'correct_displacement' }
            ]
        },
        'correction_distance': {
            id: 'correction_distance',
            speaker: 'AI',
            content: "Not quite. **Distance** adds up *every* step you take, regardless of direction (2.0 + 4.0). \n\n**Displacement** is simply where you ended up relative to the start.",
            nextNodeId: 'quiz_displacement'
        },
        'correct_displacement': {
            id: 'correct_displacement',
            speaker: 'AI',
            content: "Exactly!\n\n**Distance** (6.0m) is a *Scalar*—it has no direction, just magnitude.\n**Displacement** (-2.0m) is a *Vector*—it includes direction (The negative sign means to the left of the Origin).",
            nextNodeId: 'critical_thinking'
        },
        'critical_thinking': {
            id: 'critical_thinking',
            speaker: 'AI',
            content: "Critical Thinking Check:\n\nIf the professor walked *all the way back* to the Origin, what would her **Displacement** be?",
            options: [
                { id: 'ct_zero', label: "Zero.", nextNodeId: 'ct_correct' },
                { id: 'ct_dist', label: "The total distance walked.", nextNodeId: 'ct_correction' }
            ]
        },
        'ct_correction': {
            id: 'ct_correction',
            speaker: 'AI',
            content: "That would be the Distance. Displacement is (Final Position - Initial Position). If you start at 0 and end at 0...",
            nextNodeId: 'ct_correct'
        },
        'ct_correct': {
            id: 'ct_correct',
            speaker: 'AI',
            content: "Spot on. Zero Displacement. Even if you ran a marathon, if you finish where you started, your displacement is zero.\n\nThis distinction is crucial for understanding Velocity next.",
            options: [] // End of module
        }
    };
};
