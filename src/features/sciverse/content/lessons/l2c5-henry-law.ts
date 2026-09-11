import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C5 "Dissolving & Saturation".
 *
 * C5 said pressure pushes CO2 "past the saturation point". This lesson states
 * it exactly -- pressure raises the saturation point itself -- and puts a
 * number on it with Henry's law: dissolved gas = k x pressure, where k depends
 * on the temperature.
 *
 * The condition is stated where the law is introduced: modest pressures, a
 * gas that does not react much with water, and the pressure of that gas alone.
 * The last is what makes an opened drink go flat.
 */
export function getL2C5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C5 made soda by forcing **carbon dioxide (CO₂)** gas into water under high pressure, and watched it fizz out when the bottle was opened. It said the pressure pushed the CO₂ **past** the saturation point.\n\nHere is a more exact way to say it. Pressure does not push gas past the limit. **Pressure raises the limit itself** -- the water really can hold more.\n\nSo by how much? If you **double** the pressure of the CO₂ above the water, what happens to the amount of CO₂ the water can hold?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It doubles too. The amount the water can hold goes up in step with the pressure.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It hardly changes. Once water is saturated, extra pressure only squeezes a tiny bit more in.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Picture the surface of the water as a busy **doorway**.\n\n- CO₂ molecules in the gas above keep hitting the surface, and some of them slip **in**\n- CO₂ molecules already dissolved keep reaching the surface, and some of them slip **out**\n\nThe water is saturated when as many slip out each second as slip in. The amount dissolved stops changing, even though molecules are still crossing both ways.\n\nNow double the pressure of the gas above. That means twice as many CO₂ molecules hit the doorway each second, so twice as many slip in. The water keeps gaining CO₂ until twice as many are slipping out too -- which happens when it holds **twice as much**.\n\nSo doubling the pressure doubles the limit. It is a straight-line rule, and it has a name.",
            options: [
                { id: 'cont', label: "What is the rule called?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First, two units.\n\n**Pressure** is how hard a gas pushes on each bit of surface. Here it is measured in **atmospheres (atm)**: **1 atm is the push of the air around you at sea level.**\n\nThe **solubility** of a gas is the most of it that can dissolve -- C5's saturation point, as a number. Here it is in **grams per litre (g/L)**: grams of gas in each litre of water.\n\nNow the rule, found by **William Henry** in 1803. It is called **Henry's law**:\n\n**dissolved gas = k x pressure**\n\n**k** is how many grams dissolve in a litre for each atmosphere of pressure, in **g/L per atm**. It depends on the gas, and on the **temperature**. For CO₂ in water:\n\n| Temperature | k for CO₂ |\n| --- | --- |\n| 0 °C | 3.4 g/L per atm |\n| 10 °C | 2.3 g/L per atm |\n| 20 °C | 1.7 g/L per atm |\n| 30 °C | 1.3 g/L per atm |\n| 40 °C | 1.0 g/L per atm |\n\nWarmer water, smaller k: C5's rule that warm water holds less gas, now with numbers.\n\nThe conditions belong here, and there are three:\n\n- It works for gases that **do not react much** with water. CO₂ reacts only a tiny bit, so the law works well for it. It fails for a gas like ammonia, which reacts strongly.\n- It works at **everyday pressures**, like those in a drink bottle, not at enormous ones.\n- The pressure that counts is the pressure of **that gas only**. Air is only **0.04%** CO₂, so the CO₂ in ordinary air pushes with just **0.0004 atm**.",
            options: [
                { id: 'cont', label: "Now work out a real bottle.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A sealed bottle at 20 °C**, with CO₂ at **3.5 atm** above the drink:\n\ndissolved CO₂ = 1.7 x 3.5 = 5.95, about **6.0 g/L**\n\nA **0.5 L** bottle holds 5.95 x 0.5 = about **3.0 g** of CO₂.\n\n**Now open it.** The CO₂ above the drink rushes out, and the drink is left under ordinary air, where CO₂ pushes with only 0.0004 atm:\n\nnew limit = 1.7 x 0.0004 = **0.0007 g/L**\n\nThe drink holds 6.0 g/L but can now keep only 0.0007 g/L. Almost all of its CO₂ is over the new limit, and it has to leave. That is the fizz -- and it is why an open drink eventually goes completely **flat**.\n\nHow much gas is that? At room temperature and ordinary air pressure, 3.0 g of CO₂ gas takes up about **1.6 L**. A half-litre bottle had more than **three times its own volume** of gas packed inside the liquid.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A bottle of fizzy water is kept at **10 °C**, with CO₂ at **2.0 atm** above it.\n\nHow much CO₂ does each litre hold?",
            options: [
                { id: 'right', label: "4.6 g/L. At 10 °C, k is 2.3 g/L per atm, and 2.3 x 2.0 = 4.6.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'divided', label: "1.15 g/L, because 2.3 divided by 2.0 is 1.15.", nextNodeId: 'math_wrong' },
                { id: 'no_pressure', label: "2.3 g/L, because that is the value of k at 10 °C.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1.15 g/L** divided by the pressure. But more pressure means more gas hitting the doorway, so the dissolved amount must go **up** with pressure, not down. Henry's law **multiplies**: dissolved gas = k x pressure.\n\n**2.3 g/L** is k on its own. Look at its unit: **g/L per atm**. That is how much dissolves for **each** atmosphere. At 2.0 atm there are two atmospheres' worth, so the answer is twice k.\n\ndissolved CO₂ = 2.3 x 2.0 = **4.6 g/L**",
            options: [
                { id: 'retry', label: "k is per atmosphere, so multiply.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Gas Pressure** is the pressure of the CO₂ above the drink, in atm. **Temperature** is the drink's temperature, in °C.\n\nThe lab uses **dissolved gas = k x pressure**, draws the straight line for the temperature you choose, and marks where your bottle sits on it.\n\nTry this:\n\n- At **20 °C**, slide **Gas Pressure** up. The dissolved amount climbs in a straight line.\n- Now warm the drink to **40 °C**. The whole line gets less steep -- warm water holds less at every pressure.\n- Slide **Gas Pressure** to zero. That is an opened drink, going flat.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Straight lines, less steep when warm. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two sealed bottles each hold **6.0 g/L** of dissolved CO₂.\n\n**Bottle A** is at **0 °C**. **Bottle B** is at **30 °C**.\n\nWhat CO₂ pressure must each one have above the drink to keep all 6.0 g/L dissolved?",
            options: [
                { id: 'right', label: "A needs about 1.8 atm and B about 4.6 atm, because pressure = 6.0 / k. The warm bottle is under more than twice the pressure, so it opens with a much bigger rush.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both need the same pressure, because both hold the same 6.0 g/L.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The two bottles hold the same amount, but **k is different** at the two temperatures, so they need different pressures to hold it.\n\nRearrange Henry's law: if dissolved gas = k x pressure, then **pressure = dissolved gas / k**.\n\n| Bottle | Temperature | k | Pressure needed |\n| --- | --- | --- | --- |\n| A | 0 °C | 3.4 g/L per atm | 6.0 / 3.4 = **1.8 atm** |\n| B | 30 °C | 1.3 g/L per atm | 6.0 / 1.3 = **4.6 atm** |\n\nWarm water holds less gas at each atmosphere, so it takes more atmospheres to hold the same amount. In a sealed bottle, some CO₂ comes out of the warm drink into the space above it until the pressure there is high enough.\n\nThat is why a warm bottle opens with a bigger rush than a cold one: there is more pressure waiting to escape.",
            options: [
                { id: 'retry', label: "Same amount, different k, different pressure.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Pressure sets how much gas water holds, and temperature sets how much each atmosphere is worth.**\n\nThe same rule works inside people. A **scuba diver** breathes air at higher pressure: every 10 m of water adds about **1 atm**. At 30 m the air in the diver's lungs is at about 4 atm, so about four times as much of its **nitrogen** dissolves into the blood. If the diver comes up too fast, the pressure drops and the limit falls, exactly like opening a bottle. Nitrogen comes out as bubbles in the body. That is **the bends**, which C5 mentioned -- and it is why divers rise slowly, giving the gas time to leave through the lungs instead.\n\nAnd the books balance, just as with L2P5's lever. The pressure packs gas into the drink, and when the pressure is gone, **exactly** that gas comes back out.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Pressure raises the limit!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put a number on the saturation point.**\n\n- Pressure does not push gas past the limit; **it raises the limit**\n- Dissolved gas keeps crossing the surface both ways; saturated means the flows match\n- **1 atm** is the push of the air at sea level\n- **Solubility** is the most that can dissolve, here in **g/L**\n- **Henry's law: dissolved gas = k x pressure**\n- **k** is in g/L per atm, and gets **smaller as water warms**\n- For CO₂: 3.4 at 0 °C, 1.7 at 20 °C, 1.0 at 40 °C\n- Conditions: a gas that barely reacts with water, everyday pressures, the pressure of **that gas only**\n- A sealed bottle at 20 °C and 3.5 atm holds **6.0 g/L**\n- Opened, the limit falls to **0.0007 g/L**, so the drink goes flat\n- Rearranged: **pressure = dissolved gas / k**\n- Divers who rise too fast get **the bends**\n\nNext in B5: why sweat works, in joules and grams.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Dissolved gas = k x pressure!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Gas a Drink Can Hold!**\n\nC5 found that dissolving has a limit. Level 2 found how pressure and temperature set it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Saturated | flows in = flows out | The amount stops changing |\n| Pressure | atm | 1 atm is air at sea level |\n| Solubility | g/L | The saturation point as a number |\n| Henry's law | **dissolved gas = k x pressure** | Double the pressure, double the gas |\n| Temperature | k falls as water warms | Warm drinks hold less |\n| Its conditions | that gas only, everyday pressures | Why opened drinks go flat |\n| A sealed bottle | 1.7 x 3.5 = **6.0 g/L** | 1.6 L of gas in 0.5 L of drink |\n| Rearranged | **pressure = dissolved gas / k** | Warm bottles are under more pressure |\n\n**The one line to remember:** the gas a liquid can hold is k times the pressure of that gas -- and k shrinks as the liquid warms.\n\n**Up next:** B5 -- why sweat works."
        }
    };
}
