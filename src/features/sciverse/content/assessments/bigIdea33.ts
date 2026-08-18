import { AssessmentData } from '../../types';

export const bigIdea33Assessment: AssessmentData = {
    bigIdea: 33,
    title: 'How Do Ecosystems Support Human Life?',
    subtitle: 'Energy Flow, Nutrient Cycling, and Ecosystem Services',
    icon: '🌍',
    questions: [
        // EASY
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
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: "About how much energy passes from one step of a food chain to the next?",
            options: ["About 10%", "About 90%", "All of it", "None of it"],
            correctIndex: 0,
            hint: "Most energy is lost as heat at each step.",
            explanation: "Roughly 10% moves up; the other 90% escapes as heat."
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "Why do the same atoms get used over and over on Earth?",
            options: ["Atoms are never destroyed, only rearranged", "New atoms arrive from space daily", "Plants make new atoms", "Atoms slowly disappear"],
            correctIndex: 0,
            hint: "Think about what happens to matter versus energy.",
            explanation: "Matter cycles because atoms cannot be created or destroyed."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why does a farm field with only one crop face more risk than a wild meadow?",
            options: ["One disease can destroy every plant, since they are all the same", "Crops need less water", "Wild meadows have no insects", "Single crops grow more slowly"],
            correctIndex: 0,
            hint: "Think about backups.",
            explanation: "Low biodiversity means no backup when one threat arrives."
        },
        // HARD
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A meadow supports thousands of mice but only one or two owls. Why?",
            options: ["Owls are a step higher, so only about 10% of the energy reaches them", "Owls need less space than mice", "Mice eat more than owls do", "Owls do not need energy"],
            correctIndex: 0,
            hint: "Count the steps from the grass upward.",
            explanation: "Each step up keeps only about 10% of the energy, so higher levels support far fewer animals."
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A town removes a wetland and later suffers floods, dirty water, and more mosquitoes. Best explanation?",
            options: ["The wetland was providing several ecosystem services at once for free", "Three unrelated problems happened by chance", "Wetlands cause floods", "Mosquitoes create wetlands"],
            correctIndex: 0,
            hint: "Think about what the wetland was quietly doing.",
            explanation: "One habitat often provides many services, so losing it breaks several at once."
        }
    ]
};
