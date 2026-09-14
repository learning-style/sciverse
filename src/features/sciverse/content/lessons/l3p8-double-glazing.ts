import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 8, physics.
 *
 * L2P8 held each face of a layer at the air temperature beside it. This removes
 * that simplification: thin films of air cling to every surface, and layers in
 * series add their thermal resistances (R = d / k), just as L2P7's resistors
 * added. U = 1 / R total, heat flow = U x A x dT.
 *
 * Worked by hand for single glazing (5,000 W from L2P8 against about 115 W
 * measured), then double glazing; the checkpoint uses L2C8's dew point to show
 * why only single glazing streams with water. Condition stated: film and gap
 * resistances are standard design values. Still standing: those values lump
 * convection and radiation into fixed numbers.
 */
export function getL3P8Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Use L2P8's formula on a single pane of window glass: **1 m²**, **4 mm** thick, with the room at **20 °C** and the night outside at **0 °C**. Glass has k = 1.0 W/m/°C.\n\nheat flow = 1.0 x 1 x 20 / 0.004 = **5,000 W**\n\nThat is more than two electric heaters' worth of heat escaping through every square metre of window.\n\nMeasure a real single-glazed window on that night, and it loses about **115 W** per square metre. Over forty times less.\n\nIs L2P8's formula wrong?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The formula is fine, but the temperatures are wrong. Thin layers of still air cling to both sides of the glass, and most of the 20 °C difference is used up across those air layers, not across the glass.", nextNodeId: 'films', sentiment: 'positive' },
                { id: 'bad', label: "The formula must be wrong for glass, or glass conducts heat far worse than the table says.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Glass really does have k close to 1.0 W/m/°C, and L2P8's formula really does work -- **for the temperatures on the two faces of the glass**.\n\nThe mistake was the temperatures. L2P8 set the condition that each face is **held at the temperature used**. For the window, we used the room's 20 °C and the night's 0 °C.\n\nPut a thermometer on the inside surface of that cold window, and it reads nowhere near 20 °C. It reads about **5 °C**. And the outside surface is about **4.5 °C**, not 0 °C.\n\nSo across the glass itself, the difference is only about **half a degree**. The rest of the 20 °C has to be lost somewhere else.",
            options: [
                { id: 'cont', label: "Where is the rest of the temperature difference lost?", nextNodeId: 'films' }
            ]
        },
        films: {
            id: 'films',
            speaker: 'AI',
            content: "Air right next to a surface is held almost still, clinging to it. On each side of the glass there is a thin **surface film** of nearly still air -- and L2P8's table says still air is one of the worst conductors of all.\n\nSo heat leaving the room has to cross **three layers, one after another**: the inside air film, the glass, and the outside air film.\n\nTo add layers up, turn each into a **thermal resistance**. For each square metre:\n\n**R = d / k**\n\nR is measured in **m²·°C/W**: the temperature difference needed to push **1 W** through each square metre. A layer that conducts badly, or is thick, has a big R.\n\nFor layers in **series**, one after another, the resistances **add** -- exactly as L2P7's resistors did in a series circuit:\n\n**R total = R₁ + R₂ + R₃ + …**\n\nThen the heat flow for each square metre is the temperature difference divided by R total. Engineers call **1 / R total** the **U-value**, in W/m²/°C:\n\n**heat flow = U x A x ΔT**, with **U = 1 / R total**\n\nThe condition belongs here. **The air films are too thin to measure directly, so they are given standard design values**: about **0.13** for still indoor air, and about **0.04** outdoors, where the wind thins the film. Both values also include a little heat carried off by radiation.",
            options: [
                { id: 'cont', label: "Add up the single window by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**Single glazing**, 1 m², room 20 °C, outside 0 °C:\n\n| Layer | Working | R, in m²·°C/W |\n| --- | --- | --- |\n| Inside air film | standard value | 0.130 |\n| Glass | d / k = 0.004 / 1.0 | 0.004 |\n| Outside air film | standard value | 0.040 |\n| **Total** | | **0.174** |\n\nU = 1 / 0.174 = **5.75 W/m²/°C**\n\nheat flow = 5.75 x 1 x 20 = **115 W** -- the measured value.\n\nThe glass is only 0.004 of the 0.174. **The two air films make up almost all of the resistance**, and the glass barely matters.\n\nNow follow the temperature through the layers. With 115 W flowing through each square metre, each layer uses up **115 x R** degrees:\n\n| Place | Temperature drop across the layer | Temperature |\n| --- | --- | --- |\n| Room | | 20.0 °C |\n| Inside surface of the glass | 115 x 0.130 = 15.0 °C | **5.0 °C** |\n| Outside surface of the glass | 115 x 0.004 = 0.46 °C | **4.5 °C** |\n| Night air | 115 x 0.040 = 4.6 °C | 0.0 °C |\n\nThere are the thermometer readings from before. **Three-quarters of the 20 °C is lost in the thin film of air on the inside.**",
            options: [
                { id: 'cont', label: "Now add a second pane.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Double glazing**: two panes with a **12 mm** gap of air between them.\n\nIf the gap's air stayed perfectly still, its R would be d / k = 0.012 / 0.025 = **0.48**. But the air in the gap slowly **circulates** -- it rises beside the warm pane and sinks beside the cold one -- and heat also **radiates** straight across. Measured, a 12 mm gap gives about **0.17**.\n\n| Layer | R, in m²·°C/W |\n| --- | --- |\n| Inside air film | 0.130 |\n| Glass | 0.004 |\n| Air gap | 0.170 |\n| Glass | 0.004 |\n| Outside air film | 0.040 |\n| **Total** | **0.348** |\n\nU = 1 / 0.348 = **2.87 W/m²/°C**\n\nheat flow = 2.87 x 1 x 20 = **57 W** -- half the single pane's 115 W.\n\nThe second sheet of glass added only 0.004. **Almost all of the gain comes from the trapped air.** Double glazing is really a way of holding a layer of air in place.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A brick wall is **0.20 m** thick, with **k = 0.7 W/m/°C**, and has the usual air films on each side: **0.13** inside and **0.04** outside.\n\nWhat is its U-value?",
            options: [
                { id: 'right', label: "About 2.2 W/m²/°C. R for the brick is 0.20 / 0.7 = 0.286; R total = 0.13 + 0.286 + 0.04 = 0.456; U = 1 / 0.456 = 2.2.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_films', label: "About 3.5 W/m²/°C, because 0.7 / 0.20 = 3.5.", nextNodeId: 'math_wrong' },
                { id: 'not_inverted', label: "About 0.46 W/m²/°C, because 0.13 + 0.286 + 0.04 = 0.456.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**3.5** is L2P8's answer, with no air films: k / d for the brick alone. It leaves out 0.17 of resistance -- more than a third of the total.\n\n**0.46** is the **resistance**, R total, not the U-value. U is its reciprocal, **1 / R total**. A check: resistance and U-value must go opposite ways. More resistance has to mean a smaller U, and less heat getting through.\n\n| Layer | R |\n| --- | --- |\n| Inside film | 0.130 |\n| Brick, 0.20 / 0.7 | 0.286 |\n| Outside film | 0.040 |\n| **Total** | **0.456** |\n\nU = 1 / 0.456 = **2.2 W/m²/°C**",
            options: [
                { id: 'retry', label: "Add the resistances, then take 1 over the total.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for 1 m² of window with the room at 20 °C and the outside at 0 °C.\n\n**Panes of Glass** is 1, 2 or 3 panes, with a 0.17 air gap between each pair. **Outside Wind** is the wind speed, in m/s. The stronger the wind, the thinner the outside air film and the smaller its R -- about 0.18 in still air, down to 0.04 in a stiff breeze and less in a gale.\n\nThe lab adds the resistances, works out the U-value and the heat flow, and draws the temperature through every layer, from the room to the night.\n\nTry this:\n\n- With 1 pane, watch where the temperature falls: mostly in the inside air film\n- Add a second pane, and watch the inside surface of the glass warm up\n- Turn up **Outside Wind**. It matters less than you might expect, because the inside film is still there",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The trapped air does the work. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** On a cold night, the room is at **20 °C** and the air in it has a **dew point of 12 °C** (from L2C8). Outside it is **0 °C**.\n\nThe single-glazed window streams with water on the inside. The double-glazed window next to it stays dry.\n\nUsing the temperature of each window's inside surface, why?",
            options: [
                { id: 'right', label: "The single pane's inside surface is only 5.0 °C, below the 12 °C dew point, so vapour condenses on it. The double pane lets through 57 W, so its inside film uses up only 7.5 °C, leaving the surface at 12.5 °C -- just above the dew point.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Double glazing has a seal that stops the room's water vapour reaching the glass.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The room's air touches the inside pane of both windows equally -- there is no seal between the room and the glass. What differs is **how cold that inside surface is**.\n\nFrom L2C8: vapour condenses on anything colder than the air's **dew point**.\n\n| Window | Heat flow per m² | Drop across inside film, flow x 0.13 | Inside surface | Against the 12 °C dew point |\n| --- | --- | --- | --- | --- |\n| Single | 115 W | 15.0 °C | **5.0 °C** | below: **water forms** |\n| Double | 57 W | 7.5 °C | **12.5 °C** | above: **stays dry** |\n\nHalving the heat flow halves the temperature drop across the inside air film, so the glass stays warmer.",
            options: [
                { id: 'retry', label: "Less heat flow, warmer inside surface.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The inside surface's temperature decides whether a window streams with water -- and that temperature is set by resistances in series.**\n\nHere is the simplification this lesson removed. **L2P8 held each face of a layer at the temperature of the air beside it.** It is not. Thin films of nearly still air cling to every surface, and they add to the layer's resistance in series. For a window, they are almost all of it.\n\nAnd the simplification still standing. **Every film and gap here was a single fixed number.** Real ones change with the wind, the temperatures, and the surfaces. Much of the heat crossing a gap goes by radiation, which is why modern windows have an invisible **low-emissivity coating** that cuts it down, bringing double glazing's U-value down to about 1.6.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Resistances in series!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why double glazing works.**\n\n- L2P8's formula gave **5,000 W** through a window pane; the real figure is about **115 W**\n- Thin **surface films** of nearly still air cling to both sides of every surface\n- **Thermal resistance**, per square metre: **R = d / k**, in m²·°C/W\n- Layers in **series** add: **R total = R₁ + R₂ + …**, as in L2P7\n- **U-value = 1 / R total**; **heat flow = U x A x ΔT**\n- Film values: about **0.13** inside, **0.04** outside in a breeze\n- Single glazing: R total **0.174**, U **5.75**, **115 W**; the glass is only 0.004 of it\n- The inside surface sits at **5.0 °C**: three-quarters of the drop is in the inside film\n- A 12 mm gap acts like **0.17**, not 0.48, because its air circulates and heat radiates across\n- Double glazing: R total **0.348**, U **2.87**, **57 W**\n- A 0.20 m brick wall with films: U = **2.2**\n- Below the dew point, the single pane streams; the double pane's **12.5 °C** stays dry\n- Still standing: films and gaps as fixed numbers; low-emissivity coatings cut the radiation",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "U = 1 / R total!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Double Glazing Works!**\n\nL2P8 measured heat flow through one layer. Level 3 adds the layers you cannot see.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Thermal resistance | **R = d / k** per m² | Degrees needed to push 1 W |\n| In series | **R total = R₁ + R₂ + …** | Like L2P7's resistors |\n| U-value | **U = 1 / R total** | W per m² per °C |\n| Heat flow | **U x A x ΔT** | L2P8's rule for many layers |\n| Single glazing | 0.130 + 0.004 + 0.040 = **0.174** | U 5.75, 115 W |\n| Inside surface | 20 − 115 x 0.13 = **5.0 °C** | The film does the work |\n| Double glazing | R total **0.348** | U 2.87, 57 W |\n| Condensation | 5.0 °C against 12.5 °C | Below or above the dew point |\n| Still standing | fixed film and gap values | Radiation lumped in |\n\n**The one line to remember:** heat leaving a room crosses layers in series, and the thin air films you cannot see add more resistance than the glass you can.\n\n**Up next:** C8 -- how rising air cools with no cold surface to touch."
        }
    };
}
