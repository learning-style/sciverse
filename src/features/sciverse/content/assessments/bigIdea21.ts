import { AssessmentData } from '../../types';

/**
 * Big Idea 21 Assessment: "How Do Cycles Keep Systems Alive?"
 * Covers P21 (Tidal Cycles), C21 (Carbon Cycle), B21 (Respiration Cycles)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea21Assessment: AssessmentData = {
    bigIdea: 21,
    title: 'How Do Cycles Keep Systems Alive?',
    subtitle: 'Tides, Carbon Flux, and Respiration Cycles',
    icon: '🔄',
    questions: [
        // ── EASY ──
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
            difficulty: 'easy',
            discipline: 'physics',
            question: 'High tides happen mainly because of the gravity of:',
            options: ['The Moon', 'A passing ship', 'The wind', 'The seabed'],
            correctIndex: 0,
            hint: 'Look at the visual with the Moon.',
            explanation: 'Lunar gravity raises bulges of water that Earth rotates through.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Best cross-discipline statement:',
            options: ['Cycles are random loops', 'Repeating inputs and feedback stabilize throughput', 'Only chemistry has cycles', 'Cycles prevent all change'],
            correctIndex: 1,
            hint: 'Think timing + exchange + regulation.',
            explanation: 'Cycle stability depends on repeating drivers and controlled feedback.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'The carbon cycle stays balanced when:',
            options: ['Carbon released and carbon absorbed roughly cancel out', 'Only release happens', 'Only absorption happens', 'Carbon is destroyed'],
            correctIndex: 0,
            hint: 'Think about sources and sinks.',
            explanation: 'Stability requires sources and sinks to match over time.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Breathing rate increases during exercise because cells need:',
            options: ['More oxygen to release energy', 'Less oxygen', 'More carbon dioxide', 'More sunlight'],
            correctIndex: 0,
            hint: 'Think about energy demand.',
            explanation: 'Higher energy demand requires more oxygen delivery.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Tides repeat on a regular schedule because they are driven by:',
            options: ['Predictable orbital and rotational motion', 'Random weather', 'Ocean animals', 'Air pressure alone'],
            correctIndex: 0,
            hint: 'Cycles come from repeating motion.',
            explanation: 'Regular orbital forcing produces a repeating, predictable rhythm.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A major imbalance in one reservoir of a cycle typically:',
            options: ['Has no effects elsewhere', 'Propagates through connected parts of the cycle', 'Stops all physics', 'Cancels biological processes instantly'],
            correctIndex: 1,
            hint: 'Cycles are connected systems.',
            explanation: 'Linked reservoirs mean disturbances can propagate system-wide.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Oceans absorbing more carbon dioxide act as a:',
            options: ['Carbon sink', 'Carbon source', 'Carbon destroyer', 'Carbon creator'],
            correctIndex: 0,
            hint: 'Sinks take carbon out of the air.',
            explanation: 'Absorption removes carbon from the atmosphere, so the ocean acts as a sink.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why must a cycle have feedback control to keep an organism alive?',
            options: ['Feedback corrects drift before conditions become dangerous', 'Feedback speeds everything up', 'Feedback stops all change', 'Feedback creates energy'],
            correctIndex: 0,
            hint: 'Think about staying inside a safe range.',
            explanation: 'Feedback senses deviation and acts to restore the safe range.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Tides, the carbon cycle and breathing are all cycles because each:',
            options: ['Repeats and returns toward a balance point', 'Happens only once', 'Runs in one direction forever', 'Requires no energy'],
            correctIndex: 0,
            hint: 'Look at the Big Idea question.',
            explanation: 'Each is a repeating process regulated around equilibrium.'
        }
    ]
};
