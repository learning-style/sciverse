import { AssessmentData } from '../../types';

/**
 * Big Idea 2 Assessment: "What Is Everything Made Of?"
 * Covers P2 (States of Matter), C2 (Atoms & Molecules), B2 (Cells: Life's Bricks)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea2Assessment: AssessmentData = {
    bigIdea: 2,
    title: 'What Is Everything Made Of?',
    subtitle: 'States of Matter, Atoms & Cells',
    icon: '🧊',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What changes when ice melts into water?',
            options: ['The particles get bigger', 'The particles move more freely', 'The particles disappear', 'New particles are created'],
            correctIndex: 1,
            hint: 'Same particles — what changes about how they behave?',
            explanation: 'The particles are exactly the same! They just gain enough energy to move around more freely. Solid → liquid means particles go from locked in place to sliding past each other.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What is a molecule?',
            options: ['A tiny piece of dust', 'Two or more atoms bonded together', 'A type of cell', 'A single atom by itself'],
            correctIndex: 1,
            hint: 'Think of the LEGO analogy from C2 — atoms are individual bricks...',
            explanation: 'A molecule is two or more atoms bonded together. For example, H₂O (water) is two hydrogen atoms bonded to one oxygen atom. Atoms are the building blocks; molecules are the structures built from them.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'What is the "power plant" of a cell?',
            options: ['Nucleus', 'Cell membrane', 'Mitochondria', 'Cell wall'],
            correctIndex: 2,
            hint: 'Which organelle converts glucose into energy?',
            explanation: 'Mitochondria are the cell\'s power plants — they break down glucose molecules to release energy the cell can use. Almost every cell in your body has them!'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In which state of matter are particles packed tightly and vibrate in place?',
            options: ['Gas', 'Liquid', 'Solid', 'Plasma'],
            correctIndex: 2,
            hint: 'Think about ice — the particles barely move...',
            explanation: 'In a solid, particles are locked in a fixed pattern and can only vibrate. They don\'t have enough energy to break free and slide around.'
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Water (H₂O) and hydrogen peroxide (H₂O₂) are both made from only hydrogen and oxygen atoms. Why are they so different — one is safe to drink, but the other is dangerous?',
            options: [
                'Hydrogen peroxide has bigger atoms',
                'The atoms are arranged differently, giving different properties',
                'One is natural and one is artificial',
                'They\'re actually not that different'
            ],
            correctIndex: 1,
            hint: 'They use the exact same types of atoms — so what else could be different?',
            explanation: 'H₂O has one oxygen atom while H₂O₂ has two — same atom types, but a different arrangement creates a completely different substance! Structure determines properties.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A cell\'s membrane lets some things in and keeps others out. What is this property called?',
            options: ['Solid filtering', 'Selective permeability', 'Atom sorting', 'Random mixing'],
            correctIndex: 1,
            hint: 'The membrane is like a security guard — selective about who enters.',
            explanation: 'The cell membrane is selectively permeable — it chooses what gets in (nutrients, water) and what stays out (waste, toxins). This is essential for the cell to function properly.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'There\'s a hierarchy in nature: atoms → molecules → cells → organisms. Which statement connects P2, C2, and B2?',
            options: [
                'Atoms form molecules, which build the structures inside cells',
                'Cells are made of atoms, but molecules are not involved',
                'Organisms create atoms, which then make cells',
                'Molecules and cells are the same thing at different scales'
            ],
            correctIndex: 0,
            hint: 'Think about the zoom levels — smallest to largest...',
            explanation: 'It\'s a building hierarchy! Atoms (C2) bond to form molecules like glucose (C2). Molecules organize into structures like membranes and mitochondria inside cells (B2). States of matter (P2) determine how these particles behave.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'You squeeze a sealed balloon (gas inside). What happens to the gas particles?',
            options: [
                'They get smaller',
                'They\'re pushed closer together and hit the walls more often',
                'They slow down and stop',
                'Half of them disappear'
            ],
            correctIndex: 1,
            hint: 'Same number of particles, less space...',
            explanation: 'Squeezing the balloon reduces the volume but the same number of particles are inside. They\'re now closer together and hit the walls more frequently — this is why pressure increases when you compress a gas!'
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Glucose (C₆H₁₂O₆) enters a cell through the membrane and reaches the mitochondria. Which disciplines explain each step?',
            options: [
                'C2 explains the molecule, B2 explains the cell, P2 explains the energy state',
                'P2 explains the molecule, C2 explains the cell, B2 explains the membrane',
                'All three explain the same thing identically',
                'Only B2 is relevant — chemistry and physics don\'t apply to living things'
            ],
            correctIndex: 0,
            hint: 'Each discipline covers a different scale: molecule → cell → energy...',
            explanation: 'Chemistry (C2) explains how atoms bond into the glucose molecule. Biology (B2) explains how the cell membrane lets it in and mitochondria break it down. Physics (P2) explains the energy states of particles during the process!'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Diamond and graphite are both pure carbon. Why are they so different?',
            options: [
                'Diamond has more carbon atoms',
                'The atoms are arranged in different structures (patterns)',
                'Graphite has impurities that make it soft',
                'Diamond is compressed graphite'
            ],
            correctIndex: 1,
            hint: 'Same atoms, but think about how they\'re connected...',
            explanation: 'Both are 100% carbon! In diamond, each carbon bonds to 4 neighbors in a rigid 3D network (super hard). In graphite, carbons form flat sheets that slide over each other (soft, slippery). Arrangement determines properties!'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A red blood cell has no nucleus or mitochondria. How does this help it do its job?',
            options: [
                'It can\'t do any job without these organelles',
                'More room inside to carry oxygen (hemoglobin) — optimized for transport',
                'It runs on solar energy instead',
                'The missing parts make it lighter so it floats in blood'
            ],
            correctIndex: 1,
            hint: 'Red blood cells are delivery trucks — what cargo do they carry?',
            explanation: 'By removing the nucleus and mitochondria, the red blood cell maximizes space for hemoglobin — the protein that carries oxygen. It\'s a cell perfectly specialized for one job: oxygen transport!'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why does heating a cell too much destroy it? (Combine P2, C2, B2)',
            options: [
                'Heat has no effect on cells',
                'Excessive heat gives particles too much energy → breaks molecular bonds → destroys cell structures like membranes and proteins',
                'Heat makes the cell grow until it pops',
                'Heat creates new atoms inside the cell that are toxic'
            ],
            correctIndex: 1,
            hint: 'Think about what heat does to particles (P2), then to molecules (C2), then to cell structures (B2)...',
            explanation: 'Heat increases particle energy (P2) → molecules vibrate violently and bonds break (C2) → proteins denature and membranes rupture, killing the cell (B2). This is why fever above 42°C is dangerous — cells start breaking down!'
        }
    ]
};

