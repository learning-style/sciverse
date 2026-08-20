import { AssessmentData } from '../../types';

/**
 * Big Idea 24 Assessment: "How Do Networks Deliver What Matters?"
 * Covers P24 (Flow Networks), C24 (Reaction Networks), B24 (Vascular Transport)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea24Assessment: AssessmentData = {
    bigIdea: 24,
    title: 'How Do Networks Deliver What Matters?',
    subtitle: 'Flow Paths, Reaction Pathways, and Vascular Transport',
    icon: '🕸️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Fluid in a branch network is primarily driven by:',
            options: ['Color differences', 'Pressure gradients and resistance', 'Random vibration only', 'Gravity alone in all cases'],
            correctIndex: 1,
            hint: 'Flow follows gradients.',
            explanation: 'Pressure differences push flow through resistive paths.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Reaction network bottlenecks usually affect:',
            options: ['Only naming conventions', 'Overall throughput and product distribution', 'Atomic number', 'Magnetic polarity'],
            correctIndex: 1,
            hint: 'Rate-limiting pathways.',
            explanation: 'Slow critical steps can limit global network output.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Plants use xylem/phloem because:',
            options: ['Diffusion is too fast already', 'Long-distance transport needs structured pathways', 'Leaves are heavy', 'Roots cannot store water'],
            correctIndex: 1,
            hint: 'Scale matters.',
            explanation: 'Specialized pathways enable efficient whole-organism transport.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Plants move water and sugars over long distances using:',
            options: ['Xylem and phloem', 'Lungs', 'Bones', 'Feathers'],
            correctIndex: 0,
            hint: 'They are the plant transport highways.',
            explanation: 'Xylem carries water upward and phloem distributes sugars.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Narrowing one branch in a delivery network often:',
            options: ['Has no impact', 'Redistributes flow and can reduce downstream supply', 'Increases total capacity always', 'Stops all branches equally'],
            correctIndex: 1,
            hint: 'Path resistance changes allocation.',
            explanation: 'Network routing shifts when one path becomes more resistive.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'In a flow network, a bottleneck is a place where:',
            options: ['Narrow capacity limits the whole network', 'Flow speeds up permanently', 'Pressure disappears', 'Pipes multiply'],
            correctIndex: 0,
            hint: 'The narrowest point sets the limit.',
            explanation: 'Overall throughput is capped by the most restrictive segment.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A catalyst improves a reaction network by:',
            options: ['Speeding up a slow step so more product forms', 'Adding extra atoms', 'Removing all reactants', 'Cooling the mixture'],
            correctIndex: 0,
            hint: 'Think about relieving a bottleneck.',
            explanation: 'Accelerating the limiting step raises overall output.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why can large organisms not rely on diffusion alone?',
            options: ['Diffusion is far too slow over long distances', 'Diffusion needs sunlight', 'Diffusion only works in metal', 'Diffusion stops in water'],
            correctIndex: 0,
            hint: 'Distance matters enormously.',
            explanation: 'Diffusion time grows steeply with distance, so bulk transport is required.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Robust network design generally includes:',
            options: ['Single critical path only', 'Redundancy, monitoring, and adaptive control', 'No feedback', 'Maximum resistance'],
            correctIndex: 1,
            hint: 'Resilience principles.',
            explanation: 'Reliable delivery systems need alternative paths and feedback-aware control.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Raising the pressure in a network increases throughput only until:',
            options: ['Resistance or a bottleneck limits the flow', 'Pressure becomes invisible', 'The pipes turn to gas', 'Flow reverses immediately'],
            correctIndex: 0,
            hint: 'Something else sets the ceiling.',
            explanation: 'Once a restriction dominates, extra pressure yields little additional flow.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Branching pathways in a reaction network matter because they:',
            options: ['Decide which products form and in what proportion', 'Have no effect', 'Always halve the yield', 'Only change the colour'],
            correctIndex: 0,
            hint: 'Structure shapes the outcome.',
            explanation: 'Competing routes divide material between different products.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Pipes, reaction pathways and plant vessels are all networks because each:',
            options: ['Routes something from sources to destinations through connected paths', 'Is made of metal', 'Works only once', 'Requires electricity'],
            correctIndex: 0,
            hint: 'Look at the Big Idea question.',
            explanation: 'All three distribute a resource across connected routes with limits and bottlenecks.'
        }
    ]
};
