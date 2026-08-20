import { AssessmentData } from '../../types';

/**
 * Big Idea 23 Assessment: "How Do Materials Break and Recover?"
 * Covers P23 (Stress & Fracture), C23 (Corrosion & Protection), B23 (Wound Healing)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea23Assessment: AssessmentData = {
    bigIdea: 23,
    title: 'How Do Materials Break and Recover?',
    subtitle: 'Fatigue, Corrosion, and Tissue Repair',
    icon: '🛠️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Fatigue failure can occur when:',
            options: ['Only one huge load happens', 'Many repeated smaller loads accumulate damage', 'There is no stress at all', 'Temperature is exactly constant'],
            correctIndex: 1,
            hint: 'Damage accumulation.',
            explanation: 'Repeated cyclic stress grows microcracks over time.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Corrosion is best described as:',
            options: ['A purely mechanical crack', 'An electrochemical oxidation process', 'A magnetic effect', 'A biological mutation'],
            correctIndex: 1,
            hint: 'Redox chemistry.',
            explanation: 'Corrosion involves oxidation/reduction reactions with environment.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Healthy wound healing usually requires:',
            options: ['No inflammation ever', 'Ordered phases of clotting, inflammation, and rebuilding', 'Only one cell type', 'No oxygen supply'],
            correctIndex: 1,
            hint: 'Staged process.',
            explanation: 'Repair proceeds through regulated stages and cell coordination.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Wounds heal faster when the tissue has plenty of:',
            options: ['Oxygen', 'Salt', 'Rust', 'Plastic'],
            correctIndex: 0,
            hint: 'Repair needs energy and supply.',
            explanation: 'Good oxygenation supports the cells doing the repair.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A unifying idea across this Big Idea is:',
            options: ['Failure is always instant', 'Environment and local conditions strongly control damage and recovery', 'Only age matters', 'Repair is random'],
            correctIndex: 1,
            hint: 'Local chemistry/mechanics/biology.',
            explanation: 'Material behavior depends on local stresses, chemistry, and biological state.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A bridge can fail after many small loads because repeated stress:',
            options: ['Grows tiny cracks a little at a time', 'Makes metal heavier', 'Removes gravity', 'Warms the bridge'],
            correctIndex: 0,
            hint: 'No single load has to be huge.',
            explanation: 'Fatigue grows cracks incrementally until failure.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Corrosion happens faster in conditions that are:',
            options: ['Humid and salty', 'Dry and cold', 'Dark and still', 'Completely airless'],
            correctIndex: 0,
            hint: 'Think about coastal metal.',
            explanation: 'Moisture and salt accelerate the electrochemical reactions of corrosion.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A sacrificial metal protects steel by:',
            options: ['Corroding instead of the steel', 'Making the steel heavier', 'Sealing out all air permanently', 'Melting the rust'],
            correctIndex: 0,
            hint: 'Something else corrodes first.',
            explanation: 'A more reactive metal corrodes preferentially, sparing the steel.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'The most reliable prevention strategy is usually:',
            options: ['Wait for failure', 'Combine design margin, environment control, and maintenance/monitoring', 'Increase load always', 'Remove all protective layers'],
            correctIndex: 1,
            hint: 'Multi-layer risk reduction.',
            explanation: 'Systems last longer when prevention combines design, chemistry protection, and monitoring.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Why do engineers avoid sharp internal corners in a load-bearing part?',
            options: ['Stress concentrates at sharp corners, so cracks start there', 'Sharp corners look untidy', 'Sharp corners weigh more', 'Corners attract rust only'],
            correctIndex: 0,
            hint: 'Where does force pile up?',
            explanation: 'Geometry concentrates stress, making sharp corners crack initiation sites.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Long-lasting inflammation slows healing because it:',
            options: ['Keeps the tissue in the damage-response stage instead of rebuilding', 'Removes all blood', 'Adds new bone', 'Stops oxygen being needed'],
            correctIndex: 0,
            hint: 'Healing runs in phases.',
            explanation: 'Persistent inflammation prevents progression to the repair phase.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What is the key difference between a cracked steel beam and a cut on your arm?',
            options: ['The living tissue can rebuild itself; the steel cannot', 'The steel heals faster', 'Neither can be repaired', 'Both regrow automatically'],
            correctIndex: 0,
            hint: 'Only one is alive.',
            explanation: 'Biological tissue actively regenerates; engineered materials must be repaired externally.'
        }
    ]
};
