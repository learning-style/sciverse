import { DialogNode } from '../../types';

export function getC35Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "An aluminium can you drink from today can be back on the shop shelf as a **new can in about 60 days**. Melt it, pour it, roll it, fill it.\n\nBut a plastic bottle usually cannot become a new bottle. It becomes a park bench or a fleece jacket, and after that it usually cannot be recycled again at all.\n\nWhy do you think metal recycles so much better than plastic?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'atoms', label: "Melting metal just rearranges whole atoms, but melting plastic damages its long molecule chains.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'hotter', label: "Metal simply melts at a higher temperature, and hotter melting always makes better recycling.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Metal does melt hotter -- but that is not what makes the difference. It is what the material is **made of**.\n\nAluminium is made of single **atoms** stacked together. Melt them and they simply slide apart, then re-stack perfectly on cooling. The atoms are unchanged, so the new metal is **identical** to the old metal. You can do this forever.\n\nPlastic is made of **polymers** -- molecules like extremely long chains. Heat **snaps** those chains into shorter ones, and a shorter chain makes weaker plastic. Every melt makes it a little worse.",
            options: [
                { id: 'cont', label: "So metal atoms survive melting but plastic chains break?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! This is the difference between two kinds of recycling:\n\n**Closed-loop recycling** (metal and glass)\n- Melt it, and the **atoms** rearrange without changing\n- New can is exactly as good as the old one\n- Can be repeated endlessly\n- Recycling aluminium uses only about **5%** of the energy of making it from ore!\n\n**Downcycling** (most plastic)\n- Heat shortens the **polymer** chains\n- Each round makes weaker, lower-quality material\n- Bottle becomes bench becomes stuffing becomes waste\n- Usually possible only once or twice\n\nSlide **Furnace Temperature** and watch what heat does to each material!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me heat them up and compare!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A city wants to cut the energy used by its waste system. It can either recycle **1 tonne of aluminium cans** or **1 tonne of plastic bottles**.\n\nWhich saves far more energy?",
            options: [
                { id: 'right', label: "Aluminium -- melting a can takes only a tiny fraction of the energy needed to pull fresh aluminium out of ore.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Plastic -- plastic melts at a much lower temperature, so it must take less energy.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Plastic really does melt at a lower temperature. But the energy saving is not about the melting -- it is about **what you avoid doing instead**.\n\nMaking new aluminium means digging up **ore**, then blasting it with a colossal electric current to rip aluminium atoms free from oxygen. It is one of the most energy-hungry processes in all of industry. Melting an old can skips every bit of that, saving about **95%** of the energy.\n\nRecycled plastic saves energy too, but far less -- and because the chains keep shortening, you only get that saving once or twice before the material is finished.",
            options: [
                { id: 'retry', label: "Oh -- the saving comes from skipping the mining and smelting!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **The structure of the material decides its recycling future:**\n\n- **Atoms** (metal, glass) survive melting -- true **closed-loop** recycling forever\n- **Polymer chains** (plastic) break when heated -- **downcycling** only\n- Recycled aluminium saves about **95%** of the energy of new aluminium\n- Mixing different plastics makes a weak, useless blend -- which is why the numbers 1 to 7 on bottles matter\n\nAnd remember from **P35 The Sorting Machine** -- none of this chemistry can start until the materials are separated and clean.\n\nNature solved this problem long ago. In B35 you will meet the recyclers that need no factory at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Atoms survive melting, but chains break!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the chemistry of recycling!**\n\n- Metals and glass are made of **atoms** that re-stack perfectly -- **closed-loop** recycling\n- Plastics are **polymers**, long chains that **snap** when heated\n- Shorter chains means weaker plastic -- this is **downcycling**\n- Recycled aluminium uses about **5%** of the energy of new aluminium\n- Different plastic types must be kept apart or the blend is useless\n\nNext in B35: the living recyclers that turn food scraps into soil!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Metal recycles forever; plastic runs out of chances!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C35 Complete -- Melt and Remake!**\n\nWhat a material is made of decides how many second chances it gets.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Metal atoms survive melting | **Closed-loop** recycling | A can can be a can forever |\n| Heat snaps polymer chains | **Downcycling** | Bottle to bench to landfill |\n| Recycled aluminium saves 95% | Skips mining and smelting | Huge energy win |\n| Mixed plastics ruin the batch | Types must stay separate | That is what the numbers mean |\n\n**Up next:** B35 (The Compost Crew) -- nature's recyclers, working without a factory!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
