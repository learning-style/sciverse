import { AssessmentData } from '../../types';

/**
 * Big Idea 3 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P3 (PE, KE, v = sqrt(2gh)), L2C3 (calorimetry), L2B3 (sunlight
 * captured by a leaf).
 *
 * The final cross question points at what the three share: every one ends with
 * most of the energy somewhere unwanted, which is what Level 3 turns into a law.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea3Level2Assessment: AssessmentData = {
    bigIdea: 3,
    level: 2,
    title: 'Where Does Energy Come From?',
    subtitle: 'Level 2 -- Energy Books, Calorimetry and the Leaf\'s One Per Cent',
    icon: '⚡',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Kinetic energy is given by:',
            options: ['½mv²', 'mgh', 'mv', '½mgh'],
            correctIndex: 0,
            hint: 'It depends on speed, and on speed squared.',
            explanation: 'KE = ½mv². Doubling the speed gives four times the energy, not twice.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'In calorimetry, the m and c in Q = m x c x dT belong to:',
            options: ['The water being heated', 'The fuel being burnt', 'The thermometer', 'The metal can'],
            correctIndex: 0,
            hint: 'Which substance is actually getting warmer?',
            explanation: 'The formula describes the thing being heated. The fuel\'s mass is only used at the end, to divide.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Roughly what fraction of the sunlight landing on a leaf becomes food?',
            options: ['About 1%', 'About 10%', 'About 50%', 'About 90%'],
            correctIndex: 0,
            hint: 'Leaves are green for a reason.',
            explanation: 'About 99% is reflected, warms the leaf or evaporates water. The 1% kept feeds every food chain.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A watt is:',
            options: ['One joule per second', 'One joule', 'One joule per metre', 'One thousand joules'],
            correctIndex: 0,
            hint: 'It is a rate, not an amount.',
            explanation: 'Power is energy per unit time, which is why times must be in seconds before multiplying.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 3 kg ball is released from 2.0 m on a smooth ramp. Take g = 9.8 m/s². Its speed at the bottom is:',
            options: ['6.3 m/s', '39.2 m/s', '3.1 m/s', 'It depends on the ramp\'s angle'],
            correctIndex: 0,
            hint: 'Set mgh = ½mv² and see what cancels.',
            explanation: 'v = √(2gh) = √39.2 = 6.26 m/s. The mass cancels, and only the height matters -- not the path.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Burning 1.0 g of fuel raises 250 g of water by 20 °C. Water is 4.2 J/g/°C. The energy per gram of fuel is:',
            options: ['21,000 J/g', '84 J/g', '1,050 J/g', '5,250 J/g'],
            correctIndex: 0,
            hint: 'Work out Q for the water first, then divide by the fuel.',
            explanation: 'Q = 250 x 4.2 x 20 = 21,000 J, and dividing by 1.0 g of fuel leaves 21,000 J/g.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A 2 m² leaf gets 5 hours of 1,000 W/m² sun. How much energy arrives?',
            options: ['36 MJ', '10 kJ', '10 MJ', '36 kJ'],
            correctIndex: 0,
            hint: 'Convert the hours to seconds first.',
            explanation: '1,000 x 2 x (5 x 3,600) = 36,000,000 J. Multiplying watts by hours instead of seconds gives a meaningless quantity.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A real ball arrives at the bottom of a ramp slower than mgh = ½mv² predicts. This shows:',
            options: ['Some energy became heat through friction, so a column was left out of the accounting', 'Energy was destroyed by the friction', 'The formula is wrong', 'The ball\'s mass changed on the way down'],
            correctIndex: 0,
            hint: 'Energy is never destroyed.',
            explanation: 'The full accounting is PE at the top = KE at the bottom + heat. The smooth-ramp formula predicts a maximum a real ball cannot beat.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Which statement about v = √(2gh) is correct?',
            options: ['A marble and a cannonball dropped the same height arrive at the same speed', 'A heavier ball arrives faster because it stores more energy', 'A steeper ramp gives a higher arrival speed', 'The speed depends on both mass and ramp angle'],
            correctIndex: 0,
            hint: 'What cancelled in the derivation?',
            explanation: 'Mass appears in both mgh and ½mv², so it divides out. Only g and h remain -- the path is irrelevant.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two students measure the same fuel. One gets 19 kJ/g, the other 25 kJ/g. The accepted value is 30. Which is nearer the truth, and why?',
            options: ['25 kJ/g, because heat always escapes, so every measurement of this kind is too low', '19 kJ/g, because a lower reading means less interference', 'Neither -- the difference must be random error', 'It cannot be judged without repeating both'],
            correctIndex: 0,
            hint: 'Both are below the accepted value. Is that random?',
            explanation: 'All the errors point one way -- heat lost to the room -- so the highest measurement is necessarily the best.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Is 1% photosynthetic efficiency a design fault?',
            options: ['No -- 1% of the enormous energy the Sun delivers is the entire supply for every food chain on Earth', 'Yes, and improving it is the only way to feed more people', 'Yes, because 99% of the plant\'s food is wasted', 'No, because plants also get energy from the soil'],
            correctIndex: 0,
            hint: 'One per cent of what?',
            explanation: 'It is 1% of incoming sunlight, not of the plant\'s food. That fraction builds every forest and fed every animal that ever lived.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'All three Level 2 lessons in this Big Idea end the same way. How?',
            options: ['Most of the energy ends up somewhere it was not wanted -- as heat, or reflected away', 'Each introduces a new SI unit', 'Each shows energy being destroyed', 'Each concerns only chemical energy'],
            correctIndex: 0,
            hint: 'The ball, the calorimeter and the leaf.',
            explanation: 'Friction on the ramp, heat lost to the room, 99% bouncing off the leaf. Level 3 asks whether that is a nuisance or a law.'
        }
    ]
};
