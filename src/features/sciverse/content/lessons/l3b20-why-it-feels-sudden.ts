import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 20, biology. Biology closes the Big Idea, and
 * this lesson is about a shape rather than a substance.
 *
 * L2B20 laid out the near point against age and noticed something it could not
 * explain: nothing happens for forty years and then everything does, even though
 * the lens stiffens steadily the whole time. The stiffening really is steady --
 * about 0.30 D of accommodation lost per year, which reproduces the measured table
 * exactly from age 10 to 50 -- and the experience is not, because what you notice
 * is the near point:
 *
 *   nearest focus = 1 / accommodation left
 *
 * A reciprocal turns a steady decline into a sudden event. The same 2 D loss moves
 * the near point 2 cm at twenty and 67 cm at fifty; one dioptre is worth 0.9 cm of
 * reach at twenty and 50 cm at fifty. Nothing about the lens is different.
 *
 * This is the third reasoning shape in the curriculum's Level 3 biology lessons:
 * L3B18 had a ratio that collapsed, L3B19 a product that peaks, and this one a
 * reciprocal that turns gradual into sudden. Naming the shape is the point.
 *
 * Still standing: the straight-line fall is empirical and fits from 10 to 50, after
 * which it must flatten because accommodation cannot go below zero. And nothing
 * here says why the lens stiffens at all.
 */
