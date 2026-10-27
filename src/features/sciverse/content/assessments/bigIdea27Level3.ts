import { AssessmentData } from '../../types';

/**
 * Big Idea 27 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P27 (peristalsis is a travelling ring that seals behind the mouthful, so the
 * food is enclosed and gravity can only add weight; 80 cm of water against a 25 cm lift
 * is a margin of 3.2; a sealing travelling ring carries food at the wave speed, giving an
 * 8 s swallow, so the small intestine's 1/75 is a count of how many contractions travel),
 * L3C27 (joining releases a water, so a unit in a chain is 162 g/mol and not 180 --
 * exactly 10% -- giving 5.6 x 10^22 bonds; and 3% are alpha-1,6, which amylase cannot cut
 * at any dose), and L3B27 (what that enzyme IS: a
 * folded protein whose active site is a pocket shaped for one join, anchored in the
 * membrane of the lining cells beside the transporter that takes the sugar in, studding
 * the microvilli of the brush border -- so the food must be brought to it, which is what
 * the non-travelling contractions are for, and flattening the surface ruins digestion
 * without a single enzyme being faulty).
 * The spine: the gut has two jobs and one muscle, and the 74 contractions in 75 that
 * transport nothing are the ones that press food against the wall.
 * Questions 8 and 11 were rewritten on 26 October 2026 when L3B27 was rebuilt
 * structure-first; both had been arithmetic about presses.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea27Level3Assessment: AssessmentData = {
    bigIdea: 27,
    level: 3,
    title: 'How Does Food Become Usable Energy?',
    subtitle: 'Level 3 -- The Ring, the Water, and the Pocket',
    icon: '🤸',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'You can swallow a mouthful of water while standing on your head. Why does gravity not simply pull it back?',
            options: [
                'The muscle squeezes faster than gravity can act',
                'The ring of muscle seals the tube behind the mouthful, so there is no path for it to fall down',
                'Water is too light for gravity to matter over such a short distance',
                'The oesophagus is lined with something sticky'
            ],
            correctIndex: 1,
            hint: 'What does water need in order to fall?',
            explanation: 'Water falls because there is somewhere below it to fall to, and a tube squeezed shut is not somewhere. The mouthful is enclosed between a sealed ring behind and relaxed tube in front, so direction stops mattering. Gravity has not gone away -- it is reduced to a load the muscle has to carry, rather than a leak it has to outrun.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Glucose has a molar mass of 180 g/mol. What does one glucose unit inside a starch chain weigh?',
            options: [
                '180 g/mol — it is still glucose',
                '162 g/mol — joining released one water molecule',
                '198 g/mol — the bond adds mass',
                '90 g/mol — the unit is shared between two bonds'
            ],
            correctIndex: 1,
            hint: 'What leaves when two glucose molecules join?',
            explanation: 'Joining two glucose molecules releases one water: a shared oxygen bridges the rings and H2O leaves. So a unit inside a chain is lighter than a free molecule by 18 g/mol, giving 180 - 18 = 162. That single subtraction is the whole reason this lesson exists, because getting it wrong costs exactly a tenth of the answer.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The enzyme that cuts the last 3% of starch bonds is fixed to the wall of the gut. What does it need that amylase does not?',
            options: [
                'More time in the tube',
                'Contact — the food has to be pressed against the wall to reach it',
                'A higher temperature',
                'More of itself'
            ],
            correctIndex: 1,
            hint: 'A fixed enzyme cannot go to its food. So what has to happen?',
            explanation: 'Amylase drifts in the fluid, already beside its food everywhere, so giving it longer means more cuts. A fixed enzyme is not helped by time at all: a lump of food sitting in the middle of the tube will not be finished in an hour or in a week, because nothing it needs is where it is. It has to be pushed against the lining.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A peristaltic wave makes about 80 centimetres of water of pressure, and must lift a mouthful 25 cm. What is the margin?',
            options: [
                'About 3.2 — it carries the mouthful comfortably',
                'About 0.3 — the wave is far too weak',
                'There is no margin, because pressure and height are different quantities',
                'About 55, the difference between them'
            ],
            correctIndex: 0,
            hint: 'Both numbers are in centimetres. Divide them.',
            explanation: '80 / 25 = 3.2, so the wave has over three times the pressure the job needs -- which is why the party trick is unremarkable. Measuring pressure as the height of water it will hold up is what makes this easy: the test is centimetres against centimetres, with no density, no gravity and no conversion.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A sealing, travelling ring cannot be slipped past or outrun, so food moves at the wave speed of 3 cm/s. What does that predict for a 25 cm oesophagus, and why does it matter?',
            options: [
                'About 8 seconds — and a real swallow takes five to ten, so the ring really does seal',
                'About 75 seconds — which is why swallowing feels slow',
                'It predicts nothing, because the wave speed is not the food speed',
                'About 0.1 seconds — too fast to notice'
            ],
            correctIndex: 0,
            hint: 'Divide the length by the speed, then check it against something you have done thousands of times.',
            explanation: '25 / 3 is about 8 seconds, and a mouthful really does take five to ten seconds to reach the stomach. That is what makes this a mechanism rather than a story: it predicts a number you can check by swallowing and counting, without measuring any pressure. And it sets up the puzzle, because the small intestine does not behave this way at all.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Somebody counts the bonds in 15 g of starch but divides by glucose\'s 180 g/mol instead of 162. How wrong is the answer?',
            options: [
                'About 10% high',
                'Exactly 10% low, at any mass, because 162/180 = 0.900',
                'Negligibly wrong — 18 out of 180 is small',
                'Impossible to say without knowing the chain length'
            ],
            correctIndex: 1,
            hint: 'Dividing by a bigger number gives what? And work out the ratio of the two molar masses.',
            explanation: 'Dividing by a bigger number gives a smaller answer: 15/180 gives 5.0 x 10^22 against the correct 5.6 x 10^22. And the error is fixed rather than approximate, because 162/180 is exactly 0.900 -- so the wrong answer is always 90% of the right one, for a slice or for a tonne. One part in ten is not a rounding error, and it has a cause: a water molecule left when the bond formed.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Amylase cannot cut the alpha-1,6 bonds at starch branch points. Would ten times as much amylase eventually get through them?',
            options: [
                'Yes, but it would take about ten times too long to be useful',
                'No — the rate is zero, and zero times any number of molecules is still zero',
                'Yes, since 3% is a small share of the bonds',
                'No, because the branch points are buried too deep inside the chain'
            ],
            correctIndex: 1,
            hint: 'Where does the amount of enzyme sit in L2C27\'s formula, and what does it change?',
            explanation: 'More enzyme increases the cutters, which shortens the time -- that is why 3 mg beats one molecule by a factor of 10^16. But an alpha-1,6 bond is not a slow job for amylase, it is not a job for amylase at all. An enzyme grips by shape, and a join facing sideways does not fit a slot built for one facing along the chain. An enzyme is a shape, not an effort, so the answer is a different enzyme and never more of this one.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'The enzymes that make the last cuts sit in the membrane of the lining cells, with a transporter channel beside them. Why does being anchored there help?',
            options: [
                'It holds the enzyme still so the bond cannot escape it',
                'The sugar it releases appears a few nanometres from the channel that carries it into the cell, so the last cut and the uptake happen in one place',
                'The membrane makes the enzyme work faster',
                'It stops the enzyme being digested by amylase'
            ],
            correctIndex: 1,
            hint: 'Glucose cannot cross a membrane by itself. What does it need, and where is it?',
            explanation: 'What this enzyme releases is finished -- a single glucose, ready to absorb and useless if it is not. Glucose cannot cross a membrane unaided; it needs a transporter, a protein folded into a channel. Building the enzyme into the same membrane guarantees the product appears beside the way in. A free enzyme would cut out in the flow and release sugar into a moving current, to find a wall before the wall was behind it. The principle is general: put the last step of a process where the product is needed.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A sealing travelling ring would carry food through all 600 cm of small intestine in 200 seconds. It actually takes 4.2 hours. What does the factor of 75 measure?',
            options: [
                'That the rings there are 75 times weaker',
                'That about one contraction in 75 travels, while the other 74 tighten and release on the spot',
                'That the mechanism is wrong by a factor of 75',
                'That the food is 75 times more viscous than water'
            ],
            correctIndex: 1,
            hint: 'It takes two things to transport: the ring must close, and the ring must go somewhere.',
            explanation: 'Strength decides whether a ring can shift its load, not how fast it goes once it does -- and a ring too weak to close would carry nothing rather than carrying slowly. The missing word is travel. A contraction that tightens and loosens in one place squeezes the contents apart and lets them flow back: net transport nothing, net mixing a great deal. So the 75 is not a strength and not an error. It is a count.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two starch samples weigh the same, but one has a branch every 15 glucose units and the other every 40. How do they compare?',
            options: [
                'The same total bonds, but 5% are uncuttable in the first against 1.9% in the second',
                'The more branched one has more bonds in total',
                'They are identical, since branching does not change the chemistry',
                'The less branched one has more bonds amylase cannot cut'
            ],
            correctIndex: 0,
            hint: 'Does branching add joins, or rearrange which kind they are?',
            explanation: 'The bond count comes from the mass alone -- same mass, same moles of glucose units, same number of joins. What branching changes is which kind each join is: with about three quarters of starch branched, a branch every 15 units makes 0.75/15 = 5% of bonds alpha-1,6, against 0.75/40 = 1.9%. One dial sets how many joins there are and the other sets how many are the wrong kind, and they are genuinely independent.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'In coeliac disease the immune system flattens the microvilli of the brush border. The cells can still make isomaltase and maltase perfectly well. What happens to the last 3%?',
            options: [
                'It continues, because the enzyme is still being produced',
                'It largely fails: an anchored enzyme is useful for its position, and flattening the surface destroys the positions without touching the molecules',
                'It slows down exactly in proportion to the lost surface',
                'It speeds up, because a smooth wall is easier for food to reach'
            ],
            correctIndex: 1,
            hint: 'Where can an anchored enzyme be if its anchor is gone?',
            explanation: 'These molecules are not useful as molecules but as positions -- a pocket held in a membrane with its active site facing the food and a transporter beside it. Flatten the microvilli and most of those positions no longer exist, so most of the enzyme the cell makes is never installed anywhere it can act. A free enzyme\'s usefulness really is its quantity, which was L2C27\'s whole result about amylase; an anchored one\'s is its place. The uncut pieces travel on and feed the bacteria of the large intestine, which is where the symptoms come from -- not a missing enzyme, a missing surface.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'L3P27 found that only 1 contraction in 75 travels, which looks like a gut running at 1.3% efficiency. What are the other 74 actually doing?',
            options: [
                'Wasting effort, as the price of muscle that fires unreliably',
                'Waiting as spares, in case the travelling contractions fail',
                'Pressing the contents against the wall — they are the 2,500 presses, doing the whole of the last 3%',
                'Nothing, but the cost is too small to matter'
            ],
            correctIndex: 2,
            hint: 'Count what a non-travelling contraction does, rather than what it fails to do.',
            explanation: 'It tightens, drives the contents against the lining where the fixed enzymes are, and releases. That is one press, and with contractions about ten a minute over four hours there are a couple of thousand of them. The 74 were never doing transport -- they are doing the other job, which amylase cannot do and time cannot buy. Judging the gut by how far its squeezes move food is like judging a mixer by how far it carries the cake: going nowhere is the mechanism. Transport has to happen once per mouthful; contact has to happen two and a half thousand times.'
        }
    ]
};
