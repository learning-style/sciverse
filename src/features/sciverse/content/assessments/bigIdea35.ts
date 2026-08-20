import { AssessmentData } from '../../types';

/**
 * Big Idea 35 Assessment: "How Can We Turn Waste Into Resources?"
 * Covers P35 (The Sorting Machine), C35 (Melt and Remake), B35 (The Compost Crew)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea35Assessment: AssessmentData = {
    bigIdea: 35,
    title: 'How Can We Turn Waste Into Resources?',
    subtitle: 'Sorting Physics, Recycling Chemistry, and Composting Biology',
    icon: '♻️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: "How does a recycling plant separate steel cans?",
            options: ["A magnet lifts them off the belt", "Workers taste them", "They float in water", "They glow in the dark"],
            correctIndex: 0,
            hint: "Steel has a special property.",
            explanation: "Steel is magnetic, so magnets pull it off the conveyor."
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: "An aluminium can that is recycled becomes:",
            options: ["A brand new can, just as good as before", "Always a park bench", "Weaker every time until it is useless", "A different metal"],
            correctIndex: 0,
            hint: "Metal is made of atoms that re-stack.",
            explanation: "Metal recycles in a closed loop with no loss of quality."
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: "A compost pile gets hot because:",
            options: ["Microbes release heat while eating the scraps", "The Sun heats the middle", "It is near a fire", "Cold air sinks into it"],
            correctIndex: 0,
            hint: "The centre is hottest, even at night.",
            explanation: "Decomposers release heat as they break material down."
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'An eddy current separator is used to remove:',
            options: ['Aluminium, which is not magnetic', 'Steel cans', 'Paper', 'Glass bottles'],
            correctIndex: 0,
            hint: 'It flings a metal that a magnet cannot lift.',
            explanation: 'A moving magnetic field pushes aluminium off the belt even though aluminium is not magnetic.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: "Why does a greasy pizza box cause problems at a recycling plant?",
            options: ["Grease contaminates the clean paper around it, so batches get rejected", "Machines cannot lift it", "It is too heavy for the belt", "Grease is magnetic"],
            correctIndex: 0,
            hint: "Sorting machines separate, they do not wash.",
            explanation: "Contamination can send a whole bale to landfill."
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: "Why does plastic get weaker each time it is recycled?",
            options: ["Heat snaps its long polymer chains into shorter ones", "Plastic loses atoms", "Plastic absorbs water", "Plastic turns into metal"],
            correctIndex: 0,
            hint: "Plastic is made of long chains, not single atoms.",
            explanation: "Shorter chains make weaker plastic, which is why this is downcycling."
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: "A wet, tightly packed compost bin turns cold and smelly because:",
            options: ["Air is squeezed out, so slow anaerobic microbes take over", "All the microbes died", "It needs more water", "Compost is always smelly"],
            correctIndex: 0,
            hint: "Think about what the fast decomposers need.",
            explanation: "Without oxygen, anaerobic microbes take over and produce smelly gases."
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why must different plastic types be kept separate?',
            options: ['Mixing them produces a weak, low-quality blend', 'They explode when mixed', 'Mixing makes them magnetic', 'They cannot be melted at all'],
            correctIndex: 0,
            hint: 'That is what the numbers on bottles are for.',
            explanation: 'Different polymers do not blend well, so a mixed batch is weaker than any single type.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Recycling 1 tonne of aluminium saves far more energy than 1 tonne of plastic. Why?",
            options: ["It avoids the enormous energy needed to extract aluminium from ore", "Aluminium melts at a lower temperature", "Plastic cannot be melted", "Aluminium weighs less"],
            correctIndex: 0,
            hint: "The saving comes from what you avoid doing.",
            explanation: "Making new aluminium from ore is extremely energy-hungry; melting scrap saves about 95%."
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: "Which statement best connects all three lessons?",
            options: ["Physics separates materials, chemistry remakes them, and biology recycles food waste", "Only machines can recycle anything", "Composting works on metal", "All materials recycle equally well"],
            correctIndex: 0,
            hint: "Think about the three different tools.",
            explanation: "Each science handles a different part of turning waste back into a resource."
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A compost pile is hot in the middle even on a cold night. What does that prove?',
            options: ['The heat is made inside by microbes, not absorbed from outside', 'The Sun warms the centre first', 'Compost stores summer heat', 'The pile is on fire'],
            correctIndex: 0,
            hint: 'Where is the pile hottest, and when?',
            explanation: 'Internal heat that persists at night must be produced by the decomposers themselves.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which waste stream keeps its quality through unlimited recycling, and why?',
            options: ['Aluminium, because melting only rearranges whole atoms', 'Plastic, because it melts easily', 'Paper, because it is natural', 'Food waste, because it rots'],
            correctIndex: 0,
            hint: 'Compare atoms with polymer chains.',
            explanation: 'Metal atoms re-stack unchanged after melting, while polymer chains snap and shorten.'
        }
    ]
};
