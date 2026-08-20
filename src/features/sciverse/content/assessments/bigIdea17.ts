import { AssessmentData } from '../../types';

/**
 * Big Idea 17 Assessment: "How Do Structures Stay Standing?"
 * Covers P17 (Loads & Supports), C17 (Construction Materials), B17 (Bone Structure)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea17Assessment: AssessmentData = {
    bigIdea: 17,
    title: 'How Do Structures Stay Standing?',
    subtitle: 'Loads, Materials, and Bone Strength',
    icon: '🏗️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Structural failure risk rises most when:',
            options: ['Loads are well distributed', 'Stress concentrates at weak points', 'Supports are stable', 'Geometry is braced'],
            correctIndex: 1,
            hint: 'Peaks matter.',
            explanation: 'Stress concentration often initiates structural failure.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Reinforced concrete is useful because:',
            options: ['Concrete and steel complement each other under different stresses', 'Concrete conducts electricity', 'Steel is chemically inert in all conditions', 'Rebar removes all cracking'],
            correctIndex: 0,
            hint: 'Compression vs tension roles.',
            explanation: 'Concrete and steel are paired to handle different load types.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Bone is biologically effective because it is:',
            options: ['Only solid and heavy', 'Optimized for strength, mass, and repair', 'Structurally random', 'Unchanging over life'],
            correctIndex: 1,
            hint: 'Living tissue adapts.',
            explanation: 'Bone architecture balances performance with metabolic cost.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Bone is strong but not heavy because inside it is:',
            options: ['A lightweight lattice of tiny beams', 'Completely solid all through', 'Filled with water', 'Hollow and empty'],
            correctIndex: 0,
            hint: 'Think about the spongy inner layer.',
            explanation: 'Trabecular bone forms a light internal lattice beneath the dense outer shell.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which idea links all three lessons?',
            options: ['Function follows internal structure and load context', 'Mass alone determines performance', 'Material choice is irrelevant', 'Biological tissues ignore mechanics'],
            correctIndex: 0,
            hint: 'Structure-function principle.',
            explanation: 'Engineering and biology both rely on structural design under constraints.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why are triangles used in bridge frameworks?',
            options: ['A triangle cannot change shape without a side breaking', 'Triangles are cheaper', 'Triangles look better', 'Triangles weigh nothing'],
            correctIndex: 0,
            hint: 'Try to deform a triangle versus a square.',
            explanation: 'Triangles are the only polygon that cannot deform without altering a side length.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Concrete is excellent at resisting squeezing but poor at resisting stretching. Engineers solve this by:',
            options: ['Adding steel bars, which handle the stretching', 'Making the concrete thinner', 'Using only concrete', 'Heating the concrete'],
            correctIndex: 0,
            hint: 'What material is good in tension?',
            explanation: 'Steel reinforcement carries tension while concrete carries compression.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Stress concentration means force piles up:',
            options: ['At joints and narrow points', 'Evenly everywhere', 'Only at the top', 'Only in the middle'],
            correctIndex: 0,
            hint: 'Where does the load path narrow?',
            explanation: 'Force concentrates where the path narrows, which is where failures usually begin.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'For mid-span downward loading, a typical simply supported beam has strongest tension near the:',
            options: ['Top surface', 'Bottom surface', 'Neutral axis only', 'Supports only'],
            correctIndex: 1,
            hint: 'Sagging beam pattern.',
            explanation: 'Sagging usually puts bottom fibers in tension and top in compression.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why is steel not simply used for everything?',
            options: ['It can corrode in moisture and is expensive in bulk', 'It is too weak', 'It cannot carry tension', 'It melts at room temperature'],
            correctIndex: 0,
            hint: 'Every material has trade-offs.',
            explanation: 'Steel is strong in tension but costly and vulnerable to corrosion.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Bone that is loaded regularly becomes stronger. This shows that bone is:',
            options: ['Living tissue that remodels in response to use', 'A dead mineral rod', 'Unable to change', 'Made only of calcium'],
            correctIndex: 0,
            hint: 'Think about what living cells inside bone do.',
            explanation: 'Bone cells continually rebuild the structure according to the loads it experiences.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do a truss bridge and a bone have in common?',
            options: ['Both spread load through a shaped structure instead of solid bulk', 'Both are made of steel', 'Both are completely solid', 'Neither carries any load'],
            correctIndex: 0,
            hint: 'Compare how each achieves strength without weight.',
            explanation: 'Both use geometry rather than mass to carry load efficiently.'
        }
    ]
};
