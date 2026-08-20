import { AssessmentData } from '../../types';

/**
 * Big Idea 37 Assessment: "How Do We Store Energy for Later?"
 * Covers P37 (Save It for Later), C37 (Inside a Battery), B37 (Your Body's Battery)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea37Assessment: AssessmentData = {
    bigIdea: 37,
    title: 'How Do We Store Energy for Later?',
    subtitle: 'Mechanical Storage, Battery Chemistry, and Biological Reserves',
    icon: '🔋',
    questions: [
        // ── EASY ──
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
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Which stores more energy: water lifted 100 m, or the same water lifted 50 m?',
            options: ['The water lifted 100 m', 'The water lifted 50 m', 'They store the same', 'Neither stores energy'],
            correctIndex: 0,
            hint: 'Stored energy = weight x height.',
            explanation: 'Doubling the height doubles the stored energy for the same amount of water.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: "Doubling the height of a pumped hydro lake does what to the stored energy?",
            options: ["Roughly doubles it", "Leaves it unchanged", "Halves it", "Makes it zero"],
            correctIndex: 0,
            hint: "Stored energy = weight x height.",
            explanation: "Energy scales with height, which is why mountains are used."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "Why does leaving a phone in a hot car permanently reduce its battery life?",
            options: ["Heat speeds up side reactions that use up the chemicals for good", "Heat melts the stored electricity", "Heat adds extra electrons", "Heat has no lasting effect"],
            correctIndex: 0,
            hint: "Batteries are chemistry.",
            explanation: "Heat drives damaging side reactions that consume the active material."
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why is fat a better long-term store than sugar?",
            options: ["It holds more than twice the energy per gram, so it is lighter to carry", "It is easier to reach quickly", "Sugar cannot be stored at all", "Fat releases energy faster"],
            correctIndex: 0,
            hint: "Think about weight per unit of energy.",
            explanation: "Fat is energy-dense, so the same energy weighs far less."
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why does a battery go flat even though no matter has left it?',
            options: ['The chemicals inside have been converted into a lower-energy arrangement', 'The electricity leaked out', 'It lost weight', 'The electrons were destroyed'],
            correctIndex: 0,
            hint: 'A battery stores a reaction.',
            explanation: 'Discharging runs the reaction forward; nothing escapes, but the stored chemical arrangement is used up.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A runner \"hits the wall\" after a long hard run. What happened?",
            options: ["Glycogen ran out, and fat releases energy too slowly to keep the pace", "All her stored energy was gone", "Her muscles stopped working permanently", "She drank too much water"],
            correctIndex: 0,
            hint: "It is about speed, not amount.",
            explanation: "Plenty of fat remains, but it cannot deliver energy fast enough."
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: "What do pumped hydro, a battery, and body fat all have in common?",
            options: ["Each converts energy into a form that can sit still until it is needed", "Each stores electricity directly", "Each is 100% efficient", "Each releases energy instantly"],
            correctIndex: 0,
            hint: "Storage always changes form.",
            explanation: "Storing energy always means converting it into something stable."
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why can a runner with plenty of body fat still be forced to slow down?',
            options: ['Fat releases energy too slowly to sustain a fast pace', 'Fat contains no energy', 'Fat turns into glycogen instantly', 'Muscles cannot use fat at all'],
            correctIndex: 0,
            hint: 'It is a question of rate, not amount.',
            explanation: 'Fat is a large but slow store; once glycogen runs out, supply cannot match a hard effort.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do a flywheel, a phone battery and glycogen have in common?',
            options: ['Each is a fast store with limited capacity', 'Each holds unlimited energy', 'Each is 100% efficient', 'Each releases energy slowly'],
            correctIndex: 0,
            hint: 'Compare them with pumped hydro and body fat.',
            explanation: 'All three deliver energy quickly but hold relatively little, unlike the slow, large stores.'
        }
    ]
};
