import { AssessmentData } from '../../types';

/**
 * Big Idea 20 Assessment: "How Do Lenses Change What We See?"
 * Covers P20 (Refraction & Focal Length), C20 (Optical Materials), B20 (Eye Focusing)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea20Assessment: AssessmentData = {
    bigIdea: 20,
    title: 'How Do Lenses Change What We See?',
    subtitle: 'Refraction, Optical Materials, and Eye Focusing',
    icon: '🔍',
    questions: [
        // ── EASY ──
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
            difficulty: 'easy',
            discipline: 'biology',
            question: 'To focus on something close, the lens in your eye becomes:',
            options: ['Rounder and more curved', 'Completely flat', 'Larger and heavier', 'Darker in colour'],
            correctIndex: 0,
            hint: 'Muscles squeeze the lens.',
            explanation: 'Ciliary muscles round the lens, shortening the focal length for near objects.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Aging often reduces near focus because:',
            options: ['Lens flexibility declines', 'Light speed changes', 'Retina disappears', 'Magnetism weakens'],
            correctIndex: 0,
            hint: 'Accommodation capacity changes.',
            explanation: 'Reduced lens flexibility lowers accommodation for near targets.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A convex lens makes parallel light rays:',
            options: ['Come together at a focal point', 'Spread apart forever', 'Stop completely', 'Change colour'],
            correctIndex: 0,
            hint: 'Convex lenses converge light.',
            explanation: 'The curved surfaces bend rays inward to meet at the focal point.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A lens with a shorter focal length bends light:',
            options: ['More strongly', 'Less strongly', 'Not at all', 'Only at night'],
            correctIndex: 0,
            hint: 'Short focal length means a powerful lens.',
            explanation: 'Stronger bending brings rays to a focus over a shorter distance.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Different glasses bend light by different amounts because of:',
            options: ['What the glass is made of', 'How heavy the glass is', 'The size of the lens only', 'The temperature of the room'],
            correctIndex: 0,
            hint: 'Composition changes the refractive index.',
            explanation: 'The material composition determines how much light slows and bends.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Best integrated statement is:',
            options: ['Vision quality depends only on biology', 'Image formation depends on ray physics, material chemistry, and eye control', 'Chemistry and physics are unrelated to vision', 'Focus is random'],
            correctIndex: 1,
            hint: 'Three-discipline synthesis.',
            explanation: 'Optical performance emerges from physical optics, material properties, and biological control.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Why does light bend when it enters glass from air?',
            options: ['It changes speed as it crosses the boundary', 'It becomes heavier', 'It loses all energy', 'Glass repels light'],
            correctIndex: 0,
            hint: 'Refraction is about a change in speed.',
            explanation: 'Light travels slower in glass, and that speed change at an angle bends the ray.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why does close-up reading become harder for many people with age?',
            options: ['The lens becomes stiffer and cannot be squeezed as round', 'The eye stops making light', 'The retina falls out', 'The pupil closes permanently'],
            correctIndex: 0,
            hint: 'Think about the lens changing shape.',
            explanation: 'A stiffer lens accommodates less, so near focus is lost first.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Glasses correct vision by:',
            options: ['Bending light before it reaches the eye, so the eye\'s lens can finish the job', 'Making the eye stronger', 'Replacing the retina', 'Slowing light to a stop'],
            correctIndex: 0,
            hint: 'Combine an extra lens with the eye\'s own.',
            explanation: 'An external lens shifts the focal point so the image lands on the retina.'
        }
    ]
};
