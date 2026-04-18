import { AssessmentData } from '../../types';

export const bigIdea32Assessment: AssessmentData = {
    bigIdea: 32,
    title: 'How Does Air Quality Affect Breathing?',
    subtitle: 'Physics of Air, Chemical Reactions, and Biological Impact',
    icon: '🌫️',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Air moves into your lungs when:',
            options: ['You inhale and create lower pressure in your chest', 'You hold your breath', 'You eat food', 'You close your mouth'],
            correctIndex: 0,
            hint: 'Think about what happens when you breathe in.',
            explanation: 'Inhaling expands your chest, lowering pressure and drawing air in.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Smog forms when:',
            options: ['Pollutants react in sunlight', 'It rains', 'The wind blows', 'It is cold'],
            correctIndex: 0,
            hint: 'Think about what causes hazy air in cities.',
            explanation: 'Sunlight drives chemical reactions between pollutants, creating smog.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Breathing polluted air can:',
            options: ['Harm your lungs and health', 'Make you taller', 'Change your eye color', 'Make you run faster'],
            correctIndex: 0,
            hint: 'Think about what happens when air is dirty.',
            explanation: 'Polluted air can irritate and damage your lungs.'
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Air quality affects breathing through physical, chemical, and biological processes', 'Only physics matters', 'Air is always clean', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the whole process of breathing.',
            explanation: 'Breathing is affected by air movement, chemical reactions, and biological health.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A city with high smog levels might see:',
            options: ['More breathing problems and health risks', 'Cleaner air', 'No effect', 'More rain'],
            correctIndex: 0,
            hint: 'Think about what happens in polluted cities.',
            explanation: 'High smog increases respiratory problems and health risks.'
        }
    ]
};