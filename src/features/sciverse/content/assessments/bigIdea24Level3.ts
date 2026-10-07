import { AssessmentData } from '../../types';

/**
 * Big Idea 24 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P24 (a cut is any way of splitting the network; delivery is no more than
 * every cut, and equals the smallest, because being stuck is itself a cut),
 * L3C24 (letting the products go back removes the speeds from the answer entirely:
 * the ratio becomes e to the (gap / R T), and cold gives the faster product by
 * stopping the question rather than by favouring it), L3B24 (friction goes as
 * Q^2/r^4 and upkeep as r^2, so the total has a minimum where friction is exactly
 * half the upkeep; that puts r^3 proportional to Q, hence r0^3 = r1^3 + r2^3, and
 * area grows 26% at every branch so the far end is slow on purpose).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea24Level3Assessment: AssessmentData = {
    bigIdea: 24,
    level: 3,
    title: 'How Do Networks Deliver What Matters?',
    subtitle: 'Level 3 -- The Boundary, the Way Back, and the Cube',
    icon: '✂️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A cut splits a network into the reservoir\'s side and the houses\' side. Why can the delivery never be more than a cut\'s capacity?',
            options: [
                'Because the pipes in a cut are always the narrowest ones',
                'Because every litre starts on one side and finishes on the other, so it must cross that cut',
                'Because a cut always contains the trunk pipe',
                'Because pipes crossing backwards subtract from the total'
            ],
            correctIndex: 1,
            hint: 'Where does a litre of water start, and where does it end up?',
            explanation: 'The water begins on the reservoir\'s side and arrives on the houses\' side, so it has to cross the boundary between them at least once — whichever way you sorted the junctions. That makes every cut a true ceiling on the delivery, and it is why the easy half of the argument needs no work at all.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'L2C24 set the split between two products by the ratio of the two route speeds. What changes once the products are able to turn back into the starting materials?',
            options: [
                'The speeds matter even more, because the reverse speeds are added in',
                'The speeds drop out of the answer entirely — the split is then set by the energy gap between the products',
                'The faster product always wins by a larger margin',
                'Nothing changes, because the forward routes are still faster than the reverse ones'
            ],
            correctIndex: 1,
            hint: 'Where does a system end up if it is free to keep rearranging for as long as it likes?',
            explanation: 'A system that can keep leaving and re-entering both products does not stay where it arrived first. It piles up in whichever arrangement is hardest to leave, so the answer becomes e to the (gap / R T) and contains no speeds at all. Speed decides where a reaction arrives; the gap decides where it stays.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A wider vessel has far less friction, since resistance falls as 1/r to the fourth power. So why is a wider vessel not always better?',
            options: [
                'Wider vessels are more likely to burst',
                'The friction cost falls towards a floor while the upkeep cost rises for ever, so the total has a lowest point',
                'Wider vessels carry water more slowly',
                'A plant cannot make vessels above a certain width'
            ],
            correctIndex: 1,
            hint: 'What happens to each of the two costs as the radius grows without limit?',
            explanation: 'Friction falls towards nothing, so there is less and less left to win by widening. Upkeep goes as the cross-section, r squared, so it keeps growing without limit — a vessel twice as wide costs four times as much to own, every day, for ever. A quantity falling to a floor plus one rising for ever has a minimum in between.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'L2P24 had one junction and exactly two lines to check. How many cuts does a network with four junctions have?',
            options: [
                'Four, one per junction',
                'Sixteen — each junction independently falls on either side, so it is 2 to the power of 4',
                'Eight, two per junction',
                'It depends on how many pipes there are'
            ],
            correctIndex: 1,
            hint: 'A cut is a choice of side for each junction, made independently.',
            explanation: 'Each junction is put on the reservoir\'s side or the houses\' side, independently of the others, so n junctions give 2 to the power of n cuts. That is where L2P24\'s two lines came from and it was never explained there: one junction, two ways to sort it. It also explains why the number of lines is not the number of pipes.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A reservoir feeds an upper junction (40 L/min) and a lower junction (15). A link joins upper to lower (10). The upper runs to the houses (20) and the lower runs to the houses (40). What does the network deliver?',
            options: [
                '55 L/min, the two pipes out of the reservoir',
                '45 L/min — the cut made of the reservoir-to-lower pipe, the link, and the upper-to-houses pipe',
                '80 L/min, the two dialled pipes added',
                '125 L/min, every pipe added together'
            ],
            correctIndex: 1,
            hint: 'There are four cuts. Work out all four and take the smallest.',
            explanation: 'The four cuts are 40 + 15 = 55, 20 + 40 = 60, 15 + 10 + 20 = 45, and 40 + 40 = 80. The smallest is 45, so that is the delivery — and notice that the winning cut contains neither of the two large pipes. Every other cut is a true ceiling; only the lowest ceiling is the height of the room.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'The steadier of two products sits 4.6 kJ/mol lower. At 45 °C, what share of the mixture is the steadier product once equilibrium is reached? Take R as 8.314 J per mol per K.',
            options: [
                'About 50%, because the gap is small',
                'About 85% — the exponent is 1.74, so the ratio is 5.7 to 1',
                'About 99%, because the exponential is very steep',
                'It cannot be worked out without knowing the two route speeds'
            ],
            correctIndex: 1,
            hint: 'Convert to kelvin, put the gap in joules per mole, and work out the exponent first.',
            explanation: '45 + 273 = 318 K. The exponent is 4600 / (8.314 x 318) = 1.74, and e to the 1.74 is 5.7, so the ratio is 5.7 to 1 and the share is 5.7/6.7 = 85%. The units cancel: joules per mole divided by joules per mole per kelvin leaves kelvin, which T then cancels. A gap smaller than a tenth of one carbon-carbon bond decides the majority product almost six to one.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Every vessel built at its best radius has r cubed proportional to the flow it carries. Water does not pile up at a junction. What follows for a parent vessel splitting into two daughters?',
            options: [
                'r0 = r1 + r2, the radii add',
                'r0 cubed = r1 cubed + r2 cubed — the cubes add',
                'r0 squared = r1 squared + r2 squared, the areas add',
                'r0 = r1 = r2, all three must be equal'
            ],
            correctIndex: 1,
            hint: 'Substitute. Flow in equals flow out, and each flow is proportional to its own vessel\'s cube.',
            explanation: 'Q0 = Q1 + Q2, and Q is proportional to r cubed in each vessel, so r0 cubed = r1 cubed + r2 cubed. This is Murray\'s law, and it came from a cost trade-off plus a conservation — no new biology. The radii cannot add: that would have each daughter carrying an eighth of the flow by the cube rule, so seven eighths of the water would vanish at the junction.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Butadiene and HBr give 71% of the faster product at -80 °C. Yet at equilibrium a 4.6 kJ/mol gap favours the steadier product even harder when cold — 94.6% at -80 °C against 85.1% at 45 °C. Why is there no contradiction?',
            options: [
                'One of the two measurements must be wrong',
                'At -80 °C the mixture never reaches equilibrium, so the equilibrium figure never applies to it',
                'The steadier product becomes the less steady one when cold',
                'The energy gap changes sign at low temperature'
            ],
            correctIndex: 1,
            hint: 'The two numbers answer different questions. Which one describes where the mixture actually is?',
            explanation: '94.6% is where the mixture would settle if it could get there; 71% the other way is where it actually is, because at -80 °C the reverse reaction has effectively stopped. Cold does two things that pull opposite ways — it makes equilibrium more lopsided towards the steadier product, and it stops the mixture reaching equilibrium at all. The second wins completely.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'You push water through until no route has room left. Mark the reservoir, then spread marks forwards along any pipe with room and backwards along any pipe carrying something. The houses end up unmarked. What is true of the pipes crossing that boundary?',
            options: [
                'Some are full and some are not — there is no way to tell',
                'Every forward pipe is full and every backward one is empty, so the delivery equals that cut exactly',
                'They are all empty, because nothing more can get through',
                'They are all carrying exactly half their capacity'
            ],
            correctIndex: 1,
            hint: 'Apply the marking rule to a crossing pipe and ask what would have happened if it had room.',
            explanation: 'A forward pipe with room would have had its far end marked by the second rule, and it is unmarked — so it is full. A backward pipe carrying something would have had its near end marked by the third rule, and it is not — so it is empty. Full forwards and empty backwards means the delivery equals that cut\'s capacity. Since the delivery is no more than every cut, that cut must be the smallest: being stuck is itself a cut.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A chemist needs the faster product and gets 71% of it running at -80 °C. A colleague suggests warming it slightly, since a warmer reaction goes faster. What is wrong with that advice?',
            options: [
                'Nothing — it will be faster, and the race sets the share either way',
                'The cold was the method, not an obstacle: warming lets the products go back, so the mixture drains towards the steadier one',
                'Warming makes equilibrium favour the steadier product more, so it is worse thermodynamically',
                'Warming will reverse which of the two routes is faster'
            ],
            correctIndex: 1,
            hint: 'What is the only thing holding the mixture at the race\'s answer?',
            explanation: 'Being too cold for the reverse reaction is the only thing keeping the mixture where the race left it. Warm it and the share of the wanted product slides from 71% towards 15%: they would get their product sooner and have less of it. The third answer has the thermodynamics backwards — warming makes equilibrium less lopsided, from 94.6% to 85.1% to 76.3%. Warming hurts because the mixture is finally able to reach equilibrium, not because equilibrium got worse.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'By Murray\'s law a vessel splitting into two equal daughters gives each a radius 0.794 of the parent, so the total cross-sectional area grows by 26% at every branch and the sap slows down at every branch. Why is that the right thing to build?',
            options: [
                'It is not — it is a flaw forced on the plant by the cost of wide vessels',
                'The far end is where material has to cross the vessel wall, and crossing takes time, so the slowness is the purpose',
                'The speed actually rises, because each daughter is narrower than the parent',
                'Slower flow reduces the friction cost to zero'
            ],
            correctIndex: 1,
            hint: 'Ask what the far end of the network exists to do.',
            explanation: 'Two daughters at 0.794 of the parent give 2 x 0.794 squared = 1.26 times the area, so the water is slower even though each tube is narrower. That is deliberate: water racing past a vessel wall cannot cross it, and water creeping has every chance. Blood in a capillary moves at well under a millimetre a second for exactly this reason. L2B24 treated slowness as the problem to fix; here the slow far end is the design.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Each Level 3 lesson removed something Level 2 had assumed. Which set of three is it?',
            options: [
                'That pressure drives flow, that catalysts work, and that trees need water',
                'That the smallest line is reachable, that the split is settled by speed, and that the capacities were fixed properties',
                'That networks have exactly one bottleneck, that reactions go to completion, and that all vessels are the same width',
                'That pipes have capacities, that flames are hot, and that trees wilt'
            ],
            correctIndex: 1,
            hint: 'Each Level 2 lesson stated a condition. Level 3 took each one away in turn.',
            explanation: 'L2P24 asserted that the smallest line is reachable — an upper bound used as a promise — and L3P24 proved it, because being stuck is itself a cut. L2C24 said the split is set by speed and stated its condition in passing; L3C24 removed the condition and the speeds vanished from the answer. L2B24 handed over three capacities; L3B24 showed the xylem\'s was a settlement between a cost that falls and a cost that rises. In every case the Level 2 lesson had named its own weak point, which is what made it removable.'
        }
    ]
};
