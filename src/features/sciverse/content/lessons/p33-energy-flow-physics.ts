import { DialogNode } from '../../types';

export function getP33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Every living thing on Earth is running on sunlight. Plants catch it, and everything else depends on those plants.\n\nHere is the puzzle: one meadow can feed **thousands** of grasshoppers, but those grasshoppers only feed a **handful** of birds. And those birds might feed just **one** hawk.\n\nWhat do you think happens to the Sun's **energy** as it moves up the food chain?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'shrinks', label: "Most of the energy gets used up at every step, so only a little is left for the next eater.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'same', label: "The energy stays the same -- it just gets passed along like a baton in a race.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is a smart guess, but energy is not passed along like a baton -- it **leaks out** at every step!\n\nA grasshopper does not turn all the grass it eats into more grasshopper. It spends most of that energy hopping around, staying warm, and breathing. That energy escapes into the air as **heat**, and heat cannot be eaten.\n\nScientists measured it: only about **10 out of every 100 units** of energy makes it to the next level. Everything else is spent on just staying alive.",
            options: [
                { id: 'cont', label: "So each step only keeps a small piece of the energy?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! This is called the **energy pyramid**, and each step up is called a **trophic level**:\n\n1. **Producers** (grass, trees) -- catch sunlight and make food\n2. **Plant eaters** (rabbits, deer) -- keep about **10%** of the grass energy\n3. **Predators** (foxes, hawks) -- keep about 10% of *that*\n4. **Top predators** (eagles) -- get the tiniest slice of all\n\nThat is why you see **thousands** of blades of grass, **hundreds** of rabbits, but only **one or two** hawks in the same field. There simply is not enough energy left at the top.\n\nDrag the **Food Chain Steps** slider to watch the energy shrink step by step!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try the slider and see the energy shrink!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Rangers are counting the animals living in one big meadow. The meadow has **mice**, which eat seeds and grass, and **owls**, which hunt the mice.\n\nWhich will the rangers find far more of?",
            options: [
                { id: 'right', label: "Mice -- they are one step closer to the plants, so far more of the Sun's energy reaches them.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About the same number of each, since they both live in the same meadow.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "They share one meadow, but they do **not** share the energy equally!\n\nThe mice are one step above the grass, so they receive about **10%** of the meadow's energy. The owls are one step above the mice, so they receive about 10% of *that* -- only **1%** of what the meadow started with.\n\nThat is why a meadow might hold **thousands** of mice but only **one or two** owls. Each step up the ladder supports far fewer animals.",
            options: [
                { id: 'retry', label: "Oh -- each step up leaves only a tenth of the energy!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Every step up the ladder supports far fewer animals.**\n\nThis one rule explains so much about our world:\n- Why there are always more plants than plant eaters\n- Why big hunters need **huge** territories to survive\n- Why removing plants at the bottom hurts every animal above\n\nEvery living thing in an **ecosystem** is standing on a pyramid of sunlight. Coming up in C33, you will see how the *materials* in that pyramid -- unlike the energy -- get used again and again forever!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Fewer steps means more energy left over!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how energy flows through nature!**\n\n- All ecosystem energy starts as **sunlight**\n- **Producers** (plants) catch it first\n- Only about **10%** passes to each next **trophic level**\n- The other 90% escapes as **heat** from living, moving, and breathing\n- That is why the **energy pyramid** has a wide bottom and a tiny top\n- **Short food chains** support far more living things\n\nNext in C33: energy runs out, but atoms never do -- see how nature recycles!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Energy shrinks at every step of the food chain!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P33 Complete -- The Energy Ladder!**\n\nEvery ecosystem runs on sunlight, and every step up the ladder loses most of it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Energy starts at the Sun | **Producers** capture sunlight | Plants feed everything else |\n| Each step keeps only 10% | The **energy pyramid** | Few big hunters can exist |\n| The other 90% becomes heat | Energy leaks, it does not loop | Energy must be resupplied daily |\n| Short chains waste less | Fewer steps, less loss | More animals can be supported |\n\n**Up next:** C33 (Nature's Recycling Loop) -- why atoms get reused forever even though energy does not!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
