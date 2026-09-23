import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 15, chemistry.
 *
 * Removes L2C15's two simplifications: that reactions are one-to-one, and that
 * raw amounts can stand in for concentrations. The balancing numbers become
 * powers, and the brackets mean moles per litre:
 *
 *   H2 + I2 <-> 2HI,  Kc = [HI]^2 / ([H2][I2]) = 54.3 at 430 C
 *
 * Solved with an ICE table from 1.00 mol/L of each: x = 0.7865, so [HI] = 1.573
 * and [H2] = [I2] = 0.2135. The checkpoint squeezes the flask, where the powers
 * decide whether anything shifts at all: delta n = 0 here, but -2 for ammonia.
 *
 * Still standing: concentrations are used as if every particle acted
 * independently, and Kc itself changes with temperature.
 */
export function getL3C15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C15 gave you a ratio that predicts which way a reaction moves:\n\n**K = product / reactant**\n\nand it worked, because every reaction there turned one particle into one particle.\n\nReal equations are not so obliging. Hydrogen and iodine make hydrogen iodide:\n\n**H₂ + I₂ ⇌ 2HI**\n\nThat ratio has a proper name, and it is the dial under the picture: the **equilibrium constant, Kc**. The c is there because it is worked out from **concentrations** -- how much of each substance sits in each litre.\n\nOne molecule of each goes in; **two** come out. So when you write the ratio for this reaction, what do you do with that 2?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It becomes a power: the HI concentration is squared, because two molecules of it are involved. The balancing numbers turn into exponents.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing -- you still divide the amount of product by the amount of reactant. The 2 only tells you how to balance the equation.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Try it and watch two things go wrong.\n\nA real flask of this reaction at 430 °C, at equilibrium, holds **1.573 mol/L of HI** and **0.2135 mol/L each of H₂ and I₂**.\n\n**Divide the way L2C15 did:** 1.573 / (0.2135 x 0.2135) = **34.5**\n\n**Square the HI, as the equation demands:** 1.573² / (0.2135 x 0.2135) = **54.3**\n\nThe published value for this reaction is **54.3**. The first sum is not a different convention -- it is wrong.\n\nAnd there is a second failure, worse than being wrong by a fixed factor. Take that flask and squeeze it to **half its volume**, so every concentration doubles. Work both sums again:\n\n| | Before squeezing | After squeezing |\n| --- | --- | --- |\n| With the square | **54.3** | **54.3** |\n| Without it | 34.5 | **17.3** |\n\nThe squared version is **unchanged** -- which is what a constant is supposed to be. The unsquared one halves, so it is not a constant at all, and cannot predict anything.\n\nThe powers are not bookkeeping. They are what makes K constant.",
            options: [
                { id: 'cont', label: "Then give me the proper form.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two changes to L2C15's ratio, and both matter.\n\n**1. Concentrations, not amounts.** Square brackets mean **concentration in moles per litre (mol/L)**: **[HI]** is moles of HI divided by the volume in litres. L2C15 counted particles and got away with it only because its volume never changed.\n\n**2. The balancing numbers become powers.** For the general reaction\n\n**aA + bB ⇌ cC + dD**\n\n**Kc = [C]^c x [D]^d / ([A]^a x [B]^b)**\n\nProducts on top, each raised to its own balancing number; reactants underneath, the same. For hydrogen iodide:\n\n**Kc = [HI]² / ([H₂] x [I₂])**\n\nThe conditions, and this form has three.\n\n1. **One temperature.** Kc is constant as amounts change, but **not** as temperature changes -- which is exactly why C15's temperature slider moved the balance.\n2. **Only species whose concentration can vary appear.** Pure solids and pure liquids are left out entirely, because their concentration cannot change.\n3. **Gases and dissolved substances**, measured in mol/L.\n\nThe subscript **c** in Kc stands for **concentration**. Gas reactions are often written instead with **Kp**, built from pressures.",
            options: [
                { id: 'cont', label: "Now solve one.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The question.** One litre holds **1.00 mol of H₂** and **1.00 mol of I₂** at 430 °C, where **Kc = 54.3**. What is in the flask at equilibrium?\n\nThe tool for this is an **ICE table** -- **I**nitial, **C**hange, **E**quilibrium. Let **x** mol/L of H₂ react. The equation says I₂ uses up the same x, and HI appears at **2x**, because of that 2.\n\n| | H₂ | I₂ | HI |\n| --- | --- | --- | --- |\n| **Initial** | 1.00 | 1.00 | 0 |\n| **Change** | −x | −x | **+2x** |\n| **Equilibrium** | 1.00 − x | 1.00 − x | **2x** |\n\n**Step 1.** Put the equilibrium row into Kc:\n\n(2x)² / ((1.00 − x) x (1.00 − x)) = 54.3\n\n**Step 2.** Both sides are perfect squares, so take the square root of the whole thing:\n\n2x / (1.00 − x) = √54.3 = **7.369**\n\n**Step 3.** Rearrange: 2x = 7.369 − 7.369x, so 9.369x = 7.369\n\n**Step 4.** x = **0.7865 mol/L**\n\n**Step 5.** So **[HI] = 2x = 1.573** and **[H₂] = [I₂] = 1.00 − x = 0.2135 mol/L**\n\nNow put those numbers back into the table, in place of x:\n\n| | H₂ | I₂ | HI |\n| --- | --- | --- | --- |\n| **Initial** | 1.00 | 1.00 | 0 |\n| **Change** | −0.7865 | −0.7865 | **+1.5731** |\n| **Equilibrium** | **0.2135** | **0.2135** | **1.5731** |\n\nEvery column still adds up: 0.7865 reacted plus 0.2135 left over is the 1.00 you started with, and the HI gained is exactly twice what each reactant lost.\n\n**Step 6.** Check: 1.573² / (0.2135 x 0.2135) = 2.474 / 0.04558 = **54.3** ✓\n\nSo nearly 79% of the hydrogen has reacted, and the flask ends up mostly HI -- which is what a Kc well above 1 promised. The ICE table is how you get from \"mostly\" to **1.573 mol/L**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A flask at equilibrium holds **[HI] = 0.80**, **[H₂] = 0.25** and **[I₂] = 0.10 mol/L**.\n\nWhat is Kc for this mixture?",
            options: [
                { id: 'right', label: "25.6. The top is 0.80² = 0.64, the bottom is 0.25 x 0.10 = 0.025, and 0.64 / 0.025 = 25.6.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_power', label: "32. The top is 0.80 and the bottom is 0.025, so 0.80 / 0.025 = 32.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "2.3, because 0.80 / (0.25 + 0.10) = 2.3.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**32** left the square off the HI. That is the whole point of this lesson: the 2 in **2HI** becomes a power of 2 on **[HI]**.\n\n**2.3** added the two reactant concentrations. They **multiply** -- a collision needs one of each, so the chance of it depends on the product of the two, not their sum.\n\n**Step 1.** top: [HI]² = 0.80² = **0.64**\n\n**Step 2.** bottom: [H₂] x [I₂] = 0.25 x 0.10 = **0.025**\n\n**Step 3.** Kc = 0.64 / 0.025 = **25.6**\n\nAnd a bonus reading: 25.6 is not 54.3, so this flask is **not** at 430 °C. Kc is a fingerprint of the reaction **and** its temperature -- which is how a chemist can work backwards from concentrations to the conditions.",
            options: [
                { id: 'retry', label: "Square the HI, multiply the reactants.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Starting Concentration** sets how much H₂ and I₂ you begin with, equal amounts of each, in mol/L. **Equilibrium Constant Kc** sets the reaction's constant.\n\nThe lab builds the ICE table, solves for x, and draws the equilibrium concentrations as three columns.\n\nTry this:\n\n- **1.00 mol/L** with **Kc = 54.3**: x = 0.787, giving [HI] = 1.573 and 0.2135 of each reactant\n- Raise the **starting concentration** to 2.00: every equilibrium concentration doubles, and Kc stays 54.3 -- the powers make it scale-free\n- Drop **Kc** to **10**: only x = 0.613 reacts, and the flask keeps much more H₂ and I₂\n- Push **Kc** to **100**: x = 0.833, and the reactants nearly vanish\n- Notice that x never reaches 1.00, however large Kc gets -- the reverse reaction never quite stops",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Powers on top and bottom, solved with an ICE table. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Take the equilibrium flask of **H₂ + I₂ ⇌ 2HI** and squeeze it to half its volume.\n\nNow do the same to a flask of the Haber reaction C15 mentioned:\n\n**N₂ + 3H₂ ⇌ 2NH₃**\n\nOne of these shifts and the other does not. Which, and what decides it?",
            options: [
                { id: 'right', label: "The ammonia shifts forward, the hydrogen iodide does not. Squeezing doubles every concentration, and whether that changes Q depends on how many gas particles each side of the equation has: 2 to 2 for HI, but 4 to 2 for ammonia.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both shift forward. Squeezing raises all the concentrations, which always drives a reaction towards its products.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Squeezing raises every concentration, true -- but Q is a **ratio** of them, with powers, and raising everything can leave a ratio untouched. Do both sums.\n\n**Hydrogen iodide.** Double [HI], [H₂] and [I₂]:\n\nQ = (2[HI])² / ((2[H₂]) x (2[I₂])) = 4[HI]² / (4[H₂][I₂]) = **unchanged**\n\nThe 4 on the top and the 4 underneath cancel. Q still equals Kc, so **nothing shifts**.\n\n**Ammonia.** Double all four concentrations:\n\nQ = (2[NH₃])² / ((2[N₂]) x (2[H₂])³) = 4[NH₃]² / (16[N₂][H₂]³) = **a quarter of what it was**\n\nQ has fallen below Kc, so by L2C15's rule the reaction runs **forward** -- making more ammonia.\n\nThe bookkeeping that decides it is the change in gas particles, **Δn**:\n\n| Reaction | Gas particles | Δn | Squeezing |\n| --- | --- | --- | --- |\n| H₂ + I₂ ⇌ 2HI | 2 → 2 | **0** | no shift |\n| N₂ + 3H₂ ⇌ 2NH₃ | 4 → 2 | **−2** | **shifts forward** |\n\nAnd this is not a curiosity: it is why every ammonia plant in the world runs at 150 to 250 times atmospheric pressure. Le Chatelier's \"shifts to the side with fewer gas molecules\", which C15 gave you as a rule to remember, is this cancellation of powers -- and now you can say by **how much**.\n\n**The powers are not decoration on K. They decide whether pressure does anything at all.**",
            options: [
                { id: 'retry', label: "Count the gas particles each side.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The balancing numbers become powers, and those powers decide both the value of Kc and whether squeezing the flask moves anything.**\n\nSo Level 3 removed L2C15's two simplifications. **Reactions are not one-to-one**, and **amounts are not concentrations** -- and the second only stayed hidden because L2C15 never changed the volume.\n\n**What is still standing in this lesson:** Kc is built from concentrations as though every particle behaved **independently** of the crowd around it. In concentrated solutions they do not, and chemists replace concentrations with **activities** to cope. And **Kc itself changes with temperature** -- every number here was fixed at 430 °C. Nothing in this lesson tells you Kc at 500 °C, only how to use it once you know it.\n\nB15 at Level 2 found the balance point a cycle circles. B15 at Level 3 works out how long one lap takes.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The balancing numbers are powers!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You built K properly.**\n\n- Square brackets mean **concentration in moles per litre (mol/L)**\n- For **aA + bB ⇌ cC + dD**: **Kc = [C]^c[D]^d / ([A]^a[B]^b)**\n- So **H₂ + I₂ ⇌ 2HI** gives **Kc = [HI]² / ([H₂][I₂])** = **54.3** at 430 °C\n- Without the square the same flask reads 34.5 -- and **halves** when squeezed, so it is no constant at all\n- An **ICE table** -- Initial, Change, Equilibrium -- turns a starting mixture into an answer\n- From 1.00 mol/L of each: 2x/(1.00 − x) = √54.3 = **7.369**, so x = **0.7865**\n- Giving **[HI] = 1.573** and **[H₂] = [I₂] = 0.2135 mol/L**, which checks back to 54.3\n- A flask at 0.80, 0.25 and 0.10 has Kc = 0.64 / 0.025 = **25.6** -- so it is not at 430 °C\n- Reactant concentrations **multiply**, because a collision needs one of each\n- Squeezing changes Q only when the gas count changes: **Δn = 0** for HI, **−2** for ammonia\n- Which is why ammonia is made at 150 to 250 atmospheres\n- Pure solids and pure liquids are left out of Kc entirely\n- Removed: one-to-one reactions, and amounts standing in for concentrations\n- Still standing: particles treated as independent, and Kc fixed at one temperature",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "ICE table, then square root!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Powers, Not Just Ratios**\n\nL2C15 compared two ratios. Level 3 builds the ratio the equation actually demands.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Concentration | **[X]** in mol/L | Moles divided by litres |\n| The general form | **[C]^c[D]^d / ([A]^a[B]^b)** | Balancing numbers become powers |\n| Hydrogen iodide | **[HI]² / ([H₂][I₂])** | **54.3** at 430 °C |\n| Leaving out the power | reads 34.5, halves when squeezed | Not a constant |\n| ICE table | Initial, Change, Equilibrium | Change is **+2x** for HI |\n| Solving | 2x/(1 − x) = **√54.3** | x = **0.7865** |\n| The answer | [HI] = **1.573**, reactants **0.2135** | 79% of the H₂ reacted |\n| Reading Kc backwards | 0.64 / 0.025 = 25.6 | So not 430 °C |\n| Squeezing | **Δn**: 0 for HI, −2 for NH₃ | Only the second shifts |\n| Removed | one-to-one, and raw amounts | Powers and concentrations |\n| Still standing | independent particles, fixed heat | Activities, and Kc(T) |\n\n**The one line to remember:** the numbers that balance an equation become powers in K -- and those powers are what make K constant when the flask is squeezed, and what decide whether squeezing achieves anything.\n\n**Up next:** B15 -- why the lynx cycle takes ten years."
        }
    };
}
