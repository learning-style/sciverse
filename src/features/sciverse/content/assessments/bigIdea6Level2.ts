import { AssessmentData } from '../../types';

/**
 * Big Idea 6 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P6 (fraction under water), L2C6 (density of a solution and
 * float-sink sorting), L2B6 (average density and the swim bladder). The theme
 * across all three is average density compared with liquid density.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea6Level2Assessment: AssessmentData = {
    bigIdea: 6,
    level: 2,
    title: 'Why Do Things Float or Sink?',
    subtitle: 'Level 2 -- Icebergs, Salt Water and Swim Bladders',
    icon: '🧊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A floating object pushes aside:',
            options: ['Its own weight of liquid', 'Its own volume of liquid', 'Half its weight of liquid', 'No liquid at all'],
            correctIndex: 0,
            hint: 'Archimedes: buoyant force = weight of liquid pushed aside.',
            explanation: 'Floating still, the buoyant force (up) balances the weight (down), so the liquid pushed aside weighs the same as the object.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'In salt water, the solute is:',
            options: ['The salt', 'The water', 'The container', 'The air above it'],
            correctIndex: 0,
            hint: 'The solute is the substance that gets dissolved.',
            explanation: 'Salt is the solute; water, the substance it spreads through, is the solvent.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A swim bladder helps a fish hover because the gas in it:',
            options: ['Adds volume but almost no mass', 'Adds mass but no volume', 'Is denser than water', 'Makes the fish breathe faster'],
            correctIndex: 0,
            hint: 'Average density = total mass / total volume.',
            explanation: 'Gas has so little mass it counts as zero, so it lowers the average density until it matches the water.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'What decides whether an object floats in a liquid?',
            options: ['Its average density compared with the liquid\'s density', 'Its weight alone', 'Its shape alone', 'How deep the liquid is'],
            correctIndex: 0,
            hint: 'Think of the ship, the iceberg and the fish.',
            explanation: 'An object floats if the density of the whole object, air or gas included, is less than the liquid\'s.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A block with a density of 0.45 g/cm³ floats in fresh water (1.00 g/cm³). What fraction of it is under water?',
            options: ['0.45', '0.55', '2.2', '1.45'],
            correctIndex: 0,
            hint: 'Object density over liquid density.',
            explanation: '0.45 / 1.00 = 0.45, so 45% is under water. 0.55 is the part above; 2.2 turns the fraction upside down.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: '200 g of salt dissolved in 1,000 g of water makes 1,070 cm³ of solution. Its density is about:',
            options: ['1.12 g/cm³', '1.20 g/cm³', '0.89 g/cm³', '1.07 g/cm³'],
            correctIndex: 0,
            hint: 'Total mass over measured volume.',
            explanation: '1,200 g / 1,070 cm³ = 1.12 g/cm³. Dividing by 1,000 cm³ ignores the volume the salt added and gives 1.20.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A 2,000 g fish has a body density of 1.07 g/cm³ and lives in fresh water (1.00 g/cm³). About how much gas must its swim bladder hold to hover?',
            options: ['About 131 cm³', 'About 1,869 cm³', 'About 140 cm³', 'About 82 cm³'],
            correctIndex: 0,
            hint: 'Body volume = mass / density; total needed = mass / water density.',
            explanation: 'Body: 2,000 / 1.07 = 1,869 cm³. Needed: 2,000 cm³. Gas: 2,000 − 1,869 = 131 cm³. 82 cm³ would be right in seawater.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which two quantities are both worked out as total mass divided by total volume?',
            options: ['The density of salt water and a fish\'s average density', 'Weight and buoyant force', 'The fraction under water and the load line', 'Filtration and evaporation'],
            correctIndex: 0,
            hint: 'Look for mixtures of more than one material.',
            explanation: 'Salt water is salt plus water; a fish is body plus gas. Each density is the whole mass over the whole volume.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A barge floats 2.05 m deep in seawater (1.025 g/cm³). It moves into fresh water (1.000 g/cm³) with the same load. Its hull has straight sides. About how deep is it now?',
            options: ['About 2.10 m', 'About 2.00 m', 'Still 2.05 m', 'About 1.95 m'],
            correctIndex: 0,
            hint: 'Less dense water holds a floating object lower.',
            explanation: 'It must push aside the same weight of water, and fresh water is less dense, so more volume: 2.05 x 1.025 / 1.000 = 2.10 m.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why can PET (1.38 g/cm³) and PVC (1.40 g/cm³) not be separated in a tank of salt water?',
            options: ['Salt water saturates at about 1.20 g/cm³, less dense than both plastics', 'Salt reacts with PVC', 'Both plastics dissolve in salt water', 'Salt water is less dense than fresh water'],
            correctIndex: 0,
            hint: 'How dense can salt water get?',
            explanation: 'At 20 °C, 1,000 g of water saturates at about 360 g of salt, giving 1.20 g/cm³. Both plastics sink, and the liquid would need to fall between 1.38 and 1.40.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A fish hovering in seawater (1.025 g/cm³) swims into a river of fresh water (1.000 g/cm³) and its swim bladder stays the same size. It:',
            options: ['Sinks, because its average density is now more than the water\'s', 'Rises, because fresh water is lighter', 'Keeps hovering, because its average density has not changed', 'Floats up to the surface'],
            correctIndex: 0,
            hint: 'Its average density stays 1.025 g/cm³. What about the water?',
            explanation: 'Its average density is unchanged at 1.025 g/cm³, now more than the river\'s 1.000, so it sinks unless it adds gas.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A ship, an iceberg and a hovering fish all obey which statement?',
            options: ['Each pushes aside liquid weighing the same as itself -- the ship and iceberg partly under water, the fish fully', 'Each sinks until it touches the bottom', 'Each is denser than the liquid around it', 'Each needs salt water to float'],
            correctIndex: 0,
            hint: 'Floating still means balanced forces.',
            explanation: 'Buoyant force (up) = weight (down) for all three. The ship and iceberg reach it part-way under; the fish, with density equal to the water\'s, reaches it fully under.'
        }
    ]
};
