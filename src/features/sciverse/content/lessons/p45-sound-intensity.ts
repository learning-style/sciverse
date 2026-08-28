import { DialogNode } from '../../types';

export function getP45Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Stand right beside a loudspeaker and it is painfully loud. Walk to the far side of the field and the same speaker is barely a murmur.\n\nThe speaker has not changed at all. It is putting out exactly the same sound.\n\nSo where did all that loudness go?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The sound spreads out over a bigger and bigger area as it travels, so much less of it reaches your ear.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The sound gets tired and runs out of energy as it travels through the air.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Sound does lose a little energy to the air, but that is a small effect over a field. Something much bigger is happening.\n\nSound spreads out in **all directions**, like a balloon inflating around the speaker. Close up, that energy is packed into a small area. Ten metres away it is spread over a **huge** area, and your ear only catches a tiny slice of it.\n\nHere is the useful rule: every time you **double your distance**, the sound arriving at your ear drops to about **a quarter**. Two metres away is four times quieter than one metre. Four metres is sixteen times quieter.\n\nStepping back is the cheapest hearing protection there is.",
            options: [
                { id: 'cont', label: "So the sound spreads out rather than wearing out?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Loudness is measured in **decibels**, usually written **dB**. It is just a number for how loud something is:\n\n- **30 dB** -- a whisper\n- **60 dB** -- a normal conversation\n- **85 dB** -- a busy road, and the level where damage starts\n- **110 dB** -- a rock concert\n- **130 dB** -- a jet taking off, painful straight away\n\nThere are three ways to make a sound quieter by the time it reaches you:\n\n1. **Distance** -- move further away, the subject of this lab\n2. **Barriers** -- put something solid in the path\n3. **Absorbers** -- use materials that soak the sound up, which is C45\n\nIn the picture, the speaker stays at the same **85 dB** and only your **distance** changes. Watch the level **reaching** your ear as you step back.\n\nSlide **Distance** and watch the level at your ear drop!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me move away and watch the level fall!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two people stand near a loud machine. One is **1 metre** away, the other **4 metres** away.\n\nRoughly how much quieter is it for the person further back?",
            options: [
                { id: 'right', label: "Far quieter -- doubling the distance twice cuts the sound to about a sixteenth of what the closer person gets.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Only slightly quieter, because 3 extra metres is a very small distance.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Three metres sounds trivial, but distance does not work in a straight line here!\n\nGoing from 1 metre to 2 metres cuts the sound to about **a quarter**. Going from 2 metres to 4 metres cuts it to a quarter **again**. Put together, the person at 4 metres receives roughly **a sixteenth** of what the person at 1 metre gets.\n\nThat is why the first few steps back matter so much more than later ones. Stepping from 1 metre to 2 metres helps enormously; stepping from 20 metres to 21 metres barely helps at all.\n\nIf you can only do one thing about a loud noise, **move away from it early**.",
            options: [
                { id: 'retry', label: "Oh -- the first steps back matter most!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Doubling the distance quarters the sound.**\n\n- Sound spreads out over an ever larger area\n- Every doubling of **distance** cuts it to about a quarter\n- The first steps back help far more than later ones\n- **Distance**, **barriers** and **absorbers** are the three tools\n\nBut you cannot always move away. A classroom, a factory or a concert hall has to be made quieter where it stands.\n\nThat needs materials -- and the right material might surprise you. On to C45!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Distance is the cheapest protection there is!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why distance protects your ears!**\n\n- Sound spreads out in all directions as it travels\n- Your ear catches only a small slice of it\n- Every **doubling** of **distance** cuts the sound to about a **quarter**\n- Loudness is measured in **decibels**, written **dB**\n- Damage begins around **85 dB**\n- **Distance**, **barriers** and **absorbers** all reduce what reaches you\n\nNext in C45: which materials actually soak up sound!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Doubling the distance quarters the sound!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P45 Complete -- Turning Down the Volume!**\n\nThe cheapest way to make something quieter is to stand further away.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Sound spreads out | It does not wear out | Your ear catches a slice |\n| Double the distance, quarter the sound | The distance rule | First steps back matter most |\n| Loudness is measured in **decibels** | 85 dB is the danger line | Gives you a number to judge by |\n| Three tools to get quieter | Distance, barriers, absorbers | You can always use one |\n\n**Up next:** C45 (Sound-Soaking Materials) -- why soft and fluffy beats hard and solid!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
