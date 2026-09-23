import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 6, chemistry.
 *
 * L2C6 gave salt water's density at 20 C, as if salt alone set it. This removes
 * that simplification: temperature and salinity compete, in a linear model near
 * 20 C and 35 g/kg -- density = 1,025 - 0.2 (T - 20) + 0.8 (S - 35) kg/m3 --
 * worked by hand term by term. 1 g/kg of salt is worth about 4 C.
 *
 * Checked against real seas: Mediterranean outflow (warmer but saltier, sinks)
 * and brine left by sea ice (seawater has no 4 C density maximum). Condition
 * stated where the model is introduced; the simplification still standing is
 * that the 0.2 is not constant, so the model overstates temperature in polar
 * water (1,030.2 predicted against about 1,029 measured).
 */
export function getL3C6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C6's table was for water at **20 °C**, and it mentioned that warm water is slightly less dense.\n\nThe ocean is never one temperature, and never one saltiness. Near the poles its surface is about −2 °C; in the tropics, about 30 °C. Where the sun evaporates a lot of water, the sea gets **saltier**. Where rivers and rain pour in, it gets **fresher**.\n\nIn a warm, sunny sea, the surface water is often both **warmer** and **saltier** than the water below it. Warmth makes water less dense. Salt makes it denser.\n\nOne dial under the picture is **salinity**: how much salt the water holds, in grams of salt per kilogram of seawater. Open ocean is about 35.\n\nWhich wins?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It depends on the sizes. Put a number on each effect and add them -- sometimes warmth wins, sometimes salt.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Salt always wins. Saltier water is always denser, so it always sinks.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Salt is powerful, but not unbeatable. Real seas show both results.\n\n- In the tropics, surface water that is slightly **saltier** than the water below still **floats** on top -- because it is so much warmer. There, warmth wins.\n- At the mouth of the Mediterranean Sea, water that is **warmer** than the Atlantic water it meets still **sinks** beneath it -- because it is so much saltier. There, salt wins.\n\nSo neither effect always wins. The answer needs a number for each, so they can be compared.",
            options: [
                { id: 'cont', label: "Give me a number for each effect.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First, a measure of saltiness. **Salinity** is the mass of dissolved salt in each kilogram of seawater, in **g/kg**. The ocean averages about **35 g/kg**.\n\nOceanographers give density in **kg/m³**. Multiply L2C6's g/cm³ by 1,000: seawater at 1.025 g/cm³ is **1,025 kg/m³**.\n\nNow each effect on its own, for seawater near **20 °C** and **35 g/kg**:\n\n- **Temperature.** Warming by 1 °C makes the water molecules jiggle harder and take up a little more room, so the density **falls** by about **0.2 kg/m³**.\n- **Salt.** Adding 1 g/kg of salt adds mass that mostly fits in among the water molecules, as in L2C6, so the density **rises** by about **0.8 kg/m³**.\n\nPut them together, starting from 1,025 kg/m³ at 20 °C and 35 g/kg:\n\n**density = 1,025 − 0.2 x (T − 20) + 0.8 x (S − 35)**\n\nwith **T** the temperature in °C and **S** the salinity in g/kg.\n\nRead it term by term. **T − 20** is how much warmer than 20 °C the water is, and each degree takes away 0.2. **S − 35** is how much saltier than 35 g/kg it is, and each g/kg adds 0.8. Colder or fresher water makes a bracket negative, and the signs take care of the rest.\n\nThe condition belongs here. **The 0.2 and the 0.8 are for water near 20 °C and 35 g/kg.** Between about 5 °C and 25 °C, the formula stays within about 1 kg/m³ of measured values. The end of the lesson shows it drifting outside that range.",
            options: [
                { id: 'cont', label: "Work two waters out by hand.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Water A**, a tropical surface: **28 °C**, **36 g/kg**.\n\n| Term | Working | Value |\n| --- | --- | --- |\n| Start | at 20 °C and 35 g/kg | 1,025.0 |\n| Temperature | −0.2 x (28 − 20) = −0.2 x 8 | −1.6 |\n| Salt | +0.8 x (36 − 35) = +0.8 x 1 | +0.8 |\n| **Density** | | **1,024.2 kg/m³** |\n\n**Water B**, deeper down: **10 °C**, **35 g/kg**.\n\n| Term | Working | Value |\n| --- | --- | --- |\n| Start | at 20 °C and 35 g/kg | 1,025.0 |\n| Temperature | −0.2 x (10 − 20) = −0.2 x (−10) | +2.0 |\n| Salt | +0.8 x (35 − 35) = 0 | 0 |\n| **Density** | | **1,027.0 kg/m³** |\n\nWater A is saltier, but it is 18 °C warmer, and it comes out **less** dense. It floats on top of Water B.\n\nA quick way to compare the two effects: 0.8 / 0.2 = 4. **1 g/kg of extra salt is worth about 4 °C of cooling.** Water A's extra 1 g/kg makes up for only 4 °C of its 18 °C of extra warmth.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Water pouring out of the Mediterranean Sea past Gibraltar is about **13 °C** and **38 g/kg**. The Atlantic water it meets is about **10 °C** and **35.5 g/kg**.\n\nWhich is denser?",
            options: [
                { id: 'right', label: "The Mediterranean water: 1,025 + 1.4 + 2.4 = 1,028.8 kg/m³, against 1,025 + 2.0 + 0.4 = 1,027.4 kg/m³ for the Atlantic. Although it is 3 °C warmer, it sinks beneath the Atlantic water.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'colder', label: "The Atlantic water, because it is colder, and colder water is always denser.", nextNodeId: 'math_wrong' },
                { id: 'cancel', label: "Neither -- the Mediterranean water's extra warmth cancels out its extra salt.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Colder is not always denser** -- that was this lesson's opening question. The Atlantic water is colder, but the Mediterranean water is much saltier.\n\n**They do not cancel.** The Mediterranean water is 2.5 g/kg saltier, and at 4 °C for every g/kg, that is worth about **10 °C** of cooling. Its 3 °C of extra warmth takes back only a little of that.\n\n| Water | Temperature term | Salt term | Density |\n| --- | --- | --- | --- |\n| Mediterranean | −0.2 x (13 − 20) = +1.4 | +0.8 x (38 − 35) = +2.4 | **1,028.8 kg/m³** |\n| Atlantic | −0.2 x (10 − 20) = +2.0 | +0.8 x (35.5 − 35) = +0.4 | **1,027.4 kg/m³** |\n\nThe Mediterranean water is denser by 1.4 kg/m³, so it slides down beneath the Atlantic water. It really does: it pours out over the sea floor at Gibraltar, and spreads through the Atlantic about a kilometre down.",
            options: [
                { id: 'retry', label: "Work out both terms, then compare.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Temperature** is a water sample's temperature, in °C. **Salinity** is its salt content, in g/kg.\n\nThe lab works out the sample's density with the formula, term by term. It compares the sample with typical **deep ocean water**, at **4 °C** and **35 g/kg**, which the formula puts at **1,028.2 kg/m³** -- and shows whether the sample would **sink below** that deep water or **float above** it.\n\nTry this:\n\n- Find a warm sample that still sinks, by making it salty enough\n- At **35 g/kg**, find the temperature where the sample matches the deep water\n- Test the rule of thumb: raise **Salinity** by 1 g/kg, then find how many degrees of warming bring the density back",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "1 g/kg is worth 4 °C. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** In winter near Antarctica, seawater at **−1.9 °C** freezes into sea ice. As C6 mentioned, sea ice is only slightly salty: freezing pushes most of the salt out into the water left behind, raising its salinity from **35** to about **36 g/kg**.\n\nThat leftover water is still at **−1.9 °C**. What does it do?",
            options: [
                { id: 'right', label: "It sinks towards the deep ocean. It is both the coldest water and saltier than the water around it: 1,025 + 4.4 + 0.8 = 1,030.2 kg/m³ by the formula.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It rises and gathers just under the ice. Water close to freezing is less dense, which is why ice forms on top.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "That is true of **fresh** water, and it is a real and surprising fact. Fresh water is densest at about **4 °C**. Below that it gets **less** dense as it cools, so the coldest water in a lake rises to the top, and lakes freeze from the top down.\n\nBut salt changes this. Water as salty as the ocean has **no** 4 °C turning point: it keeps getting **denser** as it cools, all the way down to its freezing point at about −1.9 °C.\n\nSo the leftover water is both very cold and extra salty:\n\n| Term | Working | Value |\n| --- | --- | --- |\n| Start | at 20 °C and 35 g/kg | 1,025.0 |\n| Temperature | −0.2 x (−1.9 − 20) = −0.2 x (−21.9) | +4.4 |\n| Salt | +0.8 x (36 − 35) | +0.8 |\n| **Density** | | **1,030.2 kg/m³** |\n\nThat is denser than the water around it, so it **sinks** -- down the edge of Antarctica and out along the ocean floor.",
            options: [
                { id: 'retry', label: "Salt removes the 4 °C turning point.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Cold, salty water sinks -- and the water left behind by sea ice is the coldest and saltiest of all.**\n\nIt matters for the whole planet. This sinking water slowly fills the deep ocean from the poles. Much of the deep water in the world's oceans was last at the surface near Antarctica or Greenland, sometimes many hundreds of years ago. Because each body of water sinks only as far as its density allows, the ocean settles into **layers**, densest at the bottom, which mix only slowly.\n\nHere is the simplification this lesson removed. **L2C6 gave salt water's density at one temperature, 20 °C, as if salt alone set it.** Temperature changes it too, and in the ocean the two effects compete: **1 g/kg of salt is worth about 4 °C**.\n\nAnd the simplification still standing: **the 0.2 is not really a constant.** Near 25 °C, warming by 1 °C lowers seawater's density by nearly 0.3 kg/m³. Near 0 °C, by less than 0.1. So the formula exaggerates temperature's effect in polar water. It gave the sea-ice water **1,030.2 kg/m³**; measured, it is about **1,029**. It still sinks, so the story holds -- but oceanographers use an equation with dozens of terms.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Temperature and salt compete!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why the ocean is built in layers.**\n\n- **Salinity** is grams of dissolved salt per kilogram of seawater; the ocean averages **35 g/kg**\n- Seawater density in kg/m³: 1.025 g/cm³ is **1,025 kg/m³**\n- Warming by 1 °C lowers density by about **0.2 kg/m³**, near 20 °C\n- Adding 1 g/kg of salt raises density by about **0.8 kg/m³**\n- **density = 1,025 − 0.2 x (T − 20) + 0.8 x (S − 35)**, within about 1 kg/m³ from 5 °C to 25 °C\n- **1 g/kg of salt is worth about 4 °C**\n- Tropical water at 28 °C and 36 g/kg (**1,024.2**) floats on water at 10 °C and 35 g/kg (**1,027.0**)\n- Mediterranean water is warmer but saltier (**1,028.8**), and sinks beneath the Atlantic (**1,027.4**)\n- Fresh water is densest at 4 °C; ocean water keeps getting denser down to freezing\n- Sea ice leaves cold, salty water behind, which sinks and fills the deep ocean\n- Still standing: the 0.2 changes with temperature, so polar predictions run high",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Cold and salty sinks!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Cold, Salty Water Sinks!**\n\nL2C6 set salt water's density at 20 °C. Level 3 lets temperature and salt compete, and finds the layers of the ocean.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Salinity | g of salt per kg of seawater | The ocean averages 35 |\n| Temperature effect | −0.2 kg/m³ per °C | Warmer is less dense |\n| Salt effect | +0.8 kg/m³ per g/kg | Saltier is denser |\n| The model | **1,025 − 0.2 (T − 20) + 0.8 (S − 35)** | Near 20 °C and 35 g/kg |\n| Rule of thumb | 0.8 / 0.2 = **4** | 1 g/kg of salt is worth 4 °C |\n| Mediterranean | 1,028.8 against 1,027.4 | Warmer, saltier, sinks |\n| Fresh water | densest at 4 °C | Lakes freeze from the top |\n| Sea ice | leaves −1.9 °C, 36 g/kg water | It sinks to the deep ocean |\n| Still standing | the 0.2 is not constant | 1,030.2 predicted, about 1,029 measured |\n\n**The one line to remember:** seawater's density is a contest between temperature and salt -- 1 g/kg of salt is worth about 4 °C -- and the ocean stacks itself in layers by the result.\n\n**Up next:** B6 -- what depth does to a fish's balance."
        }
    };
}
