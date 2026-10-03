import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 23, physics. P23 showed a notch raising the
 * "risk" of failure and never put a number on it.
 *
 * The number is the stress concentration factor. A flaw does not weaken a plate by
 * removing material -- it weakens it by crowding the load into the corner:
 *
 *   stress at the notch = K x (force / area),   K = 1 + 2a/b
 *
 * with a across the load and b along it, so a round hole has a = b and K = 3.
 * A plate carrying a safe 100 N/mm2 reaches 300 N/mm2 at a round hole and fails,
 * which is why a crack is about the SHAPE of the flaw, not its size.
 *
 * Big Idea 17 already did stress = force / area and buckling. This is the new
 * thing: the multiplier at a flaw.
 *
 * Still standing: K runs to infinity as the notch sharpens, which would mean any
 * scratch breaks anything. It does not, and Level 3 says what replaces K.
 */
export function getL2P23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A steel plate holds a load all day. Drill one small hole in it and it snaps.\n\nThe hole took away perhaps a fiftieth of the metal. The plate lost far more than a fiftieth of its strength.\n\nP23 called this **stress concentration** and showed red lines crowding round a notch. That is the right picture and it is not yet a number, so it cannot tell you whether a particular plate with a particular hole will hold.\n\nL2P17 gave you the first half already: **stress = force / area**, in **newtons per square millimetre (N/mm²)**. A plate 50 mm wide and 10 mm thick has an area of 500 mm², so a 50 kN pull is\n\n50,000 N / 500 mm² = **100 N/mm²**\n\nand structural steel takes about **250 N/mm²** before it starts to yield. So 100 is comfortable. Nothing in that calculation knows there is a hole.\n\nYour two dials are the load and the shape of the flaw.\n\n- **Load**, in **kilonewtons (kN)** -- thousands of newtons.\n- **Notch Sharpness**, which is how stretched-out the notch is across the pull compared with along it.\n\nHere is the question that decides everything. When you drill a hole, the load that used to pass through that metal has to go somewhere. Where does it go?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Around the hole — so it crowds into the metal at the sides, where the stress must be higher than the average.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It spreads evenly across the metal that is left, so the stress rises only by the fraction of area removed.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the natural guess, and it is the one that gets structures killed.\n\nIf the load really did spread evenly over the remaining metal, a 10 mm hole in a 50 mm plate would remove a fifth of the width and raise the stress by a quarter -- from 100 to 125 N/mm². Still far below 250. Perfectly safe.\n\nPlates with holes in them fail anyway.\n\nThe reason is that **load does not redistribute itself evenly; it follows the shortest stiff path it can find.** Think of a crowd walking down a corridor when a pillar is put in the middle. They do not spread out politely across the whole width. They bunch up tightly at the edges of the pillar and walk normally further away.\n\nSo the metal right beside the hole carries far more than its share, and the metal at the far edges of the plate carries less than before. **The average is almost unchanged. The peak is enormous.**\n\nAnd a material does not fail on average. It fails where the stress is highest. One spot reaching 250 N/mm² is enough to start a crack, and once a crack starts it carries its own concentration with it.",
            options: [
                { id: 'cont', label: "So how much higher is the peak?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "By a factor you can calculate from the shape of the notch alone.\n\n**stress at the notch = K x (force / area)**\n\nK is the **stress concentration factor** -- how many times the peak exceeds the average. And for a smooth oval notch it depends only on the notch's shape:\n\n**K = 1 + 2a/b**\n\nwhere **a** is the notch's half-width measured **across** the pull and **b** is its half-length **along** the pull.\n\nRead the two extremes and the whole idea falls out:\n\n| Notch shape | a/b | K |\n| --- | --- | --- |\n| a wide shallow dish | 0.5 | **2** |\n| a round hole | **1** | **3** |\n| twice as wide as long | 2 | **5** |\n| five times | 5 | **11** |\n| ten times -- nearly a slit | 10 | **21** |\n\n**A round hole triples the stress.** That is the single most useful number in the lesson, and it does not depend on how big the hole is -- a 1 mm hole and a 10 mm hole both give K = 3. **Size does not matter here. Shape does.**\n\n**The condition:** this is for a smooth oval notch in a wide plate, with the material still springy rather than already yielding. It also assumes the notch is small compared with the plate.\n\nNotice which way round a/b goes. Stretch the notch **across** the pull and it gets worse. Stretch it **along** the pull and it gets better -- which is why a crack running in the same direction as the load is far less dangerous than one running across it.",
            options: [
                { id: 'cont', label: "Work one out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A steel plate 50 mm x 10 mm carries 50 kN. It has one round hole. Does it hold?**\n\n**Step 1 -- the average stress, ignoring the hole.**\n\nstress = force / area = 50,000 N / 500 mm² = **100 N/mm²**\n\n**Step 2 -- the factor for the shape.** A round hole has a = b, so\n\nK = 1 + 2 x 1 = **3**\n\n**Step 3 -- the stress at the notch.**\n\n3 x 100 N/mm² = **300 N/mm²**\n\nSteel yields near **250 N/mm²**, so **it does not hold.** The plate fails at the hole while the average stress is only 40% of what the steel can take.\n\n**Now the engineer's move.** You cannot remove the hole -- something has to pass through it. So change its **shape**. Make the hole an oval twice as long along the pull as across it: a/b = 0.5, so\n\nK = 1 + 2 x 0.5 = **2**, and 2 x 100 = **200 N/mm²** ✓\n\nSame plate, same load, same amount of metal removed. **Holds, because the corner is gentler.**\n\n**Check it backwards:** to stay under 250 N/mm² at 100 N/mm² average, you need K below 2.5, so 1 + 2a/b < 2.5, so a/b < **0.75**. Any notch less than three quarters as wide as it is long will do.\n\nThat is why aircraft windows are rounded ovals and not rectangles. Early jets used square-ish windows; the sharp corners had a huge K, cracks started there, and aircraft were lost. The fix was not thicker metal. **It was corners.**",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same 500 mm² plate carries **25 kN**, and it has a notch **three times** as wide across the pull as it is long along it.\n\nWhat is the stress at the notch?",
            options: [
                { id: 'right', label: "350 N/mm² — the average is 50 N/mm², K = 1 + 2×3 = 7, and 7 × 50 = 350.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'noK', label: "50 N/mm², from 25,000 N divided by 500 mm².", nextNodeId: 'math_wrong' },
                { id: 'wrongK', label: "150 N/mm², using K = 3 because that is the factor for a notch.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**50 N/mm²** is the average, and the average is exactly what a notch makes irrelevant. That step is right and it is only the first of three.\n\n**K = 3** is the factor for a **round** hole, where a = b. This notch is three times as wide across the pull as along it, so a/b = 3 and\n\nK = 1 + 2 x 3 = **7**\n\n**7 x 50 N/mm² = 350 N/mm²**, and steel yields near 250. **It breaks** -- on a load that gives only a fifth of the steel's strength on average.\n\nThat is the result worth keeping. Halving the load from 50 kN to 25 kN did **not** save this plate, because sharpening the notch from round to 3:1 raised K from 3 to 7. **The shape of the flaw beat the size of the load.**\n\nAnd it shows you where to spend your effort. If a part keeps cracking, the instinct is to make it thicker or pull on it less. Often the cheapest fix is to **round off the corner** -- no extra metal, no reduced load, just a gentler path for the load to follow.",
            options: [
                { id: 'retry', label: "Average, then the factor for the shape, then multiply.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Load** in kN and **Notch Sharpness** as a/b. The plate is 500 mm² and the steel yields at 250 N/mm². The gauge uses a **stretched** scale, because the notch stress runs from under a hundred to over three thousand.\n\n| Load | plain stress | round hole, K=3 | 3:1 notch, K=7 | 10:1 notch, K=21 |\n| --- | --- | --- | --- | --- |\n| 25 kN | 50 | **150** ✓ | 350 ✗ | 1,050 ✗ |\n| 50 kN | 100 | 300 ✗ | 700 ✗ | 2,100 ✗ |\n| 75 kN | 150 | 450 ✗ | 1,050 ✗ | 3,150 ✗ |\n\nRead across a row rather than down a column. **Moving right is far more damaging than moving down.** Tripling the load from 25 to 75 kN triples the stress; going from a round hole to a 10:1 notch multiplies it by seven. The flaw's shape has more power over this plate than the load does.\n\nWhich gives the engineer's rule of thumb that comes out of this lesson: **look for the sharpest corner before you look at the biggest force.**\n\nAnd now push the sharpness dial to its end and watch what the formula claims. At a/b = 10 the stress is 2,100 N/mm². Keep going -- a/b = 100 gives K = 201, and a/b = 1,000 gives K = 2,001.\n\n**A real crack is far sharper than any of these.** Its tip is a few atoms across, so a/b is enormous and K runs away to infinity. Taken literally, the formula says **any crack, however small, breaks anything under any load.**\n\nIt plainly does not. Your window has scratches in it and it is still holding. So the formula must stop being true somewhere, and finding out where is Level 3's job.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The shape beats the load. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A bracket keeps cracking at a square inside corner. An engineer proposes two fixes:\n\n**A** -- make the bracket 50% thicker, using half as much again of the metal.\n**B** -- leave the thickness alone and cut a small rounded fillet into the corner, removing a little metal.\n\nWhich is likely to work better, and why?",
            options: [
                { id: 'right', label: "B. Thickening cuts the average stress by about a third, but the corner's K stays sharp. Rounding the corner lowers K itself, which is the multiplier — and it costs metal rather than adding it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "A. More metal always means more strength, and B removes metal from the very place that is already failing.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "\"B removes metal from the place that is already failing\" is exactly the objection that makes this a good question -- and the arithmetic goes the other way.\n\n**Fix A, thicker.** Half again as much thickness divides the average stress by 1.5. If it was 100 N/mm², it is now 67. But the corner is still square, so **K is unchanged**. If K was 7, the peak goes from 700 to 467 N/mm². Better, and still far over 250. **The bracket still cracks**, and it now weighs 50% more.\n\n**Fix B, a rounded fillet.** The average stress barely moves -- you removed a sliver. But K is set by the **shape of the corner**, and a square corner has a very small b along the pull, which makes a/b large. Round it and b grows, so a/b falls and K falls with it. Taking K from 7 to 2 takes the peak from 700 to **200 N/mm²** ✓\n\n**Same metal. One sixth the peak stress.**\n\nThe general lesson is worth more than the example. **When a quantity is a product, attack whichever factor you can change the most.** Thickening attacked the 100 and could only divide it by 1.5. Rounding attacked the 7 and divided it by 3.5 -- and that factor had no upper limit on how much good it could do.\n\nIt is also why you will see fillets, radii and rounded cut-outs everywhere once you start looking: at the root of a gear tooth, where an aircraft wing meets the body, at the corner of every window on every aeroplane.",
            options: [
                { id: 'retry', label: "Attack the factor you can change the most.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. Thickening by half divides the average by 1.5 and leaves K alone: 700 becomes 467 N/mm², still far over 250, and the bracket is 50% heavier. Rounding the corner takes K from 7 to 2 and the peak to **200 N/mm²** -- same metal, one sixth the peak.\n\n**When a quantity is a product, attack whichever factor you can change the most.** Thickening could only divide the 100 by 1.5; rounding divided the 7 by 3.5, with no ceiling on how much good it could do.\n\nWhich is why fillets and radii are everywhere once you look: the root of a gear tooth, where a wing meets the body, the corner of every aircraft window.\n\nSo you can now do what P23 only pictured:\n\n| | P23 said | L2P23 says |\n| --- | --- | --- |\n| A notch | raises the risk | multiplies the stress by **K** |\n| How much | red lines | **K = 1 + 2a/b** |\n| A round hole | a weak spot | **K = 3**, whatever its size |\n| The plate at 50 kN | might fail | 100 average, **300 at the hole**, so it fails |\n| The fix | not given | **change the corner**, not the thickness |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The shape of the flaw, not its size!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put a number on P23's red lines.**\n\n- A flaw does not weaken a plate by **removing** metal -- a hole takes a fiftieth of the metal and far more than a fiftieth of the strength\n- Load follows the **shortest stiff path**, so it bunches beside the flaw like a crowd past a pillar. **The average is almost unchanged and the peak is enormous**\n- And a material fails where the stress is **highest**, not on average\n- **stress at the notch = K x (force / area)**, with **K = 1 + 2a/b**\n- **a** is measured **across** the pull, **b** **along** it, so a **round hole gives K = 3** -- whatever its size. **Size does not matter here; shape does**\n- A 50 kN pull on 500 mm² is a safe **100 N/mm²** on average and **300** at a round hole, against steel's **250** -- so it fails at 40% of the steel's strength\n- Reshaping the hole to an oval twice as long as wide gives K = 2 and **200 N/mm²** ✓ -- same metal removed, and it holds\n- To stay safe you need K below 2.5, so **a/b below 0.75**\n- A crack **along** the pull is far safer than one **across** it, because that swaps a and b\n- Halving the load did not save the 3:1 notch, because K went from 3 to 7: **the shape of the flaw beat the size of the load**\n- So **attack whichever factor you can change the most** -- thickening divides the average by 1.5; rounding a corner can divide K by far more\n- Which is why aircraft windows are rounded ovals. Early jets had squarer ones, cracks started at the corners, and the fix was not thicker metal but **corners**\n- Removed: P23's qualitative \"risk\", which could not tell you whether a given plate holds\n- Still standing: **K runs away to infinity as the notch sharpens.** A real crack tip is a few atoms across, so the formula claims any scratch breaks anything under any load. Your scratched window disagrees, so something must replace K -- and Level 3 says what",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "One plus two a over b!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Materials Break and Recover?**\n\n**Summary Table:**\n| Idea | The Physics | The Number |\n| --- | --- | --- |\n| A flaw crowds the load | it follows the stiffest short path | the peak, not the average |\n| The multiplier | **K = 1 + 2a/b** | a across the pull, b along it |\n| A round hole | a = b | **K = 3**, at any size |\n| 50 kN on 500 mm² | average **100 N/mm²** | **300** at the hole: fails |\n| Steel yields near | -- | **250 N/mm²** |\n| An oval twice as long | a/b = 0.5 | **K = 2**, so 200 ✓ |\n| To be safe | K under 2.5 | **a/b under 0.75** |\n| A crack along the pull | swaps a and b | far less dangerous |\n| The engineer's move | change the **corner** | not the thickness |\n| Still standing | K goes to **infinity** | so it cannot be the whole story |\n\n**The one line to remember:** a flaw multiplies the stress rather than removing strength, and the multiplier depends only on the flaw's shape -- so the sharpest corner is more dangerous than the biggest force, and rounding it costs nothing.\n\n**Up next:** C23 turns to the other way materials fail -- not in one go under a load, but slowly, from the surface inward. And it has a protection trick that works even where it has been scratched off."
        }
    };
}
