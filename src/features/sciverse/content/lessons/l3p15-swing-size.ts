import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 15, physics.
 *
 * Removes L2P15's small-swing condition. The period does depend on how far the
 * pendulum is pulled back, through
 *
 *   T = T0 x (1 + theta^2 / 16),  theta in radians, T0 = 2 pi sqrt(L/g)
 *
 * which is the first term of an endless series: good to 0.03 of a percentage
 * point at 30 degrees and 2.6 points out by 90. Worked on a seconds pendulum
 * whose swing widens from 5 to 10 degrees and loses 123 s a day.
 *
 * Still standing: the bob is a point mass on a weightless string, and damping
 * still sits outside the period formula.
 */
export function getL3P15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P15 gave you the period of a pendulum:\n\n**T = 2π √(L/g)**\n\nand pointed out what is missing from it. Not just mass -- the **starting angle** is missing too. Pull the bob back a little or a lot, and the formula returns the same period either way.\n\nP15 and L2P15 both attached the same quiet condition: **for small swings**.\n\nSo what actually happens if you pull a pendulum right out to **90°** -- horizontal -- and let go?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It takes noticeably longer than the formula says -- the period does depend on the angle, just so weakly that small swings hide it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Exactly the same period. The angle is genuinely absent from the formula, so it cannot matter at any size.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The angle is absent from **that** formula, and that formula is an **approximation**. The two are not the same claim.\n\nMeasured against the real pendulum, here is how much longer each swing actually takes:\n\n| Starting angle | Period is longer by |\n| --- | --- |\n| 5° | 0.05% |\n| 10° | **0.19%** |\n| 30° | **1.74%** |\n| 60° | 7.32% |\n| 90° | **18.03%** |\n\nAt 5° the error is five hundredths of one per cent -- which is why P15 could ignore it, and why pendulum clocks work at all. At 90° the real pendulum takes nearly **a fifth longer** than L2P15 would tell you.\n\nSo the condition was not decoration. It marked the edge of where the formula is honest.\n\nWhere does the difference come from? **T = 2π √(L/g)** is exactly right for a restoring pull that grows in proportion to the displacement. A pendulum's does not: the sideways pull goes as **sin θ**, and sin θ falls behind θ as the angle opens. A weaker pull than proportional means a slower return -- so a longer period.",
            options: [
                { id: 'cont', label: "Can that be put as a number?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "It can, as a correction multiplying the old answer.\n\nWrite the small-swing period as **T₀**:\n\n**T₀ = 2π √(L/g)**\n\nThen for a swing of half-angle **θ**:\n\n**T = T₀ x (1 + θ² / 16)**\n\n**θ must be in radians**, not degrees. A radian is the angle whose arc equals the radius, and **180° = π radians**, so:\n\n**θ in radians = θ in degrees x π / 180**\n\nThe frame of reference: **θ is measured from straight down** -- the balance point -- **to the furthest point of the swing**, not from one extreme to the other.\n\nAnd this formula carries its own condition, which is the interesting part. **It is only the first term of an endless series.** The full series continues with a θ⁴ term, then θ⁶, and so on. Compare the two:\n\n| Angle | 1 + θ²/16 gives | The truth is | Out by |\n| --- | --- | --- | --- |\n| 10° | +0.19% | +0.19% | nothing you could measure |\n| 30° | +1.71% | +1.74% | 0.03 points |\n| 60° | +6.85% | +7.32% | 0.46 points |\n| 90° | +15.42% | +18.03% | **2.6 points** |\n\nSo we have swapped a formula that fails past 10° for one that holds to about 30° and then starts failing itself. **That is what removing a simplification usually buys: a wider range, not an exact answer.**",
            options: [
                { id: 'cont', label: "Work it through.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A 30° swing.**\n\n**Step 1.** θ = 30 x π / 180 = **0.5236 radians**\n\n**Step 2.** θ² = 0.2742, so θ²/16 = **0.01714**\n\n**Step 3.** T = T₀ x 1.0171 -- the period is **1.71% longer** than the small-swing formula says\n\nFor L2P15's grandfather clock, T₀ = 2.000 s, so T = **2.034 s**.\n\n**What that costs a clock.** A clock counts swings, so a longer period means fewer swings counted, and the clock runs **slow**. Over one day of 86,400 s, being 1.71% slow loses **1,480 s** -- nearly 25 minutes.\n\n**The real problem for clockmakers is smaller and nastier.** No clock runs at 30°. But suppose the swing widens from **5°** to **10°** as the mechanism is cleaned and freed up:\n\n**Step 1.** at 5°: θ = 0.0873 rad, θ²/16 = **0.000476**\n\n**Step 2.** at 10°: θ = 0.1745 rad, θ²/16 = **0.001904**\n\n**Step 3.** the difference is **0.001428**\n\n**Step 4.** over a day: 0.001428 x 86,400 = **123 s**, slow\n\nTwo minutes a day, from a swing that widened by five degrees. This is why a pendulum clock has an **escapement** that delivers the same small push every cycle: not merely to replace what damping steals, but to hold the **amplitude constant**, because the period depends on it.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A pendulum has a small-swing period of **T₀ = 2.000 s**. It is released from **20°**.\n\nWhat is its period? (20° = 0.3491 radians.)",
            options: [
                { id: 'right', label: "2.015 s. θ² = 0.1218, divided by 16 is 0.00762, so the period is 0.76% longer.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_change', label: "2.000 s, because the starting angle does not appear in T = 2π √(L/g).", nextNodeId: 'math_wrong' },
                { id: 'degrees', label: "52.0 s, using θ = 20 in the formula: 20² / 16 = 25.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**2.000 s** used the formula this lesson exists to correct. The angle is absent from **T₀**, and present in the correction.\n\n**52.0 s** put **degrees** into a formula that demands **radians** -- and the sense check is brutal: it claims a pendulum released from 20° takes 26 times longer than one released from 2°. Whenever an angle appears squared, cubed, or inside a series, it must be in radians first.\n\n**Step 1.** θ = 20 x π / 180 = **0.3491 rad**\n\n**Step 2.** θ² = **0.1218**\n\n**Step 3.** θ²/16 = **0.00762**, so T = 2.000 x 1.00762 = **2.015 s**\n\nA fifteen-millisecond difference -- and over a day, 0.00762 x 86,400 = **658 s**, eleven minutes. Tiny per swing, ruinous by teatime.",
            options: [
                { id: 'retry', label: "Radians first, then square.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Starting Angle** sets θ, from a whisper to 90°. **Pendulum Length** sets L, as in L2P15.\n\nThe lab draws the swing at its true width, gives T₀ and the corrected T, and shows what the difference costs a clock over a day.\n\nTry this:\n\n- Hold the angle under **10°** and the two periods agree to two decimal places -- L2P15's formula, working honestly\n- Open it to **30°**: the correction reaches **1.71%**, and the day's loss passes 20 minutes\n- Open it to **90°**: the correction claims **15.42%**, and the note warns you the truth is **18.03%** -- the series has run out of road\n- Hold the angle at 5° and change the **length** instead: the correction does not budge, because it depends on the angle alone",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The angle sets the correction, the length sets the period. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A pendulum clock is driven by a falling weight. As the weight nears the bottom of its travel, the pushes it delivers grow slightly weaker, and the pendulum's swing narrows from 6° to 4°.\n\nNobody has touched the pendulum's length. Does the clock now run fast or slow, and why does this matter more than damping does?",
            options: [
                { id: 'right', label: "Fast. A narrower swing means a shorter period, so more swings are counted each day. It matters more than damping because damping only changes how wide the swing is -- and it is the width itself that shifts the timekeeping.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Slow, because weaker pushes mean the pendulum is struggling, and a struggling pendulum must take longer over each swing.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A pendulum never \"struggles\". Its period comes from length, gravity and how far it swings -- and nothing else. Weaker pushes do not slow each swing down; they make the swing **narrower**, and a narrower swing is a **quicker** one.\n\nPut the numbers on this clock:\n\n**Step 1.** at 6°: θ = 0.1047 rad, θ²/16 = **0.000685**\n\n**Step 2.** at 4°: θ = 0.0698 rad, θ²/16 = **0.000305**\n\n**Step 3.** the period shortens by 0.000685 − 0.000305 = **0.00038**\n\n**Step 4.** over a day: 0.00038 x 86,400 = **33 s gained**\n\nHalf a minute a day, fast, from the drive weight running down -- and it would drift the other way each time the clock was rewound.\n\nNow put damping beside it. Damping steals energy, so on its own it narrows the swing -- which is to say **damping only reaches the timekeeping through the amplitude**. That is the whole chain:\n\n**weaker drive → narrower swing → shorter period → clock gains**\n\nWhich is why good clocks went to such lengths to deliver a **constant** push: a going barrel, a remontoire, or in the best regulators a nearly frictionless free pendulum given identical impulses. **The enemy was never friction. It was changing amplitude.**",
            options: [
                { id: 'retry', label: "Narrower swing, shorter period, clock gains.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The period grows with the square of the swing, so amplitude is part of the timekeeping -- and anything that changes the amplitude, damping included, changes the time.**\n\nSo Level 3 removed L2P15's condition. **The swing does not have to be small** -- but you pay for the width with a correction, and beyond about 30° you pay again, because the correction itself is only the first term of a series.\n\n**What is still standing in this lesson:** the bob is treated as a **point mass on a weightless string**. A real clock pendulum is a rod with its mass spread along it, which swings differently -- its period depends on how the mass is distributed, and a uniform rod of length L swings like a point mass at **two-thirds** of L. And **damping is still outside the period formula**: it sets the amplitude, and the amplitude then sets the period, but nowhere here does energy loss enter T directly.\n\nC15 at Level 2 compared two ratios. C15 at Level 3 finds out what the balanced equation does to them.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Theta squared over sixteen!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You removed the small-swing condition.**\n\n- **T₀ = 2π √(L/g)** is exact only for a restoring pull proportional to displacement; a pendulum's goes as **sin θ**, which falls behind θ\n- **T = T₀ x (1 + θ²/16)**, with **θ in radians**, measured from straight down to the furthest point\n- **180° = π radians**, so degrees must be converted before squaring\n- The correction: **0.05%** at 5°, **0.19%** at 10°, **1.74%** at 30°, **18.03%** at 90°\n- The formula is itself a first term: out by 0.03 points at 30°, **2.6 points** at 90°\n- 30° on a 2.000 s pendulum gives **2.034 s** -- nearly 25 minutes a day slow\n- A swing widening from 5° to 10° loses **123 s a day**, about two minutes\n- A swing narrowing from 6° to 4° **gains 33 s a day**\n- So an escapement holds the amplitude **constant**, not merely non-zero\n- Damping reaches the timekeeping only **through** the amplitude\n- Removed: L2P15's assumption that the swing is small\n- Still standing: a point mass on a weightless string, and damping outside the period formula",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Radians, squared, over sixteen!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Big Is the Swing?**\n\nL2P15 timed a small swing. Level 3 charges for a big one.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Small-swing period | **T₀ = 2π √(L/g)** | Exact only for a proportional pull |\n| Why it fails | the pull goes as **sin θ** | Weaker than proportional, so slower |\n| The correction | **T = T₀(1 + θ²/16)** | θ in **radians** |\n| Converting | **180° = π rad** | 30° = 0.5236 rad |\n| At 10° | +0.19% | Why clocks work at all |\n| At 30° | +1.74% | 2.034 s instead of 2.000 s |\n| At 90° | +18.03% | And the series is 2.6 points out |\n| 5° to 10° | +0.001428 | **123 s a day** slow |\n| 6° to 4° | −0.00038 | **33 s a day** fast |\n| Removed | the swing must be small | Pay a correction instead |\n| Still standing | point mass, damping outside T | A rod swings differently |\n\n**The one line to remember:** the period grows with the square of the swing, so a pendulum clock's real enemy is not friction but a **changing** amplitude -- and the formula that fixes this is itself only the first term of a series.\n\n**Up next:** C15 -- what the balanced equation does to K."
        }
    };
}
