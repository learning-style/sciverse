import { AssessmentData } from '../../types';

/**
 * Big Idea 28 Assessment: "How Do Body Systems Work Together?"
 * Covers P28 (Flow & Pressure), C28 (Chemical Messengers), B28 (Team Body)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea28Assessment: AssessmentData = {
    bigIdea: 28,
    title: 'How Do Body Systems Work Together?',
    subtitle: 'Circulation, Chemical Signals, and Organ Coordination',
    icon: '🫀',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Blood flows through the body because of:',
            options: ['Pressure created by the heart', 'Gravity only', 'Wind', 'Sunlight'],
            correctIndex: 0,
            hint: 'Think about what pushes blood.',
            explanation: 'The heart pumps blood, creating pressure that moves it through vessels.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Hormones are best described as:',
            options: ['Chemical messengers', 'Physical barriers', 'Electrical wires', 'Bones'],
            correctIndex: 0,
            hint: 'Think about how organs communicate.',
            explanation: 'Hormones are chemicals that travel in the blood to signal organs.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The lungs and heart work together to:',
            options: ['Deliver oxygen to the body', 'Make sound', 'Digest food', 'Grow hair'],
            correctIndex: 0,
            hint: 'Think about what happens when you breathe and your heart beats.',
            explanation: 'The lungs add oxygen to blood, and the heart pumps it to the body.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Which organ coordinates the other body systems?',
            options: ['The brain', 'The elbow', 'The skin only', 'The hair'],
            correctIndex: 0,
            hint: 'It sends nerve signals everywhere.',
            explanation: 'The brain integrates information and directs coordinated responses.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement links all three lessons?',
            options: ['Body systems rely on physical, chemical, and biological coordination', 'Only the heart matters', 'Chemistry is not involved', 'Organs work alone'],
            correctIndex: 0,
            hint: 'Think about how systems interact.',
            explanation: 'Body systems depend on physical forces, chemical signals, and biological structures.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Narrower blood vessels increase resistance, which means the heart must:',
            options: ['Work harder to maintain flow', 'Stop beating', 'Beat more slowly forever', 'Produce more blood cells'],
            correctIndex: 0,
            hint: 'Resistance opposes flow.',
            explanation: 'Higher resistance demands greater pressure for the same flow.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Hormones coordinate the body by:',
            options: ['Travelling in the blood and acting on specific target cells', 'Shouting instructions', 'Moving through bones', 'Changing body temperature only'],
            correctIndex: 0,
            hint: 'They are chemical messengers.',
            explanation: 'Hormones bind receptors on target cells to trigger specific responses.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'During exercise, breathing and heart rate both rise because:',
            options: ['Muscles need more oxygen delivered faster', 'The brain is resting', 'The lungs shrink', 'Blood stops moving'],
            correctIndex: 0,
            hint: 'Two systems, one shared goal.',
            explanation: 'Both systems scale together to meet increased oxygen demand.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A hormone imbalance can affect:',
            options: ['Multiple organs and body functions', 'Only the skin', 'Just the bones', 'Nothing at all'],
            correctIndex: 0,
            hint: 'Think about what hormones do.',
            explanation: 'Hormones regulate many organs, so imbalance can disrupt many systems.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Blood is described as a transport highway because it carries:',
            options: ['Oxygen, nutrients, hormones and waste', 'Only oxygen', 'Only water', 'Only hormones'],
            correctIndex: 0,
            hint: 'It serves several systems at once.',
            explanation: 'Blood links respiratory, digestive, endocrine and excretory functions.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Feedback in hormone signalling means that when levels rise too high, the body:',
            options: ['Reduces further release', 'Releases even more', 'Ignores the change', 'Destroys the receptors permanently'],
            correctIndex: 0,
            hint: 'Think about staying in range.',
            explanation: 'Negative feedback damps the signal to hold levels within a safe band.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'If one body system fails, others are affected because the systems are:',
            options: ['Interdependent, sharing transport and signalling', 'Completely separate', 'Identical to each other', 'Only connected by bone'],
            correctIndex: 0,
            hint: 'Think about the shared blood highway.',
            explanation: 'Shared transport and signalling mean failure propagates between systems.'
        }
    ]
};