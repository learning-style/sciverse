import { AssessmentData } from '../../types';

/**
 * Big Idea 49 Assessment: "How Do We Use Earth Resources Responsibly?"
 * Covers P49 (The Cost of Digging), C49 (From Rock to Metal), B49 (Healing the Land)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea49Assessment: AssessmentData = {
    bigIdea: 49,
    title: 'How Do We Use Earth Resources Responsibly?',
    subtitle: 'Digging, Smelting & Healing',
    icon: '⛏️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Most of what a mine costs to run goes on:',
            options: ['Lifting rock up out of the ground', 'Sharpening the drills', 'Painting the machines', 'Lighting the office'],
            correctIndex: 0,
            hint: 'Think of carrying a bag upstairs.',
            explanation: 'Raising every load is where a mine spends its energy.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Metal inside rock is usually:',
            options: ['Joined onto other things, often oxygen', 'Sitting in shiny lumps', 'Floating in water', 'Painted on the outside'],
            correctIndex: 0,
            hint: 'Could you sieve it out?',
            explanation: 'Metal in ore is chemically joined to other elements.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Soil is made of:',
            options: ['Tiny bits of broken rock mixed with rotted plants', 'Only crushed rock', 'Only sand', 'Only water and rock'],
            correctIndex: 0,
            hint: 'What holds the water like a sponge?',
            explanation: 'The rotted-plant part is what makes soil more than gravel.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Recycling an old metal can uses far less heat than making new metal because:',
            options: ['The metal is already free of the oxygen it was joined to', 'Cans are thinner than rocks', 'Recycling plants are warmer', 'Old metal melts at a lower heat'],
            correctIndex: 0,
            hint: 'What work was already done years ago?',
            explanation: 'Recycling skips both the digging and the smelting.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why does a mine cost more fuel every year, even with brand new machines?',
            options: ['The shallow ore went first, so every load now comes from deeper', 'Machines always waste more fuel over time', 'Fuel simply gets dearer', 'Miners work more slowly'],
            correctIndex: 0,
            hint: 'New machines did not stop it.',
            explanation: 'Depth increases relentlessly because the cheapest ore is taken first.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Charcoal is heated with crushed rock in a smelter because charcoal:',
            options: ['Grabs the oxygen and lets the metal go free', 'Melts the rock faster', 'Makes the metal heavier', 'Colours the metal'],
            correctIndex: 0,
            hint: 'What is charcoal hungry for?',
            explanation: 'Carbon strips the oxygen away, freeing the metal.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why do moss and lichen come back before grasses do?',
            options: ['They can cling to bare rock and need no soil at all', 'They grow faster than grass', 'They need less light', 'Their seeds are lighter'],
            correctIndex: 0,
            hint: 'What does a grass root need?',
            explanation: 'Moss and lichen build the first soil that grass then needs.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A thousand trees planted on fresh mine waste nearly all die. Why?',
            options: ['There is no soil yet, and soil takes years of living things to build', 'The trees were the wrong sort', 'They were planted in the wrong season', 'There was too much rain'],
            correctIndex: 0,
            hint: 'What is missing from crushed rock?',
            explanation: 'Soil must be built before deep-rooted plants can survive.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Ore at 400 metres versus ore at 20 metres. What else makes the deep mine costly?',
            options: ['Water must be pumped out and fresh air pumped down', 'The rock is very much harder', 'The metal is of poorer quality', 'The drills wear out faster'],
            correctIndex: 0,
            hint: 'People have to breathe down there.',
            explanation: 'Depth adds pumping and ventilation on top of the lifting.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Rock A holds 30 spoonfuls of copper per bucket; Rock B holds 2. Why is Rock B worse for the land?',
            options: ['About fifteen times as much rock is dug, crushed, heated and dumped', 'Its copper is of lower quality', 'It needs a different smelter', 'Its copper rusts more'],
            correctIndex: 0,
            hint: 'Copper is copper.',
            explanation: 'Poor ore multiplies every stage of the process, and the waste.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two identical sites: one left alone, one given soil and grass. After 20 years the second has trees. Why?',
            options: ['It was started several steps along, so its years went into growing not soil-making', 'Its rock underneath was better', 'It got more rain', 'Its grass seed was stronger'],
            correctIndex: 0,
            hint: 'Nobody skipped a step.',
            explanation: 'A head start on the sequence saves decades of soil building.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which set of actions best describes using Earth resources responsibly?',
            options: ['Take less, use richer rock, recycle, and start healing on day one', 'Dig faster so the mine closes sooner', 'Use the deepest ore first', 'Plant trees immediately on bare waste'],
            correctIndex: 0,
            hint: 'All four come from P49, C49 and B49.',
            explanation: 'Each action targets a different cost the three lessons uncovered.'
        }
    ]
};
