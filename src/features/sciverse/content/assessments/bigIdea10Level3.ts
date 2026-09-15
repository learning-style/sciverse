import { AssessmentData } from '../../types';

/**
 * Big Idea 10 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P10 (power in the wind = 1/2 x rho x A x v^3; average the power, not
 * the speed), L3C10 (ppm by molecules, 1 ppm = 7.8 billion tonnes of CO2, the
 * airborne fraction), L3B10 (species-area relationship S = c x A^z).
 *
 * The distractors are the mistakes each lesson works through: v squared, the
 * missing half, averaging the speed, ppm by mass, one square root instead of
 * two, and species falling in step with area.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea10Level3Assessment: AssessmentData = {
    bigIdea: 10,
    level: 3,
    title: 'How Do We Protect Our Planet?',
    subtitle: 'Level 3 -- Wind Power, the Airborne Fraction and Habitat Loss',
    icon: '🌲',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In power in the wind = ½ x ρ x A x v³, why is the speed cubed?',
            options: ['Faster wind brings more air each second, and each kilogram of that air carries energy that grows with v²', 'Because wind moves in three dimensions', 'Because a turbine has three blades', 'Because kinetic energy is ½ x m x v³'],
            correctIndex: 0,
            hint: 'Count where v comes in: the air arriving, and the energy of each kilogram.',
            explanation: 'Mass each second is ρ x A x v, and each kilogram carries ½ x v². Together: ½ x ρ x A x v³.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'When CO₂ in the air is measured in ppm, the ppm counts:',
            options: ['CO₂ molecules in every million molecules of air', 'Grams of CO₂ in every million grams of air', 'Tonnes of CO₂ released for every million people', 'Kilograms of CO₂ above each square metre'],
            correctIndex: 0,
            hint: 'Is it a share by number or by mass?',
            explanation: 'ppm is a share by number of molecules. That is why turning it into tonnes needs the mole.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In the species-area relationship S = c x A^z, S stands for:',
            options: ['The number of species found in an area of size A', 'The size of the area', 'The share of species lost', 'How fast species disappear'],
            correctIndex: 0,
            hint: 'A is the area; what is counted in it?',
            explanation: 'S is the number of species found when an area A is counted. It grows with the area, but more and more slowly.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'The airborne fraction is:',
            options: ['The CO₂ that stays in the air, divided by the CO₂ released', 'The CO₂ released, divided by the CO₂ that stays in the air', 'The share of the air that is CO₂', 'The share of the CO₂ taken up by the ocean'],
            correctIndex: 0,
            hint: 'It is a share of what was released.',
            explanation: 'airborne fraction = CO₂ that stays in the air / CO₂ released. Today it is about half.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A turbine sweeps 20 m² in air of density 1.2 kg/m³. The wind blows at 5 m/s. What is the power in the wind?',
            options: ['1,500 W', '300 W', '3,000 W', '60 W'],
            correctIndex: 0,
            hint: '½ x 1.2 x 20 first, then multiply by 5³.',
            explanation: '½ x 1.2 x 20 = 12, and 12 x 125 = 1,500 W. 300 W uses v², 3,000 W leaves out the ½, and 60 W uses v alone.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'The CO₂ in the air rises by 2 ppm in a year. Using 1 ppm = 7.8 billion tonnes, how much CO₂ stayed in the air?',
            options: ['15.6 billion tonnes', '2 billion tonnes', '3.9 billion tonnes', '10.3 billion tonnes'],
            correctIndex: 0,
            hint: 'Multiply the rise in ppm by the tonnes for each ppm.',
            explanation: '2 x 7.8 = 15.6 billion tonnes. 3.9 divides instead of multiplying, and 10.3 treats ppm as a share by mass.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'With z = 0.25, a habitat shrinks to one sixteenth of its area. What share of its species remain?',
            options: ['Half', 'One sixteenth', 'A quarter', 'None'],
            correctIndex: 0,
            hint: 'Take the square root twice.',
            explanation: '√(1/16) = 1/4, and √(1/4) = 1/2. A quarter takes the square root only once; one sixteenth makes species fall in step with area.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'The wind speed doubles, from 5 m/s to 10 m/s. The power in the wind:',
            options: ['Rises 8 times', 'Doubles', 'Rises 4 times', 'Stays the same'],
            correctIndex: 0,
            hint: 'Power goes with v³.',
            explanation: '2³ = 2 x 2 x 2 = 8. For a 10 m² turbine, 750 W becomes 6,000 W.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A 10 m² turbine in air of 1.2 kg/m³ has 12 hours of wind at 2 m/s and 12 hours at 10 m/s. Which is true?',
            options: ['The average power is 3,024 W, more than twice the 1,296 W at the average speed of 6 m/s', 'The average power is 1,296 W, the power at the average speed', 'The average power is 6,048 W', 'The average power is 3,024 W, less than the power at 6 m/s'],
            correctIndex: 0,
            hint: 'Work out the power at each speed, then average the powers.',
            explanation: 'At 2 m/s: 6 x 8 = 48 W. At 10 m/s: 6 x 1,000 = 6,000 W. Average: (48 + 6,000) / 2 = 3,024 W. At 6 m/s: 6 x 216 = 1,296 W. Average the power, not the speed.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A millionth of the atmosphere\'s mass is about 5.15 billion tonnes. Why is 1 ppm of CO₂ about 7.8 billion tonnes instead?',
            options: ['ppm counts molecules, and a CO₂ molecule (44 g/mol) is heavier than an average air molecule (29 g/mol)', 'CO₂ is a greenhouse gas, so it has extra mass', 'CO₂ sinks to the bottom of the atmosphere', 'The mass of the atmosphere is not known'],
            correctIndex: 0,
            hint: 'Compare the molar mass of CO₂ with that of air.',
            explanation: 'A millionth of the molecules, each 44/29 times as heavy as an average air molecule: 5.15 x 44 / 29 = 7.8 billion tonnes.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A conservation plan must keep 80% of a forest\'s species. With z = 0.25, about what share of the forest\'s area must be kept?',
            options: ['About 41%', '80%', 'About 64%', 'About 95%'],
            correctIndex: 0,
            hint: 'Rearrange: area share = (species share)⁴.',
            explanation: '0.8 x 0.8 = 0.64, and 0.64 x 0.64 = 0.41. 64% raises to the power 2 only; 95% is 0.8^0.25, which goes the wrong way.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'In a hot, dry year, people release the same CO₂ as usual, but the CO₂ in the air rises faster. What is the best explanation?',
            options: ['Droughts and fires weaken the land sink, so a larger share of the CO₂ released stays in the air', 'Hot air holds more molecules in each ppm', 'The ocean gives out all the CO₂ it has ever stored', 'Sunlight makes extra CO₂ in hot years'],
            correctIndex: 0,
            hint: 'Which part of the carbon budget changes with the weather?',
            explanation: 'Emissions were unchanged, so the sinks must have taken up less. Drought slows plant growth and fires release carbon, so the airborne fraction rises.'
        }
    ]
};
