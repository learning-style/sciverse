import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B9 "Cell Division". The synthesis lesson.
 *
 * B9 took one cell to about 30 trillion by division. This lesson counts the
 * doublings: cells = starting cells x 2^n, worked by hand with the rule that
 * ten doublings multiply by about a thousand. About 45 doublings reach 30
 * trillion, and the checkpoint shows the last doubling adds as many cells as
 * all the earlier ones together. L2P9's 100% change is one doubling.
 *
 * Condition stated where the formula is given: every cell divides each round
 * and none die. Held fixed and named for Level 3: a fixed timetable of
 * division.
 */
export function getL2B9Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B9, one cell became two by **mitosis**, and a body grew from a **single cell** to about **30 trillion cells**.\n\nImagine the simplest possible way to get there: every cell divides in two, all at the same time, again and again. Each round **doubles** the number of cells.\n\nHow many rounds of doubling would it take to get from **1 cell** to **30 trillion**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Surprisingly few -- something like 45. Each round doubles everything that is already there, so the numbers climb faster and faster.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Trillions of rounds, because you need trillions of new cells.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Trillions of rounds would be right if each round added **one** cell: 1, 2, 3, 4, 5...\n\nBut in a doubling, **every** cell divides. So each round adds as many new cells as there already are:\n\n1 → 2 → 4 → 8 → 16 → 32 → 64...\n\nAfter 6 rounds you have 64 cells, not 7. And the jumps keep getting bigger. The 30th round alone adds more than half a billion cells.\n\nThat is the difference between adding and **doubling**.",
            options: [
                { id: 'cont', label: "Show me how to count the doublings.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "If every cell doubles once each round, then after **n** rounds:\n\n**number of cells = starting cells x 2ⁿ**\n\n**2ⁿ** means 2 multiplied by itself **n** times. 2³ = 2 x 2 x 2 = 8.\n\nFrom L2P9, each doubling is a **percentage change of 100%**: the cells add as many as they started with.\n\nThe condition belongs here. **This model assumes every cell divides every round, and none die.** A real body grows differently -- different cells divide at different speeds, some stop, and some die -- so treat the answer as the fewest doublings that could possibly do it.",
            options: [
                { id: 'cont', label: "Count the doublings by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Start from **1 cell**, and watch 2ⁿ grow:\n\n| Doublings, n | Cells, 2ⁿ | About |\n| --- | --- | --- |\n| 1 | 2 | |\n| 5 | 32 | |\n| 10 | 1,024 | a **thousand** |\n| 20 | 1,048,576 | a **million** |\n| 30 | 1,073,741,824 | a **billion** |\n| 40 | 1,099,511,627,776 | a **trillion** |\n| 44 | 17,592,186,044,416 | 17.6 trillion |\n| 45 | 35,184,372,088,832 | **35.2 trillion** |\n\nNotice the handy rule: **every 10 doublings multiplies by about a thousand**, because 2¹⁰ = 1,024.\n\nAfter 44 doublings there are 17.6 trillion cells -- not yet enough. After **45**, there are 35.2 trillion -- past 30 trillion.\n\nSo in this model, a body of 30 trillion cells takes only **45 doublings** from a single cell.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A single bacterium divides every **20 minutes**, and every new bacterium keeps dividing on the same timetable.\n\nHow many bacteria are there after **5 hours**?",
            options: [
                { id: 'right', label: "32,768. Five hours is 300 minutes, which is 300 / 20 = 15 doublings, and 2¹⁵ = 32,768.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'times', label: "30, because 15 doublings x 2 = 30.", nextNodeId: 'math_wrong' },
                { id: 'square', label: "225, because 15² = 225.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**30** multiplied 15 by 2. That counts each doubling as adding just 2 bacteria. But each doubling **multiplies** the whole population by 2, so 15 doublings multiply by 2 fifteen times over: 2¹⁵.\n\n**225** worked out 15 x 15. But the doubling happens to the **2**, not to the 15. It is 2 x 2 x 2... fifteen times, not 15 x 15.\n\n| Doublings | 1 | 2 | 3 | 5 | 10 | 15 |\n| --- | --- | --- | --- | --- | --- | --- |\n| Bacteria | 2 | 4 | 8 | 32 | 1,024 | **32,768** |\n\nnumber = 1 x 2¹⁵ = **32,768**",
            options: [
                { id: 'retry', label: "Multiply by 2, n times.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Starting Cells** is how many cells there are at the start. **Doublings** is how many rounds of division follow.\n\nThe lab works out **starting cells x 2ⁿ**, and marks landmarks on the way: a thousand, a million, a billion, a trillion, and a human body's **30 trillion**.\n\nTry this:\n\n- Start from **1** cell and count up to **45** doublings\n- Watch the last few doublings: each one adds more cells than all the doublings before it put together\n- Start from **1,000** cells instead. You need about 10 fewer doublings to reach the same total",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Ten doublings, a thousand times. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** In this model, the body takes **45 doublings** to reach **35.2 trillion** cells.\n\nAfter **44** of those 45 doublings -- nearly 98% of the way through the doublings -- what share of the final number of cells is there?",
            options: [
                { id: 'right', label: "Only half. After 44 doublings there are 17.6 trillion cells, and the 45th doubling adds as many again. The last doubling adds as many cells as all 44 before it put together.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About 98%. 44 out of 45 doublings are done, so 44 out of 45 shares of the cells must be there too.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "That would be true if every doubling added the **same number** of cells. But each doubling adds as many cells as there already are -- so the later ones add far more than the early ones.\n\n| After doubling | Cells | Share of the final 35.2 trillion |\n| --- | --- | --- |\n| 40 | 1.1 trillion | 3% |\n| 43 | 8.8 trillion | 25% |\n| 44 | 17.6 trillion | **50%** |\n| 45 | 35.2 trillion | 100% |\n\nWith just **one** doubling left, only **half** the cells are there. The final doubling adds 17.6 trillion cells on its own -- as many as all 44 earlier doublings put together.",
            options: [
                { id: 'retry', label: "The last doubling adds as much as all the rest.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **In doubling, the last round adds as many as all the rounds before it put together.**\n\nThat completes Big Idea 9 at Level 2, and all three lessons measured growth in **shares**:\n\n- **L2P9** -- **percentage change = change / start x 100%**: growth can be measured by how much, or by what share\n- **L2C9** -- a fertiliser's numbers are **percentages by mass**, and plants can use only so much of what you spread\n- **L2B9** -- **cells = start x 2ⁿ**: each doubling is a 100% change, and 45 of them build a body\n\n**How do things grow? By adding shares of themselves -- and every new cell needs its share of raw materials to build it.**\n\nOne thing this lesson held fixed: every cell dividing, forever, on one timetable. Real cells take time to get ready, and real growth slows and stops -- as P9's sunflower did. Level 3 finds out why.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The last doubling is the biggest!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted the doublings that build a body.**\n\n- In a doubling, **every** cell divides: each round adds as many cells as there already are\n- **number of cells = starting cells x 2ⁿ**\n- Each doubling is a **100%** change, from L2P9\n- Condition: every cell divides each round and none die\n- 2¹⁰ = 1,024, so **every 10 doublings multiplies by about a thousand**\n- 20 doublings: about a million; 30: about a billion; 40: about a trillion\n- 2⁴⁵ = **35.2 trillion**, so about **45 doublings** could build 30 trillion cells\n- A bacterium dividing every 20 minutes: 15 doublings in 5 hours, **32,768** bacteria\n- After 44 of 45 doublings, only **half** the cells are there\n- The last doubling adds as many as all the earlier ones put together\n- Held fixed at this level: every cell dividing forever on one timetable",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Start x 2ⁿ!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Many Doublings Make a Body?**\n\nB9 showed one cell becoming two. Level 2 counts how many times that has to happen.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Doubling | every cell divides | Adds as many as there already are |\n| Cells after n doublings | **start x 2ⁿ** | Multiply by 2, n times |\n| One doubling | a **100%** change | L2P9's percentage |\n| Ten doublings | 2¹⁰ = **1,024** | About a thousand times |\n| A body | 2⁴⁵ = **35.2 trillion** | About 45 doublings |\n| Bacteria | 2¹⁵ = **32,768** | 15 doublings in 5 hours |\n| One doubling to go | 17.6 of 35.2 trillion | Only half there |\n| Big Idea 9 at Level 2 | percentages, shares, doublings | Growth in shares |\n\n**The one line to remember:** doubling multiplies by 2 each round -- so a few dozen rounds build trillions, and the last round is always the biggest.\n\n**Big Idea 9 is complete at Level 2.**"
        }
    };
}
