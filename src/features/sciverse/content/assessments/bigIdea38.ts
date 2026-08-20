import { AssessmentData } from '../../types';

/**
 * Big Idea 38 Assessment: "How Do Robots Sense and Act?"
 * Covers P38 (The Feedback Loop), C38 (Materials That Sense), B38 (Nature's Robots)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea38Assessment: AssessmentData = {
    bigIdea: 38,
    title: 'How Do Robots Sense and Act?',
    subtitle: 'Feedback Control, Sensor Materials, and Biological Sensing',
    icon: '🤖',
    questions: [
        // ── EASY ──
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
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'If a robot is drifting off the line, its correction strength is probably:',
            options: ['Too low', 'Too high', 'Exactly right', 'Irrelevant'],
            correctIndex: 0,
            hint: 'Drifting means it is not correcting enough.',
            explanation: 'Low gain corrects too gently, so the error is never removed.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: "What happens if a control loop's gain is set far too high?",
            options: ["It overshoots and oscillates, wobbling more and more", "It stops moving completely", "It becomes perfectly accurate", "Nothing changes"],
            correctIndex: 0,
            hint: "Think about a shower tap.",
            explanation: "Over-correcting makes each swing bigger, creating instability."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "A light sensor stops working in bright sunshine because:",
            options: ["It saturates and reads everything as maximum brightness", "The sunlight breaks it permanently", "It runs out of electricity", "Sunlight is not real light"],
            correctIndex: 0,
            hint: "Every sensor has a range.",
            explanation: "Beyond its range, a sensor cannot distinguish different conditions."
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why does your hand pull back from a hot stove before you feel pain?",
            options: ["The signal turns around at the spinal cord, which is much closer than the brain", "The brain is asleep", "Pain travels backwards", "Your hand thinks for itself"],
            correctIndex: 0,
            hint: "Shorter path, faster response.",
            explanation: "A reflex arc is about five times faster than routing through the brain."
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A pressure sensor works because certain crystals:',
            options: ['Produce a small voltage when they are squeezed', 'Change colour under pressure', 'Get heavier when pressed', 'Melt when touched'],
            correctIndex: 0,
            hint: 'Something must become electrical.',
            explanation: 'Squeezing these crystals generates a measurable voltage, converting force into a signal.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Why can a perfectly tuned feedback loop still fail?",
            options: ["If the sensor gives false data, the loop confidently corrects the wrong way", "Loops always fail eventually", "Gain cannot be adjusted", "Motors are unreliable"],
            correctIndex: 0,
            hint: "The loop only knows what the sensor tells it.",
            explanation: "Good control depends entirely on trustworthy sensor data."
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Copying nature's designs to build better machines is called:",
            options: ["Biomimicry", "Photosynthesis", "Calibration", "Saturation"],
            correctIndex: 0,
            hint: "\"Bio\" means life, \"mimic\" means copy.",
            explanation: "Biomimicry applies millions of years of natural testing to engineering."
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why is a robot emergency stop wired straight to the motor controller?',
            options: ['A shorter signal path responds far faster, like a reflex arc', 'It uses less electricity', 'The main computer cannot be trusted', 'It looks tidier'],
            correctIndex: 0,
            hint: 'Compare with pulling your hand off a hot stove.',
            explanation: 'Short loops react fastest, which is why both bodies and machines bypass the slow central route.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A perfectly tuned feedback loop still drives a robot off course. What is the most likely cause?',
            options: ['The sensor is giving false readings, so the loop corrects the wrong way', 'The gain is too low', 'The motors are too strong', 'The battery is full'],
            correctIndex: 0,
            hint: 'The loop only knows what the sensor reports.',
            explanation: 'Control quality is limited by sensor quality; bad data produces confident, wrong corrections.'
        }
    ]
};
