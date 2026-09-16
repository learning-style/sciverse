import { AssessmentData } from '../../types';

/**
 * Big Idea 13 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P13 (gear trains: ratios and efficiencies both multiply), L3C13
 * (crystalline fraction from density, f = (d - 0.85) / 0.15), L3B13 (a
 * straight water line against a saturating sugar curve).
 *
 * The distractors are the mistakes each lesson works through: adding losses
 * instead of multiplying them, reading density on a 0-to-1 scale, and
 * treating the sugar curve as a straight line.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea13Level3Assessment: AssessmentData = {
    bigIdea: 13,
    level: 3,
    title: 'How Does Structure Shape Function?',
    subtitle: 'Level 3 -- Gear Trains, Chain Packing and the Stomatal Optimum',
    icon: '🔩',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Along a gear train, the overall gear ratio is:',
            options: ['The stage ratios multiplied together', 'The stage ratios added together', 'The largest stage ratio', 'The number of stages'],
            correctIndex: 0,
            hint: 'Each stage acts on what the last one handed it.',
            explanation: 'Three stages of 4 give 4 x 4 x 4 = 64, not 12.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'In a solid polymer, a crystalline region is one where the chains:',
            options: ['Lie straight and parallel, stacked closely', 'Are tangled like cooked spaghetti', 'Have broken into separate pieces', 'Are made of a different monomer'],
            correctIndex: 0,
            hint: 'Think of pencils in a box.',
            explanation: 'Neatly stacked chains fill space better, which is why crystalline regions are denser than tangled ones.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'As a leaf opens its stomata wider, the water it loses:',
            options: ['Rises in step with the opening, with no bottleneck', 'Levels off once the leaf is full', 'Falls, because the leaf cools', 'Stays the same at any opening'],
            correctIndex: 0,
            hint: 'Which of the two curves is a straight line?',
            explanation: 'W = 6 x g is a straight line. The sugar curve is the one that levels off.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A gear train has four stages, each 95% efficient. What share of the power comes out?',
            options: ['About 81%', 'Exactly 80%', '95%', '20%'],
            correctIndex: 0,
            hint: 'Multiply the efficiencies.',
            explanation: '0.95⁴ = 0.814. Adding the losses gives 80%, which is close but wrong: each stage takes its share of what reaches it.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A train has three stages, each with a ratio of 3 and an efficiency of 96%. What are the overall ratio and efficiency?',
            options: ['27 and about 88%', '9 and about 88%', '27 and 96%', '81 and about 92%'],
            correctIndex: 0,
            hint: 'Both multiply: ratio³ and efficiency³.',
            explanation: '3 x 3 x 3 = 27, and 0.96³ = 0.885, about 88%.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A polythene sample measures 0.94 g/cm³. What fraction of it is crystalline? (Amorphous 0.85, crystalline 1.00.)',
            options: ['60%', '94%', '9%', '40%'],
            correctIndex: 0,
            hint: 'f = (density − 0.85) / (1.00 − 0.85).',
            explanation: '(0.94 − 0.85) / 0.15 = 0.09 / 0.15 = 0.60. The usable scale is only 0.15 wide, not 1.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'At half open a leaf makes 11.7 g of sugar on 3 litres; fully open it makes 14 g on 6 litres. What does the second half of the opening buy?',
            options: ['2.3 g of sugar for 3 more litres -- about 0.8 g for each litre', '2.3 g of sugar for 3 more litres -- about 2.3 g for each litre', '3 g of sugar for 2.3 more litres', 'The sugar doubles, so it costs nothing extra'],
            correctIndex: 0,
            hint: 'Divide the extra sugar by the extra water.',
            explanation: '14 − 11.7 = 2.3 g for 3 litres, which is 0.8 g for each litre -- against 3.9 g for each litre over the first half.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'What do gear trains, polymer packing and stomata have in common at this level?',
            options: ['Pushing the structure harder gives poorer returns, or multiplies the losses', 'All three are about living things', 'Each has an exchange rate that never changes', 'None of the three can be measured'],
            correctIndex: 0,
            hint: 'Look at what happens as each is pushed further.',
            explanation: 'Extra stages multiply losses, extra branches cost density, and extra opening buys ever dearer sugar.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A designer needs a gear ratio of 1,000, with every stage 95% efficient. Which is better: ten stages of 2, or three stages of 10?',
            options: ['Three stages of 10, at about 86% against 60%', 'Ten stages of 2, because each small stage loses less', 'Both give the same efficiency, since the ratio is the same', 'Ten stages of 2, at about 90%'],
            correctIndex: 0,
            hint: 'Efficiency depends on the number of stages, not the ratio they make.',
            explanation: '0.95³ = 0.86 against 0.95¹⁰ = 0.60. Fewer, larger stages mean fewer sets of teeth to rub.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A crate is too floppy. The monomer and the chain length may not be changed. What will stiffen it?',
            options: ['Making the chains with fewer branches, or cooling the moulding more slowly', 'Using a longer chain after all', 'Swapping carbon for another element', 'Nothing -- with those two fixed, the material is fixed'],
            correctIndex: 0,
            hint: 'What else decides how the chains end up lying?',
            explanation: 'Both raise the crystalline fraction and the density. Stretching the material lines the chains up too.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A plant can draw only 3 litres per square metre that day. Should it open fully until the water runs out, or hold half open all day?',
            options: ['Half open: 11.7 g of sugar, against about 7 g for the fully open half-day', 'Fully open: making sugar at the fastest rate always wins', 'Both end the day with 14 g', 'Fully open: it gets the full 14 g in half the time'],
            correctIndex: 0,
            hint: 'Work out what the fully open leaf makes before its water runs out.',
            explanation: 'Fully open uses 6 litres a day, so 3 litres lasts half a day and makes about 7 g. Half open runs all day for 11.7 g.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which of these is a simplification that Big Idea 13\'s Level 3 lessons still leave standing?',
            options: ['A gearbox efficiency is quoted for one load and one speed', 'Gear ratios do not really multiply along a train', 'A plastic\'s density cannot be measured', 'Stomata are in fact always fully open'],
            correctIndex: 0,
            hint: 'Each lesson names what it still leaves out.',
            explanation: 'Efficiency changes with load; crystals are imperfect; and the sugar curve moves with light and temperature.'
        }
    ]
};
