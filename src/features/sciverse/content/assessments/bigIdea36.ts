import { AssessmentData } from '../../types';

export const bigIdea36Assessment: AssessmentData = {
    bigIdea: 36,
    title: 'How Do We Make Water Safe to Drink?',
    subtitle: 'Filtration Physics, Disinfection Chemistry, and Water Testing Biology',
    icon: '🚰',
    questions: [
        // EASY
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "What decides which particles a filter can catch?",
            options: ["The size of its holes", "Its colour", "How old it is", "How heavy it is"],
            correctIndex: 0,
            hint: "Think about a sieve.",
            explanation: "Anything larger than a hole is trapped; smaller things pass through."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "What does chlorine do to germs in water?",
            options: ["Destroys them", "Makes them sink", "Turns them into fish", "Feeds them"],
            correctIndex: 0,
            hint: "Chlorine is a disinfectant.",
            explanation: "Chlorine damages germ cells so they cannot survive."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "To test water for germs, scientists:",
            options: ["Grow the germs until they form visible colonies", "Look at one drop with the naked eye", "Taste the water", "Weigh the water"],
            correctIndex: 0,
            hint: "One germ multiplies into millions overnight.",
            explanation: "Culturing turns invisible bacteria into countable colonies."
        },
        // MEDIUM
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: "A camper strains river water through cloth and it looks clear. Is it safe?",
            options: ["No, bacteria and viruses are far smaller than the cloth holes", "Yes, clear water is always clean", "Yes, cloth removes all germs", "Only if it tastes fine"],
            correctIndex: 0,
            hint: "Compare germ size to hole size.",
            explanation: "Cloth catches mud but not the much smaller bacteria and viruses."
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "Why do water systems leave a little chlorine in the water leaving the plant?",
            options: ["To keep protecting the water against germs entering through leaky pipes", "To improve the taste", "To make it look blue", "To make it heavier"],
            correctIndex: 0,
            hint: "The water travels for hours after treatment.",
            explanation: "The chlorine residual guards the water all the way to the tap."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: "Why do scientists test for E. coli specifically?",
            options: ["It indicates that sewage has reached the water", "It is the only germ that exists", "It is harmless and easy to see", "It makes water taste bad"],
            correctIndex: 0,
            hint: "It is called an indicator species.",
            explanation: "Finding E. coli signals sewage contamination, and other dangerous germs follow."
        },
        // HARD
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: "A village well tests clean once. Why should they keep testing?",
            options: ["A test only describes that moment; flooding or cracks can contaminate it later", "Tests are wrong half the time", "Wells refill with new water each week", "Testing makes water safer"],
            correctIndex: 0,
            hint: "A test is a snapshot, not a promise.",
            explanation: "Conditions change, so safe water requires regular testing."
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Which sequence describes making water safe?",
            options: ["Filter out big particles, disinfect the rest, then test to confirm", "Test first, then drink, then filter", "Only chlorinate, nothing else", "Only filter, nothing else"],
            correctIndex: 0,
            hint: "Each science handles a different step.",
            explanation: "Physics strains, chemistry destroys, biology verifies."
        }
    ]
};
