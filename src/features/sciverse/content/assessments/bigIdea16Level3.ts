import { AssessmentData } from '../../types';

/**
 * Big Idea 16 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P16 (B = mu0 n I, and why an MRI cannot be wound in copper), L3C16
 * (hysteresis: remanence, coercivity, loop area as heat per cycle), L3B16
 * (magnetite, cryptochrome, and why neither structure can report north).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea16Level3Assessment: AssessmentData = {
    bigIdea: 16,
    level: 3,
    title: 'How Do Magnets Help Us Navigate and Build Machines?',
    subtitle: 'Level 3 -- Coils, Hysteresis Loops, and a Compass With No North',
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
            question: 'Earth\'s field is reversed completely, so it runs the other way along the same line. What happens to the torque on a magnetite crystal in a bird\'s beak?',
            options: ['Nothing — swinging into line with the field has two ends, so the torque is identical', 'It reverses, twisting the crystal the other way', 'It doubles', 'It falls to zero'],
            correctIndex: 0,
            hint: 'Where does a crystal settle when a torque swings it into line?',
            explanation: 'The crystal settles in exactly the same place and pulls exactly as hard on exactly the same anchor, so the cell holding it cannot tell the two cases apart. Cryptochrome fails the same test for the same kind of reason: its radical pair responds to the angle between the field and the molecule, and reversing the field leaves that angle unchanged. Neither structure can report north.'
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
            question: 'A migrating bird sits in a cage inside coils. Reversing the field\'s horizontal part leaves its heading unchanged; reversing the vertical part turns it right around. What does that show?',
            options: ['It reads the angle at which the field dips into the ground, not the direction a needle swings to', 'Its compass is simply weaker than a compass needle', 'It was using the stars all along, not the field', 'The horizontal part of Earth\'s field is too small for any animal to detect'],
            correctIndex: 0,
            hint: 'Which part does a compass needle actually swing into line with?',
            explanation: 'A needle lives or dies by the horizontal part, and the bird ignored it. It was turned around by the part a needle barely uses — so what the bird reads is the inclination, the angle measured downward from the horizontal ground. An angle of dip has no north in it: it names poleward or equatorward and nothing else.'
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
            question: 'Magnetic rock pulls every magnetic reading the same 8° east, and L2B16 proved that averaging cancels scatter but never a bias. So what does a young bird do with the stars, and why does it work?',
            options: [
                'It takes far more magnetic readings, since a bias falls as the square root of the count',
                'It averages the star bearing with the magnetic bearing, which removes half of the bias',
                'It finds the still point the stars turn about and corrects the magnetic compass against it — a reference no hillside of rock can bias',
                'It abandons the magnetic sense for good once it has seen the stars once'
            ],
            correctIndex: 2,
            hint: 'One of the two cues can be checked against something the ground cannot reach.',
            explanation: 'Over a few hours every star sweeps round except near one point, and that still point is the centre of the rotation. Finding it needs no constellations, only the geometry of the motion, and it has nothing to do with the ground. So the stars are not a second vote to be averaged in — they are the reference, and the magnetic compass is the one that gets corrected. That is why a second cue of a different kind is worth more than twenty repeats of the first.'
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
            question: 'Why does the mechanism itself predict that a bird\'s magnetic compass fails at the magnetic equator?',
            options: [
                'Earth\'s field is weakest there, so no structure could detect it at all',
                'Its compass is the angle at which the field dips, and at the equator the field lies level — so there is no tilt to read',
                'Magnetite loses its magnetism at tropical temperatures',
                'Bright equatorial light saturates cryptochrome in the retina'
            ],
            correctIndex: 1,
            hint: 'What does an inclination compass have left when the inclination is zero?',
            explanation: 'The whole compass is the steepness of the dip, so a level field has nothing in it to tell poleward from equatorward. Birds that cross the equator do it on other cues, which is a consequence of the mechanism rather than an oddity. Magnetite is in no danger from the heat: L2C16 put its Curie temperature at 585 °C against a body at 41 °C.'
        }
    ]
};
