import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C2 "Atoms & Molecules".
 *
 * C2 built H2O out of two hydrogens and an oxygen. This lesson weighs it.
 *
 * It also pays off a debt. L2C33 asked learners to multiply carbon by 3.7 to
 * get carbon dioxide, and simply asserted the figure. Here 44/12 is derived,
 * so the number stops being magic.
 */
export function getL2C2Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C2 you built water out of parts: **two hydrogen atoms and one oxygen atom**, written **H₂O**.\n\nAnd in L2P2 you just found that density depends partly on how heavy each particle is.\n\nSo the obvious question. **What does one atom weigh?**\n\nA single atom is far too small to put on any balance ever built. Yet chemists quote atomic masses to several decimal places. How?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They must compare atoms against each other rather than weighing one on its own -- how many times heavier one kind is than another.", nextNodeId: 'relative', sentiment: 'positive' },
                { id: 'bad', label: "There must be an extremely sensitive balance that can weigh a single atom directly.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "No balance can do it, and the gap is not small. A single hydrogen atom has a mass of about **0.0000000000000000000000017 g**. Write that as a number you can hold: a **million million million million** hydrogen atoms weigh less than two grams.\n\nNo pan, no spring, no beam responds to that.\n\nBut the question can be dodged entirely, and the dodge is the same trick you used in L2P2.\n\nThere, mass alone was useless because it depended on the size of your lump. The fix was to stop asking for an absolute number and ask for a **ratio** instead -- mass per cm³.\n\nDo it again. Stop asking \"what does a carbon atom weigh?\" and ask **\"how many times heavier is a carbon atom than a hydrogen atom?\"**\n\nThat question has a clean answer -- **twelve** -- and you never have to weigh either of them.",
            options: [
                { id: 'cont', label: "So the masses are all comparisons?", nextNodeId: 'relative' }
            ]
        },
        relative: {
            id: 'relative',
            speaker: 'AI',
            content: "Exactly. They are called **relative atomic masses**, and *relative* is the important word -- each is a comparison, not a weight.\n\nBecause they are one mass divided by another, they have **no units at all**, exactly like μ in L3P1.\n\nHere are the four atoms C2 introduced:\n\n| Atom | Symbol | Relative atomic mass |\n| --- | --- | --- |\n| Hydrogen | H | **1** |\n| Carbon | C | **12** |\n| Nitrogen | N | **14** |\n| Oxygen | O | **16** |\n\nRead them as ratios. A carbon atom is **12 times** heavier than a hydrogen atom. An oxygen atom is **16 times** heavier than hydrogen, and **16/12 = 1.33 times** heavier than carbon.\n\nNow the useful part, and it is genuinely just addition. The mass of a **molecule** is the masses of its atoms added up. That total is called the **formula mass**.\n\nWater, **H₂O**: two hydrogens and one oxygen.\n\n**2 x 1 + 16 = 18**\n\nA water molecule is 18 times heavier than a hydrogen atom. No balance required -- you counted atoms and added.",
            options: [
                { id: 'cont', label: "What can I do with a formula mass?", nextNodeId: 'by_mass' }
            ]
        },
        by_mass: {
            id: 'by_mass',
            speaker: 'AI',
            content: "You can find what fraction of a substance's **mass** is any one element -- which is a different question from how many atoms it has, and the difference catches people out.\n\nIn water, of that formula mass of 18, the oxygen contributes 16.\n\n**16 / 18 = 0.889**, so water is about **89% oxygen by mass**\n\nWater is two thirds hydrogen **by atom count** and nearly nine tenths oxygen **by mass**. Both statements are true. They are answering different questions.\n\nNow a debt gets paid. Back in **L2C33** you were told to multiply a mass of carbon by **3.7** to get the mass of carbon dioxide it came from, and you were simply asked to accept the number.\n\nWork it out yourself:\n\n**CO₂** is one carbon and two oxygens: **12 + 2 x 16 = 44**\n\nSo carbon dioxide is 44 while the carbon inside it is 12:\n\n**44 / 12 = 3.67**\n\nThere is the 3.7. It was never a fact to memorise -- it is a formula mass divided by an atomic mass, and you can now derive it in one line.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** **Methane** is the main gas in natural gas. Its formula is **CH₄** -- one carbon atom and four hydrogen atoms.\n\nUsing C = 12 and H = 1, what is its **formula mass**, and what **percentage of that mass is carbon**?",
            options: [
                { id: 'right', label: "Formula mass 16, and 75% carbon. 12 + 4 x 1 = 16, and 12 / 16 = 0.75.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'by_count', label: "Formula mass 16, and 20% carbon, because one atom out of the five is carbon.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "Formula mass 48, because 12 x 4 = 48.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two different slips, and the first is the more interesting one.\n\n**20% by counting atoms** is a correct answer to a question nobody asked. There genuinely is one carbon among five atoms, so carbon is 20% of the **atoms**. But the question asked for a percentage of the **mass**, and the atoms are not equally heavy -- that single carbon outweighs all four hydrogens put together.\n\nBy mass: 12 out of 16, which is **75%**. By count: 1 out of 5, which is 20%. **Always check whether a percentage is by count or by mass**, because for anything containing hydrogen the two answers are wildly different.\n\n**48** multiplies where it should add. The little **4** in CH₄ means *four hydrogen atoms*, so it multiplies the **hydrogen**, not the carbon: 4 x 1 = 4. Then everything is added: 12 + 4 = **16**.\n\nA subscript tells you how many of the atom **it follows**. Nothing else.",
            options: [
                { id: 'retry', label: "Subscripts multiply their own atom; percentages need by-mass or by-count stating.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The lab builds a molecule out of carbon and hydrogen -- the family called **hydrocarbons**, which includes natural gas, petrol and candle wax.\n\n**Carbon Atoms** sets how many carbons. **Hydrogen Atoms** sets how many hydrogens.\n\nThe lab adds up the formula mass and works out the percentage that is carbon.\n\nTry walking up the family and watch the percentage climb:\n\n- **CH₄** methane: 12 + 4 = **16**, carbon is **75%**\n- **C₂H₆** ethane: 24 + 6 = **30**, carbon is **80%**\n- **C₈H₁₈** octane, the main part of petrol: 96 + 18 = **114**, carbon is **84%**\n\nEvery extra carbon drags the percentage upward, because carbon is twelve times heavier than the hydrogens it is being added alongside.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The percentage climbs with each carbon. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** You have **100 g of water (H₂O)** and **100 g of carbon dioxide (CO₂)**.\n\nCarbon dioxide has **two** oxygen atoms per molecule. Water has only **one**.\n\nWhich sample contains more oxygen **by mass**?\n\nUse H = 1, C = 12, O = 16.",
            options: [
                { id: 'right', label: "The water, with about 89 g against 73 g. Water is 16/18 oxygen by mass; carbon dioxide is 32/44, because the heavy carbon takes up a large share.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The carbon dioxide, since each of its molecules carries two oxygen atoms and water's carries only one.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Carbon dioxide really does have twice the oxygen atoms **per molecule**. But you were not given equal numbers of molecules -- you were given equal **masses**, and that changes the question completely.\n\nWork out the fraction of each substance's mass that is oxygen.\n\n**Water, H₂O:** formula mass 2 + 16 = **18**, of which oxygen is 16.\n16 / 18 = **0.889**, so 100 g of water holds **88.9 g of oxygen**.\n\n**Carbon dioxide, CO₂:** formula mass 12 + 32 = **44**, of which oxygen is 32.\n32 / 44 = **0.727**, so 100 g of carbon dioxide holds **72.7 g of oxygen**.\n\nThe water wins, and comfortably.\n\nThe reason is the passenger. In water, oxygen is carried alongside two hydrogens weighing 1 each -- almost nothing. In carbon dioxide it is carried alongside a carbon weighing 12, which takes a large share of every 44 grams.\n\nAnd there is a second trap hidden in the setup. Equal masses do **not** mean equal numbers of molecules. 100 g of water is 100/18 units' worth, while 100 g of carbon dioxide is only 100/44 -- **less than half as many molecules**. Lighter molecules mean more of them per gram.\n\n**Per molecule and per gram are different questions, and they routinely give opposite answers.**",
            options: [
                { id: 'retry', label: "Equal masses are not equal molecule counts.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **By mass and by count are different questions.**\n\nYou now have three ways of describing the same molecule, and it is worth keeping them separate:\n\n- **By atom count** -- water is two thirds hydrogen\n- **By mass** -- water is 89% oxygen\n- **By molecule count** -- 100 g of water contains more than twice as many molecules as 100 g of carbon dioxide\n\nAll true. All about the same water.\n\nAnd notice the L2P2 move appearing yet again. Relative atomic masses exist because absolute masses were unusable, so the answer was to **divide one by another and quote the ratio**. Density did it. Specific heat capacity did it. This does it.\n\nNext, B2 takes the same tool -- one quantity divided by another -- and applies it to something with no formula at all: the size of a living cell.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "By mass and by count are different questions!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You weighed a molecule without a balance.**\n\n- A hydrogen atom is about **0.0000000000000000000000017 g** -- unweighable\n- So atoms are compared instead: **relative atomic mass**, with **no units**\n- **H = 1, C = 12, N = 14, O = 16**\n- **Formula mass** is just those masses added up\n- **H₂O = 2 x 1 + 16 = 18**; **CO₂ = 12 + 2 x 16 = 44**; **CH₄ = 12 + 4 = 16**\n- A **subscript** multiplies only the atom it follows\n- **Percentage by mass** = that element's share of the formula mass\n- Water is **89% oxygen by mass** but two thirds hydrogen **by atom count**\n- L2C33's mysterious **3.7** is simply **44 / 12 = 3.67**\n- 100 g of water holds **more** oxygen than 100 g of carbon dioxide\n- Equal masses are **not** equal molecule counts\n\nNext in B2: why every cell in your body is microscopically small.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Count the atoms, add the masses!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- What Does an Atom Weigh?**\n\nC2 built molecules out of atoms. Level 2 weighs them, using nothing but comparison and addition.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Atoms cannot be weighed | ~1.7 x 10⁻²⁴ g each | So compare them instead |\n| Relative atomic mass | H 1, C 12, N 14, O 16 | A ratio, so **no units** |\n| Formula mass | add the atoms up | **H₂O = 18**, **CO₂ = 44** |\n| Subscripts | the 4 in CH₄ | Multiplies **hydrogen** only |\n| Percentage by mass | element share / formula mass | Water is **89% oxygen** |\n| The 3.7 from L2C33 | **44 / 12 = 3.67** | Derived, not memorised |\n| By mass vs by count | 89% vs two thirds | Different questions |\n| Equal masses | 100/18 against 100/44 | Not equal molecule counts |\n\n**The one line to remember:** you never need to weigh an atom -- counting them and adding up comparisons does everything.\n\n**Up next:** B2 -- why a cell that grows too big starves, however much food surrounds it."
        }
    };
}
