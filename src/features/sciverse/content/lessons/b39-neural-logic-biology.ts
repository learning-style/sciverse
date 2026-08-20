import { DialogNode } from '../../types';

export function getB39Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Your brain holds about **86 billion** **neurons**, and it runs on roughly **20 watts** -- less power than a light bulb. A computer doing anything close to what your brain does would need a small power station.\n\nAnd here is the surprise: like the transistors in **C39**, a single neuron only ever gives one of two answers.\n\nWhat do you think a neuron does when it receives signals?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'threshold', label: "It adds up everything coming in, and fires a signal only if the total crosses a certain level.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'passes', label: "It passes every signal it receives straight along to the next neuron.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "If neurons just passed signals along, your brain would be a tangle of wire with no ability to decide anything!\n\nWhat a **neuron** actually does is **add up votes**. It receives signals from hundreds or thousands of other neurons at once. Some say \"fire!\" and others say \"do not fire!\"\n\nThe neuron sums them. If the total pushes past a certain level -- the **threshold** -- it fires a full signal down its length. If the total falls short, it stays completely silent.\n\nAnd it is genuinely all-or-nothing. There is no half-strength firing. Just like the **binary** switches in **P39**.",
            options: [
                { id: 'cont', label: "So a neuron adds up votes and fires only past a threshold?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Here is how a neuron decides:\n\n1. **Dendrites** collect incoming signals from many other neurons\n2. Some signals are **excitatory** (\"fire!\") and some are **inhibitory** (\"stay quiet!\")\n3. The cell body **adds them all together**\n4. If the total crosses the **threshold**, the neuron fires -- fully, every time\n5. The signal travels the **axon** to the next neurons, and the voting starts again\n\nNotice this is a natural **AND** gate: a neuron that needs three separate inputs before it fires will only respond when input A **and** B **and** C all arrive.\n\nBut brains have something silicon does not. A **synapse** -- the junction between two neurons -- can grow **stronger with use**. That is **learning**, and it is why practising something makes it easier.\n\nSlide **Signal Strength** and see if you can make the neuron fire!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try to reach the threshold!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A computer chip switches about **a billion times a second**. A neuron manages only about **200 times a second** -- five million times slower.\n\nSo why is your brain still far better than any computer at recognising a friend's face in a crowd?",
            options: [
                { id: 'right', label: "Neurons all work at the same time, and each one connects to thousands of others, so slow parts working together beat fast parts working in turn.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Brains must have a completely different kind of logic that computers do not have.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The logic is remarkably similar -- add up inputs, compare to a threshold, output on or off. The difference is the **wiring pattern**.\n\nA computer is fast but mostly does one thing at a time, extremely quickly, in a line. Your brain is slow but runs **86 billion neurons all at once**, and each neuron connects to thousands of others -- around **100 trillion** connections in total.\n\nWhen you spot a friend's face, millions of neurons evaluate shape, colour, and movement **simultaneously** and reach an answer in a fraction of a second. A computer stepping through those comparisons one at a time cannot keep up, even at a billion steps per second.\n\nThis is exactly why modern AI chips are built with thousands of small processors working in **parallel**. Engineers copied the brain again.",
            options: [
                { id: 'retry', label: "Oh -- massive parallel wiring beats raw speed!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Wiring matters as much as speed.**\n\nAll of Big Idea 39 comes together here:\n- **P39** -- **binary** on/off states and **logic gates** (AND, OR, NOT) make decisions reliable\n- **C39** -- **silicon** is the in-between material that can block or conduct on command, making a **transistor**\n- **B39** -- **neurons** do the same all-or-nothing switching, but wired 100 trillion ways in **parallel**, and they can **learn**\n\nComputers win on speed. Brains win on connections, learning, and energy -- 20 watts against a power station.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Brains and chips both switch -- but wire up differently!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how brains make decisions!**\n\n- A **neuron** adds up **excitatory** and **inhibitory** signals\n- It fires only if the total crosses the **threshold** -- all or nothing, like **binary**\n- **Dendrites** collect signals; the **axon** carries the output away\n- A neuron needing several inputs acts like a natural **AND** gate\n- **Synapses** strengthen with use -- that is **learning**\n- 86 billion slow neurons working in **parallel** beat one fast processor\n\nP39 built the logic, C39 built the switch, and B39 showed your brain doing both -- on 20 watts!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "My brain is 86 billion switches that learn!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 39 -- B39 Complete!**\n\nBrain Circuits -- How Do Computers Use Logic to Solve Problems?\n\nBrains and computers reached the same answer: build everything from switches that say yes or no.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Neurons add up votes | Fire only past the **threshold** | All-or-nothing, like binary |\n| Inputs push both ways | **Excitatory** and **inhibitory** | Real decisions need both |\n| Synapses strengthen with use | This is **learning** | Chips cannot rewire themselves |\n| 86 billion work at once | **Parallel** beats fast | Face recognition in an instant |\n\n**Big Idea 39 connections:**\n- P39 (On, Off, Answer) showed how **binary** switches and **logic gates** build reliable decisions\n- C39 (The Magic Middle) showed how **silicon** can block or conduct on command, making a **transistor** with no moving parts\n- B39 (Brain Circuits) showed how **neurons** use the same all-or-nothing switching, wired 100 trillion ways in parallel -- and unlike a chip, they learn!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
