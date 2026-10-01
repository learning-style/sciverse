import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 22, physics. P22 said seismic waves let us
 * "see" inside the Earth and left it there. This puts a number on it.
 *
 * Two waves leave the same place at the same instant and travel at different
 * speeds, so the gap between their arrivals grows with distance. Rearranging:
 *
 *   distance = gap x (Vp x Vs) / (Vp - Vs)
 *
 * With Vp = 8.0 and Vs = 4.5 km/s that is 10.3 km for every second of gap, so a
 * 60 s gap is about 617 km. One station gives a distance, not a direction, which
 * is why three are needed.
 *
 * Still standing: this assumes both waves travel in straight lines at one speed
 * the whole way, which is wrong, and Level 3 shows how wrong and what it buys.
 */
export function getL2P22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "An earthquake happens somewhere under the sea. Nobody saw it. Within a few minutes a warning centre knows **how far away it was**, to within a few kilometres.\n\nThey did not guess. They used a stopwatch and a subtraction.\n\nP22 told you that an earthquake sends out two kinds of wave, and that **P-waves** -- **primary waves**, which squeeze and stretch the rock like a pushed spring -- run fastest and arrive first. A little **later** come **S-waves**, **secondary waves**, which shake the rock sideways instead.\n\nHere is the part P22 left out, and it is the whole trick. Both waves start at the **same instant** from the **same place**. They just travel at different speeds. So the slower one falls further behind the further it goes -- and the size of that gap tells you how far the waves have come.\n\nYour two dials are the two things the answer depends on.\n\n- **Gap Between Arrivals**, in seconds -- how long after the first shake the second one turns up.\n- **P-Wave Speed**, in kilometres per second, which depends on the rock.\n\nThink about two runners leaving a start line together, one at 8 m/s and one at 4.5 m/s. If you are told the slower one crossed the line 10 seconds after the faster one, can you work out how long the race was?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Yes -- the gap grows steadily with distance, so a measured gap must correspond to one particular distance.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No -- you would need to know when they started to work out anything.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is exactly what makes this clever, and it is worth seeing why you do **not** need the start time.\n\nIf you knew when the earthquake happened, one wave would be enough: time it, multiply by its speed, done. But nobody is standing underground with a stopwatch. **The start time is unknown.**\n\nSo use two waves instead, and subtract. Watch what happens to the unknown start time:\n\n- The P-wave arrives at **start + distance / 8.0**\n- The S-wave arrives at **start + distance / 4.5**\n- The **gap** is the second minus the first\n\n**The start time appears in both and cancels when you subtract.** What is left depends only on the distance and the two speeds.\n\nThat is the whole idea: you cannot measure when it began, so you measure something that does not care when it began.\n\nAnd the gap really does grow with distance. At 100 km it is about 10 seconds. At 600 km it is about a minute. Further out, further behind -- which is what makes the gap a measuring tape.",
            options: [
                { id: 'cont', label: "So the gap is a measuring tape. How do I read it?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Three lines of algebra, and they are worth following because the result is a number you can use.\n\nCall the distance **d**, the P-wave speed **Vp** and the S-wave speed **Vs**. Then:\n\n**gap = d / Vs - d / Vp**\n\nPut the right-hand side over a common denominator:\n\n**gap = d x (Vp - Vs) / (Vp x Vs)**\n\nNow turn it round to get the thing you actually want:\n\n**distance = gap x (Vp x Vs) / (Vp - Vs)**\n\n**The condition:** this assumes both waves travel the whole way at one steady speed, in a straight line. Rock is not uniform, so this is an approximation -- a good one for a few hundred kilometres, and Level 3 shows where it breaks.\n\nThe bracket is just a number once you know the two speeds, and it does not change as the earthquake moves. With **Vp = 8.0** and **Vs = 4.5** km/s:\n\n(8.0 x 4.5) / (8.0 - 4.5) = 36 / 3.5 = **10.3 km per second of gap**\n\nSo every second of gap means about **ten kilometres**. That is all you have to remember.\n\nOne thing this cannot tell you: **which direction.** A gap of 60 seconds says the earthquake was about 617 km away, somewhere on a circle of that radius. Which is why warning centres use **three** stations and find where the three circles cross.",
            options: [
                { id: 'cont', label: "Work one out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A station records the first shake at 09:14:23 and the second at 09:15:23.**\n\n1. **The gap:** 09:15:23 - 09:14:23 = **60 s**\n2. **The bracket**, from Vp = 8.0 and Vs = 4.5 km/s: 36 / 3.5 = **10.3 km/s**\n3. **The distance:** 60 x 10.3 = **617 km**\n\nSo the earthquake was about **617 km** from this station.\n\n**Check it forwards**, which is always worth doing. If it really was 617 km away:\n\n- The P-wave took 617 / 8.0 = **77.1 s**\n- The S-wave took 617 / 4.5 = **137.1 s**\n- Difference: 137.1 - 77.1 = **60.0 s** ✓\n\nThe numbers close, so the arithmetic is sound.\n\nAnd notice what else falls out. The P-wave took 77 seconds to arrive, so the earthquake happened at **09:14:23 minus 77 s = 09:13:06**. You have recovered the start time you never knew -- after the fact, from the distance.\n\nThat is also the basis of an **earthquake early warning**. A city 617 km away has about 77 seconds between the quake and the first shaking, and the warning travels by radio almost instantly. Seventy-seven seconds is enough to stop a train and close a gas valve.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A different station measures a gap of **30 seconds**, in rock where Vp = 8.0 and Vs = 4.5 km/s.\n\nHow far away was the earthquake?",
            options: [
                { id: 'right', label: "About 309 km -- 30 x 10.3, since the bracket is the same 10.3 km per second of gap.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'halfway', label: "About 617 km, the same as before, because the speeds have not changed.", nextNodeId: 'math_wrong' },
                { id: 'wrong', label: "About 105 km, from 30 divided by 3.5 times 8.0 divided by 4.5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**617 km** was the answer for a 60-second gap. Halve the gap and you halve the distance -- the gap and the distance are in **direct proportion**, because the bracket never changes.\n\nThe **105 km** answer has the bracket upside down somewhere. Check it against something you know: a bigger gap must mean a **bigger** distance, and the bracket must come out in kilometres per second, which 36 / 3.5 does.\n\n**30 x 10.3 = 309 km.**\n\nAnd the proportion is worth keeping, because it makes a lot of this arithmetic unnecessary:\n\n| Gap | Distance |\n| --- | --- |\n| 10 s | 103 km |\n| 30 s | **309 km** |\n| 60 s | 617 km |\n| 90 s | 926 km |\n\nEvery row is just the gap times 10.3. A seismologist reading a trace does not reach for a calculator -- they read the gap and multiply by ten.",
            options: [
                { id: 'retry', label: "Gap and distance are in direct proportion.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Gap Between Arrivals** in seconds and **P-Wave Speed** in km/s.\n\n| Gap | Vp = 6.0 km/s | Vp = 8.0 km/s | Vp = 10.0 km/s |\n| --- | --- | --- | --- |\n| 10 s | 180 km | **103 km** | 82 km |\n| 30 s | 540 km | **309 km** | 245 km |\n| 60 s | 1,080 km | **617 km** | 491 km |\n\n(Vs is held at 4.5 km/s so you can see what the P-wave speed alone does.)\n\nThe gap column behaves exactly as you would expect -- double it, double the distance. **The speed column is the surprise.**\n\nRaising Vp from 6.0 to 10.0 km/s makes the same gap mean a **much shorter** distance. That seems backwards until you see why: what matters is not how fast the waves go but **how different** the two speeds are. At Vp = 6.0 the two waves differ by only 1.5 km/s, so the gap opens slowly and a big gap means a very long way. At Vp = 10.0 they differ by 5.5 km/s, the gap opens fast, and the same gap is reached much sooner.\n\n**So the gap measures distance through the difference between the speeds, not through the speeds themselves.** Make the two speeds equal and the method dies completely -- the gap would be zero no matter how far the waves travelled.\n\nThat is a shape worth recognising, because this Big Idea uses it three times. **An instrument reads a difference.** Keep it in mind for C22 and B22.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The instrument reads a difference. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A single station reports a gap of 45 seconds and announces: *the earthquake was 463 km north-east of here.*\n\nWhat is wrong with that announcement?",
            options: [
                { id: 'right', label: "The distance is right but the direction is invented. One station gives a circle of possible places, so you need three stations to find where the circles cross.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing -- 45 x 10.3 is 463 km, so the station has done the arithmetic correctly.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The arithmetic is perfect: 45 x 10.3 = **463 km**. That is not the problem.\n\nLook at what the measurement actually contains. A gap is a **single number**, and a single number cannot carry two pieces of information. It gives you a **distance** and says nothing whatever about direction.\n\nSo what this station really knows is: *the earthquake was somewhere on a circle of radius 463 km around us.* North-east is on that circle. So is south-west, and every other bearing.\n\nThis is why seismic networks have many stations:\n\n- **One station** gives a circle.\n- **Two stations** give two circles, which cross at **two** points.\n- **Three stations** give three circles that cross at **one** point.\n\nThat is the method, and it is the same one your phone uses with satellites.\n\nIt is worth being strict about this, because it is a habit that outlasts the topic. **Ask what a measurement can physically contain before you believe what someone claims to have got out of it.** One stopwatch reading cannot become a compass bearing, however good the arithmetic.",
            options: [
                { id: 'retry', label: "One number, one circle. Three stations to pin the point.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- 45 x 10.3 = 463 km is right, and the bearing is invented. A single number cannot carry two pieces of information.\n\nOne station gives a **circle**. Two circles cross at **two** points. Three circles cross at **one**. That is how every seismic network locates a quake, and how your phone locates you from satellites.\n\nIt is a habit worth keeping: **ask what a measurement can physically contain** before believing what was got out of it.\n\nSo you can now do what P22 only described:\n\n| | P22 said | L2P22 says |\n| --- | --- | --- |\n| The waves | P-waves arrive first | they open a **gap** that grows with distance |\n| The start time | not mentioned | **cancels** when you subtract |\n| The distance | \"we can see inside\" | **gap x (Vp x Vs)/(Vp - Vs)** |\n| With 8.0 and 4.5 km/s | -- | **10.3 km per second of gap** |\n| One station | -- | a circle, not a point |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "I can locate an earthquake!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned two stopwatch readings into a distance.**\n\n- Both waves leave at the **same instant** from the **same place**, so the unknown start time **cancels** when you subtract their arrival times\n- **gap = d/Vs - d/Vp**, which rearranges to **distance = gap x (Vp x Vs) / (Vp - Vs)**\n- The bracket is a fixed number once you know the speeds: with **8.0** and **4.5** km/s it is **10.3 km per second of gap**\n- So a **60 s** gap is about **617 km**, and checking forwards gives 77.1 s and 137.1 s, a difference of exactly 60 s\n- Which also recovers the **start time** you never knew: 77 s before the first shake\n- And that 77 s is an **early warning** -- enough to stop a train, because radio outruns rock\n- Gap and distance are in **direct proportion**, so a seismologist multiplies by ten in their head\n- **What matters is the difference between the speeds, not the speeds** -- make them equal and the method dies\n- A single gap gives a **circle**, not a point, so three stations are needed\n- Removed: P22's \"we can see inside\", which named the idea and gave no number\n- Still standing: this assumes both waves travel in **straight lines at one steady speed**. They do neither, and Level 3 shows what the error is worth -- and what the error itself reveals",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Subtract, multiply by ten!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Waves Help Us See the Invisible?**\n\n**Summary Table:**\n| Idea | The Physics | The Number |\n| --- | --- | --- |\n| Two waves, one start | the start time **cancels** | nothing to measure underground |\n| The gap grows with distance | **gap = d/Vs - d/Vp** | 10 s at 103 km, 60 s at 617 km |\n| Rearranged | **d = gap x (Vp x Vs)/(Vp - Vs)** | the bracket is **10.3 km/s** |\n| A 60-second gap | -- | **617 km**, checked forwards to 60.0 s |\n| The start time, recovered | distance / Vp before the first shake | **77 s** |\n| Which buys | an early warning | 77 s to stop a train |\n| What really matters | the **difference** between the speeds | equal speeds, no method |\n| One station | a circle, not a point | **three** to cross |\n| Still standing | straight lines, one steady speed | both false -- see Level 3 |\n\n**The one line to remember:** you cannot time a wave whose start you did not see, so time two of them and subtract -- the start time cancels, and what is left is the distance.\n\n**Up next:** C22 does the same trick with light. A spectral line is a wave too, and its position is set by a difference as well -- not a difference in speed this time, but a difference between two energies inside an atom."
        }
    };
}
