import { AssessmentData } from '../../types';

export const bigIdea26Assessment: AssessmentData = {
    bigIdea: 26,
    title: 'How Does Weather Shape Our World?',
    subtitle: 'Weather Patterns, Chemical Changes, and Biological Responses',
    icon: '⛅',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What causes wind to blow?',
            options: ['Differences in air pressure', 'The color of the sky', 'Magnetism', 'Earthquakes'],
            correctIndex: 0,
            hint: 'Think about how air moves from high to low pressure.',
            explanation: 'Wind is caused by air moving from areas of high pressure to low pressure.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Rainwater can sometimes turn acidic because:',
            options: ['It mixes with gases like CO₂ and SO₂', 'It falls faster', 'It is blue', 'It is cold'],
            correctIndex: 0,
            hint: 'Think about what happens when rain passes through polluted air.',
            explanation: 'Rain absorbs gases like carbon dioxide and sulfur dioxide, forming weak acids.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Plants respond to changing weather by:',
            options: ['Adjusting growth and water use', 'Changing color instantly', 'Moving to new places', 'Making sound'],
            correctIndex: 0,
            hint: 'Think about how plants survive drought or storms.',
            explanation: 'Plants can slow growth, close stomata, or drop leaves to cope with weather changes.'
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which process links weather, chemistry, and biology?',
            options: ['Acid rain affecting forests', 'Sunlight making the sky blue', 'Gravity pulling rain down', 'Wind blowing sand'],
            correctIndex: 0,
            hint: 'Think about how pollution and rain interact with living things.',
            explanation: 'Acid rain is a chemical process caused by weather and impacts biological systems.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A sudden cold snap can cause:',
            options: ['Physical, chemical, and biological stress in ecosystems', 'Only temperature to drop', 'No effect on living things', 'Instant plant growth'],
            correctIndex: 0,
            hint: 'Think about how all systems respond to rapid weather change.',
            explanation: 'Rapid weather changes can freeze water, alter chemical reactions, and stress living organisms.'
        }
    ]
};