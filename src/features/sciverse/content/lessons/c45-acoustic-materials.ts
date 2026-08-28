import { DialogNode } from '../../types';

export function getC45Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A school hall with bare walls and a hard floor is deafening. Everyone shouts to be heard, and the noise builds and builds.\n\nHang some soft panels on the walls and the same hall becomes calm and easy to talk in.\n\nThe panels are thin and light. How can something so flimsy beat solid brick walls?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Soft panels have tiny air pockets that trap sound and turn it into a little heat, while hard walls just bounce it back.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The panels must be heavy and solid enough to block the sound from getting through.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Weight blocks sound going **through** a wall -- and that is a different job from making a room quieter.\n\nIn a hall, the problem is not sound escaping. It is sound **bouncing around inside**. A hard, smooth wall reflects almost every sound wave straight back into the room, where it bounces off the next wall, and the next. Those repeated bounces are what we call an **echo**, and they pile on top of each other until nobody can hear anything clearly.\n\nA soft panel is full of tiny **air pockets**. Sound waves push air in and out of those pockets, rubbing against the fibres. That rubbing turns a little of the sound energy into **heat** -- a tiny, unnoticeable amount of warmth. The sound is **absorbed** rather than reflected.",
            options: [
                { id: 'cont', label: "So the panel soaks the sound up instead of bouncing it?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! There are two completely different noise jobs, and they need opposite materials:\n\n1. **Blocking** sound from passing through a wall -- you want **heavy and solid**\n2. **Absorbing** sound inside a room -- you want **soft and full of air pockets**\n\nThat is why a recording studio has thick soft panels on the inside **and** heavy walls on the outside. The panels stop echoes; the walls keep the neighbours happy.\n\nThickness matters too, and in a particular way. A thin panel will **catch** high sounds -- voices, clatter, squeaks. **Deep, low sounds need a much thicker panel**, because a low sound wave is long and needs more material to work on.\n\nIn the picture you can change the **panel thickness** in **centimetres**, and watch how much of the sound is **absorbed** rather than reflected as an **echo**.\n\nSlide **Panel Thickness** and quiet the room down!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try different panel thicknesses!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A neighbour complains about loud music. The owner covers the shared wall with soft foam panels, and the neighbour says it is no better.\n\nWhy did the foam not work?",
            options: [
                { id: 'right', label: "Foam absorbs echoes inside the room, but blocking sound through a wall needs heavy, solid material instead.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The foam was not thick enough -- twice as much would have fixed it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Even a very thick layer of foam would disappoint here, because it is the wrong tool for this job.\n\nSoft foam is an **absorber**. It is superb at soaking up sound bouncing around **inside** a room, which makes the room itself calmer to be in.\n\nBut sound passing **through** a wall is blocked by **mass** -- heavy, dense material that is hard to shake. Foam is almost all air, so it weighs very little and barely slows sound crossing the wall.\n\nThe owner made their own room sound nicer and did almost nothing for the neighbour. To fix that you need mass: a heavier wall, or a second layer of dense board.",
            options: [
                { id: 'retry', label: "Oh -- absorbing and blocking are different jobs!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Match the material to the job.**\n\n- **Absorbing** echoes inside a room -- soft, light, full of **air pockets**\n- **Blocking** sound through a wall -- heavy, dense, solid\n- Thin panels handle high sounds; **low sounds need thick panels**\n- Studios use both, for different reasons\n\nThis is the same lesson as **P44 Bend, Scratch, Break**: there is no best material, only the best material for the job.\n\nAnd all of this matters because of what is waiting inside your ear. That is B45!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Absorbing and blocking need opposite materials!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how materials quiet a room!**\n\n- Hard, smooth walls **reflect** sound and cause **echo**\n- Soft panels are full of tiny **air pockets**\n- Sound rubbing through those pockets becomes a little **heat**\n- That is **absorbing**, and it is different from **blocking**\n- Blocking sound through a wall needs **heavy**, dense material\n- Thin panels soak up high sounds; low sounds need thick ones\n\nNext in B45: the part of your ear that never grows back!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Soft absorbs, heavy blocks!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C45 Complete -- Sound-Soaking Materials!**\n\nSoft and flimsy beats hard and solid -- as long as you know which job you are doing.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Hard walls bounce sound | Reflection causes **echo** | Bare halls are deafening |\n| Soft panels trap sound | Air pockets turn it to **heat** | This is **absorbing** |\n| Blocking needs weight | Mass stops sound passing through | Foam will not help a neighbour |\n| Low sounds need thick panels | Long waves need more material | Bass is hardest to treat |\n\n**Up next:** B45 (Inside Your Ear) -- the tiny hairs that never grow back!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
