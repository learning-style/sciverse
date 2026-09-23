import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C11 "Acids, Bases & pH".
 *
 * C11 placed substances on the pH scale. This lesson makes the scale
 * quantitative: acidity comes from hydrogen ions, and each step down the scale
 * means 10 times as many in each litre. times as acidic = 10 multiplied by
 * itself (difference in pH) times. A tenfold dilution of an acid raises its pH
 * by 1 -- until water's own hydrogen ions take over near pH 7.
 *
 * Frame of reference stated: comparisons are for the same volume of liquid.
 * Condition stated where dilution is introduced: an acid diluted with pure
 * water, far from pH 7. The checkpoint shows dilution never passes 7. Held
 * fixed and named for Level 3: nothing in the liquid resists the change.
 */
export function getL2C11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C11, **black coffee** sat at about **pH 5**, and **stomach acid** at about **pH 2**.\n\nThat is a difference of 3 on the pH scale.\n\nOne dial under the picture counts **dilutions**. One dilution means taking one part of a liquid and adding nine parts of water, so the result is ten times weaker than what you started with.\n\nHow many times more acidic is stomach acid than black coffee?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "A thousand times. Each step on the pH scale is ten times, so three steps is 10 x 10 x 10 = 1,000.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "About 2.5 times, because 5 / 2 = 2.5. Or maybe 3 times, because the difference is 3.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "On a ruler, each step is the same **amount** more: 3 cm is 1 cm more than 2 cm. The pH scale does not work like a ruler.\n\nThink of the floors in a strange tower where every floor holds **ten times** as many people as the floor above it. Go down one floor: ten times as many. Down two floors: a hundred times. Down three floors: a thousand times.\n\nThe pH scale is built like that tower. Each step **down** the scale -- towards acid -- means **ten times** as much of the thing that makes a liquid acidic.\n\nSo a difference of 3 is not 3 times, or 2.5 times. It is ten times, three times over.",
            options: [
                { id: 'cont', label: "What is the thing that makes a liquid acidic?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "An acid is acidic because, in water, it releases **hydrogen ions, H⁺**: hydrogen atoms that have lost their one electron. The more H⁺ in each litre, the more acidic the liquid.\n\n**pH** is a way of counting them. The frame of reference: always compare the **same volume** of liquid -- a litre of one against a litre of the other.\n\n- One step **down** the pH scale means **10 times** as many H⁺ in each litre\n- One step **up** means **10 times fewer**\n\nSo, to compare two liquids:\n\n**times as acidic = 10 multiplied by itself, (difference in pH) times**\n\nThat is written **10^(difference)**. A difference of 2 is 10 x 10 = 100 times. A difference of 4 is 10 x 10 x 10 x 10 = 10,000 times.\n\n**Diluting** runs the rule the other way. A **tenfold dilution** mixes 1 part of a liquid with 9 parts of water, making **10 times** the volume. The same H⁺ are spread through 10 times as much liquid, so each litre has 10 times fewer -- and the pH goes **up by 1**.\n\nThe condition belongs here. **The dilution rule holds for an acid diluted with pure water, while its pH is well below 7.** Pure water has a tiny number of H⁺ of its own -- enough for pH 7 -- and near pH 7 those start to count.",
            options: [
                { id: 'cont', label: "Work some out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Black coffee (pH 5) against pure water (pH 7):**\n\ndifference = 7 − 5 = 2, so coffee has 10 x 10 = **100 times** as many H⁺ in each litre\n\n**Vinegar (pH 3) against pure water (pH 7):**\n\ndifference = 7 − 3 = 4, so vinegar has 10 x 10 x 10 x 10 = **10,000 times** as many\n\n**Diluting an acid at pH 1:**\n\n| Tenfold dilutions | Total volume, starting from 1 mL | H⁺ in each litre, compared with the start | pH |\n| --- | --- | --- | --- |\n| 0 | 1 mL | the same | **1** |\n| 1 | 10 mL | 10 times fewer | **2** |\n| 2 | 100 mL | 100 times fewer | **3** |\n| 3 | 1,000 mL | 1,000 times fewer | **4** |\n\nTo raise the pH by just 3, you need **1,000 times** the volume. That is why a spill of strong acid is diluted with lots and lots of water -- a little water barely changes its pH.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Back to the start: **stomach acid at pH 2**, and **black coffee at pH 5**.\n\nHow many times as many H⁺ does a litre of stomach acid have?",
            options: [
                { id: 'right', label: "1,000 times. The difference is 5 − 2 = 3, and 10 x 10 x 10 = 1,000.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'difference', label: "3 times, because the difference in pH is 3.", nextNodeId: 'math_wrong' },
                { id: 'divide', label: "2.5 times, because 5 / 2 = 2.5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**3 times** used the difference itself. But the difference tells you **how many times to multiply by 10**, not the answer.\n\n**2.5 times** divided one pH by the other. pH numbers are not amounts, so dividing them has no meaning -- pH 2 is not 'half' of pH 4.\n\n| Step down the scale | pH | H⁺ compared with coffee |\n| --- | --- | --- |\n| Coffee | 5 | 1 |\n| One step | 4 | 10 |\n| Two steps | 3 | 100 |\n| Three steps: stomach acid | 2 | **1,000** |\n\ndifference = 3, so 10 x 10 x 10 = **1,000 times**",
            options: [
                { id: 'retry', label: "Multiply by 10, difference times.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for an acid diluted with pure water.\n\n**Starting pH** is the acid's pH before diluting. **Dilutions** is the number of tenfold dilutions, each one making the volume 10 times bigger.\n\nThe lab works out the new pH, the volume from 1 mL, and how many times fewer H⁺ each litre holds.\n\nTry this:\n\n- Set **pH 1** and **3** dilutions: pH 4, from 1,000 times the volume\n- Set **pH 3** and step the dilutions up to **4**: pH 7 by the rule -- but watch the lab's pH stop just short\n- Keep adding dilutions. Does the pH ever pass 7?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Ten times for every step. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A student starts with an acid at **pH 3** and makes **eight** tenfold dilutions.\n\nThey say: *each dilution adds 1 to the pH, so it ends at 3 + 8 = pH 11 -- a base.* Are they right?",
            options: [
                { id: 'right', label: "No. The pH creeps up towards 7 but never passes it. Diluting only adds pure water, which is neutral, so it can spread the acid thinner but can never turn it into a base.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Every tenfold dilution raises the pH by 1, so eight of them raise it by 8.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The rule works while the acid's own H⁺ far outnumber the water's. But pure water always has its own tiny share of H⁺ -- enough for pH 7 -- and diluting brings in more and more of that water.\n\n| Dilutions | The acid's H⁺ | Water's own H⁺ | pH |\n| --- | --- | --- | --- |\n| 0 to 2 | far more than water's | too few to matter | 3, 4, 5 |\n| 4 | about the same as water's | about the same | just below 7 |\n| 8 | almost none | nearly all of them | **almost exactly 7** |\n\nAdding water can make a liquid **less** acidic, but a base needs something that takes H⁺ away -- and water does not.\n\nThe rule had a condition: **well below pH 7**. Past that, it no longer applies.",
            options: [
                { id: 'retry', label: "Dilution stops at 7.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Each step on the pH scale is ten times as many hydrogen ions -- and dilution with water can bring an acid towards pH 7, but never past it.**\n\nThat is why small pH numbers hide big differences. Blood at pH 7.4 and stomach acid at pH 2 differ by 5.4 steps: hundreds of thousands of times the H⁺.\n\nOne thing this lesson held fixed: **nothing in the liquid fought back.** Every H⁺ added simply stayed and counted. Blood is different -- it holds chemicals that soak up added acid -- and Level 3 finds out how blood keeps its pH within 7.35 to 7.45.\n\nB11 said vaccines train the immune system. B11 at Level 2 finds out how scientists measure how well a vaccine works.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Ten times for every step!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what each step on the pH scale is worth.**\n\n- Acids release **hydrogen ions, H⁺**; more H⁺ in each litre means more acidic\n- Compare the **same volume** of each liquid\n- One step **down** the pH scale = **10 times** as many H⁺\n- **times as acidic = 10^(difference in pH)**\n- Coffee against water: **100 times**; vinegar against water: **10,000 times**\n- Stomach acid against coffee: **1,000 times**, not 3 or 2.5\n- A **tenfold dilution** makes 10 times the volume and raises the pH by **1**\n- Raising pH 1 to pH 4 takes **1,000 times** the volume\n- Condition: an acid diluted with pure water, well below pH 7\n- Dilution brings an acid towards 7 but never past it\n- Held fixed: nothing in the liquid soaks up the H⁺",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Ten times a step!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Ten Times for Every Step!**\n\nC11 placed things on the pH scale. Level 2 finds what the steps are worth.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| What makes an acid | **H⁺** in each litre | More H⁺, more acidic |\n| One pH step | **x 10** | Ten times as many H⁺ |\n| Comparing | **10^(difference)** | Coffee against water: 100 times |\n| Stomach acid and coffee | 10³ | **1,000 times** |\n| Tenfold dilution | 10 times the volume | pH up by **1** |\n| pH 1 to pH 4 | three dilutions | **1,000 times** the volume |\n| Diluting far | water's own H⁺ | Stops at **7** |\n\n**The one line to remember:** every step down the pH scale means ten times as many hydrogen ions -- so a difference of 3 is a thousand times.\n\n**Up next:** B11 -- how scientists measure how well a vaccine works."
        }
    };
}
