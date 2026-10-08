import { AssessmentData } from '../../types';

/**
 * Big Idea 25 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P25 (a step multiplies a difference by the rule's slope, which at the
 * logistic map's settling point is exactly 2 - r, so the threshold is r = 3 and at
 * r = 4 the measured multiplier is 2.0000 -- L2P25's doubling, derived), L3C25
 * (letting a cycle hand back b carriers gives total = 1/(1-b) with a threshold at
 * b = 1, which generalises L2C25 since b = 1-p returns 1/p), L3B25 (redundancy means
 * only genes with no spare switch fail, so g = breadth x share, total = 1/(1-g), and
 * the threshold share is 1/breadth -- 5% at breadth 20).
 * The unification: three different multipliers, one dividing line at exactly 1, and
 * 1/(1 - multiplier) blowing up as it is approached.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea25Level3Assessment: AssessmentData = {
    bigIdea: 25,
    level: 3,
    title: 'How Can Tiny Changes Cause Big Effects?',
    subtitle: 'Level 3 -- The Slope, the Branch, and the Spare',
    icon: '📈',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'L2P25 said a forecast error doubles each step but never said why it would multiply at all. What does one step actually multiply a difference by?',
            options: [
                'Always 2 — that is what doubling means',
                'The slope of the rule the difference is pushed through',
                'The size of the error itself',
                'Nothing — differences grow by adding'
            ],
            correctIndex: 1,
            hint: 'Two nearby inputs go through the same rule. What decides how far apart the outputs are?',
            explanation: 'A steep rule sends two nearby inputs to two distant outputs; a shallow one squashes them together. So one step multiplies the gap by the rule\'s slope, which is why the growth is multiplication rather than addition — each step multiplies by the slope again. L2P25\'s mysterious 2 was a slope all along.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'L2C25 had an assumption it never wrote down, which is why its chain could only ever fade. What was it?',
            options: [
                'That the carrier was always chlorine',
                'That every cycle hands back exactly one carrier, so the carrier count could never grow',
                'That the reaction happened in the stratosphere',
                'That termination was rare'
            ],
            correctIndex: 1,
            hint: 'Count the carriers at the start and end of one cycle in that lesson.',
            explanation: 'A chlorine atom wrecks an ozone molecule and is chlorine again — one carrier in, one out, from the first cycle to the last. A chain whose carrier count can only stay the same or drop has nowhere to go but down, so the only question was how long it lasted. Branching, where one reactive piece becomes two, breaks that completely.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'L2B25 said a mutation in a switch gene three layers up disrupts about 8000 genes. Besides giving impossible numbers at depth 4, why must that be wrong?',
            options: [
                'Genes do not control other genes',
                'Everyone carries dozens of new mutations, so if that were true nobody would ever be born healthy',
                'Switch genes are too rare to matter',
                '8000 is more genes than any organism has'
            ],
            correctIndex: 1,
            hint: 'How many new mutations does a person carry, and how are they doing?',
            explanation: 'You are carrying a few dozen mutations your parents did not have, and you are fine. If a switch mutation really disrupted 8000 genes, every such mutation would be a catastrophe and no one would be born healthy. We exist, so the formula is not merely imprecise at depth 4 — it is wrong at depth 1. What was missing is redundancy.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'All three Level 3 lessons found a multiplier with a dividing line. What value is the line at in every case?',
            options: [
                'It is different for each subject',
                'Exactly 1 — the value that separates losing from gaining',
                'Zero',
                'It depends on how many steps you allow'
            ],
            correctIndex: 1,
            hint: 'What does multiplying repeatedly by a number just below 1 do, against just above it?',
            explanation: 'A slope, a count of carriers handed back, a count of genes broken per gene — three completely different quantities, and in each case below 1 means the thing fades however long you wait, and above 1 means nothing can stop it. 1 is simply the number at which each step replaces exactly what it consumed, so it is the only candidate for a dividing line.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'For the map next = r x now x (1 - now), the slope at the settling point is 2 - r. With r = 2.8, what happens to a small difference between two ponds?',
            options: [
                'It grows, since the slope is 2.8',
                'It fades — the slope is -0.8, and 0.8 is less than 1',
                'It stays the same size',
                'It is exactly at the threshold'
            ],
            correctIndex: 1,
            hint: 'Work out 2 - r, then compare its size with 1.',
            explanation: '2 - 2.8 = -0.8, whose size is 0.8, below 1 — so each generation multiplies the gap by 0.8 and after ten generations it is about 0.11 of what it was. The minus sign matters too: it means a pond that is too full overshoots to too empty, and when that overcorrection exceeds the error that caused it, which is exactly when the size passes 1, you get alternating high and low years.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A chain hands back b = 0.95 carriers per cycle. How many cycles does the whole chain manage, starting from one carrier?',
            options: [
                '95',
                '20 — one over the distance to the threshold, 1/(1 - 0.95)',
                '5',
                'There is no finite total'
            ],
            correctIndex: 1,
            hint: 'What is the gap between b and 1, and what do you do with it?',
            explanation: '1 - 0.95 = 0.05, and 1/0.05 = 20 cycles. The only thing the total depends on is how close b is to 1: at 0.99 it is 100 cycles, at 0.999 it is 1000. And 5 is the gap as a percentage without the reciprocal — worth noticing that 5 and 20 are reciprocals, which is the relationship this whole lesson turns on.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A switch gene controls 20 genes. What share of them may depend on that switch alone, if a mutation in it is to be survivable?',
            options: [
                'Under half — then most genes still work',
                'Under 5%, because the gain is breadth x share and it must stay below 1',
                'Under 20%',
                'Any share, since redundancy always protects the network'
            ],
            correctIndex: 1,
            hint: 'The cascade dies out only if each broken gene breaks less than one gene on average.',
            explanation: 'g = breadth x share must be below 1, so the share must be below 1/20 = 5%. At least nineteen in twenty of the genes below need a spare switch. Half would give g = 10 — the cascade multiplying tenfold at every layer, which is barely better than L2B25 and heads for the same impossible place. This also means the wider a switch\'s reach, the less redundancy it can afford.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'At exactly r = 3 in the logistic map, what is special?',
            options: [
                'The population dies out',
                'The slope at the settling point is exactly -1, so this is the threshold where settling gives way to a two-year cycle',
                'The map becomes fully chaotic',
                'Nothing — 3 is an ordinary value'
            ],
            correctIndex: 1,
            hint: 'Put r = 3 into 2 - r.',
            explanation: '2 - 3 = -1, whose size is exactly 1 — neither growing nor shrinking. Below r = 3 the settling point is stable and a population settles to one level; above it the overcorrection exceeds the error and the population alternates between a high year and a low year. Full chaos is much further on, at about r = 3.570, reached by the two-cycle becoming a four-cycle and then an eight.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A biologist forecasts an insect population reliably for twenty years with r = 2.6. Warmer weather raises r to 3.8 and the forecasts fail within a few years, with the same model and the same instruments. What changed?',
            options: [
                'The model must be wrong for warm weather',
                'The slope went from -0.6 to -1.8, so errors that used to die out now multiply by 1.8 each generation — about 357 times over ten',
                'The measurements must have got worse',
                'The insects must have changed species'
            ],
            correctIndex: 1,
            hint: 'Work out 2 - r for both values and compare each with 1.',
            explanation: 'At r = 2.6 the slope is -0.6, so errors shrink and long forecasts are genuinely reliable. At r = 3.8 it is -1.8, so the same error is multiplied by 1.8 ten times over, which is 357 times bigger. Nothing about the model or the instruments changed — predictability was never a property of either. It is a property of r, and r moved. So you cannot tell whether a system is forecastable from how good your model is; you have to work out the slope.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A hydrogen and oxygen mixture is quiet at low pressure, explodes when the pressure is raised a little, and goes quiet again when it is raised a great deal more. What does the third stage tell you?',
            options: [
                'The mixture ran out of hydrogen',
                'Some other way of destroying carriers takes over at high pressure, pushing b back below 1',
                'The theory is wrong, since b cannot fall once it is above 1',
                'The explosion simply happened too fast to see'
            ],
            correctIndex: 1,
            hint: 'b is an average over the conditions. If the conditions change, which way can b move?',
            explanation: 'At low pressure carriers reach the walls and are destroyed there, so b is below 1. A little higher, fewer reach the walls and branching wins, so b crosses 1. Much higher, carriers are crowded enough that three meet at once and a three-body collision mops them up in the gas itself — and that gets likelier with pressure faster than branching does, pushing b back under 1. So hydrogen has a lower and an upper explosion limit, and quiet-explosive-quiet is just b below, above, below 1. The fuel answer fails on timing: it goes quiet immediately, with all its fuel intact.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Suppose some lineage had evolved a gene network with g above 1 — intricate, finely wired, with little redundancy. What follows, and what does it imply about networks alive today?',
            options: [
                'It would have been fine as long as it avoided mutations',
                'Its mutations would each start an unstoppable cascade, so it could not persist — meaning every surviving network must have g below 1',
                'Nothing — whether a network is buffered is a matter of chance',
                'It would have evolved redundancy in response'
            ],
            correctIndex: 1,
            hint: 'Can a lineage decline its own mutations?',
            explanation: 'Mutations arrive every generation whether or not they are welcome. A network with g above 1 does not have a risk, it has a schedule: each switch mutation starts a cascade that never dies out, so the lineage ends. Buffering is therefore a requirement for existing rather than a lucky feature, and every network you can study has g below 1 — because the ones above the line are not here to be studied. Which turns the Big Idea around: in living things tiny changes usually cannot cause big effects, and that is not an accident.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Level 2 found that a tiny change becomes a big effect by being multiplied rather than added. What did Level 3 add to that?',
            options: [
                'That the multiplication is always by 2',
                'That a repeated multiplication has only one question — is the multiplier above or below 1 — and below it everything fades however many repeats you allow',
                'That tiny changes never really matter',
                'That the number of repeats is what matters most'
            ],
            correctIndex: 1,
            hint: 'What did the slope, the carrier count and the gain all have in common?',
            explanation: 'Level 2 was the first half: the effect is multiplied, so the number of repeats sets its size. Level 3 is the second: below 1 no number of repeats produces a big effect, and above 1 nothing stops one. In all three subjects the total is 1/(1 - multiplier), which accelerates into the line and stops existing at it — so chaos, explosion and developmental catastrophe are three different systems sitting on the wrong side of the same number. The last option is Level 2\'s answer, which Level 3 qualifies: the repeats only accumulate if the multiplier is above 1.'
        }
    ]
};
