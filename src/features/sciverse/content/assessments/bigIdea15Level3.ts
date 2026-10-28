import { AssessmentData } from '../../types';

/**
 * Big Idea 15 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P15 (the amplitude correction T = T0 (1 + theta^2/16)), L3C15
 * (balancing numbers as powers, ICE tables, and what delta n does under
 * pressure), L3B15 (a lynx's time budget, the ceiling its body sets, and why a
 * balance point can be a ridge).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea15Level3Assessment: AssessmentData = {
    bigIdea: 15,
    level: 3,
    title: 'How Do Systems Find Balance?',
    subtitle: 'Level 3 -- Swing Size, Powers in K, and a Balance That Repels',
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
            question: 'A lynx spends its year either searching for hares or handling them. Which of the two gets shorter as hares become more plentiful?',
            options: ['Searching — more hares means a shorter walk between them', 'Handling — a crowded wood makes each kill quicker', 'Both, and in proportion', 'Neither; a lynx hunts at one rate whatever the density'],
            correctIndex: 0,
            hint: 'Which of the two jobs could the wood possibly change?',
            explanation: 'Handling is the stalk, the kill, the carry, the meal and the digestion, and every part of it is set by the lynx body rather than by the wood -- a stomach does not hold a whole hare, so the animal caches the rest and comes back over two or three days. The hares can only ever shorten the search.'
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
            question: 'Handling one hare costs a lynx 2 days. Now imagine hares so thick that one is always within reach, so searching costs nothing. What is the most the lynx can take in a year?',
            options: ['About 182 — a year is 365 days and each hare costs 2 of them', 'There is no most, since there is always another hare within reach', '365, which is one a day', 'About 730'],
            correctIndex: 0,
            hint: 'Divide the year by what one hare costs.',
            explanation: '365 / 2 = 182, and that is the answer whether the wood holds ten thousand hares or ten million. One a day would be right if handling took one day, which is worth noticing: the ceiling is 365 divided by the handling time, so halving the handling doubles the ceiling. Nothing the wood does can raise it.'
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
            question: 'Births match losses at about 1,083 hares when the wood holds 20 lynx. Double the lynx to 40. Roughly where does that balance point move to?',
            options: ['About 2,200, which is twice as far', 'About 7,200, which is more than six times as far', 'It stays near 1,083, since the balance point belongs to the hares', 'About 540, which is half as far'],
            correctIndex: 1,
            hint: 'Births are 0.6 per hare. Set them equal to the lynx catch and multiply out the brackets before solving.',
            explanation: 'Births 0.6N equal the catch 365L / (10,000/N + 2). Multiplying out gives 6,000 + 1.2N = 365L, so the balance sits at N = (365L - 6,000) / 1.2. At 20 lynx that is 1,083; at 40 it is 7,167. The jump is far more than double because 6,000 of the lynx-days are spent searching whatever happens, and only what is left over presses on the hares. Doubling a predator population does not double its grip -- it does much more.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Each Level 3 lesson removed something that looked like a detail. What did the three removals have in common?',
            options: ['Each replaced an approximation with an exact answer', 'Each showed the discarded detail was carrying the behaviour: the swing size sets the timing, the powers set whether pressure acts, and the handling time decides whether the wood holds at all', 'Each made the maths simpler', 'Each showed the Level 2 formulas were wrong'],
            correctIndex: 1,
            hint: 'None of the Level 2 formulas was wrong within its conditions.',
            explanation: 'Small swings, one-to-one reactions and fixed rates all looked like tidying. Each carried the behaviour. And none of the replacements is exact either: θ²/16 is one term of a series, Kc assumes independent particles, and the wood has no carrying capacity.'
        }
    ]
};
