import { AssessmentData } from '../../types';

/**
 * Big Idea 8 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P8 (thermal resistances in series and the U-value), L3C8 (the dry
 * lapse rate and the cloud base), L3B8 (countercurrent heat exchange). The
 * theme across all three is heat following a path.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea8Level3Assessment: AssessmentData = {
    bigIdea: 8,
    level: 3,
    title: 'Why Does Weather Change?',
    subtitle: 'Level 3 -- Windows, Clouds and a Fox\'s Feet',
    icon: '☁️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'For layers of material one after another, in series, the thermal resistances:',
            options: ['Add up', 'Multiply together', 'Cancel each other out', 'Only the largest one counts'],
            correctIndex: 0,
            hint: 'Think of L2P7\'s resistors in series.',
            explanation: 'R total = R₁ + R₂ + R₃ + …, and the U-value is 1 / R total.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A bubble of air rising through the sky cools mainly because:',
            options: ['It expands as the pressure falls, paying for its gain in height out of its own warmth', 'It touches the colder air around it', 'It moves closer to outer space', 'It loses its water vapour'],
            correctIndex: 0,
            hint: 'Air is a very poor conductor, so touching cannot cool a large bubble quickly.',
            explanation: 'As the bubble rises it expands and gains height energy, paid from its warmth: about 9.8 °C for every kilometre.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In countercurrent exchange in a fox\'s leg, the artery and the vein:',
            options: ['Run side by side, with blood flowing in opposite directions', 'Run far apart from each other', 'Carry blood in the same direction', 'Carry air instead of blood'],
            correctIndex: 0,
            hint: 'Warm blood going down passes cold blood coming up.',
            explanation: 'Side by side and flowing opposite ways, the artery is a little warmer than the vein at every point, so heat keeps crossing over.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A U-value measures:',
            options: ['The heat flow through each square metre for each °C of temperature difference', 'The thickness of a wall', 'The density of glass', 'The dew point of the air'],
            correctIndex: 0,
            hint: 'Its unit is W/m²/°C.',
            explanation: 'U = 1 / R total, so heat flow = U x A x ΔT. A smaller U means less heat escapes.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A single-glazed window has R total = 0.174 m²·°C/W. Its U-value is about:',
            options: ['5.75 W/m²/°C', '0.174 W/m²/°C', '17.4 W/m²/°C', '1.74 W/m²/°C'],
            correctIndex: 0,
            hint: 'U is the reciprocal of R total.',
            explanation: 'U = 1 / 0.174 = 5.75 W/m²/°C. Leaving it as 0.174 gives the resistance, not the U-value.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Ground air is at 30 °C with a dew point of 14 °C. At about what height do clouds begin?',
            options: ['2,000 m', '1,630 m', '3,750 m', '125 m'],
            correctIndex: 0,
            hint: '125 m for each °C of gap.',
            explanation: 'The gap is 16 °C, and 125 x 16 = 2,000 m. Using 9.8 °C per km alone gives 1,630 m; using the temperature instead of the gap gives 3,750 m.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Blood (c = 3.6 J/g/°C) flows at 0.5 g each second and reaches paws at 0 °C with a temperature of 4 °C. How much heat is lost through the paws?',
            options: ['7.2 W', '66.6 W', '59.4 W', '2 W'],
            correctIndex: 0,
            hint: 'Only the cooling inside the paw is lost.',
            explanation: '0.5 x 3.6 x (4 − 0) = 7.2 W. The 59.4 W cooled out of the blood up the leg was handed back to the body.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Where does the dry lapse rate of about 9.8 °C per km come from?',
            options: ['Rising 1 m gains each kilogram 9.8 J, paid from air\'s heat capacity of about 1,005 J per kg per °C', 'The distance to the Sun', 'The speed of sound in air', 'The dew point of the ground air'],
            correctIndex: 0,
            hint: 'Balance m x g x h against mass x c x ΔT.',
            explanation: '9.8 / 1,005 = 0.0098 °C for each metre, which is 9.8 °C for each kilometre.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A brick wall 0.20 m thick (k = 0.7 W/m/°C) has air films of 0.13 inside and 0.04 outside. Its U-value is about:',
            options: ['2.2 W/m²/°C', '3.5 W/m²/°C', '0.46 W/m²/°C', '5.8 W/m²/°C'],
            correctIndex: 0,
            hint: 'R for the brick is d / k; then add the films.',
            explanation: 'R total = 0.13 + 0.286 + 0.04 = 0.456, so U = 1 / 0.456 = 2.2. Leaving out the films gives 3.5; not inverting gives 0.46.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Above a cloud\'s base, rising cloud air cools by only about 6 °C per km. Why?',
            options: ['Water vapour condensing into droplets releases latent heat into the air', 'The air stops expanding once it is inside a cloud', 'The cloud is warmed by being closer to the Sun', 'The dew point starts rising with height'],
            correctIndex: 0,
            hint: 'Think about L3C1: what happens when vapour turns into liquid?',
            explanation: 'Condensation releases latent heat, which pays back part of the cooling -- and helps clouds tower into storms.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why is it better for a fox standing on −10 °C snow to keep its paws near 0 °C rather than at 37 °C?',
            options: ['Heat loss grows with the temperature difference between paw and snow: 10 °C instead of 47 °C, so nearly five times less', 'Warm paws would make the fox sink into the snow', 'Cold paws grip ice better', 'The fox cannot feel its paws either way'],
            correctIndex: 0,
            hint: 'From L2P8, heat flow is proportional to ΔT.',
            explanation: '47 / 10 = 4.7. Countercurrent exchange lets the fox keep its paws that cold without chilling its body.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which statement links all three Level 3 lessons of this Big Idea?',
            options: ['Heat follows a path: through layers in series, out of rising and expanding air, and back along a leg from artery to vein', 'Heat only ever moves by radiation', 'Every layer of a wall has the same resistance', 'Air temperature never changes with height'],
            correctIndex: 0,
            hint: 'Level 2 measured single rates. What did Level 3 follow?',
            explanation: 'L3P8 added resistances along a path, L3C8 followed air as it rose and cooled, and L3B8 followed heat from artery to vein.'
        }
    ]
};
