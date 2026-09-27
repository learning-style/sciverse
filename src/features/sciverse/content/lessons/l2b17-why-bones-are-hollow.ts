import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 17, biology. The synthesis lesson.
 *
 * B17 said a bone is hollow and stronger per gram than concrete, and left hollow
 * sounding like a way to save weight. It is not: the same material rolled into a
 * tube reaches further from the centre, and material further out has more leverage
 * against bending, exactly as a longer spanner turns a bolt more easily (L2P5).
 *
 *   tube area = pi x (R^2 - (R - wall)^2)
 *
 * and for the same material as a solid rod of radius r:  R = r^2 / (2 x wall) + wall / 2
 *
 * Worked on a solid rod of radius 10 mm, area 314 mm2. Rolled into a 2 mm wall it
 * reaches 26 mm -- 2.6 times as far, with not one extra gram. At 1 mm wall it
 * reaches 50.5 mm, 5.05 times. The checkpoint asks why bones stop there: a wall
 * too thin buckles, which is the same limit L2P17 left standing.
 *
 * Ties the Big Idea: P17's load path says where the force goes, L2P17 says whether
 * the material there survives it, L2C17 puts the right material where the stress
 * is, and this lesson puts the material where it counts most.
 *
 * Still standing: a very thin wall buckles, and the full bending law needs the
 * fourth power of the radius, which is Level 3.
 */
