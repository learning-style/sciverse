import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C7 "Batteries & Chemical Energy".
 *
 * C7 said a battery needs two different metals and an electrolyte. This lesson
 * explains what sets the voltage: each metal's standard electrode potential,
 * measured against the standard hydrogen electrode (the stated frame of
 * reference), and cell voltage = potential of the + metal - potential of the
 * - metal. Cells in series add, from L2P7.
 *
 * Condition stated where the table is given: standard conditions, which is why
 * C7's lemon gave 0.9 V rather than 1.10 V. The checkpoint (two copper coins
 * give 0.00 V) is C7's "two different metals" in numbers. How far a real cell
 * falls short is left, by name, to Level 3.
 */
export function getL2C7Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C7 you made a battery from a lemon, a zinc nail and a copper coin. It gave about **0.9 volts**. An AA battery gives **1.5 V**.\n\nC7 said a battery needs **two different metals**. So here is a question for a battery builder: does the **choice** of metals change the voltage?\n\nSuppose you keep the copper, but swap the zinc nail for a strip of **magnesium**, a very reactive metal.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Yes. Metals differ in how readily they give away electrons, and the voltage depends on how different the two metals are. Magnesium gives electrons away far more readily than zinc, so the voltage goes up.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No. Any two different metals give the same voltage -- it is the lemon juice that sets it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The lemon juice does matter. As C7 showed, it is the **electrolyte** that carries ions between the metals. But it is not what sets the size of the push.\n\nChemists have measured cells made from different pairs of metals under the same careful conditions. **Zinc with copper gives 1.10 V. Magnesium with copper gives 2.71 V** -- well over twice as much.\n\nSame liquid, same copper, very different voltages. So the metals themselves must each bring something to the cell. The next step gives that something a name and a number.",
            options: [
                { id: 'cont', label: "What does each metal bring?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Every metal has its own tendency to **give away electrons**. C7 showed zinc doing it: zinc atoms lose electrons and dissolve into the juice as zinc ions.\n\nChemists measure this tendency as an **electrode potential**, in **volts**. An **electrode** is a piece of metal dipped into a liquid that carries ions.\n\nL2P7 defined voltage as a push between two places -- so every potential needs a **frame of reference**. Each value in the table is measured **compared with a standard hydrogen electrode**, which everyone agrees to call **0.00 V**:\n\n| Metal | Electrode potential |\n| --- | --- |\n| Magnesium | −2.37 V |\n| Zinc | −0.76 V |\n| Iron | −0.44 V |\n| Lead | −0.13 V |\n| Copper | +0.34 V |\n| Silver | +0.80 V |\n\n**The more negative the value, the more readily the metal gives away electrons.**\n\nIn a cell, the metal that gives away electrons more readily becomes the **negative (−) end** -- C7's anode. The other becomes the **positive (+) end** -- C7's cathode. The cell's voltage is the difference between them:\n\n**cell voltage = potential of the + metal − potential of the − metal**\n\nThe condition belongs here. **These values are for standard conditions**: each metal dipped in a solution of its own ions at a set strength, at 25 °C. A lemon is not standard conditions -- which is why C7's lemon gave 0.9 V, not 1.10 V.",
            options: [
                { id: 'cont', label: "Work out some cells.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Zinc and copper** -- C7's lemon metals.\n\nZinc, at −0.76 V, is more negative, so zinc is the **−** end. Copper, at +0.34 V, is the **+** end.\n\ncell voltage = 0.34 − (−0.76) = 0.34 + 0.76 = **1.10 V**\n\nSubtracting a negative number is the same as adding it.\n\n**Magnesium and copper:**\n\ncell voltage = 0.34 − (−2.37) = **2.71 V**\n\n**Zinc and silver:**\n\ncell voltage = 0.80 − (−0.76) = **1.56 V**\n\nPicture the table as a number line. Each cell voltage is simply the **distance** between its two metals on that line. **The further apart they sit, the bigger the push.**\n\nAnd from L2P7, cells joined **in series** add their voltages, like steps on a staircase. Two zinc–copper cells in series give 1.10 + 1.10 = **2.20 V**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** An **iron** nail and a **copper** coin, under standard conditions.\n\nWhat is the cell voltage?",
            options: [
                { id: 'right', label: "0.78 V. Iron (−0.44 V) is the − end and copper (+0.34 V) is the + end: 0.34 − (−0.44) = 0.78 V.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'added', label: "−0.10 V, because 0.34 + (−0.44) = −0.10.", nextNodeId: 'math_wrong' },
                { id: 'reversed', label: "−0.78 V, because −0.44 − 0.34 = −0.78.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**−0.10 V** added the two potentials. But a cell voltage is a **difference** -- the distance between the two metals on the number line. Subtract the − metal's potential from the + metal's.\n\n**−0.78 V** has the right size, but the metals the wrong way round: it treated iron as the + end. Iron's potential is more negative, so iron gives away electrons more readily. **Iron is the − end.** Put the + metal first, and a working cell always comes out positive.\n\ncell voltage = 0.34 − (−0.44) = **0.78 V**",
            options: [
                { id: 'retry', label: "The + metal minus the − metal.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, each choosing a metal from the table.\n\n**First Metal** and **Second Metal** can each be any of the six. The lab places both on a number line of electrode potentials, marks which is the **−** end and which is the **+** end, and works out the cell voltage as the distance between them.\n\nIt also shows how many of those cells, joined in series, would reach **3.0 V** -- the push of two AA batteries.\n\nTry this:\n\n- Start with **zinc** and **copper**: 1.10 V\n- Swap the zinc for **magnesium**, and watch the voltage jump\n- Choose **lead** and **iron**, which sit close together in the table: a small voltage\n- Choose the **same metal** for both dials, and see what happens",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Further apart, bigger push. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A student pushes **two copper** coins into a lemon, joins them to a voltmeter, and waits.\n\nWhat voltage does the meter show?",
            options: [
                { id: 'right', label: "0.00 V. Both electrodes are copper, with the same potential, so neither end gives away electrons more readily: the difference is zero.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About 0.68 V, because two copper electrodes give 0.34 + 0.34.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Adding the two potentials would treat each electrode as a battery of its own. But a cell's push comes from the **difference** between its two electrodes -- one metal giving away electrons more readily than the other.\n\ncell voltage = 0.34 − 0.34 = **0.00 V**\n\nWith identical metals, both ends hold on to electrons equally. There is no **−** end and no **+** end, so there is no push. That is exactly why C7 needed **two different metals**.",
            options: [
                { id: 'retry', label: "Same metals, no difference, no push.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A cell's voltage is the difference between its two electrode potentials, so identical metals give nothing.**\n\nNow put it to work. A red LED needs about **1.8 V** to light.\n\n- One zinc–copper cell, 1.10 V: not enough\n- Two in series, 2.20 V: enough -- but only under standard conditions\n- A real lemon cell gives only about 0.9 V, so two lemons in series reach just 1.8 V, right at the edge. That is why lemon battery kits often use **three or four lemons**\n\nThe table gives the best a pair of metals can do. How far a real cell falls short depends on what is dissolved around the metals -- a question for Level 3.\n\nB7 takes the idea of stacking cells in series into a living body.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Voltage is a difference!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what sets a battery's voltage.**\n\n- Each metal has its own tendency to **give away electrons**\n- An **electrode** is a metal dipped in a liquid that carries ions\n- An **electrode potential** measures that tendency, in volts\n- Frame of reference: every value is compared with the **standard hydrogen electrode**, 0.00 V\n- The more negative the potential, the more readily the metal gives away electrons -- it becomes the **−** end\n- **cell voltage = potential of the + metal − potential of the − metal**\n- Zinc–copper **1.10 V**; magnesium–copper **2.71 V**; zinc–silver **1.56 V**; iron–copper **0.78 V**\n- The values are for **standard conditions**, so C7's lemon gives only about 0.9 V\n- Two identical metals give **0.00 V**\n- Cells in **series** add their voltages\n- A red LED needs about 1.8 V, so lemon batteries need three or four lemons",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The + metal minus the − metal!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Choosing Metals for a Battery!**\n\nC7 said a battery needs two different metals. Level 2 works out what voltage any pair will give.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Electrode potential | volts, compared with hydrogen's 0.00 V | How readily a metal gives away electrons |\n| The − end | the more negative metal | C7's anode |\n| Cell voltage | **+ metal − (− metal)** | The distance on the number line |\n| Zinc–copper | 0.34 − (−0.76) = **1.10 V** | C7's metals |\n| Magnesium–copper | 0.34 − (−2.37) = **2.71 V** | Far apart, big push |\n| Two copper coins | 0.34 − 0.34 = **0.00 V** | No difference, no push |\n| Cells in series | voltages add | 1.10 + 1.10 = 2.20 V |\n| Standard conditions | 25 °C, set solutions | A lemon gives less |\n\n**The one line to remember:** a cell's push is the difference between how readily its two metals give away electrons -- and cells in series add up their pushes.\n\n**Up next:** B7 -- how a living body stacks thousands of cells in series."
        }
    };
}
