import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 9, biology. The synthesis lesson.
 *
 * L2B9 held every cell dividing all at once, on one timetable. This removes
 * that simplification: in a real root tip the cells divide at random moments,
 * so a single count times the cell cycle. mitotic index = cells in mitosis /
 * cells counted; time in mitosis = mitotic index x cycle time. Worked by hand:
 * 20 of 200 cells, a 20-hour cycle, 2 hours in mitosis and 18 in interphase.
 *
 * Model figure stated as a model: the 20-hour cycle. Condition stated where the
 * formula is given: every counted cell cycling, one cycle time, random moments.
 * The checkpoint breaks the condition 10 mm behind the tip. Still standing: a
 * growing tissue has more young cells than old, so the simple share
 * underestimates mitosis.
 */
export function getL3B9Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B9 counted the doublings that build a body, and named what it held fixed: **every cell dividing, all at once, on one timetable**.\n\nLook at a real growing tissue under a microscope, and that picture falls apart. In the tip of an onion root, where the root grows, most cells are **not** dividing at any moment. Only about **1 cell in 10** is caught in the middle of **mitosis**, B9's division of the nucleus.\n\nA microscope photograph records one instant. Can one photograph tell you how many **hours** mitosis takes?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Yes, if the cells divide at random moments. Each cell spends the same share of its time in mitosis, so the share of cells caught in mitosis shows the share of the time.", nextNodeId: 'cycle', sentiment: 'positive' },
                { id: 'bad', label: "No. A photograph lasts no time at all, so it cannot tell you anything about hours.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A photograph is one instant -- but it is one instant of **hundreds** of cells, each at a different point in its own timetable.\n\nThink of a long tunnel car wash, busy all day, with cars moving through it one behind another at the same slow speed. Every car spends **20 minutes** in the tunnel, and the last **5 minutes** of that is drying.\n\nTake a photograph of the tunnel at any moment. About **5 out of every 20** cars in it -- a quarter -- are in the drying part.\n\nThe photograph lasted no time at all. But because the cars are spread evenly through their 20 minutes, the **share of cars** drying matches the **share of time** spent drying. The same trick times a cell.",
            options: [
                { id: 'cont', label: "How does that work for cells?", nextNodeId: 'cycle' }
            ]
        },
        cycle: {
            id: 'cycle',
            speaker: 'AI',
            content: "A cell's life from one division to the next is the **cell cycle**. It has two main parts:\n\n- **interphase**: the cell grows and makes a copy of all its DNA, getting ready. Under the microscope its DNA is spread out, and no chromosomes can be seen\n- **mitosis**: the copied chromosomes are shared into two new nuclei, as in B9. The chromosomes are packed tight enough to see\n\nThe **cycle time** is the time for the whole cycle, in hours.\n\nCount the cells in one **field of view** -- the circle you see down the microscope -- and work out the **mitotic index**:\n\n**mitotic index = cells in mitosis / cells counted**\n\nThe numerator is only the cells caught dividing; the denominator is every cell counted, dividing or not. It is a share, with no units.\n\nThen, like the car wash:\n\n**time in mitosis = mitotic index x cycle time**\n\nThe condition belongs here. **This works only if every cell counted is cycling, all take the same cycle time, and they reach mitosis at random moments, not all together.** L2B9's timetable -- every cell dividing at once -- is exactly where it fails: a photograph would catch every cell dividing, or none.",
            options: [
                { id: 'cont', label: "Time a root tip by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "A student counts **200 cells** in one field of view of an onion root tip. **20** are in mitosis, and **180** are in interphase.\n\nTake the cycle time as **20 hours**. That is a model figure: the real time depends on the temperature.\n\n**Step 1.** mitotic index = 20 / 200 = **0.10**, or 10%\n\n**Step 2.** time in mitosis = 0.10 x 20 hours = **2 hours**\n\n**Step 3.** time in interphase = 180 / 200 x 20 hours = **18 hours**\n\nCheck: 2 + 18 = 20 hours, the whole cycle. ✓\n\n| Part of the cycle | Cells counted | Share | Time |\n| --- | --- | --- | --- |\n| Interphase | 180 | 0.90 | **18 hours** |\n| Mitosis | 20 | 0.10 | **2 hours** |\n| Whole cycle | 200 | 1 | 20 hours |\n\nNine tenths of the cycle is spent **getting ready**. Dividing is the quick part.\n\nThis changes L2B9's doublings. If every cell cycled every 20 hours, 45 doublings would take 45 x 20 = 900 hours -- about **38 days**. A person takes about **18 years** to grow up. Most cells, most of the time, are not cycling at all.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** In a colder room, the onion root's cycle time slows to **30 hours**. A count finds **40 cells in mitosis** out of **500 cells counted**.\n\nHow long does mitosis take?",
            options: [
                { id: 'right', label: "2.4 hours. The mitotic index is 40 / 500 = 0.08, and 0.08 x 30 hours = 2.4 hours.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'interphase', label: "27.6 hours, because 460 / 500 x 30 = 27.6.", nextNodeId: 'math_wrong' },
                { id: 'per_hour', label: "1.3 hours, because 40 / 30 = 1.3.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**27.6 hours** put the **460** cells in interphase in the numerator. That is the time in **interphase** -- the long part of the cycle.\n\n**1.3** divided cells by hours. That gives cells for each hour, which is not a time at all. The count must first become a share, with cells over cells.\n\n**Step 1.** mitotic index = 40 / 500 = **0.08**\n\n**Step 2.** time in mitosis = 0.08 x 30 hours = **2.4 hours**\n\nCheck: interphase takes 27.6 hours, and 27.6 + 2.4 = 30 hours. ✓",
            options: [
                { id: 'retry', label: "Share first, then times the cycle time.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a field of view of **200 cells**.\n\n**Cells in Mitosis** is how many of the 200 are caught dividing. **Cycle Time** is the time for the whole cycle, in hours.\n\nThe lab draws the 200 cells, darkens the ones in mitosis, and splits one cycle into interphase and mitosis, in hours.\n\nTry this:\n\n- Set **20** cells and **20 hours**: 2 hours of mitosis\n- Double **Cycle Time** to 40 hours. The mitotic index stays at 0.10, but mitosis now takes 4 hours\n- Set **Cells in Mitosis** to **0**. The formula says mitosis takes no time. What might really be happening?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Share of cells, share of time. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The student moves the microscope to a spot about **10 mm behind the root tip**, further up the root, and counts **0 cells in mitosis** out of 200.\n\nDoes mitosis there take no time at all?",
            options: [
                { id: 'right', label: "No. The cells there have stopped dividing -- the condition fails, because the method only works on cells that are cycling.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. 0 / 200 x 20 hours = 0 hours, so mitosis there is instant.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The arithmetic is right: 0 / 200 x 20 hours = 0 hours. But the formula's **condition** has failed.\n\nA root grows in zones:\n\n| Where | What the cells do |\n| --- | --- |\n| The first millimetre or two behind the tip | They cycle and divide |\n| Just behind that | They stop dividing and **stretch** many times longer, pushing the tip down into the soil |\n| Further up, around 10 mm | They become finished root cells, such as root hairs |\n\nAt 10 mm, **no cells are cycling**. A count of 0 does not mean mitosis is instant. It means there is no mitosis to time.\n\nThe formula assumed every counted cell was cycling. Where that is false, it gives an answer with no meaning.",
            options: [
                { id: 'retry', label: "Only cycling cells can be timed.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A count can time the cell cycle -- but only for cells that are cycling.** Behind the tip, the cells stop dividing and stretch instead.\n\nHere is the simplification this lesson removed. **L2B9 held every cell dividing all at once, on one timetable.** Real cells reach mitosis at random moments, spend most of the cycle getting ready, and many stop cycling altogether.\n\nThat completes Big Idea 9 at Level 3. Level 2 measured growth in shares. Level 3 found what **limits** it:\n\n- **L3P9** -- **growth per week = r x N x (1 − N/K)**: the room left brakes growth, which is fastest at half the full height\n- **L3C9** -- the P and K numbers count oxides, **x 0.437** and **x 0.830**, and the scarcest nutrient holds growth back\n- **L3B9** -- **time in mitosis = mitotic index x cycle time**: 2 hours of a 20-hour cycle, and only where cells are cycling\n\n**How do things grow?** Cells in growing tips copy their DNA and divide, and every copy needs raw materials -- nitrogen for DNA and proteins, phosphorus for DNA. As cells stop cycling and the scarcest resource runs short, the doubling bends into an S-curve.\n\nAnd the simplification still standing. **The share of cells matched the share of time only if the cells were spread evenly through their cycles.** In a growing tissue they are not: each division turns one old cell into two young ones, so young cells outnumber old ones. Mitosis comes at the **end** of the cycle, so the count catches fewer cells in it than the time share -- and the simple rule **underestimates** how long mitosis takes. Careful studies correct for this.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One photograph, timed!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You timed the cell cycle from a single count.**\n\n- The **cell cycle** is a cell's life from one division to the next\n- **Interphase**: growing and copying DNA. **Mitosis**: sharing the chromosomes into two nuclei\n- **mitotic index = cells in mitosis / cells counted**, a share with no units\n- **time in mitosis = mitotic index x cycle time**\n- Condition: every counted cell cycling, one cycle time, random moments\n- 20 of 200 cells, 20-hour cycle: **2 hours** of mitosis, **18 hours** of interphase\n- 40 of 500 cells, 30-hour cycle: **2.4 hours** of mitosis\n- Nine tenths of the cycle is getting ready\n- 45 doublings at 20 hours each would take only about **38 days**: most cells are not cycling\n- 10 mm behind the root tip, cells have stopped dividing, so a count of 0 cannot be timed\n- Still standing: young cells outnumber old, so the simple rule underestimates mitosis",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Share of cells, share of time!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Timing the Cell Cycle!**\n\nL2B9 counted doublings on one fixed timetable. Level 3 times a real cycle from a microscope count.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Cell cycle | interphase, then mitosis | Get ready, then divide |\n| Mitotic index | **cells in mitosis / cells counted** | A share, no units |\n| Time in mitosis | **index x cycle time** | Share of cells = share of time |\n| Onion root tip | 20 / 200 x 20 hours | **2 hours** dividing, 18 getting ready |\n| A colder room | 40 / 500 x 30 hours | **2.4 hours** |\n| The condition | cycling cells, random moments | Fails 10 mm behind the tip |\n| Still standing | young cells outnumber old | Mitosis underestimated |\n| Big Idea 9 at Level 3 | S-curves, oxides, cell clocks | What limits growth |\n\n**The one line to remember:** in a tissue whose cells divide at random moments, the share of cells caught dividing is the share of the cycle spent dividing.\n\n**Big Idea 9 is complete at Level 3.**"
        }
    };
}
