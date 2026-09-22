import { AssessmentData } from '../../types';

/**
 * Big Idea 15 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P15 (the amplitude correction T = T0 (1 + theta^2/16)), L3C15
 * (balancing numbers as powers, ICE tables, and what delta n does under
 * pressure), L3B15 (Lotka-Volterra equilibria and the 2 pi / sqrt(r m) lap).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea15Level3Assessment: AssessmentData = {
    bigIdea: 15,
    level: 3,
    title: 'How Do Systems Find Balance?',
    subtitle: 'Level 3 -- Swing Size, Powers in K, and Cycle Length',
    icon: '🔁',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In T = T₀ (1 + θ²/16), the angle θ must be expressed in:',
            options: ['Degrees', 'Radians', 'Either, since they are proportional', 'Full turns'],
            correctIndex: 1,
            hint: 'What does the formula do to θ straight away?',
            explanation: 'θ is squared, so the units matter: 180° = π radians. Using degrees in this formula gives an answer roughly 3,000 times too large.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'For H₂ + I₂ ⇌ 2HI, the equilibrium constant Kc is:',
            options: ['[HI] / ([H₂][I₂])', '[HI]² / ([H₂][I₂])', '2[HI] / ([H₂][I₂])', '[HI]² / ([H₂] + [I₂])'],
            correctIndex: 1,
            hint: 'The balancing number becomes a power.',
            explanation: 'The 2 in 2HI becomes an exponent, and reactant concentrations multiply. Leaving the square off gives 34.5 instead of 54.3 -- and a number that halves when the flask is squeezed, so not a constant at all.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In the Lotka-Volterra rules, the term a × N × P describes:',
            options: ['Hares lost, which needs a lynx and a hare to meet', 'Hares born each year', 'Lynx dying of old age', 'The carrying capacity of the wood'],
            correctIndex: 0,
            hint: 'Why are both populations in the same term?',
            explanation: 'A loss requires a meeting, so it depends on both numbers at once. That coupling is what turns a balance point into a cycle.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A pendulum released from 90° instead of a tiny angle has a period that is:',
            options: ['The same', 'About 18% longer', 'About 18% shorter', 'Exactly twice as long'],
            correctIndex: 1,
            hint: 'The angle is missing from T₀, not from reality.',
            explanation: 'The true period is 18.03% longer at 90°. The small-swing formula is an approximation, and "for small swings" marked the edge of where it is honest.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A pendulum with a small-swing period of 2.000 s is released from 20° (0.3491 radians). Its period is:',
            options: ['2.000 s', '2.015 s', '2.349 s', '52.0 s'],
            correctIndex: 1,
            hint: 'Square the radians, divide by 16.',
            explanation: '0.3491² = 0.1218, and 0.1218/16 = 0.00762, so T = 2.000 × 1.00762 = 2.015 s. Fifteen milliseconds a swing -- but 658 s, eleven minutes, over a day.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A flask at equilibrium holds [HI] = 0.80, [H₂] = 0.25 and [I₂] = 0.10 mol/L. What is Kc?',
            options: ['32', '25.6', '2.3', '3.2'],
            correctIndex: 1,
            hint: 'Square the top; multiply the bottom.',
            explanation: '0.80² = 0.64 and 0.25 × 0.10 = 0.025, so Kc = 25.6. Since the value at 430 °C is 54.3, this flask is not at 430 °C -- Kc fingerprints the temperature.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'With r = 0.6 and m = 0.6 a year, how long is one lap of the predator-prey cycle?',
            options: ['About 10.5 years', 'About 1.2 years', 'About 3.6 years', 'About 21 years'],
            correctIndex: 0,
            hint: 'period = 2π / √(r m).',
            explanation: 'r × m = 0.36, √0.36 = 0.6, and 2π/0.6 = 10.5 years -- close to the roughly ten-year beat in a century of lynx and hare trapping records.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Starting from 1.00 mol/L each of H₂ and I₂ with Kc = 54.3, the ICE table gives 2x/(1.00 − x) = √54.3. Why can a square root be taken?',
            options: ['Because Kc is always a perfect square', 'Because both the top and the bottom of Kc are perfect squares here, which avoids a quadratic', 'Because x must be small', 'Because the reaction is one-to-one'],
            correctIndex: 1,
            hint: 'Look at the shape of (2x)² / (1 − x)².',
            explanation: '(2x)²/((1−x)(1−x)) is a square over a square, so rooting both sides gives 2x/(1−x) = 7.369 and a linear equation: x = 0.7865, [HI] = 1.573.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A clock\'s drive weight runs down and its swing narrows from 6° to 4°. What happens, and why does it matter more than friction?',
            options: ['It gains about 33 s a day; friction only reaches the timekeeping through the amplitude', 'It loses about 33 s a day; friction is the real problem', 'Nothing changes, because the length is unchanged', 'It gains about 2 minutes a day'],
            correctIndex: 0,
            hint: 'A narrower swing is a quicker one.',
            explanation: 'The correction falls from 0.000685 to 0.000305, a gain of 0.00038 × 86,400 = 33 s a day. Damping merely narrows the swing, and it is the width that shifts the period -- which is why good clocks work hard to deliver a constant push.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Squeezing a flask to half its volume shifts N₂ + 3H₂ ⇌ 2NH₃ forward but leaves H₂ + I₂ ⇌ 2HI alone. Why?',
            options: ['Ammonia is a gas and hydrogen iodide is not', 'Because Kc changes with pressure for ammonia only', 'Because doubling every concentration changes Q only when the two sides have different numbers of gas particles', 'Because the ammonia reaction is faster'],
            correctIndex: 2,
            hint: 'Count gas particles on each side.',
            explanation: 'For HI the 4s cancel (Δn = 0) so Q is unchanged. For ammonia, 4 gas particles become 2 (Δn = −2), Q falls to a quarter, and the reaction runs forward. This is why ammonia plants run at 150-250 atmospheres.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'An indiscriminate poison lowers hare growth r from 0.6 to 0.4 and raises lynx death m from 0.6 to 0.9. What happens at balance?',
            options: ['Both populations fall in proportion', 'Hares rise to 1,500 and lynx fall to about 13', 'Hares fall to 500 and lynx stay at 20', 'Hares stay at 1,000 because their own rate barely changed'],
            correctIndex: 1,
            hint: 'Check which letters appear in each equilibrium.',
            explanation: 'N* = m/(ca) = 0.9/0.0006 = 1,500 -- containing no hare quantity at all -- and P* = r/a = 0.4/0.03 = 13.3. More hares than before the poison. Broad-spectrum insecticides have caused worse outbreaks for exactly this reason.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Each Level 3 lesson removed something that looked like a detail. What did the three removals have in common?',
            options: ['Each replaced an approximation with an exact answer', 'Each showed the discarded detail was carrying the behaviour: the swing size sets the timing, the powers set whether pressure acts, and the coupled rates set the cycle', 'Each made the maths simpler', 'Each showed the Level 2 formulas were wrong'],
            correctIndex: 1,
            hint: 'None of the Level 2 formulas was wrong within its conditions.',
            explanation: 'Small swings, one-to-one reactions and fixed rates all looked like tidying. Each carried the behaviour. And none of the replacements is exact either: θ²/16 is one term of a series, Kc assumes independent particles, and the wood has no carrying capacity.'
        }
    ]
};
