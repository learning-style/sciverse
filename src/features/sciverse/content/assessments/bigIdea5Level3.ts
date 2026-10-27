import { AssessmentData } from '../../types';

/**
 * Big Idea 5 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P5 (friction, efficiency and self-locking), L3C5 (heat of dissolving
 * and van 't Hoff's rule), L3B5, rewritten structure-first on 27 October 2026 (vapour pressure, humidity and the limit of
 * sweat). The theme across all three is what limits each trade.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea5Level3Assessment: AssessmentData = {
    bigIdea: 5,
    level: 3,
    title: 'How Can a Small Force Do a Big Job?',
    subtitle: 'Level 3 -- Friction, Heat of Dissolving and Humidity: the Limits',
    icon: '🔩',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A machine is self-locking, holding its load by itself, when its efficiency is:',
            options: ['50% or less', 'More than 50%', 'Exactly 100%', 'Any value, as long as the thread slopes gently'],
            correctIndex: 0,
            hint: 'Compare what friction takes with what the load gives back.',
            explanation: 'Friction takes work out x (1/η − 1). That beats the work out whenever 1/η is at least 2, which means η is 50% or less.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Dissolving CO₂ in water has a heat of dissolving of about −20 kJ/mol. The negative sign means dissolving:',
            options: ['Releases heat', 'Takes in heat', 'Neither releases nor takes in heat', 'Happens only above 100 °C'],
            correctIndex: 0,
            hint: 'Keep the books from the chemicals\' point of view.',
            explanation: 'A negative ΔH means the chemicals lose energy, released as heat.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Relative humidity is:',
            options: ['Vapour pressure divided by saturation vapour pressure', 'The temperature of the air', 'The mass of water in a litre of air', 'The pressure of the whole air'],
            correctIndex: 0,
            hint: 'How full the air is with vapour.',
            explanation: 'It compares the vapour the air holds with the most it could hold at that temperature.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'What did the Level 3 lessons of this Big Idea find in each case?',
            options: ['What limits each trade: friction, the heat of dissolving, and the air\'s vapour pressure', 'That energy can be created', 'That every machine is 100% efficient', 'That temperature has no effect on anything'],
            correctIndex: 0,
            hint: 'Level 2 balanced the books. Level 3 looked for limits.',
            explanation: 'Friction decides self-locking, the heat of dissolving sets how fast k falls, and humidity caps sweat\'s cooling.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A jack does 30 J of work out per turn at 25% efficiency. How much work is lost to friction per turn?',
            options: ['90 J', '7.5 J', '120 J', '22.5 J'],
            correctIndex: 0,
            hint: 'Work in = work out / η, then subtract.',
            explanation: 'Work in = 30 / 0.25 = 120 J, so 120 − 30 = 90 J is lost. It holds, since 90 J is more than the 30 J the load gives back.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why does sugar dissolve better when warmed, while CO₂ dissolves worse?',
            options: ['Dissolving sugar takes in heat and dissolving CO₂ releases it, and warming favours the direction that takes in heat', 'Warm water has less room for gas', 'Sugar molecules are heavier than CO₂ molecules', 'CO₂ reacts with warm water and disappears'],
            correctIndex: 0,
            hint: 'Compare the signs of ΔH.',
            explanation: 'Sugar has a positive ΔH, CO₂ a negative one. Warming shifts each balance the heat-absorbing way: into solution for sugar, out of it for CO₂.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A sweat gland makes its fluid at body temperature, deep in the dermis. So where does the cooling actually happen?',
            options: [
                'In the coil, which produces cool fluid',
                'When a water molecule leaves the layer of sweat on the skin — it takes the energy it needs to break away from the skin beneath it',
                'In the duct, as the salt is drawn back out',
                'In the widened blood vessels of the dermis'
            ],
            correctIndex: 1,
            hint: 'Nothing cold comes out of a sweat gland. So what step removes heat?',
            explanation: 'Warm water sitting on warm skin removes nothing. The cooling is in the leaving: a molecule held by the water around it needs energy to break free, and it takes that energy from the skin. So the chain is vessels bring the heat, the coil and duct bring the water, and the air performs the step that actually cools -- which is why the body cannot choose how much sweat evaporates. Its control ends at the pore.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which of these calculations must use temperatures in kelvin, and why?',
            options: ['van \'t Hoff\'s rule, because 0 °C is not zero of anything, so 1/T in Celsius compares nonsense', 'A jack\'s efficiency', 'Relative humidity', 'The ideal mechanical advantage of a screw'],
            correctIndex: 0,
            hint: 'Where does a temperature appear divided into something?',
            explanation: 'The rule uses 1/T. In Celsius, 1/20 and 1/30 differ hugely although 20 °C and 30 °C are only 3% apart in kelvin.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An oiled jack has an efficiency of 80% and does 25 J of work out per turn. When the handle is released, how much work per turn is left over to spin the screw down?',
            options: ['About 18.8 J', 'None: it holds', 'About 6.3 J', 'About 31.3 J'],
            correctIndex: 0,
            hint: 'Friction takes work in − work out.',
            explanation: 'Work in = 25 / 0.8 = 31.25 J, so friction takes 6.25 J. The load gives back 25 J, leaving 18.75 J to spin it down.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'With B = 1,045 K, k for CO₂ is 1.7 g/L per atm at 20 °C. What does van \'t Hoff\'s rule predict at 10 °C?',
            options: ['About 2.3 g/L per atm', 'About 1.3 g/L per atm', '1.7 g/L per atm, unchanged', 'An enormous value, about 10 to the power 52'],
            correctIndex: 0,
            hint: '1/283 − 1/293, in kelvin, with the new temperature first.',
            explanation: '1/283 − 1/293 = +0.000121; x 1,045 = +0.126; 10 to the power 0.126 = 1.34; 1.7 x 1.34 = 2.3, the table\'s value. Swapping gives 1.3; Celsius gives nonsense.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'On a humid day hard work makes sweat bead up and run off you. On a dry day the same work makes sweat that vanishes. Which is cooling you more, and why?',
            options: [
                'The humid day — more sweat is visible, so more is being produced',
                'The dry day — sweat that runs off took water from your blood and removed almost no heat, because it never made the one transition that matters',
                'They cool equally; the water leaves either way',
                'The humid day, because running water carries heat away by conduction'
            ],
            correctIndex: 1,
            hint: 'Which route takes heat with it: leaving as liquid, or leaving as vapour?',
            explanation: 'Only evaporation carries heat. A drop that lands on the ground cost you water and bought you almost nothing. The feeling is misleading in exactly the wrong direction -- dripping feels like hard cooling and is the sign of cooling failing -- which is why humid heat harms people who would be fine on a hotter, drier day, and why the figure to watch is how much water is in the air rather than the temperature.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Two limits in this Big Idea come from traffic in both directions across a surface. Which pair?',
            options: ['Gas crossing a water surface both ways, and water vapour leaving and landing on sweaty skin', 'Friction in a screw thread, and the pivot of a lever', 'The gas constant, and the kelvin scale', 'Work in, and work out'],
            correctIndex: 0,
            hint: 'Where do molecules move one way and the other at once?',
            explanation: 'Saturation in L2C5 and evaporation in L3B5 both depend on molecules leaving and arriving; what counts is the difference.'
        }
    ]
};
