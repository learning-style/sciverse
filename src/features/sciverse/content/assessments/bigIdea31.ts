import { AssessmentData } from '../../types';

/**
 * Big Idea 31 Assessment: "How Do Cities Move Water and Waste?"
 * Covers P31 (Downhill Flow), C31 (Clean Water), B31 (Invisible Enemies)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea31Assessment: AssessmentData = {
    bigIdea: 31,
    title: 'How Do We Move Water and Waste?',
    subtitle: 'Physics of Flow, Chemical Treatment, and Biological Safety',
    icon: '🚰',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Water flows downhill because of:',
            options: ['Gravity', 'Wind', 'Sunlight', 'Sound'],
            correctIndex: 0,
            hint: 'Think about what makes rivers flow.',
            explanation: 'Gravity pulls water from higher to lower places.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Water treatment plants use chemicals to:',
            options: ['Remove harmful substances', 'Make water blue', 'Add dirt', 'Make water heavier'],
            correctIndex: 0,
            hint: 'Think about why we treat water.',
            explanation: 'Chemicals help remove germs and pollutants from water.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Clean water is important for health because:',
            options: ['It prevents disease', 'It tastes sweet', 'It is cold', 'It is blue'],
            correctIndex: 0,
            hint: 'Think about what happens if you drink dirty water.',
            explanation: 'Clean water prevents the spread of disease and keeps people healthy.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Keeping sewage separate from drinking water prevents:',
            options: ['Deadly waterborne disease', 'Water from freezing', 'Pipes from bending', 'Rain from falling'],
            correctIndex: 0,
            hint: 'Think about what sewage carries.',
            explanation: 'Separation stops disease-causing organisms reaching drinking supplies.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which statement connects all three lessons?',
            options: ['Moving and cleaning water involves physical, chemical, and biological processes', 'Only gravity matters', 'Water is always clean', 'Chemistry is not involved'],
            correctIndex: 0,
            hint: 'Think about the whole water system.',
            explanation: 'Water systems use physics, chemistry, and biology to keep water safe.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A taller water tower produces:',
            options: ['Higher pressure and stronger flow', 'Lower pressure', 'No flow at all', 'Colder water'],
            correctIndex: 0,
            hint: 'Height stores energy, as in P37.',
            explanation: 'Greater height increases the pressure driving water through the pipes.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Clumping chemicals are added to water so that dirt particles:',
            options: ['Stick together and sink', 'Dissolve completely', 'Turn into gas', 'Become invisible but stay'],
            correctIndex: 0,
            hint: 'Small specks must become big ones.',
            explanation: 'Coagulation aggregates fine particles into settleable clumps.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Sewer pipes are laid on a slope so that:',
            options: ['Gravity carries waste away without pumping', 'Water flows uphill', 'Pipes stay warm', 'Waste stays still'],
            correctIndex: 0,
            hint: 'Gravity does the work.',
            explanation: 'A downhill gradient keeps waste moving without energy input.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A broken sewer system can cause:',
            options: ['Disease outbreaks and environmental pollution', 'Cleaner water', 'No effect', 'More rain'],
            correctIndex: 0,
            hint: 'Think about what happens if waste is not removed.',
            explanation: 'Broken sewers can spread disease and pollute the environment.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why is filtering alone not enough to make water safe?',
            options: ['Filters cannot catch the smallest germs', 'Filters add chemicals', 'Filters make water acidic', 'Filters remove all minerals'],
            correctIndex: 0,
            hint: 'Clear is not the same as clean.',
            explanation: 'Bacteria and viruses can be smaller than the filter openings.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Boiling water makes it safer because heat:',
            options: ['Destroys germs', 'Removes all dissolved metals', 'Adds oxygen', 'Filters out sand'],
            correctIndex: 0,
            hint: 'Heat kills living things.',
            explanation: 'High temperature denatures the structures germs need to survive.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A city needs physics, chemistry and biology for safe water because it must:',
            options: ['Move it, treat it, and confirm it is free of germs', 'Only move it', 'Only treat it', 'Only test it once'],
            correctIndex: 0,
            hint: 'Three lessons, three jobs.',
            explanation: 'Delivery, treatment and verification are all required together.'
        }
    ]
};