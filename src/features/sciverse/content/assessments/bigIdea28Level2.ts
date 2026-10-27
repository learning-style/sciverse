import { AssessmentData } from '../../types';

/**
 * Big Idea 28 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P28 (blood per minute = heart rate x volume per beat; 70 x 70 = 4.9 L/min,
 * which is the whole blood supply round in about a minute, and 180 x 110 = 19.8 L as
 * 2.6 x 1.6; turned round it is a diagnosis, and the two factors fight because the heart
 * must refill), L2C28 (sugar in the blood = concentration x volume, so 0.9 x 5 = 4.5 g,
 * less than a teaspoon, against a 15 g slice and a 5.5 g gap -- which makes the RATE the
 * thing that matters, 0.5 g/min in against 0.5 g/min out), and L2B28 (oxygen used = flow
 * x taken per litre; 5 x 50 = 250 mL/min, 20 x 170 = 3,400, and the taking is hard-capped
 * at 200 mL/L so only flow is left).
 * The spine: body systems work together by multiplying, so the question is never how big
 * a factor is but how much room it has left -- and a body routes around a limit rather
 * than breaking it.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea28Level2Assessment: AssessmentData = {
    bigIdea: 28,
    level: 2,
    title: 'How Do Body Systems Work Together?',
    subtitle: 'Level 2 -- Three Products, and Which Factor Is Stuck',
    icon: '🫀',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A heart beats 70 times a minute and pushes out 70 mL each beat. How much blood does it move in a minute?',
            options: [
                'About 140 mL',
                'About 4.9 litres',
                'About 490 mL',
                'About 49 litres'
            ],
            correctIndex: 1,
            hint: 'Multiply, then turn millilitres into litres.',
            explanation: '70 x 70 = 4,900 mL, which is 4.9 litres. Check the units: beats a minute times mL per beat leaves mL a minute, because the beats cancel. And an adult holds only about 5 litres of blood in total -- so the heart sends the whole supply round in roughly one minute, all day.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Blood sugar sits at about 0.9 grams per litre, and an adult has about 5 litres of blood. How much sugar is dissolved in the whole bloodstream?',
            options: [
                'About 45 grams',
                'About 4.5 grams — slightly less than a level teaspoon',
                'About 0.2 grams',
                'About 450 grams'
            ],
            correctIndex: 1,
            hint: 'Concentration times volume. Grams per litre times litres leaves what?',
            explanation: '0.9 g/L x 5 L = 4.5 grams, and that is all of it -- every bit of sugar dissolved in your blood, head to foot, slightly less than a level teaspoon. That figure is the reason the rest of this Big Idea works the way it does, because one slice of bread delivers about 15 grams.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Blood flows through a resting muscle at 5 litres a minute, and the muscle takes 50 mL of oxygen out of each litre. How much oxygen does it use per minute?',
            options: [
                '250 mL a minute',
                '55 mL a minute',
                '10 mL a minute',
                '2,500 mL a minute'
            ],
            correctIndex: 0,
            hint: 'Litres a minute times millilitres per litre. What cancels?',
            explanation: '5 x 50 = 250 mL a minute, and the litres cancel to leave millilitres a minute. That figure is right: a resting adult really does use about a quarter of a litre of oxygen every minute, roughly 15 litres an hour.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Sprinting takes a heart to 180 beats a minute and 110 mL a beat. Compared with 70 and 70 at rest, how much more blood is moving?',
            options: [
                'About twice as much, since the rate roughly doubled',
                'About four times as much',
                'About the same, since the two changes cancel',
                'About forty times as much'
            ],
            correctIndex: 1,
            hint: 'Both factors changed. What do you do with two factors?',
            explanation: '180 x 110 = 19,800 mL, about 19.8 litres against 4.9 -- four times as much. The two changes multiply rather than taking turns: the rate alone buys 2.6 times, the volume alone 1.6 times, and 2.6 x 1.6 = 4.0. Neither change on its own gets near it, which is why a sprint needs both.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A patient is moving 4.2 litres a minute with a pulse of 100. What is their volume per beat, and what does it tell you?',
            options: [
                '42 mL — a fast pulse moving less blood than a resting body, so the fast pulse is the attempted fix',
                '420 mL — an unusually strong heart',
                '42 mL, which is normal for a pulse that high',
                'It cannot be worked out without knowing their blood volume'
            ],
            correctIndex: 0,
            hint: 'Turn the formula round: volume per beat = blood per minute / heart rate.',
            explanation: '4,200 mL / 100 beats = 42 mL a beat, well under the normal 70 -- and the total, 4.2 litres, is less than a resting 4.9 despite the racing pulse. The fast pulse is not the fault; it is the body trying to make up for small beats. A product can hide a weak factor behind a strong one, and dividing is how you pull them apart.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'One slice of bread delivers about 15 g of glucose. The blood holds 4.5 g and is in danger above 10 g. What does that tell you about how the body must handle it?',
            options: [
                'The blood absorbs it easily, since 15 g is a small amount of food',
                'The sugar must be leaving the blood while it is still arriving, because 15 g is 2.7 times the whole 5.5 g gap',
                'The body must store the sugar in the blood until later',
                'The slice must be digested in under a minute'
            ],
            correctIndex: 1,
            hint: 'Work out the gap between 4.5 g and 10 g, then compare it with 15 g.',
            explanation: 'The gap is 10 - 4.5 = 5.5 g, and the slice delivers 15 -- nearly three times it. If all of it stayed in the blood the concentration would reach 3.9 g/L, nearly double the danger line. So there is no version where the blood simply absorbs a meal: the clearing has to run at the same time as the arriving, which is what the hormone is for.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A slice of bread takes about 29 minutes to digest, so its 15 g of glucose arrives at about 0.5 g a minute. A sugary drink with 40 g is absorbed in 10 minutes. Which is the harder problem, and why?',
            options: [
                'The bread, because it contains starch rather than sugar',
                'The drink: 4 g a minute against a clearance of about 0.5, so eight times faster than the body can keep up',
                'The bread, because 29 minutes is longer',
                'Neither — what matters is the total, and 40 g is only a little more than 15'
            ],
            correctIndex: 1,
            hint: 'Divide grams by minutes for each, then compare with 0.5 g a minute.',
            explanation: '40 / 10 = 4 g a minute, eight times the roughly 0.5 g a minute a resting body clears, so the excess piles up and the 5.5 g gap is gone in under two minutes. The bread arrives at 15/29 = about 0.5 g a minute, which matches the clearance almost exactly. The total was never the problem -- the rate is, and the slowness of digestion is what makes a tiny gap survivable.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A sprint takes the flow to 20 L/min and the oxygen taken to 170 mL/L. How does that compare with 5 and 50 at rest?',
            options: [
                '13.6 times as much oxygen — 4.0 from the flow and 3.4 from the taking, multiplied',
                'About 7 times, adding the two increases together',
                '4 times, since the flow went up four times',
                'About 40 times'
            ],
            correctIndex: 0,
            hint: 'Work out each product, then divide one by the other.',
            explanation: '20 x 170 = 3,400 mL a minute against 5 x 50 = 250, which is 13.6 times. The factors multiply: 4.0 x 3.4 = 13.6. And neither alone is close -- 20 x 50 is 1,000 and 5 x 170 is 850. That is why a sprint needs the heart and the breathing to change together rather than one of them working heroically.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'If blood per minute is just rate times volume, why does 400 beats a minute not move over 40 litres?',
            options: [
                'Because the heart muscle gets tired after a while',
                'Because the heart refills between beats, and beating faster leaves less time to refill — so raising the rate drags the volume down',
                'Because the vessels cannot carry that much',
                'Because the formula only works up to 180 beats'
            ],
            correctIndex: 1,
            hint: 'Where does the 70 or 110 mL come from before each beat?',
            explanation: 'The gap between beats is about 0.86 s at 70, 0.33 s at 180 and 0.15 s at 400, and blood cannot flow in fast enough to fill the chamber in that time. So the two factors are not independent: past about 180 the volume falls faster than the rate rises, and the blood per minute stops climbing and then decreases. That is why some very fast rhythms are dangerous rather than just alarming.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A small child has about 2 litres of blood instead of 5. The healthy concentration is the same for both. What changes?',
            options: [
                'Nothing — the concentration is what matters and it is identical',
                'The grams change: their safe gap is only (2.0 - 0.9) x 2 = 2.2 g, which one slice exceeds nearly seven times',
                'Their danger concentration is lower than an adult\'s',
                'They can handle proportionally more sugar, having less blood to dilute'
            ],
            correctIndex: 1,
            hint: 'The limit is a concentration. What units does the food arrive in?',
            explanation: 'The chemistry is identical -- the same concentration is safe in the same water. But the formula has two parts, and the volume differs, so the grams of headroom differ: 2.2 g for the child against 5.5 g for an adult. The limit is a concentration while the delivery is a number of grams, which is exactly why portions and doses are worked out by body size.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Someone sprinting at 20 L/min is already taking 190 mL from each litre and needs 20% more oxygen. What has to change?',
            options: [
                'The taking, by 20% to 228 mL/L',
                'The flow, to 24 L/min — the taking is nearly at its 200 mL/L ceiling and has only about 5% left in it',
                'Both by 10%, sharing the increase',
                'Neither — 190 is already the maximum possible'
            ],
            correctIndex: 1,
            hint: 'How much oxygen does a litre of blood actually carry?',
            explanation: 'A litre carries only about 200 mL of oxygen, set by its haemoglobin, so taking 228 from it is not difficult but impossible. The most the taking can rise is 190 to 200, about 5%, so the flow must supply the rest: 20 x 1.2 = 24 L/min. Note that 190 is a far bigger number than 20 and it is the useless one -- size tells you nothing, only the room left does.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'All three Level 2 lessons were a product of two factors. What did each one turn out to be about?',
            options: [
                'Which factor is bigger, since the bigger one contributes more',
                'Which factor has run out of room — the volume per beat, the blood itself, and the oxygen a litre can carry',
                'That body systems multiply, which is the whole of it',
                'That every system has exactly two parts'
            ],
            correctIndex: 1,
            hint: 'In each lesson, one factor could not be raised. Which was it each time?',
            explanation: 'Volume per beat manages only 1.6x against the rate\'s 2.6x because the heart must refill. The blood has a 5.5 g gap against a 15 g slice, so no room at all. Oxygen per litre is hard-capped at 200 mL. Three systems, three kinds of tightness -- and in every case the body routes around the limit rather than breaking it: it beats more often, it clears during the meal, it moves more litres. Working together means having another factor to push on.'
        }
    ]
};
