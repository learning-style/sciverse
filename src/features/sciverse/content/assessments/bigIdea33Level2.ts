import { AssessmentData } from '../../types';

/**
 * Big Idea 33 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P33 (the 10% rule as repeated multiplication: a percentage is a
 * multiplier, n steps is a power, so efficiency compounds and the base does not),
 * L2C33 (van Helmont's willow, conservation of mass, and a cycle as a budget of
 * reservoirs and fluxes), and L2B33 (1 - (1-p)^n, the same power of n arriving for
 * a different reason, and the independence the formula assumes).
 *
 * The distractors are the mistakes each lesson works through: adding losses that
 * multiply, blaming the scales rather than the air, and adding probabilities until
 * they pass 100%.
 *
 * Written November 2026. Big Idea 33 had a complete Level 2 trio and no Level 2
 * assessment, which is the one thing a finished lesson must not be without.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea33Level2Assessment: AssessmentData = {
    bigIdea: 33,
    level: 2,
    title: 'How Do Ecosystems Support Human Life?',
    subtitle: 'Level 2 -- Energy That Multiplies, Matter That Balances, and a Backup Worth Counting',
    icon: '🌍',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In the 10% rule, what does "keeps 10%" mean as a piece of arithmetic?',
            options: ['Subtract 10', 'Multiply by 0.1', 'Divide by 10%', 'Add 10%'],
            correctIndex: 1,
            hint: 'A percentage is a multiplier.',
            explanation: 'Keeping 10% is multiplying by 0.1, keeping 5% is multiplying by 0.05, and keeping 20% is multiplying by 0.2. Once a step is a multiplication, several steps are a power -- which is the whole of L2P33.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Van Helmont weighed a willow and its soil for five years. The tree gained 74.4 kg while the soil lost only 0.057 kg. What did he conclude, and what was he missing?',
            options: [
                'His scales were faulty, since mass cannot appear from nowhere',
                'The tree made its own matter out of nothing',
                'The mass came from somewhere he had not weighed -- the air',
                'The water he added was turning into wood'
            ],
            correctIndex: 2,
            hint: 'Atoms are never created. So list everything that touched the tree.',
            explanation: 'The tree gained about 1,300 times more than the soil lost, which is far too large to be a weighing error. Conservation of mass says the atoms came from somewhere, and the reservoir he never put on the scales was the air: most of a tree is carbon that arrived as carbon dioxide. He did suspect the water, which is half right -- the hydrogen does come from water.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A meadow needs pollinating, and one pollinator species has a 30% chance of surviving a hard winter. What is the chance the job still gets done?',
            options: ['70%', '100%', '130%', '30%'],
            correctIndex: 3,
            hint: 'One species, one chance.',
            explanation: 'With a single species the job survives only if that species does, so 30%. The interesting question is what a second species buys, and the answer is not another 30 added on.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A pond\'s algae capture 8,000 kJ per square metre a year, and each step up keeps 10%. How much reaches the secondary consumers, two steps above?',
            options: ['80 kJ', '800 kJ', '6,400 kJ', '8 kJ'],
            correctIndex: 0,
            hint: 'Two steps is two multiplications.',
            explanation: '8,000 x 0.1 = 800 at the first level up, and 800 x 0.1 = 80 at the second. Taking 10% off twice would have left 6,400, which is the mistake of subtracting where the arithmetic multiplies.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A wetland has three species that can each filter its water, and a drought gives each a 50% chance of surviving. What is the chance the wetland still gets filtered?',
            options: ['50%', '150%', '87.5%', '12.5%'],
            correctIndex: 2,
            hint: 'Work out the chance they ALL fail, then take it from 1.',
            explanation: 'All three fail with probability 0.5 x 0.5 x 0.5 = 0.125, so the job survives with probability 1 - 0.125 = 87.5%. That is the formula 1 - (1-p)^n. Adding the three 50% chances gives 150%, and a probability above 100% is the alarm bell that the adding was wrong.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A tree lays down 500 kg of dry wood, which is about 50% carbon. A carbon dioxide molecule weighs about 3.7 times what its carbon alone weighs. How much carbon dioxide did the tree take from the air?',
            options: ['About 250 kg', 'About 1,850 kg', 'About 135 kg', 'About 925 kg'],
            correctIndex: 3,
            hint: 'Two steps: how much carbon, then how much carbon dioxide carried it.',
            explanation: '500 x 0.5 = 250 kg of carbon, and 250 x 3.7 = 925 kg of carbon dioxide. Stopping at 250 forgets that the carbon arrived attached to two oxygens; using 500 x 3.7 forgets that only half the wood is carbon.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Grassland captures 20,000 kJ per square metre a year, and four steps up the ladder each keep 10%. What arrives at the top?',
            options: ['2 kJ', '20 kJ', '200 kJ', '12,000 kJ'],
            correctIndex: 0,
            hint: '0.1 multiplied by itself four times.',
            explanation: '20,000 x 0.1^4 = 20,000 x 0.0001 = 2 kJ. Four steps take a year of sunlight on a square metre down to about what it takes to warm a teaspoon of water by half a degree, which is why top predators need enormous territories.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'L2P33 multiplies and L2C33 subtracts. What makes energy and matter behave so differently in the same ecosystem?',
            options: [
                'Energy is harder to measure, so its arithmetic is only approximate',
                'Matter cycles back round and can be used again, while energy passes through once and leaves as heat',
                'Energy obeys conservation and matter does not',
                'They do not really differ; the two lessons simply chose different methods'
            ],
            correctIndex: 1,
            hint: 'Ask what happens to each one after it has been used.',
            explanation: 'Both are conserved. The difference is that the carbon in a leaf returns to the air and can be built into another leaf, so a reservoir is a running balance you add to and subtract from. Energy arrives as sunlight, passes up the ladder losing a fraction at every step, and leaves as heat that no organism can use again -- so it compounds downwards and never comes back.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'You can either double the sunlight a grassland captures, or double the efficiency of every step from 10% to 20%. Over four steps, which helps more and by how much?',
            options: [
                'Doubling the sunlight: 2 times as much arrives, against 16 times for the efficiency',
                'They are the same, since both factors were doubled',
                'Doubling the efficiency: 8 times as much, against 2 times for the sunlight',
                'Doubling the efficiency: 16 times as much arrives, against 2 times for the sunlight'
            ],
            correctIndex: 3,
            hint: 'How many times does each change get applied?',
            explanation: 'The base is multiplied in once, so doubling it doubles the answer: 2 kJ becomes 4. The efficiency is multiplied in at every step, so doubling it is applied four times over: 2^4 = 16, and 2 kJ becomes 32. A factor that compounds beats a factor that does not, and the more steps there are the more lopsided it gets.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A meadow has five pollinator species, each with a 30% chance of surviving a hard winter, giving the job an 83% chance. What does that figure quietly assume?',
            options: [
                'That the five species are equally good at pollinating',
                'That each species has exactly the same 30% chance',
                'That the five survive or fail independently of one another',
                'That no new species can arrive from outside the meadow'
            ],
            correctIndex: 2,
            hint: 'Multiplying the chances of failure together is only allowed under one condition.',
            explanation: '1 - (1-p)^n multiplies five failure chances together, and that is only valid if one species failing says nothing about the others. A hard winter is exactly the kind of event that hits all five at once, so the real figure is lower than 83% -- and the more alike the species are, the worse the assumption gets. Backup copies that all fail together are not backups.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A forest reservoir holds 100 tonnes of carbon. It takes in 12 tonnes a year and releases 9. What is its net change, and what would it take to turn it into a source rather than a sink?',
            options: [
                'Gaining 3 tonnes a year; it becomes a source if the release ever exceeds the uptake',
                'Gaining 21 tonnes a year; it becomes a source when the reservoir is full',
                'Losing 3 tonnes a year; it is already a source',
                'No net change, since the carbon simply cycles'
            ],
            correctIndex: 0,
            hint: 'Net change is one subtraction. Then ask which way it points.',
            explanation: '12 - 9 = 3 tonnes gained a year, so it is a sink. Nothing about the 100 tonnes already stored matters to that: a reservoir\'s size and its net change are different quantities. Burn or fell the forest and the release jumps above 12, the subtraction reverses, and the same reservoir becomes a source -- which is why a stored stock is only as safe as the flux keeping it there.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'The same power of n turns up in L2P33 and L2B33. What is it doing in each?',
            options: [
                'The same thing: counting how many times a loss is applied',
                'In the energy ladder it counts the steps a fraction is applied over; in the meadow it counts the species that must ALL fail before the job does',
                'In the energy ladder it counts species; in the meadow it counts trophic levels',
                'Nothing in common -- the resemblance is a coincidence of notation'
            ],
            correctIndex: 1,
            hint: 'In one, the exponent is a chain. In the other, it is a set of things failing together.',
            explanation: 'Both raise a fraction to the power of n, and in both the fraction is "what is left after one thing happens". For energy that thing is a step up the ladder, so n is the chain length and the result shrinks as it climbs. For biodiversity that thing is one species failing, so n is how many must all fail at once, and the result is subtracted from 1 to give the chance the job survives. Same arithmetic, opposite direction: more steps make an ecosystem poorer, more species make it safer.'
        }
    ]
};
