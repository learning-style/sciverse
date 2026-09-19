import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 7, biology. The synthesis lesson.
 *
 * L2B7 took an electrocyte's -85 mV and +65 mV as given. This removes that
 * simplification: each ion's balancing voltage follows from its concentrations,
 * E = (61.5 / z) log (outside / inside) mV at 37 C -- L3C7's Nernst equation at
 * body temperature. Frame of reference stated: inside compared with outside.
 * Built in four steps from L3B2's diffusion, then worked by hand: potassium
 * -89 mV, sodium +61 mV. The checkpoint uses B39's threshold with high blood
 * potassium.
 *
 * Condition stated where the equation is given: one ion at a time. Still
 * standing: the real resting voltage needs every ion weighted by how easily it
 * crosses (Goldman), and ATP-driven sodium-potassium pumps keep recharging it.
 */
export function getL3B7Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B7 gave an electrocyte's voltages as facts: about **−85 mV** inside at rest, and about **+65 mV** across a firing face. B7's nerve cells work the same way, resting at about **−70 mV**.\n\nBut a nerve cell has no metals, no wires and no zinc. And L3C7 found that a cell's voltage comes from the **ions in solution**.\n\nInside a nerve cell, **potassium ions**, K⁺, are about **28 times** more concentrated than outside.\n\nWhy would that make the inside of the cell **negative**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Potassium ions leak out, down their concentration difference, carrying positive charge away. That leaves the inside negative -- until the negative inside pulls back as hard as diffusion pushes out.", nextNodeId: 'balance', sentiment: 'positive' },
                { id: 'bad', label: "Because potassium ions are negative, so having more of them inside makes the inside negative.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Potassium ions are **positive**: K⁺ is a potassium atom that has lost one electron. So more K⁺ inside would, if anything, make the inside **positive**.\n\nThe negative voltage comes from potassium **leaving**. To follow it, keep the same frame of reference as L2B7: **the inside of the cell, compared with the outside.**",
            options: [
                { id: 'cont', label: "How does potassium leaving make the inside negative?", nextNodeId: 'balance' }
            ]
        },
        balance: {
            id: 'balance',
            speaker: 'AI',
            content: "Picture a nerve cell at rest. Its membrane has channels that let **potassium ions** through, but hardly anything else. Voltages are the inside compared with the outside.\n\n**Step 1: diffusion pushes K⁺ out.** From L3B2, particles drift from where they are concentrated to where they are not. K⁺ is 28 times more concentrated inside, so K⁺ drifts **out**.\n\n**Step 2: each ion that leaves takes positive charge with it.** The cell's large negative molecules, mostly proteins, cannot follow. So the inside becomes **negative**.\n\n**Step 3: the negative inside pulls K⁺ back.** Positive ions are attracted towards negative charge. The more K⁺ leaves, the more negative the inside becomes, and the harder it pulls the rest back.\n\n**Step 4: balance.** At one particular voltage, the electrical pull back **exactly matches** the diffusion push out. K⁺ still crosses in both directions, but equally, so nothing changes.\n\nThat balancing voltage is the ion's **equilibrium potential**. It takes remarkably few ions to set up: far fewer than one K⁺ in a thousand needs to leave.",
            options: [
                { id: 'cont', label: "Can L3C7's equation give that balancing voltage?", nextNodeId: 'nernst' }
            ]
        },
        nernst: {
            id: 'nernst',
            speaker: 'AI',
            content: "Yes. L3C7's Nernst equation gives the balancing voltage for a single ion, written the way biologists use it:\n\n**E_ion = (61.5 / z) x log ([ion outside] / [ion inside])**, in mV, at 37 °C\n\nPiece by piece:\n\n- **z** is the ion's charge: +1 for K⁺ and for Na⁺\n- The concentrations are in **mM**, **millimoles per litre**: thousandths of a mole in each litre\n- **61.5 mV** is L3C7's 2.303 x R x T / F, worked out at body temperature, **T = 310 K**, instead of 25 °C. That is why it is not 59.2\n- **E_ion** is the inside compared with the outside, as always\n\nNotice the ratio is **outside over inside**. When an ion is more concentrated inside, the ratio is below 1, its log is negative, and the balancing voltage is negative: the inside must be negative to hold that ion in.\n\nThe condition belongs here. **This is the voltage the cell would have if its membrane let through only that one ion**, at 37 °C, treating concentrations as what counts.",
            options: [
                { id: 'cont', label: "Work out potassium and sodium by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Typical concentrations for a nerve cell:\n\n| Ion | Outside | Inside |\n| --- | --- | --- |\n| Potassium, K⁺ | 5 mM | 140 mM |\n| Sodium, Na⁺ | 145 mM | 15 mM |\n\n**Potassium:**\n\n| Step | Working | Result |\n| --- | --- | --- |\n| Ratio | 5 / 140 | 0.0357 |\n| log | log 0.0357 | −1.447 |\n| x 61.5 | 61.5 x (−1.447) | **−89 mV** |\n\n**Sodium:**\n\n| Step | Working | Result |\n| --- | --- | --- |\n| Ratio | 145 / 15 | 9.67 |\n| log | log 9.67 | 0.985 |\n| x 61.5 | 61.5 x 0.985 | **+61 mV** |\n\nNow compare with what cells actually do:\n\n- At rest, a nerve cell sits at about **−70 mV** -- close to potassium's **−89 mV**. At rest, the membrane lets K⁺ through far more easily than Na⁺, so potassium has the bigger say.\n- When a nerve fires, sodium channels fly open. The voltage races towards sodium's **+61 mV**, peaking near +40 mV before potassium takes over again.\n- L2B7's electrocyte: **−85 mV** at rest, near potassium's balance; **+65 mV** on its firing face, near sodium's.\n\nThose were never arbitrary numbers. **They are the balancing voltages of two ions.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** In some kidney diseases, the potassium outside cells rises from **5 mM** to **10 mM**. Inside stays at **140 mM**.\n\nWhat is potassium's balancing voltage now?",
            options: [
                { id: 'right', label: "About −70 mV. log (10 / 140) = log 0.0714 = −1.146, and 61.5 x (−1.146) = −70 mV.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'flipped', label: "About +70 mV, because log (140 / 10) = 1.146, and 61.5 x 1.146 = +70 mV.", nextNodeId: 'math_wrong' },
                { id: 'unchanged', label: "Still about −89 mV, because the potassium inside has not changed.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**+70 mV** turned the ratio upside down. The equation uses **outside over inside**. With K⁺ more concentrated inside, that ratio is below 1 and the voltage is negative: the inside must stay negative to hold potassium in.\n\n**−89 mV** assumed only the inside matters. The balance depends on the **ratio** of outside to inside, so changing either one changes it. Here the inside-to-outside difference falls from 28 times to 14 times, so less negative voltage is needed to hold potassium in.\n\nE_K = 61.5 x log (10 / 140) = 61.5 x (−1.146) = **−70 mV**",
            options: [
                { id: 'retry', label: "Outside over inside, and both count.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, both for **potassium**, both in mM.\n\n**Potassium Outside** is K⁺ outside the cell, from 1 mM to 20 mM. **Potassium Inside** is K⁺ inside, from 50 mM to 200 mM.\n\nThe lab works the Nernst equation step by step, and places potassium's balancing voltage on a scale from −120 mV to +80 mV, beside sodium's **+61 mV** and a nerve cell's usual **−70 mV** at rest.\n\nTry this:\n\n- Start at **5 mM** outside and **140 mM** inside: −89 mV\n- Double the outside to 10 mM, and watch the balance rise by **18.5 mV** -- the same step every time the ratio doubles\n- Find the outside concentration that brings potassium's balance up to −70 mV",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "More potassium outside, less negative. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** High potassium outside cells -- the kidney disease from your last question -- can make the heart beat dangerously.\n\nB39 described nerve and muscle cells firing once their voltage rises past a **threshold**. Using potassium's balancing voltage, why is high outside potassium dangerous?",
            options: [
                { id: 'right', label: "It makes potassium's balancing voltage less negative, so the resting voltage creeps up towards the threshold. Heart cells can fire when they should not -- and then cannot reset properly.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Extra potassium outside makes the inside even more negative, so heart cells cannot reach the threshold at all.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It goes the other way. More K⁺ outside means **a smaller difference between inside and outside** -- 28 times becomes 14 times -- so there is less diffusion push for the negative inside to hold back. The balance moves **up**, towards zero.\n\n| Outside K⁺ | Ratio outside / inside | log | Balancing voltage |\n| --- | --- | --- | --- |\n| 5 mM | 0.0357 | −1.447 | −89 mV |\n| 10 mM | 0.0714 | −1.146 | **−70 mV** |\n\nThe resting voltage sits close to potassium's balance, so it rises too -- towards B39's **threshold**. Heart cells can then fire at the wrong moments, and the sodium channels that should reset between beats cannot recover properly. That is why doctors watch blood potassium so closely.",
            options: [
                { id: 'retry', label: "More outside, less negative, closer to threshold.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A cell's resting voltage is set by ion concentration ratios, so changing the potassium outside moves it.**\n\nHere is the simplification this lesson removed. **L2B7 took −85 mV and +65 mV as given.** They follow from the concentrations of two ions, through the same equation that sets a battery's voltage.\n\nThat completes Big Idea 7 at Level 3. Level 2 treated every voltage as fixed. Level 3 asked what sets a real voltage:\n\n- **L3P7** -- a real battery is an emf in series with an internal resistance: **V = ε − I x r**, so it sags under load\n- **L3C7** -- a cell's voltage follows its ion ratio: **E = E° − (0.0592 / n) x log Q**, flat for most of its life, then a cliff\n- **L3B7** -- a nerve cell's voltage follows its ion ratios too: **E = (61.5 / z) x log (outside / inside)**\n\nAnd the simplifications still standing. **The real resting voltage is about −70 mV, not potassium's −89 mV**, because a little sodium leaks in as well. The **Goldman equation** weighs every ion by how easily it crosses the membrane. And a living cell is a battery that would run flat, like L3C7's, except that **sodium–potassium pumps**, powered by L3B3's **ATP** (adenosine triphosphate), keep pushing the ions back. The nerve's battery is being recharged all the time.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Ion ratios set every voltage!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the battery inside every nerve cell.**\n\n- Frame of reference: the **inside** of the cell compared with the **outside**\n- K⁺ is positive; potassium **leaving** makes the inside negative\n- Diffusion pushes K⁺ out; the negative inside pulls it back; they balance at the **equilibrium potential**\n- **E_ion = (61.5 / z) x log ([outside] / [inside])**, in mV, at 37 °C, for one ion at a time\n- **61.5 mV** is 2.303 R T / F at body temperature, 310 K\n- Concentrations in **mM**: millimoles per litre\n- Potassium: 61.5 x log (5 / 140) = **−89 mV**\n- Sodium: 61.5 x log (145 / 15) = **+61 mV**\n- Rest sits near potassium's balance; firing races towards sodium's\n- Outside K⁺ at 10 mM moves potassium's balance to **−70 mV**, towards the threshold\n- Every doubling of the ratio moves the balance by **18.5 mV**\n- Still standing: the **Goldman equation** weighs all ions; ATP-powered **sodium–potassium pumps** keep the battery charged",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Every nerve cell is a battery!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Battery in Every Nerve Cell!**\n\nL2B7 took a living cell's voltages as given. Level 3 derives them from the ions.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Frame of reference | inside compared with outside | How a cell's voltage is measured |\n| The balance | diffusion out = electrical pull back | The equilibrium potential |\n| Nernst for one ion | **E = (61.5 / z) log (out / in)** | In mV at 37 °C |\n| Potassium | 61.5 x log (5 / 140) = **−89 mV** | Near the resting voltage |\n| Sodium | 61.5 x log (145 / 15) = **+61 mV** | Where firing heads |\n| High blood potassium | 10 mM outside: **−70 mV** | Closer to threshold |\n| Doubling the ratio | 61.5 x log 2 = **18.5 mV** | The same step each time |\n| Still standing | Goldman equation, pumps | All ions, kept charged by ATP |\n| Big Idea 7 at Level 3 | internal resistance, Nernst, Nernst | What sets a real voltage |\n\n**The one line to remember:** a nerve cell is a battery made of ion ratios -- and the same equation that fades a battery sets the voltage in every one of your nerves.\n\n**Big Idea 7 is complete at Level 3.**"
        }
    };
}
