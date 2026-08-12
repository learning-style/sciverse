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
            question: "Doping means:",
            options: ["Adding about one atom of another element per million silicon atoms", "Heating silicon until it melts", "Coating silicon in plastic", "Removing all impurities forever"],
            correctIndex: 0,
            hint: "It is a tiny, deliberate addition.",
            explanation: "Doping creates n-type or p-type silicon, which builds transistors."
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
            question: "Why do chip factories need extreme cleanliness?",
            options: ["Doping works at 1 atom per million, so one dust speck carries billions of wrong atoms", "Dust makes the chips look bad", "Workers are allergic to dust", "Dust is magnetic"],
            correctIndex: 0,
            hint: "Think about how precise doping is.",
            explanation: "A single speck overwhelms the careful atomic recipe and ruins the chip."
        }
    ]
};
