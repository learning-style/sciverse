import { AssessmentData } from '../../types';

/**
 * Big Idea 27 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P27 (time = length / how fast the food advances; the squeezing wave runs
 * 3 cm/s while the food advances 0.04 cm/s, 75 times slower, so the muscle is mostly
 * mixing rather than carrying), L2C27 (time = bonds / (cutters x cuts per second);
 * 5.6 x 10^22 bonds in a slice of bread, one amylase molecule would need 130 ages of
 * the universe, 3 mg does it in 29 minutes -- numbers, not speed), and L2B27
 * (margin = time available / time needed = 8.6; the job needs 69.5 cm of the 600,
 * and that surplus is what makes an enzyme shortage survivable).
 * The spine: three lessons measured a length, a number and a ratio, and only the
 * ratio says whether the body works -- and L2P27's speed gap turned out to be the
 * hidden condition of L2C27's formula.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea27Level2Assessment: AssessmentData = {
    bigIdea: 27,
    level: 2,
    title: 'How Does Food Become Usable Energy?',
    subtitle: 'Level 2 -- The Time It Has, the Time It Takes, and the Ratio',
    icon: '🍞',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Food advances through the small intestine at about 0.04 cm every second, and the tube is about 600 cm long. How long is the food in there?',
            options: [
                'About 25 seconds',
                'About 24 minutes',
                'About 4 hours',
                'About 4 days'
            ],
            correctIndex: 2,
            hint: 'Divide the length by the speed, then turn the seconds into hours.',
            explanation: '600 / 0.04 = 15,000 seconds, and 15,000 / 3,600 is about 4.2 hours. That is the time the food has available, and the rest of the Big Idea is about whether it is enough.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Starch is long chains of glucose joined end to end. To get the glucose out, how many of those joins have to be cut?',
            options: [
                'Just the ones at the ends of each chain',
                'About half of them',
                'Every single one',
                'None — the chains dissolve on their own'
            ],
            correctIndex: 2,
            hint: 'Is a chain of two glucose units glucose?',
            explanation: 'Every join, because a chain of two glucose units is still not glucose and the body cannot use it. That is what makes the count matter: there are about 5.6 x 10^22 joins in one slice of bread, and the job is not finished until the last one is cut.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'One amylase molecule cuts about 1,000 bonds a second. Working alone on one slice of bread, how long would it take?',
            options: [
                'About 16 hours',
                'About two years',
                'About 130 times the age of the universe',
                'About a thousand years'
            ],
            correctIndex: 2,
            hint: '5.6 x 10^22 divided by 1,000 is 5.6 x 10^19 seconds. How many years is that?',
            explanation: '5.6 x 10^19 seconds is about 1.8 x 10^12 years, and the universe is about 1.4 x 10^10 years old — so roughly 130 times over. It is not that one molecule is slow; no molecule could ever be fast enough, which is why the answer has to be numbers instead.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The food has about 4.2 hours in the small intestine, and cutting a slice of bread takes about 29 minutes. What is the margin?',
            options: [
                'About 8.6 — it finishes more than eight times over',
                'About 0.12 — it only just finishes',
                'Exactly 1 — it finishes as it leaves',
                'There is no margin, because the two cannot be compared'
            ],
            correctIndex: 0,
            hint: 'Divide the time available by the time needed. Put both into the same units first.',
            explanation: '15,000 s / 1,736 s is about 8.6. The margin says how many times over the food finishes, and 8.6 is a lot of slack for a body — which is exactly what makes it worth explaining.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'The squeezing wave travels at about 3 cm/s, but the food only advances at about 0.04 cm/s — 75 times slower. What is the muscle mostly doing?',
            options: [
                'Carrying the food along, just inefficiently',
                'Mixing the food, because almost none of the wave\'s motion ends up as advance',
                'Slowing the food down on purpose',
                'Nothing — the two speeds are unrelated'
            ],
            correctIndex: 1,
            hint: 'If the wave were carrying the food, how fast would the food move?',
            explanation: 'A wave that carried food would move it at its own 3 cm/s, and the whole 600 cm would empty in about three minutes. Only 1/75 of the motion shows up as advance, so 74 parts in 75 are going into stirring — and L2B27 shows that the stirring is not a side effect but the thing that makes the chemistry possible.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Half the usual amylase turns up — 1.5 mg instead of 3 mg, each molecule still cutting 1,000 bonds a second. What happens?',
            options: [
                'Half the glucose is produced',
                'The same glucose is produced, but it takes twice as long',
                'Nothing changes, because the enzyme is handed back after every cut',
                'It takes half as long, because there is less to do'
            ],
            correctIndex: 1,
            hint: 'Does the bread have fewer bonds in it because there is less enzyme?',
            explanation: 'The bread has exactly as many bonds either way, and the enzyme count is on the bottom of the fraction — so halving it doubles the time, from 29 minutes to about 58. The amount of enzyme changes the time, not the outcome, and keeping those two apart is most of understanding what a catalyst does.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Three settings: 3 mg at 1,000 cuts a second, 1.5 mg at 2,000, and 6 mg at 500. How do their finishing times compare?',
            options: [
                '3 mg at 1,000 is fastest, because it has the most enzyme working at a sensible rate',
                '6 mg at 500 is fastest, because it has the most enzyme',
                'All three are the same, because only the product of the two matters',
                '1.5 mg at 2,000 is fastest, because faster cutting always wins'
            ],
            correctIndex: 2,
            hint: 'Both numbers sit in the same place in the formula.',
            explanation: 'Both are on the bottom and multiplied together, so only their product counts — and all three products are 3 x 10^6 in these units, giving about 29 minutes each. That matters biologically: the body cannot change how fast one molecule works, because that is set by the molecule\'s shape, but it has complete control over how many it makes.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'The job needs only about 69.5 cm of tube. Why is the small intestine about 600 cm?',
            options: [
                'Because 69.5 cm would only just finish on a perfect day, and bodies need room for bad ones',
                'Because the extra length makes the food move faster',
                'Because the arithmetic giving 69.5 cm is wrong',
                'Because the glucose needs somewhere to wait'
            ],
            correctIndex: 0,
            hint: 'What does a margin of exactly 1 mean?',
            explanation: 'A margin of 1 is not safety — it is the exact edge of failure, reached by a bigger meal, less enzyme, or food moving faster than usual. A 69.5 cm tube would digest a slice of bread on a good day and fail on every other one. The 600 cm is not for the slice of bread; it is for the bad days.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Half the usual enzyme gives a margin of 4.3 in a 600 cm tube, but only 0.72 in a 100 cm one. What is the length actually doing?',
            options: [
                'Cutting bonds itself, which is why more of it helps',
                'Making an enzyme shortage survivable, by giving the smaller number of cutters more time to work in',
                'Producing more enzyme, in proportion to its length',
                'Nothing — the two cases differ because of the enzyme, not the length'
            ],
            correctIndex: 1,
            hint: 'The same enzyme shortfall is harmless in one tube and catastrophic in the other.',
            explanation: 'The length cuts nothing. It sets the time available, and the margin is time available over time needed — so a long tube can absorb a doubling of the time needed and a short one cannot. The same halved enzyme is invisible at 600 cm and leaves 28% of the meal uncut at 100 cm, which is why two quite different conditions, a shortened bowel and a tired pancreas, show up as the same problem.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Somebody chews every mouthful a hundred times to digest faster. Using time = bonds / (cutters x cuts per second), does it work?',
            options: [
                'Yes — smaller pieces have more surface, so the enzymes work faster',
                'Yes — chewing breaks some of the bonds itself',
                'Barely — chewing changes none of the three terms in the formula',
                'No — chewing makes it slower by cooling the food'
            ],
            correctIndex: 2,
            hint: 'Take the three terms one at a time and ask what chewing does to each.',
            explanation: 'Bonds: unchanged, because crushing something does not unjoin it. Cuts per second: unchanged, that is the molecule\'s shape. Cutters: unchanged, chewing makes no enzyme. Smaller pieces genuinely matter when an enzyme cannot reach the food — which is why swallowing a whole potato is a bad idea — but reaching is not what is taking the time. The time is being taken by the sheer number of cuts.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'L2C27 attached a condition to its formula: every enzyme busy every second. What makes that condition true in a real gut?',
            options: [
                'Nothing — it is an assumption the body happens to satisfy',
                'The villi, which hold the enzyme against the wall',
                'The mixing, which is what L2P27\'s 75-fold speed gap was doing',
                'The length of the tube, which gives the enzyme time to find the food'
            ],
            correctIndex: 2,
            hint: 'How many cuts a second does an amylase molecule make when there is no starch near it?',
            explanation: 'An enzyme with no food near it makes zero cuts a second, not 1,000. In a tube 600 cm long the food would otherwise travel as a slug down the middle and most of the enzyme would never meet it. The muscle\'s wave runs 75 times faster than the food advances precisely so the two stay mixed — so P27\'s speed gap, which looked like a curiosity, is the mechanism behind C27\'s condition.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Big Idea 2 said the small intestine is folded into villi for surface area. This Big Idea says it is long for time. Are these in conflict?',
            options: [
                'Yes — one of the two explanations must be wrong',
                'No — they solve two different problems: area gets glucose across the wall, and length gives time to make the glucose at all',
                'No — area and time are the same quantity measured differently',
                'Yes, but it does not matter, because only the area is real'
            ],
            correctIndex: 1,
            hint: 'Which problem comes first in time: making the glucose, or absorbing it?',
            explanation: 'Absorbing glucose means crossing a wall, and crossing a wall needs area — that is what the villi are for. But before any of that, the glucose does not yet exist; it is still locked in starch, and cutting it out takes about 29 minutes, which only happens if the food is still in the tube. One organ, two problems, two different quantities — and a lesson that counted only one of them should say which.'
        }
    ]
};
