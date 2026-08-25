import { AssessmentData } from '../../types';

/**
 * Big Idea 41 Assessment: "How Do Patterns and Probability Guide Decisions?"
 * Covers P41 (Rolling the Dice), C41 (Lucky Collisions), B41 (Chance and Inheritance)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea41Assessment: AssessmentData = {
    bigIdea: 41,
    title: 'How Do Patterns and Probability Guide Decisions?',
    subtitle: 'Randomness, Collisions & Inheritance',
    icon: '🎲',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'If you roll a fair dice once, can you predict the result?',
            options: ['No, a single roll is unpredictable', 'Yes, it is always a six', 'Yes, the numbers alternate', 'Only on Tuesdays'],
            correctIndex: 0,
            hint: 'Think about one roll versus many.',
            explanation: 'A single random event cannot be predicted; only the long-run pattern can.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Most collisions between molecules result in:',
            options: ['Nothing at all - they bounce apart', 'An instant reaction', 'An explosion', 'A colour change'],
            correctIndex: 0,
            hint: 'Reactions need luck as well as contact.',
            explanation: 'Only a tiny share of collisions have enough energy and the right angle.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'How many copies of each gene do you carry?',
            options: ['Two, one from each parent', 'One', 'Four', 'None'],
            correctIndex: 0,
            hint: 'One comes from each parent.',
            explanation: 'Each parent contributes one copy, so you carry two.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Probability tells you:',
            options: ['What to expect over many tries', 'Exactly what happens next', 'Nothing useful', 'Only what happened before'],
            correctIndex: 0,
            hint: 'Think long run, not next event.',
            explanation: 'Probability describes long-run expectation, not individual outcomes.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Rolling a dice 600 times gives roughly 100 of each face because:',
            options: ['Unusual runs get outnumbered by ordinary ones', 'The dice remembers past rolls', 'The dice becomes fairer over time', 'Someone adjusts the dice'],
            correctIndex: 0,
            hint: 'Dice have no memory.',
            explanation: 'Odd runs are not cancelled out; they become a small part of a much larger total.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Warming a reaction speeds it up mainly because:',
            options: ['A larger share of collisions has enough energy to react', 'More molecules are created', 'The molecules get bigger', 'Collisions stop bouncing'],
            correctIndex: 0,
            hint: 'Temperature is a probability dial.',
            explanation: 'Heat raises the fraction of collisions that clear the energy requirement.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A recessive trait shows only when a child inherits:',
            options: ['Two recessive copies', 'One recessive copy', 'Two dominant copies', 'No copies at all'],
            correctIndex: 0,
            hint: 'Dominant hides recessive.',
            explanation: 'A recessive trait needs both copies to be recessive before it appears.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Why are medicines tested on thousands of people rather than ten?',
            options: ['Small samples wobble too much to trust', 'Large studies are cheaper', 'Ten people cannot swallow tablets', 'It is only a legal tradition'],
            correctIndex: 0,
            hint: 'Think about the coin-flip checkpoint.',
            explanation: 'Only large samples let a real effect rise above random variation.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'You flip a coin 10 times and get 7 heads. This suggests:',
            options: ['Very little - that happens often by chance', 'The coin is definitely unfair', 'The coin is definitely fair', 'Heads is now overdue'],
            correctIndex: 0,
            hint: 'How often does 7 in 10 happen by luck?',
            explanation: 'Seven heads in ten is common with a fair coin, so it is weak evidence.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why does milk still spoil in a fridge, just more slowly?',
            options: ['Cooling lowers the share of successful collisions but does not stop them', 'Fridges add preservatives', 'Cold reverses the reactions', 'Milk is unaffected by cold'],
            correctIndex: 0,
            hint: 'Reactions become rare, not impossible.',
            explanation: 'Lower temperature reduces the fraction of energetic collisions without eliminating them.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two carrier parents already have three brown-eyed children. The chance the next child is blue-eyed is:',
            options: ['Still about 1 in 4', 'Much higher, because blue is overdue', 'Zero', 'Exactly 1 in 2'],
            correctIndex: 0,
            hint: 'Genes have no memory.',
            explanation: 'Each child is an independent event, so the probability is unchanged.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Dice rolls, molecular collisions and inheritance belong together because each is:',
            options: ['Unpredictable individually but reliable in large numbers', 'Completely predictable', 'Random with no pattern at all', 'Controlled by memory of the past'],
            correctIndex: 0,
            hint: 'Read the Big Idea question.',
            explanation: 'All three show randomness at small scale producing dependable patterns at large scale.'
        }
    ]
};
