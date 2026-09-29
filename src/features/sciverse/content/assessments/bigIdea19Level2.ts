import { AssessmentData } from '../../types';

/**
 * Big Idea 19 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P19 (runoff = rainfall rate - how fast the soil takes water in),
 * L2C19 (fertiliser = crop demand / share the plants catch, and the surplus that
 * follows), L2B19 (the litter store settles at leaf fall / share that rots).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea19Level2Assessment: AssessmentData = {
    bigIdea: 19,
    level: 2,
    title: 'How Does Soil Support Life?',
    subtitle: 'Level 2 -- Runoff, Surplus, and What Piles Up',
    icon: '🪨',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Rain falls at 18 mm/h on soil that can take water in at 7 mm/h. How much runs off?',
            options: ['25 mm/h', '11 mm/h', '7 mm/h', 'None of it'],
            correctIndex: 1,
            hint: 'The surplus is what the soil cannot swallow.',
            explanation: '18 - 7 = 11 mm/h runs off, while 7 mm/h soaks in. Both speeds are in millimetres per hour, so the answer is too.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A hectare is:',
            options: ['A hundred square metres', '100 m by 100 m', 'A thousand square metres', 'The same as a square kilometre'],
            correctIndex: 1,
            hint: 'About two football pitches.',
            explanation: 'A hectare is 100 m by 100 m, which is 10,000 m². Fertiliser decisions are measured in kilograms per hectare, kg/ha.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Leaves fall on a wood every year and decomposers rot them every year. The dead layer:',
            options: [
                'Grows forever, a little each year',
                'Settles at a depth where what rots each year matches what falls',
                'Disappears completely each winter',
                'Depends mostly on how old the wood is'
            ],
            correctIndex: 1,
            hint: 'The decomposers work on everything lying there, not just this year\'s leaves.',
            explanation: 'As the pile grows, a fixed share of it is a larger amount, so the losses catch up with the arrivals. The store then holds still — a balance called steady state.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Water runs off at 9 mm/h for 3 hours. How much water leaves the field?',
            options: ['3 mm', '9 mm', '27 mm', '12 mm'],
            correctIndex: 2,
            hint: 'A rate multiplied by a time gives a depth.',
            explanation: '9 mm/h x 3 h = 27 mm. Check the units: mm/h multiplied by h leaves mm, which is a depth.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A crop takes away 120 kg/ha of nitrogen and the plants catch 50% of what is spread. How much must be applied?',
            options: ['60 kg/ha', '120 kg/ha', '180 kg/ha', '240 kg/ha'],
            correctIndex: 3,
            hint: 'Work backwards from what the plant must receive.',
            explanation: '120 / 0.5 = 240 kg/ha. Dividing by a fraction makes the number bigger, which is right: if the plants catch only half, you must spread twice what they need. The surplus is 240 - 120 = 120 kg/ha.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A wood drops 4 t/ha/yr of leaves and 20% of the store rots each year. What does the store settle at?',
            options: ['0.8 t/ha', '4 t/ha', '20 t/ha', '80 t/ha'],
            correctIndex: 2,
            hint: 'Divide the fall by the share that rots.',
            explanation: '4 / 0.2 = 20 t/ha. Check it: 20% of 20 t/ha is 4 t/ha leaving, exactly matching the 4 t/ha arriving. Multiplying instead would give 0.8, which is less than a single year\'s fall and so cannot be a store built over decades.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Two storms drop 30 mm of rain on soil that takes 10 mm/h. One falls in 1 hour, the other over 6 hours. What happens?',
            options: [
                'Both lose the same, since the rain totals are equal',
                'The 1-hour storm loses 20 mm; the 6-hour storm loses nothing',
                'The 6-hour storm loses more, because it rains for longer',
                'Neither loses anything, since 30 mm is not much rain'
            ],
            correctIndex: 1,
            hint: 'Convert each storm to a rate before comparing.',
            explanation: '30 mm in 1 h is 30 mm/h, so 20 mm/h runs off for an hour: 20 mm lost. 30 mm over 6 h is 5 mm/h, below the soil\'s 10 mm/h, so nothing runs off. The field keeps 10 mm from one storm and all 30 mm from the other.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Improving the share the plants catch from 50% to 70%, with the crop still taking 120 kg/ha, changes the surplus from 120 kg/ha to:',
            options: ['96 kg/ha', '84 kg/ha', '51 kg/ha', '24 kg/ha'],
            correctIndex: 2,
            hint: 'Work out the new amount applied first.',
            explanation: '120 / 0.7 = 171 kg/ha applied, so the surplus is 171 - 120 = 51 kg/ha. The bag fell by 29% and the surplus by 58%, because a better catch means a smaller bag and a smaller share of it left behind.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two woods have identical leaf fall of 4 t/ha/yr. One rots 80% each year, the other 10%. Why does the second hold eight times as much dead material?',
            options: [
                'Because it produces more leaves over time',
                'Because the store depends on the losing side, and dividing by a smaller share gives a bigger store',
                'Because it is older, so it has had longer to accumulate',
                'Because cold leaves are heavier'
            ],
            correctIndex: 1,
            hint: '4 / 0.8 against 4 / 0.1.',
            explanation: '4 / 0.8 = 5 t/ha and 4 / 0.1 = 40 t/ha. Nothing about the arriving material differs — only how fast it leaves. Age does not come into it: the store settles at the same level whether the wood is a century or a millennium old.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A farmer applying 240 kg/ha with a 50% catch is told to cut to 180 kg/ha and changes nothing else. What happens?',
            options: [
                'The surplus falls by a quarter and the crop is unaffected',
                'The crop gets 90 kg instead of 120 and the surplus is still 90 kg/ha, so the loss is shared between the harvest and the river',
                'The crop is unaffected because there was spare nitrogen in the 240 kg',
                'The surplus falls to zero'
            ],
            correctIndex: 1,
            hint: 'The catch is what decides how the bag splits, and the catch did not change.',
            explanation: '180 x 0.5 = 90 kg to the crop, short of the 120 it needed, and 180 - 90 = 90 kg/ha surplus. Both numbers fell by a quarter together. There was never spare nitrogen in the 240: it was 120 for the crop and 120 already on its way out with the drainage.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A bog holding 40 t/ha is drained, which lets air in and raises the rotting share from 10% to 40%. The leaf fall is unchanged at 4 t/ha/yr. What happens?',
            options: [
                'The store stays at 40 t/ha but turns over faster',
                'The store falls to 10 t/ha, and 30 t/ha leaves as carbon dioxide',
                'The store rises, because decomposers are now more active',
                'Nothing, until the leaf fall changes'
            ],
            correctIndex: 1,
            hint: 'Put the new share through the formula.',
            explanation: '4 / 0.4 = 10 t/ha. At 40 t/ha a 40% share means 16 t leaving against 4 arriving, so the pile shrinks until 40% of it is once again 4 t. The 30 t/ha does not vanish: decomposers breathe the carbon out as carbon dioxide, which is why drained peatlands are a large source of it and rewetting them counts as climate work.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'What do all three Big Idea 19 lessons have in common?',
            options: [
                'They are all about rainfall',
                'They are all about the spaces between soil particles — water entering them, nutrients dissolved in that water, and decomposers living in them',
                'They all use the same formula',
                'They are all about how farmers make decisions'
            ],
            correctIndex: 1,
            hint: 'What did P19 say controls everything about how soil works?',
            explanation: 'Pores are the common thread. L2P19 measured water getting into them, L2C19 followed nutrients dissolved in that water, and L2B19 counted the decomposers living in them. That is also where Level 3 finds its tension, because decomposers need both water and air and both come from the same pore space.'
        }
    ]
};
