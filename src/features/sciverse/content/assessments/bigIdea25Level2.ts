import { AssessmentData } from '../../types';

/**
 * Big Idea 25 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P25 (error = starting error x 2^n, so ten doublings is a factor of a
 * thousand and a thousand-fold better instrument buys a fixed fifteen days),
 * L2C25 (the carrier is handed back, so chain length = 1 / stopping chance, and one
 * chlorine atom wrecks about 100,000 ozone molecules), L2B25 (genes affected =
 * breadth ^ depth, so a worker gene affects 1 and depth beats breadth).
 * All three are the same shape: repeated multiplication, where the number of
 * repeats sets the size of the effect and the size of one step does not.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea25Level2Assessment: AssessmentData = {
    bigIdea: 25,
    level: 2,
    title: 'How Can Tiny Changes Cause Big Effects?',
    subtitle: 'Level 2 -- The Doubling, the Cycle, and the Layer',
    icon: '🌪️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A forecast error doubles about every day and a half. After ten doublings, how many times bigger is it?',
            options: [
                'Twenty times — two, ten times over',
                'About a thousand times — 2 multiplied by itself ten times is 1024',
                'Ten times',
                'A hundred times'
            ],
            correctIndex: 1,
            hint: 'Doubling ten times is not adding two ten times.',
            explanation: '2 x 2 x 2 ten times over is 1024, so ten doublings is a factor of about a thousand. That one fact runs the whole lesson: every factor of a thousand you win on the measurement buys exactly ten more doublings, which is fifteen days.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What makes a chain reaction different from an ordinary reaction?',
            options: [
                'It is faster',
                'The carrier that does the damage is handed back unchanged at the end of each cycle, so it is never used up',
                'It gives out more heat',
                'It needs no starting materials'
            ],
            correctIndex: 1,
            hint: 'In an ordinary reaction, what happens to the reacting pieces?',
            explanation: 'Burn magnesium and the magnesium is spent — one atom in, one atom\'s worth of product out. A chlorine atom in the stratosphere wrecks an ozone molecule and is then chlorine again, exactly as it started. Nothing was spent, so it goes round again, and the damage is set by how long it lasts rather than by how many atoms there are.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A gene codes for a worker protein — one that does a job itself rather than switching other genes on. How many genes does a mutation in it affect?',
            options: [
                'All of them, because everything in a cell is connected',
                'One — a worker gene has no layers below it, and anything to the power of 0 is 1',
                'About twenty',
                'It cannot be predicted at all'
            ],
            correctIndex: 1,
            hint: 'What is the depth of a worker gene in the cascade?',
            explanation: 'A worker gene has depth 0, and breadth to the power of 0 is 1 whatever the breadth. So breaking it breaks one job. That is why almost all mutations do nothing dramatic: most genes are workers, with nothing below them to multiply the damage.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A switch gene turns on 20 genes; each of those turns on 20 more; each of those turns on 20 more. Why is the answer 8000 rather than 60?',
            options: [
                'Because 8000 is just 60 rounded up',
                'Because each gene in a layer turns on its own 20, so the layers multiply rather than add',
                'Because some genes are counted twice',
                'Because switch genes work faster than worker genes'
            ],
            correctIndex: 1,
            hint: 'Does each gene in the second layer share the same 20, or have its own?',
            explanation: '60 is 20 added three times. But the 20 genes in the first layer each switch on their own 20, giving 400, and each of those its own 20, giving 8000. Adding where the truth is multiplying is the single mistake this whole Big Idea is about — it is the same error as treating a doubling error as if it grew by a fixed amount each day.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A weather station\'s measurement is wrong by 0.01 °C. The error doubles every 1.5 days, and the forecast is useless once the error passes 1 °C. Roughly how many days is the forecast worth having?',
            options: [
                'About 150 days',
                'About 10 days — a factor of 100 is 7 doublings, and 7 x 1.5 is 10.5',
                'About 100 days',
                'About 1.5 days'
            ],
            correctIndex: 1,
            hint: 'Count the doublings needed to get from 0.01 to 1, then turn them into days.',
            explanation: 'From 0.01 to 1 is a factor of 100. Counting 2s: 2, 4, 8, 16, 32, 64, 128 — that is 7 doublings, and 7 x 1.5 = 10.5 days. 150 days is the adding answer, which treats a factor of 100 as buying 100 times longer. A factor of 100 buys seven doublings and nothing more.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A carrier is terminated on 1 cycle in 1000, and there are 500 carriers. How many ozone molecules are destroyed?',
            options: [
                '500, one per carrier',
                '500,000 — the chain length is 1000, times 500 carriers',
                '0.5, from 500 divided by 1000',
                '1500'
            ],
            correctIndex: 1,
            hint: 'Work out the chain length first, by turning the chance upside down.',
            explanation: 'The chain length is 1 / (1 in 1000) = 1000 cycles, and 500 carriers x 1000 = 500,000 molecules. 0.5 uses the stopping chance as a multiplier instead of turning it upside down, and it gives an answer smaller than the number of carriers — which a chain reaction can never do. If your chain answer is smaller than the number of carriers, you divided the wrong way round.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A switch gene turns on 5 genes, and there are 4 layers below it. How many genes does a mutation in it affect?',
            options: [
                '20',
                '625 — 5 multiplied by itself four times',
                '1024',
                '9'
            ],
            correctIndex: 1,
            hint: 'Multiply the breadth by itself once per layer.',
            explanation: '5 x 5 x 5 x 5 = 625. 20 is 5 added four times, which is more than thirty times out from one wrong operation. 1024 is 2 to the power of 10 — the right arithmetic for a different cascade, breadth 2 and depth 10. Which is worth noticing: a switch controlling only two genes reaches further than one controlling five, if it sits six layers higher.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A weather service forecasts usefully 10 days ahead. New satellites would make every measurement 100 times more precise. How much further ahead could it then forecast?',
            options: [
                'About 1000 days, since 100 times better over 10 days',
                'About 10 extra days — a factor of 100 is 7 doublings, which is 10.5 days',
                'About 100 extra days',
                'No further at all'
            ],
            correctIndex: 1,
            hint: 'How many doublings make up a factor of 100?',
            explanation: 'A factor of 100 is 7 doublings, and 7 x 1.5 = 10.5 days — so the forecast goes from about 10 days to about 20. That is a real and valuable gain, a fortnight\'s warning instead of a week\'s, and it is nowhere near proportional to the precision. The range grows by a fixed step for each factor you win, because the error grows by multiplying.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A manager wants forecasts a year ahead and asks how much better the measurements need to be. Using 1.5 days per doubling, what is the honest answer?',
            options: [
                'About 365 times better',
                'About 243 doublings better — a factor of 2 multiplied 243 times, which is not an engineering problem',
                'About 240 times better',
                'It is already possible with current satellites'
            ],
            correctIndex: 1,
            hint: 'Turn a year into doublings first, then ask what factor that many doublings is.',
            explanation: '365 days divided by 1.5 is about 243 doublings, so you would need the measurement improved by a factor of 2 multiplied by itself 243 times. That number is vastly larger than the number of atoms in a body. The useful thing this tells a weather service is not that forecasting is hopeless — ten days is genuinely useful, twenty is better — but that nobody should be funded to chase a year.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Ozone damage is carriers x chain length. In the 1980s the world could try to mop up chlorine atoms (cutting the chain length) or stop making CFCs (cutting the carriers). It chose to stop making CFCs. What is the strongest argument for that?',
            options: [
                'The chain length is not a real quantity',
                'Carriers can be taken to nearly zero, while halving a chain length of 100,000 still leaves 50,000 molecules of damage per atom',
                'Mopping up chlorine would have been more expensive',
                'The two options are identical, since the numbers are multiplied'
            ],
            correctIndex: 1,
            hint: 'The formula treats the two factors the same. What is different is how far each one can actually be moved.',
            explanation: 'The chain length was handed to us by chemistry at about 100,000 and cutting a huge number in half leaves a huge number. The number of carriers was coming out of factories, so it could be taken to nearly zero — and once it is zero, the chain length has nothing to multiply. When an effect is a product of two factors, attack the one you can take to zero. CFC production was stopped and the ozone layer is slowly recovering.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Two children each have a single-base mutation. One is in a lens worker protein; the other is in a switch gene three layers above the genes that build the eye, each switch controlling about 20 genes. Both changes are one letter. Why are the effects so different?',
            options: [
                'The second mutation must be in a bigger or more important gene',
                'Position: the first affects about 1 gene and the second about 8000, because every layer below multiplies it',
                'Mutation effects are random, so nothing can be expected',
                'The second child has more mutations'
            ],
            correctIndex: 1,
            hint: 'Both genes could be the same length, and both changes are one letter. What else differs?',
            explanation: 'Depth 0 gives 20 to the power of 0 = 1 gene affected. Depth 3 gives 20 x 20 x 20 = 8000. Nothing about the change is bigger — there is only the gene\'s position in the network, which you cannot see by looking at the gene. And note the distinction the third answer misses: which base changes is indeed chance, but what that change then does is structured and predictable.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A weather forecast, the ozone layer and a fruit fly\'s head turned out to share one shape. What is it?',
            options: [
                'Everything in nature grows exponentially',
                'Something small is multiplied over and over, so the size of the effect is set by how many repeats and not by how big the cause was',
                'Small causes always have small effects unless something goes wrong',
                'Tiny changes matter only in living things'
            ],
            correctIndex: 1,
            hint: 'In each of the three lessons, which quantity decided the size of the effect?',
            explanation: 'An error doubling, a carrier cycling, a switch switching — in all three the effect\'s size came from the number of repeats. The measurement error, the single atom and the single letter were never the point, which is why a thousand-fold better thermometer buys only a fortnight, why one atom wrecks a hundred thousand molecules, and why one letter can put legs on a head. The first option overreaches: plenty of things grow by adding, and this shape is exactly what distinguishes the ones that do not.'
        }
    ]
};
