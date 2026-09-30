import { AssessmentData } from '../../types';

/**
 * Big Idea 20 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P20 (a lens is a delay: bulge = r^2 / (2f(n-1))), L3C20 (colour spread
 * = power / Abbe number, and why index and Abbe pull against each other), L3B20
 * (nearest focus = 1 / accommodation, and why a steady decline feels sudden).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea20Level3Assessment: AssessmentData = {
    bigIdea: 20,
    level: 3,
    title: 'How Do Lenses Change What We See?',
    subtitle: 'Level 3 -- The Delay, the Trade, and the Reciprocal',
    icon: '🔍',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why must a lens be fat in the middle?',
            options: [
                'To make it stronger and harder to break',
                'Because the middle ray has the shortest path, so it needs the most delaying',
                'To collect more light at the centre',
                'Because glass is easier to grind that way'
            ],
            correctIndex: 1,
            hint: 'Every path from object to image must take the same time.',
            explanation: 'Light from one point must arrive in step, or the waves cancel instead of adding. The edge ray travels further through air, so the middle ray has to be slowed by exactly that much — and glass in the middle is how you do it.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'An electron in a material behaves like a mass on a spring. What follows when light\'s frequency approaches the electron\'s natural frequency?',
            options: [
                'The electron stops moving',
                'The electron swings further, so the wave is slowed more — a higher index',
                'The light is absorbed completely',
                'The index falls towards 1'
            ],
            correctIndex: 1,
            hint: 'Think about pushing a child on a swing at the right rate.',
            explanation: 'A push near a spring\'s natural frequency produces a large swing, exactly as timing matters more than force on a playground swing. A bigger electron swing means a later re-radiated wave and a slower overall wave — which is a higher refractive index.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'What do you actually experience as your lens stiffens?',
            options: [
                'The number of dioptres of accommodation you have',
                'The nearest distance you can focus, which is 1 divided by the accommodation',
                'The stiffness of the lens itself',
                'A change in the colour of what you see'
            ],
            correctIndex: 1,
            hint: 'Nobody has ever felt a dioptre.',
            explanation: 'You experience a distance, not a dioptre — and nearest focus = 1 / accommodation. Putting a steadily falling quantity through a reciprocal is what turns a gradual decline into a sudden event.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'In the Abbe number, which is better — a big one or a small one?',
            options: ['A small one', 'A big one', 'It makes no difference', 'It depends on the prescription'],
            correctIndex: 1,
            hint: 'Crown glass is 58 and high-index spectacle glass is about 32. Which spreads the colours less?',
            explanation: 'A big Abbe number means the glass treats all colours almost alike, so the spread — power divided by Abbe number — is small. Crown glass at 58 is well behaved; high-index glass at 32 is not.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A lens has radius 20 mm and focal length 100 mm. How much further does the edge ray travel through air than the middle ray?',
            options: ['0.2 mm', '2.0 mm', '20 mm', '0.02 mm'],
            correctIndex: 1,
            hint: 'r squared over 2f.',
            explanation: '400 / 200 = 2.0 mm. The exact figure, the hypotenuse minus the straight path, is 1.98 mm — so the approximation is good to about 1% for any sensible lens.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'That same 2.0 mm of delay needs how much extra glass in the middle, at n = 1.52?',
            options: ['1.32 mm', '2.0 mm', '3.85 mm', '3.04 mm'],
            correctIndex: 2,
            hint: 'Glass delays light by (n - 1) times its thickness, not n times.',
            explanation: '2.0 / 0.52 = 3.85 mm. It is (n - 1) because the glass replaces air that was already delaying the ray. Dividing by n gives 1.32, which would mean a lens made of air worked; dividing by (n - 1) gives division by zero, which is the right way to say impossible.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A 6 D lens is made from glass with an Abbe number of 42. What is the colour spread?',
            options: ['0.143 D', '252 D', '7 D', '0.025 D'],
            correctIndex: 0,
            hint: 'Divide the power by the Abbe number.',
            explanation: '6 / 42 = 0.143 D, comfortably under the 0.25 D at which people begin to notice. Any answer bigger than the lens\'s own power has gone wrong: the spread is a small correction of a few hundredths of a dioptre.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Accommodation starts at 14 D at age 10 and falls 0.30 D a year. Reading at 25 cm needs 4 D. At what age are reading glasses needed?',
            options: ['About 37', 'About 43', 'About 50', 'About 57'],
            correctIndex: 1,
            hint: 'How many dioptres can be lost before dropping below 4, and how long does that take?',
            explanation: '14 - 4 = 10 D can be lost, and at 0.30 D a year that is 33 years from age 10 — age 43, which is when most people first buy reading glasses. Dividing 14 by the rate instead finds the age accommodation reaches zero, which is eleven years too late.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A Fresnel lens is a flat sheet of ridges a few millimetres thick, yet it focuses as strongly as a thick glass lens. How?',
            options: [
                'The ridges reflect light instead of refracting it',
                'Because a delay out by a whole wavelength is as good as an exact one, so whole cycles of glass can be discarded',
                'The ridges are made of much higher-index glass',
                'It only works for one colour at a time'
            ],
            correctIndex: 1,
            hint: 'Why did the delay need to be exact in the first place?',
            explanation: 'The delay existed to bring waves into step, and a wave shifted by a whole cycle looks identical to one not shifted at all. 3.85 mm of glass is about 7,700 wavelengths of delay, and 7,700 of them are waste — keep the leftover fraction and the glass mostly disappears. The steps scatter a little light, which is why lighthouses use them and cameras do not.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Lead oxide, lanthanum oxide, titanium oxide and sulfur all raise a material\'s index, and all of them lower its Abbe number. Why does every route have the same side effect?',
            options: [
                'Because all four are heavy elements',
                'Because each works by moving the electron resonance nearer the visible, and a response near resonance is both larger and steeper',
                'Because they all absorb blue light',
                'It is a coincidence of which materials happen to be available'
            ],
            correctIndex: 1,
            hint: 'What does "near resonance" do to the size of the response, and what does it do to the slope?',
            explanation: 'They are not four separate tricks. Every one raises the index by putting the electrons\' natural frequency closer to visible light, and near a resonance the response grows and steepens together. Index and Abbe number are one property read two ways, which is why no cleverness in composition escapes the trade — sulfur is not even a heavy element and it pays the same price.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A +10 D lens of Abbe 58 is paired with a -6 D lens of Abbe 36. What does the pair achieve?',
            options: [
                'Power 4 D with a spread of 0.339 D — worse than either alone',
                'Power 4 D with a spread of about 0.005 D — almost no colour error',
                'Power 16 D with a spread of 0.005 D',
                'Power 4 D with the same spread as a single 4 D lens'
            ],
            correctIndex: 1,
            hint: 'Powers add, and so do spreads — including their signs.',
            explanation: '10/58 = +0.172 D and -6/36 = -0.167 D, so the spreads nearly cancel to 0.005 D while the powers only partly cancel to 4 D. That is an achromatic pair, invented in the 1730s, and it is why a camera lens is a stack of elements rather than one piece of glass.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Someone insists their eyesight changed in a few weeks, while the model says the lens stiffens perfectly steadily. Who is right?',
            options: [
                'The model — the experience must be gradual, and they misremember',
                'Both: the near point moves about a centimetre a month at the crossing, so the effect really is sudden even though the cause was spread over thirty years',
                'The person — so the model must be wrong about the rate',
                'Neither, because accommodation does not change with age'
            ],
            correctIndex: 1,
            hint: 'Work out the near point at ages 43.0, 43.5 and 44.0.',
            explanation: '24 cm, then 25 cm, then 26 cm — about a centimetre a month, right at the distance they have held books all their life. The effect is genuinely sudden and still has no sudden cause, which is why people reach for explanations like reading in dim light. A sudden effect is not evidence of a sudden cause.'
        }
    ]
};
