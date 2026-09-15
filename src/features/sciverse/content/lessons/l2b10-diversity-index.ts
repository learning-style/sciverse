import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B10 "Ecosystems & Biodiversity". The
 * synthesis lesson.
 *
 * B10 said more species make a stronger ecosystem. This lesson measures
 * diversity with Simpson's index, D = 1 - sum of (n/N)^2: the chance that two
 * plants picked at random are different species. Two meadows with the same 4
 * species score 0.75 and 0.27, because evenness counts as well as richness.
 *
 * Condition stated where the formula is given: a fair, random sample, each
 * pick put back. The checkpoint shows 10 species scoring below 4. Held fixed
 * and named for Level 3: the counted patch stands for the whole place.
 */
export function getL2B10Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B10 said **biodiversity** means many different species, and that more variety makes an ecosystem stronger.\n\nTwo meadows each have **4 kinds of wildflower** and **100 plants**:\n\n- **Meadow A:** 25 plants of each kind\n- **Meadow B:** 85 plants of one kind, and 5 each of the other three\n\nBoth have 4 species. Are they equally diverse?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. Meadow B is nearly all one kind -- walk through it and you would hardly ever meet the other three. Meadow A is more diverse, even with the same number of species.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. Both have 4 species, and diversity just means the number of species.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Counting the species is a good start. It has a name, **species richness**, and both meadows score 4.\n\nBut picture walking through Meadow B, picking flowers at random. **85 out of every 100** would be the same kind. The other three kinds are there, but you would hardly ever meet them. And if a disease struck that one common kind, most of the meadow would go with it.\n\nThink of two bags of sweets, each with 4 flavours. One bag has 25 of each. The other has 85 lemon and 5 of each of the rest. Same flavours -- but only one bag feels like a mix.\n\nSo diversity needs two things: **how many** kinds there are, and **how evenly** the plants are shared among them. That second part is called **evenness**.",
            options: [
                { id: 'cont', label: "How do I put both into one number?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Ecologists roll richness and evenness into one number: **Simpson's diversity index**. It starts from a simple game.\n\nPick one plant at random, put it back, then pick again. **What is the chance that both picks are the same species?**\n\nThe chance of picking one particular species is its share, **n / N**:\n\n- **n** is the number of plants of that species -- the numerator\n- **N** is the number of plants of every species -- the denominator\n\nFor **both** picks to be that species, multiply the chances, as for two coins both landing heads: ½ x ½ = ¼. So the chance is **(n / N)²**.\n\nAdd that up for every species, and you have the chance of a **match**. The diversity index is the chance of **no match**:\n\n**D = 1 − (sum of (n / N)² for every species)**\n\nD runs from **0**, when every plant is the same species, towards **1**, when there are very many species and none is common.\n\nThe condition belongs here. **The count must be a fair sample**: plants chosen at random from across the whole meadow. (Some books use a version for picks that are not put back. For counts in the hundreds, the two give almost the same answer.)",
            options: [
                { id: 'cont', label: "Work out Meadows A and B.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Meadow A:** 25, 25, 25 and 25 plants, out of 100.\n\n**Step 1.** Each share: 25 / 100 = **0.25**\n\n**Step 2.** Each share squared: 0.25 x 0.25 = **0.0625**\n\n**Step 3.** Chance of a match: 0.0625 + 0.0625 + 0.0625 + 0.0625 = **0.25**\n\n**Step 4.** D = 1 − 0.25 = **0.75**\n\n**Meadow B:** 85, 5, 5 and 5 plants, out of 100.\n\n**Step 1.** Shares: 85 / 100 = **0.85**, and 5 / 100 = **0.05** three times\n\n**Step 2.** Squared: 0.85 x 0.85 = **0.7225**, and 0.05 x 0.05 = **0.0025** three times\n\n**Step 3.** Chance of a match: 0.7225 + 0.0025 + 0.0025 + 0.0025 = **0.73**\n\n**Step 4.** D = 1 − 0.73 = **0.27**\n\n| Meadow | Species | Chance of a match | D |\n| --- | --- | --- | --- |\n| A | 4 | 0.25 | **0.75** |\n| B | 4 | 0.73 | **0.27** |\n\nIn Meadow A, three pairs out of four are **different** species. In Meadow B, nearly three pairs out of four are the **same**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Meadow C has **3 species**: **50**, **30** and **20** plants, out of **100**.\n\nWhat is its diversity index, D?",
            options: [
                { id: 'right', label: "0.62. The shares squared are 0.25, 0.09 and 0.04, which add to 0.38, and D = 1 − 0.38 = 0.62.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'match', label: "0.38, because 0.5² + 0.3² + 0.2² = 0.38.", nextNodeId: 'math_wrong' },
                { id: 'no_square', label: "0, because 1 − (0.5 + 0.3 + 0.2) = 0.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.38** is the chance of a **match** -- both picks the same species. The diversity index is the chance of **no** match, so it still has to be taken away from 1.\n\n**0** added the shares without squaring them. The shares of every species always add up to 1, so that would give 0 for every meadow on Earth. Each share must be squared: the chance of picking that species **twice**.\n\n| Species | Plants | Share | Share squared |\n| --- | --- | --- | --- |\n| 1 | 50 | 0.5 | 0.25 |\n| 2 | 30 | 0.3 | 0.09 |\n| 3 | 20 | 0.2 | 0.04 |\n| Chance of a match | | | **0.38** |\n\nD = 1 − 0.38 = **0.62**",
            options: [
                { id: 'retry', label: "Square, add, take from 1.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a meadow of **100 plants**.\n\n**Species** is the number of kinds of wildflower. **Commonest Kind** is how many of the 100 plants belong to the most common kind. The other kinds share the rest of the plants evenly. The commonest kind cannot have fewer plants than an even share, so the lab raises it to at least that.\n\nThe lab draws the 100 plants, one colour for each kind, and works out the chance of a match and D.\n\nTry this:\n\n- Set **4** species and **25**: Meadow A, D = 0.75\n- Raise **Commonest Kind** to **85**: Meadow B, D = 0.27\n- Keep the plants shared evenly and add species. D climbs towards 1, but more and more slowly",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Richness and evenness together. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Meadow E has **10 species**: **91** plants of one kind, and **1** plant each of the other nine -- 100 plants in all.\n\nMeadow A has **4 species**, 25 of each, and D = 0.75.\n\nWhich meadow is more diverse by Simpson's index?",
            options: [
                { id: 'right', label: "Meadow A. Meadow E's chance of a match is 0.91² + 9 x 0.01² = 0.8281 + 0.0009 = 0.829, so its D is only 0.17. Its nine rare kinds are almost never met.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Meadow E. It has 10 species against Meadow A's 4, so it must be more diverse.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Meadow E does have the higher **richness**: 10 species against 4. But Simpson's index counts evenness too.\n\n| Meadow | Species | Shares | Chance of a match | D |\n| --- | --- | --- | --- | --- |\n| A | 4 | 0.25 each | 4 x 0.0625 = 0.25 | **0.75** |\n| E | 10 | 0.91, then 0.01 nine times | 0.8281 + 9 x 0.0001 = 0.829 | **0.17** |\n\nPick two plants in Meadow E, and 83 times out of 100 they are both the common kind.\n\nThe rare kinds still matter -- richness counts them, and they could spread if conditions change. That is why ecologists report **both** numbers: the species richness, and the diversity index.",
            options: [
                { id: 'retry', label: "More species is not always more diverse.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A diversity index counts how evenly life is shared, not only how many kinds there are.**\n\nThat completes Big Idea 10 at Level 2. All three lessons put a number on what protecting the planet means:\n\n- **L2P10** -- **electrical power = sunlight on each m² x area x efficiency**: 8 panels for a 10 kWh home, and averages hide the seasons\n- **L2C10** -- **mass of CO₂ = mass of carbon x 44 / 12**: 10 kg of petrol makes 31.5 kg of CO₂, and a tree takes it back out\n- **L2B10** -- **D = 1 − sum of (n / N)²**: two meadows with the same species can differ from 0.75 to 0.27\n\n**How do we protect our planet? By measuring what matters: the energy we can make cleanly, the CO₂ we add, and the variety of life we keep.**\n\nOne thing this lesson held fixed: **the 100 plants counted stood for the whole place.** Count a bigger area, and you keep finding more species. Level 3 finds out how many more -- and what that means when habitat is lost.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Richness and evenness!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured how diverse a meadow is.**\n\n- **Species richness** is the number of species; **evenness** is how evenly the individuals are shared\n- Pick two at random, putting the first back: the chance both are one species is **(n / N)²**\n- Add that for every species to get the **chance of a match**\n- **D = 1 − (sum of (n / N)²)**: the chance two picks are **different**\n- D runs from **0** (one species) towards **1**\n- Condition: a fair, random sample from across the whole place\n- Meadow A, 25 x 4: **D = 0.75**\n- Meadow B, 85-5-5-5: **D = 0.27**\n- Meadow C, 50-30-20: **D = 0.62**\n- Meadow E, 10 species with one at 91: **D = 0.17**, below A's 4 species\n- Report both richness and D\n- Held fixed: the counted patch stood for the whole place",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Square, add, take from 1!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Which Meadow Is More Diverse?**\n\nB10 said variety makes ecosystems strong. Level 2 measures the variety.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Species richness | count the species | How many kinds |\n| Evenness | how shares compare | How evenly they are shared |\n| One species twice | **(n / N)²** | Multiply the chances |\n| Chance of a match | **sum of (n / N)²** | Both picks the same |\n| Simpson's index | **D = 1 − that sum** | Both picks different |\n| Meadows A and B | **0.75** and **0.27** | Same 4 species |\n| Meadow C | 1 − 0.38 = **0.62** | Square before adding |\n| Meadow E | **0.17** with 10 species | Richness alone misleads |\n| Big Idea 10 at Level 2 | kWh, kg of CO₂, D | Protection needs numbers |\n\n**The one line to remember:** a diversity index is the chance that two living things picked at random are different species -- so it counts evenness as well as richness.\n\n**Big Idea 10 is complete at Level 2.**"
        }
    };
}
