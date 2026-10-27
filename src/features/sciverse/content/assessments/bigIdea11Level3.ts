import { AssessmentData } from '../../types';

/**
 * Big Idea 11 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P11 (pressure drop = flow x resistance; resistance ∝ length / radius^4),
 * L3C11 (the bicarbonate buffer, pH = 6.1 + log (bicarbonate / (0.03 x CO2
 * pressure))), L3B11 (receptors, clonal selection and antigenic drift).
 *
 * The distractors are the mistakes each lesson works through: squaring once,
 * the ratio upside down, a germ that teaches a shape rather than picking one, and
 * moving CO2 the wrong way.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea11Level3Assessment: AssessmentData = {
    bigIdea: 11,
    level: 3,
    title: 'How Do We Stay Healthy?',
    subtitle: 'Level 3 -- Resistance, Buffers and the Shape You Already Had',
    icon: '🫀',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'For smooth, steady flow through a tube, the resistance is in proportion to:',
            options: ['length / radius⁴', 'radius⁴ / length', 'length x radius', '1 / radius'],
            correctIndex: 0,
            hint: 'A narrower tube resists far more; a longer one resists more too.',
            explanation: 'Resistance ∝ length / radius⁴. The radius counts four times: twice for the room to pass, twice for the walls closing in.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A buffer is:',
            options: ['A weak acid mixed with its partner base, which soaks up added acid', 'A strong acid that lowers the pH', 'Pure water', 'A base that raises the pH as high as it can'],
            correctIndex: 0,
            hint: 'Blood\'s is dissolved CO₂ with bicarbonate.',
            explanation: 'The partner base grabs added H⁺, so the pH changes far less than it would in pure water.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The receptor shapes your lymphocytes carry are made:',
            options: ['Before any germ arrives, at random, in the bone marrow', 'After a germ is examined, to match its antigen', 'Only after a vaccine, from the instructions it carries', 'By the germ, as it divides inside you'],
            correctIndex: 0,
            hint: 'Could a cell inspect an unfamiliar protein and build its complement before a germ doubles?',
            explanation: 'Lymphocytes mature continuously in the bone marrow, each one assembling its receptor gene from segments shuffled almost at random, so the library of shapes exists before anything arrives. Nothing examines the germ: its role is to pick, not to teach.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'In pH = 6.1 + log (bicarbonate / (0.03 x CO₂ pressure)), breathing faster:',
            options: ['Lowers the CO₂ pressure, which raises the ratio and the pH', 'Raises the CO₂ pressure and the pH', 'Adds bicarbonate to the blood', 'Changes nothing, because only the kidneys matter'],
            correctIndex: 0,
            hint: 'Breathing blows off CO₂, the acid below the line.',
            explanation: 'Less CO₂ on the bottom of the ratio makes the ratio bigger, so the pH rises.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'An artery narrows to 60% of its normal radius. The pressure drop along it stays the same. What share of its normal flow gets through?',
            options: ['About 13%', '60%', '36%', 'About 22%'],
            correctIndex: 0,
            hint: 'Square, then square again.',
            explanation: '0.6 x 0.6 = 0.36, and 0.36 x 0.36 = 0.13. 36% squares only once, and 22% is 0.6³.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Blood has bicarbonate 24 mmol/L and a CO₂ pressure of 20 mmHg. What is its pH?',
            options: ['7.70', '7.10', '7.40', '6.80'],
            correctIndex: 0,
            hint: 'Dissolved CO₂ = 0.03 x 20. Then the ratio, then the log.',
            explanation: '0.03 x 20 = 0.6, the ratio is 24 / 0.6 = 40, and 6.1 + log 40 = 6.1 + 1.60 = 7.70: too little CO₂ makes blood less acidic.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Someone is vaccinated. Afterwards their library of receptor shapes holds:',
            options: ['The same shapes as before, with thousands more copies of one of them', 'One brand-new shape, built from the vaccine', 'Antibodies in place of receptors', 'Fewer shapes, because the ones that did not match were discarded'],
            correctIndex: 0,
            hint: 'Where did the matching receptor come from in the first place?',
            explanation: 'The vaccine shows a harmless version of the antigen so that clonal selection runs early. The matching cells were already there; the vaccine finds them, grows the clone and leaves memory cells behind. The shape was always yours, and only the number of copies changed.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Two people meet the same germ. One has a handful of cells that fit it, the other thousands. Both clones divide at the same rate. Why is the second person less likely to fall ill?',
            options: ['The germ is multiplying too, so the clone that starts larger reaches a useful size days sooner', 'The second person makes antibodies that bind more tightly', 'Memory cells divide faster than ordinary lymphocytes', 'The germ multiplies more slowly inside a vaccinated person'],
            correctIndex: 0,
            hint: 'Both sides start on the day of the infection.',
            explanation: 'Antibodies work, but only once there are enough of them, and enough takes a clone of a certain size. A handful of cells needs about five days; thousands need about two. Protection is the outcome of a race, which is why it also depends on age and on the dose of germ.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A whole body needs an 85 mmHg pressure drop to pump 5 L/min. If every small blood vessel narrowed to 80% of its radius, what drop would keep 5 L/min?',
            options: ['About 207 mmHg', 'About 106 mmHg', 'About 35 mmHg', '85 mmHg'],
            correctIndex: 0,
            hint: 'Resistance rises by 1 / 0.8⁴.',
            explanation: '0.8⁴ = 0.41, so resistance rises 2.44 times, and 85 x 2.44 = 207 mmHg. 106 uses 1 / 0.8, and 35 multiplies by 0.41 instead of dividing.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Acid has used up bicarbonate until it is 18 mmol/L. What CO₂ pressure would bring the pH to 7.40?',
            options: ['30 mmHg', '53 mmHg', '40 mmHg', '60 mmHg'],
            correctIndex: 0,
            hint: 'pH 7.40 needs the ratio 20.',
            explanation: 'Dissolved CO₂ must be 18 / 20 = 0.9 mmol/L, and 0.9 / 0.03 = 30 mmHg -- breathing faster. 53 mmHg moves the CO₂ the wrong way.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two vaccinated people fall ill anyway. In one, the right cells were found and expanded too slowly. In the other, nothing was found at all. Which is which, and which one needs the vaccine remade?',
            options: ['The first lost the race, which a bigger head start helps; the second is antigenic drift, and only a remade vaccine helps', 'Both are antigenic drift, so both need the vaccine remade', 'Both are lost races, so neither needs the vaccine remade', 'The second means the memory cells died, so a booster of the same vaccine fixes it'],
            correctIndex: 0,
            hint: 'One is a failure of timing. The other is a failure of recognition.',
            explanation: 'Losing the race means recognition worked and the clone was out-grown. Drift means the antigen changed shape, so the stored receptor is the complement of last year with nothing to bind -- the memory cells are perfectly healthy and recognise nothing, and no head start fixes that. It is why influenza is remade yearly while measles, whose antibody-binding regions are also the regions it uses to enter cells, is not.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do Big Idea 11\'s Level 3 lessons have in common?',
            options: ['Each supplies one thing immune recognition needs: pressure to carry the shapes, acidity held steady to keep them the shapes they were, and a library that already holds one that fits', 'Every result changes in step with its cause', 'They all use the same formula', 'Each describes a separate organ with nothing in common'],
            correctIndex: 0,
            hint: 'Immune recognition is shapes meeting shapes. What has to be true at once for that to work?',
            explanation: 'A receptor is a folded protein held by weak attractions that depend on which parts carry a charge, and that depends on acidity -- so L3C11 buffer keeps every shape trustworthy for a lifetime. L3P11 pressure carries the clone to the infection, and L3B11 library does the recognising. Take away any one and the other two are useless.'
        }
    ]
};
