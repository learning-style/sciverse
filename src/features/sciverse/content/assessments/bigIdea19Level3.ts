import { AssessmentData } from '../../types';

/**
 * Big Idea 19 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P19 (soaking rate = own speed x (1 + pull / water soaked in)), L3C19
 * (soil surfaces are negatively charged, so nitrate cannot be held, and the
 * concentration it leaves at), L3B19 (rotting = water factor x air factor, and
 * why the product peaks).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea19Level3Assessment: AssessmentData = {
    bigIdea: 19,
    level: 3,
    title: 'How Does Soil Support Life?',
    subtitle: 'Level 3 -- The Pull, the Minus Sign, and the Peak',
    icon: '🪨',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why does a downpour on dry ground soak in completely at first and then start to puddle?',
            options: [
                'The rain gets heavier',
                'The soil\'s soaking rate falls as more water goes in',
                'The soil runs out of pores',
                'The surface freezes over'
            ],
            correctIndex: 1,
            hint: 'Nothing about the rain changed.',
            explanation: 'The soaking rate starts far above the rainfall rate and falls as water soaks in, because the pull of dry soil has to reach across everything already wet. When the rate drops below the rainfall rate, puddles appear.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Clay and humus surfaces in soil carry:',
            options: ['No charge at all', 'Negative charge', 'Positive charge', 'A charge that changes with the weather'],
            correctIndex: 1,
            hint: 'Which nutrients does soil grip, and what charge do they carry?',
            explanation: 'They carry negative charge, over an enormous area — hundreds of square metres in a single gram of clay. That is why positive ions like potassium are held and negative nitrate is repelled.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Rotting is slow in a desert and slow in a bog. Why?',
            options: [
                'Both are cold',
                'Too little water in one, too little air in the other',
                'Both lack nutrients',
                'Decomposers avoid extreme places'
            ],
            correctIndex: 1,
            hint: 'Decomposers need two things, and each place is short of one.',
            explanation: 'Decomposers need water and air. A desert is short of water; a bog is short of air, because water has filled the pores. So there is a best wetness in between, and both extremes are slow for opposite reasons.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In soaking rate = own speed x (1 + pull / water soaked in), what does the 1 represent?',
            options: ['A correction factor', 'Gravity', 'The soil\'s porosity', 'A unit conversion'],
            correctIndex: 1,
            hint: 'What is left driving water down once the pull has faded?',
            explanation: 'The 1 is gravity, and it is the floor. Because gravity never fades, the rate settles at the soil\'s own speed rather than falling to nothing — which is why soil never completely refuses water, however long it rains.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A soil has its own speed of 5 mm/h and a dry pull of 150 mm. Once 50 mm of water has soaked in, the soaking rate is:',
            options: ['15 mm/h', '20 mm/h', '5 mm/h', '1.7 mm/h'],
            correctIndex: 1,
            hint: 'Work out the bracket first.',
            explanation: '1 + 150/50 = 4, and 5 x 4 = 20 mm/h. Dropping the 1 gives 15 and loses gravity; flipping the fraction gives 1.7 and would make the rate rise as the soil wets, which is backwards.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A field has 120 kg/ha of surplus nitrogen and 300 mm of drainage a year. What concentration leaves? (1 mm over 1 ha = 10 m³)',
            options: ['4 mg/L', '40 mg/L', '400 mg/L', '0.04 mg/L'],
            correctIndex: 1,
            hint: '300 mm gives 3,000 m³/ha. Then remember 1 kg/m³ = 1,000 mg/L.',
            explanation: '120 kg / 3,000 m³ = 0.04 kg/m³, and 1 kg/m³ is 1,000 mg/L, so 40 mg/L as nitrogen — about three and a half times the drinking-water limit of 11.3 mg/L.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A soil has 80% of its pores full of water. Taking the water factor as full/0.6 capped at 1 and the air factor as empty/0.4 capped at 1, how fast does it rot?',
            options: ['1.33 of the peak', '1.50 of the peak', '0.50 of the peak', '0.80 of the peak'],
            correctIndex: 2,
            hint: 'Multiply the two factors, and remember neither can exceed 1.',
            explanation: 'Water factor 1 (there is plenty), air factor 0.20/0.40 = 0.50, so 1 x 0.50 = 0.50 — half the peak, purely from lack of air. 1.33 breaks the cap; 1.50 comes from adding rather than multiplying.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why is the rotting formula a product of two factors rather than a sum?',
            options: [
                'Because products are easier to calculate',
                'So that either factor can veto: no air means no rotting whatever the water is doing',
                'Because the two factors are measured in the same units',
                'To keep the answer below 1'
            ],
            correctIndex: 1,
            hint: 'What would a sum say about soil with plenty of water and no air?',
            explanation: 'Adding them would let water make up for missing air: airless soil would score 1.0 from the water alone and rot as fast as soil at the peak, so bogs could not exist. A product means each factor can independently stop the process.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two fields have the same soil (own speed 8 mm/h, pull 100 mm) and the same 3-hour storm at 20 mm/h. One is bone dry, the other has already taken in 100 mm. What happens?',
            options: [
                'Both shed about the same, since the soil and rain are identical',
                'The dry field sheds nothing; the pre-soaked one is at 16 mm/h from the start and sheds about 12 mm',
                'The dry field sheds more, because dry soil repels water',
                'Neither sheds anything, because 20 mm/h is gentle rain'
            ],
            correctIndex: 1,
            hint: 'Work out each field\'s starting rate, and how much has to go in before the rain overtakes it.',
            explanation: 'The dry field starts near 88 mm/h and does not fall to 20 mm/h until 67 mm has soaked in, which takes 3.3 hours — longer than the storm. The pre-soaked field has a bracket of 1 + 100/100 = 2, so 16 mm/h from the first minute and 4 mm/h shed throughout. Dryness buys time, and storms are short enough for that to decide the outcome.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A farmer improves the catch so the surplus falls from 120 to 51 kg/ha, with 300 mm of drainage. Does the water now meet the 11.3 mg/L limit?',
            options: [
                'Yes, comfortably',
                'Yes, just about',
                'No — it is 17 mg/L, still about half again over',
                'It cannot be worked out without knowing the crop'
            ],
            correctIndex: 2,
            hint: '51 kg in 3,000 m³.',
            explanation: '51 / 3,000 = 0.017 kg/m³ = 17 mg/L, against a limit of 11.3. This was the good-practice case, and it still fails — which is why the mechanism points at timing rather than amount: cover crops, spring rather than autumn spreading, several small doses.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A drained peat field sits at 60% of pores full — the peak — and is losing carbon. Rewetting it to 95% will:',
            options: [
                'Speed rotting up, because decomposers need water',
                'Cut rotting to about an eighth, because past the peak more water only removes air',
                'Make no difference, since the leaf fall is unchanged',
                'Stop rotting completely'
            ],
            correctIndex: 1,
            hint: 'At 60% the water factor is already 1. What can more water do?',
            explanation: 'At the peak the water factor is already capped at 1, so extra water cannot help — it can only take air away. At 95% the air factor falls to 0.13, so rotting drops to about an eighth and the carbon store stops draining. Once a factor is capped, more of that input is harmful if it competes for something else.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Machinery compacts a field, lowering its total pore space. Trace the consequence through all three Big Idea 19 lessons.',
            options: [
                'Only drainage is affected; the chemistry and biology are unchanged',
                'Fewer pores means more runoff, the remaining pores sit airless so rotting slows, the nitrogen decomposers would have released must be bought, and most of that purchased nitrogen leaves in the drainage',
                'Compaction raises fertility by holding water near the roots',
                'The store of dead material falls, releasing nutrients permanently'
            ],
            correctIndex: 1,
            hint: 'All three lessons are about the same spaces.',
            explanation: 'Compaction lowers the soaking rate so more rain runs off; the same rain then fills a larger share of the pores that remain, so the air factor collapses and rotting slows; the nitrogen that would have been released free has to come from a bag; and because nitrate cannot be held, most of that bag leaves in the drainage at several times the drinking-water limit. One cause, three lessons.'
        }
    ]
};
