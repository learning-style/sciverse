import { AssessmentData } from '../../types';

/**
 * Big Idea 2 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P2 (gas laws, kelvin, why density stops identifying), L3C2 (the mole
 * as the bridge from ratios to grams), L3B2 (diffusion time as the real limit).
 *
 * The final cross question asks what the three have in common, which is the
 * organising idea of Level 3 itself: each removes a simplification rather than
 * correcting an error.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea2Level3Assessment: AssessmentData = {
    bigIdea: 2,
    level: 3,
    title: 'What Is Everything Made Of?',
    subtitle: 'Level 3 -- Gas Laws, the Mole and the Diffusion Limit',
    icon: '🧪',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why does squeezing a gas change its density so much more than squeezing a solid?',
            options: ['A gas is mostly empty space, and squeezing removes space', 'Gas particles are smaller', 'Solids are heavier', 'Gas particles are easier to compress individually'],
            correctIndex: 0,
            hint: 'What is actually being removed?',
            explanation: 'Solid particles already touch, so there is almost nothing to remove. A gas is about 1,700 times more spread out.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'One mole of a substance is:',
            options: ['Its formula mass in grams, containing 6.022 x 10²³ particles', 'One gram of the substance', '6.022 x 10²³ grams', 'The mass of a single molecule'],
            correctIndex: 0,
            hint: 'The bridge from relative masses to grams.',
            explanation: 'Weigh out the relative mass in grams and you always get the same count -- the Avogadro constant.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Diffusion time over a distance L goes as:',
            options: ['L², so twice the distance takes four times as long', 'L, so twice the distance takes twice as long', 'The square root of L', 'It does not depend on distance'],
            correctIndex: 0,
            hint: 'Look at the units of D: m² per second.',
            explanation: 't ≈ L²/2D. A random wander makes very poor progress, and the penalty compounds with distance.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Temperatures must be converted to kelvin before taking a ratio because:',
            options: ['The Celsius zero is arbitrary, so ratios of °C mean nothing', 'Kelvin numbers are larger', 'Celsius cannot go below zero', 'Kelvin is the SI unit and looks more professional'],
            correctIndex: 0,
            hint: 'At 0 °C, are the particles still moving?',
            explanation: 'Kelvin starts at absolute zero, where motion stops, so a ratio on that scale corresponds to something physical.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A sealed rigid container of gas at 27 °C and 100 kPa is heated to 327 °C. The new pressure is:',
            options: ['200 kPa', '1,211 kPa', '400 kPa', '100 kPa, since the volume did not change'],
            correctIndex: 0,
            hint: 'Convert both temperatures to kelvin first.',
            explanation: '300 K to 600 K is a genuine doubling, so the pressure doubles. Using Celsius suggests a twelvefold rise, which is wrong.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'How many moles are in 36 g of water? Water\'s molar mass is 18 g/mol.',
            options: ['2 mol', '0.5 mol', '648 mol', '18 mol'],
            correctIndex: 0,
            hint: 'Which way must you divide for the grams to cancel?',
            explanation: 'n = m/M = 36 / 18 = 2 mol. g ÷ (g/mol) leaves mol; the other way round gives mol/g.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A cell of radius 20 µm takes 0.1 s for oxygen to reach its centre. At radius 40 µm it takes:',
            options: ['About 0.4 s', 'About 0.2 s', 'About 0.05 s', 'About 0.1 s, unchanged'],
            correctIndex: 0,
            hint: 'Time goes as the square of distance.',
            explanation: 'Doubling the distance multiplies the time by 2² = 4, so 0.1 s becomes 0.4 s.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'L2P2 said density identifies a material. L3P2 shows this is false for:',
            options: ['Gases, whose density depends on pressure and temperature', 'Metals', 'Liquids', 'Mixtures only'],
            correctIndex: 0,
            hint: 'Air is 0.0012 g/cm³ at sea level and 0.23 in a scuba tank.',
            explanation: 'A gas is mostly empty space, so how much space it occupies is a matter of circumstance, not identity.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A sealed crisp packet is carried to where the outside pressure is half. Its gas density:',
            options: ['Halves, because the volume roughly doubles while the particles stay the same', 'Doubles, because the bag is under less pressure', 'Stays the same, since no gas escaped', 'Cannot be determined without the temperature'],
            correctIndex: 0,
            hint: 'pV = constant at fixed temperature.',
            explanation: 'Half the pressure means double the volume. The same particles in twice the space is half the density.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Burning carbon needs one O₂ per carbon atom: C + O₂ → CO₂. How much oxygen burns 12 g of carbon? O₂ is 32 g/mol.',
            options: ['32 g', '12 g', '44 g', '24 g'],
            correctIndex: 0,
            hint: 'Mass to moles, use the equation, moles back to mass.',
            explanation: '12 g of carbon is 1 mol, so 1 mol of O₂ is needed, which weighs 32 g. Equations count particles, not grams.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why does a large animal need a circulatory system rather than just a heavily folded body surface?',
            options: ['Folding adds surface but cannot shorten the journey, and diffusion over centimetres would take hours', 'A folded surface would be too fragile', 'Large animals cannot make enough membrane', 'Folding only works for single cells'],
            correctIndex: 0,
            hint: 'Surface area and transport time are separate problems.',
            explanation: 'Bulk flow moves material at a real speed, so time is proportional to distance rather than its square. Capillaries then leave only ~20 µm for diffusion.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do all three Level 3 lessons in this Big Idea have in common?',
            options: ['Each removes a simplification that the Level 2 lesson depended on', 'Each introduces a new unit', 'Each corrects an error made at Level 2', 'Each concerns only gases'],
            correctIndex: 0,
            hint: 'Was Level 2 wrong, or incomplete?',
            explanation: 'Density identifies solids but not gases; relative masses compare but cannot weigh; 6/L is real but diffusion time is the binding constraint. Level 2 was true within a range.'
        }
    ]
};
