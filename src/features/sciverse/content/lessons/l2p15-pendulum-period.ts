import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P15 "Pendulum & Resonance".
 *
 * P15 stated T = 2 pi sqrt(L/g) and left it there. This lesson calculates with
 * it: the square root means four times the length for twice the period, so a
 * 0.25 m pendulum swings in 1.00 s and a grandfather clock's 0.994 m one takes
 * 2.00 s. Rearranged the other way, L = g (T / 2 pi)^2.
 *
 * Resonance and damping stay with P15 and L3P15; this lesson is the timing
 * arithmetic only. The second control is gravity, which ties back to L2P12's
 * inverse-square law.
 *
 * Condition stated: small swings, a light string, no air, and L measured to the
 * centre of the bob. Held fixed and named for Level 3: the swing is small, and
 * nothing steals energy.
 */
export function getL2P15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P15 found something surprising: a pendulum's **period** -- the time for one full back-and-forth -- does not depend on the mass of the bob at all. Only on its **length** and on **gravity**:\n\n**T = 2π √(L/g)**\n\nThe lab's pendulum is **25 cm** long and takes about **1 second**. Now suppose you want one that takes **2 seconds**.\n\nHow much longer does it need to be?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Four times longer -- about 1 metre. The length is under a square root, so you have to quadruple it to double the time.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Twice as long -- 50 cm. Double the length, double the time.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That would be true if the length were not under a **square root**. Work it out and see.\n\nAt 50 cm, L = 0.50 m:\n\nT = 2π √(0.50 / 9.81) = 2π √(0.0510) = 2π x 0.2258 = **1.42 s**\n\nNot 2 seconds -- only 1.42. Doubling the length multiplied the time by **√2 = 1.41**, not by 2.\n\n| Length | Period |\n| --- | --- |\n| 0.25 m | **1.00 s** |\n| 0.50 m | 1.42 s |\n| 1.00 m | 2.01 s |\n| 4.00 m | 4.01 s |\n\nLook at the first and third rows: **four times** the length gives **twice** the period. And the first and last: sixteen times the length gives four times the period.\n\nThat is what a square root does -- it slows the response down. To change the period by some factor, the length has to change by that factor **squared**.",
            options: [
                { id: 'cont', label: "So the square root is the whole story. Show me how to use it.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**T = 2π √(L/g)**\n\n- **T** is the **period**, in **seconds** -- one complete back-and-forth, not half of one\n- **L** is the length, in **metres**, measured from the pivot to the **centre of the bob** -- that is the frame of reference, and it is not the same as the length of the string\n- **g** is the strength of gravity, in **metres per second squared (m/s²)**. On Earth **g = 9.81 m/s²**\n\nTurned round to give a length instead:\n\n**L = g x (T / 2π)²**\n\nThe conditions belong here, and this formula has three.\n\n1. **The swing must be small** -- under about 10° from straight down. Beyond that the period grows, and Level 3 works out by how much.\n2. **The string is light and does not stretch**, and the bob is small compared with L.\n3. **Nothing steals energy** -- no air resistance, no friction at the pivot.\n\nNotice what is *not* in the formula: **mass**, and the **starting angle**. That is P15's discovery, written as arithmetic.",
            options: [
                { id: 'cont', label: "Work some out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The lab's pendulum.** L = 0.25 m.\n\n**Step 1.** L/g = 0.25 / 9.81 = **0.0255**\n\n**Step 2.** √0.0255 = **0.1596**\n\n**Step 3.** T = 2π x 0.1596 = **1.00 s**\n\n**The grandfather clock.** This time we know the period and want the length: a clock pendulum takes **2 seconds** for a full back-and-forth, ticking once on each half swing.\n\n**Step 1.** T / 2π = 2 / 6.2832 = **0.3183**\n\n**Step 2.** square it: 0.3183² = **0.1013**\n\n**Step 3.** L = 9.81 x 0.1013 = **0.994 m**\n\nJust under a metre -- which is why a grandfather clock is the height it is. The case has to be tall enough to hold a metre of pendulum.\n\n| | Length | Period |\n| --- | --- | --- |\n| Lab pendulum | 0.25 m | **1.00 s** |\n| Grandfather clock | 0.994 m | **2.00 s** |\n\nFour times the length, twice the period. ✓",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** You want a pendulum whose period is **1.5 seconds**.\n\nHow long must it be? (Use g = 9.81 m/s².)",
            options: [
                { id: 'right', label: "0.559 m. 1.5 / 2π = 0.2387, squared is 0.0570, times 9.81 gives 0.559.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'forgot_square', label: "2.34 m, because 9.81 x 0.2387 = 2.34.", nextNodeId: 'math_wrong' },
                { id: 'used_forward', label: "0.746 m, because 1.5 / 2 = 0.75.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**2.34 m** skipped the squaring. Going from a period to a length, the square root has to be undone -- and undoing a square root means **squaring**.\n\n**0.746 m** halved the period instead of using the formula. Halving works for nothing here: the relationship is a square root, not a straight line.\n\n**Step 1.** T / 2π = 1.5 / 6.2832 = **0.2387**\n\n**Step 2.** 0.2387² = **0.0570**\n\n**Step 3.** L = 9.81 x 0.0570 = **0.559 m**\n\nCheck it forwards: T = 2π √(0.559 / 9.81) = 2π √0.05698 = 2π x 0.2387 = **1.50 s** ✓\n\nA sensible sanity test: 1.5 s sits between 1.00 s and 2.00 s, so the length must sit between 0.25 m and 0.994 m. It does -- and nearer the top, because of the square.",
            options: [
                { id: 'retry', label: "Undo a square root by squaring.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Pendulum Length** sets L in centimetres. **Gravity** sets g -- because the formula says gravity matters, and away from Earth it is different.\n\nThe lab draws the pendulum, works the period out step by step, and counts the swings in a minute.\n\nTry this:\n\n- **25 cm** on Earth: 1.00 s\n- **99 cm** on Earth: 2.00 s -- the grandfather clock\n- Quadruple any length and watch the period exactly double\n- Now set gravity to **1.62 m/s²**, the Moon's: the 25 cm pendulum slows to **2.47 s**, because weaker gravity pulls it back more gently\n- Set gravity to **24.8 m/s²**, Jupiter's: the same pendulum speeds up to **0.63 s**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Length up slows it, gravity up speeds it. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A pendulum clock keeps perfect time at sea level. It is carried up a mountain **2 km** high and left there.\n\nFrom L2P12's inverse-square law, gravity at 2 km up is weaker by about **0.06%**.\n\nDoes the clock now run fast or slow, and roughly by how much each day?",
            options: [
                { id: 'right', label: "Slow, by about 26 seconds a day. Weaker gravity means a longer period, so each swing takes slightly more time and the clock counts too few of them.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Fast, because weaker gravity means less to fight against, so the pendulum swings more freely and more often.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It is gravity that **pulls the pendulum back** to the middle. Weaken it and the pendulum is returned more lazily, so each swing takes **longer**.\n\nRead it off the formula. **g** is in the **denominator** under the square root, so making g smaller makes L/g bigger, and T bigger:\n\n**T = 2π √(L/g)**\n\nThe size of it. A period grows by half the fraction that gravity shrinks by -- that is the square root at work again:\n\n**change in T = ½ x change in g**\n\n**Step 1.** gravity is lower by 0.06%, or 0.0006\n\n**Step 2.** so the period is longer by ½ x 0.0006 = **0.0003**\n\n**Step 3.** a day is 86,400 s, so the clock loses 86,400 x 0.0003 = **26 s**\n\nAbout half a minute a day, from carrying a clock up a hill. Real pendulum clocks are adjusted for the gravity where they stand, and the same is true of the Moon comparison: the identical clock on the Moon would lose **hours**.\n\n**The formula does not just give you a number -- read which letter sits on top and which underneath, and it tells you which way things move.**",
            options: [
                { id: 'retry', label: "Gravity is the restoring pull -- less of it means slower.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Length on top and gravity underneath, both inside a square root -- so the period stretches when the pendulum is longer or gravity is weaker, and only by half the fraction you change them.**\n\nThat is what makes a pendulum a clock: nothing about it depends on how hard you push it or how heavy the bob is, so the timing holds steady all day.\n\nTwo things this lesson held fixed. **The swing is small** -- under about 10°. Push it out to 90° and the period is nearly **a fifth longer** than the formula says, which Level 3 works out. And **nothing steals energy**, though P15 showed you damping doing exactly that.\n\nC15 watched a reaction settle into balance. C15 at Level 2 works out which way it will move to get there.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Four times the length, twice the time!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You calculated a pendulum's timing.**\n\n- **T = 2π √(L/g)**: period in **seconds**, length in **metres**, gravity in **m/s²**\n- **L** is measured from the pivot to the **centre of the bob**\n- Rearranged: **L = g x (T / 2π)²**\n- The square root means **four times the length for twice the period**, and sixteen times for four times\n- 0.25 m gives **1.00 s**; 0.50 m gives 1.42 s -- doubling the length multiplies the time by **√2**\n- A grandfather clock's pendulum is **0.994 m** and takes **2.00 s**, ticking on each half swing\n- A 1.5 s pendulum needs **0.559 m**: undo a square root by **squaring**\n- Weaker gravity means a **longer** period: the Moon's 1.62 m/s² stretches 25 cm to **2.47 s**\n- A change in gravity moves the period by **half** as big a fraction: 0.06% weaker gravity loses a clock **26 s a day**\n- Not in the formula at all: **mass**, and the **starting angle**\n- Conditions: small swings, a light unstretching string, no air resistance\n- Held fixed: the swing is small, and nothing steals energy",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Two pi root L over g!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Long Is the Swing?**\n\nP15 wrote the formula down. Level 2 uses it in both directions.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Period | **T = 2π √(L/g)** | Seconds for one back-and-forth |\n| Length | **L = g x (T / 2π)²** | Undo the root by squaring |\n| The square root | x4 length = x2 period | 0.25 m → 1.00 s, 1.00 m → 2.01 s |\n| Doubling the length | x**√2** = x1.41 | 0.50 m → 1.42 s |\n| Grandfather clock | 0.994 m | **2.00 s**, ticking each half swing |\n| Weaker gravity | longer period | Moon: 25 cm takes **2.47 s** |\n| A small change | **½ the fraction** | 0.06% less gravity = 26 s a day lost |\n| Not in the formula | mass, starting angle | P15's discovery, as arithmetic |\n| Conditions | small swings, no air | Level 3 removes the first |\n\n**The one line to remember:** the period follows the square root of the length, so to double the time you need four times the pendulum -- and gravity, underneath the root, moves it the other way.\n\n**Up next:** C15 -- which way a reaction shifts, worked out rather than guessed."
        }
    };
}
