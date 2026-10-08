import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 25, physics. Mechanism + Limit.
 *
 * L2P25 asserted that the error doubles, and built everything on it -- the fifteen
 * days, the fixed-step price list, the 243 doublings for a year. It never said where
 * a doubling comes from, or why it would be 2 rather than 1.1 or 7. This finds the
 * doubling inside the rule.
 *
 *   next = r x now x (1 - now)
 *
 * One line, iterated once per generation. The error multiplier for one step is the
 * map's SLOPE, r(1 - 2x), and that is the whole mechanism: above 1 an error grows,
 * below 1 it shrinks, and the threshold is exactly 1.
 *
 * At the settling point x* = 1 - 1/r the slope is exactly 2 - r, so the settling
 * point is stable only while r < 3. Verified by iterating: period 1 at r = 2.9,
 * period 2 at 3.1, period 4 at 3.5, period 8 at 3.55, chaotic by 3.569.
 *
 * And the payoff: at r = 4 the measured error multiplier per step is 2.0000 -- the
 * Lyapunov exponent is 0.6931, which is ln 2 to four places. So L2P25's assumed
 * doubling is not an assumption at all for this map at this setting. It is derived.
 *
 * Boundary with L3P9: that lesson's logistic model is CONTINUOUS growth with a
 * ceiling, and its S-curve never oscillates or goes chaotic. This is the same
 * formula applied as a DISCRETE jump, once per generation, and the discreteness is
 * what creates everything here. Said explicitly in the lesson, because the two look
 * identical on the page.
 *
 * Frame of reference stated: x is the population as a share of the most the pond can
 * hold, measured once per generation just after breeding.
 *
 * Still standing: the doubling only holds while the gap is small -- once two
 * trajectories are far apart the gap stops growing, which is exactly the condition
 * L2P25 stated. And why the period-doubling points approach 3.5699 in a fixed ratio
 * (the Feigenbaum constant) is real and beyond this level.
 */
