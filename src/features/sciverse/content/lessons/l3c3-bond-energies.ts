import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 3, chemistry.
 *
 * L2C3 measured a fuel's energy per gram and treated the number as a property
 * of the fuel. This removes that simplification: the energy is not in the fuel
 * at all, it is the difference between the bonds broken and the bonds made.
 *
 * It opens on the commonest misconception in school chemistry -- that breaking
 * bonds releases energy -- because everything after depends on having it the
 * right way round.
 *
 * Frame of reference, stated because the curriculum rules require it: dH is
 * measured from the chemicals' point of view. Negative means the chemicals end
 * with less energy.
 */
export function getL3C3Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C3 measured fuels: wood about **16 kJ/g**, hydrogen about **142 kJ/g**. It told you how much. It could not tell you **why** -- why one substance hands over nine times the energy of another, gram for gram.\n\nThe usual answer is that energy is **stored in chemical bonds**, and burning lets it out by breaking them.\n\nHere is a question to test that. To burn hydrogen, the bond holding each H₂ molecule together has to come apart.\n\n**Does breaking that bond release energy, or cost energy?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It costs energy. A bond is atoms holding on to each other, so pulling them apart must take work -- the energy that comes out has to come from somewhere else.", nextNodeId: 'bookkeeping', sentiment: 'positive' },
                { id: 'bad', label: "It releases energy. The energy is stored in the bond, so breaking the bond lets it out.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the most widespread idea in school chemistry, and it is backwards.\n\nThink about what a bond is. Two atoms are **held together** -- attracted to each other strongly enough to stay joined. To separate them you have to pull against that attraction, exactly as you have to pull to separate two magnets.\n\nPulling against an attraction **takes** energy. It never hands energy back.\n\nSo **breaking a bond always costs energy, and making a bond always releases it.** There are no exceptions.\n\nBut burning plainly releases energy. So where does it come from, if every bond broken is a cost? The answer is in what happens next -- and it is a piece of bookkeeping you already know how to do.",
            options: [
                { id: 'cont', label: "So the energy must come from the new bonds being made?", nextNodeId: 'bookkeeping' }
            ]
        },
        bookkeeping: {
            id: 'bookkeeping',
            speaker: 'AI',
            content: "Exactly. A reaction is two steps, even when it looks like one.\n\n**Step 1 -- break.** Every bond in the starting chemicals is pulled apart into loose atoms. That **costs** energy.\n\n**Step 2 -- make.** The loose atoms join up in a new arrangement. That **releases** energy.\n\nThe overall change is the difference. It is written **ΔH** (said \"delta H\"), and it is measured **from the chemicals' point of view** -- the chemicals are the reservoir being tracked:\n\n**ΔH = energy to break bonds − energy released making bonds**\n\n- If making releases **more** than breaking cost, ΔH is **negative**. The chemicals end up with less energy, and the difference leaves into the surroundings as heat. That is **exothermic** -- C3's thermometer going up.\n- If breaking cost **more**, ΔH is **positive**. The chemicals end up holding extra energy, taken from the surroundings. That is **endothermic** -- C3's thermometer going down.\n\nEach kind of bond has a measured **bond energy**, in **kilojoules per mole (kJ/mol)**: the energy to break one mole of that bond, using L3C2's mole.\n\n| Bond | Bond energy (kJ/mol) |\n| --- | --- |\n| H–H | 436 |\n| O=O | 498 |\n| O–H | 464 |\n| C–H | 413 |\n| C=O | 805 |\n| H–Cl | 432 |\n| Cl–Cl | 243 |",
            options: [
                { id: 'cont', label: "Show me hydrogen burning.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Hydrogen burning:** 2H₂ + O₂ → 2H₂O\n\n**Break:** two H–H bonds and one O=O bond.\n2 x 436 + 498 = **1,370 kJ** -- a cost\n\n**Make:** each water molecule has two O–H bonds, and there are two water molecules, so four O–H bonds.\n4 x 464 = **1,856 kJ** -- a release\n\n**ΔH** = 1,370 − 1,856 = **−486 kJ**\n\nNegative, so the chemicals end with 486 kJ less than they started with, and that energy leaves as heat. Exothermic, as expected.\n\nNow the question L2C3 could not answer. That 486 kJ came from 2 mol of H₂, which is only **4 g**:\n\n486 / 4 = **about 122 kJ per gram**\n\nHydrogen wins per gram for two reasons you can now see. A hydrogen atom has a relative mass of **1**, the lightest there is, so a gram of hydrogen holds an enormous number of molecules, each setting up bonds that pay back handsomely. And hydrogen contains **no oxygen** yet. Wood is built from carbon, hydrogen **and** oxygen -- heavier atoms, and some of its oxygen is already bonded in. Part of wood's burning has, in effect, already happened, so there is less left to release, spread over more mass.\n\nOne thing should bother you. L2C3 quoted hydrogen at **142** kJ/g. This gives **122**. Hold that thought -- it is not an error, and the lesson comes back to it before the end.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Hydrogen reacts with chlorine: **H₂ + Cl₂ → 2HCl**\n\nUse H–H = **436**, Cl–Cl = **243** and H–Cl = **432** kJ/mol.\n\nWhat is ΔH, and is the reaction exothermic or endothermic?",
            options: [
                { id: 'right', label: "−185 kJ, exothermic. Breaking costs 436 + 243 = 679 kJ; making two H–Cl bonds releases 2 x 432 = 864 kJ; 679 − 864 = −185.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'sign', label: "+185 kJ, exothermic, because breaking the bonds releases 864 kJ and making them takes 679.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "−1,543 kJ, from adding everything: 436 + 243 + 864, taken as negative.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**+185** has the numbers right and the roles swapped. It assumes breaking releases and making costs -- the misconception the lesson opened with. Breaking always costs. So the 679 kJ of bonds pulled apart is the **cost**, the 864 kJ of bonds made is the **release**, and:\n\nΔH = cost − release = 679 − 864 = **−185 kJ**\n\nThe sign is not decoration. From the chemicals' point of view, **negative means they lost energy**, and that is what makes the reaction exothermic.\n\n**−1,543** adds the two steps instead of subtracting them. But they pull in opposite directions -- one takes energy in, the other gives it out -- so they must be netted against each other. A sense check: 1,543 kJ is more than all the bonds involved could possibly account for.\n\nAnd do not skip the **2** in 2HCl. It means **two** H–Cl bonds are made. Using one gives 679 − 432 = **+247**, an endothermic answer that is wrong in sign as well as size.\n\nΔH = 679 − 864 = **−185 kJ**, exothermic. The measured value is −184.6 kJ.",
            options: [
                { id: 'retry', label: "Breaking is the cost, making is the release, and subtract.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Bonds Broken** is the total energy needed to pull the starting chemicals apart into atoms. **Bonds Formed** is the total energy released when those atoms join up again.\n\nThe lab draws the journey as an **energy profile**: begin at the chemicals, climb by the breaking cost to a pile of loose atoms, then fall by the making release to the products. The gap between where you began and where you finish is **ΔH**.\n\nTry making the two dials equal. ΔH goes to zero, and the reaction neither warms nor cools its surroundings, however much breaking and making it involves.\n\nThen look at the climb. Even a strongly exothermic reaction has to go **up** before it comes down. That first climb is what the checkpoint is about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Up before down, every time. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Natural gas releases a great deal of energy when it burns -- its ΔH is strongly negative. Yet gas and the oxygen in the air can sit mixed together, perfectly safely, until a spark arrives.\n\nIf burning releases energy overall, **why is a match needed to start it?**",
            options: [
                { id: 'right', label: "Bonds have to break before any new ones can form, and breaking costs energy. The match pays that first cost; once some bonds form, the energy they release breaks the next ones, and the flame keeps itself going.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The gas has too little energy of its own until the match adds some, and it is the match's energy that the flame then gives out.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The gas does not lack energy -- ΔH says it will release a great deal. And the match cannot be the source of the flame's energy: a match is a tiny amount, while a gas hob can boil water for an hour.\n\nLook at the energy profile. **Before any bond can form, bonds have to break**, and breaking is a cost paid up front. The mixture sits at the bottom of a hill it has to climb before it can roll down the far side.\n\nThat up-front cost has a name: the **activation energy**. At room temperature almost no molecules collide hard enough to pay it, so nothing happens. The match heats a small region until some do.\n\nThen the reaction keeps itself going, and the reason is ΔH itself. The first bonds to form release more energy than their breaking cost, and that surplus heats neighbouring molecules enough to break *their* bonds. **Each step pays for the next.**\n\nThat is why a fire spreads, why petrol does not burst into flame inside a sealed tank, and why a spark in the wrong place is dangerous. The energy was always there. **The match only pays the entry fee.**",
            options: [
                { id: 'retry', label: "The match pays the cost of breaking bonds first.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A reaction must break bonds before it can make them, so even an energy-releasing reaction has a hill to climb first.** That hill is the **activation energy**.\n\nHere is what this lesson removed from Level 2. L2C3 treated a fuel's energy as a number you **measure** -- a property of the fuel, like its colour. It is not a property of the fuel at all. It is the **difference** between two bond totals, and you can now calculate it from a table.\n\nWhich brings back the number that did not fit. L2C3 said hydrogen gives **142 kJ/g**; the bonds gave **122**.\n\nThe gap is L3C1's **latent heat**. The bond calculation makes the water as **steam**. A calorimeter lets that steam **condense** back to liquid, and condensing releases the latent heat of vaporisation -- about **2,260 J** for every gram. Burning 4 g of hydrogen makes **36 g** of water, and 36 x 2,260 J is about **81 kJ** more.\n\nCount it in: 486 + 81 = **567 kJ**, and 567 / 4 = **142 kJ per gram**. The two figures meet.\n\nAnd the simplification still standing, because every Level 3 lesson names one: **bond energies are averages.** A C–H bond in methane is not quite the same as a C–H bond in wood, because neighbouring atoms tug on it, yet the table gives one number for all of them. That is why a bond calculation for burning methane gives −818 kJ/mol when the measured value is −802. Close, and not exact.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Break first, then make -- and the difference is the energy!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found where a fuel's energy really is.**\n\n- **Breaking a bond always costs energy; making one always releases it**\n- \"Energy stored in bonds, let out when they break\" is backwards\n- A reaction is **break**, then **make**, even when it looks like one step\n- **ΔH = bonds broken − bonds formed**, measured from the **chemicals'** point of view\n- **Negative ΔH** is **exothermic**; **positive ΔH** is **endothermic**\n- **Bond energies** are in **kJ/mol**, the energy to break one mole of that bond\n- Hydrogen burning: 1,370 − 1,856 = **−486 kJ**, about **122 kJ/g**\n- Hydrogen wins per gram: the lightest atoms, and no oxygen bonded in yet\n- The **activation energy** is the breaking cost paid before any release\n- A match pays the entry fee; each step's release then pays for the next\n- L2C3's 142 kJ/g includes steam **condensing** -- L3C1's latent heat\n- Bond energies are **averages**, so calculations land close but not exact\n\nNext in B3: why a living cell refuses to burn its food at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "ΔH = broken − formed, and breaking always costs!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Where a Fuel's Energy Really Is!**\n\nL2C3 measured a fuel's energy. Level 3 finds that the energy was never in the fuel -- it is the difference between two sets of bonds.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Breaking costs, making releases | no exceptions | \"Stored in bonds\" is backwards |\n| Two steps | break, then make | Even when it looks like one |\n| The energy change | **ΔH = broken − formed** | From the chemicals' point of view |\n| The sign | negative **exo**, positive **endo** | C3's thermometer, explained |\n| Hydrogen | 1,370 − 1,856 = **−486 kJ** | About **122 kJ/g** |\n| Why hydrogen wins | lightest atoms, no oxygen yet | Wood is partly burnt already |\n| The match | **activation energy** | Break before you can make |\n| 142, not 122 | steam condensing | L3C1's latent heat |\n| Still approximate | bond energies are averages | Methane: −818 calculated, −802 measured |\n\n**The one line to remember:** a fuel does not contain its energy -- the energy is the difference between the bonds you break and the bonds you make.\n\n**Up next:** B3 -- why a living cell refuses to burn its food, and pays itself in small change instead."
        }
    };
}
