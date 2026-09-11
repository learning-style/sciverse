import { AssessmentData } from '../../types';

/**
 * Big Idea 4 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P4 (the wave equation and echoes), L2C4 (frequency of light and
 * powers of ten), L2B4 (Weber fraction and the just noticeable difference).
 * The theme across all three is that senses work in ratios.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea4Level2Assessment: AssessmentData = {
    bigIdea: 4,
    level: 2,
    title: 'How Do We Sense the World?',
    subtitle: 'Level 2 -- Waves, Light and the Rule of Ratios',
    icon: '👂',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In the wave equation v = f x λ, the symbol λ stands for:',
            options: ['Wavelength', 'Wave speed', 'Frequency', 'Loudness'],
            correctIndex: 0,
            hint: 'It is measured in metres.',
            explanation: 'λ (lambda) is the length of one wave. f is frequency in Hz and v is speed in m/s.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'One nanometre is:',
            options: ['One billionth of a metre, 10⁻⁹ m', 'One millionth of a metre', 'One thousandth of a metre', 'One hundredth of a metre'],
            correctIndex: 0,
            hint: 'Nano means a billionth.',
            explanation: '1 nm = 10⁻⁹ m, so 700 nm = 7 x 10⁻⁷ m.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The just noticeable difference is:',
            options: ['The smallest change a person can reliably detect', 'The loudest sound a person can bear', 'The difference between two senses', 'The time a signal takes to reach the brain'],
            correctIndex: 0,
            hint: 'It is about noticing a change.',
            explanation: 'Weber found it is a fixed fraction of the starting amount.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A frequency of one hertz means:',
            options: ['One wave every second', 'One metre per second', 'One wave every minute', 'One second per wave squared'],
            correctIndex: 0,
            hint: 'Hz counts waves in a set time.',
            explanation: 'Frequency is waves per second, so 200 Hz is 200 waves every second.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A sound of 1,715 Hz travels through air at 343 m/s. Its wavelength is:',
            options: ['0.2 m', '5 m', '588,245 m', '1,372 m'],
            correctIndex: 0,
            hint: 'λ = v / f, and check the answer comes out in metres.',
            explanation: '343 / 1,715 = 0.2 m. Dividing the other way gives 5, which has the wrong units.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Light with a wavelength of 600 nm has a frequency of about (c = 3 x 10⁸ m/s):',
            options: ['5.0 x 10¹⁴ Hz', '5.0 x 10⁵ Hz', '5 Hz', '2.0 x 10⁻¹⁵ Hz'],
            correctIndex: 0,
            hint: 'Convert 600 nm to metres, then subtract the powers when dividing.',
            explanation: '600 nm = 6 x 10⁻⁷ m. 3 / 6 = 0.5, and 10⁸ ÷ 10⁻⁷ = 10¹⁵, so 0.5 x 10¹⁵ = 5.0 x 10¹⁴ Hz.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'With a Weber fraction of 0.03 for weight, how much must be added to a 2,000 g bag before you notice?',
            options: ['60 g', '3 g', '0.03 g', '2,003 g'],
            correctIndex: 0,
            hint: 'Multiply the fraction by the starting amount.',
            explanation: '0.03 x 2,000 = 60 g. The fraction is a share of what you already hold, not an amount.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Why do bats and dolphins use very high frequencies to find prey?',
            options: ['High frequencies give short waves, and a wave only echoes strongly from things about its own size', 'High sounds are always louder', 'Prey cannot hear high sounds, so it does not flee', 'High frequencies travel faster than low ones'],
            correctIndex: 0,
            hint: 'Think about wavelength compared with the size of the prey.',
            explanation: 'λ = v / f, so a high frequency means a short wave -- short enough to bounce back from something small.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A dolphin underwater (sound at 1,480 m/s) wants waves no longer than 0.02 m. The lowest frequency it can use is:',
            options: ['74,000 Hz', '17,150 Hz', '29.6 Hz', '1,480 Hz'],
            correctIndex: 0,
            hint: 'Use the speed of sound in water, and f = v / λ.',
            explanation: '1,480 / 0.02 = 74,000 Hz. Using the speed in air (343 m/s) gives 17,150 Hz, which is wrong underwater.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Sensor A detects 400 to 700 nm and Sensor B detects 700 to 1,000 nm. Both ranges are 300 nm wide. Which covers the wider range of frequencies?',
            options: ['Sensor A, because frequency is c divided by wavelength, so the same step covers more frequency at short wavelengths', 'They are equal, because both ranges are 300 nm wide', 'Sensor B, because its wavelengths are longer', 'It cannot be worked out without knowing the brightness'],
            correctIndex: 0,
            hint: 'Work out the frequency at each of the four ends.',
            explanation: 'A spans 7.5 to 4.3 x 10¹⁴ Hz, about 3.2 x 10¹⁴ Hz wide. B spans 4.3 to 3.0 x 10¹⁴ Hz, only about 1.3 x 10¹⁴ Hz.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A dimmer goes from 10 lamps to 20, and later from 100 lamps to 110. With k = 0.08 for brightness, which change looks bigger?',
            options: ['10 to 20, which doubles the light; 100 to 110 adds only 10% and is barely noticeable', 'Both look the same, because each added 10 lamps', '100 to 110, because more lamps are lit', 'Neither can be noticed at all'],
            correctIndex: 0,
            hint: 'Find the just noticeable difference for each starting amount.',
            explanation: 'The thresholds are 0.8 lamps and 8 lamps. Adding 10 is twelve times the first threshold but only just over the second.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What idea runs through all three Level 2 lessons of this Big Idea?',
            options: ['Senses work in ratios: wavelength against object size, frequency ranges as ratios, and changes against the starting amount', 'Every sense uses the same frequency', 'Brighter and louder signals are always easier to notice', 'Senses measure exact amounts, and the brain adds them up'],
            correctIndex: 0,
            hint: 'Compare, do not measure.',
            explanation: 'A moth-sized wave, less than one octave of light, and a just noticeable difference that grows with the start: each is a ratio.'
        }
    ]
};
