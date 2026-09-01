import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P49 "The Cost of Digging".
 *
 * Level 1 established that lifting is what a mine spends its energy on. This
 * lesson quantifies it and then overturns the intuition it built: grade divides
 * every rock-handling cost, while depth only touches the lifting term, so a
 * poor shallow mine beats a rich deep one. The arithmetic shape is inverse
 * proportion -- a third shape after L2P33's powers and L2C33's subtraction.
 */
export function getL2P49Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you learned that a mine's real cost is **lifting**, and that mines get deeper every year. Both true. Now here is a case where that instinct sends you the wrong way.\n\nTwo copper mines.\n\n**Mine A:** ore **1,000 metres** down. Every tonne of rock holds **10 kg** of copper.\n**Mine B:** ore only **100 metres** down. Every tonne of rock holds **1 kg** of copper.\n\nMine A is **ten times deeper**. Mine B's ore is **ten times poorer**.\n\nWhich one uses more energy for each kilogram of copper it produces?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Mine B, and not by a little. Poor ore means far more rock to handle for the same copper, and every stage has to process all of it.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Mine A, because it is ten times deeper and Level 1 said lifting is what a mine spends its energy on.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Lifting *is* what Level 1 emphasised, and it is genuinely the reason mines get dearer as they deepen. But Level 1 never asked how big the lifting is **compared with everything else**. Once you can calculate it, the comparison changes the answer.\n\nStart with lifting, which you can work out from scratch. Raising **1 kg** by **1 metre** takes about **10 joules**. So raising **1 tonne** -- 1,000 kg -- by 1 metre takes about 10,000 joules, which is **0.01 megajoules**. A **megajoule (MJ)** is a million joules.\n\n**Lifting one tonne from 1,000 m:** 1,000 x 0.01 = **10 MJ**\n**Lifting one tonne from 100 m:** 100 x 0.01 = **1 MJ**\n\nNow the stage Level 1 mentioned but never costed. Before you can get metal out, the rock has to be **crushed to powder**, and that takes roughly **30 MJ per tonne** however deep it came from.\n\nSo Mine A's tonne costs 10 + 30 = **40 MJ**. Mine B's costs 1 + 30 = **31 MJ**. Ten times the depth, and barely more than a quarter more energy -- because crushing dwarfs lifting.",
            options: [
                { id: 'cont', label: "So depth only affects one part, and not the biggest part?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly. And now the step that decides it: **that cost is per tonne of rock, but you want a price per kilogram of metal.**\n\nHow much metal a tonne of rock holds is called its **ore grade**, measured in kilograms per tonne.\n\nTo get 1 kg of copper you must handle a whole tonne divided by the grade. At 10 kg per tonne you handle a tenth of a tonne. At 1 kg per tonne you handle a **whole** tonne -- ten times as much rock, lifted, crushed, all of it.\n\nThen one last cost. Freeing metal from crushed rock in a smelter takes about **15 MJ per kilogram of metal**. That one depends on the metal, not the rock, so grade does not change it.\n\nPutting it together:\n\n**energy per kg of metal = (lifting + crushing) / grade + smelting**\n\nNow finish the puzzle:\n\n**Mine A:** 40 / 10 + 15 = 4 + 15 = **19 MJ per kg**\n**Mine B:** 31 / 1 + 15 = 31 + 15 = **46 MJ per kg**\n\nMine B, the shallow one, costs nearly **two and a half times** as much.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A mine has ore **500 metres** down at a grade of **5 kg per tonne**.\n\nUse the same figures: lifting is 0.01 MJ per tonne per metre, crushing is 30 MJ per tonne, smelting is 15 MJ per kg of metal.\n\nWhat is the energy cost per kilogram of metal?",
            options: [
                { id: 'right', label: "22 MJ per kg. Lifting is 500 x 0.01 = 5, so the rock costs 5 + 30 = 35 MJ per tonne. Then 35 / 5 = 7, and 7 + 15 = 22.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_divide', label: "50 MJ per kg, because 5 + 30 + 15 = 50.", nextNodeId: 'math_wrong' },
                { id: 'divide_all', label: "10 MJ per kg, because 5 + 30 + 15 = 50, and 50 / 5 = 10.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both slips come from the same place: **not every cost is measured in the same thing**, so they cannot simply be piled together.\n\nCheck the units before you add. Lifting and crushing are **per tonne of rock**. Smelting is **per kilogram of metal**. Adding all three straight away adds two quantities that are not counting the same thing.\n\n**Adding without dividing** leaves lifting and crushing as a cost per tonne of rock, when the question asked per kilogram of metal.\n\n**Dividing everything by the grade** goes one step too far. Grade tells you how much **rock** you must handle -- so it belongs under the rock costs only. Smelting is already per kilogram of metal, and dividing it makes poor ore look *cheaper* to smelt, which cannot be right.\n\nSo divide the rock costs, then add the metal cost:\n\n(5 + 30) / 5 + 15 = 7 + 15 = **22 MJ per kg**\n\nThe habit worth taking away: **check what each number is 'per' before you add it to anything.**",
            options: [
                { id: 'retry', label: "Divide the rock costs, then add the metal cost.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Ore Depth** changes the lifting only.\n**Ore Grade** changes how much rock you must handle for each kilogram of metal.\n\nLook at how differently the formula treats them.\n\nDepth sits **inside** one term, and that term is the smaller one. Doubling the depth adds a few MJ per tonne to a cost that is already 30 MJ before you start.\n\nGrade sits **underneath** the whole rock cost. Halving it does not add anything -- it **doubles** everything above the line. That relationship has a name: energy per kilogram is **inversely proportional** to grade. Halve the grade, double that part of the cost. Quarter it, quadruple it.\n\nSo drag **Ore Depth** from one end to the other and watch the total barely stir. Then nudge **Ore Grade** downwards and watch it climb away from you.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Grade moves it far more. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A mine has been working the same deposit for years at **400 metres** deep and a grade of **10 kg per tonne**. Its energy cost is **18.4 MJ per kilogram**.\n\nThe rich ore is running out. The remaining ore is grade **5 kg per tonne**.\n\nAn engineer suggests: \"Move to a shallower part of the deposit. If we cut the depth, we cancel out the drop in grade.\"\n\nCan a shallower mine rescue the poorer ore?",
            options: [
                { id: 'right', label: "No. Even at zero depth the poor ore costs 30 / 5 + 15 = 21 MJ per kg, which is still worse than the 18.4 they had. There is not enough lifting energy in the sum to give back.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. The grade halved, so halving the depth as well should bring the cost back to roughly where it started.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It sounds fair -- one thing got twice as bad, so make another thing twice as good. But the two are not the same size, and the way to prove it is to give the engineer **everything** they could possibly ask for.\n\nSuppose the ore were at the surface. **Zero depth. No lifting at all.**\n\n(0 + 30) / 5 + 15 = 6 + 15 = **21 MJ per kg**\n\nStill worse than the **18.4** they started with. And that is the best case that exists -- you cannot dig upwards.\n\nHere is why the intuition fails. Halving the grade doubled a cost of 34 MJ per tonne, adding about **3.4 MJ per kg**. The entire lifting cost at 400 m was only **4 MJ per tonne**, which is **0.4 MJ per kg** at that grade. There was never enough lifting in the sum to give back.\n\n**A change to something in a small term cannot cancel a change to something that divides every term.**\n\nThis is why the falling grade of the world's ore matters more than its rising depth. Depth adds. Grade multiplies everything, and it has been falling for a century.",
            options: [
                { id: 'retry', label: "Even zero depth cannot pay back what the grade took.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Where a number sits in a formula matters more than how much it changes.**\n\nThat is worth stating on its own, because it is the real skill here. Before doing any arithmetic, look at **where** each quantity appears:\n\n- Inside one term among several? Changing it moves the total a little.\n- Underneath everything? Changing it moves the total in proportion.\n- Raised to a power? Changing it moves the total dramatically.\n\nAnd you have now met all three shapes across Level 2:\n\n- **L2P33 -- a power.** E = base x efficiency to the power of n. Efficiency compounds n times, so it dominates everything.\n- **L2C33 -- a subtraction.** net = in - out. Neither side dominates; the **sign** of the answer is what matters.\n- **L2P49 -- a division.** cost = rock costs / grade + smelting. Grade is inversely proportional, so halving it doubles what sits above it.\n\nThree Big Ideas, three arithmetic shapes. Reading the shape first tells you which dial is worth pulling before you calculate a single number.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Read the shape before doing the sums!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a mine.**\n\n- Lifting **1 kg** by **1 metre** takes about **10 joules**\n- So lifting a tonne one metre is **0.01 MJ**; a **megajoule** is a million joules\n- **Crushing** costs about **30 MJ per tonne**, whatever the depth\n- **Smelting** costs about **15 MJ per kilogram of metal**, whatever the rock\n- **Ore grade** is kilograms of metal per tonne of rock\n- **energy per kg of metal = (lifting + crushing) / grade + smelting**\n- Check what each number is **per** before adding it to anything\n- Depth sits inside the **smaller** term; grade sits **underneath** the whole rock cost\n- Energy per kilogram is **inversely proportional** to grade\n- Even **zero depth** cannot rescue ore whose grade has halved\n\n**Where a number sits in a formula matters more than how much it changes.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Grade divides everything -- depth only adds!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Energy Cost of Metal!**\n\nLevel 1 told you deeper mines cost more. The arithmetic tells you that **poorer mines cost far more**, and by how much.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Lifting from scratch | 10 J per kg per metre | A tonne, one metre: **0.01 MJ** |\n| Crushing dominates lifting | 30 MJ/t versus 4 MJ/t at 400 m | Depth is the smaller term |\n| Grade sets the rock handled | 1 kg metal needs 1 t / grade | Poor ore multiplies every stage |\n| The full cost | (lift + crush) / grade + smelt | Divide rock costs, then add metal |\n| Check the units | per tonne versus per kg | Never add unlike 'per' quantities |\n| Inverse proportion | halve grade -> double that part | Depth adds; grade multiplies |\n\n**The one line to remember:** depth sits inside one small term, grade sits underneath all of them -- so a poor shallow mine beats a rich deep one every time.\n\n**Level 2 so far:** a power (P33), a subtraction (C33), a probability (B33) and a division (P49) -- four shapes, and reading the shape tells you which dial matters."
        }
    };
}
