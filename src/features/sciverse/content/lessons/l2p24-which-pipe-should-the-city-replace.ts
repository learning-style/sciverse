import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 24, physics.
 *
 * P24 handed the learner two dials called Pressure and Resistance and said that
 * narrowing a branch lowers its flow. True, and useless: it never said which pipe
 * to replace, which is the only question a water engineer has.
 *
 * This lesson is about network structure rather than about one pipe, which is what
 * keeps it clear of L3P11 -- that lesson owns the resistance of a single tube and
 * its 1/radius^4. Here every pipe already has a capacity in L/min and the question
 * is purely which combination of them is holding the network back.
 *
 * A reservoir feeds one trunk pipe; the trunk splits into two street pipes:
 *
 *   delivery = the smaller of (trunk) and (street A + street B)
 *
 * Both lines are true at once because everything must cross the trunk, and
 * everything must end up down one street or the other. The useful consequence is
 * that the narrowest pipe is often the wrong one to replace: with a 60 trunk and
 * streets of 55 and 20, the narrowest pipe is street B and widening it delivers
 * nothing, because 55 + 20 already beats the trunk.
 *
 * Frame of reference stated: capacity and delivery are both measured flowing from
 * the reservoir towards the houses, per minute.
 *
 * Still standing: a pipe has no fixed capacity. It has a resistance, and how much
 * crosses it depends on the pressure at both of its ends, which depends on the rest
 * of the network -- so these capacities are a simplification, and L3P24 removes it.
 */
