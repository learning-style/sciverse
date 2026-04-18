import { AssessmentData } from '../../types';

/**
 * Big Idea 3 Assessment: "Where Does Energy Come From?"
 * Covers P3 (Energy Ramp), C3 (Chemical Reactions), B3 (Food Chains)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea3Assessment: AssessmentData = {
    bigIdea: 3,
    title: 'Where Does Energy Come From?',
    subtitle: 'Energy Transfers, Reactions & Food Chains',
    icon: '⚡',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A ball at the top of a ramp has lots of potential energy. What happens to that energy as it rolls down?',
            options: ['It disappears', 'It transforms into kinetic (motion) energy', 'It stays as potential energy', 'It turns into light'],
            correctIndex: 1,
            hint: 'Watch the energy bars in P3 — as height decreases, what increases?',
            explanation: 'As the ball rolls down, potential energy (stored due to height) transforms into kinetic energy (motion). Energy is never created or destroyed — it just changes form!'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Mixing baking soda and vinegar makes the container feel cold. What type of reaction is this?',
            options: ['Exothermic (releases heat)', 'Endothermic (absorbs heat)', 'Nuclear', 'No reaction at all'],
            correctIndex: 1,
            hint: 'If it feels cold, is heat being released or absorbed?',
            explanation: 'An endothermic reaction absorbs heat energy from the surroundings, making everything around it feel colder. The energy goes INTO the chemical bonds being formed.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Where does the energy in a food chain originally come from?',
            options: ['The soil', 'The sun', 'Water', 'The animals'],
            correctIndex: 1,
            hint: 'What do plants need that comes from the sky?',
            explanation: 'ALL energy in food chains starts from the sun! Plants capture sunlight through photosynthesis and convert it to chemical energy (glucose). Every animal eating those plants is using energy that started as sunlight.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A ball rolling on a rough surface gradually slows. Where did its kinetic energy go?',
            options: ['It was destroyed', 'It turned into heat from friction', 'It went back to potential energy', 'It\'s still there but invisible'],
            correctIndex: 1,
            hint: 'Feel the ground where something has been sliding — is it warmer?',
            explanation: 'Friction converts kinetic energy into thermal energy (heat). The ball slows because its motion energy is being "used up" warming the surface. Energy is conserved — just changed to heat!'
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Grass captures 1000 J of energy from the sun. A rabbit eats the grass. Roughly how much energy does the rabbit get?',
            options: ['1000 J (all of it)', '100 J (about 10%)', '500 J (half)', '10 J (1%)'],
            correctIndex: 1,
            hint: 'Remember the 10% rule from the food chain lesson...',
            explanation: 'Only about 10% of energy transfers to the next level. The grass uses 90% for its own life processes (growing, breathing). The rabbit only gets ~100 J out of the original 1000 J.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Rusting iron feels warm. Baking soda + vinegar feels cold. What determines whether a reaction is exothermic or endothermic?',
            options: [
                'Whether it involves metals or not',
                'Whether breaking old bonds takes more energy than forming new bonds, or less',
                'The color of the chemicals',
                'How fast you mix them'
            ],
            correctIndex: 1,
            hint: 'Energy is spent breaking old bonds and released forming new ones. Which is bigger?',
            explanation: 'If forming new bonds releases MORE energy than it costs to break old bonds → exothermic (extra energy escapes as heat). If breaking old bonds costs MORE → endothermic (reaction absorbs heat from surroundings).'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Photosynthesis (B3) is an endothermic reaction (C3) that converts light into stored potential energy (P3). Which statement is correct?',
            options: [
                'Plants absorb sunlight energy and store it in glucose bonds',
                'Plants release energy as light when they grow',
                'Photosynthesis destroys energy to make glucose',
                'Plants don\'t need energy because they make their own food'
            ],
            correctIndex: 0,
            hint: 'Endothermic means absorbs energy. Where does that energy end up?',
            explanation: 'Photosynthesis absorbs light energy (endothermic — C3) and stores it as chemical potential energy in glucose bonds (P3). This is how the sun\'s energy enters the food chain (B3). All three disciplines describe the same process!'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A bouncing ball never bounces back to its original height. Does this violate conservation of energy?',
            options: [
                'Yes — energy is clearly being destroyed',
                'No — some energy converts to heat and sound on each bounce',
                'No — the ball is creating energy on the way down',
                'Yes — the ball should bounce forever'
            ],
            correctIndex: 1,
            hint: 'Listen to the ball bounce — that sound is energy...',
            explanation: 'No violation! Each bounce converts some kinetic energy to heat (deformation) and sound (air vibrations). Total energy is conserved — it just spreads into forms that don\'t help the ball bounce higher.'
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why are there usually more rabbits than foxes in an ecosystem?',
            options: [
                'Foxes are lazier and don\'t reproduce as much',
                'Each level has less available energy, so fewer organisms can be supported',
                'Rabbits are smaller so more fit in the same space',
                'Foxes eat too many different foods'
            ],
            correctIndex: 1,
            hint: 'Only 10% of energy passes to the next level...',
            explanation: 'The 10% energy rule means each higher level has much less energy to support life. Grass has 1000 J → rabbits share 100 J → foxes share only 10 J. Less energy = fewer organisms can survive at higher levels!'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A campfire burns wood. Connect all three disciplines: P3, C3, B3.',
            options: [
                'Wood stores chemical PE from photosynthesis (B3); burning is exothermic (C3); heat + light released are kinetic energy transformations (P3)',
                'Fire creates energy from nothing (P3); wood is not involved (C3); campfire is part of a food chain (B3)',
                'Only chemistry explains fire; physics and biology are unrelated',
                'The fire is endothermic because you need a match to start it'
            ],
            correctIndex: 0,
            hint: 'Trace the energy: sun → tree → wood → fire. Which discipline covers each step?',
            explanation: 'The tree captured sunlight via photosynthesis and stored it in wood (B3). Burning breaks those chemical bonds — exothermic reaction releasing heat and light (C3). The energy transforms from chemical potential to thermal and radiant energy (P3). Full circle!'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Your body is 37°C. You use a cold pack (endothermic reaction) on a sprain. Where does the heat energy flow?',
            options: [
                'From the cold pack into your body',
                'From your swollen tissue into the cold pack (which absorbs it)',
                'The cold pack creates coldness from nothing',
                'Heat doesn\'t flow — temperature is just a number'
            ],
            correctIndex: 1,
            hint: 'Endothermic means absorbs heat. Heat flows from hot to cold...',
            explanation: 'The endothermic chemical reaction in the cold pack absorbs heat from its surroundings (your swollen tissue). Heat flows from your warm skin INTO the pack, making the area feel cold and reducing swelling.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Earth receives energy from the sun but doesn\'t keep getting infinitely hotter. Why? (Use all three Big Idea 3 concepts)',
            options: [
                'Earth destroys the excess energy',
                'Energy comes in as light, transforms through ecosystems and reactions, and radiates back into space as heat — it\'s a balance',
                'The sun doesn\'t actually send much energy',
                'Gravity prevents the energy from reaching Earth\'s surface'
            ],
            correctIndex: 1,
            hint: 'Energy in must equal energy out for temperature to stay stable...',
            explanation: 'Sunlight arrives (P3: radiant energy) → plants capture some for food chains (B3) → chemical reactions transform it (C3) → ultimately everything becomes heat that radiates back to space. Earth is in energy BALANCE — not getting infinitely hotter because output matches input!'
        }
    ]
};

