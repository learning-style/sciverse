import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B15 "Predator-Prey Cycles". The synthesis
 * lesson for Big Idea 15.
 *
 * B15 showed the cycle. This lesson finds the balance point it circles:
 * change each year = births - losses, so the numbers hold steady when
 * growth rate x hares = hares caught by each lynx x lynx. Worked on 1,000
 * hares growing 60% a year against 20 lynx taking 30 each.
 *
 * It then ties the Big Idea together: P15's pendulum has a balance point with a
 * timing, C15's reaction has one with a direction, and this one has a lag --
 * which is why populations circle rather than settle.
 *
 * Condition stated: steady rates, one wood, counted per year. Held fixed and
 * named for Level 3: the rates never change, and the lag is described rather
 * than calculated.
 */
export function getL2B15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B15 showed hare and lynx numbers rising and falling in a long, repeating cycle -- and that taking the predators away entirely does not leave the hares in peace, it leaves them to boom and then crash.\n\nSomewhere in the middle of that cycle is a set of numbers that would hold **steady**: hares neither rising nor falling.\n\nWhat has to be true of that steady point?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The hares being born each year exactly match the hares lost each year. The total holds still because the two flows are equal, not because either has stopped.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "There are equal numbers of hares and lynx -- the two populations have to match for the wood to be in balance.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Count what that would mean. One lynx needs something like **30 hares a year** to live on. If there were as many lynx as hares, every lynx would be looking for thirty hares and finding one.\n\nReal numbers are nothing like equal. In the wood we are about to work with there are **1,000 hares** and **20 lynx** -- fifty hares for every lynx -- and that is the balanced state.\n\nThis is C15's mistake wearing fur. There, equilibrium did not mean equal amounts of reactant and product; it meant the **rates** matched, and the amounts settled wherever that happened -- 15 product to 5 reactant, for a reaction with K = 3.\n\nHere it is the same idea: balance is about **flows**, not about the two totals being equal.",
            options: [
                { id: 'cont', label: "So which flows have to match?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two flows, both counted in **hares per year**, for the hares of one wood. Rising numbers count as positive -- that is the frame of reference.\n\n**Births.** A hare population grows by some fraction of itself each year, its **growth rate**:\n\n**births each year = growth rate x number of hares**\n\n**Losses.** Each lynx takes a certain number of hares in a year:\n\n**losses each year = hares caught by each lynx x number of lynx**\n\nPut them together:\n\n**change each year = births − losses**\n\nAnd the balance point is where that change is **zero**:\n\n**growth rate x hares = hares caught by each lynx x lynx**\n\nRearranged, it tells you how many lynx a wood can carry while its hares hold steady:\n\n**lynx for balance = growth rate x hares / hares caught by each lynx**\n\nThe conditions. **The rates stay put** -- the growth rate and the catch do not change as numbers change, which is a simplification we will come back to. **One wood**, with nothing moving in or out. And everything is **per year**, so the answers are yearly too.",
            options: [
                { id: 'cont', label: "Put numbers in.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The wood.** 1,000 hares, growing at **60% a year**. 20 lynx, each taking **30 hares a year**.\n\n**Step 1.** births = 0.60 x 1,000 = **+600 hares a year**\n\n**Step 2.** losses = 30 x 20 = **−600 hares a year**\n\n**Step 3.** change = 600 − 600 = **0**\n\nSteady -- and busy. Six hundred hares born and six hundred lost, every year, with the total sitting still. Nothing has stopped; the two flows have simply matched, exactly as C15's forward and reverse reactions did.\n\n**Now take half the lynx away.** 10 lynx, everything else the same.\n\n**Step 1.** births = **+600**\n\n**Step 2.** losses = 30 x 10 = **−300**\n\n**Step 3.** change = **+300 hares a year**\n\nThe hares climb -- which is the first half of B15's Kaibab story, and the reason the crash came later.\n\n| Lynx | Births | Losses | Change each year |\n| --- | --- | --- | --- |\n| 30 | +600 | −900 | **−300**, hares fall |\n| **20** | +600 | −600 | **0**, steady |\n| 10 | +600 | −300 | **+300**, hares rise |\n| 0 | +600 | 0 | **+600**, hares boom |\n\nOne wood, one arithmetic, and the whole of B15's graph in four rows.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A different wood holds **2,000 hares** growing at **50% a year**. Each lynx there takes **25 hares a year**.\n\nHow many lynx would hold the hare numbers steady?",
            options: [
                { id: 'right', label: "40 lynx. Births are 0.50 x 2,000 = 1,000 a year, and 1,000 / 25 = 40.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'halved', label: "20 lynx, because this wood has twice the hares of the last one.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "25,000 lynx, because 1,000 x 25 = 25,000.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**20 lynx** copied the answer from the last wood. Two numbers changed here, not one: twice the hares but a lower growth rate and a smaller catch, so the answer has to be worked out fresh.\n\n**25,000 lynx** multiplied where it should have divided. Sense-check it: 25,000 lynx each taking 25 hares would need 625,000 hares a year from a wood holding 2,000.\n\n**Step 1.** births = 0.50 x 2,000 = **+1,000 hares a year**\n\n**Step 2.** each lynx accounts for 25 of those, so lynx = 1,000 / 25 = **40**\n\n**Step 3.** check: 40 x 25 = 1,000 = births ✓ change is zero\n\nUnits catch it too: hares per year, divided by hares per year for each lynx, leaves **lynx**.",
            options: [
                { id: 'retry', label: "Divide the births by what one lynx takes.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, and 1,000 hares growing at 60% a year to start with.\n\n**Number of Lynx** sets how many predators the wood holds. **Hares Caught by Each Lynx** sets how many each one takes in a year.\n\nThe lab draws the two flows as arrows, works out the change each year, and marks the balance point.\n\nTry this:\n\n- **20** lynx taking **30** each: the arrows match and the change is **0**\n- Drop to **10** lynx: the change jumps to **+300 a year**\n- Put the lynx back to 20 but raise the catch to **40**: now **−200 a year**, and the hares fall\n- Notice there is more than one balance point: **20 lynx at 30 each**, **24 at 25**, **15 at 40** -- anything whose product is 600\n- Set the lynx to **0** and the hares rise by 600 a year, with nothing to stop them",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Balance is where the two flows match. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** You have just found the balance point: 1,000 hares and 20 lynx, holding steady.\n\nBut B15's graph did not hold steady. It went round and round -- hares rising, lynx following, hares falling, lynx falling, over and over.\n\nIf a balance point exists, why do the numbers circle it instead of settling on it?",
            options: [
                { id: 'right', label: "Because the lynx cannot respond instantly. It takes a year or more for extra hares to become extra lynx, so by the time the lynx have caught up the hares are already falling -- and each flow keeps overshooting the point where it would balance.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Because the balance point is not really stable -- any wood that starts away from it drifts further away, so the populations can never approach it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The balance point does pull the numbers back -- that is why the graph circles it rather than running off the page. What it cannot do is stop them on the way past.\n\nFollow one turn of the cycle, and watch the **delay** do the work:\n\n| | Hares | Lynx | What happens next |\n| --- | --- | --- | --- |\n| Start | 1,000 | 10 | losses only 300, so hares **rise** |\n| A few years on | 1,600 | 10 | plenty of food, so lynx **rise** -- but slowly |\n| Later | 1,400 | 30 | losses now 900 against 840 born, so hares **fall** |\n| Later still | 700 | 30 | too little food, so lynx **fall** -- slowly |\n| And round again | 700 | 12 | losses small again, so hares **rise** |\n\nAt no point is anything pushing away from balance. Every row is the arithmetic you just did. But the lynx are always responding to **last year's** hares, so they arrive late, in both directions -- too few while the hares climb, too many once they have fallen.\n\nThat is P15's pendulum. A pendulum has a perfectly good balance point too -- hanging straight down -- and it swings past it every time, because the restoring pull takes time to turn the motion round.\n\n**A balance point plus a delay gives you a cycle. Take the delay away and you would get a settle instead.**",
            options: [
                { id: 'retry', label: "The pull is there; the response is late.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The balance point is where births match losses -- and because predators answer last year's numbers, the populations sail past it and circle instead of settling.**\n\nThat closes Big Idea 15 at Level 2, and all three lessons found the same thing: a balance point, and something that decides what happens around it.\n\n- **L2P15** -- **T = 2π √(L/g)**: a pendulum's balance point is straight down, and the length and gravity set the **timing** of each pass through it\n- **L2C15** -- **Q against K**: a reaction's balance point is a ratio, and the gap tells you the **direction** it must travel\n- **L2B15** -- **births = losses**: a population's balance point is where the flows match, and the **delay** in the answer turns it into a cycle\n\n**How do systems find balance? Not by stopping. Each one has a point where opposing flows match exactly, and it is the timing, the direction and the delay around that point that give a system its behaviour.**\n\nTwo things this lesson held fixed. **The rates never changed** -- a real wood's hares grow more slowly when crowded, and its lynx catch more when hares are thick on the ground. And the **lag was described, not calculated**. Level 3 puts numbers on both, and works out how long one turn of the cycle actually takes.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A balance point, plus a delay!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the balance point a cycle circles.**\n\n- Frame of reference: hares in one wood, counted **per year**, rising counts as positive\n- **births each year = growth rate x number of hares**\n- **losses each year = hares caught by each lynx x number of lynx**\n- **change each year = births − losses**, and balance is where it is **zero**\n- So **growth rate x hares = catch x lynx**, giving **lynx for balance = growth rate x hares / catch**\n- 1,000 hares at 60%: births **+600 a year**; 20 lynx at 30 each: losses **−600**; change **0**\n- Halve the lynx to 10 and the change becomes **+300 a year** -- the start of a boom\n- 30 lynx gives **−300 a year**; no lynx gives **+600**\n- 2,000 hares at 50% with a catch of 25 needs **40 lynx** to hold steady\n- Balance is about **flows**, not about the two totals being equal -- fifty hares for each lynx is the balanced state\n- Many balance points share one wood: 20 lynx at 30, 24 at 25, 15 at 40\n- The numbers **circle** the balance point because predators answer **last year's** hares\n- A balance point **plus a delay** makes a cycle; without the delay it would settle\n- Held fixed: rates that never change, and a lag described rather than calculated",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Births minus losses!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- When Do the Numbers Hold Steady?**\n\nB15 showed the cycle. Level 2 finds the point it goes round.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Births | **growth rate x hares** | +600 a year at 60% of 1,000 |\n| Losses | **catch x lynx** | −600 a year from 20 lynx at 30 |\n| Change | **births − losses** | Zero at the balance point |\n| Lynx for balance | **growth x hares / catch** | 2,000 at 50% and 25 needs **40** |\n| Fewer predators | 10 lynx | **+300 a year**, then a crash |\n| Balance is flows | 1,000 hares to 20 lynx | Not equal totals |\n| Why it cycles | predators answer **last year** | Overshoot in both directions |\n| P15's version | **T = 2π √(L/g)** | Balance point with a **timing** |\n| C15's version | **Q against K** | Balance point with a **direction** |\n| Held fixed | steady rates, lag not calculated | Level 3 does both |\n\n**The one line to remember:** a system is balanced when its opposing flows match -- and because the answer to a change arrives late, the numbers swing past the balance point instead of stopping on it.\n\n**Big Idea 15 is complete at Level 2.**"
        }
    };
}
