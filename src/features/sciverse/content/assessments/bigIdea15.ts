import { AssessmentData } from '../../types';

/**
 * Big Idea 15 Assessment: "How Do Systems Find Balance?"
 * Covers P15 (Pendulum), C15 (Chemical Equilibrium), B15 (Predator-Prey)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea15Assessment: AssessmentData = {
    bigIdea: 15,
    title: 'How Do Systems Find Balance?',
    subtitle: 'Pendulum, Equilibrium & Predator-Prey',
    icon: '🎯',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'For small angles, pendulum period depends mainly on:',
            options: ['Mass of bob only', 'Length and gravity', 'Color of bob', 'Air temperature only'],
            correctIndex: 1,
            hint: 'T = 2π√(L/g).',
            explanation: 'Pendulum period is set primarily by length and local gravity, not mass.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'At chemical equilibrium, concentrations are:',
            options: ['Always equal', 'Constant over time while forward/reverse continue', 'Always zero', 'Changing chaotically'],
            correctIndex: 1,
            hint: 'Dynamic equilibrium.',
            explanation: 'Equilibrium is dynamic: rates match, so concentrations stay constant.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Removing top predators from an ecosystem often causes:',
            options: ['Guaranteed stability', 'No effect', 'Prey overshoot and trophic imbalance', 'Only plant growth increase forever'],
            correctIndex: 2,
            hint: 'Predator control regulates prey populations.',
            explanation: 'Predator removal can trigger boom-bust prey dynamics and ecosystem stress.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In a predator-prey cycle, when prey numbers rise, predator numbers usually:',
            options: ['Rise afterwards, because there is more food', 'Fall immediately', 'Stay exactly the same', 'Disappear'],
            correctIndex: 0,
            hint: 'Think about the cycles you watched in B15.',
            explanation: 'More prey supports more predators, whose rise then pushes prey numbers back down.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Resonance occurs when driving frequency is:',
            options: ['Far from natural frequency', 'Near natural frequency', 'Always zero', 'Random each cycle'],
            correctIndex: 1,
            hint: 'Timing pushes with natural rhythm.',
            explanation: 'Near-match between driving and natural frequencies yields large amplitude response.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'By Le Chatelier principle, adding reactant to an equilibrium system tends to shift:',
            options: ['Toward more reactant', 'Toward more product', 'Nowhere', 'To pure solvent'],
            correctIndex: 1,
            hint: 'System counters disturbance.',
            explanation: 'Adding reactant usually drives reaction toward products to offset the change.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Predator-prey population peaks often show a lag because:',
            options: ['Predators reproduce in response to earlier prey abundance', 'Predators do not depend on prey', 'Prey do not reproduce', 'Lag is measurement error only'],
            correctIndex: 0,
            hint: 'Response takes time across generations.',
            explanation: 'Predator populations typically respond after prey rises, creating phase lag.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A pendulum, a reversible reaction, and a predator-prey cycle all show:',
            options: ['Systems swinging around a balance point rather than sitting still', 'Systems that never change', 'One-way change only', 'Perfectly straight-line growth'],
            correctIndex: 0,
            hint: 'Look at the Big Idea 15 question.',
            explanation: 'Each oscillates around equilibrium, with feedback pulling it back toward balance.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which statement best captures balance across these systems?',
            options: ['Balance means no motion or no change', 'Balance can be dynamic with continuous flows and opposing rates', 'Balanced systems cannot be disturbed', 'Balance requires equal quantities always'],
            correctIndex: 1,
            hint: 'Think oscillations and matched rates.',
            explanation: 'Many stable systems are dynamic, not static.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Increasing damping in an oscillator generally:',
            options: ['Increases amplitude forever', 'Reduces oscillation amplitude over time', 'Eliminates gravity', 'Increases natural frequency strongly'],
            correctIndex: 1,
            hint: 'Damping dissipates energy.',
            explanation: 'Damping removes energy from oscillation, shrinking amplitude.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Equilibrium does not require equal amounts of reactants/products because it depends on:',
            options: ['Equal concentration rule', 'Relative forward and reverse rates', 'Color matching', 'Container shape only'],
            correctIndex: 1,
            hint: 'Rate balance, not amount equality.',
            explanation: 'Equilibrium condition is equal rates, not equal concentrations.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why is chemical equilibrium described as dynamic rather than stopped?',
            options: ['Both forward and reverse reactions keep running at equal rates', 'The reaction has finished', 'Nothing is moving', 'The reactants are used up'],
            correctIndex: 0,
            hint: 'Think about what is happening at the molecular level.',
            explanation: 'Equilibrium means the two opposing rates match, so amounts hold steady while reactions continue.'
        }
    ]
};
