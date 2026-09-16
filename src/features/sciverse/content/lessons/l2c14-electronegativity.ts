import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C14 "Chemical Bonding Code".
 *
 * C14 named ionic, polar covalent and nonpolar covalent bonds and left the
 * sorting to inspection. This lesson gives the number that sorts them: the
 * difference in electronegativity. Under about 0.4 is nonpolar, 0.4 to 1.7
 * polar, above 1.7 ionic. Worked on NaCl (2.1), water (1.4), H-H (0) and C-H
 * (0.4).
 *
 * Bond energies belong to L3C3; this lesson is about which kind of bond forms,
 * not how much energy it holds.
 *
 * Frame of reference stated: always the bigger value minus the smaller, so the
 * difference is never negative. Condition stated: a rule of thumb with fuzzy
 * edges, as HF shows. Held fixed and named for Level 3: a polar bond does not
 * always make a polar molecule.
 */
export function getL2C14Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C14 sorted bonds into three kinds: **ionic** (electrons handed over), **polar covalent** (shared unevenly) and **nonpolar covalent** (shared evenly).\n\nBut how do you know which kind two particular atoms will make? C14 told you that oxygen pulls shared electrons harder than hydrogen does -- and that pull has a name and a number: **electronegativity**.\n\nSo: could a single number for each atom decide the kind of bond?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Almost -- not the numbers themselves but the **difference** between them. A big difference means one atom wins the electrons outright; no difference means a dead heat.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes -- whichever atom has the higher electronegativity decides, so any bond with oxygen in it must be the same kind.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Test that idea on two bonds that both contain oxygen.\n\nIn **water**, oxygen is bonded to hydrogen, and the two share electrons unevenly -- a polar covalent bond, as C14 showed.\n\nIn **magnesium oxide**, the grit in a firelighter, oxygen is bonded to magnesium -- and there the electrons are handed over completely. It is ionic, a solid that melts only above 2,800 °C.\n\nSame oxygen. Different bonds. So oxygen's own number cannot be deciding it.\n\nWhat differs is the **partner**. Hydrogen pulls electrons fairly hard; magnesium barely pulls at all. A tug of war is decided by the **difference** between the two pulls, not by one side's strength.",
            options: [
                { id: 'cont', label: "Show me the numbers.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Electronegativity** is how strongly an atom pulls on the electrons in a bond. It is a comparison, so it has **no units** -- like L2C2's relative atomic masses. Fluorine, the strongest puller, is set at 4.0.\n\n| Atom | Electronegativity |\n| --- | --- |\n| K potassium | 0.8 |\n| Na sodium | 0.9 |\n| Mg magnesium | 1.2 |\n| H hydrogen | 2.1 |\n| C carbon | 2.5 |\n| S sulfur | 2.5 |\n| Cl chlorine | 3.0 |\n| N nitrogen | 3.0 |\n| O oxygen | 3.5 |\n| F fluorine | 4.0 |\n\nNotice the pattern from C12: the pull rises going **right** across the table and **up** it.\n\nNow the rule. Take the **difference**, always the bigger minus the smaller -- that is the frame of reference, so the difference is never negative:\n\n**difference = higher electronegativity − lower electronegativity**\n\n| Difference | Bond |\n| --- | --- |\n| below about **0.4** | **nonpolar covalent** -- shared evenly |\n| about **0.4 to 1.7** | **polar covalent** -- shared, but pulled to one side |\n| above about **1.7** | **ionic** -- handed over |\n\nThe condition belongs here. **These boundaries are a rule of thumb, not a law.** Nothing changes suddenly at 1.7; bonds shade gradually from sharing to handing over, and a few bonds sit on the wrong side of the line.",
            options: [
                { id: 'cont', label: "Work some bonds out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Table salt, Na-Cl:**\n\n3.0 − 0.9 = **2.1** → above 1.7 → **ionic** ✓ It dissolves into charged ions, and molten salt conducts electricity.\n\n**Water, O-H:**\n\n3.5 − 2.1 = **1.4** → between 0.4 and 1.7 → **polar covalent** ✓ Exactly what C14 found: shared, but pulled towards oxygen.\n\n**Hydrogen gas, H-H:**\n\n2.1 − 2.1 = **0** → below 0.4 → **nonpolar covalent** ✓ A dead heat: two identical atoms cannot pull unevenly.\n\n**A bond in oil or candle wax, C-H:**\n\n2.5 − 2.1 = **0.4** → right on the edge, and treated as **nonpolar** ✓ This is why oils do not mix with water: water's molecules are polar and oil's are not.\n\n| Bond | Difference | Kind |\n| --- | --- | --- |\n| H-H | 0 | nonpolar covalent |\n| C-H | 0.4 | nonpolar (just) |\n| O-H | 1.4 | polar covalent |\n| Na-Cl | 2.1 | ionic |\n| Mg-O | 2.3 | ionic |\n\nOne number, three kinds of bond, and the properties that follow: gases and oils at the top, water in the middle, crystals that melt at furnace temperatures at the bottom.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** What kind of bond forms between **carbon (2.5)** and **oxygen (3.5)**, and what kind between **potassium (0.8)** and **chlorine (3.0)**?",
            options: [
                { id: 'right', label: "C-O is 1.0, so polar covalent; K-Cl is 2.2, so ionic.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'swapped', label: "C-O is 1.0, so ionic; K-Cl is 2.2, so polar covalent.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "C-O is 6.0 and K-Cl is 3.8, so both are ionic.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Swapping the two** puts the small difference in the ionic box. Check the direction: a **big** difference means one atom takes the electrons outright, so **big** means ionic. 1.0 is a modest difference, so those electrons are shared -- unevenly, but shared.\n\n**6.0 and 3.8** added the numbers instead of subtracting them. Adding tells you nothing: two atoms that both pull hard, like O and F, would score high and yet share electrons almost evenly. It is the **gap** that matters.\n\n**Carbon and oxygen:** 3.5 − 2.5 = **1.0** → between 0.4 and 1.7 → **polar covalent**\n\n**Potassium and chlorine:** 3.0 − 0.8 = **2.2** → above 1.7 → **ionic**",
            options: [
                { id: 'retry', label: "Subtract, and big means ionic.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, one for each atom in a bond.\n\n**First Atom** and **Second Atom** each set an electronegativity, from 0.8 to 4.0.\n\nThe lab works out the difference, names the kind of bond, and draws the shared electrons sitting where that difference puts them: in the middle, pulled to one side, or handed over completely.\n\nTry this:\n\n- Set **0.9** and **3.0**: sodium and chlorine, a difference of 2.1 -- ionic\n- Set **2.1** and **3.5**: water's O-H, 1.4 -- polar covalent\n- Set both to the **same** value: a difference of 0, and the electrons sit dead centre\n- Creep across the boundaries at **0.4** and **1.7** and watch the name change -- then remember that the real change is gradual",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The difference decides. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Hydrogen fluoride is hydrogen bonded to fluorine: **H (2.1)** and **F (4.0)**.\n\nThe difference is **1.9**, which the rule puts above 1.7 -- so the rule says **ionic**.\n\nBut hydrogen fluoride is a **gas** at room temperature, made of separate molecules that share their electrons. Ionic substances are crystals that melt at hundreds of degrees.\n\nWhat has gone wrong?",
            options: [
                { id: 'right', label: "Nothing has gone wrong with the chemistry -- the rule is a guide with fuzzy edges, and HF sits just past the line while still being covalent. It is the most extremely polar covalent bond there is, but the electrons are shared, not handed over.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The electronegativity values must be wrong. If the rule says ionic and the substance is a gas, one of the numbers needs correcting.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The numbers are fine -- fluorine really is the strongest puller there is, and hydrogen really sits at 2.1. What is soft is the **boundary**.\n\n| Bond | Difference | What the rule says | What it really is |\n| --- | --- | --- | --- |\n| H-Cl | 0.9 | polar covalent | polar covalent ✓ |\n| H-F | **1.9** | ionic | **polar covalent** ✗ |\n| Na-Cl | 2.1 | ionic | ionic ✓ |\n| Na-F | 3.1 | ionic | ionic ✓ |\n\nBonding is a **gradual** business. As the difference grows, the shared electrons sit further and further from the middle, until at some point calling them \"shared\" stops being useful. There is no switch that flips at 1.7; that number is just where chemists find the description usually changes.\n\nSo the rule earns its keep -- it sorts the great majority of bonds correctly from two numbers -- and it tells you where to be careful: **close to the boundary, check the substance.**\n\nThat is worth more than a rule that pretends to be exact.",
            options: [
                { id: 'retry', label: "A useful rule, with soft edges.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The difference in electronegativity predicts the kind of bond, and the boundaries are guides rather than walls.**\n\nSo C14's three kinds of bond turn out to be one continuous scale, read off two numbers: 0 at one end, where atoms share perfectly, and beyond about 1.7 at the other, where one atom simply takes what it wants.\n\nOne thing this lesson held fixed: **a bond is not a molecule.** Every bond in carbon dioxide is polar -- the difference between carbon and oxygen is 1.0 -- and yet the whole molecule behaves as though it had no polarity at all. Level 3 finds out how that can be, using the **shape** of the molecule.\n\nB14 spelled out life's four-letter code. B14 at Level 2 asks why the words are exactly three letters long.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "It is the difference that decides!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the number behind the bond types.**\n\n- **Electronegativity** is how hard an atom pulls on a bond's electrons; it has **no units**, and fluorine is set at 4.0\n- The pull rises going **right** across the periodic table and **up** it\n- Frame of reference: **difference = higher − lower**, so it is never negative\n- Below about **0.4**: **nonpolar covalent**; **0.4 to 1.7**: **polar covalent**; above **1.7**: **ionic**\n- One atom's value settles nothing: oxygen makes polar bonds with hydrogen and ionic ones with magnesium\n- Na-Cl: 2.1, **ionic**; O-H: 1.4, **polar**; H-H: 0, **nonpolar**; C-H: 0.4, nonpolar in practice\n- Mg-O: 2.3, ionic -- and it melts above 2,800 °C\n- C-O: 1.0, polar; K-Cl: 2.2, ionic\n- Add the numbers instead of subtracting and the rule breaks: O and F both pull hard yet share nearly evenly\n- Condition: the boundaries are fuzzy -- **H-F is 1.9 and still covalent**\n- Held fixed: a polar bond does not by itself make a polar molecule",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Subtract, then read the band!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Which Bond Will It Be?**\n\nC14 named the three kinds of bond. Level 2 predicts which one you get.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Electronegativity | a pull, with no units | Fluorine set at 4.0 |\n| The rule | **higher − lower** | The gap, not either value |\n| Below 0.4 | H-H at 0, C-H at 0.4 | Nonpolar covalent |\n| 0.4 to 1.7 | O-H at 1.4, C-O at 1.0 | Polar covalent |\n| Above 1.7 | Na-Cl at 2.1, Mg-O at 2.3 | Ionic |\n| Same oxygen, two bonds | 1.4 with H, 2.3 with Mg | The partner decides |\n| Adding instead | O and F both high | Tells you nothing |\n| The soft edge | H-F at 1.9, still a gas | A guide, not a wall |\n\n**The one line to remember:** subtract the two electronegativities -- the size of the gap tells you whether the electrons are shared evenly, shared unevenly, or handed over.\n\n**Up next:** B14 -- why life's code uses words of exactly three letters."
        }
    };
}
