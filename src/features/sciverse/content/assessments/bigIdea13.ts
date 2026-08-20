import { AssessmentData } from '../../types';

/**
 * Big Idea 13 Assessment: "How Does Structure Shape Function?"
 * Covers P13 (Gears & Pulleys), C13 (Polymers), B13 (Photosynthesis Engine)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea13Assessment: AssessmentData = {
    bigIdea: 13,
    title: 'How Does Structure Shape Function?',
    subtitle: 'Gears, Polymers & Photosynthesis',
    icon: '🎯',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Simple machines can:',
            options: ['Create energy from nothing', 'Trade force for distance/speed', 'Eliminate work', 'Ignore friction laws'],
            correctIndex: 1,
            hint: 'Work is conserved ideally.',
            explanation: 'Machines change how force is applied; they do not create energy.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A polymer is made of:',
            options: ['Single atom only', 'Repeating monomer units', 'Only metals', 'Only ionic crystals'],
            correctIndex: 1,
            hint: 'Poly = many.',
            explanation: 'Polymers are long chains/networks of repeating monomers.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Most plant mass comes primarily from:',
            options: ['Soil minerals only', 'CO2 from the air (plus water)', 'Sunlight particles as matter', 'Nitrogen gas directly'],
            correctIndex: 1,
            hint: 'Carbon source matters.',
            explanation: 'Carbon in biomass is largely fixed from atmospheric CO2.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Which leaf structure lets gases move in and out?',
            options: ['Stomata', 'Roots', 'Bark', 'Seeds'],
            correctIndex: 0,
            hint: 'Think about the tiny openings shown in B13.',
            explanation: 'Stomata are adjustable pores that let carbon dioxide in and oxygen and water vapour out.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A larger driven gear connected to a smaller driver generally gives:',
            options: ['More speed, less torque', 'Less speed, more torque', 'Same speed and torque', 'No rotation'],
            correctIndex: 1,
            hint: 'Tooth ratio controls speed trade-off.',
            explanation: 'Higher gear ratio increases torque while reducing rotational speed.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Compared with heavily branched polymer chains, straighter chains usually:',
            options: ['Pack less efficiently', 'Pack more tightly and can be denser', 'Cannot form solids', 'Always dissolve in water'],
            correctIndex: 1,
            hint: 'Think arrangement like stacked pencils.',
            explanation: 'Linear chains can pack tightly, often increasing density/strength.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'In photosynthesis, oxygen released mainly comes from:',
            options: ['CO2 splitting', 'Water splitting reactions', 'Soil nitrates', 'Chlorophyll breakdown'],
            correctIndex: 1,
            hint: 'Photolysis step.',
            explanation: 'Oxygen gas in photosynthesis is produced from water molecules.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A gear train, a polymer chain, and a leaf all show that:',
            options: ['How something is built decides what it can do', 'Bigger is always better', 'Structure and function are unrelated', 'Only living things have structure'],
            correctIndex: 0,
            hint: 'Read the Big Idea 13 question again.',
            explanation: 'In each case the arrangement of parts - teeth, chains, cells - determines the behaviour.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Common idea across this Big Idea is:',
            options: ['Structure has little effect', 'System architecture controls performance and output', 'Only mass matters', 'Energy cannot transfer'],
            correctIndex: 1,
            hint: 'Gears, polymer chains, chloroplast arrangements.',
            explanation: 'Configuration strongly controls behavior in mechanical, chemical, and biological systems.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'For an ideal pulley with 3 supporting rope segments, required force is about:',
            options: ['Same as load', 'Half the load', 'One-third the load', 'Three times the load'],
            correctIndex: 2,
            hint: 'Load shared across supporting segments.',
            explanation: 'Ideal mechanical advantage approximates number of supporting segments.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Cross-linking in polymers often makes materials:',
            options: ['More fluid', 'More networked and tougher', 'Always biodegradable instantly', 'Unable to bond'],
            correctIndex: 1,
            hint: 'Links between chains limit sliding.',
            explanation: 'Cross-links form network structures that increase rigidity/toughness.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A machine lets you lift a heavy load with a small force. What is the trade-off?',
            options: ['You must pull a much longer distance', 'You get energy for free', 'The load becomes lighter', 'Friction disappears'],
            correctIndex: 0,
            hint: 'Work = force x distance, and it is conserved.',
            explanation: 'Machines trade force against distance; the total work done cannot be reduced.'
        }
    ]
};
