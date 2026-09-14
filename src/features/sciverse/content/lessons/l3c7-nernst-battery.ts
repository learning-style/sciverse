import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 7, chemistry.
 *
 * L2C7 read a cell's voltage from a table of standard potentials. This removes
 * that simplification: the voltage depends on the ions in solution, through the
 * Nernst equation E = E0 - (0.0592 / n) log Q at 25 C, with Q = [Zn2+]/[Cu2+]
 * for the Daniell cell. The 0.0592 is built from L3C5's 2.303 R and the Faraday
 * constant (L2P7's coulombs, a mole at a time).
 *
 * Worked by hand as the cell runs: nearly flat to 99% of the copper ions used,
 * then a cliff. It corrects C7: the amount of solid zinc is not in the
 * equation. Conditions stated where the equation is given: 25 C, dilute
 * solutions. Still standing: concentrations are not activities at 1 mol/L, and
 * the sag seen under load is mostly L3P7's internal resistance.
 */
export function getL3C7Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C7 gave a zinc–copper cell **1.10 V**, read from the table -- under **standard conditions**, with each metal dipped in a solution of its own ions at a set strength.\n\nC7 said that as a battery runs, its voltage drops because the zinc gets used up.\n\nHere is a test. Build a zinc–copper cell and let it run until **99%** of its copper ions have reacted. The zinc strip is still nearly as big as when you started.\n\nWhat voltage does the cell give now?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Still a little over 1.0 V. The voltage depends on the ratio of the ions in solution, and it changes only slowly until the copper ions are almost completely gone.", nextNodeId: 'daniell', sentiment: 'positive' },
                { id: 'bad', label: "Almost nothing -- about 0.01 V. With 99% of the copper ions gone, 99% of the push should be gone too.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It feels as if a cell's voltage should fall in step with what is used up, like a fuel gauge. But voltage is not an amount of fuel. From L2P7, it is **energy for each coulomb**.\n\nWhile copper ions remain, each one that reacts still hands over nearly the same energy. What changes -- slowly -- is the **balance** between the ions being used up and the ions being made. And that balance works in **ratios**, the kind L3B4 counted with logarithms.\n\nMeasure it, and a cell with 99% of its copper ions gone still gives about **1.03 V**. To see why, you need a cell whose ions you can track.",
            options: [
                { id: 'cont', label: "Show me a cell I can track.", nextNodeId: 'daniell' }
            ]
        },
        daniell: {
            id: 'daniell',
            speaker: 'AI',
            content: "The cleanest cell to study is the **Daniell cell**, invented in 1836.\n\n- A **zinc** strip stands in a solution of **zinc ions**, Zn²⁺\n- A **copper** strip stands in a solution of **copper ions**, Cu²⁺\n- A **salt bridge** -- a tube of salt solution -- joins the two liquids, so ions can move between them and complete the circuit without the solutions mixing\n\nAs it runs, zinc atoms give up electrons and dissolve: **Zn → Zn²⁺ + 2 electrons**. The electrons travel through the wire, and copper ions collect them: **Cu²⁺ + 2 electrons → Cu**.\n\nSo the two solutions change:\n\n- **Zn²⁺ builds up**, because zinc keeps dissolving\n- **Cu²⁺ runs down**, because copper ions keep turning into copper metal\n\nConcentrations are measured in **mol/L**: moles of ions, from L3C2, in each litre. L2C7's standard conditions mean **1 mol/L** of each.",
            options: [
                { id: 'cont', label: "How does the voltage depend on those concentrations?", nextNodeId: 'nernst' }
            ]
        },
        nernst: {
            id: 'nernst',
            speaker: 'AI',
            content: "In 1889 **Walther Nernst** found how. First, one number to track the two concentrations:\n\n**Q = [Zn²⁺] / [Cu²⁺]**\n\nThe square brackets mean **the concentration of**. Q compares the ion being **made** (Zn²⁺) with the ion being **used up** (Cu²⁺). At standard conditions both are 1 mol/L, so Q = 1. As the cell runs, Q grows.\n\nThe **Nernst equation**, at 25 °C:\n\n**E = E° − (0.0592 / n) x log Q**\n\nPiece by piece:\n\n- **E** is the cell's voltage now, measured as copper (+) minus zinc (−), the frame of reference from L2C7\n- **E°** is the standard voltage from the table: **1.10 V**\n- **n** is the number of electrons each zinc atom gives up: **2**\n- **log** is L3B4's base-ten logarithm\n- **0.0592 V** is 2.303 x R x T / F at T = 298 K. The 2.303 and R are L3C5's. **F = 96,485 C** is the **Faraday constant**: the charge on one mole of electrons -- L2P7's coulombs, counted a mole at a time\n\nCheck it: at Q = 1, log 1 = 0, so E = E°. **The table's value is simply the voltage when Q is 1.**\n\nThe conditions belong here: **25 °C**, and **dilute solutions**, where an ion's concentration is what counts.",
            options: [
                { id: 'cont', label: "Run the cell by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Start with 1.0 mol/L of each ion. Each time x mol/L of copper ions reacts, x mol/L of zinc ions is made, so [Zn²⁺] = 1 + x and [Cu²⁺] = 1 − x.\n\nWith n = 2, the factor is 0.0592 / 2 = **0.0296 V**. So **each ten-fold rise in Q takes 0.0296 V off the voltage**.\n\n| Copper ions used | [Zn²⁺] | [Cu²⁺] | Q | log Q | E = 1.10 − 0.0296 x log Q |\n| --- | --- | --- | --- | --- | --- |\n| 0% | 1.0 | 1.0 | 1 | 0 | **1.100 V** |\n| 50% | 1.5 | 0.5 | 3 | 0.48 | **1.086 V** |\n| 90% | 1.9 | 0.1 | 19 | 1.28 | **1.062 V** |\n| 99% | 1.99 | 0.01 | 199 | 2.30 | **1.032 V** |\n| 99.99% | 2.0 | 0.0001 | 20,000 | 4.30 | **0.973 V** |\n\nRead down the last column. Using up half the copper ions costs only **0.014 V**. Using up 99% costs less than **0.07 V**. The voltage stays almost flat for nearly the whole life of the cell. Only when the copper ions are almost completely gone does Q run away -- and the voltage falls off a cliff.\n\nThat answers the opening question: about **1.03 V**, with 99% of the copper ions gone.\n\nIt also quietly corrects C7. **The amount of solid zinc does not appear in the equation at all.** What sets the voltage is the ions in solution.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A Daniell cell has **[Zn²⁺] = 1.0 mol/L** and **[Cu²⁺] = 0.010 mol/L**.\n\nWhat is its voltage at 25 °C?",
            options: [
                { id: 'right', label: "About 1.04 V. Q = 1.0 / 0.010 = 100, log 100 = 2, and E = 1.10 − 0.0296 x 2 = 1.04 V.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'plus', label: "About 1.16 V, because E = 1.10 + 0.0296 x 2 = 1.16 V.", nextNodeId: 'math_wrong' },
                { id: 'no_n', label: "About 0.98 V, because E = 1.10 − 0.0592 x 2 = 0.98 V.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1.16 V** added instead of subtracting. Q is bigger than 1 here -- far more of the ion being made than of the ion being used up -- and that makes the voltage **lower** than standard. The minus sign in the equation is there for exactly this.\n\n**0.98 V** forgot to divide by n. Each zinc atom hands over **2** electrons, so the 0.0592 is shared between them: 0.0592 / 2 = 0.0296 V for each ten-fold change in Q.\n\nE = 1.10 − (0.0592 / 2) x log 100 = 1.10 − 0.0296 x 2 = **1.04 V**",
            options: [
                { id: 'retry', label: "Minus, and divide by n.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Copper Ions Used** is how much of the starting 1.0 mol/L of Cu²⁺ has reacted, as a percentage from 0% to 99.99%. The dial is spread out so that the last few per cent get plenty of room. **Starting Zinc Ions** is the Zn²⁺ concentration the cell began with, in mol/L.\n\nThe lab works out [Zn²⁺], [Cu²⁺], Q and E, and draws the voltage against how far the cell has run.\n\nTry this:\n\n- With **Starting Zinc Ions** at 1.0 mol/L, slide from 0% to 99%: watch how little the voltage moves\n- Keep going past 99.9%, and watch it drop\n- Set **Starting Zinc Ions** to **0.01 mol/L**. The cell now starts **above** 1.10 V",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Flat, flat, then a cliff. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A Daniell cell is built with only a trace of zinc ions, **[Zn²⁺] = 0.010 mol/L**, and plenty of copper ions, **[Cu²⁺] = 1.0 mol/L**.\n\nIs its voltage above or below the standard 1.10 V?",
            options: [
                { id: 'right', label: "Above: about 1.16 V. Q = 0.010 / 1.0 = 0.01, log Q = −2, and E = 1.10 − 0.0296 x (−2) = 1.16 V.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Below. Any concentration other than 1 mol/L moves a cell away from its best voltage.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Standard conditions are not a cell's **best** voltage. They are an agreed reference point, like L2C7's hydrogen electrode at 0.00 V.\n\nThe sign of log Q decides which way the voltage moves:\n\n| Q | log Q | E = 1.10 − 0.0296 x log Q | Compared with 1.10 V |\n| --- | --- | --- | --- |\n| 100 | +2 | 1.04 V | lower |\n| 1 | 0 | 1.10 V | the same |\n| 0.01 | −2 | **1.16 V** | **higher** |\n\nWhen the ion being used up is plentiful and the ion being made is scarce, the reaction has further to go, and each coulomb gets a little more energy. A fresh cell with very few zinc ions starts **above** its standard voltage.",
            options: [
                { id: 'retry', label: "Q below 1 lifts the voltage.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A cell's voltage follows the logarithm of its ion ratio, Q: it can start above E°, and a running cell falls slowly -- then suddenly.**\n\nHere is the simplification this lesson removed. **L2C7 read a cell's voltage from a table, as if each pair of metals had one fixed voltage.** The table gives only the voltage when Q = 1. The real voltage depends on the ions in solution, and it drifts as the cell runs.\n\nIt also explains the shape of a dying battery: steady for most of its life, then a fast fall at the end.\n\nAnd the simplifications still standing. **The Nernst equation uses concentrations, which is fair only for dilute solutions.** At 1 mol/L, ions crowd each other, and each behaves as though its concentration were lower. And the sag you actually see in a torch battery under load is mostly **L3P7's internal resistance**, not Nernst.\n\nB7 finds the same equation working inside every nerve cell -- where there are no metals at all, only ions.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The ions set the voltage!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why a battery's voltage fades.**\n\n- A **Daniell cell**: zinc in Zn²⁺, copper in Cu²⁺, joined by a **salt bridge**\n- As it runs, **Zn²⁺ builds up** and **Cu²⁺ runs down**\n- **Q = [Zn²⁺] / [Cu²⁺]**: the ion made over the ion used up\n- **Nernst equation**: **E = E° − (0.0592 / n) x log Q**, at 25 °C, for dilute solutions\n- **0.0592 V** = 2.303 R T / F; the **Faraday constant** F = 96,485 C is a mole of electrons' charge\n- At Q = 1, E = E°: the table's value is the voltage at Q = 1\n- With n = 2, each ten-fold rise in Q costs **0.0296 V**\n- 50% of the copper ions used: **1.086 V**; 99%: **1.032 V**; 99.99%: **0.973 V**\n- Flat for most of the cell's life, then a cliff\n- The amount of **solid zinc** is not in the equation\n- Q below 1 lifts the voltage above E°: Q = 0.01 gives **1.16 V**\n- Still standing: concentrations are not quite what counts at 1 mol/L, and load sag is mostly internal resistance",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "E = E° − (0.0592 / n) x log Q!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why a Battery's Voltage Fades!**\n\nL2C7 read a cell's voltage from a table. Level 3 finds what the table was hiding.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Daniell cell | Zn in Zn²⁺, Cu in Cu²⁺ | Ions you can track |\n| Ion ratio | **Q = [Zn²⁺] / [Cu²⁺]** | Made over used up |\n| Nernst equation | **E = E° − (0.0592 / n) log Q** | At 25 °C, dilute |\n| The 0.0592 | 2.303 R T / F | L3C5's constants and a mole of charge |\n| Each ten-fold Q | 0.0592 / 2 = **0.0296 V** | A small step |\n| 99% used | 1.10 − 0.068 = **1.032 V** | Still nearly full voltage |\n| The cliff | 99.99% used: **0.973 V** | Q runs away at the end |\n| Q below 1 | 0.01 gives **1.16 V** | Above standard |\n| Still standing | activities, internal resistance | Dilute only; L3P7 under load |\n\n**The one line to remember:** a cell's voltage follows the logarithm of its ion ratio -- so it holds steady for most of its life, and falls away only at the very end.\n\n**Up next:** B7 -- the same equation inside a nerve cell."
        }
    };
}
