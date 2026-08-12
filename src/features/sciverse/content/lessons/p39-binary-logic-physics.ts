import { DialogNode } from '../../types';

export function getP39Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A computer can play music, edit photos, and land a spacecraft. Inside, it is doing exactly one thing: switching billions of tiny **switches** on and off.\n\nThat is all. No words, no pictures, no numbers -- just **on** and **off**.\n\nWhy do you think computers use only two states instead of ten, like our counting system?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'reliable', label: "Two states are easy to tell apart, so noise and small errors cannot confuse the machine.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple', label: "Because two is the smallest number, and engineers wanted the simplest possible design.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Simplicity is nice, but the real reason is **reliability**.\n\nImagine a wire that should carry ten different voltage levels to represent 0 through 9. Electrical noise nudges every signal slightly. A level meant to be \"6\" drifts and gets read as \"5\" -- and your answer is wrong.\n\nNow use only two levels: near 0 volts is **off**, near 5 volts is **on**. Noise would have to be enormous to turn one into the other. A signal at 4.2 volts is still obviously \"on\".\n\nTwo states means a huge safety margin. That is why computers made of billions of parts can run for years without a single arithmetic mistake.",
            options: [
                { id: 'cont', label: "So two states are much harder to confuse?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! One switch holds one **bit** -- a single 0 or 1. Combine switches and you can build anything.\n\nThe real magic is combining them into **logic gates**, which are just rules about switches:\n\n1. **AND gate** -- output is on **only if both** inputs are on\n2. **OR gate** -- output is on if **either** input is on\n3. **NOT gate** -- flips the input: on becomes off\n\nAn AND gate is two switches **in a row** -- electricity must get past both. An OR gate is two switches **side by side** -- either path works.\n\nThat is genuinely the whole foundation. Stack enough gates and you get arithmetic, memory, and every app on your phone.\n\nSlide **Input Switches** through all four combinations and compare AND with OR!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me try all the switch combinations!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A car should sound its seatbelt alarm only when **the engine is running AND the belt is unbuckled**.\n\nAn engineer wires it with an **OR** gate by mistake. What happens?",
            options: [
                { id: 'right', label: "The alarm sounds far too often -- it goes off whenever either condition is true, including a parked car with an unbuckled belt.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing noticeable -- AND and OR both combine two inputs, so the alarm behaves about the same.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "They both combine two inputs, but they give **opposite answers most of the time**! Look at all four cases:\n\n| Engine | Belt off | AND says | OR says |\n| --- | --- | --- | --- |\n| off | no | quiet | quiet |\n| off | yes | quiet | **ALARM** |\n| on | no | quiet | **ALARM** |\n| on | yes | **ALARM** | **ALARM** |\n\nAND and OR agree on only 2 of the 4 rows. With the OR gate the alarm shrieks at a parked car, and even at a driver who is properly buckled in.\n\nA table like this is called a **truth table**, and engineers build one for every gate. Getting AND and OR mixed up is one of the classic ways real products ship broken.",
            options: [
                { id: 'retry', label: "Oh -- AND and OR disagree on half the cases!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **The gate you choose *is* the logic of the machine.**\n\n- **Binary** uses two states because they are almost impossible to confuse\n- One switch stores one **bit**\n- **AND** needs both; **OR** needs either; **NOT** flips it\n- A **truth table** lists every possible case, so nothing gets missed\n- Millions of gates together make a whole computer\n\nBut what is a switch actually *made of* at that size? Not metal levers -- something far stranger. Find out in C39!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The gate choice decides how the machine thinks!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how computers make decisions!**\n\n- Computers use **binary** -- only on and off\n- Two states resist electrical **noise**, so answers stay correct\n- One switch holds one **bit**\n- **AND** needs both inputs on; **OR** needs either; **NOT** flips it\n- A **truth table** checks every possible combination\n- Billions of these gates together become a computer\n\nNext in C39: the strange material that makes these switches possible!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "On, off, and a few rules build everything!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P39 Complete -- On, Off, Answer!**\n\nEvery computer decision is built from switches and three simple rules.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Computers use two states | **Binary**: on and off | Noise cannot confuse them |\n| One switch is one **bit** | The smallest piece of data | Everything is built from these |\n| AND, OR, NOT | **Logic gates** | The rules of decision making |\n| Check every case | The **truth table** | Catches design mistakes |\n\n**Up next:** C39 (The Magic Middle) -- the material that switches billions of times a second!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
