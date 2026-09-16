import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P13 "Gears & Pulleys".
 *
 * L2P5 costed the lever and said outright that gears and pulleys belong to Big
 * Idea 13. This lesson pays that debt: gear ratio = driven teeth / driver
 * teeth, turns divide by it, turning force multiplies by it, and torque x
 * turns each minute stays put. Pulleys get the same treatment through the
 * number of rope segments holding the load.
 *
 * Frame of reference stated: the ratio is written driven over driver, so a
 * ratio above 1 means the driven wheel turns slower. Condition stated: ideal
 * machines, no friction. Held fixed and named for Level 3: one pair of gears
 * and no losses.
 */
export function getL2P13Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P13 showed a small gear turning a big one: the big one turns more slowly, but with more turning force. L2P5 costed a lever the same way, and left gears and pulleys to this Big Idea.\n\nSo here are the numbers. A **20-tooth** gear drives a **60-tooth** gear. The small one spins **30 times a minute**.\n\nHow fast does the big gear turn?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "10 times a minute. The big gear has three times as many teeth, so it takes three turns of the small gear to move it round once.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "90 times a minute. The big gear is three times bigger, so it gets three times as many turns.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Follow the teeth. They are the only thing the two gears share: every tooth that leaves the small gear has to push exactly one tooth of the big gear.\n\nSo count. One turn of the small gear pushes **20** teeth past the meeting point. The big gear has **60** teeth to get through before it has gone round once.\n\n60 / 20 = **3 turns** of the small gear for **1 turn** of the big one.\n\nBigger does not mean faster. Bigger means **more teeth to get through**, so a bigger gear turns more slowly — and, as you will see, pushes harder while it does.",
            options: [
                { id: 'cont', label: "How much harder does it push?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two definitions, and then the bargain.\n\nThe gear you turn is the **driver**; the one it turns is the **driven** gear. The **gear ratio** compares their teeth:\n\n**gear ratio = teeth on the driven gear / teeth on the driver**\n\nThe frame of reference is the order of that fraction: **driven on top**. A ratio above 1 means the driven gear turns **slower** than the driver.\n\n**turns of the driven gear = turns of the driver / gear ratio**\n\nNow the force. From P5, **torque** is turning force: a force multiplied by its distance from the centre, measured in **newton metres (N m)**. Gears trade turns for torque, exactly as a lever trades distance for force:\n\n**torque out = torque in x gear ratio**\n\nSo the driven gear turns slower by the ratio and pushes harder by the ratio. Multiply the two together and nothing has changed:\n\n**torque x turns each minute is the same on both gears**\n\nThat is L2P5's rule wearing new clothes. A machine cannot make energy; it can only rearrange how it is delivered.\n\nThe condition belongs here. **These are ideal gears**: rigid teeth, and no friction. Real gears lose a little to rubbing and warm up slightly.",
            options: [
                { id: 'cont', label: "Work the numbers through.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The gear pair.** Driver 20 teeth at 30 turns a minute, with a torque of **6 N m**. Driven gear: 60 teeth.\n\n**Step 1.** gear ratio = 60 / 20 = **3**\n\n**Step 2.** turns of the driven gear = 30 / 3 = **10 a minute**\n\n**Step 3.** torque out = 6 x 3 = **18 N m**\n\n**Step 4. Check the books.** 6 x 30 = **180**, and 18 x 10 = **180** ✓ — torque times turns is unchanged.\n\n| | Teeth | Turns each minute | Torque |\n| --- | --- | --- | --- |\n| Driver | 20 | 30 | 6 N m |\n| Driven | 60 | **10** | **18 N m** |\n\n**Now the pulley.** A block weighs **1,000 N** and must rise **2 m**. The rope runs through a block and tackle with **4 rope segments holding the load**.\n\nThe load's weight is shared between those segments, so:\n\n**force you pull with = load weight / number of supporting segments** = 1,000 / 4 = **250 N**\n\n**length of rope you pull = height x number of segments** = 2 x 4 = **8 m**\n\n**Check the books**, with L2P5's work = force x distance:\n\n- work out = 1,000 N x 2 m = **2,000 J**\n- work in = 250 N x 8 m = **2,000 J** ✓\n\nA quarter of the force, four times the rope. Same joules.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **12-tooth** driver spins at **120 turns a minute** with a torque of **2 N m**. It drives a **36-tooth** gear.\n\nHow fast does the driven gear turn, and with how much torque?",
            options: [
                { id: 'right', label: "40 turns a minute, with 6 N m. The ratio is 36 / 12 = 3, so the turns divide by 3 and the torque multiplies by 3.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "360 turns a minute, with 6 N m — the bigger gear multiplies both.", nextNodeId: 'math_wrong' },
                { id: 'no_torque', label: "40 turns a minute, still with 2 N m. Gears change speed, not force.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**360 turns with 6 N m** would multiply both. Check it against the books: 2 x 120 = 240 going in, but 6 x 360 = 2,160 coming out. The gears would be making energy out of nothing, nine times over.\n\n**40 turns with 2 N m** loses the other half of the bargain. Torque times turns would fall from 240 to 80, so a third of the energy would have vanished. Ideal gears neither make nor lose it.\n\n**Step 1.** gear ratio = 36 / 12 = **3**\n\n**Step 2.** turns = 120 / 3 = **40 a minute**\n\n**Step 3.** torque = 2 x 3 = **6 N m**\n\n**Check:** 2 x 120 = 240, and 6 x 40 = 240 ✓",
            options: [
                { id: 'retry', label: "Divide the turns, multiply the torque.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a driver spinning at **60 turns a minute** with a torque of **5 N m**.\n\n**Driver Teeth** is the number of teeth on the gear you turn. **Driven Teeth** is the number on the gear it turns.\n\nThe lab draws both gears, works out the ratio, and shows the turns and the torque of each — with the product of the two beside them.\n\nTry this:\n\n- Set **20** and **60**: a ratio of 3, so 20 turns a minute and 15 N m\n- Swap them — **60** driving **20**: a ratio of 1/3, so 180 turns a minute and only 1.7 N m. That is a bicycle's top gear\n- Make the two numbers **equal**: the ratio is 1, and nothing is traded\n- Whatever you choose, watch torque x turns. It never moves",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Turns down, torque up. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A shop advertises a winch:\n\n*\"Our gearbox gives you **five times** the turning force — five times the work from the same motor!\"*\n\nThe gearbox really does have a gear ratio of 5. Is the advert right?",
            options: [
                { id: 'right', label: "No. Five times the torque comes with a fifth of the turns, so torque x turns is unchanged: the same work each minute, just delivered slower and harder.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. The gear ratio multiplies the turning force by 5, so the winch does five times as much work.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The torque really is multiplied by 5 — that half of the advert is true. The lie is what it leaves out.\n\n| | Torque | Turns each minute | Torque x turns |\n| --- | --- | --- | --- |\n| Motor | 4 N m | 100 | **400** |\n| After the gearbox | **20 N m** | **20** | **400** |\n\nThe winch pulls five times harder and hauls the rope in five times more slowly. Lifting a load 10 m takes five times as long as it would without the gearbox.\n\nThat is worth buying — a motor too weak to lift something at all can lift it slowly — but it is not five times the work. It is the same work, rearranged. And a real gearbox gives back a little less than it takes in, because its teeth rub.\n\n**No machine gives you more work than you put in.** Gears, pulleys and levers all trade one thing for another.",
            options: [
                { id: 'retry', label: "Five times the torque, a fifth of the turns.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A gear ratio trades turns for torque, and a pulley trades rope for force — and in both, the books balance.**\n\nThat is what P13 means by structure shaping function. Nothing about the metal changed: only the **number of teeth** and the **number of rope segments**. Those counts decide what the machine can do.\n\nOne thing this lesson held fixed: **one pair of gears, working perfectly.** Real machines chain several pairs together, and every pair rubs and warms. Level 3 puts the pairs in a row -- and finds that the ratios multiply, and so do the losses.\n\nC13 said a plastic's properties come from its chains. C13 at Level 2 counts how long those chains really are.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Turns for torque, rope for force!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed the gear and the pulley.**\n\n- The gear you turn is the **driver**; the one it turns is the **driven** gear\n- **gear ratio = driven teeth / driver teeth** -- driven on top\n- **turns out = turns in / gear ratio**\n- **torque out = torque in x gear ratio**, in newton metres\n- **torque x turns each minute is unchanged** -- L2P5's work rule again\n- 20 teeth driving 60, at 30 turns a minute and 6 N m: **10 turns a minute, 18 N m**\n- Check: 6 x 30 = 18 x 10 = **180**\n- 12 driving 36 at 120 turns and 2 N m: **40 turns, 6 N m**\n- Pulley: **force = load weight / supporting rope segments**\n- **rope pulled = height x segments**: 1,000 N up 2 m on 4 segments is **250 N through 8 m**\n- Both give **2,000 J**: a quarter of the force, four times the rope\n- Condition: ideal gears and pulleys, with no friction\n- Held fixed: one pair of gears, and no losses",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Torque x turns never moves!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Gears and Pulleys: The Same Bargain!**\n\nP13 spun the gears. Level 2 counts the teeth and checks the books.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Gear ratio | **driven teeth / driver teeth** | Driven on top |\n| Turns | **turns in / ratio** | 20 driving 60: three times slower |\n| Torque | **torque in x ratio** | Three times harder |\n| The books | **torque x turns unchanged** | 6 x 30 = 18 x 10 |\n| A bicycle's top gear | ratio 1/3 | Faster, weaker |\n| Pulley force | **weight / supporting segments** | 1,000 N on 4 segments: 250 N |\n| Pulley rope | **height x segments** | 2 m lift, 8 m pulled |\n| Both machines | 2,000 J in, 2,000 J out | Nothing is created |\n\n**The one line to remember:** counting teeth or rope segments tells you exactly how much force a machine multiplies -- and exactly how much speed or distance it costs.\n\n**Up next:** C13 -- how long a plastic's chains really are."
        }
    };
}