export function getL3P25Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P25 built a whole price list on one unexamined word.\n\nIt said the error **doubles**, and everything followed: ten doublings is a factor of a thousand, fifteen days of forecast, 243 doublings for a year. Every number in that lesson came out of the 2.\n\nAnd it never said where the 2 came from. Why 2? Why not 1.1, or 7? **Why would a difference multiply by anything at all?**\n\nTo answer that you need a system simple enough to hold in your hand, so here is one. A pond of fish that breed once a year. Write **x** for the population as a share of the most the pond can hold, so x = 0.5 means half full, measured just after breeding each year. Next year's share is\n\n**next = r x now x (1 - now)**\n\nThe **r** is how fast they breed. The **(1 - now)** is the crowding: if the pond is nearly full there is nowhere to put more fish, and that bracket shrinks towards zero.\n\n**This is not L3P9's logistic model, although it is written with the same letters.** That one grows **smoothly**, with time flowing continuously, and its S-curve rises once and settles for ever. This one **jumps**, once per generation, with nothing in between -- which is the right model for an animal that breeds in one short season, and as you are about to see, the jumping is what makes all the difference.\n\nYour two dials:\n\n- **Breeding Rate r**, from 2.0 to 4.0.\n- **Generations**, how many years to run it.\n\nThe lab runs **two** ponds at once, starting **0.000001 apart** -- one millionth of the pond's capacity, a difference of a few fish. Before any arithmetic: can a rule this simple, with nothing random in it, make those two ponds end up completely different?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'no', label: "No -- one line of arithmetic cannot do that.", nextNodeId: 'misconception' },
                { id: 'yes', label: "Apparently it can, since L2P25 said errors multiply.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Try it. Put **r** at 3.9 and run 40 generations, and watch the two ponds.\n\nFor the first dozen years you cannot see that there are two lines at all -- they are drawn on top of each other. Then they peel apart, and by year 30 one pond is nearly empty in a year when the other is nearly full.\n\nNothing random happened. There is no dice in `r x now x (1 - now)`. Run it twice from the same number and you get the same answer to the last decimal place, for ever. **The rule is completely determined, and the outcome is completely unpredictable**, and the only input that differed was a few fish.\n\nNow put **r** at 2.5 and run it again. The two lines rush **together** and stay together. Same rule, same starting gap, and the gap is gone within a few years.\n\nSo one rule does both things, and which one it does depends on r. **That is the question worth answering: what is it about r that decides whether a small difference fades or explodes?**",
            options: [
                { id: 'cont', label: "What does r actually change?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Think about what one step does to a **difference** rather than to a value.\n\nTwo ponds this year, a tiny distance apart. Next year both get pushed through the same rule. Whether they end up closer together or further apart is a question about how **steeply** the rule rises at that point -- because a steep rule sends two nearby inputs to two distant outputs, and a shallow one squashes them together.\n\nThat steepness is the **slope** of the rule, and for this rule it is\n\n**slope = r x (1 - 2x)**\n\nSo one step multiplies the gap by the slope, and that is the entire mechanism:\n\n- **|slope| less than 1** -- the gap **shrinks**. Differences fade, and prediction works for ever\n- **|slope| greater than 1** -- the gap **grows**. Differences multiply, exactly as L2P25 claimed\n- **|slope| = 1** -- the threshold, where neither happens\n\nL2P25's mysterious 2 was a slope all along. **An error multiplies by the slope of the rule it is being pushed through, once per step.** That is where a doubling comes from, and it is why the growth is multiplication rather than addition: each step multiplies by the slope again.\n\nNow work out where the pond settles. If it is steady, next equals now, so x = r x x (1 - x), and dividing by x gives 1 = r(1 - x), so\n\n**the settling point is x\\* = 1 - 1/r**\n\nPut that into the slope: r(1 - 2(1 - 1/r)) = r(2/r - 1) = **2 - r**.\n\nSo the slope at the settling point is **exactly 2 - r**, and nothing else.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "So the threshold is a value of r.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The settling point is stable only while |2 - r| is less than 1**, which means r below **3**. One subtraction, and the threshold falls out.\n\n| r | settling point | slope = 2 - r | what happens |\n| --- | --- | --- | --- |\n| 2.5 | 0.600 | **-0.50** | settles, gaps fade |\n| 2.9 | 0.655 | **-0.90** | settles, slowly |\n| **3.0** | 0.667 | **-1.00** | the threshold exactly |\n| 3.2 | 0.688 | **-1.20** | settling point unstable |\n| 4.0 | 0.750 | **-2.00** | hopeless |\n\nAnd what happens past r = 3 is worth watching rather than being told. The population cannot settle, so it does the next simplest thing: it **alternates** between a high year and a low year, for ever. Push r higher and that two-year cycle itself goes unstable and becomes a **four**-year cycle. Then eight.\n\nThese hand-overs happen at r = **3**, then **3.449**, then **3.544**, and they come faster and faster until, at about **r = 3.570**, there is no cycle of any length left. That is where chaos starts, and it was reached by **doubling the period over and over** -- which is a strange and lovely way for a system to break.\n\n**Now the number this lesson came for.** At **r = 4**, run two ponds and measure how fast the gap between them grows. Averaged over many steps, the gap multiplies by\n\n**2.0000**\n\nNot about 2. The measured value is 2 to four decimal places, because at r = 4 this map's average error multiplier is exactly 2. **L2P25's doubling was not an assumption. It is what this rule does, and the 2 was the slope.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. The breeding rate is **r = 2.8**.\n\nWork out the slope at the settling point, and say what happens to a small difference between two ponds.",
            options: [
                { id: 'fades', label: "Slope = -0.8, so |slope| is under 1 and the difference fades away", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'grows', label: "Slope = 2.8, so the difference grows", nextNodeId: 'math_wrong' },
                { id: 'threshold', label: "Slope = -1, exactly at the threshold", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The slope at the settling point is **2 - r**, so for r = 2.8 it is 2 - 2.8 = **-0.8**.\n\nIts size is 0.8, which is **less than 1**, so each step multiplies the gap by 0.8 and the difference **fades**. After ten generations a gap is 0.8 multiplied by itself ten times, which is about **0.11** -- around a tenth of what it was. The two ponds converge, and a forecast of this pond would be good for ever.\n\n2.8 is r itself, not the slope. The slope is r(1 - 2x), and at the settling point the (1 - 2x) part is **negative** -- which is worth noticing, because that minus sign is doing real work. A negative slope means a pond that is too full this year overshoots to **too empty** next year. The correction **over**corrects, and when the overcorrection is bigger than the error that started it, which is exactly |slope| > 1, you get the alternating high and low years.\n\nAnd -1 is the threshold, which happens only at r = 3 exactly.\n\n**Work out the slope, then compare its size with 1. The sign tells you how it misbehaves; the size tells you whether it misbehaves at all.**",
            options: [
                { id: 'retry', label: "Slope first, then compare with 1.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. Two ponds are drawn, starting 0.000001 apart, with the slope at the settling point shown.\n\nThings worth doing:\n\n- Start at **r = 2.5** and run 40 generations. One line -- the two ponds are indistinguishable, because the gap has been multiplied by 0.5 forty times.\n- Walk r up through **3.0** and watch the single line split into **two alternating levels**. That is the moment |slope| passes 1. You are watching a threshold being crossed.\n- Keep going to **3.5**: four levels. **3.55**: eight. The splitting accelerates, and by **3.60** there is no pattern left at all.\n- At **r = 3.9**, find the generation where the two lines first visibly separate. Now go back to r = 3.9 and raise **Generations** slowly: the lines sit on top of each other for a dozen years and then part. **A millionth of a pond took twelve years to become visible and two more to become everything.**\n- Last one, and it is the honest limit. At r = 3.9, run it a long way and watch the gap. It grows, and then it **stops** growing -- because once two ponds are completely different the gap cannot keep doubling. **There is nowhere left to diverge to**, which is the condition L2P25 stated and this is what it looks like.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A biologist models an insect population with this rule and measures **r = 2.6** for a particular species. They forecast the population for twenty years ahead and the forecasts come true, year after year.\n\nThe next year, warmer weather raises the breeding rate to **r = 3.8**. The biologist keeps using the same model, the same care, the same measurements -- and the forecasts now fail completely within a few years.\n\nWhat changed?",
            options: [
                { id: 'slope', label: "The slope at the settling point went from -0.6 to -1.8, so gaps that used to fade now multiply by 1.8 every generation.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'model', label: "The model must be wrong for warm weather — it needs a different formula.", nextNodeId: 'checkpoint_wrong' },
                { id: 'measure', label: "The measurements must have got worse when the weather changed.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Nothing is wrong with the model and nothing is wrong with the measurements. **The system changed which side of the threshold it was on.**\n\n- at r = 2.6 the slope is 2 - 2.6 = **-0.6**. Each generation multiplies a measurement error by 0.6, so errors **die out** and a twenty-year forecast is genuinely reliable\n- at r = 3.8 the slope is 2 - 3.8 = **-1.8**. Each generation multiplies the same error by 1.8, so after ten generations it is 1.8 multiplied by itself ten times -- about **357 times** bigger\n\nSame formula, same instruments, same biologist. **The predictability was never a property of the model. It was a property of r**, and r moved.\n\nThat is an uncomfortable thing to know and a valuable one. It means you cannot tell whether a system is forecastable by looking at how good your model is or how careful your measurements are. **You have to work out the slope**, and if it is over 1 then no amount of care will give you long forecasts -- while if it is under 1, even a rough model will do well.",
            options: [
                { id: 'retry', label: "r crossed the threshold, not the model.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that is the whole of chaos in one sentence: it is a property of the system, not of your ignorance.**\n\nThe biologist did nothing wrong and learned something important: whether this species can be forecast depends on the weather, because the weather sets r and r sets the slope.\n\nAnd now L2P25's price list reads differently. It said a thousand-fold better instrument buys a fixed number of extra steps, and that was true -- but the number of steps it buys depends on the slope. With a slope of 2 a factor of a thousand buys **ten** steps. With a slope of 1.1 the same factor buys **seventy**. With a slope of 0.9 it buys **all of them, for ever**.\n\nSo the right question about any system is not *how precisely can we measure it?* but **is the slope above or below 1?** -- because that one comparison decides whether careful measurement buys you everything or almost nothing.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The slope decides everything!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found L2P25's 2 inside the rule, and it was a slope.**\n\n- **next = r x now x (1 - now)**, applied as a **jump** once per generation. Not L3P9's smooth logistic growth -- same letters, and the **jumping is what does all of this**\n- A step multiplies a **difference** by the rule's **slope**: **slope = r(1 - 2x)**. A steep rule separates nearby inputs; a shallow one squashes them together\n- So **|slope| > 1** means differences grow, **|slope| < 1** means they fade, and **1** is the threshold. That is the mechanism L2P25 was missing, and it explains why the growth multiplies instead of adding: each step multiplies by the slope again\n- The settling point is **x\\* = 1 - 1/r**, and the slope there is exactly **2 - r**\n- So the pond settles only while **r < 3**. One subtraction gives the threshold\n- Past r = 3 it **alternates** between high and low years, because a negative slope means the correction **over**corrects. Push further and the 2-cycle becomes a **4**-cycle, then **8**\n- The hand-overs come at **3**, **3.449**, **3.544**, faster and faster, and by about **3.570** no cycle of any length survives. **Chaos arrives by doubling the period over and over**\n- **And at r = 4 the measured error multiplier is 2.0000.** Not about 2 -- 2 to four decimal places. **L2P25's doubling was never an assumption; it was this map's slope**\n- A millionth of a pond stays invisible for a dozen generations and then becomes everything in two more\n- Nothing is random. The same start gives the same answer for ever. **The rule is completely determined and the outcome is completely unpredictable**, and those two facts do not conflict\n- **Chaos is a property of the system, not of your ignorance.** A biologist whose r moves from 2.6 to 3.8 loses twenty-year forecasts with the same model and the same instruments\n- Which rewrites L2P25's price list: a factor of a thousand buys **ten** steps at slope 2, **seventy** at slope 1.1, and **all of them for ever** at slope 0.9\n- **Still standing:** two things. The doubling holds only **while the gap is small** -- run it long enough and the gap stops growing, because two ponds that are already completely different have nowhere left to diverge to. That is exactly the condition L2P25 stated, and now you can see it happen. And the period-doubling points approach 3.5699 in a **fixed ratio** that turns out to be the same for a huge range of unrelated systems, which is a real and remarkable fact and needs more than this lesson has.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3P25", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Physics Complete -- How Can Tiny Changes Cause Big Effects?**\n\nL2P25 was right about everything and could not have said why.\n\n**Summary Table:**\n| | L2P25 said | L3P25 says |\n| --- | --- | --- |\n| Why errors multiply | they just do | a step multiplies a gap by the rule's **slope** |\n| The multiplier | **2**, assumed | **slope = r(1 - 2x)**, worked out |\n| At the settling point | -- | the slope is exactly **2 - r** |\n| The threshold | -- | **\\|slope\\| = 1**, so the pond settles while **r < 3** |\n| Past the threshold | -- | 2-cycle, then 4, then 8, chaos by **r = 3.570** |\n| Where the 2 came from | -- | **r = 4 gives a measured multiplier of 2.0000** |\n| Is anything random? | no | still no -- and still unpredictable |\n| Is it about us? | -- | **no.** Chaos is a property of the system |\n| The real question | how precisely can we measure? | **is the slope above or below 1?** |\n| Still standing | the doubling rate is not fixed | the doubling **stops** once the gap is large |\n\n**The one line to remember:** a difference is multiplied by the slope of whatever rule it is pushed through, so the whole of chaos is the comparison between that slope and the number 1 -- and the 2 in *the error doubles* was never a fact about weather, it was the steepness of a rule.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
