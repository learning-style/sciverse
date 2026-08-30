import { DialogNode } from '../../types';

export function getP48Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A wood is full of animals -- foxes, badgers, deer, mice, owls. But they move at night and hide when people come near. You cannot sit and watch them all day.\n\nSo scientists strap a **camera trap** to a tree. It is a camera that snaps a picture by itself whenever something warm walks past.\n\nHere is a real puzzle. One team put **1** camera in a wood for a month and found **3** kinds of animal. Another team put **20** cameras in that same wood, in the same month, and found **18** kinds.\n\nSame wood. Same month. Why such different answers?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "One camera only watches one small spot, so it misses every animal that never happens to walk past that spot.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The second team must have had better cameras that could see much further into the trees.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A better camera would not help much. Even the best camera trap only watches a few paces of ground in front of it.\n\nThe real problem is that **you can never watch the whole wood**. You only ever watch small pieces of it. Each piece you watch is called a **sample**.\n\nOne camera is one sample -- one small spot, for one month.\n\nAnd here is the thing: animals are **not spread out evenly**. The badger uses one particular path. The deer stay down near the stream. The owl hunts over the clearing. Put your one camera in the wrong place and you will never know those animals exist.\n\nSo the second team did not have better cameras. They had **more samples**.",
            options: [
                { id: 'cont', label: "So it is about how much of the wood you actually watch?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Keeping **track** of **wildlife** follows three simple rules:\n\n1. One camera is one **sample** -- one small spot\n2. **More cameras** means more of the wood is being watched\n3. Cameras that are **spread out** beat cameras bunched together\n\nThere is one more thing worth knowing. The first few cameras find a lot of new animals very quickly, because they pick up all the common ones. After that, each new camera adds only the odd rare animal that nobody had caught yet.\n\nSo going from 1 camera to 5 changes your answer enormously. Going from 40 cameras to 45 barely changes it at all.\n\nIn the picture, a wood is full of hidden animals. Each camera watches the circle around it.\n\nSlide **Number of Cameras** and watch how many kinds you find!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me add some cameras!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two teams each have 10 cameras and the same wood.\n\nTeam A puts all 10 along one path, because the path is easy to walk down.\n\nTeam B spreads their 10 right across the wood, which takes all day.\n\nWho ends up finding more **kinds** of animal?",
            options: [
                { id: 'right', label: "Team B, because ten cameras on one path are all watching nearly the same place -- any animal that avoids that path is missed by every single one of them.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Team A, because animals really do use paths, so all ten cameras are sitting in the best possible spot.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "You are right that animals use paths! Team A will get **thousands** of pictures. Far more than Team B.\n\nBut count what they are pictures **of**. Ten cameras standing in a row on one path take pictures of the same fox, over and over.\n\n**How many pictures you get is not the same as how many kinds you find.**\n\nTen cameras on one path is really one sample, repeated ten times. It tells you a great deal about that path and nothing at all about the rest of the wood.\n\nTeam B walked all day and got fewer pictures -- but they watched ten genuinely different places, so they found the animals of the stream, the clearing and the thicket too.",
            options: [
                { id: 'retry', label: "Oh -- lots of pictures of the same animal is still only one sample!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **What you find depends on how much of the place you watched, and where.**\n\n- Each camera is one **sample** -- one small spot\n- Animals are not spread out evenly, so where you look matters\n- Spread-out cameras beat bunched-up cameras\n- The first few cameras add the most; later ones add rare animals only\n- Lots of pictures is not the same as lots of kinds\n\nBut cameras only catch animals that walk in front of them. A fish will never trip a camera trap. Neither will a newt hiding under a stone in a pond.\n\nSo how do you find an animal you cannot photograph? That is C48!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "More samples, spread out, means a truer answer!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how wildlife is counted!**\n\n- A **camera trap** photographs whatever walks past it\n- Each camera is one **sample** -- one small spot for a while\n- You can never watch a whole wood, only pieces of it\n- Animals are not spread evenly, so **where** you put a camera matters\n- **Spread out** beats bunched together\n- The first few cameras find the most; later ones add only rare animals\n- Many pictures is not the same as many kinds\n\nNext in C48: how to find animals that never walk past a camera at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "More samples, spread out, gives a truer picture!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P48 Complete -- Where to Put the Camera!**\n\nYou can never watch a whole wood at once. You watch samples of it, and how you choose them decides your answer.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| You cannot watch it all | You watch **samples** | One camera is one small spot |\n| More cameras, more found | More of the wood is watched | 1 camera found 3 kinds, 20 found 18 |\n| Spread out beats bunched | Ten on one path is one sample | Team B found more kinds |\n| Early cameras add most | Common animals turn up fast | Rare ones need many cameras |\n\n**Up next:** C48 (Traces in the Water) -- finding animals that never walk past a camera!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
