import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 5, physics.
 *
 * L2P5 assumed an ideal lever: work in = work out. This removes that
 * simplification. With friction, work in = work out + work lost, and
 * efficiency is L3B1's eta. Friction is not only waste: running the books
 * backwards shows a machine holds its own load when eta <= 50% (self-locking).
 *
 * Condition stated where used: friction takes the same work either way round.
 * The simplification still standing: static friction exceeds sliding friction
 * (L3P1), and vibration can relieve thread pressure, which is why bolts loosen.
 *
 * Level 3 theme for Big Idea 5: Level 2 balanced the books; Level 3 finds what
 * limits each trade.
 */
export function getL3P5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P5's lever obeyed **work in = work out** -- for an **ideal** lever, with no friction. Friction sounds like pure waste: work you put in that never reaches the load.\n\nNow a **car jack**. You turn a handle, a screw inside turns, and the car rises. A screw jack lifts one corner of a car -- about **5,000 N** -- with a push of around **50 N** on the handle.\n\nHere is the strange part. Let go of the handle halfway up, and the car **stays up**. The screw does not unwind under all that weight.\n\nWhat stops it?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Friction. The same friction that wastes some of your work is strong enough to stop the car's weight turning the screw backwards.", nextNodeId: 'screw', sentiment: 'positive' },
                { id: 'bad', label: "The thread slopes so gently that the car's weight pushes almost sideways into it, so the weight cannot turn the screw at all.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The slope of the thread does matter -- but it cannot hold the car on its own.\n\nImagine the thread made perfectly slippery. The car's weight presses down on a sloping surface, and a slope with **no friction** always lets things slide, however gentle it is. That is L3P1's formula, a = g(sin θ − μ cos θ): set μ to zero and any slope at all gives an acceleration down it.\n\nWith a slippery thread, the screw would spin and the car would come down. A gentle slope only makes the weight's push **along** the thread small. Something still has to resist that push, and it is **friction**.",
            options: [
                { id: 'cont', label: "So how does friction manage it?", nextNodeId: 'screw' }
            ]
        },
        screw: {
            id: 'screw',
            speaker: 'AI',
            content: "First, the jack itself. A **screw** is a ramp wrapped around a column. Its **pitch** is how far it rises in **one full turn**.\n\nYour hand goes round a circle on the handle. With a handle **0.25 m** long, one turn moves your hand:\n\n2π x 0.25 = **1.571 m**\n\nwhile a screw with a pitch of **5 mm** lifts the car only **0.005 m**. L2P5's distance rule gives the **ideal mechanical advantage**:\n\nideal mechanical advantage = distance hand moves / distance load moves = 1.571 / 0.005 = **314**\n\nWith no friction, 5,000 / 314 = **16 N** would lift the car.\n\nFriction changes the books. Some of your work is spent rubbing the thread surfaces against each other:\n\n**work in = work out + work lost to friction**\n\nand **efficiency**, from L3B1, is the share that reaches the load:\n\n**η = work out / work in**\n\nReal screw jacks are not very efficient -- about **30%** is typical.",
            options: [
                { id: 'cont', label: "Work out the jack at 30%.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**One turn of the handle, with η = 0.30:**\n\nwork out = 5,000 N x 0.005 m = **25 J**\nwork in = work out / η = 25 / 0.30 = **83.3 J**\nwork lost to friction = 83.3 − 25 = **58.3 J**\n\nThe push on the handle:\n\npush = work in / distance hand moves = 83.3 J / 1.571 m = **53 N**\n\nSo the **actual** mechanical advantage is 5,000 / 53 = **94**, not 314. That is the ideal value cut by the efficiency: 0.30 x 314 = 94.\n\nNow let go of the handle, and run the books **backwards**.\n\nComing down one turn, the car **gives back** the 25 J it gained. To turn the screw, that 25 J would have to pay the friction.\n\nThe condition belongs here. **Assume friction takes the same work whichever way the screw turns.** That is roughly true: friction depends on how hard the thread surfaces press together, and the car presses them just as hard either way.\n\nSo friction **takes 58.3 J** per turn, and the load **gives back** only 25 J. The load cannot pay. **The car stays up.**",
            options: [
                { id: 'cont', label: "Is there a general rule for when it holds?", nextNodeId: 'rule' }
            ]
        },
        rule: {
            id: 'rule',
            speaker: 'AI',
            content: "Yes, and it comes straight out of the books.\n\nFriction takes whatever work in does not reach the load:\n\nwork lost = work in − work out = work out / η − work out = **work out x (1/η − 1)**\n\nThe load can drive the machine backwards only if what it gives back is more than friction takes:\n\nwork out > work out x (1/η − 1)\n\nDivide both sides by work out:\n\n1 > 1/η − 1, so 1/η < 2, so **η > 0.5**\n\nTurn that round. **A machine holds its load by itself whenever its efficiency is 50% or less.** Engineers call it **self-locking**.\n\nCheck it on the jack: 30% is below 50%, so it holds -- exactly what the 58.3 J against 25 J showed.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A different jack lifts **4,000 N** by **5 mm** per turn when you push with **40 N** around the same **1.571 m** circle.\n\nWhat is its efficiency, and will it hold the load by itself?",
            options: [
                { id: 'right', label: "About 32%, and it holds. Work out = 4,000 x 0.005 = 20 J; work in = 40 x 1.571 = 62.8 J; 20 / 62.8 = 0.32, which is below 50%.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ratio', label: "An efficiency of 100, because the load is 100 times the push, so it holds easily.", nextNodeId: 'math_wrong' },
                { id: 'below_100', label: "About 32%, but it will unwind, because any efficiency below 100% lets the load push back.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**100** is the **actual mechanical advantage**, 4,000 / 40 -- how many times the force is multiplied. Efficiency compares **work**, not forces, and it can never be more than 1. Work out = 4,000 N x 0.005 m = **20 J**; work in = 40 N x 1.571 m = **62.8 J**; η = 20 / 62.8 = **0.32**.\n\n**Unwinding below 100%** has the rule upside down. Friction is what **stops** the load. The lower the efficiency, the more work friction takes, and the harder it is for the load to drive the screw back. At 32%, friction takes 62.8 − 20 = **42.8 J** per turn, and the load gives back only 20 J.\n\n**About 32%, and it holds**, because 32% is below 50%.",
            options: [
                { id: 'retry', label: "Compare work, and 50% is the line.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a jack lifting a **5,000 N** car corner with a **0.25 m** handle.\n\n**Efficiency** is η, as a percentage. **Screw Pitch** is how far the screw rises in one turn, in millimetres.\n\nFor one turn, the lab shows the push you need, the work in, the work out and the work lost to friction. Then it lets go of the handle: what the load gives back against what friction takes.\n\nTry this:\n\n- Slide **Efficiency** up past **50%**, and watch the verdict flip\n- Make **Screw Pitch** coarser, 10 mm. Every turn does more work and needs a bigger push -- but the 50% line does not move\n\nIn a real screw, a coarser thread would change the efficiency too. The lab keeps the two dials separate so you can see what each one does on its own.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Past 50%, the load wins. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An engineer polishes and oils a jack's screw, raising its efficiency from **30%** to **70%**. The load and pitch stay the same: 25 J of work out per turn.\n\nIs the new jack better?",
            options: [
                { id: 'right', label: "Easier to turn -- the push falls from 53 N to about 23 N -- but it no longer holds the car. Friction now takes only about 10.7 J per turn, less than the 25 J the load gives back, so it needs a separate lock.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Better in every way. Less work is wasted, and a machine that wastes less is always a better machine.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Less waste does make the jack easier to turn. But the wasted work was also doing a job: holding the car up.\n\nRun both jacks through one turn:\n\n| | η = 30% | η = 70% |\n| --- | --- | --- |\n| Work out | 25 J | 25 J |\n| Work in = 25 / η | 83.3 J | 35.7 J |\n| Push = work in / 1.571 m | 53 N | 23 N |\n| Friction takes | **58.3 J** | **10.7 J** |\n| Load gives back | 25 J | 25 J |\n| Holds the car? | **Yes** | **No** |\n\nThe oiled jack is below the line no longer: 70% is above 50%. Let go of the handle, and the car's 25 J beats friction's 10.7 J, leaving about 14 J every turn to spin the screw down.\n\nThat is why jacks with efficient screws, and many other efficient machines, have a **ratchet** or a brake: something else has to do the holding.",
            options: [
                { id: 'retry', label: "The waste was doing the holding.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Friction wastes work, and that same waste is what lets a machine hold its load: a machine is self-locking whenever η ≤ 50%.**\n\nThat is the simplification this lesson removed. **L2P5's ideal lever had work in = work out.** Real machines lose work to friction, and the loss is not only a cost -- a jack, a bolt holding a wheel on, and a wood screw in a shelf all depend on it.\n\nAnd the simplification still standing: **friction taking the same work in both directions is only approximately true.** L3P1 showed that friction before sliding starts is stronger than friction during sliding, which helps a stopped screw stay put. But vibration can briefly ease the pressure between the threads, letting a self-locking thread creep round. That is why bolts on shaking engines work loose, and why engineers fit them with **lock nuts**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Waste that holds the load!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the job friction does.**\n\n- A **screw** is a ramp wrapped round a column; its **pitch** is its rise per turn\n- A 0.25 m handle moves your hand **1.571 m** per turn\n- **Ideal mechanical advantage** = distance hand moves / distance load moves = **314** for a 5 mm pitch\n- With friction: **work in = work out + work lost to friction**\n- **Efficiency η = work out / work in**; real screw jacks are about **30%**\n- At 30%: 25 J out, 83.3 J in, **58.3 J** lost, a push of **53 N**\n- Actual mechanical advantage = η x ideal = **94**\n- Backwards, the load gives back 25 J, and friction takes 58.3 J: **the car stays up**\n- work lost = work out x (1/η − 1), so the load wins only if **η > 50%**\n- **Self-locking**: a machine holds its own load when **η ≤ 50%**\n- Assumes friction takes the same work either way round\n- Vibration can loosen self-locking threads, so engines use **lock nuts**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Self-locking at 50% or less!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why a Jack Holds Its Load!**\n\nL2P5 balanced a perfect lever's books. Level 3 added friction, and found it doing a job.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Screw | pitch = rise per turn | A ramp wrapped round a column |\n| Ideal mechanical advantage | 1.571 m / 0.005 m = **314** | With no friction |\n| Real books | **work in = work out + work lost** | Friction takes a share |\n| Efficiency | **η = work out / work in** | Screw jacks about 30% |\n| Actual mechanical advantage | η x ideal = **94** | A 53 N push |\n| Running backwards | 25 J given back, 58.3 J taken | The car stays up |\n| Self-locking | **η ≤ 50%** | Holds its own load |\n| The oiled jack | η = 70% | Easier, but needs a lock |\n| Still standing | friction the same both ways | Vibration loosens bolts |\n\n**The one line to remember:** friction wastes work -- and a machine that wastes at least half of it holds its load by itself.\n\n**Up next:** C5 -- why warm drinks lose their fizz."
        }
    };
}
