import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 5, chemistry.
 *
 * L2C5 read Henry's k from a table. This removes that simplification: k falls
 * with temperature because dissolving a gas releases heat (L3C3's bookkeeping,
 * from the chemicals' point of view), and C15's rule sends a warmed equilibrium
 * the heat-absorbing way. The van 't Hoff rule, written with L3B4's base-ten
 * log, predicts the 40 C value from the 20 C one.
 *
 * Condition stated where used: dH treated as the same at every temperature.
 * The simplification still standing: it is not, so the 0 C prediction is 9% low.
 */
export function getL3C5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C5 read **k** from a table: CO₂ holds **1.7 g/L per atm** at 20 °C, but only **1.0** at 40 °C. Warm water holds less gas.\n\nThe table never said **why** -- or how anyone could predict k at a temperature the table leaves out.\n\nAnd it is odd. Warming usually **helps** things dissolve: sugar dissolves far better in hot tea than in cold. Why is a gas the other way round?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Because dissolving a gas releases heat. Adding heat pushes the balance the other way, back out of the water.", nextNodeId: 'energy', sentiment: 'positive' },
                { id: 'bad', label: "Because warm water molecules are packed closer together, leaving less room between them for gas.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Warm water is actually packed slightly **less** closely -- water expands a little as it warms above 4 °C. So there is, if anything, a touch **more** room. Room cannot be the reason.\n\nAnd sugar shows that warming is not simply bad for dissolving. Something about **gases** in particular must be different.\n\nThe difference is in the **energy**. Dissolving sugar costs energy; dissolving a gas releases it. To see why, keep the books the way L3C3 did.",
            options: [
                { id: 'cont', label: "Keep the energy books for dissolving.", nextNodeId: 'energy' }
            ]
        },
        energy: {
            id: 'energy',
            speaker: 'AI',
            content: "Keep the books **from the chemicals' point of view**, as L3C3 did: a negative **ΔH** means the chemicals lose energy, released as heat.\n\n**Sugar.** Its molecules are held together in a crystal. To dissolve, the crystal must be pulled apart, and that costs energy. Water attracting the loose molecules pays some of it back, but not all. So dissolving sugar has a **positive** ΔH: it takes in a little heat.\n\n**CO₂ gas.** Its molecules are already far apart, feeling almost no attraction, so there is almost nothing to pull apart. When a CO₂ molecule dissolves, water molecules gather round it, and each weak attraction that forms **releases** a little energy -- L3C3's rule that making an attraction releases energy. So dissolving CO₂ has a **negative** ΔH.\n\nWe will call the enthalpy change when one mole of gas dissolves its **heat of dissolving**. For CO₂ it is about:\n\n**ΔH = −20 kJ/mol**\n\nNow C15's rule for a balance that runs both ways: **raising the temperature shifts the balance towards the direction that takes in heat.** Dissolving CO₂ gives out heat, so escaping takes it in. Warming favours escaping -- and k falls.\n\nFor sugar, dissolving takes in heat, so warming favours dissolving. Same rule, opposite sign.",
            options: [
                { id: 'cont', label: "Can the heat of dissolving predict k?", nextNodeId: 'rule' }
            ]
        },
        rule: {
            id: 'rule',
            speaker: 'AI',
            content: "Yes. The more heat dissolving releases, the more steeply k should change with temperature. **Jacobus van 't Hoff** turned that into a rule in 1884:\n\n**log (k₂ / k₁) = B x (1/T₂ − 1/T₁)**\n\nwith\n\n**B = −ΔH / (2.303 x R)**\n\nPiece by piece:\n\n- **k₁** is k at temperature **T₁**; **k₂** is k at **T₂**\n- T is in **kelvin**, as in L3P3: add 273 to the Celsius temperature\n- **R = 8.314 J/mol/K** is the **gas constant**: it links a kelvin of temperature to joules of energy for a mole of particles\n- **2.303** is there because the rule is naturally written with a different kind of logarithm; 2.303 converts it to the base-ten **log** of L3B4\n- ΔH must be in **J/mol**: −20 kJ/mol is −20,000 J/mol\n\nFor CO₂:\n\nB = 20,000 / (2.303 x 8.314) = **1,045 K**\n\nWhy 1/T rather than T? The rule compares the heat of dissolving with the jiggling energy of the molecules, which grows with the kelvin temperature. Dividing by T is that comparison.\n\nThe condition belongs here. **This treats ΔH as the same at every temperature.** The end of the lesson tests that.",
            options: [
                { id: 'cont', label: "Predict k at 40 °C from 20 °C.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Start from the table's **k₁ = 1.7** at 20 °C, so T₁ = **293 K**. Predict k at 40 °C, so T₂ = **313 K**.\n\n1/T₂ − 1/T₁ = 1/313 − 1/293 = 0.003195 − 0.003413 = **−0.000218**\n\nlog (k₂ / k₁) = 1,045 x (−0.000218) = **−0.228**\n\nk₂ / k₁ = 10 to the power −0.228 = **0.59**\n\nk₂ = 1.7 x 0.59 = **1.0 g/L per atm**\n\nThat is exactly the table's value at 40 °C -- predicted from the table's 20 °C value and one number, the heat of dissolving.\n\nNotice the sign doing its work. Warming makes 1/T₂ smaller than 1/T₁, so the bracket is negative. B is positive because ΔH is negative. A negative log means a ratio below 1: **k falls**.\n\nFor sugar, ΔH is positive, B is negative, and the same rule makes solubility **rise** with temperature.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Predict k for CO₂ at **30 °C**, starting from **1.7 g/L per atm at 20 °C**, with **B = 1,045 K**.",
            options: [
                { id: 'right', label: "About 1.3 g/L per atm. 1/303 − 1/293 = −0.000113; 1,045 x −0.000113 = −0.118; 10 to the power −0.118 = 0.76; 1.7 x 0.76 = 1.3.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'celsius', label: "Almost zero, because 1/30 − 1/20 = −0.0167, and 1,045 x −0.0167 = −17.4, so the ratio is 10 to the power −17.4.", nextNodeId: 'math_wrong' },
                { id: 'swapped', label: "About 2.2 g/L per atm, because 1/293 − 1/303 = +0.000113, giving 10 to the power +0.118 = 1.31, and 1.7 x 1.31 = 2.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Almost zero** used Celsius. The rule needs **kelvin**, for the same reason as L3P3: 0 °C is not zero of anything, so 1/20 and 1/30 compare nonsense. In kelvin the two temperatures are 293 K and 303 K, only about 3% apart, so k changes by a sensible amount.\n\n**2.2** swapped the temperatures, so the bracket came out positive and k **rose** on warming. That contradicts the energy argument -- dissolving CO₂ releases heat, so warming must lower k. The bracket is always **1/T₂ − 1/T₁**, where T₂ is the new temperature.\n\n1/303 − 1/293 = −0.000113\n1,045 x (−0.000113) = −0.118\n10 to the power −0.118 = 0.76\nk = 1.7 x 0.76 = **1.3 g/L per atm** -- the table's 30 °C value.",
            options: [
                { id: 'retry', label: "Kelvin, and new temperature first.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Temperature** is the water's temperature, in °C. **Heat of Dissolving** is the size of ΔH, in kJ/mol -- always shown as released, so negative.\n\nThe lab draws van 't Hoff's curve of k against temperature for a gas that holds **1.7 g/L per atm at 20 °C**, and marks your temperature on it. The dots are **measured CO₂**, from L2C5's table.\n\nTry this:\n\n- Set **Heat of Dissolving** to **−20 kJ/mol**. The curve runs through the measured dots from 20 °C to 40 °C.\n- Now look at **0 °C**. The curve predicts about **3.1**; the measured dot is **3.4**.\n- Shrink **Heat of Dissolving** to −5 kJ/mol. The curve goes nearly flat: little heat, little effect.\n- Push it to −40 kJ/mol. The curve gets steep.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "More heat released, steeper curve. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Oxygen releases less heat when it dissolves than CO₂ does: its heat of dissolving is about **−14 kJ/mol**, against CO₂'s **−20 kJ/mol**.\n\nBoth are warmed from **20 °C to 30 °C**. Which keeps the larger share of its k?",
            options: [
                { id: 'right', label: "Oxygen. Its smaller heat of dissolving gives a smaller B, about 731 K, so it keeps about 83% of its k, while CO₂ keeps about 76%.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "They keep the same share, because both warmed by the same 10 °C.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The bracket, 1/T₂ − 1/T₁, is indeed the same for both: **−0.000113**. But it is multiplied by **B**, and B depends on the heat of dissolving.\n\n| Gas | ΔH | B = −ΔH / (2.303 x 8.314) | log (k₂ / k₁) | Share of k kept |\n| --- | --- | --- | --- | --- |\n| CO₂ | −20,000 J/mol | 1,045 K | −0.118 | **76%** |\n| Oxygen | −14,000 J/mol | 731 K | −0.082 | **83%** |\n\nThe same warming costs CO₂ more of its k, because dissolving CO₂ releases more heat. **The temperature change sets the bracket; the heat of dissolving sets how much the bracket matters.**",
            options: [
                { id: 'retry', label: "Same bracket, different B.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **How fast k falls with temperature is set by the heat of dissolving.**\n\nIt matters outdoors. Every gas that releases heat as it dissolves is held less well by warm water, oxygen included. In a hot summer, a warm, still pond holds noticeably less oxygen than it did in spring -- which is why ponds can run short of oxygen for the life in them.\n\nHere is the simplification this lesson removed. **L2C5 read k from a table, as if it were just a fact about each temperature.** It is not a separate fact at each temperature. It follows from a single quantity -- the heat of dissolving -- and van 't Hoff's rule.\n\nAnd the simplification still standing, which the lab already showed: **the rule treats ΔH as the same at every temperature, and it is not.** At 0 °C it predicts 3.1 g/L per atm; the measured value is 3.4, about 9% higher. In cold water the water molecules gather more tightly round a dissolved gas molecule, so dissolving releases **more** heat than −20 kJ/mol, and k climbs faster than the constant-ΔH curve allows.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The heat of dissolving sets the slope!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why warm water loses its gas.**\n\n- Water expands slightly as it warms, so lack of room is not the reason\n- Keep the books from the chemicals' point of view: negative **ΔH** releases heat\n- Dissolving sugar pulls a crystal apart: ΔH **positive**\n- Dissolving a gas forms weak attractions with little to break: ΔH **negative**\n- The **heat of dissolving** of CO₂ is about **−20 kJ/mol**\n- C15: warming shifts a balance towards the direction that takes in heat\n- **van 't Hoff**: **log (k₂ / k₁) = B x (1/T₂ − 1/T₁)**, **B = −ΔH / (2.303 x R)**\n- T in **kelvin**; **R = 8.314 J/mol/K**, the **gas constant**\n- For CO₂, B = **1,045 K**; 20 °C to 40 °C predicts k = **1.0** -- the table's value\n- Oxygen (−14 kJ/mol) keeps **83%** of its k from 20 °C to 30 °C; CO₂ keeps **76%**\n- Warm ponds hold less oxygen\n- Still standing: ΔH changes with temperature, so the 0 °C prediction is 9% low",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "log (k₂ / k₁) = B x (1/T₂ − 1/T₁)!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Warm Drinks Lose Their Fizz!**\n\nL2C5 read k from a table. Level 3 predicted the table from one number.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Room is not the reason | water expands when warmed | Look at energy instead |\n| Sugar | ΔH positive | Warming helps it dissolve |\n| A gas | ΔH negative | Warming drives it out |\n| Heat of dissolving | CO₂ about **−20 kJ/mol** | Heat released per mole dissolved |\n| van 't Hoff | **log (k₂ / k₁) = B x (1/T₂ − 1/T₁)** | T in kelvin |\n| The slope | **B = −ΔH / (2.303 x R)** | 1,045 K for CO₂ |\n| The test | 20 °C to 40 °C gives **1.0** | Matches the table |\n| Oxygen against CO₂ | 83% kept against 76% | Less heat, gentler slope |\n| Still standing | ΔH is not constant | 0 °C predicted 9% low |\n\n**The one line to remember:** a gas that releases heat as it dissolves is driven back out by warming -- and the more heat, the faster it goes.\n\n**Up next:** B5 -- the limit on how fast sweat can cool you."
        }
    };
}
