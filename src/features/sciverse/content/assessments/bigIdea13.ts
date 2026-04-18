import { AssessmentData } from '../../types';

export const bigIdea13Assessment: AssessmentData = {
    bigIdea: 13,
    title: 'How Does Structure Shape Function?',
    subtitle: 'Gears, Polymers & Photosynthesis',
    icon: '🎯',
    questions: [
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
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A larger driven gear connected to a smaller driver generally gives:',
            options: ['More speed, less torque', 'Less speed, more torque', 'Same speed and torque', 'No rotation'],
            correctIndex: 1,
            hint: 'Tooth ratio controls speed trade-off.',
            explanation: 'Higher gear ratio increases torque while reducing rotational speed.'
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Compared with heavily branched polymer chains, straighter chains usually:',
            options: ['Pack less efficiently', 'Pack more tightly and can be denser', 'Cannot form solids', 'Always dissolve in water'],
            correctIndex: 1,
            hint: 'Think arrangement like stacked pencils.',
            explanation: 'Linear chains can pack tightly, often increasing density/strength.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'In photosynthesis, oxygen released mainly comes from:',
            options: ['CO2 splitting', 'Water splitting reactions', 'Soil nitrates', 'Chlorophyll breakdown'],
            correctIndex: 1,
            hint: 'Photolysis step.',
            explanation: 'Oxygen gas in photosynthesis is produced from water molecules.'
        },
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Common idea across this Big Idea is:',
            options: ['Structure has little effect', 'System architecture controls performance and output', 'Only mass matters', 'Energy cannot transfer'],
            correctIndex: 1,
            hint: 'Gears, polymer chains, chloroplast arrangements.',
            explanation: 'Configuration strongly controls behavior in mechanical, chemical, and biological systems.'
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'For an ideal pulley with 3 supporting rope segments, required force is about:',
            options: ['Same as load', 'Half the load', 'One-third the load', 'Three times the load'],
            correctIndex: 2,
            hint: 'Load shared across supporting segments.',
            explanation: 'Ideal mechanical advantage approximates number of supporting segments.'
        },
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Cross-linking in polymers often makes materials:',
            options: ['More fluid', 'More networked and tougher', 'Always biodegradable instantly', 'Unable to bond'],
            correctIndex: 1,
            hint: 'Links between chains limit sliding.',
            explanation: 'Cross-links form network structures that increase rigidity/toughness.'
        }
    ]
};
