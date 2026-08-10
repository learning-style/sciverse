import { AssessmentData } from '../../types';

export const bigIdea17Assessment: AssessmentData = {
    bigIdea: 17,
    title: 'How Do Structures Stay Standing?',
    subtitle: 'Loads, Materials, and Bone Strength',
    icon: '🏗️',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Structural failure risk rises most when:',
            options: ['Loads are well distributed', 'Stress concentrates at weak points', 'Supports are stable', 'Geometry is braced'],
            correctIndex: 1,
            hint: 'Peaks matter.',
            explanation: 'Stress concentration often initiates structural failure.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Reinforced concrete is useful because:',
            options: ['Concrete and steel complement each other under different stresses', 'Concrete conducts electricity', 'Steel is chemically inert in all conditions', 'Rebar removes all cracking'],
            correctIndex: 0,
            hint: 'Compression vs tension roles.',
            explanation: 'Concrete and steel are paired to handle different load types.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Bone is biologically effective because it is:',
            options: ['Only solid and heavy', 'Optimized for strength, mass, and repair', 'Structurally random', 'Unchanging over life'],
            correctIndex: 1,
            hint: 'Living tissue adapts.',
            explanation: 'Bone architecture balances performance with metabolic cost.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which idea links all three lessons?',
            options: ['Function follows internal structure and load context', 'Mass alone determines performance', 'Material choice is irrelevant', 'Biological tissues ignore mechanics'],
            correctIndex: 0,
            hint: 'Structure-function principle.',
            explanation: 'Engineering and biology both rely on structural design under constraints.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'For mid-span downward loading, a typical simply supported beam has strongest tension near the:',
            options: ['Top surface', 'Bottom surface', 'Neutral axis only', 'Supports only'],
            correctIndex: 1,
            hint: 'Sagging beam pattern.',
            explanation: 'Sagging usually puts bottom fibers in tension and top in compression.'
        }
    ]
};
