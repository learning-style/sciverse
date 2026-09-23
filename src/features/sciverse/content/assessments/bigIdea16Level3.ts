import { AssessmentData } from '../../types';

/**
 * Big Idea 16 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P16 (B = mu0 n I, and why an MRI cannot be wound in copper), L3C16
 * (hysteresis: remanence, coercivity, loop area as heat per cycle), L3B16
 * (weight = 1/error^2, and why a blind average loses to one good cue).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea16Level3Assessment: AssessmentData = {
    bigIdea: 16,
    level: 3,
    title: 'How Do Magnets Help Us Navigate and Build Machines?',
    subtitle: 'Level 3 -- Coils, Hysteresis Loops, and Weighted Cues',
    icon: '🧲',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In B = μ₀ n I, what is n?',
            options: [
                'The total number of turns on the coil',
                'The number of turns per metre of coil length',
                'The number of coils in the circuit',
                'The coil\'s diameter in metres'
            ],
            correctIndex: 1,
            hint: 'Two coils with the same total turns can give fields a hundred times apart.',
            explanation: 'n is turns divided by the coil\'s length in metres. 500 turns over 25 cm and 200 turns over 10 cm are both 2,000 per metre, so both give the same field — which is why the total alone tells you nothing.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The magnetisation a material keeps when the applied field returns to zero is its:',
            options: ['Coercivity', 'Remanence', 'Saturation', 'Curie temperature'],
            correctIndex: 1,
            hint: 'One of these is what is left; another is what it takes to remove it.',
            explanation: 'Remanence is what remains at zero applied field — the reason a fridge magnet works with nothing driving it. Coercivity is the reverse field needed to wipe that remanence away.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'If weight = 1 / error², a cue twice as sharp as another carries how many times the vote?',
            options: ['Twice', 'Four times', 'The square root of two times', 'The same, since both are cues'],
            correctIndex: 1,
            hint: 'The error is squared before it is inverted.',
            explanation: 'Halving the error quarters the error squared, so it multiplies the weight by four. Sharpness pays off faster than it improves — which is why one good cue can outvote several poor ones.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Which of these does NOT appear anywhere in B = μ₀ n I?',
            options: ['The current', 'The turns per metre', 'The coil\'s diameter', 'The magnetic constant of empty space'],
            correctIndex: 2,
            hint: 'Three of the four are the formula\'s three symbols.',
            explanation: 'Diameter is absent: a fat coil and a thin one with the same turns per metre give the same field inside. The formula does carry conditions instead — a long coil, measured inside, with no iron core.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Mains electricity alternates at 50 Hz. How many times an hour does a transformer core go round its hysteresis loop?',
            options: ['3,600', '50,000', '180,000', '900,000'],
            correctIndex: 2,
            hint: 'Fifty laps a second, and 3,600 seconds in an hour.',
            explanation: '50 x 3,600 = 180,000 laps an hour, and the core pays its loop area in heat on every one. That is why transformer cores use the softest iron available — not because soft iron is a better magnet, but because its loop is thin.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A bird has a star sense good to ±5° and a magnetic sense good to ±20°. Weighting them properly, what is its combined error?',
            options: ['±4.85°', '±5.00°', '±10.31°', '±12.50°'],
            correctIndex: 0,
            hint: 'Weights of 1/25 and 1/400, then one over the root of their sum.',
            explanation: 'The weights are 0.0400 and 0.0025, summing to 0.0425, so the combined error is 1/√0.0425 = ±4.85°. Note it beats the sharp cue used alone at ±5.00°: the vague cue still contributes a little.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A coil of 500 turns wound over 25 cm carries 1.5 A. What is the field inside? (μ₀ = 1.257 x 10⁻⁶ T·m/A)',
            options: ['0.94 mT', '3.77 mT', '5.03 mT', '942 mT'],
            correctIndex: 1,
            hint: 'Work out the turns per metre before anything else.',
            explanation: 'n = 500 / 0.25 = 2,000 per metre, so B = 1.257 x 10⁻⁶ x 2,000 x 1.5 = 3.77 mT. The sense check: the same n as the worked 5.03 mT coil at three quarters of the current gives three quarters of the field. Using 500 directly instead of 2,000 gives the 942 mT trap.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A transformer core is rebuilt to run at 100 Hz instead of 50 Hz, out of the same material. What happens to the heat it wastes each second?',
            options: [
                'It is unchanged, since the material and its loop area are unchanged',
                'It doubles',
                'It quadruples',
                'It halves, because each lap has less time to heat'
            ],
            correctIndex: 1,
            hint: 'The loop area is the price of one lap. What has changed is the number of laps.',
            explanation: 'Area is the energy per cycle and frequency is the number of cycles, so doubling the frequency doubles the heat per second. The material is unchanged; only the lap count is.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A young bird learns its weights backwards: its star sense really is ±5° and its magnetic sense ±20°, but it gives the magnetic cue sixteen times the vote. Its combined error comes out at ±18.83°. Is it better off than a bird that simply averages the two equally?',
            options: [
                'Yes, because any weighting beats no weighting',
                'No — equal weighting gives ±10.31°, so the reversed weights are far worse',
                'Yes, because ±18.83° is still better than the ±20° magnetic cue alone',
                'They come out the same, since the same two cues are involved'
            ],
            correctIndex: 1,
            hint: 'Compare 18.83 with the equal-weighting figure, not with the vague cue.',
            explanation: 'Reversed weights give ±18.83°, against ±10.31° for a blind average — worse than not weighting at all, and close to the vague cue used alone. Weighting only helps when the weights are right, which is what cue-conflict experiments test: rotate the magnetic field and see which cue the bird follows.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An MRI scanner\'s 1.5 T would need 597 A in a copper coil of 2,000 turns per metre. What is the real obstacle, and how is it got round?',
            options: [
                'The obstacle is that no power supply reaches 597 A; scanners use many supplies in parallel',
                'The obstacle is resistive heating, which goes as the current squared — 3,560 times the waste of 10 A — so scanners use superconducting coils with zero resistance',
                'The obstacle is that μ₀ is too small; scanners use an iron core to raise it',
                'The obstacle is winding density, solved by packing 119,000 turns per metre at a comfortable 10 A'
            ],
            correctIndex: 1,
            hint: 'One of these is the tempting answer the lesson rules out with a calculation.',
            explanation: 'Winding tighter is the tempting escape, but 1.5 T at 10 A needs 119,000 turns per metre — a turn every 8.4 micrometres, thinner than a human hair, carrying 10 A. So the current must be large, and heating goes as its square: 3,560 times the waste of 10 A, in a coil wrapped around a person. Cooled to a few degrees above absolute zero, the coil becomes superconducting and produces no heat at all. B = μ₀nI has no term for heat, which is exactly why the formula alone misleads you about what is buildable.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Soft iron saturates near 2 T, while a ferrite fridge magnet reaches only about 0.3 T. Yet the fridge magnet is the one that stays magnetised. What does this show?',
            options: [
                'The 2 T figure must be wrong, since a stronger magnet would keep more',
                'Strength and stubbornness are independent: how much magnetisation a material can hold is a different property from how well it holds it',
                'Soft iron is magnetised only while touching something',
                'Ferrite has the higher Curie temperature, so it lasts longer'
            ],
            correctIndex: 1,
            hint: 'Two separate features of the same loop: how tall it is, and how wide.',
            explanation: 'Saturation is the loop\'s height and coercivity its width, and they vary independently. Soft iron reaches a far higher magnetisation and keeps almost none of it at zero field; ferrite reaches less and keeps it. That independence is what lets a hard disk use both — a hard platter to hold bits for years, and a soft head to reverse in nanoseconds.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Weighting cues by 1/error² cuts the combined error below either cue alone. What does it do nothing about?',
            options: [
                'Scatter in the individual readings',
                'A bias — an error that leans the same way every time',
                'The difference in quality between the two cues',
                'The distance the error becomes over a long flight'
            ],
            correctIndex: 1,
            hint: 'L2B16 made the same distinction with twenty readings of one cue.',
            explanation: 'Weighting, like averaging, works on scatter — errors that fall on both sides and partly cancel. A bias survives untouched, however many cues you combine and however well you weight them. And the weights themselves must be known: get them backwards and you end up worse off than not weighting at all.'
        }
    ]
};
