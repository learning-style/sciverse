import { DialogNode } from '../../types';

export function getC49Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Here is your bucket of rock from the mine. Grey, dusty, heavy, completely ordinary looking. Somewhere in it is **copper**.\n\nSo pick the copper out.\n\nGo on -- tip it on the table and find the shiny orange bits. Why can you not do it?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The metal is not sitting there in shiny lumps -- it is stuck to other stuff and spread all the way through the rock.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The copper is there in tiny shiny lumps, and you simply need a very fine sieve to catch them.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A sieve is a good thought, but it cannot work, because there is nothing loose in there to catch.\n\nIn almost all rock, the metal is **stuck to other things**. Very often it is stuck to **oxygen**, the same gas you are breathing right now.\n\nAnd here is the strange part. When metal joins onto oxygen, the result does not look remotely like metal. It is dull, hard and rocky. Shiny orange copper joined to invisible oxygen makes a dull greenish stone.\n\nSo you are not looking for hidden lumps of copper. There are no lumps. The copper is genuinely there, but it is **joined onto something else**, spread right through the rock.\n\nYou cannot sieve it out, any more than you can sieve the sugar back out of a cake.",
            options: [
                { id: 'cont', label: "So the metal is joined onto other stuff?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Getting metal out takes two steps.\n\n**Step 1: Crush and sort.** The rock is ground into powder, then washed and swirled with water. Most of the plain rock floats off, leaving a much richer powder behind.\n\n**Step 2: Heat with charcoal.** This is the clever one. **Charcoal** is burnt wood, and it is hungry for oxygen -- it grabs oxygen wherever it can find it.\n\nSo you heat the powder and the charcoal together in a furnace called a **smelter**. The charcoal seizes the oxygen and lets go of the metal. Liquid copper runs out of the bottom, glowing. The oxygen leaves with the charcoal as gas.\n\nBut how much rock you must crush and heat depends entirely on **how much metal is in it**. Rich rock gives you a spoonful of metal from a bucket or two. Poor rock might need a hundred buckets for that same spoonful -- every one of them dug, crushed, heated, and left behind as **waste**.\n\nIn the picture, buckets of rock go in and metal comes out.\n\nSlide **Metal in the Rock** and watch the waste pile change!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change how rich the rock is!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two mines, both digging copper.\n\nMine A's rock holds about **30 spoonfuls** of copper in every bucket. Mine B's rock holds about **2 spoonfuls** in every bucket.\n\nBoth mines are asked for the same amount of copper. Why is Mine B so much harder on the land around it?",
            options: [
                { id: 'right', label: "Mine B has to dig, crush and heat roughly fifteen times as much rock to get the same copper, so it leaves roughly fifteen times as much waste.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Mine B's copper is a lower quality metal, so you need more of it to make anything useful.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is no such thing as lower quality copper. Copper is copper. Once it comes out of the smelter, Mine B's copper and Mine A's copper are exactly the same stuff, and no one could tell them apart.\n\nWhat differs is **how much rock you had to go through to get it**.\n\nMine A gets a spoonful from one bucket. Mine B needs fifteen buckets for that same spoonful. Fifteen times as much rock dug out. Fifteen times as much crushed to powder. Fifteen times as much heated in the smelter, which means fifteen times the fuel.\n\nAnd every one of those buckets, minus the tiny bit of metal, is still sitting there afterwards as a pile of crushed **waste**.\n\n**The metal is identical. The damage is not.**",
            options: [
                { id: 'retry', label: "Oh -- the metal is the same, but the amount of rock is not!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **How rich the rock is decides how much you must dig, crush, heat and throw away.**\n\n- Metal in rock is **joined onto other things**, often **oxygen**\n- You cannot sieve it out -- it is not loose\n- **Crush and sort**, then **heat with charcoal** in a smelter\n- Charcoal grabs the oxygen and lets the metal go\n- Poorer rock means far more rock handled for the same metal\n\nThere is one shortcut, and it is a big one. An old drinks can is **already metal**. Nobody has to dig it, crush it, or pull the oxygen off it -- all of that was done years ago. Melting a can down takes a small fraction of the heat that making new metal from rock does. That is why recycling metal matters so much. It is the single easiest way to use the **Earth's resources responsibly**.\n\nBut the mine still leaves a hole and a pile of waste. Can that ever become a living place again? That is B49!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Poorer rock means far more digging and far more waste!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how metal is freed from rock!**\n\n- Metal in rock is **joined onto other things**, very often **oxygen**\n- Joined to oxygen, metal looks nothing like metal -- dull and rocky\n- No sieve can separate them\n- **Crush and sort** the rock into a richer powder\n- **Heat with charcoal** in a **smelter**; charcoal grabs the oxygen\n- Liquid metal runs out and the oxygen leaves as gas\n- Poor rock means far more digging, heating and **waste**\n- Recycling skips all of it, because old metal is already free\n\nNext in B49: whether a used-up mine can ever live again!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Charcoal grabs the oxygen and the metal comes free!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C49 Complete -- From Rock to Metal!**\n\nMetal has to be prised away from whatever it is joined to, and the poorer the rock, the more it costs.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Metal is joined on | Usually to **oxygen** | It looks like dull rock, not metal |\n| Crush and sort first | Wash away the plain rock | Leaves a much richer powder |\n| Heat with **charcoal** | Charcoal grabs the oxygen | Liquid metal runs out of the smelter |\n| Poor rock costs dearly | Fifteen buckets, not one | Fifteen times the waste |\n| Recycling skips it all | Old metal is already free | A fraction of the heat |\n\n**Up next:** B49 (Healing the Land) -- can a used-up mine ever live again?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
