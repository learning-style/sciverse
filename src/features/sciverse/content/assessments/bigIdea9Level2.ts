import { AssessmentData } from '../../types';

/**
 * Big Idea 9 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P9 (change and percentage change), L2C9 (fertiliser percentages by
 * mass), L2B9 (cell doublings, start x 2^n). The theme across all three is
 * growth measured in shares.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea9Level2Assessment: AssessmentData = {
    bigIdea: 9,
    level: 2,
    title: 'How Do Things Grow?',
    subtitle: 'Level 2 -- Percentages, Plant Food and Doublings',
    icon: '📈',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'To work out a percentage change, you divide the change by:',
            options: ['The starting value', 'The ending value', 'The time taken', '100'],
            correctIndex: 0,
            hint: 'It compares the growth with the size at the beginning.',
            explanation: 'percentage change = change / starting value x 100%.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A bag of fertiliser labelled 10-5-8 contains:',
            options: ['About 10 g of nitrogen in every 100 g of fertiliser', 'Exactly 10 g of nitrogen in the whole bag', '10 kg of nitrogen, whatever the size of the bag', '10 different nutrients'],
            correctIndex: 0,
            hint: 'The numbers are percentages by mass.',
            explanation: 'A percentage is parts in every hundred, so 10 means 10 g of nitrogen in every 100 g, whatever the bag\'s size.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'If every cell divides, one cell becomes how many after 3 doublings?',
            options: ['8', '6', '4', '3'],
            correctIndex: 0,
            hint: 'Double three times: 1, 2, 4, ...',
            explanation: '1 x 2³ = 1 x 2 x 2 x 2 = 8.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A percentage change of 100% means the quantity:',
            options: ['Doubled', 'Stayed the same', 'Halved', 'Grew by 1'],
            correctIndex: 0,
            hint: 'It added as much as it started with.',
            explanation: 'A 100% change adds 100% of the starting value, so the quantity ends at twice its start.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A seedling grows from 4 cm to 10 cm in a week. Its percentage change is:',
            options: ['150%', '60%', '250%', '6%'],
            correctIndex: 0,
            hint: 'The change is 6 cm. Divide by the starting height.',
            explanation: '6 / 4 x 100% = 150%. Dividing by the ending height gives 60%; 10 / 4 gives 250%.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'How much 20-10-10 fertiliser supplies 500 g of nitrogen?',
            options: ['2,500 g', '100 g', '10,000 g', '25 g'],
            correctIndex: 0,
            hint: 'Mass of fertiliser = mass of nutrient x 100 / percentage.',
            explanation: '500 x 100 / 20 = 2,500 g. 500 x 20 / 100 = 100 g is the nitrogen in 500 g of fertiliser, a different question.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Starting from 1 cell, with every cell dividing each time, about how many cells are there after 20 doublings?',
            options: ['About a million (1,048,576)', '40', '400', 'About a thousand'],
            correctIndex: 0,
            hint: 'Every 10 doublings multiplies by about a thousand.',
            explanation: '2²⁰ = 1,048,576: a thousand times a thousand. 20 x 2 = 40 treats each doubling as adding 2 cells.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement about doubling is true?',
            options: ['Each doubling is a 100% change, so the number of cells added grows every time', 'Each doubling adds the same number of cells', 'Each doubling is a 2% change', 'A doubling has no percentage change'],
            correctIndex: 0,
            hint: 'What share does a doubling add?',
            explanation: 'A doubling adds as many as there already are -- 100% -- so a bigger population adds more cells each round.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'In the same week, seedling A grows from 2 cm to 6 cm and seedling B from 30 cm to 40 cm. Which is true?',
            options: ['B added more centimetres, but A grew by a larger percentage: 200% against 33%', 'A added more centimetres and grew by a larger percentage', 'B grew by a larger percentage', 'They grew by the same percentage'],
            correctIndex: 0,
            hint: 'Work out each change, then divide each by its own start.',
            explanation: 'A: 4 cm and 4 / 2 x 100% = 200%. B: 10 cm and 10 / 30 x 100% = 33%.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A 200 m² lawn needs 5 g of nitrogen for each m². A gardener spreads a whole 20 kg bag of 10-5-8 on it. What happens?',
            options: ['Each m² gets 10 g, double what the grass can use, and much of the extra washes into rivers', 'Each m² gets 10 g, and the grass grows twice as fast', 'Each m² gets 1 g, far too little', 'Each m² gets exactly the 5 g it needs'],
            correctIndex: 0,
            hint: '20 kg x 10 / 100 is the nitrogen in the bag.',
            explanation: '2,000 g of nitrogen over 200 m² is 10 g for each m². Grass cannot use double; rain washes the extra away.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'In the doubling model, a body takes 45 doublings to reach 35.2 trillion cells. After 44 doublings, how many cells are there?',
            options: ['About 17.6 trillion -- only half the final number', 'About 34 trillion -- 98% of it', 'About 1 trillion', 'About 44 trillion'],
            correctIndex: 0,
            hint: 'The last doubling adds as many as there already are.',
            explanation: '2⁴⁴ = 17.6 trillion. The 45th doubling adds as many cells as all 44 before it put together.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A single bacterium divides every 20 minutes, and every new one does the same. How many are there after 5 hours?',
            options: ['32,768', '30', '225', '300'],
            correctIndex: 0,
            hint: '5 hours is 300 minutes. How many doublings is that?',
            explanation: '300 / 20 = 15 doublings, and 2¹⁵ = 32,768. 15 x 2 = 30 and 15² = 225 do not double.'
        }
    ]
};
