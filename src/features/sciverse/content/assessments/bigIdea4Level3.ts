import { AssessmentData } from '../../types';

/**
 * Big Idea 4 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P4 (v = sqrt(B / rho), Newton and Laplace), L3C4 (Rayleigh
 * scattering and survival along a path), L3B4 (stacked Weber steps and the
 * logarithm). The theme across all three is the power in each law.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea4Level3Assessment: AssessmentData = {
    bigIdea: 4,
    level: 3,
    title: 'How Do We Sense the World?',
    subtitle: 'Level 3 -- Square Roots, Fourth Powers and Logarithms',
    icon: '🎚️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In v = √(B / ρ) for the speed of sound, B is:',
            options: ['The bulk modulus: how hard the material pushes back when squeezed', 'The density of the material', 'The wavelength of the sound', 'The temperature of the material'],
            correctIndex: 0,
            hint: 'It is measured in pascals.',
            explanation: 'B is the stiffness, pressure change divided by the fraction of volume lost. ρ is the density.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Rayleigh scattering by air molecules grows as:',
            options: ['1 / λ⁴', '1 / λ', 'λ²', 'The same for every wavelength'],
            correctIndex: 0,
            hint: 'A shaken electron, acceleration squared, and acceleration growing as f².',
            explanation: 'Scattered power ∝ (f²)² = f⁴, which is 1 / λ⁴ because f = c / λ.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'log 1,000 equals:',
            options: ['3', '100', '30', '0.001'],
            correctIndex: 0,
            hint: 'Ten to what power gives 1,000?',
            explanation: '10³ = 1,000, so log 1,000 = 3.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Which of these is a logarithmic scale?',
            options: ['The decibel scale, where every 10 decibels is ten times the intensity', 'A ruler marked in centimetres', 'A kitchen scale in grams', 'A thermometer in °C'],
            correctIndex: 0,
            hint: 'On a logarithmic scale, equal steps mean equal ratios.',
            explanation: 'Each 10 decibels multiplies the intensity by 10, matching a sense that counts ratios.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Water has B = 2.2 x 10⁹ Pa and ρ = 1,000 kg/m³. The speed of sound in water is about:',
            options: ['1,483 m/s', '2,200,000 m/s', '0.00067 m/s', '344 m/s'],
            correctIndex: 0,
            hint: 'Divide B by ρ, then take the square root.',
            explanation: 'B / ρ = 2,200,000 m²/s², and √2,200,000 = 1,483 m/s. Forgetting the root gives 2,200,000.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'How many times as strongly does air scatter violet light (400 nm) as red light (700 nm)?',
            options: ['About 9.4', 'About 1.75', 'About 3.1', 'About 0.11'],
            correctIndex: 0,
            hint: 'Longer wavelength over shorter, to the fourth power.',
            explanation: '(700 / 400)⁴ = 1.75⁴ = 9.4. Squaring only gives 3.1; upside down gives 0.11.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'With k = 0.1, how many just noticeable steps make a sound ten times as intense?',
            options: ['About 24', '10', '100', 'About 0.04'],
            correctIndex: 0,
            hint: 'n = log 10 / log 1.1.',
            explanation: 'log 10 = 1 and log 1.1 = 0.0414, so n = 1 / 0.0414 = 24, wherever the ten-fold increase happens.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Breathing helium makes a voice sound squeaky mainly because:',
            options: ['Sound travels about 2.9 times faster in helium, so the frequencies the throat boosts (f = v / λ) rise', 'The vocal folds buzz 2.9 times faster', 'Helium is stiffer than steel', 'Helium scatters the low frequencies away'],
            correctIndex: 0,
            hint: 'The size of the throat fixes λ.',
            explanation: 'Helium is far less dense than air, so v is higher. With λ fixed by the throat, f = v / λ goes up.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Newton calculated about 290 m/s for sound in air by taking its stiffness to equal its pressure. Why was he about 15% too low?',
            options: ['A sound wave squeezes air too fast for the heat of squeezing to escape, so the air pushes back about 1.4 times harder', 'He used the density of water by mistake', 'Air is not a gas at high frequencies', 'Sound travels faster at night'],
            correctIndex: 0,
            hint: 'Squeezed air warms up.',
            explanation: 'Laplace showed the stiffness is 1.4 x 101,000 Pa = 141,000 Pa, and √(141,000 / 1.20) = 343 m/s.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Clean air scatters 3.6% of red light out of the beam per overhead thickness. What fraction survives 20 thicknesses?',
            options: ['About 0.48', 'About 0.28', 'About 0.72', 'About 0.036'],
            correctIndex: 0,
            hint: 'Each thickness keeps the same share of whatever is left.',
            explanation: '0.964²⁰ = 0.48. Subtracting 20 x 3.6% gives 0.28, which wrongly takes 3.6% of the original beam every time.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Brightness has k = 0.08. A lamp spans a range of 10,000 times. About how many noticeable steps does it have?',
            options: ['About 120', '50', 'About 125,000', 'About 3.3'],
            correctIndex: 0,
            hint: 'log 10,000 = 4, and divide by log 1.08.',
            explanation: 'n = 4 / 0.0334 = 120. Dividing by k instead gives 50; treating steps as equal amounts gives 125,000.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which change multiplies its result by the largest factor?',
            options: ['Halving the wavelength of light, for Rayleigh scattering', 'Multiplying a material\'s stiffness by 100, for the speed of sound', 'Doubling the density of a material, for the speed of sound', 'Doubling the frequency of a sound, for its wavelength'],
            correctIndex: 0,
            hint: 'Look at the power in each law.',
            explanation: 'Halving λ multiplies 1 / λ⁴ by 16. A hundred times the stiffness gives only 10 times the speed; doubling density gives 0.71; doubling f halves λ.'
        }
    ]
};
