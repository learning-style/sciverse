import { AssessmentData } from '../../types';

/**
 * Big Idea 8 Assessment: "Why Does Weather Change?"
 * Covers P8 (Heat Transfer), C8 (The Water Cycle), B8 (Animal Adaptations)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea8Assessment: AssessmentData = {
    bigIdea: 8,
    title: 'Why Does Weather Change?',
    subtitle: 'Heat Transfer, Water Cycle & Adaptations',
    icon: '🎯',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'You touch a metal spoon in hot soup and it burns your hand. What type of heat transfer is this?',
            options: ['Radiation', 'Convection', 'Conduction — heat moves through direct contact between materials', 'Evaporation'],
            correctIndex: 2,
            hint: 'The heat travels through the solid spoon from the hot end to your hand...',
            explanation: 'Conduction is heat transfer through direct contact. The soup heats the submerged end of the spoon, and vibrating particles pass energy along the metal to your hand. Metals are excellent conductors — that\'s why metal spoons heat up fast!',
            optionExplanations: [
                'Radiation transfers heat through electromagnetic waves (like sunshine). The spoon is transferring heat through direct contact with your hand — that\'s conduction, not radiation.',
                'Convection involves fluid (liquid or gas) moving and carrying heat with it. Here, the heat travels through a solid spoon, not through a moving fluid.',
                'Correct! Heat moves through the solid spoon from the hot end to your hand by conduction — vibrating particles pass energy along.',
                'Evaporation is when liquid turns to gas — it\'s a phase change, not a type of heat transfer. The spoon is conducting heat directly to your hand.'
            ]
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Puddles disappear on a sunny day even though the water doesn\'t boil. What happened?',
            options: ['The ground absorbed the water like a sponge', 'The water evaporated — molecules at the surface gained enough energy to escape as vapour', 'The wind blew the water away', 'The water sank underground instantly'],
            correctIndex: 1,
            hint: 'Evaporation can happen below boiling point. Some water molecules are fast enough to escape...',
            explanation: 'Evaporation occurs when individual water molecules at the surface gain enough kinetic energy to break free and become water vapour. It happens at ANY temperature, not just at 100°C. Sunshine and wind speed it up by adding energy and carrying vapour away.',
            optionExplanations: [
                'While soil can absorb some water, puddles on concrete and asphalt also disappear. The water is turning into invisible vapour, not soaking in.',
                'Correct! Surface molecules with enough energy escape as vapour — this happens at any temperature, not just boiling point.',
                'Wind helps evaporation happen faster by carrying vapour away, but it doesn\'t physically blow liquid water off the ground. The water molecules change phase to become gas.',
                'Water doesn\'t sink through solid surfaces instantly. Puddles on paved roads still disappear — the water is evaporating into the air.'
            ]
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Many birds fly south for winter. What is this behaviour called?',
            options: ['Hibernation', 'Migration — travelling to warmer areas where food is available', 'Camouflage', 'Metamorphosis'],
            correctIndex: 1,
            hint: 'They\'re not sleeping — they\'re moving to a whole new location...',
            explanation: 'Migration is the seasonal movement of animals to regions with better conditions. Birds fly south to find warmer weather and more food during winter, then return north in spring when conditions improve. Some migrate thousands of kilometres!',
            optionExplanations: [
                'Hibernation means sleeping through winter in one place, conserving energy. These birds are doing the opposite — actively flying long distances to warmer areas.',
                'Correct! Migration is seasonal movement to regions with better conditions — warmer weather and more food.',
                'Camouflage is about blending into surroundings to hide from predators. It has nothing to do with seasonal movement to warmer places.',
                'Metamorphosis is a physical transformation (like a caterpillar becoming a butterfly). Birds don\'t change form — they fly to a different location.'
            ]
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Why does a woolly coat help a sheep survive cold weather?',
            options: ['Wool generates heat on its own', 'Wool traps air, and air is a poor conductor of heat — so body heat stays in', 'Wool absorbs sunlight and converts it to warmth', 'The sheep doesn\'t actually feel cold'],
            correctIndex: 1,
            hint: 'Think about what\'s trapped between the fibres — and whether that substance conducts heat well...',
            explanation: 'Wool fibres trap pockets of air, and air is a very poor conductor (insulator). This reduces conduction of body heat outward. The sheep\'s body warmth stays close to its skin instead of escaping to the cold environment. Same principle as wearing layers!',
            optionExplanations: [
                'Wool doesn\'t generate heat — it\'s a passive insulator. The sheep\'s body generates heat through metabolism; wool just traps it close to the body.',
                'Correct! Trapped air between wool fibres acts as insulation, preventing body heat from escaping.',
                'While dark wool can absorb some sunlight, that\'s not the main mechanism. White sheep stay warm too! The key is trapped air acting as insulation.',
                'Sheep do feel cold — that\'s why being shorn in cold weather is stressful for them. Wool protects them by insulating against heat loss.'
            ]
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Hot air rises from the ground on a sunny day, creating a breeze. What type of heat transfer drives this?',
            options: ['Convection — warm air rises and cooler air moves in to replace it, creating a circulation', 'Conduction through the air', 'Radiation from the ground', 'Magnetism from the Earth\'s core'],
            correctIndex: 0,
            hint: 'When air is heated it expands, becomes less dense, and rises. Cooler air rushes in below...',
            explanation: 'Convection is heat transfer by the movement of a fluid (gas or liquid). The sun heats the ground, the ground heats the air above it, the warm air rises (less dense), cooler air flows in to replace it — creating a convection current. This is what drives wind and weather patterns!',
            optionExplanations: [
                'Correct! Warm air rises, cool air rushes in to replace it — this moving-air circulation is convection.',
                'Air is a poor conductor of heat. Conduction works best in solids (like metals). The bulk movement of air masses is convection, not conduction.',
                'Radiation does transfer heat from the ground, but the breeze (air movement) is caused by convection — warm air rising and cool air flowing in to replace it.',
                'Earth\'s magnetic field doesn\'t create wind or breezes. Air movement is driven by temperature differences causing convection currents.'
            ]
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Warm moist air rises, cools, and clouds form. What physical change is happening to the water?',
            options: ['Evaporation', 'Melting', 'Condensation — water vapour cools and turns back into tiny liquid droplets', 'Freezing'],
            correctIndex: 2,
            hint: 'Going from gas → liquid is called...',
            explanation: 'As warm moist air rises, it cools. Cooler air can hold less water vapour, so the excess vapour condenses — changes from gas back to tiny liquid water droplets. Billions of these droplets clinging to dust particles form visible clouds!',
            optionExplanations: [
                'Evaporation is liquid → gas (the opposite direction). Here, water vapour (gas) is turning back INTO liquid droplets to form clouds.',
                'Melting is solid → liquid (e.g. ice turning to water). The water vapour in the air is a gas, not a solid — it\'s turning into liquid droplets.',
                'Correct! Water vapour (gas) cools and turns back into tiny liquid droplets — that\'s condensation.',
                'Freezing is liquid → solid. While ice crystals can form in very high, cold clouds, the basic cloud formation process is condensation (gas → liquid).'
            ]
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Bears eat heavily in autumn, then sleep through winter in a den. What is this survival strategy?',
            options: ['Migration', 'Photosynthesis', 'Camouflage', 'Hibernation — slowing metabolism to conserve energy when food is scarce'],
            correctIndex: 3,
            hint: 'They don\'t move to a new place — they stay put and slow everything down...',
            explanation: 'Hibernation is a state of greatly reduced metabolism, heart rate, and body temperature. Bears build up fat reserves in autumn, then hibernate through winter when food is scarce. Their bodies burn stored fat slowly, letting them survive months without eating.',
            optionExplanations: [
                'Migration means travelling to a new location. Bears stay in the same area and sleep through winter in a den — they don\'t fly south!',
                'Photosynthesis is how plants make food using sunlight. Animals cannot photosynthesise — bears survive winter by living off stored body fat.',
                'Camouflage is about blending in to avoid predators. Sleeping through winter to save energy is a completely different strategy.',
                'Correct! Hibernation slows metabolism dramatically, allowing bears to survive months on stored fat while food is unavailable.'
            ]
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'The Sun warms the Earth from 150 million km away through empty space. Which heat transfer method works across a vacuum?',
            options: ['Conduction', 'Convection', 'Radiation — energy travels as electromagnetic waves that don\'t need a medium', 'Evaporation'],
            correctIndex: 2,
            hint: 'There\'s no air or material between the Sun and Earth. Only one method doesn\'t need a medium...',
            explanation: 'Radiation is the only heat transfer method that works through a vacuum. The Sun emits electromagnetic waves (including infrared, visible light, and UV) that travel through empty space at the speed of light and warm the Earth when absorbed. No particles needed!',
            optionExplanations: [
                'Conduction requires particles in direct contact to pass vibrations along. Space is a vacuum with no particles, so conduction can\'t work across it.',
                'Convection requires a fluid (gas or liquid) to carry heat. Space is empty — no air or liquid to circulate, so convection is impossible.',
                'Correct! Electromagnetic waves (radiation) travel through empty space at the speed of light — no medium needed.',
                'Evaporation is a phase change (liquid → gas), not a method of heat transfer across space. It requires a liquid surface, which doesn\'t exist in the vacuum of space.'
            ]
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Sea breezes blow from sea to land during the day but reverse at night. Which explanation is correct?',
            options: ['Land heats and cools faster than water, creating shifting convection currents that reverse between day and night', 'The Moon\'s gravity pulls air toward the sea at night', 'Tides push the air along with the water', 'Wind always blows east during the day and west at night'],
            correctIndex: 0,
            hint: 'Land warms up fast in the sun but also cools fast at night. Water changes temperature slowly...',
            explanation: 'During the day, land heats faster → air above it rises → cooler sea air flows in (sea breeze). At night, land cools faster → sea is now warmer → air over the sea rises → land air flows toward the sea (land breeze). The temperature difference flipping direction flips the convection current!',
            optionExplanations: [
                'Correct! The different heating/cooling rates of land vs water create convection currents that reverse between day and night.',
                'The Moon\'s gravity affects ocean tides, not air currents. Sea and land breezes are driven by temperature-based convection, not gravity.',
                'Tides are water movement caused by the Moon\'s gravity. Air movement (wind) is driven by temperature differences, not by tides pushing air.',
                'Wind direction depends on local temperature differences, not a fixed east-west pattern. Sea/land breezes are specifically caused by land and water heating at different rates.'
            ]
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'In the water cycle, water moves continuously among the atmosphere, land, and oceans. Which is the correct sequence for a typical cycle?',
            options: ['Evaporation → condensation → precipitation → collection (runoff/groundwater)', 'Condensation → evaporation → precipitation → collection', 'Precipitation → evaporation → condensation → collection', 'Collection → precipitation → condensation → evaporation'],
            correctIndex: 0,
            hint: 'It starts with liquid water gaining energy and becoming vapour...',
            explanation: 'The water cycle: (1) Evaporation — surface water becomes vapour. (2) Condensation — vapour cools into cloud droplets. (3) Precipitation — droplets combine and fall as rain/snow. (4) Collection — water gathers in rivers, lakes, oceans, or groundwater. Then the cycle repeats!',
            optionExplanations: [
                'Correct! Evaporation → condensation → precipitation → collection is the proper sequence.',
                'Condensation can\'t come first — you need water vapour in the air before it can condense. Evaporation must happen first to put moisture into the atmosphere.',
                'Precipitation (rain/snow) can\'t be first — clouds must form first through condensation, and water vapour must get into the air through evaporation before that.',
                'This sequence is backwards. Collection is where water gathers after falling — it can\'t come before precipitation. The cycle starts with evaporation lifting water into the atmosphere.'
            ]
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Desert foxes have large ears while Arctic foxes have small ears. How does ear size help each survive?',
            options: ['Large ears hear prey better in the desert; small ears hear better in snow', 'It\'s random — ear size has no survival value', 'Ear size affects balance in different terrains', 'Large ears radiate excess body heat in the desert; small ears reduce heat loss in the cold'],
            correctIndex: 3,
            hint: 'Ears are full of blood vessels close to the surface. What does surface area do for heat exchange?',
            explanation: 'Large ears = large surface area with blood vessels near the surface → efficient radiating of excess body heat (critical in hot deserts). Small ears = less surface area → less heat escapes to the frigid air. This is an example of Allen\'s Rule — extremities are shorter in cold climates to conserve heat.',
            optionExplanations: [
                'Both foxes have excellent hearing regardless of ear size. The main advantage of ear size is thermoregulation — controlling body temperature — not hearing ability.',
                'Ear size is definitely not random! It\'s a clear example of natural selection: desert foxes with larger ears survived better (stayed cooler), and Arctic foxes with smaller ears survived better (conserved heat).',
                'Balance depends on the inner ear (vestibular system), not the outer ear size. The outer ear\'s surface area is crucial for heat exchange with the environment.',
                'Correct! Large ears radiate heat in hot deserts; small ears conserve heat in cold Arctic conditions — this is Allen\'s Rule in action.'
            ]
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Climate change is warming the oceans. How does this affect the water cycle and wildlife?',
            options: ['Warmer oceans have no effect on weather or animals', 'Warmer oceans decrease evaporation, causing less rain everywhere', 'The water cycle stops when oceans warm above 25°C', 'Warmer oceans increase evaporation → more intense storms and rainfall; shifting temperatures also force species to migrate or adapt to new conditions'],
            correctIndex: 3,
            hint: 'More heat energy in the ocean → more evaporation → more water vapour → more...',
            explanation: 'Warmer oceans evaporate more water, loading the atmosphere with extra moisture and energy. This fuels more intense rainstorms, hurricanes, and flooding. Meanwhile, rising temperatures shift habitats — species must migrate to cooler areas, adapt, or face extinction. Physics, chemistry, and biology are all connected!',
            optionExplanations: [
                'Ocean temperature directly affects evaporation rates, storm intensity, and marine ecosystems. It is one of the most impactful factors in climate and biodiversity.',
                'Actually, warmer water INCREASES evaporation (more energy = more molecules escaping). More evaporation means more atmospheric moisture and more intense precipitation.',
                'The water cycle never stops — it just intensifies with warmer temperatures. Tropical oceans are already well above 25°C and the water cycle operates vigorously there.',
                'Correct! More heat → more evaporation → more intense storms. And rising temperatures force species to migrate, adapt, or face extinction.'
            ]
        },
    ]
};

