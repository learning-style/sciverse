import { AssessmentData } from '../../types';

/**
 * Big Idea 16 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P16 (horizontal field = total x cos(dip), and distance x tan(declination)),
 * L2C16 (the Curie temperature, one number per material), L2B16 (combined error =
 * single error / sqrt(number of cues), and why that does nothing to a bias).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea16Level2Assessment: AssessmentData = {
    bigIdea: 16,
    level: 2,
    title: 'How Do Magnets Help Us Navigate and Build Machines?',
    subtitle: 'Level 2 -- Field Strength, Curie Points and Cue Errors',
    icon: '🧭',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Magnetic field strength is measured in:',
            options: ['Tesla', 'Newtons', 'Degrees', 'Joules'],
            correctIndex: 0,
            hint: 'Earth\'s field is about 50 millionths of one.',
            explanation: 'The tesla (T) is the unit. Earth\'s field is about 50 microtesla (µT), where a microtesla is a millionth of a tesla.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The difference between true north and magnetic north is called the:',
            options: ['Dip angle', 'Declination', 'Bearing', 'Latitude'],
            correctIndex: 1,
            hint: 'It is stated as so many degrees east or west.',
            explanation: 'Declination is the angle between true north (your map\'s north) and magnetic north (the needle\'s), given as degrees east or west of true north.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The Curie temperature of a material is the temperature at which:',
            options: ['It melts', 'Its ferromagnetism disappears entirely', 'It becomes a better conductor', 'It starts to glow'],
            correctIndex: 1,
            hint: 'It is about domains, not about melting.',
            explanation: 'Above its Curie temperature a material\'s domains cannot line up at all, so it stops being ferromagnetic. Iron\'s is 770 °C, far below its melting point.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A bird averages two independent cues, each good to ±12°. The result is:',
            options: ['Still ±12°', 'Better than ±12° but not twice as good', 'Exactly ±6°', 'Worse, at ±24°'],
            correctIndex: 1,
            hint: 'Independent mistakes partly cancel.',
            explanation: 'Two independent cues give ±12/√2 = ±8.5°. Better than either alone, but not halved — the division is by the square root of the count.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'In London the total field is 49 µT and it dips 66° into the ground. How much is left to turn a flat compass needle?',
            options: ['49 µT', '44.8 µT', '19.9 µT', '32.6 µT'],
            correctIndex: 2,
            hint: 'Only the horizontal part turns the needle.',
            explanation: 'horizontal field = 49 × cos 66° = 49 × 0.407 = 19.9 µT — about 40% of the field. The rest pulls the needle downwards, where its pivot will not let it go.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'You walk 10 km on a compass bearing without correcting for a 2° declination. How far from your target do you finish?',
            options: ['About 20 m', 'About 349 m', 'About 2 km', 'Exactly 2 m'],
            correctIndex: 1,
            hint: 'An angle becomes a distance through a tangent.',
            explanation: '10 km × tan 2° = 10 × 0.0349 = 0.349 km, so 349 m. The error is a fixed fraction of the distance, so 20 km would double it to about 698 m.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A kiln is set to 600 °C. Which of nickel (354 °C), magnetite (585 °C), iron (770 °C) and cobalt (1,115 °C) stop being ferromagnetic inside it?',
            options: ['All four', 'Nickel and magnetite', 'Only nickel', 'None of them'],
            correctIndex: 1,
            hint: 'One comparison per material.',
            explanation: 'Nickel is 246 °C below the kiln and magnetite 15 °C below, so both stop. Iron and cobalt are still above it. Magnetite\'s thin 15 °C margin is where the number beats the intuition.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A young bird\'s magnetic and star senses are each good to only ±20°. Its combined error is:',
            options: ['±10°', '±14.1°', '±40°', '±20°'],
            correctIndex: 1,
            hint: 'Divide by the root of the count, not the count.',
            explanation: '20 / √2 = 20 / 1.414 = 14.1°. Sense-check it: better than 20° because two cues beat one, but worse than 10° because two cues are not twice as good.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Airports repaint their runway numbers every few decades, though the concrete never moves. Why?',
            options: ['Runway numbers are magnetic bearings, and magnetic north drifts', 'The continents move several kilometres a decade', 'Paint fades and the number is chosen afresh', 'Aircraft compasses have become more accurate'],
            correctIndex: 0,
            hint: 'What is the number measured against?',
            explanation: 'Runway 27 means a magnetic bearing of about 270°. Magnetic north wanders tens of kilometres a year, so the declination at that airport changes and the same strip of concrete acquires a different magnetic bearing. A magnetic bearing needs a date as well as a place.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Earth\'s core is about 5,000 °C and magnetite\'s Curie temperature is 585 °C. What does that prove about Earth\'s magnetic field?',
            options: ['It cannot come from magnetised rock, so it must come from moving molten iron', 'It must come from magnetite deep in the crust', 'Earth has no real magnetic field', 'The core must be cooler than we think'],
            correctIndex: 0,
            hint: 'Can domains line up at 5,000 °C?',
            explanation: 'The core is thousands of degrees above every Curie temperature, so no arrangement of domains could store the field. It must be made by moving electric charge — churning molten iron — which also explains why magnetic north drifts: a field made by flowing liquid does not sit still.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A bird crosses magnetic rock that pulls every reading 8° east, the same 8° every time. Cloud hides the stars, so it takes the magnetic reading twenty times and averages. How much does that help?',
            options: ['It divides the error by √20, to about 1.8°', 'Not at all — the average is still 8° out', 'It halves the error', 'It removes the error completely'],
            correctIndex: 1,
            hint: 'Is this scatter, or bias?',
            explanation: 'Averaging cancels scatter — random wobble either side of the truth. This is a bias: every reading leans the same way, so the average leans the same way. Twenty readings give a very precise 8° error, and a 141 km miss over 1,000 km. A bias has to be corrected, not averaged.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What single question do all three Level 2 lessons in this Big Idea actually answer?',
            options: ['How much can you trust a direction, and what kind of error threatens it', 'How magnets are manufactured', 'Why iron is cheaper than cobalt', 'How birds learn their route from their parents'],
            correctIndex: 0,
            hint: 'Look at what each formula produces.',
            explanation: 'cos(dip) says how much field is even available to turn a needle; tan(declination) prices the bias from trusting magnetic north as true north; the Curie temperature says when a material can hold a direction at all; and error/√n says what a second independent cue is worth. All four are about the size and the kind of error in a direction.'
        }
    ]
};
