import { DialogNode } from '../../types';

export function getC39Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In **P39** you built logic out of switches. A phone chip has about **15 billion** of them, and each one flips on and off billions of times every second.\n\nNo switch with moving parts could survive that. So these switches have **no moving parts at all** -- they are made from a special material instead.\n\nWhat kind of material would make a good switch?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'middle', label: "One that can be told when to let electricity through and when to block it.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'metal', label: "Metal, because metal carries electricity really well.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Metal is a brilliant **conductor** -- but that is exactly the problem. Metal **always** lets electricity through. You can never switch it off.\n\nRubber has the opposite problem. It is an **insulator**, so it **never** lets electricity through. You can never switch it on.\n\nA switch has to do **both**. So engineers needed a material that sits in the middle -- one that blocks electricity most of the time, but lets it through when you tell it to.",
            options: [
                { id: 'cont', label: "So we need something between metal and rubber?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Materials come in three families:\n\n1. **Conductors** (copper, gold) -- **always** let electricity through\n2. **Insulators** (rubber, glass) -- **never** let electricity through\n3. **Semiconductors** (**silicon**) -- let it through **only when you tell them to**\n\nThat third family is the whole secret. Silicon is made from ordinary sand, and on its own it barely conducts at all. But send a tiny **control signal** to it, and it opens up and lets electricity flow. Take the signal away, and it closes again.\n\nA silicon switch like this is called a **transistor**. Nothing moves, nothing wears out, and it can flip billions of times a second.\n\nSlide the **Control Signal** and watch which materials let electricity through!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try the control signal!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** An engineer tries to build a logic gate out of **copper wire** instead of silicon.\n\nWhat goes wrong?",
            options: [
                { id: 'right', label: "Copper always conducts, so the gate is stuck permanently on -- it can never say \"no\".", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Copper is too expensive, so the chip would just cost too much to build.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Cost is not the problem here -- the **physics** is.\n\nRemember from **P39** that every logic gate has to be able to answer **on** or **off**. A gate that can only ever say \"on\" is not a gate at all; it is just a wire.\n\nCopper is a **conductor**, so electricity always flows through it. There is no way to tell it to stop. The gate would be stuck saying \"yes\" to everything, and the computer could never make a single decision.\n\nSilicon works because it can do both jobs: block by default, conduct when told.",
            options: [
                { id: 'retry', label: "Oh -- a switch that is always on is not a switch!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **A switch has to be able to say no as well as yes.**\n\n- **Conductors** always conduct -- stuck on\n- **Insulators** never conduct -- stuck off\n- **Semiconductors** do both -- that is what makes them useful\n\nThis is why silicon runs the digital world. A **transistor** is just a tiny silicon switch, and a phone chip packs about **15 billion** of them into a piece smaller than your fingernail.\n\nAnd it connects straight back to **P39**: those transistors are the physical switches inside every **AND**, **OR**, and **NOT** gate you built.\n\nBut your brain makes decisions too, with no silicon anywhere. How? That is B39!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Silicon can say yes AND no -- that is the trick!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the material behind every computer!**\n\n- **Conductors** (copper) always let electricity through\n- **Insulators** (rubber) never let electricity through\n- **Semiconductors** (**silicon**) let it through only when told\n- A small **control signal** opens or closes the path\n- A silicon switch is called a **transistor** -- no moving parts, never wears out\n- A phone chip holds about **15 billion** of them\n\nNext in B39: how your brain decides without any silicon at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Silicon is the in-between material!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C39 Complete -- The Magic Middle!**\n\nComputers exist because one material refused to be either a conductor or an insulator.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Copper always conducts | It is a **conductor** | Stuck on -- cannot be a switch |\n| Rubber never conducts | It is an **insulator** | Stuck off -- cannot be a switch |\n| Silicon does both | It is a **semiconductor** | A **control signal** decides |\n| Silicon switches have no moving parts | The **transistor** | Billions of flips a second, no wear |\n\n**Up next:** B39 (Brain Circuits) -- decisions without a single transistor!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
