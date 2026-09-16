import { AssessmentData } from '../../types';

/**
 * Big Idea 12 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P12 (the inverse-square law, g = 9.8 x (R/r)^2), L2C12 (predicting a
 * missing element by averaging its neighbours), L2B12 (survival rates and the
 * share of survivors, generation by generation).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea12Level2Assessment: AssessmentData = {
    bigIdea: 12,
    level: 2,
    title: 'How Do Hidden Rules Shape Big Patterns?',
    subtitle: 'Level 2 -- Inverse Squares, Missing Elements and Spreading Traits',
    icon: '🌌',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Gravity follows an inverse-square law. Twice as far from a planet\'s centre, gravity is:',
            options: ['A quarter as strong', 'Half as strong', 'Twice as strong', 'Zero'],
            correctIndex: 0,
            hint: 'The pull spreads over a sphere, whose area grows with the square of the radius.',
            explanation: 'Twice the distance spreads the pull over four times the area, so it is a quarter as strong. It never reaches zero.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Interpolation means:',
            options: ['Estimating a value that sits between known values', 'Measuring a value exactly', 'Guessing at random', 'Adding values together'],
            correctIndex: 0,
            hint: 'Mendeleev used the neighbours around a gap.',
            explanation: 'The gap\'s properties should sit between its neighbours\', so their average is a good estimate.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A survival rate of 0.4 means:',
            options: ['4 in every 10 of that kind live to breed', 'Exactly 4 individuals survive', '40 young are born to each pair', 'The trait disappears in one generation'],
            correctIndex: 0,
            hint: 'It is a share of a group, not a count.',
            explanation: 'Survivors = number x survival rate, so 20 dark moths at 0.4 leave 8 survivors.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Mendeleev left gaps in his table because:',
            options: ['The pattern predicted elements that had not been discovered yet', 'He ran out of room on the page', 'He could not decide where some elements went', 'The gaps were printing mistakes'],
            correctIndex: 0,
            hint: 'A pattern worth trusting predicts what you have not seen.',
            explanation: 'He left space for missing elements and described them from their neighbours. Germanium was found seventeen years later.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A satellite sits two Earth radii from the centre of the Earth. How strong is gravity there? (Surface gravity 9.8 N/kg.)',
            options: ['About 2.5 N/kg', 'About 4.9 N/kg', '9.8 N/kg', 'About 1.1 N/kg'],
            correctIndex: 0,
            hint: 'R / r = 1/2, and the law squares it.',
            explanation: '(1/2)² = 1/4, so 9.8 / 4 = 2.45 N/kg. Halving is what you get by forgetting to square; 1.1 N/kg is three radii out.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A gap\'s four neighbours have relative atomic masses 28.1, 118.7, 69.7 and 74.9. What does the four-neighbour average predict?',
            options: ['72.9', '291.4', '145.7', '36.4'],
            correctIndex: 0,
            hint: 'Add the four, then divide by four.',
            explanation: '28.1 + 118.7 + 69.7 + 74.9 = 291.4, and 291.4 / 4 = 72.9. Germanium\'s real value is 72.6.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A wood has 80 light moths (survival 0.9) and 20 dark (survival 0.4). What share is dark after one generation?',
            options: ['10%', '20%', '8%', '40%'],
            correctIndex: 0,
            hint: 'Work out each kind\'s survivors, then take the dark ones out of all the survivors.',
            explanation: '72 light and 8 dark survive, so 8 / 80 = 10%. 8% divides by the 100 we started with, not the 80 survivors.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'What do Big Idea 12\'s Level 2 lessons have in common?',
            options: ['One small rule, applied over and over, builds a big pattern', 'All three are about gravity', 'Each pattern is a coincidence', 'Patterns can describe but never predict'],
            correctIndex: 0,
            hint: 'Look at what each lesson repeats.',
            explanation: '(R / r)² for every distance, a neighbour average for every gap, and a survival step for every generation.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A 70 kg astronaut is on the ISS, where gravity is 8.7 N/kg. How hard does Earth pull on them?',
            options: ['About 609 N, nearly their 686 N ground weight', '0 N -- they are weightless', 'About 686 N, exactly their ground weight', 'About 70 N'],
            correctIndex: 0,
            hint: 'Weight = mass x gravity at that height.',
            explanation: '70 x 8.7 = 609 N, about nine tenths of their ground weight. They float because they and the station fall together, not because the pull is gone.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Tellurium (mass 127.6) is placed before iodine (126.9) in the periodic table. What does that show?',
            options: ['Atomic mass is not the true ordering rule -- the number of protons is', 'The two masses were measured wrongly', 'Iodine belongs in the oxygen column after all', 'The periodic table follows no rule'],
            correctIndex: 0,
            hint: 'Which order matches how the elements behave?',
            explanation: 'Iodine behaves like the halogens, so properties won. Moseley later showed the real order is by protons: tellurium 52, iodine 53.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Soot darkens the bark: dark moths now survive at 0.9 and light at 0.4. Starting from 2% dark, what share is dark after one generation?',
            options: ['About 4.4%', 'About 1.8%', 'Still 2%', 'About 9%'],
            correctIndex: 0,
            hint: 'Survivors: 2 x 0.9 and 98 x 0.4.',
            explanation: '1.8 dark and 39.2 light survive, so 1.8 / 41 = 4.4%. It takes about eight generations to pass 90%.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Both moth colours survive at exactly the same rate, 70%. What happens to the dark share over many generations?',
            options: ['It stays at its starting value -- only the difference between the rates matters', 'It falls to zero', 'It climbs to 100%', 'It halves every generation'],
            correctIndex: 0,
            hint: 'Work out one generation with equal rates.',
            explanation: 'Each kind is multiplied by the same number, so the shares are unchanged. Selection needs a difference in survival.'
        }
    ]
};
