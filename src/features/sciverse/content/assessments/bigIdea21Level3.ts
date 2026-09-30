import { AssessmentData } from '../../types';

/**
 * Big Idea 21 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P21 (a tide is a difference in pull, so it goes as M/r^3 rather than
 * M/r^2, giving the Sun 0.459 of the Moon's tide and deriving L2P21's 2.70),
 * L3C21 (absorbing CO2 spends a carbonate ion, so the Revelle factor makes the
 * ocean take a tenth of what its size suggests, and the sink is consumed by its
 * own work), L3B21 (amplification = [ATP]/[ADP], so a small store is a fast
 * sensor).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea21Level3Assessment: AssessmentData = {
    bigIdea: 21,
    level: 3,
    title: 'How Do Cycles Keep Systems Alive?',
    subtitle: 'Level 3 -- The Cube, the Spent Reactant, and the Scarce Signal',
    icon: '🌀',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The Sun pulls the Earth about 179 times harder than the Moon does, yet raises less than half the tide. Why does the enormous pull not win?',
            options: [
                'The Sun is too hot for its gravity to reach the oceans',
                'The Earth as a whole is in free fall, so only the unevenness of a pull across the Earth is left over to raise water',
                'Sunlight pushes the water back down again',
                'The Moon is denser, and density raises tides'
            ],
            correctIndex: 1,
            hint: 'What would happen if a body pulled every part of the Earth exactly equally?',
            explanation: 'A pull that is the same everywhere accelerates the whole Earth together and raises no tide at all — an astronaut in orbit feels nothing, however hard the Earth pulls. Only the difference between the near side, the centre and the far side is left over, and the Sun is so far away that its enormous pull is almost perfectly even.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The ocean holds about 50 times as much carbon as the air. What does the reaction CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻ tell you about absorbing more?',
            options: [
                'Absorbing is free, so the ocean can take everything',
                'Each CO₂ absorbed spends one carbonate ion, so the ocean uses up the reactant it needs',
                'The ocean gives off CO₂ rather than taking it in',
                'Absorbing makes more carbonate, so it gets easier'
            ],
            correctIndex: 1,
            hint: 'Read the left-hand side and ask what is consumed.',
            explanation: 'Carbonate, CO₃²⁻, is a reactant. Every molecule of CO₂ taken up spends one, and the product — bicarbonate — is no use for absorbing more. So the ocean is not a passive drain: it is a sink consumed by its own work.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A resting cell holds ATP at 5.0 mM and ADP at 0.50 mM. It spends 0.05 mM of the ATP. What happens to each pool in percentage terms?',
            options: [
                'Both change by 1%, because each ATP spent makes exactly one ADP',
                'ATP falls 1% and ADP rises 10%, because the same amount is a bigger fraction of the smaller pool',
                'ATP falls 10% and ADP rises 1%',
                'Only ATP changes; ADP is made separately'
            ],
            correctIndex: 1,
            hint: 'The same 0.05 mM, divided by two different pool sizes.',
            explanation: '0.05 out of 5.0 is 1%; 0.05 out of 0.50 is 10%. One molecule moves, and it means ten times more to the small pool than to the large one. That asymmetry is the whole mechanism.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A pull goes as 1 over distance squared. What does the tide-raising force go as, and why?',
            options: [
                '1 over distance squared as well, since it comes from the same pull',
                '1 over distance cubed, because taking the difference in the pull across the Earth costs one more power of distance',
                '1 over distance, because differences are simpler',
                'Distance squared, growing with distance'
            ],
            correctIndex: 1,
            hint: 'The further away a body is, the more nearly equal its pull is on both sides of the Earth.',
            explanation: 'The tide-raising force per kilogram is about 2GMR/r³. A difference loses a power of r, because distance makes the two sides of the Earth more nearly alike — and equal pull raises no tide.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'The Sun has 27,000,000 times the Moon\'s mass and is 389 times further away. What is its tide compared with the Moon\'s?',
            options: [
                '179 times, the ratio of the pulls',
                '0.459, because 389³ = 58,900,000 and 27,000,000 / 58,900,000 = 0.459',
                '69,400, from dividing by 389',
                'About 1, since the two tides are similar'
            ],
            correctIndex: 1,
            hint: 'Tides go as (M₁/M₂) × (r₂/r₁)³.',
            explanation: 'Cube the distance ratio, not square it: 58.9 million against 27 million of mass advantage gives 0.459. That number is not looked up — it comes from mass and distance alone, and it matches the 2.2 m and 1.0 m that Level 2 simply handed over.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why does the surface layer of the ocean matter more than the ocean\'s total size when working out how fast an excess of CO₂ drains?',
            options: [
                'The surface is warmer, and warm water absorbs more',
                'Only the surface layer touches the air, and it holds about 900 GtC — the deep ocean\'s vast carbonate takes centuries to come up and take its turn',
                'The deep ocean holds no carbonate at all',
                'Surface water is fresher, so it dissolves more gas'
            ],
            correctIndex: 1,
            hint: 'Which carbonate is available on a human timescale?',
            explanation: 'The ocean holds around 38,000 GtC, but the layer in contact with the air holds about 900. Its carbonate is what is within reach now. The question is never whether the ocean is big; it is how much carbonate is in reach, and how quickly spending it makes the next absorption harder.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A cell keeps a resting ATP to ADP ratio of 50 to 1. Its ATP falls by 1%. By how much does ADP rise?',
            options: [
                'By 1%, since one ATP makes one ADP',
                'By about 50%, because the amplification is the resting ratio itself',
                'By 0.02%, from 1% divided by 50',
                'By 100%, because the pool doubles'
            ],
            correctIndex: 1,
            hint: 'Amplification = [ATP]/[ADP], so multiply.',
            explanation: '1% × 50 = 50%. If an answer makes the scarcer pool less sensitive, the ratio has been used upside down: the same number of molecules must matter more to the smaller pool, not less.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'An excess of 300 GtC drains into a sea with a Revelle factor of 10, giving a net uptake of about 5 GtC a year. Roughly how long for the easy part — and what happens after that?',
            options: [
                '60 years, and then it is finished',
                'About 60 years for the easy part, then centuries waiting on the deep ocean and millennia on rock weathering',
                '6 years, then nothing more happens',
                '3,000 years, all at the same slow rate'
            ],
            correctIndex: 1,
            hint: '300 ÷ 5, and then ask what is left to do the rest of the work.',
            explanation: '300/5 = 60 years, and that only drains the part the surface layer can take. The rest waits on deep water bringing fresh carbonate up over centuries, and finally on rock weathering over millennia. Which is how a 4.2-year residence time and a centuries-long excess are both true.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Level 2 said spring tides are about 2.7 times neap tides and gave no reason. With the Sun\'s tide at 0.459 of the Moon\'s, where does 2.7 come from?',
            options: [
                'It is measured from tide tables and cannot be derived',
                '(1 + 0.459) / (1 − 0.459) = 1.459 / 0.541 = 2.70 — the two tides adding, then opposing',
                '0.459 × 6 = 2.75, from the six hours between tides',
                '2.7 is the ratio of the Moon\'s to the Sun\'s mass'
            ],
            correctIndex: 1,
            hint: 'At springs the two pull together; at neaps they fight.',
            explanation: 'Springs are 1 + 0.459 and neaps are 1 − 0.459, and the ratio is 2.70. This is what a Level 3 lesson is for: the number Level 2 borrowed now falls out of the mass and distance of the Sun and Moon, and it agrees with real tide tables.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two countries emit the same total carbon, one over 300 years and one over 30. The arithmetic says the slow one is not merely gentler but chemically different. Why?',
            options: [
                'Slow emissions are absorbed by plants instead of the sea',
                'Carbon released over centuries meets a surface layer that keeps being resupplied with carbonate from below; the same carbon in decades meets a layer whose carbonate is already spent',
                'The gas decays over time, so slow emissions partly disappear',
                'There is no difference — the total is all that matters'
            ],
            correctIndex: 1,
            hint: 'The two dials are linked: absorbing is what raises the Revelle factor.',
            explanation: 'The sink is consumed by its own work, and the deep ocean resupplies it only over centuries. Emit slowly and each portion meets fresh carbonate; emit fast and later portions meet a sea already made reluctant by the earlier ones. Rate changes the chemistry, not just the schedule.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A designer proposes keeping ten times more ADP in the cell, so there is more raw material ready for rebuilding ATP. What does the amplification argument say?',
            options: [
                'It would help — more raw material means faster rebuilding',
                'It would wreck the sensor: the ratio falls from about 10:1 to 1:1, so a 1% fall in ATP becomes a 1% rise in ADP instead of 10%',
                'It would make no difference, since the ratio is fixed by chemistry',
                'It would improve the sensor by making ADP easier to detect'
            ],
            correctIndex: 1,
            hint: 'Amplification = [ATP]/[ADP]. What happens to it?',
            explanation: 'The amplification falls from 10 to about 1, so ATP would have to drop ten times further before the cell responded as strongly — and with a reserve of seconds, ten times further is most of the way to failure. Worse, a high ADP level is itself the signal for "run faster", so the cell would be permanently told to work flat out. Hold plenty of the currency and very little of the signal.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Measurements show ATP in working muscle falling by only a few per cent even during hard exercise, while demand has risen tenfold. Someone concludes that ATP regulation is barely involved. What is wrong with that?',
            options: [
                'The measurements are too crude to detect the real change',
                'The near-constancy is the evidence that control is working — like a thermostat holding a room steady while the weather swings',
                'ATP is not used during exercise; muscles use fat directly',
                'Nothing is wrong: a small change means a small effect'
            ],
            correctIndex: 1,
            hint: 'What would you expect to see if the regulation were absent?',
            explanation: 'A well-controlled quantity barely moves — that is what control means. The few per cent fall is amplified into a 20% or more rise in ADP, production climbs to match, and ATP settles just below where it started. If oxygen cannot arrive fast enough, production cannot answer however loud the signal gets, and then ATP really does fall. The signal was never the limit; the supply was.'
        }
    ]
};
