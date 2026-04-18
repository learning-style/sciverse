import { AssessmentData } from '../../types';

export const bigIdea30Assessment: AssessmentData = {
    bigIdea: 30,
    title: 'How Do Medicines Move and Work?',
    subtitle: 'Transport, Chemical Action, and Biological Effects',
    icon: '💊',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Medicines travel through the body mainly by:',
            options: ['Blood flow', 'Sound waves', 'Gravity', 'Sunlight'],
            correctIndex: 0,
            hint: 'Think about how medicine gets from your mouth to your cells.',
            explanation: 'Blood carries medicines to different parts of the body.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A painkiller works by:',
            options: ['Blocking chemical signals that cause pain', 'Making you run faster', 'Changing your hair color', 'Adding water to your body'],
            correctIndex: 0,
            hint: 'Think about what painkillers do in the body.',
            explanation: 'Painkillers block or reduce the chemicals that signal pain.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Antibiotics help fight infection by:',
            options: ['Killing or stopping the growth of bacteria', 'Making you taller', 'Changing your eye color', 'Making you sleep'],
            correctIndex: 0,
            hint: 'Think about what antibiotics do to germs.',
            explanation: 'Antibiotics target bacteria, not viruses, and help cure infections.'
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement links all three lessons?',
            options: ['Medicines must be transported, act chemically, and affect biological systems', 'Only blood matters', 'Medicines work instantly everywhere', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the journey and action of medicine.',
            explanation: 'Medicines are transported, act chemically, and have biological effects.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A medicine that is broken down too quickly in the body might:',
            options: ['Not reach its target or work effectively', 'Work better', 'Make you taller', 'Change your hair color'],
            correctIndex: 0,
            hint: 'Think about what happens if a drug is destroyed before it acts.',
            explanation: 'If a medicine is broken down too fast, it may not reach the cells that need it.'
        }
    ]
};