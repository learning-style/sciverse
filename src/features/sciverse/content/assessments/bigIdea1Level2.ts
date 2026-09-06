import { AssessmentData } from '../../types';

/**
 * Big Idea 1 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P1 (a = F/m and net force), L2C1 (Q = m x c x dT and specific heat
 * capacity), L2B1 (moments in the arm).
 *
 * Unlike the Level 1 papers, most questions ask for a worked number rather than
 * a recalled fact, and the distractors are the specific mistakes each lesson
 * teaches against: using your own push instead of the net force, stopping before
 * multiplying by c, and inverting a fraction.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea1Level2Assessment: AssessmentData = {
    bigIdea: 1,
    level: 2,
    title: 'Why Do Things Move?',
    subtitle: 'Level 2 -- Forces, Heat and Levers, In Numbers',
    icon: '🧮',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In a = F / m, what does the F stand for?',
            options: ['The net force -- what is left after friction and any opposing forces are subtracted', 'The force you personally apply', 'The weight of the object', 'The force of friction on its own'],
            correctIndex: 0,
            hint: 'What goes in is not what you push with.',
            explanation: 'Putting your own push into the formula quietly assumes there is no friction.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Specific heat capacity is the energy needed to:',
            options: ['Warm 1 gram of a substance by 1 °C', 'Warm the whole object by 1 °C', 'Melt 1 gram of the substance', 'Heat 1 gram all the way to 100 °C'],
            correctIndex: 0,
            hint: 'The word "specific" means per unit of mass.',
            explanation: 'Warming the whole object by 1 °C is heat capacity. Dividing the mass out gives the specific version.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In the lever formed by your arm, the pivot is:',
            options: ['The elbow', 'The shoulder', 'The wrist', 'The bicep itself'],
            correctIndex: 0,
            hint: 'It is the joint the forearm turns about.',
            explanation: 'Distances in the moment equation are measured from the elbow.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A quantity sitting in the denominator of a formula:',
            options: ['Makes the answer smaller as it gets bigger', 'Makes the answer bigger as it gets bigger', 'Has no effect on the answer', 'Only matters when it is a large number'],
            correctIndex: 0,
            hint: 'Below the line means dividing.',
            explanation: 'That is an inverse proportion -- mass in a = F/m behaves this way.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 4 kg trolley has a net force of 10 N acting on it. What is its acceleration?',
            options: ['2.5 m/s²', '40 m/s²', '0.4 m/s²', '14 m/s²'],
            correctIndex: 0,
            hint: 'Divide, and check the answer should be smaller than the force.',
            explanation: '10 N / 4 kg = 2.5 m/s². Multiplying would mean heavier things accelerate more.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'How much energy heats 100 g of water by 20 °C? Water is 4.2 J/g/°C.',
            options: ['8,400 J', '2,000 J', '420 J', '124.2 J'],
            correctIndex: 0,
            hint: 'Work out the gram-degrees first, then multiply by the price.',
            explanation: '100 g x 20 °C = 2,000 gram-degrees, and 2,000 x 4.2 J = 8,400 J.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A 30 N bag is held 28 cm from the elbow. The bicep attaches 4 cm from the elbow. What force must the bicep pull with?',
            options: ['210 N', '30 N', '840 N', '4.3 N'],
            correctIndex: 0,
            hint: 'Muscle force = load x load distance / muscle distance.',
            explanation: '30 N x 28 cm / 4 cm = 210 N -- seven times the weight of the bag.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Multiply the units g x J/g/°C x °C. What are you left with?',
            options: ['J', 'g', '°C', 'J/g'],
            correctIndex: 0,
            hint: 'Cancel anything that appears above and below.',
            explanation: 'Grams cancel and degrees cancel, leaving joules -- a check that the formula is assembled correctly.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An 8 kg sled is pushed with 40 N. Friction drags back with 16 N. What is the acceleration?',
            options: ['3 m/s²', '5 m/s²', '2 m/s²', '7 m/s²'],
            correctIndex: 0,
            hint: 'Find the net force before you divide.',
            explanation: 'Net force = 40 - 16 = 24 N, and 24 N / 8 kg = 3 m/s². Using 40 N would ignore the friction.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Ice sitting at exactly 0 °C is heated steadily, but the thermometer does not move at all. Why?',
            options: ['The energy is breaking the grips between particles rather than speeding them up', 'The heater is too weak to warm ice', 'Ice cannot absorb energy until it has melted', 'Thermometers stop working at 0 °C'],
            correctIndex: 0,
            hint: 'Temperature only measures the jiggling.',
            explanation: 'At a change of state all the energy goes into pulling particles apart, which a thermometer cannot see. Q = mcdT reads dT = 0 °C as no energy at all, which is why the formula fails here.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'You hold the same bag, but move it from 14 cm to 28 cm from your elbow. The force your bicep must pull with:',
            options: ['Doubles', 'Stays the same, because the bag has not changed weight', 'Halves', 'Goes up four times'],
            correctIndex: 0,
            hint: 'Distance is in the numerator.',
            explanation: 'Load distance doubled and everything else is unchanged, so the muscle force doubles -- which is why arm\'s length is so much harder.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Doubling which of these would HALVE the answer?',
            options: ['The mass in a = F / m, and the c in dT = Q / (m x c)', 'The net force in a = F / m', 'The load in the lever equation', 'The temperature change in Q = m x c x dT'],
            correctIndex: 0,
            hint: 'Which ones sit in the denominator?',
            explanation: 'Both are denominators, so doubling either halves the result. The other three are numerators, so doubling them doubles the answer.'
        }
    ]
};
