import { AssessmentData } from '../../types';

/**
 * Big Idea 27 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P27 (peristalsis is a travelling ring that seals behind the mouthful, so the
 * food is enclosed and gravity can only add weight; 80 cm of water against a 25 cm lift
 * is a margin of 3.2; a sealing travelling ring carries food at the wave speed, giving an
 * 8 s swallow, so the small intestine's 1/75 is a count of how many contractions travel),
 * L3C27 (joining releases a water, so a unit in a chain is 162 g/mol and not 180 --
 * exactly 10% -- giving 5.6 x 10^22 bonds; and 3% are alpha-1,6, which amylase cannot cut
 * at any dose), and L3B27 (a free enzyme is paid in time, a fixed one in contact;
 * contacts = time x rate = 2,500 presses, which weak contractions halve while leaving the
 * transit time and L2B27's margin untouched).
 * The spine: the gut has two jobs and one muscle, and the 74 contractions in 75 that
 * transport nothing are the ones that press food against the wall.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea27Level3Assessment: AssessmentData = {
    bigIdea: 27,
    level: 3,
    title: 'How Does Food Become Usable Energy?',
    subtitle: 'Level 3 -- The Ring, the Water, and the Press',
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
            question: 'Food is in the small intestine for 15,000 s, and segmenting contractions come about 10 times a minute. How many times is each mouthful pressed against the wall?',
            options: [
                'About 2,500',
                'About 10, once per contraction type',
                'About 150,000',
                'It cannot be counted from these two numbers'
            ],
            correctIndex: 0,
            hint: 'Contacts = time in the tube x the rate of squeezing. Watch the minutes and seconds.',
            explanation: '15,000 s x 10 per minute / 60 = about 2,500 presses. Each squeeze tightens, drives the contents outwards against the lining where the fixed enzymes are, and lets go. So every bit of a meal is pushed against the wall two and a half thousand times on the way down -- which is the currency the last 3% is paid in, and it is bought by squeezing rather than by time.'
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
            question: 'Somebody\'s contractions weaken from 10 a minute to 5, with 600 cm of tube and normal advance speed. What would a clinician timing a marker through the gut see?',
            options: [
                'A transit time twice as long',
                'Nothing wrong at all — the transit time and L2B27\'s margin of 8.6 are both unchanged, while the presses have halved',
                'A transit time half as long',
                'A margin of 4.3 instead of 8.6'
            ],
            correctIndex: 1,
            hint: 'Does the contraction rate appear anywhere in length divided by speed?',
            explanation: 'The transit time is length over speed, and the contraction rate is in neither. So it stays at 15,000 s and the margin stays at 8.6 -- every number a stopwatch can reach is normal -- while the presses against the wall fall from 2,500 to 1,250. A normal transit time proves nothing about the last 3%. Compare a 100 cm bowel, where both collapse together, because the length was buying both.'
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
            explanation: 'It tightens, drives the contents against the lining where the fixed enzymes are, and releases. That is one press, and there are about 2,500 of them. The 74 were never doing transport -- they are doing the other job, which amylase cannot do and time cannot buy. Judging the gut by how far its squeezes move food is like judging a mixer by how far it carries the cake: going nowhere is the mechanism. Transport has to happen once per mouthful; contact has to happen two and a half thousand times.'
        }
    ]
};
