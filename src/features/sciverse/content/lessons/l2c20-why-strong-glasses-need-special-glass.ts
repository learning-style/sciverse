import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 20, chemistry.
 *
 * C20 said that high-index glass lets you make a thinner lens for the same
 * bending power, and left it as an assertion with no number. This lesson supplies
 * the number, which turns out to be a ratio that depends on nothing but the two
 * materials:
 *
 *   thickness compared with ordinary glass = (1.52 - 1) / (n - 1)
 *
 * Worked on n = 1.74: 0.52 / 0.74 = 0.70, so 70% of the thickness -- 30% thinner,
 * whatever the lens's size or prescription. An 8 D lens 50 mm across goes from
 * about 4.8 mm thick to about 3.4 mm.
 *
 * The (n - 1) is asserted here, because deriving it needs the idea that light is
 * delayed in glass. L3P20 derives it, so this lesson says plainly that it is
 * borrowed for now.
 *
 * Still standing: nothing here says what high-index glass costs you, and it does
 * cost something -- Level 3 finds it in the colours.
 */
export function getL2C20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C20 finished with a smartphone camera and a claim: use glass with a higher **refractive index** and you can make a thinner lens that bends light just as strongly. It sounded reasonable and it came with no number, so there was no way to tell whether it mattered.\n\nIt matters most to somebody with a strong prescription. L2P20 gave you the unit: a **dioptre** is the power of a lens, and 1 dioptre means a focal length of 1 metre. Someone at **-8 dioptres** needs a lens that bends light hard, and in ordinary glass that lens comes out thick and heavy at the edges -- the look people call bottle-bottom glasses.\n\nSo the question is worth a number. How much thinner does special glass actually make it, and how many millimetres does that save? Draw the two lenses to the same scale and you can see the answer.\n\nYour two dials are the two things that decide.\n\n- **Refractive Index** is how strongly a material bends light, written **n**. Air is 1.00, water 1.33, ordinary spectacle glass 1.52, and the best spectacle materials reach about 1.74. Diamond is 2.42.\n- **Lens Power** is the prescription, in dioptres.\n\nBefore the arithmetic, a guess. Ordinary glass is n = 1.52 and the good stuff is n = 1.74. That is about 15% more. Does the lens come out about 15% thinner?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Probably not -- what should matter is how much the glass differs from the air around it, not the raw value of n.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes -- 15% more bending power should mean roughly 15% less thickness.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the natural guess and it is a long way out, because of what n actually measures.\n\n**n is a comparison with a vacuum**, not a measure of bending. It says how much slower light goes in the material: n = 1.52 means light travels 1.52 times slower in that glass than in empty space. And a material with n = 1.00 -- which is air, near enough -- bends light not 1.00 times but **not at all**.\n\nThat is the clue. If n = 1.00 gives zero bending, then bending cannot be proportional to n. It must be proportional to how far n sits **above 1**.\n\nSo compare the two glasses properly:\n\n- **Ordinary glass:** n = 1.52, so n - 1 = **0.52**\n- **High-index glass:** n = 1.74, so n - 1 = **0.74**\n\nAnd 0.74 / 0.52 = **1.42**. Not 15% more bending for the same shape, but **42% more**.\n\nThis is why a small-looking change in n is worth paying for. The difference between 1.52 and 1.74 looks like a rounding error, and the quantity that matters has gone up by nearly half.",
            options: [
                { id: 'cont', label: "So it is n - 1 that counts. How does that set the thickness?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "A lens gets its power from two things: **how curved its surfaces are**, and **how strongly the material bends light**. Those multiply together:\n\npower depends on curvature x (n - 1)\n\nNow fix the prescription. If you need a particular power and you switch to a material with a bigger (n - 1), you can afford **less curvature** -- a flatter lens. And a flatter lens is a thinner one, because thickness is what curvature costs you.\n\nRun that through and the thickness comes out inversely proportional to (n - 1):\n\n**thickness compared with ordinary glass = (1.52 - 1) / (n - 1)**\n\nwhich is just 0.52 divided by (n - 1).\n\nTwo things worth being clear about:\n\n- **This is a ratio, so the lens's size and prescription cancel out.** A given material is the same percentage thinner whether the lens is weak or strong. What changes with prescription is how many millimetres that percentage is worth -- and that is the whole point.\n- **The (n - 1) is borrowed.** This lesson takes it as given that power goes with (n - 1); it does not show why. That comes at Level 3, from the fact that light is slowed inside glass.\n\n**The condition:** this compares lenses of the same shape and diameter. A smaller lens is thinner for reasons that have nothing to do with the glass.",
            options: [
                { id: 'cont', label: "Put a strong prescription through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Switching a lens from ordinary glass to n = 1.74.**\n\n1. **Ordinary glass:** n - 1 = 1.52 - 1 = **0.52**\n2. **High-index glass:** n - 1 = 1.74 - 1 = **0.74**\n3. **Relative thickness:** 0.52 / 0.74 = **0.70**\n\nSo the lens is **70% as thick**, which is **30% thinner**. And because it is a ratio, that 30% holds for every prescription.\n\nWhat changes with prescription is what 30% is worth. Take a lens **50 mm across**, which is an ordinary spectacle size:\n\n| Prescription | Ordinary glass | n = 1.74 | Saved |\n| --- | --- | --- | --- |\n| 2 D | 1.2 mm | 0.8 mm | 0.4 mm |\n| 4 D | 2.4 mm | 1.7 mm | 0.7 mm |\n| 8 D | 4.8 mm | 3.4 mm | 1.4 mm |\n\nAt 2 dioptres the saving is four tenths of a millimetre, which nobody would notice or pay for. At 8 dioptres it saves nearly a millimetre and a half off a lens that was almost 5 mm thick, and that is the difference between spectacles that look normal and spectacles that do not.\n\n**Same 30%, completely different decision** -- and that is why opticians offer high-index glass to some customers and not others. The percentage is a property of the material. Whether it is worth having is a property of your eyes.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A customer is offered glass with **n = 1.67** instead of ordinary 1.52 glass.\n\nHow thick is the lens compared with ordinary glass?",
            options: [
                { id: 'right', label: "About 78% as thick, so 22% thinner. 0.52 / 0.67 - 1 = 0.52 / 0.67 ... that is 0.52 divided by 0.67, which is 0.78.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'raw_ratio', label: "About 91% as thick, from 1.52 / 1.67.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "About 129% as thick, from 0.67 / 0.52.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1.52 / 1.67 = 0.91** uses the raw indices and gives the answer the opening guess would have given: about 9% thinner. Test it against a case you already know. Air has n = 1.00, and by that method a lens made of air would be 1.52 times as thick as glass -- thick, but possible. In truth a lens made of air bends nothing at all and **no thickness would work**. The raw ratio cannot be right, because it does not know that 1 is the number where bending stops.\n\n**0.67 / 0.52 = 1.29** has the right quantities and is upside down. It says better glass makes a **thicker** lens. Check the direction before trusting the arithmetic: stronger bending per millimetre should need **fewer** millimetres, so the better material belongs on the bottom.\n\n**0.52 / 0.67 = 0.78**, so about **78% as thick** -- 22% thinner. Sitting between the 0% of ordinary glass and the 30% of n = 1.74, which is what you would expect from an index between the two.",
            options: [
                { id: 'retry', label: "Subtract 1 first, and put the better glass on the bottom.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Refractive Index** and **Lens Power** in dioptres, for a lens 50 mm across.\n\n| Material | n | n - 1 | Relative thickness | Thinner by |\n| --- | --- | --- | --- | --- |\n| Ordinary glass | 1.52 | 0.52 | 1.00 | — |\n| Mid-index | 1.60 | 0.60 | **0.87** | 13% |\n| High-index | 1.67 | 0.67 | **0.78** | 22% |\n| Highest spectacle glass | 1.74 | 0.74 | **0.70** | 30% |\n| Diamond, for comparison | 2.42 | 1.42 | **0.37** | 63% |\n\nDiamond is in that table to make a point rather than a suggestion. It would give a spectacle lens barely a third the thickness -- and nobody makes spectacles from diamond, for reasons that have nothing to do with optics.\n\nNotice how the gains shrink as you climb. Going from 1.52 to 1.60 buys 13%. Going from 1.67 to 1.74 buys only another 8 points, because you are dividing by a number that is already large. **The first step of improvement is always the cheapest.** That is why 1.60 and 1.67 are the common upgrades and 1.74 is a specialist choice.\n\nAnd move the power dial while watching the millimetres rather than the percentage. The ratio never budges; the millimetres saved grow in proportion to the prescription. Which is the honest way to answer a customer asking whether the upgrade is worth it: **look at their prescription, not at the percentage.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Same percentage, different millimetres. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An optician has two customers, both offered n = 1.74 glass at the same extra cost.\n\n- **Customer A** has a **-1.5 D** prescription.\n- **Customer B** has a **-8 D** prescription.\n\nBoth lenses would be 30% thinner. Should the optician give both the same advice?",
            options: [
                { id: 'right', label: "No. 30% of a thin lens is a fraction of a millimetre, which A will never notice; 30% of B's nearly 5 mm lens is about 1.4 mm, which changes how the glasses look and feel.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- the improvement is 30% for both, so the value is the same and both should take it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The percentage really is the same for both. That is exactly why the percentage is the wrong number to decide on.\n\nWork out what it is worth in millimetres, for a lens 50 mm across:\n\n- **Customer A, -1.5 D:** about 0.9 mm thick in ordinary glass, 0.6 mm in 1.74. **Saved: 0.3 mm**, which is about the thickness of three sheets of paper. Nobody can see it or feel it.\n- **Customer B, -8 D:** about 4.8 mm thick in ordinary glass, 3.4 mm in 1.74. **Saved: 1.4 mm**, off a lens that was thicker than four stacked coins at the edge.\n\nSame 30%, and one of them is worth paying for.\n\nThis is a general trap with percentages, and it is worth naming because it turns up everywhere: **a percentage tells you nothing about a size.** 30% off a large thing and 30% off a small thing are the same arithmetic and entirely different decisions. You have met it once before in this curriculum, in L2C18: a probe reading told you the concentration and nothing about how much rock was leaving the valley.\n\nSo the optician should offer the upgrade to B and honestly tell A not to bother. Which is also why a shop that quotes only the percentage is not giving anyone enough to decide with.",
            options: [
                { id: 'retry', label: "A percentage says nothing about a size.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **0.3 mm against 1.4 mm**, from the same 30%.\n\nSo C20's claim survives, with a number attached and a condition on it: high-index glass really does make a thinner lens, by an amount that depends only on the two materials, and it is worth buying only for a strong prescription.\n\nAnd notice how this level's two lessons fit together. **L2P20** gave you the power of a lens in dioptres and showed that powers add. **This lesson** says what it costs in glass to produce that power. Put them side by side and you can price a prescription: how strongly must the lens bend, and how thick does that make it in each material?\n\nOne thing is conspicuously missing, though, and it should bother you. If high-index glass is thinner for the same power, and thinner is better, **why is anybody still making lenses out of 1.52 glass?** It cannot only be cost -- ordinary glass is standard even where money is no object, and camera makers with large budgets still use low-index elements on purpose.\n\nSo high index must cost something other than money. Level 3 finds out what, and the answer is in the colours.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Subtract 1 first -- that is where the bending lives.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You priced C20's claim in millimetres.**\n\n- **n** is how much slower light goes in a material than in empty space: glass 1.52, water 1.33, diamond 2.42\n- Bending is **not** proportional to n. A material with n = 1.00 bends light **not at all**, so what counts is how far n sits above 1\n- **thickness compared with ordinary glass = (1.52 - 1) / (n - 1)**, which is 0.52 divided by (n - 1)\n- Going from 1.52 to 1.74 looks like a 15% change and is really **42% more bending** for the same shape: 0.74 / 0.52\n- So the lens is **70% as thick -- 30% thinner** -- and because it is a ratio, that holds for every prescription\n- What changes is the millimetres. On a lens 50 mm across: **0.4 mm saved at 2 D, 1.4 mm at 8 D**\n- **A percentage tells you nothing about a size.** Same 30%, and only one customer should buy it\n- The gains shrink as you climb: 1.52 to 1.60 buys 13%, and the last step to 1.74 only 8 points more\n- Diamond would give a lens **63% thinner**, and nobody makes spectacles from it, for non-optical reasons\n- Removed: C20's \"high-index glass makes a thinner lens\", asserted with no number\n- Still standing: the **(n - 1) is borrowed** -- this lesson does not show why bending depends on it, which needs the idea that light is slowed inside glass. And nothing here says what high index **costs**, which it does",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Why is anyone still using ordinary glass?", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Lenses Change What We See?**\n\nC20 said better glass makes a thinner lens. Level 2 says by how much, and for whom it is worth it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Refractive index | **n**, a comparison with empty space | Glass 1.52, diamond 2.42 |\n| What bends light | **n - 1**, not n | Because n = 1 bends nothing |\n| Relative thickness | **0.52 / (n - 1)** | A ratio, so size cancels |\n| n = 1.74 | 0.52 / 0.74 | **0.70**, so 30% thinner |\n| The same 30% | at 2 D and at 8 D | 0.4 mm, or 1.4 mm |\n| Diminishing gains | 1.52 to 1.60 buys 13% | The last 8 points cost most |\n| The trap | a percentage hides a size | Offer it to the strong prescription |\n| Borrowed | that power goes with **(n - 1)** | Level 3 derives it |\n| Not in the formula | what high index **costs** | Level 3 finds it in the colours |\n\n**The one line to remember:** what bends light is how far a material's index sits above 1, so the unimpressive step from 1.52 to 1.74 buys 42% more bending and a lens 30% thinner -- worth paying for at 8 dioptres and not at 2.\n\n**Up next:** B20 gave you an eye that focuses by squeezing its own lens, and a limit on how close it can focus. Now you can work out when you will need reading glasses, and how strong."
        }
    };
}
