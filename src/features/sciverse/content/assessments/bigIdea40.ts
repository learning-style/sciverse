import { AssessmentData } from '../../types';

/**
 * Big Idea 40 Assessment: "How Do We Use Data to Know What Is True?"
 * Covers P40 (Measure It Again), C40 (The Fair Test), B40 (Follow the Evidence)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea40Assessment: AssessmentData = {
    bigIdea: 40,
    title: 'How Do We Use Data to Know What Is True?',
    subtitle: 'Measurement Uncertainty, Fair Tests, and Judging Evidence',
    icon: '📊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "Every measurement should be reported with:",
            options: ["An uncertainty (a plus-or-minus range)", "A colour", "The name of the scientist", "The time of day"],
            correctIndex: 0,
            hint: "No measurement is perfectly exact.",
            explanation: "The uncertainty tells you how much the value could vary."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "In a fair test, how many things should you change at once?",
            options: ["One", "Two", "Four", "As many as possible"],
            correctIndex: 0,
            hint: "You need to know what caused the result.",
            explanation: "Changing one variable lets you assign the cause."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "One person's story is called:",
            options: ["Anecdotal evidence", "A controlled trial", "A large sample", "A calibration"],
            correctIndex: 0,
            hint: "It is just one case.",
            explanation: "A single story cannot separate a real effect from luck."
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Two rulers give slightly different readings for the same desk. This shows that:',
            options: ['Every measurement carries some uncertainty', 'One ruler is broken', 'Desks change size', 'Measuring is pointless'],
            correctIndex: 0,
            hint: 'Think about the plus-or-minus range.',
            explanation: 'Small variation is normal; that is why measurements are reported with an uncertainty.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: "Repeating a measurement many times fixes:",
            options: ["Random error, but not systematic error", "Both kinds of error", "Systematic error only", "Neither kind"],
            correctIndex: 0,
            hint: "One kind wobbles both ways; the other always leans one way.",
            explanation: "Averaging cancels random scatter but never a consistent bias."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "A control group must be:",
            options: ["Identical to the test group except for the one thing being tested", "Bigger than the test group", "Kept in a different place", "Given a double dose"],
            correctIndex: 0,
            hint: "It is the comparison baseline.",
            explanation: "Any other difference becomes a confounding variable."
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why does biology need large sample sizes?",
            options: ["Living things vary a lot, so the real signal must rise above the noise", "Biologists have more time", "Living things never vary", "Small samples are illegal"],
            correctIndex: 0,
            hint: "Think about natural variation.",
            explanation: "High variation means you need many individuals to see a real effect."
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'In a fair test, the controlled variables are the ones you:',
            options: ['Deliberately keep the same', 'Change on purpose', 'Measure as the result', 'Ignore completely'],
            correctIndex: 0,
            hint: 'Only one thing should change.',
            explanation: 'Holding everything else fixed is what lets you attribute the effect to the one change.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A scale reads 10 grams heavy. She weighs a rock 500 times. Her result is:",
            options: ["Precise but not accurate", "Accurate but not precise", "Both precise and accurate", "Neither precise nor accurate"],
            correctIndex: 0,
            hint: "All readings agree, but on the wrong number.",
            explanation: "Consistency without correctness is precision without accuracy."
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: "\"Children who take music lessons score higher in maths.\" What should you conclude?",
            options: ["They are correlated, but something else may cause both", "Music lessons definitely cause better maths", "Maths causes music lessons", "The study must be wrong"],
            correctIndex: 0,
            hint: "Correlation is not causation.",
            explanation: "A confounding factor such as family resources could cause both."
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A treatment appears to help 8 out of 10 people. Why is this weak evidence?',
            options: ['With only ten people, luck could easily produce that result', 'Eight is too small a number to matter', 'Treatments never work', 'The people were not measured'],
            correctIndex: 0,
            hint: 'Think about sample size and noise.',
            explanation: 'Small samples fluctuate widely, so a striking result can appear by chance alone.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A study finds ice cream sales and drowning both rise together. The best conclusion is:',
            options: ['A third factor, hot weather, causes both', 'Ice cream causes drowning', 'Drowning causes ice cream sales', 'The study is worthless'],
            correctIndex: 0,
            hint: 'Correlation is not causation.',
            explanation: 'A confounding variable can drive both measures without either causing the other.'
        }
    ]
};
