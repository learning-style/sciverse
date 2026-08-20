import { AssessmentData } from '../../types';

/**
 * Big Idea 34 Assessment: "How Do Farms Feed a Growing World?"
 * Covers P34 (Water on the Move), C34 (Plant Food Chemistry), B34 (The Farm Team)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea34Assessment: AssessmentData = {
    bigIdea: 34,
    title: 'How Do Farms Feed a Growing World?',
    subtitle: 'Irrigation Physics, Fertilizer Chemistry, and Farm Biology',
    icon: '🚜',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "Drip irrigation delivers water:",
            options: ["Slowly, right at the base of each plant", "As a high spray into the air", "Only when it rains", "Into the nearest river"],
            correctIndex: 0,
            hint: "The name is a clue.",
            explanation: "Drip systems release water drop by drop at the roots."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "The three main nutrients in most fertilizer are:",
            options: ["Nitrogen, phosphorus, and potassium", "Oxygen, helium, and neon", "Iron, gold, and silver", "Sugar, salt, and fat"],
            correctIndex: 0,
            hint: "Look at the three numbers on a fertilizer bag.",
            explanation: "N-P-K stands for nitrogen, phosphorus, and potassium."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "What do pollinators do for a plant?",
            options: ["Carry pollen between flowers so fruit can form", "Eat the plant roots", "Provide shade", "Add water to the soil"],
            correctIndex: 0,
            hint: "Think about bees and apple trees.",
            explanation: "Pollinators move pollen, which lets flowers become fruit."
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why does spraying water high into the air waste more of it?',
            options: ['Small droplets evaporate quickly before landing', 'The water gets heavier', 'Plants dislike sprayed water', 'Spray water is dirtier'],
            correctIndex: 0,
            hint: 'Think about droplet size and surface area.',
            explanation: 'Tiny droplets have a large surface area, so much of the water evaporates before it reaches the soil.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: "Why does watering at dawn waste less than watering at noon?",
            options: ["Cool, still air evaporates much less water", "Plants only drink in the morning", "Water is heavier at dawn", "Soil is harder at noon"],
            correctIndex: 0,
            hint: "Think about heat and wind.",
            explanation: "Heat and wind speed up evaporation, so cool still hours lose less."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "What happens to fertilizer a plant cannot absorb?",
            options: ["It dissolves in rain and washes into rivers", "It disappears completely", "It turns into sunlight", "It becomes part of the plant anyway"],
            correctIndex: 0,
            hint: "Nutrients dissolve in water.",
            explanation: "Excess becomes nutrient runoff, feeding algae blooms downstream."
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why can a broad pesticide spray make a pest problem worse the next year?",
            options: ["It kills the predator insects too, and pests recover faster than predators", "Pesticides feed the pests", "It makes plants grow slower", "Pests cannot be killed at all"],
            correctIndex: 0,
            hint: "Think about who else the spray hits.",
            explanation: "Killing predators removes free pest control; pests breed back faster."
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why do slow-release fertiliser pellets pollute less?',
            options: ['They dissolve gradually, so roots can absorb the nutrients before rain washes them away', 'They contain no nitrogen', 'They repel water completely', 'They kill algae'],
            correctIndex: 0,
            hint: 'Roots absorb slowly; rain moves fast.',
            explanation: 'Matching release rate to uptake rate leaves less dissolved nutrient available to run off.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A farmer spreads fertilizer right before a heavy storm. What is the likely result?",
            options: ["Most of it washes into waterways instead of feeding the crop", "The crop absorbs it twice as fast", "The storm locks the fertilizer into the soil", "Nothing changes"],
            correctIndex: 0,
            hint: "Roots absorb slowly; storms move water fast.",
            explanation: "Downpours dissolve and carry fertilizer away before roots can take it up."
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Which combination gives the best harvest with the least environmental damage?",
            options: ["Drip irrigation, split fertilizer doses, and protected pollinators", "Sprinklers at noon and one huge fertilizer dose", "Heavy spraying of everything", "No water and no nutrients"],
            correctIndex: 0,
            hint: "Think about all three lessons at once.",
            explanation: "Efficient water, matched nutrient doses, and a healthy living team work together."
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'After spraying, pests return worse the next season. What explains this best?',
            options: ['Pests breed faster than their predators, so they recover first in a farm with no defenders left', 'Sprays make pests larger', 'Predators eat the crop instead', 'Pests become invisible'],
            correctIndex: 0,
            hint: 'Compare how fast each group breeds.',
            explanation: 'The spray removes both, but pests rebound in days while predators need a whole season.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A farm has perfect irrigation and perfect fertiliser but no pollinators. What happens to a fruit crop?',
            options: ['The plants grow well but produce very little fruit', 'The crop doubles', 'Nothing changes', 'The plants die immediately'],
            correctIndex: 0,
            hint: 'Think about what turns a flower into a fruit.',
            explanation: 'Without pollen transfer, flowers cannot set fruit no matter how well the plants are fed and watered.'
        }
    ]
};
