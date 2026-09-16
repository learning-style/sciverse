import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C13 "Polymers & Materials".
 *
 * C13 said chain length changes a polymer from a liquid to a solid. This
 * lesson counts the links: the degree of polymerisation n = chain molar mass /
 * monomer molar mass, using L2C2's formula masses. Worked on polythene, where
 * a 100,000 g/mol chain is about 3,600 ethylene units, against a 840 g/mol wax
 * at 30.
 *
 * Condition stated: every chain treated as the same length, which real
 * plastics are not. The checkpoint separates chain length from packing --
 * HDPE and LDPE can share a length and differ entirely -- and names packing as
 * Level 3's subject.
 */
export function getL2C13Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C13 built a chain one **monomer** at a time and found that the length changes everything: short chains make a runny liquid, long ones a solid plastic.\n\nSo how long is the chain in something ordinary? A plastic bag is **polythene**, built from **ethylene** units, **C₂H₄**. One of its chains has a mass of about **100,000** on the scale L2C2 used for formula masses.\n\nRoughly how many ethylene units is that?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Thousands. I would work out one ethylene unit's formula mass and divide the chain's mass by it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "About 100,000 -- the chain's mass is the number of units in it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A chain's mass and the number of links in it are different numbers, because each link has a mass of its own.\n\nThink of a paper chain. If you know the whole chain weighs 100 g, you do not know how many loops it has until you know what one loop weighs. If a loop is 2 g, there are 50 loops. If a loop is 10 g, there are 10.\n\nSame for a polymer. Each ethylene unit brings its own atoms with it -- two carbons and four hydrogens -- so the chain's mass is the mass of one unit, multiplied by however many are joined up.\n\nTo count the links, you divide.",
            options: [
                { id: 'cont', label: "Show me the division.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First, one unit. L2C2's formula masses used **C = 12** and **H = 1**, so for **ethylene, C₂H₄**:\n\n2 x 12 + 4 x 1 = 24 + 4 = **28**\n\nWhen ethylene units join into a chain, nothing is left over -- each one simply opens a bond and links on -- so every unit in the chain still carries a mass of **28**.\n\nThe number of units joined together is called the **degree of polymerisation**, written **n**:\n\n**n = chain's molar mass / monomer's molar mass**\n\nThe numerator is the mass of the whole chain; the denominator is the mass of one unit. These masses are in **grams for each mole** -- L3C2's mole, though here only their ratio matters, so the units cancel and **n is just a count**.\n\nAnd the count is what decides the material:\n\n| n, units in the chain | Chain mass | What it is |\n| --- | --- | --- |\n| about 30 | 840 | a soft **wax** |\n| about 700 | 20,000 | a bendy film |\n| about 3,600 | 100,000 | a **plastic bag** |\n| about 70,000 | 2,000,000 | fibre tough enough for ropes and body armour |\n\nThe condition belongs here. **This treats every chain in the plastic as the same length.** A real plastic is a mixture of chain lengths, and the number quoted is an average.",
            options: [
                { id: 'cont', label: "Work out the bag.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The plastic bag.** Chain mass **100,000**, ethylene unit **28**.\n\n**Step 1.** n = 100,000 / 28 = **3,570**, so about **3,600 units**\n\n**Step 2.** Each unit adds two carbon atoms to the backbone, so the chain's spine is about 3,600 x 2 = **7,200 carbon atoms** long, one after another.\n\n**The wax.** Chain mass **840**:\n\nn = 840 / 28 = **30 units**\n\nSame atoms. Same monomer. Same kind of bond. The wax and the bag differ only in **how many units are strung together** -- 30 against 3,600.\n\nWhy does that change so much? Long chains **tangle**. Thirty units slide past each other easily, so the wax is soft and melts in your hand. Three thousand six hundred units wrap around their neighbours like cooked spaghetti, and pulling one chain out means dragging it past hundreds of others.\n\nThat is why a bag stretches instead of snapping, and why the rope fibre at 70,000 units is strong enough to stop a bullet.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** **Polypropylene** is built from **propylene**, **C₃H₆**. A chain of it has a mass of **84,000**.\n\nHow many units long is that chain?",
            options: [
                { id: 'right', label: "2,000 units. Propylene is 3 x 12 + 6 x 1 = 42, and 84,000 / 42 = 2,000.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ethylene', label: "3,000 units, because 84,000 / 28 = 3,000.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "3,528,000 units, because 84,000 x 42 = 3,528,000.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**3,000** used ethylene's 28 for a propylene chain. Propylene has one more carbon and two more hydrogens in every unit, so each link is heavier: 3 x 12 + 6 x 1 = **42**. Heavier links mean **fewer** of them in the same total mass.\n\n**3,528,000** multiplied instead of dividing. A quick sense check catches it: each unit weighs 42, so 3.5 million of them would weigh about 148 million — far more than the chain does.\n\n**Step 1.** propylene, C₃H₆ = 3 x 12 + 6 x 1 = **42**\n\n**Step 2.** n = 84,000 / 42 = **2,000 units**",
            options: [
                { id: 'retry', label: "Chain mass divided by one unit's mass.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Chain Mass** is the mass of one whole chain, on L2C2's scale. **Monomer Mass** is the mass of a single unit: **28** for ethylene, **42** for propylene, **104** for styrene, the unit in the plastic of a foam cup.\n\nThe lab divides one by the other, draws the chain to scale, and names the kind of material that length of chain makes.\n\nTry this:\n\n- Set **100,000** and **28**: about 3,600 units, a plastic bag\n- Keep the chain mass and slide **Monomer Mass** to **104**: the same mass of chain is now only about 960 units, because each unit is heavier\n- Drop **Chain Mass** to **840**: thirty units, a soft wax\n- Push **Chain Mass** to the top: the tangle that makes rope fibre",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Chain mass over unit mass. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** C13 met two plastics made of the very same ethylene units: the **stiff** plastic of a milk bottle, and the **floppy** plastic of a carrier bag.\n\nA student says: *the milk bottle must have much longer chains.*\n\nThey measure both, and the chains come out about the same length. So what else could make one stiff and the other floppy?",
            options: [
                { id: 'right', label: "How the chains are shaped and packed. The bottle's chains are straight, so they lie close together; the bag's chains have side branches that hold them apart, as C13 showed. Same length, different packing.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing else can. If the chains are the same length, the two plastics must really be the same material, and the difference is just how thick each one is made.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Thickness cannot be the answer: a thin sheet cut from a milk bottle is still stiff, and a thick carrier bag is still floppy.\n\nChain length is only half the story. The other half is **arrangement**, which C13 called branching:\n\n| | Chains | How they pack | Result |\n| --- | --- | --- | --- |\n| Milk bottle | straight | close together, in neat patches | stiff, strong |\n| Carrier bag | branched | held apart by the branches | soft, floppy |\n\nSame monomer, same length, same bonds -- and a different material, because the chains sit differently.\n\nThat is Big Idea 13's question in one object: **structure shapes function**, and here the structure is not what the chain is made of but how it lies next to its neighbours.",
            options: [
                { id: 'retry', label: "Length is only half of it.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Counting the units tells you how long a chain is; it does not tell you how the chains lie together.**\n\nBoth matter, and now you can measure one of them: **n = chain mass / monomer mass**, a count you can work out from nothing but formula masses.\n\nOne thing this lesson held fixed: **every chain treated as the same length, and packing left as a picture.** Level 3 measures the packing itself -- because how closely the chains lie shows up in something anyone can weigh: the plastic's **density**.\n\nB13 said a leaf takes in carbon dioxide through tiny holes. B13 at Level 2 finds what those holes cost.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Count the units!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted the links in a polymer chain.**\n\n- A chain's mass and its number of units are different numbers\n- Ethylene, **C₂H₄** = 2 x 12 + 4 x 1 = **28**, from L2C2's formula masses\n- **Degree of polymerisation: n = chain mass / monomer mass**\n- The units cancel, so **n is a count**\n- A plastic bag: 100,000 / 28 = about **3,600 units**, a spine of about 7,200 carbons\n- A wax: 840 / 28 = **30 units** -- same monomer, different material\n- Rope and armour fibre: about **70,000 units**\n- Propylene, **C₃H₆** = **42**, so an 84,000 chain is **2,000 units**\n- Heavier units mean fewer of them in the same chain mass\n- Long chains **tangle**, which is what makes a plastic tough\n- Condition: every chain treated as the same length; real plastics are a mixture\n- Length is only half the story: **packing** is the other half",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Chain mass over unit mass!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Long Is a Polymer Chain?**\n\nC13 built a chain. Level 2 counts its links.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| One unit | **C₂H₄ = 28** | From L2C2's formula masses |\n| Degree of polymerisation | **n = chain mass / monomer mass** | A count, with no units |\n| A plastic bag | 100,000 / 28 | About **3,600 units** |\n| A wax | 840 / 28 | **30 units**, same monomer |\n| Rope fibre | 2,000,000 / 28 | About **70,000 units** |\n| Polypropylene | 84,000 / 42 | **2,000 units** |\n| Heavier units | 100,000 / 104 | Fewer of them: about 960 |\n| Why length matters | chains **tangle** | Long chains cannot slide apart |\n| Still to come | packing | Same length, different material |\n\n**The one line to remember:** divide the chain's mass by one unit's mass, and you have counted the links that decide whether a polymer is a wax, a bag or a rope.\n\n**Up next:** B13 -- what a leaf pays for every breath of carbon dioxide."
        }
    };
}
