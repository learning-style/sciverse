import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P9 "Measuring Change".
 *
 * P9 measured growth as a rate: centimetres per week, the slope. This lesson
 * adds the second measure -- percentage change = change / starting value x
 * 100% -- and shows the two can disagree. On P9's own sunflower, week 6 adds
 * the most centimetres but week 4 grows by the biggest share.
 *
 * Frame of reference stated where the formula is given: the starting value of
 * that period. Condition stated: tiny starting values make percentages huge.
 * Sets up L2B9's doubling (+100% each round) and L3P9's S-curve.
 */
export function getL2P9Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P9 you measured a sunflower's height every week, and found its growth speeding up and then slowing down.\n\nLook at two of those weeks:\n\n- **Week 4:** from **5 cm** to **12 cm**\n- **Week 6:** from **25 cm** to **42 cm**\n\nIn which week did the sunflower grow **faster**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It depends what 'faster' means. Week 6 added more centimetres, 17 against 7 -- but in week 4 the plant more than doubled its height, a far bigger share of its size.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Week 6, obviously. 17 cm is more than 7 cm, so there is nothing else to think about.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "17 cm really is more than 7 cm. But try this.\n\nA **mouse** and a **horse** each gain **100 g** in a week. By centimetres or grams, they grew the same. But 100 g is enormous for a mouse -- more than its whole body -- and too small to notice on a horse.\n\nSo there are **two** honest ways to measure growth:\n\n- **how much** was added, in cm or g\n- **what share** of the starting size was added\n\nThe sunflower's weeks look very different depending on which one you use.",
            options: [
                { id: 'cont', label: "Show me both ways.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**The first way** is P9's. The **change** is the height added, and the **rate of change** is that change for each week -- the slope of the graph, in **cm/week**.\n\n**The second way** compares the change with the size it started from. This is the **percentage change**:\n\n**percentage change = change / starting value x 100%**\n\nThe frame of reference matters: **always divide by the starting value** -- the size at the beginning of that week, not the end. Growing from 5 cm to 12 cm is compared with the 5 cm the plant began the week at.\n\nA percentage change of **100%** means the thing **doubled**: it added as much as it started with. 50% means it grew by half. 200% means it tripled.\n\nThe condition belongs here. **When the starting value is tiny, percentages get huge.** A seedling going from 0.1 cm to 1 cm has grown by 900% -- impressive-sounding, but only 0.9 cm.",
            options: [
                { id: 'cont', label: "Work out week 4 and week 6.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Week 4:** from 5 cm to 12 cm\n\n- change = 12 − 5 = **7 cm**\n- percentage change = 7 / 5 x 100% = **140%**\n\n**Week 6:** from 25 cm to 42 cm\n\n- change = 42 − 25 = **17 cm**\n- percentage change = 17 / 25 x 100% = **68%**\n\n| Week | Change | Percentage change |\n| --- | --- | --- |\n| 4 | 7 cm | **140%** -- more than doubled |\n| 6 | **17 cm** -- the most of any week | 68% |\n\nBy centimetres, week 6 wins. By share of its size, week 4 wins by a long way. **Both are true. They answer different questions.**\n\nThe same happens with P9's puppy. In week 2, it grew from 22 cm to 28 cm: 6 cm, which is 6 / 22 x 100% = **27%**. In week 10, from 45.5 cm to 46 cm: 0.5 cm, just **1.1%**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** In **week 7**, P9's sunflower grew from **42 cm** to **55 cm**.\n\nWhat was its percentage change that week?",
            options: [
                { id: 'right', label: "About 31%. The change is 55 − 42 = 13 cm, and 13 / 42 x 100% = 31%.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'end', label: "About 24%, because 13 / 55 x 100% = 24%.", nextNodeId: 'math_wrong' },
                { id: 'ratio', label: "About 131%, because 55 / 42 x 100% = 131%.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**24%** divided by the **ending** height, 55 cm. The percentage change is always compared with the **starting** value -- the 42 cm the plant began the week at.\n\n**131%** divided the new height by the old one. That tells you the new height is 131% **of** the old height -- but the **change** is only the part above 100%. Growth is the difference, 13 cm, compared with the start.\n\npercentage change = (55 − 42) / 42 x 100% = 13 / 42 x 100% = **31%**",
            options: [
                { id: 'retry', label: "The change, divided by the starting value.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for one week of growth.\n\n**Starting Height** is the height at the start of the week, in cm. **Ending Height** is the height at the end of the week, in cm.\n\nThe lab shows the **change** in cm and the **percentage change** side by side.\n\nTry this:\n\n- Set a start of **5 cm** and an end of **12 cm** (week 4), then **25 cm** to **42 cm** (week 6). Watch the two measures swap places\n- Keep the change at 10 cm, and slide the starting height from 1 cm up to 60 cm. The change stays put while the percentage falls\n- Find a week that is exactly **100%**: the plant doubles",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Same change, smaller share as it grows. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** In the same week:\n\n- **Seedling A** grows from **2 cm** to **6 cm**\n- **Seedling B** grows from **30 cm** to **40 cm**\n\nWhich grew by more **centimetres**, and which grew by the larger **percentage**?",
            options: [
                { id: 'right', label: "B added more centimetres, 10 cm against 4 cm. But A grew by the larger percentage: 4 / 2 x 100% = 200%, against B's 10 / 30 x 100% = 33%.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "B, on both counts. It added 10 cm, which is more than A's 4 cm, so its percentage must be bigger too.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "B did add more centimetres. But a bigger change does not mean a bigger percentage, because each one is compared with **its own** starting height.\n\n| Seedling | Start | Change | Percentage change |\n| --- | --- | --- | --- |\n| A | 2 cm | 4 cm | 4 / 2 x 100% = **200%** -- it tripled |\n| B | 30 cm | **10 cm** | 10 / 30 x 100% = 33% |\n\nSeedling A added twice its own height. Seedling B added only a third of its height. By centimetres B grew more; by share of its size, A grew six times as much.",
            options: [
                { id: 'retry', label: "Each is compared with its own start.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The change tells you how much was added; the percentage change tells you what share of the starting size was added. They can disagree.**\n\nFor living things, the percentage is often the more natural measure. A plant grows by making new cells, and a bigger plant has more cells making them -- so it can add more centimetres. What stays similar is the **share**.\n\nThat is why the sunflower's percentage change was biggest early on, while its centimetres were biggest in the middle.\n\nC9 said growth needs raw materials. C9 at Level 2 finds out how much of them a bag of plant food really holds.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "How much, or what share!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found two ways to measure growth.**\n\n- The **change** is how much was added; the **rate of change** is the change for each week, P9's slope\n- **percentage change = change / starting value x 100%**\n- Always divide by the **starting value**, not the end\n- 100% means it **doubled**; 200% means it tripled\n- Week 4: **7 cm**, but **140%**\n- Week 6: **17 cm**, but only **68%**\n- Week 7: 13 / 42 x 100% = **31%**\n- A puppy's week 2: **27%**; its week 10: **1.1%**\n- A bigger change does not mean a bigger percentage\n- Tiny starting values make percentages huge\n- For living things, the share is often the more natural measure",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Change over start, times 100%!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Two Ways to Measure Growth!**\n\nP9 measured growth in centimetres per week. Level 2 adds the share of the starting size.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Change | end − start | How much was added |\n| Rate of change | change for each week | P9's slope |\n| Percentage change | **change / start x 100%** | What share was added |\n| Doubling | **100%** | Added as much as it started with |\n| Week 4 | 7 / 5 x 100% = **140%** | Biggest share |\n| Week 6 | **17 cm**, 68% | Most centimetres |\n| Week 7 | 13 / 42 x 100% = **31%** | Divide by the start |\n| Seedlings A and B | 200% against 33% | Different questions, different winners |\n\n**The one line to remember:** growth can be measured by how much was added or by what share of the start was added -- and the two can pick different winners.\n\n**Up next:** C9 -- how much nutrient a bag of plant food really holds."
        }
    };
}
