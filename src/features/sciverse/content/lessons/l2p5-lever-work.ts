import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P5 "Levers & Balance".
 *
 * P5 balanced torques and L2B1 balanced moments in the arm. This lesson lets
 * the lever move, and finds the price of multiplying a force: the distance is
 * divided by the same factor, so work in = work out for an ideal lever.
 *
 * It separates the two "distances" that share the force x distance shape --
 * distance from the pivot (torque) and distance moved (work). Pulleys and gears
 * are left to Big Idea 13.
 *
 * Level 2 theme for Big Idea 5: a small input does a big job, and the books
 * still balance.
 */
export function getL2P5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P5 a light box far from the pivot lifted a heavy box close to it, because **torque** -- force x distance from the pivot -- decided which side went down. L2B1 found the same rule in your arm.\n\nHere is a real job. A rock weighs **600 N** -- a **newton (N)** is the unit of force from L2P1. You slide a long steel bar under it, rest the bar on a small log as the pivot, and push down on the far end.\n\nThe rock is **0.3 m** from the pivot and your hands are **1.5 m** from it, five times as far. So a push of just **120 N** lifts the rock -- a force five times smaller.\n\nThat sounds like getting something for nothing. What is the catch?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Your hands have to move five times as far as the rock rises. You trade force for distance.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "There is no catch. The lever multiplies your push by five, so you get five times the result for the same effort.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The lever really does multiply your force by five. But watch the two ends **move**.\n\nThe bar swings around the pivot like the hand of a clock. A point far from the centre of a clock sweeps a big arc; a point near the centre sweeps a small one, in the same time.\n\nYour hands are **five times** as far from the pivot as the rock, so when the bar turns, your hands travel **five times** as far:\n\n- the rock rises **10 cm**\n- your hands move down **50 cm**\n\nThe force went down by five, and the distance went up by five. That is not a coincidence, and to see why, you need one new idea.",
            options: [
                { id: 'cont', label: "What is the new idea?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "It is called **work**.\n\nWhen a force moves something in the direction it pushes, the force does **work**:\n\n**work = force x distance moved**\n\nWork is measured in **joules (J)** -- the same joules as L2P3's energy. **1 J is a force of 1 N moving something 1 m.** Doing work on something is how energy is handed to it.\n\nCareful -- this looks like torque, but the distance is a different distance:\n\n| | Torque | Work |\n| --- | --- | --- |\n| Formula | force x distance | force x distance |\n| Which distance | how far the force is **from the pivot** | how far the object **moves** |\n| Unit | N m | J |\n\nOne more name. The **mechanical advantage** of a machine is how many times it multiplies your force:\n\n**mechanical advantage = load force / effort force**\n\nThe **load** is what the machine lifts or moves (the rock). The **effort** is the force you put in (your push).",
            options: [
                { id: 'cont', label: "Now work out the rock and my hands.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Work done on the rock** (work out):\n600 N x 0.10 m = **60 J**\n\n**Work done by your hands** (work in):\n120 N x 0.50 m = **60 J**\n\nExactly equal. **work in = work out.**\n\nNow the mechanical advantage, three ways:\n\n- load force / effort force = 600 / 120 = **5**\n- effort arm / load arm = 1.5 m / 0.3 m = **5**\n- distance hands move / distance rock rises = 50 cm / 10 cm = **5**\n\nAll three are the same number. The **effort arm** is the distance from the pivot to your hands; the **load arm** is the distance from the pivot to the load.\n\nThe condition belongs here. **work in = work out holds for an ideal lever**: a bar that does not bend, on a pivot with no friction. A real lever loses a little energy to friction and bending, so the work you put in is slightly **more** than the work you get out -- never less. This is L2P3's rule again: **a machine cannot make energy.** It can only change how the energy is delivered -- less force, more distance.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A mechanic uses a lever with an **effort arm of 2.0 m** and a **load arm of 0.25 m** to raise an **800 N** engine part by **5 cm**.\n\nHow big a push is needed, and how far do the mechanic's hands move?",
            options: [
                { id: 'right', label: "100 N, and the hands move 40 cm. The mechanical advantage is 2.0 / 0.25 = 8, so 800 / 8 = 100 N, and 5 cm x 8 = 40 cm.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same_distance', label: "100 N, and the hands move 5 cm, the same as the engine part.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "6,400 N, and the hands move 0.6 cm, because 800 x 8 = 6,400.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Check any answer with **work in = work out**. The engine part needs 800 N x 0.05 m = **40 J**.\n\n**100 N through 5 cm** is only 100 N x 0.05 m = **5 J** of work in, for 40 J out. The lever would be making 35 J from nothing. The force is right, but the hands must move eight times as far as the part: 5 cm x 8 = **40 cm**, and 100 N x 0.40 m = 40 J.\n\n**6,400 N** multiplied the load by the mechanical advantage instead of dividing. That would make the job eight times **harder**. A lever with the long arm on your side divides the force you need, so the push is 800 / 8 = **100 N**.\n\n**100 N, and the hands move 40 cm.**",
            options: [
                { id: 'retry', label: "Divide the force, multiply the distance.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, both in **metres**.\n\n**Effort Arm** is how far your hands are from the pivot. **Load Arm** is how far the 600 N rock is from the pivot.\n\nThe lab lifts the rock by **10 cm** and shows the push you need, how far your hands move, and the work in and the work out side by side.\n\nTry these:\n\n- Make **Effort Arm** ten times **Load Arm**. The push drops to 60 N -- and your hands must move a whole metre.\n- Now make **Load Arm** longer than **Effort Arm**. The mechanical advantage falls **below 1**: you push harder than the rock weighs, but your hands move less than the rock does.\n\nThat second one is not useless. It is how your forearm works (L2B1): the muscle pulls close to the elbow with a big force, so your hand moves far and fast.\n\nWhatever you do, watch the two work bars.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The two work bars never change. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An advert says:\n\n*\"Our Super Lever lets you lift a 1,000 N load by 1 m, pushing with just 100 N through only 2 m!\"*\n\nCould any lever do that?",
            options: [
                { id: 'right', label: "No. Work out would be 1,000 N x 1 m = 1,000 J, but work in only 100 N x 2 m = 200 J. No lever can make the missing 800 J. A 100 N push would have to move 10 m.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes, if the effort arm is ten times the load arm. That multiplies the force by ten, so 100 N lifts 1,000 N.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Half of that is true. An effort arm ten times the load arm **does** let 100 N lift 1,000 N. The advert's lie is in the **distance**.\n\nWith a mechanical advantage of 10, your hands move ten times as far as the load:\n\n| | Force | Distance moved | Work |\n| --- | --- | --- | --- |\n| Load | 1,000 N | 1 m | **1,000 J** |\n| Your push, as advertised | 100 N | 2 m | **200 J** |\n| Your push, for real | 100 N | 10 m | **1,000 J** |\n\nThe advertised lever puts in 200 J and gets out 1,000 J. It would be creating energy, and nothing can do that.\n\n**A lever can change the force or the distance, but force x distance stays the same.**",
            options: [
                { id: 'retry', label: "The distance gives the lie away.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A lever is a bargain, not a gift: it divides the force by exactly the factor it multiplies the distance.**\n\nThat answers Big Idea 5's question, *How can a small force do a big job?* It can, by moving further. Every machine that multiplies force makes this same trade -- a ramp, a screw, the gears and pulleys of P13.\n\nThe rest of Big Idea 5 at Level 2 keeps the same books:\n\n- **C5** -- a push on a gas packs more of it into a drink, and exactly that much comes back out\n- **B5** -- a small rise in your temperature switches on a flow of millions of joules, paid for in grams of sweat",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Less force, more distance!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the price of a lever.**\n\n- **Work = force x distance moved**, in **joules (J)**\n- 1 J is 1 N moving something 1 m\n- Torque uses distance **from the pivot**; work uses distance **moved**\n- **Mechanical advantage = load force / effort force**\n- It also equals effort arm / load arm, and distance hands move / distance load moves\n- The rock: 600 N x 0.10 m = **60 J** out; 120 N x 0.50 m = **60 J** in\n- **work in = work out** for an ideal lever: rigid, no friction\n- A real lever needs slightly more work in, never less\n- A mechanical advantage below 1 trades force for speed, as in your forearm\n- Any claim of more work out than in is impossible\n\nNext in C5: how pressure packs gas into a drink.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Work in = work out!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Lever's Bargain!**\n\nP5 balanced the seesaw. Level 2 set it moving, and found what a small force pays to do a big job.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Work | **force x distance moved** | Measured in joules |\n| Torque | force x distance from pivot | Same shape, different distance |\n| Mechanical advantage | **load force / effort force** | How many times the force is multiplied |\n| The same number | effort arm / load arm | Read it off the lever |\n| The rock | 60 J in, 60 J out | Force ÷ 5, distance x 5 |\n| Ideal lever | **work in = work out** | Rigid bar, no friction |\n| Real lever | work in slightly more | Friction and bending |\n| The advert | 200 J in, 1,000 J out | Impossible |\n\n**The one line to remember:** a lever lets a small force do a big job by moving further -- force x distance moved never changes.\n\n**Up next:** C5 -- how much gas a drink can hold."
        }
    };
}
