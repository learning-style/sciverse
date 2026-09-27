import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 17, biology. The synthesis lesson.
 *
 * Removes L2B17's simplification that the gain from going hollow is the reach
 * ratio. It is not: bending stiffness counts distance from the centre to the
 * fourth power.
 *
 *   I = pi (R^4 - r^4) / 4   for a tube,   I = pi r^4 / 4   for a rod
 *
 * The same material as a solid rod of radius 10 mm, rolled into a 2 mm wall,
 * reaches 2.6 times as far -- and is 12.5 times stiffer. At a 1 mm wall the reach
 * is 5.05 times and the stiffness 50 times. For a thin wall the gain is close to
 * 2 x (reach)^2, which the learner can reason out from I = A r^2 / 2 against
 * A r^2 / 4, and which drifts once the wall is thick.
 *
 * This is the same I that L3P17 needed for buckling, so a 300 mm hollow bone
 * resists buckling 12.5 times better than a solid one of the same material.
 *
 * Still standing: a thin wall buckles locally, and a real bone is not a clean tube.
 */
export function getL3B17Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B17 rolled a solid rod into a tube and measured the gain as a **reach ratio**. The same material, 10 mm of it, reached **26 mm** out with a 2 mm wall -- **2.6 times** as far, with nothing added.\n\nThat was honest as far as it went, and it understated the answer badly. It left you thinking the tube is about two and a half times better.\n\nThe two dials under the picture are the same two as before: **wall thickness** in **millimetres (mm)** and **material amount**, given as the radius of the solid rod the same bone would make. The same dials, because the question is the same -- only the sum has grown up.\n\nL3P17 needed a quantity called **I**, the second moment of area, and said it counts distance from the centre to the **fourth power**. So: if the tube reaches 2.6 times as far, how much stiffer is it really?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Much more than 2.6 times. If distance counts to the fourth power then reaching further out should pay several times over, not once.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "About 2.6 times. The reach is the measure of how far the material got, so that is the improvement.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The reach is a real measurement, and it is not the improvement -- it is the **input** to the improvement.\n\nThink about why distance matters at all. L2B17 argued it as a lever: material further from the centre line resists bending with more leverage, as a longer spanner turns a stiffer bolt. That argument is right, and it is only half of what is going on.\n\nWhen a beam bends, the material further out is not merely pulling with more leverage. It is also being **stretched further** to begin with. Bend a thick book and look at the edge: the outermost pages slide a long way, the middle pages barely move. So a piece of material sitting twice as far from the centre does two things at once -- it is stretched twice as much, **and** its pull acts over twice the leverage.\n\nTwo factors of distance, multiplied. That is why the sum contains distance **squared** for each piece of material, and why totalling it over a round section produces a **fourth power** of the radius.\n\n**Being 2.6 times further out is worth far more than 2.6 times.**",
            options: [
                { id: 'cont', label: "Then give me the sum.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The quantity is the **second moment of area**, **I**, in **mm⁴** -- the same I that L3P17 put into the buckling load. For round sections:\n\n**solid rod: I = π r⁴ / 4**\n\n**tube: I = π (R⁴ − r⁴) / 4**\n\nwhere **R** is the outer radius and **r = R − wall** is the inner one. The tube's sum is the big circle's I minus the missing middle's I, exactly as L2B17's area sum was the big circle minus the hole.\n\nNotice what the fourth power does to the hole. In the **area** sum, R² − r², a 26 mm tube with a 24 mm hole keeps 100 out of 676 -- about 15%. In the **I** sum, R⁴ − r⁴, it keeps 125,200 out of 456,976, which is **27%**. The missing middle costs far less stiffness than it costs material, because the middle was never contributing much stiffness in the first place.\n\n**And there is a shortcut worth knowing.** For a thin-walled tube you can show that I is close to **A R² / 2**, where A is the material's area, while a solid rod of the same area has **A r² / 4**. Divide one by the other and the A cancels:\n\n**stiffness gain ≈ 2 x (reach ratio)²**\n\nSo a reach of 2.6 predicts about 2 x 6.8 = **13.5 times**. The exact sum gives 12.5, so the shortcut is good to about 8% here.\n\nIts condition is the interesting part: **the shortcut only holds while the wall is thin.** At a 3 mm wall it predicts 6.6 and the truth is 5.6; by a 6 mm wall it predicts 2.6 against a true 1.6. The thinner the wall, the better it works -- which is the opposite of most approximations you meet.",
            options: [
                { id: 'cont', label: "Put the bone through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The same material as a solid rod of radius 10 mm.**\n\n**Step 1.** the solid rod: I = π x 10⁴ / 4 = π x 10,000 / 4 = **7,854 mm⁴**\n\n**Step 2.** rolled into a **2 mm** wall, L2B17 found it reaches R = **26 mm**, so r = 24 mm\n\n**Step 3.** the tube: I = π x (26⁴ − 24⁴) / 4 = π x (456,976 − 331,776) / 4 = π x 125,200 / 4 = **98,332 mm⁴**\n\n**Step 4.** the gain: 98,332 / 7,854 = **12.5 times stiffer**\n\nNot 2.6 times. **Twelve and a half**, on exactly the same material, with nothing added and nothing taken away.\n\n| Wall | Reach | Stiffness I | Gain | Shortcut 2 x reach² |\n| --- | --- | --- | --- | --- |\n| 1 mm | 5.05x | 392,738 mm⁴ | **50.0x** | 51.0 |\n| 2 mm | 2.60x | 98,332 mm⁴ | **12.5x** | 13.5 |\n| 3 mm | 1.82x | 43,990 mm⁴ | 5.6x | 6.6 |\n| 6 mm | 1.13x | 12,320 mm⁴ | 1.6x | 2.6 |\n| solid | 1.00x | 7,854 mm⁴ | 1.0x | 2.0 |\n\nRead the last column downwards and you can watch the shortcut fail: excellent at 1 mm, fair at 2 mm, poor by 6 mm, and frankly wrong for a solid rod, where it claims a factor of two over itself.\n\n**And now collect the debt from L3P17.** That lesson's buckling load was π²EI/L², and here is I. Take a **300 mm** length of bone, with E about **17,000 N/mm²** for compact bone:\n\n- solid: buckling load = π² x 17,000 x 7,854 / 300² = **14,600 N**\n- hollow, 2 mm wall: π² x 17,000 x 98,332 / 300² = **183,000 N**\n\nThe same **12.5 times**, because I is the only thing that changed. **The hollow bone does not merely bend less. It survives more than twelve times the load before it folds.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same 10 mm of material, rolled into a **1 mm** wall, reaches **R = 50.5 mm**, so r = 49.5 mm.\n\nHow much stiffer is it than the solid rod? (The solid rod is 7,854 mm⁴.)",
            options: [
                { id: 'right', label: "About 50 times. I = π x (50.5⁴ − 49.5⁴) / 4 = 392,738 mm⁴, and 392,738 / 7,854 = 50.0.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_reach', label: "About 5 times, because the reach ratio is 5.05.", nextNodeId: 'math_wrong' },
                { id: 'subtracted_first', label: "About 0.02 times. (50.5 − 49.5)⁴ = 1, so I = π x 1 / 4 = 0.785 mm⁴.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**5 times** is the reach, which is the whole mistake this lesson exists to correct. The reach is how far the material got; the stiffness counts that distance to the **fourth power**. And the shortcut tells you roughly what to expect: 2 x 5.05² = about **51**.\n\n**0.02 times** subtracted the radii **before** raising them to the fourth power. (R − r)⁴ is not R⁴ − r⁴, and the difference here is enormous: 1 against 125,200. Raise each radius to the fourth power **first**, then subtract.\n\n**Step 1.** 50.5⁴ = **6,502,000** (near enough)\n\n**Step 2.** 49.5⁴ = **6,002,000**\n\n**Step 3.** the difference: **500,000**, and I = π x 500,000 / 4 = **392,700 mm⁴**\n\n**Step 4.** the gain: 392,700 / 7,854 = **50 times**\n\nHalving the wall from 2 mm to 1 mm took the stiffness gain from 12.5 to 50 -- it **quadrupled**. And that is exactly what the shortcut predicts, because halving the wall roughly doubles the reach, and the gain goes as reach squared.",
            options: [
                { id: 'retry', label: "Fourth power first, then subtract.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, the same two as L2B17.\n\n**Wall Thickness** runs from **1 mm** to **6 mm**. **Material Amount** runs from **5 mm** to **15 mm**, as the radius of the solid rod the same material would make.\n\nThe lab draws the rod and the tube, and reports the reach, the stiffness I of each, and the gain.\n\nTry this:\n\n- **10 mm** of material, **2 mm** wall: reach 2.6x, stiffness **12.5x**\n- Slide the wall to **1 mm**: reach 5.05x, stiffness **50x**. Halving the wall quadruples the gain\n- Slide the wall to **6 mm**: reach 1.13x, stiffness only **1.6x**. A thick-walled tube is barely worth the trouble\n- Now change the material instead, holding the wall at 2 mm. **5 mm** of material gains 3.2x, **15 mm** gains 28x. More material makes a thin wall pay far better, which is why large animals have markedly hollower bones than small ones\n- Compare the two numbers the lab prints. The reach climbs gently; the stiffness climbs steeply. That gap **is** the fourth power",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "So thinner is always better? Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A 1 mm wall gives **50 times** the stiffness of the solid rod, and a 0.5 mm wall would give about 200 times. The sum has no upper limit, and the material never changes.\n\nL2B17 already told you a thin wall **folds**. But name the failure precisely: what exactly goes wrong, and why does the I sum not see it coming?",
            options: [
                { id: 'right', label: "The wall buckles locally -- a patch of it dents inwards -- rather than the whole bone bending. I measures resistance to the bone bending as a whole, so it knows nothing about one small piece of wall caving in.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The bone runs out of material. A thinner wall spread over a wider circle eventually has too little left to carry anything.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Check the premise: every row of that table holds **exactly the same material**, 314 mm² of it. Nothing runs out. The 1 mm wall has the same bone in it as the solid rod -- it has simply been drawn out into a wider, thinner ring.\n\nWhat fails is not the amount but the **shape**, and at a scale the I sum never looks at.\n\n**I describes the whole section bending as one piece.** It assumes the ring keeps its round shape while the bone as a whole curves. A very thin wall stops obeying that assumption: a small patch of it dents inwards on its own, the ring goes out of round, and once the section has lost its shape the I you calculated no longer describes anything. That is **local buckling**, and you have now met buckling three times in this Big Idea:\n\n| Lesson | What buckles | What the sum could not see |\n| --- | --- | --- |\n| L2P17 | a tall thin column | height, absent from stress = force / area |\n| L3P17 | the same column, now in the sum | pinned ends, and an initially bent column |\n| L3B17 | a patch of thin wall | the section going out of round |\n\nReal bone stops far short of the sum's optimum for a second reason too: a leg gets **hit**. A thin wall is superb against steady bending and poor against a sharp blow, which dents it and starts exactly the fold described above. And the spongy lattice L2B17 mentioned is partly there to hold the wall in shape.\n\n**Every one of these lessons ends at the same place: the formula runs out before the material does.**",
            options: [
                { id: 'retry', label: "The wall dents, and I never looks that closely.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Stiffness counts distance to the fourth power, so a hollow bone of the same material is 12.5 times stiffer at a 2 mm wall and 50 times at 1 mm -- until the wall grows so thin that a patch of it dents and the section loses the round shape the sum assumed.**\n\nAnd that closes Big Idea 17. Six lessons, one argument:\n\n- **P17** -- the **load path** decides where force travels. Two bridges of equal mass, different fates\n- **L2P17** -- **stress = force / area**. The same concrete made taller doubles its stress to 20 N/mm²\n- **L3P17** -- a column has **two** failure loads and fails at the lower. **π²EI/L²** against 30 x area, equal at **5.74 m**\n- **C17 and L2C17** -- the materials are unequal: **3 N/mm²** for concrete stretched against **400** for steel, so a little steel goes where the pulling is\n- **L3C17** -- and it must be **steel**, because it expands like concrete, is passivated by its alkalinity, and is stiff enough to take load first\n- **L3B17** -- while a bone puts its material where distance counts to the **fourth power**, buying **12.5 times** the stiffness for nothing\n\n**How do structures stay standing? By arranging material against the force -- and every sum that describes it holds only inside conditions worth naming.** A bridge pier, a reinforced beam and a thigh bone are one idea, examined six times.\n\n**What is still standing in this lesson:** **local buckling** of the wall, which needs the wall's own curvature rather than the whole section's I. A real bone is **not a clean tube** -- it has a spongy interior, varies along its length, and is constantly rebuilt. And nothing here covers a **sharp blow**, which is a different failure again.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The fourth power, and where the formula stops!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted the fourth power.**\n\n- Bending stiffness is the **second moment of area**, **I**, in **mm⁴** -- the same I as L3P17's buckling sum\n- **solid rod: I = π r⁴ / 4**; **tube: I = π (R⁴ − r⁴) / 4**\n- Distance counts **twice**: material further out is stretched more **and** pulls with more leverage\n- Raise each radius to the fourth power **first**, then subtract. (R − r)⁴ is not R⁴ − r⁴\n- 10 mm of material at a **2 mm** wall: reach 2.6x but stiffness **12.5x**\n- At a **1 mm** wall: reach 5.05x and stiffness **50x** -- halving the wall **quadruples** the gain\n- At a **6 mm** wall: only **1.6x**. A thick-walled tube is barely worth it\n- Shortcut for thin walls: **gain ≈ 2 x (reach)²**, good to 8% at 2 mm and useless by 6 mm\n- The missing middle costs 85% of the material but only 73% of the stiffness\n- More material pays more: at a 2 mm wall, 5 mm of material gains 3.2x and 15 mm gains **28x**\n- Feeding I into **π²EI/L²**: a 300 mm bone buckles at **14,600 N** solid and **183,000 N** hollow\n- Removed: L2B17's reach ratio as the measure of the gain\n- Still standing: **local buckling** of the wall, a real bone not being a clean tube, and sharp blows",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Distance to the fourth power!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Fourth Power**\n\nL2B17 measured how far the material got. Level 3 measures what that distance is worth.\n\n**Summary Table:**\n| Lesson | The Maths | What It Gave You |\n| --- | --- | --- |\n| **P17** Structures & Loads | the **load path** | Where the force travels |\n| **L2P17** How Much Can It Carry? | **force / area** | Same concrete, taller, twice the stress |\n| **L3P17** When Tall Columns Bend | **π² E I / L²** | Two failures, equal at **5.74 m** |\n| **C17** Construction Materials | two materials, two jobs | Why not one material |\n| **L2C17** How Much Steel? | **tension / 400** | 120 kN needs four 10 mm bars |\n| **L3C17** Why Steel, of All Metals | **α x ΔT x length** | 1 mm of slip against aluminium's 6.5 |\n| **L2B17** Why Bones Are Hollow | **R = r²/(2w) + w/2** | Reach **2.6x** on the same material |\n| **L3B17** The Fourth Power | **π(R⁴−r⁴)/4** | Stiffness **12.5x**, and 50x at 1 mm |\n| All six | — | Material arranged against the force |\n| Still standing | **buckling**, three times over | The formula runs out first |\n\n**How do structures stay standing?** Because a force is only as dangerous as the area it crosses, the materials carrying it are wildly unequal and must be chemically compatible, and distance from the centre pays to the fourth power. A bridge pier, a reinforced beam and a thigh bone are the same idea, and every sum describing them names the conditions where it stops.\n\n**Big Idea 17 is complete at Level 3.**"
        }
    };
}
