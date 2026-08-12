import { AssessmentData } from '../../types';

export const bigIdea34Assessment: AssessmentData = {
    bigIdea: 34,
    title: 'How Do Farms Feed a Growing World?',
    subtitle: 'Irrigation Physics, Fertilizer Chemistry, and Farm Biology',
    icon: '🚜',
    questions: [
        // EASY
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
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: "Why does watering at dawn waste less than watering at noon?",
            options: ["Cool, still air evaporates much less water", "Plants only drink in the morning", "Water is heavier at dawn", "Soil is harder at noon"],
            correctIndex: 0,
            hint: "Think about heat and wind.",
            explanation: "Heat and wind speed up evaporation, so cool still hours lose less."
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "What happens to fertilizer a plant cannot absorb?",
            options: ["It dissolves in rain and washes into rivers", "It disappears completely", "It turns into sunlight", "It becomes part of the plant anyway"],
            correctIndex: 0,
            hint: "Nutrients dissolve in water.",
            explanation: "Excess becomes nutrient runoff, feeding algae blooms downstream."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why can a broad pesticide spray make a pest problem worse the next year?",
            options: ["It kills the predator insects too, and pests recover faster than predators", "Pesticides feed the pests", "It makes plants grow slower", "Pests cannot be killed at all"],
            correctIndex: 0,
            hint: "Think about who else the spray hits.",
            explanation: "Killing predators removes free pest control; pests breed back faster."
        },
        // HARD
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A farmer spreads fertilizer right before a heavy storm. What is the likely result?",
            options: ["Most of it washes into waterways instead of feeding the crop", "The crop absorbs it twice as fast", "The storm locks the fertilizer into the soil", "Nothing changes"],
            correctIndex: 0,
            hint: "Roots absorb slowly; storms move water fast.",
            explanation: "Downpours dissolve and carry fertilizer away before roots can take it up."
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Which combination gives the best harvest with the least environmental damage?",
            options: ["Drip irrigation, split fertilizer doses, and protected pollinators", "Sprinklers at noon and one huge fertilizer dose", "Heavy spraying of everything", "No water and no nutrients"],
            correctIndex: 0,
            hint: "Think about all three lessons at once.",
            explanation: "Efficient water, matched nutrient doses, and a healthy living team work together."
        }
    ]
};
