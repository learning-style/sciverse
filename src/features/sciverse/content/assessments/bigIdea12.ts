import { AssessmentData } from '../../types';

/**
 * Big Idea 12 Assessment: "How Do Hidden Rules Shape Big Patterns?"
 * Covers P12 (Gravity & Orbits), C12 (Periodic Table), B12 (Natural Selection)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea12Assessment: AssessmentData = {
    bigIdea: 12,
    title: 'How Do Hidden Rules Shape Big Patterns?',
    subtitle: 'Orbits, Periodic Patterns & Natural Selection',
    icon: '🎯',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Objects in orbit are best described as:',
            options: ['Not affected by gravity', 'Falling around a planet while moving sideways fast', 'Being pushed continuously upward', 'Completely stationary'],
            correctIndex: 1,
            hint: 'Free fall plus sideways speed.',
            explanation: 'Orbit is sustained free fall with enough tangential speed.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The periodic table is primarily ordered by:',
            options: ['Atomic mass only', 'Color of elements', 'Atomic number (protons)', 'Date discovered'],
            correctIndex: 2,
            hint: 'Count protons.',
            explanation: 'Modern periodic arrangement is by atomic number.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Natural selection acts on:',
            options: ['Traits already present in populations', 'Traits organisms choose instantly', 'Only traits from exercise', 'No inherited traits'],
            correctIndex: 0,
            hint: 'Variation first, selection second.',
            explanation: 'Selection filters existing inherited variation.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Natural selection means that:',
            options: ['Living things better suited to their surroundings tend to survive and have young', 'Animals choose which traits to have', 'All animals change at the same rate', 'Traits never pass to offspring'],
            correctIndex: 0,
            hint: 'Think about B12 and which individuals survive.',
            explanation: 'Variation plus environmental pressure means better-suited individuals survive and pass on their traits.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'At a given orbital radius around the same star, a heavier satellite will:',
            options: ['Orbit much faster', 'Orbit much slower', 'Orbit at about the same speed', 'Not orbit'],
            correctIndex: 2,
            hint: 'Mass cancels in orbital speed expression.',
            explanation: 'At equal radius around same central mass, orbital speed is nearly the same.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Elements in the same group often have similar chemistry because they share:',
            options: ['Atomic mass', 'Number of neutrons', 'Outer-shell electron patterns', 'Physical state'],
            correctIndex: 2,
            hint: 'Valence electrons drive bonding behavior.',
            explanation: 'Group similarity comes from valence electron configuration.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Peppered moth color shifts during industrialization are evidence of:',
            options: ['Instant individual adaptation by choice', 'Population-level gene frequency changes', 'No role of environment', 'Random drift only'],
            correctIndex: 1,
            hint: 'Population percentages change across generations.',
            explanation: 'Environmental pressure changed survival and thus gene frequencies.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Gravity, the periodic table, and natural selection are alike because each is:',
            options: ['A hidden rule that produces predictable large-scale patterns', 'A rule invented by scientists', 'Only true in space', 'Impossible to test'],
            correctIndex: 0,
            hint: 'Look at the Big Idea question itself.',
            explanation: 'Each is an unseen rule whose repeated action produces the big patterns we can observe.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Best unifying idea across this Big Idea is:',
            options: ['Systems have no patterns', 'Rules and constraints shape outcomes over time', 'Only randomness matters', 'Mass determines everything'],
            correctIndex: 1,
            hint: 'Think orbits, periodic trends, and evolution together.',
            explanation: 'Physical and biological systems both evolve under lawful constraints.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Increasing orbital speed too much at fixed radius tends to cause:',
            options: ['Faster stable circle guaranteed', 'Escape to a higher-energy trajectory', 'Immediate stop', 'Mass loss'],
            correctIndex: 1,
            hint: 'Compare to escape behavior.',
            explanation: 'Too much speed can move object into escape/elongated trajectories.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Carbon is central to organic chemistry largely because it can:',
            options: ['Never bond', 'Form up to four covalent bonds', 'Only form ionic bonds', 'Exist only as gas'],
            correctIndex: 1,
            hint: 'Valence = 4.',
            explanation: 'Carbon’s four bonding sites enable diverse complex molecules.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'An astronaut floats inside a space station. Why?',
            options: ['They are in free fall around Earth, not beyond gravity', 'There is no gravity that far up', 'The station blocks gravity', 'They are too light to fall'],
            correctIndex: 0,
            hint: 'Orbiting is falling sideways fast enough to miss the ground.',
            explanation: 'Gravity is nearly as strong there; weightlessness is free fall, not the absence of gravity.'
        }
    ]
};
