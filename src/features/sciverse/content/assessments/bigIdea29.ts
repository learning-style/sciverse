import { AssessmentData } from '../../types';

/**
 * Big Idea 29 Assessment: "How Do Diseases Spread and Stop?"
 * Covers P29 (Contact Networks), C29 (Germ Busters), B29 (The Germ Fighters)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea29Assessment: AssessmentData = {
    bigIdea: 29,
    title: 'How Do Diseases Spread and Get Stopped?',
    subtitle: 'Transmission, Chemical Defenses, and Immune Response',
    icon: '🦠',
    questions: [
        // ── EASY ──
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
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A vaccine helps by teaching the immune system to:',
            options: ['Recognise a germ before a real infection', 'Grow more skin', 'Digest food faster', 'Lower body temperature'],
            correctIndex: 0,
            hint: 'It builds memory in advance.',
            explanation: 'Vaccination primes memory cells so response is fast on real exposure.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Disease spread, chemical defense, and immune response all work together to protect health', 'Only washing hands matters', 'Germs are always harmless', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the whole process of disease and defense.',
            explanation: 'Physical transmission, chemical disinfectants, and biological immunity all help stop disease.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Disease spreads faster when the contact rate is:',
            options: ['Higher', 'Lower', 'Zero', 'Unchanged'],
            correctIndex: 0,
            hint: 'Contacts drive transmission.',
            explanation: 'More contacts per person per day means more transmission opportunities.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Disinfectants work better with longer contact time because:',
            options: ['More reaction cycles can complete', 'The liquid gets colder', 'The germs grow tired', 'Time adds more chemical'],
            correctIndex: 0,
            hint: 'Kill depends on concentration and time.',
            explanation: 'Longer exposure allows more of the destructive reactions to occur.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Herd immunity protects people who are not immune because:',
            options: ['There are too few susceptible people left for the chain to continue', 'Germs become friendly', 'Immunity spreads through the air', 'Everyone stops moving'],
            correctIndex: 0,
            hint: 'Think about breaking the chain.',
            explanation: 'Enough immune individuals interrupt transmission chains.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A new virus that mutates quickly is hard to stop because:',
            options: ['It can evade immune defenses and resist treatments', 'It is always harmless', 'It never spreads', 'It is easy to destroy'],
            correctIndex: 0,
            hint: 'Think about why flu viruses change every year.',
            explanation: 'Fast mutation lets viruses escape immune detection and resist drugs.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'If each infected person infects more than one other person on average, the outbreak will:',
            options: ['Grow', 'Shrink', 'Stay exactly the same', 'End immediately'],
            correctIndex: 0,
            hint: 'Compare the number with one.',
            explanation: 'Above one, each generation is larger than the last, so cases grow.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Doubling disinfectant concentration and doubling contact time both help because kill rate depends on:',
            options: ['Concentration and time together', 'Colour', 'Container shape', 'Temperature only'],
            correctIndex: 0,
            hint: 'Two factors multiply.',
            explanation: 'Both increase the number of completed reactions with the target.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why is acting early in an outbreak so important?',
            options: ['Growth is exponential, so waiting multiplies the eventual case count', 'Germs are weaker on the first day', 'Nothing changes with timing', 'Late action is always cheaper'],
            correctIndex: 0,
            hint: 'Think about doubling.',
            explanation: 'Exponential growth means each delay compounds the final size.'
        }
    ]
};