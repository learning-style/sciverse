import { AssessmentData } from '../../types';

/**
 * Big Idea 42 Assessment: "How Does Sports Science Improve Performance?"
 * Covers P42 (Follow Through), C42 (Sweat and Salt), B42 (Rest and Rebuild)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea42Assessment: AssessmentData = {
    bigIdea: 42,
    title: 'How Does Sports Science Improve Performance?',
    subtitle: 'Contact Time, Electrolytes & Recovery',
    icon: '⚽',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'How long does a bat stay in contact with a ball?',
            options: ['About one millisecond', 'About one second', 'About one minute', 'It never touches'],
            correctIndex: 0,
            hint: 'It is far shorter than it feels.',
            explanation: 'Contact lasts roughly a thousandth of a second, but the push happens in that window.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Sweat contains:',
            options: ['Water and dissolved salts', 'Only water', 'Only salt', 'Neither'],
            correctIndex: 0,
            hint: 'Taste tells you.',
            explanation: 'Sweat carries out both water and electrolytes.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Muscles mostly repair themselves:',
            options: ['While you rest and sleep', 'During the workout', 'Only while eating', 'They never repair'],
            correctIndex: 0,
            hint: 'Rest is when the building happens.',
            explanation: 'Repair and rebuilding occur during recovery, especially sleep.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Sports science studies:',
            options: ['How technique, drinking and rest affect performance', 'Only how hard you try', 'Only the rules of games', 'Only equipment prices'],
            correctIndex: 0,
            hint: 'Think about all three lessons.',
            explanation: 'It covers what happens around the effort, not just the effort.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Following through makes a ball faster because it:',
            options: ['Keeps the force acting for longer', 'Adds extra force at the end', 'Makes the ball lighter', 'Changes the air pressure'],
            correctIndex: 0,
            hint: 'Push = force x contact time.',
            explanation: 'A longer contact time means a larger total push for the same force.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Drinking only plain water after heavy sweating can:',
            options: ['Water down your remaining salts even further', 'Replace everything you lost', 'Add salt to your body', 'Stop you sweating'],
            correctIndex: 0,
            hint: 'Sweat removes salts too.',
            explanation: 'Plain water refills the liquid but dilutes the electrolytes further.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Training again before a muscle has repaired causes:',
            options: ['Damage to stack up, so strength falls', 'Faster strength gains', 'No change at all', 'Instant recovery'],
            correctIndex: 0,
            hint: 'This has a name: overtraining.',
            explanation: 'Repeated damage without repair reduces strength and raises injury risk.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'To catch a hard ball safely you should:',
            options: ['Pull your hands back to make the contact time longer', 'Hold your hands rigid', 'Catch with straight arms', 'Close your eyes'],
            correctIndex: 0,
            hint: 'Reverse the follow-through rule.',
            explanation: 'A longer stopping time means a smaller force on your hands.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two players kick with identical force, but one follows through. Why does that ball go faster?',
            options: ['The force acts over a longer contact time, giving a bigger push', 'The follow-through adds a second kick', 'The ball becomes lighter', 'The air resistance drops'],
            correctIndex: 0,
            hint: 'Force is only half the story.',
            explanation: 'Impulse depends on force multiplied by time, so longer contact wins.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why can drinking four litres of plain water after a race be dangerous?',
            options: ['It dilutes the remaining electrolytes so nerves and muscles struggle', 'Water is toxic in large amounts', 'It adds too much salt', 'It stops the heart instantly'],
            correctIndex: 0,
            hint: 'Balance, not volume.',
            explanation: 'Severe dilution of electrolytes causes cramps and confusion.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why do professional training plans schedule rest days deliberately?',
            options: ['Because strength is built during repair, so rest is part of the training', 'To save money', 'Because athletes get bored', 'Rest days are legally required'],
            correctIndex: 0,
            hint: 'When does adaptation happen?',
            explanation: 'Each session must land on a repaired muscle for the cycle to add strength.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'An athlete trains harder, drinks only water, and never rests. What happens?',
            options: ['Performance drops, because two of the three requirements are missing', 'Performance improves fastest', 'Nothing changes', 'Only hydration suffers'],
            correctIndex: 0,
            hint: 'Three lessons, three requirements.',
            explanation: 'Technique, electrolyte balance and recovery all matter; effort alone is not enough.'
        }
    ]
};
