import { AssessmentData } from '../../types';

export const bigIdea18Assessment: AssessmentData = {
    bigIdea: 18,
    title: 'How Do Rivers Shape the Land?',
    subtitle: 'Flow, River Chemistry, and Habitats',
    icon: '🌊',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Faster river flow usually causes:',
            options: ['Lower transport capacity', 'Greater sediment transport capacity', 'Instant full deposition', 'No change'],
            correctIndex: 1,
            hint: 'Flow energy matters.',
            explanation: 'Higher speed generally increases sediment pickup and transport.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Clear river water can still contain:',
            options: ['No dissolved substances', 'Invisible dissolved ions', 'Only solid rocks', 'Only oxygen gas'],
            correctIndex: 1,
            hint: 'Dissolved is molecular scale.',
            explanation: 'Water can carry dissolved ions while remaining visually clear.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Different river flow zones often support:',
            options: ['Identical species communities', 'Different ecological niches', 'No organisms', 'Only one predator species'],
            correctIndex: 1,
            hint: 'Habitat conditions vary.',
            explanation: 'Flow, oxygen, and substrate differences shape species distribution.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A flood event can influence rivers by:',
            options: ['Changing only water color', 'Changing channel shape, chemistry, and habitat together', 'Affecting chemistry only', 'Affecting biology only'],
            correctIndex: 1,
            hint: 'Connected system effects.',
            explanation: 'Floods can simultaneously alter geomorphology, concentration patterns, and ecosystems.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'If evaporation increases while dissolved mass remains, concentration tends to:',
            options: ['Decrease to zero', 'Increase', 'Stay always fixed', 'Alternate randomly'],
            correctIndex: 1,
            hint: 'Less solvent volume.',
            explanation: 'Reducing water volume can raise dissolved concentration.'
        }
    ]
};
