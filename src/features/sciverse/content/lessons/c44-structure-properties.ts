import { DialogNode } from '../../types';

export function getC44Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Pencil lead is so soft it rubs off on paper. Diamond is the hardest natural material on Earth.\n\nHere is the strange part: they are made of **exactly the same atoms**. Both are pure **carbon**. Not similar atoms -- identical ones.\n\nHow can the same atoms make the softest and the hardest materials?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It is not the atoms that differ, it is how they are joined together.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The carbon atoms in diamond must be a special, stronger kind of carbon atom.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Every carbon atom is the same as every other carbon atom. There is no special hard kind.\n\nWhat changes is the **arrangement** -- how each atom is connected to its neighbours.\n\nIn **pencil lead**, carbon atoms are joined into flat **sheets**, like sheets of paper stacked up. Within a sheet the joins are strong, but between the sheets they are very weak. Press it on paper and whole sheets **slide off**. That is your pencil mark.\n\nIn **diamond**, every atom is joined to its neighbours in all directions, making one solid three-dimensional **network**. Nothing can slide anywhere, so nothing gives way.\n\nSame atoms. Completely different arrangement. Completely different material.",
            options: [
                { id: 'cont', label: "So the arrangement decides everything?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! This is one of the biggest ideas in chemistry: **structure decides properties**.\n\n1. **Sheets** that can slide past each other make a **soft, slippery** material\n2. A rigid three-dimensional **network** makes a **hard** material\n3. Same atoms, different joins, completely different behaviour\n\nThis explains far more than pencils. Soot, pencil lead and diamond are all pure carbon. Sand and glass are both mostly silicon and oxygen. Even in your own body, the difference between a stretchy tendon and a rigid bone is largely about how the same kinds of molecules are arranged.\n\nIn the picture you can change the **atom arrangement** from flat sliding **sheets** at one end to a full 3D **network** at the other, and watch the **hardness** change.\n\nSlide **Atom Arrangement** and turn pencil lead into diamond!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me rearrange the atoms!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A scientist wants to make a new material that is much harder than steel. She has a pile of ordinary carbon.\n\nWhat does she actually need to change?",
            options: [
                { id: 'right', label: "How the carbon atoms are joined -- she needs to force them into a rigid 3D network, not find better atoms.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "She needs to find rarer, higher-quality carbon atoms to start with.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is no such thing as higher-quality carbon! Every carbon atom in a lump of soot is identical to every carbon atom in a diamond.\n\nWhat she must change is the **arrangement**. Real laboratories do exactly this: they squeeze carbon under enormous **pressure** and **heat** until the atoms are forced out of flat sheets and into a rigid three-dimensional **network**. The result is a synthetic diamond, made from ordinary carbon.\n\nThe atoms were never the problem. The joins were.\n\nThis is why materials science is mostly about **processing** -- heating, squeezing, cooling and stretching -- rather than hunting for magic ingredients.",
            options: [
                { id: 'retry', label: "Oh -- she needs to change the joins, not the atoms!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Change the arrangement and you change the material.**\n\n- Carbon in flat **sheets** slides -- soft pencil lead\n- Carbon in a 3D **network** cannot slide -- diamond\n- The atoms are identical in both\n- Labs make synthetic diamond using **pressure** and **heat**\n- Materials science is largely about processing, not ingredients\n\nAnd this connects straight back to **P44 Bend, Scratch, Break**: diamond is extremely **hard** because nothing can slide -- but for the very same reason a crack has nowhere to go, so it is still **brittle**.\n\nNature has been solving this problem for millions of years. See how in B44!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Same atoms, different joins, different material!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why arrangement matters more than ingredients!**\n\n- Pencil lead and diamond are both pure **carbon**\n- Carbon in flat **sheets** slides apart -- soft and slippery\n- Carbon in a rigid **network** cannot slide -- extremely hard\n- The atoms are **identical**; only the joins differ\n- **Structure decides properties**\n- Labs use **pressure** and **heat** to rearrange carbon into diamond\n\nNext in B44: the layered materials nature builds that beat both!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Structure decides what a material can do!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C44 Complete -- Same Atoms, Different Material!**\n\nThe ingredients matter far less than how they are put together.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Pencil lead and diamond are both carbon | Identical atoms | The atoms are not the difference |\n| Flat sheets slide apart | Soft and slippery | That is your pencil mark |\n| A 3D network cannot slide | Extremely hard | That is diamond |\n| Structure decides properties | Arrangement over ingredients | The big idea of materials science |\n\n**Up next:** B44 (Nature's Layered Armour) -- how a shell beats both of them!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
