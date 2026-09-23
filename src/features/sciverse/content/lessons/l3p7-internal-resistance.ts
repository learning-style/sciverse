import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 7, physics.
 *
 * L2P7 treated a battery as a fixed voltage. This removes that simplification:
 * a real battery is an emf in series with an internal resistance, so
 * I = emf / (R + r) and terminal voltage V = emf - I r. Worked by hand from two
 * meter readings (finding r, then emf), then a short circuit (10 A, not
 * infinite), then L2P7's parallel bulbs dimming slightly.
 *
 * Condition stated where used: r treated as fixed. The simplification still
 * standing: r changes with temperature and charge, and the emf itself fades as
 * the battery runs down -- which is L3C7.
 */
export function getL3P7Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P7 treated a battery as a fixed push: 3.0 V, whatever it was connected to. Try that with a real battery and a voltmeter, and something changes.\n\nConnect one bulb, and the meter across the battery reads about **2.86 V**. Add a second bulb in parallel, and it drops to about **2.73 V**. Connect a thick wire straight across the battery, and the meter reads almost **0 V** -- and the battery gets hot.\n\nThe chemicals inside cannot have changed in those few seconds.\n\nThe dial under the picture is labelled **internal resistance**: resistance inside the battery itself rather than out in the bulb, measured in **ohms (Ω)** like any other resistance.\n\nSo why does the battery's voltage fall the more current it has to drive?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Some of the battery's push is spent driving current through the battery itself. It has resistance inside it, and more current loses more volts in there.", nextNodeId: 'emf', sentiment: 'positive' },
                { id: 'bad', label: "The bulbs drain voltage out of the battery, and more bulbs drain more, like emptying a tank faster.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Voltage is not a substance that bulbs drain. L2P7 defined it as the **energy given to each coulomb**, and the battery's chemistry gives each coulomb the same energy whatever it is connected to.\n\nWhat changes is **where that energy is spent**. The current does not flow only through the bulbs. It also has to flow through the battery itself -- through its paste and electrodes, where L2C7's ions are moving. That path has resistance too.\n\nThe more current flows, the more of each coulomb's energy is spent just getting through the battery, and the less is left for the circuit outside.",
            options: [
                { id: 'cont', label: "How do I put numbers on that?", nextNodeId: 'emf' }
            ]
        },
        emf: {
            id: 'emf',
            speaker: 'AI',
            content: "Two ideas replace L2P7's fixed battery.\n\n**Electromotive force**, usually shortened to **emf** and written **ε** (the Greek letter epsilon), is the energy the chemistry gives each coulomb, in volts. It is the voltage you would measure if **no current** flowed at all. Despite its name, it is not a force -- it is a voltage.\n\n**Internal resistance**, written **r**, is the resistance of the battery's own insides, in ohms.\n\nThe current flows through the outside circuit, **R**, and through the inside, **r**, one after the other -- in series. From L2P7, series resistances add:\n\n**I = ε / (R + r)**\n\nThe voltage **lost** inside the battery is **I x r** -- L2P7's V = I x R, used on the inside. What is left across the battery's terminals, the **terminal voltage**, is:\n\n**V = ε − I x r**\n\nRead it in words: **the more current you draw, the more volts are lost inside, and the lower the terminal voltage.**\n\nThe condition belongs here. **This treats r as fixed.** A real battery's internal resistance rises when it is cold -- C37 found cold batteries weak -- and as it runs down.",
            options: [
                { id: 'cont', label: "How can I find ε and r for a real battery?", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "You cannot see ε or r directly. But two meter readings are enough to find both -- by hand.\n\nA single AA battery is connected to two different loads in turn:\n\n| Reading | Current I | Terminal voltage V |\n| --- | --- | --- |\n| 1 | 0.20 A | 1.47 V |\n| 2 | 1.00 A | 1.35 V |\n\n**Step 1: r from the change.** Drawing 0.80 A more current cost 1.47 − 1.35 = 0.12 V more. Each extra amp loses r volts inside, so:\n\nr = 0.12 / 0.80 = **0.15 Ω**\n\n**Step 2: ε from either reading.** Add back the volts that were lost:\n\nε = V + I x r = 1.47 + 0.20 x 0.15 = 1.47 + 0.03 = **1.50 V**\n\nCheck it with the other reading: 1.35 + 1.00 x 0.15 = **1.50 V**. They agree.\n\nNow push to the extreme. Connect a wire with almost no resistance straight across the battery, so R ≈ 0:\n\nI = 1.50 / (0 + 0.15) = **10 A**, and terminal voltage = 1.50 − 10 x 0.15 = **0 V**\n\nAll 1.50 V is lost inside. The battery turns 1.50 x 10 = **15 W** into heat within itself -- which is why a shorted battery gets dangerously hot.",
            options: [
                { id: 'cont', label: "Now redo L2P7's bulbs with a real battery.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Take two AA cells in series: **ε = 3.0 V** and **r = 0.30 Ω**. Each bulb is **6 Ω**, as in L2P7.\n\nTwo 6 Ω bulbs in parallel carry twice the current of one at any voltage, so together they behave like **3 Ω**. Three behave like **2 Ω**.\n\n| Bulbs in parallel | Outside R | I = ε / (R + r) | Terminal V = ε − I r | Energy each second in each bulb |\n| --- | --- | --- | --- | --- |\n| 1 | 6 Ω | 3.0 / 6.3 = 0.476 A | 2.86 V | 2.86 x 0.476 = **1.36 W** |\n| 2 | 3 Ω | 3.0 / 3.3 = 0.909 A | 2.73 V | 2.73 x 0.455 = **1.24 W** |\n| 3 | 2 Ω | 3.0 / 2.3 = 1.304 A | 2.61 V | 2.61 x 0.435 = **1.13 W** |\n\n(For each bulb: its current is the terminal voltage divided by 6 Ω.)\n\nL2P7 said each parallel bulb gets the battery's full push. With a real battery, each extra bulb draws more current, loses more volts inside, and **every** bulb dims a little: about 9% dimmer with two, 17% with three.\n\nThat is also why a car's headlights dip for a moment when it starts: the starter motor draws a huge current.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A car battery has **ε = 12.6 V** and **r = 0.020 Ω**. Starting the engine, the starter motor draws **150 A**.\n\nWhat is the battery's terminal voltage while the engine is being started?",
            options: [
                { id: 'right', label: "9.6 V. The volts lost inside are 150 x 0.020 = 3.0 V, and 12.6 − 3.0 = 9.6 V.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ignore', label: "12.6 V, because the battery's voltage is 12.6 V.", nextNodeId: 'math_wrong' },
                { id: 'lost', label: "3.0 V, because 150 x 0.020 = 3.0 V.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**12.6 V** is the **emf** -- the voltage with no current flowing. This battery is driving 150 A, and every one of those amps loses volts on the way through the battery.\n\n**3.0 V** is the voltage **lost** inside, I x r. It is not what is left. The terminal voltage is the emf **minus** what is lost.\n\nV = ε − I x r = 12.6 − 150 x 0.020 = 12.6 − 3.0 = **9.6 V**\n\nThe headlights, wired to the same battery, suddenly have 9.6 V instead of 12.6 V -- and they dim.",
            options: [
                { id: 'retry', label: "The emf minus the volts lost inside.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a battery with **ε = 1.50 V**.\n\n**Load Resistance** is the resistance of the outside circuit, R, in ohms. **Internal Resistance** is the battery's own r, in ohms.\n\nThe lab works out the current, the volts lost inside, the terminal voltage, and the energy each second delivered to the load and wasted inside the battery.\n\nTry this:\n\n- Set **Internal Resistance** to **0.15 Ω**. Slide **Load Resistance** from 20 Ω down towards 0, and watch the terminal voltage fall\n- Find the load where the terminal voltage is exactly **half** the emf. It is where R equals r -- and it is also where the load gets the **most** energy each second\n- Raise **Internal Resistance**, as in a cold battery, and watch the same load get less",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "More current, more volts lost inside. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A student says: \"A thick wire has almost zero resistance. From L2P7, I = V / R, so connecting it straight across a battery must give an almost infinite current.\"\n\nUsing **ε = 1.50 V** and **r = 0.15 Ω**, what really happens?",
            options: [
                { id: 'right', label: "The current is limited by the internal resistance: 1.50 / (0 + 0.15) = 10 A. The terminal voltage falls to zero, and the battery heats itself at 15 W.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The student is right: with R = 0, I = 1.50 / 0 is enormous, thousands of amps or more.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "L2P7's I = V / R left out the resistance **inside** the battery. The current has to pass through both the wire and the battery, in series:\n\nI = ε / (R + r) = 1.50 / (0 + 0.15) = **10 A**\n\n| Outside R | Total resistance | Current | Terminal voltage | Wasted inside, I x I x r |\n| --- | --- | --- | --- | --- |\n| 6 Ω | 6.15 Ω | 0.24 A | 1.46 V | 0.009 W |\n| 0.15 Ω | 0.30 Ω | 5.0 A | 0.75 V | 3.75 W |\n| 0 Ω | 0.15 Ω | **10 A** | **0 V** | **15 W** |\n\nThe current is large, not infinite. But 10 A is far more than an AA battery is built for, and 15 W of heat inside something that small is dangerous.",
            options: [
                { id: 'retry', label: "The internal resistance limits the current.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A battery's internal resistance limits its current, and sets how far its terminal voltage sags.**\n\nHere is the simplification this lesson removed. **L2P7 treated a battery as a fixed voltage.** A real battery is a fixed **emf** in series with an **internal resistance**. That explains the dimming of parallel bulbs, the dip in a car's headlights, and why a shorted battery gets hot.\n\nAnd the simplifications still standing. **r is not really fixed**: it rises in the cold and as the battery ages. And the emf itself is not fixed either. As a battery runs down, its chemistry changes, and so does the energy it gives each coulomb. L3C7 finds the rule for that.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "An emf in series with an internal resistance!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why batteries sag.**\n\n- The **emf (ε)** is the energy the chemistry gives each coulomb: the voltage with no current\n- The **internal resistance (r)** is the resistance of the battery's own insides\n- Outside and inside are in series: **I = ε / (R + r)**\n- Volts lost inside: **I x r**; **terminal voltage V = ε − I x r**\n- Two readings find both: 0.12 V lost for 0.80 A more gives **r = 0.15 Ω**, then **ε = 1.50 V**\n- A short circuit gives **10 A** and **0 V**, not infinite current -- and **15 W** of heat inside\n- Real batteries dim parallel bulbs: **1.36 W**, then **1.24 W**, then **1.13 W** each\n- A starting car: 12.6 − 150 x 0.020 = **9.6 V**\n- The terminal voltage is half the emf, and the load gets the most energy each second, when **R = r**\n- Still standing: r changes with temperature and age, and the emf fades as a battery runs down",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "V = ε − I x r!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why a Battery Sags Under Load!**\n\nL2P7 used a battery of fixed voltage. Level 3 looks inside it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| emf | ε, volts with no current | The chemistry's push |\n| Internal resistance | r, in ohms | The battery's own insides |\n| Current | **I = ε / (R + r)** | Inside and outside in series |\n| Terminal voltage | **V = ε − I x r** | Sags as current rises |\n| Two readings | r = 0.12 / 0.80 = **0.15 Ω** | Then ε = 1.50 V |\n| Short circuit | 1.50 / 0.15 = **10 A** | 0 V outside, 15 W inside |\n| Parallel bulbs | 1.36, 1.24, 1.13 W | Each extra bulb dims them all |\n| Starting a car | 12.6 − 3.0 = **9.6 V** | Headlights dip |\n| Still standing | r and ε change | L3C7 follows the emf |\n\n**The one line to remember:** a real battery is an emf with a resistance inside it -- so the harder you work it, the more of its push is lost before it ever leaves.\n\n**Up next:** C7 -- why a battery's emf fades as it runs down."
        }
    };
}
