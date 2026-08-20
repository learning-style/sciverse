import { AssessmentData } from '../../types';

/**
 * Big Idea 30 Assessment: "How Do Medicines Reach the Right Place?"
 * Covers P30 (Diffusion Transport), C30 (Pill Power), B30 (Lock and Key)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea30Assessment: AssessmentData = {
    bigIdea: 30,
    title: 'How Do Medicines Move and Work?',
    subtitle: 'Transport, Chemical Action, and Biological Effects',
    icon: '💊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Medicines travel through the body mainly by:',
            options: ['Blood flow', 'Sound waves', 'Gravity', 'Sunlight'],
            correctIndex: 0,
            hint: 'Think about how medicine gets from your mouth to your cells.',
            explanation: 'Blood carries medicines to different parts of the body.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A painkiller works by:',
            options: ['Blocking chemical signals that cause pain', 'Making you run faster', 'Changing your hair color', 'Adding water to your body'],
            correctIndex: 0,
            hint: 'Think about what painkillers do in the body.',
            explanation: 'Painkillers block or reduce the chemicals that signal pain.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Antibiotics help fight infection by:',
            options: ['Killing or stopping the growth of bacteria', 'Making you taller', 'Changing your eye color', 'Making you sleep'],
            correctIndex: 0,
            hint: 'Think about what antibiotics do to germs.',
            explanation: 'Antibiotics target bacteria, not viruses, and help cure infections.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A medicine affects certain cells because those cells have matching:',
            options: ['Receptors', 'Colours', 'Bones', 'Muscles'],
            correctIndex: 0,
            hint: 'Think lock and key.',
            explanation: 'Receptors bind specific drug molecules, determining which cells respond.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement links all three lessons?',
            options: ['Medicines must be transported, act chemically, and affect biological systems', 'Only blood matters', 'Medicines work instantly everywhere', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the journey and action of medicine.',
            explanation: 'Medicines are transported, act chemically, and have biological effects.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Diffusion moves molecules from areas of:',
            options: ['High concentration to low concentration', 'Low to high concentration', 'Cold to hot only', 'Dark to light'],
            correctIndex: 0,
            hint: 'Molecules spread out.',
            explanation: 'Random motion produces net movement down a concentration gradient.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A thicker coating on a tablet generally makes the medicine release:',
            options: ['More slowly', 'Instantly', 'Never', 'Twice as fast'],
            correctIndex: 0,
            hint: 'The coating must dissolve first.',
            explanation: 'A thicker barrier takes longer to dissolve, delaying release.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A pH-sensitive coating is used so a tablet dissolves:',
            options: ['In a specific part of the digestive system', 'Only outside the body', 'At a chosen time of year', 'In the mouth always'],
            correctIndex: 0,
            hint: 'Different regions have different pH.',
            explanation: 'Coatings tuned to pH release the drug where conditions match.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A medicine that is broken down too quickly in the body might:',
            options: ['Not reach its target or work effectively', 'Work better', 'Make you taller', 'Change your hair color'],
            correctIndex: 0,
            hint: 'Think about what happens if a drug is destroyed before it acts.',
            explanation: 'If a medicine is broken down too fast, it may not reach the cells that need it.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Overall delivery time is set by:',
            options: ['The slowest step in the transport chain', 'The fastest step', 'The colour of the tablet', 'The size of the glass of water'],
            correctIndex: 0,
            hint: 'A chain is limited by its slowest link.',
            explanation: 'The rate-limiting step governs total delivery time.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'The therapeutic window is the range where a medicine is:',
            options: ['Effective but not harmful', 'Always harmful', 'Completely inactive', 'Only a placebo'],
            correctIndex: 0,
            hint: 'Too little does nothing; too much harms.',
            explanation: 'Dosing aims to stay above the effective level and below the toxic one.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does a controlled-release tablet often work better than an immediate one?',
            options: ['It holds the dose inside the safe effective range for longer', 'It contains more medicine', 'It dissolves instantly', 'It avoids the bloodstream'],
            correctIndex: 0,
            hint: 'Think about staying in the window.',
            explanation: 'Steady release avoids peaks and troughs outside the therapeutic window.'
        }
    ]
};