import { AssessmentData } from '../../types';

export const bigIdea24Assessment: AssessmentData = {
    bigIdea: 24,
    title: 'How Do Networks Deliver What Matters?',
    subtitle: 'Flow Paths, Reaction Pathways, and Vascular Transport',
    icon: '🕸️',
    questions: [
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
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Narrowing one branch in a delivery network often:',
            options: ['Has no impact', 'Redistributes flow and can reduce downstream supply', 'Increases total capacity always', 'Stops all branches equally'],
            correctIndex: 1,
            hint: 'Path resistance changes allocation.',
            explanation: 'Network routing shifts when one path becomes more resistive.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Robust network design generally includes:',
            options: ['Single critical path only', 'Redundancy, monitoring, and adaptive control', 'No feedback', 'Maximum resistance'],
            correctIndex: 1,
            hint: 'Resilience principles.',
            explanation: 'Reliable delivery systems need alternative paths and feedback-aware control.'
        }
    ]
};
