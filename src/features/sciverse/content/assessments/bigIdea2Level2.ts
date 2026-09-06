import { AssessmentData } from '../../types';

/**
 * Big Idea 2 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P2 (density as identity), L2C2 (relative atomic and formula mass),
 * L2B2 (surface area to volume).
 *
 * The cross questions test the thread running through all three: dividing one
 * quantity by another so that size cancels. The last one asks the learner to
 * derive the 3.7 that L2C33 simply handed them.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea2Level2Assessment: AssessmentData = {
    bigIdea: 2,
    level: 2,
    title: 'What Is Everything Made Of?',
    subtitle: 'Level 2 -- Density, Formula Mass and Why Cells Are Small',
    icon: '⚖️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Density is defined as:',
            options: ['Mass divided by volume', 'Volume divided by mass', 'Mass multiplied by volume', 'Mass minus volume'],
            correctIndex: 0,
            hint: 'The unit is grams PER cubic centimetre.',
            explanation: '"Per" means divided by, and names the numerator: grams on top, cm³ underneath.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Relative atomic masses have no units because they are:',
            options: ['One atom\'s mass compared against another\'s', 'Too small to measure', 'Always whole numbers', 'Measured in grams'],
            correctIndex: 0,
            hint: 'A mass divided by a mass.',
            explanation: 'Dividing like by like cancels the units, exactly as it does for μ in L3P1.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'For a cube of side L, the surface-area-to-volume ratio is:',
            options: ['6 / L', '6L²', 'L³', 'L² / L³ x 6L'],
            correctIndex: 0,
            hint: 'SA = 6L² and V = L³.',
            explanation: '6L² divided by L³ cancels to 6/L -- an inverse proportion.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'What do density, relative atomic mass and SA/V all have in common?',
            options: ['Each divides one quantity by another so that size cancels out', 'Each is measured in grams', 'Each applies only to solids', 'Each is a percentage'],
            correctIndex: 0,
            hint: 'Why divide at all?',
            explanation: 'Dividing removes how much you happen to have, leaving a number that describes the thing itself.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A block has a mass of 216 g and a volume of 80 cm³. What is it?',
            options: ['Aluminium, at 2.70 g/cm³', 'Iron, at 7.87 g/cm³', 'Oak, at 0.75 g/cm³', 'Gold, at 19.30 g/cm³'],
            correctIndex: 0,
            hint: 'Divide, then look it up.',
            explanation: '216 / 80 = 2.70 g/cm³, which matches aluminium exactly.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'What is the formula mass of methane, CH₄? Use C = 12, H = 1.',
            options: ['16', '48', '13', '52'],
            correctIndex: 0,
            hint: 'The subscript multiplies only the atom it follows.',
            explanation: '12 + (4 x 1) = 16. The 4 multiplies the hydrogen, not the carbon.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A cube-shaped cell of side 2 µm grows to side 4 µm. Its volume:',
            options: ['Grows 8 times, while the SA/V ratio halves', 'Grows 2 times, and the ratio halves', 'Grows 8 times, and the ratio doubles', 'Grows 4 times, and the ratio stays the same'],
            correctIndex: 0,
            hint: 'Volume goes as L³, area as L².',
            explanation: 'V goes from 8 to 64 µm³, an eightfold rise, while 6/L falls from 3.0 to 1.5 per µm.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Water is 89% oxygen by mass but two thirds hydrogen by atom count. Both are true because:',
            options: ['Percentage by mass and percentage by count are different questions', 'One of the two figures must be a mistake', 'Oxygen atoms are more numerous than they look', 'Hydrogen weighs the same as oxygen'],
            correctIndex: 0,
            hint: 'The atoms are not equally heavy.',
            explanation: 'One oxygen at 16 outweighs two hydrogens at 1 each, so by mass it dominates while being outnumbered.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A bar sold as solid gold has a mass of 500 g and a volume of 40 cm³. Gold is 19.30 g/cm³. What follows?',
            options: ['It is not solid gold -- its density is 12.5 g/cm³, and 500 g of gold would occupy only 25.9 cm³', 'It could be gold, since 500 g is a plausible mass for a bar', 'It is gold, but a small piece', 'Nothing can be said without knowing its shape'],
            correctIndex: 0,
            hint: 'Work out what volume 500 g of real gold would fill.',
            explanation: '500 / 40 = 12.5 g/cm³ against gold\'s 19.30. The bar is half as big again as real gold of that mass.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'You have 100 g of water and 100 g of carbon dioxide. Which holds more oxygen by mass?',
            options: ['The water, about 89 g against 73 g', 'The carbon dioxide, since it has two oxygen atoms per molecule', 'They are equal, since both masses are 100 g', 'It cannot be determined from formulas alone'],
            correctIndex: 0,
            hint: 'Work out oxygen\'s share of each formula mass.',
            explanation: 'Water is 16/18 = 88.9% oxygen; carbon dioxide is 32/44 = 72.7%, because the heavy carbon takes a large share.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A mouse eats a quarter of its body mass daily; an elephant only 4%. Why?',
            options: ['The mouse has far more surface per unit of volume, so it loses heat much faster and must keep replacing it', 'Small animals have faster metabolisms, which is simply an inbuilt property of being small', 'Mice have less efficient digestion', 'Elephants store food in their trunks'],
            correctIndex: 0,
            hint: 'Heat leaves through surface but is made throughout volume.',
            explanation: 'The same 6/L that limits cell size governs heat loss. An elephant\'s ears are surface deliberately added for the opposite problem.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'L2C33 asked you to multiply a mass of carbon by 3.7 to get carbon dioxide. Where does 3.7 come from?',
            options: ['The formula mass of CO₂ divided by the atomic mass of carbon: 44 / 12', 'It was measured experimentally and must be memorised', 'The two oxygen atoms, since 2 x 16 = 32 and 32 / 12 is close to 3.7', 'The ratio of oxygen to carbon atoms in the molecule'],
            correctIndex: 0,
            hint: 'Work out CO₂\'s formula mass.',
            explanation: '12 + 2 x 16 = 44, and 44 / 12 = 3.67. It was never a fact to memorise.'
        }
    ]
};
