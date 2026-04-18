import { AssessmentData } from '../../types';

export const bigIdea21Assessment: AssessmentData = {
    bigIdea: 21,
    title: 'How Do Cycles Keep Systems Alive?',
    subtitle: 'Tides, Carbon Flux, and Respiration Cycles',
    icon: '🔄',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Spring tides are strongest when:',
            options: ['Sun-Earth-Moon align', 'Moon is invisible', 'Only wind is strong', 'Earth stops rotating'],
            correctIndex: 0,
            hint: 'Alignment increases tidal forcing.',
            explanation: 'Aligned gravitational pulls increase tidal range.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Which process removes atmospheric CO2 into biomass?',
            options: ['Combustion', 'Photosynthesis', 'Rusting', 'Evaporation'],
            correctIndex: 1,
            hint: 'Plants fix carbon.',
            explanation: 'Photosynthesis stores carbon in organic molecules.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Cellular respiration is cyclical because:',
            options: ['Intermediates are regenerated', 'Cells stop after one turn', 'ATP is never used', 'Oxygen is irrelevant'],
            correctIndex: 0,
            hint: 'Pathway intermediates return.',
            explanation: 'Cycle intermediates are reused, enabling continuous operation.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Best cross-discipline statement:',
            options: ['Cycles are random loops', 'Repeating inputs and feedback stabilize throughput', 'Only chemistry has cycles', 'Cycles prevent all change'],
            correctIndex: 1,
            hint: 'Think timing + exchange + regulation.',
            explanation: 'Cycle stability depends on repeating drivers and controlled feedback.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A major imbalance in one reservoir of a cycle typically:',
            options: ['Has no effects elsewhere', 'Propagates through connected parts of the cycle', 'Stops all physics', 'Cancels biological processes instantly'],
            correctIndex: 1,
            hint: 'Cycles are connected systems.',
            explanation: 'Linked reservoirs mean disturbances can propagate system-wide.'
        }
    ]
};
