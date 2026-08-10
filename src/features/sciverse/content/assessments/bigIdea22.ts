import { AssessmentData } from '../../types';

export const bigIdea22Assessment: AssessmentData = {
    bigIdea: 22,
    title: 'How Do Waves Help Us See the Invisible?',
    subtitle: 'Seismic Mapping, Spectra, and Ultrasound',
    icon: '📶',
    questions: [
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
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A common principle across all three lessons is:',
            options: ['Waves carry no information', 'Wave interactions with matter encode hidden structure', 'Only visible light is useful', 'Biology ignores waves'],
            correctIndex: 1,
            hint: 'Interaction creates signal.',
            explanation: 'Changes in wave behavior reveal otherwise hidden features.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Signal quality in wave-based detection is most improved by:',
            options: ['Ignoring background noise', 'Better calibration and interpretation of wave-matter effects', 'Removing all sensors', 'Using random wavelengths'],
            correctIndex: 1,
            hint: 'Measurement quality + model quality.',
            explanation: 'Reliable inference requires good data and correct physical interpretation.'
        }
    ]
};
