import { AssessmentData } from '../../types';

/**
 * Big Idea 18 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P18 (the surface tilt across a bend and the corkscrew it drives),
 * L3C18 (C = a Q^b, chemostatic behaviour, and what the sign of b reveals),
 * L3B18 (spare oxygen = oxygen in the water / how many times more the fish needs,
 * moves further).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea18Level3Assessment: AssessmentData = {
    bigIdea: 18,
    level: 3,
    title: 'How Do Rivers Shape the Land?',
    subtitle: 'Level 3 -- Tilt, Chemostasis, and Both Ends of the Squeeze',
    icon: '🌊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why does a river\'s surface tilt across a bend?',
            options: [
                'Because the outer bank is being eroded and has become deeper',
                'Because water going round a curve must accelerate inward, and a tilt is the only way an open channel can supply that',
                'Because the wind pushes the surface to one side',
                'Because faster water is always higher than slower water'
            ],
            correctIndex: 1,
            hint: 'What does moving along a circle require, and what can a fluid push with?',
            explanation: 'Circular motion at speed v on radius R demands an inward acceleration v²/R. A fluid can only push with a pressure difference, and in an open channel that means standing deeper on one side: higher against the outer bank, lower against the inner one.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'In C = a Q^b, what does b = 0 mean?',
            options: [
                'There is nothing dissolved in the water',
                'Concentration does not change at all as the flow changes — chemostatic behaviour',
                'The load stays the same however the flow changes',
                'The river is at pure dilution'
            ],
            correctIndex: 1,
            hint: 'Q to the power zero is 1, whatever Q is.',
            explanation: 'b = 0 gives C = a for every discharge, so concentration stands still — which is what chemostatic means. Pure dilution is b = -1, and that is the case where the load stays the same.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A trout is warmed from 10 °C to 20 °C. Its need multiplies by 2 for every 10 °C. So its oxygen need:',
            options: ['Stays the same, since it is cold-blooded', 'Doubles', 'Halves', 'Rises by 10%'],
            correctIndex: 1,
            hint: 'The factor given is for a ten-degree rise, and this is exactly ten degrees.',
            explanation: 'how many times more it needs = 2^(10/10) = 2. Biologists write that per-ten-degrees factor as Q10, which means nothing more than the factor for ten degrees. Being cold-blooded is precisely the reason: the fish has no thermostat, so its whole chemistry runs at river temperature and speeds up with it.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The tilt across a bend is Δh = v²w/(gR). Doubling the flow speed changes it by a factor of:',
            options: ['2', '4', '1/2', '8'],
            correctIndex: 1,
            hint: 'Which power does v appear to?',
            explanation: 'Δh goes as v², so doubling the speed quadruples the tilt. That sensitivity is why a flood reshapes a bend that a decade of ordinary flow left alone.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A river 30 m wide runs at 1.2 m/s round a bend of radius 100 m. Its surface tilt is about:',
            options: ['4.4 cm', '44 cm', '4.4 m', '0.4 cm'],
            correctIndex: 0,
            hint: '(1.44 x 30) / (9.81 x 100).',
            explanation: '43.2/981 = 0.044 m, so about 4.4 cm. Small enough that you would never see it, and it is the whole engine of meandering.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'With b = -0.1, a tenfold flood changes the dissolved load by a factor of about:',
            options: ['1 — the load is unchanged', '7.9', '10', '0.79'],
            correctIndex: 1,
            hint: 'Load goes as Q^(1+b).',
            explanation: 'load = a Q^(1+b), so 10^0.9 ≈ 7.9. The concentration factor is 10^-0.1 = 0.79, and the two multiply back to the flow: 10 x 0.79 = 7.9.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A pool warms from 15 °C to 25 °C and stays equally full, so its oxygen falls by a factor of 0.82. The trout needs twice as much for every 10 °C. The spare oxygen changes by:',
            options: ['0.82', '0.41', '0.32', '1.64'],
            correctIndex: 1,
            hint: 'Spare oxygen is what is there divided by how many times more is needed, and these are factors.',
            explanation: 'Factors divide: 0.82 / 2 = 0.41. Subtracting them would give 0.32, which treats scalings as amounts; using 0.82 alone is the supply-only mistake that makes a lethal change look survivable.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'What actually drives the corkscrew circulation in a bend?',
            options: [
                'The size of the surface tilt',
                'The tightness of the bend',
                'The difference in water speed between the surface and the bed',
                'The roughness of the outer bank'
            ],
            correctIndex: 2,
            hint: 'One tilt has to serve water moving at different speeds.',
            explanation: 'A single tilt is set by the average speed, but friction makes surface water faster than bed water. So the tilt is too little for the fast surface, which drifts outward, and too much for the slow bed, which is pushed inward. Remove the velocity gradient and the circulation stops.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An engineer lines a bend with smooth concrete, so the water moves at nearly the same speed from surface to bed. What happens to the point bar on the inner bank?',
            options: [
                'It grows faster, because the water is now moving more quickly',
                'It stops being built, because the corkscrew that delivered sediment to it has gone',
                'It is unaffected, since the tilt is still there',
                'It moves to the outer bank instead'
            ],
            correctIndex: 1,
            hint: 'What was the conveyor, and what did it depend on?',
            explanation: 'With one speed everywhere, a single tilt satisfies every layer exactly and nothing is left over to push water sideways. The bedload that used to be swept inward carries on downstream instead, to be dropped where the lining ends — so lining one bend moves the problem rather than solving it.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'In the same flood, calcium shows b = -0.1 while nitrate shows b = +0.4. What does that difference tell you?',
            options: [
                'The nitrate measurement must be contaminated with suspended mud',
                'Calcium is dissolved out of rock and the water already holds nearly as much as it can, while nitrate sits in a store the low-flow river never reaches',
                'C = a Q^b does not apply to nitrate',
                'The river drains two different rock types'
            ],
            correctIndex: 1,
            hint: 'Ask where each substance is kept before the flood arrives.',
            explanation: 'Calcium has to be dissolved out of a crystal, and the water is already near saturation, so extra flow changes little. Nitrate is lying on fields and in soil above the summer waterline: it needs only to be reached, so high water flushes it in. The sign of b classifies the source — which is why nitrate pollution peaks exactly when the river is fullest.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'From 10 °C to 25 °C the oxygen in the water falls to 0.735 of what it was, while the trout needs 2.83 times as much. Roughly what share of the lost spare is due to the water holding less oxygen?',
            options: ['About three quarters', 'About half', 'About a quarter', 'Nearly all of it'],
            correctIndex: 2,
            hint: 'Compare how far each factor moves, not just that both move.',
            explanation: 'The spare falls to 0.735/2.83 = 0.26. Of that squeeze about 23% comes from the water holding less and about 77% from the fish needing more. So "warm water holds less oxygen" — the usual explanation — is the smaller quarter of the story.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A stream warmed to 25 °C is 95% full of the oxygen it could hold. Why can aeration not rescue its trout, however many weirs are built?',
            options: [
                'Because aeration does not actually add oxygen to water',
                'Because aeration can only fill the water closer to full, and five points of headroom is nothing against a need that has nearly tripled',
                'Because weirs make the water warmer',
                'Because trout cannot swim past weirs'
            ],
            correctIndex: 1,
            hint: 'What is the most aeration could possibly achieve from 95% full?',
            explanation: 'Aeration works only on how full the water is, and the amount it can hold when full has itself shrunk. From 95% to completely full buys about 5% more spare, against a need that has risen 2.83-fold. Cooling moves both terms — it gives the water more room and lowers what the fish needs — which is why dealing with the temperature is not a close call.'
        }
    ]
};
