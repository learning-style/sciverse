import { AssessmentData } from '../../types';

export const bigIdea28Assessment: AssessmentData = {
    bigIdea: 28,
    title: 'How Do Body Systems Work Together?',
    subtitle: 'Circulation, Chemical Signals, and Organ Coordination',
    icon: '🫀',
    questions: [
        // EASY
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
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement links all three lessons?',
            options: ['Body systems rely on physical, chemical, and biological coordination', 'Only the heart matters', 'Chemistry is not involved', 'Organs work alone'],
            correctIndex: 0,
            hint: 'Think about how systems interact.',
            explanation: 'Body systems depend on physical forces, chemical signals, and biological structures.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A hormone imbalance can affect:',
            options: ['Multiple organs and body functions', 'Only the skin', 'Just the bones', 'Nothing at all'],
            correctIndex: 0,
            hint: 'Think about what hormones do.',
            explanation: 'Hormones regulate many organs, so imbalance can disrupt many systems.'
        }
    ]
};