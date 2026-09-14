import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P7 "Circuits & Current".
 *
 * P7 found series bulbs dim and parallel bulbs bright, and said the energy was
 * "shared". This lesson puts numbers on it: charge, current, voltage and
 * resistance, then I = V / R and energy each second = volts x amps. A series
 * bulb gets a quarter, not a half, because the voltage and the current both
 * halve. The checkpoint shows parallel's hidden cost: the battery supplies the
 * sum of the branch currents.
 *
 * Conditions stated where used: Ohm's law needs a steady resistance, so each
 * lit bulb is given its hot resistance, kept fixed. Current is counted from +
 * to -, the opposite way to P7's electrons.
 */
export function getL2P7Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P7 you built circuits. One bulb glowed brightly. Add a second bulb in **series** -- one after the other, on a single path -- and both went **dim**.\n\nP7 said the battery's energy was **shared** between the bulbs. Two bulbs sharing equally should each give off **half** as much light as one bulb.\n\nHere is the surprise. Measure how much energy each series bulb turns into light and heat every second, and it is only about **a quarter** of what the single bulb managed.\n\nWhy a quarter, and not a half?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Because two things drop at once. Each bulb gets only half the battery's push, and the extra resistance also halves how much electricity flows. Half of a half is a quarter.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It should be a half. Two bulbs share the energy equally, so a quarter must be a measuring mistake.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Sharing equally is part of the story, and it is the part that gives a half. But it quietly assumes the battery sends out **the same energy each second** as it did with one bulb. It does not.\n\nA second bulb makes the whole loop harder to push through. So **less electricity flows**, and the battery sends out less energy each second in total.\n\nTwo halvings happen together:\n\n- each bulb gets **half the push** of the battery\n- the flow around the loop is **halved**\n\nHalf of a half is a quarter. To see exactly why, you need names and units for the push, the flow, and how hard it is to push.",
            options: [
                { id: 'cont', label: "Give me the names and units.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Four quantities describe a circuit. Take them one at a time.\n\n**Charge** is what flows. It is measured in **coulombs (C)**. One coulomb is the charge of about **6.24 x 10¹⁸ electrons** -- written with L2C4's powers of ten.\n\n**Current**, written **I**, is how much charge flows past a point **each second**. It is measured in **amperes (A)**, usually called **amps**. 1 A means 1 coulomb every second.\n\n**Voltage**, written **V**, is the battery's push: the **energy it gives each coulomb** of charge. It is measured in **volts (V)**. 1 volt means 1 joule for every coulomb. An AA battery gives 1.5 J to each coulomb that passes through it.\n\n**Resistance**, written **R**, is how hard the circuit is to push charge through: **how many volts it takes to drive each amp**. It is measured in **ohms (Ω)**.\n\nAn analogy helps. Picture a pump lifting water up to a tank, and the water flowing back down through a pipe:\n\n- the **voltage** is how high the pump lifts the water\n- the **current** is how much water flows each second\n- the **resistance** is how narrow the pipe is\n\nOne frame of reference to settle. Scientists count current as flowing out of the battery's **+** end, round the loop, and back into its **−** end. P7's electrons actually move the other way round. The numbers come out the same either way.",
            options: [
                { id: 'cont', label: "How do the push, flow and resistance fit together?", nextNodeId: 'formula' }
            ]
        },
        formula: {
            id: 'formula',
            speaker: 'AI',
            content: "Resistance was defined as volts for each amp. As an equation:\n\n**R = V / I**, which rearranges to **V = I x R** and **I = V / R**\n\nThis is **Ohm's law**. Read **I = V / R** in words: **more push drives more current; more resistance allows less.**\n\nThe condition belongs here. **Ohm's law holds when the resistance stays the same.** A plain wire at a steady temperature obeys it. A bulb's thin filament does not quite: its resistance rises about ten times as it heats from cold to glowing. So in this lesson, each lit bulb is given its **hot** resistance, and that is kept fixed.\n\nTwo facts about series circuits, both from P7:\n\n- There is only one path, so the **same current** flows through every part -- no electrons are used up\n- Resistances in series **add**: two 6 Ω bulbs make 12 Ω\n\nAnd one fact about brightness. Volts are joules per coulomb, and amps are coulombs per second. Multiply them, and the coulombs cancel:\n\n**energy each second = volts x amps**\n\nin joules per second -- which L2B5 called **watts (W)**.",
            options: [
                { id: 'cont', label: "Work out one bulb and two.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "A **3.0 V** battery, and bulbs with a hot resistance of **6 Ω** each.\n\n**One bulb:**\n\n- current: I = V / R = 3.0 / 6 = **0.50 A**\n- energy each second: 3.0 V x 0.50 A = **1.5 W**\n\n**Two bulbs in series:**\n\n- total resistance: 6 + 6 = **12 Ω**\n- current: I = 3.0 / 12 = **0.25 A** -- halved\n- voltage across each bulb: V = I x R = 0.25 x 6 = **1.5 V** -- half the battery's push\n- energy each second in each bulb: 1.5 V x 0.25 A = **0.375 W**\n\nNow compare: 0.375 / 1.5 = **0.25**.\n\nEach series bulb gets **a quarter** of the energy each second that the single bulb did -- **half the voltage times half the current**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** P7's checkpoint put **three** bulbs in series. Use three of these 6 Ω bulbs on the same **3.0 V** battery.\n\nWhat current flows around the loop?",
            options: [
                { id: 'right', label: "About 0.17 A. The total resistance is 6 + 6 + 6 = 18 Ω, and I = 3.0 / 18 = 0.17 A.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "0.50 A, the same as with one bulb, because the battery always pushes out the same current.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "6 A, because 18 / 3.0 = 6.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.50 A** assumes the battery sets the **current**. It does not. It sets the **voltage** -- a push of 3.0 V. How much current that push drives depends on the resistance. Three bulbs in series make 18 Ω, three times as hard to push through, so a third of the current flows.\n\n**6 A** turned the formula upside down. More resistance must mean **less** current, but 18 / 3.0 gets bigger as the resistance grows. Current is **voltage divided by resistance**.\n\nI = V / R = 3.0 / 18 = **0.17 A**. Each bulb then has 1.0 V across it and 0.17 A through it: about 0.17 W, **a ninth** of the single bulb's 1.5 W.",
            options: [
                { id: 'retry', label: "Voltage divided by resistance.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Battery Voltage** is the battery's push, in volts. **Bulbs in Series** is how many 6 Ω bulbs share the single path.\n\nThe lab works out the total resistance, the current, the voltage across each bulb, and the energy each second in each bulb -- and draws each bulb's glow to match.\n\nTry this:\n\n- Set **Battery Voltage** to **3.0 V**. Go from 1 bulb to 2, then to 3. Watch the energy each second in each bulb fall to a quarter, then a ninth\n- With 2 bulbs, find the battery voltage that makes each one as bright as a single bulb at 3.0 V. It is **6.0 V** -- twice the push",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Half the voltage, half the current. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Now wire two 6 Ω bulbs in **parallel** on the **3.0 V** battery: two separate branches, with one bulb on each. P7 showed that each branch gets the battery's full push.\n\nHow much current does the **battery** have to supply?",
            options: [
                { id: 'right', label: "1.0 A. Each branch has the full 3.0 V across 6 Ω, so each carries 3.0 / 6 = 0.50 A -- and the battery supplies both: 0.50 + 0.50 = 1.0 A.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "0.25 A. Two bulbs make 12 Ω, so 3.0 / 12 = 0.25 A, the same as in series.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Adding resistances works when the charge must pass through **both** bulbs, one after the other -- in **series**. In parallel, each bit of charge passes through **one** bulb **or** the other.\n\nWork it out branch by branch:\n\n| | Voltage across | Current = V / R | Energy each second |\n| --- | --- | --- | --- |\n| Branch 1 | 3.0 V | 3.0 / 6 = 0.50 A | 1.5 W |\n| Branch 2 | 3.0 V | 3.0 / 6 = 0.50 A | 1.5 W |\n| Battery supplies | 3.0 V | 0.50 + 0.50 = **1.0 A** | **3.0 W** |\n\nThe branch currents **add** at the battery. Two bulbs in parallel draw **twice** the current of one.",
            options: [
                { id: 'retry', label: "Branch currents add at the battery.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **In parallel, every branch gets the full voltage, and the battery supplies the sum of the branch currents.**\n\nThat is the hidden cost of P7's smarter wiring. Each parallel bulb glows at full brightness, 1.5 W -- four times a series bulb. But the battery now delivers **3.0 W**, twice as much energy each second as it did for one bulb. **It runs flat twice as fast.**\n\nSo wiring is a trade-off:\n\n- **Series**: less current, dim bulbs, a long-lasting battery -- and one break stops everything\n- **Parallel**: full brightness and independent branches -- and a battery that empties faster\n\nThis lesson took the battery's 3.0 V as given. C7 asks where a battery's push comes from, and what sets its size.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Branches add their currents!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put numbers on P7's circuits.**\n\n- **Charge** is measured in **coulombs**: 1 C is about 6.24 x 10¹⁸ electrons\n- **Current (I)** is charge each second, in **amps (A)**\n- **Voltage (V)** is energy for each coulomb, in **volts**: 1 V = 1 J per C\n- **Resistance (R)** is volts for each amp, in **ohms (Ω)**\n- **Ohm's law**: **I = V / R**, when the resistance stays the same\n- Current is counted from + to −, the opposite way to the electrons\n- In series, the current is the same everywhere and resistances add\n- **Energy each second = volts x amps**, in watts\n- Two 6 Ω bulbs in series on 3.0 V: 0.25 A and 1.5 V each, so **a quarter** of one bulb's energy each second\n- Three in series: about 0.17 A, **a ninth** each\n- In parallel, each branch gets the full voltage and the branch currents **add**\n- Two parallel bulbs draw **1.0 A**, so the battery runs flat twice as fast",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "I = V / R!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Series Bulbs Glow at a Quarter!**\n\nP7 said series bulbs share the energy. Level 2 worked out exactly how much each one gets.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Current | charge each second, in A | 1 A = 1 C per second |\n| Voltage | energy for each coulomb, in V | 1 V = 1 J per C |\n| Resistance | volts for each amp, in Ω | How hard it is to push |\n| Ohm's law | **I = V / R** | Holds while R stays the same |\n| Energy each second | **volts x amps**, in W | How brightly a bulb glows |\n| Two in series | 1.5 V x 0.25 A = **0.375 W** | A quarter of one bulb |\n| Three in series | 3.0 / 18 = **0.17 A** | A ninth of one bulb |\n| Two in parallel | 0.50 + 0.50 = **1.0 A** | Bright bulbs, faster-emptying battery |\n\n**The one line to remember:** current is voltage divided by resistance -- so a series bulb loses twice over, with half the push and half the flow.\n\n**Up next:** C7 -- what sets the size of a battery's push."
        }
    };
}
