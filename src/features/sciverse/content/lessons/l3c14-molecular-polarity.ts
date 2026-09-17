import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 14, chemistry.
 *
 * Removes L2C14's simplification that a polar bond makes a polar molecule.
 * Each bond dipole is an arrow pointing from the less to the more
 * electronegative atom, and the molecule's dipole is the vector sum, so shape
 * decides the answer.
 *
 *   two identical bonds at angle A:  molecule dipole = 2 x bond dipole x cos(A/2)
 *
 * CO2 is linear (A = 180, cos 90 = 0, so zero) while water is bent at 104.5
 * (cos 52.25 = 0.612, giving 1.22 x the bond dipole). Unit: the debye, D.
 *
 * Still standing: lone pairs contribute a dipole of their own, which is why
 * the arrow sum is close rather than exact.
 */
export function getL3C14Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C14 gave you the rule: subtract the two electronegativities, and between 0.4 and 1.7 the bond is **polar** -- shared electrons pulled to one side.\n\nCarbon is 2.5 and oxygen is 3.5, so each C=O bond in **carbon dioxide** has a difference of **1.0**. Both its bonds are polar.\n\nAnd yet carbon dioxide behaves as a completely **nonpolar** substance: it barely dissolves in water, and it does not line up in an electric field. Water, whose O-H difference is only **1.4**, is one of the most polar liquids there is.\n\nHow can a molecule made of polar bonds have no polarity?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The pulls must be cancelling. Each bond pulls in a direction, and if two equal pulls point opposite ways, the molecule as a whole is pulled nowhere.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The bonds in carbon dioxide must not really be polar -- a difference of 1.0 must be too small to count.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The bonds are polar, and there is evidence independent of the rule: in carbon dioxide each oxygen carries a measurable partial negative charge, and the carbon a partial positive one. Shine infrared light on it and the bonds absorb strongly -- which only polar bonds do, and which is precisely why carbon dioxide holds heat in the atmosphere.\n\nSo the bonds are polar. Compare two molecules to see what else must be involved:\n\n| Molecule | Bond difference | Shape | The molecule |\n| --- | --- | --- | --- |\n| carbon dioxide | 1.0, polar | **linear** | **nonpolar** |\n| water | 1.4, polar | **bent** | **very polar** |\n\nBoth are built from polar bonds. What differs is the **shape**. So a bond's polarity cannot be the whole story: the answer has to depend on the **directions** those bonds point.\n\nAnd a quantity with both a size and a direction is a **vector**.",
            options: [
                { id: 'cont', label: "So I add the bonds as vectors?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly that.\n\nA **bond dipole** is a vector: an arrow whose length is how unevenly that bond's electrons are shared, pointing **from the less electronegative atom towards the more electronegative one**. That direction is the frame of reference -- the arrow points the way the electrons have been pulled, so it points at the partial negative end.\n\nIts size is measured in **debyes (D)**. A C=O bond is about **1.2 D**, an O-H bond about **1.5 D**.\n\nThe **molecular dipole** is the **vector sum** of the bond dipoles: lay the arrows head to tail and see where you end up. If you end up back at the start, the molecule has **no** dipole however polar its bonds are.\n\nFor a molecule with **two identical bonds** meeting at an angle **A**, the sum has a tidy form. Split each arrow into the part along the molecule's line of symmetry and the part across it. The across-parts are equal and opposite, so they vanish; the along-parts both measure **bond dipole x cos(A/2)**, and there are two:\n\n**molecule dipole = 2 x bond dipole x cos(A/2)**\n\nThe condition: **two identical bonds**, with A measured between them. And a general rule falls straight out of it -- **if the bonds are identical and arranged symmetrically, they cancel**: two at 180°, three flat at 120°, four in a tetrahedron. Any of those sums to zero.",
            options: [
                { id: 'cont', label: "Run the two molecules through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Carbon dioxide.** Linear, so the two bonds sit at **A = 180°**, each about 1.2 D.\n\n**Step 1.** A/2 = 90°\n\n**Step 2.** cos 90° = **0**\n\n**Step 3.** molecule dipole = 2 x 1.2 x 0 = **0 D**\n\nTwo strongly polar bonds, pointing dead opposite, cancelling exactly. The measured dipole of carbon dioxide is **0 D**.\n\n**Water.** Bent, with **A = 104.5°** between the bonds, each about 1.5 D.\n\n**Step 1.** A/2 = **52.25°**\n\n**Step 2.** cos 52.25° = **0.612**\n\n**Step 3.** molecule dipole = 2 x 1.5 x 0.612 = **1.84 D**\n\nThe measured value is **1.85 D**. Two bonds no more polar than carbon dioxide's, and because they are bent rather than straight, they add instead of cancelling.\n\n| Molecule | Bond dipole | Angle A | cos(A/2) | Molecule dipole |\n| --- | --- | --- | --- | --- |\n| carbon dioxide | 1.2 D | 180° | 0 | **0 D** |\n| water | 1.5 D | 104.5° | 0.612 | **1.84 D** |\n\nEverything that makes water extraordinary -- dissolving salts, climbing a stem, holding its heat -- traces back to that 104.5°. Straighten the molecule out and it would be an unremarkable gas.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Hydrogen sulfide is bent, with **A = 92.1°** between its two bonds, and each S-H bond dipole is about **0.68 D**.\n\nWhat is the molecule's dipole? (cos 46.05° = 0.695)",
            options: [
                { id: 'right', label: "About 0.94 D. 2 x 0.68 x 0.695 = 0.945.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_half', label: "About 0.05 D, using cos 92.1° = 0.037.", nextNodeId: 'math_wrong' },
                { id: 'summed', label: "1.36 D, because the two bond dipoles simply add: 0.68 + 0.68.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Using cos 92.1°** forgot the halving. The angle in the formula is measured from the **line of symmetry** to one bond, which is half the angle between the bonds. Skip it and a bent molecule looks almost cancelled, which it plainly is not.\n\n**1.36 D** added the arrows as plain numbers, which is only right when they point the same way -- at A = 0°, where cos 0° = 1. At any real angle, part of each arrow is spent pulling sideways against the other.\n\n**Step 1.** A/2 = 92.1 / 2 = **46.05°**\n\n**Step 2.** cos 46.05° = **0.695**\n\n**Step 3.** 2 x 0.68 x 0.695 = **0.945**, so about **0.94 D**\n\nThe measured dipole of hydrogen sulfide is **0.97 D**. Note it is far smaller than water's 1.84 D, for two reasons at once: sulfur pulls more weakly than oxygen, **and** its bond angle is narrower.",
            options: [
                { id: 'retry', label: "Halve the angle first.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Bond Angle** is the angle **A** between the two bonds. **Bond Dipole** is the size of each arrow, in debyes.\n\nThe lab draws both bond arrows, their vector sum, and the value of 2 x bond dipole x cos(A/2).\n\nTry this:\n\n- Set **180°**: the arrows point dead opposite and the sum collapses to **0 D**, whatever the bond dipole -- carbon dioxide\n- Set **104.5°** with a bond dipole of **1.5 D**: water, at 1.84 D\n- Set **92.1°** with **0.68 D**: hydrogen sulfide, at 0.94 D\n- Close the angle towards **0°** and the sum reaches twice the bond dipole -- both arrows pulling the same way\n- Hold the angle and change the bond dipole: the sum scales in exact proportion, because it is a **multiplier**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Shape decides. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** In **tetrachloromethane** a central carbon holds **four** chlorine atoms at the corners of a tetrahedron. Carbon is 2.5 and chlorine is 3.0, so every bond is polar by L2C14's rule.\n\nThe molecule's measured dipole is **0 D**.\n\nNow replace **one** chlorine with a hydrogen, making **trichloromethane**. Its dipole is **1.04 D**.\n\nOne atom swapped. Why does that change everything?",
            options: [
                { id: 'right', label: "The cancelling depended on the four arrows being identical and symmetrically arranged. Swapping one for a different atom breaks the symmetry -- a C-H arrow has a different length from a C-Cl arrow, and now the four no longer sum to zero. The shape barely changed; the balance did.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Because hydrogen is much smaller than chlorine, so the molecule becomes lopsided in size, and a lopsided molecule is polar.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Size is not what is being added up. A dipole sum is about the **pull on electrons** and its **direction**, not about how much room each atom takes.\n\nWork through the arrows. In tetrachloromethane, four identical C-Cl arrows point out to the corners of a tetrahedron. That arrangement is perfectly balanced: whichever way you tilt it, there is as much pull one way as the other, so the sum is exactly zero -- despite every one of those bonds being polar.\n\nReplace one chlorine with hydrogen and two things change. Carbon (2.5) and hydrogen (2.1) differ by only 0.4, so that arrow is short -- and it points the **other way**, towards the carbon, because here carbon is the stronger puller. The three remaining C-Cl arrows no longer have an equal partner to balance them:\n\n| Molecule | The four arrows | Sum |\n| --- | --- | --- |\n| tetrachloromethane | 4 identical, tetrahedral | **0 D** |\n| trichloromethane | 3 alike, 1 short and reversed | **1.04 D** |\n\nAnd this is not a curiosity. Trichloromethane dissolves substances that tetrachloromethane cannot touch, purely because of that 1.04 D.\n\n**Symmetry, not size, is what cancels a dipole -- so identical bonds in a symmetric arrangement give a nonpolar molecule, and breaking the pattern anywhere makes it polar.**",
            options: [
                { id: 'retry', label: "Symmetry cancels; breaking it does not.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A molecule's polarity is the vector sum of its bond dipoles, so shape and symmetry decide it -- polar bonds can add up to nothing.**\n\nSo Level 3 removed L2C14's simplification. **A polar bond does not make a polar molecule.** L2C14's rule was never wrong about bonds; it simply stopped at the bond, and the property you can actually measure -- whether a substance dissolves salt, absorbs infrared light, boils high or low -- belongs to the whole molecule.\n\n**What is still standing in this lesson:** only **bonds** were added up. A molecule's **lone pairs** of electrons are also lopsided distributions of charge, and they contribute arrows of their own. That is why water's sum came out at 1.84 D against a measured 1.85 D -- close, but arrived at by leaving something out that happens to point much the same way. In ammonia the lone pair points along the same axis as the bonds and adds; in some molecules it opposes them, and the arrow sum misses badly.\n\nB14 at Level 3 closes the Big Idea, on the one code that cannot be redesigned: what happens when a letter of it is copied wrongly.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Add the arrows, not the bonds!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You added bond polarities as vectors.**\n\n- A **bond dipole** is an arrow pointing **from the less to the more electronegative atom**, measured in **debyes (D)**\n- The **molecular dipole** is the **vector sum** of those arrows\n- For two identical bonds at angle A: **molecule dipole = 2 x bond dipole x cos(A/2)**\n- The halving comes from splitting each arrow along and across the line of symmetry; the across-parts cancel\n- Carbon dioxide: A = 180°, cos 90° = 0, so **0 D** from two polar bonds\n- Water: A = 104.5°, cos 52.25° = 0.612, so 2 x 1.5 x 0.612 = **1.84 D** against 1.85 D measured\n- Hydrogen sulfide: A = 92.1°, 2 x 0.68 x 0.695 = **0.94 D** against 0.97 D measured\n- Identical bonds arranged symmetrically cancel: two at 180°, three flat at 120°, four tetrahedral\n- Tetrachloromethane: four polar bonds, **0 D**; swap one for hydrogen and it is **1.04 D**\n- Symmetry cancels a dipole; size does not\n- Removed: L2C14's assumption that a polar bond makes a polar molecule\n- Still standing: **lone pairs** add arrows of their own, so the bond sum is close, not exact",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Cos of half the angle!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Polar Bonds, Nonpolar Molecule**\n\nL2C14 sorted bonds by a difference. Level 3 adds the bonds up.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Bond dipole | an arrow, in **debyes** | Points at the stronger puller |\n| Molecular dipole | the **vector sum** | Head to tail, and see where you land |\n| Two identical bonds | **2 x bond dipole x cos(A/2)** | A is the angle between them |\n| Carbon dioxide | 180°, cos 90° = 0 | **0 D** from two polar bonds |\n| Water | 104.5°, cos 52.25° = 0.612 | **1.84 D**, measured 1.85 D |\n| Hydrogen sulfide | 92.1°, 0.68 D bonds | **0.94 D**, measured 0.97 D |\n| Symmetry | 2 at 180°, 3 at 120°, 4 tetrahedral | All cancel exactly |\n| Break the symmetry | 0 D becomes 1.04 D | One atom swapped |\n| Removed | polar bond ⇒ polar molecule | Shape decides |\n| Still standing | lone pairs add arrows too | 1.84 against 1.85 D |\n\n**The one line to remember:** bond polarities are arrows, and a molecule's polarity is where those arrows leave you -- which is why carbon dioxide, built from polar bonds, is pulled nowhere at all.\n\n**Up next:** B14 -- which copying mistakes in the genetic code matter, and which go unnoticed."
        }
    };
}
