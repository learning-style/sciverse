import { AssessmentData } from '../../types';

/**
 * Big Idea 1 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P1 (vectors, components, a = g(sin θ − μ cos θ)), L3C1 (latent heat,
 * Q = mL, the heating curve), L3B1 (work, efficiency, evaporative cooling).
 *
 * The distractors are the mistakes each lesson works through: leaving friction
 * out, believing the mass is needed, using Q = mcdT across a change of state,
 * and multiplying by efficiency instead of dividing.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea1Level3Assessment: AssessmentData = {
    bigIdea: 1,
    level: 3,
    title: 'Why Do Things Move?',
    subtitle: 'Level 3 -- Vectors, Latent Heat and the Body as an Engine',
    icon: '📐',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'On a ramp tilted at angle θ, the component of an object\'s weight acting along the slope is:',
            options: ['mg sin θ', 'mg cos θ', 'mg tan θ', 'mg, all of it'],
            correctIndex: 0,
            hint: 'At θ = 0° nothing drives it; at 90° everything does.',
            explanation: 'sin 0° = 0 and sin 90° = 1, which matches flat ground and free fall.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Latent heat is the energy that:',
            options: ['Changes the state of a substance without changing its temperature', 'Raises the temperature of a substance by 1 °C', 'Is lost as waste from any engine', 'A thermometer measures directly'],
            correctIndex: 0,
            hint: '"Latent" means hidden.',
            explanation: 'It is hidden from the thermometer because it breaks grips between particles rather than speeding them up.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Work done by a force is:',
            options: ['Force multiplied by the distance moved in its direction', 'Force divided by distance', 'Force multiplied by time', 'Force multiplied by mass'],
            correctIndex: 0,
            hint: 'W = Fd.',
            explanation: 'Force alone is not a cost. A force that moves nothing does no work.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'The coefficient of friction μ has:',
            options: ['No units, because it is a force divided by a force', 'Units of newtons', 'Units of newtons per metre', 'Units of metres per second squared'],
            correctIndex: 0,
            hint: 'f = μN, so μ = f/N.',
            explanation: 'Dividing a force by a force cancels the units entirely.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A box is on a 25° slope with μ = 0.20. Take g = 9.8 m/s², sin 25° = 0.423, cos 25° = 0.906. Its acceleration is:',
            options: ['2.4 m/s²', '4.1 m/s²', '1.8 m/s²', 'Cannot be found without the mass'],
            correctIndex: 0,
            hint: 'a = g(sin θ − μ cos θ).',
            explanation: '9.8 x (0.423 − 0.20 x 0.906) = 9.8 x 0.242 = 2.37 m/s². The mass cancels in the derivation.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'How much energy turns 50 g of ice at 0 °C into water at 0 °C? L_f = 334 J/g.',
            options: ['16,700 J', '21,000 J', '37,700 J', '0 J, because the temperature does not change'],
            correctIndex: 0,
            hint: 'Q = mL.',
            explanation: '50 g x 334 J/g = 16,700 J. The temperature does not change, which is exactly why Q = mcdT cannot find it.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A climber does 6,860 J of useful work. Muscle is about 25% efficient. The chemical energy released was:',
            options: ['27,440 J', '1,715 J', '8,575 J', '6,860 J'],
            correctIndex: 0,
            hint: 'Should the answer be bigger or smaller than the work?',
            explanation: 'E = W/η = 6,860 / 0.25 = 27,440 J. A quarter arriving means four times as much went in.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'In a = g(sin θ − μ cos θ), the mass cancelled out. This tells you that:',
            options: ['Acceleration down a slope does not depend on the object\'s mass', 'The derivation was done incorrectly', 'Mass was never relevant to forces', 'The formula only works for light objects'],
            correctIndex: 0,
            hint: 'A quantity cancelling is a result.',
            explanation: 'A loaded lorry and a marble on the same slope accelerate identically -- which is why Galileo\'s ramp experiments worked with different weights.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An object begins to slide when a board is tilted to 22°. What is μ between the surfaces?',
            options: ['0.40, because at that angle a = 0 so μ = tan θ', '0.37, because μ = sin θ', '0.93, because μ = cos θ', 'It cannot be found without knowing the mass'],
            correctIndex: 0,
            hint: 'Set a = 0 in a = g(sin θ − μ cos θ).',
            explanation: 'sin θ = μ cos θ, so μ = tan θ = tan 22° = 0.40. Neither mass nor g is needed -- a protractor is enough.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A pan of water boils on a hob. The cook turns the heat to maximum. The thermometer now reads:',
            options: ['Still 100 °C -- the extra energy vaporises water faster', 'Above 100 °C, since more energy means a higher temperature', 'Below 100 °C, because faster boiling cools the water', 'It rises to 120 °C, the temperature of steam'],
            correctIndex: 0,
            hint: 'The pan is sitting on a plateau of the heating curve.',
            explanation: 'On a plateau all incoming energy goes into breaking grips, so more power buys speed rather than temperature.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'You sweat heavily in a hot, saturated room but overheat anyway. Why?',
            options: ['Cooling comes from evaporation, and saturated air cannot accept more vapour, so the sweat drips off having carried almost nothing away', 'Humid air holds more heat, so the room is effectively hotter', 'Sweat glands stop working in humid conditions', 'Sweating only cools you if the air is moving'],
            correctIndex: 0,
            hint: 'Where exactly is the 2,260 J per gram paid?',
            explanation: 'The energy is paid at the moment of evaporation. Sweat that runs off leaves as warm liquid, not as vapour, and takes almost no energy with it.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Your bicep pulls with 400 N over 4 cm while the load of 50 N rises 32 cm. What does this show?',
            options: ['A lever trades force for distance and leaves the work unchanged -- both are 16 J', 'The muscle does eight times as much work as the load receives', 'Energy is created by the lever', 'The muscle is only one eighth as efficient'],
            correctIndex: 0,
            hint: 'Work them both out.',
            explanation: '400 x 0.04 = 16 J and 50 x 0.32 = 16 J. L2B1\'s moment equation was conservation of energy in other clothes.'
        }
    ]
};
