import { AssessmentData } from '../../types';

/**
 * Big Idea 16 Assessment: "How Do Magnets Help Us Navigate and Build Machines?"
 * Covers P16 (Magnets & Navigation), C16 (Magnetic Materials), B16 (Migration Sensing)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea16Assessment: AssessmentData = {
    bigIdea: 16,
    title: 'How Do Magnets Help Us Navigate and Build Machines?',
    subtitle: 'Fields, Materials, and Migration Cues',
    icon: '🧭',
    questions: [
        // ── EASY ──
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
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Which of these is attracted to a magnet?',
            options: ['An iron nail', 'A plastic spoon', 'A glass marble', 'A rubber band'],
            correctIndex: 0,
            hint: 'Only a few metals respond.',
            explanation: 'Iron, nickel and cobalt respond strongly; most other materials do not.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A nearby bar magnet changes a compass reading because:',
            options: ['Compass breaks permanently', 'Local field direction changes', 'Earth field turns off', 'Needle loses magnetism instantly'],
            correctIndex: 1,
            hint: 'Compasses read local field vectors.',
            explanation: 'A local magnet adds/redirects the field near the needle.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A compass needle settles pointing north because the magnetic field:',
            options: ['Turns the needle until it lines up with the field', 'Pushes the needle forwards', 'Makes the needle heavier', 'Heats one end of the needle'],
            correctIndex: 0,
            hint: 'Think about what makes the needle rotate.',
            explanation: 'The field applies a turning force until the needle is aligned, then it stays put.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why do only some materials become strong magnets?',
            options: ['Their tiny magnetic regions can line up in the same direction', 'They are heavier than other materials', 'They are always shiny', 'They conduct heat well'],
            correctIndex: 0,
            hint: 'Think about alignment inside the material.',
            explanation: 'When many internal regions point the same way, their effects add up into a strong magnet.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Migrating animals use magnetic information together with:',
            options: ['Sunlight, stars and landmarks', 'Nothing else at all', 'Only smell', 'Only water currents'],
            correctIndex: 0,
            hint: 'Think about what happens on a cloudy night.',
            explanation: 'Animals combine several cues so navigation still works when one becomes unreliable.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What is the best systems-level statement?',
            options: ['Navigation in nature and tools both depend on measurable physical fields', 'Magnetism only matters in compasses', 'Biology ignores physics', 'Material chemistry never affects devices'],
            correctIndex: 0,
            hint: 'Connect physics, chemistry, and biology.',
            explanation: 'Magnetic field physics, material response, and biological sensing form one connected concept.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two compasses are placed near a large steel beam. Why might they disagree?',
            options: ['The beam distorts the local magnetic field', 'Compasses stop working indoors', 'Steel removes magnetism from the air', 'One compass is upside down'],
            correctIndex: 0,
            hint: 'Magnetic materials nearby change the field.',
            explanation: 'Nearby magnetic material bends the field, so each compass aligns to a different local direction.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Heating a magnet strongly can weaken it because heat:',
            options: ['Jostles the aligned regions out of order', 'Melts the magnetic charge', 'Adds extra iron', 'Removes all electrons'],
            correctIndex: 0,
            hint: 'Think about what heat does to ordered arrangements.',
            explanation: 'Thermal motion randomises the alignment, reducing the net magnetic effect.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A bird migrating under thick cloud relies more on magnetic sensing. What is the risk?',
            options: ['Local magnetic distortions can mislead it when other cues are unavailable', 'It will fly faster than usual', 'Magnetic sensing never works', 'Cloud removes Earth\'s field'],
            correctIndex: 0,
            hint: 'Think about losing your backup cues.',
            explanation: 'With visual cues gone, any distortion in the magnetic cue goes uncorrected.'
        }
    ]
};
