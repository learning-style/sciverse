import { AssessmentData } from '../../types';

/**
 * Big Idea 11 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P11 (pressure drop = flow x resistance; resistance ∝ length / radius^4),
 * L3C11 (the bicarbonate buffer, pH = 6.1 + log (bicarbonate / (0.03 x CO2
 * pressure))), L3B11 (doublings = log (target / start) / log 2, the memory race).
 *
 * The distractors are the mistakes each lesson works through: squaring once,
 * the ratio upside down, adding cells instead of doubling them, and moving CO2
 * the wrong way.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea11Level3Assessment: AssessmentData = {
    bigIdea: 11,
    level: 3,
    title: 'How Do We Stay Healthy?',
    subtitle: 'Level 3 -- Resistance, Buffers and the Memory Race',
    icon: '🫀',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'For smooth, steady flow through a tube, the resistance is in proportion to:',
            options: ['length / radius⁴', 'radius⁴ / length', 'length x radius', '1 / radius'],
            correctIndex: 0,
            hint: 'A narrower tube resists far more; a longer one resists more too.',
            explanation: 'Resistance ∝ length / radius⁴. The radius counts four times: twice for the room to pass, twice for the walls closing in.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A buffer is:',
            options: ['A weak acid mixed with its partner base, which soaks up added acid', 'A strong acid that lowers the pH', 'Pure water', 'A base that raises the pH as high as it can'],
            correctIndex: 0,
            hint: 'Blood\'s is dissolved CO₂ with bicarbonate.',
            explanation: 'The partner base grabs added H⁺, so the pH changes far less than it would in pure water.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The number of doublings needed to grow from a start to a target is:',
            options: ['log (target / start) / log 2', '(target − start) / 2', 'target / start / 2', 'log 2 / log (target / start)'],
            correctIndex: 0,
            hint: 'Start from target / start = 2ⁿ and take logs.',
            explanation: 'log (target / start) = n x log 2, so n = log (target / start) / log 2.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'In pH = 6.1 + log (bicarbonate / (0.03 x CO₂ pressure)), breathing faster:',
            options: ['Lowers the CO₂ pressure, which raises the ratio and the pH', 'Raises the CO₂ pressure and the pH', 'Adds bicarbonate to the blood', 'Changes nothing, because only the kidneys matter'],
            correctIndex: 0,
            hint: 'Breathing blows off CO₂, the acid below the line.',
            explanation: 'Less CO₂ on the bottom of the ratio makes the ratio bigger, so the pH rises.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'An artery narrows to 60% of its normal radius. The pressure drop along it stays the same. What share of its normal flow gets through?',
            options: ['About 13%', '60%', '36%', 'About 22%'],
            correctIndex: 0,
            hint: 'Square, then square again.',
            explanation: '0.6 x 0.6 = 0.36, and 0.36 x 0.36 = 0.13. 36% squares only once, and 22% is 0.6³.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Blood has bicarbonate 24 mmol/L and a CO₂ pressure of 20 mmHg. What is its pH?',
            options: ['7.70', '7.10', '7.40', '6.80'],
            correctIndex: 0,
            hint: 'Dissolved CO₂ = 0.03 x 20. Then the ratio, then the log.',
            explanation: '0.03 x 20 = 0.6, the ratio is 24 / 0.6 = 40, and 6.1 + log 40 = 6.1 + 1.60 = 7.70: too little CO₂ makes blood less acidic.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Memory cells start at 1,250 and double every 12 hours until there are 100,000. About how long does that take?',
            options: ['About 76 hours', 'About 960 hours', 'About 40 hours', '80 hours'],
            correctIndex: 0,
            hint: 'Ratio first: 100,000 / 1,250.',
            explanation: 'The ratio is 80, and log 80 / log 2 = 1.90 / 0.301 = 6.3 doublings, x 12 hours = 76 hours. 960 hours multiplies the ratio by 12.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A booster doubles the memory cells. With cells doubling every 12 hours, why does it save exactly 12 hours?',
            options: ['Twice as many cells is exactly one doubling further up the ladder', 'A booster only lasts 12 hours', 'The germ slows down by 12 hours', 'Twice as many cells halves the time'],
            correctIndex: 0,
            hint: 'How many doublings does twice the cells skip?',
            explanation: 'Doubling the start halves target / start, and log 2 / log 2 = 1: one doubling fewer, one doubling time sooner.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A whole body needs an 85 mmHg pressure drop to pump 5 L/min. If every small blood vessel narrowed to 80% of its radius, what drop would keep 5 L/min?',
            options: ['About 207 mmHg', 'About 106 mmHg', 'About 35 mmHg', '85 mmHg'],
            correctIndex: 0,
            hint: 'Resistance rises by 1 / 0.8⁴.',
            explanation: '0.8⁴ = 0.41, so resistance rises 2.44 times, and 85 x 2.44 = 207 mmHg. 106 uses 1 / 0.8, and 35 multiplies by 0.41 instead of dividing.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Acid has used up bicarbonate until it is 18 mmol/L. What CO₂ pressure would bring the pH to 7.40?',
            options: ['30 mmHg', '53 mmHg', '40 mmHg', '60 mmHg'],
            correctIndex: 0,
            hint: 'pH 7.40 needs the ratio 20.',
            explanation: 'Dissolved CO₂ must be 18 / 20 = 0.9 mmol/L, and 0.9 / 0.03 = 30 mmHg -- breathing faster. 53 mmHg moves the CO₂ the wrong way.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A vaccinated person has 5,000 memory cells (52 hours to reach 100,000). They meet a germ that starts at 100, doubles every 2.5 hours, and makes you ill at 1 billion. Who wins?',
            options: ['Memory: the germ needs about 58 hours', 'The germ: it needs about 23 hours', 'The germ: it needs about 47 hours', 'Neither: they tie at 52 hours'],
            correctIndex: 0,
            hint: 'The germ needs log (10⁹ / 100) / log 2 doublings.',
            explanation: '7 / 0.301 = 23.3 doublings, x 2.5 hours = 58 hours, after memory\'s 52. 23 is the number of doublings, not hours; 47 hours is for a germ doubling every 2 hours.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do Big Idea 11\'s Level 3 lessons have in common?',
            options: ['A small change in a ratio makes a big change in the result: radius⁴, the log of a ratio, and a head start of doublings', 'Every result changes in step with its cause', 'None of them uses a ratio', 'They all use the same formula'],
            correctIndex: 0,
            hint: 'Look at how each result depends on its cause.',
            explanation: '80% radius gave 41% flow; halving the base and the acid kept pH; fifty times the cells saved only 5.6 doublings. Health turns on ratios.'
        }
    ]
};
