import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 25, chemistry. Mechanism + Limit.
 *
 * L2C25 had a hidden assumption it never wrote down. Every cycle destroyed one
 * ozone molecule and handed back ONE chlorine atom, so the number of carriers never
 * changed -- it was 1 from the first cycle to the last. That is why its chain always
 * faded, and why it could only ever produce a big number and never a runaway.
 *
 * Remove it. Let b be the average number of carriers handed back per cycle:
 *
 *   total cycles from one carrier = 1 / (1 - b)       for b < 1
 *   carriers after n generations  = b^n
 *
 * It generalises L2C25 rather than replacing it: a stopping chance p means b = 1 - p,
 * and 1/(1-b) = 1/p exactly, which is verified in the lesson and in Python.
 *
 * And it uncovers a threshold L2C25 could not represent. b = 0.99 gives 100 cycles,
 * b = 0.999 gives 1000, b = 1 gives no finite total at all, and b = 1.01 gives 20,959
 * carriers after a thousand generations and climbing. A 2% change in b is the
 * difference between a reaction that fades and one that explodes -- the sharpest
 * tiny-change-big-effect in the Big Idea.
 *
 * The real anchor is branching in a hydrogen flame, H + O2 -> OH + O, where one
 * radical becomes two, and the explosion limits that follow from it.
 *
 * This is also where the Big Idea's Level 3 unification starts to show: L3P25's
 * multiplier was a slope, this one is a count of carriers, and both have their
 * dividing line at exactly 1. L3B25 closes it with the third.
 *
 * Frame of reference stated: b is counted per cycle, as carriers out over carriers
 * in, averaged over many cycles.
 *
 * Still standing: b is treated as a fixed average when it really depends on pressure
 * and temperature, which is why real explosion limits are a curve rather than a
 * number. And a runaway is never truly infinite -- it stops when the fuel is gone,
 * which this arithmetic has no way to know.
 */