export function getL2B17Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B17 showed you the surprise: a **femur** -- the thigh bone -- is not a solid rod. It is a tube with a spongy middle, and it is stronger for its weight than concrete.\n\nThat is true, and it leaves one word doing too much work: **hollow**. Hollow sounds like a way of **saving weight**, as though the bone gave up some strength to become lighter.\n\nIt did not. A hollow bone can be **stronger** than a solid one made of exactly the same amount of material.\n\nThe two dials under the picture are the **wall thickness**, how thick the ring of hard bone is in **millimetres (mm)**, and the **material amount**, given as the radius of the solid rod you could have made instead.\n\nSo: same bone material, same mass. Why would rolling it into a tube make it **stronger**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Because a tube puts the material further out from the centre, and material further from the centre must be doing more to resist bending.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It would not be stronger. Removing the middle has to leave it weaker -- the saving is in weight, and strength is what you pay.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the obvious reading of the word, and the geometry says otherwise.\n\nHere is the trick. You are not **removing** the middle. You are **moving** it. The same bone material is still there -- it has simply been pushed outwards to form a ring, and the ring is wider than the rod was.\n\nAnd width is the thing that matters, because bending is a **lever** problem. L2P5 showed that a long spanner turns a stiff bolt that a short one cannot, because the force acts further from the pivot. Bending a tube is the same argument backwards: material sitting further from the centre line resists the bend with more leverage.\n\nSo the middle of a solid rod is the least useful material in it. It sits right on the centre line, where it has almost no leverage at all -- it is carried, not carrying. Move it to the outside and it starts to work.\n\n**A hollow bone is not a lighter solid bone. It is the same material, standing further out.**",
            options: [
                { id: 'cont', label: "How much further out?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "That is exactly the sum to do. A ring's area is the big circle minus the hole:\n\n**tube area = π x (R² − (R − wall)²)**\n\n- **R** is the **outer radius**, in **millimetres (mm)**\n- **wall** is the thickness of the ring of hard bone\n- **R − wall** is therefore the inner radius, the edge of the hollow\n\nNow the useful question. If you have a fixed amount of material -- say exactly enough for a **solid rod of radius r** -- and you roll it into a tube of a chosen wall thickness, **how far out does it reach?**\n\nSet the two areas equal, π r² = π (R² − (R − wall)²), and the answer falls out:\n\n**R = r² / (2 x wall) + wall / 2**\n\nThat formula is the whole lesson. It says the **thinner the wall, the further the same material reaches**.\n\nThe conditions, and there are two.\n\n1. **The material amount is fixed.** This is a fair comparison only because the tube and the rod contain exactly the same bone, so nothing has been added.\n2. **The wall cannot be made as thin as you like.** A very thin wall folds inwards under load instead of holding -- the **buckling** that L2P17 also had to leave aside. Real bone stops well short of the thinnest wall the sum allows.",
            options: [
                { id: 'cont', label: "Put numbers through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A solid rod of radius 10 mm, rolled into a tube.**\n\n**Step 1.** the material: area = π x 10² = **314 mm²**\n\n**Step 2.** choose a **2 mm** wall and find the outer radius:\n\nR = 10² / (2 x 2) + 2 / 2 = 100 / 4 + 1 = **26 mm**\n\n**Step 3.** check it holds the same material: π x (26² − 24²) = π x (676 − 576) = π x 100 = **314 mm²** ✓\n\n**Step 4.** compare the reach: 26 mm against the rod's 10 mm, which is **2.6 times as far** -- with not one extra gram of bone.\n\n**Thinner walls reach further still:**\n\n| Wall | Outer radius | Reach against the rod |\n| --- | --- | --- |\n| 1 mm | **50.5 mm** | **5.05 times** |\n| 2 mm | 26.0 mm | 2.60 times |\n| 3 mm | 18.2 mm | 1.82 times |\n| 4 mm | 14.5 mm | 1.45 times |\n| 6 mm | 11.3 mm | 1.13 times |\n\nEvery row holds the same 314 mm² of bone. The only thing that changes is **where** it sits.\n\nAnd read the bottom row carefully: a 6 mm wall on this much material is barely a tube at all -- an 11.3 mm outer radius with a 5.3 mm hole. It has gained almost nothing, because the wall is so thick that the material has hardly moved outwards.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same material -- enough for a solid rod of radius **10 mm** -- is rolled into a tube with a wall of only **1 mm**.\n\nHow far out does it reach?",
            options: [
                { id: 'right', label: "50.5 mm. R = 10² / (2 x 1) + 1 / 2 = 100 / 2 + 0.5 = 50.5 mm, which is 5.05 times the rod.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'forgot_half', label: "50 mm. R = 10² / (2 x 1) = 50 mm exactly.", nextNodeId: 'math_wrong' },
                { id: 'doubled', label: "20 mm, because halving the wall from 2 mm to 1 mm should double the 26 mm reach to about 20 mm.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**50 mm** dropped the **+ wall / 2**. It is a small term, and here it is worth only half a millimetre -- but it is the piece that makes the areas match exactly, and leaving it out means your tube quietly holds slightly less material than the rod did. At a 6 mm wall the same term is worth 3 mm, which is no longer small.\n\n**20 mm** guessed at a pattern instead of using the formula, and guessed the wrong direction: halving the wall makes the reach **larger**, not smaller. Look at the shape of the sum -- the wall sits **underneath** r², so a smaller wall makes a bigger answer.\n\n**Step 1.** R = r² / (2 x wall) + wall / 2\n\n**Step 2.** R = 10² / (2 x 1) + 1 / 2\n\n**Step 3.** R = 100 / 2 + 0.5 = **50.5 mm**\n\n**Step 4.** against the rod's 10 mm, that is **5.05 times** the reach.\n\nSo halving the wall from 2 mm to 1 mm took the reach from 26 mm to 50.5 mm -- it very nearly **doubled**, which is the pattern the wrong answer was groping for, in the other direction.",
            options: [
                { id: 'retry', label: "Thinner wall, further reach.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Wall Thickness** sets how thick the ring of hard bone is, from **1 mm** to **6 mm**. **Material Amount** sets how much bone there is, given as the radius of the solid rod it would make, from **5 mm** to **15 mm**.\n\nThe lab draws the solid rod and the tube side by side, both holding the same material, and works out how far the tube reaches.\n\nTry this:\n\n- **10 mm** of material with a **2 mm** wall: the tube reaches **26 mm**, **2.6 times** the rod\n- Slide the wall down to **1 mm**: the reach jumps to **50.5 mm**. Thinner walls reach much further\n- Slide the wall up to **6 mm**: only **11.3 mm**, barely wider than the rod. A thick-walled tube is almost a rod\n- Now hold the wall at 2 mm and change the material instead. **5 mm** of material reaches 7.25 mm, **1.45 times**; **15 mm** of material reaches 57.25 mm, **3.82 times**\n- So the same wall pays off more when there is more material to spread. That is why a thin-walled tube suits a large bone and a small bone stays closer to solid",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Thinner and wider wins. So why stop? Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The sum says a **1 mm** wall reaches **50.5 mm** and a **0.5 mm** wall would reach further still. Thinner is always wider, and the material never changes.\n\nSo why has no animal evolved a bone with a paper-thin wall?",
            options: [
                { id: 'right', label: "Because a very thin wall stops behaving like a ring and folds inwards instead -- it buckles. The formula counts area and reach, and knows nothing about the wall collapsing.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Because a thin-walled bone would weigh too little to be useful, and the animal needs the mass for other reasons.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Read the sum again: every row of that table holds **the same 314 mm²** of bone. The thin-walled tube does not weigh less. Nothing has been saved and nothing has been lost -- the material has only moved.\n\nSo weight cannot be the reason, and the real reason is one this formula cannot see.\n\nA thin wall does not fail by being crushed. It fails by **folding**. Press on a drinks can from above and it does not crumble like concrete; a dent appears and the side caves inwards. That is **buckling**, and it arrives long before the material itself gives way.\n\nYou have now met the same missing idea twice in one Big Idea:\n\n| Lesson | What the formula counted | What it could not see |\n| --- | --- | --- |\n| L2P17 | force spread over area | a tall thin column **bending** |\n| L2B17 | material spread outwards | a thin wall **folding** |\n\nBoth are buckling. So a real bone settles where the two pressures meet: thin enough for the material to reach out and work, thick enough not to fold. **Evolution stopped where the sum stopped being the whole story.**",
            options: [
                { id: 'retry', label: "It folds rather than crushes.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The same material moved outwards does more work, until the wall becomes so thin that it folds instead of holding.**\n\nAnd that closes Big Idea 17, because all four lessons have been making one argument from different directions:\n\n- **P17** -- the **load path** decides where the force travels. Two bridges of the same mass fare differently\n- **L2P17** -- **stress = force / area**, so whether the material at that place survives depends on how much of it is there. The same concrete stretched taller doubles its stress\n- **C17 and L2C17** -- the materials are unequal. Concrete takes **30 N/mm²** squeezed and **3 N/mm²** stretched, steel takes **400 N/mm²** stretched, so a little steel goes exactly where the stretching is\n- **L2B17** -- and a bone puts its material where the leverage is, reaching **2.6 times** further with a 2 mm wall and not one extra gram\n\n**How do structures stay standing? By putting material where the force is, not by having more of it.** A bridge, a beam and a thigh bone are three answers to that one question.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Where the material sits, not how much!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured a hollow bone.**\n\n- Hollow does **not** mean lighter. The tube and the rod hold the **same material**\n- **tube area = π x (R² − (R − wall)²)**\n- For the same material as a solid rod of radius r: **R = r² / (2 x wall) + wall / 2**\n- Bending is a **lever** problem, as in L2P5: material further from the centre resists with more leverage\n- The middle of a solid rod is its least useful material -- it is carried, not carrying\n- 10 mm of material with a **2 mm** wall reaches **26 mm**, **2.6 times** as far\n- With a **1 mm** wall it reaches **50.5 mm**, **5.05 times** -- halving the wall nearly doubles the reach\n- With a **6 mm** wall, only 11.3 mm: a thick-walled tube is almost a rod\n- More material pays more: at a 2 mm wall, 5 mm of material gains 1.45 times but 15 mm gains 3.82\n- A wall cannot be as thin as the sum allows, because a thin wall **folds** -- buckling, the same gap L2P17 left\n- Removed: B17's suggestion that hollow was about saving weight\n- Still standing: **buckling**, and the full bending law needs the **fourth power** of the radius",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Move the material out, and it works harder!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Bones Are Hollow**\n\nB17 said a bone is hollow. Level 2 says how much that buys, and why it stops.\n\n**Summary Table:**\n| Lesson | The Maths | What It Gave You |\n| --- | --- | --- |\n| **P17** Structures & Loads | the **load path** | Where the force travels |\n| **L2P17** How Much Can It Carry? | **force / area** | 400 kN on 40,000 mm² is 10 N/mm² |\n| **C17** Construction Materials | concrete squeezed, steel stretched | Why two materials, not one |\n| **L2C17** How Much Steel? | **tension / 400** | 120 kN needs 300 mm², four 10 mm bars |\n| **L2B17** Why Bones Are Hollow | **R = r²/(2w) + w/2** | 2 mm wall reaches **2.6 times** as far |\n| All four | — | Material where the force is |\n| Still standing | **buckling** | A tall column bends, a thin wall folds |\n\n**How do structures stay standing?** Because a force is only as dangerous as the area it crosses, the materials carrying it are wildly unequal, and the same material moved outwards does more work. A bridge pier, a reinforced beam and a thigh bone are the same idea three times.\n\n**Big Idea 17 is complete at Level 2.**"
        }
    };
}
