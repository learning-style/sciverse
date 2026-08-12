import { DialogNode } from '../../types';

export function getP36Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Water can look perfectly clear and still be dangerous to drink. The things that make people sick -- **bacteria** and tiny particles -- are far too small for your eyes to catch.\n\nSo the first job in a water plant is to physically remove everything it can, using **filters**.\n\nWhat do you think decides how much a filter can catch?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'holes', label: "The size of the holes -- anything bigger than a hole gets trapped, and anything smaller slips through.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'thick', label: "How thick the filter is -- a thicker filter always catches more than a thin one.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Thickness helps a little, but it is the **hole size** that decides what gets through!\n\nThink of a kitchen sieve. It could be a metre thick and pasta sauce would still pour straight through, because the holes are far bigger than the sauce. Swap in a coffee filter with tiny holes and suddenly even the coffee grounds stay behind.\n\nScientists measure filter holes in **micrometres** -- thousandths of a millimetre. A grain of sand is about 100 micrometres. A **bacterium** is about 1. To stop bacteria, you need holes smaller than 1 micrometre.",
            options: [
                { id: 'cont', label: "So it is the hole size that decides what is caught?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A water plant uses a whole **series** of filters, each with smaller holes than the last:\n\n1. **Screens** (millimetres) -- catch leaves, sticks, and fish\n2. **Sand filter** (about 20 micrometres) -- catches grit and cloudiness\n3. **Micro-filter** (about 0.1 micrometres) -- catches **bacteria**\n4. **Reverse osmosis** (about 0.0001 micrometres) -- catches even dissolved **salt**\n\nWhy not just use the finest filter for everything? Because of the trade-off: **smaller holes mean slower flow and more pressure needed**, and the filter **clogs** much faster. Sending muddy water straight to a fine filter would block it in minutes.\n\nSo the coarse filters protect the fine ones. Slide **Filter Hole Size** and watch what gets through!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me test different hole sizes!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A camper pours muddy river water through a cloth and it comes out looking beautifully clear.\n\nIs it safe to drink?",
            options: [
                { id: 'right', label: "No -- a cloth only catches big particles, and the bacteria and viruses that cause illness are hundreds of times smaller.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- the water is clear now, and clear water means the dirt and germs have been removed.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is one of the most dangerous mistakes in the outdoors -- **clear is not the same as clean**.\n\nCloth has holes around 100 micrometres wide. It catches mud, sand, and leaves, which is why the water looks better. But a **bacterium** is about 1 micrometre and a **virus** is about 0.1. To them, that cloth is a wide-open doorway.\n\nThe germs that cause serious illness are all invisible. That is exactly why the next step in a water plant is **chemistry**, not filtering -- because some things are simply too small to strain out.",
            options: [
                { id: 'retry', label: "Oh -- clear water can still be full of invisible germs!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Filtering is powerful but it has limits:\n\n- **Hole size** decides what is caught -- measured in **micrometres**\n- Filters run in **series**, coarse to fine, so the fine ones do not clog\n- Smaller holes need more **pressure** and give slower flow\n- **Clear water is not safe water** -- germs are invisible\n\nRemember **P31 Downhill Flow** from Big Idea 31? That lesson moved water *around* a city. This one makes it *safe*.\n\nFilters cannot catch everything, so in C36 chemistry takes over to destroy what slipped through!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Filters catch a lot -- but not the smallest germs!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the physics of cleaning water!**\n\n- **Hole size** decides what a filter can catch, measured in **micrometres**\n- Sand is 100, a **bacterium** is 1, a **virus** is 0.1 micrometres\n- Filters are used in **series** from coarse to fine\n- Smaller holes mean slower flow, more **pressure**, and faster clogging\n- **Clear water is not automatically safe water**\n\nNext in C36: the chemistry that finishes what the filters could not!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Hole size decides everything a filter can do!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P36 Complete -- Trapped by the Filter!**\n\nFiltering is a size contest, and the smallest germs win it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Hole size decides the catch | Measured in **micrometres** | Bigger than the hole gets stopped |\n| Coarse filters go first | Filters work in **series** | Fine filters do not clog |\n| Fine filters are slow | More **pressure**, less flow | Costs energy |\n| Clear is not clean | Germs are invisible | Never trust looks alone |\n\n**Up next:** C36 (Chlorine Patrol) -- chemistry that destroys what filters missed!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
