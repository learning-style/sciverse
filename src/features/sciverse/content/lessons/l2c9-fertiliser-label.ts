import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C9 "Nutrients & Elements".
 *
 * C9 said the three numbers on a fertiliser bag tell you how much N-P-K is
 * inside. This lesson makes that exact: they are percentages by mass, so
 * mass of nutrient = mass of fertiliser x percentage / 100, and the reverse
 * for how much to spread. Worked on a lawn; the checkpoint doubles the dose and
 * follows the extra into rivers, as C34 does.
 *
 * Condition stated where the formula is given: the first number is nitrogen
 * itself, but the P and K numbers are counted a special way -- named here and
 * left to Level 3.
 */
export function getL2C9Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C9, a bag of plant food carried three numbers, like **10-5-8**, for **N-P-K**: nitrogen, phosphorus and potassium.\n\nA gardener has a **20 kg** bag of 10-5-8. Their lawn is **200 m²**, and a lawn like theirs needs about **5 g of nitrogen for each square metre**.\n\nIs one bag enough?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "More than enough. The 10 means 10% of the bag's mass is nitrogen, so 20 kg holds 2 kg of it -- and the lawn needs 200 x 5 = 1,000 g, which is only 1 kg.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No. The 10 means 10 grams of nitrogen, and the lawn needs 1,000 grams.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "If the bag held only 10 g of nitrogen, it would be almost all filler: 19,990 g of something else in a 20 kg bag. And a small 1 kg bag with the same label would hold the same 10 g -- which cannot be right, because it is twenty times less fertiliser.\n\nThe numbers do not depend on the size of the bag. They are **percentages**: **parts in every hundred**.\n\n10-5-8 means that in every **100 g** of fertiliser, about **10 g** is nitrogen. In every **100 kg**, about **10 kg**. A bigger bag holds more nitrogen, in the same share.",
            options: [
                { id: 'cont', label: "So how do I turn the percentage into grams?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The numbers are **percentages by mass**: grams of nutrient in every 100 grams of fertiliser.\n\nTo find how much nutrient is in a bag:\n\n**mass of nutrient = mass of fertiliser x percentage / 100**\n\nAnd to find how much fertiliser gives the nutrient you need, rearrange it:\n\n**mass of fertiliser = mass of nutrient x 100 / percentage**\n\nThe rest of the bag is not wasted space. The nutrients are joined to other atoms in chemical compounds -- nitrogen does not come as a pure powder -- and some is filler to help it spread evenly.\n\nThe condition belongs here. **The first number, N, really is the percentage of nitrogen.** The second and third numbers are counted in a special way that makes them bigger than the true amount of phosphorus and potassium. For now, use them only to compare bags. Level 3 finds out how to convert them.",
            options: [
                { id: 'cont', label: "Work out the gardener's lawn.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**How much nitrogen is in the bag?**\n\nmass of nitrogen = 20 kg x 10 / 100 = **2 kg**, which is 2,000 g\n\n**How much nitrogen does the lawn need?**\n\n200 m² x 5 g for each m² = **1,000 g**\n\n**How much fertiliser gives 1,000 g of nitrogen?**\n\nmass of fertiliser = 1,000 g x 100 / 10 = **10,000 g = 10 kg**\n\nThe gardener needs **half the bag**: 10 kg spread over the 200 m², which is 50 g of fertiliser on each square metre.\n\nCheck it: 10 kg x 10 / 100 = 1 kg of nitrogen. ✓",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** C9's farmer had plants with yellow leaves and switched to a nitrogen-rich fertiliser, **30-5-5**.\n\nHow much of it gives the same **1,000 g** of nitrogen?",
            options: [
                { id: 'right', label: "About 3,300 g. Mass of fertiliser = 1,000 x 100 / 30 = 3,333 g, a third of the 10 kg of 10-5-8.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'times', label: "30,000 g, because 1,000 x 30 = 30,000.", nextNodeId: 'math_wrong' },
                { id: 'hundredth', label: "300 g, because 1,000 x 30 / 100 = 300.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**30,000 g** multiplied by the percentage. A stronger fertiliser, with **more** nitrogen in each gram, must need **less** fertiliser, not thirty times more. The percentage belongs in the **denominator**.\n\n**300 g** used the first formula -- the one that finds the nutrient **in** a mass of fertiliser. 1,000 x 30 / 100 = 300 would be the nitrogen in 1,000 g of 30-5-5. Here the nitrogen is known and the fertiliser is wanted, so use the rearranged formula.\n\nmass of fertiliser = 1,000 g x 100 / 30 = **3,333 g**, about **3.3 kg**",
            options: [
                { id: 'retry', label: "Nutrient x 100 / percentage.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a lawn that needs **5 g of nitrogen for each m²**.\n\n**Nitrogen Number** is the first number on the bag: the percentage of nitrogen, from 1% up to 46%. **Lawn Area** is the area to feed, in m².\n\nThe lab works out the nitrogen needed, and the mass of fertiliser that supplies it, and compares that with a 20 kg bag.\n\nTry this:\n\n- Start at **10%** and **200 m²**: 10 kg, half a bag\n- Switch to **30%**: a third as much fertiliser for the same lawn\n- Set **46%**, the strongest common nitrogen fertiliser, and find the area one 20 kg bag could feed",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Stronger bag, less needed. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The gardener thinks, *more plant food, more growth*, and spreads the **whole 20 kg bag** of 10-5-8 over the **200 m²** lawn.\n\nHow many grams of nitrogen does each square metre get, compared with the 5 g it needs -- and what happens to the extra?",
            options: [
                { id: 'right', label: "10 g per square metre: 20 kg x 10 / 100 = 2,000 g, over 200 m². That is double what the grass can use, so much of the extra is washed out of the soil by rain, into rivers.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "10 g per square metre, double the amount -- so the grass grows twice as fast.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The arithmetic is right: 2,000 g of nitrogen over 200 m² is **10 g** on each square metre, double the 5 g needed.\n\nBut growth does not double with it. Grass can only use the nitrogen it has roots and time to take in, and it is also limited by light, water and the other nutrients. Beyond what it can use, extra nitrogen does not become extra grass.\n\nIt has to go somewhere. Nitrogen in fertiliser dissolves easily, so rain **washes the extra out of the soil**, into streams and rivers -- where, as C34 describes, it feeds the wrong things.\n\nDoubling the dose doubles the cost and the pollution, not the growth.",
            options: [
                { id: 'retry', label: "Extra nitrogen washes away, it does not become extra growth.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A fertiliser's numbers are percentages by mass -- and the right amount is the amount the plants can use, not the most you can spread.**\n\nThat is why the formula matters. Working out **mass of fertiliser = mass of nutrient x 100 / percentage** is how a farmer or gardener gives plants what they need without wasting money or polluting rivers.\n\nB9 asks what all those atoms are for: building new cells, one doubling at a time.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Percentages by mass!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You learned to read a bag of plant food.**\n\n- The N-P-K numbers are **percentages by mass**: grams in every 100 g\n- They do not depend on the size of the bag\n- **mass of nutrient = mass of fertiliser x percentage / 100**\n- **mass of fertiliser = mass of nutrient x 100 / percentage**\n- 20 kg of 10-5-8 holds **2 kg** of nitrogen\n- A 200 m² lawn at 5 g for each m² needs **1,000 g**: **10 kg** of 10-5-8\n- 30-5-5 needs only **3.3 kg** for the same nitrogen\n- The rest of the bag is other atoms joined to the nutrients, and filler\n- The N number is nitrogen itself; the P and K numbers are counted a special way (Level 3)\n- A double dose gives **10 g** per m², and the extra washes into rivers",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Nutrient x 100 / percentage!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Reading a Bag of Plant Food!**\n\nC9 named the N-P-K numbers. Level 2 turns them into grams.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| The numbers | percentages by mass | Grams in every 100 g |\n| Nutrient in a bag | **fertiliser x % / 100** | 20 kg of 10-5-8 holds 2 kg of N |\n| Fertiliser needed | **nutrient x 100 / %** | 1,000 g of N needs 10 kg |\n| A stronger bag | 1,000 x 100 / 30 | **3.3 kg** of 30-5-5 |\n| The rest of the bag | compounds and filler | Nitrogen is not a pure powder |\n| P and K | counted a special way | Level 3 converts them |\n| A double dose | **10 g** per m² | The extra washes into rivers |\n\n**The one line to remember:** the numbers on a bag are percentages by mass -- multiply to find the nutrient, and divide to find how much to spread.\n\n**Up next:** B9 -- how many doublings of cells it takes to build a body."
        }
    };
}
