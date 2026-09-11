import { AssessmentData } from '../../types';

/**
 * Big Idea 5 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P5 (work and mechanical advantage), L2C5 (Henry's law), L2B5 (the
 * body's heat budget and evaporating sweat). The theme across all three is
 * that a small input does a big job and the books still balance.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea5Level2Assessment: AssessmentData = {
    bigIdea: 5,
    level: 2,
    title: 'How Can a Small Force Do a Big Job?',
    subtitle: 'Level 2 -- Levers, Pressure and Sweat: the Books Balance',
    icon: '🔧',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Work is:',
            options: ['Force x distance moved, in joules', 'Force x distance from the pivot, in N m', 'Mass x speed', 'Force divided by area'],
            correctIndex: 0,
            hint: 'The distance is how far the object moves.',
            explanation: 'Work = force x distance moved. Torque uses the distance from the pivot instead.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'By Henry\'s law, dissolved gas = k x pressure. If the pressure of that gas is doubled, the gas the water can hold:',
            options: ['Doubles', 'Halves', 'Stays the same', 'Goes up four times'],
            correctIndex: 0,
            hint: 'Twice as many molecules hit the surface each second.',
            explanation: 'It is a straight-line rule: double the pressure, double the dissolved gas.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'One watt is:',
            options: ['One joule every second', 'One joule every hour', 'One newton for every metre', 'The heat to warm 1 g of water by 1 °C'],
            correctIndex: 0,
            hint: 'Power is how fast energy flows.',
            explanation: '1 W = 1 J every second, so energy = power x time in seconds.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'What is true of the lever, the fizzy drink and the sweating body alike?',
            options: ['A small input does a big job, but nothing is created: the books balance', 'Each creates energy from nothing', 'Each works only at 37 °C', 'Each multiplies a force'],
            correctIndex: 0,
            hint: 'Think about what goes in and what comes out.',
            explanation: 'Work in = work out; gas packed in = gas released; heat made = heat carried out when temperature holds steady.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A lever has an effort arm of 1.2 m and a load arm of 0.4 m. What push lifts a 900 N load?',
            options: ['300 N', '2,700 N', '900 N', '450 N'],
            correctIndex: 0,
            hint: 'Mechanical advantage = effort arm / load arm.',
            explanation: 'The mechanical advantage is 1.2 / 0.4 = 3, so the push is 900 / 3 = 300 N.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'At 20 °C, k for CO₂ is 1.7 g/L per atm. How much CO₂ dissolves at 3.0 atm?',
            options: ['5.1 g/L', '0.57 g/L', '1.7 g/L', '4.7 g/L'],
            correctIndex: 0,
            hint: 'k is per atmosphere, so multiply.',
            explanation: '1.7 x 3.0 = 5.1 g/L. Dividing gives 0.57; adding gives 4.7; k alone ignores the pressure.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Evaporating sweat carries about 2,400 J per gram. How many grams must evaporate to carry away 480,000 J?',
            options: ['200 g', '1,152,000,000 g', '2,000 g', '20 g'],
            correctIndex: 0,
            hint: 'Divide the heat by the joules each gram carries.',
            explanation: '480,000 / 2,400 = 200 g. Multiplying instead gives an impossible 1,152,000,000 g.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which claim makes the same mistake as a lever that gives out more work than it takes in?',
            options: ['A runner shedding 2,160,000 J of heat with only 300 g of evaporated sweat', 'Warm water holding less gas than cold water', 'A lever with a long effort arm needing a small push', 'A watt being one joule every second'],
            correctIndex: 0,
            hint: 'Check whether the joules add up.',
            explanation: '300 g x 2,400 J/g carries out only 720,000 J, not 2,160,000 J. Like the impossible lever, the books do not balance.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An ideal lever lifts a 1,200 N load by 0.05 m with a push of 150 N. How far do the hands move?',
            options: ['0.4 m', '0.05 m', '6.25 mm', '8 m'],
            correctIndex: 0,
            hint: 'Work in = work out.',
            explanation: 'Work out = 1,200 x 0.05 = 60 J, so the hands move 60 J / 150 N = 0.4 m.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A sealed bottle at 30 °C holds 5.2 g/L of CO₂, and k = 1.3 g/L per atm. What CO₂ pressure must be above the drink?',
            options: ['4.0 atm', '6.8 atm', '0.25 atm', '1.3 atm'],
            correctIndex: 0,
            hint: 'Rearrange: pressure = dissolved gas / k.',
            explanation: '5.2 / 1.3 = 4.0 atm. Multiplying gives 6.8; dividing the other way gives 0.25.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A 70 kg runner (245,000 J for each °C) makes 500 W for one hour, and 450 g of sweat evaporates, on a day when the air is as warm as the skin. The body temperature:',
            options: ['Rises by about 2.9 °C', 'Holds steady', 'Rises by about 7.3 °C', 'Falls by about 4.4 °C'],
            correctIndex: 0,
            hint: 'Heat in minus heat carried out, then divide by 245,000.',
            explanation: 'In: 500 x 3,600 = 1,800,000 J. Out: 450 x 2,400 = 1,080,000 J. Left: 720,000 J, and 720,000 / 245,000 = 2.9 °C.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A diver who rises too fast gets the bends, and a runner on a humid day overheats. Which pair of reasons is right?',
            options: ['Falling pressure lowers how much gas the blood can hold; and only sweat that evaporates carries heat out', 'Nitrogen is created as the diver rises; and humid air is hotter', 'Warm blood holds more gas; and dripping sweat carries more heat', 'Pressure has no effect on dissolved gas; and sweat cools by dripping'],
            correctIndex: 0,
            hint: 'Henry\'s law for one, the heat budget for the other.',
            explanation: 'Dissolved gas = k x pressure, so less pressure means less can stay dissolved. Humid air slows evaporation, and dripping sweat carries almost no heat.'
        }
    ]
};
