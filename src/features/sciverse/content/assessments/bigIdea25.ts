import { AssessmentData } from '../../types';

/**
 * Big Idea 25 Assessment: "How Can Tiny Changes Cause Big Effects?"
 * Covers P25 (Chaos in Motion), C25 (Chain Reactions), B25 (Mutation Cascades)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea25Assessment: AssessmentData = {
    bigIdea: 25,
    title: 'How Can Tiny Changes Cause Big Effects?',
    subtitle: 'Chaos, Chain Reactions, and Mutation Cascades',
    icon: '🧨',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Sensitive dependence on initial conditions means:',
            options: ['Tiny differences can grow dramatically', 'All trajectories stay identical', 'Equations are wrong', 'Motion stops quickly'],
            correctIndex: 0,
            hint: 'Chaos concept.',
            explanation: 'Nonlinear dynamics can amplify small initial uncertainties.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Chain reactions amplify when:',
            options: ['Propagation outpaces termination', 'Termination dominates completely', 'No intermediates form', 'Reactants vanish instantly'],
            correctIndex: 0,
            hint: 'Propagation vs termination balance.',
            explanation: 'Amplification requires sustained generation of reactive intermediates.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A beneficial mutation can spread when:',
            options: ['Selection favors carriers over generations', 'It is never inherited', 'Environment is irrelevant', 'DNA is not replicated'],
            correctIndex: 0,
            hint: 'Selection + inheritance.',
            explanation: 'Inherited beneficial variants can increase in frequency.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A mutation is a change in:',
            options: ['An organism\'s DNA', 'The weather', 'The soil', 'A rock'],
            correctIndex: 0,
            hint: 'Think about the genetic code.',
            explanation: 'A mutation alters the DNA sequence, which can change a trait.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which idea links all three lessons?',
            options: ['Small perturbations never matter', 'Amplification mechanisms can scale local changes to system outcomes', 'Only biology amplifies change', 'Only randomness matters'],
            correctIndex: 1,
            hint: 'Amplification pathways.',
            explanation: 'Across domains, system structure can magnify small inputs.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Chaos means a system is:',
            options: ['Very sensitive to its starting conditions', 'Completely random', 'Never changing', 'Impossible to model'],
            correctIndex: 0,
            hint: 'Chaos is not the same as randomness.',
            explanation: 'Chaotic systems follow rules but amplify tiny initial differences.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'In a chain reaction, each step:',
            options: ['Triggers further steps, so the effect grows', 'Stops the reaction', 'Removes energy', 'Repeats identically forever'],
            correctIndex: 0,
            hint: 'Think about amplification.',
            explanation: 'Products of one step initiate more steps, multiplying the effect.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A single DNA change can have a large effect when it:',
            options: ['Alters a protein that controls many other processes', 'Happens in a cell that dies', 'Occurs in water', 'Is copied exactly'],
            correctIndex: 0,
            hint: 'Some genes control many downstream steps.',
            explanation: 'Changes to regulatory proteins cascade through many processes.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'To reduce cascade risk, the best approach is often:',
            options: ['Ignore early signals', 'Add damping, checkpoints, and negative feedback controls', 'Increase sensitivity everywhere', 'Remove all constraints'],
            correctIndex: 1,
            hint: 'Stability engineering.',
            explanation: 'Damping and feedback can interrupt amplification before runaway behavior.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Why is long-range weather forecasting so difficult?',
            options: ['Tiny measurement differences grow into large differences over time', 'Weather follows no rules', 'Satellites cannot see clouds', 'Air has no temperature'],
            correctIndex: 0,
            hint: 'This is the butterfly effect.',
            explanation: 'Sensitive dependence means small initial errors amplify beyond usefulness.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'An inhibitor slows a chain reaction by:',
            options: ['Interrupting steps so the chain cannot keep growing', 'Adding more fuel', 'Raising the temperature', 'Creating new chains'],
            correctIndex: 0,
            hint: 'Break the chain to stop the growth.',
            explanation: 'Inhibitors consume or block the species that propagate the chain.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Chaos, chain reactions and mutations are grouped together because in each:',
            options: ['A small change is amplified into a large outcome', 'Nothing ever changes', 'Change is always harmful', 'The effect is always immediate'],
            correctIndex: 0,
            hint: 'Read the Big Idea question.',
            explanation: 'All three amplify a small initial difference into a large consequence.'
        }
    ]
};
