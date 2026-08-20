import { AssessmentData } from '../../types';

export const bigIdea39Assessment: AssessmentData = {
    bigIdea: 39,
    title: 'How Do Computers Use Logic to Solve Problems?',
    subtitle: 'Binary Logic, Semiconductor Chemistry, and Neural Decisions',
    icon: '💻',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "Computers use binary, which means:",
            options: ["Only two states: on and off", "Ten different numbers", "Letters of the alphabet", "Colours"],
            correctIndex: 0,
            hint: "\"Bi\" means two.",
            explanation: "Binary uses just on and off, or 1 and 0."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "Silicon is useful for chips because it is:",
            options: ["A semiconductor, between a conductor and an insulator", "The best conductor of all", "A perfect insulator", "A liquid metal"],
            correctIndex: 0,
            hint: "It sits in the middle.",
            explanation: "Semiconductors can be switched between blocking and conducting."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "A neuron fires when:",
            options: ["The total incoming signal crosses its threshold", "Any single signal arrives", "It runs out of energy", "It is touched"],
            correctIndex: 0,
            hint: "It adds up its inputs first.",
            explanation: "Neurons sum their inputs and fire only past the threshold."
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: "An AND gate turns on when:",
            options: ["Both inputs are on", "Either input is on", "Neither input is on", "Only the first input is on"],
            correctIndex: 0,
            hint: "The word \"and\" is the clue.",
            explanation: "AND requires every input to be on."
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "What makes silicon useful for building switches?",
            options: ["A small control signal decides whether it conducts or blocks", "It always conducts, like copper", "It never conducts, like rubber", "It changes colour when switched"],
            correctIndex: 0,
            hint: "A switch has to do two jobs.",
            explanation: "Silicon blocks by default but conducts when told, so it can be switched on and off."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: "What makes brains different from computer chips?",
            options: ["Synapses strengthen with use, so brains learn", "Brains switch much faster", "Brains use no energy", "Brains do not make decisions"],
            correctIndex: 0,
            hint: "Think about what practice does.",
            explanation: "Learning rewires the connections, something a fixed chip cannot do."
        },
        // HARD
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Why is your brain better than a fast computer at recognising a face?",
            options: ["86 billion neurons work in parallel with about 100 trillion connections", "Neurons switch faster than transistors", "Brains skip the logic entirely", "Computers cannot see"],
            correctIndex: 0,
            hint: "Compare wiring, not speed.",
            explanation: "Massive parallel wiring beats raw sequential speed for this task."
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'cross',
            question: "An engineer builds a logic gate out of copper wire. What goes wrong?",
            options: ["Copper always conducts, so the gate can never say \"no\"", "Copper is too heavy for a chip", "Copper only works when cold", "Nothing - copper works fine"],
            correctIndex: 0,
            hint: "A gate must be able to answer on OR off.",
            explanation: "A conductor is stuck on, so it cannot act as a switch; silicon can block as well as conduct."
        }
    ]
};
