import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 13, chemistry.
 *
 * L2C13 counted the units in a chain and left packing as a picture. This
 * removes that simplification: a polymer is part neatly stacked (crystalline,
 * 1.00 g/cm3 for polythene) and part tangled (amorphous, 0.85), so its
 * measured density gives the crystalline fraction:
 * f = (density - 0.85) / (1.00 - 0.85). HDPE at 0.96 is 73% crystalline,
 * LDPE at 0.92 is 47%.
 *
 * Frame of reference stated: the fraction is by volume, between the two pure
 * extremes. Condition stated: the two-phase model, for one polymer at one
 * temperature. Still standing: crystals are imperfect, and cooling rate and
 * stretching change the packing without changing the chemistry.
 */
export function getL3C13Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C13 counted the units in a chain, and ended on a puzzle it could not settle: a milk bottle and a carrier bag can have the **same monomer** and the **same chain length**, yet one is stiff and one is floppy. The difference is how the chains **pack** -- and packing was left as a picture.\n\nPictures cannot be measured. But packing has a consequence that can be: chains lying neatly side by side take up **less room** than tangled ones.\n\nWhat property would you measure to find out how tightly a plastic's chains are packed?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Its density. Same atoms in less space means more mass in each cubic centimetre, so a tightly packed sample must be denser.", nextNodeId: 'model', sentiment: 'positive' },
                { id: 'bad', label: "Its mass. Tightly packed chains weigh more than loosely packed ones.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Mass alone cannot tell you. Weigh out 10 g of the stiff plastic and 10 g of the floppy one and you have two equal masses -- the chains are made of the same atoms, so a gram is a gram.\n\nWhat differs is the **space** those grams occupy. Pack the chains neatly and the same mass takes up less room.\n\nThat is L2P2's **density** again: mass divided by volume. Density does not care how big your sample is, only how closely its matter is stacked -- which is exactly the question.\n\nAnd it is easy to measure. Weigh a piece, drop it into water in a measuring cylinder and read off the volume it pushes aside, and divide.\n\nNow the question becomes: what does a particular density **tell** you about the packing?",
            options: [
                { id: 'cont', label: "What does it tell me?", nextNodeId: 'model' }
            ]
        },
        model: {
            id: 'model',
            speaker: 'AI',
            content: "A solid polymer is not all one thing. It has two kinds of region, mixed together:\n\n- **crystalline** regions, where the chains lie straight and parallel, stacked like pencils in a box\n- **amorphous** regions, where the chains are tangled like cooked spaghetti\n\nFor polythene, chemists have measured what each region would weigh on its own:\n\n| Region | Density |\n| --- | --- |\n| Fully crystalline | **1.00 g/cm³** |\n| Fully amorphous | **0.85 g/cm³** |\n\nA real sample is a mixture of the two, so its density lands somewhere between. Writing **f** for the **crystalline fraction** -- the share of the volume that is neatly packed, which is the frame of reference here -- the sample's density is the two densities shared out in proportion:\n\n**density = f x 1.00 + (1 − f) x 0.85**\n\nRearrange for the thing you want. Expand and gather the f terms:\n\ndensity = 0.85 + f x (1.00 − 0.85)\n\n**f = (density − 0.85) / (1.00 − 0.85)**\n\nWeigh the plastic, and the fraction falls out.\n\nThe condition belongs here. **This is a two-phase model for one polymer at one temperature**: it assumes every part of the sample is either properly crystalline or properly tangled, with nothing in between, and it uses numbers measured for polythene. Another polymer has its own pair.",
            options: [
                { id: 'cont', label: "Put real plastics through it.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**The milk bottle (HDPE).** Measured density **0.96 g/cm³**.\n\n**Step 1.** density − 0.85 = 0.96 − 0.85 = **0.11**\n\n**Step 2.** 1.00 − 0.85 = **0.15**\n\n**Step 3.** f = 0.11 / 0.15 = **0.73**, so about **73% crystalline**\n\n**The carrier bag (LDPE).** Measured density **0.92 g/cm³**.\n\nf = (0.92 − 0.85) / 0.15 = 0.07 / 0.15 = **0.47**, about **47% crystalline**\n\n| | Density | Crystalline fraction | What it feels like |\n| --- | --- | --- | --- |\n| Milk bottle | 0.96 g/cm³ | **73%** | stiff, holds its shape |\n| Carrier bag | 0.92 g/cm³ | **47%** | floppy, stretches |\n\nNow C13's branching makes sense as a **cause**. A branch is a side chain sticking out, and a chain with branches cannot lie flat against its neighbours -- the branches hold it off, like knots in a rope stopping it from coiling neatly. Fewer branches, more crystal, higher density, stiffer plastic.\n\nSo the chain of reasoning runs: **branching → packing → density → stiffness**, and the middle two can both be measured.\n\nIt shows up in light, too. Crystalline patches and tangled patches bend light differently, so light scatters at the boundaries between them: a milk bottle is **cloudy white**, while thin film with less crystal is clearer.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A sample of polythene has a measured density of **0.90 g/cm³**.\n\nWhat fraction of it is crystalline?",
            options: [
                { id: 'right', label: "About 33%. (0.90 − 0.85) / (1.00 − 0.85) = 0.05 / 0.15 = 0.33.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ninety', label: "90%, because the density is 0.90 of the way up.", nextNodeId: 'math_wrong' },
                { id: 'gap', label: "5%, because the density is 0.05 above the amorphous value.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**90%** read the density as though the scale ran from 0 to 1. It does not: no polythene can be less dense than **0.85** or denser than **1.00**, so the useful scale is only **0.15** wide, and 0.90 sits a third of the way along it.\n\n**5%** used the gap above amorphous but never compared it with the full range. 0.05 of what? Always finish a fraction by dividing by the whole -- here, 0.15.\n\n**Step 1.** how far above amorphous: 0.90 − 0.85 = **0.05**\n\n**Step 2.** the full range: 1.00 − 0.85 = **0.15**\n\n**Step 3.** f = 0.05 / 0.15 = **0.33**, about **33% crystalline** -- a soft, stretchy grade.",
            options: [
                { id: 'retry', label: "Divide by the range, not by 1.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Measured Density** is what the balance and the measuring cylinder give you, in g/cm³. **Branches** is how many side chains there are for every 1,000 carbon atoms of backbone -- the thing a chemist actually controls when making the plastic.\n\nThe lab draws the chains at that packing, works out the crystalline fraction, and names the grade.\n\nTry this:\n\n- Set **0.96**: about 73% crystalline, the stiff grade in a milk bottle\n- Slide down to **0.92**: 47%, a carrier bag\n- Slide to **0.85**: a fully tangled sample, 0% crystalline, as floppy as polythene gets\n- Raise **Branches** and watch the density the lab predicts fall: branches are what stop the chains lying flat",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Weigh it, and the packing falls out. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A factory makes plastic crates from polythene. The crates are too floppy, and the customer wants them stiffer.\n\nThe chemists are told they may **not** change the monomer and may **not** change the chain length.\n\nIs there anything left to change?",
            options: [
                { id: 'right', label: "Yes -- the packing. Making the chains with fewer branches lets them lie flat, and cooling the moulded crate more slowly gives the chains time to stack. Both raise the crystalline fraction and the density, and both stiffen the crate without touching the chemistry.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "No. With the monomer and the chain length fixed, the material is fixed, so the only options are thicker walls or a different plastic.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The monomer and the chain length are only two of the things that decide a polymer's behaviour. The third is how the chains **end up arranged**, and that is set partly when the plastic is made and partly when it is cooled.\n\n| Change | What it does | Density |\n| --- | --- | --- |\n| Fewer branches | chains can lie flat against each other | rises |\n| Slower cooling | chains have time to find neat positions | rises |\n| Fast quenching | chains freeze where they are, tangled | falls |\n| Stretching the film | pulls chains into line along the pull | rises |\n\nEvery one of those changes the crystalline fraction without changing a single bond in the chain. That is why the same polythene can arrive as a rigid crate, a squeezy bottle or a clingy film.\n\n**Structure shapes function -- and here \"structure\" means the arrangement, not the ingredients.**",
            options: [
                { id: 'retry', label: "Arrangement is a variable too.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Density is a window onto packing: weigh a plastic and you can work out what share of it is neatly stacked.**\n\nHere is the simplification this lesson removed. **L2C13 counted chain units and left packing as a picture.** The two-phase model turns that picture into a number: **f = (density − 0.85) / (1.00 − 0.85)** for polythene, giving 73% for a milk bottle and 47% for a bag.\n\nAnd the simplifications still standing. **The model allows only two kinds of region**, perfectly stacked or perfectly tangled, when real crystals have flaws and the boundaries are gradual. The two end densities are themselves measured values, and they shift a little with temperature. And the **chain length still matters**: two samples can share a crystalline fraction yet differ in toughness, because long chains thread through several crystals at once and hold the whole structure together.\n\nB13 said stomata open to let carbon dioxide in. B13 at Level 3 asks how far open they should be.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Weigh it to see the packing!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured how tightly a polymer packs.**\n\n- Same atoms, same chain length: what differs is the **space** they occupy\n- **Density = mass / volume**, from L2P2, and it ignores sample size\n- A polymer has **crystalline** regions (chains parallel) and **amorphous** ones (tangled)\n- Polythene: fully crystalline **1.00 g/cm³**, fully amorphous **0.85 g/cm³**\n- **density = f x 1.00 + (1 − f) x 0.85**\n- Rearranged: **f = (density − 0.85) / (1.00 − 0.85)**\n- Frame of reference: f is the share of the **volume** that is neatly packed\n- Milk bottle at 0.96: **73% crystalline**, stiff\n- Carrier bag at 0.92: **47%**, floppy\n- A 0.90 sample: **33%**, and the scale is only 0.15 wide\n- The chain: **branching → packing → density → stiffness**\n- Crystal boundaries scatter light, so a high-crystal bottle looks cloudy\n- Fewer branches, slower cooling and stretching all raise the fraction\n- Condition: a two-phase model, for one polymer at one temperature\n- Still standing: imperfect crystals, and chain length still matters for toughness",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "f = (density − 0.85) / 0.15!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Tightly Do the Chains Pack?**\n\nL2C13 counted the links. Level 3 weighs the plastic to see how they lie.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Two kinds of region | crystalline and amorphous | Parallel, or tangled |\n| Polythene's extremes | **1.00** and **0.85 g/cm³** | The whole usable range is 0.15 |\n| Mixture rule | **f x 1.00 + (1 − f) x 0.85** | Shared out by volume |\n| Rearranged | **f = (density − 0.85) / 0.15** | Weigh it, and f falls out |\n| Milk bottle | 0.11 / 0.15 | **73% crystalline** |\n| Carrier bag | 0.07 / 0.15 | **47%** |\n| A soft grade | 0.05 / 0.15 | **33%** |\n| The causal chain | branching → packing → density → stiffness | Two middle steps measurable |\n| Still standing | imperfect crystals, chain length | The model allows only two states |\n\n**The one line to remember:** a polymer's density sits between its tangled and its perfectly stacked extremes, so weighing it measures the packing that decides how it behaves.\n\n**Up next:** L3B13 -- how far open a leaf should hold its stomata."
        }
    };
}
