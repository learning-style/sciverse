import { AssessmentData } from '../../types';

/**
 * Big Idea 11 Assessment: "How Do We Stay Healthy?"
 * Covers P11 (Blood Pressure), C11 (Acids, Bases & pH), B11 (Immune Defense)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea11Assessment: AssessmentData = {
    bigIdea: 11,
    title: 'How Do We Stay Healthy?',
    subtitle: 'Blood Pressure, pH & Immune System',
    icon: '🎯',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What does blood pressure measure?',
            options: ['How fast blood moves', 'Force blood exerts on artery walls', 'How much blood is in the body', 'How stressed you feel'],
            correctIndex: 1,
            hint: 'Think force per area in arteries.',
            explanation: 'Blood pressure is the force blood exerts on artery walls.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Which pH is neutral?',
            options: ['0', '3', '7', '14'],
            correctIndex: 2,
            hint: 'Middle of the pH scale.',
            explanation: 'pH 7 is neutral. Lower is acidic, higher is basic.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'What are antibodies?',
            options: ['Blood sugar molecules', 'Proteins that help identify pathogens', 'Digestive enzymes', 'Hormones for growth'],
            correctIndex: 1,
            hint: 'Immune system targeting tool.',
            explanation: 'Antibodies are proteins that bind specific pathogens.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'What is the job of your immune system?',
            options: ['To find and destroy invaders like germs', 'To pump blood around the body', 'To digest your food', 'To keep your bones hard'],
            correctIndex: 0,
            hint: 'Think about B11 and your body\'s defence army.',
            explanation: 'The immune system identifies invaders and destroys them using layered defences.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'If artery diameter decreases while flow demand stays similar, blood pressure usually:',
            options: ['Decreases', 'Stays exactly same', 'Increases', 'Drops to zero'],
            correctIndex: 2,
            hint: 'Narrower path means higher resistance.',
            explanation: 'Narrower arteries increase resistance, often raising pressure.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why does an antacid help heartburn?',
            options: ['It adds strong acid', 'It neutralizes excess stomach acid', 'It increases stomach pressure', 'It removes all enzymes'],
            correctIndex: 1,
            hint: 'Acid + base reaction.',
            explanation: 'Most antacids are basic compounds that neutralize excess acid.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Vaccines primarily train which immune response?',
            options: ['Adaptive (memory) response', 'Only skin barrier', 'Digestive response', 'Only innate response'],
            correctIndex: 0,
            hint: 'Memory cells are key.',
            explanation: 'Vaccines train adaptive immunity to produce memory cells.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Blood pH must stay near 7.4, and blood pressure must stay in a healthy range. What do these have in common?',
            options: ['Both are kept steady by the body, and drifting too far is dangerous', 'Both are controlled by the stomach', 'Neither changes during the day', 'Both are measured with a thermometer'],
            correctIndex: 0,
            hint: 'Think about what "staying healthy" means across all three lessons.',
            explanation: 'Healthy bodies hold key measures inside narrow ranges; large drifts in either pH or pressure cause harm.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which combination best supports homeostasis?',
            options: ['No immune activity + very acidic blood', 'Stable blood pH + regulated blood pressure + responsive immune system', 'Very high blood pressure + no buffering', 'No variability in all systems'],
            correctIndex: 1,
            hint: 'Homeostasis is dynamic balance.',
            explanation: 'Homeostasis requires coordinated regulation across systems.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'If blood pH falls below normal, breathing faster can help because it:',
            options: ['Adds oxygen only', 'Removes CO2, reducing carbonic acid', 'Increases sodium directly', 'Creates more lactic acid'],
            correctIndex: 1,
            hint: 'CO2 in blood forms acid.',
            explanation: 'Faster breathing lowers CO2, reducing carbonic acid and raising pH.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Blood pressure is commonly written 120/80. The top value is:',
            options: ['Diastolic pressure', 'Pulse oxygen', 'Systolic pressure during heart contraction', 'Average capillary pressure'],
            correctIndex: 2,
            hint: 'Think heart squeeze phase.',
            explanation: 'Systolic pressure is the peak pressure during heart contraction.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does a narrowed artery force the heart to work harder?',
            options: ['A smaller opening needs more pressure to push the same blood through', 'Narrow arteries hold more blood', 'The blood becomes more acidic', 'The immune system blocks the flow'],
            correctIndex: 0,
            hint: 'Pressure = force ÷ area.',
            explanation: 'Squeezing the same flow through a smaller area demands higher pressure, which strains the heart over time.'
        }
    ]
};