export function getL2P24Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A city has thousands of water pipes and enough money to replace one or two a year. Pick the wrong one and nothing improves at all.\n\nThat is the question P24 never answered. It gave you a dial called **Resistance** and told you that narrowing a branch lowers the flow through it, which is true -- and no help whatsoever, because it says nothing about which pipe is the one holding the whole **network** back. A network is a set of pipes joined at junctions so that water can get from one place to another.\n\nHere is the smallest network where the answer is genuinely surprising.\n\nA reservoir feeds a single wide pipe called the **trunk**. The trunk then splits into two narrower pipes, one down each of two streets, and every house is on one street or the other.\n\n**Capacity** is the most a pipe can carry in one minute, measured in **litres per minute (L/min)** flowing from the reservoir towards the houses. **Delivery** is what actually arrives at the houses, in the same units and the same direction.\n\nYour two dials set the capacities you are allowed to change.\n\n- **Trunk Pipe** -- the capacity of that single pipe out of the reservoir, in L/min.\n- **Street A Pipe** -- the capacity of the pipe down the first street, in L/min. Street B's pipe stays at **20 L/min** throughout, so that you have something fixed to reason against.\n\nSo, before any arithmetic. The city wants more water arriving at the houses. Which pipe should it replace?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'narrowest', label: "The narrowest pipe -- that has to be the problem.", nextNodeId: 'misconception' },
                { id: 'depends', label: "Whichever one is actually holding the network back.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the natural answer, and it is wrong often enough to waste real money.\n\nSet the **Trunk Pipe** to **60 L/min** and the **Street A Pipe** to **55 L/min**. Street B is 20 L/min, so the narrowest pipe in the whole network is street B.\n\nNow replace street B. Make it twice as wide. **Nothing happens.** Not a little -- nothing at all.\n\nThe reason is that street A and street B are not in a queue, they are side by side, so they share the work. Between them they can already take 55 + 20 = **75 L/min**, and only 60 L/min can get out of the reservoir to reach them. The streets were never the problem; the trunk was.\n\n**A pipe being narrow does not make it the bottleneck.** The **bottleneck** is whatever actually sets the limit, and finding it takes one piece of arithmetic rather than one glance.",
            options: [
                { id: 'cont', label: "So how do I find it?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "There are exactly two ways this network can hold water back, and you can write both of them down.\n\n**One: the trunk.** Every drop that reaches any house crossed the trunk first, because there is no other way out of the reservoir. So the delivery can never be more than the trunk's capacity.\n\n**Two: the two streets together.** Every drop that reaches any house ended up down street A or down street B. So the delivery can never be more than street A plus street B added together.\n\nBoth of those are true at the same time, so the delivery has to obey the tighter one:\n\n**delivery = the smaller of (trunk) and (street A + street B)**\n\nThis holds while the flow is **steady** -- nothing building up or draining away inside the pipes -- and while each capacity stays fixed. The whichever-is-smaller side is the **bottleneck**.\n\nAnd notice what kind of thing a bottleneck turned out to be. It is not always one pipe. *The two streets together* is a bottleneck made of two pipes, and widening just one of them only helps until their total catches up with the trunk.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me it on real numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example.** Trunk 60 L/min, street A 25 L/min, street B 20 L/min.\n\nThe two lines:\n\n- the trunk: **60 L/min**\n- the streets together: 25 + 20 = **45 L/min**\n\nThe smaller is 45, so the network delivers **45 L/min** and the bottleneck is the two streets together. The trunk is sitting there with 15 L/min of capacity nobody is using.\n\n**So replace a street pipe.** Widen street A from 25 to **40 L/min**:\n\n- the streets together: 40 + 20 = **60 L/min**\n- the trunk: **60 L/min**\n\nThe smaller is 60, so delivery goes to **60 L/min**. That is **15 L/min gained** -- and the two lines are now exactly equal, which means every pipe in the network is working flat out.\n\n**Now the part worth remembering.** Keep going and widen street A to **55 L/min**:\n\n- the streets together: 55 + 20 = **75 L/min**\n- the trunk: **60 L/min**\n\nThe smaller is still 60. Delivery is still **60 L/min**. The extra 15 L/min of pipe delivered **nothing**, because the bottleneck moved to the trunk the moment the streets caught up with it.\n\nYou can work out in advance where that happens. Street A stops helping once the streets reach the trunk, which is at\n\n**street A = trunk - street B = 60 - 20 = 40 L/min.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. The trunk is **30 L/min**, street A is **25 L/min**, street B is **20 L/min**.\n\nWhat does the network deliver?",
            options: [
                { id: 'thirty', label: "30 L/min", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fortyfive', label: "45 L/min", nextNodeId: 'math_wrong' },
                { id: 'fiftyfive', label: "55 L/min", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Not quite -- run both lines and then take the smaller.\n\n- the streets together: 25 + 20 = **45 L/min**\n- the trunk: **30 L/min**\n\nThe smaller is **30 L/min**, so that is the delivery, and this time the trunk is the bottleneck.\n\n45 is the answer to a different question: it is what the streets *could* carry if the trunk would feed them. It cannot, so they never find out. And 55 is the two capacities you were given added up, which is not a line this network has -- street A and street B are side by side, but the trunk is in a queue with both of them, so it never gets added to anything.\n\n**Add pipes that are side by side. Compare pipes that are in a queue.**",
            options: [
                { id: 'retry', label: "Smaller of the two lines. Got it.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live now. The network is drawn with each pipe's width showing its capacity, and the bottleneck is marked.\n\nThings worth doing:\n\n- Put the **Trunk Pipe** at 60 and walk the **Street A Pipe** up from 5. Watch the delivery climb, and then watch it **stop dead at 40** while the dial keeps going.\n- Leave street A high and walk the trunk up instead. Now the delivery climbs again -- same network, different pipe, and it only works because you checked which line was the tighter one first.\n- Find a setting where the two lines are **equal**. Every pipe is then working flat out, and no single replacement improves anything.\n- Put the trunk at 100 and street A at 5. The narrowest pipe is street A by a long way, and this time it really is the bottleneck. **Narrow is sometimes the answer -- it is just never the reason.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A city replaces street A's pipe, **doubling** it from 25 to 50 L/min. Then it measures the water arriving at the houses and finds **no improvement at all** -- the delivery is exactly what it was before.\n\nThe pipe was fitted correctly and nothing is leaking. What must have been true?",
            options: [
                { id: 'trunk', label: "The trunk was already the bottleneck, so the streets had spare capacity.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'b', label: "Street B must have narrowed by the same amount.", nextNodeId: 'checkpoint_wrong' },
                { id: 'pressure', label: "The pressure must have dropped when the pipe was changed.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Think about which of the two lines the new pipe appears in.\n\nWidening street A can only raise the *streets together* line. If that line was already the **larger** of the two, raising it changes nothing -- the delivery was being set by the trunk, and the trunk was not touched.\n\nSo the measurement tells you something definite and useful: 25 + 20 = 45 was already at or above the trunk's capacity. The city spent its money on the one line that had room to spare.\n\nThe other two answers would both show up elsewhere. A narrowed street B is a *new fault*, and it would have made things worse rather than leaving them identical. And the pressure is not in this lesson's arithmetic at all -- these pipes are described by their capacity, which is how much they can carry, not by how hard the water is being pushed.",
            options: [
                { id: 'retry', label: "Raising the looser line changes nothing.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly right, and this is the whole lesson in one measurement.**\n\nA replacement that improves nothing is not a wasted experiment -- it is a **measurement of where the bottleneck is**. The city now knows that 45 L/min of street capacity is more than the trunk can feed, which it did not know before, and the next pipe it buys will be the right one.\n\nIt would have been cheaper to do the arithmetic first. Two lines, one subtraction:\n\n- the streets together: 25 + 20 = 45\n- the trunk: 40, say\n\nThe smaller is 40, the trunk is the bottleneck, and street A was never worth touching.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Find the bottleneck first!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You learned to read a network instead of a pipe.**\n\n- **delivery = the smaller of (trunk) and (street A + street B)**, while the flow is steady and the capacities are fixed\n- Both lines are forced. Everything crosses the **trunk**, and everything ends up down **one street or the other**\n- Pipes **side by side add**. Pipes **in a queue** are compared, and the smaller one wins\n- The **bottleneck** is whichever line is smaller -- and it can be a **set** of pipes rather than one pipe\n- 60 trunk, 25 and 20 streets: the streets are the bottleneck at **45 L/min**, with 15 L/min of trunk unused\n- Widen street A to 40 and delivery reaches **60 L/min**, with both lines equal and every pipe working flat out\n- Widen it to 55 and delivery is **still 60 L/min**. The last 15 L/min of pipe delivers **nothing**\n- The bottleneck **moved** when the streets caught up, and you can predict exactly where: **street A = trunk - street B**\n- So **the narrowest pipe is not the bottleneck**. With a 60 trunk and streets of 55 and 20, the narrowest pipe is street B, and replacing it does nothing at all\n- A replacement that changes nothing has still **measured** something: the line you raised was the looser one\n- **Still standing:** a pipe does not really have a capacity. It has a **resistance**, and how much crosses it depends on the pressure at *both* its ends -- which depends on what the rest of the network is doing. Treating each pipe as a fixed number is a simplification, and a useful one, but these capacities had to be looked up rather than worked out. **L3P24 earns them.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2P24", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Physics Complete -- How Do Networks Deliver What Matters?**\n\nP24 said that networks balance pressure and resistance to deliver. This put a number on it, and the number came with a warning about where to spend.\n\n**Summary Table:**\n| | P24 said | L2P24 says |\n| --- | --- | --- |\n| What a network is | pipes, junctions, pressure, resistance | a set of **lines** that each cap the delivery |\n| What limits delivery | high resistance or low pressure | the **smaller** of the trunk and the streets together |\n| The formula | -- | **delivery = smaller of (trunk) and (A + B)** |\n| Pipes side by side | more return paths, more robust | their capacities **add** |\n| Pipes in a queue | -- | the **smaller** one sets the limit |\n| Narrowing a branch | lowers flow through it | lowers **delivery** only if that branch is in the tighter line |\n| Which pipe to replace | not asked | the one in the **bottleneck**, and only until the lines are equal |\n| Where it stops helping | -- | **street A = trunk - street B** |\n\n**The one line to remember:** find the bottleneck before you spend anything, because widening a pipe that is not in it delivers exactly nothing -- and the bottleneck moves the moment you fix it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
