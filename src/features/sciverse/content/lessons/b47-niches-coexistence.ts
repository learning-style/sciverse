import { DialogNode } from '../../types';

export function getB47Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Look up at a single oak tree and you might find **five** different kinds of small bird in it at once. They are all about the same size. They all eat insects.\n\nThey should be fighting over every caterpillar. Instead they sit there quite happily.\n\nHow can five bird species share one tree?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They feed in different parts of the tree, so they are not really after the same insects at all.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "There must be so many insects in the tree that nobody ever runs short.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Insects do run short, especially in winter. If all five species really chased the same food in the same place, one of them would win and the rest would leave.\n\nScientists watched these birds very carefully and found something neat. Each species works a **different part** of the tree:\n\n- One feeds high in the outer twigs\n- One works the thick inner branches\n- One walks head-first **down** the trunk, poking into bark cracks\n- One hunts near the ground\n- One takes insects in mid-air\n\nThey all eat insects, but not the **same** insects in the **same** place. The job each one does is called its **niche**, and five different niches fit inside one tree.",
            options: [
                { id: 'cont', label: "So they each have a different job in the tree?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A **niche** is the particular way a species makes its living -- what it eats, where it looks, and when it is active.\n\nHere is the rule:\n\n1. **Different niches** -- both species can live in the same place quite happily\n2. **The same niche** -- one will do slightly better, and the other has to leave\n\nThe second half surprises people. Two species cannot do the same job in the same place forever. One is always a little better. Over time, that one takes over.\n\nSo animals in a shared habitat are usually **specialists**. Splitting the tree into five niches means five species survive where otherwise there would be one.\n\nTime works as well as space. Owls and hawks hunt the same fields for the same mice -- but hawks hunt by day and owls by night, so they almost never meet.\n\nIn the picture, two bird species feed in one tree. One bird is drawn in **blue** and the other in **red**. The two coloured **circles** are their **feeding zones** -- the part of the tree each one hunts in. The **overlap** is how much of the tree they both use. If the overlap gets too big, one bird is **pushed** out.\n\nSlide **How Much They Overlap** and see whether both can stay!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change how much they overlap!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A new bird species arrives on an island. It feeds in exactly the same part of the trees, on exactly the same insects, as a bird already living there.\n\nWhat usually happens?",
            options: [
                { id: 'right', label: "One of them gradually loses out and disappears from the island, because two species cannot hold the same niche.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "They share it evenly and both do fine, since there is plenty of room on an island.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Sharing evenly sounds fair, but it is not what happens -- and this is one of the most reliable findings in ecology.\n\nThe two species are never **exactly** equal. One is a little faster, or better on cold mornings, or raises one more chick a year. That tiny edge means it gets slightly more food. More food means more young. More young take even more of the food.\n\nOver many years that small advantage compounds until the other species has gone from the island.\n\nThe only escapes are to **shift niche** -- start feeding a bit lower, or earlier in the day, or on slightly different insects -- or to leave. Species that arrive somewhere new often do shift, which is how one ancestor can end up as several species that share an island quite peacefully.",
            options: [
                { id: 'retry', label: "Oh -- a small advantage grows until the other one is gone!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Two species can share a place, but not a niche.**\n\nBig Idea 47 now reads as one story:\n- **P47** -- a **territory** is the space one animal needs, so territory size sets how many fit\n- **C47** -- **scent marks** keep neighbours apart without fighting\n- **B47** -- a **niche** is the job a species does, and different niches let species share the same place\n\nSharing a habitat is not about being generous. It is about **not doing the same job as your neighbour**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Share the place, not the job!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how species share a habitat!**\n\n- A **niche** is how a species makes its living -- what, where and when it eats\n- Five bird species can share one tree by using five different parts of it\n- **Different niches** means both species can stay\n- **The same niche** means one slowly pushes the other out\n- A tiny advantage grows over many years until only one is left\n- Splitting by **time** works too -- hawks by day, owls by night\n\nP47 measured the space, C47 sent the messages, and B47 showed how species fit together!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Species share a place by doing different jobs!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 47 -- B47 Complete!**\n\nSharing Without Fighting -- How Do Species Share Habitats?\n\nSpecies fit together by doing different jobs, not by being generous.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| A species has a job | That job is its **niche** | What, where and when it eats |\n| Five birds, one tree | Five different niches | They avoid each other's food |\n| Same niche, one loses | A tiny edge grows over years | Two cannot share a job |\n| Time splits niches too | Hawks by day, owls by night | Same field, never meeting |\n\n**Big Idea 47 connections:**\n- P47 (Room to Live) showed that territory size decides how many animals fit in a habitat\n- C47 (Smell Messages) showed how scent marks keep neighbours apart without fighting\n- B47 (Sharing Without Fighting) showed how different niches let several species live in the very same tree!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
