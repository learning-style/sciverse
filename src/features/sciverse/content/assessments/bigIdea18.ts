import { AssessmentData } from '../../types';

/**
 * Big Idea 18 Assessment: "How Do Rivers Shape the Land?"
 * Covers P18 (Flow & Erosion), C18 (Dissolved Minerals), B18 (River Habitats)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea18Assessment: AssessmentData = {
    bigIdea: 18,
    title: 'How Do Rivers Shape the Land?',
    subtitle: 'Flow, River Chemistry, and Habitats',
    icon: '🌊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Faster river flow usually causes:',
            options: ['Lower transport capacity', 'Greater sediment transport capacity', 'Instant full deposition', 'No change'],
            correctIndex: 1,
            hint: 'Flow energy matters.',
            explanation: 'Higher speed generally increases sediment pickup and transport.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Clear river water can still contain:',
            options: ['No dissolved substances', 'Invisible dissolved ions', 'Only solid rocks', 'Only oxygen gas'],
            correctIndex: 1,
            hint: 'Dissolved is molecular scale.',
            explanation: 'Water can carry dissolved ions while remaining visually clear.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Different river flow zones often support:',
            options: ['Identical species communities', 'Different ecological niches', 'No organisms', 'Only one predator species'],
            correctIndex: 1,
            hint: 'Habitat conditions vary.',
            explanation: 'Flow, oxygen, and substrate differences shape species distribution.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Trout need cool water. Above about 20 degrees Celsius they:',
            options: ['Struggle to survive', 'Grow much faster', 'Change into another species', 'Stop needing oxygen'],
            correctIndex: 0,
            hint: 'Each species suits a narrow range.',
            explanation: 'Species are adapted to specific conditions and cannot simply relocate.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A flood event can influence rivers by:',
            options: ['Changing only water color', 'Changing channel shape, chemistry, and habitat together', 'Affecting chemistry only', 'Affecting biology only'],
            correctIndex: 1,
            hint: 'Connected system effects.',
            explanation: 'Floods can simultaneously alter geomorphology, concentration patterns, and ecosystems.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'On a river bend, the outer bank is usually:',
            options: ['Eroded, because the water moves fastest there', 'Built up with sand', 'Completely still', 'Frozen'],
            correctIndex: 0,
            hint: 'Where is the flow fastest around a bend?',
            explanation: 'Faster water on the outside lifts material away, cutting into the bank.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A conductivity probe in river water measures:',
            options: ['How many dissolved ions the water carries', 'The water temperature', 'The speed of the current', 'The depth of the river'],
            correctIndex: 0,
            hint: 'More dissolved minerals means a higher reading.',
            explanation: 'Dissolved ions carry electric current, so conductivity indicates their concentration.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'When a river slows down, it:',
            options: ['Drops the particles it was carrying', 'Speeds up again', 'Dissolves more rock', 'Flows uphill'],
            correctIndex: 0,
            hint: 'Slow water cannot carry heavy particles.',
            explanation: 'Reduced energy means deposition rather than transport.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'If evaporation increases while dissolved mass remains, concentration tends to:',
            options: ['Decrease to zero', 'Increase', 'Stay always fixed', 'Alternate randomly'],
            correctIndex: 1,
            hint: 'Less solvent volume.',
            explanation: 'Reducing water volume can raise dissolved concentration.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why does river water usually carry more dissolved minerals downstream than at its source?',
            options: ['It has had longer to dissolve rock along its path', 'Rain adds minerals directly', 'Minerals are made by fish', 'Downstream water is colder'],
            correctIndex: 0,
            hint: 'Chemical weathering takes time and contact.',
            explanation: 'The longer water contacts rock, the more ions it dissolves.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A dam slows a river. What happens to habitats downstream?',
            options: ['Less sediment arrives, changing the riverbed and the species it supports', 'Nothing changes', 'All fish grow larger', 'The river reverses'],
            correctIndex: 0,
            hint: 'Think about what the moving water was delivering.',
            explanation: 'Trapping sediment alters the physical habitat that species depend on.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Erosion, dissolved minerals and habitat zones are all controlled mainly by:',
            options: ['How fast the water is moving', 'The colour of the water', 'The width of the sky', 'The time of year only'],
            correctIndex: 0,
            hint: 'One physical factor threads all three lessons.',
            explanation: 'Flow speed sets erosion, contact time and the conditions each species experiences.'
        }
    ]
};
