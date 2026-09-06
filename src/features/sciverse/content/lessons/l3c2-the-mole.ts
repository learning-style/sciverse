import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 2, chemistry.
 *
 * L2C2 could compare atoms but never count or weigh them -- relative masses are
 * ratios with no units, so they cannot say how much to put on a balance. The
 * mole is precisely that missing bridge, and this lesson introduces it as the
 * answer to a practical problem rather than as a definition to memorise.
 */
export function getL3C2Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C2 gave you relative atomic masses -- carbon is **12**, hydrogen is **1** -- and you used them to add up formula masses.\n\nBut notice what those numbers could never do. They are ratios with no units, so they cannot tell you what to put on a balance.\n\nHere is the problem that creates. A reaction needs **exactly as many carbon atoms as hydrogen atoms**. You cannot count atoms; there are far too many and they are far too small.\n\nSo how do you weigh out **equal numbers** of two different kinds of atom?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Weigh out masses in the same ratio as the atomic masses -- 12 g of carbon for every 1 g of hydrogen -- and the counts must come out equal.", nextNodeId: 'mole', sentiment: 'positive' },
                { id: 'bad', label: "Weigh out equal masses of each, since equal masses should contain equal numbers.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "L2C2's checkpoint already caught this one. Equal masses are **not** equal counts, because the atoms are not equally heavy.\n\nTake 12 g of carbon and 12 g of hydrogen. A carbon atom is twelve times heavier, so those 12 g of hydrogen contain **twelve times as many atoms**. Equal on the balance, wildly unequal in number.\n\nNow reverse the reasoning and the answer appears. If carbon atoms are 12 times heavier, then to get the same number of them you need 12 times the mass:\n\n**12 g of carbon and 1 g of hydrogen contain the same number of atoms.**\n\nThat is not an approximation. It follows exactly from what the relative masses mean.\n\nAnd it generalises. Take **any** element, weigh out its relative atomic mass **in grams**, and you always get the same number of atoms. 16 g of oxygen. 14 g of nitrogen. 12 g of carbon. Same count every time.",
            options: [
                { id: 'cont', label: "How many atoms is that, exactly?", nextNodeId: 'mole' }
            ]
        },
        mole: {
            id: 'mole',
            speaker: 'AI',
            content: "It is a fixed number, and it has been measured:\n\n**602,200,000,000,000,000,000,000**\n\nWritten properly, **6.022 x 10²³**. It is called the **Avogadro constant**, symbol **N_A**, and that quantity of anything is called a **mole** (**mol**).\n\nSo:\n\n**One mole of any substance = its formula mass in grams = 6.022 x 10²³ particles**\n\n- 12 g of carbon is 1 mol, and holds 6.022 x 10²³ atoms\n- 18 g of water is 1 mol, and holds 6.022 x 10²³ molecules\n- 44 g of carbon dioxide is 1 mol, and holds 6.022 x 10²³ molecules\n\nThe mass in grams of one mole is called the **molar mass**, symbol **M**, in **g/mol**. Numerically it is just L2C2's formula mass with a unit attached -- which is the whole point. **The mole is the bridge from ratios you can only compare to grams you can actually weigh.**\n\nTwo formulas do everything:\n\n**n = m / M** -- moles from a mass\n**number of particles = n x N_A**\n\nThe size of that number is worth pausing on. A mole of grains of sand would bury Britain to a depth of several hundred metres. There are about that many molecules in a large mouthful of water.",
            options: [
                { id: 'try', label: "Let me use it.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** You have **36 g of water**. Water's molar mass is **18 g/mol**.\n\nHow many moles is that, and roughly how many molecules?",
            options: [
                { id: 'right', label: "2 mol, and about 1.2 x 10²⁴ molecules. n = 36 / 18 = 2, and 2 x 6.022 x 10²³ = 1.2 x 10²⁴.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "648 mol, from 36 x 18.", nextNodeId: 'math_wrong' },
                { id: 'inverted', label: "0.5 mol, from 18 / 36.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The units settle this, as they did in L2C1 and L2P2.\n\n**Molar mass is in g/mol** -- grams **per mole**. You have grams and you want moles, so you must divide by the grams-per-mole, and the grams cancel:\n\ng ÷ (g/mol) = **mol**\n\nThat only works one way round.\n\n**648** comes from multiplying, which gives g²/mol -- a unit that means nothing.\n\n**0.5** divides the wrong way, giving mol/g. It also fails a sense check: 18 g is one mole, so 36 g is obviously **more** than one mole, not half of one.\n\nn = 36 g / 18 g/mol = **2 mol**\n\nThen multiply by the Avogadro constant for the count: 2 x 6.022 x 10²³ = **1.2 x 10²⁴ molecules**.\n\nThat is roughly two mouthfuls of water containing more molecules than there are stars in the observable universe, by a very large margin.",
            options: [
                { id: 'retry', label: "Divide by g/mol so the grams cancel.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Mass** is what you put on the balance, in grams. **Molar Mass** picks the substance, in g/mol -- 2 for hydrogen gas, 18 for water, 44 for carbon dioxide, 180 for glucose.\n\nThe lab divides one by the other and shows both the moles and the raw particle count.\n\nTry holding the **mass** still and changing the substance. Ten grams is ten grams on any balance -- but the number of molecules in it swings enormously, because heavier molecules mean fewer of them per gram.\n\nThat is L2C2's checkpoint made quantitative. It told you that equal masses are not equal counts. Now you can say exactly how unequal: 10 g of water is 0.56 mol, while 10 g of carbon dioxide is only 0.23 mol -- **less than half as many molecules**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Same mass, very different counts. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Burning carbon in oxygen makes carbon dioxide. Every **one** carbon atom needs exactly **one** oxygen molecule:\n\n**C + O₂ → CO₂**\n\nYou have **12 g of carbon** to burn completely. Oxygen gas, **O₂**, has a molar mass of **32 g/mol**.\n\nWhat mass of oxygen do you need?",
            options: [
                { id: 'right', label: "32 g. 12 g of carbon is 1 mol, the equation needs 1 mol of O₂, and 1 mol of O₂ weighs 32 g.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'equal_mass', label: "12 g, because the equation needs one of each, so equal masses of each.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The equation says one of each **particle**, not one of each **gram**. Those are the two different questions L2C2 warned about, and here the difference decides whether a reaction works.\n\nGo through the mole in three steps, which is the standard route for any question of this kind:\n\n**1. Mass to moles.** 12 g of carbon, molar mass 12 g/mol, so n = 12/12 = **1 mol** of carbon atoms.\n\n**2. Use the equation.** C + O₂ → CO₂ is a statement about counts: one carbon particle per one oxygen molecule. So 1 mol of carbon needs **1 mol of O₂**.\n\n**3. Moles back to mass.** m = n x M = 1 x 32 = **32 g of oxygen**.\n\nWeigh out 12 g instead and you supply only 12/32 = 0.375 mol of oxygen for 1 mol of carbon. Nearly two thirds of the carbon would have nothing to react with.\n\n**Chemical equations count particles. Balances measure mass. The mole is what converts between them**, and without it a balanced equation cannot be turned into an amount to weigh out.\n\nThis is why the mole exists at all. It is not a definition to be learned -- it is the only reason a written reaction can be carried out in a real laboratory.",
            options: [
                { id: 'retry', label: "Mass to moles, use the equation, moles back to mass.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Equations count particles; balances weigh grams; the mole converts.**\n\nLook at what has been removed from L2C2. That lesson gave you a set of ratios -- carbon is twelve times hydrogen -- and everything it could do was comparative. It could tell you water is 89% oxygen by mass. It could not tell you how much oxygen to fetch.\n\nThe mole supplies the missing link, and it does it with the same manoeuvre you have now seen many times: **quote things per something**. Molar mass is grams **per mole**, exactly as density is grams **per cubic centimetre** and specific heat capacity is joules **per gram per °C**.\n\nAnd it fixes a gap in L2P2 as well. Density told you a lump was aluminium; the mole tells you how many aluminium atoms are in it.\n\nNext, B2's turn. It said cells are small because surface grows more slowly than volume. That was true, but it was not the sharpest reason -- and the sharper one is harsher.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The mole converts counts into grams!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You built the bridge from ratios to grams.**\n\n- Relative masses are unitless ratios, so they cannot say what to weigh out\n- Equal masses are not equal counts -- 12 g of hydrogen holds 12x the atoms of 12 g of carbon\n- Weigh out the relative mass **in grams** and the count is always the same\n- That count is the **Avogadro constant**, **N_A = 6.022 x 10²³**\n- That many particles is one **mole (mol)**\n- **Molar mass M** is the mass of one mole, in **g/mol** -- the formula mass with a unit\n- **n = m / M**, and **particles = n x N_A**\n- The units only cancel one way: g ÷ (g/mol) = mol\n- 36 g of water is **2 mol**, about **1.2 x 10²⁴** molecules\n- Equations count **particles**; balances measure **mass**; the mole converts\n- Burning 12 g of carbon needs **32 g** of oxygen, not 12 g\n\nNext in B2: the sharper reason cells cannot be large.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "n = m / M, and the grams cancel!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Counting the Uncountable!**\n\nL2C2 could compare atoms. Level 3 lets you weigh out a chosen number of them.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Ratios cannot be weighed | C = 12 has no units | So L2C2 could only compare |\n| Equal counts | 12 g C and 1 g H | Mass ratio matches the atomic ratio |\n| The Avogadro constant | **N_A = 6.022 x 10²³** | The count you always get |\n| A mole | that many particles | Formula mass **in grams** |\n| Molar mass | **M**, in **g/mol** | Formula mass with a unit attached |\n| Moles from mass | **n = m / M** | g ÷ (g/mol) leaves mol |\n| Particles | **n x N_A** | 36 g of water is 1.2 x 10²⁴ |\n| Why it exists | equations count, balances weigh | 12 g of C needs 32 g of O₂ |\n\n**The one line to remember:** a chemical equation counts particles and a balance measures grams, and the mole is the only thing that connects them.\n\n**Up next:** B2 -- why 6/L was the right answer for the wrong reason."
        }
    };
}
