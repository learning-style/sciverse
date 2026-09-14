import { AssessmentData } from '../../types';

/**
 * Big Idea 9 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P9 (logistic growth, r x N x (1 - N/K), fastest at K/2), L3C9 (the
 * P and K numbers count oxides; 0.437 and 0.830; law of the minimum), L3B9
 * (mitotic index x cycle time, and where that condition fails).
 *
 * The distractors are the mistakes each lesson works through: leaving out the
 * brake, using the room used up, reading the oxide as the element, dividing by
 * the share, and timing cells that are not cycling.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea9Level3Assessment: AssessmentData = {
    bigIdea: 9,
    level: 3,
    title: 'How Do Things Grow?',
    subtitle: 'Level 3 -- S-Curves, Oxides and the Cell Cycle Clock',
    icon: '🌻',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In the logistic model, growth per week = r x N x (1 − N/K). What does (1 − N/K) stand for?',
            options: ['The share of room left before the full height', 'The share of the full height already reached', 'The growth rate, per week', 'The number of weeks left'],
            correctIndex: 0,
            hint: 'What is it worth when N reaches K?',
            explanation: 'At N = K it is 0 and growth stops. For a tiny plant it is nearly 1, so the brake is off.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'On a bag labelled 10-5-8, the 5 counts:',
            options: ['The percentage of phosphorus pentoxide, P₂O₅', 'The percentage of phosphorus itself', 'The kilograms of phosphorus in the bag', 'The percentage of potassium'],
            correctIndex: 0,
            hint: 'Labels keep an old habit from the 1800s.',
            explanation: 'The P number counts P₂O₅. To find phosphorus itself, multiply by 0.437.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The mitotic index is:',
            options: ['Cells in mitosis divided by cells counted', 'Cells in mitosis divided by the cycle time', 'The number of hours a cell spends in mitosis', 'Cells in interphase divided by cells in mitosis'],
            correctIndex: 0,
            hint: 'It is a share, with no units.',
            explanation: 'The numerator is the cells caught dividing; the denominator is every cell counted, dividing or not.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'In the logistic model, growth is fastest when the height is:',
            options: ['Half the full height', 'As small as possible', 'Nearly the full height', 'Always 32 cm'],
            correctIndex: 0,
            hint: 'Big enough to grow well, with room still left.',
            explanation: 'r x N x (1 − N/K) is largest at N = K/2. 32 cm was half of one particular sunflower\'s 64 cm.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A plant has r = 1 per week and a full height of K = 80 cm. At the start of a week it is 20 cm tall. How much does it grow that week?',
            options: ['15 cm', '20 cm', '5 cm', '60 cm'],
            correctIndex: 0,
            hint: 'Work out the share of room left first.',
            explanation: '1 − 20/80 = 0.75, and 1 x 20 x 0.75 = 15 cm. 20 cm leaves out the brake; 5 cm uses N/K, the room used up; 60 cm is K − N.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'P₂O₅ has a formula mass of 142 (P = 31, O = 16). What share of its mass is phosphorus?',
            options: ['62 / 142 = 0.437', '31 / 142 = 0.218', '62 / 80 = 0.775', '2 / 7 = 0.286'],
            correctIndex: 0,
            hint: 'Count every phosphorus atom, and divide by the whole formula.',
            explanation: 'Two P atoms: 2 x 31 = 62, over the formula mass of 142. 31 counts only one atom, 80 is the oxygen alone, and 2/7 counts atoms instead of mass.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A student counts 300 cells, and 45 are in mitosis. The cycle time is 24 hours. How long does mitosis take?',
            options: ['3.6 hours', '20.4 hours', '1.9 hours', '6.7 hours'],
            correctIndex: 0,
            hint: 'Find the mitotic index, then multiply by the cycle time.',
            explanation: '45 / 300 = 0.15, and 0.15 x 24 hours = 3.6 hours. 20.4 hours is interphase; 45 / 24 divides cells by hours.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'In the logistic model, r x K / 4 is:',
            options: ['The most growth that any week can add', 'The full height', 'The height at which growth is fastest', 'The growth in the first week'],
            correctIndex: 0,
            hint: 'Put N = K/2 into r x N x (1 − N/K).',
            explanation: 'r x (K/2) x (1/2) = r x K / 4, the top of the hump. The height where that happens is K/2.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A plant follows the logistic model with r = 1 per week. Its fastest week added 12 cm. What is its full height?',
            options: ['48 cm, because r x K / 4 = 12', '24 cm, because the fastest growth is at K/2', '12 cm, because the fastest week sets the full height', '96 cm, because the fastest week is at K/8'],
            correctIndex: 0,
            hint: 'Rearrange r x K / 4 = 12.',
            explanation: 'K = 4 x 12 / r = 48 cm. It grew fastest at 24 cm, which is K/2 -- not K itself.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A 25 kg bag is labelled 0-0-60. How much potassium does it hold?',
            options: ['About 12.5 kg', '15 kg', 'About 18 kg', 'About 6.6 kg'],
            correctIndex: 0,
            hint: 'The 60 counts K₂O. Potassium is 0.830 of K₂O\'s mass.',
            explanation: '60 x 0.830 = 49.8%, and 25 kg x 49.8 / 100 = 12.45 kg. 15 kg forgets the conversion, 18 kg divides by the share, and 6.6 kg uses phosphorus\'s 0.437.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A count about 10 mm behind an onion root tip finds 0 of 200 cells in mitosis. What should the student conclude?',
            options: ['The cells there have stopped cycling, so the method cannot time mitosis there', 'Mitosis there takes 0 hours', 'Mitosis there lasts for ever', 'The count must be wrong, because every root cell divides'],
            correctIndex: 0,
            hint: 'Check the condition the formula needs.',
            explanation: 'The formula assumes every counted cell is cycling. Behind the tip, cells stop dividing and stretch, so there is no mitosis to time.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A lawn has plenty of nitrogen but is short of phosphorus. The gardener doubles the nitrogen. What happens to the growth?',
            options: ['Little changes: growth is held back by the scarcest nutrient, phosphorus', 'It doubles, because nitrogen builds proteins', 'It halves, because nitrogen blocks phosphorus', 'It grows twice as fast until it reaches full height'],
            correctIndex: 0,
            hint: 'Picture a barrel with one short plank.',
            explanation: 'Liebig\'s law of the minimum: growth is limited by the nutrient scarcest compared with what the plant needs. Extra nitrogen cannot make up for missing phosphorus, and the excess washes away.'
        }
    ]
};
