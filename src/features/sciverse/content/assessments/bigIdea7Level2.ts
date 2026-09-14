import { AssessmentData } from '../../types';

/**
 * Big Idea 7 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P7 (charge, current, voltage, resistance, I = V / R), L2C7
 * (electrode potentials and cell voltage), L2B7 (electrocytes in series and
 * the water's resistance). The theme across all three is voltage as a
 * difference, series stacking, and I = V / R.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea7Level2Assessment: AssessmentData = {
    bigIdea: 7,
    level: 2,
    title: 'How Does Electricity Work?',
    subtitle: 'Level 2 -- Bulbs, Metals and an Electric Eel',
    icon: '⚡',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'One ampere means:',
            options: ['One coulomb of charge flowing past a point each second', 'One joule of energy for each coulomb', 'One volt for each ohm of resistance', 'One electron flowing past a point each second'],
            correctIndex: 0,
            hint: 'Current is charge each second.',
            explanation: '1 A = 1 coulomb per second. A coulomb is the charge of about 6.24 x 10¹⁸ electrons.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Standard electrode potentials are all measured compared with:',
            options: ['A standard hydrogen electrode, set at 0.00 V', 'A copper electrode', 'The ground under the laboratory', 'An AA battery'],
            correctIndex: 0,
            hint: 'A voltage always needs a frame of reference.',
            explanation: 'Every value in the table is a difference from the standard hydrogen electrode, which is given 0.00 V by agreement.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The voltage of a living cell is measured:',
            options: ['Inside the cell compared with outside it', 'Between two different animals', 'Only after the cell has died', 'Outside the body compared with the air'],
            correctIndex: 0,
            hint: 'Which two places are being compared?',
            explanation: 'A cell at rest might be −85 mV: its inside is 85 thousandths of a volt below its outside.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'What happens to the voltages of cells joined in series?',
            options: ['They add up', 'They stay the same as one cell', 'They cancel each other out', 'They are multiplied by the current'],
            correctIndex: 0,
            hint: 'Think of batteries lined up end to end in a torch.',
            explanation: 'Cells in series add their voltages, like steps on a staircase: two 1.10 V cells give 2.20 V.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 9.0 V battery is connected to a 3 Ω resistor. The current is:',
            options: ['3.0 A', '27 A', '0.33 A', '12 A'],
            correctIndex: 0,
            hint: 'I = V / R.',
            explanation: '9.0 / 3 = 3.0 A. Multiplying gives 27; dividing the other way gives 0.33.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'What is the voltage of a zinc (−0.76 V) and silver (+0.80 V) cell under standard conditions?',
            options: ['1.56 V', '0.04 V', '−1.56 V', '0.61 V'],
            correctIndex: 0,
            hint: 'The + metal minus the − metal.',
            explanation: 'Silver is the + end: 0.80 − (−0.76) = 1.56 V. Adding the two gives 0.04 V; putting zinc first gives −1.56 V.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'One face of an electrocyte fires to +65 mV while its other face stays at −85 mV. The voltage across the whole cell is:',
            options: ['150 mV', '−20 mV', '20 mV', '65 mV'],
            correctIndex: 0,
            hint: 'A voltage is a difference.',
            explanation: '+65 − (−85) = 150 mV, or 0.15 V. Adding the two gives −20 mV.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Two 6 Ω bulbs in series on 3.0 V each turn a quarter as much energy into light and heat every second as one bulb does. Why a quarter?',
            options: ['Each bulb gets half the voltage and half the current', 'Each bulb gets half the voltage, and nothing else changes', 'The battery\'s voltage falls to a quarter', 'Bulbs in series use up electrons'],
            correctIndex: 0,
            hint: 'Energy each second = volts x amps.',
            explanation: 'One bulb: 3.0 V x 0.50 A = 1.5 W. In series: 1.5 V x 0.25 A = 0.375 W, a quarter.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two 6 Ω bulbs are wired in parallel to a 3.0 V battery. How much current does the battery supply?',
            options: ['1.0 A', '0.25 A', '0.50 A', '2.0 A'],
            correctIndex: 0,
            hint: 'Each branch gets the full voltage.',
            explanation: 'Each branch carries 3.0 / 6 = 0.50 A, and the branch currents add at the battery: 1.0 A.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A red LED needs about 1.8 V. Which of these would light it under standard conditions?',
            options: ['One magnesium–copper cell (2.71 V)', 'One zinc–copper cell (1.10 V)', 'One iron–copper cell (0.78 V)', 'A cell with two copper electrodes'],
            correctIndex: 0,
            hint: 'Work out each cell voltage and compare with 1.8 V.',
            explanation: 'Only magnesium–copper reaches 1.8 V on its own. Two copper electrodes give 0.00 V, because the metals are identical.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'An electric ray in seawater releases 50 V through a path of about 10 Ω. About how much current flows?',
            options: ['5 A', '500 A', '0.2 A', '0.08 A'],
            correctIndex: 0,
            hint: 'I = V / R.',
            explanation: '50 / 10 = 5 A. The same 50 V through a 600 Ω river path would drive only about 0.08 A.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does a river eel need a far higher voltage than a seawater ray?',
            options: ['River water has a much higher resistance, so a much bigger voltage is needed to drive a useful current', 'River water is colder than seawater', 'The eel\'s cells are weaker than the ray\'s', 'Seawater contains no ions'],
            correctIndex: 0,
            hint: 'Current = voltage / resistance. Which differs between the two waters?',
            explanation: 'Dissolved salt gives seawater many ions and a low resistance. In a high-resistance river, only a big voltage drives much current.'
        }
    ]
};
