import { AssessmentData } from '../../types';

/**
 * Big Idea 13 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P13 (gear ratio, rope segments, torque x turns), L2C13 (degree of
 * polymerisation n = chain mass / monomer mass), L2B13 (the stomatal bargain:
 * about 300 g of water for each gram of CO2).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea13Level2Assessment: AssessmentData = {
    bigIdea: 13,
    level: 2,
    title: 'How Does Structure Shape Function?',
    subtitle: 'Level 2 -- Gear Ratios, Chain Lengths and the Leaf\'s Bargain',
    icon: '🧵',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The gear ratio of a pair of gears is:',
            options: ['The teeth on the driven gear divided by the teeth on the driver', 'The teeth on the driver divided by the teeth on the driven gear', 'The two tooth counts added together', 'The diameter of the bigger gear'],
            correctIndex: 0,
            hint: 'Driven on top.',
            explanation: 'gear ratio = driven teeth / driver teeth. Above 1 means the driven gear turns slower and pushes harder.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The degree of polymerisation, n, is:',
            options: ['The chain\'s mass divided by one monomer\'s mass', 'The chain\'s mass multiplied by one monomer\'s mass', 'The number of different monomers used', 'The mass of a single monomer'],
            correctIndex: 0,
            hint: 'It is a count of links.',
            explanation: 'n = chain mass / monomer mass. For polythene, 100,000 / 28 is about 3,600 units.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Stomata are:',
            options: ['Adjustable holes that let CO₂ in and water vapour out', 'Tubes that carry water up the stem', 'The green pigment inside a leaf', 'Cells that store sugar'],
            correctIndex: 0,
            hint: 'They are gaps between guard cells.',
            explanation: 'The same hole does both jobs, which is why a plant cannot take in CO₂ without losing water.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'In a pulley with 4 rope segments holding the load, the force you must pull with is about:',
            options: ['A quarter of the load\'s weight', 'Four times the load\'s weight', 'The same as the load\'s weight', 'Almost zero'],
            correctIndex: 0,
            hint: 'The segments share the load.',
            explanation: 'Force = weight / supporting segments, and you pull four times as much rope, so the work is unchanged.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 15-tooth driver turns at 90 turns a minute with a torque of 3 N m, driving a 45-tooth gear. What does the driven gear do?',
            options: ['30 turns a minute at 9 N m', '270 turns a minute at 9 N m', '30 turns a minute at 3 N m', '90 turns a minute at 1 N m'],
            correctIndex: 0,
            hint: 'Work out the ratio, then divide the turns and multiply the torque.',
            explanation: 'Ratio 45 / 15 = 3, so 90 / 3 = 30 turns a minute and 3 x 3 = 9 N m. Check: 3 x 90 = 9 x 30 = 270.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A chain has a mass of 56,000 and is built from ethylene units of mass 28. How many units long is it?',
            options: ['2,000', '1,568,000', '56,000', '28'],
            correctIndex: 0,
            hint: 'Divide the chain by one unit.',
            explanation: '56,000 / 28 = 2,000 units. Multiplying instead gives 1,568,000, which would weigh far more than the chain does.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A leaf makes 20 g of glucose. Taking 1.47 g of CO₂ for each gram of glucose, how much CO₂ did it take in?',
            options: ['About 29 g', 'About 14 g', 'Exactly 20 g', 'About 300 g'],
            correctIndex: 0,
            hint: 'Multiply the glucose by 1.47.',
            explanation: '20 x 1.47 = 29.4 g. The CO₂ is heavier than the sugar built from it, because the sugar keeps only the carbon.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'What do a gear ratio, a chain length and a leaf\'s water cost have in common?',
            options: ['Each is a count or ratio of parts that decides what the system can do', 'All three are measured in grams', 'None of them can be measured directly', 'All three apply only to living things'],
            correctIndex: 0,
            hint: 'Look at the Big Idea 13 question.',
            explanation: 'Teeth, units and holes: counting the parts tells you the exchange rate the structure sets.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A gearbox multiplies the turning force by 5. What happens to the turns and to the work each minute?',
            options: ['The turns fall to a fifth, and the work each minute is unchanged', 'The turns stay the same, and the work is five times as much', 'The turns rise five times, and so does the work', 'Both the turns and the work fall to a fifth'],
            correctIndex: 0,
            hint: 'Torque x turns is the thing to watch.',
            explanation: 'Five times the torque comes with a fifth of the turns, so torque x turns -- the work each minute -- is the same. A real gearbox gives back slightly less.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two pieces of polythene have chains of the same length, but one is stiff and one is floppy. What explains it?',
            options: ['The chains are shaped differently: straight chains pack closely, branched ones are held apart', 'One is made of heavier monomers', 'One is made of a different element', 'The stiff one must have shorter chains after all'],
            correctIndex: 0,
            hint: 'Length is only half the story.',
            explanation: 'Straight chains lie close together and make a stiff plastic; branches hold the chains apart and make a soft one. Same monomer, same length, different packing.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A tree has 5 m² of leaf, each square metre making 14 g of glucose a day. With 1.47 g of CO₂ for each gram of glucose and 300 g of water for each gram of CO₂, how much water does it lose?',
            options: ['About 31 litres', 'About 21 litres', 'About 4 litres', 'About 103 litres'],
            correctIndex: 0,
            hint: 'Glucose, then CO₂, then water.',
            explanation: 'Glucose 70 g, CO₂ 70 x 1.47 = 102.9 g, water 102.9 x 300 = 30,870 g, about 31 litres. The 21 litres answer forgets the 1.47.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does closing its stomata not solve a plant\'s water problem?',
            options: ['The same holes carry its CO₂ supply, so photosynthesis nearly stops as well', 'Closing them makes the leaf overheat instead', 'The water simply leaves through the roots instead', 'Closed stomata lose water faster than open ones'],
            correctIndex: 0,
            hint: 'One hole, two jobs.',
            explanation: 'Air is only 0.04% CO₂ and a leaf stores very little, so with the holes shut the food supply stops within minutes. Desert plants get round it by opening at night.'
        }
    ]
};
