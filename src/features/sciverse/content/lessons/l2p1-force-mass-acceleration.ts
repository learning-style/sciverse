import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P1 "Push, Pull, Slide".
 *
 * Level 1 established that forces start and stop motion. This lesson adds net
 * force and a = F/m, which puts a quantity on top of a fraction and another
 * underneath it -- the same "where does the number sit" reading that L2P49
 * makes explicit.
 */
export function getL2P1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you learned that a push or a pull can start something moving. Now we can work out **exactly how fast it speeds up**.\n\nHere is the situation. A crate with a **mass** of **20 kilograms** sits on a floor.\n\nYou push it with a force of **60 newtons**. A **newton** (**N**) is the unit of force -- about the push you need to lift a small apple.\n\nBut the floor drags back. **Friction** pushes the other way with **20 N**.\n\nHow fast does the crate speed up?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "2 metres per second per second. The forces fight each other, so only 60 - 20 = 40 N is left over, and 40 divided by 20 kg is 2.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "3 metres per second per second, because you are pushing with 60 N and the crate is 20 kg, so 60 divided by 20 is 3.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The division is right. The number you divided is not.\n\nYou used **your** force. But your push is not the only force on that crate -- friction is pulling the other way the whole time, and the crate cannot tell the two apart. It only feels what is **left over** once they have fought it out.\n\nThat leftover has a name: the **net force**.\n\nWorking it out is just adding, once you take direction into account:\n\n- Forces pointing the **same** way **add** together\n- Forces pointing **opposite** ways **subtract**\n\nSo here: 60 N forward, 20 N backward, and the net force is 60 - 20 = **40 N** forward.\n\nOnly that 40 N does any accelerating. And that is why pushing a heavy wardrobe can leave you red-faced with nothing moving: you might be pushing with 300 N while friction pushes back with 300 N. Net force zero, acceleration zero. All that effort, and the maths says nothing is happening.",
            options: [
                { id: 'cont', label: "So I have to work out the net force first?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly. Net force first, then one short division.\n\n**acceleration = net force / mass**, usually written **a = F / m**\n\n**Acceleration** means how quickly the speed changes. Its unit is **metres per second per second** (**m/s²**), which sounds odd but says exactly what it means: how many metres per second the speed gains, every second.\n\nSo for the crate: net force 40 N, mass 20 kg.\n\na = 40 / 20 = **2 m/s²**\n\nThe crate gains 2 metres per second of speed every second. After one second it is doing 2 m/s, after two seconds 4 m/s.\n\nAnd now look at **where each quantity sits** in that fraction, because it tells you what each one does.\n\n**Force is on top.** Double the net force and you double the acceleration. That is a **direct proportion**.\n**Mass is underneath.** Double the mass and you **halve** the acceleration. That is an **inverse proportion**.\n\nOne formula, two opposite behaviours, decided purely by which side of the line each number is on.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A ball with a mass of **4 kg** has a net force of **12 N** acting on it. Assume friction is already accounted for, so 12 N really is the net force.\n\nWhat is its acceleration?",
            options: [
                { id: 'right', label: "3 m/s², because 12 divided by 4 is 3.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "48 m/s², because 12 multiplied by 4 is 48.", nextNodeId: 'math_wrong' },
                { id: 'inverted', label: "0.33 m/s², because 4 divided by 12 is about 0.33.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both slips are about **which way round** the formula goes, so here is a way to never get it wrong again: **check the sense of the answer before you trust it.**\n\n**Multiplying** gives 48 m/s². Ask what that claims -- that making a ball *heavier* makes it accelerate *more*. Push a shopping trolley empty, then push it full, and you know that is false. If heavier must mean slower, mass has to be **underneath**.\n\n**Dividing the wrong way** gives 0.33 m/s². That claims a bigger force gives a *smaller* acceleration, which is equally wrong.\n\nSo: **a = F / m = 12 / 4 = 3 m/s²**\n\nThe habit is worth more than the answer. Before writing a formula down, ask which quantities should make the result **bigger** and which should make it **smaller**. The ones that make it bigger go on top; the ones that make it smaller go underneath.",
            options: [
                { id: 'retry', label: "Bigger on top, smaller underneath.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials now.\n\n**Net Force** is the leftover force in newtons, after friction has been taken off.\n**Mass** is how much matter is being pushed, in kilograms.\n\nWatch how differently the two behave, because that difference is the whole point.\n\nDrag **Net Force** from one end to the other and the acceleration climbs in a straight line. Twice the force, twice the acceleration, every time.\n\nNow drag **Mass**. The acceleration does not fall in a straight line -- it drops steeply at first and then flattens out. Going from 1 kg to 2 kg halves it. Going from 40 kg to 41 kg barely changes it at all.\n\nThat curved shape is what an **inverse proportion** always looks like, and you have met it before. In L2P49 the ore grade sat underneath the whole rock cost and behaved exactly this way.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "One climbs straight, one curves. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A **10 kg** sled is pushed with **30 N** across smooth ice, where friction is so small we can ignore it. It accelerates at **3 m/s²**.\n\nThe same sled is now pushed onto grass with **exactly the same 30 N push**. On grass, friction drags back with **12 N**.\n\nWhat is the acceleration now?",
            options: [
                { id: 'right', label: "1.8 m/s². The net force is 30 - 12 = 18 N, and 18 divided by 10 kg is 1.8.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Still 3 m/s². The push has not changed and neither has the mass, so the acceleration cannot have changed either.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The push has not changed. But **the push is not what goes into the formula.**\n\nThis is the single most common mistake with a = F / m, and it is worth being precise about. The **F** in that formula is the **net** force -- everything left over after all the forces have fought each other. It is not the force *you* apply.\n\nOn ice there was nothing to fight, so your 30 N was also the net force, and 30 / 10 = 3 m/s².\n\nOn grass, friction takes 12 N of it away before anything is left to accelerate the sled:\n\nnet force = 30 - 12 = **18 N**\na = 18 / 10 = **1.8 m/s²**\n\nSame push, same sled, and it speeds up a little over half as quickly -- because a third of your push is now being spent just cancelling the grass.\n\n**Always work out the net force before you divide.** If you put your own force into the formula, you are quietly assuming there is no friction anywhere.",
            options: [
                { id: 'retry', label: "The F in the formula is the net force, not my push.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Net force first, then divide by the mass.**\n\nThat gives you a way of reading any object's motion:\n\n- Add up the forces, taking direction into account, to get the **net force**\n- If the net force is **zero**, the object does not accelerate -- it stays still, or keeps going at a steady speed\n- Otherwise, **a = F / m**\n- **Force is on top**, so it is a **direct proportion**: twice the force, twice the acceleration\n- **Mass is underneath**, so it is an **inverse proportion**: twice the mass, half the acceleration\n\nThat second-last point explains something Level 1 could only describe. A heavy thing is hard to get moving *and* hard to stop, and both come from the same place -- mass sits underneath, so it resists every change either way.\n\nNext, in C1, the same word turns up somewhere much smaller. If pushing a crate is a force acting on a mass, what exactly is happening when you heat something up? The particles inside are already moving -- and heating them means giving them more energy.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Net force on top, mass underneath!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put numbers on forces.**\n\n- A **newton (N)** is the unit of force -- roughly the push to lift a small apple\n- Forces the same way **add**; forces opposite ways **subtract**\n- What is left over is the **net force**\n- Zero net force means **no acceleration**, however hard you are pushing\n- **Acceleration** is how fast the speed changes, in **m/s²**\n- **a = F / m**, where F is the **net** force\n- **Force on top** -- a **direct proportion**, twice the force is twice the acceleration\n- **Mass underneath** -- an **inverse proportion**, twice the mass is half the acceleration\n- Check whether a quantity should make the answer bigger or smaller to know which side of the line it belongs on\n\nNext in C1: what heating something actually does to the particles inside it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "a = F / m, and F means net force!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Force, Mass and Acceleration!**\n\nLevel 1 said a push starts something moving. The arithmetic says **how much**, and why the same push does different things to different objects.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Forces combine | same way add, opposite subtract | Only the leftover counts |\n| Net force | 60 - 20 = 40 N | Friction is taken off first |\n| Zero net force | a = 0 | Pushing hard and nothing moves |\n| The formula | **a = F / m** | F is the **net** force |\n| Force on top | double F -> double a | **Direct** proportion, a straight line |\n| Mass underneath | double m -> half a | **Inverse** proportion, a curve |\n\n**The one line to remember:** work out the net force before you divide -- putting your own push into the formula assumes friction does not exist.\n\n**Up next:** C1 -- how much energy it takes to heat something, and why water is so stubborn."
        }
    };
}
