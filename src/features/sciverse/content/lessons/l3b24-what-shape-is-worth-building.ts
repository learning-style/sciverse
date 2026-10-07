import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 24, biology. The synthesis lesson. Mechanism.
 *
 * L2B24 handed over three capacities and admitted it. The xylem's 300 L/day in
 * particular was treated as a fixed property of the tree -- but a tree BUILDS its
 * xylem, so that number is a decision, and this lesson asks what decides it.
 *
 * Two costs pull opposite ways for a vessel of radius r carrying flow Q:
 *
 *   friction  goes as Q^2 / r^4   (chaining to L3P11's resistance, 1 / r^4)
 *   upkeep    goes as r^2         (the vessel and its contents, per unit length)
 *
 * One falls steeply, one rises gently, so the total has a minimum -- and at that
 * minimum the friction cost is EXACTLY HALF the upkeep cost, every time, whatever
 * the constants. That is what lets a learner find the optimum by inspection instead
 * of by differentiating, which is the L3B16 device: try values, find the bottom.
 *
 * The minimum sits at r^3 proportional to Q (verified: r^3/Q is 1.4142 at Q = 1, 2,
 * 4 and 8), so doubling the flow widens the vessel by 2^(1/3) = 1.26. Flow is
 * conserved at a junction, Q0 = Q1 + Q2, and therefore
 *
 *   r0^3 = r1^3 + r2^3      (Murray's law)
 *
 * which is derived here rather than asserted. Two equal daughters are each 0.794 of
 * the parent, so their total AREA is 1.26 times the parent's -- area grows outwards
 * at every branch, speed falls, and the network is built to make its last step slow.
 * That reverses L2B24, where slowness was the problem.
 *
 * The U is also forgiving: 10% off the best radius costs under 5%, and 25% off
 * costs 18%. That is why real vessels scatter around the rule and stay nearly
 * optimal, and it is why one xylem can serve every kind of weather -- the thing
 * L2B24's checkpoint said a tree has to manage.
 *
 * Frame of reference stated: both costs are per unit length of one vessel, in the
 * same arbitrary units, because only their ratio enters the answer.
 *
 * Still standing: measured exponents are about 2.7 to 3.0 in blood vessels, which
 * fits, and nearer 2 to 2.5 in tree branches, which does not -- a branch also has
 * to hold itself up, and that cost is not in this sum.
 */
export function getL3B24Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B24 was honest about its weakest point. It gave you three capacities -- roots, xylem, leaf demand -- and said plainly that they had been handed over rather than worked out.\n\nThe xylem's was the one that should bother you. **300 litres a day** was treated as a fixed fact about the tree, like its species. But a tree **builds** its xylem, out of sugar it had to make first, and it builds it once. So 300 L/day is not a fact about the tree. **It is a decision the tree made**, and this lesson is about what it was deciding between.\n\nTake one vessel: a tube of radius **r** carrying a flow **Q**. Making it wider has one obvious advantage and one obvious cost.\n\n**Wider is cheaper to move water through.** L3P11 established why, for blood: a tube's resistance to flow grows as **1 / r to the fourth power**, so the effort to push a given flow through it falls away extremely fast as it widens. Call that the **friction cost**, and it goes as **Q² / r⁴**. A tree pays it as a harder pull it must generate; an animal pays it as work done by the heart.\n\n**Wider is more expensive to own.** The vessel wall has to be built and the sap inside it has to be made and maintained, and both scale with how much tube there is -- which, per unit length, is the cross-section. Call that the **upkeep cost**, and it goes as **r²**.\n\nSo one cost falls steeply with width and the other rises gently. Your two dials:\n\n- **Vessel Radius**, in **micrometres (µm)** -- a thousandth of a millimetre.\n- **Flow Carried**, in **nanolitres per second (nL/s)**.\n\nBoth costs are drawn in the same arbitrary units, because -- as you will see -- only their **ratio** matters to the answer.\n\nSo: is there a best radius, or is wider always better?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'wider', label: "Wider is always better -- the friction cost falls as the fourth power.", nextNodeId: 'misconception' },
                { id: 'best', label: "There must be a best one, where the two costs balance.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The fourth power is a real effect and it does not win, because it is fighting something that never stops growing.\n\nPut the radius dial at its widest. The friction cost is almost nothing -- and look at the upkeep. A vessel twice as wide costs **four times** as much to own, for ever, every day of the tree's life. Building it was a one-off; owning it is not. A vessel ten times as wide costs a hundred times.\n\nThe friction cost **falls towards zero** as you widen, so there is a floor under it and almost nothing left to win. The upkeep cost **rises without limit**. Any quantity that falls to a floor, added to one that rises for ever, has a lowest point somewhere in between.\n\nAnd that is a shape worth recognising, because it is the fourth one this Big Idea's biology lessons have turned on. **L3B18's two curves gave a ratio that collapses. L3B19's gave a product that peaks. L3B20's gave a reciprocal that turns a slow decline into a sudden event.** This one is a **sum of two opposing costs, so the total has a minimum** -- and a minimum is a thing a living network can be built at.",
            options: [
                { id: 'cont', label: "So where is the lowest point?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Write the total down:\n\n**total cost = friction + upkeep**, which goes as **Q² / r⁴ + r²**\n\nand finding the bottom of that normally means calculus. You do not need it, because the bottom of this particular curve announces itself.\n\n**At the best radius, the friction cost is exactly half the upkeep cost.** Not roughly -- exactly, and at every flow, whatever the constants in front of the two terms happen to be.\n\nThat is why the units were allowed to be arbitrary. A statement like *friction is half of upkeep* survives multiplying both costs by anything, so you never need to know what one unit of cost is worth. **The answer is a ratio, so the units cancel out of it.**\n\nWhich gives you a way to find the optimum by hand. Move the radius dial and watch the two costs:\n\n- too **narrow** -- friction is much more than half the upkeep. Widening pays\n- too **wide** -- friction is less than half the upkeep. You are over-paying to own a tube you did not need\n- **just right** -- friction is half the upkeep, and the total is at its lowest\n\nTry it on the dials before reading on. Put the flow at **4 nL/s** and hunt for the radius where the friction bar is half the upkeep bar.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Found it. Now what does it depend on?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**At 4 nL/s the best radius is about 63 µm.** Now the question this lesson is really for: what happens to the best radius when the tree needs to carry more?\n\nTry a few flows and write down where the bottom sits:\n\n| Flow carried | Best radius |\n| --- | --- |\n| 2 nL/s | **50 µm** |\n| 4 nL/s | **63 µm** |\n| 8 nL/s | **79 µm** |\n| 16 nL/s | **100 µm** |\n\nThe flow went up **eight times** and the radius only **doubled**. That is not a coincidence and it is not nothing -- it is a cube root. Check it: 8 to the power of one third is 2.\n\nSo cube the radii and compare each with the first row:\n\n| Flow | Best radius | Its cube, against the first row |\n| --- | --- | --- |\n| 2 nL/s | 50.0 µm | 1 |\n| 4 nL/s | 63.0 µm | **2** |\n| 8 nL/s | 79.4 µm | **4** |\n| 16 nL/s | 100.0 µm | **8** |\n\nThe flow doubled three times and so did the **cube** of the radius, exactly. So\n\n**the best radius has r³ proportional to Q.**\n\nWhich means a vessel built at its best radius is **advertising the flow it carries**, in its cube. Double the flow and the vessel widens by 2 to the power of a third, which is **1.26** -- a 26% widening to carry twice as much.",
            options: [
                { id: 'check', label: "So what happens at a branch?", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Now put that together with the one thing that is always true at a junction. Water does not pile up there, so the flow in equals the flow out:\n\n**Q₀ = Q₁ + Q₂**\n\nAnd every vessel built at its best radius has its cube proportional to its flow.\n\nIf a parent vessel of radius **r₀** splits into two daughters of radius **r₁** and **r₂**, and all three are at their best radius, what must be true?",
            options: [
                { id: 'cubes', label: "r₀³ = r₁³ + r₂³ — the cubes add", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'radii', label: "r₀ = r₁ + r₂ — the radii add", nextNodeId: 'math_wrong' },
                { id: 'areas', label: "r₀² = r₁² + r₂² — the areas add", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Substitute rather than guess. Each vessel has **cube proportional to flow**, with the same constant for all three because they are all built by the same rules:\n\nQ₀ = Q₁ + Q₂, and Q is proportional to r³ in each one, so\n\n**r₀³ = r₁³ + r₂³**\n\nThe **cubes** add, because the cube is the thing that tracks the flow. The radii cannot add -- that would have a vessel splitting into two half-width daughters, each carrying an eighth of the flow by the cube rule, so seven eighths of the water would simply vanish at the junction.\n\nAnd areas adding is the famous near-miss. It is what you would get if speed were held constant through the branch, and it is roughly what **tree trunks** do for mechanical reasons. It is not what the cost argument gives, and it is not what blood vessels do.\n\nThis is **Murray's law**, and notice where it came from: a trade-off between two costs, plus the fact that water does not pile up. **No new biology at all.**",
            options: [
                { id: 'retry', label: "The cubes add. Murray's law.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The curve is the **total cost against radius**, with the two costs that make it drawn underneath, your radius marked, and the lowest point ticked.\n\nThings worth doing:\n\n- Put the flow at 4 nL/s and move the radius through **63 µm**. Watch the friction bar pass **half** the upkeep bar exactly as the dot reaches the bottom of the curve.\n- Now look at the **shape of the bottom**. Go 10% off the best radius in either direction and the total cost rises by under **5%**. Go 25% off and it is still only **18%**. The bottom of this curve is remarkably flat.\n- Now go badly wrong. At **half** the best radius the cost is **5.5 times** the minimum, and at **twice** it is **2.7 times**. The penalty is savage further out and almost absent nearby.\n- Change the flow and watch the whole curve slide right. The bottom moves as the **cube root** of the flow, which is why it moves so little.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Murray's law has a consequence that sounds like a mistake.\n\nTake a vessel that splits into **two equal daughters**. By Murray's law each daughter has r₁³ = r₀³/2, so r₁ = r₀ x (1/2) to the power of a third = **0.794 r₀**.\n\nNow compare the **total cross-sectional area** before and after the branch. The parent's area goes as r₀², and the two daughters together go as 2 x (0.794 r₀)² = **1.26 r₀²**.\n\nSo the total area **grows by 26% at every single branch**, and the speed of the sap -- which is flow divided by total area -- **falls** at every branch.\n\nA network built this way gets **slower** the further out you go, by design. Why would that be the right thing to build?",
            options: [
                { id: 'exchange', label: "Because the far end is where exchange happens, and exchange needs time -- so the slowness is the point.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'mistake', label: "It would not be — it is a flaw forced on the tree by the cost of wide vessels.", nextNodeId: 'checkpoint_wrong' },
                { id: 'faster', label: "The speed actually rises, because the daughters are narrower than the parent.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Each daughter **is** narrower than the parent -- 0.794 of it -- and there are **two** of them, and two times 0.794 squared is **1.26**. More total area, so slower water. Narrower tubes carrying slower water is not a contradiction once you count both of them.\n\nAnd it is not a flaw. Ask what the far end of the network is **for**. Water and dissolved nutrients have to actually cross the vessel wall into the living cells, and crossing takes time. Water that races past has no chance to; water that creeps has every chance.\n\nSo the network makes its last step slow **on purpose**, and the arithmetic that does it is the same cost trade-off that set every radius.\n\nThis is the same reversal twice in one Big Idea, and it is worth naming. **L2B24 treated slowness as the problem** -- the smallest step, the thing that limits delivery, the reason a tree wilts. Here the slowness at the far end is **the purpose of the whole arrangement**. The blood in your capillaries creeps along at well under a millimetre a second, and if it did not, you could not use any of it.",
            options: [
                { id: 'retry', label: "The slow end is where the work happens.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly, and that closes the Big Idea by turning its own first answer over.**\n\nL2B24 found that a network delivers as much as its smallest step, and treated that step as the thing to fix. Here the smallest, slowest, widest-in-total part of the network is the part the whole thing exists to feed. **The bottleneck at the far end is not a fault in the design. It is the design.**\n\nAnd the flat bottom of that curve answers the other thing L2B24 raised and could not resolve. It pointed out that a tree builds its xylem **once** and has to live with it through every kind of weather, so having every step exactly equal cannot be the goal.\n\nNow you can say why that is survivable. **Being 10% off the best radius costs under 5%.** A tree that builds for an average year and meets a wet one, or a dry one, is not badly wrong -- it is a few per cent off a minimum that barely cares. Which is also why real measurements scatter around Murray's law and the rule still holds: **near the bottom of this curve, almost right is almost free.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The slow end is the design!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out where L2B24's capacities came from.**\n\n- A vessel's radius is a **decision**, not a fact. **Friction** goes as **Q²/r⁴** -- chaining to L3P11's resistance as 1/r⁴ -- and **upkeep** goes as **r²**\n- One falls to a floor, the other rises for ever, so the total has a **minimum**. A sum of two opposing costs, which is the **fourth shape** this Big Idea's closing lessons have turned on, after a ratio that collapses, a product that peaks and a reciprocal that breaks\n- **At the best radius, friction is exactly half the upkeep** -- at every flow, whatever the constants. So the optimum can be found by **inspection**, with no calculus, and the arbitrary units **cancel out of a ratio**\n- The bottom sits at **r³ proportional to Q**. Flow up eight times, radius up only two: 8 to the power of a third. Double the flow and the vessel widens **26%**\n- Water does not pile up at a junction, so **Q₀ = Q₁ + Q₂** -- and therefore **r₀³ = r₁³ + r₂³**. That is **Murray's law**, derived from a trade-off and a conservation, with **no new biology**\n- Two equal daughters are each **0.794** of the parent, so their total **area is 1.26 times** the parent's. Area **grows at every branch**, so speed **falls at every branch**\n- **So the network is built to make its last step slow, on purpose**, because crossing a vessel wall takes time. Blood in a capillary creeps at well under a millimetre a second, and that is the only reason it is any use\n- **L2B24 treated slowness as the problem. It is the design.** The bottleneck at the far end is what the network exists to feed\n- And the bottom of the curve is **flat**: **10% off costs under 5%**, 25% off costs 18%. So one xylem really can serve every kind of weather, which is what L2B24's checkpoint said a tree must manage -- **near the bottom, almost right is almost free**\n- That flatness also explains the **scatter** in real measurements. A rule can be obeyed loosely and still be the rule\n- **Still standing:** measured exponents are about **2.7 to 3.0** in blood vessels, which fits Murray's law well, and nearer **2 to 2.5** in tree branches, which does not. A branch has to **hold itself up** as well as carry water, and that cost is nowhere in this sum -- which is why trees come closer to keeping their area constant than their cubes. The sum also assumed smooth steady flow and that upkeep scales with volume.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3B24", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Networks Deliver What Matters?**\n\nLevel 2 asked which part of a network is deciding. Level 3 asked why the parts are the size they are, and got three different kinds of answer.\n\n**Summary Table:**\n| | Physics (L3P24) | Chemistry (L3C24) | Biology (L3B24) |\n| --- | --- | --- | --- |\n| What Level 2 assumed | the smallest line is **reachable** | the split is settled by **speed** | the capacities were **given** |\n| What removed it | **cuts**, and the marking rule | letting the products **go back** | the vessel's radius is a **decision** |\n| The result | delivery **=** the smallest cut | ratio = **e to the (gap / R T)** | **r₀³ = r₁³ + r₂³** |\n| The mechanism | **being stuck is itself a cut** | speed says where you arrive, the gap where you **stay** | **friction = half the upkeep** at the best radius |\n| The number | 2^n cuts, and **45 L/min** with no dialled pipe in it | **85%** steadier at 45 °C from 4.6 kJ/mol | best radius **r³ proportional to Q**, so **+26%** per doubling |\n| The surprise | the bottleneck is a **boundary**, not a part | **cold does not favour** the faster product -- it stops the question | the network is built to make its far end **slow** |\n| Still standing | a pipe has **resistance**, not capacity | **how long** equilibrium takes | trees measure **2 to 2.5**, not 3 |\n\n**The one line to remember:** a network's limit is not a part of it but a boundary across it, what a junction hands you depends on what you let it undo, and the sizes of the parts are a settlement between a cost that falls and a cost that rises -- which is why the slowest, widest, most congested end of a living network is the end it was all built to serve.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
