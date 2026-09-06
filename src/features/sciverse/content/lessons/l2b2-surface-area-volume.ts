import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B2 "Cells".
 *
 * B2 zoomed in and found cells. This lesson answers the question that zoom
 * raises but never asks: why is every cell so small?
 *
 * The maths is the surface-area-to-volume ratio, which for a cube collapses to
 * 6/L -- a clean inverse proportion, the same shape as mass in L2P1 and c in
 * L2C1's rearranged form. It closes on the mouse and the elephant, which reuses
 * L2C1's heat capacity in a biological setting.
 */
export function getL2B2Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B2 you zoomed into your skin and found **cells** -- millions of tiny living boxes.\n\nHere is something that zoom does not explain. An elephant is roughly ten million times heavier than a mouse. It is **not** built from bigger cells. Elephant cells and mouse cells are about the same size, and so are yours: mostly between **10 and 100 micrometres** across. A **micrometre (µm)** is a thousandth of a millimetre.\n\nAcross almost the whole of life, cells stay microscopic. Elephants simply have more of them.\n\nWhy has nothing evolved a cell you could see?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Something must go wrong as a cell gets bigger -- probably getting enough food and oxygen in through its surface to supply everything inside.", nextNodeId: 'ratio', sentiment: 'positive' },
                { id: 'bad', label: "Big cells would simply be too heavy to hold themselves together, so they would collapse under their own weight.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Weight is not the obstacle. Cells are supported by water and by each other, and a few cells really are enormous -- an ostrich egg yolk is a single cell, and some nerve cells run a metre long. They do not collapse.\n\nBut look at what those exceptions have in common. The egg yolk is a food store that does very little chemistry. The nerve cell is a **thread**, thin along its whole length. Neither is a large **compact** cell doing ordinary work, and that is the shape that never appears.\n\nSo the limit is not about holding together. It is about **supply**.\n\nEverything a cell needs -- oxygen, food molecules, water -- comes in through its **surface**, the membrane B2 showed you. Everything it does with them happens throughout its **volume**.\n\nSo the question is whether surface and volume grow at the same rate as a cell gets bigger.\n\nThey do not, and that is the whole lesson.",
            options: [
                { id: 'cont', label: "How differently do they grow?", nextNodeId: 'ratio' }
            ]
        },
        ratio: {
            id: 'ratio',
            speaker: 'AI',
            content: "Model a cell as a cube of side **L** -- real cells are not cubes, but the conclusion does not depend on the shape.\n\n**Surface area** is six faces, each L by L:\n**SA = 6L²**\n\n**Volume** is L cubed:\n**V = L³**\n\nNow compare them. What matters is not either number on its own but **how much surface there is for each unit of volume**, because that is what decides whether supply can meet demand. So divide -- the same move as L2P2's density and L2C2's relative masses:\n\n**SA / V = 6L² / L³ = 6 / L**\n\nEverything cancels down to **six over L**.\n\nThat is an **inverse proportion**, the same shape as mass in a = F/m. **Double the size and you halve the ratio.**\n\nWatch it happen:\n\n| Side L (µm) | SA (µm²) | V (µm³) | SA/V (per µm) |\n| --- | --- | --- | --- |\n| 1 | 6 | 1 | **6.0** |\n| 2 | 24 | 8 | **3.0** |\n| 4 | 96 | 64 | **1.5** |\n| 10 | 600 | 1,000 | **0.6** |\n| 20 | 2,400 | 8,000 | **0.3** |\n\nFrom 1 µm to 20 µm the surface grows 400 times over -- but the volume grows **8,000** times. The surface is left hopelessly behind.",
            options: [
                { id: 'why', label: "So what actually happens to a cell that gets too big?", nextNodeId: 'starving' }
            ]
        },
        starving: {
            id: 'starving',
            speaker: 'AI',
            content: "It starves in the middle while sitting in plenty.\n\nThink about what each side of the ratio represents.\n\n**Volume sets the demand.** Twice the volume means twice as many organelles burning food, twice as much waste made.\n\n**Surface sets the supply.** Everything crosses the membrane, and a membrane can only pass so much per square micrometre per second.\n\nSo demand grows as **L³** while supply grows as **L²**. Demand always wins eventually, and the cell reaches a size where the middle cannot be reached fast enough. Molecules take time to travel, and doubling the distance to the centre more than doubles the time.\n\nLife has exactly two answers, and it uses both.\n\n**1. Stay small.** This is why almost every cell is microscopic. Not a failure of engineering -- the correct solution.\n\n**2. Fold the surface.** If you cannot shrink the volume, wrinkle the membrane so far more surface fits around the same space. Every extra **folding** multiplies the surface without touching the volume at all.\n\nThat second answer is everywhere once you look:\n\n- Cells lining your **intestine** carry thousands of **microvilli** -- tiny folded fingers that multiply their absorbing surface many times over\n- **Mitochondria** are folded into deep internal ridges, packing in the surface where energy conversion happens\n- Your **lungs** are folded into millions of **alveoli**, giving a surface the size of a tennis court inside your chest\n\nSlide **Cell Size** and **Membrane Folds** and watch the ratio fight back.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me check the arithmetic first.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A cube-shaped cell of side **2 µm** grows to side **4 µm**.\n\nBy what factor does its **volume** grow, and what happens to its **surface-area-to-volume ratio**?",
            options: [
                { id: 'right', label: "Volume grows 8 times, from 8 to 64 µm³, and the ratio halves from 3.0 to 1.5 per µm.", nextNodeId: 'checkpoint', sentiment: 'positive' },
                { id: 'linear', label: "Volume grows 2 times and the ratio also halves, since everything doubled.", nextNodeId: 'math_wrong' },
                { id: 'ratio_up', label: "Volume grows 8 times and the ratio doubles, because the surface got bigger too.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The trap in both answers is treating growth as if everything scales the same way. It does not, and that is the entire point.\n\n**Doubling the side does not double the volume.** Volume is L³, so doubling L multiplies it by **2³ = 8**. From 8 µm³ to 64 µm³. Surface area is L², so it goes up by only **2² = 4**, from 24 µm² to 96 µm².\n\n**And the ratio falls, it does not rise.** The surface did grow -- four times over -- but the volume grew eight times, so there is now **less** surface for each unit of volume:\n\n6 / 2 = **3.0 per µm**\n6 / 4 = **1.5 per µm**\n\nHalved, exactly as **6/L** predicts.\n\nThe habit worth taking away: **when a shape grows, its different measurements grow at different rates.** Lengths go as L, areas as L², volumes as L³. That single fact explains why cells are small, why mice eat constantly, and why a scale model of a bridge cannot simply be built bigger.",
            options: [
                { id: 'retry', label: "Lengths, areas and volumes scale as L, L² and L³.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A mouse and an elephant are both warm-blooded, and both hold their bodies at about the same temperature.\n\nA mouse eats close to a quarter of its own body mass every day. An elephant eats around 4% of its body mass, and can go far longer between meals.\n\nWhy is the small animal the hungry one?",
            options: [
                { id: 'right', label: "The mouse has a far larger surface area for its volume, so it loses heat much faster relative to its size and must keep burning food to replace it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Small animals simply have faster metabolisms, which is an inbuilt property of being small and unrelated to shape.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Small animals do have faster metabolisms -- but that is the thing to be explained, not the explanation. Saying \"it is because they are small\" restates the observation.\n\n**6/L** explains it.\n\nHeat leaves an animal through its **surface**. Heat is generated throughout its **volume**, by exactly the muscle work you costed in L3B1. So an animal's heat problem is governed by the same ratio a cell's food problem is.\n\nA mouse is roughly 5 cm long; an elephant roughly 500 cm. That is a hundredfold difference in length, so the elephant has about **a hundred times less** surface per unit of volume.\n\nThe mouse is bleeding heat away across a huge surface relative to the body making it, and the only way to hold its temperature is to keep the furnace roaring -- so it eats and eats. The elephant has the opposite problem: so little surface for its bulk that **shedding** heat is the difficulty, which is what those enormous ears are for. They are surface, deliberately added, exactly like a cell's microvilli.\n\nAnd notice L2C1 underneath all of this. The animal is mostly water, with a specific heat capacity of 4.2 J/g/°C, so a large animal is a large thermal store that changes temperature slowly. Small body, small store, large surface -- a mouse can chill dangerously in minutes.\n\n**The same ratio that keeps cells microscopic decides how often a mammal must eat.**",
            options: [
                { id: 'retry', label: "Heat leaves by surface and is made by volume -- same ratio.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Supply and loss happen at the surface; demand and production happen in the volume.**\n\nThat completes Big Idea 2 at Level 2, and the three lessons turn out to use one tool.\n\n- **L2P2** divided mass by volume, and the lump's size cancelled, leaving **density** -- a property of the substance\n- **L2C2** divided one atom's mass by another's, and the impossible absolute masses cancelled, leaving **relative atomic mass**\n- **L2B2** divided surface by volume, and got **6/L** -- which decides how big a living thing's parts can be\n\n**Three times, an awkward quantity was divided by something else to produce a number that actually means something.** That is not a coincidence of this Big Idea; it is most of what quantitative science does.\n\nAnd all three answer the Big Idea's question -- *What is everything made of?* -- from different directions. Density says what a lump is. Formula mass says what a molecule is. The surface-to-volume ratio says why living things are built from many small pieces rather than a few large ones.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Surface supplies, volume demands!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the limit on how big a cell can be.**\n\n- Cells are mostly **10 to 100 µm** across; a **micrometre** is a thousandth of a millimetre\n- Elephants have **more** cells than mice, not bigger ones\n- For a cube: **SA = 6L²**, **V = L³**, so **SA/V = 6/L**\n- That is an **inverse proportion** -- double the size, halve the ratio\n- **Lengths scale as L, areas as L², volumes as L³**\n- Surface sets the **supply**; volume sets the **demand**\n- Demand grows faster, so a big cell starves in the middle\n- Life's two answers: **stay small**, or **fold the surface**\n- **Microvilli**, **mitochondria** ridges and **alveoli** are all folded surface\n- The same ratio governs heat: a mouse eats a quarter of its mass daily, an elephant 4%\n- An elephant's ears are added surface, for the opposite problem\n\nBig Idea 2 is complete at Level 2.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "SA/V = 6/L, and that is why cells are small!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Cells Are Small!**\n\nB2 showed you that you are built from cells. Level 2 explains why they had to be microscopic.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Cells are all much the same size | 10-100 **µm** | Elephants have more, not bigger |\n| Cube model | **SA = 6L²**, **V = L³** | Shape does not change the conclusion |\n| The ratio | **SA/V = 6/L** | Inverse: double L, halve it |\n| Scaling | L, L², L³ | Different measures, different rates |\n| Supply and demand | surface in, volume uses | Demand wins as size grows |\n| Answer one | stay small | Why cells are microscopic |\n| Answer two | fold the surface | Microvilli, cristae, alveoli |\n| Same ratio, heat | mouse 25%, elephant 4% | And why elephants have big ears |\n\n**The one line to remember:** volume grows faster than surface, so anything that must be supplied through its skin has a size it cannot exceed.\n\n**Big Idea 2 is complete at Level 2** -- density said what a lump is, formula mass said what a molecule is, and 6/L says why living things are built from many small pieces."
        }
    };
}
