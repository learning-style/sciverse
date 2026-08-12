import { AssessmentData } from '../../types';

export const bigIdea38Assessment: AssessmentData = {
    bigIdea: 38,
    title: 'How Do Robots Sense and Act?',
    subtitle: 'Feedback Control, Sensor Materials, and Biological Sensing',
    icon: '🤖',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "The four steps of a feedback loop are:",
            options: ["Sense, compare, correct, repeat", "Start, stop, wait, finish", "Push, pull, lift, drop", "Plan, build, test, sell"],
            correctIndex: 0,
            hint: "It runs over and over.",
            explanation: "Feedback loops constantly measure and correct."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "A sensor turns something physical into:",
            options: ["An electrical signal", "Sunlight", "Sound only", "Nothing at all"],
            correctIndex: 0,
            hint: "Computer chips only understand one thing.",
            explanation: "Sensors convert light, heat, or pressure into electricity."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "In a robot, the part that matches an animal muscle is the:",
            options: ["Motor", "Battery", "Sensor", "Wire"],
            correctIndex: 0,
            hint: "Muscles create movement.",
            explanation: "Motors do the moving, just as muscles do in animals."
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: "What happens if a control loop's gain is set far too high?",
            options: ["It overshoots and oscillates, wobbling more and more", "It stops moving completely", "It becomes perfectly accurate", "Nothing changes"],
            correctIndex: 0,
            hint: "Think about a shower tap.",
            explanation: "Over-correcting makes each swing bigger, creating instability."
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "A light sensor stops working in bright sunshine because:",
            options: ["It saturates and reads everything as maximum brightness", "The sunlight breaks it permanently", "It runs out of electricity", "Sunlight is not real light"],
            correctIndex: 0,
            hint: "Every sensor has a range.",
            explanation: "Beyond its range, a sensor cannot distinguish different conditions."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why does your hand pull back from a hot stove before you feel pain?",
            options: ["The signal turns around at the spinal cord, which is much closer than the brain", "The brain is asleep", "Pain travels backwards", "Your hand thinks for itself"],
            correctIndex: 0,
            hint: "Shorter path, faster response.",
            explanation: "A reflex arc is about five times faster than routing through the brain."
        },
        // HARD
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Why can a perfectly tuned feedback loop still fail?",
            options: ["If the sensor gives false data, the loop confidently corrects the wrong way", "Loops always fail eventually", "Gain cannot be adjusted", "Motors are unreliable"],
            correctIndex: 0,
            hint: "The loop only knows what the sensor tells it.",
            explanation: "Good control depends entirely on trustworthy sensor data."
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Copying nature's designs to build better machines is called:",
            options: ["Biomimicry", "Photosynthesis", "Calibration", "Saturation"],
            correctIndex: 0,
            hint: "\"Bio\" means life, \"mimic\" means copy.",
            explanation: "Biomimicry applies millions of years of natural testing to engineering."
        }
    ]
};
