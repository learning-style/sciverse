import { AssessmentData } from '../../types';

export const bigIdea31Assessment: AssessmentData = {
    bigIdea: 31,
    title: 'How Do We Move Water and Waste?',
    subtitle: 'Physics of Flow, Chemical Treatment, and Biological Safety',
    icon: '🚰',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Water flows downhill because of:',
            options: ['Gravity', 'Wind', 'Sunlight', 'Sound'],
            correctIndex: 0,
            hint: 'Think about what makes rivers flow.',
            explanation: 'Gravity pulls water from higher to lower places.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Water treatment plants use chemicals to:',
            options: ['Remove harmful substances', 'Make water blue', 'Add dirt', 'Make water heavier'],
            correctIndex: 0,
            hint: 'Think about why we treat water.',
            explanation: 'Chemicals help remove germs and pollutants from water.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Clean water is important for health because:',
            options: ['It prevents disease', 'It tastes sweet', 'It is cold', 'It is blue'],
            correctIndex: 0,
            hint: 'Think about what happens if you drink dirty water.',
            explanation: 'Clean water prevents the spread of disease and keeps people healthy.'
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Moving and cleaning water involves physical, chemical, and biological processes', 'Only gravity matters', 'Water is always clean', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the whole water system.',
            explanation: 'Water systems use physics, chemistry, and biology to keep water safe.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A broken sewer system can cause:',
            options: ['Disease outbreaks and environmental pollution', 'Cleaner water', 'No effect', 'More rain'],
            correctIndex: 0,
            hint: 'Think about what happens if waste is not removed.',
            explanation: 'Broken sewers can spread disease and pollute the environment.'
        }
    ]
};