import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C6 "Mixtures & Separation".
 *
 * C6 skimmed oil because it is less dense than water. This lesson uses the same
 * property the way recycling plants do: float-sink tanks, with salt dissolved
 * to make the liquid dense enough to split two plastics that both sink in water.
 *
 * One formula: density of solution = total mass / measured volume. The volume
 * must be measured because dissolved salt fits in among water molecules.
 * Solution volumes are for NaCl in 1,000 g of water at 20 C, from measured
 * densities. C5's saturation point caps salt water at about 1.20 g/cm3, which
 * is the checkpoint: PET and PVC cannot be split this way.
 */
export function getL2C6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C6 you skimmed oil off muddy water, because oil is **less dense** than water and floats to the top.\n\nRecycling plants use the same trick on a much bigger mess. Old drinks bottles are shredded into small **flakes**. Those flakes get mixed up with flakes from the bottle **caps**, which are made of a different plastic. To be recycled properly, the two must be separated.\n\n- Bottle flakes are **PET**, density **1.38 g/cm³**\n- Cap flakes are **PP**, short for polypropylene, density **0.90 g/cm³**\n\nWhat is the simplest way to separate them?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Tip the flakes into a tank of water. Cap flakes are less dense than water and float; bottle flakes are denser and sink.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "They cannot be separated. Once plastic is shredded into a mixture, it stays mixed.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "C6's key idea answers this: in a **mixture**, each substance keeps its own properties. Shredding changes the **size** of a flake, but not the **density** of the plastic it is made from.\n\nThat is exactly what recycling plants use. A tank of water, at **1.00 g/cm³**:\n\n- Cap flakes (PP, 0.90 g/cm³) are less dense, so they **float**\n- Bottle flakes (PET, 1.38 g/cm³) are denser, so they **sink**\n\nSkim the top, drain the bottom, and the mixture is separated. It is P6's rule doing C6's job.\n\nNow for a harder mixture.",
            options: [
                { id: 'cont', label: "What makes a mixture harder?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Some pairs of plastics are **both** denser than water, so water alone cannot split them.\n\n- **PS**, short for polystyrene, used for plastic cutlery: **1.05 g/cm³**\n- **PET**, the bottle plastic: **1.38 g/cm³**\n\nIn water, both sink. To make the PS float while the PET sinks, you need a liquid **denser than 1.05 g/cm³** but **less dense than 1.38 g/cm³**.\n\nThe answer is to dissolve something in the water. A **solution** is a mixture in which one substance, the **solute**, is spread evenly through another, the **solvent**. Here the solute is **salt** and the solvent is **water**.\n\nDissolving salt adds mass. How dense does the solution get? Density is still mass divided by volume (L2P2), for the **whole** solution:\n\n**density of solution = (mass of water + mass of salt) / volume of solution**\n\nThe condition belongs here: **the volume of the solution must be measured**, not worked out by adding. Here is why.",
            options: [
                { id: 'cont', label: "Why can't I just add the volumes?", nextNodeId: 'volume' }
            ]
        },
        volume: {
            id: 'volume',
            speaker: 'AI',
            content: "Dissolve **100 g** of salt in **1,000 g** of water. At 1.00 g/cm³, that water takes up **1,000 cm³**.\n\nSalt crystals have a density of **2.16 g/cm³**, so 100 g of salt takes up 100 / 2.16 = **46 cm³**.\n\nYou might expect 1,000 + 46 = 1,046 cm³ of solution. Measure it, and you get **1,034 cm³**.\n\nTwelve cubic centimetres have gone missing -- and nothing has leaked. As salt dissolves, it breaks into particles far too small to see, and they fit **in among** the water molecules. So the solution takes up less room than the salt and water did separately.\n\nThink of pouring a jar of sand into a jar of marbles. The sand runs into the gaps, and the mixture fills less than the two jars did.\n\nThat is why the volume has to be measured. Using the measured volume:\n\ndensity = (1,000 + 100) / 1,034 = 1,100 / 1,034 = **1.06 g/cm³**\n\nMore than PS's 1.05, less than PET's 1.38. **The PS now floats, and the PET still sinks.**",
            options: [
                { id: 'cont', label: "What about other amounts of salt?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Chemists have measured these volumes carefully. For salt dissolved in **1,000 g of water at 20 °C**:\n\n| Salt added | Total mass | Measured volume | Density of solution |\n| --- | --- | --- | --- |\n| 0 g | 1,000 g | 1,000 cm³ | 1.00 g/cm³ |\n| 50 g | 1,050 g | 1,017 cm³ | 1.03 g/cm³ |\n| 100 g | 1,100 g | 1,034 cm³ | 1.06 g/cm³ |\n| 200 g | 1,200 g | 1,070 cm³ | 1.12 g/cm³ |\n| 300 g | 1,300 g | 1,108 cm³ | 1.17 g/cm³ |\n| 360 g | 1,360 g | 1,133 cm³ | **1.20 g/cm³** |\n\nEvery density in the last column is the total mass divided by the measured volume. For 200 g: 1,200 / 1,070 = **1.12 g/cm³**.\n\nThe last row is special. At 20 °C, 1,000 g of water can dissolve only about **360 g** of salt. That is C5's **saturation point**: add more, and the extra salt just sits on the bottom. So **salt water can never be denser than about 1.20 g/cm³.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** You dissolve **50 g** of salt in **1,000 g** of water and measure **1,017 cm³** of solution.\n\nWill PS flakes, at **1.05 g/cm³**, float in it?",
            options: [
                { id: 'right', label: "No. The density is 1,050 / 1,017 = 1.03 g/cm³, which is less than 1.05, so the PS still sinks.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'added', label: "Only just. The density is 1,050 / 1,000 = 1.05 g/cm³, the same as PS, so the flakes hang in the middle.", nextNodeId: 'math_wrong' },
                { id: 'any', label: "Yes. Any salt water is denser than plastic, so the PS floats.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1,050 / 1,000** divided by the volume of the **water** alone. But dissolving the salt added **17 cm³**, so the solution is 1,017 cm³. Dividing by too small a volume makes the density look too big.\n\n**Any salt water** is not denser than every plastic. PET, at 1.38 g/cm³, sinks even in the saltiest water there is. It always comes down to the numbers.\n\ndensity = 1,050 / 1,017 = **1.03 g/cm³** -- less than PS's 1.05, so **the PS sinks**. It needs more salt: with 100 g, the density is 1.06 g/cm³, and the PS floats.",
            options: [
                { id: 'retry', label: "Total mass over measured volume.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Salt Added** is how much salt is dissolved in 1,000 g of water, in grams. **Flake Density** is the density of one plastic flake, in g/cm³.\n\nThe lab reads the measured volume from the table, works out the density of the solution, and shows whether the flake floats, sinks, or hangs in the middle when the two densities are within 0.005 g/cm³. The plastics from this lesson are marked on the scale -- **PP**, **PS** and **PET** -- along with **PVC**, the plastic of water pipes, at **1.40 g/cm³**.\n\nTry this:\n\n- With no salt, find which plastics float in plain water\n- Add salt until **PS** floats -- somewhere between 50 g and 100 g\n- Push **Salt Added** all the way to **360 g**, and check whether **PET** or **PVC** ever floats",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Salt water tops out at 1.20. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A plant has a mixture of **PET** flakes (**1.38 g/cm³**) and **PVC** flakes (**1.40 g/cm³**). Even a little PVC spoils recycled PET, so the two must be separated.\n\nHow much salt should be dissolved in 1,000 g of water to float the PET off the PVC?",
            options: [
                { id: 'right', label: "No amount of salt will work. Saturated salt water only reaches about 1.20 g/cm³, below both plastics -- and the liquid would have to fall between 1.38 and 1.40 g/cm³.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "360 g, the most that will dissolve. More salt always makes a denser liquid, so the most salt must do it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More salt does make a denser liquid -- **up to the saturation point**. Past 360 g, extra salt no longer dissolves, and the density stops rising at about **1.20 g/cm³**.\n\n| Liquid | Density | PET (1.38 g/cm³) | PVC (1.40 g/cm³) |\n| --- | --- | --- | --- |\n| Water | 1.00 g/cm³ | sinks | sinks |\n| Saturated salt water | 1.20 g/cm³ | **sinks** | **sinks** |\n| What would be needed | between 1.38 and 1.40 g/cm³ | floats | sinks |\n\nBoth plastics sink in every salt solution there is. Even with some other liquid, the gap to aim for is only **0.02 g/cm³** -- very hard to hold steady in a real tank.\n\nSo plants separate PET from PVC another way. Machines shine light on each flake, identify its plastic from the light it sends back, and blow the wrong flakes aside with a puff of air.",
            options: [
                { id: 'retry', label: "Salt water stops at 1.20 g/cm³.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A liquid can only separate two materials if its density falls between theirs -- and salt water stops at about 1.20 g/cm³.**\n\nThat pulls this Big Idea together so far:\n\n- **P6 and L2P6** -- an object floats if it is less dense than the liquid, and denser liquid holds it higher\n- **C6** -- each substance in a mixture keeps its own properties, so a mixture can be separated\n- **L2C6** -- dissolving salt makes water denser, by total mass divided by **measured** volume, up to C5's saturation point\n\nTwo more conditions on this lesson's numbers. They are for **20 °C**: warm water is slightly less dense, so float-sink tanks are kept at a steady temperature. And the flakes must be wetted thoroughly first, because a bubble of air clinging to a flake can make even PET float.\n\nB6 brings it to life. A fish is a mixture too -- and it sets its own density.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Density between the two, or no separation!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You sorted plastic by floating it.**\n\n- In a **mixture**, each substance keeps its own density\n- Water splits **PP** caps (0.90 g/cm³, float) from **PET** bottles (1.38 g/cm³, sink)\n- **PS** (1.05 g/cm³) and PET both sink in water, so the liquid must be made denser\n- A **solution** has a **solute** (salt) spread evenly through a **solvent** (water)\n- **density of solution = total mass / measured volume**\n- Volumes do not simply add: 1,000 g water + 100 g salt makes **1,034 cm³**, not 1,046\n- Dissolved salt fits in among the water molecules\n- 100 g of salt in 1,000 g of water gives **1.06 g/cm³**, enough to float PS\n- At 20 °C, water saturates at about **360 g** of salt, so salt water stops at **1.20 g/cm³**\n- PET and **PVC** (1.40 g/cm³) cannot be split with salt water\n- A separating liquid must have a density **between** the two materials",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Total mass over measured volume!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Sorting Plastic by Floating It!**\n\nC6 skimmed oil because it floats. Level 2 makes a liquid of exactly the density needed to separate a mixture.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Mixture | each part keeps its density | So it can be separated |\n| Water tank | 1.00 g/cm³ | PP floats, PET sinks |\n| Solution | solute spread through solvent | Salt in water |\n| Density of a solution | **total mass / measured volume** | Volumes do not simply add |\n| 100 g of salt | 1,100 / 1,034 = **1.06 g/cm³** | PS floats, PET sinks |\n| Saturation | about 360 g at 20 °C | Salt water stops at **1.20 g/cm³** |\n| PET and PVC | 1.38 and 1.40 g/cm³ | No salt water can split them |\n| The rule | liquid density between the two | Or no separation |\n\n**The one line to remember:** a liquid separates two materials only if its density falls between theirs -- and dissolving salt can raise water's density only as far as the saturation point allows.\n\n**Up next:** B6 -- how a fish sets its own density."
        }
    };
}
