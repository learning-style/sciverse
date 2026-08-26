import { DialogNode } from '../../types';

export function getP42Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Coaches always shout the same thing: **follow through**. Do not stop your swing at the ball -- keep going past it.\n\nBut the ball has already left by then. How can what your arm does *afterwards* possibly matter?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Following through keeps your bat or foot pushing on the ball for longer, and a longer push means a faster ball.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "It does not really matter -- coaches just say it to make the swing look good.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It looks like the ball leaves instantly, but it does not! A bat stays in contact with a ball for around **1 millisecond** -- and a foot with a football for about **10 milliseconds**.\n\nThat sounds like nothing, but during that tiny window the ball is being pushed. **Follow through** keeps the push going for the whole contact instead of cutting it short.\n\nIf you stop your swing at the ball, you start slowing down *before* contact ends. The ball gets a shorter, weaker push.",
            options: [
                { id: 'cont', label: "So the contact lasts longer than I thought?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Speed does not come from force alone -- it comes from **force multiplied by contact time**:\n\n1. A **big force** for a **very short time** gives a small push\n2. The **same force** for **longer** gives a much bigger push\n3. Scientists call this total push the **impulse**\n\nThat is why a golfer follows through, why a boxer is told to punch *through* the target, and why a tennis player sweeps the racket well past the ball.\n\nIn the picture you will see the **contact time** in **milliseconds** -- thousandths of a second -- and a speed bar showing how fast the ball leaves.\n\nSlide **Contact Time** and watch the ball speed change!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try different contact times!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two players kick a football with exactly the same force. One stabs at it and pulls back. The other follows through smoothly.\n\nWhose ball travels faster?",
            options: [
                { id: 'right', label: "The one who follows through -- the force acts for longer, so the ball gains more speed.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "They tie, because the force was exactly the same for both players.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Same force, yes -- but force is only **half** of what matters!\n\nThe push a ball receives is **force multiplied by contact time**. Equal forces do not give equal pushes if one lasts twice as long.\n\nThe player who stabs and pulls back cuts the contact short. The one who follows through keeps the boot on the ball for the full contact, so the ball is pushed for longer and leaves faster.\n\nThis is why technique beats raw strength in almost every sport.",
            options: [
                { id: 'retry', label: "Oh -- the same force for longer gives a bigger push!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Push = force x contact time**, and technique is mostly about protecting that time.\n\nThe same rule runs backwards too. To *stop* something safely you want the **longest** possible contact time, because that means the smallest force:\n- A cricketer pulls their hands back as they catch\n- A gymnast bends their knees on landing\n- A car bonnet crumples in a crash\n\nYou will meet that exact idea again in **P43 Softening the Blow**.\n\nIn C42 you will find out what your body loses while you play -- and why water alone does not replace it!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Longer contact means a bigger push!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the physics of technique!**\n\n- A bat touches a ball for only about **1 millisecond**\n- The push a ball gets is **force multiplied by contact time**\n- Scientists call that total push the **impulse**\n- **Follow through** protects the contact time instead of cutting it short\n- Reversing the idea, a **long** contact time makes stopping **gentler**\n- Technique often beats raw strength\n\nNext in C42: what you sweat out, and why water alone is not enough!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Technique is really about controlling contact time!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P42 Complete -- Follow Through!**\n\nSpeed is not just how hard you hit. It is how hard, for how long.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Contact lasts milliseconds | Not instant after all | There is time to push |\n| Push = force x contact time | The **impulse** | Explains follow through |\n| Follow through protects time | Do not stop at the ball | Faster ball, same effort |\n| Long contact softens landings | Reverse the same rule | Bend your knees |\n\n**Up next:** C42 (Sweat and Salt) -- what your body loses when you play!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
