import { AssessmentData } from '../../types';

/**
 * Big Idea 22 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P22 (distance = gap x (Vp Vs)/(Vp - Vs), 10.3 km per second of gap),
 * L2C22 (comparing jumps as a ratio of wavelengths, and the resolving power needed to
 * trust a reading -- both nm over nm, so no constants and no energy unit),
 * L2B22 (depth = speed x time / 2, and the detail-against-depth trade).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea22Level2Assessment: AssessmentData = {
    bigIdea: 22,
    level: 2,
    title: 'How Do Waves Help Us See the Invisible?',
    subtitle: 'Level 2 -- The Gap, the Position, and the Echo',
    icon: '📡',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Nobody can time an earthquake from underground, so the start time is unknown. How do two waves get round that?',
            options: [
                'The P-wave is fast enough that its travel time can be ignored',
                'Both waves leave at the same instant, so the unknown start time cancels when you subtract their arrival times',
                'Seismometers record the start time directly',
                'The S-wave travels in a straight line and the P-wave does not'
            ],
            correctIndex: 1,
            hint: 'Write both arrival times as "start + something" and subtract.',
            explanation: 'The P-wave arrives at start + d/Vp and the S-wave at start + d/Vs. The start time is in both, so subtracting removes it. What is left depends only on the distance and the two speeds — you measure something that does not care when it began.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What is a single bright line in an element\'s spectrum?',
            options: [
                'One flash of light, given out when an electron drops between two fixed rungs in the atom',
                'The colour the element happens to look',
                'The temperature of the gas, written as a colour',
                'The number of electrons the atom has'
            ],
            correctIndex: 0,
            hint: 'Electrons can only stand on certain rungs, never halfway up. What happens when one drops?',
            explanation: 'Electrons sit only on fixed rungs, never in between. When one drops to a lower rung, the atom must shed exactly the energy lost, and it does so as one flash of light. That flash is the line — and because the rungs are fixed by the atom, the position names the element.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'An ultrasound echo returns 26 µs after the pulse left the probe. Sound travels 1.54 mm per µs in soft tissue. How deep is the boundary?',
            options: [
                '4.0 cm, from 1.54 × 26',
                '2.0 cm — 1.54 × 26 is the round trip, so halve it',
                '26 cm, one per microsecond',
                '40 cm, because the pulse passes through twice'
            ],
            correctIndex: 1,
            hint: 'The probe both sends and listens. What journey did the clock measure?',
            explanation: '1.54 × 26 = 40 mm, but that is down AND back, because the probe cannot start timing at the boundary. The depth is 20 mm = 2.0 cm. Forgetting the 2 always puts things twice as far away as they are.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'With Vp = 8.0 km/s and Vs = 4.5 km/s, the bracket (Vp × Vs)/(Vp − Vs) works out at 10.3 km per second of gap. What is the distance for a 30-second gap?',
            options: [
                'About 309 km',
                'About 240 km, from 30 × 8.0',
                'About 3 km',
                'About 617 km, the same as a 60-second gap'
            ],
            correctIndex: 0,
            hint: 'Gap and distance are in direct proportion.',
            explanation: '30 × 10.3 = 309 km. The bracket never changes once the speeds are fixed, so gap and distance are in direct proportion — which is why a seismologist just multiplies the gap by ten in their head.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Hydrogen\'s red line is at 656.3 nm and its violet line at 410.2 nm. How much bigger was the electron\'s drop that made the violet line?',
            options: [
                'About 1.60 times, from 656.3 nm / 410.2 nm — and the nanometres cancel, so it is a plain number',
                'About 0.63 times, from 410.2 nm / 656.3 nm',
                '246.1 nm bigger, from 656.3 − 410.2',
                'The same, because both lines come from hydrogen'
            ],
            correctIndex: 0,
            hint: 'Shorter wavelength means a bigger drop, so divide the longer by the shorter.',
            explanation: '656.3 / 410.2 = 1.60. Dividing the other way gives 0.63, which says the violet drop was smaller — backwards, since shorter waves carry more energy. Subtracting gives a length in nanometres, and "how many times bigger" cannot have a unit. Carrying the units through rules out two of the three wrong answers on its own.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A 5 MHz probe gives detail of about 0.31 mm down to about 12 cm. A doctor wants 0.1 mm detail at 12 cm and proposes a 15 MHz probe at higher power. What happens?',
            options: [
                'It works — more power pushes the finer wave deeper',
                'It fails: 15 MHz only reaches about 4 cm, and power cannot fix it because absorption takes a fraction every centimetre',
                'It works, but the image is dimmer',
                '15 MHz would give worse detail, not better'
            ],
            correctIndex: 1,
            hint: 'Absorption removes a fraction per centimetre, not a fixed amount.',
            explanation: 'Useful depth falls roughly as 60/frequency, so 15 MHz reaches about 4 cm. Doubling the power buys one more absorption length — a centimetre or two — and tissue heating is capped by safety limits anyway. The real fix is to move the probe closer, which is why some go inside the body.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Raising Vp from 6.0 to 10.0 km/s makes the same 60-second gap mean a much shorter distance — 1,080 km down to 491 km. Why?',
            options: [
                'Faster waves lose more energy, so they cannot have come as far',
                'What the gap measures is the difference between the speeds: a bigger difference opens the gap faster, so the same gap is reached sooner',
                'The S-wave speed must have changed too',
                'The formula only works near 8.0 km/s'
            ],
            correctIndex: 1,
            hint: 'Look at (Vp − Vs) in the denominator.',
            explanation: 'At Vp = 6.0 the two speeds differ by 1.5 km/s and the gap opens slowly, so a 60 s gap means a very long way. At 10.0 they differ by 5.5 km/s and the gap opens fast. Make the speeds equal and the method dies completely — the gap would be zero at any distance.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Sodium\'s yellow is really two lines, 589.0 and 589.6 nm. What resolving power does an instrument need to show them as two?',
            options: [
                'About 982, from 589.0 / 0.6',
                'About 0.6, the separation itself',
                'About 0.001, from 0.6 / 589.0',
                'About 1,178, from 589.0 + 589.6'
            ],
            correctIndex: 0,
            hint: 'Resolving power is the wavelength divided by the smallest gap you can split.',
            explanation: '589.0 / 0.6 = 982, so the instrument must distinguish about one part in a thousand. A classroom spectroscope manages one part in fifty and shows a single yellow blur; a research spectrograph reaches one part in a hundred thousand.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A single station measures a 45-second gap and announces that the earthquake was 463 km north-east. What is wrong?',
            options: [
                'The arithmetic — 45 × 10.3 is not 463',
                'The distance is right but the direction is invented: one number gives a circle of possible places, so three stations are needed',
                'A single station cannot measure a gap at all',
                'The bracket should be 8.0, not 10.3'
            ],
            correctIndex: 1,
            hint: 'How many pieces of information can one stopwatch reading carry?',
            explanation: '45 × 10.3 = 463 km, so the arithmetic is perfect. But a single number cannot carry two pieces of information: it gives a distance and says nothing about bearing. One station gives a circle, two circles cross at two points, three at one. Ask what a measurement can physically contain before believing what was got out of it.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two students view the same sodium lamp. One, sharp to 0.3 nm, reports two yellow lines; the other, sharp to 3.0 nm, reports one. Who is right?',
            options: [
                'Both — the number of lines depends on the instrument, so there is no single answer',
                'The first. Only an instrument that can split 0.6 nm is capable of coming out either way, so only its answer is evidence',
                'The second, because a simpler result is more likely to be right',
                'Neither, until a third student measures it'
            ],
            correctIndex: 1,
            hint: 'Could the blunt instrument have reported two lines, if there were two?',
            explanation: 'The blunt spectroscope would say "one line" whatever the truth, so hearing it say "one line" tells you nothing. A measurement that cannot come out both ways is not evidence. Note how it fails — not with a warning but with a clean, confident, simple result, which is the failure mode to watch for in every instrument here.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A scanner must listen for 260 µs to reach 20 cm deep. What does that force?',
            options: [
                'Nothing — the machine listens and sends at the same time',
                'A limit on the frame rate: about 3,800 pulses a second at most, so a deep scan refreshes less smoothly than a shallow one',
                'That deep scans need a higher frequency',
                'That the 1540 m/s figure must be wrong at depth'
            ],
            correctIndex: 1,
            hint: 'The next pulse cannot go out until the last echo is back.',
            explanation: '1 / 260 µs is about 3,800 pulses a second, and every line of the image needs pulses. So the speed of sound sets the frame rate, and the deeper you look the jerkier the picture. The deep organ gets the worst image in resolution and in smoothness — the opposite of what you would want.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'All three instruments in this Big Idea measure something other than the thing you wanted to know. What do they measure, and what follows?',
            options: [
                'They measure the hidden object directly, which is why they are trusted',
                'A gap, a position and a time — the invisible thing is recovered by arithmetic, so it is only as good as that one measured number',
                'They measure energy in all three cases',
                'They measure a distance in all three cases'
            ],
            correctIndex: 1,
            hint: 'Look at what the stopwatch, the spectrometer and the probe each actually record.',
            explanation: 'L2P22 times a gap between two arrivals, L2C22 reads the position of a line, L2B22 times an echo. None of them sees the earthquake, the atom or the organ. That is what seeing the invisible means: you never see it, you calculate it — so the quality of the one number you did measure is the whole quality of the answer.'
        }
    ]
};
