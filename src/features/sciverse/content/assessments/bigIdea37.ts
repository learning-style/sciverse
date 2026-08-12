import { AssessmentData } from '../../types';

export const bigIdea37Assessment: AssessmentData = {
    bigIdea: 37,
    title: 'How Do We Store Energy for Later?',
    subtitle: 'Mechanical Storage, Battery Chemistry, and Biological Reserves',
    icon: '🔋',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "Pumped hydro stores energy by:",
            options: ["Pumping water uphill into a high lake", "Freezing water", "Burning water", "Spinning water in circles"],
            correctIndex: 0,
            hint: "Height stores energy.",
            explanation: "Water pumped uphill holds gravitational potential energy."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "A charged battery actually stores:",
            options: ["A chemical reaction that has not happened yet", "A tank of electricity", "Compressed air", "Heat"],
            correctIndex: 0,
            hint: "Batteries hold chemicals, not current.",
            explanation: "Batteries store a reaction held back until you connect a device."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "Your body stores extra food energy mainly as:",
            options: ["Glycogen and fat", "Bone and hair", "Water only", "Nothing, it all leaves"],
            correctIndex: 0,
            hint: "One store is fast, one is huge.",
            explanation: "Glycogen is the fast store; fat is the large long-term store."
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: "Doubling the height of a pumped hydro lake does what to the stored energy?",
            options: ["Roughly doubles it", "Leaves it unchanged", "Halves it", "Makes it zero"],
            correctIndex: 0,
            hint: "Stored energy = weight x height.",
            explanation: "Energy scales with height, which is why mountains are used."
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "Why does leaving a phone in a hot car permanently reduce its battery life?",
            options: ["Heat speeds up side reactions that use up the chemicals for good", "Heat melts the stored electricity", "Heat adds extra electrons", "Heat has no lasting effect"],
            correctIndex: 0,
            hint: "Batteries are chemistry.",
            explanation: "Heat drives damaging side reactions that consume the active material."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why is fat a better long-term store than sugar?",
            options: ["It holds more than twice the energy per gram, so it is lighter to carry", "It is easier to reach quickly", "Sugar cannot be stored at all", "Fat releases energy faster"],
            correctIndex: 0,
            hint: "Think about weight per unit of energy.",
            explanation: "Fat is energy-dense, so the same energy weighs far less."
        },
        // HARD
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A runner \"hits the wall\" after a long hard run. What happened?",
            options: ["Glycogen ran out, and fat releases energy too slowly to keep the pace", "All her stored energy was gone", "Her muscles stopped working permanently", "She drank too much water"],
            correctIndex: 0,
            hint: "It is about speed, not amount.",
            explanation: "Plenty of fat remains, but it cannot deliver energy fast enough."
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'cross',
            question: "What do pumped hydro, a battery, and body fat all have in common?",
            options: ["Each converts energy into a form that can sit still until it is needed", "Each stores electricity directly", "Each is 100% efficient", "Each releases energy instantly"],
            correctIndex: 0,
            hint: "Storage always changes form.",
            explanation: "Storing energy always means converting it into something stable."
        }
    ]
};
