import { AssessmentData } from '../../types';

export const bigIdea27Assessment: AssessmentData = {
    bigIdea: 27,
    title: 'How Does Digestion Power Life?',
    subtitle: 'Physical Breakdown, Chemical Reactions, and Nutrient Absorption',
    icon: '🍽️',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Chewing food is important because:',
            options: ['It breaks food into smaller pieces', 'It changes food color', 'It adds vitamins', 'It makes food colder'],
            correctIndex: 0,
            hint: 'Think about what happens to food in your mouth.',
            explanation: 'Chewing increases surface area for enzymes to work.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Stomach acid helps digestion by:',
            options: ['Breaking down proteins', 'Making food sweet', 'Cooling food', 'Adding water'],
            correctIndex: 0,
            hint: 'Think about what acid does to food.',
            explanation: 'Stomach acid denatures proteins, making them easier to digest.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Nutrients from food enter the body through:',
            options: ['The walls of the small intestine', 'The skin', 'The lungs', 'The eyes'],
            correctIndex: 0,
            hint: 'Think about where absorption happens.',
            explanation: 'The small intestine has villi that absorb nutrients into the bloodstream.'
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Digestion involves physical, chemical, and biological processes working together', 'Only chewing matters', 'Digestion is only chemical', 'Absorption happens in the mouth'],
            correctIndex: 0,
            hint: 'Think about the whole digestive process.',
            explanation: 'Digestion requires mechanical breakdown, chemical reactions, and biological absorption.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A person with no stomach acid would have trouble:',
            options: ['Digesting proteins', 'Absorbing water', 'Chewing food', 'Breathing'],
            correctIndex: 0,
            hint: 'What does acid do in the stomach?',
            explanation: 'Without acid, proteins are not properly denatured for enzyme action.'
        }
    ]
};