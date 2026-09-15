import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C10 "Air Pollution".
 *
 * C10 said burning fossil fuels releases CO2. This lesson works out how much,
 * and answers the puzzle of CO2 weighing more than the fuel: carbon joins
 * oxygen from the air. mass of carbon = mass of fuel x carbon share; mass of
 * CO2 = mass of carbon x 44 / 12, using L2C2's formula masses. Worked: 10 kg of
 * petrol makes 31.5 kg of CO2, about 2.3 kg for each litre.
 *
 * Condition stated where the formula is given: all the carbon burns completely
 * to CO2. The checkpoint runs the formula for a tree taking CO2 back out. Held
 * fixed and named for Level 3: all the CO2 made stays in the air.
 */
export function getL2C10Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C10 said that burning fossil fuels puts **carbon dioxide, CO₂**, into the air. Here is a puzzle about how much.\n\nA car burns **10 kg** of petrol on a long drive. The CO₂ that comes out of its exhaust pipe has a mass of about **31 kg**.\n\nHow can burning 10 kg of fuel make 31 kg of gas?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The fuel joins with oxygen from the air. Each carbon atom picks up two oxygen atoms, which together are heavier than it, so the CO₂ weighs more than the carbon did.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It can't. Matter is never created, so 10 kg of fuel can make at most 10 kg of CO₂ -- the 31 kg must be wrong.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "You are right that matter is never created or destroyed. So count **everything** that goes in.\n\nA fire needs air. Put a jar over a candle, and the flame goes out once the jar's oxygen is used up. Burning takes **oxygen** out of the air and joins it to the fuel.\n\nThink of making sandwiches. Each slice of cheese gets two slices of bread. A pile of sandwiches weighs far more than the cheese you started with -- but nothing was created. The bread came from the bread bin.\n\nIn a car, the carbon in the fuel is the cheese, and the oxygen from the air is the bread. Count the oxygen, and the mass balances.",
            options: [
                { id: 'cont', label: "So how do I work out the mass of CO₂?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Petrol is made mostly of **carbon** and **hydrogen**, joined in molecules called **hydrocarbons**. When it burns completely:\n\n- the carbon joins oxygen and becomes **carbon dioxide, CO₂**\n- the hydrogen joins oxygen and becomes **water vapour**\n\nIn L2C2 you worked out the formula masses: carbon is **12**, and CO₂ is 12 + 2 x 16 = **44**. So every **12 g** of carbon becomes **44 g** of CO₂, because each carbon atom gains two oxygen atoms:\n\n**mass of CO₂ = mass of carbon x 44 / 12**\n\n44 / 12 = **3.67**, so each kilogram of carbon makes **3.67 kg** of CO₂.\n\nTo use it, you first need the carbon in the fuel. The **carbon share** is the part of the fuel's mass that is carbon:\n\n**mass of carbon = mass of fuel x carbon share**\n\nPetrol is about **86%** carbon by mass, a carbon share of 0.86. **Methane**, the main gas in natural gas, is **75%** carbon.\n\nThe condition belongs here. **This assumes all the carbon burns completely to CO₂.** Without enough oxygen, some carbon comes out as soot, or as a poisonous gas called carbon monoxide -- the dark smoke from P10.",
            options: [
                { id: 'cont', label: "Work out the 10 kg of petrol.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**10 kg of petrol**, carbon share 0.86.\n\n**Step 1. Carbon in the fuel:**\n\nmass of carbon = 10 kg x 0.86 = **8.6 kg**\n\n**Step 2. CO₂ from that carbon:**\n\nmass of CO₂ = 8.6 kg x 44 / 12 = **31.5 kg**\n\n**Step 3. Where did the extra mass come from?**\n\n31.5 − 8.6 = **22.9 kg** of oxygen, taken from the air and joined to the carbon.\n\nThe puzzle is solved: 8.6 kg of carbon from the fuel, plus 22.9 kg of oxygen from the air, makes 31.5 kg of CO₂. Nothing was created.\n\nPetrol is sold by the litre, and a litre of petrol has a mass of about **0.74 kg**. So each litre makes:\n\n0.74 x 0.86 x 44 / 12 = **2.3 kg** of CO₂\n\nA **40-litre** tank makes about 40 x 2.3 = **93 kg** of CO₂: more than most adults weigh.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A gas cooker burns **1 kg of methane**, which is **75%** carbon.\n\nHow much CO₂ does it make?",
            options: [
                { id: 'right', label: "2.75 kg. The carbon is 1 kg x 0.75 = 0.75 kg, and 0.75 x 44 / 12 = 2.75 kg.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'carbon', label: "0.75 kg, because that is how much carbon is in it.", nextNodeId: 'math_wrong' },
                { id: 'no_share', label: "3.67 kg, because 1 x 44 / 12 = 3.67.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.75 kg** stopped after Step 1. That is the **carbon**, not the CO₂. Each kilogram of carbon still has to pick up its oxygen.\n\n**3.67 kg** skipped Step 1, and treated the whole kilogram of methane as carbon. But a quarter of methane's mass is hydrogen, which becomes water, not CO₂.\n\n**Step 1.** mass of carbon = 1 kg x 0.75 = **0.75 kg**\n\n**Step 2.** mass of CO₂ = 0.75 kg x 44 / 12 = **2.75 kg**",
            options: [
                { id: 'retry', label: "Carbon first, then x 44 / 12.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Fuel Mass** is the mass of fuel burned, in kg. **Carbon Share** is the percentage of the fuel's mass that is carbon.\n\nThe lab splits the fuel into its carbon and the rest, adds the oxygen taken from the air, and shows the mass of CO₂ that comes out.\n\nTry this:\n\n- Set **10 kg** and **86%**, for petrol: 31.5 kg of CO₂\n- Change to **75%**, for methane: less carbon, less CO₂\n- At every setting, compare the oxygen from the air with the carbon from the fuel. The oxygen is always **32 / 12**, nearly three times, the carbon",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Carbon x 44 / 12. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Now run it the other way. Plants take CO₂ **out** of the air and build its carbon into themselves.\n\nA growing tree adds **10 kg of carbon** to its wood in one year. How much CO₂ did it take out of the air to do that?",
            options: [
                { id: 'right', label: "36.7 kg. Every 12 kg of carbon came from 44 kg of CO₂, so 10 kg x 44 / 12 = 36.7 kg. The tree kept the carbon and gave the oxygen back to the air.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "2.7 kg, because 10 kg x 12 / 44 = 2.7 kg.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "12 / 44 turns a mass of **CO₂** into the carbon inside it. Here the carbon is already known -- 10 kg in the wood -- and the CO₂ is what you want.\n\nCheck the direction. CO₂ is heavier than the carbon in it, so the CO₂ taken in must be **more** than 10 kg, never less.\n\n| | Carbon | Oxygen | CO₂ |\n| --- | --- | --- | --- |\n| Formula masses | 12 | 32 | 44 |\n| The tree's year | **10 kg** | 26.7 kg | **36.7 kg** |\n\nThe tree kept the 10 kg of carbon, and gave oxygen back to the air.",
            options: [
                { id: 'retry', label: "Carbon known, so x 44 / 12.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Burning carbon puts CO₂ into the air; growing plants take it back out -- and the same 44 / 12 works both ways.**\n\nPut the two together. A car burning **1,000 litres** of petrol in a year makes about 1,000 x 2.3 = **2,300 kg** of CO₂. Soaking that up would take the year's growth of about **60 trees** like this one.\n\nOne thing this lesson held fixed: **all the CO₂ that is made stays in the air.** Level 3 checks that against measurements of the air itself -- and finds that only about half of it does.\n\nB10 said biodiversity keeps ecosystems strong. B10 at Level 2 finds a way to measure it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The oxygen comes from the air!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how fuel makes more CO₂ than its own mass.**\n\n- Burning joins the fuel's carbon to **oxygen from the air**\n- Mass is conserved once the oxygen is counted\n- **mass of carbon = mass of fuel x carbon share**\n- **mass of CO₂ = mass of carbon x 44 / 12**, from L2C2's formula masses\n- Each kg of carbon makes **3.67 kg** of CO₂\n- Condition: all the carbon burns completely to CO₂\n- 10 kg of petrol: 8.6 kg of carbon + 22.9 kg of oxygen = **31.5 kg** of CO₂\n- A litre of petrol makes about **2.3 kg** of CO₂\n- 1 kg of methane makes **2.75 kg**\n- A tree storing 10 kg of carbon took **36.7 kg** of CO₂ from the air\n- Held fixed: all the CO₂ made stays in the air",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Carbon x 44 / 12!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- More Carbon Dioxide Than Fuel!**\n\nC10 said burning fuel makes CO₂. Level 2 works out how much.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Carbon in the fuel | **fuel x carbon share** | Petrol 86%, methane 75% |\n| CO₂ from carbon | **carbon x 44 / 12** | Each carbon gains two oxygens |\n| 10 kg of petrol | 8.6 x 44 / 12 | **31.5 kg** of CO₂ |\n| The extra mass | 31.5 − 8.6 | **22.9 kg** of oxygen from the air |\n| A litre of petrol | 0.74 x 0.86 x 44 / 12 | **2.3 kg** of CO₂ |\n| 1 kg of methane | 0.75 x 44 / 12 | **2.75 kg** |\n| A tree's year | 10 x 44 / 12 | **36.7 kg** taken from the air |\n\n**The one line to remember:** burning adds oxygen from the air to the fuel's carbon -- so every kilogram of carbon becomes 3.67 kg of CO₂.\n\n**Up next:** B10 -- how to measure how diverse a meadow is."
        }
    };
}
