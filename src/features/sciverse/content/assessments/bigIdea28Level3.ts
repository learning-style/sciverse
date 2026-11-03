import { AssessmentData } from '../../types';

/**
 * Big Idea 28 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P28 (one cycle is 60/rate, split between a fixed squeeze and whatever
 * filling is left, so the output peaks at 171 and is zero at 300), L3C28 (osmotic
 * pull is colligative: joining glucose into chains of 50,000 divides the particle
 * count without touching the mass), and L3B28 (flow to a muscle is output times
 * the oxygen dissociation curve, and the Bohr shift that moves it).
 *
 * The distractors are the mistakes each lesson works through: treating the two
 * cardiac factors as independent, reaching for mass where the water counts
 * particles, and assuming shares are fixed when the total rises.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea28Level3Assessment: AssessmentData = {
    bigIdea: 28,
    level: 3,
    title: 'How Do Body Systems Work Together?',
    subtitle: 'Level 3 -- Time to Fill, Particles Not Mass, and Who Gives Up Their Share',
    icon: '🫀',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A heart beats 150 times a minute. How long is one cardiac cycle?',
            options: ['2.5 s', '0.40 s', '150 s', '0.15 s'],
            correctIndex: 1,
            hint: 'A minute divided among the beats.',
            explanation: '60 / 150 = 0.40 s. Everything in L3P28 starts here: the squeeze takes a roughly fixed 0.20 s out of that, so the filling gets whatever is left -- 0.20 s in this case, which is still more than the 0.15 s a full beat needs.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Osmotic pull depends on:',
            options: ['The total mass dissolved', 'How heavy each dissolved particle is', 'How many particles are dissolved', 'The chemical energy of the solute'],
            correctIndex: 2,
            hint: 'The water is doing one of two things: counting, or weighing.',
            explanation: 'It is a colligative property: it counts particles and is blind to what they are or weigh. A mole of glucose and a mole of a protein a thousand times heavier pull exactly the same. The only correction is for solutes that split -- a mole of salt gives two moles of ions and pulls twice as hard.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Blood leaves the lungs 98% saturated and reaches a resting muscle, where haemoglobin is 77% saturated. How much of a litre of 200 mL does it give up?',
            options: ['All 200 mL', 'About 150 mL', 'About 40 mL, because the difference is 21% and 21% of 200 is about 40', 'None, until the muscle starts working'],
            correctIndex: 2,
            hint: 'Read both saturations and subtract.',
            explanation: 'The difference between arriving and leaving is what the tissue got. That is where L2B28 got its resting figure of 50 mL, and it means three quarters of the cargo goes straight back to the lungs -- not waste, but the reserve available if the muscle works harder.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'When the heart rate rises, which part of the cycle gets shorter?',
            options: ['The squeeze and the filling shorten equally', 'Only the squeeze', 'Neither — the cycle keeps its length', 'Almost all of the loss comes out of the filling'],
            correctIndex: 3,
            hint: 'One of the two is a muscular contraction that cannot be hurried much.',
            explanation: 'The squeeze is a contraction of muscle with its own fixed length -- about 0.20 s to be set off, shorten, build pressure, open a valve and push. It takes its share first, so every second removed from the cycle comes out of the filling. Going from 60 to 120 beats does not halve the filling time; it cuts it from 0.800 s to 0.300 s.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A liver cell holds 100 g of sugar as free glucose, giving an osmotic pull of 9.4 atmospheres. Every glucose is then joined into a pair, and nothing else changes. What is the pull now?',
            options: ['Still 9.4 atm — the same 100 g is dissolved either way', 'About 4.7 atm — half as many particles', 'About 18.8 atm — each particle is twice as heavy', 'Zero — joined molecules exert no pull at all'],
            correctIndex: 1,
            hint: 'Count the moles, not the grams.',
            explanation: '100 g of glucose is 0.556 mol; in pairs it is 0.278 mol of particles. The grams sit still while the moles halve, so the pull halves. Thinking the pull doubles with the heavier particle is the natural guess and it is backwards -- which is exactly why osmotic pressure is used in the laboratory to measure the molar mass of large molecules.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why is the oxygen dissociation curve S-shaped rather than a straight line?',
            options: ['Because red cells change shape as they squeeze through a capillary', 'Because haemoglobin carries four oxygens, and binding one makes the next easier to bind', 'Because oxygen dissolves more readily at high pressure', 'Because blood slows down in the capillaries'],
            correctIndex: 1,
            hint: 'How many oxygens does one haemoglobin molecule carry?',
            explanation: 'One haemoglobin is four subunits. Binding the first oxygen changes the shape of the whole molecule so the second binds more easily, and the second helps the third. That is cooperative binding: shallow at the start because the first is hard to attach, steep in the middle as each helps the next, and flat at the top once almost no sites are left.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'With a squeeze of 0.20 s and a full beat needing 0.15 s of filling, at what rate is the output greatest?',
            options: ['About 171 a minute', 'About 300 a minute', 'About 400 a minute', 'As fast as the heart can go'],
            correctIndex: 0,
            hint: 'The best beat is the last one that is still a full beat.',
            explanation: 'A full beat needs 0.20 + 0.15 = 0.35 s of cycle, so the fastest rate that still fills completely is 60 / 0.35 = 171. Below it the volume is pinned at 110 mL and beating faster is pure gain; above it the volume falls faster than the rate rises. L2P28 had unknowingly put its sprint at 180, just past the top.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'The same drop of 2.7 kPa releases about 2% of the load high on the curve and about 45% in the middle. What does that buy?',
            options: ['Nothing useful; it is a side effect of the protein shape', 'It makes the blood carry more oxygen in total', 'Blood still leaves the lungs nearly full when air is thin, while a small fall at a muscle unloads a large share', 'It lets the lungs work at a lower pressure than the tissues'],
            correctIndex: 2,
            hint: 'Where on the curve is blood loading, and where is it unloading?',
            explanation: 'The curve is flat exactly where blood loads and steep exactly where it unloads. High on the flat part the partial pressure can fall a long way -- a head cold, thin mountain air -- and the blood still leaves nearly full. Down on the steep part a small fall dumps a large share. Being hard to move at the top and easy to move in the middle is what makes haemoglobin a delivery system rather than a container.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A heart in an abnormal rhythm beats 300 times a minute, and the squeeze still takes 0.20 s. How much blood does it move, and why?',
            options: [
                'About half the maximum — a high rate times a partly filled beat',
                'Essentially none — 60/300 is 0.20 s, so the whole cycle is the squeeze and no filling time is left',
                'More than at 171, since the rate is nearly double',
                'About the same as at 171, because the two effects cancel'
            ],
            correctIndex: 1,
            hint: 'Do the first division before anything else.',
            explanation: 'The cycle is 0.200 s and the squeeze is 0.200 s, so there is no relaxed interval at all: nothing flows in and nothing is ejected. Above the peak the rate cancels out of the arithmetic and the output falls in a straight line -- 14.7 L/min at 200, 7.3 at 250, zero at 300. Half the maximum is the answer you get by treating the two factors as independent, and they are not: the rate sets the volume through the filling time.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Real glycogen is heavily branched, with a side chain every ten or twelve units. Branching costs extra enzymes to build and an extra one to take apart. What does it buy?',
            options: [
                'Speed: an enzyme works at a chain\'s end, and branches give a single molecule thousands of ends instead of one',
                'A further fall in osmotic pull, beyond what simple joining achieves',
                'Physical strength, so the store does not fall apart on its own',
                'More glucose stored in the same volume'
            ],
            correctIndex: 0,
            hint: 'One branched molecule and one straight molecule of the same mass are both one particle.',
            explanation: 'Branching does nothing for the water -- that problem was solved the moment the units were joined at all. What it fixes is release: a straight 50,000-unit chain has one usable end, which is hopeless when a sprint wants glucose in seconds. Joining makes the store invisible to water; branching makes it spendable. And the branch points are the α-1,6 links L3C27 showed amylase cannot cut, which is why the liver keeps a separate enzyme for them alone.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A working muscle makes carbon dioxide, which makes the blood slightly acidic, which shifts the dissociation curve to the right. What is doing the deciding?',
            options: ['The brain, which detects the working muscle and signals the blood to release more', 'Nothing measures or decides: the waste the muscle makes is itself the signal, so oxygen is released where it is being used', 'The heart, which pumps harder and forces more oxygen out', 'The lungs, which load the blood differently for a working body'],
            correctIndex: 1,
            hint: 'Walk the chain and ask which step involves anything noticing anything.',
            explanation: 'Every link is ordinary chemistry happening where it happens: the muscle respires, respiring makes carbon dioxide, carbon dioxide makes the blood acidic, acid loosens the grip on oxygen. No nerve carries a request and no hormone is released. The signal arrives exactly where it is needed because that is where it was made -- which is how body systems work together with nothing in charge. The heart changes how many litres arrive, which is a different factor.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'All three Level 3 lessons here found the same shape. What is it?',
            options: [
                'Each organ works independently, so the whole runs without anything giving anything up',
                'The body makes more of whatever is short, whenever a system needs it',
                'Each lesson found that its Level 2 formula was wrong',
                'Each is a shared thing with no spare, so working together is a trade — and each lesson names what pays'
            ],
            correctIndex: 3,
            hint: 'What does each one share, and who gives it up?',
            explanation: 'P28 divides one second between squeezing and filling, so more beats means emptier ones. C28 has no room for the water a dissolved store drags in. B28\'s litres have to be taken from the gut and the kidneys. None of the Level 2 formulas was wrong -- what changed is that the factors turned out not to be independent. C28 is the one designed best, because joining the sugar changes the particle count while leaving the mass alone: a way of not having to trade at all.'
        }
    ]
};
