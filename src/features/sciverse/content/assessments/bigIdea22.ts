import { AssessmentData } from '../../types';

/**
 * Big Idea 22 Assessment: "How Do Waves Help Us See the Invisible?"
 * Covers P22 (Seismic Mapping), C22 (Spectroscopy), B22 (Ultrasound Imaging)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea22Assessment: AssessmentData = {
    bigIdea: 22,
    title: 'How Do Waves Help Us See the Invisible?',
    subtitle: 'Seismic Mapping, Spectra, and Ultrasound',
    icon: '📶',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Seismic waves reveal Earth structure because:',
            options: ['They are unaffected by materials', 'Travel speed and path change by layer properties', 'They only move in air', 'They create new rocks'],
            correctIndex: 1,
            hint: 'Material properties matter.',
            explanation: 'Speed/refraction changes encode interior structure.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Spectral line positions mainly indicate:',
            options: ['Sample mass only', 'Chemical identity and energy transitions', 'Container color', 'Temperature alone'],
            correctIndex: 1,
            hint: 'Fingerprint concept.',
            explanation: 'Line patterns correspond to quantized transitions in specific species.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Ultrasound images are formed from:',
            options: ['Echo timing and amplitude', 'Magnetic memory', 'Chemical staining only', 'Sunlight reflections only'],
            correctIndex: 0,
            hint: 'Pulse-echo method.',
            explanation: 'Echoes from boundaries are processed into images.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Ultrasound builds a picture of the inside of the body using:',
            options: ['Echoes bouncing off boundaries', 'X-rays', 'Magnets only', 'Bright light'],
            correctIndex: 0,
            hint: 'The probe sends pulses and listens.',
            explanation: 'Reflected sound pulses reveal internal boundaries.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A common principle across all three lessons is:',
            options: ['Waves carry no information', 'Wave interactions with matter encode hidden structure', 'Only visible light is useful', 'Biology ignores waves'],
            correctIndex: 1,
            hint: 'Interaction creates signal.',
            explanation: 'Changes in wave behavior reveal otherwise hidden features.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'P-waves are useful for mapping Earth\'s interior because they:',
            options: ['Travel fastest and bend at layer boundaries', 'Never move', 'Only travel through air', 'Destroy the layers'],
            correctIndex: 0,
            hint: 'Arrival times carry the information.',
            explanation: 'Their speed and refraction at boundaries let scientists infer hidden structure.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Spectroscopy identifies an element by comparing:',
            options: ['The pattern of lines in its light', 'Its weight', 'Its smell', 'Its temperature'],
            correctIndex: 0,
            hint: 'Each element has a signature pattern.',
            explanation: 'Line positions form a fingerprint unique to each element.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Attenuation makes deep structures harder to see because the signal:',
            options: ['Weakens as it travels', 'Speeds up', 'Changes into light', 'Becomes louder'],
            correctIndex: 0,
            hint: 'Energy is absorbed along the way.',
            explanation: 'Absorption and scattering reduce echo strength with depth.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Signal quality in wave-based detection is most improved by:',
            options: ['Ignoring background noise', 'Better calibration and interpretation of wave-matter effects', 'Removing all sensors', 'Using random wavelengths'],
            correctIndex: 1,
            hint: 'Measurement quality + model quality.',
            explanation: 'Reliable inference requires good data and correct physical interpretation.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Seismic receivers in several places are better than one because:',
            options: ['Comparing arrival times pinpoints where boundaries lie', 'One receiver is always broken', 'More receivers make waves faster', 'It looks more scientific'],
            correctIndex: 0,
            hint: 'You need more than one viewpoint to locate something.',
            explanation: 'Multiple arrival times triangulate the structure.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'How can we identify what a distant star is made of without visiting it?',
            options: ['Its light carries the spectral fingerprint of its elements', 'We guess from its colour alone', 'We send a probe every time', 'We cannot'],
            correctIndex: 0,
            hint: 'Light travels to us carrying information.',
            explanation: 'Spectral lines in starlight reveal composition remotely.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Seismic waves, spectral lines and ultrasound all reveal hidden things because a wave:',
            options: ['Changes in a measurable way when it meets a boundary or a substance', 'Destroys what it touches', 'Travels forever unchanged', 'Only works underwater'],
            correctIndex: 0,
            hint: 'What do the three methods share?',
            explanation: 'Interaction alters the wave, and that alteration encodes information.'
        }
    ]
};
