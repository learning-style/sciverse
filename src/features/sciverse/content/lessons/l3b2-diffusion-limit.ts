import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 2, biology. The synthesis lesson.
 *
 * L2B2's 6/L is a correct observation attached to an incomplete reason. The
 * ratio falls linearly with size, but the real constraint is diffusion TIME,
 * which goes as the square of the distance -- so the penalty for growing is
 * far harsher than 6/L suggests, and folding the membrane cannot fix it.
 *
 * That is what forces bulk transport, which is why anything large has a
 * circulatory system rather than simply more microvilli.
 */
export function getL3B2Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B2 gave you a clean rule: **SA/V = 6/L**. Double a cell's size and the surface available for each unit of volume halves.\n\nHalving sounds survivable. A cell with half the relative surface might simply work half as hard, or grow half as fast.\n\nBut that is not what happens. Cells do not gradually struggle as they enlarge -- there is a size beyond which they essentially cannot function, and it arrives far sooner than \"half as good\" would suggest.\n\nSo **6/L** is describing something real, but it is not the thing that actually stops a cell growing. What is?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Probably how long molecules take to travel to the middle. It is no use having enough surface if oxygen arrives too late to be any use.", nextNodeId: 'diffusion', sentiment: 'positive' },
                { id: 'bad', label: "The membrane must become too weak to hold a larger volume together, so the cell bursts before supply becomes the problem.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Membranes are stronger than that, and L2B2's exceptions prove it -- an ostrich egg yolk is one enormous cell and holds together perfectly well.\n\nWhat that yolk does **not** do is respire quickly throughout its volume. It is a store, not a workshop. Which points at the real limit.\n\n6/L counts **how much** surface there is per unit of volume. It says nothing about **how long** anything takes to get from that surface to the middle.\n\nAnd inside a cell there is no pump and no current. A molecule of oxygen crossing the membrane is not delivered anywhere. It simply wanders, knocked in random directions by collisions with water molecules, millions of times a second.\n\nThat wandering is called **diffusion**, and it is how everything moves inside a cell. It has no destination and no speed you can quote -- and the way it behaves over distance is what sets the real size limit.",
            options: [
                { id: 'cont', label: "How does diffusion behave over distance?", nextNodeId: 'diffusion' }
            ]
        },
        diffusion: {
            id: 'diffusion',
            speaker: 'AI',
            content: "Badly, and it gets worse quickly.\n\nBecause a diffusing molecule is knocked randomly rather than travelling in a straight line, it makes very poor progress. Wandering twice as far does **not** take twice as long -- it takes about **four times** as long. Three times the distance takes nine times as long.\n\nThe typical time to wander a distance **L** is:\n\n**t ≈ L² / 2D**\n\n**D** is the **diffusion coefficient**, a measure of how freely that particular molecule moves through that particular medium. For oxygen in water it is about **2 x 10⁻⁹ m²/s**. Its units look strange -- metres squared per second -- and that is the formula telling you, in the units themselves, that **distance is squared here**.\n\nNow put real cell sizes in:\n\n| Distance to the centre | Time for oxygen to arrive |\n| --- | --- |\n| **10 µm** (a typical cell) | **0.025 s** |\n| **100 µm** | **2.5 s** |\n| **1 mm** | **250 s** -- over 4 minutes |\n| **1 cm** | about **7 hours** |\n\nA hundredfold increase in size costs a **ten-thousandfold** increase in time.\n\nThat is the real wall. At 10 µm, oxygen crosses a cell in a fortieth of a second and arrives fast enough to supply everything inside. At 1 mm the centre waits four minutes -- and a cell consuming oxygen continuously would have exhausted its supply long before.\n\n**6/L falls linearly. Diffusion time rises as the square.** The second is what kills.",
            options: [
                { id: 'try', label: "Let me check that scaling.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A spherical cell has a radius of **20 µm**, and oxygen takes about **0.1 s** to diffuse to its centre.\n\nThe cell grows to a radius of **40 µm**. How long does oxygen now take to reach the centre?",
            options: [
                { id: 'right', label: "About 0.4 s. The distance doubled, and diffusion time goes as the square, so the time goes up four times.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'linear', label: "About 0.2 s, since the distance doubled and so does the time.", nextNodeId: 'math_wrong' },
                { id: 'halved', label: "About 0.05 s, because the bigger cell has more surface to take oxygen in through.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two instincts to correct, and the second is the more important.\n\n**0.2 s** assumes time is proportional to distance, which is true for anything travelling at a steady speed -- a car, a runner, a molecule in a moving current. Diffusion is none of those. A wandering molecule has no speed and no direction, and its progress goes as the **square root of time**. Turn that around and the time goes as the **square of the distance**:\n\nt ∝ L², so doubling L multiplies t by 2² = **4**. 0.1 s becomes **0.4 s**.\n\n**0.05 s** is the interesting mistake, because it imports L2B2's framing into a question about time. Extra surface does let more oxygen **enter** per second -- that part is right. But it does nothing about how long a molecule takes to cross the inside, and no amount of surface makes the journey shorter.\n\n**Surface area and transport time are separate problems, and folding solves only the first.** A cell can have all the membrane it likes and still starve at the centre, because the trouble is the distance, not the doorway.",
            options: [
                { id: 'retry', label: "Time goes as the square of distance -- and surface cannot fix that.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Cell Size** sets how far oxygen must travel to reach the centre. **Oxygen Demand** sets how fast the cell is consuming it.\n\nThe lab plots the two curves that matter: the **time to arrive**, rising as L², and the **time the cell can survive** on what is already inside, which falls as demand rises.\n\nWhere they cross is the largest that cell can be.\n\nDrag **Cell Size** slowly and watch the arrival time. From 10 µm to 20 µm looks harmless. From 100 µm to 200 µm is catastrophic -- the same doubling, but four times a much bigger number.\n\nThat is what a squared relationship does. **The penalty for growing is not constant; it grows with you.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The penalty grows with the size. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** L2B2 said life's answer to the surface problem was to **fold the membrane** -- microvilli, cristae, alveoli.\n\nSo why can a human not simply be one very large, very heavily folded cell? Why does every animal above a few millimetres across need a **heart and blood vessels**?",
            options: [
                { id: 'right', label: "Folding adds surface but cannot shorten the journey. Diffusion over centimetres would take hours, so large bodies need bulk flow -- pumping material along, which moves it at a real speed instead of letting it wander.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Because a single cell that large could not hold enough organelles to run a whole body, so the work has to be divided between many cells.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Organelle count is not the obstacle -- a bigger cell could hold proportionally more of them. The obstacle is the one you just calculated.\n\nAcross a human body, diffusion is hopeless. Oxygen taking **7 hours** to cross a centimetre would need **months** to cross a torso, and every cell along the way is consuming it as it passes. It would never arrive at all.\n\nFolding cannot help. A fold puts more doorway on the outside; it does not shorten the corridor. **The two problems are independent, and evolution had to solve them separately.**\n\nSo large organisms do something diffusion cannot: they **carry** things. Blood is pumped, at roughly half a metre per second in the aorta, and pumped flow is completely different from wandering -- the time is proportional to distance, not to its square. That is what makes a body of any size possible.\n\nAnd notice the division of labour. Blood does the long haul, then stops. It never delivers oxygen **into** a cell; it only brings it within a few micrometres, and diffusion covers that last tiny step in a fraction of a second, where its square law costs almost nothing.\n\n**Bulk flow for the long distances, diffusion for the last few micrometres.** Capillaries exist precisely so that no cell in your body is more than about 20 µm from one -- back inside the range where L² is harmless.",
            options: [
                { id: 'retry', label: "Bulk flow for the distance, diffusion for the last step.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Folding fixes surface. Only bulk flow fixes distance.**\n\nSo L2B2's conclusion survives while its reason is replaced -- and that is worth being explicit about, because it is a real pattern in science.\n\n**6/L was a correct observation attached to an incomplete cause.** Cells are small; the ratio does fall; supply does become harder. But if surface were the only problem, folding would have solved it and large cells would be everywhere. They are not, because the binding constraint was always **L²**, and nothing about a membrane can touch it.\n\nBig Idea 2 at Level 3, then, is three simplifications removed:\n\n- **L3P2** -- L2P2 said density identifies a material. Not for gases, where density is set by pressure and temperature.\n- **L3C2** -- L2C2 gave ratios that could compare but never weigh. The **mole** converts them into grams.\n- **L3B2** -- L2B2 said cells are small because surface loses to volume. Truer: because **diffusion time goes as the square of the distance**.\n\nAnd all three still answer the Big Idea's question. *What is everything made of?* Particles whose spacing is negotiable, counted in moles, arranged in units small enough for diffusion to reach the middle.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Right observation, incomplete reason!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the real limit on cell size.**\n\n- **6/L** falls linearly, which is too gentle to explain how sharply cells stop growing\n- Inside a cell nothing is pumped -- molecules move by **diffusion**, a random wander\n- Wandering twice as far takes about **four** times as long\n- **t ≈ L² / 2D**, and the units of **D** (m²/s) show the squaring\n- Oxygen in water: **D ≈ 2 x 10⁻⁹ m²/s**\n- **10 µm: 0.025 s.** **1 mm: over 4 minutes.** **1 cm: about 7 hours**\n- A hundredfold size increase costs **ten thousand** times the wait\n- Surface area and transport time are **separate problems**\n- **Folding fixes surface only** -- it cannot shorten the journey\n- Large bodies need **bulk flow**: pumped blood, where time is proportional to distance\n- Capillaries keep every cell within about **20 µm**, where L² is harmless again\n\nBig Idea 2 is complete at Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "t goes as L², and folding cannot help!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why 6/L Was Not the Whole Story!**\n\nL2B2 got the answer right and the reason only half right. Level 3 supplies the rest.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| 6/L is too gentle | falls linearly | Cells stop far more sharply |\n| Diffusion is a random wander | no speed, no direction | Nothing is pumped inside a cell |\n| The square law | **t ≈ L² / 2D** | Twice the distance, four times the wait |\n| The units say so | **D** in **m²/s** | Distance is squared in the formula |\n| Real numbers | 10 µm: 0.025 s; 1 cm: 7 hours | A hundredfold size, ten-thousandfold wait |\n| Two separate problems | surface, and distance | Folding solves only the first |\n| Life's third answer | **bulk flow** | Pumped blood: time ∝ distance |\n| Why capillaries are dense | every cell within ~20 µm | Back where L² costs nothing |\n\n**The one line to remember:** a cell cannot outgrow the time it takes a molecule to wander to its middle, and no amount of surface will shorten that wander.\n\n**Big Idea 2 is complete at all three levels** -- density that identifies, mass that can be counted out, and a size limit written by the square of a distance."
        }
    };
}
