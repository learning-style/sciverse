import { AssessmentData } from '../../types';

/**
 * Big Idea 6 Assessment: "Why Do Things Float or Sink?"
 * Covers P6 (Density & Buoyancy), C6 (Mixtures & Separation), B6 (How Fish Breathe)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea6Assessment: AssessmentData = {
    bigIdea: 6,
    title: 'Why Do Things Float or Sink?',
    subtitle: 'Density, Mixtures & Fish Respiration',
    icon: '🎯',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A steel marble and a beach ball are the same size. Why does the marble sink while the beach ball floats?',
            options: ['The marble is shinier', 'The marble has greater density — more mass packed into the same volume', 'The beach ball is afraid of water', 'Heavier objects always sink regardless of size'],
            correctIndex: 1,
            hint: 'Think about how tightly packed the material is inside each object...',
            explanation: 'Density = mass ÷ volume. The steel marble has much more mass crammed into the same space, making its density higher than water. The beach ball is mostly air, so its overall density is lower than water — it floats!',
            optionExplanations: [
                'Shininess has nothing to do with floating or sinking — a shiny aluminium foil boat floats just fine!',
                'Correct! Density = mass ÷ volume. The steel marble packs much more mass into the same space.',
                'Objects don\'t have feelings! Whether something floats depends on its physical properties, not emotions.',
                'Not quite — a massive steel ship floats despite being incredibly heavy. It\'s not weight alone, it\'s how much mass is packed into the space (density).'
            ]
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A handful of sand is dropped into water. The sand sinks and stays separate. Is this a mixture or a compound?',
            options: ['A compound, because two things are combined', 'A chemical reaction', 'Neither — it\'s a new substance', 'A mixture — the sand and water keep their own properties and can be separated'],
            correctIndex: 3,
            hint: 'Can you get the sand back by filtering? If so, what does that tell you?',
            explanation: 'It\'s a mixture! The sand and water don\'t chemically bond — they keep their individual properties. You can separate them easily with a filter. In a compound, the ingredients chemically join and can\'t be separated by simple physical methods.',
            optionExplanations: [
                'In a compound, the ingredients chemically bond and form something new (like hydrogen + oxygen → water). Sand and water haven\'t bonded — you can still see the sand sitting there separately!',
                'A chemical reaction would create a new substance with different properties. The sand and water are unchanged — no new substance formed.',
                'It IS something recognisable — it\'s two substances physically mixed together. You can still see and separate both the sand and the water.',
                'Correct! The sand and water keep their own properties and can be easily separated by filtering.'
            ]
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Fish need oxygen to live, but they don\'t breathe air. How do they get oxygen?',
            options: ['They hold their breath for their entire life', 'They come to the surface every few minutes', 'They use gills to extract dissolved oxygen from water', 'They make their own oxygen inside their body'],
            correctIndex: 2,
            hint: 'Look at the side of a fish\'s head — what flaps open and shut?',
            explanation: 'Fish pass water over their gills, which are packed with thin blood vessels. Dissolved oxygen in the water crosses into the blood, and carbon dioxide crosses out. It\'s like lungs, but designed for water instead of air!',
            optionExplanations: [
                'Fish need a continuous supply of oxygen — no animal can hold its breath for its entire life! They have a dedicated breathing system.',
                'Some animals do this (like dolphins and whales), but they\'re mammals with lungs, not fish. Fish stay underwater and breathe using a different organ.',
                'Correct! Gills extract dissolved oxygen directly from water as it flows over them.',
                'Animals cannot make their own oxygen. They must take it from their environment — either from air or from water.'
            ]
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'You dissolve salt in water and want to get the salt back. Which separation technique works best?',
            options: ['Evaporation — boil off the water and the salt crystals remain', 'Filtering with a coffee filter', 'Using a magnet', 'Freezing the mixture'],
            correctIndex: 0,
            hint: 'The salt is dissolved — it passes right through a filter. What if you removed the water itself?',
            explanation: 'Since salt is fully dissolved, it passes through filters. But if you evaporate the water (by heating), the water turns to steam and leaves the salt crystals behind. This is how sea salt is harvested from ocean water!',
            optionExplanations: [
                'Correct! Evaporation removes the water as steam, leaving solid salt crystals behind.',
                'Dissolved salt particles are far too small to be caught by a filter — they pass right through with the water. Filtering only works for undissolved solids.',
                'Salt is not magnetic! Magnets only attract certain metals like iron, nickel, and cobalt.',
                'Freezing the water would trap the salt in ice. While some salt separates during freezing, it\'s not an efficient or complete method.'
            ]
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A solid block of iron sinks in water. Yet massive iron ships float. How is this possible?',
            options: ['Ship iron is lighter than block iron', 'The ship\'s hollow shape displaces enough water so the buoyant force equals its weight', 'Ships have secret air tanks that pull them up', 'The ocean is denser than pool water'],
            correctIndex: 1,
            hint: 'Think about the SHAPE — a ship spreads its mass over a huge volume...',
            explanation: 'A ship\'s hull is shaped to displace a large volume of water. The buoyant force equals the weight of displaced water (Archimedes\' principle). By spreading its mass over a huge volume, the ship\'s average density (including air inside) is less than water — so it floats!',
            optionExplanations: [
                'The iron in a ship is the exact same material as a block of iron — same density. The difference is the shape, not the iron itself.',
                'Correct! The hollow shape gives the ship a huge volume, making its average density (iron + air inside) less than water.',
                'Ships don\'t have secret mechanisms. They float due to physics — specifically the shape displacing enough water to create sufficient buoyant force.',
                'Ocean salt water is slightly denser than fresh water, but that small difference isn\'t why massive ships float. A ship floats in both fresh and salt water because of its shape.'
            ]
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Oil floats on water and they don\'t mix. How would you best separate them?',
            options: ['Evaporation', 'Filtering through paper', 'Skimming — the oil sits on top so you can scoop or pour it off', 'Adding more water'],
            correctIndex: 2,
            hint: 'The oil naturally rises to the top. What\'s the simplest way to remove something sitting on the surface?',
            explanation: 'Oil is less dense than water, so it floats on top forming a separate layer. Skimming (pouring or scooping off the top layer) is the easiest separation method. Filtering won\'t work because both are liquids that pass through paper.',
            optionExplanations: [
                'Evaporation would remove the water, but it would also leave the oil behind as a mess. It\'s slow, energy-intensive, and doesn\'t cleanly separate both liquids.',
                'Both oil and water are liquids — they\'d both flow through the filter paper. Filtering works for separating solids from liquids, not two immiscible liquids.',
                'Correct! Since oil floats on top naturally, you can simply scoop or pour it off the surface.',
                'Adding more water would just increase the volume — the oil would still float on top. It doesn\'t help separate them at all.'
            ]
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Cold mountain streams often hold more fish than warm ponds. Why?',
            options: ['Fish prefer mountain scenery', 'Cold water holds more dissolved oxygen than warm water', 'Mountains have more fish food', 'Warm ponds have too much light'],
            correctIndex: 1,
            hint: 'Think about what happens to gas in a warm soda vs a cold soda...',
            explanation: 'Cold water can hold more dissolved oxygen than warm water (just like a cold soda keeps its fizz longer). More dissolved oxygen means fish can breathe more easily, supporting larger populations. Warm water holds less oxygen, stressing fish.',
            optionExplanations: [
                'Fish don\'t have preferences for scenery! Their populations depend on physical and chemical conditions in the water.',
                'Correct! Cold water dissolves more oxygen, just like a cold fizzy drink holds its bubbles longer than a warm one.',
                'Mountain streams don\'t necessarily have more food — they often have less organic matter. The key factor is dissolved oxygen.',
                'Light levels don\'t directly limit fish populations. The critical factor is how much oxygen is dissolved in the water, which depends on temperature.'
            ]
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A submarine adjusts ballast tanks to rise or sink. Which science concept explains this?',
            options: ['Magnetism pulling it down', 'The propeller pushes it up or down', 'Water pressure crushes it smaller', 'Changing the sub\'s average density by flooding or emptying tanks changes whether it floats or sinks'],
            correctIndex: 3,
            hint: 'When tanks fill with water the sub gets heavier WITHOUT getting bigger...',
            explanation: 'Flooding ballast tanks adds mass without changing volume → density increases above water\'s → sub sinks. Blowing water out with compressed air reduces mass → density drops below water\'s → sub rises. It\'s density control in action!',
            optionExplanations: [
                'Submarines are not magnetic devices. Magnetism is not how they control their depth — it\'s about density.',
                'Propellers push the submarine forward or backward, not up or down. Depth is controlled by changing the sub\'s density.',
                'Water pressure does increase with depth, but it doesn\'t significantly change the sub\'s size. The sub controls depth by adjusting its own density.',
                'Correct! Flooding tanks increases mass (same volume) → higher density → sinks. Emptying tanks decreases mass → lower density → rises.'
            ]
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An object weighs 10 N in air but only 6 N when submerged in water. What is the buoyant force acting on it?',
            options: ['4 N — the difference between the weight in air and the apparent weight in water', '6 N', '10 N', '16 N'],
            correctIndex: 0,
            hint: 'Buoyant force = weight in air − apparent weight in water.',
            explanation: 'Buoyant force = 10 N − 6 N = 4 N. This 4 N upward push equals the weight of water displaced by the object (Archimedes\' principle). The object feels lighter in water because the water pushes back up on it.',
            optionExplanations: [
                'Correct! 10 N − 6 N = 4 N upward buoyant force.',
                '6 N is the apparent weight in water (what the scale reads), not the buoyant force. The buoyant force is what\'s making it feel lighter.',
                '10 N is the object\'s full weight in air. If the buoyant force were 10 N, the object would feel weightless in water — but it still weighs 6 N there.',
                '16 N would be the sum of the two weights, but buoyant force is the difference. The water pushes UP, reducing the apparent weight — not adding to it.'
            ]
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'You have a mixture of sand, salt, and iron filings. What is the correct order of steps to separate ALL three?',
            options: ['Filter → evaporate → magnet', 'Evaporate → filter → magnet', 'Magnet → dissolve in water & filter → evaporate', 'Heat until everything melts, then cool slowly'],
            correctIndex: 2,
            hint: 'Start with the easiest separation first. Which component responds to a magnet?',
            explanation: 'Step 1: Magnet removes iron filings. Step 2: Add water — salt dissolves, sand doesn\'t — filter to remove sand. Step 3: Evaporate water to recover salt crystals. Each step exploits a different physical property!',
            optionExplanations: [
                'If you filter first (before dissolving salt), you\'d remove both sand AND salt together since neither is dissolved yet. You need to use the magnet first to get iron out.',
                'Evaporating first wouldn\'t help — you\'d just dry out the mixture without separating anything. The salt needs to be dissolved in water first to separate it from sand.',
                'Correct! Magnet gets iron, then dissolve salt in water and filter out sand, then evaporate to recover salt.',
                'Melting requires extremely high temperatures and would mix everything together when cooled. Physical separation techniques are much more practical.'
            ]
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Fish gills have a counter-current system — blood flows opposite to the water passing over the gills. Why is this efficient?',
            options: ['It keeps the fish swimming forward', 'It filters out parasites', 'It prevents water from entering the bloodstream', 'It maintains a concentration gradient along the entire gill, maximising oxygen absorption'],
            correctIndex: 3,
            hint: 'If both flowed the same way, the oxygen difference would equalise halfway. What if they flow in opposite directions?',
            explanation: 'In counter-current flow, blood always meets water with a HIGHER oxygen concentration at every point along the gill. This sustained gradient extracts up to 80-90% of dissolved oxygen — far more efficient than if blood and water flowed the same direction (which would plateau at ~50%).',
            optionExplanations: [
                'The counter-current system is about gas exchange, not swimming. The fish\'s tail and fins provide the propulsion for swimming.',
                'Gills are not designed to filter parasites — they\'re for gas exchange (absorbing oxygen, releasing CO₂). The immune system handles parasites.',
                'Some water does cross membranes by osmosis, but the main purpose of counter-current flow is to maximise oxygen absorption, not prevent water entry.',
                'Correct! Opposite flow directions maintain an oxygen concentration gradient across the entire gill surface, extracting up to 80-90% of dissolved oxygen.'
            ]
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'The Dead Sea is so salty that people float effortlessly. Which combination of concepts best explains this?',
            options: ['High salt concentration increases water density, so the buoyant force on a human body exceeds body weight', 'The water is warmer, and warm water pushes harder', 'Salt water is slippery, reducing friction', 'Minerals in the water create a magnetic field that lifts people'],
            correctIndex: 0,
            hint: 'What does adding salt do to the DENSITY of the water? And what does Archimedes say about buoyant force?',
            explanation: 'Dissolved salt increases water density (~1.24 g/cm³ vs ~1.0 for fresh water). According to Archimedes\' principle, buoyant force = weight of displaced liquid. Denser liquid = more weight displaced per unit volume = stronger upward push. Since Dead Sea water is denser than the human body (~1.06 g/cm³), people float with ease!',
            optionExplanations: [
                'Correct! Salty water is denser, so it pushes up harder (greater buoyant force), and since it\'s denser than the human body, people float effortlessly.',
                'Temperature has very little effect on buoyancy. In fact, warm water is slightly LESS dense, which would reduce buoyancy, not increase it.',
                'Friction and slipperiness don\'t explain floating. Floating depends on buoyant force vs weight — which comes down to density comparisons.',
                'Water doesn\'t create magnetic fields that lift people. Magnetism has nothing to do with floating — it\'s all about density and buoyant force.'
            ]
        },
    ]
};

