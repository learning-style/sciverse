import { AssessmentData } from '../../types';

export const bigIdea16Assessment: AssessmentData = {
    bigIdea: 16,
    title: 'How Do Magnets Help Us Navigate and Build Machines?',
    subtitle: 'Fields, Materials, and Migration Cues',
    icon: '🧭',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A compass needle points because it aligns with:',
            options: ['Wind direction', 'Earth magnetic field', 'Air pressure only', 'Moon phase'],
            correctIndex: 1,
            hint: 'Think magnetic field lines.',
            explanation: 'Compass needles rotate to align with local magnetic field direction.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Which material is usually strongly ferromagnetic?',
            options: ['Iron', 'Copper', 'Aluminum', 'Glass'],
            correctIndex: 0,
            hint: 'Common magnet + nail demo.',
            explanation: 'Iron is strongly ferromagnetic compared with copper or aluminum.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Animal migration is best described as using:',
            options: ['One cue only', 'Multiple cues including magnetic information', 'Random motion', 'No environmental information'],
            correctIndex: 1,
            hint: 'Robust systems often combine signals.',
            explanation: 'Many species combine celestial, landmark, olfactory, and magnetic cues.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A nearby bar magnet changes a compass reading because:',
            options: ['Compass breaks permanently', 'Local field direction changes', 'Earth field turns off', 'Needle loses magnetism instantly'],
            correctIndex: 1,
            hint: 'Compasses read local field vectors.',
            explanation: 'A local magnet adds/redirects the field near the needle.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What is the best systems-level statement?',
            options: ['Navigation in nature and tools both depend on measurable physical fields', 'Magnetism only matters in compasses', 'Biology ignores physics', 'Material chemistry never affects devices'],
            correctIndex: 0,
            hint: 'Connect physics, chemistry, and biology.',
            explanation: 'Magnetic field physics, material response, and biological sensing form one connected concept.'
        }
    ]
};
