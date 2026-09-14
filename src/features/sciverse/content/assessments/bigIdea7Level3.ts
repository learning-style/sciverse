import { AssessmentData } from '../../types';

/**
 * Big Idea 7 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P7 (emf and internal resistance), L3C7 (the Nernst equation for a
 * Daniell cell), L3B7 (equilibrium potentials in nerve cells). The theme
 * across all three is what sets a real voltage.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea7Level3Assessment: AssessmentData = {
    bigIdea: 7,
    level: 3,
    title: 'How Does Electricity Work?',
    subtitle: 'Level 3 -- Internal Resistance, Nernst and the Nerve Cell',
    icon: '🔋',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A battery\'s emf is:',
            options: ['The voltage with no current flowing: the energy its chemistry gives each coulomb', 'The largest current it can supply', 'The resistance of its insides', 'The voltage across one bulb'],
            correctIndex: 0,
            hint: 'Think about what you would measure if nothing were connected.',
            explanation: 'The emf, ε, is the chemistry\'s push. Once current flows, some of it is lost inside, so the terminal voltage is lower.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'In the Nernst equation for a Daniell cell, Q stands for:',
            options: ['[Zn²⁺] / [Cu²⁺]: the ion being made over the ion being used up', 'The charge in coulombs', 'The standard voltage, 1.10 V', 'The mass of zinc left'],
            correctIndex: 0,
            hint: 'The square brackets mean the concentration of.',
            explanation: 'Q = [Zn²⁺] / [Cu²⁺]. It is 1 under standard conditions and grows as the cell runs.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A potassium ion, K⁺, carries:',
            options: ['A positive charge', 'A negative charge', 'No charge at all', 'A charge that changes from cell to cell'],
            correctIndex: 0,
            hint: 'Look at the sign written after the K.',
            explanation: 'K⁺ is a potassium atom that has lost one electron. Potassium leaving a cell therefore makes the inside negative.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Which of these has a voltage set by a ratio of ion concentrations?',
            options: ['Both a Daniell cell and a resting nerve cell', 'Only a Daniell cell', 'Only a nerve cell', 'Neither -- voltages depend only on the metals used'],
            correctIndex: 0,
            hint: 'Where did the Nernst equation appear?',
            explanation: 'The same equation gives a Daniell cell\'s voltage from Q and a nerve cell\'s balancing voltages from outside and inside concentrations.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A battery with ε = 1.50 V and r = 0.15 Ω is driving 1.0 A. Its terminal voltage is:',
            options: ['1.35 V', '1.50 V', '0.15 V', '1.65 V'],
            correctIndex: 0,
            hint: 'V = ε − I x r.',
            explanation: '1.50 − 1.0 x 0.15 = 1.35 V. 0.15 V is only the voltage lost inside; adding it gives 1.65 V.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A Daniell cell has [Zn²⁺] = 1.0 mol/L and [Cu²⁺] = 0.010 mol/L. At 25 °C (E° = 1.10 V, n = 2), its voltage is about:',
            options: ['1.04 V', '1.16 V', '0.98 V', '1.10 V'],
            correctIndex: 0,
            hint: 'Q = 100, and 0.0592 / 2 = 0.0296.',
            explanation: 'E = 1.10 − 0.0296 x log 100 = 1.10 − 0.059 = 1.04 V. Forgetting to divide by n gives 0.98 V; adding gives 1.16 V.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'With 5 mM potassium outside a nerve cell and 140 mM inside, potassium\'s balancing voltage at 37 °C is about:',
            options: ['−89 mV', '+89 mV', '−28 mV', '−140 mV'],
            correctIndex: 0,
            hint: 'E = 61.5 x log (outside / inside).',
            explanation: '61.5 x log (5 / 140) = 61.5 x (−1.447) = −89 mV. Turning the ratio upside down gives +89 mV.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'L3P7 and L3C7 both explain a falling battery voltage. How are they different?',
            options: ['Internal resistance makes the voltage sag while current flows; the Nernst equation makes the emf itself fade as the ions change over the battery\'s life', 'They are the same effect with two names', 'Internal resistance matters only once the battery is dead', 'The Nernst equation applies only to nerve cells'],
            correctIndex: 0,
            hint: 'One depends on the current; the other on the chemistry.',
            explanation: 'V = ε − I x r falls whenever a large current flows. E = E° − 0.0296 log Q falls as zinc ions build up and copper ions run out.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'One battery gives 1.47 V at 0.20 A and 1.35 V at 1.00 A. Its internal resistance is:',
            options: ['0.15 Ω', '0.12 Ω', '7.35 Ω', '1.35 Ω'],
            correctIndex: 0,
            hint: 'Divide the change in voltage by the change in current.',
            explanation: '(1.47 − 1.35) / (1.00 − 0.20) = 0.12 / 0.80 = 0.15 Ω. 7.35 Ω is 1.47 / 0.20, the outside load in the first reading.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A Daniell cell started with 1.0 mol/L of each ion and has used 99% of its copper ions. Its voltage is about:',
            options: ['1.03 V', '0.01 V', '0.55 V', '1.10 V'],
            correctIndex: 0,
            hint: '[Zn²⁺] = 1.99, [Cu²⁺] = 0.01, so Q = 199.',
            explanation: 'E = 1.10 − 0.0296 x log 199 = 1.10 − 0.068 = 1.03 V. The voltage stays nearly flat until the copper ions are almost gone.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Potassium outside heart cells rises from 5 mM to 10 mM, with 140 mM inside. Why is this dangerous?',
            options: ['Potassium\'s balancing voltage rises to about −70 mV, moving the resting voltage towards the firing threshold', 'The inside becomes more negative, so the cells can never fire', 'Potassium ions block every nerve signal', 'The heart cells run out of ATP'],
            correctIndex: 0,
            hint: 'Work out 61.5 x log (10 / 140).',
            explanation: 'The balance moves from −89 mV to about −70 mV. The resting voltage follows it towards the threshold, so cells fire at the wrong moments.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does a living nerve cell\'s battery not run flat the way a Daniell cell does?',
            options: ['Sodium–potassium pumps, powered by ATP, keep pushing the ions back and restoring the concentrations', 'Nerve cells contain no ions', 'Its voltage does not depend on concentrations', 'Nerve cells are made of zinc and copper'],
            correctIndex: 0,
            hint: 'What would happen to the concentrations if nothing restored them?',
            explanation: 'Like L3C7\'s cell, the concentrations would run down. The pumps use ATP from L3B3 to keep recharging the ion differences.'
        }
    ]
};
