import { AssessmentData } from '../../types';

/**
 * Big Idea 27 Assessment: "How Does Food Become Usable Energy?"
 * Covers P27 (Mechanical Digestion), C27 (Enzyme Chemistry), B27 (The Food Tube)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea27Assessment: AssessmentData = {
    bigIdea: 27,
    title: 'How Does Digestion Power Life?',
    subtitle: 'Physical Breakdown, Chemical Reactions, and Nutrient Absorption',
    icon: '🍽️',
    questions: [
        // ── EASY ──
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
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Digestion involves many organs working:',
            options: ['Together in sequence along one pathway', 'Completely independently', 'Only in the mouth', 'Only while asleep'],
            correctIndex: 0,
            hint: 'Think of a pipeline.',
            explanation: 'Each organ performs a stage in a coordinated sequence.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Digestion involves physical, chemical, and biological processes working together', 'Only chewing matters', 'Digestion is only chemical', 'Absorption happens in the mouth'],
            correctIndex: 0,
            hint: 'Think about the whole digestive process.',
            explanation: 'Digestion requires mechanical breakdown, chemical reactions, and biological absorption.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Chewing helps digestion mainly by:',
            options: ['Increasing the surface area enzymes can act on', 'Making food warmer', 'Removing all water', 'Adding enzymes'],
            correctIndex: 0,
            hint: 'Smaller pieces expose more surface.',
            explanation: 'More exposed surface lets chemical breakdown proceed faster.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Enzymes speed up digestion by:',
            options: ['Breaking specific molecules apart quickly', 'Adding energy to food', 'Cooling the stomach', 'Making food larger'],
            correctIndex: 0,
            hint: 'Each enzyme has a specific job.',
            explanation: 'Enzymes catalyse the breakdown of particular nutrient types.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Which enzyme acts on starch?',
            options: ['Amylase', 'Protease', 'Lipase', 'Insulin'],
            correctIndex: 0,
            hint: 'The names hint at their targets.',
            explanation: 'Amylase breaks starch into smaller sugars.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A person with no stomach acid would have trouble:',
            options: ['Digesting proteins', 'Absorbing water', 'Chewing food', 'Breathing'],
            correctIndex: 0,
            hint: 'What does acid do in the stomach?',
            explanation: 'Without acid, proteins are not properly denatured for enzyme action.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Stomach enzymes work best in acid, while intestinal enzymes prefer neutral conditions. This shows enzymes depend on:',
            options: ['The pH of their surroundings', 'The colour of the food', 'The time of day', 'The size of the meal'],
            correctIndex: 0,
            hint: 'Conditions must match the enzyme.',
            explanation: 'Each enzyme has an optimal pH range for its shape and activity.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Peristalsis moves food along by:',
            options: ['Waves of muscle squeezing behind the food', 'Gravity alone', 'Blowing air', 'Electrical sparks'],
            correctIndex: 0,
            hint: 'It works even lying down.',
            explanation: 'Sequential muscular contractions push food along the tract.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does digestion need both mechanical and chemical steps?',
            options: ['Grinding exposes surface area so enzymes can work fast enough', 'Chemistry alone is illegal', 'Grinding produces enzymes', 'Enzymes cannot touch food'],
            correctIndex: 0,
            hint: 'One step enables the other.',
            explanation: 'Mechanical breakdown multiplies the surface available for enzyme action.'
        }
    ]
};