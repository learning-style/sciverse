import { AssessmentData } from '../../types';

export const bigIdea23Assessment: AssessmentData = {
    bigIdea: 23,
    title: 'How Do Materials Break and Recover?',
    subtitle: 'Fatigue, Corrosion, and Tissue Repair',
    icon: '🛠️',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Fatigue failure can occur when:',
            options: ['Only one huge load happens', 'Many repeated smaller loads accumulate damage', 'There is no stress at all', 'Temperature is exactly constant'],
            correctIndex: 1,
            hint: 'Damage accumulation.',
            explanation: 'Repeated cyclic stress grows microcracks over time.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Corrosion is best described as:',
            options: ['A purely mechanical crack', 'An electrochemical oxidation process', 'A magnetic effect', 'A biological mutation'],
            correctIndex: 1,
            hint: 'Redox chemistry.',
            explanation: 'Corrosion involves oxidation/reduction reactions with environment.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Healthy wound healing usually requires:',
            options: ['No inflammation ever', 'Ordered phases of clotting, inflammation, and rebuilding', 'Only one cell type', 'No oxygen supply'],
            correctIndex: 1,
            hint: 'Staged process.',
            explanation: 'Repair proceeds through regulated stages and cell coordination.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A unifying idea across this Big Idea is:',
            options: ['Failure is always instant', 'Environment and local conditions strongly control damage and recovery', 'Only age matters', 'Repair is random'],
            correctIndex: 1,
            hint: 'Local chemistry/mechanics/biology.',
            explanation: 'Material behavior depends on local stresses, chemistry, and biological state.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'The most reliable prevention strategy is usually:',
            options: ['Wait for failure', 'Combine design margin, environment control, and maintenance/monitoring', 'Increase load always', 'Remove all protective layers'],
            correctIndex: 1,
            hint: 'Multi-layer risk reduction.',
            explanation: 'Systems last longer when prevention combines design, chemistry protection, and monitoring.'
        }
    ]
};
