import { AssessmentData } from '../../types';

/**
 * Big Idea 21 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P21 (high tides every 12 h 25 min, and range as Moon plus or minus Sun),
 * L2C21 (residence time = reservoir / flux out, and what it does not mean),
 * L2B21 (turnover time = pool / rate, and why the currency cannot be stored).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea21Level2Assessment: AssessmentData = {
    bigIdea: 21,
    level: 2,
    title: 'How Do Cycles Keep Systems Alive?',
    subtitle: 'Level 2 -- Tide Tables, Residence Times, and Five Minutes of ATP',
    icon: '🌙',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'How long is there between one high tide and the next?',
            options: ['Exactly 12 hours', '12 hours 25 minutes', '24 hours', '6 hours'],
            correctIndex: 1,
            hint: 'Half a lunar day, and a lunar day is not 24 hours.',
            explanation: 'The Moon moves along its orbit while the Earth turns, so it takes 24 h 50 min for the same point to come back under it. Two high tides in that time means 12 h 25 min apart.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Residence time is:',
            options: [
                'The flux divided by the reservoir',
                'The reservoir divided by the flux out',
                'The reservoir multiplied by the flux',
                'How long the cycle takes to go round once'
            ],
            correctIndex: 1,
            hint: 'Check the units: what gives years?',
            explanation: 'Reservoir / flux out, in GtC divided by GtC a year, which leaves years. Flipping it gives a rate in "per year" instead — a real quantity, but the reciprocal of what was asked.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'ATP stands for:',
            options: ['Active transport protein', 'Adenosine triphosphate', 'Aerobic tissue power', 'Adenine phosphate'],
            correctIndex: 1,
            hint: 'Three phosphates on an adenosine.',
            explanation: 'Adenosine triphosphate — the cell\'s cash. Whatever fuel you eat is converted into ATP before anything spends it.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Spring tides — the biggest of the month — happen when:',
            options: [
                'Only at full moon',
                'At both new moon and full moon',
                'When the Moon is at right angles to the Sun',
                'In the spring season'
            ],
            correctIndex: 1,
            hint: 'What matters is a straight line, not which side the Moon is on.',
            explanation: 'A line through Earth, Moon and Sun lets the two pulls add, and it works whichever side the Moon sits on — so spring tides come twice a lunar month, every 14.8 days. "Spring" here means to spring up, not the season.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'The atmosphere holds 875 GtC and loses 210 GtC a year. What is its residence time?',
            options: ['0.24 years', '4.2 years', '184,000 years', '42 years'],
            correctIndex: 1,
            hint: '875 divided by 210.',
            explanation: '875 / 210 = 4.2 years. So about a quarter of the carbon in the air is swapped out every year — the atmosphere is a thoroughfare rather than a vault.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A body holds about 250 g of ATP and rebuilds about 65 kg a day. How long would the pool last if production stopped?',
            options: ['About 4 hours', 'About 5.5 minutes', 'About 5.5 hours', 'About 26 seconds'],
            correctIndex: 1,
            hint: 'Put both in grams, then convert the answer into minutes.',
            explanation: '65 kg is 65,000 g, so 250 / 65,000 = 0.0038 of a day, which is 5.5 minutes. That is the whole reserve of spendable energy — and it is why consciousness goes about ten seconds after the blood supply to the brain stops.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'High water was at 09:40. Roughly when is high water tomorrow morning?',
            options: ['09:40', '10:30', '08:50', '22:05'],
            correctIndex: 1,
            hint: 'Two tides make a lunar day of 24 h 50 min.',
            explanation: 'Each day the tides slip about 50 minutes later, so 09:40 becomes about 10:30. 22:05 is tonight\'s high water, one interval of 12 h 25 min on.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Working hard, a body can spend ATP about ten times faster. What happens to the reserve?',
            options: [
                'It lasts ten times longer',
                'It stays the same, because the pool has not changed',
                'It falls to about a tenth — roughly 33 seconds',
                'It doubles'
            ],
            correctIndex: 2,
            hint: 'The rate of use is on the bottom of the division.',
            explanation: 'Turnover time = pool / rate, so spending ten times faster divides the time by ten: about 33 seconds. Reserve is a ratio, not a quantity you carry about — the pool never changed.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A student says: "The atmosphere\'s residence time is 4.2 years, so extra CO₂ would be gone within five years of stopping emissions." What is wrong?',
            options: [
                'Nothing — the arithmetic is correct',
                'The residence time should have been calculated with the flux in',
                '4.2 years is how long one molecule stays before being swapped for another; an excess falls only as fast as the small imbalance between the 210 GtC leaving and the 210 arriving',
                'The reservoir figure is out of date'
            ],
            correctIndex: 2,
            hint: 'Turning over means swapping, not removing.',
            explanation: 'Each year about 210 GtC leaves the air and about 210 comes back, so a molecule is replaced rather than removed and the amount does not change. An excess of about 300 GtC against a net uptake of roughly 5 GtC a year is a matter of decades and longer. A residence time tells you how fast a store is stirred, not how fast a change to it fades.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why can the body not simply store a day\'s worth of ATP and stop worrying about interruptions?',
            options: [
                'It never evolved the enzymes to do it',
                'A day of ATP weighs 65 kg, and ATP is a large, heavily charged molecule that would wreck a cell\'s water and salt balance long before that',
                'ATP breaks down too quickly to store at all',
                'Storing it would require more oxygen than the lungs can supply'
            ],
            correctIndex: 1,
            hint: 'Compare 65 kg with the weight of a person.',
            explanation: 'A day\'s ATP is 65 kg in a body of about 70 — you would be made almost entirely of your own petty cash. Even an hour\'s worth, 2.7 kg, fails chemically, because ATP carries several negative charges and every dissolved particle draws water in by osmosis. So the body stores fuel instead: glycogen for about a day, fat for weeks.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A walker needs low water and checks a Monday tide table, then returns the following Monday at the same hour. What goes wrong?',
            options: [
                'Nothing — the same day of the week gives the same tide',
                'The tide is nearly six hours out, because 7 days x 50 min is 350 minutes — and a week after a spring tide it is a neap, so the sea does not go out as far either',
                'Only the range changes, not the time',
                'The tide is exactly 50 minutes out'
            ],
            correctIndex: 1,
            hint: 'The slip accumulates, and the day of the week means nothing to the Moon.',
            explanation: 'Seven days at about 50 minutes is 5 h 50 min, so 08:00 low water becomes about 13:50 — at eight in the morning the walker meets nearly high water. It takes a whole lunar month for the pattern to return to the same hour, which is why tide tables are printed daily.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'What do the tide, the carbon cycle and the ATP cycle have in common, as an answer to "how do cycles keep systems alive?"',
            options: [
                'All three repeat over roughly the same period',
                'All three are driven by the Sun',
                'A cycle is what lets a system run on almost no stock — the tide needs none, carbon has centuries of slack, and your cells hold five minutes',
                'All three can be paused safely for a short time'
            ],
            correctIndex: 2,
            hint: 'Look at how much each system actually holds in reserve.',
            explanation: 'Their periods differ enormously — 12 h 25 min, 4.2 years, 5.5 minutes — and so does their tolerance for a pause. What they share is that each delivers something continuously that the system cannot stockpile. An electricity grid works the same way: it stores coal and water behind dams, not electricity.'
        }
    ]
};
