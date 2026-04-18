import { AssessmentData } from '../../types';

export const bigIdea20Assessment: AssessmentData = {
    bigIdea: 20,
    title: 'How Do Lenses Change What We See?',
    subtitle: 'Refraction, Optical Materials, and Eye Focusing',
    icon: '🔍',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Lenses change image formation mainly by:',
            options: ['Creating new light', 'Bending light paths by refraction', 'Stopping all reflection', 'Changing object size physically'],
            correctIndex: 1,
            hint: 'Refraction redirects rays.',
            explanation: 'Lens geometry and refractive properties bend rays to create images.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Optical material choice matters because:',
            options: ['All transparent materials have same index', 'Material chemistry affects refractive index and dispersion', 'Only color matters', 'Thickness never matters'],
            correctIndex: 1,
            hint: 'Composition changes optical constants.',
            explanation: 'Different formulations produce different optical performance.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Eye accommodation works by:',
            options: ['Moving the retina back and forth', 'Changing lens shape with ciliary muscles', 'Changing pupil color only', 'Changing cornea mass'],
            correctIndex: 1,
            hint: 'Focus adjustment is active.',
            explanation: 'Ciliary muscles alter lens curvature to focus at different distances.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Aging often reduces near focus because:',
            options: ['Lens flexibility declines', 'Light speed changes', 'Retina disappears', 'Magnetism weakens'],
            correctIndex: 0,
            hint: 'Accommodation capacity changes.',
            explanation: 'Reduced lens flexibility lowers accommodation for near targets.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Best integrated statement is:',
            options: ['Vision quality depends only on biology', 'Image formation depends on ray physics, material chemistry, and eye control', 'Chemistry and physics are unrelated to vision', 'Focus is random'],
            correctIndex: 1,
            hint: 'Three-discipline synthesis.',
            explanation: 'Optical performance emerges from physical optics, material properties, and biological control.'
        }
    ]
};
