import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 9, chemistry.
 *
 * L2C9 treated all three N-P-K numbers alike, as percentages of the nutrients
 * themselves, and warned that the P and K numbers are counted a special way.
 * This removes that simplification: they count P2O5 and K2O. Using L2C2's
 * formula masses, phosphorus is 62/142 = 0.437 of P2O5 and potassium is
 * 78/94 = 0.830 of K2O. Worked by hand on L2C9's 20 kg bag of 10-5-8:
 * 2 kg N, 0.44 kg P, 1.33 kg K.
 *
 * Condition stated: the shares hold because a compound has a fixed formula.
 * Frame of reference stated: the conversion runs from the label's oxide to the
 * element. Adds Liebig's law of the minimum. Still standing: the label counts
 * what is in the bag, not what roots can take in.
 */
export function getL3C9Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C9 turned the first number on a bag of plant food into grams of nitrogen. But it warned that the second and third numbers are counted a special way.\n\nHere is that special way. A bag of **10-5-8** does **not** hold 5% phosphorus and 8% potassium.\n\n- The **5** counts a compound called **phosphorus pentoxide, P₂O₅**\n- The **8** counts **potassium oxide, K₂O**\n\nIt is as if all the phosphorus and potassium in the bag had been turned into those two oxides and weighed. (An **oxide** is a compound of an element with oxygen.)\n\nSo how much phosphorus is really in L2C9's **20 kg** bag?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Less than 5% of 20 kg. Only part of the mass of P₂O₅ is phosphorus -- the rest is oxygen -- so I need phosphorus's share of P₂O₅'s mass, from the relative atomic masses.", nextNodeId: 'share', sentiment: 'positive' },
                { id: 'bad', label: "5% of 20 kg, which is 1 kg. The label says 5, so the bag is 5% phosphorus.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is exactly the reading L2C9 warned about. The 5 is the percentage of **P₂O₅**, not of phosphorus.\n\nThink of a box of chocolates, weighed with each chocolate still in its foil wrapper. To know how much **chocolate** you have, you need the share of each wrapped chocolate that is chocolate, not foil.\n\nOn a fertiliser label, each pair of phosphorus atoms is counted together with five oxygen atoms as its wrapper. So 1 kg of P₂O₅ is not 1 kg of phosphorus: part of that kilogram is oxygen.\n\nWhy count it this way at all? It is a habit. Chemists in the 1800s reported the elements they found as oxides, and fertiliser labels kept the custom. A few countries print the elements themselves instead.",
            options: [
                { id: 'cont', label: "How do I find phosphorus's share?", nextNodeId: 'share' }
            ]
        },
        share: {
            id: 'share',
            speaker: 'AI',
            content: "You met the tools in L2C2: each element's **relative atomic mass**, and a compound's **formula mass** -- the relative atomic masses of all the atoms in its formula, added up.\n\n| Element | Relative atomic mass |\n| --- | --- |\n| P, phosphorus | 31 |\n| K, potassium | 39 |\n| O, oxygen | 16 |\n\n**P₂O₅** has two phosphorus atoms and five oxygen atoms. Step by step:\n\n- phosphorus: 2 x 31 = 62\n- oxygen: 5 x 16 = 80\n- formula mass: 62 + 80 = **142**\n\nThe element's share of the compound's mass is the element's part divided by the whole:\n\n**share of mass = mass of the element's atoms / formula mass**\n\nThe numerator is only the element's atoms; the denominator is the whole formula.\n\nphosphorus share = 62 / 142 = **0.437**\n\n**K₂O** has two potassium atoms and one oxygen atom: potassium 2 x 39 = 78, oxygen 16, formula mass 78 + 16 = 94.\n\npotassium share = 78 / 94 = **0.830**\n\nSo, to go **from** the label's oxide number **to** the element -- that is the frame of reference:\n\n**% phosphorus = P number x 0.437**\n**% potassium = K number x 0.830**\n\nThe condition belongs here. **These shares hold because a compound has a fixed formula.** Every P₂O₅ has exactly two P and five O, so its share of phosphorus is the same in a gram as in a tonne.",
            options: [
                { id: 'cont', label: "Work out the 20 kg bag.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "L2C9's **20 kg** bag of **10-5-8**, one nutrient at a time.\n\n**Nitrogen.** The first number is nitrogen itself, so no conversion:\n\nmass of nitrogen = 20 kg x 10 / 100 = **2 kg**\n\n**Phosphorus.**\n\n**Step 1.** % phosphorus = 5 x 0.437 = **2.18%**\n\n**Step 2.** mass of phosphorus = 20 kg x 2.18 / 100 = **0.44 kg** -- not the 1 kg the label seems to say\n\n**Potassium.**\n\n**Step 1.** % potassium = 8 x 0.830 = **6.64%**\n\n**Step 2.** mass of potassium = 20 kg x 6.64 / 100 = **1.33 kg** -- not 1.6 kg\n\n| Nutrient | Label number | Counted as | Element's share | % element | In 20 kg |\n| --- | --- | --- | --- | --- | --- |\n| Nitrogen | 10 | N | 1 | 10% | 2 kg |\n| Phosphorus | 5 | P₂O₅ | 0.437 | 2.18% | **0.44 kg** |\n| Potassium | 8 | K₂O | 0.830 | 6.64% | **1.33 kg** |\n\nPhosphorus is the big surprise: the element is **less than half** its label number. Potassium is about **five sixths** of its number.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **10 kg** bag of potassium fertiliser is labelled **0-0-60**.\n\nHow many kilograms of **potassium** does it hold?",
            options: [
                { id: 'right', label: "About 5.0 kg. % potassium = 60 x 0.830 = 49.8%, and 10 kg x 49.8 / 100 = 4.98 kg.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'oxide', label: "6.0 kg, because 10 kg x 60 / 100 = 6 kg.", nextNodeId: 'math_wrong' },
                { id: 'divided', label: "7.2 kg, because 6.0 / 0.830 = 7.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**6.0 kg** is the mass of **K₂O** the label counts, not of potassium. Part of every K₂O is oxygen.\n\n**7.2 kg** divided by the share instead of multiplying. Check the direction: potassium is only **part** of the oxide, so there must be **less** than 6.0 kg of it, never more. Multiplying by a share smaller than 1 makes the answer smaller.\n\n**Step 1.** % potassium = 60 x 0.830 = 49.8%\n\n**Step 2.** mass of potassium = 10 kg x 49.8 / 100 = **4.98 kg**, about **5.0 kg**",
            options: [
                { id: 'retry', label: "Multiply by the element's share.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Label Number** is one number from a bag, from 0 to 60. **Bag Mass** is the mass of the bag, in kg.\n\nThe lab reads the number both ways: as a P number, and as a K number. It draws **P₂O₅** and **K₂O** atom by atom, shades each one's share of mass that is the element, and works out the kilograms of phosphorus and of potassium in the bag.\n\nTry this:\n\n- Set **5** and **20 kg**: 0.44 kg of phosphorus\n- Set **60** and **10 kg**: about 5 kg of potassium\n- At any setting, compare the two answers. The same number means only about half as much phosphorus as potassium, because 0.437 is about half of 0.830",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Oxide number times the share. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two bags of phosphorus fertiliser weigh the same.\n\n- **Bag A** is labelled the usual way, **0-20-0**, with the 20 counting P₂O₅\n- **Bag B** comes from a country that prints the element itself: its **0-10-0** means 10% phosphorus\n\nWhich bag holds more phosphorus?",
            options: [
                { id: 'right', label: "Bag B. Bag A's 20 counts P₂O₅, so it is 20 x 0.437 = 8.7% phosphorus -- less than Bag B's 10%.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Bag A. 20 is twice 10, so it holds twice as much phosphorus.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "20 is twice 10 -- but the two numbers count **different things**, so they cannot be compared directly.\n\n| Bag | Label | Counts | % phosphorus |\n| --- | --- | --- | --- |\n| A | 0-20-0 | P₂O₅ | 20 x 0.437 = **8.7%** |\n| B | 0-10-0 | phosphorus itself | **10%** |\n\nBag B holds more phosphorus, despite the smaller number. Bag A's 20 kg of P₂O₅ in every 100 kg is mostly oxygen: 80 of every 142 parts by mass.\n\nBefore comparing two numbers, convert them to the same thing.",
            options: [
                { id: 'retry', label: "Convert first, then compare.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The P and K numbers count oxides. To get the element, multiply by its share of the oxide's mass: 0.437 for phosphorus, 0.830 for potassium.**\n\nHere is the simplification this lesson removed. **L2C9 treated all three numbers alike, as percentages of the nutrients themselves.** Only the first one is.\n\nWhy do all three numbers matter at once? A plant needs every nutrient, and its growth is held back by whichever one is **scarcest compared with what the plant needs**. This is **Liebig's law of the minimum**. Picture a wooden barrel made of planks of different heights: it holds water only up to its **shortest** plank. Extra nitrogen cannot make up for missing phosphorus, just as a taller plank elsewhere cannot raise the water. The scarcest nutrient is one of the things that sets L3P9's full height.\n\nAnd the simplification still standing. **The label counts what is in the bag, not what the plant can take in.** Phosphorus especially sticks tightly to particles in many soils, where roots cannot take it up, so much of the phosphorus that is spread is never used.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Count the oxygen out!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what the P and K numbers really mean.**\n\n- The N number is nitrogen itself; the P number counts **P₂O₅**, the K number **K₂O**\n- An **oxide** is a compound of an element with oxygen\n- **share of mass = mass of the element's atoms / formula mass**\n- P₂O₅: 62 / 142 = **0.437**; K₂O: 78 / 94 = **0.830**\n- Condition: a compound has a fixed formula, so the share never changes\n- **% phosphorus = P number x 0.437**; **% potassium = K number x 0.830**\n- 20 kg of 10-5-8: **2 kg** nitrogen, **0.44 kg** phosphorus, **1.33 kg** potassium\n- 10 kg of 0-0-60: about **5.0 kg** of potassium, not 6.0 kg\n- 0-20-0 counting P₂O₅ is **8.7%** phosphorus, less than a 10% element label\n- **Liebig's law of the minimum**: the scarcest nutrient holds growth back\n- Still standing: the label counts what is in the bag, not what roots can take in",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Oxide number times the share!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- What the P and K Numbers Really Mean!**\n\nL2C9 read the N number as grams of nitrogen. Level 3 converts the other two.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| The P and K numbers | % of P₂O₅ and K₂O | Oxides, not elements |\n| Share of mass | **element's atoms / formula mass** | From L2C2's formula masses |\n| Phosphorus | 62 / 142 = **0.437** | Less than half |\n| Potassium | 78 / 94 = **0.830** | About five sixths |\n| 20 kg of 10-5-8 | 2 kg N, **0.44 kg** P, **1.33 kg** K | Not 1 kg and 1.6 kg |\n| 10 kg of 0-0-60 | 10 x 60 x 0.830 / 100 | **5.0 kg** of potassium |\n| Comparing labels | convert first | 0-20-0 is 8.7% phosphorus |\n| Law of the minimum | the shortest plank | The scarcest nutrient limits growth |\n| Still standing | in the bag, not in the plant | Phosphorus sticks to soil |\n\n**The one line to remember:** the P and K numbers count oxides -- multiply by 0.437 and 0.830 to find the elements themselves.\n\n**Up next:** L3B9 -- timing how long a cell spends dividing."
        }
    };
}
