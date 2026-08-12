import { DialogNode } from '../../types';

export function getC39Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In **P39** you built logic out of switches. A modern phone chip has about **15 billion** of them, and each one flips on and off billions of times a second.\n\nNo mechanical switch could survive that. So these switches have **no moving parts at all**.\n\nWhat kind of material could switch between blocking and carrying electricity, without anything moving?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'semi', label: "A material sitting between a conductor and an insulator, which can be pushed either way by a small electrical nudge.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'metal', label: "A very thin metal that heats up and cools down fast enough to start and stop the current.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Heating and cooling is far too slow -- and metal has a bigger problem: it **always** conducts. You cannot switch it off.\n\nThe answer is a third category of material called a **semiconductor**, and **silicon** is the famous one. On its own, silicon is a poor conductor -- almost, but not quite, an insulator. It sits right in the middle.\n\nAnd that middle position is exactly what makes it useful. A tiny electrical nudge can push it into conducting well, and removing the nudge pushes it straight back to blocking. No heat, no movement, no wear -- and it can happen billions of times a second.",
            options: [
                { id: 'cont', label: "So being in the middle is what makes it switchable?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Materials come in three electrical families:\n\n1. **Conductors** (copper, gold) -- **electrons** roam freely, always conducting\n2. **Insulators** (rubber, glass) -- electrons are locked tight, never conducting\n3. **Semiconductors** (**silicon**) -- barely conducting, and **controllable**\n\nThen chemistry adds the real trick: **doping**. Engineers mix in a whisper of another element -- roughly **one atom in a million**:\n\n- Add phosphorus, and you get spare **electrons** -- this is called **n-type** silicon\n- Add boron, and you get **holes** where electrons are missing -- **p-type** silicon\n\nSandwich n-type and p-type together and you have a **transistor**: a switch with no moving parts, controlled by a tiny voltage on a third contact.\n\nSlide **Doping Amount** and watch silicon change from blocker to conductor!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me dope the silicon and watch it change!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Chip factories are cleaner than hospital operating theatres. Workers wear full body suits, and the air is filtered thousands of times over.\n\nWhy does making silicon chips demand such extreme cleanliness?",
            options: [
                { id: 'right', label: "Doping works at about one added atom per million, so a single speck of dust holds enough stray atoms to ruin the chip.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Dust would scratch the delicate surface of the silicon wafer.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Scratches would be bad, but the real danger is **chemical**, not physical.\n\nRemember how precise **doping** is: about **one deliberate atom in a million**. That is the entire recipe. Now consider a speck of dust so small you cannot see it -- it contains **billions** of atoms of whatever it happens to be made of.\n\nIf that speck lands on a wafer, its atoms swamp the careful doping in that area. Transistors there conduct when they should block, or block when they should conduct. The chip is scrap.\n\nModern transistors are only a few dozen atoms wide, so a single misplaced atom in the wrong spot genuinely matters. That is why chip fabs are the cleanest rooms humans have ever built.",
            options: [
                { id: 'retry', label: "Oh -- one dust speck has billions of wrong atoms!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **The whole digital world rests on controlling atoms one in a million at a time.**\n\n- **Semiconductors** sit between conductors and insulators\n- **Doping** adds about 1 atom per million to make **n-type** or **p-type** silicon\n- Joining them makes a **transistor** -- a switch with no moving parts\n- A phone chip holds roughly **15 billion** transistors\n- Purity is everything, so chips are built in ultra-clean rooms\n\nAnd this connects straight back to **P39**: those transistors are the physical switches inside every **AND**, **OR**, and **NOT** gate.\n\nBut your brain makes decisions too, without a single transistor. How? That is B39!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One atom in a million controls everything!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the material behind every computer!**\n\n- **Conductors** always carry current; **insulators** never do\n- **Semiconductors** like **silicon** sit in the middle and can be controlled\n- **Doping** adds about 1 atom per million to create **n-type** or **p-type**\n- Joining n-type and p-type builds a **transistor** -- a switch with no moving parts\n- Transistors switch billions of times a second and never wear out\n- A single dust speck can ruin a chip, so fabs are extraordinarily clean\n\nNext in B39: how your brain decides without any transistors at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Silicon is the magic middle material!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C39 Complete -- The Magic Middle!**\n\nComputers exist because one material refused to be either a conductor or an insulator.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Silicon sits in the middle | It is a **semiconductor** | Can be switched, unlike metal |\n| Add 1 atom per million | **Doping** makes n-type and p-type | Chemistry sets the behaviour |\n| n plus p makes a switch | The **transistor** | No moving parts, never wears out |\n| Purity is everything | One dust speck ruins a chip | Cleanest rooms ever built |\n\n**Up next:** B39 (Brain Circuits) -- decisions without a single transistor!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
