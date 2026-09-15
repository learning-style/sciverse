import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 11, chemistry.
 *
 * L2C11 held that nothing in a liquid resists a change in pH. This removes
 * that simplification with blood's bicarbonate buffer:
 * pH = 6.1 + log (bicarbonate / (0.03 x CO2 pressure)), bicarbonate in mmol/L
 * and CO2 pressure in mmHg. Worked by hand: 24 / (0.03 x 40) = 20 gives 7.40;
 * acid using up half the bicarbonate gives 7.10, where pure water would reach
 * pH 1.9; breathing CO2 down to 20 mmHg restores 7.40.
 *
 * Frame of reference stated: the ratio is the base (bicarbonate) over the acid
 * (dissolved CO2). Condition stated: this pair, at body temperature. The
 * checkpoint rearranges for the CO2 pressure. Still standing: the lungs' and
 * kidneys' limits, and other buffers.
 */
export function getL3C11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C11 found that each pH step is ten times the hydrogen ions, and named what it held fixed: **nothing in the liquid fought back**.\n\nYour cells make acid all day, especially when you exercise hard. Suppose muscles release **12 mmol** of acid into each litre of blood. (A **millimole, mmol**, is one thousandth of L3C2's mole.)\n\nThat much strong acid in a litre of **pure water** would give a pH of about **1.9**.\n\nDoes a litre of **blood** fall to pH 1.9 too?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. Blood contains something that soaks up the hydrogen ions -- a buffer -- so its pH falls only a little, and breathing can bring it back.", nextNodeId: 'buffer', sentiment: 'positive' },
                { id: 'bad', label: "Yes. The same acid in the same volume must give the same pH.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It would -- if every hydrogen ion added stayed free. In blood, most of them do not.\n\nThink of spilling water on a table with a sponge on it. Without the sponge, the water spreads everywhere. With the sponge, most of the water is soaked up before it can spread.\n\nBlood carries a chemical sponge for hydrogen ions: **bicarbonate**. Each bicarbonate ion grabs one H⁺ and turns it into carbonic acid, which breaks down into water and CO₂ -- and you breathe the CO₂ out.\n\nA mixture that soaks up added acid like this is called a **buffer**. The pH still changes, but far less. How much less can be worked out.",
            options: [
                { id: 'cont', label: "Work out how much less.", nextNodeId: 'buffer' }
            ]
        },
        buffer: {
            id: 'buffer',
            speaker: 'AI',
            content: "First, what pH measures. **pH = − log (H⁺ in mol/L)**, using L3B4's logarithms. Pure water has 10⁻⁷ mol/L, so pH 7. Each step is ten times, as in L2C11.\n\nA **buffer** is a **weak acid** mixed with its **partner base**. Blood's buffer is:\n\n- the acid: **dissolved CO₂**, which forms carbonic acid in water\n- the base: **bicarbonate, HCO₃⁻**\n\nWhen acid is added: **H⁺ + HCO₃⁻ → H₂CO₃ → H₂O + CO₂**. The bicarbonate is used up, and the CO₂ is breathed out.\n\nFor this buffer, the pH depends on the **ratio** of base to acid:\n\n**pH = 6.1 + log (bicarbonate / (0.03 x CO₂ pressure))**\n\n- **bicarbonate** is in mmol/L\n- **CO₂ pressure** is how hard the CO₂ dissolved in blood pushes, in P11's **mmHg**\n- **0.03** turns each mmHg of CO₂ pressure into mmol/L of dissolved CO₂\n\nThe frame of reference: the ratio is **base on top, acid below**. More base, higher pH.\n\nOne more rule for logs: **log (a x b) = log a + log b**, because multiplying powers of ten adds the powers. So log 20 = log 2 + log 10 = 0.30 + 1 = 1.30.\n\nThe condition belongs here. **The 6.1 and the 0.03 hold for this pair, at body temperature, 37 °C.**",
            options: [
                { id: 'cont', label: "Work out blood's pH by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**Normal blood:** bicarbonate **24 mmol/L**, CO₂ pressure **40 mmHg**.\n\n**Step 1.** dissolved CO₂ = 0.03 x 40 = **1.2 mmol/L**\n\n**Step 2.** ratio = 24 / 1.2 = **20**\n\n**Step 3.** pH = 6.1 + log 20 = 6.1 + 1.30 = **7.40** ✓\n\n**Now add 12 mmol of acid to each litre.** Each H⁺ uses up one bicarbonate, so bicarbonate falls from 24 to **12 mmol/L**. The CO₂ made is breathed out, so the CO₂ pressure stays at 40 mmHg.\n\nratio = 12 / 1.2 = **10**, and pH = 6.1 + log 10 = 6.1 + 1 = **7.10**\n\nIn pure water, the same acid gave **pH 1.9**. The buffer held the pH above 7.\n\n**Then the body breathes faster**, blowing off CO₂, until the CO₂ pressure is **20 mmHg**:\n\ndissolved CO₂ = 0.03 x 20 = 0.6, ratio = 12 / 0.6 = **20**, and pH = **7.40** again\n\n| | Bicarbonate | CO₂ pressure | Ratio | pH |\n| --- | --- | --- | --- | --- |\n| Normal | 24 mmol/L | 40 mmHg | 20 | **7.40** |\n| Acid added | 12 mmol/L | 40 mmHg | 10 | **7.10** |\n| Breathing faster | 12 mmol/L | 20 mmHg | 20 | **7.40** |\n\n**Only the ratio matters.** Halve the base and halve the acid, and the pH does not change.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A person's lungs are not clearing CO₂ well, and their CO₂ pressure rises to **80 mmHg**. Their bicarbonate is still **24 mmol/L**.\n\nWhat is their blood's pH?",
            options: [
                { id: 'right', label: "7.10. Dissolved CO₂ = 0.03 x 80 = 2.4, the ratio is 24 / 2.4 = 10, and 6.1 + log 10 = 7.10.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'upside_down', label: "7.70. Doubling the CO₂ doubles the ratio to 40, and 6.1 + log 40 = 7.70.", nextNodeId: 'math_wrong' },
                { id: 'unchanged', label: "7.40, because the bicarbonate did not change.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**7.70** put the CO₂ on top. The ratio is **base on top, acid below**: CO₂ is the acid, so more CO₂ makes the ratio **smaller** and the blood **more acidic**.\n\n**7.40** left out the CO₂. The pH depends on the **ratio**, and doubling the bottom of a ratio halves it, even if the top stays the same.\n\n**Step 1.** dissolved CO₂ = 0.03 x 80 = **2.4 mmol/L**\n\n**Step 2.** ratio = 24 / 2.4 = **10**\n\n**Step 3.** pH = 6.1 + log 10 = **7.10** -- dangerously acidic, from breathing alone",
            options: [
                { id: 'retry', label: "Base on top, acid below.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for blood at body temperature.\n\n**Bicarbonate** is the base, in mmol/L. **CO₂ Pressure** is the push of the dissolved CO₂, in mmHg.\n\nThe lab works out the dissolved CO₂, the ratio, and the pH, and shows the healthy band from **7.35 to 7.45**.\n\nTry this:\n\n- Set **24** and **40**: pH 7.40\n- Drop **Bicarbonate** to **12**: pH 7.10\n- Now lower **CO₂ Pressure** until the pH is back in the band\n- Set both to half, or both to double. The pH stays the same, because the ratio does",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Only the ratio matters. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** After the acid, a person's bicarbonate is **12 mmol/L**, and their lungs cannot change that. Their pH is 7.10.\n\nWhat CO₂ pressure would bring their pH back to **7.40**?",
            options: [
                { id: 'right', label: "20 mmHg. pH 7.40 needs the ratio 20, so the dissolved CO₂ must be 12 / 20 = 0.6 mmol/L, and 0.6 / 0.03 = 20 mmHg. They must breathe faster.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "80 mmHg. With less bicarbonate, the blood needs more CO₂ to balance it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More CO₂ adds more **acid**, so it pushes the pH the wrong way. Try it:\n\n| CO₂ pressure | Dissolved CO₂ | Ratio | pH |\n| --- | --- | --- | --- |\n| 80 mmHg | 2.4 | 12 / 2.4 = 5 | 6.1 + 0.70 = **6.80** |\n| 40 mmHg | 1.2 | 10 | **7.10** |\n| 20 mmHg | 0.6 | 20 | **7.40** |\n\n(log 5 = log 10 − log 2 = 1 − 0.30 = 0.70.)\n\nTo get back to 7.40, the ratio must return to 20. The bicarbonate has halved, so the CO₂ must halve too: **40 to 20 mmHg**, by breathing faster.\n\nThat is why hard exercise leaves you panting even after you stop: your breathing is clearing the acid your muscles made.",
            options: [
                { id: 'retry', label: "Halve the base, halve the acid.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Blood's pH depends on the ratio of bicarbonate to dissolved CO₂ -- and the lungs can change the CO₂ within minutes.**\n\nHere is the simplification this lesson removed. **L2C11 held that nothing in the liquid fought back.** Blood's buffer soaks up added H⁺, so 12 mmol of acid moved the pH from 7.40 to 7.10 instead of to 1.9 -- and breathing brought it back.\n\nAnd the simplifications still standing. **The lungs can only lower the CO₂ so far**, and breathing hard is tiring. The **kidneys** rebuild used-up bicarbonate, but they take hours to days. Blood also has **other buffers**, such as proteins, which this lesson left out. And the 6.1 and 0.03 are only true at **body temperature**.\n\nL3B11 asks why a vaccine protects most people but not everyone.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Only the ratio matters!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how blood holds its pH.**\n\n- **pH = − log (H⁺ in mol/L)**; a **millimole** is a thousandth of a mole\n- A **buffer** is a weak acid with its partner base; blood's is dissolved CO₂ and **bicarbonate**\n- **H⁺ + HCO₃⁻ → H₂CO₃ → H₂O + CO₂**, and the CO₂ is breathed out\n- **pH = 6.1 + log (bicarbonate / (0.03 x CO₂ pressure))**\n- Frame of reference: base on top, acid below\n- Condition: this pair, at body temperature\n- **log (a x b) = log a + log b**, so log 20 = 1.30\n- Normal: 24 / 1.2 = 20, **pH 7.40**\n- 12 mmol/L of acid: bicarbonate 12, **pH 7.10** -- pure water would reach 1.9\n- CO₂ pressure 80 mmHg: **pH 7.10**\n- Breathing CO₂ down to **20 mmHg** restores 7.40\n- Still standing: limits of the lungs and kidneys, and other buffers",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Base over acid!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Blood Holds Its pH!**\n\nL2C11 added acid to pure water. Level 3 adds it to blood.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| pH | **− log (H⁺ in mol/L)** | Water: 10⁻⁷, pH 7 |\n| Buffer | weak acid + partner base | Soaks up added H⁺ |\n| Blood's buffer | **6.1 + log (bicarbonate / (0.03 x CO₂ pressure))** | Base over acid |\n| Normal | 24 / 1.2 = 20 | **pH 7.40** |\n| Acid added | 12 / 1.2 = 10 | **pH 7.10**, not 1.9 |\n| Poor breathing | 24 / 2.4 = 10 | **pH 7.10** |\n| Breathing faster | 12 / 0.6 = 20 | Back to **7.40** |\n| Still standing | lungs, kidneys, other buffers | Limits and time |\n\n**The one line to remember:** blood's pH follows the ratio of bicarbonate to CO₂ -- so breathing, which changes the CO₂, can steer it back.\n\n**Up next:** L3B11 -- racing a germ with memory cells."
        }
    };
}
