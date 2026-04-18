import { AssessmentData } from '../../types';

export const bigIdea29Assessment: AssessmentData = {
    bigIdea: 29,
    title: 'How Do Diseases Spread and Get Stopped?',
    subtitle: 'Transmission, Chemical Defenses, and Immune Response',
    icon: '🦠',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Germs can spread through the air by:',
            options: ['Tiny droplets when people cough or sneeze', 'Sound waves', 'Sunlight', 'Gravity only'],
            correctIndex: 0,
            hint: 'Think about what happens when someone sneezes.',
            explanation: 'Coughing and sneezing release droplets that can carry germs.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Disinfectants help stop disease by:',
            options: ['Destroying germs with chemical reactions', 'Making things colder', 'Adding water', 'Blocking sunlight'],
            correctIndex: 0,
            hint: 'Think about what disinfectants do to germs.',
            explanation: 'Disinfectants chemically break down or destroy germs.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The immune system protects us by:',
            options: ['Identifying and attacking invaders', 'Making us run faster', 'Changing our hair color', 'Making us taller'],
            correctIndex: 0,
            hint: 'Think about what white blood cells do.',
            explanation: 'The immune system detects and destroys harmful microbes.'
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Disease spread, chemical defense, and immune response all work together to protect health', 'Only washing hands matters', 'Germs are always harmless', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the whole process of disease and defense.',
            explanation: 'Physical transmission, chemical disinfectants, and biological immunity all help stop disease.'
        },
        // HARD
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A new virus that mutates quickly is hard to stop because:',
            options: ['It can evade immune defenses and resist treatments', 'It is always harmless', 'It never spreads', 'It is easy to destroy'],
            correctIndex: 0,
            hint: 'Think about why flu viruses change every year.',
            explanation: 'Fast mutation lets viruses escape immune detection and resist drugs.'
        }
    ]
};