export function getL3C25Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C25 had an assumption so quiet it never got written down, and it was doing all the work.\n\nGo back and count the carriers. A chlorine atom wrecks an ozone molecule and **is chlorine again**. One carrier in, one carrier out. Next cycle: one in, one out. **The number of carriers was 1 from the first cycle to the last**, and it could never be anything else.\n\nThat is why L2C25's chain always faded. A chain whose carrier count can only stay the same or drop to zero has nowhere to go but down, so the only question was *how long until it drops* -- and the answer was a big number, 100,000, and never a runaway.\n\nBut look at this reaction, which happens in every hydrogen flame:\n\n**H + O2 -> OH + O**\n\nCount again. **One** reactive piece went in. **Two** came out -- the OH and the O are both reactive, both able to carry the chain on. The carrier count did not stay the same. It **doubled**.\n\nThat is called **branching**, and it is a different kind of chain entirely.\n\nSo define the thing L2C25 silently fixed at 1. Let **b** be the average number of carriers handed back per cycle -- carriers out divided by carriers in, averaged over many cycles.\n\n- **b below 1**: the chain is losing carriers. L2C25's whole world\n- **b above 1**: the chain is gaining them\n\nYour two dials:\n\n- **Carriers Handed Back b**, from 0.90 to 1.10.\n- **Generations**, how many cycles deep to follow it.\n\nBefore any arithmetic. b is a number near 1, and you are going to move it by a couple of percent. **How much can that possibly matter?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'little', label: "A couple of percent should change the answer by a couple of percent.", nextNodeId: 'misconception' },
                { id: 'lots', label: "If 1 is a dividing line, crossing it could change everything.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Set **b** to 0.99 and look at the total. Now set it to 1.01 and look again.\n\n0.99 gives a chain that runs **100 cycles** and stops. 1.01 gives a chain that **never stops** -- after a thousand generations there are about **21,000** carriers where there was one, and still climbing.\n\nThe dial moved by two parts in a hundred. The outcome went from *a hundred cycles* to *no end at all*.\n\nThis is a different shape from anything in Level 2. There, a small change gave a proportionally large change -- halve the stopping chance and the damage doubles, which is dramatic but orderly. **Here there is a dividing line, and the two sides of it are not different by a factor. They are different in kind.**\n\nOne side is a reaction that fades out. The other side is an explosion. And the line between them is not at some special chemical value -- it is at **b = 1**, which is just the number that separates *losing carriers* from *gaining them*.",
            options: [
                { id: 'cont', label: "Why would 1 be the line?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Because b = 1 is the point where each generation exactly replaces itself.\n\nStart with one carrier. After one cycle there are **b**. After two there are **b x b**, and after n generations:\n\n**carriers after n generations = bⁿ**\n\nSo everything hangs on whether b is above or below 1, because that is the only thing that decides which way a repeated multiplication goes. Below 1 and bⁿ heads for zero. Above 1 and it heads for infinity. **At exactly 1 it stays put for ever, which is why that is the line.**\n\nNow add up all the cycles the whole chain ever manages, starting from one carrier. That is 1 + b + b² + b³ + ... for ever, and if b is below 1 that sum has a finite answer:\n\n**total cycles = 1 / (1 - b)**, for b below 1\n\nFor b at or above 1 there is **no finite total**. Not a very large one -- none, because the series never settles.\n\n**And check it against L2C25 before trusting it.** There, the carrier was stopped with chance **p** each cycle, so it was handed back with chance 1 - p, which means **b = 1 - p**. Put that in:\n\n1 / (1 - b) = 1 / (1 - (1 - p)) = **1 / p**\n\nwhich is exactly L2C25's chain length. So this is not a different formula. **It is the same formula with the lid taken off** -- L2C25 was living in the part of it where b can never reach 1, because a chain with no branching cannot hand back more than it got.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me the two sides of the line.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Below the line.** b = 0.99, so each cycle hands back 99 carriers for every 100 it got.\n\n1 / (1 - 0.99) = 1 / 0.01 = **100 cycles**\n\nPush it closer: b = 0.999 gives 1 / 0.001 = **1000 cycles**. b = 0.9999 gives **10,000**.\n\nSo as b creeps towards 1 the total climbs without limit -- and notice the shape, because you have met it before. **1 / (1 - b)** is a reciprocal of a difference, and it blows up as that difference closes. This is the same reciprocal as L2C25's chain length, now measuring the distance to a threshold rather than a stopping chance.\n\n**Above the line.** b = 1.01, so 101 carriers out for every 100 in. The formula gives 1/(1 - 1.01), which is 1 divided by **minus** 0.01 -- a negative total, which is nonsense, and the nonsense is informative. **A formula returning an impossible answer is telling you its condition has been broken.** There is no total because the chain never finishes.\n\nFollow it instead:\n\n| Generations | Carriers, b = 0.99 | Carriers, b = 1.01 |\n| --- | --- | --- |\n| 10 | 0.90 | 1.10 |\n| 100 | 0.37 | **2.70** |\n| 500 | 0.01 | **145** |\n| 1000 | 0.00 | **20,959** |\n\nSame number of generations, same starting carrier, and the two columns are not comparable quantities any more. One died. The other is accelerating.\n\n**Two percent on b. The difference between a flame going out and an explosion.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A chain hands back **b = 0.95** carriers per cycle.\n\nHow many cycles does the whole chain manage, starting from one carrier?",
            options: [
                { id: 'twenty', label: "20", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ninetyfive', label: "95", nextNodeId: 'math_wrong' },
                { id: 'five', label: "5", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The distance to the threshold is what goes in the denominator:\n\n1 - 0.95 = **0.05**, and 1 / 0.05 = **20 cycles**\n\n95 is b read as a percentage of something, which it is not -- b is a **ratio of counts**, carriers out over carriers in, and it can perfectly well be bigger than 1. That is the whole point of the lesson.\n\n5 is the distance to the threshold expressed as a percentage, 0.05 x 100, without the reciprocal. It is the right quantity and it has not been turned upside down -- and it is worth noticing that 5 and 20 are reciprocals of each other, which is exactly the relationship you keep needing here.\n\n**The number that matters is the gap to 1, and the answer is one over it.** A chain at b = 0.95 is 0.05 from the threshold and manages 20 cycles; a chain at 0.999 is 0.001 away and manages 1000. **How close you are to 1 is the only thing the total depends on.**",
            options: [
                { id: 'retry', label: "One over the gap to 1.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. Each generation is drawn as a bar whose height is the number of carriers, so you can see which way the chain is going before reading a number.\n\nThings worth doing:\n\n- Put **b** at 0.95 and run 40 generations. The bars shrink away to nothing -- the chain is dying, and the total is 20 cycles.\n- Set b to exactly **1.00**. Every bar is the **same height**, for ever. That is the threshold, and it is the only setting where the picture is a flat line. Neither growing nor shrinking, which is what the dividing line looks like.\n- Now **1.05**. The bars climb, slowly at first, and then the plot cannot hold them. Nothing special happened at 1.05 -- it is only a little above 1.00 -- but the picture is a different thing entirely.\n- Walk b from 0.95 up to 1.05 one notch at a time and watch the **total**: 20, 25, 33, 50, 100, then no total at all. **The total does not rise smoothly to a big number and carry on. It runs off to infinity at exactly 1.00 and then stops existing.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A mixture of hydrogen and oxygen in a flask at a fixed temperature. The branching reaction H + O2 -> OH + O is making carriers; collisions with the flask **walls** are destroying them.\n\nAt **low pressure** the mixture sits there quietly and nothing happens.\n\nThe pressure is raised a little, and it **explodes**.\n\nThe experimenters then raise the pressure a great deal more, and it goes **quiet again** -- no explosion.\n\nThe first two make sense with this lesson. What does the third one tell you?",
            options: [
                { id: 'new', label: "Some other way of destroying carriers must take over at high pressure, pushing b back below 1.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The lesson must be wrong — b cannot go back down once it is above 1.", nextNodeId: 'checkpoint_wrong' },
                { id: 'fuel', label: "The mixture must have run out of hydrogen.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is nothing in this lesson that says b can only go up. **b is an average over the conditions**, and if the conditions change, b changes -- which means pressure can push it up *and* pull it back down, if it affects the two kinds of step differently.\n\nAnd it does.\n\n- **low pressure:** the carriers travel far between collisions, reach the **walls** and are destroyed there. Termination wins, **b is below 1**, nothing happens\n- **a little higher:** fewer carriers reach the walls, so branching wins. **b crosses 1**, and it explodes\n- **much higher:** now the carriers are so crowded that **three** of them meet at once, and a three-body collision mops them up in the gas itself without needing a wall. That termination step gets rapidly more likely as the pressure rises, faster than branching does -- so **b is pushed back below 1** and it is quiet again\n\nSo the mixture has **two** explosion limits, a lower and an upper, with a dangerous band between them. They are real, they are measured, and this lesson predicted that such a thing could exist before knowing the chemistry -- because *quiet, explosive, quiet* is just **b below 1, above 1, below 1**.\n\nThe third answer is tempting but the timing is wrong: the mixture goes quiet **immediately** on raising the pressure, with all its fuel intact.",
            options: [
                { id: 'retry', label: "A different termination step takes over.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly, and that is a genuine prediction rather than a story told afterwards.**\n\nIf the behaviour is governed by whether b is above or below 1, then any quantity that pushes b up and then down again must produce **quiet, explosive, quiet** as you turn it. Pressure does precisely that, because it helps branching at first and then helps a three-body termination even more.\n\nSo the mixture has a **lower explosion limit** and an **upper** one, with a dangerous band in between. Both are measured, and chemists designing anything that handles hydrogen have to know both.\n\nAnd now compare this with **L3P25**, because they are the same lesson.\n\n- there, a difference was multiplied each step by the rule's **slope**, and the dividing line was at **|slope| = 1**\n- here, carriers are multiplied each cycle by **b**, and the dividing line is at **b = 1**\n\nTwo different subjects, two different multipliers, **the same threshold** -- and in both the quantity that blows up is the reciprocal of the distance to it. **A repeated multiplication has only ever had one question: is the multiplier above or below 1?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The same threshold again!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You took the lid off L2C25's formula.**\n\n- L2C25 never wrote down its real assumption: **one carrier in, one carrier out**, so the carrier count was 1 from the first cycle to the last and the chain could only ever fade\n- **Branching** breaks it. H + O2 -> OH + O puts in one reactive piece and gets out **two**\n- So let **b** be the carriers handed back per cycle, averaged over many. **carriers after n generations = bⁿ**\n- **total cycles = 1 / (1 - b)**, for b below 1. At or above 1 there is **no finite total at all** -- not a large one, none\n- It **generalises** L2C25 rather than replacing it: a stopping chance p means b = 1 - p, and 1/(1-b) = **1/p** exactly, which is the old chain length\n- b = 0.95 gives **20** cycles, 0.99 gives **100**, 0.999 gives **1000**. **How close b is to 1 is the only thing the total depends on**\n- Above the line the formula returns a **negative** total, which is nonsense -- and the nonsense is useful. **A formula returning an impossible answer is telling you its condition has been broken**\n- b = 0.99 against b = 1.01: after 1000 generations, **nothing left** against **20,959 carriers and climbing**. Two percent on b is a flame going out against an explosion\n- At exactly **b = 1.00** every generation is the same size for ever, and the picture is a **flat line**. That is what a dividing line looks like\n- The total does not rise smoothly past 1. It **runs to infinity at exactly 1.00 and then stops existing**\n- **And b can be pushed back down.** Pressure helps branching at first and then helps a three-body termination even more, which is why hydrogen and oxygen have a **lower and an upper explosion limit** with a dangerous band between -- *quiet, explosive, quiet* is just **b below 1, above 1, below 1**\n- **Same lesson as L3P25.** There the multiplier was a **slope** and the line was at **|slope| = 1**; here the multiplier is a **count of carriers** and the line is at **b = 1**. In both, the quantity that blows up is one over the distance to the threshold. **A repeated multiplication has only ever had one question**\n- **Still standing:** b was treated as a fixed average, when it depends on pressure and temperature -- which is exactly why real explosion limits are a **curve** rather than a number, and why the flask had two of them. And a runaway is never really infinite: it stops when the fuel is gone, which this arithmetic has no way to know.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3C25", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Chemistry Complete -- How Can Tiny Changes Cause Big Effects?**\n\nL2C25 was a special case and did not know it.\n\n**Summary Table:**\n| | L2C25 said | L3C25 says |\n| --- | --- | --- |\n| Carriers per cycle | **one** out for one in, silently | **b**, which can exceed 1 |\n| What that allowed | a chain that only **fades** | fading **or** running away |\n| The formula | chain length = 1 / stopping chance | **total = 1 / (1 - b)**, for b below 1 |\n| Do they agree? | -- | **yes**: b = 1 - p gives 1/p exactly |\n| The threshold | none -- there could not be one | **b = 1** |\n| Above it | -- | **no finite total**, and a negative answer warning you |\n| 0.99 against 1.01 | -- | **nothing left** against **20,959 and climbing** |\n| At exactly 1.00 | -- | every generation the same size: a **flat line** |\n| The real system | -- | hydrogen's **two** explosion limits, lower and upper |\n| Against L3P25 | -- | a **slope** against 1, a **count** against 1. Same line |\n| Still standing | -- | b depends on pressure, so real limits are a **curve** |\n\n**The one line to remember:** once a cycle can hand back more than it was given, the only question left is whether that number is above or below 1 -- and because the total is one over the distance to that line, a reaction two percent short of it fades after a hundred cycles while one two percent past it never stops.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
