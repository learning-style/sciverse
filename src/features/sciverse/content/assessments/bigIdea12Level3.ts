import { AssessmentData } from '../../types';

/**
 * Big Idea 12 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P12 (v = sqrt(g x r), T = 2 pi r / v, and Kepler's third law),
 * L3C12 (shell capacity 2n^2 filled in energy order, and the ionisation-energy
 * evidence), L3B12 (odds x survival ratio^n, and logs to read real counts).
 *
 * The distractors are the mistakes each lesson works through: forgetting the
 * square root, filling a whole shell before starting a new row, and
 * multiplying by the ratio times n instead of raising it to the power n.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea12Level3Assessment: AssessmentData = {
    bigIdea: 12,
    level: 3,
    title: 'How Do Hidden Rules Shape Big Patterns?',
    subtitle: 'Level 3 -- Orbit Speeds, Shell Counting and Selection Odds',
    icon: '🔭',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'For a circular orbit, the speed is:',
            options: ['√(gravity at that height x r)', 'gravity x r', '2 x π x r', '√(r / gravity)'],
            correctIndex: 0,
            hint: 'Set the acceleration the circle needs equal to the one gravity supplies.',
            explanation: 'v² / r = gravity, so v² = gravity x r and v = √(gravity x r).'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The greatest number of electrons that fits in shell n is:',
            options: ['2n²', 'n²', '2n', 'Always 8'],
            correctIndex: 0,
            hint: 'Try n = 1, 2, 3.',
            explanation: '2n² gives 2, 8, 18 and 32 for the first four shells.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The odds of dark to light moths is:',
            options: ['The number of dark moths divided by the number of light ones', 'The share of moths that are dark', 'The number of dark moths minus the light ones', 'The light moths divided by the dark ones'],
            correctIndex: 0,
            hint: 'Dark on top, light underneath.',
            explanation: 'A share of 50% is odds of 1, and 98% is odds of 49. Odds are used because one generation multiplies them.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'In each Level 3 lesson, writing the repeating rule as a formula let you:',
            options: ['Work out a whole span at once instead of stepping through it', 'Avoid measuring anything', 'Ignore the conditions the rule needs', 'Prove the rule can never fail'],
            correctIndex: 0,
            hint: 'Think of 47 generations, or one lap of the Moon.',
            explanation: 'v = √(g r) gives any orbit, 2n² gives any row, and odds x ratio^n gives any number of generations.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'At a certain orbit, gravity is 2.0 N/kg and r = 1.0 x 10⁷ m. What speed does a circular orbit need?',
            options: ['About 4.5 km/s', 'About 2.0 x 10⁷ m/s', 'About 20 km/s', 'About 0.45 km/s'],
            correctIndex: 0,
            hint: 'v = √(gravity x r).',
            explanation: 'v² = 2.0 x 1.0 x 10⁷ = 2.0 x 10⁷, so v = 4,470 m/s, about 4.5 km/s.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Row 4 of the periodic table holds 18 elements because it fills:',
            options: ['4s, then 3d, then 4p: 2 + 10 + 6', 'The whole of shell 4, all 32 places', '3s and 3p only', '4s and 4p, with no d subshell'],
            correctIndex: 0,
            hint: 'Which subshells fill between one fresh s subshell and the next?',
            explanation: '4s (2) + 3d (10) + 4p (6) = 18. Shell 4 holds 32, but 4d and 4f wait for later rows.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'The odds of dark moths start at 0.02, and the survival ratio is 1.5. What are the odds after 4 generations?',
            options: ['About 0.10', 'About 0.12', 'About 0.08', 'About 5.06'],
            correctIndex: 0,
            hint: 'Odds after n = starting odds x ratio to the power n.',
            explanation: '0.02 x 1.5⁴ = 0.02 x 5.06 = 0.101, which is a dark share of about 9%. 0.12 multiplies by 1.5 x 4 instead.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Kepler found T² in proportion to r³ by studying planets. In this Big Idea, where does that law come from?',
            options: ['From v = √(g x r) with gravity falling as 1/r², put into T = 2πr / v', 'From measurements of planets alone', 'From the mass of each planet', 'From the inverse-square law on its own, with no motion'],
            correctIndex: 0,
            hint: 'Two rules together: the circle and the inverse square.',
            explanation: 'Gravity sets the speed at each radius, and the lap time is the circumference over that speed. Together they give T ∝ r^1.5.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Satellite B orbits at four times satellite A\'s distance from Earth\'s centre. How much longer is B\'s lap?',
            options: ['8 times as long', '4 times as long', '16 times as long', '2 times as long'],
            correctIndex: 0,
            hint: 'T is in proportion to r^1.5.',
            explanation: '4^1.5 = 8. The circle is 4 times longer and the speed is half, so the lap takes 8 times as long.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'What is the evidence that potassium\'s nineteenth electron goes into 4s rather than 3d?',
            options: ['Its first ionisation energy is the lowest of the first twenty elements, and it reacts like sodium', 'It is heavier than argon', 'Shell 3 can hold 18 electrons', 'It is counted as a transition metal'],
            correctIndex: 0,
            hint: 'What would a nearly full shell 3 predict, and what do we actually measure?',
            explanation: 'A lone outer electron is easy to remove: potassium\'s 419 kJ/mol is the lowest of the first twenty, and it reacts violently with water like sodium.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A trait\'s odds climb from 0.01 to 10 in 40 generations. What is the survival ratio? (log 1,000 = 3.)',
            options: ['About 1.19', 'About 25', 'About 1.075', 'About 3'],
            correctIndex: 0,
            hint: 'log(ratio) = [log(final odds) − log(starting odds)] / n.',
            explanation: 'The odds grew 1,000 times, so log = 3, and 3 / 40 = 0.075. The ratio is 10^0.075 = 1.19: a 19% advantage each generation.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Each Level 3 lesson named something it still simplifies. Which is one of them?',
            options: ['Real orbits are ellipses, not the circles this model uses', 'Gravity does not really weaken with distance', 'Atoms do not really contain electrons', 'Selection can never run in reverse'],
            correctIndex: 0,
            hint: 'Look at what each lesson admits it left out.',
            explanation: 'Orbits are ellipses; chromium and copper break the filling order; and moth genes come in pairs, with moths moving between woods.'
        }
    ]
};
