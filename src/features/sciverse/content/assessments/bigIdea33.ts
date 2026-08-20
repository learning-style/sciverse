import { AssessmentData } from '../../types';

/**
 * Big Idea 33 Assessment: "How Do Ecosystems Support Human Life?"
 * Covers P33 (The Energy Ladder), C33 (Nature's Recycling Loop), B33 (Nature's Free Gifts)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea33Assessment: AssessmentData = {
    bigIdea: 33,
    title: 'How Do Ecosystems Support Human Life?',
    subtitle: 'Energy Flow, Nutrient Cycling, and Ecosystem Services',
    icon: '🌍',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "Where does almost all the energy in an ecosystem come from?",
            options: ["The Sun", "The soil", "The wind", "The Moon"],
            correctIndex: 0,
            hint: "Think about what plants need to make food.",
            explanation: "Plants capture sunlight, and that energy feeds everything else."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "What do decomposers do?",
            options: ["Break down dead material and return nutrients to the soil", "Make sunlight", "Eat living animals only", "Create brand new atoms"],
            correctIndex: 0,
            hint: "Think about what happens to a fallen leaf.",
            explanation: "Decomposers unlock nutrients from dead material so plants can reuse them."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "Biodiversity means:",
            options: ["Many different kinds of living things in a place", "Only one kind of plant", "The total weight of all animals", "How hot a place is"],
            correctIndex: 0,
            hint: "The word \"diversity\" means variety.",
            explanation: "Biodiversity is the variety of species living in an area."
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In an energy pyramid, which level has the most energy?',
            options: ['The bottom level, the plants', 'The top predators', 'The middle level', 'They are all equal'],
            correctIndex: 0,
            hint: 'Think about where the sunlight arrives first.',
            explanation: 'Producers capture the sunlight, so the bottom level holds by far the most energy.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: "About how much energy passes from one step of a food chain to the next?",
            options: ["About 10%", "About 90%", "All of it", "None of it"],
            correctIndex: 0,
            hint: "Most energy is lost as heat at each step.",
            explanation: "Roughly 10% moves up; the other 90% escapes as heat."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "Why do the same atoms get used over and over on Earth?",
            options: ["Atoms are never destroyed, only rearranged", "New atoms arrive from space daily", "Plants make new atoms", "Atoms slowly disappear"],
            correctIndex: 0,
            hint: "Think about what happens to matter versus energy.",
            explanation: "Matter cycles because atoms cannot be created or destroyed."
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why does a farm field with only one crop face more risk than a wild meadow?",
            options: ["One disease can destroy every plant, since they are all the same", "Crops need less water", "Wild meadows have no insects", "Single crops grow more slowly"],
            correctIndex: 0,
            hint: "Think about backups.",
            explanation: "Low biodiversity means no backup when one threat arrives."
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why does a meadow support thousands of mice but only one or two owls?',
            options: ['Owls are a step higher, so only about 10% of the energy reaches them', 'Owls need less food', 'Mice are bigger than owls', 'Owls prefer to live alone'],
            correctIndex: 0,
            hint: 'Count the steps up from the grass.',
            explanation: 'Each step keeps only about a tenth of the energy, so higher levels support far fewer animals.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A meadow supports thousands of mice but only one or two owls. Why?",
            options: ["Owls are a step higher, so only about 10% of the energy reaches them", "Owls need less space than mice", "Mice eat more than owls do", "Owls do not need energy"],
            correctIndex: 0,
            hint: "Count the steps from the grass upward.",
            explanation: "Each step up keeps only about 10% of the energy, so higher levels support far fewer animals."
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A town removes a wetland and later suffers floods, dirty water, and more mosquitoes. Best explanation?",
            options: ["The wetland was providing several ecosystem services at once for free", "Three unrelated problems happened by chance", "Wetlands cause floods", "Mosquitoes create wetlands"],
            correctIndex: 0,
            hint: "Think about what the wetland was quietly doing.",
            explanation: "One habitat often provides many services, so losing it breaks several at once."
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'If a food chain has four steps, roughly what share of the original sunlight energy reaches the top?',
            options: ['About 0.1%', 'About 10%', 'About 50%', 'All of it'],
            correctIndex: 0,
            hint: 'Multiply 10% by itself for each step.',
            explanation: 'Ten percent per step over three transfers leaves roughly one-thousandth of the starting energy.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Energy must be resupplied by the Sun daily, but nutrients do not need resupplying. Why?',
            options: ['Energy leaves as heat, while atoms are recycled in place', 'Nutrients are made by plants', 'The Sun supplies nutrients too', 'Energy is stored underground'],
            correctIndex: 0,
            hint: 'Compare flow with cycling.',
            explanation: 'Energy flows one way and escapes as heat; matter cycles round and is reused.'
        }
    ]
};
