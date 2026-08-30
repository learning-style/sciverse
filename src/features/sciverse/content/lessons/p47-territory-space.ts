import { DialogNode } from '../../types';

export function getP47Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A robin needs its own patch of garden to find enough worms and insects. It chases other robins away from it.\n\nSo here is a puzzle. One garden might hold **four** robin patches. The same garden holds **hundreds** of woodlice.\n\nWhy can so many more woodlice fit in exactly the same space?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "A woodlouse needs only a tiny patch to find its food, so far more of them fit in the same garden.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Woodlice are smaller, and small animals simply do not need any space at all.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Size is part of it, but the real question is **how much space one animal needs to find enough food**. Scientists call that patch its **territory**.\n\nA robin eats worms and insects that are spread thinly across the ground, so it must search a wide area every day. Its territory is big.\n\nA woodlouse eats rotting leaves, and a single log can hold a huge pile of them. Its territory is tiny -- a few handspans of damp wood.\n\nSo the number of animals a garden can hold is not really about the garden. It is about **how big each animal's territory has to be**.",
            options: [
                { id: 'cont', label: "So it depends on how much space each animal needs?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! The space works like a simple sum:\n\n1. Take the **size of the habitat** -- the garden, wood or pond\n2. Divide it up by the **size of one territory**\n3. That tells you roughly **how many animals fit**\n\nSmall territory, many animals. Big territory, very few.\n\nThis is why big hunters are always rare. A single fox needs a territory of many gardens to find enough food. An eagle may need a whole valley. There is nothing wrong with them -- there simply is not room for many.\n\nAnd it explains why losing land hurts big animals first. Cut a wood in half and the woodlice barely notice, because their territories are tiny. The foxes may find that no whole territory fits any more.\n\nIn the picture, a meadow is divided into **territories**. Each circle is one animal's patch.\n\nSlide **Territory Size** and watch how many animals fit!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change the territory size!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A wood is cut in half to build a road. Counts afterwards show the beetles are doing fine, but the badgers have gone.\n\nWhy did the same change affect them so differently?",
            options: [
                { id: 'right', label: "Badgers need a big territory, so half a wood may be too small to hold even one -- while a beetle's tiny patch still fits easily.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Badgers are just more delicate animals, so they are the first to die whenever anything changes.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Badgers are tough animals. The problem is not delicacy -- it is **space**.\n\nA beetle's territory might be a single rotting log. Cut the wood in half and there are still plenty of logs, so the beetles carry on as before.\n\nA badger needs a large area to find enough food. If a whole badger territory no longer fits inside the piece of wood that is left, no amount of toughness helps. The badger has to leave or starve.\n\nThis is why building a road through a wood can wipe out the large animals while the small ones seem unaffected. **The bigger the territory, the more damage a small loss of land does.**",
            options: [
                { id: 'retry', label: "Oh -- the big animals run out of room first!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **How many animals fit depends on how big each one's territory needs to be.**\n\n- A **territory** is the patch one animal needs to find enough food\n- Small territories mean many animals fit\n- Big territories mean very few\n- Large animals are always rarer, and lose out first when land is taken\n\nBut animals do not spend all day fighting over these edges. A robin cannot patrol its whole garden at once, and a fox certainly cannot.\n\nSo how does an animal warn others off a patch it is not even standing in? That is C47!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Territory size decides how many fit!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how space is shared!**\n\n- A **territory** is the patch one animal needs to find enough food\n- Habitat size divided by territory size gives roughly how many fit\n- A woodlouse needs a few handspans; a robin needs a garden\n- **Small territory, many animals. Big territory, very few.**\n- Large hunters are always rare because their territories are huge\n- Losing land hurts the big animals first\n\nNext in C47: how animals mark a patch without standing on it!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Territory size decides how many animals fit!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P47 Complete -- Room to Live!**\n\nHow crowded a habitat can be depends on how much room each animal needs.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Each animal needs a patch | That patch is its **territory** | Food must be findable |\n| Small patch, many animals | Woodlice pack in tightly | Hundreds in one garden |\n| Big patch, very few animals | A fox needs many gardens | Big hunters are always rare |\n| Losing land hits big animals first | Their territory stops fitting | Roads can remove badgers |\n\n**Up next:** C47 (Smell Messages) -- how animals mark a patch without standing on it!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
