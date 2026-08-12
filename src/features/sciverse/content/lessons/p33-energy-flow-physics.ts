import { DialogNode } from '../../types';

export function getP33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Every bit of food you eat can be traced back to the **Sun**. Grass catches sunlight, a cow eats the grass, and people drink the cow's milk.\n\nHere is the puzzle: a field of grass can feed a whole herd of cows, but that herd only feeds a few families.\n\nWhat do you think happens to the Sun's **energy** as it moves up the food chain?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'shrinks', label: "Most of the energy gets used up at every step, so only a little is left for the next eater.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'same', label: "The energy stays the same -- it just gets passed along like a baton in a race.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is a smart guess, but energy is not passed along like a baton -- it **leaks out** at every step!\n\nA cow does not turn all its grass into beef. It uses most of that energy to walk around, stay warm, and breathe. That energy escapes into the air as **heat**, and heat cannot be eaten.\n\nScientists measured it: only about **10 out of every 100 units** of energy makes it to the next level. Everything else is spent on just staying alive.",
            options: [
                { id: 'cont', label: "So each step only keeps a small piece of the energy?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! This is called the **energy pyramid**, and each step up is called a **trophic level**:\n\n1. **Producers** (grass, trees) -- catch sunlight and make food\n2. **Plant eaters** (rabbits, cows) -- keep about **10%** of the grass energy\n3. **Meat eaters** (foxes, hawks) -- keep about 10% of *that*\n4. **Top hunters** (eagles, sharks) -- get the tiniest slice of all\n\nThat is why you see **thousands** of blades of grass, **hundreds** of rabbits, but only **one or two** hawks in the same field. There simply is not enough energy left at the top.\n\nDrag the **Food Chain Steps** slider to watch the energy shrink step by step!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try the slider and see the energy shrink!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A farmer has one field. She can either grow **beans** for people to eat, or grow **grass to feed cows** and sell beef.\n\nWhich choice feeds more people from that same field?",
            options: [
                { id: 'right', label: "Beans -- eating plants directly skips a step, so almost none of the Sun's energy is lost.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Beef -- meat has more energy packed into it, so it must feed more people.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A bite of beef *does* hold more energy than a bite of beans. But think about the whole field!\n\nThe cow must eat about **10 fields** worth of grass energy to make **1 field** worth of beef. Nine-tenths of the Sun's gift escapes as **heat** while the cow lives its life.\n\nWhen people eat the beans directly, they skip that leaky step. The same field can feed roughly **10 times** as many people.",
            options: [
                { id: 'retry', label: "Oh -- adding a step wastes 90% of the energy!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Shorter food chains waste less energy.**\n\nThis one rule explains so much about our world:\n- Why there are always more plants than plant eaters\n- Why big hunters need **huge** territories to survive\n- Why removing plants at the bottom hurts every animal above\n\nEvery living thing in an **ecosystem** is standing on a pyramid of sunlight. Coming up in C33, you will see how the *materials* in that pyramid -- unlike the energy -- get used again and again forever!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Fewer steps means more energy left over!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how energy flows through nature!**\n\n- All ecosystem energy starts as **sunlight**\n- **Producers** (plants) catch it first\n- Only about **10%** passes to each next **trophic level**\n- The other 90% escapes as **heat** from living, moving, and breathing\n- That is why the **energy pyramid** has a wide bottom and a tiny top\n- **Short food chains** feed far more living things\n\nNext in C33: energy runs out, but atoms never do -- see how nature recycles!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Energy shrinks at every step of the food chain!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P33 Complete -- The Energy Ladder!**\n\nEvery ecosystem runs on sunlight, and every step up the ladder loses most of it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Energy starts at the Sun | **Producers** capture sunlight | Plants feed everything else |\n| Each step keeps only 10% | The **energy pyramid** | Few big hunters can exist |\n| The other 90% becomes heat | Energy leaks, it does not loop | Energy must be resupplied daily |\n| Short chains waste less | Fewer steps, more food | One field feeds more people |\n\n**Up next:** C33 (Nature's Recycling Loop) -- why atoms get reused forever even though energy does not!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
