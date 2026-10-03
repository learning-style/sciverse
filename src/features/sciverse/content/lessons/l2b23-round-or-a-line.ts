import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 23, biology. Biology closes the Big Idea, and
 * its summary table covers all three lessons.
 *
 * B23 said healing is a staged process and never said how long any of it takes.
 * The answer is not in the stages -- it is in the geometry. New skin advances from
 * the wound EDGE at about 0.5 mm a day, so:
 *
 *   days to close = (short side / 2) / 0.5 mm per day
 *
 * and the short side of a wound of given area depends entirely on its shape:
 * short side = sqrt(area / shape ratio). So 100 mm2 as a 10 x 10 square closes in
 * 10 days, as a 50 x 2 line in 2 days, and as a circle in 11.3 -- the same area,
 * five times the difference. Shape beats size, which is also L2P23's conclusion
 * about cracks, reached from the opposite direction.
 *
 * Still standing: a constant 0.5 mm a day is only true for a small, well-supplied
 * wound. Level 3 asks what sets that rate and where it fails.
 */
export function getL2B23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B23 told you that healing happens in **stages** -- clotting, then **inflammation** to clean up, then rebuilding. That is the right order and it does not answer the question anyone actually asks, which is **how long?**\n\nAnd the answer is stranger than the stages suggest. Two wounds can have exactly the same **area**, be cleaned up by exactly the same stages, and take five times as long as each other to close.\n\nHere is why. New skin does not appear across the gap. It is made by cells at the **edge** of the wound, which divide and crawl inward over the wound bed, roughly **0.5 mm a day**. The middle of a wound is not healing; it is waiting for the edges to arrive.\n\nSo the time to close has nothing to do with how much wound there is. It depends on **how far the edges have to travel** -- and the edges come in from every side at once.\n\nYour two dials are the two things that decide that distance.\n\n- **Wound Area**, in square millimetres (mm²).\n- **Wound Shape**, from a square patch through to a long thin line, measured as how many times longer than wide it is.\n\nSo: two wounds, both 100 mm². One is a 10 mm square. One is a line 50 mm long and 2 mm wide. Which closes first?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The line — its edges are only 2 mm apart, so they meet in the middle quickly, while the square's edges are 10 mm apart.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "They take the same time, because the area is the same and so is the amount of new skin needed.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The amount of new skin **is** the same -- 100 mm² either way. That is exactly what makes this surprising, and it is why the amount is the wrong thing to count.\n\nThink about where the new skin comes from. Not from the middle; the middle of a wound has nothing in it. It comes from the **rim**, and it creeps inward.\n\nSo the wound closes when the creeping edges **meet**, and that happens when they have covered the distance between them:\n\n- **The 10 mm square:** edges on opposite sides are 10 mm apart. Each advances, so they meet after each has gone **5 mm**.\n- **The 50 x 2 mm line:** the two long edges are only **2 mm** apart. They meet after each has gone **1 mm**.\n\nFive millimetres against one. At 0.5 mm a day that is **10 days against 2 days** -- for the same area of skin, made by the same cells at the same rate.\n\nThe line wins because it has a great deal of **edge** for its area. The square has the same area packed as compactly as possible, so it has the least edge and the longest journey.\n\n**Counting the area tells you how much work there is. Counting the distance to the edge tells you how long it takes.** Those are different questions, and only the second one has days as its answer.",
            options: [
                { id: 'cont', label: "So I need the distance, not the area.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two steps. The first turns area and shape into a distance; the second turns the distance into days.\n\n**Step one -- the short side.** For a wound that is **r** times longer than it is wide,\n\n**short side = √(area / r)**\n\nbecause the long side is r times the short one, and the two multiply to the area.\n\n**Step two -- the time.** The two long edges each come in from their own side, so each covers **half** the short side:\n\n**days to close = (short side / 2) / 0.5 mm per day**\n\nThe **0.5 mm a day** is the speed of the advancing skin. **The condition:** this figure comes from **measurement**, not from any rule, and it holds for a small, clean, well-supplied wound on healthy skin. It is slower in a poorly supplied wound and slower again in an infected one.\n\nNotice which side does the work. **A wound closes across its short side, not along its long one.** The 50 mm length of a cut is almost irrelevant -- it is the 2 mm width that sets the clock. Which is exactly why a surgeon's incision is a **line**: it has barely any width to close, however long it is.\n\nAnd notice the shape of the arithmetic. The area sits under a **square root**, so making a wound four times bigger in area only doubles the time. **Size matters much less than you would expect, and shape matters much more.**",
            options: [
                { id: 'cont', label: "Work one out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A graze covers 100 mm² as a rough square. How long to close?**\n\n1. **The short side:** r = 1, so √(100 / 1) = **10 mm**\n2. **Each edge travels half:** 10 / 2 = **5 mm**\n3. **The days:** 5 mm / 0.5 mm per day = **10 days**\n\n**Now a surgical cut of the same 100 mm², 50 mm long and 2 mm wide.** That is r = 25:\n\n1. **The short side:** √(100 / 25) = **2 mm**\n2. **Each edge travels:** 2 / 2 = **1 mm**\n3. **The days:** 1 / 0.5 = **2 days**\n\n**Same area. Ten days against two.**\n\n**Check it forwards** on the square. If each edge really advances 0.5 mm a day, then after 5 days each has gone 2.5 mm, so the 10 mm gap is down to 10 − 5 = **5 mm** -- half closed, halfway through. ✓\n\n**A round graze can take **weeks** where a cut of the same area takes days, and the next paragraph says why.\n\nAnd the worst shape of all is a circle.** A circle packs area into the least possible edge, so its edges are furthest from the centre. For 100 mm², the radius is √(100/π) = **5.64 mm**, and that is how far the edge must travel:\n\n5.64 / 0.5 = **11.3 days**\n\nSo across every shape with the same 100 mm² of damage, the closing time runs from **11.3 days** for a circle down to **2 days** for a 25:1 line. Nothing about the biology changed. The cells divide at the same rate and crawl at the same speed.\n\nThat is why a clean cut heals so much better than a scrape of the same size, and why surgeons close a wound by **pulling the edges together** -- it does not reduce the area at all, but it collapses the distance the edges must travel to nearly nothing.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A wound covers **400 mm²** and is **4 times** longer than it is wide.\n\nHow long to close, at 0.5 mm a day?",
            options: [
                { id: 'right', label: "10 days — the short side is √(400/4) = 10 mm, each edge travels 5 mm, and 5 / 0.5 = 10.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'noHalf', label: "20 days — the short side is 10 mm, and 10 / 0.5 = 20.", nextNodeId: 'math_wrong' },
                { id: 'area', label: "800 days, from 400 mm² divided by 0.5 mm per day.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**20 days** forgets that the wound has **two** edges. They advance towards each other, so a 10 mm gap closes after each has covered 5 mm, not 10. It is the same factor of 2 that catches people in any problem where two things close on each other.\n\n**800 days** divides an **area** by a **speed**, and the units say so: mm² ÷ (mm/day) gives mm·day, which is not a time. Area is the wrong quantity -- it tells you how much new skin is needed, not how far anyone has to travel.\n\n**√(400/4) = 10 mm, half of that is 5 mm, and 5 / 0.5 = 10 days.**\n\nNow compare it with the 100 mm² square from the worked example, which also took 10 days. **This wound has four times the area and takes exactly the same time.**\n\nThat is the square root doing its work. Four times the area, twice the short side -- except that this wound is also four times longer than wide, which halves the short side back again. The two effects cancel exactly.\n\nSo you can say something quite useful to a patient: **a bigger wound of a better shape heals no slower than a smaller wound of a worse one.** The number to look at is never the size on its own.",
            options: [
                { id: 'retry', label: "Two edges, so halve the gap — and area is the wrong quantity.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Wound Area** in mm² and **Wound Shape** as how many times longer than wide.\n\n| Area | square, r=1 | r=4 | r=25 | r=50 |\n| --- | --- | --- | --- | --- |\n| 25 mm² | 5.0 days | 2.5 | 1.0 | 0.7 |\n| **100 mm²** | **10.0 days** | **5.0** | **2.0** | 1.4 |\n| 400 mm² | 20.0 days | 10.0 | 4.0 | 2.8 |\n\nRead the table both ways and two different lessons come out.\n\n**Down a column:** four times the area only doubles the time, because of the square root. Size is a weak lever.\n\n**Across a row:** the same area closes five times faster as a line than as a square. **Shape is a strong lever** -- and unlike the area, it is the one a surgeon can choose.\n\nWhich is the same conclusion L2P23 reached about cracks, arrived at from the opposite end. There, a flaw's **shape** mattered and its **size** did not: a round hole gives K = 3 whether it is 1 mm or 10 mm across. Here, a wound's shape sets the clock and its area barely moves it.\n\n**Both lessons are really about the edge.** A crack does its damage at its **tip**, and a wound does its healing at its **rim**. In each case what happens in the middle of the thing is beside the point -- the action is all at the boundary, and the boundary's shape decides the outcome.\n\nKeep that in mind for the chemistry too. Rust does not happen inside a piece of steel; it happens on its **surface**, where metal meets water. **All three disciplines in this Big Idea turn out to be about boundaries rather than bulk.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Boundaries, not bulk. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A surgeon has to remove a 100 mm² patch of skin. They could take it as a circle, or as a long thin ellipse of the same area, then stitch the edges together.\n\nStitching does not remove any area. Why does it help so much, and why the ellipse?",
            options: [
                { id: 'right', label: "Because closing time depends on the distance between edges, not the area. An ellipse already has its edges close together, and stitching brings them nearly to zero — so the remaining distance to cover is tiny even though the same amount of skin was lost.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Stitching cannot really help, since the same area of skin is missing either way and the same amount has to be regrown.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The same area **is** missing, and the same amount of new tissue does eventually have to be made. That part is right, and it is not what sets the time.\n\nThe quantity that sets the time is the **distance between the edges**, because that is what the advancing skin has to cross. And stitching changes that distance enormously while changing the area not at all.\n\n- **The circle, left open:** the edge must travel its radius, 5.64 mm, which is **11.3 days**.\n- **The ellipse, left open:** say 50 x 2 mm, the edges are 2 mm apart, so **2 days**.\n- **The ellipse, stitched:** the edges are pulled into contact. The distance to cover is nearly **zero**, and closure takes **hours**.\n\nSo the surgeon has moved the job from eleven days of open wound to a day or so -- and an open wound is where infection gets in, so this is not just about convenience.\n\nAnd the ellipse is chosen because a circle **cannot** be stitched neatly. Pull the sides of a circle together and the ends bunch up into puckers. An ellipse's sides are already nearly parallel and close, so they meet cleanly along their whole length.\n\n**The general move is worth naming: if a process is limited by a distance, change the distance.** Not the amount, not the rate -- the distance. It is the same move as rounding a corner to drop K in L2P23: find which quantity the answer actually depends on, and attack that one.",
            options: [
                { id: 'retry', label: "If a process is limited by a distance, change the distance.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. The same skin is missing either way; what changed is the **distance the edges must cross**. The circle left open is 5.64 mm and **11.3 days**; the ellipse is 2 mm and **2 days**; the ellipse stitched is nearly zero and takes **hours** -- and an open wound is where infection gets in, so this is not only about speed.\n\nThe ellipse is chosen because a circle cannot be stitched neatly: pull its sides together and the ends pucker. An ellipse's sides are already nearly parallel.\n\n**If a process is limited by a distance, change the distance** -- the same move as rounding a corner to drop K in L2P23.\n\nAnd that closes Big Idea 23 at Level 2. Three materials, two of them breaking and one recovering, and the same quantity in charge of all three:\n\n| | What happens | Where it happens | What decides it |\n| --- | --- | --- | --- |\n| **L2P23** | a plate cracks | at the **tip** of a flaw | the flaw's **shape**: K = 1 + 2a/b |\n| **L2C23** | steel corrodes | at the **surface**, metal meeting water | which metal is more **reactive** |\n| **L2B23** | skin closes | at the **rim** of the wound | the distance between **edges** |\n\nRead the middle column. Not one of these happens in the **bulk** of the material. A crack acts at a point a few atoms across; rust happens on a surface; healing happens on a rim. **Breaking and recovering are both boundary events** -- which is why the shape of the boundary, and not the size of the thing, is what you can change.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Breaking and recovering are both boundary events!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what sets the healing time, and it was not the stages.**\n\n- New skin is made at the **edge** of the wound and crawls inward at about **0.5 mm a day**. The middle of a wound is not healing -- it is **waiting for the edges to arrive**\n- So the time depends on **how far the edges travel**, not on how much wound there is\n- **short side = √(area / r)**, where r is how many times longer than wide the wound is\n- **days to close = (short side / 2) / 0.5 mm per day** -- halved, because there are **two** edges coming in\n- The 0.5 mm a day is **measured, not derived**, and holds for a small clean wound on healthy skin\n- A wound closes **across its short side**, so the length of a cut is almost irrelevant -- which is why a surgeon's incision is a **line**\n- **100 mm² closes in 10 days as a square and 2 days as a 50 x 2 line.** Same area, same cells, same rate\n- A **circle** is the worst shape, because it packs area into the least edge: 5.64 mm to travel, **11.3 days**\n- The area sits under a **square root**, so four times the area only doubles the time. **Size is a weak lever; shape is a strong one**\n- Which is why 400 mm² at r = 4 takes exactly as long as 100 mm² at r = 1 -- the two effects cancel\n- **Stitching removes no area at all** and still collapses the time to hours, because it attacks the **distance**\n- **If a process is limited by a distance, change the distance** -- the same move as rounding a corner in L2P23\n- And the Big Idea closes on one word: a crack acts at its **tip**, rust at a **surface**, healing at a **rim**. **Breaking and recovering are both boundary events**, never bulk ones\n- Removed: B23's stages, which gave the order and no duration\n- Still standing: **0.5 mm a day is treated as a constant here**, and it is not. It depends on blood supply, on oxygen, on age and on infection -- and in a large wound the centre is too far from any blood vessel for the usual rules to hold at all. Level 3 asks what sets that rate",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Across the short side, and halve it!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Materials Break and Recover?**\n\n**Summary Table:**\n| | Physics (L2P23) | Chemistry (L2C23) | Biology (L2B23) |\n| --- | --- | --- | --- |\n| **What happens** | a plate cracks | steel corrodes | skin closes |\n| **Where** | at the **tip** of a flaw | at the **surface** | at the **rim** |\n| **The formula** | **K = 1 + 2a/b** | **thickness / rate** | **(short side / 2) / 0.5 mm a day** |\n| **The handy number** | a round hole gives **K = 3** | **85 µm** of galvanising | **0.5 mm** a day |\n| **A worked case** | 100 average, **300** at the hole | **10.6 yr** by the sea, **170** inland | **10 days** square, **2 days** as a line |\n| **What you can change** | the **corner**, not the thickness | the **place**, or the thickness | the **distance**, by stitching |\n| **What barely matters** | the flaw's **size** | -- | the wound's **area** |\n| **Still standing** | K goes to **infinity** | a **scratch** should rust | 0.5 mm a day is not constant |\n\n**The one line to remember:** none of these three happens in the bulk of the material -- a crack acts at its tip, rust on a surface, healing on a rim -- so in every case it is the shape of the boundary, not the size of the thing, that you can actually change.\n\n**Where this leaves Big Idea 23:** the question was how materials break and recover, and the three disciplines agree on something none of them says alone. Both halves are **edge** processes. Breaking begins at the sharpest point of a flaw and spreads inward; recovery begins at the rim of the damage and closes inward. Level 3 pushes each one until it breaks: K running to infinity, a scratch that refuses to rust, and a healing rate that is not a constant at all."
        }
    };
}
