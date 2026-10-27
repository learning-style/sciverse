import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 6, biology. The synthesis lesson.
 *
 * L2B6 held the swim bladder at one size at every depth. This removes that
 * simplification: from L3P2 at steady temperature, p1 V1 = p2 V2 (Boyle), and
 * from L3P6 every 10 m of seawater adds almost exactly 1 atm. Worked by hand
 * for L2B6's fish moved away from 20 m, it shows an unstable balance -- and,
 * because Boyle works in ratios, one most unstable near the surface.
 *
 * Conditions stated where Boyle is used: ideal gas, steady temperature, fixed
 * amount of gas. The simplification still standing: the body treated as not
 * squeezing and the gas gland ignored; some deep-sea fish store oils instead.
 */
export function getL3B6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B6's **1,000 g** fish hovered in the sea with **41 cm³** of gas in its swim bladder. And L3P6 showed that the buoyant force on a solid object stays the same at any depth.\n\nNow put the two together. The fish is hovering, perfectly balanced. A current nudges it **10 m deeper**.\n\nWhat happens next?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It keeps sinking. The deeper water squeezes its swim bladder smaller, so its average density rises -- and the deeper it goes, the more it is squeezed.", nextNodeId: 'boyle', sentiment: 'positive' },
                { id: 'bad', label: "It hovers at its new depth. L3P6 showed that the buoyant force does not change with depth.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "L3P6 did show that -- for an object whose **volume stays the same**. It said so at the end: the simplification still standing was that nothing squeezes.\n\nA steel hull hardly squeezes. But a swim bladder is a thin bag of **gas**, and gas squeezes easily. If the bladder shrinks, the fish's total volume shrinks. Its mass stays the same, so its **average density goes up** -- while the water around it stays the same.\n\nTo find out by how much, you need the rule for squeezing a gas.",
            options: [
                { id: 'cont', label: "What is the rule for squeezing a gas?", nextNodeId: 'boyle' }
            ]
        },
        boyle: {
            id: 'boyle',
            speaker: 'AI',
            content: "L3P2 gave you **pV / T = constant** for a fixed amount of gas, exactly true for an ideal gas. Hold the temperature steady -- over a few minutes at one depth, the sea around a fish barely changes temperature -- and T drops out:\n\n**p₁ x V₁ = p₂ x V₂**\n\nThis is **Boyle's law**. The little 1 and 2 mean before and after. At a steady temperature, doubling the pressure on a gas halves its volume.\n\nThe conditions belong here. **It treats the gas as ideal, its temperature as steady, and its amount as fixed** -- no gas added or removed by the fish's gas gland while it drifts.\n\nNow the pressure. From L3P6, **p = atmospheric pressure + ρ g h**. For seawater, every 10 m adds 1,025 x 9.8 x 10 = **100,450 Pa** -- almost exactly one atmosphere, 101,000 Pa. So, counting in atmospheres:\n\n**pressure ≈ 1 + depth / 10**, in atm, with the depth in metres\n\nAt the surface, 1 atm. At 10 m, 2 atm. At 20 m, 3 atm.",
            options: [
                { id: 'cont', label: "Move the fish and work it out.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Put the fish at **20 m** (3 atm), hovering with **41 cm³** of gas. Its body, from L2B6, takes up **935 cm³**, so its total volume is 976 cm³, and its average density is 1,000 / 976 = **1.025 g/cm³** -- the same as the sea.\n\nNow move it, with the same gas. At each depth, Boyle's law gives the new gas volume: V₂ = p₁ x V₁ / p₂ = 3 x 41 / p₂.\n\n| Depth | Pressure | Gas volume | Total volume | Average density | In seawater at 1.025, it |\n| --- | --- | --- | --- | --- | --- |\n| 10 m | 2 atm | 3 x 41 / 2 = 61.5 cm³ | 996.5 cm³ | 1.004 g/cm³ | **rises** |\n| 20 m | 3 atm | 41.0 cm³ | 976.0 cm³ | 1.025 g/cm³ | hovers |\n| 30 m | 4 atm | 3 x 41 / 4 = 30.8 cm³ | 965.8 cm³ | 1.035 g/cm³ | **sinks** |\n| 40 m | 5 atm | 3 x 41 / 5 = 24.6 cm³ | 959.6 cm³ | 1.042 g/cm³ | **sinks faster** |\n\nRead down the table. Nudge the fish deeper, and the extra pressure shrinks its bladder, which makes it denser, which sends it deeper still, which shrinks the bladder more. Nudge it shallower, and the same thing runs the other way: the bladder swells, and it floats up faster and faster.\n\nThis is an **unstable balance**. A ball resting in the bottom of a bowl is in a **stable** balance: nudge it, and it rolls back. A pencil standing on its point is in an **unstable** one: nudge it, and it falls further. A fish with a swim bladder is the pencil.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A fish hovers at **10 m** (2 atm) with **41 cm³** of gas. Something startles it, and it darts up to the **surface** (1 atm) far too fast for its gas gland to let any gas out.\n\nWhat is the volume of its swim bladder at the surface?",
            options: [
                { id: 'right', label: "82 cm³. p₁ x V₁ = p₂ x V₂, so V₂ = 2 x 41 / 1 = 82 cm³: half the pressure, double the volume.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'halved', label: "20.5 cm³, because the pressure has halved, so the volume halves too.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "41 cm³, because the fish still has the same amount of gas.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**20.5 cm³** has Boyle's law upside down. Pressure and volume go **opposite** ways: less pressure lets a gas spread out. From p₁ x V₁ = p₂ x V₂, the new volume is V₂ = p₁ x V₁ / p₂ = 2 x 41 / 1.\n\n**41 cm³** is right that the **amount** of gas has not changed. But the same amount of gas takes up more room at a lower pressure. Amount and volume are different things.\n\nV₂ = 2 x 41 / 1 = **82 cm³**. The fish's average density falls to 1,000 / (935 + 82) = **0.983 g/cm³**, far below the sea's 1.025 -- so it keeps rising.",
            options: [
                { id: 'retry', label: "Less pressure, more volume.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Hover Depth** is the depth, in metres, where the fish's gas takes up exactly 41 cm³, giving it the sea's density. **Depth** is where the fish is now.\n\nThe lab uses Boyle's law to find the gas volume at the fish's depth, and works out its average density. It also shows the **net force** on the fish: L3P6's buoyant force, **ρ x g x V** with seawater at 1,025 kg/m³, minus the fish's weight, 9.8 N. Up counts as positive.\n\nTry this:\n\n- Set **Hover Depth** to 20 m, then move **Depth** 5 m either way. Watch the net force push the fish further away\n- Set **Hover Depth** to **2 m** and move **Depth** 5 m deeper. Then set **Hover Depth** to **45 m** and move the same 5 m\n\nThat second pair is what the checkpoint is about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The shallow fish is pushed harder. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two fish each hover with 41 cm³ of gas. **Fish A** hovers at **5 m**; **Fish B** hovers at **95 m**. Each is nudged **10 m deeper**.\n\nWhose swim bladder shrinks by the bigger share?",
            options: [
                { id: 'right', label: "Fish A's. Its pressure rises from 1.5 to 2.5 atm, so its gas shrinks to 60% of its volume. Fish B's rises from 10.5 to 11.5 atm, so its gas keeps about 91%.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Fish B's. The pressure at 95 m is far higher, so the extra 10 m squeezes much harder down there.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The pressure at 95 m **is** far higher. But 10 more metres adds the same **1 atm** at either depth -- and Boyle's law cares about the **ratio** of the pressures, not their difference. It is L2B4's lesson about ratios, turning up in a gas.\n\n| Fish | Pressure before | Pressure after | Gas volume after = 41 x before / after | Share of gas volume kept |\n| --- | --- | --- | --- | --- |\n| A, from 5 m | 1.5 atm | 2.5 atm | 41 x 1.5 / 2.5 = 24.6 cm³ | **60%** |\n| B, from 95 m | 10.5 atm | 11.5 atm | 41 x 10.5 / 11.5 = 37.4 cm³ | **91%** |\n\nOne extra atmosphere is a 67% increase for Fish A, but under 10% for Fish B.\n\n**Near the surface, a small change in depth is a big change in the pressure ratio** -- so a swim bladder is at its most unstable in shallow water.",
            options: [
                { id: 'retry', label: "Boyle's law works in ratios.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Boyle's law works in ratios, so a swim bladder is most unstable near the surface.**\n\nHere is the simplification this lesson removed. **L2B6 held the swim bladder at one size at every depth.** Gas squeezes, so a fish's balance is not a setting it chooses once. It slips whenever the fish changes depth, and the fish must keep correcting it: with its fins for quick fixes, and its gas gland for slow ones.\n\nThat completes Big Idea 6 at Level 3. Level 2 compared densities at one moment. Level 3 asked what **depth** changes:\n\n- **L3P6** -- pressure grows with depth, **p = atmospheric pressure + ρ g h**, and the buoyant force is the difference across an object: **ρ x g x V**\n- **L3C6** -- the water's own density is not fixed: temperature and salt compete, **1 g/kg of salt is worth about 4 °C**, and the ocean settles into layers\n- **L3B6** -- gas squeezes, **p₁ x V₁ = p₂ x V₂**, so a fish's balance runs away from itself, most of all near the surface\n\nAnd the simplification still standing: **the fish's body was treated as not squeezing at all, and its gas gland was ignored.** Real bodies squeeze a little, and the gas gland keeps working. Some deep-sea fish avoid the problem altogether. Instead of a gas bladder, they store **oils and fats**, which are less dense than water but barely squeeze -- so their balance hardly changes with depth.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "An unstable balance, worst near the surface!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You followed a fish's balance down through the sea.**\n\n- A swim bladder is gas, and gas squeezes -- so L3P6's fixed volume does not apply\n- From L3P2 at steady temperature: **p₁ x V₁ = p₂ x V₂**, **Boyle's law**\n- Conditions: ideal gas, steady temperature, fixed amount of gas\n- Every 10 m of seawater adds almost exactly **1 atm**: pressure ≈ 1 + depth / 10\n- Hovering at 20 m with 41 cm³: at 30 m the gas shrinks to **30.8 cm³** and the fish sinks\n- Deeper means denser means deeper: an **unstable balance**, like a pencil on its point\n- A fish darting from 10 m to the surface: its gas doubles to **82 cm³**\n- Boyle's law works in **ratios**: 10 m from 5 m keeps 60% of the gas; 10 m from 95 m keeps 91%\n- So a swim bladder is most unstable near the surface\n- Fish correct with their fins (fast) and their gas gland (slow)\n- Still standing: the body treated as not squeezing; some deep-sea fish store oils instead of gas",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "p₁ x V₁ = p₂ x V₂!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Swim Bladder's Unstable Balance!**\n\nL2B6 set a fish's density once. Level 3 lets the gas squeeze, and finds a balance that runs away from itself.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Gas squeezes | **p₁ x V₁ = p₂ x V₂** | Boyle's law, at steady temperature |\n| Pressure in the sea | ≈ 1 + depth / 10 atm | 10 m adds about 1 atm |\n| Deeper | 3 x 41 / 4 = 30.8 cm³ | Smaller bladder, denser fish |\n| Unstable balance | deeper, denser, deeper | A pencil on its point |\n| Darting up | 2 x 41 / 1 = 82 cm³ | Double the volume |\n| Ratios | 1.5 to 2.5 atm keeps 60% | Shallow water is the hardest |\n| Deep water | 10.5 to 11.5 atm keeps 91% | Deep water is gentler |\n| Still standing | body does not squeeze | Some fish use oils instead |\n| Big Idea 6 at Level 3 | pressure, layers, squeezing | What depth changes |\n\n**The one line to remember:** gas in a swim bladder squeezes as the fish goes deeper, so its balance is unstable -- and because Boyle's law works in ratios, it is least stable near the surface.\n\n**Big Idea 6 is complete at Level 3.**"
        }
    };
}
