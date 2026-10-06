import { AssessmentData } from '../../types';

/**
 * Big Idea 24 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P24 (a network is capped by lines, not pipes: delivery = the smaller of
 * the trunk and the two streets added, so the narrowest pipe is often the wrong one
 * to replace), L2C24 (two routes out of one junction divide the material, so the
 * ratio of their speeds fixes the share while the size of the flame fixes the
 * amount), L2B24 (three steps in a queue, so the delivery is the smallest -- and the
 * limiting step moves with the weather).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea24Level2Assessment: AssessmentData = {
    bigIdea: 24,
    level: 2,
    title: 'How Do Networks Deliver What Matters?',
    subtitle: 'Level 2 -- The Cut, the Junction, and the Queue',
    icon: '🚰',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A reservoir feeds a trunk pipe that can carry 60 L/min. The trunk splits into two street pipes carrying 25 and 20 L/min. How much reaches the houses?',
            options: [
                '105 L/min, adding all three pipes',
                '45 L/min — the two streets together are the tighter of the two limits',
                '60 L/min, because the trunk is the biggest pipe',
                '20 L/min, because that is the narrowest pipe'
            ],
            correctIndex: 1,
            hint: 'There are two limits. Everything crosses the trunk, and everything ends up down one street or the other.',
            explanation: 'The trunk caps it at 60, and the two streets together cap it at 25 + 20 = 45. Both are true at once, so the delivery obeys the tighter one: 45 L/min. The trunk is left with 15 L/min of capacity nobody is using.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Carbon in a flame leaves as CO2 by one route and as the poisonous CO by another. A heater is turned up so that both route speeds double. What happens to the share that leaves as CO?',
            options: [
                'It doubles, because twice as much is burning',
                'Nothing at all — both routes sped up together, so each still wins the same fraction',
                'It halves, because the flame is hotter',
                'It falls to zero once the flame is hot enough'
            ],
            correctIndex: 1,
            hint: 'The share is one route divided by the total of both. What happens to a fraction when you double the top and the bottom?',
            explanation: 'The share is CO route / (CO2 route + CO route), so doubling both multiplies the top and the bottom by 2 and the 2 cancels. 3/33 and 6/66 are both 9.1%. Only changing ONE route moves the share.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A tree can take up 250 L/day through its roots, carry 300 L/day up its xylem, and its leaves are asking for 400 L/day. How much water crosses the tree?',
            options: [
                '950 L/day, adding the three steps',
                '250 L/day — the three steps are a queue, so the smallest one decides',
                '400 L/day, because that is what the leaves need',
                '300 L/day, set by the xylem'
            ],
            correctIndex: 1,
            hint: 'Did every litre have to pass through all three steps, or did it have a choice?',
            explanation: 'Every litre was taken up by the roots AND carried by the xylem AND released by the leaves, in that order, with no way round any of them. Steps in a queue are compared, not added, so the answer is the smallest: 250 L/day. The leaves are asking for 400 and getting 250, so the tree wilts.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Two water pipes side by side carry 25 and 20 L/min. Two reaction routes out of one junction run at 25 and 20 g/min. Why do the pipes add to 45 while the routes do not?',
            options: [
                'They do add — 45 is right in both cases',
                'Each pipe has its own water, while both routes are competing for the same carbon',
                'Litres and grams cannot be added',
                'Reaction routes are always slower than pipes'
            ],
            correctIndex: 1,
            hint: 'Ask which of them owns the material it is carrying.',
            explanation: 'Side-by-side pipes each bring their own water, so their capacities add. The two routes are fed by one stream of carbon and every atom goes down exactly one of them, so they divide what arrives rather than adding to it. Same picture, opposite arithmetic — and the difference is who owns the material.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'The trunk carries 60 L/min; street A carries 55 and street B carries 20. Street B is the narrowest pipe in the network. The city replaces it with a 40 L/min pipe. What happens to the delivery?',
            options: [
                'It doubles, because the narrowest pipe was the bottleneck',
                'Nothing — the streets could already take 75 L/min and the trunk only feeds 60',
                'It rises by 20 L/min',
                'It falls, because wider pipes lower the pressure'
            ],
            correctIndex: 1,
            hint: 'Work out both limits before and after. Which one is smaller each time?',
            explanation: 'Before: the streets total 55 + 20 = 75, the trunk is 60, so delivery is 60. After: the streets total 55 + 40 = 95, the trunk is still 60, so delivery is still 60. Being the narrowest pipe does not make a pipe the bottleneck — it has to be in the tighter line, and street B never was.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A badly burning flame has its CO2 route at 10 g/min and its CO route at 40 g/min. What share of the carbon leaves as the harmless CO2?',
            options: [
                '25%, which is 10 divided by 40',
                '20% — 10 divided by the total of 50',
                '80%, because most of it burns properly',
                '10%, read straight off the CO2 route'
            ],
            correctIndex: 1,
            hint: 'The bottom of the fraction is the total of both routes, not the other route.',
            explanation: '10 + 40 = 50 g/min of carbon leaves the junction, and 10 of it as CO2: 10/50 = 20%. So four fifths of the carbon in this flame is going out as poison. 25% compares one route against the other, which would make the two shares add up to more than everything there is.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'After heavy rain the soil is soaked, so a tree can take up 450 L/day. Its xylem still carries 300 L/day and its leaves are asking for 400. How much crosses the tree, and why does it still wilt at midday?',
            options: [
                '450 L/day, and it should not be wilting at all',
                '300 L/day — the xylem is now the smallest step, so wet soil cannot help',
                '400 L/day, exactly what the leaves asked for',
                '750 L/day, adding the roots and the xylem'
            ],
            correctIndex: 1,
            hint: 'Line up 450, 300 and 400 and take the smallest.',
            explanation: 'The smallest of 450, 300 and 400 is 300, so the xylem is the limiting step. The tree is standing in wet soil with roots that could take up 450 L/day, and the stem in between still cannot carry more than 300 — so the leaves get less than the 400 they are asking for and go limp. Trees really do wilt at midday in wet soil.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'The trunk carries 60 L/min and street B carries 20. Above what capacity does widening street A stop improving the delivery?',
            options: [
                '60 L/min, the trunk capacity',
                '40 L/min — above that the streets together beat the trunk',
                '80 L/min, the trunk plus street B',
                'It never stops improving the delivery'
            ],
            correctIndex: 1,
            hint: 'The streets stop being the tighter line the moment they add up to the trunk.',
            explanation: 'Street A helps only while street A + street B is below the trunk. They become equal at street A = trunk − street B = 60 − 20 = 40 L/min. Past that the trunk is the tighter line, and every extra litre of street A capacity delivers nothing. You can work out where a replacement stops paying before you buy it.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A city doubles street A from 25 to 50 L/min, with street B at 20. It then measures no improvement at all. The pipe is fitted correctly and nothing leaks. What has the city learned?',
            options: [
                'Nothing — the money was simply wasted',
                'That 25 + 20 = 45 was already at or above the trunk capacity, so the trunk is the bottleneck',
                'That street B must have narrowed at the same time',
                'That doubling a pipe does not double its capacity'
            ],
            correctIndex: 1,
            hint: 'Widening street A can only raise one of the two limits. What follows if raising it changed nothing?',
            explanation: 'Widening street A raises only the streets-together line. If raising it changes nothing, that line was already the looser one — so the trunk was setting the delivery all along, and the trunk is at or below 45 L/min. A replacement that improves nothing is still a measurement of where the bottleneck is, and the next pipe the city buys will be the right one.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A heater runs with its CO2 route at 30 g/min and its CO route at 3 g/min. Turned up, both double to 60 and 6. The share of carbon leaving as CO is unchanged at 9.1%. Is the room any more dangerous?',
            options: [
                'No — the share did not change, so the danger did not change',
                'Yes — twice as much CO per minute is now entering the room, even though the share is identical',
                'No, and it is safer, because a hotter flame burns more completely',
                'It cannot be known without measuring the temperature'
            ],
            correctIndex: 1,
            hint: 'There are two numbers here, and only one of them stayed the same.',
            explanation: 'The CO route went from 3 to 6 g/min, so the amount entering the room doubled while the share stayed at 9.1%. What harms somebody is the amount building up in the air, not the fraction of the fuel it represents. The share is set by the RATIO of the two routes and the amount by the SIZE of the flame, so they are independent — which is why a gas heater needs ventilation and not just a well-adjusted burner.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A gardener raises a tree\'s root uptake from 250 to 450 L/day by soaking the soil. The xylem carries 300 and the leaves ask for 400. How much extra water crosses the tree for the 200 L/day of extra uptake?',
            options: [
                '200 L/day — all of it gets used',
                '50 L/day, from 250 up to 300, and then it stops',
                'None at all',
                '150 L/day, up to the 400 the leaves asked for'
            ],
            correctIndex: 1,
            hint: 'Work out the delivery before and after, then subtract.',
            explanation: 'Before: the smallest of 250, 300, 400 is 250. After: the smallest of 450, 300, 400 is 300. So 200 L/day of extra uptake bought 50 L/day of extra delivery, and everything past 300 is spare capacity. The gardener raised the step that was about to stop being the limit — which is the same mistake as the city widening a street pipe, in a different currency.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A city water main, a flame, and a tree turned out to need only two rules between them. What are they?',
            options: [
                'Pressure drives flow, and resistance opposes it',
                'A chain delivers only as much as its smallest step, and a junction divides what reaches it in proportion',
                'Bigger networks always deliver more than smaller ones',
                'Every network has exactly one bottleneck, and it never moves'
            ],
            correctIndex: 1,
            hint: 'Think about the two shapes a network can be built from, rather than the three subjects.',
            explanation: 'Steps in a queue are compared and the smallest wins — the trunk against the streets, the roots against the xylem against the demand. Routes out of a junction divide what arrives in proportion to their speeds — the carbon between CO2 and CO, the sugar in the phloem between everything asking for it. Every network is made of those two pieces, which is why the first question is never how to make it better but which part is actually deciding. And the fourth answer is wrong in the way that matters most: the bottleneck moves the moment you fix it, or the weather changes.'
        }
    ]
};