export function getL3B20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B20 left a puzzle sitting in its own table, and it is the kind worth chasing.\n\nThe lens of your eye stiffens **steadily**. It has been stiffening since you were a child, at much the same rate every year, and there is nothing special about your forties -- no event, no switch, no sudden change of rate.\n\nYet almost everybody describes the same experience, and describes it as sudden. A few weeks of holding the menu further away. Squinting at a label in a shop. Somebody in their mid-forties who had never thought about their eyes, buying reading glasses within about a year of everybody else they know.\n\n**A steady cause producing a sudden effect needs explaining**, and the explanation is not biological. Nothing about the lens is different at 45 than at 25.\n\nYour two dials are the model.\n\n- **Age**, in years.\n- **Loss Each Year** -- how much accommodation the lens gives up annually, in dioptres per year. Measurements put it near **0.30 D a year**, and it varies a little between people.\n\nStart the model at **14 D** at age ten, which is what a child has, and take it away at a steady rate. Before you work anything out: if the loss is perfectly steady, should the **experience** be steady too?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Not necessarily -- what you notice is the nearest distance you can focus, and that is 1 divided by the accommodation, not the accommodation itself.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes -- a steady loss should mean a steady, gradual worsening that nobody would experience as sudden.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the reasonable expectation, and it is wrong -- because **you never experience your accommodation.** Nobody has ever felt a dioptre.\n\nWhat you experience is a **distance**: how close you can hold something before it blurs. And L2B20 gave you the connection between them:\n\n**nearest focus = 1 / accommodation left**\n\nThat 1-divided-by is doing something violent to the story. A quantity falling steadily, put through a reciprocal, does not come out falling steadily. It comes out barely moving for ages and then running away.\n\nYou can see it without any eyes involved. Take a number falling by 2 each step and look at 100 divided by it:\n\n| Accommodation | 14 | 12 | 10 | 8 | 6 | 4 | 2 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| Nearest focus, cm | 7 | 8 | 10 | 13 | 17 | 25 | **50** |\n\nThe left half of that row crawls: 7, 8, 10, 13. The right half bolts: 17, 25, 50. Same steady subtraction all the way along.\n\nSo the suddenness is not in the biology at all. **It is in the reciprocal.** And this lesson is really about recognising that shape, because it turns up wherever a resource is being divided into.",
            options: [
                { id: 'cont', label: "So let me build the model and see where it crosses.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two pieces, and they are both simple. The interest is entirely in what happens when you put them together.\n\n**One: the decline, which is a straight line.**\n\n**accommodation left = 14 D - loss each year x (age - 10)**\n\n**Two: the experience, which is a reciprocal.**\n\n**nearest focus in metres = 1 / accommodation left**\n\nAnd one more thing, borrowed from L2B20: reading a book at 25 cm requires **4 D**, and that requirement never changes. So the moment reading glasses become necessary is the moment the straight line crosses 4:\n\n14 - rate x (age - 10) = 4\n\nRearranged, **the crossing age = 10 + 10 / rate**.\n\nBefore trusting the straight line, it is worth checking it against the measured figures L2B20 tabulated. At 0.30 D a year:\n\n| Age | Model says | L2B20's table |\n| --- | --- | --- |\n| 10 | 14.0 D | 14 D |\n| 20 | 11.0 D | 11 D |\n| 30 | 8.0 D | 8 D |\n| 40 | 5.0 D | 5 D |\n| 45 | 3.5 D | 3.5 D |\n| 50 | 2.0 D | 2 D |\n\nEvery one. A straight line with one number in it reproduces four decades of measurement, which is a good reason to take the rest of its predictions seriously.\n\n**The condition, and it is a real one:** the line cannot continue past about 50, because accommodation cannot go below zero. In reality it flattens out near zero rather than crossing it, so this model is trustworthy from 10 to 50 and not beyond.",
            options: [
                { id: 'cont', label: "Find the crossing, and what it feels like on either side.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**At 0.30 D a year, starting from 14 D at age ten.**\n\n1. **Crossing age:** 10 + 10 / 0.30 = 10 + 33.3 = **age 43**\n2. **Which matches** the age at which most people first buy reading glasses\n\nNow the part that answers the puzzle. Watch what one dioptre of accommodation is **worth** at different ages -- how much closer it lets you hold a page:\n\n| Age | Accommodation | One dioptre is worth |\n| --- | --- | --- |\n| 20 | 11.0 D | **0.9 cm** |\n| 30 | 8.0 D | **1.8 cm** |\n| 40 | 5.0 D | **5.0 cm** |\n| 45 | 3.5 D | **11.4 cm** |\n| 50 | 2.0 D | **50.0 cm** |\n\nThe lens gives up the same 0.30 D every year throughout. At twenty that year costs you about **three millimetres** of reach. At fifty the same year costs you **fifteen centimetres**.\n\n**Fifty times the consequence, from an identical loss.**\n\nAnd that is the whole answer. Between 20 and 40 you lose 6 D -- more than half of everything you had -- and your near point moves from 9 cm to 20 cm. Both are closer than anyone holds a book, so **there is nothing whatever to notice.** Then between 43 and 46 you lose barely 1 D, and your near point crosses straight through the distance you have held books at your entire life.\n\nThe decline did not accelerate. **You simply arrived at the part of the curve where it shows.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Someone loses accommodation slightly faster than average, at **0.35 D a year**, starting from 14 D at age ten.\n\nAt what age will they need reading glasses for a book at 25 cm?",
            options: [
                { id: 'right', label: "About 39. Reading needs 4 D, so 10 + 10 / 0.35 = 10 + 28.6 = 38.6.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_14', label: "About 50, from 10 + 14 / 0.35.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "About 13, from 10 + 10 x 0.35.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Dividing 14 by the rate** finds the age at which accommodation reaches **zero**, not the age at which it reaches 4. Those are different questions, and the gap between them is large: 14/0.35 puts zero at age 50, while the 4 D line is crossed eleven years earlier. Losing the last 4 dioptres takes over a decade, and you needed glasses at the start of it, not the end.\n\n**Multiplying** by the rate instead of dividing gives age 13, which fails a glance: it says a thirteen-year-old needs reading glasses. When a rate is in dioptres **per year** and you want years, the dioptres must divide by it -- that is what the units demand.\n\n**Reading at 25 cm needs 4 D. So the loss available before trouble is 14 - 4 = 10 D, and at 0.35 D a year that takes 10 / 0.35 = 28.6 years from age ten -- age 39.**\n\nAnd notice how little the answer moves. Losing 17% faster than average brings the day forward from 43 to 39: four years. Which is why this is the most predictable event in human eyes -- a substantial difference in rate makes only a small difference in date.",
            options: [
                { id: 'retry', label: "Cross at 4 D, not at zero, and divide by the rate.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Age** in years and **Loss Each Year** in dioptres per year.\n\n| Loss each year | Reading glasses at |\n| --- | --- |\n| 0.25 D | **age 50** |\n| 0.30 D | **age 43** |\n| 0.35 D | **age 39** |\n| 0.40 D | **age 35** |\n\nThe whole plausible range of human variation -- and it is a range of fifteen years, which is worth thinking about, because the *experience* is far more uniform than that suggests. Someone at 0.40 D a year has lost their accommodation nearly twice as fast as someone at 0.25, and they reach reading glasses only fifteen years apart out of a lifetime.\n\nThree things this model gets right that are worth checking against life.\n\n**Why reading glasses are the most predictable purchase in medicine.** The requirement is fixed at 4 D by the width of a human arm, the starting accommodation is much the same in every child, and the rate varies only modestly. Three nearly-fixed numbers give one nearly-fixed age.\n\n**Why moving the page helps, and only briefly.** Holding a book at 33 cm instead of 25 needs 3 D instead of 4, which buys a few years. Then the same curve catches up -- and by 50 the requirement at any comfortable distance is beyond reach.\n\n**Why the first pair is always weak.** You cross the line by a fraction of a dioptre, so the first prescription is +0.5 D, and it climbs as the curve steepens: +2.0 D by 50, +3.0 D by 60.\n\nAnd there is a fourth prediction worth pausing on, because it is not obvious and it is true. **Somebody who holds things unusually close will notice earlier** -- a watchmaker working at 15 cm needs 6.7 D and crosses that line at about age 34, nearly a decade before a colleague who reads at arm's length.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A fixed requirement, a steady decline, and a reciprocal. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two claims are often made about this.\n\n- **Claim A:** \"Reading in dim light or too close wore my eyes out and made this happen sooner.\"\n- **Claim B:** \"It came on suddenly, in a few weeks.\"\n\nThe model says the decline is steady and set by the lens stiffening, at a rate that reading habits do not change. So one claim is mistaken and one is accurate. Which is which, and why does the mistaken one feel so convincing?",
            options: [
                { id: 'right', label: "A is mistaken -- habits do not change the rate. B is accurate: the crossing really does take weeks, because the near point moves fastest exactly when it crosses the reading distance. And A feels convincing because B is true, so people look for a cause for a change that had no new cause.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both are mistaken -- the decline is steady, so the experience must be gradual and there is no sudden change to explain.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the trap the whole lesson is built around, and it is worth being exact about, because it is the mistake a confident modeller makes.\n\nThe decline **is** steady. The experience is **not**, and denying it means denying the arithmetic you just did. Run the numbers around the crossing at 0.30 D a year:\n\n- **Age 43.0:** accommodation 4.1 D, nearest focus **24 cm**. The book is fine.\n- **Age 43.5:** accommodation 3.95 D, nearest focus **25.3 cm**. Just beginning to be uncomfortable.\n- **Age 44.0:** accommodation 3.8 D, nearest focus **26.3 cm**. Noticeably holding it further away.\n\nA centimetre a month, right at the distance you have used all your life. **Claim B is correct**, and the model is what shows it is correct: the near point moves fastest precisely when it is crossing the reading distance, because that is where the reciprocal is steepening.\n\n**Claim A is the mistaken one.** The rate is set by the lens gradually stiffening and by its layers accumulating, and no amount of reading in poor light alters it. But notice **why** A is so persistent: because B is true. Something really did change in a few weeks, and people reasonably look for a recent cause. There is not one. The cause was spread evenly over thirty years, and only its consequence was sudden.\n\nThat is a general hazard in reading any curve, and worth carrying well beyond eyes: **a sudden effect is not evidence of a sudden cause.**",
            options: [
                { id: 'retry', label: "The effect really is sudden, and it still has no sudden cause.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly, and holding both halves at once is the hard part. **The effect is genuinely sudden** -- about a centimetre a month at the crossing -- **and it still has no sudden cause.** The cause was spread evenly across thirty years.\n\nWhich makes Claim A understandable rather than foolish. Something real changed in a fortnight, so people look for something that changed in a fortnight. There was nothing. **A sudden effect is not evidence of a sudden cause**, and that is worth more than anything else in this lesson.\n\nSo Big Idea 20 closes with its three disciplines on one pair of spectacles:\n\n- **Physics (P20, L2P20, L3P20):** what a lens is. A delay cut in glass, sized so the short path through the middle takes as long as the long path round the edge -- and measured in dioptres, which add.\n- **Chemistry (C20, L2C20, L3C20):** what it is made of. Index sets the thickness through (n - 1), and the same electrons that buy thinness spread the colours, so thin, strong and colour-free cannot be had at once.\n- **Biology (B20, L2B20, this lesson):** whose eye it is for. A fixed requirement of 4 D, a steady decline of 0.30 D a year, and a reciprocal that turns the second into an event.\n\nAnd this is the third time Level 3 biology has closed a Big Idea by naming a **shape** rather than a fact. L3B18 had two curves whose **ratio** collapsed. L3B19 had two factors whose **product** peaks. This one has a **reciprocal** that turns gradual into sudden. Different arithmetic, and the same lesson each time: **the shape of a relationship, not just its ingredients, is where the surprise lives.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A sudden effect is not evidence of a sudden cause!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You explained a sudden event with no sudden cause.**\n\n- The lens stiffens **steadily**: about **0.30 D a year**, with nothing special happening in your forties\n- **You never experience accommodation.** You experience a distance, and **nearest focus = 1 / accommodation left**\n- A steady decline put through a **reciprocal** comes out barely moving and then running away: 7, 8, 10, 13, 17, 25, **50** cm for equal steps down\n- The model: **accommodation = 14 D - rate x (age - 10)**, and reading at 25 cm needs **4 D**\n- So the **crossing age = 10 + 10 / rate**, which at 0.30 D a year gives **age 43**\n- The straight line reproduces L2B20's measured table **exactly** at 10, 20, 30, 40, 45 and 50 -- one number, four decades\n- **One dioptre is worth 0.9 cm of reach at twenty and 50 cm at fifty.** Fifty times the consequence from an identical loss\n- Between 20 and 40 you lose **more than half** of all you had, and there is nothing to notice, because 9 cm and 20 cm are both closer than anyone holds a book\n- At the crossing the near point moves about **a centimetre a month**, so the experience really is sudden\n- Losing 17% faster than average brings the day forward only **four years**, which is why this is medicine's most predictable purchase\n- A watchmaker working at 15 cm needs 6.7 D and crosses at about **34**, a decade before a colleague reading at arm's length\n- **A sudden effect is not evidence of a sudden cause.** Reading in dim light changes nothing; the cause was spread over thirty years\n- Third shape in three closing lessons: L3B18's **ratio** collapsed, L3B19's **product** peaks, and this **reciprocal** turns gradual into sudden\n- Removed: L2B20's table, which showed the pattern and could not explain it\n- Still standing: the straight line is **empirical** and fits from 10 to 50, after which it must flatten because accommodation cannot go below zero. And nothing here says **why** the lens stiffens",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The shape is where the surprise lives!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Lenses Change What We See?**\n\nThree levels, and the same pair of spectacles each time. Level 1 described them, Level 2 measured them, Level 3 asked why the measurements come out as they do.\n\n**Summary Table:**\n| | Physics | Chemistry | Biology |\n| --- | --- | --- | --- |\n| **Level 1** | Lenses bend light to a point | Diamond bends more than glass | The eye squeezes its own lens |\n| **Level 2** | **power = 1/f**, and powers add | **thickness = 0.52/(n-1)** | **glasses = 4 D - accommodation** |\n| **Level 3** | **bulge = r²/(2f(n-1))** | **spread = power / Abbe** | **nearest focus = 1 / accommodation** |\n| **What Level 3 removed** | the lens shape as a given | \"high index is simply better\" | a table with no explanation |\n| **The mechanism** | every path takes the **same time** | one speed of light per **colour** | a **reciprocal**, not the biology |\n| **The number that decides** | 3.85 mm against 2.70 mm | **0.25 D** is visible | crossing at **age 43** |\n| **Still standing** | rays near the axis only | Abbe is measured, not predicted | the line flattens after 50 |\n\n**The one line to remember:** a lens is a delay cut in glass, the material that buys thinness charges for it in colour, and the reason everyone needs reading glasses at about the same age is not biology but the shape of 1 divided by a steadily shrinking number.\n\n**Where this leaves Big Idea 20:** P20 asked how lenses change what we see, and the answer turned out to be three questions in one -- what a lens is, what it is made of, and whose eye it is for. The physics is a timing problem, the chemistry is a trade, and the biology is a reciprocal. None of the three could be guessed from the other two."
        }
    };
}
