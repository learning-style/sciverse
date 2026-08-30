import { AssessmentData } from '../../types';

/**
 * Big Idea 48 Assessment: "How Do We Keep Track of Wildlife?"
 * Covers P48 (Where to Put the Camera), C48 (Traces in the Water),
 * B48 (Counting What You Cannot See)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea48Assessment: AssessmentData = {
    bigIdea: 48,
    title: 'How Do We Keep Track of Wildlife?',
    subtitle: 'Samples, Traces & Trends',
    icon: '📷',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A camera trap is:',
            options: ['A camera that takes a picture by itself when something walks past', 'A cage that catches animals', 'A camera hidden in a bag', 'A camera that films all night'],
            correctIndex: 0,
            hint: 'Nobody has to hold it.',
            explanation: 'A camera trap photographs whatever walks past it.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Animals leave traces in water because they shed:',
            options: ['Tiny bits of skin, scales and slime', 'Drops of blood', 'Bubbles of air', 'Coloured dye'],
            correctIndex: 0,
            hint: 'You shed them too, all day.',
            explanation: 'Every living thing constantly sheds tiny bits of itself.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A trend is:',
            options: ['Which way the numbers are heading over time', 'The biggest number you counted', 'A count done very carefully', 'The number of animals in a park'],
            correctIndex: 0,
            hint: 'It needs more than one count.',
            explanation: 'A trend is the direction the numbers are moving.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'You can never count every animal in a wood, so instead you:',
            options: ['Count samples -- small pieces of it', 'Guess the total', 'Count only the big animals', 'Count on one day only'],
            correctIndex: 0,
            hint: 'Small pieces stand in for the whole.',
            explanation: 'Sampling is how the uncountable gets counted.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why does one camera in a whole wood find so few kinds of animal?',
            options: ['It watches one small spot, and animals are not spread out evenly', 'Animals learn to avoid it', 'One camera runs out of battery', 'Its pictures are blurry'],
            correctIndex: 0,
            hint: 'Where is the badger walking?',
            explanation: 'A single sample covers a tiny, possibly unrepresentative area.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why does testing more water find more kinds of animal?',
            options: ['Traces are thinly spread, so rare animals need more water to catch', 'More water is cleaner', 'The animals swim into the jar', 'Water gets heavier'],
            correctIndex: 0,
            hint: 'How many otter flakes are in one litre?',
            explanation: 'More water sampled means more chance of catching scarce traces.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why is counting 40 hedgehogs neither good nor bad news on its own?',
            options: ['You need earlier counts to know if 40 is a rise or a fall', '40 is a middling number', 'Hedgehogs are hard to count', 'You should count in winter'],
            correctIndex: 0,
            hint: 'What if there were 300 before?',
            explanation: 'A single count has no meaning without something to compare it to.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A team changes from 5 cameras to 20 and their count jumps. What happened?',
            options: ['They looked harder, so they measured their method, not the animals', 'Twenty times more animals arrived', 'The cameras broke', 'The animals bred quickly'],
            correctIndex: 0,
            hint: 'Did the wood change, or the watching?',
            explanation: 'Changing method breaks the comparison between years.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Team A puts 10 cameras on one path; Team B spreads 10 across the wood. Who finds more kinds?',
            options: ['Team B, because ten cameras on one path are really one sample repeated', 'Team A, because paths are the best spots', 'Both find the same', 'Team A, because they get more pictures'],
            correctIndex: 0,
            hint: 'Pictures are not the same as kinds.',
            explanation: 'Clustered samples cover one place many times over.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A stream test finds no otter traces. What can you conclude?',
            options: ['Only that no otter has been there in the last few days', 'That otters are gone from the stream', 'That the test failed', 'That otters never lived there'],
            correctIndex: 0,
            hint: 'How long does DNA last in water?',
            explanation: 'Traces break down in days, so absence of trace is not absence of animal.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Butterflies fall from 100 to 60 in one year. What should a scientist say?',
            options: ['Two years is not enough -- counts wobble on their own', 'It is a disaster, the count halved', 'It is good news, 60 is plenty', 'The counters made a mistake'],
            correctIndex: 0,
            hint: 'Two dots do not make a line.',
            explanation: 'Natural variation can swamp a real trend over short spans.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which three things must all go right to know if a wood is getting richer or poorer?',
            options: ['Where you sample, how you find hidden species, and how many years you watch', 'Good cameras, clean water and warm weather', 'Money, people and time', 'Counting fast, often and at night'],
            correctIndex: 0,
            hint: 'P48, C48 and B48.',
            explanation: 'Sampling design, detection method and duration must all hold up.'
        }
    ]
};
