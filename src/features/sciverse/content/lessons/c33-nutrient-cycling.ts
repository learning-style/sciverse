import { DialogNode } from '../../types';

export function getC33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Earth has never had a delivery of new **atoms**. Not one. Every atom of **carbon** in your body has been here for billions of years, and some of it was probably once part of a dinosaur, a tree, or the ocean.\n\nIn P33 you learned that energy runs out at every step. So how do the *materials* keep going?\n\nWhat do you think happens to the atoms in a fallen leaf?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'reused', label: "Tiny living things break the leaf apart and release its atoms so new plants can use them again.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'vanish', label: "The leaf slowly disappears -- its atoms get used up and are gone for good.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It really looks like the leaf vanishes! But atoms can never be destroyed -- they only get **rearranged**.\n\nWhen a leaf rots, **decomposers** (bacteria and fungi) take it apart molecule by molecule. The **carbon** floats away as carbon dioxide gas. The **nitrogen** soaks into the soil as a plant nutrient. Nothing disappears -- it just moves to a new address.\n\nThis is the huge difference between energy and matter: **energy flows through** an ecosystem and leaves as heat, but **matter cycles around** forever.",
            options: [
                { id: 'cont', label: "So the atoms move to a new place instead of disappearing?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! This never-ending loop is called the **carbon cycle**, and it has four stops:\n\n1. **Plants** pull carbon dioxide out of the air and build it into leaves and wood\n2. **Animals** eat the plants and breathe some carbon back out\n3. **Decomposers** break down dead leaves, wood, and animals\n4. Carbon returns to the **air and soil** -- ready for a plant to grab again\n\nThe same story happens with **nitrogen**, which plants need to grow, and with water. Scientists call these **nutrient cycles**.\n\nMove the **Decomposer Activity** slider and watch how fast the loop spins!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change the decomposers and watch the cycle!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Imagine every **decomposer** on Earth suddenly stopped working -- no bacteria, no fungi, nothing to break things down.\n\nWhat would happen to the forest?",
            options: [
                { id: 'right', label: "Dead leaves and wood would pile up, and plants would starve because their nutrients stay locked inside the pile.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing much -- plants make their own food from sunlight, so they do not need decomposers.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Plants do make their own **sugar** from sunlight -- but sugar is not enough to build a plant!\n\nTo grow leaves and roots, a plant also needs **nitrogen**, phosphorus, and other **nutrients** from the soil. There is only a limited supply, and nearly all of it is currently locked up inside living and dead things.\n\nWithout **decomposers** to unlock it, dead material would pile higher and higher while the soil went empty. The forest would be buried in leaves and starving at the same time.",
            options: [
                { id: 'retry', label: "Oh -- decomposers are what unlock the nutrients for reuse!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Decomposers are nature's recycling crew** -- the unglamorous job that keeps everything else alive.\n\nHere is the big pattern connecting both lessons:\n- **P33:** **energy** flows in one direction and leaves as heat -- so sunlight must arrive every single day\n- **C33:** **matter** goes in circles -- the same atoms are used over and over\n\nNext, in B33, you will meet the living communities that run these cycles, and see what humans get for free when they work!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Energy flows through, but matter goes in circles!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered nature's recycling system!**\n\n- **Atoms are never destroyed** -- only rearranged\n- The **carbon cycle** moves carbon from air, to plants, to animals, and back\n- **Decomposers** unlock nutrients from dead material\n- **Nutrient cycles** also move nitrogen, phosphorus, and water\n- **Energy flows through** an ecosystem; **matter cycles within** it\n\nNext in B33: what these cycles quietly do for people every day!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The same atoms get reused forever!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C33 Complete -- Nature's Recycling Loop!**\n\nEarth never gets new atoms, so every ecosystem must reuse the ones it has.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Atoms are never destroyed | Matter is only **rearranged** | Nothing truly disappears |\n| Carbon loops air to plant to animal | The **carbon cycle** | Keeps air and life balanced |\n| Decomposers unlock nutrients | Bacteria and fungi recycle | Soil stays fertile |\n| Energy leaves, matter stays | Flow versus **cycle** | Sun must resupply daily |\n\n**Up next:** B33 (Nature's Free Gifts) -- the work healthy ecosystems do for people for free!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
