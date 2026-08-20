import { AssessmentData } from '../../types';

/**
 * Big Idea 32 Assessment: "How Does Air Quality Affect Breathing?"
 * Covers P32 (Particle Drift), C32 (Smog Reactions), B32 (Breathing Under Siege)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea32Assessment: AssessmentData = {
    bigIdea: 32,
    title: 'How Does Air Quality Affect Breathing?',
    subtitle: 'Physics of Air, Chemical Reactions, and Biological Impact',
    icon: '🌫️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Air moves into your lungs when:',
            options: ['You inhale and create lower pressure in your chest', 'You hold your breath', 'You eat food', 'You close your mouth'],
            correctIndex: 0,
            hint: 'Think about what happens when you breathe in.',
            explanation: 'Inhaling expands your chest, lowering pressure and drawing air in.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Smog forms when:',
            options: ['Pollutants react in sunlight', 'It rains', 'The wind blows', 'It is cold'],
            correctIndex: 0,
            hint: 'Think about what causes hazy air in cities.',
            explanation: 'Sunlight drives chemical reactions between pollutants, creating smog.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Breathing polluted air can:',
            options: ['Harm your lungs and health', 'Make you taller', 'Change your eye color', 'Make you run faster'],
            correctIndex: 0,
            hint: 'Think about what happens when air is dirty.',
            explanation: 'Polluted air can irritate and damage your lungs.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Tiny pollution particles reach deep into the lungs and cause:',
            options: ['Inflammation and narrowed airways', 'Stronger bones', 'Better eyesight', 'Faster hair growth'],
            correctIndex: 0,
            hint: 'The immune system reacts.',
            explanation: 'Deep-lodged particles trigger inflammation, swelling and mucus.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Air quality affects breathing through physical, chemical, and biological processes', 'Only physics matters', 'Air is always clean', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the whole process of breathing.',
            explanation: 'Breathing is affected by air movement, chemical reactions, and biological health.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'PM2.5 particles stay airborne for days because:',
            options: ['They are so light that air resistance beats gravity', 'They are magnetic', 'They are filled with helium', 'Wind never stops'],
            correctIndex: 0,
            hint: 'Compare with a grain of sand.',
            explanation: 'Very small particles settle extremely slowly against air resistance.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Ground-level ozone is called a secondary pollutant because it is:',
            options: ['Formed in the air by reactions, not emitted directly', 'Released straight from exhaust pipes', 'Made in factories only', 'Not really a pollutant'],
            correctIndex: 0,
            hint: 'Sunlight drives its formation.',
            explanation: 'It forms when sunlight drives reactions between emitted pollutants.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Smog tends to be worst on days that are:',
            options: ['Hot and sunny', 'Cold and dark', 'Rainy and windy', 'Snowy'],
            correctIndex: 0,
            hint: 'The reactions need energy.',
            explanation: 'Sunlight and heat accelerate the reactions that create smog.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A city with high smog levels might see:',
            options: ['More breathing problems and health risks', 'Cleaner air', 'No effect', 'More rain'],
            correctIndex: 0,
            hint: 'Think about what happens in polluted cities.',
            explanation: 'High smog increases respiratory problems and health risks.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A tall smokestack does not solve pollution because:',
            options: ['Fine particles travel far and drift back to ground level', 'Height makes particles heavier', 'Smoke disappears above a certain height', 'Tall stacks emit more'],
            correctIndex: 0,
            hint: 'Think about how far PM2.5 travels.',
            explanation: 'Dispersal spreads pollution regionally rather than removing it.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Exercising outdoors on a high-pollution day is risky because you:',
            options: ['Breathe far more air, and through the mouth, increasing the dose', 'Breathe less air', 'Stop needing oxygen', 'Filter air better when active'],
            correctIndex: 0,
            hint: 'Dose depends on how much you breathe.',
            explanation: 'Higher ventilation and mouth breathing bypass nasal filtering and raise intake.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Air quality connects all three sciences because pollution involves:',
            options: ['How particles move, how they form chemically, and how the body reacts', 'Only chemistry', 'Only biology', 'Only weather'],
            correctIndex: 0,
            hint: 'Three lessons, one problem.',
            explanation: 'Physical transport, chemical formation and biological response together determine harm.'
        }
    ]
};