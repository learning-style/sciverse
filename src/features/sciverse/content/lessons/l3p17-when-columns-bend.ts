import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 17, physics.
 *
 * Removes L2P17's condition that the column must be short compared with its
 * width. A tall column does not crush; it bends sideways and folds, which is
 * buckling, and it arrives at a load the crushing sum never sees:
 *
 *   buckling load = pi^2 x E x I / L^2       (Euler, pinned at both ends)
 *
 * E is the material's stiffness in N/mm2, about 30,000 for concrete. I is the
 * second moment of area in mm4, b^4/12 for a square. L is the height.
 *
 * Worked on the 200 mm square column from L2P17: crushing arrives at 1,200 kN
 * whatever the height, while buckling arrives at 4,386 kN at 3 m and only 617 kN
 * at 8 m. The two are equal at 5.74 m, and that height is the whole lesson --
 * below it the column crushes, above it the column buckles.
 *
 * Still standing: the ends are assumed pinned, the column perfectly straight, and
 * the material still springy at the moment it buckles.
 */
export function getL3P17Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P17 gave you a column that holds or crushes, decided by one sum: **stress = force / area**. A 200 mm square concrete column crushes at about **1,200 kN**, and that was that.\n\nIt also attached a condition, twice, and then walked away from it: **the column must be short compared with its width.** L2B17 met the same condition wearing a different coat -- a bone wall too thin folds instead of crushing.\n\nThe two dials under the picture are the **column height** in **metres (m)** and the **column width** in **millimetres (mm)**.\n\nNow take that same 200 mm column and make it **eight metres** tall. Nothing about the concrete has changed. Does it still carry 1,200 kN?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. Long before the concrete is crushed it will bow sideways and fold. Height must enter the sum somewhere, and stress = force / area has no room for it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. The area has not changed and neither has the concrete, so 1,200 kN is still 1,200 kN.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The sum you have says exactly that -- which is the point. **The sum is incomplete.**\n\nTake a plastic ruler and press down on both ends. You will never crush it. It bows sideways, suddenly, and once it has bowed it takes almost nothing to push it further. Now snap a short stub off that ruler and press: the stub refuses to bow and you cannot break it with your hands at all.\n\nSame plastic. Same cross-section. Utterly different failure, and the only thing you changed was the **length**.\n\nThat sideways collapse is called **buckling**, and it has three uncomfortable features.\n\n- It depends on **height**, which crushing does not\n- It arrives **suddenly**, with no warning crack\n- It can arrive at a load far **below** the crushing load, so the crushing sum tells you the column is fine right up until it folds\n\nL2P17 was honest about leaving this out. Now it comes back.",
            options: [
                { id: 'cont', label: "So what load does it buckle at?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The load at which a straight column bows is:\n\n**buckling load = π² x E x I / L²**\n\n- **E** is the material's **stiffness**, called the **Young modulus**, in **N/mm²**. It is not strength: it measures how hard the material resists being stretched or squashed at all. Concrete is about **30,000 N/mm²**, steel about 200,000\n- **I** is the **second moment of area**, in **mm⁴**. It measures how far the material sits from the centre line -- the same quantity L2B17 was reaching for when it moved bone outwards. For a square of side b, **I = b⁴ / 12**\n- **L** is the **height**, in **mm**\n\nRead the shape of it before any arithmetic. **L is squared, and it is underneath.** Double the height and the buckling load falls to a **quarter**. Meanwhile the crushing load does not change at all, because area does not care how tall the column is.\n\nSo a column has **two** failure loads, and the real answer is whichever is **smaller**:\n\n**it crushes at 30 x area, and it buckles at π²EI/L² -- it fails at the lower of the two**\n\nThe conditions, and this formula has three.\n\n1. **The ends are pinned** -- free to tilt but not to move sideways. Clamping them rigidly makes a column about four times harder to buckle, and the formula shown here does not know that.\n2. **The column is perfectly straight.** A real column is not, and a bend it already has makes it buckle sooner.\n3. **The material is still springy when it buckles.** If the sum predicts buckling at a load that would have crushed the concrete anyway, the concrete crushes and buckling never happens.",
            options: [
                { id: 'cont', label: "Put the 200 mm column through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The 200 mm square concrete column, at two heights.**\n\n**Step 1.** the second moment of area: I = 200⁴ / 12 = 1,600,000,000 / 12 = **1.333 x 10⁸ mm⁴**\n\n**Step 2.** the crushing load, from L2P17: 30 x 200 x 200 = 1,200,000 N = **1,200 kN**, whatever the height\n\n**Step 3.** at a height of **3 m** = 3,000 mm:\n\nbuckling load = π² x 30,000 x 1.333 x 10⁸ / 3,000² = **4,386 kN**\n\nThat is far above 1,200 kN, so this column **crushes** -- buckling never gets a chance, and L2P17's answer was right.\n\n**Step 4.** at a height of **8 m** = 8,000 mm:\n\nbuckling load = π² x 30,000 x 1.333 x 10⁸ / 8,000² = **617 kN**\n\nNow buckling arrives first, at barely **half** the crushing load. A builder trusting L2P17 alone would load this column to 1,000 kN believing it safe, and it would fold.\n\n| Height | Buckling load | Crushing load | It fails by |\n| --- | --- | --- | --- |\n| 3 m | 4,386 kN | 1,200 kN | **crushing** |\n| 5 m | 1,579 kN | 1,200 kN | crushing, only just |\n| 6 m | 1,097 kN | 1,200 kN | **buckling**, only just |\n| 8 m | **617 kN** | 1,200 kN | **buckling** |\n\n**And there is one height where the two are equal.** Set π²EI/L² = 1,200 kN and solve for L:\n\nL = √(π² x 30,000 x 1.333 x 10⁸ / 1,200,000) = **5,736 mm, about 5.74 m**\n\nBelow 5.74 m this column crushes. Above it, the column buckles. One number divides the two worlds.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same 200 mm square concrete column, now **6 m** tall.\n\nWhat load does it buckle at, and which failure comes first? (E = 30,000 N/mm², I = 1.333 x 10⁸ mm⁴, crushing at 1,200 kN)",
            options: [
                { id: 'right', label: "About 1,097 kN, and buckling comes first -- but only just, because crushing is 1,200 kN and the two are close.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'linear', label: "About 2,193 kN. At 3 m it was 4,386 kN, so at twice the height it is half as much.", nextNodeId: 'math_wrong' },
                { id: 'wrong_unit', label: "About 1,097,000 kN, from π² x 30,000 x 1.333 x 10⁸ / 6².", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**2,193 kN** halved the load for double the height. But **L is squared**: doubling the height divides the buckling load by **four**, not two. From 4,386 kN at 3 m you get 1,097 kN at 6 m -- and the difference between halving and quartering is the difference between a column that stands and one that folds.\n\n**1,097,000 kN** used the height in **metres** where the formula wants **millimetres**. Everything else in the sum is in newtons and millimetres, so 6 must become 6,000. Getting it wrong by a factor of a thousand in a squared term is a factor of a **million** in the answer.\n\n**Step 1.** L = 6 m = **6,000 mm**, so L² = **3.6 x 10⁷ mm²**\n\n**Step 2.** the top: π² x 30,000 x 1.333 x 10⁸ = **3.948 x 10¹³**\n\n**Step 3.** buckling load = 3.948 x 10¹³ / 3.6 x 10⁷ = 1,097,000 N = **1,097 kN**\n\n**Step 4.** against crushing at 1,200 kN: **buckling wins, by about 9%**\n\nAnd that closeness is worth sitting with. At 6 m the two failures are nearly tied, which means a small error in either sum flips which one you should have designed against.",
            options: [
                { id: 'retry', label: "L squared, and in millimetres.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Column Height** runs from **2 m** to **10 m**. **Column Width** runs from **100 mm** to **400 mm**, as in L2P17.\n\nThe lab draws the column, marks both failure loads, and shades whichever one arrives first.\n\nTry this:\n\n- **200 mm** at **3 m**: buckling 4,386 kN against crushing 1,200 kN, so it **crushes**\n- Hold the width and raise the height. Watch the buckling load fall away as the **square** of height while the crushing load sits flat\n- Somewhere near **5.74 m** the two cross, and the column changes which way it fails\n- **200 mm** at **10 m**: buckling is down to **395 kN**, a third of the crushing load\n- Now widen the column instead. Width helps buckling **far** more than it helps crushing, because I goes as b⁴ while area goes as b². Doubling the width gives four times the crushing load and **sixteen** times the buckling load\n- That is why a tall column is made fat rather than made of better concrete",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Height hurts, width helps enormously. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An architect wants a column **twice as tall** and asks the engineer to keep the same load capacity by using **stronger concrete** -- doubling the crushing limit from 30 to 60 N/mm².\n\nThe column is already tall enough to be buckling rather than crushing.\n\nDoes stronger concrete rescue it?",
            options: [
                { id: 'right', label: "No. Doubling the height quarters the buckling load, and the crushing limit is not what buckling depends on -- buckling uses E and I, not strength. Stronger concrete barely changes E, so the column is four times worse off and the money is wasted.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Doubling the strength of the concrete doubles what the column can take, which covers the extra height.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the trap the formula is built to expose, and it turns on a distinction worth holding onto: **strength and stiffness are different properties.**\n\n- **Strength** is the stress at which a material gives way -- 30 N/mm² for ordinary concrete, 60 for a high grade\n- **Stiffness**, the **E** in the buckling sum, is how hard it resists deforming at all\n\nBuckling contains **E**, not strength. And here is the cruel part: making concrete twice as strong raises its E by only about a **quarter**, not double. The two properties are barely related.\n\nSo line it up:\n\n| | Buckling load |\n| --- | --- |\n| Original column | 100% |\n| Twice as tall | **25%** -- height is squared |\n| Twice as tall, twice as strong | about **31%** -- E rose a quarter |\n\nThe architect has paid for stronger concrete and bought back six percentage points of a seventy-five point loss.\n\n**What would work?** Make the column **wider**. I goes as b⁴, so widening by just a fifth doubles the buckling load, and widening it twice over gives sixteen times. Or clamp the ends instead of pinning them, which buys about four times. Strength was never the lever.",
            options: [
                { id: 'retry', label: "Buckling wants stiffness and shape, not strength.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A column has two failure loads and fails at the lower: crushing, which ignores height, and buckling, which falls as the square of it -- and buckling depends on stiffness and shape, not on strength.**\n\nSo L2P17's answer was not wrong, it was **conditional**, and now you can say exactly when the condition holds: below 5.74 m for that particular column.\n\nAnd notice what **I** has done. L2B17 moved bone material outwards and measured the gain as a **reach ratio** -- 2.6 times as far. The buckling sum shows what that reach is actually worth, because I counts distance from the centre to the **fourth power**. That is L3B17's subject, and it is the same quantity in both sums.\n\n**What is still standing in this lesson:** the ends are assumed **pinned**, and clamping them changes the answer by about four times. The column is assumed **perfectly straight**, which no real column is, and any bow it starts with makes it buckle sooner. And the formula assumes the material is still **springy** at the moment it buckles, which fails for short stubby columns where the concrete crushes first anyway.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Two failures, and the lower one wins!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the second way to fail.**\n\n- A tall column does not crush -- it bows sideways and folds, which is **buckling**\n- **buckling load = π² x E x I / L²**\n- **E** is **stiffness**, the **Young modulus**: about **30,000 N/mm²** for concrete, 200,000 for steel\n- **I** is the **second moment of area**: **b⁴ / 12** for a square, counting distance from the centre to the **fourth power**\n- **L is squared and underneath**, so doubling the height leaves a **quarter** of the buckling load\n- Crushing ignores height entirely: 30 x area, always\n- **A column fails at the lower of the two loads**\n- The 200 mm column: 4,386 kN buckling at 3 m, 1,097 kN at 6 m, **617 kN** at 8 m, against 1,200 kN crushing\n- The two are equal at **5.74 m** -- below it crushes, above it buckles\n- Width helps buckling far more than crushing: b⁴ against b², so double the width is **sixteen** times the buckling load\n- **Strength and stiffness are different.** Doubling concrete's strength raises E by only about a quarter, so stronger concrete barely helps a buckling column\n- Removed: L2P17's condition that the column be short\n- Still standing: **pinned** ends, a **perfectly straight** column, and springy material at the moment it buckles",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Height squared, and stiffness not strength!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- When Tall Columns Bend**\n\nL2P17 asked whether the material survives the stress. Level 3 asks whether the column survives at all.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Two ways to fail | crushing, or buckling | The **lower** load wins |\n| Crushing | 30 x area | Height does not enter |\n| Buckling | **π² E I / L²** | Height squared, underneath |\n| Stiffness E | 30,000 N/mm² concrete | Not the same as strength |\n| Shape I | **b⁴ / 12** | Distance to the fourth power |\n| The worked column | 4,386 kN at 3 m | 617 kN at 8 m |\n| The dividing height | **5.74 m** | Crushes below, buckles above |\n| Width | b⁴ against b² | Double width, **16x** the buckling load |\n| Stronger concrete | E rises a quarter | Buys back 6 of 75 points |\n| Removed | L2P17's short column | Height is in the sum now |\n| Still standing | pinned ends, straight column | Clamping buys about 4x |\n\n**The one line to remember:** a column has two failure loads and fails at the smaller, and the tall one is decided by stiffness and shape rather than by how strong the material is.\n\n**Up next:** C17 at Level 3 -- why steel, of all the metals, is the one that can live inside concrete."
        }
    };
}
