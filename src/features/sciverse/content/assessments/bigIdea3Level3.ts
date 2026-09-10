import { AssessmentData } from '../../types';

/**
 * Big Idea 3 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P3 (entropy and the heat-engine ceiling), L3C3 (bond energies and
 * activation energy), L3B3 (ATP, and where muscle's 25% comes from).
 *
 * The last two questions are the payoff of writing the three together: muscle
 * beats the heat-engine ceiling, so it is not a heat engine, and its 25% is
 * built from two chemical catches instead.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea3Level3Assessment: AssessmentData = {
    bigIdea: 3,
    level: 3,
    title: 'Where Does Energy Come From?',
    subtitle: 'Level 3 -- Entropy, Bond Energies and ATP',
    icon: '🔋',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The second law of thermodynamics says the total entropy of an isolated system:',
            options: ['Never decreases', 'Always stays exactly the same', 'Always decreases', 'Can rise or fall freely'],
            correctIndex: 0,
            hint: 'Organised energy scatters and does not gather itself back up.',
            explanation: 'Entropy counts arrangements. Scattered energy has vastly more of them, so the total never goes down.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Breaking a chemical bond always:',
            options: ['Costs energy', 'Releases energy', 'Costs energy only for weak bonds', 'Releases energy only in fuels'],
            correctIndex: 0,
            hint: 'Pulling two attracted atoms apart is like separating magnets.',
            explanation: 'Breaking costs and making releases, with no exceptions. "Energy stored in bonds" is backwards.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'ATP is best described as:',
            options: ['The small change a cell spends on its jobs', 'A fuel a cell burns in one step', 'A single high-energy bond', 'Heat stored in muscle'],
            correctIndex: 0,
            hint: 'Glucose is the banknote.',
            explanation: 'Glucose is broken into ATP-sized packets of about 30 to 50 kJ/mol, matched to the size of cellular jobs.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Why must temperatures be in kelvin in 1 − Tc/Th?',
            options: ['Celsius has an arbitrary zero, so a ratio of Celsius temperatures means nothing', 'Kelvin numbers are larger and easier to divide', 'The formula was written in kelvin by convention only', 'Celsius cannot describe hot engines'],
            correctIndex: 0,
            hint: 'Try an engine exhausting at 0 °C.',
            explanation: 'On Celsius that engine would come out 100% efficient -- a perfect machine conjured out of a choice of scale.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'An engine takes heat at 1,000 K and exhausts at 400 K. Its maximum efficiency is:',
            options: ['60%', '40%', '250%', '100%'],
            correctIndex: 0,
            hint: 'Subtract the ratio from 1.',
            explanation: '1 − 400/1,000 = 0.60. The 40% is Tc/Th, the share that must be dumped.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'H₂ + Cl₂ → 2HCl. H–H is 436, Cl–Cl is 243 and H–Cl is 432 kJ/mol. ΔH is:',
            options: ['−185 kJ', '+185 kJ', '+247 kJ', '−1,543 kJ'],
            correctIndex: 0,
            hint: 'Breaking is the cost, making is the release -- and two H–Cl bonds form.',
            explanation: '679 − 864 = −185 kJ. +247 comes from forming only one H–Cl bond.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: '30 ATP at 30.5 kJ/mol are made from glucose releasing 2,870 kJ/mol. The share caught is about:',
            options: ['32%', '915%', '68%', '3%'],
            correctIndex: 0,
            hint: 'Divide what is caught by the whole.',
            explanation: '30 x 30.5 = 915 kJ, and 915 / 2,870 = 0.32. The 68% is the heat.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Why does natural gas need a match, when burning releases energy overall?',
            options: ['Bonds must break before new ones form, and breaking costs energy -- the activation energy', 'The gas has no energy until the match supplies it', 'The match provides the energy the flame gives out', 'Oxygen only reacts when it is hot'],
            correctIndex: 0,
            hint: 'Look at the climb in the energy profile.',
            explanation: 'The match pays the entry fee. Once bonds form, their release breaks the next bonds and the flame sustains itself.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A ship draws heat from the sea and returns cooler water, burning no fuel. It obeys conservation of energy. Why can it not work?',
            options: ['It has no cold side, so 1 − Tc/Th = 0 however much heat the sea holds', 'The sea does not contain enough heat', 'Energy would be destroyed in the propeller', 'Salt water cannot carry heat'],
            correctIndex: 0,
            hint: 'Energy and useful energy are different quantities.',
            explanation: 'Hot and cold sides are both at sea temperature, so the ceiling is zero. It is a perpetual motion machine of the second kind.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Bond energies give hydrogen about 122 kJ/g; a calorimeter gives about 142 kJ/g. Why?',
            options: ['The calorimeter lets the steam condense, releasing latent heat the bond calculation leaves out', 'The calorimeter is faulty', 'Bond energies ignore how light hydrogen is', 'Hydrogen burns more completely in a calorimeter'],
            correctIndex: 0,
            hint: 'In which state does the bond calculation make the water?',
            explanation: '36 g of water condensing releases about 81 kJ more. (486 + 81) / 4 = 142 kJ/g.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A heat engine at body temperature (310 K into 300 K) could reach only about 3%, yet muscle reaches about 25%. What follows?',
            options: ['Muscle is not a heat engine -- it turns chemical energy into work directly', 'The 25% measurement must be wrong', 'Muscle breaks the second law of thermodynamics', 'The ceiling does not apply to anything alive'],
            correctIndex: 0,
            hint: 'Can any heat engine beat its own ceiling?',
            explanation: 'No heat engine can, so muscle cannot be one. It never routes energy through heat, and still obeys the second law.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Where does muscle\'s roughly 25% efficiency actually come from?',
            options: ['About half of glucose\'s energy caught in ATP, then about half of that turned into movement', 'The heat-engine ceiling at body temperature', 'The 10% rule between food chain levels', 'The fraction of sunlight a leaf captures'],
            correctIndex: 0,
            hint: 'Two catches in a row.',
            explanation: 'In a real cell ATP gives about 50 kJ/mol, so about 52% is caught; muscle proteins turn about half of that into work. 0.52 x 0.5 is about 26%.'
        }
    ]
};
