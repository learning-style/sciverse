import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P8 "Heat Transfer".
 *
 * P8 named conduction and said some materials conduct far better than others.
 * This lesson measures how fast: heat flow each second = k x A x dT / d, with
 * thermal conductivity k in W/m/C. Frame of reference stated where the formula
 * is given: heat flows from the warmer face to the cooler face, and dT is warm
 * minus cool.
 *
 * Condition stated: steady flow through one material whose two faces are held
 * at the temperatures used. Level 3 removes it -- the air beside a surface is
 * not at the room's temperature. The checkpoint (winter and summer fur) leads
 * into L2B8.
 */
export function getL2P8Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P8, heat crept along a metal rod by **conduction**, and you found that some materials conduct heat far better than others.\n\nEvery winter, heat leaks out of a warm house the same way: by conduction, through its walls, from the warm inside to the cold outside.\n\nHere is a puzzle. Which lets **less** heat through each second?\n\n- **A:** a brick wall **20 cm** thick\n- **B:** a layer of wool just **5 cm** thick, like a thick winter coat\n\nBoth cover the same area, with the same warm side and cold side.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The wool, even though it is much thinner. Wool is mostly trapped still air, which conducts heat far worse than brick, so a thin layer can beat a thick wall.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The brick. It is four times as thick and solid all the way through, so it must block more heat than a thin fluffy layer.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Thickness does matter -- a thicker layer slows heat down. But it is only one of the things that decide how fast heat gets through.\n\nThe other big one is **what the layer is made of**. Brick is solid, and solids pass the jiggling of their particles along quite well. Wool is a tangle of fibres with tiny pockets of **still air** trapped between them -- and P8 found air conducts heat very badly, because its particles are so spread out.\n\nMeasure it, and the wool wins easily: the 5 cm of wool lets through less than **a quarter** of the heat of the 20 cm brick wall.\n\nTo see why, you need a number for how well each material conducts.",
            options: [
                { id: 'cont', label: "Give me that number.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Heat flowing each second is measured in **watts (W)**: 1 W is one joule every second, as in L2B5 and L2P7.\n\nFour things decide how many watts leak through a layer:\n\n- **k**, the **thermal conductivity**: how well the material conducts heat\n- **A**, the **area** of the layer, in m²\n- **ΔT**, the **temperature difference** between its two faces, in °C\n- **d**, the **thickness** of the layer, in metres\n\nA frame of reference to settle first: **heat always flows from the warmer face to the cooler face**, and **ΔT = warmer face − cooler face**, so it is always positive.\n\nTogether:\n\n**heat flow each second = k x A x ΔT / d**\n\nThink of cars leaving a car park. A **wider** exit (bigger A) lets more out. A **bigger crowd** pushing to leave (bigger ΔT) sends more out. A **longer** exit road (bigger d) slows them down. And a **smoother** road (bigger k) lets them flow faster.\n\nThermal conductivity is measured in **W/m/°C**: the watts that flow through a slab **1 m²** in area and **1 m** thick, for each **1 °C** of temperature difference.\n\n| Material | k, in W/m/°C |\n| --- | --- |\n| Copper | 400 |\n| Steel | 50 |\n| Glass | 1.0 |\n| Brick | 0.7 |\n| Wood | 0.15 |\n| Wool (mostly trapped air) | 0.04 |\n| Still air | 0.025 |\n\nThe condition belongs here. **This is for steady flow through one material, with its two faces held at the temperatures you use.** Level 3 finds out what happens when the air beside a wall is not at the room's temperature.",
            options: [
                { id: 'cont', label: "Work out the brick wall and the wool.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Take **10 m²** of each, with the warm face at **18 °C** and the cold face at **2 °C**. So **ΔT = 18 − 2 = 16 °C**.\n\n**The brick wall**, k = 0.7, d = 20 cm = **0.20 m**:\n\nheat flow = 0.7 x 10 x 16 / 0.20 = 112 / 0.20 = **560 W**\n\n**The wool**, k = 0.04, d = 5 cm = **0.05 m**:\n\nheat flow = 0.04 x 10 x 16 / 0.05 = 6.4 / 0.05 = **128 W**\n\nThe wool lets through 128 W against the brick's 560 W: **less than a quarter**, although it is a quarter of the thickness.\n\nNotice the step before dividing: **centimetres became metres**. The thickness must be in metres, because k is measured per metre.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A wooden door is **2 m²** in area and **4 cm** thick. Its inside face is at **18 °C** and its outside face at **8 °C**. Wood has **k = 0.15 W/m/°C**.\n\nHow much heat flows through the door each second?",
            options: [
                { id: 'right', label: "75 W. ΔT = 18 − 8 = 10 °C, d = 0.04 m, and 0.15 x 2 x 10 / 0.04 = 75 W.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'cm', label: "0.75 W, because 0.15 x 2 x 10 / 4 = 0.75.", nextNodeId: 'math_wrong' },
                { id: 'times', label: "0.12 W, because 0.15 x 2 x 10 x 0.04 = 0.12.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.75 W** left the thickness in **centimetres**. k is measured per **metre**, so d must be in metres too: 4 cm = 0.04 m. Dividing by 4 instead of 0.04 makes the answer 100 times too small.\n\n**0.12 W** multiplied by the thickness. But a **thicker** door must let **less** heat through, so the thickness belongs in the **denominator**. Multiplying by it would mean a thicker door leaks more.\n\nheat flow = 0.15 x 2 x 10 / 0.04 = 3 / 0.04 = **75 W**",
            options: [
                { id: 'retry', label: "Thickness in metres, in the denominator.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a layer **1 m²** in area with a **20 °C** difference between its faces.\n\n**Material** steps through the table: copper, steel, glass, brick, wood, wool and still air. **Thickness** is the layer's thickness, in centimetres.\n\nThe lab works out k x A x ΔT / d and shows the heat flowing through each second.\n\nTry this:\n\n- Set **Material** to **brick** and double the **Thickness**. The heat flow halves\n- Keep the thickness and switch from **brick** to **wool**. Compare how much that one change does\n- Find the thickness of brick that lets through the same heat as **5 cm** of wool. It is almost a metre",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The material matters most. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** B8's arctic fox grows **thick fur** for winter, about **6 cm** deep. In summer, its fur is only about **2 cm** deep.\n\nSame fox, same fur material, same cold air around it. How does the heat flowing out through the **summer** fur compare with the winter fur?",
            options: [
                { id: 'right', label: "Three times as much. Heat flow is divided by the thickness, so a third of the thickness lets through three times the heat: 6 / 2 = 3.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "A third as much. Thinner fur has less material in it, so there is less for the heat to flow through.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It is the other way round. Heat is not carried **by** the fur -- the fur is what **slows it down**. Less fur means less in the way.\n\nThe thickness sits in the **denominator** of k x A x ΔT / d:\n\n| Fur | d | Heat flow, compared with winter |\n| --- | --- | --- |\n| Winter | 0.06 m | 1 |\n| Summer | 0.02 m | 0.06 / 0.02 = **3 times as much** |\n\nWith everything else the same, a third of the thickness lets **three times** as much heat escape each second. That is why the fox swaps coats between seasons.",
            options: [
                { id: 'retry', label: "Thinner fur, more heat escaping.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Heat flow = k x A x ΔT / d: a thinner layer, a bigger area, a bigger temperature difference or a better conductor all let heat out faster.**\n\nThat is what P8's everyday examples were doing all along:\n\n- A metal spoon heats up fast because k for steel is over 300 times k for wood\n- Wool and fur work by trapping **still air**, one of the worst conductors there is\n- Double the thickness of anything, and half the heat gets through\n\nWeather is driven by heat moving, but also by **water** moving. C8 asks how much water vapour air can take before it turns back into liquid.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "k x A x ΔT / d!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured how fast heat leaks.**\n\n- Heat flowing each second is measured in **watts (W)**\n- Heat flows from the **warmer face to the cooler face**; **ΔT = warmer − cooler**\n- **heat flow each second = k x A x ΔT / d**\n- **k**, the **thermal conductivity**, in **W/m/°C**; **A** in m²; **d** in metres\n- Condition: steady flow, one material, faces held at the temperatures used\n- Copper **400**, glass **1.0**, brick **0.7**, wood **0.15**, wool **0.04**, still air **0.025**\n- 10 m² of 20 cm brick at ΔT 16 °C: **560 W**; 5 cm of wool: **128 W**\n- Thickness must be in **metres**, and it goes in the **denominator**\n- A 2 m² wooden door, 4 cm thick, ΔT 10 °C: **75 W**\n- Summer fur a third as thick lets **three times** as much heat out\n- Wool and fur work by trapping still air",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Thin, wide, hot or conductive: heat leaks faster!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Fast Heat Leaks!**\n\nP8 named conduction. Level 2 measures how fast it goes.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Direction | warmer face to cooler face | ΔT = warmer − cooler |\n| Heat flow | **k x A x ΔT / d**, in W | Joules each second |\n| Thermal conductivity | **k**, in W/m/°C | Copper 400, wool 0.04 |\n| Brick wall | 0.7 x 10 x 16 / 0.20 = **560 W** | 20 cm thick |\n| Wool layer | 0.04 x 10 x 16 / 0.05 = **128 W** | Less than a quarter |\n| Wooden door | 0.15 x 2 x 10 / 0.04 = **75 W** | cm changed to m first |\n| Thickness | in the denominator | Double it, halve the flow |\n| Fur | 6 cm against 2 cm | Summer fur lets out 3 times as much |\n| Condition | steady, one material | Faces at the temperatures used |\n\n**The one line to remember:** heat leaks at k x A x ΔT / d -- which is why a few centimetres of trapped air can beat a wall of solid brick.\n\n**Up next:** C8 -- how much water vapour air can take."
        }
    };
}
