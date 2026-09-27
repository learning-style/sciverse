import { AssessmentData } from '../../types';

/**
 * Big Idea 17 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P17 (stress = force / area), L2C17 (steel needed = tension / 400, and
 * how unequal concrete is in its two directions), L2B17 (the same material rolled
 * into a tube reaches further out).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea17Level2Assessment: AssessmentData = {
    bigIdea: 17,
    level: 2,
    title: 'How Do Structures Stay Standing?',
    subtitle: 'Level 2 -- Stress, Steel, and Hollow Bones',
    icon: '🏗️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Stress is:',
            options: [
                'The total force pressing on something',
                'The force divided by the area carrying it',
                'The mass of the material',
                'The height of the column'
            ],
            correctIndex: 1,
            hint: 'A drawing pin and your thumb push with the same force, yet only one pierces the wood.',
            explanation: 'Stress = force / area, in newtons per square millimetre (N/mm²). A force is never dangerous on its own — only when it is concentrated into a small area.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Concrete is roughly how much weaker when stretched than when squeezed?',
            options: ['Just as strong either way', 'Twice as weak', 'Ten times weaker', 'A hundred times weaker'],
            correctIndex: 2,
            hint: 'About 30 N/mm² one way and about 3 the other.',
            explanation: 'Concrete takes about 30 N/mm² squeezed but only about 3 N/mm² stretched — a tenth. Squeezed, the stone chippings jam together; stretched, everything depends on the cement gluing them.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A hollow bone compared with a solid rod made of the same amount of material is:',
            options: [
                'Lighter but weaker — that is the trade',
                'The same weight, and it can be stronger',
                'Heavier, because a tube needs more material',
                'Exactly as strong, just a different shape'
            ],
            correctIndex: 1,
            hint: 'The middle was not removed. It was moved.',
            explanation: 'Both hold the same material, so both weigh the same. The tube is stronger against bending because its material sits further from the centre, where it has more leverage.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A kilonewton (kN) is:',
            options: ['A thousand newtons', 'A hundred newtons', 'A thousandth of a newton', 'A unit of area'],
            correctIndex: 0,
            hint: 'Kilo always means the same thing.',
            explanation: '1 kN = 1,000 N, so 400 kN is 400,000 N. Putting kilonewtons into stress = force / area without converting gives an answer a thousand times too small.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A beam has 120 kN of stretching pull. Steel carries 400 N/mm². How much steel does it need?',
            options: ['300 mm²', '0.3 mm²', '48,000 mm²', '3,000 mm²'],
            correctIndex: 0,
            hint: 'Convert to newtons first, then divide by the steel strength.',
            explanation: '120 kN = 120,000 N, and 120,000 / 400 = 300 mm². That is four bars of 10 mm, since one 10 mm bar is π x 5² = 78.5 mm².'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Enough material for a solid rod of radius 10 mm is rolled into a tube with a 2 mm wall. How far out does it reach? (R = r² / (2 x wall) + wall / 2)',
            options: ['13 mm', '20 mm', '26 mm', '50 mm'],
            correctIndex: 2,
            hint: 'R = 100 / 4 + 1.',
            explanation: 'R = 10² / (2 x 2) + 2 / 2 = 25 + 1 = 26 mm, which is 2.6 times the rod. Checking it holds the same material: π x (26² − 24²) = π x 100 = 314 mm², exactly the rod’s area.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A concrete column is 250 mm square and carries 500 kN. What stress is the concrete under?',
            options: ['8 N/mm²', '2 N/mm²', '2,000 N/mm²', '0.008 N/mm²'],
            correctIndex: 0,
            hint: 'Work out the area before anything else.',
            explanation: 'Area = 250 x 250 = 62,500 mm², and 500,000 / 62,500 = 8 N/mm². Against concrete’s limit of about 30 N/mm² that is comfortable. Dividing by 250 instead of 62,500 gives the 2,000 trap.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A beam needs 500 mm² of steel and only 12 mm bars are available, each 113.1 mm². How many bars?',
            options: ['4 bars', '5 bars', '42 bars', '4.4 bars'],
            correctIndex: 1,
            hint: 'You cannot buy part of a bar, and being short is not an option.',
            explanation: '500 / 113.1 = 4.4, which rounds UP to 5 bars giving 565 mm². Four bars would give only 452 mm², leaving the beam 48 mm² short — and short steel means the concrete above it cracks.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A builder has exactly enough concrete for a 200 mm square column at 10 N/mm². The design changes so the column must be twice as tall, leaving half the cross-section. Same concrete, same 400 kN load. What happens?',
            options: [
                'Nothing changes — the mass and the load are both the same',
                'The stress doubles to 20 N/mm², going from a third of the limit to two thirds',
                'The stress halves, because the load is spread over a taller column',
                'The column fails immediately, because 400 kN is too much'
            ],
            correctIndex: 1,
            hint: 'Stress counts area, not mass.',
            explanation: 'Area falls from 40,000 to 20,000 mm², so stress rises from 10 to 20 N/mm². Nothing was added or removed, yet the spare capacity halved — which is exactly P17’s point about two bridges of the same mass. Worse, the taller column is also far easier to buckle.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A client wants the 120 kN beam built in concrete alone, no steel. Concrete gives way at about 3 N/mm² when stretched. How much concrete would have to do the stretching?',
            options: [
                'About 3,000 mm², ten times the steel',
                'About 40,000 mm², over a hundred times the steel',
                'About 300 mm², the same as the steel',
                'It cannot be calculated without knowing the beam’s depth'
            ],
            correctIndex: 1,
            hint: 'Ten times is concrete against itself, not concrete against steel.',
            explanation: '120,000 / 3 = 40,000 mm², against the steel’s 300 mm² — 133 times as much. Two different ratios live in this lesson: concrete squeezed against concrete stretched is ten, and concrete against steel in stretching is 133.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'The formula says a thinner wall always reaches further, so why has no animal evolved a bone with a paper-thin wall?',
            options: [
                'A thin-walled bone would weigh too little to be useful',
                'Because a very thin wall folds inwards instead of holding — it buckles, which the formula cannot see',
                'Because there is a limit to how much bone material an animal can make',
                'Because thin walls reach further but hold less material'
            ],
            correctIndex: 1,
            hint: 'Press on a drinks can from above. It does not crumble — it caves in.',
            explanation: 'Every wall thickness in the table holds the same material, so weight cannot be the reason. A thin wall fails by folding, not crushing. This is the same gap L2P17 left standing: a tall thin column bends, and a thin wall folds. Both are buckling.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'What single idea do the bridge pier, the reinforced beam and the hollow bone all demonstrate?',
            options: [
                'Stronger materials make stronger structures',
                'More material makes a stronger structure',
                'What matters is where the material sits relative to the force, not how much there is',
                'Every structure needs two materials working together'
            ],
            correctIndex: 2,
            hint: 'Two bridges of the same mass, remember, fared differently.',
            explanation: 'The pier spreads the force over more area, the beam puts steel exactly where the stretching is, and the bone moves its material outwards where the leverage is. All three keep the material constant and change only its arrangement — which is why P17 could open with two bridges of identical mass and different fates.'
        }
    ]
};
