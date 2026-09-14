import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B7 "Nerve Signals". The synthesis lesson.
 *
 * B7 showed ions flipping the voltage across a nerve cell. This lesson follows
 * that mechanism into the electric eel's electrocytes: a voltage measured
 * inside compared with outside (the frame of reference), one face firing to
 * +65 mV while the other stays at -85 mV, so 0.15 V across each cell. L2C7's
 * difference and series stacking give 4,000 cells for 600 V; L2P7's I = V / R
 * shows why a seawater ray manages with 50 V.
 *
 * The eel's discharge is framed as defence, never as catching food. Condition
 * stated in the lab: the fish's own resistance treated as small beside the
 * water's. Named for Level 3: every source here had a fixed voltage.
 */
export function getL2B7Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B7 you saw how a nerve cell makes an electrical pulse: channels open, ions rush through, and the voltage across the cell's surface flips.\n\nIn L2C7, a single metal cell gave about a volt, and cells joined in series added up.\n\nNow meet the **electric eel**, a long fish from the rivers of South America. When it is threatened, it can release a jolt of about **600 volts** -- four hundred times the push of an AA battery.\n\nBut the eel is made of living cells, and the voltage across any one living cell is tiny: at most about **0.15 V**.\n\nHow does the eel reach 600 V?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It stacks thousands of cells one after another, in series, like batteries in a torch. Their small voltages add up: 600 / 0.15 = 4,000 cells.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Each of its cells must be far more powerful than a nerve cell, so it needs only a few of them.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "An eel's electric cells are not more powerful than other cells. Each one works just like B7's nerve cell: channels open, ions rush through, and the voltage across the cell changes by a small amount -- never more than about 0.15 V.\n\nThe secret is not stronger cells. It is **how they are arranged**.\n\nL2C7 showed that cells joined in **series** add their voltages. The eel's electric organ is built the same way: thousands of flat cells, stacked one after another along the length of its body.",
            options: [
                { id: 'cont', label: "Where does each cell's 0.15 V come from?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First, a frame of reference -- because, as L2C7 showed, a voltage is always a difference between two places.\n\nThe voltage of a living cell is measured **inside the cell compared with outside it**. A **millivolt (mV)** is a thousandth of a volt.\n\nThe eel's electric cells are called **electrocytes**. Each is a flat cell, like a thin coin, with two broad faces. At rest, the inside of an electrocyte is about **−85 mV** compared with the outside, across **both** faces -- much like B7's nerve cell at rest.\n\nWhen a nerve signal arrives, channels open on **one face only**. Across that face, the voltage flips to about **+65 mV**. The other face stays at **−85 mV**.\n\nSo from one face of the cell to the other, the voltage is the **difference**:\n\n+65 − (−85) = **150 mV = 0.15 V**\n\nIt is the same subtraction as L2C7's metals. At rest, both faces match, and the difference is zero -- just like L2C7's two copper coins. Firing makes the two faces different, and a difference is a push.\n\nNow stack them. Cells in series add:\n\n**total voltage = number of cells in series x voltage of each cell**",
            options: [
                { id: 'cont', label: "Work out the eel.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Cells needed.** Each electrocyte gives **0.15 V**, and the jolt is **600 V**:\n\ncells in series = 600 / 0.15 = **4,000 cells**\n\nReal eels vary with their size -- a large one may have around 6,000 electrocytes in a row -- but 4,000 at 0.15 V shows where the number comes from.\n\n**Current.** From L2P7, **I = V / R**. The jolt has to travel out through the water to whatever is touching the eel, and river water resists current strongly. Take that path's resistance as about **600 Ω**:\n\nI = 600 / 600 = **1.0 A**\n\n**Energy each second.** From L2P7, volts x amps = 600 x 1.0 = **600 W** -- for the few thousandths of a second that the jolt lasts.\n\nAll of it from cells whose voltage, one at a time, you could not even feel.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A young eel has **2,000** electrocytes in series, each giving **0.15 V**.\n\nWhat voltage can it release?",
            options: [
                { id: 'right', label: "300 V, because 2,000 x 0.15 = 300.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'divided', label: "About 13,000 V, because 2,000 / 0.15 = 13,333.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "0.15 V, because every part of a series circuit has the same value.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**13,000 V** divided when it should have multiplied. Dividing 600 V by 0.15 V found how many cells were **needed**. Here the number of cells is given, and each one **adds** 0.15 V: 2,000 of them add 2,000 x 0.15.\n\n**0.15 V** mixed up two different series rules from L2P7. In series, the **current** is the same through every part. The **voltages** are not the same: they **add**, one cell after another, like steps on a staircase.\n\ntotal voltage = 2,000 x 0.15 = **300 V**",
            options: [
                { id: 'retry', label: "In series, the voltages add.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Cells in Series** is how many electrocytes are stacked in a row, from 10 to 6,000. **Water Resistance** is the resistance of the path the jolt takes through the water, in ohms: high in fresh river water, low in salty seawater.\n\nThe lab adds up the voltage, then uses **I = V / R** for the current and **volts x amps** for the energy each second. It treats the fish's own resistance as small beside the water's.\n\nTry this:\n\n- Set **Water Resistance** to **600 Ω**, like a river, and build up to **4,000** cells: 600 V and 1.0 A\n- Now drop **Water Resistance** to **10 Ω**, like seawater, and find how few cells would still drive 1.0 A",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Low resistance needs far fewer cells. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The **electric ray** is a flat fish that lives in salty **seawater**. Its jolt is only about **50 V** -- a twelfth of the eel's -- yet it drives a strong current.\n\nUsing **I = V / R**, why can the ray manage with so much less voltage than the river eel?",
            options: [
                { id: 'right', label: "Seawater conducts far better than river water, so the path's resistance is much lower. At about 10 Ω, 50 V drives 50 / 10 = 5 A. The eel's 600 Ω river path needs a big voltage to drive even 1 A.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Each of the ray's cells must give more voltage than an eel's, so it can use fewer of them.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The ray's electric cells work in the same way as the eel's. What differs is the **water**.\n\nSalt dissolved in seawater breaks into charged particles -- the **ions** of C7 -- and ions carry current. So seawater has a far **lower resistance** than river water.\n\n| Fish | Water | Path resistance | Voltage | Current = V / R |\n| --- | --- | --- | --- | --- |\n| Eel | river | about 600 Ω | 600 V | 600 / 600 = **1.0 A** |\n| Ray | sea | about 10 Ω | 50 V | 50 / 10 = **5.0 A** |\n| The ray's 50 V in a river | river | about 600 Ω | 50 V | 50 / 600 = **0.08 A** |\n\nIn the sea, a small push is enough. In a river, the same 50 V would drive barely any current -- which is why the river eel needs its big stack.",
            options: [
                { id: 'retry', label: "The water's resistance decides the voltage needed.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **How much voltage a fish needs depends on the resistance of the water around it.**\n\nEach body matches its surroundings. The eel stacks its cells in **long** rows, for high voltage. The ray stacks its cells in **short** columns -- hundreds of them, side by side. Side-by-side columns are **parallel**, and from L2P7's checkpoint, parallel branches add their currents. So the ray's many columns can together supply a big current.\n\nThat completes Big Idea 7 at Level 2, and all three lessons use the same two rules:\n\n- **L2P7** -- **I = V / R**: more push drives more current, and more resistance allows less\n- **L2C7** -- **cell voltage = the difference between two electrode potentials**, and cells in series add\n- **L2B7** -- an eel adds 4,000 tiny cell voltages in series, and the water's resistance decides how much current they drive\n\n**How does electricity work? A voltage is a difference that pushes charge, resistance limits how much flows, and cells in series add up their pushes.**\n\nOne thing all three lessons treated as fixed: the voltage of each source. A real battery's voltage sags when it works hard, and fades as it runs down. Level 3 finds out why.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Match the voltage to the water!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how an eel makes 600 volts.**\n\n- A cell's voltage is measured **inside compared with outside**\n- A **millivolt (mV)** is a thousandth of a volt\n- An **electrocyte** is a flat electric cell: at rest, about **−85 mV** across both faces\n- Firing flips one face to **+65 mV**, so across the cell: +65 − (−85) = **0.15 V**\n- Identical faces give no voltage, like L2C7's two copper coins\n- **total voltage = cells in series x voltage of each cell**\n- 600 V needs 600 / 0.15 = **4,000 cells** in a row\n- 2,000 cells give **300 V**\n- Through a 600 Ω river path: **1.0 A** and **600 W**\n- Seawater's ions give it a low resistance: a ray's **50 V** drives about **5 A**\n- Long rows in series for voltage; many columns in parallel for current\n- Held fixed at this level: each source's voltage",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Thousands of tiny pushes in series!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How an Electric Eel Makes 600 Volts!**\n\nB7 showed ions making a voltage across a nerve cell. Level 2 stacks those voltages in a living body.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Frame of reference | inside compared with outside | How a cell's voltage is measured |\n| Electrocyte firing | +65 − (−85) = **150 mV** | One face flips, the other does not |\n| Cells in series | **number x voltage of each** | Voltages add |\n| The eel | 600 / 0.15 = **4,000 cells** | Long rows |\n| Current in a river | 600 / 600 = **1.0 A** | I = V / R |\n| The ray in the sea | 50 / 10 = **5.0 A** | Low resistance, small push |\n| Parallel columns | currents add | How the ray supplies a big current |\n| Big Idea 7 at Level 2 | differences, series, I = V / R | One set of rules for metal and life |\n\n**The one line to remember:** a living cell's voltage is tiny, but thousands in series add up -- and the resistance of the water decides how much push a fish needs.\n\n**Big Idea 7 is complete at Level 2.**"
        }
    };
}
