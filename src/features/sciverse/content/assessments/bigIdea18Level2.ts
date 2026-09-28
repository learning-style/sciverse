import { AssessmentData } from '../../types';

/**
 * Big Idea 18 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P18 (discharge = width x depth x speed), L2C18 (dissolved load =
 * concentration x discharge), L2B18 (dissolved oxygen = saturation x percent, set
 * against the 6 mg/L a trout needs).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea18Level2Assessment: AssessmentData = {
    bigIdea: 18,
    level: 2,
    title: 'How Do Rivers Shape the Land?',
    subtitle: 'Level 2 -- Discharge, Dissolved Load, and Oxygen',
    icon: '🌊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Discharge is:',
            options: [
                'How fast the water is moving',
                'The width, the depth and the speed multiplied together',
                'How deep the river is at its middle',
                'The weight of rock the river carries'
            ],
            correctIndex: 1,
            hint: 'Check the units: what has to multiply to give cubic metres per second?',
            explanation: 'Discharge = width x depth x speed, in cubic metres per second (m³/s). The width and depth give the opening the water crosses, and the speed says how fast it crosses it. m x m x m/s = m³/s.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'One cubic metre of water weighs about:',
            options: ['A kilogram', 'Ten kilograms', 'A tonne', 'Ten tonnes'],
            correctIndex: 2,
            hint: 'It is a cube a metre on each side, and this is why m³/s doubles as tonnes per second.',
            explanation: 'A cubic metre of water is a tonne. That is why a discharge of 9.6 m³/s can also be read as about 9.6 tonnes of water going past every second.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'As water gets warmer, the most oxygen it can hold:',
            options: [
                'Goes up, because warm things hold more',
                'Goes down',
                'Stays the same, since it depends on the air',
                'Goes up and then down again'
            ],
            correctIndex: 1,
            hint: 'Saturation is 11.3 mg/L at 10 °C. What is it at 25 °C?',
            explanation: 'Saturation falls as water warms: 14.6 mg/L at 0 °C, 11.3 at 10 °C, 8.3 at 25 °C, 7.6 at 30 °C. Warm water simply cannot hold as much dissolved oxygen.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A channel 10 m wide and 2 m deep carries water at 1 m/s. Its discharge is:',
            options: ['13 m³/s', '20 m³/s', '5 m³/s', '200 m³/s'],
            correctIndex: 1,
            hint: 'Cross-section first, then multiply by the speed.',
            explanation: '10 x 2 = 20 m² of cross-section, and 20 x 1 = 20 m³/s. Adding the three numbers would give 13, which cannot be right: you cannot add metres to metres per second.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why is 1 mg/L the same as 1 g/m³?',
            options: [
                'It is a rough approximation that is close enough',
                'A litre is a thousandth of a cubic metre and a milligram is a thousandth of a gram, so the two thousandths cancel',
                'Because water has a density of 1',
                'It is not the same — one is a thousand times the other'
            ],
            correctIndex: 1,
            hint: 'Count the thousandths on the top and on the bottom.',
            explanation: 'Both the mass and the volume shrink by exactly a thousand, so the ratio is unchanged. It is exact, not approximate, and it is what makes the dissolved-load sum easy: mg/L can be used directly with m³/s to give grams per second.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A flood deepens a river from 1.5 m to 3.0 m and speeds it up from 0.8 to 1.6 m/s, with the width unchanged. The discharge:',
            options: ['Doubles', 'Quadruples', 'Rises by half', 'Rises eightfold'],
            correctIndex: 1,
            hint: 'How many of the three numbers changed?',
            explanation: 'Two of the three doubled, and 2 x 2 = 4. From 8 x 1.5 x 0.8 = 9.6 m³/s to 8 x 3.0 x 1.6 = 38.4 m³/s. A rising river gets deeper and faster together, which is why a flood that looks twice as bad can be carrying four times the water.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A stretch of river is at 20 °C, where saturation is 9.1 mg/L, and sits at 85% of that. How much dissolved oxygen is in it?',
            options: ['9.1 mg/L', '7.7 mg/L', '1.4 mg/L', '10.7 mg/L'],
            correctIndex: 1,
            hint: '85% of the ceiling, not the ceiling itself, and not what is left over.',
            explanation: '9.1 x 0.85 = 7.7 mg/L, which clears the 6 mg/L a trout needs. Using 9.1 would be taking the ceiling for the answer; 1.4 would be taking 15% instead of 85%.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A river carries 150 mg/L of dissolved rock at a discharge of 9.6 m³/s. Its dissolved load is:',
            options: ['1.44 kg/s', '1,440 kg/s', '15.6 kg/s', '0.0144 kg/s'],
            correctIndex: 0,
            hint: '150 g/m³ x 9.6 m³/s gives grams per second. Then convert.',
            explanation: '150 x 9.6 = 1,440 grams per second, which is 1.44 kg/s -- about 124 tonnes a day, or six lorry loads, out of water a lab would call clear.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'River A carries 200 mg/L at 5 m³/s. River B carries 50 mg/L at 20 m³/s. Which is removing more rock from its valley?',
            options: [
                'River A, because its water is four times as mineral-rich',
                'River B, because it has four times the flow',
                'Neither — they are equal',
                'It cannot be worked out without knowing the rock type'
            ],
            correctIndex: 2,
            hint: 'Multiply each one out before comparing.',
            explanation: 'Both give 1,000 g/s: 200 x 5 = 1,000 and 50 x 20 = 1,000. Equal loads, 86 tonnes a day each. A probe reading describes the water, not the valley — a rich trickle and a weak torrent can dismantle their hills at the same rate.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Warm water and slow water both lower the oxygen a trout gets. Why does it usually take both together to kill the trout?',
            options: [
                'Because fish can tolerate one problem but not two at once',
                'Because the two losses multiply, and either one alone still leaves enough',
                'Because slow water is only a problem when it is warm',
                'Because the trout swims away from the first problem it meets'
            ],
            correctIndex: 1,
            hint: 'At 30 °C but fast, a trout still gets 7.2 mg/L. At 10 °C but sluggish, 7.9.',
            explanation: 'Warmth lowers the ceiling and slowness lowers the percentage of it reached, and the two multiply. Either alone leaves a trout above 6 mg/L; together, 8.3 x 0.70 = 5.8 mg/L, and it fails. This is the same multiplying that made the flood quadruple rather than double.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two stretches of the same river have the same discharge, but one is narrow and fast while the other is wide and slow. What differs?',
            options: [
                'Nothing — the same discharge means the same river behaviour',
                'The amount of water differs, though the discharge is the same',
                'The water is the same, but the erosion is not',
                'The wide stretch must be carrying more dissolved rock'
            ],
            correctIndex: 2,
            hint: 'Discharge counts water. P18 was about what the water does to the bank.',
            explanation: 'Discharge says how much water passes, and nothing about what it does. The same 19.2 m³/s can arrive as 8 m at 1.6 m/s or 16 m at 0.8 m/s: the river cannot tell the difference, but fast narrow water cuts into the bed while slow wide water drops sand.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A factory warms a fast trout stream from 10 °C to 25 °C, and it stays at 95% saturation. The arithmetic gives 7.9 mg/L, above the trout\'s 6 — yet the trout die. What does this tell you?',
            options: [
                'The saturation table must be wrong',
                'The trout died of something unrelated to the water',
                'The 6 mg/L figure is not fixed — a warmer fish needs more oxygen',
                'The stream must really have been slower than 95%'
            ],
            correctIndex: 2,
            hint: 'Both ends of the gap can move. Level 2 only let one of them move.',
            explanation: 'The supply side was calculated correctly. What was assumed was the demand side: 6 mg/L was borrowed from a trout in cool water. A warm fish runs faster inside and needs more oxygen, so the gap closes from both ends — and Level 3 shows the demand side moves about three times as much as the supply side does.'
        }
    ]
};
