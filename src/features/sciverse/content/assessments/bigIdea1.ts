import { AssessmentData } from '../../types';

/**
 * Big Idea 1 Assessment: "Why Do Things Move?"
 * Covers P1 (Push, Pull, Slide), C1 (Particles on the Move), B1 (Muscles & Bones)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea1Assessment: AssessmentData = {
    bigIdea: 1,
    title: 'Why Do Things Move?',
    subtitle: 'Forces, Particles & Muscles',
    icon: '🏎️',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What do you need to make a stationary crate start moving?',
            options: ['Wait long enough', 'Apply an unbalanced force', 'Make it lighter', 'Remove gravity'],
            correctIndex: 1,
            hint: 'Think about what happened when you pushed the crate in P1.',
            explanation: 'An object at rest stays at rest unless an unbalanced force acts on it — Newton\'s First Law! Just waiting won\'t do anything.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What happens to water particles when you heat water?',
            options: ['They get bigger', 'They move faster', 'They disappear', 'They change color'],
            correctIndex: 1,
            hint: 'Remember the particle animation in C1 — did the dots grow or speed up?',
            explanation: 'Heat makes particles move faster and spread apart. The particles themselves don\'t change size — that\'s a common misconception!'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'How do muscles create movement?',
            options: ['By pushing bones apart', 'By pulling (contracting)', 'By inflating with air', 'By spinning around joints'],
            correctIndex: 1,
            hint: 'In B1, what did the bicep do when you flexed your arm?',
            explanation: 'Muscles can only PULL by contracting (getting shorter). They cannot push! That\'s why muscles work in pairs — one pulls one way, the other pulls the opposite way.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What force slows a sliding crate on a rough floor?',
            options: ['Gravity', 'Friction', 'Magnetism', 'Wind'],
            correctIndex: 1,
            hint: 'What happened when you slid the crate across the rough surface?',
            explanation: 'Friction is the force between two surfaces that opposes motion. The rougher the surface, the more friction.'
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'If you heat water to 100°C, the particles escape as steam. Why?',
            options: [
                'The particles explode into smaller pieces',
                'They gain enough energy to break free from other particles',
                'Gravity stops working at 100°C',
                'The thermometer pushes them out'
            ],
            correctIndex: 1,
            hint: 'Think about what "temperature" really measures — particle energy!',
            explanation: 'At 100°C, water particles have enough kinetic energy to overcome the attraction to their neighbors and fly off as gas (steam). The particles themselves don\'t break — they just escape.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Your elbow acts as a fulcrum. If you carry a heavier backpack, what must your bicep do?',
            options: [
                'Contract with more force',
                'Relax completely',
                'Push the forearm instead of pulling',
                'Contract more slowly'
            ],
            correctIndex: 0,
            hint: 'Levers need more effort force when the load increases...',
            explanation: 'The elbow is a lever. When the load (backpack weight) increases, the bicep must pull harder (contract with more force) to lift it. The muscle still pulls — it can never push.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Friction slows the crate (P1), and particle attraction keeps water liquid (C1). What do these have in common?',
            options: [
                'Both involve invisible forces resisting motion',
                'Both only happen at high temperatures',
                'Both require gravity to work',
                'Both are caused by magnetism'
            ],
            correctIndex: 0,
            hint: 'What do friction and particle bonds both resist?',
            explanation: 'Both friction and intermolecular attraction are forces that resist motion. Friction resists sliding; particle attraction resists particles flying apart. Adding energy (heat or push) overcomes both!'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A crate on a frictionless ice rink is pushed once. What happens after the push stops?',
            options: [
                'It slows down and stops',
                'It keeps moving at the same speed forever',
                'It speeds up on its own',
                'It moves backward'
            ],
            correctIndex: 1,
            hint: 'Remember Newton\'s First Law — what happens with NO friction?',
            explanation: 'With no friction (no unbalanced force), nothing slows the crate down. It keeps moving at the same speed in the same direction — Newton\'s First Law in action!'
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A muscle contracts to lift a bone (B1), overcoming gravity (P1). Meanwhile, the muscle cells are using energy that was carried by fast-moving particles (C1). Which sequence is correct?',
            options: [
                'Particles deliver energy → muscle contracts → bone moves against gravity',
                'Bone moves → muscle contracts → particles slow down',
                'Gravity pulls muscle → particles push bone → energy appears',
                'Muscle pushes bone → particles get bigger → gravity reverses'
            ],
            correctIndex: 0,
            hint: 'Energy flows from particles to muscles to bones. What order?',
            explanation: 'Chemical energy (carried by fast-moving particles in cells) powers muscle contraction (pulling force), which moves the bone against gravity. All three disciplines connect through energy transfer!'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two crates sit on a rough floor. Crate A weighs 10 kg, Crate B weighs 20 kg. Both are pushed with the same force. Which moves faster?',
            options: [
                'Crate A (lighter)',
                'Crate B (heavier)',
                'They move at the same speed',
                'Neither moves — friction stops them both'
            ],
            correctIndex: 0,
            hint: 'Force = mass × acceleration. Same force, different mass...',
            explanation: 'With the same force, the lighter crate (A) accelerates more because a = F/m. Less mass means more acceleration for the same push. Also, lighter crate has less friction to overcome!'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A sealed container of gas is heated from 20°C to 200°C. The particles don\'t escape. What happens to the pressure inside?',
            options: [
                'Pressure stays the same',
                'Pressure increases because particles hit the walls faster',
                'Pressure decreases because particles shrink',
                'Pressure disappears because heat melts the container'
            ],
            correctIndex: 1,
            hint: 'Faster particles = harder collisions with the walls...',
            explanation: 'Heating makes particles move faster → they hit the container walls harder and more often → pressure increases. This is why sealed containers under heat can be dangerous!'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why can\'t your body move just by thinking? (Combine P1, C1, and B1 concepts)',
            options: [
                'Because the brain isn\'t connected to muscles',
                'Because movement requires a physical force (muscle contraction) powered by particle energy, not just a thought signal',
                'Because thoughts have no mass and therefore no friction',
                'Because gravity is too strong for thoughts to overcome'
            ],
            correctIndex: 1,
            hint: 'A thought is a signal, but what actually creates the force?',
            explanation: 'Your brain sends a signal, but the actual movement requires: energy from particle reactions in cells (C1) → muscle contraction creating a pulling force (B1) → overcoming friction and gravity (P1). All three work together!'
        }
    ]
};

