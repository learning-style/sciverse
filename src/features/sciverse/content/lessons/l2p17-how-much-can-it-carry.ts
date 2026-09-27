import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 17, physics.
 *
 * P17 showed that the load path and the bracing decide where force travels, and
 * that two bridges of the same mass and material can fare differently. It never
 * said how much force a given piece of that material can take. This lesson does:
 *
 *   stress = force / area,  in newtons per square millimetre (N/mm2)
 *
 * Worked on a 200 mm square column carrying 400 kN: 40,000 mm2 gives 10 N/mm2,
 * a third of the 30 N/mm2 at which concrete crushes. The checkpoint stretches the
 * same concrete into a column twice as tall, halving the area and doubling the
 * stress to 20 N/mm2 -- same material, same mass, twice the danger.
 *
 * Still standing: the load must press evenly over the whole area, and a long thin
 * column bends before it crushes, which is buckling and belongs to Level 3.
 */
export function getL2P17Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P17 left you with two bridges. Same mass, same concrete, same traffic -- and after ten years one was sound and the other was cracked. The answer was the **load path**: where the force travels.\n\nThat is true, and it hides a question P17 never asked. **How much force can one piece of concrete actually take before it crushes?**\n\nThe two dials under the picture are the **load**, which is the force pressing down in **kilonewtons (kN)**, and the **column width**, the size of the square column in **millimetres (mm)** that has to carry it.\n\nA concrete column **200 mm** square is asked to carry **400 kN** -- about the weight of forty small cars. Does it hold?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "I cannot tell yet. It depends on how much force each square millimetre of the concrete has to carry, not just on the total.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No. 400 kN is an enormous force, far more than a column that size could survive.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It sounds enormous, and on its own the number tells you nothing at all.\n\nHere is why. Press a drawing pin into a board with your thumb. The force from your thumb and the force from the pin's point are **the same force** -- but the thumb is unharmed and the wood is pierced. Nothing about the force changed. What changed is the **area** it was spread over.\n\nSo a force is never dangerous by itself. It is dangerous when it is concentrated. Forty small cars resting on a postage stamp would punch straight through. Forty small cars spread across a car park do nothing at all.\n\nThat is the whole idea of this lesson, and it is why **400 kN** is not yet an answer.",
            options: [
                { id: 'cont', label: "So I need the force and the area together?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly. The quantity that matters is called **stress**, and it is the force divided by the area carrying it:\n\n**stress = force / area**\n\n- **force** in **newtons (N)**. A **kilonewton (kN)** is a thousand newtons, and 1 kN is roughly the weight of a hundred bags of sugar\n- **area** in **square millimetres (mm²)**\n- **stress** therefore comes out in **newtons per square millimetre (N/mm²)**, which engineers also call the **megapascal (MPa)** -- the same unit under two names\n\nEvery material has a stress at which it gives way. For ordinary building concrete that is about **30 N/mm²** in squeezing. Below it the concrete holds; above it the concrete crushes.\n\nThe conditions, and this formula has two.\n\n1. **The force must press evenly over the whole area.** If it lands on one corner, that corner carries far more than the average and the average tells you nothing.\n2. **The column must be short compared with its width.** A long thin column bends sideways and fails long before it crushes. That bending is called **buckling**, and this formula knows nothing about it.",
            options: [
                { id: 'cont', label: "Put the bridge column through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The 200 mm square column, carrying 400 kN.**\n\n**Step 1.** the area: 200 x 200 = **40,000 mm²**\n\n**Step 2.** the force in newtons: 400 kN = **400,000 N**\n\n**Step 3.** stress = 400,000 / 40,000 = **10 N/mm²**\n\n**Step 4.** against concrete's limit of 30 N/mm²: the column is carrying a **third** of what it can take.\n\nSo it holds comfortably, and now you can say why -- not because 400 kN is small, but because 40,000 mm² is a lot of concrete to spread it over.\n\n**Now change only the width.** Same 400 kN, three different columns:\n\n| Column | Area | Stress | Verdict |\n| --- | --- | --- | --- |\n| 150 mm square | 22,500 mm² | **17.8 N/mm²** | holds, with less to spare |\n| 200 mm square | 40,000 mm² | **10.0 N/mm²** | comfortable |\n| 300 mm square | 90,000 mm² | **4.4 N/mm²** | barely notices it |\n\nWidening the column from 150 mm to 300 mm doubles each side, and the stress falls to **a quarter**. That is because the area depends on the width **squared**: double the width, four times the area, a quarter of the stress.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A concrete column is **250 mm** square and carries **500 kN**.\n\nWhat stress is the concrete under, and does it hold?",
            options: [
                { id: 'right', label: "8 N/mm², so it holds easily. The area is 250 x 250 = 62,500 mm², and 500,000 / 62,500 = 8.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'forgot_square', label: "2,000 N/mm², so it crushes. 500,000 / 250 = 2,000.", nextNodeId: 'math_wrong' },
                { id: 'forgot_newtons', label: "0.008 N/mm², so it holds. 500 / 62,500 = 0.008.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both slips are about **units**, and both are worth seeing.\n\n**2,000 N/mm²** divided by the width instead of the area. A width is a length in millimetres; an area is millimetres **squared**. Dividing a force by a length gives you newtons per millimetre, which is a different quantity altogether -- and a number 250 times too big.\n\n**0.008 N/mm²** used **kilonewtons** where the formula wants **newtons**. The answer came out a thousand times too small, which would have told you a column could carry anything at all.\n\n**Step 1.** area = 250 x 250 = **62,500 mm²**\n\n**Step 2.** force = 500 kN = **500,000 N**\n\n**Step 3.** stress = 500,000 / 62,500 = **8 N/mm²**\n\nAgainst concrete's 30 N/mm² that is comfortable. And the habit worth keeping: **write the units beside every number and check they cancel to N/mm².**",
            options: [
                { id: 'retry', label: "Newtons, and the area squared.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Load** sets the force pressing down, from **100 kN** to **1,500 kN**. **Column Width** sets the size of the square column, from **100 mm** to **400 mm**.\n\nThe lab draws the column, shades it by how close the concrete is to crushing, and works out the stress.\n\nTry this:\n\n- **200 mm** at **400 kN**: 10 N/mm², a third of the way to crushing\n- Hold the load and slide the width down to **100 mm**: the stress jumps to **40 N/mm²** and the concrete crushes. A quarter of the width is a sixteenth of the area\n- Hold the width and raise the load instead: the stress climbs in a **straight line**, because force sits on top of the fraction\n- At **200 mm** the column crushes at about **1,200 kN**; at **300 mm** it takes **2,700 kN**\n- Notice what the formula does not contain: the column's **height**. That is the missing piece, and it is why a long thin column is a different problem",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Width matters far more than load. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A builder has a fixed amount of concrete -- exactly enough for a **200 mm** square column, carrying **400 kN** at **10 N/mm²**.\n\nThe design changes and the column must now be **twice as tall**. The builder has no more concrete, so the same material is stretched over twice the height, which leaves **half the area** in the cross-section.\n\nSame concrete. Same mass. Same 400 kN. Is it still safe?",
            options: [
                { id: 'right', label: "No. Half the area doubles the stress to 20 N/mm². It still holds, but it has gone from a third of the limit to two thirds, and the spare capacity is mostly gone.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. The mass of concrete has not changed and neither has the load, so the column is exactly as strong as it was.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is exactly the trap P17 set with its two bridges, and now you can put a number on it.\n\nThe mass is unchanged. The load is unchanged. But **stress does not care about mass** -- it cares about the area the force crosses.\n\n**Before.** area 200 x 200 = 40,000 mm², stress = 400,000 / 40,000 = **10 N/mm²**\n\n**After.** the same concrete stretched to twice the height leaves half the cross-section: 20,000 mm², so stress = 400,000 / 20,000 = **20 N/mm²**\n\n| | Area | Stress | Share of the 30 N/mm² limit |\n| --- | --- | --- | --- |\n| Short column | 40,000 mm² | 10 N/mm² | a third |\n| Twice as tall | 20,000 mm² | **20 N/mm²** | **two thirds** |\n\nNothing was added and nothing was taken away, yet the safety margin fell from twenty spare newtons per square millimetre to ten. **The same mass of material, arranged differently, is a different structure** -- which is what P17 was telling you all along.\n\nAnd there is worse news hiding here, which this formula cannot see: the taller column is also much easier to **buckle**.",
            options: [
                { id: 'retry', label: "Stress counts area, not mass.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Stress is force per area, so the same force through a smaller area is a bigger stress -- however much material you own.**\n\nThat is the number P17 was missing. P17 could tell you *where* the force went. Now you can say *whether the material there can take it*.\n\nIt also explains the drawing pin, the snowshoe and the stiletto heel in one line. A person on snowshoes and the same person in stilettos push down with exactly the same force; the snow holds one up and the other sinks. Nothing about the force differs. Only the area does.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Force per area, not force alone!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a column.**\n\n- **stress = force / area**, in **newtons per square millimetre (N/mm²)**, also called the **megapascal (MPa)**\n- A force is never dangerous by itself -- only when it is **concentrated**\n- A **kilonewton (kN)** is a thousand newtons, so 400 kN is 400,000 N\n- Building concrete crushes at about **30 N/mm²** in squeezing\n- A 200 mm square column carrying 400 kN sits at **10 N/mm²**, a third of the limit\n- Area goes as the width **squared**: double the width, a quarter of the stress\n- At 200 mm the column crushes near **1,200 kN**; at 300 mm near **2,700 kN**\n- The same concrete stretched to twice the height halves the area and **doubles** the stress, to 20 N/mm²\n- So the same mass, arranged differently, is a different structure\n- Removed: P17's silence about how much a material can take\n- Still standing: the load must press **evenly**, and a long thin column **buckles** before it crushes",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Spread the force, or lose the column!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Can It Carry?**\n\nP17 told you where the force goes. Level 2 tells you whether the material there survives it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Stress | **force / area** | Force alone means nothing |\n| Units | N/mm², or MPa | Two names, one unit |\n| Concrete's limit | about **30 N/mm²** | Squeezing, not stretching |\n| The worked column | 400,000 / 40,000 | **10 N/mm²**, a third of the limit |\n| Width squared | double width, quarter stress | 100 mm crushes at 300 kN |\n| Same concrete, taller | area halved | stress **doubled** to 20 N/mm² |\n| Not in the formula | the column's **height** | Which is why buckling is next |\n\n**The one line to remember:** a force is only as dangerous as the area it has to cross, so spreading it out is free strength.\n\n**Up next:** C17 -- concrete is strong when squeezed and weak when stretched, so what carries the stretching?"
        }
    };
}
