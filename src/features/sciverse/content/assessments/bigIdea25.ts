import { AssessmentData } from '../../types';

export const bigIdea25Assessment: AssessmentData = {
    bigIdea: 25,
    title: 'How Can Tiny Changes Cause Big Effects?',
    subtitle: 'Chaos, Chain Reactions, and Mutation Cascades',
    icon: '🧨',
    questions: [
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
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which idea links all three lessons?',
            options: ['Small perturbations never matter', 'Amplification mechanisms can scale local changes to system outcomes', 'Only biology amplifies change', 'Only randomness matters'],
            correctIndex: 1,
            hint: 'Amplification pathways.',
            explanation: 'Across domains, system structure can magnify small inputs.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'To reduce cascade risk, the best approach is often:',
            options: ['Ignore early signals', 'Add damping, checkpoints, and negative feedback controls', 'Increase sensitivity everywhere', 'Remove all constraints'],
            correctIndex: 1,
            hint: 'Stability engineering.',
            explanation: 'Damping and feedback can interrupt amplification before runaway behavior.'
        }
    ]
};
