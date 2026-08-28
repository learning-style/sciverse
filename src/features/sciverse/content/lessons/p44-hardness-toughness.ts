import { DialogNode } from '../../types';

export function getP44Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Glass is much **harder** than plastic. You can scratch plastic with a coin, but not glass.\n\nSo drop a glass cup and a plastic cup on the floor. The hard one shatters. The soft one bounces.\n\nIf glass is the harder material, why is it the one that breaks?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Hard and tough are two different things -- glass resists scratches but cannot survive a crack spreading through it.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The glass must have been made badly, because a harder material should always be stronger.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is not a manufacturing problem -- it is what glass **is**.\n\nMaterials scientists measure two completely separate things:\n\n**Hardness** is how well a material resists being **scratched or dented**. Glass wins easily.\n\n**Toughness** is how well it resists a **crack spreading**. Plastic wins easily.\n\nGlass is **hard but brittle**. Once a tiny crack starts, nothing stops it and it races right through. Plastic is **soft but tough** -- it bends and absorbs the energy instead of cracking.\n\nA diamond is the hardest natural material on Earth, and you can still shatter one with a hammer.",
            options: [
                { id: 'cont', label: "So hard and tough are different properties?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Materials have several properties that are measured separately:\n\n1. **Hardness** -- resists scratching and denting\n2. **Toughness** -- resists cracks spreading\n3. **Elasticity** -- springs back to its original shape\n4. **Strength** -- how much force it takes before it gives way\n\nA material can be brilliant at one and terrible at another. That is why engineers never ask which material is best -- they ask **best for what job**.\n\nA phone screen needs **hardness**, so it does not scratch in your pocket. A bike helmet needs **toughness**, so it does not shatter. A window needs both, which is why safety glass has a plastic layer inside it.\n\nIn the picture, the same **force** is applied to a **glass bar** and a **plastic bar**. Force is measured in **newtons** -- about 1 newton is the weight of a small apple in your hand.\n\nWatch closely: the glass stays perfectly **straight** and gives no warning at all, right up to the moment it is **shattered**. The plastic warns you by bending first.\n\nSlide **Force** and see which one gives way, and how!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me push on both bars and see!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A phone maker wants a screen that never scratches, so they choose the hardest glass they can find.\n\nWhat problem should they expect?",
            options: [
                { id: 'right', label: "The harder the glass, the more brittle it tends to be, so it will shatter more easily when dropped.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "No problem at all -- the hardest material is simply the best choice.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is a genuine engineering headache, not a hypothetical one!\n\nFor most materials, pushing **hardness** up tends to push **toughness** down. Very hard glass resists scratches beautifully and then shatters when it meets a pavement.\n\nSo phone makers face a real **trade-off** -- that means you cannot have everything at once, so you give up a little of one thing to gain another. A screen that never scratches will crack more easily; a screen that survives drops will pick up scratches. Every phone you have ever seen is a compromise between the two.\n\nThe way out is usually clever **structure** rather than a magic material -- layers, coatings, or a plastic film. You will see exactly that idea in B44.",
            options: [
                { id: 'retry', label: "Oh -- harder usually means more brittle!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **There is no best material, only the best material for a job.**\n\n- **Hardness** resists scratches; **toughness** resists cracking\n- Pushing one up often pushes the other down\n- Engineers pick properties to match the job\n- Clever **structure** can beat a single wonder material\n\nBut where do these properties come from in the first place? Two objects can be made of the **same atoms** and behave completely differently.\n\nThat is C44 -- and the example will surprise you!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Best for the job beats best overall!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered that hard is not the same as strong!**\n\n- **Hardness** resists scratching and denting\n- **Toughness** resists cracks spreading\n- Glass is **hard but brittle**; plastic is **soft but tough**\n- A diamond is the hardest natural material and still shatters\n- Raising hardness usually lowers toughness -- a **trade-off**\n- Engineers choose properties to match the job\n\nNext in C44: how the same atoms can make two totally different materials!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Different properties suit different jobs!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P44 Complete -- Bend, Scratch, Break!**\n\nAsking which material is strongest is the wrong question. Strong at what?\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Hard is not tough | Two separate properties | Glass scratches less, breaks more |\n| Glass is hard but brittle | Cracks race through it | Dropped cups shatter |\n| Plastic is soft but tough | It bends instead of cracking | Helmets are not glass |\n| Harder often means more brittle | A real **trade-off** | Every phone screen is a compromise |\n\n**Up next:** C44 (Same Atoms, Different Material) -- how carbon makes both pencil lead and diamond!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
