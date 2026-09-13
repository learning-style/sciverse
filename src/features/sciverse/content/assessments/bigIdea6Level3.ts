import { AssessmentData } from '../../types';

/**
 * Big Idea 6 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P6 (buoyancy derived from pressure with depth), L3C6 (seawater
 * density from temperature and salinity), L3B6 (Boyle's law and the swim
 * bladder's unstable balance). The theme across all three is what depth changes.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea6Level3Assessment: AssessmentData = {
    bigIdea: 6,
    level: 3,
    title: 'Why Do Things Float or Sink?',
    subtitle: 'Level 3 -- Pressure, Layers and a Balance That Runs Away',
    icon: '🐠',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Pressure in a liquid grows with depth because of:',
            options: ['The weight of the liquid above', 'The liquid getting hotter deeper down', 'The container pulling the liquid down', 'Bigger particles deeper down'],
            correctIndex: 0,
            hint: 'Picture a column of liquid standing on a patch of area.',
            explanation: 'The column above presses with its weight over its area: ρ x g x h.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Salinity measures:',
            options: ['The grams of dissolved salt in each kilogram of seawater', 'The temperature of seawater', 'The depth of seawater', 'How fast seawater flows'],
            correctIndex: 0,
            hint: 'Its unit is g/kg.',
            explanation: 'The ocean averages about 35 g of dissolved salt in every kilogram of seawater.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Boyle\'s law says that at a steady temperature, doubling the pressure on a gas:',
            options: ['Halves its volume', 'Doubles its volume', 'Leaves its volume unchanged', 'Doubles its mass'],
            correctIndex: 0,
            hint: 'p₁ x V₁ = p₂ x V₂.',
            explanation: 'If p doubles, V must halve to keep p x V the same.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Which of these is in an unstable balance?',
            options: ['A pencil standing on its point', 'A ball resting in the bottom of a bowl', 'A book lying flat on a table', 'A marble at the bottom of a cup'],
            correctIndex: 0,
            hint: 'Nudge it: does it return or fall further?',
            explanation: 'A nudged pencil falls further away from balance; a ball in a bowl rolls back.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 10 cm cube (V = 0.001 m³) is held completely under fresh water (1,000 kg/m³). The buoyant force on it is:',
            options: ['9.8 N', '1,000 N', '98,000 N', '0.98 N'],
            correctIndex: 0,
            hint: 'Buoyant force = ρ x g x V.',
            explanation: '1,000 x 9.8 x 0.001 = 9.8 N, whatever its depth.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Using density = 1,025 − 0.2 x (T − 20) + 0.8 x (S − 35), what is the density of water at 15 °C and 37 g/kg?',
            options: ['1,027.6 kg/m³', '1,022.4 kg/m³', '1,025.6 kg/m³', '1,026.0 kg/m³'],
            correctIndex: 0,
            hint: 'Work out each term with its sign.',
            explanation: 'Temperature: −0.2 x (15 − 20) = +1.0. Salt: +0.8 x (37 − 35) = +1.6. So 1,025 + 1.0 + 1.6 = 1,027.6 kg/m³.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A swim bladder holds 30 cm³ of gas at 20 m (3 atm). What volume does that gas take up at 50 m (6 atm)?',
            options: ['15 cm³', '60 cm³', '30 cm³', '12 cm³'],
            correctIndex: 0,
            hint: 'Use the pressures, not the depths.',
            explanation: '3 x 30 / 6 = 15 cm³. Using the depths instead, 30 x 20 / 50, gives the wrong 12 cm³.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Why does a swim bladder break L3P6\'s result that the buoyant force does not change with depth?',
            options: ['Its gas squeezes, so the fish\'s volume V changes with depth', 'Water is far denser at 20 m', 'Living things do not feel buoyant forces', 'The fish\'s mass changes with depth'],
            correctIndex: 0,
            hint: 'Buoyant force = ρ x g x V. Which of these changes?',
            explanation: 'L3P6 assumed a fixed volume. Gas squeezes under pressure, so V -- and the buoyant force -- fall as the fish goes deeper.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A submarine hovering at 100 m dives to 300 m. Neither the water nor its hull squeezes. The buoyant force on it:',
            options: ['Stays the same, because it depends on ρ, g and V but not on depth', 'Nearly triples', 'Doubles', 'Falls to zero'],
            correctIndex: 0,
            hint: 'Deeper water adds pressure to the top and the bottom alike.',
            explanation: 'Up on the bottom minus down on the top is ρ g H A; the depth cancels.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Water at 12 °C and 38 g/kg meets water at 8 °C and 36 g/kg. Using the model, which sinks beneath the other?',
            options: ['The 12 °C, 38 g/kg water: 1,029.0 kg/m³ against 1,028.2 kg/m³', 'The 8 °C water, because colder water is always denser', 'Neither -- they have the same density', 'The 8 °C water: 1,029.0 kg/m³ against 1,028.2 kg/m³'],
            correctIndex: 0,
            hint: 'Its extra 2 g/kg of salt is worth about 8 °C.',
            explanation: '12 °C, 38 g/kg: 1,025 + 1.6 + 2.4 = 1,029.0. 8 °C, 36 g/kg: 1,025 + 2.4 + 0.8 = 1,028.2. The warmer, saltier water is denser.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two fish hover with the same gas volume, one at 5 m and one at 95 m. Each rises 5 m. Whose swim bladder grows by the bigger share?',
            options: ['The fish at 5 m: its gas grows by 50%, against 5% for the fish at 95 m', 'The fish at 95 m, because the pressure there is higher', 'The same share, because both rose 5 m', 'Neither, because the amount of gas is fixed'],
            correctIndex: 0,
            hint: 'Boyle\'s law works in ratios of pressure.',
            explanation: 'From 5 m to the surface, 1.5 atm falls to 1.0 atm, so the volume grows by 1.5 times. From 95 m to 90 m, 10.5 atm falls to 10.0 atm: only 1.05 times.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What links all three Level 3 lessons of this Big Idea?',
            options: ['Depth changes things: pressure grows with depth, seawater density depends on temperature and salt, and gas squeezes under pressure', 'Density never changes with depth', 'The buoyant force always grows with depth', 'Salty water always sinks'],
            correctIndex: 0,
            hint: 'Level 2 compared densities at one moment. What did Level 3 add?',
            explanation: 'L3P6 derived buoyancy from pressure at depth, L3C6 layered the ocean by temperature and salt, and L3B6 followed a squeezing swim bladder down.'
        }
    ]
};
