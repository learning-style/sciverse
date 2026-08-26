import { AssessmentData } from '../../types';

/**
 * Big Idea 44 Assessment: "How Do Everyday Materials Get Their Properties?"
 * Covers P44 (Bend, Scratch, Break), C44 (Same Atoms, Different Material), B44 (Nature's Layered Armour)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea44Assessment: AssessmentData = {
    bigIdea: 44,
    title: 'How Do Everyday Materials Get Their Properties?',
    subtitle: 'Hardness, Arrangement & Layered Structure',
    icon: '🧱',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Which property means resisting scratches?',
            options: ['Hardness', 'Toughness', 'Elasticity', 'Weight'],
            correctIndex: 0,
            hint: 'Think about what a coin does to plastic.',
            explanation: 'Hardness is resistance to scratching and denting.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Pencil lead and diamond are both made of:',
            options: ['Carbon', 'Iron', 'Salt', 'Plastic'],
            correctIndex: 0,
            hint: 'The same element, arranged differently.',
            explanation: 'Both are pure carbon; only the arrangement differs.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A seashell is mostly made of:',
            options: ['The same mineral as chalk', 'Pure diamond', 'Plastic', 'Metal'],
            correctIndex: 0,
            hint: 'No secret ingredient.',
            explanation: 'A shell is about 95% the same chalky mineral, arranged in layers.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A material property depends mostly on:',
            options: ['How it is put together', 'Only what it is made of', 'Its colour', 'Its price'],
            correctIndex: 0,
            hint: 'Structure over ingredients.',
            explanation: 'Arrangement determines properties far more than raw ingredients do.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Glass shatters while plastic bends because glass is:',
            options: ['Hard but brittle', 'Soft but tough', 'Both hard and tough', 'Neither hard nor tough'],
            correctIndex: 0,
            hint: 'Two separate properties.',
            explanation: 'Glass resists scratching but cannot stop a crack spreading.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Carbon in flat sheets makes a soft material because the sheets:',
            options: ['Slide past each other easily', 'Are made of weaker atoms', 'Contain air gaps', 'Melt at room temperature'],
            correctIndex: 0,
            hint: 'That is your pencil mark.',
            explanation: 'Weak joins between sheets let whole layers slide off.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Soft glue layers inside a shell make it tougher because they:',
            options: ['Stop cracks spreading by absorbing energy', 'Make the shell heavier', 'Add extra minerals', 'Make the shell shinier'],
            correctIndex: 0,
            hint: 'Think about what a crack meets.',
            explanation: 'Each soft layer halts the crack and absorbs some of its energy.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Making a phone screen harder usually makes it:',
            options: ['More likely to shatter when dropped', 'Tougher as well', 'Lighter', 'Cheaper'],
            correctIndex: 0,
            hint: 'Raising one property lowers the other.',
            explanation: 'Hardness and toughness usually trade off against each other.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Why is a diamond, the hardest natural material, still able to shatter?',
            options: ['Hardness does not prevent a crack spreading', 'It is not really that hard', 'It melts on impact', 'It contains air bubbles'],
            correctIndex: 0,
            hint: 'Hard is not tough.',
            explanation: 'Nothing can slide in a rigid network, so a crack has nowhere to go but through.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'To turn ordinary carbon into diamond, a laboratory must change:',
            options: ['How the atoms are joined, using pressure and heat', 'The type of carbon atoms used', 'The colour of the carbon', 'The weight of each atom'],
            correctIndex: 0,
            hint: 'The atoms are already correct.',
            explanation: 'Processing forces the atoms from sheets into a rigid 3D network.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A solid block of shell mineral with no layers would be:',
            options: ['Just as hard but far easier to shatter', 'Tougher than the shell', 'Identical to the shell', 'Softer than chalk'],
            correctIndex: 0,
            hint: 'What stops the crack?',
            explanation: 'Without soft layers, a crack runs straight through in one clean path.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do safety glass, plywood and a seashell have in common?',
            options: ['All are layered to stop cracks spreading', 'All are made of carbon', 'All are completely rigid', 'All are single use'],
            correctIndex: 0,
            hint: 'Structure, not ingredients.',
            explanation: 'Layering hard and soft together delivers hardness and toughness at once.'
        }
    ]
};
