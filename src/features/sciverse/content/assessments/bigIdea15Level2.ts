import { AssessmentData } from '../../types';

/**
 * Big Idea 15 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P15 (T = 2 pi sqrt(L/g) in both directions), L2C15 (Q against K to
 * predict the direction of a shift), L2B15 (births against losses, and the lag
 * that turns a balance point into a cycle).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea15Level2Assessment: AssessmentData = {
    bigIdea: 15,
    level: 2,
    title: 'How Do Systems Find Balance?',
    subtitle: 'Level 2 -- Swing Times, Shift Directions and Balance Points',
    icon: '⚖️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In T = 2π √(L/g), the length L is measured:',
            options: ['From the pivot to the centre of the bob', 'From the pivot to the top of the bob', 'Across the width of the swing', 'From the floor to the pivot'],
            correctIndex: 0,
            hint: 'It is not the same as the length of the string.',
            explanation: 'L runs from the pivot to the centre of the bob, which is why a heavy bob on a short string is longer than the string alone.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'To make a pendulum take twice as long for each swing, you must make it:',
            options: ['Twice as long', 'Four times as long', 'Twice as heavy', 'Half as long'],
            correctIndex: 1,
            hint: 'The length sits under a square root.',
            explanation: 'T follows √L, so the length must change by the square of the factor you want: four times the length gives twice the period. 0.25 m takes 1.00 s and 1.00 m takes 2.01 s.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The reaction quotient Q is:',
            options: ['The product-to-reactant ratio measured right now', 'The ratio the reaction always ends at', 'The speed of the forward reaction', 'The temperature of the flask'],
            correctIndex: 0,
            hint: 'Same ratio as K, different moment.',
            explanation: 'Q is product divided by reactant at this instant, whether or not the reaction has settled. K is that same ratio once it has.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A hare population holds steady when:',
            options: ['There are as many hares as lynx', 'The hares born each year match the hares lost each year', 'No hares are born and none are lost', 'The lynx leave the wood'],
            correctIndex: 1,
            hint: 'Balance is about flows, not totals.',
            explanation: 'Steady means the two flows match: 600 born and 600 lost each year holds 1,000 hares level while both flows stay busy.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A grandfather clock pendulum takes 2.00 s for a full back-and-forth. How long is it? (g = 9.81 m/s²)',
            options: ['1.99 m', '0.994 m', '0.318 m', '3.12 m'],
            correctIndex: 1,
            hint: 'Undo the square root by squaring.',
            explanation: 'L = g x (T / 2π)² = 9.81 x (2 / 6.2832)² = 9.81 x 0.1013 = 0.994 m. Just under a metre, which sets how tall the clock case has to be.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A reaction rests at K = 4. Right now the flask holds 12 product and 6 reactant. Which way does it go?',
            options: ['Reverse, because there is already twice as much product', 'Forward, because Q = 2 is below K = 4', 'Neither, because the ratio is a whole number', 'Reverse, because K is greater than 1'],
            correctIndex: 1,
            hint: 'Work out Q, then compare it with K.',
            explanation: 'Q = 12/6 = 2, and 2 < 4, so the reaction runs forward. It rests at 14.4 product and 3.6 reactant. "A lot of product" is never the test -- a lot compared with K is.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A wood holds 2,000 hares growing at 50% a year, and each lynx takes 25 hares a year. How many lynx hold the hares steady?',
            options: ['40', '20', '80', '25,000'],
            correctIndex: 0,
            hint: 'Find the births first, then divide.',
            explanation: 'births = 0.50 x 2,000 = 1,000 a year, and each lynx accounts for 25, so 1,000 / 25 = 40 lynx. Units check: hares a year divided by hares a year for each lynx leaves lynx.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'The same 25 cm pendulum is taken to the Moon, where gravity is 1.62 m/s² instead of 9.81. Its period becomes:',
            options: ['Shorter, about 0.41 s', 'Unchanged, because mass and length are the same', 'Longer, about 2.47 s', 'Longer, about 6.05 s'],
            correctIndex: 2,
            hint: 'Gravity sits underneath, inside the root.',
            explanation: 'Gravity is the restoring pull, so weaker gravity returns the bob more lazily: T = 2π √(0.25/1.62) = 2.47 s, against 1.00 s on Earth.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A pendulum clock keeping perfect time at sea level is carried up a mountain, where gravity is about 0.06% weaker. What happens?',
            options: ['It runs slow by about 26 s a day', 'It runs fast by about 26 s a day', 'It runs slow by about 52 s a day', 'Nothing changes, because the length is the same'],
            correctIndex: 0,
            hint: 'Which letter sits underneath the square root?',
            explanation: 'Weaker gravity means a longer period, so the clock counts too few swings. The square root halves the effect: a 0.06% drop in g lengthens T by 0.03%, and 0.0003 x 86,400 s is about 26 s a day.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A reaction has K = 0.01, resting with a hundred times more reactant than product. Why is it still useful for making the product?',
            options: ['Because a small K means a fast reaction', 'Because K grows over time', 'Because removing the product keeps Q below K, so it runs forward again and again', 'Because the reverse reaction stops once product is removed'],
            correctIndex: 2,
            hint: 'K says how far, not how fast -- and resting points can be moved.',
            explanation: 'Take product away and Q drops below K, so the reaction runs forward to replace it. Keep removing, and it never reaches rest. This is how the Haber process is run: the ammonia is condensed out continuously.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'If a wood has a balance point where births match losses, why do its hare and lynx numbers cycle instead of settling there?',
            options: ['Because the balance point pushes numbers away from itself', 'Because predators respond to last year\'s hare numbers, so they arrive late in both directions', 'Because births and losses can never be equal', 'Because the hares migrate in and out'],
            correctIndex: 1,
            hint: 'What makes a pendulum swing past the bottom?',
            explanation: 'Nothing pushes away from balance -- but lynx take a year or more to answer a change in hares, so they are too few while hares climb and too many after they fall. A balance point plus a delay gives a cycle; without the delay it would settle.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do a pendulum, a reversible reaction and a predator-prey wood have in common at Level 2?',
            options: ['Each has a point where opposing flows match exactly, and the timing, direction or delay around it sets the behaviour', 'Each settles to a complete stop given enough time', 'Each has equal amounts of two things when balanced', 'Each is described by the same formula'],
            correctIndex: 0,
            hint: 'Balance is not stillness.',
            explanation: 'The pendulum balances straight down and T = 2π √(L/g) sets its timing; a reaction balances at K and Q against K sets its direction; a wood balances where births equal losses and the lag sets its cycle. None of the three is still.'
        }
    ]
};
