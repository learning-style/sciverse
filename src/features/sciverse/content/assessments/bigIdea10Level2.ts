import { AssessmentData } from '../../types';

/**
 * Big Idea 10 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P10 (efficiency, power and kWh from solar panels), L2C10 (mass of
 * CO2 = mass of carbon x 44/12), L2B10 (species richness and Simpson's index).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea10Level2Assessment: AssessmentData = {
    bigIdea: 10,
    level: 2,
    title: 'How Do We Protect Our Planet?',
    subtitle: 'Level 2 -- Solar Panels, CO₂ from Fuel and Diversity',
    icon: '🌍',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A solar panel\'s efficiency is:',
            options: ['Useful power out divided by power in', 'Power in divided by useful power out', 'Power multiplied by time', 'The area of the panel'],
            correctIndex: 0,
            hint: 'It is the share of what goes in that comes out as something useful.',
            explanation: 'efficiency = useful power out / power in. A 20% panel turns 0.20 of the arriving sunlight into electricity; most of the rest becomes heat.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'When a fuel burns completely, the carbon in it becomes:',
            options: ['Carbon dioxide, CO₂, by joining oxygen from the air', 'Nothing -- burning destroys the carbon', 'Pure oxygen', 'Water vapour'],
            correctIndex: 0,
            hint: 'Matter is never created or destroyed.',
            explanation: 'Each carbon atom joins two oxygen atoms from the air to make CO₂. The hydrogen in the fuel is what becomes water vapour.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Species richness is:',
            options: ['The number of species in a place', 'How evenly the plants are shared among the species', 'The number of plants of the commonest species', 'The chance that two picks are the same species'],
            correctIndex: 0,
            hint: 'It counts kinds, not individuals.',
            explanation: 'Richness is the count of species. Evenness -- how evenly individuals are shared -- is the other half of diversity.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'One kilowatt-hour (kWh) is:',
            options: ['The energy delivered by 1 kW running for 1 hour', 'A power of 1 kW', 'The energy delivered by 1 W running for 1 hour', 'The time a 1 kW panel can run'],
            correctIndex: 0,
            hint: 'Energy = power x time.',
            explanation: '1 kW x 1 hour = 1 kWh. A kW measures how fast energy is delivered; a kWh measures how much.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 2 m² panel with an efficiency of 20% faces sunlight of 1,000 W on each m². What electrical power does it give?',
            options: ['400 W', '2,000 W', '200 W', '10,000 W'],
            correctIndex: 0,
            hint: 'Sunlight on each m² x area x efficiency.',
            explanation: '1,000 x 2 x 0.20 = 400 W. 2,000 W is the sunlight arriving; 200 W forgets the area; 10,000 W divides by the efficiency.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'How much CO₂ does 6 kg of carbon make when it burns completely?',
            options: ['22 kg', '6 kg', '1.6 kg', '16 kg'],
            correctIndex: 0,
            hint: 'mass of CO₂ = mass of carbon x 44 / 12.',
            explanation: '6 x 44 / 12 = 22 kg. 1.6 kg uses 12 / 44 the wrong way round, and 16 kg is only the oxygen that joins the carbon.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A meadow has 2 species, with 50 plants of each. What is its Simpson\'s diversity index, D?',
            options: ['0.5', '0.25', '0', '1'],
            correctIndex: 0,
            hint: 'Square each share, add, and take the total from 1.',
            explanation: 'Each share is 0.5, and 0.5² = 0.25. The chance of a match is 0.25 + 0.25 = 0.5, so D = 1 − 0.5 = 0.5. Adding the shares without squaring gives 0.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A panel gives 0.34 kW in full sun. How much energy does it deliver in 5 full-sun hours?',
            options: ['1.7 kWh', '0.068 kWh', '5.34 kWh', '340 kWh'],
            correctIndex: 0,
            hint: 'Energy in kWh = power in kW x time in hours.',
            explanation: '0.34 x 5 = 1.7 kWh. 0.068 divides by the hours, and 340 uses watts where kilowatts belong.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A home uses 15 kWh a day, in a place with 5 full-sun hours. Each panel gives 0.34 kW in full sun. How many panels does it need?',
            options: ['9 panels', '8 panels', '3 panels', '45 panels'],
            correctIndex: 0,
            hint: 'Find one panel\'s energy in a day first.',
            explanation: 'One panel: 0.34 x 5 = 1.7 kWh a day. 15 / 1.7 = 8.8, rounded up to 9. Eight would fall short; 3 is 15 / 5, and 45 leaves out the hours.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: '20 kg of petrol, 86% carbon, burns completely. How much oxygen from the air joins its carbon?',
            options: ['About 46 kg', 'About 63 kg', '17.2 kg', 'None, because the CO₂ can weigh no more than the fuel'],
            correctIndex: 0,
            hint: 'Find the carbon, then the CO₂, then take the carbon away.',
            explanation: 'Carbon = 20 x 0.86 = 17.2 kg. CO₂ = 17.2 x 44 / 12 = 63.1 kg. Oxygen = 63.1 − 17.2 = 45.9 kg. 63 kg is all the CO₂.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Meadow X has 5 species: 60 plants of one, and 10 each of the other four. Meadow Y has 3 species: 34, 33 and 33 plants. Which is more diverse by Simpson\'s index?',
            options: ['Meadow Y: D = 0.67 against X\'s 0.60, even though Y has fewer species', 'Meadow X, because it has 5 species against 3', 'Meadow X: 0.40 against Y\'s 0.33', 'Neither: both have 100 plants, so they are equal'],
            correctIndex: 0,
            hint: 'Work out the chance of a match for each, then take it from 1.',
            explanation: 'X: 0.36 + 4 x 0.01 = 0.40, so D = 0.60. Y: 0.1156 + 2 x 0.1089 = 0.333, so D = 0.67. The 0.40 and 0.33 are the chances of a match, not D.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A car burns 1,000 litres of petrol a year, at about 2.3 kg of CO₂ for each litre. A tree storing 10 kg of carbon a year takes 36.7 kg of CO₂ from the air. About how many such trees would take up the car\'s CO₂?',
            options: ['About 63', 'About 230', 'About 27', 'About 6'],
            correctIndex: 0,
            hint: 'Find the car\'s CO₂ for the year, then divide by one tree\'s CO₂.',
            explanation: '1,000 x 2.3 = 2,300 kg, and 2,300 / 36.7 = 63 trees. 230 divides by the tree\'s carbon instead of its CO₂; 27 divides litres by kilograms.'
        }
    ]
};
