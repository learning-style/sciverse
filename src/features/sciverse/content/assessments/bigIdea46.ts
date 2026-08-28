import { AssessmentData } from '../../types';

/**
 * Big Idea 46 Assessment: "How Do Color and Perception Work in Design?"
 * Covers P46 (Mixing Light), C46 (Why Colours Fade), B46 (How Your Eyes See Colour)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea46Assessment: AssessmentData = {
    bigIdea: 46,
    title: 'How Do Color and Perception Work in Design?',
    subtitle: 'Light Mixing, Fading Pigments & Cone Cells',
    icon: '🎨',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Shining red light and green light on the same white wall gives:',
            options: ['Yellow', 'Brown', 'Black', 'Grey'],
            correctIndex: 0,
            hint: 'Light adds; paint takes away.',
            explanation: 'Overlapping light adds, so red plus green reads as yellow.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A poster fades in sunlight because the colour molecules are:',
            options: ['Broken apart by UV light', 'Washed off by rain', 'Evaporated into the air', 'Eaten by insects'],
            correctIndex: 0,
            hint: 'Nothing leaves the paper.',
            explanation: 'UV snaps pigment molecules so they no longer throw back their colour.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In a dark room everything looks grey because:',
            options: ['Your colour-detecting cones need more light to work', 'Colour disappears in the dark', 'Your eyes close slightly', 'Grey objects glow at night'],
            correctIndex: 0,
            hint: 'Two kinds of detector cell.',
            explanation: 'Rods take over in dim light and report brightness only.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Screens are built from which three colours?',
            options: ['Red, green and blue', 'Red, yellow and blue', 'Black, white and grey', 'Orange, purple and green'],
            correctIndex: 0,
            hint: 'Look at a screen through a magnifier.',
            explanation: 'Screens use red, green and blue dots.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why do red and green paint make brown, but red and green light make yellow?',
            options: ['Paint removes colours while light adds them', 'Paint is thicker than light', 'The paint was mixed badly', 'Light travels faster'],
            correctIndex: 0,
            hint: 'Opposite processes.',
            explanation: 'Mixing paint subtracts colours; mixing light adds them.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Old posters often drift towards blue because:',
            options: ['Red and yellow molecules are more fragile and break first', 'Blue ink is added over time', 'Sunlight is blue', 'Paper turns blue with age'],
            correctIndex: 0,
            hint: 'Not all molecules are equally tough.',
            explanation: 'Fragile pigments fade first, leaving the tougher blues behind.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'How many kinds of cone cell does your eye have?',
            options: ['Three', 'One', 'Seven', 'Hundreds'],
            correctIndex: 0,
            hint: 'The same number as a screen uses.',
            explanation: 'Three cone types: red, green and blue sensitive.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A screen can show yellow without emitting yellow light because it:',
            options: ['Fires your red and green cones in the same ratio real yellow would', 'Mixes yellow paint behind the glass', 'Uses a hidden yellow dot', 'Bends the light into yellow'],
            correctIndex: 0,
            hint: 'It fools the eye, not physics.',
            explanation: 'Colour is a comparison of cone signals, so matching the ratio matches the colour.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A stage designer has only red, green and blue lamps. Can she make white?',
            options: ['Yes - all three together give white', 'No, white needs its own lamp', 'Only with a filter', 'Only in daylight'],
            correctIndex: 0,
            hint: 'White is all colours arriving at once.',
            explanation: 'Adding all three covers enough of the spectrum that the eye reads white.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why do museums display fragile paintings in dim, orange-tinted light?',
            options: ['Bright light carries UV that permanently breaks pigments', 'Dim light looks more dramatic', 'It saves electricity', 'Orange light restores old colours'],
            correctIndex: 0,
            hint: 'Fading cannot be reversed.',
            explanation: 'Lower light and less UV slows damage that can never be undone.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Red-green colour blindness means that:',
            options: ['Two cone types fire almost the same pattern, so those colours cannot be separated', 'The person sees only grey', 'The eyes are damaged', 'No cones are working'],
            correctIndex: 0,
            hint: 'It is about telling colours apart.',
            explanation: 'A missing or shifted cone type removes the contrast between two colours.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why do screens need exactly three colours rather than five or ten?',
            options: ['Because your eye reads colour using exactly three kinds of cone', 'Because three is cheapest', 'Because light only has three colours', 'Because paint has three primaries'],
            correctIndex: 0,
            hint: 'The answer is in the eye.',
            explanation: 'Matching the three cone signals is enough to reproduce any perceived colour.'
        }
    ]
};
