import { AssessmentData } from '../../types';

/**
 * Big Idea 47 Assessment: "How Do Species Share Habitats?"
 * Covers P47 (Room to Live), C47 (Smell Messages), B47 (Sharing Without Fighting)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea47Assessment: AssessmentData = {
    bigIdea: 47,
    title: 'How Do Species Share Habitats?',
    subtitle: 'Territories, Scent Marks & Niches',
    icon: '🦌',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A territory is:',
            options: ['The patch one animal needs to find enough food', 'A kind of nest', 'A group of animals', 'A type of plant'],
            correctIndex: 0,
            hint: 'Think about the robin in the garden.',
            explanation: 'A territory is the area one animal needs to feed itself.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A scent mark is:',
            options: ['A smell an animal leaves on purpose', 'A footprint in mud', 'A scratch on a tree', 'A sound'],
            correctIndex: 0,
            hint: 'It keeps working after the animal leaves.',
            explanation: 'Animals leave smells that carry a message.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A niche is:',
            options: ['The particular way a species makes its living', 'A hole in a tree', 'A kind of nest', 'A group of species'],
            correctIndex: 0,
            hint: 'What, where and when it eats.',
            explanation: 'A niche is the job a species does in its habitat.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Species share a habitat mainly by:',
            options: ['Doing different jobs from each other', 'Taking turns each week', 'Fighting until one wins', 'Sharing all their food'],
            correctIndex: 0,
            hint: 'Share the place, not the job.',
            explanation: 'Different niches let species coexist.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why can a garden hold hundreds of woodlice but only a few robins?',
            options: ['A woodlouse needs a much smaller territory', 'Woodlice do not eat', 'Robins refuse to share gardens', 'Woodlice are invisible'],
            correctIndex: 0,
            hint: 'How much space does each need?',
            explanation: 'Territory size determines how many individuals fit.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why is it useful that a scent mark fades?',
            options: ['The strength tells you how recently the owner was there', 'It saves the animal energy', 'It stops the smell spreading', 'It makes the smell stronger'],
            correctIndex: 0,
            hint: 'A permanent mark would be useless.',
            explanation: 'Fading turns the smell into a clock.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Five bird species can share one oak tree because they:',
            options: ['Feed in different parts of the tree', 'Take turns by the hour', 'Eat only leaves', 'Are all the same species really'],
            correctIndex: 0,
            hint: 'Different parts, different insects.',
            explanation: 'Splitting the tree into niches lets all five live there.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Hawks and owls hunt the same mice in the same fields. How do they avoid competing?',
            options: ['Hawks hunt by day and owls by night', 'They share the mice evenly', 'Owls eat only plants', 'They fight every evening'],
            correctIndex: 0,
            hint: 'Time can split a niche too.',
            explanation: 'Separating in time keeps their niches apart.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A wood is halved by a road. Beetles are fine but badgers vanish. Why?',
            options: ['A badger territory no longer fits, while a beetle territory still does', 'Badgers are more delicate', 'Beetles can fly away', 'Roads scare badgers only'],
            correctIndex: 0,
            hint: 'Whose territory stops fitting?',
            explanation: 'Large-territory species lose out first when habitat shrinks.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A fox stays in its den for two weeks. What happens to its territory?',
            options: ['Its marks fade and other foxes start moving in', 'It stays hers permanently', 'The marks get stronger', 'Other foxes leave gifts'],
            correctIndex: 0,
            hint: 'The message needs topping up.',
            explanation: 'Territory holds only as long as the marks stay fresh.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two species arrive with exactly the same niche. What usually happens?',
            options: ['One gains a small edge and slowly pushes the other out', 'They share it evenly forever', 'Both die out', 'They merge into one species'],
            correctIndex: 0,
            hint: 'A tiny advantage compounds.',
            explanation: 'Identical niches cannot be shared long-term.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do territories, scent marks and niches all help animals avoid?',
            options: ['Fighting over the same resources', 'Being seen by people', 'Getting cold in winter', 'Having to migrate'],
            correctIndex: 0,
            hint: 'All three keep animals apart.',
            explanation: 'Each mechanism reduces direct competition.'
        }
    ]
};
